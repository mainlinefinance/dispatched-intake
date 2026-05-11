import "server-only";

/* ===========================================================================
   Site-wide search index. Enumerates every searchable page in the
   Dispatched.finance site at module load time:

     - Glossary terms (lib/data/glossary)
     - Blog posts (lib/data/blog)
     - Lender directory entries (lib/data/lenders) + state pages
     - Hardcoded vertical pages, comparison pages, research reports,
       and calculator pages

   The index is built once per server process (module-level const) and
   reused by every /search request. With ~300–500 entries the build is
   sub-millisecond and the in-memory footprint is trivial.

   Why hardcode the non-data pages (verticals, comparisons, research,
   calculators) instead of parsing route directories or page.tsx exports?
     1. Route directories don't carry structured title/description in a
        form we can read without spinning up Next.js's metadata pipeline.
     2. We already maintain the same URL list in app/sitemap.ts. Search
        is a parallel surface; the maintenance cost of keeping both in
        sync is one PR per new page, which is the same cost we already
        pay for the sitemap.
     3. Hardcoded entries let us write search-optimized titles and
        descriptions independent of the on-page H1/meta — important for
        intent matching on queries like "factoring fee calculator".

   Adding a new searchable page:
     1. If it's data-backed (glossary term, blog post, lender), the
        loaders below will pick it up automatically.
     2. If it's a hardcoded page (new vertical, new comparison, new
        research report, new calculator), add an entry to the matching
        STATIC_* array below.
     3. The /search page renders results grouped by `type` in the order
        declared in lib/search/types.ts → TYPE_DISPLAY_ORDER.
   =========================================================================== */

import { getAllTerms, CATEGORY_LABELS } from "@/lib/data/glossary";
import { getAllPosts, BLOG_TOPICS } from "@/lib/data/blog";
import { getAllLenders, STATE_INFO } from "@/lib/data/lenders";
import type { SearchableItem } from "./types";

/* ---------- Hardcoded page entries ---------- */

/* Top-of-funnel vertical / money pages. Mirrors the static URLs in
   app/sitemap.ts (the section before the data-driven loops). Titles and
   descriptions are tuned for search intent, not for the on-page H1 — a
   user searching "owner operator first time" should land on this page
   regardless of how the page itself frames the H1. */
