# Per-page SEO copy — dispatched.finance

Source of truth for page metadata (titles, descriptions) and FAQPage JSON-LD content.
Engineering reads from this doc when wiring `export const metadata` and `<JsonLd payload={faqPage(...)} />` per page.

When this doc and the live site diverge, this doc is the spec — open a PR against this file, then engineering ships the page-side change.

## How to use this doc

- Title and description go into Next.js `Metadata` exports (`title`, `description`, `openGraph.title`, `openGraph.description`, `twitter.title`, `twitter.description`).
- FAQ Q&As feed `faqPage([...])` JSON-LD blocks. Both the visible FAQ section (if present on page) and the schema MUST use the SAME text — see the homepage `components/landing/FAQ.tsx` for the visible-FAQ pattern and `app/trucking-working-capital/page.tsx` for the JSON-LD pattern already in production.
- Primary + secondary keywords are guidance for content writers extending each page; not literal meta keywords (which Google ignores).
- Char counts in this doc count every character including spaces and punctuation, but exclude the surrounding backticks used for display.
- All FAQ answers are plain prose. No markdown, no inline links, no code spans — schema.org Answer.text must be plain text.

---

## 1. Homepage — `/`

**Primary keyword:** trucking financing
**Secondary keywords:** working capital for truckers, owner-operator financing, commercial trucking insurance, truck loan matching
**Search intent:** Brand discovery + navigation to money pages. Most visits land here from brand search or referral; the page must route to /apply, /qualify, and the per-product money pages without friction.

### Title (52 chars)
`Truck financing matched to your numbers — Dispatched`

### Description (150 chars)
`Match with trucking-friendly lenders for working capital, repair loans, equipment financing, and insurance. Soft pull, no impact to credit. Apply now.`

### Open Graph + Twitter
Use title + description above. og:type = website.

### FAQs
Homepage already ships 6 FAQs in `components/landing/FAQ.tsx` (the visible FAQ accordion). When/if homepage FAQPage JSON-LD is added, it MUST mirror the question and plain-text answer from that file — do not duplicate or fork the wording here.

The 6 questions currently shipped are:
1. What rates can I actually expect?
2. What documents do I need?
3. What credit score do I need?
4. How fast is fast, really?
5. What happens after I apply?
6. Will this hurt my credit?

Engineering note: when wiring FAQPage JSON-LD on `/`, extract plain-text equivalents of the React answers in `FAQ.tsx` (strip JSX, replace `<code>` with the inner text, replace `<a>` with the surrounding sentence). Track that work in a separate ticket — this doc covers the per-page copy spec, not the homepage FAQ refactor.

---

## 2. Trucking working capital — `/trucking-working-capital`

**Primary keyword:** trucking working capital
**Secondary keywords:** working capital loan for truckers, fuel and payroll loan, owner-operator cash flow loan, slow-month bridge financing
**Search intent:** Owner-operator or small-fleet operator who needs cash to cover fuel, payroll, insurance premium, or a slow-month gap. Comparing working capital vs. factoring vs. credit cards.

### Title (59 chars)
`Trucking working capital — fuel & payroll fast | Dispatched`

### Description (151 chars)
`Working capital for trucking: $25K–$250K to cover fuel, payroll, tolls, and slow-month gaps. Soft-pull match, funds same banking day. Apply in minutes.`

### FAQs

1. **Q: How fast can I get a trucking working capital loan?**
   A: Soft approval and lender match typically come back within 20 minutes of finishing the application. Funds hit your account the same banking day after the chosen lender countersigns, provided the wire instruction lands before that bank's cutoff. Wires that miss the cutoff settle the next banking day; weekend and federal-holiday wires settle the next banking day. We do not publish a median time-to-funds figure until the data layer can derive it from real signed-application and ACH-settled funding events.

2. **Q: What can I use a trucking working capital loan for?**
   A: Anything operational. Fuel, driver payroll, tolls, insurance premiums, broker fees, IFTA, IRP, factoring fees, repair deductibles, and bridging slow months between dedicated lanes are all common uses. Working-capital lines on the Dispatched panel do not restrict use of funds at the line-item level — the lender underwrites the operation's ability to repay, and the proceeds are flexible.

3. **Q: How is working capital different from invoice factoring?**
   A: Working capital is a loan you pay back from operations over time; factoring is selling specific outstanding invoices for an immediate cash advance. Working capital costs more in APR but gives you cash that is not tied to specific receivables and does not require notifying the broker or shipper. Factoring settles in days rather than weeks but eats into the margin on every invoice you sell. Different cost structures for different cashflow problems.

4. **Q: What APR can I expect on a trucking working capital loan?**
   A: The observed panel range is 14% to 34% APR for working capital. The exact APR depends on credit band, time in business, monthly revenue, and the chosen lender's underwriting. Higher credit bands and longer operating histories quote toward the lower end; sub-580 borrowers quote toward the high end. You see the exact APR, term length, and total cost on the term sheet before signing.

5. **Q: How much can a trucking operation borrow?**
   A: The published range is $25K to $250K for the working capital product. Actual approval depends on monthly revenue, time in business, credit band, and lender underwriting. Some operators qualify for less than $25K or more than $250K via separate products not shown on the landing page. The application step asks the questions a lender needs to size the offer accurately.

6. **Q: Can I use working capital to pay off a higher-rate loan?**
   A: Yes. Refinancing higher-cost debt is a common use case on the Dispatched panel, particularly for borrowers consolidating multiple short-term cash advances into a single working-capital line at a lower blended cost. The application step asks about existing obligations so the lender can underwrite the consolidation accurately.

7. **Q: Will applying for working capital hurt my credit?**
   A: Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. If you compare offers from multiple lenders, hard pulls inside a 14-day rate-shopping window count as one inquiry on most scoring models.

8. **Q: What documents do I need for a working capital loan?**
   A: Three months of business bank statements, your EIN or SSN, DOT number, and a driver's license. For loan amounts above $75K the chosen lender will also ask for the most recent Schedule C or 1120 and current settlement statements from your carrier or broker. No business plan, no tax preparer letter, no IFTA printouts unless a specific lender requests them.

---

## 3. Truck repair loans — `/truck-repair-loans`

**Primary keyword:** truck repair loan
**Secondary keywords:** semi truck repair financing, emergency truck repair loan, owner-operator repair financing, repair loan bad credit
**Search intent:** Truck is down, shop quote in hand, operator is searching from a phone in a parking lot. Wants money today, not a 30-day approval cycle.

