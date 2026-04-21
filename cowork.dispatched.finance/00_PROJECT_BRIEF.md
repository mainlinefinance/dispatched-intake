# Dispatched — Project Brief

**Domain:** dispatched.finance
**Status:** Pre-launch. Intake flow in development (Claude Code, checkpoint 2). Landing page and geo template designed. Compliance work not yet started.
**Last updated:** April 21, 2026
**Owner:** Angelo Orrù
**This document:** Single source of truth for anyone joining the project mid-build. Read top to bottom once. Then skim when you need a pointer.

---

## 1. What Dispatched is

A working-capital marketplace for U.S. small businesses that traditional banks decline or underserve. Starting vertical: trucking owner-operators and small fleets (2–10 trucks). Planned expansion in order: construction, medical/dental, restaurants, skilled trades.

**What we are:** a demand-capture and routing platform. We own the distribution (SEO, paid, AI-search optimization, outbound) and the borrower experience (conversational AI Capital Advisor intake, match preview, lender selection).

**What we are not:** a lender. We do not hold balance-sheet risk. We do not underwrite. We do not fund. Lenders on our panel do that. We sit between demand and the lenders who want that demand.

**Revenue model:** ~3% of funded loan principal, paid by the lender on close. No fees charged to borrowers, ever.

**Why this works:** trucking and construction SMBs have urgent capital needs (repairs, fuel advances, payroll bridges, equipment), borrow repeatedly, and are poorly served by banks. Existing brokers treat them as a churn-and-burn channel — seven-AM phone calls, shared files, surprise APRs. Dispatched differentiates on trust, specificity, and transparency, positioned as the anti-broker broker.

**Unit economics (target):**
- $100K average funded loan × 3% = $3,000 revenue
- $10M ARR requires ~$333M funded annually
- $50M ARR requires ~$1.67B funded annually
- $100M ARR requires ~$3.33B funded annually

---

## 2. Who the borrower is

Not a generic SMB owner. Specifically:

**The owner-operator trucker.** 35–60 years old. 1 truck, often a Freightliner Cascadia or Kenworth T680. Runs under his own DOT/MC authority or leased-on with a carrier. Grosses $15K–$60K/month. Time-pressed, mobile-first, often fills forms at truck stops or during DOT rest breaks on a cracked iPhone. Likely been burned by at least one MCA broker before. Skeptical of fintech design. Trusts specificity (knowing what IFTA is, what factoring looks like, what ELD miles mean) over polish.

**The small fleet operator.** 2–10 trucks, typically regional or intermodal. $40K–$250K monthly gross. More sophisticated than the owner-op, cares about APR clarity, runs a bookkeeper or outsourced accounting. Needs capital for payroll bridges during shipper-payment delays and for equipment expansion.

**The contractor / GC.** Residential or light commercial. Different language — "invoicing" not "revenue," "draws" not "advances," licensed vs. unlicensed is a gating question. Not the first audience but the second vertical to launch.

**What all of them share:** they were declined by a bank in the last 6–18 months. That's the identifying marker. Bank decline is the qualifying event, not a disqualifier.

---

## 3. Brand and voice

### Name
**Dispatched** — works at two levels. Every trucker knows "dispatch" as the voice that tells them where to go and when. Extending that to capital ("your money, dispatched") plants Dispatched inside the industry's own vocabulary. `.finance` TLD keeps it honest about category without locking the brand to any single vertical.

### Voice
Direct. Industrial. Respectful. No corporate softening, no hustle-bro hype. We talk the way a good dispatcher talks — short, clear, no wasted words, knows what you need before you finish the sentence.

**Never say:** revolutionize, seamlessly, next-generation, cutting-edge, reimagine, democratize, unlock, journey, solutions, ecosystem, robust, leverage (as a verb), empower.

**Always say:** plain-dollar amounts, actual hours and days, specific business types (owner-operator, GC, practice owner), tools borrowers recognize (ELD, IFTA, 1099, factoring, W-9, EIN).

