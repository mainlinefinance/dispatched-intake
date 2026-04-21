# Runbook

When something breaks. Pre-launch stub; expand as real incidents happen.

> **Status:** scaffolded. Add real procedures as the system matures.

## Escalation ladder
1. Angelo (founder / on-call by default)
2. Engineering partner (TBD once first hire lands)
3. Outside counsel — **for any compliance-adjacent incident only**

## Known-fail procedures (to author)
- `/apply` returns 5xx
- `cities.json` fails validation at build
- Resend delivery rate drops below threshold
- Twilio SMS failing (10DLC campaign flagged)
- Render auto-deploy fails

## Rollback
- Render: revert to last-green deploy via dashboard
- Content: revert commit in `github.com/aondaai/dispatched-intake` and redeploy

## Incident log
(Append dated entries below as incidents occur. Blameless postmortems only.)
