import { describe, expect, it } from "vitest";

import { KITS, SEGMENTS, SEQUENCE_LENGTH } from "@/lib/outreach/kits";
import { LEGAL, renderEmail } from "@/lib/outreach/render";
import type { Lead, Segment } from "@/lib/outreach/types";
import {
  listUnsubscribeHeaders,
  unsubscribeUrl,
  verifyUnsubscribe,
} from "@/lib/outreach/unsubscribe";

const SITE = "https://dispatched.finance";
const SECRET = "test-secret";

function lead(segment: Segment): Lead {
  return {
    dot: "1234567",
    email: "owner@example.com",
    company: "Smith & Sons <Trucking> LLC",
    state: "TX",
    powerUnits: segment === "small-fleet" ? 5 : 1,
    segment,
  };
}

function render(segment: Segment, step: number, layout: "plain" | "branded" = "plain") {
  return renderEmail(lead(segment), step, {
    siteUrl: SITE,
    senderName: "Alex",
    unsubscribeUrl: unsubscribeUrl(SITE, "owner@example.com", SECRET),
    layout,
  });
}

// Claims the public site dropped in the Google Ads compliance pass (#123).
const BANNED = [
  /guarantee(?!d\b)/i, // "isn't guaranteed" is the only allowed form, checked below
  /pre-?approved/i,
  /same[- ]day/i,
  /\b24 hours?\b/i,
  /\binstant/i,
  /\bfast\b/i,
  /lowest rate/i,
  /no credit check/i,
  /\$\d/,
  /\d\s?%/,
  /\bwe (lend|fund|finance)\b/i,
];

describe("outreach kits", () => {
  it("has the same four-step cadence for every segment", () => {
    for (const segment of SEGMENTS) {
      const steps = KITS[segment].steps;
      expect(steps.map((s) => s.step)).toEqual([1, 2, 3, 4]);
      expect(steps.map((s) => s.dayOffset)).toEqual([0, 3, 7, 14]);
      expect(steps).toHaveLength(SEQUENCE_LENGTH);
    }
  });

  it("gives only the opener a subject, and never a fake reply prefix", () => {
    for (const segment of SEGMENTS) {
      for (const step of KITS[segment].steps) {
        if (step.step === 1) {
          expect(step.subjects?.length).toBeGreaterThan(0);
          for (const subject of step.subjects ?? []) {
            expect(subject).not.toMatch(/^\s*(re|fwd?):/i);
            expect(subject.length).toBeLessThanOrEqual(60);
          }
        } else {
          expect(step.subjects).toBeUndefined();
        }
      }
    }
  });

  it("links only to pages that exist in the app", async () => {
    const { existsSync } = await import("node:fs");
    for (const segment of SEGMENTS) {
      for (const step of KITS[segment].steps) {
        expect(existsSync(`app${step.cta.path}/page.tsx`), step.cta.path).toBe(true);
      }
    }
  });

  it.each(SEGMENTS.flatMap((s) => [1, 2, 3, 4].map((n) => [s, n] as const)))(
    "%s step %i follows the compliance copy rules",
    (segment, step) => {
      const { text, subject } = render(segment, step);
      const body = text.split("\n--\n")[0];
      for (const pattern of BANNED) expect(`${subject ?? ""}\n${body}`).not.toMatch(pattern);
      // "guaranteed" may only appear negated.
      for (const match of body.matchAll(/.{0,12}guaranteed/gi)) {
        expect(match[0]).toMatch(/(isn't|not) guaranteed/i);
      }
      expect(body).toMatch(/reply "(no thanks|unsubscribe)"/i);
      expect(body.split(/\s+/).length).toBeLessThanOrEqual(150);
      expect(text).not.toContain("{{");
    },
  );
});

describe("renderEmail", () => {
  it("appends the legal footer and unsubscribe link in both parts", () => {
    for (const layout of ["plain", "branded"] as const) {
      const { text, html } = render("owner-operator", 1, layout);
      for (const part of [text, html]) {
        expect(part).toContain(LEGAL.entity);
        expect(part).toContain(LEGAL.address);
        expect(part).toContain("FMCSA registry (DOT 1234567)");
        expect(part).toContain("not a lender");
        expect(part).toContain("/api/outreach/unsubscribe?e=");
      }
    }
  });

  it("escapes lead data in HTML and leaves it raw in text", () => {
    const { text, html } = render("owner-operator", 1);
    expect(html).toContain("Smith &amp; Sons &lt;Trucking&gt; LLC");
    expect(html).not.toContain("<Trucking>");
    expect(text).toContain("Smith & Sons <Trucking> LLC");
  });

  it("tags the CTA with the campaign UTM set and loads no images", () => {
    const { html } = render("small-fleet", 2, "branded");
    expect(html).toContain(
      "https://dispatched.finance/equipment-financing?utm_source=fmcsa&amp;utm_medium=email&amp;utm_campaign=outbound-small-fleet&amp;utm_content=step-2",
    );
    expect(html).not.toMatch(/<img/i);
  });

  it("keeps a lead's subject stable across renders", () => {
    expect(render("new-authority", 1).subject).toBe(render("new-authority", 1).subject);
    expect(render("new-authority", 2).subject).toBeUndefined();
  });

  it("refuses to render without a sender name", () => {
    expect(() =>
      renderEmail(lead("owner-operator"), 1, { siteUrl: SITE, senderName: " ", unsubscribeUrl: "x" }),
    ).toThrow(/senderName/);
  });
});

describe("unsubscribe links", () => {
  it("round-trips a signed address", () => {
    const url = new URL(unsubscribeUrl(SITE, " Owner@Example.com ", SECRET));
    expect(url.pathname).toBe("/api/outreach/unsubscribe");
    expect(
      verifyUnsubscribe(url.searchParams.get("e"), url.searchParams.get("t"), SECRET),
    ).toBe("owner@example.com");
  });

  it("rejects a tampered address, a wrong secret and missing parts", () => {
    const url = new URL(unsubscribeUrl(SITE, "owner@example.com", SECRET));
    const t = url.searchParams.get("t");
    const other = Buffer.from("victim@example.com").toString("base64url");
    expect(verifyUnsubscribe(other, t, SECRET)).toBeNull();
    expect(verifyUnsubscribe(url.searchParams.get("e"), t, "other-secret")).toBeNull();
    expect(verifyUnsubscribe(null, t, SECRET)).toBeNull();
    expect(verifyUnsubscribe(url.searchParams.get("e"), t, "")).toBeNull();
  });

  it("builds RFC 8058 one-click headers", () => {
    const headers = listUnsubscribeHeaders("https://x.test/u", "alex@mail.example.com");
    expect(headers["List-Unsubscribe"]).toBe(
      "<https://x.test/u>, <mailto:alex@mail.example.com?subject=unsubscribe>",
    );
    expect(headers["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
  });
});
