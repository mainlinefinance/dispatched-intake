# Open decisions — copy doc PR #55

Resolves three open decisions flagged by Agent A1 in the per-page copy spec (`docs/seo/per-page-copy.md`, "Open decisions punted to marketing").

---

## Decision 1 — `/carriers` primary keyword

**Recommendation:** Switch primary keyword to **`commercial truck insurance companies`**. Demote `commercial trucking insurance carriers` to a secondary keyword.

**Reasoning:** Every editorial roundup that competes for this intent — Freightwaves, Insurify, NerdWallet-style listicles, InsuredBetter, MySafetyManager, TWFG, TrueNorth, National Funding — titles their pages "Best Commercial Truck Insurance Companies" or "Best Trucking Insurance Companies." Zero of the top-10 results for either phrase use "carriers" in the title. The word "carriers" in a trucking-context SERP is overwhelmingly captured by FMCSA's motor-carrier registration search ("Licensing & Insurance Carrier Search") — wrong intent entirely. That's a polluted SERP, and ranking on it sends the wrong signal to Google about the page's topic.

**Evidence:**
- SERP for `commercial trucking insurance carriers` returns FMCSA's li-public licensing search as a top result — that result is about FMCSA-mandated insurance filings, not carrier comparison shopping. SERP intent is split between insurance and motor-carrier registration.
- SERP for `trucking insurance companies` returns clean commercial-intent results: Sentry, GEICO, Great West, Progressive Commercial, OOIDA, plus listicles. No FMCSA pollution.
- All major listicle competitors use "companies" (Freightwaves "Best Commercial Truck Insurance Companies 2026", Insurify "Best Commercial Truck Insurance Companies (2026)", InsuredBetter "6 Best Commercial Truck Insurance Companies in 2026", TrueNorth "Top 10 Commercial Truck Insurance Companies", MySafetyManager "7 Best Trucking Insurance Companies").
- A1's existing copy already uses "commercial trucking carriers" naturally throughout the FAQ answers, so the keyword switch does not require rewriting the body — just the meta title, description, H1, and the keyword field in the doc.
- Suggested final keyword stack for `/carriers`:
  - **Primary:** `commercial truck insurance companies`
  - **Secondaries:** `trucking insurance companies`, `commercial trucking insurance carriers`, `AM Best trucking carriers`, `commercial truck insurance providers`

**Suggested title rewrite (under 60 chars):** `Commercial truck insurance companies — AM Best | Dispatched` (60 chars)

**Fallback:** If marketing has Ahrefs / SEMrush / Google Keyword Planner data showing `commercial trucking insurance carriers` has materially higher volume AND clean commercial intent (no FMCSA pollution), override this. Paid keyword tools beat SERP-shape heuristics. But the SERP-shape signal here is unusually strong — the FMCSA pollution on "carriers" is a real ranking problem regardless of raw volume.

---

## Decision 2 — `/calculators` FAQ #5

**Recommendation:** **Rephrase.** Do not ship as-is, do not silently prune.

**Reasoning:** Confirmed against `app/calculators/page.tsx` and `app/calculators/truck-repair/page.tsx`: the only shipped calculator is the truck-repair fit estimator. The `/calculators` hub page lists exactly two tools — the truck-repair calculator and a link to `/qualify` (the two-question fit). There is no working-capital calculator and no equipment-loan calculator in the codebase. Shipping FAQ #5 as written commits engineering to building both tools (otherwise the FAQ promises a thing that does not exist, and the FAQPage JSON-LD generates rich snippets pointing to non-existent pages — bad UX, bad CRO, and a structured-data quality issue). Pruning entirely loses the legitimate "which tool should I use first?" routing question, which is genuinely useful for someone landing on `/calculators` cold.

**Suggested action — replace FAQ #5 in the copy doc with this answer:**

> **Q: Which calculator should I use first?**
> A: If a truck is already at the shop and you have a written estimate, use the truck repair financing fit estimator. If you are not sure which Dispatched product fits your operation at all, use the two-question funding fit at /qualify — it routes you to the right product (working capital, equipment, repair, or factoring) in two answers and no credit pull. Standalone calculators for working capital and equipment financing are on the roadmap; until they ship, /qualify is the fastest path to the right product category.

This version (a) describes only what exists today, (b) honestly flags the roadmap without committing engineering to a date, (c) keeps the "first calculator" routing question intact, and (d) drops the FAQPage JSON-LD risk of pointing a rich snippet at a missing tool.

**If marketing has a confirmed Q3 2026 roadmap commit to ship both calculators**, ship A1's original FAQ #5 as written. Default until that confirmation: rephrase as above.

---

## Decision 3 — `/apply` and `/qualify` visible FAQ

### `/apply`

**Recommendation:** **JSON-LD only. No visible FAQ on the page.**

**Reasoning:** `/apply` is a pure conversion page — the LendflowWidget owns the page chrome below the H1, and the entire UX intent is "fill out the form, get matched." Industry pattern is clear: Lendio, Bluevine, Fundbox, OnDeck, and every loan-broker conversion page deliberately strips chrome around the application widget to maximize completion rate. A visible FAQ on this page introduces scroll competition with the form, dilutes the conversion action, and hands the user an excuse to leave the page reading instead of submitting. Ship the 5 FAQs as `FAQPage` JSON-LD only — Google indexes the content and the page is eligible for FAQ rich results without harming CRO. JSON-LD without a visible counterpart is permitted by Google's structured-data guidelines (the visible-content requirement applies to Q&A schema, not FAQPage, though the gap has narrowed — see "Where the FAQ content SHOULD live" below for the safer placement).

### `/qualify`

**Recommendation:** **JSON-LD only.** Borderline call — leans toward JSON-LD only.

**Reasoning:** `/qualify` renders `<QualificationCalc />` as the primary action — a two-question diagnostic with no credit pull and no contact capture. Same CRO logic as `/apply`: a visible FAQ pulls scroll attention away from the two-question form, which is the entire reason the page exists. The four FAQs A1 wrote are exclusively about *what the qualifier does* (does it pull credit, is it the same as applying, what info is collected) — those concerns are better answered by inline microcopy directly on the form ("No credit check. No contact info collected.") than by an FAQ accordion below the fold. Ship JSON-LD; lift the two highest-anxiety answers ("does it pull credit", "what info is collected") into one-line reassurance microcopy beside the form's submit button.

### Where the FAQ content SHOULD live (if not on these pages)

The objections A1's FAQs answer ("will this hurt my credit", "what happens after I apply", "are there upfront fees", "what info do you collect") are the same objections every money page already needs to overcome. Ship the visible accordion versions of those FAQs on the **upstream marketing pages** that link to `/apply` and `/qualify`, not on the conversion pages themselves:

- `/trucking-working-capital`, `/truck-repair-loans`, `/equipment-financing`, `/owner-operator-financing` — already have FAQ sections in the doc, several of which already cover credit-impact and what-happens-next. Ensure those pages render visible FAQ accordions (not just JSON-LD) since they ARE the marketing pages.
- Homepage `/` — already ships a visible FAQ accordion via `components/landing/FAQ.tsx` covering credit impact, document requirements, what-happens-after-apply, and time-to-funds. The homepage is the right place for this content because it is a marketing page, not a conversion page.

Net rule: visible FAQ on **marketing** pages, JSON-LD only on **conversion** pages.

---

*Generated by Agent 5 (decision resolver) for PR #55.*
