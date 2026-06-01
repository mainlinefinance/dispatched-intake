# Content pillar backlog — 2026-05-31

Spokes queued for the dispatched-content-engine after the 2026-05-31 SEO audit.
Three pillars, three exemplar pages shipped, remaining ~12 spokes scoped here
for the content engine to draft.

Exemplar pages shipped (use as voice + structure templates):

| Pillar | Exemplar URL | Notes |
|---|---|---|
| Repair financing | `/truck-repair-loans/emergency` | Pattern: urgency framing, funding-clock timeline, repair-category list, composite scenario, FAQ |
| Startup-trucking | `/owner-operator-financing/new-llc` | Pattern: substitute-signals framing, document checklist, composite scenario, related-paths cross-link |
| Bad-credit scenarios | `/bad-credit-truck-financing/chapter-7-discharge` | Pattern: timeline-by-product, recovery-signals framing, composite scenario, dignified honest tone on the credit event |

All three exemplars ship with: `breadcrumbList` + `article` (with `authorName: "Angelo Orru Neto"`) + `financialProduct` + `faqPage` JSON-LD, single H1, sentence-case title, descriptive internal anchors to related pillars, and a 1,500–2,200 word body.

---

## Pillar 1 — Repair financing (under `/truck-repair-loans/*`)

Parent pillar: existing `/truck-repair-loans`. Spoke under that hub.

| Slug | Target query | Lead pattern fit | Priority |
|---|---|---|---|
| `/truck-repair-loans/emergency` | emergency semi truck repair loan | "Immediate" urgency dominates real leads | ✅ SHIPPED |
| `/truck-repair-loans/engine-rebuild` | semi truck engine rebuild financing | Highest-dollar repair category | High |
| `/truck-repair-loans/transmission` | semi truck transmission repair financing | Common $6K–$25K bucket | High |
| `/truck-repair-loans/dpf-replacement` | DPF replacement financing semi truck | Audit quick-win #5 | High |
| `/truck-repair-loans/brakes-suspension` | air brake system overhaul financing | Lower-dollar but high volume | Medium |
| `/truck-repair-loans/ecm-electrical` | ECM replacement financing | Specialty repair, weak SERP | Medium |
| `/truck-repair-loans/cummins-rebuild` | Cummins engine rebuild loan | Brand-specific, very weak SERP | Medium |
| `/truck-repair-loans/detroit-dd15-overhaul` | Detroit DD15 overhaul financing | Brand-specific, very weak SERP | Medium |

Each spoke should:
- Use `/truck-repair-loans/emergency` as the structural template (250–300 lines).
- Lead with the specific repair-category cost band ($X to $Y typical invoice).
- Include a "When the loan structure changes vs. an emergency repair" callout — this is the repair-category differentiator that prevents the spokes from cannibalizing each other.
- Cross-link UP to `/truck-repair-loans` (pillar) and SIDEWAYS to the 2 most-related spokes.

---

## Pillar 2 — Startup-trucking (mixed parents)

Parent pillars: existing `/owner-operator-financing`, `/new-authority-truck-financing`. Spokes split between them based on the natural URL hierarchy.

| Slug | Target query | Lead pattern fit | Priority |
|---|---|---|---|
| `/owner-operator-financing/new-llc` | semi truck loan new LLC | Audit quick-win #1; matches 1-mo LLC lead pattern | ✅ SHIPPED |
| `/owner-operator-financing/no-business-history` | semi truck loan with no business history | Audit quick-win equivalent; high commercial intent | High |
| `/owner-operator-financing/no-time-in-business` | no time in business semi truck financing | Audit quick-win #2 | High |
| `/new-authority-truck-financing/under-12-months` | new authority truck financing under 12 months | Refines the existing `/new-authority-truck-financing` pillar | High |
| `/new-authority-truck-financing/new-mc-number` | truck financing for new MC number | Audit quick-win #4 | High |
| `/owner-operator-financing/cdl-no-mc` | CDL with no MC truck financing | Driver-to-owner-op transition, complements `/first-time` | Medium |

Each spoke should:
- Use `/owner-operator-financing/new-llc` as the structural template.
- Open with the substitute-signal framing — what the panel underwrites when the obvious signal is absent.
- Include the document checklist that's specific to the scenario (e.g., MC pending vs MC active changes what paperwork the lender needs).
- Cross-link to `/factoring/no-credit-check` since that's the working-capital substitute for every startup operator.

---

## Pillar 3 — Bad-credit scenarios (under `/bad-credit-truck-financing/*`)

Parent pillar: existing `/bad-credit-truck-financing`. Spokes under that hub.

| Slug | Target query | Lead pattern fit | Priority |
|---|---|---|---|
| `/bad-credit-truck-financing/chapter-7-discharge` | semi truck loan chapter 7 discharge | Audit quick-win #8 | ✅ SHIPPED |
| `/bad-credit-truck-financing/after-repo` | truck financing after repo | Audit quick-win #9 | High |
| `/bad-credit-truck-financing/after-bankruptcy` | semi truck loan after bankruptcy | Audit quick-win #10 (broader than the Ch 7 spoke) | High |
| `/bad-credit-truck-financing/500-fico` | semi truck financing with 500 credit score | Audit recommended | High |
| `/bad-credit-truck-financing/chapter-13` | truck financing during chapter 13 plan | Less common but well-defined SERP gap | Medium |
| `/bad-credit-truck-financing/after-foreclosure` | semi truck loan after foreclosure | Specific scenario, very weak SERP | Medium |

Each spoke should:
- Use `/bad-credit-truck-financing/chapter-7-discharge` as the structural template.
- Lead with the panel-timeline (when each product reopens). This is the single most useful framing for credit-event landing pages.
- Distinguish "active event" from "post-event recovery" — different lender mix, different terms.
- NEVER use the words "guaranteed", "guaranteed approval", "100% approval" — UDAAP / CFPB risk on lead-gen pages.
- Cross-link to `/factoring/no-credit-check` — it's the immediate-availability product for every credit-event operator with a load on the books.

---

## Compliance discipline (all spokes)

Every credit-event or startup-stage spoke must:

1. **Avoid the word "guaranteed"** in any approval framing.
2. **Cite real $ ranges from intake data** ($20K–$75K typical, panel APR bands by product per `/methodology`).
3. **Use "Soft pull only" or "Soft pull first"** in every CTA cluster — never imply auto-approval.
4. **Frame credit events as recoverable, not as moral judgments**. The audience is reading these pages because a bank already declined them; the tone difference is the entire conversion lever.

---

## Content engine handoff

The dispatched-content-engine pipeline at `~/Developer/dispatched-content-engine` should:

1. Read this backlog as the prioritized queue.
2. Use the 3 shipped exemplars as voice + structural templates (linked URLs above).
3. Generate drafts with the FAQ + composite-scenario sections pre-structured (those map cleanly to `faqPage` JSON-LD + the case-study format).
4. Surface each draft for editorial review before pushing to the repo — the panel APR bands, lead-pattern $ amounts, and lender-mix language are facts that need to match `/methodology`, not be invented.
5. After draft acceptance, add each new spoke to `app/sitemap.ts` (the `pillars` array in `buildMoneyEntries`) so the URL ships into `sitemap-money.xml`.

The 3 shipped exemplars cover all three pillars. Subsequent spokes should be additive within the existing URL hierarchy — do NOT create new top-level routes like `/repair-financing` or `/startup-trucking-financing`, because the existing `/truck-repair-loans` and `/owner-operator-financing` already serve as the pillar hubs and splitting URL equity hurts indexation. (This was the explicit fix flagged in the 2026-05-26 3pl.finance audit memo.)
