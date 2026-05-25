import "server-only";

/* ===========================================================================
   Canonical topic taxonomy. Cross-cuts glossary, blog, comparisons, research,
   calculators, and vertical/money pages. Solves the "I want everything about
   factoring" use case that surface-level nav cannot support at 300+ pages.

   Architecture choice: explicit hardcoded mapping (similar to the
   lenders-state pattern) — not auto-derivation from existing categories.
   The glossary's "operating-authority-compliance" bucket, for example,
   collapses two distinct topics (compliance vs. new-authority). Explicit
   mapping gives clean topic pages without restructuring the source data.

   Adding a topic:
     1. Add the literal to ContentTopic in ./types.ts.
     2. Add TopicInfo entry to TOPIC_INFO below.
     3. Add a content mapping to TOPIC_CONTENT_MAP.

   Adding content to a topic:
     - Glossary terms: add the slug string to the GLOSSARY_TOPIC_MAP entry.
     - Blog posts: blog posts auto-route by their `topic` field via
       BLOG_TOPIC_TO_CONTENT_TOPIC.
     - Comparisons / research / calculators / verticals: add an entry to the
       hardcoded STATIC_CONTENT array.
   =========================================================================== */

import { getAllPosts, type BlogTopic } from "@/lib/data/blog";
import { getAllTerms } from "@/lib/data/glossary";
import type { ContentTopic, TopicContentItem, TopicInfo } from "./types";

export type { ContentTopic, TopicContentItem, TopicInfo, TopicContentType } from "./types";
export { CONTENT_TYPE_LABELS } from "./types";

/* -----------------------------------------------------------------------------
   Topic landing-page metadata. Descriptions run 50-100 words and read as the
   first paragraph on the topic page — direct, owner-op-respecting, no
   academic hedging.
   -------------------------------------------------------------------------- */
