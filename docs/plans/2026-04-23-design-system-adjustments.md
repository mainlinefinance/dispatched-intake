# Plan — design system adjustments (handoff to Claude Code)

_Companion to `docs/design-system-audit-2026-04-23.md`. This document is written to be picked up and executed by Claude Code or a human with the same skillset. Work in the order listed — later phases assume earlier ones are merged._

## Context Claude Code should load first

Before touching anything, read these files in order. They establish the ground truth that this plan references:

1. `AGENTS.md` — Next.js 16 breaking changes warning; when in doubt, check `node_modules/next/dist/docs/`.
2. `README.md` — scope, testing setup (Vitest for pure logic, no component tests yet), local dev reqs.
3. `app/styles/tokens.css` — all 32 color props, 9 type tokens, 10 spacing tokens, 4 radii, 5 motion tokens. This is the source of truth.
4. `app/styles/intake.css`, `app/styles/landing.css`, `app/styles/geo.css` — the three consumer stylesheets. Each scopes via a prefix (`.phone`/intake-flow unprefixed, `.landing`, `.geo-page`/`.geo-*`).
5. `docs/design-system-audit-2026-04-23.md` — the full findings report with line numbers.

**Testing baseline.** `npm run lint && npm run typecheck && npm run test` must stay green at every PR boundary. There are no component tests and no visual regression rig yet — phase 0 below installs Stylelint; phase 6 is an optional visual-regression pass if the team wants it.

**Branching.** Each phase is a separate PR unless otherwise noted. Do not bundle phases; the diffs are big enough that reviewer fatigue will mask regressions.

---

## Phase 0 — prerequisites (half-day)

### 0.1 Install Stylelint with the token-enforcement ruleset

Most later work is "migrate raw px to tokens." Without a backstop, migrations regress the week after they merge. Land the linter first so every subsequent phase leaves the codebase in a strictly-better state than it started.

**Work:**

- Add devDeps: `stylelint`, `stylelint-config-standard`, `stylelint-declaration-strict-value` (optional, for value whitelisting).
- Create `stylelint.config.mjs` at the repo root:
  ```js
  export default {
    extends: ["stylelint-config-standard"],
    rules: {
      // Ban raw px on spacing properties in consumer stylesheets.
      // tokens.css is allowed — that's where the values live.
      "declaration-property-value-disallowed-list": [
        {
          "/^(padding|margin|gap|row-gap|column-gap)/": [
            "/^\\d+(\\.\\d+)?(px|rem|em)(\\s|$)/",
            "/^\\d+(\\.\\d+)?(px|rem|em)\\s+\\d+/",
          ],
          "font-size": ["/^\\d+(\\.\\d+)?px/"],
        },
        {
          ignoreValues: ["/var\\(--/", "0", "auto", "inherit", "initial"],
        },
      ],
      "color-no-hex": true,
      "color-named": "never",
    },
    ignoreFiles: ["node_modules/**", ".next/**", "public/**"],
    overrides: [
      { files: ["app/styles/tokens.css"], rules: { "color-no-hex": null } },
    ],
  };
  ```
- Add `npm run lint:css` → `stylelint 'app/**/*.css'` and wire into `npm run lint`.
- **Expect failures** on first run. Do NOT fix them in this phase — just land the config with `--allow-empty-input` or a warning-only mode so CI still passes. Phases 1–3 clear the backlog.

**Acceptance:**
- `npm run lint:css` runs locally and in CI (even if it emits warnings).
- `stylelint.config.mjs` committed.
- `package.json` has the new script and devDeps.

### 0.2 Capture a visual baseline (optional but recommended)

Without a visual-regression rig, the only way to catch CSS regressions is a human eyeball. Quick mitigation:

- `npm run build && npm start`, then take full-page screenshots of `/`, `/apply`, `/disclosures`, and one `/trucking-loans/[state]/[city]` URL at desktop (1440px) and mobile (390px) viewports. Commit them under `docs/visual-baselines/2026-04-23/`.
- Every phase after this one should re-capture and eyeball-diff before merging.

---

## Phase 1 — unify the button system (2–3 days)

**Problem.** Three parallel button implementations: `.btn`/`.btn-primary`/`.btn-secondary` in intake.css, `.landing .btn-primary`/`.landing .btn-secondary`, and `.geo-btn`/`.geo-btn-primary`/`.geo-btn-secondary` in geo.css. They share visuals but diverge on focus/disabled/active state coverage and sizing APIs.

