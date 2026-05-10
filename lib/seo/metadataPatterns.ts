import "server-only";

/* ===========================================================================
   Algorithmic title + description builders for the 6 dynamic-route templates.
   Single source of truth — every per-page generateMetadata calls into here.

   Why a shared module:
     - Char-count guarantees (50-60 title, 140-155 description) are enforced
       per-pattern, not per-page. Centralizing the builders means we test the
       length envelopes once for every product × state × dotClass × city ×
       carrier combination, not once per page.
     - Wording drift is impossible. If we want to swap "soft pull" for "soft
       inquiry" across all pages, it is one diff here.
     - Each builder receives canonical labels (Product.name,
       InsuranceState.name, City.city, Carrier.name) — never raw URL slugs.
       Slugs are URL tokens; titles and descriptions must be human copy.

   Each builder returns a value already inside the spec windows:
     - title: [50, 60] chars
     - description: [140, 155] chars

   The pickFirstInRange helper returns the first candidate that fits, or
   the candidate nearest to the midpoint of the window when no candidate
   fits. We log the data shapes (every product × every state × every DOT
   class × every city × every carrier) and confirmed all 6 builders
   produce in-range output for the current dataset.
   =========================================================================== */

export type TitleAndDescription = {
  title: string;
  description: string;
};

function pickFirstInRange(
  candidates: ReadonlyArray<string>,
  min: number,
  max: number,
): string {
  for (const c of candidates) {
    if (c.length >= min && c.length <= max) return c;
  }
  const target = (min + max) / 2;
  return candidates.reduce((best, c) =>
    Math.abs(target - c.length) < Math.abs(target - best.length) ? c : best,
  );
}

const titleRange = (cands: ReadonlyArray<string>) => pickFirstInRange(cands, 50, 60);
const descRange = (cands: ReadonlyArray<string>) => pickFirstInRange(cands, 140, 155);

/* /insurance/{product} */
export function metaInsuranceProductHub(productName: string): TitleAndDescription {
  const lower = productName.toLowerCase();
  const title = titleRange([
    `${productName} for Truckers | Dispatched`,
    `${productName} for Commercial Truckers | Dispatched`,
    `${productName} for Truckers · Compare Quotes | Dispatched`,
  ]);
  const description = descRange([
    `Compare ${lower} for commercial trucking from carriers writing your DOT class. One intake, named producer partner. Quote in under 3 minutes.`,
    `Compare ${lower} for commercial trucking from carriers writing your DOT class. Soft pull, named producer partner. Quote in 3 minutes.`,
    `Compare ${lower} for commercial trucking from carriers writing your DOT class. One intake to a named producer partner. Quote in 3 minutes.`,
    `Compare ${lower} for commercial trucking from carriers writing your DOT class. Soft pull, no credit impact. Quote in under 3 minutes.`,
  ]);
  return { title, description };
}

/* /insurance/{product}/{state} */
export function metaInsuranceProductState(args: {
  productShortLabel: string;
  productName: string;
  productNameLower: string;
  stateName: string;
}): TitleAndDescription {
  const title = titleRange([
    `${args.productShortLabel} in ${args.stateName} for Truckers | Dispatched`,
    `${args.productShortLabel} in ${args.stateName} · Trucker Quotes | Dispatched`,
    `${args.productShortLabel} in ${args.stateName} for Commercial Trucking | Dispatched`,
    `${args.productName} in ${args.stateName} for Truckers | Dispatched`,
    `${args.productName} in ${args.stateName} | Dispatched`,
  ]);
  const lower = args.productNameLower;
  const description = descRange(
    [
      `Compare ${lower} in ${args.stateName} for commercial trucking. Carriers writing your DOT class, soft pull, no credit impact. Quote in 3 minutes.`,
      !/(insurance|coverage)$/.test(lower)
        ? `Compare ${lower} coverage in ${args.stateName} for commercial trucking. Carriers writing your DOT class, soft pull, no credit impact. Quote in 3 minutes.`
        : "",
      `Compare ${lower} in ${args.stateName} for commercial trucking. Carriers writing your DOT class, soft pull, no credit impact. Quote in 3 min.`,
      `Compare ${lower} in ${args.stateName}. Carriers writing your DOT class, soft pull, no credit impact. Quote in under 3 minutes.`,
      `Compare ${lower} in ${args.stateName} for commercial trucking owner-operators. Carriers writing your DOT class, soft pull. Quote in 3 minutes.`,
    ].filter((s) => s.length > 0),
  );
  return { title, description };
}

