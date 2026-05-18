# Privacy, Terms, and Legal-Footer Cleanup — Design

**Status:** Approved by founder (Angelo Orru Neto), 2026-05-17
**Owner:** Angelo Orru Neto
**Implementation target:** `~/Developer/dispatched-intake`
**Effective date for legal docs:** 2026-05-17

---

## 1. Problem

The Dispatched intake site currently ships five legal footer links — Privacy, Terms, Licenses, Methodology, Do not sell — but only `/methodology` has substantive content. Privacy, Terms, Licenses, and Do not sell are 1-sentence "being prepared with counsel" placeholders. The site collects PII, runs soft credit pulls via Lendflow, shares with a third-party lender panel, and authorizes phone/text/email outreach — that is a real regulatory footprint and the current placeholders are insufficient.

The founder wants two things, in one pass:

1. **Author substantive Privacy and Terms drafts** — credible enough to hand to counsel for review, not so light they read as boilerplate.
2. **Remove Licenses, Methodology, and Do not sell** — from the footer and from the codebase entirely (page files deleted, not orphaned).

This document is the design for both.

---

## 2. Decisions locked during brainstorming

| Decision | Choice |
|---|---|
| Scope of "exclude" for Licenses / Methodology / Do not sell | **Delete page files AND strip footer links.** Audit for inbound references first. |
| Depth of Privacy + Terms | **Substantive drafts for counsel review.** Keep the existing `(legal)/layout.tsx` "Draft pending counsel review" disclaimer. |
| State privacy law coverage | **Comprehensive multi-state.** Explicit sections for CA (CCPA/CPRA), TX (TDPSA), and the other active state laws as of 2026-05 (VA, CO, CT, UT, OR, MT, IA, DE, NH, NJ, MN, MD). |
| Communications channels in scope | **Phone, text, and email.** Matches `lib/insuranceConsent.ts`. |
| Dispute resolution | **Court only, no arbitration, no class actions.** Texas law, Dallas County TX state and federal courts. |
| Entity | **Dispatched, Inc., a Wyoming corporation, principal offices in Dallas, TX.** Wyoming = state of incorporation only; governing law and venue are Texas / Dallas County. |
| Legal contact email | **angelo@mainline.finance** |
| Mailing address (every appearance on the site) | **12895 Josey Lane #124, Dallas, TX 75234, United States** |
| Page rendering style | **Plain legal-document style** — simple `h1` / `h2` / `p` / `ul`, no `ins-*` marketing layout. In-page anchor TOC at top, no styling. |
| Indexing | **`robots: { index: false, follow: false }`** stays. Legal drafts are not SEO surfaces. |

---

## 3. Files affected

### 3.1 New / fully rewritten

- `app/(legal)/privacy/page.tsx` — full rewrite from 1-sentence stub to ~2,500–3,500-word substantive draft.
- `app/(legal)/terms/page.tsx` — full rewrite from 1-sentence stub to ~2,000–2,800-word substantive draft.

### 3.2 Deleted

- `app/(legal)/licenses/page.tsx`
- `app/(legal)/do-not-sell/page.tsx`
- `app/methodology/page.tsx` (whole directory)

### 3.3 Modified

- `components/landing/Footer.tsx` — remove three `<Link>` elements at lines 185–187.
- `app/sitemap.ts` — remove `/methodology` (and the two legal placeholders if present).
- Any other file containing internal references to `/licenses`, `/methodology`, or `/do-not-sell` — see §6 pre-deletion audit.

### 3.4 Unchanged

- `app/(legal)/layout.tsx` — keeps the "Draft pending counsel review" footer paragraph.
- All other site files.

---

## 4. Privacy Policy — content outline

Rendered inside `app/(legal)/layout.tsx`. Each numbered item below = one `h2` section with a stable `id` for the in-page TOC.

1. **Who we are** — Dispatched, Inc., a Wyoming corporation; principal office 12895 Josey Lane #124, Dallas, TX 75234; contact angelo@mainline.finance.
2. **Scope** — what this policy covers (dispatched.finance site, intake forms, follow-up communications) and what it doesn't (a chosen lender's own privacy policy applies once the operator moves forward with that lender).
3. **What we collect and why**
   - Identifiers: name, email, phone, mailing address.
   - Business identifiers: EIN/SSN, DOT number, MC number, legal entity name.
   - Financial information: monthly revenue band, time in business; at the lender stage, bank statements and tax documents uploaded directly to the lender's portal.
   - Internet/device data: IP, user agent, page interactions; minimal first-party tracking (see §6).
   - Credit information: soft-pull at intake via Lendflow; hard-pull only after the operator selects a lender.
   - Communications metadata: call/text logs, email open/click events.
