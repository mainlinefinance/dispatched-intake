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
  itemList,
} from "@/components/seo/JsonLd";

/* /fuel-cards — second-wave SEO landing, AEO-targeted.

   Editorial frame: comparison page for owner-operators choosing
   between cost-plus, network-discount, and retail-minus fuel cards.
   AEO target prompt: "Best fuel cards for independent truck drivers"
   (currently dominated by WEX/AtoB/Shell content). The honest pitch
   is that the right card depends on where you fuel and how you pay
   — there is no "best" without that context. We carry the discount
   data verbatim from each issuer's published page (May 2026) and
   flag where the issuer does not publish a number rather than
   inventing one.

   Cluster: this page is the spoke for the broader /cut-fuel-costs
   driver-education TOFU article (planned for driver.news). Internal
   links keep the user inside Dispatched for the financing intent. */

export const metadata: Metadata = {
  title: "Best fuel cards for independent truck drivers (2026) | Dispatched",
  description:
    "Compare AtoB, WEX, Shell, RTS Pro, TCS. Discount per gallon, network, fees, and credit terms for owner-operators and small fleets — sourced from each issuer.",
  alternates: { canonical: "/fuel-cards" },
  openGraph: {
    title: "Best fuel cards for independent truck drivers (2026) | Dispatched",
    description:
      "Compare AtoB, WEX, Shell, RTS Pro, TCS. Discount per gallon, network, fees, and credit terms for owner-operators and small fleets — sourced from each issuer.",
    url: "/fuel-cards",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best fuel cards for independent truck drivers (2026) | Dispatched",
    description:
      "Compare AtoB, WEX, Shell, RTS Pro, TCS. Discount per gallon, network, fees, and credit terms for owner-operators and small fleets — sourced from each issuer.",
  },
};

const PAGE_URL = "https://dispatched.finance/fuel-cards";

/* Comparison data — discount, network, fee, credit type, best-for.
   Numbers reflect each issuer's published product page (May 2026)
   plus current independent-test data where the issuer does not
   publish a fee schedule. Update with each new audit pass. */
const CARDS: ReadonlyArray<{
  name: string;
  url: string;
  discount: string;
  network: string;
  monthlyFee: string;
  creditType: string;
  bestFor: string;
}> = [
  {
    name: "AtoB",
    url: "https://www.atob.com/",
    discount: "Avg 42¢/gal at partner truck stops (H2 2025); up to $2.00/gal at select locations",
    network: "4,200+ truck stops; any Mastercard merchant (99%+ acceptance)",
    monthlyFee: "Not published as a flat per-card fee on standard plans",
    creditType: "Charge card; no hard credit pull on some plans",
    bestFor: "OTR owner-ops wanting large discounts plus broad acceptance",
  },
  {
    name: "RTS Pro",
    url: "https://www.rtsinc.com/product/fuel-discount-program",
    discount: "$0.05–$0.20/gal; bundle with RTS factoring adds 5–10¢/gal",
    network: "850+ Pilot Flying J and One9 Fuel Network locations",
    monthlyFee: "No annual fee per RTS published terms",
    creditType: "Credit card; decisioned at sign-up",
    bestFor: "Carriers factoring with RTS; Pilot-heavy lanes",
  },
  {
    name: "Shell Card Business",
    url: "https://www.businessfleetsolutions.com/fuel-card/shell-card-business/",
    discount: "Up to 6¢/gal at Shell stations; no gallon cap",
    network: "Shell-branded stations only (Shell Card Business); Flex variant adds 95%+ US gas stations",
    monthlyFee: "$0/card (Shell Card Business); $2/card (Shell Card Business Flex)",
    creditType: "Credit (issued by WEX)",
    bestFor: "New authorities building business credit; light-vehicle and Shell-anchored fleets",
  },
  {
    name: "WEX Fleet Card",
    url: "https://www.wexinc.com/products/fuel-cards-fleet/",
    discount: "1–15¢/gal in network; 1–3¢ out-of-network (FlexCard does not earn rebates at Pilot, TA, Love's, Petro, Flying J)",
    network: "Nationwide; thin coverage at major OTR chains on standard FlexCard",
    monthlyFee: "Request written fee schedule before signing — independent 2025 testing observed ~$4/card monthly on the standard product",
    creditType: "Credit; personal guarantee required",
    bestFor: "Mixed fleets with predictable in-network fueling",
  },
  {
    name: "TCS Fuel Card",
    url: "https://www.tcsfuel.com/",
    discount: "Cost-plus pricing; ~51¢/gal average savings at in-network truck stops (Q1 2026, TCS-reported)",
    network: "Pilot, Love's, TA Petro, AMBest network",
    monthlyFee: "$0 in-network transaction fee; $3 per out-of-network transaction",
    creditType: "Prepaid; no credit check",
    bestFor: "Owner-ops with no or rebuilding credit; high-volume cost-plus fuelers",
  },
];

