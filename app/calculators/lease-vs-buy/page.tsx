import type { Metadata } from "next";
import Link from "next/link";
import LeaseVsBuyCalculator from "@/components/calculators/LeaseVsBuyCalculator";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  softwareApplication,
} from "@/components/seo/JsonLd";

const PAGE_URL = "https://dispatched.finance/calculators/lease-vs-buy";

export const metadata: Metadata = {
  title: "Lease vs buy calculator for truckers — Dispatched",
  description:
    "Compare leasing vs buying a Class 8 truck. See total cost, equity build, breakeven point, and the real cost of lease-purchase programs vs equipment financing.",
  alternates: { canonical: "/calculators/lease-vs-buy" },
};

export default function LeaseVsBuyCalculatorPage() {
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
            name: "Lease vs buy calculator",
            url: PAGE_URL,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Lease vs buy calculator",
          description:
            "Compare a lease-purchase program against equipment financing on total cost, equity build, and the failure-rate-adjusted expected cost. Inputs cover purchase price, down payment, term, APR, residual, weekly settlement, lease term, and stated completion equity.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={softwareApplication({
          name: "Lease vs buy calculator",
          description:
            "Interactive web tool comparing the total cost, equity build, and failure-rate-adjusted cost of leasing vs buying a Class 8 truck.",
          url: PAGE_URL,
          applicationCategory: "FinanceApplication",
        })}
      />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Lease vs buy calculator.</h1>
            <p>
              Compare a lease-purchase program (carrier-administered, weekly
              settlements) against equipment financing (your own loan, your
              own title from day one). See the total cost, the equity build
              over time, and where the breakeven actually lies. Lease-purchase
              programs are sold to first-time owner-ops more aggressively than
              the math justifies — the calculator shows why.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <LeaseVsBuyCalculator />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>How the math works</h2>
            <p>
              The <strong>buy</strong> side uses the standard amortization
              formula on the financed amount (purchase price minus down
              payment): M = P × r / (1 − (1 + r)^−n), where r is the monthly
              rate (APR ÷ 12) and n is the term in months. Equity at any
              checkpoint is the cumulative principal paid down through that
              month, derived from the closed-form balance equation rather
              than walking the schedule. Equity at term end is principal paid
              plus the residual value you enter.
            </p>
            <p>
              The <strong>lease</strong> side uses weekly settlement ×
              term-in-weeks for total payments. Equity build is $0 unless the
              contract specifies a completion bonus — most don&rsquo;t. The
              monthly equivalent divides total payments by term-in-weeks ÷
              4.33 so the side-by-side cash flow is comparable.
            </p>
            <p>
              The headline output is{" "}
              <strong>failure-adjusted cost</strong>. The trucking industry
              has documented an{" "}
              <Link href="/owner-operator-financing/first-time">
                80%+ wash-out rate on lease-purchase programs
              </Link>
              . The model assigns 80% probability to the failure case
              (operator exits at roughly the midpoint of the term with $0
              recovered) and 20% to the completion case (operator pays the
              full schedule and receives the stated completion equity). The
              expected-value cost is the weighted average of those two
              outcomes — and it&rsquo;s consistently lower than the
              everyone-completes case the lease brochure is sold on.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>What is modeled</strong> — payment math, equity
                build, residual, expected-value cost under the documented
                failure rate.
              </li>
              <li>
                <strong>What is NOT modeled</strong> — insurance, fuel,
                maintenance differences (some lease programs bundle these,
                others don&rsquo;t), tax treatment, financing fees, prepayment
                penalties, dispatch-related deductions, and force-majeure
                exit terms. Read the contract.
              </li>
            </ul>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Lease-purchase: the failure rate problem</h2>
            <p>
              Industry estimates of lease-purchase wash-out rates run from
              roughly 80% to as high as 96% depending on the carrier, the
              vintage of the program, and how strictly &ldquo;completion&rdquo; is
              measured. The drivers are well-documented: weekly settlements
              that don&rsquo;t survive a slow week, maintenance and
              breakdown costs that aren&rsquo;t included in the lease quote,
              and contract language that treats any missed payment as a
              forfeiture rather than a deferral. The operator walks, the
              truck goes back into the program, and the next driver starts
              the cycle at week one.
            </p>
            <p>
              The math the calculator shows isn&rsquo;t a prediction for any
              individual operator — it&rsquo;s an expected-value estimate
              across the population the program enrolls. Most first-time
              owner-operators evaluating a lease-purchase offer are looking
              at the optimistic case (complete the term, take the truck,
              own a paid-off Class 8). The failure-adjusted line is what
              the same offer looks like when the base rate is applied
              honestly.
            </p>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>When lease-purchase actually makes sense</h2>
            <p>
              Lease-purchase isn&rsquo;t universally wrong. It can be a
              defensible path when (1) the operator has no credit and no
              path to equipment financing in the next 12–24 months, and the
              alternative is staying a company driver indefinitely;
              (2) the carrier&rsquo;s program is genuinely structured for
              completion — fixed weekly deduction with no hidden maintenance
              escrow, transparent equity-accrual schedule, and a documented
              completion rate above 30% (ask for it in writing); and (3) the
              operator has 3+ months of personal reserves so a slow week
              doesn&rsquo;t force the exit. Outside those conditions,
              equipment financing on a used truck — even a higher-mileage
              one — is almost always the better trade.
            </p>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Limitations and disclaimers</h2>
            <p>
              This calculator is a comparison aid, not a recommendation and
              not an underwriting decision. The APR you enter on the buy
              side is a user-supplied estimate — the actual APR is set by
              the chosen lender on the term sheet (see{" "}
              <Link href="/methodology#finance-rates">methodology</Link>{" "}
              for observed panel ranges). The lease side assumes the
              contract behaves linearly between today and the equity-payout
              date, which is rarely how lease-purchase contracts read.
              Real contracts vary widely on maintenance escrows, fuel
              surcharges, dispatch-related deductions, and what counts as
              &ldquo;completion.&rdquo; Read the contract. Have it reviewed. Run the
              calculator a second time with the worst-case weekly deduction
              the contract permits.
            </p>
          </div>
        </section>

        <section className="calc-related">
          <div className="container">
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/owner-operator-financing/first-time">
                  First-time owner-operator financing (heavy lease-purchase
                  warnings) →
                </Link>
              </li>
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
                <Link href="/glossary/lease-purchase">
                  Glossary: lease-purchase →
                </Link>
              </li>
              <li>
                <Link href="/glossary/equipment-loan">
                  Glossary: equipment loan →
                </Link>
              </li>
              <li>
                <Link href="/calculators">All trucking finance calculators →</Link>
              </li>
              <li>
                <Link href="/methodology">Methodology and panel APR bands →</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
