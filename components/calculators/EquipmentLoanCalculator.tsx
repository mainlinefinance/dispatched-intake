"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconArrowRight, IconLock } from "@/components/landing/icons";
import {
  formatMoney,
  formatMoneyDigitsOnly,
  parseDollars,
} from "@/lib/format";
import {
  CONDITION_LABEL,
  computeEstimate,
  type Condition,
  type Credit,
  type Term,
} from "@/lib/equipmentLoan";

/* The equipment loan calculator is a payment estimator, not a rate quote
   and not an underwriting decision. It runs the standard amortization
   formula on the user's inputs and returns the indicative monthly
   payment, total interest, and APR band consistent with the credit
   range they selected. APR bands are observed panel ranges (same as
   /qualify, the FAQ, and /calculators/truck-repair); the chosen lender
   sets the final APR on the term sheet.

   The pure math + APR tables live in lib/equipmentLoan.ts so they can
   be unit-tested in isolation. This file is the form shell: state,
   validation, layout, copy.

   No personal info is collected. No credit pull. The form persists
   nothing — values live in component state until the user clicks the
   primary CTA, which routes to the application flow with a
   `useCase=equipment` param so the intake machine seeds the correct
   branch. */

/* Form state allows the empty string for unselected selects; the lib
   types are the resolved (non-empty) shape used by computeEstimate. */
type CreditOption = "" | Credit;
type ConditionOption = "" | Condition;
type TermOption = "" | `${Term}`;

type ResolvedInputs = {
  price: number;
  downPaymentDollars: number;
  termMonths: Term;
  credit: Credit;
  condition: Condition;
};

/* Tagged phase state. The result branch can ONLY render with fully-
   resolved inputs — the type system enforces it, no narrow-and-cast
   guard required. */
type Phase = { kind: "form" } | { kind: "result"; resolved: ResolvedInputs };

type Props = {
  /* Equipment noun used in copy. Union (not `string`) so adding a
     fourth variant is a deliberate, type-checked decision. */
  equipmentNoun: "semi truck" | "commercial truck" | "dump truck";
  /* Pre-filled equipment price shown on first render. Picked to be
     representative of the median lead, not the cheapest scenario. */
  defaultPrice: number;
};

