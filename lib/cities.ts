import "server-only";

/* ===========================================================================
   City content is authored as two independent records that merge at read time:

     StateData     - 14 fields shared across every city in the state (lender
                     panel, licensing authority, corridors, tax notes, etc.)
     CityData      - 14 fields unique per city (local stats, weather context,
                     proof cards, refresh date)

   The exported `City` type is the merged flat shape the geo template consumes,
   preserved byte-for-byte from the original schema so the rendering code at
   app/trucking-loans/[state]/[city]/page.tsx continues to work unchanged.

   Adding a second Texas city now only requires a new CityData entry in
   CITY_CORES.texas — StateData.texas is reused automatically. The 14 shared
   fields stop being a 14× duplication tax per added city.
   =========================================================================== */

export type ProofCard = {
  use: string;
  amount: string;
  time: string;
  cityNeighborhood: string;
  truckType: string;
  fleetSize?: string;
};

// Flat type the geo page consumes. Do not change field shapes without
// updating app/trucking-loans/[state]/[city]/page.tsx in lockstep.
export type City = {
  state: string;
  stateAbbr: string;
  stateSlug: string;
  city: string;
  citySlug: string;
  aprRangeLow: string;
  aprRangeHigh: string;
  localStatOperatorCount: string;
  localStatFundedCount: string;
  localStatMedianAmount: string;
  localStatMedianHours: string;
  dataRefreshDate: string;
  statePrimaryCorridor: string;
  stateSecondaryCorridor: string;
  cityWeatherContext: string;
  cityCostPressure: string;
  citySeasonalMonth: string;
  cityAvgRepairCost: string;
  stateLenderPanelCount: number;
  stateLenderExample1: string;
  stateLenderExample2: string;
  stateCommonFactor: string;
  proofCards: [ProofCard, ProofCard, ProofCard];
  stateLicensingAuthority: string;
  stateLicensingCitation: string;
  stateLicenseType: string;
  stateSalesTaxNote: string;
  stateTaxAuthority: string;
};

// Public type returned by getState() / getAllStates() for the state-index page.
export type StateInfo = {
  name: string;
  abbr: string;
  slug: string;
  primaryCorridor: string;
  secondaryCorridor: string;
  lenderPanelCount: number;
  lenderExample1: string;
  lenderExample2: string;
  licensingAuthority: string;
  licenseType: string;
  cities: CityInfo[];
};

export type CityInfo = { city: string; citySlug: string };

type StateData = {
  name: string;
  abbr: string;
  slug: string;
  primaryCorridor: string;
  secondaryCorridor: string;
  lenderPanelCount: number;
  lenderExample1: string;
  lenderExample2: string;
  commonFactor: string;
  licensingAuthority: string;
  licensingCitation: string;
  licenseType: string;
  salesTaxNote: string;
  taxAuthority: string;
};

type CityData = {
  city: string;
  citySlug: string;
  aprRangeLow: string;
  aprRangeHigh: string;
  localStatOperatorCount: string;
  localStatFundedCount: string;
  localStatMedianAmount: string;
  localStatMedianHours: string;
  dataRefreshDate: string;
  cityWeatherContext: string;
  cityCostPressure: string;
  citySeasonalMonth: string;
  cityAvgRepairCost: string;
  proofCards: [ProofCard, ProofCard, ProofCard];
};

// Low-coverage guard: a state with <3 panel lenders should not publish pages
// that claim "N lenders actively funding". State-index and city pages both
// 301-redirect to /trucking below this threshold.
export const LOW_COVERAGE_THRESHOLD = 3;

