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
    productSlug: "motor-truck-cargo",
    stateSlug: "texas",
    headline: "What drives motor truck cargo premiums in Texas",
    paragraphs: [
      "Motor truck cargo coverage is not federally mandated, but it is functionally required by 95%+ of brokered freight contracts. In Texas — where I-10, I-20, I-35, and I-45 carry an outsized share of national freight volume — broker-required cargo limits often run higher than the standard $100,000 baseline, particularly for refrigerated, electronics, and high-value freight lanes.",
      "Two state-specific dynamics shape the rate environment. First, Texas border ports (Laredo, El Paso) concentrate cross-border freight; cargo theft frequency in border-corridor staging areas factors into rate filings for carriers writing those lanes. Second, Texas hosts a meaningful share of US oil-and-gas freight, which carries distinct cargo-handling exposures (high-value equipment, specialized commodity classes) and is typically priced with endorsements rather than the base policy.",
      "Cargo claims are governed federally by the Carmack Amendment (49 U.S.C. § 14706), which establishes carrier liability for loss or damage in transit and the contractual ability of shippers and brokers to demand specific coverage limits. Texas courts apply the Carmack framework consistently with the federal model; underwriters do not price meaningful Texas-specific Carmack risk separately.",
      "We have not yet extracted a public Texas Department of Insurance filing for motor truck cargo. The carrier table below lists the carriers writing the line in Texas based on their published license footprints; the rate band on this page will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Texas Department of Insurance — commercial auto and inland marine filings",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label: "Carmack Amendment (49 U.S.C. § 14706) — Liability of carriers under receipts and bills of lading",
        url: "https://www.govinfo.gov/app/details/USCODE-2023-title49/USCODE-2023-title49-subtitleIV-partB-chap147-sec14706",
      },
      {
        label: "CargoNet — annual cargo theft trend reports",
        url: "https://www.cargonet.com/",
      },
      {
        label: "Texas Trucking Association — industry context",
        url: "https://www.texastrucking.com/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "california",
    headline: "What drives motor truck cargo premiums in California",
    paragraphs: [
      "California cargo premiums are shaped by two distinctive exposures: the Ports of Long Beach and Los Angeles, which together handle the largest container volume in the United States, and the Central Valley produce-haul economy, which concentrates time-temperature-sensitive freight across a 10-week harvest window. Both push broker-required cargo limits above the $100,000 default for affected lanes.",
      "Cargo theft in the Inland Empire and around port-adjacent staging yards is consistently flagged by industry trackers as among the highest-frequency in the country. Underwriters writing California reefer and electronics freight price this exposure into the base rate, and several carriers require route-and-stop endorsements — limits on unattended-vehicle time and overnight parking outside secured yards — as a condition of coverage on high-value commodities.",
      "The Carmack Amendment (49 U.S.C. § 14706) governs cargo liability federally; California courts apply the framework consistently with the federal model. Where California layers in additional consumer-facing rules (commercial-financing disclosure under SB 1235, AB 5 contractor classification effects on owner-operator coverage), those bear on operations more than on cargo rate filings directly.",
      "We have not yet extracted a public California Department of Insurance filing for motor truck cargo. The carrier table below reflects carriers writing the line in California based on their published license footprints; the rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "California Department of Insurance — commercial auto and inland marine filings",
        url: "https://www.insurance.ca.gov/",
      },
      {
        label: "Carmack Amendment (49 U.S.C. § 14706)",
        url: "https://www.govinfo.gov/app/details/USCODE-2023-title49/USCODE-2023-title49-subtitleIV-partB-chap147-sec14706",
      },
      {
        label: "CargoNet — annual cargo theft trend reports (Inland Empire and port-adjacent corridors)",
        url: "https://www.cargonet.com/",
      },
      {
        label: "Surplus Line Association of California (SLA) — premium tax and stamping fee schedule",
        url: "https://www.slacal.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "florida",
    headline: "What drives motor truck cargo premiums in Florida",
    paragraphs: [
      "Florida is one of the highest-frequency cargo theft states in the country. Industry trackers consistently rank Miami-Dade, Hialeah, and the corridors around Port Tampa Bay among the top cargo-theft venues nationally; underwriters price that exposure into the base rate for any Florida-operating cargo policy. The default $100,000 cargo limit is regularly adjusted upward for refrigerated, electronics, and pharma freight on Florida lanes.",
      "Hurricane-season operations add a second layer. Tractor-trailer staging and re-routing during Atlantic storm activity creates concentrated dwell-time exposure at non-secured locations, and several carriers require unattended-vehicle endorsements or hard parking-only restrictions as a condition of writing high-value commodity classes through Florida lanes.",
      "Cargo claims are governed federally by the Carmack Amendment (49 U.S.C. § 14706). Florida courts apply the federal framework consistently. HB 837 (2023) reshaped general negligence litigation in Florida, but its direct effect on cargo coverage — which is governed by Carmack rather than tort law — is minimal; the indirect effect on overall commercial-vehicle premium environments is more visible on primary liability than cargo.",
      "We have not yet extracted a public Florida Office of Insurance Regulation filing for motor truck cargo. The rate band will publish once the filing is reviewed by a Florida-licensed producer.",
    ],
    sources: [
      {
        label: "Florida Office of Insurance Regulation (FLOIR)",
        url: "https://floir.com/",
      },
      {
        label: "Carmack Amendment (49 U.S.C. § 14706)",
        url: "https://www.govinfo.gov/app/details/USCODE-2023-title49/USCODE-2023-title49-subtitleIV-partB-chap147-sec14706",
      },
      {
        label: "CargoNet — annual cargo theft trend reports (Florida corridor analysis)",
        url: "https://www.cargonet.com/",
      },
      {
        label: "Florida Surplus Lines Service Office (FSLSO)",
        url: "https://www.fslso.com/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "illinois",
    headline: "What drives motor truck cargo premiums in Illinois",
    paragraphs: [
      "Illinois cargo premiums are shaped by the Chicago metro's role as the dominant inland intermodal hub in the United States. Container volume from BNSF, CSX, NS, UP, and CN intermodal yards concentrates cargo handoffs in the Chicago-Joliet-Bedford Park corridor, and broker-required cargo limits on those lanes routinely exceed the $100,000 default for high-value commodities and electronics freight.",
      "Cargo theft frequency around Chicago-area cross-dock and intermodal terminals is consistently flagged by industry trackers, and several carriers writing Illinois cargo require route-and-stop endorsements or hard parking-only conditions on high-value commodity classes. Cook County's plaintiff-friendly venue history affects primary liability more than cargo, but appears in cargo-related subrogation outcomes where third-party defendants are involved.",
      "The Carmack Amendment (49 U.S.C. § 14706) governs cargo liability federally; Illinois courts apply the federal framework consistently. There is no general cap on damages in Illinois outside specific statutory carve-outs, but for cargo claims this matters less because the Carmack measure is tied to the actual loss rather than non-economic damages.",
      "We have not yet extracted a public Illinois Department of Insurance filing for motor truck cargo. The rate band on this page will publish once the filing has been extracted and reviewed by an Illinois-licensed producer; until then the carrier table reflects the carriers we expect to write the line based on their published license footprints.",
    ],
    sources: [
      {
        label: "Illinois Department of Insurance (IDOI)",
        url: "https://idoi.illinois.gov/",
      },
      {
        label: "Carmack Amendment (49 U.S.C. § 14706)",
        url: "https://www.govinfo.gov/app/details/USCODE-2023-title49/USCODE-2023-title49-subtitleIV-partB-chap147-sec14706",
      },
      {
        label: "CargoNet — annual cargo theft trend reports (Chicago intermodal corridor)",
        url: "https://www.cargonet.com/",
      },
      {
        label: "Surplus Line Association of Illinois (SLA-IL)",
        url: "https://www.ilsla.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "georgia",
    headline: "What drives motor truck cargo premiums in Georgia",
    paragraphs: [
      "Georgia cargo premiums are shaped by Atlanta's role as the Southeast's freight nexus. The intersection of I-75, I-85, and I-20 — combined with major intermodal facilities at Inman Yard and Fairburn — concentrates cargo handoffs across thousands of daily moves. Broker-required cargo limits on Atlanta lanes regularly exceed the $100,000 default for electronics, pharma, and high-value commodity freight.",
      "The Port of Savannah is the second axis. Container volume through Savannah has grown faster than any other US East Coast port over the past decade, and cargo policies on Savannah-Atlanta drayage and inland-haul lanes carry their own exposure profile (theft at port-adjacent staging, dwell-time exposures around the inland CSX Appalachian terminal).",
      "Cargo claims are governed federally by the Carmack Amendment (49 U.S.C. § 14706). Georgia courts apply the federal framework consistently. Georgia's 2025 SB 68 / SB 69 tort reform package reshaped general commercial-vehicle litigation; the direct effect on cargo coverage — which is governed by Carmack rather than tort law — is minimal, but the indirect effect on overall premium environments has improved underwriting appetite.",
      "We have not yet extracted a public Georgia Office of Commissioner of Insurance and Safety Fire filing for motor truck cargo. The rate band will publish once the filing is reviewed by a Georgia-licensed producer.",
    ],
    sources: [
      {
        label: "Georgia Office of Commissioner of Insurance and Safety Fire",
        url: "https://oci.georgia.gov/",
      },
      {
        label: "Carmack Amendment (49 U.S.C. § 14706)",
        url: "https://www.govinfo.gov/app/details/USCODE-2023-title49/USCODE-2023-title49-subtitleIV-partB-chap147-sec14706",
      },
      {
        label: "CargoNet — annual cargo theft trend reports (Atlanta and Savannah corridors)",
        url: "https://www.cargonet.com/",
      },
      {
        label: "Georgia Surplus Lines Association (GSLA)",
        url: "https://www.gsla.us/",
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
      "We have not yet extracted a public Georgia Office of Commissioner of Insurance and Safety Fire filing for primary liability. The rate band on this page will publish once the filing has been extracted and reviewed by a Georgia-licensed producer; until then the carrier table reflects the carriers we expect to write the line based on their published license footprints.",
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
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "texas",
    dotClassSlug: "class-8-tractor",
    headline: "Cargo coverage for Class 8 tractor operators in Texas",
    paragraphs: [
      "Class 8 tractor operators in Texas hauling under MC authority almost universally need motor truck cargo coverage above the $100,000 default. Broker contracts on Texas-anchored lanes — particularly cross-border lanes through Laredo and El Paso, oil-and-gas freight on I-20 and I-37, and Houston-area chemical hauls — routinely require limits of $250,000 to $1,000,000 depending on commodity class.",
      "Two Texas-specific exposures dominate cargo rate filings for Class 8 risks. First, cargo theft frequency in border-staging yards (Laredo and El Paso) and around the Houston Ship Channel inland container facilities is consistently flagged by industry trackers. Second, oil-and-gas freight requires specialized handling endorsements (high-value drilling equipment, specialty commodity classes) that price separately from the base policy and often require route-and-stop conditions.",
      "Cargo claims are governed by the Carmack Amendment (49 U.S.C. § 14706); Texas courts apply the federal framework consistently. The pertinent contractual carve-outs — released-value provisions, broker-shipper-carrier liability allocation — are the same in Texas as nationally, but the practical reality on Texas border lanes is that brokers demand higher limits to manage their own contingent cargo exposure.",
      "We have not yet extracted a public Texas Department of Insurance filing for motor truck cargo on Class 8 risks. The rate band will publish once the filing is reviewed by a Texas-licensed producer.",
    ],
    sources: [
      {
        label: "Texas Department of Insurance — commercial auto and inland marine filings",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label: "Carmack Amendment (49 U.S.C. § 14706)",
        url: "https://www.govinfo.gov/app/details/USCODE-2023-title49/USCODE-2023-title49-subtitleIV-partB-chap147-sec14706",
      },
      {
        label: "CargoNet — Texas border-corridor and Houston Ship Channel reports",
        url: "https://www.cargonet.com/",
      },
      {
        label: "Texas Trucking Association — cross-border and oil-and-gas freight context",
        url: "https://www.texastrucking.com/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "primary-liability",
    stateSlug: "texas",
    dotClassSlug: "hot-shot",
    headline: "Primary liability for hot-shot operators in Texas",
    paragraphs: [
      "Hot-shot operations — typically Class 3 to Class 5 dually pickups pulling gooseneck or bumper-pull trailers under newly-issued MC authority — sit in the most challenging segment of the Texas commercial-trucking primary liability market. Admitted carriers frequently decline these risks; surplus-lines placement through SLTX is the typical path for the first three to five years of authority operation.",
      "Two factors drive the rate environment for Texas hot-shot risks. First, hot-shot operators frequently work expedited and partial-load freight from broker load boards, which exposes them to less-vetted shipper relationships and more complex routing — both of which underwriters price into the base rate. Second, the gooseneck-trailer combination GVWR (typically 14,000–19,500 lbs) sits below the FMCSA Class 8 thresholds, but cargo and routing patterns frequently match Class 8 lanes — creating a mismatch between underwriting class and actual exposure that prices to the higher class.",
      "HB 19 (2021) reformed direct-negligence litigation against motor carriers in Texas, but the favorable effect on rates is most visible in the standard-market Class 8 segment. For hot-shot risks already in the surplus-lines channel, the practical effect on premiums is muted; SLTX's 4.85% premium tax plus stamping fee continues to apply.",
      "We have not yet extracted a public Texas Department of Insurance filing for primary liability on hot-shot risks. The rate band will publish once the filing is reviewed by a Texas-licensed producer.",
    ],
    sources: [
      {
        label: "Texas Department of Insurance — commercial auto rate filings (TDI)",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label: "Surplus Lines Stamping Office of Texas (SLTX)",
        url: "https://www.sltx.org/",
      },
      {
        label: "FMCSA 49 CFR Part 387 — Minimum Levels of Financial Responsibility",
        url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
      },
      {
        label: "Texas HB 19 (2021) — Trial of Certain Actions Involving Commercial Motor Vehicles",
        url: "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=87R&Bill=HB19",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "primary-liability",
    stateSlug: "california",
    dotClassSlug: "class-8-tractor",
    headline: "Primary liability for Class 8 tractor operators in California",
    paragraphs: [
      "California Class 8 primary liability is consistently among the most expensive in the country. Two factors compound: the absence of a general cap on non-economic damages outside MICRA, and the venue history in Los Angeles and Bay Area courts. Underwriters writing Class 8 risks operating in California — even those domiciled elsewhere — price the venue exposure into the base rate.",
      "The AB 5 contractor-classification framework adds a second layer for Class 8 owner-operators leased onto motor carriers. Federal preemption of AB 5 as applied to motor carriers has been litigated extensively (the FAAAA / California debate); the practical consequence today is that fleet structures get scrutinized in any post-loss litigation, which feeds back into both primary liability pricing and non-trucking-liability (bobtail) coverage on leased-on operators.",
      "Surplus-lines placements in California go through brokers licensed by the Surplus Line Association of California (SLA). A 3% premium tax plus the SLA stamping fee applies. Class 8 risks declined by admitted California carriers — typically those with one or more chargeable losses in 36 months, certain hazmat classes, or operations in elevated-exposure venues — place through the surplus-lines channel.",
      "We have not yet extracted a public California Department of Insurance filing for primary liability on Class 8 risks. The rate band will publish once the filing is reviewed by a California-licensed producer.",
    ],
    sources: [
      {
        label: "California Department of Insurance",
        url: "https://www.insurance.ca.gov/",
      },
      {
        label: "Surplus Line Association of California (SLA)",
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
    dotClassSlug: "class-8-tractor",
    headline: "Primary liability for Class 8 tractor operators in Florida",
    paragraphs: [
      "Florida Class 8 primary liability is shaped by HB 837 (2023), which shortened the negligence statute of limitations from four years to two and replaced pure comparative negligence with a modified 51% bar. Underwriters watching the Florida Class 8 book have flagged each of these as moderate-to-favorable for primary liability rates compared to the pre-reform environment, particularly for fleet risks running I-95 and I-75 through Florida.",
      "Geography drives a second layer. Class 8 lanes feeding the Ports of Jacksonville, Miami, and Tampa concentrate intermodal exposure, and reefer-tractor combinations operating on Florida produce lanes carry distinct cargo-related liability that overlaps with primary liability in subrogation contexts. Hurricane-season operations also create staging exposure — staging yards with high concentrations of dwell-time tractors during storm activity push insurers to scrutinize parking and security practices.",
      "Surplus-lines placements in Florida are filed through the Florida Surplus Lines Service Office (FSLSO). A 4.94% premium tax plus a 0.06% FSLSO service fee applies on top of the carrier's base rate. Class 8 risks declined by admitted Florida carriers — typically those with chargeable losses, certain hazmat classes, or non-standard operations — typically place through the surplus-lines channel.",
      "We have not yet extracted a public Florida Office of Insurance Regulation filing for primary liability on Class 8 risks. The rate band will publish once the filing is reviewed by a Florida-licensed producer.",
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
    productSlug: "physical-damage",
    stateSlug: "texas",
    headline: "What drives physical damage premiums in Texas",
    paragraphs: [
      "Physical damage on a Texas-operating Class 8 tractor and trailer is dominated by three exposures: collision frequency on Texas long-haul corridors, theft frequency around border-staging yards (Laredo and El Paso) and Houston Ship Channel staging, and the stated-value range of the equipment. The first two move the rate; the third moves the dollar premium proportional to value.",
      "Collision frequency is shaped by Texas's role as the largest commercial-trucking state by VMT (vehicle miles traveled). I-10, I-20, I-35, and I-45 each carry significant Class 8 tractor-trailer volume, and DPS crash data shows commercial-vehicle severity on Texas Interstates in line with national averages. Underwriters writing physical damage on Texas-operating fleets generally apply standard collision factors; the Texas-specific adjustment shows up more in the deductible structure than in the base rate.",
      "Theft is the more state-specific exposure. Laredo and El Paso border-staging theft frequency is consistently flagged by industry trackers; Houston-area cross-dock and intermodal terminals are similarly exposed. Carriers writing physical damage on operators with significant border or port exposure may require route-and-stop endorsements, hard-parking conditions, or anti-theft technology (GPS recovery, kill switches) as a condition of coverage on high-value tractors.",
      "Catastrophic exposure (hail, tornado) is a tertiary factor in West Texas and the panhandle but does not materially move base rates statewide. We have not yet extracted a public Texas Department of Insurance filing for physical damage on commercial tractors. The carrier table reflects carriers writing the line based on their published license footprints; the rate band will publish once a filing is reviewed by a Texas-licensed producer.",
    ],
    sources: [
      {
        label: "Texas Department of Insurance — commercial auto and inland marine filings",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label: "Texas Department of Public Safety — commercial vehicle crash statistics",
        url: "https://www.dps.texas.gov/",
      },
      {
        label: "CargoNet — annual cargo and equipment theft reports (Texas border and port corridors)",
        url: "https://www.cargonet.com/",
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
    productSlug: "physical-damage",
    stateSlug: "california",
    headline: "What drives physical damage premiums in California",
    paragraphs: [
      "California physical damage premiums on Class 8 tractors and trailers reflect three California-specific exposures: theft frequency in the Inland Empire and around the Ports of Los Angeles and Long Beach, CARB compliance equipment values, and traffic-density collision frequency in metro Los Angeles and the Bay Area. Stated value drives the dollar premium, but these three factors drive the rate per dollar of value.",
      "Tractor and trailer theft frequency in the Inland Empire — the warehouse and staging belt extending from Riverside through San Bernardino — is consistently among the highest-frequency in the country. Port-adjacent staging in Wilmington, Carson, and Long Beach adds a second cluster. Underwriters writing California physical damage routinely require route-and-stop endorsements or hard-parking conditions on equipment exceeding $150K stated value, and several carriers require GPS recovery technology as a condition of coverage for high-value tractors.",
      "CARB engine and fuel-system compliance has driven equipment values for California-operating fleets above national averages. Compliant tractors with certified clean-engine retrofits or post-2010 engines carry stated values 10-20% above the equivalent national-average tractor; physical damage premiums move proportionally. The 2020 Advanced Clean Trucks rule and subsequent zero-emission mandates extend this dynamic into 2026 and beyond.",
      "We have not yet extracted a public California Department of Insurance filing for physical damage on commercial tractors. The carrier table reflects carriers writing the line based on their published license footprints; the rate band will publish once a filing is reviewed by a California-licensed producer.",
    ],
    sources: [
      {
        label: "California Department of Insurance",
        url: "https://www.insurance.ca.gov/",
      },
      {
        label: "California Air Resources Board (CARB) — Advanced Clean Trucks regulation",
        url: "https://ww2.arb.ca.gov/",
      },
      {
        label: "CargoNet — Inland Empire and California port-corridor theft reports",
        url: "https://www.cargonet.com/",
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
    productSlug: "physical-damage",
    stateSlug: "florida",
    headline: "What drives physical damage premiums in Florida",
    paragraphs: [
      "Florida physical damage premiums reflect a distinctive combination of catastrophic-weather exposure and elevated theft frequency that no other state matches. Hurricane-season operations create concentrated dwell-time exposure at non-secured staging locations, and Florida is consistently among the highest-frequency theft states for tractors and trailers — a combination that pushes Florida physical damage rates above the national average for equivalent stated values.",
      "Catastrophic-weather exposure shapes carrier appetite directly. Carriers writing Florida physical damage typically condition coverage on hurricane-protocol compliance: equipment moved to secured inland staging when a named storm enters the warning cone, anti-theft technology on equipment over $150K stated value, and storm-aware deductible structures (separate higher-deductible tier for named-storm losses). Several carriers exclude wind/flood losses entirely on equipment parked at the operator's discretion during a named storm.",
      "Theft frequency in Miami-Dade, Broward, and around the Ports of Jacksonville and Tampa is consistently flagged by industry trackers. Port-adjacent staging is the highest-exposure zone; carriers writing port drayage and intermodal operations may require route-and-stop endorsements or GPS recovery technology as a condition of coverage on high-value tractors.",
      "We have not yet extracted a public Florida Office of Insurance Regulation filing for physical damage on commercial tractors. The carrier table reflects carriers writing the line based on their published license footprints; the rate band will publish once a filing is reviewed by a Florida-licensed producer.",
    ],
    sources: [
      {
        label: "Florida Office of Insurance Regulation (FLOIR)",
        url: "https://floir.com/",
      },
      {
        label: "National Hurricane Center — Atlantic basin tropical activity (NOAA)",
        url: "https://www.nhc.noaa.gov/",
      },
      {
        label: "CargoNet — Florida port-corridor and Miami-Dade theft reports",
        url: "https://www.cargonet.com/",
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
    productSlug: "physical-damage",
    stateSlug: "texas",
    dotClassSlug: "class-8-tractor",
    headline: "Physical damage for Class 8 tractor operators in Texas",
    paragraphs: [
      "Physical damage on a Texas-operating Class 8 tractor is dominated by stated value, theft exposure, and collision frequency. For a 2020-model Class 8 tractor with a $120,000 stated value running general freight under MC authority — the canonical Texas owner-operator profile — physical damage is typically written with a $1,000–$2,500 deductible and prices proportionally to the stated value of the equipment.",
      "Theft is the most state-specific exposure for Class 8 tractors operating Texas border lanes. Laredo and El Paso staging-yard theft frequency is consistently flagged by industry trackers; Houston Ship Channel staging is the second cluster. Carriers writing physical damage on Class 8 tractors with significant border or port exposure may require GPS recovery technology, kill switches, or hard-parking conditions as a condition of coverage on equipment over $150,000 stated value.",
      "Collision exposure on Texas Interstates is at national-average frequency for Class 8 risks. Texas DPS commercial-vehicle crash data does not show meaningful Texas-specific severity for collision (severity is more concentrated in primary-liability claims, where it shows up under post-HB 19 reform context).",
      "We have not yet extracted a public Texas Department of Insurance filing for physical damage on Class 8 tractors. The rate band on this page will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Texas Department of Insurance",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label: "Texas Department of Public Safety — commercial vehicle crash statistics",
        url: "https://www.dps.texas.gov/",
      },
      {
        label: "CargoNet — Texas border-corridor and Houston port theft reports",
        url: "https://www.cargonet.com/",
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
    productSlug: "physical-damage",
    stateSlug: "california",
    dotClassSlug: "class-8-tractor",
    headline: "Physical damage for Class 8 tractor operators in California",
    paragraphs: [
      "Physical damage on a California-operating Class 8 tractor sits at the high end of the national rate spectrum. Three California-specific exposures compound: theft frequency in the Inland Empire and around the Ports of Los Angeles and Long Beach, CARB-driven equipment values 10-20% above national averages, and metro Los Angeles and Bay Area collision frequency at elevated levels.",
      "The Inland Empire — the warehouse and staging belt extending from Riverside through San Bernardino — has been the highest-frequency tractor theft corridor in the country across multiple recent CargoNet annual reports. Port-adjacent staging in Wilmington, Carson, and Long Beach is the second cluster. Carriers writing physical damage on Class 8 tractors with significant Southern California exposure routinely require route-and-stop endorsements, hard-parking conditions, and GPS recovery technology on equipment exceeding $150,000 stated value.",
      "CARB Advanced Clean Trucks rules and zero-emission mandates have driven equipment values for California-operating Class 8 tractors materially above national averages. Compliant tractors with certified clean engines or post-2020 model years carry stated values that translate directly into higher physical damage premiums (the dollar premium scales with stated value). Operators replacing equipment to maintain CARB compliance through 2026 should expect their physical damage premium to step up at each replacement cycle.",
      "We have not yet extracted a public California Department of Insurance filing for physical damage on Class 8 tractors. The rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "California Department of Insurance",
        url: "https://www.insurance.ca.gov/",
      },
      {
        label: "California Air Resources Board (CARB) — Advanced Clean Trucks regulation",
        url: "https://ww2.arb.ca.gov/",
      },
      {
        label: "CargoNet — Inland Empire and California port theft reports",
        url: "https://www.cargonet.com/",
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
    productSlug: "physical-damage",
    stateSlug: "florida",
    dotClassSlug: "class-8-tractor",
    headline: "Physical damage for Class 8 tractor operators in Florida",
    paragraphs: [
      "Physical damage on Florida-operating Class 8 tractors carries a distinctive risk profile: hurricane-season catastrophic exposure, elevated theft frequency in Miami-Dade and around Florida ports, and a rate environment that prices both factors above the national average. For a $120,000 stated value 2020 model-year Class 8 tractor, Florida physical damage typically prices 15-30% above the equivalent risk operating in lower-catastrophe, lower-theft states.",
      "Hurricane-season operations create concentrated dwell-time exposure. Carriers writing Florida Class 8 physical damage typically condition coverage on hurricane-protocol compliance: equipment moved to secured inland staging when a named storm enters the warning cone, a separate higher-deductible tier for named-storm losses, and exclusions for wind/flood losses on equipment parked at the operator's discretion during a named storm. Operators routing Florida lanes between June and November should expect protocol-compliance documentation requirements at renewal.",
      "Theft frequency in Miami-Dade, Broward, and around the Ports of Jacksonville and Tampa is consistently among the highest in the country for Class 8 tractors. Port-adjacent staging is the highest-exposure zone; carriers writing physical damage on Class 8 tractors with significant port drayage or intermodal operations may require route-and-stop endorsements, GPS recovery technology, or hard-parking conditions on equipment over $150,000 stated value.",
      "We have not yet extracted a public Florida Office of Insurance Regulation filing for physical damage on Class 8 tractors. The rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Florida Office of Insurance Regulation (FLOIR)",
        url: "https://floir.com/",
      },
      {
        label: "National Hurricane Center — Atlantic basin tropical activity (NOAA)",
        url: "https://www.nhc.noaa.gov/",
      },
      {
        label: "CargoNet — Florida port-corridor and Miami-Dade theft reports",
        url: "https://www.cargonet.com/",
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
    stateSlug: "texas",
    dotClassSlug: "box-truck",
    headline: "Primary liability for box truck operators in Texas",
    paragraphs: [
      "Box truck operations in Texas (Class 3-6 straight trucks with enclosed cargo bodies, typically 10,001-26,000 lbs GVWR) sit in a different segment of the commercial-auto market than Class 8 long-haul. Most Texas box truck primary liability is written through the same commercial-auto carriers as Class 8 — Progressive Commercial, Sentry, Great West — but the underwriting profile is materially different: shorter average radius, lower overall VMT, smaller exposure per power unit, and a different mix of routing risks.",
      "Texas box truck operations concentrate in metropolitan delivery (Dallas-Fort Worth, Houston, Austin, San Antonio), with last-mile, household goods, and small-package routes accounting for the majority of risk. Collision frequency in metro Texas is elevated relative to highway long-haul, but severity is materially lower because box truck combinations are physically smaller and operate at lower average speeds. The rate per dollar of revenue is typically lower for box truck risks than for Class 8 — but the dollar premium per vehicle is also lower because exposure is lower.",
      "HB 19 (2021) trial-structure reforms apply to box truck risks the same as Class 8, but the favorable rate effect is most visible on the long-haul book. For box truck risks already pricing well in the standard market, HB 19's effect on premium is muted. SLTX-channel surplus-lines placement is unusual for box truck operations under MC authority — most box truck risks place admitted.",
      "We have not yet extracted a public Texas Department of Insurance filing for primary liability on box truck risks. The rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Texas Department of Insurance",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label: "Texas Department of Public Safety — commercial vehicle crash statistics",
        url: "https://www.dps.texas.gov/",
      },
      {
        label: "Texas HB 19 (87th Leg., 2021)",
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
    productSlug: "general-liability",
    stateSlug: "texas",
    headline: "What drives general liability premiums for Texas trucking operations",
    paragraphs: [
      "General liability (GL) for commercial trucking covers premises liability, completed operations, and non-trucking-related injury claims — exposures that fall outside the scope of primary liability (which is vehicle-operation specific). For Texas owner-operators and small fleets, GL is typically required by terminal access agreements, broker contracts, and shipper master agreements, with $1M-per-occurrence limits being the prevailing standard.",
      "Texas premises liability is governed by chapter 75 of the Texas Civil Practice and Remedies Code, which applies a duty-of-care framework distinct from the post-HB 19 commercial-vehicle reforms. HB 19 specifically addresses commercial-vehicle direct-negligence trials and does not apply to GL premises claims. The practical implication: GL rates in Texas have not moved with HB 19, and the rate environment remains stable rather than easing.",
      "GL exposure for Texas trucking operations concentrates in three areas: terminal premises (loading docks, parking yards, fuel islands), completed operations (claims arising from cargo handling that doesn't fall under cargo coverage), and non-trucking activities at premises owned or leased by the operator. Texas operators with multiple terminal locations or shared facilities face elevated GL underwriting scrutiny.",
      "We have not yet extracted a public Texas Department of Insurance filing for general liability on commercial trucking risks. The carrier table reflects carriers writing the line; the rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Texas Department of Insurance",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label: "Texas Civil Practice and Remedies Code, Chapter 75 (Premises Liability)",
        url: "https://statutes.capitol.texas.gov/Docs/CP/htm/CP.75.htm",
      },
      {
        label: "Texas Trucking Association — terminal operations context",
        url: "https://www.texastrucking.com/",
      },
      {
        label: "Insurance Information Institute — commercial general liability overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "general-liability",
    stateSlug: "california",
    headline: "What drives general liability premiums for California trucking operations",
    paragraphs: [
      "California general liability (GL) on commercial trucking operations is shaped by two distinctive factors: California's plaintiff-friendly venue history (especially in Los Angeles and the Bay Area) and a long-running pattern of ADA-Title-III premises liability claims against commercial properties. Both push California GL rates above the national average for trucking operations with significant California premises exposure.",
      "California has no general cap on non-economic damages outside MICRA, which applies only to medical malpractice. For trucking-operation GL claims — slip-and-falls at terminals, completed-operations claims, non-vehicle bodily injury — the exposure is unbounded. Underwriters writing California GL on trucking risks price the venue exposure into the base rate, particularly for operators with terminal locations or yard operations in Los Angeles, Orange, San Diego, or Bay Area counties.",
      "ADA-Title-III premises liability has been a sustained driver of California GL claims. While ADA itself is federal, California's Unruh Civil Rights Act adds statutory damages on top of federal ADA exposure. Trucking operations with public-facing premises (driver lounges, customer service counters) face elevated underwriting attention. Operators without public-facing premises see less of this dynamic in their rates.",
      "We have not yet extracted a public California Department of Insurance filing for general liability on commercial trucking risks. The rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "California Department of Insurance",
        url: "https://www.insurance.ca.gov/",
      },
      {
        label: "California Unruh Civil Rights Act (Cal. Civ. Code § 51 et seq.)",
        url: "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=1.&chapter=&part=2.&lawCode=CIV&title=2.",
      },
      {
        label: "Americans with Disabilities Act Title III",
        url: "https://www.ada.gov/",
      },
      {
        label: "Insurance Information Institute — commercial general liability overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "general-liability",
    stateSlug: "florida",
    headline: "What drives general liability premiums for Florida trucking operations",
    paragraphs: [
      "Florida general liability (GL) for commercial trucking has materially improved since HB 837 (2023). The reform shortened the negligence statute of limitations from four years to two and adopted modified comparative negligence (51% bar). Both changes apply to GL claims as well as commercial-vehicle claims, and the loss-defense environment has become more favorable for carriers writing Florida GL on trucking risks.",
      "Florida premises liability remains the dominant GL exposure for trucking operations — loading dock claims, fuel-island slip-and-falls, terminal yard injuries. Florida GL underwriting concentrates on operators with significant terminal presence in Miami-Dade, Broward, and around the Ports of Jacksonville, Miami, and Tampa, where pre-reform venue exposure was meaningful. Three years post-reform, underwriters now have enough loss-development data to begin pricing the favorable change in.",
      "Hurricane-season operations create a secondary GL exposure: claims arising from storm-cleanup operations on premises, debris liability, and post-storm public-access risks at damaged terminals. Florida GL policies frequently include named-storm-aware exclusions or sub-limits for storm-related losses on premises.",
      "We have not yet extracted a public Florida Office of Insurance Regulation filing for general liability on commercial trucking risks. The rate band on this page will publish once the filing has been extracted and reviewed by a Florida-licensed producer; until then the carrier table reflects the carriers we expect to write the line based on their published license footprints.",
    ],
    sources: [
      {
        label: "Florida Office of Insurance Regulation (FLOIR)",
        url: "https://floir.com/",
      },
      {
        label: "Florida HB 837 (2023) — Civil Remedies Reform",
        url: "https://www.flsenate.gov/Session/Bill/2023/837",
      },
      {
        label: "Florida Statutes Chapter 768 (Negligence)",
        url: "https://www.flsenate.gov/Laws/Statutes/2023/Chapter768",
      },
      {
        label: "Insurance Information Institute — commercial general liability overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "general-liability",
    stateSlug: "illinois",
    headline: "What drives general liability premiums for Illinois trucking operations",
    paragraphs: [
      "Illinois general liability (GL) on commercial trucking operations is shaped primarily by Cook County's plaintiff-friendly venue history. The same dynamic that drives Illinois primary liability rates above national averages — pure several liability without a comparative-negligence percentage bar, no general cap on damages outside specific statutory carve-outs — applies to GL claims arising on trucking premises in or around Chicago.",
      "Illinois trucking operators with terminal facilities in Cook County, DuPage, Will, or other collar counties face elevated GL underwriting scrutiny. The Chicago intermodal corridor — with its concentration of trucking yards, cross-dock facilities, and warehouse-distribution clusters — is the highest-exposure cluster. Operators with significant yard operations in Joliet, Bedford Park, or the Inman Yard area (the BNSF intermodal corridor) typically see GL rates 15-25% above the equivalent risk operating outside Cook County.",
      "Premises liability claim severity in Illinois GL has tracked the broader Cook County severity story across multiple recent years. Underwriters writing Illinois GL on trucking risks price the severity exposure into the base rate. For operators in downstate Illinois — outside the Chicago metro — rates approximate national averages.",
      "We have not yet extracted a public Illinois Department of Insurance filing for general liability on commercial trucking risks. The rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Illinois Department of Insurance (IDOI)",
        url: "https://idoi.illinois.gov/",
      },
      {
        label: "Illinois Premises Liability Act (740 ILCS 130)",
        url: "https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2117",
      },
      {
        label: "Illinois Trucking Association — terminal operations context",
        url: "https://www.illinoistrucking.org/",
      },
      {
        label: "Insurance Information Institute — commercial general liability overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "general-liability",
    stateSlug: "georgia",
    headline: "What drives general liability premiums for Georgia trucking operations",
    paragraphs: [
      "Georgia general liability (GL) on commercial trucking operations sits in a transitional rate environment after the 2025 SB 68 / SB 69 tort reform package. The reforms tightened the negligent-entrustment standard, updated attorney advertising rules, and made seatbelt evidence admissible at trial. The reforms apply to GL claims as well as commercial-vehicle claims, and Georgia GL on trucking risks should see moderate rate moderation through 2026 as carriers price the change in.",
      "Atlanta is the primary GL exposure cluster. The metro area's role as the Southeast's freight nexus concentrates terminal operations, cross-dock facilities, and warehouse-distribution clusters across Fulton, DeKalb, Cobb, Clayton, and Gwinnett counties. Operators with significant Atlanta-metro premises exposure face elevated GL underwriting scrutiny relative to the rest of the state. Port of Savannah-related premises (terminal facilities in Chatham County and along the I-16 corridor) carry their own exposure profile.",
      "Premises liability claim severity in Georgia GL had tracked the high-severity national pattern through the pre-reform period. Three factors drove that: lack of meaningful comparative-fault constraint, jury venue history in Fulton and DeKalb counties, and aggressive attorney advertising. The 2025 reforms address all three, but loss-development data through 2027 will be needed to confirm sustained rate-environment improvement.",
      "We have not yet extracted a public Georgia Office of Commissioner of Insurance and Safety Fire filing for general liability on commercial trucking risks. The rate band will publish once a filing is reviewed.",
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
        label: "Insurance Information Institute — commercial general liability overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "physical-damage",
    stateSlug: "illinois",
    headline: "What drives physical damage premiums in Illinois",
    paragraphs: [
      "Illinois physical damage on commercial trucking equipment reflects three state-specific exposures: theft frequency in and around the Chicago intermodal corridor, collision frequency in metro Chicago, and freeze-thaw weather damage that affects equipment maintenance economics. Stated value drives the dollar premium proportionally; these three factors drive the rate per dollar of value.",
      "Theft frequency around the Chicago-Joliet intermodal corridor — including BNSF Logistics Park, the CSX Bedford Park terminal, the NS Landers Yard, and surrounding cross-dock facilities — has been consistently flagged by industry trackers across multiple recent years. Tractor and trailer theft from staging yards and overnight parking is the primary loss pattern. Carriers writing physical damage on Class 8 tractors operating Illinois lanes routinely require route-and-stop endorsements, hard-parking conditions, and GPS recovery technology on equipment over $150,000 stated value.",
      "Collision frequency in metro Chicago is elevated relative to highway long-haul corridors. The Cook County DuPage corridor combines high traffic density with frequent winter weather conditions; carriers writing physical damage on operators with significant Chicago-metro exposure may apply higher base rates for collision frequency than for an equivalent risk operating exclusively rural Illinois lanes.",
      "We have not yet extracted a public Illinois Department of Insurance filing for physical damage on commercial tractors. The carrier table reflects carriers writing the line based on their published license footprints; the rate band will publish once a filing is reviewed by an Illinois-licensed producer.",
    ],
    sources: [
      {
        label: "Illinois Department of Insurance (IDOI)",
        url: "https://idoi.illinois.gov/",
      },
      {
        label: "CargoNet — Chicago intermodal corridor theft reports",
        url: "https://www.cargonet.com/",
      },
      {
        label: "Illinois Department of Transportation — commercial vehicle crash data",
        url: "https://idot.illinois.gov/",
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
    productSlug: "physical-damage",
    stateSlug: "georgia",
    headline: "What drives physical damage premiums in Georgia",
    paragraphs: [
      "Georgia physical damage on commercial trucking equipment is dominated by three exposures: theft frequency around the Atlanta freight nexus and Port of Savannah, collision frequency on metro Atlanta corridors, and tornado / severe-weather catastrophic exposure across north Georgia. Stated value drives the dollar premium; the three exposures drive the rate per dollar.",
      "Theft frequency around the Atlanta intermodal corridor — Inman Yard, Fairburn intermodal, the Norfolk Southern Whitaker Terminal — and around the Port of Savannah is consistently flagged by industry trackers. Carriers writing physical damage on Class 8 tractors with significant Atlanta-metro or Savannah-port exposure may require route-and-stop endorsements, hard-parking conditions, and GPS recovery technology on equipment over $150,000 stated value.",
      "Collision frequency in metro Atlanta is elevated relative to highway long-haul corridors. I-285 and the I-75 / I-85 / I-20 interchanges concentrate Class 8 tractor-trailer traffic at high density, and underwriters writing physical damage on operators with significant Atlanta exposure typically apply higher collision-frequency factors than for equivalent rural Georgia operations.",
      "We have not yet extracted a public Georgia Office of Commissioner of Insurance and Safety Fire filing for physical damage on commercial tractors. The carrier table reflects carriers writing the line based on their published license footprints; the rate band will publish once a filing is reviewed by a Georgia-licensed producer.",
    ],
    sources: [
      {
        label: "Georgia Office of Commissioner of Insurance and Safety Fire",
        url: "https://oci.georgia.gov/",
      },
      {
        label: "CargoNet — Atlanta and Savannah-corridor theft reports",
        url: "https://www.cargonet.com/",
      },
      {
        label: "Georgia Department of Public Safety — commercial vehicle crash data",
        url: "https://gdps.georgia.gov/",
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
    productSlug: "occupational-accident",
    stateSlug: "texas",
    headline: "What drives occupational-accident premiums in Texas",
    paragraphs: [
      "Occupational-accident (occ-acc) coverage provides medical, disability, and accidental-death coverage for owner-operators who are classified as 1099 contractors and therefore excluded from workers' compensation. In Texas, where workers' comp is non-mandatory for private employers, occ-acc fills a critical gap for owner-operators leased onto motor carriers under independent-contractor agreements. Most Texas carrier lease agreements require the leased-on operator to carry occ-acc as a condition of the lease.",
      "Two Texas-specific factors shape the occ-acc rate environment. First, Texas is one of the few states that does not mandate workers' compensation for private-sector employers, so the share of Texas trucking workforce covered by occ-acc rather than WC is materially higher than in mandatory-WC states. Second, Texas commercial-trucking activity concentrates in long-haul Class 8 operation, which carries higher injury severity than local-delivery box truck or hot-shot operations; occ-acc rate filings reflect this in their classification factors.",
      "Coverage limits for owner-operator occ-acc in Texas typically run $500,000 medical / $250,000 accidental death / 70% of average weekly earnings disability — roughly the limits required by the dominant Texas-domiciled motor carriers' lease agreements. Higher limits are available; lower limits below the carriers' lease floor would not satisfy the lease.",
      "We have not yet extracted a public Texas Department of Insurance filing for occupational-accident coverage on owner-operators. The rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Texas Department of Insurance",
        url: "https://www.tdi.texas.gov/",
      },
      {
        label: "Texas Workforce Commission — workers' compensation context",
        url: "https://www.twc.texas.gov/",
      },
      {
        label: "Owner-Operator Independent Drivers Association (OOIDA) — independent-contractor classification",
        url: "https://www.ooida.com/",
      },
      {
        label: "Insurance Information Institute — occupational-accident overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "occupational-accident",
    stateSlug: "california",
    headline: "What drives occupational-accident premiums in California",
    paragraphs: [
      "California occupational-accident coverage for owner-operators sits at the intersection of two complex policy frameworks: AB 5 contractor classification (which has reshaped how the FAAAA-preempted motor-carrier industry treats independent-contractor leased-on operators) and California's mandatory workers' compensation regime for employees. Owner-operators classified as employees under AB 5 fall under California WC; those operating under their own MC authority or covered by FAAAA-preempted lease structures may rely on occ-acc.",
      "The California occ-acc rate environment reflects this complexity. Carriers writing occ-acc on California owner-operators frequently require lease-agreement documentation as a condition of binding, to confirm that the operator's classification supports occ-acc rather than WC. Operators whose lease structures are ambiguous under post-AB 5 case law may be quoted at elevated rates or declined.",
      "California medical-cost trends are higher than the national average, which feeds into occ-acc medical-coverage pricing. Coverage limits for California owner-operator occ-acc typically run $500,000 medical / $250,000 accidental death / 70% of average weekly earnings disability, with some carriers offering higher medical limits as an option for an additional premium.",
      "We have not yet extracted a public California Department of Insurance filing for occupational-accident coverage on owner-operators. The rate band on this page will publish once the filing has been extracted and reviewed by a California-licensed producer; until then the carrier table reflects the carriers we expect to write the line based on their published license footprints.",
    ],
    sources: [
      {
        label: "California Department of Insurance",
        url: "https://www.insurance.ca.gov/",
      },
      {
        label: "California AB 5 (2019) — Worker classification",
        url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB5",
      },
      {
        label: "California Department of Industrial Relations — workers' compensation",
        url: "https://www.dir.ca.gov/dwc/",
      },
      {
        label: "Insurance Information Institute — occupational-accident overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "occupational-accident",
    stateSlug: "florida",
    headline: "What drives occupational-accident premiums in Florida",
    paragraphs: [
      "Florida occupational-accident coverage for owner-operators leased onto motor carriers operates under a relatively stable regulatory framework — Florida workers' compensation is mandatory for employers but excludes independent contractors, and the AB-5-style classification challenges seen in California have not migrated to Florida. Owner-operators leased onto Florida-domiciled carriers rely on occ-acc as the standard injury-coverage substitute for workers' comp.",
      "Florida medical-cost trends and motor-vehicle injury severity are above the national average, which feeds into occ-acc medical-coverage pricing. The state's role as a hurricane-season operations theater also adds a secondary exposure: occ-acc claims arising from storm-related staging operations, debris-clearance work, and post-storm route exposure. Carriers writing Florida occ-acc may include named-storm-aware exclusions or sub-limits for storm-related disability claims.",
      "Coverage limits for Florida owner-operator occ-acc typically follow industry standards: $500,000 medical / $250,000 accidental death / 70% of average weekly earnings disability. Florida carrier lease agreements generally require these limits as a minimum, with some Florida-specialty carriers requiring higher medical limits to reflect Florida's elevated medical cost environment.",
      "We have not yet extracted a public Florida Office of Insurance Regulation filing for occupational-accident coverage on owner-operators. The rate band on this page will publish once the filing has been extracted and reviewed by a Florida-licensed producer; until then the carrier table reflects the carriers we expect to write the line based on their published license footprints.",
    ],
    sources: [
      {
        label: "Florida Office of Insurance Regulation (FLOIR)",
        url: "https://floir.com/",
      },
      {
        label: "Florida Division of Workers' Compensation",
        url: "https://www.myfloridacfo.com/division/wc",
      },
      {
        label: "OOIDA — independent-contractor classification context",
        url: "https://www.ooida.com/",
      },
      {
        label: "Insurance Information Institute — occupational-accident overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "occupational-accident",
    stateSlug: "illinois",
    headline: "What drives occupational-accident premiums in Illinois",
    paragraphs: [
      "Illinois occupational-accident coverage for owner-operators leased onto motor carriers operates within a relatively stable framework. Illinois requires workers' compensation for employees, but bona fide independent-contractor owner-operators leased on under valid lease structures rely on occ-acc rather than WC. Illinois carrier lease agreements typically require occ-acc as a condition of the lease.",
      "The Illinois occ-acc rate environment reflects two factors. First, medical-cost trends in Cook County are elevated relative to downstate Illinois, which feeds into occ-acc medical-coverage pricing for operators routing the Chicago metro. Second, Illinois injury severity in Cook County GL and primary-liability claims has historically been elevated, and while occ-acc isn't directly affected by the venue dynamic (occ-acc claims are between the operator and the occ-acc carrier, not third-party tort claims), the loss-environment context informs underwriter appetite.",
      "Coverage limits for Illinois owner-operator occ-acc follow industry standards: $500,000 medical / $250,000 accidental death / 70% of average weekly earnings disability. Higher limits are available as options. Illinois operators considering whether to elect higher medical limits should consider their typical routing — operators with substantial Cook County exposure may benefit from elevated medical limits.",
      "We have not yet extracted a public Illinois Department of Insurance filing for occupational-accident coverage on owner-operators. The rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Illinois Department of Insurance (IDOI)",
        url: "https://idoi.illinois.gov/",
      },
      {
        label: "Illinois Workers' Compensation Commission",
        url: "https://iwcc.illinois.gov/",
      },
      {
        label: "OOIDA — independent-contractor classification context",
        url: "https://www.ooida.com/",
      },
      {
        label: "Insurance Information Institute — occupational-accident overview",
        url: "https://www.iii.org/",
      },
    ],
    reviewer: null,
    lastReviewedAt: null,
  },
  {
    productSlug: "occupational-accident",
    stateSlug: "georgia",
    headline: "What drives occupational-accident premiums in Georgia",
    paragraphs: [
      "Georgia occupational-accident coverage for owner-operators leased onto motor carriers operates within a stable regulatory framework. Georgia requires workers' compensation for employers with three or more employees, but bona fide independent-contractor owner-operators are not subject to the WC mandate. Georgia carrier lease agreements typically require occ-acc as a condition of the lease, with limits aligned to industry standards.",
      "The Georgia occ-acc rate environment reflects two factors. First, Atlanta's role as the Southeast freight nexus concentrates owner-operator activity in metropolitan operations with elevated traffic-density exposure on I-75, I-85, I-20, and I-285. Underwriters writing Georgia occ-acc may apply higher classification factors for operators with substantial Atlanta-metro routing relative to operators running primarily rural Georgia or interstate long-haul.",
      "Second, Georgia's 2025 SB 68 / SB 69 tort reform package indirectly affects occ-acc. While occ-acc is not subject to the same tort-reform dynamics as primary liability or GL (occ-acc claims are between the operator and the occ-acc carrier, not third-party tort claims), the broader Georgia loss environment informs carrier appetite. Coverage limits for Georgia owner-operator occ-acc typically follow industry standards: $500,000 medical / $250,000 accidental death / 70% of average weekly earnings disability.",
      "We have not yet extracted a public Georgia Office of Commissioner of Insurance and Safety Fire filing for occupational-accident coverage on owner-operators. The rate band will publish once a filing is reviewed.",
    ],
    sources: [
      {
        label: "Georgia Office of Commissioner of Insurance and Safety Fire",
        url: "https://oci.georgia.gov/",
      },
      {
        label: "Georgia State Board of Workers' Compensation",
        url: "https://sbwc.georgia.gov/",
      },
      {
        label: "OOIDA — independent-contractor classification context",
        url: "https://www.ooida.com/",
      },
      {
        label: "Insurance Information Institute — occupational-accident overview",
        url: "https://www.iii.org/",
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
