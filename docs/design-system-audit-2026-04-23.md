# Design system audit — dispatched.finance

_Audited from the codebase at `~/dispatched.finance` on 2026-04-23. The live site at `https://dispatched.finance/` is behind an egress block, so this audit reads the source rather than a rendered snapshot._

## Summary

**Components reviewed:** 35 TSX components across `chrome`, `chat`, `match`, `landing`, `trust-rail`, `screens`, plus four CSS layers (`tokens.css`, `intake.css`, `landing.css`, `geo.css`)
**Issues found:** 14 (3 critical, 6 important, 5 nice-to-have)
**Score:** 62/100 — good token definitions, inconsistent consumption

The token layer in `app/styles/tokens.css` is excellent — full color ramps, a 9-step type scale, a 4px-base spacing system, motion timings, and eight semantic `.t-*` utility classes. But the three consumer stylesheets (`intake.css`, `landing.css`, `geo.css`) largely bypass those tokens and inline raw pixel values, and the product has three parallel button implementations that all converge on the same visual but diverge on states, sizing classes, and accessibility coverage. The fastest ROI is unifying buttons, then making token consumption mandatory via lint/design-review rather than expanding the token set.

## Naming consistency

| Issue | Where | Recommendation |
|---|---|---|
| **Three parallel button systems.** `.btn` / `.btn-primary` / `.btn-secondary` (intake), `.landing .btn-primary` / `.landing .btn-secondary`, and `.geo-btn` / `.geo-btn-primary` / `.geo-btn-secondary`. Same visual, slightly different padding, different hover treatments, different state coverage. | `intake.css:526`, `landing.css:85`, `geo.css:116` | Collapse to a single `.btn` / `.btn-primary` / `.btn-secondary` at the token layer. Size modifiers (`.sm`, `.lg`) and context-specific widths (`.qual-cta`, `.nav-cta`) can layer on top. |
| **Four parallel eyebrows.** `.hero-intro .kicker`, `.landing .eyebrow`, `.geo-eyebrow`, and the unused utility `.t-eyebrow`. All do uppercase, 11–12px, 0.08em tracking, hiviz-800. | `intake.css:130`, `landing.css:118`, `geo.css:172`, `tokens.css:154` | Adopt `.t-eyebrow` everywhere and delete the clones. `.geo-eyebrow::before` (the orange hairline) becomes a modifier. |
| **Parallel Nav, Logo, and Footer** between landing and geo. `geo-*` prefix duplicates ~80% of landing's nav/footer markup and styles. | `landing.css:28–82, 589–653`, `geo.css:45–111, 761–840` | If the geo page is truly a variant of landing, strip `geo-*` styling and reuse the same components with a prop/context switch. If they must diverge visually, share the primitive and restyle via token overrides, not whole-cloth copies. |
| **Irregular color scale stops.** Steel has 50/100/200/400/600/800/900 (missing 300/500/700). Hi-Vis has 50/100/400/600/800 (missing 200/300/500/700). Semantic ramps (ok/warn/err) only expose 100 and 600. | `tokens.css:18–39` | Either fill the gaps (so `steel-500` exists when a designer reaches for it) or document the intentional skip-stop design in a comment at the top of `tokens.css` to prevent drift the next time someone adds a new shade. |
| **Inconsistent button sizing API.** `.landing .btn-primary.sm` / `.lg`, but intake's `.btn` has a fixed 52px height with no size modifiers, and `.geo-btn-lg` lives as its own class instead of a modifier. | `landing.css:100–101`, `intake.css:527`, `geo.css:133` | Standardize on `.btn` + `.btn--sm` / `.btn--lg` modifiers across all contexts. |
| **Duplicate field/input patterns** in `.field .input` (intake) and `.landing .field` / `.landing .input` / `.landing .select` — similar height/border/focus but landing lacks an `.error` state, which intake defines. | `intake.css:567–605`, `landing.css:231–259` | Promote the field system to a shared primitive. Port intake's `.error` state so landing inputs can communicate validation. |

## Token coverage

Tokens are well-defined but under-consumed. Raw pixel values dominate the three consumer stylesheets.

