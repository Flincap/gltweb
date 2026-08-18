/*
 * Minimal stand-ins for @vercel/node's VercelRequest / VercelResponse.
 *
 * Those types are needed only at compile time - the Vercel runtime injects the
 * real objects - so declaring the handful of members we actually touch avoids
 * adding a ~90-package devDependency and a lockfile change to the project.
 */

export type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  query: Record<string, string | string[] | undefined>;
  // Vercel parses JSON bodies automatically; a string arrives when it cannot.
  body?: unknown;
  socket?: { remoteAddress?: string };
};

export type VercelResponse = {
  setHeader(key: string, value: string): void;
  status(code: number): VercelResponse;
  send(body: string): VercelResponse;
};
