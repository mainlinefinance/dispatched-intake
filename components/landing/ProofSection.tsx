type Proof = {
  state: string;
  who: string;
  useCase: string;
  amt: string;
  time: string;
  type: string;
};

const proofs: Proof[] = [
  {
    state: "TX",
    who: "Owner-op, 1 truck",
    useCase:
      "Engine rebuild on a 2019 Cascadia after a coolant failure outside Amarillo.",
    amt: "$65,000",
    time: "22 hrs",
    type: "Repair loan",
  },
  {
    state: "OH",
    who: "Fleet owner, 4 trucks",
    useCase:
      "Fuel float during a slow January before dedicated lanes kicked back in February.",
    amt: "$120,000",
    time: "31 hrs",
    type: "Working capital",
  },
  {
    state: "CA",
    who: "Owner-op, 1 truck",
    useCase:
      "Down payment on a used reefer trailer to pick up produce lanes out of Salinas.",
    amt: "$38,000",
    time: "41 hrs",
    type: "Equipment loan",
  },
  {
    state: "GA",
    who: "Fleet owner, 7 trucks",
    useCase:
      "Covering payroll after a broker default on a $92k receivable. Bank said no.",
    amt: "$90,000",
    time: "19 hrs",
    type: "Bridge capital",
  },
];

export default function ProofSection() {
  return (
    <section className="section" data-screen-label="04 Funded borrowers">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Funded this month</span>
          <h2>Real loans, real shops, real turnaround.</h2>
          <p>
            Borrower names anonymized. Loan amounts, use case, and timing are
            actual.
          </p>
        </div>
        <div className="proof-grid">
          {proofs.map((p, i) => (
            <div className="proof-card" key={i}>
              <div className="header">
                <span className="badge">Funded</span>
                <span className="state-tag">
                  {p.state} · {p.type}
                </span>
              </div>
              <div className="amt">{p.amt}</div>
              <h3>{p.who}</h3>
              <p className="use">{p.useCase}</p>
              <div className="foot">
                <span className="time">Funded in {p.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