### Visual system
Warm off-white canvas (`#FAF7F2`), not pure white. Steel-blue primary (`#1F4561`), hi-viz orange accent (`#E67A1F`) used only for CTAs and focus states. Archivo for display, IBM Plex Sans for body, IBM Plex Mono for all numeric/monetary values. Sharp-to-soft corners (4/8/12/20px max, never pill-shaped). No blue-to-purple gradients, no Inter, no Poppins. Anti-references: MCA broker sites, generic YC fintech, telehealth sterility, consumer neobanks.

Full design system lives in `/design/DESIGN.md`. Published as a Claude Design system; every new Claude Design project in this org should inherit from it automatically.

---

## 4. Product architecture

### Current scope (MVP)

**Flagship landing page** (`/trucking`, eventually `/`). Built in Claude Design, handoff bundle ready for Claude Code.

**Geo landing template** (`/trucking-loans/{state}/{city}/`). One template, ~45 variables per URL, populated from `cities.json` at build. Handoff bundle ready. Low-coverage fallback rule: if state has <3 panel lenders, 301-redirect to `/trucking`.

**AI Capital Advisor intake** (`/apply`). 8-screen conversational funnel. Mobile-first. Vertical-aware copy variants (trucking, small fleet, contractor, other trade). Soft match preview before contact capture. Currently being built in Claude Code against the XState v5 machine in `/src/lib/machine.ts`.

**Match-logic stub** (`estimateMatch`). Deterministic function that returns lender count, dollar range, APR range, and timing based on vertical + revenue band + time in business + amount + credit band. Tier A/B/C rules documented in the Claude Code handoff. Will be replaced with real lender API calls post-MVP.

**Submit endpoint** (`/api/intake/submit`). Stubbed — validates input server-side, logs to stdout, returns fake `leadId`. No database yet. Real routing to lender APIs is post-MVP.

### Post-MVP scope (first 90 days post-launch)

- Real lender API integration via Lendflow, Biz2X, or direct contracts (whichever partnership closes first)
- Email sequences: welcome, paused-application nurture, approval-received (Resend as ESP)
- SMS recovery for mid-flow bailouts (Twilio, requires 10DLC registration — start that process early)
- Second vertical microsite: construction, using same intake infrastructure with vertical-swap at Screen 2
- Geo page content expansion from 10 flagship states to 25
- Lender partner dashboard (their view of routed applications) — or use Lendflow's existing UI if integrated there

### Out of scope for MVP
No real credit soft-pull integration yet (credit band is self-reported). No borrower login or account. No document upload flow. No analytics dashboard (use PostHog directly). No admin panel. No support ticketing. Keep surface area small until the first funded loan happens.

---

## 5. Distribution strategy

SEO is the primary acquisition channel. Paid is calibration, not scale.

**SEO architecture:**
- **Layer 1:** flagship `dispatched.finance` — brand authority, trust anchor.
- **Layer 2:** vertical microsites — currently `/trucking`, eventually `/construction`, `/medical`, etc. Each with its own hero, calculator, proof, FAQ.
- **Layer 3:** geo pages — `/trucking-loans/{state}/`, `/trucking-loans/{state}/{city}/`. Thousands of long-tail intent keywords. Populated from `cities.json`.
- **Layer 4:** guides, calculators, comparison content — "trucking repair loan vs. MCA," "how much can my trucking business borrow," etc. Not yet built.

**Target keywords (priority order):**
1. `trucking repair loan`, `trucking working capital`, `owner operator loan`
2. `trucking loans [state]`, `trucking loans [city]`
3. `truck repair financing`, `truck engine rebuild loan`
4. MCA alternatives: `alternative to merchant cash advance trucking`
5. Bank-decline long tail: `bank denied my trucking business what next`

**Geo-optimization strategy (AEO/GEO):** every page is written to be quotable by ChatGPT, Perplexity, Claude, Gemini when a trucker asks "where do I get capital after a bank decline." Specific, factual, non-promotional in structure — because AI-generated answers cite pages that read like reference material, not marketing.

