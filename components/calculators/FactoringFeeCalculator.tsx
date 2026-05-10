"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrowRight, IconLock } from "@/components/landing/icons";
import { formatMoney, parseDollars } from "@/lib/format";
import {
  computeFactoringFee,
  type RecourseType,
} from "@/lib/factoringFee";

/* Factoring fee calculator. Unlike the equipment-loan calculator (which
   gates the result behind a submit phase), this one recomputes on every
   keystroke and renders the result inline. Rationale: there are five
   numeric inputs and zero qualifying decisions — the user is exploring
   trade-offs (raise the advance, shorten the days, swap recourse type)
   and benefits from seeing the effective APR update live.

   Pure math lives in lib/factoringFee.ts. This file is the form shell:
   state, validation, layout, copy. Visual classes mirror EquipmentLoan
   so the two calculators read as a family. */

/* Form bounds. Kept here rather than in lib/factoringFee.ts because they
   describe the UI input space, not the math — the math accepts anything
   numeric. If we ever surface this calculator on a different page (e.g.
   inside a comparison tool), the bounds may shift. */
const RATE_MIN = 0.5;
const RATE_MAX = 7;
const ADVANCE_MIN = 80;
const ADVANCE_MAX = 100;
const DAYS_MIN = 1;
const DAYS_MAX = 90;
const INVOICE_MIN = 100;

/* Defaults pin to the median lead profile: a $5k linehaul invoice on
   net-30 terms with a 95% advance at the panel-median 3% rate. */
const DEFAULTS = {
  invoiceAmount: 5_000,
  ratePer30Days: 3,
  advancePercent: 95,
  daysOutstanding: 30,
  recourseType: "recourse" as RecourseType,
};

function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function parseNumber(raw: string, fallback: number): number {
  const n = Number(raw);
  if (Number.isNaN(n)) return fallback;
  return n;
}

