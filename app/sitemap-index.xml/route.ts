import { SITEMAP_SHARDS, sitemapShardUrl } from "@/lib/seo/sitemapShards";

const ORIGIN = "https://dispatched.finance";

/* Sitemap index, reached at the conventional /sitemap.xml through the
   rewrite in next.config.ts.

   app/sitemap.ts uses generateSitemaps(), which serves each shard at
   /sitemap/<id>.xml but emits no index. robots.txt lists the shards, yet
   tools and crawlers that probe /sitemap.xml by default got a 404. */
export const dynamic = "force-static";

export function GET(): Response {
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    SITEMAP_SHARDS.map(
      (id) => `  <sitemap><loc>${sitemapShardUrl(ORIGIN, id)}</loc></sitemap>\n`,
    ).join("") +
    `</sitemapindex>\n`;
  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
