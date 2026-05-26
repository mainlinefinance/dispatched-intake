// Regression: ISSUE-001 — /pulse* pages lost og:image after the per-page
// openGraph fix on 2026-05-26. Next.js replaces (not merges) the openGraph
// object when a child page sets it, which silently drops the file-based
// image at app/opengraph-image.tsx that the layout relied on. Each pulse
// page must explicitly restate images so social cards stay populated.
// Found by /qa on 2026-05-26
// Report: .gstack/qa-reports/qa-report-dispatched-finance-2026-05-26.md
import { describe, expect, it } from "vitest";
import { metadata as pulseIndexMetadata } from "@/app/pulse/page";
import { metadata as dieselMetadata } from "@/app/pulse/diesel/page";
import { generateMetadata as paddGenerateMetadata } from "@/app/pulse/diesel/[padd]/page";
import { PADD_SLUGS } from "@/lib/validation/pulseSchema";

const PADD_PATH_SLUGS = PADD_SLUGS.filter((s) => s !== "national");

function ogImages(meta: { openGraph?: { images?: unknown } | null }): unknown[] {
  const raw = meta.openGraph?.images;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

function twitterImages(meta: { twitter?: { images?: unknown } | null }): unknown[] {
  const raw = (meta.twitter as { images?: unknown } | undefined)?.images;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

describe("pulse metadata — og:image regression", () => {
  it("/pulse declares openGraph.images so social cards keep the OG image", () => {
    const imgs = ogImages(pulseIndexMetadata);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it("/pulse declares twitter.images so X cards keep the image", () => {
    const imgs = twitterImages(pulseIndexMetadata);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it("/pulse/diesel declares openGraph.images", () => {
    const imgs = ogImages(dieselMetadata);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it("/pulse/diesel declares twitter.images", () => {
    const imgs = twitterImages(dieselMetadata);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it("every /pulse/diesel/[padd] page declares openGraph.images + twitter.images", async () => {
    for (const padd of PADD_PATH_SLUGS) {
      const meta = await paddGenerateMetadata({ params: Promise.resolve({ padd }) });
      expect(ogImages(meta), `og:image missing on /pulse/diesel/${padd}`).not.toEqual([]);
      expect(twitterImages(meta), `twitter:image missing on /pulse/diesel/${padd}`).not.toEqual([]);
    }
  });
});
