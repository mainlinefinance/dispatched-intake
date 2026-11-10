#!/usr/bin/env python3
"""Build an outbound prospect list of motor carriers whose operating authority
is between N and M months old (default 6-18), from FMCSA's public data on
data.transportation.gov.

Why this window: under 6 months, most of the lender panel will not look at the
file; past roughly 18 months, the carrier has usually found its capital
already. In between, the carrier qualifies for working capital and still needs
it (see app/owner-operator-financing/no-business-history/page.tsx).

Sources (Socrata, no key needed; set SOCRATA_APP_TOKEN for higher rate limits):
  9mw4-x3tu  AuthHist - All With History   authority grants and their dates
  6eyk-hxee  Carrier  - All With History   current authority status, insurance on file
  az4n-8mr2  Company Census File           phone, email, officer, fleet size

What counts as a prospect:
  - a GRANTED motor property authority (common or contract) served inside
    the window, with no disposition since (not revoked, not out of service);
  - that docket's common or contract authority is still Active, with BIPD
    insurance on file;
  - the census record is Active and has at least one power unit.

Run:
  python3 scripts/prospects/fmcsa_authority_window.py --out prospects.csv
  python3 scripts/prospects/fmcsa_authority_window.py --min-months 6 --max-months 18 \
      --max-power-units 10 --states TX,FL,GA --out tx-fl-ga.csv

The output is contact data about real businesses, many of them sole
proprietors. Keep it out of the repository (prospects*.csv is gitignored).
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter

BASE = "https://data.transportation.gov/resource"
AUTHHIST = "9mw4-x3tu"
CARRIER = "6eyk-hxee"
CENSUS = "az4n-8mr2"

PROPERTY_AUTHORITIES = (
    "MOTOR PROPERTY COMMON CARRIER",
    "MOTOR PROPERTY CONTRACT CARRIER",
)
PAGE = 50_000
BATCH = 200  # values per `in (...)` clause; keeps URLs well under limits

CENSUS_FIELDS = [
    "dot_number", "status_code", "legal_name", "dba_name", "company_officer_1",
    "phone", "cell_phone", "email_address", "power_units", "total_drivers",
    "phy_street", "phy_city", "phy_state", "phy_zip", "carrier_operation",
    "business_org_desc", "add_date", "mcs150_date", "hm_ind",
    "crgo_genfreight", "crgo_coldfood", "crgo_drybulk", "crgo_bldgmat",
    "crgo_machlrg", "crgo_intermodal", "crgo_motoveh",
]

# crgo_construct is omitted: in the census it is always set together with
# crgo_bldgmat, so it adds nothing.
CARGO_LABELS = {
    "crgo_genfreight": "general freight",
    "crgo_coldfood": "refrigerated",
    "crgo_drybulk": "dry bulk",
    "crgo_bldgmat": "building materials",
    "crgo_machlrg": "heavy machinery",
    "crgo_intermodal": "intermodal",
    "crgo_motoveh": "motor vehicles",
}


def soql(dataset: str, params: dict[str, str]) -> list[dict]:
    url = f"{BASE}/{dataset}.json?{urllib.parse.urlencode(params)}"
    headers = {"Accept": "application/json"}
    token = os.environ.get("SOCRATA_APP_TOKEN")
    if token:
        headers["X-App-Token"] = token
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=180) as resp:
                return json.load(resp)
        except (urllib.error.URLError, ConnectionError, TimeoutError) as err:
            if attempt == 4:
                raise
            wait = 2 ** (attempt + 1)
            print(f"  retry in {wait}s after: {err}", file=sys.stderr)
            time.sleep(wait)
    return []


def months_back(today: dt.date, months: int) -> dt.date:
    y, m = divmod(today.year * 12 + today.month - 1 - months, 12)
    m += 1
    # clamp the day for short months
    for day in (today.day, 30, 29, 28):
        try:
            return dt.date(y, m, day)
        except ValueError:
            continue
    raise AssertionError("unreachable")


def parse_mdy(value: str | None) -> dt.date | None:
    if not value:
        return None
    try:
        return dt.datetime.strptime(value, "%m/%d/%Y").date()
    except ValueError:
        return None


def quoted(values) -> str:
    return ",".join("'" + v.replace("'", "''") + "'" for v in values)


def fetch_grants(start: dt.date, end: dt.date) -> dict[str, dict]:
    """Earliest qualifying grant per docket, served within [start, end]."""
    years = range(start.year, end.year + 1)
    year_clause = " OR ".join(f"orig_served_date like '%/{y}'" for y in years)
    where = (
        "original_action_desc='GRANTED' AND disp_action_desc IS NULL"
        f" AND mod_col_1 in ({quoted(PROPERTY_AUTHORITIES)})"
        f" AND ({year_clause})"
    )
    grants: dict[str, dict] = {}
    offset = 0
    while True:
        rows = soql(AUTHHIST, {
            "$select": "docket_number,dot_number,mod_col_1,orig_served_date",
            "$where": where,
            "$order": "docket_number",
            "$limit": str(PAGE),
            "$offset": str(offset),
        })
        for r in rows:
            served = parse_mdy(r.get("orig_served_date"))
            if not served or not (start <= served <= end):
                continue
            docket = r["docket_number"]
            prev = grants.get(docket)
            if prev is None or served < prev["granted"]:
                grants[docket] = {
                    "docket": docket,
                    "dot": r.get("dot_number", "").lstrip("0"),
                    "authority": r.get("mod_col_1", ""),
                    "granted": served,
                }
        print(f"  authhist: {offset + len(rows)} rows read, {len(grants)} dockets in window",
              file=sys.stderr)
        if len(rows) < PAGE:
            return grants
        offset += PAGE


def fetch_batched(dataset: str, key: str, values: list[str], select: str) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for i in range(0, len(values), BATCH):
        chunk = values[i:i + BATCH]
        rows = soql(dataset, {
            "$select": select,
            "$where": f"{key} in ({quoted(chunk)})",
            "$limit": str(BATCH * 4),
        })
        for r in rows:
            out[r[key]] = r
        if (i // BATCH) % 20 == 0:
            print(f"  {dataset}: {min(i + BATCH, len(values))}/{len(values)}", file=sys.stderr)
    return out


def fleet_segment(power_units: int) -> str:
    if power_units <= 1:
        return "owner-operator"
    if power_units <= 10:
        return "small fleet (2-10)"
    if power_units <= 50:
        return "mid fleet (11-50)"
    return "large fleet (51+)"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--min-months", type=int, default=6)
    ap.add_argument("--max-months", type=int, default=18)
    ap.add_argument("--as-of", type=dt.date.fromisoformat, default=dt.date.today(),
                    help="reference date, YYYY-MM-DD (default: today)")
    ap.add_argument("--min-power-units", type=int, default=1)
    ap.add_argument("--max-power-units", type=int, default=None)
    ap.add_argument("--states", default="", help="comma-separated physical states, e.g. TX,FL")
    ap.add_argument("--require-contact", choices=["none", "phone", "email", "any"], default="any")
    ap.add_argument("--out", default="prospects.csv")
    args = ap.parse_args()

    start = months_back(args.as_of, args.max_months)
    end = months_back(args.as_of, args.min_months)
    print(f"Authority granted {start} .. {end} "
          f"({args.min_months}-{args.max_months} months before {args.as_of})", file=sys.stderr)

    grants = fetch_grants(start, end)

    carriers = fetch_batched(
        CARRIER, "docket_number", sorted(grants),
        "docket_number,common_stat,contract_stat,bipd_file,cargo_file",
    )
    active = {}
    for docket, g in grants.items():
        c = carriers.get(docket)
        if not c:
            continue
        if "A" not in (c.get("common_stat"), c.get("contract_stat")):
            continue
        if int(c.get("bipd_file") or 0) <= 0:
            continue
        active[docket] = {**g, "bipd_file_k": int(c["bipd_file"]),
                          "cargo_on_file": c.get("cargo_file", "")}
    print(f"Active with insurance on file: {len(active)} of {len(grants)}", file=sys.stderr)

    dots = sorted({g["dot"] for g in active.values() if g["dot"]})
    census = fetch_batched(CENSUS, "dot_number", dots, ",".join(CENSUS_FIELDS))

    states = {s.strip().upper() for s in args.states.split(",") if s.strip()}
    rows = []
    for g in active.values():
        c = census.get(g["dot"])
        if not c or c.get("status_code") != "A":
            continue
        pu = int(c.get("power_units") or 0)
        if pu < args.min_power_units:
            continue
        if args.max_power_units is not None and pu > args.max_power_units:
            continue
        state = (c.get("phy_state") or "").upper()
        if states and state not in states:
            continue
        phone = c.get("cell_phone") or c.get("phone") or ""
        email = (c.get("email_address") or "").strip().lower()
        need = args.require_contact
        if (need == "phone" and not phone) or (need == "email" and not email) or \
           (need == "any" and not (phone or email)):
            continue
        age_days = (args.as_of - g["granted"]).days
        rows.append({
            "mc_number": g["docket"],
            "dot_number": g["dot"],
            "legal_name": c.get("legal_name", ""),
            "dba_name": c.get("dba_name", ""),
            "officer": c.get("company_officer_1", ""),
            "phone": c.get("phone", ""),
            "cell_phone": c.get("cell_phone", ""),
            "email": email,
            "street": c.get("phy_street", ""),
            "city": c.get("phy_city", ""),
            "state": state,
            "zip": (c.get("phy_zip") or "")[:5],
            "authority": g["authority"],
            "authority_granted": g["granted"].isoformat(),
            "authority_age_months": round(age_days / 30.44, 1),
            "power_units": pu,
            "drivers": int(c.get("total_drivers") or 0),
            "segment": fleet_segment(pu),
            "business_type": c.get("business_org_desc", ""),
            "hazmat": c.get("hm_ind", ""),
            "cargo": "; ".join(label for f, label in CARGO_LABELS.items() if c.get(f) == "X"),
            "bipd_on_file_k": g["bipd_file_k"],
            "mcs150_date": c.get("mcs150_date", ""),
        })

    rows.sort(key=lambda r: (r["state"], -r["authority_age_months"]))
    if not rows:
        print("No prospects matched.", file=sys.stderr)
        return 1
    with open(args.out, "w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)

    print(f"\nWrote {len(rows)} prospects to {args.out}", file=sys.stderr)
    print("By segment:", dict(Counter(r["segment"] for r in rows).most_common()), file=sys.stderr)
    print("Top states:", Counter(r["state"] for r in rows).most_common(10), file=sys.stderr)
    print(f"With email: {sum(1 for r in rows if r['email'])}, "
          f"with phone: {sum(1 for r in rows if r['phone'] or r['cell_phone'])}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
