import type { Metadata } from "next";
import Link from "next/link";
import EditorialByline from "@/components/landing/EditorialByline";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  financialProduct,
} from "@/components/seo/JsonLd";

/* /freightliner-repair-financing — brand-specific repair landing.
   Template for the brand-cluster (Peterbilt, Kenworth, Volvo, Mack to
   follow once this validates). Mirrors /truck-repair-loans structurally
   with Freightliner-specific repair-line content (DD15, DT12, after-
   treatment) replacing the generic content. */

export const metadata: Metadata = {
  title:
    "Freightliner repair financing — same-day funds for Cascadia, M2, Argosy | Dispatched",
  description:
    "Freightliner down? Match with trucking-friendly lenders for $5K–$150K. Soft pull, FICO from 500. Funds same banking day after sign-off. Cascadia, M2, Argosy, Coronado, Columbia.",
  alternates: { canonical: "/freightliner-repair-financing" },
  openGraph: {
    title:
      "Freightliner repair financing — same-day funds for Cascadia, M2, Argosy | Dispatched",
    description:
      "Freightliner down? Match with trucking-friendly lenders for $5K–$150K. Soft pull, FICO from 500. Funds same banking day after sign-off. Cascadia, M2, Argosy, Coronado, Columbia.",
    url: "/freightliner-repair-financing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Freightliner repair financing — same-day funds for Cascadia, M2, Argosy | Dispatched",
    description:
      "Freightliner down? Match with trucking-friendly lenders for $5K–$150K. Soft pull, FICO from 500. Funds same banking day after sign-off. Cascadia, M2, Argosy, Coronado, Columbia.",
  },
};

const PAGE_URL = "https://dispatched.finance/freightliner-repair-financing";

const faqs = [
  {
    q: "Can I finance the repair if I'm at a non-Freightliner shop?",
    a: "Yes. The Dispatched panel does not require the work to be done at a Freightliner-authorized service center. Independent diesel specialists, Detroit-authorized shops, and general truck repair facilities are all accepted. The lender verifies the shop's W-9 and the estimate, not the franchise affiliation. Operators routinely use independent shops for higher-mileage Cascadias where dealer-network parts pricing would push the job over the financing band.",
  },
  {
    q: "What APR should I expect on a Freightliner repair loan?",
    a: "The observed panel range is 14% to 34% APR for working-capital-style repair loans, and 9% to 18% APR when the repair is rolled into an equipment-secured product on a tractor with sufficient remaining value. A Cascadia with two to three years of service life remaining typically supports the secured product; an older Columbia or Argosy with marginal residual value usually does not. The exact APR depends on credit band, time in business, monthly revenue, and lender underwriting — you see it on the term sheet before signing.",
  },
  {
    q: "Can I roll the repair into my existing Freightliner equipment loan?",
    a: "Sometimes, with the original equipment lender, depending on the remaining loan balance and the residual value of the tractor. The Dispatched panel does not handle that re-amortization directly — it is a conversation between the operator and the original lender. The Dispatched product class is short-term unsecured working-capital financing that funds same-banking-day; the equipment-secured rewrite is a slower process that fits when the timeline is not urgent and the equity in the truck is sufficient.",
  },
  {
    q: "My Cascadia is still under Freightliner extended warranty — does that affect financing?",
    a: "Extended warranty coverage is between the operator and Daimler Truck Financial or whichever entity wrote the contract — Dispatched does not coordinate with the warranty company. If part of the repair is covered by the warranty, the operator pays the deductible and any non-covered scope out of pocket or with financing; the lender funds the operator-side amount. Operators routinely finance the non-covered portion of a partially-warranty-covered job.",
  },
  {
    q: "How does the panel handle older Freightliners — pre-2014 Columbia and Argosy?",
    a: "Older Freightliners route to a smaller subset of the panel that underwrites on operation strength rather than equipment value. The repair-loan band is unchanged; the equipment-secured product is generally not available because the residual on a pre-2014 unit does not support it. Operators running these trucks tend to be specialists with strong operating history, which the underwriting credits.",
  },
  {
    q: "Can I finance the repair if my truck is currently sitting at the shop?",
    a: "Yes. The Dispatched workflow is built specifically for the case where the truck is at the shop and the operator needs the wire today. There is no requirement that the truck be roadworthy or inspected at the time of application. Soft approval and lender match typically come back within 20 minutes of submitting; the wire lands the same banking day after the chosen lender countersigns, provided it clears before the bank's cutoff.",
  },
  {
    q: "What about a Freightliner with an active recall — does the repair financing change?",
    a: "Recall work is covered by the manufacturer at no cost to the operator; financing for that scope is unnecessary. Repairs adjacent to but not covered by the recall — for example, secondary damage from a recall-related failure — fit the financing product normally. The lender funds the non-recall scope; the operator coordinates the recall work with the dealer separately.",
  },
  {
    q: "Will applying for Freightliner repair financing hurt my credit?",
    a: "Not at the start. The Dispatched application is a soft-pull match — soft inquiries are not visible to other lenders and do not affect your score. A hard pull only happens after you pick a specific lender and move forward on their term sheet.",
  },
];

