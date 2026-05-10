import "server-only";
import type { GlossaryTerm } from "./types";

/* Tax & accounting terms (per diem, MACRS, Section 179, quarterly
   estimated taxes, self-employment tax, Schedule C, 1099-NEC,
   independent-contractor classification, fuel tax credit, actual vs
   mileage, tax home, mileage log). Populated by agent G9. */

export const TAX_ACCOUNTING_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "per-diem",
    term: "Per Diem",
    category: "tax-and-accounting",
    shortDefinition:
      "Daily meal & incidental expense allowance ($69 in 2026) that truck drivers can deduct from taxable income; 80% deductible for transportation workers.",
    sections: [
      {
        h2: "What it is",
        body:
          "Per diem is the daily meal and incidental expense (M&IE) allowance the IRS lets truck drivers deduct when they're working away from their tax home. The 2026 IRS rate is $69 per day within the continental US, and $74 per partial day on travel-start and travel-end days. Transportation workers — truckers, airline crews, mariners — get a special carve-out under IRC Section 274(n): the deduction runs at 80% of the daily rate, not the 50% that applies to other businesses entertaining clients over meals.\n\nSelf-employed owner-operators claim per diem on Schedule C. W-2 company drivers cannot deduct per diem out-of-pocket under the Tax Cuts and Jobs Act (TCJA, 2018–2025), but many carriers offer \"per-diem pay\" programs that route a portion of W-2 compensation as a non-taxable reimbursement instead. The deduction requires staying overnight away from the tax home on business; it cannot be claimed for partial-day local trips or for drivers who have no fixed tax home.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For an owner-operator running 250 days per year away from tax home, the per diem deduction works out to $69 × 250 × 80% = $13,800 of taxable-income reduction — a meaningful tax savings at a 22% federal + 15.3% SE marginal rate, roughly $5,150 back in the operator's pocket. Failure to track per-diem days properly costs operators thousands annually in unclaimed deductions. Logbook records (paper or ELD) documenting overnight stays away from tax home are the audit defense. Lenders rarely care about per diem directly, but tax returns showing strong gross revenue with proper deductions signal an operationally mature business.",
      },
    ],
    relatedTerms: ["truck-driver-tax-home", "self-employment-tax", "schedule-c", "mileage-log"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "macrs-depreciation",
    term: "MACRS Depreciation",
    abbreviation: "MACRS",
    termCode: "MACRS",
    category: "tax-and-accounting",
    shortDefinition:
      "Modified Accelerated Cost Recovery System — IRS depreciation method for business assets; semi trucks depreciate over 3 years on a 200% declining balance.",
    sections: [
      {
        h2: "What it is",
        body:
          "MACRS stands for the Modified Accelerated Cost Recovery System — the standard IRS depreciation method for business assets placed in service after 1986. Semi trucks (heavy commercial vehicles over 26,001 lbs GVWR) are classified as 3-year property under MACRS. Light trucks under 26,000 lbs are 5-year property. The default method for trucks is 200% declining balance (DDB), which front-loads depreciation into the early years of the asset's life. The half-year convention applies to the year the asset is placed in service.\n\nThe alternative method is straight-line depreciation — slower and simpler, sometimes elected for tax-planning reasons. MACRS is not the same as Section 179 (immediate expensing) or bonus depreciation (a separate accelerator). All three can interact in the year of purchase: an operator can elect Section 179 up to the income limit, layer on bonus depreciation, and depreciate any remaining basis under MACRS over the recovery period.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For an owner-operator buying a truck, MACRS is one of the biggest tax shields available — a $130K Class 8 tractor depreciates roughly $43K Year 1, $58K Year 2, $19K Year 3 under DDB. Depreciation creates a paper loss that reduces taxable income even when cash flow is positive. Lenders treat depreciation as a non-cash expense in cash-flow analysis (add it back to net income). Important: depreciation recapture applies if you sell the truck for more than its depreciated basis — the gain is taxed as ordinary income up to the recapture limit, which can sting at trade-in.",
      },
    ],
    relatedTerms: ["section-179", "equipment-loan", "schedule-c"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/semi-truck-financing", label: "Semi truck financing" },
    ],
  },
  {
    slug: "section-179",
    term: "Section 179",
    category: "tax-and-accounting",
    shortDefinition:
      "IRS provision allowing immediate expense deduction of up to $1.16M (2026) on qualifying business assets in the year placed in service.",
    sections: [
      {
        h2: "What it is",
        body:
          "Section 179 is the IRS Internal Revenue Code provision that lets businesses immediately expense — rather than depreciate over multiple years — the cost of qualifying business assets in the year they're placed in service. The 2026 deduction limit is $1,160,000, with a phase-out beginning at $2,890,000 of total Section 179 spending. Qualifying assets are tangible personal property used in business: trucks, trailers, equipment, machinery, computers, off-the-shelf software.\n\nCommercial trucks are eligible. The election is made on IRS Form 4562. The single biggest restriction: Section 179 cannot create a net tax loss — the deduction is limited to business income, with any excess carried forward. Bonus depreciation (a separate but stackable acceleration) can layer on top of Section 179 for additional Year-1 deduction; bonus depreciation is at 60% in 2026 and phasing down on a published schedule.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For owner-operators buying a truck, Section 179 lets them expense the entire purchase price in Year 1 instead of spreading depreciation over 3 years. On a $130K truck, that's $130K of taxable-income reduction immediately — potentially $30–40K in federal taxes saved for owner-ops in higher brackets. Combined with bonus depreciation, the Year-1 deduction can be even larger. The catch: Section 179 cannot create a net loss, so operators with modest revenue must use MACRS instead. Consult a CPA familiar with trucking tax before electing — the wrong election in the wrong year can leave money on the table.",
      },
    ],
    relatedTerms: ["macrs-depreciation", "schedule-c", "equipment-loan"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/semi-truck-financing", label: "Semi truck financing" },
    ],
  },
  {
    slug: "quarterly-estimated-taxes",
    term: "Quarterly Estimated Taxes",
    abbreviation: "1040-ES",
    termCode: "1040-ES",
    category: "tax-and-accounting",
    shortDefinition:
      "Federal estimated tax payments due quarterly (April, June, September, January) for self-employed taxpayers including owner-operators.",
    sections: [
      {
        h2: "What it is",
        body:
          "Quarterly estimated taxes are federal tax payments due four times per year for self-employed taxpayers — and for W-2 earners with substantial under-withheld additional income. The 2026 due dates are April 15, June 15, September 15, and January 15 of the following year. Payments are filed on IRS Form 1040-ES. The calculation includes both federal income tax and self-employment tax (15.3% combined Social Security and Medicare).\n\nThe IRS safe-harbor rule lets a taxpayer avoid underpayment penalty by paying 100% of the prior year's total tax (110% if AGI was over $150K). Underpayment penalty in 2026 runs at roughly 8% annualized interest, calculated quarter-by-quarter on the shortfall. State estimated taxes are due on a parallel schedule for most states with an income tax. Owner-operators new to self-employment routinely underestimate the combined federal-plus-SE-plus-state burden in their first year.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Owner-operators who fail to pay quarterly often face $2,000–$5,000+ in penalties at year-end. The 15.3% self-employment tax catches first-year operators off guard — it's on top of federal income tax. Calendar these dates. Many operators set up a separate \"tax savings\" bank account funded monthly at 25–30% of net income to cover the quarterly payments. Underestimated taxes drain working capital and can force operators into MCA or working-capital loans to bridge the cash crunch — turning a $4,000 tax shortfall into a $5,500 borrowing cost.",
      },
    ],
    relatedTerms: ["self-employment-tax", "schedule-c", "1099-nec"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "self-employment-tax",
    term: "Self-Employment Tax",
    abbreviation: "SE Tax",
    termCode: "SE Tax",
    category: "tax-and-accounting",
    shortDefinition:
      "15.3% federal tax on net self-employment income (12.4% Social Security + 2.9% Medicare); paid by sole proprietors, partners, and LLC owner-operators.",
    sections: [
      {
        h2: "What it is",
        body:
          "Self-Employment (SE) Tax is a 15.3% federal tax on net self-employment income. It consists of 12.4% Social Security (capped at the $168,600 wage base in 2026) plus 2.9% Medicare (no cap, with an additional 0.9% Medicare surtax kicking in above $200K AGI for single filers). Sole proprietors, partners, and LLC members pay SE tax; S-corp owners pay through payroll instead, a different and often lower-net structure.\n\nSE tax is calculated on Schedule SE and reported on Form 1040. One-half of SE tax is deductible as an above-the-line adjustment on Form 1040 — that deduction partially offsets the regressivity of the tax. SE tax is in addition to federal and state income taxes; it is not a substitute. For most owner-operators filing as sole proprietors or single-member LLCs, SE tax is the largest single federal-tax line item on a profitable year.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "SE tax is the most underappreciated cost of self-employment for new owner-operators — many calculate their take-home assuming they'll pay only regular income tax, then are shocked by the 15.3% SE adder. On $80K of net profit, SE tax alone is $12,240. The financial-planning implication: budget at least 30–35% of net income for federal taxes (income + SE). Some owner-ops elect S-corp status to reduce SE tax through a reasonable-salary + distribution structure (consult a CPA — IRS scrutinizes unreasonably low salaries). Lenders evaluating owner-op tax returns understand SE tax as part of normal operating cost.",
      },
    ],
    relatedTerms: ["quarterly-estimated-taxes", "schedule-c", "independent-contractor-classification"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "schedule-c",
    term: "Schedule C",
    abbreviation: "Schedule C",
    termCode: "Schedule C",
    category: "tax-and-accounting",
    shortDefinition:
      "IRS Form 1040 Schedule C — Profit or Loss from Business; used by sole-proprietor owner-operators to report business revenue, expenses, and net profit.",
    sections: [
      {
        h2: "What it is",
        body:
          "Schedule C is the IRS Form 1040 attachment used by sole-proprietor businesses — including independent owner-operators operating as sole props or single-member LLCs taxed as disregarded entities. It reports gross revenue, business expenses, and net profit. Typical trucking expense lines include fuel, maintenance and repairs, depreciation, insurance, factoring fees, interest on equipment loans, IFTA and IRP, UCR registration, BOC-3 process agents, ELD subscriptions, dispatch fees, taxes and licenses, communication, and professional services.\n\nNet profit from Schedule C flows two places: to the Form 1040 income line, and to Schedule SE for self-employment tax calculation. Common Schedule C trucker deductions include per diem, depreciation or Section 179 expensing, fuel, repairs, supplies, and travel away from tax home. Schedule C is not used by S-corps or C-corps — they file separate entity returns (Form 1120-S or Form 1120).",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Schedule C is the trucker's primary tax document — getting the deductions right reduces both income tax and SE tax simultaneously, a unique double-benefit that doesn't apply to W-2 deductions. Lenders evaluating owner-operators almost always request 2–3 years of personal tax returns including Schedule C as part of underwriting. A clean, well-organized Schedule C signals operational maturity to both auditors and lenders. Missed deductions (per diem, depreciation, factoring fees) are real money — a $5K missed deduction at a marginal 22% federal + 15.3% SE rate equals $1,865 in extra tax. Multiply across years of sloppy bookkeeping and the number gets serious fast.",
      },
    ],
    relatedTerms: ["quarterly-estimated-taxes", "self-employment-tax", "per-diem", "macrs-depreciation"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "mileage-log",
    term: "Mileage Log",
    category: "tax-and-accounting",
    shortDefinition:
      "Daily record of miles driven, route, purpose, and odometer readings; required for tax deduction support and IFTA reporting.",
    sections: [
      {
        h2: "What it is",
        body:
          "A mileage log is a contemporaneous record of business miles driven. The IRS requires it to substantiate vehicle expense deductions under either the standard-mileage method or the actual-expense method. Typical fields: date, start odometer, end odometer, business purpose, destination, and total miles. For truckers, IFTA reporting adds an additional layer — mileage broken out by jurisdiction (state and Canadian province) is required separately from income-tax substantiation.\n\nELD systems often generate mileage logs automatically that can be exported in IFTA-ready format. The IRS requires contemporaneous documentation — logs created at the time of the trip, not reconstructed later. Reconstructed logs are routinely rejected in audits, and the operator loses the deductions tied to them. Retention: 4 years for IFTA, 3–7 years for income tax depending on the deduction type and whether substantial understatement is at issue.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Inadequate mileage logs are the #1 cause of failed audits for owner-operators. IFTA audits specifically target mileage-by-state inconsistencies — ELD data, fuel receipts, and state DMV registration data must triangulate within tight tolerances or the auditor assesses additional fuel tax plus penalty. Lenders rarely audit mileage logs directly, but a sloppy operator with weak records is harder to underwrite — and a CPA who can't tie out mileage often can't tie out revenue or deductions either. Modern ELD + IFTA software automates most of this; operators still on paper logs leave money on the table in unclaimed deductions and pay more in tax-prep fees as their CPA reconstructs what the software should have captured.",
      },
    ],
    relatedTerms: ["ifta", "ach", "actual-expenses-vs-mileage"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "1099-nec",
    term: "1099-NEC",
    abbreviation: "1099-NEC",
    termCode: "1099-NEC",
    category: "tax-and-accounting",
    shortDefinition:
      "IRS Form 1099-NEC reports non-employee compensation paid to independent contractors; brokers issue 1099-NEC to carriers who received $600+ in a year.",
    sections: [
      {
        h2: "What it is",
        body:
          "Form 1099-NEC (Nonemployee Compensation) is the IRS form that replaced 1099-MISC Box 7 starting in tax year 2020. Brokers, motor carriers, and shippers issue 1099-NEC to independent contractors and to other businesses with payments aggregating $600 or more for the year. It reports the gross payment received. The recipient deadline is January 31, and the IRS deadline is January 31 (paper) or March 31 (electronic).\n\nTypical trucking flow: a broker pays a carrier across the tax year, then files 1099-NEC for the total. The carrier reports 1099-NEC income on Schedule C. Lease-on owner-operators receive 1099-NEC from their carrier. Corporations (S-corp or C-corp) are generally exempt from receiving 1099-NEC — a carve-out that is one reason some owner-ops elect corporate status.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Reconciling 1099-NECs against bank deposits and factoring statements is a year-end requirement for owner-operators. Mismatches trigger IRS notices and CP-2000 matching letters that take months to resolve and can push back a tax refund. Brokers occasionally issue 1099-NECs to the wrong entity (operator's personal name vs LLC) or wrong tax year — catching these in January saves headaches in April; once a 1099 is filed with the IRS, getting it corrected requires the broker to file a corrected 1099, not the carrier. Lenders evaluating owner-operators sometimes request 1099-NECs alongside tax returns to verify revenue claimed. Underreporting 1099-NEC income is one of the highest-risk audit triggers in self-employment tax compliance.",
      },
    ],
    relatedTerms: ["schedule-c", "independent-contractor-classification", "recourse-factoring"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "independent-contractor-classification",
    term: "Independent Contractor Classification",
    category: "tax-and-accounting",
    shortDefinition:
      "IRS, DOL, and state-level legal classification of worker as 1099 contractor (vs W-2 employee); test factors vary; misclassification is a major regulatory risk.",
    sections: [
      {
        h2: "What it is",
        body:
          "Independent contractor (IC) classification means the worker is treated as a 1099 contractor rather than a W-2 employee. The IRS uses a three-category common-law test (behavioral control, financial control, type of relationship). The Department of Labor uses a six-factor economic-reality test. State-level tests vary — California's AB 5 ABC test is the strictest in the country. For trucking, FMCSA regulations, state labor laws, and IRS rules can produce conflicting classifications for the same driver.\n\nCommon factors examined: who controls dispatch, who owns the equipment, who carries insurance, exclusive vs non-exclusive relationship, length of relationship, whether the driver advertises services to multiple carriers. Misclassification penalties include IRS back-taxes (the W-2 portion of FICA the employer should have paid), state unemployment back-payments, and DOL wage-and-hour violations. Class actions over classification have produced multi-million-dollar judgments against trucking carriers.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For lease-on owner-operators, classification matters: as 1099 ICs they get Schedule C deductions and the self-employment tax burden; as W-2 employees they get less flexibility and fewer deductions, but worker's comp and unemployment access. California AB 5 has triggered nationwide trucking lawsuits over classification, and similar legislation has surfaced in New Jersey, Massachusetts, and Washington. Some major carriers have shifted to all-W-2 models to reduce classification risk. Insurance and lender treatment differs sharply by classification — IC owner-ops access factoring and equipment financing; W-2 drivers can't, because there's no business entity to lend to.",
      },
    ],
    relatedTerms: ["lease-on-driver", "company-driver", "owner-operator", "1099-nec"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "fuel-tax-credit",
    term: "Fuel Tax Credit",
    category: "tax-and-accounting",
    shortDefinition:
      "Federal tax credit (Form 4136) refunding excise tax on fuel used for off-highway business purposes; minor for most truckers but valuable in niche operations.",
    sections: [
      {
        h2: "What it is",
        body:
          "The federal Fuel Tax Credit is a credit for federal excise tax paid on fuel used for nontaxable purposes. It is filed on IRS Form 4136 with the annual return. It applies to fuel used for off-highway business purposes: refrigeration units on stationary trailers, certain idle-time scenarios, and off-road construction equipment. The most common trucking application is reefer PTO (power take-off) operations, where diesel is consumed by the reefer unit rather than highway propulsion.\n\nRates vary by fuel type — diesel runs roughly 24.3 cents per gallon and gasoline roughly 18.3 cents per gallon as of 2026. Documentation requirements are strict: fuel receipts plus operational logs must substantiate the off-highway usage on a gallon-by-gallon basis. The IRS has flagged fraudulent fuel-tax-credit claims as a recurring abuse vector, so documentation discipline is essential — sloppy claims trigger audits.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For most OTR owner-operators, the fuel tax credit is minor or zero — all their fuel goes to highway propulsion and the credit doesn't apply. For reefer operators, the PTO fuel for the reefer unit is a real credit opportunity that's often missed — $0.24/gallon × reefer fuel can add up over a year of cold chain hauls. For fleet operators with significant idle time at customer sites waiting for unload, some idle fuel may qualify. Consult a trucking-specialty CPA before claiming significant fuel tax credits to ensure documentation is audit-defensible.",
      },
    ],
    relatedTerms: ["ifta", "reefer", "schedule-c"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "actual-expenses-vs-mileage",
    term: "Actual Expenses vs Standard Mileage",
    category: "tax-and-accounting",
    shortDefinition:
      "IRS allows two methods for deducting vehicle expenses: actual expenses (all costs) or standard mileage rate; truckers typically use actual expenses.",
    sections: [
      {
        h2: "What it is",
        body:
          "The IRS allows two methods for deducting business vehicle expenses. The standard mileage rate (2026: 67 cents per business mile) is the simpler method: multiply business miles by the rate, deduct the result. It bundles fuel, maintenance, depreciation, and most other vehicle costs into a single figure. The actual-expense method requires tracking every vehicle cost — fuel, maintenance, insurance, depreciation, repairs, interest on the equipment loan, license fees, IFTA, IRP — and deducting the business-use portion of each.\n\nTrucks over 6,000 lbs GVWR cannot use the standard mileage method — they must use actual expenses. For commercial trucking, actual expenses is essentially the only legal option and also almost always the better method economically, because the standard mileage rate is calibrated for passenger vehicles and significantly undervalues commercial truck costs. The method election is generally irrevocable for the life of the vehicle once made.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For commercial truckers, actual expenses is the only legal option — standard mileage doesn't apply to vehicles over 6,000 lbs GVWR. The discipline of tracking every truck-related expense is essential for both tax purposes and business management — operators who don't track operational costs can't calculate true CPM and can't tell when a lane is unprofitable. Lenders evaluating owner-operators expect to see actual-expense Schedule Cs as a sign of operational maturity. The 67 cents/mile rate is irrelevant for Class 8 trucks — the real operating cost is closer to $1.80–$2.30 per mile.",
      },
    ],
    relatedTerms: ["cpm", "schedule-c", "mileage-log", "macrs-depreciation"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "truck-driver-tax-home",
    term: "Tax Home",
    category: "tax-and-accounting",
    shortDefinition:
      "IRS-defined principal place of business; for truckers, typically the home base or domicile where the driver lives between trips.",
    sections: [
      {
        h2: "What it is",
        body:
          "Tax home is the IRS-defined principal place of business. For truckers, it is generally the city where the driver lives, has family ties, and maintains a permanent residence. Per diem deductions require being \"away from tax home\" overnight on business — so establishing a clear tax home is a prerequisite for the deduction. Truck drivers who have no fixed home and effectively live in the truck are considered \"itinerant\" under IRS rules and cannot claim per diem or unreimbursed travel expenses.\n\nTax home is different from legal domicile (the state of residence for state-tax purposes), though they often align. Establishing a clear tax home requires a permanent residence, a regular return pattern to that residence, and family or financial ties to one location. Documentation includes utility bills, lease or mortgage, vehicle registration, voter registration, driver's license, and ties to local financial accounts.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Drivers without a clear tax home lose per diem deductions worth $13K+ per year — the single largest avoidable tax leakage for an itinerant operator. An itinerant driver also can't deduct other work-related travel expenses, compounding the loss. For new owner-operators, establishing and documenting tax home is one of the most impactful tax decisions in the first year of business. State of tax home affects state income tax exposure — some operators relocate to tax-favorable states (TX, FL, TN, NV — no state income tax) when establishing their owner-op career, and the savings can run $3K–$8K per year on top of the federal per diem deduction.",
      },
    ],
    relatedTerms: ["per-diem", "schedule-c", "independent-contractor-classification"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
];
