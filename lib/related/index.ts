import "server-only";

/* ===========================================================================
   Related-content recommendation engine for Dispatched.finance.

   Pure-function, deterministic scoring across the full content corpus:
     - Glossary terms (lib/data/glossary)
     - Blog posts (lib/data/blog)
     - Comparisons, research reports, and calculators (STATIC_ITEMS below)

   Callers pass in the context of the current page — its URL (for exclusion),
   the glossary slugs and Dispatched product URLs it references, an optional
   topic hint, and the current page's content type — and receive a ranked,
   deduplicated ReadonlyArray of cross-type RelatedItem cards.

   Architecture notes
   ------------------
   1. Scoring is additive and integer-valued so the ordering is stable. We
      tiebreak by type priority (comparison > research > calculator > blog >
      glossary > vertical) and then alphabetic slug so two equally-scored
      items always sort the same way across requests.
   2. Comparisons / research / calculators do not live in a typed data file
      yet, so we hardcode the registry here. When those move into typed
      data, swap the STATIC_ITEMS source and the rest of the engine keeps
      working.
   3. Topic alignment is fuzzy: glossary categories map to a coarse topic
      string compatible with BlogTopic so we can score cross-type matches
      against a single topic field.
   =========================================================================== */

import { getAllPosts, type BlogPost, type BlogTopic } from "@/lib/data/blog";
import {
  getAllTerms,
  type GlossaryCategory,
  type GlossaryTerm,
} from "@/lib/data/glossary";

export type RelatedItemType =
  | "glossary"
  | "blog"
  | "comparison"
  | "research"
  | "calculator"
  | "vertical";

export type RelatedItem = {
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly type: RelatedItemType;
};

export type RelatedQuery = {
  /** Exclude this URL from results. Required so a page never recommends itself. */
  readonly currentUrl: string;
  /** Glossary slugs the current page references. */
  readonly glossarySlugs?: ReadonlyArray<string>;
  /** Dispatched product URLs the current page references. */
  readonly productUrls?: ReadonlyArray<string>;
  /** Optional topic hint. Use a BlogTopic value for tightest matches; arbitrary strings still match the static registry. */
  readonly topic?: string;
  /** Current page's content type (used for type-aware scoring). */
  readonly type?: RelatedItemType;
  /** Slugs (without the /blog/ prefix) to exclude — e.g. a blog post's existing relatedPosts. */
  readonly excludeBlogSlugs?: ReadonlyArray<string>;
  /** Default 6. */
  readonly limit?: number;
};

/* ---------------------------------------------------------------------------
   Static registry — comparisons (24), research (9), calculators (5)

   Each entry carries the glossary refs and topic it covers so the engine can
   score it against the query without re-reading the page content. This is
   the smallest viable wiring; refactor into typed data when the registry
   grows past ~50 items.
   --------------------------------------------------------------------------- */

type StaticItem = RelatedItem & {
  readonly glossaryRefs: ReadonlyArray<string>;
  readonly productRefs: ReadonlyArray<string>;
  readonly topic: BlogTopic;
};

