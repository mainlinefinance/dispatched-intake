# Landing strategy — SEO indexation foundation

## Stack overview

Five PRs collectively close the indexation gap blocking `site:dispatched.finance` from returning any Google results. Together they ship: full root metadata + verification env slots, site-wide Organization/WebSite JSON-LD, LLM-crawler robots rules, `llms.txt`, post-build IndexNow auto-submit, BreadcrumbList on 6 dynamic-route families, FinancialService on 9 money pages, InsuranceAgency on /insurance, /apply noindex, /trucking sitemap removal, and a paste-ready 18-page copy spec for engineering to consume next sprint.

## Recommended merge order

| Order | PR | Why this order |
|-------|----|----|
| 1 | **#52** | Foundation. Defines helpers (`financialService`, `insuranceAgency`), root metadata, FAQ data file, robots, IndexNow. PRs #53 and #54 are explicitly branched off it. |
| 2 | **#53** | Branched from #52. BreadcrumbList on programmatic routes — pure additive, no overlap with anything else. |
| 3 | **#54** | Branched from #52. FinancialService on 9 money pages — pure additive. |
| 4 | **#55** | Branched from `main`. Doc-only (`docs/seo/per-page-copy.md`), zero code touched. Order doesn't matter; merge anywhere. |
| 5 | **#56** | **MUST come last AND requires manual conflict resolution.** Hard conflicts with #52 in `app/layout.tsx`, `app/page.tsx`, `components/seo/JsonLd.tsx`. See risks. |

Merge sequentially in one tab. After #52 lands, retarget #53 and #54 base from `seo/indexation-foundation` to `main` (one click each in GitHub UI) so they auto-rebase. #55 is fire-and-forget. #56 needs a sit-down rebase before merge — do not click the merge button.

## Risk register

| Risk | Severity | Mitigation |
|------|----------|------------|
| **#56 conflicts with #52** in layout.tsx, page.tsx, JsonLd.tsx — both PRs build the same Organization/WebSite/JsonLd helpers in parallel | **HIGH** | After #52 lands, rebase `feat/seo-schema-and-metadata` on main. Keep #56's unique deliverables only: `app/sitemap.ts` (drop /trucking), `app/apply/page.tsx` (noindex), `app/insurance/page.tsx` (InsuranceAgency JsonLd), `public/logo.png`. Discard duplicate organization/layout/jsonld changes — #52 already shipped them. |
| **Env var name divergence**: #52 uses `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_BING_VERIFICATION`; #56 uses `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` | **HIGH** | Pick one before configuring Render. Recommend #52's `NEXT_PUBLIC_*` names since #52 lands first and is the foundation. Update #56's `.env.example` during rebase. |
| **GSC sandbox period for new YMYL finance domain** — Google routinely sandboxes new finance/credit domains 3–6 months regardless of perfect schema | **HIGH** | Set realistic Day-7/Day-30 expectations (below). Don't promise traffic from indexation alone. Aggressive backlink work + brand mentions + IndexNow help shorten sandbox. |
| **IndexNow API rejection on first deploy** if `INDEXNOW_KEY` not set or key file not deployed | MED | #52 wraps script in `\|\| true` so deploy won't fail. Use `INDEXNOW_DRY_RUN=true` on first build to validate URL list before submitting. |
| **render.yaml change** could break deploy if YAML is malformed | MED | Watch first deploy log on #52 carefully. Rollback is a one-click revert in Render. |
| **Schema/visible-content drift** for FinancialService — descriptions are TODO(marketing) placeholders | MED | 9 grep-able TODO comments. Land #55 copy first, then schedule a follow-up PR to swap descriptions. Until then, schema is on-message but generic. |
| **Copy doc divergence** from page reality if pages are edited but `docs/seo/per-page-copy.md` not updated | LOW | Add the doc to PR-template review checklist. |
| **Lendflow widget interaction** with new metadata layer | LOW | None of the PRs touch `/apply` widget code; #56 only adds `robots: noindex` on /apply. Smoke test the widget loads after deploy. |

## Ops follow-up timeline

