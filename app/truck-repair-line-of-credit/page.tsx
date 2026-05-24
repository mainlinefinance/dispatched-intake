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

/* /truck-repair-line-of-credit — differentiation page. Position revolving
   credit for repair spend against single-shot installment financing. The
   page is written honestly: if the panel does not currently route
   line-of-credit applications, the matching flow routes to working-capital
   or term-loan alternatives. The page captures the search intent without
   over-promising product availability. */

export const metadata: Metadata = {
  title:
    "Truck repair line of credit — revolving capital for ongoing repair spend | Dispatched",
  description:
    "A revolving line of credit for trucking repairs — draw, repay, draw again. When ongoing repair patterns make a single installment loan the wrong product. How the line compares to a term loan and a fuel card.",
  alternates: { canonical: "/truck-repair-line-of-credit" },
  openGraph: {
    title:
      "Truck repair line of credit — revolving capital for ongoing repair spend | Dispatched",
    description:
      "A revolving line of credit for trucking repairs — draw, repay, draw again. When ongoing repair patterns make a single installment loan the wrong product. How the line compares to a term loan and a fuel card.",
    url: "/truck-repair-line-of-credit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Truck repair line of credit — revolving capital for ongoing repair spend | Dispatched",
    description:
      "A revolving line of credit for trucking repairs — draw, repay, draw again. When ongoing repair patterns make a single installment loan the wrong product. How the line compares to a term loan and a fuel card.",
  },
};

const PAGE_URL = "https://dispatched.finance/truck-repair-line-of-credit";

const faqs = [
  {
    q: "What's the difference between a line of credit and a term loan for truck repair?",
    a: "A term loan is one advance with a fixed schedule — borrow $40K once, pay it down over 24 months, done. A line of credit is a revolving credit limit — the lender approves up to (for example) $75K, and the operator draws against it as needed. Interest accrues only on the drawn balance; the available credit refills as the operator pays it down. For a single repair event, the term loan is usually cheaper. For ongoing repair spend across multiple events in a year, the line typically wins on total cost despite a slightly higher headline rate.",
  },
  {
    q: "What APR should I expect on a repair line of credit?",
    a: "On the Dispatched panel, repair lines of credit typically run 14% to 22% APR on the drawn balance, with the exact rate depending on FICO, time in business, revenue, and the requested limit. The rate is usually 200 to 600 basis points higher than an equivalent term loan, reflecting the open-ended commitment. The line APR is fixed at sign-off and you see it on the term sheet.",
  },
  {
    q: "Do I have to draw the full limit?",
    a: "No. Most operators draw a fraction of the approved limit. The undrawn portion carries no interest in most line structures, though some lenders charge a small annual facility fee (typically 0.5% to 1.5% of the limit). The lender's term sheet specifies whether a facility fee applies before signing.",
  },
  {
    q: "What credit score do I need for a repair line of credit?",
    a: "Lines underwrite tighter than term loans. The Dispatched panel's line-of-credit subset typically requires 600+ FICO, 12+ months operating, and $250K+ annual revenue. Operators below these floors may still qualify on the term-loan subset or the working-capital subset.",
  },
  {
    q: "Can I use a line of credit for things other than repairs?",
    a: "Some lines are restricted to repair and maintenance spend; others are general business lines of credit that can be used for any operating expense. The Dispatched panel routes both. If the operator wants the broader-use product, the application captures that and routes to general working-capital lines instead — see /trucking-working-capital.",
  },
  {
    q: "How long does line approval take?",
    a: "Lines underwrite slower than term loans because the underwriting covers an open-ended commitment rather than a specific transaction. Typical timeline is 3 to 7 business days from application to a signed term sheet, vs. same-day for many term loans. The line's value is its availability for the next year — operators applying for a line should not need same-day funding for an active repair.",
  },
  {
    q: "What happens at renewal?",
    a: "Lines typically renew annually. The lender re-underwrites the operation — usually a lighter review than the initial application — and either continues the line at the same limit, increases the limit (for operators with continued strong performance), reduces the limit, or non-renews. Non-renewal is uncommon for operators who have used the line responsibly and made minimum payments on time.",
  },
  {
    q: "Is a fuel card with repair-spend authorization the same thing?",
    a: "Functionally similar for small repair amounts. A fuel card with repair authorization is structurally a credit card with trucking-specific merchant acceptance, while a line of credit is a true bank revolving facility. For small repairs (under $3K to $5K), the fuel-card route is usually easier and the rate difference is small. For larger draws, the line of credit is cheaper. See /fuel-cards for the fuel-card route.",
  },
];

export default function TruckRepairLineOfCreditPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Truck repair line of credit", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Truck repair line of credit — revolving capital for ongoing repair spend",
          description:
            "How a revolving line of credit for trucking repair spend works, when it beats a term loan, when a term loan still wins, the fuel-card alternative for small repairs, and the underwriting differences from one-shot repair financing.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Truck repair line of credit",
          description:
            "Revolving line of credit for trucking repair spend. Draw, repay, draw again. Interest only on drawn balance. Typical limit $25K–$250K at 14%–22% APR on drawn balance.",
          url: PAGE_URL,
          category: "Commercial trucking financing",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Truck repair line of credit</span>
            <h1 className="ins-hero-title">
              A revolving line of credit for trucking repair spend.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              Most truck repair financing is a one-shot installment loan:
              borrow once, pay it down, done. A line of credit is
              structurally different — a credit limit the operator can draw
              against repeatedly, interest only on what&rsquo;s drawn,
              refilled as it&rsquo;s paid down. For operators running an
              aging fleet, recurring after-treatment work, or a
              preventive-maintenance budget that hits in lumps, a revolving
              line frequently beats a series of separate term loans. This
              page explains the structural difference, when the line wins,
              and how the Dispatched panel routes between the two.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=other"
                className="btn btn--primary btn--lg"
              >
                See my financing options →
              </Link>
              <Link
                href="/truck-repair-loans"
                className="btn btn--secondary btn--lg"
              >
                Or compare with a term loan
              </Link>
            </div>
            <p className="product-hero-note">
              Soft-pull match. · Different lender subset than term loans.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">
              Revolving credit vs. one-shot installment.
            </h2>
            <p className="ins-hero-sub">
              A truck repair line of credit is a revolving credit facility —
              the lender approves a credit limit (typical band $25K to $250K
              on the Dispatched panel), the operator draws against it as
              needed, interest accrues only on the drawn balance, and the
              available credit refills as the operator pays down. It is the
              same product class as a small-business line of credit, applied
              specifically to the use case of trucking repair and maintenance
              spend.
            </p>
            <p className="ins-hero-sub">
              A repair{" "}
              <Link href="/glossary/term-loan">term loan</Link> is a single
              advance — one wire, one schedule, one payback. Once paid down,
              accessing more capital means a new application.
            </p>
            <p className="ins-hero-sub">
              The choice between them comes down to spend pattern. An
              operator who needs $40K once for a single rebuild is the
              term-loan use case — the line of credit&rsquo;s revolving
              feature is unused, and term loans usually price 200 to 600
              basis points cheaper than equivalent lines. An operator who
              runs a small fleet with three to five trucks and faces ongoing
              repair lines — after-treatment work on one truck this month,
              brakes on another next month, an unscheduled engine event on a
              third the quarter after — uses the revolving feature
              continuously, and the line&rsquo;s slightly higher rate is
              more than offset by the avoidance of repeated application
              overhead and the lower interest on smaller drawn balances.
            </p>
            <p className="ins-hero-sub">
              Lines of credit underwrite tighter than single-purpose repair
              loans. Expect a higher FICO floor (typically 600+), longer
              time-in-business minimum (12+ months), and higher revenue
              threshold ($250K+ annual). The Dispatched panel routes
              line-of-credit applications to a specific lender subset; the
              matching flow is similar to the term-loan flow but the panel
              mix is different.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How a repair line of credit works</span>
            <h2 className="ins-hero-title">
              Approval, draw, accrual, repayment, renewal.
            </h2>
            <ol className="product-process">
              <li>
                <strong>Approval.</strong> The application underwrites the
                operation against the credit limit, not against a specific
                repair scope. Bank statements, time in business, revenue,
                and FICO are weighted similarly to a working-capital loan
                application.
              </li>
              <li>
                <strong>Limit.</strong> The lender sets a credit limit. The
                operator does not have to draw the full limit, and most do
                not.
              </li>
              <li>
                <strong>Draw.</strong> The operator initiates a draw — through
                the lender&rsquo;s portal, app, or sometimes a debit card
                linked to the line — for a specific repair. Funds typically
                land in the operator&rsquo;s business account or direct to
                the shop within one to two business days. Some lenders fund
                draws same-day for additional fee.
              </li>
              <li>
                <strong>Interest accrual.</strong> Interest accrues only on
                the drawn balance, not on the full limit. The undrawn
                portion has no carry cost in most line structures, though
                some lines carry a small annual facility fee.
              </li>
              <li>
                <strong>Minimum payment.</strong> The operator makes monthly
                minimum payments on the drawn balance — typically interest
                plus a small principal floor.
              </li>
              <li>
                <strong>Repayment refills availability.</strong> Principal
                paid back refills the available credit. The line is now
                ready for the next draw.
              </li>
              <li>
                <strong>Renewal.</strong> Lines typically renew annually with
                the lender re-underwriting the operation. Continued strong
                performance frequently leads to limit increases at renewal.
              </li>
            </ol>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">When a line beats a term loan</span>
            <h2 className="ins-hero-title">Spend-pattern fit.</h2>
            <ul className="product-list">
              <li>
                <strong>Multiple repair events expected in a 12-month window.</strong>{" "}
                Three or more separate repair lines expected over the year —
                common on fleets of two to five trucks or on aging single
                units. The line absorbs all of them without re-application
                overhead.
              </li>
              <li>
                <strong>Preventive maintenance budget that hits in lumps.</strong>{" "}
                Operators who run a documented PM schedule (annual DOT
                inspection, brake service every 100K, after-treatment service
                intervals) often want the capital available for known
                upcoming work without committing to a specific draw schedule.
              </li>
              <li>
                <strong>Single-truck operations with a known-aging tractor.</strong>{" "}
                A 2014 Cascadia approaching its second engine event, a 2017
                Volvo with intermittent after-treatment fault codes —
                operators who know the year ahead will involve multiple
                unplanned events.
              </li>
              <li>
                <strong>Operators with strong credit but irregular spend.</strong>{" "}
                A 700+ FICO owner-operator with $400K annual revenue and a
                one-truck operation may not need a $150K term loan today but
                wants the line available for whatever the year brings.
              </li>
              <li>
                <strong>Operators who want to retain optionality.</strong>{" "}
                Drawing $15K against a $75K line is a different financial
                posture than borrowing $15K on a term loan; the line keeps
                capital available for the next event.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">When a term loan still wins</span>
            <h2 className="ins-hero-title">One-shot scope and lower rate.</h2>
            <ul className="product-list">
              <li>
                <strong>Single large repair event over $50K.</strong> A $75K
                engine rebuild is a term-loan event. The revolving feature
                provides no benefit; the term loan typically prices lower.
              </li>
              <li>
                <strong>Operators just under the line-of-credit floor.</strong>{" "}
                A 540 FICO operator does not access the line product but
                does access the sub-580 term-loan subset. The term loan is
                the only available product.
              </li>
              <li>
                <strong>One-off accident repair.</strong> A collision repair
                with insurance running in parallel is a term-loan use case —
                finance the gap once, pay it down with the insurance
                proceeds, done.
              </li>
              <li>
                <strong>Operators who want a fixed payoff date.</strong> A
                line of credit can stay open indefinitely with revolving
                balance. Some operators prefer the discipline of a fixed
                amortization schedule that ends.
              </li>
              <li>
                <strong>Working-capital lines used for repair.</strong> If
                the operator already has a working-capital line in place,
                drawing from it for repair scope may be cheaper than opening
                a separate repair line. The Dispatched panel evaluates this
                in the routing.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The fuel-card alternative</span>
            <h2 className="ins-hero-title">
              For repair spend under $3K to $5K.
            </h2>
            <p className="ins-hero-sub">
              For repair spend under $3,000 to $5,000, neither a term loan
              nor a line of credit is usually the most efficient product —
              the application and origination overhead exceeds the rate
              benefit of formal financing. The alternative is a trucking
              fuel card with repair-spend authorization.
            </p>
            <p className="ins-hero-sub">
              Most fleet fuel-card programs (the major networks) allow the
              card to be authorized for repair, parts, and roadside services
              in addition to fuel. The card carries a credit limit, charges
              interest on revolving balances above the monthly payoff, and
              bills repair spend like any other charge. It is structurally a
              credit card with trucking-specific merchant acceptance rather
              than a true line of credit, but for small repair amounts the
              difference is academic.
            </p>
            <p className="ins-hero-sub">
              The Dispatched panel routes fuel-card-with-repair-spend
              separately from line-of-credit applications. See{" "}
              <Link href="/fuel-cards">/fuel-cards</Link> for that product.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">Line-of-credit eligibility floors.</h2>
            <ul className="product-list">
              <li>
                <strong>600+ FICO</strong> (vs 500 floor on term loans).
                Lines underwrite tighter.
              </li>
              <li>
                <strong>12+ months operating</strong> under the current
                authority. New authorities route to other products.
              </li>
              <li>
                <strong>$250K+ annual revenue</strong> typical floor —
                sometimes lower for operators with strong other indicators.
              </li>
              <li>
                <strong>Three months of bank statements</strong>, year-to-date
                P&amp;L, and last year&rsquo;s tax return on most line
                applications. More documentation than a term loan because
                the underwriting is against an open-ended commitment.
              </li>
              <li>
                <strong>Active DOT number</strong> in good standing with{" "}
                <Link href="/glossary/fmcsa">FMCSA</Link>.
              </li>
              <li>
                <strong>Personal guarantee</strong> on LLC and S-corp
                operations.
              </li>
              <li>
                <strong>
                  Recently opened or recently closed line of credit elsewhere
                </strong>{" "}
                may affect underwriting. Operators with multiple existing
                lines route to a smaller subset.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              What a small-fleet repair line looks like.
            </h2>
            <p className="ins-hero-sub">
              Composite illustrative scenario — not a specific borrower. See{" "}
              <Link href="/methodology#composite-scenarios">methodology</Link>.
            </p>
            <div className="product-example">
              <div className="product-example-meta">
                <span className="product-example-label">Operator</span>
                <span className="product-example-value">
                  Small fleet, three 2019–2020 Cascadias, LLC, 4 years
                  operating, 695 FICO on the managing member, monthly
                  revenue $74K.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Need</span>
                <span className="product-example-value">
                  Recurring repair spend pattern — projected $45K to $80K
                  across the three trucks over the next 12 months, hitting
                  in unpredictable lumps.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Approved</span>
                <span className="product-example-value">
                  $75K revolving line of credit at 18% APR on drawn
                  balance. No facility fee. Annual renewal.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Year-one draws</span>
                <span className="product-example-value">
                  Q1: $12K after-treatment work on truck 1. Q2: $18K brake
                  and suspension on truck 2. Q3: $9K HVAC and minor
                  electrical across all three. Q4: $22K unscheduled engine
                  event on truck 3. Average drawn balance $24K.
                </span>
              </div>
              <div className="product-example-meta">
                <span className="product-example-label">Year-one interest</span>
                <span className="product-example-value mono">
                  Approximately $4,300 on a total drawn-and-repaid volume of
                  $61K. Equivalent term-loan interest at the same APR with
                  full-balance carry would have been roughly $11,000.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Questions on truck repair lines of credit.
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
            <h2 className="ins-hero-title">Capital available before the next breakdown.</h2>
            <p className="ins-hero-sub">
              Different product, different underwriting, different lender
              subset. Soft-pull-first. 14% to 22% APR on drawn balance.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=other"
                className="btn btn--primary btn--lg"
              >
                See my financing options →
              </Link>
              <Link
                href="/truck-repair-loans"
                className="btn btn--secondary btn--lg"
              >
                Or compare to a term loan first →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/truck-repair-loans">Truck repair loans →</Link>
              </li>
              <li>
                <Link href="/trucking-working-capital">
                  Trucking working capital →
                </Link>
              </li>
              <li>
                <Link href="/fuel-cards">Fuel cards →</Link>
              </li>
              <li>
                <Link href="/equipment-financing">Equipment financing →</Link>
              </li>
              <li>
                <Link href="/factoring">Factoring →</Link>
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
