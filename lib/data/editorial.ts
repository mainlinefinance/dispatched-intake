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
