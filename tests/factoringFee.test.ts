import { describe, expect, it } from "vitest";
import {
  computeFactoringFee,
  type FactoringFeeInputs,
} from "@/lib/factoringFee";

/* Pinned factoring-fee test cases. Inputs cover the five scenarios the
   brief calls out: standard recourse, high-advance non-recourse, low
   advance, the 30-day boundary case, and a case where the effective
   annualized rate exceeds 50% (which is the moment factoring stops
   looking cheap and starts looking like high-end working capital). */

describe("computeFactoringFee — standard recourse case", () => {
  it("$5k invoice, 3%, 95% advance, 30 days → $150 fee, $4,750 advance, ~36.5% effective APR", () => {
    const inputs: FactoringFeeInputs = {
      invoiceAmount: 5_000,
      ratePer30Days: 3,
      advancePercent: 95,
      daysOutstanding: 30,
      recourseType: "recourse",
    };
    const r = computeFactoringFee(inputs);
    // 5000 × 0.03 × (30/30) = 150
    expect(r.factorFee).toBeCloseTo(150, 6);
    // 5000 × 0.95 = 4750
    expect(r.advanceAmount).toBeCloseTo(4_750, 6);
    // 5000 − 4750 = 250
    expect(r.reserveAmount).toBeCloseTo(250, 6);
    // 250 − 150 = 100
    expect(r.netToCarrierOnBrokerPay).toBeCloseTo(100, 6);
    // (150 / 4750) × (365 / 30) × 100 ≈ 38.42
    expect(r.effectiveAnnualizedRate).toBeCloseTo(38.42, 1);
  });
});

describe("computeFactoringFee — high advance non-recourse case", () => {
  it("$10k invoice, 4%, 100% advance, 45 days", () => {
    const inputs: FactoringFeeInputs = {
      invoiceAmount: 10_000,
      ratePer30Days: 4,
      advancePercent: 100,
      daysOutstanding: 45,
      recourseType: "non-recourse",
    };
    const r = computeFactoringFee(inputs);
    // 10000 × 0.04 × (45/30) = 600
    expect(r.factorFee).toBeCloseTo(600, 6);
    expect(r.advanceAmount).toBeCloseTo(10_000, 6);
    // 100% advance => reserve = 0
    expect(r.reserveAmount).toBeCloseTo(0, 6);
    // Net = 0 − 600 = −600 (fee deducted from absent reserve; carrier
    // would owe back the fee on broker pay or it would come out of the
    // next funded load — math is the point, the workflow is for the UI)
    expect(r.netToCarrierOnBrokerPay).toBeCloseTo(-600, 6);
    // (600 / 10000) × (365 / 45) × 100 ≈ 48.67
    expect(r.effectiveAnnualizedRate).toBeCloseTo(48.67, 1);
  });
});

describe("computeFactoringFee — low advance case", () => {
  it("$2k invoice, 2%, 80% advance, 21 days", () => {
    const inputs: FactoringFeeInputs = {
      invoiceAmount: 2_000,
      ratePer30Days: 2,
      advancePercent: 80,
      daysOutstanding: 21,
      recourseType: "recourse",
    };
    const r = computeFactoringFee(inputs);
    // 2000 × 0.02 × (21/30) = 28
    expect(r.factorFee).toBeCloseTo(28, 6);
    // 2000 × 0.80 = 1600
    expect(r.advanceAmount).toBeCloseTo(1_600, 6);
    // 2000 − 1600 = 400
    expect(r.reserveAmount).toBeCloseTo(400, 6);
    // 400 − 28 = 372
    expect(r.netToCarrierOnBrokerPay).toBeCloseTo(372, 6);
    // (28 / 1600) × (365 / 21) × 100 ≈ 30.42
    expect(r.effectiveAnnualizedRate).toBeCloseTo(30.42, 1);
  });
});

