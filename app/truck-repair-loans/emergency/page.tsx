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

/* /truck-repair-loans/emergency — repair financing pillar spoke.
   Editorial frame: truck broken down on the side of a road, operator
   needs cash today, not in 30 days. Same banking day funding. */

export const metadata: Metadata = {
  title: "Emergency semi truck repair loan — same day | Dispatched",
  description:
    "Truck down, repair invoice in hand? Emergency repair loans fund the same banking day on the Dispatched panel. $5K–$150K, 500 FICO floor, soft pull.",
  alternates: { canonical: "/truck-repair-loans/emergency" },
  openGraph: {
    title: "Emergency semi truck repair loan — same day | Dispatched",
    description:
      "Truck down, repair invoice in hand? Emergency repair loans fund the same banking day on the Dispatched panel. $5K–$150K, 500 FICO floor, soft pull.",
    url: "/truck-repair-loans/emergency",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency semi truck repair loan — same day | Dispatched",
    description:
      "Truck down, repair invoice in hand? Emergency repair loans fund the same banking day on the Dispatched panel. $5K–$150K, 500 FICO floor, soft pull.",
  },
};

const PAGE_URL = "https://dispatched.finance/truck-repair-loans/emergency";

const faqs = [
  {
    q: "How fast can an emergency truck repair loan actually fund?",
    a: "Same banking day, when the application clears soft approval before the chosen lender's wire cutoff. Cutoffs are typically 2 PM to 4 PM local for the lender's depository bank. Applications submitted after cutoff fund next banking day morning. The Dispatched panel runs soft pre-qualification in 20 minutes; the chosen lender countersigns the term sheet within 2 hours; the wire goes out within 4 hours of countersignature. Weekend breakdowns: most panel lenders accept Friday afternoon applications for Monday funding; a subset offer 24/7 funding via commercial cards.",
  },
  {
    q: "How much can I borrow for an emergency repair?",
    a: "The repair-loan band on the panel runs $5K to $150K. The amount is sized to the repair invoice plus a buffer for unexpected scope creep. Below $5K most operators self-fund or use a fuel card line; above $150K the repair is usually a major-component event (in-frame, transmission rebuild) that crosses into equipment financing structures with a different term and rate. The lender wires directly to the shop in most cases; some lenders wire to the operator's business account on confirmation of the invoice.",
  },
  {
    q: "What does an emergency truck repair loan cost?",
    a: "Same-day repair loans on the panel typically land in the 18% to 30% APR band, with the trade-off being speed versus cost. The fastest funding (truly same-banking-day) sits at the high end because the lender is taking on documentation and verification risk. Operators with 600+ FICO and 6+ months of consistent deposits see the lower end. Sub-580 operators with a real shop invoice in hand still fund — the truck-down urgency is a signal lenders price for — but rates are at the top of the band.",
  },
  {
    q: "Do I need to have the repair shop in mind before applying?",
    a: "Not for pre-qualification, but for the wire you do. The lender wants to see the actual repair invoice or a written estimate on the shop's letterhead with the shop's W-9 or banking instructions. This is fraud-protection on the lender's side — they wire to the shop, not to a P.O. box. If you have not yet diagnosed the issue, run soft pre-qualification anyway at /qualify to know your max funding band before you walk into the shop; that protects your negotiating position on the repair scope.",
  },
  {
    q: "Will an emergency loan hurt my credit?",
    a: "Not at the application step. The Dispatched soft pre-qualification does not affect your FICO and is invisible to other lenders. A hard pull happens only after you accept a specific lender's term sheet. Hard pulls inside a 14-day rate-shopping window are counted as one inquiry on most scoring models, so comparing 2 or 3 emergency-repair lenders before picking is not a meaningful credit cost. Missed payments on the loan, like any other loan, will hurt the score after funding.",
  },
  {
    q: "Can I get an emergency repair loan with bad credit?",
    a: "Yes. The panel floor is 500 FICO and the truck-down urgency is itself a credit-supportive signal — the lender knows that the alternative to funding is loss of income, which makes the operator more likely to prioritize the loan payment. Sub-580 operators should expect APR at the top of the 18% to 30% range and a slightly smaller maximum loan amount, but approval rates on emergency repair are higher than on unsecured working capital because the loan use is verifiable and bounded.",
  },
  {
    q: "Can I get an emergency repair loan as a new owner-operator?",
    a: "Yes, with caveats. Operators under 6 months of operating history qualify for a narrower lender subset. The substitute signal is the truck and the repair invoice: the lender knows that a working truck is the operator's only path to revenue, so funding the repair is more underwritable than funding general working capital to a new operator. Plan for higher APR and a smaller maximum loan than a seasoned operator would see for the same repair scope.",
  },
  {
    q: "What if my repair turns out to be more expensive than the loan I qualified for?",
    a: "Scope creep on truck repair is the rule, not the exception. The application asks for a buffer (typically 10% to 20% above the initial invoice) so a Tuesday quote of $12K with a Thursday revised invoice of $14K does not require re-applying. If the actual repair lands materially above the loan, the lender will either fund a top-up wire (typically 24-hour turnaround) or work with the shop on a partial-payment structure. A repair that doubles in scope (in-frame engine rebuild discovered during a clutch job) typically pivots into a longer-term equipment-secured loan rather than the repair-loan product.",
  },
];

export default function EmergencyTruckRepairLoanPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Truck repair loans",
            url: "https://dispatched.finance/truck-repair-loans",
          },
          { name: "Emergency", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Emergency semi truck repair loan — same banking day funding",
          description:
            "How emergency truck repair loans work on the Dispatched panel: same-day funding mechanics, the wire-to-shop structure, APR band, and what the application actually asks for.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
          authorName: "Angelo Orru Neto",
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Emergency truck repair loan",
          description:
            "Same-banking-day truck repair financing. $5K to $150K, 500 FICO floor, 18% to 30% APR. Wire-to-shop or wire-to-operator structures. Soft-pull pre-qualification.",
          url: PAGE_URL,
          category: "Truck repair financing",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">
              Truck repair loans · Emergency
            </span>
            <h1 className="ins-hero-title">
              Emergency truck repair loan — funds today.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              Truck on the side of a road, repair invoice in hand, every
              day off the road costing revenue. The Dispatched panel funds
              emergency repair loans the same banking day — soft pull,
              500 FICO floor, $5K to $150K, wired direct to your shop or
              your business account.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repair&urgency=emergency"
                className="btn btn--primary btn--lg"
              >
                See same-day repair lenders →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              Soft pull only · Same banking day before lender cutoff.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How same-day actually works</span>
            <h2 className="ins-hero-title">
              The funding clock from breakdown to wire.
            </h2>
            <ol className="product-list">
              <li>
                <strong>00:00 — Soft pre-qualification</strong> at /qualify
                or by phone. 20 minutes to soft approval and a 2–4 lender
                shortlist. No credit hit.
              </li>
              <li>
                <strong>00:30 — Pick a lender, upload the invoice.</strong>{" "}
                The shop&rsquo;s W-9 or wire instructions either comes from you
                or the lender calls the shop directly to verify. Hard pull
                happens here.
              </li>
              <li>
                <strong>02:00 — Term sheet countersigned.</strong> APR,
                term length, payment schedule, total cost — all on one
                page. E-sign from your phone.
              </li>
              <li>
                <strong>04:00 — Wire instruction released.</strong> The
                lender&rsquo;s depository sends the wire to the shop&rsquo;s bank (or
                to your business account on operator-direct structures).
              </li>
              <li>
                <strong>End of banking day — Funds land at the shop.</strong>{" "}
                Wires submitted before the depository&rsquo;s cutoff (typically
                2–4 PM local) settle the same day. Past cutoff, settlement
                is the next banking morning.
              </li>
            </ol>
            <p className="ins-hero-sub">
              The discipline that makes this work: the application asks for
              the repair scope up front (engine, transmission, brakes, DPF,
              EGR, electrical) so the lender match is to a panel lender that
              specifically funds that category. Generalist underwriting
              slows the wire by hours; specialist underwriting compresses it.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">What the panel funds</span>
            <h2 className="ins-hero-title">
              Repair categories that match same-day funding.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Engine and major-component repair.</strong>{" "}
                In-frame rebuilds, head jobs, cracked blocks, turbo
                replacement. Typical invoice $8K to $40K. Fastest funding
                category because the diagnosis is bounded and the
                shop relationship is usually stable.
              </li>
              <li>
                <strong>Transmission repair and replacement.</strong>{" "}
                Clutch jobs, full rebuilds, automated-manual gear-set
                work. Typical invoice $6K to $25K. Same-day funding routine.
              </li>
              <li>
                <strong>DPF, EGR, SCR emissions repair.</strong>{" "}
                Diesel particulate filter cleaning or replacement, EGR
                cooler service, DEF system work. Typical invoice $3K to
                $15K. Some lenders bundle these with a maintenance line of
                credit; see{" "}
                <Link href="/truck-repair-line-of-credit">
                  truck repair line of credit
                </Link>{" "}
                if your DPF events are frequent.
              </li>
              <li>
                <strong>Brakes, suspension, steering.</strong>{" "}
                Air-brake system overhaul, ABS, leaf springs, kingpin
                replacement. Typical invoice $2K to $12K. Often funded as
                same-day combined with related maintenance.
              </li>
              <li>
                <strong>Electrical and ECM.</strong>{" "}
                ECM replacement, sensor harness, alternator/starter work.
                Typical invoice $1K to $8K. Bottom end of the repair-loan
                band; some operators pay these from working capital.
              </li>
              <li>
                <strong>Roadside breakdown and towing.</strong>{" "}
                Combined tow + temporary-repair invoices. Lender funds the
                full ticket including towing. Important for operators stuck
                far from their home shop.
              </li>
            </ul>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              A real-shaped emergency repair funded loan.
            </h2>
            <p className="ins-hero-sub">
              Pattern observed across recent panel funded repair loans
              (composite, not a specific operator):
            </p>
            <ul className="product-list">
              <li>
                <strong>Operator:</strong> Owner-operator, 14 months of
                MC authority, 1-truck operation, 580 FICO, $32K average
                monthly business deposits.
              </li>
              <li>
                <strong>Event:</strong> Tuesday afternoon engine code,
                truck towed to Detroit Diesel dealer in Indiana, EGR
                cooler replacement quoted at $9,400.
              </li>
              <li>
                <strong>Application:</strong> Tuesday 5:42 PM soft
                pre-qualification, 2 lender match, picked the trucking-
                specialty repair lender with 24% APR quote.
              </li>
              <li>
                <strong>Funding:</strong> Wednesday 9:30 AM term sheet
                countersigned, Wednesday 1:15 PM wire to the dealer&rsquo;s
                business account, Wednesday 4:00 PM funds confirmed at
                shop, parts pulled.
              </li>
              <li>
                <strong>Loan terms:</strong> $10,400 principal (invoice
                + 10% scope buffer), 24% APR, 18-month term, monthly
                payment $657. Truck back on the road Thursday morning.
              </li>
            </ul>
          </div>
        </section>

        <section id="faq">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Emergency truck repair financing — common questions.
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

        <section className="ins-sunken">
          <div className="ins-container">
            <h2 className="ins-hero-title">
              Related: other repair financing options.
            </h2>
            <ul className="product-list">
              <li>
                <Link href="/truck-repair-loans">
                  Truck repair loans (the pillar)
                </Link>{" "}
                — broader product hub for non-emergency repairs.
              </li>
              <li>
                <Link href="/truck-repair-line-of-credit">
                  Truck repair line of credit
                </Link>{" "}
                — for operators with frequent maintenance events who want
                a revolving facility instead of one-shot loans.
              </li>
              <li>
                <Link href="/bad-credit-truck-repair-financing">
                  Bad credit truck repair financing
                </Link>{" "}
                — repair financing for sub-580 FICO operators.
              </li>
              <li>
                <Link href="/owner-operator-repair-loans">
                  Owner-operator repair loans
                </Link>{" "}
                — single-truck owner-operator repair structures.
              </li>
              <li>
                <Link href="/freightliner-repair-financing">
                  Freightliner repair financing
                </Link>{" "}
                — brand-specific Cascadia / Columbia repair financing.
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
