# Analytics Setup

PostHog is the default per Section 9 decision 3 — self-hostable, generous free tier, ships fast.

> **Status:** to configure. Capture the installation + event taxonomy here once wired.

## Event taxonomy (draft, expand as intake solidifies)

### Intake flow
- `intake_started` — Screen 1 rendered
- `intake_screen_advance` — per screen, with screen number + vertical
- `intake_back` — per screen (measures hesitation)
- `intake_abandoned` — last-screen + session-duration + vertical (for SMS recovery)
- `intake_match_preview_shown`
- `intake_submit_succeeded` (with `leadId`)
- `intake_submit_failed` (with error class)

### Landing / geo
- `landing_view` (page, vertical, geo)
- `cta_click` (cta id)

## Privacy rules
- Mask all PII in PostHog (email, phone, SSN-adjacent) — use event properties, not identifiable user traits
- No session replay until Section 9 decision 7 is made and privacy policy discloses it

## Pairs with
- `/06_operations/vendors.md` — PostHog account + key storage
- `/04_compliance/privacy_policy_draft.md` — disclosure obligations
