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

/* /owner-operator-financing/new-llc — startup-trucking pillar spoke.
   Editorial frame: brand-new LLC (under 12 months, often 1-3 months)
   trying to finance a truck. Matches dispatched's real lead pattern
   per intake data. Weak SERP (no DR 90+ aggregator owns it). */

export const metadata: Metadata = {
  title: "Semi truck loan with a new LLC — 1–12 mo old | Dispatched",
  description:
    "Brand-new LLC, no business history yet, trying to finance a truck? The Dispatched panel underwrites new entities from 1 month old. Soft pull. See what funds.",
  alternates: {
    canonical: "/owner-operator-financing/new-llc",
  },
  openGraph: {
    title: "Semi truck loan with a new LLC — 1–12 mo old | Dispatched",
    description:
      "Brand-new LLC, no business history yet, trying to finance a truck? The Dispatched panel underwrites new entities from 1 month old. Soft pull. See what funds.",
    url: "/owner-operator-financing/new-llc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semi truck loan with a new LLC — 1–12 mo old | Dispatched",
    description:
      "Brand-new LLC, no business history yet, trying to finance a truck? The Dispatched panel underwrites new entities from 1 month old. Soft pull. See what funds.",
  },
};

const PAGE_URL = "https://dispatched.finance/owner-operator-financing/new-llc";

const faqs = [
  {
    q: "Can I get a semi truck loan with a brand-new LLC?",
    a: "Yes. The Dispatched panel underwrites new entities from one month of formation, not the two-year operating history that traditional banks require. The lender substitutes signals that exist before a business has tax returns: the operator's W-2 driving history, the truck's appraised value, the down payment, and the personal bank statement run-rate. The age of the LLC matters less than whether the operator has a real path to revenue once the truck is funded.",
  },
  {
    q: "How old does my LLC have to be to qualify?",
    a: "The panel floor is one month of formation with active EIN and a state-issued certificate of formation in good standing. LLCs at 3 to 6 months see a slightly wider lender mix; at 12 months with consistent business bank deposits the full product set opens. Below one month, the lender will typically wait for the certificate to be filed and the EIN to populate IRS records — which is days, not weeks.",
  },
  {
    q: "Do I need an MC number before applying with a new LLC?",
    a: "Not for the application — soft pre-qualification runs at /qualify without an MC. But for funding, equipment-secured loans on Class 8 tractors typically require an active or in-process MC authority because the loan amount and term assume the truck is moving freight. If you are leasing on to a carrier rather than running your own authority, the carrier's MC plus your CDL and recent driving history are the substitute signals. Unsecured working capital is not generally available to a brand-new LLC without revenue history.",
  },
  {
    q: "What can I finance with a new LLC?",
    a: "Equipment financing is the primary product: a tractor, trailer, or both, secured by the asset. Loan amounts on the panel range from $40K for older sleeper trucks up to $200K for newer day cabs, with APR running 12% to 18% for new-LLC borrowers in the equipment-secured range. Working capital ($25K to $250K) typically requires 3 to 6 months of business bank statements showing real deposits, which a brand-new LLC has not accumulated yet. Factoring is the third option — the factor underwrites the broker, not the LLC, so age of entity is largely irrelevant.",
  },
  {
    q: "What documents does a new LLC need to apply?",
    a: "Five items: (1) the state-filed Articles of Organization or Certificate of Formation, (2) the IRS EIN confirmation letter (CP 575), (3) the operator's driver's license and CDL, (4) 3 months of personal bank statements (substitutes for the business statements you do not have yet), and (5) the truck identification and purchase agreement or VIN if you've picked the equipment. The MC and DOT numbers go on the application when they exist; otherwise the lender accepts the pending status.",
  },
  {
    q: "Will lenders pull my personal credit even though I have an LLC?",
    a: "For loans of any size to a sub-2-year LLC, yes — the lender treats the personal guarantee as the primary credit signal because the business has no track record. The Dispatched application runs a soft pull at the start that does not show on your credit report or affect your FICO. A hard pull happens only after you accept a specific lender's term sheet. Hard pulls inside a 14-day rate-shopping window are counted as one inquiry on most scoring models.",
  },
  {
    q: "What if my LLC was registered in Wyoming or Delaware but I operate elsewhere?",
    a: "Common pattern, and not a problem on the panel. The state of LLC formation is administrative; what the lender underwrites is where the trucks operate and where the deposits land. A Wyoming LLC running a Texas-based owner-operation with all deposits in a Texas bank is underwritten as a Texas operation. Operators with formation in one state and operating address in another should be prepared to explain the structure briefly at the application step — usually a one-sentence answer.",
  },
  {
    q: "Is a new LLC better or worse than running as a sole proprietor for truck financing?",
    a: "Slightly better in the equipment-secured product set, neutral-to-worse in working capital. An LLC adds limited liability and looks more institutional to a lender; the panel quotes a fractionally lower APR on equipment loans to LLCs than to sole props at the same FICO and revenue band. On working capital, the LLC needs 6+ months of business bank statements to qualify at all — a sole prop with 12 months of Schedule C activity in the same depository can sometimes qualify faster because the deposit history is longer.",
  },
  {
    q: "How fast can a new LLC get funded after applying?",
    a: "Soft approval and lender match: typically 20 minutes after application. Equipment loans on a new LLC fund in 3 to 5 banking days after the lender countersigns — slower than a seasoned operation because the title work and lien recording on a brand-new entity need verification. Working capital, when available, funds the same banking day. If the LLC formation paperwork is in process (filed but not yet returned by the Secretary of State), the lender will hold until the certificate lands; that adds 5 to 15 days depending on the state.",
  },
];

