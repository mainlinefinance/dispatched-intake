export default function HeroDataFlow() {
  return (
    <div className="hero-dataflow">
      <div className="hdf-step">
        <span className="hdf-dot hdf-dot-steel">1</span>
        <span>
          <strong>Soft check</strong> — no credit pull
        </span>
      </div>
      <div className="hdf-arrow" aria-hidden="true">
        →
      </div>
      <div className="hdf-step">
        <span className="hdf-dot hdf-dot-steel">2</span>
        <span>
          <strong>3–5 matched lenders</strong> see a redacted profile
        </span>
      </div>
      <div className="hdf-arrow" aria-hidden="true">
        →
      </div>
      <div className="hdf-step">
        <span className="hdf-dot hdf-dot-hiviz">3</span>
        <span>
          <strong>You pick one.</strong> That lender pulls your credit
        </span>
      </div>
    </div>
  );
}
