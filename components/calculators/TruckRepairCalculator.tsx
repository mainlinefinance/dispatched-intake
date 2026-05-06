"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { IconArrowRight, IconLock } from "@/components/landing/icons";

type Revenue = "" | "under-20" | "20-50" | "50-100" | "100-plus";
type Years = "" | "under 6 months" | "6–12 months" | "1–3 years" | "3+ years";
type Credit = "" | "below-580" | "580-619" | "620-679" | "680-plus";
type Payback = "" | "under-6m" | "6-12m" | "12-24m" | "24m-plus";

type FitProduct = {
  name: string;
  primary: boolean;
  rationale: string;
  href: string;
};

type Result = {
  products: FitProduct[];
  apr: string;
  payback: string;
};

const REVENUE_MID: Record<Exclude<Revenue, "">, number> = {
  "under-20": 15_000,
  "20-50": 35_000,
  "50-100": 75_000,
  "100-plus": 150_000,
};

const YEARS_SCORE: Record<Exclude<Years, "">, number> = {
  "under 6 months": 1,
  "6–12 months": 2,
  "1–3 years": 3,
  "3+ years": 4,
};

const CREDIT_APR: Record<Exclude<Credit, "">, string> = {
  "680-plus": "9% – 18% APR",
  "620-679": "12% – 24% APR",
  "580-619": "18% – 30% APR",
  "below-580": "22% – 34% APR",
};

const PAYBACK_LABEL: Record<Exclude<Payback, "">, string> = {
  "under-6m": "under 6 months",
  "6-12m": "6 – 12 months",
  "12-24m": "12 – 24 months",
  "24m-plus": "24+ months",
};

/* The calculator is a fit estimator, not a payment calculator and not an
   underwriting decision. Output is which Dispatched product categories
   the user fits given the repair amount and their operator profile. APR
   bands are observed panel ranges (same as /qualify and the FAQ); see
   /methodology#finance-rates. */
function computeFit(
  repairAmount: number,
  revenue: Exclude<Revenue, "">,
  years: Exclude<Years, "">,
  credit: Exclude<Credit, "">,
  payback: Exclude<Payback, "">,
): Result {
  const revenueMid = REVENUE_MID[revenue];
  const yrsScore = YEARS_SCORE[years];
  const strain = repairAmount / revenueMid; // months of revenue to cover the repair
  const products: FitProduct[] = [];

  // Repair financing — the topical product, always relevant.
  products.push({
    name: "Truck repair financing",
    primary: strain <= 1.5 || yrsScore < 3,
    rationale:
      "Direct-to-shop financing for the specific repair amount. Pay back over the chosen term.",
    href: "/apply?product=repair",
  });

  // Working capital — fits when the repair is a manageable percent of
  // operating cashflow and the operator has a track record.
  if (strain <= 0.8 && yrsScore >= 2) {
    products.push({
      name: "Working capital",
      primary: false,
      rationale:
        "Use a working-capital line to cover the repair plus operating expenses. Repay from receivables.",
      href: "/apply?product=working-capital",
    });
  }

  // Equipment financing — secured by the repaired truck. Best for big
  // repairs on established operators.
  if (yrsScore >= 3 && repairAmount >= 15_000) {
    products.push({
      name: "Equipment financing",
      primary: strain > 1.5,
      rationale:
        "Secured by the repaired truck. Longer payback term than a repair loan, lower monthly payment.",
      href: "/apply?product=equipment",
    });
  }

  return {
    products,
    apr: CREDIT_APR[credit],
    payback: PAYBACK_LABEL[payback],
  };
}

