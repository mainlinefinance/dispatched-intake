"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconArrowRight, IconLock } from "@/components/landing/icons";
import {
  formatMoney,
  formatMoneyDigitsOnly,
  parseDollars,
} from "@/lib/format";
import { computeLeaseVsBuy, type BuyInputs, type LeaseInputs } from "@/lib/leaseVsBuy";

/* Lease-vs-buy comparison calculator. Two-column form (buy on the left,
   lease on the right; stacks on mobile), and a side-by-side result panel
   that highlights three numbers: total cost delta, equity delta, and the
   failure-rate-adjusted cost. The third number is the headline finding —
   it's why the calculator exists. See lib/leaseVsBuy.ts for the math and
   /owner-operator-financing/first-time for the editorial position. */

type BuyTermOption = "" | "36" | "48" | "60" | "72";
type LeaseTermOption = "" | "156" | "208" | "260" | "312";

type ResolvedInputs = { buy: BuyInputs; lease: LeaseInputs };
type Phase = { kind: "form" } | { kind: "result"; resolved: ResolvedInputs };

const round = (n: number) => Math.round(n);

export default function LeaseVsBuyCalculator() {
  const [phase, setPhase] = useState<Phase>({ kind: "form" });

  // Buy side
  const [price, setPrice] = useState(formatMoneyDigitsOnly("130000"));
  const [downPayment, setDownPayment] = useState(
    formatMoneyDigitsOnly("13000"),
  );
  const [buyTerm, setBuyTerm] = useState<BuyTermOption>("60");
  const [apr, setApr] = useState("12");
  const [residual, setResidual] = useState(formatMoneyDigitsOnly("40000"));

  // Lease side
  const [weekly, setWeekly] = useState("600");
  const [leaseTerm, setLeaseTerm] = useState<LeaseTermOption>("260");
  const [equity, setEquity] = useState(formatMoneyDigitsOnly("0"));

  const priceNum = parseDollars(price);
  const downPaymentNum = parseDollars(downPayment);
  const aprNum = Number(apr);
  const residualNum = parseDollars(residual);
  const weeklyNum = Number(weekly);
  const equityNum = parseDollars(equity);

  const canSubmit =
    priceNum >= 10_000 &&
    downPaymentNum >= 0 &&
    downPaymentNum <= priceNum &&
    buyTerm !== "" &&
    Number.isFinite(aprNum) &&
    aprNum >= 5 &&
    aprNum <= 25 &&
    residualNum >= 0 &&
    Number.isFinite(weeklyNum) &&
    weeklyNum >= 200 &&
    weeklyNum <= 2_500 &&
    leaseTerm !== "" &&
    equityNum >= 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      setPhase({
        kind: "result",
        resolved: {
          buy: {
            purchasePrice: priceNum,
            downPayment: downPaymentNum,
            termMonths: Number(buyTerm),
            aprPercent: aprNum,
            residualValue: residualNum,
          },
          lease: {
            weeklySettlement: weeklyNum,
            termWeeks: Number(leaseTerm),
            equityAtCompletion: equityNum,
          },
        },
      });
    }
  };

  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (phase.kind === "result") {
      resultHeadingRef.current?.focus();
    }
  }, [phase.kind]);

  if (phase.kind === "result") {
    const r = computeLeaseVsBuy(phase.resolved.buy, phase.resolved.lease);
    const buyCheaper = r.summary.totalCostDelta < 0;
    const failureSavings = r.summary.failureAdjustedDelta;

    return (
      <div className="calc-result" role="status" aria-live="polite">
        <div className="calc-eyebrow">Lease-purchase vs equipment financing</div>
        <h2
          ref={resultHeadingRef}
          tabIndex={-1}
          className="calc-primary-title"
        >
          {buyCheaper
            ? `Buying saves ${formatMoney(round(Math.abs(r.summary.totalCostDelta)))} net`
            : `Leasing saves ${formatMoney(round(Math.abs(r.summary.totalCostDelta)))} net`}
        </h2>
        <p className="calc-primary-rationale">
          Buying ends the term with{" "}
          <strong>{formatMoney(round(r.buy.equityAtTermEnd))}</strong> of
          equity (principal paid down plus residual value). The lease ends
          with <strong>{formatMoney(round(r.lease.equityAtCompletion))}</strong>{" "}
          — only if the operator completes. Applying the industry-documented
          80% failure rate, the expected-value cost of the lease is{" "}
          <strong>{formatMoney(round(r.lease.failureAdjustedCost))}</strong>,
          which is{" "}
          {failureSavings > 0
            ? `${formatMoney(round(failureSavings))} less than buying`
            : `${formatMoney(round(Math.abs(failureSavings)))} more than buying`}
          {" "}— and that&rsquo;s the headline finding.
        </p>

        <div className="calc-meta">
          <div>
            <span className="calc-meta-label">Buy — monthly payment</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.buy.monthlyPayment))}/mo
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Lease — monthly equivalent</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.lease.monthlyEquivalent))}/mo
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Buy — total payments</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.buy.totalPayments))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Lease — total payments</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.lease.totalPayments))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Buy — net cost</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.buy.netCost))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Lease — net cost</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.lease.netCost))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Buy — total interest</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.buy.totalInterest))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Lease — failure-adjusted</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.lease.failureAdjustedCost))}
            </span>
          </div>
        </div>

        <div className="calc-meta">
          <div>
            <span className="calc-meta-label">Buy equity — month 12</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.buy.equityAt12))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Lease equity — month 12</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.lease.equityAt12))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Buy equity — month 24</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.buy.equityAt24))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Lease equity — month 24</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.lease.equityAt24))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Buy equity — month 36</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.buy.equityAt36))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Lease equity — month 36</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.lease.equityAt36))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Buy equity — month 60</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.buy.equityAt60))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Lease equity — month 60</span>
            <span className="calc-meta-value mono">
              {formatMoney(round(r.lease.equityAt60))}
            </span>
          </div>
        </div>

        <p className="calc-illustrative-note">
          Failure-adjusted cost models the 80%+ wash-out rate documented
          across lease-purchase programs: 80% of operators exit at roughly
          the midpoint with $0 recovered, 20% complete and receive the
          stated equity. The model does not capture insurance, fuel,
          maintenance, fees, or tax differences — see methodology and{" "}
          <Link href="/owner-operator-financing/first-time">
            first-time owner-op guidance
          </Link>{" "}
          before signing anything.
        </p>

        <Link
          href="/apply?useCase=equipment"
          className="btn btn--primary calc-cta"
        >
          See my real equipment financing rate
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
    <form
      className="calc-form"
      onSubmit={handleSubmit}
      style={{ maxWidth: 920 }}
    >
      <div className="calc-steps">
        8 INPUTS · NO CREDIT CHECK · NO PERSONAL INFO
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 8,
        }}
      >
        <fieldset
          style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
        >
          <legend
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-trail-green-deep)",
              marginBottom: 10,
              padding: 0,
            }}
          >
            Buy (equipment financing)
          </legend>

          <div className="field">
            <label htmlFor="lvb-price">
              Truck purchase price{" "}
              <span aria-hidden="true" className="req">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <div className="calc-input-prefix">
              <span aria-hidden="true">$</span>
              <input
                id="lvb-price"
                className="input"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 130,000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="lvb-down">
              Down payment{" "}
              <span aria-hidden="true" className="req">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <div className="calc-input-prefix">
              <span aria-hidden="true">$</span>
              <input
                id="lvb-down"
                className="input"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 13,000"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="lvb-buy-term">
              Loan term{" "}
              <span aria-hidden="true" className="req">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <select
              id="lvb-buy-term"
              className="select"
              value={buyTerm}
              onChange={(e) => setBuyTerm(e.target.value as BuyTermOption)}
              required
            >
              <option value="" disabled>
                Pick a term
              </option>
              <option value="36">36 months (3 years)</option>
              <option value="48">48 months (4 years)</option>
              <option value="60">60 months (5 years)</option>
              <option value="72">72 months (6 years)</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="lvb-apr">
              APR (%){" "}
              <span aria-hidden="true" className="req">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              id="lvb-apr"
              className="input"
              type="number"
              inputMode="decimal"
              min={5}
              max={25}
              step={0.25}
              value={apr}
              onChange={(e) => setApr(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="lvb-residual">
              Residual value at term end{" "}
              <span aria-hidden="true" className="req">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <div className="calc-input-prefix">
              <span aria-hidden="true">$</span>
              <input
                id="lvb-residual"
                className="input"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 40,000"
                value={residual}
                onChange={(e) => setResidual(e.target.value)}
                required
              />
            </div>
          </div>
        </fieldset>

        <fieldset
          style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
        >
          <legend
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-trail-green-deep)",
              marginBottom: 10,
              padding: 0,
            }}
          >
            Lease (lease-purchase)
          </legend>

          <div className="field">
            <label htmlFor="lvb-weekly">
              Weekly settlement deduction{" "}
              <span aria-hidden="true" className="req">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <div className="calc-input-prefix">
              <span aria-hidden="true">$</span>
              <input
                id="lvb-weekly"
                className="input"
                type="number"
                inputMode="numeric"
                min={200}
                max={2500}
                step={25}
                value={weekly}
                onChange={(e) => setWeekly(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="lvb-lease-term">
              Lease term{" "}
              <span aria-hidden="true" className="req">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <select
              id="lvb-lease-term"
              className="select"
              value={leaseTerm}
              onChange={(e) =>
                setLeaseTerm(e.target.value as LeaseTermOption)
              }
              required
            >
              <option value="" disabled>
                Pick a term
              </option>
              <option value="156">156 weeks (3 years)</option>
              <option value="208">208 weeks (4 years)</option>
              <option value="260">260 weeks (5 years)</option>
              <option value="312">312 weeks (6 years)</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="lvb-equity">
              Equity at lease completion{" "}
              <span aria-hidden="true" className="req">
                *
              </span>
              <span className="sr-only">(required)</span>
            </label>
            <div className="calc-input-prefix">
              <span aria-hidden="true">$</span>
              <input
                id="lvb-equity"
                className="input"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 0"
                value={equity}
                onChange={(e) => setEquity(e.target.value)}
                required
              />
            </div>
            <small
              style={{
                fontSize: 12,
                color: "var(--color-ink-tertiary)",
                lineHeight: 1.5,
                marginTop: 2,
              }}
            >
              Most lease-purchase programs treat exit as forfeiture — verify
              the equity-accrual schedule before signing. The honest default
              is $0.
            </small>
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className="btn btn--primary calc-cta"
        disabled={!canSubmit}
      >
        Compare lease vs buy
        <IconArrowRight />
      </button>

      <div className="calc-foot">
        <IconLock />
        <span>
          Zero credit impact at this step. We do not collect, store, or share
          any of these inputs.
        </span>
      </div>
    </form>
  );
}
