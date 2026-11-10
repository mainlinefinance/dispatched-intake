/* The two questions a visitor can answer before the application starts:
   monthly revenue and time in business.

   One definition for every surface that asks them (the home hero, /qualify)
   and every surface that reads them back (/apply and the widget frame it
   builds). The answers travel in the URL — /apply?monthlyRevenue=…&
   timeInBusiness=… — so nothing is stored and a shared or bookmarked link
   behaves the same as a fresh one.

   Values are stable slugs, not labels: they end up in URLs, in analytics and
   on the widget frame. Change a label freely; treat a value as an id. */

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

export type QuickStartAnswers = {
  monthlyRevenue: MonthlyRevenue | null;
  timeInBusiness: TimeInBusiness | null;
};

export const NO_QUICK_START_ANSWERS: QuickStartAnswers = {
  monthlyRevenue: null,
  timeInBusiness: null,
};

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
  const monthlyRevenue = params.get(MONTHLY_REVENUE_PARAM);
  const timeInBusiness = params.get(TIME_IN_BUSINESS_PARAM);
  return {
    monthlyRevenue: isMonthlyRevenue(monthlyRevenue) ? monthlyRevenue : null,
    timeInBusiness: isTimeInBusiness(timeInBusiness) ? timeInBusiness : null,
  };
}

export function hasQuickStartAnswers(answers: QuickStartAnswers): boolean {
  return answers.monthlyRevenue !== null || answers.timeInBusiness !== null;
}

/* Destination for a link that should carry the answers along. Unanswered
   questions leave no trace in the URL. */
export function applyHrefWithAnswers(
  applyHref: string,
  answers: QuickStartAnswers,
): string {
  const params = new URLSearchParams();
  if (answers.monthlyRevenue) {
    params.set(MONTHLY_REVENUE_PARAM, answers.monthlyRevenue);
  }
  if (answers.timeInBusiness) {
    params.set(TIME_IN_BUSINESS_PARAM, answers.timeInBusiness);
  }
  const query = params.toString();
  return query ? `${applyHref}?${query}` : applyHref;
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

   This is the parent half of a contract: the widget has to read these two
   keys and pre-select the matching answers for the hand-off to be seamless.
   Until it does, the keys are inert there and the quiz asks both questions
   itself. The slugs above are the values; the bands they stand for are the
   option labels. */
export const WIDGET_MONTHLY_REVENUE_KEY = "prefill_monthly_revenue";
export const WIDGET_TIME_IN_BUSINESS_KEY = "prefill_time_in_business";

export function widgetPrefillEntries(
  answers: QuickStartAnswers,
): [key: string, value: string][] {
  const entries: [string, string][] = [];
  if (answers.monthlyRevenue) {
    entries.push([WIDGET_MONTHLY_REVENUE_KEY, answers.monthlyRevenue]);
  }
  if (answers.timeInBusiness) {
    entries.push([WIDGET_TIME_IN_BUSINESS_KEY, answers.timeInBusiness]);
  }
  return entries;
}
