import { NextResponse } from "next/server";
import { verifyLendflowSignature } from "@/lib/lendflow/verifySignature";

export async function POST(req: Request) {
  const secret = process.env.LENDFLOW_WEBHOOK_SECRET;
  if (!secret) {
    console.error(
      "[lendflow webhook] LENDFLOW_WEBHOOK_SECRET not set; dropping event"
    );
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 503 }
    );
  }

  const signature = req.headers.get("Lendflow-Verification-Signature");
  const timestamp = req.headers.get("Lendflow-Verification-Timestamp");
  if (!signature || !timestamp) {
    return NextResponse.json(
      { ok: false, error: "missing_signature_headers" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();

  if (!verifyLendflowSignature({ secret, timestamp, body: rawBody, signature })) {
    return NextResponse.json(
      { ok: false, error: "invalid_signature" },
      { status: 400 }
    );
  }

  let event: unknown;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  console.log("[lendflow webhook]", JSON.stringify(event));

  return NextResponse.json({ ok: true });
}
