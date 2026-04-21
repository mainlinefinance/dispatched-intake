# Match Logic — Tier A / B / C

Documents the deterministic `estimateMatch` function used pre-lender-integration. Inputs: vertical + revenue band + time in business + amount + credit band. Outputs: lender count, $ range, APR range, timing.

> **Status:** placeholder. Paste the tiering rules from the current Claude Code handoff here so non-engineers (compliance, copywriter, founder) can read them without opening the repo.

## Why this file exists separately from the repo
- Compliance review needs to see the tiers without reading TypeScript.
- Copy needs to be consistent between match-preview strings and APR-range claims on landing pages. One source of truth.
- Lender partner conversations reference these tiers.

## Tiers to document
- **Tier A:** (fill) — best-fit bank/SBA-adjacent profile
- **Tier B:** (fill) — alt-lender prime
- **Tier C:** (fill) — sub-prime / higher-APR alternative-capital

## Output contract
```ts
{
  lenderCount: number,        // how many lenders would route
  amountMin: number,          // e.g., 25000
  amountMax: number,          // e.g., 250000
  aprMin: number,             // e.g., 12
  aprMax: number,             // e.g., 38
  timingMin: 'hours' | 'days',
  timingMax: 'hours' | 'days',
  timingMinValue: number,     // e.g., 24
  timingMaxValue: number,     // e.g., 48
}
```
(Tighten once the real contract is pasted from the handoff.)
