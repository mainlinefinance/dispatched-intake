import type { Metadata } from "next";
import Link from "next/link";
import ResearchByline from "@/components/landing/ResearchByline";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "State of Broker Relations 2026 — Dispatched Research",
  description:
    "Annual report on carrier-broker dynamics: spread transparency, payment-time trends, broker concentration risk, FMCSA transparency rule, and 2026 outlook.",
  alternates: {
    canonical: "/research/state-of-broker-relations-2026",
  },
  openGraph: {
    title: "State of Broker Relations 2026 — Dispatched Research",
    description:
      "Annual report on carrier-broker dynamics: spread transparency, payment-time trends, broker concentration risk, FMCSA transparency rule, and 2026 outlook.",
    url: "/research/state-of-broker-relations-2026",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "State of Broker Relations 2026 — Dispatched Research",
    description:
      "Annual report on carrier-broker dynamics: spread transparency, payment-time trends, broker concentration risk, FMCSA transparency rule, and 2026 outlook.",
  },
};

const SOURCES: ReadonlyArray<{ label: string; url: string }> = [
  {
    label:
      "FMCSA — Federal Register rulemaking dockets (broker transparency NPRM, 49 CFR Part 371)",
    url: "https://www.federalregister.gov/agencies/federal-motor-carrier-safety-administration",
  },
  {
    label:
      "FMCSA SAFER — Motor Carrier and Broker Registration Data",
    url: "https://safer.fmcsa.dot.gov/",
  },
  {
    label:
      "Owner-Operator Independent Drivers Association (OOIDA) — broker transparency comment record and position papers",
    url: "https://www.ooida.com/",
  },
  {
    label:
      "Transportation Intermediaries Association (TIA) — broker transparency comments and broker market commentary",
    url: "https://www.tianet.org/",
  },
  {
    label:
      "C.H. Robinson Worldwide, Inc. (NASDAQ: CHRW) — public filings and investor relations",
    url: "https://investor.chrobinson.com/",
  },
  {
    label:
      "RXO, Inc. (NYSE: RXO) — public filings (post-Coyote acquisition disclosures)",
    url: "https://investors.rxo.com/",
  },
  {
    label:
      "J.B. Hunt Transport Services (NASDAQ: JBHT) — Integrated Capacity Solutions segment disclosures",
    url: "https://investor.jbhunt.com/",
  },
  {
    label:
      "Knight-Swift Transportation Holdings (NYSE: KNX) — Logistics segment disclosures",
    url: "https://investor.knight-swift.com/",
  },
  {
    label:
      "Triumph Financial, Inc. (NASDAQ: TFIN) — TriumphPay broker payment network and audited factoring credit data",
    url: "https://www.triumph.com/investors",
  },
  {
    label:
      "DAT Freight & Analytics — load board, rate index, and broker credit reporting documentation",
    url: "https://www.dat.com/",
  },
  {
    label:
      "Truckstop — load board, broker credit data, and Go Capital factoring integration disclosures",
    url: "https://truckstop.com/",
  },
  {
    label:
      "Uber Freight — public product disclosures and Transplace acquisition materials",
    url: "https://www.uberfreight.com/",
  },
  {
    label:
      "Convoy shutdown coverage (October 2023) and Flexport asset acquisition disclosures",
    url: "https://flexport.com/blog/",
  },
  {
    label:
      "American Transportation Research Institute (ATRI) — Critical Issues in the Trucking Industry, annual surveys",
    url: "https://truckingresearch.org/",
  },
];

