import "server-only";

/* ===========================================================================
   Trucking finance glossary. Programmatic SEO + AEO/LLM citation play.
   Each term renders as its own page under /glossary/{slug} and is grouped
   on the index by category.

   Architecture: this barrel file holds the original 10 core terms plus
   imports from category sub-files in lib/data/glossary/. Each sub-file
   contains an array of additional terms in that category. Splitting by
   category lets agents extend the glossary without touching this barrel
   and avoids merge conflicts when multiple categories are populated in
   parallel.

   Adding a term:
     1. Pick a category sub-file (lib/data/glossary/<category>.ts) or
        add an entry directly to CORE_TERMS below.
     2. Add the entry; the index page and /glossary/[slug] route
        auto-pick it up.
     3. The sitemap loops over getAllTerms() to emit every term URL.

   Section bodies use simple paragraphs separated by `\n\n`. The renderer
   splits on the double newline and emits one <p> per chunk. No HTML, no
   markdown — keep the data file copy-only so we can swap renderers later
   without rewriting content.
   =========================================================================== */

import { COMPLIANCE_EXTENDED_TERMS } from "./glossary/compliance-extended";
import { COMPLIANCE_LICENSING_TERMS } from "./glossary/compliance-licensing";
import { OPERATIONS_TERMS } from "./glossary/operations";
import { OPERATIONS_EXTENDED_TERMS } from "./glossary/operations-extended";
import { FINANCE_TERMS } from "./glossary/finance";
import { FINANCE_EXTENDED_TERMS } from "./glossary/finance-extended";
import { INSURANCE_RISK_TERMS } from "./glossary/insurance-risk";
import { DRIVER_LIFE_WORK_TERMS } from "./glossary/driver-life-work";
import { TAX_ACCOUNTING_TERMS } from "./glossary/tax-accounting";
import { TECH_TELEMATICS_TERMS } from "./glossary/tech-telematics";
import { COMPLIANCE_ENDORSEMENTS_TERMS } from "./glossary/compliance-endorsements";

export type {
  GlossaryCategory,
  GlossaryRelatedProduct,
  GlossarySection,
  GlossaryTerm,
} from "./glossary/types";
export { CATEGORY_LABELS } from "./glossary/types";

import type { GlossaryCategory, GlossaryTerm } from "./glossary/types";
import { CATEGORY_LABELS } from "./glossary/types";

