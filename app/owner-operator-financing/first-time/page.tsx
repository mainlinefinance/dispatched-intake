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
  howTo,
} from "@/components/seo/JsonLd";

/* /owner-operator-financing/first-time — money page targeting
   first-time owner-operators searching for their first truck loan.
   Editorial frame: lenders want 2 years of business history; you have
   2 weeks. Three first-time scenarios the panel funds, lease-purchase
   math, and a HowTo step-by-step from CDL to a funded truck. */

export const metadata: Metadata = {
  title: "First-Time Owner-Operator Truck Financing 2026 | Dispatched",
  description:
    "Buying your first truck as a new owner-operator? Programs from $0 down and 500 FICO. What lenders need before MC#, after MC#, and pre-revenue. Soft pull.",
  alternates: { canonical: "/owner-operator-financing/first-time" },
  openGraph: {
    title: "First-Time Owner-Operator Truck Financing 2026 | Dispatched",
    description:
      "Buying your first truck as a new owner-operator? Programs from $0 down and 500 FICO. What lenders need before MC#, after MC#, and pre-revenue. Soft pull.",
    url: "/owner-operator-financing/first-time",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First-Time Owner-Operator Truck Financing 2026 | Dispatched",
    description:
      "Buying your first truck as a new owner-operator? Programs from $0 down and 500 FICO. What lenders need before MC#, after MC#, and pre-revenue. Soft pull.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/owner-operator-financing/first-time";

const faqs = [
  {
    q: "Can I get a truck loan as a first-time owner-operator?",
    a: "Yes. The Dispatched panel underwrites from a 500 FICO with no minimum business history requirement. Lenders weight your personal credit, down payment, and the truck's value when business history is thin. Plan for 10–20% down on your first deal.",
  },
  {
    q: "Do I need an MC# to finance my first truck?",
    a: "No, but it helps. Operators with an active MC number access better rates because the lender can verify the operating authority. Operators with a CDL but no MC# still fund — the loan is structured against personal credit and the truck's collateral value, with the expectation that authority is filed or in process.",
  },
  {
    q: "How much down payment do I need for my first truck?",
    a: "Plan for 10 to 20% down for a first-time deal. Operators with 600+ FICO and an active MC# sometimes qualify for as low as 10%. Operators below 580 FICO or pre-authority typically need 20% or higher. Larger down payments lower APR by 2–4 points.",
  },
  {
    q: "Is lease-purchase a good way to get my first truck?",
    a: "For most operators, no. Industry data shows 80% of lease-purchase agreements fail before the truck is paid off. The carrier benefits from the structure; the driver rarely accumulates equity. Real ownership financing — even at higher APR — gives you the title, the asset, and the freedom to switch carriers or routes.",
  },
  {
    q: "Can a co-signer help me qualify?",
    a: "Yes, but be cautious. A co-signer with 700+ FICO can drop your APR by 3–5 points and unlock larger loan amounts. The co-signer is fully liable if you default, and the loan reports on their credit. Use a co-signer when the math works for both parties; never to qualify for a deal you can't service.",
  },
  {
    q: "What truck should I buy as a first-time owner-operator?",
    a: "Lenders fund Class 8 sleeper and day-cab tractors most readily. Avoid trucks over 10 years old (term caps short, monthly is high) and avoid sticker prices above appraised value. The lender appraises and finances up to that value minus down — if the dealer is 20% over market, you cover the gap or walk away.",
  },
  {
    q: "How fast can I get funded for my first truck?",
    a: "Pre-qualification on the Dispatched panel takes 6 to 9 minutes (soft pull). After you accept a term sheet, hard pull and underwriting take 1–3 days; title work and inspection add another 2–5 days for private-party deals (faster from dealers). Plan for 5–10 business days from match to keys.",
  },
];

/* HowTo step bodies. Defined once and reused for the visible section
   AND the JSON-LD payload so the schema text matches the on-page text
   verbatim (Google validates schema/visible-content alignment). */
const STEP_1_TEXT =
  "Authority status drives which lenders bid on your file. If you've already filed your MC# with FMCSA, your application routes to a wider panel and lower APRs. If you're still pre-authority, file before you apply or commit to a filing date — most first-time programs accept a UCR receipt or a BOC-3 in process. Operators planning to lease onto a carrier under that carrier's authority should note their DOT# on the application; the lender treats this as a separate routing.";
const STEP_2_TEXT =
  "Pull your free credit report from annualcreditreport.com so you know your FICO before the lender does. Dispute any errors first — a 20-point swing changes your APR band. Then export 90 days of personal bank statements as PDFs (most online banks do this in two clicks). If you've been driving company for a year, include W-2s. The Dispatched panel reads bank deposits as proxy revenue when business history is thin.";
const STEP_3_TEXT =
  "Submit the application at /qualify or /apply?useCase=equipment&firstTime=1. The form takes 6 to 9 minutes and triggers only a soft pull — no impact on your credit score, no score visible to other lenders. A redacted profile (no name, no contact info) goes to the panel subset that funds first-time operators in your credit band. Term sheets come back with APR, down payment, term length, and monthly payment side by side, before any hard pull.";
const STEP_4_TEXT =
  "Once you have a term sheet, shop trucks the lender will actually fund: Class 8 tractors (Cascadia, T680, 579, VNL, Anthem) under 10 years old with under 700K miles, clean title, and a sticker price at or below appraised value. Avoid auction trucks unless the lender pre-approves the auction house. Bring the VIN to your lender before signing anything with the seller — five minutes of validation prevents a deal that falls apart at funding.";
const STEP_5_TEXT =
  "The lender orders a third-party inspection (typically $250–$450, often rolled into the loan) and an appraisal. Private-party deals also need a title pull and lien recording, which takes 2–5 banking days depending on the state. Dealer deals are faster because the dealer holds the title and processes the lien in-house. Expect to sign a pre-funding checklist confirming proof of insurance, IFTA registration, and a binding bill of sale.";
const STEP_6_TEXT =
  "After inspection clears and title work is recorded, you sign final loan documents (often electronically) and the lender wires funds to the seller or dealer. The truck is yours subject to the lien. First payment typically lands 30 days after funding. Set up auto-pay from the same business account you used on the application — missed payments in the first 6 months hurt your credit hardest and damage your standing with the lender for refinance later.";

export default function FirstTimeOwnerOperatorFinancingPage() {
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
          { name: "First time", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline:
            "First-time owner-operator truck financing — your first truck, your first loan",
          description:
            "How first-time owner-operators get financed without two years of business history: panel terms, scenarios, lease-purchase math, and the step-by-step process.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "First-time owner-operator truck financing",
          description:
            "Class 8 truck financing for new owner-operators with limited or no business history. Panel from 500 FICO, 10–20% down, 12–18% APR typical. MC# helpful but not required.",
          url: PAGE_URL,
          category: "Equipment financing",
        })}
      />
      <JsonLd
        payload={howTo({
          name: "How to finance your first truck as a new owner-operator",
          description:
            "Step-by-step process from CDL to a funded first truck on the Dispatched lender panel.",
          totalTime: "P10D",
          steps: [
            {
              name: "Get your authority filed (or know your timing)",
              text: STEP_1_TEXT,
            },
            {
              name: "Pull your credit and gather 90 days of bank statements",
              text: STEP_2_TEXT,
            },
            {
              name: "Pre-qualify with the Dispatched panel",
              text: STEP_3_TEXT,
              url: "https://dispatched.finance/qualify",
            },
            {
              name: "Pick a truck the lender will fund",
              text: STEP_4_TEXT,
            },
            {
              name: "Inspection, appraisal, title work",
              text: STEP_5_TEXT,
            },
            {
              name: "Sign, fund, drive",
              text: STEP_6_TEXT,
            },
          ],
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        {/* SECTION: HERO ============================================== */}
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">First-time owner-operator financing</span>
            <h1 className="ins-hero-title">
              First-time owner-operator truck financing — your first truck,
              your first loan.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              New <Link href="/glossary/cdl-class-a">CDL</Link>, new authority, no business history? Here&rsquo;s
              what the Dispatched lender panel actually approves — and
              what it asks for instead of the two years of revenue most
              banks demand.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=equipment&firstTime=1"
                className="btn btn--primary btn--lg"
              >
                See my first-truck options →
              </Link>
              <Link
                href="/calculators/semi-truck-loan"
                className="btn btn--secondary btn--lg"
              >
                Estimate my payment →
              </Link>
            </div>
            <p className="product-hero-note">
              Soft pull only · 6–9 minutes to pre-qualify.
            </p>
          </div>
        </section>

        {/* SECTION: CHICKEN-AND-EGG =================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">The first-time problem</span>
            <h2 className="ins-hero-title">
              The first-time operator&rsquo;s chicken-and-egg problem.
            </h2>
            <p className="ins-hero-sub">
              Every first-time <Link href="/glossary/owner-operator">owner-operator</Link> hits the same wall: you need
              a truck to make money, but you need money — or a track
              record of making it — to get a truck. The traditional bank
              answer is &ldquo;come back in two years.&rdquo; The dealer
              answer is a <Link href="/glossary/lease-purchase">lease-purchase</Link> that fails most of the time.
              There&rsquo;s a third path, and it&rsquo;s the one
              owner-operators on the Dispatched panel actually use.
            </p>

            <h3>Banks want 2 years of business history; you have 2 weeks</h3>
            <p>
              Conventional bank underwriting for commercial vehicle loans
              wants two tax returns, two years of business bank statements,
              and a debt-service-coverage ratio (DSCR) above 1.25x. A
              first-time owner-operator with a fresh MC# and 30 days of
              deposits fails that test on day one. The bank isn&rsquo;t
              wrong to refuse — its risk model wasn&rsquo;t built for
              you. It was built for an established LLC refinancing a
              fleet. If you&rsquo;re reading this in week two of your
              authority, the bank route is closed for now.
            </p>

            <h3>Dealers will sell you a lease-purchase that fails 80% of the time</h3>
            <p>
              The dealer answer — and the carrier answer — is
              lease-purchase. The pitch is seductive: no money down, low
              weekly payments, drive away today. The reality, per
              published industry data tracked by carriers themselves,
              is that roughly 80% of lease-purchase agreements terminate
              before the driver takes ownership. The carrier resells the
              truck to the next driver. The first driver walks away with
              nothing — no equity, no asset, often a damaged credit
              report. It&rsquo;s a bad deal sold as the only deal.
            </p>

            <h3>There&rsquo;s a middle path — equipment lenders that underwrite the truck plus you</h3>
            <p>
              <Link href="/glossary/equipment-loan">Equipment loan</Link> lenders on the Dispatched panel underwrite
              first-time operators by weighting two factors banks
              under-weight: the truck&rsquo;s collateral value, and your
              personal credit. The truck secures the loan, so the
              lender&rsquo;s downside is bounded by the resale market.
              Your personal credit and bank deposits give the lender
              enough signal to price the deal even without two years of
              business books. That&rsquo;s how a CDL-holder with a fresh{" "}
              <Link href="/glossary/mc-number">MC number</Link> gets a $70K Cascadia financed at 14% APR over 60 months
              — a deal a bank would never write and a lease-purchase
              would bleed dry.
            </p>
          </div>
        </section>

        {/* SECTION: THREE SCENARIOS =================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Three scenarios</span>
            <h2 className="ins-hero-title">
              Three first-time scenarios the Dispatched panel funds.
            </h2>
            <p className="ins-hero-sub">
              Most first-time applications fall into one of three
              profiles. The panel routes each to a different subset of
              lenders with different pricing and down-payment expectations.
              The differences are real — knowing which scenario you fit
              before applying saves hours.
            </p>

            <h3>Scenario A — CDL + active MC# but pre-revenue</h3>
            <p>
              You filed your authority, you have your MC# from FMCSA, you
              have insurance, you&rsquo;re ready to dispatch — you just
              don&rsquo;t own a truck yet. This is the cleanest first-time
              profile. The panel reads your file as a real motor carrier
              with intent. Expect 12–15% APR with 600+ FICO, 10–15% down,
              60-month term on a 2019 or newer Class 8 tractor. This
              scenario also unlocks the broader{" "}
              <Link href="/new-authority-truck-financing">
                new-authority truck financing
              </Link>{" "}
              panel.
            </p>

            <h3>Scenario B — CDL + DOT# (no MC# yet, hauling under a carrier)</h3>
            <p>
              You drive under a carrier&rsquo;s authority — you have a{" "}
              <Link href="/glossary/dot-number">DOT number</Link> tied to that carrier, your CDL is current, you&rsquo;re
              earning settlements but you don&rsquo;t hold operating
              authority. This is the classic{" "}
              <Link href="/glossary/lease-on-driver">lease-on driver</Link> profile.
              You&rsquo;re buying a truck to lease onto the
              same carrier (or jump to another). The panel underwrites
              this off your settlement statements as proxy revenue and
              your personal credit. APR runs 14–17%; down payment 15–20%;
              term up to 60 months on newer trucks. The lender wants to
              see 90 days of consistent settlement deposits.
            </p>

            <h3>Scenario C — CDL only, planning to file authority next</h3>
            <p>
              You have your CDL, you&rsquo;re working as a{" "}
              <Link href="/glossary/company-driver">company driver</Link>
              {" "}or you&rsquo;re fresh out of school, and you&rsquo;re going
              authority-and-truck simultaneously. The panel narrows here
              — fewer lenders write pre-authority deals — and pricing
              moves up. Expect 16–18% APR, 20%+ down, term capped at 48
              months. The strongest version of this scenario pairs a
              co-signer (700+ FICO, often a parent or spouse) with a
              committed authority filing date. Without a co-signer, the
              path narrows further; consider driving company for 3–6
              months to build deposits before applying.
            </p>
          </div>
        </section>

        {/* SECTION: WHAT LENDERS ASK ================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">What lenders ask for</span>
            <h2 className="ins-hero-title">
              What lenders ask first-time operators for.
            </h2>
            <p className="ins-hero-sub">
              When business history is thin, lenders compensate by
              tightening four other inputs. Knowing the ranges before you
              apply lets you walk in with the right expectations and the
              right paperwork — instead of getting surprised at the term
              sheet.
            </p>

            <h3>Personal credit (FICO floor: 500 on Dispatched panel)</h3>
            <p>
              The Dispatched panel writes first-time deals from a 500
              FICO floor. Below 580, you&rsquo;re in the higher end of
              the APR band (16–18%) and down-payment expectations climb
              to 20%+. 580–620 unlocks broader lender participation;
              620–680 hits the typical first-time pricing range; 700+
              gets the best available pricing and the largest loan caps.
              If you&rsquo;re below 580 and the deal isn&rsquo;t urgent,
              90 days of credit-building work — paying down revolving
              balances, disputing errors — can move you a band and save
              real money over 60 months. Lenders also expect a current{" "}
              <Link href="/glossary/dot-physical">DOT physical</Link> on file
              and, once revenue is real, a habit of paying{" "}
              <Link href="/glossary/quarterly-estimated-taxes">quarterly estimated taxes</Link>{" "}
              against the new <Link href="/glossary/schedule-c">Schedule C</Link>.
            </p>

            <h3>Down payment (10–20% standard for first-time; more without authority)</h3>
            <p>
              Down payment is the lever you control most directly.
              Lenders use it to reduce loan-to-value risk. The panel
              standard for first-time deals is 10–20%; 10% is achievable
              with a strong file (active MC#, 620+ FICO, settlement
              history); 20%+ is typical for sub-580 or pre-authority
              deals. Every additional 5% down typically drops APR by 1–2
              points. On a $70K truck over 60 months, 10% down vs. 20%
              down is a difference of roughly $4K in total interest.
            </p>

            <h3>Co-signer (when, why, and what risk it carries)</h3>
            <p>
              A co-signer is another adult with a stronger credit profile
              who attaches their name to the loan. The co-signer is fully
              liable: if you default, the lender pursues them, and the
              loan reports on their credit for the life of the term. The
              upside is real — a 700+ FICO co-signer can drop a
              first-time deal&rsquo;s APR by 3–5 points and unlock a
              loan amount the borrower alone wouldn&rsquo;t qualify for.
              Use a co-signer when the math works for both parties (you
              can comfortably service the payment) and never as a way to
              qualify for a payment you can&rsquo;t carry. A defaulted
              co-signed loan ends relationships.
            </p>

            <h3>Truck choice (lenders fund tractors over trailers for first deals)</h3>
            <p>
              First-time deals on the panel fund Class 8 sleeper and
              day-cab tractors more readily than trailers, dump trucks,
              or specialty vocational equipment. Tractors have the
              deepest secondary market, so the lender&rsquo;s downside
              is bounded. Reefers and dry vans can fund as a second deal
              once the tractor is established. Avoid trucks over 10
              years old on a first deal — terms cap short, monthly
              payments climb, and the truck&rsquo;s remaining service
              life shrinks. See{" "}
              <Link href="/semi-truck-financing">
                semi-truck financing
              </Link>{" "}
              for the full panel guide on Class 8 specifics.
            </p>
          </div>
        </section>

        {/* SECTION: LOAN TERMS ======================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Loan terms</span>
            <h2 className="ins-hero-title">
              First-time loan terms — what to expect.
            </h2>

            <h3>APR range (12–18% typical for true first-timers)</h3>
            <p>
              The observed APR band for first-time owner-operator
              equipment loans on the Dispatched panel runs 12–18%. The
              low end (12–14%) requires 600+ FICO, an active MC#, 15%+
              down, and a newer truck under 5 years old. The middle
              (14–16%) is typical: 580–620 FICO, fresh MC# or strong
              co-signer, 15% down, truck 5–8 years old. The high end
              (16–18%) is sub-580 or pre-authority deals with 20%+ down
              and a shorter term. Final APR sits on the lender&rsquo;s
              term sheet before you sign — no surprises.
            </p>

            <h3>Term length (36–60 months; older truck = shorter)</h3>
            <p>
              Term length is set by the truck&rsquo;s expected residual
              value at payoff. Trucks under 4 years old support the full
              60-month term most lenders cap at. Trucks 5–7 years old
              typically cap at 48 months. Trucks 8–10 years old cap at
              36 months. The math: lenders won&rsquo;t finance a truck
              past the point where the loan balance exceeds the
              truck&rsquo;s expected resale value, because that&rsquo;s
              the point where their downside is uncovered.
            </p>

            <h3>Loan amount caps for first-time deals</h3>
            <p>
              First-time deals on the panel typically cap at $150K for
              Scenario A (active MC#, strong file) and $100K for
              Scenarios B and C. The cap floats with the truck&rsquo;s
              appraised value: if the truck appraises at $80K, the loan
              caps near $80K minus your down payment, regardless of the
              borrower&rsquo;s qualification ceiling. Operators looking
              at $200K+ tractors should plan to put more cash down or
              wait until they have 12+ months of history under their own
              authority.
            </p>
          </div>
        </section>

        {/* SECTION: LEASE-PURCHASE MATH =============================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Lease-purchase math</span>
            <h2 className="ins-hero-title">
              First-time vs. lease-purchase — the real math.
            </h2>

            <h3>Why lease-purchase looks easier and ends worse (10–20% completion rate per industry data)</h3>
            <p>
              Lease-purchase is structured as a weekly truck payment
              deducted from your settlement, often $550–$700, with a
              promise of ownership at the end of a 3–5 year term. The
              completion rate — drivers who actually take title — runs
              10–20% per published carrier data. The other 80–90% of
              drivers terminate early because freight slows, the truck
              breaks down off-warranty, or settlement deductions
              snowball. The carrier resells the truck to the next driver.
              The departing driver leaves with no equity, no asset, often
              a tax form for forgiven debt. The structure is engineered
              for the carrier&rsquo;s economics, not the driver&rsquo;s.
            </p>

            <h3>Cost comparison table over 60 months</h3>
            <p>
              The numbers below compare a typical lease-purchase weekly
              cost against an equivalent equipment loan on the Dispatched
              panel. Both assume the same truck (a $75K used Cascadia)
              over 60 months. The lease-purchase column reflects the
              industry-typical $600/week deduction. The equipment-loan
              column assumes 14% APR, 15% down, 60-month term.
            </p>
            <table className="product-table">
              <thead>
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">Lease-purchase ($600/wk)</th>
                  <th scope="col">Equipment loan (14% APR, 60mo)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Weekly cost</th>
                  <td>$600</td>
                  <td>~$345 (monthly $1,495)</td>
                </tr>
                <tr>
                  <th scope="row">Down payment</th>
                  <td>$0</td>
                  <td>$11,250 (15%)</td>
                </tr>
                <tr>
                  <th scope="row">5-year total paid</th>
                  <td>$156,000</td>
                  <td>$89,700 + $11,250 down = $100,950</td>
                </tr>
                <tr>
                  <th scope="row">Ownership outcome</th>
                  <td>None (truck reverts to carrier)</td>
                  <td>Title in your name, lien released</td>
                </tr>
                <tr>
                  <th scope="row">Completion rate</th>
                  <td>10–20% (industry data)</td>
                  <td>Standard amortization to payoff</td>
                </tr>
                <tr>
                  <th scope="row">Asset at year 5</th>
                  <td>$0</td>
                  <td>~$25K–$35K residual truck value</td>
                </tr>
              </tbody>
            </table>
            <p>
              The lease-purchase costs $55K more cash over 60 months and
              ends with no asset. The equipment loan requires real cash
              up front but ends with a paid-off truck and the freedom to
              switch carriers, switch routes, take{" "}
              <Link href="/glossary/hometime">hometime</Link> on your own
              schedule, or sell the asset. For
              every dollar of risk, the equipment loan is the
              better-engineered deal.
            </p>
          </div>
        </section>

        {/* SECTION: STEP-BY-STEP (HowTo) ============================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Step-by-step</span>
            <h2 className="ins-hero-title">
              Step-by-step: from CDL to your first funded truck.
            </h2>
            <p className="ins-hero-sub">
              Six steps, roughly 5–10 business days end to end. Each step
              has a specific deliverable; missing one stalls the deal.
              Run them in order.
            </p>
            <ol className="product-process">
              <li>
                <strong>
                  Step 1 — Get your authority filed (or know your timing).
                </strong>{" "}
                {STEP_1_TEXT}
              </li>
              <li>
                <strong>
                  Step 2 — Pull your credit and gather 90 days of bank
                  statements.
                </strong>{" "}
                {STEP_2_TEXT}
              </li>
              <li>
                <strong>
                  Step 3 — Pre-qualify with the Dispatched panel (soft
                  pull, 6–9 minutes).
                </strong>{" "}
                {STEP_3_TEXT}
              </li>
              <li>
                <strong>
                  Step 4 — Pick a truck the lender will fund.
                </strong>{" "}
                {STEP_4_TEXT}
              </li>
              <li>
                <strong>
                  Step 5 — Inspection, appraisal, title work.
                </strong>{" "}
                {STEP_5_TEXT}
              </li>
              <li>
                <strong>Step 6 — Sign, fund, drive.</strong> {STEP_6_TEXT}
              </li>
            </ol>
          </div>
        </section>

        {/* SECTION: FAQ =============================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              FAQ — First-time owner-operator truck financing.
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

        {/* SECTION: FINAL CTA ========================================= */}
        <section>
          <div className="ins-container">
            <h2 className="ins-hero-title">
              First truck. Real ownership. Real path.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match in 6–9 minutes. If the panel can fund your
              first deal, you&rsquo;ll see term sheets before any hard
              pull. If it can&rsquo;t yet, you&rsquo;ll know what to fix
              before you waste a hard inquiry.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=equipment&firstTime=1"
                className="btn btn--primary btn--lg"
              >
                See my first-truck options →
              </Link>
              <Link
                href="/calculators/semi-truck-loan"
                className="btn btn--secondary btn--lg"
              >
                Estimate my payment →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION: RELATED =========================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/owner-operator-financing">
                  Owner-operator financing (parent guide) →
                </Link>
              </li>
              <li>
                <Link href="/new-authority-truck-financing">
                  New authority truck financing →
                </Link>
              </li>
              <li>
                <Link href="/semi-truck-financing">
                  Semi truck financing →
                </Link>
              </li>
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing →
                </Link>
              </li>
              <li>
                <Link href="/qualify">
                  Two-question fit (no credit pull) →
                </Link>
              </li>
              <li>
                <Link href="/calculators/semi-truck-loan">
                  Semi-truck loan calculator →
                </Link>
              </li>
              <li>
                <Link href="/methodology">
                  How we describe APR ranges →
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
