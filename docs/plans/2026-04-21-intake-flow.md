# Dispatched AI Capital Advisor — Intake Flow Implementation Plan

**Version:** 2026-04-21
**Status at last edit:** Checkpoint 2 closing (pure logic, tests green). Re-created in-repo after an iCloud-eviction postmortem — see bottom of this file.

> **For agentic workers resuming this plan:** The work so far lives in git (`~/Code/dispatched.finance`). Follow the checkpoint gates below — do not jump ahead. Each checkpoint ends with a review loop.

## Goal

Build the eight-screen conversational intake flow for Dispatched AI Capital Advisor as a production-ready Next.js app, deployable to Render.com, matching the design bundle exported from Claude Design (`disp-ai-capital-advisor/`) pixel-for-pixel.

## Architecture

Next.js App Router hosts a single interactive route (the intake). An XState v5 machine drives screen state and preserves context across back navigation. Tailwind CSS v4 is used only for layout utilities — all design tokens (color, type, spacing, radius, motion) come from `app/styles/tokens.css`, imported as CSS custom properties at the root. Three animations only via Framer Motion, each with a `useReducedMotion` opt-out.

## Tech stack — landed versions (some higher than the original brief)

| Package | Brief | Actual | Notes |
|---|---|---|---|
| next | 15 | **16.2.4** | `create-next-app@latest` pulled 16. Clean superset of 15 for App Router, next/font/local, route handlers, server components. Approved. |
| react | 19 | 19.2.4 | |
| tailwindcss | v4 | ^4 | via `@tailwindcss/postcss` |
| typescript | strict | strict on, `target: ES2017` | from scaffold |
| xstate | ^5 | ^5.30.0 | |
| @xstate/react | — | ^6.1.0 | CP3+ |
| zod | ^3 | **^4.3.6** | v4 is non-breaking for our usage (`z.string().email()`, `.refine`, `.safeParse` all still work). Approved. |
| react-hook-form | ^7 | ^7.73.1 | |
| @hookform/resolvers | ^3 | ^5.2.2 | API unchanged for zod adapter |
| libphonenumber-js | ^1 | ^1.12.41 | |
| framer-motion | ^11 | ^12.38.0 | CP3+ |
| lucide-react | latest | ^1.8.0 | CP3+ |
| vitest | latest | ^4.1.5 | |

## Seven resolved ambiguities (from handoff spec vs. bundle)

All seven confirmed by the founder before Checkpoint 1.

1. **Data-flow strip placement** — Bundle put the 3-step strip *inside* the match card. Handoff wants it *outside*, as a reusable component for landing / geo template / emails. **Decision: outside. Separate component (`DataFlowStrip`).** CP4 will land it.
2. **Screen 7 APR row** — Bundle hardcoded "14% – 28%". Handoff wants dynamic values from `estimateMatch`. **Decision: dynamic.** Implemented: each tier has `aprLow`/`aprHigh` in the result.
3. **Reassurance line with lock icon** after the match card — in bundle, omitted from handoff spec. Over-reassurance on the emotional peak screen earns its token weight. **Decision: keep.** CP4 as `ReassureLine`.
4. **State-diagram page numbering** — Spec says page 11; actual PDF has 10 pages and the state diagram is on p.10. Credit band row is truncated in print but handoff declares credit "same across verticals". **Decision: treat as resolved, credit is vertical-invariant.** `lib/copy.ts` centralizes credit copy.
5. **Screen 8 name help text** — Bundle: "matches how you file taxes." PDF mockup: "matches your DOT registration." Bundle is newer (chat transcript shows DOT was explicitly flagged as an overpromise). **Decision: taxes copy.** Landed in `lib/copy.ts` (`SCREEN8.nameHelp`).
6. **Missing italic font files** — Bundle CSS references italic and medium-italic files that aren't in the `fonts/` dir. **Decision: only register faces whose `.ttf` exists.** `app/layout.tsx` loads Archivo 400/500/600/700, Plex Sans 400 + 400italic + 500 + 600, Plex Mono 400 + 500.
7. **`amountBand` + `amount` both stored** — Handoff context has both. **Decision: store both.** Preset chip sets band to `'preset-low' | 'preset-mid' | 'preset-high'` AND sets amount to band midpoint (from `copy.ts`). Custom input sets band to `'custom'`. Replacing the stub with real lender API later wants the exact number anyway.