4. **How we use it** — match the operator to lenders on the panel; service the application; send funding-related communications; comply with law; prevent fraud.
5. **Who we share it with**
   - **Lender panel** — the trucking-friendly lenders we route the application to. Listed by category, not by name (the panel rotates).
   - **Lendflow** — third-party processor for the intake widget on `/apply` and the webhook receiver at `/api/webhooks/lendflow`.
   - **Coverdash** — the named licensed insurance producer for the insurance funnel.
   - **Sentry** — error monitoring; pseudonymous.
   - **Mainline (tryoption.ai)** — crawler-only analytics. Per `proxy.ts`, only requests with crawler user agents are logged; human traffic is dropped.
   - **Service providers** — Render (hosting); email/SMS providers (to be enumerated as they are added).
   - **Legal and safety** — subpoenas, fraud investigations, protection of rights.
6. **Cookies and tracking** — the site uses minimal first-party storage (`localStorage` for Coverdash widget state, per `components/insurance/CoverdashEmbed.tsx`). The site does **not** use Google Analytics, Meta Pixel, LinkedIn Insight Tag, or any third-party advertising tracker as of the effective date. If that changes, this section updates.
7. **Communications consent (TCPA / CAN-SPAM)** — phone, text, and email scope; references the FCC one-to-one TCPA consent at `lib/insuranceConsent.ts` line 17 (version `v1-2026-04-27`); STOP/HELP for SMS; unsubscribe for email; oral revocation accepted for phone calls; standard message-and-data-rates language.
8. **Credit reporting (FCRA)** — soft vs hard pull explained; FCRA rights summarized (free annual report, dispute rights, right to know who pulled); permissible-purpose statement.
9. **Data retention** — application data retained for the period required by applicable lender-recordkeeping, tax, and consumer-financial laws. Placeholder values pending counsel:
   - Funded applications: `[COUNSEL REVIEW: 7 years post-funding]`
   - Non-funded applications: `[COUNSEL REVIEW: 2 years from last activity]`
   - Marketing communications: until unsubscribe + a short cool-down for suppression list maintenance.
10. **Security** — reasonable administrative, technical, and physical safeguards; breach notification commitment per applicable state laws.
11. **Children** — B2B service; not directed to children under 18; we do not knowingly collect from minors.
12. **Your privacy rights** — per-state subsections:
    - **California (CCPA/CPRA)** — right to know, delete, correct, opt-out of "sale" or "sharing," opt-out of profiling for solely-automated decisions with legal effects, limit use of sensitive personal information, non-discrimination for exercising rights. Explicit statement: **we do not "sell" personal information** as defined under CCPA. Sharing for matching purposes is a business-purpose disclosure. (This is why the standalone `/do-not-sell` page is removed — the disclosure lives inline here.)
    - **Texas (TDPSA)** — right to confirm, access, correct, delete, port, opt-out of targeted advertising / sale / profiling; appeals process. Explicit Texas section because we are based here.
    - **Other state residents (VA, CO, CT, UT, OR, MT, IA, DE, NH, NJ, MN, MD)** — equivalent rights enumerated in a single combined subsection; brief table mapping state → effective date of the law.
    - **How to submit a request** — email to angelo@mainline.finance with subject line `Privacy Request — [state]`; verification process; response timing `[COUNSEL REVIEW: 45 days; extension allowed once for an additional 45 days under most state laws]`.
13. **International users** — the site is US-only and is not directed to residents of the EU, UK, or other non-US jurisdictions. Non-US users should not submit information through the intake.
14. **Changes to this policy** — how updates are signaled (effective date at the top updates; material changes get an in-product notice). Continued use after the effective date = acceptance.
15. **Contact** — angelo@mainline.finance + Dallas address.

**Effective-date pattern.** Same as `/methodology` today:

