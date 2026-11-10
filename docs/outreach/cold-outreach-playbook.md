# Cold outreach playbook

_Last updated 2026-11-10._

Dispatched is a referral partner of Big Think Capital (BTC): the `/apply` widget
sends applications to BTC, and Dispatched is paid when a loan funds. This
playbook decides who we email, what we offer, and what we never do. It
combines three inputs:

1. A full read of bigthinkcapital.com: core pages, product pages, the
   partner site and 803 articles.
2. An analysis of 233 of BTC's 3,287 Trustpilot reviews.
3. A cold email framework: map one customer, start from an intent list, ask
   for a yes, build the asset after the yes, protect the infrastructure, scale
   only when the yes rate holds.

## 1. What we learned

### From BTC's site: what they fund

Minimums published on BTC's product pages:

| Product | Credit score | Time in business | Revenue |
|---|---|---|---|
| Working capital | 550 | 6 months | $10K/month in deposits; at most one open cash advance |
| Line of credit | 600 | 6 months (12 for >$50K) | $10K/month |
| Equipment | 580 | 6 months | $100K/year plus a dealer quote |
| Term loan | 600 | 12 months | $100K/year |
| Invoice factoring | none | 3 months | $25–50K/month of B2B invoices |
| SBA | 640 | 2 years | $100K/year |

**Six months of authority is the line.** Below it, BTC funds almost nothing for
a carrier. That is why our trigger is the six-month anniversary, not the
grant date.

BTC's own site has zero pages about trucking, fleets or freight. 64% of its
803 articles are near-duplicate posts about Fed rates and inflation. Trucking
is open ground.

### From BTC's reviews: who borrows and why they get angry

**Read this as hints, not statistics.** The sample is 233 of 3,287 reviews,
98% are 5★, BTC asks every customer to review, and only about 150 say
anything about the borrower.

**Who borrows:**

