#!/usr/bin/env node
/**
 * Renders every kit step in both layouts to data/outreach/preview/ so the
 * copy and design can be reviewed in a browser before anything is sent.
 *
 *   npm run outreach:preview
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { KITS, SEGMENTS } from "../../lib/outreach/kits.ts";
import { renderEmail } from "../../lib/outreach/render.ts";
import type { Layout, Lead, Segment } from "../../lib/outreach/types.ts";
import { unsubscribeUrl } from "../../lib/outreach/unsubscribe.ts";

const OUT = process.argv[2] ?? path.join("data", "outreach", "preview");
const SITE = process.env.OUTREACH_SITE_URL ?? "https://dispatched.finance";
const SENDER = process.env.OUTREACH_SENDER_NAME ?? "[Sender name]";

const SAMPLES: Record<Segment, Lead> = {
  "owner-operator": { dot: "3141592", email: "owner@example.com", company: "Lone Pine Trucking LLC", state: "TX", powerUnits: 1, segment: "owner-operator" },
  "new-authority": { dot: "4271828", email: "dispatch@example.com", company: "Red Mesa Freight LLC", state: "AZ", powerUnits: 2, segment: "new-authority" },
  "small-fleet": { dot: "2718281", email: "office@example.com", company: "Three Rivers Hauling Inc", state: "OH", powerUnits: 6, segment: "small-fleet" },
};

mkdirSync(OUT, { recursive: true });
const index: string[] = [];

for (const segment of SEGMENTS) {
  const lead = SAMPLES[segment];
  const url = unsubscribeUrl(SITE, lead.email, "preview-secret");
  index.push(`<h2>${segment}</h2><p>${KITS[segment].audience}</p><ul>`);
  for (const step of KITS[segment].steps) {
    for (const layout of ["plain", "branded"] as Layout[]) {
      const email = renderEmail(lead, step.step, { siteUrl: SITE, senderName: SENDER, unsubscribeUrl: url, layout });
      const base = `${segment}-step${step.step}-${layout}`;
      writeFileSync(path.join(OUT, `${base}.html`), email.html);
      writeFileSync(path.join(OUT, `${base}.txt`), `${email.subject ? `Subject: ${email.subject}\n\n` : ""}${email.text}\n`);
      index.push(`<li>Day ${step.dayOffset}, step ${step.step} (${layout}): <a href="${base}.html">html</a> · <a href="${base}.txt">text</a>${email.subject ? ` · <em>${email.subject}</em>` : " · reply in thread"}</li>`);
    }
  }
  index.push("</ul>");
}

writeFileSync(
  path.join(OUT, "index.html"),
  `<!doctype html><meta charset="utf-8"><title>Outreach kits</title><body style="font-family:system-ui;max-width:720px;margin:40px auto;line-height:1.6">${index.join("\n")}</body>`,
);
console.log(`Wrote previews to ${OUT}/index.html`);
