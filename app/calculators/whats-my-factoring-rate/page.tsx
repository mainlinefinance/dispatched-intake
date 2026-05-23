import type { Metadata } from "next";
import Link from "next/link";
import FactoringFeeCalculator from "@/components/calculators/FactoringFeeCalculator";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  softwareApplication,
} from "@/components/seo/JsonLd";

const PAGE_URL =
  "https://dispatched.finance/calculators/whats-my-factoring-rate";

export const metadata: Metadata = {
  title: "What's My Factoring Rate? | Dispatched",
  description:
    "Calculator + guide. What volume, broker credit, recourse type, and contract length actually drive your factoring rate. Run the math and see the effective annualized cost.",
  alternates: {
    canonical: "/calculators/whats-my-factoring-rate",
  },
};

const faqs = [
  {
    q: "What's a good factoring rate in 2026?",
    a: "Industry-wide, rates run 1.5% to 5% per invoice. An owner-operator with 12+ months of operating history, clean broker mix, and steady volume should land at 2.5–3.5% on recourse factoring. Anything above 4% for that profile is overpriced.",
  },
  {
    q: "Why is my factoring rate higher than competitors advertise?",
    a: 'Three common reasons: low volume (factors price by volume tier), broker mix risk (concentrated or sketchy brokers raise the rate), or non-recourse premium (adds 0.5–1%). Most "starting at" advertised rates require minimum volume to access.',
  },
  {
    q: "Should I sign a 12-month contract for a lower rate?",
    a: "Often yes, but understand the trade-off. Annual contracts typically price 0.25–0.75% lower than month-to-month. The lock-in is real — read the auto-renewal clause and cancellation window. For operators with stable broker mix, the savings are worth it. For operators expecting to change strategy, flexibility matters more.",
  },
  {
    q: "Does my personal credit affect my factoring rate?",
    a: "Less than people think. Factoring rates are primarily driven by your broker mix's credit, not yours. Some factors do a soft pull on you for fraud prevention but don't price based on it. This is why factoring works for operators with sub-580 FICO who can't access traditional financing.",
  },
  {
    q: "What's the effective annualized rate of factoring?",
    a: "Factoring at 3% per 30 days is roughly 36% APR-equivalent. That sounds high compared to a 14% working capital loan, but the math is different — factoring isn't borrowing, it's selling the invoice. The 36% is the implied cost of accelerating cash flow by 30–60 days. For operators with broker payment terms of Net 60+, factoring almost always beats waiting.",
  },
];