```tsx
const EFFECTIVE_DATE = "2026-05-17";
const EFFECTIVE_DATE_DISPLAY = "May 17, 2026";
```

Used by both the visible byline ("Last updated …") and any future structured-data binding. No `new Date()` — must be a literal so renders are deterministic across SSR and ISR.

---

## 5. Terms of Service — content outline

Same `(legal)/layout.tsx` wrapper. Each item = `h2` with stable id.

1. **Acceptance** — using dispatched.finance = agreement to these Terms + the Privacy Policy.
2. **Who we are** — Dispatched, Inc., a Wyoming corporation; principal office in Dallas, TX; contact angelo@mainline.finance.
3. **What Dispatched is — and isn't**
   - Commercial loan matching service. Not a lender. Not a broker of consumer loans. Not an insurance carrier.
   - Insurance funnel: Coverdash is the named licensed producer.
   - Compensation: a flat referral fee from lenders on funded loans, disclosed on every term sheet; does not affect the APR the operator is offered. Mirrors the disclosure in `components/landing/Footer.tsx` lines 154–164.
4. **Eligibility** — B2B only, US operations only, 18+, authorized to bind the business on whose behalf the application is submitted.
5. **Your account and your application** — truthfulness obligation; authorization to verify submitted information; explicit understanding of soft-pull at intake and hard-pull only after lender selection.
6. **Communications consent** — phone, text, email; references the funnel-level one-to-one consent at `lib/insuranceConsent.ts` line 17; STOP / HELP / unsubscribe mechanics; standard message-and-data-rates language; consent is not a condition of any purchase.
7. **Lender relationships** — once the operator selects a lender, that lender's documents govern the loan; Dispatched is not a party to the loan; Dispatched does not guarantee any lender's offer, APR, or funding decision.
8. **Acceptable use** — no false information; no scraping; no reverse engineering; no use of the service to launder funds or evade sanctions; no impersonation; no automated submission; no use that would put Dispatched out of compliance with lender contracts.
9. **Intellectual property** — site content, calculators, methodology copy, and tools owned by Dispatched; limited revocable license to use the site for its intended purpose; no scraping or redistribution.
10. **Third-party services** — Lendflow (intake widget), Coverdash (insurance producer), the lender panel, Render (hosting); use of any third-party flow is subject to that party's own terms; Dispatched is not responsible for third-party performance.
11. **Disclaimers** — service provided "as is"; no warranty of any funding outcome, APR, or term; rate ranges described on the site (e.g., 14%–34% working-capital, 9%–18% equipment, per `/methodology`) are descriptive of panel observations, not offers or pre-qualifications; calculators are estimates and not credit decisions or commitments.
12. **Limitation of liability** — standard cap (greater of $100 or the fees the operator paid to Dispatched in the prior 12 months — typically $0 since operators pay nothing); excludes consequential, incidental, indirect, special, and punitive damages; preserves carve-outs for things that cannot be waived under Texas law (e.g., gross negligence, willful misconduct, statutory liabilities).
13. **Indemnification** — the operator indemnifies Dispatched for losses arising from misuse, false information, breach of these Terms, or violation of law.
14. **Governing law and venue** — Texas law governs (without regard to conflict-of-laws principles). Exclusive venue: state and federal courts located in Dallas County, Texas. Each party waives objections to venue and personal jurisdiction in Dallas County.
15. **No class actions** — disputes brought individually; no consolidated, representative, or class actions. Companion to the no-arbitration choice — keeps individual court access while limiting class-action exposure.
16. **Termination** — Dispatched may suspend or terminate access for misuse; surviving sections (IP, Limitation of Liability, Indemnification, Governing Law, No Class Actions, Miscellaneous) survive termination.
17. **Changes to these Terms** — how updates are signaled; effective date convention; continued use after the effective date = acceptance.
18. **Miscellaneous** — severability; no waiver; entire agreement; assignment (Dispatched may assign; operator may not without consent); notices (written notice to angelo@mainline.finance and the Dallas address).
19. **Contact** — angelo@mainline.finance + Dallas address.

Same `EFFECTIVE_DATE` / `EFFECTIVE_DATE_DISPLAY` pattern as Privacy.

---

## 6. Footer + page-file cleanup mechanics

### 6.1 Pre-deletion audit (BLOCKING — must complete before any file is deleted)

