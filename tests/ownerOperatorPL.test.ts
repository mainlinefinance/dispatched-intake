import { describe, expect, it } from "vitest";
import {
  computeOwnerOperatorPL,
  type PLInputs,
} from "@/lib/ownerOperatorPL";

/* Pinned P&L test cases. Inputs cover the five scenarios the brief
   calls out: a baseline 2,500-loaded-mile week at $2.50/mi, a higher
   volume week at a lower rate ($2.20 × 3,500), a high-deadhead variant,
   a factoring-fee variant, and a breakeven-accuracy check that sets
   inputs so net = 0 and verifies the closed-form breakeven matches. */

const BASELINE: PLInputs = {
  ratePerMile: 2.5,
  loadedMilesPerWeek: 2_500,
  deadheadPercent: 15,
  fuelPricePerGallon: 3.8,
  mpg: 6.5,
  truckPaymentWeekly: 600,
  insuranceWeekly: 250,
  otherFixedWeekly: 200,
  factoringPercent: 0,
};

describe("computeOwnerOperatorPL — baseline scenario", () => {
  it("2,500 loaded mi at $2.50/mi, 15% deadhead, no factoring → expected weekly net", () => {
    const r = computeOwnerOperatorPL(BASELINE);
    // revenue = 2.50 × 2500 = 6,250
    expect(r.weeklyRevenue).toBeCloseTo(6_250, 2);
    // total miles = 2500 / 0.85 ≈ 2941.18
    expect(r.totalMilesPerWeek).toBeCloseTo(2_941.18, 1);
    // fuel = (2941.18 / 6.5) × 3.80 ≈ 1,719.46
    expect(r.fuelCostWeekly).toBeCloseTo(1_719.46, 1);
    // factoring = 0
    expect(r.factoringFeeWeekly).toBe(0);
    // fixed = 600 + 250 + 200 = 1,050
    expect(r.totalFixedWeekly).toBe(1_050);
    // op cost = 1719.46 + 0 + 1050 = 2,769.46
    expect(r.totalOperatingCostWeekly).toBeCloseTo(2_769.46, 1);
    // net = 6250 − 2769.46 = 3,480.54
    expect(r.netIncomeWeekly).toBeCloseTo(3_480.54, 1);
    // annualized = 3480.54 × 50 ≈ 174,027
    expect(r.annualizedNet).toBeCloseTo(174_027.15, 0);
    // cost per total mile = 2769.46 / 2941.18 ≈ 0.9416 — well under stress threshold
    expect(r.costPerTotalMile).toBeCloseTo(0.94, 2);
  });
});

describe("computeOwnerOperatorPL — high volume, lower rate", () => {
  it("3,500 loaded mi at $2.20/mi, 15% deadhead → higher revenue, higher fuel, net trade-off", () => {
    const r = computeOwnerOperatorPL({
      ...BASELINE,
      ratePerMile: 2.2,
      loadedMilesPerWeek: 3_500,
    });
    // revenue = 2.20 × 3500 = 7,700
    expect(r.weeklyRevenue).toBeCloseTo(7_700, 2);
    // total miles = 3500 / 0.85 ≈ 4117.65
    expect(r.totalMilesPerWeek).toBeCloseTo(4_117.65, 1);
    // fuel = (4117.65 / 6.5) × 3.80 ≈ 2407.24
    expect(r.fuelCostWeekly).toBeCloseTo(2_407.24, 1);
    // op cost = 2407.24 + 0 + 1050 = 3457.24
    expect(r.totalOperatingCostWeekly).toBeCloseTo(3_457.24, 1);
    // net = 7700 − 3457.24 = 4242.76 — higher net than baseline despite lower rate
    expect(r.netIncomeWeekly).toBeCloseTo(4_242.76, 1);
    // Higher volume + lower rate beats baseline because fixed costs amortize
    expect(r.netIncomeWeekly).toBeGreaterThan(
      computeOwnerOperatorPL(BASELINE).netIncomeWeekly,
    );
  });
});

