// Next.js 16 renamed `middleware.ts` to `proxy.ts` (function `middleware` →
// `proxy`, types `NextMiddleware`/`MiddlewareConfig` → `NextProxy`/
// `ProxyConfig`). The proxy runs on the Node.js runtime.
//
// Sole responsibility today: fire a fire-and-forget beacon to Mainline so
// AI/search-crawler hits land in our analytics. Latency or failure of the
// beacon must never delay or block the response — the helper returns a
// promise that never rejects, and we hand it to `event.waitUntil` so the
// request can finish independently.

import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest, ProxyConfig } from "next/server";
import {
  isAssetPath,
  sendMainlineBeacon,
} from "./lib/mainline-beacon";

export function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (!isAssetPath(pathname)) {
    const host =
      req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
    const xff = req.headers.get("x-forwarded-for");
    const clientIp = xff ? xff.split(",")[0]!.trim() : null;

    event.waitUntil(
      sendMainlineBeacon({
        host,
        path: pathname,
        method: req.method,
        userAgent: req.headers.get("user-agent"),
        referrer: req.headers.get("referer"),
        clientIp,
        // Response status isn't known at proxy time — the response hasn't
        // been produced yet. Mainline accepts null.
        statusCode: null,
        timestamp: Date.now(),
      }),
    );
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  // Skip Next's internal asset pipeline at the matcher level. We also
  // belt-and-suspenders this inside `proxy()` via `isAssetPath` for any
  // public/ files that slip through (favicons, manifests, etc).
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