Run from `~/Developer/dispatched-intake`:

```bash
grep -rn -E '/(licenses|methodology|do-not-sell)' \
  --include='*.tsx' --include='*.ts' --include='*.md' --include='*.mdx' --include='*.json' \
  . | grep -v node_modules | grep -v .next
```

False-positive risk is low — none of these three paths are common substrings — but eyeball each hit before treating it as load-bearing (e.g. a `/research/...licensing...` URL in a markdown blog post is not the same as a link to `/licenses`).

Expected hit-bearing files (based on initial scan, not exhaustive):

- `app/sitemap.ts` — almost certainly lists `/methodology`.
- `app/(legal)/layout.tsx` — wraps the two doomed pages; layout itself stays (still wraps `/privacy` and `/terms`).
- Marketing pages under `/insurance`, `/trucking`, `/calculators`, money pages, `/about`, `/research` — likely link to `/methodology` for credibility.
- JSON-LD breadcrumbs that include `Methodology` as a node.

**Per-reference resolution:**
- Inbound link to `/methodology`: either delete the link/sentence entirely, or replace with the nearest still-existing surface (`/about` for "how we work" framing; `/insurance` for insurance methodology context). Default: delete unless the surrounding sentence depends on the link.
- Inbound link to `/licenses` or `/do-not-sell`: just delete.
- Sitemap entries: delete the corresponding `MetadataRoute.Sitemap` entries.
- JSON-LD breadcrumbs: remove the `Methodology` node from `itemListElement`.

The audit result (list of files + proposed change per file) is presented to the founder for sign-off **before** any deletion happens. Once approved, deletions and modifications run as a single change.

### 6.2 Footer edit

`components/landing/Footer.tsx`, the `.legal-links` block at lines 182–188:

```diff
  <div className="legal-links">
    <Link href="/privacy">Privacy</Link>
    <Link href="/terms">Terms</Link>
-   <Link href="/licenses">Licenses</Link>
-   <Link href="/methodology">Methodology</Link>
-   <Link href="/do-not-sell">Do not sell</Link>
  </div>
```

Result: footer shows only `Privacy | Terms`.

### 6.3 Page-file deletions

After the audit and the footer edit:

```
rm app/(legal)/licenses/page.tsx
rm app/(legal)/do-not-sell/page.tsx
rm -r app/methodology
```

(`app/methodology/` has only `page.tsx` per the initial listing; the `rm -r` is defensive in case any co-located file appears at implementation time.)

### 6.4 Build verification

After all changes:
- `npm run build` — must succeed; broken `<Link>` paths cause TypeScript route-type errors in Next.js typed routes (if enabled in this project) and at minimum produce dev-server 404s.
- `npm test` (Vitest) — must pass; any test asserting on the legal-links block or the methodology page needs to be updated as part of the same change.
- Manual smoke: load `/`, verify footer shows only Privacy + Terms; load `/privacy` and `/terms`, verify new content renders inside the `(legal)/layout.tsx` shell with the "Draft pending counsel review" line still present.

---

## 7. Rendering conventions

- **Layout:** existing `app/(legal)/layout.tsx`. No changes.
- **Heading hierarchy:** one `h1` per page (the document title); section headings are `h2`; sub-points are `h3` only where needed (rare).
- **In-page TOC:** at the top of each doc, a plain `<nav aria-label="Sections">` with a `<ul>` of `<a href="#section-id">` links. No CSS class — inherits layout defaults.
- **Stable section ids:** kebab-case derived from the section heading. Stable across edits so external links to `#section-id` don't break.
- **`[COUNSEL REVIEW]` markers:** inline literal text in brackets, format `[COUNSEL REVIEW: <what to verify>]`. Grep-friendly. To be resolved by counsel; the founder can search for `COUNSEL REVIEW` to find every open question.
- **No JSON-LD on legal pages.** These are not SEO surfaces. `robots: { index: false, follow: false }` is preserved on both pages.
- **No images, no charts, no embeds.** Text only.
- **Address and contact reuse.** Address is hard-coded inline (it appears in the footer already and a constant is overkill for two new uses). Contact email is hard-coded inline for the same reason.

---

## 8. Out of scope