### Title (50 chars)
`Truck repair loans — same-day funding | Dispatched`

### Description (144 chars)
`Truck down? Get matched with repair lenders for $5K–$150K in same-banking-day funds. Soft pull, FICO from 500. Apply now or call (307) 317-0801.`

### FAQs

1. **Q: How fast can I get a truck repair loan?**
   A: Soft approval and lender match typically come back within 20 minutes of submitting the application. Funds hit your account the same banking day after the chosen lender countersigns, provided the wire lands before that bank's cutoff. If you apply after cutoff or on a weekend, funds settle the next banking day. The Dispatched workflow is built around the case where the truck is already at the shop and the operator needs the wire today.

2. **Q: How much can I borrow for a truck repair?**
   A: The repair-loan band on the Dispatched panel is $5K to $150K. The right amount is normally the shop's written estimate plus a 15% buffer for parts that show up as the job opens up. Lenders underwrite based on revenue, deposit history, and equipment type — not a hard ceiling tied to the repair cost itself. Larger jobs that include an engine or transmission rebuild routinely fund at the upper end.

3. **Q: Can I get a truck repair loan with bad credit?**
   A: Yes. Programs route from a 500 FICO. Most banks decline below 650 because they underwrite on credit alone; the Dispatched panel underwrites on revenue, DSCR, equipment, and deposit history first, with FICO second. Sub-580 borrowers should expect rates toward the high end of the 14% to 34% APR working-capital range and tighter loan amounts.

4. **Q: Do I need a quote from the shop before applying?**
   A: No. You can apply with an estimated repair cost and refine the amount once the shop sends the written quote. The chosen lender funds the approved amount to your business account, and you pay the shop directly — Dispatched does not pay shops on the operator's behalf, and lenders do not require the invoice to be assigned to them.

5. **Q: What APR should I expect on a truck repair loan?**
   A: The observed panel range is 14% to 34% APR for working-capital-style repair loans, and 9% to 18% APR when the repair is rolled into an equipment-secured product on a tractor with sufficient remaining value. The exact APR depends on credit band, time in business, monthly revenue, and lender underwriting. You see the exact APR, term, and total cost on the term sheet before signing.

6. **Q: Can I finance a repair on a truck I am still paying off?**
   A: Yes. The repair loan is an unsecured working-capital advance against the operation's revenue, not a lien against the truck itself. Existing financing on the tractor does not block the repair loan, though the chosen lender will ask about monthly debt service when sizing the offer.

7. **Q: Will applying for a truck repair loan hurt my credit?**
   A: Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your score. A hard pull only happens after you pick a specific lender and move forward on their term sheet.

---

## 4. Equipment financing — `/equipment-financing`

**Primary keyword:** trucking equipment financing
**Secondary keywords:** truck equipment loan, trailer financing, commercial truck equipment loan, equipment loan bad credit
**Search intent:** Operator buying a tractor, trailer, reefer unit, lift gate, or other titled equipment and comparing equipment financing vs. dealer financing vs. cash.

### Title (51 chars)
`Trucking equipment financing 9–18% APR | Dispatched`

### Description (153 chars)
`Equipment loans for tractors, trailers, reefers, and lift gates. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match. Get matched today.`

### FAQs

1. **Q: What can I finance with a trucking equipment loan?**
   A: Any titled commercial vehicle or attached equipment used in the operation. Tractors, day cabs, sleepers, dry vans, reefers, flatbeds, dump trailers, lowboys, lift gates, APUs, and on-board reefer units all qualify. The lender takes a first-position lien on the financed asset, and the asset's market value supports a longer term and a lower APR than working capital.

2. **Q: What APR should I expect on a trucking equipment loan?**
   A: The observed panel range is 9% to 18% APR for equipment loans secured by the financed asset. APR depends on credit band, age and mileage of the equipment, term length, and down payment. New equipment with a higher down payment and a 600+ FICO quotes toward the low end; older equipment, no down payment, or sub-580 FICO quotes toward the high end.

3. **Q: How much down payment do I need on an equipment loan?**
   A: Most equipment loans on the Dispatched panel fund with 10% to 20% down. Programs exist for zero-down and first-payment-deferred structures depending on the asset, the operator's revenue history, and the lender. Higher down payments lower the APR and shorten the term needed to keep the monthly payment manageable.

4. **Q: Can I get equipment financing with bad credit?**
   A: Yes. Programs route from a 500 FICO. Equipment loans are easier to underwrite at lower credit bands than working capital because the lender holds collateral on the asset. Sub-580 borrowers should expect a higher APR, a larger down payment requirement, and a shorter maximum term, but approval rates are higher than on unsecured products.

5. **Q: How long are typical trucking equipment loan terms?**
   A: Terms run 24 to 72 months for tractors and 24 to 60 months for trailers. Newer equipment supports the longer end; equipment over five years old typically caps at 48 months. The lender sets the maximum term based on the asset's expected residual value at payoff — a 2018 tractor financed in 2026 will not stretch to 72 months.

6. **Q: Can I finance used equipment from a private seller?**
   A: Yes, with conditions. The lender requires a clean title, a current inspection (DOT or independent), and a bill of sale that matches the appraised value. Private-party sales close more slowly than dealer sales because the lender needs the title pulled and the lien recorded before funds release. Plan for an extra 3 to 5 banking days versus a dealer transaction.

7. **Q: Will applying for equipment financing hurt my credit?**
   A: Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your score. A hard pull only happens after you pick a specific lender and move forward on their term sheet.

---

## 5. Semi-truck financing — `/semi-truck-financing`

**Primary keyword:** semi truck financing
**Secondary keywords:** Class 8 truck loan, semi truck loan bad credit, used semi truck financing, owner-operator semi financing
**Search intent:** Operator buying a Class 8 tractor (Freightliner, Peterbilt, Kenworth, Volvo, International, Mack), comparing dealer financing vs. an outside loan.

### Title (55 chars)
`Semi truck financing — Class 8 truck loans | Dispatched`

### Description (153 chars)
`Class 8 semi truck loans for owner-operators and small fleets. Panel APR 9%–18%, terms to 72 months, FICO from 500. Soft-pull match. See your rate today.`

### FAQs

1. **Q: How much can I borrow for a semi truck?**
   A: Loans on the Dispatched panel for Class 8 tractors typically range from $40K for older sleeper trucks to $200K for newer day cabs and premium sleepers. The amount is set by the truck's appraised value, the down payment, and the operator's revenue. Lenders fund up to the appraised value minus down payment; they do not finance over-market sticker prices.

