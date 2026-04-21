# Build

Pointer folder. Real code lives at `~/Code/dispatched.finance` locally and `github.com/aondaai/dispatched-intake` remote.

## Stack
Next 16 / React 19 / Tailwind 4 / XState v5 / Zod v4 / Vitest. Deploy on Render.com (manual first deploy, auto from `main` after).

## Pre-commit gate
`npm run typecheck && npm run test && npm run build`

## This folder holds
- Build specs (`handoff_prompt_intake.md`, `handoff_prompt_geo.md`)
- Logic references (`match_logic_tiers.md`)
- Plans per workstream under `plans/`
