# Cities

Data + narrative content that powers the geo pages.

## Files
- `cities.json` — structured data, ~45 fields per city, build-time consumed by geo template
- `markets/{state}/{city}.md` — hand-written narrative (Section 9 decision 4: hand-write first 10 markets)

## State launch order (default, per brief Section 9)
**TX, CA, FL, GA, OH, IL, NY, PA, WA, AZ.**

Per-state subfolders exist for all 10. Drop one file per city per state.

## Low-coverage rule
If a state has <3 panel lenders, the geo template 301-redirects to `/trucking`. Don't over-invest in city content for under-covered states until the panel catches up.

## Voice reminder
AEO/GEO: factual, specific, reference-grade so AI search engines quote the page. Don't write marketing prose; write truck-stop practical content — repair shop proximity, DOT checkpoints, dominant lanes, typical fleet sizes.