2. **Q: What APR should I expect on a semi truck loan?**
   A: The observed equipment-loan panel range is 9% to 18% APR for tractors. Newer trucks (under 5 years), 600+ FICO, and a 15%+ down payment quote toward the low end. Trucks over 8 years old, sub-580 FICO, or zero-down structures quote toward the high end. The exact APR is on the term sheet before you sign.

3. **Q: Can I get semi truck financing with bad credit?**
   A: Yes. Programs route from a 500 FICO. The truck itself is collateral, so lenders on the Dispatched panel underwrite sub-650 borrowers more readily on tractors than on unsecured working capital. Sub-580 borrowers should plan for a higher APR, a larger down payment, and a shorter maximum term, but approval rates are higher than on unsecured products.

4. **Q: Can I finance a used semi truck from a private seller?**
   A: Yes. The lender requires a clean title, a current inspection, and a bill of sale that matches the appraised value. Private-party deals close more slowly than dealer sales because the title has to be pulled and the lien recorded before funds release. Plan for an extra 3 to 5 banking days versus a dealer transaction.

5. **Q: What down payment do I need on a semi truck loan?**
   A: Most semi truck loans on the Dispatched panel fund with 10% to 20% down. Zero-down and first-payment-deferred structures exist for operators with strong revenue history. Higher down payments lower the APR and shorten the term needed to keep the monthly payment manageable for the operation's revenue.

6. **Q: How long can I finance a semi truck for?**
   A: Terms run 24 to 72 months for tractors. Newer trucks (under 4 years) support the full 72 months; trucks 5 to 8 years old typically cap at 48 to 60 months; trucks over 8 years cap at 36 months. The lender sets the maximum term based on the truck's expected residual value at payoff.

7. **Q: Do I need to be incorporated to finance a semi truck?**
   A: No. Sole proprietors with an active DOT and MC number qualify on the Dispatched panel. LLCs and S-corps with two-plus years operating history typically see a slightly lower APR because the lender can underwrite the entity's bank statements directly. Both structures fund.

---

## 6. Box truck financing — `/box-truck-financing`

**Primary keyword:** box truck financing
**Secondary keywords:** box truck loan, 26 ft box truck financing, non-CDL box truck loan, box truck financing bad credit
**Search intent:** Operator buying a 16- to 26-foot box truck for last-mile, expediting, Amazon Relay, or local delivery work — including non-CDL operators just getting started.

### Title (53 chars)
`Box truck financing — 16ft to 26ft loans | Dispatched`

### Description (147 chars)
`Box truck loans from $20K–$120K for last-mile, expediting, and Amazon Relay operators. FICO from 500, panel APR 9%–18%. Soft-pull match. Apply now.`

### FAQs

1. **Q: How much can I borrow for a box truck?**
   A: Loans on the Dispatched panel for box trucks typically range from $20K for used 16-foot units to $120K for new 26-foot units with lift gate and refrigeration. The amount is set by the truck's appraised value, the down payment, and the operator's revenue. Lenders fund up to the appraised value minus down payment.

2. **Q: Can I finance a box truck without a CDL?**
   A: Yes. Box trucks under 26,001 GVWR do not require a CDL, and Dispatched panel lenders underwrite non-CDL operators when the operation has a DOT number and demonstrable revenue. New operators with under 12 months of MC authority can apply but should expect a higher APR and a larger down payment requirement until the revenue history matures.

3. **Q: What APR should I expect on a box truck loan?**
   A: The observed equipment-loan panel range is 9% to 18% APR for box trucks. Newer trucks, 600+ FICO, and a 15%+ down payment quote toward the low end. Older units, sub-580 FICO, or zero-down structures quote toward the high end. The exact APR is on the term sheet before you sign.

4. **Q: Can I finance a box truck with bad credit?**
   A: Yes. Programs route from a 500 FICO. The truck is collateral, so sub-650 borrowers see higher approval rates on box trucks than on unsecured working capital. Sub-580 borrowers should plan for a higher APR, a larger down payment requirement, and a shorter maximum term.

5. **Q: How long can I finance a box truck for?**
   A: Terms run 24 to 72 months. Newer trucks (under 4 years) support the full 72 months; trucks 5 to 8 years old typically cap at 48 to 60 months; trucks over 8 years cap at 36 months. The lender sets the maximum term based on the truck's expected residual value at payoff.

6. **Q: Do Amazon Relay and last-mile contracts count as revenue for the loan?**
   A: Yes. Box truck operators with Amazon Relay, FedEx Ground, Amazon DSP, or comparable contracted-route revenue qualify on the Dispatched panel. The lender underwrites the contract revenue from bank deposits the same way it underwrites brokered freight. The contract itself does not need to be assigned or pledged.

7. **Q: Will applying for box truck financing hurt my credit?**
   A: Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your score. A hard pull only happens after you pick a specific lender and move forward on their term sheet.

---

## 7. Owner-operator financing — `/owner-operator-financing`

**Primary keyword:** owner-operator financing
**Secondary keywords:** owner-operator loan, owner-operator working capital, single-truck operator financing, owner-op truck loan
**Search intent:** Single-truck or 2- to 3-truck operator looking for finance options that fit their structure — bank statements, not corporate financials.

### Title (55 chars)
`Owner-operator financing — single truck up | Dispatched`

### Description (153 chars)
`Financing built for owner-operators: working capital, equipment loans, repair loans. FICO from 500, soft-pull match, funds same banking day. Get matched.`

### FAQs

1. **Q: What financing is available for owner-operators?**
   A: The Dispatched panel covers four core products for owner-operators: working capital ($25K to $250K, 14% to 34% APR), equipment financing for tractors and trailers ($20K to $200K, 9% to 18% APR), repair loans ($5K to $150K, same banking day funding), and invoice factoring for receivables. One application routes to the right product based on the operator's situation.

2. **Q: Can I get a loan as a sole proprietor with no LLC?**
   A: Yes. Sole proprietors with an active DOT and MC number qualify on the Dispatched panel. Lenders underwrite the operator's business bank statements and Schedule C. LLCs and S-corps with two-plus years operating history typically see a slightly lower APR because the entity's books are easier to underwrite, but both structures fund.

