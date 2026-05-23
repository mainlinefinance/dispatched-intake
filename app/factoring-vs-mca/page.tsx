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

const TOC_ITEMS = [
  { id: "tldr", label: "The short answer" },
  { id: "factoring-defined", label: "What factoring is" },
  { id: "mca-defined", label: "What an MCA is" },
  { id: "side-by-side", label: "Side-by-side" },
  { id: "the-math", label: "The math: fees vs APR" },
  { id: "when-factoring-wins", label: "When factoring wins" },
  { id: "when-neither-fits", label: "When neither fits" },
  { id: "mca-red-flags", label: "MCA red flags" },
  { id: "composite", label: "Composite scenario" },
  { id: "faq", label: "FAQ" },
] as const;

export const metadata: Metadata = {
  title: "Factoring vs MCA for Truckers: Side-by-Side | Dispatched",
  description:
    "Factoring sells invoices for a flat fee; MCA advances cash against future receipts at brutal effective APRs. Side-by-side for trucking owner-operators.",
  alternates: { canonical: "/factoring-vs-mca" },
  openGraph: {
    title: "Factoring vs MCA for Truckers: Side-by-Side | Dispatched",
    description:
      "Factoring sells invoices for a flat fee; MCA advances cash against future receipts at brutal effective APRs. Side-by-side for trucking owner-operators.",
    url: "/factoring-vs-mca",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Factoring vs MCA for Truckers: Side-by-Side | Dispatched",
    description:
      "Factoring sells invoices for a flat fee; MCA advances cash against future receipts at brutal effective APRs. Side-by-side for trucking owner-operators.",
  },
};

const PAGE_URL = "https://dispatched.finance/factoring-vs-mca";

const faqs = [
  {
    q: "Is a merchant cash advance a loan?",
    a: "Legally, no — and that distinction is the whole point of the product. An MCA is structured as the sale of a percentage of your future revenue at a discount, not a loan. That structure lets the funder operate outside the state usury caps that would otherwise make the effective rates illegal, lets them avoid Truth in Lending Act disclosures, and lets them collect via daily or weekly ACH debits without going through a borrower-default process. The economic substance feels exactly like a loan, but the contract is a receivables purchase agreement, which is why MCAs can carry effective APRs of 60% to 350% on paper terms that look small at a glance.",
  },
  {
    q: "How does factoring compare on cost?",
    a: "Factoring fees on the Dispatched panel typically run 1% to 4% of each invoice's face value, depending on whether the structure is recourse or non-recourse, the broker's credit, the volume you factor monthly, and the average days-to-pay. There is no APR because factoring is the sale of a specific receivable, not a loan. An MCA's factor rate of 1.30 — which sounds comparable — actually means you repay 130% of the cash advanced over an average of 6 to 9 months, which works out to roughly 60% to 110% effective APR. Apples-to-oranges by design.",
  },
  {
    q: "Why do MCA funders target trucking?",
    a: "Three reasons. First, owner-operators run uneven cashflow against fixed expenses (fuel, settlements, insurance, repair), which creates an irresistible 'just need it this week' frame that MCA sales scripts exploit. Second, trucking has visible revenue — broker payments are documented and predictable, which lets MCA funders model future receipts confidently. Third, the industry has a high concentration of credit-constrained operators (new authorities, post-bankruptcy operators, sub-580 FICO) who get declined by conventional lenders and are funneled toward MCAs as a 'next-best' option. Factoring is the actual next-best option for most of them.",
  },
  {
    q: "Can I use factoring to pay off an MCA?",
    a: "Sometimes, but the mechanics matter. Most MCA contracts contain a 'lockbox' or 'COD' provision that gives the funder first claim on incoming receivables — which is exactly what factoring relies on. You typically need the MCA paid off before a factor will fund you, or you need the MCA funder to subordinate, which they rarely do. The cleanest path is a working-capital loan large enough to satisfy the MCA in full, then a factoring relationship for ongoing cashflow. This is one of the most common matches we route on the Dispatched panel.",
  },
  {
    q: "What is a factor rate and why is it misleading?",
    a: "A factor rate is a multiplier — typically 1.20 to 1.50 — that you multiply against the advance amount to get the total repayment. A $50,000 advance at 1.35 means you repay $67,500. The reason it's misleading is that the factor rate is fixed regardless of how fast you repay, while APR scales with time. An MCA repaid in 6 months at a 1.35 factor rate carries roughly 70% effective APR; the same factor rate over 9 months is closer to 50%. The funder gets a fixed dollar return; you pay a higher effective APR if you pay faster. There is no prepayment benefit.",
  },
  {
    q: "What is a confession of judgment and is it still legal?",
    a: "A confession of judgment is a contract clause where you waive your right to defend yourself in court if the MCA funder claims you defaulted. Historically, MCA funders used it to obtain default judgments in New York courts within days and seize bank accounts before the operator could respond. New York banned out-of-state COJs in 2019 (NY CPLR § 3218), and several other states have followed. Many MCA contracts now use arbitration clauses or 'consent to jurisdiction' provisions instead — different mechanism, similar effect. If you see either clause, treat it as a major risk signal.",
  },
  {
    q: "How does the matching platform handle factoring vs MCA?",
    a: "Dispatched is a matching platform, not a direct lender. When an operator applies, the intake captures revenue patterns, broker mix, time in business, and current obligations (including any active MCAs), then routes to lenders and factors whose underwriting fits the profile. Operators with active MCAs typically get matched to working-capital lenders willing to refinance, or to factors willing to coordinate a buyout. Operators without MCAs get matched based on whether their cashflow problem is invoice-level (factoring fits) or operation-level (working capital fits). The two routes use different lender panels.",
  },
] as const;

