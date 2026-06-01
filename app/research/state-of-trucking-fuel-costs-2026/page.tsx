import type { Metadata } from "next";
import Link from "next/link";
import ResearchByline from "@/components/landing/ResearchByline";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "State of Trucking Fuel Costs 2026 — Dispatched Research",
  description:
    "Annual report on commercial trucking fuel: 2026 diesel pricing, IFTA dynamics, factor fuel programs (Apex/eCapital/RTS), fuel surcharge math, and the alternative-fuel landscape.",
  alternates: {
    canonical: "/research/state-of-trucking-fuel-costs-2026",
  },
  openGraph: {
    title: "State of Trucking Fuel Costs 2026 — Dispatched Research",
    description:
      "Annual report on commercial trucking fuel: 2026 diesel pricing, IFTA dynamics, factor fuel programs (Apex/eCapital/RTS), fuel surcharge math, and the alternative-fuel landscape.",
    url: "/research/state-of-trucking-fuel-costs-2026",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "State of Trucking Fuel Costs 2026 — Dispatched Research",
    description:
      "Annual report on commercial trucking fuel: 2026 diesel pricing, IFTA dynamics, factor fuel programs (Apex/eCapital/RTS), fuel surcharge math, and the alternative-fuel landscape.",
  },
};

const SOURCES: ReadonlyArray<{ label: string; url: string }> = [
  {
    label:
      "U.S. Energy Information Administration (EIA) — Weekly Retail On-Highway Diesel Prices",
    url: "https://www.eia.gov/petroleum/gasdiesel/",
  },
  {
    label:
      "U.S. Department of Energy — National average diesel index used in fuel surcharge benchmarking",
    url: "https://www.energy.gov/",
  },
  {
    label:
      "Internal Revenue Service — Form 720 federal excise tax on diesel ($0.243/gallon) and Form 2290 HVUT",
    url: "https://www.irs.gov/forms-pubs/about-form-720",
  },
  {
    label:
      "International Fuel Tax Agreement (IFTA) — articles of agreement, audit manual, and procedures manual",
    url: "https://www.iftach.org/",
  },
  {
    label:
      "California Air Resources Board — Low Carbon Fuel Standard and Cap-and-Trade carbon credit data",
    url: "https://ww2.arb.ca.gov/our-work/programs/low-carbon-fuel-standard",
  },
  {
    label:
      "Apex Capital Corp — Fuel Card program disclosures and discount claims",
    url: "https://www.apexcapitalcorp.com/services/trucking-fuel-card/",
  },
  {
    label:
      "eCapital — TruckersEdge / Fuel Card network coverage and rebate program",
    url: "https://ecapital.com/freight-factoring/",
  },
  {
    label:
      "RTS Financial — Carrier fuel card and discount disclosures",
    url: "https://www.rtsinc.com/services/rts-fleet-card",
  },
  {
    label:
      "Triumph Financial — Trucking factoring and fuel card disclosures",
    url: "https://www.triumphpay.com/",
  },
  {
    label:
      "TBS Factoring Service — Love's Connect fuel card transition disclosures",
    url: "https://www.tbsfactoring.com/",
  },
  {
    label:
      "Comdata, EFS, and WEX (FleetOne) — fleet card network documentation",
    url: "https://www.comdata.com/",
  },
  {
    label:
      "EPA SmartWay Transport Partnership — idle reduction and fuel efficiency program",
    url: "https://www.epa.gov/smartway",
  },
  {
    label:
      "California Air Resources Board — Advanced Clean Fleets and Phase 3 zero-emission vehicle mandates",
    url: "https://ww2.arb.ca.gov/our-work/programs/advanced-clean-fleets",
  },
  {
    label:
      "Daimler Truck North America — Freightliner eCascadia battery-electric Class 8 product disclosures",
    url: "https://www.freightliner.com/trucks/ecascadia/",
  },
  {
    label:
      "Volvo Trucks North America — VNR Electric battery-electric Class 8 product disclosures",
    url: "https://www.volvotrucks.us/trucks/vnr-electric/",
  },
  {
    label:
      "American Transportation Research Institute (ATRI) — Operational Costs of Trucking annual analysis",
    url: "https://truckingresearch.org/",
  },
  {
    label:
      "OPEC Monthly Oil Market Report and EIA Short-Term Energy Outlook — crude price drivers",
    url: "https://www.eia.gov/outlooks/steo/",
  },
];