describe("computeOwnerOperatorPL — deadhead impact", () => {
  it("25% deadhead vs 15% deadhead lowers net (more empty miles burn more fuel)", () => {
    const base = computeOwnerOperatorPL(BASELINE);
    const high = computeOwnerOperatorPL({ ...BASELINE, deadheadPercent: 25 });
    // 25% deadhead → total miles = 2500 / 0.75 ≈ 3333.33
    expect(high.totalMilesPerWeek).toBeCloseTo(3_333.33, 1);
    // Fuel cost rises with total miles
    expect(high.fuelCostWeekly).toBeGreaterThan(base.fuelCostWeekly);
    // Revenue unchanged (rate × loaded miles)
    expect(high.weeklyRevenue).toBe(base.weeklyRevenue);
    // Net falls because fuel cost rose with no revenue offset
    expect(high.netIncomeWeekly).toBeLessThan(base.netIncomeWeekly);
    // Cost per total mile falls because fixed costs spread over more miles —
    // but the trade-off is net dollars, not per-mile cost
    expect(high.costPerTotalMile).toBeLessThan(base.costPerTotalMile);
  });
});

describe("computeOwnerOperatorPL — factoring impact", () => {
  it("3% factoring on revenue lowers net by exactly revenue × 3%", () => {
    const noFactor = computeOwnerOperatorPL(BASELINE);
    const withFactor = computeOwnerOperatorPL({
      ...BASELINE,
      factoringPercent: 3,
    });
    // Factoring fee = 6250 × 0.03 = 187.50
    expect(withFactor.factoringFeeWeekly).toBeCloseTo(187.5, 4);
    // Net drops by exactly the factoring fee
    expect(noFactor.netIncomeWeekly - withFactor.netIncomeWeekly).toBeCloseTo(
      187.5,
      4,
    );
    // Revenue, fuel, and fixed are unchanged
    expect(withFactor.weeklyRevenue).toBe(noFactor.weeklyRevenue);
    expect(withFactor.fuelCostWeekly).toBeCloseTo(
      noFactor.fuelCostWeekly,
      6,
    );
    expect(withFactor.totalFixedWeekly).toBe(noFactor.totalFixedWeekly);
  });
});

describe("computeOwnerOperatorPL — breakeven accuracy", () => {
  it("plugging breakevenLoadedMiles back into the inputs produces net ≈ 0", () => {
    const r = computeOwnerOperatorPL(BASELINE);
    // Round-trip the breakeven: rerun with loadedMilesPerWeek = breakeven
    const rerun = computeOwnerOperatorPL({
      ...BASELINE,
      loadedMilesPerWeek: r.breakevenLoadedMiles,
    });
    // Net should be essentially zero (within float tolerance)
    expect(rerun.netIncomeWeekly).toBeCloseTo(0, 6);
  });

  it("plugging breakevenRatePerMile back into the inputs produces net ≈ 0", () => {
    const r = computeOwnerOperatorPL(BASELINE);
    const rerun = computeOwnerOperatorPL({
      ...BASELINE,
      ratePerMile: r.breakevenRatePerMile,
    });
    expect(rerun.netIncomeWeekly).toBeCloseTo(0, 6);
  });

  it("breakeven holds with factoring enabled", () => {
    const inputs: PLInputs = { ...BASELINE, factoringPercent: 3 };
    const r = computeOwnerOperatorPL(inputs);
    const rerunMiles = computeOwnerOperatorPL({
      ...inputs,
      loadedMilesPerWeek: r.breakevenLoadedMiles,
    });
    expect(rerunMiles.netIncomeWeekly).toBeCloseTo(0, 6);
    const rerunRate = computeOwnerOperatorPL({
      ...inputs,
      ratePerMile: r.breakevenRatePerMile,
    });
    expect(rerunRate.netIncomeWeekly).toBeCloseTo(0, 6);
  });

  it("breakevenLoadedMiles is Infinity when contribution per loaded mile is ≤ 0", () => {
    /* Rate too low to cover even the variable cost per loaded mile.
       fuel per loaded mile at baseline = 3.80 / (6.5 × 0.85) ≈ 0.688
       Setting rate to 0.50 (the form's min) and factoring 5% gives
       contribution = 0.50 × 0.95 − 0.688 = −0.213, negative → infeasible. */
    const r = computeOwnerOperatorPL({
      ...BASELINE,
      ratePerMile: 0.5,
      factoringPercent: 5,
    });
    expect(r.breakevenLoadedMiles).toBe(Number.POSITIVE_INFINITY);
  });
});
