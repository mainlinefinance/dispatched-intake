# UDAAP Review Notes

Findings from the compliance-persona critique pass on the landing page. Consolidated list of what's already been hardened against UDAAP (unfair, deceptive, abusive acts or practices) and what the outside counsel will still need to bless.

## Already hardened (from brief Section 6)
- **No "up to $250K in 24 hours."** Replaced with **"$25K–$250K, typically funded in 24–48 hours."**
- **APR range shown wherever a dollar range appears.** Hero, match preview, proof cards, FAQ.
- **Methodology footnotes on every stat.** "Funded volume measured as originated principal, 90-day rolling, excludes renewals; median time measured from completed application to first wire."
- **No "bank decline is a positive" reframe.** Replaced with mechanism-first explanation (DSCR, Schedule C, ELD miles).
- **Data-flow transparency component** on landing, geo, and match preview pages. Shows what Dispatched sees, what matched lenders see, when the hard pull happens.
- **No FICO scores on proof cards.**
- **No placeholder license numbers** (no `60DBO-XXXXX`).
- **No countdown timers, no fake urgency.**

## Still to be reviewed by counsel
- Every page of the intake flow (Screens 1–8) — copy-level pass
- Email sequence templates once drafted
- SMS consent wording (TCPA)
- Lender match-preview edge cases (what do we show when only 1 lender matches? when 0?)
- State-specific disclosures on geo pages (CA SB 1235, NY CFDL)

## House rule
No APR or timing claim ships to production without a trail back to this file. New claims get added here with the methodology footnote before the page goes live.
