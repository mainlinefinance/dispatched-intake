/* Primary sources cited under blog posts and glossary terms.

   Every entry is a regulator, statute, standards body or public statistical
   agency: the place a reader (or an answer engine) can check what the page
   says. The catalog is deliberately small and stable, and each URL was
   checked to resolve when it was added. Nothing commercial belongs here.

   Pages do not carry their own source lists. A page's sources are picked by
   matching its slug and title against RULES, then topped up from the defaults
   for its category, so a new post or term is cited the day it is added. */

export type Citation = {
  readonly name: string;
  readonly publisher: string;
  readonly url: string;
};

const SOURCES = {
  hos: {
    name: "Hours of Service (HOS)",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/regulations/hours-of-service",
  },
  cfr395: {
    name: "49 CFR Part 395 — Hours of Service of Drivers",
    publisher: "Electronic Code of Federal Regulations",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-395",
  },
  cfr387: {
    name: "49 CFR Part 387 — Minimum Levels of Financial Responsibility for Motor Carriers",
    publisher: "Electronic Code of Federal Regulations",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387",
  },
  cfr376: {
    name: "49 CFR Part 376 — Lease and Interchange of Vehicles",
    publisher: "Electronic Code of Federal Regulations",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-376",
  },
  registration: {
    name: "FMCSA Registration",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/registration",
  },
  insuranceFilings: {
    name: "Insurance Filing Requirements",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/registration/insurance-requirements",
  },
  safer: {
    name: "Safety and Fitness Electronic Records (SAFER) System",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://safer.fmcsa.dot.gov/",
  },
  csa: {
    name: "Compliance, Safety, Accountability (CSA)",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://csa.fmcsa.dot.gov/",
  },
  eld: {
    name: "Electronic Logging Devices",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/hours-service/elds/electronic-logging-devices",
  },
  cdl: {
    name: "Commercial Driver's License Program",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
  },
  clearinghouse: {
    name: "Drug & Alcohol Clearinghouse",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://clearinghouse.fmcsa.dot.gov/",
  },
  ucr: {
    name: "Unified Carrier Registration Plan",
    publisher: "UCR Plan",
    url: "https://plan.ucr.gov/",
  },
  ifta: {
    name: "International Fuel Tax Agreement",
    publisher: "International Fuel Tax Association, Inc.",
    url: "https://www.iftach.org/",
  },
  irp: {
    name: "International Registration Plan",
    publisher: "International Registration Plan, Inc.",
    url: "https://www.irponline.org/",
  },
  form2290: {
    name: "About Form 2290, Heavy Highway Vehicle Use Tax Return",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/forms-pubs/about-form-2290",
  },
  pub463: {
    name: "Publication 463, Travel, Gift, and Car Expenses",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/publications/p463",
  },
  pub946: {
    name: "Publication 946, How To Depreciate Property",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/publications/p946",
  },
  selfEmployed: {
    name: "Self-employed individuals tax center",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center",
  },
  diesel: {
    name: "Gasoline and Diesel Fuel Update",
    publisher: "U.S. Energy Information Administration",
    url: "https://www.eia.gov/petroleum/gasdiesel/",
  },
  atri: {
    name: "Operational Costs of Trucking and related research",
    publisher: "American Transportation Research Institute",
    url: "https://truckingresearch.org/",
  },
  sba: {
    name: "SBA loans: 7(a), 504 and microloans",
    publisher: "U.S. Small Business Administration",
    url: "https://www.sba.gov/funding-programs/loans",
  },
  fedSmallBusiness: {
    name: "Small Business Credit Survey",
    publisher: "Federal Reserve Banks",
    url: "https://www.fedsmallbusiness.org/",
  },
  ucc9: {
    name: "Uniform Commercial Code, Article 9 — Secured Transactions",
    publisher: "Legal Information Institute, Cornell Law School",
    url: "https://www.law.cornell.edu/ucc/9",
  },
  dfpi: {
    name: "Department of Financial Protection and Innovation",
    publisher: "State of California",
    url: "https://dfpi.ca.gov/",
  },
  naic: {
    name: "Consumer insurance information",
    publisher: "National Association of Insurance Commissioners",
    url: "https://content.naic.org/consumer",
  },
  iii: {
    name: "Insurance Information Institute",
    publisher: "Triple-I",
    url: "https://www.iii.org/",
  },
  hazmatEndorsement: {
    name: "HAZMAT Endorsement",
    publisher: "Transportation Security Administration",
    url: "https://www.tsa.gov/for-industry/hazmat-endorsement",
  },
  phmsa: {
    name: "Pipeline and Hazardous Materials Safety Administration",
    publisher: "U.S. Department of Transportation",
    url: "https://www.phmsa.dot.gov/",
  },
  bls: {
    name: "Occupational Outlook Handbook: Heavy and Tractor-Trailer Truck Drivers",
    publisher: "U.S. Bureau of Labor Statistics",
    url: "https://www.bls.gov/ooh/transportation-and-material-moving/heavy-and-tractor-trailer-truck-drivers.htm",
  },
  cvsa: {
    name: "North American Standard Inspection Program",
    publisher: "Commercial Vehicle Safety Alliance",
    url: "https://www.cvsa.org/inspections/",
  },
  bts: {
    name: "Freight and transportation statistics",
    publisher: "Bureau of Transportation Statistics",
    url: "https://www.bts.gov/",
  },
  carb: {
    name: "Truck and bus programs",
    publisher: "California Air Resources Board",
    url: "https://ww2.arb.ca.gov/",
  },
  ein: {
    name: "Get an employer identification number",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number",
  },
  carmack: {
    name: "49 U.S.C. § 14706 — Liability of carriers under receipts and bills of lading",
    publisher: "Legal Information Institute, Cornell Law School",
    url: "https://www.law.cornell.edu/uscode/text/49/14706",
  },
  cfr373: {
    name: "49 CFR Part 373 — Receipts and Bills",
    publisher: "Electronic Code of Federal Regulations",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-373",
  },
  cfr391: {
    name: "49 CFR Part 391 — Qualifications of Drivers",
    publisher: "Electronic Code of Federal Regulations",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-391",
  },
  cfr383: {
    name: "49 CFR Part 383 — Commercial Driver's License Standards",
    publisher: "Electronic Code of Federal Regulations",
    url: "https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383",
  },
  nacha: {
    name: "Same Day ACH",
    publisher: "Nacha",
    url: "https://www.nacha.org/content/same-day-ach",
  },
  creditScores: {
    name: "Credit reports and scores",
    publisher: "Consumer Financial Protection Bureau",
    url: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/",
  },
  scac: {
    name: "Standard Carrier Alpha Code (SCAC)",
    publisher: "National Motor Freight Traffic Association",
    url: "https://nmfta.org/scac/",
  },
  form4136: {
    name: "About Form 4136, Credit For Federal Tax Paid On Fuels",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/forms-pubs/about-form-4136",
  },
  contractor: {
    name: "Independent contractor (self-employed) or employee?",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee",
  },
  form1099nec: {
    name: "About Form 1099-NEC, Nonemployee Compensation",
    publisher: "Internal Revenue Service",
    url: "https://www.irs.gov/forms-pubs/about-form-1099-nec",
  },
  medical: {
    name: "Driver medical requirements",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.fmcsa.dot.gov/regulations/medical",
  },
  psp: {
    name: "Pre-Employment Screening Program",
    publisher: "Federal Motor Carrier Safety Administration",
    url: "https://www.psp.fmcsa.dot.gov/",
  },
  ata: {
    name: "American Trucking Associations",
    publisher: "American Trucking Associations",
    url: "https://www.trucking.org/",
  },
  fhwaFreight: {
    name: "Freight Management and Operations",
    publisher: "Federal Highway Administration",
    url: "https://ops.fhwa.dot.gov/freight/",
  },
} as const satisfies Record<string, Citation>;

