import "server-only";
import type { GlossaryTerm } from "./types";

/* Compliance & operating-authority terms beyond the original 6.
   Populated by feat/seo-batch-3 agent G1. */

export const COMPLIANCE_EXTENDED_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "mcs-150",
    term: "MCS-150",
    abbreviation: "MCS-150",
    termCode: "MCS-150",
    category: "operating-authority-compliance",
    shortDefinition:
      "Biennial update form filed with FMCSA to refresh a carrier's operational data and keep DOT/MC authority active.",
    sections: [
      {
        h2: "What it is",
        body:
          "The MCS-150 — formally the \"Motor Carrier Identification Report\" — is the FMCSA form every USDOT-registered carrier files to update operational data. It captures fleet size, mileage, hazmat status, and contact information, and it is the data source FMCSA uses to populate the SAFER public lookup and CSA scoring inputs.\n\nThe filing is required biennially. The schedule is set by the second-to-last digit of the carrier's USDOT number, with the last digit determining the month — every carrier has a fixed update window built off its DOT#. The filing itself is free and is submitted online through FMCSA SAFER or via Login.gov. Carriers can also file ad-hoc updates whenever operational data changes — a new fleet size, a new hazmat designation, a new contact address.\n\nFailure to file by the deadline triggers DOT deactivation, which voids operating authority and stops the carrier from legally hauling freight.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Lenders and factors pull DOT data via FMCSA SAFER as the first step of underwriting. An outdated MCS-150 means a stale DOT record, which lender systems flag as \"not actively operating\" — declining the application before it reaches a human reviewer.\n\nAn MCS-150 lapse triggers DOT deactivation, which voids operating authority and stops factoring instantly — every advance is gated on an active MC#. Insurance carriers also flag stale MCS-150 records during renewal pulls, which can push primary liability premiums up or trigger non-renewal. Track the biennial deadline the same way you track UCR and IRP renewals.",
      },
    ],
    relatedTerms: ["dot-number", "csa-score", "mc-number"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "csa-score",
    term: "CSA Score",
    abbreviation: "CSA",
    termCode: "CSA",
    category: "operating-authority-compliance",
    shortDefinition:
      "FMCSA Compliance, Safety, Accountability program scoring system that rates carrier safety performance using roadside inspection and crash data.",
    sections: [
      {
        h2: "What it is",
        body:
          "CSA — Compliance, Safety, Accountability — is the FMCSA program that scores carrier safety performance using roadside inspection and crash data. The Safety Measurement System (SMS) compiles every inspection and crash event over a 24-month rolling window and translates them into percentile rankings.\n\nCarriers are scored across seven BASICs (Behavior Analysis and Safety Improvement Categories): Unsafe Driving, HOS Compliance, Driver Fitness, Controlled Substances/Alcohol, Vehicle Maintenance, Hazmat, and Crash Indicator. Intervention thresholds run from the 65th to the 80th percentile depending on the BASIC and operation type. Scores above the threshold flag the carrier for FMCSA intervention — warning letters, off-site reviews, on-site investigations, or compliance reviews.\n\nPublic-facing scores are visible through the FMCSA SMS website. Insurance carriers, brokers, and lenders all pull CSA data as part of their own underwriting workflows.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Insurance carriers price primary liability heavily off CSA scores — high BASIC percentiles produce material premium increases or outright non-renewal. High BASICs can also disqualify a carrier from major brokers' load boards.\n\nLenders flag deteriorating CSA trends as elevated default risk. Equipment financing decisions sometimes incorporate CSA percentile checks. The 24-month rolling window means today's bad inspection compounds for two years before it ages off — clean-up takes time, and the financial impact lasts longer than most carriers expect.",
      },
    ],
    relatedTerms: ["dot-number", "mcs-150", "eld", "hos"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "eld",
    term: "ELD",
    abbreviation: "ELD",
    termCode: "ELD",
    category: "operating-authority-compliance",
    shortDefinition:
      "Electronic Logging Device that automatically records driving time, replacing paper logbooks; mandated for most CDL operators since December 2017.",
    sections: [
      {
        h2: "What it is",
        body:
          "An ELD — Electronic Logging Device — is the FMCSA-mandated hardware that automatically records driving time by connecting to the vehicle's engine control module via the diagnostic port. The mandate took effect in December 2017, with full enforcement in December 2019, replacing paper logbooks for HOS tracking. AOBRDs (the predecessor technology) were phased out at the same time.\n\nTo be compliant, the device must appear on the FMCSA registered ELD list. Common providers include Samsara, Motive (formerly KeepTruckin), Omnitracs, Verizon Connect, and Geotab. Certain short-haul exemptions apply — drivers operating within 150 air-miles of their work-reporting location and returning within 14 hours can stay on time-card records — but the default for OTR is ELD-mandated.\n\nELD data must be retained for at least 6 months and produced on request during roadside inspections or audits.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "ELD non-compliance produces roadside out-of-service orders and CSA HOS violations — both directly hit revenue and insurance pricing. Lenders cross-check ELD compliance during fleet-loan underwriting, and some factoring companies bundle ELD subscriptions or partner with providers as part of onboarding.\n\nELD data also auto-populates IFTA mileage-by-jurisdiction reporting, which reduces audit risk on the fuel-tax side. The same data feed that catches HOS violations also defends the carrier in IFTA audits — useful leverage when scoping working capital lines.",
      },
    ],
    relatedTerms: ["hos", "csa-score", "ifta"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "fmcsa",
    term: "FMCSA",
    abbreviation: "FMCSA",
    termCode: "FMCSA",
    category: "operating-authority-compliance",
    shortDefinition:
      "Federal Motor Carrier Safety Administration — DOT agency that regulates commercial motor vehicles, issues operating authority, and enforces safety rules.",
    sections: [
      {
        h2: "What it is",
        body:
          "The FMCSA — Federal Motor Carrier Safety Administration — is the agency under the US Department of Transportation responsible for regulating commercial motor vehicles. It was created in 2000 by the Motor Carrier Safety Improvement Act of 1999 and is headquartered in Washington, DC.\n\nIts primary functions include issuing MC# and DOT# operating authority, regulating CDL standards, medical certification, hours of service, ELD use, CSA scoring, and hazmat transport. It conducts compliance reviews and runs safety enforcement against carriers that exceed BASIC intervention thresholds.\n\nFMCSA also operates the public infrastructure trucking finance depends on: the SAFER (Safety and Fitness Electronic Records) lookup that lenders and insurers use for verification, and the Drug & Alcohol Clearinghouse — mandatory since 2020 — that tracks driver substance-violation history across employers.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Every regulatory threshold a trucker hits — MC# activation, MCS-150 update, ELD mandate, CSA scoring — runs through FMCSA. Lenders verify operating authority via FMCSA SAFER before they will even quote terms. Insurance carriers verify safety records via FMCSA before binding coverage.\n\nFMCSA enforcement actions — out-of-service orders, authority revocation, conditional safety ratings — destroy revenue capacity overnight. That is why they are one of the top underwriting factors lenders care about, not a back-office detail.",
      },
    ],
    relatedTerms: ["dot-number", "mc-number", "mcs-150", "csa-score"],
    relatedProducts: [
      { url: "/methodology", label: "Dispatched methodology" },
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
    ],
  },
  {
    slug: "hos",
    term: "Hours of Service",
    abbreviation: "HOS",
    termCode: "HOS",
    category: "operating-authority-compliance",
    shortDefinition:
      "FMCSA rules limiting daily and weekly driving time for commercial drivers, designed to prevent fatigue-related crashes.",
    sections: [
      {
        h2: "What it is",
        body:
          "Hours of Service (HOS) is the set of FMCSA rules limiting daily and weekly driving time for commercial drivers. The core limits: an 11-hour driving cap within a 14-hour on-duty window, with a mandatory 30-minute break after 8 cumulative driving hours. Drivers must take 10 consecutive hours off-duty between shifts.\n\nWeekly limits run on either the 70-hour rule (8 days) or the 60-hour rule (7 days) depending on whether the carrier operates every day. The 34-hour restart provision lets a driver reset the weekly clock with a continuous off-duty block. Sleeper berth split provisions (8/2 or 7/3) allow drivers to break the 10-hour off-duty period into two qualifying segments.\n\nA short-haul exemption applies to drivers operating within 150 air-miles of their work-reporting location and finishing within 14 hours — those drivers can stay on time-card records instead of full HOS logs.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "HOS violations show up in CSA scoring under the HOS Compliance BASIC and can disqualify a driver from premium loads. ELDs made HOS violations harder to hide and easier for lenders to verify.\n\nChronic HOS issues correlate with insurance pricing increases as BASIC intervention thresholds get breached. Fleet operators must train and monitor compliance — a single driver's pattern affects the carrier's CSA percentile for two years.",
      },
    ],
    relatedTerms: ["eld", "csa-score", "fmcsa"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "ein",
    term: "EIN",
    abbreviation: "EIN",
    termCode: "EIN",
    category: "operating-authority-compliance",
    shortDefinition:
      "Employer Identification Number issued by the IRS to identify a business entity for tax purposes; required for most trucking authority filings.",
    sections: [
      {
        h2: "What it is",
        body:
          "An EIN — Employer Identification Number, also called Federal Tax ID — is the 9-digit identifier issued by the IRS to a business entity for tax purposes. It is formatted as XX-XXXXXXX and is free to obtain. Applications go through IRS.gov online, by fax, by mail, or by phone for international applicants.\n\nAn EIN is required for filing federal taxes as a business, opening a business bank account, hiring employees, applying for an MC#/DOT#, and applying for many state business licenses. Sole proprietors with no employees can technically use a Social Security Number in place of an EIN, but most lenders, factors, and broker counterparties require an EIN regardless of structure.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Most trucking lenders and factors require an EIN before underwriting — it separates business credit from personal credit and is the prerequisite for building Paydex (D&B) score over time. A clean Paydex unlocks better lending terms and trade-credit lines.\n\nMC# applications increasingly expect an EIN even for sole-prop carriers. Opening a business bank account requires an EIN, and lender underwriting wants to see 90+ days of business bank statements — not commingled personal accounts. Get the EIN first; everything else is downstream of it.",
      },
    ],
    relatedTerms: ["mc-number", "dot-number", "owner-operator"],
    relatedProducts: [
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
    ],
  },
  {
    slug: "bol",
    term: "Bill of Lading",
    abbreviation: "BOL",
    termCode: "BOL",
    category: "operating-authority-compliance",
    shortDefinition:
      "Legal document between carrier and shipper that serves as receipt of freight, contract of carriage, and document of title.",
    sections: [
      {
        h2: "What it is",
        body:
          "A Bill of Lading (BOL) is the legal document signed at pickup that governs the movement of freight. It serves three purposes simultaneously: receipt of goods, contract of carriage, and document of title. It is required for nearly every commercial freight movement in the United States.\n\nBOLs come in two main forms: \"straight\" (non-negotiable, addressed to a specific consignee) and \"order\" (negotiable, transferable between parties). The document contains shipper, consignee, carrier, item description, weight, quantity, hazmat information if applicable, and freight charges. Electronic BOL (eBOL) systems are increasingly common, particularly with larger shippers and TMS-integrated carriers.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Factoring companies require a clean BOL signed by the consignee plus a POD before advancing funds — the BOL is the proof that the freight was actually delivered. Missing or incorrect BOLs are the number-one reason factoring advances get held up.\n\nLenders and insurers reference BOLs in claims and disputes. BOLs are also the primary evidence in cargo damage claims under motor truck cargo coverage — the description and condition notes on the BOL determine whether a claim pays out cleanly or stalls in adjuster review.",
      },
    ],
    relatedTerms: ["pod", "recourse-factoring", "non-recourse-factoring"],
    relatedProducts: [
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "pod",
    term: "Proof of Delivery",
    abbreviation: "POD",
    termCode: "POD",
    category: "operating-authority-compliance",
    shortDefinition:
      "Signed document confirming the consignee received the freight in acceptable condition; required to factor most trucking invoices.",
    sections: [
      {
        h2: "What it is",
        body:
          "A POD — Proof of Delivery — is the signed document confirming the consignee received the freight in acceptable condition. It is usually a signed BOL or a separate signed delivery receipt, and it can be paper or electronic depending on the carrier's TMS and driver-app stack.\n\nThe POD records delivery date and time, consignee signature, and any exceptions noted at delivery — short, damaged, or refused freight. Modern POD systems include photo capture and GPS-stamped delivery confirmation, both of which are increasingly expected by larger brokers and shippers. Freight broker contracts almost always require a POD before payment is released, regardless of the underlying BOL.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Factoring advance hinges on POD: no POD, no advance, period. A clean POD with no exceptions advances at the agreed rate. PODs with exceptions can result in deductions or chargebacks against the factoring advance.\n\nBroker payment terms — typically Net 30 to Net 60 — start from POD date, not pickup date. Lost or missing PODs are the most common factoring delay reason and are usually solvable with re-sigs from consignees if the carrier moves within a few days of delivery. Wait too long and the trail goes cold.",
      },
    ],
    relatedTerms: ["bol", "recourse-factoring", "non-recourse-factoring"],
    relatedProducts: [
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
      { url: "/invoice-factoring-for-truckers/no-credit-check", label: "No credit check factoring" },
    ],
  },
  {
    slug: "ooida",
    term: "OOIDA",
    abbreviation: "OOIDA",
    termCode: "OOIDA",
    category: "operating-authority-compliance",
    shortDefinition:
      "Owner-Operator Independent Drivers Association — trade group representing independent owner-operators on regulatory and policy issues.",
    sections: [
      {
        h2: "What it is",
        body:
          "OOIDA — Owner-Operator Independent Drivers Association — is the nonprofit trade group representing independent owner-operators. Founded in 1973, headquartered in Grain Valley, Missouri, with roughly 150,000 members, it advocates for owner-operator interests on FMCSA rulemaking, broker transparency, lease-purchase reform, parking, fuel taxes, and ELD waivers.\n\nOOIDA publishes Land Line magazine and the Land Line Now radio show — two of the most-read sources of regulatory and operational news for small-fleet operators. Member benefits include discounted insurance products (truck and health), business services, legal defense, and tax services priced for small carriers.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For owner-operators, OOIDA membership ($45/year) gives access to industry-rate insurance and group purchasing programs that can offset the cost several times over. OOIDA is also one of the most active legal advocates against predatory lease-purchase carriers — OOIDA-aligned attorneys are who owner-operators call when factoring contracts or lease-on agreements go wrong.\n\nFor new authority operators, OOIDA's start-up resources are concrete and free to access — a meaningful contrast to the paid \"authority package\" services that mark up government filings.",
      },
    ],
    relatedTerms: ["owner-operator", "lease-purchase", "ata"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "ata",
    term: "ATA",
    abbreviation: "ATA",
    termCode: "ATA",
    category: "operating-authority-compliance",
    shortDefinition:
      "American Trucking Associations — national trade association representing primarily larger fleet operators on regulatory, legislative, and economic policy.",
    sections: [
      {
        h2: "What it is",
        body:
          "The ATA — American Trucking Associations — is the national trade association for the trucking industry. Founded in 1933 and headquartered in Arlington, Virginia, it is a federation of 50 state trucking associations and 25 national conferences and councils. It represents the entire industry but tends to align with larger fleet interests in its policy positions.\n\nATA publishes the Truck Driver Salary report and the ATA Tonnage Index — the most-cited industry barometer for freight volume — along with regular economic outlooks. Its research arm, the American Transportation Research Institute (ATRI), publishes the annual \"Top Industry Issues\" report and the Operational Costs of Trucking report. Key advocacy areas include hours of service, autonomous vehicle policy, infrastructure, and taxation.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "ATA's economic data — particularly ATRI's Operational Costs of Trucking report — is what lenders and analysts cite to set baseline cost-per-mile assumptions in underwriting models. Knowing where ATRI puts the average is useful when a carrier is presenting their numbers.\n\nUnderstanding the difference between ATA (fleet-aligned) and OOIDA (owner-op-aligned) helps a small carrier read industry news with appropriate context. ATA's policy positions often shape lender expectations on regulatory direction.",
      },
    ],
    relatedTerms: ["ooida", "owner-operator"],
    relatedProducts: [
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
];
