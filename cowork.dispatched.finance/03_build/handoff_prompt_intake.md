# Intake Flow — Claude Code Handoff Prompt

The canonical build spec for the `/apply` intake flow. Authoritative for the engineer or Claude Code session implementing it.

> **Status:** placeholder. Paste the handoff prompt that's driving Checkpoint 1–5 here.

## Expected sections
1. Scope boundary (what's in / out)
2. Stack + conventions
3. Checkpoint sequence (1 scaffold → 2 pure logic → 3 screens 1–4 → 4 screens 5–8 + submit stub → 5 polish + /healthz + README)
4. XState v5 machine contract (`/src/lib/machine.ts`)
5. `estimateMatch` specification (Tier A/B/C → lender count, $ range, APR range, timing)
6. Copy rules (vertical variants; no deviation without updating state diagram)
7. Validation rules (Zod v4 schemas)
8. Submit stub contract (`/api/intake/submit`)
9. Accessibility checklist (WCAG 2.1 AA)
10. Test coverage expectation (Vitest: 100% of pure logic, smoke on screens)

## Checkpoint status (as of 2026-04-21)
- [x] Checkpoint 1: scaffold + tokens + `render.yaml` + `/` returns 200
- [ ] Checkpoint 2: pure logic tests green (**in progress**)
- [ ] Checkpoint 3: screens 1–4 wired
- [ ] Checkpoint 4: screens 5–8 + count-up + data-flow strip + stub submit
- [ ] Checkpoint 5: desktop trust rail + a11y + `/healthz` + README