const STATIC_ITEMS: ReadonlyArray<StaticItem> = [
  // -------- Research (9) --------
  {
    url: "/research/best-trucking-factoring-2026",
    title: "Best trucking factoring companies of 2026",
    description:
      "Honest 2026 ranking of 12 freight factors by rate, contract, funding speed, and bad-credit acceptance.",
    type: "research",
    glossaryRefs: [
      "recourse-factoring",
      "non-recourse-factoring",
      "advance-rate",
    ],
    productRefs: [
      "/factoring",
      "/factoring/no-credit-check",
    ],
    topic: "factoring-and-cash-flow",
  },
  {
    url: "/research/state-of-trucking-capital-2026",
    title: "State of Trucking Capital 2026",
    description:
      "Where the trucking-finance panel sits in 2026 — factoring, working capital, equipment, insurance premium financing.",
    type: "research",
    glossaryRefs: [
      "recourse-factoring",
      "non-recourse-factoring",
      "advance-rate",
      "mc-number",
      "dot-number",
    ],
    productRefs: [
      "/factoring",
      "/trucking-working-capital",
      "/equipment-financing",
      "/owner-operator-financing/first-time",
    ],
    topic: "industry-trends",
  },
  {
    url: "/research/state-of-commercial-trucking-insurance-2026",
    title: "State of Commercial Trucking Insurance 2026",
    description:
      "Premium trends, CSA-score impact, nuclear-verdict pressure, and what shifted on the trucking insurance market in 2026.",
    type: "research",
    glossaryRefs: [
      "primary-liability",
      "motor-truck-cargo",
      "non-trucking-liability",
      "am-best",
      "csa-score",
      "premium-financing",
    ],
    productRefs: ["/insurance"],
    topic: "insurance-and-risk",
  },
  {
    url: "/research/state-of-trucking-insurance-claims-2026",
    title: "State of Trucking Insurance Claims 2026",
    description:
      "Claim frequency, severity trends, denial drivers, and what every owner-operator should know before binding.",
    type: "research",
    glossaryRefs: [
      "primary-liability",
      "motor-truck-cargo",
      "csa-score",
      "am-best",
    ],
    productRefs: ["/insurance"],
    topic: "insurance-and-risk",
  },
  {
    url: "/research/state-of-owner-operator-economics-2026",
    title: "State of Owner-Operator Economics 2026",
    description:
      "Revenue, costs, and net per truck across operator stages — the working economics of a one-truck operation in 2026.",
    type: "research",
    glossaryRefs: [
      "cpm",
      "rpm",
      "deadhead",
      "owner-operator",
      "lease-purchase",
      "per-diem",
    ],
    productRefs: [
      "/owner-operator-financing",
      "/owner-operator-financing/first-time",
    ],
    topic: "owner-operator-economics",
  },
  {
    url: "/research/state-of-broker-relations-2026",
    title: "State of Broker Relations 2026",
    description:
      "Broker concentration, pay terms, and credit-risk patterns across the 2026 freight market.",
    type: "research",
    glossaryRefs: [
      "broker-spread",
      "recourse-factoring",
      "non-recourse-factoring",
      "all-in-rate",
    ],
    productRefs: ["/factoring"],
    topic: "industry-trends",
  },
  {
    url: "/research/state-of-trucking-fuel-costs-2026",
    title: "State of Trucking Fuel Costs 2026",
    description:
      "Diesel, MPG, fuel-card economics, and the math of fuel discipline on a Class 8 operation.",
    type: "research",
    glossaryRefs: ["cpm", "rpm", "deadhead"],
    productRefs: [
      "/factoring",
      "/trucking-working-capital",
    ],
    topic: "industry-trends",
  },
  {
    url: "/research/state-of-trucking-regulation-2026",
    title: "State of Trucking Regulation 2026",
    description:
      "FMCSA, ELD, AB5, CSA, and the regulatory shifts shaping owner-operator economics in 2026.",
    type: "research",
    glossaryRefs: [
      "mc-number",
      "dot-number",
      "boc-3",
      "irp",
      "ifta",
      "ucr",
      "csa-score",
    ],
    productRefs: [
      "/new-authority-truck-financing",
      "/owner-operator-financing/first-time",
    ],
    topic: "operations-and-compliance",
  },
  {
    url: "/research/state-of-trucking-tech-2026",
    title: "State of Trucking Tech 2026",
    description:
      "ELDs, telematics, dispatch software, and the technology stack underneath a modern owner-operator.",
    type: "research",
    glossaryRefs: ["csa-score"],
    productRefs: [],
    topic: "industry-trends",
  },

  // -------- Calculators (5) --------
  {
    url: "/calculators/owner-operator-pl",
    title: "Owner-operator P&L calculator",
    description:
      "Estimate weekly net income — rate per mile, miles, fuel, fixed costs, factoring fee, and breakeven miles.",
    type: "calculator",
    glossaryRefs: ["cpm", "rpm", "deadhead", "broker-spread", "owner-operator"],
    productRefs: [
      "/owner-operator-financing",
      "/owner-operator-financing/first-time",
    ],
    topic: "owner-operator-economics",
  },
  {
    url: "/calculators/factoring-fee",
    title: "Factoring fee calculator",
    description:
      "Translate advertised factoring rate into effective cost per invoice and per month after fees and fuel offsets.",
    type: "calculator",
    glossaryRefs: [
      "recourse-factoring",
      "non-recourse-factoring",
      "advance-rate",
    ],
    productRefs: ["/factoring"],
    topic: "factoring-and-cash-flow",
  },
  {
    url: "/calculators/whats-my-factoring-rate",
    title: "What's my factoring rate?",
    description:
      "Estimate where you'll price on the factoring panel based on volume, broker mix, authority age, and credit.",
    type: "calculator",
    glossaryRefs: [
      "recourse-factoring",
      "non-recourse-factoring",
      "advance-rate",
    ],
    productRefs: ["/factoring"],
    topic: "factoring-and-cash-flow",
  },
  {
    url: "/calculators/how-much-can-i-borrow-for-a-truck",
    title: "How much can I borrow for a truck?",
    description:
      "Estimate maximum truck financing based on credit, time in business, and authority age.",
    type: "calculator",
    glossaryRefs: ["owner-operator", "mc-number"],
    productRefs: [
      "/semi-truck-financing",
      "/owner-operator-financing",
      "/owner-operator-financing/first-time",
    ],
    topic: "equipment-and-financing",
  },
  {
    url: "/calculators/lease-vs-buy",
    title: "Lease vs buy calculator",
    description:
      "Side-by-side total cost — lease-purchase vs traditional equipment financing with failure-rate adjustment.",
    type: "calculator",
    glossaryRefs: ["lease-purchase", "owner-operator"],
    productRefs: [
      "/semi-truck-financing",
      "/owner-operator-financing/first-time",
    ],
    topic: "equipment-and-financing",
  },

  // -------- Comparisons (24) --------
  // Factoring shootouts
  ...factoringComparison(
    "apex-capital-vs-ecapital",
    "Apex Capital vs eCapital",
  ),
  ...factoringComparison(
    "apex-capital-vs-porter-freight-funding",
    "Apex Capital vs Porter Freight Funding",
  ),
  ...factoringComparison(
    "apex-capital-vs-rts-financial",
    "Apex Capital vs RTS Financial",
  ),
  ...factoringComparison(
    "apex-capital-vs-tbs-factoring",
    "Apex Capital vs TBS Factoring",
  ),
  ...factoringComparison(
    "apex-capital-vs-triumph-business-capital",
    "Apex Capital vs Triumph Business Capital",
  ),
  ...factoringComparison(
    "apex-capital-vs-truckstop-go-capital",
    "Apex Capital vs Truckstop Go Capital",
  ),
  ...factoringComparison(
    "ecapital-vs-porter-freight-funding",
    "eCapital vs Porter Freight Funding",
  ),
  ...factoringComparison(
    "ecapital-vs-rts-financial",
    "eCapital vs RTS Financial",
  ),
  ...factoringComparison(
    "ecapital-vs-triumph-business-capital",
    "eCapital vs Triumph Business Capital",
  ),
  ...factoringComparison(
    "ecapital-vs-truckstop-go-capital",
    "eCapital vs Truckstop Go Capital",
  ),
  ...factoringComparison(
    "otr-capital-vs-apex-capital",
    "OTR Capital vs Apex Capital",
  ),
  ...factoringComparison(
    "otr-capital-vs-ecapital",
    "OTR Capital vs eCapital",
  ),
  ...factoringComparison(
    "porter-freight-funding-vs-otr-solutions",
    "Porter Freight Funding vs OTR Solutions",
  ),
  ...factoringComparison(
    "rts-financial-vs-otr-solutions",
    "RTS Financial vs OTR Solutions",
  ),
  ...factoringComparison(
    "rts-financial-vs-tbs-factoring",
    "RTS Financial vs TBS Factoring",
  ),
  ...factoringComparison(
    "tbs-factoring-vs-otr-solutions",
    "TBS Factoring vs OTR Solutions",
  ),
  ...factoringComparison(
    "tbs-factoring-vs-triumph-business-capital",
    "TBS Factoring vs Triumph Business Capital",
  ),
  ...factoringComparison(
    "triumph-vs-otr-capital",
    "Triumph vs OTR Capital",
  ),
  ...factoringComparison(
    "triumph-vs-rts-financial",
    "Triumph vs RTS Financial",
  ),
  ...factoringComparison(
    "1st-commercial-credit-vs-riviera-finance",
    "1st Commercial Credit vs Riviera Finance",
  ),
  // Working-capital comparison
  {
    url: "/compare/bluevine-vs-ondeck",
    title: "BlueVine vs OnDeck",
    description:
      "Two working-capital lenders compared on APR, term length, advance speed, and qualification thresholds.",
    type: "comparison",
    glossaryRefs: [],
    productRefs: ["/trucking-working-capital"],
    topic: "factoring-and-cash-flow",
  },
  // Insurance comparisons
  {
    url: "/compare/progressive-commercial-vs-nationwide-trucking",
    title: "Progressive Commercial vs Nationwide Trucking",
    description:
      "Premium ranges, coverage depth, claims handling, and which profile each carrier prices best for.",
    type: "comparison",
    glossaryRefs: [
      "primary-liability",
      "motor-truck-cargo",
      "am-best",
      "csa-score",
    ],
    productRefs: ["/insurance"],
    topic: "insurance-and-risk",
  },
  {
    url: "/compare/progressive-commercial-vs-sentry-insurance",
    title: "Progressive Commercial vs Sentry Insurance",
    description:
      "Trucking insurance head-to-head: pricing posture, A-rated stability, and underwriting appetite.",
    type: "comparison",
    glossaryRefs: [
      "primary-liability",
      "motor-truck-cargo",
      "am-best",
      "csa-score",
    ],
    productRefs: ["/insurance"],
    topic: "insurance-and-risk",
  },
  {
    url: "/compare/sentry-insurance-vs-nationwide-trucking",
    title: "Sentry Insurance vs Nationwide Trucking",
    description:
      "A-rated carriers compared on commercial trucking pricing, fleet appetite, and claims service.",
    type: "comparison",
    glossaryRefs: [
      "primary-liability",
      "motor-truck-cargo",
      "am-best",
      "csa-score",
    ],
    productRefs: ["/insurance"],
    topic: "insurance-and-risk",
  },
];

