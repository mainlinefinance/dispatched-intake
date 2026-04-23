# Landing page — critique-driven fix plan

**Version:** 2026-04-23
**Status:** Authored. No implementation yet. Hand off to Claude Code one phase at a time — do not bulk-execute.
**Inputs:**
- Design critique conducted 2026-04-23 against `app/page.tsx` and `components/landing/*` (this document is the implementation plan derived from it).
- [`docs/accessibility-audit-2026-04-23.md`](../accessibility-audit-2026-04-23.md) — 16 WCAG findings, 3 critical / 8 major / 5 minor. **All Phase E tasks below trace back to a numbered finding in that audit.**
- [`docs/design-system-audit-2026-04-23.md`](../design-system-audit-2026-04-23.md) — token-drift / parallel-button / parallel-eyebrow findings. **Phase D is scoped from that audit, narrowed to the landing surface only.**

This plan deliberately covers **only the marketing landing route (`/`)** plus the legal stub pages it depends on. The intake flow at `/apply` and the `/trucking-loans/[state]` geo pages are out of scope; geo work continues under [`2026-04-22-50-state-coverage.md`](./2026-04-22-50-state-coverage.md).

## Pre-flight reading for the implementing agent

Before touching code, read these in order. Do not skip — three of them encode constraints that will silently bite if missed.

1. **`AGENTS.md` at repo root.** Two lines, both binding: this is not the Next.js the model was trained on (Next 16.2.4, App Router, RSC by default), and the canonical docs are in `node_modules/next/dist/docs/`. When in doubt about a Next API, read those docs, not the model's prior.
2. **`README.md` § "Design system".** "Do not hardcode hex values or spacing — if you need a new token, add it to `tokens.css` first." Phase D enforces this; treat it as the rule, not advice.
3. **`README.md` § "Animations".** Exactly three animations in the intake flow, each with a `prefers-reduced-motion` opt-out. The landing has its own pulse animation (already guarded). **Do not add new animations on the landing as part of this plan.** If a fix tempts you toward one, escalate.
4. **The two audits referenced above.** Phase D and Phase E are direct executions of audit findings — do not re-derive recommendations, follow them.
5. **`lib/copy.ts`.** Single source of truth for vertical-variant copy in the intake flow. The landing currently inlines its own strings (`Hero.tsx`, `DeclineSection.tsx`, etc.); **do not** migrate landing copy into `lib/copy.ts` as part of this plan — that's a separate refactor and would balloon scope.

## Branch and commit cadence

- Branch off `main`: `git checkout -b landing-fixes-2026-04-23`
- One commit per **task** (not per phase). Tasks are numbered (A1, A2, …) so commit messages can reference them: `A2: replace placeholder phone with NEXT_PUBLIC_SUPPORT_PHONE`
- Each phase ends with `npm run lint && npm run typecheck && npm run test`. All three must pass. If any fails, fix before moving phases.
- Phase A is the only phase that **must** ship together — it is a compliance bundle, not piecemeal hygiene. Phases B–F can ship independently if the founder approves them out of order.

## Honest constraints (read before estimating timelines)

These bind every phase. Don't propose a fix that violates them.

### 1. The phone number is not Claude Code's call

`Nav.tsx:8–9` exports `PHONE_DISPLAY = "(555) 555-0100"` and `PHONE_TEL = "tel:+15555550100"` — a placeholder that ships site-wide (nav, mobile menu, footer, FAQ "a human picks up"). Replacing it with a real number requires the founder to either provision a real line (Twilio, Aircall, RingCentral) or commit to "no phone" UX. **Until that decision is made, A1 cannot complete — the placeholder is the blocker, not the code.** Plan B (no phone) is a real option; document the choice in the commit.

### 2. Legal pages need a lawyer, not a model

Privacy, Terms, Licenses, "Do not sell" are linked from the footer and currently `href="#"`. Claude Code can scaffold the routes and import a lawyer-supplied draft, but **must not write the legal text itself**. The compliance lawyer's draft is the input; the implementation is just routing + typography. If the drafts aren't ready, A3 ships routes with a "draft pending counsel review" placeholder body and a noindex meta tag — not lorem ipsum, not AI-generated policy.