**Target.** One `.btn` primitive in tokens.css (or a new `app/styles/components/button.css` imported after tokens), with modifiers `.btn--primary`, `.btn--secondary`, `.btn--sm`, `.btn--lg`. Context-specific width classes (`.qual-cta`, `.nav-cta`) layer on top and stay where they are.

### 1.1 Write the unified button definition

**File:** create `app/styles/components/button.css` and `@import` it from `app/globals.css` after tokens.

**Content (target):**
```css
/* Dispatched — Button primitive. One source of truth across intake,
   landing, and geo. Size/variant via BEM-style modifiers. */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: 52px;
  padding: 0 var(--space-6);
  border-radius: var(--radius-md);
  border: 0;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--fs-small);     /* 14px — confirm vs. current 15px usage */
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--motion-hover) var(--ease-out),
    border-color var(--motion-hover) var(--ease-out),
    color var(--motion-hover) var(--ease-out);
}

.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn:focus-visible {
  outline: 2px solid var(--color-hiviz-400);
  outline-offset: 2px;
}

.btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Size modifiers */
.btn--sm { height: 44px; padding: 0 var(--space-4); font-size: 13px; }
.btn--lg { height: 56px; padding: 0 var(--space-8); font-size: var(--fs-body); }

/* Variant: primary — hiviz background, steel ink */
.btn--primary {
  background: var(--color-hiviz-400);
  color: var(--color-steel-900);
}
.btn--primary:hover:not(:disabled) { background: var(--color-hiviz-600); }
.btn--primary:active:not(:disabled) { background: var(--color-hiviz-800); }

/* Variant: secondary — bordered */
.btn--secondary {
  background: transparent;
  color: var(--color-steel-800);
  border: 1px solid var(--color-steel-600);
}
.btn--secondary:hover:not(:disabled) { background: var(--color-steel-50); border-color: var(--color-steel-800); }
```

**Note on sizing.** Current intake `.btn` is 52px/15px, landing's default `.btn-primary` is `padding: 14px 22px` (~50px height)/15px, `.sm` is ~40px/14px, `.lg` is ~54px/16px. Normalize to 44/52/56 heights and 13/14/16 sizes. Confirm with the designer before shipping; if there's pushback, retain the exact current dimensions and just unify the selector.

### 1.2 Migrate consumers

Do a single mechanical pass, then a review pass:

