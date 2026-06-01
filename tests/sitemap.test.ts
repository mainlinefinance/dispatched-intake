import { describe, expect, it } from "vitest";
import sitemap, { generateSitemaps } from "@/app/sitemap";

/* Regression guard for Next 16's generateSitemaps breaking change.

   Before 16.0, the `id` returned from generateSitemaps() was passed to the
   default sitemap() function as a synchronous string/number. In 16.0+, it's
   passed as a Promise<string>. Comparing a Promise to a string is always
   false, so a sitemap.ts that doesn't `await id` will silently return empty
   arrays for every shard — eventually deindexing the entire site as Google
   re-crawls the empty sitemap shards.

   These tests call the default export with Promise.resolve() exactly the way
   Next does it at runtime, so a regression to the sync signature would break
   them immediately. The unit tests on the bucket builders (buildMoneyEntries
   etc.) would NOT catch this because they're called directly with no id. */

describe("sitemap shards (Next 16 generateSitemaps integration)", () => {
  it("generateSitemaps returns the three named shards", async () => {
    const shards = await generateSitemaps();
    expect(shards).toHaveLength(3);
    expect(shards.map((s) => s.id).sort()).toEqual([
      "content",
      "money",
      "programmatic",
    ]);
  });

  it("money shard returns a non-empty entry list with the homepage and product pillars", async () => {
    const entries = await sitemap({ id: Promise.resolve("money") });
    expect(entries.length).toBeGreaterThan(20);
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://dispatched.finance/");
    expect(urls).toContain("https://dispatched.finance/insurance");
    expect(urls).toContain("https://dispatched.finance/factoring");
    expect(urls).toContain(
      "https://dispatched.finance/factoring/no-credit-check",
    );
  });

  it("content shard returns a non-empty entry list with blog/glossary/carriers", async () => {
    const entries = await sitemap({ id: Promise.resolve("content") });
    expect(entries.length).toBeGreaterThan(20);
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://dispatched.finance/blog");
    expect(urls).toContain("https://dispatched.finance/glossary");
    expect(urls).toContain("https://dispatched.finance/carriers");
    expect(urls).toContain("https://dispatched.finance/topics");
  });

  it("programmatic shard returns a non-empty entry list with state/city directories", async () => {
    const entries = await sitemap({ id: Promise.resolve("programmatic") });
    expect(entries.length).toBeGreaterThan(20);
    const urls = entries.map((e) => e.url);
    // /insurance/[product] pages live in programmatic per the current split.
    expect(
      urls.some((u) => /\/insurance\/[a-z-]+$/.test(u)),
    ).toBe(true);
    // Lenders state directory entries.
    expect(
      urls.some((u) => /\/lenders\/[a-z-]+$/.test(u)),
    ).toBe(true);
  });

  it("every entry across all shards has a valid url + lastModified Date", async () => {
    const all: { url: string; lastModified?: Date | string | number }[] = [];
    for (const id of ["money", "content", "programmatic"] as const) {
      const entries = await sitemap({ id: Promise.resolve(id) });
      all.push(...entries);
    }
    expect(all.length).toBeGreaterThan(50);
    for (const e of all) {
      expect(e.url).toMatch(/^https:\/\/dispatched\.finance\//);
      expect(e.lastModified).toBeInstanceOf(Date);
    }
  });

  it("an unknown shard id returns an empty array (not a crash)", async () => {
    // @ts-expect-error - intentionally passing an invalid id to verify the
    // function tolerates it rather than crashing the sitemap route.
    const entries = await sitemap({ id: Promise.resolve("bogus") });
    expect(entries).toEqual([]);
  });
});
