// Server-only. Do NOT import from a "use client" module — the bearer token
// in MAINLINE_INGEST_SECRET must never reach the browser.

const INGEST_URL = "https://mainline.tryoption.ai/api/ingest/hit";

export type MainlineBeaconPayload = {
  host: string;
  path: string;
  method: string;
  userAgent: string | null;
  referrer: string | null;
  clientIp: string | null;
  statusCode: number | null;
  timestamp: number;
};

// Returns a Promise that resolves whether the POST succeeds or fails, so
// callers can hand it to waitUntil/void without risk of an unhandled
// rejection bubbling up and crashing the request.
export function sendMainlineBeacon(
  payload: MainlineBeaconPayload,
): Promise<void> {
  const secret = process.env.MAINLINE_INGEST_SECRET;
  if (!secret) return Promise.resolve();

  return fetch(INGEST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify(payload),
    // Don't let Next's fetch-cache layer touch an outbound analytics POST.
    cache: "no-store",
  })
    .then(() => undefined)
    .catch(() => undefined);
}

const ASSET_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".mjs",
  ".map",
  ".ico",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".svg",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".eot",
  ".txt",
  ".xml",
  ".webmanifest",
]);

export function isAssetPath(pathname: string): boolean {
  if (pathname.startsWith("/_next/")) return true;
  if (pathname.startsWith("/static/")) return true;
  const dot = pathname.lastIndexOf(".");
  if (dot === -1) return false;
  const slash = pathname.lastIndexOf("/");
  if (dot < slash) return false;
  return ASSET_EXTENSIONS.has(pathname.slice(dot).toLowerCase());
}