- **Intake callers** (`components/chrome/BottomActions.tsx`, `components/screens/Screen03Amount.tsx`'s `.amount-confirm` stays bespoke): `className="btn btn-primary"` → `className="btn btn--primary"`. Same for secondary.
- **Landing callers** (`components/landing/Nav.tsx`, `Hero.tsx`, `QualificationCalc.tsx`, mobile menu): `className="btn-primary nav-cta sm"` → `className="btn btn--primary btn--sm nav-cta"`. The `.landing` wrapper scope goes away once the primitive is global.
- **Geo callers** (`app/trucking-loans/[state]/page.tsx`, `app/trucking-loans/[state]/[city]/page.tsx`): `className="geo-btn geo-btn-primary geo-btn-lg"` → `className="btn btn--primary btn--lg"`.

### 1.3 Delete the duplicates

Once all callers are migrated, remove these blocks:
- `app/styles/intake.css:526–558` (the `.btn`, `.btn-primary`, `.btn-secondary`, `.btn:focus-visible` block).
- `app/styles/landing.css:85–115` (the `.landing .btn-primary` and `.landing .btn-secondary` blocks), plus the mobile-menu override at `landing.css:81`.
- `app/styles/geo.css:116–155` (the `.geo-btn*` block).

Keep context-specific width classes that previously lived alongside (`.qual-cta`, `.nav-cta`) — they now pair with `.btn`.

### 1.4 Verify

- `npm run lint && npm run typecheck && npm run test` clean.
- Load `/`, `/apply`, `/disclosures`, `/trucking-loans/[state]/[city]` in the browser. Tab through — every CTA must show the orange focus ring. Every primary CTA must hover darker. Every disabled state must visibly dim.
- Compare to `docs/visual-baselines/2026-04-23/` screenshots.
- Tick off the audit's priority action #1.

**Acceptance:**
- Zero matches for `btn-primary` or `geo-btn` without the `btn` base class.
- Every `<Link>` or `<button>` with `.btn--primary` has a visible focus ring.
- No regressions on mobile breakpoints (especially the hiding of `.btn--primary.nav-cta` at ≤720px currently at `landing.css:81`).

---

## Phase 2 — enforce token consumption (3–5 days, can parallelize with phase 3)

**Problem.** Tokens exist but raw px dominates. `--space-*` is used once in the whole codebase. `.t-*` type utility classes are fully orphaned. `var(--fs-*)` is used 21 times vs. 20+ distinct hardcoded font-size values.

**Target.** Every `padding`/`margin`/`gap` uses `var(--space-*)`. Every `font-size` uses `var(--fs-*)` or a `.t-*` utility class. Stylelint (installed in phase 0) makes this enforceable on new code.

### 2.1 Fill token gaps first

Retrofitting is easier if every needed value already has a token. Before migrating, audit what's in use vs. what tokens exist:

- Run `rg -h 'padding:|margin:|gap:|font-size:' app/styles/*.css | grep -oE '[0-9]+(\.[0-9]+)?px' | sort -u`
- For each unique value not covered by `--space-*` or `--fs-*`: either (a) round to the nearest token or (b) add the token to `tokens.css`.

**Known gaps from the audit:**
- Spacing: 20px (gutter-mobile exists), 28px, 56px, 72px, 80px don't have direct space tokens — `--space-6` is 24, `--space-8` is 32; `--space-12` is 48. Consider adding `--space-7: 28px`, `--space-10: 40px`, `--space-14: 56px`, `--space-18: 72px`, `--space-20: 80px` OR round to the existing stops (preferred — keep the scale disciplined).
- Font-size: 10, 10.5, 11, 13.5, 15, 17, 19, 22, 32, 44, 64 don't have tokens. Many are used once or twice — round to the nearest existing token. Keep the 22px display title in `.hero-intro .title` at `intake.css:141` — it's mobile chrome, not the type scale.
- Radius: add `--radius-pill: 999px` for the `.hdf-dot`, `.flow-n`, `.home-indicator .bar`, and dot indicators.

Document any additions with a comment in `tokens.css` explaining when to reach for them.

### 2.2 Migrate `intake.css`

Work top to bottom. For each declaration:
- `padding: 12px 16px 10px` → `padding: var(--space-3) var(--space-4) 10px` — if `10px` doesn't map cleanly, adjust to `var(--space-3)` (12px) after visual check, or add `--space-2-5: 10px`. Prefer rounding up.
- `gap: 8px` → `gap: var(--space-2)`.
- `font-size: 15px` → `font-size: var(--fs-small)` (14px) and verify in browser; if 15px was load-bearing, add `--fs-body-sm: 15px` or accept the jump.

**Scope:** ~120 raw-px occurrences across 750 lines. Work in 200-line chunks per commit so reviewers can follow.

### 2.3 Migrate `landing.css`

Same process. ~180 raw-px occurrences. Pay special attention to:
- Hero typography (`landing.css:158–169`) — `64px` / `44px` / `36px` should map to `--fs-display` (56) / H1 (40) / H2 (28), but the visual weight may differ. Coordinate with design.
- Section padding `96px 0` → `var(--space-24) 0` (96 matches `--space-24` exactly — good).
- Footer alpha colors: **defer to phase 3**, don't retrofit raw rgba here.

### 2.4 Migrate `geo.css`

Same process. ~120 occurrences. Watch for the `clamp()` hero title at `geo.css:194` — leave fluid typography alone unless a token equivalent exists.

### 2.5 Decide on `.t-*` utility classes

Either:
- **(a) Adopt them.** Sweep through `components/**/*.tsx`: `<h1>` → `<h1 className="t-h1">`, `<h2>` → `<h2 className="t-h2">`, etc. Then delete the per-stylesheet `h1/h2/h3` rules that duplicate the utility. This is cleanest but touches every component.
- **(b) Delete them.** Remove lines 93–167 of `tokens.css`. Forces all typography through `var(--fs-*)`.

Pick (a) for the disclosure page and landing (heavy editorial content). Pick (b) for intake if the chat-bubble typography doesn't map cleanly.

### 2.6 Verify

- `npm run lint:css` — zero token violations.
- Visual diff against baselines. Type-scale rounding is the highest-risk change; budget for a second pass after design review.
- `rg 'padding:\s*\d+' app/styles/` should return only `tokens.css` hits.

**Acceptance:**
- Stylelint `declaration-property-value-disallowed-list` passes (no warning suppressions).
- `rg 'var\(--space-' app/styles/ | wc -l` > 100.
- `rg 'var\(--fs-' app/styles/ | wc -l` > 40.

---

## Phase 3 — tokenize the transparent-ink-inverse pattern (half-day)

**Problem.** `rgba(250, 247, 242, α)` appears 7 times in `landing.css` at alphas 0.5, 0.7, 0.85, 0.9, 0.12, 0.14. These are manual alpha blends on `--color-ink-inverse` against the dark steel-900 footer. One-off `rgba(30, 102, 66, α)` on the hero pulse-dot, and `rgba(255, 255, 255, 0.08)` in `geo.css`.

**Target.** A small family of semantic alpha tokens, consumed everywhere.

### 3.1 Extend tokens.css

Add after the `--color-ink-inverse` line (~line 15):

```css
/* Ink-inverse alpha variants — for text/borders on dark surfaces.
   The base (#FAF7F2) with alpha applied. Use these instead of
   rgba(250, 247, 242, α) ad-hoc. */
--color-ink-inverse-90: rgba(250, 247, 242, 0.9);
--color-ink-inverse-70: rgba(250, 247, 242, 0.7);
--color-ink-inverse-50: rgba(250, 247, 242, 0.5);
--color-ink-inverse-12: rgba(250, 247, 242, 0.12);
```

And near the `--color-ok-*` block:
```css
/* OK pulse glow — used only by .hero-eyebrow .dot */
--color-ok-glow-12: rgba(30, 102, 66, 0.12);
--color-ok-glow-04: rgba(30, 102, 66, 0.04);
```

Skip inventing tokens for the single geo.css `rgba(255, 255, 255, 0.08)` — replace it with `var(--color-ink-inverse-12)` since they serve the same purpose (hairline on dark).

### 3.2 Replace call sites

- `landing.css:148,152` → `var(--color-ok-glow-12)`
- `landing.css:153` → `var(--color-ok-glow-04)`
- `landing.css:442,443,451,607,625,633,640` → pick the closest `--color-ink-inverse-*` token. Round 0.85 → 0.9, round 0.14 → 0.12.
- `landing.css:600,614` → `var(--color-ink-inverse-12)`.
- `geo.css:817` → `var(--color-ink-inverse-12)`.

### 3.3 Verify

- `rg 'rgba\(' app/styles/` returns only `tokens.css`.
- Footer visual diff: should be imperceptibly different after alpha rounding.

**Acceptance:**
- Zero `rgba()` in the three consumer stylesheets.
- Footer legal text contrast unchanged (spot-check with Chrome a11y panel).

---

## Phase 4 — fill accessibility gaps (1 day)

**Problem.** Landing and geo buttons lack `:focus-visible`. Geo buttons lack `:disabled`. Landing decline cards lack focus-visible. The FAQ disclosure (`landing.css:543`) likely lacks `aria-expanded` / `aria-controls` in the JSX.

If phase 1 shipped, the button focus issue is already resolved. This phase handles what's left.

### 4.1 FAQ disclosure a11y

**File:** `components/landing/FAQ.tsx`.

Pattern needed:
- `<button type="button" aria-expanded={isOpen} aria-controls={\`faq-panel-${i}\`}>` for each question.
- The answer panel gets `id="faq-panel-${i}"` and `role="region"`.

Compare against `app/trucking-loans/[state]/page.tsx` or wherever geo uses `<details>/<summary>` — that pattern handles this natively and may be a simpler migration than fixing JS.

### 4.2 Focus-visible on decline cards

If decline cards are non-interactive (just visual), no change needed. If they're clickable (check `components/landing/DeclineSection.tsx`), add a `.decline-card:focus-visible` rule matching the button style.

### 4.3 Add aria-invalid to intake inputs

**File:** `components/screens/Screen08Contact.tsx`.

Each `<input>` should get `aria-invalid={Boolean(...HasError)}` so screen readers announce validation state.

### 4.4 Document the dark-mode decision

Add a comment at the top of `tokens.css`:
```css
/* Dispatched does not currently support prefers-color-scheme: dark.
   The token system is single-theme. If dark mode lands, expand this file
   with :root[data-theme="dark"] overrides rather than media queries,
   so the theme is explicit and scriptable. */
```

**Acceptance:**
- axe DevTools run on `/`, `/apply`, `/disclosures` reports zero serious/critical issues.
- Keyboard-only walkthrough of the intake flow works end-to-end (tab, shift-tab, enter, esc).
- FAQ expand/collapse announces correctly in VoiceOver.

---

## Phase 5 — consolidate Nav/Logo/Footer across landing and geo (2 days)

**Problem.** `.landing .nav`/`.nav-links`/`.logo` and `.geo-nav`/`.geo-nav-links`/`.geo-logo` are ~80% duplicate code and styles. Same for `.landing .footer` and `.geo-footer`.

**Target.** A single `<SiteNav>`, `<Logo>`, `<SiteFooter>` component used by both page trees, styled via unprefixed classes. If the two contexts intentionally diverge (e.g., geo has no "Construction Soon" link), express the divergence as props, not parallel components.

### 5.1 Promote components

- Move `components/landing/Nav.tsx`, `components/landing/Logo.tsx`, `components/landing/Footer.tsx` out of the `landing/` subdir to `components/site/`.
- Parameterize with a `variant: "landing" | "geo"` prop, or better, pass in the nav link list / copy directly.

### 5.2 Merge CSS

- Unprefixed selectors in a new `app/styles/site.css` (imported after `tokens.css` in `globals.css`).
- Delete `.geo-nav*`, `.geo-logo`, `.geo-footer*` blocks in `geo.css`.
- Keep `.landing` scope on anything that truly is landing-specific (hero, trust bar, qualification calc) — nav/footer/logo move out.

### 5.3 Verify

- `/` and `/trucking-loans/ca/los-angeles` (or equivalent) render identical nav and footer except where data differs.
- Mobile menu behavior preserved.

**Acceptance:**
- `components/landing/Nav.tsx` and any `GeoNav` are gone or consolidated.
- `rg 'geo-nav|geo-logo|geo-footer' app/` returns zero matches.

---

## Phase 6 — document scale skip-stops, complete out-of-scope items (1 day)

### 6.1 Annotate tokens.css

Add header comments explaining intentional scale skips:
```css
/* Steel scale — primary brand. Skip stops: 300, 500, 700 are intentionally
   omitted. If you need a between-step, propose it in a design review rather
   than inlining a one-off hex. */
```

Same for Hi-Vis.

### 6.2 Visual regression rig (optional, time-permitting)

If the team wants durable coverage, land Playwright + `@playwright/test` visual-regression:
- One test per page (`/`, `/apply`, `/disclosures`, `/trucking-loans/ca/los-angeles`).
- Two viewports (390, 1440).
- Commit initial baselines to a `tests/visual/__snapshots__/` dir.
- Gate PRs on pixel diffs above 0.1% threshold.

If not now, at least add a "re-capture baselines" step to the phase-by-phase verification checklists above.

### 6.3 Close audit items

Mark each priority action (1–7) from `docs/design-system-audit-2026-04-23.md` as resolved in a followup commit to that doc.

---

## Test strategy across phases

| Phase | Pre-merge checks |
|---|---|
| 0 | `npm run lint:css` runs (may warn) |
| 1 | Lint + typecheck + vitest green; manual tab-through every CTA; baseline diff |
| 2 | Stylelint token rule passes strictly; baseline diff; design review on type rounding |
| 3 | Zero `rgba()` in consumer sheets; footer contrast spot-check |
| 4 | axe scan clean on target pages; VoiceOver walkthrough of intake and FAQ |
| 5 | `/` and geo pages render identical nav/footer; mobile menu preserved |
| 6 | New Playwright visual tests pass (if adopted); audit doc cross-checked |

**Do not skip `typecheck`.** Next.js 16's type system is strict and several of the component renames in phase 5 will catch import-path mistakes early.

---

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Phase 2 type-scale rounding introduces visible font-size shifts | High | Med | Budget a design-review round; batch the commits so a single revert undoes the pass if needed. |
| Phase 1 button height change (50 → 52) moves vertical rhythm on landing | Med | Low | Eyeball hero/footer alignment after migration; adjust `.qual-cta` padding overrides if needed. |
| Phase 5 component moves break geo-specific rendering (state/city pages use inline styles that may depend on geo- class scope) | Med | Med | Leave `.geo-page` wrapper + its scoped styles in place; only hoist nav/logo/footer. |
| Stylelint config (phase 0) blocks unrelated PRs | Low | Low | Start in warning mode; flip to error mode at the end of phase 2. |
| Dark-mode roadmap reversal after phase 4 documentation | Low | Low | Comment is explicit about the single-theme assumption — trivial to update. |

---

## Estimated total

~10–14 engineering days for phases 0–5 (single developer), plus 1–2 days for phase 6 if the visual-regression rig is adopted. Phases 2 and 3 can run in parallel with phase 4 if more than one person is available.

## Definition of done

- All 7 priority actions in `docs/design-system-audit-2026-04-23.md` are checked off.
- `npm run lint && npm run lint:css && npm run typecheck && npm run test` passes cleanly on `main`.
- Stylelint's token-enforcement rule is in error mode (not warn).
- `rg 'rgba\(|#[0-9a-fA-F]{3,8}' app/styles/ | grep -v tokens.css` returns zero.
- A keyboard-only operator can complete the `/apply` intake flow from screen 1 through submission without losing focus visibility.
- The audit doc has a final note linking to the PRs that resolved each item.
