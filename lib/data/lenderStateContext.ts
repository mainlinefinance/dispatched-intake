import "server-only";

/* ===========================================================================
   State-specific context for /lenders/[state] pages. The lender panel is the
   same 12 lenders nationwide, but the trucking-finance picture differs
   materially by state — corridors, regulatory rules, regional lenders, and
   freight economics. Without state-specific context, 51 pages risk being
   collapsed as thin / duplicate content by search engines.

   Architecture:
     - Top 15 trucking states get curated content: market paragraph,
       named freight corridors, optional regulatory note, optional regional
       lenders, optional economic note.
     - The remaining 36 states get procedural fallback content built from
       the state name.

   Voice: factual, source-cited where possible, owner-op-respecting. The
   curated paragraphs read like research, not marketing copy.
   =========================================================================== */

import { STATE_INFO } from "@/lib/data/lenders";

export type StateContextEntry = {
  readonly stateCode: string;
  readonly stateName: string;
  readonly stateSlug: string;
  readonly procedural: {
    readonly summary: string;
    readonly faqLine: string;
  };
  readonly curated?: {
    readonly market: string;
    readonly corridors: ReadonlyArray<string>;
    readonly regulatoryNote?: string;
    readonly regionalLenders?: ReadonlyArray<string>;
    readonly economicNote?: string;
  };
};

const TOP_TRUCKING_STATES: ReadonlyArray<string> = [
  "TX",
  "CA",
  "IL",
  "GA",
  "FL",
  "OH",
  "PA",
  "NY",
  "NJ",
  "TN",
  "NC",
  "IN",
  "MI",
  "MO",
  "WA",
];

/* Curated content per top-15 state. The keys are state codes. */
const CURATED: Record<
  string,
  NonNullable<StateContextEntry["curated"]>