export default function NewLlcTruckFinancingPage() {
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
          { name: "New LLC", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Semi truck loan with a new LLC: 1–12 months old",
          description:
            "What the panel funds when an LLC is under 12 months old and there is no business history yet — substitute signals, document checklist, and the product set that actually quotes.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
          authorName: "Angelo Orru Neto",
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Semi truck financing for new LLCs",
          description:
            "Equipment financing and factoring for operators whose LLC is 1 to 12 months old. Panel underwrites at one month of formation. Equipment APR 12% to 18% in the new-LLC band. Soft-pull pre-qualification.",
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
              Owner-operator financing · New LLC
            </span>
            <h1 className="ins-hero-title">
              Semi truck loan with an LLC under 12 months old.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              Banks ask for two years of tax returns. Your LLC is two months
              old. The Dispatched panel underwrites new entities from one
              month of formation — substituting your W-2 driving history,
              personal bank statements, and equipment value for the business
              track record you have not had time to build yet.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=equipment&entity=new-llc"
                className="btn btn--primary btn--lg"
              >
                See what funds with my LLC →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              Soft pull only · LLCs from 1 month of formation.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The short answer</span>
            <h2 className="ins-hero-title">
              What a one-month-old LLC can actually finance.
            </h2>
            <p className="ins-hero-sub">
              The panel funds three products at the new-LLC stage, each with a
              different substitute-signal model:
            </p>
            <ul className="product-list">
              <li>
                <strong>Equipment financing for the truck itself.</strong> The
                tractor is collateral. The lender appraises the truck and
                lends to value (not to revenue), so an LLC with no business
                deposits can still qualify if the personal-guarantee credit
                profile is acceptable and the down payment lands at 10% to
                20% of value. Panel APR runs 12% to 18% in the new-LLC band.
                Loan amounts: $40K to $200K depending on truck age and
                appraised value.
              </li>
              <li>
                <strong>
                  Invoice factoring (no LLC age minimum at all).
                </strong>{" "}
                The factor underwrites the broker who owes the invoice — not
                the LLC. A one-week-old LLC with a freshly issued MC# and
                one signed load is fundable on the same day the invoice
                clears.{" "}
                <Link href="/factoring/no-credit-check">
                  Factoring with no credit check on you
                </Link>{" "}
                is the standard structure here.
              </li>
              <li>
                <strong>
                  Working capital — only after the LLC has revenue history.
                </strong>{" "}
                Working capital underwrites on business bank statements. A
                new LLC without 3 to 6 months of business deposits will not
                qualify for the working-capital product on the panel,
                regardless of personal credit. The right sequence is fund
                the truck → run loads → factor the invoices → apply for
                working capital at 6 months once the deposits exist.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Substitute signals</span>
            <h2 className="ins-hero-title">
              How the panel underwrites a new LLC.
            </h2>
            <p className="ins-hero-sub">
              A traditional bank wants two years of tax returns, a P&amp;L,
              and a debt-service-coverage ratio computed against the entity.
              A new LLC has none of these. The Dispatched panel substitutes
              four signals that DO exist at month one:
            </p>
            <ul className="product-list">
              <li>
                <strong>Operator W-2 driving history.</strong> The last 12 to
                24 months of W-2 income as a company driver substitutes for
                business revenue history. A driver with 18 months of stable
                W-2 driving income at $65K+ is underwriteable on the panel.
                The lender computes loan size against this income, not
                against the LLC&rsquo;s nonexistent revenue.
              </li>
              <li>
                <strong>Personal bank statement run-rate.</strong> 90 days
                of personal bank statements show the operator&rsquo;s actual cash
                flow — what comes in, what goes out, whether there is
                discipline. New-LLC borrowers without a long W-2 history
                lean on this signal harder; the lender wants to see at least
                $4K to $6K per month landing consistently.
              </li>
              <li>
                <strong>Personal credit (carries more weight here).</strong>{" "}
                FICO matters more on a new-LLC equipment loan than on a
                seasoned-operator loan because the personal guarantee is
                doing more of the underwriting work. The panel floor is
                still 500 FICO, but new-LLC borrowers below 580 see a
                tighter lender subset and rates at the high end of the
                12% to 18% equipment range.
              </li>
              <li>
                <strong>Equipment quality and down payment.</strong> Truck
                age, mileage, maintenance history, and the size of the down
                payment all weigh more when the LLC has no track record. A
                $25K down payment on a 4-year-old Freightliner Cascadia
                changes the lender&rsquo;s risk model substantially versus zero
                down on an 8-year-old truck.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Document checklist</span>
            <h2 className="ins-hero-title">
              What a new LLC actually needs to apply.
            </h2>
            <p className="ins-hero-sub">
              Five items get a new-LLC application through soft approval:
            </p>
            <ol className="product-list">
              <li>
                <strong>Articles of Organization.</strong> The
                state-filed formation certificate from your Secretary of
                State. A filing receipt is acceptable if the certificate is
                still in processing; the lender will hold final funding
                until the certificate lands.
              </li>
              <li>
                <strong>IRS EIN confirmation letter (CP 575).</strong> The
                IRS-issued employer identification number letter — applied
                for at irs.gov, returned in minutes for SSN-eligible
                operators. The EIN is the LLC&rsquo;s tax ID and is required on
                every lender application.
              </li>
              <li>
                <strong>Driver&rsquo;s license + CDL.</strong> The operator&rsquo;s
                personal ID plus the commercial driver&rsquo;s license. The CDL
                date of issue and endorsements matter; lenders quote
                better terms to operators with 3+ years of CDL history
                versus a brand-new CDL.
              </li>
              <li>
                <strong>3 months of personal bank statements.</strong>{" "}
                The new LLC does not have business statements yet, so the
                lender reads the personal account as the proxy for cash
                flow discipline. Statements should not show overdrafts,
                NSFs, or gambling activity — any of those significantly
                tighten the lender subset.
              </li>
              <li>
                <strong>Truck VIN + purchase agreement.</strong> If you
                have picked the specific truck, the VIN and dealer or
                seller purchase agreement let the lender appraise the
                asset. If you are still shopping, soft pre-qualification
                runs without the VIN and gives you a max budget to shop
                inside.
              </li>
            </ol>
            <p className="ins-hero-sub">
              MC and DOT numbers go on the application when they exist. If
              the MC is filed but not yet active, the lender accepts the
              pending status; funding holds until the MC turns active.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              A real-shaped new-LLC funded loan.
            </h2>
            <p className="ins-hero-sub">
              Pattern observed across recent panel funded loans (composite,
              not a specific operator):
            </p>
            <ul className="product-list">
              <li>
                <strong>Operator:</strong> 4 years W-2 driving for a major
                carrier, $72K average annual income, 640 FICO, CDL Class A
                with hazmat endorsement.
              </li>
              <li>
                <strong>LLC age:</strong> 3 months old, Wyoming registered,
                Texas operating address, MC filed at month one, active at
                month two.
              </li>
              <li>
                <strong>Truck:</strong> 2021 Freightliner Cascadia,
                $108,000 dealer asking, $95,000 appraised value, $19,000
                down (20%).
              </li>
              <li>
                <strong>Loan structure:</strong> $76,000 financed, 14.5%
                APR, 60-month term, monthly payment $1,790. Lender:
                trucking-specialty equipment finance company on the panel.
              </li>
              <li>
                <strong>Funding timeline:</strong> Day 0 application, Day 1
                lender match + soft approval, Day 4 term sheet
                countersigned, Day 5 title verification, Day 7 wire to
                dealer. Truck on the road Day 8.
              </li>
            </ul>
          </div>
        </section>

        <section id="faq" className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              New LLC truck financing — common questions.
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
              Related: financing paths for new operators.
            </h2>
            <ul className="product-list">
              <li>
                <Link href="/owner-operator-financing/first-time">
                  First-time owner-operator financing
                </Link>{" "}
                — the broader hub on driver-to-owner-operator transitions.
              </li>
              <li>
                <Link href="/new-authority-truck-financing">
                  New authority truck financing
                </Link>{" "}
                — operators with an MC# under 12 months old.
              </li>
              <li>
                <Link href="/factoring/no-credit-check">
                  Factoring with no credit check on you
                </Link>{" "}
                — the working-capital substitute for any new LLC with at
                least one signed load.
              </li>
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing
                </Link>{" "}
                — for new-LLC operators with sub-580 personal FICO.
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
