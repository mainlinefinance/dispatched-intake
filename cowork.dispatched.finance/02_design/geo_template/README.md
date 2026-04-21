# Geo Template — `/trucking-loans/{state}/{city}/`

One template, ~45 variables per URL, populated from `cities.json` at build. Handoff bundle ready. Status: converged.

## What goes here
- Regenerated HTML bundle of the geo template
- `cities.json` schema definition (the data contract)
- Three example fills already done: Houston/TX, Jacksonville/FL, Fresno/CA
- Low-coverage fallback rule documentation: if state has <3 panel lenders, 301-redirect to `/trucking`

## Pairs with
- `/05_content/cities/cities.json` — the data source
- `/05_content/cities/markets/{state}/{city}.md` — hand-written city content blocks
- `/03_build/handoff_prompt_geo.md` — Claude Code build spec

## Do not
- Add variables without updating the `cities.json` schema and all existing city entries.
