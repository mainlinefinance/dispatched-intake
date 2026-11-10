import { describe, expect, it } from "vitest";
import {
  INSTANTLY_COLUMNS,
  buildImport,
  casualCompanyName,
  csvRecords,
  formatMonthDay,
  isDeliverable,
  parseArgs,
  parseCsv,
  readSuppression,
  readVerification,
  toInstantlyCsv,
  type CsvRecord,
  type Suppression,
} from "@/scripts/instantly-import";

const OPTS = { tiers: ["ICP-1"], limit: null, asOf: "2026-11-10" };
const none = (): Suppression => ({ emails: new Set(), domains: new Set() });

function carrier(dot: string, overrides: CsvRecord = {}): CsvRecord {
  return {
    tier: "ICP-1",
    dot_number: dot,
    mc_docket: `MC${dot}`,
    legal_name: `Carrier ${dot} LLC`,
    dba_name: "",
    contact_name: "Jane Doe",
    email: `owner${dot}@gmail.com`,
    email_type: "free",
    city: "Dallas",
    state: "TX",
    power_units: "3",
    drivers: "3",
    authority_granted: "2026-05-01",
    six_month_date: "2026-11-01",
    cargo: "genfreight",
    mcs150_date: "2026-04-15",
    ...overrides,
  };
}

describe("parseArgs", () => {
  it("requires an input file", () => {
    expect(() => parseArgs([], "2026-11-10")).toThrow(/--in/);
  });

  it("defaults to ICP-1 as of today and names the file after both", () => {
    const o = parseArgs(["--in", "c.csv"], "2026-11-10");
    expect(o).toMatchObject({ tiers: ["ICP-1"], asOf: "2026-11-10", limit: null, verified: null, suppress: [] });
    expect(o.out).toBe("outreach-data/instantly-m6-icp1-2026-11-10.csv");
  });

  it("collects repeated --suppress flags and validates tier and limit", () => {
    const o = parseArgs(["--in=c.csv", "--tier", "icp-1,ICP-2", "--limit", "300", "--suppress", "a.csv", "--suppress=b.csv"], "2026-11-10");
    expect(o).toMatchObject({ tiers: ["ICP-1", "ICP-2"], limit: 300, suppress: ["a.csv", "b.csv"] });
    expect(o.out).toBe("outreach-data/instantly-m6-icp1-icp2-2026-11-10.csv");
    expect(() => parseArgs(["--in", "c.csv", "--tier", "ICP-3"], "2026-11-10")).toThrow(/--tier/);
    expect(() => parseArgs(["--in", "c.csv", "--limit", "0"], "2026-11-10")).toThrow(/--limit/);
  });
});

describe("CSV parsing", () => {
  it("handles quotes, escaped quotes, embedded commas and CRLF", () => {
    expect(parseCsv('a,b\r\n"x, y","say ""hi"""\r\n\r\n')).toEqual([
      ["a", "b"],
      ["x, y", 'say "hi"'],
    ]);
  });

  it("keys records by lower-cased header and strips a BOM", () => {
    expect(csvRecords("﻿Email,Result\nA@B.com, ok\n")).toEqual([{ email: "A@B.com", result: "ok" }]);
  });
});

describe("shaping", () => {
  it("formats the six-month date the way the email reads it", () => {
    expect(formatMonthDay("2026-11-03")).toBe("November 3");
    expect(formatMonthDay("2026-10-31")).toBe("October 31");
    expect(formatMonthDay("bad")).toBe("");
  });

  it("drops legal suffixes from company names", () => {
    expect(casualCompanyName("S & P Jones LLC")).toBe("S & P Jones");
    expect(casualCompanyName("Acme Freight, Inc.")).toBe("Acme Freight");
    expect(casualCompanyName("Big Rig L.L.C.")).toBe("Big Rig");
    expect(casualCompanyName("Coastal Carriers")).toBe("Coastal Carriers");
    expect(casualCompanyName("LLC")).toBe("LLC");
  });
});

