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

/* /truck-repair-loans/engine-rebuild — repair pillar spoke.
   Editorial frame: in-frame and out-of-frame engine rebuilds — the
   single highest-dollar non-replacement repair category. Cummins ISX,
   Detroit DD15, Volvo D13, Paccar MX-13. Typical invoice $15K–$40K. */

export const metadata: Metadata = {
  title: "Semi truck engine rebuild financing | Dispatched",
  description:
    "In-frame or out-of-frame engine rebuild quote in hand? The Dispatched panel funds rebuilds $15K–$40K, 500 FICO, soft pull, wired to your shop. See lenders.",
  alternates: { canonical: "/truck-repair-loans/engine-rebuild" },
  openGraph: {
    title: "Semi truck engine rebuild financing | Dispatched",
    description:
      "In-frame or out-of-frame engine rebuild quote in hand? The Dispatched panel funds rebuilds $15K–$40K, 500 FICO, soft pull, wired to your shop. See lenders.",
    url: "/truck-repair-loans/engine-rebuild",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semi truck engine rebuild financing | Dispatched",
    description:
      "In-frame or out-of-frame engine rebuild quote in hand? The Dispatched panel funds rebuilds $15K–$40K, 500 FICO, soft pull, wired to your shop. See lenders.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/truck-repair-loans/engine-rebuild";

const faqs = [
  {
    q: "How much does an engine rebuild loan typically cover?",
    a: "Semi truck engine rebuild invoices on the Dispatched panel typically run $15K to $40K depending on whether the work is in-frame or out-of-frame, the engine make, and what components are replaced in the rebuild. In-frame rebuilds on Cummins ISX or Detroit DD15 platforms with new pistons, liners, rod bearings, and a head reseal land in the $18K to $28K range; out-of-frame rebuilds with crankshaft work, all bearings, and full reassembly land in the $28K to $45K range. The lender sizes the loan to the shop invoice plus a 10% to 20% scope buffer for parts found bad on disassembly.",
  },
  {
    q: "What APR should I expect on an engine rebuild loan?",
    a: "The repair-loan band on the panel runs 18% to 30% APR. Engine rebuild loans typically land in the middle of that range — lower than emergency same-day repair (where the speed premium is the trade-off) but higher than equipment-secured truck financing (because the repair-loan structure is shorter-term and the collateral is the partially-rebuilt engine in your existing truck, not a free-standing asset). Operators with 600+ FICO and 12+ months of consistent business deposits see the low end; sub-580 operators with a real shop quote in hand still fund.",
  },
  {
    q: "Can I get financing for a major-component rebuild on a high-mileage truck?",
    a: "Yes, with one underwriting nuance. The panel funds rebuilds on trucks at any mileage — there is no panel-level mileage cutoff because the rebuild itself is what restores the asset value. The lender does ask the shop to confirm the post-rebuild expected remaining life (typically 400K to 600K miles for a quality in-frame on an ISX or DD15). Trucks over 1.2M total miles, especially those on a second or third rebuild, see a tighter lender mix and the loan term shortens to keep payments aligned with the realistic remaining service life of the truck.",
  },
  {
    q: "How long does engine rebuild financing take to fund?",
    a: "Soft approval and lender match: 20 minutes after application. The chosen lender countersigns a term sheet within 4 business hours. The wire to the shop releases the same banking day if the application clears before cutoff; next morning if past cutoff. Engine rebuilds add a verification step that emergency repair does not — the lender typically calls the shop directly to confirm the scope of work, the parts list, and the expected completion timeline. That call adds 30 to 60 minutes to the funding clock but is non-negotiable on rebuilds because the dollar figure justifies the verification.",
  },
  {
    q: "Does the lender pay the shop or pay me?",
    a: "On engine rebuilds, the panel default is wire-to-shop. The lender wires the rebuild amount directly to the shop's business bank account on the shop's W-9 information, with the operator named as the customer on the invoice. This protects everyone: the operator does not handle the funds, the shop has guaranteed payment, and the lender has clean documentation that the loan use matches the application. Operator-direct wires happen occasionally for operators with established shop relationships, but the underwriting bar is higher and the documentation requirements are stricter.",
  },
  {
    q: "Can I rebuild at my own shop or do I need a dealer or specialty shop?",
    a: "Either works, with a small documentation difference. Dealer-shop and certified specialty-shop rebuilds (Cummins ReCon, Detroit Reman dealers, OEM-certified independents) are the fastest underwriting path because the lender already has the shop's W-9 and banking on file. Independent shop rebuilds fund equally well — the lender just needs the shop's W-9, banking instructions, and a brief credentials check (state contractor license or DOT registration) before the wire releases. Owner-rebuilds (rebuilding your own engine at your own facility) do not fund through the repair-loan product — that pivots into a parts-only structure with no labor financing.",
  },
  {
    q: "What if my engine is the second rebuild on this truck?",
    a: "Funds, but the term shortens. A first rebuild on a 700K-mile truck typically funds with a 24 to 48 month term because the post-rebuild service life supports the payment schedule. A second rebuild on the same truck (now 1.4M+ miles) typically funds with a 12 to 24 month term so the loan amortizes inside the realistic remaining service life. The APR is similar to a first rebuild; the structure is what changes. Some operators in this situation pivot to a used-truck purchase financed via equipment financing instead — see semi-truck-financing for that path.",
  },
  {
    q: "What about rebuild financing if my truck is still under a previous loan?",
    a: "Funds, separately from the existing truck loan. The repair-loan product is unsecured at the structural level (the rebuilt engine is inside a truck the operator already owns or is financing); it does not encumber the truck title or require subordination from the existing lender. The repair loan and the equipment loan run as two separate obligations. The application captures the existing truck loan balance and monthly payment so the lender can underwrite the combined debt-service load without over-leveraging the operator.",
  },
];

export default function EngineRebuildFinancingPage() {
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
          { name: "Engine rebuild", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Semi truck engine rebuild financing",
          description:
            "How engine rebuild financing works on the Dispatched panel: in-frame vs out-of-frame cost bands, APR range, lender verification process, and what happens on a second rebuild.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
          authorName: "Angelo Orru Neto",
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Semi truck engine rebuild financing",
          description:
            "Repair loans for in-frame and out-of-frame engine rebuilds on Cummins, Detroit, Volvo, and Paccar platforms. $15K to $40K typical invoice. 18% to 30% APR. 500 FICO floor. Wired to the rebuild shop.",
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
              Truck repair loans · Engine rebuild
            </span>
            <h1 className="ins-hero-title">
              Semi truck engine rebuild financing.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              In-frame or out-of-frame, Cummins ISX or Detroit DD15, $18K
              quote or $40K quote &mdash; the Dispatched panel funds
              rebuilds in the same day-or-two window as smaller repairs.
              Soft pull, 500 FICO floor, wired directly to your rebuild
              shop on the shop&rsquo;s W-9.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=repair&scope=engine-rebuild"
                className="btn btn--primary btn--lg"
              >
                See rebuild lenders &rarr;
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              Soft pull only &middot; Wire-to-shop standard structure.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Cost bands by rebuild type</span>
            <h2 className="ins-hero-title">
              What rebuilds actually cost in 2026.
            </h2>
            <ul className="product-list">
              <li>
                <strong>In-frame rebuild &mdash; $18K to $28K typical.</strong>{" "}
                Pistons, liners, rod bearings, head reseal, oil pump,
                gaskets. Engine stays in the truck frame; teardown is
                limited to what can be accessed from above. Quickest
                rebuild type because the truck does not come out of the
                frame; turnaround at the shop is typically 5 to 10 days.
                Most common rebuild scope on Cummins ISX and Detroit DD15
                at the 600K to 900K mile mark.
              </li>
              <li>
                <strong>Out-of-frame rebuild &mdash; $28K to $45K typical.</strong>{" "}
                Engine removed from the truck; crankshaft work, main
                bearings, full reassembly. Includes head rebuild,
                turbo inspection, and EGR cooler service. Turnaround at
                the shop is 10 to 20 days. Standard scope on trucks past
                900K miles or after a structural failure (cracked block,
                crankshaft damage).
              </li>
              <li>
                <strong>Reman engine swap &mdash; $30K to $55K typical.</strong>{" "}
                Replacement of the existing engine with a manufacturer-
                remanufactured long block (Cummins ReCon, Detroit
                Reman, Volvo Reman). Includes core charge. Fastest
                downtime because the install is a swap rather than a
                rebuild; turnaround typically 5 to 8 days. Premium
                relative to in-frame because labor is shop labor plus
                the long-block premium.
              </li>
              <li>
                <strong>Major component repair (not full rebuild) &mdash; $6K to $15K.</strong>{" "}
                Turbo replacement, head job only, single cylinder repair.
                Lower end of the engine-repair invoice band, sometimes
                routed through the broader{" "}
                <Link href="/truck-repair-loans/emergency">
                  emergency repair loan
                </Link>{" "}
                product when the work is urgent.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">The verification step</span>
            <h2 className="ins-hero-title">
              Why engine rebuild underwriting takes a phone call.
            </h2>
            <p className="ins-hero-sub">
              Emergency repair loans fund without a shop call &mdash; the
              invoice and the operator&rsquo;s application are enough at
              that dollar figure. Engine rebuilds add one verification
              step: the lender calls the rebuild shop directly to confirm
              three things before the wire releases.
            </p>
            <ul className="product-list">
              <li>
                <strong>Scope confirmation.</strong> The lender reads the
                rebuild scope back to the shop &mdash; in-frame vs
                out-of-frame, which parts are being replaced, what the
                shop expects to find on disassembly. This catches scope
                gaps that would otherwise become customer-vs-shop
                disputes after the wire lands.
              </li>
              <li>
                <strong>Banking and W-9.</strong> The lender confirms
                the shop&rsquo;s receiving account and tax ID. This is
                fraud-prevention &mdash; the wire goes to the shop&rsquo;s
                business account, not to a P.O. box or a personal account.
              </li>
              <li>
                <strong>Expected completion timeline.</strong> The shop
                gives the lender a realistic days-to-completion estimate.
                This is not a binding deadline; it is the basis for the
                loan&rsquo;s first-payment date. The loan does not start
                amortizing while the truck is in the shop on most panel
                structures.
              </li>
            </ul>
            <p className="ins-hero-sub">
              The call typically takes 15 to 30 minutes and adds an hour
              to the funding clock. Operators applying after 11 AM local
              should expect funds to land at the shop next morning
              rather than same banking day.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Composite scenario</span>
            <h2 className="ins-hero-title">
              A real-shaped engine rebuild funded loan.
            </h2>
            <p className="ins-hero-sub">
              Pattern observed across recent panel rebuild funded loans
              (composite, not a specific operator):
            </p>
            <ul className="product-list">
              <li>
                <strong>Operator:</strong> Two-truck small fleet, 4 years
                of MC authority, 640 FICO, $52K average monthly business
                deposits across both trucks.
              </li>
              <li>
                <strong>Event:</strong> Truck #1 (2018 Freightliner
                Cascadia, 780K miles, Detroit DD15) blowby + low power
                + oil-in-coolant. Shop quote: out-of-frame rebuild,
                $32,400 including reman head, new turbo, EGR cooler
                service, all bearings.
              </li>
              <li>
                <strong>Application:</strong> Monday 9:15 AM soft
                pre-qualification, 3-lender match, picked the
                trucking-specialty repair lender with a 22.5% APR quote.
              </li>
              <li>
                <strong>Verification call:</strong> Monday 10:30 AM
                lender to shop, 22 minute call, scope confirmed, shop
                W-9 on file by 11:15 AM.
              </li>
              <li>
                <strong>Funding:</strong> Monday 1:40 PM term sheet
                countersigned, wire instruction released at 2:15 PM,
                funds at shop 3:50 PM same day.
              </li>
              <li>
                <strong>Loan terms:</strong> $35,600 principal (invoice
                plus 10% scope buffer), 22.5% APR, 36-month term,
                monthly payment $1,365. First payment 30 days after
                truck back in service (post-rebuild start, not
                wire-release start).
              </li>
            </ul>
          </div>
        </section>

        <section id="faq">
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Engine rebuild financing &mdash; common questions.
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
                &mdash; broader product hub for non-rebuild repairs.
              </li>
              <li>
                <Link href="/truck-repair-loans/emergency">
                  Emergency truck repair loan
                </Link>{" "}
                &mdash; same-banking-day funding for breakdowns and
                roadside events.
              </li>
              <li>
                <Link href="/truck-repair-line-of-credit">
                  Truck repair line of credit
                </Link>{" "}
                &mdash; revolving facility for operators with frequent
                maintenance events.
              </li>
              <li>
                <Link href="/bad-credit-truck-repair-financing">
                  Bad credit truck repair financing
                </Link>{" "}
                &mdash; rebuild and repair financing for sub-580 FICO
                operators.
              </li>
              <li>
                <Link href="/semi-truck-financing">
                  Semi truck financing
                </Link>{" "}
                &mdash; if the rebuild scope crosses into replace-the-
                truck territory.
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