/** Shorthand factory for the 20 trucking-factor head-to-head pages — same tag set, only the slug and title differ. */
function factoringComparison(
  slug: string,
  title: string,
): ReadonlyArray<StaticItem> {
  return [
    {
      url: `/compare/${slug}`,
      title,
      description:
        "Rate, contract, advance, funding speed, fuel program, and recourse posture compared side by side.",
      type: "comparison",
      glossaryRefs: [
        "recourse-factoring",
        "non-recourse-factoring",
        "advance-rate",
      ],
      productRefs: [
        "/factoring",
        "/factoring/no-credit-check",
      ],
      topic: "factoring-and-cash-flow",
    },
  ];
}

/* ---------------------------------------------------------------------------
   Topic + category alignment

   Glossary entries don't carry a BlogTopic — they carry a GlossaryCategory.
   We map the categories onto the BlogTopic taxonomy so cross-type scoring
   against a single topic hint can work uniformly.
   --------------------------------------------------------------------------- */

const CATEGORY_TO_TOPIC: Record<GlossaryCategory, BlogTopic> = {
  "operating-authority-compliance": "operations-and-compliance",
  "factoring-cash-flow": "factoring-and-cash-flow",
  "operator-types": "owner-operator-economics",
  "trucking-operations": "operations-and-compliance",
  "trucking-finance": "equipment-and-financing",
  "insurance-and-risk": "insurance-and-risk",
  "driver-life-work": "owner-operator-economics",
  "tax-and-accounting": "owner-operator-economics",
  "tech-and-telematics": "industry-trends",
};