export const TOPIC_INFO: Record<ContentTopic, TopicInfo> = {
  factoring: {
    slug: "factoring",
    label: "Factoring & Cash Flow",
    description:
      "Invoice factoring is how most owner-operators turn 30-60 day broker pay into same-day cash. This topic covers recourse vs non-recourse, advance rates, broker credit, factoring contracts, chargebacks, fuel-card programs, and head-to-head comparisons of the major trucking-factoring desks. If your revenue is hostage to broker payment cycles, the playbook here is the one you actually need — built around the math of the rate spread, the broker-credit infrastructure, and the contract terms that decide whether factoring helps you or eats your margin.",
  },
  "equipment-financing": {
    slug: "equipment-financing",
    label: "Equipment Financing",
    description:
      "Equipment financing is how truckers buy their next tractor, trailer, or specialized unit without writing a six-figure check up front. This topic covers semi-truck loans, box-truck financing, balloon payments, down-payment strategy, lease-vs-buy math, refinancing, SBA loans for owner-operators, and the bad-credit and no-money-down programs that actually fund. Built for owner-operators and small fleets making the most expensive purchase of their career — with the diligence the truck dealer is not going to do for you.",
  },
  "working-capital": {
    slug: "working-capital",
    label: "Working Capital",
    description:
      "Working capital is the cash you need to keep the truck moving between settlements — fuel, repairs, payroll, insurance premiums, off-season survival. This topic covers MCAs (and why most owner-operators should avoid them), term loans, asset-based lending, lines of credit, the working-capital-vs-factoring-vs-MCA decision matrix, and head-to-head reviews of the major small-business capital providers. Built around the math of effective APR and the contract terms most carriers do not read before they sign.",
  },
  insurance: {
    slug: "insurance",
    label: "Insurance & Risk",
    description:
      "Commercial trucking insurance is the second-largest line item on most owner-operator P&Ls — and the one carrier-quoting platforms underprice routinely. This topic covers primary liability, motor truck cargo, physical damage, non-trucking liability, occupational accident, premium financing, deductible strategy, nuclear-verdict defense, claim filing, and head-to-head comparisons of Progressive, Sentry, Nationwide, and the trucking-specialty carriers. Built for owner-operators who want the policy that pays when something goes wrong — not the cheapest quote that fails at claim time.",
  },
  "owner-operator-life": {
    slug: "owner-operator-life",
    label: "Owner-Operator Life",
    description:
      "Owner-operator life is the operational reality between the financing pages — pay models, settlement statements, taxes, hometime, lease-on versus own-authority, the math of cents-per-mile versus percentage-of-line-haul, and how to read the settlement deductions most carriers do not explain. This topic covers driver-life-and-work, pay structures, tax and accounting playbooks for 1099 and S-corp filers, and the cost-per-mile diagnostics every operator needs to know whether they are actually profitable.",
  },
  compliance: {
    slug: "compliance",
    label: "Compliance & Regulation",
    description:
      "FMCSA compliance is the threshold every trucking lender, insurer, and broker checks first — MC#, DOT#, BOC-3, UCR, IRP, IFTA, MCS-150, CSA scores, HOS rules, ELD mandates, drug-and-alcohol clearinghouse. This topic covers the regulatory framework that keeps the truck legal and the operating authority active, the CSA improvement playbook, roadside inspection survival, IRP/IFTA reporting, and the Year-1 compliance calendar every new-authority carrier needs. Skip a filing here and the financing pages stop working entirely.",
  },
  operations: {
    slug: "operations",
    label: "Operations",
    description:
      "Operations is the daily mechanics of moving freight — freight types (dry van, reefer, flatbed, hot shot, hazmat, drayage), accessorials (detention, layover, TONU, lumper), dispatch versus self-dispatch, broker vetting, rate confirmations, BOL and POD paperwork, and the operational decisions that separate $1.80/mi operators from $2.40/mi operators. This topic covers freight type economics, broker relations, dispatch infrastructure, and the practical playbooks for reading rate cons and getting paid the accessorials you actually earned.",
  },
  "tech-and-telematics": {
    slug: "tech-and-telematics",
    label: "Tech & Telematics",
    description:
      "Tech and telematics is the infrastructure layer underneath modern trucking — ELDs, AI dash cams, TMS platforms, dispatch software, load boards, fleet-management platforms, IFTA-reporting software, driver scorecards, and the geofencing and vehicle-telematics tools insurers and lenders increasingly require. This topic covers what each tool actually does, what carriers are pricing into premiums, and the practical buy/avoid math for owner-operators choosing their first tech stack or upgrading from a paper-and-spreadsheet setup.",
  },
  "new-authority": {
    slug: "new-authority",
    label: "New Authority",
    description:
      "New authority is the first 18 months of operation — the FMCSA New Entrant Safety Assurance Program, the financing programs sized to first-time owner-operators, the insurance carriers that will write a brand-new MC#, and the compliance calendar that keeps you out of trouble. This topic covers MC# activation, BOC-3, UCR, CDL classes and endorsements, ELDT, EIN, the medical card, no-money-down truck financing, no-credit-check factoring, and the playbook that takes a CDL holder from authority application to a profitable first year.",
  },
  "industry-trends": {
    slug: "industry-trends",
    label: "Industry Trends",
    description:
      "Annual research reports and market analysis covering the trucking finance, insurance, capital, fuel, regulation, broker-relations, and tech landscape. Source-cited, regulator-anchored, no proprietary or vendor-licensed feeds. Built for owner-operators, small fleets, and the trucking-finance and insurance counterparties who need a defensible view of where the market is going — what AM Best is saying about insurer combined ratios, what the FMCSA is signaling on regulation, and where the capital, fuel, and freight cycles are pointing.",
  },
};

/* -----------------------------------------------------------------------------
   Glossary slug → topics mapping. One slug can roll up to multiple topics
   (e.g. mc-number → compliance + new-authority). Categories are too coarse
   for this — explicit slug-level mapping is what produces clean topic pages.
   -------------------------------------------------------------------------- */
