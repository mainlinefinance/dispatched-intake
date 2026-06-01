/* ===========================================================================
   Single source of truth for the sitemap shard ids.

   Both app/sitemap.ts (generateSitemaps + the sitemap() switch) and
   app/robots.ts (the Sitemap: directives) import this. They MUST stay in
   sync: Next 16's generateSitemaps serves each shard at
   /sitemap/<id>.xml and does NOT create a parent index at /sitemap.xml.
   robots.txt is therefore the only thing telling crawlers where the shards
   are, so a drift between the shard list and the robots directives silently
   breaks sitemap discovery (which is exactly the regression this module
   exists to prevent). Add a shard here and both files pick it up.
   =========================================================================== */

export const SITEMAP_SHARDS = ["money", "content", "programmatic"] as const;

export type SitemapId = (typeof SITEMAP_SHARDS)[number];

/* Absolute URL of a shard's generated sitemap. Mirrors Next's metadata-route
   output path for generateSitemaps children: /sitemap/<id>.xml. */
export function sitemapShardUrl(origin: string, id: SitemapId): string {
  return `${origin}/sitemap/${id}.xml`;
}
