import { describe, expect, it, beforeEach, vi, afterEach } from "vitest";

import { POST } from "@/app/insurance/quote/route";
import {
  INSURANCE_CONSENT_TEXT,
  INSURANCE_CONSENT_VERSION,
} from "@/lib/insuranceConsent";

const ORIGIN = "http://localhost:3000";

function makeRequest(fields: Record<string, string>): Request {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return new Request(`${ORIGIN}/insurance/quote`, {
    method: "POST",
    body: fd,
  });
}

const validFields: Record<string, string> = {
  productSlug: "primary-liability",
  dotClass: "class-8-tractor",
  stateSlug: "texas",
  zip: "78701",
  radius: "regional-500",
  name: "Marcus Holloway",
  mobile: "(405) 318-2740",
  email: "marcus@hollowayfreight.com",
  oneToOneConsent: "true",
  consentVersion: INSURANCE_CONSENT_VERSION,
  consentText: INSURANCE_CONSENT_TEXT,
  sourceUrl: "/insurance/primary-liability/texas",
};

describe("POST /insurance/quote", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    delete process.env.INSURANCE_LEAD_REQUIRE_TCPA;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("303-redirects to /insurance/thanks?id=... on a valid submission", async () => {
    const res = await POST(makeRequest(validFields));
    expect(res.status).toBe(303);
    const loc = res.headers.get("location") ?? "";
    const u = new URL(loc);
    expect(u.pathname).toBe("/insurance/thanks");
    expect(u.searchParams.get("id")).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  });

  it("redirects back with an error code when the consent box is unchecked", async () => {
    const res = await POST(
      makeRequest({ ...validFields, oneToOneConsent: "" }),
    );
    expect(res.status).toBe(303);
    const u = new URL(res.headers.get("location") ?? "");
    expect(u.pathname).toBe("/insurance/primary-liability/texas");
    expect(u.searchParams.get("error")).toMatch(/^validation:/);
  });

  it("rejects when ZIP is too short", async () => {
    const res = await POST(makeRequest({ ...validFields, zip: "1234" }));
    expect(res.status).toBe(303);
    const u = new URL(res.headers.get("location") ?? "");
    expect(u.searchParams.get("error")).toMatch(/^validation:/);
  });

  it("rejects in strict TCPA mode when artifacts are missing", async () => {
    process.env.INSURANCE_LEAD_REQUIRE_TCPA = "true";
    const res = await POST(makeRequest(validFields));
    expect(res.status).toBe(303);
    const u = new URL(res.headers.get("location") ?? "");
    expect(u.searchParams.get("error")).toBe("tcpa_artifacts_missing");
  });

  it("accepts valid submission in strict mode when both TCPA artifacts are present", async () => {
    process.env.INSURANCE_LEAD_REQUIRE_TCPA = "true";
    const res = await POST(
      makeRequest({
        ...validFields,
        xxTrustedFormCertUrl:
          "https://cert.trustedform.com/0123456789abcdef0123456789abcdef01234567",
        leadid_token: "a1b2c3d4-e5f6-7890-abcd-ef0123456789",
      }),
    );
    expect(res.status).toBe(303);
    const u = new URL(res.headers.get("location") ?? "");
    expect(u.pathname).toBe("/insurance/thanks");
  });
});
