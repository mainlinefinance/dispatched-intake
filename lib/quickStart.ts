/* The questions a visitor can answer before the application starts.

   Two surfaces ask, and they ask different things on purpose:
   - the home hero asks the first two questions of the application quiz
     itself (funding amount and monthly revenue, in the quiz's own bands), so
     the answer given there is one the quiz would otherwise ask again;
   - /qualify is a fit estimator and asks monthly revenue and time in
     business in its own bands, which its estimate is built on.

   One definition for every surface that asks them and every surface that
   reads them back (/apply and the widget frame it builds). The answers travel in the URL — /apply?monthlyRevenue=…&
   timeInBusiness=… — so nothing is stored and a shared or bookmarked link
   behaves the same as a fresh one.

   Values are stable slugs, not labels: they end up in URLs, in analytics and
   on the widget frame. Change a label freely; treat a value as an id. */

export const FUNDING_AMOUNT_PARAM = "fundingAmount";
export const QUIZ_REVENUE_PARAM = "revenue";

/* The hero's two questions. `label` is what the visitor reads; `quiz` is the
   exact option the Mainline quiz offers for the same band (its radio value),
   which is what the widget frame receives. Keep both lists in step with the
   quiz: a band the quiz does not have cannot be pre-selected there. */
export const FUNDING_AMOUNT_OPTIONS = [
  { value: "3k-25k", label: "$3,000 – $25,000", quiz: "$3K–$25K" },
  { value: "25k-100k", label: "$25,000 – $100,000", quiz: "$25K–$100K" },
  { value: "100k-500k", label: "$100,000 – $500,000", quiz: "$100K–$500K" },
  { value: "500k-5m", label: "$500,000 – $5,000,000", quiz: "$500K–$5M" },
] as const;

export const QUIZ_REVENUE_OPTIONS = [
  { value: "10k-50k", label: "$10,000 – $50,000", quiz: "$10K–$50K" },
  { value: "50k-100k", label: "$50,000 – $100,000", quiz: "$50K–$100K" },
  { value: "100k-250k", label: "$100,000 – $250,000", quiz: "$100K–$250K" },
  { value: "250k-500k", label: "$250,000 – $500,000", quiz: "$250K–$500K" },
  { value: "500k-plus", label: "Over $500,000", quiz: "Over $500K" },
] as const;

/* /qualify's two questions. */
export const MONTHLY_REVENUE_PARAM = "monthlyRevenue";
export const TIME_IN_BUSINESS_PARAM = "timeInBusiness";

export const MONTHLY_REVENUE_OPTIONS = [
  { value: "under-20k", label: "Under $20,000" },
  { value: "20k-50k", label: "$20,000 – $50,000" },
  { value: "50k-100k", label: "$50,000 – $100,000" },
  { value: "100k-plus", label: "$100,000+" },
] as const;

export const TIME_IN_BUSINESS_OPTIONS = [
  { value: "under-6m", label: "Under 6 months" },
  { value: "6m-12m", label: "6 – 12 months" },
  { value: "1y-3y", label: "1 – 3 years" },
  { value: "3y-plus", label: "3+ years" },
] as const;

export type MonthlyRevenue = (typeof MONTHLY_REVENUE_OPTIONS)[number]["value"];
export type TimeInBusiness = (typeof TIME_IN_BUSINESS_OPTIONS)[number]["value"];

export type FundingAmount = (typeof FUNDING_AMOUNT_OPTIONS)[number]["value"];
export type QuizRevenue = (typeof QUIZ_REVENUE_OPTIONS)[number]["value"];

export type QuickStartAnswers = {
  fundingAmount: FundingAmount | null;
  revenue: QuizRevenue | null;
  monthlyRevenue: MonthlyRevenue | null;
  timeInBusiness: TimeInBusiness | null;
};

export const NO_QUICK_START_ANSWERS: QuickStartAnswers = {
  fundingAmount: null,
  revenue: null,
  monthlyRevenue: null,
  timeInBusiness: null,
};

function isFundingAmount(value: string | null): value is FundingAmount {
  return FUNDING_AMOUNT_OPTIONS.some((option) => option.value === value);
}

function isQuizRevenue(value: string | null): value is QuizRevenue {
  return QUIZ_REVENUE_OPTIONS.some((option) => option.value === value);
}

function isMonthlyRevenue(value: string | null): value is MonthlyRevenue {
  return MONTHLY_REVENUE_OPTIONS.some((option) => option.value === value);
}

function isTimeInBusiness(value: string | null): value is TimeInBusiness {
  return TIME_IN_BUSINESS_OPTIONS.some((option) => option.value === value);
}

