"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { IconArrowRight, IconLock } from "./icons";
import { CTA_LABEL } from "./Nav";

type Revenue = "" | "under-20" | "20-50" | "50-100" | "100-plus";
type Years = "" | "under 6 months" | "6–12 months" | "1–3 years" | "3+ years";

type Fit = {
  apr: string;
  products: string[];
};

/* The qualifier is a fit estimator, not an underwriting decision. We do not
   publish a "lenders on our panel" count here — that claim was stripped
   from the marketing surfaces in #37 and lives behind /methodology until
   the panel registry is published. The estimator returns:
     - an APR band (these are observed panel ranges, also shown in the FAQ)
     - the list of Dispatched product categories the borrower fits

   Equipment financing requires 1+ year in business; everyone else fits
   working capital + repair financing. */
function computeFit(rev: Revenue, yrs: Years): Fit {
  const revScore = { "under-20": 1, "20-50": 2, "50-100": 3, "100-plus": 4 }[
    rev as Exclude<Revenue, "">
  ] ?? 0;
  const yrsScore = {
    "under 6 months": 1,
    "6–12 months": 2,
    "1–3 years": 3,
    "3+ years": 4,
  }[yrs as Exclude<Years, "">] ?? 0;
  const tier = revScore + yrsScore;
  const apr =
    tier >= 7 ? "9% – 18% APR"
    : tier >= 5 ? "12% – 24% APR"
    : tier >= 3 ? "18% – 30% APR"
    : "22% – 34% APR";
  const products = ["Working capital", "Repair financing"];
  if (yrsScore >= 3) products.push("Equipment financing");
  return { apr, products };
}

export default function QualificationCalc() {
  const [submitted, setSubmitted] = useState(false);
  const [revenue, setRevenue] = useState<Revenue>("");
  const [yrs, setYrs] = useState<Years>("");

  const canSubmit = revenue !== "" && yrs !== "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) setSubmitted(true);
  };

  if (submitted) {
    const fit = computeFit(revenue, yrs);
    return (
      <div className="qual-result" id="qual" data-illustrative="true">
        <div className="estimated-label">Based on your answers</div>
        <div className="range">Good fit for</div>
        <ul className="qual-fit-list">
          {fit.products.map((p) => (
            <li key={p}>
              <span className="qual-fit-check" aria-hidden="true">✓</span>
              {p}
            </li>
          ))}
        </ul>
        <div className="range-sub">
          Typical APR range for borrowers with your profile:{" "}
          <span
            className="mono"
            style={{ color: "var(--color-ink-primary)" }}
          >
            {fit.apr}
          </span>
          . These are observed panel ranges — the exact APR is set by the
          chosen lender on the term sheet and depends on your full
          application. <Link href="/methodology#finance-rates">See methodology →</Link>
        </div>

        <p className="qual-dataflow-line">
          Your answers stay with us until you finish the application. Then a
          redacted profile (no name or contact) goes to the matched lenders.
          One hard pull only happens after you pick one.{" "}
          <Link href="/#how-it-works">See the full 5-step flow →</Link>
        </p>

        <p className="qual-foot qual-illustrative-note">
          Estimate based on your two answers. Final product fit and APR
          depend on your full application. For a repair-specific fit, try
          the{" "}
          <Link href="/calculators/truck-repair">
            truck repair calculator
          </Link>
          .
        </p>

        <Link href="/apply" className="btn btn--primary qual-cta">
          {CTA_LABEL}
          <IconArrowRight />
        </Link>

        <button
          type="button"
          className="back-link"
          onClick={() => setSubmitted(false)}
        >
          ← Change my answers
        </button>
      </div>
    );
  }

  return (
    <form className="qual" onSubmit={handleSubmit} id="qual">
      <div className="qual-header">
        <div>
          <div className="qual-steps">2 QUESTIONS · NO CREDIT CHECK</div>
          <div className="title">Check your funding fit.</div>
        </div>
        <div className="safe">
          <IconLock />
          No pull
        </div>
      </div>

      <div className="field">
        <label htmlFor="revenue">
          Monthly revenue <span aria-hidden="true" className="req">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="revenue"
          className="select"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value as Revenue)}
          required
        >
          <option value="" disabled>
            Pick a range
          </option>
          <option value="under-20">Under $20,000</option>
          <option value="20-50">$20,000 – $50,000</option>
          <option value="50-100">$50,000 – $100,000</option>
          <option value="100-plus">$100,000+</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="yrs">
          Time in business <span aria-hidden="true" className="req">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="yrs"
          className="select"
          value={yrs}
          onChange={(e) => setYrs(e.target.value as Years)}
          required
        >
          <option value="" disabled>
            How long have you been operating?
          </option>
          <option value="under 6 months">Under 6 months</option>
          <option value="6–12 months">6 – 12 months</option>
          <option value="1–3 years">1 – 3 years</option>
          <option value="3+ years">3+ years</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn--primary qual-cta"
        disabled={!canSubmit}
      >
        Show my fit
        <IconArrowRight />
      </button>

      <div className="qual-foot">
        <IconLock />
        <span>
          Zero credit impact at this step. No hard pull happens until you pick
          a specific lender later.
        </span>
      </div>
    </form>
  );
}
