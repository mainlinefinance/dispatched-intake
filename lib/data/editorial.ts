import "server-only";

import type { ProductSlug } from "./products";
import type { DotClassSlug } from "./dotClasses";

/* ===========================================================================
   Per-money-page editorial bodies. Each entry is keyed on
   (productSlug, stateSlug, dotClassSlug?). Templates render the
   `paragraphs` block below the carrier table; absence of an entry is fine —
   the template falls back to the data-layer-only render.

   Discipline: every paragraph that names a number, regulation, or court
   case must include a citation in `sources`. `lastReviewedAt` is the date a
   reviewer (named below) confirmed the body still reflects current law and
   filings. Letting `lastReviewedAt` exceed 12 months is a build-time
   concern (Phase 2 lint), not a runtime one.

   Adding state pages without writing the editorial body is allowed: just
   add the row to STATE_MONEY_PAGES in moneyPageIndex.ts and skip the
   editorial entry here. The page will render with the data-layer-only
   render and no spurious editorial.
   =========================================================================== */

export type EditorialSource = {
  label: string;
  url: string | null;
};

export type EditorialReviewer = {
  name: string;
  credential: string;
};

export type EditorialBody = {
  productSlug: ProductSlug;
  stateSlug: string;
  dotClassSlug?: DotClassSlug;
  headline: string;
  paragraphs: readonly string[];
  sources: readonly EditorialSource[];
  reviewer: EditorialReviewer | null;
  lastReviewedAt: string | null;
};

