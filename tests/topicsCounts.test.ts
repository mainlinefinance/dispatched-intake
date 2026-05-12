import { describe, expect, it } from "vitest";
import { getAllTopicSlugs, getContentByTopic } from "@/lib/topics";

describe("topics taxonomy", () => {
  it("has 10 canonical topics", () => {
    expect(getAllTopicSlugs()).toHaveLength(10);
  });

  for (const slug of getAllTopicSlugs()) {
    it(`topic "${slug}" has at least 10 content items`, () => {
      const items = getContentByTopic(slug);
      expect(items.length).toBeGreaterThanOrEqual(10);
    });
  }

  it("deduplicates by URL within a topic", () => {
    for (const slug of getAllTopicSlugs()) {
      const items = getContentByTopic(slug);
      const urls = items.map((i) => i.url);
      expect(new Set(urls).size).toBe(urls.length);
    }
  });
});