const GLOSSARY_TOPIC_MAP: Record<ContentTopic, ReadonlyArray<string>> = {
  factoring: [
    "recourse-factoring",
    "non-recourse-factoring",
    "advance-rate",
    "lockbox",
    "ach",
  ],
  "equipment-financing": [
    "equipment-loan",
    "balloon-payment",
    "macrs-depreciation",
    "section-179",
    "ucc-1",
  ],
  "working-capital": [
    "mca",
    "abl",
    "working-capital",
    "line-of-credit",
    "term-loan",
    "sba-loan",
    "ein",
  ],
  insurance: [
    "primary-liability",
    "motor-truck-cargo",
    "physical-damage",
    "general-liability",
    "non-trucking-liability",
    "occupational-accident",
    "reefer-breakdown",
    "premium-financing",
    "deductible",
    "am-best",
    "dot-class",
    "dec-page",
  ],
  "owner-operator-life": [
    "owner-operator",
    "lease-purchase",
    "hometime",
    "slip-seat",
    "team-driving",
    "forced-dispatch",
    "sleeper-berth",
    "cents-per-mile-pay",
    "percentage-of-line-haul",
    "lease-on-driver",
    "company-driver",
    "settlement-statement",
    "escrow-deductions",
    "fuel-advance",
    "maintenance-escrow",
    "bobtail-pay",
    "detention-pay-policy",
    "guaranteed-pay",
    "safety-bonus",
    "referral-bonus",
    "orientation-pay",
    "trip-sheet",
    "carrier-deduction",
    "per-diem",
    "quarterly-estimated-taxes",
    "self-employment-tax",
    "schedule-c",
  ],
  compliance: [
    "irp",
    "ifta",
    "mcs-150",
    "csa-score",
    "eld",
    "fmcsa",
    "hos",
    "bol",
    "pod",
    "ooida",
    "ata",
    "scac",
    "hvut",
    "hazmat-endorsement",
    "tanker-endorsement",
    "doubles-triples-endorsement",
    "passenger-endorsement",
    "school-bus-endorsement",
    "x-endorsement",
    "hos-11-hour-rule",
    "hos-14-hour-window",
    "hos-30-minute-break",
    "hos-70-hour-rule",
    "hos-34-hour-restart",
    "dot-physical",
    "drug-alcohol-clearinghouse",
    "pre-employment-screening",
  ],
  operations: [
    "hot-shot",
    "reefer",
    "dry-van",
    "flatbed",
    "deadhead",
    "otr",
    "ltl",
    "ftl",
    "intermodal",
    "drayage",
    "expedited",
    "hazmat",
    "lumper",
    "tonu",
    "detention",
    "accessorial-charges",
    "dispatch-fee",
    "fuel-surcharge",
    "demurrage",
    "layover",
    "backhaul",
    "headhaul",
    "weight-ticket",
    "dock-fee",
    "freight-class",
    "cpm",
    "rpm",
    "all-in-rate",
    "broker-spread",
  ],
  "tech-and-telematics": [
    "dash-cam",
    "ai-dash-cam",
    "tms",
    "dispatch-software",
    "load-board",
    "geofencing",
    "dvir",
    "vehicle-telematics",
    "driver-scorecard",
    "ifta-reporting-software",
    "fleet-management-platform",
    "mobile-app-eld",
  ],
  "new-authority": [
    "mc-number",
    "dot-number",
    "boc-3",
    "ucr",
    "cdl-class-a",
    "cdl-class-b",
    "cdl-class-c",
    "eldt",
    "medc-card",
  ],
  "industry-trends": [
    "am-best",
    "csa-score",
    "fmcsa",
  ],
};

/* Blog topic field → ContentTopic. Blog uses a different (narrower) topic
   set than the unified topic taxonomy. Industry-trends and a few cross-cuts
   route through here. */
const BLOG_TOPIC_TO_CONTENT_TOPIC: Record<BlogTopic, ContentTopic> = {
  "owner-operator-economics": "owner-operator-life",
  "operations-and-compliance": "operations",
  "factoring-and-cash-flow": "factoring",
  "equipment-and-financing": "equipment-financing",
  "insurance-and-risk": "insurance",
  "industry-trends": "industry-trends",
};

/* Blog posts that cross-tag into a second topic. Keys are blog slugs. The
   blog's own `topic` field gives the primary topic; this map adds secondary
   topic membership where the post genuinely covers two domains. */