export default function EquipmentLoanCalculator({
  equipmentNoun,
  defaultPrice,
}: Props) {
  const [phase, setPhase] = useState<Phase>({ kind: "form" });
  const [price, setPrice] = useState(formatMoneyDigitsOnly(String(defaultPrice)));
  const [downPayment, setDownPayment] = useState("");
  const [term, setTerm] = useState<TermOption>("60");
  const [condition, setCondition] = useState<ConditionOption>("");
  const [credit, setCredit] = useState<CreditOption>("");

  const priceNum = parseDollars(price);
  const downPaymentNum = parseDollars(downPayment);
  /* `<=` (not `<`) — cash buyers entering downPayment === price are
     valid: loan amount becomes 0, monthly becomes 0, math is sound,
     result panel still tells them the APR band their credit qualifies
     for if they ever DO finance future equipment. */
  const canSubmit =
    priceNum >= 10_000 &&
    downPaymentNum >= 0 &&
    downPaymentNum <= priceNum &&
    term !== "" &&
    condition !== "" &&
    credit !== "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* `canSubmit` is a const-evaluated `&&` chain that includes
       `term !== ""`, `credit !== ""`, and `condition !== ""`. TypeScript
       propagates those narrowings to subsequent reads, so by this point
       term/credit/condition are typed as their non-empty unions. */
    if (canSubmit) {
      setPhase({
        kind: "result",
        resolved: {
          price: priceNum,
          downPaymentDollars: downPaymentNum,
          termMonths: Number(term) as Term,
          credit,
          condition,
        },
      });
    }
  };

  /* Move keyboard + screen reader focus to the result heading on transition,
     so SR users hear the new monthly payment instead of silence and keyboard
     users don't drop to body when the submit button unmounts. */
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (phase.kind === "result") {
      resultHeadingRef.current?.focus();
    }
  }, [phase.kind]);

  if (phase.kind === "result") {
    const result = computeEstimate(phase.resolved);

    return (
      <div className="calc-result" role="status" aria-live="polite">
        <div className="calc-eyebrow">Estimated monthly payment</div>
        <h2
          ref={resultHeadingRef}
          tabIndex={-1}
          className="calc-primary-title"
        >
          {formatMoney(Math.round(result.monthly))}/mo
        </h2>
        <p className="calc-primary-rationale">
          Equipment financing on a{" "}
          {formatMoney(Math.round(result.loanAmount))} loan over{" "}
          {phase.resolved.termMonths} months. Estimate uses the midpoint of
          your credit band; the chosen lender sets the final APR on the term
          sheet.
        </p>

        <div className="calc-meta">
          <div>
            <span className="calc-meta-label">APR band used</span>
            <span className="calc-meta-value mono">{result.band}</span>
          </div>
          <div>
            <span className="calc-meta-label">Total interest</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(result.totalInterest))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Total paid</span>
            <span className="calc-meta-value mono">
              {formatMoney(Math.round(result.totalPaid))}
            </span>
          </div>
          <div>
            <span className="calc-meta-label">Payoff date</span>
            <span className="calc-meta-value">{result.payoffDate}</span>
          </div>
        </div>

        <p className="calc-illustrative-note">
          Estimate based on your inputs. APR bands are observed panel ranges,
          not guarantees — see{" "}
          <Link href="/methodology#finance-rates">methodology</Link>. The exact
          APR is set by the chosen lender on the term sheet and depends on the
          full application, time in business, and collateral specifics.
        </p>

        <Link
          href="/apply?useCase=equipment"
          className="btn btn--primary calc-cta"
        >
          See my real rate
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
        5 INPUTS · NO CREDIT CHECK · NO PERSONAL INFO
      </div>

      <div className="field">
        <label htmlFor="price">
          {equipmentNoun.charAt(0).toUpperCase() + equipmentNoun.slice(1)} price{" "}
          <span aria-hidden="true" className="req">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <div className="calc-input-prefix">
          <span aria-hidden="true">$</span>
          <input
            id="price"
            className="input"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 80,000"
            value={price}
            /* Raw input on keystroke. We deliberately do NOT format with
               formatMoneyDigitsOnly here, because that helper strips
               every non-digit — including the decimal point — and would
               turn a pasted "$80,000.50" into "8,000,050" (a 100x bug).
               parseDollars() handles the cents-stripping at submit time. */
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="down-payment">
          Down payment{" "}
          <span aria-hidden="true" className="req">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <div className="calc-input-prefix">
          <span aria-hidden="true">$</span>
          <input
            id="down-payment"
            className="input"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 8,000"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="term">
          Loan term{" "}
          <span aria-hidden="true" className="req">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="term"
          className="select"
          value={term}
          onChange={(e) => setTerm(e.target.value as TermOption)}
          required
        >
          <option value="" disabled>
            Pick a term
          </option>
          <option value="36">36 months (3 years)</option>
          <option value="48">48 months (4 years)</option>
          <option value="60">60 months (5 years)</option>
          <option value="72">72 months (6 years)</option>
          <option value="84">84 months (7 years)</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="condition">
          Equipment condition{" "}
          <span aria-hidden="true" className="req">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="condition"
          className="select"
          value={condition}
          onChange={(e) => setCondition(e.target.value as ConditionOption)}
          required
        >
          <option value="" disabled>
            New or used?
          </option>
          {(Object.keys(CONDITION_LABEL) as Array<Condition>).map((k) => (
            <option key={k} value={k}>
              {CONDITION_LABEL[k]}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="credit">
          Credit band{" "}
          <span aria-hidden="true" className="req">
            *
          </span>
          <span className="sr-only">(required)</span>
        </label>
        <select
          id="credit"
          className="select"
          value={credit}
          onChange={(e) => setCredit(e.target.value as CreditOption)}
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

      <button
        type="submit"
        className="btn btn--primary calc-cta"
        disabled={!canSubmit}
      >
        Estimate my payment
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