/* ---------------------------------------------------------------------------
   Scoring primitives

   Set intersection counts. We work in arrays because the inputs are always
   small (<10 elements) — no need to allocate a Set.
   --------------------------------------------------------------------------- */

function overlapCount(
  a: ReadonlyArray<string>,
  b: ReadonlyArray<string>,
): number {
  if (a.length === 0 || b.length === 0) return 0;
  let count = 0;
  for (const x of a) {
    if (b.includes(x)) count += 1;
  }
  return count;
}

const TYPE_PRIORITY: Record<RelatedItemType, number> = {
  comparison: 1,
  research: 2,
  calculator: 3,
  blog: 4,
  glossary: 5,
  vertical: 6,
};

type Scored = { readonly item: RelatedItem; readonly score: number };

/* ---------------------------------------------------------------------------
   Public API
   --------------------------------------------------------------------------- */

export function getRelatedContent(
  query: RelatedQuery,
): ReadonlyArray<RelatedItem> {
  const limit = query.limit ?? 6;
  const currentUrl = query.currentUrl;
  const glossarySlugs = query.glossarySlugs ?? [];
  const productUrls = query.productUrls ?? [];
  const topic = query.topic;
  const excludeBlogSlugs = new Set(query.excludeBlogSlugs ?? []);

  const scored: Array<Scored> = [];

  // --- Score glossary terms -------------------------------------------------
  for (const term of getAllTerms()) {
    const url = `/glossary/${term.slug}`;
    if (url === currentUrl) continue;
    const score = scoreGlossary(term, glossarySlugs, topic);
    if (score <= 0) continue;
    scored.push({
      item: {
        url,
        title: term.term,
        description: term.shortDefinition,
        type: "glossary",
      },
      score,
    });
  }

  // --- Score blog posts -----------------------------------------------------
  for (const post of getAllPosts()) {
    const url = `/blog/${post.slug}`;
    if (url === currentUrl) continue;
    if (excludeBlogSlugs.has(post.slug)) continue;
    const score = scoreBlog(post, glossarySlugs, productUrls, topic);
    if (score <= 0) continue;
    scored.push({
      item: {
        url,
        title: post.title,
        description: post.subhead,
        type: "blog",
      },
      score,
    });
  }

  // --- Score static items (comparisons / research / calculators) -----------
  for (const s of STATIC_ITEMS) {
    if (s.url === currentUrl) continue;
    const score = scoreStatic(s, glossarySlugs, productUrls, topic);
    if (score <= 0) continue;
    scored.push({
      item: {
        url: s.url,
        title: s.title,
        description: s.description,
        type: s.type,
      },
      score,
    });
  }

  // --- Rank, deterministically, then trim ----------------------------------
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const pa = TYPE_PRIORITY[a.item.type];
    const pb = TYPE_PRIORITY[b.item.type];
    if (pa !== pb) return pa - pb;
    return a.item.url.localeCompare(b.item.url);
  });

  return scored.slice(0, limit).map((s) => s.item);
}

