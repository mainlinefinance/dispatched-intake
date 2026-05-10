/* Pure math for the lease-vs-buy calculator. No React, no DOM, no I/O.
   Lives in lib/ so it can be unit-tested in isolation from the component
   shell, mirroring lib/equipmentLoan.ts.

   Two products are compared:

   1. Equipment financing ("buy") — the operator takes title from day one
      and amortizes a loan against the truck. Standard annuity formula:
          M = P × r / (1 − (1 + r)^−n)
      Equity at any month t is the cumulative principal paid down through
      that month (the truck's market value at term end is the stated
      residual, summed into final equity for completeness).

   2. Lease-purchase ("lease") — the operator runs under a carrier-issued
      lease, settlements deduct a weekly fee, and equity is whatever the
      contract grants at completion (usually $0). Math is the much simpler
      weekly × term-in-weeks.

   The headline output is `failureAdjustedCost`. The trucking industry has
   documented a roughly 80% wash-out rate on lease-purchase programs
   (operators exit before the program completes, forfeiting the truck and
   any nominal equity). Expected-value cost models this:

       failureAdjusted = 0.8 × (weekly × termWeeks × 0.5)
                       + 0.2 × netCost

   80% of operators pay through ~50% of the term and walk with $0. The
   other 20% complete and pay total cost minus the contract's stated
   completion equity. This is the number that justifies the calculator's
   editorial position — see /owner-operator-financing/first-time. */

const WEEKS_PER_MONTH = 4.33;

export type BuyInputs = {
  purchasePrice: number;
  downPayment: number;
  termMonths: number;
  aprPercent: number;
  residualValue: number;
};

export type LeaseInputs = {
  weeklySettlement: number;
  termWeeks: number;
  equityAtCompletion: number;
};

export type LeaseVsBuyResults = {
  buy: {
    monthlyPayment: number;
    totalPayments: number; // sum of monthly × term + down payment
    totalInterest: number;
    netCost: number; // total payments minus residual
    effectiveMonthlyCost: number;
    equityAt12: number;
    equityAt24: number;
    equityAt36: number;
    equityAt60: number;
    equityAtTermEnd: number; // principal paid + residual
    loanAmount: number;
  };
  lease: {
    totalPayments: number; // weekly × termWeeks
    netCost: number; // totalPayments minus equityAtCompletion
    monthlyEquivalent: number; // totalPayments / (termWeeks / WEEKS_PER_MONTH)
    effectiveMonthlyCost: number;
    equityAt12: number;
    equityAt24: number;
    equityAt36: number;
    equityAt60: number;
    equityAtCompletion: number;
    failureAdjustedCost: number;
  };
  summary: {
    totalCostDelta: number; // buy.netCost - lease.netCost (negative = buy cheaper)
    equityDelta: number; // buy.equityAtTermEnd - lease.equityAtCompletion
    failureAdjustedDelta: number; // buy.netCost - lease.failureAdjustedCost
  };
};

/* Closed-form amortization. Returns 0 on a zero-rate loan to avoid a
   divide-by-zero. */
function monthlyPayment(
  principal: number,
  aprPercent: number,
  termMonths: number,
): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  const r = aprPercent / 100 / 12;
  if (r === 0) return principal / termMonths;
  return (principal * r) / (1 - Math.pow(1 + r, -termMonths));
}

/* Cumulative principal paid through month `t` on a standard amortization
   schedule. Closed-form so we don't need to walk the schedule month by
   month — the formula is the loan balance subtracted from the original
   principal:

       balance(t) = P × (1 + r)^t − M × ((1 + r)^t − 1) / r
       principalPaid(t) = P − balance(t)

   On a zero-rate loan, principalPaid(t) = M × t = (P / n) × t. */
function principalPaidThrough(
  principal: number,
  aprPercent: number,
  termMonths: number,
  t: number,
): number {
  if (principal <= 0 || termMonths <= 0 || t <= 0) return 0;
  const clamped = Math.min(t, termMonths);
  const r = aprPercent / 100 / 12;
  const m = monthlyPayment(principal, aprPercent, termMonths);
  if (r === 0) return m * clamped;
  const growth = Math.pow(1 + r, clamped);
  const balance = principal * growth - (m * (growth - 1)) / r;
  return principal - balance;
}