### 3. The "Trucking" nav link's destination is a product question

It's currently `<a href="#" className="active">Trucking</a>`. Three plausible answers:
- **(a)** It's the home page — change to `<Link href="/">` and the `.active` styling auto-applies on `/`.
- **(b)** It's a /trucking hub page that doesn't exist yet — create the route as part of A4, even if the page just redirects to `/` for now.
- **(c)** It's the /trucking-loans/ state index — redirect there.

**A4 picks (a) by default** because the geo plan (`2026-04-22-50-state-coverage.md`) treats the state pages as bottom-of-funnel destinations, not nav anchors, and there is no /trucking hub planned. The founder should confirm before merging.

### 4. The `.t-*` typography utility classes are orphaned, and adopting them is bigger than this plan

The design-system audit flagged that `.t-display / .t-h1 / .t-h2 / .t-h3 / .t-body-lg / .t-body / .t-small / .t-caption / .t-eyebrow / .t-mono` are defined in `tokens.css` and never consumed. Migrating the landing's `<h1>`, `<h2>`, `<h3>` to use these classes is a real refactor that touches every section component. **Phase D does NOT do this.** Phase D only fixes the specific hardcoded font-sizes that diverge from existing tokens (hero h1 → 64px vs `--fs-display` 56px; section h2 → 44px vs `--fs-h1` 40px). The full `.t-*` adoption is a separate plan.

### 5. The qualification calculator's `computeMatch` thresholds are illustrative, not contractually correct