**Paid:** $500–2K/month test budget in week 4 post-launch, calibrating CAC. Target CAC < 50% of expected revenue per funded loan (~$1,500). Keyword focus: owner-operator repair loans, trucking working capital, trucking equipment financing. Metros from the first 10 geo-launched states only.

---

## 6. Compliance and legal posture

This is the most underbudgeted section of the plan. It runs parallel to the build, not after.

### State commercial lending broker registration (required before routing to borrowers in each state)

| State | Authority | License | Lead time | Est. cost |
|---|---|---|---|---|
| California | DFPI | CFL license or SB 1235 commercial financing disclosure | 60–90 days | $3–8K |
| New York | NY DFS | Commercial Finance Disclosure Law (effective 2023) | 45–60 days | $2–5K |
| Virginia | SCC Bureau of Financial Institutions | Commercial lending broker | 30–60 days | $2–4K |
| Utah | Department of Financial Institutions | Commercial broker | 30–45 days | $2–4K |

Launching without CA/NY registration cuts TAM by ~25%. Start filings the week intake reaches Checkpoint 4.

### Marketing copy compliance

Every customer-facing page has been written to pass a UDAAP (unfair, deceptive, abusive acts or practices) lens. Specific protections already in place:

- **No "up to $250K in 24 hours" framing.** Replaced with "$25K–$250K, typically funded in 24–48 hours."
- **APR range shown wherever dollar range appears.** Hero, match preview, proof cards, FAQ.
- **Methodology footnotes** on all stats ("funded volume measured as originated principal, 90-day rolling, excludes renewals; median time measured from completed application to first wire").
- **No "bank decline is a positive" reframe** in marketing. Replaced with mechanism-first explanation (DSCR, Schedule C, ELD miles).
- **Data-flow transparency component** on landing, geo, and match preview. Explicitly shows what Dispatched sees, what matched lenders see, when the hard pull happens.
- **No FICO scores on proof cards.** No placeholder license numbers (60DBO-XXXXX etc.). No countdown timers or fake urgency.

This does not replace a compliance lawyer. It means the starting point for their review is cleaner than typical.

### Required before launch

- Privacy policy, terms of service, cookie policy — written for fintech lead-gen with FCRA/GLBA/ECOA disclosure requirements. $5–15K, 4–6 weeks.
- TCPA-compliant SMS consent language in Screen 8 and in SMS opt-in flow.
- 10DLC registration for business SMS. 2–4 weeks via Twilio, requires EIN.
- E&O and cyber liability insurance. $3–10K annual premium.
- Data processing addendum with each lender partner.

### Ongoing
- State licensing renewals (annually)
- Compliance review of all new marketing copy before publishing
- UDAAP refresh quarterly on any page showing APR or timing claims

---

## 7. Current state (as of this writing)

### Shipped / done
- DESIGN.md authored and published as Claude Design system
- Flagship landing page designed, critiqued against owner-op + compliance personas, revised (6 inline comment passes)
- Geo template designed, 45-variable tokenized, three example fills (Houston/TX, Jacksonville/FL, Fresno/CA) demonstrate real content
- AI Capital Advisor intake designed: 8 screens, desktop trust rail, vertical-personalization state diagram
- Live-prototype version with typing indicators, count-up animation, tap-through nav
- Repository initialized at `~/Code/dispatched.finance`, pushed to `github.com/aondaai/dispatched-intake` (private)
- Claude Code Checkpoint 1 complete: Next 16 + React 19 + Tailwind 4 scaffold, fonts loaded via `next/font/local`, tokens wired, `render.yaml` stubbed, dev server 418ms boot, `/` returns 200

### In progress
- Claude Code Checkpoint 2: pure logic with tests green — `estimateMatch`, `copy.ts`, `validation.ts` (Zod v4), XState v5 machine. No UI yet.

