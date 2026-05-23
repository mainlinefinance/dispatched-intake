import "server-only";
import type { GlossaryTerm } from "./types";

/* Trucking-finance terms beyond factoring-recourse/non-recourse:
   advance rate, ACH, MCA, ABL, equipment loan structures, etc.
   Populated by feat/seo-batch-3 agent G3. */

export const FINANCE_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "advance-rate",
    term: "Advance Rate",
    category: "trucking-finance",
    shortDefinition:
      "The percentage of an invoice's face value that a factoring company advances to the carrier, typically 80–97%; remainder is held in reserve until broker pays.",
    sections: [
      {
        h2: "What it is",
        body:
          "Advance rate is the percentage of an invoice's face value that a factoring company advances to the carrier upfront when the invoice is submitted. The standard industry range is 80–97%. The factor holds the remainder in a reserve account until the broker actually pays the invoice; once the payment clears, the factor releases the reserve to the carrier minus the factoring fee.\n\nSome factors market \"advance rates up to 100%\" — read those quotes closely. They typically exclude the reserve hold mechanically (the reserve still exists, it's just rebated faster) or apply only to top-tier broker credit. Higher headline advance rates pull more cash forward, but the trade-off is usually a slightly higher fee or a tighter chargeback window. Some factors offer tiered advance rates based on the broker credit score on each load — Tier-1 broker invoices get 95%+, marginal-credit brokers get 85% or less. Tiered advances are more common on non-recourse contracts where the factor is pricing risk per broker.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For an owner-operator running tight cash flow, the difference between 90% and 97% advance can be the difference between making payroll and not — on $80K of outstanding receivables, that's $5,600 of immediate working capital. Advance rate is one of the three numbers that actually matter when comparing factoring offers, alongside the rate and the contract length. Some working-capital lenders also size facilities against outstanding factoring receivables, which means advance rate also affects total borrowing capacity beyond the factor itself.",
      },
    ],
    relatedTerms: ["recourse-factoring", "non-recourse-factoring"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
      { url: "/factoring/no-credit-check", label: "No credit check factoring" },
    ],
  },
  {
    slug: "ach",
    term: "ACH",
    abbreviation: "ACH",
    termCode: "ACH",
    category: "trucking-finance",
    shortDefinition:
      "Automated Clearing House — electronic bank transfer network used for direct deposit of factoring advances and most carrier-to-broker payments.",
    sections: [
      {
        h2: "What it is",
        body:
          "ACH stands for Automated Clearing House — the US electronic bank-to-bank transfer network operated by NACHA. It is the rails behind direct deposit, vendor payments, recurring bill pay, and most factoring advances. Standard ACH settles in 1–2 business days; Same-Day ACH (rolled out by NACHA in phases starting 2016) settles in 0–1 business day depending on submission cutoff.\n\nACH is materially cheaper than wire transfer — typically $0–$3 per transaction versus $15–$50 for an outgoing wire. There are two flavors. ACH credits are incoming transfers (a factor depositing an advance into the carrier's account, a broker paying an invoice). ACH debits are outgoing pulls authorized by the receiver (a loan servicer auto-deducting a payment, a fuel-card provider settling a weekly balance). Most factoring funding hits as ACH credit; most loan repayments come out as ACH debit.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Factoring funding speed often hinges on ACH timing. Same-Day ACH costs slightly more but lets a Friday-afternoon invoice fund Friday night versus Monday morning — often the difference between making weekend fuel and parking the truck. Some factors charge per-transaction ACH fees (small, but adds up over hundreds of advances). Wire transfers settle faster but are 10–50× more expensive. Knowing the ACH cutoff windows (typically 4–5 PM ET for Same-Day) means timing invoice submissions for fastest funding.",
      },
    ],
    relatedTerms: ["advance-rate", "lockbox", "recourse-factoring"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "mca",
    term: "Merchant Cash Advance",
    abbreviation: "MCA",
    termCode: "MCA",
    category: "trucking-finance",
    shortDefinition:
      "Lump-sum cash advance against future business revenue, typically with daily ACH deductions; high effective APR but easier qualification than term loans.",
    sections: [
      {
        h2: "What it is",
        body:
          "A Merchant Cash Advance (MCA) is a lump-sum advance against future business revenue. Repayment is made via daily or weekly ACH deductions tied to a percentage of revenue — typically 8–15% of daily deposits. Legally, an MCA is structured as a sale of future receivables, not a loan, which is how the product avoids most state usury caps. Effective APR equivalents commonly run 40–150% depending on the factor rate and the holdback period.\n\nUnderwriting is fast: 24–72 hours from application to funding, based primarily on bank deposits rather than credit. The MCA quote uses a \"factor rate\" of 1.2–1.5: a carrier receiving $50K at a 1.4 factor rate repays $70K total. There is no APR on the contract — the cost is baked into the factor rate and the holdback timeline. In trucking, MCAs are most common as emergency working capital after a major repair, an unexpected insurance event, or a slow-paying broker that disrupts cash flow.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "MCAs are fast but expensive. Legitimate use cases exist — emergency repair, time-sensitive opportunity — but stacking multiple MCAs is the leading cause of owner-operator insolvency. Lenders evaluating any other working-capital application will heavily discount or decline applicants with active MCA balances. Aggressive MCA providers also file blanket UCC-1s on \"all assets,\" which can block other lenders from securing collateral for years afterward.",
      },
    ],
    relatedTerms: ["working-capital", "term-loan", "ucc-1"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "abl",
    term: "Asset-Based Lending",
    abbreviation: "ABL",
    termCode: "ABL",
    category: "trucking-finance",
    shortDefinition:
      "Revolving credit facility secured by accounts receivable, equipment, or inventory; typical for fleets with $5M+ annual revenue.",
    sections: [
      {
        h2: "What it is",
        body:
          "Asset-Based Lending (ABL) is a revolving credit facility secured by tangible business assets — primarily accounts receivable, but also equipment, inventory, and sometimes real estate. Borrowing capacity is calculated against a borrowing base: typically 80–85% of eligible receivables plus an advance rate against equipment. Pricing usually runs Prime + 2–6%, materially cheaper than factoring.\n\nABL lenders require a field exam (an independent auditor verifies receivables, equipment, and controls), monthly borrowing-base certificates, and financial covenants on liquidity, leverage, and fixed-charge coverage. Minimum facility size is usually $1M+, with most ABL lenders preferring $5M+ in commitment. Major ABL providers active in trucking include Triumph Bancorp, eCapital, Wells Fargo, and Bank of America Merrill Lynch. Some facilities bundle equipment-loan tranches alongside the revolver to consolidate the carrier's debt stack with one lender.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "ABL is what factoring graduates into for mid-sized fleets. Same concept — lending against receivables — but cheaper, more flexible, and less operationally invasive (no per-invoice verification, no broker notification on every load). Transitioning from factoring to ABL is a milestone for growing fleets, typically around $5M annual revenue. Underwriting is more rigorous (audited financials, projections, covenants) but unlocks materially lower cost of capital — often 4–8% all-in versus 12–20% on factoring spread.",
      },
    ],
    relatedTerms: ["working-capital", "line-of-credit", "recourse-factoring"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "equipment-loan",
    term: "Equipment Loan",
    category: "trucking-finance",
    shortDefinition:
      "Term loan secured by the financed vehicle (truck, trailer, or other equipment); standard structure for buying Class 8 tractors and trailers.",
    sections: [
      {
        h2: "What it is",
        body:
          "An equipment loan is a term loan secured by the equipment being financed. The lender holds a lien on the title until the loan is paid off and releases it on payoff. Equipment loans are the standard structure for purchasing Class 8 tractors, dry vans, reefers, flatbeds, lift gates, APUs, and other trucking-specific assets.\n\nTerms typically run 24–84 months for tractors and 36–60 months for trailers. APR observed on the Dispatched panel runs 9–18% depending on credit, revenue history, equipment age, and down payment. Down payment is typically 10–20% of purchase price, with zero-down programs available to carriers with strong credit and revenue history. The lender appraises the equipment before funding and will not finance over-market sticker prices — the loan amount is capped at the appraised value, regardless of what the dealer is asking. Used equipment, particularly tractors over 7 years old or with high mileage, faces shorter terms and higher rates.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Equipment loans are how owner-operators build equity in their trucks. Every payment increases ownership, unlike lease-purchase where equity is contingent on completing the contract. APR depends on credit, revenue history, down payment, and equipment age. Longer terms lower the monthly payment but increase total interest paid. Equipment refinancing — taking equity out of a paid-down truck — is sometimes used as cheaper working capital than an MCA or unsecured short-term loan.",
      },
    ],
    relatedTerms: ["term-loan", "balloon-payment", "working-capital"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/semi-truck-financing", label: "Semi truck financing" },
      { url: "/semi-truck-financing/no-money-down", label: "No money down semi truck financing" },
    ],
  },
  {
    slug: "working-capital",
    term: "Working Capital",
    category: "trucking-finance",
    shortDefinition:
      "Short-term unsecured business funding used to bridge cash-flow gaps, cover operating expenses, or capitalize on opportunities; APR typically 14–34%.",
    sections: [
      {
        h2: "What it is",
        body:
          "Working capital is short-term unsecured business funding — no collateral required. It is used for covering operating expenses during slow weeks, bridging factoring delays, paying for emergency repairs, and funding growth investments like a second truck or a fuel-card deposit. APR observed on the Dispatched panel runs 14–34%, with terms typically 6–24 months. Repayment is commonly via daily or weekly ACH debits.\n\nWorking-capital underwriting is based on bank deposits and credit — no asset valuation needed, no equipment appraisal. Funding speed is fast: 24–72 hours from approval to deposit. Working capital is not the same as a Merchant Cash Advance. Working capital is a true loan with a stated APR, fixed repayment schedule, and amortization. An MCA is a sale of future receivables priced with a factor rate. The structural difference matters for tax treatment, default rights, and how lenders view the obligation when underwriting subsequent facilities.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Working capital is the trucking carrier's cushion for unexpected events. A blown engine doesn't have to mean a missed truck payment if working capital is in place. APR is higher than equipment loans because the loan is unsecured, short-term, and priced for speed. For first-time owner-operators, working capital is harder to qualify for than equipment financing — there's no asset to underwrite, so build 6+ months of bank statements first. Misuse — covering persistent operational losses — accelerates insolvency.",
      },
    ],
    relatedTerms: ["mca", "line-of-credit", "term-loan"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "line-of-credit",
    term: "Line of Credit",
    category: "trucking-finance",
    shortDefinition:
      "Revolving credit facility allowing the carrier to draw funds as needed up to an approved limit; pays interest only on drawn balance.",
    sections: [
      {
        h2: "What it is",
        body:
          "A line of credit is a revolving credit facility — the carrier can draw, repay, and redraw repeatedly up to an approved limit (e.g. $50K, $250K). Interest is charged only on the drawn balance, not the full limit. Rates typically run Prime + 4–10% depending on whether the line is secured (lower rate) or unsecured (higher rate). Business lines of credit are common in the $25K–$500K range for trucking carriers.\n\nProviders split between traditional banks (Bank of America, regional banks) and online lenders (Bluevine, Fundbox, OnDeck). Bank-issued lines are cheaper but slower to underwrite and harder to qualify for. Online lines are faster (often 24–72 hours) but priced higher. Typical underwriting requirements: 6–24 months in business, $100K+ annual revenue, 600+ FICO. Some lines auto-renew annually with a soft credit pull; others require a full re-underwrite.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "A pre-approved line of credit is the trucking carrier's strongest cash-flow buffer. Having $50K of available capital that you only pay for when you use it beats paying ongoing interest on a $50K term loan you only needed for two weeks. Lines of credit are harder to qualify for than working-capital term loans (longer track record required) but materially cheaper over time for carriers with intermittent cash needs. Combining factoring + line of credit is a common owner-operator cash-flow architecture.",
      },
    ],
    relatedTerms: ["working-capital", "term-loan", "abl"],
    relatedProducts: [
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "term-loan",
    term: "Term Loan",
    category: "trucking-finance",
    shortDefinition:
      "Lump-sum business loan repaid over a fixed schedule with interest; the standard structure for equipment purchases and major capital expenditures.",
    sections: [
      {
        h2: "What it is",
        body:
          "A term loan is a lump-sum loan with a fixed repayment schedule, typically monthly. Interest can be fixed or variable. The loan can be secured (an equipment loan against a tractor) or unsecured (a working-capital term loan). Terms in commercial trucking commonly run 12–84 months. Principal and interest are amortized over the term, so each payment includes both — early payments are interest-heavy, later payments are principal-heavy.\n\nA term loan differs from a line of credit: a term loan is a one-time draw with a set repayment schedule, while a line is revolving. It also differs from an MCA: a term loan has a true APR (a stated interest rate), while an MCA has a factor rate. SBA loans are a subset of term loans — government-backed, with longer terms and lower rates than conventional bank term loans, but slower to underwrite. Most equipment financing is structured as a term loan; most working capital is also term-loan structured.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Term loans are the financial primitive for big purchases — buy the truck, buy the trailer, buy the tools. The math is simple but small APR differences compound dramatically over 60–84 months. Running multiple stacked term loans creates fixed-cost rigidity: an owner-op with $4K/month in truck + trailer + working-capital payments has very little flex when revenue dips. Consolidating multiple term loans into one is sometimes cheaper but extends overall repayment.",
      },
    ],
    relatedTerms: ["equipment-loan", "working-capital", "sba-loan"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "sba-loan",
    term: "SBA Loan",
    abbreviation: "SBA",
    termCode: "SBA",
    category: "trucking-finance",
    shortDefinition:
      "Small Business Administration-guaranteed loan with longer terms (up to 10–25 years) and lower rates than conventional commercial loans.",
    sections: [
      {
        h2: "What it is",
        body:
          "SBA stands for the US Small Business Administration. SBA loans are not made by the SBA — they are made by partner banks and non-bank lenders, with the SBA guaranteeing a portion (typically 75–85%) of the loan to reduce lender risk. The main programs are the 7(a) (general purpose, up to $5M), the 504 (real estate and major equipment, up to $5M+ when paired with conventional financing), and the Microloan (up to $50K through nonprofit intermediaries).\n\nSBA 7(a) terms run up to 10 years for working capital and equipment, and up to 25 years for real estate. Rates are pegged to Prime + 2.25–4.75% depending on loan size and term. Underwriting is more rigorous than conventional commercial lending: 3 years of tax returns, business plan, projections, personal financial statement, and personal guarantee. Approval timeline runs 30–90+ days; SBA Preferred Lenders (e.g. Live Oak Bank, Newtek) can compress that to 30–45 days.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "SBA loans are the cheapest commercial financing trucking operators can access — but the 30–90 day underwriting timeline rules them out for emergency cash. SBA 7(a) for trucking is real but requires a full business case, often easier for fleet owners than single-truck owner-ops. SBA loans rarely fit factoring or short-term working-capital use cases (timeline mismatch) but are excellent for major planned equipment purchases like fleet expansion.",
      },
    ],
    relatedTerms: ["term-loan", "equipment-loan", "working-capital"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "lockbox",
    term: "Lockbox",
    category: "trucking-finance",
    shortDefinition:
      "Address or bank account designated for invoice payments where the factoring company receives broker payments directly, used to control collections.",
    sections: [
      {
        h2: "What it is",
        body:
          "A lockbox is a designated payment address (a PO Box) or bank account where broker payments are routed. In factoring, the factor sets up a lockbox — usually at the factor's bank — and the carrier instructs every broker to send payment to that address or account. Broker payments arrive directly at the factor (not the carrier); the factor then settles with the carrier, releasing reserves after fees and chargebacks are netted out.\n\nLockbox routing is required by most factoring contracts as a condition of advance. Without it, broker payments would land in the carrier's account, and the factor's UCC-1 lien on receivables couldn't be perfected operationally — the factor would have no control over the collateral it just advanced against. Some factors use a hybrid \"verification + lockbox\" structure where the carrier handles broker outreach but the factor verifies the broker before advancing and still routes the payment to the factor lockbox.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Lockbox arrangements are why some carriers feel \"trapped\" by factoring — the broker payment infrastructure must be reconfigured back to the carrier when leaving a factor (notification letters, broker re-keying remit-to addresses, sometimes 60–90 day overlap). ABL facilities sometimes require similar lockbox arrangements. Understanding lockbox routing is critical when evaluating factoring contracts; sloppy lockbox transitions are a leading cause of factor-switch friction and double-paid or lost invoices.",
      },
    ],
    relatedTerms: ["recourse-factoring", "ach", "ucc-1"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "ucc-1",
    term: "UCC-1",
    abbreviation: "UCC-1",
    termCode: "UCC-1",
    category: "trucking-finance",
    shortDefinition:
      "Uniform Commercial Code financing statement filed by a lender or factor to publicly establish a security interest in business assets.",
    sections: [
      {
        h2: "What it is",
        body:
          "A UCC-1 is a Uniform Commercial Code financing statement (Form 1) filed at the state-level Secretary of State office. It establishes a public lien — a security interest — on identified business assets, typically accounts receivable, equipment, inventory, or \"all assets.\" UCC-1 filings last 5 years and are renewable.\n\nFactoring companies file UCC-1s against accounts receivable. Equipment lenders file against the specific equipment. MCA providers often file blanket \"all assets, all states\" UCC-1s, which is more aggressive than what the underlying advance actually secures. Banks file against whatever the loan covers. A UCC search at the carrier's state Secretary of State is part of any commercial-loan due diligence — every prospective lender pulls one before approving a new facility, and pre-existing filings affect what additional collateral the new lender can attach.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "A UCC-1 filing affects all future borrowing. A lender doing due diligence will see existing UCC filings and may decline if their security interest can't be perfected. Aggressive MCA providers file blanket UCC-1s that block factoring and equipment financing for years. Before signing any commercial financing, ask which UCC-1 the lender will file and on what assets. UCC-1 termination on payoff is the lender's responsibility but doesn't always happen automatically — verify after every payoff.",
      },
    ],
    relatedTerms: ["mca", "lockbox", "recourse-factoring"],
    relatedProducts: [
      { url: "/methodology", label: "Dispatched methodology" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "balloon-payment",
    term: "Balloon Payment",
    category: "trucking-finance",
    shortDefinition:
      "Large lump-sum payment due at the end of a loan term, with smaller monthly payments throughout the term; common in equipment financing.",
    sections: [
      {
        h2: "What it is",
        body:
          "A balloon payment is a large lump-sum payment due at the end of a loan term, with smaller intermediate payments throughout. The intermediate payments are often interest-only, or they are amortized as if the loan ran on a longer hypothetical schedule (e.g. payments calculated for a 10-year amortization on a loan that actually matures in 5). The balloon equals the remaining principal at maturity.\n\nA typical structure in equipment financing is a 5-year term with monthly payments calculated as if the loan amortized over 10 years; at month 60, the outstanding principal is due in a single payment. The rationale is lower monthly burden during the operational ramp-up, with the carrier expected to refinance the balloon, sell the equipment, or pay it off from accumulated cash before maturity. Balloon structures also appear in lease-purchase contracts as the \"purchase\" payment at lease end. Less common in working capital, where amortizing structures dominate.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Balloon structures shift risk. Monthly cash flow looks better, but the carrier must either refinance, sell the equipment, or come up with the lump sum at maturity. If the equipment value at maturity is below the balloon (depreciated truck), the carrier owes more than the truck is worth. Lenders pricing balloons assume refinance — ask explicitly if the balloon is fixed or refinanceable. For first-time owner-operators, fully-amortized loans are usually safer despite the slightly higher monthly.",
      },
    ],
    relatedTerms: ["equipment-loan", "term-loan", "lease-purchase"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/semi-truck-financing", label: "Semi truck financing" },
    ],
  },
];