| Category | Tokens defined | Raw/hardcoded occurrences | Notes |
|---|---|---|---|
| **Colors** | 32 CSS custom properties (3 surfaces, 4 ink, 7 steel, 5 hiviz, 6 semantic, 2 borders, 5 inverse aliases) | 2× `#fff` (should be `var(--color-ink-inverse)`), 7× `rgba(250, 247, 242, α)` alpha riffs on ink-inverse, 3× `rgba(30, 102, 66, α)` alpha riffs on `ok-600`, 1× `rgba(255, 255, 255, 0.08)` inconsistent with the rest | `landing.css:700, 722` for `#fff`. The `rgba(250,247,242,…)` pattern at `landing.css:442–640` should be an alpha-variant token family (`--color-ink-inverse-60`, etc.) or a documented convention. |
| **Spacing** | 10 stops (4/8/12/16/24/32/48/64/96/128) + `--gutter-mobile` | `--space-*` is referenced **1 time** in the codebase (`landing.css:22`). Everything else — padding, margin, gap — is raw px. | Values like 20px, 24px, 28px, 32px, 48px, 56px, 64px, 72px, 80px, 96px all recur dozens of times. Adopt `var(--space-*)` as a hard rule for new CSS; retrofit opportunistically. `gap: 28px` at `landing.css:43` doesn't even have a matching token (should be 24 or 32). |
| **Typography** | 9 size tokens + 9 pre-composed `.t-*` utility classes | `.t-*` classes are defined but **never used** in any TSX file or other CSS file. `var(--fs-*)` is used 21 times — mostly in `.disclosures`. The CSS has 20+ distinct hardcoded font-size values (10, 10.5, 11, 12, 12.5, 13, 13.5, 14, 15, 16, 17, 18, 19, 20, 22, 24, 28, 32, 36, 44, 56, 64) — only 9 match tokens. | The `.t-*` system is fully orphaned. Either adopt it in JSX (e.g., replace `<h1>` → `<h1 className="t-h1">`) or delete it. Half-measures breed drift. |
| **Radius** | 4 stops (sm 4, md 8, lg 12, xl 20) | Used 20 times. Also raw: `border-radius: 4px, 6px, 8px, 12px, 100px, 999px` scattered in `intake.css` and `landing.css`. `999px` / `100px` pills aren't in the token set. | Add `--radius-pill: 999px` (or `full`) for circular elements like the `.hdf-dot` and `.flow-n` badges. |
| **Motion** | 4 duration tokens, 1 easing | Used consistently. One-off `600ms cubic-bezier(...)` at `intake.css:119` bypasses `--motion-approval` / `--ease-out`. | Minor. Swap to tokens for consistency. |

## Component completeness

Scored by variants + state coverage + accessibility + in-code documentation.

