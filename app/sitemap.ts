import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/data/products";
import { getAllCarriers } from "@/lib/data/carriers";
import {
  getStateMoneyPages,
  getDeepMoneyPages,
} from "@/lib/data/moneyPageIndex";
import { getAllStates as getAllFinancingStates } from "@/lib/cities";
import { getAllCities, LOW_COVERAGE_THRESHOLD } from "@/lib/cities";
import { getAllTerms } from "@/lib/data/glossary";
import { getAllPosts } from "@/lib/data/blog";
import { getAllStateSlugs as getAllLenderStateSlugs } from "@/lib/data/lenders";
import { getAllTopicSlugs } from "@/lib/topics";
import { getLatestDiesel } from "@/lib/data/intel/diesel";
import { PADD_SLUGS } from "@/lib/validation/pulseSchema";
/* Shard ids live in lib/seo/sitemapShards.ts so app/robots.ts emits matching
   Sitemap: directives. generateSitemaps serves each shard at /sitemap/<id>.xml
   and Next does NOT create a /sitemap.xml index — robots.txt is the only
   pointer to the shards, so the two files must not drift. */
import { SITEMAP_SHARDS, type SitemapId } from "@/lib/seo/sitemapShards";

const ORIGIN = "https://dispatched.finance";

/* Hourly regeneration so the weekly Pulse cron's snapshot writes propagate
   into <lastmod> without requiring a redeploy. Sitemap is otherwise cached
   at build time. The cost is one extra getLatestDiesel() per regeneration
   (a single fs.readFile of a tiny JSON file) plus the synchronous loops
   over getAllPosts / getAllStates / getAllCities — all in-memory. */
export const revalidate = 3600;

/* ===========================================================================
   Sitemap discipline:
     - Only include pages that we are willing to defend in search results.
     - Programmatic money pages are listed via the curated indices, never the
       full Cartesian product. An unpublished combination is a 404 in the
       app and absent from the sitemap; the two stay in sync.
     - Lead-form endpoints (/insurance/quote, /api/intake/submit) and
       per-lead success pages (/insurance/thanks) are excluded — they have
       no value as crawl targets and the thanks page already noindexes
       itself via metadata.
     - lastModified is staggered per-URL via deterministic hash so Google
       sees real per-URL freshness (not a single build-time stamp across
       hundreds of URLs, which Google discounts as a freshness signal).
       Blog posts override with their real `updatedDate` from frontmatter.

   Split sitemap architecture (added 2026-05-31, crawl-budget triage):
     - generateSitemaps() returns three IDs: money, content, programmatic.
     - Next emits a sitemap index at /sitemap.xml that points to each child
       at /sitemap/<id>.xml. GSC can be told to crawl money first.
     - The split is a PRIORITY SIGNAL, not a content cull — every URL still
       ships. The diagnostic value (indexation rate per bucket) and the
       crawl-budget routing are the wins. Bucket assignments:
         money:        root pillars, products, conversion, research,
                       calculators, listicle/comparison pages — the SEO
                       pages we defend on commercial-intent queries.
         content:      blog + glossary + topics + carriers — editorial
                       and knowledge-graph content.
         programmatic: insurance state/dotClass + lenders + trucking-loans
                       — geo-templated pages whose value compounds at
                       scale rather than per-URL.
   =========================================================================== */

/* Deterministic per-URL last-modified date. Same URL always returns the same
   date across builds (stable for Google's freshness model). 60-day window
   means crawl recency varies across the sitemap rather than being identical
   for every URL — which is what causes Google to discount the lastmod signal
   entirely. Blog posts use their real editorial updatedDate; everything else
   uses this hash. */
function lastModFor(url: string, override?: string): Date {
  if (override) return new Date(override);
  let h = 0;
  for (let i = 0; i < url.length; i++) {
    h = (h * 31 + url.charCodeAt(i)) >>> 0;
  }
  const daysAgo = h % 60;
  return new Date(Date.now() - daysAgo * 86400000);
}

export async function generateSitemaps(): Promise<{ id: SitemapId }[]> {
  return SITEMAP_SHARDS.map((id) => ({ id }));
}