type SourceKey = keyof typeof SOURCES;

/* Matched against "<slug> <title>" in lowercase. Order is priority: the
   first rules to match fill the list first. */
const RULES: ReadonlyArray<readonly [RegExp, ReadonlyArray<SourceKey>]> = [
  [/\bhos\b|hours[- ]of[- ]service|sleeper|34-hour|restart|11-hour|14-hour|30-minute|personal conveyance|yard move|short-haul|layover|detention/, ["hos", "cfr395"]],
  [/\beld\b|electronic log|logbook/, ["eld", "cfr395"]],
  [/\bcsa\b|\bbasic\b|safety (score|rating)|dataq|out-of-service|inspection|roadside|dvir|\bcvsa\b/, ["csa", "cvsa", "safer"]],
  [/fuel[- ]tax[- ]credit|4136/, ["form4136", "selfEmployed"]],
  [/\bifta\b|fuel tax(?![- ]credit)/, ["ifta"]],
  [/\birp\b|apportion|registration plan|base plate/, ["irp"]],
  [/\bucr\b|unified carrier/, ["ucr"]],
  [/2290|hvut|heavy (highway )?vehicle use/, ["form2290"]],
  [/\bein\b|employer identification/, ["ein", "selfEmployed"]],
  [/\bscac\b/, ["scac", "registration"]],
  [/\bata\b|american trucking assoc/, ["ata", "atri"]],
  [/1099/, ["form1099nec", "contractor", "selfEmployed"]],
  [/independent[- ]contractor|misclassif|\bab ?5\b/, ["contractor", "selfEmployed"]],
  [/per[- ]diem|meal|tax[- ]home/, ["pub463", "hos"]],
  [/depreciat|section 179|macrs|write[- ]off/, ["pub946"]],
  [/schedule c|self[- ]employ|quarterly|\bs[- ]corp\b|\bllc\b|\btax/, ["selfEmployed"]],
  [/hazmat|twic|x[- ]endorsement/, ["hazmatEndorsement", "phmsa", "cfr383"]],
  [/endorsement|\bcdl\b|\bclp\b|entry[- ]level|\beldt\b/, ["cdl", "cfr383"]],
  [/medical|physical(?![- ]damage)|medc|driver qualification|\bdq file/, ["medical", "cfr391"]],
  [/pre[- ]employment|\bpsp\b|background|\bmvr\b/, ["psp", "cfr391"]],
  [/drug|alcohol|clearinghouse/, ["clearinghouse", "cfr391"]],
  [/\bbol\b|bill of lading|\bpod\b|proof of delivery|freight bill|weight[- ]ticket|freight[- ]class/, ["cfr373", "carmack"]],
  [/cargo[- ]claim|carmack|freight claim|shortage|\bos&d\b/, ["carmack", "cfr373"]],
  [/\bmc[- ]?(number|#)|\bdot[- ]?number|usdot|operating authority|new authority|\bboc-?3\b|mcs-?150|deactivat|broker (bond|vetting|authority)|freight broker|bmc-?8[45]|double broker|carrier packet|rate con/, ["registration", "safer"]],
  [/lease[- ](on|purchase|operator)|leased|truth[- ]in[- ]leasing|escrow|settlement|carrier[- ]deduction|chargeback/, ["cfr376"]],
  [/mcs-?90|primary liability|\bbipd\b|cargo|bobtail(?![- ]pay)|non[- ]trucking|physical damage|occupational accident|general liability|umbrella|insur|premium|claim|nuclear verdict|loss run|certificate of insurance|\bcoi\b|reefer breakdown|deductible/, ["insuranceFilings", "cfr387", "naic"]],
  [/\bsba\b/, ["sba"]],
  [/\bach\b|wire|lockbox|remittance|quick[- ]?pay/, ["nacha"]],
  [/\bfico\b|credit score|credit report|business credit|paydex|bad[- ]credit/, ["creditScores", "fedSmallBusiness"]],
  [/factor|invoice|receivable|recourse|advance rate|reserve|\bucc\b|lien|notice of assignment|\bnoa\b|collateral|secured|asset[- ]based|\babl\b/, ["ucc9", "fedSmallBusiness"]],
  [/merchant cash|\bmca\b|disclosure|\bapr\b|factor rate/, ["dfpi", "fedSmallBusiness"]],
  [/loan|financ|working capital|line of credit|down payment|balloon|refinanc|buyback|term sheet|dscr|personal guarantee|interest/, ["fedSmallBusiness", "sba", "ucc9"]],
  [/diesel|fuel|surcharge|\bdef\b/, ["diesel"]],
  [/overweight|axle|oversize|bridge formula|intermodal|drayage|port|chassis/, ["fhwaFreight", "bts"]],
  [/cost per mile|\bcpm\b|\brpm\b|deadhead|rate per mile|operating (cost|ratio)|profit|revenue|break[- ]?even|spot (rate|market)|contract rate|load board|dispatch|lumper|accessorial|tonu|backhaul|headhaul|lane|freight|broker[- ]spread|all[- ]in[- ]rate|dry[- ]van|flatbed|reefer|\bltl\b|\bftl\b|hot[- ]shot|expedited|demurrage|dock/, ["atri", "bts"]],
  [/pay\b|wage|bonus|home ?time|team|\botr\b|regional|orientation|sign[- ]on|slip[- ]seat|trip[- ]sheet|driver/, ["bls", "atri"]],
  [/carb|emission|clean truck|smartway/, ["carb"]],
  [/telematics|\btms\b|geofenc|fleet[- ]management|dash ?cam|gps/, ["atri", "csa"]],
];

const GLOSSARY_DEFAULTS: Record<string, ReadonlyArray<SourceKey>> = {
  "operating-authority-compliance": ["registration", "safer"],
  "factoring-cash-flow": ["ucc9", "fedSmallBusiness"],
  "operator-types": ["cfr376", "registration", "bls"],
  "trucking-operations": ["atri", "bts", "fhwaFreight"],
  "trucking-finance": ["fedSmallBusiness", "sba", "ucc9"],
  "insurance-and-risk": ["insuranceFilings", "cfr387", "naic"],
  "driver-life-work": ["bls", "atri", "cfr376"],
  "tax-and-accounting": ["selfEmployed", "contractor", "form1099nec"],
  "tech-and-telematics": ["atri", "csa", "eld"],
};

const BLOG_DEFAULTS: Record<string, ReadonlyArray<SourceKey>> = {
  "owner-operator-economics": ["atri", "bts", "selfEmployed"],
  "operations-and-compliance": ["registration", "csa", "safer"],
  "factoring-and-cash-flow": ["ucc9", "fedSmallBusiness", "atri"],
  "equipment-and-financing": ["fedSmallBusiness", "sba", "ucc9"],
  "insurance-and-risk": ["insuranceFilings", "cfr387", "naic"],
  "industry-trends": ["bts", "atri", "diesel"],
};

const MIN_SOURCES = 2;
const MAX_SOURCES = 4;

function pick(
  haystack: string,
  defaults: ReadonlyArray<SourceKey>,
): ReadonlyArray<Citation> {
  const text = haystack.toLowerCase();
  const keys: SourceKey[] = [];
  const add = (key: SourceKey) => {
    if (keys.length < MAX_SOURCES && !keys.includes(key)) keys.push(key);
  };
  for (const [pattern, sources] of RULES) {
    if (pattern.test(text)) sources.forEach(add);
  }
  // Top up from the category so every page cites at least two sources and a
  // narrowly matched page still points at the general reference for its area.
  for (const key of defaults) {
    if (keys.length >= Math.max(MIN_SOURCES, 3)) break;
    add(key);
  }
  return keys.map((key) => SOURCES[key]);
}

export function citationsForGlossaryTerm(term: {
  slug: string;
  term: string;
  category: string;
}): ReadonlyArray<Citation> {
  return pick(
    `${term.slug} ${term.term}`,
    GLOSSARY_DEFAULTS[term.category] ?? ["registration", "bts"],
  );
}

export function citationsForPost(post: {
  slug: string;
  title: string;
  topic: string;
}): ReadonlyArray<Citation> {
  return pick(
    `${post.slug} ${post.title}`,
    BLOG_DEFAULTS[post.topic] ?? ["atri", "bts"],
  );
}

export const ALL_CITATIONS: ReadonlyArray<Citation> = Object.values(SOURCES);