| Component | Variants | States | A11y | Docs | Score |
|---|---|---|---|---|---|
| **Button** (intake `.btn`) | primary, secondary | default, hover, disabled, focus-visible | type=button throughout, clear aria-labels | inline | 9/10 |
| **Button** (landing `.btn-primary`) | sm, default, lg | default, hover, disabled | **no focus-visible**, **no active** | none | 5/10 |
| **Button** (geo `.geo-btn`) | lg | default, hover | **no focus-visible**, **no disabled** | none | 4/10 |
| **Chip** (`.chip`) | default, selected (2px hiviz border) | default, hover, selected, focus-visible | `aria-pressed`, `role="group"` via ChipGroup | inline | 9/10 |
| **BigCard** (`.bigcard`) | default, selected | default, hover, selected, focus-visible | `aria-pressed`, `aria-hidden` on icon | inline | 9/10 |
| **Input** (intake `.field .input`) | default, mono, error | default, focus, focus-within, error, error+focus, placeholder | label/help linkage, `aria-invalid` missing on error | inline | 7/10 |
| **Input** (landing `.input`/`.select`) | input, select | default, focus, placeholder | **no error state**, no aria-invalid | none | 5/10 |
| **MatchCard** | single | single (2px hiviz border — the only 2px hiviz border in the system, per comment) | `role="region"`, `aria-label` | comment in CSS | 8/10 |
| **System/User bubble** | system (left, sunken, D avatar), user (right, steel-600) | default, bubble-enter animation w/ reduced-motion opt-out | avatar `aria-hidden` | inline | 8/10 |
| **TypingIndicator** | single | animated, reduced-motion opt-out | `aria-live="polite"`, `aria-label` | inline | 9/10 |
| **ProgressBar** | single | progress animation w/ reduced-motion opt-out | full `role="progressbar"` with min/max/now | inline | 10/10 |
| **Topbar** | with-back / with-tag | single | clickable phone `aria-label` | inline | 7/10 |
| **BottomActions** | screen07, screen08, none | default, submitting (disabled) | form linkage, aria-label | inline | 8/10 |
| **QualificationCalc** | form / result | default, submitting, submitted | label/htmlFor linkage, `required` attrs | none | 6/10 |
| **FAQ** (landing) | single | open/closed (height transition) | button with hover, **no aria-expanded or aria-controls** | none | 5/10 |
| **Decline card** | default | hover | **no focus-visible** (appears non-interactive — fine if that's intentional) | none | 7/10 |

## Accessibility observations

- **Reduced motion** is covered in `intake.css` (two places), `landing.css` (one place), and gated via `useTypingDelay` / `CountUpAmount`. Consistent handling.
- **Dark mode** has no provisions. No `prefers-color-scheme` queries anywhere. If dark mode is non-goal, document that in `tokens.css`; if it's on the roadmap, design the token set to support it now (invert ink/bg under a `:root[data-theme="dark"]` block).
- **Focus-visible** is present on intake primitives (`.chip`, `.bigcard`, `.btn`, `.amount-input:focus-within`) but missing on landing buttons, geo buttons, landing decline cards, and the FAQ button.
- **FAQ disclosure** in `landing.css` uses a `.faq-button` but the JSX pattern likely lacks `aria-expanded` / `aria-controls` (worth confirming in `FAQ.tsx`). The geo FAQ uses `<details>/<summary>` which handles this natively.
- **Error states** only exist on intake inputs. Landing/geo forms submit directly but can't style their own invalid state.

## Priority actions

1. **Unify the button system.** One `.btn` primitive with `--primary` / `--secondary` modifiers and `--sm` / `--lg` sizes. Delete the two parallel implementations. Wins: consistent focus/disabled states, single source for hover transitions, one place to change CTA color if the brand shifts. Estimated 2–3 days with tests.
2. **Make token consumption mandatory.** Adopt `var(--space-*)` for spacing and either the `.t-*` utility classes or `var(--fs-*)` for type. Backstop with a Stylelint rule (`declaration-property-value-disallowed-list`) that bans raw px on `padding`/`margin`/`gap`/`font-size` in stylesheets. Retrofit existing CSS opportunistically as you touch it.
3. **Tokenize the transparent-ink-inverse pattern.** Seven `rgba(250, 247, 242, α)` occurrences on dark footers need tokens — propose `--color-ink-inverse-alpha-50/70/85/90/12` or similar. Same for the one-off `rgba(30, 102, 66, …)` pulse-glow on `--color-ok-600`. This kills the hex leakage noted in token coverage.
4. **Add focus-visible to landing/geo buttons and decline cards.** 4-line change, material a11y improvement. Tracking the intake `btn:focus-visible` outline pattern keeps the look consistent.
5. **Decide on `.t-*` utility classes.** Either adopt them in JSX (replaces one-off `font-family`/`font-size`/`font-weight` triples in every stylesheet with a single className) or delete them. Keeping dead code invites drift.
6. **Reconcile Nav/Logo/Footer between landing and geo.** If they're the same component in two contexts, they should share code. If they're intentionally distinct, give the divergence a reason in a comment so the next developer doesn't assume it's sloppy copy-paste.
7. **Document the color scale skip-stops.** A one-line comment above the `steel-` and `hiviz-` blocks in `tokens.css` explaining whether 300/500/700 were intentionally omitted will save a designer from proposing a "steel-500" in six months.

## Out of scope / follow-ups

- A live-rendered audit of `https://dispatched.finance/` (currently behind the egress proxy) for any drift between built CSS and source.
- Component coverage for the trust-rail, screens 1–8, and disclosure page — analyzed structurally but not visually scored.
- Empty-state, loading-state, and error-boundary inventory across screens — worth a dedicated pass.
- Cross-browser focus-ring audit (Safari's focus-visible heuristic differs from Firefox/Chrome).