const STATES: Record<string, StateData> = {
  texas: {
    name: "Texas",
    abbr: "TX",
    slug: "texas",
    primaryCorridor: "I-10 Houston–El Paso",
    secondaryCorridor: "I-35 San Antonio–Dallas",
    lenderPanelCount: 17,
    lenderExample1: "Lone Star Commercial Capital",
    lenderExample2: "South Loop Lending",
    commonFactor: "TBS Factoring",
    licensingAuthority: "the Texas Office of Consumer Credit Commissioner",
    licensingCitation: "Tex. Fin. Code §§ 342, 393",
    licenseType: "OCCC regulated lender license",
    salesTaxNote: "does not apply sales tax to interstate freight hauls",
    taxAuthority: "Texas Comptroller",
  },
  florida: {
    name: "Florida",
    abbr: "FL",
    slug: "florida",
    primaryCorridor: "I-95 Jacksonville–Miami",
    secondaryCorridor: "I-10 Jacksonville–Tallahassee",
    lenderPanelCount: 14,
    lenderExample1: "First Coast Commercial",
    lenderExample2: "Sunshine State Working Capital",
    commonFactor: "RTS Financial",
    licensingAuthority: "the Florida Office of Financial Regulation",
    licensingCitation: "Fla. Stat. ch. 516, 537",
    licenseType: "OFR consumer finance or commercial lender registration",
    salesTaxNote: "exempts common-carrier freight from sales tax",
    taxAuthority: "Florida Department of Revenue",
  },
  california: {
    name: "California",
    abbr: "CA",
    slug: "california",
    primaryCorridor: "I-5 Central Valley",
    secondaryCorridor: "SR-99 Bakersfield–Sacramento",
    lenderPanelCount: 12,
    lenderExample1: "Central Valley Commercial Finance",
    lenderExample2: "Pacific Freight Capital",
    commonFactor: "OTR Capital",
    licensingAuthority:
      "the California Department of Financial Protection and Innovation",
    licensingCitation: "Cal. Fin. Code § 22000 et seq. (CFL)",
    licenseType: "California Financing Law license",
    salesTaxNote:
      "has a commercial-financing disclosure law (SB 1235) that requires APR and total-cost disclosure before you sign",
    taxAuthority: "California Department of Tax and Fee Administration",
  },
  georgia: {
    name: "Georgia",
    abbr: "GA",
    slug: "georgia",
    primaryCorridor: "I-75 Atlanta–Macon",
    secondaryCorridor: "I-16 Macon–Savannah",
    lenderPanelCount: 11,
    lenderExample1: "Peach State Commercial Capital",
    lenderExample2: "Southeast Freight Lending",
    commonFactor: "Apex Capital",
    licensingAuthority: "the Georgia Department of Banking and Finance",
    licensingCitation: "O.C.G.A. § 7-3-1 et seq. (GILA)",
    licenseType: "Georgia Installment Loan license",
    salesTaxNote:
      "exempts interstate common-carrier freight from sales and use tax",
    taxAuthority: "Georgia Department of Revenue",
  },
  illinois: {
    name: "Illinois",
    abbr: "IL",
    slug: "illinois",
    primaryCorridor: "I-80 Chicago–Quad Cities",
    secondaryCorridor: "I-55 Chicago–St. Louis",
    lenderPanelCount: 13,
    lenderExample1: "Midwest Freight Capital",
    lenderExample2: "Lakeshore Commercial Lending",
    commonFactor: "TAFS Inc.",
    licensingAuthority:
      "the Illinois Department of Financial and Professional Regulation",
    licensingCitation: "205 ILCS 670 (Consumer Installment Loan Act)",
    licenseType: "IDFPR consumer installment lender license",
    salesTaxNote:
      "exempts rolling-stock used in interstate commerce from sales and use tax",
    taxAuthority: "Illinois Department of Revenue",
  },
  tennessee: {
    name: "Tennessee",
    abbr: "TN",
    slug: "tennessee",
    primaryCorridor: "I-40 Memphis–Nashville",
    secondaryCorridor: "I-24 Nashville–Chattanooga",
    lenderPanelCount: 10,
    lenderExample1: "Volunteer State Commercial Finance",
    lenderExample2: "Mid-South Freight Capital",
    commonFactor: "Triumph Business Capital",
    licensingAuthority: "the Tennessee Department of Financial Institutions",
    licensingCitation: "Tenn. Code Ann. § 45-5-101 et seq.",
    licenseType: "Industrial Loan and Thrift registration",
    salesTaxNote:
      "exempts qualified common-carrier interstate freight from sales tax",
    taxAuthority: "Tennessee Department of Revenue",
  },
  ohio: {
    name: "Ohio",
    abbr: "OH",
    slug: "ohio",
    primaryCorridor: "I-70 Columbus–Indianapolis",
    secondaryCorridor: "I-71 Cleveland–Cincinnati",
    lenderPanelCount: 11,
    lenderExample1: "Buckeye Commercial Capital",
    lenderExample2: "Ohio Valley Freight Finance",
    commonFactor: "Bibby Financial Services",
    licensingAuthority: "the Ohio Division of Financial Institutions",
    licensingCitation: "Ohio Rev. Code § 1321.01 et seq.",
    licenseType: "Ohio Small Loan / General Loan license",
    salesTaxNote:
      "exempts highway transportation-for-hire equipment from sales and use tax",
    taxAuthority: "Ohio Department of Taxation",
  },
  indiana: {
    name: "Indiana",
    abbr: "IN",
    slug: "indiana",
    primaryCorridor: "I-70 Indianapolis–Terre Haute",
    secondaryCorridor: "I-65 Indianapolis–Louisville",
    lenderPanelCount: 9,
    lenderExample1: "Crossroads Commercial Capital",
    lenderExample2: "Hoosier Freight Lending",
    commonFactor: "England Carrier Services",
    licensingAuthority: "the Indiana Department of Financial Institutions",
    licensingCitation: "Ind. Code § 24-4.5 (UCCC)",
    licenseType: "DFI consumer credit / loan license",
    salesTaxNote:
      "exempts rolling-stock used predominantly in interstate commerce from sales tax",
    taxAuthority: "Indiana Department of Revenue",
  },
  kentucky: {
    name: "Kentucky",
    abbr: "KY",
    slug: "kentucky",
    primaryCorridor: "I-65 Louisville–Bowling Green",
    secondaryCorridor: "I-64 Louisville–Lexington",
    lenderPanelCount: 8,
    lenderExample1: "Bluegrass Commercial Finance",
    lenderExample2: "Ohio River Freight Capital",
    commonFactor: "Riviera Finance",
    licensingAuthority: "the Kentucky Department of Financial Institutions",
    licensingCitation: "KRS Chapter 286.4 (Consumer Loan Companies)",
    licenseType: "Kentucky Consumer Loan Company license",
    salesTaxNote: "exempts interstate motor carrier purchases from sales tax",
    taxAuthority: "Kentucky Department of Revenue",
  },
  "north-carolina": {
    name: "North Carolina",
    abbr: "NC",
    slug: "north-carolina",
    primaryCorridor: "I-85 Charlotte–Greensboro",
    secondaryCorridor: "I-95 Fayetteville–Rocky Mount",
    lenderPanelCount: 10,
    lenderExample1: "Tar Heel Commercial Capital",
    lenderExample2: "Carolina Piedmont Lending",
    commonFactor: "TBS Factoring",
    licensingAuthority: "the North Carolina Commissioner of Banks",
    licensingCitation: "N.C. Gen. Stat. § 53-164 et seq. (Consumer Finance Act)",
    licenseType: "NC Consumer Finance license",
    salesTaxNote:
      "exempts certain interstate common-carrier purchases from sales and use tax",
    taxAuthority: "North Carolina Department of Revenue",
  },
  arizona: {
    name: "Arizona",
    abbr: "AZ",
    slug: "arizona",
    primaryCorridor: "I-10 Phoenix–Tucson",
    secondaryCorridor: "I-17 Phoenix–Flagstaff",
    lenderPanelCount: 9,
    lenderExample1: "Sonoran Commercial Capital",
    lenderExample2: "Grand Canyon Freight Lending",
    commonFactor: "Porter Capital",
    licensingAuthority: "the Arizona Department of Insurance and Financial Institutions",
    licensingCitation: "Ariz. Rev. Stat. § 6-601 et seq.",
    licenseType: "Arizona Consumer Lender license",
    salesTaxNote:
      "exempts qualifying motor carrier interstate operations from transaction privilege tax",
    taxAuthority: "Arizona Department of Revenue",
  },
};