| Profile | What it means for us |
|---|---|
| Repeat working-capital / cash-advance borrower ("third loan", "4 or more") | Biggest repeat pool. A pitch to refinance their advance into fixed payments is clear (BTC's term-loan page lists this as a use). |
| Short on cash and in a hurry ("in a bind") | Urgent. Takes expensive money, complains about cost later. Show the full cost up front. |
| Turned down elsewhere, new or thin credit | Our six-month carriers. Their bank said no. |
| Nervous first-timer ("wasn't sure how business financing works") | Clear explanation is the most-praised trait (~34 of 146 five-star reviews). The readout is that explanation. |
| Larger, structured deals (SBA, HELOC, acquisition) | Rare. Not a cold email target. |

Trucking was named 3 times. Amounts mentioned ran from $8K to $80K. Five-star
reviews are driven by fast funding, one rep who answers seven days a week,
and a rep who negotiated better terms.

**Why people leave 1–3★ reviews:**

1. **Unwanted marketing (~12 of 43).** Spam, mailers dressed up as "renewal
   notices", contact without consent, a spoofed phone number.
2. **Hidden price and fees (~15 of 87 non-5★).** Fees revealed after approval,
   "$16K approved but $14.6K deposited", daily withdrawals starting the next
   day.
3. **Approvals that shrink.** A $20K "soft approval" became $8K, then a
   decline.
4. **Paperwork asked for again and again,** plus a broken upload portal.
5. **No credit building.** Six reviewers wanted payments reported to business
   credit bureaus. No competitor in the reviews offers it.

**The opening for us is simple: be the opposite of every 1★ review.** Our
cold email is relevant, honest about cost, and easy to stop.

## 2. Who we email

Two tracks run in parallel.

### Track A: carriers at a milestone (direct borrowers)

**Source.** FMCSA open data: authority grant dates joined to the Company
Census File. It is free, public and updated daily. Run:

```bash
npm run outreach:cohort
```

The script writes `outreach-data/fmcsa-cohort-<from>_<to>.csv`, which is
gitignored. Behind an HTTPS proxy, set `NODE_USE_ENV_PROXY=1`. See the header
of `scripts/fmcsa-cohort.ts` for flags.

**What the script keeps:**
- For-hire property carriers whose authority turned six months old in the
  window, still active
- US physical address, with California excluded (BTC's terms)
- 1–10 trucks
- A usable email address

**What it drops:**
- Addresses shared by more than 2 USDOT numbers
- Business domains shared by more than 3 carriers in the cohort, which are
  filing services

**The output has no phone column, on purpose.**

**Tiers:**

| Tier | Who | Fits | Volume (run on 2026-11-10) |
|---|---|---|---|
| ICP-1 | 2–10 trucks, 6 months of authority | Working capital, line of credit, equipment | 692 crossed in the last 30 days; 202 cross in the next 30 |
| ICP-2 | 1 truck, 6 months of authority | Working capital, if deposits reach $10K/month | 2,732 last 30 days; 781 next 30 |
| ICP-3 | Under 6 months | Factoring partners now, BTC later | Not emailed. Picked up automatically when they cross month 6. |
| 12-month | Any of the above at one year (`--months 12`) | Term loans, including refinancing an existing advance | Phase 2 |

85% of the cohort uses free-mail addresses (mostly Gmail). That sets the
deliverability rules in section 6.

Next-30-day volume is low because FMCSA recorded fewer grants around its May
2026 switch to the Motus registration system. Grants recover from August
2026, so cohorts grow again from February 2027.

**Start with ICP-1.** They have more revenue, are more fundable, and the list
is small enough to learn from.

### Track B: heavy-duty repair shops (referral partners)

This is true B2B and the closest fit to the framework. A shop has a driver
with a five-figure invoice who can't pay. Financing gets the shop paid and the
truck back on the road.

**Source:** Google Maps listings of heavy-duty truck repair shops (e.g.
scraped with Apify) in two or three freight metros. Start with
Dallas–Fort Worth.

Before sharing any commission with shops, check the BTC partner agreement. No
referral bonuses in California.

## 3. The offer: the highest rung we can deliver

We can't promise a loan, because BTC decides. So the ladder is:

**For carriers:** funded deal → soft-pull match → **funding readout** →
calculator result. Start at the readout.

**For shops:** a driver who paid their invoice → **a financing page with the
shop's name on it** → a counter flyer. Start at the shop page.

### The funding readout (built after the yes)

The readout is one page per carrier, answering every 1★ complaint before it
happens:

- **What carriers at their stage typically qualify for,** from lenders'
  published minimums (the table above). Not an approval, and it says so.
- **The full cost for a worked example.** Net amount deposited after fees,
  total payback, and how often payments come out. For example: a $30K advance
  at a 1.30 factor rate repaid weekly over six months is $39K back, about 26
  payments of $1,500.
- **What the lender will ask for:** 3–6 months of bank statements, ID, voided
  check. Ask once.
- **That approvals can come in lower than the estimate,** and why.
- **Waiting on brokers?** A factoring comparison instead of a loan.
- **A link to `/apply` with their answers prefilled.** `lib/quickStart.ts`
  already reads `monthlyRevenue` and `timeInBusiness` from the URL. UTM
  parameters ride along to the BTC lead (#124).

Readout and shop pages are personal: `noindex`, and never linked from the
site.

**Never write "pre-approved", "guaranteed" or speed promises.** "Pre-approved"
is the wording in the robocall BTC was sued over. Speed claims were removed
from the site for Google Ads policy (#123).

## 4. The emails

The rules:
- Email 1 asks for a yes, never a call.
- The first few words carry the email on a phone screen.
- Plain text, no link in email 1, no PS.
- Spintax the static words.
- At most two follow-ups, and stop on any reply.

### Track A: carrier at six months

**Email 1**
> Subject: {legal_name} at 6 months
>
> {legal_name}'s authority turned 6 months old on {six_month_date}. That's
> usually the minimum time in business for working capital and equipment
> financing.
>
> Want a one-page readout of what carriers at your stage typically qualify
> for, including what actually lands in your account and what comes out each
> week? Yes or no works.
>
> {sender}, Dispatched

**Follow-up 1 (day 3–4): the full-cost angle**
> Most carriers find out the real cost after approval. A $16,000 advance can
> land as $14,600 once fees come out. The readout shows the net amount, total
> payback and payment schedule before anyone asks for bank statements. Want
> it?

**Follow-up 2 (day 8–10, last): the factoring branch**
> Last note from me. If what's tight is waiting 30+ days on brokers,
> factoring usually fits better than a loan. Want our factoring comparison
> instead?

**ICP-1 variant line for email 1:** "…and the point where adding a truck
through equipment financing starts to make sense."

### Track B: repair shop

**Email 1**
> When a driver can't cover a five-figure repair, does the truck sit in your
> lot?
>
> We'll build a financing page with {shop_name} on it that drivers can use at
> your counter, so they can pay you from the funds. Want one? Yes or no.

**Follow-up 1**
> The page also shows the driver what lands in their account and what they'll
> pay back, so nobody comes back angry about fees. Want one for {shop_name}?

### Required footer (every email, including follow-ups)

> Dispatched, Inc. · {postal address}
> You're receiving this because {legal_name} is listed in FMCSA's public
> carrier registry. Dispatched is a business financing marketplace. Reply
> "stop" and we won't email you again.

The federal email law (CAN-SPAM) requires a postal address, a working opt-out
honored within 10 business days, and an honest subject. Saying where we found
the address answers "how did you get my email" before it becomes a 1★ review.

## 5. Hard rules

Each rule comes from a 1★ review, a lawsuit or a regulation.

| Never | Why |
|---|---|
| Call or text numbers from the FMCSA file | Many are cell phones. Autodialed calls or texts without written consent are what BTC's two class actions (2021, 2022) were about. Texting only after an explicit opt-in that names Dispatched. |
| Send mailers dressed as notices, or spoof caller ID | Top 1★ complaint about BTC. |
| Contact Trustpilot reviewers | No consent (TCPA), against Trustpilot's terms, and it repeats what reviewers complain about. Reach these profiles with ads and content. |
| Target on names, demographics or neighborhoods | Fair-lending risk under the Equal Credit Opportunity Act (ECOA, Regulation B). Target on business traits only: authority age, truck count, cargo, state, revenue. The FMCSA cohort uses only those. |
| Email outside the US | Canada's anti-spam law (CASL) needs prior consent. The script drops non-US addresses. |
| Email California carriers for BTC products | BTC: no referral bonuses in CA; CA loans go only to licensed brokers. |
| Name Big Think Capital in cold email | Unless the partner agreement allows it. Speak as Dispatched. |
| Claim credit building | Unless BTC confirms which network lenders report to business credit bureaus. |
| Send from dispatched.finance | That domain carries SEO, Google Ads and lead notifications. |

## 6. Infrastructure

### Phase 1 setup: 4 domains, 8 inboxes

| Piece | Choice | Cost (checked Nov 2026) |
|---|---|---|
| Sending domains | 4 `.com` lookalikes of the brand (e.g. getdispatched.com, trydispatched.com). No hyphens or numbers. Each one 301-redirects to dispatched.finance. | Registrar price, roughly $10–15/year each |
| Inboxes | Google Workspace Business Starter, 2 users per domain = 8 | $8.40/user/month flexible, $7 annual; a 50%-off intro is running |
| Sequencer + warm-up | A small plan on Instantly, Smartlead or PlusVibe (PlusVibe: $37/month for 25,000 emails) | Tens of dollars a month |
| Later | EmailBison ($599/month for 500,000 emails, dedicated IPs) once volume passes ~25–50K emails/month | Not for phase 1 |
| Verification | MillionVerifier or NeverBounce, pay as you go | Small |
| Domain health | Peeker, plus Google Postmaster Tools (free) | — |

**Put the sending domains in their own Google Workspace account,** not the one
that hosts dispatched.finance mail. If Google suspends a cold email account,
your real inbox and lead notifications stay up. One account can hold all four
sending domains (one primary, three secondary).

**Use real people as senders.** CAN-SPAM requires an accurate From name, and
BTC's 1★ reviews complain about spoofing. For example, "{first name} at Dispatched",
not an invented persona.

### DNS for each sending domain

| Record | Host | Value |
|---|---|---|
| MX | `@` | `smtp.google.com` (priority 1) |
| SPF (TXT) | `@` | `v=spf1 include:_spf.google.com ~all` |
| DKIM (TXT) | `google._domainkey` | Generated in Admin console → Apps → Google Workspace → Gmail → Authenticate email (2048-bit), then click Start authentication |
| DMARC (TXT) | `_dmarc` | `v=DMARC1; p=none; rua=mailto:<reports address>`. Move to `p=quarantine` after 3–4 clean weeks. |
| Postmaster (TXT) | `@` | Verification string from postmaster.google.com |
| Redirect | `@`, `www` | 301 to https://dispatched.finance |

Check each domain once DNS has propagated:

```bash
for d in getdispatched.com trydispatched.com; do
  echo "== $d"; dig +short MX "$d"; dig +short TXT "$d"
  dig +short TXT "google._domainkey.$d"; dig +short TXT "_dmarc.$d"
done
```

Also confirm dispatched.finance has its own SPF, DKIM and DMARC for its
transactional mail. It never sends cold email.

### Sequencer settings

We use Instantly. The import file builder, the copy in Instantly's syntax
and the exact campaign settings are in
[instantly-campaign.md](./instantly-campaign.md).

- Connect all 8 inboxes and **turn warm-up on immediately. Leave it on for as
  long as you send cold email.**
- **Turn open and click tracking off.** Pixels and rewritten links hurt
  delivery, and email 1 has no link anyway. Replies are the metric.
- Plain text, sent on weekday mornings in the recipient's time zone.
- Stop the sequence on any reply.
- One global suppression list. A "stop" reply is suppressed the same day; the
  law allows 10 business days, we don't need them. Turn on a one-click
  unsubscribe header if the tool supports it.
- Custom variables come straight from the cohort CSV: `legal_name`,
  `six_month_date`, `tier`, `state`.
- **Labels in the shared inbox:** `yes`, `not-now`, `factoring`, `stop`,
  `wrong-contact`. Answer `yes` the same day.

### Ramp

| Week | Cold sends per inbox per day | 8 inboxes per day | Per week |
|---|---|---|---|
| 1–2 | 0 (warm-up only) | 0 | 0 |
| 3 | 5 | 40 | 200 |
| 4 | 10 | 80 | 400 |
| 5+ | 15 | 120 | 600 |

Before the first cold send, run one inbox placement test (built into most
sequencers, or GlockApps).

Add domains in pairs when the scale gates in section 8 pass. Start warming
replacement domains in month 2. Microsoft inboxes (under 5/day each) are an
option later to spread risk, not a phase 1 need.

```
inboxes = (carriers per week × emails per carrier) ÷ (5 days × 15 per inbox per day)
```

### Lists and limits

**Verify before every import.** Use MillionVerifier or NeverBounce. For the
first sends, import only addresses that come back as valid; drop catch-all,
unknown and invalid. The FMCSA form is refiled only every two years, so
expect stale addresses.

**Gmail is the binding limit.** 85% of the cohort is on free mail. Google asks
senders to keep spam complaints under 0.1%, which is 1 per 1,000 emails, and
never reach 0.3%. Small, tight batches beat volume.

**Postal address.** The CAN-SPAM footer needs a real postal address. A P.O.
box registered with USPS, or a private mailbox registered with a commercial
mail receiving agency, both qualify.

## 7. Where the yes lands: intake changes

These come from the review analysis and are tracked as a separate PR. They
make the destination match the emails' promise.

1. **Ask about existing daily or weekly payments.** This finds the repeat
   advance borrower, the refinance pitch, and BTC's one-open-advance limit.
2. **Ask how soon they need the money.** This separates urgent borrowers from
   shoppers.
3. **Ask if they're waiting on payment from shippers or brokers.** If so,
   route to factoring (`/factoring-vs-mca` already exists).
4. **Ask if they want this to build business credit.** Route to reporting
   lenders once BTC confirms which ones report.
5. **Show the full cost before asking for contact details.** That means net
   amount deposited, total payback and payment frequency. Today the match
   card shows APR only (`components/match/MatchCard.tsx`).

Also split the hero's "Under $20,000" revenue option at $10K (BTC's floor).
Send under-6-month answers to factoring instead of the BTC widget.

## 8. Measurement and scale gates

Funnel per segment and per sending domain:

```
delivered → reply → yes → readout opened → /apply started
→ widget submitted → BTC accepted (#124 event) → funded (partner portal)
```

| Signal | Threshold | Action |
|---|---|---|
| Reply rate | Under 1–2% | Fix the list or the copy. Don't add volume. |
| Spam complaints | 0.1% or more | Pause that domain. Tighten the list. |
| Bounces | Over 2% | Re-verify the list. |
| Funded per 1,000 emails | Holds for 2+ batches | Add inboxes and the next tier. |

Tag cold email links with
`utm_source=cold-email&utm_campaign={track}-{tier}` so they reach the BTC
lead. Ask BTC for a funded-deal export to close the loop.

## 9. First 30 days

**Week 1:**
- Ask BTC the open questions below.
- Buy 4 sending domains and set up 8 inboxes and DNS (section 6).
- Connect the sequencer and start warm-up.
- Verify the ICP-1 list.
- Write the footer with the real postal address.

**Week 2:**
- Pull 200 repair shops (DFW first).
- Draft the readout by hand for one sample carrier, to fix the format before
  any yes arrives.

**Week 3:**
- First cold sends at 5 per inbox per day (40/day across 8 inboxes), rising
  to 15 by week 5.
- The first 300 ICP-1 carriers and 100 shops go out over weeks 3–4, with
  follow-ups after.
- Answer every yes the same day; Claude drafts each readout from the carrier
  row.

**Week 4:**
- Read the numbers against the gates.
- After the third yes, turn the readout and `/partners/{shop}` into templates
  in the app.
- Decide whether ICP-2 starts.

**Every Monday after launch:**

```bash
npm run outreach:cohort -- --from <last Monday> --to <yesterday>
```

This picks up the carriers who crossed six months that week.

## 10. Open questions for BTC

1. Does the partner agreement allow cold email by partners? Is there required
   wording? May we name BTC?
2. Which lenders in the network report payments to business credit bureaus?
3. Can fees (origination, broker) be shown before a soft offer, so readout
   numbers match what borrowers see?
4. Can we get a funded-deal export from the partner portal? It's needed for
   Google Ads offline conversions and cold email attribution.
5. What does BTC actually accept from one-truck carriers at six months? Is the
   $10K/month deposit floor firm?
