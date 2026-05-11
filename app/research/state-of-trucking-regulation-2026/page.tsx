import type { Metadata } from "next";
import Link from "next/link";
import {
  JsonLd,
  article,
  breadcrumbList,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "State of Trucking Regulation 2026 — Dispatched Research",
  description:
    "Annual report on the regulatory environment for commercial trucking: FMCSA rules, state-level laws (AB 5, CARB Phase 3, MCA disclosure), broker transparency, and 2026 outlook.",
  alternates: {
    canonical: "/research/state-of-trucking-regulation-2026",
  },
  openGraph: {
    title: "State of Trucking Regulation 2026 — Dispatched Research",
    description:
      "Annual report on the regulatory environment for commercial trucking: FMCSA rules, state-level laws (AB 5, CARB Phase 3, MCA disclosure), broker transparency, and 2026 outlook.",
    url: "/research/state-of-trucking-regulation-2026",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "State of Trucking Regulation 2026 — Dispatched Research",
    description:
      "Annual report on the regulatory environment for commercial trucking: FMCSA rules, state-level laws (AB 5, CARB Phase 3, MCA disclosure), broker transparency, and 2026 outlook.",
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
      "FMCSA — Drug & Alcohol Clearinghouse Monthly Summary Reports",
    url: "https://clearinghouse.fmcsa.dot.gov/Resource/Index/Monthly-Summary",
  },
  {
    label:
      "FMCSA — Entry-Level Driver Training (ELDT) regulation (49 CFR Part 380)",
    url: "https://tpr.fmcsa.dot.gov/",
  },
  {
    label:
      "FMCSA — Hours of Service final rule (2020 revisions, 49 CFR Part 395)",
    url: "https://www.fmcsa.dot.gov/regulations/hours-of-service",
  },
  {
    label:
      "FMCSA — CSA Safety Measurement System and methodology review",
    url: "https://csa.fmcsa.dot.gov/",
  },
  {
    label:
      "FMCSA — MCS-150 biennial update requirement (49 CFR Part 390.19)",
    url: "https://www.fmcsa.dot.gov/registration/updating-your-registration",
  },
  {
    label:
      "FMCSA — Truck Leasing Task Force final report (2024)",
    url: "https://www.fmcsa.dot.gov/advisory-committees/truck-leasing-task-force",
  },
  {
    label:
      "Owner-Operator Independent Drivers Association (OOIDA) — regulatory comment and position papers",
    url: "https://www.ooida.com/",
  },
  {
    label:
      "American Trucking Associations (ATA) — federal regulatory positions",
    url: "https://www.trucking.org/",
  },
  {
    label:
      "Transportation Intermediaries Association (TIA) — broker transparency comments",
    url: "https://www.tianet.org/",
  },
  {
    label:
      "California AB 5 (2019) and California Trucking Association v. Bonta — FAAAA preemption litigation",
    url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB5",
  },
  {
    label:
      "California Air Resources Board — Advanced Clean Fleets, Heavy-Duty Omnibus, and Phase 3 GHG rules",
    url: "https://ww2.arb.ca.gov/our-work/programs/advanced-clean-fleets",
  },
  {
    label:
      "EPA — Heavy-Duty Greenhouse Gas Emissions Standards, Phase 3 final rule (March 2024)",
    url: "https://www.epa.gov/regulations-emissions-vehicles-and-engines/final-rule-greenhouse-gas-emissions-standards-heavy",
  },
  {
    label:
      "California SB 1235; New York Commercial Finance Disclosure Law (NYDFS); Utah HB 387; Virginia HB 1027 — state MCA disclosure regimes",
    url: "https://www.dfs.ny.gov/industry_guidance/commercial_financing_disclosure",
  },
  {
    label:
      "FMCSA 49 CFR Part 387 — Minimum Levels of Financial Responsibility (insurance minimums)",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
  },
  {
    label:
      "AmTrust Financial Services — commercial trucking insurance market commentary",
    url: "https://amtrustfinancial.com/",
  },
  {
    label:
      "International Registration Plan (IRP) and International Fuel Tax Agreement (IFTA) — base-state administration",
    url: "https://www.irponline.org/",
  },
  {
    label:
      "FMCSA SAFER — Motor Carrier Registration and Authority Data",
    url: "https://safer.fmcsa.dot.gov/",
  },
];

