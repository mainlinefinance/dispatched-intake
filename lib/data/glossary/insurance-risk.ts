import "server-only";
import type { GlossaryTerm } from "./types";

/* Commercial trucking insurance + risk-management terms.
   Populated by feat/seo-batch-3 agent G4. */

export const INSURANCE_RISK_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "primary-liability",
    term: "Primary Liability",
    category: "insurance-and-risk",
    shortDefinition:
      "Commercial auto insurance covering bodily injury and property damage to others when at fault; FMCSA mandates $750K–$5M minimum based on cargo.",
    sections: [
      {
        h2: "What it is",
        body:
          "Primary liability is the first-line commercial auto coverage protecting third parties when the trucker is at fault in an accident. It pays for bodily injury (BI) and property damage (PD) to others — not to the trucker, not to the trucker's truck, and not to the cargo. It is the single coverage FMCSA explicitly mandates by statute.\n\nFMCSA sets statutory minimums under 49 CFR Part 387: $750,000 for general freight, $1 million for hazmat under 119,000 pounds, and $5 million for hazmat over 119,000 pounds and certain other classes. Carriers must maintain an MCS-90 endorsement evidencing coverage at or above these minimums; the endorsement is filed with FMCSA and stays current with policy renewal. Most brokers and shippers require higher contractual limits — $1M is the practical floor for general freight regardless of statutory class.\n\nPrimary liability does not cover the trucker's own truck (that's physical damage), the trucker's own injuries (occupational accident or workers comp), or the cargo (motor truck cargo). Typical $1M premium for an owner-operator runs $8,000–$18,000 per year depending on FICO, MVR, CSA scores, age, and operating-radius location.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Primary liability is the largest single insurance line item for most trucking operators — commonly 4–8% of revenue. Pricing is driven by CSA scores, MVR, claims history, and cargo class; the same truck and driver can see a 2x rate spread depending on how those factors land.\n\nLenders require evidence of active primary liability before funding equipment loans. Gaps trigger MC# deactivation and immediate factoring suspension. Markets can harden 20–40% in a single renewal. A clean MVR and improving CSA scores are the biggest controllable levers on premium, and the savings compound at every renewal.",
      },
    ],
    relatedTerms: ["motor-truck-cargo", "physical-damage", "general-liability", "dot-class"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "motor-truck-cargo",
    term: "Motor Truck Cargo",
    abbreviation: "MTC",
    termCode: "MTC",
    category: "insurance-and-risk",
    shortDefinition:
      "Insurance coverage protecting the freight in transit; required by most brokers and shippers, typically $100K minimum for general freight.",
    sections: [
      {
        h2: "What it is",
        body:
          "Motor truck cargo (MTC) is coverage on the freight while it is in the carrier's possession. It pays for damage to or loss of cargo during transit, loading, or unloading. Standard limits: $100,000 for general freight, $250,000+ for higher-value commodities, and $1M+ for high-value cargo (electronics, pharmaceuticals, certain metals). Most broker contracts require $100,000 minimum coverage as a condition of dispatch, and shipper contracts can demand higher limits based on the specific load. The certificate holder on a load-specific COI is usually the broker, not the shipper.\n\nMajor exclusions matter as much as the limit. Standard MTC excludes refrigeration breakdown for produce and perishable loads (requires a separate reefer breakdown endorsement), employee theft, contraband, water damage to non-waterproof loads, and intentional acts. Some MTC policies include limited terrorism and hijacking coverage; others require named endorsements. Read the exclusion list before binding — the gap between what the policy says it covers and what the dispatch actually carries is where uninsured losses live, and the carrier eats those losses.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "MTC is non-negotiable for booking most loads — without proof of coverage, brokers won't dispatch. Lenders sometimes require MTC disclosure as part of underwriting, since cargo-related liability is a tail risk for default.\n\nMTC claims affect future rates similarly to primary liability — frequent claims push rates up at renewal and can disqualify the carrier from certain markets. For reefer operations, the gap between MTC and reefer breakdown is critical to understand; the two have different mechanisms and different coverage triggers, and operators routinely discover the gap only after a denied claim.",
      },
    ],
    relatedTerms: ["primary-liability", "reefer-breakdown", "physical-damage"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "physical-damage",
    term: "Physical Damage",
    category: "insurance-and-risk",
    shortDefinition:
      "Coverage on the carrier's own truck and trailer against collision, theft, fire, vandalism, and other damage; typically required by equipment lenders.",
    sections: [
      {
        h2: "What it is",
        body:
          "Physical damage is first-party coverage on the carrier's own equipment — tractor, trailer, and attached components. It splits into two main parts. Comprehensive covers theft, fire, vandalism, weather, and collision with an animal. Collision covers vehicle-on-vehicle and single-vehicle accidents. Together, the two parts replace or repair the truck after most damage events, subject to deductible and policy limits.\n\nDeductibles range from $1,000 to $10,000; a higher deductible lowers the premium but increases out-of-pocket exposure on each claim. Coverage value typically matches actual cash value (ACV, with depreciation applied) or stated value (the amount set at policy inception). Gap insurance can cover the difference between ACV and the remaining loan balance — important for newer trucks where depreciation outpaces principal paydown in the first 18–24 months. Lenders almost always require physical damage as a condition of equipment financing, and they list themselves as loss payee on the dec page so any claim check is issued jointly to lender and carrier.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Physical damage is mandatory while the truck is financed — lapsed coverage triggers lender-placed insurance (significantly more expensive) and can create technical default. For paid-off trucks, owners can drop coverage but assume the full risk of total loss, which for a $150,000+ Class 8 tractor is rarely a sensible bet.\n\nDeductible choice has real cash-flow implications: a $5,000 vs. $1,000 deductible saves premium but means a fender-bender stresses working capital. Lenders verify coverage at policy renewal and after claims, and a missed renewal can trigger same-day force-placed coverage at 2–3x market rates that gets added directly to the loan balance.",
      },
    ],
    relatedTerms: ["motor-truck-cargo", "primary-liability", "equipment-loan"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/equipment-financing", label: "Equipment financing" },
    ],
  },
  {
    slug: "general-liability",
    term: "General Liability",
    abbreviation: "GL",
    termCode: "GL",
    category: "insurance-and-risk",
    shortDefinition:
      "Commercial general liability covering bodily injury and property damage from non-trucking-related business activities (premises, completed operations).",
    sections: [
      {
        h2: "What it is",
        body:
          "General liability (GL) is commercial coverage protecting against third-party bodily injury and property damage claims arising from business operations other than the truck itself. Examples: someone slips and falls at the carrier's office or yard, the carrier's mechanic damages a customer's vehicle in the shop, or a completed-operations claim surfaces after a job. It pays for the same kinds of harm that primary liability pays for, but tied to non-trucking activities. Personal injury (libel, slander, false advertising) is typically included as a separate sublimit.\n\nTypical limits run $1 million per occurrence and $2 million aggregate. GL is not legally required the way primary liability is, but it is often required by certain shippers, terminals, or commercial leases. For small fleets, GL is commonly bundled with commercial property in a Business Owners Policy (BOP) — cheaper than buying both standalone. The line between GL and primary liability is the truck: anything involving the tractor or trailer in motion is primary, anything else (premises, mechanics, off-truck operations) is GL.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "GL becomes important once a carrier scales beyond the truck itself — owns or leases a yard, has employees, performs in-house maintenance, or contracts with third parties. For single-truck owner-operators, GL is often optional but becomes necessary at the first non-trucking touchpoint with the public, and ignoring it leaves a real uninsured exposure on any premises-related claim.\n\nBrokers and shippers occasionally require GL as a contract condition for premium loads. Lenders evaluating fleet-scale operators expect GL on the insurance schedule, and equipment financing on shop or yard property may require GL listing the lender as additional insured.",
      },
    ],
    relatedTerms: ["primary-liability", "occupational-accident", "non-trucking-liability"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "non-trucking-liability",
    term: "Non-Trucking Liability",
    abbreviation: "NTL",
    termCode: "NTL",
    category: "insurance-and-risk",
    shortDefinition:
      "Bobtail coverage protecting an owner-operator leased on with a carrier when driving the truck for personal/non-business use.",
    sections: [
      {
        h2: "What it is",
        body:
          "Non-trucking liability (NTL) — commonly called \"bobtail\" insurance — is coverage specifically for owner-operators leased on with a motor carrier under a permanent lease. It covers the truck when not under dispatch: personal use, between loads, or traveling to and from home. The name \"bobtail\" originally referred to running the tractor without a trailer, but NTL is the underwriting label.\n\nThe motor carrier's primary liability covers the truck only when it is under dispatch — meaning a load is assigned and the run is active. Without NTL, an at-fault accident on a non-dispatch trip could be entirely uninsured, leaving the owner-operator personally liable for BI and PD damages. Cost is typically $300–$700 per year for owner-operators, and most carriers require NTL as a contractual condition of leasing on. The coverage is narrow but addresses a real gap that catches first-time lease-on operators off-guard. The distinction between \"under dispatch\" and \"not under dispatch\" is contractual and audited by the carrier after any claim.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "NTL is one of the most misunderstood coverages — many lease-on owner-operators assume the carrier's primary covers them at all times. It does not. The gap between dispatch and non-dispatch periods creates personal liability exposure that an at-fault accident can convert into a life-altering claim, especially because the truck is the operator's largest asset and personal liability follows them home.\n\nLenders evaluating lease-on owner-operators sometimes verify NTL is in place as a sign of operational discipline. For independent owner-operators with their own MC#, NTL is unnecessary — primary liability covers all use regardless of dispatch status.",
      },
    ],
    relatedTerms: ["primary-liability", "general-liability", "owner-operator", "lease-purchase"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "occupational-accident",
    term: "Occupational Accident",
    category: "insurance-and-risk",
    shortDefinition:
      "Coverage replacing workers compensation for owner-operators (1099 contractors) covering injury and disability while working.",
    sections: [
      {
        h2: "What it is",
        body:
          "Occupational accident insurance provides medical, disability, and accidental-death benefits for self-employed owner-operators. It functions as a workers-comp substitute for 1099 contractors who don't qualify for true workers comp under most state statutes. Benefits are capped, not statutory, which is the trade-off for the lower premium. The coverage triggers when the injury happens during the course of business — usually defined as while under dispatch, loading, or unloading.\n\nTypical benefits: $5,000–$25,000 medical, $250–$700 per week disability for 12–104 weeks, and $50,000–$250,000 accidental death. Cost runs $1,500–$3,000 per year for typical owner-op coverage. Occ-acc is not legally required like workers comp, but most major motor carriers require it as a condition of leasing on owner-operators. The primary alternative is true workers comp — much more expensive but with broader coverage and statutory floor benefits. OOIDA and similar member organizations offer occ-acc plans at member rates that are often the best deal in the market for independents, and many carriers offer it as a settlement-deduction line item.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For owner-operators, occupational accident is the difference between an injury that ends the business and one that's covered while you heal. Benefits are limited compared to true workers comp, but premium is dramatically lower — and an owner-op operating without it is one disabling injury from a forced sale of equipment at distressed prices.\n\nLenders evaluating owner-op stability sometimes look for occ-acc coverage as a sign of operational maturity. Major carriers (Schneider, J.B. Hunt, Werner) require it as a condition of leasing on, and the cost is small relative to the income-replacement protection it provides.",
      },
    ],
    relatedTerms: ["general-liability", "primary-liability", "owner-operator"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "reefer-breakdown",
    term: "Reefer Breakdown",
    category: "insurance-and-risk",
    shortDefinition:
      "Insurance endorsement covering cargo loss from refrigeration unit failure; standard motor truck cargo policies exclude this.",
    sections: [
      {
        h2: "What it is",
        body:
          "Reefer breakdown is a cargo insurance endorsement covering loss from refrigeration unit failure — mechanical breakdown of the reefer unit causing temperature deviation that spoils the load. It is separate from motor truck cargo (MTC), which covers most other cargo loss types but specifically excludes refrigeration failure. The endorsement is bought on top of an existing MTC policy, not as a standalone product, and many carriers underwrite it tightly because temperature claims are frequent and large.\n\nTypical limits run $50,000–$250,000 with annual cost of $500–$2,500 depending on coverage limit and reefer age. Common requirements include pre-trip inspection records, continuous temperature monitoring (cold chain), and maintenance logs proving the reefer was serviced on schedule. Major exclusions: temperature deviation due to driver error (closing reefer doors improperly, not pre-cooling the trailer), inadequate pre-trip inspection, or expired thermometer calibration. The endorsement defends against mechanical failure — not operator failure — so the claim file is built on documentation showing the breakdown was mechanical.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For reefer operators, reefer breakdown is non-negotiable. A single load of spoiled produce can be $50,000+, and without coverage that's an uninsured loss that can wipe out months of margin. The carriers that write it tightly enforce documentation requirements at claim time, so cold-chain compliance has to be operationalized in the cab, not just on paper.\n\nLenders evaluating reefer operators expect this endorsement disclosed on the insurance schedule. FSMA (Food Safety Modernization Act) compliance overlaps with reefer breakdown requirements — cold-chain documentation matters for both, and a single denied claim can scar both the loss runs and the FSMA audit trail.",
      },
    ],
    relatedTerms: ["motor-truck-cargo", "physical-damage"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "premium-financing",
    term: "Premium Financing",
    category: "insurance-and-risk",
    shortDefinition:
      "Loan structured to spread an annual insurance premium into monthly payments; widely used in trucking where premiums often exceed 10% of revenue.",
    sections: [
      {
        h2: "What it is",
        body:
          "Premium financing is a loan from a finance company that pays the insurance premium upfront, with the carrier repaying monthly over 9–12 months. The premium amount plus interest is the total repayment, typically 8–15% APR. Collateral is the insurance policy itself — if the carrier defaults, the finance company cancels the policy and recovers the unearned premium directly from the carrier. That recovery mechanism is why approval is relatively easy compared to other small-business credit, and why credit scores matter less here than on most loans.\n\nIt is widely used for commercial trucking insurance because premiums often run $15,000–$60,000+ annually — too large to pay in one check for most owner-operators. The alternative is to pay 100% of the premium upfront (a cash-flow burden) or use a carrier-direct installment plan (often more expensive than premium financing). Major premium-finance providers serving trucking include AFCO, IPFS, and FirstInsurance Funding. Rates vary materially across providers — comparing is worth the effort, and producers often quote a single financing partner without disclosing alternatives.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Premium financing turns a once-a-year cash bomb into a manageable monthly line item. For an owner-op paying $18,000 annually for primary liability, that's $18K out of pocket vs. roughly $1,650 per month financed — the difference between binding and walking away from a renewal.\n\nDefault triggers policy cancellation, which triggers MC# inactivation and stops factoring immediately. Lenders count premium financing as debt service when calculating capacity. Comparing APRs at every renewal is the simplest way to save real money — quotes vary by 3–5 points for the same risk profile.",
      },
    ],
    relatedTerms: ["primary-liability", "working-capital", "term-loan"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "deductible",
    term: "Deductible",
    category: "insurance-and-risk",
    shortDefinition:
      "The portion of a covered claim the insured pays before insurance pays; higher deductibles lower the premium but increase out-of-pocket exposure.",
    sections: [
      {
        h2: "What it is",
        body:
          "A deductible is the amount the insured must pay out of pocket before insurance kicks in on a covered claim. It is applied per claim (most common in trucking) or per policy period (rare). Standard ranges by coverage: physical damage $1,000–$10,000, motor truck cargo $1,000–$5,000, primary liability typically zero (BI/PD pays from dollar one). The deductible is subtracted from the claim payment, not paid separately to the insurer, and is usually netted against the body shop or replacement-equipment invoice.\n\nHigher deductible equals lower premium but more out-of-pocket exposure on each claim. Self-insured retention (SIR) is a related concept for larger fleets — an SIR functions as a deductible on liability claims and is common above 20-truck operations. Aggregate deductible exposure across multiple coverages can create surprising cash burdens after a single accident: one collision can trigger physical damage, MTC, and possibly GL deductibles simultaneously, totaling $10,000–$20,000 cash out before insurance pays a dollar. That stack is the number that matters for cash planning.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Deductible choice is a real cash-flow trade-off. Saving $400 on annual premium with a higher deductible means losing $4,000 out of pocket on a fender-bender — the math only works if you can absorb that worst case without disrupting the operation.\n\nFor operators with thin working capital, low deductibles are often the right call despite the premium increase. Total deductible exposure should be matched against working capital — if you can't cover the worst-case sum, deductibles are too high. The right deductible protects working capital, not the one that minimizes premium.",
      },
    ],
    relatedTerms: ["physical-damage", "motor-truck-cargo", "working-capital"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "am-best",
    term: "AM Best",
    abbreviation: "AM Best",
    termCode: "AM Best",
    category: "insurance-and-risk",
    shortDefinition:
      "Independent rating agency that grades insurance carriers' financial strength; ratings affect which carriers are acceptable to brokers and lenders.",
    sections: [
      {
        h2: "What it is",
        body:
          "AM Best is the oldest insurance-industry rating agency, founded in 1899 and headquartered in Oldwick, NJ. It rates insurance carrier financial strength on a scale: A++/A+ (Superior), A/A- (Excellent), B++/B+ (Good), B/B-, C++/C+, C/C-, D, and E (Poor / Under regulatory supervision). It also publishes a separate issuer credit rating (ICR). The two ratings can move together or apart; for trucking insurance buying decisions, the financial strength rating is the one most contracts cite. S&P, Moody's, and Fitch also rate insurance carriers but AM Best is the dominant reference in trucking, and most contract templates name it explicitly.\n\nRatings are published at ambest.com — the basic search is free. The methodology evaluates underwriting performance, capital adequacy, operating performance, and business profile. Brokers and shippers often require carrier insurance from A-rated or better carriers as a contract condition. Lenders may require similar minimums on equipment-loan insurance. The rating reflects the carrier's ability to pay claims — a structural concern when policies cover six- and seven-figure liability.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "AM Best ratings are not optional shopping criteria — they're contractual minimums on most freight contracts. Insuring with a non-A-rated carrier saves premium short-term but creates contract-compliance issues that disqualify the carrier from major brokers and from the better lanes those brokers control.\n\nMid-tier surplus-lines carriers (NR or B-rated) offer cheaper insurance but carry counterparty risk. Verify the current AM Best rating and trend before binding; a recent downgrade or watch listing is often the leading indicator of a forced re-shop, and shopping under duress costs more than shopping ahead.",
      },
    ],
    relatedTerms: ["primary-liability", "motor-truck-cargo", "dot-class"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "dot-class",
    term: "DOT Class",
    category: "insurance-and-risk",
    shortDefinition:
      "Federal vehicle classification (Class 1–8) based on gross vehicle weight rating; affects insurance pricing, licensing, and lender treatment.",
    sections: [
      {
        h2: "What it is",
        body:
          "DOT Class is the US federal vehicle classification system based on gross vehicle weight rating (GVWR). Class 1–2 covers vehicles under 10,000 lbs (light-duty pickups and vans). Class 3–6 covers 10,001–26,000 lbs (medium-duty straight trucks and hot-shot rigs). Class 7–8 covers 26,001+ lbs (heavy-duty straight trucks and tractors). The class is fixed by the manufacturer's GVWR plate on the door jamb, not by what the truck actually weighs on a given day, and it persists through resale unless the truck is re-rated.\n\nA CDL is required for Class 7–8 and certain Class 6 configurations. Insurance pricing tiers track DOT class directly — an underwriter's first question is almost always the class. Different licensing, weight-station, and fuel-tax requirements apply by class. The dominant equipment configuration in OTR is the Class 8 tractor (sleeper or day cab) pulling a 53-foot trailer. Insurance carriers price specifically by class and freight type — a Class 8 reefer is priced differently from a Class 8 dry van even when everything else is identical.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "DOT class is one of the first underwriting questions both insurance carriers and lenders ask. Pricing tiers vary materially across classes. Hot-shot operators (Class 3–5) face a very different insurance and financing landscape than Class 8 OTR operators, with cheaper equipment but thinner per-mile margins and different broker pools.\n\nFor owner-ops considering a scale move from Class 3 hot-shot to Class 8 OTR, the change in licensing, insurance, and financing structure is significant — a real planning input, not a back-office detail. Underwriters re-price the entire policy when class changes, and lenders re-evaluate based on the new equipment cohort.",
      },
    ],
    relatedTerms: ["primary-liability", "motor-truck-cargo", "am-best"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/equipment-financing", label: "Equipment financing" },
    ],
  },
  {
    slug: "dec-page",
    term: "Declarations Page",
    abbreviation: "Dec Page",
    termCode: "Dec Page",
    category: "insurance-and-risk",
    shortDefinition:
      "Summary page of an insurance policy listing covered vehicles, drivers, coverage limits, deductibles, and effective dates; the proof-of-insurance document.",
    sections: [
      {
        h2: "What it is",
        body:
          "The declarations page — universally called the \"dec page\" — is the summary front page of an insurance policy. It lists the policyholder name, policy number, named insureds, scheduled vehicles (year/make/model/VIN), covered drivers, coverage types and limits, deductibles, effective and expiration dates, and the premium amount. It is a single document that summarizes the policy without the dozens of pages of forms and endorsements that constitute the full contract.\n\nIt is the document brokers, shippers, lenders, and law enforcement use to verify coverage. The dec page updates each renewal or endorsement — adding or removing a vehicle or driver triggers a new dec page. It is not the same as a Certificate of Insurance (COI), which is a third-party-facing snapshot prepared as proof for specific entities (a broker, a shipper, a lender) and lists that entity as certificate holder. The dec page is the master record; the COI is the addressed copy issued from it.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "The dec page is what every counterparty asks for to evidence coverage. Keep current versions accessible — in the cab, on the phone, in the broker portal. Lenders verify dec pages annually for equipment-loan compliance, and a missing dec page at audit is a covenant violation even when coverage is in place.\n\nBroker contracts require a dec page or COI before dispatch — an outdated document held up at the dock creates real revenue loss. Dec page lapses between renewals are the most common cause of MC# inactivation surprises, almost always tracing back to a missed renewal notice.",
      },
    ],
    relatedTerms: ["primary-liability", "physical-damage", "motor-truck-cargo", "am-best"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
];