3. **Q: How much revenue do I need to qualify as an owner-operator?**
   A: Most working-capital programs on the Dispatched panel require a minimum of $15K to $20K in monthly business deposits over the trailing three months. Equipment loans have no published revenue minimum because the asset is collateral; the lender sizes the loan to fit the operation's cashflow. Operators below the working-capital threshold should look at factoring or equipment-secured products first.

4. **Q: Can a new MC authority owner-operator get financing?**
   A: Yes, with caveats. Operators under 12 months of MC authority qualify for a narrower set of programs, primarily equipment-secured loans, and should expect a higher APR and a larger down payment requirement than seasoned operators. The Dispatched panel includes lenders who specifically underwrite new authorities.

5. **Q: What documents do I need as an owner-operator?**
   A: Three months of business bank statements, your EIN or SSN, DOT and MC number, and a driver's license. For loans above $75K the chosen lender also asks for the most recent Schedule C or 1120 and current settlement statements from your carrier or broker. No business plan, no tax preparer letter.

6. **Q: How long does owner-operator financing take to fund?**
   A: Soft approval and lender match typically come back within 20 minutes of submitting the application. Working capital and repair loans fund the same banking day after the chosen lender countersigns and the wire lands before cutoff. Equipment loans take 2 to 5 banking days because the lender has to verify the title and record the lien before funds release.

7. **Q: Will applying as an owner-operator hurt my credit?**
   A: Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens after you pick a specific lender and move forward on their term sheet.

---

## 8. Invoice factoring — `/invoice-factoring-for-truckers`

**Primary keyword:** invoice factoring for truckers
**Secondary keywords:** trucking factoring company, freight factoring, recourse vs non-recourse factoring, factoring for owner-operators
**Search intent:** Operator with outstanding broker or shipper invoices on net-30 to net-90 terms, looking to convert receivables to cash without taking on a loan.

### Title (54 chars)
`Invoice factoring for truckers — same-day | Dispatched`

### Description (147 chars)
`Convert broker and shipper invoices to cash in days. Recourse and non-recourse factoring matched to your lanes. No FICO minimum. Get matched today.`

### FAQs

1. **Q: How does invoice factoring for truckers work?**
   A: You submit a paid load's bill of lading and broker invoice to the factoring company. The factor advances 85% to 97% of the invoice face value the same or next banking day, then collects the full payment from the broker on net-30 to net-90 terms. Once the broker pays, the factor releases the reserve (the 3% to 15% held back) minus their fee. You get cash on the day you deliver, not 60 days later.

2. **Q: How much does invoice factoring cost?**
   A: Factoring fees on the Dispatched panel typically run 1% to 4% of the invoice face value, depending on whether the structure is recourse or non-recourse, the broker's credit, the volume you factor monthly, and the average days-to-pay. Higher-volume operators with strong broker mixes quote toward 1% to 2%; smaller operators or weaker broker mixes quote toward 3% to 4%.

3. **Q: What is the difference between recourse and non-recourse factoring?**
   A: With recourse factoring, you are on the hook to repay the advance if the broker does not pay the invoice. With non-recourse factoring, the factor absorbs the credit loss when a broker goes insolvent. Non-recourse costs more (typically 0.5% to 1.5% higher) but eliminates the operator's exposure to broker bankruptcy. Most non-recourse contracts still leave the operator liable for disputes that are not credit failures.

4. **Q: Can I factor invoices with bad credit?**
   A: Yes. Factoring underwrites the broker's credit, not the operator's, because the broker is the entity actually paying the invoice. Operators with sub-600 FICO routinely factor with no rate impact. The factor checks the operator for fraud history and active bankruptcies, but FICO score itself is not the underwriting driver.

5. **Q: How fast does invoice factoring fund?**
   A: Same banking day for invoices submitted before the factor's daily cutoff (typically 11am to 1pm Eastern), next banking day for late-cutoff or weekend submissions. Once the factoring relationship is set up, ongoing invoices fund within hours of submission. Initial setup with a new factor takes 3 to 7 business days for credit checks, broker verification, and notice of assignment.

6. **Q: Do I have to factor every load?**
   A: It depends on the contract. Some factors require all-load (whole-ledger) factoring, where every invoice goes through them; others allow spot factoring, where you pick which invoices to submit. Whole-ledger contracts come with lower fees because the factor has predictable volume; spot contracts cost more per invoice but give the operator full control. The application asks which structure fits the operation.

7. **Q: How is factoring different from a working-capital loan?**
   A: Factoring is selling specific receivables for an immediate advance; working capital is borrowing a lump sum you repay from operations over time. Factoring scales with revenue (the more you haul, the more cash you can pull) and has no APR — it has a flat fee per invoice. Working capital is fixed-amount, has a payment schedule, and reports as debt on the balance sheet. Different cost structures for different cashflow problems.

---

## 9. Bad credit truck financing — `/bad-credit-truck-financing`

**Primary keyword:** bad credit truck financing
**Secondary keywords:** truck loan bad credit, semi truck financing 500 FICO, sub-650 truck loan, no credit check truck financing
**Search intent:** Operator with sub-650 FICO who has been declined by banks or by dealer financing, searching for any path to fund a truck purchase, repair, or working capital.

### Title (51 chars)
`Bad credit truck financing — FICO 500+ | Dispatched`

### Description (153 chars)
`Truck financing for sub-650 FICO. Programs route from 500. Equipment loans, working capital, repair loans. Soft-pull match. Apply or call (307) 317-0801.`

### FAQs

1. **Q: Can I get truck financing with a 500 credit score?**
   A: Yes. Programs on the Dispatched panel route from a 500 FICO. Most banks decline below 650 because they underwrite on credit alone; the Dispatched panel underwrites on revenue, debt service coverage, equipment value, and deposit history first, with FICO second. Sub-580 borrowers should expect a higher APR and tighter loan amounts, but approval is realistic.

2. **Q: What APR will I pay with bad credit?**
   A: Expect rates toward the high end of the published panel ranges. For working capital, that is the 28% to 34% APR end of the 14% to 34% range. For equipment-secured loans, that is the 14% to 18% APR end of the 9% to 18% range. The exact APR depends on revenue, time in business, equipment age, and down payment. The term sheet shows the exact rate before you sign.

3. **Q: Why does Dispatched approve sub-650 borrowers when banks decline them?**
   A: Banks underwrite on FICO and personal financial statements. The Dispatched panel underwrites on the operation's bank deposits, equipment value, and time in business — credit is a secondary signal. A trucker pulling $30K a month in deposits with a 580 FICO is a different risk than the FICO alone suggests, and the panel's lenders price for that distinction.

