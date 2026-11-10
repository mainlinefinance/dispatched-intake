import { describe, expect, it } from "vitest";
import {
  addMonths,
  classifyEmail,
  grantWindow,
  latestStatusByDocket,
  mergeGrants,
  monthsBetween,
  normalizeDot,
  parseArgs,
  parseCompactDate,
  parseSlashDate,
  selectCarriers,
  soqlString,
  tierFor,
  titleCase,
  toCsv,
  type CensusRow,
  type CohortOptions,
  type Grant,
} from "@/scripts/fmcsa-cohort";

const OPTS: CohortOptions = {
  from: "2026-10-11",
  to: "2026-11-10",
  months: 6,
  minUnits: 1,
  maxUnits: 10,
  excludeStates: ["CA"],
  maxSharedEmail: 2,
  maxSharedDomain: 3,
  out: "unused.csv",
};

function censusRow(dot: string, overrides: CensusRow = {}): CensusRow {
  return {
    dot_number: dot,
    status_code: "A",
    classdef: "AUTHORIZED FOR HIRE",
    phy_country: "US",
    phy_state: "TX",
    phy_city: "DALLAS",
    power_units: "1",
    total_drivers: "1",
    legal_name: `CARRIER ${dot} LLC`,
    company_officer_1: "JANE DOE",
    email_address: `owner${dot}@gmail.com`,
    crgo_genfreight: "X",
    mcs150_date: "20260415",
    ...overrides,
  };
}

function grant(dot: string, grantedOn = "2026-05-01", docket = `MC${dot}`): Grant {
  return { dot, docket, grantedOn };
}

describe("dates", () => {
  it("adds calendar months and clamps to month end", () => {
    expect(addMonths("2026-05-01", 6)).toBe("2026-11-01");
    expect(addMonths("2026-08-31", -6)).toBe("2026-02-28");
    expect(addMonths("2028-08-31", -6)).toBe("2028-02-29");
    expect(addMonths("2026-11-10", -6)).toBe("2026-05-10");
  });

  it("derives the grant window from the anniversary window", () => {
    expect(grantWindow(OPTS)).toEqual({ grantFrom: "2026-04-11", grantTo: "2026-05-10" });
  });

  it("parses both FMCSA date formats", () => {
    expect(parseSlashDate("05/08/2026")).toBe("2026-05-08");
    expect(parseSlashDate("2026-05-08")).toBeNull();
    expect(parseCompactDate("20260508")).toBe("2026-05-08");
    expect(parseCompactDate(undefined)).toBeNull();
  });

  it("lists every month a range touches", () => {
    expect(monthsBetween("2026-04-11", "2026-05-10")).toEqual(["2026-04", "2026-05"]);
    expect(monthsBetween("2025-12-15", "2026-01-02")).toEqual(["2025-12", "2026-01"]);
  });
});

describe("parseArgs", () => {
  it("defaults to anniversaries in the last 30 days, excluding CA", () => {
    const o = parseArgs([], "2026-11-10");
    expect(o).toMatchObject({ from: "2026-10-11", to: "2026-11-10", months: 6, excludeStates: ["CA"] });
    expect(o.out).toBe("outreach-data/fmcsa-cohort-2026-10-11_2026-11-10.csv");
  });

  it("reads flags in both --k v and --k=v forms", () => {
    const o = parseArgs(["--from", "2026-11-10", "--to=2026-12-10", "--exclude-states", "ca, ny", "--max-units", "5"], "2026-11-10");
    expect(o).toMatchObject({ from: "2026-11-10", to: "2026-12-10", excludeStates: ["CA", "NY"], maxUnits: 5 });
  });

  it("allows an empty state exclusion list", () => {
    expect(parseArgs(["--exclude-states="], "2026-11-10").excludeStates).toEqual([]);
  });

  it("rejects bad dates and reversed ranges", () => {
    expect(() => parseArgs(["--to", "2026-02-30"], "2026-11-10")).toThrow(/YYYY-MM-DD/);
    expect(() => parseArgs(["--from", "2026-12-01", "--to", "2026-11-01"], "2026-11-10")).toThrow(/after/);
  });
});

