import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "State of Owner-Operator Economics 2026 — Dispatched Research",
  description:
    "Annual report on owner-operator profitability: revenue per mile, cost per mile, broker spread dynamics, lease-purchase failure rates, regulatory impact, and 2026 outlook.",
  alternates: {
    canonical: "/research/state-of-owner-operator-economics-2026",
  },
  openGraph: {
    title:
      "State of Owner-Operator Economics 2026 — Dispatched Research",
    description:
      "Annual report on owner-operator profitability: revenue per mile, cost per mile, broker spread dynamics, lease-purchase failure rates, regulatory impact, and 2026 outlook.",
    url: "/research/state-of-owner-operator-economics-2026",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "State of Owner-Operator Economics 2026 — Dispatched Research",
    description:
      "Annual report on owner-operator profitability: revenue per mile, cost per mile, broker spread dynamics, lease-purchase failure rates, regulatory impact, and 2026 outlook.",
  },
};

const SOURCES: ReadonlyArray<{ label: string; url: string }> = [
  {
    label:
      "American Transportation Research Institute (ATRI) — Operational Costs of Trucking, 2024 and 2025 annual reports",
    url: "https://truckingresearch.org/",
  },
  {
    label:
      "FMCSA SAFER — Motor Carrier Registration and Authority Data",
    url: "https://safer.fmcsa.dot.gov/",
  },
  {
    label:
      "FMCSA — Drug & Alcohol Clearinghouse Monthly Summary Reports",
    url: "https://clearinghouse.fmcsa.dot.gov/Resource/Index/Monthly-Summary",
  },
  {
    label:
      "FMCSA — Truck Leasing Task Force Final Report (lease-purchase findings)",
    url: "https://www.fmcsa.dot.gov/advisory-committees/truck-leasing-task-force",
  },
  {
    label:
      "FMCSA Broker Transparency NPRM (49 CFR Part 371)",
    url: "https://www.federalregister.gov/agencies/federal-motor-carrier-safety-administration",
  },
  {
    label:
      "Owner-Operator Independent Drivers Association (OOIDA) — Foundation research on owner-operator economics",
    url: "https://www.ooida.com/",
  },
  {
    label:
      "U.S. Energy Information Administration — Weekly Retail On-Highway Diesel Prices",
    url: "https://www.eia.gov/petroleum/gasdiesel/",
  },
  {
    label:
      "IRS Publication 463 — Per Diem and Travel Expenses (transportation industry rate)",
    url: "https://www.irs.gov/publications/p463",
  },
  {
    label:
      "California AB 5 (2019) and subsequent FAAAA preemption litigation",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB5",
  },
  {
    label:
      "California Air Resources Board — Heavy-Duty Omnibus and Advanced Clean Fleets regulations",
    url: "https://ww2.arb.ca.gov/our-work/programs/advanced-clean-fleets",
  },
  {
    label:
      "Apex Capital, RTS Financial, eCapital — public fuel discount and program disclosures",
    url: "https://www.apexcapitalcorp.com/",
  },
  {
    label:
      "FMCSA 49 CFR Part 387 — Minimum Levels of Financial Responsibility",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
  },
];

