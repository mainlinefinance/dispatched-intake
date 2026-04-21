# Geo Template — Claude Code Handoff Prompt

The canonical build spec for `/trucking-loans/{state}/{city}/`. Second Claude Code project after intake.

> **Status:** placeholder. Paste the handoff prompt here.

## Expected sections
1. Scope: template + data pipeline only (no intake, no submit)
2. `cities.json` schema — 45 variable contract
3. Static generation strategy (Next 16 generateStaticParams / ISR policy)
4. Token substitution rules (escape + fallback behavior per field)
5. Low-coverage fallback: if state has <3 panel lenders, 301 to `/trucking`
6. SEO hygiene: canonical URLs, hreflang (future), schema.org LocalBusiness + Service, OG tags
7. AEO/GEO writing rules: specific, factual, quotable by ChatGPT/Perplexity/Claude/Gemini
8. Build-time validation: fail the build if any city entry has missing required fields

## Pairs with
- `/02_design/geo_template/` — visual design
- `/05_content/cities/cities.json` — data
- `/05_content/cities/markets/{state}/{city}.md` — narrative content