const BLOG_CROSS_TAGS: Record<string, ReadonlyArray<ContentTopic>> = {
  "mc-number-deactivation-recovery": ["compliance", "new-authority"],
  "new-authority-year-1-compliance-calendar": ["new-authority"],
  "irp-ifta-survival-guide": ["compliance"],
  "understanding-csa-scores": ["compliance"],
  "csa-improvement-playbook": ["compliance"],
  "roadside-inspection-survival-guide": ["compliance"],
  "reading-broker-rate-confirmation": ["operations"],
  "freight-broker-vetting": ["operations"],
  "dispatch-services-vs-self-dispatch": ["operations"],
  "building-business-credit-owner-operator": ["working-capital"],
  "factoring-vs-working-capital": ["working-capital"],
  "working-capital-vs-factoring-vs-mca-decision-matrix": ["working-capital"],
  "sba-loan-for-owner-operators": ["working-capital"],
  "reading-your-settlement-statement": ["owner-operator-life"],
  "factoring-contract-walk-through": ["factoring"],
  "hidden-cost-of-low-rate-freight": ["industry-trends"],
  "true-cost-per-mile": ["industry-trends"],
  "nuclear-verdict-defense": ["industry-trends"],
};

/* -----------------------------------------------------------------------------
   Hardcoded static content: comparisons, research reports, calculators, and
   the high-value vertical/money pages. Each item lists every topic it belongs
   to (most belong to exactly one).
   -------------------------------------------------------------------------- */
type StaticContentItem = TopicContentItem & {
  readonly topics: ReadonlyArray<ContentTopic>;
};

