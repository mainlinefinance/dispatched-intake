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
} from "@/components/seo/JsonLd";

/* /reefer-breakdown-coverage — hybrid coverage explainer + financing hub.
   This is not a financing product page; the JSON-LD intentionally omits
   financialProduct because the coverage itself is an insurance endorsement,
   not a Dispatched-panel product. The financing-gap section routes to
   /truck-repair-loans, /trucking-working-capital, and /factoring for the
   unit-rebuild side of the same event. */

export const metadata: Metadata = {
  title:
    "Reefer breakdown coverage — what it covers, what it doesn't, what to do mid-haul | Dispatched",
  description:
    "Refrigeration breakdown coverage explained: how the cargo endorsement works, what perishables get reimbursed, what the policy excludes, and the financing gap when the reefer unit itself needs an emergency rebuild.",
  alternates: { canonical: "/reefer-breakdown-coverage" },
  openGraph: {
    title:
      "Reefer breakdown coverage — what it covers, what it doesn't, what to do mid-haul | Dispatched",
    description:
      "Refrigeration breakdown coverage explained: how the cargo endorsement works, what perishables get reimbursed, what the policy excludes, and the financing gap when the reefer unit itself needs an emergency rebuild.",
    url: "/reefer-breakdown-coverage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Reefer breakdown coverage — what it covers, what it doesn't, what to do mid-haul | Dispatched",
    description:
      "Refrigeration breakdown coverage explained: how the cargo endorsement works, what perishables get reimbursed, what the policy excludes, and the financing gap when the reefer unit itself needs an emergency rebuild.",
  },
};

const PAGE_URL = "https://dispatched.finance/reefer-breakdown-coverage";

const faqs = [
  {
    q: "What is reefer breakdown coverage?",
    a: "Reefer breakdown coverage is an endorsement added to a motor truck cargo insurance policy that pays for cargo loss when the cause of loss is a mechanical or electrical failure of the refrigeration unit. It is not a standalone policy and it is not equipment-physical-damage coverage. The endorsement carries its own deductible and a set of conditions — most importantly, continuous temperature monitoring records and confirmation that the cargo was at the correct temperature at pickup. Without the endorsement, the underlying cargo policy explicitly excludes mechanical-failure losses.",
  },
  {
    q: "Does reefer breakdown coverage pay for the repair to the unit?",
    a: "No. The endorsement is cargo coverage — it reimburses the spoiled load value within policy limits and conditions. The repair to the refrigeration unit itself is the operator's expense and runs separately. Funding the unit repair is what the Dispatched repair-financing match is built for: $5K to $150K in same-banking-day funds after the chosen lender signs off, underwritten on revenue, not on the cargo claim.",
  },
  {
    q: "What temperature documentation does the carrier require?",
    a: "Carriers typically require a downloadable temperature log from the reefer microprocessor showing continuous temperature data across the haul, plus the pickup pulp temperature reading documented on the bill of lading, plus the setpoint history. Most modern Thermo King and Carrier units log this automatically; the operator's job is to pull the data before service work begins. If the microprocessor is reset during diagnosis, the carrier has no way to confirm the failure timing and the claim is often denied as undocumented.",
  },
  {
    q: "Is fuel contamination a covered breakdown?",
    a: "Usually not under the standard reefer breakdown endorsement. Most policies define the covered cause as mechanical or electrical failure of the unit itself; fuel issues — contaminated fuel, frozen fuel lines, fuel-pump failures triggered by fuel contamination — typically fall outside that definition. Some carriers offer a separate fuel-related-breakdown endorsement at additional premium. Read the specific endorsement language; the carriers do not all write this the same way.",
  },
  {
    q: "What is the deductible on a reefer breakdown claim?",
    a: "Deductibles on the endorsement typically run from $1,000 to $5,000 per occurrence, with the higher deductibles attached to lower-premium endorsements. The deductible applies to the cargo loss reimbursement, not to the unit repair (which the endorsement does not cover). Operators hauling high-value pharmaceutical or seafood loads sometimes carry a lower deductible at higher premium for cargo-loss volatility reasons.",
  },
  {
    q: "My reefer is broken — should I file the cargo claim or fix the unit first?",
    a: "Both, in parallel, in this order: (1) call the carrier within the policy notification window to open the claim file, (2) call the authorized service center for an estimate and ETA on the unit, (3) protect or salvage the load with the adjuster's coordination, (4) download the temperature log before service work touches the unit, (5) start the repair financing application if the rebuild estimate exceeds the operating account. The cargo claim and the unit repair are administratively independent — the lender does not wait for the claim, and the adjuster does not wait for the repair.",
  },
  {
    q: "How fast can I get repair financing for a reefer unit rebuild?",
    a: "The Dispatched workflow returns soft-approval and lender match typically within 20 minutes of submitting the application. Funds wire to the operator's business account the same banking day after the chosen lender countersigns, provided the wire instruction lands before that bank's cutoff. The financing is independent of the cargo claim — the lender underwrites the operation's revenue and equipment, not the reefer breakdown event.",
  },
  {
    q: "Can I get reefer breakdown coverage if my truck is over a certain age?",
    a: "Most carriers have age limits on the underlying motor truck cargo policy and on the breakdown endorsement specifically, typically capping at 10 to 15 years on the unit (not the tractor). Older units can sometimes be covered with a higher premium and a unit inspection. The cleanest path for operators running 10+ year reefers is to maintain documented service records — the records often determine whether the endorsement is renewable.",
  },
];

