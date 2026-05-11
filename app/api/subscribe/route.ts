import { NextResponse } from "next/server";
import { EmailSubscribeSchema } from "@/lib/validation/emailSchema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = EmailSubscribeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or source." }, { status: 400 });
  }

  // V1: log only. Future: integrate Mailchimp / Resend / SendGrid via env var.
  console.log("[subscribe]", parsed.data);

  return NextResponse.json({ ok: true }, { status: 200 });
}
