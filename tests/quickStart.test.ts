import { describe, expect, it } from "vitest";
import {
  FUNDING_AMOUNT_OPTIONS,
  FUNDING_AMOUNT_PARAM,
  MONTHLY_REVENUE_OPTIONS,
  MONTHLY_REVENUE_PARAM,
  NO_QUICK_START_ANSWERS,
  QUIZ_REVENUE_OPTIONS,
  QUIZ_REVENUE_PARAM,
  TIME_IN_BUSINESS_OPTIONS,
  TIME_IN_BUSINESS_PARAM,
  WIDGET_LOAN_AMOUNT_KEY,
  WIDGET_MONTHLY_REVENUE_KEY,
  WIDGET_REVENUE_KEY,
  WIDGET_TIME_IN_BUSINESS_KEY,
  applyHrefWithAnswers,
  fundingAmountLabel,
  hasQuickStartAnswers,
  monthlyRevenueLabel,
  parseQuickStartAnswers,
  quizRevenueLabel,
  timeInBusinessLabel,
  widgetPrefillEntries,
  type QuickStartAnswers,
} from "@/lib/quickStart";

function query(search: string): URLSearchParams {
  return new URLSearchParams(search);
}

describe("quick-start option lists", () => {
  it.each([
    ["funding amount", FUNDING_AMOUNT_OPTIONS],
    ["quiz revenue", QUIZ_REVENUE_OPTIONS],
    ["monthly revenue", MONTHLY_REVENUE_OPTIONS],
    ["time in business", TIME_IN_BUSINESS_OPTIONS],
  ] as const)("%s values are unique, URL-safe slugs", (_name, options) => {
    const values = options.map((option) => option.value);
    expect(new Set(values).size).toBe(values.length);
    for (const value of values) {
      // Travels unescaped in a query string and onto the widget frame.
      expect(value).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(encodeURIComponent(value)).toBe(value);
    }
  });

  it("every option has a label to read back on /apply", () => {
    for (const option of FUNDING_AMOUNT_OPTIONS) {
      expect(fundingAmountLabel(option.value)).toBe(option.label);
    }
    for (const option of QUIZ_REVENUE_OPTIONS) {
      expect(quizRevenueLabel(option.value)).toBe(option.label);
    }
    for (const option of MONTHLY_REVENUE_OPTIONS) {
      expect(monthlyRevenueLabel(option.value)).toBe(option.label);
    }
    for (const option of TIME_IN_BUSINESS_OPTIONS) {
      expect(timeInBusinessLabel(option.value)).toBe(option.label);
    }
  });
});

describe("parseQuickStartAnswers", () => {
  it("reads both answers from the query string", () => {
    expect(
      parseQuickStartAnswers(
        query("monthlyRevenue=20k-50k&timeInBusiness=1y-3y"),
      ),
    ).toEqual({
      ...NO_QUICK_START_ANSWERS,
      monthlyRevenue: "20k-50k",
      timeInBusiness: "1y-3y",
    });
  });

  it("reads the hero's two answers", () => {
    expect(
      parseQuickStartAnswers(query("fundingAmount=25k-100k&revenue=50k-100k")),
    ).toEqual({
      ...NO_QUICK_START_ANSWERS,
      fundingAmount: "25k-100k",
      revenue: "50k-100k",
    });
    // A /qualify revenue slug is not a quiz band, and the other way round.
    expect(parseQuickStartAnswers(query("revenue=20k-50k")).revenue).toBeNull();
    expect(
      parseQuickStartAnswers(query("monthlyRevenue=10k-50k")).monthlyRevenue,
    ).toBeNull();
  });

  it("returns nulls when nothing was answered", () => {
    expect(parseQuickStartAnswers(query(""))).toEqual(NO_QUICK_START_ANSWERS);
    expect(parseQuickStartAnswers(query("useCase=equipment"))).toEqual(
      NO_QUICK_START_ANSWERS,
    );
  });

  it("keeps the answered question when only one is present", () => {
    expect(parseQuickStartAnswers(query("timeInBusiness=3y-plus"))).toEqual({
      ...NO_QUICK_START_ANSWERS,
      timeInBusiness: "3y-plus",
    });
  });

  it("drops anything that is not a known slug", () => {
    const tampered = query(
      "monthlyRevenue=%3Cscript%3Ealert(1)%3C%2Fscript%3E&timeInBusiness=forever",
    );
    expect(parseQuickStartAnswers(tampered)).toEqual(NO_QUICK_START_ANSWERS);
    // Right key, a label instead of a slug, wrong case, empty value.
    expect(
      parseQuickStartAnswers(query("monthlyRevenue=%2420%2C000")),
    ).toEqual(NO_QUICK_START_ANSWERS);
    expect(parseQuickStartAnswers(query("monthlyRevenue=20K-50K"))).toEqual(
      NO_QUICK_START_ANSWERS,
    );
    expect(
      parseQuickStartAnswers(query("monthlyRevenue=&timeInBusiness=")),
    ).toEqual(NO_QUICK_START_ANSWERS);
  });

  it("does not let a second value rescue an invalid first one", () => {
    expect(
      parseQuickStartAnswers(
        query("monthlyRevenue=nonsense&monthlyRevenue=20k-50k"),
      ).monthlyRevenue,
    ).toBeNull();
  });
});

