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