const STATIC_VERTICALS: ReadonlyArray<SearchableItem> = [
  {
    url: "/",
    title: "Dispatched — capital and insurance built for truckers",
    description:
      "Match with trucking-friendly lenders for working capital, equipment financing, repair loans, and invoice factoring. Soft pull first; no credit impact.",
    type: "vertical",
  },
  {
    url: "/trucking",
    title: "Trucking capital — match with trucking-friendly lenders",
    description:
      "Working capital, equipment financing, repair loans, and factoring for owner-operators and small fleets. Match in minutes.",
    type: "vertical",
  },
  {
    url: "/trucking-working-capital",
    title: "Trucking working capital loans",
    description:
      "Short-term working capital for owner-operators and small fleets. Use for fuel, payroll, repairs, or covering a slow week between settlements.",
    type: "vertical",
  },
  {
    url: "/equipment-financing",
    title: "Trucking equipment financing",
    description:
      "Finance tractors, trailers, reefers, and refurbishing work. Built for commercial-trucking borrowers.",
    type: "vertical",
  },
  {
    url: "/truck-repair-loans",
    title: "Truck repair loans",
    description:
      "Funding for emergency truck repairs — engine overhauls, transmission, DPF, brakes. Same-week funding for qualified operators.",
    type: "vertical",
  },
  {
    url: "/box-truck-financing",
    title: "Box truck financing",
    description:
      "Box truck loans for owner-operators and small fleets, including Amazon DSP and last-mile operators.",
    type: "vertical",
  },
  {
    url: "/bad-credit-truck-financing",
    title: "Bad credit truck financing",
    description:
      "Truck financing options for sub-580 FICO borrowers and recent bankruptcies. Honest about trade-offs in rate and down payment.",
    type: "vertical",
  },
  {
    url: "/owner-operator-financing",
    title: "Owner-operator financing",
    description:
      "Financing programs sized for independent owner-operators with their own MC authority. Truck loans, working capital, factoring.",
    type: "vertical",
  },
  {
    url: "/owner-operator-financing/first-time",
    title: "First-time owner-operator financing",
    description:
      "Financing programs for first-year owner-operators with new MC authority. Lower down-payment options for clean files.",
    type: "vertical",
  },
  {
    url: "/semi-truck-financing",
    title: "Semi-truck financing",
    description:
      "Class 8 tractor financing — new and used, sleeper and day-cab. Programs for new and seasoned operators.",
    type: "vertical",
  },
  {
    url: "/semi-truck-financing/no-money-down",
    title: "No money down semi-truck financing",
    description:
      "No-money-down semi-truck financing programs. Trade-offs: higher APR and tighter underwriting on the file.",
    type: "vertical",
  },
  {
    url: "/invoice-factoring-for-truckers",
    title: "Invoice factoring for truckers",
    description:
      "Recourse and non-recourse factoring for owner-operators and fleets. Compare advance rates, fuel programs, and broker credit tooling.",
    type: "vertical",
  },
  {
    url: "/invoice-factoring-for-truckers/no-credit-check",
    title: "No credit check factoring for truckers",
    description:
      "Factoring options with no personal credit pull. The factor underwrites the broker, not the trucker — useful for thin-file and bad-credit operators.",
    type: "vertical",
  },
  {
    url: "/new-authority-truck-financing",
    title: "New authority truck financing",
    description:
      "Truck and factoring programs for carriers in their first year of MC authority. Most lenders require 6+ months — these don't.",
    type: "vertical",
  },
  {
    url: "/insurance",
    title: "Commercial trucking insurance comparison",
    description:
      "Compare commercial trucking insurance carriers writing your DOT class in your state. Primary liability, motor truck cargo, physical damage, more.",
    type: "vertical",
  },
  {
    url: "/insurance/tools",
    title: "Commercial trucking insurance tools",
    description:
      "Estimators and fit tools for commercial trucking insurance. Premium estimator, coverage selector, claims-history calculator.",
    type: "vertical",
  },
  {
    url: "/insurance/tools/premium-estimator",
    title: "Commercial trucking insurance premium estimator",
    description:
      "Estimate your annual commercial-trucking insurance premium by DOT class, state, and operating profile.",
    type: "vertical",
  },
  {
    url: "/qualify",
    title: "Qualify in 3 minutes — see your funding options",
    description:
      "Soft pull, no credit impact. Match with the lender panel that fits your authority age, credit profile, and capital need.",
    type: "vertical",
  },
  {
    url: "/apply",
    title: "Apply for trucking financing",
    description:
      "Start the matching flow with Dispatched. Soft pull first; no credit impact to start.",
    type: "vertical",
  },
  {
    url: "/carriers",
    title: "Commercial trucking insurance carriers",
    description:
      "Profiles of the major commercial-trucking insurance carriers — appetite, DOT class, common limitations.",
    type: "vertical",
  },
  {
    url: "/about",
    title: "About Dispatched",
    description:
      "Who runs Dispatched, our methodology, and the partner panel of lenders and insurance producers we route to.",
    type: "vertical",
  },
  {
    url: "/methodology",
    title: "Dispatched methodology",
    description:
      "How Dispatched scores lenders and insurance carriers, how matching works, and the partner-panel disclosure.",
    type: "vertical",
  },
  {
    url: "/disclosures",
    title: "Dispatched disclosures",
    description:
      "Compensation, partner relationships, and editorial-independence disclosures.",
    type: "vertical",
  },
] as const;

/* Lender comparison pages. Mirror of the static /compare/* URLs in
   app/sitemap.ts. Each entry's title is the human-readable "A vs B" form;
   descriptions summarize the head-to-head in one sentence. */
type ComparisonEntry = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
};

