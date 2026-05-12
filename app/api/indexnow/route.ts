import { NextResponse } from "next/server";
import { submitBatchedToIndexNow } from "@/lib/indexnow";
import sitemap from "@/app/sitemap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* POST /api/indexnow
   Submits all sitemap URLs to IndexNow (Bing, Yandex, Yep, Seznam, Naver).
   Guarded by INDEXNOW_SUBMIT_SECRET env var — set in Render dashboard.
   Caller must pass `secret` matching that env var.

   Typical use:
     curl -X POST https://dispatched.finance/api/indexnow \
       -H "Content-Type: application/json" \
       -d '{"secret":"$INDEXNOW_SUBMIT_SECRET"}'

   Returns JSON with submission result. */

type RequestBody = {
  readonly secret?: string;
  readonly urls?: ReadonlyArray<string>; // optional subset; defaults to full sitemap
};

export async function POST(request: Request) {
  const expected = process.env.INDEXNOW_SUBMIT_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "INDEXNOW_SUBMIT_SECRET not configured." },
      { status: 503 },
    );
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body.secret !== "string" || body.secret !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // If a specific subset was passed, submit just that. Otherwise enumerate
  // the entire sitemap and submit every URL.
  let urls: ReadonlyArray<string>;
  if (Array.isArray(body.urls) && body.urls.length > 0) {
    urls = body.urls.filter((u): u is string => typeof u === "string");
  } else {
    const entries = sitemap();
    urls = entries.map((e) => e.url);
  }

  const result = await submitBatchedToIndexNow(urls);
  if (result.ok) {
    return NextResponse.json({
      ok: true,
      status: result.status,
      submitted: result.urlCount,
    });
  }
  return NextResponse.json(
    { ok: false, status: result.status, error: result.error },
    { status: 500 },
  );
}