describe("applyHrefWithAnswers", () => {
  it("leaves the href alone when nothing was answered", () => {
    expect(applyHrefWithAnswers("/apply", NO_QUICK_START_ANSWERS)).toBe(
      "/apply",
    );
  });

  it("adds only the answered questions", () => {
    expect(
      applyHrefWithAnswers("/apply", {
        monthlyRevenue: "100k-plus",
        timeInBusiness: null,
      }),
    ).toBe("/apply?monthlyRevenue=100k-plus");
    expect(
      applyHrefWithAnswers("/apply", {
        monthlyRevenue: "under-20k",
        timeInBusiness: "under-6m",
      }),
    ).toBe("/apply?monthlyRevenue=under-20k&timeInBusiness=under-6m");
  });

  it("round-trips every combination through the URL", () => {
    const revenues = [null, ...MONTHLY_REVENUE_OPTIONS.map((o) => o.value)];
    const tenures = [null, ...TIME_IN_BUSINESS_OPTIONS.map((o) => o.value)];
    for (const monthlyRevenue of revenues) {
      for (const timeInBusiness of tenures) {
        const answers: QuickStartAnswers = {
          ...NO_QUICK_START_ANSWERS,
          monthlyRevenue,
          timeInBusiness,
        };
        const href = applyHrefWithAnswers("/apply", answers);
        const url = new URL(href, "https://dispatched.finance");
        expect(url.pathname).toBe("/apply");
        expect(parseQuickStartAnswers(url.searchParams)).toEqual(answers);
        expect(hasQuickStartAnswers(answers)).toBe(
          monthlyRevenue !== null || timeInBusiness !== null,
        );
      }
    }
  });

  it("round-trips every hero combination through the URL", () => {
    const amounts = [null, ...FUNDING_AMOUNT_OPTIONS.map((o) => o.value)];
    const revenues = [null, ...QUIZ_REVENUE_OPTIONS.map((o) => o.value)];
    for (const fundingAmount of amounts) {
      for (const revenue of revenues) {
        const answers: QuickStartAnswers = {
          ...NO_QUICK_START_ANSWERS,
          fundingAmount,
          revenue,
        };
        const url = new URL(
          applyHrefWithAnswers("/apply", answers),
          "https://dispatched.finance",
        );
        expect(parseQuickStartAnswers(url.searchParams)).toEqual(answers);
        expect(hasQuickStartAnswers(answers)).toBe(
          fundingAmount !== null || revenue !== null,
        );
      }
    }
  });

  it("uses the same param names a GET form with those field names produces", () => {
    // The home hero is a plain form whose selects are named with these
    // constants; this is what the browser builds on submit.
    const form = new URLSearchParams();
    form.set(FUNDING_AMOUNT_PARAM, "25k-100k");
    form.set(QUIZ_REVENUE_PARAM, "50k-100k");
    expect(`/apply?${form.toString()}`).toBe(
      applyHrefWithAnswers("/apply", {
        fundingAmount: "25k-100k",
        revenue: "50k-100k",
      }),
    );
    const qualify = new URLSearchParams();
    qualify.set(MONTHLY_REVENUE_PARAM, "50k-100k");
    qualify.set(TIME_IN_BUSINESS_PARAM, "6m-12m");
    expect(`/apply?${qualify.toString()}`).toBe(
      applyHrefWithAnswers("/apply", {
        monthlyRevenue: "50k-100k",
        timeInBusiness: "6m-12m",
      }),
    );
  });
});

describe("widgetPrefillEntries", () => {
  it("is empty when nothing was answered", () => {
    expect(widgetPrefillEntries(NO_QUICK_START_ANSWERS)).toEqual([]);
  });

  it("maps each answer to its widget key", () => {
    expect(
      widgetPrefillEntries({
        monthlyRevenue: "20k-50k",
        timeInBusiness: "1y-3y",
      }),
    ).toEqual([
      [WIDGET_MONTHLY_REVENUE_KEY, "20k-50k"],
      [WIDGET_TIME_IN_BUSINESS_KEY, "1y-3y"],
    ]);
    expect(
      widgetPrefillEntries({ monthlyRevenue: null, timeInBusiness: "3y-plus" }),
    ).toEqual([[WIDGET_TIME_IN_BUSINESS_KEY, "3y-plus"]]);
  });

  it("sends the hero's answers as the quiz's own option values", () => {
    // Read from the live quiz (radio values of loan_amount_range / revenue).
    expect(FUNDING_AMOUNT_OPTIONS.map((o) => o.quiz)).toEqual([
      "$3K–$25K",
      "$25K–$100K",
      "$100K–$500K",
      "$500K–$5M",
    ]);
    expect(QUIZ_REVENUE_OPTIONS.map((o) => o.quiz)).toEqual([
      "$10K–$50K",
      "$50K–$100K",
      "$100K–$250K",
      "$250K–$500K",
      "Over $500K",
    ]);
    expect(
      widgetPrefillEntries({ fundingAmount: "25k-100k", revenue: "500k-plus" }),
    ).toEqual([
      [WIDGET_LOAN_AMOUNT_KEY, "$25K–$100K"],
      [WIDGET_REVENUE_KEY, "Over $500K"],
    ]);
  });

  it("does not collide with the keys the frame already uses", () => {
    const taken = [
      "page",
      "referrer",
      "variant",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "gbraid",
      "wbraid",
    ];
    expect(taken).not.toContain(WIDGET_MONTHLY_REVENUE_KEY);
    expect(taken).not.toContain(WIDGET_TIME_IN_BUSINESS_KEY);
    expect(taken).not.toContain(WIDGET_LOAN_AMOUNT_KEY);
    expect(taken).not.toContain(WIDGET_REVENUE_KEY);
  });
});