const CORE_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "mc-number",
    term: "MC Number",
    abbreviation: "MC#",
    termCode: "MC#",
    category: "operating-authority-compliance",
    shortDefinition:
      "Federal operating authority number issued by FMCSA that identifies for-hire interstate motor carriers and brokers.",
    sections: [
      {
        h2: "What it is",
        body:
          "An MC Number — short for Motor Carrier Authority Number — is the federal operating-authority identifier issued by the Federal Motor Carrier Safety Administration (FMCSA). It is required for any for-hire interstate motor carrier or broker transporting regulated commodities.\n\nThe MC# is distinct from the DOT Number. A DOT Number identifies any vehicle requiring federal safety oversight; an MC# identifies the operating-authority entity legally permitted to haul for hire across state lines. A carrier needs both — DOT for safety, MC for authority.\n\nThe FMCSA charges a $300 filing fee for a new MC#. After filing, the application enters a published-availability period during which protests can be filed against the applicant. Activation typically takes 21 days after that period closes. New entrants also complete the FMCSA New Entrant Safety Assurance Program over the first 18 months of operation.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Without an active MC#, a for-hire carrier cannot legally invoice for interstate freight, cannot book most loads on load boards, and cannot qualify for trucking-specific factoring or financing on most lender panels. The MC# is the threshold compliance signal every trucking lender and factor checks first.\n\nMany lenders require an active MC# for at least 6 months before underwriting on standard equipment financing or working capital. Some accept brand-new authority — but typically with a co-signer, a larger down payment, or a new-authority program built specifically for first-year carriers. Factoring companies will onboard new authority with a clean broker-credit profile, but the rate spread is wider until 90 days of clean payment history is established. MC# inactivation — for missed UCR, lapsed insurance, or BOC-3 issues — triggers immediate factoring suspension on most contracts.",
      },
    ],
    relatedTerms: ["dot-number", "boc-3", "ucr"],
    relatedProducts: [
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "dot-number",
    term: "DOT Number",
    abbreviation: "USDOT",
    termCode: "USDOT",
    category: "operating-authority-compliance",
    shortDefinition:
      "USDOT-issued registration number identifying any vehicle subject to federal safety oversight, including private and for-hire carriers.",
    sections: [
      {
        h2: "What it is",
        body:
          "A DOT Number is the unique registration identifier issued by the US Department of Transportation through the FMCSA. It is required for any commercial vehicle with a gross vehicle weight rating (GVWR) of 10,001 pounds or more, any vehicle transporting hazardous materials in placardable quantities, or any vehicle carrying nine or more passengers (eight or more for compensation) when crossing state lines.\n\nObtaining a DOT Number is free. Carriers renew the registration biennially through the MCS-150 update, which refreshes operational data the FMCSA uses to populate safety scoring (CSA), inspection records, and crash history. Some states also require an intrastate DOT Number for in-state-only commercial operations.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "The DOT Number is different from the MC Number. DOT covers safety; MC covers operating authority. Many private (non-hire) carriers — companies hauling their own goods — need a DOT Number but not an MC Number. For-hire interstate carriers need both. Lenders and insurers cross-check the two against the FMCSA SAFER system at intake.\n\nInsurance carriers and lenders use the DOT Number to pull crash records, inspection history, and CSA (Compliance, Safety, Accountability) safety scores. A clean safety record materially affects insurance pricing and lender appetite. A poor CSA score on the DOT pull is one of the fastest ways to get declined for primary liability or equipment financing — even with strong revenue. Trends matter as much as point-in-time scores: an improving safety profile is treated differently than a deteriorating one. Keep the MCS-150 biennial update current; outdated DOT records flag as stale and complicate underwriting.",
      },
    ],
    relatedTerms: ["mc-number", "ucr", "irp"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
    ],
  },
  {
    slug: "boc-3",
    term: "BOC-3",
    abbreviation: "BOC-3",
    termCode: "BOC-3",
    category: "operating-authority-compliance",
    shortDefinition:
      "FMCSA filing designating process agents in every state where a carrier operates, required to activate operating authority.",
    sections: [
      {
        h2: "What it is",
        body:
          "The BOC-3 — \"Blanket of Coverage\" form 3 — is an FMCSA filing that designates process agents in every state where a for-hire interstate motor carrier or broker operates. A process agent is a person or company authorized to accept legal documents (subpoenas, lawsuits, court papers) on the carrier's behalf within a given state. The filing is not optional: FMCSA regulations under 49 CFR Part 366 require it as a condition of holding operating authority.\n\nMost carriers do not designate process agents state-by-state. Instead, they file through a national process-agent service that covers all 50 states for a flat annual fee — typically around $50/year. The FMCSA requires a BOC-3 on file before it will activate operating authority; without one, the MC# stays inactive even if every other piece of paperwork is complete.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Skipping or losing the BOC-3 results in MC# deactivation, which immediately stops the carrier from legally invoicing interstate freight — and from factoring those invoices. Lenders treat a BOC-3 lapse as an MC# lapse for underwriting purposes; the cash-flow disruption that follows is what they actually care about.\n\nSome factoring services bundle BOC-3 filing into their onboarding (notably TBS Factoring), making it a non-issue for first-year owner-operators. If a lender flags an MC# as inactive during underwriting, the BOC-3 status is one of the first things to verify alongside UCR and the MCS-150 biennial update.",
      },
    ],
    relatedTerms: ["mc-number", "dot-number"],
    relatedProducts: [
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
      { url: "/invoice-factoring-for-truckers/no-credit-check", label: "No credit check factoring" },
    ],
  },
  {
    slug: "irp",
    term: "IRP",
    abbreviation: "IRP",
    termCode: "IRP",
    category: "operating-authority-compliance",
    shortDefinition:
      "Reciprocal apportioned-registration agreement among US states and Canadian provinces for commercial vehicles operating across jurisdictions.",
    sections: [
      {
        h2: "What it is",
        body:
          "The International Registration Plan (IRP) is a reciprocal agreement among US states (excluding Alaska and Hawaii) and Canadian provinces that allows commercial vehicles to register in a base state and pay registration fees apportioned by miles driven in each jurisdiction. IRP applies to vehicles with a GVWR over 26,000 pounds, vehicles with three or more axles regardless of weight, or vehicles operating across two or more jurisdictions.\n\nWithout IRP, an interstate carrier would have to register separately with every state DMV the truck enters — administratively impossible at scale. IRP consolidates that into a single base-state registration, with the base state distributing apportioned fees to other jurisdictions on the carrier's behalf. Carriers report quarterly mileage by state through the base-state administrator and renew the IRP cab card annually.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For owner-operators running over-the-road (OTR), IRP can save thousands annually compared to registering separately in every operating state. It is required for most interstate carriers — non-compliance results in roadside citations, fines, and potential vehicle impound, all of which directly hit revenue.\n\nLenders underwriting equipment financing on Class 8 tractors expect IRP registration in place, particularly for first-year owner-operators ramping into multi-state operations. Working capital lenders may flag IRP gaps during underwriting as a signal of operational immaturity. IFTA filings depend on the same mileage-by-jurisdiction data that IRP requires; a clean IRP record makes IFTA reporting easier and reduces audit risk.",
      },
    ],
    relatedTerms: ["ifta", "ucr", "dot-number"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "ifta",
    term: "IFTA",
    abbreviation: "IFTA",
    termCode: "IFTA",
    category: "operating-authority-compliance",
    shortDefinition:
      "Reciprocal fuel-tax agreement among US states and Canadian provinces consolidating fuel-tax reporting for interstate commercial vehicles.",
    sections: [
      {
        h2: "What it is",
        body:
          "The International Fuel Tax Agreement (IFTA) is a reciprocal agreement among US states and Canadian provinces that consolidates fuel-tax reporting for qualifying commercial vehicles. Instead of filing fuel-tax returns in every state where the vehicle bought fuel and drove miles, the carrier files a single quarterly return with the base state. The base state then redistributes tax revenue to the other jurisdictions based on the miles driven and gallons purchased reported by the carrier.\n\nQualifying vehicles include those with a GVWR over 26,000 pounds or three-plus axles operating across two or more IFTA jurisdictions. Carriers must track fuel purchases (with receipts) and miles driven in each jurisdiction. The base state issues annual IFTA decals — one per qualifying vehicle, displayed on both sides of the cab. Audits are common, and IFTA records must be kept for four years from the return due date.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "IFTA reporting errors are one of the most common audit triggers for owner-operators. A failed IFTA audit can produce back-tax assessments, penalties, and interest that materially compress cash flow — exactly when revenue is also under pressure from the audit's operational disruption.\n\nFactoring companies and fuel-card programs (Apex, eCapital, RTS, Triumph) often include IFTA reporting tools as ancillary services — a real benefit on top of advance rates. Working capital lenders may flag IFTA non-compliance during underwriting; a carrier with unresolved IFTA issues looks higher-risk than one with a clean compliance record. ELD data feeds increasingly populate IFTA returns automatically, but the carrier still owns the audit defense.",
      },
    ],
    relatedTerms: ["irp", "ucr", "dot-number"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "ucr",
    term: "UCR",
    abbreviation: "UCR",
    termCode: "UCR",
    category: "operating-authority-compliance",
    shortDefinition:
      "Annual federal fee program funding state-level commercial-vehicle enforcement, required for interstate carriers regardless of state of registration.",
    sections: [
      {
        h2: "What it is",
        body:
          "The Unified Carrier Registration (UCR) program is a federal program administered by participating states that funds state-level commercial-vehicle safety enforcement. Every for-hire interstate motor carrier, broker, freight forwarder, and leasing company must register annually and pay a fee scaled by fleet size. Private carriers operating in interstate commerce are also required to register.\n\n2026 fee tiers run from roughly $46 (1–2 vehicles) to $58,000+ (1,001+ vehicles), with brackets in between for small fleets, mid-size carriers, and large fleet operators. Filing typically opens in October and is due by December 31. Registration is done through a participating base state — even if the carrier's home state is not a UCR participant, the carrier still owes the fee through a designated base state. The fee schedule is set annually by the UCR Plan board.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Failure to register UCR results in roadside citations and out-of-service orders in participating states — operational disruption that hits revenue immediately. Lenders may flag UCR non-compliance as a red flag during underwriting, particularly for working capital and factoring lines that depend on uninterrupted operation.\n\nSome factoring companies include UCR tracking in their compliance dashboards as part of broader carrier-compliance services. For multi-truck owner-operators scaling from one truck into a small fleet, the UCR fee can be a meaningful budget line — particularly when adding the second or third truck pushes the carrier across a bracket boundary. Track it the same way you track DOT renewals and IRP cab cards.",
      },
    ],
    relatedTerms: ["mc-number", "dot-number", "irp", "ifta"],
    relatedProducts: [
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "recourse-factoring",
    term: "Recourse Factoring",
    category: "factoring-cash-flow",
    shortDefinition:
      "Factoring arrangement where the carrier remains liable for unpaid invoices if the broker fails to pay; lower rates than non-recourse.",
    sections: [
      {
        h2: "What it is",
        body:
          "Recourse factoring is the default factoring structure for most owner-operators. The factor advances cash on invoices submitted by the carrier (typically 90–97% of the invoice face value) but retains the right to charge back the carrier if the broker doesn't pay within an agreed window — usually 60 to 90 days.\n\nThe factor still underwrites broker credit at intake and refuses to advance against high-risk brokers. But the factor bears no credit-risk reserve on the deals it does advance — the carrier remains the ultimate obligor if the broker becomes insolvent or simply stops paying. Recourse rates typically run 1.5–4%, materially cheaper than non-recourse equivalents.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Recourse factoring is cheaper but transfers broker insolvency risk back to the carrier. A carrier with concentrated broker mix — where one or two brokers represent more than 40% of revenue — faces real risk exposure on a recourse contract. A single broker failure on $80K of outstanding receivables can wipe out months of margin and force the carrier into emergency working capital at materially worse rates than the factor spread.\n\nFor diversified broker mix and clean payment history, recourse is the lower-cost choice. The math favors recourse when broker concentration is below 25% and broker payment history is established. Above that, the rate premium for non-recourse becomes cheap insurance against tail risk. Read the recourse contract for the chargeback window, what counts as a clean delivery, and how the factor handles broker disputes — those terms matter more than the headline advance rate.",
      },
    ],
    relatedTerms: ["non-recourse-factoring", "owner-operator"],
    relatedProducts: [
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
      { url: "/invoice-factoring-for-truckers/no-credit-check", label: "No credit check factoring" },
    ],
  },
  {
    slug: "non-recourse-factoring",
    term: "Non-Recourse Factoring",
    category: "factoring-cash-flow",
    shortDefinition:
      "Factoring arrangement where the factor absorbs broker insolvency risk on clean deliveries; higher rates than recourse.",
    sections: [
      {
        h2: "What it is",
        body:
          "Non-recourse factoring is the structure where the factor takes the credit risk on the broker. If the broker becomes insolvent on a clean delivery, the factor absorbs the loss — not the carrier. The carrier still gets the advance, and the factor eats the unpaid invoice rather than charging it back.\n\nCoverage is narrower than the marketing suggests. \"Non-recourse\" almost always refers specifically to broker insolvency events — bankruptcy, ceasing operations, or formal financial collapse. Slow pay, billing disputes, and chargebacks for short loads, damaged freight, or paperwork errors are not covered — the carrier is still on the hook for those. Non-recourse rates typically run 0.5–1% higher than recourse equivalents, commonly 2.5–5%, and the factor underwrites broker credit harder before approving advances.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Non-recourse is critical for carriers with concentrated broker risk. The 0.5–1% rate premium is cheap insurance against a single broker failure that could otherwise wipe out 30–60 days of revenue and force the carrier into emergency working capital — at materially worse rates than the factor spread.\n\nOTR Solutions and Triumph Business Capital lead the trucking-factoring market on non-recourse depth — they have the broker-credit underwriting infrastructure to absorb the risk and price it competitively. For owner-operators running heavy concentration on one or two brokers, non-recourse is usually worth the spread. Read the contract carefully: confirm the insolvency definition, the time-window for chargebacks, and what happens on disputed loads.",
      },
    ],
    relatedTerms: ["recourse-factoring"],
    relatedProducts: [
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
      { url: "/invoice-factoring-for-truckers/no-credit-check", label: "No credit check factoring" },
    ],
  },
  {
    slug: "owner-operator",
    term: "Owner-Operator",
    category: "operator-types",
    shortDefinition:
      "Independent trucking professional who owns or leases their truck and operates under their own MC authority or as a subcontractor.",
    sections: [
      {
        h2: "What it is",
        body:
          "An owner-operator owns or leases the truck — the equipment — and operates it commercially. The structure splits two ways. (1) Owner-operator with own MC authority: an independent for-hire carrier who invoices brokers and shippers directly, factors directly, and runs their own compliance, insurance, and back office. (2) Owner-operator leased on with a carrier: operates under the carrier's authority — paid by the carrier as a 1099 contractor or W-2 employee depending on classification.\n\nMost legitimate owner-operators run their own authority. Lease-on operators have less independence, less revenue ceiling, and tighter dispatch control. The IRS, the FMCSA, and state labor agencies all care about the classification — California's AB 5 and the FAAAA-preemption litigation have made the lease-on classification structurally riskier than it was a decade ago.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Lender underwriting differs sharply by structure. Independent owner-operators with their own MC# access factoring, equipment financing, and working capital directly. Their revenue is visible to lenders through the invoices they submit and the bank statements that follow. Lease-on operators typically access financing as 1099 contractors, with less direct revenue visibility for lenders — settlement statements from the carrier substitute for invoice-level revenue history.\n\nChoosing the structure determines the financing landscape. Most first-time owner-operators with new authority can access programs sized to a single truck; lease-on operators face a narrower lender panel and tighter underwriting. Insurance pricing also splits — independent owner-operators pay primary liability directly, while lease-on operators rely on the carrier's policy for loaded dispatch and need non-trucking liability (bobtail) coverage for personal use.",
      },
    ],
    relatedTerms: ["lease-purchase", "mc-number"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
    ],
  },
  {
    slug: "lease-purchase",
    term: "Lease-Purchase",
    abbreviation: "Lease-Purchase",
    termCode: "Lease-Purchase",
    category: "operator-types",
    shortDefinition:
      "Carrier-administered program where a driver leases a truck with payments structured to result in eventual ownership; high failure rate.",
    sections: [
      {
        h2: "What it is",
        body:
          "A lease-purchase program — sometimes marketed as lease-to-own — is a carrier-administered structure where a driver leases a truck from the carrier, with weekly settlements deducting lease payments and operating costs (fuel, insurance, maintenance, escrow). After a defined period (typically 3–5 years) and on-condition compliance, the driver takes title to the truck.\n\nIndustry data shows more than 80% of lease-purchase agreements fail before completion. Drivers exit voluntarily, are terminated for performance or compliance issues, or default on the weekly settlements before the truck is paid off. The contract structure favors the carrier; drivers rarely accumulate equity, and most contracts treat early exit as a forfeiture of any payments toward the truck.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Lease-purchase is often presented to first-time owner-operators as the only path to truck ownership without a down payment. The math typically loses to traditional equipment financing — even at higher APRs — because real ownership financing builds equity from day one. With a lease-purchase, equity is contingent on completing the contract, and the high failure rate makes that contingency expensive.\n\nAvoid lease-purchase unless the contract includes a clear, contractually-binding equity-accrual schedule — rare in practice. A first-year owner-operator with $3K–$10K saved is almost always better off with a no-money-down or low-down-payment financing program than a lease-purchase, even at a meaningfully higher headline APR. The math: with real financing the truck title is yours from day one and a missed payment is a default-cure conversation, not a forfeiture event. With lease-purchase, the carrier owns the truck until the final payment clears.",
      },
    ],
    relatedTerms: ["owner-operator"],
    relatedProducts: [
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
      { url: "/semi-truck-financing", label: "Semi-truck financing" },
      { url: "/semi-truck-financing/no-money-down", label: "No money down semi-truck financing" },
    ],
  },
];

/* All terms — core array spread first so the original 10 retain their
   ordering, followed by each category sub-file's contributions. Within
   getTermsByCategory the order of CATEGORY_LABELS / ORDERED_CATEGORIES
   is what controls index-page rendering. */
const TERMS: ReadonlyArray<GlossaryTerm> = [
  ...CORE_TERMS,
  ...COMPLIANCE_EXTENDED_TERMS,
  ...COMPLIANCE_LICENSING_TERMS,
  ...OPERATIONS_TERMS,
  ...OPERATIONS_EXTENDED_TERMS,
  ...FINANCE_TERMS,
  ...FINANCE_EXTENDED_TERMS,
  ...INSURANCE_RISK_TERMS,
  ...DRIVER_LIFE_WORK_TERMS,
  ...TAX_ACCOUNTING_TERMS,
  ...TECH_TELEMATICS_TERMS,
  ...COMPLIANCE_ENDORSEMENTS_TERMS,
];

export function getAllTerms(): ReadonlyArray<GlossaryTerm> {
  return TERMS;
}

export function getTerm(slug: string): GlossaryTerm | undefined {
  return TERMS.find((t) => t.slug === slug);
}

export type GlossaryCategoryGroup = {
  readonly category: GlossaryCategory;
  readonly label: string;
  readonly terms: ReadonlyArray<GlossaryTerm>;
};

export function getTermsByCategory(): ReadonlyArray<GlossaryCategoryGroup> {
  // Order categories deterministically. The index page renders in this
  // sequence regardless of how terms are distributed across sub-files.
  const ordered: ReadonlyArray<GlossaryCategory> = [
    "operating-authority-compliance",
    "factoring-cash-flow",
    "operator-types",
    "trucking-operations",
    "trucking-finance",
    "insurance-and-risk",
    "driver-life-work",
    "tax-and-accounting",
    "tech-and-telematics",
  ];
  return ordered.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    terms: TERMS.filter((t) => t.category === category),
  }));
}
