# 2026-04-21 — Intake Flow Plan

Snapshot of the active Claude Code plan for the intake build. Updated at each checkpoint boundary.

## Current checkpoint: 2 (in progress)
Pure logic with tests green. No UI.

- [x] `estimateMatch` — tier rules, Vitest coverage
- [x] `copy.ts` — vertical-aware string tables
- [ ] `validation.ts` — Zod v4 schemas per screen
- [ ] XState v5 machine — state diagram matches intake design bundle exactly

## Exit criteria for Checkpoint 2
- `npm run typecheck` green
- `npm run test` green, ≥90% coverage on pure logic
- `npm run build` green
- Machine compiles and accepts the full happy-path event sequence for each vertical variant

## Next: Checkpoint 3 — screens 1–4 wired
Do not start until the machine passes all variant happy-paths.

## Risks to flag on
- Vertical copy variants drifting from the design state diagram. Catch in review by diffing `copy.ts` keys against the diagram.
- Zod schemas relaxing validation to pass tests. Catch by reviewing schemas against screen-by-screen requirements.
