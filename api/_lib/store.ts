import { createHash, randomUUID } from "node:crypto";

/*
 * Storage runs on an Upstash Redis REST endpoint, called with plain fetch so
 * the project picks up no new runtime dependency. Vercel's Upstash integration
 * injects the credentials under either naming scheme depending on when the
 * store was created, so both are accepted.
 */
const URL_ =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

/** Storage is optional. Without it the form still emails; nothing is archived. */
export const storageReady = Boolean(URL_ && TOKEN);

const INDEX = "glt:messages";
const KEY = (id: string) => `glt:message:${id}`;

/** Messages expire after this many days unless RETENTION_DAYS says otherwise. */
const RETENTION_DAYS = Number(process.env.RETENTION_DAYS || 365);
const RETENTION_SECONDS = Math.max(1, RETENTION_DAYS) * 24 * 60 * 60;

type Command = (string | number)[];

async function redis<T = unknown>(commands: Command[]): Promise<T[]> {
  if (!storageReady) throw new Error("Storage is not configured");
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) {
    throw new Error(`Storage request failed (${res.status})`);
  }
  const payload = (await res.json()) as { result?: T; error?: string }[];
  return payload.map((entry) => {
    if (entry.error) throw new Error(entry.error);
    return entry.result as T;
  });
}

export type StoredMessage = {
  id: string;
  ts: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  location: string;
  message: string;
  read: boolean;
  /** Hashed, never the raw address. Enough to spot a repeat abuser, no more. */
  ipHash: string;
  delivered: boolean;
};

/** IPs are personal data. Hash with a server-side salt; keep a short prefix. */
export function hashIp(ip: string): string {
  const salt = process.env.ADMIN_SECRET || process.env.RESEND_API_KEY || "glt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 16);
}

export async function saveMessage(
  input: Omit<StoredMessage, "id" | "ts" | "read">
): Promise<string> {
  const id = randomUUID();
  const record: StoredMessage = { ...input, id, ts: Date.now(), read: false };
  await redis([
    ["SET", KEY(id), JSON.stringify(record), "EX", RETENTION_SECONDS],
    ["ZADD", INDEX, record.ts, id],
  ]);
  return id;
}

export async function listMessages(limit = 500): Promise<StoredMessage[]> {
  const [ids] = await redis<string[]>([
    ["ZRANGE", INDEX, 0, Math.max(0, limit - 1), "REV"],
  ]);
  if (!ids?.length) return [];

  const raw = await redis<string | null>([["MGET", ...ids.map(KEY)]]);
  const values = (raw[0] as unknown as (string | null)[]) || [];

  const messages: StoredMessage[] = [];
  const expired: string[] = [];
  values.forEach((value, i) => {
    if (!value) {
      // The record hit its TTL but the index entry outlived it.
      expired.push(ids[i]);
      return;
    }
    try {
      messages.push(JSON.parse(value) as StoredMessage);
    } catch {
      expired.push(ids[i]);
    }
  });
  if (expired.length) {
    await redis([["ZREM", INDEX, ...expired]]).catch(() => undefined);
  }
  return messages;
}

export async function setRead(id: string, read: boolean): Promise<boolean> {
  const [value] = await redis<string | null>([["GET", KEY(id)]]);
  if (!value) return false;
  const record = JSON.parse(value) as StoredMessage;
  record.read = read;
  const [ttl] = await redis<number>([["TTL", KEY(id)]]);
  const expiry = ttl && ttl > 0 ? ttl : RETENTION_SECONDS;
  await redis([["SET", KEY(id), JSON.stringify(record), "EX", expiry]]);
  return true;
}

export async function deleteMessage(id: string): Promise<void> {
  await redis([
    ["DEL", KEY(id)],
    ["ZREM", INDEX, id],
  ]);
}

export async function unreadCount(): Promise<number> {
  const messages = await listMessages();
  return messages.filter((m) => !m.read).length;
}

/**
 * Fixed-window rate limit. Falls back to a per-instance map when storage is
 * absent: weaker, since serverless instances don't share memory, but it still
 * blunts a naive flood.
 */
const memory = new Map<string, { count: number; reset: number }>();

export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  if (storageReady) {
    try {
      const bucket = `glt:rl:${key}`;
      const [count] = await redis<number>([["INCR", bucket]]);
      if (count === 1) {
        await redis([["EXPIRE", bucket, windowSeconds]]);
      }
      return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
    } catch {
      // Storage wobble must not take the contact form down with it.
      return { allowed: true, remaining: limit };
    }
  }

  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.reset < now) {
    memory.set(key, { count: 1, reset: now + windowSeconds * 1000 });
    return { allowed: true, remaining: limit - 1 };
  }
  entry.count += 1;
  return { allowed: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}