- **Cookie consent banner.** The site does not currently use trackers that trigger CCPA / GDPR consent requirements, so no banner is added. Revisit if a Google Analytics or Meta Pixel is added later.
- **Standalone Cookie Policy page.** Folded into Privacy §6.
- **Standalone Data Subject Request form.** Email-based intake to angelo@mainline.finance per Privacy §12 is sufficient for MVP.
- **Lender-panel registry page.** Privacy §5 describes the panel by category; a per-lender directory is a separate project.
- **State licensing disclosure page.** The footer compliance paragraph at `components/landing/Footer.tsx` lines 176–180 already says "Commercial loan broker registrations pending in applicable states; State-specific licensing information will be listed here prior to launch." That commitment is unaffected by deleting the `/licenses` placeholder — the licensing disclosure block lives in the footer, not in a dedicated page. When licenses are finalized, they go into that footer block or into a new page created at that time.
- **Counsel review itself.** This design produces a draft. Counsel review and any redlines are the founder's responsibility post-spec.

---

## 9. Risks and how this design handles them

| Risk | Mitigation |
|---|---|
| Deleting `/methodology` orphans inbound links across the site, breaking navigation and creating 404s. | §6.1 BLOCKING pre-deletion audit. Founder sign-off on the per-reference change list before any deletion. |
| AI-drafted Privacy / Terms used as the live policy without legal review. | `(legal)/layout.tsx` keeps the "Draft pending counsel review" line on every legal page. `robots: index: false` prevents search-engine surfacing. Every page reviewer sees the disclaimer before reading the body. |
| State privacy laws change between draft and counsel review. | §4 §12 enumerates state laws active as of 2026-05-17. `[COUNSEL REVIEW]` markers around response-window timing and retention periods so counsel re-checks against current statute when they review. |
| Removing the standalone `/do-not-sell` page might be read as not honoring CCPA's right to opt out of "sale" / "sharing." | Privacy §12 California subsection explicitly states "we do not 'sell' personal information as defined under CCPA" and describes how to opt out via the privacy-request email. CCPA's standalone "Do Not Sell or Share My Personal Information" link is only required when a business actually engages in "sale" or "sharing" as defined — Dispatched's lender-routing is business-purpose disclosure, not "sale." Counsel will verify this characterization. |
| Wyoming incorporation + Texas governing law could read as conflicting. | Terms §2 + §14 explicitly state the entity is a Wyoming corporation, the principal office is in Dallas, TX, and the chosen governing law and forum are Texas / Dallas County. This is a normal and enforceable combination. |
| No class-action clause (§15) is more aggressive than typical "neutral" terms. | Spec flags it as a substantive choice; founder confirmed during brainstorming. If counsel pushes back, the clause is deletable as a self-contained section. |

---

## 10. Acceptance criteria

A reviewer (founder or counsel) opening the final build should be able to verify:

1. `/privacy` renders the full ~2,500–3,500-word Privacy draft, with the in-page TOC, the "Draft pending counsel review" footer line, and `robots: { index: false }`.
2. `/terms` renders the full ~2,000–2,800-word Terms draft, same shell.
3. The site footer shows exactly two legal links: **Privacy** and **Terms**.
4. Direct navigation to `/licenses`, `/methodology`, or `/do-not-sell` returns Next.js's standard 404.
5. `app/sitemap.ts` contains no reference to any of the three deleted paths.
6. `grep -r -E '/(licenses|methodology|do-not-sell)' app components lib` returns no production-code matches outside of git history (matches inside this design document are fine).
7. Every `[COUNSEL REVIEW: …]` marker corresponds to an open jurisdiction-specific question that counsel needs to resolve.
8. `npm run build` succeeds and `npm test` passes.

---

## 11. Implementation plan (next step)

This document is the **design**, not the implementation plan. The next step is to invoke the `writing-plans` skill, which will turn this design into a step-by-step implementation plan with explicit verification gates between phases — at minimum:

- **Phase 1:** Pre-deletion audit + founder sign-off on per-reference change list.
- **Phase 2:** Footer edit + page-file deletions + inbound-reference cleanup, in a single commit.
- **Phase 3:** Rewrite `app/(legal)/privacy/page.tsx`.
- **Phase 4:** Rewrite `app/(legal)/terms/page.tsx`.
- **Phase 5:** Build + test verification + manual smoke.

Each phase has a verification gate before the next begins.