`QualificationCalc.tsx:12–27` returns lender counts (5, 9, 14, 18) and APR ranges that look like committed claims but are actually placeholder math. The lender-panel reality (per `2026-04-22-50-state-coverage.md` § Honest Constraints #1) is **zero signed lender partnerships**. Phase B's hero CTA cleanup will make this calculator more prominent. **That makes the inaccurate numbers more load-bearing than they were before.**

This is not a Claude-Code-fixable problem — Claude Code can make the calculator either more honest ("estimated lender count") or hide it behind a feature flag. Until the founder decides which, **B3 must add a `data-illustrative="true"` attribute and an inline footnote ("Estimate. Final lender count depends on your full application.") to the calculator's result panel.** The footnote is non-negotiable.

### 6. UDAAP exposure compounds with prominence

The hero already carries factual claims: `$25K–$250K`, `24–48 hours`, `$47M funded`, `31 hrs median`. Footnotes 1 and 2 cover the last two. The first two have no footnote. **A6 adds footnotes for the dollar range and speed claim** because Phase B will make the hero more focused (= the claims are more visible = the regulatory exposure is higher).

---

## Phase A — Compliance and hygiene (ship together)

**Goal:** make the site honestly "live." Until A1–A6 land, the site is materially pre-launch despite being deployed.

**Acceptance for the phase:** every interactive element either does what it says it does, or is visibly marked as not-yet-available. Zero `href="#"` in the rendered DOM (verify via `document.querySelectorAll('a[href="#"]').length === 0` in browser console after build).

| # | Task | Files | Acceptance |
|---|---|---|---|
| **A1** | Replace placeholder phone. Two paths — pick with founder. **Path P (real phone):** export `PHONE_DISPLAY` / `PHONE_TEL` from `lib/contact.ts` (new file), drive from `process.env.NEXT_PUBLIC_SUPPORT_PHONE`, document the env var in `README.md` § "Environment variables" and `.env.example`. **Path N (no phone):** delete `Nav.tsx:8–9`, the `<a href={PHONE_TEL}>` block in `Nav.tsx:32–35`, the mobile-menu phone in `Nav.tsx:64–67`, the footer phone CTA in `Footer.tsx:17–20`, and the FAQ "human picks up" line in `FAQ.tsx:94–96`. Replace footer/FAQ contact affordance with a `mailto:` if support email exists, else delete. | `components/landing/Nav.tsx`, `components/landing/Footer.tsx`, `components/landing/FAQ.tsx`, possibly new `lib/contact.ts`, `README.md`, `.env.example` | No string `(555) 555-0100` anywhere in `components/`, `lib/`, or `app/`. `grep -r "555.*0100" .` returns zero hits. If Path N: no `tel:` links remain on landing. |
| **A2** | Strip `data-screen-label="01 Hero"`, `"02 Why banks decline"`, `"03 How the money moves"`, `"04 Funded borrowers"`, `"05 Lender panel"`, `"06 FAQ"`, `"07 Footer"` from all landing section components. These are prototype-bundle artifacts that ship into prod DOM. | `components/landing/Hero.tsx:9`, `DeclineSection.tsx:49`, `HowItWorks.tsx:55`, `ProofSection.tsx:51`, `LenderStrip.tsx:3`, `FAQ.tsx:89`, `Footer.tsx:7` | `grep -r "data-screen-label" components/landing/` returns zero hits. |
| **A3** | Create stub legal routes. Four pages: `app/(legal)/privacy/page.tsx`, `terms/page.tsx`, `licenses/page.tsx`, `do-not-sell/page.tsx`. Each renders the lawyer-supplied draft if present in `docs/legal/{slug}.md` (Markdown imported via Next's MDX or raw string + `marked`); else renders a fallback panel: H1 + "Draft pending counsel review. For inquiries, contact [support]." + `<meta name="robots" content="noindex,nofollow">`. **Do not write policy text.** Re-link from `Footer.tsx:113–118` legal-links and `Footer.tsx:25–80` columns to the new routes. | `app/(legal)/*/page.tsx` (4 new), optionally `lib/legal.ts`, `components/landing/Footer.tsx` | All four routes return 200. Footer "Privacy / Terms / Licenses / Do not sell" links resolve. If draft file missing, page renders fallback + noindex meta. |
| **A4** | Resolve "Trucking" nav link per Constraint #3. **Default: change `Nav.tsx:22–24` to `<Link href="/" className={pathname === "/" ? "active" : ""}>Trucking</Link>` and add `aria-current="page"` when active.** Use `usePathname()` from `next/navigation`. Same fix in mobile menu (`Nav.tsx:52–54`). | `components/landing/Nav.tsx` | Clicking "Trucking" from any page goes to `/`. On `/`, the link carries `aria-current="page"` and visual `.active` state. No `href="#"`. |
| **A5** | Resolve "Construction — Soon" nav link per audit finding #11. Convert from `<a href="#" className="soon">` to `<span className="soon" aria-disabled="true">`. Repeat in mobile menu. The "Construction (soon)" footer link in `Footer.tsx:38` becomes `<span aria-disabled="true">Construction <span className="soon-tag">soon</span></span>`. The `.soon` styles in `landing.css:51–60` already work for spans because they don't depend on anchor pseudo-classes. | `components/landing/Nav.tsx`, `components/landing/Footer.tsx` | No focusable element with text "Construction" in tab order. Visual treatment unchanged. |
| **A6** | Footnote the unfootnoted hero claims. Currently `$47M funded` (footnote 1) and `31 hrs median` (footnote 2) are footnoted, but `$25K–$250K` and `typically funded in 24–48 hours` in the H1 are not. Add footnote 3 to the `$25K–$250K` mono span and footnote 4 to "24–48 hours". Append two new entries to the trust-note paragraph in `Hero.tsx:64–68` and to `app/disclosures/page.tsx`. | `components/landing/Hero.tsx`, `app/disclosures/page.tsx` | Hero renders 4 sup markers (1, 2, 3, 4). All four resolve to entries on `/disclosures`. |
| **A7** | Audit remaining `href="#"` and convert per the same rule as A4/A5: real route, or `<span aria-disabled>`. Footer columns (`Footer.tsx:26–80`) have ~12 of these. Convert the ones that map to existing routes (`/disclosures`, `/apply`, `/trucking-loans/{tx,fl,ca}` per the geo plan T0 baseline); convert the rest to disabled spans. | `components/landing/Footer.tsx` | Same DOM-query check as the phase acceptance. |

**Gate:** before merging Phase A, build, deploy to a Render preview, and do a full keyboard-only walkthrough. No dead-end tab stops. Footer renders without errors when JS is disabled (RSC default).

---

## Phase B — Hero conversion clarity

**Goal:** one primary action in the hero, not two. Critique finding: the orange `btn-primary lg` "See what I qualify for" CTA and the qualification calculator card both promise the same outcome, splitting the user's attention. The calculator is the stronger of the two (it returns a personalized result), so it stays primary; the orange CTA demotes.

**Do not do this in the same commit as Phase A.** It is a UX change with founder visibility. Ship A first, get the founder's eye on the live preview, then propose B as a follow-up PR.

| # | Task | Files | Acceptance |
|---|---|---|---|
| **B1** | Demote the hero's orange CTA. In `Hero.tsx:35–45`, swap the `btn-primary lg` Link for a `btn-secondary lg` and move the existing "How it works" anchor into a tertiary text link below ("Or read how the money moves →"). Keep the orange `btn-primary` in nav (`Nav.tsx:36–38`) — that's the persistent reach for users who skip the calculator. Add the new `.btn-secondary.lg` size variant in `landing.css` if it doesn't exist (currently only `btn-primary` has `.sm` / `.lg`). | `components/landing/Hero.tsx`, `app/styles/landing.css` | Hero has zero hi-vis (`--color-hiviz-400`) elements visible in initial paint. Nav still has the orange CTA. Calculator submit button still has the orange CTA. |
| **B2** | Unify CTA labels. Three currently-different labels for the same action: hero `CTA_LABEL = "See what I qualify for"`, calculator submit "See my lender match count," section eyebrow "See which lenders will consider your file." Standardize on `"See what I qualify for"` everywhere. Calculator submit becomes "See what I qualify for"; calculator header sub-title becomes "Two questions, no credit check" (drops the redundant "See which..."). | `components/landing/Nav.tsx:10` (`CTA_LABEL` already exported from here), `components/landing/QualificationCalc.tsx:104, 156` | All three locations render the same string. `grep -r "match count\|lenders will consider" components/landing/` returns zero. |
| **B3** | Per Constraint #5, mark the calculator output as illustrative. In `QualificationCalc.tsx:42–96` (the `submitted` branch), add `data-illustrative="true"` to the `.qual-result` root and a footnote line above the CTA: `"Estimate based on your two answers. Final lender count and APR depend on your full application."` Use the existing `.qual-foot` style. | `components/landing/QualificationCalc.tsx` | Submitted state renders the footnote, prominently enough to read but not so loud it competes with the lender-count headline. Visual diff before/after should be obvious to a designer at a 5-second glance. |
| **B4** | Tighten the H1. Current: `"Working capital for owner-operators and small fleets. $25K–$250K, typically funded in 24–48 hours."` That's three claims (proposition + price + speed) in one display-weight sentence with a mid-line font-family switch. Restructure as: H1 = `"Working capital for owner-operators and small fleets."` (no mono span); subhead unchanged; the `$25K–$250K · 24–48 hours` pair moves into the existing `.trust-bar` below as two new items (joined to the existing `$47M / 31 hrs` row). Trust bar grows from 2 items to 4. Update the trust-bar grid in `landing.css:172–186` if needed. | `components/landing/Hero.tsx`, `app/styles/landing.css` | H1 is one line at desktop, max two lines at mobile. No `.mono` span inside the H1. Trust bar reads `$25K–$250K · 24–48 hrs · $47M last 30 days · 31 hrs median to funds`. |

**Gate:** founder review of the live preview before merging. Hero is the highest-leverage surface; do not bypass.

---

## Phase C — Single source of truth for the flow visualization

**Goal:** the landing currently shows the same `soft check → match → one hard pull` flow three different ways: `HeroDataFlow` (3 steps), `HowItWorks.flow-diagram` (5 steps), and the `dataflow-grid` Now/Next/Later inside the calculator's submitted state. Promise-then-reveal is fine; promise-then-different-promise is confusing. Keep the 5-step canonical version, retire the others.

| # | Task | Files | Acceptance |
|---|---|---|---|
| **C1** | Delete `HeroDataFlow`. Remove the import in `Hero.tsx:2`, the `<HeroDataFlow />` render at `Hero.tsx:46`, the component file `components/landing/HeroDataFlow.tsx`, and the `.hero-dataflow / .hdf-* ` styles in `landing.css:680–704`. | `components/landing/Hero.tsx`, delete `components/landing/HeroDataFlow.tsx`, `app/styles/landing.css` | `git rm` on the component file. No references remain. Hero looks unchanged except for the absent strip. |
| **C2** | Simplify the calculator's Now/Next/Later block. Currently `QualificationCalc.tsx:60–80` renders a 3-row grid restating the same flow. Replace with a single sentence: `"Your answers stay with us until you finish the application. Then a redacted profile (no name or contact) goes to up to 5 matched lenders. One hard pull only happens after you pick one."` Drop the `.dataflow-title / .dataflow-grid / .when / .what` styles in `landing.css:293–318` and the `dataflow` div in JSX. The continuation CTA stays. | `components/landing/QualificationCalc.tsx`, `app/styles/landing.css` | Submitted state is shorter. The line above the CTA is one paragraph in `--color-ink-secondary`, not a labeled grid. |
| **C3** | Add a single contextual link from the calculator's submitted state to `#how-it-works`. After the simplified sentence in C2, append: `"<a href='#how-it-works'>See the full 5-step flow →</a>"`. This is the intentional narrative bridge from "I qualified" to "here's what happens next." | `components/landing/QualificationCalc.tsx` | Anchor link exists, scrolls smoothly to the HowItWorks section. |

---

## Phase D — Token consumption and drift (landing only)

**Goal:** stop the specific token violations the design critique called out. Per Constraint #4, this phase is **scoped narrow** — fixes the divergent font-size hardcodes and the rgba alpha leaks; does **not** migrate to `.t-*` utility classes.

| # | Task | Files | Acceptance |
|---|---|---|---|
| **D1** | Resolve the hero font-size divergence. `landing.css:160` sets `.landing .hero h1 { font-size: 64px }` while `--fs-display: 56px`. Two acceptable resolutions: **(a)** raise the token: change `--fs-display` to 64px in `tokens.css:51` and verify no other consumer breaks (the intake flow's `.bigcard` and Screen 7 `.match-headline` are the candidates — read those CSS files first). **(b)** lower the hero: change `font-size: 64px` to `var(--fs-display)`. **Pick (a)** unless the founder objects, because the design bundle's hero IS the display reference. Same for the 44px `.section-head h2` vs `--fs-h1: 40px` — raise the token. | `app/styles/tokens.css`, `app/styles/landing.css`, possibly `intake.css` if (a) breaks something | Either no hardcoded font-size on hero h1 / section-head h2, or the tokens have been raised to match and a comment in `tokens.css` notes the change. `grep -E "font-size: (64|56|44|40)px" app/styles/landing.css` returns only token references. |
| **D2** | Eliminate `rgba(250, 247, 242, …)` literals in `landing.css`. Used at `:442, :443, :600, :607, :620, :624, :633, :640`. Add to `tokens.css`: `--color-ink-inverse-90`, `--color-ink-inverse-70`, `--color-ink-inverse-50`, `--color-ink-inverse-14` (the four alpha levels actually used). Replace literals with token references. Update the `.feat-card.median .lede` rgba at `:442` to use the new tokens. | `app/styles/tokens.css`, `app/styles/landing.css` | `grep "rgba(250" app/styles/landing.css` returns zero hits. New tokens present in `tokens.css` with comment explaining they're alpha aliases of `--color-ink-inverse`. |
| **D3** | Eliminate `rgba(30, 102, 66, …)` literals in `landing.css:148, 153`. These are alpha-overlays on the hero pulse. Add `--color-ok-600-12a` and `--color-ok-600-04a` to tokens; replace. | `app/styles/tokens.css`, `app/styles/landing.css` | Same check as D2. |
| **D4** | Add `--radius-pill: 999px` (or `--radius-full`) and replace the 999px / 100px hardcodes in `landing.css` (search and replace). The `.flow-n` badges and `.hdf-dot` (now deleted in C1) are the candidates. | `app/styles/tokens.css`, `app/styles/landing.css` | New token defined. Hardcodes gone. |
| **D5** | Document the token-consumption rule in a top-of-file comment in `landing.css`. One line: `/* No raw px font-sizes or rgba color literals in this file. Add tokens to tokens.css first. */`. This is preventive, not corrective — it makes the next contributor's lint mistake catchable in code review. | `app/styles/landing.css` | Comment present in first 5 lines of file. |

**Out of scope (do not do, per Constraint #4):**
- Migrating `<h1>` / `<h2>` / `<h3>` JSX to `.t-h1` / `.t-h2` / `.t-h3` utility classes
- Renaming `.btn-primary` to `.btn` or unifying with intake's `.btn` system
- Filling in the missing color-scale stops (steel-300/500/700, etc.)

Those are real follow-ups; track them in a new plan if the founder wants them.

---

## Phase E — Accessibility execution (port the audit)

**Goal:** execute the findings from `accessibility-audit-2026-04-23.md` for the landing route. Each task below cites the audit finding number; **do not re-derive recommendations — follow them.**

| # | Task | Audit ref | Files | Acceptance |
|---|---|---|---|---|
| **E1** | Wrap landing content in `<main id="main-content">`. Currently `app/page.tsx:19` opens a `<div className="landing">` with no landmark. The intake route already does this correctly at `app/apply/page.tsx`. | Finding #13 (Critical) | `app/page.tsx`, `app/styles/landing.css` (selector update if `.landing` was used as a layout host) | `<main id="main-content">` wraps everything below `<Nav />`. CSS still applies (selector becomes `.landing main` or `main.landing`, designer's call). |
| **E2** | Add a skip-to-content link as the first focusable element in `app/page.tsx`. Standard pattern: `<a href="#main-content" className="skip-link">Skip to main content</a>` with the visually-hidden-until-focused CSS in `landing.css`. Use `var(--color-hiviz-400)` for the focus background. | Finding #9 (Major) | `app/page.tsx`, `app/styles/landing.css` | Tabbing into the page surfaces the skip link first. Activating it focuses `#main-content`. |
| **E3** | Global `:focus-visible` outline for landing buttons and links. Add to `landing.css`: `.landing a:focus-visible, .landing button:focus-visible { outline: 2px solid var(--color-hiviz-600); outline-offset: 2px; border-radius: var(--radius-sm); }`. Spot-adjust where the outline collides with rounded buttons (use `border-radius: var(--radius-md)` for `.btn-primary`). The intake flow at `intake.css:554–556` is the reference pattern. | Finding #8 (Critical) | `app/styles/landing.css` | Tab through nav, hero CTAs, FAQ buttons, footer links — every focused element shows a visible 2px outline. Verify with the keyboard-walk in the gate below. |
| **E4** | Replace `<a href="#how-it-works"><button type="button" className="btn-secondary">How it works</button></a>` in `Hero.tsx:40–44` (anchor wrapping a button is invalid HTML and breaks SR/keyboard semantics). Use a single styled anchor: `<a href="#how-it-works" className="btn-secondary lg">How it works</a>`. The `.btn-secondary` selector already matches anchors because `landing.css:14` strips anchor underline / inherits color. | Finding #10 (Major) | `components/landing/Hero.tsx` | No `<button>` inside `<a>` anywhere on the landing route. Visual unchanged. |
| **E5** | Darken `--color-ink-tertiary` from `#6F7A82` to `#5A6369` (4.79:1 on white, 4.48:1 on paper, 4.04:1 on sunken — all clear AA passes). This is one token, ~10 consumers — verify none look strange after change. | Findings #1 & #2 (both Critical) | `app/styles/tokens.css:14` | Single token change. Manual visual diff on `.trust-note`, `.qual-steps`, `.flow-who`, `.proof-card .state-tag`. None should look broken; all should look slightly more legible. |
| **E6** | Strengthen form-field borders on landing. `--color-border` at `#E0D8CA` is 1.41:1 on white — invisible. Two paths: **(a)** introduce `--color-border-input: #9AA1A6` (3.0:1 on white) and use only on `.input` / `.select` / `.qual` card; **(b)** raise `--color-border` itself, accepting visual change across decline cards / proof cards / FAQ separators. Pick **(a)** to avoid blast radius. | Finding #3 (Critical) | `app/styles/tokens.css`, `app/styles/landing.css:209, 239` | Calculator and any landing inputs have visibly bordered fields. Card borders unchanged. |
| **E7** | Strengthen the focus state on landing inputs. Currently `:focus` switches border to `hiviz-400` (2.93:1, just under the 3:1 floor) plus a `hiviz-50` halo (1.15:1). Use the intake-flow pattern: `outline: 2px solid var(--color-hiviz-600); outline-offset: 2px; border-color: var(--color-hiviz-600);`. | Finding #4 (Major) | `app/styles/landing.css:248–251` | Focused calculator field has a visible outline that meets 3:1 against bg. |
| **E8** | Add `aria-hidden="true"` to decorative SVGs in `components/landing/icons.tsx` (`IconTruck`, `IconDollar`, `IconClock`, `IconArrowRight`, `IconChevronDown`, `IconFlowArrow`, `IconLock`, `IconPhone`, `IconClose`, `IconMenu`) and to `Logo.tsx`'s logo mark. Where the icon IS the only label (e.g., `mobile-menu-btn`), keep the `aria-label` on the button and `aria-hidden` on the inner SVG. | Finding #5 (Minor — but trivial fix) | `components/landing/icons.tsx`, `components/landing/Logo.tsx` | Each SVG either has `aria-hidden="true"` or is wrapped in an element with an accessible name. |
| **E9** | Fix touch targets per WCAG 2.2 AA §2.5.8 (24×24 minimum). Bump `.mobile-menu-btn` padding from `8px` to `10px` (44×44 final). Add `padding: 6px 0` to `.nav-links a` and `.footer .col a`. Convert `.back-link` (currently inline text with `padding: 0`) into `padding: 8px 0; min-height: 36px`. | Finding #12 (Major) | `app/styles/landing.css:69–73, 43, 631, 320` | Each interactive element has computed dimensions ≥ 24×24 (verify in DevTools). Layout rhythm unchanged at desktop. |
| **E10** | Wire `aria-controls` on FAQ buttons. Each `.faq-button` carries `aria-expanded` (already correct) but no `aria-controls`. Generate a stable id for each `.faq-answer-inner` (e.g., `faq-answer-${i}`) and reference it. | (Implicit — audit doesn't number this; surfaced in critique) | `components/landing/FAQ.tsx` | Each button has `aria-controls` pointing at its answer's id. |
| **E11** | Gate non-pulse landing animations on `prefers-reduced-motion`. The FAQ chevron rotate (`landing.css:563`), FAQ height transition (`:570`), and mobile-menu slide are unguarded. Wrap in `@media (prefers-reduced-motion: reduce) { .landing .faq-button .chev, .landing .faq-answer { transition-duration: 0.01ms; } .landing .mobile-menu { animation: none; } }`. | Finding #14 (Minor) | `app/styles/landing.css` | Toggle reduced-motion in OS settings; FAQ instant-toggles, mobile menu instant-snaps. |

**Gate:** before merging Phase E, run a manual keyboard-only walkthrough from page load → submit calculator → open FAQ → reach footer. No focus traps, every focused element is visible, no dead-end tab stops (those should already be gone from Phase A). If `axe-core` is installable as a dev dependency, run it and capture remaining violations as a follow-up.

---

## Phase F — Visual polish

**Goal:** the long tail. None of these are blockers; bundle into a single PR after E ships.

| # | Task | Files | Acceptance |
|---|---|---|---|
| **F1** | Footnote markers (`<sup>1</sup>`, etc.) currently `font-size: 10px` (below the 11px floor) in `Hero.tsx:53, 60`. Bump to 12px and switch color from inherited tertiary to `--color-ink-secondary`. The footnotes themselves (the `.trust-note` paragraph) currently 11px — bump to 12px. | `components/landing/Hero.tsx`, `app/styles/landing.css:188` | Footnote markers and footnote body both 12px. |
| **F2** | FAQ `max-height: 400px` clamp (`landing.css:572`) will silently clip long answers at narrow widths. Switch to the modern `grid-template-rows` animation pattern (animate from `grid-template-rows: 0fr` to `1fr`) — content is no longer height-clamped. | `app/styles/landing.css` | Open every FAQ at 320px viewport width; no answer is clipped. |
| **F3** | Decline-card hover transitions (`landing.css:363`) animate border-color but only on hover. Add `:focus-within` so keyboard users get the same affordance — even though the card itself is non-interactive, its decline number is referenced by surrounding text. (Audit didn't flag this; it's a polish call.) | `app/styles/landing.css` | Tab focus on any element inside a decline card lights the card border. |
| **F4** | The `.feat-card.median` dark card sits in a row of three light cards inside `.feat-grid` with `border-right: 1px solid var(--color-border)` separators. The dark card's right border (against the next light card or container edge) doesn't visibly differentiate. Adjust: when `.feat-card.median` is the rightmost card (it currently is), set `border-right: 0`. When it's not rightmost (future), set `border-right: 1px solid var(--color-steel-800)` to maintain the dark-on-dark separator. | `app/styles/landing.css:437–460` | At desktop, the dark card's right edge meets the container cleanly. At mobile (stacked), the bottom-border behavior already correct per `:460`. |
| **F5** | The `.lender-strip` section ("24 lenders on our panel") is a full vertical-padded section (56px top + bottom) carrying ~10 words of content. Either (a) move into the existing `.flow-diagram` section as a header line, or (b) merge into the existing trust-bar in the hero. **Recommend (a).** Lift the headline + cta-link into `HowItWorks.tsx` as a header above `.flow-diagram`, delete `LenderStrip.tsx`, drop `landing.css:521–540`. | `components/landing/HowItWorks.tsx`, delete `components/landing/LenderStrip.tsx`, `app/page.tsx` (drop import + render), `app/styles/landing.css` | LenderStrip section is gone. The "24 lenders" line sits as a sub-headline above the flow-diagram. Page is one section shorter. |

---

## Final verification

Run after every phase, but mandatory after the full plan:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

All four must pass. If `npm run build` introduces warnings about unused imports (likely after C1, F5), clean them up — they're not warnings to ignore.

**Manual checklist** (run in a private/incognito window with cache disabled):

- [ ] No `(555) 555-0100` anywhere on the page (DevTools "find in all sources")
- [ ] No `href="#"` on any rendered anchor (`document.querySelectorAll('a[href="#"]').length === 0`)
- [ ] Tab from page top → all the way through footer. No invisible focus, no dead stops.
- [ ] `/privacy`, `/terms`, `/licenses`, `/do-not-sell` all return 200 with content (or noindex stub)
- [ ] All four hero claims have footnote markers; each marker resolves on `/disclosures`
- [ ] Calculator submission shows the "Estimate based on..." footnote
- [ ] At 320px viewport: no horizontal scroll, no clipped FAQ answers, mobile menu opens and closes
- [ ] At 768px viewport: hero stacks calculator below copy; flow-diagram stacks vertically
- [ ] At 1440px viewport: hero is two columns; flow is horizontal; proof grid is 4 columns
- [ ] OS-level "Reduce motion" → no FAQ height animation, no mobile-menu slide, no hero pulse
- [ ] Lighthouse accessibility score ≥ 95 on `/` (was lower per the audit; should clear after Phase E)
- [ ] Run `axe-core` (npx @axe-core/cli http://localhost:3000) — zero critical/serious violations

**Stop conditions** (pause and escalate to founder):

- A1 cannot complete because the phone number decision isn't made
- A3 cannot complete because legal drafts aren't ready (ship stub routes only — flag prominently)
- B1 changes hero conversion rate by >10% in either direction in the first 7 days post-merge — re-evaluate
- D1 token raise breaks intake-flow visual regression — revert and reopen the discussion

## Out of scope (track separately if the founder wants them)

- Migrating to the `.t-*` typography utility classes (per Constraint #4)
- Unifying the three parallel button systems (intake, landing, geo) — design-system-audit § Naming Consistency
- Filling missing color-scale stops (steel-300/500/700, hiviz-200/300/500/700)
- Promoting the input/field system to a shared primitive shared between intake and landing
- Replacing the 4-column proof-card grid with a denser layout (the critique flagged density but didn't recommend a specific fix — needs a design exploration, not a code task)
- Real lender-panel data wiring for the qualification calculator (blocked on lender partnerships per `2026-04-22-50-state-coverage.md`)
- Re-running this critique against `/apply` and the geo state pages
- Adding a new vertical (Construction) — the "soon" treatment in A5 is the holding pattern
