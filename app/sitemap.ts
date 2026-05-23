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

const ORIGIN = "https://dispatched.finance";

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
     - lastModified uses build-time date for static editorial; a per-page
       lastUpdated field is the v3 upgrade once editorial bodies carry it.
   =========================================================================== */

export default function sitemap(): MetadataRoute.Sitemap {
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

  return entries;
}
