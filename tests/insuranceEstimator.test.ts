import { describe, expect, it } from "vitest";
import {
  estimatePremiumBand,
  getEstimatorChoices,
} from "@/lib/insuranceEstimator";

const baseInput = {
  stateSlug: "texas",
  productSlug: "primary-liability" as const,
  dotClassSlug: "class-8-tractor" as const,
  claimsHistory: "clean-36mo" as const,
  coverageLimitBand: "1m-standard" as const,
  radiusBand: "regional-500" as const,
};

describe("estimatePremiumBand", () => {
  it("returns the base observation unchanged for clean+1M+regional (factor 1.0)", () => {
    const r = estimatePremiumBand(baseInput);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.combinedFactor).toBe(1.0);
    expect(r.premiumLowAnnual).toBe(9000);
    expect(r.premiumHighAnnual).toBe(15000);
  });

  it("applies a 1.4x surcharge for one chargeable claim", () => {
    const r = estimatePremiumBand({ ...baseInput, claimsHistory: "1-claim" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.combinedFactor).toBeCloseTo(1.4);
    expect(r.premiumLowAnnual).toBe(Math.round(9000 * 1.4));
    expect(r.premiumHighAnnual).toBe(Math.round(15000 * 1.4));
  });

  it("applies a 2x surcharge for two-plus claims", () => {
    const r = estimatePremiumBand({
      ...baseInput,
      claimsHistory: "2-plus-claims",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.combinedFactor).toBeCloseTo(2.0);
    expect(r.premiumLowAnnual).toBe(18000);
    expect(r.premiumHighAnnual).toBe(30000);
  });

  it("applies a 0.85x discount for FMCSA minimum limits", () => {
    const r = estimatePremiumBand({
      ...baseInput,
      coverageLimitBand: "fmcsa-minimum",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.combinedFactor).toBeCloseTo(0.85);
  });

  it("applies a 1.8x surcharge for hazmat ($5M) limits", () => {
    const r = estimatePremiumBand({
      ...baseInput,
      coverageLimitBand: "5m-hazmat",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.combinedFactor).toBeCloseTo(1.8);
  });

  it("applies a 0.9x discount for local radius", () => {
    const r = estimatePremiumBand({
      ...baseInput,
      radiusBand: "local-100",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.combinedFactor).toBeCloseTo(0.9);
  });

  it("applies a 1.15x surcharge for long-haul radius", () => {
    const r = estimatePremiumBand({
      ...baseInput,
      radiusBand: "long-haul-1000+",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.combinedFactor).toBeCloseTo(1.15);
  });

  it("multiplies modifiers when several apply (1-claim × 2M × long-haul)", () => {
    const r = estimatePremiumBand({
      ...baseInput,
      claimsHistory: "1-claim",
      coverageLimitBand: "2m-elevated",
      radiusBand: "long-haul-1000+",
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.combinedFactor).toBeCloseTo(1.4 * 1.35 * 1.15);
  });

  it("returns no-observation for a state that has no sampled rate", () => {
    const r = estimatePremiumBand({ ...baseInput, stateSlug: "california" });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.reason).toBe("no-observation");
  });

  it("returns invalid-state for an unsupported state", () => {
    const r = estimatePremiumBand({
      ...baseInput,
      stateSlug: "puerto-rico",
    });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.reason).toBe("invalid-state");
  });

  it("returns no-observation for an unpublished DOT class", () => {
    const r = estimatePremiumBand({ ...baseInput, dotClassSlug: "tow" });
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.reason).toBe("no-observation");
  });

  it("populates the modifier breakdown with name, factor, and reason", () => {
    const r = estimatePremiumBand(baseInput);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.modifiers).toHaveLength(3);
    for (const m of r.modifiers) {
      expect(m.name).toMatch(/^(Claims|Coverage|Radius)/);
      expect(typeof m.factor).toBe("number");
      expect(m.reason.length).toBeGreaterThan(10);
    }
  });
});

describe("getEstimatorChoices", () => {
  it("exposes 4 claims, 4 coverage, 3 radius keys with reasons", () => {
    const c = getEstimatorChoices();
    expect(c.claims).toHaveLength(4);
    expect(c.coverage).toHaveLength(4);
    expect(c.radius).toHaveLength(3);
    for (const arr of [c.claims, c.coverage, c.radius]) {
      for (const item of arr) {
        expect(item.key.length).toBeGreaterThan(0);
        expect(item.reason.length).toBeGreaterThan(10);
      }
    }
  });
});