export default function FactoringVsMcaPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd payload={breadcrumbList([
        { name: "Home", url: "https://dispatched.finance/" },
        { name: "Factoring vs MCA", url: PAGE_URL },
      ])} />
      <JsonLd payload={article({
        headline: "Factoring vs MCA for trucking owner-operators",
        description:
          "Side-by-side comparison of invoice factoring and merchant cash advance products for trucking operations: how each is structured, what each costs in real APR terms, when each fits, and how the matching platform routes between them.",
        url: PAGE_URL,
        datePublished: today,
        dateModified: today,
      })} />
      <JsonLd payload={faqPage(faqs.map((f) => ({ q: f.q, a: f.a })))} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Side-by-side</span>
            <h1 className="ins-hero-title">
              Factoring vs MCA for trucking owner-operators.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              Invoice factoring and merchant cash advances both put cash
              in your account in a few days, but they are not the same
              product class and the real cost difference is enormous.
              Factoring sells specific receivables for a flat fee in the
              1%–4% range. An MCA advances cash against future revenue at
              effective APRs that routinely land between 60% and 200%.
              This page walks through the structural differences, the
              math, and when each fits a trucking operation — written for
              owner-operators and small fleets making the choice without
              a CFO.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=other" className="btn btn--primary btn--lg">
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
            <h2 className="ins-hero-title">Different products. Different math.</h2>
            <p className="ins-hero-sub">
              <Link href="/invoice-factoring-for-truckers">Invoice factoring</Link>{" "}
              is the sale of a specific outstanding invoice at a discount.
              You get 85% to 97% of the invoice face value the same or
              next banking day; the factor collects from your broker on
              the original payment terms; you receive the reserve minus
              the factoring fee when the broker pays. There is no APR
              because it is not a loan — it is a receivables transaction.
            </p>
            <p className="ins-hero-sub">
              A merchant cash advance is the sale of a percentage of
              future revenue at a discount. You receive a lump sum today
              and repay it by handing over a fixed percentage of every
              future deposit (or a fixed daily or weekly ACH debit) until
              you have delivered the full agreed payback amount. The
              difference between cash in and cash out is the cost. Because
              the contract is structured as a sale rather than a loan,
              MCA funders avoid usury caps, lending licenses, and Truth in
              Lending Act disclosures — the same product, regulated like a
              loan, would be illegal in most states.
            </p>
            <p className="ins-hero-sub">
              In plain numbers: a $50,000 cash need solved by factoring
              costs roughly $500 to $2,000 in fees against the invoice
              face value. The same need solved by an MCA at a 1.35 factor
              rate costs $17,500 of cash repayment over 6 to 9 months.
              That is not a typo. The two products are routinely framed
              as equivalent by sales reps because both fund quickly with
              minimal credit underwriting — but the cost gap is roughly
              an order of magnitude.
            </p>
          </div>
        </section>

        <section id="factoring-defined">
          <div className="ins-container">
            <span className="ins-eyebrow">What factoring is</span>
            <h2 className="ins-hero-title">Selling an invoice, not borrowing.</h2>
            <p className="ins-hero-sub">
              Trucking invoice factoring works at the invoice level. You
              haul a load, generate an invoice to the broker or shipper
              with a bill of lading and proof of delivery, and submit it
              to the factor. The factor verifies the load, advances 85%
              to 97% of the face value to your account, and waits for the
              broker to pay on the original net-30, net-45, or net-60
              terms. Once the broker pays the factor directly, the factor
              releases the reserve (the 3% to 15% held back) minus their
              fee.
            </p>
            <p className="ins-hero-sub">
              The structure has three important properties. First, there
              is no balance sheet debt — factoring does not show up as a
              loan on any subsequent application because legally it is
              not one. Second, the cost is a fixed fee per invoice; there
              is no compounding and no early-payoff penalty, because
              there is no schedule. Third, the underwriting is on the
              broker&rsquo;s credit, not yours. A factor cares whether the
              broker will pay; they do not care much about your{" "}
              <Link href="/glossary/fico">FICO</Link> score. This is why
              factoring is often the only product available to
              operators in their first six months after authority, post-
              bankruptcy operators, and sub-580 FICO owner-operators.
            </p>
            <p className="ins-hero-sub">
              Factoring scales with revenue. The more you haul, the more
              cash you can pull — there is no fixed line of credit to
              exceed. That makes it well-suited to operations whose
              revenue is growing but whose receivables are stretched.
              The trade-off is that factoring only works on receivables
              you have already generated. It cannot fund equipment, it
              cannot fund repairs to a truck that is currently off the
              road and not generating receivables, and it cannot fund
              the gap between today and your next load.
            </p>
          </div>
        </section>

        <section id="mca-defined" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">What an MCA is</span>
            <h2 className="ins-hero-title">Selling future revenue at a steep discount.</h2>
            <p className="ins-hero-sub">
              A merchant cash advance is a contract in which the funder
              buys a percentage of your future revenue at a discount, in
              exchange for a lump sum delivered today. The two key
              numbers in any MCA are the <em>factor rate</em> and the{" "}
              <em>holdback</em>. The factor rate (typically 1.20 to 1.50)
              multiplies against the advance amount to determine the
              total payback. A $50,000 advance at a 1.35 factor rate
              means you repay $67,500 — not in installments, but by
              handing over a fixed slice of every future deposit until
              the full amount is delivered.
            </p>
            <p className="ins-hero-sub">
              The holdback is the percentage of each deposit the funder
              takes. Trucking-targeted MCAs typically use a fixed daily
              or weekly ACH debit rather than a true percentage holdback,
              because trucker deposits are lumpy and a percentage model
              would be unpredictable. A $67,500 payback at $556 per
              business day works out to roughly 121 business days, or
              just under six months. That speed is exactly what makes
              the effective APR so brutal: the funder collects their
              fixed dollar return on an aggressive timeline, which means
              the borrowed money is outstanding for a short window, which
              means the cost-per-unit-time runs to triple-digit APR.
            </p>
            <p className="ins-hero-sub">
              MCA contracts frequently contain provisions that do not
              appear in conventional financing: confessions of judgment,
              consent to jurisdiction in remote states, personal
              guarantees, and &ldquo;stacking&rdquo; allowances that let the funder
              file a second position against receivables already pledged
              to a factor. The Federal Trade Commission and several
              state attorneys general have brought enforcement actions
              against MCA funders for predatory collection practices,
              but the product class remains widely available because the
              receivables-purchase legal frame is durable. If you are
              considering an MCA, treat the contract review as the most
              important hour of work you will do that quarter.
            </p>
          </div>
        </section>

        <section id="side-by-side">
          <div className="ins-container">
            <span className="ins-eyebrow">Side-by-side</span>
            <h2 className="ins-hero-title">Direct comparison.</h2>
            <ul className="product-list">
              <li>
                <strong>Legal structure.</strong> Factoring is the sale
                of a specific receivable. MCA is the sale of a percentage
                of future revenue. Neither is technically a loan, but the
                economic substance differs sharply.
              </li>
              <li>
                <strong>Cost basis.</strong> Factoring charges a fee on
                each invoice (1%–4% of face value). MCA charges a factor
                rate that resolves to roughly 60%–200% effective APR
                depending on payback speed.
              </li>
              <li>
                <strong>Underwriting.</strong> Factoring underwrites the
                broker&rsquo;s credit. MCA underwrites your historical revenue
                deposits — typically 3 to 6 months of bank statements.
              </li>
              <li>
                <strong>Speed to funding.</strong> Factoring funds the
                same banking day for invoices submitted before cutoff
                once the relationship is set up; initial setup runs 3–7
                days. MCA funds in 24–72 hours including setup, which is
                why it appeals when cashflow is already in crisis.
              </li>
              <li>
                <strong>Repayment.</strong> Factoring &ldquo;repays&rdquo; itself —
                the broker pays the factor on the original terms. MCA
                requires daily or weekly ACH debits from your operating
                account starting the day after funding.
              </li>
              <li>
                <strong>Balance sheet treatment.</strong> Factoring is
                off-balance-sheet. MCA shows up as a contingent liability
                and frequently blocks the operator from being approved
                for conventional financing afterward.
              </li>
              <li>
                <strong>Stackability.</strong> A factor will not let you
                factor invoices already pledged to another factor. MCA
                funders frequently allow &ldquo;stacking&rdquo; — taking a second,
                third, or fourth MCA against the same future revenue — at
                progressively worse rates. Stacking is the most common
                path to operator bankruptcy in trucking finance.
              </li>
              <li>
                <strong>Exit path.</strong> Stopping factoring is easy:
                finish the current invoices in the queue, do not submit
                new ones, the relationship winds down. Stopping an MCA
                requires either paying off the remaining balance in full
                or refinancing with a conventional product, which usually
                means a <Link href="/trucking-working-capital">working capital loan</Link>{" "}
                large enough to cover the MCA payoff.
              </li>
            </ul>
          </div>
        </section>

        <section id="the-math" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The math</span>
            <h2 className="ins-hero-title">Why a 1.35 factor rate is not 35% APR.</h2>
            <p className="ins-hero-sub">
              The most common framing trick in MCA sales is presenting
              the factor rate as if it were an interest rate. It is not.
              Consider a $50,000 advance at a 1.35 factor rate, payable
              over 6 months via $556 daily ACH debits (roughly $11,250
              per month). The total repayment is $67,500. The &ldquo;cost&rdquo; is
              $17,500, or 35% of the cash advanced.
            </p>
            <p className="ins-hero-sub">
              That 35% looks like an annual rate. It is not — it is the
              full cost over 6 months. To translate to APR, you need to
              account for the fact that you do not have the full $50,000
              outstanding for the full 6 months; you are paying it down
              continuously, so the average balance is roughly half.
              Working that calculation honestly gives an effective APR
              between 110% and 140%, depending on the exact payment
              schedule. If the same advance is repaid in 4 months instead
              of 6, the effective APR rises to ~200%. The faster you
              repay, the worse the APR.
            </p>
            <p className="ins-hero-sub">
              Now run the same $50,000 cash need through factoring.
              Assume the operator has roughly $250,000 in outstanding
              receivables across two brokers paying on net-45. A factor
              advances 92% on submission — about $230,000 of cash on day
              one, against a $50,000 actual cashflow need. The fee at
              3% across that $250,000 is $7,500, paid out of the reserve
              over the next 45 days as the brokers pay. The operator
              gets more cash, faster, at less than half the dollar cost
              of the MCA, with no daily ACH debit and no second-position
              filing against receivables. That is the structural reason
              factoring should be tried first whenever the operator has
              invoiced receivables to work with.
            </p>
          </div>
        </section>

        <section id="when-factoring-wins">
          <div className="ins-container">
            <span className="ins-eyebrow">When factoring wins</span>
            <h2 className="ins-hero-title">If you have receivables, factor them.</h2>
            <ul className="product-list">
              <li>
                <strong>You have invoiced receivables.</strong> If you
                have at least one paid load with a clean bill of lading
                and an open invoice to a broker on net-30 or longer
                terms, factoring is structurally cheaper than any MCA. No
                exceptions in the typical owner-operator case.
              </li>
              <li>
                <strong>Your brokers pay slowly.</strong> Net-45 and
                net-60 brokers are exactly the case factoring was built
                for. The longer the broker&rsquo;s payment terms, the larger
                the financing benefit of factoring relative to the fee.
              </li>
              <li>
                <strong>You are credit-constrained.</strong> Sub-580
                FICO, post-bankruptcy, less than six months of operating
                authority, or a recent <Link href="/glossary/ucc-1">UCC-1</Link>{" "}
                filing against the business — these typically lock you
                out of conventional working capital and equipment loans.
                Factoring is often the only legitimate product available,
                and the only legitimate product that does not carry
                triple-digit APR.
              </li>
              <li>
                <strong>You want to keep debt off the balance sheet.</strong>{" "}
                Operators planning to buy a truck, expand to a small
                fleet, or apply for new authority financing in the next
                12 months benefit from factoring&rsquo;s off-balance-sheet
                treatment. An active MCA on the books typically
                disqualifies the operator from{" "}
                <Link href="/new-authority-truck-financing">new authority financing</Link>.
              </li>
              <li>
                <strong>Your problem is timing, not scale.</strong>{" "}
                Factoring smooths receivables. It does not enlarge the
                business. If your cashflow problem is &ldquo;I will be paid
                eventually, I just need it now,&rdquo; factoring is the
                surgical fit.
              </li>
            </ul>
          </div>
        </section>

        <section id="when-neither-fits" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">When neither fits</span>
            <h2 className="ins-hero-title">If you don&rsquo;t have receivables yet.</h2>
            <p className="ins-hero-sub">
              Factoring requires invoiced receivables. If your cashflow
              problem precedes the first invoice — a startup operation,
              a truck currently off the road, a major repair quote you
              cannot front — factoring cannot help and MCAs are the
              wrong tool even though they will fund. The right products
              in that case are:
            </p>
            <ul className="product-list">
              <li>
                <Link href="/trucking-working-capital">Working capital loans</Link>{" "}
                — fixed amount, fixed APR (typically 14%–34% on the
                Dispatched panel), monthly repayment, full pre-payoff
                allowed without penalty. Suitable when the cashflow gap
                will resolve within 6 to 24 months and the operator&rsquo;s
                revenue can support a fixed payment.
              </li>
              <li>
                <Link href="/truck-repair-loans">Truck repair financing</Link>{" "}
                — direct-to-shop financing for repair invoices, typically
                with same-day funding and 6–36 month amortization.
                Suitable when the truck is off the road and the operator
                cannot front the repair from cash. Direct-to-shop
                structure means the operator never touches the cash,
                which simplifies the underwriting.
              </li>
              <li>
                Equipment financing — secured by the truck or trailer
                itself, typically 9%–18% APR. Suitable for buying or
                refinancing equipment, not for general cashflow.
              </li>
            </ul>
            <p className="ins-hero-sub">
              The wrong move in any of these scenarios is to take an MCA
              and then layer a second MCA on top when the first
              accelerates cashflow problems instead of solving them. The
              second-MCA pattern is the most common path to insolvency in
              trucking finance. See the{" "}
              <Link href="/research">research</Link> section for the
              composite frequency data.
            </p>
          </div>
        </section>

        <section id="mca-red-flags">
          <div className="ins-container">
            <span className="ins-eyebrow">Contract red flags</span>
            <h2 className="ins-hero-title">What to look for before signing an MCA.</h2>
            <p className="ins-hero-sub">
              If you are still considering an MCA — for example because
              you genuinely have no receivables to factor and no
              conventional working capital option — read the contract
              carefully for the following clauses. Any one of them is a
              signal to walk; multiple is a signal to run.
            </p>
            <ul className="product-list">
              <li>
                <strong>Confession of judgment (COJ).</strong> A waiver
                of your right to defend yourself in court if the funder
                claims default. Banned in New York since 2019 but still
                common in contracts governed by other states&rsquo; law.
              </li>
              <li>
                <strong>Personal guarantee plus confession of judgment.</strong>{" "}
                The combination lets the funder pursue your personal
                assets — including the house — without a trial. Devastating
                in default.
              </li>
              <li>
                <strong>Reconciliation only at funder&rsquo;s discretion.</strong>{" "}
                Many MCAs promise &ldquo;reconciliation&rdquo; if your revenue drops,
                meaning a temporary reduction in the daily debit. If the
                contract makes reconciliation discretionary, the funder
                will deny it.
              </li>
              <li>
                <strong>&ldquo;Sale&rdquo; language that hides minimum return guarantees.</strong>{" "}
                A true receivables purchase has true risk to the funder.
                If the contract guarantees the funder a minimum return
                regardless of your revenue, the contract is functionally
                a loan and is potentially illegal under state usury law —
                but the operator cannot enforce that without litigation.
              </li>
              <li>
                <strong>Stacking allowed.</strong> Provisions that allow
                the funder to take a second or third position behind
                other MCAs. Even if you do not stack on day one, the
                provision invites future cashflow disasters.
              </li>
              <li>
                <strong>Origination fees over 3%.</strong> Fees stacked
                on top of the factor rate. A &ldquo;1.35 factor rate plus 5%
                origination&rdquo; is functionally a 1.42 factor rate.
              </li>
            </ul>
            <p className="ins-hero-sub">
              The Dispatched panel routes away from funders using these
              clauses by default. See the{" "}
              <Link href="/methodology">methodology</Link> for the
              specific panel-membership criteria.
            </p>
          </div>
        </section>

        <section id="composite" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">What a refinance looks like.</h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower.
              See <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Owner-operator, 1 truck, 22 months operating, three
                  brokers on Net-45 and Net-60 terms. Took a $35,000 MCA
                  9 months ago at a 1.40 factor rate to cover a
                  transmission rebuild. $14,000 remaining on the payback.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Situation</span>
                <span className="product-example-value">
                  Daily ACH of $389 is eating settlement weeks. Operator
                  is current but cannot absorb a slow-pay broker without
                  missing fuel or insurance. Wants out of the MCA.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Match output</span>
                <span className="product-example-value">
                  Best fit: a working-capital loan sized to cover the
                  $14,000 MCA payoff plus three months of buffer
                  ($28,000 total at 24% APR, 18-month term, $1,790
                  monthly), paired with a spot factoring relationship
                  on the Net-60 broker invoices going forward to prevent
                  recurrence.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Outcome</span>
                <span className="product-example-value mono">
                  Effective APR drops from ~95% (MCA) to 24% (working
                  capital); daily cash drag drops from $389 to ~$83;
                  factoring covers the cashflow gap on slow-pay
                  receivables going forward.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">Questions about factoring and MCA.</h2>
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
              The right product depends on whether you have receivables.
            </h2>
            <p className="ins-hero-sub">
              If you have invoiced loads on net-30 or longer terms,
              factoring is almost always the right answer. If you do not,
              a working-capital loan or repair financing usually beats
              any MCA on cost by an order of magnitude.
            </p>
            <div className="product-hero-ctas">
              <Link href="/apply?useCase=other" className="btn btn--primary btn--lg">
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
              <li><Link href="/invoice-factoring-for-truckers">Invoice factoring for truckers →</Link></li>
              <li><Link href="/trucking-working-capital">Working capital →</Link></li>
              <li><Link href="/truck-repair-loans">Truck repair loans →</Link></li>
              <li><Link href="/new-authority-truck-financing">New authority financing →</Link></li>
              <li><Link href="/research">Research →</Link></li>
              <li><Link href="/methodology">Methodology →</Link></li>
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
