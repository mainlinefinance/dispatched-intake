# Content briefs — top 5 SEO opportunities

Production-ready briefs for the 5 highest-priority content surfaces surfaced
by the SEO audit. Each brief is the full spec — outline, sections, key facts,
schema, internal links, sources, CTAs, and acceptance criteria. A writer or
freelancer can hand any one of these to a CMS without further interpretation.

Voice mirrors `docs/seo/per-page-copy.md`. Direct, no fluff, no academic
prose. Real numbers, not weasel words. Never promise rate, term, or approval.

For FAQ answers: each answer's first sentence stands alone as the answer.
Plain text only — no markdown, no inline links — these become JSON-LD.

---

## Brief 1: Lender panel transparency page

### Meta

| Field | Value |
|-------|-------|
| Target URL | `/lender-panel` (new route) |
| Page type | New |
| Primary keyword | trucking lender panel |
| Secondary keywords | trucking finance lenders, who funds trucking loans, lender-paid trucking marketplace |
| Search intent | Commercial / trust validation |
| Word count target | 1,200–1,600 words |
| Owner (suggested) | Marketing + Eng (panel data wiring) |
| Priority | High |
| Effort | Half day (writer) + 2 days (panel data backfill) |

### Why this page

This is the top conversion blocker for a new finance domain. Lendio publicly
names ~75 lenders; Dispatched currently names none. Without a vetting
disclosure, sophisticated operators — and every marketing partner doing
diligence — bounce. The page pulls double duty as an E-E-A-T signal for
ChatGPT/Perplexity/Claude when they answer "who does dispatched.finance
work with."

We do not need to ship lender logos to ship this page. We can ship the
vetting criteria, the lender categories, the panel-management process, and a
panel-size disclosure (with a dated count) on day one. Logos and named
lenders ship on later iterations as appointments allow public disclosure.

### Page outline

#### H1
The Dispatched lender panel — who funds your trucking loan

#### Above the fold (first 100 words)
Two-sentence value prop, primary keyword in first sentence, one-line answer
to "how is the panel different from a generic small-business lender list."

Suggested opener:

"The Dispatched trucking lender panel is the set of lenders we route
applications to. Every lender on the panel is vetted on three dimensions —
state-licensing compliance, transparent fee and APR disclosure on term
sheets, and willingness to underwrite trucking-specific signals like DOT, MC,
and settlement statements instead of generic small-business templates."

Above-the-fold CTA: link to `/apply` with anchor "See your lender match."

#### Section: Panel size and last verified
Single short paragraph plus a stamped data block.

Format:
- Panel size: N lenders (last verified YYYY-MM-DD)
- Working-capital programs: N lenders
- Equipment-secured programs: N lenders
- Repair-loan programs: N lenders
- Sub-580 FICO programs: N lenders
- New-authority (under 12 mo) programs: N lenders

If the precise count is not yet ready for publication, ship the page with the
qualitative descriptor used elsewhere on the site ("trucking-friendly
lenders on our panel") and a "panel registry pending — last verified" stamp.
Do not invent a number. See methodology page precedent for the
"counted-only-when-real" discipline.

#### Section: How we vet a lender before they join the panel
Three named criteria, each with a 2–3 sentence explanation.

1. **State licensing and disclosure compliance.** The lender must be
   licensed (where required) in the states it funds and must disclose its
   fee structure clearly on the term sheet. Lenders that operate in
   licensing-required states without the license, or that bury fees in fine
   print, do not qualify.
2. **Transparent fee and APR disclosure.** Term sheets must show APR, term
   length, total cost of capital, origination fees, prepayment penalties,
   and any required ACH/payment-processing fees on the same page. Lenders
   that quote interest-only or factor-rate-only without an APR equivalent
   are excluded.
3. **Trucking-specific underwriting.** The lender must underwrite DOT
   number, MC authority, settlement statements, and equipment-class signals
   — not just a generic small-business template. Lenders that decline every
   sub-650 FICO operator regardless of revenue or equipment do not fit our
   borrower base.

#### Section: Lender categories on the panel
Even before lender names ship publicly, the page can list the categories
that exist on the panel. This is the section that actually sells the panel's
trucking specialization.

Recommended structure: a short paragraph per category, explaining what kind
of operator the category serves and the typical APR/term band.

Categories to include:

- **Bank-statement working-capital lenders.** Underwrite on monthly
  business deposits and DSCR; primary product is a 6- to 24-month working
  capital line. APR band 14% to 34%. Common operator fit: established
  owner-operators and small fleets needing fuel/payroll/slow-month bridge.
- **Equipment-secured lenders.** Take a first-position lien on the financed
  asset; serve tractor, trailer, and box-truck purchases. APR band 9% to
  18%. Common operator fit: anyone buying titled commercial equipment.
- **Sub-650 FICO programs.** Lenders that price for credit-impaired
  borrowers without auto-declining. APR band sits at the high end of either
  working capital or equipment-secured ranges. Common operator fit:
  operators with prior bankruptcies, charge-offs, or recent
  delinquencies who still have positive cashflow.
- **MC-authority lenders for new operators.** Underwrite operators with
  under 12 months of MC authority on a narrower set of products — primarily
  equipment-secured loans and small working-capital lines. Common operator
  fit: first-year owner-operators and former W-2 drivers transitioning to
  authority.
- **Repair-loan lenders.** Same-banking-day funders for operators with a
  truck at the shop. Underwrite working-capital style on 3 months of bank
  statements; do not require the repair invoice to be assigned. Common
  operator fit: any operator with a shop quote in hand.
- **Invoice factoring partners.** Underwrite the broker's credit, not the
  operator's. Spot and whole-ledger structures available. Common operator
  fit: operators with broker-paid receivables on net-30 to net-90 terms.

If/when specific lenders can be named without breaking partnership
disclosure rules, name them inside their category. Until then, the
categories alone are useful.

#### Section: How the panel grows
Two short paragraphs.

- **New lender onboarding.** Sourced through trucking-finance broker
  networks, direct lender outreach, and operator referrals. Each prospective
  lender is reviewed against the three vetting criteria. The onboarding
  cycle from first contact to first routed application typically runs 4 to
  8 weeks.
- **What happens when a lender leaves.** A lender exits the panel when they
  stop funding to our borrower base, change their FICO floor or appetite in
  a way that no longer fits, or fail a re-vetting check on disclosure
  transparency. When a lender exits mid-application, the operator is
  re-routed to other matched lenders without restarting the application.

#### Section: How we get paid (lender-paid disclosure)
Two short paragraphs. Direct copy.

Suggested copy:

"Lenders pay Dispatched a referral fee on funded loans. The operator pays
nothing to apply, nothing to be matched, and nothing to receive a term
sheet. If a lender charges an origination fee at funding, that fee is
itemized on the term sheet you sign before any money moves.

The matching engine routes on appetite fit, not on referral-fee size. The
shortlist returned to the operator is the set of lenders whose published
appetite accepts the operator's profile — it is not sorted by which lender
pays Dispatched the most. Operators always see at least 2 lenders to
compare, where 2 or more pass appetite. That separation between routing and
revenue is what keeps the panel honest."

#### Section: FAQ

1. **Q: How many lenders are on the Dispatched panel?**
   A: The current panel size and last-verified date are listed at the top of
   this page. Counts are reviewed quarterly and updated within 14 days of a
   material change such as a lender joining, leaving, or changing their
   appetite. The panel intentionally trades raw lender count for trucking
   specialization — every lender on the panel underwrites DOT, MC, and
   settlement statements rather than a generic small-business template.

2. **Q: How does Dispatched decide which lenders to add to the panel?**
   A: Three criteria. State licensing and disclosure compliance, transparent
   fee and APR disclosure on term sheets, and willingness to underwrite
   trucking-specific signals instead of a generic small-business template.
   Lenders that operate without required state licenses, that bury fees in
   fine print, or that auto-decline every sub-650 FICO operator do not
   qualify.

3. **Q: Are the lenders direct lenders or other brokers?**
   A: Direct lenders. Dispatched does not route applications to other
   brokers or marketplaces. Each lender on the panel originates and funds
   loans on its own balance sheet or via its own warehouse line. That
   matters because broker-of-broker chains add fees the operator pays
   without seeing them on the term sheet.

4. **Q: Why does Dispatched not name every lender publicly?**
   A: Some lenders restrict public disclosure of their broker partnerships
   as a condition of the partnership. Where a lender allows public
   disclosure, we name them on this page. Where the partnership requires
   confidentiality, we describe the lender by category. The vetting criteria
   apply equally to named and unnamed lenders.

5. **Q: How does Dispatched make money if the operator pays nothing?**
   A: Lenders pay Dispatched a referral fee on funded loans. The operator
   pays nothing to apply, match, or receive a term sheet. The matching
   engine routes on appetite fit, not on referral-fee size — the shortlist
   the operator sees is the set of lenders whose published appetite accepts
   their profile, not the set that pays Dispatched the most.

6. **Q: What happens when a lender on the panel changes their FICO floor?**
   A: The page is updated within 14 days of the change. Operators with
   in-flight applications who no longer fit the lender's new appetite are
   re-matched to other lenders that still accept their profile. The change
   is also reflected on the affected money pages — for example, if a
   working-capital lender raises its FICO floor from 580 to 620, the
   bad-credit-truck-financing page disclosure is adjusted.

7. **Q: Can I request a specific lender?**
   A: No. The matching engine routes on appetite fit, not on operator
   request. Operators can ask the support line which lenders are likely to
   fit their profile before applying, but the shortlist returned by the
   matching engine is what determines the lender choice.

#### Section: CTA
Repeat the above-the-fold CTA. Anchor: "See which lenders match your
operation." Links to `/apply`.

Secondary CTA below the FAQ: "Read our methodology" → `/methodology`.

### Schema markup

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      "name": "Dispatched lender panel",
      "url": "https://dispatched.finance/lender-panel",
      "description": "Vetted panel of trucking-finance lenders for working capital, equipment loans, repair loans, and invoice factoring.",
      "provider": {
        "@type": "Organization",
        "name": "Dispatched",
        "legalName": "TCopyCats LLC",
        "url": "https://dispatched.finance",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US",
          "addressRegion": "WY"
        }
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "serviceType": [
        "Working capital lending",
        "Equipment financing",
        "Repair loans",
        "Invoice factoring"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many lenders are on the Dispatched panel?",
          "acceptedAnswer": { "@type": "Answer", "text": "..." }
        }
      ]
    }
  ]
}
```

Writer: copy the seven Q&A pairs into the FAQPage `mainEntity` array
verbatim. Each `acceptedAnswer.text` is the plain-text answer from the FAQ
section above.

### Internal linking

| Link FROM (path) | Link TO (path) | Anchor text |
|------------------|----------------|-------------|
| `/methodology` | `/lender-panel` | "the lender panel" |
| `/apply` (intro copy) | `/lender-panel` | "see who funds the loan" |
| `/about` | `/lender-panel` | "lenders we route to" |
| Footer (trust column) | `/lender-panel` | "Lender panel" |
| `/bad-credit-truck-financing` | `/lender-panel#sub-580` | "sub-650 FICO programs" |
| `/new-authority-truck-financing` | `/lender-panel#new-authority` | "new-authority lenders" |

