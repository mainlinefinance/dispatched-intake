import "server-only";
import type { GlossaryTerm } from "./types";

/* Driver life & work terms (hometime, slip-seat, team driving, forced
   dispatch, sleeper berth, DOT physical, Drug & Alcohol Clearinghouse,
   pre-employment screening, pay models, lease-on driver, company driver).
   Populated by feat/seo-batch-5 agent G8. */

export const DRIVER_LIFE_WORK_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "hometime",
    term: "Hometime",
    category: "driver-life-work",
    shortDefinition:
      "Scheduled time a long-haul driver spends at home between OTR trips; varies by carrier and driver agreement, typically 2-4 days every 2-3 weeks.",
    sections: [
      {
        h2: "What it is",
        body:
          "Hometime is the scheduled time a driver spends at home between OTR trips, and it varies dramatically by carrier and driver agreement. OTR drivers commonly run 14–21 days out and 2–4 days home. Regional drivers are typically home weekly. Dedicated drivers — running a single shipper's lanes — are usually home weekends. There is no federal standard; the cadence is set entirely by the carrier's dispatch model and the driver's contract.\n\nCarriers compete on hometime as a recruitment lever. Better hometime correlates directly with lower driver turnover, and turnover at large carriers can run 90%+ annually, which makes every extra day of guaranteed home a real retention asset. Some carriers offer \"1 day off per 7 days out\" as a contractual minimum, with penalties or pay adjustments if the carrier overshoots a driver's hometime request. Hometime is consistently ranked as one of the top three reasons drivers quit a carrier — after pay and equipment quality.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For independent owner-operators, hometime is fully self-determined — they choose load patterns that fit their family life. For lease-on owner-operators, the carrier sets the dispatch pattern, which directly affects how much time the operator can be home. Lenders evaluating new authority operators sometimes consider expected hometime pattern because it affects revenue sustainability — drivers who overshoot hometime by working too hard burn out and exit the business, which is a real default risk. Insurance carriers don't price directly on hometime, but driver retention correlates with safer driving and lower claims frequency.",
      },
    ],
    relatedTerms: ["otr", "forced-dispatch", "sleeper-berth", "company-driver"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "slip-seat",
    term: "Slip-Seat",
    category: "driver-life-work",
    shortDefinition:
      "Operational model where multiple drivers share the same truck on alternating shifts, maximizing equipment utilization (60+ hours per truck per day).",
    sections: [
      {
        h2: "What it is",
        body:
          "Slip-seat is an operational model where multiple drivers share the same truck on rotating shifts — the truck is rarely idle because one driver runs while the other rests or has hometime. It's most common in regional and dedicated operations where the truck stays in a defined geography rather than running cross-country, which makes driver hand-offs logistically practical at a terminal or yard.\n\nSlip-seat trucks can run 80,000–130,000 miles per truck per year — comparable to a hard-running single-driver truck on raw miles, but the utilization curve is different. Where a single driver burns 10 hours of HOS and parks the truck for a 10-hour reset, the slip-seat truck keeps moving with the second driver. Some operators run \"slow start\" slip-seat where two drivers cover one truck's overnight and weekend gaps rather than full alternating shifts. Slip-seat requires careful HOS coordination between drivers and a maintenance discipline that single-driver operations can skip — the truck doesn't get a quiet weekend in the yard.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Slip-seat is a fleet-optimization play that single-truck owner-operators rarely use. For small fleet operators, slip-seat can increase revenue per truck by 20–40% but requires careful HOS management and a second driver who can be trusted with the equipment. Lender underwriting for fleets considers utilization patterns — slip-seat operations show stronger per-truck revenue history, which improves lending terms. Insurance pricing reflects the higher utilization, but the higher load count spreads premium across more loads, creating better per-mile economics.",
      },
    ],
    relatedTerms: ["team-driving", "company-driver", "hos", "otr"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "team-driving",
    term: "Team Driving",
    category: "driver-life-work",
    shortDefinition:
      "Two drivers alternating shifts in the same truck simultaneously, keeping the freight moving 18-20 hours per day; premium lanes pay 50%+ more than solo.",
    sections: [
      {
        h2: "What it is",
        body:
          "Team driving puts two drivers in the same truck simultaneously — while one drives, the other rests in the sleeper berth. The split-sleeper-berth provisions in HOS let each driver log split rest periods, which keeps the truck moving 18–20 hours per day vs. roughly 11 driving hours for a solo. The math is the appeal: a team truck covers nearly double the miles per week of a solo truck.\n\nTeam operations dominate expedited and time-critical freight — automotive just-in-time parts, urgent pharma and medical, aerospace, high-value time-definite loads. Team lanes typically pay 50–100% more per mile than solo lanes (the rate is per truck, split between the two drivers). Husband-wife teams are common because shared living conditions are easier among people who already share them. The pairing is also the weak point: team partnerships often fail because of personality conflicts under pressure — two people in 90 square feet for two weeks at a time is a real compatibility test. Equipment is standard sleeper-cab Class 8 with a high-spec berth.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Team operations have meaningfully different financing dynamics — higher revenue per truck but two driver salaries (if the drivers are not the owners). The doubled mileage drives faster equipment depreciation and earlier replacement cycles. Lender underwriting for team operations focuses on per-truck revenue against the higher operating cost structure. Insurance pricing reflects the higher miles and exposure but is often offset by the team-lane rate premium. Some factoring companies offer team-specific programs to match the faster cash-cycle needs.",
      },
    ],
    relatedTerms: ["slip-seat", "expedited", "sleeper-berth", "hos"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "forced-dispatch",
    term: "Forced Dispatch",
    category: "driver-life-work",
    shortDefinition:
      "Carrier policy requiring a driver to accept assigned loads or face disciplinary action; common at large fleets, contentious in lease-on arrangements.",
    sections: [
      {
        h2: "What it is",
        body:
          "Forced dispatch is a carrier policy that requires a driver to accept assigned loads — declining incurs disciplinary action up to termination. It's standard at large fleet carriers (Schneider, Werner, JB Hunt) for company drivers, where the carrier owns the truck and dictates the work. The driver's decision is essentially \"run this load or find another job.\"\n\nForced dispatch gets contentious in lease-on owner-operator arrangements because of misclassification risk. FMCSA classification rules and IRS scrutiny both treat forced dispatch as a signal of employee-like control — a true independent contractor is supposed to choose which loads to haul. Many large carriers structurally avoid the term \"forced dispatch\" in lease-on contracts while operationally requiring it through penalty clauses and dispatch-pattern enforcement. California AB 5 and similar state laws specifically target forced-dispatch arrangements as evidence of misclassification, and OOIDA has actively litigated forced-dispatch contracts as unenforceable for true independent contractors. The legal pressure has reshaped how many carriers write lease agreements.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For independent owner-operators with their own MC#, forced dispatch is irrelevant — they accept or decline loads at will. For lease-on operators, forced-dispatch policies materially affect take-home pay and lifestyle. Lenders evaluating lease-on operators sometimes investigate the dispatch model because operators trapped in forced dispatch with poor lanes burn out and exit, which is a real default risk. The dispatch model also affects classification — and a reclassification event can disrupt revenue mid-loan.",
      },
    ],
    relatedTerms: ["lease-on-driver", "company-driver", "owner-operator", "ooida"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "sleeper-berth",
    term: "Sleeper Berth",
    category: "driver-life-work",
    shortDefinition:
      "Compartment behind the cab where a driver sleeps; HOS regulations allow split rest periods (8/2 or 7/3) when berth is properly equipped.",
    sections: [
      {
        h2: "What it is",
        body:
          "A sleeper berth is the compartment behind the cab where a driver rests and sleeps. It's required equipment for OTR operations because of the HOS sleeper-berth provisions — drivers can't legally meet the 10-hour off-duty requirement in a day cab on a multi-day run. FMCSA defines minimum dimensions in 49 CFR 393.76: at least 75 inches long, 24 inches wide, and 24 inches between the top of the mattress and the inside of the berth cover.\n\nThe split-sleeper-berth provision (modernized in the 2020 HOS rule revision) lets a driver split the 10-hour rest into 8+2 or 7+3 hour periods, which is what makes team driving work and gives solo OTR drivers flexibility on tight delivery windows. Sleeper cabs are standard on Class 8 OTR tractors. Day cab tractors lack a berth and are used for shorter regional, local, and drayage runs where the driver goes home daily. Team operations depend on the berth for the non-driving partner's rest periods — without a properly-equipped berth, the team setup doesn't legally function.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Sleeper berth equipment quality directly affects driver health, retention, and accident rates — a poorly-equipped berth correlates with sleep deprivation and fatigue-related CSA violations. Lenders financing sleeper Class 8 tractors price slightly higher residuals than day cabs because of broader operator demand on the secondary market. Insurance pricing reflects the OTR profile (longer-haul, more miles, sleeper-berth use). For new owner-operators, choosing between sleeper and day cab affects both lifestyle and financing structure.",
      },
    ],
    relatedTerms: ["hos", "otr", "team-driving", "hometime"],
    relatedProducts: [
      { url: "/semi-truck-financing", label: "Semi truck financing" },
      { url: "/equipment-financing", label: "Equipment financing" },
    ],
  },
  {
    slug: "dot-physical",
    term: "DOT Physical",
    category: "driver-life-work",
    shortDefinition:
      "Medical examination required for commercial drivers by FMCSA, conducted by certified examiners; validity ranges from 3 months to 24 months based on health.",
    sections: [
      {
        h2: "What it is",
        body:
          "The DOT physical is the medical examination required for commercial drivers under FMCSA Part 391. It must be conducted by a medical examiner listed on the FMCSA National Registry of Certified Medical Examiners (NRCME) — a regular family physician can't sign off on it unless they've completed the federal certification.\n\nThe exam covers vision (20/40 corrected), hearing, blood pressure, urinalysis (sugar, protein, blood), cardiovascular and pulmonary function, range of motion, neurological assessment, and self-reported medical history. Typical cost runs $80–$150 and the exam takes 30–45 minutes. The result is the Medical Examiner's Certificate (MEDC card), which the driver self-submits to their state DMV to keep the CDL medically current. Standard validity is 24 months for healthy drivers, but the examiner can shorten the window to 3, 6, or 12 months for drivers with managed conditions — diabetes, hypertension, sleep apnea, cardiovascular issues. A shorter certificate isn't a disqualification; it's a tighter monitoring cycle.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "An expired DOT physical immediately downgrades the CDL — the driver legally can't operate commercial vehicles until the card is renewed, which can stop revenue overnight. Conditions requiring shorter renewal cycles (under 12 months) signal underlying health risk that some lenders factor into longer-term loan risk assessment. Insurance carriers reference DOT physical status as part of underwriting. Drivers should schedule renewal 60 days before expiration to avoid a revenue gap.",
      },
    ],
    relatedTerms: ["medc-card", "cdl-class-a", "hos", "csa-score"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "drug-alcohol-clearinghouse",
    term: "Drug & Alcohol Clearinghouse",
    abbreviation: "Clearinghouse",
    category: "driver-life-work",
    shortDefinition:
      "FMCSA-operated database tracking commercial driver drug and alcohol violations; mandatory query for hiring and annual checks since 2020.",
    sections: [
      {
        h2: "What it is",
        body:
          "The FMCSA Drug & Alcohol Clearinghouse is a federal database that tracks drug and alcohol violations by commercial drivers. It became mandatory in January 2020 for all FMCSA-regulated employers and is now the single source of truth for driver substance-use history across employers — a violation at one carrier follows the driver everywhere.\n\nEmployers must query the Clearinghouse before hiring any CDL driver, annually for current employees, and after any drug test result. Drivers must register and consent to specific employer queries — without consent, the employer can't pull a full record. Positive results, refusals to test, and follow-up requirements all log in the database. A failed drug test results in \"prohibited\" status, and the driver cannot legally operate commercial vehicles until the return-to-duty (RTD) process completes: evaluation by a Substance Abuse Professional (SAP), any recommended treatment, RTD test, and a follow-up testing schedule that can run multiple years.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "A Clearinghouse \"prohibited\" status immediately stops the driver's revenue. For owner-operators, this is catastrophic — no loads, no income, equipment payments still due. The RTD process can take 6+ months including SAP evaluation, treatment, and follow-up tests. Insurance carriers heavily price on Clearinghouse history — even one prohibited status can disqualify the operator from major insurance markets. Lenders rarely query the Clearinghouse directly but treat positive results in carrier records as elevated default risk.",
      },
    ],
    relatedTerms: ["cdl-class-a", "dot-physical", "csa-score"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "pre-employment-screening",
    term: "Pre-Employment Screening (PSP)",
    abbreviation: "PSP",
    termCode: "PSP",
    category: "driver-life-work",
    shortDefinition:
      "FMCSA system providing motor carriers a driver's 5-year crash history and 3-year inspection history before hiring decisions.",
    sections: [
      {
        h2: "What it is",
        body:
          "PSP — Pre-Employment Screening Program — is the FMCSA service that lets motor carriers query a CDL driver's 5-year crash history and 3-year roadside inspection history. The query requires driver consent and costs $10 per query for carriers, paid through the NIC Technologies-administered portal. Results return inspection details, out-of-service (OOS) orders, citations, and crash involvement — the operational record that follows the driver from carrier to carrier.\n\nPSP is distinct from related records that get conflated. It's not the same as MVR (Motor Vehicle Record), which is state-DMV data on license status and traffic convictions. It's not the same as CSA Driver Safety Measurement, which is a carrier-level scoring system. PSP focuses on individual driver historical data pulled from FMCSA's Motor Carrier Management Information System (MCMIS). Carriers use PSP alongside Clearinghouse queries during the hiring workflow — Clearinghouse covers drug and alcohol, PSP covers crashes and inspections. Together they form the federally-mandated baseline of pre-hire screening.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "PSP results influence both hiring decisions and insurance pricing — a driver with multiple OOS orders or serious violations is harder to insure and more expensive to insure. For owner-operators staying solo (no employees), PSP isn't directly relevant to hiring, but the operator's own PSP record affects their company-driver job prospects and insurance pricing. Lenders evaluating fleet operators expect proper PSP screening as part of basic hiring discipline — sloppy hiring correlates with higher claims and rising CSA scores.",
      },
    ],
    relatedTerms: ["csa-score", "cdl-class-a", "drug-alcohol-clearinghouse"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "cents-per-mile-pay",
    term: "Cents-Per-Mile Pay",
    abbreviation: "CPM",
    category: "driver-life-work",
    shortDefinition:
      "Driver pay model based on a fixed cents-per-mile rate for loaded (and sometimes empty) miles; the dominant pay structure for OTR truck drivers.",
    sections: [
      {
        h2: "What it is",
        body:
          "Cents-Per-Mile (CPM) pay is the dominant pay structure for company truck drivers. The driver earns a fixed rate per paid mile — $0.45–$0.70/mile is the typical 2026 range for company drivers, with the spread driven by experience, freight class, equipment, and lane. Some carriers pay separately for loaded vs. empty miles (empty typically pays $0.05–$0.15 less per mile), and some pay a single all-miles rate. Detention, layover, breakdown, and accessorial pay are usually separate line items on the settlement statement.\n\nExperience-based step increases are standard — roughly $0.01/mile per year of experience up to about 5 years. Reefer, flatbed, and tanker drivers earn a per-mile premium over dry van, and hazmat-endorsed drivers earn another step on top. CPM pay is per-paid-mile, not per-driving-time, which is the key economic distinction from hourly work — drivers lose money sitting in detention until detention pay kicks in. CPM is not the same as percentage-of-load pay, which is a different driver pay model where the driver receives a percentage of the freight rate rather than a fixed per-mile rate.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Owner-operators are not typically paid CPM by anyone — they invoice the freight rate as a business. CPM is for company-driver pay. Understanding CPM ranges in the operator's lane mix helps when evaluating whether to lease on with a carrier vs. run independent authority. Insurance and lender underwriting don't directly use CPM but understanding the local CPM market helps assess revenue capacity if the operator's business model changes — going from owner-op back to company driver after equipment issues, for example.",
      },
    ],
    relatedTerms: ["percentage-of-line-haul", "company-driver", "cpm", "rpm"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "percentage-of-line-haul",
    term: "Percentage-of-Line-Haul",
    abbreviation: "%-of-line-haul",
    category: "driver-life-work",
    shortDefinition:
      "Driver pay model giving a percentage (typically 60-80%) of the freight line-haul rate; common for owner-operators leased on with carriers.",
    sections: [
      {
        h2: "What it is",
        body:
          "Percentage-of-line-haul pay gives the driver a percentage — typically 60–80% — of the freight rate paid to the carrier. It's the standard pay model for owner-operators leased on with motor carriers. A common arrangement is 70–72% of gross line-haul, with the carrier retaining 25–30% to cover dispatch, broker billing, factoring, insurance under dispatch, and overhead. Fuel surcharge (FSC) treatment varies — sometimes it's bundled into the percentage, sometimes it's passed through 100% to the operator. Accessorials like detention and layover are typically passed through 100%.\n\nThe model aligns the driver's incentives with rate quality rather than mile count. A 70% operator on a $3.00/mile load earns $2.10/mile; the same operator on a $2.20/mile load earns $1.54/mile. The driver bears both the upside (better rates = better pay) and the downside (slow market = lower pay). This is the key difference from CPM — the operator is exposed to the freight market's rate volatility in a way company drivers are not. Understanding what the carrier deducts before the percentage applies is critical: some carriers calculate percentage off gross line-haul; others deduct dispatch fees, comdata fees, or insurance pass-through before the percentage hits.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Percentage-of-line-haul aligns driver incentives with rate negotiation — drivers care about the per-mile rate, not just the miles. For lease-on owner-operators, understanding the percentage structure plus pre-percentage deductions is critical to actual take-home. Lender underwriting for percentage-paid owner-operators uses settlement statements to verify revenue history. Insurance for percentage operators reflects whether they're under the carrier's primary policy (when under dispatch) or need their own non-trucking liability (NTL).",
      },
    ],
    relatedTerms: ["cents-per-mile-pay", "lease-on-driver", "non-trucking-liability"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "lease-on-driver",
    term: "Lease-On Driver",
    category: "driver-life-work",
    shortDefinition:
      "Owner-operator operating under a carrier's authority via a permanent lease arrangement; receives loads from the carrier and pays a percentage to operate.",
    sections: [
      {
        h2: "What it is",
        body:
          "A lease-on driver is an owner-operator who has signed a permanent lease with a motor carrier and operates under that carrier's MC# rather than their own. The operator owns the truck and is an independent business, but for operational and regulatory purposes runs under the carrier's authority. The carrier handles dispatch, broker billing, factoring (if applicable), and insurance under dispatch. The operator is paid on a percentage-of-line-haul or CPM basis depending on the lease agreement.\n\nLease-on arrangements are governed by FMCSA 49 CFR Part 376, which defines the required terms of the lease, payment timing rules, and escrow handling. The lease specifies duties, payment frequency, accessorial pass-through, charge-back policies (for things like trailer rental, fuel cards, qualcomm fees), and termination procedures. Lease-on is common in long-haul operations where the operator wants truck ownership without taking on operating-authority overhead: no MC# to maintain, no UCR or BOC-3 to file, no broker credit risk to manage, no factoring contract to negotiate.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Lease-on operators have different financing access than independent owner-operators — settlement statements substitute for invoice-level revenue when applying for loans. Insurance is the carrier's primary policy under dispatch, but the operator needs NTL coverage for non-dispatch driving. California AB 5 and similar state classification laws have made lease-on increasingly risky for carriers because of misclassification penalties. For first-time owner-operators, leasing on is often the entry point — it builds equipment-ownership experience and revenue history that strengthens future loan applications when filing own authority.",
      },
    ],
    relatedTerms: ["owner-operator", "forced-dispatch", "percentage-of-line-haul", "non-trucking-liability"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "company-driver",
    term: "Company Driver",
    category: "driver-life-work",
    shortDefinition:
      "W-2 employee driver operating a carrier-owned truck under the carrier's authority; carrier handles all operating costs and pays the driver per mile or salary.",
    sections: [
      {
        h2: "What it is",
        body:
          "A company driver is a W-2 employee of a motor carrier who drives a carrier-owned truck under the carrier's authority. The carrier handles all operating costs — fuel, maintenance, insurance, the truck payment, IFTA, IRP, permits, tolls — and the driver is paid CPM, salary, or per-hour depending on the operation. Standard benefits typically include employer-subsidized health insurance, 401(k) with some match, paid vacation, and occupational accident or workers' comp coverage.\n\nThe driver has no ownership stake but also no operating-cost exposure. If diesel prices spike or the engine throws a rod, the carrier eats it. The carrier owns the equipment, the operating authority, the customer relationships, and the insurance — the driver provides labor and CDL. This is the standard entry path for new CDL drivers: 1–2 years of company driving to accumulate clean MVR, verified experience, and operational competence before considering the jump to owner-operator. Major company-driver employers include Schneider, Werner, JB Hunt, Knight-Swift, USA Truck, and the dedicated divisions of large 3PLs.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Company drivers don't access trucking finance products directly — the carrier finances the equipment, manages insurance, and bills brokers. For someone transitioning from company driver to owner-operator, the jump involves learning all the financial systems (factoring, insurance, MC#, IFTA, IRP, UCR, HVUT) that company drivers never touch. Lenders evaluating new owner-operators view company-driver experience as a positive signal — operational competence plus clean MVR plus verified CDL. Insurance pricing reflects experience years: 5+ years of company driving meaningfully reduces premium for a new owner-operator's first year.",
      },
    ],
    relatedTerms: ["lease-on-driver", "owner-operator", "cents-per-mile-pay"],
    relatedProducts: [
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
      { url: "/new-authority-truck-financing", label: "New authority truck financing" },
    ],
  },
];