const ENTRIES: EditorialBody[] = [
  {
    productSlug: "primary-liability",
    stateSlug: "texas",
    headline: "What drives primary liability premiums in Texas",
    paragraphs: [
      "Texas is one of the larger commercial-trucking premium markets in the country. Two state-specific factors move primary liability rates more than anything else: the post-HB 19 trial environment and the surplus-lines posture for risks that admitted carriers decline.",
      "Texas HB 19, effective September 2021, restructured how negligent-entrustment and direct-negligence claims against motor carriers are tried. The two-phase trial structure — separating the negligence finding from punitive damages — is widely viewed by underwriters as a moderate-to-favorable change for primary liability rates compared to states without comparable reform. The effect is most visible on Class 8 long-haul risks where nuclear-verdict exposure was previously priced into the base rate.",
      "When an admitted Texas carrier declines a risk, the placement moves to surplus lines through the Surplus Lines Stamping Office of Texas (SLTX). A 4.85% premium tax plus the SLTX stamping fee applies on top of the carrier's base rate. Owner-operators with one or more chargeable losses in 36 months, hot-shot operations under newly-issued MC numbers, and certain hazmat classes are the most common surplus-lines candidates.",
      "Premium ranges on this page are not yet published — we publish a sourced band only after a public Texas Department of Insurance filing has been extracted and reviewed by a Texas-licensed producer. The carrier table below lists the carriers we expect to write Texas commercial trucking primary liability based on their published license footprints; whether a specific carrier currently has an open appetite for your operation is the producer's call at submission.",
    ],
    sources: [
      {
        label:
          "Texas Department of Insurance — commercial auto rate filings (TDI)",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label:
          "Surplus Lines Stamping Office of Texas (SLTX) — premium tax and stamping fee schedule",
        url: "https://www.sltx.org/",
      },
      {
        label:
          "Texas HB 19 (87th Leg., 2021) — Trial of Certain Actions Involving Commercial Motor Vehicles",
        url: "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=87R&Bill=HB19",
      },
      {
        label: "FMCSA 49 CFR Part 387 — Minimum Levels of Financial Responsibility",
        url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "primary-liability",
    stateSlug: "california",
    headline: "What drives primary liability premiums in California",
    paragraphs: [
      "California's commercial trucking premium environment is shaped by two factors more than any other: the absence of caps on non-economic damages outside MICRA, and the long-running classification fight over whether owner-operators are employees or independent contractors under AB 5 and the Borello / Dynamex framework.",
      "On the liability side, California courts permit unlimited non-economic damages in commercial-vehicle cases. Combined with the state's plaintiff-friendly venue history in Los Angeles and the Bay Area, this drives Class 8 long-haul primary liability rates higher than tort-reform states with similar geography. Underwriters price the venue exposure into the base rate; the rate environment is unlikely to soften absent legislative reform.",
      "On the operations side, AB 5 and subsequent court interpretations affect whether an owner-operator running under a motor carrier's authority is treated as an employee for workers' comp, wage-and-hour, and tax purposes. Federal preemption (the FAAAA) has been litigated extensively; the practical effect is that fleet structures in California are scrutinized in any post-loss litigation, which underwriters factor into both primary liability and non-trucking liability rates.",
      "Surplus-lines placements in California go through brokers licensed by the Surplus Line Association of California (SLA). A 3% premium tax plus the SLA stamping fee applies. We have not yet extracted a public California Department of Insurance filing for this product; the rate band on this page will publish once the filing is reviewed.",
    ],
    sources: [
      {
        label: "California Department of Insurance — rate filings and regulator",
        url: "https://www.insurance.ca.gov/",
      },
      {
        label: "Surplus Line Association of California (SLA) — premium tax and stamping fee schedule",
        url: "https://www.slacal.org/",
      },
      {
        label: "California AB 5 (2019) — Worker classification (Lab. Code § 2750.3)",
        url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB5",
      },
      {
        label: "FMCSA 49 CFR Part 387 — Minimum Levels of Financial Responsibility",
        url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "primary-liability",
    stateSlug: "florida",
    headline: "What drives primary liability premiums in Florida",
    paragraphs: [
      "Florida's primary liability rate environment changed materially with HB 837 (2023). The legislation shortened the general negligence statute of limitations from four years to two, replaced pure comparative negligence with a modified 51% bar, and tightened evidentiary rules around medical billing in personal-injury cases. Underwriters watching the Florida book have flagged each of these as moderate-to-favorable for commercial-vehicle primary liability.",
      "Geography matters too. Florida's port cities — Jacksonville, Miami, Port Tampa Bay — concentrate cargo theft and intermodal exposure. Reefer freight running I-95 and I-75 through Florida is a distinct underwriting class, and primary liability rates frequently move together with cargo and reefer-breakdown placement at renewal.",
      "Surplus-lines placements in Florida are filed through the Florida Surplus Lines Service Office (FSLSO). A 4.94% premium tax plus a 0.06% FSLSO service fee applies. Risks declined by admitted Florida carriers — including hot-shot operations under newly-issued MC numbers, certain hazmat classes, and operators with one or more chargeable losses in 36 months — typically place through the surplus-lines channel.",
      "We have not yet extracted a public Florida Office of Insurance Regulation filing for primary liability on commercial trucking. The carrier table below lists the carriers we expect to write the line based on their published license footprints; whether a specific carrier currently has open appetite for your operation is the producer's call at submission.",
    ],
    sources: [
      {
        label: "Florida Office of Insurance Regulation (FLOIR)",
        url: "https://floir.com/",
      },
      {
        label: "Florida Surplus Lines Service Office (FSLSO)",
        url: "https://www.fslso.com/",
      },
      {
        label: "Florida HB 837 (2023) — Civil Remedies Reform",
        url: "https://www.flsenate.gov/Session/Bill/2023/837",
      },
      {
        label: "FMCSA 49 CFR Part 387 — Minimum Levels of Financial Responsibility",
        url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "primary-liability",
    stateSlug: "illinois",
    headline: "What drives primary liability premiums in Illinois",
    paragraphs: [
      "Illinois primary liability premiums for commercial trucking are anchored by the Cook County jury environment. Cook County is consistently ranked among the top-three highest-severity venues in the country for commercial-vehicle litigation, and underwriters writing Class 8 long-haul risks operating in or transiting the Chicago metro price the venue exposure into the base rate. There is no general cap on non-economic damages in Illinois outside specific statutory carve-outs.",
      "Severity matters more than frequency in Illinois pricing. The state's pure several-liability framework and the absence of a comparative-negligence percentage bar mean that even a partially-at-fault commercial-vehicle defendant can be tagged with a substantial portion of damages. This is especially relevant for fleet risks where multiple defendants — motor carrier, broker, shipper — are named in the same suit.",
      "Surplus-lines placements in Illinois are filed through the Surplus Line Association of Illinois (SLA-IL). A 3.5% premium tax plus a 0.075% SLA-IL stamping fee applies. Risks the admitted Illinois market declines — including non-standard fleets and specific hazmat classes — typically place through the surplus-lines channel.",
      "We have not yet extracted a public Illinois Department of Insurance filing for primary liability on commercial trucking. The rate band will publish once the filing is reviewed by an Illinois-licensed producer.",
    ],
    sources: [
      {
        label: "Illinois Department of Insurance (IDOI)",
        url: "https://idoi.illinois.gov/",
      },
      {
        label: "Surplus Line Association of Illinois (SLA-IL)",
        url: "https://www.ilsla.org/",
      },
      {
        label: "Illinois Trucking Association — industry context",
        url: "https://www.illinoistrucking.org/",
      },
      {
        label: "FMCSA 49 CFR Part 387 — Minimum Levels of Financial Responsibility",
        url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "primary-liability",
    stateSlug: "georgia",
    headline: "What drives primary liability premiums in Georgia",
    paragraphs: [
      "Georgia is one of the most consequential commercial-trucking premium markets in the Southeast. Atlanta serves as the FMCSA Southern Service Center and is the nexus of I-75, I-85, and I-20 long-haul freight; the geography concentrates exposure, and primary liability premiums reflect that.",
      "The 2025 Georgia tort reform package (SB 68 and SB 69) materially changed the legal environment for commercial-vehicle litigation. Negligent-entrustment standards were tightened, attorney advertising rules were updated, and seatbelt evidence is now admissible at trial. Underwriters tracking Georgia have flagged the package as moderately favorable for primary liability rates compared to the pre-reform environment, particularly for fleet risks operating in metro Atlanta where pre-reform venue exposure was a meaningful component of the base rate.",
      "Surplus-lines placements in Georgia are filed through the Georgia Surplus Lines Association (GSLA). A 4% premium tax plus statutory fees apply. Risks declined by admitted Georgia carriers — including non-standard fleets, hot-shot operations under newly-issued MC numbers, and certain hazmat classes — typically place through the surplus-lines channel.",
      "We have not yet extracted a public Georgia Office of Commissioner of Insurance and Safety Fire filing for primary liability. The rate band will publish once the filing is reviewed by a Georgia-licensed producer.",
    ],
    sources: [
      {
        label: "Georgia Office of Commissioner of Insurance and Safety Fire",
        url: "https://oci.georgia.gov/",
      },
      {
        label: "Georgia SB 68 (2025) — Tort Reform / Civil Practice",
        url: "https://www.legis.ga.gov/legislation/SB68",
      },
      {
        label: "Georgia SB 69 (2025) — Litigation Funding Disclosure",
        url: "https://www.legis.ga.gov/legislation/SB69",
      },
      {
        label: "FMCSA 49 CFR Part 387 — Minimum Levels of Financial Responsibility",
        url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
];

export function getEditorial(
  productSlug: string,
  stateSlug: string,
  dotClassSlug?: string,
): EditorialBody | null {
  return (
    ENTRIES.find(
      (e) =>
        e.productSlug === productSlug &&
        e.stateSlug === stateSlug &&
        e.dotClassSlug === (dotClassSlug as DotClassSlug | undefined),
    ) ?? null
  );
}

export function getAllEditorial(): EditorialBody[] {
  return ENTRIES;
}