> = {
  TX: {
    market:
      "Texas is the largest trucking origin state by registered owner-operators — over 47,000 single-truck operators carry Texas plates, and the state hosts the highest concentration of factoring-company headquarters in the country. The freight base splits three ways: Port of Houston container drayage and chemical tankers feeding the Gulf Coast petrochem complex; long-haul dry van and reefer through the Texas Triangle (Dallas-Fort Worth, Houston, San Antonio) that handles intra-state and Mexico-bound traffic; and Permian Basin oilfield service trucking running specialized loads through Midland-Odessa. Apex Capital (Fort Worth), Triumph Business Capital (Dallas), and 1st Commercial Credit (Austin) are all Texas-headquartered — three of the twelve directory lenders are operating from inside the state, which gives Texas carriers unusual access to in-region account management. New-authority operators benefit from Texas's relatively low operating costs and absence of state income tax, but the trade-off is heavy congestion on I-35 through Austin and growing weight-enforcement on I-10 east of San Antonio. Class 8 equipment financing has the most competitive rates here because every major trucking lender wants Texas paper on the book.",
    corridors: [
      "I-10 Houston-El Paso (Gulf Coast to West Texas, 880 miles)",
      "I-35 San Antonio-Dallas-Austin (the Texas Triangle backbone)",
      "I-45 Houston-Dallas (the highest-volume intra-state lane)",
      "I-20 Dallas-Fort Worth-El Paso (the long-haul West Texas spine)",
    ],
    regulatoryNote:
      "Texas has no state income tax which makes the state a popular IRP base state for cross-country owner-operators. The Texas Office of Consumer Credit Commissioner regulates some factoring activity, though invoice-factoring contracts (true-sale receivables purchases) are not classified as loans. Texas is one of several states without a small-business commercial-financing disclosure law — California-style SB 1235 disclosures do not apply to contracts signed in Texas, which keeps factoring documentation simpler than in California or New York.",
    regionalLenders: [
      "South Loop Lending (Houston)",
      "Lone Star Commercial Capital (Dallas-Fort Worth)",
    ],
    economicNote:
      "Texas Department of Transportation reports interstate truck volumes on I-35 and I-10 corridors near pre-2024 freight-recession peaks, with Permian oilfield activity remaining the dominant variable in West Texas trucking demand. Owner-operator rates per mile on Texas-to-California lanes have stabilized through Q1 2026 after the 2023-2024 trough.",
  },
  CA: {
    market:
      "California is the largest US import gateway — the combined Port of Los Angeles and Port of Long Beach handle roughly 40% of US containerized imports, and the resulting drayage market employs more port-trucking owner-operators than any other state. Inland Empire warehousing (Riverside, San Bernardino counties) created a secondary freight hub that feeds long-haul outbound to the Midwest and East Coast. California's regulatory environment is the most restrictive in the country for trucking: CARB emissions rules force pre-2010 diesel trucks off the road on aggressive timelines, AB 5 misclassification penalties have reshaped lease-on owner-operator economics, and SB 1235 commercial-financing disclosures require lenders to provide standardized APR and total-cost-of-credit disclosures before any small-business financing contract is signed. The lender panel underwrites California carriers without restriction, but contract documents differ — every factoring company signing a California carrier must comply with SB 1235 disclosure obligations. Owner-operators with new authority face additional friction because the cost of compliant equipment (clean-engine Class 8) sits 15-25% above national average.",
    corridors: [
      "I-5 Los Angeles-Sacramento-Bay Area (the California spine, ~800 miles intrastate)",
      "I-15 Los Angeles-Las Vegas (the I.E. to Nevada warehouse corridor)",
      "I-10 Los Angeles-Phoenix (Southern California to Sun Belt)",
      "Port of LA/Long Beach drayage routes (San Pedro and Wilmington terminals to Inland Empire)",
    ],
    regulatoryNote:
      "CARB's Advanced Clean Fleets rule requires diesel Class 8 trucks operating in California to meet 2010-or-newer engine standards, with Phase 3 GHG standards taking effect for new tractor purchases by 2027. AB 5 makes lease-on owner-operator arrangements high-risk for misclassification penalties — the ABC test for independent-contractor status is the strictest in the country. SB 1235 commercial-financing disclosure law applies to factoring, MCA, and equipment-financing contracts under $500K signed by California-based small businesses; lenders must provide standardized APR, finance-charge, and total-cost-of-credit disclosures.",
    regionalLenders: ["Pacific Premier Bank (Irvine, commercial trucking desk)"],
    economicNote:
      "Port of LA/Long Beach combined container volume returned to pre-pandemic levels through 2025, with drayage spot rates compressing as warehouse capacity caught up to inbound containers. California intra-state reefer demand (Central Valley produce outbound) remains the most stable rate environment for Western-region carriers.",
  },
  IL: {
    market:
      "Chicago is the largest rail intermodal hub in the country — six of the seven Class I railroads converge in metro Chicago, and the resulting drayage market makes Illinois the most important intermodal trucking state in the US. Union Pacific (Global IV, Global III), BNSF (Logistics Park Chicago, Cicero), CSX (Bedford Park), and Norfolk Southern (47th Street, Calumet) all operate large container yards that need short-haul drayage to and from Chicagoland warehouses. Outside the intermodal market, Illinois carriers run a heavy manufacturing-belt freight mix (steel, machinery, auto parts) and an agricultural mix (corn and soybeans south of I-80). The lender panel underwrites Illinois carriers identically to other states, but the operational reality is that Illinois-based fleets often run high invoice volume from rail intermodal customers (BNSF, CSX through their drayage networks), which favors factoring companies with strong broker-credit tools — Apex, Triumph, and RTS all have meaningful market share with Chicago-area drayage operators.",
    corridors: [
      "I-80 Iowa-Indiana (cross-country east-west backbone through Joliet)",
      "I-90/94 Chicago-Wisconsin (the Dan Ryan-Kennedy corridor)",
      "I-55 Chicago-St. Louis (Mississippi River freight)",
      "Chicago intermodal yards (UP, BNSF, CSX, NS drayage)",
    ],
    regulatoryNote:
      "Illinois is a common IFTA base state for Midwest cross-country carriers due to central geography and reasonable fuel-tax rates relative to neighbors. Cook County levies additional commercial-vehicle fees on top of state registration. Illinois has not enacted SB 1235-style commercial-financing disclosures, so factoring documentation is simpler than in California or New York.",
    economicNote:
      "Chicago intermodal volumes through Q1 2026 are tracking above 2024 levels as Asia-to-US container traffic shifts onto trans-Pacific routes that route through the Port of LA/Long Beach into Chicago via UP and BNSF unit trains.",
  },
  GA: {
    market:
      "Georgia trucking is anchored by two distinct hubs: Atlanta is the dominant inland logistics market in the Southeast (third-largest US city by warehouse square footage), and Port of Savannah is one of the fastest-growing US container ports — Savannah surpassed New York/New Jersey in some quarters of 2024 by container volume. The intersection of I-75, I-85, and I-95 at Atlanta makes the metro a natural transshipment point for Southeast freight flowing between Florida, the Carolinas, and the Mid-Atlantic. Owner-operator density is highest in Atlanta's southern suburbs (Henry, Clayton, Fayette counties) and in Savannah/Chatham County around the port drayage market. Lenders see meaningful Georgia volume across all twelve directory entries, and Georgia's relatively low cost of operation compared to Northeast neighbors keeps the state attractive for new-authority operators. The Georgia Department of Public Safety operates aggressive weight and inspection enforcement at fixed scales on I-75 and I-95, which surfaces in DOT records and matters at lender underwriting for equipment financing.",
    corridors: [
      "I-75 Florida-Atlanta-Tennessee (the produce-and-Southeast backbone)",
      "I-85 Charlotte-Atlanta-Alabama (the Piedmont manufacturing corridor)",
      "I-95 Savannah-Jacksonville-Northeast (Port of Savannah outbound)",
      "I-20 Atlanta-Birmingham (Southeast east-west)",
    ],
    regulatoryNote:
      "Georgia Department of Public Safety scales on I-75 and I-95 enforce aggressively — overweight and HOS violations show in DOT records and affect equipment-financing underwriting. Port of Savannah drayage requires GPA (Georgia Ports Authority) registration on top of standard DOT/MC credentials. Georgia is one of the states that enacted commercial-financing disclosure rules; the disclosure regime is narrower than California SB 1235 but applies to small-business financing contracts signed in Georgia.",
    economicNote:
      "Port of Savannah container throughput grew faster than any other US East Coast port through 2024-2025 as carriers diversified away from West Coast bottlenecks. The resulting drayage market expansion has favored mid-fleet Georgia operators with 5-15 trucks.",
  },
  FL: {
    market:
      "Florida trucking economics differ from other large states because intra-state freight dominates — the Florida produce outbound market (Plant City strawberries, Homestead avocados, Indian River citrus) generates heavy seasonal reefer demand from October through May, flowing primarily up I-95 to Northeast distribution centers. Port of Miami container volume is substantial but smaller than Savannah or NY/NJ; Port Everglades (Fort Lauderdale) and Port of Tampa Bay add inbound volume. Strong owner-operator population in Tampa, Jacksonville, Miami, and Orlando metros — Florida is consistently one of the top-five states by owner-operator density. Florida is a popular IRP base state for cross-country fleets because of no state income tax and competitive IRP fees relative to Northeast options. The lender panel sees Florida volume across all twelve entries, with TBS Factoring and Apex Capital particularly strong with the new-authority population that has historically clustered in Central Florida.",
    corridors: [
      "I-95 Miami-Jacksonville-Northeast (the produce outbound corridor)",
      "I-75 Tampa-Atlanta (the Gulf-Coast to Southeast backbone)",
      "I-10 Jacksonville-Pensacola-Mobile (the Gulf-Coast east-west)",
      "Florida's Turnpike (Miami to Wildwood, intra-state freight)",
    ],
    regulatoryNote:
      "Florida is one of the most-used IRP base states in the country for owner-operators running multi-state operations — no state income tax and competitive IRP fees make residency economically attractive. Florida has not enacted SB 1235-style commercial-financing disclosures, so factoring contracts use national standard documentation.",
    economicNote:
      "Florida intra-state produce reefer rates remain seasonal and predictable, with the strongest pricing in March-May as winter strawberry and citrus harvests outbound to Northeast markets compete for reefer capacity.",
  },
  OH: {
    market:
      "Ohio sits inside the manufacturing belt and the freight mix reflects it — steel out of Cleveland and Toledo, auto parts out of Columbus and Cincinnati, and warehousing growth along the I-70 / I-71 / I-75 triangle that has made Columbus one of the fastest-growing logistics markets in the country. The state's central position makes it a natural pass-through corridor for east-west freight, and the Ohio Turnpike (I-80/90) carries some of the highest truck volumes in the Midwest. Owner-operators based in Ohio frequently run regional dry van between Chicago, Pittsburgh, Detroit, and Indianapolis — short-to-medium-haul lanes where factoring company fuel-card economics matter materially. The lender panel underwrites Ohio carriers identically to other states; the operational difference is that Ohio carriers see less volatility in freight demand than coastal states because manufacturing-tied lanes are less spot-rate sensitive than retail or import-dependent corridors.",
    corridors: [
      "I-70 Columbus-Pittsburgh-East (the cross-country east-west)",
      "I-80/90 Ohio Turnpike (Northwest-East across northern Ohio)",
      "I-75 Toledo-Cincinnati (the Detroit-to-Cincinnati manufacturing spine)",
      "I-71 Cleveland-Columbus-Cincinnati (the intra-state triangle)",
    ],
    economicNote:
      "Columbus warehouse vacancy hit single digits through 2024-2025 as Amazon, Intel (Licking County semiconductor fab), and major retail distribution centers expanded — generating sustained drayage and short-haul demand for Central Ohio owner-operators.",
  },
  PA: {
    market:
      "The Pennsylvania Turnpike (I-76) is one of the highest-volume freight corridors in the country, running 360 miles east-west across the state and serving as the dominant Northeast-to-Midwest pass-through route. Pennsylvania's freight mix is bimodal: heavy intermodal and warehousing around Philadelphia (especially the Lehigh Valley I-78 corridor, where Amazon, Walmart, and major 3PLs run some of the largest distribution centers on the East Coast), plus a Western Pennsylvania industrial freight base (steel, glass, manufacturing) around Pittsburgh. Owner-operator density is meaningful in both metros. Pennsylvania's fuel taxes are among the highest in the country, which affects IFTA reconciliation for carriers based in the state — the trade-off is that PA's IFTA filings produce credits when running through lower-tax neighboring states. Lenders see strong Pennsylvania volume from mid-fleet operators (5-50 trucks) running Pennsylvania-Ohio-NY lanes, and the I-78 / I-80 corridor for the warehouse network feeding the Northeast.",
    corridors: [
      "I-76 Pennsylvania Turnpike (Pittsburgh-Harrisburg-Philadelphia)",
      "I-80 cross-state (Pittsburgh to NYC via north-central PA)",
      "I-78 Lehigh Valley-Newark (the e-commerce warehouse corridor)",
      "I-95 Philadelphia-Northeast",
    ],
    regulatoryNote:
      "Pennsylvania's fuel-tax rate is one of the highest in the country, which affects IFTA reconciliation for PA-based carriers — PA-residency typically produces IFTA credits when running through lower-tax neighboring states. Pennsylvania Public Utility Commission regulates some intrastate trucking activity above and beyond federal FMCSA requirements.",
    economicNote:
      "Lehigh Valley warehouse square footage doubled between 2018 and 2024 as e-commerce distribution networks expanded — the resulting drayage demand has made the I-78 corridor one of the most consistent rate environments in the Northeast.",
  },
  NY: {
    market:
      "New York trucking is shaped by tri-state freight density and by the operational difficulty of running trucks in and around New York City. The Port of NY/NJ (shared between the two states) is the third-largest US container port and the largest on the East Coast — drayage volume is enormous and concentrated in Newark, Elizabeth, and Staten Island terminals on the NJ side, with delivery destinations spread across all five boroughs and Long Island. Manhattan delivery is particularly constrained: truck-size limits, time-of-day restrictions, and the toll structure on every East River and Hudson River crossing make NYC-area operations materially more expensive than anywhere else in the country. Outside the metro, Upstate New York runs a more conventional Northeast freight mix — the NYS Thruway (I-87, I-90) carries cross-state and Canada-bound traffic. Lender panel sees the same twelve options nationally, but New York is one of the states with SB 1235-equivalent commercial-financing disclosure rules, which means factoring contracts signed by NY-based carriers carry standardized APR and total-cost-of-credit disclosure pages.",
    corridors: [
      "I-87 NYC-Albany-Montreal (the Hudson Valley to Canada backbone)",
      "I-90 NYS Thruway (cross-state east-west, Albany to Buffalo)",
      "I-95 Cross-Bronx and George Washington Bridge corridor",
      "Port of NY/NJ drayage (Newark, Elizabeth, Staten Island terminals)",
    ],
    regulatoryNote:
      "New York commercial-financing disclosure law (effective 2023) requires lenders to provide standardized APR and total-cost-of-credit disclosures on small-business financing contracts under $2.5M signed by NY-based carriers. NY enforcement of HOS and CDL rules is aggressive — the NYSDOT and NYS Police commercial-vehicle units operate heavy roadside inspection programs. Operating cost (tolls, fuel taxes, NYC entry fees) in NY metro is materially higher than national average.",
    economicNote:
      "Port of NY/NJ container volume returned to record levels through 2024 after the temporary Suez Canal disruptions of 2023-2024 routed more Asian imports to the East Coast. Drayage rates remained firm into 2025 despite national freight-rate compression.",
  },
  NJ: {
    market:
      "New Jersey trucking is dominated by the Port of NY/NJ drayage market — Newark and Elizabeth marine terminals handle the majority of East Coast container volume, and the resulting drayage network employs more port-trucking owner-operators than any other state on the East Coast. The NJ Turnpike (I-95) is consistently rated the most congested freight corridor in the United States, and the I-78 corridor connecting Newark to the Lehigh Valley warehouses is a critical e-commerce distribution lane. NJ-based owner-operators frequently run short-haul drayage by day and longer Northeast-corridor freight by overnight schedules. Commercial vehicle inspection at the NJ-PA and NJ-NY borders is aggressive, and the NJ Motor Vehicle Commission's commercial-vehicle enforcement unit pursues HOS and weight violations with focus. The lender panel underwrites NJ carriers identically; the practical difference is that NJ-based fleets tend toward higher invoice volume per truck (port drayage = many short loads = many invoices), which favors factoring companies with bulk-invoice processing strength.",
    corridors: [
      "NJ Turnpike (I-95, the most congested freight corridor in the US)",
      "I-78 Newark-Pennsylvania (Lehigh Valley warehouse corridor)",
      "I-80 Northern NJ-Pennsylvania",
      "Port of NY/NJ container drayage (Newark, Elizabeth, Bayonne)",
    ],
    regulatoryNote:
      "NJ commercial vehicle inspection enforcement at the NJ Motor Vehicle Commission and NJSP is aggressive, particularly along the Turnpike and at port terminal entry/exit points. NJ has not enacted SB 1235-style commercial-financing disclosures separately — but contracts signed by NJ carriers may still fall under NY disclosure law if executed across the river.",
  },
  TN: {
    market:
      "Memphis is the dominant Tennessee freight hub — FedEx Express's global SuperHub is in Memphis, and the city is one of the largest US intermodal markets (BNSF, UP, NS, and CSX all operate large yards). The resulting freight ecosystem makes Memphis the third-largest intermodal market in the country behind Chicago and Los Angeles. Nashville's growth as a logistics and manufacturing market (Nissan, GM, the Amazon HQ2 spillover) has created a secondary Tennessee freight hub, and I-40 connects Memphis-Nashville-Knoxville as the dominant cross-state corridor. Owner-operator density is meaningful in both Memphis and the Nashville metro. Tennessee has no state income tax, which makes IRP-base-state residency attractive for cross-country owner-operators choosing between Tennessee, Texas, and Florida. The lender panel sees particularly strong Tennessee volume from FedEx-adjacent contract carriers and from mid-fleet operators running East-Coast-to-California through Memphis. Factoring desk competition in Memphis is unusually deep because of the volume of regional and ICCMC-style fleet contractors.",
    corridors: [
      "I-40 Memphis-Nashville-Knoxville (cross-country backbone, ~450 miles)",
      "I-65 Nashville-Louisville-Birmingham (north-south spine)",
      "I-24 Nashville-Chattanooga (Tennessee Valley corridor)",
      "I-55 Memphis-St. Louis (Mississippi River corridor)",
    ],
    regulatoryNote:
      "Tennessee has no state income tax, making the state competitive for IRP base-state residency alongside Texas and Florida. Tennessee Department of Safety enforces commercial-vehicle compliance at fixed scales on I-40 and I-65; HOS and weight-violation rates show in DOT records.",
  },
  NC: {
    market:
      "North Carolina trucking is anchored by Charlotte's logistics market (the largest banking and 3PL hub in the Southeast outside Atlanta) and by the Research Triangle (Raleigh-Durham-Chapel Hill) manufacturing base. The state's geography puts NC on the I-85 corridor that runs Atlanta-Charlotte-Richmond, one of the highest-volume freight corridors in the Southeast, and on the I-95 corridor that connects Southeast-to-Northeast through the state. Owner-operator density is meaningful in both Charlotte and Raleigh metros. NC's manufacturing freight mix (textiles, furniture, pharmaceuticals, and increasingly semiconductor-related) has shifted over the last two decades from heavy seasonal swings to more stable year-round demand. The lender panel underwrites NC carriers identically to other states; what matters operationally is that NC-based fleets running I-85 and I-95 see relatively consistent freight rates and a deep broker market.",
    corridors: [
      "I-85 Atlanta-Charlotte-Richmond (the Piedmont manufacturing corridor)",
      "I-95 Charlotte-Northeast (the Southeast-to-Northeast spine)",
      "I-40 Asheville-Raleigh-coast (cross-state east-west)",
      "I-77 Charlotte-Virginia (north-south through the Carolinas)",
    ],
  },
  IN: {
    market:
      'Indiana calls itself "The Crossroads of America" because every major Midwest interstate (I-65, I-70, I-74, I-80/90, I-94) converges on Indianapolis — the geography makes Indiana the most-traveled-through state in the country by long-haul freight. Indianapolis has built one of the largest logistics and distribution markets in the Midwest (FedEx Ground hub, Amazon distribution centers, automotive supply-chain warehouses), and southern Indiana along the Ohio River carries steel and manufacturing freight. The state\'s central position makes it a natural fleet domicile for Midwest-regional operators — Indiana-based fleets frequently run dry van between Chicago, Cincinnati, Louisville, and St. Louis on short-to-medium-haul lanes. Indiana IFTA fuel taxes are reasonable relative to Ohio and Illinois neighbors, which makes the state attractive for IRP base-state residency.',
    corridors: [
      "I-65 Chicago-Indianapolis-Louisville (the north-south backbone)",
      "I-70 Indianapolis-Columbus-Pittsburgh (cross-country east-west)",
      "I-80/90 Indiana Toll Road (cross-country across northern Indiana)",
      "I-74 Indianapolis-Cincinnati (regional Midwest)",
    ],
    economicNote:
      "Indianapolis warehouse and distribution-center square footage grew faster than any other Midwest city through 2023-2024 as Amazon, FedEx, and major retailers expanded their Midwest distribution footprints — driving sustained short-haul demand.",
  },
  MI: {
    market:
      "Michigan's freight mix is dominated by automotive manufacturing — the Big Three (GM, Ford, Stellantis) and the tier-one supplier base concentrated in Detroit, Flint, Lansing, and Grand Rapids generate enormous JIT (just-in-time) part-and-component freight demand. Detroit-Windsor (Ambassador Bridge plus the new Gordie Howe Bridge) is the busiest commercial-vehicle border crossing in North America — Michigan carriers running cross-border into Canada need FAST card credentials, ACE manifests, and (often) cross-border bonded-carrier authority. Class 8 freight in Michigan is heavily tied to automotive cycle demand, which makes Michigan-based carrier revenue more cyclical than national average. Owner-operator density is highest in the Detroit metro and along the I-94 / I-96 corridors. The lender panel underwrites Michigan carriers without restriction; the operational consideration is that automotive-tier freight pays well but compresses fast when OEMs cut production — Michigan factoring volumes track Big Three production schedules.",
    corridors: [
      "I-75 Detroit-Toledo-South (the auto-supplier and Midwest-South spine)",
      "I-94 Detroit-Chicago (the cross-country east-west backbone)",
      "I-96 Detroit-Grand Rapids-Lansing (intra-state east-west)",
      "Detroit-Windsor border crossings (Ambassador Bridge, Gordie Howe Bridge)",
    ],
    regulatoryNote:
      "Detroit-Windsor commercial-vehicle crossings require FAST/EXPRES enrolment for time-of-day priority lanes, ACE eManifest filing before arrival, and (for repeat cross-border carriers) a CBP-bonded relationship. Michigan IFTA and IRP requirements are standard; the cross-border element is what differentiates Michigan operations from other Midwest states.",
    economicNote:
      "Big Three vehicle production through 2024-2025 stabilized after EV-transition disruption, with Michigan automotive freight demand returning to mid-cycle levels. Tier-one supplier freight remains the most stable Michigan rate environment.",
  },
  MO: {
    market:
      "Missouri trucking is anchored by two major freight hubs at opposite ends of the state: St. Louis hosts substantial intermodal volume (BNSF, UP, NS, and CSX yards plus Mississippi River barge connections), and Kansas City is one of the fastest-growing US intermodal markets (BNSF Logistics Park Kansas City in Edgerton, KS — across the state line — drives MO drayage demand). I-70 is the dominant cross-state corridor and one of the highest-volume cross-country freight routes in the country. Owner-operator density is meaningful in both Kansas City and St. Louis metros, and Missouri's central position makes it a natural fleet domicile for cross-country operators choosing a base state with reasonable cost-of-operation. RTS Financial is headquartered in Overland Park, Kansas (just outside Kansas City), and serves the Missouri-Kansas regional market with deep local relationships. The lender panel underwrites Missouri carriers identically to other states.",
    corridors: [
      "I-70 Kansas City-St. Louis-East (cross-country backbone)",
      "I-44 Springfield-St. Louis (regional Midwest)",
      "I-35 Kansas City-Iowa (the Central Plains north-south)",
      "I-55 St. Louis-Memphis (Mississippi River corridor)",
    ],
    regionalLenders: ["RTS Financial (Overland Park, KS — serves MO regional)"],
  },
  WA: {
    market:
      "Washington trucking is anchored by the Port of Seattle/Tacoma (the Northwest Seaport Alliance), which is one of the largest US container ports and the gateway for Asian imports flowing into the Pacific Northwest and Western Canada. Drayage demand around the Seattle-Tacoma terminals is consistent and substantial. Outside the port, Washington's freight mix includes long-haul agriculture (eastern Washington apples, hops, wheat) flowing southbound on I-5 and eastbound on I-90, and lumber/forest products from the Olympic Peninsula and Cascade region. I-5 between Seattle and the California border carries the dominant West-Coast north-south freight corridor, and I-90 connects Seattle to the Midwest via Spokane. Owner-operator density is highest in the Seattle-Tacoma metro and in the Yakima Valley agricultural region. The lender panel sees consistent Washington volume across all twelve directory entries; what matters operationally is the cross-border element with British Columbia (Blaine border crossing).",
    corridors: [
      "I-5 Seattle-Portland-California (the West Coast spine)",
      "I-90 Seattle-Spokane-East (the cross-country east-west)",
      "I-405 Bellevue-Seattle-Renton (the Eastside corridor)",
      "Port of Seattle/Tacoma drayage routes",
    ],
    regulatoryNote:
      "Washington has no state income tax, which makes the state competitive for owner-operator residency. WSP and WSDOT commercial-vehicle enforcement at I-5 and I-90 scales is standard. Cross-border crossings into British Columbia at Blaine (Pacific Highway, Peace Arch) require standard ACE/ACI manifests and FAST enrolment for time-of-day priority.",
  },
};