const STATIC_COMPARISONS: ReadonlyArray<ComparisonEntry> = [
  {
    slug: "apex-capital-vs-ecapital",
    title: "Apex Capital vs eCapital",
    description:
      "Owner-operator factoring depth (Apex) vs mid-fleet + ABL scale (eCapital). Side-by-side rates, contracts, fuel programs.",
  },
  {
    slug: "apex-capital-vs-rts-financial",
    title: "Apex Capital vs RTS Financial",
    description:
      "Two trucking-native factors compared on owner-operator economics, fuel-card networks, and broker-credit tooling.",
  },
  {
    slug: "ecapital-vs-triumph-business-capital",
    title: "eCapital vs Triumph Business Capital",
    description:
      "Mid-fleet factoring and ABL: eCapital's broad product surface vs Triumph's non-recourse depth.",
  },
  {
    slug: "apex-capital-vs-tbs-factoring",
    title: "Apex Capital vs TBS Factoring",
    description:
      "Owner-operator factoring head-to-head — Apex on fuel discount, TBS on new-authority and post-bankruptcy onboarding.",
  },
  {
    slug: "otr-capital-vs-apex-capital",
    title: "OTR Capital vs Apex Capital",
    description:
      "Spot factoring (OTR Solutions) vs full-ledger factoring (Apex). The math when you factor selectively.",
  },
  {
    slug: "triumph-vs-rts-financial",
    title: "Triumph vs RTS Financial",
    description:
      "Triumph's non-recourse program vs RTS's high-volume fleet factoring desk.",
  },
  {
    slug: "ecapital-vs-rts-financial",
    title: "eCapital vs RTS Financial",
    description:
      "Mid-fleet factoring options: eCapital's scale + ABL vs RTS's trucking focus.",
  },
  {
    slug: "tbs-factoring-vs-triumph-business-capital",
    title: "TBS Factoring vs Triumph Business Capital",
    description:
      "New-authority and post-bankruptcy onboarding (TBS) vs non-recourse credit risk transfer (Triumph).",
  },
  {
    slug: "apex-capital-vs-truckstop-go-capital",
    title: "Apex Capital vs Truckstop Go Capital",
    description:
      "Standalone owner-operator factoring (Apex) vs integrated Truckstop-board factoring (Go Capital).",
  },
  {
    slug: "otr-capital-vs-ecapital",
    title: "OTR Capital vs eCapital",
    description:
      "Spot factoring (OTR) vs full-ledger factoring with ABL graduation (eCapital).",
  },
  {
    slug: "ecapital-vs-truckstop-go-capital",
    title: "eCapital vs Truckstop Go Capital",
    description:
      "Multi-product mid-fleet factoring (eCapital) vs load-board integrated factoring (Go Capital).",
  },
  {
    slug: "triumph-vs-otr-capital",
    title: "Triumph vs OTR Capital",
    description:
      "Non-recourse program with 12-month contract (Triumph) vs spot, month-to-month factoring (OTR).",
  },
  {
    slug: "rts-financial-vs-tbs-factoring",
    title: "RTS Financial vs TBS Factoring",
    description:
      "Mid-fleet factoring (RTS) vs new-authority onboarding specialist (TBS).",
  },
  {
    slug: "1st-commercial-credit-vs-riviera-finance",
    title: "1st Commercial Credit vs Riviera Finance",
    description:
      "Broad SMB factoring desk (1st Commercial) vs legacy in-branch factor (Riviera). Tooling and underwriting compared.",
  },
  {
    slug: "bluevine-vs-ondeck",
    title: "Bluevine vs OnDeck",
    description:
      "Online working-capital lines for SMB owner-operators — same-day decisioning compared on file profile and ceiling.",
  },
  {
    slug: "porter-freight-funding-vs-otr-solutions",
    title: "Porter Freight Funding vs OTR Solutions",
    description:
      "Bad-credit factoring (Porter) vs spot factoring with no minimum (OTR Solutions).",
  },
  {
    slug: "progressive-commercial-vs-sentry-insurance",
    title: "Progressive Commercial vs Sentry Insurance",
    description:
      "Two of the largest commercial-trucking insurance carriers compared on appetite, DOT class, and claims handling.",
  },
  {
    slug: "sentry-insurance-vs-nationwide-trucking",
    title: "Sentry Insurance vs Nationwide Trucking",
    description:
      "Mid-market trucking insurance head-to-head — pricing, fleet appetite, and risk-engineering services.",
  },
  {
    slug: "progressive-commercial-vs-nationwide-trucking",
    title: "Progressive Commercial vs Nationwide Trucking",
    description:
      "Owner-operator trucking insurance — Progressive's volume and pricing vs Nationwide's mid-fleet strength.",
  },
  {
    slug: "apex-capital-vs-triumph-business-capital",
    title: "Apex Capital vs Triumph Business Capital",
    description:
      "Owner-operator factoring (Apex) vs non-recourse risk transfer (Triumph). When the non-recourse premium pays off.",
  },
  {
    slug: "apex-capital-vs-porter-freight-funding",
    title: "Apex Capital vs Porter Freight Funding",
    description:
      "Clean-file owner-operator factoring (Apex) vs sub-580 FICO factoring (Porter).",
  },
  {
    slug: "ecapital-vs-porter-freight-funding",
    title: "eCapital vs Porter Freight Funding",
    description:
      "Mid-fleet factoring (eCapital) vs bad-credit-friendly factoring (Porter).",
  },
  {
    slug: "rts-financial-vs-otr-solutions",
    title: "RTS Financial vs OTR Solutions",
    description:
      "Full-ledger factoring (RTS) vs spot factoring (OTR Solutions). Which math fits a small fleet.",
  },
  {
    slug: "tbs-factoring-vs-otr-solutions",
    title: "TBS Factoring vs OTR Solutions",
    description:
      "New-authority onboarding (TBS) vs month-to-month spot factoring (OTR Solutions).",
  },
];