### Next in queue (sequenced)
1. Checkpoint 3: screens 1–4 wired to machine
2. Checkpoint 4: screens 5–8 wired, count-up animation, data-flow strip, submit to stub endpoint
3. Checkpoint 5: desktop trust rail, accessibility pass, `/healthz` route, README
4. Manual deploy to Render staging
5. Walk-through on real phone in real signal conditions
6. Trucker feedback pass (2 real owner-ops, Reddit/Facebook recruit)
7. Hand off geo template to Claude Code (second project)
8. Compliance lawyer conversation (3 candidates this week)
9. State license filing research and initiation
10. Lender partner outreach (Lendflow and Biz2X BD contacts)
11. Pitch deck narrative drafted (plain doc, 10 sections)
12. Email templates (Resend wiring)
13. SMS setup (Twilio + 10DLC registration)
14. City content authored for 10 flagship states (hand-written, ~22 hours)
15. Launch readiness review

### Timeline target
- Intake staging deploy: ~2 weeks from today
- Soft launch to trucking forums: ~3 weeks from today
- First funded loan: ~8–14 weeks from today (realistic, depending on lender partnership closing speed and compliance review cycles)

---

## 8. Folder structure (Cowork)

```
/dispatched.finance/
  00_PROJECT_BRIEF.md                 ← this file
  /01_strategy/
    SMB_Lending_Strategy_Chat_Archive.md
    lender_partner_pitch_narrative.md    (to draft)
    compliance_plan.md                   (to draft)
  /02_design/
    DESIGN.md
    DESIGN-dispatched-v1.0.md            (current)
    /flagship_landing/
      (regenerated HTML bundles, critique notes)
    /intake_flow/
      (Claude Design PDF export, handoff bundle)
    /geo_template/
      (regenerated HTML bundle, cities.json schema)
    /emails/
      (when built)
    /lender_deck/
      (when built)
  /03_build/
    (this is a pointer — real code lives at ~/Code/dispatched.finance, mirrored to github.com/aondaai/dispatched-intake)
    handoff_prompt_intake.md
    handoff_prompt_geo.md
    match_logic_tiers.md
    plans/
      2026-04-21-intake-flow.md
  /04_compliance/
    udaap_review_notes.md                (from landing page critique)
    state_licensing_tracker.md           (to draft)
    privacy_policy_draft.md              (lawyer's output)
    /lawyer_candidates/
  /05_content/
    /cities/
      cities.json                        (to populate)
      /markets/
        texas/
          houston.md
          dallas.md
          san-antonio.md
        florida/
          jacksonville.md
          miami.md
        (etc. for the 10 flagship states)
    /guides/
      (long-tail SEO content, post-launch)
  /06_operations/
    analytics_setup.md
    vendors.md                           (Resend, Twilio, Render, Sentry, PostHog accounts)
    runbook.md                           (when something breaks)
  /07_growth/
    seo_keyword_tracker.md
    paid_test_plan.md
    lender_partner_tracker.md
```

Create this structure on day one in Cowork. Every future asset has a home.

---

## 9. Open decisions that need owners

These are decisions the founder needs to make, not delegate. Listed so they don't get lost.

1. **First lender partnership target.** Lendflow (broad platform, faster to integrate, standard takerate) vs. Biz2X (larger, more infrastructure, harder to close). Recommendation: Lendflow first for speed, Biz2X second for volume.
2. **ESP choice.** Resend (recommended) vs. Postmark vs. SendGrid. Resend unless a partner audit requires otherwise.
3. **Analytics stack.** PostHog (self-hostable, generous free tier) vs. Amplitude (richer product analytics). PostHog for speed to launch.
4. **City content strategy.** Hand-write the first 10 markets (recommended, ~22 hours) vs. AI-draft then edit (faster but risks generic voice). Decision ideally by the time geo template deploys.
5. **Paid-ad budget ceiling.** Pick a dollar number that can be lost without changing runway math. Write it down before week 4. Decisions made in advance beat decisions made under stress.
6. **State launch order.** Current default: TX, CA, FL, GA, OH, IL, NY, PA, WA, AZ. Revisit if a specific lender partner has strong regional concentration that should influence sequencing.
7. **Session replay tooling.** Valuable for funnel debugging, privacy-delicate. Disclose in privacy policy if used. Deferred decision until post-launch.

