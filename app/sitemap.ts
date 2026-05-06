import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/data/products";
import { getAllCarriers } from "@/lib/data/carriers";
import {
  getStateMoneyPages,
  getDeepMoneyPages,
} from "@/lib/data/moneyPageIndex";
import { getAllStates as getAllFinancingStates } from "@/lib/cities";
import { getAllCities } from "@/lib/cities";

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
    url: `${ORIGIN}/truck-repair-loans`,
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
    url: `${ORIGIN}/invoice-factoring-for-truckers`,
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

  return entries;
}
