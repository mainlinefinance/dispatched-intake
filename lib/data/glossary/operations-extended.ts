import "server-only";
import type { GlossaryTerm } from "./types";

/* Operations-extended: fees, accessorials, freight-mix terms (lumper,
   TONU, detention, fuel surcharge, demurrage, layover, backhaul,
   headhaul, weight ticket, freight class, etc.).
   Populated by feat/seo-batch-4 agent G6. */

export const OPERATIONS_EXTENDED_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "lumper",
    term: "Lumper Fee",
    abbreviation: "Lumper",
    category: "trucking-operations",
    shortDefinition:
      "Fee paid for third-party labor that unloads or loads a trailer at a warehouse or dock; common at grocery DCs and large retailers.",
    sections: [
      {
        h2: "What it is",
        body:
          "A lumper fee is payment for third-party labor that unloads (or, less commonly, loads) the trailer at the consignee or shipper. It's standard at grocery distribution centers — Kroger, Publix, Walmart DC — as well as Amazon facilities and large retail warehouses where the receiver insists on its own contracted lumpers handling the freight off the trailer.\n\nThe fee is either charged by the lumper service directly — the driver pays cash or check on the dock and walks away with a receipt — or back-charged to the broker by the receiving facility, which appears as a line item on the next billing cycle. Typical range is $50–$300 per load depending on pallet count, freight type, and complexity. Some shippers make lumpers mandatory (the driver is not allowed to touch the freight); others allow drivers to unload themselves if they prefer.\n\nMajor lumper services include CHEP, Concentric, and the in-house lumper crews at large cold-storage operators like US Cold Storage. The broker typically reimburses the carrier on the next invoice cycle — but with a real lag.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Lumper fees are a cash-flow drag — the driver pays out of pocket and waits for reimbursement. Tracking lumper receipts is a real bookkeeping line item that drivers often lose, at the cost of unreimbursed revenue. Factoring companies handle lumper reimbursements differently: some advance the lumper amount on the same invoice as the line-haul (cleaner), others require a separate lumper invoice (more friction, slower reimbursement).\n\nOn a single-truck operation, $300 in lumper fees on a slow-pay broker can compress weekly cash flow noticeably. Across a month of multi-stop grocery work, unreimbursed lumpers can quietly run into four figures. Keep every receipt, photograph it, and reconcile against settlements weekly.",
      },
    ],
    relatedTerms: ["accessorial-charges", "pod", "detention"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/factoring", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "tonu",
    term: "Truck Order Not Used",
    abbreviation: "TONU",
    termCode: "TONU",
    category: "trucking-operations",
    shortDefinition:
      "Compensation paid to a carrier when a load is cancelled after the truck is dispatched but before pickup; partial payment for the trip.",
    sections: [
      {
        h2: "What it is",
        body:
          "TONU — Truck Order Not Used — is a partial payment owed to the carrier when a confirmed load is cancelled after the truck has dispatched (committed to the lane) but before pickup. The carrier has already burned time, fuel, and deadhead miles repositioning to origin; TONU is the compensation for that committed effort.\n\nTypical range is $150–$500 depending on the broker, the lane length, and how much the carrier sank before the cancel. TONU is not required by FMCSA — it's contractual, not regulatory — but it's standard industry practice on legitimate carrier-broker relationships. The terms are documented in the rate confirmation or in a follow-up email when the cancel happens. TONU is not the same as detention (excessive loading time) or layover (forced overnight wait); it's specifically a pre-pickup cancellation payment.\n\nSome brokers refuse TONU on certain spot-market lanes — read the rate confirmation before accepting the load. A rate con with no TONU clause and a sketchy broker is a flag.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "TONU is the difference between a cancelled load being a wash and a real loss. Brokers who refuse to pay TONU are signaling something — usually that they don't value the carrier relationship, and the carrier should weight that broker accordingly in the lane mix.\n\nFor owner-operators, knowing which brokers honor TONU (and which don't) is part of the broker-mix evaluation that drives long-run profitability. Factoring companies treat TONU charges like any other invoiced amount — billable as long as the broker confirms in writing. Make the broker put the TONU agreement in email or on a revised rate confirmation before walking away; verbal agreements don't factor.",
      },
    ],
    relatedTerms: ["accessorial-charges", "detention", "layover"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "detention",
    term: "Detention Pay",
    category: "trucking-operations",
    shortDefinition:
      "Compensation paid to a carrier when loading or unloading takes longer than the contractually free time (typically 2 hours).",
    sections: [
      {
        h2: "What it is",
        body:
          "Detention pay is compensation for excessive loading or unloading time at the shipper or consignee. The industry-standard free time is 2 hours at pickup and 2 hours at delivery — anything beyond that is detention. Standard detention rates run $25–$75 per hour, negotiable per broker and per lane.\n\nDetention requires documentation. Timestamped check-in and check-out at the facility — captured by the driver's app, the broker's tracking platform, or a paper bill of lading with facility stamps — is the proof. The driver must request detention before leaving the facility or it's typically lost; brokers won't pay retroactive detention claims filed days later. GPS records and ELD logs corroborate the claim if the broker pushes back.\n\nDetention is not the same as TONU (load cancelled before pickup) or layover (overnight forced wait). It's specifically hourly compensation for excess in-facility time on the same business day.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Detention is often where the difference between a profitable load and an unprofitable one shows up. A 4-hour unload at a busy grocery DC turns a $400 deadhead-adjusted profit into break-even unless detention is collected. Brokers vary widely on detention pay reliability — tracking which brokers reliably pay detention vs. which don't is part of operator profitability discipline, and one of the highest-leverage broker-vetting signals available to an owner-operator.\n\nFactoring companies treat detention charges like other accessorials — billable on the same invoice or on a separate one, depending on the broker's procedure. Keep timestamps, screenshots, and tracking records; the difference between a paid detention claim and a denied one is documentation, every time.",
      },
    ],
    relatedTerms: ["accessorial-charges", "tonu", "layover", "pod"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "accessorial-charges",
    term: "Accessorial Charges",
    category: "trucking-operations",
    shortDefinition:
      "Additional fees on a freight bill beyond the base line-haul rate — detention, lumper, layover, fuel surcharge, tolls, etc.",
    sections: [
      {
        h2: "What it is",
        body:
          "Accessorial charges are any line item on a freight invoice beyond the base \"line-haul\" rate — the fee structure for everything the load requires that isn't just driving from A to B. Common accessorials include detention, layover, lumper, fuel surcharge, tarp fee, hazmat fee, oversize/overweight permits, tolls, scale tickets, redelivery, residential delivery, after-hours delivery, and inside delivery.\n\nEach accessorial is documented separately on the invoice, and the carrier needs supporting evidence: timestamps for detention, receipts for lumpers and tolls, photos for tarp work, scale tickets for overweight permits. Contract carriers operating on dedicated lanes have standardized accessorial schedules built into the master agreement. Spot-market loads negotiate accessorials at booking time, ideally written into the rate confirmation.\n\nOn certain lane mixes — grocery, JIT manufacturing, flatbed project work — accessorials can be 5–20% of total revenue. On clean dry-van runs with cooperative shippers, accessorials may be near zero.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Accessorials are often the difference between a load being profitable or a loss-maker on the actual P&L. Many owner-operators undercharge or fail to collect accessorials they're contractually entitled to — leaving 5–10% of revenue on the table annually.\n\nFactoring companies handle accessorials differently. Some advance them on the same invoice as the line-haul (cleaner cash flow); others require separate billing (slower, more paperwork). Tracking accessorial-collection rates by broker reveals which broker relationships are actually profitable vs. which look good on paper but bleed margin through unpaid extras. On a single-truck operation, a 5% lift in collected accessorials can translate into thousands of additional dollars per year — without driving a single extra mile.",
      },
    ],
    relatedTerms: ["detention", "lumper", "tonu", "fuel-surcharge"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "dispatch-fee",
    term: "Dispatch Fee",
    category: "trucking-operations",
    shortDefinition:
      "Percentage of revenue paid to a dispatch service (often 5–10%) for finding loads, negotiating rates, and handling broker relationships.",
    sections: [
      {
        h2: "What it is",
        body:
          "A dispatch fee is compensation paid to an independent dispatcher or dispatch service for finding loads on behalf of the carrier. The typical range is 5–10% of gross revenue, though flat-fee dispatch models exist (a fixed monthly retainer regardless of loads booked). The dispatcher works for the carrier — finds loads, negotiates rates, handles broker relationships, sometimes manages settlements and paperwork.\n\nA dispatch service is not a freight broker. A broker acts as principal between shipper and carrier — taking title to the freight, assuming credit risk, and earning a spread. A dispatcher is the carrier's agent: no title to the freight, no credit risk, just a service fee. Many owner-operators use dispatchers in their first 6–12 months to learn the broker-relationship side of the business before transitioning to self-dispatch.\n\nDispatcher quality varies dramatically. The good ones bring established broker relationships, sharper rate negotiation, and time savings that more than cover the 5–10%. The bad ones are a revenue tax with no value.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "A good dispatcher pays for themselves by finding better-paying loads than the carrier could find solo. A bad dispatcher is a 5–10% revenue tax with no value — and that 5–10% comes straight off the gross margin line.\n\nThe dispatch fee is deductible from the operator's P&L as a real cost line. Factoring companies sometimes integrate dispatch services — TBS and Apex notably bundle dispatch with factoring — and bundling can lower the effective total cost. Vet a dispatcher's broker relationships and historical rate-per-mile performance before signing; ask for references from current carrier clients.",
      },
    ],
    relatedTerms: ["accessorial-charges", "broker-spread"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
    ],
  },
  {
    slug: "fuel-surcharge",
    term: "Fuel Surcharge",
    abbreviation: "FSC",
    termCode: "FSC",
    category: "trucking-operations",
    shortDefinition:
      "Variable line item on a freight bill adjusting compensation for fuel price fluctuations; calculated from the DOE national diesel price benchmark.",
    sections: [
      {
        h2: "What it is",
        body:
          "A fuel surcharge (FSC) is a variable line item that compensates the carrier for fuel-price changes since the contract rate was set. Standard industry practice is to base the FSC on the weekly DOE/EIA national average diesel price — published every Monday by the US Energy Information Administration.\n\nThe common formula is a fixed cents-per-mile escalator above a baseline diesel price. A representative example: $0.04 per mile additional FSC for every $0.06 per gallon that diesel exceeds a $3.00 baseline. Spot-market loads usually have FSC baked into the all-in rate (a single number, no separate FSC line). Contract carriers on dedicated lanes almost always have explicit FSC schedules built into the master agreement.\n\nFSC protects the carrier from fuel-cost volatility between when contract pricing is set and when the load actually runs. On accounting treatment, FSC paid out is generally part of freight revenue rather than a separate revenue category.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "FSC is one of the cleanest accessorials to collect — it's automatic on contracted lanes and standardized in spot-market quoting. On a single-truck operation, FSC can mean $500–$2,000 in monthly revenue depending on fuel price level and lane mix.\n\nCarriers who don't enforce or audit FSC against the published DOE baseline leave revenue on the table — brokers occasionally underpay FSC when fuel spikes and aren't always proactive about updating. Factoring companies treat FSC as part of revenue for advance-rate calculations, which means clean FSC tracking directly supports cash flow. Lenders evaluating contracted-lane carriers also look at FSC schedules during underwriting — a strong, indexed FSC clause reduces fuel-volatility risk on projected revenue.",
      },
    ],
    relatedTerms: ["accessorial-charges", "dispatch-fee"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/factoring", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "demurrage",
    term: "Demurrage",
    category: "trucking-operations",
    shortDefinition:
      "Penalty charged by a steamship line or rail when an intermodal container is held beyond the free time at a port or terminal.",
    sections: [
      {
        h2: "What it is",
        body:
          "Demurrage is a penalty fee charged by a steamship line (ocean carrier) or rail carrier when a container is held at the port or terminal beyond the contractually free time. Standard free time at US container ports runs 4–7 days; demurrage rates range $75–$500 per day per container depending on the steamship line, the port, and how many days over.\n\nIn intermodal terminology, \"detention\" refers to the same concept applied to a container held outside the terminal — sitting at a warehouse past free time — while \"demurrage\" applies inside the terminal. Both stack up quickly when chassis availability slips, warehouse appointments push, or vessel schedules cascade. The Federal Maritime Commission (FMC) requires steamship lines to provide a clear demurrage/detention notice and a documented dispute process, but the burden of disputing falls on the carrier or BCO.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For drayage operators, demurrage is one of the largest non-revenue cost lines on the P&L. A container stuck 2 days over free time at $250 per day equals $500 in lost margin on a single move. Tracking free-time clocks per container is real operational work — and the absence of that tracking is one of the most common ways drayage operations quietly bleed margin month after month.\n\nDemurrage disputes — when free time was extended because of vessel delays, weather events, or terminal congestion — can recover thousands per month, but only with documentation: vessel arrival proofs, terminal appointment logs, and chassis availability records. For non-drayage owner-operators (OTR, regional dry-van), demurrage is mostly irrelevant unless touching port operations.",
      },
    ],
    relatedTerms: ["drayage", "intermodal", "detention"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "layover",
    term: "Layover",
    category: "trucking-operations",
    shortDefinition:
      "Compensation paid when a driver is required to wait overnight or longer at a pickup/delivery beyond normal turnaround time; typically $100–$250/day.",
    sections: [
      {
        h2: "What it is",
        body:
          "Layover is compensation for a driver forced to wait overnight or longer because of a delayed pickup, a delayed delivery appointment, or shipper schedule slippage. Typical range is $100–$250 per layover day, depending on the broker and the lane.\n\nLayover is distinct from detention (hourly, same-day waiting) and TONU (load cancelled before pickup). It specifically covers the case where the load eventually moves, but the driver has to sit somewhere — a truck stop, a yard, a hotel lot — until the freight is available or the appointment opens.\n\nDocumentation matters. The carrier needs a timestamp for when the layover began, when freight finally became available, and the total layover hours or days. Broker contracts vary widely: some honor layover automatically when the rate-con timestamps clearly indicate one, others require a per-event negotiation and a separate claim. Most brokers require the layover claim to be filed within 7 days of the event — past that window, the claim is typically denied.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "A 2-day layover on a Friday-evening drop with a Monday-morning reload can wipe out the entire profit on a lane unless layover is collected. Layover happens disproportionately in produce, refrigerated, and JIT manufacturing lanes — shippers with tight appointment windows and limited dock capacity.\n\nBrokers who reliably pay layover are worth keeping in the rotation. Brokers who refuse layover or slow-pay on documented claims are a signal to reduce concentration. On the factoring side, layover charges are billable like any other accessorial when the broker confirms in writing on a revised rate confirmation or email.",
      },
    ],
    relatedTerms: ["detention", "tonu", "accessorial-charges"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "backhaul",
    term: "Backhaul",
    category: "trucking-operations",
    shortDefinition:
      "Return load picked up after delivering the outbound freight, converting an empty deadhead return into revenue.",
    sections: [
      {
        h2: "What it is",
        body:
          "A backhaul is a return load picked up after delivering the outbound freight, converting what would otherwise be a deadhead empty return into a revenue trip. \"Outbound\" or \"headhaul\" is typically the higher-paying direction; backhaul rates are often lower because the carrier is already committed to returning home and brokers know it.\n\nLoad boards (DAT, Truckstop, 123Loadboard) are dominated by backhaul searches — most spot-market activity is carriers hunting a return load before deadhead becomes the only option. A common pattern: deliver outbound from the Midwest manufacturing belt to an East Coast distribution market, then find a backhaul from East Coast to Midwest with whatever margin is available.\n\nSome long-haul carriers escape spot-market backhaul pressure by signing committed backhaul contracts — for example, with a regional grocery DC that has consistent outbound freight back to vendors. Those committed lanes meaningfully improve unit economics over pure spot.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Backhaul rate acceptance is one of the most important operator decisions on the daily P&L. Accepting too low a backhaul rate means losing money compared to waiting one more day for a better-paying load — or even deadheading home and saving fuel and hours of HOS.\n\nThe math is unforgiving: every dollar per mile under your operating cost-per-mile is a loss, even if it appears to \"cover fuel.\" Carriers with committed backhaul contracts have meaningfully better unit economics than spot-only carriers. Factoring is essential for backhaul-heavy operations because broker concentration on the return side often differs sharply from the outbound side, and factor diversification matters for credit risk.",
      },
    ],
    relatedTerms: ["headhaul", "deadhead", "otr"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "headhaul",
    term: "Headhaul",
    category: "trucking-operations",
    shortDefinition:
      "The outbound or higher-paying direction in a lane pair; the primary load that drives the lane's economics.",
    sections: [
      {
        h2: "What it is",
        body:
          "Headhaul is the outbound or higher-paying direction in a lane pair. It complements backhaul (the return). The shorthand: headhaul is the direction the freight wants to flow; backhaul is the direction the truck has to flow to get home.\n\nCertain regions have headhaul-heavy outflows. The Midwest manufacturing belt is outbound-heavy for finished goods. California is outbound-heavy for produce. The reverse — freight returning to these regions — is backhaul-soft because freight density is lower. As a result, headhaul rates per mile run 20–50% higher than backhaul rates on the same physical lane.\n\nSpot-market visibility for headhaul vs. backhaul is asymmetric. Headhaul postings can be sparse but lucrative — when freight is hot, headhaul rates spike fast. Contract carriers often dedicate to headhaul lanes and accept worse backhaul terms in exchange for guaranteed headhaul volume and predictable revenue.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Headhaul revenue defines the operational economics of a trucking business. Most of the profit on a round trip comes from the headhaul side — backhaul is often just \"don't lose money getting home,\" while headhaul is where the actual margin is earned.\n\nCarriers that pair a strong headhaul lane with a reliable backhaul lane have materially better unit economics than spot-only operators chasing rates day to day. For owner-operators, evaluating broker partnerships by headhaul vs. backhaul mix — and by who has the headhaul freight — is part of profitable broker-portfolio management. Factoring rates can sometimes be negotiated lower when the carrier brings a predictable, headhaul-heavy broker mix, because consistent revenue concentration on credit-strong brokers reduces factor risk on the receivable.",
      },
    ],
    relatedTerms: ["backhaul", "deadhead", "otr"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "weight-ticket",
    term: "Weight Ticket",
    category: "trucking-operations",
    shortDefinition:
      "Documented certified weight measurement of a loaded truck from a certified scale (CAT scale, public weigh station, or shipper scale).",
    sections: [
      {
        h2: "What it is",
        body:
          "A weight ticket is a certified weight measurement of the loaded truck — gross weight and often per-axle weight — taken at a CAT scale, public weigh station, or a shipper-operated certified scale. It provides legal documentation of actual gross weight as of a specific timestamp and location.\n\nWeight tickets matter for several compliance and operational reasons: IFTA mileage-by-weight reporting verification, hazmat loads, overweight permits, shipper invoice reconciliation, and axle-weight compliance (the federal 80,000-pound GVWR limit, plus axle-specific limits — 12,000 on steer, 34,000 on tandems). The CAT scale system runs roughly 1,500 locations nationwide and is the most common commercial weigh option: $13 for the first weigh, $3 for a re-weigh within 24 hours.\n\nSome shippers provide weight tickets automatically (it's part of the BOL package). Others require the carrier to find a scale en route and bring one back as part of the proof-of-load documentation.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "An overweight ticket at a roadside weigh station produces an immediate fine ($150–$500+ depending on the state and how far over) plus a possible CSA point on the carrier's safety record. A clean weight ticket is the carrier's defense against shipper claims of overweight loading — a real risk on flatbed and bulk freight where the carrier doesn't load the trailer.\n\nFor hazmat or oversized loads, weight tickets are part of the permit-compliance documentation and must travel with the load. Factoring companies sometimes require weight tickets on flatbed and heavy-haul loads as part of the invoice package. The few dollars per weigh is one of the cheapest insurance policies in trucking against fines, claims, and shipper disputes.",
      },
    ],
    relatedTerms: ["csa-score", "flatbed", "hazmat"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "dock-fee",
    term: "Dock Fee",
    category: "trucking-operations",
    shortDefinition:
      "Fee charged by a warehouse or distribution center for the use of dock space during loading or unloading; sometimes bundled into lumper.",
    sections: [
      {
        h2: "What it is",
        body:
          "A dock fee is a facility-charged fee for the use of dock space during loading or unloading. Sometimes it's bundled with lumper fees (one line item covers both labor and dock access). Sometimes it's separate — for example, a per-pallet handling charge at a 3PL facility that doesn't operate its own lumper service.\n\nTypical range is $20–$100 per load. Dock fees are most common at smaller warehouses and 3PLs without dedicated lumper services, where the receiver still wants to recover facility costs from the carrier or broker. The driver typically pays out of pocket — cash or check — and gets a receipt for reimbursement on the next invoice.\n\nDock fees are not the same as detention. Detention is time-based (compensation for excess waiting); dock fees are facility-fee-based (a flat charge for using the dock at all). The two can occur on the same load if the unload runs long.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Dock fees are smaller individually than lumpers or detention, but they add up across a portfolio of loads. Some brokers reimburse dock fees on the standard invoice cycle; others classify them as carrier operating costs and refuse reimbursement — read the rate confirmation before assuming.\n\nTracking receipts is essential — an unreimbursed dock fee is just another silent margin leak. Factoring companies handle dock fees identically to lumper fees on invoicing: advanced on the same invoice when documented, billed separately otherwise. On a portfolio of 200 loads a year, $40 in unreimbursed dock fees per load is $8,000 in lost margin — meaningful enough that the receipt discipline matters.",
      },
    ],
    relatedTerms: ["lumper", "accessorial-charges"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "freight-class",
    term: "Freight Class",
    abbreviation: "NMFC",
    termCode: "NMFC",
    category: "trucking-operations",
    shortDefinition:
      "NMFC-designated freight classification (50–500) that determines LTL pricing based on density, value, fragility, handling difficulty, and stowability.",
    sections: [
      {
        h2: "What it is",
        body:
          "Freight class is the National Motor Freight Classification (NMFC) classification number assigned to LTL freight. Classes range from 50 (densest, easiest to handle, cheapest) to 500 (lightest, most fragile, most expensive). The class is determined by four factors: density (pounds per cubic foot), stowability (how easily it stows alongside other freight), handling (whether it needs special handling), and liability (value, fragility, theft risk).\n\nLTL carriers — FedEx Freight, Old Dominion (ODFL), XPO, Saia, Estes — price by freight class. A pallet of dense industrial parts might be class 70; a pallet of unboxed exercise equipment might be class 250; a pallet of high-value, fragile electronics could be class 400. Classification disputes are common: shippers sometimes misclassify freight (intentionally or not) to reduce cost, and the LTL carrier re-rates on inspection, producing a back-charge to the shipper or broker.\n\nFull-truckload freight does not use freight class — it's an LTL-specific concept. FTL pricing is by lane and weight, not NMFC class.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For carriers operating in LTL — hot-shot operators, regional pup-trailer fleets, expedited LTL — freight class drives pricing. Knowing the standard NMFC classifications on common commodities (electronics, machinery parts, palletized retail) helps in quoting accurately and avoiding re-rate disputes.\n\nMisclassified freight produces re-rate charges on the carrier-shipper invoice, which become a billing-cycle problem and slow down payment. For full-truckload owner-operators, freight class is largely irrelevant — the entire trailer goes for a single rate. Some intermodal containers on certain lanes also use class-based pricing, so drayage operators occasionally need to track NMFC as well.",
      },
    ],
    relatedTerms: ["ltl", "ftl", "accessorial-charges"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
];