/* Build the procedural fallback content from a state name. Generic but
   substantively different from copy on other pages because the state name
   threads through. */
function buildProcedural(
  stateName: string,
): StateContextEntry["procedural"] {
  return {
    summary: `${stateName} trucking operations are served by all 12 lenders on the Dispatched panel. ${stateName} carriers face standard federal compliance (MC#, DOT#, BOC-3, UCR) plus ${stateName}-administered IRP apportioned registration, IFTA quarterly fuel-tax filing, and any state-specific commercial-financing disclosure rules that bind contracts signed in the state.`,
    faqLine: `Yes. The Dispatched lender panel includes 12 factoring, equipment financing, and working capital providers serving ${stateName}-based carriers — the same panel that serves every other US state. The operational differences between ${stateName} and other states sit in IRP base-state, IFTA filing jurisdiction, and any state-level financing-disclosure rules.`,
  };
}

/* Build the full state context map from STATE_INFO. Every state gets a
   procedural fallback; the top 15 also get curated content layered on. */
function buildStateContextMap(): Record<string, StateContextEntry> {
  const map: Record<string, StateContextEntry> = {};
  for (const s of STATE_INFO) {
    const procedural = buildProcedural(s.name);
    const entry: StateContextEntry = TOP_TRUCKING_STATES.includes(s.code)
      ? {
          stateCode: s.code,
          stateName: s.name,
          stateSlug: s.slug,
          procedural,
          curated: CURATED[s.code],
        }
      : {
          stateCode: s.code,
          stateName: s.name,
          stateSlug: s.slug,
          procedural,
        };
    map[s.slug] = entry;
  }
  return map;
}

export const STATE_LENDER_CONTEXT: Record<string, StateContextEntry> =
  buildStateContextMap();

export function getStateContext(
  stateSlug: string,
): StateContextEntry | undefined {
  return STATE_LENDER_CONTEXT[stateSlug];
}
