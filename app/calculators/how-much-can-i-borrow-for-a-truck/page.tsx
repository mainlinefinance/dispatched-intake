import type { Metadata } from "next";
import Link from "next/link";
import EquipmentLoanCalculator from "@/components/calculators/EquipmentLoanCalculator";
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
  "https://dispatched.finance/calculators/how-much-can-i-borrow-for-a-truck";

export const metadata: Metadata = {
  title: "How Much Can I Borrow for a Semi Truck? | Dispatched",
  description:
    "Calculator + guide. What FICO, down payment, revenue, and truck age unlock on the Dispatched panel — and the typical loan amount range for first-time vs established owner-operators.",
  alternates: {
    canonical: "/calculators/how-much-can-i-borrow-for-a-truck",
  },
};

const faqs = [
  {
    q: "What's the typical loan amount range for an owner-operator semi truck?",
    a: "Loans on the Dispatched panel for Class 8 tractors typically range from $40K for older sleeper trucks to $200K for newer premium sleepers. The amount is set by the truck's appraised value, the down payment, and the operator's revenue history.",
  },
  {
    q: "Can I borrow more if I have a higher FICO?",
    a: "Yes, but indirectly. Higher FICO unlocks lower APR and longer terms, both of which make a given monthly payment service more loan principal. A 700+ FICO operator can typically borrow 20–30% more than a 580 FICO operator at the same monthly-payment capacity.",
  },
  {
    q: "Does the truck age affect how much I can borrow?",
    a: "Yes. Lenders cap the term length based on the truck's expected residual value at payoff. Newer trucks (under 4 years) support 72-month terms; older trucks (8+ years) cap at 36 months. Shorter term = higher monthly = lower borrowable principal at the same payment capacity.",
  },
  {
    q: "What if I'm a first-time owner-operator with no business history?",
    a: "The panel underwrites first-time operators based on personal credit, down payment, and truck value. Plan for 10–20% down minimum. The first-time loan amount is typically 70–80% of what the same operator could borrow with 12+ months of business history. See /owner-operator-financing/first-time for the full picture.",
  },
  {
    q: "Will using the calculator pull my credit?",
    a: "No. The calculator runs locally in your browser using the inputs you provide. No data is sent to lenders. A soft credit pull happens only if you proceed to /qualify and request matching; no impact on your FICO.",
  },
];

