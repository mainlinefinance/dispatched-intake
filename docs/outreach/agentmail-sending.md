# Sending the six-month sequence through AgentMail

_Last updated 2026-11-10._

## Decision and risk

On 2026-11-10 the account owner chose to send the carrier sequence through
AgentMail, starting at low volume, rather than through Instantly and Google
Workspace.

**Know the risk before every run:**
- AgentMail's terms (section 8(h)) and its policy page "Can my agent send
  cold outreach?" say AgentMail does not support cold outreach, including
  "prospects from a scraped or purchased list, or an automated sales
  sequence."
- The terms allow AgentMail to suspend the account.
- Every inbox in the organization (Avenstead, Black Puzzle, jeb.guru, the
  Dispatched domains) would go down with it.

**Ways to reduce the risk:**
- Ask support@agentmail.cc to confirm the use case in writing (the policy page
  invites this).
- Or move the Dispatched domains to a separate AgentMail account.

The emails themselves follow CAN-SPAM:
- an honest sender and subject;
- the postal address and an opt-out in every email;
- a mailto `List-Unsubscribe` header;
- where we found the address;
- opt-outs honored the same day.

The playbook's other hard rules still apply: no calls or texts, US only, no
California.

## How it works

Two commands, run once per weekday:

```bash
npm run outreach:render -- --in outreach-data/instantly-m6-icp1-2026-11-10.csv \
  --send-plan --sender Angelo --address "<postal address>"
```

```bash
npm run outreach:agentmail -- --plan outreach-data/send-plan.json \
  --inboxes angelo@trydispatched.com,angelo@dispatchedfunding.com,angelo@getdisppatched.com --send
```

The first command builds `send-plan.json`: every carrier's three emails,
rendered from `docs/outreach/instantly-campaign.md`. It refuses to run without
`--address` and `--sender`.

The second command (`scripts/agentmail-outreach.ts`) is the sequencer.
**Without `--send` it only reports what it would do.** Each run it:

1. **Reads its own state from AgentMail.** Sent messages carry the labels
   `m6`, `m6-step-N` and `dot-<USDOT>`, so a fresh container picks up where
   the last run stopped. No local state is needed.
2. **Handles replies.** It reads replies in the campaign threads, or new emails
   from campaign carriers that arrive after their first email.
   - Any reply stops that carrier's sequence, except an out-of-office.
   - Replies are labelled `m6-reply` and `intent-<yes|stop|factoring|other>`.
   - `stop` (including "not interested" and List-Unsubscribe emails) also goes
     on the organization's send block list.
3. **Checks inbox health.** It reads each inbox's AgentMail metrics. One spam
   complaint, or a bounce rate over 3% once 20 emails have gone out, pauses
   that inbox.
4. **Sends.**
   - Follow-ups go first: step 2 three days after step 1, then step 3 five days
     after step 2. Each is a reply in the same thread, from the same inbox, to
     the carrier.
   - Then new carriers, spread across inboxes.
   - At most `--cap` emails per inbox per day (default 5), weekdays only,
     counted in Chicago time.
   - AgentMail itself refuses addresses that bounced, complained or are
     blocked; the runner logs those as `rejected`.
5. **Writes a report** to `outreach-data/agentmail-run-<date>.json`, which is
   gitignored.

## Volume

| Week | `--cap` | 3 inboxes per day |
|---|---|---|
| 1 | 5 | 15 |
| 2 | 10 | 30 |
| 3+ | 15 | 45 |

Raise the cap only when, over the previous week:
- there are no spam complaints;
- bounces are under 3%;
- replies come in at 1–2% or better.

## Replies that need a person

- **`intent-yes`:** answer the same day with the funding readout.
- **`intent-factoring`:** send the factoring comparison (`/factoring-vs-mca`).
- **`intent-other`:** read it and decide.

Each reply's labels and text are in the run report and in the AgentMail
console.

## Testing without real carriers

`--as-of YYYY-MM-DD` pretends the run happens on that local date, so a plan
aimed at your own test inbox can go through every step in minutes. Use a
separate `--campaign` label (e.g. `smoke`) so test sends never mix with `m6`.

This was run end to end on 2026-11-10 between two test inboxes:
- step 1, then step 2 three simulated days later, in the same thread;
- a "stop" reply was classified, the carrier was blocked, and step 3 was not
  sent;
- a repeat run changed nothing.

A send from `angelo@trydispatched.com` arrived with our `List-Unsubscribe`
header and passed SPF, DKIM and DMARC.
