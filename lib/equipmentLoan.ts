/* Pure amortization math for the equipment loan calculators. No React,
   no DOM, no I/O. Lives in lib/ so it can be unit-tested in isolation
   from the component shell, in the same spirit as lib/estimateMatch.ts.

   Inputs are validated at the form layer (numeric coercion, range
   guards). This module assumes valid inputs and returns a deterministic
   estimate using the standard amortization formula:

     M = P * r / (1 - (1 + r)^-n)

   APR bands are observed panel ranges, mirrored from the same source as
   /qualify, the FAQ, and /methodology#finance-rates. The midpoint is
   used in the calculation — conservative, not the floor — so the
   estimate reflects a realistic outcome rather than a rate-shop best
   case. The chosen lender sets the final APR on the term sheet.

   Why public types ride alongside the math: the form component reuses
   them for state typing and option enumeration. Re-exporting from one
   place keeps the form, the math, and the tests in sync. */

export type Credit = "below-580" | "580-619" | "620-679" | "680-plus";
export type Condition = "new" | "used-recent" | "used-older";
export type Term = 36 | 48 | 60 | 72 | 84;

export const CREDIT_PRICING: Record<
  Credit,
  { mid: number; band: string }
> = {
  "680-plus": { mid: 11, band: "9% – 14% APR" },
  "620-679": { mid: 14, band: "12% – 18% APR" },
  "580-619": { mid: 19, band: "16% – 24% APR" },
  "below-580": { mid: 24, band: "20% – 30% APR" },
};

export const CONDITION_ADDER: Record<Condition, number> = {
  new: 0,
  "used-recent": 0.5,
  "used-older": 1.5,
};

export const CONDITION_LABEL: Record<Condition, string> = {
  new: "New",
  "used-recent": "Used (under 5 years)",
  "used-older": "Used (5+ years)",
};

export type EquipmentLoanEstimate = {
  loanAmount: number;
  monthly: number;
  totalInterest: number;
  totalPaid: number;
  apr: number;
  band: string;
  payoffDate: string;
};

export type EquipmentLoanInputs = {
  price: number;
  downPaymentDollars: number;
  termMonths: Term;
  credit: Credit;
  condition: Condition;
  /* Optional clock injection for deterministic payoff-date tests. Production
     callers omit this and the function uses the system clock. */
  now?: Date;
};

export function computeEstimate(
  inputs: EquipmentLoanInputs,
): EquipmentLoanEstimate {
  const { price, downPaymentDollars, termMonths, credit, condition } = inputs;
  const loanAmount = Math.max(0, price - downPaymentDollars);
  const apr = CREDIT_PRICING[credit].mid + CONDITION_ADDER[condition];
  const monthlyRate = apr / 100 / 12;
  const monthly =
    monthlyRate === 0
      ? loanAmount / termMonths
      : (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -termMonths));
  const totalPaid = monthly * termMonths;
  const totalInterest = totalPaid - loanAmount;
  /* Anchor to day-1 of the start month before adding term, so a `now`
     of e.g. Jan 31 + 1mo doesn't roll over to March (because Feb has
     no day-31). The constructor's month-overflow arithmetic carries
     into the year correctly: new Date(2026, 92, 1) → Sep 2033. */
  const start = inputs.now ? new Date(inputs.now) : new Date();
  const payoff = new Date(start.getFullYear(), start.getMonth() + termMonths, 1);
  return {
    loanAmount,
    monthly,
    totalInterest,
    totalPaid,
    apr,
    band: CREDIT_PRICING[credit].band,
    payoffDate: payoff.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
  };
}