const faqs = [
  {
    q: "What's the best fuel card for an owner-operator with one truck?",
    a: "For most one-truck owner-operators running OTR lanes, AtoB or TCS deliver the largest at-pump savings — AtoB on broad Mastercard acceptance plus a 42¢/gal H2 2025 average at partner truck stops, TCS on cost-plus pricing at the major chains. RTS Pro is the better choice if you already factor with RTS or fuel mostly at Pilot Flying J.",
  },
  {
    q: "Do fuel cards require a credit check?",
    a: "It depends on the product. Charge or credit-style cards (WEX, Shell Card Business, RTS Pro, parts of AtoB) typically run a credit check. Prepaid cards like TCS do not, because you fund the balance before fueling — the issuer is not taking credit risk on you.",
  },
  {
    q: "Can I use a fuel card for repairs, tires, or tolls?",
    a: "Yes on Mastercard- or Visa-accepted cards like AtoB. Most retail-network fuel cards — Shell Card Business, the standard WEX FlexCard, RTS Pro — are fuel-only or limited to a small set of related categories.",
  },
  {
    q: "What does cost-plus pricing actually mean?",
    a: "The card pays the truck stop's wholesale cost for diesel plus a flat per-gallon markup, instead of the posted pump price. At a Pilot or TA, that often lands 30–60¢ below the sign price. TCS and NASTC are the best-known cost-plus issuers in trucking.",
  },
  {
    q: "Why doesn't WEX work well at Pilot, TA, and Love's?",
    a: "Those chains are not in WEX's standard rebate network for the FlexCard product. WEX sells a separate Cross Roads card that includes them, but at higher cost — request the full fee schedule and rebate matrix before signing either product.",
  },
  {
    q: "Do fuel cards build my business credit?",
    a: "Credit-style cards like Shell Card Business and WEX report to business credit bureaus. Prepaid cards like TCS typically do not, because you funded the balance up front and the issuer is not extending credit.",
  },
  {
    q: "How much do fuel cards cost the trucker?",
    a: "The most common direct cost is a monthly per-card fee, often $0–$5. Many cards have no annual fee. Hidden costs to watch for: paper-invoice fees, network surcharges at out-of-network stops, and balance-transfer or late-payment fees.",
  },
  {
    q: "Can I get a fuel card if I have bad credit?",
    a: "Yes. TCS and similar prepaid cards are designed for operators with low FICO or no business credit history. They are funded in advance, so the issuer is not taking credit risk and the application is essentially open to any active DOT-registered carrier.",
  },
  {
    q: "Should I use a fuel card or pay for diesel with my regular business credit card?",
    a: "Almost always the fuel card. Even modest 5–10¢/gal savings compound: 8,000 gallons per quarter at 10¢/gal equals $800 back per quarter, before any non-fuel rewards. Pumping diesel onto a generic business card forfeits the trucking-specific discount stack.",
  },
  {
    q: "Can I get a fuel card and an invoice factoring agreement together?",
    a: "Yes — RTS, Apex, TBS, and several other factoring companies bundle their factoring product with a fuel card, often improving the at-pump discount by 5–10¢/gal versus the standalone card. The fuel-advance feature on most factoring products also routes funds straight to the bundled fuel card.",
  },
];

