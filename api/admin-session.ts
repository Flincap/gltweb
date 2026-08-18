import type { VercelRequest, VercelResponse } from "./_lib/types.js";
import { clean, clientIp, json, methodNotAllowed, readBody } from "./_lib/http.js";
import { hashIp, rateLimit, storageReady } from "./_lib/store.js";
import {
  COOKIE,
  issueToken,
  parseCookies,
  passwordMatches,
  setSessionCookie,
  tokenValid,
} from "./_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET: is the current cookie still good? Used on page load.
  if (req.method === "GET") {
    return json(res, 200, {
      signedIn: tokenValid(parseCookies(req)[COOKIE]),
      configured: Boolean(process.env.ADMIN_PASSWORD),
      storageReady,
    });
  }

  // DELETE: sign out.
  if (req.method === "DELETE") {
    setSessionCookie(res, null);
    return json(res, 200, { ok: true });
  }

  if (req.method !== "POST") return methodNotAllowed(res, ["GET", "POST", "DELETE"]);

  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 8) {
    return json(res, 503, {
      error: "Admin access is not configured. Set ADMIN_PASSWORD (12+ characters).",
    });
  }

  // Throttle hard: 8 attempts per 15 minutes per connection.
  const gate = await rateLimit(`login:${hashIp(clientIp(req))}`, 8, 15 * 60);
  if (!gate.allowed) {
    return json(res, 429, { error: "Too many attempts. Try again in 15 minutes." });
  }

  const body = readBody(req.body);
  const password = clean(body.password, 200);

  if (!password || !passwordMatches(password)) {
    // Deliberately vague, and deliberately slow.
    await new Promise((r) => setTimeout(r, 400));
    return json(res, 401, { error: "That password is not right." });
  }

  setSessionCookie(res, issueToken());
  return json(res, 200, { ok: true, storageReady });
}
