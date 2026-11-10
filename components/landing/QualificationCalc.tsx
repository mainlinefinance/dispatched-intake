"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import HdyhauSurvey from "@/components/hdyhau/HdyhauSurvey";
import {
  MONTHLY_REVENUE_OPTIONS,
  TIME_IN_BUSINESS_OPTIONS,
  applyHrefWithAnswers,
  type MonthlyRevenue,
  type TimeInBusiness,
} from "@/lib/quickStart";
import { IconArrowRight, IconLock } from "./icons";
import { APPLY_HREF, CTA_LABEL } from "./cta";

type Revenue = "" | MonthlyRevenue;
type Years = "" | TimeInBusiness;

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
  // Both option lists run low to high, so position is the score: 1–4, and 0
  // for an unanswered question.
  const revScore =
    MONTHLY_REVENUE_OPTIONS.findIndex((o) => o.value === rev) + 1;
  const yrsScore =
    TIME_IN_BUSINESS_OPTIONS.findIndex((o) => o.value === yrs) + 1;
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

        <Link
          href={applyHrefWithAnswers(APPLY_HREF, {
            monthlyRevenue: revenue || null,
            timeInBusiness: yrs || null,
          })}
          className="btn btn--primary qual-cta"
        >
          {CTA_LABEL}
          <IconArrowRight />
        </Link>

        <HdyhauSurvey source="qualify" />

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
          <div className="qual-steps">2 QUESTIONS · NO CREDIT PULL</div>
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
          {MONTHLY_REVENUE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
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
          {TIME_IN_BUSINESS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
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
