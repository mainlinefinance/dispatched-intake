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

/* /owner-operator-financing/no-business-history — startup pillar spoke.
   Editorial frame: operator has CDL, has a plan, has nothing else yet
   that a traditional bank can underwrite. No business bank statements,
   no tax returns, no DSCR. The substitute-signal model in plain English. */

export const metadata: Metadata = {
  title: "Semi truck loan with no business history | Dispatched",
  description:
    "No business bank statements, no tax returns, no operating history — the Dispatched panel still routes truck financing. What lenders use instead. Soft pull.",
  alternates: {
    canonical: "/owner-operator-financing/no-business-history",
  },
  openGraph: {
    title: "Semi truck loan with no business history | Dispatched",
    description:
      "No business bank statements, no tax returns, no operating history — the Dispatched panel still routes truck financing. What lenders use instead. Soft pull.",
    url: "/owner-operator-financing/no-business-history",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semi truck loan with no business history | Dispatched",
    description:
      "No business bank statements, no tax returns, no operating history — the Dispatched panel still routes truck financing. What lenders use instead. Soft pull.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/owner-operator-financing/no-business-history";

const faqs = [
  {
    q: "Can I finance a semi truck with no business history at all?",
    a: "Yes — the panel routes truck financing for operators with no business operating history, but only on the equipment-secured product set. The lender underwrites the asset (the truck) and the personal guarantee (your FICO, your W-2 income history, your personal bank statements), substituting those signals for the business signals that do not exist yet. Unsecured working capital is not generally available to an operator with no business history because there is no business cash flow to underwrite against; the working-capital product opens at 3 to 6 months of actual business deposits.",
  },
  {
    q: "What does the lender look at when there are no business bank statements?",
    a: "Four signals replace the missing business statements: (1) the operator's W-2 driving history — pay stubs, employer verification, last 12 to 24 months of income, (2) personal bank statements showing actual cash flow discipline — at least 3 months, ideally 6, (3) personal credit profile with the panel floor at 500 FICO, and (4) the truck itself as collateral with the appraised value and down payment driving loan-to-value math. A new operator with strong signals across those four can fund the same week.",
  },
  {
    q: "How is this different from new LLC truck financing or first-time owner-operator financing?",
    a: "Substantial overlap, but the lead signal differs. New-LLC financing is about the entity's age. First-time owner-operator financing is about the driver-to-owner-operator transition with W-2 history substituting for business history. No-business-history financing is the broader case that covers both — an operator with a 6-month-old LLC and no operating activity yet, or a sole proprietor who has formally started but has not yet run revenue. The application routes correctly regardless of which framing fits.",
  },
  {
    q: "Do I need to have an MC number to apply?",
    a: "No for soft pre-qualification at /qualify — the application accepts MC pending or MC not yet filed. Yes for funding on equipment loans where the loan structure assumes the truck will be moving freight under your authority. The standard sequence: soft pre-qualification first to confirm fit and max budget, MC filing and DOT number registration in parallel, then funding when the MC becomes active. The total timeline is typically 3 to 6 weeks from soft pre-qualification to truck on the road. Operators leasing on to a carrier's authority can fund without their own MC; the carrier's authority and the operator's CDL substitute.",
  },
  {
    q: "What documents do I need with no business history?",
    a: "Eight items: (1) driver's license and CDL with all relevant endorsements, (2) last 12 to 24 months of W-2 pay stubs or 1099 contractor history, (3) 3 to 6 months of personal bank statements, (4) personal tax returns for the last 2 years if available (helpful but not strictly required), (5) Articles of Organization or sole-prop registration if the entity exists, (6) IRS EIN confirmation letter if applied for, (7) the specific truck VIN and purchase agreement when you have picked the equipment, and (8) MC and DOT status (pending, filed, or active). The application asks for what exists; the lender accepts what is real and substitutes for what is not.",
  },
  {
    q: "What can I actually qualify for at the no-history stage?",
    a: "Equipment financing on Class 8 tractors $40K to $200K, with the loan amount sized to the truck appraisal and the operator's personal credit and W-2 income. APR 14% to 22% in the no-history band, depending on FICO and the size of the down payment. Loan terms 36 to 60 months — shorter than a seasoned operator would see because the lender is matching the term to the realistic build-up of business cash flow that will service the payment. Down payment 15% to 25%, materially higher than the 0% to 10% that seasoned operators sometimes see. Box trucks and straight trucks under 26K GVWR have a slightly different product structure; see /box-truck-financing.",
  },
  {
    q: "Will lenders pull my credit at the no-history stage?",
    a: "Yes, because the personal guarantee is doing most of the underwriting work. The Dispatched application runs a soft pull at the start that does not show on your credit report and does not affect your FICO. A hard pull happens only after you accept a specific lender's term sheet. The hard pull plus the W-2 income verification plus the 3 to 6 months of personal bank statements form the underwriting file the lender actually decides on. Multiple hard pulls inside a 14-day rate-shopping window count as one inquiry on most credit scoring models.",
  },
  {
    q: "When does the lender mix open up after I start operating?",
    a: "The first meaningful widening happens at 3 months of business bank statements showing consistent deposits — the working-capital product opens to a narrower lender subset. The second widening happens at 6 months of statements when working capital opens more broadly and the equipment-loan APR drops 100 to 300 bps. The third widening is at 12 months when the full panel pool sees the file and the lender mix matches what a seasoned operator at the same FICO would see. The arc from no business history to seasoned-operator pricing is 9 to 18 months on the panel for operators who execute cleanly.",
  },
];

export default function NoBusinessHistoryTruckFinancingPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Owner-operator financing",
            url: "https://dispatched.finance/owner-operator-financing",
          },
          { name: "No business history", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "Semi truck loan with no business history",
          description:
            "What the panel funds when the operator has no business bank statements, no tax returns, and no operating history — substitute signals, document checklist, and the arc to seasoned-operator pricing.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
          authorName: "Angelo Orru Neto",
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Semi truck financing with no business history",
          description:
            "Equipment financing for operators with no business operating history yet. Panel underwrites on W-2 history, personal bank statements, FICO, and truck collateral. 14% to 22% APR no-history band. Soft-pull pre-qualification.",
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
              Owner-operator financing &middot; No business history
            </span>
            <h1 className="ins-hero-title">
              Semi truck loan with no business history.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              No business bank statements. No tax returns for the
              operation. No DSCR a bank can compute. The Dispatched panel
              underwrites the operator and the truck instead &mdash; W-2
              income history, personal cash flow, FICO, and equipment
              collateral. The bank&rsquo;s structural blind spot is the
              panel&rsquo;s default profile.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=equipment&entity=no-history"
                className="btn btn--primary btn--lg"
              >
                See what funds at month zero &rarr;
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              Soft pull only &middot; Equipment-secured product set.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The substitute model</span>
            <h2 className="ins-hero-title">
              Four signals that replace the missing business history.
            </h2>
            <p className="ins-hero-sub">
              Traditional bank underwriting starts with business bank
              statements, two years of tax returns, and a debt-service-
              coverage ratio. A no-history operator has none of these.
              The panel substitutes four signals that exist before the
              business does:
            </p>
            <ul className="product-list">
              <li>
                <strong>W-2 driving history.</strong> Twelve to twenty-
                four months of pay stubs from a previous carrier or
                company-driver position. Verifiable income, a known
                pattern, and a demonstrated ability to operate in the
                trucking environment. The strongest substitute signal
                for missing business cash flow because it directly
                proxies the operator&rsquo;s earning capacity.
              </li>
              <li>
                <strong>Personal bank statements.</strong> Three to six
                months showing cash discipline &mdash; deposits land,
                payments clear, no chronic overdrafts. This substitutes
                for the business deposit history a seasoned operator
                would show. New-history operators without long W-2
                tenure lean on this signal harder; the lender wants to
                see consistent monthly inflows of at least $4K to $6K.
              </li>
              <li>
                <strong>Personal credit (FICO floor 500).</strong>{" "}
                Credit matters more at no-history than at seasoned
                because the personal guarantee is doing more of the
                underwriting work. The panel floor stays at 500 FICO,
                but no-history operators below 580 see a tighter lender
                subset and rates at the high end of the 14% to 22%
                equipment band.
              </li>
              <li>
                <strong>Truck collateral.</strong> The truck is the
                bedrock of the loan. The lender appraises the equipment
                and lends to value (LTV), not to revenue. A clean
                Class 8 tractor at a fair purchase price with 15% to
                25% down is the strongest single underwriting signal
                for a no-history file. Older trucks, salvage titles,
                or above-market pricing materially narrow the lender
                mix.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">What funds, what does not</span>
            <h2 className="ins-hero-title">
              The product set at month zero.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Equipment financing &mdash; available.</strong>{" "}
                Class 8 tractors, day cabs, sleepers, trailers, straight
                trucks, box trucks. $40K to $200K typical range. 14% to
                22% APR in the no-history band. Terms 36 to 60 months.
                Down payment 15% to 25%. The primary product at this
                stage.
              </li>
              <li>
                <strong>
                  Invoice factoring &mdash; available immediately.
                </strong>{" "}
                Available as soon as the operator has an active MC#
                and one signed load. The factor underwrites the broker
                who owes the invoice, not the operator&rsquo;s history.{" "}
                <Link href="/factoring/no-credit-check">
                  Factoring with no credit check on you
                </Link>{" "}
                is the right link for the structural detail.
              </li>
              <li>
                <strong>
                  Working capital &mdash; not available at month zero.
                </strong>{" "}
                Working capital underwrites on business bank statements,
                which a no-history operator does not have yet. Opens at
                3 months of business deposits; opens more broadly at
                6 months. The right sequence is fund the truck &rarr;
                run loads &rarr; factor invoices &rarr; apply for
                working capital at month 6.
              </li>
              <li>
                <strong>
                  Repair loans &mdash; available, narrowly.
                </strong>{" "}
                Some repair lenders on the panel will fund an emergency
                repair for a no-history operator, particularly when the
                operator can show they are actively running loads under
                a carrier&rsquo;s authority. See{" "}
                <Link href="/truck-repair-loans/emergency">
                  emergency truck repair loan
                </Link>{" "}
                for the structure.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Document checklist</span>
            <h2 className="ins-hero-title">
              What the application actually asks for.
            </h2>
            <ol className="product-list">
              <li>
                <strong>Driver&rsquo;s license and CDL.</strong>{" "}
                Class A or B, all relevant endorsements, current
                medical card.
              </li>
              <li>
                <strong>W-2 pay stubs (12 to 24 months).</strong>{" "}
                Or 1099 contractor history if the operator drove as a
                lease-purchase or independent contractor before going
                fully independent.
              </li>
              <li>
                <strong>Personal bank statements (3 to 6 months).</strong>{" "}
                Clean &mdash; no chronic overdrafts, no NSF activity,
                no gambling-pattern deposits.
              </li>
              <li>
                <strong>Personal tax returns (2 years if available).</strong>{" "}
                Not strictly required at no-history, but helpful for
                rounding out the income picture.
              </li>
              <li>
                <strong>Entity registration (if formed).</strong>{" "}
                LLC Articles of Organization, sole-prop DBA filing, or
                S-corp Articles of Incorporation &mdash; whichever exists.
                The application accepts &ldquo;not yet formed&rdquo; as
                a valid answer at this stage.
              </li>
              <li>
                <strong>IRS EIN confirmation letter (CP 575).</strong>{" "}
                Once applied for. Returned by the IRS in minutes for
                SSN-eligible operators.
              </li>
              <li>
                <strong>Truck VIN + purchase agreement.</strong>{" "}
                When you have picked the specific equipment. Soft
                pre-qualification runs without it &mdash; you get a
                max funding budget to shop inside.
              </li>
              <li>
                <strong>MC and DOT status.</strong> Pending, filed,
                active, or &ldquo;leasing on to a carrier&rdquo; &mdash;
                all are valid answers at the application stage.
              </li>
            </ol>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              A real-shaped no-history funded loan.
            </h2>
            <p className="ins-hero-sub">
              Pattern observed across recent panel no-history funded
              loans (composite, not a specific operator):
            </p>
            <ul className="product-list">
              <li>
                <strong>Operator:</strong> 4 years W-2 driving for a
                regional carrier, $68K average annual income, 620
                FICO, CDL Class A with tanker and doubles
                endorsements.
              </li>
              <li>
                <strong>Entity:</strong> Sole-proprietor DBA filed
                month one, EIN issued month one, MC filed month two,
                MC active month three. Zero business bank statements
                at application.
              </li>
              <li>
                <strong>Personal banking:</strong> 6 months of
                personal statements showing consistent $5,200 monthly
                W-2 deposits, no overdrafts, modest savings balance.
              </li>
              <li>
                <strong>Truck:</strong> 2020 Peterbilt 579, $115K
                dealer asking, $102K appraised, $22K down (21.6%).
              </li>
              <li>
                <strong>Loan structure:</strong> $80K financed,
                17.9% APR, 48-month term, monthly payment $2,335.
                Lender: equipment finance company that specifically
                underwrites driver-to-operator transitions.
              </li>
              <li>
                <strong>Timeline:</strong> Day 0 soft pre-qualification,
                Day 2 truck selected and VIN submitted, Day 5 lender
                term sheet countersigned, Day 8 title verification,
                Day 10 wire to dealer. MC went active Day 14. First
                load Day 17.
              </li>
            </ul>
          </div>
        </section>

        <section id="faq" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              No-business-history truck financing &mdash; common questions.
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

        <section>
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Related: other paths for new operators.
            </h2>
            <ul className="product-list">
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing (the pillar)
                </Link>{" "}
                &mdash; broader product hub for the owner-operator
                vertical.
              </li>
              <li>
                <Link href="/owner-operator-financing/first-time">
                  First-time owner-operator financing
                </Link>{" "}
                &mdash; for the driver-to-owner-operator transition
                specifically.
              </li>
              <li>
                <Link href="/owner-operator-financing/new-llc">
                  Semi truck loan with a new LLC
                </Link>{" "}
                &mdash; for operators with a freshly formed LLC under
                12 months old.
              </li>
              <li>
                <Link href="/new-authority-truck-financing">
                  New authority truck financing
                </Link>{" "}
                &mdash; for operators with an MC# under 12 months old.
              </li>
              <li>
                <Link href="/factoring/no-credit-check">
                  Factoring with no credit check on you
                </Link>{" "}
                &mdash; the cash-flow product for any new operator
                with an active MC# and a load on the books.
              </li>
              <li>
                <Link href="/methodology">Methodology</Link> &mdash;
                how the panel underwrites and how rates are observed.
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
