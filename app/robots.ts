import type { MetadataRoute } from "next";
import { SITEMAP_SHARDS, sitemapShardUrl } from "@/lib/seo/sitemapShards";

const ORIGIN = "https://dispatched.finance";

/* ===========================================================================
   robots.txt — discipline:
     - Default agent: allow crawl of public pages, disallow non-canonical
       and lead-form endpoints. UTM/click-id query strings are denied so
       paid-traffic variants do not compete with canonicals in the index.
     - LLM and answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot,
       Google-Extended, Applebot-Extended, etc.) get explicit `Allow: /`.
       This is a positive GEO/AEO signal; some crawlers treat the absence
       of an explicit allow as cautious.
     - This file is a Next.js metadata route. It outputs robots.txt at
       /robots.txt; do not also place a static file in /public.
     - Sitemap discovery: the sitemap is split into shards via
       generateSitemaps() in app/sitemap.ts. Next 16 serves each shard at
       /sitemap/<id>.xml and does NOT create a /sitemap.xml index, so we must
       point crawlers at each shard explicitly. Google supports multiple
       `Sitemap:` directives in robots.txt. Pointing at the old single
       /sitemap.xml here would 404 and break discovery entirely (the shard
       list is the single source of truth in lib/seo/sitemapShards.ts).
   =========================================================================== */

const LLM_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/insurance/quote",
          "/insurance/thanks",
          "/healthz",
          "/_next/",
          "/admin/",
          "/*?utm_*",
          "/*?gclid=*",
          "/*?fbclid=*",
        ],
      },
      ...LLM_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: SITEMAP_SHARDS.map((id) => sitemapShardUrl(ORIGIN, id)),
    host: ORIGIN,
  };
}