export default function HowMuchCanIBorrowForATruckPage() {
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
          {
            name: "How much can I borrow for a semi truck",
            url: PAGE_URL,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "How much can I borrow for a semi truck?",
          description:
            "Calculator + guide to understanding loan amount on the Dispatched panel based on FICO, business history, down payment, truck age, and revenue.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={softwareApplication({
          name: "Semi truck loan amount calculator",
          description:
            "Interactive web tool estimating how much a borrower can borrow for a Class 8 semi truck based on price, down payment, term, condition, and credit band.",
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
            <h1>How much can I borrow for a semi truck?</h1>
            <p>
              The honest answer depends on five variables: FICO, business
              history, down payment, truck age, and revenue. Run the calculator
              below to see your indicative loan amount on the Dispatched panel,
              then read the breakdown of what each variable shifts.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <EquipmentLoanCalculator
              equipmentNoun="semi truck"
              defaultPrice={80_000}
            />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>What changes the answer</h2>
            <p>
              The calculator boils down to a payment-capacity question: how big
              a loan can a given monthly payment service at your APR and term?
              Five inputs move that number, and they move it in compounding
              ways. A 40-point FICO jump doesn&rsquo;t just lower the rate — it
              unlocks a longer term, which extends the loan amount the same
              payment can carry. Here&rsquo;s how each variable actually shifts
              the borrowable amount.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>FICO.</strong> The single largest lever. Below 580, the
                panel narrows to specialty lenders running 18 – 28% APR on
                36 – 48 month terms — borrowable principal at a $1,500/mo
                payment is roughly $55K. At 680+, the same payment carries
                $95K – $110K because APR drops to 9 – 14% and term extends to
                60 – 72 months. FICO doesn&rsquo;t directly cap the loan amount;
                it caps the rate and term, and those compound into the loan
                ceiling.
              </li>
              <li>
                <strong>Business history.</strong> Twelve months of MC#
                operation with documented revenue is the panel&rsquo;s preferred
                tier. Operators inside that tier borrow 20 – 30% more than
                otherwise-identical first-time operators because the panel
                drops the &ldquo;new authority&rdquo; risk adder. Two years of
                history unlocks the broadest panel and the lowest APR band
                available for the operator&rsquo;s FICO.
              </li>
              <li>
                <strong>Down payment.</strong> Most semi truck lenders on the
                panel want 10% down for established owner-operators and 15 – 20%
                for first-time operators. Beyond the minimum, every additional
                5% down doesn&rsquo;t increase the borrowable amount — but it
                does lower APR by roughly 0.5 – 1.5%, which makes a given
                monthly payment service more principal. Zero-down deals exist
                but cap the loan amount at 80 – 85% of truck value.
              </li>
              <li>
                <strong>Truck age.</strong> Lenders cap the term based on the
                truck&rsquo;s expected value at payoff. Trucks under four
                model-years qualify for 72-month terms; 5 – 7 year trucks cap
                at 60 months; 8+ year trucks at 36 – 48 months. Shorter terms
                mean higher monthly payments, which means lower borrowable
                principal at the same payment capacity. Truck age also adds an
                APR floor — typically 1 – 3% over a comparable new-truck loan.
              </li>
              <li>
                <strong>Revenue.</strong> Six months of business bank
                statements proves you can service the payment. The panel
                typically wants the monthly payment under 25 – 30% of net
                operating income. Operators with $25K monthly gross revenue
                comfortably service $1,800/mo loan payments; operators at $12K
                gross are capped at roughly $900/mo, which translates directly
                to a lower borrowable principal regardless of FICO.
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Typical loan amounts by operator profile</h2>
            <p>
              Below are the four common profiles we see on the panel. These
              are observed ranges, not guarantees; the chosen lender sets the
              final number on the term sheet.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>First-time owner-op, 580 FICO, 10% down, 6-year
                truck.</strong> Typical loan amount: <strong>$60K – $90K</strong>.
                The panel narrows here. Expect 16 – 22% APR on a 48-month term.
                Down payment north of 15% widens the panel and pulls the APR
                toward the bottom of the range.
              </li>
              <li>
                <strong>First-time with 700 FICO, MC# 6+ months, 15% down,
                newer truck.</strong> Typical loan amount:{" "}
                <strong>$110K – $150K</strong>. APR runs 10 – 14% on a 60 – 72
                month term. The combination of clean credit and any documented
                operating history is the inflection point — the panel
                approximately doubles in size compared to the no-history
                profile.
              </li>
              <li>
                <strong>Established owner-op, 720 FICO, 20% down, premium
                truck.</strong> Typical loan amount: <strong>$160K – $200K</strong>.
                APR runs 8 – 12% on a 72-month term. The full panel is
                available; pricing competes. This profile borrows close to the
                appraised truck value, with the lender comfortable on
                collateral.
              </li>
              <li>
                <strong>Small fleet (3+ trucks), strong revenue.</strong>{" "}
                Per-truck limits relax; the panel shifts to portfolio
                underwriting. Loan amounts are sized against the fleet&rsquo;s
                consolidated revenue and existing debt service, not the
                single-truck appraisal. A fleet generating $40K+ monthly net
                can typically take down $250K+ in additional equipment debt
                across multiple tractors at 7 – 11% APR.
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>What the calculator does NOT tell you</h2>
            <p>
              The calculator is a payment estimator. It is not an underwriting
              decision and it does not model the full cost of operating the
              truck. A few specific blind spots worth naming:
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Insurance is not included.</strong> Primary liability
                + physical damage on a financed Class 8 tractor runs $800 –
                $1,400/mo for owner-operators. The lender will require proof
                of coverage at funding; you should be budgeting the insurance
                premium alongside the loan payment, not bolting it on after.
              </li>
              <li>
                <strong>Working capital availability is not modeled.</strong>{" "}
                Putting 20% down on a $120K truck eats $24K of cash. The
                calculator doesn&rsquo;t flag whether you&rsquo;ll have
                runway left for the first month of fuel, insurance deposit,
                and operating reserves. Most blowouts in year one trace back
                to thin reserves after the down payment, not to a payment that
                was too high.
              </li>
              <li>
                <strong>Total monthly burden is not predicted.</strong> The
                loan payment is one line item. Insurance, IFTA, IRP, ELD
                subscription, parking, and ongoing maintenance reserves
                typically add another $1,500 – $2,500/mo on top. Run the full
                budget; don&rsquo;t treat the loan payment as the operating
                cost.
              </li>
              <li>
                <strong>Taxes and fees are on top of the loan
                principal.</strong> Sales tax (varies by state, often 6 – 8%
                of truck price), title fees, and lender doc fees can be
                financed or paid out of pocket. The calculator assumes you
                financed only the truck price minus down payment. Confirm with
                the lender how taxes and fees are handled in your state — they
                can quietly add $5K – $10K to the loan amount.
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>How to make the loan amount go up</h2>
            <p>
              Four practical actions, in order of impact:
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Improve FICO.</strong> Even a 30 – 40 point increase
                from 580 to 620 shifts you into a new APR band on the panel.
                Pay down revolving balances below 30% utilization, dispute
                inaccurate collections, and avoid opening new credit lines for
                90 days before applying. Most operators can move 20 – 50
                points in 60 – 90 days with disciplined action.
              </li>
              <li>
                <strong>Save more down payment.</strong> Past the minimum, each
                additional 5% down doesn&rsquo;t raise the loan ceiling, but
                it lowers APR by 0.5 – 1.5%, which lets the same monthly
                payment carry more principal. A 25% down deal on a 700 FICO
                profile often hits an APR floor 2% lower than the 10% down
                version of the same deal.
              </li>
              <li>
                <strong>Document revenue history with 6+ months of business
                bank statements.</strong> Clean monthly deposits are the
                strongest signal you can show. If you&rsquo;re running freight
                under someone else&rsquo;s authority before going independent,
                make sure deposits land in a business account named to your
                LLC — settlements paid to a personal account don&rsquo;t count
                as &ldquo;business revenue&rdquo; on the panel.
              </li>
              <li>
                <strong>Pick a truck the lender will fund.</strong> Avoid
                overpriced models, salvage titles, glider kits, and trucks
                with more than 750K miles. The panel is most aggressive on
                clean-title Freightliner Cascadias, Peterbilt 579s, Kenworth
                T680s, and Volvo VNLs under 600K miles. A reasonable truck at
                a fair price often appraises higher than the asking price,
                which directly increases the loan amount available.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="container">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions on borrowing for a semi truck</h2>
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
                <Link href="/semi-truck-financing">
                  Semi truck financing — Class 8 tractors →
                </Link>
              </li>
              <li>
                <Link href="/semi-truck-financing/no-money-down">
                  No money down semi truck financing →
                </Link>
              </li>
              <li>
                <Link href="/owner-operator-financing/first-time">
                  First-time owner-operator financing →
                </Link>
              </li>
              <li>
                <Link href="/calculators/semi-truck-loan">
                  Semi truck loan calculator (dedicated tool) →
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
            <h2>Get matched with the right lender</h2>
            <p>
              The calculator gives you a directional answer. The application
              gives you a real one. Two minutes, soft-pull only, with a panel
              that funds your truck make, age, and credit profile.
            </p>
            <p>
              <Link href="/qualify" className="btn btn--primary">
                Get matched with the right lender →
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