| Day | Owner | Task |
|-----|-------|------|
| 0 | eng | Merge #52 → wait for Render green → merge #53, #54 (retargeted to main) → merge #55 → rebase #56 manually → merge #56 |
| 0 | ops | `openssl rand -hex 16` → set `INDEXNOW_KEY` in Render (secret) → drop `public/<KEY>.txt` → push tiny PR → redeploy. Confirm log line `[indexnow] submitted N URLs (200 OK)`. |
| 0 | ops | Add `dispatched.finance` domain property in GSC (DNS TXT). Set `NEXT_PUBLIC_GSC_VERIFICATION` in Render. Submit `sitemap.xml`. Manually request indexing on top 10 money pages. |
| 0 | ops | Bing Webmaster Tools — one-click GSC import. Set `NEXT_PUBLIC_BING_VERIFICATION`. Submit sitemap. |
| 1–2 | ops | Backlink velocity: 5 trucker directory submissions, HARO signup (HARO/Qwoted), 1 press release on launch + lender-paid model angle. |
| 3 | eng | Follow-up PR: swap 9 `TODO(marketing)` descriptions for copy from `docs/seo/per-page-copy.md`. Wire per-page `metadata` exports for the 18 pages from the same doc. |
| 7 | eng+ops | Indexation check (see Day-7 expectations). |
| 14 | eng+ops | GSC Performance: long-tail impression check, first-click data. |
| 30 | ops | Conversion attribution review — first lead/call sourced from organic. |

## Day-7 indexation expectations

- **GSC Coverage**: 30–60% of 107 sitemap URLs in "Discovered – currently not indexed" or "Crawled – currently not indexed". Realistic indexed count: **8–25 URLs** (homepage, /apply, top 5 money pages, a few state pages). New finance domains rarely break 50% indexed in week one.
- **IndexNow build log**: ~107 URLs submitted per deploy. Expect 200 OK from Bing/Yandex; Google ignores IndexNow but doesn't reject.
- **GSC Performance impressions**: <50 impressions, mostly brand queries ("dispatched finance", "dispatched.finance trucking"). Zero or near-zero clicks. **No money-keyword impressions yet** — Google won't rank a 7-day-old YMYL domain for "trucking working capital" in a competitive SERP.
- **LLM visibility test**: Ask ChatGPT/Claude/Perplexity "best lender-paid trucking insurance marketplace" or "where can I apply for trucking working capital fast" — Dispatched should NOT appear yet; LLM training/index cycles run weeks-to-months. `llms.txt` is a long bet.

If Day-7 indexed count is **<5**, escalate: re-verify GSC ownership, re-submit sitemap, manually request indexing on 5 more pages, check `robots.txt` is actually serving the correct rules in prod.

## Out of scope (acknowledged, deferred)

- Visible breadcrumb UI (required for BreadcrumbList rich snippets — schema-only ships now)
- Per-page `metadata` exports for the 18 priority pages (blocked on #55 landing first; do as the Day-3 follow-up PR)
- Replacing 9 `TODO(marketing)` FinancialService descriptions
- Visible FAQ UI on /apply and /qualify
- HowTo schema on calculators, Article schema on /research/* deep pages
- /carriers keyword refinement (open question in #55)
- Webhook-triggered IndexNow (post-build is sufficient)

## Single-afternoon ship checklist

1. **(5m)** Merge PR #52. Wait for Render green deploy. Curl `/robots.txt` and `/llms.txt` to confirm 200.
2. **(2m)** In GitHub UI, retarget PR #53 and PR #54 base branch from `seo/indexation-foundation` to `main`.
3. **(5m)** Merge PR #53, then #54. Wait for Render green between each.
4. **(2m)** Merge PR #55 (doc-only, no deploy impact).
5. **(20m)** Locally rebase `feat/seo-schema-and-metadata` on top of new `main`. Resolve 3 conflicts: keep PR #56's unique pieces (`app/sitemap.ts` /trucking removal, `app/apply/page.tsx` noindex, `app/insurance/page.tsx` InsuranceAgency, `public/logo.png`). Discard duplicate Organization/layout/JsonLd code already shipped by #52. Align env var names to `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_BING_VERIFICATION`. Force-push, merge.
6. **(5m)** `openssl rand -hex 16` → IndexNow key. Set in Render. Push `public/<key>.txt` PR. Redeploy. Confirm log.
7. **(15m)** GSC: add domain property → DNS TXT → wait for verification → set `NEXT_PUBLIC_GSC_VERIFICATION` in Render → redeploy → submit sitemap → request indexing on /, /trucking-working-capital, /equipment-financing, /truck-repair-loans, /semi-truck-financing, /invoice-factoring-for-truckers, /owner-operator-financing, /bad-credit-truck-financing, /apply, /insurance.
8. **(10m)** Bing Webmaster Tools: one-click GSC import → token → set `NEXT_PUBLIC_BING_VERIFICATION` in Render → redeploy → submit sitemap.
9. **(10m)** Validate homepage + 3 money pages at validator.schema.org and Google Rich Results Test. Zero errors expected.
10. **(5m)** Calendar reminder: Day-7 indexation check, Day-14 long-tail check, Day-30 conversion attribution.

Total: **~80 minutes engineering + ~30 minutes ops setup**. Done by 5pm.

---

*Brief generated 2026-05-10. Re-run after PR #56 rebase + per-page metadata follow-up PR lands to refine Day-7 numbers.*
