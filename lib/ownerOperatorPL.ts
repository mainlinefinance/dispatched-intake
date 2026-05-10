/* Pure math for the owner-operator weekly P&L estimator. No React, no
   DOM, no I/O. Lives in lib/ so it can be unit-tested in isolation, in
   the same spirit as lib/equipmentLoan.ts and lib/factoringFee.ts.

   Mental model: an owner-operator running a tractor as a one-person
   business has a weekly cash equation:

     revenue        = ratePerMile × loadedMiles
     totalMiles     = loadedMiles / (1 − deadhead%)   // deadhead is real
     fuelCost       = (totalMiles / mpg) × fuelPrice  // both loaded + empty burn fuel
     factoringFee   = revenue × factoringRate         // factors price on face, not net
     fixedCost      = truckPayment + insurance + otherFixed (all weekly)
     opCost         = fuel + factoring + fixed
     net            = revenue − opCost

   Two diagnostic numbers fall out:

     costPerTotalMile      = opCost / totalMiles
       Anything > $1.80–$2.00/total-mile signals operational stress on a
       single-tractor owner-op. It's the apples-to-apples comparison number
       — independent of the rate side of the equation.

     breakevenLoadedMiles  = the loaded miles per week at which net = 0
                             holding rate, mpg, fuel price, and fixed
                             costs constant. Derived in closed form below.

   Breakeven derivation (loaded miles where net=0):

     Let L = loaded miles, R = rate, d = deadhead fraction.
     totalMiles    = L / (1 − d)
     fuelCost      = (L / (1 − d)) / mpg × fuelPrice
                   = L × (fuelPrice / (mpg × (1 − d)))
     revenue       = L × R
     factoringFee  = revenue × f = L × R × f
     opCost        = fixedCost + factoringFee + fuelCost
                   = fixedCost + L × R × f + L × (fuelPrice / (mpg × (1 − d)))
     net = 0 →
        L × R = fixedCost + L × R × f + L × (fuelPrice / (mpg × (1 − d)))
        L × (R − R × f − fuelPrice / (mpg × (1 − d))) = fixedCost
        L = fixedCost / (R × (1 − f) − fuelPrice / (mpg × (1 − d)))

   The denominator is the contribution per loaded mile: revenue retained
   after the factor's bite, minus the deadhead-adjusted fuel burned to
   move that loaded mile. If contribution is ≤ 0, the lane cannot
   breakeven at any volume — surfaced as Infinity so the caller renders
   "not viable" instead of a misleading number.

   Breakeven rate per mile at current loaded miles (solve net = 0 for R):

     net = 0 →
        L × R × (1 − f) = fixedCost + L × (fuelPrice / (mpg × (1 − d)))
        R = (fixedCost / L + fuelPrice / (mpg × (1 − d))) / (1 − f)

   Annualization: weekly net × 50, intentionally conservative — assumes
   two weeks off (vacation, repairs, downtime) over the year. Real
   take-home is materially lower than annualized net because the
   calculator does NOT subtract federal/state income tax,
   self-employment tax (15.3% on net SE income), depreciation, irregular
   expenses (major repairs, downtime), or retirement contributions. The
   page explainer is explicit about this; the math is just the gross
   weekly contribution. */

export type PLInputs = {
  ratePerMile: number;
  loadedMilesPerWeek: number;
  /* Deadhead expressed as a percentage 0–100, NOT a 0–1 fraction. The form
     UI passes whole percents (15 = 15%), and the math converts to a
     fraction internally. Keeping the input shape matched to the UI
     prevents the classic "did the caller already divide by 100?" bug. */
  deadheadPercent: number;
  fuelPricePerGallon: number;
  mpg: number;
  truckPaymentWeekly: number;
  insuranceWeekly: number;
  otherFixedWeekly: number;
  /* Factoring fee expressed as a percentage 0–100. 0 = no factoring. */
  factoringPercent: number;
};

