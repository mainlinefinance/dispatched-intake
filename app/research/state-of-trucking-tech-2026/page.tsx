import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "State of Trucking Tech 2026 — Dispatched Research",
  description:
    "Annual report on commercial trucking technology adoption: ELD evolution, AI dash cams, fleet management platforms, telematics insurance integration, and 2026 outlook.",
  alternates: {
    canonical: "/research/state-of-trucking-tech-2026",
  },
  openGraph: {
    title: "State of Trucking Tech 2026 — Dispatched Research",
    description:
      "Annual report on commercial trucking technology adoption: ELD evolution, AI dash cams, fleet management platforms, telematics insurance integration, and 2026 outlook.",
    url: "/research/state-of-trucking-tech-2026",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "State of Trucking Tech 2026 — Dispatched Research",
    description:
      "Annual report on commercial trucking technology adoption: ELD evolution, AI dash cams, fleet management platforms, telematics insurance integration, and 2026 outlook.",
  },
};

const SOURCES: ReadonlyArray<{ label: string; url: string }> = [
  {
    label:
      "FMCSA — Registered Electronic Logging Devices (ELD) list",
    url: "https://eld.fmcsa.dot.gov/List",
  },
  {
    label:
      "FMCSA — ELD Rule (49 CFR Part 395) and implementation guidance",
    url: "https://www.fmcsa.dot.gov/hours-service/elds/electronic-logging-devices",
  },
  {
    label:
      "Samsara Inc. (NYSE: IOT) — investor relations and public filings",
    url: "https://investors.samsara.com/",
  },
  {
    label:
      "Motive (formerly KeepTruckin) — public product disclosures",
    url: "https://gomotive.com/",
  },
  {
    label:
      "Geotab — connected fleet platform technical documentation",
    url: "https://www.geotab.com/",
  },
  {
    label:
      "Lytx and Netradyne — AI dash cam product disclosures and case studies",
    url: "https://www.lytx.com/",
  },
  {
    label:
      "American Transportation Research Institute (ATRI) — Critical Issues in the Trucking Industry, annual surveys",
    url: "https://truckingresearch.org/",
  },
  {
    label:
      "DAT Freight & Analytics — load board and rate index documentation",
    url: "https://www.dat.com/",
  },
  {
    label:
      "Truckstop — load board and Go Capital factoring integration disclosures",
    url: "https://truckstop.com/",
  },
  {
    label:
      "Uber Freight — public product disclosures and shipper platform documentation",
    url: "https://www.uberfreight.com/",
  },
  {
    label:
      "International Fuel Tax Agreement (IFTA) — articles of agreement and procedures manual",
    url: "https://www.iftach.org/",
  },
  {
    label:
      "FMCSA Drug & Alcohol Clearinghouse — Monthly Summary Reports",
    url: "https://clearinghouse.fmcsa.dot.gov/Resource/Index/Monthly-Summary",
  },
];