| Link FROM (path) — outbound from this page | Link TO (path) | Anchor text |
|--------------------------------------------|----------------|-------------|
| `/lender-panel` | `/apply` | "See your lender match" |
| `/lender-panel` | `/methodology` | "Read our methodology" |
| `/lender-panel` | `/disclosures` | "Compensation disclosure" |
| `/lender-panel` | `/qualify` | "Check your fit in two questions" |

### External sources to cite

| Source | URL | Use |
|--------|-----|-----|
| FMCSA SAFER | https://safer.fmcsa.dot.gov/ | Validate that DOT/MC underwriting is a real signal lenders check |
| Equipment Leasing & Finance Foundation industry reports | https://www.leasefoundation.org/ | Cite for equipment-finance industry context (APR bands, term-length norms) |
| ATRI annual operational-cost report | https://truckingresearch.org/ | Cite for operator revenue and cost context |

External citations are optional for this page — it is primarily a structural
disclosure, not a research piece. Cite only if the writer needs an
authoritative anchor for a specific claim (e.g., "DSCR is a standard
underwriting signal").

### Open decisions / dependencies

- Current lender panel count is unknown to this brief — flagged as "the
  panel registry is not yet published" in the existing methodology page.
  Marketing + ops need to ship a panel-count number with a verified date
  before this page can show a count. Until then, ship with the qualitative
  descriptor and stamp.
- Confirm with legal whether named lenders can be listed on a public page
  (depends on each lender's broker agreement). If yes, a follow-up brief
  spec'd around named-lender cards is the next iteration.
- Eng: this page consumes the same panel registry that the methodology page
  punts on. If the registry ships as structured data (JSON), this page
  should read from it rather than hard-code the counts.

### Acceptance criteria

- [ ] Word count 1,200–1,600
- [ ] Primary keyword "trucking lender panel" in title, H1, first 100
      words, and at least 3 H2s
- [ ] Panel-size data block ships with either a verified count + date OR
      explicit "registry pending — last verified" stamp (no invented numbers)
- [ ] All 7 FAQ answers are plain text — no markdown, no inline links
- [ ] FAQPage JSON-LD validates clean at validator.schema.org
- [ ] FinancialService JSON-LD validates clean at validator.schema.org
- [ ] CTA appears above the fold AND below the FAQ (`/apply` both times)
- [ ] Internal links use descriptive anchor text — no "click here"
- [ ] Mobile readability check (page is read on phones in parking lots)
- [ ] Reviewed against banned-filler list before merge

---

## Brief 2: Customer reviews / testimonials hub

### Meta

| Field | Value |
|-------|-------|
| Target URL | `/reviews` (new route) + section on homepage |
| Page type | New |
| Primary keyword | dispatched finance reviews |
| Secondary keywords | trucking finance reviews, owner operator loan reviews, dispatched.finance review |
| Search intent | Brand investigation / trust validation |
| Word count target | 800–1,200 words (page); 60–120 words per testimonial |
| Owner (suggested) | Marketing + Customer success (outreach) |
| Priority | High |
| Effort | Quick win on the page shell; substantial on outreach to source 5+ reviews |

### Why this page

This page exists for two reasons. First, AggregateRating schema produces
star-rating rich snippets in SERPs — measured CTR uplift in finance is +20%
to +35%. Second, it defends the brand SERP. When operators search "dispatched
finance reviews" today, the SERP is owned by aggregator and competitor
content that Dispatched has no control over.

Critical discipline: AggregateRating only ships once 5+ verified reviews
exist. Fake reviews are a Google penalty risk and a regulatory risk under
FTC endorsement guides. The page can ship without AggregateRating and add it
once the threshold is hit.

### Page outline

#### H1
Dispatched reviews — what trucking operators say after they fund

#### Above the fold (first 100 words)
Two-sentence value prop + AggregateRating block (if 5+ reviews exist) +
above-the-fold CTA.

Suggested opener:

"Dispatched matches owner-operators and small fleets with trucking-friendly
lenders for working capital, repair loans, equipment financing, and
insurance. Below are reviews from operators who funded through the platform
— their truck type, the product they used, and what happened. Reviews are
verified against funded-loan records before publication."

If 5+ reviews exist: render an AggregateRating block here ("4.7 out of 5
based on N verified reviews"). If fewer than 5, omit the block entirely. Do
not render a half-populated rating.

Above-the-fold CTA: link to `/apply` with anchor "Get matched with a
lender."

#### Section: Why we publish reviews this way
Single short paragraph explaining the verification discipline.

Suggested copy:

"Every review on this page is from an operator with a funded loan in our
records. We do not solicit reviews from declined applicants, we do not edit
reviews for tone, and we do not delete negative reviews. Operators who
report a problem after funding are followed up with directly. The reviews
shown below are reproduced verbatim with the operator's permission and
verified against the funded-loan record."

#### Section: Verified operator reviews

Each review uses the same format. The writer hands a template to customer
success; customer success collects the data via the outreach script (below);
each entry is rendered against this template.

**Testimonial format spec (per review):**

| Field | Required | Source |
|-------|----------|--------|
| Operator first name + last initial | Yes | From signed consent |
| State (2-letter) | Yes | From application record |
| Truck type (e.g., "1 truck — Cascadia day cab") | Yes | From application record |
| Product used | Yes | From funded-loan record |
| Funded amount range (e.g., "$25K–$50K") | Yes | From funded-loan record |
| Funded date (month + year only) | Yes | From funded-loan record |
| Star rating (1–5) | Yes | From operator |
| Review text (60–120 words) | Yes | From operator, verbatim |
| Photo (optional) | No | From operator with consent |

Render order: most recent first. Cap visible reviews at 12; older reviews
behind a "Show all" disclosure to keep the initial page weight reasonable
on mobile.

If the team has fewer than 5 reviews at launch, ship the page with the
verification-discipline section and a "Reviews coming as the platform
matures — be one of the first" CTA pointing to `/apply`. Do not invent
reviews. Do not pad with marketing-team voice.

#### Section: Where else to find reviews
Brief paragraph pointing to third-party review platforms once integrations
ship.

Recommended platforms in priority order:

1. **Trustpilot.** Free tier supports widget embed and verified-review
   collection via post-funding email. Set up a Dispatched profile, integrate
   the widget on this page, and configure the post-funding email flow to
   request a review 7–14 days after first payment.
2. **Google Business Profile.** Once Dispatched has a verified business
   address (Dallas operational address per recent commit), GBP reviews are
   the highest-trust public review surface. Reviews collected here also feed
   the brand SERP.
3. **BBB.** A BBB business profile with a "rated" status is a trust signal
   even for operators who do not actually read BBB reviews. Apply for a BBB
   profile once 12 months of operating history are on the books.

#### Section: Customer outreach script
This section is for the writer/CS team — it is *not* rendered on the page.
Move to a separate doc if preferred, but keeping it here keeps the brief
self-contained.

**Email subject line options (test):**

- "Quick favor — would you share how Dispatched worked for you?"
- "Two minutes: how did the [truck type] loan work out?"

**Email body template:**

```
Hi [first name],

[CS rep name] here from Dispatched. We funded your [product] back in
[month] — checking in to see how the truck/operation is running, and to ask
a small favor.

We are publishing a public reviews page so other operators can see real
accounts of what working with Dispatched is actually like. Would you be
willing to share a short review (60–120 words is plenty) about your
experience? We will publish it under your first name and state — no full
name, no email, no phone number shown publicly.

If yes, just reply to this email with your review and a star rating from
1–5. If you would rather skip it, no problem at all — your business is
appreciated either way.

[CS rep name]
[Direct phone]
[Email]
```

**What to ask for in the review (suggest in the email or on a follow-up
form):**

- What product did you fund (working capital / equipment / repair / factoring)?
- How fast did the money hit your account?
- What was the experience comparing offers and picking a lender?
- Would you use Dispatched again or recommend it?
- Any specifics on the funded amount range, the truck or trailer, or the
  use of funds.

**Cadence:**

- First request: 14 days after first scheduled payment lands.
- Reminder: 30 days after first request, only if no response.
- No third request — do not nag.

#### Section: FAQ

1. **Q: Are these reviews real?**
   A: Yes. Every review on this page is from an operator with a funded loan
   in our records. Reviews are reproduced verbatim with the operator's
   written permission. We do not solicit reviews from declined applicants,
   we do not edit reviews for tone, and we do not delete negative reviews.
   The funded-loan record is the verification anchor.

2. **Q: How does Dispatched ask for a review?**
   A: A customer success representative emails the operator 14 days after
   the first scheduled loan payment lands. The email asks for a 60- to
   120-word account of the funding experience and a 1- to 5-star rating.
   The operator can decline without consequence. Reviews are published only
   with explicit permission.

3. **Q: Can I leave a review if I had a bad experience?**
   A: Yes. We publish negative reviews on the same page as positive ones.
   Operators with an unresolved problem should contact the support line
   directly first — many issues are resolvable — but the operator's right
   to leave a public review is not contingent on resolving the issue. The
   review goes up either way if the operator wants it published.

4. **Q: Why are some operator names abbreviated?**
   A: Standard practice on financial-services review pages is to publish
   first name plus last initial plus state. The full name and contact
   details are kept private to protect the operator's identity. The
   internal funded-loan record verifies the review without exposing the
   operator's information publicly.

5. **Q: Where else can I find Dispatched reviews?**
   A: Trustpilot, Google Business Profile, and the Better Business Bureau
   are the planned third-party review surfaces. Links to each will appear
   on this page as the integrations ship. Operators who have already left
   reviews on those platforms are encouraged to leave one here as well —
   the more public verification, the better.

#### Section: CTA
Repeat the above-the-fold CTA. Anchor: "Get matched with a lender." Links
to `/apply`.

Secondary CTA below the FAQ: "Check your fit in two questions" →
`/qualify`.

### Schema markup

**Page-level (only if 5+ verified reviews exist):**

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Dispatched",
  "url": "https://dispatched.finance",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "23",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

**Per-review (one block per testimonial):**

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "FinancialService",
    "name": "Dispatched"
  },
  "author": {
    "@type": "Person",
    "name": "Marcus T."
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": "...",
  "datePublished": "2026-04-12"
}
```

Writer: render Review schema only for reviews where the operator has
explicitly consented to public publication. Do not render schema for
anonymous or pseudonymous reviews.

### Internal linking

| Link FROM (path) | Link TO (path) | Anchor text |
|------------------|----------------|-------------|
| Homepage hero / proof section | `/reviews` | "Read operator reviews" |
| Footer (trust column) | `/reviews` | "Reviews" |
| `/about` | `/reviews` | "operator reviews" |
| `/methodology` | `/reviews` | "verified operator reviews" |
| `/apply` (sidebar trust panel) | `/reviews` | "What other operators say" |

| Link FROM (path) — outbound from this page | Link TO (path) | Anchor text |
|--------------------------------------------|----------------|-------------|
| `/reviews` | `/apply` | "Get matched with a lender" |
| `/reviews` | `/qualify` | "Check your fit in two questions" |
| `/reviews` | `/methodology` | "How we verify reviews" |

### External sources to cite

| Source | URL | Use |
|--------|-----|-----|
| FTC endorsement guides | https://www.ftc.gov/business-guidance/resources/ftc-endorsement-guides-what-people-are-asking | Cite in "Why we publish reviews this way" — anchors the no-fake-reviews discipline |
| Google Search Central — review snippet guidance | https://developers.google.com/search/docs/appearance/structured-data/review-snippet | Cite for AggregateRating + Review schema discipline |
| Trustpilot business policies | https://business.trustpilot.com/guides-reports/manage-reviews | Cite when discussing the Trustpilot integration plan |

### Open decisions / dependencies

- Customer success bandwidth — the outreach script needs a CS rep to
  actually send the emails. Marketing + ops need to confirm who owns this.
- Review collection tool — the team should decide between (a) lightweight
  in-house form on `/reviews/submit`, (b) Trustpilot integration, or (c)
  both. Recommend Trustpilot for verified-review credibility plus the
  in-house form for legacy customer outreach.
- Brand-SERP defense priority — if the brand SERP is currently dominated by
  a specific aggregator (e.g., a competing lead-gen review page), call that
  out as a P0 in the launch plan so the page is structured to outrank it.
- Photo policy — if operator photos are collected, ensure the consent form
  covers public publication of likeness.

### Acceptance criteria

- [ ] Page word count 800–1,200 (excluding individual testimonials)
- [ ] Each testimonial 60–120 words
- [ ] Primary keyword "dispatched finance reviews" in title, H1, first 100
      words, and at least 2 H2s
- [ ] AggregateRating schema rendered ONLY if 5+ verified reviews exist
- [ ] Per-review schema rendered ONLY for reviews with explicit publication
      consent
- [ ] Zero invented or composite reviews — every testimonial is from an
      operator with a funded-loan record
- [ ] FAQ answers are plain text — no markdown, no inline links
- [ ] All schema validates clean at validator.schema.org
- [ ] Outreach email template handed to customer success with cadence
      documented
- [ ] CTA appears above the fold AND below the FAQ (`/apply` both times)
- [ ] Reviewed against banned-filler list before merge

---

## Brief 3: Methodology page expansion

### Meta

| Field | Value |
|-------|-------|
| Target URL | `/methodology` (existing — expand) |
| Page type | Expansion of existing |
| Primary keyword | trucking finance methodology |
| Secondary keywords | trucking insurance methodology, how dispatched works, dispatched finance underwriting, panel APR methodology |
| Search intent | Trust / E-E-A-T / referenceability |
| Word count target | Existing page is ~1,400 words; target 2,500–3,200 after expansion |
| Owner (suggested) | Founder / Marketing |
| Priority | High |
| Effort | Half day |

### Why this page

YMYL finance content needs explicit methodology for Google quality raters,
and `/methodology` is the page that AI engines (ChatGPT, Claude, Perplexity)
cite when answering "how does Dispatched work" or "are dispatched.finance
rates accurate." Expanding the page does double duty — it raises E-E-A-T for
human raters and gives AI engines a single canonical source to quote. The
existing page is already disciplined and well-structured; the expansion adds
sections that cover gaps the SEO audit surfaced.

The existing page (`app/methodology/page.tsx`) covers structural promises,
APR-band sourcing, composite-scenario labeling, refresh cadence, insurance
sourcing classes, sampling profiles, AM Best display rules, and publication
discipline for state pages. The sections recommended below are additions, not
replacements.

### Sections to add (do not modify existing sections without alignment)

#### Section: Underwriting principles (new)
Insert after "What every claim on the trucking finance home means."

Three-paragraph explanation of the underwriting principles the panel applies
across products. Reader: an operator reading this should understand what
lenders weigh and why. A journalist or partner reading this should be able
to verify the principles against any standard small-business credit
textbook.

Cover:

- **Debt service coverage ratio (DSCR).** Define DSCR (net operating income
  / debt service). State the typical lender minimum on the panel (usually
  1.15 to 1.25 for working capital). Explain why it matters more than FICO
  for revenue-positive operations.
- **Deposit history and consistency.** Define the trailing-3-month and
  trailing-6-month bank-deposit metrics lenders score on. Explain why
  consistency matters as much as total volume — a $30K/month operation with
  zero negative-balance days underwrites differently than a $30K/month
  operation with five.
- **Equipment collateral on secured products.** Explain how appraised value,
  age, and remaining useful life set the loan-to-value cap on equipment
  loans. State the typical LTV cap (around 90% for new equipment, 70% to
  80% for equipment over 5 years old).

Each paragraph 80 to 140 words. Cite Equipment Leasing & Finance Foundation
or a comparable industry source where useful.

#### Section: Rate observation methodology (new — expand on existing)
Insert as a deeper subsection of "How we describe APR ranges."

The existing page says the 14%–34% and 9%–18% bands are the trailing-12-month
observed range. Expand with:

- **Sample size.** State the minimum number of funded loans the band must
  cover before it is published. Suggested floor: 50 funded loans for the
  band to be considered statistically meaningful. If the panel is smaller
  than that, state the actual count and label the band "Indicative — based
  on N funded loans" until the threshold is hit.
- **Time window.** Reaffirm trailing 12 months. State the exact computation
  date.
- **What gets excluded.** Loans that funded outside the published product
  bands (e.g., an $8K working-capital loan when the published range starts
  at $25K) and loans where the lender's term sheet explicitly priced for a
  non-standard structure (e.g., a refi-of-existing-debt at a discount) are
  excluded from the band.
- **What does NOT get computed.** Reaffirm: no average, no median. Averages
  compress credit-band variance; medians can mislead borrowers in either
  tail. The published artifact is the band, not a midpoint.

#### Section: Lender vetting criteria (new)
Insert before "When the finance content changes."

Three-criterion list, mirroring the lender panel page (Brief 1). The
methodology page should state the criteria definitively; the lender panel
page is the operator-facing version of the same content.

#### Section: Insurance carrier vetting criteria (new)
Insert in the insurance-methodology block, after the AM Best section.

Suggested criteria:

- **AM Best rating floor.** Carriers below B+ AM Best are listed only when
  the producer partner has no A-rated alternative for the operator's class.
  Where a B-rated carrier is the only option, the rating is shown
  prominently in the carrier card and the operator is advised to check
  state guaranty fund coverage.
- **State licensing footprint.** Each carrier listed on `/carriers/[carrier]`
  must be licensed in at least the states where the producer partner
  routinely binds them. The licensing data is sourced from the NAIC's
  publicly-available Company Search.
- **Active appointment with the producer partner.** Carriers without an
  active appointment are not listed. When a carrier appointment is added or
  withdrawn, the carrier card is updated within 14 days.

#### Section: Composite scenarios with explicit caveats (already exists — confirm wording)
The existing page already labels these correctly. No changes recommended
unless the operator-facing language can be tightened further.

#### Section: Updated date / lastModified discipline (new)
Insert at the end of the page, before the final CTA.

Single paragraph plus a footer-style metadata block.

Suggested copy:

"Every numerical claim and structural promise on this page carries a
last-reviewed date. The page-level lastModified date is set by the data
layer when any of the underlying sources change; section-level dates are
shown inline where the underlying data is more granular than the
page-level review cadence. When a date is older than 90 days on a money
page, the data is re-checked before further routing. When a date is older
than 12 months on a research page, the page is flagged for re-sampling
before any monetization decision."

Footer block:

- Page last reviewed: YYYY-MM-DD
- Finance content last reviewed: YYYY-MM-DD
- Insurance content last reviewed: YYYY-MM-DD
- Author: [name + title]

#### Section: How we make money — full disclosure (new)
Insert after "Does Dispatched accept compensation that biases the match?"
The existing FAQ answer is good but a separate H2 section that goes deeper
is warranted on the methodology page.

Cover:

- **Lender-paid model.** Lenders pay Dispatched a referral fee on funded
  loans. The operator pays nothing to apply, match, or receive a term
  sheet. Origination fees, where charged, are itemized on the lender's term
  sheet before any money moves.
- **Insurance referral model.** Insurance quotes route to a named producer
  partner. The producer partner pays Dispatched a referral fee on bound
  policies. Premium financing through the partner is unaffected.
- **Conflict-of-interest mitigation.** The matching engine routes on
  appetite fit, not on referral-fee size. The operator always sees at least
  2 lenders to compare where 2 or more pass appetite. Lenders cannot pay to
  jump the routing order.
- **What we are NOT.** Not a direct lender. Not a direct insurer. Not a
  loan servicer. Not a money transmitter. Not a credit reporting agency.

Cite FTC endorsement guides for the disclosure standard.

#### Updated FAQ section (additions)

The existing 7 FAQs are fine. Add 3 more:

8. **Q: Who wrote this methodology?**
   A: The methodology is owned by the Dispatched founder and reviewed by
   the marketing and operations leads quarterly. The author is named in the
   page footer with the title and date of last review. Substantive changes
   are recorded in the page changelog and reflected on the affected money
   pages within 14 days.

9. **Q: How do you handle errors discovered after publication?**
   A: When a numerical claim or structural promise is found to be wrong,
   the page is corrected within 1 business day and an inline note states
   the date and nature of the change. We do not silently rewrite. The
   correction history is available on request to journalists, regulators,
   and partners.

10. **Q: Can I republish parts of this methodology?**
    A: Yes, with attribution. Cite as "Dispatched, Methodology" with a link
    back to dispatched.finance/methodology. Republishing tables or charts
    requires the same attribution. For excerpts longer than 500 words or
    for commercial republication, email the editorial team for written
    permission.

### Schema markup

The existing page already emits Article + BreadcrumbList + FAQPage schema.
Add a Person reference to the Article schema for the methodology author.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Dispatched Methodology",
  "description": "Definitions, sourcing, refresh cadence, and publication discipline for the trucking finance and commercial trucking insurance content Dispatched publishes.",
  "url": "https://dispatched.finance/methodology",
  "datePublished": "2026-XX-XX",
  "dateModified": "2026-XX-XX",
  "author": {
    "@type": "Person",
    "name": "[founder name]",
    "jobTitle": "Founder",
    "url": "https://dispatched.finance/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dispatched",
    "legalName": "TCopyCats LLC",
    "url": "https://dispatched.finance"
  }
}
```

The existing FAQPage block is updated to include the 3 added Q&As.

### Internal linking

| Link FROM (path) | Link TO (path) | Anchor text |
|------------------|----------------|-------------|
| Existing — keep | `/insurance/tools/premium-estimator` | "Try the premium estimator" |
| Existing — keep | `/insurance` | "Back to commercial trucking insurance" |
| Add | `/lender-panel` | "the lender panel" |
| Add | `/about` | "about the founder" |
| Add | `/disclosures` | "compensation disclosure" |

| Link FROM (path) — inbound to this page (existing — verify) | Link TO (path) | Anchor text |
|-------------------------------------------------------------|----------------|-------------|
| `/carriers` | `/methodology` | "Read our methodology" (existing) |
| Money pages compliance footers | `/methodology` | "How we describe rates" |
| `/research/state-of-commercial-trucking-insurance-2026` | `/methodology` | "Methodology" |

### External sources to cite

| Source | URL | Use |
|--------|-----|-----|
| FTC endorsement guides | https://www.ftc.gov/business-guidance/resources/ftc-endorsement-guides-what-people-are-asking | Anchor the disclosure-discipline section |
| Equipment Leasing & Finance Foundation industry studies | https://www.leasefoundation.org/research/ | Cite for equipment finance LTV norms and APR-band context |
| FMCSA 49 CFR Part 387 | https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387 | Cite for insurance minimum-limits anchor (already implicit on insurance pages) |
| Google Search Central — E-E-A-T quality rater guidelines | https://services.google.com/fh/files/misc/hsw-sqrg.pdf | Reference (non-cited) for the section structure |
| AM Best — methodology and rating scale | https://web.ambest.com/ratings-services/methodologies | Cite for AM Best rating-scale explanation |

### Open decisions / dependencies

- Founder name and title for the author byline — must be confirmed before
  shipping. The `/about` page exists and presumably has the byline.
- DSCR floor on panel lenders — 1.15 vs 1.25 vs "varies by lender" — needs
  ops confirmation before publication. Default to "varies by lender;
  typical floor 1.15 to 1.25" if the team cannot get a single number.
- Sample-size floor for APR bands — 50 funded loans is a suggestion.
  Marketing and the founder should confirm a defensible number.
- Insurance carrier vetting criteria — confirm with the producer partner
  whether the criteria as written are accurate to the partnership's
  appointment-management process.

### Acceptance criteria

- [ ] Total page word count 2,500–3,200
- [ ] Primary keyword "trucking finance methodology" in title (existing
      title is fine), H1, first 100 words, and at least 4 H2s
- [ ] All new sections preserve the existing voice (direct, no fluff)
- [ ] Author byline added to Article schema
- [ ] Person schema validates clean at validator.schema.org
- [ ] All 10 FAQs (7 existing + 3 new) emit FAQPage JSON-LD
- [ ] Page-level lastReviewed date visible in footer block
- [ ] At least 3 external sources cited inline with publication date
- [ ] All cited URLs verified live before publication
- [ ] Reviewed against banned-filler list before merge

---

## Brief 4: Comparison content — Dispatched vs Lendio

### Meta

| Field | Value |
|-------|-------|
| Target URL | `/compare/dispatched-vs-lendio` (new route) |
| Page type | New (template — same template applies to vs Bluevine, vs Bobtail, vs Smarter Finance USA) |
| Primary keyword | dispatched vs lendio |
| Secondary keywords | trucking finance marketplace comparison, lender-paid trucking loans, lendio for trucking, trucking-specific lender marketplace |
| Search intent | Commercial / comparison |
| Word count target | 1,800–2,400 words |
| Owner (suggested) | Marketing |
| Priority | High |
| Effort | Half day per comparison; the template scales to 3+ more |

### Why this page

Comparison-stage searchers are commercial-intent traffic with much lower
competition than head terms. "Dispatched vs lendio" gets searched by
operators who already know both names exist — they are days from a funding
decision. The page captures that traffic, ranks for the long-tail
"competitor + dispatched," and feeds the brand SERP with controlled content
instead of letting third-party listicles dominate.

The honest framing matters. Lendio has 75+ lenders publicly named;
Dispatched has fewer. The honest case for Dispatched is vertical
specialization — trucking-specific underwriting beats raw lender count for
trucking-specific operators. A page that pretends Dispatched has more
lenders fails the sniff test. A page that names Lendio's strengths and
positions Dispatched on specialization wins long-term trust. The CTA links
to BOTH — losing a few clicks to Lendio is fine; honest comparison = trust =
better domain authority.

### Page outline

#### H1
Dispatched vs Lendio — which trucking-finance marketplace fits

#### Above the fold (first 100 words)
Two-sentence comparison summary plus a one-line recommendation rule of
thumb.

Suggested opener:

"Dispatched vs Lendio. Both are lender-marketplace platforms — fill out one
application, get matched with multiple lenders. Lendio is a generalist
small-business marketplace with 75+ lenders across every industry.
Dispatched is a trucking-specific marketplace where every lender on the
panel underwrites DOT, MC, and settlement statements instead of a generic
small-business template. The right choice depends on what you are funding
and how generalist underwriting handles your operation."

Above-the-fold CTA: dual link. "See your match on Dispatched" → `/apply`.
"Compare on Lendio" → lendio.com (with `rel="nofollow sponsored"` if no
affiliate relationship; just `rel="nofollow"` if there is one and a
disclosure is in place).

#### Section: Side-by-side comparison table

A single comparison table that handles the bulk of the comparison work.
Render as an actual table — readers scan tables more than prose.

| Dimension | Dispatched | Lendio |
|-----------|------------|--------|
| Founded | 2024 | 2011 |
| Headquarters | Wyoming (TCopyCats LLC) | Lehi, Utah |
| Lender panel size | [N — confirm before publication; substantially smaller] | 75+ |
| Industry specialization | Trucking only (owner-operators, small fleets) | Generalist small business |
| Trucking-specific underwriting (DOT, MC, settlement statements) | Yes — every lender | Some lenders, not all |
| Application time | Under 7 minutes | Under 15 minutes |
| Soft pull at qualification | Yes | Yes |
| Hard pull timing | Only after operator picks a lender | Only after operator picks a lender |
| FICO floor | 500 | 600 (varies by lender) |
| Working capital APR band | 14%–34% (panel observed) | Not publicly disclosed |
| Equipment loan APR band | 9%–18% (panel observed) | Not publicly disclosed |
| Working capital loan amounts | $25K–$250K | $1K–$500K |
| Equipment loan amounts | $20K–$200K | $5K–$5M |
| Repair loan product | Yes — same banking day funding | Via working capital only |
| Invoice factoring | Yes — trucking-specific factoring partners | Yes — generalist factoring partners |
| Insurance matching (commercial trucking) | Yes — via named producer partner | No |
| Time to funding (working capital) | Same banking day after lender sign-off | 24–72 hours typical |
| Fees to operator | None (lender-paid model) | None (lender-paid model) |
| Public lender list | [Pending — see lender panel page] | Yes — published |
| Customer reviews | [In progress — see /reviews] | 20,000+ on Trustpilot |

Note: every row marked "[]" needs the team to confirm the actual value
before publication. Do not invent. Where Dispatched has not yet shipped a
public number, write "[N — confirm before publication]" and ship after the
team fills it in.

#### Section: When to choose Dispatched
Three-bullet recommendation, each with a 60- to 100-word explanation.

- **Trucking-specific underwriting matters to your situation.** If you have
  sub-650 FICO with strong trucking revenue, a new MC authority, or
  specialty equipment that a generalist underwriter would auto-decline,
  Dispatched's trucking-only panel underwrites the trucking signals
  (settlement statements, DOT history, equipment class) that determine your
  actual risk. A generalist marketplace is more likely to route you to
  lenders that score you against a small-business template you do not fit.
- **You want one place for finance + insurance.** Dispatched routes both
  trucking finance and commercial trucking insurance. Lendio handles
  finance only — insurance shopping is a separate process. If you are
  setting up a new operation or refreshing both stacks at once, the
  one-application-two-products structure saves time.
- **Speed on a same-day funding need.** Dispatched's working-capital and
  repair-loan workflows are built around same-banking-day funding when the
  lender countersigns and the wire lands before cutoff. Lendio's working
  capital is faster than a bank but typically 24 to 72 hours rather than
  same-day for small-fleet operators.

#### Section: When to choose Lendio
Three-bullet recommendation. Honest. The page is not credible if Dispatched
"wins" every dimension.

- **You need a multi-product, multi-industry view.** If you operate
  trucking plus a separate non-trucking business, Lendio's generalist panel
  serves both ledgers. Dispatched is trucking-only.
- **Larger loan amounts (over $250K working capital, over $200K equipment).**
  Lendio's panel includes larger commercial lenders with higher loan-amount
  caps. Dispatched's published bands cap at $250K working capital and $200K
  equipment per loan. Operators needing $500K+ on a single loan should look
  at Lendio's panel.
- **You want the longest-running brand with the most public review volume.**
  Lendio has 13+ years of operating history and 20,000+ Trustpilot reviews.
  Dispatched is a newer brand with a growing review base. If the operator's
  decision is anchored on brand longevity and review volume, Lendio is the
  established choice.

#### Section: Methodology disclosure for this comparison
Single paragraph explaining how the data on the page was sourced.

Suggested copy:

"This comparison is sourced from Lendio's publicly disclosed product pages
(lendio.com/business-loans, /equipment-financing, /sba-loans) as of
[YYYY-MM-DD] and from Dispatched's published product and methodology pages.
Where Lendio does not publicly disclose a metric (APR bands, lender-specific
underwriting), the row is labeled accordingly rather than estimated. Where
Dispatched has not yet published a metric (lender panel count, customer
review count), the row points to the in-progress page where the metric will
appear. Both companies are invited to flag inaccuracies — corrections are
made within 1 business day and the change date is logged on the page."

#### Section: FAQ

1. **Q: Is Dispatched the same kind of company as Lendio?**
   A: Both are lender-marketplace platforms — operators submit one
   application and get matched with multiple lenders. Both use a
   lender-paid model where the operator pays nothing to apply or match. The
   difference is industry focus. Lendio is generalist across small
   business; Dispatched is trucking-only with every panel lender
   underwriting trucking-specific signals like DOT, MC, and settlement
   statements.

2. **Q: Does Lendio do trucking financing too?**
   A: Yes. Lendio offers working capital, equipment loans, and SBA loans
   that trucking operators use. The difference is that Lendio's lender
   panel is generalist — some panel lenders are trucking-friendly, others
   apply a small-business template that does not weight trucking-specific
   signals like DOT history or settlement-statement revenue. Dispatched's
   panel is trucking-only by design.

3. **Q: Which has lower rates — Dispatched or Lendio?**
   A: Neither company publishes a Lendio-specific APR comparison because
   the actual rate is set by the chosen lender on the term sheet, not by
   the marketplace. Dispatched's published panel observation is 14% to 34%
   APR for working capital and 9% to 18% APR for equipment loans, drawn
   from trailing-12-month funded-loan data. Lendio does not publish an
   equivalent panel-observed range, which makes head-to-head APR
   comparison structurally impossible.

4. **Q: Will applying to both hurt my credit?**
   A: Not the application itself. Both Dispatched and Lendio run a soft
   pull at the application step — soft inquiries are not visible to other
   lenders and do not affect your credit score. A hard pull from either
   platform only happens after you pick a specific lender and move forward
   on their term sheet. If you compare offers from both platforms, the hard
   pulls inside a 14-day rate-shopping window count as one inquiry on most
   scoring models.

5. **Q: Can I apply to both at the same time?**
   A: Yes. Both platforms run soft pulls at the application step, so
   applying to both is no more credit impact than applying to either one.
   Operators with time-sensitive funding needs sometimes apply to both and
   pick the term sheet that funds first. Just make sure not to e-sign with
   two lenders for the same dollars — that creates a debt-stacking issue
   the lenders flag during underwriting.

6. **Q: Does Dispatched have insurance? Does Lendio?**
   A: Dispatched matches commercial trucking insurance through a named
   producer partner — primary liability, motor truck cargo, physical
   damage, and the rest of the standard commercial-trucking stack. Lendio
   does not offer insurance. Operators who want both finance and insurance
   in one place fit Dispatched; operators who only need finance can use
   either platform.

7. **Q: Why does Dispatched have fewer lenders than Lendio?**
   A: Lendio is a generalist platform serving every small-business
   industry, so the panel is broad by design. Dispatched is
   trucking-specific — every lender on the panel underwrites trucking
   signals, which deliberately excludes generalist lenders that auto-decline
   common trucking profiles. Vertical specialization beats lender count for
   trucking-specific underwriting outcomes; raw count matters more for
   non-trucking operators.

#### Section: CTA

Dual CTA. Anchor 1: "See your match on Dispatched" → `/apply`. Anchor 2:
"Compare on Lendio" → lendio.com (with `rel="nofollow sponsored"` or
`rel="nofollow"` per affiliate relationship).

Tertiary CTA below the FAQ: "Check fit in two questions" → `/qualify`.

### Schema markup

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Dispatched vs Lendio — which trucking-finance marketplace fits",
      "description": "Side-by-side comparison of Dispatched and Lendio for trucking owner-operators and small fleets. Lender panel, underwriting, APR, and funding speed.",
      "url": "https://dispatched.finance/compare/dispatched-vs-lendio",
      "datePublished": "2026-XX-XX",
      "dateModified": "2026-XX-XX",
      "author": {
        "@type": "Organization",
        "name": "Dispatched"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Dispatched the same kind of company as Lendio?",
          "acceptedAnswer": { "@type": "Answer", "text": "..." }
        }
      ]
    }
  ]
}
```

Schema.org does not have a native "ComparisonTable" type. The HTML table
itself is fine — Google parses HTML tables for SERP table snippets. Do NOT
fabricate a `ComparisonTable` type that the spec does not define.

### Internal linking

| Link FROM (path) | Link TO (path) | Anchor text |
|------------------|----------------|-------------|
| `/lender-panel` | `/compare/dispatched-vs-lendio` | "How Dispatched compares to other marketplaces" |
| `/about` | `/compare/dispatched-vs-lendio` | "Comparison vs Lendio" |
| `/methodology` | `/compare/dispatched-vs-lendio` | "Comparison methodology" |
| Footer | `/compare/dispatched-vs-lendio` | "Compare to Lendio" |

| Link FROM (path) — outbound from this page | Link TO (path) | Anchor text |
|--------------------------------------------|----------------|-------------|
| `/compare/dispatched-vs-lendio` | `/apply` | "See your match on Dispatched" |
| `/compare/dispatched-vs-lendio` | https://lendio.com (rel=nofollow) | "Compare on Lendio" |
| `/compare/dispatched-vs-lendio` | `/qualify` | "Check fit in two questions" |
| `/compare/dispatched-vs-lendio` | `/lender-panel` | "the Dispatched lender panel" |
| `/compare/dispatched-vs-lendio` | `/methodology` | "How Dispatched calculates rate bands" |

### External sources to cite

| Source | URL | Use |
|--------|-----|-----|
| Lendio business loans page | https://www.lendio.com/business-loans/ | Anchor product-comparison rows for Lendio |
| Lendio equipment financing page | https://www.lendio.com/equipment-financing/ | Anchor equipment-loan rows for Lendio |
| Lendio Trustpilot profile | https://www.trustpilot.com/review/lendio.com | Anchor Lendio review-volume claim |
| Lendio about page | https://www.lendio.com/about/ | Anchor founding date and HQ |

### Template note — same structure for other comparisons

The same template applies to:

- `/compare/dispatched-vs-bluevine` — Bluevine angle is "bank-style working
  capital" vs trucking-specific underwriting
- `/compare/dispatched-vs-bobtail` — Bobtail angle is factoring-only vs
  full finance + insurance stack
- `/compare/dispatched-vs-smarter-finance-usa` — Smarter Finance USA angle
  is broker-to-broker vs direct lender panel

Each variant reuses the section structure, the schema, the FAQ pattern, and
the dual-CTA discipline. Swap the comparison-row data, the "when to choose"
positioning, and the cited URLs.

### Open decisions / dependencies

- Lendio panel-size disclosure — confirm Lendio's currently published
  lender count (the "75+" figure is from late-2025 Lendio marketing copy
  and may have changed).
- Affiliate relationship status — if Dispatched has an affiliate
  relationship with Lendio (or any competitor), the outbound link must
  carry `rel="sponsored"` and a disclosure must appear inline. If no
  affiliate relationship exists, `rel="nofollow"` suffices.
- Lender panel count for Dispatched (same blocker as Brief 1) — until the
  count is published, the comparison row reads "[smaller; trucking-only]"
  rather than a number.
- Founder approval on the "honest framing" — losing some clicks to Lendio
  in exchange for long-term trust is the right call but requires founder
  buy-in on day one.

### Acceptance criteria

- [ ] Word count 1,800–2,400
- [ ] Primary keyword "dispatched vs lendio" in title, H1, first 100 words,
      and at least 3 H2s
- [ ] Comparison table is an actual HTML table (not an image, not a list)
- [ ] Every "Lendio" claim in the table has a publicly-cited source
- [ ] Every "Dispatched" claim in the table matches the methodology page
      and per-page-copy doc
- [ ] CTA appears above the fold AND below the FAQ — both with the
      Lendio-and-Dispatched dual link
- [ ] Outbound Lendio link carries the correct `rel` attribute per
      affiliate status
- [ ] Article + FAQPage JSON-LD validates clean at validator.schema.org
- [ ] All cited Lendio URLs verified live within 24 hours of publication
- [ ] Mobile readability check — comparison table must reflow or scroll
      cleanly on a phone
- [ ] Reviewed against banned-filler list before merge

---

## Brief 5: State licensing disclosure expansion

### Meta

| Field | Value |
|-------|-------|
| Target URL | `/licenses` (existing — currently a placeholder) |
| Page type | Expansion of existing |
| Primary keyword | dispatched finance licensing |
| Secondary keywords | commercial loan broker license [state], dispatched finance state licenses, trucking finance broker licensing, NMLS dispatched |
| Search intent | Compliance verification / E-E-A-T / regulator-anchored trust |
| Word count target | 800–1,400 words plus the state table |
| Owner (suggested) | Legal counsel + Marketing |
| Priority | High (regulatory exposure) |
| Effort | Substantial — requires counsel review before publication |

### Why this page

Two reasons, both critical. First, the existing page says "registrations
pending" which is a YMYL trust hole — financial services pages without
explicit licensing disclosure trigger Google quality-rater concerns and
fail E-E-A-T sniff tests for AI engines that cite sources. Second, several
states (CA, NY, FL, IL, NV, ND, VT, others) require commercial loan brokers
to hold a specific license. Operating in those states without the license,
or without an explicit "we do not currently broker loans in [state]"
disclosure, is regulatory exposure the company should not be carrying.

This brief is the structural spec. The actual licensing facts MUST come from
counsel — the writer should not invent license numbers, status, or
jurisdictional applicability. The brief flags this throughout.

### Critical: counsel review required before publication

Every fact on this page is a regulatory representation. The writer
collaborates with counsel on every state row. The marketing team owns the
structure and the voice; counsel owns the facts. The page does not ship
without a counsel sign-off recorded in the page changelog.

### Page outline

#### Robots
**Important:** the existing page sets `robots: { index: false, follow: false }`.
Once the expanded page ships with real content and counsel sign-off, change
to `robots: { index: true, follow: true }`. A no-indexed licensing page
defeats the E-E-A-T purpose — search engines cannot cite a page they cannot
crawl.

#### H1
Dispatched state licensing and commercial loan broker registrations

#### Above the fold (first 100 words)
Two-sentence framing plus a one-line jump-to-table prompt.

Suggested opener:

"Dispatched (TCopyCats LLC, a Wyoming limited liability company) operates as
a lender-matching marketplace for commercial trucking financing and a
producer-partner referral platform for commercial trucking insurance. State
commercial-loan broker licensing requirements vary materially by state — the
table below lists Dispatched's status in each state where commercial loan
broker licensing is required, along with the issuing authority, license
number where applicable, and the operational status. Every fact on this
page is reviewed by counsel and updated within 14 days of any change."

#### Section: How to read this table
Single short paragraph defining each column.

- **State.** US state or territory.
- **Broker license required?** Whether the state requires a commercial loan
  broker license for the business model Dispatched operates. "Yes" / "No" /
  "Pending counsel review."
- **License number.** Issued license number, where Dispatched holds one.
  Empty when the license is not yet issued or not required.
- **Issuing authority.** State agency that issues the license (Department
  of Financial Institutions, Department of Business Oversight, etc.).
- **Status.** "Active" / "Pending" / "Not currently brokering in this
  state" / "Not required."
- **Last verified.** Date counsel last verified the row.

#### Section: State licensing table

A real HTML table — every row is a regulatory representation.

| State | Broker license required? | License number | Issuing authority | Status | Last verified |
|-------|--------------------------|----------------|-------------------|--------|---------------|
| AL | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| AK | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| AZ | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| AR | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| CA | Yes (CFL — California Financing Law) | [counsel] | California Department of Financial Protection and Innovation (DFPI) | [counsel] | YYYY-MM-DD |
| CO | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| CT | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| DE | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| FL | Yes (commercial loan broker registration) | [counsel] | Florida Office of Financial Regulation | [counsel] | YYYY-MM-DD |
| GA | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| HI | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| ID | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| IL | Yes (Illinois Loan Brokers Act) | [counsel] | Illinois Department of Financial and Professional Regulation | [counsel] | YYYY-MM-DD |
| IN | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| IA | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| KS | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| KY | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| LA | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| ME | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| MD | Yes (Credit Services Business Act) | [counsel] | Maryland Office of the Commissioner of Financial Regulation | [counsel] | YYYY-MM-DD |
| MA | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| MI | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| MN | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| MS | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| MO | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| MT | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| NE | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| NV | Yes (Mortgage Lending Division — commercial loan broker) | [counsel] | Nevada Department of Business and Industry | [counsel] | YYYY-MM-DD |
| NH | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| NJ | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| NM | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| NY | Yes (Department of Financial Services for certain structures) | [counsel] | New York Department of Financial Services | [counsel] | YYYY-MM-DD |
| NC | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| ND | Yes (Money Brokers Act) | [counsel] | North Dakota Department of Financial Institutions | [counsel] | YYYY-MM-DD |
| OH | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| OK | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| OR | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| PA | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| RI | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| SC | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| SD | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| TN | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| TX | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| UT | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| VT | Yes (Loan Solicitation Act) | [counsel] | Vermont Department of Financial Regulation | [counsel] | YYYY-MM-DD |
| VA | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| WA | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| WV | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| WI | [counsel] | — | — | [counsel] | YYYY-MM-DD |
| WY | Home state (LLC formation) | N/A — entity domicile | Wyoming Secretary of State | Active | YYYY-MM-DD |
| DC | [counsel] | — | — | [counsel] | YYYY-MM-DD |

States not listed (territories, etc.) — counsel to confirm whether
Dispatched's model requires registration in any US territory.

The "[counsel]" placeholders MUST be filled in by counsel before publication.
Do not ship the page with placeholder text. The states pre-populated as
"Yes" with the issuing authority are publicly-known commercial loan broker
licensing states — counsel still verifies.

#### Section: NMLS reference
Short paragraph addressing NMLS applicability.

Suggested copy:

"NMLS (Nationwide Multistate Licensing System) is the consolidated
licensing platform for residential mortgage and certain consumer-finance
licensees. Commercial trucking financing typically falls outside the NMLS
licensing scope because the loans are commercial-purpose, not
consumer-purpose. Dispatched does not hold an NMLS registration and is not
required to where its commercial-purpose lending falls outside NMLS
jurisdiction. If a state-specific commercial loan broker license is held,
its number is shown in the state table above."

Counsel verifies before publication.

#### Section: Surety bond information
Short paragraph plus a per-state bond table where applicable.

Several state commercial loan broker licenses require a surety bond
(typically $25K to $100K). The page should disclose:

- Which state licenses Dispatched holds that require a surety bond
- The bond amount and the surety company

Counsel provides the data; marketing renders the table.

| State | Bond amount | Surety company | Bond effective date |
|-------|-------------|----------------|---------------------|
| [counsel] | [counsel] | [counsel] | [counsel] |

#### Section: What Dispatched is and is not (for regulatory clarity)
Short paragraph mirroring methodology-page disclosure but framed for
regulators and partners.

Suggested copy:

"Dispatched is a commercial loan broker / matching platform. Dispatched is
not a direct lender — loans are originated and funded by the lenders on
the panel. Dispatched is not a direct insurer — insurance quotes route to a
named producer partner. Dispatched is not a money transmitter, a loan
servicer, or a credit reporting agency. Dispatched does not engage in
consumer-purpose lending. The borrowers Dispatched serves are commercial
operators (motor carriers, owner-operators, small fleets) and the loans
brokered are commercial-purpose."

#### Section: How to verify a license
Single paragraph on how operators or regulators can verify the licenses
listed.

Suggested copy:

"Each issuing authority listed in the table above maintains a public
licensee search. To verify a Dispatched license, search for "TCopyCats LLC"
or "Dispatched" on the issuing authority's licensee lookup. The state-by-state
links to each licensee lookup are below. Operators or regulators who find a
discrepancy between the table and the public lookup should email
[counsel-confirmed contact address] — corrections are made within 1
business day and the correction date is logged on this page."

Linked-list of state licensee lookups (counsel verifies each URL).

#### Section: Updates and corrections
Short paragraph plus the page changelog.

Suggested copy:

"This page is reviewed quarterly and updated within 14 days of any state
licensing change — license issuance, license renewal, change of issuing
authority, or change of bond amount. The full change history is below."

Page changelog block:

- [YYYY-MM-DD]: Initial publication after counsel review.
- [Subsequent dates]: Each change listed with state, dimension changed, and
  the date of counsel sign-off.

#### Section: FAQ

1. **Q: Does Dispatched need a license to broker trucking loans in my state?**
   A: It depends on the state. Several states require a commercial loan
   broker license — California, Florida, Illinois, Maryland, Nevada, New
   York, North Dakota, Vermont, and others. The state-by-state table above
   lists Dispatched's status in each state with the issuing authority,
   license number where applicable, and the date counsel last verified the
   row. Where a license is not required, the row is marked accordingly.

2. **Q: Is Dispatched registered with the NMLS?**
   A: No. NMLS is the consolidated licensing platform for residential
   mortgage and certain consumer-finance licensees. Dispatched brokers
   commercial-purpose loans to motor carriers, owner-operators, and small
   fleets, which falls outside the typical NMLS licensing scope.
   State-specific commercial loan broker licenses are held where required
   and listed in the table above.

3. **Q: How do I verify a Dispatched license?**
   A: Each issuing authority listed in the licensing table maintains a
   public licensee search. Search for "TCopyCats LLC" or "Dispatched" on
   the issuing authority's licensee lookup. The lookup URLs are linked
   below the table. Discrepancies between this page and the public lookup
   should be reported to the counsel-confirmed contact address — corrections
   are made within 1 business day.

4. **Q: What happens if I am in a state where Dispatched is not currently licensed?**
   A: If a state requires a commercial loan broker license that Dispatched
   does not hold, Dispatched does not broker loans for operators in that
   state. The application step screens for state of operation; operators
   in unlicensed states are notified at the soft-pull step rather than
   matched with a lender. The licensing table is the source of truth for
   which states are currently active.

5. **Q: Who do I contact about a licensing question?**
   A: For licensing questions, email the counsel-confirmed contact address
   listed below the licensing table. For general business questions, email
   the support address listed on the contact page. State regulators with
   inquiries about Dispatched's licensing status are encouraged to contact
   counsel directly at the address listed below the table.

6. **Q: Is this page updated when a license changes?**
   A: Yes, within 14 days of any change. The page is reviewed quarterly
   regardless of whether a change has occurred, and the page-level
   last-reviewed date is shown in the footer. The full change history is
   logged in the changelog below the FAQ — every license issuance,
   renewal, or status change is recorded with the date of counsel
   sign-off.

#### Section: CTA
Single CTA. Anchor: "Contact us" → `/contact` (or the support phone number
listed elsewhere on the site, currently (307) 317-0801).

This page is not a conversion page — the CTA is a contact link for
licensing-specific questions, not a "get matched" CTA. Resist the urge to
push `/apply` here; it conflicts with the page's regulatory-trust purpose.

### Schema markup

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Dispatched state licensing and commercial loan broker registrations",
      "description": "State-by-state licensing disclosure for Dispatched (TCopyCats LLC), the trucking-finance lender-matching marketplace.",
      "url": "https://dispatched.finance/licenses",
      "datePublished": "2026-XX-XX",
      "dateModified": "2026-XX-XX",
      "publisher": {
        "@type": "Organization",
        "name": "Dispatched",
        "legalName": "TCopyCats LLC",
        "url": "https://dispatched.finance"
      }
    },
    {
      "@type": "Organization",
      "name": "Dispatched",
      "legalName": "TCopyCats LLC",
      "url": "https://dispatched.finance",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US",
        "addressRegion": "WY"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Wyoming LLC formation",
          "credentialCategory": "Business registration",
          "recognizedBy": {
            "@type": "GovernmentOrganization",
            "name": "Wyoming Secretary of State"
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does Dispatched need a license to broker trucking loans in my state?",
          "acceptedAnswer": { "@type": "Answer", "text": "..." }
        }
      ]
    }
  ]
}
```

