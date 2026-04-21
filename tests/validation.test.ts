import { describe, expect, it } from "vitest";
import { ContactSchema, IntakePayloadSchema } from "@/lib/validation";

describe("ContactSchema", () => {
  const valid = {
    name: "Marcus Holloway",
    mobile: "(405) 318-2740",
    email: "marcus@hollowayfreight.com",
  };

  it("accepts a valid contact", () => {
    const result = ContactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects a single-word name", () => {
    const result = ContactSchema.safeParse({ ...valid, name: "Marcus" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/first and last/i);
    }
  });

  it("rejects a name shorter than 3 chars", () => {
    const result = ContactSchema.safeParse({ ...valid, name: "Jo" });
    expect(result.success).toBe(false);
  });

  it("trims whitespace before validating name length", () => {
    const result = ContactSchema.safeParse({
      ...valid,
      name: "  Marcus Holloway  ",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a non-phone string", () => {
    const result = ContactSchema.safeParse({ ...valid, mobile: "hello" });
    expect(result.success).toBe(false);
  });

  it("rejects a non-US phone number", () => {
    const result = ContactSchema.safeParse({
      ...valid,
      mobile: "+44 20 7946 0958",
    });
    expect(result.success).toBe(false);
  });

  it("accepts multiple US phone number formats", () => {
    const formats = [
      "(405) 318-2740",
      "405-318-2740",
      "+1 405 318 2740",
      "4053182740",
    ];
    for (const mobile of formats) {
      const result = ContactSchema.safeParse({ ...valid, mobile });
      expect(result.success, `format ${mobile}`).toBe(true);
    }
  });

  it("rejects a malformed email", () => {
    const result = ContactSchema.safeParse({ ...valid, email: "not an email" });
    expect(result.success).toBe(false);
  });
});

describe("IntakePayloadSchema", () => {
  const valid = {
    useCase: "repairs",
    vertical: "owner-operator",
    amount: 95000,
    amountBand: "custom",
    revenueTier: 3,
    timeInBusinessTier: 4,
    creditBand: "650-720",
    contact: {
      name: "Marcus Holloway",
      mobile: "(405) 318-2740",
      email: "marcus@hollowayfreight.com",
    },
  };

  it("accepts a valid intake payload", () => {
    const result = IntakePayloadSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("rejects invalid vertical", () => {
    const result = IntakePayloadSchema.safeParse({
      ...valid,
      vertical: "construction",
    });
    expect(result.success).toBe(false);
  });

  it("rejects revenueTier outside 1-4", () => {
    const result = IntakePayloadSchema.safeParse({ ...valid, revenueTier: 5 });
    expect(result.success).toBe(false);
  });

  it("rejects negative amount", () => {
    const result = IntakePayloadSchema.safeParse({ ...valid, amount: -100 });
    expect(result.success).toBe(false);
  });

  it("rejects invalid creditBand", () => {
    const result = IntakePayloadSchema.safeParse({
      ...valid,
      creditBand: "unknown",
    });
    expect(result.success).toBe(false);
  });

  it("strips unknown top-level keys by default", () => {
    const result = IntakePayloadSchema.safeParse({
      ...valid,
      matchEstimate: { tier: "A" },
      hasSeenMatch: true,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("matchEstimate");
      expect(result.data).not.toHaveProperty("hasSeenMatch");
    }
  });
});