export type PLResults = {
  weeklyRevenue: number;
  totalMilesPerWeek: number;
  fuelCostWeekly: number;
  factoringFeeWeekly: number;
  totalFixedWeekly: number;
  totalOperatingCostWeekly: number;
  netIncomeWeekly: number;
  /* weekly net × 50 — assumes 2 weeks off per year for repairs, downtime,
     vacation. Pre-tax, pre-depreciation. */
  annualizedNet: number;
  costPerTotalMile: number;
  /* Infinity when the lane has zero or negative contribution per loaded
     mile — i.e. no volume of miles can produce a positive net at the
     given rate, fuel price, mpg, deadhead, and factoring fee. The caller
     is responsible for rendering "not viable" instead of a number when
     this happens. */
  breakevenLoadedMiles: number;
  /* Breakeven rate per mile holding loadedMilesPerWeek constant. Infinity
     when loadedMilesPerWeek is 0 (cannot solve for R with no miles). */
  breakevenRatePerMile: number;
};

export function computeOwnerOperatorPL(inputs: PLInputs): PLResults {
  const {
    ratePerMile,
    loadedMilesPerWeek,
    deadheadPercent,
    fuelPricePerGallon,
    mpg,
    truckPaymentWeekly,
    insuranceWeekly,
    otherFixedWeekly,
    factoringPercent,
  } = inputs;

  const deadheadFraction = deadheadPercent / 100;
  const factoringFraction = factoringPercent / 100;
  /* Guard against the edge case of deadhead = 100% (no loaded miles ever
     produce revenue) — totalMiles would divide by zero. The form clamps
     deadhead to 0–50, but defending the lib in isolation keeps the
     module safe from future callers. */
  const loadedFraction = Math.max(1e-9, 1 - deadheadFraction);

  const weeklyRevenue = ratePerMile * loadedMilesPerWeek;
  const totalMilesPerWeek = loadedMilesPerWeek / loadedFraction;
  /* MPG floor guards a divide-by-zero on absurd inputs (the form clamps
     to 4–10). Caller-side validation is the real defense; this is just
     so the lib never returns NaN. */
  const safeMpg = mpg > 0 ? mpg : 1e-9;
  const fuelCostWeekly = (totalMilesPerWeek / safeMpg) * fuelPricePerGallon;
  const factoringFeeWeekly = weeklyRevenue * factoringFraction;
  const totalFixedWeekly =
    truckPaymentWeekly + insuranceWeekly + otherFixedWeekly;
  const totalOperatingCostWeekly =
    fuelCostWeekly + factoringFeeWeekly + totalFixedWeekly;
  const netIncomeWeekly = weeklyRevenue - totalOperatingCostWeekly;
  const annualizedNet = netIncomeWeekly * 50;
  const costPerTotalMile =
    totalMilesPerWeek > 0
      ? totalOperatingCostWeekly / totalMilesPerWeek
      : 0;

  /* Breakeven loaded miles — solve net = 0 for L (see header comment). */
  const fuelCostPerLoadedMile =
    fuelPricePerGallon / (safeMpg * loadedFraction);
  const contributionPerLoadedMile =
    ratePerMile * (1 - factoringFraction) - fuelCostPerLoadedMile;
  const breakevenLoadedMiles =
    contributionPerLoadedMile > 0
      ? totalFixedWeekly / contributionPerLoadedMile
      : Number.POSITIVE_INFINITY;

  /* Breakeven rate per mile at current loaded miles — solve net = 0 for R. */
  const breakevenRatePerMile =
    loadedMilesPerWeek > 0 && factoringFraction < 1
      ? (totalFixedWeekly / loadedMilesPerWeek + fuelCostPerLoadedMile) /
        (1 - factoringFraction)
      : Number.POSITIVE_INFINITY;

  return {
    weeklyRevenue,
    totalMilesPerWeek,
    fuelCostWeekly,
    factoringFeeWeekly,
    totalFixedWeekly,
    totalOperatingCostWeekly,
    netIncomeWeekly,
    annualizedNet,
    costPerTotalMile,
    breakevenLoadedMiles,
    breakevenRatePerMile,
  };
}
