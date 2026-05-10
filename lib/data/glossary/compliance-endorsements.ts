import "server-only";
import type { GlossaryTerm } from "./types";

/* Compliance-endorsements: CDL endorsements (tanker, doubles/triples,
   passenger, school bus, X), CDL Class B/C, and HOS rule variations.
   Populated by feat/seo-batch-6 agent G11. */

export const COMPLIANCE_ENDORSEMENTS_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "tanker-endorsement",
    term: "Tanker Endorsement",
    abbreviation: "N endorsement",
    termCode: "N",
    category: "operating-authority-compliance",
    shortDefinition:
      "CDL endorsement (N) authorizing the driver to haul liquids or gases in a permanently mounted tank with capacity over 1,000 gallons.",
    sections: [
      {
        h2: "What it is",
        body:
          "The N endorsement on a CDL is the tanker endorsement. It is required to operate any commercial vehicle equipped with a permanently mounted tank exceeding 1,000 gallons of liquid or gaseous material, regardless of whether the load itself is hazardous. The endorsement is granted by the state DMV after passing a knowledge test — there is no separate driving skills test for the N endorsement on its own.\n\nThe standard hazard-awareness curriculum covers tank surge dynamics, the difference between baffled and unbaffled tanks, rollover risk on curves and ramps, center-of-gravity behavior with partial loads, and emergency response when a tank breach occurs. The endorsement attaches to the underlying CDL and renews concurrently with it. Cost is state-specific, typically $10–$50 for the testing and endorsement fee.\n\nDrivers hauling liquid or gaseous hazardous materials in a tank require the combined X endorsement (H + N) rather than the N endorsement alone — see the X endorsement entry for that combined credential. The N endorsement on its own covers non-hazardous liquid loads like milk, water, and food-grade commodities.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Tanker freight pays a meaningful premium per mile over standard dry van freight, especially in oilfield, food-grade, and chemical operations. Insurance pricing reflects the higher hazard profile — surge dynamics elevate rollover risk and underwriters price that in — but the per-load revenue typically more than compensates.\n\nFor owner-operators considering a move into tanker freight, the training investment plus the endorsement cost usually pays back within 1–2 months of running tanker-rated loads. Lenders underwriting equipment financing on tank trailers treat the N endorsement as a baseline qualification check before approving the deal.",
      },
    ],
    relatedTerms: ["cdl-class-a", "hazmat-endorsement", "x-endorsement"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "doubles-triples-endorsement",
    term: "Doubles/Triples Endorsement",
    abbreviation: "T endorsement",
    termCode: "T",
    category: "operating-authority-compliance",
    shortDefinition:
      "CDL endorsement (T) authorizing the driver to operate combination vehicles with two or three trailers; common in LTL fleet operations.",
    sections: [
      {
        h2: "What it is",
        body:
          "The T endorsement on a CDL is the doubles/triples authorization. It is required to operate combination vehicles with two trailers (doubles) or three trailers (triples). The endorsement is a knowledge test only — no separate driving skills test — and is administered through the state DMV.\n\nState-specific testing requirements vary, and the operational rules vary even more: some states (notably California) prohibit triples on most roads, and a number of states restrict doubles or triples to specific highway corridors. The standard curriculum covers coupling and uncoupling order (always couple front-to-back and uncouple back-to-front), cargo securement across pups, lane-change dynamics with longer combinations, off-tracking on curves, and yard maneuvering with multiple trailers.\n\nThe endorsement attaches to the underlying CDL Class A and renews with it. There is no TSA threat assessment or background check requirement specific to T — testing and endorsement fees alone.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "LTL fleet operations almost universally require the T endorsement — FedEx Freight, Old Dominion, XPO, Saia, and Estes all run pups (28-foot trailers) as standard equipment, and without T endorsement a driver can't pull them. For carrier-employed drivers, T endorsement broadens the hireable carrier pool meaningfully and tends to correlate with better driver-pay scales.\n\nFor owner-operators, T endorsement is less commonly needed unless the operation runs LTL-style multi-trailer freight or specialized intermodal-rail combinations. Insurance pricing reflects the longer-combination hazard profile but is typically modest for an otherwise clean operator. Equipment financing for double/triple pup combinations is a niche segment with fewer lenders than standard 53-foot dry van financing, and the resale market for pup trailers is more regionally concentrated.",
      },
    ],
    relatedTerms: ["cdl-class-a", "ltl", "x-endorsement"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "passenger-endorsement",
    term: "Passenger Endorsement",
    abbreviation: "P endorsement",
    termCode: "P",
    category: "operating-authority-compliance",
    shortDefinition:
      "CDL endorsement (P) authorizing the driver to transport 16 or more passengers; required for charter buses, transit, and certain shuttle operations.",
    sections: [
      {
        h2: "What it is",
        body:
          "The P endorsement on a CDL is the passenger transport authorization. It is required for any commercial vehicle designed to transport 16 or more passengers, including the driver. The endorsement requires both a knowledge test and a driving skills test conducted in a passenger-rated vehicle of the appropriate class.\n\nThe standard curriculum covers emergency evacuation procedures, passenger management (including handling intoxicated or disruptive passengers), brake operation in a passenger-loaded context, behavior at uncontrolled railroad crossings (the well-known full-stop rule for buses), and pre-trip inspection items specific to passenger vehicles. Some states layer additional background-check requirements on top of the federal standard.\n\nThe P endorsement is a prerequisite for the S (school bus) endorsement — drivers cannot test for S without first holding P. The P endorsement attaches to the underlying CDL Class A, B, or C depending on the vehicle weight rating, and renews concurrently with the CDL. ELDT (Entry-Level Driver Training) applies to new P applicants under the federal schedule.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "The P endorsement is not directly relevant to freight trucking — but the endorsement exists within the same CDL hierarchy and is occasionally cross-referenced when a driver moves between freight and passenger operations. Some commercial drivers transition between segments as career changes or seasonal work.\n\nInsurance pricing for passenger operations is materially different from freight: higher per-passenger exposure, distinct occupational accident requirements, and separate underwriting panels evaluating passenger-mile exposure rather than freight-mile risk. Lenders that finance passenger vehicles (charter coaches, shuttle vans) operate in a separate commercial-vehicle financing market from Class 8 trucking lenders, with their own loan structures and equipment depreciation curves.",
      },
    ],
    relatedTerms: ["cdl-class-a", "school-bus-endorsement"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "school-bus-endorsement",
    term: "School Bus Endorsement",
    abbreviation: "S endorsement",
    termCode: "S",
    category: "operating-authority-compliance",
    shortDefinition:
      "CDL endorsement (S) authorizing the driver to operate a school bus; requires P endorsement plus additional school-bus-specific knowledge and skills tests.",
    sections: [
      {
        h2: "What it is",
        body:
          "The S endorsement on a CDL is the school bus authorization. It is required to operate any vehicle classified as a school bus under federal and state rules. The P (passenger) endorsement is a prerequisite — drivers must hold P before they can test for S.\n\nObtaining the endorsement requires an additional knowledge test plus a driving skills test conducted in a school bus, on top of the P endorsement requirements. Most states also require a criminal background check, and several layer fingerprinting and child-protection clearance on top of the federal standard. State Department of Education oversight typically applies in parallel with FMCSA. The endorsement is not transferable between states without re-verification through the new state's school bus authorization process.\n\nELDT (Entry-Level Driver Training) requirements apply to new S applicants on the same federal schedule that applies to other endorsement additions.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "School bus operations sit in a different commercial segment from freight trucking, with state Department of Education oversight running in parallel with FMCSA. Insurance and underwriting are completely separate — different carriers, different rating factors, different liability structures, and different claim profiles.\n\nDrivers occasionally transition between school bus and freight operations as seasonal or career changes, especially in rural markets where school bus work is summer-light and over-the-road freight fills the gap. The financial structures differ entirely: school bus drivers are typically school district employees with W-2 income, predictable hours, and pension benefits, while freight is dominated by owner-operators with 1099 income and equipment financing exposure on tractors and trailers.",
      },
    ],
    relatedTerms: ["passenger-endorsement", "cdl-class-a"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "x-endorsement",
    term: "X Endorsement",
    abbreviation: "X endorsement",
    termCode: "X",
    category: "operating-authority-compliance",
    shortDefinition:
      "Combined CDL endorsement (X) covering both hazmat (H) and tanker (N); required for hauling liquid or gaseous hazardous materials.",
    sections: [
      {
        h2: "What it is",
        body:
          "The X endorsement is the combined H (hazmat) and N (tanker) endorsement on a single CDL. It is required for any commercial vehicle hauling liquid or gaseous hazardous materials in a permanently mounted tank — the highest-hazard freight category in the regulatory hierarchy.\n\nObtaining the X endorsement requires both the H endorsement and the N endorsement, which in practice means a hazmat knowledge test plus a tanker knowledge test, plus the TSA Threat Assessment that accompanies any hazmat credential. The TSA process includes fingerprinting, a background check, and disqualifying-offense screening. Cost typically runs $80–$130 for the TSA component plus state DMV endorsement fees.\n\nThe hazmat component renews on a 5-year cycle, paired with the regular CDL renewal. A lapse in either the H or N component invalidates the combined X credential and stops the driver from running placardable tank loads.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "X-endorsed drivers haul the highest-premium freight in trucking — oilfield chemicals, fuel transport, propane, anhydrous ammonia — with per-mile rates running 40–80%+ over standard dry van. Insurance pricing is meaningfully higher: the additional MCS-90 hazmat endorsement applies, MTC limits run higher, and pollution liability is often layered on top.\n\nAbsolute revenue compensates. For owner-operators with X endorsement, the equipment financing landscape is narrower — tank trailers cost $80K–$200K+ and lenders price tanker risk into their underwriting — but the carriers and lenders who play in this segment understand the math. The X credential also opens contract work with major oilfield, fuel distribution, and chemical shippers that don't even consider non-X-rated operators.",
      },
    ],
    relatedTerms: ["hazmat-endorsement", "tanker-endorsement", "hazmat"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/equipment-financing", label: "Equipment financing" },
    ],
  },
  {
    slug: "cdl-class-b",
    term: "CDL Class B",
    abbreviation: "CDL-B",
    termCode: "CDL-B",
    category: "operating-authority-compliance",
    shortDefinition:
      "Commercial Driver's License Class B — authorizes operation of single vehicles over 26,001 lbs GVWR, including straight trucks, dump trucks, and most buses.",
    sections: [
      {
        h2: "What it is",
        body:
          "CDL Class B authorizes the operation of single commercial vehicles with a Gross Vehicle Weight Rating (GVWR) of 26,001 lbs or more, OR any such vehicle towing another vehicle of 10,000 lbs GVWR or less. Common Class B vehicles include straight trucks (Class 6–8 single-unit), dump trucks, garbage trucks, large buses, and concrete mixers.\n\nThe distinction from Class A is the towed unit: Class A requires the towed unit to exceed 10,000 lbs GVWR, while Class B is limited to single units or lighter towed combinations. CDL-B requires the same DOT medical examination and federal ELDT (Entry-Level Driver Training) curriculum as CDL-A, but the driving skills test is conducted on a Class B vehicle. Endorsements (hazmat, passenger, school bus, tanker) attach to Class B on the same federal standards as Class A.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Operators with only a CDL-B cannot legally pull standard 53-foot trailers, which structurally limits the freight market available to them. CDL-B is the common entry credential for box truck operators, dump truck owner-operators, and local delivery operations — segments with shorter routes, more home time, and different rate structures than OTR.\n\nEquipment financing for Class B vehicles is structurally different from Class 8 tractor financing — cheaper equipment ($40K–$120K typical versus $150K+ for tractors), shorter terms, often regional lender panels. For owner-operators starting with CDL-B and later upgrading to CDL-A, the upgrade requires additional ELDT and a Class A skills test, and the equipment-financing landscape opens up considerably at that point. Some operators stay in CDL-B segments long-term because the local-route lifestyle and predictable schedules fit their personal economics better than chasing OTR mileage.",
      },
    ],
    relatedTerms: ["cdl-class-a", "cdl-class-c", "eldt", "dot-physical"],
    relatedProducts: [
      { url: "/box-truck-financing", label: "Box truck financing" },
      { url: "/equipment-financing", label: "Equipment financing" },
    ],
  },
  {
    slug: "cdl-class-c",
    term: "CDL Class C",
    abbreviation: "CDL-C",
    termCode: "CDL-C",
    category: "operating-authority-compliance",
    shortDefinition:
      "Commercial Driver's License Class C — for single vehicles under 26,001 lbs GVWR transporting 16+ passengers or placardable hazmat.",
    sections: [
      {
        h2: "What it is",
        body:
          "CDL Class C is the smallest commercial license tier. It is required for single vehicles under 26,001 lbs GVWR that fall into one of two regulatory categories: (1) vehicles designed to transport 16 or more passengers including the driver, or (2) vehicles transporting hazardous materials in placardable quantities, regardless of vehicle weight rating.\n\nMost CDL-C operations are passenger-related — shuttle vans, hotel airport shuttles, small charter operations. Some hazmat operations also fall under CDL-C: fuel delivery in smaller tanks, certain medical and scientific transport, and specialty couriers carrying placardable quantities below the GVWR threshold for Class B. CDL-C still requires the federal DOT medical examination and ELDT for the relevant endorsements (P, S, H), but the skills test is conducted on a smaller vehicle than Class A or B. The same hazmat TSA Threat Assessment process applies for the H endorsement attached to CDL-C.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "CDL-C is not directly relevant to most freight owner-operators — the freight market for sub-26,001-lb commercial vehicles is dominated by drivers who don't need a CDL at all (Class 3–6 box trucks under the GVWR threshold operate on standard driver's licenses).\n\nSome delivery operators — medical, scientific, hazmat-rated specialty couriers, small-tank fuel delivery — operate under CDL-C and live in a niche commercial-vehicle financing segment with different lender panels than Class 8 trucking. Insurance for CDL-C operations is structured around the specific use case: passenger shuttle insurance and hazmat courier insurance are entirely different products with different rating bases, different limits, and different carrier panels. For operators transitioning between CDL-C and higher tiers, the credentialing ladder is additive.",
      },
    ],
    relatedTerms: ["cdl-class-a", "cdl-class-b", "hazmat-endorsement"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "hos-11-hour-rule",
    term: "HOS 11-Hour Driving Rule",
    category: "operating-authority-compliance",
    shortDefinition:
      "FMCSA Hours-of-Service rule limiting commercial drivers to 11 hours of driving within a 14-hour on-duty window; requires 10 hours off-duty before reset.",
    sections: [
      {
        h2: "What it is",
        body:
          "The HOS 11-hour rule is the FMCSA regulation under 49 CFR 395.3(a)(3) limiting property-carrying commercial drivers to 11 consecutive hours of driving per shift. The 11 driving hours sit within a 14-hour on-duty window (the separate 14-hour rule) and require a 30-minute break after 8 cumulative driving hours.\n\nBefore the 11-hour clock resets, the driver must take 10 consecutive hours off-duty. ELD enforcement makes the rule automatic — the device cuts off legal driving status at the 11-hour mark, and roadside inspection of the ELD record produces an immediate out-of-service citation if the driver attempts to keep driving. The 11-hour rule applies to property-carrying CMV drivers; passenger-carrying drivers operate under a slightly different framework (10-hour driving limit within a 15-hour window). Adverse driving conditions can extend the 11-hour limit by up to 2 hours under a specific exception.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "The 11-hour rule defines the maximum daily mileage capacity at highway speeds: roughly 600–700 miles per day for OTR operations under realistic conditions. Carriers and shippers plan loads around this constraint, and any margin calculation for owner-operator routes implicitly assumes the 11-hour cap. Routes that look profitable on paper but require 12 driving hours to complete are not actually viable.\n\nHOS violations are CSA point-generating events with high frequency. Chronic violations push CSA percentiles into intervention thresholds, hurting insurance pricing and broker access. Operators who push past 11 hours risk both the citation AND fatigue-related accident exposure — the most expensive kind of preventable claim, and one that insurance underwriters specifically track.",
      },
    ],
    relatedTerms: ["hos", "hos-14-hour-window", "eld", "csa-score"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "hos-14-hour-window",
    term: "HOS 14-Hour Window",
    category: "operating-authority-compliance",
    shortDefinition:
      "FMCSA Hours-of-Service rule defining the 14-hour on-duty window during which 11 hours of driving and required breaks must occur.",
    sections: [
      {
        h2: "What it is",
        body:
          "The HOS 14-hour window is the 14-hour clock that starts the moment a driver goes on-duty after a 10-hour rest break. Within this 14-hour window, the driver can drive up to 11 hours, must take a 30-minute break after 8 cumulative driving hours, and can accumulate on-duty time for loading, unloading, paperwork, fueling, and pre/post-trip inspections.\n\nOnce the 14-hour clock expires, the driver cannot drive — even if they have driven less than 11 hours. The 14-hour window cannot be extended by going off-duty. Time spent in the sleeper berth under specific split-sleeper provisions can pause the 14-hour clock; off-duty time outside the sleeper-berth split provisions generally cannot. ELD systems track the 14-hour clock automatically and lock out driving status when the window expires.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "The 14-hour rule is what makes excessive detention so destructive to owner-operator economics. Every hour stuck at a dock counts against the 14-hour window even though it is not driving time. A driver who starts the day at 7 AM and gets stuck in 4 hours of detention at the first pickup may not have enough remaining 14-hour budget to complete the planned route.\n\nThis is one of the primary reasons detention pay matters operationally and financially: detention is not just unpaid waiting, it is borrowed time from the 14-hour budget that pays for the rest of the day's revenue. Owner-operators tracking yield per hour rather than per mile see this immediately — a 4-hour dock delay can collapse the effective hourly rate for an entire day.",
      },
    ],
    relatedTerms: ["hos", "hos-11-hour-rule", "detention", "sleeper-berth"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "hos-30-minute-break",
    term: "HOS 30-Minute Break",
    category: "operating-authority-compliance",
    shortDefinition:
      "FMCSA Hours-of-Service rule requiring a 30-minute break after 8 cumulative driving hours; break can be off-duty, on-duty not driving, or sleeper berth.",
    sections: [
      {
        h2: "What it is",
        body:
          "The HOS 30-minute break is the FMCSA rule under 49 CFR 395.3(a)(3)(ii) requiring commercial drivers to take a 30-minute break before driving more than 8 consecutive hours since the last 30-minute (or longer) qualifying break. The 2020 HOS rule revision broadened the break categories: the qualifying 30 minutes can be off-duty, on-duty not-driving (loading, unloading, paperwork), or in the sleeper berth.\n\nThe common operational pattern is to combine the break with fueling, eating, or a brief delivery stop — drivers rarely sit idle for 30 minutes purely for the rule. ELD systems automatically track the 8-hour driving counter and prompt the driver before the break is due. Once the qualifying 30 minutes is logged, the 8-hour counter resets and the driver can drive again until the next break window or until the 11-hour and 14-hour limits are reached.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "The 30-minute break is the easiest HOS violation to commit accidentally. Drivers focused on a tight delivery window can blow past the 8-hour mark without noticing. The penalty is a CSA HOS BASIC violation that compounds over the 24-month rolling window, and habitual violations push percentiles toward intervention thresholds.\n\nFor owner-operators, building the 30-minute break into route planning is a real margin-protector. An accidental out-of-service order at a roadside inspection ends the work day and the planned revenue for that day — and the CSA hit lingers in insurance pricing for two years. ELD pre-break warnings, route-planning software that schedules the break around fueling stops, and disciplined dispatch all help keep this from happening.",
      },
    ],
    relatedTerms: ["hos", "hos-11-hour-rule", "eld", "csa-score"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "hos-70-hour-rule",
    term: "HOS 70-Hour Rule (8-Day)",
    category: "operating-authority-compliance",
    shortDefinition:
      "FMCSA Hours-of-Service rule limiting commercial drivers to 70 hours of on-duty time in any 8 consecutive days; resets via 34-hour rest.",
    sections: [
      {
        h2: "What it is",
        body:
          "The HOS 70-hour rule is the FMCSA regulation limiting commercial drivers to 70 hours of on-duty time within any rolling 8-day period. It applies to carriers operating every day of the week. An alternative 60-hour / 7-day rule applies to carriers that do not operate every day of the week — the carrier picks the cycle that fits its operation, and individual drivers fall under whichever cycle their carrier uses.\n\nThe 8-day calculation is rolling, not calendar-week: each day, the oldest day rolls off and the most recent day rolls in. Reset is available through the 34-hour restart provision — a 34-hour off-duty rest period clears the 8-day clock entirely and the driver starts the next shift with a fresh 70-hour budget. ELD systems track the 8-day clock automatically and display the recap of remaining on-duty hours so drivers can plan ahead.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "The 70-hour rule structures weekly revenue capacity for owner-operators. Roughly 60–65 hours of practical driving per week (after the 14-hour windows and 30-minute breaks consume some non-driving on-duty time) translates to a sustained ~3,000–3,500 miles per week. That weekly mileage cap is the upper bound on revenue capacity for a solo driver.\n\nCarriers managing fleet schedules optimize 8-day cycles around this constraint. For owner-operators, planning the 34-hour restart strategically (often a weekend reset) maximizes weekly mileage — and weekly mileage maps directly to weekly revenue, equipment payments, and factoring cash flow. Team drivers double the available driving hours by splitting the clock, which is why team operations command premium freight rates.",
      },
    ],
    relatedTerms: ["hos", "hos-34-hour-restart", "hos-11-hour-rule", "hos-14-hour-window"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "hos-34-hour-restart",
    term: "HOS 34-Hour Restart",
    category: "operating-authority-compliance",
    shortDefinition:
      "Optional FMCSA Hours-of-Service provision allowing a 34-hour off-duty period to reset the 8-day (70-hour) cumulative on-duty clock.",
    sections: [
      {
        h2: "What it is",
        body:
          "The HOS 34-hour restart is the FMCSA provision under 49 CFR 395.3(c) allowing commercial drivers to reset their 8-day (70-hour) cumulative on-duty clock by taking 34 consecutive hours off-duty. The typical use case: a driver approaching the 70-hour weekly limit takes 34 hours off — commonly from Friday evening through Sunday morning — and starts the new week with a fresh 70-hour budget available.\n\nRestart use is voluntary. Drivers can choose to operate purely on the 8-day rolling cycle without ever using a restart, simply letting older on-duty hours roll off the back of the 8-day window as new on-duty hours roll on the front. ELD systems track off-duty hours automatically and recognize the 34-hour restart once the qualifying period is complete. Earlier rules required the restart to span two consecutive 1:00–5:00 AM periods, but that provision was suspended in 2014 and is no longer in force.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Strategic 34-hour restarts let owner-operators maximize sustained weekly mileage by ensuring every new week starts with full 70-hour capacity. Many operators time the restart to hometime weekends — the restart and hometime overlap naturally, and the driver returns to work Monday morning with a full 70-hour budget available.\n\nFor fleet operators managing multiple drivers, coordinating restart schedules across the fleet affects total weekly capacity and dispatch flexibility. Restart-frequency patterns also appear in CSA-related driver behavior data and indirectly influence insurance underwriting — disciplined restart use signals a well-managed operation, which underwriters value when pricing primary liability and physical damage coverage. Operators who never use restarts and instead grind through rolling 8-day cycles typically run lower weekly mileage but maintain steady production.",
      },
    ],
    relatedTerms: ["hos", "hos-70-hour-rule", "hometime", "hos-11-hour-rule"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
];