/* ---------------------------------------------------------------------------
   Per-type scorers
   --------------------------------------------------------------------------- */

function scoreGlossary(
  term: GlossaryTerm,
  glossarySlugs: ReadonlyArray<string>,
  topic: string | undefined,
): number {
  let score = 0;
  // 1 point per shared related-term link with the query's glossary refs.
  score += overlapCount(term.relatedTerms, glossarySlugs);
  // 2 points if the term is directly named in the query.
  if (glossarySlugs.includes(term.slug)) score += 2;
  // Category alignment with a topic hint is a cheap 1-point bump.
  if (topic && CATEGORY_TO_TOPIC[term.category] === topic) score += 1;
  return score;
}

function scoreBlog(
  post: BlogPost,
  glossarySlugs: ReadonlyArray<string>,
  productUrls: ReadonlyArray<string>,
  topic: string | undefined,
): number {
  let score = 0;
  // 2 points per shared glossary slug in the post's relatedGlossary.
  score += 2 * overlapCount(post.relatedGlossary, glossarySlugs);
  // 1 point per shared product URL.
  const postProducts = post.relatedProducts.map((rp) => rp.url);
  score += overlapCount(postProducts, productUrls);
  // 3 points if the topic matches exactly.
  if (topic && post.topic === topic) score += 3;
  return score;
}

function scoreStatic(
  s: StaticItem,
  glossarySlugs: ReadonlyArray<string>,
  productUrls: ReadonlyArray<string>,
  topic: string | undefined,
): number {
  let score = 0;
  // 2 points per shared glossary ref.
  score += 2 * overlapCount(s.glossaryRefs, glossarySlugs);
  // 2 points per shared product URL (these registry items are explicitly product-aligned).
  score += 2 * overlapCount(s.productRefs, productUrls);
  // 3 points for exact topic match.
  if (topic && s.topic === topic) score += 3;
  return score;
}