export default function FuelCardsPage() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          { name: "Fuel cards", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Best fuel cards for independent truck drivers (2026)",
          description:
            "Comparison of AtoB, WEX, Shell, RTS Pro, and TCS for owner-operators and small fleets — discount per gallon, network, fees, and credit terms sourced from each issuer.",
          url: PAGE_URL,
          datePublished: today,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={itemList({
          name: "Best fuel cards for independent truck drivers (2026)",
          description:
            "Ranked comparison of trucking-focused fuel cards: AtoB, RTS Pro, Shell Card Business, WEX Fleet Card, TCS Fuel Card.",
          items: CARDS.map((c) => ({
            name: c.name,
            url: c.url,
            description: c.bestFor,
          })),
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        {/* SECTION: HERO ============================================== */}
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Fuel cards</span>
            <h1 className="ins-hero-title">
              Best fuel cards for independent truck drivers in 2026.
            </h1>
            <EditorialByline updated={today} />
            <p className="ins-hero-sub">
              The best fuel card for an independent trucker depends on
              where you fuel and how you pay. AtoB leads on truck-stop
              discount size. RTS Pro fits if you factor or fuel at Pilot
              Flying J. Shell Card Business builds credit for new
              authorities. WEX suits established small fleets. TCS wins
              on volume via cost-plus pricing.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=other"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
            <p className="product-hero-note">
              No hard credit pull to start. · Takes about 2 minutes.
            </p>
          </div>
        </section>

        {/* SECTION: HOW FUEL CARDS SAVE ============================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How they work</span>
            <h2 className="ins-hero-title">
              Three ways a fuel card cuts your effective price per gallon.
            </h2>
            <ul className="product-list">
              <li>
                <strong>Retail-minus rebate.</strong> You pay the pump
                price; the issuer credits cents-per-gallon back on your
                statement. Easy to compare, but the rebate is usually
                1–15¢/gal and tiered to monthly gallons. Examples: WEX,
                Shell.
              </li>
              <li>
                <strong>Cost-plus pricing.</strong> The card pays the
                truck stop&rsquo;s wholesale cost plus a flat markup. The
                effective discount at a typical Pilot, TA, or
                Love&rsquo;s pump is often 30–60¢/gal — you see it on the
                receipt, not the statement. Examples: TCS, NASTC.
              </li>
              <li>
                <strong>Network discount.</strong> The truck stop chain
                has a contract with the card issuer; you pay the
                discounted &ldquo;card price&rdquo; at the pump. Examples:
                RTS Pro at Pilot Flying J / One9.
              </li>
            </ul>
            <p className="ins-hero-sub">
              The number that matters is not the advertised cpg discount.
              It is{" "}
              <strong>
                net cents off pump at the truck stops you actually use
              </strong>
              . A card that beats every competitor at Pilot is irrelevant
              if your routes only hit TA.
            </p>
          </div>
        </section>

        {/* SECTION: COMPARISON TABLE ================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Head-to-head</span>
            <h2 className="ins-hero-title">
              The top fuel cards for independent truckers, compared.
            </h2>
            <p className="ins-hero-sub">
              Discount, fee, and credit-type data sourced from each
              issuer&rsquo;s product page in May 2026. Ranges reflect the
              issuer&rsquo;s published terms; actual savings depend on
              your routes, volume, and the chains you fuel at.
            </p>
            <div className="product-table-wrap">
              <table className="product-table">
                <thead>
                  <tr>
                    <th scope="col">Card</th>
                    <th scope="col">Discount (truck stops)</th>
                    <th scope="col">Primary network</th>
                    <th scope="col">Monthly fee</th>
                    <th scope="col">Credit type</th>
                    <th scope="col">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {CARDS.map((c) => (
                    <tr key={c.name}>
                      <th scope="row">
                        <a
                          href={c.url}
                          rel="nofollow noopener"
                          target="_blank"
                        >
                          {c.name}
                        </a>
                      </th>
                      <td>{c.discount}</td>
                      <td>{c.network}</td>
                      <td>{c.monthlyFee}</td>
                      <td>{c.creditType}</td>
                      <td>{c.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION: CARD-BY-CARD ===================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Card detail</span>
            <h2 className="ins-hero-title">What each card actually does.</h2>

            <h3 className="product-h3">AtoB</h3>
            <p>
              AtoB markets a 42¢/gal average truck-stop discount across
              H2 2025 customer transactions, with peak savings up to
              $2.00/gal at partner locations. Acceptance is the
              practical advantage: any merchant that takes Mastercard
              takes the AtoB card, which covers 99%+ of US gas stations
              and truck stops. Useful for non-fuel spend too (tires,
              tolls, maintenance) with category-level spending controls.
              Sign-up does not require a hard credit pull on certain
              plans.
            </p>

            <h3 className="product-h3">RTS Pro</h3>
            <p>
              RTS Pro is the card most worth carrying if you are already
              factoring with RTS Financial. Standalone discounts run
              $0.05–$0.20/gal across the Pilot Flying J Travel Center
              and One9 Fuel Network (850+ locations). Bundled factoring
              customers see 5–10¢ extra per gallon. No annual fees, no
              contracts. Same-day funding on verified invoices when you
              submit through the RTS Pro app.
            </p>

            <h3 className="product-h3">Shell Card Business</h3>
            <p>
              The Shell Card Business replaced the old Shell Fleet Plus
              in 2024 and is issued through WEX. Up to 6¢/gal at Shell
              stations with no gallon cap (Shell Fleet Plus capped
              rebates at 20,000 gallons; this one does not). The
              Shell-only standard card has no monthly fee; the broader
              Shell Card Business Flex (accepted at ~95% of US gas
              stations) runs $2/card monthly. Best fit for new
              authorities who need to build business credit while still
              saving on Shell-anchored routes.
            </p>

            <h3 className="product-h3">WEX Fleet Card</h3>
            <p>
              WEX is the incumbent. The headline 3–15¢/gal in-network
              discount usually requires 5,000+ gallons/month to hit the
              top tier. The bigger issue for owner-operators: the
              standard FlexCard does not earn rebates at Pilot, Flying J,
              Love&rsquo;s, Petro, or TA — the five chains where most
              OTR drivers buy most of their diesel. The Cross Roads
              variant fixes that but costs more. Best fit: mixed fleets
              where vans and pickups dominate spend. Request the written
              fee schedule before signing.
            </p>

            <h3 className="product-h3">TCS Fuel Card</h3>
            <p>
              TCS uses cost-plus pricing — the card pays the truck
              stop&rsquo;s wholesale price plus a fixed markup, which
              TCS reports lands at roughly 51¢/gal average savings at
              in-network truck stops in Q1 2026. Prepaid model, no credit
              pull, so it works for newer operators or operators
              rebuilding credit. In-network transactions carry $0
              transaction fees; out-of-network transactions carry $3
              each, and out-of-network acceptance is narrower than
              Mastercard-accepted cards.
            </p>
          </div>
        </section>

        {/* SECTION: METHODOLOGY ===================================== */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">How we ranked</span>
            <h2 className="ins-hero-title">The three rules behind this list.</h2>
            <ul className="product-list">
              <li>
                <strong>
                  The card has to be designed for trucking, not branded
                  for it.
                </strong>{" "}
                A retail gas card with a fleet logo on it usually does
                not move the needle on diesel. The five above are built
                around freight fueling patterns.
              </li>
              <li>
                <strong>
                  Discounts have to be verifiable on the issuer&rsquo;s
                  own page or in an independent test.
                </strong>{" "}
                No &ldquo;saves you up to 60¢&rdquo; without sourcing.
              </li>
              <li>
                <strong>Fees have to be disclosed.</strong> Cards that
                hide transaction fees, paper-invoice fees, or network
                surcharges get flagged in the table rather than
                recommended.
              </li>
            </ul>
            <p className="ins-hero-sub">
              We excluded retail-branded cards (Pilot Flying J&rsquo;s
              own loyalty program, Love&rsquo;s Express, etc.) because
              they earn discounts at one chain only, and they do not
              work as a fleet management tool.
            </p>
          </div>
        </section>

        {/* SECTION: CHOOSING ======================================== */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Choosing</span>
            <h2 className="ins-hero-title">
              Matching the card to your fueling pattern.
            </h2>
            <ul className="product-list">
              <li>
                <strong>
                  Solo OTR, 8,000–15,000 miles/month, runs Pilot, TA,
                  Love&rsquo;s.
                </strong>{" "}
                Look at TCS (cost-plus) or RTS Pro (if you factor with
                RTS). AtoB if you want one card for fuel + maintenance +
                tolls.
              </li>
              <li>
                <strong>Small fleet, 2–5 trucks, mixed lanes.</strong>{" "}
                AtoB or RTS Pro. Avoid the standard WEX FlexCard unless
                your trucks rarely fuel at the big five chains.
              </li>
              <li>
                <strong>New authority, 0–6 months in business.</strong>{" "}
                Shell Card Business (credit-builder) plus a prepaid card
                like TCS as backup. Don&rsquo;t sign a personal guarantee
                on something with hidden fees.
              </li>
              <li>
                <strong>Regional fleet, fuels mostly in network.</strong>{" "}
                WEX in-network tiers work — demand the full fee schedule
                before signing.
              </li>
            </ul>
            <p className="ins-hero-sub">
              When fuel is eating cash flow faster than the card
              discount can fix, the answer is not a different card. It
              is a <Link href="/factoring">fuel advance via factoring</Link> or short-term{" "}
              <Link href="/trucking-working-capital">trucking working capital</Link>. Dispatched matches
              owner-operators to lenders that fund both in 24–48 hours,
              soft-pull first.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=other"
                className="btn btn--primary btn--lg"
              >
                See my funding options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Two-question fit (no credit pull)
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION: FAQ ============================================= */}
        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">Frequently asked questions.</h2>
            <dl className="product-faq">
              {faqs.map((item) => (
                <div key={item.q} className="product-faq-row">
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* SECTION: SOURCES ========================================= */}
        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Methodology and sources</span>
            <h2 className="ins-hero-title">Where the numbers come from.</h2>
            <p className="ins-hero-sub">
              Card discount, network, fee, and credit-type data were
              sourced from each issuer&rsquo;s product page (May 2026)
              and supplemented with independent reviews when an issuer
              does not publish a fee schedule. We focused only on cards
              designed for freight fueling; retail loyalty programs were
              excluded.
            </p>
            <ul className="product-list">
              <li>
                <a
                  href="https://www.wexinc.com/products/fuel-cards-fleet/"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  WEX — Fleet Cards overview
                </a>{" "}
                — discount tiers, product structure.
              </li>
              <li>
                <a
                  href="https://www.atob.com/discounts"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  AtoB — Fuel Discounts
                </a>{" "}
                — H2 2025 average, partner truck stop network, Mastercard
                acceptance.
              </li>
              <li>
                <a
                  href="https://www.businessfleetsolutions.com/fuel-card/shell-card-business/"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  Shell Card Business
                </a>{" "}
                — 6¢/gal rebate, no gallon cap, fee structure (Shell vs
                Flex).
              </li>
              <li>
                <a
                  href="https://www.rtsinc.com/product/fuel-discount-program"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  RTS Financial — Fuel Discount Program
                </a>{" "}
                — Pilot Flying J and One9 network, factoring bundle terms.
              </li>
              <li>
                <a
                  href="https://www.tcsfuel.com/"
                  rel="nofollow noopener"
                  target="_blank"
                >
                  TCS Fuel Card
                </a>{" "}
                — cost-plus model, Q1 2026 average savings, in-network vs
                out-of-network fee structure.
              </li>
              <li>
                <a
                  href="https://www.eia.gov/petroleum/gasdiesel/"
                  rel="noopener"
                  target="_blank"
                >
                  U.S. Energy Information Administration — Gasoline and
                  Diesel Fuel Update
                </a>{" "}
                — on-highway diesel pump price benchmarks.
              </li>
            </ul>
            <p className="product-hero-note">
              Estimates only. Actual savings depend on your fueling
              pattern, volume, route, and the specific stations you use.
              Rebate and discount programs change frequently; verify
              current terms with the issuer before signing. Dispatched
              does not issue fuel cards. Dispatched may have a partner
              relationship with one or more issuers listed; partner
              relationships do not change the methodology above. Not
              financial advice.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