/* Reads the answers out of a query string. Anything that is not one of the
   known slugs is dropped, so a hand-edited URL can neither put arbitrary
   text on the page nor reach the widget frame. Accepts URLSearchParams and
   Next's ReadonlyURLSearchParams alike. */
export function parseQuickStartAnswers(params: {
  get(name: string): string | null;
}): QuickStartAnswers {
  const fundingAmount = params.get(FUNDING_AMOUNT_PARAM);
  const revenue = params.get(QUIZ_REVENUE_PARAM);
  const monthlyRevenue = params.get(MONTHLY_REVENUE_PARAM);
  const timeInBusiness = params.get(TIME_IN_BUSINESS_PARAM);
  return {
    fundingAmount: isFundingAmount(fundingAmount) ? fundingAmount : null,
    revenue: isQuizRevenue(revenue) ? revenue : null,
    monthlyRevenue: isMonthlyRevenue(monthlyRevenue) ? monthlyRevenue : null,
    timeInBusiness: isTimeInBusiness(timeInBusiness) ? timeInBusiness : null,
  };
}

export function hasQuickStartAnswers(answers: QuickStartAnswers): boolean {
  return Object.values(answers).some((answer) => answer !== null);
}

/* Destination for a link that should carry the answers along. Unanswered
   questions leave no trace in the URL. */
export function applyHrefWithAnswers(
  applyHref: string,
  given: Partial<QuickStartAnswers>,
): string {
  const answers = { ...NO_QUICK_START_ANSWERS, ...given };
  const params = new URLSearchParams();
  if (answers.fundingAmount) {
    params.set(FUNDING_AMOUNT_PARAM, answers.fundingAmount);
  }
  if (answers.revenue) {
    params.set(QUIZ_REVENUE_PARAM, answers.revenue);
  }
  if (answers.monthlyRevenue) {
    params.set(MONTHLY_REVENUE_PARAM, answers.monthlyRevenue);
  }
  if (answers.timeInBusiness) {
    params.set(TIME_IN_BUSINESS_PARAM, answers.timeInBusiness);
  }
  const query = params.toString();
  return query ? `${applyHref}?${query}` : applyHref;
}

export function fundingAmountLabel(value: FundingAmount): string {
  return FUNDING_AMOUNT_OPTIONS.find((option) => option.value === value)!
    .label;
}

export function quizRevenueLabel(value: QuizRevenue): string {
  return QUIZ_REVENUE_OPTIONS.find((option) => option.value === value)!.label;
}

export function monthlyRevenueLabel(value: MonthlyRevenue): string {
  return MONTHLY_REVENUE_OPTIONS.find((option) => option.value === value)!
    .label;
}

export function timeInBusinessLabel(value: TimeInBusiness): string {
  return TIME_IN_BUSINESS_OPTIONS.find((option) => option.value === value)!
    .label;
}

/* Query keys the answers travel under on the Mainline widget frame.

   This is the parent half of a contract: the widget has to read these keys
   and pre-select the matching answers for the hand-off to be seamless. Until
   it does, the keys are inert there and the quiz asks everything itself.

   The hero's two answers are sent under the quiz's own field names
   (loan_amount_range, revenue) with the quiz's own option values, so the
   widget can match them without a lookup table. /qualify's two have no
   counterpart in the quiz (different revenue bands, no time-in-business
   question) and are sent as slugs for the lead record only. */
export const WIDGET_LOAN_AMOUNT_KEY = "prefill_loan_amount_range";
export const WIDGET_REVENUE_KEY = "prefill_revenue";
export const WIDGET_MONTHLY_REVENUE_KEY = "prefill_monthly_revenue";
export const WIDGET_TIME_IN_BUSINESS_KEY = "prefill_time_in_business";

export function widgetPrefillEntries(
  given: Partial<QuickStartAnswers>,
): [key: string, value: string][] {
  const answers = { ...NO_QUICK_START_ANSWERS, ...given };
  const entries: [string, string][] = [];
  if (answers.fundingAmount) {
    const { fundingAmount } = answers;
    entries.push([
      WIDGET_LOAN_AMOUNT_KEY,
      FUNDING_AMOUNT_OPTIONS.find((o) => o.value === fundingAmount)!.quiz,
    ]);
  }
  if (answers.revenue) {
    const { revenue } = answers;
    entries.push([
      WIDGET_REVENUE_KEY,
      QUIZ_REVENUE_OPTIONS.find((o) => o.value === revenue)!.quiz,
    ]);
  }
  if (answers.monthlyRevenue) {
    entries.push([WIDGET_MONTHLY_REVENUE_KEY, answers.monthlyRevenue]);
  }
  if (answers.timeInBusiness) {
    entries.push([WIDGET_TIME_IN_BUSINESS_KEY, answers.timeInBusiness]);
  }
  return entries;
}
