import "server-only";

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

export type ProofCard = {
  use: string;
  amount: string;
  time: string;
  cityNeighborhood: string;
  truckType: string;
  fleetSize?: string;
};

// Low-coverage threshold from the template handoff notes (line 15-21 of the
// prototype): do not publish a geo page claiming "N lenders actively funding"
// when N is 0-2. Callers should redirect such URLs to /trucking.
export const LOW_COVERAGE_THRESHOLD = 3;

const CITIES: Record<string, Record<string, City>> = {
  texas: {
    houston: {
      state: "Texas",
      stateAbbr: "TX",
      stateSlug: "texas",
      city: "Houston",
      citySlug: "houston",
      aprRangeLow: "14",
      aprRangeHigh: "34",
      localStatOperatorCount: "47,200",
      localStatFundedCount: "312",
      localStatMedianAmount: "68,500",
      localStatMedianHours: "29",
      dataRefreshDate: "Apr 14, 2026",
      statePrimaryCorridor: "I-10 Houston–El Paso",
      stateSecondaryCorridor: "I-35 San Antonio–Dallas",
      cityWeatherContext:
        "Gulf humidity and hurricane-season routing shifts hit tire and brake wear harder than the national average",
      cityCostPressure:
        "a higher maintenance line and more Aug–Sep revenue volatility",
      citySeasonalMonth: "September",
      cityAvgRepairCost: "2,840",
      stateLenderPanelCount: 17,
      stateLenderExample1: "Lone Star Commercial Capital",
      stateLenderExample2: "South Loop Lending",
      stateCommonFactor: "TBS Factoring",
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
      stateLicensingAuthority: "the Texas Office of Consumer Credit Commissioner",
      stateLicensingCitation: "Tex. Fin. Code §§ 342, 393",
      stateLicenseType: "OCCC regulated lender license",
      stateSalesTaxNote: "does not apply sales tax to interstate freight hauls",
      stateTaxAuthority: "Texas Comptroller",
    },
  },
  florida: {
    jacksonville: {
      state: "Florida",
      stateAbbr: "FL",
      stateSlug: "florida",
      city: "Jacksonville",
      citySlug: "jacksonville",
      aprRangeLow: "15",
      aprRangeHigh: "36",
      localStatOperatorCount: "31,450",
      localStatFundedCount: "208",
      localStatMedianAmount: "61,200",
      localStatMedianHours: "31",
      dataRefreshDate: "Apr 14, 2026",
      statePrimaryCorridor: "I-95 Jacksonville–Miami",
      stateSecondaryCorridor: "I-10 Jacksonville–Tallahassee",
      cityWeatherContext:
        "Hurricane season staging and Port of Jax container surges compress your schedule June–October",
      cityCostPressure: "Q3 revenue lumpiness and above-average tire replacement",
      citySeasonalMonth: "October",
      cityAvgRepairCost: "2,610",
      stateLenderPanelCount: 14,
      stateLenderExample1: "First Coast Commercial",
      stateLenderExample2: "Sunshine State Working Capital",
      stateCommonFactor: "RTS Financial",
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
      stateLicensingAuthority: "the Florida Office of Financial Regulation",
      stateLicensingCitation: "Fla. Stat. ch. 516, 537",
      stateLicenseType: "OFR consumer finance or commercial lender registration",
      stateSalesTaxNote: "exempts common-carrier freight from sales tax",
      stateTaxAuthority: "Florida Department of Revenue",
    },
  },
  california: {
    fresno: {
      state: "California",
      stateAbbr: "CA",
      stateSlug: "california",
      city: "Fresno",
      citySlug: "fresno",
      aprRangeLow: "14",
      aprRangeHigh: "32",
      localStatOperatorCount: "58,900",
      localStatFundedCount: "286",
      localStatMedianAmount: "72,400",
      localStatMedianHours: "34",
      dataRefreshDate: "Apr 14, 2026",
      statePrimaryCorridor: "I-5 Central Valley",
      stateSecondaryCorridor: "SR-99 Bakersfield–Sacramento",
      cityWeatherContext:
        "Valley fog and Central Valley produce-season peaks push a huge chunk of your revenue into a 10-week window",
      cityCostPressure:
        "seasonal revenue swings and CARB-compliance maintenance overhead",
      citySeasonalMonth: "November",
      cityAvgRepairCost: "3,120",
      stateLenderPanelCount: 12,
      stateLenderExample1: "Central Valley Commercial Finance",
      stateLenderExample2: "Pacific Freight Capital",
      stateCommonFactor: "OTR Capital",
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
      stateLicensingAuthority:
        "the California Department of Financial Protection and Innovation",
      stateLicensingCitation: "Cal. Fin. Code § 22000 et seq. (CFL)",
      stateLicenseType: "California Financing Law license",
      stateSalesTaxNote:
        "has a commercial-financing disclosure law (SB 1235) that requires APR and total-cost disclosure before you sign",
      stateTaxAuthority: "California Department of Tax and Fee Administration",
    },
  },
};

export function getCity(stateSlug: string, citySlug: string): City | null {
  return CITIES[stateSlug]?.[citySlug] ?? null;
}

export function getAllCities(): City[] {
  return Object.values(CITIES).flatMap((state) => Object.values(state));
}
