import { createHmac, timingSafeEqual, createHash } from "node:crypto";
import type { VercelRequest, VercelResponse } from "./types.js";
import { json } from "./http.js";

export const COOKIE = "glt_admin";
const SESSION_HOURS = 12;

function secret(): string {
  const value = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
  if (!value) throw new Error("ADMIN_SECRET is not configured");
  return value;
}

/** Compare digests, not raw strings, so length and content leak no timing. */
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 8) return false;
  return safeEqual(candidate, expected);
}

/** Token is `expiry.signature`; it carries no secret and cannot be extended. */
export function issueToken(): string {
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const sig = createHmac("sha256", secret()).update(String(expires)).digest("hex");
  return `${expires}.${sig}`;
}

export function tokenValid(token: string | undefined): boolean {
  if (!token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig) return false;
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  const expected = createHmac("sha256", secret()).update(expires).digest("hex");
  try {
    return safeEqual(sig, expected);
  } catch {
    return false;
  }
}

export function parseCookies(req: VercelRequest): Record<string, string> {
  const raw = req.headers.cookie;
  const header = Array.isArray(raw) ? raw.join("; ") : raw || "";
  const out: Record<string, string> = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx < 0) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

export function setSessionCookie(res: VercelResponse, token: string | null) {
  const base = `${COOKIE}=${token ?? ""}; Path=/; HttpOnly; Secure; SameSite=Strict`;
  // Max-Age=0 clears it on logout.
  const age = token ? SESSION_HOURS * 60 * 60 : 0;
  res.setHeader("Set-Cookie", `${base}; Max-Age=${age}`);
}

/** Returns true when the caller holds a valid session; otherwise sends 401. */
export function requireAdmin(req: VercelRequest, res: VercelResponse): boolean {
  if (!process.env.ADMIN_PASSWORD) {
    json(res, 503, { error: "Admin access is not configured on this deployment." });
    return false;
  }
  if (!tokenValid(parseCookies(req)[COOKIE])) {
    json(res, 401, { error: "Not signed in" });
    return false;
  }
  return true;
}