export default function StateOfTruckingRegulation2026() {
  const today = new Date().toISOString().slice(0, 10);
  const url =
    "https://dispatched.finance/research/state-of-trucking-regulation-2026";
  return (
    <div className="research-page">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Research", url: "https://dispatched.finance/research" },
          {
            name: "State of Trucking Regulation 2026",
            url,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "State of trucking regulation, 2026",
          description:
            "Annual Dispatched Research report on the regulatory environment for commercial trucking — FMCSA rulemaking, California AB 5 and CARB Phase 3, state-level MCA disclosure laws, broker transparency, and the 2026–2027 outlook.",
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
              State of trucking regulation, 2026.
            </h1>
            <p className="research-subhead">
              The regulatory environment for commercial trucking in
              2026 is defined by tightening at the federal level
              (FMCSA broker transparency rule, Drug &amp; Alcohol
              Clearinghouse expansion) and expansion at the state
              level (California AB 5 enforcement, CARB Phase 3
              emissions, state MCA disclosure laws). This report
              covers what changed, what stayed the same, and what
              carriers should expect through 2026.
            </p>
            <p className="research-meta">
              Published {today} · Dispatched Research · Eighteen
              sources referenced inline. Rules in effect or proposed
              through April 2026.
            </p>
          </header>

          <section className="research-section" id="q2-2026-update">
            <h2>Q2 2026 update</h2>
            <p>
              The FMCSA broker transparency rule remains in proposed
              status with no final action through April 2026. California
              AB 5 litigation continued — California Trucking
              Association v. Bonta returned to district court on remand.
              CARB Phase 3 emissions standards began implementing on
              schedule. Two more states (Utah, Virginia) proposed MCA
              disclosure bills.
            </p>
          </section>

          <nav className="research-toc" aria-label="Table of contents">
            <p className="research-toc-eyebrow">Contents</p>
            <ol>
              <li><a href="#executive-summary">1. Executive summary</a></li>
              <li><a href="#fmcsa-landscape">2. FMCSA federal regulatory landscape</a></li>
              <li><a href="#broker-transparency">3. Broker transparency rule status</a></li>
              <li><a href="#ab5-faaaa">4. California AB 5 and FAAAA preemption</a></li>
              <li><a href="#carb-phase3">5. CARB Phase 3 emissions</a></li>
              <li><a href="#mca-disclosure">6. State-level MCA disclosure laws</a></li>
              <li><a href="#eldt">7. ELDT (Entry-Level Driver Training) impact</a></li>
              <li><a href="#hos">8. Hours of Service stability</a></li>
              <li><a href="#taxation">9. State-level commercial trucking taxation</a></li>
              <li><a href="#insurance">10. Insurance regulatory landscape</a></li>
              <li><a href="#predictions">11. Predictions for 2026–2027</a></li>
              <li><a href="#methodology">12. Methodology and sources</a></li>
            </ol>
          </nav>

          <section className="research-section" id="executive-summary">
            <h2>1. Executive summary</h2>
            <p>
              The regulatory environment for commercial trucking in
              2026 has two clear directions and a third that is
              genuinely uncertain. At the federal level, FMCSA
              rulemaking is incrementalist — Drug &amp; Alcohol
              Clearinghouse expansion is now fully phased in, the
              ELD mandate is mature, Hours of Service has been
              stable since the 2020 split-sleeper revision, and the
              MCS-150 biennial update enforcement regime is the
              same it has been for years. The signature open
              question at the federal level is the proposed broker
              transparency rule under{" "}
              <Link href="/glossary/fmcsa">49 CFR Part 371</Link> —
              comment periods closed long ago, a final rule has not
              yet issued as of April 2026, and stakeholder pressure
              from{" "}
              <a href="https://www.ooida.com/" target="_blank" rel="noopener">
                OOIDA
              </a>{" "}
              and the carrier side runs against equally organized
              pressure from{" "}
              <a href="https://www.tianet.org/" target="_blank" rel="noopener">
                TIA
              </a>{" "}
              and the broker side.
            </p>
            <p>
              At the state level, the regulatory direction is
              expansion. California continues to lead on three
              independent fronts — AB 5 misclassification
              enforcement (with the FAAAA-preemption litigation
              settled into durable ambiguity), CARB Phase 3 and
              Advanced Clean Fleets emissions implementation, and
              SB 1235 commercial financing disclosure — and a
              widening set of states are adopting some or all of
              the California templates. Roughly 15 states have
              adopted some form of California vehicle-emissions
              standard for heavy-duty trucks; four states have
              live MCA disclosure regimes with at least six more
              with bills proposed in 2026; and AB 5-style ABC tests
              for independent contractor classification have
              advanced or been adopted in New Jersey,
              Massachusetts, and Oregon with similar pressure in
              other states.
            </p>
            <p>
              Five high-level findings shape the rest of the
              report. First, the FMCSA broker transparency rule is
              more likely than not to finalize before the end of
              2026, in some form, though the form may be narrower
              than the original NPRM. Second, the California
              Trucking Association v. Bonta litigation around AB 5
              and FAAAA preemption is not on a path to a clean
              Supreme Court resolution within the report horizon;
              practical adaptation by carriers and operators is
              the more likely 2026–2027 mechanism than legal
              clarity. Third, CARB Phase 3 and the cumulative EPA
              Phase 3 GHG rule are driving structurally higher new
              Class 8 tractor pricing and a phased extension of
              zero-emission fleet mandates that will reshape
              capital allocation for California-domiciled carriers
              well before the 2030 dates appear in headlines.
              Fourth, state-level MCA disclosure laws are
              expanding faster than enforcement is, which produces
              a near-term compliance burden without immediately
              reshaping the small-business lending market — though
              the multi-year effect on MCA share is meaningful.
              Fifth, the ELDT mandate&apos;s four-year impact on
              the new-CDL pipeline is now legible: training school
              economics have settled, driver-entry cost has stepped
              up, and the new-authority owner-operator cohort
              continues to bear the cost-of-entry increase.
            </p>
            <p>
              The single most actionable read for owner-operators
              and small fleets: the regulatory environment in 2026
              rewards holding your own authority. Independent
              operators absorb the compliance load directly and
              capture the offsetting advantages (tax deductibility,
              clarity on classification, control over equipment
              decisions). Lease-on and lease-purchase structures
              carry the same compliance load through a layer of
              carrier intermediation and an increasing
              regulatory-exposure premium in the post-AB 5,
              post-Truck Leasing Task Force environment.
            </p>
          </section>

          <section className="research-section" id="fmcsa-landscape">
            <h2>2. FMCSA federal regulatory landscape</h2>
            <p>
              The FMCSA rulemaking environment in 2026 is
              incrementalist. The agency has not opened a major
              new rulemaking thread since the broker transparency
              NPRM and the post-Truck Leasing Task Force
              listening-session work; the active enforcement and
              compliance threads on the carrier side are mostly
              continuations of rules that phased in earlier this
              decade. The shape of the federal regulatory load in
              2026 is best understood as five mature compliance
              regimes and one significant open rulemaking
              question.
            </p>

            <h3>ELD mandate — final exemption phase-outs</h3>
            <p>
              The Electronic Logging Device mandate under{" "}
              <Link href="/glossary/eld">49 CFR Part 395</Link> is
              fully mature in 2026. The original December 2017
              implementation deadline and the December 2019 AOBRD
              grandfathering sunset are long past; the last
              meaningful exemption windows (short-haul air-mile
              extensions, agricultural windows, and pre-2000
              engine vehicle exemptions) are stable and narrow.
              The 2026 ELD enforcement landscape is mature data
              integration — ELD records, IFTA fuel-tax reporting,
              and FMCSA roadside inspection data are increasingly
              linked, and the operational and underwriting
              implications of that data integration are now baked
              into the carrier finance and insurance ecosystems.
            </p>

            <h3>Drug &amp; Alcohol Clearinghouse expansion</h3>
            <p>
              The FMCSA{" "}
              <Link href="/glossary/drug-alcohol-clearinghouse">
                Drug &amp; Alcohol Clearinghouse
              </Link>{" "}
              is now in its sixth year of operation and fully
              phased in. The Clearinghouse-II rule, fully effective
              in late 2023, requires state driver licensing
              agencies (SDLAs) to query the Clearinghouse before
              any CDL issuance, transfer, renewal, or upgrade —
              which closed the practical loophole where prohibited
              drivers could move state to evade detection. The
              monthly summary reports published by FMCSA continue
              to show hundreds of thousands of CDL holders in
              prohibited status, with the return-to-duty process
              producing a slow throughput back into active
              operation. The annual-query and pre-employment-query
              compliance is now standard practice at every
              well-managed carrier. The labor-market implication —
              a tighter operator pipeline and upward pressure on
              driver pay — is the most significant downstream
              effect on owner-operator and small-fleet economics.
            </p>

            <h3>MCS-150 biennial update enforcement</h3>
            <p>
              The{" "}
              <Link href="/glossary/mcs-150">MCS-150</Link>{" "}
              biennial update requirement under 49 CFR Part 390.19
              has been the subject of stepped-up enforcement
              attention in 2024–2026. FMCSA has continued to use
              the MCS-150 update cycle as a hygiene mechanism —
              carriers with stale MCS-150 filings face deactivation
              of operating authority, and the agency&apos;s
              continued cleanup of the SAFER database is filtering
              out chameleon carriers and dormant authorities that
              had accumulated in earlier years. The practical
              effect on legitimate operators is administrative
              (the biennial update is straightforward), but the
              consequences for noncompliance are real.
            </p>

            <h3>Hours of Service — stable since 2020</h3>
            <p>
              <Link href="/glossary/hos">Hours of Service</Link>{" "}
              rules under 49 CFR Part 395 have been stable since
              the 2020 final rule that revised the split-sleeper
              and short-haul provisions. The 2020 changes — adding
              the 8/2 split-sleeper option, extending the
              short-haul air-mile radius, extending the
              adverse-driving exception, and adjusting the
              30-minute break to allow on-duty non-driving time —
              are widely adopted and well understood. No major HOS
              revision is on the FMCSA rulemaking docket as of
              April 2026, and the practical implementation through
              ELD is mature. Section{" "}
              <a href="#hos">8</a> covers this in more detail.
            </p>

            <h3>CSA scoring methodology under continued review</h3>
            <p>
              The Compliance, Safety, Accountability (CSA) program
              and its Safety Measurement System (SMS) scoring —
              the seven-BASIC framework that drives roadside
              inspection prioritization and intervention — has been
              under continued methodology review for several
              years. The FMCSA&apos;s prior Item Response Theory
              (IRT) replacement initiative was paused; subsequent
              methodology adjustments have been incremental rather
              than structural. The 2026 status is that the{" "}
              <Link href="/glossary/csa-score">CSA score</Link> is
              still public for carriers, still used by brokers and
              insurers for risk assessment, and still the dominant
              compliance scorecard. The structural concerns about
              SMS methodology (small-carrier statistical
              significance, peer-group construction, severity
              weighting) remain unresolved and the agency&apos;s
              public timeline for a methodology replacement
              remains indeterminate.
            </p>
          </section>

          <section className="research-section" id="broker-transparency">
            <h2>3. Broker transparency rule status</h2>
            <p>
              The proposed FMCSA broker transparency rule under{" "}
              <Link href="/glossary/fmcsa">49 CFR Part 371</Link>{" "}
              is the single most consequential open federal
              rulemaking for the small-carrier segment in 2026.
              The rule, in its NPRM form, would require brokers to
              provide the underlying load documentation to
              carriers on request — including the rate paid by the
              shipper — within a defined window (the NPRM
              referenced 48 hours), and would tighten record
              retention and prohibit waiver of the disclosure
              right in carrier contracts.
            </p>
            <p>
              The stakeholder positions are well documented. OOIDA
              has been the dominant carrier-side advocate, framing
              the rule as a long-overdue restoration of the
              information balance that has been eroded as broker
              market share of brokered freight has grown. The
              Owner-Operator Independent Drivers Association and
              affiliated small-carrier organizations have argued
              that the existing rule in 49 CFR Part 371 (in place
              since the 1980s) already grants disclosure rights
              that brokers have systematically denied in practice,
              and that the new rulemaking is necessary to give the
              right operational force. The Transportation
              Intermediaries Association has been the dominant
              broker-side opponent, arguing that mandatory
              disclosure of shipper rates would (a) damage
              competitive intelligence in a highly fragmented
              brokerage market, (b) burden brokers with
              record-keeping and disclosure overhead that
              ultimately gets priced into the spread, and (c) fail
              to address the genuine source of small-carrier
              frustration (rate-confirmation accuracy and broker
              payment delays).
            </p>
            <p>
              The litigation environment around the rule is
              indirect rather than direct. There is no active
              federal court challenge to the NPRM (because no
              final rule has issued), but the regulatory record is
              voluminous and the rule is expected to face
              Administrative Procedure Act challenges if and when
              it is finalized in substantively expanded form. The
              comment periods closed in 2024; the agency has
              indicated continued work on the rule but has not
              published a final-rule timeline. As of April 2026,
              there is no formal indication that the rule is
              imminent — but the regulatory record and the
              political pressure from the carrier side are both
              strong enough that finalization in some form before
              the end of 2026 is the base-case expectation on the
              Dispatched panel.
            </p>
            <p>
              What the rule would change if passed: the
              information asymmetry between brokers and small
              carriers, particularly on tight-capacity lanes where
              broker spreads can run 15–25% of load value (covered
              in our{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>{" "}
              report). The practical effect on carrier pricing
              power would be most concentrated in repeat lane
              pairs where the carrier has the option to
              renegotiate or to take the load elsewhere; on
              spot-market one-off loads, the effect would be more
              modest. The secondary effect on the factoring
              industry — which depends on the broker-pay
              relationship for invoice underwriting — would be a
              modest tightening of broker-pay risk visibility and
              a marginal improvement in factoring underwriting
              quality.
            </p>
            <p>
              Our 2026–2027 outlook on the rule: more likely than
              not to finalize in 2026 in some form, with phased
              implementation into 2027. The form may be narrower
              than the original NPRM — the carrier panel views a
              delayed-disclosure compromise (extending the 48-hour
              window, narrowing the documentation scope, or
              creating a meaningful exemption for new brokerage
              relationships) as the most plausible compromise
              outcome. Section <a href="#predictions">11</a>{" "}
              attaches a probability.
            </p>
          </section>

          <section className="research-section" id="ab5-faaaa">
            <h2>4. California AB 5 and FAAAA preemption</h2>
            <p>
              California AB 5, enacted in 2019, codified the
              California Supreme Court&apos;s Dynamex decision and
              applied an ABC test for{" "}
              <Link href="/glossary/independent-contractor-classification">
                independent contractor classification
              </Link>{" "}
              across most California labor and employment law. The
              ABC test presumes worker employment status unless
              the hiring entity establishes (A) freedom from
              control and direction, (B) work outside the usual
              course of the hiring entity&apos;s business, and (C)
              the worker is customarily engaged in an independently
              established trade. The B prong is the binding
              constraint in trucking: a motor carrier that hires
              an independent owner-operator to perform trucking
              services is, by any plain reading, hiring the worker
              to perform the carrier&apos;s usual course of
              business. Under a strict ABC reading, lease-on
              owner-operators in California are reclassified as
              employees of the motor carrier.
            </p>
            <p>
              The trucking industry response was the California
              Trucking Association v. Bonta litigation, arguing
              that AB 5 is preempted by the Federal Aviation
              Administration Authorization Act (FAAAA), which
              broadly preempts state laws &quot;related to the
              price, route, or service of any motor carrier.&quot;
              The litigation moved through the Ninth Circuit and
              the Supreme Court declined certiorari in 2022,
              leaving the Ninth Circuit&apos;s ruling — that AB 5
              is not categorically preempted by FAAAA — in place
              in the Ninth Circuit. The CTA returned to district
              court and the as-applied litigation has continued;
              as of April 2026, there is no Supreme Court
              resolution on the horizon and the practical
              regulatory state is durable ambiguity.
            </p>
            <p>
              The impact on lease-on owner-operators in California
              is structural. Every lease-on relationship in
              California now carries a misclassification exposure
              that gets scrutinized in any post-loss,
              post-employment, or post-injury litigation. Motor
              carriers operating lease-on programs in California
              have responded with a mix of strategies — converting
              lease-on relationships to W-2 employment, exiting
              the California lease-on market, restructuring
              owner-operator agreements to emphasize independence
              tests, and adopting two-step structures in which
              the owner-operator holds their own authority and
              the carrier provides only marketing or load-matching
              services. The third (independence-emphasis)
              strategy is fragile; the fourth (two-step) is the
              direction of the migration we see most consistently
              on the panel. Section{" "}
              <a href="#predictions">11</a> covers our 2026–2027
              outlook.
            </p>
            <p>
              Other states are adopting similar frameworks. New
              Jersey&apos;s ABC test (codified independently of
              AB 5 and pre-dating it) has been the subject of
              continued misclassification enforcement and the
              state has been aggressive on trucking-specific
              audits. Massachusetts has long had an ABC test
              under M.G.L. c. 149, § 148B; the Massachusetts
              construction-industry application has been
              extensively litigated and the trucking application
              is incrementally tightening. Oregon&apos;s SB 891
              (enacted 2021) and subsequent enforcement work
              parallels AB 5 in structure if not exact wording.
              Several other states — Connecticut, Illinois, New
              York — have considered ABC-style legislation without
              enacting it through April 2026. The directional
              pattern is clear: ABC-style worker classification
              continues to expand at the state level, FAAAA
              preemption arguments continue to lose at the
              circuit-court level, and the practical regulatory
              status quo for trucking is a patchwork of state
              regimes that motor carriers have to navigate by
              jurisdiction.
            </p>
            <p>
              The implication for owner-operators is that
              independent status — holding your own MC# and
              dispatching your own freight — is structurally less
              exposed than the lease-on alternative. Our{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>{" "}
              report covers the financial side of the comparison;
              the regulatory side simply layers an additional
              reason to prefer independence over lease-on for
              operators with the capital and operational capacity
              to make the transition.
            </p>
          </section>

          <section className="research-section" id="carb-phase3">
            <h2>5. CARB Phase 3 emissions</h2>
            <p>
              The California Air Resources Board (CARB)
              regulatory regime for heavy-duty trucks is the most
              aggressive state-level emissions framework in the
              country and the template that other state air boards
              are adopting. The 2026 regulatory landscape under
              CARB includes the Heavy-Duty Omnibus rule (NOx and
              particulate matter standards), the Advanced Clean
              Trucks rule (zero-emission vehicle sales mandates on
              manufacturers), and the Advanced Clean Fleets
              regulation (zero-emission fleet purchase and
              transition mandates on fleet operators). Layered on
              top of the CARB regime is EPA&apos;s March 2024
              Phase 3 GHG rule for heavy-duty vehicles, which
              ratchets greenhouse-gas emissions standards through
              2027–2032 nationally.
            </p>
            <p>
              CARB Phase 3 GHG standards begin implementing in
              2026. The cumulative effect on new Class 8 tractor
              pricing has been one of the structural drivers of
              the post-2021 price climb on new equipment;
              emissions-package compliance cost is the single
              largest contributor to the gap between 2021 new
              tractor pricing and 2026 new tractor pricing. The
              practical effect on the owner-operator and
              small-fleet segment has been a structurally extended
              hold period on existing equipment, as the
              relative-value calculation favors keeping a paid-off
              or partially-paid-off tractor longer rather than
              cycling to a higher-priced new unit.
            </p>
            <p>
              The zero-emission Class 8 tractor mandate timeline
              under Advanced Clean Fleets is the headline. For
              fleets meeting the high-priority and federal fleet
              definitions, the regulation requires phased
              zero-emission vehicle purchases starting 2024 with
              full zero-emission Class 8 vehicle purchases
              required by 2036 for affected fleets, and a 2042
              full-fleet zero-emission deadline. For drayage
              operations, the rule is more aggressive — all new
              drayage truck registrations after January 1, 2024
              must be zero-emission, with a full transition for
              all drayage by 2035. The litigation environment
              around Advanced Clean Fleets has been active; the
              regulation has faced challenges from the trucking
              industry and from other states, and the
              implementation timeline has been adjusted in
              response. The 2026 status is that Advanced Clean
              Fleets is in effect for most affected fleets, with
              ongoing legal and political uncertainty about the
              long-tail enforcement.
            </p>
            <p>
              Other state adoption is the most consequential
              second-order effect. Under Section 177 of the Clean
              Air Act, states are permitted to adopt California
              vehicle emissions standards (instead of the federal
              EPA baseline) for heavy-duty vehicles. As of April
              2026, roughly 15 states have adopted one or more
              California heavy-duty vehicle rules — Advanced
              Clean Trucks adoption is more widespread (covering
              roughly a third of new heavy-duty vehicle sales),
              while Advanced Clean Fleets adoption is narrower
              but expanding. The states that have adopted
              California standards in some form include New York,
              New Jersey, Massachusetts, Vermont, Maryland,
              Oregon, Washington, Colorado, Rhode Island, and a
              handful of others; the practical effect is that the
              California regulatory regime functionally governs a
              large share of the national heavy-duty fleet
              purchasing decision.
            </p>
            <p>
              The compliance pathway for legacy trucks is
              relatively favorable. CARB Phase 3 and EPA Phase 3
              GHG standards apply to new vehicle sales, not to
              existing equipment in operation. An owner-operator
              running a 2018 or 2020 model-year tractor is not
              required to retrofit or replace under either rule;
              the rules govern what carriers can buy new, not
              what they can keep operating. The exception is the
              California drayage and high-priority fleet
              definitions under Advanced Clean Fleets, which do
              govern existing operations within specified
              categories. For most owner-operators and small
              fleets running over-the-road freight outside the
              California drayage segment, the practical 2026
              effect is a structural shift in the new-truck
              purchase economics, not a forced retrofit or
              replacement of existing equipment.
            </p>
          </section>

          <section className="research-section" id="mca-disclosure">
            <h2>6. State-level MCA disclosure laws</h2>
            <p>
              State-level merchant cash advance (MCA) and
              commercial financing disclosure laws have expanded
              steadily over the past five years. The pattern
              parallels consumer-finance Truth in Lending — the
              underlying argument is that small-business
              borrowers, like consumer borrowers before the 1968
              Truth in Lending Act, are pricing financing
              products against quoted factor rates or fees that
              are not directly comparable, and that an
              APR-equivalent disclosure regime would allow
              borrowers to compare products on a consistent basis.
            </p>
            <p>
              The four states leading the regime in 2026 are
              California, New York, Utah, and Virginia. California
              SB 1235 (Department of Financial Protection and
              Innovation regulations effective December 2022) was
              the first major state to require APR-equivalent
              disclosure on commercial financing transactions
              under $500,000, with specific disclosure formats and
              data requirements. New York&apos;s Commercial
              Finance Disclosure Law (administered by NYDFS,
              effective August 2023) covers commercial financing
              transactions of $2.5 million or less and requires
              detailed disclosure including APR. Utah HB 387
              (effective 2023) requires registration of certain
              commercial financing transactions with a more
              limited disclosure regime. Virginia HB 1027
              (effective 2023) parallels the Utah and California
              models for transactions under $500,000.
            </p>
            <p>
              An additional roughly ten states have introduced or
              actively considered commercial finance disclosure
              legislation in 2025–2026. Connecticut, Illinois,
              New Jersey, Washington, Florida, Georgia, Missouri,
              Massachusetts, Maryland, and Texas have all had
              bills introduced or working groups active during the
              report horizon; the legislative outcomes vary, with
              Connecticut and Illinois the most likely 2026–2027
              entrants in our reading.
            </p>
            <p>
              The substantive distinction across state regimes is
              APR disclosure versus factor rate disclosure. APR
              disclosure requires the lender to translate the
              economics of the MCA product into an annualized
              percentage-rate equivalent, which surfaces the
              50–150% effective cost of MCA stacking against the
              14–34% cost of conventional working capital (covered
              in our{" "}
              <Link href="/research/state-of-trucking-capital-2026">
                State of Trucking Capital 2026
              </Link>{" "}
              report). Factor rate disclosure (the original MCA
              industry preference) presents the cost as a flat
              multiple — &quot;1.30 on $50,000&quot; — without
              translating to an APR, which is closer to the
              status quo. California, New York, and Virginia
              require APR-equivalent disclosure; Utah&apos;s
              regime is more limited. The proposed laws in other
              states largely follow the California/New York
              APR-disclosure template.
            </p>
            <p>
              The impact on the small-business lending market has
              been more modest than disclosure advocates predicted
              and more substantial than the MCA industry opposed.
              The practical effect through April 2026 is that
              APR-equivalent disclosure is now standard practice
              at the point of sale in the four lead states and
              compliance overhead has been the dominant
              cost-side effect on MCA providers. The market-share
              effect — MCA losing share to conventional working
              capital as the APR comparison becomes visible — has
              been modest in the short term but is the directional
              expectation over a multi-year horizon. Section{" "}
              <a href="#predictions">11</a> attaches a probability
              to additional state adoption through 2027.
            </p>
            <p>
              Enforcement levels vary materially across states.
              California (DFPI) has been the most active enforcer,
              with public investigations and consent orders;
              NYDFS has been similarly active. Utah and Virginia
              have lighter enforcement footprints. The compliance
              burden on MCA providers is real and growing; the
              direct consumer-protection effect at the operator
              level depends heavily on whether the disclosed APR
              is read and understood by the borrower at the point
              of decision, which remains the open question.
            </p>
          </section>

          <section className="research-section" id="eldt">
            <h2>7. ELDT (Entry-Level Driver Training) impact</h2>
            <p>
              The{" "}
              <Link href="/glossary/eldt">
                Entry-Level Driver Training
              </Link>{" "}
              regulation under 49 CFR Part 380 took effect in
              February 2022, requiring all new commercial driver
              license applicants (Class A and Class B initial
              issuance, hazmat endorsement, school bus
              endorsement, passenger endorsement) to complete
              theory and behind-the-wheel training from a
              registered training provider. The rule established
              the Training Provider Registry (TPR) and a
              standardized curriculum framework, replacing the
              prior state-by-state patchwork of training
              requirements that ranged from rigorous to nominal.
            </p>
            <p>
              Four years into the mandate, the structural impact
              on the new-CDL pipeline is now legible. The CDL
              training school market has consolidated and
              professionalized — operators that ran nominal
              training programs to satisfy state requirements have
              been displaced by registered training providers with
              compliant curriculum, instructors with documented
              qualifications, and standardized record-keeping.
              The Training Provider Registry counts thousands of
              registered providers, with the practical implication
              that the cost of obtaining a CDL has stepped up
              meaningfully.
            </p>
            <p>
              The driver-entry cost implication is the most
              consequential for new-authority owner-operators. The
              typical out-of-pocket cost of CDL Class A training
              at a registered provider runs $4,000–$8,000 in 2026
              for a four- to seven-week program, with regional
              variance pushing the upper end higher in tight
              labor markets. Carrier-sponsored CDL training
              programs (in which the carrier absorbs the training
              cost in exchange for a service commitment) remain
              the dominant entry path for company-driver-track
              applicants, but the service-commitment terms tend to
              run 12–24 months at a discount-to-market wage which
              functionally subsidizes the carrier&apos;s training
              investment.
            </p>
            <p>
              The new-authority owner-operator pipeline absorbs
              the full ELDT cost. A first-time owner-operator who
              completes CDL training, accumulates the typical
              minimum 6–12 months of driving experience, and
              transitions to independent authority has carried
              the $4,000–$8,000 training cost as part of the
              startup capital stack. Layered on top of the
              $20,000–$50,000 Year 1 capital requirement covered
              in our{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>{" "}
              report, the training cost is incremental rather than
              dominant, but it is real and durable. The
              directional implication is a marginally higher
              cost-of-entry for new authority, which contributes
              to the structural compression of new-authority
              registration counts off the 2021–2022 peak.
            </p>
            <p>
              The market-quality implication of ELDT, four years
              in, is mixed. The professionalization of training
              providers is real and the curriculum standardization
              has eliminated the worst of the pre-2022 nominal
              training abuses. Whether the structural reduction in
              roadside inspection violations, accident severity,
              or new-driver insurance pricing has materialized at
              a measurable level remains contested in the
              regulatory and industry research; the data so far is
              suggestive but not definitive. Our reading is that
              ELDT was a necessary modernization of an obsolete
              training framework, and the second-order effects
              will continue to compound through the rest of the
              decade as the cohort of ELDT-trained drivers
              accumulates operating experience.
            </p>
          </section>

          <section className="research-section" id="hos">
            <h2>8. Hours of Service stability</h2>
            <p>
              The{" "}
              <Link href="/glossary/hos">Hours of Service</Link>{" "}
              final rule of 2020 remains stable through 2026 with
              no major revisions on the FMCSA rulemaking docket.
              The 2020 final rule established four core
              modifications to the prior regime: an 8/2
              split-sleeper option (allowing drivers to split the
              required 10-hour off-duty period as 7+3 or 8+2 with
              specific timing constraints), an extension of the
              short-haul air-mile radius from 100 to 150 air-miles
              and the daily duty window from 12 to 14 hours for
              short-haul drivers, an extension of the
              adverse-driving condition exception to add 2 hours
              to the driving window, and a modification of the
              30-minute break requirement to require an
              on-duty/not-driving break rather than an off-duty
              break.
            </p>
            <p>
              The split-sleeper provisions are widely adopted in
              2026. The 8/2 and 7/3 split-sleeper combinations
              have become routine practice for long-haul OTR
              drivers managing fatigue and lane scheduling, and
              the ELD implementation of split-sleeper logic is
              mature across the major ELD providers. The
              short-haul air-mile extension has reduced the ELD
              recordkeeping burden for short-haul drivers
              operating within the 150-mile radius, which has
              practical effects on local delivery, drayage, and
              regional dedicated operations.
            </p>
            <p>
              The 30-minute break rule integration into ELD
              compliance is straightforward but operationally
              relevant. The 2020 rule shifted the break
              requirement to allow on-duty/not-driving time
              (loading, unloading, paperwork, fueling) to satisfy
              the requirement, which significantly reduced the
              effective duty-cycle impact of the break for
              drivers whose schedules naturally included
              on-duty non-driving time. The pre-2020 off-duty
              break requirement had been a persistent operator
              frustration and a regular source of HOS violation
              citations; the 2020 modification largely resolved
              the practical issue.
            </p>
            <p>
              No major HOS revision is on the horizon. The agency
              has not opened a major HOS rulemaking thread since
              the 2020 final rule, and the practical
              implementation through ELD is mature. The
              regulatory baseline through 2026–2027 is the 2020
              rule as written, with incremental guidance and
              interpretation continuing through the agency&apos;s
              standard regulatory-guidance channels. Operators
              and carriers should plan compliance and dispatch
              against the 2020 framework as a stable input.
            </p>
          </section>

          <section className="research-section" id="taxation">
            <h2>9. State-level commercial trucking taxation</h2>
            <p>
              The commercial trucking taxation regime in 2026 is
              dominated by the same set of multistate compacts and
              federal-level taxes that have been stable for years.
              The two compacts — the International Registration
              Plan (IRP) for apportioned vehicle registration and
              the International Fuel Tax Agreement (IFTA) for
              fuel-tax reporting — continue to govern the
              administrative side of cross-state commercial
              operation. The federal Heavy Vehicle Use Tax
              (HVUT), the state-level fuel-tax landscape, and the
              Unified Carrier Registration (UCR) fee schedule
              round out the major tax-side compliance items.
            </p>
            <p>
              IRP and IFTA stability is the dominant 2026 story
              on the multistate side. Both compacts are
              well-administered through their joint
              implementations and the base-state administrative
              model is mature. The IRP apportionment formula
              continues to be based on the percentage of
              total fleet mileage operated in each member
              jurisdiction; the IFTA fuel-tax reconciliation
              continues to be based on miles operated and fuel
              consumed in each member jurisdiction. The ELD
              data-integration improvements covered in section{" "}
              <a href="#fmcsa-landscape">2</a> have made IFTA
              compliance materially easier for owner-operators
              and small fleets, with several ELD providers now
              offering integrated IFTA mileage reporting that
              substantially reduces the manual reconciliation
              burden.
            </p>
            <p>
              The state-level fuel-tax landscape continues to
              show meaningful variation. State diesel taxes
              range from roughly 16¢/gallon at the low end (Texas
              is among the lowest) to over 70¢/gallon at the high
              end (Pennsylvania at the top, California next). The
              California carbon-credit overlay on diesel —
              implemented through the cap-and-trade program and
              the Low Carbon Fuel Standard — adds an additional
              implicit cost on California-fueled diesel that
              accumulates with the explicit state diesel tax to
              produce the highest effective diesel cost in the
              country. The implications for owner-operator
              economics are covered in our{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>{" "}
              report.
            </p>
            <p>
              The federal Heavy Vehicle Use Tax (HVUT, IRS Form
              2290) remains stable at the $550 annual maximum for
              tractors above 75,000 lb GVW, with scaled lower
              rates for lighter vehicles. The HVUT is the simplest
              tax in the commercial trucking compliance stack:
              one annual filing, one annual payment, evidence of
              payment required for state vehicle registration.
              The 2026 HVUT regime is unchanged from prior years.
            </p>
            <p>
              The UCR fee schedule continues its annual review
              cycle through the Unified Carrier Registration plan
              with modest year-to-year fee adjustments. The 2026
              UCR fee schedule prices fleets in nine bands by
              fleet size, ranging from roughly $46 annually for
              1–2 truck fleets at the bottom band to $44,000+
              annually for 1,001+ truck fleets at the top band.
              The UCR is a state-administered, federally-required
              fee that is owed in the base state of registration;
              the fee schedule applies regardless of operating
              footprint.
            </p>
          </section>

          <section className="research-section" id="insurance">
            <h2>10. Insurance regulatory landscape</h2>
            <p>
              The insurance regulatory environment for commercial
              trucking in 2026 is defined by stable federal
              minimums under 49 CFR Part 387, ongoing state-level
              tort reform activity in response to the
              nuclear-verdict environment, and a hard insurance
              market that has produced both regulatory pressure
              and carrier-side capacity constraints. The full
              insurance market picture is in our{" "}
              <Link href="/research/state-of-commercial-trucking-insurance-2026">
                State of Commercial Trucking Insurance 2026
              </Link>{" "}
              report; the regulatory side is summarized here.
            </p>
            <p>
              FMCSA minimum levels of financial responsibility
              under 49 CFR Part 387 remain unchanged in 2026. The
              minimum primary liability for general freight
              remains $750,000; for vehicles transporting
              hazardous materials in certain categories the
              minimum is $1,000,000 or $5,000,000 depending on
              the material; for passenger carriers the minimum is
              $1,500,000 or $5,000,000 depending on vehicle
              capacity. The cargo insurance minimum under 49 CFR
              Part 387.303 remains $5,000 per vehicle and $10,000
              per occurrence for motor carriers transporting
              non-exempt household goods, with no minimum
              required for general-freight cargo insurance under
              federal regulations (though brokers and shippers
              routinely require $100,000+ in cargo coverage as a
              contract term).
            </p>
            <p>
              State-level minimum proposals have continued. HR
              2687 in the 2021–2022 Congress (the &quot;INSURANCE
              for Truckers Act&quot;) would have raised the
              federal general-freight liability minimum to $5
              million; the bill did not advance to enactment, and
              successive versions in subsequent Congresses have
              similarly failed to advance. A handful of states
              have pushed for higher effective minimums on
              intrastate operations — New York and Connecticut
              are the most cited examples — but the federal
              minimum framework remains the binding constraint
              for interstate operations. The political pressure
              from the plaintiffs&apos; bar and consumer
              advocacy groups for higher minimums continues, and
              the counter-pressure from the trucking industry
              has been similarly persistent; the practical 2026
              outcome is no change, and the same is the most
              likely 2027 outcome.
            </p>
            <p>
              The nuclear-verdict environment has driven
              state-level tort reform proposals in several
              jurisdictions. Texas HB 19 (effective September
              2021) limited certain commercial-trucking lawsuit
              practices and bifurcated trials in qualifying
              cases. Florida HB 837 (effective March 2023)
              tightened comparative negligence and bad-faith
              standards in personal-injury litigation. Georgia
              SB 68 and SB 69 (the 2025 Georgia tort reform
              package) similarly addressed bifurcation,
              evidence of seatbelt use, and other procedural
              issues that had been unfavorable to commercial
              defendants in nuclear-verdict cases. The trend in
              southern and tort-reform states is incremental
              improvement; the non-reform states (California,
              Illinois, New York, New Jersey) continue to price
              the venue exposure into commercial-trucking
              premiums and the carriers writing dedicated
              trucking specialty business continue to redline or
              surcharge those jurisdictions.
            </p>
            <p>
              The hard insurance market regulatory implications
              are second-order but significant. Surplus-lines
              placement is now a larger share of the small-fleet
              commercial-auto book than at any point in recent
              memory; surplus-lines insurance is governed by a
              different state regulatory regime than admitted
              insurance (lighter rate regulation, no
              participation in state guarantee associations), and
              the increasing surplus-lines share has implications
              for both pricing and consumer protection. State
              insurance departments have responded with varying
              degrees of attention; the National Association of
              Insurance Commissioners (NAIC) continues to monitor
              the commercial-auto trend without coordinated
              regulatory action.
            </p>
          </section>

          <section className="research-section" id="predictions">
            <h2>11. Predictions for 2026–2027</h2>
            <p>
              Five specific, falsifiable predictions for the next
              18 months.
            </p>
            <ol className="research-list">
              <li>
                <strong>
                  FMCSA broker transparency rule finalizes in
                  2026 with phased implementation in 2027.
                </strong>{" "}
                Some form of the proposed rule is more likely
                than not to land within the report horizon; the
                form may be narrower than the original NPRM, with
                a delayed-disclosure compromise (extended
                disclosure window, narrowed documentation scope,
                or new-relationship exemption) the most plausible
                compromise outcome. Probability the rule
                finalizes in some form in 2026: moderate (50–60%).
              </li>
              <li>
                <strong>
                  California AB 5 / FAAAA preemption litigation
                  produces no Supreme Court resolution by end of
                  2027.
                </strong>{" "}
                The Ninth Circuit ruling stands; as-applied
                litigation continues in the district court; the
                practical state remains durable ambiguity through
                the report horizon. Motor carriers and operators
                will continue to adapt structurally
                (independence-track conversions, two-step
                load-matching arrangements, W-2 conversions for
                California-domiciled lease-on books) rather than
                wait for legal clarity. Probability of no Supreme
                Court resolution: high (greater than 75%).
              </li>
              <li>
                <strong>
                  CARB Phase 3 implementation faces continued
                  litigation challenges, but the regulation
                  remains in effect through 2026–2027.
                </strong>{" "}
                The Advanced Clean Fleets regulation has faced
                and will continue to face legal challenges from
                the trucking industry and from non-California
                states; the substantive timeline may be adjusted
                in response, but a full vacatur is unlikely
                within the report horizon. Other states adopting
                California heavy-duty standards will continue to
                expand; we expect 2–3 additional states to
                formally adopt one or more California heavy-duty
                rules through 2027. Probability: high (greater
                than 70%).
              </li>
              <li>
                <strong>
                  Three to five additional states pass commercial
                  finance / MCA disclosure laws by end of 2027.
                </strong>{" "}
                Following the California, New York, Utah, and
                Virginia template, we expect Connecticut,
                Illinois, New Jersey, Washington, and either
                Florida or Massachusetts as the likeliest next
                entrants. The market effect through 2026 will be
                marginal; the cumulative effect over 24–36 months
                is meaningful as APR-equivalent disclosure
                becomes standard at the point of sale.
                Probability: high (greater than 65%).
              </li>
              <li>
                <strong>
                  Federal labor classification rulemaking or
                  legislative action remains stalled through
                  2026.
                </strong>{" "}
                The federal independent-contractor classification
                framework (the Department of Labor 2024 rule
                under the FLSA, and its subsequent regulatory and
                judicial challenges) is unlikely to produce a
                stable resolution within the report horizon.
                Congressional action on a federal ABC test or a
                federal Restricted Independent Contractor
                framework remains unlikely under current
                political alignment. State-level activity will
                continue to be the dominant variable.
                Probability of no federal resolution: high
                (greater than 70%).
              </li>
            </ol>
            <p>
              One prediction we are watching but not yet betting
              on: FMCSA rulemaking on lease-purchase following
              the Truck Leasing Task Force final report. The
              regulator has the foundation for action; there is
              no specific NPRM on the docket as of April 2026. If
              it lands, the financing-market effect on the
              new-authority and lease-on segments would be
              meaningful. Our base case is a proposed rule
              before the end of 2027 rather than 2026.
            </p>
          </section>

          <section className="research-section" id="methodology">
            <h2>12. Methodology and sources</h2>
            <p>
              This report draws on four categories of source.
              First, public regulatory and rulemaking data — FMCSA
              Federal Register notices and dockets (broker
              transparency NPRM under 49 CFR Part 371, Hours of
              Service final rule, ELDT regulation, Drug &amp;
              Alcohol Clearinghouse rules), FMCSA SAFER
              registration data, the FMCSA Truck Leasing Task
              Force final report, EPA Phase 3 GHG heavy-duty
              vehicle final rule, and California Air Resources
              Board Advanced Clean Trucks and Advanced Clean
              Fleets rule texts. Second, state-level legislative
              and regulatory records — California AB 5 and SB
              1235, New York Commercial Finance Disclosure Law,
              Utah HB 387, Virginia HB 1027, and the comparable
              proposed bills in other states tracked through
              public legislative records. Third, industry
              association position papers and regulatory comments
              — OOIDA carrier-side filings, ATA industry-side
              filings, and TIA broker-side filings on the broker
              transparency NPRM and related rulemakings. Fourth,
              public legal filings in the California Trucking
              Association v. Bonta litigation and the parallel
              FAAAA preemption cases, and AmTrust and other
              commercial-auto insurance market commentary on the
              hard market and tort reform.
            </p>
            <p>
              Time horizon: rules in effect or proposed through
              April 2026. Where the report cites rule status,
              that status is the public regulatory record as of
              the report&apos;s publication date and should be
              expected to shift as the rulemaking calendar
              advances. Where the report makes a forward-looking
              prediction, we have attempted to make the
              prediction specific, time-bound, and falsifiable —
              and to attach an explicit probability where the
              underlying signal supports one.
            </p>
            <p>
              Disclosures: Dispatched is a matching platform for
              commercial trucking financing and trucking
              insurance. Dispatched maintains commercial
              relationships with a panel of trucking lenders,
              factors, and insurance producers referenced
              throughout the related research reports; those
              relationships are documented in our{" "}
              <Link href="/methodology">methodology</Link> page
              and on the relevant vertical pages. This report
              references public regulatory and rulemaking sources
              throughout; readers should refer to those primary
              sources (FMCSA Federal Register dockets, state
              legislative records, court filings) for primary
              data. The report does not contain proprietary,
              paid, or vendor-licensed regulatory data feeds.
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
              through the 2026 regulatory environment, the report
              above maps to a small set of practical glossary
              entries and product pages on the Dispatched panel.
            </p>
            <div className="research-cta-grid">
              <Link
                href="/glossary/fmcsa"
                className="research-cta-card"
              >
                <h3>FMCSA glossary</h3>
                <p>
                  Definitions and operating context for the
                  Federal Motor Carrier Safety Administration —
                  authority registration, MCS-150, and the
                  rulemaking calendar.
                </p>
              </Link>
              <Link
                href="/glossary/eld"
                className="research-cta-card"
              >
                <h3>ELD</h3>
                <p>
                  Electronic logging device requirements under
                  49 CFR Part 395 — mandate scope, exemptions,
                  and the operational footprint for owner-ops.
                </p>
              </Link>
              <Link
                href="/glossary/drug-alcohol-clearinghouse"
                className="research-cta-card"
              >
                <h3>Drug &amp; Alcohol Clearinghouse</h3>
                <p>
                  FMCSA Clearinghouse — pre-employment and
                  annual query requirements, prohibited-driver
                  count, and the labor-market implications.
                </p>
              </Link>
              <Link
                href="/glossary/independent-contractor-classification"
                className="research-cta-card"
              >
                <h3>Independent contractor classification</h3>
                <p>
                  ABC test, FAAAA preemption, AB 5, and the
                  state-by-state classification framework for
                  owner-operator and lease-on relationships.
                </p>
              </Link>
              <Link
                href="/glossary/lease-purchase"
                className="research-cta-card"
              >
                <h3>Lease-purchase</h3>
                <p>
                  Lease-purchase structure, the FMCSA Truck
                  Leasing Task Force findings, and the
                  comparison to conventional equipment financing.
                </p>
              </Link>
              <Link
                href="/glossary/mca"
                className="research-cta-card"
              >
                <h3>Merchant cash advance</h3>
                <p>
                  MCA product structure, factor-rate vs APR
                  disclosure, and the state-level disclosure
                  regime under California SB 1235, New York
                  NYDFS, Utah HB 387, and Virginia HB 1027.
                </p>
              </Link>
            </div>
            <p style={{ marginTop: "1.5rem" }}>
              See also: the{" "}
              <Link href="/research">Dispatched Research index</Link>
              , the{" "}
              <Link href="/research/state-of-trucking-capital-2026">
                State of Trucking Capital 2026
              </Link>{" "}
              report,{" "}
              <Link href="/research/state-of-owner-operator-economics-2026">
                State of Owner-Operator Economics 2026
              </Link>
              ,{" "}
              <Link href="/research/state-of-commercial-trucking-insurance-2026">
                State of Commercial Trucking Insurance 2026
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
