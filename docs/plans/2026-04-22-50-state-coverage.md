# Dispatched — 50-State Geo Coverage Plan

**Version:** 2026-04-22
**Status:** Authored. No implementation yet. Commit to one or more phases via "go Phase A" etc.
**Supersedes:** the "first 10 geo pages live" milestone in Section 11 of the project brief. Extends it to 50.

> The refactor at [`f477db1`](https://github.com/aondaai/dispatched-intake/commit/f477db1) cut the per-city authoring cost roughly in half by splitting StateData (14 shared fields) from CityData (14 unique fields). This plan assumes that schema and builds on it.

## Goal

**Published:** one state-index page plus at least one city page for each of the 50 US states (plus DC if we decide it's worth the separate record), all compliance-safe, all SEO-independent (no thin duplicate content), all authored against the existing `lib/cities.ts` schema.

**Not in this plan:** international expansion, metro-level expansion beyond one city per state (that's Phase D below, which is a post-50-state tier), or non-trucking vertical geo pages (construction launches on a different URL pattern per the brief's Section 4).

## Current state (launch baseline)

| | Count | Notes |
|---|---|---|
| State records (`StateData`) | 3 | TX, FL, CA |
| City records (`CityData`) | 3 | Houston, Jacksonville, Fresno |
| State-index pages live | 3 | `/trucking-loans/texas`, `/florida`, `/california` |
| City pages live | 3 | one per state above |
| Remaining states to cover | **47** | |

## Honest constraints (read before proposing timelines)

These are the binding-rational ones. Every one of them constrains the velocity at which 50-state coverage actually ships.

### 1. Lender panel reality
The field `stateLenderPanelCount` is surfaced in the state-index hero as *"N lenders on our panel actively fund [State] trucking."* That's a factual claim. **As of 2026-04-22 we have zero signed lender partnerships.** The numbers in TX (17), FL (14), CA (12) are projections from the design-bundle reference fills.

Publishing 50 state pages, each claiming 12–17 lenders, against a real panel of zero is a UDAAP exposure the compliance lawyer will red-line the first time they look at the site.

**Pre-requisite to Phase A publishing with lender claims:** either (a) Lendflow or Biz2X partnership closes (then the number is "lenders on integrated platform"), or (b) we switch to a claim we can defend against zero partnerships, e.g., *"panel in development. Apply and we'll match to the lenders we have today."*

### 2. State commercial lending broker licensing
Section 6 of the project brief lists CA, NY, VA, UT as requiring specific filings before routing loan applications *from borrowers in those states* to lenders. Lead times 30–90 days, costs $2–8K per state. A state-index page is a lead-capture funnel; the licensing rules apply.

Some states have **no commercial lending broker requirement at all** (TX, FL among them — that's partly why those were the reference states). Most states fall into one of:

- **No explicit license for lead gen** — publish freely. Most states.
- **Broker license required for commercial lending facilitation** — file first, publish after. CA, NY, VA, UT are confirmed; others likely.
- **Usury caps affecting commercial loans** — rare at state level for commercial; not a blocker for publishing but constrains APR claim.

Before any state page with a lender-count claim goes live, the compliance lawyer reviews *that state's* broker / disclosure regime. This is the 30-candidate research task, one piece of which is already in the brief's Section 7 queue.

### 3. UDAAP and advertising-law exposure
Every state page must be defensible under:
- **FTC Act Section 5** (deceptive acts/practices)
- **CFPB UDAAP guidance** (unfair, deceptive, abusive)
- The specific state's advertising-practice code (e.g., CA DFPI's SB 1235 disclosure requirements apply to marketing, not just loan contracts)

The current state-index hero makes three factual claims: lender panel count, primary corridor, and licensing authority citation. All three need to be accurate for that specific state.

### 4. Content voice (Section 3 of brief)
Banned: *revolutionize, seamlessly, next-generation, cutting-edge, reimagine, democratize, unlock, journey, solutions, ecosystem, robust, leverage, empower.*
Required: plain-dollar amounts, actual hours and days, specific business types, tools borrowers recognize.

Bulk AI-generated state pages tend to drift into the banned list. Every state page needs a human voice pass before publishing.

### 5. LOW_COVERAGE_THRESHOLD gate
`lib/cities.ts` exports `LOW_COVERAGE_THRESHOLD = 3`. A state with fewer than 3 panel lenders 301-redirects to `/trucking`. The low-population states (Alaska, Wyoming, North Dakota, South Dakota, Vermont, DC, Rhode Island, Delaware, Hawaii, Montana) will hit this gate and can't be published until the panel grows into those markets.

### 6. Proof card authenticity
Every `CityData` includes three `proofCards` — case studies with dollar amounts, truck types, neighborhoods, and use cases. Currently these are realistic fabrications authored to match the design bundle. Once any paid ad dollar hits the site, those cards become factual claims in marketing copy.

**Launch-blocker for Phase A completion:** either convert proof cards to labeled illustrative scenarios (*"representative scenario for a similar operator"*) or replace with real post-launch customer stories. Cannot ship 50 states of fictional cards into paid traffic.

### 7. Content authoring has a per-city floor
StateData per state is ~15 minutes of research (public info). CityData per city is ~45 minutes (local knowledge + proof card authoring). This time cannot be automated away without quality collapse.

## Coverage tiers (what "done" looks like)

| Tier | Scope | Page count | Purpose |
|---|---|---|---|
| **T0 — Live** | TX, FL, CA × 1 city each | 3 state + 3 city = 6 | Reference voice, design validation |
| **T1 — Flagship 10** | TX, CA, FL, GA, OH, IL, NY, PA, WA, AZ | 10 state + 10 city = 20 | Matches project brief Section 5. First paid-ad surface. |
| **T2 — Trucking top 20** | Above + TN, NC, IN, MO, MI, MN, WI, CO, OR, NJ | 20 state + 20 city = 40 | Covers ~85% of US trucking ton-miles. |
| **T3 — All 50** | All 50 states (publishable or redirected) | 50 state + ~45 city = 95 | Complete coverage. Some states redirect to /trucking until panel grows. |
| **T4 — Metro expansion** | 2–3 cities in each high-population state | 50 state + 130–150 city = 180–200 | Captures city-level search intent at metro depth. Post-T3. |

This plan takes us from T0 → T3. T4 is a sequel plan.

## Phased execution

### Phase A — Complete 10 flagship states (T0 → T1)

**Adds:** GA (Atlanta), OH (Columbus), IL (Chicago), NY (Syracuse — NYC-as-city is metro-specific, saves for T4), PA (Harrisburg), WA (Tacoma), AZ (Phoenix).

Choice of cities favors logistics hubs over the largest metro — Atlanta over Savannah because ATL is the actual Southeast freight-hub; Tacoma over Seattle because Tacoma is the Port-of-Seattle freight destination; Syracuse over NYC because NYC metro trucking economics are dominated by NJ/CT commute and distort the city-specific content.

**Work per state:**
- 15 min StateData research (regulator, corridors, sales tax, licensing)
- 45 min CityData authoring (stats, weather, proof cards)

**Total: ~7 hours** for all seven new states.

**Gates before merge:**
1. Compliance lawyer has reviewed at least the CA, NY state-index draft copy (those have the strictest regimes).
2. Lender panel claim resolved per constraint #1 above — either real numbers or softened claim language.
3. Proof cards labeled illustrative OR replaced with post-launch stories (constraint #6).

**Output:** 10 state-index pages + 10 city pages live. Matches brief Section 11 "six weeks from today" milestone.

**Commit structure:** one commit per state (seven commits), each adding one StateData + one CityData + ensuring the geo page renders cleanly. Bisectable if any lender-claim review fails after merge.

### Phase B — Trucking top-20 states (T1 → T2)

**Adds:** TN (Memphis), NC (Charlotte), IN (Indianapolis), MO (St. Louis), MI (Detroit), MN (Minneapolis), WI (Milwaukee), CO (Denver), OR (Portland), NJ (Newark).

Source for ranking: **Bureau of Transportation Statistics** — "Commodity Flow by Origin State" table, 2022 data is latest published. States ranked by annual ton-miles originated.

**Work:** ~10 hours (10 × 1 hour). Most StateData fields (I-corridors, state DOT, state finance regulator) are now routine.

**Gates:** same compliance review per state. Compliance lawyer engagement from Phase A now paying down per-state review time.

### Phase C — Remaining 30 states (T2 → T3)

**Adds:** the 30 states not in T2, ordered roughly by trucking employment:
- KY, AL, LA, SC, OK, AR, IA, KS, NM, UT (Southeast + heartland extension — ~10 states)
- NV, ID, NE, WV, MS, ME, NH, CT, MA, MD (coastal + interior balance — ~10)
- VT, RI, DE, DC, HI, AK, ND, SD, MT, WY (low-volume — ~10, most will redirect to /trucking until panel grows)

**Work:** ~30 hours (30 × 1 hour).

**Special handling for low-volume tier:**
For states where lender panel count stays below `LOW_COVERAGE_THRESHOLD = 3`, options:
- **(a)** Write StateData with `lenderPanelCount: 0` and let the page 301-redirect to `/trucking`. Page never publishes; just ensures the URL isn't a 404 so future expansion is seamless.
- **(b)** Hold those states out of `lib/cities.ts` entirely until panel grows.
- **Recommended: (a).** It's more SEO-defensible (the 301 carries link equity when panel grows), and it makes the `lib/cities.ts` file a complete accounting of the US territory even before every state is live.

### Phase D — Metro expansion (T3 → T4)

Post-50-state. Sequel plan. High-population states get 2–3 additional cities (Dallas, San Antonio, Austin for TX; LA, SF, San Diego for CA; Miami, Tampa, Orlando for FL; Buffalo, NYC, Albany for NY; etc.).

Not planned here. Flagged so the schema and URL patterns don't need to change later.

## Authoring workflow

### StateData research checklist (~15 min per state)

| Field | Source |
|---|---|
| `name`, `abbr`, `slug` | trivial |
| `primaryCorridor` | US DOT Interstate System map — pick the 1–2 most-trucked routes by ton-mile |
| `secondaryCorridor` | same, second-most-trucked |
| `lenderPanelCount` | **lender BD status at the time of authoring** — use real number, not projection |
| `lenderExample1`, `lenderExample2` | real lender names from panel (post-partnership) OR omit both fields until partnerships close |
| `commonFactor` | industry knowledge — major factoring companies operating in state |
| `licensingAuthority` | state financial regulator (usually Dept of Banking / Finance / Financial Institutions) |
| `licensingCitation` | state code section governing commercial lending broker activity |
| `licenseType` | specific license name (e.g., "OCCC regulated lender license" for TX, "CFL license" for CA) |
| `salesTaxNote` | state tax treatment of interstate freight — check state DOR |
| `taxAuthority` | state DOR name |

### CityData research checklist (~45 min per city)

| Field | Source |
|---|---|
| `city`, `citySlug` | trivial |
| `aprRangeLow`, `aprRangeHigh` | **from estimateMatch rules, not invented** — Tier A 14–22, Tier B 22–34, Tier C 28–45 |
| `localStatOperatorCount` | **FMCSA SAFER registry** — count of carriers with ICC/DOT authority by state; divide by metro proportion |
| `localStatFundedCount` | **our internal number**; use "N funded in last 90 days" with methodology footnote |
| `localStatMedianAmount`, `localStatMedianHours` | our metrics, with dataRefreshDate set to today |
| `dataRefreshDate` | today's date on commit |
| `cityWeatherContext` | NOAA historical weather + local knowledge about how weather affects trucking economics there |
| `cityCostPressure` | local economic characteristics — what makes this city expensive or variable for an operator |
| `citySeasonalMonth` | peak-difficulty month from above |
| `cityAvgRepairCost` | AAA repair cost index or American Trucking Research Institute data by region |
| `proofCards[3]` | **real post-launch stories preferred; illustrative fabrications only with `[Illustrative]` tag** |

### Review checklist per state before merge
1. **Lender count matches real partnerships** (or the copy is softened to not claim partnerships)
2. **State licensing citation is accurate** (exact state code section, spot-checked by lawyer)
3. **Corridor names are real** (verified against state DOT maps)
4. **Sales tax note is correct** (verified against state DOR published guidance)
5. **Proof cards are labeled illustrative OR based on real stories with documented consent**
6. **None of the voice-banned words appear** (see brief Section 3)
7. **Links render** — state-index, city pages, `/apply` CTA all click through
8. **No placeholder strings** — no `TODO`, `FIXME`, `XXX`, `N/A` in any field (add a build-time lint for this, see "Code helpers" below)

## Code helpers worth adding before Phase A

None of these are blocking, but each pays down Phase B/C complexity.

### 1. `/trucking-loans/` national-index page
**Why:** Without it, `/trucking-loans/` returns 404 and 50 state-index URLs float without a parent. With it, one page lists all 50 states grouped (e.g., by region), which is both SEO-valuable (for "trucking loans by state") and navigational.

**Work:** ~30 min. `app/trucking-loans/page.tsx` + simple region grouping.

### 2. Build-time placeholder lint
**Why:** A state that ships with `stateLenderExample1: "TODO"` is a compliance failure that tests and typecheck won't catch.

**Work:** ~20 min. Add a vitest test that iterates `getAllCities()` + `getAllStates()` and asserts no field contains `/TODO|FIXME|XXX|PLACEHOLDER|N\/A/i`.

### 3. `sitemap.xml` at `app/sitemap.ts`
**Why:** 50 state pages + 50+ city pages × low-effort discoverability for Google and Bing. Next 16 has a first-class sitemap API.

**Work:** ~20 min. `app/sitemap.ts` that pulls `getAllStates()` and `getAllCities()`.

### 4. Optional: `StateData.published: boolean` field
**Why:** Decouple "wrote the content" from "ready to serve traffic." Authoring can proceed in git without turning pages on until compliance approves.

**Work:** ~30 min. Add field, have `generateStaticParams` filter to `published: true` only, have `getState` return null for unpublished.

## Timeline estimates

Realistic at **1 hour per day** of focused content work:

| Phase | States added | Cumulative states | Weeks |
|---|---|---|---|
| A | +7 (total 10) | 10 | 1 |
| B | +10 (total 20) | 20 | 1.5 |
| C | +30 (total 50) | 50 | 5 |
| **Total** | | **50** | **~7.5 weeks** |

Aggressive at **3 hours per day**:

| Phase | Weeks |
|---|---|
| A | 2 days |
| B | 3 days |
| C | 2 weeks |
| **Total** | **~3 weeks** |

Both assume the compliance lawyer is engaged in parallel and not a blocker on Phase C. If compliance clearance per state becomes the bottleneck, Phase C stretches 4–6 weeks regardless of author speed.

## What the founder has to do (not delegable)

| Task | Rough effort | Unblocks |
|---|---|---|
| Engage fintech-lead-gen compliance lawyer | 3 × 30-min intro calls + retainer | All state-specific UDAAP review |
| Close first lender partnership (Lendflow or Biz2X) | TBD (4–8 weeks lead time per brief) | Lender panel claim becomes factual |
| Draft disclosure footnotes for lender count claim | 1 hour + lawyer review | Every state-index page hero |
| Decide on proof-card policy (illustrative tag vs. hold until real stories) | 30 min decision | Every city page |
| Approve the T2/T3 state rank order | 30 min review of this plan | Phase B sequencing |

## What I can do without founder input

| Task | Rough effort |
|---|---|
| Scaffold `StateData` for 7 flagship states with public-info fields only | 2 hours |
| Author `CityData` for 7 flagship cities with illustrative proof cards clearly labeled | 4–5 hours |
| Add `/trucking-loans/` national index page | 30 min |
| Add build-time placeholder-lint | 20 min |
| Add `sitemap.xml` | 20 min |
| Commit per state (seven commits for Phase A) | included |

Phase B and Phase C are the same pattern at scale, but **I cannot responsibly bulk-author proof cards** — the fabrications have to be labeled as such, and scaling fictional "proof" into 50 states pushes the site across the line from "illustrative examples" to "systematic misrepresentation" under FTC guidance even if every individual card has a disclaimer.

**Recommended sequence for me to execute:**
1. Add code helpers (national index, placeholder lint, sitemap) — 70 min
2. Pause for founder to answer the two decisions in the next section
3. Ship Phase A (7 states) based on decisions
4. Phase B, C as separate sessions

## Two decisions that unblock Phase A

These are framing-questions I can't answer. They're small. Both should be locked before authoring any new state content.

### Decision 1: Lender claim until partnerships close
Current hero copy: *"17 lenders on our panel actively fund Texas trucking operations"* — uses projected numbers.

Options:
- **(A)** Keep projected numbers as the launch copy. Footnote on `/disclosures` explaining "panel in development" methodology.
- **(B)** Soften to *"We route your application to the lenders in our network who are most likely to fund a [STATE] trucking operation"* — no numeric claim.
- **(C)** Wait for first lender partnership before publishing any state page with a numeric claim. Phase A proceeds with option B copy; switch to A once first partnership closes.

**Recommendation: C.** Ship Phase A with softened copy, upgrade to numeric claims when Lendflow or Biz2X closes. Lowest compliance risk, no delay to publishing.

### Decision 2: Proof card policy
Current proof cards are realistic fabrications (different use cases, realistic amounts, specific neighborhoods).

Options:
- **(A)** Label all proof cards `[Illustrative]` prominently on each card. Keep current content.
- **(B)** Remove proof cards from Phase A state pages entirely. Reintroduce when real stories accumulate.
- **(C)** Replace fabricated cards with composite "scenarios" written as *"Owner-operators in {City} have used Dispatched for..."* framing without specific-person-sounding detail.

**Recommendation: C.** Preserves the narrative density of the original design while removing the "specific person existed" implication. Low risk, high narrative retention.

## Gates and escalation points

- **After Phase A:** re-estimate Phase B/C time based on actual per-state hours authored.
- **Before Phase B:** check that compliance lawyer is engaged and producing per-state reviews in < 48 hours. If not, Phase B can still author but can't publish.
- **Before Phase C:** lender panel decision locked (Decision 1 above must have resolved). Otherwise thin-claims across 50 states looks worse than 10.
- **Before Phase D (metro expansion, future plan):** first funded loan happened and case-study pipeline exists. Don't 3× the page count on fictional proof.

## Cross-references

- **Project brief Section 5:** 4-layer SEO architecture. This plan is the Layer-3 (geo) population plan.
- **Project brief Section 6:** Compliance constraints per state. Authoritative on CA/NY/VA/UT filings.
- **Project brief Section 7 item "City content authored for 10 flagship states":** this plan expands that from 10 to 50.
- **Project brief Section 11 "six weeks from today":** "first 10 geo pages live" — Phase A closes that milestone.
- **`lib/cities.ts`:** the DRY state/city split committed at `f477db1` that makes this plan 50% cheaper per city than the original schema.
- **`app/trucking-loans/[state]/page.tsx`:** the state-index component to extend; no changes required for any of the phases above.
- **`app/trucking-loans/[state]/[city]/page.tsx`:** the city component (825 lines, unchanged since `6c534d1`). Every new state/city combination renders through this without code change.

## If you say "go Phase A"

I will:
1. Add code helpers (`/trucking-loans/` national index + placeholder-lint + `sitemap.xml`) in one commit.
2. Apply **Decision 1 = C** and **Decision 2 = C** as drafts to be overridden by you.
3. Scaffold StateData + one CityData for each of: GA, OH, IL, NY, PA, WA, AZ.
4. Ship one commit per state so each is bisectable.
5. Verify production after each commit (`/trucking-loans/{state}` + `/trucking-loans/{state}/{city}` both 200).
6. Report back with: 10 state pages live, authoring time actually taken, any constraint that surfaced.

If you override the two decisions first, I'll use your values.

If you want to name your own priority order across 50 (e.g., start with Phase C's low-volume states so the URL space is claimed), say that and I'll re-plan.