4. **Q: What documents do I need for bad credit truck financing?**
   A: Three months of business bank statements, your EIN or SSN, DOT and MC number, and a driver's license. For equipment loans, also include a copy of the title or dealer purchase order. The bank statements are the central document — they tell the lender what the operation actually moves through deposits, which is the underwriting signal that matters most for sub-650 applications.

5. **Q: Will applying with bad credit hurt my score further?**
   A: Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your score. A hard pull only happens after you pick a specific lender and move forward on their term sheet. If you compare offers, hard pulls inside a 14-day rate-shopping window count as one inquiry on most scoring models.

6. **Q: Is there a minimum FICO to apply?**
   A: 500. Below 500, the Dispatched panel does not currently have a program that funds. Operators below 500 should focus on rebuilding the score (paying down revolving balances, settling charge-offs) before reapplying. Active Chapter 13 plans are reviewed case-by-case; active Chapter 7 cases inside the 12-month post-discharge window are typically declined across the panel.

7. **Q: Can I refinance an existing high-rate truck loan with bad credit?**
   A: Yes, if the operation's revenue and the truck's remaining value support the refinance. Refinancing makes sense when the existing rate is materially above the current panel range and the truck has at least 24 months of payments left. The application step asks about existing obligations so the lender can underwrite the refinance accurately.

---

## 10. New authority truck financing — `/new-authority-truck-financing`

**Primary keyword:** new authority truck financing
**Secondary keywords:** financing for new MC authority, under 12 month authority loan, new trucking business loan, startup trucking financing
**Search intent:** Operator who got their MC authority within the last 12 months and is finding that most lenders require 2 years of operating history.

### Title (55 chars)
`New authority truck financing — under 12mo | Dispatched`

### Description (150 chars)
`Truck financing for operators with new MC authority (under 12 months). Equipment loans and working capital. FICO from 500. Soft-pull match. Apply now.`

### FAQs

1. **Q: Can I get truck financing with new MC authority?**
   A: Yes. The Dispatched panel includes lenders who specifically underwrite operators under 12 months of MC authority. Programs are narrower than for seasoned operators — primarily equipment-secured loans and smaller working-capital lines — and expect a higher APR and a larger down payment requirement until the revenue history matures past the 12-month mark.

2. **Q: How long do I need to have my MC authority before I can borrow?**
   A: There is no fixed minimum on the Dispatched panel; lenders underwrite as early as the first month of active authority if the operator has trucking-related industry experience (prior W-2 driving, dispatched fleet ownership, or prior owner-operator history). Operators with zero prior trucking experience and a brand-new authority typically wait 90 to 180 days of revenue before lenders fund.

3. **Q: What revenue do I need with a new authority?**
   A: Most working-capital programs require a minimum of $15K to $20K in monthly business deposits over the trailing three months — the same threshold as seasoned operators. Equipment loans size against the asset, not against revenue minimums. New-authority operators below the working-capital threshold should start with equipment-secured products or factoring.

4. **Q: What APR should I expect as a new authority?**
   A: Expect rates at the higher end of the panel ranges. Working capital quotes toward the 24% to 34% APR end of the 14% to 34% range; equipment-secured quotes toward the 14% to 18% APR end of the 9% to 18% range. As your operating history extends past 12 and 24 months, the same panel re-prices toward the lower end on subsequent applications.

5. **Q: Can I get equipment financing as a new authority?**
   A: Yes. Equipment-secured loans are the most accessible product for new authorities because the financed truck or trailer is collateral. Expect a 15% to 25% down payment requirement (versus 10% to 15% for seasoned operators) and a maximum term tied to the equipment's expected residual value at payoff. New-authority operators routinely fund tractors, trailers, and box trucks.

6. **Q: What documents do I need as a new authority?**
   A: Three months of business bank statements (or whatever you have if the authority is younger than 90 days), your EIN, MC and DOT numbers, a driver's license, and your most recent personal tax return. The personal tax return helps lenders bridge the underwriting gap when business history is short. For equipment loans, also include the title or dealer purchase order.

7. **Q: Why are most lenders declining my new authority application?**
   A: Most banks and dealer financing arms require 2 years of MC authority to fund. The Dispatched panel includes lenders who underwrite shorter histories because they evaluate revenue, equipment, and prior trucking experience instead of using authority age as a hard cutoff. That is the gap the new-authority program fills.

---

## 11. Apply — `/apply`

**Primary keyword:** apply for trucking funding
**Secondary keywords:** trucking loan application, owner-operator funding application, soft-pull truck loan apply
**Search intent:** Operator ready to submit. Conversion page — copy must reduce friction and answer pre-submit objections, not re-pitch the product.

### Title (51 chars)
`Apply for trucking funding — soft pull | Dispatched`

### Description (151 chars)
`Apply for trucking working capital, equipment, or repair financing. Soft-pull match in 20 minutes. No upfront fees. Funds same banking day on approval.`

### FAQs

1. **Q: What happens after I submit the application?**
   A: You see a soft-approval range and a shortlist of 2 to 4 matched lenders typically within 20 minutes. You pick the lender that fits. The chosen lender runs a hard pull and sends a final term sheet (APR, term, total cost) usually within 4 hours. You review, ask questions on the phone, e-sign from your phone, and the wire goes out the same banking day if it lands before the cutoff.

2. **Q: Will applying affect my credit score?**
   A: Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your credit score. A hard pull only happens once you pick a specific lender and move forward on their term sheet. If you compare offers from multiple lenders, hard pulls inside a 14-day rate-shopping window count as one inquiry on most scoring models.

3. **Q: Are there any upfront fees to apply?**
   A: No. The Dispatched application is free. Lenders on the panel pay Dispatched on funded loans — the operator pays nothing to apply, nothing to match, and nothing to get a term sheet. If a lender charges an origination fee at funding, that fee is itemized on the term sheet you sign before any money moves.

4. **Q: What information do you collect on the application?**
   A: The basics needed to underwrite a trucking finance application: legal name and contact details, EIN or SSN, DOT and MC numbers, monthly revenue range, time in business, and what the funds are for. Bank statements and tax documents are uploaded after the soft-approval step, only to the lenders you choose to move forward with.

5. **Q: How long does the application take?**
   A: Most applicants finish in under 7 minutes. The application is structured so you can complete it on a phone in a parking lot — no document uploads required at the soft-pull stage. Document collection happens after you pick a lender, on that lender's secure portal.

---

## 12. Qualify — `/qualify`

