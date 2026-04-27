import { describe, expect, it } from "vitest";
import {
  InsuranceIntentSchema,
  TcpaArtifactsSchema,
  InsuranceLeadSubmissionSchema,
} from "@/lib/insuranceValidation";

const validIntent = {
  productSlug: "primary-liability",
  dotClassSlug: "class-8-tractor",
  stateSlug: "texas",
  zip: "78701",
  radiusBand: "regional-500",
  authorityStatus: "own-authority",
  claimsHistory: "clean-36mo",
  coverageLimitBand: "1m-standard",
  hasReeferUnit: false,
  carriesHazmat: false,
};

const validTcpa = {
  trustedFormCert:
    "https://cert.trustedform.com/0123456789abcdef0123456789abcdef01234567",
  jornayaToken: "a1b2c3d4-e5f6-7890-abcd-ef0123456789",
  oneToOneConsent: true,
  consentTimestamp: "2026-04-27T15:30:00Z",
  consentText:
    "I agree to be contacted by Dispatched and the named broker partner by phone or text, including via automated technology.",
};

const validContact = {
  name: "Marcus Holloway",
  mobile: "(405) 318-2740",
  email: "marcus@hollowayfreight.com",
};

describe("InsuranceIntentSchema", () => {
  it("accepts a fully valid intent", () => {
    expect(InsuranceIntentSchema.safeParse(validIntent).success).toBe(true);
  });

  it("rejects a 4-digit ZIP", () => {
    const r = InsuranceIntentSchema.safeParse({ ...validIntent, zip: "7870" });
    expect(r.success).toBe(false);
  });

  it("rejects an unknown product slug", () => {
    const r = InsuranceIntentSchema.safeParse({
      ...validIntent,
      productSlug: "nonexistent-product",
    });
    expect(r.success).toBe(false);
  });

  it("rejects an unknown DOT class slug", () => {
    const r = InsuranceIntentSchema.safeParse({
      ...validIntent,
      dotClassSlug: "spaceship",
    });
    expect(r.success).toBe(false);
  });

  it("rejects an unsupported state slug", () => {
    const r = InsuranceIntentSchema.safeParse({
      ...validIntent,
      stateSlug: "puerto-rico",
    });
    expect(r.success).toBe(false);
  });
});

describe("TcpaArtifactsSchema", () => {
  it("accepts a valid TCPA bundle", () => {
    expect(TcpaArtifactsSchema.safeParse(validTcpa).success).toBe(true);
  });

  it("rejects oneToOneConsent = false", () => {
    const r = TcpaArtifactsSchema.safeParse({
      ...validTcpa,
      oneToOneConsent: false,
    });
    expect(r.success).toBe(false);
  });

  it("rejects a TrustedForm cert on the wrong domain", () => {
    const r = TcpaArtifactsSchema.safeParse({
      ...validTcpa,
      trustedFormCert: "https://example.com/cert/abc123",
    });
    expect(r.success).toBe(false);
  });

  it("rejects a malformed Jornaya UUID", () => {
    const r = TcpaArtifactsSchema.safeParse({
      ...validTcpa,
      jornayaToken: "not-a-uuid",
    });
    expect(r.success).toBe(false);
  });

  it("rejects a non-ISO consentTimestamp", () => {
    const r = TcpaArtifactsSchema.safeParse({
      ...validTcpa,
      consentTimestamp: "April 27, 2026 3:30pm",
    });
    expect(r.success).toBe(false);
  });

  it("rejects consentText shorter than the minimum disclosure length", () => {
    const r = TcpaArtifactsSchema.safeParse({
      ...validTcpa,
      consentText: "I agree.",
    });
    expect(r.success).toBe(false);
  });
});

describe("InsuranceLeadSubmissionSchema", () => {
  it("accepts a fully composed submission", () => {
    const r = InsuranceLeadSubmissionSchema.safeParse({
      intent: validIntent,
      contact: validContact,
      tcpa: validTcpa,
    });
    expect(r.success).toBe(true);
  });

  it("fails when any of the three sub-schemas fails", () => {
    const r = InsuranceLeadSubmissionSchema.safeParse({
      intent: validIntent,
      contact: validContact,
      tcpa: { ...validTcpa, oneToOneConsent: false },
    });
    expect(r.success).toBe(false);
  });
});
