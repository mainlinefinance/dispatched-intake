import { describe, expect, it } from "vitest";
import { computeLeaseVsBuy } from "@/lib/leaseVsBuy";

/* Pinned math for the lease-vs-buy calculator. The "buy" side reuses the
   standard amortization formula validated in tests/equipmentLoan.test.ts;
   here we add coverage for the lease side, the failure-adjusted cost,
   and the equity-build checkpoints that the result panel shows. */

describe("computeLeaseVsBuy — default scenario", () => {
  it("$130k buy at 12% / 60mo vs $600/wk × 260wk lease, $0 equity", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 0,
      },
    );

    expect(r.buy.loanAmount).toBe(117_000);
    expect(r.buy.monthlyPayment).toBeCloseTo(2602.6, 1);
    expect(r.buy.totalPayments).toBeCloseTo(169_156.02, 0);
    expect(r.buy.totalInterest).toBeCloseTo(39_156.02, 0);
    expect(r.buy.netCost).toBeCloseTo(129_156.02, 0);
    expect(r.buy.equityAt12).toBeCloseTo(18_168.96, 0);
    expect(r.buy.equityAt24).toBeCloseTo(38_642.2, 0);
    expect(r.buy.equityAt36).toBeCloseTo(61_711.95, 0);
    expect(r.buy.equityAt60).toBeCloseTo(117_000, 0);
    expect(r.buy.equityAtTermEnd).toBeCloseTo(157_000, 0);

    expect(r.lease.totalPayments).toBe(156_000);
    expect(r.lease.netCost).toBe(156_000);
    expect(r.lease.monthlyEquivalent).toBeCloseTo(2598, 0);
    expect(r.lease.equityAtCompletion).toBe(0);
    expect(r.lease.equityAt12).toBe(0);
    expect(r.lease.equityAt60).toBe(0);
    // 0.8 × (600 × 260 × 0.5) + 0.2 × 156000 = 0.8 × 78000 + 31200 = 93600
    expect(r.lease.failureAdjustedCost).toBe(93_600);

    expect(r.summary.totalCostDelta).toBeCloseTo(-26_843.98, 0);
    expect(r.summary.equityDelta).toBeCloseTo(157_000, 0);
    expect(r.summary.failureAdjustedDelta).toBeCloseTo(35_556.02, 0);
  });
});

describe("computeLeaseVsBuy — shorter buy term", () => {
  it("36 months produces higher monthly but lower total interest than 60mo", () => {
    const base = {
      purchasePrice: 130_000,
      downPayment: 13_000,
      aprPercent: 12,
      residualValue: 40_000,
    };
    const lease = {
      weeklySettlement: 600,
      termWeeks: 260,
      equityAtCompletion: 0,
    };
    const short = computeLeaseVsBuy(
      { ...base, termMonths: 36 },
      lease,
    );
    const long = computeLeaseVsBuy(
      { ...base, termMonths: 60 },
      lease,
    );

    expect(short.buy.monthlyPayment).toBeGreaterThan(
      long.buy.monthlyPayment,
    );
    expect(short.buy.totalInterest).toBeLessThan(long.buy.totalInterest);
    /* The 36mo schedule reaches equity-build checkpoints faster than the
       60mo schedule. At month 12 the shorter loan has paid down more
       principal. */
    expect(short.buy.equityAt12).toBeGreaterThan(long.buy.equityAt12);
  });
});

describe("computeLeaseVsBuy — higher APR", () => {
  it("18% APR raises total interest and net cost vs 12% APR", () => {
    const base = {
      purchasePrice: 130_000,
      downPayment: 13_000,
      termMonths: 60,
      residualValue: 40_000,
    };
    const lease = {
      weeklySettlement: 600,
      termWeeks: 260,
      equityAtCompletion: 0,
    };
    const cheap = computeLeaseVsBuy({ ...base, aprPercent: 12 }, lease);
    const dear = computeLeaseVsBuy({ ...base, aprPercent: 18 }, lease);

    expect(dear.buy.totalInterest).toBeGreaterThan(cheap.buy.totalInterest);
    expect(dear.buy.netCost).toBeGreaterThan(cheap.buy.netCost);
    expect(dear.buy.monthlyPayment).toBeGreaterThan(cheap.buy.monthlyPayment);
    // Lease side is unchanged across APRs
    expect(dear.lease.netCost).toBe(cheap.lease.netCost);
    expect(dear.lease.failureAdjustedCost).toBe(
      cheap.lease.failureAdjustedCost,
    );
  });
});

