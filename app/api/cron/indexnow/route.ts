import { NextResponse } from "next/server";

/* ===========================================================================
   IndexNow cron route.

   Why this exists alongside scripts/submit-indexnow.mjs:
     - The .mjs script runs as a post-build step, so it only fires on deploy.
       This route lets a Render cron job (or a manual `curl`) re-ping every
       few hours without redeploying — useful when a fresh sitemap entry was
       added editorially or when Bing/Yandex haven't picked up earlier pings.
     - Logs route through the web service's stdout, surfacing in the same
       Render log stream as request logs (the cron-job logs are separate).

   Auth model:
     Bearer token in the Authorization header. The same CRON_SECRET must be
     set on the web service (so the route can verify) AND on the cron job
     (so it can send). Constant-time compare to defang timing-attack noise
     even though the secret is high-entropy.

   The IndexNow protocol:
     POST https://api.indexnow.org/indexnow with { host, key, keyLocation,
     urlList }. Search engines (Bing, Yandex, Naver, Seznam, Yep) verify
     `keyLocation` returns the key as plain text, then crawl the URLs in
     `urlList`. Up to 10,000 URLs per call. Spec: https://www.indexnow.org/documentation
   =========================================================================== */

// Always run at request time. Never serve a cached snapshot — the whole point
// is to re-fetch the live sitemap and re-submit on each invocation.
export const dynamic = "force-dynamic";

// The default key is the one currently checked in at
// public/f7d09b96f43c7976a9a6e1f50552181f.txt. If you rotate the key, update
// the env var INDEXNOW_KEY *and* rename/replace the static file in /public.
const DEFAULT_INDEXNOW_KEY = "f7d09b96f43c7976a9a6e1f50552181f";
const INDEXNOW_API = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10000;

function jsonResponse(
  body: { ok: boolean; submitted: number; error?: string },
  status: number,
): NextResponse {
  return NextResponse.json(body, { status });
}

function timingSafeEqual(a: string, b: string): boolean {
  // Length leak is acceptable here — the secret is fixed length once set.
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function isAuthorized(req: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Bearer ")) return false;
  const provided = header.slice("Bearer ".length).trim();
  return timingSafeEqual(provided, expected);
}

function parseSitemapLocs(xml: string): string[] {
  const locs: string[] = [];
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = m[1]?.trim();
    if (url) locs.push(url);
  }
  return locs;
}

export async function POST(req: Request): Promise<NextResponse> {
  if (!isAuthorized(req)) {
    return jsonResponse({ ok: false, submitted: 0, error: "unauthorized" }, 401);
  }

  const host =
    process.env.INDEXNOW_HOST ||
    new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://dispatched.finance")
      .hostname;
  const key = process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY;
  const keyLocation = `https://${host}/${key}.txt`;
  const sitemapUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? `https://${host}`}/sitemap.xml`;

  // Fetch the live sitemap. Errors here are operational (DNS/network/5xx) —
  // surface them with a 500 so a failed cron fires a Render alert.
  let sitemapXml: string;
  try {
    const res = await fetch(sitemapUrl, {
      headers: { "User-Agent": "dispatched-indexnow-cron/1.0" },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(
        `[indexnow] sitemap fetch failed ${res.status} ${res.statusText} url=${sitemapUrl}`,
      );
      return jsonResponse(
        {
          ok: false,
          submitted: 0,
          error: `sitemap_fetch_failed_${res.status}`,
        },
        500,
      );
    }
    sitemapXml = await res.text();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[indexnow] sitemap fetch threw url=${sitemapUrl} err=${message}`);
    return jsonResponse(
      { ok: false, submitted: 0, error: "sitemap_fetch_threw" },
      500,
    );
  }

  const allUrls = parseSitemapLocs(sitemapXml);

  // Defense in depth: drop anything that isn't on the host we're claiming
  // ownership of. IndexNow rejects mixed-host submissions anyway, but a
  // partial-host bug in sitemap.ts shouldn't leak to the API.
  const urls = allUrls.filter((u) => {
    try {
      return new URL(u).hostname === host;
    } catch {
      return false;
    }
  });

  if (urls.length === 0) {
    console.log(`[indexnow] host=${host} sitemap=${sitemapUrl} submitted=0 (empty)`);
    return jsonResponse({ ok: true, submitted: 0 }, 200);
  }

  // Batch into chunks of 10,000 (the IndexNow per-request max). Current
  // sitemap is ~124 URLs; this is safety for future programmatic growth.
  let submitted = 0;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    try {
      const res = await fetch(INDEXNOW_API, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
      });
      // 200 = accepted and indexed, 202 = accepted pending key validation.
      // Anything else is the API rejecting us — log + return 503 so the
      // cron job is marked as a soft failure (operator-visible) rather
      // than a hard 500 on the web service.
      if (res.status !== 200 && res.status !== 202) {
        const text = await res.text().catch(() => "");
        console.error(
          `[indexnow] api ${res.status} batch=${batch.length} body=${text.slice(0, 200)}`,
        );
        return jsonResponse(
          {
            ok: false,
            submitted,
            error: `indexnow_api_${res.status}`,
          },
          503,
        );
      }
      submitted += batch.length;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[indexnow] api fetch threw batch=${batch.length} err=${message}`);
      return jsonResponse(
        { ok: false, submitted, error: "indexnow_api_threw" },
        503,
      );
    }
  }

  console.log(
    `[indexnow] host=${host} sitemap=${sitemapUrl} submitted=${submitted}`,
  );
  return jsonResponse({ ok: true, submitted }, 200);
}
