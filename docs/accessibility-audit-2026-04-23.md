## Accessibility Audit: dispatched.finance landing page (`/`)

**Standard:** WCAG 2.1 AA &nbsp;·&nbsp; **Date:** 2026-04-23 &nbsp;·&nbsp; **Auditor:** Claude

> **Scope note.** The live URL `https://dispatched.finance/` is blocked by this session's network egress, and the Chrome extension wasn't connected, so I could not run automated tools (axe, Lighthouse) or do live screen-reader / keyboard testing on the rendered page. Instead, I audited the source for the route (`app/page.tsx` → `components/landing/*`, `app/styles/landing.css`, `app/styles/tokens.css`, `app/layout.tsx`) that renders `/`. All line numbers cite those files. A follow-up pass with axe-core + NVDA/VoiceOver is recommended before sign-off.

### Summary

**Issues found:** 16 &nbsp;·&nbsp; **Critical:** 3 &nbsp;·&nbsp; **Major:** 8 &nbsp;·&nbsp; **Minor:** 5

Biggest rocks: no visible keyboard focus on buttons / links, no `<main>` landmark or skip link, `ink-tertiary` (#6F7A82) fails AA body-text contrast everywhere it's used, and input borders are effectively invisible (1.4:1). The good news: heading hierarchy is clean, `html lang` and `<title>` are present, primary button and dark-mode footer text have generous contrast, and inputs + the FAQ accordion already have `aria-expanded` wired up.

### Findings

#### Perceivable

| # | Issue | WCAG Criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 1 | `--color-ink-tertiary` (#6F7A82) is used for body-size text on both `--color-bg-paper` (4.11:1) and `--color-bg-surface` (4.39:1). Affects `.trust-note` (11px), `.nav-links a.soon` and `.soon-tag`, `.qual-steps`, `.qual-header .safe`, `.qual-foot`, `.dataflow-title`, `.decline-card .num`, `.proof-card .state-tag`, `.flow-who`. | 1.4.3 Contrast (Minimum) | 🔴 Critical | Darken the tertiary ink to ≥ `#5E6970` (4.79:1 on white, 4.48:1 on paper) — or better, `#5A6369` for a safety margin — and re-verify against sunken `#F2EEE5`. |
| 2 | On `.section.sunken` (#F2EEE5), `ink-tertiary` drops to 3.79:1. Same elements as above (e.g. `.decline-card .num`, `.faq-button .chev` icon is fine at ≥3:1 but text is not). | 1.4.3 Contrast (Minimum) | 🔴 Critical | Use `ink-secondary` (#3B4750, 8.48:1) for any text on sunken surfaces, or bump tertiary darker per #1. |
| 3 | Form-field borders (`.input`, `.select`, `.qual` card) use `--color-border` `#E0D8CA`, 1.41:1 on white / 1.32:1 on paper. Users can't perceive where the text input boundary is. | 1.4.11 Non-text Contrast | 🔴 Critical | Replace with `--color-border-strong` `#C8BDA7` (≥1.8:1 still fails) → actually use something like `#9AA1A6` (3.0:1 on white) or add an inner 1px outline in `ink-secondary` at low alpha. The `soon-tag` pill border has the same issue. |
| 4 | `.landing .input:focus` / `.select:focus` focus state relies on the `hiviz-400` border (2.93:1 on white — just under the 3:1 floor for UI components) plus a `hiviz-50` halo (1.15:1) that is barely visible. | 1.4.11 Non-text Contrast, 2.4.7 Focus Visible | 🟡 Major | Either darken the focus border to `hiviz-600` (4.66:1) or thicken to 2px + keep the halo for depth. A 2px `outline: 2px solid var(--color-hiviz-600); outline-offset: 2px;` is cleanest and matches the intake-flow pattern already used in `intake.css`. |
| 5 | Logo SVG (`LogoMark`), and the flat decorative icons `IconTruck / IconDollar / IconClock` rendered inside `.feat-icon` spans, are not marked `aria-hidden="true"` and carry no `<title>`. Screen readers may announce them as orphan graphics. | 1.1.1 Non-text Content | 🟢 Minor | Add `aria-hidden="true"` to these SVGs in `components/landing/icons.tsx` and `Logo.tsx`. The visible text label ("Dispatched", h3 headings beside feat-icons) already conveys meaning. |
| 6 | The `.feat-card.median` block uses rgba-over-dark text (`rgba(250, 247, 242, 0.7)` for `.lede` over `#102938`). Computed contrast is 7.58:1 — passes — but the same alpha pattern is used in the footer with tighter bounds (`0.5` for `<h4>` labels → 4.99:1 on `#081722`, just barely passing). | 1.4.3 Contrast (Minimum) | 🟢 Minor | Works today but has zero margin. Consider explicit color values like `#B1B4B4` / `#81878A` so future background tweaks don't silently break contrast. |
| 7 | `.footer .phone-cta` border is `rgba(250, 247, 242, 0.14)` — 1.47:1 against the steel-900 footer. The button is identifiable by its `steel-800` fill (1.21:1 vs steel-900 — also low), so its boundary is hard to perceive. | 1.4.11 Non-text Contrast | 🟡 Major | Raise the border alpha to `0.30`+ (≈2.0:1) or lighten the fill to `--color-steel-600` so the component has a perceivable edge ≥ 3:1. |

#### Operable

| # | Issue | WCAG Criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 8 | **No visible focus indicator on buttons or links across the landing page.** `landing.css` has `:focus` styles only for `.input` / `.select` (line 248). `.btn-primary`, `.btn-secondary`, `.faq-button`, `.mobile-menu-btn`, `.back-link`, `.nav-links a`, `.nav-phone`, `.mobile-menu a`, `.footer .col a`, `.legal-links a`, `.lender-strip .cta-link`, `.faq-centered-foot a`, `.phone-cta` all have no `:focus` / `:focus-visible` rule. Tab-only users cannot see where they are. The intake flow (`intake.css:554-556`) already does this correctly — port that pattern. | 2.4.7 Focus Visible | 🔴 Critical | Add a global `.landing a:focus-visible, .landing button:focus-visible { outline: 2px solid var(--color-hiviz-600); outline-offset: 2px; border-radius: var(--radius-sm); }`. Spot-adjust per-component where the offset collides with layout (e.g. `.btn-primary` uses a radius of `--radius-md`). |
| 9 | No skip-to-content link. Keyboard / screen-reader users must tab through ~15 nav + mobile-nav links before reaching the hero. | 2.4.1 Bypass Blocks | 🟡 Major | Add `<a href="#main-content" className="skip-link">Skip to main content</a>` as the first child of `<body>` (or at the top of `app/page.tsx`), with the common "visually hidden until focused" CSS pattern. Pair with the #13 fix below. |
| 10 | `<a href="#how-it-works"><button type="button" className="btn-secondary">How it works</button></a>` in `Hero.tsx:40-44` nests a `<button>` inside an `<a>`. Invalid HTML; creates two overlapping interactive elements with different roles, which confuses screen readers and breaks keyboard expectations. | 2.1.1 Keyboard, 4.1.2 Name/Role/Value | 🟡 Major | Replace with a single styled anchor: `<a href="#how-it-works" className="btn-secondary">How it works</a>`. Use the same CSS shape you already apply to `.btn-primary` anchors (e.g. `<Link href="/apply" className="btn-primary lg">`). |
| 11 | Placeholder links `<a href="#">` in `Nav.tsx` ("Trucking", "Construction") and throughout `Footer.tsx` (Product/Company/Support columns, legal row) are focusable but go nowhere. Tab order includes ~14 dead stops. | 2.4.4 Link Purpose (In Context), 3.2.3 Consistent Navigation | 🟡 Major | Either (a) point them at real routes, (b) convert unavailable ones to `<span aria-disabled="true">` with a visual "Coming soon" treatment, or (c) hide the placeholders behind a feature flag until they have destinations. Also: the "Trucking" link is styled with `className="active"` but carries no `aria-current="page"` — add it. |
| 12 | Touch targets below 44×44 CSS pixels: `.mobile-menu-btn` ≈ 40×40 (8px padding + 24px icon), `.btn-primary.sm` ≈ 42px tall, `.nav-links a` ≈ 24px tall (no vertical padding), `.footer .col a` ≈ 22px tall, `.back-link` is inline text with `padding: 0`, `.legal-links a` minimal. Not a 2.1 AA blocker (2.5.5 is AAA), but is a fail under **WCAG 2.2 AA §2.5.8 Target Size (Minimum)**, which requires ≥ 24×24. `.back-link` and the footer-column links are the actual hot spots. | 2.5.5 Target Size (AAA in 2.1; 2.5.8 AA in 2.2) | 🟡 Major | Bump `.mobile-menu-btn` padding to `10px` (44×44). Add `padding: 6px 0` to `.nav-links a` and `.footer .col a` (doesn't change visual rhythm). Turn `.back-link` into a proper button with `padding: 8px 0; min-height: 36px`. |
| 13 | `app/page.tsx` wraps content in `<div className="landing">` — there is **no `<main>` landmark** on the home page. Assistive-tech users can't jump to main content and the "skip link" in #9 has nothing to target. Note: `app/apply/page.tsx:53` does have `<main>`, so the pattern is known — it just wasn't applied here. | 1.3.1 Info and Relationships, 2.4.1 Bypass Blocks | 🔴 Critical | Wrap everything below `<Nav />` in `<main id="main-content">…</main>` in `app/page.tsx`. |
| 14 | `.landing .hero-eyebrow .dot` has a keyframe `landing-pulse` animation. It respects `prefers-reduced-motion: reduce` (good!) — but the FAQ accordion (`max-height` transition), the chevron rotate, and the mobile-menu slide do not gate their transitions on the same media query. | 2.3.3 Animation from Interactions (AAA — but Motion from Interactions is 2.2.2 / 2.3.1 AA-adjacent) | 🟢 Minor | Wrap the remaining transitions in `@media (prefers-reduced-motion: reduce) { * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }` in `landing.css`. |

#### Understandable

| # | Issue | WCAG Criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 15 | `.qual-header .safe` uses a native `title="No credit check at this step"` tooltip (`QualificationCalc.tsx:107`). Tooltips on `title` are not keyboard-accessible (no hover equivalent for kbd users) and screen-reader support is inconsistent. | 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions | 🟢 Minor | Either drop the `title` (the visible "No pull" text + lock icon + the `.qual-foot` paragraph below already convey this) or use `aria-describedby` pointing at a visible help-text span. |
| 16 | Disabled first `<option value="" disabled>` acts as a placeholder on the two `<select>`s. Works, but the `<label>` ("Monthly revenue", "Time in business") doesn't convey that the field is required until submit is attempted, and there's no `aria-describedby` pointing at the "No pull" helper text. | 3.3.2 Labels or Instructions | 🟢 Minor | Add `*` or `(required)` to the visible label, or include `<span className="hint">Required</span>` and reference it via `aria-describedby`. |

#### Robust

| # | Issue | WCAG Criterion | Severity | Recommendation |
|---|-------|----------------|----------|----------------|
| 17 | The FAQ accordion has `aria-expanded` on the button but the answer panel is an un-IDed `<div className="faq-answer">` with no `role="region"` or `aria-labelledby`, and the button carries no `aria-controls`. The `.mobile-menu-btn` similarly has no `aria-controls` pointing at `.mobile-menu`. Screen-reader users hear the state change but not the relationship. | 4.1.2 Name, Role, Value | 🟡 Major | Give each FAQ panel an `id="faq-panel-{i}"` and the button `aria-controls="faq-panel-{i}"`; same pattern for the mobile menu (id `mobile-menu`, button `aria-controls="mobile-menu"`). Add `role="region"` + `aria-labelledby="faq-button-{i}"` to each panel for good measure. |

### Color Contrast Check (representative sample)

| Element | Foreground | Background | Ratio | Required | Pass? |
|---------|-----------|------------|-------|----------|-------|
| Body text (h1, subhead) | `#0E1A22` | `#FAF7F2` | 16.5:1 | 4.5:1 | ✅ |
| Hero subhead | `#3B4750` | `#FAF7F2` | 8.9:1 | 4.5:1 | ✅ |
| `.trust-note`, `.nav a.soon`, `.qual-steps`, `.flow-who`, `.state-tag` (11-13px) | `#6F7A82` | `#FAF7F2` / `#FFFFFF` | 4.11 – 4.39:1 | 4.5:1 | ❌ |
| `.decline-card .num` on sunken | `#6F7A82` | `#F2EEE5` | 3.79:1 | 4.5:1 | ❌ |
| `.btn-primary` label | `#081722` | `#E67A1F` | 6.20:1 | 4.5:1 | ✅ |
| `.btn-primary:hover` label | `#FAF7F2` | `#B85A10` | 4.36:1 | 4.5:1 | ❌ (marginal) |
| Input border (idle) | `#E0D8CA` | `#FFFFFF` | 1.41:1 | 3:1 (1.4.11) | ❌ |
| Input border (focus) | `#E67A1F` | `#FFFFFF` | 2.93:1 | 3:1 (1.4.11) | ❌ (marginal) |
| FAQ `<code>` inline text | `#0E1A22` | `#F2EEE5` | 15.3:1 | 4.5:1 | ✅ |
| Footer body text | `#FAF7F2` @0.7 composited | `#081722` | 8.7:1 | 4.5:1 | ✅ |
| Footer column `h4` | `#FAF7F2` @0.5 composited | `#081722` | 4.99:1 | 4.5:1 | ✅ (tight) |
| Funded badge (`.proof-card .badge`) | `#1E6642` | `#D6E8D8` | 5.4:1 | 4.5:1 | ✅ |
| `hiviz-400` big number | `#E67A1F` | `#102938` | 5.13:1 | 3:1 (large) | ✅ |
| Hero dot (`ok-600` 8×8) | `#1E6642` | `#FAF7F2` | 6.7:1 | 3:1 (graphic) | ✅ |

### Keyboard Navigation (inferred from source — please verify on the live page)

| Element | Tab Order | Enter/Space | Escape | Arrow Keys |
|---------|-----------|-------------|--------|------------|
| `.nav-links a` + `.nav-phone` + `.btn-primary.nav-cta` + `.mobile-menu-btn` | Sequential in DOM order — OK | Activates — OK | N/A | N/A |
| `.mobile-menu-btn` | In order | Toggles `mobileOpen` — OK | **Not wired** — opening the menu should trap focus and close on Esc | N/A |
| `.mobile-menu a` | **Reachable even when `display: none`?** Check: when `mobileOpen=false`, the menu is `display: none` on desktop (`display: none` removes from tab order) — OK. | Activate + close | Esc should close | N/A |
| Hero `<a href="#how-it-works"><button>` | Focusable twice (outer `<a>` + inner `<button>`) — **bug** | Both activate → double nav | N/A | N/A |
| `.faq-button` | In order | Toggles — OK | N/A | **Optional** ARIA Accordion pattern uses ↑↓ to move between headers. Not implemented. |
| `.qual` select / submit | In order | OK | N/A | OK (native select) |
| All other buttons / links | No `:focus-visible` style → **invisible to keyboard users** | — | — | — |

### Screen Reader (inferred — verify with NVDA + VoiceOver)

| Element | Announced As | Issue |
|---------|-------------|-------|
| `<LogoMark>` in nav | "image" or empty (no alt / title / aria-hidden) | Orphan graphic before "Dispatched" text — add `aria-hidden="true"` |
| `.hero-eyebrow .dot` | (silent) | Correctly hidden — ✅ |
| `.btn-secondary` wrapped by `<a>` | "How it works, link, button" (nested roles) | Confusing — un-nest per #10 |
| `.nav-links a.active` ("Trucking") | "Trucking, link" | No current-page indication — add `aria-current="page"` |
| `.faq-button` | "What rates can I actually expect? button, expanded / collapsed" — OK | Panel relationship missing — see #17 |
| `.feat-icon > svg` (truck / dollar / clock) | "image" (unlabeled SVG) | Add `aria-hidden="true"` — heading next to it conveys meaning |
| `.decline-card .num` ("01", "02", "03") | "zero one, heading three…" | Screen readers read "01" as literal digits; fine. Mono styling is decorative. |
| Mobile menu when open | No landmark / no `aria-label` | Add `role="dialog"` + `aria-label="Mobile navigation"` + focus trap, or at minimum `<nav aria-label="Mobile">` |
| `<div className="landing">` | (no landmark) | Add `<main id="main-content">` per #13 |

### Priority Fixes

1. **Add visible focus indicator to every interactive element (#8).** One-line CSS change unlocks keyboard usability across the entire landing page. Blocks screen-reader + keyboard-only users right now.
2. **Wrap content in `<main>` and add a skip link (#9, #13).** Basic landmark hygiene; required for Bypass Blocks and feeds every downstream AT pattern.
3. **Darken `--color-ink-tertiary` (#1, #2).** One token change eliminates the largest cluster of contrast fails on the page.
4. **Raise input-border contrast (#3).** Users currently can't see field boundaries; no amount of interaction design rescues an invisible input.
5. **Un-nest `<a><button>` in the hero (#10).** Small code fix, closes a 4.1.2 issue and an HTML validity bug.
6. **Associate FAQ + mobile-menu trigger with their panels via `aria-controls` (#17).** Low effort, meaningful screen-reader UX.
7. **Resolve placeholder `href="#"` links and add `aria-current` on the active nav item (#11).** Either ship real routes or mark them unavailable.
8. **Tighten touch-target sizes on `.mobile-menu-btn`, footer column links, and `.back-link` (#12).** Mobile usability + forward compat with WCAG 2.2.

### Suggested follow-up

- Run axe-core (or Lighthouse's accessibility audit) against the live `dispatched.finance/` once access is available — it will catch ~30% more automated checks I can't replicate from source alone.
- Manual pass with VoiceOver (Safari) and NVDA (Firefox) focused on the hero CTA path, the qualification calculator flow, and the FAQ accordion.
- Zoom to 200% and 400% to verify reflow (1.4.10 Reflow) — the hero grid and `.flow-diagram` are the most likely breakage points.
- Check the `/apply` intake flow next; it already has better focus styles but will have its own issues (form validation, progress-bar semantics, screen transitions).