export default function FactoringFeeCalculator() {
  /* Invoice amount is text-typed so we can pretty-print commas without
     fighting the browser's number input. Other fields stay as <input
     type="number"> with native step controls — they have small ranges
     and benefit from the native UI. */
  const [invoice, setInvoice] = useState<string>(
    DEFAULTS.invoiceAmount.toLocaleString("en-US"),
  );
  const [rate, setRate] = useState<string>(String(DEFAULTS.ratePer30Days));
  const [advance, setAdvance] = useState<string>(
    String(DEFAULTS.advancePercent),
  );
  const [days, setDays] = useState<string>(String(DEFAULTS.daysOutstanding));
  const [recourse, setRecourse] = useState<RecourseType>(DEFAULTS.recourseType);

  /* Derive valid inputs by clamping at compute time. The visible input
     shows the raw user text (so they can briefly hold an out-of-range
     value mid-edit) but the result panel always reflects clamped values.
     This is intentional: results never go NaN, never show negatives from
     a stray minus, never blow up the layout. */
  const results = useMemo(() => {
    const invoiceAmount = Math.max(
      INVOICE_MIN,
      parseDollars(invoice) || INVOICE_MIN,
    );
    const ratePer30Days = clamp(
      parseNumber(rate, DEFAULTS.ratePer30Days),
      RATE_MIN,
      RATE_MAX,
    );
    const advancePercent = clamp(
      parseNumber(advance, DEFAULTS.advancePercent),
      ADVANCE_MIN,
      ADVANCE_MAX,
    );
    const daysOutstanding = clamp(
      Math.round(parseNumber(days, DEFAULTS.daysOutstanding)),
      DAYS_MIN,
      DAYS_MAX,
    );
    return computeFactoringFee({
      invoiceAmount,
      ratePer30Days,
      advancePercent,
      daysOutstanding,
      recourseType: recourse,
    });
  }, [invoice, rate, advance, days, recourse]);

  return (
    <div className="calc-form-wrap-inner">
      <form
        className="calc-form"
        onSubmit={(e) => e.preventDefault()}
        aria-describedby="factoring-result-heading"
      >
        <div className="calc-steps">
          5 INPUTS · NO SIGNUP · NO CREDIT CHECK
        </div>

        <div className="field">
          <label htmlFor="invoice-amount">Invoice amount</label>
          <div className="calc-input-prefix">
            <span aria-hidden="true">$</span>
            <input
              id="invoice-amount"
              className="input"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 5,000"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              aria-describedby="invoice-amount-hint"
            />
          </div>
          <p id="invoice-amount-hint" className="calc-field-hint">
            Face value of the load invoice. Most linehaul invoices run
            $1,500 – $8,000.
          </p>
        </div>

        <div className="field">
          <label htmlFor="rate">Factoring rate per 30 days (%)</label>
          <input
            id="rate"
            className="input"
            type="number"
            inputMode="decimal"
            min={RATE_MIN}
            max={RATE_MAX}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            aria-describedby="rate-hint"
          />
          <p id="rate-hint" className="calc-field-hint">
            Panel median is ~3%. Spot factoring runs higher; long-term
            contracts run lower.
          </p>
        </div>

        <div className="field">
          <label htmlFor="advance">Advance rate (%)</label>
          <input
            id="advance"
            className="input"
            type="number"
            inputMode="numeric"
            min={ADVANCE_MIN}
            max={ADVANCE_MAX}
            step={1}
            value={advance}
            onChange={(e) => setAdvance(e.target.value)}
            aria-describedby="advance-hint"
          />
          <p id="advance-hint" className="calc-field-hint">
            What the factor wires within 24 hours. Typical range is 90 – 97%.
          </p>
        </div>

        <div className="field">
          <label htmlFor="days">Days outstanding</label>
          <input
            id="days"
            className="input"
            type="number"
            inputMode="numeric"
            min={DAYS_MIN}
            max={DAYS_MAX}
            step={1}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            aria-describedby="days-hint"
          />
          <p id="days-hint" className="calc-field-hint">
            Days from upload to broker payment. Net-30 is standard;
            slower brokers stretch to 45 – 60.
          </p>
        </div>

        <div className="field">
          <label htmlFor="recourse">Recourse type</label>
          <select
            id="recourse"
            className="select"
            value={recourse}
            onChange={(e) =>
              setRecourse(e.target.value as RecourseType)
            }
            aria-describedby="recourse-hint"
          >
            <option value="recourse">Recourse</option>
            <option value="non-recourse">Non-recourse</option>
          </select>
          <p id="recourse-hint" className="calc-field-hint">
            {recourse === "non-recourse"
              ? "Non-recourse adds ~0.5% to the headline rate as broker-default insurance. Bump the rate above by 0.5% to model the all-in cost."
              : "Recourse is the default — you owe the factor back if the broker doesn't pay."}
          </p>
        </div>
      </form>

      <div
        className="calc-result"
        role="region"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="calc-eyebrow">Estimated cost of factoring this invoice</div>
        <h2 id="factoring-result-heading" className="calc-primary-title">
          {formatMoney(Math.round(results.factorFee))} fee ·{" "}
          {results.effectiveAnnualizedRate.toFixed(1)}% effective APR
        </h2>
        <p className="calc-primary-rationale">
          Fee shown is what the factor keeps; effective APR annualizes it
          against the cash you actually had at risk (the advance). That&rsquo;s
          the number you compare against a working-capital line.
        </p>

        <div className="calc-meta">
          <div>
            <span className="calc-meta-label">Factoring fee</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(results.factorFee))}
            </span>
            <span className="calc-meta-explainer">
              Invoice × rate × (days ÷ 30). What the factor keeps for fronting
              you the cash.
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Advance amount</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(results.advanceAmount))}
            </span>
            <span className="calc-meta-explainer">
              Wired to you within 24 hours of invoice upload.
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Hold-back / reserve</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(results.reserveAmount))}
            </span>
            <span className="calc-meta-explainer">
              Held by the factor until the broker pays. Released net of the fee.
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Net on broker pay</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(results.netToCarrierOnBrokerPay))}
            </span>
            <span className="calc-meta-explainer">
              Reserve minus fee. Most factors deduct the fee from the reserve
              when the broker pays.
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Effective annualized rate</span>
            <span className="calc-meta-value mono">
              {results.effectiveAnnualizedRate.toFixed(2)}%
            </span>
            <span className="calc-meta-explainer">
              (Fee ÷ advance) × (365 ÷ days). Compare this to a working-capital
              APR.
            </span>
          </div>
        </div>

        <p className="calc-illustrative-note">
          Estimate based on your inputs. Real contracts can include ACH fees,
          fuel-advance fees, minimum-volume tiers, and broker-credit screening
          terms not modeled here. See{" "}
          <Link href="/methodology">methodology</Link> and{" "}
          <Link href="/disclosures">disclosures</Link>.
        </p>

        <Link
          href="/invoice-factoring-for-truckers"
          className="btn btn--primary calc-cta"
        >
          See factoring options
          <IconArrowRight />
        </Link>

        <div className="calc-foot">
          <IconLock />
          <span>
            Zero credit impact at this step. We do not collect, store, or share
            any of these inputs.
          </span>
        </div>
      </div>
    </div>
  );
}
