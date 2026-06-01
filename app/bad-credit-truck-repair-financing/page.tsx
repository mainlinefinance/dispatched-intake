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

/* /bad-credit-truck-repair-financing — combo of /bad-credit-truck-financing
   and /truck-repair-loans. Captures the explicit "semi truck repair loans
   with bad credit" intent from the GSC log without duplicating either
   parent page. Sub-580 lender subset routing is the page's editorial
   center of gravity. */

export const metadata: Metadata = {
  title:
    "Semi truck repair loan with bad credit — sub-580 FICO, truck-down options | Dispatched",
  description:
    "Semi truck repair loan options with bad credit. Programs route from 500 FICO on the Dispatched panel. Revenue-based underwriting, not FICO-first. Soft pull, same-banking-day funds after sign-off.",
  alternates: { canonical: "/bad-credit-truck-repair-financing" },
  openGraph: {
    title:
      "Semi truck repair loan with bad credit — sub-580 FICO, truck-down options | Dispatched",
    description:
      "Semi truck repair loan options with bad credit. Programs route from 500 FICO on the Dispatched panel. Revenue-based underwriting, not FICO-first. Soft pull, same-banking-day funds after sign-off.",
    url: "/bad-credit-truck-repair-financing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Semi truck repair loan with bad credit — sub-580 FICO, truck-down options | Dispatched",
    description:
      "Semi truck repair loan options with bad credit. Programs route from 500 FICO on the Dispatched panel. Revenue-based underwriting, not FICO-first. Soft pull, same-banking-day funds after sign-off.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/bad-credit-truck-repair-financing";

const faqs = [
  {
    q: "What's the minimum credit score for truck repair financing on your panel?",
    a: "The panel floor is 500 FICO. Below 500, no lender on the panel currently underwrites repair financing. From 500 to 579, a smaller specialist subset routes at higher rates (24% to 34% APR). From 580 to 679, most of the panel routes at middle-of-range rates. 680+ unlocks the full panel including equipment-secured products at 9% to 18% APR. The two-question fit at /qualify shows the operator which tier they land in without any credit pull.",
  },
  {
    q: "Will applying with bad credit hurt my score further?",
    a: "Not at the start. The Dispatched application is a soft-pull match. Soft inquiries are not visible to other lenders and do not affect your score regardless of credit band. A hard pull only happens after you pick a specific lender and move forward on their term sheet. Operators routinely apply, see offers across the panel, and decide not to proceed — without any credit impact.",
  },
  {
    q: "Why do my rates run so much higher with bad credit?",
    a: "Two reasons. First, the lender's credit-loss model assigns higher expected loss to sub-580 borrowers based on observed default rates across the broader market, and pricing covers that loss. Second, the smaller lender subset that funds sub-580 borrowers has less competition, which keeps the rate spread wider. The exact APR on the term sheet is locked at sign-off — no surprise increases — and the operator sees it side-by-side with any other offers before deciding.",
  },
  {
    q: "What if I'm in active bankruptcy?",
    a: "Active Chapter 7 or Chapter 13 generally takes the operator out of the panel entirely — most lenders cannot fund during an active proceeding. Post-discharge, the panel routes normally based on the post-discharge FICO and the time since discharge. Operators recently discharged from Chapter 13 with a year of stable operating history routinely fund on the sub-580 subset.",
  },
  {
    q: "Can I get a co-signer to help my repair financing application?",
    a: "Some lenders on the sub-580 subset accept a co-signer or guarantor with stronger credit; others do not. When accepted, the co-signer's credit usually moves the rate down by 200 to 600 basis points and may unlock a larger loan amount or longer term. The application captures the co-signer's information at the lender-selection step, not at the initial soft-pull stage.",
  },
  {
    q: "My truck is in the shop right now. Can I still apply if I haven't paid the shop anything yet?",
    a: "Yes. The Dispatched workflow is built specifically for that case. The application is two minutes inside /apply. The lender funds the approved amount to the operator's business account or direct to the shop (depending on the term sheet), and the shop releases the truck. There is no requirement that the operator have already paid the shop, and no requirement that the truck be picked up before funding.",
  },
  {
    q: "Are these MCAs?",
    a: "No. Merchant cash advances are a structurally different product — daily ACH debits, factor-rate pricing, no APR disclosure, and often confessions of judgment in the contract. The Dispatched panel routes away from MCA funders by default. Sub-580 offers on the panel are conventional term loans with monthly payment, fixed APR, and standard borrower protections. See /factoring-vs-mca for the structural distinction.",
  },
  {
    q: "What documents do I need with bad credit?",
    a: "Same document set as the standard repair-loan application: three months of business bank statements, EIN or SSN, DOT number, driver's license, and the shop estimate. Loans over $75K (less common in the sub-580 tier) add Schedule C or 1120 and current settlement statements. The lender may request additional revenue documentation — copies of broker contracts or 90-day settlement detail — at higher loan sizes or on borderline applications.",
  },
];

export default function BadCreditTruckRepairFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Bad credit truck repair financing", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Bad credit truck repair financing for sub-580 FICO operators",
          description:
            "How the Dispatched panel routes bad-credit truck-repair financing applications: three FICO tiers, what changes at each tier, what the panel underwrites instead of FICO, and the decline-handling routes.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Bad credit truck repair financing",
          description:
            "Truck repair financing of $5K–$150K with FICO programs routing from 500. Revenue-based underwriting, same-banking-day funds after sign-off, soft-pull match.",
          url: PAGE_URL,
          category: "Commercial trucking financing",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Semi truck repair loan • bad credit</span>
            <h1 className="ins-hero-title">
              Semi truck repair loans for operators with bad credit.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              A 500 FICO with a truck in the shop is not the dead end most
              banks make it look like. The Dispatched panel underwrites the
              operation&rsquo;s revenue, deposit history, and equipment
              first — FICO second. Programs route from 500. Repair loans from
              $5K to $150K, soft-pull match in about 20 minutes, wire same
              banking day after the chosen lender signs off. Higher-end of
              the 14% to 34% APR range, tighter loan ceilings, and a smaller
              subset of the panel — but the funding is real and the process
              is built for the case where the truck is already down.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              No hard credit pull to start. · Takes about 2 minutes.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">Three tiers, same product class.</h2>
            <p className="ins-hero-sub">
              Bad credit changes the lender mix, the rate, and the loan cap —
              it does not eliminate the product. The Dispatched panel splits
              into roughly three tiers by FICO band:
            </p>
            <ul className="product-list">
              <li>
                <strong>680+ FICO.</strong> Full panel access. Rates toward
                the lower end of the 14% to 34% APR range. Loan amounts up to
                the panel cap of $150K. Equipment-secured products available
                at 9% to 18% APR for tractors with sufficient residual value.
              </li>
              <li>
                <strong>580 to 679 FICO.</strong> Most of the panel still
                routes. Rates middle of the range. Loan amounts modestly
                tighter. Equipment-secured product available with stricter
                conditions.
              </li>
              <li>
                <strong>500 to 579 FICO.</strong> A smaller subset of the
                panel — specialist lenders that underwrite on revenue and
                deposit history more heavily than FICO. Rates toward the high
                end of the range, often 24% to 34% APR. Loan amounts
                typically capped lower, $5K to $50K. Equipment-secured
                products usually not available — the financing is unsecured
                working capital tied to revenue.
              </li>
            </ul>
            <p className="ins-hero-sub">
              The reason the sub-580 subset exists at all is that trucking
              has structurally higher concentration of credit-constrained
              operators — new authorities post-COVID, owner-ops working
              through a tax lien, post-bankruptcy operators rebuilding — and
              the revenue these operators generate is real, documentable, and
              stable enough to underwrite even when the FICO does not look
              stable.
            </p>
            <p className="ins-hero-sub">
              What does not exist on the panel: predatory MCAs disguised as
              repair loans. The Dispatched panel routes away from
              confession-of-judgment contracts, daily-ACH receivables
              purchases, and stacking-tolerant funders by default. The
              sub-580 product is a higher-rate term loan with monthly
              payment, not a daily-debit advance. See{" "}
              <Link href="/factoring-vs-mca">factoring vs MCA</Link> for the
              structural distinction.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How bad credit changes the offer</span>
            <h2 className="ins-hero-title">Rate, ceiling, term, structure.</h2>
            <ul className="product-list">
              <li>
                <strong>Rate band.</strong> Working-capital repair financing
                in the 24% to 34% APR range for sub-580 borrowers, compared
                to 14% to 24% for 680+. The spread is the lender&rsquo;s
                compensation for credit risk and is set on the term sheet —
                no surprise increases later.
              </li>
              <li>
                <strong>Loan ceiling.</strong> The panel&rsquo;s $150K
                repair-loan cap typically does not apply to sub-580
                borrowers. Practical ceilings in this tier run $5K to $50K
                depending on monthly revenue and time in business. Higher
                repair amounts route to layered products (partial financing
                plus parts deferral with the shop, or a working-capital plus
                factoring combination).
              </li>
              <li>
                <strong>Term length.</strong> Sub-580 offers usually run 6 to
                18 months. Longer terms (24 to 36 months) tend to require
                600+ FICO or strong equipment collateral.
              </li>
              <li>
                <strong>Direct-to-shop disbursement.</strong> Some sub-580
                offers route the wire directly to the shop rather than to the
                operator&rsquo;s business account. This is a lender-side risk
                control, not a borrower restriction — the operator still
                chooses the shop.
              </li>
              <li>
                <strong>Personal guarantee on LLCs.</strong> Sub-580 offers on
                LLC-organized operations typically require a personal
                guarantee from the principal. Higher-FICO offers on the same
                operation may not.
              </li>
              <li>
                <strong>Soft-pull match unchanged.</strong> The FICO band
                does not change the soft-pull-first process. The hard pull
                only happens after the operator picks a specific lender.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">What the panel underwrites instead</span>
            <h2 className="ins-hero-title">Revenue, DSCR, equipment, history.</h2>
            <p className="ins-hero-sub">
              For sub-580 borrowers, FICO is the smallest of the underwriting
              inputs. The lenders in this tier weight:
            </p>
            <ul className="product-list">
              <li>
                <strong>Monthly revenue and stability.</strong> Three months
                of bank statements showing consistent deposits at a level
                that supports the requested payment. Volatility matters —
                three identical months underwrite better than three swing
                months at the same average.
              </li>
              <li>
                <strong>Debt service coverage ratio (DSCR).</strong> Net cash
                after current obligations divided by the proposed payment.
                The minimum is usually 1.15 to 1.25. The operator&rsquo;s
                calculator at <Link href="/calculators">/calculators</Link>{" "}
                runs the same math the lender does.
              </li>
              <li>
                <strong>Time in business.</strong> 6 months is the panel
                floor; 12+ months opens more of the sub-580 lender subset;
                24+ months opens the equipment-secured option even at lower
                FICO.
              </li>
              <li>
                <strong>Equipment in the fleet.</strong> A tractor with three
                to five years of remaining service life is meaningful
                collateral even when the loan is structured as unsecured.
              </li>
              <li>
                <strong>Settlement-statement quality.</strong> Operators with
                diversified broker mixes (three or more) underwrite better
                than single-broker operations.
              </li>
              <li>
                <strong>The repair scope itself.</strong> A $22K transmission
                rebuild on a 2019 Cascadia underwrites differently than a
                $22K series of small repairs. The single-event scope is
                easier to fund.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">If declined</span>
            <h2 className="ins-hero-title">
              Alternative routes the match logic tries.
            </h2>
            <p className="ins-hero-sub">
              A sub-580 decline on a repair-financing application does not
              mean no financing exists for the situation. The match logic
              routes through alternatives:
            </p>
            <ul className="product-list">
              <li>
                <strong>
                  <Link href="/trucking-working-capital">Working capital</Link>{" "}
                  with a different lender subset.
                </strong>{" "}
                If the operation has revenue but FICO declined the
                repair-specific lenders, working-capital lenders with broader
                underwriting may fit.
              </li>
              <li>
                <strong>
                  <Link href="/factoring">Factoring</Link> against open
                  invoices.
                </strong>{" "}
                If the operator has invoiced receivables on Net-30 or longer
                terms, factoring funds without underwriting the
                operator&rsquo;s credit — the factor cares about broker
                credit.
              </li>
              <li>
                <strong>Direct-to-shop with deferral.</strong> Some shops
                offer in-house payment plans on larger repairs, especially
                for repeat customers. Not a financing product per se, but
                worth asking the shop.
              </li>
              <li>
                <strong>Smaller financing with a buffer plan.</strong>{" "}
                Funding $20K of a $35K repair plus a deferred-parts
                arrangement with the shop can close the gap when full
                financing does not.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a sub-580 transmission-rebuild request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-op, 558 FICO post a 2024 medical bankruptcy
                  discharge, one 2018 Cascadia, 18 months of operating
                  history in the current authority.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  DT12 transmission actuator failure. Authorized shop
                  estimate $19,200 including parts and labor. Truck been at
                  the shop four days.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Estimator output</span>
                <span className="product-example-value">
                  Best fit: truck repair financing in the sub-580 lender
                  subset. Working capital also evaluated but lower fit due
                  to credit and time-in-business mix.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Match output</span>
                <span className="product-example-value">
                  $20,000 at 30% APR, 15-month term, $1,635 monthly.
                  Direct-to-shop disbursement. Funded the same banking day
                  after sign-off.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Outcome</span>
                <span className="product-example-value mono">
                  Truck back on the road on day six. Monthly payment fits the
                  operator&rsquo;s run rate at 1.28 DSCR.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions on bad credit truck repair financing.
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

        <section className="ins-sunken">
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Bad credit doesn&rsquo;t disqualify the operation.
            </h2>
            <p className="ins-hero-sub">
              500 FICO floor. Revenue-first underwriting. Soft-pull match in
              about 20 minutes. One hard pull only with the lender you
              choose.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repairs"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Or check my fit first (no credit pull) →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing →
                </Link>
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
                <Link href="/factoring">Factoring →</Link>
              </li>
              <li>
                <Link href="/factoring-vs-mca">Factoring vs MCA →</Link>
              </li>
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing →
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