export default function StateOfTruckingTech2026() {
  const today = new Date().toISOString().slice(0, 10);
  const url =
    "https://dispatched.finance/research/state-of-trucking-tech-2026";
  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Research", url: "https://dispatched.finance/research" },
          {
            name: "State of Trucking Tech 2026",
            url,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "State of trucking tech, 2026",
          description:
            "Annual Dispatched Research report on commercial trucking technology: ELD market consolidation, AI dash cam adoption, fleet management platform landscape, telematics insurance integration, and 2026 outlook.",
          url,
          datePublished: today,
          dateModified: today,
        })}
      />

      <main id="main-content">
        <div className="research-container">
          <header className="research-header">
            <p className="research-eyebrow">
              Dispatched Research · Annual report · Updated May 2026
            </p>
            <h1 className="research-h1">
              State of trucking tech, 2026.
            </h1>
            <p className="research-subhead">
              Commercial trucking technology in 2026 is defined by three
              forces: AI-driven dash cam and telematics integration with
              insurance underwriting, consolidation of fleet management
              platforms around Samsara and Motive, and the slow but
              steady expansion of digital broker platforms. This report
              covers what changed, what stayed the same, and what
              carriers should expect through 2026.
            </p>
            <p className="research-meta">
              Published {today} · Dispatched Research · Twelve sources
              referenced inline. Data through April 2026.
            </p>
          </header>

          <nav className="research-toc" aria-label="Table of contents">
            <p className="research-toc-eyebrow">Contents</p>
            <ol>
              <li><a href="#executive-summary">1. Executive summary</a></li>
              <li><a href="#eld-consolidation">2. ELD market consolidation</a></li>
              <li><a href="#ai-dash-cam">3. AI dash cam adoption</a></li>
              <li><a href="#fleet-management">4. Fleet management platform landscape</a></li>
              <li><a href="#telematics-insurance">5. Telematics and insurance integration</a></li>
              <li><a href="#load-board">6. Load board evolution</a></li>
              <li><a href="#dispatch-software">7. Dispatch software for owner-operators</a></li>
              <li><a href="#digital-broker">8. Digital broker platforms</a></li>
              <li><a href="#compliance-automation">9. IFTA and compliance automation</a></li>
              <li><a href="#ai-ml">10. The AI/ML expansion in trucking</a></li>
              <li><a href="#predictions">11. Predictions for 2026–2027</a></li>
              <li><a href="#methodology">12. Methodology and sources</a></li>
            </ol>
          </nav>

          <section className="research-section" id="executive-summary">
            <h2>1. Executive summary</h2>
            <p>
              Commercial trucking technology in 2026 is a story of
              maturation, not invention. The categories that defined
              the 2018–2022 build-out — <Link href="/glossary/eld">ELD</Link>,
              <Link href="/glossary/vehicle-telematics"> telematics</Link>,
              <Link href="/glossary/dash-cam"> dash cam</Link>, fleet
              management platform, load board — are now operating at
              scale, and the competitive landscape is consolidating
              around a small set of winners with technology, capital,
              and distribution. The 2026 environment is less about new
              product categories arriving and more about existing
              categories tightening their integration with the rest of
              the operating stack: underwriting, dispatch, settlements,
              and compliance.
            </p>
            <p>
              Five high-level findings shape the rest of the report.
              <strong> One:</strong> the ELD market is consolidating
              around the major platforms (Samsara, Motive, Geotab,
              Verizon Reveal, Omnitracs, Lytx), with the FMCSA-registered
              list now hovering around 120 devices but the practical
              market share concentrated in the top six or seven names.
              <strong> Two:</strong> AI dash cam adoption among fleets
              with 25+ trucks now bands roughly 40–60% on the panel,
              with insurance-discount math (10–25% premium credit) plus
              nuclear-verdict defense plus CSA-correlated coaching
              effects making the ROI unambiguous for operators above a
              modest fleet-size threshold.
            </p>
            <p>
              <strong>Three:</strong> the fleet management platform
              market has bifurcated. Samsara&apos;s post-IPO scale and
              broader integration breadth has produced a structural
              advantage at the enterprise tier; Motive remains the
              strongest private competitor with deep owner-operator
              and small-fleet penetration; Geotab leads internationally
              and in the open-platform integration story; Verizon
              Reveal anchors the enterprise telematics-and-connectivity
              bundle. Smaller platforms (Switchboard, Truckbase, and a
              long tail of SMB-focused tools) continue to grow inside
              the segment the majors do not serve as well.
              <strong> Four:</strong> usage-based insurance (UBI) for
              commercial trucking has crossed from pilot to baseline:
              telematics-equipped fleets now access 10–25% premium
              discounts on primary liability, and a growing share of
              underwriting models incorporate real-time risk scoring
              during the policy period rather than relying solely on
              renewal-time data.
            </p>
            <p>
              <strong>Five:</strong> the digital-broker thesis (the
              &quot;Amazon for freight&quot; story that drove
              billion-dollar valuations between 2018 and 2022) has not
              played out as promised. Convoy is the headline failure;
              Uber Freight has survived but operates as one player among
              many rather than a market-defining one; Loadsmith,
              Loadsmart, and other digital-native brokers continue to
              grow inside their niches without displacing the
              traditional broker base. The hybrid model — traditional
              brokers (CH Robinson Navisphere, Coyote, Total Quality
              Logistics) layering technology onto an established
              relationship book — is doing better than pure-play
              digital. The 2026 reading is that trucking freight
              matching is a relationship business that benefits from
              technology, not a technology business that incidentally
              touches freight.
            </p>
          </section>

          <section className="research-section" id="eld-consolidation">
            <h2>2. ELD market consolidation</h2>
            <p>
              The <Link href="/glossary/eld">electronic logging device</Link>{" "}
              (ELD) mandate, fully phased in by December 2019 for the
              final cohort of AOBRD grandfathered devices, has been
              operationally mature for several years. The FMCSA
              maintains a public registered-ELD list under 49 CFR Part
              395; the count has hovered around 120 registered devices
              through 2025 and into 2026, but practical market share is
              far more concentrated than the headline number suggests.
              The long tail of small-vendor ELDs continues to exist on
              the list — many built around variations of the same
              reference hardware — but the share of carrier fleets
              running on the top six or seven platforms is dominant and
              growing.
            </p>
            <p>
              The <strong>major hardware ELD platforms</strong> are
              Samsara, Motive (formerly KeepTruckin), Geotab, Verizon
              Reveal, Omnitracs (now part of Solera following the 2021
              acquisition), and Lytx. Each combines a vehicle-installed
              hardware device with a cloud platform that delivers hours
              of service compliance, telematics, GPS tracking, IFTA
              reporting, and increasingly dash cam and AI-driven event
              detection. The platforms are differentiated more by their
              integration breadth (fleet management, dispatch, fuel card,
              maintenance, dash cam) than by the underlying ELD
              compliance function itself, which is commoditized.
            </p>
            <p>
              The <strong>mobile-app ELDs</strong> — Trucker Path
              ELD, Garmin eLog, and a long tail of low-cost
              owner-operator-targeted apps — serve the small end of the
              market. Mobile-app ELDs typically pair an FMCSA-registered
              dongle that plugs into the truck&apos;s diagnostic port
              with a driver smartphone running the logging application.
              The cost is a fraction of a hardware ELD (often
              $20–$50 per month versus $35–$50 per month for the
              hardware tier, with much lower upfront device cost), and
              the integration breadth is correspondingly narrower —
              compliance and basic GPS, but not the dash cam, AI event
              detection, or deep telematics layer of the hardware
              platforms. The panel observation is that mobile-app ELDs
              dominate the single-truck owner-operator segment;
              hardware ELDs dominate fleets with 5+ power units.
            </p>
            <p>
              <strong>Consolidation pressure</strong> on smaller ELD
              vendors continues to build. The structural problem for a
              small ELD vendor is that the ELD function itself is
              commoditized — every registered device meets the same
              federal technical standard — and the economics of the
              business are won on the platform layer above the device.
              A small vendor without dash cam, fleet management,
              dispatch integration, and a serious AI investment cannot
              win the larger-fleet customer; and the single-truck
              owner-operator segment, where small vendors can
              theoretically compete, is being pulled toward mobile-app
              ELDs at materially lower cost. The result is a slow but
              steady attrition of small ELD vendors, with consolidation
              either through acquisition by the majors or through
              outright failure. We expect the registered-ELD count to
              hold roughly stable through 2026 while the practical
              market share continues to concentrate.
            </p>
            <p>
              The most consequential <strong>post-mandate evolution</strong>{" "}
              is the integration of the ELD data stream with everything
              else in the operating stack. Real-time hours of service
              data feeds dispatch decisions and load matching; ELD-driven
              IFTA reporting eliminates manual fuel-tax compilation
              (covered in section 9); telematics data from the same
              device feeds insurance underwriting (section 5); dash cam
              event triggers integrate with the same platform; CSA
              score inputs (inspection results, HOS violations) flow
              into the same management dashboard. The 2026 ELD platform
              is the operating-system layer for the modern fleet, and
              the vendors who own that layer have a durable competitive
              position.
            </p>
          </section>

          <section className="research-section" id="ai-dash-cam">
            <h2>3. AI dash cam adoption</h2>
            <p>
              The <Link href="/glossary/ai-dash-cam">AI dash cam</Link>{" "}
              category — forward-facing or dual-facing dash cameras
              with on-device machine learning models that detect
              following too closely, hard braking, distracted driving,
              and other safety-relevant events — has moved from
              fleet-level optional to a baseline underwriting
              expectation in 2026. The 2026 baseline on the Dispatched
              panel is that <strong>roughly 40–60% of fleets with 25+
              power units</strong> are running AI dash cams; among
              fleets above 100 units the share is closer to 70–80%.
              Single-truck owner-operator adoption lags but is growing
              steadily.
            </p>

            <h3>The ROI math</h3>
            <p>
              The economic case for AI dash cam adoption rests on
              three legs. First, the <strong>insurance premium
              discount</strong>: telematics-equipped and dash-cam-
              equipped fleets access 10–25% premium credits on primary
              liability, with the lower end applied to forward-facing-
              only configurations and the upper end applied to dual-
              facing AI-enabled systems with full telematics
              integration. Against $8K–$18K annual premium for an
              owner-operator policy, the discount is $800–$4,500 per
              year per truck; against $5K–$10K for established small
              fleets, it is $500–$2,500 per truck. The upfront cost of
              installation runs $400–$1,000 per truck plus monthly
              platform fees in the $25–$50 range. Payback inside a
              single renewal cycle is the rule, not the exception.
            </p>
            <p>
              Second, <strong>claim defense</strong>. In a nuclear-
              verdict environment where a single trial loss can absorb
              several years of premium across a line of business,
              recorded video that contradicts plaintiff-side narrative
              reconstruction shifts settlement leverage materially.
              Carriers writing risks with dash cam coverage settle
              fewer cases at the high end of the severity tail because
              the physical reconstruction is grounded in time-stamped
              video. The defensive value is effectively a free option
              on top of the premium discount — paid for once and
              available at every incident. See the{" "}
              <Link href="/research/state-of-trucking-insurance-claims-2026">
                State of Trucking Insurance Claims 2026
              </Link>{" "}
              report for the claims-side detail.
            </p>
            <p>
              Third, <strong>CSA improvement</strong>. AI dash cam
              platforms generate driver-facing event feedback that
              measurably reduces hard-braking, following-too-closely,
              and distracted-driving events over a 90–180 day adoption
              window. The downstream effect on CSA percentiles in the
              Unsafe Driving and HOS Compliance BASICs is real,
              compounds across the 24-month rolling window, and feeds
              back into renewal premium and carrier acceptability. For
              fleets with elevated CSA on the binding BASICs, dash cam
              adoption is one of the highest-ROI operational
              investments available.
            </p>

            <h3>Driver-facing camera pushback</h3>
            <p>
              Cab-facing (driver-facing) camera adoption has lagged
              forward-facing-only adoption, driven by driver objections
              around privacy, surveillance, and the perception of being
              micromanaged. The 2026 industry response has been to
              position cab-facing cameras as defensive (they protect
              the driver as much as the carrier in any incident) and
              to limit the recording window to event-triggered capture
              rather than continuous recording. Cab-facing adoption
              among fleet drivers has grown materially through 2024
              and 2025; independent owner-operator adoption of
              dual-facing configurations continues to lag but is
              growing as the insurance-discount economics tighten.
            </p>

            <h3>Driver scorecards as standard</h3>
            <p>
              <Link href="/glossary/driver-scorecard">Driver scorecard</Link>{" "}
              functionality — a per-driver safety score derived from
              AI dash cam events, telematics data, hours of service
              compliance, and historical incident records — has become
              standard at every major platform on the panel. Scorecards
              feed fleet-level coaching programs, driver retention
              decisions, hiring screens, and increasingly insurance
              underwriting at the per-unit and per-driver level. The
              2026 underwriting model on the panel is moving away from
              the pure operating-entity view (carrier-level CSA and
              loss history) toward a driver-level view where the
              individual driver&apos;s scorecard is a meaningful input
              to the premium calculation.
            </p>

            <h3>Nuclear verdict defense as primary justification</h3>
            <p>
              For larger fleets in 2026, nuclear-verdict defense is now
              the primary stated justification for AI dash cam
              investment — ahead of premium discount, ahead of CSA
              improvement, ahead of operational efficiency. The math is
              straightforward: a single nine-figure verdict against a
              motor carrier can end the company; a $400–$1,000 per-
              truck dash cam installation that improves the defense
              posture on every accident is a small price for a
              meaningful reduction in tail-risk exposure. The major AI
              dash cam vendors — Netradyne, Lytx, Samsara, Motive,
              Nauto — all market the defense-side value proposition
              heavily, and the underwriting community has reciprocated
              by tightening the premium discount math on equipped
              fleets. The trajectory through 2026 is toward universal
              adoption above a modest fleet-size threshold.
            </p>
          </section>

          <section className="research-section" id="fleet-management">
            <h2>4. Fleet management platform landscape</h2>
            <p>
              The <Link href="/glossary/fleet-management-platform">
                fleet management platform
              </Link>{" "}
              category — the integrated software-and-hardware stack
              that combines ELD compliance, telematics, GPS tracking,
              dash cam, driver scorecards, maintenance management, and
              increasingly dispatch and routing — has consolidated
              around a clear top tier in 2026. The right platform for a
              given fleet depends on fleet size, freight mix, and the
              operational sophistication of the back office; there is
              no single &quot;best&quot; choice in this category.
            </p>

            <h3>Samsara (NYSE: IOT)</h3>
            <p>
              Samsara&apos;s 2021 IPO and subsequent post-IPO scale
              have produced a structural advantage at the enterprise
              tier. The platform combines ELD, telematics, dash cam,
              equipment monitoring, asset tracking, and a broad
              integration story across maintenance management, fuel
              card, dispatch, and back-office systems. Samsara&apos;s
              public-company status forces capital-discipline and
              quarterly transparency that drives a fast product roadmap;
              the scale of the customer base produces a data advantage
              that feeds the AI models. The 2026 panel observation is
              that Samsara is the default platform for mid-size and
              enterprise fleets running mixed equipment, and the
              integration breadth keeps the average customer on the
              platform longer than competitors. The trade-off is
              pricing — Samsara is a premium product, and the per-truck
              monthly cost is materially above the budget-tier
              alternatives.
            </p>

            <h3>Motive (formerly KeepTruckin)</h3>
            <p>
              Motive — rebranded from KeepTruckin in 2022 — remains the
              strongest private competitor and the dominant platform
              for owner-operator and small-fleet trucking. The product
              breadth has caught up to Samsara in most categories (ELD,
              telematics, dash cam, AI event detection, driver
              scorecards, fuel card), and the pricing is tighter at the
              small-fleet end of the market. Motive&apos;s private
              status — with substantial funding rounds through 2023 and
              2024 — has allowed it to compete aggressively on price
              and product investment without the quarterly-earnings
              pressure on Samsara. The panel observation is that Motive
              wins disproportionately at the 1–25 power-unit end of the
              market, where the price-sensitivity is higher and the
              integration breadth that Samsara monetizes does not yet
              apply.
            </p>

            <h3>Geotab</h3>
            <p>
              Geotab differentiates on two axes: international footprint
              (the platform has substantial market share in Canada,
              Mexico, Europe, and Australia in addition to the U.S.) and
              open-platform integration. Geotab&apos;s marketplace of
              third-party integrations is the broadest in the category,
              and the platform is the most common choice for fleets
              that need to combine telematics with a heterogeneous mix
              of back-office systems. The trade-off is that the out-of-
              the-box experience is less polished than Samsara or
              Motive for a fleet that does not want to invest in
              integration; the strength is for sophisticated fleets
              with technology resources to build on the platform.
            </p>

            <h3>Verizon Reveal</h3>
            <p>
              Verizon Reveal anchors the enterprise telematics-and-
              connectivity bundle. The product combines fleet
              management with Verizon&apos;s underlying cellular
              connectivity, which produces an integration advantage at
              fleets where data-plan economics matter at scale. The
              2026 panel observation is that Verizon Reveal is a strong
              choice for enterprise fleets with an existing Verizon
              relationship, and a less natural choice for smaller
              fleets.
            </p>

            <h3>Smaller platforms (Switchboard, Truckbase)</h3>
            <p>
              The small-fleet and owner-operator end of the market is
              served by a long tail of platforms that the majors do not
              compete for as aggressively. Switchboard, Truckbase, and
              a handful of similar tools combine ELD or ELD-equivalent
              functionality with dispatch software, load board
              integration, IFTA reporting, settlement management, and
              accounting. The product depth is narrower than the
              majors but the price-to-value at the 1–10 truck end of
              the market is competitive, and the operational fit for an
              owner-operator running their own dispatch is often
              better than a Samsara or Motive deployment. The 2026
              reading is that the SMB tier of the market remains
              fragmented and likely will remain so — the economics for
              a major to chase the single-truck segment do not work.
            </p>

            <h3>The &quot;best one&quot; depends on the fleet</h3>
            <p>
              There is no universal best fleet management platform in
              2026, and operators asking the question framed that way
              are usually framing it wrong. The right approach is to
              start from the operational mix — fleet size, freight
              type, back-office complexity, dispatch model, technology
              budget — and choose the platform that fits. The most
              common mistakes we observe are over-buying (a 5-truck
              owner-operator on Samsara who would have been better
              served by Motive or Switchboard) and under-buying (a
              50-truck mixed-equipment fleet on a basic mobile-app ELD
              with no integration). See our{" "}
              <Link href="/glossary/tms">TMS glossary entry</Link> for
              the transportation management system context that often
              sits alongside the fleet management platform decision.
            </p>
          </section>

          <section className="research-section" id="telematics-insurance">
            <h2>5. Telematics and insurance integration</h2>
            <p>
              The integration of <Link href="/glossary/vehicle-telematics">
                vehicle telematics
              </Link>{" "}
              with commercial trucking insurance underwriting has
              accelerated through 2024–2026 and is now a baseline
              capability at most specialty programs. Usage-based
              insurance (UBI) — pricing the policy as a function of
              observed driving behavior rather than only the static
              risk variables (DOT class, freight type, MVR, CSA, prior
              loss) — has moved from pilot to production at multiple
              carriers writing primary liability on commercial trucks
              in 2026.
            </p>

            <h3>The premium discount band</h3>
            <p>
              The 2026 panel observation is that telematics-equipped
              fleets — meaning fleets with an integrated ELD and
              telematics platform feeding speed, hard-braking,
              following-distance, hours of service, and incident data
              to the underwriter on a continuous basis — access
              <strong> 10–25% premium discounts</strong> on primary
              liability. The lower end of the band applies to fleets
              with basic ELD-only telematics; the upper end applies to
              fleets with full AI dash cam coverage, dual-facing
              cameras, and a documented driver-coaching program built
              on the telematics data. The discount math is consistent
              with the AI dash cam payback covered in section 3 — the
              two product categories overlap heavily, and the
              insurance discount is typically packaged together.
            </p>

            <h3>Real-time risk scoring during the policy period</h3>
            <p>
              The more consequential underwriting shift is the move
              from <strong>renewal-time pricing</strong> (the carrier
              pulls data once a year at renewal and re-prices) to{" "}
              <strong>continuous risk scoring</strong> (the carrier
              pulls data continuously through the policy period and
              re-prices, re-credits, or in extreme cases re-underwrites
              mid-policy). The continuous model is not yet universal,
              but it is moving from the leading edge of specialty
              programs into the mainstream. The implication for fleets
              is that the underwriting relationship is no longer a
              once-a-year event — it is a continuous data exchange,
              and operational discipline through the policy year
              materially affects the next renewal.
            </p>

            <h3>Privacy and data-sharing trade-offs</h3>
            <p>
              The privacy and data-sharing trade-offs in telematics
              insurance integration are real and contested. The
              carrier gains visibility into operational data that the
              fleet historically held privately; the fleet gains the
              premium discount and the underwriting relationship.
              Driver-level data sharing — speed, location, hours,
              event-triggered behavior — carries additional sensitivity
              when individual drivers are identifiable. The 2026
              industry norm is that fleet-level aggregated data flows
              freely under most program structures, while driver-
              identifying data flows under narrower contractual
              protections. The trajectory is toward more data sharing
              over time as the discount math continues to expand and
              the carrier-side underwriting models become more reliant
              on the continuous data stream.
            </p>

            <h3>Insurer-by-insurer differentiation</h3>
            <p>
              Major commercial-auto carriers are adopting the telematics
              underwriting model differently. Progressive&apos;s
              Snapshot for Business Auto extends the consumer telematics
              playbook into the commercial line. Nationwide and Sentry,
              both major specialty trucking writers, have integrated
              UBI into the commercial trucking book. The pace varies
              but the direction is unambiguous: by 2027 the
              telematics-equipped risk will be priced materially better
              than the non-equipped equivalent at every major program.
              See the insurance-side detail in our{" "}
              <Link href="/research/state-of-commercial-trucking-insurance-2026">
                State of Commercial Trucking Insurance 2026
              </Link>{" "}
              report.
            </p>
          </section>

          <section className="research-section" id="load-board">
            <h2>6. Load board evolution</h2>
            <p>
              The <Link href="/glossary/load-board">load board</Link>{" "}
              category — the marketplace where freight brokers post
              available loads and motor carriers find them — has
              consolidated around a clear top tier and continues to
              integrate more deeply with adjacent services (factoring,
              compliance, settlements, route optimization). The 2026
              landscape is dominated by two platforms with substantial
              market share and a long tail of niche tools.
            </p>

            <h3>DAT and Truckstop dominance continues</h3>
            <p>
              DAT and Truckstop remain the two dominant load boards in
              the U.S. spot market. DAT&apos;s rate index (DAT iQ) and
              load-volume data continue to be the most-cited industry
              references for spot-market pricing; the platform&apos;s
              breadth of broker posting and carrier search is the
              largest in the category. Truckstop has differentiated on
              factoring integration (Truckstop Go Capital — covered
              below), broker-credit data, and direct shipper
              relationships. Both platforms have continued to extend
              their feature set through 2024–2026: rate forecasting,
              lane analytics, integration with dispatch software, and
              broker-verification tools have all become standard.
            </p>

            <h3>Smaller boards for smaller operators</h3>
            <p>
              123Loadboard, Trucker Path Pro, and several other smaller
              boards serve the single-truck owner-operator and small-
              fleet segment. The pricing is materially lower than
              DAT or Truckstop (often $30–$50 per month versus
              $50–$150 per month at the majors). The trade-off is
              breadth of available loads — the major boards have more
              brokers posting more loads. The 2026 panel observation
              is that single-truck owner-operators frequently subscribe
              to a smaller board plus one of the majors, using the
              smaller board for everyday searching and the major board
              for new-lane prospecting.
            </p>

            <h3>Factoring integration: Truckstop Go Capital</h3>
            <p>
              Truckstop&apos;s Go Capital factoring product is the most
              visible integration of factoring and load board in the
              2026 market. The operator can identify a load on
              Truckstop, verify broker credit, accept the load, and
              factor the resulting invoice through a unified workflow.
              The underlying factoring economics are competitive with
              the standalone trucking factors, but the integration
              reduces friction on the dispatch-to-payment cycle. The
              broader pattern — load boards and factoring platforms
              merging functionality — is one of the cleaner examples of
              technology consolidation in the 2026 market. See our{" "}
              <Link href="/research/best-trucking-factoring-2026">
                Best trucking factoring companies 2026
              </Link>{" "}
              report for the factoring-side breakdown.
            </p>

            <h3>Direct shipper platforms</h3>
            <p>
              The direct-shipper platform category — Uber Freight,
              Loadsmith, the Convoy alumni network that scattered into
              new ventures after the 2023 shutdown — has continued to
              grow inside the segment where direct relationships with
              shippers replace the traditional broker. The economic
              proposition is that the carrier captures the spread that
              would have gone to a broker; the trade-off is that the
              available volume is narrower (only the shippers on the
              platform) and the relationship management is different.
              Uber Freight is the largest direct-shipper platform that
              has survived, and is covered in detail in section 8 on
              digital broker platforms.
            </p>

            <h3>AI matching and lane optimization</h3>
            <p>
              AI-driven load matching and lane optimization has moved
              from marketing language to genuine product capability at
              the major load boards. The use case is straightforward:
              given the operator&apos;s current location, equipment,
              hours of service remaining, and preferred lanes, the
              platform recommends loads that maximize revenue per mile
              while respecting the operational constraints. The
              models work better in dense freight markets with many
              available loads and less well in thin markets, but the
              direction of improvement is steady and the value to
              owner-operators running their own dispatch is real. The
              2026 reading is that AI matching is a genuine
              productivity tool, distinct from the AI marketing layer
              that pervades the rest of the industry.
            </p>
          </section>

          <section className="research-section" id="dispatch-software">
            <h2>7. Dispatch software for owner-operators</h2>
            <p>
              The <Link href="/glossary/dispatch-software">dispatch
              software</Link>{" "}
              category — the application stack that an owner-operator
              or small fleet uses to manage loads, routes, settlements,
              and the operational lifecycle of a dispatched load — has
              matured into a real product category in 2026. The
              alternatives a decade ago were a spreadsheet, a generic
              CRM, or the load board&apos;s own minimal tooling; in
              2026 there are several dedicated dispatch platforms
              competing for the owner-operator and small-fleet
              business.
            </p>

            <h3>The platform landscape</h3>
            <p>
              <strong>Truckbase</strong> is one of the leading dispatch
              platforms for small fleets in 2026, with deep load board
              integration, automated settlement processing, IFTA
              reporting, and broker-credit data baked into the
              workflow. <strong>Switchboard</strong> overlaps with the
              fleet management platforms covered above but emphasizes
              the dispatch workflow specifically; it is competitive at
              the 1–10 truck end of the market. <strong>Truck
              Loads</strong> and a long tail of smaller platforms
              compete on price and on niche features (specific freight
              types, owner-operator-only workflows). The major fleet
              management platforms (Samsara, Motive) also offer dispatch
              functionality as part of their broader bundles, but the
              dedicated dispatch platforms are typically more workflow-
              focused and price-competitive for the small operator.
            </p>

            <h3>Mobile-first vs desktop dispatch</h3>
            <p>
              The mobile-first vs desktop dispatch question is
              practical for owner-operators who run their own dispatch
              from the cab. The strongest 2026 dispatch platforms
              support both — desktop for the back-office work
              (settlements, IFTA, accounting) and mobile for the
              on-the-road work (load acceptance, route updates, broker
              communication, document capture). The single-truck owner-
              operator typically does 70–80% of dispatch work on
              mobile; the small-fleet operator with a dedicated
              dispatcher does more on desktop. The platforms that fail
              are typically the ones that did one well and the other
              poorly.
            </p>

            <h3>Load board and AI route optimization integration</h3>
            <p>
              The integration of dispatch software with the load board
              layer (DAT, Truckstop) and with AI route optimization is
              the differentiating feature of the 2026 dispatch
              platform. The operator searches loads on the load board
              inside the dispatch app, accepts the load into a
              workflow that pre-populates routing and rate-
              confirmation data, generates the route with AI
              optimization that respects HOS remaining and preferred
              lanes, and tracks the execution against the original
              plan. The friction reduction compared to running these
              functions in separate applications is material, and the
              best-in-class platforms in 2026 deliver the integrated
              experience credibly. For the owner-operator considering
              dispatch software in 2026, the integration breadth
              should be a primary criterion.
            </p>
          </section>

          <section className="research-section" id="digital-broker">
            <h2>8. Digital broker platforms</h2>
            <p>
              The digital-broker thesis — the idea that freight matching
              between shippers and motor carriers would consolidate
              onto a software platform the way ride-sharing consolidated
              passenger transport — drove billion-dollar venture
              investment between 2018 and 2022. The 2026 reading on
              that thesis is mixed: the survivors are operating at
              scale and have changed how some segments of the freight
              market function, but they have not displaced the
              traditional broker base and the most ambitious
              projections from the 2020–2021 period did not play out.
            </p>

            <h3>Uber Freight survives, Convoy did not</h3>
            <p>
              <strong>Uber Freight</strong> launched in 2017, acquired
              Transplace in 2021 (transforming from a pure-play
              digital broker into a hybrid model with an established
              brokerage book), and has continued to operate as one
              significant player among many in the U.S. freight market.
              The platform&apos;s technology — automated load posting,
              instant booking, transparent pricing — has set
              expectations in the market that competitors have had to
              match. The Transplace acquisition was, in retrospect, the
              critical strategic move: it gave Uber Freight a
              traditional brokerage business to absorb the operational
              demands of the customer base while the pure-digital
              workflow handled the lighter end of the freight mix.
            </p>
            <p>
              <strong>Convoy</strong>, by contrast, shut down in October
              2023 after raising more than $1B in venture funding. The
              postmortem in the trucking press identified several
              causes: a freight-market recession that compressed margins
              across the brokerage industry at exactly the wrong moment
              for a high-burn-rate venture-funded operator;
              over-investment in technology relative to the
              relationship-management and customer-service work that
              still drove most freight; and a customer base that
              proved more willing to switch back to traditional brokers
              than the digital-disruption thesis predicted. Convoy&apos;s
              technology assets were partially acquired by Flexport;
              several Convoy alumni went on to start follow-on
              ventures.
            </p>
            <p>
              <strong>Loadsmith, Loadsmart, and others</strong> have
              continued to operate inside more specialized niches —
              specific freight types, specific shipper relationships,
              specific technology approaches — without attempting the
              full digital-broker market displacement that drove
              Convoy. The pattern works better when the platform is
              honest about its position as one channel among many
              rather than the platform that will replace the
              traditional broker.
            </p>

            <h3>Why pure digital brokers have not displaced traditional ones</h3>
            <p>
              Three structural reasons emerge from the 2018–2026
              experience. First, freight brokerage is a{" "}
              <strong>relationship business</strong> more than a
              technology business — the shipper relationship is built
              over years, depends on the broker absorbing operational
              variance (rejected loads, late deliveries, claims), and
              does not transfer to a software platform cleanly. Second,
              the <strong>carrier base is fragmented</strong> —
              hundreds of thousands of motor carriers, most with fewer
              than ten trucks, each with their own operational
              preferences and lane priorities — and matching at scale
              requires more relationship management than the pure-
              digital model accounts for. Third, the <strong>spread
              economics</strong> of brokerage are tighter than the
              consumer-marketplace analogies suggested: a broker on a
              12% gross margin does not have the cash to absorb the
              CAC, technology investment, and operational losses that
              a venture-funded model requires.
            </p>

            <h3>The hybrid model is winning</h3>
            <p>
              The 2026 reading is that the hybrid model — traditional
              brokers layering technology onto an established
              relationship book — is winning the long game over the
              pure-play digital. <strong>C.H. Robinson</strong>&apos;s
              Navisphere platform, <strong>Coyote Logistics</strong>{" "}
              (which UPS acquired in 2015 and sold to RXO in 2024),
              <strong> Total Quality Logistics</strong>, and the other
              major traditional brokers have all invested heavily in
              technology while maintaining the relationship base. The
              digital-native players that survived have generally
              hybridized (Uber Freight via Transplace). The 2026
              competitive landscape is one where every broker has
              technology, no broker has a unique technology advantage,
              and the differentiation is back on relationships, freight
              mix, and operational execution.
            </p>
          </section>

          <section className="research-section" id="compliance-automation">
            <h2>9. IFTA and compliance automation</h2>
            <p>
              The category of compliance automation — software-driven
              IFTA reporting, IRP filing, Drug & Alcohol Clearinghouse
              integration, BOC-3 process agent management, and the rest
              of the regulatory layer that owner-operators and small
              fleets must navigate — has matured substantially through
              2024–2026. The pattern is consistent: tasks that
              previously required manual data compilation, paper
              filing, and significant administrative time have been
              automated through integration with the ELD and telematics
              data already collected on the truck.
            </p>

            <h3>ELD-driven IFTA reporting</h3>
            <p>
              International Fuel Tax Agreement (IFTA) quarterly
              reporting requires motor carriers operating across state
              lines to calculate fuel tax owed to each jurisdiction
              based on miles traveled and fuel purchased in each state.
              Historically this was a manual exercise — drivers kept
              paper logs, maintained fuel receipts, and the back
              office compiled the quarterly return. In 2026, ELD-driven
              IFTA reporting is standard at every major fleet
              management platform and at most dispatch software
              platforms targeting owner-operators. The platform pulls
              GPS data from the ELD, calculates miles per jurisdiction
              automatically, and combines with fuel-card data to
              produce a draft return ready for submission. The time
              savings versus manual compilation are substantial — the
              quarterly back-office time spent on IFTA reporting has
              dropped from days to hours for most operators on the
              panel.
            </p>

            <h3>Software-driven IRP automation</h3>
            <p>
              The International Registration Plan (IRP) — apportioned
              registration for motor carriers operating across multiple
              states — has historically been a paper-driven annual
              process. Software automation of IRP filing has lagged
              IFTA automation because the IRP process involves
              state-level filing through DMV systems that each have
              their own requirements, but dedicated trucking compliance
              platforms now offer IRP automation at price points that
              make sense for single-truck owner-operators. The most
              consequential remaining friction is state-level DMV
              inconsistency rather than software capability.
            </p>

            <h3>Drug & Alcohol Clearinghouse integration</h3>
            <p>
              The FMCSA Drug & Alcohol Clearinghouse — fully phased in
              by 2023 — requires motor carriers to query the
              clearinghouse pre-employment and annually for each CDL
              driver. The query process is online but is administratively
              burdensome for fleets with multiple drivers. Compliance
              automation platforms now integrate with the clearinghouse
              API to manage queries, consents, and the annual cycle in
              a way that reduces administrative time materially. The
              clearinghouse monthly summary reports continue to show
              hundreds of thousands of CDL holders in prohibited status,
              with the return-to-duty throughput producing slow but
              steady recovery — the operational implication for fleets
              is that clearinghouse hygiene is now a routine
              underwriting expectation at most specialty insurance
              programs.
            </p>
          </section>

          <section className="research-section" id="ai-ml">
            <h2>10. The AI/ML expansion in trucking</h2>
            <p>
              Every technology vendor in trucking in 2026 markets
              themselves on AI. The category includes genuine products
              with real machine learning value, and a substantial
              amount of marketing language layered over rule-based
              software that would have shipped without the AI label
              five years ago. The honest 2026 reading is that AI is
              real in some categories and largely marketing in others;
              this section sorts the two.
            </p>

            <h3>AI dash cam: real and material</h3>
            <p>
              The AI dash cam category covered in section 3 is the
              clearest case of genuine machine learning value in
              trucking. Netradyne, Lytx, Samsara, Motive, and Nauto
              all run on-device computer vision models that detect
              following too closely, hard braking, distracted driving,
              and other safety-relevant events with materially better
              precision than the rule-based event detection of the
              previous generation. The defensive evidence value at
              trial, the coaching effects on driver behavior, and the
              insurance discount math are all measurable. The category
              is one of the strongest AI use cases in the broader
              transportation industry.
            </p>

            <h3>AI dispatch matching: real but uneven</h3>
            <p>
              AI-driven load matching at the load boards (covered in
              section 6) is real where the underlying data is dense.
              On well-trafficked lanes with many available loads, the
              matching algorithms find genuinely better load options
              for an operator than a manual search would. On thin lanes
              or in slow markets the value falls off, sometimes
              dramatically. The category is genuine but uneven; the
              best-case value is real productivity gain and the worst
              case is dressed-up keyword matching.
            </p>

            <h3>AI route optimization: real in fleet, marketing in single-truck</h3>
            <p>
              Route optimization is one of the oldest applications of
              computational logistics — the underlying methods pre-
              date the modern AI wave by decades. The 2026 ML overlay
              adds real value in multi-stop fleet routing where the
              data is dense and the constraints are complex; in
              single-truck dispatch the value over a good map
              application is modest. The category is genuine in fleet,
              more marketing in single-truck.
            </p>

            <h3>AI predictive maintenance: emerging</h3>
            <p>
              Predictive maintenance — using telematics and equipment-
              sensor data to predict component failure before it
              occurs — is the most-promising emerging AI category in
              trucking. The major fleet management platforms now offer
              maintenance prediction features that flag likely
              brake-pad wear, engine fault patterns, and other
              component-level issues based on observed operational
              data. The 2026 reading is that the predictive accuracy
              is good enough to be worth acting on for high-value
              components and operationally meaningful failures, and
              the category is on the trajectory toward broader value
              over the next 24–36 months. The current limits are data
              density (some component categories do not generate
              enough sensor signal) and the gap between prediction and
              actionable maintenance recommendation (knowing a
              component is likely to fail is less useful than knowing
              what to do about it). Both gaps are closing.
            </p>

            <h3>Where AI is marketing, not product</h3>
            <p>
              A meaningful share of the AI marketing in trucking in
              2026 attaches to products that are essentially rule-based
              software with a model layer that does not add measurable
              value. Operators evaluating AI-labeled products should
              ask what specifically the model is predicting, what the
              alternative would be, and what the measurable improvement
              looks like. Honest vendors can answer cleanly;
              marketing-driven vendors typically cannot.
            </p>
          </section>

          <section className="research-section" id="predictions">
            <h2>11. Predictions for 2026–2027</h2>
            <p>
              Five specific, falsifiable predictions for the next 18
              months. The bar is that each prediction is time-bound,
              measurable, and can be wrong; the editorial probability
              we attach reflects our actual confidence in the call.
            </p>
            <ol className="research-list">
              <li>
                <strong>
                  AI dash cam adoption above 25-power-unit fleets
                  exceeds 75% by end of 2027.
                </strong>{" "}
                The premium-discount math, the nuclear-verdict defense
                math, and the CSA-coaching math all point in the same
                direction. We expect adoption to reach 75%+ at fleets
                above 25 units by year-end 2027, with adoption above
                100 units approaching universal. Probability: high
                (greater than 70%).
              </li>
              <li>
                <strong>
                  Telematics-based real-time risk scoring becomes
                  standard at every major commercial-trucking specialty
                  carrier by end of 2027.
                </strong>{" "}
                The 10–25% discount band holds; the underwriting
                practice of continuous data ingestion through the
                policy period expands from the leading-edge programs
                into the mainstream. Probability: high (greater than
                65%).
              </li>
              <li>
                <strong>
                  Samsara and Motive together account for more than
                  50% of fleet management platform market share at
                  the 25+ power-unit tier by end of 2027.
                </strong>{" "}
                The structural advantages of platform breadth,
                integration depth, and AI investment continue to favor
                the top two. The smaller competitors will hold their
                niches but lose share at the consolidating middle.
                Probability: moderate-to-high (55–65%).
              </li>
              <li>
                <strong>
                  No new pure-play digital broker reaches $1B in annual
                  freight volume by end of 2027.
                </strong>{" "}
                The Convoy postmortem and the structural reasons in
                section 8 suggest the digital-broker thesis has
                played out. New entrants will be hybrid (technology
                + relationship) or niche (specific freight types).
                Probability: high (greater than 70%).
              </li>
              <li>
                <strong>
                  AI predictive maintenance becomes a standard feature
                  at every major fleet management platform by end of
                  2027.
                </strong>{" "}
                Samsara, Motive, Geotab, and Verizon Reveal will all
                ship credible predictive-maintenance products in the
                horizon. The competitive dynamic forces feature parity
                even where the underlying model quality varies.
                Probability: high (greater than 65%).
              </li>
            </ol>
            <p>
              One prediction we are watching but not yet betting on:
              autonomous truck deployment at scale. The leading
              autonomous-trucking efforts (Aurora, Kodiak, Plus) have
              been operationally piloting through 2024–2026; the
              regulatory framework for driver-out operations is
              advancing unevenly state by state, and the unit economics
              of commercial autonomous trucking remain unproven at
              fleet scale. The base case for 2027 is that autonomous
              trucks remain a limited-corridor product rather than a
              broad market category; the upside case where one or more
              autonomous-trucking efforts demonstrates clear unit
              economics in 2026–2027 would reshape the rest of the
              technology stack on a multi-year timeline.
            </p>
          </section>

          <section className="research-section" id="methodology">
            <h2>12. Methodology and sources</h2>
            <p>
              This report draws on four categories of source. First,
              public regulatory and registration data — the FMCSA
              registered ELD list under 49 CFR Part 395, the FMCSA
              Drug & Alcohol Clearinghouse monthly summaries, and the
              IFTA articles of agreement for the compliance-side
              context. Second, public filings and product disclosures
              from the major technology vendors — Samsara&apos;s
              investor relations materials and SEC filings (NYSE: IOT),
              Motive&apos;s public product disclosures, Geotab&apos;s
              technical documentation, and equivalent materials from
              the AI dash cam vendors (Netradyne, Lytx, Nauto). Third,
              industry-association published research — ATRI&apos;s
              Critical Issues in the Trucking Industry annual surveys
              for the carrier-priorities context, and the trucking
              trade press for product launches, M&amp;A events, and
              competitive positioning. Fourth, Dispatched&apos;s own
              panel observation — we maintain working relationships
              with a panel of trucking technology vendors, fleet
              operators, and insurance carriers and reference panel
              adoption and integration observations alongside the
              public sources throughout this report.
            </p>
            <p>
              Time horizon: data through April 2026. Where the report
              cites adoption percentages, discount bands, or
              market-share estimates, those are snapshot observations
              on the Dispatched panel and public comparables as of the
              report&apos;s publication date and should be expected to
              drift modestly through the remainder of the year. Where
              the report makes a forward-looking prediction, we have
              attempted to make the prediction specific, time-bound,
              and falsifiable — and to attach an explicit probability
              where the underlying signal supports one.
            </p>
            <p>
              Disclosures: Dispatched is a matching platform for
              commercial trucking financing and trucking insurance.
              Dispatched maintains commercial relationships with a
              panel of trucking lenders, factors, and insurance
              producers referenced throughout the broader research
              series; for the technology vendors named in this report
              specifically, Dispatched does not maintain commercial
              relationships beyond the general industry context and
              treats the technology landscape as editorial subject
              matter. Those relationships and editorial separations are
              documented in our{" "}
              <Link href="/methodology">methodology</Link> page. This
              report references panel observations alongside public
              sources rather than substituting one for the other;
              readers should refer to the public sources for primary
              data. The report does not contain proprietary, paid, or
              vendor-licensed data feeds.
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
              If you are an owner-operator or small fleet evaluating
              technology investments in 2026, the report above maps to
              a small set of practical glossary entries and product
              pages on the Dispatched platform.
            </p>
            <div className="research-cta-grid">
              <Link
                href="/glossary/ai-dash-cam"
                className="research-cta-card"
              >
                <h3>AI dash cam economics</h3>
                <p>
                  $400–$1,000 per truck installed for a 10–25% premium
                  discount on $8K–$18K policies, plus defensive
                  evidence value at trial. The clearest-ROI technology
                  investment for most operators in 2026.
                </p>
              </Link>
              <Link
                href="/glossary/fleet-management-platform"
                className="research-cta-card"
              >
                <h3>Fleet management platform</h3>
                <p>
                  Samsara, Motive, Geotab, Verizon Reveal at the top
                  tier; Switchboard and Truckbase at the SMB tier. The
                  right platform depends on fleet size and operational
                  mix.
                </p>
              </Link>
              <Link
                href="/glossary/eld"
                className="research-cta-card"
              >
                <h3>ELD overview</h3>
                <p>
                  The compliance baseline. Hardware ELDs dominate
                  fleets with 5+ trucks; mobile-app ELDs serve the
                  single-truck owner-operator segment at materially
                  lower cost.
                </p>
              </Link>
              <Link
                href="/glossary/load-board"
                className="research-cta-card"
              >
                <h3>Load board landscape</h3>
                <p>
                  DAT and Truckstop at the top; 123Loadboard and
                  Trucker Path Pro for smaller operators. Factoring
                  integration and AI matching are the 2026
                  differentiators.
                </p>
              </Link>
              <Link
                href="/glossary/dispatch-software"
                className="research-cta-card"
              >
                <h3>Dispatch software</h3>
                <p>
                  Truckbase, Switchboard, Truck Loads for the
                  owner-operator workflow. Mobile-first dispatch with
                  load board, settlement, and IFTA integration is the
                  2026 baseline.
                </p>
              </Link>
              <Link
                href="/glossary/driver-scorecard"
                className="research-cta-card"
              >
                <h3>Driver scorecard</h3>
                <p>
                  Per-driver safety score from AI dash cam events,
                  telematics, and incident history. Now a standard
                  underwriting input at most specialty programs.
                </p>
              </Link>
            </div>
            <p style={{ marginTop: "1.5rem" }}>
              See also: the{" "}
              <Link href="/research">Dispatched Research index</Link>,
              the{" "}
              <Link href="/research/state-of-trucking-insurance-claims-2026">
                State of Trucking Insurance Claims 2026
              </Link>{" "}
              report for the claims-side detail on AI dash cam ROI and
              telematics underwriting, the{" "}
              <Link href="/research/state-of-trucking-capital-2026">
                State of Trucking Capital 2026
              </Link>{" "}
              report, and the{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>{" "}
              report.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
