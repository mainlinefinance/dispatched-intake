# Instantly campaign: carriers at six months

_Last updated 2026-11-10._

This is the setup for Track A of the [cold outreach playbook](./cold-outreach-playbook.md)
in Instantly. One campaign covers both tiers. A Liquid condition adds the
fleet line for carriers with 2–10 trucks.

## 1. Build the import file

```bash
npm run outreach:cohort
npm run outreach:instantly -- --in outreach-data/fmcsa-cohort-<from>_<to>.csv --limit 300
```

The second command writes `outreach-data/instantly-m6-icp1-<date>.csv`. It
contains:
- 2–10-truck carriers, newest six-month anniversaries first
- only carriers whose anniversary has already passed
- nobody on `outreach-data/suppression.csv`

Optional flags:
- `--verified <file>`: keep only addresses a MillionVerifier or NeverBounce
  export marks deliverable.
- `--tier ICP-1,ICP-2`: add one-truck carriers once the gates pass.

Before uploading, scan the Company Name column. A few three-letter initials
that contain a vowel read as words ("Atr Transport"); fix those by hand.

## 2. Upload (Campaign → Leads → Upload CSV)

| Column | Map to | Use in copy as |
|---|---|---|
| Email | Email (predefined, required) | — |
| Company Name | Company name (predefined) | `{{companyName}}` |
| Location | Location (predefined) | — |
| Six_Month_Date | Custom variable | `{{Six_Month_Date}}`, e.g. "November 3" |
| Tier | Custom variable | Liquid condition |
| Trucks, Email_Type, DOT_Number, MC_Docket, Authority_Date, Cargo, Officer | Custom variable | Not in copy. Used for reply handling and the readout. |

Upload settings:
- **Check for duplicates: on.** Leads already in another campaign are
  skipped.
- **Verify leads: on,** unless the file was built with `--verified`. It costs
  0.25 Instantly credits per lead, so 75 credits for 300 leads.

## 3. Sequence

Variables are case-sensitive. Replace `[POSTAL ADDRESS]` before launch; the
footer is legally required on every step.

### Step 1 (day 0)

Subject:
```
{{RANDOM | {{companyName}} at 6 months | your authority at 6 months | 6 months of authority}}
```

Body:
```
{{RANDOM | The MC authority for {{companyName}} | The operating authority for {{companyName}}}} turned 6 months old on {{Six_Month_Date}}. {{RANDOM | That's usually | That's typically | For most lenders, that's}} the minimum time in business for working capital and equipment financing{% if Tier == "ICP-1" %}, and {{RANDOM | the point where | when}} adding a truck through equipment financing starts to make sense{% endif %}.

{{RANDOM | Want | Should I send | Would it help to see}} a one-page readout of what carriers at your stage typically qualify for, including what {{RANDOM | actually lands | lands}} in your account and what comes out each week? {{RANDOM | Yes or no works. | A yes or no is fine. | Just reply yes or no.}}

{{sendingAccountFirstName}}
Dispatched

--
Dispatched, Inc. · [POSTAL ADDRESS]
You're getting this because {{companyName}} is listed in FMCSA's public carrier registry. Dispatched is a business financing marketplace. Reply "stop" and we won't email you again.
```

### Step 2 (wait 3 days, same thread, leave the subject empty)

```
{{RANDOM | Most carriers find out the real cost after approval. | The real cost usually shows up after approval.}} A $16,000 advance can land as $14,600 once fees come out. The readout shows the net amount, total payback and payment schedule {{RANDOM | before anyone asks for bank statements. | before you send a single bank statement.}}

{{RANDOM | Want it? | Should I send it? | Worth a look?}}

{{sendingAccountFirstName}}

--
Dispatched, Inc. · [POSTAL ADDRESS]
You're getting this because {{companyName}} is listed in FMCSA's public carrier registry. Dispatched is a business financing marketplace. Reply "stop" and we won't email you again.
```

### Step 3 (wait 5 days, same thread, last one)

```
{{RANDOM | Last note from me. | I'll leave it here.}} If what's tight is waiting 30+ days on brokers, factoring usually fits better than a loan. {{RANDOM | Want our factoring comparison instead? | Should I send the factoring comparison instead?}}

{{sendingAccountFirstName}}

--
Dispatched, Inc. · [POSTAL ADDRESS]
You're getting this because {{companyName}} is listed in FMCSA's public carrier registry. Dispatched is a business financing marketplace. Reply "stop" and we won't email you again.
```

**No links in any step.** The "yes" reply is the conversion. Never write
"pre-approved", "guaranteed", or speed promises.

### Preview before launch (Preview → Load data for lead)

1. Load a lead with Tier `ICP-1` and check that the fleet line appears.
2. Load an `ICP-2` lead (a test row is fine) and check that the line
   disappears cleanly, ending in "…equipment financing."
3. Refresh a few times to see the spintax variants.
4. Confirm `{{sendingAccountFirstName}}` renders. If it doesn't, put the
   sender's first name in each account's signature instead.
5. Send a test to yourself and run the deliverability score check.

## 4. Campaign settings

**Schedule:**
- Monday to Friday, 8:00–11:30, America/Chicago.
- That covers Eastern mid-morning and Mountain early morning. California is
  excluded from the list anyway.

**Sending accounts:**
- All 8 inboxes.
- Daily limit per account: 5 in week 3, 10 in week 4, 15 from week 5.
- Campaign daily limit to match: 40, then 80, then 120.

**Options:**
- Stop sending on reply: **on**.
- Open tracking: **off**.
- Link tracking: **off**.
- Plain text / text-only: **on**, if offered.
- Unsubscribe header: **on**, if offered.
- If there's a choice, let follow-ups go out before new leads.

**Warm-up:** stays on for every account, permanently.

## 5. Replies (Unibox)

| Reply | Label | Action |
|---|---|---|
| Yes / send it | Interested | Same day: build the readout from DOT_Number and MC_Docket (Claude drafts it from the carrier row) and reply with it. |
| Not now / later | Not now | Note the reason. Re-contact only if they asked. |
| Waiting on brokers | Factoring | Send the factoring comparison (`/factoring-vs-mca`). |
| Stop / remove / unsubscribe | Stop | Add to Instantly's global blocklist and append to `outreach-data/suppression.csv` the same day. |
| Not the owner / wrong person | Wrong contact | Ask for the right contact once, or drop. |

## 6. Next batches

Send the next 300 from the same cohort, skipping everyone already imported:

```bash
npm run outreach:instantly -- --in outreach-data/fmcsa-cohort-2026-10-11_2026-11-10.csv --limit 300 \
  --suppress outreach-data/instantly-m6-icp1-2026-11-10.csv \
  --out outreach-data/instantly-m6-icp1-batch2.csv
```

Every Monday, pull the carriers who crossed six months that week:

```bash
npm run outreach:cohort -- --from <last Monday> --to <yesterday>
```

Then build an import file from it with every earlier import file passed as
`--suppress`.
