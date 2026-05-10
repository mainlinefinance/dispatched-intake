import "server-only";
import type { GlossaryTerm } from "./types";

/* Driver licensing + DOT compliance terms (CDL classes, endorsements,
   ELDT, SCAC, HVUT, MEDC card). Populated by feat/seo-batch-4 agent G5. */

export const COMPLIANCE_LICENSING_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "cdl-class-a",
    term: "CDL Class A",
    abbreviation: "CDL-A",
    termCode: "CDL-A",
    category: "operating-authority-compliance",
    shortDefinition:
      "Commercial Driver's License Class A — required for combination vehicles over 26,001 lbs GCWR with a towed unit over 10,000 lbs; the standard CDL for OTR trucking.",
    sections: [
      {
        h2: "What it is",
        body:
          "A CDL Class A — Commercial Driver's License Class A — authorizes a driver to operate any combination of vehicles with a Gross Combination Weight Rating (GCWR) of 26,001 lbs or more, provided the towed unit is over 10,000 lbs. It is the standard credential for over-the-road tractor-trailer operation.\n\nThe minimum age is 21 for interstate driving; most states allow 18 for intrastate-only operation. Each state DMV administers issuance, but federal standards govern the testing. Applicants must pass a knowledge test, a skills test covering pre-trip inspection, basic vehicle control, and on-road driving, plus a DOT medical examination. Federal Entry-Level Driver Training (ELDT) has been mandatory for all new CDL-A applicants since February 7, 2022.\n\nCommon endorsements that attach to a CDL-A include hazmat (H), tanker (N), doubles/triples (T), passenger (P), and school bus (S). Restrictions can also apply — manual-transmission restriction (E) if the skills test was taken in an automatic, air-brake restriction (L) if not tested on air brakes, and others.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "CDL Class A is the entry credential for nearly every OTR trucking operation — without it, the operator can't legally drive a Class 8 tractor pulling a trailer. Insurance underwriting heavily weights years of CDL-A experience: sub-2-year experience pushes primary liability rates up materially, sometimes 30–50%.\n\nLenders sometimes verify CDL status as part of underwriting for owner-operator financing, particularly for first-time operators. A CDL suspension — DUI, hazmat-endorsement issues, accumulated violations — instantly stops revenue and triggers factoring and working-capital exposure on any outstanding advances.",
      },
    ],
    relatedTerms: ["eldt", "hazmat-endorsement", "medc-card", "dot-number"],
    relatedProducts: [
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "hazmat-endorsement",
    term: "Hazmat Endorsement",
    abbreviation: "H endorsement",
    termCode: "H",
    category: "operating-authority-compliance",
    shortDefinition:
      "Additional CDL endorsement authorizing the driver to haul hazardous materials in placardable quantities; requires TSA background check.",
    sections: [
      {
        h2: "What it is",
        body:
          "The hazmat endorsement is the \"H\" endorsement code added to a CDL, authorizing the driver to transport hazardous materials in placardable quantities under DOT 49 CFR Parts 100–185. It is required any time a load triggers placarding requirements — flammable liquids, corrosives, explosives, radioactive materials, and similar regulated commodities.\n\nObtaining the endorsement requires a TSA (Transportation Security Administration) Threat Assessment, including fingerprinting and a background check via the TSA TSC enrollment process. Cost typically runs $80–$130 per state plus state DMV fees. The applicant must also pass a hazmat knowledge test — there is no separate driving test for the endorsement alone. The endorsement is valid for 5 years and is renewed concurrently with the underlying CDL.\n\nIneligibility triggers include certain felony convictions (terrorism, espionage, transportation security violations, certain drug offenses), specific immigration statuses, and mental incapacity findings. Applicants in these categories cannot hold the endorsement regardless of CDL status.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Hazmat-endorsed drivers earn 20–50% higher rate per mile than non-hazmat drivers on equivalent loads. For owner-operators weighing the math on extra training plus TSA cost versus premium loads, the payback is usually favorable within 2–3 months of running hazmat freight.\n\nInsurance pricing reflects the endorsement — hazmat-rated operators pay materially higher primary liability premiums, but the per-load revenue more than compensates. Lenders evaluating hazmat owner-operators sometimes account for the higher revenue capacity in underwriting decisions, particularly on equipment-financing deals where the truck is configured for hazmat freight.",
      },
    ],
    relatedTerms: ["cdl-class-a", "hazmat", "dot-class"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "eldt",
    term: "ELDT",
    abbreviation: "ELDT",
    termCode: "ELDT",
    category: "operating-authority-compliance",
    shortDefinition:
      "Entry-Level Driver Training — federal training standard required since February 2022 for new CDL applicants, upgrades, or hazmat endorsements.",
    sections: [
      {
        h2: "What it is",
        body:
          "ELDT — Entry-Level Driver Training — is the federal training standard administered by FMCSA for new commercial drivers. It has been mandatory since February 7, 2022 for new CDL Class A or B applicants, drivers upgrading from CDL B to CDL A, and drivers adding the hazmat, passenger, or school bus endorsement.\n\nA trainee must complete both theory and behind-the-wheel instruction at a school listed in the FMCSA Training Provider Registry. The school self-certifies completion to FMCSA, and the certificate stays in the registry and is verified by state DMVs at CDL issuance. There is no minimum-hours requirement at the federal level — though some states impose their own minimums. Typical programs run 160–200 hours total.\n\nCost in 2026 ranges from $4,000 to $10,000 depending on the school, location, and whether room and board are bundled. Some carriers run their own in-house ELDT programs in exchange for a commitment period from the trainee.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "ELDT compliance is a real barrier to entry for new owner-operators — the $4K–$10K upfront training cost must be financed before the operator can earn a dollar. CDL school financing, separate from truck financing, is a growing lending category as a result.\n\nThe ELDT certificate stays in the FMCSA Training Provider Registry and is verified by state DMVs at CDL issuance. First-time owner-operator financing applications typically require evidence of CDL plus ELDT completion before underwriting can begin.",
      },
    ],
    relatedTerms: ["cdl-class-a", "hazmat-endorsement", "medc-card"],
    relatedProducts: [
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
    ],
  },
  {
    slug: "scac",
    term: "SCAC",
    abbreviation: "SCAC",
    termCode: "SCAC",
    category: "operating-authority-compliance",
    shortDefinition:
      "Standard Carrier Alpha Code — 2-4 letter unique identifier assigned by NMFTA to motor carriers, brokers, and freight forwarders for EDI and intermodal use.",
    sections: [
      {
        h2: "What it is",
        body:
          "A SCAC — Standard Carrier Alpha Code — is a 2-to-4-character alphabetic identifier assigned by the National Motor Freight Traffic Association (NMFTA) to motor carriers, brokers, and freight forwarders. Originally created for railroad billing identification, the SCAC is now ubiquitous across trucking EDI, intermodal bookings, port operations, and government contract systems.\n\nSCACs are required for: customs filings under the Automated Commercial Environment, intermodal rail bookings, military and government freight, automotive industry EDI, and contract carrier work with major retailers like Walmart. The annual fee in 2026 is $103, and registration runs through nmfta.org. A single carrier can hold multiple SCACs for different operating divisions, which large fleets commonly use to segment freight by service line.\n\nThe code itself follows convention — most carrier-issued SCACs end in a non-reserved letter, with reserved endings (\"U\" for intermodal containers, \"X\" for privately owned rail cars, \"Z\" for truck chassis) used for equipment identification rather than carriers.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For owner-operators staying domestic OTR with broker-only freight, a SCAC may not be required. For any carrier running intermodal, customs, government, or major-retailer freight, the SCAC is mandatory — missing it disqualifies the carrier from those loads entirely.\n\nSCACs are often required during contract carrier onboarding with Walmart, Amazon, the big-three automotive shippers, and similar accounts. Lenders rarely care about SCAC directly, but factoring companies sometimes ask for it during broker setup for EDI-billed contracts.",
      },
    ],
    relatedTerms: ["mc-number", "dot-number", "intermodal"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
    ],
  },
  {
    slug: "hvut",
    term: "HVUT (Form 2290)",
    abbreviation: "HVUT",
    termCode: "HVUT",
    category: "operating-authority-compliance",
    shortDefinition:
      "Heavy Vehicle Use Tax — annual federal tax on commercial vehicles over 55,000 lbs GVWR, filed via IRS Form 2290; required for IRP registration.",
    sections: [
      {
        h2: "What it is",
        body:
          "HVUT — Heavy Vehicle Use Tax — is the annual federal tax administered by the IRS on commercial vehicles with a taxable gross weight of 55,000 lbs or more. It is filed on IRS Form 2290 by August 31 each year, covering the tax period running July 1 through June 30.\n\nThe tax structure is tiered: $100 for vehicles at exactly 55,000 lbs, plus $22 per additional 1,000 lbs, capped at a maximum of $550 for vehicles at 75,000 lbs or above. Proof of HVUT payment — the IRS-stamped Schedule 1 — is required to register a vehicle under IRP with the state. Without it, the state will not issue or renew apportioned plates.\n\nE-filing is mandatory for fleets of 25 or more vehicles and optional but recommended for smaller operations because the stamped Schedule 1 comes back faster. Failure to file or pay results in penalties plus an IRP registration block, which compounds quickly when renewal season hits.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "HVUT non-payment blocks IRP registration, which blocks legal interstate operation — a direct revenue-stopper. The IRS-stamped Schedule 1 is one of the documents lenders sometimes ask for as proof of compliance and operational status.\n\nFor owner-operators with multiple trucks, the HVUT timing — a single annual lump sum — is a meaningful budget line. Some carriers pre-fund this in a working capital line so the August 31 deadline doesn't hit operating cash flow at the wrong moment.",
      },
    ],
    relatedTerms: ["irp", "ifta", "dot-number", "mc-number"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "medc-card",
    term: "Medical Examiner's Certificate",
    abbreviation: "MEDC",
    termCode: "MEDC",
    category: "operating-authority-compliance",
    shortDefinition:
      "DOT-required medical certification verifying a commercial driver's physical fitness to operate; issued by a National Registry medical examiner.",
    sections: [
      {
        h2: "What it is",
        body:
          "The Medical Examiner's Certificate — MEC, commonly called the \"DOT med card\" or \"MEDC card\" — is the DOT-required certification verifying a commercial driver's physical fitness to operate. It is required for all CDL holders and many non-CDL commercial operators above the GVWR threshold.\n\nThe certificate can only be issued by an examiner listed in the FMCSA National Registry of Certified Medical Examiners (NRCME). Typical validity is 24 months for healthy drivers, but the examiner can issue a shorter certificate — 3, 6, or 12 months — for drivers with managed conditions like diabetes or hypertension that require ongoing monitoring.\n\nThe exam itself covers vision, hearing, blood pressure, urinalysis, range of motion, and cardiovascular and pulmonary health. Cost typically runs $80–$150 at urgent care or a trucker-specialty clinic. After the exam, the driver must self-submit the card to the state DMV — though in some states the examiner submits automatically through an electronic interface with the state licensing system.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "An expired MEDC card triggers an immediate CDL downgrade in most states, meaning the driver legally can't operate commercial vehicles until the card is renewed and the state processes it. This stops revenue overnight. Renewal-cycle awareness is critical — calendar a 60-day advance notice.\n\nLenders rarely verify MEDC directly, but factoring companies sometimes flag operators with expired CDL or MEDC during compliance audits. Conditions requiring shorter MEDC cycles (under 12 months) signal underlying health risk that some lenders factor into longer-term-loan risk assessments.",
      },
    ],
    relatedTerms: ["cdl-class-a", "eldt", "hos"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
];
