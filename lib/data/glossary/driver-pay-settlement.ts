import "server-only";
import type { GlossaryTerm } from "./types";

/* Driver pay and settlement terms (settlement statement, escrow deductions,
   fuel advance, maintenance escrow, bobtail pay, detention pay policy,
   guaranteed pay, safety bonus, referral bonus, orientation pay, trip
   sheet, carrier deduction). Category: driver-life-work.
   Populated by feat/seo-batch-7 agent G12. */

export const DRIVER_PAY_SETTLEMENT_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "settlement-statement",
    term: "Settlement Statement",
    category: "driver-life-work",
    shortDefinition:
      "Weekly statement from a carrier to a lease-on owner-operator (or 1099 contractor) detailing gross revenue, deductions, and net pay.",
    sections: [
      {
        h2: "What it is",
        body:
          "A settlement statement is the weekly statement a motor carrier provides to a lease-on owner-operator or 1099 contractor detailing the operator's compensation for that pay period. Line items typically include gross revenue (line-haul + FSC + accessorials), deductions (insurance, fuel, escrow, trailer, plate, ELD, occupational accident, dispatch fee), and net pay. Format and detail vary widely by carrier — some produce a one-page summary, others break out every line by load.\n\nFMCSA 49 CFR Part 376 requires settlement statements to provide enough detail for the owner-operator to verify the calculation: gross revenue per load, every deduction itemized, and the math reconciling to net pay. Common deduction categories include weekly insurance ($50-$200), weekly truck escrow ($100-$300), weekly fuel draws ($800-$2,000 depending on miles), permit fees, IFTA estimated, plate amortization, and communication fee. The statement is the primary operational document for a lease-on operator — it is the receipt for the week's work.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For lease-on operators, settlement statements are the equivalent of pay stubs and the primary record of revenue for tax purposes. Lenders evaluating lease-on operators use settlement statements (alongside 1099s) to verify revenue history during underwriting — 12-26 weeks of statements is standard, and clean records win better terms. Auditing settlement statements for accuracy is a real-money activity: miscoded deductions cost operators hundreds annually, and carriers rarely refund without the operator pushing. Some operators digitize settlement statements via OCR for automated reconciliation against bank deposits, which catches errors faster than manual review and creates the historical record that supports both tax filings and loan applications without scrambling at deadline time.",
      },
    ],
    relatedTerms: ["lease-on-driver", "percentage-of-line-haul", "escrow-deductions", "1099-nec"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "escrow-deductions",
    term: "Escrow Deductions",
    category: "driver-life-work",
    shortDefinition:
      "Weekly deductions held by a carrier in a reserve account, typically funding maintenance, repair, or end-of-lease balloon; refundable on terms set in the lease.",
    sections: [
      {
        h2: "What it is",
        body:
          "Escrow deductions are weekly amounts deducted from the operator's pay and held by the carrier in a reserve account. Common purposes include maintenance reserve (covers repairs and tires), insurance escrow, trailer escrow, end-of-lease balloon, and accident deductible reserve. The typical range is $100-$400/week per category, and a lease-on operator may have multiple escrow buckets running in parallel.\n\nFMCSA 49 CFR 376.12(k) requires the lease to specify what the escrow is for, how it accumulates, and the refund terms at lease termination. Carriers must provide quarterly accounting of escrow balances so the operator can verify what is being held. Escrow is the operator's money in legal terms — the carrier holds it in trust, not as carrier revenue. The lease must also specify how interest (if any) on escrow funds is handled and the timeline for refunding the balance after termination, which is commonly 45 days.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Disputes over escrow deductions are one of the most common lease-on and lease-purchase grievances. Escrow that isn't refunded at lease termination is a recurring late-stage problem in lease-purchase failures, which themselves fail 80%+ of the time. For lease-on operators, tracking escrow accumulation and verifying balances against the carrier's quarterly reports is critical — a $200/week reserve adds up to $10,400/year that the operator should be able to account for. Some carriers misapply escrow deductions, either through sloppy accounting or intentionally, so the lease terms must be read carefully before signing. Lender underwriting treats unrecoverable escrow as a working-capital risk, which can affect approval for first-time owner-operator loans.",
      },
    ],
    relatedTerms: ["settlement-statement", "lease-purchase", "maintenance-escrow", "lease-on-driver"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
    ],
  },
  {
    slug: "fuel-advance",
    term: "Fuel Advance",
    category: "driver-life-work",
    shortDefinition:
      "Cash advance from a carrier or factoring company against the operator's next pay or invoice, specifically for fuel purchases; typically 25-50% of expected pay.",
    sections: [
      {
        h2: "What it is",
        body:
          "A fuel advance is a cash advance specifically for fuel purchases, taken against the operator's next settlement (carrier-side) or next factored invoice (factoring-side). Carrier fuel advances are typically 25-50% of expected weekly pay, deducted from the next settlement. Factoring company fuel advances are given via a Visa fuel card with a limit set against the expected advance on outstanding invoices. There's usually no separate APR — the underlying factoring fee or settlement deduction covers the cost of the advance.\n\nCommon features include pump card integration with major truck stops, real-time available balance displayed in the carrier's or factor's app, and exclusion of non-fuel purchases (no candy bars, no apparel — only diesel and DEF). Some fuel cards bundle discounts at participating chains like Pilot Flying J, Love's, and TA-Petro, which can save 5-15 cents per gallon over cash pump price. The advance is settled against either the next settlement or the invoice payment, with the fuel-card balance netted out automatically.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For new operators, fuel advances are the cash-flow bridge between dispatch and delivery — without them, the operator may not be able to fuel the truck to complete the load. Some factoring companies (Apex, eCapital, and others) integrate fuel cards as standard onboarding, which is part of their value proposition for new authorities. Settlement-statement audit should verify fuel advances are correctly netted against the deductions on the corresponding pay period. Abuse of fuel advances — drawing more than needed — is a leading cause of cash-flow problems for new operators who hit the next settlement with a thin net.",
      },
    ],
    relatedTerms: ["settlement-statement", "advance-rate", "lease-on-driver"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "maintenance-escrow",
    term: "Maintenance Escrow",
    category: "driver-life-work",
    shortDefinition:
      "Specific escrow category covering anticipated maintenance and repair costs; typically $100-$250/week deducted by carriers from lease-on operators' pay.",
    sections: [
      {
        h2: "What it is",
        body:
          "Maintenance escrow is the portion of escrow deductions allocated specifically to maintenance and repair costs. The typical range is $100-$250/week for Class 8 OTR operations, and it covers scheduled maintenance (oil changes, brake pads, tires), unscheduled repairs (engine, transmission, exhaust), DOT inspection prep, and accident-related repair deductible. Some carriers manage maintenance escrow as a balance the operator can draw against — the operator submits an invoice, the carrier deducts it from the maintenance escrow balance. Others use it as an accrual for expected costs and pay maintenance directly without operator draw rights.\n\nFMCSA 49 CFR 376.12(j) requires the lease to specify how maintenance responsibilities are split between operator and carrier. The split is the heart of the maintenance economics: who pays for tires, who pays for major engine work, who pays for trailer damage. A poorly-written maintenance clause can put the operator on the hook for expenses they assumed the carrier covered.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Maintenance escrow at $200/week × 52 weeks = $10,400/year — meaningful budget that often gets eroded by emergency repairs on used Class 8 tractors past warranty. Tracking actual maintenance spend vs. escrow accumulated reveals whether the operator is under- or over-budgeting, and whether the carrier's required reserve is realistic for the equipment age. For independent owner-operators (not lease-on), the equivalent is a self-managed maintenance fund — same purpose, no carrier intermediation, but the same discipline is needed to avoid funding repairs from cash flow that should be paying the truck note. Insurance carriers don't directly use maintenance escrow but well-maintained trucks correlate with fewer claims, which over time affects renewal pricing. Lender underwriting for truck repair loans sometimes looks favorably at evidence of an existing maintenance reserve.",
      },
    ],
    relatedTerms: ["escrow-deductions", "settlement-statement", "lease-on-driver"],
    relatedProducts: [
      { url: "/truck-repair-loans", label: "Truck repair loans" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "bobtail-pay",
    term: "Bobtail Pay",
    category: "driver-life-work",
    shortDefinition:
      "Compensation paid to a driver for moving the tractor without a trailer (bobtail movement); covers fuel and time for repositioning runs.",
    sections: [
      {
        h2: "What it is",
        body:
          "Bobtail pay is compensation for moving the tractor without a trailer — \"bobtailing.\" Common scenarios include dropping off a trailer at a customer and repositioning to pick up another, returning the tractor to home base after a one-way load, and repositioning for maintenance. Typical rates run $1.00-$1.50/mile (lower than loaded freight because there's no revenue load attached to the movement), and some carriers pay a flat per-bobtail-event of $100-$200 instead of per-mile.\n\nNot all carriers pay bobtail miles. Owner-operators with their own authority absorb the bobtail miles as deadhead cost — the movement is part of running the business, not a separately billable event. FMCSA classifies bobtail miles as commercial-vehicle miles for HOS and IFTA purposes even without freight, so the operator burns the same hours-of-service and accrues the same IFTA mileage as a loaded run. The legal status of the movement matters for insurance: bobtail under dispatch is covered by the carrier's primary liability, but bobtail not under dispatch requires non-trucking liability (NTL) coverage.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For lease-on operators, knowing whether the carrier pays bobtail and at what rate affects the actual take-home — bobtail without compensation is essentially carrier-mandated deadhead. For independent owner-operators, bobtail miles are the same as deadhead: fuel cost without revenue, which needs to be priced into the loaded-mile rate. Insurance pricing reflects bobtail exposure through NTL coverage for lease-on operators, which adds $20-$50/month to the operator's costs. Lender underwriting doesn't directly price bobtail policy, but high bobtail percentage on a carrier's settlement statements is a signal of weak dispatch — the carrier is sending the truck around empty rather than chaining loads efficiently, which compresses the operator's net pay over time.",
      },
    ],
    relatedTerms: ["deadhead", "non-trucking-liability", "lease-on-driver", "settlement-statement"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "detention-pay-policy",
    term: "Detention Pay Policy",
    category: "driver-life-work",
    shortDefinition:
      "Carrier or broker-specific policy defining when, how, and how much detention pay is owed; varies widely from formal contracts to ad hoc claims.",
    sections: [
      {
        h2: "What it is",
        body:
          "Detention pay policy is the carrier-side or broker-side policy governing detention payments. Common patterns include 2 hours free at pickup and delivery, then $25-$75/hour after. Some brokers don't pay detention at all (a meaningful signal of a bad relationship), some pay automatically based on geofence timestamps from the dispatch app, and some require manual claim submission with shipper sign-off. Carrier policy for lease-on operators determines whether the operator gets 100% of detention or a percentage — some carriers retain a slice of detention on the theory that they're billing the customer.\n\nDocumentation requirements typically include timestamp records (driver app or paper log), driver's report, and dispatch sign-off. The claim window is usually 7-14 days from delivery, after which the broker can refuse the claim regardless of merit. The strongest detention terms come from rate confirmations that explicitly spell out the policy by load, not from generic broker T&Cs.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Detention is one of the largest accessorial-pay categories — a 4-hour unload at $50/hour adds $200 to the load, often making a marginal load profitable. Tracking detention collection rates by broker reveals which broker relationships are actually profitable vs. paper-profitable: a broker who pays the headline rate but never approves detention is worse than a broker with a lower rate and clean detention payments. For lease-on operators, understanding how the carrier passes through detention (or doesn't) affects the value proposition vs. running independent authority. Prolonged detention also stresses the 14-hour HOS window and can indirectly affect driver fatigue claims with insurance, which underwriters factor into renewal pricing.",
      },
    ],
    relatedTerms: ["detention", "accessorial-charges", "tonu", "layover"],
    relatedProducts: [
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "guaranteed-pay",
    term: "Guaranteed Pay",
    category: "driver-life-work",
    shortDefinition:
      "Carrier compensation structure ensuring a minimum weekly amount regardless of actual miles driven; common in dedicated and high-priority operations.",
    sections: [
      {
        h2: "What it is",
        body:
          "Guaranteed pay is a compensation structure that guarantees a minimum amount regardless of actual mileage or revenue produced. It's common in dedicated operations (Walmart, Amazon, Target lanes), team operations on premium lanes, and expedited freight where the carrier needs the driver available even when the freight gap is short. Typical implementations include company drivers guaranteed $1,500-$2,500/week and owner-operators guaranteed $1.20-$1.50/mile minimum, with the carrier filling in the difference if the operator's actual paid miles fall short.\n\nThe trade-off is lower upside on volatile spot freight in exchange for downside protection. In a tight freight market, spot rates may exceed the guaranteed pay floor, and the operator earns less than they would have running independent authority. Carriers offer guaranteed pay as a retention lever in tight driver-supply markets — when freight is moving fast and drivers can pick their carrier, guaranteed pay is the carrier's promise that the operator doesn't bear the carrier's dispatch risk. Common features include a minimum-pay floor, sometimes a maximum-pay ceiling, and tenure-based step increases.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For risk-averse owner-operators, guaranteed pay structures (typically requiring lease-on with a carrier) provide cash-flow stability that spot-market operations lack — the same predictability that lenders prefer. Lender underwriting treats guaranteed-pay revenue more favorably than spot-only revenue because of the stability, which can translate to better loan terms or higher approved amounts on equipment and working-capital products. Insurance pricing is unchanged by guaranteed pay status, but the operational predictability indirectly affects claim frequency through more rested drivers and fewer rate-induced rushes. The downside trade is real: dedicated and guaranteed-pay operators rarely see the upside of strong spot markets, so the long-run economics depend on which freight cycle the operator commits to.",
      },
    ],
    relatedTerms: ["cents-per-mile-pay", "percentage-of-line-haul", "dedicated"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "safety-bonus",
    term: "Safety Bonus",
    category: "driver-life-work",
    shortDefinition:
      "Carrier-paid bonus tied to driver safety metrics (CSA improvements, accident-free quarters, telematics scorecard); typically $500-$3,000/quarter.",
    sections: [
      {
        h2: "What it is",
        body:
          "Safety bonus is a bonus payment tied to driver safety performance metrics. Common metrics include clean roadside inspections, no preventable accidents, telematics scorecard scores (hard braking, speeding, lane departures), and CSA BASICs at safe levels. Payment intervals are monthly, quarterly, or annual depending on the carrier. Typical amounts run $500-$3,000/quarter for company drivers, smaller for lease-on operators since their economics already partly capture the upside through lower insurance.\n\nCarriers use safety bonuses to align driver behavior with insurance and operational outcomes. The bonus often pays back through lower insurance premiums (insurance carriers reward fleets with low loss ratios) and reduced accident-claim severity (better-driven trucks have less serious crashes). The metric design matters more than the dollar amount — a bonus tied to lagging indicators like accident-free quarters rewards luck as much as skill, while a bonus tied to leading indicators like telematics scorecards rewards behaviors the driver can actually control.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Safety bonuses are the carrier's mechanism for sharing the ROI of safer driving with drivers. For owner-operators, the analog is direct: safe driving leads to lower insurance premiums (CSA-driven), broader broker access (CSA-screened load boards), and lower per-claim cost when something does happen. Understanding the carrier's safety bonus structure during lease-on negotiations reveals whether the carrier values safety culture or treats safety as a cost center — a strong bonus program usually correlates with strong dispatch hygiene and lower turnover. Insurance carriers offer fleet discounts that mirror this dynamic, and lenders treat carriers with documented safety programs as lower default risk on equipment financing across the fleet.",
      },
    ],
    relatedTerms: ["csa-score", "ai-dash-cam", "driver-scorecard"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "referral-bonus",
    term: "Referral Bonus",
    category: "driver-life-work",
    shortDefinition:
      "Carrier-paid bonus for referring qualified drivers; typically $500-$5,000 paid after the referred driver completes a probationary period.",
    sections: [
      {
        h2: "What it is",
        body:
          "Referral bonus is a bonus paid to existing drivers — company drivers or lease-on operators — for referring new drivers who join the carrier. Typical amounts range from $500-$5,000 depending on the carrier and the freight-class scarcity (hazmat tanker referrals pay more than dry van). The structure is usually split across milestones: first paycheck, 90-day completion, 1-year anniversary, ensuring the referrer is paid only if the referred driver actually sticks.\n\nSome carriers pay refer-and-stay bonuses to incentivize the existing driver to remain through the new driver's onboarding — both get paid only if both are still there at 90 days. Referral bonus is not the same as sign-on bonus (paid to the new driver) or retention bonus (paid to existing drivers for staying past a milestone). The three programs often run in parallel at large carriers, and a driver moving between carriers can sometimes stack them by joining via referral from an existing employee.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Referral bonuses are part of the broader driver-recruitment economics that carriers run. For owner-operators considering lease-on relationships, understanding the carrier's recruitment culture (high turnover, high referral bonuses, high sign-on bonuses) is a signal of operational stress — carriers paying heavily to recruit are usually carriers losing drivers fast. Carrier-level retention metrics indirectly affect operator stability: high-turnover carriers often have systemic operational issues (poor freight, bad dispatch, weak hometime) that hit lease-on operators too, not just company drivers. Lender underwriting for lease-on operators sometimes references carrier-stability data when assessing revenue continuity, since an operator tied to a struggling carrier inherits the carrier's freight risk.",
      },
    ],
    relatedTerms: ["company-driver", "lease-on-driver", "cents-per-mile-pay"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "orientation-pay",
    term: "Orientation Pay",
    category: "driver-life-work",
    shortDefinition:
      "Compensation paid to a new driver during the carrier orientation period (typically 2-7 days), covering training, paperwork, and DOT drug testing.",
    sections: [
      {
        h2: "What it is",
        body:
          "Orientation pay is compensation during the carrier's onboarding period. Typical duration is 2-7 days depending on carrier complexity and freight class. The orientation covers company-specific training (safety procedures, equipment handling), paperwork (W-4 or 1099, direct deposit, ELD setup), DOT drug and alcohol testing, road-testing in the carrier's equipment, and equipment assignment. The payment range is $100-$200/day for company drivers, paid as a flat day rate that doesn't change whether orientation runs short or long.\n\nLease-on operators sometimes receive lower orientation pay (or none) on the theory that they're contractors, not employees, and the orientation is a cost of business they should absorb. Some carriers cover lease-on operators' lodging during orientation but pay no per diem, which means the operator is sitting in a hotel earning nothing. Orientation pay is not the same as sign-on bonus (paid for joining) or referral bonus (paid to the referrer of the new driver) — those are recruitment incentives, while orientation pay covers actual time spent.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For drivers transitioning between carriers, orientation pay levels affect actual income during the gap between jobs — a week of unpaid orientation is a week of missed revenue. Carriers competing for drivers in tight markets sometimes offer premium orientation pay of $250-$400/day as a retention lever. For owner-operators considering lease-on, the orientation experience reveals the carrier's operational culture in concentrated form: chaotic orientation usually correlates with chaotic ongoing operations, and operators who sit through a disorganized week of paperwork should treat it as a warning signal before signing the lease.",
      },
    ],
    relatedTerms: ["company-driver", "lease-on-driver", "cdl-class-a"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "trip-sheet",
    term: "Trip Sheet",
    category: "driver-life-work",
    shortDefinition:
      "Driver-maintained record of load details, fuel purchases, miles driven by state, and expenses for a single trip; supports IFTA and tax reporting.",
    sections: [
      {
        h2: "What it is",
        body:
          "A trip sheet is a single-trip record kept by the driver covering load details (broker, BOL number, pickup and delivery locations, freight type, weight, rate), miles driven by state (for IFTA), fuel purchases (date, location, gallons, price), tolls, accessorial expenses (lumper, dock fees), detention timestamps, and layover events. Historically paper-based, trip sheets are increasingly software-driven through tools like Trucker Path, dispatch apps, and ELD integrations that pull most of the data automatically.\n\nSome factoring companies require trip sheet data as part of invoice submission — the sheet substantiates the load and helps verify the BOL signature before the advance is funded. For tax purposes, trip sheets substantiate per-diem days, mileage-by-state, and expense deductions on Schedule C. The IRS treats per-diem and IFTA mileage as audit-vulnerable categories, and a clean trip-sheet record is the operator's defense if the numbers are questioned. Modern ELD systems generate most of the trip sheet data automatically, but the operator's narrative entries (load details, expense receipts) still require discipline.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Trip sheets are the source-document for IFTA mileage reporting and per-diem deduction claims — both audit-vulnerable categories where the IRS and state DOTs can claw back deductions without supporting records. Lender underwriting for owner-operators benefits from clean trip-sheet records as evidence of operational discipline; sloppy record-keeping is a real signal of business immaturity even when revenue looks fine on the bank statements. Factoring companies that integrate trip-sheet data into invoice submission reduce friction in advance approvals because the load documentation is already attached and verifiable. Insurance carriers don't directly review trip sheets but the operational discipline they reflect correlates with safer driving over the policy term.",
      },
    ],
    relatedTerms: ["mileage-log", "ifta", "per-diem", "schedule-c"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "carrier-deduction",
    term: "Carrier Deduction",
    category: "driver-life-work",
    shortDefinition:
      "Any deduction taken by a motor carrier from a lease-on owner-operator's settlement; includes fuel, escrow, insurance, dispatch, communications, and miscellaneous.",
    sections: [
      {
        h2: "What it is",
        body:
          "Carrier deduction is any deduction taken by a carrier from a lease-on owner-operator's gross revenue. Common categories include fuel (weekly fuel-card purchases), insurance (primary, cargo, and occupational accident shares), escrow (maintenance reserve, accident deductible reserve), dispatch fee (if applicable), communications (ELD subscription, dispatch app), trailer rental, plate amortization, accident damage, drug test fees, and orientation cost recovery. Total carrier deductions can run 20-40% of gross for lease-on operators, which is the gap between the headline percentage-of-line-haul and the actual net pay.\n\nFMCSA 49 CFR 376.12 governs the disclosure of these deductions in the lease — every category, the amount, the calculation method, and the refund terms must appear in the lease for the operator to consent to. Some deductions are recurring (weekly insurance), some are event-driven (accident damage), and some are amortized (plate cost spread across the year). The lease should also specify what happens to deductions if the operator's revenue runs short — does the deduction carry over, get waived, or accrue as carrier debt.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Carrier deductions are the difference between gross revenue and actual take-home for lease-on operators — a 72% line-haul rate net of 30% in deductions yields meaningfully less than the headline suggests. Auditing settlement statements for accurate deduction amounts is a real-money activity, and some carriers misapply deductions (charging items twice, charging items that should be the carrier's responsibility per the lease) — corrections add up over a year. Lender underwriting for lease-on operators uses net settlement amounts (post-deductions) as the meaningful revenue figure, not gross. Understanding the full deduction structure is part of the decision to stay lease-on vs. file own authority.",
      },
    ],
    relatedTerms: ["settlement-statement", "escrow-deductions", "lease-on-driver", "dispatch-fee"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
];