const STATIC_CONTENT: ReadonlyArray<StaticContentItem> = [
  // -- Comparisons (24) -----------------------------------------------------
  {
    url: "/compare/apex-capital-vs-ecapital",
    title: "Apex Capital vs eCapital",
    description: "Trucking-factoring head-to-head: rates, advance, broker credit, fuel-card program.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/apex-capital-vs-rts-financial",
    title: "Apex Capital vs RTS Financial",
    description: "Factoring comparison across rate spread, contract terms, and fuel-card infrastructure.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/apex-capital-vs-tbs-factoring",
    title: "Apex Capital vs TBS Factoring",
    description: "Two of the largest trucking-factoring desks compared head-to-head.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/apex-capital-vs-triumph-business-capital",
    title: "Apex Capital vs Triumph Business Capital",
    description: "Trucking factoring versus banking-grade factoring with broker credit depth.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/apex-capital-vs-porter-freight-funding",
    title: "Apex Capital vs Porter Freight Funding",
    description: "Apex's nationwide scale versus Porter's small-fleet specialization.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/apex-capital-vs-truckstop-go-capital",
    title: "Apex Capital vs Truckstop Go Capital",
    description: "Standalone factoring versus load-board-integrated factoring.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/otr-capital-vs-apex-capital",
    title: "OTR Solutions vs Apex Capital",
    description: "Non-recourse depth versus volume-leader pricing in trucking factoring.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/otr-capital-vs-ecapital",
    title: "OTR Solutions vs eCapital",
    description: "Trucking-specialty factoring versus diversified mid-market factoring.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/ecapital-vs-rts-financial",
    title: "eCapital vs RTS Financial",
    description: "Two diversified factors compared on trucking specifically.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/ecapital-vs-triumph-business-capital",
    title: "eCapital vs Triumph Business Capital",
    description: "Diversified factoring versus banking-grade factoring head-to-head.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/ecapital-vs-porter-freight-funding",
    title: "eCapital vs Porter Freight Funding",
    description: "Mid-market factoring versus small-fleet specialty factoring.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/ecapital-vs-truckstop-go-capital",
    title: "eCapital vs Truckstop Go Capital",
    description: "Diversified factor versus load-board-integrated factoring.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/triumph-vs-rts-financial",
    title: "Triumph vs RTS Financial",
    description: "Banking-grade factoring versus diversified factor with trucking focus.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/triumph-vs-otr-capital",
    title: "Triumph vs OTR Solutions",
    description: "Banking-grade factoring versus non-recourse trucking specialist.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/tbs-factoring-vs-triumph-business-capital",
    title: "TBS Factoring vs Triumph Business Capital",
    description: "BOC-3-bundled trucking factoring versus banking-grade alternative.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/tbs-factoring-vs-otr-solutions",
    title: "TBS Factoring vs OTR Solutions",
    description: "Two owner-operator-focused trucking factors compared head-to-head.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/rts-financial-vs-otr-solutions",
    title: "RTS Financial vs OTR Solutions",
    description: "Diversified factoring versus trucking-specialty non-recourse.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/rts-financial-vs-tbs-factoring",
    title: "RTS Financial vs TBS Factoring",
    description: "Two owner-operator-focused trucking factors compared head-to-head.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/porter-freight-funding-vs-otr-solutions",
    title: "Porter Freight Funding vs OTR Solutions",
    description: "Small-fleet specialty factoring versus non-recourse trucking specialist.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/1st-commercial-credit-vs-riviera-finance",
    title: "1st Commercial Credit vs Riviera Finance",
    description: "Two general-business factors compared on trucking-specific terms.",
    contentType: "comparison",
    topics: ["factoring"],
  },
  {
    url: "/compare/progressive-commercial-vs-sentry-insurance",
    title: "Progressive Commercial vs Sentry Insurance",
    description: "Trucking-insurance head-to-head: pricing, claims, DOT-class appetite.",
    contentType: "comparison",
    topics: ["insurance"],
  },
  {
    url: "/compare/progressive-commercial-vs-nationwide-trucking",
    title: "Progressive Commercial vs Nationwide Trucking",
    description: "Volume trucking insurer versus diversified national carrier on trucking.",
    contentType: "comparison",
    topics: ["insurance"],
  },
  {
    url: "/compare/sentry-insurance-vs-nationwide-trucking",
    title: "Sentry Insurance vs Nationwide Trucking",
    description: "Trucking-specialty mutual versus diversified national carrier.",
    contentType: "comparison",
    topics: ["insurance"],
  },
  {
    url: "/compare/bluevine-vs-ondeck",
    title: "Bluevine vs OnDeck",
    description: "Two small-business working-capital lenders compared on trucking-specific terms.",
    contentType: "comparison",
    topics: ["working-capital"],
  },

  // -- Research reports (9) ------------------------------------------------
  {
    url: "/research/best-trucking-factoring-2026",
    title: "Best Trucking Factoring 2026",
    description: "Annual ranking of the major trucking-factoring desks across rate, advance, broker credit, and contract terms.",
    contentType: "research",
    topics: ["factoring", "industry-trends"],
  },
  {
    url: "/research/state-of-commercial-trucking-insurance-2026",
    title: "State of Commercial Trucking Insurance 2026",
    description: "Annual report on legal environment, commodity hotspots, AM Best context, broker market shape, and FMCSA rules to watch.",
    contentType: "research",
    topics: ["insurance", "industry-trends"],
  },
  {
    url: "/research/state-of-trucking-capital-2026",
    title: "State of Trucking Capital 2026",
    description: "Annual report on the working-capital, equipment, and factoring markets serving owner-operators and small fleets.",
    contentType: "research",
    topics: ["working-capital", "industry-trends"],
  },
  {
    url: "/research/state-of-trucking-fuel-costs-2026",
    title: "State of Trucking Fuel Costs 2026",
    description: "Annual report on diesel pricing, fuel surcharges, and the fuel-cost line item in the owner-operator P&L.",
    contentType: "research",
    topics: ["industry-trends", "owner-operator-life"],
  },
  {
    url: "/research/state-of-broker-relations-2026",
    title: "State of Broker Relations 2026",
    description: "Annual report on broker payment terms, broker credit health, and the carrier-broker relationship in 2026.",
    contentType: "research",
    topics: ["operations", "industry-trends"],
  },
  {
    url: "/research/state-of-trucking-tech-2026",
    title: "State of Trucking Tech 2026",
    description: "Annual report on ELDs, AI dash cams, TMS, dispatch software, and fleet-management platforms.",
    contentType: "research",
    topics: ["tech-and-telematics", "industry-trends"],
  },
  {
    url: "/research/state-of-trucking-regulation-2026",
    title: "State of Trucking Regulation 2026",
    description: "Annual report on FMCSA rules, HOS changes, ELD enforcement, and CSA scoring updates.",
    contentType: "research",
    topics: ["compliance", "industry-trends"],
  },
  {
    url: "/research/state-of-owner-operator-economics-2026",
    title: "State of Owner-Operator Economics 2026",
    description: "Annual report on cost per mile, pay structures, settlement deductions, and owner-operator profitability.",
    contentType: "research",
    topics: ["owner-operator-life", "industry-trends"],
  },
  {
    url: "/research/state-of-trucking-insurance-claims-2026",
    title: "State of Trucking Insurance Claims 2026",
    description: "Annual report on nuclear verdicts, cargo claims, claim frequency, and insurer combined ratios.",
    contentType: "research",
    topics: ["insurance", "industry-trends"],
  },

  // -- Calculators (5) -----------------------------------------------------
  {
    url: "/calculators/factoring-fee",
    title: "Factoring Fee Calculator",
    description: "Calculate the effective rate on a factoring contract across advance, reserve, and chargeback assumptions.",
    contentType: "calculator",
    topics: ["factoring"],
  },
  {
    url: "/calculators/whats-my-factoring-rate",
    title: "What's My Factoring Rate?",
    description: "Diagnostic for the rate spread you should actually be paying given your authority age, broker mix, and volume.",
    contentType: "calculator",
    topics: ["factoring"],
  },
  {
    url: "/calculators/lease-vs-buy",
    title: "Lease vs Buy Calculator",
    description: "Side-by-side math for leasing a tractor versus financing a purchase across the full ownership cycle.",
    contentType: "calculator",
    topics: ["equipment-financing"],
  },
  {
    url: "/calculators/how-much-can-i-borrow-for-a-truck",
    title: "How Much Can I Borrow for a Truck?",
    description: "Estimator for truck financing amount across credit, down payment, authority age, and revenue inputs.",
    contentType: "calculator",
    topics: ["equipment-financing"],
  },
  {
    url: "/calculators/owner-operator-pl",
    title: "Owner-Operator P&L Calculator",
    description: "Build a profit-and-loss view of your owner-operator operation across revenue, fixed cost, variable cost, and tax.",
    contentType: "calculator",
    topics: ["owner-operator-life"],
  },

  // -- Verticals & money pages --------------------------------------------
  {
    url: "/factoring",
    title: "Invoice Factoring for Truckers",
    description: "The Dispatched matching flow for trucking invoice factoring — recourse, non-recourse, and fuel-card programs.",
    contentType: "vertical",
    topics: ["factoring"],
  },
  {
    url: "/factoring/no-credit-check",
    title: "No Credit Check Factoring",
    description: "Factoring programs that approve on broker credit, not personal FICO — built for new authority and credit-rebuilding owners.",
    contentType: "vertical",
    topics: ["factoring", "new-authority"],
  },
  {
    url: "/equipment-financing",
    title: "Equipment Financing",
    description: "The Dispatched matching flow for commercial truck and trailer financing.",
    contentType: "vertical",
    topics: ["equipment-financing"],
  },
  {
    url: "/semi-truck-financing",
    title: "Semi-Truck Financing",
    description: "Class 8 truck financing for owner-operators and small fleets, from first-time buyers to established carriers.",
    contentType: "vertical",
    topics: ["equipment-financing"],
  },
  {
    url: "/semi-truck-financing/no-money-down",
    title: "No Money Down Semi-Truck Financing",
    description: "Zero-down programs for qualified owner-operators — the math, the trade-offs, and which lenders actually fund.",
    contentType: "vertical",
    topics: ["equipment-financing"],
  },
  {
    url: "/box-truck-financing",
    title: "Box Truck Financing",
    description: "Financing for Class 3-6 box trucks and delivery vehicles for owner-operators and small fleets.",
    contentType: "vertical",
    topics: ["equipment-financing"],
  },
  {
    url: "/bad-credit-truck-financing",
    title: "Bad Credit Truck Financing",
    description: "Truck financing programs that approve on revenue and authority strength when FICO is the obstacle.",
    contentType: "vertical",
    topics: ["equipment-financing"],
  },
  {
    url: "/truck-repair-loans",
    title: "Truck Repair Loans",
    description: "Emergency capital for major truck repairs — engine, transmission, after-market — to keep the truck earning.",
    contentType: "vertical",
    topics: ["working-capital", "equipment-financing"],
  },
  {
    url: "/trucking-working-capital",
    title: "Trucking Working Capital",
    description: "The Dispatched matching flow for trucking working capital, term loans, and lines of credit.",
    contentType: "vertical",
    topics: ["working-capital"],
  },
  {
    url: "/owner-operator-financing",
    title: "Owner-Operator Financing",
    description: "Financing programs sized to single-truck and small-fleet owner-operators.",
    contentType: "vertical",
    topics: ["equipment-financing", "owner-operator-life"],
  },
  {
    url: "/owner-operator-financing/first-time",
    title: "First-Time Owner-Operator Financing",
    description: "Truck financing for first-time owner-operators with new authority — the playbook from CDL to first funded truck.",
    contentType: "vertical",
    topics: ["new-authority", "owner-operator-life"],
  },
  {
    url: "/new-authority-truck-financing",
    title: "New Authority Truck Financing",
    description: "Financing programs for carriers in the FMCSA New Entrant Safety Assurance Program (first 18 months).",
    contentType: "vertical",
    topics: ["new-authority", "equipment-financing"],
  },
  {
    url: "/insurance",
    title: "Commercial Trucking Insurance",
    description: "The Dispatched matching flow for primary liability, MTC, physical damage, and trucking-specialty coverage.",
    contentType: "vertical",
    topics: ["insurance"],
  },

  // -- Pulse (operational intelligence layer) -----------------------------
  {
    url: "/pulse/diesel",
    title: "U.S. Diesel Prices This Week",
    description: "Weekly EIA retail on-highway diesel — national plus PADD 1-5. Updated every Monday.",
    contentType: "research",
    topics: ["owner-operator-life", "industry-trends"],
  },
];

