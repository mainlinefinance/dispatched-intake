import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  ADDRESS_PLACEHOLDER,
  SEQUENCE_DOC,
  applyConditions,
  parseArgs,
  parseSequenceDoc,
  previewMarkdown,
  renderSequence,
  renderTemplate,
  seededRandom,
  varsForRow,
  type Vars,
} from "@/scripts/render-sequence";

const doc = readFileSync(path.resolve(__dirname, "..", SEQUENCE_DOC), "utf8");
const steps = parseSequenceDoc(doc);

const carrier: Vars = {
  email: "owner@tmjtransport.com",
  companyName: "TMJ Transport",
  location: "Dallas, TX",
  Six_Month_Date: "November 3",
  Tier: "ICP-1",
  Trucks: "2",
  DOT_Number: "4512345",
  sendingAccountFirstName: "Angelo",
};

const first = () => 0; // always picks the first spintax option
const last = () => 0.999; // always picks the last

describe("the campaign doc", () => {
  it("has three steps, with a subject only on step 1", () => {
    expect(steps.map((s) => s.step)).toEqual([1, 2, 3]);
    expect(steps[0].subject).toContain("{{companyName}}");
    expect(steps[1].subject).toBeNull();
    expect(steps[2].subject).toBeNull();
    expect(steps[0].timing).toBe("(day 0)");
  });

  it("puts the legal footer on every step", () => {
    for (const s of steps) {
      expect(s.body).toContain(ADDRESS_PLACEHOLDER);
      expect(s.body).toContain('Reply "stop"');
    }
  });

  it("renders every step fully for both tiers, with any spintax pick", () => {
    for (const tier of ["ICP-1", "ICP-2"]) {
      for (const rand of [first, last, seededRandom("x")]) {
        for (const s of steps) {
          const text = renderTemplate(`${s.subject ?? ""}\n${s.body}`, { ...carrier, Tier: tier }, rand);
          expect(text).not.toMatch(/\{\{|\}\}|\{%|%\}/);
        }
      }
    }
  });

  it("adds the fleet line only for 2–10-truck carriers", () => {
    const icp1 = renderTemplate(steps[0].body, carrier, first);
    const icp2 = renderTemplate(steps[0].body, { ...carrier, Tier: "ICP-2" }, first);
    expect(icp1).toContain("With 2 trucks running, it's also the point where financing the next one starts to make sense.");
    expect(icp2).not.toContain("trucks running");
    expect(icp2).toContain("working capital and equipment financing.");
    expect(icp1).toContain("The MC authority for TMJ Transport turned 6 months old on November 3.");
  });
});

describe("renderTemplate", () => {
  it("resolves spintax, including variables inside options", () => {
    expect(renderTemplate("{{RANDOM | Hi {{companyName}} | Hello}}", carrier, first)).toBe("Hi TMJ Transport");
    expect(renderTemplate("{{RANDOM | Hi {{companyName}} | Hello}}", carrier, last)).toBe("Hello");
  });

  it("uses fallbacks for missing or empty variables", () => {
    expect(renderTemplate("{{firstName | there}}", { ...carrier, firstName: "" }, first)).toBe("there");
    expect(renderTemplate("{{companyName | your company}}", carrier, first)).toBe("TMJ Transport");
  });

  it("rejects unknown variables and unsupported Liquid", () => {
    expect(() => renderTemplate("{{Six_Month_date}}", carrier, first)).toThrow(/unknown variable/);
    expect(() => applyConditions('{% if Tier == "ICP-1" %}a{% else %}b{% endif %}', carrier)).toThrow(/unsupported Liquid/);
    expect(() => applyConditions('{% if Size == "big" %}a{% endif %}', carrier)).toThrow(/unknown variable/);
    expect(() => renderTemplate("{{RANDOM | a | b", carrier, first)).toThrow(/unclosed/);
  });

  it("is deterministic for the same seed", () => {
    const a = renderTemplate(steps[0].body, carrier, seededRandom("owner@x.com#1"));
    const b = renderTemplate(steps[0].body, carrier, seededRandom("owner@x.com#1"));
    expect(a).toBe(b);
  });
});

describe("renderSequence", () => {
  it("threads follow-ups under the step 1 subject and fills the address", () => {
    const emails = renderSequence(steps, carrier, "TMJ", "seed", "Dispatched, Inc., PO Box 1, Dallas, TX");
    expect(emails).toHaveLength(3);
    expect(emails[1].subject).toBe(`Re: ${emails[0].subject}`);
    expect(emails[2].subject).toBe(`Re: ${emails[0].subject}`);
    for (const e of emails) {
      expect(e.text).toContain("PO Box 1");
      expect(e.text).not.toContain(ADDRESS_PLACEHOLDER);
      expect(e.text).toContain("Angelo");
    }
  });

  it("flags a missing postal address in the preview", () => {
    const emails = renderSequence(steps, carrier, "TMJ", "seed", null);
    expect(previewMarkdown(emails, "2026-11-10", false)).toContain("Footer not ready");
    expect(previewMarkdown(emails, "2026-11-10", true)).not.toContain("Footer not ready");
  });
});

describe("varsForRow", () => {
  it("maps Instantly's predefined columns to camelCase and keeps custom headers", () => {
    const headers = ["Email", "Company Name", "Location", "Six_Month_Date", "Tier"];
    const row = { email: "a@b.com", "company name": "TMJ Transport", location: "Dallas, TX", six_month_date: "November 3", tier: "ICP-1" };
    expect(varsForRow(row, headers, "Angelo")).toEqual({
      sendingAccountFirstName: "Angelo",
      email: "a@b.com",
      companyName: "TMJ Transport",
      location: "Dallas, TX",
      Six_Month_Date: "November 3",
      Tier: "ICP-1",
    });
  });
});

describe("parseArgs", () => {
  it("requires --in and defaults sender and address to visible placeholders", () => {
    expect(() => parseArgs([])).toThrow(/--in/);
    expect(parseArgs(["--in", "f.csv"])).toEqual({ in: "f.csv", count: 5, sender: "[SENDER]", address: null, outDir: "outreach-data" });
  });
});
