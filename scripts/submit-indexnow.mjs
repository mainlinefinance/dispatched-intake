#!/usr/bin/env node
/**
 * IndexNow auto-submit. Runs as a post-build step on Render.
 *
 * Reads the live sitemap.xml, extracts <loc> URLs (recursing through
 * <sitemapindex> if present), and POSTs them to api.indexnow.org.
 *
 * Design choices:
 *   - No dependencies. Built-in fetch only (Node 18+).
 *   - Verifies the key file is reachable before submitting; a missing
 *     key file causes IndexNow to silently drop the submission. Better
 *     to fail loudly here.
 *   - Submits in batches of 10,000 (the API max per request).
 *   - Returns non-zero on config or network error so the operator sees
 *     it, but the recommended Render build command wraps the call in
 *     `|| true` so an IndexNow failure does not fail the deploy.
 *   - Off-host URLs in the sitemap are filtered out (defense in depth).
 *
 * Environment variables (set in Render dashboard → Environment):
 *   INDEXNOW_KEY      Required. 32-char hex. Generate: openssl rand -hex 16
 *   INDEXNOW_HOST     Optional. Defaults to "dispatched.finance".
 *   SITEMAP_URL       Optional. Defaults to "https://${INDEXNOW_HOST}/sitemap.xml".
 *   INDEXNOW_DRY_RUN  Optional. If "true", logs URLs but does not submit.
 *
 * Exit codes:
 *   0 = success or no URLs to submit
 *   1 = config error (missing key, etc.)
 *   2 = network or API error
 */

const HOST = process.env.INDEXNOW_HOST || "dispatched.finance";
const KEY = process.env.INDEXNOW_KEY;
const SITEMAP_URL = process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = KEY ? `https://${HOST}/${KEY}.txt` : "";
const DRY_RUN = process.env.INDEXNOW_DRY_RUN === "true";
const BATCH_SIZE = 10000;

const log = (msg) => console.log(`[indexnow] ${msg}`);
const fail = (msg, code = 1) => {
  console.error(`[indexnow] ERROR: ${msg}`);
  process.exit(code);
};

if (!KEY) fail("INDEXNOW_KEY env var is required (generate: openssl rand -hex 16)");
if (!/^[a-f0-9]{8,128}$/i.test(KEY)) fail("INDEXNOW_KEY must be 8-128 hex chars");

async function fetchSitemapUrls(url, seen = new Set()) {
  log(`fetching ${url}`);
  const res = await fetch(url, {
    headers: { "User-Agent": "dispatched-indexnow-bot/1.0" },
  });
  if (!res.ok) fail(`sitemap fetch failed: ${res.status} ${res.statusText}`, 2);
  const xml = await res.text();

  const isIndex = /<sitemapindex/i.test(xml);
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map(
    (m) => m[1],
  );

  if (isIndex) {
    const all = [];
    for (const childUrl of locs) {
      if (seen.has(childUrl)) continue;
      seen.add(childUrl);
      const childUrls = await fetchSitemapUrls(childUrl, seen);
      all.push(...childUrls);
    }
    return all;
  }
  return locs;
}

async function submitBatch(urls) {
  if (DRY_RUN) {
    log(`DRY RUN — would submit ${urls.length} URLs`);
    urls.slice(0, 5).forEach((u) => log(`  ${u}`));
    if (urls.length > 5) log(`  ... +${urls.length - 5} more`);
    return;
  }

  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  if (res.status === 200) {
    log(`submitted ${urls.length} URLs (200 OK)`);
    return;
  }
  if (res.status === 202) {
    log(`accepted ${urls.length} URLs (202 — pending validation)`);
    return;
  }
  const text = await res.text().catch(() => "");
  fail(`IndexNow API ${res.status}: ${text || res.statusText}`, 2);
}

async function main() {
  log(`host=${HOST} sitemap=${SITEMAP_URL} dryRun=${DRY_RUN}`);
  log(`key location=${KEY_LOCATION}`);

  const keyCheck = await fetch(KEY_LOCATION);
  if (!keyCheck.ok) {
    fail(
      `key file not reachable at ${KEY_LOCATION} (${keyCheck.status}). ` +
        `Place a plain-text file at /public/${KEY}.txt containing exactly ` +
        `the key string.`,
    );
  }
  const keyContent = (await keyCheck.text()).trim();
  if (keyContent !== KEY) {
    fail(`key file content mismatch — expected "${KEY}", got "${keyContent}"`);
  }
  log(`key file verified`);

  const urls = await fetchSitemapUrls(SITEMAP_URL);
  if (urls.length === 0) {
    log("no URLs found in sitemap, nothing to submit");
    return;
  }
  log(`found ${urls.length} URLs in sitemap`);

  const onHost = urls.filter((u) => {
    try {
      return new URL(u).hostname === HOST;
    } catch {
      return false;
    }
  });
  if (onHost.length !== urls.length) {
    log(`filtered ${urls.length - onHost.length} off-host URLs`);
  }

  for (let i = 0; i < onHost.length; i += BATCH_SIZE) {
    const batch = onHost.slice(i, i + BATCH_SIZE);
    await submitBatch(batch);
  }
  log(`done`);
}

main().catch((err) => fail(err?.stack || String(err), 2));
