import { describe, expect, it } from "vitest";
import {
  CONDITION_ADDER,
  CREDIT_PRICING,
  computeEstimate,
  type Condition,
  type Credit,
} from "@/lib/equipmentLoan";

/* Pinned amortization test cases. Inputs are the median lead profile for
   each calculator surface. Expected outputs are computed with the closed-
   form annuity formula and round to the cents the result panel actually
   displays. If a test fails after a tweak to CREDIT_PRICING or
   CONDITION_ADDER, it is intentional — bump the expected values, don't
   loosen the precision. */

describe("computeEstimate — semi truck profile", () => {
  it("80k semi, 10% down, 60mo, 680+ credit, new → $1,565/mo, $21,927 interest", () => {
    const result = computeEstimate({
      price: 80_000,
      downPaymentDollars: 8_000,
      termMonths: 60,
      credit: "680-plus",
      condition: "new",
      now: new Date("2026-05-10T00:00:00Z"),
    });
    expect(result.loanAmount).toBe(72_000);
    expect(result.apr).toBe(11);
    expect(result.band).toBe("9% – 14% APR");
    // Closed-form annuity: 72000 × (0.11/12) / (1 − (1 + 0.11/12)^−60)
    expect(result.monthly).toBeCloseTo(1565.45, 1);
    expect(result.totalPaid).toBeCloseTo(93_927.27, 0);
    expect(result.totalInterest).toBeCloseTo(21_927.27, 0);
  });

  it("80k semi, 0% down, 60mo, 620–679 credit, used-recent → APR adder applies", () => {
    const result = computeEstimate({
      price: 80_000,
      downPaymentDollars: 0,
      termMonths: 60,
      credit: "620-679",
      condition: "used-recent",
    });
    // 14% mid + 0.5 used-recent adder = 14.5% APR
    expect(result.apr).toBe(14.5);
    expect(result.loanAmount).toBe(80_000);
    // Monthly should be higher than the 11% APR case
    expect(result.monthly).toBeGreaterThan(1565.36);
  });

  it("80k semi, 580–619 credit, used-older → 1.5% adder stacks correctly", () => {
    const result = computeEstimate({
      price: 80_000,
      downPaymentDollars: 8_000,
      termMonths: 60,
      credit: "580-619",
      condition: "used-older",
    });
    // 19% mid + 1.5 used-older = 20.5%
    expect(result.apr).toBe(20.5);
    expect(result.band).toBe("16% – 24% APR");
  });
});

describe("computeEstimate — invariants", () => {
  it("totalPaid - loanAmount === totalInterest (within float tolerance)", () => {
    const r = computeEstimate({
      price: 55_000,
      downPaymentDollars: 5_500,
      termMonths: 72,
      credit: "620-679",
      condition: "new",
    });
    expect(r.totalPaid - r.loanAmount).toBeCloseTo(r.totalInterest, 2);
  });

  it("monthly × termMonths === totalPaid (within float tolerance)", () => {
    const r = computeEstimate({
      price: 110_000,
      downPaymentDollars: 16_500,
      termMonths: 84,
      credit: "680-plus",
      condition: "used-recent",
    });
    expect(r.monthly * 84).toBeCloseTo(r.totalPaid, 2);
  });

  it("loan amount floors at 0 when down payment exceeds price", () => {
    const r = computeEstimate({
      price: 50_000,
      downPaymentDollars: 60_000,
      termMonths: 60,
      credit: "680-plus",
      condition: "new",
    });
    expect(r.loanAmount).toBe(0);
    expect(r.monthly).toBe(0);
    expect(r.totalInterest).toBe(0);
  });

  it("longer term lowers monthly but raises total interest", () => {
    const inputs = {
      price: 80_000,
      downPaymentDollars: 8_000,
      termMonths: 36 as const,
      credit: "680-plus" as Credit,
      condition: "new" as Condition,
    };
    const short = computeEstimate(inputs);
    const long = computeEstimate({ ...inputs, termMonths: 84 });
    expect(long.monthly).toBeLessThan(short.monthly);
    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
  });
});

describe("computeEstimate — credit + condition pricing", () => {
  it("CREDIT_PRICING covers all four bands with monotonic midpoints", () => {
    const order: Credit[] = [
      "680-plus",
      "620-679",
      "580-619",
      "below-580",
    ];
    let prev = -Infinity;
    for (const c of order) {
      expect(CREDIT_PRICING[c].mid).toBeGreaterThan(prev);
      prev = CREDIT_PRICING[c].mid;
    }
  });

  it("CONDITION_ADDER is non-negative and monotonic new < used-recent < used-older", () => {
    expect(CONDITION_ADDER.new).toBe(0);
    expect(CONDITION_ADDER["used-recent"]).toBeGreaterThan(
      CONDITION_ADDER.new,
    );
    expect(CONDITION_ADDER["used-older"]).toBeGreaterThan(
      CONDITION_ADDER["used-recent"],
    );
  });

  it("APR equals CREDIT_PRICING[credit].mid + CONDITION_ADDER[condition]", () => {
    const r = computeEstimate({
      price: 80_000,
      downPaymentDollars: 8_000,
      termMonths: 60,
      credit: "below-580",
      condition: "used-older",
    });
    expect(r.apr).toBe(
      CREDIT_PRICING["below-580"].mid + CONDITION_ADDER["used-older"],
    );
  });
});

describe("computeEstimate — payoff date", () => {
  it("payoff date is exactly termMonths after `now`", () => {
    const r = computeEstimate({
      price: 80_000,
      downPaymentDollars: 8_000,
      termMonths: 60,
      credit: "680-plus",
      condition: "new",
      now: new Date("2026-05-10T00:00:00Z"),
    });
    // 2026-05-10 + 60 months = 2031-05
    expect(r.payoffDate).toBe("May 2031");
  });

  it("payoff date wraps year boundary correctly", () => {
    const r = computeEstimate({
      price: 80_000,
      downPaymentDollars: 8_000,
      termMonths: 84,
      credit: "680-plus",
      condition: "new",
      now: new Date("2026-09-15T00:00:00Z"),
    });
    // 2026-09 + 84 months = 2033-09
    expect(r.payoffDate).toBe("Sep 2033");
  });
});