export default function StateOfTruckingFuelCosts2026() {
  const today = new Date().toISOString().slice(0, 10);
  const url =
    "https://dispatched.finance/research/state-of-trucking-fuel-costs-2026";
  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Research", url: "https://dispatched.finance/research" },
          {
            name: "State of Trucking Fuel Costs 2026",
            url,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "State of trucking fuel costs, 2026",
          description:
            "Annual Dispatched Research report on commercial trucking fuel: 2026 diesel pricing, fuel surcharge dynamics, factor fuel programs, IFTA reporting realities, idle reduction technology, and the slow ramp of alternative-fuel adoption.",
          url,
          datePublished: today,
          dateModified: "2026-05-11",
          authorName: "Angelo Orru Neto",
        })}
      />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">
              Dispatched Research · Annual report · Updated Q2 2026
            </p>
            <h1 className="research-h1">
              State of trucking fuel costs, 2026.
            </h1>
            <p className="research-subhead">
              Fuel is the largest variable cost in trucking — typically
              $0.60–$0.75/mile for OTR Class 8 operations in 2026. This
              report covers the 2026 diesel price environment, fuel
              surcharge dynamics, factor fuel programs, IFTA reporting
              realities, and the slow ramp of alternative-fuel adoption.
            </p>
            <ResearchByline
              publishedDate={today}
              sourceCount={17}
              methodologyNote="Data through April 2026."
            />
          </header>

          <section className="research-section" id="q2-2026-update">
            <h2>Q2 2026 update</h2>
            <p>
              National average diesel through April 2026 ran
              $3.85–$4.10/gal retail. CARB Phase 3 began phasing in
              starting January 2026. BEV Class 8 truck registrations
              grew modestly but remain under 0.5% of new sales. Factor
              fuel programs (Apex 51¢, RTS 40¢) unchanged.
            </p>
          </section>

          <nav className="research-toc" aria-label="Table of contents">
            <p className="research-toc-eyebrow">Contents</p>
            <ol>
              <li><a href="#executive-summary">1. Executive summary</a></li>
              <li><a href="#diesel-environment">2. The 2026 diesel price environment</a></li>
              <li><a href="#fuel-taxation">3. Federal and state fuel taxation</a></li>
              <li><a href="#fuel-surcharge">4. Fuel surcharge collection dynamics</a></li>
              <li><a href="#factor-fuel-programs">5. Factor fuel programs head-to-head</a></li>
              <li><a href="#ifta">6. IFTA reporting in 2026</a></li>
              <li><a href="#fuel-cards">7. Fuel cards and float</a></li>
              <li><a href="#idle-reduction">8. Idle reduction tech</a></li>
              <li><a href="#alt-fuel">9. Alternative-fuel adoption status</a></li>
              <li><a href="#cost-share">10. Fuel cost as percentage of revenue</a></li>
              <li><a href="#predictions">11. Predictions for 2026–2027</a></li>
              <li><a href="#methodology">12. Methodology and sources</a></li>
            </ol>
          </nav>

          <section className="research-section" id="executive-summary">
            <h2>1. Executive summary</h2>
            <p>
              Diesel is the structurally largest variable cost in
              over-the-road trucking, and 2026 is a year in which that
              cost has settled into a wide but not extreme range. The
              EIA national average on-highway retail diesel price has
              traded in a band roughly $3.50–$5.00 through the report
              horizon, with fleet-card net-of-discount pricing landing
              materially below that at $3.00–$4.50 depending on
              region, volume, and program economics. The 2026
              environment is calmer than the 2022 spike that pushed
              the national average past $5.50 and calmer than the
              2008 spike before it, but it is structurally above the
              $2.50–$3.00 band that defined 2017–2020.
            </p>
            <p>
              Five high-level findings shape the rest of the report.
              <strong> One:</strong> fuel is 20–30% of operating
              revenue for a typical OTR Class 8 owner-operator at
              2026 rate levels, and the per-mile cost is $0.60–$0.75
              before fuel surcharge offset. <strong>Two:</strong>{" "}
              fuel surcharge (FSC) collection works in 2026 — the
              EIA national average index is the universal benchmark
              and a typical $0.04/mile-per-$0.06-over-baseline
              formula yields meaningful offset, but FSC capture rates
              vary by broker tier and by contract structure.{" "}
              <strong>Three:</strong> factor-bundled fuel cards
              materially compress the per-gallon cost — Apex
              advertises up to $0.51/gallon off retail at network
              stops, eCapital averages around $0.20/gallon across
              16,000 locations (Pilot Flying J, TA Petro, and
              independents), and RTS Fleet Card claims up to
              $0.40/gallon, with the realized average always
              materially below the headline number.
            </p>
            <p>
              <strong>Four:</strong> IFTA reporting in 2026 is
              effectively a software problem rather than a paperwork
              problem. ELD GPS data plus fuel-card purchase data feed
              automated jurisdiction-mile and gallon allocations at
              every major fleet management platform; the quarterly
              return is now a review-and-approve exercise rather
              than a from-scratch compilation for any operator with
              modern tooling. <strong>Five:</strong> alternative-fuel
              adoption — battery-electric Class 8, hydrogen
              fuel-cell, CNG, LNG — remains a marginal share of the
              U.S. fleet in 2026 despite headline product launches
              and CARB regulatory pressure. Battery-electric Class 8
              trucks (Freightliner eCascadia, Volvo VNR Electric,
              Tesla Semi) are real product categories with real
              fleet pilots but real range and depot-charging
              constraints that keep them inside specific operational
              windows; diesel remains the default for general OTR
              freight through the report horizon and into 2027.
            </p>
            <p>
              The single most actionable read for owner-operators
              and small fleets in 2026: fuel cost management is
              boring, scaled, and structural. The operators who win
              on fuel in 2026 win by getting the basics right — a
              factor-bundled or independent fuel card with a
              competitive discount, disciplined fuel-stop routing
              against network availability, an FSC structure that
              survives the lane mix, automated IFTA reporting, and
              periodic idle audits. Operators who chase headline
              discount numbers without doing the operational work
              underneath leave most of the available savings on the
              table.
            </p>
          </section>

          <section className="research-section" id="diesel-environment">
            <h2>2. The 2026 diesel price environment</h2>
            <p>
              The 2026 diesel price environment is defined by a
              return to ranged trading after the 2021–2023 cycle of
              spikes and corrections. The EIA national average
              on-highway retail diesel price — the most-cited public
              benchmark for U.S. trucking fuel cost — has traded in
              a band of roughly $3.50–$5.00 through the report
              horizon, with the midpoint near $4.00 and the band
              compressing in the back half of 2025 before widening
              modestly in early 2026. Behind the national headline,
              the regional and volume-tier variation is large enough
              that the headline number understates the dispersion
              that fleets actually experience.
            </p>
            <p>
              <strong>Regional dispersion</strong> is the dominant
              feature of the 2026 retail-side picture. California
              sits at the top of the range, with retail on-highway
              diesel routinely trading $1.00–$1.50 above the
              national average — the cap-and-trade carbon credit
              overlay (covered in section 3 below), the LCFS
              (Low Carbon Fuel Standard) compliance cost, the state
              excise tax, and refinery-side constraints all
              contribute. New York and the broader Northeast follow,
              typically $0.30–$0.60 above the national average,
              driven by state excise differentials and refining
              logistics. The Gulf Coast region (Texas, Louisiana,
              Mississippi) consistently runs $0.20–$0.50 below the
              national average, reflecting the refining base and a
              lower state excise tax structure. The Midwest and the
              Mountain West sit in a middle band that tracks the
              national average closely, with weekly variance driven
              more by local supply dynamics than by structural
              regional differentials.
            </p>
            <p>
              <strong>Fleet-card net-of-discount pricing</strong>{" "}
              tells a different story than the retail headline. At
              the national network operators (Pilot Flying J, TA
              Petro, Love&apos;s) under a fuel-card discount
              program, the realized per-gallon cost is materially
              lower than the cash-retail signage at the pump. A
              fleet running a competitive fuel-card program in 2026
              typically pays $0.20–$0.50 below the EIA national
              retail average on a network-weighted basis, with the
              tighter end of the range applying to operators on
              factor-bundled programs (covered in section 5) and the
              wider end applying to volume-tier fleet cards. The
              fleet-card-versus-retail spread is the single largest
              actionable variable in per-gallon fuel cost for most
              owner-operators and small fleets in 2026.
            </p>
            <p>
              <strong>Refinery dynamics</strong> through 2024–2026
              have been quieter than the headline-driven 2022–2023
              window, with U.S. refining utilization running near
              long-term averages and crack spreads on distillate
              compressing from the 2022 peak. The macro-side
              variables that drive diesel pricing — crude oil price,
              global distillate demand, refinery turnaround
              schedules, and inventory levels — have all moved into
              less volatile ranges than the preceding two-year
              window, which has produced the calmer 2026 price
              behavior. The structural tightness in distillate
              refining capacity that defined the 2022–2023 spike has
              partially eased but has not fully reversed; capacity
              remains structurally tight relative to the late-2010s
              baseline and any meaningful supply disruption would
              push the price band wider quickly.
            </p>
            <p>
              <strong>Geopolitical drivers</strong> remain the
              dominant tail risk. Russia/Ukraine, Middle East
              tensions, OPEC+ production decisions, and the U.S.
              Strategic Petroleum Reserve replenishment trajectory
              all sit underneath the 2026 price band and any
              meaningful event-driven move on the geopolitical side
              would push the band wider. Through the report horizon,
              the geopolitical environment has not produced a
              destabilizing event for the U.S. diesel market, but
              the implied volatility in the diesel forward curve
              continues to price a meaningful tail. Operators
              running their own fuel-cost models should treat the
              2026 band as a base case with material upside risk
              rather than as a stable forward expectation.
            </p>
          </section>

          <section className="research-section" id="fuel-taxation">
            <h2>3. Federal and state fuel taxation</h2>
            <p>
              The taxation layer on diesel is one of the largest
              non-crude components of the at-the-pump price and is
              one of the more under-discussed elements of the
              owner-operator fuel-cost model. The 2026 federal and
              state taxation regime is broadly stable, with no
              major federal excise change in the rulemaking
              calendar and incremental state-level adjustments
              driving most of the year-to-year movement.
            </p>
            <p>
              <strong>Federal excise tax</strong> on diesel sits at
              $0.243 per gallon in 2026, unchanged since the early
              1990s in nominal terms (and meaningfully lower in
              real terms after three decades of inflation). The
              federal excise is collected at the terminal rack on
              wholesale distribution and is pre-tax in the retail
              signage at the pump. The federal funding flows into
              the Highway Trust Fund and the Mass Transit Account,
              and the structural underfunding of the trust fund
              relative to authorized federal transportation
              spending is a perennial Congressional topic without
              any meaningful action through the report horizon. For
              the 2026 owner-operator, the federal excise is a
              fixed input — there is no operational variable on the
              owner side, no exemption applicable to typical OTR
              operation, and no near-term prospect of change.
            </p>
            <p>
              <strong>State excise tax</strong> on diesel varies
              enormously across the country. The state diesel
              excise floor is in the $0.16–$0.20/gallon range
              (Texas, Mississippi, Hawaii on the low end);
              Pennsylvania sits at the top of the range with a
              state diesel tax exceeding $0.70/gallon; California
              is the next highest in the high $0.80s once the LCFS
              and cap-and-trade overlays are included; Indiana,
              Ohio, and the broader Midwest sit in a $0.40–$0.55
              band. The range — roughly $0.55/gallon between the
              lowest and highest states on excise alone, more once
              the California compliance overlays are layered — is
              one of the most consequential pieces of dispatch
              optimization for over-the-road operations. Fueling
              decisions on long-haul lanes that cross multiple
              jurisdictions in a single trip can materially affect
              the realized state-tax burden, both directly at the
              pump and through the IFTA reconciliation mechanism
              covered in section 6.
            </p>
            <p>
              <strong>California carbon credit overlay</strong> is
              the most distinctive piece of state-level taxation
              relevant to trucking. Cap-and-Trade compliance
              obligations on petroleum refiners and importers,
              combined with the Low Carbon Fuel Standard (LCFS)
              compliance regime, add an implicit cost on
              California-fueled diesel that flows through to the
              retail price. The LCFS overlay alone has historically
              contributed in the $0.10–$0.25/gallon range to the
              California-versus-national-average diesel spread,
              with cap-and-trade contributing a separate increment.
              The cumulative effect — combined with the higher
              California state excise tax and refining-side
              constraints — produces the highest effective diesel
              cost in the country for California-fueled gallons.
              The operational implication for OTR carriers passing
              through California is to minimize California fuel
              purchases where feasible and to fuel in adjacent
              states (Nevada, Arizona) on inbound and outbound
              legs.
            </p>
            <p>
              <strong>IFTA reconciliation mechanics</strong> are
              the multistate compact that makes cross-jurisdiction
              fueling work. The{" "}
              <Link href="/glossary/ifta">International Fuel Tax
              Agreement</Link> is a compact among the lower 48
              U.S. states and 10 Canadian provinces under which
              motor carriers operating across member jurisdictions
              pay fuel tax to a single base state, and the base
              state apportions tax to the jurisdictions where the
              miles were actually driven. The mechanic eliminates
              the double-taxation problem (you would otherwise owe
              fuel tax to the state where you purchased and to the
              states where you drove) and lets carriers manage
              compliance through one quarterly return rather than
              50 separate returns. The owner-operator pays tax at
              the pump on every gallon purchased in any
              jurisdiction; the IFTA return reconciles those
              payments against miles driven per jurisdiction and
              calculates the net debit or credit per state. The
              2026 IFTA mechanics are stable; section 6 covers the
              software automation that has substantially reduced
              the compliance overhead.
            </p>
          </section>

          <section className="research-section" id="fuel-surcharge">
            <h2>4. Fuel surcharge collection dynamics</h2>
            <p>
              The{" "}
              <Link href="/glossary/fuel-surcharge">fuel surcharge</Link>{" "}
              (FSC) is the mechanism by which fuel-price variance
              passes through from the carrier to the shipper or
              broker, and the 2026 FSC environment is mature but
              uneven. The structural question — should the carrier
              absorb fuel-price variance or should the shipper —
              has been settled in favor of pass-through, but the
              operational question of how the pass-through is
              structured, benchmarked, and collected has not been
              fully standardized and the collection rate varies by
              broker tier and contract type.
            </p>
            <p>
              <strong>The DOE/EIA national average</strong> is the
              universal benchmark for FSC calculation. The U.S.
              Department of Energy and the Energy Information
              Administration jointly publish a weekly On-Highway
              Diesel Fuel Prices report (released Mondays at
              approximately 5:00 PM ET) that establishes the
              national average retail price for the prior week.
              Virtually every commercial FSC contract in trucking
              uses some derivation of this index — either the
              national average outright, or a regional weighted
              average, or a lane-specific weighted average for
              specific corridors. The 2026 environment is one in
              which the DOE/EIA benchmark is essentially universal
              and the structural argument over benchmark selection
              has been settled.
            </p>
            <p>
              <strong>Typical FSC formulas</strong> follow a
              well-established mechanic: a baseline diesel price is
              established (often $1.00, $1.20, or $1.50 historically;
              $3.00 or $3.20 in modern 2024+ contracts), and an FSC
              rate per mile is established (often $0.04/mile for
              every $0.06 increase in DOE/EIA national average
              above the baseline, or equivalent ratios calibrated
              to expected fuel-economy and route assumptions). A
              common modern formula: $3.00/gallon baseline; for
              every $0.06 above baseline, $0.04/mile FSC. At a
              $4.20/gallon national average, that yields $0.80/mile
              FSC — meaningfully shifting the economics of a
              long-haul lane. The exact formula varies by contract,
              but the underlying mechanic is consistent enough that
              an operator can model the expected FSC against any
              given DOE/EIA weekly print.
            </p>
            <p>
              <strong>Collection rates by broker tier</strong> are
              the more practical question. The structural FSC
              formula in a written contract is one number; the
              realized FSC collection on actual loads dispatched
              through that contract is sometimes another. Direct
              shipper contracts at large established carriers
              typically collect FSC at or near 100% of the formula.
              Top-tier brokers (CH Robinson, Coyote, TQL) typically
              honor a written FSC structure in line with the
              underlying shipper contract, though the spread the
              broker captures can attenuate the FSC pass-through in
              some cases. Mid-tier and smaller brokers more often
              quote an all-in rate without an explicitly separated
              FSC, which functionally moves the fuel-price variance
              risk back to the carrier. Owner-operators and small
              fleets accepting an all-in rate without an explicit
              FSC structure are exposed to the diesel-price band
              described in section 2 without the structural offset
              that a separated FSC provides. See our{" "}
              <Link href="/glossary/all-in-rate">all-in rate</Link>{" "}
              glossary entry for the contractual structure detail.
            </p>
            <p>
              <strong>All-in vs separate FSC</strong> is the central
              operational decision. The all-in structure is
              simpler administratively but moves fuel-price risk to
              the carrier; the separate-FSC structure is more
              complex but provides explicit pass-through. The 2026
              panel observation is that owner-operators running
              their own dispatch should prefer separated FSC where
              available, particularly on long-haul lanes where the
              fuel-cost share of total per-mile cost is highest;
              all-in rates are acceptable on short-haul or
              high-margin work where the fuel-cost share is a
              smaller fraction of revenue. The structural shift
              toward all-in rates in the broker market during the
              2024–2025 freight downturn pushed more fuel-price
              risk onto carriers without corresponding rate
              compensation, and operators who accepted all-in rates
              without adjusting their pricing absorbed material
              margin compression as a result.
            </p>
          </section>

          <section className="research-section" id="factor-fuel-programs">
            <h2>5. Factor fuel programs head-to-head</h2>
            <p>
              The integration of factoring and fuel cards is one of
              the cleaner examples of bundled value in trucking
              financial services in 2026. A factor that bundles a
              fuel card with its factoring product captures both
              the factoring fee and a share of the fuel-card
              economics, and in exchange offers the operator a
              materially discounted per-gallon price at network
              locations plus operational integration (advance
              against next-day fuel, single-statement reconciliation,
              IFTA mileage capture). The major factor fuel programs
              advertise headline discount numbers that are real but
              concentrated in specific operational conditions; the
              realized average discount for any given operator
              depends heavily on fuel-stop routing against the
              program network.
            </p>
            <h3>Apex Capital</h3>
            <p>
              Apex Capital&apos;s fuel card program advertises
              savings of up to 51¢/gallon off retail at the
              broadest network in the factor-bundled space. The
              network covers a substantial share of the national
              truck-stop footprint at Pilot Flying J, Love&apos;s,
              TA Petro, AMBEST, and a long tail of independents.
              The 51¢/gallon headline is the maximum at the
              best-priced locations on the network; the realized
              average across all transactions is meaningfully
              below the headline, with typical practical realized
              savings in the $0.25–$0.40/gallon range for fleets
              that route fuel stops disciplinedly against the
              network. The Apex program is integrated with Apex&apos;s
              factoring product (with a separate offering for
              non-factoring customers), and the bundled
              factoring-plus-fuel economics are competitive at the
              owner-operator and small-fleet end of the market.
            </p>
            <h3>eCapital</h3>
            <p>
              eCapital&apos;s fuel card program operates across
              roughly 16,000 locations nationally, with the network
              built on Pilot Flying J, TA Petro, and a broad set of
              regional and independent operators. The advertised
              average discount is in the $0.20/gallon range across
              the network, which is lower than the Apex headline
              but reflects a different positioning — eCapital
              emphasizes consistent realized discount across the
              network breadth rather than maximum discount at a
              narrower set of stops. For an operator running a
              dispatch with wide geographic variance, the eCapital
              network depth can produce a more consistent realized
              average than a narrower deeper-discount program. The
              eCapital fuel card is bundled with the factoring
              product and is one of the more popular options at the
              small-fleet end of the market in 2026.
            </p>
            <h3>RTS Financial</h3>
            <p>
              RTS Financial&apos;s RTS Fleet Card claims savings up
              to $0.40/gallon at network locations, with the
              network anchored at Pilot Flying J and TA Petro and
              extending to a broad independent footprint. RTS
              positions the program toward small fleets specifically
              and offers a fuel-advance feature integrated with the
              factoring product (advance against next-day fuel
              against pending invoices). The realized discount
              average across the customer base, like the other
              programs, is below the $0.40/gallon headline; the
              practical realized number for a disciplined
              dispatch is in the $0.20–$0.35/gallon range. RTS is
              the dominant trucking-factor brand at the mid-fleet
              tier and the fuel program is a meaningful part of
              the value proposition.
            </p>
            <h3>Triumph and other programs</h3>
            <p>
              Triumph Financial offers a factor-bundled fuel card
              integrated with the broader Triumph trucking
              financial-services stack (factoring, fuel, banking,
              insurance distribution). The Triumph program is
              competitive on per-gallon discount and is
              differentiated on the integrated-platform offering —
              an operator running through Triumph can manage
              factoring, fuel, payments, and banking under one
              consolidated relationship. TBS Factoring Service
              transitioned its fuel program onto the Love&apos;s
              Connect network in recent years, anchoring on the
              Love&apos;s fuel-stop network with the corresponding
              network economics. OTR Capital and several smaller
              factors offer fuel programs targeted at narrower
              fleet-size segments; the network depth and discount
              levels are correspondingly narrower.
            </p>
            <h3>Network coverage as the differentiator</h3>
            <p>
              The 2026 reading on factor fuel programs is that
              network coverage is the operational differentiator
              that matters more than the headline discount number.
              A program that advertises 51¢/gallon off but has
              limited network coverage produces a lower realized
              average than a program with $0.25/gallon average
              across a deeper network. The operator&apos;s lane
              mix, the relative density of program-network
              locations along those lanes, and the discipline of
              fuel-stop routing all matter more than the headline
              maximum discount. The right way to evaluate a factor
              fuel program is to map the lane mix against the
              program network and estimate the realized average
              given the dispatch reality, not to compare advertised
              headlines.
            </p>
            <p>
              See our{" "}
              <Link href="/glossary/fuel-advance">fuel advance</Link>{" "}
              glossary entry for the financing-side mechanic that
              several of these programs offer (advance against
              next-day fuel purchases against pending factored
              invoices), and our{" "}
              <Link href="/research/best-trucking-factoring-2026">
                Best Trucking Factoring 2026
              </Link>{" "}
              report for the underlying factoring-side competitive
              landscape.
            </p>
          </section>

          <section className="research-section" id="ifta">
            <h2>6. IFTA reporting in 2026</h2>
            <p>
              International Fuel Tax Agreement reporting in 2026
              is, for most operators on modern tooling, an automated
              workflow rather than a paperwork exercise. The
              underlying mechanic — quarterly reconciliation of
              jurisdiction-miles and gallons-purchased into a
              single net return to the base state — is unchanged,
              but the data integration and software automation
              available to small fleets and owner-operators has
              transformed the operational reality of compliance.
            </p>
            <p>
              <strong>Quarterly filing mechanics</strong> are the
              foundation. IFTA quarters end March 31, June 30,
              September 30, and December 31; returns are due by the
              last day of the month following quarter-end (April
              30, July 31, October 31, January 31). The return
              calculates fuel tax due to each member jurisdiction
              by multiplying jurisdiction-miles by the
              jurisdiction&apos;s tax rate divided by fleet
              fuel-economy, then crediting against the tax paid at
              the pump in each jurisdiction. Net debit or credit
              flows through the base-state return. The owner-operator
              files one return per quarter regardless of the number
              of jurisdictions traveled; the base state manages
              inter-jurisdictional reconciliation.
            </p>
            <p>
              <strong>ELD data integration reducing audit risk</strong>{" "}
              is the most consequential 2026 development. The
              compliance shift from paper logs and manual fuel-tax
              compilation to ELD-driven GPS data plus fuel-card
              transaction data has made the underlying data trail
              cleaner, more complete, and more auditable than the
              pre-mandate environment. The IFTA audit trigger of
              uneven or implausible jurisdiction-mile reporting —
              previously a common audit catch — has been
              substantially reduced because ELD GPS data produces
              accurate jurisdiction-mile allocations as a matter
              of operational integrity, not just IFTA compliance.
              Operators on modern ELD plus fuel-card integration
              are less audit-exposed in 2026 than they were a
              decade ago.
            </p>
            <p>
              <strong>Common audit triggers</strong> that remain
              relevant: fuel-purchase records that do not align
              with the fleet&apos;s typical fuel-economy and lane
              mix; jurisdiction-mile patterns inconsistent with
              the operating authority and lane history; missing
              fuel receipts for periods where the ELD records
              substantial movement; and base-state record-keeping
              that does not satisfy the four-year retention
              requirement under IFTA. The 2026 audit environment is
              less common than the pre-ELD era but the audits that
              do occur tend to be more thorough because the
              underlying data is denser.
            </p>
            <p>
              <strong>Software automation</strong> is now standard
              at most fleet management platforms (Samsara, Motive,
              Geotab, Verizon Reveal) and at most dispatch
              platforms targeting owner-operators (Truckbase,
              Switchboard, and the long tail of similar tools).
              The mechanic is consistent across vendors: ELD GPS
              data produces the jurisdiction-mile allocation; fuel
              card transaction data produces the jurisdiction-gallon
              allocation; the platform calculates the per-jurisdiction
              tax owed and tax paid and surfaces the net return as
              a draft for review. The owner-operator&apos;s
              quarterly IFTA workload has dropped from days of
              manual compilation to an hour or two of review and
              approval. The operational implication is that IFTA
              compliance is now a near-zero-marginal-cost
              administrative function for any operator on modern
              tooling.
            </p>
          </section>

          <section className="research-section" id="fuel-cards">
            <h2>7. Fuel cards and float</h2>
            <p>
              The non-factor fuel card market — Comdata, EFS, WEX
              (FleetOne), and a long tail of smaller programs —
              continues to anchor the fuel-purchase financial
              workflow for the broader trucking industry, and is
              the alternative or complement to the factor-bundled
              programs covered in section 5. The 2026 landscape is
              mature, with the major networks consolidated and
              the operational features standardized.
            </p>
            <p>
              <strong>Comdata</strong> remains one of the dominant
              fleet card networks for trucking, with broad network
              coverage at the major truck stops and a strong
              presence in the broker-payment workflow (Comdata-
              issued payments to carriers via virtual card or
              direct deposit are standard at many large brokers).
              The Comdata card is more often a fleet-issued tool
              than an owner-operator-issued tool, but the program
              extends down-market to small fleets with appropriate
              underwriting. <strong>EFS</strong> (Electronic
              Funds Source, owned by WEX) operates a parallel
              network with similar positioning. <strong>WEX</strong>{" "}
              FleetOne and the broader WEX fuel card line covers
              fleet-card needs for both trucking and adjacent
              fleet operations (delivery, services, government
              fleets). The major networks substantially overlap at
              the actual fuel-stop level, and the operational
              decision between them is typically driven by
              network-specific discount programs, integration with
              accounting and dispatch software, and the
              underwriting fit.
            </p>
            <p>
              <strong>Factor-bundled cards</strong> versus
              <strong> standalone fleet cards</strong> is the
              fundamental segmentation. Factor-bundled cards
              (Apex, eCapital, RTS, Triumph, TBS) bundle the fuel
              card with the factoring relationship and the
              underwriting flows through the factoring agreement;
              standalone fleet cards (Comdata, EFS, WEX) underwrite
              the credit-line component independently of any
              factoring relationship and are appropriate for fleets
              that are not factoring or that maintain a fuel card
              outside the factor relationship for operational
              reasons. The owner-operator segment in 2026 leans
              toward factor-bundled cards because the underwriting
              path is simpler and the integration with the cash
              cycle is tighter; the small-fleet segment commonly
              uses both — a fleet-card program for primary fueling
              and a factor card for specific operational needs.
            </p>
            <p>
              <strong>Fleet card APR and float dynamics</strong>{" "}
              are the financial dimension that operators often
              underprice in evaluating fuel card economics. A fleet
              card with a credit-line structure carries an APR
              (commonly in the 14–24% range for established
              fleets, higher for new-authority or weak-credit
              applicants) and a billing cycle that produces a
              meaningful interest-free float window (often 25–35
              days from purchase to payment due) if the balance is
              paid in full each cycle. For an operator with
              predictable cash flow, the float is a real operational
              benefit and the APR is a non-issue because the
              balance never carries; for an operator with unstable
              cash flow, the APR can become a meaningful cost as
              balances revolve. The 2026 reading is that fuel-card
              APR matters substantially less for disciplined
              operators than the per-gallon discount and network
              coverage do, but for operators using the fuel card
              as a working-capital substitute the APR economics
              quickly dominate.
            </p>
          </section>

          <section className="research-section" id="idle-reduction">
            <h2>8. Idle reduction tech</h2>
            <p>
              Idle reduction technology — the category of equipment
              and operational practice aimed at reducing the fuel
              consumed when the tractor is parked but the driver
              needs HVAC, hotel power, or auxiliary equipment
              operation — has settled into a stable adoption pattern
              in 2026. The underlying problem is structural: long-
              haul OTR drivers spend roughly 30–40% of total
              on-duty time in non-driving status, much of it in
              the sleeper berth at rest stops or truck stops, with
              the tractor&apos;s main engine providing power for
              cabin climate control and accessory loads. Idle main-
              engine operation burns roughly 0.8–1.0 gallons per
              hour without producing miles, and the cumulative cost
              over a year of OTR operation is meaningful.
            </p>
            <p>
              <strong>Auxiliary Power Units (APUs)</strong> — small
              diesel-fueled generators installed on the tractor
              that provide cabin power and HVAC without running the
              main engine — are the dominant idle-reduction
              technology in 2026. APU adoption among long-haul OTR
              tractors is well-established, with most modern
              factory-build OTR tractors equipped from the dealer
              and aftermarket retrofit common for legacy units. The
              fuel savings are meaningful: APU diesel consumption
              runs roughly 0.2–0.3 gallons per hour at typical
              load, against the 0.8–1.0 gallons per hour of main-
              engine idle, producing a 60–70% fuel-cost reduction
              on idle hours. Against a typical 8–10 hour daily idle
              window, the annualized fuel savings against the
              installed cost of an APU produces payback in 18–36
              months for most OTR operations.
            </p>
            <p>
              <strong>Battery-electric idle solutions</strong> —
              battery banks (lithium-ion in current product
              generations) that provide cabin power and HVAC
              without burning any fuel, charged during driving and
              during truck-stop electric hookups — are the
              emerging alternative to diesel APUs. The product
              category has matured through 2024–2026, with vendor
              products from several manufacturers and increasing
              factory-build availability. The fuel savings against
              the alternative is the full APU consumption
              eliminated, plus environmental and noise benefits.
              The trade-off is upfront cost (battery systems are
              typically more expensive than diesel APUs) and
              capacity (battery systems work well for shorter
              idle windows and at moderate climate-control loads;
              they struggle in extreme heat or cold and for very
              long idle periods without external charging access).
            </p>
            <p>
              <strong>EPA SmartWay</strong> Transport Partnership —
              EPA&apos;s voluntary program promoting fuel-efficient
              and low-emission freight operations — continues to
              provide framework, recognition, and reporting tools
              for carriers pursuing idle-reduction and broader
              fuel-efficiency improvements. SmartWay participation
              is now a routine signal at the larger fleet tier;
              the program&apos;s practical reach to owner-operators
              and small fleets is more limited but the underlying
              framework (vehicle aerodynamics, low-rolling-
              resistance tires, idle reduction, speed management,
              driver coaching) maps to the standard fuel-efficiency
              playbook every disciplined operator runs anyway. The
              cumulative fuel-efficiency improvement on a well-run
              OTR tractor in 2026 versus a comparable 2015 unit is
              in the 8–12% range, with aerodynamics, tires, idle
              reduction, and driver behavior all contributing.
            </p>
          </section>

          <section className="research-section" id="alt-fuel">
            <h2>9. Alternative-fuel adoption status</h2>
            <p>
              The alternative-fuel adoption story in commercial
              trucking in 2026 is a story of slow ramp against
              aggressive regulatory targets and ambitious
              product-launch headlines. Battery-electric Class 8
              tractors, hydrogen fuel-cell pilots, compressed
              natural gas (CNG), and liquefied natural gas (LNG)
              all exist as real product categories in 2026, but
              the cumulative share of the U.S. Class 8 fleet
              running on anything other than diesel remains in
              low single digits, and the operational windows where
              alternatives are competitive remain narrower than the
              regulatory targets contemplate.
            </p>
            <h3>CARB Phase 3 ZEV mandate timeline</h3>
            <p>
              California Air Resources Board (CARB) Advanced Clean
              Fleets regulation, which became effective in 2024
              for affected fleet categories, requires phased
              zero-emission vehicle (ZEV) purchases from
              high-priority and federal fleets, with a 2036 full
              zero-emission Class 8 purchase requirement and a
              2042 full-fleet zero-emission deadline for affected
              fleets. Drayage operations face an accelerated
              timeline — all new drayage truck registrations after
              January 1, 2024 must be zero-emission, with a full
              drayage-fleet transition by 2035. Outside CARB-
              jurisdiction California, the roughly 15 states that
              have adopted some or all of the California heavy-duty
              vehicle standards apply versions of the same regime,
              producing a multi-state ZEV-mandate footprint that
              materially exceeds the share of national heavy-duty
              vehicle sales subject to federal-only standards. See
              our{" "}
              <Link href="/research/state-of-trucking-regulation-2026">
                State of Trucking Regulation 2026
              </Link>{" "}
              report for the full regulatory-side detail.
            </p>
            <h3>Battery-electric Class 8 truck market</h3>
            <p>
              Battery-electric Class 8 tractors from the major OEMs
              are real products in 2026 and have moved past
              demonstration into limited series production. The
              Freightliner eCascadia (Daimler Truck North America)
              has been in production since 2022 and is the most-
              deployed battery-electric Class 8 in the U.S. market,
              with a real-world range typically quoted at 230 miles
              under favorable conditions. The Volvo VNR Electric
              (Volvo Trucks North America) has been similarly in
              production since 2022, targeting regional haul
              operations with comparable range performance. The
              Tesla Semi was launched commercially in 2022 with
              early units delivered to PepsiCo and a handful of
              other fleet customers; Tesla&apos;s range claims for
              the Semi are higher than the eCascadia and VNR
              Electric, but the production volumes and broader
              deployment have lagged the early projections. Several
              startup entrants (Nikola, Hyzon, Lion Electric) have
              had mixed commercial outcomes, with some now in
              difficult financial position.
            </p>
            <p>
              The operational windows where battery-electric Class
              8 trucks make economic sense in 2026 are real but
              narrow. The configurations that work are
              short-haul-and-return regional operations (drayage,
              regional dedicated, intra-city) where the round-trip
              distance fits comfortably within battery range, where
              depot charging is feasible at the carrier&apos;s
              home base, and where the higher upfront equipment
              cost is offset by fuel-cost-per-mile savings (battery-
              electric per-mile energy cost is meaningfully below
              diesel per-mile fuel cost at typical electricity
              prices) and by maintenance-cost savings (electric
              drivetrain has fewer wear components than a diesel
              powertrain). The configurations that do not work yet
              are long-haul OTR operations, which exceed practical
              battery range; team-driving operations, which require
              continuous operation without depot charging; and
              operations without access to depot charging
              infrastructure.
            </p>
            <h3>Hydrogen pilot programs</h3>
            <p>
              Hydrogen fuel-cell Class 8 tractors remain a pilot
              category in 2026. The product economics depend on
              hydrogen-fuel availability, which remains
              concentrated in California (the Hydrogen Highway
              corridor) and a small number of other locations.
              Hyundai XCIENT, Nikola, and several other entrants
              have produced demonstration units and limited
              commercial deployments; the cumulative share of the
              national heavy-duty fleet running on hydrogen
              fuel-cell powertrains remains a rounding error in
              2026. The longer-haul operational window — where
              battery-electric range constraints bind — is the
              part of the fleet where hydrogen could theoretically
              compete; the practical fuel-infrastructure
              constraints have so far prevented that competition
              from materializing.
            </p>
            <h3>CNG and LNG status</h3>
            <p>
              Compressed natural gas (CNG) and liquefied natural
              gas (LNG) Class 8 powertrains have a longer
              commercial history than battery-electric or hydrogen
              and have settled into a stable niche position in
              2026. UPS, Waste Management, and several other large
              fleets operate substantial natural-gas-powered
              fleets in dedicated regional or municipal
              applications where the fueling infrastructure is
              available. The broader OTR market has not adopted
              natural gas at scale because the fueling
              infrastructure does not exist outside specific
              corridors, the per-mile fuel-cost advantage versus
              diesel narrowed materially as natural gas prices
              moved up through 2022–2024, and the equipment cost
              premium relative to diesel has not declined enough
              to drive broader adoption. The 2026 reading is that
              natural gas remains a viable solution for specific
              fleet applications and is not on a path to material
              OTR market share growth.
            </p>
            <h3>Why diesel still dominates</h3>
            <p>
              The structural reasons diesel still dominates the
              U.S. Class 8 fleet in 2026 are unchanged from the
              prior several years: diesel has the highest
              practical energy density per gallon, the most mature
              and ubiquitous refueling infrastructure, the broadest
              equipment availability, the most established
              service-and-parts ecosystem, and the deepest used-
              equipment market. Each of the alternatives has
              identified operational windows where it competes
              well, but none has yet displaced diesel as the
              default for general OTR freight, and the regulatory
              push from CARB and the Section 177 adopting states
              is producing structural growth in alternative-fuel
              share without yet producing displacement of diesel
              from the core long-haul market. The 2026 base case
              for the remainder of the decade is that diesel
              remains dominant for general OTR freight, with
              alternatives growing meaningfully in drayage,
              regional dedicated, and specific fleet applications
              where the operational economics work.
            </p>
          </section>

          <section className="research-section" id="cost-share">
            <h2>10. Fuel cost as percentage of revenue</h2>
            <p>
              Fuel cost as a percentage of operating revenue is
              the single most-cited fuel-cost metric in trucking
              financial reporting, and the 2026 number for a
              typical owner-operator OTR Class 8 operation lands
              in the <strong>20–30%</strong> range. The range is
              wide because it depends on three independent
              variables — the average per-gallon diesel cost
              (which depends on region, network, and fuel-card
              program), the fleet&apos;s observed fuel-economy
              (typically 6.5–7.5 miles per gallon for a modern OTR
              tractor under typical conditions), and the realized
              rate per mile including FSC offset. A fleet running
              7.0 MPG average at $3.80/gallon net-of-discount and
              $2.20/mile realized rate including FSC sits near
              the bottom of the range at around 24.7%; the same
              fleet on a tighter rate environment ($1.80/mile)
              moves to 30%; the same fleet on a higher fuel cost
              ($4.20/gallon) and lower rate ($1.80/mile)
              approaches 33%.
            </p>
            <p>
              <strong>Sensitivity analysis</strong> is the more
              useful framing for operators modeling their own
              business. The two largest leverage points on fuel
              cost as a share of revenue are realized per-gallon
              cost (which the operator controls through fuel-card
              program selection and fuel-stop routing) and
              fuel-economy (which the operator controls through
              equipment selection, driver behavior, idle
              management, and route planning). A 10% improvement
              on either input — 10% lower per-gallon cost through
              a better fuel-card program, or 10% higher MPG
              through better driver behavior — produces roughly a
              2-percentage-point reduction in fuel cost as a share
              of revenue at typical 2026 input levels. The
              cumulative effect over a year of operation is
              meaningful: on $250,000 annual revenue, a 2-
              percentage-point reduction is $5,000 of additional
              operating margin.
            </p>
            <p>
              <strong>Cost-per-mile breakdown</strong> is the
              alternative framing favored by operators running
              detailed P&amp;L by lane. The total cost per mile
              (CPM) for a typical owner-operator OTR Class 8
              operation in 2026 lands roughly in the $1.60–$1.90
              range, with fuel at $0.60–$0.75/mile (the largest
              single component), driver pay at $0.40–$0.55/mile
              (the second-largest), maintenance and tires at
              $0.15–$0.25/mile, equipment payment at
              $0.15–$0.30/mile, insurance at $0.10–$0.15/mile, and
              the residual categories (permits, tolls, dispatch
              software, accounting, communications) at the
              remainder. See our{" "}
              <Link href="/glossary/cpm">cost per mile (CPM)</Link>{" "}
              glossary entry for the detailed cost-component
              breakdown and the{" "}
              <Link href="/calculators/owner-operator-pl">
                owner-operator P&amp;L calculator
              </Link>{" "}
              for the lane-by-lane modeling tool.
            </p>
            <p>
              The operational implication is consistent with the
              executive summary: fuel cost management at the 20–30%
              of revenue level is structural and the operators who
              compete on fuel cost win by getting the basics right
              consistently, not by chasing headline numbers. The
              factor fuel programs covered in section 5, the FSC
              collection discipline covered in section 4, the
              fuel-economy fundamentals covered indirectly in
              section 8, and the IFTA software automation covered
              in section 6 are the four operational levers; the
              alternative-fuel category covered in section 9 is a
              long-term capital-side variable that does not yet
              matter for most operators in 2026.
            </p>
            <p>
              See also the{" "}
              <Link href="/glossary/fuel-tax-credit">
                fuel tax credit
              </Link>{" "}
              glossary entry for the federal-side mechanic that
              applies to specific off-highway fuel use (and that
              does not apply to typical OTR operation), and our{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>{" "}
              report for the broader operator P&amp;L context in
              which the fuel-cost line sits.
            </p>
          </section>

          <section className="research-section" id="predictions">
            <h2>11. Predictions for 2026–2027</h2>
            <p>
              Five specific, falsifiable predictions for the next
              18 months. The bar is that each prediction is
              time-bound, measurable, and can be wrong; the
              editorial probability we attach reflects our actual
              confidence in the call.
            </p>
            <ol className="research-list">
              <li>
                <strong>
                  EIA national average on-highway diesel trades in
                  a $3.40–$5.00 band through end of 2027 absent a
                  material geopolitical event.
                </strong>{" "}
                The base-case crude path, refining capacity, and
                inventory environment do not produce a structurally
                wider trading range. The tail risk is event-driven
                (Middle East, Russia, OPEC+) and remains material;
                the base case is ranged trading near the 2026 mid-
                point. Probability of in-band trading conditional
                on no major event: high (greater than 65%).
              </li>
              <li>
                <strong>
                  Factor fuel programs continue to capture share
                  from standalone fleet cards at the owner-operator
                  and small-fleet tier through 2027.
                </strong>{" "}
                The bundled-economics value proposition, the
                cash-cycle integration, and the operational
                simplicity advantage of factor-bundled programs
                continue to favor adoption at the smaller end of
                the market. The Comdata/EFS/WEX network anchor at
                the mid-and-larger fleet tier holds. Probability:
                high (greater than 70%).
              </li>
              <li>
                <strong>
                  Battery-electric Class 8 share of U.S. new heavy-
                  duty truck sales remains below 5% nationally
                  through end of 2027.
                </strong>{" "}
                California and Section 177 adopting states will
                continue to push specific operational windows
                (drayage, regional dedicated) toward zero-emission
                purchases; the broader OTR market will continue to
                buy diesel because the operational economics do
                not yet support the transition. Probability: high
                (greater than 70%).
              </li>
              <li>
                <strong>
                  IFTA audit volume continues to decline at the
                  small-fleet and owner-operator tier through
                  2027 as ELD data integration matures.
                </strong>{" "}
                The audit-trigger signals that drove the pre-ELD
                audit environment have been substantially weakened
                by GPS-based jurisdiction-mile reporting; the
                cumulative effect on small-fleet audit exposure
                continues to compound. Probability: moderate-to-
                high (60–70%).
              </li>
              <li>
                <strong>
                  All-in-rate brokerage continues to grow share
                  versus separated-FSC brokerage through 2027
                  unless rates tighten materially.
                </strong>{" "}
                The 2024–2025 freight downturn pushed more
                brokerage to all-in-rate structure; rate
                environment recovery would reverse some of the
                shift, but the structural trend toward broker
                simplification is a separate force that continues
                to favor all-in-rate at the broker-side margin.
                Probability: moderate (55–60%).
              </li>
            </ol>
            <p>
              One prediction we are watching but not yet betting
              on: a federal Renewable Diesel mandate expansion or
              a federal carbon-overlay on diesel similar to the
              California LCFS mechanic. The political economy of
              federal fuel-policy expansion is unfavorable under
              the current alignment, but the regulatory
              infrastructure for an EPA-led overlay exists; if
              landed, the structural effect on national diesel
              pricing would be on the order of $0.10–$0.30/gallon
              and would reshape several of the other variables in
              this report.
            </p>
          </section>

          <section className="research-section" id="methodology">
            <h2>12. Methodology and sources</h2>
            <p>
              This report draws on four categories of source.
              First, public energy and tax data — the EIA Weekly
              Retail On-Highway Diesel Prices report, EIA
              Short-Term Energy Outlook, the IRS federal excise
              tax framework on diesel, and the IFTA articles of
              agreement and audit/procedures manuals for the
              compliance-side context. Second, public product
              disclosures from the major factor-fuel and fleet-card
              providers — Apex, eCapital, RTS Financial, Triumph,
              TBS, Comdata, EFS, and WEX — for the program-side
              discount, network, and feature descriptions. Third,
              regulatory rule texts and program documents —
              California Air Resources Board Advanced Clean Fleets
              and LCFS, EPA SmartWay framework, EPA Phase 3 GHG
              heavy-duty vehicle rule, and the Section 177 state
              adoptions. Fourth, industry-association published
              research — ATRI&apos;s Operational Costs of Trucking
              annual analysis for the cost-per-mile and fuel-share
              of revenue context, and the trucking trade press for
              product launches, fleet pilots, and competitive
              positioning.
            </p>
            <p>
              Time horizon: data through April 2026. Where the
              report cites price bands, discount levels, or share
              estimates, those are snapshot observations on the
              Dispatched panel and public comparables as of the
              report&apos;s publication date and should be
              expected to drift through the remainder of the year.
              Where the report makes a forward-looking prediction,
              we have attempted to make the prediction specific,
              time-bound, and falsifiable — and to attach an
              explicit probability where the underlying signal
              supports one.
            </p>
            <p>
              Disclosures: Dispatched is a matching platform for
              commercial trucking financing and trucking
              insurance. Dispatched maintains commercial
              relationships with a panel of trucking lenders,
              factors, and insurance producers referenced
              throughout the broader research series; for the
              factor-fuel programs named in this report
              specifically, several of the named providers are on
              the Dispatched factoring panel and others are not.
              Those relationships are documented in our{" "}
              <Link href="/methodology">methodology</Link> page.
              This report references public sources and panel
              observations alongside each other rather than
              substituting one for the other; readers should
              refer to the primary energy, tax, and regulatory
              sources cited for primary data. The report does not
              contain proprietary, paid, or vendor-licensed data
              feeds.
            </p>
            <p>
              Authored by Angelo Orru Neto, founder of Dispatched. The
              report is sourced but not independently attested; a
              credentialed domain reviewer will sign off the next major
              revision. Questions or corrections:{" "}
              <a href="mailto:angelo@dispatched.finance">
                angelo@dispatched.finance
              </a>
              .
            </p>
          </section>

          <section className="research-section" id="sources">
            <h2>Sources</h2>
            <ul className="research-sources">
              {SOURCES.map((s, i) => (
                <li key={i}>
                  <a href={s.url} target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="research-section research-cta">
            <h2>What this means for your operation</h2>
            <p>
              If you are an owner-operator or small fleet managing
              fuel cost in 2026, the report above maps to a small
              set of practical glossary entries and tools on the
              Dispatched platform.
            </p>
            <div className="research-cta-grid">
              <Link
                href="/glossary/fuel-surcharge"
                className="research-cta-card"
              >
                <h3>Fuel surcharge mechanics</h3>
                <p>
                  DOE/EIA benchmark, common $0.04/mile-per-$0.06-
                  over-baseline formulas, and the all-in-rate vs
                  separated-FSC operational decision.
                </p>
              </Link>
              <Link
                href="/glossary/ifta"
                className="research-cta-card"
              >
                <h3>IFTA reporting</h3>
                <p>
                  Quarterly jurisdiction-mile and gallon
                  reconciliation through the base state. Modern
                  ELD plus fuel-card integration has turned IFTA
                  into a review-and-approve workflow.
                </p>
              </Link>
              <Link
                href="/glossary/cpm"
                className="research-cta-card"
              >
                <h3>Cost per mile</h3>
                <p>
                  Fuel at $0.60–$0.75/mile is the largest single
                  CPM component for OTR Class 8 in 2026. Total
                  CPM lands $1.60–$1.90 for a typical
                  owner-operator.
                </p>
              </Link>
              <Link
                href="/glossary/all-in-rate"
                className="research-cta-card"
              >
                <h3>All-in rate vs separated FSC</h3>
                <p>
                  All-in rates move fuel-price risk to the
                  carrier; separated FSC provides explicit
                  pass-through. The structural decision matters
                  most on long-haul lanes.
                </p>
              </Link>
              <Link
                href="/glossary/fuel-tax-credit"
                className="research-cta-card"
              >
                <h3>Fuel tax credit</h3>
                <p>
                  Federal-side credit mechanic for specific
                  off-highway fuel use. Limited applicability for
                  typical OTR operation, but worth understanding
                  for mixed fleets.
                </p>
              </Link>
              <Link
                href="/glossary/fuel-advance"
                className="research-cta-card"
              >
                <h3>Fuel advance</h3>
                <p>
                  Advance against next-day fuel purchases against
                  pending factored invoices. Integrated with
                  several factor-bundled fuel programs.
                </p>
              </Link>
            </div>
            <p style={{ marginTop: "1.5rem" }}>
              Run the numbers on your own operation with the{" "}
              <Link href="/calculators/owner-operator-pl">
                owner-operator P&amp;L calculator
              </Link>
              . See also: the{" "}
              <Link href="/research">Dispatched Research index</Link>
              , the{" "}
              <Link href="/research/state-of-trucking-regulation-2026">
                State of Trucking Regulation 2026
              </Link>{" "}
              report for the CARB and EPA Phase 3 regulatory
              detail, the{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>{" "}
              report for the operator P&amp;L context, the{" "}
              <Link href="/research/best-trucking-factoring-2026">
                Best Trucking Factoring 2026
              </Link>{" "}
              report for the factoring-side competitive landscape,
              the{" "}
              <Link href="/research/state-of-trucking-tech-2026">
                State of Trucking Tech 2026
              </Link>{" "}
              report for the ELD and fleet management platform
              context, the{" "}
              <Link href="/research/state-of-trucking-capital-2026">
                State of Trucking Capital 2026
              </Link>{" "}
              report, the{" "}
              <Link href="/research/state-of-commercial-trucking-insurance-2026">
                State of Commercial Trucking Insurance 2026
              </Link>{" "}
              report, the{" "}
              <Link href="/research/state-of-trucking-insurance-claims-2026">
                State of Trucking Insurance Claims 2026
              </Link>{" "}
              report, and our{" "}
              <Link href="/methodology">methodology</Link> page.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