/* -----------------------------------------------------------------------------
   Public API.
   -------------------------------------------------------------------------- */

/** All 10 canonical topic slugs in display order. */
export function getAllTopicSlugs(): ReadonlyArray<ContentTopic> {
  return [
    "factoring",
    "equipment-financing",
    "working-capital",
    "insurance",
    "owner-operator-life",
    "compliance",
    "operations",
    "tech-and-telematics",
    "new-authority",
    "industry-trends",
  ];
}

/** Topic info (label + description) for a given slug. */
export function getTopicInfo(slug: ContentTopic): TopicInfo {
  return TOPIC_INFO[slug];
}

/**
 * All content items tagged with a topic — across glossary, blog, comparisons,
 * research, calculators, and verticals. Deduplicated by URL and returned in
 * deterministic order (content type → title).
 */
export function getContentByTopic(
  topic: ContentTopic,
): ReadonlyArray<TopicContentItem> {
  const items: TopicContentItem[] = [];
  const seen = new Set<string>();

  const push = (item: TopicContentItem): void => {
    if (seen.has(item.url)) return;
    seen.add(item.url);
    items.push(item);
  };

  // Glossary terms
  const glossarySlugs = new Set(GLOSSARY_TOPIC_MAP[topic]);
  if (glossarySlugs.size > 0) {
    for (const term of getAllTerms()) {
      if (!glossarySlugs.has(term.slug)) continue;
      push({
        url: `/glossary/${term.slug}`,
        title: term.term,
        description: term.shortDefinition,
        contentType: "glossary",
      });
    }
  }

  // Blog posts — primary topic via blog `topic` field, plus cross-tags.
  for (const post of getAllPosts()) {
    const primary = BLOG_TOPIC_TO_CONTENT_TOPIC[post.topic];
    const cross = BLOG_CROSS_TAGS[post.slug] ?? [];
    if (primary === topic || cross.includes(topic)) {
      push({
        url: `/blog/${post.slug}`,
        title: post.title,
        description: post.subhead,
        contentType: "blog",
      });
    }
  }

  // Static content (comparisons / research / calculators / verticals)
  for (const item of STATIC_CONTENT) {
    if (!item.topics.includes(topic)) continue;
    push({
      url: item.url,
      title: item.title,
      description: item.description,
      contentType: item.contentType,
    });
  }

  // Stable ordering: by contentType (glossary first), then alphabetical by title.
  const typeOrder: Record<TopicContentItem["contentType"], number> = {
    glossary: 0,
    blog: 1,
    comparison: 2,
    research: 3,
    calculator: 4,
    vertical: 5,
  };
  items.sort((a, b) => {
    if (a.contentType !== b.contentType) {
      return typeOrder[a.contentType] - typeOrder[b.contentType];
    }
    return a.title.localeCompare(b.title);
  });

  return items;
}
