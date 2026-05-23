import type { Metadata } from "next";
import Link from "next/link";
import OwnerOperatorPLCalculator from "@/components/calculators/OwnerOperatorPLCalculator";
import { OwnerOpPLPie } from "@/components/diagrams/OwnerOpPLPie";
import EmailCapture from "@/components/landing/EmailCapture";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  softwareApplication,
} from "@/components/seo/JsonLd";
import RelatedContent from "@/components/related/RelatedContent";
import { getRelatedContent } from "@/lib/related";

const PAGE_URL =
  "https://dispatched.finance/calculators/owner-operator-pl";

export const metadata: Metadata = {
  title: "Owner-operator P&L calculator — Dispatched",
  description:
    "Estimate weekly net income for owner-operators. Inputs: rate per mile, miles, fuel, fixed costs, factoring fee. Outputs: net per week, cost per mile, breakeven miles.",
  alternates: { canonical: "/calculators/owner-operator-pl" },
};

export default function OwnerOperatorPLCalculatorPage() {
  const today = new Date().toISOString().slice(0, 10);
  const relatedItems = getRelatedContent({
    currentUrl: "/calculators/owner-operator-pl",
    glossarySlugs: [
      "cpm",
      "rpm",
      "deadhead",
      "broker-spread",
      "owner-operator",
      "all-in-rate",
      "per-diem",
    ],
    productUrls: [
      "/owner-operator-financing",
      "/owner-operator-financing/first-time",
      "/factoring",
    ],
    topic: "owner-operator-economics",
    type: "calculator",
    limit: 6,
  });
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
            name: "Owner-operator P&L calculator",
            url: PAGE_URL,
          },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Owner-operator P&L calculator",
          description:
            "Estimate weekly net income for owner-operators. Eight inputs return weekly revenue, total operating cost, net income, cost per mile, and breakeven loaded miles — the numbers that show whether the lane and the rate actually work.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={softwareApplication({
          name: "Owner-operator P&L calculator",
          description:
            "Interactive web tool estimating weekly net income, cost per mile, and breakeven miles for owner-operator trucking businesses.",
          url: PAGE_URL,
          applicationCategory: "FinanceApplication",
        })}
      />
      <Nav />
      <main id="main-content" className="calc-page">
        <section className="calc-hero">
          <div className="container">
            <span className="eyebrow">Calculators</span>
            <h1>Owner-operator P&amp;L calculator.</h1>
            <p>
              Estimate your weekly net income as an owner-operator. Eight
              inputs, no signup, no credit pull. The calculator returns
              weekly revenue, total operating cost, net income, cost per
              mile, and breakeven miles — the numbers that show whether
              the lane and the rate actually work.
            </p>
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <OwnerOperatorPLCalculator />
          </div>
        </section>

        <section className="calc-form-wrap">
          <div className="container">
            <EmailCapture
              variant="card"
              source="calculator-owner-op-pl"
              heading="Get more trucking finance tools"
              description="Monthly newsletter with new calculators, research updates, and lender insights."
            />
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>How the math works</h2>
            <p>
              The calculator runs a weekly cash equation. Revenue is rate
              per loaded mile times loaded miles. Total miles is loaded
              miles divided by one minus the deadhead fraction — because{" "}
              <Link href="/glossary/deadhead">deadhead miles</Link> burn
              fuel and wear the truck without producing revenue. Fuel
              cost is total miles divided by MPG, times the price per
              gallon. Factoring fee is revenue times the factoring rate
              (factors price on face value of the invoice, not net
              proceeds). Fixed costs — truck payment, insurance, and the
              everything-else bucket (permits, IFTA accruals, IRP,
              parking, ELD) — are normalized to a weekly number. Add it
              all up: total operating cost. Subtract from revenue: net
              income.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Revenue</strong> — rate per mile × loaded miles.
                Deadhead miles do not produce revenue, by definition.
              </li>
              <li>
                <strong>Total miles</strong> — loaded miles ÷ (1 −
                deadhead%). The fuel side of the equation is computed
                against this number, not loaded miles, because empty
                miles still burn diesel.
              </li>
              <li>
                <strong>Fuel cost</strong> — (total miles ÷ MPG) × fuel
                price per gallon. This is why MPG and deadhead are the
                two highest-leverage variable inputs.
              </li>
              <li>
                <strong>Factoring fee</strong> — revenue × factoring
                rate. Set to 0 if you self-fund receivables.
              </li>
              <li>
                <strong>Fixed costs (weekly)</strong> — divide monthly
                amounts by 4.33 and annual amounts by 52 to get the
                weekly figure. Insurance is primary liability + cargo +
                physical damage; other fixed is permits, IFTA, IRP,
                parking, ELD subscription.
              </li>
              <li>
                <strong>Net income</strong> — revenue minus everything
                above. Annualized at 50 working weeks, assuming two
                weeks off for vacation, repairs, and downtime.
              </li>
            </ul>
            <figure>
              <OwnerOpPLPie />
              <figcaption>
                Representative weekly P&amp;L mix for an owner-operator
                running ~2,500 miles. Fuel, truck payment, and taxes
                dominate; net to owner sits around a quarter of revenue
                in a healthy lane.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>What the breakeven number means</h2>
            <p>
              The calculator returns two breakeven figures. <strong>
                Breakeven loaded miles
              </strong>{" "}
              is the volume of loaded miles per week where net income
              equals zero, holding everything else constant. <strong>
                Breakeven rate per mile
              </strong>{" "}
              is the rate at your current loaded-miles volume where net
              equals zero. Both numbers answer the same question from
              different sides: how thin is the margin between this lane
              and the break-even floor?
            </p>
            <p>
              Cost per total mile is the diagnostic number. Anything
              above the $1.80 to $2.00 per total-mile range signals
              operational stress — the fixed-cost base is too heavy
              relative to miles run, the lane is too short for the fuel
              burn, or both. Sustainable owner-ops run at twenty percent
              or more above breakeven. That cushion absorbs the
              irregular shocks the calculator does not model: a major
              repair, a slow week on the load board, a fuel spike, a
              broker pay delay. Operating at breakeven is operating
              one bad week from a cash crisis.
            </p>
            <p>
              If the breakeven shows &ldquo;not viable,&rdquo; the lane
              has zero or negative contribution per loaded mile after
              fuel and factoring — no volume of miles will produce a
              positive net at that rate. The fix is either a higher
              rate, a better MPG, less deadhead, a lower factoring rate,
              or some combination. The number is doing its job by being
              brutal.
            </p>
          </div>
        </section>

        <section className="calc-explainer">
          <div className="container">
            <h2>Inputs we don&rsquo;t include</h2>
            <p>
              The calculator estimates the gross weekly contribution.
              Real take-home is meaningfully lower. The following costs
              are real and the operator pays them, but they fall outside
              the weekly-P&amp;L framing this tool uses.
            </p>
            <ul className="calc-explainer-list">
              <li>
                <strong>Federal and state income tax</strong> — varies
                by bracket and state. Assume a working estimate of
                twenty to twenty-five percent of net for federal income
                tax on a typical owner-operator profile.
              </li>
              <li>
                <strong>Self-employment tax</strong> — 15.3% on net
                self-employment income (Social Security + Medicare).
                This is on top of income tax. An LLC taxed as an S-corp
                can reduce this; an LLC taxed as a sole prop cannot.
              </li>
              <li>
                <strong>Depreciation</strong> — the truck wears out
                whether you write it down on the books or not. Reserve
                a real-dollar amount each week for the next truck or
                major rebuild.
              </li>
              <li>
                <strong>Irregular expenses</strong> — major repairs (an
                engine overhaul, a transmission, a DPF replacement), DOT
                fines, an accident deductible. Reserve for these in
                advance; the calculator does not.
              </li>
              <li>
                <strong>Retirement and health insurance</strong> —
                you&rsquo;re the business and you&rsquo;re the
                employee. If you want a retirement plan and a health
                policy, they come out of net. Budget accordingly.
              </li>
            </ul>
            <p>
              A working rule of thumb: take the annualized net the
              calculator returns and assume real take-home is 55 to 65
              percent of that number after tax, depreciation reserve,
              and irregular-expense reserve. See{" "}
              <Link href="/methodology">methodology</Link> for how we
              describe ranges across the site.
            </p>
          </div>
        </section>

        <section className="calc-related">
          <div className="container">
            <RelatedContent
              items={relatedItems}
              heading="Related from Dispatched"
              intro="Glossary, blog, research, and comparisons that pair with this calculator."
            />
            <h2>Related</h2>
            <ul>
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing →
                </Link>
              </li>
              <li>
                <Link href="/owner-operator-financing/first-time">
                  First-time owner-operator financing →
                </Link>
              </li>
              <li>
                <Link href="/factoring">
                  Invoice factoring for truckers →
                </Link>
              </li>
              <li>
                <Link href="/glossary/deadhead">
                  Glossary: deadhead miles →
                </Link>
              </li>
              <li>
                <Link href="/glossary/owner-operator">
                  Glossary: owner-operator →
                </Link>
              </li>
              <li>
                <Link href="/calculators">All calculators →</Link>
              </li>
              <li>
                <Link href="/methodology">
                  How we describe ranges and numbers →
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