/* Research reports. Mirrors the /research/* URLs in app/sitemap.ts. */
type ResearchEntry = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
};

const STATIC_RESEARCH: ReadonlyArray<ResearchEntry> = [
  {
    slug: "best-trucking-factoring-2026",
    title: "Best trucking factoring 2026 — annual rankings",
    description:
      "Annual ranking of the top trucking factoring companies — Apex, eCapital, RTS, Triumph, TBS, OTR, and more. Methodology + scorecards.",
  },
  {
    slug: "state-of-trucking-capital-2026",
    title: "State of trucking capital 2026",
    description:
      "Annual report on the trucking-capital market — rate environment, lender appetite shifts, and where money is moving.",
  },
  {
    slug: "state-of-trucking-fuel-costs-2026",
    title: "State of trucking fuel costs 2026",
    description:
      "Diesel pricing, fuel-card networks, and the fuel-cost squeeze on owner-operator margins.",
  },
  {
    slug: "state-of-broker-relations-2026",
    title: "State of broker relations 2026",
    description:
      "Broker payment terms, days-to-pay trends, broker-bond climate, and FMCSA enforcement direction.",
  },
  {
    slug: "state-of-trucking-tech-2026",
    title: "State of trucking tech 2026",
    description:
      "ELD, TMS, dashcam, and load-board landscape. What owner-operators actually use vs what is marketed.",
  },
  {
    slug: "state-of-trucking-regulation-2026",
    title: "State of trucking regulation 2026",
    description:
      "FMCSA rulemaking, IRP/IFTA changes, state-level enforcement trends, and the AB 5 / FAAAA litigation track.",
  },
  {
    slug: "state-of-owner-operator-economics-2026",
    title: "State of owner-operator economics 2026",
    description:
      "Revenue per mile, cost per mile, deadhead, and the margin reality of independent owner-operators in 2026.",
  },
  {
    slug: "state-of-trucking-insurance-claims-2026",
    title: "State of trucking insurance claims 2026",
    description:
      "Claim frequency, severity trends, nuclear verdicts, and the underwriting response from primary-liability carriers.",
  },
  {
    slug: "state-of-commercial-trucking-insurance-2026",
    title: "State of commercial trucking insurance 2026",
    description:
      "Annual report — legal-environment shifts, commodity hotspots, AM Best context, broker market shape, FMCSA rules.",
  },
];