---

## 10. How to work with this project

### For a Claude Cowork session picking this up cold
1. Read this document top to bottom once.
2. Check the `/03_build/plans/` folder for the latest Claude Code checkpoint status.
3. Ask the founder which of Section 9's open decisions is the current focus.
4. For any design task: always start by reading `/02_design/DESIGN.md`. Never generate assets against defaults.
5. For any copy task: check Section 3 ("Brand and voice") for banned and preferred phrases. Deviation is a rewrite trigger.
6. For any compliance-adjacent question: do not answer. Flag for the compliance lawyer (contact TBD).

### For a developer picking this up cold
1. Code lives at `~/Code/dispatched.finance` locally, `github.com/aondaai/dispatched-intake` remote.
2. Next 16 / React 19 / Tailwind 4 / XState v5 / Zod v4 / Vitest.
3. Deploy target: Render.com. `render.yaml` at repo root. Manual first-deploy via dashboard, auto-deploys from `main` after.
4. Read `/03_build/handoff_prompt_intake.md` for the full build spec.
5. Do not guess at vertical copy variants — refer to the state diagram in the intake design bundle.
6. Do not invent new color tokens. Every color goes through a CSS custom property from the token file.
7. Run `npm run typecheck && npm run test && npm run build` before every commit.

### For the founder
1. The intake build is the critical path. Everything else is parallel work.
2. Compliance work has 6–10 week lead times. Start it now, not after intake ships.
3. The lender partner conversation is parallel work that blocks revenue. Start warm intros now.
4. Don't iterate further on the landing page or geo template. They're converged. Move forward.
5. The hardest decision coming up is week 4 post-launch: does paid traffic's CAC come in at a number that justifies scaling the paid budget? That decision should be made in advance, not at 11 PM on a Thursday looking at a dashboard.

---

## 11. What success looks like at specific horizons

**Two weeks from today:** intake deployed to Render staging, walked through on a real phone at a truck stop, 2 trucker reviews returned with verbatim quotes. Compliance lawyer has been engaged. State licensing filings initiated in CA and NY.

**Six weeks from today:** first 10 geo pages live, organic traffic trickling in, first paid-ad test running, lender partnership conversation with one of Lendflow/Biz2X in advanced stage, privacy policy and terms live, first 10 real applications submitted.

**Twelve weeks from today:** lender API integration live, first funded loan through Dispatched, real 3% revenue captured on the books. Email sequences active. SMS recovery live. Geo coverage in 15 states.

**Six months from today:** $500K–$2M monthly funded volume, real unit economics visible, decision on whether to launch construction vertical. First serious conversation with Lendflow or Biz2X about direct-panel commercial terms. Team consists of 2–4 people (founder, one engineer, one compliance/ops, one growth).

**Twelve months from today:** $5M+ monthly funded volume, construction vertical live, paid traffic scaling profitably, two lender platforms integrated, first institutional conversation about Series A or a strategic investment.

---

## 12. What this document is not

It is not a pitch deck. It is not a business plan in the financial-projection sense. It is not a compliance manual. It is not a design system spec (see `/02_design/DESIGN.md`). It is not a runbook for when things break (see `/06_operations/runbook.md` when built).

It is an orientation document. It's what you hand someone — human or Claude — when they ask "so what is this and where are we?"

If something in this document is out of date, update it. If you find yourself answering the same question twice, add it as a section. If you delete something, version it so the history is recoverable.

---

*Maintained by Angelo Orrù. Last edit: April 21, 2026. Next scheduled review: when intake deploys to staging.*
