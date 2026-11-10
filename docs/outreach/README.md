# FMCSA outbound email

Cold email to US carriers listed in the public FMCSA census, sent through
AgentMail. Three kits (owner-operator, new authority, small fleet), four
steps each: an opener and follow-ups on day 3, 7 and 14 in the same thread.

| Piece | Where |
|---|---|
| Copy for every step | `lib/outreach/kits.ts` |
| HTML + text rendering, legal footer, UTM tags | `lib/outreach/render.ts` |
| Census row to lead, filters, segments | `lib/outreach/fmcsa.ts` |
| Daily plan (follow-ups, caps, inbox assignment) | `lib/outreach/schedule.ts` |
| Unsubscribe page and one-click endpoint | `app/api/outreach/unsubscribe` |
| Bounce / complaint / opt-out reply webhook | `app/api/outreach/webhook` |
| Scripts | `scripts/outreach/` |

## Review the kits

```bash
npm run outreach:preview
```

Writes all 12 emails in both layouts to `data/outreach/preview/index.html`.
`plain` reads like a typed email and is the default for cold sends.
`branded` uses the site's paper background, card and trail-green button.
Neither loads images or tracking pixels.

To change copy, edit `kits.ts`. `tests/outreach-kits.test.ts` fails on the
claims the site removed in the Google Ads compliance pass: speed promises,
approval promises, rates or dollar figures, and "we lend".

## Sequence

| Step | Day | Owner-operator | New authority | Small fleet |
|---|---|---|---|---|
| 1 | 0 | Intro, `/apply` | Intro, `/new-authority-truck-financing` | Intro, `/apply` |
| 2 | 3 | Repair angle, `/truck-repair-loans` | Factoring explained, `/factoring` | Equipment, `/equipment-financing` |
| 3 | 7 | P&L calculator | Factoring fee calculator | Lease vs. buy calculator |
| 4 | 14 | Close-out | Close-out | Close-out |

A reply of any kind ends the sequence for that lead. Segments: added to the
census in the last 12 months is `new-authority`; otherwise one power unit is
`owner-operator` and two to ten is `small-fleet`. Larger fleets are skipped.

## Setup

1. **Domains.** Buy separate sending domains. Do not send cold email from
   `dispatched.finance`: a spam-rate problem there would take the site's
   transactional and support mail down with it. Add each domain in
   AgentMail with `feedbackEnabled: true`, publish the SPF, DKIM and DMARC
   records it returns, and verify.
2. **Inboxes.** Create inboxes on those domains and list their ids in
   `OUTREACH_INBOXES`.
3. **Web service env** (Render): `AGENTMAIL_API_KEY`,
   `OUTREACH_UNSUBSCRIBE_SECRET`, `AGENTMAIL_WEBHOOK_SECRET`.
4. **Webhook.** In AgentMail, create a webhook to
   `https://dispatched.finance/api/outreach/webhook` for `message.bounced`,
   `message.complained` and `message.received`.
5. **List.** Download the FMCSA company census CSV, then:

   ```bash
   npm run outreach:import -- path/to/census.csv --mx
   ```

   Run `data/outreach/leads.ndjson` through a mailbox verifier before
   sending. Census emails are years old; an unverified list will pass the
   bounce limit on the first day.
6. **Send.** Once per sending day, from a machine that keeps
   `data/outreach/` between runs (the state file is the only record of who
   is at which step):

   ```bash
   npm run outreach:send            # dry run, prints the plan
   npm run outreach:send -- --live
   ```

## Suppression

Unsubscribes, hard bounces, spam complaints and replies such as "remove
me" all add the address to AgentMail's organization block list for the
`send` direction. The sender treats a rejected send as final. Every
suppression is also logged as `[outreach suppress]` in the web service log.

Each email carries `List-Unsubscribe` and `List-Unsubscribe-Post` headers
(RFC 8058 one-click), a footer link, and a "reply to stop" line.

## Volume

15,000 emails a day is a target to ramp to, not a starting setting.

- With four steps, steady state is about 3,750 new leads a day and 11,250
  follow-ups, or roughly 80,000 new verified leads a month.
- The common cold-email ceiling is 30 to 50 sends per inbox per day and a
  few inboxes per domain. At 30 per inbox that is 500 inboxes.
- Gmail and Yahoo require bulk senders to authenticate with SPF, DKIM and
  DMARC, support one-click unsubscribe, and stay under a 0.3% spam
  complaint rate. Many owner-operators in the census use Gmail and Yahoo
  addresses. The sender stops at 0.1% complaints or 2% bounces by default.

Suggested ramp, raising `OUTREACH_DAILY_CAP` only while both rates stay
under the limits: week 1 at 10 per inbox, week 2 at 20, week 3 onward at
30, adding inboxes and domains to grow the total.

## Not yet verified

The AgentMail documentation was not reachable when this was built, so the
integration was written against the SDK's types (`agentmail` 0.5.53).
Confirm with AgentMail before the first live run:

- Their acceptable-use policy on cold outreach, and the plan limits for
  daily sends, inbox count and custom domains at this volume.
- That custom `List-Unsubscribe` headers are passed through unchanged.
- That an organization `send` / `block` list entry rejects sends to that
  address, and the status code of the rejection (the sender treats
  `MessageRejectedError` or 403 as "suppressed").
- The exact `type` strings on bounce events; the webhook keeps an address
  only when the type reads as transient, temporary or soft.

## Compliance notes

Not legal advice; have counsel review before sending.

- CAN-SPAM allows unsolicited B2B email with accurate headers, honest
  subjects, a postal address, and a working opt-out honored within 10
  business days. The footer and suppression flow cover these.
- Only US carriers are imported. Canadian carriers in the census fall
  under CASL, which requires consent.
- Email only. Census phone numbers are not used; calls and texts fall
  under the TCPA.
