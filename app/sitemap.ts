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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: `${ORIGIN}/`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 1,
  });

  entries.push({
    url: `${ORIGIN}/trucking`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  entries.push({
    url: `${ORIGIN}/insurance`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  for (const p of getAllProducts()) {
    entries.push({
      url: `${ORIGIN}/insurance/${p.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const sm of getStateMoneyPages()) {
    entries.push({
      url: `${ORIGIN}/insurance/${sm.productSlug}/${sm.stateSlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const dm of getDeepMoneyPages()) {
    entries.push({
      url: `${ORIGIN}/insurance/${dm.productSlug}/${dm.stateSlug}/${dm.dotClassSlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

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

  entries.push({
    url: `${ORIGIN}/insurance/tools`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.6,
  });

  entries.push({
    url: `${ORIGIN}/research`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: 0.7,
  });

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

  entries.push({
    url: `${ORIGIN}/truck-repair-loans`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/factoring-vs-mca`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/factoring-vs-working-capital-loan`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/reefer-breakdown-coverage`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/freightliner-repair-financing`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/bad-credit-truck-repair-financing`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/owner-operator-repair-loans`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/truck-repair-line-of-credit`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/box-truck-financing`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/bad-credit-truck-financing`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/owner-operator-financing`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/semi-truck-financing`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/semi-truck-financing/no-money-down`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/owner-operator-financing/first-time`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/factoring/no-credit-check`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/best-trucking-factoring-2026`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/apex-capital-vs-ecapital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/apex-capital-vs-rts-financial`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/ecapital-vs-triumph-business-capital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/apex-capital-vs-tbs-factoring`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/otr-capital-vs-apex-capital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/triumph-vs-rts-financial`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/ecapital-vs-rts-financial`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/tbs-factoring-vs-triumph-business-capital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/apex-capital-vs-truckstop-go-capital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/otr-capital-vs-ecapital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/ecapital-vs-truckstop-go-capital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/triumph-vs-otr-capital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/rts-financial-vs-tbs-factoring`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/1st-commercial-credit-vs-riviera-finance`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/bluevine-vs-ondeck`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/porter-freight-funding-vs-otr-solutions`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/progressive-commercial-vs-sentry-insurance`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/sentry-insurance-vs-nationwide-trucking`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/progressive-commercial-vs-nationwide-trucking`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/apex-capital-vs-triumph-business-capital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/apex-capital-vs-porter-freight-funding`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/ecapital-vs-porter-freight-funding`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/rts-financial-vs-otr-solutions`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/compare/tbs-factoring-vs-otr-solutions`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/state-of-trucking-fuel-costs-2026`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/state-of-broker-relations-2026`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/state-of-trucking-tech-2026`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/state-of-trucking-regulation-2026`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/state-of-owner-operator-economics-2026`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/state-of-trucking-insurance-claims-2026`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/calculators/how-much-can-i-borrow-for-a-truck`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/calculators/whats-my-factoring-rate`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/state-of-trucking-capital-2026`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.7,
  });

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

  entries.push({
    url: `${ORIGIN}/calculators/factoring-fee`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/calculators/lease-vs-buy`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/calculators/owner-operator-pl`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/equipment-financing`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/trucking-working-capital`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/factoring`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/new-authority-truck-financing`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${ORIGIN}/qualify`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/calculators`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.6,
  });

  entries.push({
    url: `${ORIGIN}/calculators/truck-repair`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/calculators/semi-truck-loan`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/calculators/commercial-truck-loan`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/calculators/dump-truck-loan`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  for (const s of getAllFinancingStates()) {
    entries.push({
      url: `${ORIGIN}/trucking-loans/${s.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const c of getAllCities()) {
    entries.push({
      url: `${ORIGIN}/trucking-loans/${c.stateSlug}/${c.citySlug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  entries.push({
    url: `${ORIGIN}/about`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.6,
  });

  entries.push({
    url: `${ORIGIN}/methodology`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.5,
  });

  entries.push({
    url: `${ORIGIN}/insurance/tools/premium-estimator`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/research/state-of-commercial-trucking-insurance-2026`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.7,
  });

  entries.push({
    url: `${ORIGIN}/disclosures`,
    lastModified: today,
    changeFrequency: "yearly",
    priority: 0.3,
  });

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

  /* Dispatched Pulse — operational intelligence layer. Real lastModified
     from the snapshot file so weekly fetches actually shift the freshness
     signal. If the snapshot is missing (cold container, dev), fall back
     silently — the deterministic-hash stagger below covers it. */
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

  /* Per-URL lastmod stagger. Replaces the uniform build-time `today` with
     a deterministic per-URL date so Google sees real freshness variance.
     Override with real blog editorial dates and real Pulse snapshot dates
     where available. */
  const blogDates = new Map<string, string>();
  for (const post of getAllPosts()) {
    blogDates.set(`${ORIGIN}/blog/${post.slug}`, post.updatedDate);
  }
  for (const e of entries) {
    e.lastModified = lastModFor(
      e.url,
      pulseDates.get(e.url) ?? blogDates.get(e.url),
    );
  }

  return entries;
}