export default function ReeferBreakdownCoveragePage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Reefer breakdown coverage", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Reefer breakdown coverage and the financing gap on the unit rebuild",
          description:
            "How reefer breakdown coverage works as a motor truck cargo endorsement, what it covers, what it excludes, the mid-haul playbook when the unit fails, and how to fund the unit repair when the load is already gone.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        {/* SECTION: HERO ============================================== */}
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Reefer breakdown coverage</span>
            <h1 className="ins-hero-title">
              When the reefer unit fails mid-haul: coverage, then the rebuild.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              A reefer breakdown is two losses at once. The perishable load
              behind the bulkhead starts to spoil within hours, and the
              refrigeration unit itself usually needs immediate work to get the
              truck moving again. Refrigeration breakdown coverage is a
              cargo-policy endorsement that pays for the spoiled load if the
              mechanical failure meets the policy conditions — but the
              endorsement does not cover the unit repair, and the unit repair
              often runs into the low five figures. This page walks through
              what the coverage actually pays, what it routinely excludes, and
              how to fund the unit rebuild when the load is already gone.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my financing options →
              </Link>
              <Link href="/insurance" className="btn btn--secondary btn--lg">
                Read about trucking insurance
              </Link>
            </div>
            <p className="product-hero-note">
              Soft-pull match for repair financing. · No insurance application
              on this page.
            </p>
          </div>
        </section>

        {/* SECTION: SHORT ANSWER ===================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">One event, two financial impacts.</h2>
            <p className="ins-hero-sub">
              A refrigeration breakdown is one event with two financial
              impacts. First, the temperature-sensitive load starts
              deteriorating the moment the box stops holding spec — frozen
              goods reach the slacked-out threshold inside two to four hours
              depending on ambient temperature and box insulation; produce,
              dairy, and pharmaceuticals follow similar curves. Second, the
              reefer unit itself is now broken and needs a repair that
              typically cannot be deferred because the next load is also a
              temp-controlled load.
            </p>
            <p className="ins-hero-sub">
              <Link href="/glossary/reefer-breakdown">Reefer breakdown coverage</Link>{" "}
              is the standard industry term for an endorsement added to a{" "}
              <Link href="/glossary/motor-truck-cargo">motor truck cargo</Link>{" "}
              policy that pays for cargo loss when the cause of loss is a
              documented mechanical failure of the refrigeration unit. It is
              almost always sold as an endorsement, not as a standalone
              policy. The endorsement carries its own deductible (often $1,000
              to $5,000), its own conditions on continuous-monitoring
              documentation, and a list of named exclusions that
              owner-operators routinely run into at claim time.
            </p>
            <p className="ins-hero-sub">
              The coverage does not, by design, fund the repair to the unit
              itself. That sits on the operator. When the rebuild estimate
              from a Thermo King or Carrier authorized service center crosses
              ten thousand dollars — and engine swaps and clutch failures
              routinely do — the operator needs working-capital or repair
              financing in parallel with the cargo claim. The two products
              solve adjacent halves of the same event.
            </p>
          </div>
        </section>

        {/* SECTION: WHAT IT IS ======================================= */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">What it is</span>
            <h2 className="ins-hero-title">
              An endorsement to motor truck cargo, not a standalone policy.
            </h2>
            <p className="ins-hero-sub">
              Refrigeration breakdown coverage is sold as an endorsement to a
              motor truck cargo policy under several names depending on the
              carrier: &ldquo;reefer breakdown endorsement,&rdquo;
              &ldquo;refrigeration breakdown coverage,&rdquo; &ldquo;spoilage
              endorsement,&rdquo; or simply &ldquo;RBE.&rdquo; The underlying
              motor truck cargo policy covers the cargo against theft,
              collision, fire, and other named perils — but explicitly
              excludes mechanical or electrical breakdown of the unit unless
              the breakdown endorsement is added.
            </p>
            <p className="ins-hero-sub">
              When the endorsement is in force and the claim is paid, it
              reimburses the cargo value (less deductible, up to the per-load
              limit and the policy aggregate) when:
            </p>
            <ul className="product-list">
              <li>
                The cargo was at the contractually-required temperature at
                pickup, documented by the bill of lading and a pulp
                temperature reading.
              </li>
              <li>
                The reefer unit was set to the correct setpoint throughout the
                haul.
              </li>
              <li>
                The cargo loss is caused by a <em>mechanical or electrical
                failure</em> of the unit, not by operator error, fuel issues,
                or pre-loading temperature problems.
              </li>
              <li>
                Continuous temperature monitoring records (download from the
                reefer microprocessor) show the temperature excursion
                correlating with the failure event.
              </li>
              <li>
                The failure was reported to the carrier promptly and the cargo
                was inspected by a salvage agent before destruction or sale.
              </li>
            </ul>
            <p className="ins-hero-sub">
              Limits typically range from $100,000 to $500,000 per occurrence
              depending on the underlying cargo policy and the kinds of loads
              hauled. Pharmaceutical and seafood haulers carry higher limits
              at higher premium. Premium for the endorsement itself runs as a
              small fraction of the underlying cargo premium.
            </p>
          </div>
        </section>

        {/* SECTION: WHAT IT DOESN'T COVER ============================ */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">What it does not cover</span>
            <h2 className="ins-hero-title">
              Where reefer breakdown claims get denied.
            </h2>
            <p className="ins-hero-sub">
              The exclusion list is where most reefer breakdown claims get
              denied. Reading the policy before the failure happens — not
              after — is the single best operator habit on reefer freight.
            </p>
            <ul className="product-list">
              <li>
                <strong>Preventable failures.</strong> If the carrier&rsquo;s
                adjuster determines the breakdown was caused by deferred
                maintenance — a belt that should have been replaced, a
                refrigerant charge that was known low, a microprocessor fault
                code ignored for weeks — the claim is typically denied. The
                carrier asks for the unit&rsquo;s service records.
              </li>
              <li>
                <strong>Cargo not at temperature at pickup.</strong> If the
                load was warm when it was put in the box, the breakdown
                endorsement does not turn that into a covered loss. The bill
                of lading and the pulp reading at pickup are the
                operator&rsquo;s protection.
              </li>
              <li>
                <strong>Fuel-related failures.</strong> Reefer fuel
                contamination, fuel-line freezing, fuel-pump failure, or
                running out of reefer fuel are typically excluded as not being
                &ldquo;mechanical or electrical failure&rdquo; in the policy
                sense. Some carriers cover fuel-related breakdowns under a
                separate endorsement at additional premium.
              </li>
              <li>
                <strong>No continuous monitoring data.</strong> Almost every
                modern reefer microprocessor logs temperature continuously. If
                the operator cannot produce the download — because the data
                was overwritten, the microprocessor was reset, or telematics
                were not connected — the adjuster has no way to confirm the
                failure timing and the claim is often denied as undocumented.
              </li>
              <li>
                <strong>Driver-caused issues.</strong> Doors left open,
                setpoint set incorrectly, defrost cycle interrupted, plug-in
                failures at a truck stop — all driver-side events, all
                excluded.
              </li>
              <li>
                <strong>Slow deterioration without a unit failure.</strong>{" "}
                Some loads spoil from time-in-transit rather than from a unit
                failure. If the unit was working but the load was held too
                long at a too-marginal temperature, the loss is a transit-time
                loss, not a breakdown loss.
              </li>
              <li>
                <strong>The unit repair itself.</strong> Not an exclusion in
                the colloquial sense — the endorsement was never designed to
                cover the unit. Operators are sometimes surprised by it. The
                endorsement is a cargo coverage, not a physical-damage
                coverage on the equipment.
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION: WHAT TO DO ======================================= */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">What to do mid-haul</span>
            <h2 className="ins-hero-title">
              The sequence experienced reefer operators run on autopilot.
            </h2>
            <p className="ins-hero-sub">
              Doing this out of order is the most common source of denied
              claims.
            </p>
            <ol className="product-process">
              <li>
                <strong>Document the failure event.</strong> Photograph the
                microprocessor display showing the fault code or temperature
                excursion. Note the time, location, and odometer.
              </li>
              <li>
                <strong>Call the carrier immediately.</strong> Most cargo
                policies require notification within 24 hours of discovery.
                The claim file opens with the call.
              </li>
              <li>
                <strong>Call the authorized service center.</strong> Thermo
                King and Carrier both run dealer networks with mobile service.
                Document the call: who you spoke to, ETA, work order number.
              </li>
              <li>
                <strong>Protect the load.</strong> If the load can be saved by
                transferring to another reefer, the carrier expects that
                effort. Document mitigation attempts. Salvage operations
                should be coordinated with the adjuster — destroying a load
                before the adjuster sees it is a fast path to a denied claim.
              </li>
              <li>
                <strong>Download the temperature log.</strong> Pull the data
                from the microprocessor before any service work touches the
                unit. Many modern units overwrite logs in 7 to 30 days; some
                service procedures wipe the microprocessor. Get the data
                first.
              </li>
              <li>
                <strong>Open the repair financing application in parallel.</strong>{" "}
                If the rebuild estimate is over what the operating account can
                cover, the financing match should be running while the load is
                being adjudicated. The two processes are independent — the
                cargo claim has nothing to do with the repair lender, and vice
                versa.
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION: FINANCING GAP ==================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The financing gap</span>
            <h2 className="ins-hero-title">
              Funding the emergency unit rebuild.
            </h2>
            <p className="ins-hero-sub">
              Reefer breakdown coverage closes the cargo-loss half of the
              event. It does nothing for the rebuild. The financing options
              for the unit itself are:
            </p>
            <ul className="product-list">
              <li>
                <strong>
                  <Link href="/truck-repair-loans">Truck repair financing</Link>.
                </strong>{" "}
                The Dispatched panel funds repair amounts from $5,000 to
                $150,000, with same-banking-day funds after the chosen lender
                signs off. Reefer-unit work fits this band: engine swap on a
                Thermo King Precedent, clutch assembly on a Carrier X4 series,
                microprocessor replacement, condenser coil work. Underwriting
                is on revenue, not on the cargo claim.
              </li>
              <li>
                <strong>
                  <Link href="/trucking-working-capital">Working capital</Link>.
                </strong>{" "}
                When the operator needs the rebuild plus a buffer for the
                operating-expense gap while the truck is down for several
                days, working capital fits better than a single-purpose repair
                loan. APR range 14% to 34% on the panel.
              </li>
              <li>
                <strong>
                  <Link href="/factoring">Factoring</Link> against outstanding
                  invoices.
                </strong>{" "}
                If the operator has receivables out on Net-45 or Net-60 terms,
                factoring can fund the rebuild without taking on debt. The
                factor cares about broker credit, not the operator&rsquo;s.
              </li>
            </ul>
            <p className="ins-hero-sub">
              The financing decision sits on the operator and is independent
              of the cargo claim. The chosen lender does not need the claim to
              be resolved to fund the repair, and the carrier does not
              subrogate against the lender. The two processes run in parallel.
            </p>
          </div>
        </section>

        {/* SECTION: COMPOSITE SCENARIO =============================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a Phoenix-to-Chicago reefer failure looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              Built from the kinds of reefer-breakdown events the Dispatched
              intake routinely sees alongside cargo claims. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-operator, 2.5 years authority, one 2020 Cascadia
                  pulling a 2021 Utility 3000R reefer with a Thermo King
                  Precedent C-600.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Outside Albuquerque on a Phoenix-to-Chicago haul.
                  Microprocessor throws an Engine High Discharge Pressure
                  alarm; unit shuts down. Ambient 96°F. Load is mixed produce,
                  $42,000 bill of lading. Authorized Thermo King service
                  estimates $18,500 to rebuild the diesel engine plus parts;
                  truck out of service ~4 days.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Coverage outcome</span>
                <span className="product-example-value">
                  Reefer breakdown endorsement is in force, $5K deductible,
                  $250K limit. Cargo adjuster pays $32,000 on the $42,000 load
                  after deductible and salvage (some product was recoverable).
                  Cargo claim settles in 22 days.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Financing outcome</span>
                <span className="product-example-value">
                  Operator&rsquo;s match through{" "}
                  <Link href="/apply?useCase=repairs">/apply?useCase=repairs</Link>{" "}
                  returns a $25,000 working-capital offer at 21% APR over 18
                  months ($1,420 monthly) — covers the $18,500 rebuild plus
                  operating-expense buffer. Funded the same banking day.
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

        {/* SECTION: FAQ ============================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions on reefer breakdown coverage and unit rebuild
              financing.
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
            <h2 className="ins-hero-title">
              Cargo claim plus rebuild — run them in parallel.
            </h2>
            <p className="ins-hero-sub">
              The endorsement covers the load. The repair financing covers
              the unit. Both processes start in the first hour after the
              breakdown.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my financing options →
              </Link>
              <Link
                href="/calculators/truck-repair"
                className="btn btn--secondary btn--lg"
              >
                Or estimate the repair fit first →
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
                <Link href="/insurance">Trucking insurance →</Link>
              </li>
              <li>
                <Link href="/truck-repair-loans">Truck repair loans →</Link>
              </li>
              <li>
                <Link href="/trucking-working-capital">
                  Trucking working capital →
                </Link>
              </li>
              <li>
                <Link href="/factoring">Factoring for truckers →</Link>
              </li>
              <li>
                <Link href="/research/state-of-commercial-trucking-insurance-2026">
                  State of commercial trucking insurance 2026 →
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
