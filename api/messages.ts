import type { VercelRequest, VercelResponse } from "./_lib/types.js";
import { clean, json, methodNotAllowed, readBody } from "./_lib/http.js";
import {
  deleteMessage,
  listMessages,
  setRead,
  storageReady,
} from "./_lib/store.js";
import { requireAdmin } from "./_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAdmin(req, res)) return;

  if (!storageReady) {
    return json(res, 200, {
      storageReady: false,
      messages: [],
      note: "Message archiving is off. Connect an Upstash Redis store in Vercel to keep a searchable copy of every submission.",
    });
  }

  try {
    if (req.method === "GET") {
      const messages = await listMessages(500);
      return json(res, 200, { storageReady: true, messages });
    }

    if (req.method === "PATCH") {
      const body = readBody(req.body);
      const id = clean(body.id, 64);
      if (!id) return json(res, 400, { error: "Missing id" });
      const ok = await setRead(id, Boolean(body.read));
      return json(res, ok ? 200 : 404, ok ? { ok: true } : { error: "Not found" });
    }

    if (req.method === "DELETE") {
      const id = clean(req.query.id, 64);
      if (!id) return json(res, 400, { error: "Missing id" });
      await deleteMessage(id);
      return json(res, 200, { ok: true });
    }
  } catch (err) {
    console.error("Messages endpoint failed", err);
    return json(res, 500, { error: "Could not reach the message store." });
  }

  return methodNotAllowed(res, ["GET", "PATCH", "DELETE"]);
}