**Primary keyword:** trucking loan qualifier
**Secondary keywords:** trucking funding fit calculator, owner-operator loan eligibility, truck loan pre-qualify
**Search intent:** Operator earlier in the funnel than /apply — wants a sanity check on whether they can qualify before committing to filling out the full application.

### Title (56 chars)
`Check your trucking funding fit — soft pull | Dispatched`

### Description (145 chars)
`Two questions, no credit check. See the lender type most likely to fund your operation and the typical APR range for your profile. No commitment.`

### FAQs

1. **Q: What does the qualifier actually do?**
   A: The qualifier asks two questions about your operation — monthly revenue range and credit band — and returns the Dispatched product category most likely to fit (working capital, equipment financing, repair loan, or factoring) along with the observed panel APR range for borrowers with your profile. It does not pull credit, does not collect personal information, and does not return a binding offer.

2. **Q: Will the qualifier affect my credit?**
   A: No. The qualifier asks for a credit band (a range like "580 to 619"), not a specific score, and does not pull a credit report. Nothing about the qualifier touches your credit file. The first credit-bureau interaction happens later, on the application — and that is a soft pull, not a hard pull.

3. **Q: Is the qualifier the same as applying?**
   A: No. The qualifier is a fit estimator, not an application. You see the product category that matches your inputs and the typical panel APR range, but you do not get a soft-approval, a lender shortlist, or a term sheet. Those come from the full application at /apply, which takes about 7 minutes and runs a soft pull.

4. **Q: What information do you collect on the qualifier?**
   A: Two pieces of information — monthly revenue range and credit band. No name, no email, no phone number, no SSN, no DOT number. The qualifier is built to give you a useful answer with the minimum information possible. Contact details are only collected on the application.

---

## 13. Insurance hub — `/insurance`

**Primary keyword:** commercial trucking insurance
**Secondary keywords:** trucking insurance comparison, primary liability trucking, cargo insurance for truckers, commercial truck insurance carriers
**Search intent:** Operator shopping insurance, comparing primary liability, cargo, physical damage, and the rest of the stack across carriers.

### Title (52 chars)
`Commercial trucking insurance — compare | Dispatched`

### Description (149 chars)
`Compare commercial trucking insurance — primary liability, cargo, physical damage, and the full stack — across carriers and states. Get matched fast.`

### FAQs

1. **Q: Does Dispatched sell trucking insurance directly?**
   A: No. Dispatched is a matching platform. Insurance quotes are routed to a named producer partner — a licensed commercial trucking insurance brokerage that holds the appointments and writes the policies. The producer partner is disclosed on the quote step and is the entity bound to you on the policy. Dispatched is paid a referral fee on bound policies.

2. **Q: What types of trucking insurance can I compare on Dispatched?**
   A: The full commercial-trucking stack: primary auto liability, motor truck cargo, physical damage (comprehensive and collision), non-trucking liability (bobtail), trailer interchange, general liability, and workers compensation where applicable. Specialty coverages like reefer breakdown, pollution liability, and umbrella layers are available through the producer partner on request.

3. **Q: How do I get a commercial trucking insurance quote?**
   A: Submit your DOT number, equipment list, lane footprint, and prior loss runs through the insurance intake form. The producer partner pulls quotes from the carriers appointed for your equipment type and operating radius, then returns a side-by-side comparison usually within 1 to 3 business days. You bind directly with the producer partner once you pick a quote.

4. **Q: Which insurance carriers does Dispatched compare?**
   A: The producer partner holds appointments with the major commercial trucking carriers — Progressive, Great West, Berkshire Hathaway GUARD, Canal, Sentry, and the specialty MGAs that write higher-risk classes. The full carrier list, AM Best ratings, and the products each carrier writes are at /carriers.

5. **Q: Can I get insurance with a new MC authority or accidents on file?**
   A: Yes. The producer partner has carriers that specifically write new authorities (under 12 months) and operations with prior accidents or violations on the loss run. Premiums for these classes are higher than for seasoned, clean-loss operations, and the carrier mix is narrower, but coverage is available.

6. **Q: Does Dispatched help me file claims?**
   A: No. Claims are handled directly between the operator and the carrier on the policy, with the producer partner facilitating where the policyholder requests it. Dispatched is not a party to the policy and does not adjust claims.

7. **Q: How is insurance funded — can I finance the premium?**
   A: Yes, premium financing is standard for commercial trucking policies. The producer partner offers premium-finance options through the major premium-finance companies (typically 25% down and 9 monthly payments). You can also pay annual or use the operation's working-capital line to fund the premium directly.

---

## 14. Carrier panel — `/carriers`

**Primary keyword:** commercial trucking insurance carriers
**Secondary keywords:** trucking insurance companies, AM Best trucking carriers, commercial truck insurance providers, carriers Dispatched works with
**Search intent:** Operator (or insurance shopper) looking up specific carriers, checking AM Best ratings, or comparing which carriers write which products in which states.

### Title (50 chars)
`Trucking insurance carriers — AM Best | Dispatched`

### Description (153 chars)
`Carrier reviews for commercial trucking insurance — AM Best ratings, products written, and the state pages where each carrier appears. Compare and quote.`

### FAQs

1. **Q: Which insurance carriers does Dispatched work with?**
   A: The producer partner holds appointments with the major commercial trucking carriers — including Progressive Commercial, Great West Casualty, Berkshire Hathaway GUARD, Canal Insurance, Sentry Select, and a panel of specialty MGAs that write higher-risk and new-authority classes. The full list, with each carrier's AM Best rating and the products they write, is on this page.

2. **Q: What does the AM Best rating tell me about a carrier?**
   A: AM Best is a credit rating agency that grades insurance carrier financial strength on an A++ to F scale. Ratings of A- or better indicate the carrier has the financial strength to pay claims under stress; ratings below B+ indicate elevated solvency risk. Most operators should choose A- or better for primary liability and physical damage. Specialty classes sometimes only have B-rated carriers available.

3. **Q: How does Dispatched decide which carriers to list?**
   A: Carriers listed on this page are appointments held by the named producer partner that Dispatched routes insurance quotes to. We do not list carriers the producer partner cannot quote against. AM Best ratings are pulled from public AM Best filings and timestamped on the carrier detail page; the rating shown is the most recent verified value, not the all-time high.

