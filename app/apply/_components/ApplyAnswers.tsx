"use client";

import { useSearchParams } from "next/navigation";
import {
  fundingAmountLabel,
  hasQuickStartAnswers,
  monthlyRevenueLabel,
  parseQuickStartAnswers,
  quizRevenueLabel,
  timeInBusinessLabel,
} from "@/lib/quickStart";

/* Reads back the answers a visitor gave on the way here (home hero or
   /qualify), so the step they already took is acknowledged instead of
   silently dropped. Renders nothing for a visitor who arrives without any.

   useSearchParams keeps /apply statically rendered; the page wraps this in
   Suspense, as a prerendered route requires. */
export default function ApplyAnswers() {
  const answers = parseQuickStartAnswers(useSearchParams());
  if (!hasQuickStartAnswers(answers)) return null;

  return (
    <section className="apply-answers" aria-labelledby="apply-answers-title">
      <h2 className="apply-answers-title" id="apply-answers-title">
        <span className="apply-answers-check" aria-hidden="true">
          ✓
        </span>
        Your answers so far
      </h2>
      <dl className="apply-answers-list">
        {answers.fundingAmount ? (
          <div className="apply-answers-item">
            <dt>Funding amount</dt>
            <dd>{fundingAmountLabel(answers.fundingAmount)}</dd>
          </div>
        ) : null}
        {answers.revenue ? (
          <div className="apply-answers-item">
            <dt>Monthly revenue</dt>
            <dd>{quizRevenueLabel(answers.revenue)}</dd>
          </div>
        ) : null}
        {answers.monthlyRevenue ? (
          <div className="apply-answers-item">
            <dt>Monthly revenue</dt>
            <dd>{monthlyRevenueLabel(answers.monthlyRevenue)}</dd>
          </div>
        ) : null}
        {answers.timeInBusiness ? (
          <div className="apply-answers-item">
            <dt>Time in business</dt>
            <dd>{timeInBusinessLabel(answers.timeInBusiness)}</dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