export default function WhatsMyFactoringRatePage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Calculators",
            url: "https://dispatched.finance/calculators",
          },
          { name: "What's my factoring rate", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "What's my factoring rate?",
          description:
            "Calculator + guide to understanding factoring rates on the Dispatched panel, including volume, broker credit, recourse type, contract length, and operating history drivers.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={softwareApplication({
          name: "Factoring rate calculator",
          description:
            "Interactive web tool estimating the factoring fee, advance amount, hold-back reserve, and effective annualized rate for a trucking invoice.",
          url: PAGE_URL,
          applicationCategory: "FinanceApplication",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>What&rsquo;s my factoring rate?</h1>
            <p>
              Factoring rates range 1.5 – 5% in 2026 — but the actual rate
              you&rsquo;ll be offered depends on volume, broker credit mix,
              recourse type, contract length, and your operating history. Run
              the calculator below to see your effective cost, then read what
              drives the rate up or down.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <FactoringFeeCalculator />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>What drives your factoring rate</h2>
            <p>
              The headline rate a factor quotes is built from five inputs.
              Each one moves the rate independently, and the strongest two
              — volume and broker mix — can compound into a 1.5 – 2 point
              swing on the same invoice. Knowing which inputs you control
              tells you where to push for a better rate.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Volume.</strong> Factors price in tiers. Under 10
                loads a month, you sit in the &ldquo;new authority&rdquo;
                pricing band — typically 4 – 5%. Between 10 and 30 loads, the
                rate drops to 3 – 3.5%. Above 30 loads, fleets unlock 2 –
                2.5%. The reason is operational: a factor&rsquo;s fixed cost
                to onboard you, run broker checks, and process payments
                doesn&rsquo;t scale with invoice count. Higher volume amortizes
                that fixed cost across more revenue, and the factor shares the
                savings. The corollary: shopping rate without committing to a
                volume tier is a fool&rsquo;s errand — the lower advertised
                rates assume a volume you may not hit.
              </li>
              <li>
                <strong>Broker credit mix.</strong> Factors don&rsquo;t price
                your credit; they price your brokers&rsquo;. If 60% of your
                loads run through three blue-chip brokers (Coyote, CH
                Robinson, TQL), your rate floor sits lower because broker
                default risk is near zero. If your mix concentrates on
                small/regional brokers or quick-pay schemes, the factor adds
                25 – 75 basis points for risk. Mix is the single biggest
                rate-mover you can change in 60 days: routing more loads
                through credit-screened brokers visibly improves your rate at
                renewal.
              </li>
              <li>
                <strong>Recourse type.</strong> Recourse means you owe the
                factor back if a broker defaults. Non-recourse means the
                factor eats the loss in exchange for a 0.5 – 1% premium.
                Non-recourse is real insurance, not a label — but only for
                credit defaults. Disputes, chargebacks, and slow-pay
                penalties typically stay on you regardless. For carriers with
                concentrated broker exposure, non-recourse pays for itself on
                a single bad debt. For diversified fleets, recourse is the
                cheaper math.
              </li>
              <li>
                <strong>Contract length.</strong> Month-to-month is the most
                expensive way to factor. 12-month commitments typically price
                0.25 – 0.75% lower. 24-month commitments price another 0.25%
                under that. The factor is buying predictability of revenue;
                you&rsquo;re paying for flexibility. The trade-off becomes
                obvious when you do the math: on $400K of annual factored
                revenue, a 0.5% rate cut is $2,000/yr — meaningful, but worth
                running against the cost of being locked in if your broker
                strategy changes.
              </li>
              <li>
                <strong>Operating history.</strong> Twelve months of clean
                operating history shifts you from the &ldquo;new
                authority&rdquo; pricing band into the standard band. The
                shift is typically 0.5 – 1% — a brand-new MC# pays 4 – 5%
                where a 12-month-old MC# with the same volume pays 3 – 3.5%.
                The reason is fraud prevention: new authorities show a
                statistically higher rate of bond claims, fraudulent invoices,
                and broker disputes. Time on the road is the cheapest signal
                you can build.
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Typical rates by operator profile</h2>
            <p>
              Below are the rate bands we see across the panel. These are
              observed ranges, not guarantees; the chosen factor sets the
              final number on the contract.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Brand-new MC#, single truck, mixed broker
                mix.</strong> Rate band: <strong>3.5 – 5%</strong>. The
                &ldquo;new authority&rdquo; bucket. Volume is low, history is
                zero, broker exposure is unknown. The high end of this range
                is common in month one; rates compress as the first 3 – 6
                months of clean operation build a track record.
              </li>
              <li>
                <strong>Established owner-op, 12+ months history, stable
                broker mix.</strong> Rate band:{" "}
                <strong>2.5 – 3.5%</strong>. This is the most common profile
                on the Dispatched panel. The 12-month history clears the new
                authority adder, and a stable mix sets a sensible price floor.
                Operators in this profile who switch from spot factoring to a
                12-month contract typically save 0.5%+.
              </li>
              <li>
                <strong>High-volume fleet (30+ loads/month), strong broker
                mix.</strong> Rate band:{" "}
                <strong>1.5 – 2.5%</strong>. Volume tier unlocks the lowest
                pricing, and a concentrated mix on blue-chip brokers
                eliminates the broker risk adder. Fleets in this band
                negotiate hard on advance rate (97%+) and ACH/wire fee
                waivers; the headline rate is only one line on the contract.
              </li>
              <li>
                <strong>Non-recourse + concentrated broker risk.</strong>{" "}
                Rate band: <strong>2.5 – 4%</strong>. Non-recourse adds 0.5 –
                1% over the recourse equivalent for the same profile. If your
                operation runs 70%+ through one broker, non-recourse is
                often the right call — one default on a recourse contract can
                wipe out a year of fee savings.
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Hidden costs that change the effective rate</h2>
            <p>
              The headline factoring rate is the cleanest number on the
              contract — and the least useful number for comparing factors.
              These line-item charges quietly add 0.25 – 1% to the effective
              cost, and they vary widely from factor to factor.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>ACH fees.</strong> Some factors charge $5 – $25 per
                ACH wire on top of the rate. At 20 wires a month, that&rsquo;s
                $100 – $500 — material on a small-volume account. Same-day
                wires often carry an additional $15 – $30 premium. Negotiate
                a flat ACH allowance or fee waiver before signing.
              </li>
              <li>
                <strong>Monthly minimums.</strong> Many factor contracts
                include a minimum monthly fee — typically $100 – $300 — that
                kicks in if your factored volume drops below threshold. For
                carriers with seasonal volume, this becomes the floor rate in
                slow months. Ask explicitly what the minimum is and how it
                behaves if you run a partial month.
              </li>
              <li>
                <strong>Lockbox fees.</strong> Some factors charge $25 – $100
                per month for the lockbox the brokers pay into. This is pure
                overhead — the lockbox isn&rsquo;t doing extra work — and
                it&rsquo;s often negotiable down to zero on a 12-month
                commitment.
              </li>
              <li>
                <strong>Early termination clauses.</strong> Annual contracts
                often include 60 – 90 day cancellation windows and
                early-termination penalties of 1 – 3 months of average fees.
                Read the auto-renewal clause carefully — many roll forward
                automatically unless you cancel inside a narrow window.
              </li>
              <li>
                <strong>Fuel-advance and quick-pay fees.</strong> If you take
                fuel advances against not-yet-uploaded invoices, the factor
                charges a separate fee — typically 1 – 3% of the advanced
                amount. These can be useful tools, but model them as extra
                cost, not free convenience.
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>How to make your rate go down</h2>
            <p>
              Four practical actions, in order of impact:
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Stabilize broker mix.</strong> Route 50%+ of your
                volume through 3 – 5 credit-screened brokers (Coyote, CH
                Robinson, TQL, JB Hunt, Convoy alternatives). At renewal, the
                factor sees a clean concentration profile and prices it
                accordingly. This single change is worth 25 – 75 basis points
                for most operators.
              </li>
              <li>
                <strong>Increase volume.</strong> Crossing the 10-load and
                30-load monthly thresholds unlocks new pricing tiers. If
                you&rsquo;re consistently running 8 – 9 loads, pushing to 11
                – 12 is often worth a half-point rate cut. The factor
                won&rsquo;t volunteer this; you have to ask at renewal.
              </li>
              <li>
                <strong>Sign 12-month vs month-to-month.</strong> The 0.25 –
                0.75% rate cut for a 12-month commitment is real money on
                even modest volume. The decision is about your strategy
                runway — if your operation is stable enough to commit a year,
                take the rate cut.
              </li>
              <li>
                <strong>Demonstrate operational maturity.</strong> Twelve
                months of clean operation, no broker disputes, no bond
                claims, no late uploads. Factors track these signals
                quietly. Operators with clean records get rate adjustments at
                renewal that operators with messy records do not — even at
                similar volume and broker mix.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="container">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions about factoring rates</h2>
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

        <section className="calc-related">
          <div className="container">
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/factoring">
                  Invoice factoring for truckers — parent product →
                </Link>
              </li>
              <li>
                <Link href="/factoring/no-credit-check">
                  Factoring without a credit check →
                </Link>
              </li>
              <li>
                <Link href="/calculators/factoring-fee">
                  Factoring fee calculator (dedicated tool) →
                </Link>
              </li>
              <li>
                <Link href="/research/best-trucking-factoring-2026">
                  Best trucking factoring companies, 2026 →
                </Link>
              </li>
              <li>
                <Link href="/calculators">All calculators →</Link>
              </li>
              <li>
                <Link href="/methodology">
                  How we describe APR ranges →
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Get matched with the right factor</h2>
            <p>
              The calculator shows you the math. The application shows you
              the panel. Two minutes, no credit pull, no obligation — and a
              factor that prices your specific broker mix, volume, and
              history.
            </p>
            <p>
              <Link href="/qualify" className="btn btn--primary">
                Get matched with the right factor →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
