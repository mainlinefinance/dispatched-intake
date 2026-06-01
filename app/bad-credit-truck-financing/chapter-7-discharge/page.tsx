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

/* /bad-credit-truck-financing/chapter-7-discharge — bad-credit pillar spoke.
   Editorial frame: operator has a discharged Chapter 7 bankruptcy on file,
   wants to finance a truck. Specific scenario, weak SERP, real lead pattern. */

export const metadata: Metadata = {
  title: "Semi truck loan after Chapter 7 discharge | Dispatched",
  description:
    "Discharged Chapter 7 bankruptcy and trying to finance a truck? The Dispatched panel funds post-discharge operators from month 13. What lenders need.",
  alternates: {
    canonical: "/bad-credit-truck-financing/chapter-7-discharge",
  },
  openGraph: {
    title: "Semi truck loan after Chapter 7 discharge | Dispatched",
    description:
      "Discharged Chapter 7 bankruptcy and trying to finance a truck? The Dispatched panel funds post-discharge operators from month 13. What lenders need.",
    url: "/bad-credit-truck-financing/chapter-7-discharge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semi truck loan after Chapter 7 discharge | Dispatched",
    description:
      "Discharged Chapter 7 bankruptcy and trying to finance a truck? The Dispatched panel funds post-discharge operators from month 13. What lenders need.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/bad-credit-truck-financing/chapter-7-discharge";

const faqs = [
  {
    q: "Can I get a semi truck loan after a Chapter 7 discharge?",
    a: "Yes, after the 12-month post-discharge window. Active Chapter 7 cases — between filing and discharge — are typically declined across the panel because the trustee can claw back asset purchases. Once the discharge order is final and 12 months have passed, the panel reopens. Equipment-secured loans are the first product to come back; unsecured working capital takes longer (typically 24 to 36 months post-discharge).",
  },
  {
    q: "How long after Chapter 7 discharge do I have to wait?",
    a: "The panel floor for equipment-secured truck financing is 12 months from the discharge date (not the filing date). At month 13, a narrower lender subset will quote — usually trucking-specialty equipment finance companies that underwrite the asset more aggressively than the credit. By month 24, the lender mix widens and APR comes down. By month 36, most operators see the same lender pool as a non-BK applicant at the same FICO band.",
  },
  {
    q: "What FICO do I need to qualify after Chapter 7?",
    a: "The panel floor is still 500 FICO post-discharge, but the practical underwriting floor for post-BK operators is closer to 560 because the discharge plus a sub-560 score signals a credit profile that has not recovered enough for any lender to underwrite. Operators who have actively rebuilt — secured credit card, on-time payments, low utilization — and score 580 to 620 at month 13 see real quotes. Above 620, the discharge effectively becomes a footnote rather than the headline of the file.",
  },
  {
    q: "Do lenders care if the bankruptcy was personal vs. business?",
    a: "Yes, slightly. A personal Chapter 7 filed by an operator who later started a trucking business as a sole proprietorship is the most common pattern and the panel handles it cleanly. A business Chapter 7 filed by a previous trucking entity creates more friction because the lender wants to understand what specifically caused the previous operation to fail (cargo claim, accident, factor dispute, divorce) and how the new operation is structured to avoid the same failure mode. Be prepared with a one-paragraph factual explanation; lenders are not looking for a confession, just a coherent story.",
  },
  {
    q: "What loan amount can I get post-discharge?",
    a: "Reduced relative to a non-BK applicant at the same credit and revenue. A 600-FICO operator with 24 months post-discharge and $25K monthly deposits will typically qualify for an equipment loan up to about 70% to 80% of what a clean-file applicant at the same metrics would see. The structure compensates with a larger down payment requirement (typically 15% to 25%) and a shorter maximum term. The trade-off is the panel approves the loan at all — most banks decline post-BK regardless of recovery signals.",
  },
  {
    q: "Will my bankruptcy show on the application?",
    a: "Yes. The Dispatched application asks about prior bankruptcy directly, including filing chapter, filing date, and discharge date. The information is verified during underwriting via PACER or the credit bureau bankruptcy section, so omitting it is not viable and is itself a red flag for the lender. The application is structured so that an honestly disclosed bankruptcy with recovery signals is routable; an undisclosed bankruptcy discovered at underwriting is a hard decline.",
  },
  {
    q: "Can I get truck financing if my Chapter 7 included a previous truck loan?",
    a: "Yes, but the previous lender is a factor. If the discharged debt included a truck loan, the lender that wrote that loan is generally locked out of the panel for you going forward (their underwriting flags you as a prior loss). The lender mix narrows accordingly, but the panel's trucking-specialty lenders that did not write the discharged loan are unaffected and still quote. The application captures previous lender names so the matching can avoid the locked-out routes.",
  },
  {
    q: "What about factoring after Chapter 7?",
    a: "Available immediately after discharge — the 12-month wait does not apply. Invoice factoring underwrites the broker who owes the invoice, not the operator's credit history. A discharge that is 30 days old is not a barrier to factoring as long as the operator has an active MC#, a load on the books, and the broker on the load is on the factor's approved list.{' '} See factoring with no credit check for the specific product structure.",
  },
];

export default function Chapter7DischargeTruckFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Bad credit truck financing",
            url: "https://dispatched.finance/bad-credit-truck-financing",
          },
          { name: "After Chapter 7 discharge", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Semi truck loan after Chapter 7 discharge",
          description:
            "When the panel reopens after a Chapter 7 discharge, what FICO and recovery signals lenders actually need, and how loan structure changes for post-BK operators.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
          authorName: "Angelo Orru Neto",
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Truck financing after Chapter 7 discharge",
          description:
            "Equipment financing for operators with a discharged Chapter 7 bankruptcy. Panel reopens at 12 months post-discharge. 500 FICO floor, 14% to 22% APR equipment band. Soft-pull pre-qualification.",
          url: PAGE_URL,
          category: "Commercial trucking financing",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">
              Bad credit truck financing · After Chapter 7
            </span>
            <h1 className="ins-hero-title">
              Semi truck loan after a Chapter 7 discharge.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              The bank says no for seven years. The Dispatched panel
              reopens at month 13 post-discharge — equipment-secured loans
              first, then working capital and the full product set as the
              recovery signal compounds. No omission required, no
              indefinite wait.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=equipment&prior=ch7-discharge"
                className="btn btn--primary btn--lg"
              >
                See what funds post-discharge →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              Soft pull only · Panel floor: 12 months post-discharge.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The panel timeline</span>
            <h2 className="ins-hero-title">
              When each product reopens.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Active Chapter 7 (pre-discharge):</strong> No truck
                financing on the panel. The bankruptcy trustee can claw
                back asset purchases, so the lender risk is structural.
                Factoring (invoice-only) is the one exception — the factor
                buys invoices rather than lending, and the trustee has
                limited claim on receivables.
              </li>
              <li>
                <strong>Months 0 to 12 post-discharge:</strong> Equipment
                financing closed. Working capital closed. Factoring open
                from day one. This is the rebuilding window — the right
                move is to operate via factoring while accumulating 6 to
                12 months of clean business bank statements that
                demonstrate the recovery.
              </li>
              <li>
                <strong>Months 13 to 24 post-discharge:</strong> Equipment
                financing opens to a trucking-specialty lender subset.
                APR runs 14% to 22% in this band for 580 to 620 FICO.
                Down payment requirement: 15% to 25%. Working capital
                still closed for most operators in this window unless the
                business deposit history is exceptional.
              </li>
              <li>
                <strong>Months 25 to 36 post-discharge:</strong> Equipment
                lender mix widens. APR comes down a meaningful 200 to 400
                bps in the same FICO band. Working capital opens at a
                narrower lender subset, typically 24% to 34% APR with
                shorter terms than a clean-file operator would see.
              </li>
              <li>
                <strong>36+ months post-discharge:</strong> Most operators
                see the same lender pool as a non-BK applicant at the
                same FICO. The discharge becomes a footnote on the
                application rather than the headline of the file.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Recovery signals</span>
            <h2 className="ins-hero-title">
              What lenders are actually reading post-discharge.
            </h2>
            <p className="ins-hero-sub">
              The discharge date is one data point. The actual
              underwriting decision is built on what the operator has
              done since:
            </p>
            <ul className="product-list">
              <li>
                <strong>FICO trajectory.</strong> The score at month 13
                matters less than the slope from month 1 to month 13. An
                operator who scored 480 at discharge and 600 at month 13
                is a stronger file than an operator who scored 580 at
                discharge and 600 at month 13. Bureau data shows the
                slope; underwriters read it.
              </li>
              <li>
                <strong>Secured credit utilization.</strong> A secured
                credit card opened post-discharge, used moderately, and
                paid in full monthly is the highest-signal recovery
                marker. Operators with one or two secured tradelines at
                under 30% utilization quote materially better than those
                with no post-BK credit activity.
              </li>
              <li>
                <strong>Business bank statements (where they exist).</strong>{" "}
                If the operator has been running freight via factoring or
                as a company driver since discharge, the deposit history
                substitutes for missing credit history. 6 to 12 months
                of clean deposits is the working baseline.
              </li>
              <li>
                <strong>No new derogatories.</strong> A late payment, a
                charge-off, or a new collection account after discharge
                is a much heavier negative than the discharge itself.
                The discharge is one event; a post-discharge late
                payment is a pattern.
              </li>
              <li>
                <strong>The cause-of-bankruptcy story.</strong> A
                discharge driven by a one-time event (cargo claim, medical
                event, divorce, business partner fraud) underwrites
                better than a discharge driven by chronic over-leverage.
                The application captures the cause briefly; an honest
                one-paragraph explanation goes further than a vague answer.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              A real-shaped post-discharge funded loan.
            </h2>
            <p className="ins-hero-sub">
              Pattern observed across recent panel funded post-BK loans
              (composite, not a specific operator):
            </p>
            <ul className="product-list">
              <li>
                <strong>Operator:</strong> 14 months past Chapter 7
                discharge, prior bankruptcy driven by a cargo-claim
                judgment from a previous owner-operation, 590 FICO
                (up from 470 at discharge), 9 months of W-2 driving
                history since discharge, one secured credit card at 18%
                utilization paid in full monthly.
              </li>
              <li>
                <strong>Truck:</strong> 2019 Volvo VNL, $78,000 dealer
                asking, $70,000 appraised value, $14,000 down (20%).
              </li>
              <li>
                <strong>Loan structure:</strong> $56,000 financed, 17.9%
                APR, 60-month term, monthly payment $1,420. Lender:
                trucking-specialty equipment finance company that
                specifically underwrites post-BK files.
              </li>
              <li>
                <strong>What changed the decision:</strong> The W-2
                driving history during the post-discharge window plus
                the clean secured tradeline. Without those, the file
                would have been declined despite the FICO score
                recovery.
              </li>
            </ul>
          </div>
        </section>

        <section id="faq">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Truck financing after Chapter 7 discharge — common questions.
            </h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details key={f.q} className="faq-item">
                  <summary>
                    <strong>{f.q}</strong>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Related: financing paths for recovering credit profiles.
            </h2>
            <ul className="product-list">
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing (the pillar)
                </Link>{" "}
                — broader pillar for sub-650 FICO operators across all
                credit-event categories.
              </li>
              <li>
                <Link href="/factoring/no-credit-check">
                  Factoring with no credit check on you
                </Link>{" "}
                — the immediate-availability product for any operator
                with an active MC# and a load on the books, regardless
                of credit history.
              </li>
              <li>
                <Link href="/owner-operator-financing/first-time">
                  First-time owner-operator financing
                </Link>{" "}
                — for post-discharge operators transitioning from W-2
                driving back into owner-operation.
              </li>
              <li>
                <Link href="/new-authority-truck-financing">
                  New authority truck financing
                </Link>{" "}
                — overlapping product if the operator filed for a new
                MC# after discharge.
              </li>
              <li>
                <Link href="/methodology">Methodology</Link> — how the
                panel underwrites and how rates are observed.
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
