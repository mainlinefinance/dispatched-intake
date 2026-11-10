import { describe, expect, it } from "vitest";
import {
  MONTHLY_REVENUE_OPTIONS,
  MONTHLY_REVENUE_PARAM,
  NO_QUICK_START_ANSWERS,
  TIME_IN_BUSINESS_OPTIONS,
  TIME_IN_BUSINESS_PARAM,
  WIDGET_MONTHLY_REVENUE_KEY,
  WIDGET_TIME_IN_BUSINESS_KEY,
  applyHrefWithAnswers,
  hasQuickStartAnswers,
  monthlyRevenueLabel,
  parseQuickStartAnswers,
  timeInBusinessLabel,
  widgetPrefillEntries,
  type QuickStartAnswers,
} from "@/lib/quickStart";

function query(search: string): URLSearchParams {
  return new URLSearchParams(search);
}

describe("quick-start option lists", () => {
  it.each([
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
    ).toEqual({ monthlyRevenue: "20k-50k", timeInBusiness: "1y-3y" });
  });

  it("returns nulls when nothing was answered", () => {
    expect(parseQuickStartAnswers(query(""))).toEqual(NO_QUICK_START_ANSWERS);
    expect(parseQuickStartAnswers(query("useCase=equipment"))).toEqual(
      NO_QUICK_START_ANSWERS,
    );
  });

  it("keeps the answered question when only one is present", () => {
    expect(parseQuickStartAnswers(query("timeInBusiness=3y-plus"))).toEqual({
      monthlyRevenue: null,
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
        const answers: QuickStartAnswers = { monthlyRevenue, timeInBusiness };
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

  it("uses the same param names a GET form with those field names produces", () => {
    // The home hero is a plain form whose selects are named with these
    // constants; this is what the browser builds on submit.
    const form = new URLSearchParams();
    form.set(MONTHLY_REVENUE_PARAM, "50k-100k");
    form.set(TIME_IN_BUSINESS_PARAM, "6m-12m");
    expect(`/apply?${form.toString()}`).toBe(
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
  });
});
