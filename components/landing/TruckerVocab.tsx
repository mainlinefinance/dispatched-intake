/* Domain-literacy band that sits between the hero and the offer cards.
   Says, in seven words, that we know what trucking actually means — DOT
   numbers, ELD miles, settlement statements, factoring agreements, repair
   shops, fuel float, broker delays. Lighter visual weight than the
   .brand-callout in DeclineSection so it reads as a wordmark band, not
   another card. */

const terms: string[] = [
  "DOT numbers",
  "ELD miles",
  "Settlement statements",
  "Factoring agreements",
  "Repair shops",
  "Fuel float",
  "Broker delays",
];

export default function TruckerVocab() {
  return (
    <section className="trucker-vocab" aria-label="Terms we work with">
      <div className="container">
        <span className="trucker-vocab-eyebrow">We understand</span>
        <ul className="trucker-vocab-list">
          {terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
