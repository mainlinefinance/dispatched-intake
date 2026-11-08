import { NextResponse } from "next/server";
import { IntakePayloadSchema } from "@/lib/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = IntakePayloadSchema.safeParse(body);
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
      { status: 400 }
    );
  }

  const leadId = crypto.randomUUID();

  // Not the live funding form. /apply embeds the Mainline widget, and that
  // frame posts to the widget host's /api/widget-lead. This UUID is not a
  // Big Think Capital acceptance and must not be reported as an ads conversion.
  // ANALYTICS_HOOK: intake_lead_received — replace console with structured
  // logger + real persistence (DATABASE_URL) in v2. Render captures stdout.
  console.log(
    "[intake submit]",
    JSON.stringify({ leadId, payload: parsed.data })
  );

  return NextResponse.json({ ok: true, leadId });
}