describe("suppression and verification files", () => {
  it("reads emails and whole domains from a plain list", () => {
    const s = readSuppression("stop@one.com\n@filingservice.net\ntwo.com\n\nNOT AN ENTRY\n");
    expect([...s.emails]).toEqual(["stop@one.com"]);
    expect([...s.domains].sort()).toEqual(["filingservice.net", "two.com"]);
  });

  it("reads the email column of a CSV such as an earlier import file", () => {
    const s = readSuppression("Email,Company Name\nOld@Batch.com,Old Co\n");
    expect([...s.emails]).toEqual(["old@batch.com"]);
  });

  it("reads verifier results and treats only deliverable verdicts as sendable", () => {
    // MillionVerifier: the detailed "result" column wins over "quality".
    const v = readVerification("email,quality,result\na@x.com,good,ok\nb@x.com,risky,catch_all\n");
    expect(v.get("a@x.com")).toBe("ok");
    expect(v.get("b@x.com")).toBe("catch_all");
    expect(readVerification("email,quality\nc@x.com,good\n").get("c@x.com")).toBe("good");
    expect(isDeliverable("ok")).toBe(true);
    expect(isDeliverable("valid")).toBe(true);
    expect(isDeliverable("catch_all")).toBe(false);
    expect(isDeliverable(undefined)).toBe(false);
    expect(() => readVerification("email,notes\na@x.com,hi\n")).toThrow(/verifier file/);
  });
});

describe("buildImport", () => {
  it("maps a carrier to Instantly columns", () => {
    const { rows } = buildImport([carrier("1", { dba_name: "Lone Star Haulers LLC" })], OPTS, none(), null);
    expect(rows).toEqual([
      {
        Email: "owner1@gmail.com",
        "Company Name": "Lone Star Haulers",
        Location: "Dallas, TX",
        Six_Month_Date: "November 1",
        Tier: "ICP-1",
        Trucks: "3",
        Email_Type: "free",
        DOT_Number: "1",
        MC_Docket: "MC1",
        Authority_Date: "2026-05-01",
        Cargo: "genfreight",
        Officer: "Jane Doe",
      },
    ]);
  });

  it("holds back carriers that have not reached six months yet", () => {
    const { rows, dropped } = buildImport(
      [carrier("1"), carrier("2", { six_month_date: "2026-11-11" })],
      OPTS,
      none(),
      null,
    );
    expect(rows.map((r) => r.DOT_Number)).toEqual(["1"]);
    expect(dropped["not-yet-6-months"]).toBe(1);
  });

  it("drops other tiers, suppressed emails and suppressed domains", () => {
    const suppression = readSuppression("owner2@gmail.com\n@blocked.com\n");
    const { rows, dropped } = buildImport(
      [carrier("1"), carrier("2"), carrier("3", { email: "x@blocked.com" }), carrier("4", { tier: "ICP-2" })],
      OPTS,
      suppression,
      null,
    );
    expect(rows.map((r) => r.DOT_Number)).toEqual(["1"]);
    expect(dropped).toMatchObject({ suppressed: 2, "other-tier": 1 });
  });

  it("keeps only verified addresses when a verifier file is given", () => {
    const verification = new Map([
      ["owner1@gmail.com", "ok"],
      ["owner2@gmail.com", "catch_all"],
    ]);
    const { rows, dropped } = buildImport([carrier("1"), carrier("2"), carrier("3")], OPTS, none(), verification);
    expect(rows.map((r) => r.DOT_Number)).toEqual(["1"]);
    expect(dropped["not-verified"]).toBe(2);
  });

  it("sorts newest anniversary first, then larger fleets, and applies the limit", () => {
    const { rows, dropped } = buildImport(
      [
        carrier("1", { six_month_date: "2026-10-20", power_units: "9" }),
        carrier("2", { six_month_date: "2026-11-05", power_units: "2" }),
        carrier("3", { six_month_date: "2026-11-05", power_units: "6" }),
      ],
      { ...OPTS, limit: 2 },
      none(),
      null,
    );
    expect(rows.map((r) => r.DOT_Number)).toEqual(["3", "2"]);
    expect(dropped["over-limit"]).toBe(1);
  });
});

describe("toInstantlyCsv", () => {
  it("puts Email first and keeps every header within Instantly's 20-character limit", () => {
    const { rows } = buildImport([carrier("1", { legal_name: 'Big "Rig", LLC' })], OPTS, none(), null);
    const [header, line] = toInstantlyCsv(rows).trim().split("\n");
    expect(header.split(",")[0]).toBe("Email");
    expect(INSTANTLY_COLUMNS.every((c) => c.length <= 20)).toBe(true);
    expect(line).toContain('"Big ""Rig"""');
  });
});
