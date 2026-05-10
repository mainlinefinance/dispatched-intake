/* Pure math for the factoring fee calculator. No React, no DOM, no I/O.
   Lives in lib/ so it can be unit-tested in isolation, in the same spirit
   as lib/equipmentLoan.ts.

   Factoring economics, in plain terms:
     - A carrier hauls a load and invoices the broker for, say, $5,000.
     - Instead of waiting 30–60 days for broker pay, the carrier sells
       the invoice to a factor.
     - The factor wires an "advance" (typically 90–97% of face) within
       24 hours.
     - The remainder is held as a reserve until the broker actually pays
       the factor.
     - When the broker pays, the factor deducts its fee from the reserve
       and releases what's left to the carrier.

   Formulas:
     factorFee              = invoice × ratePer30 × (daysOutstanding / 30)
     advanceAmount          = invoice × advancePercent
     reserveAmount          = invoice − advanceAmount
     netToCarrierOnBrokerPay = reserveAmount − factorFee
     effectiveAnnualizedRate = (factorFee / advanceAmount) × (365 / days) × 100

   Why the effective annualized rate matters: a 3% factor fee on a 30-day
   invoice looks small until you annualize it — that's ~36% APR-equivalent
   on the cash the carrier actually had at risk. The number is what lets
   carriers compare factoring to a working capital line apples-to-apples.

   Non-recourse adds ~0.5% to the headline rate as concentration insurance
   (the factor eats the loss if the broker doesn't pay). We surface this
   as a UI note rather than auto-modifying the rate input, so the carrier
   sees the apples-to-apples comparison and chooses consciously. */

export type RecourseType = "recourse" | "non-recourse";

export type FactoringFeeInputs = {
  invoiceAmount: number; // dollars
  ratePer30Days: number; // percent (e.g. 3 for 3%)
  advancePercent: number; // percent (e.g. 95 for 95%)
  daysOutstanding: number;
  recourseType: RecourseType;
};

export type FactoringFeeResults = {
  factorFee: number;
  advanceAmount: number;
  reserveAmount: number;
  netToCarrierOnBrokerPay: number;
  effectiveAnnualizedRate: number; // percent
};

export function computeFactoringFee(
  inputs: FactoringFeeInputs,
): FactoringFeeResults {
  const {
    invoiceAmount,
    ratePer30Days,
    advancePercent,
    daysOutstanding,
  } = inputs;

  /* Math assumes valid inputs; the form layer clamps and validates. We
     still guard the two obvious zero-denominator cases so a downstream
     consumer (a test, a future caller) can't trigger NaN/Infinity. */
  const safeAdvancePct = advancePercent / 100;
  const factorFee =
    invoiceAmount * (ratePer30Days / 100) * (daysOutstanding / 30);
  const advanceAmount = invoiceAmount * safeAdvancePct;
  const reserveAmount = invoiceAmount - advanceAmount;
  const netToCarrierOnBrokerPay = reserveAmount - factorFee;
  const effectiveAnnualizedRate =
    advanceAmount > 0 && daysOutstanding > 0
      ? (factorFee / advanceAmount) * (365 / daysOutstanding) * 100
      : 0;

  return {
    factorFee,
    advanceAmount,
    reserveAmount,
    netToCarrierOnBrokerPay,
    effectiveAnnualizedRate,
  };
}
