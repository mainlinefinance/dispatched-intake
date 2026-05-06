import type { ReactNode } from "react";

type DeclineReason = {
  num: string;
  title: string;
  why: string;
  reframe: ReactNode;
};

const declineReasons: DeclineReason[] = [
  {
    num: "01",
    title: "DSCR on two years of tax returns.",
    why: "Banks run debt-service-coverage on your last two 1040s. One slow quarter, a big truck repair, or a write-off year — the formula spits you out even when the business is healthy.",
    reframe: (
      <>
        <strong>Our lenders look at ELD miles and settlement statements</strong>
        , not just the return. They underwrite the freight the truck is
        actually moving.
      </>
    ),
  },
  {
    num: "02",
    title: "Sole-prop doesn't fit their forms.",
    why: "Regional banks underwrite to W-2 balance sheets. A Schedule C with $180k net, a sole-prop EIN, and a truck on lien doesn't fit the commercial-lending workflow they were built for.",
    reframe: (
      <>
        <strong>Every lender on our panel funds 1099 and sole-prop borrowers.</strong>{" "}
        Owner-operator is the default, not the exception.
      </>
    ),
  },
  {
    num: "03",
    title: "Stacking declines compound the problem.",
    why: "A bank decline lands on your file as a negative mark. The next bank sees it, declines faster, and you lose two weeks per application chasing no's that were already predictable.",
    reframe: (
      <>
        <strong>One soft check. One application.</strong> We route to the
        lenders most likely to fund it — declines don&rsquo;t stack against you
        here.
      </>
    ),
  },
];

export default function DeclineSection() {
  return (
    <section className="section sunken">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Why this product exists</span>
          <h2>Banks weren&rsquo;t built for owner-operators.</h2>
          <p>
            Your revenue is real. The problem is that most bank forms
            don&rsquo;t understand freight. Three structural reasons banks say
            no to working owner-operators and small fleets — none of them
            about whether you can repay.
          </p>
        </div>
        <div className="decline-grid">
          {declineReasons.map((r) => (
            <div className="decline-card" key={r.num}>
              <span className="num">{r.num}</span>
              <h3>{r.title}</h3>
              <p className="why">{r.why}</p>
              <div className="reframe">{r.reframe}</div>
            </div>
          ))}
        </div>
        <aside className="brand-callout" aria-label="Dispatched underwriting principle">
          <span className="brand-callout-eyebrow">Underwriting principle</span>
          <p className="brand-callout-line">
            If the wheels are turning, the revenue is real.
          </p>
        </aside>
      </div>
    </section>
  );
}
