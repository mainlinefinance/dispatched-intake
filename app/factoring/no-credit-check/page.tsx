import { contentDates } from "@/lib/seo/contentDates";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/landing/Footer";
import Nav from "@/components/landing/Nav";
import {
  JsonLd,
  article,
  breadcrumbList,
  faqPage,
  financialProduct,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Broker-Credit Factoring for Truckers | Dispatched",
  description:
    "How freight factors underwrite the brokers who owe your invoices, what they still review about the carrier, and how weak credit or new authority is treated.",
  alternates: {
    canonical: "/factoring/no-credit-check",
  },
  openGraph: {
    images: ["/opengraph-image"],
    title: "Broker-Credit Factoring for Truckers | Dispatched",
    description:
      "How freight factors underwrite the brokers who owe your invoices, what they still review about the carrier, and how weak credit or new authority is treated.",
    url: "/factoring/no-credit-check",
    type: "website",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Broker-Credit Factoring for Truckers | Dispatched",
    description:
      "How freight factors underwrite the brokers who owe your invoices, what they still review about the carrier, and how weak credit or new authority is treated.",
  },
};

const PAGE_URL =
  "https://dispatched.finance/factoring/no-credit-check";

const faqs = [
  {
    q: "Do trucking factoring companies check my personal credit?",
    a: "It depends on the factor. Factoring companies underwrite mainly on the broker who owes the invoice, because that is where most of the credit risk sits. Many still review the carrier: fraud history, active bankruptcies, and sometimes a soft pull, which does not affect your score. Each factor sets its own requirements, and approval is not guaranteed.",
  },
  {
    q: "Can I get freight factoring with bad credit?",
    a: "Sometimes. Operators with lower credit profiles do use factoring, because factors weigh broker credit most heavily. Your own profile can still affect whether a factor takes the account and at what rate, which may be 0.5–1% higher than for operators with strong credit. Requirements are set by each factor, and approval is not guaranteed.",
  },
  {
    q: "What if I have a prior bankruptcy?",
    a: "A resolved bankruptcy is not always a disqualifier, because the factor is buying invoices rather than lending. Active proceedings usually are. Factors ask about bankruptcies at onboarding and each decides for itself; approval is not guaranteed.",
  },
  {
    q: "How is this different from \"no credit check\" truck loans?",
    a: "\"No credit check truck loans\" usually refer to predatory lease-purchase programs run by carriers — high failure rates, no equity built. Factoring is a mainstream product in trucking that underwrites mainly on broker credit and still reviews the carrier. Different mechanism, different risk profile, different outcomes.",
  },
  {
    q: "Do I need to factor every load once I sign up?",
    a: "Depends on the contract. Some factors require all loads from approved brokers go through them (\"all-in\" or whole-ledger factoring); others allow you to factor selectively (\"spot factoring\"). The Dispatched panel includes both structures — pick based on whether you want simplicity or flexibility.",
  },
  {
    q: "What's the catch with broker-credit factoring?",
    a: "The catch is rate. Factoring runs 1.5% to 5% per invoice; recourse factoring with broker credit pulled is at the lower end, non-recourse without broker credit is at the higher end. There's also the contract trap — many factors require 12-month auto-renewal. Read the exit clause before signing.",
  },
  {
    q: "When does the first invoice fund after signing up?",
    a: "Setup comes first (account, broker verification, first invoice review). After that, advance timing depends on the factor and your invoices; each factor publishes its own cutoffs and payout options.",
  },
];