The `hasCredential` array can be extended with one block per state license
once issued. `GovernmentService` is not the right type for this page —
GovernmentService describes a service offered BY a government, not a
business's licensing relationship with one. Article + Organization +
FAQPage is the right combination.

### Internal linking

| Link FROM (path) | Link TO (path) | Anchor text |
|------------------|----------------|-------------|
| Footer (legal column) | `/licenses` | "Licenses" (existing) |
| `/disclosures` | `/licenses` | "State licensing" |
| `/methodology` | `/licenses` | "State licensing disclosure" |
| `/about` | `/licenses` | "Licensing" |
| `/lender-panel` | `/licenses` | "state licensing" |

| Link FROM (path) — outbound from this page | Link TO (path) | Anchor text |
|--------------------------------------------|----------------|-------------|
| `/licenses` | `/contact` | "Contact us" |
| `/licenses` | (each state issuing authority's licensee lookup) | "Verify on [authority] licensee search" |
| `/licenses` | `/methodology` | "Methodology" |
| `/licenses` | `/disclosures` | "Compensation disclosures" |

### External sources to cite

| Source | URL | Use |
|--------|-----|-----|
| California DFPI — California Financing Law | https://dfpi.ca.gov/california-financing-law/ | Cite for CA licensing requirement |
| Florida OFR — commercial loan broker registration | https://flofr.gov/ | Cite for FL registration requirement |
| Illinois IDFPR — Loan Brokers Act | https://idfpr.illinois.gov/ | Cite for IL licensing requirement |
| Maryland DLLR — Credit Services Business Act | https://dllr.maryland.gov/finance/ | Cite for MD requirement |
| North Dakota DFI — Money Brokers Act | https://www.nd.gov/dfi/ | Cite for ND requirement |
| Nevada DBI — Mortgage Lending Division | https://mld.nv.gov/ | Cite for NV requirement |
| New York DFS | https://www.dfs.ny.gov/ | Cite for NY requirement |
| Vermont DFR — Loan Solicitation Act | https://dfr.vermont.gov/ | Cite for VT requirement |
| Conference of State Bank Supervisors — state licensing index | https://www.csbs.org/ | Cite as the umbrella reference for state-by-state licensing |
| Wyoming Secretary of State — entity search | https://wyobiz.wyo.gov/Business/FilingSearch.aspx | Verify TCopyCats LLC entity status |

Counsel verifies each URL is current at publication time.

### Open decisions / dependencies

- **Counsel sign-off is a hard prerequisite.** Marketing should NOT publish
  this page without explicit counsel sign-off recorded in the page
  changelog. The brief structure can ship; the facts cannot.
- Counsel-confirmed contact address for licensing inquiries — needed before
  publication.
- States where Dispatched intentionally does not broker loans — counsel and
  ops decide whether to list those explicitly ("Not currently brokering in
  this state") or implicitly (no license = no brokering).
- Surety bond information per state — depends on which licenses are
  actually held at publication time.
- Whether the application's state-screening logic is consistent with the
  table — eng confirms the application screens for state and gates
  accordingly. If not, that is a pre-publication blocker.
- Robots directive change from `noindex` to `index` — confirm with marketing
  and counsel before flipping. The page is only valuable indexed.

### Acceptance criteria

- [ ] Counsel sign-off recorded in the page changelog before publication
- [ ] Zero `[counsel]` placeholders remaining in the published table
- [ ] Word count 800–1,400 (excluding the table)
- [ ] Primary keyword "dispatched finance licensing" in title, H1, first
      100 words, and at least 2 H2s
- [ ] Robots metadata changed from `noindex, nofollow` to `index, follow`
- [ ] State table is an actual HTML table, not an image
- [ ] Every state row has a "last verified" date
- [ ] Each issuing authority links to the public licensee search for that
      authority
- [ ] Surety bond table populated where bonds are held
- [ ] Article + Organization + FAQPage JSON-LD validates clean at
      validator.schema.org
- [ ] All external regulator URLs verified live within 24 hours of
      publication
- [ ] Page changelog includes initial publication entry with counsel
      sign-off date
- [ ] CTA links to `/contact` (not `/apply`) — this is a regulatory page,
      not a conversion page
- [ ] Reviewed against banned-filler list before merge