const CITY_CORES: Record<string, CityData[]> = {
  texas: [
    {
      city: "Houston",
      citySlug: "houston",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "47,200",
      localStatFundedCount: "312",
      localStatMedianAmount: "68,500",
      localStatMedianHours: "29",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Gulf humidity and hurricane-season routing shifts hit tire and brake wear harder than the national average",
      cityCostPressure:
        "a higher maintenance line and more Aug–Sep revenue volatility",
      citySeasonalMonth: "September",
      cityAvgRepairCost: "2,840",
      proofCards: [
        {
          use: "Replaced a blown APU and two drive tires before a Laredo run",
          amount: "34,000",
          time: "26 hrs",
          cityNeighborhood: "East End, Houston",
          truckType: "2019 Kenworth T680",
        },
        {
          use: "Covered payroll for four drivers during a 3-week shipper payment delay",
          amount: "145,000",
          time: "41 hrs",
          cityNeighborhood: "North Houston",
          truckType: "Flatbed, mixed",
          fleetSize: "5",
        },
        {
          use: "Down payment on a second trailer to take on a Port of Houston drayage contract",
          amount: "52,500",
          time: "33 hrs",
          cityNeighborhood: "Pasadena, TX",
          truckType: "Day cab + chassis",
        },
      ],
    },
    {
      city: "Dallas",
      citySlug: "dallas",
      aprRangeLow: "14",
      aprRangeHigh: "33",
      localStatOperatorCount: "41,800",
      localStatFundedCount: "274",
      localStatMedianAmount: "66,200",
      localStatMedianHours: "28",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "DFW Metroplex congestion and triple-digit summer heat compress tire life and push HOS tightness on I-35E and I-635",
      cityCostPressure:
        "elevated downtime around peak heat months and tighter dispatch margins on intra-Texas runs",
      citySeasonalMonth: "August",
      cityAvgRepairCost: "2,760",
      proofCards: [
        {
          use: "Replaced a failed transmission before an Oklahoma City lane",
          amount: "31,500",
          time: "27 hrs",
          cityNeighborhood: "South Dallas",
          truckType: "2018 Freightliner Cascadia",
        },
        {
          use: "Funded fuel cards and payroll across a 60-day shipper aging gap",
          amount: "138,000",
          time: "39 hrs",
          cityNeighborhood: "Irving",
          truckType: "Dry van, mixed",
          fleetSize: "6",
        },
        {
          use: "Down payment on a reefer trailer for a Dallas Inland Port lane",
          amount: "48,000",
          time: "31 hrs",
          cityNeighborhood: "Mesquite",
          truckType: "Day cab + reefer",
        },
      ],
    },
    {
      city: "Fort Worth",
      citySlug: "fort-worth",
      aprRangeLow: "14",
      aprRangeHigh: "33",
      localStatOperatorCount: "28,600",
      localStatFundedCount: "192",
      localStatMedianAmount: "64,800",
      localStatMedianHours: "29",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Alliance Texas intermodal volume and Permian oilfield support runs spike Q1 and Q4 maintenance demand",
      cityCostPressure:
        "uneven weekly revenue tied to oilfield activity and intermodal surge windows",
      citySeasonalMonth: "October",
      cityAvgRepairCost: "2,720",
      proofCards: [
        {
          use: "Rebuilt a rear differential after an oilfield run breakdown",
          amount: "29,800",
          time: "28 hrs",
          cityNeighborhood: "North Fort Worth",
          truckType: "2017 Peterbilt 389",
        },
        {
          use: "Bridged 45-day broker receivables during an Alliance intermodal surge",
          amount: "112,000",
          time: "37 hrs",
          cityNeighborhood: "Alliance, Fort Worth",
          truckType: "Container chassis",
          fleetSize: "4",
        },
        {
          use: "Funded a used day cab to bid on a Permian Basin support lane",
          amount: "58,500",
          time: "34 hrs",
          cityNeighborhood: "South Fort Worth",
          truckType: "Day cab",
        },
      ],
    },
    {
      city: "San Antonio",
      citySlug: "san-antonio",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "26,400",
      localStatFundedCount: "178",
      localStatMedianAmount: "63,400",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "I-35 cross-border drayage to Laredo and South Texas heat extend tire and DPF maintenance cycles",
      cityCostPressure:
        "border-staging dwell time and increased after-treatment service intervals",
      citySeasonalMonth: "August",
      cityAvgRepairCost: "2,690",
      proofCards: [
        {
          use: "Replaced a clogged DPF and EGR before a Laredo cross-dock run",
          amount: "26,400",
          time: "29 hrs",
          cityNeighborhood: "South San Antonio",
          truckType: "2019 Volvo VNL",
        },
        {
          use: "Covered insurance renewal jump after adding two trucks",
          amount: "98,500",
          time: "36 hrs",
          cityNeighborhood: "West San Antonio",
          truckType: "Mixed fleet",
          fleetSize: "5",
        },
        {
          use: "Down payment on a sleeper to expand into Laredo border drayage",
          amount: "44,000",
          time: "32 hrs",
          cityNeighborhood: "Southeast San Antonio",
          truckType: "Sleeper tractor",
        },
      ],
    },
    {
      city: "Austin",
      citySlug: "austin",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "18,900",
      localStatFundedCount: "126",
      localStatMedianAmount: "61,800",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Central Texas growth corridors push last-mile and construction freight demand year-round, with summer heat shortening battery life",
      cityCostPressure:
        "elevated last-mile congestion costs and recurring summer cooling-system service",
      citySeasonalMonth: "August",
      cityAvgRepairCost: "2,710",
      proofCards: [
        {
          use: "Replaced a cracked radiator and water pump mid-summer",
          amount: "21,800",
          time: "28 hrs",
          cityNeighborhood: "East Austin",
          truckType: "2018 International LT",
        },
        {
          use: "Funded payroll during a 30-day construction-shipper aging gap",
          amount: "84,000",
          time: "35 hrs",
          cityNeighborhood: "Round Rock",
          truckType: "Dump trucks",
          fleetSize: "3",
        },
        {
          use: "Down payment on a second box truck for last-mile expansion",
          amount: "38,500",
          time: "30 hrs",
          cityNeighborhood: "South Austin",
          truckType: "Box truck",
        },
      ],
    },
    {
      city: "El Paso",
      citySlug: "el-paso",
      aprRangeLow: "15",
      aprRangeHigh: "35",
      localStatOperatorCount: "12,400",
      localStatFundedCount: "94",
      localStatMedianAmount: "59,600",
      localStatMedianHours: "32",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Border-staging dwell on the Bridge of the Americas and Santa Teresa, plus desert dust load, drive higher cabin-filter and brake replacement frequency",
      cityCostPressure:
        "long border-wait delays and elevated wear from desert routing on I-10",
      citySeasonalMonth: "July",
      cityAvgRepairCost: "2,680",
      proofCards: [
        {
          use: "Replaced brake pads and rotors after a Santa Teresa staging stretch",
          amount: "18,400",
          time: "30 hrs",
          cityNeighborhood: "Northeast El Paso",
          truckType: "2017 Kenworth T660",
        },
        {
          use: "Bridged 50-day receivables on a maquiladora cross-border lane",
          amount: "72,500",
          time: "38 hrs",
          cityNeighborhood: "East El Paso",
          truckType: "Dry van",
          fleetSize: "3",
        },
        {
          use: "Funded a used trailer for added Mexico cross-border capacity",
          amount: "32,000",
          time: "34 hrs",
          cityNeighborhood: "Lower Valley",
          truckType: "Dry van trailer",
        },
      ],
    },
  ],
  florida: [
    {
      city: "Jacksonville",
      citySlug: "jacksonville",
      aprRangeLow: "15",
      aprRangeHigh: "36",
      localStatOperatorCount: "31,450",
      localStatFundedCount: "208",
      localStatMedianAmount: "61,200",
      localStatMedianHours: "31",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Hurricane season staging and Port of Jax container surges compress your schedule June–October",
      cityCostPressure:
        "Q3 revenue lumpiness and above-average tire replacement",
      citySeasonalMonth: "October",
      cityAvgRepairCost: "2,610",
      proofCards: [
        {
          use: "Paid out-of-pocket DEF-system repair after a breakdown on I-95",
          amount: "28,500",
          time: "24 hrs",
          cityNeighborhood: "Westside, Jacksonville",
          truckType: "2020 Freightliner Cascadia",
        },
        {
          use: "Bridged a 30-day receivable gap with a Savannah-based shipper",
          amount: "120,000",
          time: "38 hrs",
          cityNeighborhood: "Arlington, Jacksonville",
          truckType: "Reefer, produce",
          fleetSize: "4",
        },
        {
          use: "Bought a used trailer to bid on a Port of Jacksonville intermodal lane",
          amount: "47,000",
          time: "35 hrs",
          cityNeighborhood: "Northside, Jacksonville",
          truckType: "Day cab",
        },
      ],
    },
    {
      city: "Miami",
      citySlug: "miami",
      aprRangeLow: "15",
      aprRangeHigh: "36",
      localStatOperatorCount: "38,200",
      localStatFundedCount: "246",
      localStatMedianAmount: "63,800",
      localStatMedianHours: "31",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "PortMiami drayage volume, Miami-Dade theft exposure, and salt-air corrosion concentrate physical-damage and brake costs",
      cityCostPressure:
        "elevated insurance premiums and frequent corrosion-related component replacement",
      citySeasonalMonth: "September",
      cityAvgRepairCost: "2,890",
      proofCards: [
        {
          use: "Replaced corroded air lines and brake chambers after a salt-air audit",
          amount: "23,400",
          time: "27 hrs",
          cityNeighborhood: "Hialeah",
          truckType: "2018 International LT",
        },
        {
          use: "Funded an insurance renewal jump tied to PortMiami drayage exposure",
          amount: "108,000",
          time: "37 hrs",
          cityNeighborhood: "Doral",
          truckType: "Container chassis",
          fleetSize: "5",
        },
        {
          use: "Down payment on a sleeper to add Florida–Atlanta lane capacity",
          amount: "46,500",
          time: "34 hrs",
          cityNeighborhood: "Medley",
          truckType: "Sleeper tractor",
        },
      ],
    },
    {
      city: "Tampa",
      citySlug: "tampa",
      aprRangeLow: "15",
      aprRangeHigh: "35",
      localStatOperatorCount: "27,600",
      localStatFundedCount: "184",
      localStatMedianAmount: "61,900",
      localStatMedianHours: "31",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Port Tampa Bay drayage and I-4 produce/construction freight peaks add maintenance load Q1 and Q4",
      cityCostPressure:
        "I-4 corridor congestion costs and seasonal tire wear from peak produce hauls",
      citySeasonalMonth: "March",
      cityAvgRepairCost: "2,640",
      proofCards: [
        {
          use: "Replaced a turbo and aftercooler before a Lakeland produce run",
          amount: "24,800",
          time: "28 hrs",
          cityNeighborhood: "East Tampa",
          truckType: "2019 Kenworth T680",
        },
        {
          use: "Bridged 35-day shipper aging on a Port Tampa Bay drayage account",
          amount: "92,000",
          time: "36 hrs",
          cityNeighborhood: "Ybor City",
          truckType: "Day cab",
          fleetSize: "4",
        },
        {
          use: "Down payment on a flatbed for I-4 construction-freight bidding",
          amount: "41,200",
          time: "33 hrs",
          cityNeighborhood: "Brandon",
          truckType: "Flatbed",
        },
      ],
    },
    {
      city: "Orlando",
      citySlug: "orlando",
      aprRangeLow: "15",
      aprRangeHigh: "35",
      localStatOperatorCount: "22,800",
      localStatFundedCount: "152",
      localStatMedianAmount: "60,400",
      localStatMedianHours: "32",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Central Florida construction and theme-park supply freight push consistent year-round demand with hurricane-season disruption windows",
      cityCostPressure:
        "elevated downtime risk during Q3 storms and high last-mile fuel burn around I-4 and SR-417",
      citySeasonalMonth: "September",
      cityAvgRepairCost: "2,580",
      proofCards: [
        {
          use: "Repaired hurricane-storm electrical damage on a parked tractor",
          amount: "19,800",
          time: "30 hrs",
          cityNeighborhood: "Apopka",
          truckType: "2018 Freightliner Cascadia",
        },
        {
          use: "Funded payroll during a 40-day construction-receivable lag",
          amount: "78,500",
          time: "37 hrs",
          cityNeighborhood: "Kissimmee",
          truckType: "Dump trucks",
          fleetSize: "3",
        },
        {
          use: "Down payment on a box truck for theme-park supply contracts",
          amount: "36,500",
          time: "32 hrs",
          cityNeighborhood: "Sand Lake",
          truckType: "Box truck",
        },
      ],
    },
  ],
  california: [
    {
      city: "Fresno",
      citySlug: "fresno",
      aprRangeLow: "14",
      aprRangeHigh: "32",
      localStatOperatorCount: "58,900",
      localStatFundedCount: "286",
      localStatMedianAmount: "72,400",
      localStatMedianHours: "34",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Valley fog and Central Valley produce-season peaks push a huge chunk of your revenue into a 10-week window",
      cityCostPressure:
        "seasonal revenue swings and CARB-compliance maintenance overhead",
      citySeasonalMonth: "November",
      cityAvgRepairCost: "3,120",
      proofCards: [
        {
          use: "Rebuilt a blown turbo mid-harvest season",
          amount: "38,000",
          time: "30 hrs",
          cityNeighborhood: "Southeast Fresno",
          truckType: "2018 Peterbilt 579",
        },
        {
          use: "Funded CARB-compliant engine retrofit across three trucks",
          amount: "180,000",
          time: "46 hrs",
          cityNeighborhood: "Clovis",
          truckType: "Reefer, produce",
          fleetSize: "6",
        },
        {
          use: "Covered insurance premium jump after a clean-record audit reset",
          amount: "41,500",
          time: "32 hrs",
          cityNeighborhood: "West Fresno",
          truckType: "Dry van",
        },
      ],
    },
    {
      city: "Los Angeles",
      citySlug: "los-angeles",
      aprRangeLow: "14",
      aprRangeHigh: "33",
      localStatOperatorCount: "82,400",
      localStatFundedCount: "412",
      localStatMedianAmount: "74,200",
      localStatMedianHours: "33",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Ports of LA/Long Beach drayage volume and CARB Clean Truck program enforcement compress equipment age and push retrofit cycles",
      cityCostPressure:
        "high lease/lease-purchase exposure and CARB compliance overhead",
      citySeasonalMonth: "October",
      cityAvgRepairCost: "3,180",
      proofCards: [
        {
          use: "Funded a CARB-compliant 2014 tractor swap to keep port-drayage access",
          amount: "78,000",
          time: "35 hrs",
          cityNeighborhood: "Wilmington",
          truckType: "2014 Volvo VNL day cab",
        },
        {
          use: "Bridged 60-day broker receivables during a Long Beach container surge",
          amount: "165,000",
          time: "42 hrs",
          cityNeighborhood: "Carson",
          truckType: "Container chassis",
          fleetSize: "5",
        },
        {
          use: "Replaced a failed alternator and starter on a Port of LA run",
          amount: "26,500",
          time: "31 hrs",
          cityNeighborhood: "Compton",
          truckType: "2017 Kenworth T680",
        },
      ],
    },
    {
      city: "San Diego",
      citySlug: "san-diego",
      aprRangeLow: "14",
      aprRangeHigh: "33",
      localStatOperatorCount: "21,600",
      localStatFundedCount: "138",
      localStatMedianAmount: "68,500",
      localStatMedianHours: "34",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Otay Mesa cross-border drayage to Tijuana plus marine-air corrosion drive higher chassis and brake-system service frequency",
      cityCostPressure:
        "border-wait dwell and recurring corrosion-related component replacement",
      citySeasonalMonth: "September",
      cityAvgRepairCost: "2,920",
      proofCards: [
        {
          use: "Replaced corroded brake chambers and air dryer after a coastal audit",
          amount: "22,000",
          time: "29 hrs",
          cityNeighborhood: "Otay Mesa",
          truckType: "2018 Freightliner Cascadia",
        },
        {
          use: "Bridged 45-day receivables on a maquiladora cross-border lane",
          amount: "96,000",
          time: "38 hrs",
          cityNeighborhood: "Chula Vista",
          truckType: "Dry van",
          fleetSize: "4",
        },
        {
          use: "Down payment on a sleeper to add LA–San Diego port-drayage capacity",
          amount: "44,500",
          time: "34 hrs",
          cityNeighborhood: "National City",
          truckType: "Sleeper tractor",
        },
      ],
    },
    {
      city: "Sacramento",
      citySlug: "sacramento",
      aprRangeLow: "14",
      aprRangeHigh: "33",
      localStatOperatorCount: "19,400",
      localStatFundedCount: "124",
      localStatMedianAmount: "67,800",
      localStatMedianHours: "33",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "I-5 / SR-99 produce flows and Port of Sacramento bulk shipments concentrate revenue in summer and fall harvest windows",
      cityCostPressure:
        "harvest-season schedule pressure and ongoing CARB retrofit budget",
      citySeasonalMonth: "September",
      cityAvgRepairCost: "3,040",
      proofCards: [
        {
          use: "Replaced a cracked DPF and clogged EGR cooler before tomato season",
          amount: "27,500",
          time: "30 hrs",
          cityNeighborhood: "South Sacramento",
          truckType: "2017 Peterbilt 579",
        },
        {
          use: "Funded payroll across a 35-day cannery shipper payment delay",
          amount: "104,000",
          time: "39 hrs",
          cityNeighborhood: "West Sacramento",
          truckType: "Reefer, produce",
          fleetSize: "5",
        },
        {
          use: "Down payment on a CARB-compliant tractor to keep Bay Area port access",
          amount: "62,000",
          time: "34 hrs",
          cityNeighborhood: "Natomas",
          truckType: "Day cab",
        },
      ],
    },
  ],
  georgia: [
    {
      city: "Atlanta",
      citySlug: "atlanta",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "44,600",
      localStatFundedCount: "298",
      localStatMedianAmount: "65,400",
      localStatMedianHours: "29",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "I-285 perimeter congestion and Hartsfield-Jackson air-cargo support runs concentrate dispatch tightness and metro fuel burn",
      cityCostPressure:
        "metro congestion fuel costs and tighter delivery-window penalties",
      citySeasonalMonth: "August",
      cityAvgRepairCost: "2,720",
      proofCards: [
        {
          use: "Replaced a transmission cooler and lines after an I-285 breakdown",
          amount: "24,500",
          time: "27 hrs",
          cityNeighborhood: "South Atlanta",
          truckType: "2018 Freightliner Cascadia",
        },
        {
          use: "Bridged 40-day broker receivables on a Southeast regional lane",
          amount: "118,000",
          time: "37 hrs",
          cityNeighborhood: "Forest Park",
          truckType: "Dry van",
          fleetSize: "5",
        },
        {
          use: "Down payment on a sleeper for a Georgia–Florida produce lane",
          amount: "48,500",
          time: "33 hrs",
          cityNeighborhood: "Stockbridge",
          truckType: "Sleeper tractor",
        },
      ],
    },
    {
      city: "Savannah",
      citySlug: "savannah",
      aprRangeLow: "15",
      aprRangeHigh: "35",
      localStatOperatorCount: "14,200",
      localStatFundedCount: "104",
      localStatMedianAmount: "63,800",
      localStatMedianHours: "31",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Port of Savannah container surges (now the largest single-terminal container facility in North America) drive intense intermodal dispatch windows",
      cityCostPressure:
        "container-surge dwell, hurricane-season disruption, and salt-air component wear",
      citySeasonalMonth: "October",
      cityAvgRepairCost: "2,690",
      proofCards: [
        {
          use: "Replaced corroded fifth-wheel components after a port-yard audit",
          amount: "21,000",
          time: "29 hrs",
          cityNeighborhood: "Garden City",
          truckType: "2018 Volvo VNL",
        },
        {
          use: "Funded fuel and payroll during a 30-day port-volume surge",
          amount: "88,000",
          time: "36 hrs",
          cityNeighborhood: "Pooler",
          truckType: "Container chassis",
          fleetSize: "4",
        },
        {
          use: "Down payment on a chassis to expand Savannah-Atlanta intermodal capacity",
          amount: "39,500",
          time: "32 hrs",
          cityNeighborhood: "Port Wentworth",
          truckType: "Day cab + chassis",
        },
      ],
    },
  ],
  illinois: [
    {
      city: "Chicago",
      citySlug: "chicago",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "62,300",
      localStatFundedCount: "384",
      localStatMedianAmount: "69,800",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "BNSF/UP intermodal ramp volume around Chicago plus harsh winter brine corrosion concentrate physical-damage and chassis costs",
      cityCostPressure:
        "winter corrosion-related component replacement and elevated insurance exposure on intermodal lanes",
      citySeasonalMonth: "January",
      cityAvgRepairCost: "2,950",
      proofCards: [
        {
          use: "Replaced corroded brake lines and air dryers after a winter audit",
          amount: "26,800",
          time: "28 hrs",
          cityNeighborhood: "South Side, Chicago",
          truckType: "2017 International LT",
        },
        {
          use: "Bridged 50-day shipper receivables during a Joliet intermodal surge",
          amount: "142,000",
          time: "39 hrs",
          cityNeighborhood: "Joliet",
          truckType: "Container chassis",
          fleetSize: "6",
        },
        {
          use: "Down payment on a day cab to bid on a CenterPoint intermodal lane",
          amount: "52,000",
          time: "33 hrs",
          cityNeighborhood: "Bedford Park",
          truckType: "Day cab",
        },
      ],
    },
  ],
  tennessee: [
    {
      city: "Memphis",
      citySlug: "memphis",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "26,800",
      localStatFundedCount: "192",
      localStatMedianAmount: "64,200",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "FedEx World Hub volume, BNSF intermodal terminals, and the Mississippi River barge transfers make Memphis one of the densest freight hubs in the country",
      cityCostPressure:
        "tight intermodal dispatch windows and elevated overnight-load demand",
      citySeasonalMonth: "November",
      cityAvgRepairCost: "2,710",
      proofCards: [
        {
          use: "Replaced a failed clutch before a FedEx hub overnight cycle",
          amount: "23,500",
          time: "26 hrs",
          cityNeighborhood: "Southeast Memphis",
          truckType: "2018 Freightliner Cascadia",
        },
        {
          use: "Funded payroll across a 35-day broker payment lag",
          amount: "108,000",
          time: "37 hrs",
          cityNeighborhood: "Whitehaven",
          truckType: "Dry van",
          fleetSize: "5",
        },
        {
          use: "Down payment on a chassis for a BNSF intermodal lane",
          amount: "44,500",
          time: "33 hrs",
          cityNeighborhood: "Frayser",
          truckType: "Day cab + chassis",
        },
      ],
    },
    {
      city: "Nashville",
      citySlug: "nashville",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "21,400",
      localStatFundedCount: "146",
      localStatMedianAmount: "62,800",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Middle Tennessee construction and auto-supply freight (Nissan Smyrna, GM Spring Hill) drive steady demand with periodic OEM production-cycle surges",
      cityCostPressure:
        "tight just-in-time delivery windows and elevated demurrage risk on auto-supply lanes",
      citySeasonalMonth: "September",
      cityAvgRepairCost: "2,680",
      proofCards: [
        {
          use: "Replaced an air compressor and dryer before a Smyrna auto-parts run",
          amount: "20,500",
          time: "27 hrs",
          cityNeighborhood: "South Nashville",
          truckType: "2018 Volvo VNL",
        },
        {
          use: "Bridged 40-day OEM receivables on an auto-supply lane",
          amount: "94,000",
          time: "37 hrs",
          cityNeighborhood: "La Vergne",
          truckType: "Dry van",
          fleetSize: "4",
        },
        {
          use: "Down payment on a flatbed for Middle Tennessee construction-freight bidding",
          amount: "42,000",
          time: "32 hrs",
          cityNeighborhood: "Antioch",
          truckType: "Flatbed",
        },
      ],
    },
  ],
  ohio: [
    {
      city: "Columbus",
      citySlug: "columbus",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "23,800",
      localStatFundedCount: "162",
      localStatMedianAmount: "63,400",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Rickenbacker Inland Port air-cargo volume and Central Ohio e-commerce DC density push consistent overnight and last-mile demand",
      cityCostPressure:
        "winter brine corrosion exposure and tight DC delivery windows",
      citySeasonalMonth: "January",
      cityAvgRepairCost: "2,720",
      proofCards: [
        {
          use: "Replaced corroded brake lines and air system after a winter audit",
          amount: "21,800",
          time: "28 hrs",
          cityNeighborhood: "South Columbus",
          truckType: "2017 Freightliner Cascadia",
        },
        {
          use: "Bridged 35-day receivables on a Rickenbacker air-cargo support lane",
          amount: "92,000",
          time: "37 hrs",
          cityNeighborhood: "Groveport",
          truckType: "Day cab",
          fleetSize: "4",
        },
        {
          use: "Down payment on a box truck for a Central Ohio last-mile contract",
          amount: "38,500",
          time: "32 hrs",
          cityNeighborhood: "West Columbus",
          truckType: "Box truck",
        },
      ],
    },
    {
      city: "Cincinnati",
      citySlug: "cincinnati",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "19,600",
      localStatFundedCount: "134",
      localStatMedianAmount: "62,400",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "CVG (DHL) air-cargo hub and Ohio River barge transfers concentrate intermodal demand; I-71/I-75 regional volume layers on top",
      cityCostPressure:
        "winter corrosion-related component replacement and tight overnight DHL hub cycles",
      citySeasonalMonth: "January",
      cityAvgRepairCost: "2,690",
      proofCards: [
        {
          use: "Replaced air dryer and brake chambers after a CVG hub-yard audit",
          amount: "19,800",
          time: "28 hrs",
          cityNeighborhood: "Hebron, KY (CVG)",
          truckType: "2018 International LT",
        },
        {
          use: "Funded payroll during a 35-day shipper aging gap on a regional lane",
          amount: "84,000",
          time: "37 hrs",
          cityNeighborhood: "West Chester",
          truckType: "Dry van",
          fleetSize: "4",
        },
        {
          use: "Down payment on a sleeper for a Cincinnati–Atlanta lane",
          amount: "41,500",
          time: "33 hrs",
          cityNeighborhood: "Sharonville",
          truckType: "Sleeper tractor",
        },
      ],
    },
  ],
  indiana: [
    {
      city: "Indianapolis",
      citySlug: "indianapolis",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "28,400",
      localStatFundedCount: "194",
      localStatMedianAmount: "64,600",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "Indianapolis is the 'Crossroads of America' — I-65, I-70, I-69, I-74 converge — plus FedEx Express national hub volume drives overnight-cycle demand",
      cityCostPressure:
        "tight overnight FedEx hub cycles and winter brine corrosion exposure",
      citySeasonalMonth: "January",
      cityAvgRepairCost: "2,710",
      proofCards: [
        {
          use: "Replaced a failed turbo before a FedEx hub overnight cycle",
          amount: "22,500",
          time: "27 hrs",
          cityNeighborhood: "Plainfield",
          truckType: "2018 Volvo VNL",
        },
        {
          use: "Bridged 40-day broker receivables during a Q4 retail surge",
          amount: "98,000",
          time: "37 hrs",
          cityNeighborhood: "Greenwood",
          truckType: "Dry van",
          fleetSize: "5",
        },
        {
          use: "Down payment on a day cab for an Indianapolis–Chicago regional lane",
          amount: "43,000",
          time: "33 hrs",
          cityNeighborhood: "Speedway",
          truckType: "Day cab",
        },
      ],
    },
  ],
  kentucky: [
    {
      city: "Louisville",
      citySlug: "louisville",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "18,200",
      localStatFundedCount: "128",
      localStatMedianAmount: "62,800",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "UPS Worldport — the world's largest fully-automated air-cargo facility — drives intense overnight pickup and delivery windows from SDF",
      cityCostPressure:
        "tight UPS overnight hub cycles and winter brine corrosion exposure",
      citySeasonalMonth: "January",
      cityAvgRepairCost: "2,690",
      proofCards: [
        {
          use: "Replaced a failed alternator before a UPS Worldport sort cycle",
          amount: "18,500",
          time: "26 hrs",
          cityNeighborhood: "South Louisville",
          truckType: "2018 Freightliner Cascadia",
        },
        {
          use: "Funded payroll across a 35-day shipper payment lag",
          amount: "82,000",
          time: "37 hrs",
          cityNeighborhood: "Jeffersontown",
          truckType: "Dry van",
          fleetSize: "4",
        },
        {
          use: "Down payment on a sleeper for a Louisville–Nashville lane",
          amount: "39,500",
          time: "33 hrs",
          cityNeighborhood: "Shively",
          truckType: "Sleeper tractor",
        },
      ],
    },
  ],
  "north-carolina": [
    {
      city: "Charlotte",
      citySlug: "charlotte",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "24,600",
      localStatFundedCount: "172",
      localStatMedianAmount: "63,800",
      localStatMedianHours: "30",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "I-85 Piedmont corridor freight density and NS Charlotte Intermodal Terminal volume concentrate intermodal and regional dispatch demand",
      cityCostPressure:
        "tight intermodal dispatch windows and elevated metro fuel burn on I-485",
      citySeasonalMonth: "September",
      cityAvgRepairCost: "2,680",
      proofCards: [
        {
          use: "Replaced a failed water pump and thermostat before a Greensboro lane",
          amount: "19,500",
          time: "27 hrs",
          cityNeighborhood: "West Charlotte",
          truckType: "2018 International LT",
        },
        {
          use: "Bridged 40-day receivables on a Carolinas regional dry-van lane",
          amount: "92,000",
          time: "37 hrs",
          cityNeighborhood: "Concord",
          truckType: "Dry van",
          fleetSize: "5",
        },
        {
          use: "Down payment on a chassis for a Charlotte intermodal contract",
          amount: "41,000",
          time: "33 hrs",
          cityNeighborhood: "Pineville",
          truckType: "Day cab + chassis",
        },
      ],
    },
  ],
  arizona: [
    {
      city: "Phoenix",
      citySlug: "phoenix",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "26,800",
      localStatFundedCount: "184",
      localStatMedianAmount: "64,200",
      localStatMedianHours: "31",
      dataRefreshDate: "Apr 14, 2026",
      cityWeatherContext:
        "I-10 cross-country freight, Phoenix-area DC growth, and triple-digit summer heat compress cooling-system, tire, and battery life",
      cityCostPressure:
        "summer-heat maintenance overhead and tighter dispatch windows on I-10 westbound runs",
      citySeasonalMonth: "July",
      cityAvgRepairCost: "2,810",
      proofCards: [
        {
          use: "Replaced a cracked radiator and water pump mid-summer",
          amount: "22,500",
          time: "28 hrs",
          cityNeighborhood: "South Phoenix",
          truckType: "2018 Kenworth T680",
        },
        {
          use: "Funded payroll during a 35-day broker receivable lag",
          amount: "96,000",
          time: "37 hrs",
          cityNeighborhood: "Tolleson",
          truckType: "Dry van",
          fleetSize: "4",
        },
        {
          use: "Down payment on a sleeper for a Phoenix–Los Angeles I-10 lane",
          amount: "44,500",
          time: "33 hrs",
          cityNeighborhood: "Goodyear",
          truckType: "Sleeper tractor",
        },
      ],
    },
  ],
};

