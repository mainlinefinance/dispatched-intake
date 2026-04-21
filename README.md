# Dispatched — AI Capital Advisor Intake

Production-ready Next.js implementation of the eight-screen conversational intake flow from the Claude Design handoff bundle. Mobile-first, Tailwind v4 for layout utilities, design tokens from `colors_and_type.css`, XState v5 for the flow machine, React Hook Form + Zod for the contact form, `libphonenumber-js` for US phone validation, Framer Motion for the three permitted animations.

> **Scope:** v1 ships the client flow, a stubbed `/api/intake/submit` endpoint, and a `/healthz` probe. No database yet, no real lender API, no SMS. See `docs/plans/2026-04-21-intake-flow.md` for context.

## Local development

### Requirements

- Node **20.x** (matches `NODE_VERSION` in `render.yaml`; use `nvm use 20` or `fnm use 20`)
- npm 10.x

### First run

```bash
git clone https://github.com/aondaai/dispatched-intake.git
cd dispatched-intake
npm ci
cp .env.example .env.local    # no values required yet — placeholders only
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on a mobile viewport (iPhone 14 Pro in DevTools is a good reference). Desktop ≥1024px renders the trust rail.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Next dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build on `$PORT` (falls back to 3000) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest run |
| `npm run test:watch` | Vitest watch |

## Project structure

```
app/
  page.tsx                     # intake (client): XState machine + screen router
  layout.tsx                   # root: fonts, metadata
  globals.css                  # Tailwind base + tokens + intake CSS
  styles/
    tokens.css                 # color, type, spacing, radius, motion tokens
    intake.css                 # chat, chips, cards, match card, forms, desktop rail
  api/intake/submit/route.ts   # POST: Zod re-validate, log, return leadId
  healthz/route.ts             # GET: { status: "ok" } for Render health checks
  disclosures/page.tsx         # methodology footnotes targeted by trust-rail links
components/
  chrome/                      # Topbar, ProgressBar, BackButton, StatusBar, HomeIndicator, BottomActions
  chat/                        # SystemBubble, UserBubble, QaPair, TypingIndicator, ChipGroup, CardGroup, useTypingDelay
  match/                       # MatchCard, CountUpAmount, DataFlowStrip, ReassureLine
  screens/                     # Screen01–08, ScreenSubmitted, PrevPair
  trust-rail/                  # TrustRail (desktop ≥1024px only)
  icons/                       # hand-drawn SVGs ported from the bundle
lib/
  types.ts                     # IntakeContext, MatchResult, enums, INITIAL_CONTEXT
  copy.ts                      # single source of truth for vertical-variant copy
  estimateMatch.ts             # pure tier A/B/C classifier
  validation.ts                # Zod ContactSchema + IntakePayloadSchema
  machine.ts                   # XState v5 machine (8 screens + submitted final)
  format.ts                    # formatMoney, formatMoneyDigitsOnly, maskPhone
public/fonts/                  # Archivo, IBM Plex Sans, IBM Plex Mono TTFs
tests/                         # Vitest suites for pure logic
docs/plans/                    # in-repo planning history
```

## Environment variables

All optional for v1 — `.env.example` documents placeholders:

| Name | Purpose | Required? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin for metadata and absolute URLs | No (v2) |
| `SENTRY_DSN` | Sentry ingestion, client + server | No (v2) |
| `DATABASE_URL` | Real lead persistence (currently stdout logging only) | No (v2) |
| `PORT` | Port the production server binds to | No — Render sets it |

## Deployment to Render.com

### One-time setup (dashboard)

Render cannot automate these from `render.yaml` alone:

1. **Create the service.** New → Web Service → connect the GitHub repo `aondaai/dispatched-intake`. Render will detect `render.yaml` and pre-fill most fields.
2. **Select region** (closest to target users; `oregon` for US).
3. **Confirm the plan** (`starter` matches `render.yaml`; upgrade when traffic warrants).
4. **Save** — the first deploy kicks off automatically.

### What `render.yaml` does

- `NODE_VERSION: 20` pins Render's Node image to match local dev
- `NEXT_TELEMETRY_DISABLED: 1` prevents runtime telemetry outbound from the container
- `autoDeploy: true` redeploys on every push to `main`
- `healthCheckPath: /healthz` probes `{ status: "ok" }` — keeps the default-page health check from re-rendering the full intake on every deploy

### After first deploy

1. Verify the URL Render assigns: `https://dispatched-intake.onrender.com` (or your region's variant).
2. Test `/healthz` returns 200 before binding the custom domain.
3. **Bind `dispatched.finance`** via Render → Settings → Custom Domains → add record, then point your registrar's CNAME to the Render-provided target.
4. Inject real env vars (`DATABASE_URL`, `SENTRY_DSN`) via Render → Environment once those backends exist.

Subsequent deploys: `git push origin main`. `autoDeploy` handles the rest.

## Design system

All visual tokens live in `app/styles/tokens.css` and are consumed via CSS custom properties (`var(--color-hiviz-400)`, `var(--font-mono)`, etc.). Do not hardcode hex values or spacing — if you need a new token, add it to `tokens.css` first. Fonts are loaded via `next/font/local` from `public/fonts/`; the token file references the font variables, not the family names directly, so the fallback chain is stable even if `next/font` is disabled.

## Animations

Exactly three, each with a `useReducedMotion` / `@media (prefers-reduced-motion: reduce)` opt-out:

1. **Typing indicator** — three 6px circles, stagger-bounce, 600ms before each system bubble on a fresh screen mount. See `components/chat/useTypingDelay.ts`.
2. **Bubble entry** — system bubbles fade + translate 8px → 0 over 200ms ease-out. CSS-only (`.bubble-enter`).
3. **Count-up on Screen 7** — ranges count from $0 to the target over 400ms ease-out, once per lifetime (gated by the machine's sticky `hasSeenMatch` flag).

Anything else that animates is a bug.

## Testing

- `lib/estimateMatch.ts` has 11 cases across all three tiers and verticals, plus the credit modifier edges.
- `lib/validation.ts` has 14 cases covering Zod schemas (name rules, phone country, email, payload shape).
- `lib/machine.ts` has 7 cases — happy path, back preservation, recompute on credit change, hasSeenMatch stickiness, initial context.
- `lib/format.ts` has 5 cases (money formatters + maskPhone).

E2E tests with Playwright land in a later pass; component tests (React Testing Library) land when the UI stabilizes post-launch.
