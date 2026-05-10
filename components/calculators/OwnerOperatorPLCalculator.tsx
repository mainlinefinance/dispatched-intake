"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconArrowRight, IconLock } from "@/components/landing/icons";
import { formatMoney, parseDollars } from "@/lib/format";
import {
  computeOwnerOperatorPL,
  type PLInputs,
} from "@/lib/ownerOperatorPL";

/* The owner-operator P&L calculator is a weekly income estimator, not a
   tax calculator and not an accounting tool. It runs the pure-math
   weekly P&L equation on the user's eight inputs and returns weekly
   revenue, operating cost, net income, cost per total mile, and the two
   breakeven numbers (loaded miles, rate per mile).

   The math itself lives in lib/ownerOperatorPL.ts so it can be unit-
   tested in isolation. This file is the form shell: state, validation,
   layout, copy.

   Two design choices worth flagging:

   1) Eight inputs are grouped into four sections (Revenue, Variable
      costs, Fixed costs, Factoring). Each section is a fieldset for
      accessibility — screen readers announce the group label as the
      user tabs through. The factoring fieldset always renders the
      single percent field; only the result row hides when the user
      sets factoring to 0 (true "off" state).

   2) Numeric inputs use type="number" rather than the formatted-money
      text inputs used by EquipmentLoanCalculator. The numbers here are
      smaller and more varied (a $2.50 rate, a 6.5 mpg, a 3% factor
      fee) — formatting all of them as money would be misleading.
      Dollar fields still use parseDollars for resilience to pasted
      "$600" or "1,200" values; rate, mpg, deadhead, and factoring use
      Number() directly because they're plain decimals.

   No personal info is collected. No credit pull. */

const DEFAULTS: PLInputs = {
  ratePerMile: 2.5,
  loadedMilesPerWeek: 2_500,
  deadheadPercent: 15,
  fuelPricePerGallon: 3.8,
  mpg: 6.5,
  truckPaymentWeekly: 600,
  insuranceWeekly: 250,
  otherFixedWeekly: 200,
  factoringPercent: 3,
};

type FormState = {
  ratePerMile: string;
  loadedMilesPerWeek: string;
  deadheadPercent: string;
  fuelPricePerGallon: string;
  mpg: string;
  truckPaymentWeekly: string;
  insuranceWeekly: string;
  otherFixedWeekly: string;
  factoringPercent: string;
};

function toFormState(defaults: PLInputs): FormState {
  return {
    ratePerMile: String(defaults.ratePerMile),
    loadedMilesPerWeek: String(defaults.loadedMilesPerWeek),
    deadheadPercent: String(defaults.deadheadPercent),
    fuelPricePerGallon: String(defaults.fuelPricePerGallon),
    mpg: String(defaults.mpg),
    truckPaymentWeekly: String(defaults.truckPaymentWeekly),
    insuranceWeekly: String(defaults.insuranceWeekly),
    otherFixedWeekly: String(defaults.otherFixedWeekly),
    factoringPercent: String(defaults.factoringPercent),
  };
}

/* Parse a free-form decimal string (rate, mpg, percent) to a finite
   number. Empty / NaN / Infinity all resolve to 0 so the math module
   never sees an unsafe input. The form's min/max attributes constrain
   the realistic range; this is the defense-in-depth coercion. */
function parseDecimal(raw: string): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

type Phase = { kind: "form" } | { kind: "result"; resolved: PLInputs };