export default function StateOfOwnerOperatorEconomics2026() {
  const today = new Date().toISOString().slice(0, 10);
  const url =
    "https://dispatched.finance/research/state-of-owner-operator-economics-2026";
  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Research", url: "https://dispatched.finance/research" },
          {
            name: "State of Owner-Operator Economics 2026",
            url,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "State of owner-operator economics, 2026",
          description:
            "Annual Dispatched Research report on owner-operator profitability: revenue per mile, cost per mile, lease-purchase failure rates, new-authority economics, and regulatory shifts.",
          url,
          datePublished: today,
          dateModified: "2026-05-11",
        })}
      />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">
              Dispatched Research · Annual report · Updated Q2 2026
            </p>
            <h1 className="research-h1">
              State of owner-operator economics, 2026.
            </h1>
            <p className="research-subhead">
              Owner-operator economics in 2026 are defined by three
              forces: spot-market rate normalization after the
              2022–2024 freight recession, persistent cost inflation
              in insurance and equipment, and accelerating regulatory
              pressure on lease-purchase and misclassification
              structures. This report covers what changed, what
              stayed the same, and what new owner-operators should
              expect through 2026.
            </p>
            <p className="research-meta">
              Published {today} · Dispatched Research · Twelve
              sources referenced inline. Data through April 2026.
            </p>
          </header>

          <section className="research-section" id="q2-2026-update">
            <h2>Q2 2026 update</h2>
            <p>
              ATRI&apos;s annual Operational Costs of Trucking report
              (released April 2026) put 2025 industry-average CPM at
              $2.32/mile, up modestly from 2024. Spot-market RPM
              softened slightly through Q1 2026 with seasonal recovery
              beginning April. Lease-purchase failure rates remain ≥80%
              per OOIDA&apos;s latest data.
            </p>
          </section>

          <nav className="research-toc" aria-label="Table of contents">
            <p className="research-toc-eyebrow">Contents</p>
            <ol>
              <li><a href="#executive-summary">1. Executive summary</a></li>
              <li><a href="#revenue-per-mile">2. Revenue per mile in 2026</a></li>
              <li><a href="#cost-per-mile">3. Cost per mile breakdown</a></li>
              <li><a href="#lease-purchase">4. The lease-purchase failure rate</a></li>
              <li><a href="#new-authority-economics">5. The new-authority economics</a></li>
              <li><a href="#broker-spread">6. Broker spread dynamics</a></li>
              <li><a href="#insurance-pressure">7. Insurance premium pressure on owner-op P&amp;L</a></li>
              <li><a href="#fuel">8. Fuel cost trends</a></li>
              <li><a href="#regulatory">9. Regulatory shifts affecting owner-op economics</a></li>
              <li><a href="#structural-advantages">10. Structural advantages of independent owner-operators</a></li>
              <li><a href="#predictions">11. Predictions for 2026–2027</a></li>
              <li><a href="#methodology">12. Methodology and sources</a></li>
            </ol>
          </nav>

          <section className="research-section" id="executive-summary">
            <h2>1. Executive summary</h2>
            <p>
              Owner-operator economics in 2026 are a story of partial
              recovery layered over structural cost inflation. The
              freight recession that compressed spot-market rates
              through 2023 and most of 2024 has eased; dry-van
              spot-market revenue per mile is running roughly
              $2.20–$2.70 on the Dispatched panel, up off the trough
              but well below the 2021–2022 peak. Cost per mile,
              however, has not eased meaningfully. ATRI&apos;s 2025
              Operational Costs of Trucking survey puts the average
              total marginal cost for OTR Class 8 carriers at roughly
              $2.30 per mile, with insurance and equipment payments
              the two line items still climbing. The gap between
              revenue per mile and cost per mile is the entire game,
              and in 2026 that gap is thinner than it was at any point
              from 2018 through 2022.
            </p>
            <p>
              Five high-level findings shape the rest of the report.
              First, the lease-purchase failure rate continues to run
              at 80%+ on FMCSA and OOIDA-adjacent surveys, and the
              FMCSA Truck Leasing Task Force&apos;s final report has
              given the regulator the foundation for a rulemaking
              that is more likely than not to land before the end of
              2027. Second, new-authority startup capital
              requirements have climbed materially — the realistic
              Year 1 capital need is now $20K–$50K depending on truck
              acquisition path, primarily driven by Year 1 insurance
              ($8K–$18K for new authority) and equipment down payment.
              Third, insurance premium growth has continued at
              15–25% year-over-year for many owner-operators, making
              the insurance line a structurally larger share of the
              P&amp;L than it was five years ago.
            </p>
            <p>
              Fourth, broker spread dynamics remain typical at 8–15%
              of gross load value, but spread variance is wider than
              the headline suggests: on tight-capacity lanes spreads
              run 15–25%, and the proposed FMCSA broker transparency
              rule (49 CFR Part 371) — if finalized — would
              materially shift the information balance between
              brokers and small carriers. Fifth, the structural
              advantage of holding your own authority over leasing on
              has widened in 2026: tax deductibility, pricing power,
              and equipment equity accumulation all favor the
              independent operator, and the post-AB 5 regulatory
              environment makes lease-on increasingly costly to
              underwrite from both an insurance and a financing
              perspective.
            </p>
            <p>
              The most actionable finding for first-time
              owner-operators: capitalize properly. The single most
              common cause of failure on the Dispatched panel is not
              poor freight selection or bad maintenance discipline —
              it is undercapitalization at startup, which forces the
              operator into MCA or lease-purchase structures that
              compound margin compression instead of relieving it.
            </p>
          </section>

          <section className="research-section" id="revenue-per-mile">
            <h2>2. Revenue per mile in 2026</h2>
            <p>
              Revenue per mile (<Link href="/glossary/rpm">RPM</Link>)
              is the input every other owner-op metric is divided
              into. The 2026 spot-market environment is materially
              better than the 2023–2024 trough but still well below
              the 2021–2022 peak. The four equipment-class bands
              below reflect Dispatched panel observations against
              public load-board data through April 2026; readers
              should treat the bands as averages with substantial
              lane and seasonal variance.
            </p>

            <h3>Dry van</h3>
            <p>
              Dry-van spot-market RPM in 2026 bands roughly{" "}
              <strong>$2.20–$2.70 per mile</strong> all-in (linehaul
              plus fuel surcharge), with the lower end concentrated in
              long-haul Midwest and Southeast lanes and the upper end
              concentrated in tight-capacity Northeast and West Coast
              outbound. The 2024 trough on the equivalent band was
              roughly $1.80–$2.30; 2022&apos;s peak was $3.20–$3.80.
              The 2026 reading is recovery, not return to peak.
            </p>

            <h3>Refrigerated</h3>
            <p>
              Reefer RPM bands{" "}
              <strong>$2.50–$3.20 per mile</strong> in 2026, with
              produce-season lanes (Florida and California outbound
              in spring, Pacific Northwest outbound in summer)
              pricing toward the upper end. Reefer carries higher
              variable cost (fuel-burn for the reefer unit, more
              demanding maintenance) which compresses the
              cost-adjusted margin advantage versus dry van; the
              gross-RPM advantage does not fully flow to the bottom
              line.
            </p>

            <h3>Flatbed</h3>
            <p>
              Flatbed RPM bands{" "}
              <strong>$2.80–$3.50 per mile</strong>, with steel,
              building materials, and machinery the dominant
              commodities. Flatbed pricing tracks construction and
              industrial activity more closely than dry van; the
              2026 reading benefits from continued infrastructure
              spending and a stabilized housing-starts curve.
              Securement equipment cost and tarp-handling labor are
              the offsetting cost lines.
            </p>

            <h3>Hot-shot</h3>
            <p>
              Hot-shot (typically Class 3–5 with gooseneck) RPM has
              the widest variance of any category: a single-trip
              dedicated run can price <strong>$1.80–$3.50 per
              mile</strong> depending on urgency, vehicle class, and
              equipment match. Hot-shot is more of an entrepreneurial
              dispatch game than a rate-tied freight category, and
              the average bands hide the operator-skill premium that
              dominates outcomes in this segment.
            </p>

            <h3>Lane economics: long-haul vs short-haul, headhaul vs backhaul</h3>
            <p>
              Lane structure matters as much as commodity. Long-haul
              lanes (1,000+ miles) typically price 10–20% lower per
              mile than short-haul on the same equipment because
              fixed costs are spread over more miles; the bottom-line
              margin can still be higher on long-haul because the
              driver covers more miles per duty cycle. Headhaul lanes
              (high-demand origin, low-demand destination) price
              materially above the band; backhauls (the return leg)
              can price 30–50% below the band, and the average of the
              two is what a properly-priced lane pair should yield.
              Owner-operators who chase headhauls without managing
              the backhaul math typically end up with a deceptively
              attractive headline RPM and a marginal effective RPM
              once the full round-trip is accounted for.
            </p>

            <h3>Fuel surcharge dynamics</h3>
            <p>
              Fuel surcharge (FSC) is a separately-priced component
              of the all-in RPM in most brokered freight. The
              industry-standard formula adds roughly $0.04–$0.06 per
              mile per $0.06 per gallon over a $3.00 baseline diesel
              price. With 2026 retail diesel running $3.50–$5.00, the
              published FSC on a typical broker-rate confirmation
              should be running $0.40–$0.50 per mile or more — though
              the gap between published FSC and what brokers actually
              pay is a recurring source of operator frustration and
              the subject of FMCSA broker transparency rulemaking
              (covered in <a href="#regulatory">section 9</a>).
            </p>

            <h3>Brokered vs direct shipper rates</h3>
            <p>
              Direct shipper rates typically price 8–15% above the
              broker-equivalent rate, because the shipper is paying
              what the broker would have collected as spread. The
              capital advantage of broker freight is liquidity (the
              broker pays in 30–45 days against an invoice that
              factors at 1.5–5%, versus a direct shipper relationship
              that may pay net-30 or net-45 without factoring). For
              small owner-operators, brokered freight remains the
              dominant share of the load mix in 2026; the operators
              who graduate to direct relationships do so over years,
              not months.
            </p>

            <h3>Comparison to 2024 baseline</h3>
            <p>
              Across every equipment class, 2026 RPM is recovered
              from the 2023–2024 trough but well below the 2021–2022
              peak. The recovery is real and broad-based — it is not
              concentrated in any single commodity or geography. The
              Dispatched view is that 2026 RPM is closer to a new
              normal than to a transitory cycle reading, and
              operators should price their business plans against the
              current band rather than against the 2021–2022 peak.
            </p>
          </section>

          <section className="research-section" id="cost-per-mile">
            <h2>3. Cost per mile breakdown</h2>
            <p>
              Cost per mile (<Link href="/glossary/cpm">CPM</Link>) is
              what revenue per mile has to clear in order for the
              operation to be viable. ATRI&apos;s 2025 Operational
              Costs of Trucking survey is the most-cited industry
              baseline; the 2024 reading put total marginal cost
              (variable + fixed, excluding owner compensation) at
              roughly $2.20 per mile, and the 2025 reading drifted
              modestly higher to roughly $2.30 per mile for the
              average OTR Class 8 carrier. Owner-operator economics
              run somewhat lower on the labor line (the operator is
              the driver) but somewhat higher on the
              per-truck-distributed fixed cost line. The band below
              reflects what an owner-operator running an older paid-off
              tractor versus a newer financed tractor should expect to
              see in 2026.
            </p>

            <h3>Fuel: ~$0.60–$0.75 per mile</h3>
            <p>
              Fuel is the largest single variable cost. At a typical
              6.0–7.5 MPG (roughly 1.4–1.7 gallons per mile)
              consumption rate for an OTR Class 8 and a $3.50–$5.00
              retail diesel price, fuel costs run $0.60–$0.75 per
              mile gross. Factor-provided fuel discount programs
              (Apex roughly $0.51/gal at major chains, RTS roughly
              $0.40/gal, eCapital roughly $0.20/gal across a wider
              network) can claw back $0.05–$0.10 per mile on a typical
              monthly fuel consumption. The fuel line is the most
              sensitive to operator behavior — speed management,
              idling discipline, route optimization — and the fastest
              place to find recoverable margin.
            </p>

            <h3>Truck payment: ~$0.20–$0.40 per mile</h3>
            <p>
              Truck payment per mile depends on the loan structure
              (down payment, term, APR — see the equipment financing
              section of our{" "}
              <Link href="/research/state-of-trucking-capital-2026">
                State of Trucking Capital 2026
              </Link>{" "}
              report for the 9–18% APR band), the price of the
              tractor, and the annual miles driven. A newer Class 8
              at a $140K price, 15% down, 72-month term, 12% APR on
              a 110,000 annual-mile pace yields a payment line of
              roughly $0.25 per mile; a more aggressive used-truck
              purchase at $80K, 20% down, 60-month term, 14% APR on
              the same mile pace yields roughly $0.15 per mile. The
              $0.20–$0.40 range reflects the realistic spread on the
              Dispatched panel. A paid-off truck has a zero payment
              line but carries higher maintenance — the two move in
              opposite directions and are difficult to separate.
            </p>

            <h3>Insurance: ~$0.10–$0.18 per mile</h3>
            <p>
              Insurance — primary liability, cargo, physical damage,
              non-trucking liability — runs $0.10–$0.18 per mile for
              owner-operators in 2026. The lower end is a seasoned
              owner-op with clean MVR and a 700+ FICO operating in a
              low-severity state on standard freight; the upper end
              is a new-authority operator in a high-severity venue
              (Cook County, Miami-Dade) on higher-value freight. This
              line item has grown more than any other in the
              owner-operator P&amp;L over the past five years; see{" "}
              <Link href="/research/state-of-commercial-trucking-insurance-2026">
                State of Commercial Trucking Insurance 2026
              </Link>{" "}
              for the structural reasons.
            </p>

            <h3>Maintenance: ~$0.15–$0.20 per mile</h3>
            <p>
              Maintenance is the most variable cost on the operator
              P&amp;L. ATRI&apos;s 2025 reading puts the
              fleet-average repair and maintenance cost at roughly
              $0.20 per mile for OTR Class 8, with the figure
              climbing steeply as equipment age passes seven years.
              Owner-operators running newer paid-financed equipment
              should expect to run closer to $0.10–$0.15 per mile
              through the first 200K miles, with a step up to
              $0.20–$0.30 per mile in the post-warranty window.
              Tire replacement, brake work, and post-warranty engine
              and aftertreatment repairs are the dominant line items.
              The discipline of building a maintenance reserve out of
              every settlement is the cleanest separation we observe
              between operators who survive their first three years
              and those who do not.
            </p>

            <h3>Factoring and financing carry: ~$0.05–$0.10 per mile</h3>
            <p>
              For operators using factoring at 2.5–3.5% per invoice,
              the factoring cost per mile lands roughly $0.05–$0.08
              per mile at typical RPM. Operators using working
              capital alongside factoring carry an additional
              financing line that depends on the working-capital
              draw and the APR; on the Dispatched panel that
              additional carry runs another $0.02–$0.05 per mile for
              operators with active working-capital balances.
            </p>

            <h3>Fixed compliance and administration: ~$0.03–$0.05 per mile</h3>
            <p>
              Fixed compliance costs distributed across annual miles
              include IFTA fuel-tax filing (variable, but the time
              cost is real), IRP plates ($300–$2,500+ per truck
              depending on operating states), UCR ($46–$70 per truck
              annually depending on fleet size), BOC-3 process agent
              ($50–$100 annually), ELD service and data fees
              ($35–$50 per month per truck), and the heavy-vehicle
              use tax (HVUT, IRS Form 2290, $550 maximum for tractors
              over 75,000 lb GVW). Distributed across 100,000–130,000
              annual miles, the bundle runs $0.03–$0.05 per mile.
            </p>

            <h3>Driver pay if not owner-driven</h3>
            <p>
              An owner-operator who is also the driver does not
              carry a driver-pay line — the residual after every
              other cost is the operator&apos;s compensation. A
              small fleet operator (one or more trucks with hired
              drivers) carries a driver-pay line of $0.60–$0.80 per
              mile for company drivers or 25–35% of gross revenue for
              percentage drivers. The driver-pay decision is the
              single largest cost lever for a small fleet and is
              where the structural difference between
              owner-operator-only economics and small-fleet economics
              shows up.
            </p>

            <h3>The CPM–RPM gap that defines viability</h3>
            <p>
              Stack the variable bands above on a 2026 owner-operator
              running a newer financed tractor: fuel $0.70, truck
              payment $0.25, insurance $0.13, maintenance $0.15,
              factoring $0.07, fixed compliance $0.04 — total
              $1.34 per mile before driver compensation. At a
              dry-van all-in RPM of $2.45 (midpoint of the band),
              the operator&apos;s pre-tax compensation is roughly
              $1.11 per mile, or roughly $122,000 on a 110,000-mile
              year. Cut RPM to $2.20 (low end of the dry-van band)
              and that compensation drops to $0.86 per mile, or
              $94,600 on the same mile pace. Hold RPM at the midpoint
              and push insurance to $0.18 and maintenance to $0.25
              (post-warranty equipment in a high-severity state), and
              the compensation drops to $0.93 per mile, $102,300 on
              the year. The CPM–RPM gap is the entire game, and
              small movements in either input have large effects on
              the operator&apos;s take-home.
            </p>
          </section>

          <section className="research-section" id="lease-purchase">
            <h2>4. The lease-purchase failure rate</h2>
            <p>
              The lease-purchase failure rate is one of the few
              numbers in trucking that has stayed unambiguously bad
              year after year. Studies cited by the FMCSA Truck
              Leasing Task Force and OOIDA Foundation surveys put the
              lease-purchase failure rate above 80% — drivers who
              enter a lease-purchase program either fail to complete
              the lease, walk away with no equity, or end up owing
              the carrier money. The 2025 readings we have seen are
              consistent with the long-running pattern. There is no
              evidence the failure rate has improved.
            </p>
            <p>
              The structural reason lease-purchase math typically
              loses to a conventional equipment loan is not subtle.
              In a conventional financing structure, the operator
              owns the tractor on Day 1; the lender holds a UCC-1
              lien; the operator pays principal and interest at
              market rate (9–18% APR on the Dispatched panel for
              used Class 8 in 2026). Maintenance is the operator&apos;s
              cost; freight selection is the operator&apos;s decision;
              the operator&apos;s authority is the operator&apos;s
              own. In a typical lease-purchase, the carrier owns the
              tractor; the operator pays a lease payment that is
              typically 30–50% above what the equivalent loan
              payment would be; maintenance is deducted from
              settlements at marked-up rates; freight is the
              carrier&apos;s pick; settlement deductions for fuel,
              ELD, insurance, escrow, and tractor washes consume the
              cash flow that would otherwise build a maintenance
              reserve or a buyout fund. The math is engineered to
              keep the operator productive but unable to complete the
              purchase.
            </p>
            <p>
              FMCSA scrutiny has intensified. The FMCSA Truck Leasing
              Task Force&apos;s final report (delivered to the agency
              in 2024) documented the structural concerns and made
              recommendations for transparency and consumer-protection
              rulemaking. As of April 2026, no final rule has been
              published, but the regulatory trajectory is clear and
              we expect a proposed rule to land before the end of
              2027.
            </p>
            <p>
              The path forward for first-time owner-operators is
              boring and correct: build the file (CDL, six months of
              driving experience, savings for down payment, clean
              MVR), shop equipment loans through specialty trucking
              lenders, hold your own authority, and avoid
              lease-purchase as a structural matter. Our{" "}
              <Link href="/glossary/lease-purchase">
                lease-purchase glossary entry
              </Link>{" "}
              and the{" "}
              <Link href="/owner-operator-financing/first-time">
                first-time owner-operator guide
              </Link>{" "}
              cover the sequence in detail.
            </p>
          </section>

          <section className="research-section" id="new-authority-economics">
            <h2>5. The new-authority economics</h2>
            <p>
              FMCSA SAFER data continues to show roughly 80,000+ new
              MC# applications per year through the 2024–2025 window,
              moderating off the post-COVID surge but holding well
              above the pre-2020 baseline. New-authority economics
              are the most punishing in trucking — the operator has
              no operating history, no broker relationships, no
              commercial credit file, and is entering a freight
              market that is recovering but not booming. The startup
              capital requirement has climbed materially in 2026, and
              the gap between realistic startup capital and
              advertised &quot;get started for $5,000&quot; messaging
              is wide enough to be a primary failure-mode predictor
              on the Dispatched panel.
            </p>

            <h3>Realistic Year 1 startup capital</h3>
            <p>
              The realistic Year 1 capital requirement for a
              new-authority owner-operator in 2026 lands in the
              $20K–$50K range, depending primarily on the truck
              acquisition path and the insurance state. The line
              items:
            </p>
            <ul className="research-list">
              <li>
                <strong>FMCSA authority filing (MC# / DOT#):</strong>{" "}
                roughly $300, one-time. Straightforward.
              </li>
              <li>
                <strong>Year 1 insurance (primary liability + cargo + physical damage):</strong>{" "}
                $8,000–$18,000 for new authority on a single Class 8
                tractor, with the upper end concentrated in
                high-severity states (California, Illinois, New
                Jersey, New York). Premium financing is the standard
                way to manage this line; see{" "}
                <a href="#insurance-pressure">section 7</a>.
              </li>
              <li>
                <strong>BOC-3 process agent:</strong> $50–$100,
                annually.
              </li>
              <li>
                <strong>UCR (Unified Carrier Registration):</strong>{" "}
                $46–$70 per truck annually for 1–2 truck fleets.
              </li>
              <li>
                <strong>IRP plates (International Registration Plan):</strong>{" "}
                $300–$2,500+ depending on operating states. A
                regional operator in 3–5 states will run the lower
                end; a 48-state operator will run materially higher.
              </li>
              <li>
                <strong>HVUT (Form 2290):</strong> $550 maximum for
                tractors above 75,000 lb GVW, annually.
              </li>
              <li>
                <strong>Truck down payment:</strong> $13,000–$26,000
                typical for a 15–20% down payment on an $80,000–$140,000
                Class 8 tractor. The single largest startup line.
              </li>
              <li>
                <strong>Working-capital reserve:</strong>{" "}
                $5,000–$10,000 to cover the gap between dispatch and
                first factored settlement, plus initial fuel and
                trip expenses. This line is the most commonly
                underestimated.
              </li>
            </ul>
            <p>
              The sum lands in the $20K–$50K range. Operators who
              attempt to start with materially less typically end up
              in MCA or lease-purchase structures within six months,
              because the gap between actual startup needs and
              available capital has to be filled somehow.
            </p>

            <h3>First-year revenue ranges</h3>
            <p>
              First-year revenue depends almost entirely on operating
              hours and freight discipline. A new-authority
              owner-operator running 90,000–110,000 miles in Year 1
              at a dry-van average RPM of $2.30–$2.50 grosses
              roughly $207,000–$275,000. Cost per mile in Year 1 is
              typically at the upper end of the bands in{" "}
              <a href="#cost-per-mile">section 3</a> because of
              elevated insurance, lower-tier factoring rates, and a
              higher truck payment line on a financed tractor with a
              shorter operating history. Pre-tax compensation in
              Year 1 for a properly-capitalized new-authority
              operator typically lands $50,000–$90,000; the upper
              end requires aggressive freight selection, lane
              discipline, and the avoidance of MCA debt.
            </p>

            <h3>Factor + working capital cash-flow architecture</h3>
            <p>
              The cleanest cash-flow architecture for a new-authority
              operator is factor-first, working-capital-second:
              factor every load through a single specialty factor
              (Apex, eCapital, RTS, or now Love&apos;s Financial
              post-TBS) at 2.5–4% per invoice on a new-authority
              program; carry zero MCA; access working capital only
              after 12–24 months of operating history. The factoring
              relationship covers the dispatch-to-pay gap; the
              working-capital relationship (when it becomes
              accessible) covers maintenance reserves and tactical
              cash needs. Our{" "}
              <Link href="/new-authority-truck-financing">
                new-authority truck financing
              </Link>{" "}
              vertical covers the file requirements and program
              structures.
            </p>
          </section>

          <section className="research-section" id="broker-spread">
            <h2>6. Broker spread dynamics</h2>
            <p>
              The <Link href="/glossary/broker-spread">broker spread</Link>{" "}
              is the difference between what the shipper pays the
              broker and what the broker pays the carrier; it is the
              broker&apos;s gross margin on the load. Typical brokered
              freight in 2026 runs an 8–15% spread (broker keeps
              8–15%, carrier receives 85–92% of shipper pay), with
              the average closer to 12% on standard dry-van and reefer
              brokered freight.
            </p>
            <p>
              Spread is not constant. The two structural drivers of
              spread variance are lane capacity (tight-capacity lanes
              command higher spreads because the broker has freight
              to give and capacity is constrained) and shipper
              relationship (long-tenured shipper relationships allow
              the broker to negotiate the shipper rate above the
              market and split the upside). On high-capacity lanes —
              outbound from major freight origins on a balanced lane
              pair — spreads compress to 5–8% as carriers compete on
              price for the available freight. On tight-capacity
              lanes — outbound from a freight desert or in
              capacity-constrained windows — spreads can run 15–25%,
              and the broker is collecting most of the load economics.
            </p>
            <p>
              The proposed <strong>FMCSA broker transparency rule</strong>{" "}
              (NPRM under 49 CFR Part 371) would require brokers to
              provide the underlying load documentation — including
              the rate paid by the shipper — to the carrier on
              request. The rule has been in proposed form for an
              extended period; comment periods have closed; no final
              rule has issued as of April 2026. The status of the
              rule through 2026 is uncertain, but if finalized it
              would materially shift the information balance between
              brokers and small carriers, particularly on
              tight-capacity lanes where spread variance is
              concentrated.
            </p>
            <p>
              The practical implication for owner-operators in 2026
              is that spread is what it is — small carriers do not
              have the leverage to negotiate broker spread on a
              per-load basis. The leverage they do have is freight
              selection: declining loads where the broker spread is
              visibly excessive (apparent in the urgency, the rate
              gap to load-board comparables, and the broker&apos;s
              willingness to negotiate). The most durable advantage
              over time is shifting to direct shipper relationships,
              which captures most of what would have been broker
              spread for the operator. That transition is a multi-year
              project for most owner-operators and rarely happens in
              Year 1.
            </p>
          </section>

          <section className="research-section" id="insurance-pressure">
            <h2>7. Insurance premium pressure on owner-op P&amp;L</h2>
            <p>
              Commercial-auto insurance is the single fastest-growing
              line on the owner-operator P&amp;L. Premium growth
              has continued at roughly 15–25% year-over-year for many
              owner-operators in 2026, driven by the multi-year
              nuclear-verdict environment, continued severity
              inflation in commercial-auto claims, and ongoing
              carrier exits from the trucking specialty segment.
              AM Best&apos;s 2025 commercial-auto market segment
              outlook moved positive for the first time in a decade,
              but underlying premium pressure on the operator side
              has not eased to the same extent — the segment is
              improving from a structural-loss position, not from a
              tight margin one.
            </p>
            <p>
              The insurance line as a share of total cost has grown
              materially over the past five years. In a 2020 cost
              structure, insurance ran roughly 5–7% of total CPM. In
              2026, insurance runs 7–10% of total CPM on the typical
              owner-op P&amp;L, and as high as 12–14% for new
              authority in high-severity states. The line is
              growing as a share even as the operation grows in
              absolute revenue.
            </p>
            <p>
              Nuclear verdicts — single-event jury awards above $10M
              — have continued to drive carrier appetite away from
              owner-operator and small-fleet trucking. The carrier
              count writing dedicated trucking specialty business
              has compressed; surplus-lines placement is now a
              larger share of the small-fleet book than it was even
              two years ago. State-level tort reform (Texas HB 19,
              Florida HB 837, Georgia SB 68/69) has begun to unwind
              the premium pressure in tort-reform states, but the
              non-reform states (California, Illinois, New York,
              New Jersey) continue to price the venue exposure into
              the base rate.
            </p>
            <p>
              Premium financing is now the standard way most
              owner-operators pay annual primary liability. The
              premium-finance rate band on the Dispatched panel
              runs 8–15% APR on a 9–11 month term, collateralized
              by the unearned premium. The structural risk of
              premium financing in a hard insurance market is the
              cancellation cycle: missed monthly payments cancel
              the underlying policy, which puts the operator
              off-road and unable to invoice. The cleanest
              defensive practice we observe on the panel is to
              treat the premium-finance ACH as a top-priority
              payment, ahead of every settlement deduction except
              the truck payment itself. The full insurance market
              picture is in our{" "}
              <Link href="/research/state-of-commercial-trucking-insurance-2026">
                State of Commercial Trucking Insurance 2026
              </Link>{" "}
              report.
            </p>
          </section>

          <section className="research-section" id="fuel">
            <h2>8. Fuel cost trends</h2>
            <p>
              The 2026 retail diesel pricing band, per EIA weekly
              data, runs roughly <strong>$3.50–$5.00 per
              gallon</strong> nationally, with West Coast pricing
              concentrated at the upper end and Gulf Coast at the
              lower end. Fleet-card pricing through dedicated
              programs runs roughly $0.20–$0.50 per gallon below
              retail at major chains, producing an effective
              fleet-card price of $3.00–$4.50 per gallon for the
              same window. Federal excise tax (24.4¢/gal on diesel)
              and state-level diesel taxes (ranging from roughly
              16¢/gal to over 70¢/gal depending on state) are baked
              into the pump price; California, Pennsylvania, and
              Indiana are at the upper end on state diesel tax.
            </p>
            <p>
              The published fuel surcharge (FSC) on a typical broker
              rate confirmation in 2026 should run $0.40–$0.50 per
              mile or more at current diesel pricing, using the
              industry-standard $0.04–$0.06 per mile per $0.06 over
              $3.00 baseline. The persistent operator complaint —
              and the subject of FMCSA broker transparency rulemaking
              — is that the published FSC on the rate confirmation
              does not always reflect what the broker actually
              collected from the shipper. In practice the FSC
              becomes a negotiable line that small carriers do not
              consistently capture.
            </p>
            <p>
              Carrier fuel discount programs through factoring
              relationships are a meaningful margin recovery tool.
              Apex Capital&apos;s fuel program lists discounts up to
              roughly $0.51 per gallon at major chains; RTS
              Financial&apos;s program runs roughly $0.40 per gallon;
              eCapital&apos;s program runs roughly $0.20 per gallon
              across a wider station network. For an operator
              burning 1,000+ gallons per truck per month, the fuel
              discount math can offset 30–60% of the factoring fee
              — making the choice of factor as much a fuel-program
              decision as a rate decision. The ranked breakdown by
              use case is in our{" "}
              <Link href="/research/best-trucking-factoring-2026">
                Best trucking factoring companies 2026
              </Link>{" "}
              report.
            </p>
          </section>

          <section className="research-section" id="regulatory">
            <h2>9. Regulatory shifts affecting owner-op economics</h2>
            <p>
              Five regulatory threads are doing the most work on the
              2026 owner-operator P&amp;L. None resolves cleanly
              within the year, but the directional pressure on each
              is clear.
            </p>

            <h3>California AB 5 and FAAAA preemption litigation</h3>
            <p>
              California AB 5 reclassified most independent
              contractors as employees under California labor law;
              the trucking-industry litigation around FAAAA
              preemption has settled into durable ambiguity. As of
              April 2026, no Supreme Court resolution is imminent.
              The practical effect on owner-operator economics is
              that any lease-on relationship in California carries a
              misclassification exposure that gets scrutinized in
              any post-loss or post-employment litigation, which
              feeds back into insurance underwriting and financing
              availability. For owner-operators holding their own
              authority (independent), AB 5 is not the binding
              constraint; for lease-on operators, AB 5 is a
              structural reason to shift to independent status.
            </p>

            <h3>CARB emissions Phase 3</h3>
            <p>
              The California Air Resources Board (CARB) Heavy-Duty
              Omnibus and Advanced Clean Fleets regulations are now
              in their first year of full implementation in 2026.
              The cumulative effect is a structurally higher cost of
              operating in California for owner-operators registered
              or domiciled there, and a phased extension of cost
              pressure to operators that frequently transit
              California regardless of registration. New
              Class 8 tractor pricing has been climbing partly as a
              result of the emissions-package compliance cost. EPA&apos;s
              March 2024 Phase 3 GHG rule for heavy-duty vehicles
              adds federal compliance pressure on top of the CARB
              regime.
            </p>

            <h3>FMCSA Drug &amp; Alcohol Clearinghouse</h3>
            <p>
              The FMCSA Drug &amp; Alcohol Clearinghouse continues to
              report hundreds of thousands of CDL holders in
              prohibited status, with the return-to-duty process
              producing slow throughput back into active operation.
              The structural effect is a tighter operator labor
              market that puts upward pressure on company-driver
              pay rates, which compresses small-fleet margins. The
              effect on owner-operators who are also their own
              driver is indirect — primarily a relative-value effect,
              where the gap between owner-operator economics and
              company-driver economics widens.
            </p>

            <h3>ELD mandate fully enforced</h3>
            <p>
              The ELD mandate is fully enforced through 2026 — the
              last remaining exemptions (the AOBRD grandfathering
              window) closed years ago. The practical effect on
              owner-operator economics is improving file quality
              for financing and insurance — lenders and underwriters
              now have access to operational data that was not
              available a decade ago, which is modestly tightening
              underwriting on weak files and loosening it on strong
              ones.
            </p>

            <h3>FMCSA broker transparency rule</h3>
            <p>
              Covered in <a href="#broker-spread">section 6</a>. The
              proposed rule remains in regulatory development; the
              status through 2026 is uncertain. If finalized, the
              rule materially shifts the information balance between
              brokers and small carriers.
            </p>

            <h3>State-level MCA disclosure expansion</h3>
            <p>
              California SB 1235, New York&apos;s Commercial Finance
              Disclosure Law, Utah HB 387, and Virginia HB 1027 have
              established a state-level disclosure regime requiring
              APR-equivalent disclosure on commercial financing —
              including merchant cash advance. We expect 3–5
              additional states to pass similar laws through
              2026–2027. The relevance to owner-operator economics is
              indirect but real: APR-equivalent disclosure makes the
              cost comparison between working capital (14–34% APR)
              and MCA (40–150% APR effective) visible at the point
              of sale, which should compress the MCA share of
              owner-operator and small-fleet financing over a
              multi-year horizon.
            </p>
          </section>

          <section className="research-section" id="structural-advantages">
            <h2>10. The structural advantages of independent owner-operators</h2>
            <p>
              The economics of the independent owner-operator — one
              who holds their own MC#, controls their own broker
              relationships, owns or finances their own equipment —
              continue to compare favorably to the alternatives in
              2026. The three comparison points worth naming:
            </p>

            <h3>Versus W-2 company drivers</h3>
            <p>
              W-2 company drivers in 2026 are typically paid $0.55–$0.80
              per mile (long-haul OTR), with health insurance,
              vacation, and a 401(k) structure that company-driver
              recruiters quote heavily in advertising. The
              gross-mile compensation looks lower than the
              owner-operator residual derived in{" "}
              <a href="#cost-per-mile">section 3</a>, but the gap is
              real: the same Class 8 lane on a properly-capitalized
              owner-operator P&amp;L produces $0.90–$1.10 per mile
              in pre-tax compensation. The trade is risk-bearing:
              the owner-operator absorbs maintenance variance,
              insurance premium variance, freight-rate variance, and
              equipment residual variance in exchange for the
              gross-mile premium.
            </p>

            <h3>Versus lease-on operators</h3>
            <p>
              Lease-on operators (running under a motor carrier&apos;s
              authority, paid on a percentage or per-mile basis by the
              carrier) sit between W-2 company driver and independent
              owner-operator. The carrier handles authority,
              insurance, factoring, and broker relationships; the
              operator drives. Compensation typically runs $0.70–$0.90
              per mile on a percentage or per-mile basis, with
              settlement deductions covering ELD, occupational
              accident insurance, fuel-card discount, and a variety of
              other carrier-managed services. Lease-on is operationally
              simpler than independent but compresses upside; the
              economics of the carrier&apos;s broker relationships,
              fuel discount programs, and load matching accrue to the
              carrier, not the operator. AB 5 misclassification
              exposure (covered above) is an additional cost of the
              lease-on structure in California.
            </p>

            <h3>Tax deductibility</h3>
            <p>
              The independent owner-operator has access to the full
              set of small-business tax deductions, which materially
              improves the after-tax economics of the gross-mile
              compensation. The major lines:
            </p>
            <ul className="research-list">
              <li>
                <strong><Link href="/glossary/per-diem">Per diem</Link>:</strong>{" "}
                Under IRS Publication 463 and the transportation
                industry special rate, owner-operators may deduct a
                per diem for meals and incidental expenses on
                overnight away-from-home trips. For 2026 the
                transportation industry rate is roughly $80 per day
                domestic, deductible at 80%. For an OTR operator
                running 200+ away-from-home nights, the per-diem
                deduction is $12,000–$16,000 annually.
              </li>
              <li>
                <strong><Link href="/glossary/section-179">Section 179</Link>{" "}
                and bonus depreciation:</strong>{" "}
                Section 179 expensing and bonus depreciation allow
                owner-operators to deduct the cost of qualifying
                tractor and trailer equipment in the year of purchase
                rather than across depreciation life. The 2026 bonus
                depreciation rate is 40% (phasing down on the
                schedule set in TCJA), with Section 179 limits well
                above what a typical owner-operator&apos;s equipment
                purchase reaches. The interaction with financing
                structure (taking depreciation on financed equipment)
                materially improves the first-year cash flow of an
                equipment purchase.
              </li>
              <li>
                <strong>Actual operating expenses:</strong> Fuel,
                maintenance, insurance, factoring fees, ELD service,
                IFTA, IRP plates, UCR, BOC-3, professional services,
                and reasonable home-office expenses are all
                deductible against gross revenue. Properly tracked,
                the deductions reduce the taxable income materially
                below the gross.
              </li>
            </ul>
            <p>
              The W-2 company driver cannot deduct any of the above
              against W-2 wages under current tax code (the
              Tax Cuts and Jobs Act eliminated unreimbursed employee
              business expense deductions). The tax-side advantage of
              independent owner-operator status is structural and
              material — a properly-counseled owner-operator running
              the same lane as a W-2 company driver keeps materially
              more after tax.
            </p>

            <h3>Pricing power on rates</h3>
            <p>
              The independent owner-operator picks every load, on
              every lane, at every rate. The W-2 company driver
              picks none. The lease-on operator picks loads inside
              the carrier&apos;s book. The price-discovery
              opportunity available to the independent operator is
              the practical mechanism by which freight selection and
              lane discipline produce above-band RPM over a year of
              operation — and it is the mechanism by which the most
              successful owner-operators on the Dispatched panel
              consistently outearn their peers.
            </p>

            <h3>Equipment equity accumulation</h3>
            <p>
              The owner-operator who finances a tractor at market
              rate, runs the equipment for 7–10 years, and pays the
              loan to completion ends the period with a paid-off
              asset of meaningful residual value. Used Class 8
              residuals have stabilized in 2026 after the 2022–2024
              swing; a well-maintained 7-year-old Class 8 tractor
              typically retains $30K–$60K of resale value. The
              equity accumulation is real and is not available to
              W-2 company drivers or to most lease-purchase
              participants (who, given the failure-rate evidence,
              statistically do not complete the purchase).
            </p>
          </section>

          <section className="research-section" id="predictions">
            <h2>11. Predictions for 2026–2027</h2>
            <p>
              Five specific, falsifiable predictions for the next 18
              months.
            </p>
            <ol className="research-list">
              <li>
                <strong>
                  Spot-market RPM holds the current band through
                  2026 with modest upward drift on dry van and
                  flatbed.
                </strong>{" "}
                We expect dry-van RPM to drift up 5–10% from the
                April 2026 midpoint through Q4 2026 as capacity
                attrition continues to balance demand, and reefer and
                flatbed to track similarly. Probability: high
                (greater than 60%).
              </li>
              <li>
                <strong>
                  Insurance premium growth continues at 10–20%
                  year-over-year through 2026.
                </strong>{" "}
                The hard market shows signs of easing on the carrier
                side (AM Best moved the segment outlook to positive),
                but premium growth on the operator side will lag the
                carrier-side improvement. The insurance line will
                continue to grow as a share of the owner-operator
                P&amp;L. Probability: high (greater than 70%).
              </li>
              <li>
                <strong>
                  FMCSA lease-purchase rulemaking advances to NPRM
                  before end of 2027.
                </strong>{" "}
                The Truck Leasing Task Force final report has given
                the regulator the foundation for action; the
                directional pressure is unambiguous. Some form of
                transparency or consumer-protection rulemaking is
                more likely than not to be proposed within the
                horizon. Probability the rule reaches NPRM stage:
                moderate-to-high (55–65%).
              </li>
              <li>
                <strong>
                  New-authority MC# applications hold 70K–90K
                  annually through 2026 despite climbing startup
                  costs.
                </strong>{" "}
                The structural drivers of new-authority entry
                (W-2-to-independent transition, the dispatch-software
                ecosystem that makes solo authority operationally
                feasible, and freight-market recovery) continue to
                outweigh the rising startup-cost barrier. We do not
                expect new-authority entry to collapse. Probability:
                high (greater than 65%).
              </li>
              <li>
                <strong>
                  FMCSA broker transparency rule finalizes in 2026
                  with phased implementation in 2027, or stalls into
                  2027.
                </strong>{" "}
                The rule has been in regulatory development long
                enough that a finalization in 2026 is plausible; the
                form may be narrower than the original NPRM. Equal
                probability the rule stalls without finalization.
                Probability of finalization in 2026: moderate
                (45–55%).
              </li>
            </ol>
          </section>

          <section className="research-section" id="methodology">
            <h2>12. Methodology and sources</h2>
            <p>
              This report draws on four categories of source. First,
              public regulatory and registration data — FMCSA SAFER
              for new-authority registration counts, the FMCSA Drug
              &amp; Alcohol Clearinghouse monthly summaries, FMCSA
              Truck Leasing Task Force final report, federal
              rulemaking dockets (the broker transparency NPRM and
              the Phase 3 GHG final rule), and IRS Publication 463
              for the transportation-industry per diem rate. Second,
              industry-association published research — the American
              Transportation Research Institute (ATRI) Operational
              Costs of Trucking surveys for the 2024 and 2025
              baselines, and OOIDA Foundation surveys for
              owner-operator profile and lease-purchase outcome data.
              Third, public market data — EIA weekly retail diesel
              prices, and public disclosures from Apex Capital, RTS
              Financial, and eCapital on fuel discount programs and
              factoring rate structure. Fourth, Dispatched&apos;s own
              panel observations — we maintain working relationships
              with a panel of trucking lenders, factors, and
              insurance producers, and reference panel rate and
              structure observations alongside the public sources
              throughout the report.
            </p>
            <p>
              Time horizon: data through April 2026. Where the report
              cites RPM bands or CPM ranges, those are snapshot
              observations on the Dispatched panel and public
              comparables as of the report&apos;s publication date
              and should be expected to drift modestly through the
              remainder of the year. Where the report makes a
              forward-looking prediction, we have attempted to make
              the prediction specific, time-bound, and falsifiable —
              and to attach an explicit probability where the
              underlying signal supports one.
            </p>
            <p>
              Disclosures: Dispatched is a matching platform for
              commercial trucking financing and trucking insurance.
              Dispatched maintains commercial relationships with a
              panel of trucking lenders, factors, and insurance
              producers referenced throughout this report; those
              relationships are documented in our{" "}
              <Link href="/methodology">methodology</Link> page and
              on the relevant vertical pages. This report references
              panel observations alongside public sources rather than
              substituting one for the other; readers should refer
              to the public sources for primary data. The report does
              not contain proprietary, paid, or vendor-licensed data
              feeds.
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
              If you are an owner-operator or a prospective
              owner-operator working through the 2026 economics, the
              report above maps to a small set of practical product
              pages and tools on the Dispatched panel.
            </p>
            <div className="research-cta-grid">
              <Link
                href="/owner-operator-financing/first-time"
                className="research-cta-card"
              >
                <h3>First-time owner-operator</h3>
                <p>
                  Sequencing guide from CDL through first funded
                  truck. Covers authority, insurance, equipment, and
                  the file-building order that opens the specialty
                  lender panel.
                </p>
              </Link>
              <Link
                href="/new-authority-truck-financing"
                className="research-cta-card"
              >
                <h3>New-authority truck financing</h3>
                <p>
                  Equipment financing programs that accept
                  new-authority operators. File requirements, typical
                  rate band, and the down-payment realities behind
                  the &quot;no money down&quot; advertising.
                </p>
              </Link>
              <Link
                href="/trucking-working-capital"
                className="research-cta-card"
              >
                <h3>Working capital</h3>
                <p>
                  The cheaper alternative to MCA. 14–34% APR on the
                  panel; term loan, line of credit, and bank-adjacent
                  structures routed by file profile.
                </p>
              </Link>
              <Link
                href="/equipment-financing"
                className="research-cta-card"
              >
                <h3>Equipment financing</h3>
                <p>
                  9–18% APR for used Class 8 on a 60–72 month term.
                  Down payment, term, and rate vary by FICO, time in
                  business, and authority age.
                </p>
              </Link>
              <Link
                href="/calculators/owner-operator-pl"
                className="research-cta-card"
              >
                <h3>Owner-operator P&amp;L calculator</h3>
                <p>
                  Plug your own RPM, miles, and cost lines into the
                  CPM–RPM model from <a href="#cost-per-mile">section
                  3</a>. Returns indicative pre-tax compensation and a
                  variable-by-variable sensitivity table.
                </p>
              </Link>
              <Link
                href="/research"
                className="research-cta-card"
              >
                <h3>Dispatched Research</h3>
                <p>
                  The research index. Annual reports on insurance,
                  capital, and factoring, plus quarterly updates on
                  rate filings and regulatory developments.
                </p>
              </Link>
            </div>
            <p style={{ marginTop: "1.5rem" }}>
              See also: the{" "}
              <Link href="/research/state-of-trucking-capital-2026">
                State of Trucking Capital 2026
              </Link>{" "}
              report,{" "}
              <Link href="/research/state-of-commercial-trucking-insurance-2026">
                State of Commercial Trucking Insurance 2026
              </Link>
              , and the{" "}
              <Link href="/research/best-trucking-factoring-2026">
                Best Trucking Factoring Companies 2026
              </Link>{" "}
              ranking.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