export default function TruckRepairCalculator() {
  const [submitted, setSubmitted] = useState(false);
  const [repairAmount, setRepairAmount] = useState("");
  const [revenue, setRevenue] = useState<Revenue>("");
  const [years, setYears] = useState<Years>("");
  const [credit, setCredit] = useState<Credit>("");
  const [payback, setPayback] = useState<Payback>("");

  const repairAmountNum = Number(repairAmount.replace(/[^0-9]/g, ""));
  const canSubmit =
    repairAmountNum >= 1_000 &&
    revenue !== "" &&
    years !== "" &&
    credit !== "" &&
    payback !== "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) setSubmitted(true);
  };

  if (submitted) {
    const result = computeFit(
      repairAmountNum,
      revenue as Exclude<Revenue, "">,
      years as Exclude<Years, "">,
      credit as Exclude<Credit, "">,
      payback as Exclude<Payback, "">,
    );
    const primary =
      result.products.find((p) => p.primary) ?? result.products[0];
    const others = result.products.filter((p) => p !== primary);

    return (
      <div className="calc-result" data-illustrative="true">
        <div className="calc-eyebrow">Estimated fit</div>
        <h2 className="calc-primary-title">{primary.name}</h2>
        <p className="calc-primary-rationale">{primary.rationale}</p>

        {others.length > 0 ? (
          <>
            <div className="calc-also">Also fits</div>
            <ul className="calc-also-list">
              {others.map((p) => (
                <li key={p.name}>
                  <span className="calc-fit-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <strong>{p.name}.</strong> {p.rationale}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <div className="calc-meta">
          <div>
            <span className="calc-meta-label">Typical APR range</span>
            <span className="calc-meta-value mono">{result.apr}</span>
          </div>
          <div>
            <span className="calc-meta-label">Your payback target</span>
            <span className="calc-meta-value">{result.payback}</span>
          </div>
        </div>

        <p className="calc-illustrative-note">
          Estimate based on your inputs. APR bands are observed panel ranges,
          not guarantees — see{" "}
          <Link href="/methodology#finance-rates">methodology</Link>. The
          exact APR is set by the chosen lender on the term sheet and depends
          on your full application.
        </p>

        <Link href={primary.href} className="btn btn--primary calc-cta">
          See my funding options
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
    <form className="calc-form" onSubmit={handleSubmit}>
      <div className="calc-steps">
        5 INPUTS · NO CREDIT CHECK · NO PERSONAL INFO
      </div>

      <div className="field">
        <label htmlFor="repair-amount">
          Repair amount <span aria-hidden="true" className="req">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <div className="calc-input-prefix">
          <span aria-hidden="true">$</span>
          <input
            id="repair-amount"
            className="input"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 12,000"
            value={repairAmount}
            onChange={(e) => setRepairAmount(e.target.value)}
            required
          />
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
        <label htmlFor="years">
          Time in business <span aria-hidden="true" className="req">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="years"
          className="select"
          value={years}
          onChange={(e) => setYears(e.target.value as Years)}
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

      <div className="field">
        <label htmlFor="credit">
          Credit band <span aria-hidden="true" className="req">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="credit"
          className="select"
          value={credit}
          onChange={(e) => setCredit(e.target.value as Credit)}
          required
        >
          <option value="" disabled>
            Pick your range
          </option>
          <option value="below-580">Below 580</option>
          <option value="580-619">580 – 619</option>
          <option value="620-679">620 – 679</option>
          <option value="680-plus">680+</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="payback">
          Desired payback period{" "}
          <span aria-hidden="true" className="req">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="payback"
          className="select"
          value={payback}
          onChange={(e) => setPayback(e.target.value as Payback)}
          required
        >
          <option value="" disabled>
            How long do you want to pay this back?
          </option>
          <option value="under-6m">Under 6 months</option>
          <option value="6-12m">6 – 12 months</option>
          <option value="12-24m">12 – 24 months</option>
          <option value="24m-plus">24+ months</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn--primary calc-cta"
        disabled={!canSubmit}
      >
        Estimate my fit
        <IconArrowRight />
      </button>

      <div className="calc-foot">
        <IconLock />
        <span>
          Zero credit impact at this step. We do not collect or share any of
          these inputs.
        </span>
      </div>
    </form>
  );
}