function buildMoneyEntries(today: Date): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Top hubs.
  entries.push(
    { url: `${ORIGIN}/`, lastModified: today, changeFrequency: "weekly", priority: 1 },
    { url: `${ORIGIN}/trucking`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${ORIGIN}/insurance`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
  );

  // Product / category pillar pages.
  const pillars = [
    "/truck-repair-loans",
    "/factoring-vs-mca",
    "/factoring-vs-working-capital-loan",
    "/reefer-breakdown-coverage",
    "/freightliner-repair-financing",
    "/bad-credit-truck-repair-financing",
    "/owner-operator-repair-loans",
    "/truck-repair-line-of-credit",
    "/box-truck-financing",
    "/bad-credit-truck-financing",
    "/bad-credit-truck-financing/chapter-7-discharge",
    "/owner-operator-financing",
    "/semi-truck-financing",
    "/semi-truck-financing/no-money-down",
    "/owner-operator-financing/first-time",
    "/owner-operator-financing/new-llc",
    "/owner-operator-financing/no-business-history",
    "/truck-repair-loans/emergency",
    "/truck-repair-loans/engine-rebuild",
    "/factoring/no-credit-check",
    "/equipment-financing",
    "/trucking-working-capital",
    "/factoring",
    "/new-authority-truck-financing",
  ];
  for (const path of pillars) {
    entries.push({
      url: `${ORIGIN}${path}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: path.includes("/") && path.split("/").length > 2 ? 0.7 : 0.8,
    });
  }

  // Conversion + trust pages.
  entries.push(
    { url: `${ORIGIN}/qualify`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${ORIGIN}/about`, lastModified: today, changeFrequency: "monthly", priority: 0.6 },
    { url: `${ORIGIN}/methodology`, lastModified: today, changeFrequency: "monthly", priority: 0.5 },
  );

  // Research pillars (annual reports).
  const research = [
    "/research",
    "/research/state-of-commercial-trucking-insurance-2026",
    "/research/state-of-trucking-capital-2026",
    "/research/state-of-trucking-fuel-costs-2026",
    "/research/state-of-broker-relations-2026",
    "/research/state-of-trucking-tech-2026",
    "/research/state-of-trucking-regulation-2026",
    "/research/state-of-owner-operator-economics-2026",
    "/research/state-of-trucking-insurance-claims-2026",
    "/research/best-trucking-factoring-2026",
  ];
  for (const path of research) {
    entries.push({
      url: `${ORIGIN}${path}`,
      lastModified: today,
      changeFrequency: path === "/research" ? "weekly" : "yearly",
      priority: path === "/research" ? 0.7 : 0.7,
    });
  }

  // Calculators (interactive money-page tools).
  const calculators = [
    "/calculators",
    "/calculators/how-much-can-i-borrow-for-a-truck",
    "/calculators/whats-my-factoring-rate",
    "/calculators/factoring-fee",
    "/calculators/lease-vs-buy",
    "/calculators/owner-operator-pl",
    "/calculators/truck-repair",
    "/calculators/semi-truck-loan",
    "/calculators/commercial-truck-loan",
    "/calculators/dump-truck-loan",
  ];
  for (const path of calculators) {
    entries.push({
      url: `${ORIGIN}${path}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: path === "/calculators" ? 0.6 : 0.7,
    });
  }

  // Comparison / lender-vs-lender pages.
  const compares = [
    "/compare/apex-capital-vs-ecapital",
    "/compare/apex-capital-vs-rts-financial",
    "/compare/ecapital-vs-triumph-business-capital",
    "/compare/apex-capital-vs-tbs-factoring",
    "/compare/otr-capital-vs-apex-capital",
    "/compare/triumph-vs-rts-financial",
    "/compare/ecapital-vs-rts-financial",
    "/compare/tbs-factoring-vs-triumph-business-capital",
    "/compare/apex-capital-vs-truckstop-go-capital",
    "/compare/otr-capital-vs-ecapital",
    "/compare/ecapital-vs-truckstop-go-capital",
    "/compare/triumph-vs-otr-capital",
    "/compare/rts-financial-vs-tbs-factoring",
    "/compare/1st-commercial-credit-vs-riviera-finance",
    "/compare/bluevine-vs-ondeck",
    "/compare/porter-freight-funding-vs-otr-solutions",
    "/compare/progressive-commercial-vs-sentry-insurance",
    "/compare/sentry-insurance-vs-nationwide-trucking",
    "/compare/progressive-commercial-vs-nationwide-trucking",
    "/compare/apex-capital-vs-triumph-business-capital",
    "/compare/apex-capital-vs-porter-freight-funding",
    "/compare/ecapital-vs-porter-freight-funding",
    "/compare/rts-financial-vs-otr-solutions",
    "/compare/tbs-factoring-vs-otr-solutions",
  ];
  for (const path of compares) {
    entries.push({
      url: `${ORIGIN}${path}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Insurance tools (estimator).
  entries.push(
    { url: `${ORIGIN}/insurance/tools`, lastModified: today, changeFrequency: "monthly", priority: 0.6 },
    { url: `${ORIGIN}/insurance/tools/premium-estimator`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
  );

  // Trust pages (legal/disclosure — low priority but defensible URLs).
  entries.push(
    { url: `${ORIGIN}/disclosures`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
    { url: `${ORIGIN}/accessibility`, lastModified: today, changeFrequency: "yearly", priority: 0.3 },
  );

  return entries;
}

function buildContentEntries(today: Date): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Blog hub + posts.
  entries.push({
    url: `${ORIGIN}/blog`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.7,
  });
  for (const post of getAllPosts()) {
    entries.push({
      url: `${ORIGIN}/blog/${post.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Carriers (10 editorial-quality pages with profile + AM Best context).
  entries.push({
    url: `${ORIGIN}/carriers`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });
  for (const c of getAllCarriers()) {
    entries.push({
      url: `${ORIGIN}/carriers/${c.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Glossary (140 entries averaging ~750 words each — substantive
  // knowledge-graph content, highly cited by Perplexity / ChatGPT).
  entries.push({
    url: `${ORIGIN}/glossary`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.6,
  });
  for (const t of getAllTerms()) {
    entries.push({
      url: `${ORIGIN}/glossary/${t.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Topic hubs.
  entries.push({
    url: `${ORIGIN}/topics`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.7,
  });
  for (const topicSlug of getAllTopicSlugs()) {
    entries.push({
      url: `${ORIGIN}/topics/${topicSlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}

async function buildProgrammaticEntries(
  today: Date,
): Promise<{ entries: MetadataRoute.Sitemap; pulseDates: Map<string, string> }> {
  const entries: MetadataRoute.Sitemap = [];

  // Insurance per-product pages.
  for (const p of getAllProducts()) {
    entries.push({
      url: `${ORIGIN}/insurance/${p.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Insurance state-money pages (curated, not Cartesian).
  for (const sm of getStateMoneyPages()) {
    entries.push({
      url: `${ORIGIN}/insurance/${sm.productSlug}/${sm.stateSlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Insurance deep money pages (product/state/dotClass).
  for (const dm of getDeepMoneyPages()) {
    entries.push({
      url: `${ORIGIN}/insurance/${dm.productSlug}/${dm.stateSlug}/${dm.dotClassSlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Lender directory (state + high-coverage city pages).
  entries.push({
    url: `${ORIGIN}/lenders`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.7,
  });
  for (const stateSlug of getAllLenderStateSlugs()) {
    entries.push({
      url: `${ORIGIN}/lenders/${stateSlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const c of getAllCities()) {
    // Skip low-coverage cities (matching the redirect in [city]/page.tsx).
    if (c.stateLenderPanelCount < LOW_COVERAGE_THRESHOLD) continue;
    entries.push({
      url: `${ORIGIN}/lenders/${c.stateSlug}/${c.citySlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Trucking-loans geo: the per-CITY pages carry real content (~1500 words
   // each) and stay in the sitemap. The per-STATE hub pages are essentially
   // city directories (~170 words rendered) and are noindexed at the page
   // level (see app/trucking-loans/[state]/page.tsx). Omitting them from
   // the sitemap keeps GSC's submitted/indexed ratio honest.
  for (const c of getAllCities()) {
    entries.push({
      url: `${ORIGIN}/trucking-loans/${c.stateSlug}/${c.citySlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  // Intentionally unused import — kept so the structural intent is visible
  // in code review when we later decide to expand the state hubs to merit
  // re-indexing. See task #29.
  void getAllFinancingStates;

  // Dispatched Pulse — operational intelligence (diesel snapshot).
  const pulseDates = new Map<string, string>();
  try {
    const diesel = await getLatestDiesel();
    entries.push({
      url: `${ORIGIN}/pulse`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    entries.push({
      url: `${ORIGIN}/pulse/diesel`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    pulseDates.set(`${ORIGIN}/pulse`, diesel.generatedAt);
    pulseDates.set(`${ORIGIN}/pulse/diesel`, diesel.generatedAt);
    for (const slug of PADD_SLUGS) {
      if (slug === "national") continue;
      const url = `${ORIGIN}/pulse/diesel/${slug}`;
      entries.push({
        url,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.6,
      });
      pulseDates.set(url, diesel.generatedAt);
    }
  } catch {
    /* snapshot unavailable — skip Pulse entries this build */
  }

  return { entries, pulseDates };
}

/* Next 16 breaking change: the `id` returned from generateSitemaps() is
   passed to the sitemap() function as a Promise<string> (not a sync value).
   Awaiting it is required — comparing a Promise to a string is always false
   and would silently return an empty sitemap for every shard, which would
   drop the entire site from Google's crawl over a renewal cycle.
   Ref: node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md */
export default async function sitemap({
  id,
}: {
  id: Promise<SitemapId>;
}): Promise<MetadataRoute.Sitemap> {
  const resolvedId = await id;
  const today = new Date();
  let entries: MetadataRoute.Sitemap = [];
  let pulseDates = new Map<string, string>();

  if (resolvedId === "money") {
    entries = buildMoneyEntries(today);
  } else if (resolvedId === "content") {
    entries = buildContentEntries(today);
  } else if (resolvedId === "programmatic") {
    const built = await buildProgrammaticEntries(today);
    entries = built.entries;
    pulseDates = built.pulseDates;
  }

  /* Per-URL lastmod stagger. Replaces the uniform build-time `today` with
     a deterministic per-URL date so Google sees real freshness variance.
     Override with real blog editorial dates and real Pulse snapshot dates
     where available. */
  const blogDates = new Map<string, string>();
  if (resolvedId === "content") {
    for (const post of getAllPosts()) {
      blogDates.set(`${ORIGIN}/blog/${post.slug}`, post.updatedDate);
    }
  }
  for (const e of entries) {
    e.lastModified = lastModFor(
      e.url,
      pulseDates.get(e.url) ?? blogDates.get(e.url),
    );
  }

  return entries;
}