describe("record shaping", () => {
  it("normalizes padded DOT numbers", () => {
    expect(normalizeDot("04569723")).toBe("4569723");
    expect(normalizeDot("00000000")).toBeNull();
    expect(normalizeDot("abc")).toBeNull();
  });

  it("classifies free-mail and business addresses", () => {
    expect(classifyEmail(" Owner@Gmail.com ")).toEqual({ email: "owner@gmail.com", type: "free" });
    expect(classifyEmail("dispatch@acmefreight.com")).toEqual({ email: "dispatch@acmefreight.com", type: "business" });
    expect(classifyEmail("not an email")).toBeNull();
    expect(classifyEmail("a@b.com;c@d.com")).toBeNull();
  });

  it("tiers by truck count", () => {
    expect(tierFor(1, OPTS)).toBe("ICP-2");
    expect(tierFor(2, OPTS)).toBe("ICP-1");
    expect(tierFor(10, OPTS)).toBe("ICP-1");
    expect(tierFor(11, OPTS)).toBeNull();
    expect(tierFor(Number.NaN, OPTS)).toBeNull();
  });

  it("keeps the earliest grant per DOT number", () => {
    const merged = mergeGrants([grant("1", "2026-05-03"), grant("1", "2026-04-20"), grant("2", "2026-04-25")]);
    expect(merged.map((g) => [g.dot, g.grantedOn])).toEqual([
      ["1", "2026-04-20"],
      ["2", "2026-04-25"],
    ]);
  });

  it("takes the latest Motus status per docket", () => {
    const status = latestStatusByDocket([
      { docket_number: "MC1", op_auth_status: "Active", status_change_date: "20260501" },
      { docket_number: "MC1", op_auth_status: "Inactive", status_change_date: "20261001" },
      { docket_number: "MC2", op_auth_status: "Active", status_change_date: "20260501" },
    ]);
    expect(status.get("MC1")).toBe("Inactive");
    expect(status.get("MC2")).toBe("Active");
  });

  it("title-cases names but keeps initials, digits and LLC upper case", () => {
    expect(titleCase("S & P JONES LLC")).toBe("S & P Jones LLC");
    expect(titleCase("acme freight inc")).toBe("Acme Freight Inc");
    expect(titleCase("JCN TRUCKING LLC")).toBe("JCN Trucking LLC");
    expect(titleCase("A2Z LOGISTICS")).toBe("A2Z Logistics");
    expect(titleCase("O'BRIEN HAULING")).toBe("O'Brien Hauling");
    expect(titleCase("JGARCIA'S GARAGE")).toBe("Jgarcia's Garage");
    expect(titleCase("UK EXPRESS")).toBe("UK Express");
    expect(titleCase("KINGS OF THE ROAD")).toBe("Kings Of The Road");
  });

  it("escapes SoQL string literals", () => {
    expect(soqlString("o'brien@x.com")).toBe("'o''brien@x.com'");
  });
});

describe("selectCarriers", () => {
  it("keeps an eligible carrier with the anniversary date", () => {
    const census = new Map([["1", censusRow("1", { power_units: "3" })]]);
    const { rows, excluded } = selectCarriers([grant("1", "2026-05-01")], census, new Map(), new Map(), OPTS);
    expect(excluded).toMatchObject({ "fleet-size": 0, "shared-email": 0 });
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      tier: "ICP-1",
      email: "owner1@gmail.com",
      email_type: "free",
      authority_granted: "2026-05-01",
      six_month_date: "2026-11-01",
      cargo: "genfreight",
      legal_name: "Carrier 1 LLC",
      mcs150_date: "2026-04-15",
    });
  });

  it("never outputs a phone number", () => {
    const census = new Map([["1", censusRow("1", { phone: "2145550100" })]]);
    const { rows } = selectCarriers([grant("1")], census, new Map(), new Map(), OPTS);
    expect(JSON.stringify(rows)).not.toContain("2145550100");
    expect(toCsv(rows)).not.toMatch(/phone/i);
  });

  it("records why each carrier was dropped", () => {
    const census = new Map<string, CensusRow>([
      ["2", censusRow("2", { status_code: "I" })],
      ["3", censusRow("3", { phy_state: "CA" })],
      ["4", censusRow("4", { phy_country: "CA" })],
      ["5", censusRow("5", { power_units: "40" })],
      ["6", censusRow("6", { email_address: "" })],
      ["7", censusRow("7", { email_address: "service@permits.com" })],
      ["8", censusRow("8", { classdef: "PRIVATE PROPERTY" })],
      ["9", censusRow("9", { email_address: "owner10@gmail.com" })],
      ["10", censusRow("10")],
      ["12", censusRow("12")],
    ]);
    const grants = [
      grant("1"), // not in census
      grant("2"),
      grant("3"),
      grant("4"),
      grant("5"),
      grant("6"),
      grant("7"),
      grant("8"),
      grant("9", "2026-05-02"), // same address as 10, later grant → duplicate
      grant("10"),
      grant("11", "2026-03-01"), // anniversary outside window
      grant("12", "2026-05-01", "MC-REVOKED"),
    ];
    const motus = new Map([["MC-REVOKED", "Inactive"]]);
    const shared = new Map([["service@permits.com", 40]]);
    const { rows, excluded } = selectCarriers(grants, census, motus, shared, OPTS);

    expect(rows.map((r) => r.dot_number)).toEqual(["10"]);
    expect(excluded).toEqual({
      "anniversary-outside-window": 1,
      "authority-not-active": 1,
      "not-in-census": 1,
      "usdot-not-active": 1,
      "not-for-hire": 1,
      "outside-us": 1,
      "excluded-state": 1,
      "fleet-size": 1,
      "no-usable-email": 1,
      "shared-email": 1,
      "shared-domain": 0,
      "duplicate-email": 1,
    });
  });

  it("drops business domains shared by many carriers but not free-mail ones", () => {
    const dots = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const census = new Map<string, CensusRow>(
      dots.map((d) => [
        d,
        censusRow(d, { email_address: Number(d) <= 4 ? `client${d}@filingservice.net` : `owner${d}@gmail.com` }),
      ]),
    );
    const { rows, excluded } = selectCarriers(dots.map((d) => grant(d)), census, new Map(), new Map(), OPTS);
    expect(excluded["shared-domain"]).toBe(4);
    expect(rows.map((r) => r.dot_number)).toEqual(["5", "6", "7", "8"]);
  });
});

describe("toCsv", () => {
  it("quotes cells that contain commas or quotes", () => {
    const census = new Map([["1", censusRow("1", { legal_name: 'BIG "RIG", LLC' })]]);
    const { rows } = selectCarriers([grant("1")], census, new Map(), new Map(), OPTS);
    const [header, line] = toCsv(rows).trim().split("\n");
    expect(header.split(",")[0]).toBe("tier");
    expect(line).toContain('"Big ""Rig"", LLC"');
  });
});