/* Calculators. Mirrors /calculators/* URLs in app/sitemap.ts. */
type CalculatorEntry = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
};

const STATIC_CALCULATORS: ReadonlyArray<CalculatorEntry> = [
  {
    slug: "how-much-can-i-borrow-for-a-truck",
    title: "How much can I borrow for a truck — loan estimator",
    description:
      "Estimate your truck-loan ceiling by FICO band, down-payment, and authority age. Directional fit, not a binding offer.",
  },
  {
    slug: "whats-my-factoring-rate",
    title: "What's my factoring rate — quick estimator",
    description:
      "Estimate a realistic factoring advance rate and fee by authority age, monthly volume, and broker concentration.",
  },
  {
    slug: "factoring-fee",
    title: "Factoring fee calculator",
    description:
      "Compute the dollar cost of factoring against a target advance rate, fee tier, and monthly invoice volume.",
  },
  {
    slug: "lease-vs-buy",
    title: "Lease vs buy calculator — trucking equipment",
    description:
      "Compare leasing vs buying a tractor with realistic depreciation, payment, and tax-deduction assumptions.",
  },
  {
    slug: "owner-operator-pl",
    title: "Owner-operator profit & loss calculator",
    description:
      "Build a realistic P&L for an owner-operator — revenue, fixed costs, variable costs, and break-even per mile.",
  },
  {
    slug: "truck-repair",
    title: "Truck repair loan calculator",
    description:
      "Estimate the payment, term, and rate range on a truck-repair loan based on your FICO band and repair amount.",
  },
  {
    slug: "semi-truck-loan",
    title: "Semi-truck loan calculator",
    description:
      "Estimate the monthly payment and term on a Class 8 tractor loan by truck price, down payment, and credit band.",
  },
  {
    slug: "commercial-truck-loan",
    title: "Commercial truck loan calculator",
    description:
      "General commercial-truck loan calculator covering tractors, box trucks, and vocational equipment.",
  },
  {
    slug: "dump-truck-loan",
    title: "Dump truck loan calculator",
    description:
      "Estimate dump-truck loan terms — covers Class 7/8 dumps and is tuned for vocational borrowers.",
  },
];

/* Calculators index page (the /calculators landing). */
const CALCULATORS_INDEX_ITEM: SearchableItem = {
  url: "/calculators",
  title: "Trucking finance calculators",
  description:
    "Fit estimators and decision tools — loan ceilings, factoring rates, lease vs buy, owner-operator P&L. No credit pull.",
  type: "calculator",
};

/* Lender directory index page. */
const LENDERS_INDEX_ITEM: SearchableItem = {
  url: "/lenders",
  title: "Trucking lender directory",
  description:
    "Editorial directory of trucking lenders — factoring, equipment, working capital, ABL, and insurance-premium financing.",
  type: "lender",
};

/* Blog and glossary index pages. */
const BLOG_INDEX_ITEM: SearchableItem = {
  url: "/blog",
  title: "Dispatched blog — trucking finance & operations",
  description:
    "Long-form posts on owner-operator economics, factoring, equipment financing, and trucking operations.",
  type: "blog",
};

const GLOSSARY_INDEX_ITEM: SearchableItem = {
  url: "/glossary",
  title: "Trucking finance glossary",
  description:
    "Operating authority, factoring, and operator-type terms — vocabulary every owner-operator and small fleet uses.",
  type: "glossary",
};

const RESEARCH_INDEX_ITEM: SearchableItem = {
  url: "/research",
  title: "Dispatched Research — trucking and insurance reports",
  description:
    "Annual and quarterly research reports on commercial trucking insurance, capital, fuel costs, broker relations, and more.",
  type: "research",
};

/* ---------- Index assembly ---------- */

