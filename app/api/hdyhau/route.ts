import { NextResponse } from "next/server";
import { HdyhauSchema } from "@/lib/validation/hdyhauSchema";

export const runtime = "nodejs";

/* POST /api/hdyhau — "how did you hear about us" attribution event.
   Single-select channel + optional write-in + source page. Logged to
   stdout for now (Render captures it); DB persistence lands when the
   broader DATABASE_URL wiring lands in v2.

   Closes D5 of the AEO audit: the GA4 AI-referrer channel grouping
   catches direct browser referrals only. Users who copy-paste an answer
   from ChatGPT/Perplexity/Claude arrive as Direct traffic and were
   previously invisible to attribution. This route restores that
   visibility. */

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = HdyhauSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation_failed",
        issues: parsed.error.issues.map((i) => ({
          path: i.path,
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  // ANALYTICS_HOOK: hdyhau_received — replace console with structured
  // logger + DATABASE_URL persistence in v2. Render captures stdout.
  console.log("[hdyhau]", JSON.stringify(parsed.data));

  return NextResponse.json({ ok: true });
}