export function computeLeaseVsBuy(
  buy: BuyInputs,
  lease: LeaseInputs,
): LeaseVsBuyResults {
  const loanAmount = Math.max(0, buy.purchasePrice - buy.downPayment);
  const monthly = monthlyPayment(loanAmount, buy.aprPercent, buy.termMonths);
  const totalMonthlyPayments = monthly * buy.termMonths;
  const totalBuyPayments = totalMonthlyPayments + buy.downPayment;
  const totalInterest = totalMonthlyPayments - loanAmount;
  const buyNetCost = totalBuyPayments - buy.residualValue;
  const buyEffectiveMonthly =
    buy.termMonths > 0 ? totalBuyPayments / buy.termMonths : 0;

  const equityAt12 = principalPaidThrough(
    loanAmount,
    buy.aprPercent,
    buy.termMonths,
    12,
  );
  const equityAt24 = principalPaidThrough(
    loanAmount,
    buy.aprPercent,
    buy.termMonths,
    24,
  );
  const equityAt36 = principalPaidThrough(
    loanAmount,
    buy.aprPercent,
    buy.termMonths,
    36,
  );
  const equityAt60 = principalPaidThrough(
    loanAmount,
    buy.aprPercent,
    buy.termMonths,
    60,
  );
  const principalPaidAtTerm = principalPaidThrough(
    loanAmount,
    buy.aprPercent,
    buy.termMonths,
    buy.termMonths,
  );
  const buyEquityAtTermEnd = principalPaidAtTerm + buy.residualValue;

  const leaseTotalPayments = lease.weeklySettlement * lease.termWeeks;
  const leaseNetCost = leaseTotalPayments - lease.equityAtCompletion;
  const leaseMonths = lease.termWeeks / WEEKS_PER_MONTH;
  const leaseMonthlyEquivalent =
    leaseMonths > 0 ? leaseTotalPayments / leaseMonths : 0;
  const leaseEffectiveMonthly = leaseMonthlyEquivalent;

  /* Lease-side equity at each checkpoint. Most lease-purchase contracts
     accrue $0 equity until completion (which is itself the failure
     mode). Modeling it linearly toward the stated completion equity is
     the most generous reading available; the help-text on the form
     already warns this is rarely how the contract actually reads. */
  const leaseEquityAt = (months: number): number => {
    if (lease.equityAtCompletion <= 0 || leaseMonths <= 0) return 0;
    if (months >= leaseMonths) return lease.equityAtCompletion;
    return (lease.equityAtCompletion * months) / leaseMonths;
  };

  const failureAdjustedCost =
    0.8 * (lease.weeklySettlement * lease.termWeeks * 0.5) +
    0.2 * leaseNetCost;

  return {
    buy: {
      monthlyPayment: monthly,
      totalPayments: totalBuyPayments,
      totalInterest,
      netCost: buyNetCost,
      effectiveMonthlyCost: buyEffectiveMonthly,
      equityAt12,
      equityAt24,
      equityAt36,
      equityAt60,
      equityAtTermEnd: buyEquityAtTermEnd,
      loanAmount,
    },
    lease: {
      totalPayments: leaseTotalPayments,
      netCost: leaseNetCost,
      monthlyEquivalent: leaseMonthlyEquivalent,
      effectiveMonthlyCost: leaseEffectiveMonthly,
      equityAt12: leaseEquityAt(12),
      equityAt24: leaseEquityAt(24),
      equityAt36: leaseEquityAt(36),
      equityAt60: leaseEquityAt(60),
      equityAtCompletion: lease.equityAtCompletion,
      failureAdjustedCost,
    },
    summary: {
      totalCostDelta: buyNetCost - leaseNetCost,
      equityDelta: buyEquityAtTermEnd - lease.equityAtCompletion,
      failureAdjustedDelta: buyNetCost - failureAdjustedCost,
    },
  };
}