describe("computeLeaseVsBuy — zero equity at lease completion (default)", () => {
  it("equityAtCompletion=0 → lease net cost equals total payments", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 0,
      },
    );
    expect(r.lease.netCost).toBe(r.lease.totalPayments);
    expect(r.lease.equityAt36).toBe(0);
    expect(r.summary.equityDelta).toBe(r.buy.equityAtTermEnd);
  });
});

describe("computeLeaseVsBuy — equity at completion = 10% of purchase price", () => {
  it("$13k completion equity reduces lease net cost and failure-adj cost", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 13_000,
      },
    );
    // totalPayments unchanged (settlement × weeks)
    expect(r.lease.totalPayments).toBe(156_000);
    // netCost = totalPayments − equity
    expect(r.lease.netCost).toBe(143_000);
    // Linear equity build: at 60mo / 60mo of the lease (260wk ≈ 60mo)
    // months = termWeeks / 4.33 = 260/4.33 ≈ 60.05
    // At month 12, equity = 13000 × 12/60.05 ≈ 2598
    expect(r.lease.equityAt12).toBeCloseTo(2_598, 0);
    // termWeeks=260 → months=260/4.33≈60.05, so month 60 is just shy of full equity
    expect(r.lease.equityAt60).toBeCloseTo(12_990, 0);
    // failureAdjustedCost = 0.8 × 78000 + 0.2 × 143000 = 62400 + 28600 = 91000
    expect(r.lease.failureAdjustedCost).toBe(91_000);
  });
});

describe("computeLeaseVsBuy — invariants", () => {
  it("buy: monthly × term + downPayment === totalPayments", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 0,
      },
    );
    expect(r.buy.monthlyPayment * 60 + 13_000).toBeCloseTo(
      r.buy.totalPayments,
      2,
    );
  });

  it("buy: totalInterest === totalMonthly − loanAmount", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 0,
      },
    );
    const totalMonthly = r.buy.totalPayments - 13_000;
    expect(totalMonthly - r.buy.loanAmount).toBeCloseTo(
      r.buy.totalInterest,
      2,
    );
  });

  it("lease: totalPayments === weeklySettlement × termWeeks", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 500,
        termWeeks: 208,
        equityAtCompletion: 0,
      },
    );
    expect(r.lease.totalPayments).toBe(500 * 208);
  });

  it("buy equity at term end === loanAmount + residual", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 0,
      },
    );
    expect(r.buy.equityAtTermEnd).toBeCloseTo(
      r.buy.loanAmount + 40_000,
      0,
    );
  });

  it("buy equity at month 0 path: equityAt12 < equityAt24 < equityAt36 < equityAt60", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 0,
      },
    );
    expect(r.buy.equityAt12).toBeLessThan(r.buy.equityAt24);
    expect(r.buy.equityAt24).toBeLessThan(r.buy.equityAt36);
    expect(r.buy.equityAt36).toBeLessThan(r.buy.equityAt60);
  });
});

describe("computeLeaseVsBuy — failure-adjusted cost formula", () => {
  it("with zero equity: 0.8 × (weekly × weeks × 0.5) + 0.2 × totalPayments", () => {
    const weekly = 800;
    const weeks = 312;
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 150_000,
        downPayment: 0,
        termMonths: 72,
        aprPercent: 14,
        residualValue: 50_000,
      },
      {
        weeklySettlement: weekly,
        termWeeks: weeks,
        equityAtCompletion: 0,
      },
    );
    const expected = 0.8 * (weekly * weeks * 0.5) + 0.2 * (weekly * weeks);
    expect(r.lease.failureAdjustedCost).toBeCloseTo(expected, 2);
  });

  it("failure-adjusted < net cost (it's a savings against the optimistic case)", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 13_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 0,
      },
    );
    expect(r.lease.failureAdjustedCost).toBeLessThan(r.lease.netCost);
  });
});

describe("computeLeaseVsBuy — edge cases", () => {
  it("zero loan (price === downPayment) returns zero monthly", () => {
    const r = computeLeaseVsBuy(
      {
        purchasePrice: 130_000,
        downPayment: 130_000,
        termMonths: 60,
        aprPercent: 12,
        residualValue: 40_000,
      },
      {
        weeklySettlement: 600,
        termWeeks: 260,
        equityAtCompletion: 0,
      },
    );
    expect(r.buy.loanAmount).toBe(0);
    expect(r.buy.monthlyPayment).toBe(0);
    expect(r.buy.totalInterest).toBe(0);
    expect(r.buy.totalPayments).toBe(130_000);
    expect(r.buy.equityAt12).toBe(0);
    expect(r.buy.equityAtTermEnd).toBe(40_000);
  });
});
