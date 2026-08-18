import type { VercelRequest, VercelResponse } from "./types.js";

/** JSON response with caching disabled. Admin data must never sit in a CDN. */
export function json(res: VercelResponse, status: number, body: unknown) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.status(status).send(JSON.stringify(body));
}

/**
 * Strips CR/LF and control characters, collapses whitespace, caps length.
 * Mail headers are newline-delimited, so a stray "\n" in a name or subject is
 * how a contact form becomes a spam relay.
 */
export function clean(value: unknown, max: number): string {
  return String(value ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Same, but keeps paragraph breaks for the message body. */
export function cleanMultiline(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

/** Escapes user content before it goes anywhere near an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 120;
}

/**
 * Best-effort client IP. Only ever used hashed, for rate limiting and abuse
 * tracing, so a spoofed header costs nothing but a wasted rate-limit bucket.
 */
export function clientIp(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  const raw = Array.isArray(fwd) ? fwd[0] : fwd;
  return (raw?.split(",")[0] || req.socket?.remoteAddress || "unknown").trim();
}

/**
 * Vercel parses JSON bodies for us, but hands back a string when the content
 * type is missing or the payload is malformed. Normalise both to a plain
 * object so callers never index into `unknown`.
 */
export function readBody(body: unknown): Record<string, unknown> {
  if (typeof body === "string") {
    try {
      const parsed: unknown = JSON.parse(body);
      return parsed && typeof parsed === "object"
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }
  return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
}

export function methodNotAllowed(
  res: VercelResponse,
  allowed: string[]
): void {
  res.setHeader("Allow", allowed.join(", "));
  json(res, 405, { error: "Method not allowed" });
}