export default function OwnerOperatorPLCalculator() {
  const [phase, setPhase] = useState<Phase>({ kind: "form" });
  const [form, setForm] = useState<FormState>(() => toFormState(DEFAULTS));

  const ratePerMile = parseDecimal(form.ratePerMile);
  const loadedMilesPerWeek = parseDecimal(form.loadedMilesPerWeek);
  const deadheadPercent = parseDecimal(form.deadheadPercent);
  const fuelPricePerGallon = parseDecimal(form.fuelPricePerGallon);
  const mpg = parseDecimal(form.mpg);
  /* Weekly dollar fields go through parseDollars so a pasted "$600" or
     "1,200" still resolves. parseDollars discards cents, which is
     correct for the weekly-dollar inputs (the calculator models integer
     weekly costs — penny precision would be false precision). */
  const truckPaymentWeekly = parseDollars(form.truckPaymentWeekly);
  const insuranceWeekly = parseDollars(form.insuranceWeekly);
  const otherFixedWeekly = parseDollars(form.otherFixedWeekly);
  const factoringPercent = parseDecimal(form.factoringPercent);

  /* canSubmit guards every realistic edge case: rate, miles, fuel, mpg
     must be positive (a zero would render the result panel meaningless);
     fixed costs and factoring can be zero (a paid-off truck on a
     non-factored lane is a valid scenario). Deadhead is allowed at 0 —
     a perfectly utilized round-trip lane exists in principle even if
     it's rare in practice. */
  const canSubmit =
    ratePerMile > 0 &&
    loadedMilesPerWeek > 0 &&
    deadheadPercent >= 0 &&
    deadheadPercent < 100 &&
    fuelPricePerGallon > 0 &&
    mpg > 0 &&
    truckPaymentWeekly >= 0 &&
    insuranceWeekly >= 0 &&
    otherFixedWeekly >= 0 &&
    factoringPercent >= 0 &&
    factoringPercent < 100;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      setPhase({
        kind: "result",
        resolved: {
          ratePerMile,
          loadedMilesPerWeek,
          deadheadPercent,
          fuelPricePerGallon,
          mpg,
          truckPaymentWeekly,
          insuranceWeekly,
          otherFixedWeekly,
          factoringPercent,
        },
      });
    }
  };

  /* Move keyboard + SR focus to the result heading on transition (same
     pattern as EquipmentLoanCalculator). */
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (phase.kind === "result") {
      resultHeadingRef.current?.focus();
    }
  }, [phase.kind]);

  if (phase.kind === "result") {
    const r = computeOwnerOperatorPL(phase.resolved);
    const factoringEnabled = phase.resolved.factoringPercent > 0;
    /* breakevenLoadedMiles can legitimately be Infinity if the lane has
       zero or negative contribution per loaded mile — in that case the
       lane cannot breakeven at any volume, and the calculator should
       say so explicitly rather than render "Infinity miles". */
    const breakevenFeasible = Number.isFinite(r.breakevenLoadedMiles);

    return (
      <div className="calc-result" role="status" aria-live="polite">
        <div className="calc-eyebrow">Estimated weekly net income</div>
        <h2
          ref={resultHeadingRef}
          tabIndex={-1}
          className="calc-primary-title"
        >
          {formatMoney(Math.round(r.netIncomeWeekly))}/wk
        </h2>
        <p className="calc-primary-rationale">
          {formatMoney(Math.round(r.weeklyRevenue))} weekly revenue minus{" "}
          {formatMoney(Math.round(r.totalOperatingCostWeekly))} in operating
          costs. Annualized at 50 working weeks:{" "}
          {formatMoney(Math.round(r.annualizedNet))} pre-tax. Real take-home
          is meaningfully lower after federal / self-employment tax,
          depreciation, and irregular expenses — see below.
        </p>

        <div className="calc-meta">
          <div>
            <span className="calc-meta-label">Weekly revenue</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(r.weeklyRevenue))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Total miles / week</span>
            <span className="calc-meta-value mono">
              {Math.round(r.totalMilesPerWeek).toLocaleString("en-US")}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Fuel cost / week</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(r.fuelCostWeekly))}
            </span>
          </div>
          {factoringEnabled ? (
            <div>
              <span className="calc-meta-label">Factoring fee / week</span>
              <span className="calc-meta-value mono">
                {formatMoney(Math.round(r.factoringFeeWeekly))}
              </span>
            </div>
          ) : null}
          <div>
            <span className="calc-meta-label">Fixed costs / week</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(r.totalFixedWeekly))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Total op cost / week</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(r.totalOperatingCostWeekly))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Cost per total mile</span>
            <span className="calc-meta-value mono">
              ${r.costPerTotalMile.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Annualized net (× 50)</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(r.annualizedNet))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Breakeven loaded miles / wk</span>
            <span className="calc-meta-value mono">
              {breakevenFeasible
                ? Math.round(r.breakevenLoadedMiles).toLocaleString("en-US")
                : "Not viable"}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Breakeven rate / mile</span>
            <span className="calc-meta-value mono">
              ${r.breakevenRatePerMile.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="calc-illustrative-note">
          Estimate based on your inputs. Pre-tax, pre-depreciation, pre-
          irregular-expense. Sustainable owner-ops run 20%+ above breakeven
          for cushion. See <Link href="/methodology">methodology</Link> for
          how we describe these numbers.
        </p>

        <Link
          href="/owner-operator-financing"
          className="btn btn--primary calc-cta"
        >
          See owner-operator financing
          <IconArrowRight />
        </Link>

        <button
          type="button"
          className="back-link"
          onClick={() => setPhase({ kind: "form" })}
        >
          ← Change my answers
        </button>
      </div>
    );
  }

  return (
    <form className="calc-form" onSubmit={handleSubmit}>
      <div className="calc-steps">
        8 INPUTS · NO CREDIT CHECK · NO PERSONAL INFO
      </div>

      <fieldset className="calc-fieldset">
        <legend className="calc-legend">Revenue</legend>

        <div className="field">
          <label htmlFor="rate-per-mile">
            Average rate per mile{" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <div className="calc-input-prefix">
            <span aria-hidden="true">$</span>
            <input
              id="rate-per-mile"
              className="input"
              type="number"
              inputMode="decimal"
              min={0.5}
              max={6}
              step={0.05}
              value={form.ratePerMile}
              onChange={(e) =>
                setForm((f) => ({ ...f, ratePerMile: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="loaded-miles">
            Loaded miles per week{" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="loaded-miles"
            className="input"
            type="number"
            inputMode="numeric"
            min={100}
            max={6000}
            step={100}
            value={form.loadedMilesPerWeek}
            onChange={(e) =>
              setForm((f) => ({ ...f, loadedMilesPerWeek: e.target.value }))
            }
            required
          />
        </div>

        <div className="field">
          <label htmlFor="deadhead">
            Deadhead percentage{" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <div className="calc-input-suffix">
            <input
              id="deadhead"
              className="input"
              type="number"
              inputMode="numeric"
              min={0}
              max={50}
              step={1}
              value={form.deadheadPercent}
              onChange={(e) =>
                setForm((f) => ({ ...f, deadheadPercent: e.target.value }))
              }
              required
            />
            <span aria-hidden="true">%</span>
          </div>
        </div>
      </fieldset>

      <fieldset className="calc-fieldset">
        <legend className="calc-legend">Variable costs</legend>

        <div className="field">
          <label htmlFor="fuel-price">
            Fuel price per gallon{" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <div className="calc-input-prefix">
            <span aria-hidden="true">$</span>
            <input
              id="fuel-price"
              className="input"
              type="number"
              inputMode="decimal"
              min={0}
              step={0.05}
              value={form.fuelPricePerGallon}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  fuelPricePerGallon: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="mpg">
            Truck MPG{" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="mpg"
            className="input"
            type="number"
            inputMode="decimal"
            min={4}
            max={10}
            step={0.1}
            value={form.mpg}
            onChange={(e) => setForm((f) => ({ ...f, mpg: e.target.value }))}
            required
          />
        </div>
      </fieldset>

      <fieldset className="calc-fieldset">
        <legend className="calc-legend">Fixed costs (weekly)</legend>

        <div className="field">
          <label htmlFor="truck-payment">
            Truck payment (weekly){" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <div className="calc-input-prefix">
            <span aria-hidden="true">$</span>
            <input
              id="truck-payment"
              className="input"
              type="number"
              inputMode="numeric"
              min={0}
              step={25}
              value={form.truckPaymentWeekly}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  truckPaymentWeekly: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="insurance">
            Insurance (weekly){" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <div className="calc-input-prefix">
            <span aria-hidden="true">$</span>
            <input
              id="insurance"
              className="input"
              type="number"
              inputMode="numeric"
              min={0}
              step={25}
              value={form.insuranceWeekly}
              onChange={(e) =>
                setForm((f) => ({ ...f, insuranceWeekly: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="other-fixed">
            Other fixed costs (weekly){" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <div className="calc-input-prefix">
            <span aria-hidden="true">$</span>
            <input
              id="other-fixed"
              className="input"
              type="number"
              inputMode="numeric"
              min={0}
              step={25}
              value={form.otherFixedWeekly}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  otherFixedWeekly: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="calc-fieldset">
        <legend className="calc-legend">Factoring</legend>

        <div className="field">
          <label htmlFor="factoring">
            Factoring fee % per invoice{" "}
            <span aria-hidden="true" className="req">
              *
            </span>
            <span className="sr-only">(required)</span>
          </label>
          <div className="calc-input-suffix">
            <input
              id="factoring"
              className="input"
              type="number"
              inputMode="decimal"
              min={0}
              max={7}
              step={0.25}
              value={form.factoringPercent}
              onChange={(e) =>
                setForm((f) => ({ ...f, factoringPercent: e.target.value }))
              }
              required
            />
            <span aria-hidden="true">%</span>
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="btn btn--primary calc-cta"
        disabled={!canSubmit}
      >
        Estimate my weekly net
        <IconArrowRight />
      </button>

      <div className="calc-foot">
        <IconLock />
        <span>
          Zero credit impact. We do not collect, store, or share any of
          these inputs.
        </span>
      </div>
    </form>
  );
}