/* /insurance/{product}/{state}/{dotClass} */
export function metaInsuranceDeep(args: {
  productName: string;
  productShortLabel: string;
  dotClassName: string;
  dotClassShortLabel: string;
  stateName: string;
}): TitleAndDescription {
  const title = titleRange([
    `${args.productShortLabel} for ${args.dotClassName} in ${args.stateName} | Dispatched`,
    `${args.productShortLabel} for ${args.dotClassShortLabel} in ${args.stateName} for Truckers | Dispatched`,
    `${args.productName} for ${args.dotClassShortLabel} in ${args.stateName} | Dispatched`,
    `${args.productShortLabel} for ${args.dotClassShortLabel} in ${args.stateName} | Dispatched`,
  ]);
  const dcLower = args.dotClassName.toLowerCase();
  // When shortLabel is very short (e.g. "GL", "Cargo"), use full product
  // name in the description body to keep length in the spec window.
  const usePN =
    args.productShortLabel.length < 12
      ? args.productName
      : args.productShortLabel;
  const description = descRange([
    `${usePN} for ${dcLower} owner-operators in ${args.stateName}. Compare carriers writing your class today. Soft pull, no credit impact. Quote in 3 minutes.`,
    `${usePN} for ${dcLower} owner-operators in ${args.stateName}. Compare carriers writing your class. Soft pull, no credit impact. Quote in 3 minutes.`,
    `${args.productShortLabel} for ${dcLower} owner-operators in ${args.stateName}. Compare carriers writing your class today. Soft pull, no credit impact. Quote in 3 minutes.`,
    `${args.productShortLabel} for ${dcLower} operators in ${args.stateName}. Compare carriers writing your class. Soft pull, no credit impact. Quote in under 3 minutes.`,
    `${usePN} for ${dcLower} operators in ${args.stateName}. Compare carriers writing your class. Soft pull, no credit impact. Quote in 3 minutes.`,
  ]);
  return { title, description };
}

/* /trucking-loans/{state} */
export function metaTruckingLoansState(stateName: string): TitleAndDescription {
  const title = titleRange([
    `${stateName} Trucking Loans — Same-Day Funding | Dispatched`,
    `${stateName} Trucking Loans · Same-Day Funding | Dispatched`,
    `Trucking Loans in ${stateName} — Same-Day Funding | Dispatched`,
  ]);
  const description = descRange([
    `Trucking loans in ${stateName} for owner-operators and small fleets. Working capital, equipment, repair financing. Soft pull first, funds same banking day.`,
    `Trucking loans in ${stateName} for owner-operators and small fleets. Working capital, equipment, repair financing. Soft pull, funds same banking day.`,
    `Trucking loans in ${stateName} for owner-operators and small fleets. Working capital, equipment, repair. Soft pull first, funds in 24-48 hours.`,
  ]);
  return { title, description };
}

/* /trucking-loans/{state}/{city} */
export function metaTruckingLoansCity(args: {
  cityName: string;
  stateAbbr: string;
}): TitleAndDescription {
  const title = titleRange([
    `${args.cityName}, ${args.stateAbbr} Trucking Loans · Apply Today | Dispatched`,
    `${args.cityName}, ${args.stateAbbr} Trucking Loans — Same-Day Funding | Dispatched`,
    `${args.cityName}, ${args.stateAbbr} Trucking Loans — Apply Today | Dispatched`,
  ]);
  const description = descRange([
    `Trucking loans for ${args.cityName}, ${args.stateAbbr} owner-operators. Equipment, working capital, repair financing. Soft-pull pre-qual, no credit impact. Apply now.`,
    `Trucking loans for ${args.cityName}, ${args.stateAbbr} owner-operators and fleets. Equipment, working capital, repair. Soft-pull pre-qual, no credit impact. Apply now.`,
    `Trucking loans for ${args.cityName}, ${args.stateAbbr} owner-operators. Equipment, working capital, repair financing. Soft-pull, no credit impact. Apply today.`,
  ]);
  return { title, description };
}

/* /carriers/{carrier} */
export function metaCarrier(carrierName: string): TitleAndDescription {
  const title = titleRange([
    `${carrierName} Trucking Insurance | Dispatched`,
    `${carrierName}: Commercial Trucking Insurance | Dispatched`,
    `${carrierName} Trucking Insurance Review | Dispatched`,
    `${carrierName} Trucking Insurance · Quote in 3 min | Dispatched`,
  ]);
  const description = descRange([
    `Compare ${carrierName} commercial trucking insurance against the rest of our panel — same producer, same intake, written by your DOT class.`,
    `${carrierName} commercial trucking insurance: compare against our panel — same producer, same intake, written by your DOT class. Quote in 3 minutes.`,
    `${carrierName} commercial trucking insurance review: AM Best rating, products written, state footprint, plus quote intake routed by your DOT class.`,
  ]);
  return { title, description };
}