export default function NoCreditCheckFactoringPage() {
  const { published, modified: today } = contentDates("app/factoring/no-credit-check/page.tsx");
  return (
    <div className="landing">
      <JsonLd
        payload={breadcrumbList([
          { name: "Home", url: "https://dispatched.finance/" },
          {
            name: "Invoice factoring for truckers",
            url: "https://dispatched.finance/factoring",
          },
          { name: "Broker-credit factoring", url: PAGE_URL },
        ])}
      />
      <JsonLd
        payload={article({
          headline: "Trucking factoring that underwrites your brokers",
          description:
            "How freight factoring weighs broker credit, what factors still review about the carrier, and how weak credit, new authority, and a prior bankruptcy are treated.",
          url: PAGE_URL,
          datePublished: published,
          dateModified: today,
        })}
      />
      <JsonLd
        payload={financialProduct({
          name: "Broker-credit trucking factoring",
          description:
            "Freight factoring underwritten mainly on the credit of the brokers who owe the invoices. Factors still review the carrier, and approval is not guaranteed. Rates 1.5%–5% per invoice; timing depends on the factor and your invoices.",
          url: PAGE_URL,
          category: "Invoice factoring",
        })}
      />
      <JsonLd payload={faqPage(faqs)} />

      <Nav />

      <main id="main-content" className="ins-page product-page">
        <section className="ins-hero product-hero">
          <div className="ins-container">
            <span className="ins-eyebrow">Broker-credit factoring</span>
            <h1 className="ins-hero-title">
              Trucking factoring that underwrites your brokers.
            </h1>
            <p className="ins-hero-sub">
              Freight factors underwrite mainly on the broker who owes the invoice. This is what people usually mean when they search for &ldquo;no credit check&rdquo; factoring &mdash; though many factors still review the carrier, and approval is not guaranteed. Here&rsquo;s how it actually works.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=factoring&creditPull=soft"
                className="btn btn--primary btn--lg"
              >
                See factoring options →
              </Link>
              <Link href="#recourse" className="btn btn--secondary btn--lg">
                Compare recourse vs. non-recourse →
              </Link>
            </div>
            <p className="product-hero-note">
              Soft pull only · Approval is not guaranteed.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">
              Why factoring is different from a loan
            </span>
            <h2 className="ins-hero-title">
              The credit check question, answered.
            </h2>
            <h3 className="ins-hero-sub">
              <strong>Factoring isn&rsquo;t borrowing — it&rsquo;s selling the invoice.</strong>
            </h3>
            <p className="ins-hero-sub">
              When you take a <Link href="/glossary/working-capital">working capital</Link> loan, the lender hands you
              cash and you owe it back with interest. Your personal
              credit profile is the underwriting question — it&rsquo;s how
              the lender prices the risk of getting repaid.{" "}
              <Link href="/factoring">
                Invoice factoring
              </Link>{" "}
              is structurally different. You&rsquo;re selling a paid
              load&rsquo;s receivable to a third party. The factor pays
              you 90%–97% of the invoice face value up front — the{" "}
              <Link href="/glossary/advance-rate">advance rate</Link> — and waits to
              collect the full amount from your broker on the broker&rsquo;s
              normal payment terms. There&rsquo;s no loan, no APR, no
              balance owed by you. The cash you got is yours.
            </p>
            <h3 className="ins-hero-sub">
              <strong>The factor looks first at the broker.</strong>
            </h3>
            <p className="ins-hero-sub">
              Because the broker is the entity actually paying the
              invoice, the broker&rsquo;s credit is what matters to the
              factor. Trucking factors keep internal credit files on
              every major broker in the country — DAT, Carrier411,
              broker-to-broker reference databases, payment history
              going back years. That is the main credit decision. Your own profile is a secondary input, not an irrelevant one.
            </p>
            <h3 className="ins-hero-sub">
              <strong>When a soft credit pull happens.</strong>
            </h3>
            <p className="ins-hero-sub">
              Many factors run a soft pull on the operator at
              onboarding. It is largely a fraud-prevention check — they want to see that you exist, that the SSN matches the
              business owner, that there&rsquo;s no active fraud alert.
              A soft pull does not affect your FICO and doesn&rsquo;t
              show up on the credit report lenders see. Even when a
              soft pull happens, operators with lower credit profiles
              may still be considered. Where a factor runs one, the pull is mainly a verification step; approval is not guaranteed.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Who qualifies</span>
            <h2 className="ins-hero-title">
              Who broker-credit factoring fits.
            </h2>
            <h3 className="ins-hero-sub">
              <strong>Operators with challenged credit.</strong>
            </h3>
            <p className="ins-hero-sub">
              Challenged credit is where most unsecured working-capital
              products start declining or pricing toward 30%+ APR.
              Factoring weighs it less: factors underwrite mainly on the broker behind the invoice, because that is where most of the credit risk sits. They still review the carrier, and approval is not guaranteed. If you&rsquo;ve
              been rejected for{" "}
              <Link href="/bad-credit-truck-financing">
                bad credit truck financing
              </Link>
              , factoring is a path many operators in that position look at.
            </p>
            <h3 className="ins-hero-sub">
              <strong>New authority operators (no business credit yet).</strong>
            </h3>
            <p className="ins-hero-sub">
              Most lenders want 6–24 months of operating history before
              they&rsquo;ll quote. Many factors do not. With an active MC# and a delivered load for a broker the factor recognizes, that invoice can be eligible. This is why factoring is often the first product for{" "}
              <Link href="/new-authority-truck-financing">
                new authority operators
              </Link>{" "}
              — and why{" "}
              <Link href="/owner-operator-financing/first-time">
                first-time owner-operators
              </Link>{" "}
              build their cashflow on factoring before any other
              product.
            </p>
            <h3 className="ins-hero-sub">
              <strong>Operators with prior bankruptcy or judgments.</strong>
            </h3>
            <p className="ins-hero-sub">
              A past Chapter 7 or Chapter 13 does not always disqualify you. Active proceedings usually do — a factor doesn&rsquo;t want to be in line behind a trustee — and after discharge each factor decides for itself. Same with
              old judgments and tax liens: they show up in onboarding
              diligence, and the factor will ask about them, but
              they&rsquo;re not always deal-breakers if the broker mix is clean.
            </p>
            <h3 className="ins-hero-sub">
              <strong>What most often blocks an account (broker credit, double-brokering history).</strong>
            </h3>
            <p className="ins-hero-sub">
              The two most common blockers are on the freight side. First, if your brokers have weak
              credit or are on factor blacklists, the factor
              can&rsquo;t take the receivable — the credit decision fails on the broker. Second, any history of
              double-brokering (taking a load and re-brokering it under
              the table) is a hard stop across the entire factoring
              industry. Factors share that data.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">How it works on the panel</span>
            <h2 className="ins-hero-title">
              From application to first funded load.
            </h2>
            <h3 className="ins-hero-sub">
              <strong>Onboarding — what&rsquo;s collected (no SSN required for the match).</strong>
            </h3>
            <p className="ins-hero-sub">
              The match step inside{" "}
              <Link href="/apply?useCase=factoring&creditPull=soft">
                /apply
              </Link>{" "}
              is intentionally lightweight: <Link href="/glossary/mc-number">MC number</Link>,{" "}
              <Link href="/glossary/dot-number">DOT number</Link>, the brokers you
              haul for, average invoice size, and monthly volume. No
              SSN required to see which factors fit. The factor itself
              collects identity documents at onboarding (MC authority,
              W-9, voided check, articles of organization), but the
              matching layer doesn&rsquo;t need your social just to
              show you options. Operators paid by broker via{" "}
              <Link href="/glossary/1099-nec">1099-NEC</Link> under standard{" "}
              <Link href="/glossary/independent-contractor-classification">independent contractor classification</Link>{" "}
              are the modal profile here. See{" "}
              <Link href="/qualify">/qualify</Link> if you want a
              two-question fit check first.
            </p>
            <h3 className="ins-hero-sub">
              <strong>First load funded — after setup clears.</strong>
            </h3>
            <p className="ins-hero-sub">
              After the factoring agreement is signed, the first
              invoice funds once setup clears. The
              gating items are broker verification (the factor
              confirms the broker has a good credit file and accepts
              factor relationships), filing of a <Link href="/glossary/ucc-1">UCC-1</Link> against
              your receivables, and the Notice of Assignment going
              out (the legal document that redirects the broker&rsquo;s
              payment to the factor). Once those clear, the first
              invoice advance hits your account by <Link href="/glossary/ach">ACH</Link>.
            </p>
            <h3 className="ins-hero-sub">
              <strong>Funding timing after that — set by the factor.</strong>
            </h3>
            <p className="ins-hero-sub">
              Once the relationship is live, advance timing depends on
              the factor and your invoices. Each factor has a daily
              submission cutoff, and late or weekend submissions roll
              to a later cycle. Ask for the payout schedule in writing before you sign.
            </p>
          </div>
        </section>

        <section id="recourse">
          <div className="ins-container">
            <span className="ins-eyebrow">Recourse vs non-recourse</span>
            <h2 className="ins-hero-title">
              Does the structure change the credit picture?
            </h2>
            <h3 className="ins-hero-sub">
              <strong>Recourse: factor checks broker credit; you eat losses if they don&rsquo;t pay.</strong>
            </h3>
            <p className="ins-hero-sub">
              In a <Link href="/glossary/recourse-factoring">recourse factoring</Link> contract, the factor still vets the
              broker, but you&rsquo;re the one on the hook if the
              broker goes insolvent before paying the invoice. The
              upside is rate — recourse factoring is the cheapest
              tier, typically 1.5%–3% per invoice. Most operators on
              the Dispatched panel pick recourse because they already
              know their broker mix and are comfortable with the
              risk.
            </p>
            <h3 className="ins-hero-sub">
              <strong>Non-recourse: factor takes the credit risk; rate is 0.5–1% higher.</strong>
            </h3>
            <p className="ins-hero-sub">
              In a <Link href="/glossary/non-recourse-factoring">non-recourse factoring</Link> contract, the factor absorbs the loss
              if the broker goes bankrupt. You walk away clean even
              when the receivable doesn&rsquo;t collect. The trade-off
              is the fee — non-recourse runs 0.5%–1% higher than
              recourse on the same invoice. Important caveat:
              non-recourse usually only covers credit failures (broker
              insolvency), not disputes. If the broker refuses to pay
              because they claim the load was damaged, that&rsquo;s a
              dispute, not a credit failure — and you&rsquo;re still
              responsible.
            </p>
            <h3 className="ins-hero-sub">
              <strong>When non-recourse is worth it (small fleet, sketchy broker mix).</strong>
            </h3>
            <p className="ins-hero-sub">
              Non-recourse is worth the premium when you&rsquo;re a
              small fleet that can&rsquo;t absorb a single
              bad-broker hit, or when your lane mix forces you onto
              brokers with thin credit files — common when most loads
              come off a public{" "}
              <Link href="/glossary/load-board">load board</Link> rather
              than a stable contracted lane. If one broker insolvency
              would wipe out your operating cash, the extra 0.5–1%
              is cheap insurance. If you&rsquo;re running primarily
              with top-credit brokers (the kind every factor wants
              receivables on), recourse is the right call.
            </p>
          </div>
        </section>

        <section className="ins-sunken">
          <div className="ins-container">
            <span className="ins-eyebrow">Honest tradeoffs</span>
            <h2 className="ins-hero-title">
              The real cost of factoring.
            </h2>
            <h3 className="ins-hero-sub">
              <strong>Rates run 1.5–5%, higher than working-capital APRs equivalent.</strong>
            </h3>
            <p className="ins-hero-sub">
              A 3% factoring fee on a Net-30 invoice is roughly
              equivalent to a 36%+ effective APR if you ran the same
              cashflow through a working-capital line. Factoring
              isn&rsquo;t cheap — you&rsquo;re paying for earlier access to your receivables, for broker-credit underwriting, and for not putting debt on
              your books. For operators who can qualify for clean
              working-capital pricing, that&rsquo;s the cheaper path.
              For operators who can&rsquo;t, factoring is often the realistic alternative.
            </p>
            <h3 className="ins-hero-sub">
              <strong>Some factors require minimum monthly volume.</strong>
            </h3>
            <p className="ins-hero-sub">
              Whole-ledger factors usually want $20K–$50K in monthly
              factored volume to make the relationship worth their
              ops cost. If you&rsquo;re running 1 truck and 2 loads a
              week, you may be too small for the cheapest tier.
              Spot-factoring shops on the panel exist for that
              segment, but their per-invoice fees are higher.
            </p>
            <h3 className="ins-hero-sub">
              <strong>Contract length and exit clauses (auto-renewal traps).</strong>
            </h3>
            <p className="ins-hero-sub">
              The single biggest landmine in factoring contracts is
              the auto-renewal clause. Standard contracts run 12
              months and auto-renew for another 12 unless you give
              30–90 days written notice in a specific window. Miss
              the window, and you&rsquo;re locked in for another
              year — including early-termination fees that can run
              $5K–$25K. Read the exit clause before you sign. Ask
              every factor: what&rsquo;s the notice window, what&rsquo;s
              the early-term fee, and is the auto-renewal optional.
            </p>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">FAQ</span>
            <h2 className="ins-hero-title">
              Broker-credit trucking factoring — questions.
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
            <h2 className="ins-hero-title">
              See your factoring options with a soft pull.
            </h2>
            <p className="ins-hero-sub">
              Soft-pull match. Factors underwrite mainly on your brokers and may still review you; approval is not guaranteed.
            </p>
            <div className="product-hero-ctas">
              <Link
                href="/apply?useCase=factoring&creditPull=soft"
                className="btn btn--primary btn--lg"
              >
                See factoring options →
              </Link>
              <Link href="/qualify" className="btn btn--secondary btn--lg">
                Or check my fit first →
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="ins-container">
            <span className="ins-eyebrow">Related</span>
            <ul className="product-related">
              <li>
                <Link href="/factoring">
                  Invoice factoring for truckers (parent) →
                </Link>
              </li>
              <li>
                <Link href="/bad-credit-truck-financing">
                  Bad credit truck financing →
                </Link>
              </li>
              <li>
                <Link href="/new-authority-truck-financing">
                  New authority truck financing →
                </Link>
              </li>
              <li>
                <Link href="/owner-operator-financing/first-time">
                  First-time owner-operator financing →
                </Link>
              </li>
              <li>
                <Link href="/methodology">
                  How we describe rates and fees →
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