export default function StateOfBrokerRelations2026() {
  const today = new Date().toISOString().slice(0, 10);
  const url =
    "https://dispatched.finance/research/state-of-broker-relations-2026";
  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Research", url: "https://dispatched.finance/research" },
          {
            name: "State of Broker Relations 2026",
            url,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "State of broker relations, 2026",
          description:
            "Annual Dispatched Research report on carrier-broker dynamics: 2026 broker landscape, spread economics, payment-time trends, broker concentration risk, FMCSA broker transparency rule status, and 2026–2027 outlook.",
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
              State of broker relations, 2026.
            </h1>
            <p className="research-subhead">
              The carrier-broker relationship is one of the most
              consequential business relationships in trucking — and
              one of the most opaque. This report covers 2026 broker
              spread dynamics, payment-time trends, broker
              concentration risk, the FMCSA broker transparency rule
              status, and what owner-operators should expect through
              2026–2027.
            </p>
            <ResearchByline
              publishedDate={today}
              sourceCount={14}
              methodologyNote="Data through April 2026."
            />
          </header>

          <section className="research-section" id="q2-2026-update">
            <h2>Q2 2026 update</h2>
            <p>
              The FMCSA broker transparency rule remains unresolved
              through Q1 2026. Days-to-pay trends across major brokers
              steady — TQL median 28 days, CH Robinson median 31 days
              per Dispatched panel observations. Convoy alumni continued
              spinning off niche platforms. No major broker
              consolidation in Q1.
            </p>
          </section>

          <nav className="research-toc" aria-label="Table of contents">
            <p className="research-toc-eyebrow">Contents</p>
            <ol>
              <li><a href="#executive-summary">1. Executive summary</a></li>
              <li><a href="#broker-landscape">2. The 2026 broker landscape</a></li>
              <li><a href="#spread-economics">3. Broker spread economics</a></li>
              <li><a href="#payment-time">4. Carrier payment-time trends</a></li>
              <li><a href="#transparency-rule">5. The FMCSA broker transparency rule</a></li>
              <li><a href="#concentration-risk">6. Broker concentration risk</a></li>
              <li><a href="#direct-vs-broker">7. Direct shipper vs broker relationships</a></li>
              <li><a href="#quality-signals">8. Broker quality signals</a></li>
              <li><a href="#digital-platforms">9. Digital broker platforms in 2026</a></li>
              <li><a href="#carrier-strategies">10. Carrier strategies for broker management</a></li>
              <li><a href="#predictions">11. Predictions for 2026–2027</a></li>
              <li><a href="#methodology">12. Methodology and sources</a></li>
            </ol>
          </nav>

          <section className="research-section" id="executive-summary">
            <h2>1. Executive summary</h2>
            <p>
              The carrier-broker relationship sits at the center of
              the U.S. freight economy. Brokers move roughly a
              quarter of all over-the-road tonnage and a larger
              share of the spot market that small fleets depend on.
              Every dollar of broker economics is a dollar of
              carrier economics: the spread, the days-to-pay, the
              accessorial acceptance, and the broker&apos;s credit
              all flow directly into the small-carrier P&amp;L. The
              relationship is also one of the most opaque in
              trucking — carriers typically do not see the rate the
              shipper paid, and that information asymmetry remains
              the defining feature of the relationship.
            </p>
            <p>
              Five high-level findings shape the rest of the report.
              <strong> One:</strong> the broker market is
              consolidating around a top tier — C.H. Robinson, Total
              Quality Logistics, RXO (the public spin-out of XPO that
              now holds the Coyote book after the 2024 acquisition
              from UPS), Echo Global Logistics, J.B. Hunt&apos;s
              Integrated Capacity Solutions, Worldwide Express, and
              Knight-Swift&apos;s logistics segment — with the
              long-tail mid-market continuing to fragment. The top
              ten brokers account for a steadily growing share of
              brokered volume, but the long tail of regional and
              specialty brokers remains structurally important to
              small carriers.
              <strong> Two:</strong> typical{" "}
              <Link href="/glossary/broker-spread">broker spreads</Link>{" "}
              run 8–15% in normal capacity environments and stretch
              to 20–25% on tight-capacity lanes, urgent shipments,
              and specialty freight. The 2024–2025 freight recession
              compressed broker margins materially; the 2026
              normalization is partial.
            </p>
            <p>
              <strong>Three:</strong> payment terms have stretched.
              Net 30 remains the contractual standard for most major
              brokers, but Net 45–60 has become common at smaller
              brokers and many shipper-direct contracts. The slow-pay
              tail — brokers averaging 60+ days to pay — produces
              real cash-flow stress for small carriers and is the
              primary economic justification for factoring. Triumph
              Financial&apos;s TriumphPay network, which now
              processes a sizable share of broker-to-carrier
              payments, has produced unusually clean industry data on
              days-to-pay that previously did not exist at scale.
              <strong> Four:</strong> the FMCSA broker transparency
              rulemaking under{" "}
              <Link href="/glossary/fmcsa">49 CFR Part 371</Link>{" "}
              remains the single most consequential open federal
              regulatory question affecting the carrier-broker
              relationship. OOIDA has pushed; TIA has opposed; the
              rule has not finalized as of April 2026 but our base
              case is finalization in some form within the report
              horizon.
            </p>
            <p>
              <strong>Five:</strong> the digital-broker thesis has
              hybridized rather than displaced the traditional
              broker. Convoy shut down in October 2023; Uber Freight
              survives as a hybrid model after the Transplace
              acquisition; Loadsmith, Loadsmart, and a long tail of
              digital-native brokers continue to operate inside
              specific niches. The 2026 reading is that brokerage is
              a relationship business that benefits from technology,
              not a technology business that incidentally touches
              freight. Owner-operators evaluating broker
              relationships in 2026 should plan around the
              traditional broker base as the durable counterparty,
              with digital tools as productivity enhancements rather
              than replacement infrastructure.
            </p>
            <p>
              The single most actionable read for owner-operators:
              broker diversification is not optional. A carrier with
              40%+ of monthly revenue concentrated on a single broker
              carries an existential risk if that broker slow-pays,
              defaults, or terminates. The carriers operating most
              durably in 2026 maintain six to twelve active broker
              relationships, evaluate broker credit before booking,
              and use{" "}
              <Link href="/glossary/non-recourse-factoring">
                non-recourse factoring
              </Link>{" "}
              selectively to transfer broker default risk to the
              factor on lanes where the credit picture is uncertain.
            </p>
          </section>

          <section className="research-section" id="broker-landscape">
            <h2>2. The 2026 broker landscape</h2>
            <p>
              The U.S. freight brokerage market in 2026 is large,
              fragmented at the bottom, and consolidating at the top.
              The FMCSA SAFER database lists tens of thousands of
              active brokers; the practical market share is
              concentrated in a top tier of roughly twenty brokers
              that together handle the majority of brokered freight
              volume. Below that top tier, the market fragments into
              thousands of regional, specialty, and small-shop
              brokers that collectively handle a smaller share of
              volume but remain operationally important — and
              relationally important — to the carrier base.
            </p>

            <h3>The top tier</h3>
            <p>
              <strong>C.H. Robinson Worldwide</strong> (NASDAQ:
              CHRW) is the largest freight broker in North America
              by net revenue and gross transportation volume. The
              company&apos;s Navisphere platform is the most
              developed broker technology stack in the industry,
              and the shipper-book breadth produces the largest
              broker-to-carrier matching scale in the market. CHRW
              is also the most-watched public proxy for the
              brokerage industry; quarterly earnings drive
              broader broker-industry narratives.
            </p>
            <p>
              <strong>Total Quality Logistics</strong> (TQL) is
              the largest privately held freight broker in the
              U.S. and the most aggressive on the sales side. The
              TQL model emphasizes a large in-house broker
              workforce with direct shipper-and-carrier
              relationship management; the company has grown
              rapidly into one of the highest-volume brokers in
              the truckload spot market. Carrier experience with
              TQL is variable — the firm is large enough that the
              broker-by-broker experience matters more than the
              firm-wide profile.
            </p>
            <p>
              <strong>RXO</strong> (NYSE: RXO) is the brokerage
              spin-out from XPO Logistics, and following the 2024
              acquisition of Coyote Logistics from UPS, RXO now
              holds one of the largest combined brokerage books in
              the market. The combined firm operates under a hybrid
              of the legacy Coyote relationships and the post-spin
              RXO technology stack; the integration is the dominant
              2026 narrative on the RXO side. <strong>Echo Global
              Logistics</strong>, private since the 2021 take-private
              transaction by Jordan Co., continues to operate as one
              of the larger mid-tier brokers with a heavy
              truckload-and-LTL mix.
            </p>
            <p>
              <strong>J.B. Hunt Integrated Capacity Solutions</strong>{" "}
              (NASDAQ: JBHT) is one of the largest asset-light
              brokerages housed inside an asset-based motor carrier
              — a configuration that gives J.B. Hunt unusual
              visibility into both the broker spread and the
              carrier cost picture, and a competitive advantage on
              lanes where ICS can fall back on J.B. Hunt&apos;s
              own assets. <strong>Knight-Swift Logistics</strong>{" "}
              (NYSE: KNX) operates a similar structure at smaller
              scale and has expanded through targeted acquisitions
              in 2023–2025.
            </p>
            <p>
              <strong>Worldwide Express</strong> — combined with
              GlobalTranz following the 2021 merger — operates one
              of the largest brokerage networks targeting the
              small-and-mid-market shipper segment, with a heavy LTL
              mix and a national franchise-style sales footprint.
              Outside the named top tier, a long tail of regional
              and specialty brokers — temperature-controlled
              specialists, flatbed and heavy-haul, project cargo,
              automotive, and dedicated dryvan operators —
              collectively handle a substantial share of brokered
              volume and remain the relational base for many small
              fleets.
            </p>

            <h3>Market dynamics</h3>
            <p>
              Two structural forces are reshaping the broker
              landscape in 2026. First,{" "}
              <strong>consolidation</strong> continues at the top
              end of the market. The 2024 RXO acquisition of Coyote
              was the most consequential broker M&amp;A transaction
              in years; J.B. Hunt and Knight-Swift have continued
              to bolt on regional brokerages; private-equity
              rollups in the middle market remain active. The
              economics of brokerage scale — shipper-base breadth,
              carrier network depth, technology fixed cost — favor
              the consolidators. Second,{" "}
              <strong>digital challengers</strong> from the
              2018–2022 venture wave have either hybridized (Uber
              Freight via Transplace), failed (Convoy), or
              retreated into niches. The 2026 broker base looks
              closer to the 2018 broker base than the 2020
              venture-deck projections expected; digital tools
              have been absorbed into the traditional broker stack
              rather than replacing it.
            </p>
          </section>

          <section className="research-section" id="spread-economics">
            <h2>3. Broker spread economics</h2>
            <p>
              The <Link href="/glossary/broker-spread">broker spread</Link>{" "}
              — the difference between the rate the shipper pays the
              broker and the rate the broker pays the carrier — is
              the unit of value transfer between broker and carrier.
              Every conversation about carrier-broker dynamics
              eventually reduces to the spread: what is it on this
              load, what is it on this lane, what is it on average,
              and is it fair. The public data on spread is limited
              because the spread is typically not disclosed to the
              carrier; the panel data and the public broker
              financial statements together give a reasonably tight
              estimate of the operating reality.
            </p>

            <h3>The typical band</h3>
            <p>
              In normal capacity environments, broker spreads
              typically run <strong>8–15%</strong> of the all-in
              rate paid by the shipper. The low end of the band
              applies on dense, repeat-lane, dedicated-contract
              freight where the broker is functioning as a
              load-matching utility on a relationship that is
              already established; the high end applies on
              spot-market, one-off freight where the broker absorbs
              more operational variance and underwrites more
              relationship and credit risk. A 12% spread on a $2,000
              load is $240 in broker gross margin — out of which the
              broker pays the sales rep&apos;s commission, the
              technology platform, the back-office cost, the credit
              risk on the carrier&apos;s payment, and the eventual
              cost of any claim or dispute that materializes.
            </p>

            <h3>The tight-capacity tail</h3>
            <p>
              On tight-capacity lanes, urgent shipments, specialty
              freight, and seasonal peak windows, broker spreads
              stretch to <strong>20–25%</strong> and occasionally
              higher. The 2017–2018 capacity crunch, the
              2020–2021 pandemic freight spike, the 2022 produce
              season, and the various weather-driven tight-capacity
              episodes through 2023–2024 all produced documented
              periods where broker spreads on affected lanes ran
              above 20% on a sustained basis. The asymmetry is real
              — the broker captures the upside of capacity tightening
              that the carrier can negotiate only partially — and is
              one of the principal carrier-side grievances feeding
              the OOIDA position on the broker transparency rule.
              The counter-argument from the broker side is that the
              broker absorbs the downside symmetrically: in slack
              capacity, the broker&apos;s spread compresses or in
              some cases turns negative on individual loads as
              committed shipper rates run below the spot-market
              carrier rate.
            </p>

            <h3>What drives spread compression</h3>
            <p>
              Four forces compress broker spreads. First,{" "}
              <strong>slack capacity</strong>: when truck supply
              exceeds demand, carrier-side pricing power weakens,
              shipper-side rates fall, and brokers find themselves
              caught between the two. The 2024–2025 freight
              recession compressed broker industry margins
              materially; the public broker financial statements
              from C.H. Robinson and the broker-segment disclosures
              from J.B. Hunt and Knight-Swift all show the
              compression clearly. Second, <strong>transparency
              pressure</strong>: where the carrier has visibility
              into the spread (through prior contract experience,
              broker-to-broker information sharing, or under a
              future broker transparency rule), the carrier&apos;s
              negotiating position improves and the spread tightens.
              Third, <strong>technology-enabled
              matching</strong>: the digital broker layer has
              compressed spreads on the most commoditized lanes
              where matching is the dominant value-add, even though
              it has not displaced the traditional broker overall.
              Fourth, <strong>direct shipper relationships</strong>:
              every carrier that builds a direct shipper relationship
              removes a load from the brokered market, and the
              cumulative effect on the most operationally
              sophisticated carrier segment is real margin pressure
              on the brokers that competed for that book.
            </p>

            <h3>Transparency-driven vs negotiation-driven pricing</h3>
            <p>
              The structural distinction in the 2026 spread market
              is between transparency-driven pricing and
              negotiation-driven pricing. Transparency-driven
              pricing — where the carrier knows or can reasonably
              estimate the spread, and the rate-confirmation
              negotiation is conducted against that benchmark —
              produces spreads that cluster toward the low end of
              the typical band. Negotiation-driven pricing — where
              the carrier has no visibility into the spread and
              negotiates against the carrier&apos;s own cost
              structure and the perceived alternative-load
              opportunity — produces wider variance and more
              instances of spread capture at the high end of the
              band. Carriers operating in 2026 with good market
              intelligence (DAT rate-view data, broker-credit
              history, factoring-company days-to-pay data, prior
              lane experience) operate in something closer to a
              transparency-driven environment; carriers without
              that intelligence operate in a negotiation-driven
              environment with materially worse expected economics.
              Section <a href="#carrier-strategies">10</a> covers
              the implications for carrier strategy.
            </p>
          </section>

          <section className="research-section" id="payment-time">
            <h2>4. Carrier payment-time trends</h2>
            <p>
              How fast brokers pay carriers is the second-most
              consequential dimension of the carrier-broker
              relationship after the spread. Net 30 has been the
              contractual standard at most major brokers for years.
              The practical reality has stretched. Slow-pay
              brokers, payment-term inflation at smaller brokers,
              and shipper-driven payment delays that flow through to
              the carrier have all pushed effective
              days-to-pay higher across the broker industry, and the
              cumulative effect on small-carrier cash flow is
              substantial.
            </p>

            <h3>The contractual baseline</h3>
            <p>
              Most major brokers in 2026 contract on Net 30 standard
              payment terms — payment due 30 days from the
              broker&apos;s receipt of a complete invoice and
              required supporting documentation (typically a signed
              bill of lading, the rate confirmation, and any
              accessorial documentation). Within the Net 30
              framework, the major brokers — C.H. Robinson, TQL,
              RXO, J.B. Hunt ICS, Echo, Worldwide Express,
              Knight-Swift Logistics — generally pay close to the
              contractual term, with measured days-to-pay typically
              running in the high 20s to mid 30s on the TriumphPay
              network and similar broker-payment data sets. Quick-pay
              programs (1–10 day pay against a discount, typically
              1–3% of invoice value) are widely available at the top
              tier and continue to be one of the cleanest sources of
              working-capital improvement for small carriers that
              prefer not to factor.
            </p>

            <h3>The slow-pay tail</h3>
            <p>
              Outside the top tier, the picture diverges. Net 45
              and Net 60 terms have become common at smaller
              brokers, particularly in segments where shipper
              terms have stretched. The slow-pay tail — brokers
              averaging 60+ days against contractual Net 30 or
              Net 45 — produces real cash-flow stress. The
              2024–2025 freight recession amplified the problem:
              broker working-capital management tightened, and
              several mid-tier brokers exited entirely, some with
              unpaid carrier invoices on the books. The pattern
              was severe enough that factoring companies
              materially tightened broker credit acceptance
              through 2024 and the first half of 2025.
            </p>

            <h3>Factoring as the bridge</h3>
            <p>
              Trucking <Link href="/glossary/recourse-factoring">
                factoring
              </Link>{" "}
              exists, at root, to bridge the gap between when the
              carrier delivers the load and when the broker pays the
              invoice. The factor advances 90–97% of invoice face
              value at delivery (typically within 24 hours), holds
              the reserve until the broker pays, and remits the
              reserve net of the factoring fee once payment lands.
              The factor effectively buys the broker&apos;s
              days-to-pay risk and the broker&apos;s credit risk in
              exchange for the discount. The 2026 factoring
              landscape is covered in detail in our{" "}
              <Link href="/research/best-trucking-factoring-2026">
                Best Trucking Factoring 2026
              </Link>{" "}
              report and our{" "}
              <Link href="/research/state-of-trucking-capital-2026">
                State of Trucking Capital 2026
              </Link>{" "}
              report; the broker-side observation here is that
              factoring is the dominant working-capital strategy for
              small carriers in 2026, and the structural reason for
              that dominance is broker payment-time stretch.
            </p>

            <h3>Broker credit data through factoring companies</h3>
            <p>
              The most consequential 2024–2026 development on the
              broker-pay side is the accumulation of audited broker
              credit data at the factoring companies.
              TriumphPay — which processes broker-to-carrier
              payments at scale and serves as a clearinghouse for
              invoice presentment, audit, and payment — produces
              broker credit data with no equivalent in the prior
              industry record. DAT and Truckstop both publish
              broker credit scoring and days-to-pay information
              drawn from carrier- and factor-side reporting. The
              carrier evaluating a broker in 2026 has materially
              better credit intelligence than the same carrier had
              in 2020, and the asymmetric-information picture is
              shifting at the margin in the carrier&apos;s favor.
              Section <a href="#quality-signals">8</a> covers the
              use of this data in the load-acceptance decision.
            </p>
          </section>

          <section className="research-section" id="transparency-rule">
            <h2>5. The FMCSA broker transparency rule</h2>
            <p>
              The proposed FMCSA broker transparency rule under{" "}
              <Link href="/glossary/fmcsa">49 CFR Part 371</Link> is
              the single most consequential open federal rulemaking
              for the carrier-broker relationship in 2026. The
              underlying statutory authority dates to the Motor
              Carrier Act of 1980 and subsequent transportation
              legislation; the existing Part 371 in fact already
              grants carriers a disclosure right against the broker.
              The rule has been on the books for decades and is, in
              practice, routinely waived in carrier-broker contracts
              and rarely enforced. The 2020 OOIDA petition for
              rulemaking and the subsequent FMCSA Notice of Proposed
              Rulemaking sought to give the existing disclosure
              right operational force.
            </p>

            <h3>NPRM history</h3>
            <p>
              OOIDA petitioned FMCSA in 2020. The agency opened a
              docket; an ANPRM and subsequent NPRM cycle through
              2023–2024 produced a proposed rule that would
              require brokers to (a) provide the underlying load
              documentation — including the shipper rate — to
              carriers on request within a defined window (the
              NPRM referenced 48 hours), (b) tighten record
              retention, and (c) prohibit contractual waiver of
              the disclosure right. Comment periods closed in
              2024 with a voluminous record on both sides. The
              agency has indicated continued work on the rule but
              has not published a final-rule timeline as of April
              2026.
            </p>

            <h3>Stakeholder positions</h3>
            <p>
              <strong>OOIDA</strong> has been the dominant
              carrier-side advocate, framing the rule as a
              long-overdue restoration of the information balance
              between brokers and small carriers. The OOIDA position
              is that the existing Part 371 disclosure right has
              been functionally nullified by waiver clauses in
              broker contracts and by the practical impossibility
              of enforcement; only a non-waivable rule with
              meaningful operational teeth restores the disclosure
              right. Allied carrier-side groups (state trucking
              associations on the owner-operator side, several state
              attorneys general comments) have generally aligned
              with OOIDA.
            </p>
            <p>
              <strong>TIA</strong> has been the dominant broker-side
              opponent, arguing that mandatory disclosure of shipper
              rates would (a) damage competitive intelligence in a
              fragmented brokerage market where shipper-rate
              information is competitively sensitive, (b) burden
              brokers with disclosure overhead that ultimately gets
              priced into the spread, (c) deter shippers from
              entering broker contracts under a regime where their
              negotiated rates are functionally public to carriers
              and competitive brokers, and (d) fail to address what
              TIA characterizes as the real source of small-carrier
              frustration — rate confirmation accuracy and broker
              payment-time discipline. The TIA position has been
              consistent through the rulemaking cycle.
            </p>

            <h3>Legal challenges</h3>
            <p>
              There is no active federal court challenge to the rule
              as of April 2026 because no final rule has issued.
              Administrative Procedure Act challenges are expected
              from the broker side if and when the rule finalizes in
              substantively expanded form; the regulatory record is
              voluminous enough to support either side&apos;s
              litigation posture. Federal Aviation Administration
              Authorization Act preemption is not a meaningful issue
              here (the FAAAA preempts state law, not federal
              regulation), but federal rulemaking-process challenges
              under the APA are the standard expected attack
              surface.
            </p>

            <h3>2026 status and what passage would mean</h3>
            <p>
              As of April 2026, the rule has not finalized. Our base
              case is finalization in some form before the end of
              2026, with phased implementation extending into 2027.
              The form may be narrower than the original NPRM — a
              delayed-disclosure compromise (extending the 48-hour
              window, narrowing the documentation scope, or
              providing a meaningful exemption for new brokerage
              relationships) is the most plausible compromise
              outcome on the panel reading. Probability of
              finalization in 2026 in some form: roughly 50–60%.
            </p>
            <p>
              If the rule finalizes substantially, the carrier-side
              effect would be most pronounced on tight-capacity
              lanes where broker spreads run at the high end of the
              band — the carrier would have visibility into the
              spread and a credible negotiation position on repeat
              lanes. On commodity-spot-market freight, the effect
              would be more modest because the carrier&apos;s
              practical alternative on any given load is more
              constrained. The secondary effect on the factoring
              industry — which underwrites broker-pay risk —
              would be a marginal improvement in broker credit
              visibility and a modest tightening of broker-credit
              underwriting overall. See the regulatory-side detail
              in our{" "}
              <Link href="/research/state-of-trucking-regulation-2026">
                State of Trucking Regulation 2026
              </Link>{" "}
              report.
            </p>
          </section>

          <section className="research-section" id="concentration-risk">
            <h2>6. Broker concentration risk</h2>
            <p>
              Broker concentration risk is one of the most
              under-appreciated sources of business risk in the
              owner-operator and small-fleet segment. A carrier with
              40%+ of monthly revenue concentrated on a single
              broker is structurally exposed to that broker&apos;s
              payment discipline, credit position, lane mix, and
              continued willingness to award loads. If the broker
              slow-pays, the carrier&apos;s cash flow collapses.
              If the broker defaults, the carrier may eat 30–60 days
              of receivables. If the broker terminates the
              relationship — for any reason or no reason — the
              carrier loses a structural share of revenue overnight.
              The carriers we see operating most durably in 2026
              treat broker concentration as a first-order business
              metric and manage it deliberately.
            </p>

            <h3>The diversification math</h3>
            <p>
              The math is simple. A six-broker carrier with
              roughly-equal exposure has a 16% concentration on each
              broker; the worst-case loss of a single broker
              relationship costs ~16% of revenue temporarily. A
              twelve-broker carrier has 8% concentration each; the
              worst-case loss costs ~8%. A two-broker carrier has
              50% concentration; the worst-case loss is existential.
              The trade-off is operational complexity — each broker
              relationship requires onboarding, contract review,
              factoring-credit verification, and ongoing
              relationship maintenance — and the optimal number
              depends on fleet size and back-office capacity. The
              panel reading is that <strong>six to twelve active
              broker relationships</strong> is the right operating
              range for a single-truck or small-fleet owner-operator
              in 2026; below six, concentration risk is unmanaged;
              above twelve, the relationship maintenance overhead
              starts to exceed the diversification benefit for most
              operators.
            </p>

            <h3>Non-recourse factoring as risk transfer</h3>
            <p>
              <Link href="/glossary/non-recourse-factoring">
                Non-recourse factoring
              </Link>{" "}
              transfers broker-credit risk to the factor. Under a
              non-recourse facility, if the broker defaults on the
              underlying invoice (the broker becomes insolvent and
              the invoice goes unpaid), the factor absorbs the loss
              rather than charging back the carrier. The trade-off
              is a higher factoring rate (typically 50–150 basis
              points above recourse factoring for comparable
              broker-credit quality) and tighter broker-credit
              acceptance — the factor will only advance against
              brokers that pass the factor&apos;s credit screen. For
              carriers with high broker concentration on uncertain
              brokers, non-recourse factoring is the cleanest
              available risk-transfer mechanism; for carriers with
              well-diversified broker exposure and conservative
              broker-credit selection, recourse factoring at the
              lower rate is typically more cost-effective. The
              decision is a function of broker concentration, broker
              credit quality, and risk tolerance. Our{" "}
              <Link href="/research/best-trucking-factoring-2026">
                Best Trucking Factoring 2026
              </Link>{" "}
              report covers the recourse-vs-non-recourse trade-off
              in detail.
            </p>
          </section>

          <section className="research-section" id="direct-vs-broker">
            <h2>7. Direct shipper vs broker relationships</h2>
            <p>
              The question of when to chase direct shipper
              relationships versus when to run through brokers is
              one of the most consequential strategic decisions an
              owner-operator or small fleet makes. The brokered
              market is operationally easier and the broker
              relationship can be built and maintained on a single
              load; the direct-shipper market captures the spread
              the broker would have taken but is operationally more
              demanding and concentrates risk differently. The right
              mix depends on the carrier&apos;s lane portfolio,
              freight type, equipment, and operational sophistication.
            </p>

            <h3>When direct works</h3>
            <p>
              Direct shipper relationships work best on{" "}
              <strong>dedicated lane</strong> business — recurring
              loads on the same origin-destination pair for the
              same shipper at predictable volume. The carrier
              invests in the shipper relationship, learns the
              shipper&apos;s operational rhythm (loading windows,
              detention discipline, claim handling, payment terms),
              and captures the broker spread that would otherwise
              have applied. Dedicated-lane carriers typically run
              60–80% of revenue on direct shipper relationships and
              the remainder on the brokered spot market for
              backhaul-loading.{" "}
              <strong>Contract carriage</strong> — a longer-term
              direct relationship governed by a transportation
              contract with negotiated rates, volume commitments,
              and dedicated service terms — is the most evolved
              form of the direct relationship and is appropriate
              for carriers with the equipment, lane discipline, and
              back-office capacity to maintain the commitment.
              Carriers running specialty freight (temperature-
              controlled, flatbed, heavy-haul, automotive) often
              find direct relationships more accessible than
              dryvan carriers because the specialty equipment is
              itself a relationship anchor.
            </p>

            <h3>When broker is better</h3>
            <p>
              The brokered spot market is structurally better for{" "}
              <strong>variable lane patterns</strong> — carriers
              that run mixed equipment, multiple geographies, and
              non-repeating origin-destination pairs. The broker
              base provides a continuously refreshed pool of
              available loads; the carrier never has to invest in
              shipper-specific operational adaptation; the
              relationship overhead is minimal. The trade-off is
              the broker spread itself and the loss of pricing
              power that comes with not owning the shipper
              relationship. For carriers in their first 12–24
              months of authority, the brokered market is also the
              practical starting point — building a direct shipper
              book takes years, and the brokered market provides
              immediate revenue capacity for the cash-flow needs
              of a new operation.
            </p>

            <h3>The operational complexity trade-off</h3>
            <p>
              The operational complexity of a direct shipper book
              is genuinely higher than that of a broker book. The
              shipper relationship requires consistent service
              quality at a higher standard than the brokered
              market typically demands, often expects EDI or
              portal integration, and may carry less favorable
              payment terms and more legalistic dispute
              resolution. The break-even is fleet- and
              freight-specific; the panel reading is that
              owner-operators below 3–5 power units typically do
              not clear the operational overhead of a meaningful
              direct shipper book, while operators above that
              threshold have the back-office capacity to make
              dedicated-lane direct relationships work.
            </p>
          </section>

          <section className="research-section" id="quality-signals">
            <h2>8. Broker quality signals</h2>
            <p>
              The carrier evaluating whether to accept a load from a
              broker has more available quality signals in 2026 than
              ever before. The accumulation of broker credit data
              through factoring companies, load board credit
              reporting, payment-network observability, and the
              broader FMCSA SAFER registry has produced a richer
              broker-evaluation toolkit than the equivalent toolkit
              that existed five years ago. Carriers that use the
              available signals avoid most of the worst broker
              relationships and capture meaningfully better economics
              on the relationships they do enter.
            </p>

            <h3>FMCSA SAFER</h3>
            <p>
              The FMCSA SAFER database is the regulatory baseline.
              Every broker operating legally in the U.S. has an MC#
              registered with FMCSA, must maintain a $75,000 broker
              surety bond under 49 CFR Part 387.307, and must have
              the bond on file with FMCSA. A broker without active
              registration, without an active surety bond, or with
              recent revocation activity is a hard no. The
              registration check is free, immediate, and the first
              filter every carrier should run before booking with a
              broker they have not used before.
            </p>

            <h3>Factoring company broker credit</h3>
            <p>
              Every factoring company maintains a broker credit
              evaluation, and most factors will share the credit
              status with their carrier clients before the carrier
              books the load. The factor&apos;s credit position is
              built on the factor&apos;s aggregated payment
              experience across thousands of brokers; the data
              quality is materially better than any individual
              carrier&apos;s. A broker that the factor will not
              advance against is a strong negative signal even if
              the carrier intends to pay cash; the factor&apos;s
              decision typically reflects either payment-time
              concerns, dispute-resolution concerns, or credit
              concerns that the carrier should weigh seriously.
              TriumphPay&apos;s broker payment data, DAT&apos;s
              broker credit scoring, and the equivalent
              Truckstop-side data all aggregate to roughly the same
              picture for most active brokers.
            </p>

            <h3>Days-to-pay history</h3>
            <p>
              The single cleanest behavioral signal is the
              broker&apos;s historical days-to-pay performance.
              Brokers that consistently pay within their contractual
              terms (typically Net 30) are operationally
              well-managed and worth long-term investment.
              Brokers that consistently slow-pay are signaling
              working-capital pressure, operational disorganization,
              or a deliberate strategy of capturing the
              float — none of which are favorable to the carrier.
              The TriumphPay network has produced unusually clean
              days-to-pay data on the brokers that use the network
              for payment processing; load boards and factoring
              companies fill in the picture for brokers outside the
              TriumphPay base.
            </p>

            <h3>Dispute resolution patterns and red flags</h3>
            <p>
              Brokers that resist legitimate accessorials, dispute
              claims aggressively without merit, or short-pay on
              technical grounds are structurally worse
              counterparties — and the behavior aggregates: a
              broker that short-pays one carrier tends to short-pay
              many. Red flags that should make a carrier decline
              include refusing to put accessorial terms in writing
              on the rate confirmation, repeated last-minute rate
              changes after dispatch, undisclosed double-brokering,
              and pressure to operate outside standard
              rate-confirmation paperwork. The carrier that walks
              from a load showing any of these signals is making
              the right call substantially more often than not.
            </p>
          </section>

          <section className="research-section" id="digital-platforms">
            <h2>9. Digital broker platforms in 2026</h2>
            <p>
              The digital broker platform category — the venture-
              funded thesis that freight brokerage would consolidate
              onto a software platform the way ride-sharing
              consolidated passenger transport — drove billion-
              dollar venture investment between 2018 and 2022 and
              produced a mix of outcomes that the trucking
              technology section of our{" "}
              <Link href="/research/state-of-trucking-tech-2026">
                State of Trucking Tech 2026
              </Link>{" "}
              report covers in adjacent detail. The 2026 reading on
              digital brokerage is that the survivors operate at
              scale, the failures were instructive, and the
              traditional broker base has hybridized enough to
              absorb most of the technology surface area that the
              pure-digital players brought to market.
            </p>

            <h3>Uber Freight</h3>
            <p>
              Uber Freight launched in 2017, acquired Transplace in
              2021 (transforming from a pure-play digital broker
              into a hybrid model with an established brokerage
              book), and operates in 2026 as one significant player
              among many in the U.S. freight market. The
              platform&apos;s technology — automated load posting,
              instant booking, transparent pricing — has set
              expectations in the market that competitors have had
              to match. The Transplace acquisition was, in
              retrospect, the critical strategic move: it gave Uber
              Freight a traditional brokerage business to absorb
              the operational demands of the customer base while
              the pure-digital workflow handled the lighter end of
              the freight mix.
            </p>

            <h3>Convoy (defunct)</h3>
            <p>
              Convoy shut down in October 2023 after raising more
              than $1 billion in venture funding. The postmortem
              identified several causes: a freight-market recession
              that compressed margins across the brokerage industry
              at exactly the wrong moment for a high-burn-rate
              venture-funded operator; over-investment in technology
              relative to the relationship-management work that
              still drove most freight; and a customer base that
              proved more willing to switch back to traditional
              brokers than the digital-disruption thesis predicted.
              Convoy&apos;s technology assets were partially
              acquired by Flexport. Several Convoy alumni went on to
              found follow-on ventures, with Loadsmith and other
              spin-outs operating inside narrower niches.
            </p>

            <h3>Loadsmith, Loadsmart, and AI matching tools</h3>
            <p>
              Loadsmith, Loadsmart, and a long tail of digital-
              native brokers continue to operate in specialized
              niches — specific freight types, specific shipper
              relationships, specific technology approaches —
              without attempting the full digital-broker
              displacement that drove Convoy. The pattern works
              better when the platform is honest about its position
              as one channel among many rather than the platform
              that will replace the traditional broker. AI-driven
              matching tools — both standalone and embedded in the
              major load boards (DAT, Truckstop) — have moved from
              marketing language to genuine product capability on
              dense lanes. The 2026 reading is that AI matching is
              a real productivity tool for carriers running their
              own dispatch, distinct from the broader AI marketing
              layer that pervades the rest of the trucking
              technology stack.
            </p>

            <h3>Why digital hasn&apos;t displaced traditional</h3>
            <p>
              Three structural reasons emerge. First, freight
              brokerage is a <strong>relationship business</strong>{" "}
              more than a technology business — the shipper
              relationship is built over years, depends on the
              broker absorbing operational variance, and does not
              transfer to a software platform cleanly. Second, the{" "}
              <strong>carrier base is fragmented</strong> —
              hundreds of thousands of motor carriers, most with
              fewer than ten trucks — and matching at scale
              requires more relationship management than the
              pure-digital model accounts for. Third, the{" "}
              <strong>spread economics</strong> of brokerage are
              tighter than the consumer-marketplace analogies
              suggested: a broker on a 12% gross margin does not
              have the cash to absorb the CAC, technology
              investment, and operational losses that a
              venture-funded model requires. The hybrid model —
              traditional brokers layering technology onto an
              established relationship book — has won the long
              game over the pure-play digital.
            </p>
          </section>

          <section className="research-section" id="carrier-strategies">
            <h2>10. Carrier strategies for broker management</h2>
            <p>
              The carriers we see operating most durably in 2026
              treat broker management as a discipline rather than a
              series of one-off load decisions. Five practical
              strategies emerge from the panel observation; they
              compound when executed together.
            </p>

            <h3>Load board diversification</h3>
            <p>
              No carrier should depend on a single{" "}
              <Link href="/glossary/load-board">load board</Link>{" "}
              for the brokered freight pipeline. DAT and Truckstop
              are the two dominant U.S. boards and provide
              complementary coverage on most lanes; subscribing to
              both is the baseline for active carriers in 2026,
              with smaller boards (123Loadboard, Trucker Path Pro)
              layered on top for specific use cases. The cost of
              dual-board subscription is modest against the
              additional load visibility, and the operational
              friction is low once the carrier&apos;s dispatch
              workflow handles both feeds.
            </p>

            <h3>Broker portfolio construction</h3>
            <p>
              Active management of the broker portfolio — six to
              twelve active relationships, evaluated and refreshed
              on a regular cycle — is the most direct lever a small
              carrier has against concentration risk. The portfolio
              should mix relationship tiers: two to three brokers
              the carrier knows well with predictable lane volume,
              three to five brokers in a steady-state working
              relationship, and a rotating set of spot-market
              brokers for incremental loads. Every broker in the
              portfolio should be evaluated against the quality
              signals in section <a href="#quality-signals">8</a>{" "}
              before booking the first load and re-evaluated
              periodically as days-to-pay and dispute patterns
              accumulate.
            </p>

            <h3>Accessorial collection discipline</h3>
            <p>
              <Link href="/glossary/accessorial-charges">
                Accessorial charges
              </Link>{" "}
              — detention, layover, lumper reimbursement, dry-runs,
              fuel-surcharge adjustments — represent a meaningful
              share of carrier revenue on many loads and a frequent
              source of broker dispute. The carriers that collect
              accessorial revenue at the highest rate are the ones
              that put accessorial terms in writing on the rate
              confirmation before dispatch, document every
              accessorial-triggering event with timestamps and
              photographs at the dock, submit accessorial invoices
              promptly with complete documentation, and escalate
              persistently when the broker resists payment. The
              cumulative annual revenue effect is substantial; the
              carriers that treat accessorial collection as a
              priority capture meaningfully better unit economics
              than the carriers that treat it as an afterthought.
            </p>

            <h3>Dispute resolution and the all-in rate frame</h3>
            <p>
              The <Link href="/glossary/all-in-rate">all-in rate</Link>{" "}
              — the total rate including fuel surcharge and all
              specified accessorials — is the right frame for
              rate-confirmation negotiation and dispute resolution.
              Carriers that negotiate against all-in rates with
              specified accessorial terms have a clean documentary
              record for any dispute; carriers that negotiate
              against linehaul-plus-FSC quotes with verbal
              accessorial expectations have a documentary record
              that systematically favors the broker. The 2026
              best-practice rate confirmation includes the all-in
              rate, the lane definition, the fuel-surcharge
              calculation, the specified accessorials with rates,
              the payment terms, and the contact escalation path
              for any in-transit issue.
            </p>

            <h3>Direct shipper development on dedicated lanes</h3>
            <p>
              For carriers with the operational sophistication to
              support it, direct shipper development on dedicated
              lanes is the highest-leverage long-term move.
              Identifying repeat origin-destination pairs in the
              brokered freight history and converting the
              most-promising relationships to direct contracts
              captures the broker spread and shifts relationship
              gravity in the carrier&apos;s favor. The work is slow
              and operationally demanding; for small fleets above
              3–5 power units with stable dispatch and back-office
              capacity, it is the most reliable path to the next
              tier of profitability.
            </p>
          </section>

          <section className="research-section" id="predictions">
            <h2>11. Predictions for 2026–2027</h2>
            <p>
              Five specific, falsifiable predictions for the next
              18 months. Each prediction is time-bound, measurable,
              and can be wrong; the editorial probability we attach
              reflects our actual confidence in the call.
            </p>
            <ol className="research-list">
              <li>
                <strong>
                  FMCSA broker transparency rule finalizes in some
                  form before the end of 2026 with phased
                  implementation into 2027.
                </strong>{" "}
                The regulatory record and the political pressure
                from the carrier side are both strong enough that
                finalization in some form within the report
                horizon is the base-case expectation; the form may
                be narrower than the original NPRM with a
                delayed-disclosure compromise the most plausible
                outcome. Probability: moderate (50–60%).
              </li>
              <li>
                <strong>
                  Average broker days-to-pay on the TriumphPay
                  network continues to compress toward the
                  contractual term through 2027.
                </strong>{" "}
                The accumulation of broker credit data, the
                competitive pressure on brokers that slow-pay, and
                the factoring-industry tightening of broker credit
                acceptance all push in the same direction.
                Probability: moderate-to-high (55–65%).
              </li>
              <li>
                <strong>
                  Broker market consolidation at the top tier
                  continues, with at least one additional top-ten
                  broker M&amp;A transaction announced before the
                  end of 2027.
                </strong>{" "}
                The structural economics of brokerage scale
                continue to favor consolidation; the public broker
                financial statements and the post-recession
                cost-of-capital environment both support continued
                top-tier transactions. Probability: moderate-to-
                high (55–65%).
              </li>
              <li>
                <strong>
                  No new pure-play digital broker reaches $1B in
                  annual freight volume by end of 2027.
                </strong>{" "}
                The Convoy postmortem and the structural reasons
                in section <a href="#digital-platforms">9</a>{" "}
                suggest the digital-broker thesis as originally
                framed has played out. New entrants will be hybrid
                (technology plus relationship) or niche (specific
                freight types). Probability: high (greater than
                70%).
              </li>
              <li>
                <strong>
                  Non-recourse factoring share of the small-carrier
                  factoring market continues to expand through
                  2027.
                </strong>{" "}
                As broker concentration risk becomes more
                explicitly understood by small carriers, and as
                factoring companies refine the non-recourse
                product, the share of small-carrier factoring
                volume on non-recourse facilities is likely to
                expand from its 2024–2025 base. Probability:
                moderate (50–60%).
              </li>
            </ol>
            <p>
              One prediction we are watching but not yet betting
              on: a meaningful AI-driven shift in spot-market
              broker pricing transparency. Several
              factoring-and-payment-network operators are
              investing in aggregate spread and rate-visibility
              tools; if those reach scale, the practical
              transparency picture could shift before a final
              broker transparency rule lands. The base case is
              that the regulatory path delivers transparency
              before the market-driven path does; the upside case
              is the reverse.
            </p>
          </section>

          <section className="research-section" id="methodology">
            <h2>12. Methodology and sources</h2>
            <p>
              This report draws on four categories of source.
              First, public regulatory and registration data —
              FMCSA SAFER broker registration records, the FMCSA
              broker transparency NPRM docket under 49 CFR Part
              371, and Federal Register rulemaking notices on the
              broker-transparency thread. Second, public filings
              and disclosures from the major public brokers —
              C.H. Robinson (NASDAQ: CHRW), RXO (NYSE: RXO),
              J.B. Hunt Integrated Capacity Solutions (NASDAQ:
              JBHT), and Knight-Swift Logistics (NYSE: KNX) — and
              the Triumph Financial filings that disclose the
              TriumphPay broker payment network and the audited
              factoring credit data that the network produces.
              Third, industry-association published research and
              regulatory comment records — OOIDA carrier-side
              filings, TIA broker-side filings, and the comparable
              records from state trucking associations. Fourth,
              Dispatched&apos;s own panel observation — we
              maintain working relationships with a panel of
              trucking factors, carriers, and broker-side payment
              networks, and reference panel adoption and
              days-to-pay observations alongside the public
              sources throughout this report.
            </p>
            <p>
              Time horizon: data through April 2026. Where the
              report cites days-to-pay bands, spread bands, or
              market-share estimates, those are snapshot
              observations on the Dispatched panel and public
              comparables as of the report&apos;s publication date
              and should be expected to drift modestly through the
              remainder of the year. Where the report makes a
              forward-looking prediction, we have attempted to
              make the prediction specific, time-bound, and
              falsifiable — and to attach an explicit probability
              where the underlying signal supports one.
            </p>
            <p>
              Disclosures: Dispatched is a matching platform for
              commercial trucking financing and trucking
              insurance. Dispatched maintains commercial
              relationships with a panel of trucking factors,
              lenders, and insurance producers referenced
              throughout the broader research series; for the
              brokers and broker-side platforms named in this
              report specifically, Dispatched does not maintain
              commercial relationships and treats the broker
              landscape as editorial subject matter. Those
              relationships and editorial separations are
              documented in our{" "}
              <Link href="/methodology">methodology</Link> page.
              This report references panel observations alongside
              public sources rather than substituting one for the
              other; readers should refer to the public sources
              for primary data. The report does not contain
              proprietary, paid, or vendor-licensed broker data
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
              If you are an owner-operator or small fleet working
              through the carrier-broker relationship in 2026, the
              report above maps to a small set of practical
              glossary entries and product pages on the Dispatched
              platform.
            </p>
            <div className="research-cta-grid">
              <Link
                href="/glossary/broker-spread"
                className="research-cta-card"
              >
                <h3>Broker spread</h3>
                <p>
                  The 8–15% typical band, the 20–25% tight-capacity
                  tail, and what drives spread compression and
                  expansion across the cycle.
                </p>
              </Link>
              <Link
                href="/glossary/non-recourse-factoring"
                className="research-cta-card"
              >
                <h3>Non-recourse factoring</h3>
                <p>
                  Transferring broker-credit risk to the factor.
                  The right tool for carriers with concentrated
                  exposure on uncertain brokers; the trade-off is
                  a higher rate.
                </p>
              </Link>
              <Link
                href="/glossary/recourse-factoring"
                className="research-cta-card"
              >
                <h3>Recourse factoring</h3>
                <p>
                  The lower-rate alternative for carriers with
                  diversified broker exposure and conservative
                  broker-credit selection.
                </p>
              </Link>
              <Link
                href="/glossary/load-board"
                className="research-cta-card"
              >
                <h3>Load board</h3>
                <p>
                  DAT and Truckstop dominance, broker credit data
                  integration, and the dual-board operating
                  baseline for active carriers in 2026.
                </p>
              </Link>
              <Link
                href="/glossary/all-in-rate"
                className="research-cta-card"
              >
                <h3>All-in rate</h3>
                <p>
                  Linehaul plus fuel surcharge plus specified
                  accessorials. The right frame for rate-
                  confirmation negotiation and dispute resolution.
                </p>
              </Link>
              <Link
                href="/glossary/accessorial-charges"
                className="research-cta-card"
              >
                <h3>Accessorial charges</h3>
                <p>
                  Detention, layover, lumper reimbursement,
                  dry-runs, fuel-surcharge adjustments — and the
                  collection discipline that captures them.
                </p>
              </Link>
            </div>
            <p style={{ marginTop: "1.5rem" }}>
              See also: the{" "}
              <Link href="/research">Dispatched Research index</Link>
              , the{" "}
              <Link href="/research/state-of-trucking-regulation-2026">
                State of Trucking Regulation 2026
              </Link>{" "}
              report for the broker-transparency-rule regulatory
              context, the{" "}
              <Link href="/research/state-of-trucking-capital-2026">
                State of Trucking Capital 2026
              </Link>{" "}
              report for the factoring-side detail, the{" "}
              <Link href="/research/best-trucking-factoring-2026">
                Best Trucking Factoring 2026
              </Link>{" "}
              report,{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>
              ,{" "}
              <Link href="/research/state-of-trucking-tech-2026">
                State of Trucking Tech 2026
              </Link>
              , and our{" "}
              <Link href="/methodology">methodology</Link> page.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