function merge(state: StateData, core: CityData): City {
  return {
    state: state.name,
    stateAbbr: state.abbr,
    stateSlug: state.slug,
    city: core.city,
    citySlug: core.citySlug,
    aprRangeLow: core.aprRangeLow,
    aprRangeHigh: core.aprRangeHigh,
    localStatOperatorCount: core.localStatOperatorCount,
    localStatFundedCount: core.localStatFundedCount,
    localStatMedianAmount: core.localStatMedianAmount,
    localStatMedianHours: core.localStatMedianHours,
    dataRefreshDate: core.dataRefreshDate,
    statePrimaryCorridor: state.primaryCorridor,
    stateSecondaryCorridor: state.secondaryCorridor,
    cityWeatherContext: core.cityWeatherContext,
    cityCostPressure: core.cityCostPressure,
    citySeasonalMonth: core.citySeasonalMonth,
    cityAvgRepairCost: core.cityAvgRepairCost,
    stateLenderPanelCount: state.lenderPanelCount,
    stateLenderExample1: state.lenderExample1,
    stateLenderExample2: state.lenderExample2,
    stateCommonFactor: state.commonFactor,
    proofCards: core.proofCards,
    stateLicensingAuthority: state.licensingAuthority,
    stateLicensingCitation: state.licensingCitation,
    stateLicenseType: state.licenseType,
    stateSalesTaxNote: state.salesTaxNote,
    stateTaxAuthority: state.taxAuthority,
  };
}

