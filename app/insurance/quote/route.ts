import { NextResponse } from "next/server";
import { InsuranceStarterSubmissionSchema } from "@/lib/insuranceValidation";
import {
  appendInsuranceLead,
  isTcpaRequired,
} from "@/lib/insuranceLeadStore";

/* ===========================================================================
   POST /insurance/quote — accepts the form-encoded submission from
   ZipDotClassForm, validates it, persists it, and 303-redirects to the
   thanks page on success or back to the source page on validation error.

   Native HTML form submission flow (no client JS required). The browser
   follows the 303 to the new resource and the form data is not resent.
   =========================================================================== */

const SOURCE_BACK_URL_FALLBACK = "/insurance";

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_form_data" },
      { status: 400 },
    );
  }

  const intent = {
    productSlug: str(formData, "productSlug"),
    dotClassSlug: str(formData, "dotClass"),
    stateSlug: str(formData, "stateSlug"),
    zip: str(formData, "zip"),
    radiusBand: str(formData, "radius"),
  };

  const contact = {
    name: str(formData, "name"),
    mobile: str(formData, "mobile"),
    email: str(formData, "email"),
  };

  const tcpa = {
    trustedFormCert:
      str(formData, "xxTrustedFormCertUrl") ||
      str(formData, "trustedFormCert") ||
      undefined,
    jornayaToken:
      str(formData, "leadid_token") || str(formData, "jornayaToken") || undefined,
    oneToOneConsent: formData.get("oneToOneConsent") === "true",
    consentVersion: str(formData, "consentVersion"),
    consentTimestamp: new Date().toISOString(),
    consentText: str(formData, "consentText"),
  };

  const sourceUrl = str(formData, "sourceUrl") || SOURCE_BACK_URL_FALLBACK;

  // Production gate: missing TCPA artifacts in strict mode is a hard fail.
  if (
    isTcpaRequired() &&
    (!tcpa.trustedFormCert || !tcpa.jornayaToken)
  ) {
    return redirectBack(req, sourceUrl, "tcpa_artifacts_missing");
  }

  const parsed = InsuranceStarterSubmissionSchema.safeParse({
    intent,
    contact,
    tcpa,
  });
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const code = firstIssue
      ? `validation:${firstIssue.path.join(".")}`
      : "validation_failed";
    return redirectBack(req, sourceUrl, code);
  }

  const stored = await appendInsuranceLead(parsed.data);

  const successUrl = new URL("/insurance/thanks", req.url);
  successUrl.searchParams.set("id", stored.leadId);
  return NextResponse.redirect(successUrl, 303);
}

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

function redirectBack(req: Request, source: string, code: string): Response {
  const back = new URL(source, req.url);
  back.searchParams.set("error", code);
  return NextResponse.redirect(back, 303);
}