4. **Q: Can I get a quote from any carrier on this list?**
   A: Subject to underwriting fit. Each carrier has appetite rules — equipment classes they will write, operating radius, loss-history thresholds, and minimum revenue or fleet size. The producer partner runs your operation against each carrier's appetite and only quotes the ones that will actually bind. The carrier detail pages list each carrier's appetite at a high level.

5. **Q: Are there carriers Dispatched does not work with?**
   A: Yes. Dispatched only routes quotes to carriers held by the named producer partner. Carriers outside that appointment list — including some direct-writers and captive programs — are not in the comparison set. If you have an existing relationship with a carrier the producer partner does not hold, you can still quote them directly; Dispatched does not block parallel shopping.

6. **Q: Does the carrier write the policy or is it a wholesaler?**
   A: For most carriers on the panel, the producer partner has a direct retail appointment and the carrier writes the policy. For specialty classes (high-risk, new-authority, hazmat), the producer partner often writes through an MGA wholesaler that fronts a rated carrier — the carrier on the policy is still A-rated, but the underwriting decision sits with the MGA. The carrier detail page flags which structure applies.

---

## 15. State of Commercial Trucking Insurance 2026 — `/research/state-of-commercial-trucking-insurance-2026`

**Primary keyword:** commercial trucking insurance 2026 report
**Secondary keywords:** trucking insurance market report, commercial trucking insurance trends 2026, state of commercial trucking insurance, ATRI insurance research
**Search intent:** Insurance buyer, broker, or industry analyst looking for an annual state-of-the-market report on commercial trucking insurance — pricing trends, carrier shifts, regulatory changes.

### Title (56 chars)
`State of commercial trucking insurance 2026 | Dispatched`

### Description (153 chars)
`Annual research on commercial trucking insurance: state legal-environment shifts, commodity hotspots, AM Best context, and what we are watching for 2026.`

### Body ownership
Editorial body (sections, charts, source citations) is owned by the Dispatched content team. This doc covers metadata + FAQ schema only.

### FAQs

1. **Q: What does the State of Commercial Trucking Insurance 2026 report cover?**
   A: The report covers the structural state of the commercial-trucking insurance market entering 2026: state-level legal-environment shifts (nuclear verdict trends, tort reform), commodity-class pricing hotspots, AM Best capacity moves on the major carriers, the broker and MGA market shape, and the open underwriting questions the team is watching going into the year. Source-cited and regulator-anchored.

2. **Q: Where does the data in the report come from?**
   A: Public regulator filings (state DOI rate filings, NAIC), American Transportation Research Institute (ATRI) annual operational-cost surveys, AM Best public filings, FMCSA SAFER and CSA data, and named broker and carrier interviews. The report does not use proprietary feeds. Every chart and claim is cited inline and a full source list runs at the end.

3. **Q: How often is the report updated?**
   A: The headline State of Commercial Trucking Insurance report is annual — the 2026 edition publishes in Q1 2026 and is locked through Q4 2026. Quarterly updates publish at /research and address material changes (a major rate filing, a carrier withdrawal, a Supreme Court ruling on a relevant tort case) without rewriting the headline report.

4. **Q: Is the report free to read?**
   A: Yes. The full report is published on dispatched.finance with no paywall, no email gate, and no PDF lockbox. Source files for charts are linked alongside each chart for analysts who want to verify the data themselves.

5. **Q: Can I cite or republish the report?**
   A: Yes, with attribution. Cite as "Dispatched, State of Commercial Trucking Insurance 2026" with a link back to the canonical URL. Republishing charts is permitted with the same attribution. For excerpts longer than 500 words or for commercial republication (paid newsletters, paid research products), email the editorial team for written permission.

---

## 16. Methodology — `/methodology`

**Primary keyword:** Dispatched methodology
**Secondary keywords:** how Dispatched matches lenders, trucking loan underwriting methodology, commercial truck insurance methodology, panel APR methodology
**Search intent:** Trust signal page. Operator vetting Dispatched before applying, or a journalist or partner checking how the company derives the rate ranges and structural promises it publishes.

### Title (53 chars)
`Methodology — how Dispatched matches you | Dispatched`

### Description (148 chars)
`How Dispatched defines, sources, and refreshes the rate ranges and structural promises it publishes. Finance and insurance methodology in one place.`

### FAQs

1. **Q: How does Dispatched match operators to lenders?**
   A: The intake form collects the underwriting fields lenders care about — monthly business deposits, time in business, FICO band, equipment type, and what the funds are for. The matching engine routes the application to the lenders on the panel whose published appetite rules accept the operator's profile. The operator sees a shortlist of 2 to 4 matched lenders and picks one to move forward with.

2. **Q: Where do the panel APR ranges come from?**
   A: The 14% to 34% working-capital range and 9% to 18% equipment-loan range are the observed band of APRs that lenders on the Dispatched panel have actually quoted to funded borrowers over the trailing 12 months. The ranges are not a forecast and not a guarantee — they are descriptive of what the panel has done. Bands are reviewed quarterly and updated when the underlying data shifts materially.

3. **Q: What underwriting signals do the panel lenders weight most?**
   A: For working capital and repair loans: monthly business deposits, deposit consistency over the trailing 3 to 6 months, debt service coverage ratio (DSCR), and time in business. FICO is secondary. For equipment loans: the asset's appraised value and remaining useful life, the operator's down payment, and revenue. For factoring: the broker's credit, not the operator's.

4. **Q: Is Dispatched a direct lender?**
   A: No. Dispatched is a matching platform. Loans are originated and funded by the lenders on the panel. Dispatched is paid a referral fee by the lender on funded loans — the operator pays nothing to apply, match, or receive a term sheet. Dispatched is also not a direct insurer; insurance quotes route to a named producer partner.

5. **Q: How is the lender panel curated?**
   A: Lenders are vetted on three dimensions before joining the panel: licensing and disclosure compliance in the states they fund, transparent fee and APR disclosure on term sheets, and willingness to underwrite trucking-specific signals (DOT, MC, settlement statements) instead of generic small-business templates. Lenders that price-gouge or bury fees in the fine print are removed from the panel.

6. **Q: Does Dispatched accept compensation that biases the match?**
   A: Lenders pay Dispatched on funded loans, but the matching engine routes on appetite fit, not on pay rate. The shortlist returned to the operator is the set of lenders whose published appetite accepts the operator's profile — it is not sorted by which lender pays Dispatched the most. Operators always see at least 2 lenders to compare, where 2 or more pass appetite.