export default function FreightlinerRepairFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Freightliner repair financing", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Freightliner repair financing for owner-operators and small fleets",
          description:
            "How Freightliner repair financing works on the Dispatched panel: soft-pull match, brand-specific repair lines (DD15, DT12, after-treatment), eligibility floors, and the application-to-wire flow.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Freightliner repair financing",
          description:
            "Freightliner repair financing of $5K–$150K for owner-operators and small fleets running Cascadia, M2, Argosy, Coronado, and Columbia tractors. Same-banking-day funds, soft-pull match, FICO from 500.",
          url: PAGE_URL,
          category: "Commercial trucking financing",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        {/* SECTION: HERO ============================================== */}
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Freightliner repair financing</span>
            <h1 className="ins-hero-title">
              Same-day Freightliner repair financing for owner-operators and small fleets.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              Whether it&rsquo;s a Cascadia with a DD15 EGR cooler leak, an M2
              box truck with after-treatment fault codes, or an older Columbia
              with transmission work, the Dispatched panel funds Freightliner
              repairs from $5K to $150K with same-banking-day wires after the
              chosen lender signs off. Underwriting is on revenue and deposit
              history, not FICO alone — programs route from a 500 FICO floor.
              No hard pull until you pick a lender.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link
                href="/calculators/truck-repair"
                className="btn btn--secondary btn--lg"
              >
                Try the calculator
              </Link>
            </div>
            <p className="product-hero-note">
              No hard credit pull to start. · Takes about 2 minutes.
            </p>
          </div>
        </section>

        {/* SECTION: SHORT ANSWER ===================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">Same product class, brand-specific repair lines.</h2>
            <p className="ins-hero-sub">
              A Freightliner repair loan on the Dispatched panel is
              structurally identical to a{" "}
              <Link href="/truck-repair-loans">truck repair loan</Link> on any
              other model — short unsecured commercial term financing
              underwritten against the operation&rsquo;s working capital. The
              reason a brand-specific page exists is that Freightliner repair
              lines tend to cluster around a recognizable set of issues, and
              operators searching brand-specifically usually know exactly what
              they need funded.
            </p>
            <p className="ins-hero-sub">
              The Cascadia is the most common tractor on the road and the most
              common subject of repair financing on the panel. The recurring
              repair lines — DD13 and DD15 after-treatment work, DT12
              automated-manual transmission service, NOx sensor replacement,
              head gasket and EGR cooler work on higher-mileage units — are
              well-documented in the technician community and well-priced by
              trucking-friendly lenders. Funding the work does not require a
              different product class than a Peterbilt or Kenworth repair;
              what differs is operator search intent.
            </p>
            <p className="ins-hero-sub">
              Repair loans fund as working-capital-style unsecured advances
              against the operation&rsquo;s cashflow. There is no lien against
              the Cascadia, no{" "}
              <Link href="/glossary/ucc-1">UCC-1</Link> filing, no equipment
              appraisal in the way of a wire. That is what lets the money
              move the same banking day after sign-off. Existing financing on
              the tractor — most Cascadias under five years old are still on
              an equipment loan — does not block the repair financing,
              because the repair financing is not secured against the
              equipment.
            </p>
          </div>
        </section>

        {/* SECTION: REPAIR LINES ===================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">The Freightliner repair lines we see</span>
            <h2 className="ins-hero-title">Recurring categories on the panel.</h2>
            <p className="ins-hero-sub">
              In rough order of frequency. Cost ranges are general industry
              observations, not lender-quoted figures.
            </p>
            <ul className="product-list">
              <li>
                <strong>DD15 / DD13 after-treatment work.</strong> EGR cooler
                failures, DEF dosing valve faults, DPF differential pressure
                sensor replacement, SCR catalyst service. These run from a
                few thousand dollars for a sensor replacement up into the
                low five figures for an EGR cooler with collateral damage to
                the head. Common on Cascadias in the 400K to 650K mile band.
              </li>
              <li>
                <strong>DD15 head gasket and lower-end work.</strong>{" "}
                Higher-mileage Cascadias presenting with coolant in the oil
                or compression leaks. Engine-out work runs into the high five
                figures and is one of the more common reasons to finance the
                repair rather than absorb it.
              </li>
              <li>
                <strong>DT12 automated-manual transmission service.</strong>{" "}
                Actuator failures, clutch service, software updates. The DT12
                is reliable across its service life but the actuator work is
                specialty-shop territory and prices accordingly.
              </li>
              <li>
                <strong>Rear-axle and differential.</strong> Detroit DA-RT
                and Meritor axles, common in older Cascadias. Bearing
                service, ring-and-pinion, full housing rebuilds.
              </li>
              <li>
                <strong>Cab and HVAC.</strong> Cab harness corrosion on
                older Cascadias, HVAC condenser and compressor work.
                Smaller-ticket repairs that still take the truck out of
                service.
              </li>
              <li>
                <strong>Accident damage.</strong> Collision repair on a
                Cascadia frequently includes hood, fender, cab corner, and
                sometimes structural work behind the cab. The financing fits
                even when the truck has not yet been declared a total loss
                by the insurer — operators routinely finance the cash gap
                while the insurance claim adjudicates.
              </li>
              <li>
                <strong>M2 box-truck repairs.</strong> Smaller-class
                Freightliner work, often in the $5K to $25K band — brakes,
                suspension, after-treatment, transmission. The product class
                is the same; the loan sizes run smaller.
              </li>
              <li>
                <strong>Older Columbia and Argosy work.</strong> Operators
                running pre-2014 Freightliner tractors face a different
                parts-availability picture and tend to need financing for
                engine swaps, transmission rebuilds, and accident repairs.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: ELIGIBILITY ====================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">Eligibility floors on our panel.</h2>
            <ul className="product-list">
              <li>
                <strong>Active <Link href="/glossary/dot-number">DOT number</Link>.</strong>{" "}
                Authority in good standing with{" "}
                <Link href="/glossary/fmcsa">FMCSA</Link>. Recently revoked or
                out-of-service authorities route to a smaller specialist
                subset of the panel.
              </li>
              <li>
                <strong>500+ FICO.</strong> Programs route from 500. Sub-580
                borrowers should expect rates toward the high end of the
                observed 14% to 34% APR panel range and tighter loan amounts.
                680+ unlocks the full product set.
              </li>
              <li>
                <strong>6+ months of business history.</strong> Under six
                months narrows the fit; new-authority repair financing routes
                through a different lender subset.
              </li>
              <li>
                <strong>Active business bank account.</strong> Three months of
                business bank statements are part of the verification step.
              </li>
              <li>
                <strong>The Freightliner is yours or in your fleet.</strong>{" "}
                The financing is not secured against the truck, so existing
                equipment financing on the Cascadia does not block the repair
                loan — but the truck does need to be in the operating
                entity&rsquo;s fleet, not a rental or borrowed unit.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: DOCUMENTS ======================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Documents</span>
            <h2 className="ins-hero-title">What you&rsquo;ll need to apply.</h2>
            <p className="ins-hero-sub">
              Standard repair-loan document set. The Freightliner-specific
              addition is the shop work order or estimate from the authorized
              service center or independent shop — used to confirm the
              repair scope and amount, not to assign the loan to the shop.
            </p>
            <ul className="product-list">
              <li>
                <strong>Last 3 months of business bank statements.</strong>{" "}
                PDF exports from online banking work.
              </li>
              <li>
                <strong><Link href="/glossary/ein">EIN</Link> or SSN.</strong>{" "}
                Sole-prop uses SSN; LLCs and corporations use the EIN on file
                with the IRS.
              </li>
              <li>
                <strong>DOT number.</strong> Confirms authority status and
                operating history with FMCSA.
              </li>
              <li>
                <strong>Driver&rsquo;s license.</strong> Identity verification
                only.
              </li>
              <li>
                <strong>Shop estimate or work order for the Freightliner repair.</strong>
              </li>
              <li>
                <strong>Schedule C or 1120 (loans over $75K).</strong>{" "}
                Most-recent year&rsquo;s tax return for the operating entity.
              </li>
              <li>
                <strong>Settlement statements (loans over $75K, by lender request).</strong>{" "}
                Used to corroborate revenue against the bank statements.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: COMPOSITE SCENARIO =============================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a Cascadia DD15 EGR cooler request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-op, one 2019 Cascadia with a DD15, 542K miles, 3.5
                  years operating authority.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Truck regened twice yesterday, derated this morning, towed
                  to an authorized Freightliner service center outside
                  Indianapolis. Diagnosis: EGR cooler failure with secondary
                  damage to the intake manifold. Written estimate $22,400
                  plus $1,800 in associated sensor and DEF work.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Estimator output</span>
                <span className="product-example-value">
                  Best fit:{" "}
                  <strong>truck repair financing</strong>. Working capital
                  also fits if operator wants a buffer for the 6–9 day
                  downtime.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Match output</span>
                <span className="product-example-value">
                  $25,000 at 22% APR, 18-month term, $1,545 monthly. Funded
                  the same banking day after sign-off.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">APR band</span>
                <span className="product-example-value mono">
                  14% – 24% APR (observed panel range for this credit tier;
                  final APR set by the chosen lender)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PROCESS ========================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How the money moves</span>
            <h2 className="ins-hero-title">From application to wire.</h2>
            <ol className="product-process">
              <li>
                <strong>Application.</strong> Two minutes inside{" "}
                <Link href="/apply">/apply</Link>. Revenue, time in business,
                DOT number, the Cascadia or M2 details, repair amount, shop.
                Soft-pull only.
              </li>
              <li>
                <strong>Soft-pull match.</strong> Redacted profile routes to
                lenders most likely to fund the repair amount and operator
                profile.
              </li>
              <li>
                <strong>Offers.</strong> APR, term, and total cost on each
                term sheet, side by side. No bait-and-switch.
              </li>
              <li>
                <strong>One hard pull.</strong> Only after the operator picks
                a specific lender.
              </li>
              <li>
                <strong>Wire.</strong> Same banking day after the chosen
                lender signs off, when the wire instruction lands before the
                bank&rsquo;s cutoff. Direct-to-shop or direct-to-business
                depending on the term sheet.
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION: FAQ ============================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions we get on Freightliner repair financing.
            </h2>
            <dl className="product-faq">
              {faqs.map((qa) => (
                <div key={qa.q} className="product-faq-item">
                  <dt>{qa.q}</dt>
                  <dd>{qa.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* SECTION: FINAL CTA ======================================== */}
        <section>
          <div className="ins-container">
            <h2 className="ins-hero-title">Get the Cascadia back on the road.</h2>
            <p className="ins-hero-sub">
              Soft-pull match first. One hard pull only with the lender you
              choose. Wire same banking day after sign-off.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link
                href="/calculators/truck-repair"
                className="btn btn--secondary btn--lg"
              >
                Or estimate your fit →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION: RELATED ========================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/truck-repair-loans">Truck repair loans →</Link>
              </li>
              <li>
                <Link href="/semi-truck-financing">Semi-truck financing →</Link>
              </li>
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing →
                </Link>
              </li>
              <li>
                <Link href="/box-truck-financing">Box truck financing →</Link>
              </li>
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing →
                </Link>
              </li>
              <li>
                <Link href="/equipment-financing">Equipment financing →</Link>
              </li>
              <li>
                <Link href="/calculators/truck-repair">
                  Truck repair fit estimator →
                </Link>
              </li>
              <li>
                <Link href="/methodology">Methodology →</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
