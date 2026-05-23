import "server-only";
import type { GlossaryTerm } from "./types";

/* Finance-extended: rate-and-margin terminology (CPM, RPM, all-in rate,
   broker spread). Populated by feat/seo-batch-4 agent G7. */

export const FINANCE_EXTENDED_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "cpm",
    term: "Cost Per Mile",
    abbreviation: "CPM",
    termCode: "CPM",
    category: "trucking-finance",
    shortDefinition:
      "Total operating cost divided by total miles driven; the diagnostic metric that defines whether a lane or contract is profitable.",
    sections: [
      {
        h2: "What it is",
        body:
          "Cost Per Mile (CPM) is total operating cost divided by total miles driven — including deadhead miles, not just loaded miles. It is the single diagnostic number that tells an owner-operator whether a lane, a contract, or the entire operation is actually making money.\n\nThe industry-standard cost categories that roll into CPM are fuel, maintenance, truck payment, trailer payment, primary liability and physical damage insurance, factoring fee, IFTA, IRP, UCR, permits, ELD subscription, dispatch fee, and driver pay (if not owner-driven). The American Transportation Research Institute (ATRI) publishes the annual Operational Costs of Trucking report with industry averages — the 2024 baseline ran around $2.30/mile for OTR Class 8 dry van.\n\nThe denominator matters. CPM is per TOTAL mile (loaded + deadhead), not per loaded mile. Quoting CPM on loaded miles only inflates the apparent margin and is a common new-operator mistake. Some operators track CPM in two layers: variable costs (fuel, tolls, maintenance) per load to evaluate individual freight, and fixed costs (truck payment, insurance, permits) per period to evaluate operational sustainability. Diagnostic threshold: anything above $1.80–$2.00/mile in CPM signals operational stress and demands a pricing or cost review.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "CPM is the single number that distinguishes profitable owner-operators from those running themselves into the ground. Many operators focus on revenue-per-mile (RPM) without ever calculating CPM, then wonder why the margin is thin or why cash never accumulates. Lenders and factors don't directly measure CPM, but the inputs (fuel cost, fixed-cost obligations, factoring spread) feed into operational sustainability assessment during underwriting.\n\nThe gap between RPM and CPM is the margin — owner-operators should target a 25–35% gap (RPM ÷ CPM = 1.25–1.35x) for sustainable economics. Tighter than that, and there is no buffer for a blown tire, a slow-paying broker, or a soft freight market. Knowing CPM is the prerequisite for negotiating with brokers, evaluating dedicated-lane offers, and deciding when to refuse a load.",
      },
    ],
    relatedTerms: ["rpm", "deadhead", "all-in-rate"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
  {
    slug: "rpm",
    term: "Revenue Per Mile",
    abbreviation: "RPM",
    termCode: "RPM",
    category: "trucking-finance",
    shortDefinition:
      "Total revenue divided by total miles driven; the headline number quoted in spot-market and contract pricing, but only meaningful when compared to CPM.",
    sections: [
      {
        h2: "What it is",
        body:
          "Revenue Per Mile (RPM) is total revenue (line-haul + fuel surcharge + accessorials) divided by total miles driven, including deadhead. It is the headline number quoted in every spot-market lane discussion ($2.50/mile, $3.00/mile) and the basis on which contract carriers negotiate dedicated lanes.\n\nATRI publishes industry-average rates. The 2024 spot-market average ran around $2.40–$2.80/mile for OTR Class 8 dry van. Reefer and flatbed run higher because of equipment cost and operational complexity. Hot-shot and expedited freight run materially higher per mile but on shorter, less consistent runs. RPM is not the same as line-haul rate — accessorials (detention, layover, tarp pay, lumper, etc.) and fuel surcharge add to RPM, and a load with strong line-haul but weak accessorial collection can realize lower RPM than the rate confirmation suggested.\n\nSome operators quote RPM by loaded mile only, ignoring deadhead. That practice inflates the number and creates a false sense of profitability. The honest calculation uses total miles in the denominator.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "RPM by itself is meaningless without knowing CPM. A $2.50/mile RPM on a $2.30 CPM operation is barely viable — 8% gross margin before any unexpected event eats it. The headline RPM quoted to a driver looking at a load doesn't include deadhead repositioning, fuel-surcharge volatility on long-distance lanes, or accessorial collection rate, which means the realized RPM is often 10–20% lower than the rate confirmation.\n\nUnderstanding the RPM-CPM gap is the difference between profitability and slow insolvency. Lenders sometimes look at RPM trends as a signal of carrier pricing power and broker-mix quality — a carrier whose realized RPM is rising in a flat market is winning on customer selection, not just lane luck.",
      },
    ],
    relatedTerms: ["cpm", "all-in-rate", "accessorial-charges"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "all-in-rate",
    term: "All-In Rate",
    category: "trucking-finance",
    shortDefinition:
      "Combined rate per mile or per load that includes line-haul, fuel surcharge, and all accessorials in a single flat number.",
    sections: [
      {
        h2: "What it is",
        body:
          "An all-in rate is the combined per-mile or per-load rate that includes line-haul, fuel surcharge, and known accessorials in a single number. It is the most common quote format in spot-market broker conversations: \"I have a $3.00 all-in on that lane.\" The carrier knows immediately what they will collect; the broker avoids itemized negotiation.\n\nAll-in is simpler than line-haul + FSC + accessorials separately, but the simplification carries risk. Unexpected accessorials — detention beyond two hours, layover, lumper, TONU, reconsignment — are NOT covered by an all-in rate unless explicitly itemized in the rate confirmation. A carrier accepting an all-in rate is implicitly accepting that any extras above the quoted number must be re-negotiated when they happen, often from a weak position because the load is already in motion.\n\nThe reverse model — line-haul + FSC + accessorials billed separately — is preferred by some carriers for collection transparency and by some brokers for contract freight, where fuel-surcharge programs are tied to a published index. Spot-market freight defaults to all-in for negotiation speed; contract carriers split between the two.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "For owner-operators, accepting an all-in rate means accepting accessorial risk — the rate quoted is what you'll collect, period, unless you negotiate add-ons in writing before the load moves. For brokers, offering all-in is cleaner billing and faster booking. Understanding what's IN and what's OUT of an all-in rate is the negotiation skill that separates new operators from experienced ones.\n\nFactoring companies handle all-in rates identically to line-haul + separate billing — they advance against the invoice face value regardless of how the rate was structured. The rate format affects the carrier's collection mechanics and broker relationship, not the factor's underwriting.",
      },
    ],
    relatedTerms: ["cpm", "rpm", "fuel-surcharge", "accessorial-charges"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "broker-spread",
    term: "Broker Spread",
    category: "trucking-finance",
    shortDefinition:
      "The difference between what a shipper pays a freight broker and what the broker pays the carrier; the broker's gross margin on the load.",
    sections: [
      {
        h2: "What it is",
        body:
          "Broker spread is the difference between what the shipper pays a freight broker and what the broker pays the carrier — the broker's gross margin on a single load. Typical spread varies by lane and market conditions: industry-average runs 8–15% of shipper-paid rate, but spread can stretch to 20%+ on tight-capacity lanes and compress to 3–5% on competitive freight where multiple brokers are bidding the same shipper.\n\nThe spread is what funds the broker's operations, sales team, risk management, billing infrastructure, and profit. The broker's value-add to the shipper is shipper relationships and contract maintenance, capacity sourcing across thousands of carriers, credit risk on shippers (the broker pays carriers within 30 days while waiting 60+ for shipper payment), dispute resolution, and consolidated billing.\n\nFMCSA's broker transparency rule — proposed and with status uncertain through 2026 — would require disclosure of the spread on individual loads to the carrier. Today, the spread is generally opaque to the carrier unless the carrier has direct shipper relationships or is sophisticated enough to triangulate.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Spread awareness affects how owner-operators evaluate broker relationships. A broker running a consistent 8% spread on profitable lanes is a better long-term partner than one extracting 20% on the same physical lanes — the carrier is doing the same work for less. The proposed FMCSA broker transparency rule, if passed, would shift the dynamic significantly by giving carriers leverage in pricing conversations.\n\nFor owner-operators considering becoming their own broker or going direct to shippers, understanding typical spreads helps in pricing decisions and in evaluating whether direct freight is worth the operational overhead. Lenders rarely care about broker spread directly, but factoring companies' broker-credit underwriting touches on broker financial health — extreme spread pressure on a broker can signal a struggling business and a slow-pay risk on the invoice.",
      },
    ],
    relatedTerms: ["dispatch-fee", "all-in-rate", "recourse-factoring"],
    relatedProducts: [
      { url: "/factoring", label: "Invoice factoring for truckers" },
      { url: "/methodology", label: "Dispatched methodology" },
    ],
  },
];