## Five checkpoint structure (founder-imposed)

Review loop after each, before the next starts.

- **Checkpoint 1 — Scaffold only.** Next.js app, tokens imported, fonts loaded, one placeholder route renders. ✅ Landed [`87a81c7`](https://github.com/aondaai/dispatched-intake/commit/87a81c7).
- **Checkpoint 2 — Pure logic + tests green.** `estimateMatch`, `copy.ts`, `validation.ts`, XState machine. No UI. **← current, closing now.**
- **Checkpoint 3 — Screens 1–4 wired.** Opener, vertical selector, amount, revenue. Walkable locally.
- **Checkpoint 4 — Screens 5–8 wired.** Credit, match preview (count-up + data-flow strip + reassure line), contact capture, submitted thank-you.
- **Checkpoint 5 — Desktop trust rail + a11y pass + `render.yaml`.** Ready to deploy.

## Checkpoint 2 inventory

### Files landed

| Path | Purpose |
|---|---|
| `lib/types.ts` | `IntakeContext`, `MatchResult`, enums (`Vertical`, `UseCase`, `AmountBand`, `BandTier`, `CreditBand`, `MatchTier`), `INITIAL_CONTEXT`. |
| `lib/copy.ts` | Brand strings, 4-vertical × 4-screen copy table, chip options, progress map, `VERTICAL_TAG` (topbar badge). Single source of truth. |
| `lib/estimateMatch.ts` | Pure function. Tier A/B/C classification, vertical-dependent TIB cutoffs, credit modifier, dollar range double-clamping (fixes a spec edge case where amount > tier ceiling could produce `rangeLow > rangeHigh`). |
| `lib/validation.ts` | `ContactSchema` + `IntakePayloadSchema` (zod). Phone validation uses `parsePhoneNumberFromString` + `country === 'US'` rather than `isValidPhoneNumber(v, 'US')` — see deviation below. |
| `lib/machine.ts` | XState v5 machine, 8 screen states + `submitted` final. `screen07` entry computes `matchEstimate`. `hasSeenMatch` flag for count-up gating. Back-nav preserves context. |
| `vitest.config.ts`, `tests/setup.ts` | jsdom env, React plugin, `@` alias. |
| `tests/estimateMatch.test.ts` | 11 passing. |
| `tests/validation.test.ts` | 14 passing. |
| `tests/machine.test.ts` | 7 passing. |

### Test coverage (32 total, all green)

**`estimateMatch` (11):**
1. Tier A — owner-operator, strong revenue + 3+ years + 720 credit, $95K request
2. Tier B — owner-operator, mid revenue + 6–12mo + mid credit, $50K request
3. Tier C — owner-operator, thin revenue, $20K (hits Tier C max floor)
4. Tier A — small-fleet, vertical normalization (rev tier 3 = $250K–$500K band)
5. Tier C — small-fleet, thin TIB ("Under 1 year") fails 12mo cutoff
6. Tier A — contractor, amount above Tier A max clamps `rangeHigh` to $250K
7. Tier B — contractor, rev tier 2 + tib tier 2, $100K
8. Tier C — contractor, thin revenue tier 1 ("Under $25K")
9. Credit modifier — `<580` downgrades Tier A to Tier B
10. Credit modifier — `'not-sure'` is treated as 580–650 (no downgrade)
11. Throws when required fields are missing

**`ContactSchema` + `IntakePayloadSchema` (14):**
valid contact; single-word name rejected; <3-char name rejected; whitespace trim before length check; non-phone string rejected; non-US number (`+44`) rejected; four US formats accepted; malformed email rejected; valid payload; invalid vertical rejected; revenueTier out of 1–4 rejected; negative amount rejected; invalid creditBand rejected; unknown top-level keys stripped.

**`intakeMachine` (7):**
happy-path to `submitted`; GO_BACK preserves context; GO_BACK on screen01 is a no-op; entry to screen07 computes matchEstimate; re-entry recomputes when credit changes; MARK_MATCH_SEEN sticky across back-nav; initial context all null/false.

### Deviations from spec, with rationale

- **`isValidPhoneNumber(v, 'US')` is looser than the handoff implies.** The `'US'` arg is a *fallback* when `v` has no explicit country code. A UK number like `+44 20 7946 0958` passes because `+44` is explicit. Tightened in `lib/validation.ts`: we parse and assert `parsed.country === 'US'`. The failing test that surfaced this was `rejects a non-US phone number`. This is exactly the silent-bug class that would sink a real user flow; TDD caught it before a UI was wired.
- **Dollar range clamping uses a double clamp** (min + max on both `rangeLow` and `rangeHigh`) rather than the single-sided spec formula. Without this, `amount > tier_max` produced `rangeLow > rangeHigh`. Spec is preserved as-is when the amount is in the tier's normal operating window.
- **TIB "6 months" cutoff collapses to tier ≥ 2 for small-fleet and contractor** because those verticals' bottom band is already "Under 1 year" — no finer granularity exists. Owner-op and other-trade keep the 6mo vs 12mo split. Encoded in `TIB_6_MONTH_TIER` / `TIB_12_MONTH_TIER` lookup tables in `estimateMatch.ts`.
- **`hasSeenMatch` is sticky on the machine, not on the component.** React components unmount on back-nav and would re-animate. Keeping the flag in machine context means count-up fires once per user lifecycle.

### What was *not* installed in CP2 (deferred to CP3+)

`framer-motion` and `lucide-react` are dependencies but not yet consumed. They come in when UI starts (CP3). `@testing-library/*` is installed but unused until component tests land (late CP3 / CP4).

## Checkpoint 3 preview

- Dev topbar + progress bar + back button (`components/chrome/`)
- StatusBar + HomeIndicator decoration
- `SystemBubble`, `UserBubble`, `QaPair` (dim prior state at 60%)
- `TypingIndicator` with 600ms delay + `useReducedMotion` opt-out
- `ChipGroup`, `CardGroup` (2×2 for vertical selector)
- Screens 1–4 wired to the machine, walkable locally end-to-end

Animation scope for CP3: typing dots + system-bubble fade. Count-up and data-flow strip come in CP4.

## Postmortem: iCloud cwd eviction during Checkpoint 2

### What happened

The original working directory was `/Users/angeloorru/Library/Mobile Documents/com~apple~CloudDocs/dispatched.finance` — iCloud Drive. After scaffolding, the code repo was moved to `~/Code/dispatched.finance` per founder's pre-CP1 guidance. The iCloud folder remained the session's cwd and held only docs (the original plan file, the design bundle PDF).

Mid-CP2, iCloud evicted/offloaded the cwd folder. Every `Bash` call began erroring:

```
Working directory "/Users/angeloorru/Library/Mobile Documents/com~apple~CloudDocs/dispatched.finance" no longer exists. Please restart Claude from an existing directory.
```

Even `echo test` failed because the tool's shell wouldn't start. `Read` on iCloud paths returned "File does not exist." The code repo at `~/Code/dispatched.finance` was untouched — the repo on disk and on GitHub were both fine.

### Recovery

The cwd resurfaced after a short wait (iCloud re-downloaded on access). Work resumed in the same session using absolute paths on every `Bash` call. No progress was lost — the machine tests passed first-run after recovery.

### Mitigation in place

Added to `~/.zshrc` (founder's instruction):

```bash
case "$PWD" in
  *Mobile\ Documents/com~apple~CloudDocs*)
    echo "⚠️  You are inside iCloud Drive. Code repos here will break under sync."
    ;;
esac
```

Every new shell warns if its cwd is inside iCloud Drive. Eliminates accidental reuse of an iCloud path for code work.

### Longer-term rule

Code repos never live in iCloud. Docs/planning can live in iCloud as a backup but the canonical planning file is now inside the git repo (this file). Any future plan revisions land as commits, so "the history isn't in git yet" is never true again.

## Repo pointers

- Remote: [github.com/aondaai/dispatched-intake](https://github.com/aondaai/dispatched-intake) (private)
- Local: `~/Code/dispatched.finance`
- Design bundle: `/tmp/dispatched_bundle/disp-ai-capital-advisor/` (also backed up in iCloud folder as source)
- Handoff PDF: `/Users/angeloorru/Library/Mobile Documents/com~apple~CloudDocs/dispatched.finance/Dispatched · AI Capital Advisor · Intake flow (print).pdf`
