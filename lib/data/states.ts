import "server-only";

import type { CarrierSlug } from "./carriers";

/* ===========================================================================
   Insurance-side state metadata. Distinct from lib/cities.ts (which holds
   financing-side state context — lender panels, lending licensure). The two
   files are intentionally separate so a change to insurance regulatory copy
   cannot accidentally edit a financing licensing claim, or vice versa.

   Phase 1 ships TX / CA / FL only — matching the existing financing
   coverage. IL and GA are added in Week 4 with the editorial seed.

   Field discipline:
     - doi.url must point to the actual state regulator's domain.
     - tortReformNote and surplusLinesNote are factual context. They MUST be
       phrased as observation, not advice. If we cannot source it, we omit
       the field rather than paraphrasing.
     - topCarriers is an editorial pick from the carriers registry: which
       carriers we will surface in the state's carrier table by default.
       Order matters; first carrier shown first.
   =========================================================================== */

export type InsuranceState = {
  name: string;
  abbr: string;
  slug: string;
  doi: {
    name: string;
    url: string;
  };
  surplusLinesNote: string | null;
  tortReformNote: string | null;
  fmcsaServiceCenter: string | null;
  topCarriers: readonly CarrierSlug[];
};

const STATES: Record<string, InsuranceState> = {
  texas: {
    name: "Texas",
    abbr: "TX",
    slug: "texas",
    doi: {
      name: "Texas Department of Insurance",
      url: "https://www.tdi.texas.gov/",
    },
    surplusLinesNote:
      "Surplus lines placements in Texas are filed through the Surplus Lines Stamping Office of Texas (SLTX); a 4.85% premium tax applies in addition to the SLTX stamping fee.",
    tortReformNote:
      "Texas caps non-economic damages in healthcare cases under Tex. Civ. Prac. & Rem. Code Ch. 74 and has additional commercial-vehicle reform under HB 19 (2021), which raises the bar for direct negligence claims against motor carriers.",
    fmcsaServiceCenter: "FMCSA Southern Service Center (Fort Worth)",
    topCarriers: [
      "progressive-commercial",
      "great-west",
      "canal",
      "northland",
      "sentry",
    ],
  },
  california: {
    name: "California",
    abbr: "CA",
    slug: "california",
    doi: {
      name: "California Department of Insurance",
      url: "https://www.insurance.ca.gov/",
    },
    surplusLinesNote:
      "California surplus lines are placed through brokers licensed by the Surplus Line Association of California (SLA); 3% premium tax plus SLA stamping fee applies.",
    tortReformNote:
      "California does not cap non-economic damages outside MICRA (medical malpractice). Recent legislation (AB 35, effective 2023) raised MICRA caps; commercial-vehicle exposure remains uncapped in non-medmal cases.",
    fmcsaServiceCenter: "FMCSA Western Service Center (Lakewood, CO)",
    topCarriers: [
      "progressive-commercial",
      "northland",
      "sentry",
      "berkshire-hathaway-guard",
      "acuity",
    ],
  },
  florida: {
    name: "Florida",
    abbr: "FL",
    slug: "florida",
    doi: {
      name: "Florida Office of Insurance Regulation",
      url: "https://floir.com/",
    },
    surplusLinesNote:
      "Florida surplus lines are filed through the Florida Surplus Lines Service Office (FSLSO); 4.94% premium tax plus 0.06% FSLSO service fee applies.",
    tortReformNote:
      "Florida HB 837 (2023) shortened the negligence statute of limitations from 4 to 2 years and adopted modified comparative negligence (51% bar). Both materially affect commercial-auto liability exposure for carriers domiciled or operating in Florida.",
    fmcsaServiceCenter: "FMCSA Southern Service Center (Atlanta)",
    topCarriers: [
      "progressive-commercial",
      "canal",
      "great-west",
      "hallmark",
      "nationwide-e-and-s",
    ],
  },
  illinois: {
    name: "Illinois",
    abbr: "IL",
    slug: "illinois",
    doi: {
      name: "Illinois Department of Insurance",
      url: "https://idoi.illinois.gov/",
    },
    surplusLinesNote:
      "Illinois surplus lines are filed through the Surplus Line Association of Illinois (SLA-IL); 3.5% premium tax plus 0.075% SLA-IL stamping fee applies.",
    tortReformNote:
      "Illinois retains pure several liability for non-medical-malpractice cases and has no general cap on non-economic damages. Cook County jury venues are widely tracked by motor-carrier underwriters as a high-severity environment, materially affecting Class 8 long-haul primary liability rates for risks operating in or transiting the Chicago metro.",
    fmcsaServiceCenter: "FMCSA Midwestern Service Center (Olympia Fields)",
    topCarriers: [
      "progressive-commercial",
      "great-west",
      "acuity",
      "sentry",
      "northland",
    ],
  },
  georgia: {
    name: "Georgia",
    abbr: "GA",
    slug: "georgia",
    doi: {
      name: "Georgia Office of Commissioner of Insurance and Safety Fire",
      url: "https://oci.georgia.gov/",
    },
    surplusLinesNote:
      "Georgia surplus lines are filed through the Georgia Surplus Lines Association (GSLA); 4% premium tax plus statutory fees apply.",
    tortReformNote:
      "Georgia SB 68 and SB 69 (2025) reformed the negligent-entrustment standard, attorney advertising rules, and seatbelt-evidence admissibility — all of which were targeted at commercial-vehicle litigation costs. The legislation is widely viewed as moderately favorable for primary liability rates compared to the pre-reform environment, particularly for fleet risks operating in metro Atlanta.",
    fmcsaServiceCenter: "FMCSA Southern Service Center (Atlanta)",
    topCarriers: [
      "progressive-commercial",
      "great-west",
      "canal",
      "northland",
      "sentry",
    ],
  },
};

export function getInsuranceState(slug: string): InsuranceState | null {
  return STATES[slug] ?? null;
}

export function getAllInsuranceStates(): InsuranceState[] {
  return Object.values(STATES);
}

export function getInsuranceStateSlugs(): string[] {
  return Object.keys(STATES);
}