7. **Q: How often are the rate ranges and program rules updated?**
   A: The panel APR ranges are reviewed quarterly against the trailing 12 months of funded-loan data. Program rules (FICO floors, loan amount bands, document requirements) are updated within 14 days of a material panel change — for example, if a lender exits the panel or changes their FICO floor. Updates are reflected on this page and on the affected money pages.

---

## 17. Calculators hub — `/calculators`

**Primary keyword:** trucking finance calculator
**Secondary keywords:** truck loan calculator, trucking working capital calculator, truck repair financing calculator, owner-operator finance tools
**Search intent:** Operator looking for a fit estimator before applying — wants to model the math (payment, total cost, fit category) without committing to an application.

### Title (53 chars)
`Trucking finance calculators — fit tools | Dispatched`

### Description (146 chars)
`Fit estimators and decision tools for trucking owner-operators and small fleets. No credit pull, no personal info collected. Try a calculator now.`

### FAQs

1. **Q: What do the trucking finance calculators do?**
   A: Each calculator takes a small set of operational inputs (revenue, equipment age, repair cost, FICO band, or down payment depending on the tool) and returns the Dispatched product category that fits along with the typical panel APR range for borrowers with that profile. Calculators are fit estimators, not pre-approvals — the answer is directional, not a binding offer.

2. **Q: Do the calculators pull my credit?**
   A: No. The calculators ask for a credit band (a range, not a specific score) and do not touch your credit file. Nothing about the calculators is reported to the credit bureaus. The first credit-bureau interaction happens on the application at /apply, and that is a soft pull.

3. **Q: Do I need to enter contact information to use a calculator?**
   A: No. Calculators run entirely in the browser — no name, no email, no phone number, no SSN. You can model scenarios all afternoon without leaving any contact information with Dispatched. Contact details are only collected when you start an application.

4. **Q: How accurate are the APR estimates from the calculators?**
   A: The APR estimates are the observed band of rates that lenders on the Dispatched panel have actually quoted to borrowers with similar profiles over the trailing 12 months. They are descriptive, not predictive. The exact APR you receive will depend on your full underwriting picture (revenue, deposit consistency, equipment specifics) which the calculators do not capture in full.

5. **Q: Which calculator should I use first?**
   A: If a truck is at the shop and you have a quote, use the truck repair calculator. If you are sizing a working-capital line for fuel, payroll, or slow-month gaps, use the working-capital calculator (when published). If you are buying equipment, use the equipment-loan calculator (when published). If you are not sure which product fits, use /qualify — it routes you to the right product in two questions.

---

## 18. Truck repair calculator — `/calculators/truck-repair`

**Primary keyword:** truck repair financing calculator
**Secondary keywords:** semi truck repair cost calculator, truck repair loan estimator, repair vs replace calculator truck, owner-operator repair calculator
**Search intent:** Operator with a shop quote, deciding whether to finance the repair, pay cash, or replace the truck. Wants a quick math check before talking to a lender.

### Title (52 chars)
`Truck repair financing calculator — fit | Dispatched`

### Description (153 chars)
`Estimate the right financing for a truck repair. Five inputs, no credit pull, no personal info. Returns the product fit and typical APR for your profile.`

### FAQs

1. **Q: How do I use the truck repair financing calculator?**
   A: Enter five inputs: the shop's repair quote, the truck's age, your monthly business revenue range, your FICO band, and whether the truck is paid off. The calculator returns the Dispatched product category that fits (working-capital repair loan, equipment-secured refinance, or pay-cash recommendation) and the typical panel APR range for borrowers with your profile.

2. **Q: When does the calculator recommend financing versus paying cash?**
   A: The calculator recommends financing when the repair cost exceeds roughly one month of net operating income or when paying cash would drain reserves below a 30-day operating buffer. It recommends paying cash when the repair is a fraction of monthly net and reserves are healthy — the financing fee on a small repair often costs more than the cashflow benefit.

3. **Q: What APR should I expect on a truck repair loan?**
   A: The observed panel range is 14% to 34% APR for working-capital-style repair loans, and 9% to 18% APR when the repair is rolled into an equipment-secured product on a tractor with sufficient remaining value. The calculator shows which range applies to your profile based on the inputs.

4. **Q: Does the calculator pull my credit?**
   A: No. The calculator asks for a credit band (a range like "580 to 619"), not a specific score, and does not touch your credit file. Nothing about the calculator is reported to the credit bureaus.

5. **Q: When does the calculator tell me to replace the truck instead of repairing?**
   A: When the repair cost exceeds roughly 50% of the truck's current market value and the truck is older than 8 years, the calculator flags replacement as the math-favored path. The flag is directional — the operator's specific situation (lane fit, downtime cost, prior repair history on the same systems) often justifies repair even when the math marginally favors replacement.

---

## Notes for engineering

### Pages requiring metadata + FAQPage JSON-LD updates
All pages numbered 2 through 10, 12, 13, 14, 16, 17, 18 need both an updated `metadata` export (to match the title and description in this doc) and a `<JsonLd payload={faqPage([...])} />` block using the FAQ Q&As verbatim.

### Pages requiring metadata only (no FAQ schema in this doc)
- Page 1 (`/`) — homepage FAQs already shipped in `components/landing/FAQ.tsx`. Wiring FAQPage JSON-LD on the homepage is a separate ticket; this doc only covers the title/description for `/`.
- Page 11 (`/apply`) — short FAQs included above. Confirm with engineering whether the apply page should render a visible FAQ section or only emit the JSON-LD. Current page does not render an FAQ section.
- Page 15 (`/research/state-of-commercial-trucking-insurance-2026`) — body owned by content team; only metadata + 5 FAQs are in this doc.

### Pages explicitly excluded from this doc
- `/trucking` — redirect to `/trucking-working-capital`. No metadata needed; redirects do not render a page.
- `/trucking-loans/[state]` — programmatic state pages. Out of scope for this doc; covered by a separate programmatic-SEO spec.
- `/insurance/[product]`, `/insurance/tools`, `/carriers/[carrier]` — sub-page templates; out of scope for this priority-18 doc.
- All `(legal)` pages and `/disclosures` — legal-owned copy, not SEO-managed.

### Open decisions punted to marketing
- Page 14 (`/carriers`) primary keyword: used "commercial trucking insurance carriers" as the primary; marketing should confirm versus "trucking insurance companies" if search-volume data favors the latter.
- Page 17 (`/calculators`) FAQ #5 references calculators for working capital and equipment loans that are not yet shipped. If those calculators stay unshipped past Q3, prune the references in that FAQ answer.
