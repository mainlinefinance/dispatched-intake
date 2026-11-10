import { contentDates } from "@/lib/seo/contentDates";
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
   parent page. How the lender mix changes for lower credit profiles is the
   page's editorial center of gravity. No numeric credit-score floors:
   those are set by each financing partner. */

export const metadata: Metadata = {
  title:
    "Semi Truck Repair Loans With Bad Credit | Dispatched",
  description:
    "Semi truck repair loan options with bad credit. Financing partners weigh revenue alongside credit. Soft pull to start; approval is not guaranteed.",
  alternates: { canonical: "/bad-credit-truck-repair-financing" },
  openGraph: {
    images: ["/opengraph-image"],
    title:
      "Semi Truck Repair Loans With Bad Credit | Dispatched",
    description:
      "Semi truck repair loan options with bad credit. Financing partners weigh revenue alongside credit. Soft pull to start; approval is not guaranteed.",
    url: "/bad-credit-truck-repair-financing",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title:
      "Semi Truck Repair Loans With Bad Credit | Dispatched",
    description:
      "Semi truck repair loan options with bad credit. Financing partners weigh revenue alongside credit. Soft pull to start; approval is not guaranteed.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/bad-credit-truck-repair-financing";

const faqs = [
  {
    q: "What's the minimum credit score for truck repair financing on your panel?",
    a: "Dispatched does not set a minimum credit score; credit requirements are set by each financing partner, and approval is not guaranteed. In practice the panel behaves in tiers. For lower credit profiles, a smaller specialist subset routes at higher rates (24% to 34% APR). For fair credit, most of the panel routes at middle-of-range rates. Stronger credit opens the full panel, including equipment-secured products at 9% to 18% APR. The two-question fit at /qualify gives a first read without any credit pull.",
  },
  {
    q: "Will applying with bad credit hurt my score further?",
    a: "Not at the start. The Dispatched application is a soft-pull match. Soft inquiries are not visible to other lenders and do not affect your score regardless of credit band. A hard pull only happens after you pick a specific lender and move forward on their term sheet. Operators routinely apply, see offers across the panel, and decide not to proceed — without any credit impact.",
  },
  {
    q: "Why do my rates run so much higher with bad credit?",
    a: "Two reasons. First, the lender's credit-loss model assigns higher expected loss to borrowers with lower credit profiles based on observed default rates across the broader market, and pricing covers that loss. Second, the smaller lender subset that works with lower credit profiles has less competition, which keeps the rate spread wider. The exact APR on the term sheet is locked at sign-off — no surprise increases — and the operator sees it side-by-side with any other offers before deciding.",
  },
  {
    q: "What if I'm in active bankruptcy?",
    a: "Active Chapter 7 or Chapter 13 generally takes the operator out of the panel entirely — most lenders cannot fund during an active proceeding. Post-discharge, the panel routes based on the post-discharge credit profile and the time since discharge. Operators recently discharged from Chapter 13 with a year of stable operating history are typically considered by the specialist lender subset; approval is not guaranteed.",
  },
  {
    q: "Can I get a co-signer to help my repair financing application?",
    a: "Some lenders in the specialist subset accept a co-signer or guarantor with stronger credit; others do not. When accepted, the co-signer's credit usually moves the rate down by 200 to 600 basis points and may unlock a larger loan amount or longer term. The application captures the co-signer's information at the lender-selection step, not at the initial soft-pull stage.",
  },
  {
    q: "My truck is in the shop right now. Can I still apply if I haven't paid the shop anything yet?",
    a: "Yes. The Dispatched workflow is built specifically for that case. The application is inside /apply. The lender funds the approved amount to the operator's business account or direct to the shop (depending on the term sheet), and the shop releases the truck. There is no requirement that the operator have already paid the shop, and no requirement that the truck be picked up before funding.",
  },
  {
    q: "Are these MCAs?",
    a: "No. Merchant cash advances are a structurally different product — daily ACH debits, factor-rate pricing, no APR disclosure, and often confessions of judgment in the contract. The Dispatched panel routes away from MCA funders by default. Offers for lower credit profiles on the panel are conventional term loans with monthly payment, fixed APR, and standard borrower protections. See /factoring-vs-mca for the structural distinction.",
  },
  {
    q: "What documents do I need with bad credit?",
    a: "Same document set as the standard repair-loan application: three months of business bank statements, EIN or SSN, DOT number, driver's license, and the shop estimate. Loans over $75K (less common for lower credit profiles) add Schedule C or 1120 and current settlement statements. The lender may request additional revenue documentation — copies of broker contracts or 90-day settlement detail — at higher loan sizes or on borderline applications.",
  },
];

export default function BadCreditTruckRepairFinancingPage() {
  const { published, modified: today } = contentDates("app/bad-credit-truck-repair-financing/page.tsx");
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
          headline: "Bad credit truck repair financing for owner-operators",
          description:
            "How the Dispatched panel routes bad-credit truck-repair financing applications: three credit tiers, what changes at each tier, what the panel weighs alongside credit, and the decline-handling routes.",
          url: PAGE_URL,
          datePublished: published,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Bad credit truck repair financing",
          description:
            "Truck repair financing of $5K–$150K for operators with lower credit profiles. Revenue-based underwriting, soft-pull match; approval is not guaranteed.",
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
              Bad credit with a truck in the shop is not always the dead end
              a bank decline makes it look like. The Dispatched panel weighs
              the operation&rsquo;s revenue, deposit history, and equipment
              alongside credit. Repair loans from $5K to $150K, soft-pull
              match after underwriting review, and a wire after the chosen
              lender signs off; timing depends on the lender and your
              documents. Expect the higher end of the 14% to 34% APR range,
              tighter loan ceilings, and a smaller subset of the panel.
              Credit requirements are set by each financing partner and
              approval is not guaranteed.
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
              No hard credit pull to start.
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
              into roughly three tiers by credit profile:
            </p>
            <ul className="product-list">
              <li>
                <strong>Stronger credit.</strong> Full panel access. Rates toward
                the lower end of the 14% to 34% APR range. Loan amounts up to
                the panel cap of $150K. Equipment-secured products available
                at 9% to 18% APR for tractors with sufficient residual value.
              </li>
              <li>
                <strong>Fair credit.</strong> Most of the panel still
                routes. Rates middle of the range. Loan amounts modestly
                tighter. Equipment-secured product available with stricter
                conditions.
              </li>
              <li>
                <strong>Lower credit profiles.</strong> A smaller subset of the
                panel — specialist lenders that underwrite on revenue and
                deposit history more heavily than credit score. Rates toward the high
                end of the range, often 24% to 34% APR. Loan amounts
                typically capped lower, $5K to $50K. Equipment-secured
                products usually not available — the financing is unsecured
                working capital tied to revenue.
              </li>
            </ul>
            <p className="ins-hero-sub">
              The reason this specialist subset exists at all is that trucking
              has structurally higher concentration of credit-constrained
              operators — new authorities post-COVID, owner-ops working
              through a tax lien, post-bankruptcy operators rebuilding — and
              the revenue these operators generate is real, documentable, and
              stable enough to underwrite even when the credit report does
              not look stable.
            </p>
            <p className="ins-hero-sub">
              What does not exist on the panel: predatory MCAs disguised as
              repair loans. The Dispatched panel routes away from
              confession-of-judgment contracts, daily-ACH receivables
              purchases, and stacking-tolerant funders by default. The
              product for lower credit profiles is a higher-rate term loan with monthly
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
                in the 24% to 34% APR range for lower credit profiles, compared
                to 14% to 24% for stronger credit. The spread is the lender&rsquo;s
                compensation for credit risk and is set on the term sheet —
                no surprise increases later.
              </li>
              <li>
                <strong>Loan ceiling.</strong> The panel&rsquo;s $150K
                repair-loan cap typically does not apply to borrowers with
                lower credit profiles. Practical ceilings in this tier run $5K to $50K
                depending on monthly revenue and time in business. Higher
                repair amounts route to layered products (partial financing
                plus parts deferral with the shop, or a working-capital plus
                factoring combination).
              </li>
              <li>
                <strong>Term length.</strong> Offers in this tier usually run 6 to
                18 months. Longer terms (24 to 36 months) tend to require
                stronger credit or strong equipment collateral.
              </li>
              <li>
                <strong>Direct-to-shop disbursement.</strong> Some
                offers in this tier route the wire directly to the shop rather than to the
                operator&rsquo;s business account. This is a lender-side risk
                control, not a borrower restriction — the operator still
                chooses the shop.
              </li>
              <li>
                <strong>Personal guarantee on LLCs.</strong> Offers in this tier on
                LLC-organized operations typically require a personal
                guarantee from the principal. Stronger-credit offers on the same
                operation may not.
              </li>
              <li>
                <strong>Soft-pull match unchanged.</strong> The credit tier
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
              For lower credit profiles, the credit score is only one of the
              underwriting inputs. The lenders in this tier weight:
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
                <strong>Time in business.</strong> Under 6 months narrows the
                options sharply; 12+ months opens more of the specialist
                lender subset; 24+ months can open the equipment-secured
                option even with a lower credit profile.
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
              A decline on a repair-financing application does not always
              mean no financing exists for the situation. The match logic
              routes through alternatives:
            </p>
            <ul className="product-list">
              <li>
                <strong>
                  <Link href="/trucking-working-capital">Working capital</Link>{" "}
                  with a different lender subset.
                </strong>{" "}
                If the operation has revenue but credit led the
                repair-specific lenders to decline, working-capital lenders with
                broader underwriting may fit.
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
              What a bad-credit transmission-rebuild request looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-op, a lower credit profile after a 2024 medical bankruptcy
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
                  Best fit: truck repair financing in the specialist lender
                  subset. Working capital also evaluated but lower fit due
                  to credit and time-in-business mix.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Match output</span>
                <span className="product-example-value">
                  $20,000 at 30% APR, 15-month term, $1,635 monthly.
                  Direct-to-shop disbursement. Funding timing depends on the lender and your documents
                  after sign-off.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Outcome</span>
                <span className="product-example-value mono">
                  Monthly payment fits the operator&rsquo;s run rate at 1.28
                  DSCR.
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
              Bad credit is not the whole application.
            </h2>
            <p className="ins-hero-sub">
              Revenue weighed alongside credit. Soft-pull match first. One
              hard pull only with the lender you choose. Approval is not
              guaranteed.
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
