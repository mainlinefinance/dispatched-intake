# Intake Flow — `/apply`

AI Capital Advisor. 8-screen conversational funnel. Mobile-first. Vertical-aware copy variants (trucking / small fleet / contractor / other trade). Soft match preview before contact capture.

## What goes here
- Claude Design PDF export of the full 8-screen flow
- Handoff bundle for Claude Code (this is the build spec authoritative for screens)
- State diagram for vertical personalization (Screen 2 branch)
- Live-prototype assets: typing indicators, count-up animation spec, tap-through nav

## Build status (as of 2026-04-21)
Checkpoint 2 in progress in Claude Code: pure logic with tests green — `estimateMatch`, `copy.ts`, `validation.ts` (Zod v4), XState v5 machine. No UI yet.

## Do not
- Guess vertical copy variants. Refer to the state diagram.
- Deviate from the XState v5 machine in `/src/lib/machine.ts` (code repo).