export function getCity(stateSlug: string, citySlug: string): City | null {
  const state = STATES[stateSlug];
  const core = CITY_CORES[stateSlug]?.find((c) => c.citySlug === citySlug);
  if (!state || !core) return null;
  return merge(state, core);
}

export function getAllCities(): City[] {
  const out: City[] = [];
  for (const slug of Object.keys(STATES)) {
    const state = STATES[slug];
    for (const core of CITY_CORES[slug] ?? []) out.push(merge(state, core));
  }
  return out;
}

function toStateInfo(s: StateData): StateInfo {
  const cities: CityInfo[] = (CITY_CORES[s.slug] ?? []).map((c) => ({
    city: c.city,
    citySlug: c.citySlug,
  }));
  return {
    name: s.name,
    abbr: s.abbr,
    slug: s.slug,
    primaryCorridor: s.primaryCorridor,
    secondaryCorridor: s.secondaryCorridor,
    lenderPanelCount: s.lenderPanelCount,
    lenderExample1: s.lenderExample1,
    lenderExample2: s.lenderExample2,
    licensingAuthority: s.licensingAuthority,
    licenseType: s.licenseType,
    cities,
  };
}

export function getState(stateSlug: string): StateInfo | null {
  const s = STATES[stateSlug];
  return s ? toStateInfo(s) : null;
}

export function getAllStates(): StateInfo[] {
  return Object.values(STATES).map(toStateInfo);
}
