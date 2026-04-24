"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { IconArrowRight, IconLock } from "./icons";
import { CTA_LABEL } from "./Nav";

type Revenue = "" | "under-20" | "20-50" | "50-100" | "100-plus";
type Years = "" | "under 6 months" | "6–12 months" | "1–3 years" | "3+ years";

type Match = { lenderCount: number; apr: string };

function computeMatch(rev: Revenue, yrs: Years): Match {
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
  if (tier >= 7) return { lenderCount: 18, apr: "9% – 18% APR" };
  if (tier >= 5) return { lenderCount: 14, apr: "12% – 24% APR" };
  if (tier >= 3) return { lenderCount: 9, apr: "18% – 30% APR" };
  return { lenderCount: 5, apr: "22% – 34% APR" };
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
    const match = computeMatch(revenue, yrs);
    return (
      <div className="qual-result" id="qual" data-illustrative="true">
        <div className="estimated-label">Based on your answers</div>
        <div className="range">
          {match.lenderCount} lenders on our panel will look at your file
        </div>
        <div className="range-sub">
          Typical APR range for borrowers with your profile:{" "}
          <span
            className="mono"
            style={{ color: "var(--color-ink-primary)" }}
          >
            {match.apr}
          </span>
          . Final APR depends on your credit pull and is set by the lender —
          not by us.
        </div>

        <p className="qual-dataflow-line">
          Your answers stay with us until you finish the application. Then a
          redacted profile (no name or contact) goes to up to 5 matched
          lenders. One hard pull only happens after you pick one.{" "}
          <a href="#how-it-works">See the full 5-step flow →</a>
        </p>

        <p className="qual-foot qual-illustrative-note">
          Estimate based on your two answers. Final lender count and APR
          depend on your full application.
        </p>

        <Link href="/apply" className="btn btn--primary qual-cta">
          Continue to application
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
          <div className="title">Two questions, no credit check.</div>
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
        {CTA_LABEL}
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
