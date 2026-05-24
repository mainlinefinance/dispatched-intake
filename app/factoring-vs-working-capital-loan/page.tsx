import type { Metadata } from "next";
import Link from "next/link";
import EditorialByline from "@/components/landing/EditorialByline";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import PageTOC from "@/components/landing/PageTOC";
import StickyCTABar from "@/components/landing/StickyCTABar";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
} from "@/components/seo/JsonLd";

/* /factoring-vs-working-capital-loan — comparison page in the
   /factoring-vs-mca template. Both products are legitimate (unlike the
   MCA comparison) — the page's editorial center is on matching the
   product to the shape of the cashflow gap, not on warning against
   either. */

const TOC_ITEMS = [
  { id: "tldr", label: "The short answer" },
  { id: "factoring-defined", label: "What factoring is" },
  { id: "working-capital-defined", label: "What a working capital loan is" },
  { id: "side-by-side", label: "Side-by-side" },
  { id: "the-math", label: "The math" },
  { id: "when-factoring-wins", label: "When factoring wins" },
  { id: "when-working-capital-wins", label: "When working capital wins" },
  { id: "can-you-use-both", label: "Using both together" },
  { id: "composite", label: "Composite scenario" },
  { id: "faq", label: "FAQ" },
] as const;

export const metadata: Metadata = {
  title:
    "Factoring vs Working Capital Loan for Truckers: Side-by-Side | Dispatched",
  description:
    "Factoring sells specific invoices for a fee; a working capital loan delivers a lump sum at fixed APR. Side-by-side for trucking operations choosing between them — and when to use both.",
  alternates: { canonical: "/factoring-vs-working-capital-loan" },
  openGraph: {
    title:
      "Factoring vs Working Capital Loan for Truckers: Side-by-Side | Dispatched",
    description:
      "Factoring sells specific invoices for a fee; a working capital loan delivers a lump sum at fixed APR. Side-by-side for trucking operations choosing between them — and when to use both.",
    url: "/factoring-vs-working-capital-loan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Factoring vs Working Capital Loan for Truckers: Side-by-Side | Dispatched",
    description:
      "Factoring sells specific invoices for a fee; a working capital loan delivers a lump sum at fixed APR. Side-by-side for trucking operations choosing between them — and when to use both.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/factoring-vs-working-capital-loan";

const faqs = [
  {
    q: "Is factoring or working capital cheaper?",
    a: "Factoring is structurally cheaper for the receivables-timing problem — the per-invoice fee, when translated to an effective annual cost, typically lands in the 12% to 18% range and the operator only carries the cost for the days between submission and broker payment. Working capital is competitive when the cash need is not a timing problem but a scale problem, because factoring cannot solve a scale problem. The direct comparison is misleading; the right comparison is factoring for the receivables timing, working capital for the one-off scale event.",
  },
  {
    q: "Can I take a working capital loan if I'm already factoring?",
    a: "Yes. The two products coexist cleanly. The factor takes a UCC-1 filing on receivables; an unsecured working capital lender takes no overlapping security interest. The lender will see the factoring relationship in underwriting and account for it in the DSCR calculation — the factor's advances appear as deposits, the reserve releases appear as deposits, the fees appear as expenses. Most working capital lenders on the Dispatched panel routinely fund operators with active factoring.",
  },
  {
    q: "Does factoring help me build business credit?",
    a: "Indirectly. Factoring itself does not report to business credit bureaus because it is not a loan. The operation's cleaner cashflow from factoring tends to support better deposit consistency, which strengthens the next working capital or equipment loan application. Operators who use factoring to stop running through monthly cash gaps usually see their next financing application underwrite cleaner — the bank statements look more stable.",
  },
  {
    q: "What if I have only one broker — can I factor?",
    a: "Yes, but the factor cares about that broker's credit specifically. A single broker on Net-45 with a clean credit history factors cleanly. A single broker who has been slow-paying or who is on the factor's watch list may either decline or charge a higher fee. Most factors prefer broker diversification (three or more) but they fund single-broker operations regularly.",
  },
  {
    q: "Will a working capital loan show up if I apply for equipment financing later?",
    a: "Yes. The loan appears as outstanding debt and the equipment lender includes it in the DSCR calculation for the new financing. Operators planning a major equipment purchase in 12 months should size the working capital appropriately — leaving headroom for the upcoming equipment debt service. Factoring, by contrast, does not show up as debt on the next application, which is part of its appeal for operators planning equipment expansion.",
  },
  {
    q: "Can I use factoring to pay off a working capital loan?",
    a: "Mechanically yes, but it rarely saves money. The factoring fees on enough invoices to retire a $50K working capital loan are roughly the same as the remaining interest on the loan. Factoring's value comes from the off-balance-sheet treatment and the receivables-timing smoothing, not from being a cheaper alternative for an already-issued loan. Operators looking to retire a working capital loan early are usually better off making lump-sum prepayments out of normal operating cash.",
  },
  {
    q: "How fast can I get either product?",
    a: "Working capital on the Dispatched panel funds same banking day for many operators — soft-pull match in about 20 minutes, hard pull only at lender selection, wire same banking day after sign-off. Factoring relationships take longer to set up initially (3 to 7 business days for the broker verifications, UCC-1 filing, and onboarding) but fund individual invoices same or next banking day once the relationship is live. For a money-today need, working capital is faster on day one; for an ongoing cashflow mechanism, factoring is faster over the life of the relationship.",
  },
  {
    q: "What about equipment financing — where does it fit?",
    a: "Equipment financing is a third product class, secured against the truck or trailer itself, typically 9% to 18% APR. It is not a substitute for either factoring or working capital — it is the right product when the cash need is specifically to buy or refinance a piece of equipment. Operators sometimes try to use working capital for an equipment purchase to skip the lien filing; the math rarely favors that — the working capital APR is higher and the term is shorter than equipment financing for the same equipment use case.",
  },
] as const;

export default function FactoringVsWorkingCapitalLoanPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Factoring vs working capital loan", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Factoring vs working capital loan for trucking",
          description:
            "Side-by-side comparison of invoice factoring and working capital loans for trucking operations: how each is structured, what each costs in real APR terms, when each fits the cashflow problem, and how to use both together.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd payload={faqPage(faqs.map((f) => ({ q: f.q, a: f.a })))} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Side-by-side</span>
            <h1 className="ins-hero-title">
              Factoring vs working capital loan for trucking.
            </h1>
            <EditorialByline updated={today} format="iso" />
            <p className="ins-hero-sub">
              Both products solve cashflow gaps. The difference is the shape
              of the gap. Factoring smooths a timing problem — you have
              invoiced loads sitting on Net-30, Net-45, or Net-60 terms and
              need the money now. A working capital loan funds a scale
              problem — you need cash for something that hasn&rsquo;t been
              invoiced yet, like a repair, an equipment down payment, or a
              buffer through a slow stretch. Most operators end up using
              both, in different phases of the same operation. This page
              walks through how each is structured, what each costs in real
              APR terms, and how to know which one (or which combination)
              fits.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=other"
                className="btn btn--primary btn--lg"
              >
                See my financing options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              Soft-pull match. · Takes about 2 minutes.
            </p>
          </div>
        </section>

        <PageTOC items={TOC_ITEMS} />

        <section id="tldr" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">
              Different products. Different cashflow shapes.
            </h2>
            <p className="ins-hero-sub">
              <Link href="/factoring">Factoring</Link> is the sale of a
              specific outstanding invoice. The factor advances 85% to 97%
              of the face value of the invoice to the operator&rsquo;s
              account the same or next banking day; the factor collects from
              the broker on the original payment terms; the factor releases
              the reserve (the 3% to 15% held back) minus the factoring fee
              when the broker pays. The fee on the Dispatched panel
              typically runs 1% to 4% of face value. Factoring is not a
              loan — it is a receivables transaction — and it does not
              generate balance-sheet debt.
            </p>
            <p className="ins-hero-sub">
              A{" "}
              <Link href="/trucking-working-capital">working capital loan</Link>{" "}
              is a term loan, generally unsecured, sized to the
              operator&rsquo;s cashflow rather than to any specific
              receivable. The lender wires a fixed amount to the
              operator&rsquo;s account; the operator repays on a fixed
              schedule (typically 6 to 36 months) at a fixed APR (typically
              14% to 34% on the Dispatched panel for trucking working
              capital). It is debt on the balance sheet. It can be used for
              anything — repair, equipment, expansion, buffer, debt
              consolidation.
            </p>
            <p className="ins-hero-sub">
              The choice is not factoring vs. working capital in the
              abstract. The choice is: does the cashflow gap I&rsquo;m
              trying to close exist <em>because money is owed to me but
              hasn&rsquo;t paid yet</em>, or <em>because money is needed for
              something that hasn&rsquo;t generated revenue yet</em>?
              Factoring fits the first case. Working capital fits the
              second. Operators who run a steady-state trucking business
              almost always end up with both — factoring for the
              receivables timing, working capital for one-off scale events.
            </p>
          </div>
        </section>

        <section id="factoring-defined">
          <div className="ins-container">
            <span className="ins-eyebrow">What factoring is</span>
            <h2 className="ins-hero-title">
              Selling an invoice, not borrowing.
            </h2>
            <p className="ins-hero-sub">
              Trucking invoice factoring works at the invoice level. The
              operator hauls a load, generates an invoice to the broker or
              shipper with a bill of lading and proof of delivery, and
              submits it to the factor. The factor verifies the load,
              advances 85% to 97% of the face value to the operator&rsquo;s
              account, and waits for the broker to pay on the original
              Net-30, Net-45, or Net-60 terms. Once the broker pays the
              factor directly, the factor releases the reserve (3% to 15%
              held back) minus their fee.
            </p>
            <p className="ins-hero-sub">
              Three structural properties matter. First, there is no balance
              sheet debt — factoring does not show up as a loan on any
              subsequent application because legally it is not one. Second,
              the cost is a fixed fee per invoice; there is no compounding
              and no early-payoff penalty, because there is no schedule.
              Third, the underwriting is on the broker&rsquo;s credit, not
              yours. A factor cares whether the broker will pay; they do
              not care much about your{" "}
              <Link href="/glossary/fico">FICO</Link> score. This is why
              factoring is often the only product available to operators in
              their first six months after authority, post-bankruptcy
              operators, and sub-580 FICO owner-operators.
            </p>
            <p className="ins-hero-sub">
              Factoring scales with revenue. The more you haul, the more
              cash you can pull — there is no fixed line of credit to
              exceed. The trade-off is that factoring only works on
              receivables you have already generated. It cannot fund
              equipment, it cannot fund repairs to a truck that is
              currently off the road and not generating receivables, and it
              cannot fund the gap between today and your next load.
            </p>
            <p className="ins-hero-sub">
              Two structural variants exist on the Dispatched panel:{" "}
              <Link href="/glossary/recourse-factoring">recourse factoring</Link>{" "}
              (operator stays liable if the broker doesn&rsquo;t pay; cheaper
              fees) and{" "}
              <Link href="/glossary/non-recourse-factoring">non-recourse factoring</Link>{" "}
              (factor absorbs broker non-payment risk; higher fees). Most
              trucking factoring is recourse.
            </p>
          </div>
        </section>

        <section id="working-capital-defined" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">What a working capital loan is</span>
            <h2 className="ins-hero-title">Borrowing against cashflow.</h2>
            <p className="ins-hero-sub">
              A working capital loan is a short-term unsecured commercial
              term loan, sized against the operator&rsquo;s revenue and debt
              service capacity. The lender wires a fixed amount; the
              operator repays it on a fixed monthly schedule at a fixed APR.
              Terms on the Dispatched panel typically run 6 to 36 months for
              amounts from $10K to $250K.
            </p>
            <p className="ins-hero-sub">
              The loan is unsecured against the operation in the typical
              case — no UCC-1 filing, no lien on the truck, no assignment of
              receivables. The lender underwrites the operation&rsquo;s
              cashflow: three months of bank statements, time in business,
              debt service coverage ratio, FICO band, equipment in the
              fleet, broker mix. The result is a single term sheet with APR,
              monthly payment, total cost over the term, and any fees
              disclosed upfront.
            </p>
            <p className="ins-hero-sub">
              Working capital is the right product when the cashflow gap
              exists for a reason unrelated to receivables timing: a repair
              scope larger than the operating account, an equipment down
              payment or trade-in, a buffer through a known-slow stretch,
              refinancing a higher-cost product like an MCA out of the
              operation, or a new-authority startup expense before the first
              load is invoiced.
            </p>
            <p className="ins-hero-sub">
              The product is debt; it shows up on the operation&rsquo;s
              balance sheet; it requires monthly servicing. Operators who
              already carry debt should size carefully — the panel&rsquo;s
              debt service coverage ratio test of 1.15 to 1.25 is real, and
              overshooting it makes the next loan harder.
            </p>
          </div>
        </section>

        <section id="side-by-side">
          <div className="ins-container">
            <span className="ins-eyebrow">Side-by-side</span>
            <h2 className="ins-hero-title">Direct comparison.</h2>
            <ul className="product-list">
              <li>
                <strong>Legal structure.</strong> Factoring is the sale of a
                specific receivable. Working capital is a commercial term
                loan. One is off-balance-sheet, the other is on.
              </li>
              <li>
                <strong>Cost basis.</strong> Factoring charges a fee per
                invoice (1% to 4% of face value on the panel). Working
                capital charges an APR (14% to 34% on the panel for
                unsecured; lower with collateral). Direct comparison
                requires translating the factoring fee to an annualized
                cost.
              </li>
              <li>
                <strong>Underwriting.</strong> Factoring underwrites the
                broker&rsquo;s credit and the operator&rsquo;s revenue
                stream. Working capital underwrites the operator&rsquo;s
                FICO, time in business, deposit history, and DSCR.
              </li>
              <li>
                <strong>Speed to funding.</strong> Factoring funds the same
                or next banking day for invoices submitted before cutoff,
                once the initial relationship is set up (initial setup runs
                3 to 7 days). Working capital funds the same banking day
                after sign-off in many cases on the panel.
              </li>
              <li>
                <strong>Use of proceeds.</strong> Factoring proceeds become
                cash in the operator&rsquo;s account — no use restrictions.
                Working capital proceeds become cash with no use
                restrictions. Functionally equivalent on use; structurally
                different on availability.
              </li>
              <li>
                <strong>Scaling.</strong> Factoring scales with hauling
                volume. Working capital is a fixed amount that does not
                refill — paying down the loan does not refill availability
                the way factoring&rsquo;s per-invoice mechanic does.
              </li>
              <li>
                <strong>Balance sheet treatment.</strong> Factoring is
                off-balance-sheet. Working capital is on-balance-sheet debt.
              </li>
              <li>
                <strong>Effect on next financing application.</strong>{" "}
                Factoring frequently does not affect a subsequent
                equipment-financing or working-capital application — the
                operation looks unleveraged. Working capital appears on
                subsequent applications as outstanding debt and is included
                in the DSCR calculation for the new financing.
              </li>
              <li>
                <strong>Termination.</strong> Stopping factoring is
                straightforward: finish the current invoices in the queue,
                do not submit new ones. Working capital pays to maturity or
                pays off early (most panel lenders allow prepayment without
                penalty).
              </li>
            </ul>
          </div>
        </section>

        <section id="the-math" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The math</span>
            <h2 className="ins-hero-title">A $50,000 cash need, two ways.</h2>
            <p className="ins-hero-sub">
              Take a $50,000 cash need.
            </p>
            <p className="ins-hero-sub">
              <strong>Solved with factoring.</strong> Assume the operator
              has roughly $250,000 in outstanding receivables across two
              brokers paying on Net-45. The factor advances 92% on
              submission — about $230,000 of cash on day one, against a
              $50,000 actual cashflow need. The fee at 3% across that
              $250,000 is $7,500, paid out of the reserve over the next 45
              days as the brokers pay. Net cost for solving the $50,000
              cashflow problem: roughly $1,500 to $3,000 depending on
              exactly how much factoring volume was used to satisfy the
              actual need. Annualized cost-of-capital equivalent: roughly
              12% to 18% APR, but with the asymmetry that the operator
              pulled forward $230,000 of cash and only used $50,000 of it.
            </p>
            <p className="ins-hero-sub">
              <strong>Solved with working capital.</strong> A $50,000
              working capital loan at 22% APR over 24 months. Monthly
              payment about $2,590. Total cost over the term: roughly
              $62,160. Net cost for solving the $50,000 cashflow problem:
              $12,160 in interest over 24 months. The operator carries the
              full $50,000 on the balance sheet from day one, paying down
              monthly.
            </p>
            <p className="ins-hero-sub">
              The factoring number looks dramatically cheaper. Two important
              caveats: the factoring math only works if the operator has
              $250,000 of receivables to factor — operators without that
              receivables base cannot solve a $50,000 problem through
              factoring. And the factoring &ldquo;savings&rdquo; are partly
              a function of pulling forward $230,000 of cash the operator
              didn&rsquo;t strictly need. If the operator only needed
              $50,000 and didn&rsquo;t reinvest the rest productively, the
              comparison is closer to: $50,000 of usable cash at $1,500
              cost (factoring) vs. $50,000 of usable cash at $12,160 cost
              (working capital). Factoring wins on cost when the
              receivables are there.
            </p>
            <p className="ins-hero-sub">
              The honest framing: when the operator has receivables and a
              timing problem, factoring is structurally cheaper. When the
              operator does not have receivables, or the cash need is for
              something receivables cannot fund (a repair on a truck
              currently off the road, an equipment purchase, a startup
              expense), working capital is the right product. There is no
              wrong product — there is a wrong product for a given gap.
            </p>
          </div>
        </section>

        <section id="when-factoring-wins">
          <div className="ins-container">
            <span className="ins-eyebrow">When factoring wins</span>
            <h2 className="ins-hero-title">
              If you have receivables, factor them.
            </h2>
            <ul className="product-list">
              <li>
                <strong>You have invoiced receivables.</strong> At least one
                paid load with a clean bill of lading and an open invoice
                to a broker on Net-30 or longer terms.
              </li>
              <li>
                <strong>Your brokers pay slowly.</strong> Net-45 and Net-60
                are exactly the case factoring was built for. Net-30 with a
                reliable broker may not be worth the fee; Net-45+ usually
                is.
              </li>
              <li>
                <strong>You are credit-constrained.</strong> Sub-580 FICO,
                post-bankruptcy, less than six months of operating
                authority — factoring underwrites the broker, not the
                operator.
              </li>
              <li>
                <strong>You want to keep debt off the balance sheet.</strong>{" "}
                Operators planning to buy a truck, expand to a small fleet,
                or apply for new authority financing within 12 months
                benefit from factoring&rsquo;s off-balance-sheet treatment.
              </li>
              <li>
                <strong>Your problem is timing, not scale.</strong>{" "}
                I&rsquo;ll be paid eventually, I just need it now is the
                factoring use case. Factoring smooths receivables. It does
                not enlarge the business.
              </li>
            </ul>
          </div>
        </section>

        <section id="when-working-capital-wins" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">When working capital wins</span>
            <h2 className="ins-hero-title">
              If the gap is scale, not timing.
            </h2>
            <ul className="product-list">
              <li>
                <strong>You don&rsquo;t have receivables yet.</strong>{" "}
                Pre-revenue stage of a new authority, truck currently off
                the road, expansion happening before the new-truck revenue
                starts.
              </li>
              <li>
                <strong>The cash need is for a non-receivables purpose.</strong>{" "}
                Repair, equipment down payment, fuel-card buffer, insurance
                renewal lump sum, operating-expense gap.
              </li>
              <li>
                <strong>You have strong credit and stable revenue.</strong>{" "}
                The 14% to 34% APR range works in your favor when the FICO
                is 680+. At that band, the working capital loan can be
                cheaper than factoring for one-off needs that don&rsquo;t
                justify factoring an entire receivables book.
              </li>
              <li>
                <strong>You want a fixed payoff schedule.</strong> Some
                operators prefer the discipline of an end date.
                Factoring&rsquo;s ongoing fee structure works against
                operators who want to be done with the financing.
              </li>
              <li>
                <strong>The cash need is large and one-time.</strong> A
                $75K engine rebuild is not solved by factoring two months
                of receivables — the cash arrives but so does the next two
                months of work. Working capital sized to the event and
                paid down on schedule fits cleaner.
              </li>
              <li>
                <strong>You&rsquo;re refinancing an MCA out.</strong> A
                working capital loan sized to cover an MCA payoff is the
                standard mechanism for getting out of an MCA. See{" "}
                <Link href="/factoring-vs-mca">factoring vs MCA</Link>.
              </li>
            </ul>
          </div>
        </section>

        <section id="can-you-use-both">
          <div className="ins-container">
            <span className="ins-eyebrow">Using both together</span>
            <h2 className="ins-hero-title">
              Most steady-state operations end up here.
            </h2>
            <p className="ins-hero-sub">
              Most steady-state trucking operations end up using both
              products in parallel, for different parts of the cashflow
              problem:
            </p>
            <ul className="product-list">
              <li>
                <strong>Factoring for the ongoing receivables timing.</strong>{" "}
                The operator submits invoices as loads close, the factor
                advances on each, the reserve releases on payment. This is
                the standard cashflow mechanism for an operator hauling for
                Net-30+ brokers.
              </li>
              <li>
                <strong>Working capital for one-off scale events.</strong>{" "}
                When a repair, an equipment expansion, or a buffer need
                arises, the working capital loan covers that specific event
                without disrupting the factoring relationship.
              </li>
            </ul>
            <p className="ins-hero-sub">
              The two products coexist cleanly when set up correctly. A
              factor takes assignment of specific invoices via a UCC-1
              filing on receivables; the working capital lender takes no
              security interest in the operation in the standard unsecured
              case. The two are not competing for the same collateral.
            </p>
            <p className="ins-hero-sub">
              Where they conflict: an MCA in the operation. MCA contracts
              typically take a position against future revenue that overlaps
              with the factor&rsquo;s receivables claim. Operators with an
              active MCA usually need the MCA paid off before a factor will
              fund — or the working capital loan needs to be sized to cover
              both the immediate cash need and the MCA payoff. The
              Dispatched panel handles this routing automatically when the
              application discloses an active MCA.
            </p>
            <p className="ins-hero-sub">
              For new operators setting up the cashflow stack from scratch,
              the sequence is: establish the factoring relationship first
              (lower bar to set up; funds in 3-7 days), use factoring to
              smooth receivables for the first 90 to 180 days, then add a
              working capital relationship when an actual scale event
              creates the need. Reverse-sequencing — taking a working
              capital loan first and adding factoring later — works fine
              but most operators arrive at the same place through the
              receivables-first path.
            </p>
          </div>
        </section>

        <section id="composite" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a two-truck operation with both products looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Small fleet, two 2020 Cascadias, LLC, 2.5 years operating
                  authority. 660 FICO on the managing member. Three
                  brokers, two on Net-45, one on Net-30. Monthly revenue
                  $52K average.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">
                  Receivables situation
                </span>
                <span className="product-example-value">
                  Roughly $145,000 of outstanding receivables across the
                  three brokers. Average days-to-pay 38. Operator runs
                  through cashflow gaps approximately the third week of
                  every month while waiting for Net-45 to settle.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">One-off need</span>
                <span className="product-example-value">
                  $34,000 engine work on truck 1 — an unexpected event, not
                  in the maintenance budget. Truck out of service for 6
                  days.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Match output</span>
                <span className="product-example-value">
                  Two products: (1) factoring relationship at 2.8% per
                  invoice across all three brokers, set up over 5 business
                  days, advancing 92% on submission going forward. (2)
                  working capital loan of $35,000 at 21% APR over 18
                  months, $2,260 monthly, funded same banking day for the
                  repair scope.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Outcome</span>
                <span className="product-example-value mono">
                  Engine work funded immediately by the working capital
                  loan. Ongoing receivables timing smoothed by the
                  factoring relationship. Monthly cashflow becomes
                  predictable instead of swinging with Net-45 payment
                  cycles.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions about factoring and working capital.
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
            <h2 className="ins-hero-title">Match the product to the gap.</h2>
            <p className="ins-hero-sub">
              Receivables timing → factoring. One-off scale → working
              capital. Most operations end up with both. Soft-pull-first,
              see what fits.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=other"
                className="btn btn--primary btn--lg"
              >
                See my financing options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Or check my fit first →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/factoring">Factoring →</Link>
              </li>
              <li>
                <Link href="/trucking-working-capital">
                  Trucking working capital →
                </Link>
              </li>
              <li>
                <Link href="/factoring-vs-mca">Factoring vs MCA →</Link>
              </li>
              <li>
                <Link href="/truck-repair-loans">Truck repair loans →</Link>
              </li>
              <li>
                <Link href="/equipment-financing">Equipment financing →</Link>
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

      <StickyCTABar
        text="Get matched to the right product"
        primaryCtaHref="/apply?useCase=other"
        primaryCtaLabel="See my financing options →"
      />

      <Footer />
    </div>
  );
}