describe("computeFactoringFee — 30-day boundary", () => {
  it("days=30 → daysFactor exactly 1 → fee equals invoice × rate", () => {
    const r = computeFactoringFee({
      invoiceAmount: 8_000,
      ratePer30Days: 2.5,
      advancePercent: 92,
      daysOutstanding: 30,
      recourseType: "recourse",
    });
    // 8000 × 0.025 × (30/30) = 200 — exact, no proration
    expect(r.factorFee).toBeCloseTo(200, 6);
    expect(r.advanceAmount).toBeCloseTo(7_360, 6);
    expect(r.reserveAmount).toBeCloseTo(640, 6);
    expect(r.netToCarrierOnBrokerPay).toBeCloseTo(440, 6);
  });

  it("days=60 → daysFactor=2 → fee is exactly double the 30-day case", () => {
    const r30 = computeFactoringFee({
      invoiceAmount: 5_000,
      ratePer30Days: 3,
      advancePercent: 95,
      daysOutstanding: 30,
      recourseType: "recourse",
    });
    const r60 = computeFactoringFee({
      invoiceAmount: 5_000,
      ratePer30Days: 3,
      advancePercent: 95,
      daysOutstanding: 60,
      recourseType: "recourse",
    });
    expect(r60.factorFee).toBeCloseTo(r30.factorFee * 2, 6);
  });
});

describe("computeFactoringFee — effective rate above 50%", () => {
  it("high rate × short days produces effective APR > 50%", () => {
    /* 6% per 30 days on a 21-day invoice with a 95% advance:
       fee = 1000 × 0.06 × (21/30) = 42
       adv = 950
       eff = (42 / 950) × (365 / 21) × 100 ≈ 76.84% */
    const r = computeFactoringFee({
      invoiceAmount: 1_000,
      ratePer30Days: 6,
      advancePercent: 95,
      daysOutstanding: 21,
      recourseType: "recourse",
    });
    expect(r.effectiveAnnualizedRate).toBeGreaterThan(50);
    expect(r.effectiveAnnualizedRate).toBeCloseTo(76.84, 1);
  });
});

describe("computeFactoringFee — invariants", () => {
  it("reserveAmount + advanceAmount === invoiceAmount", () => {
    const r = computeFactoringFee({
      invoiceAmount: 5_000,
      ratePer30Days: 3,
      advancePercent: 95,
      daysOutstanding: 30,
      recourseType: "recourse",
    });
    expect(r.advanceAmount + r.reserveAmount).toBeCloseTo(5_000, 6);
  });

  it("higher daysOutstanding raises both factorFee and effective APR... wait, no — effective APR is invariant to days if rate is per-30 linear", () => {
    /* Sanity: with the current pricing model (linear in days), the
       effective annualized rate is INVARIANT to days outstanding,
       because fee scales linearly with days and the annualizer divides
       by days. This is mathematically intentional — it's exactly why
       "per 30 days" pricing maps cleanly to an APR. */
    const base: FactoringFeeInputs = {
      invoiceAmount: 5_000,
      ratePer30Days: 3,
      advancePercent: 95,
      daysOutstanding: 30,
      recourseType: "recourse",
    };
    const longer = computeFactoringFee({ ...base, daysOutstanding: 60 });
    const shorter = computeFactoringFee({ ...base, daysOutstanding: 15 });
    expect(longer.effectiveAnnualizedRate).toBeCloseTo(
      shorter.effectiveAnnualizedRate,
      6,
    );
  });

  it("higher advance% lowers reserve and reduces hold-back release", () => {
    const low = computeFactoringFee({
      invoiceAmount: 5_000,
      ratePer30Days: 3,
      advancePercent: 85,
      daysOutstanding: 30,
      recourseType: "recourse",
    });
    const high = computeFactoringFee({
      invoiceAmount: 5_000,
      ratePer30Days: 3,
      advancePercent: 97,
      daysOutstanding: 30,
      recourseType: "recourse",
    });
    expect(high.reserveAmount).toBeLessThan(low.reserveAmount);
    expect(high.netToCarrierOnBrokerPay).toBeLessThan(
      low.netToCarrierOnBrokerPay,
    );
  });
});