function buildIndex(): ReadonlyArray<SearchableItem> {
  const items: SearchableItem[] = [];

  // Verticals / money pages.
  items.push(...STATIC_VERTICALS);

  // Glossary index + each term.
  items.push(GLOSSARY_INDEX_ITEM);
  for (const term of getAllTerms()) {
    items.push({
      url: `/glossary/${term.slug}`,
      title: term.abbreviation && term.abbreviation !== term.term
        ? `${term.term} (${term.abbreviation})`
        : term.term,
      description: term.shortDefinition,
      type: "glossary",
      category: CATEGORY_LABELS[term.category],
    });
  }

  // Blog index + each post.
  items.push(BLOG_INDEX_ITEM);
  for (const post of getAllPosts()) {
    items.push({
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      type: "blog",
      category: BLOG_TOPICS[post.topic],
    });
  }

  // Lender directory index + each lender + each state page.
  items.push(LENDERS_INDEX_ITEM);
  for (const lender of getAllLenders()) {
    items.push({
      url: `/lenders/${lender.slug}`,
      title: lender.name,
      description: lender.blurb,
      type: "lender",
      category: lender.types.map((t) => t).join(" · "),
    });
  }
  for (const state of STATE_INFO) {
    items.push({
      url: `/lenders/${state.slug}`,
      title: `Trucking lenders in ${state.name}`,
      description: `Factoring, equipment, and working capital lenders serving ${state.name} truckers. State-specific panel and rates.`,
      type: "city",
      category: state.name,
    });
  }

  // Comparison pages.
  for (const c of STATIC_COMPARISONS) {
    items.push({
      url: `/compare/${c.slug}`,
      title: c.title,
      description: c.description,
      type: "comparison",
    });
  }

  // Research reports.
  items.push(RESEARCH_INDEX_ITEM);
  for (const r of STATIC_RESEARCH) {
    items.push({
      url: `/research/${r.slug}`,
      title: r.title,
      description: r.description,
      type: "research",
    });
  }

  // Calculators.
  items.push(CALCULATORS_INDEX_ITEM);
  for (const c of STATIC_CALCULATORS) {
    items.push({
      url: `/calculators/${c.slug}`,
      title: c.title,
      description: c.description,
      type: "calculator",
    });
  }

  return items;
}

/* Built once per process. Frozen so callers can't mutate a shared array. */
const INDEX: ReadonlyArray<SearchableItem> = Object.freeze(buildIndex());

export function getSearchIndex(): ReadonlyArray<SearchableItem> {
  return INDEX;
}

/* ---------- Search ---------- */

/* Simple substring + token match. Sub-millisecond on ~300–500 entries.
   Scoring: title matches outrank description matches; full-substring
   matches outrank token matches. Ties broken by display order in the
   index (which preserves the order items were inserted above —
   verticals first, then glossary, blog, lenders, etc.). */

const MAX_RESULTS = 50;

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length > 0);
}

function scoreItem(item: SearchableItem, query: string, tokens: string[]): number {
  const titleLower = item.title.toLowerCase();
  const descLower = item.description.toLowerCase();
  const q = query.toLowerCase();

  let score = 0;

  // Full-query substring matches.
  if (titleLower.includes(q)) score += 100;
  if (descLower.includes(q)) score += 30;

  // Per-token matches. Every token that matches in the title scores; every
  // token that matches in the description scores less. A query of "factoring
  // fee" with both tokens hitting in the title outscores one with both
  // tokens hitting in the description.
  for (const t of tokens) {
    if (titleLower.includes(t)) score += 10;
    if (descLower.includes(t)) score += 3;
  }

  return score;
}

export function searchAll(query: string): ReadonlyArray<SearchableItem> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const tokens = tokenize(trimmed);
  if (tokens.length === 0) return [];

  const scored: { item: SearchableItem; score: number; idx: number }[] = [];
  INDEX.forEach((item, idx) => {
    const score = scoreItem(item, trimmed, tokens);
    if (score > 0) scored.push({ item, score, idx });
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.idx - b.idx;
  });

  return scored.slice(0, MAX_RESULTS).map((s) => s.item);
}
