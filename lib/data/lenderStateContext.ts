import "server-only";

/* ===========================================================================
   State-specific context for /lenders/[state] pages. The lender panel is the
   same 12 lenders nationwide, but the trucking-finance picture differs
   materially by state — corridors, regulatory rules, regional lenders, and
   freight economics. Without state-specific context, 51 pages risk being
   collapsed as thin / duplicate content by search engines.

   Architecture:
     - Every state and DC has curated content: market paragraph, named
       freight corridors, and where relevant a regulatory note. The top 15
       trucking states (CURATED) also carry regional lenders and economic
       notes; the rest (CURATED_MORE) stick to structural, geographic facts.
     - The procedural fallback built from the state name remains for the
       FAQ line and as a safety net.

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

/* Curated content per top-15 state. The keys are state codes. */
const CURATED: Record<
  string,
  NonNullable<StateContextEntry["curated"]>
> = {
  TX: {
    market:
      "Texas is the largest trucking origin state by registered owner-operators — and the state hosts the highest concentration of factoring-company headquarters in the country. The freight base splits three ways: Port of Houston container drayage and chemical tankers feeding the Gulf Coast petrochem complex; long-haul dry van and reefer through the Texas Triangle (Dallas-Fort Worth, Houston, San Antonio) that handles intra-state and Mexico-bound traffic; and Permian Basin oilfield service trucking running specialized loads through Midland-Odessa. Apex Capital (Fort Worth), Triumph Business Capital (Dallas), and 1st Commercial Credit (Austin) are all Texas-headquartered — three of the twelve directory lenders are operating from inside the state, which gives Texas carriers unusual access to in-region account management. New-authority operators benefit from Texas's relatively low operating costs and absence of state income tax, but the trade-off is heavy congestion on I-35 through Austin and growing weight-enforcement on I-10 east of San Antonio. Class 8 equipment financing has the most competitive rates here because every major trucking lender wants Texas paper on the book.",
    corridors: [
      "I-10 Houston-San Antonio-El Paso (Gulf Coast to West Texas)",
      "I-35 San Antonio-Dallas-Austin (the Texas Triangle backbone)",
      "I-45 Houston-Dallas (the highest-volume intra-state lane)",
      "I-20 Dallas-Fort Worth-Midland-Odessa (the West Texas spine, joining I-10 east of El Paso)",
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
      "I-5 Los Angeles-Sacramento (the Central Valley spine)",
      "I-15 Los Angeles-Las Vegas (the I.E. to Nevada warehouse corridor)",
      "I-10 Los Angeles-Phoenix (Southern California to Sun Belt)",
      "Port of LA/Long Beach drayage routes (San Pedro and Wilmington terminals to Inland Empire)",
    ],
    regulatoryNote:
      "CARB's Truck and Bus Regulation requires diesel trucks operating in California to run 2010-or-newer engines, and CARB's emissions rules continue to change; check current requirements before buying equipment for California lanes. AB 5 makes lease-on owner-operator arrangements high-risk for misclassification penalties — the ABC test for independent-contractor status is the strictest in the country. SB 1235 commercial-financing disclosure law applies to factoring, MCA, and equipment-financing contracts under $500K signed by California-based small businesses; lenders must provide standardized APR, finance-charge, and total-cost-of-credit disclosures.",
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
      "Georgia trucking is anchored by two distinct hubs: Atlanta is the dominant inland logistics market in the Southeast (third-largest US city by warehouse square footage), and Port of Savannah is one of the fastest-growing US container ports — Savannah surpassed New York/New Jersey in some quarters of 2024 by container volume. The intersection of I-75, I-85, and I-20 at Atlanta makes the metro a natural transshipment point for Southeast freight flowing between Florida, the Carolinas, and the Mid-Atlantic. Owner-operator density is highest in Atlanta's southern suburbs (Henry, Clayton, Fayette counties) and in Savannah/Chatham County around the port drayage market. Lenders see meaningful Georgia volume across all twelve directory entries, and Georgia's relatively low cost of operation compared to Northeast neighbors keeps the state attractive for new-authority operators. The Georgia Department of Public Safety operates aggressive weight and inspection enforcement at fixed scales on I-75 and I-95, which surfaces in DOT records and matters at lender underwriting for equipment financing.",
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
      "Florida is one of the most-used IRP base states in the country for owner-operators running multi-state operations — no state income tax and competitive IRP fees make residency economically attractive. Florida has its own commercial-financing disclosure law, which covers some factoring and other receivables-purchase transactions.",
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
      "I-80 cross-state (Ohio line to the New Jersey line via north-central PA)",
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
      "New York trucking is shaped by tri-state freight density and by the operational difficulty of running trucks in and around New York City. The Port of NY/NJ (shared between the two states) is the third-largest US container port and the largest on the East Coast — drayage volume is enormous and concentrated in the Newark and Elizabeth terminals on the NJ side, with a further terminal on Staten Island, with delivery destinations spread across all five boroughs and Long Island. Manhattan delivery is particularly constrained: truck-size limits, time-of-day restrictions, and the toll structure on every East River and Hudson River crossing make NYC-area operations materially more expensive than anywhere else in the country. Outside the metro, Upstate New York runs a more conventional Northeast freight mix — the NYS Thruway (I-87, I-90) carries cross-state and Canada-bound traffic. Lender panel sees the same twelve options nationally, but New York is one of the states with SB 1235-equivalent commercial-financing disclosure rules, which means factoring contracts signed by NY-based carriers carry standardized APR and total-cost-of-credit disclosure pages.",
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
      "Memphis is the dominant Tennessee freight hub — FedEx Express's global SuperHub is in Memphis, and the city is one of the largest US intermodal markets (BNSF, UP, NS, and CSX all operate large yards). The resulting freight ecosystem makes Memphis the third-largest intermodal market in the country behind Chicago and Los Angeles. Nashville's growth as a logistics and manufacturing market (Nissan, GM, Amazon's Nashville operations center) has created a secondary Tennessee freight hub, and I-40 connects Memphis-Nashville-Knoxville as the dominant cross-state corridor. Owner-operator density is meaningful in both Memphis and the Nashville metro. Tennessee has no state income tax, which makes IRP-base-state residency attractive for cross-country owner-operators choosing between Tennessee, Texas, and Florida. The lender panel sees particularly strong Tennessee volume from FedEx-adjacent contract carriers and from mid-fleet operators running East-Coast-to-California through Memphis. Factoring desk competition in Memphis is unusually deep because of the volume of regional and fleet contractors.",
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
      "I-95 Fayetteville-Rocky Mount (the Southeast-to-Northeast spine through eastern NC)",
      "I-40 Asheville-Raleigh-coast (cross-state east-west)",
      "I-77 Charlotte-Virginia (north-south through the Carolinas)",
    ],
  },
  IN: {
    market:
      'Indiana calls itself "The Crossroads of America" because every major Midwest interstate (I-65, I-69, I-70, I-74) converges on Indianapolis — the geography makes Indiana the most-traveled-through state in the country by long-haul freight. Indianapolis has built one of the largest logistics and distribution markets in the Midwest (FedEx Ground hub, Amazon distribution centers, automotive supply-chain warehouses), and southern Indiana along the Ohio River carries steel and manufacturing freight. The state\'s central position makes it a natural fleet domicile for Midwest-regional operators — Indiana-based fleets frequently run dry van between Chicago, Cincinnati, Louisville, and St. Louis on short-to-medium-haul lanes. Indiana IFTA fuel taxes are reasonable relative to Ohio and Illinois neighbors, which makes the state attractive for IRP base-state residency.',
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
      "I-405 Lynnwood-Bellevue-Renton (the Eastside corridor)",
      "Port of Seattle/Tacoma drayage routes",
    ],
    regulatoryNote:
      "Washington has no state income tax, which makes the state competitive for owner-operator residency. WSP and WSDOT commercial-vehicle enforcement at I-5 and I-90 scales is standard. Cross-border crossings into British Columbia at Blaine (the Pacific Highway commercial crossing) require standard ACE/ACI manifests and FAST enrolment for time-of-day priority.",
  },
};

/* Curated content for the remaining states and DC. Structural, geographic
   facts only: industries, hubs, ports, crossings and Interstate corridors.
   No statistics, rankings or dates, so nothing here goes stale with a data
   release. */
const CURATED_MORE: Record<
  string,
  NonNullable<StateContextEntry["curated"]>
> = {
  AL: {
    market:
      "Alabama freight is shaped by automotive assembly plants and their supplier parks, steel and pipe production around Birmingham, poultry processing in the north, and forest products across the southern half of the state. The Port of Mobile adds container, coal, and steel drayage on the Gulf, with intermodal ramps in the Birmingham area tying the state to the rail network. That mix produces just-in-time dry van work for the auto plants, flatbed for steel and lumber, and reefer for poultry, with most lanes running regional into Georgia, Tennessee, and Mississippi.",
    corridors: [
      "I-65 Mobile-Montgomery-Birmingham-Huntsville area (the north-south spine)",
      "I-20 Birmingham-Atlanta (the automotive and steel lane east)",
      "I-59 Birmingham-Chattanooga and Birmingham-Meridian",
      "I-10 Mobile (the Gulf Coast east-west link)",
      "I-85 Montgomery-Auburn-Atlanta",
    ],
  },
  AK: {
    market:
      "Alaska trucking is a different business from the Lower 48. Most consumer freight arrives by water at the Port of Alaska in Anchorage and moves outward by truck, while the oil fields on the North Slope depend on heavy-haul and supply runs up the Dalton Highway from Fairbanks. Seafood moves out of coastal communities under refrigeration, and many towns are reachable only by barge or air. Carriers here plan around winter road conditions, long distances between services, seasonal weight restrictions during spring thaw, and the Alaska Highway through Canada for overland freight to and from the contiguous states.",
    corridors: [
      "Glenn Highway and Parks Highway Anchorage-Wasilla-Fairbanks (the Railbelt corridor)",
      "Dalton Highway Fairbanks-Prudhoe Bay (the North Slope haul road)",
      "Seward Highway Anchorage-Seward and Sterling Highway to the Kenai Peninsula",
      "Alaska Highway Tok-Canadian border (the overland link to the Lower 48)",
    ],
    regulatoryNote:
      "Alaska is not a member of the International Fuel Tax Agreement, so IFTA licensing applies to Alaska-based carriers only when they operate in member jurisdictions. Overland trips to the Lower 48 cross Canada and require customs manifests in both directions. Alaska has no state personal income tax.",
  },
  AZ: {
    market:
      "Arizona sits on the main truck route between Southern California and Texas, so much of its volume is through-freight alongside what the state generates itself. Phoenix has become a distribution and warehousing market serving the Southwest, with semiconductor and aerospace manufacturing adding high-value loads. The Nogales port of entry is a principal gateway for winter produce from Mexico, which drives a strong reefer season, and Yuma ships winter leafy greens. Copper mining supports flatbed and bulk work. Summer heat is an operating factor for tires, cooling systems, and reefer units.",
    corridors: [
      "I-10 Phoenix-Tucson and west to California (the southern transcontinental route)",
      "I-40 Kingman-Flagstaff-Holbrook (the northern east-west route)",
      "I-17 Phoenix-Flagstaff",
      "I-19 Tucson-Nogales (the produce lane from the Mexican border)",
      "I-8 Yuma-Casa Grande",
    ],
  },
  AR: {
    market:
      "Arkansas carries more trucking weight than its size suggests. Northwest Arkansas is home to several national truckload and logistics companies and to major retail and poultry headquarters, which concentrates dry van and reefer demand around Bentonville, Springdale, and Fort Smith. Poultry, rice, and soybeans move out of the state under refrigeration and in bulk, and timber and paper come out of the southern counties. West Memphis, across the river from Memphis, is a major truck stop and relay point where two transcontinental Interstates meet.",
    corridors: [
      "I-40 Fort Smith-Little Rock-West Memphis (the east-west spine)",
      "I-30 Little Rock-Texarkana (the lane toward Dallas)",
      "I-49 Fort Smith-Fayetteville-Bentonville (the Northwest Arkansas corridor)",
      "I-55 West Memphis north toward St. Louis",
    ],
  },
  CO: {
    market:
      "Colorado freight centers on the Front Range, where Denver acts as the distribution hub for the Rocky Mountain region. Inbound consumer goods outweigh outbound freight, so carriers often plan around the backhaul out of Denver. Agriculture on the eastern plains, beef processing around Greeley, brewing, and oil and gas activity in the Denver-Julesburg Basin add reefer, tanker, and flatbed work. Mountain driving defines the western half of the state: steep grades, chain requirements in winter, and occasional closures on the main east-west route all affect scheduling and equipment wear.",
    corridors: [
      "I-25 Pueblo-Colorado Springs-Denver-Fort Collins (the Front Range spine)",
      "I-70 Denver-Glenwood Springs-Grand Junction (the mountain east-west route)",
      "I-76 Denver-Fort Morgan-Julesburg (the link to I-80 in Nebraska)",
      "I-70 Denver-Limon-Burlington (the plains route toward Kansas)",
    ],
    regulatoryNote:
      "Colorado enforces a commercial-vehicle chain law on mountain sections of I-70 for much of the year, and carriers are expected to carry chains or approved traction devices during that period.",
  },
  CT: {
    market:
      "Connecticut is a dense, short-haul market between New York and Boston. Freight is dominated by consumer distribution, food and beverage, fuel delivery, and aerospace and defense manufacturing with its supplier base, including submarine construction at Groton. Most moves are regional and day-cab, with heavy congestion along the shoreline route and around Hartford. The ports at New Haven, Bridgeport, and New London handle petroleum products, bulk, and breakbulk more than containers. Carriers face high operating costs, tight delivery windows, and restrictions that keep trucks off the state parkways.",
    corridors: [
      "I-95 Greenwich-Bridgeport-New Haven-New London (the shoreline route)",
      "I-91 New Haven-Hartford-Springfield",
      "I-84 Danbury-Waterbury-Hartford (the inland route toward Massachusetts)",
      "I-395 New London-Norwich north toward Worcester",
    ],
    regulatoryNote:
      "Connecticut charges a highway use fee on heavy multi-unit trucks based on weight and miles driven in the state; carriers register for it with the Department of Revenue Services in addition to IFTA and IRP.",
  },
  DE: {
    market:
      "Delaware is small but sits directly on the Northeast corridor between Baltimore and Philadelphia, so through-traffic is constant. The Port of Wilmington is known for fresh fruit and juice imports, which creates steady reefer drayage, and it also handles autos and bulk. Poultry production on the Delmarva Peninsula moves feed, live birds, and processed product, mostly under refrigeration. Chemical manufacturing around Wilmington adds tanker work. Most Delaware-based carriers run regional lanes into Pennsylvania, New Jersey, Maryland, and Virginia.",
    corridors: [
      "I-95 Wilmington-Newark (the Northeast corridor)",
      "I-295 Wilmington to the Delaware Memorial Bridge and New Jersey",
      "I-495 the Wilmington bypass along the port",
    ],
    regulatoryNote:
      "Delaware has no state sales tax, which affects where some carriers choose to buy and title equipment; registration and titling rules still follow the carrier's base state.",
  },
  DC: {
    market:
      "The District of Columbia generates almost no outbound freight. It is a consumption market: food service, retail, construction materials, government and office supply, and waste hauling. Nearly every delivery is last-mile work originating from distribution centers in Maryland and Virginia, handled by straight trucks and day cabs. Carriers working the District deal with truck-route restrictions, limited loading zones, security perimeters around federal buildings, and congestion on the bridges and the Beltway approaches.",
    corridors: [
      "I-295 and DC-295 (the Anacostia Freeway, the main north-south truck route)",
      "I-395 from Virginia into the city center",
      "I-95 and I-495 Capital Beltway (the regional ring through Maryland and Virginia)",
    ],
  },
  HI: {
    market:
      "Hawaii trucking is island-based and tied to the harbors. Almost everything consumed in the state arrives by ocean container at Honolulu Harbor and is then drayed to warehouses or transshipped by barge to the neighbor islands, where local carriers handle final delivery. There is no interstate trucking by road, so fleets are regional by definition: container drayage, fuel delivery, construction materials, and food and hospitality supply for the visitor industry. Equipment costs run high because trucks, parts, and tires all arrive by ship.",
    corridors: [
      "H-1 Honolulu-Pearl City-Kapolei (the main Oahu freight route from the harbor)",
      "H-2 Pearl City-Wahiawa (central Oahu)",
      "H-3 Halawa-Kaneohe (the windward link)",
    ],
    regulatoryNote:
      "Hawaii is not a member of IFTA or IRP because no highways connect it to other jurisdictions. Carriers register and pay fuel taxes under state and county rules instead.",
  },
  ID: {
    market:
      "Idaho freight is agricultural at its core. Potatoes, sugar beets, onions, and dairy from the Snake River Plain move in reefers, bulk trailers, and tankers, with food-processing plants strung along the same valley. Timber and wood products come out of the northern panhandle on flatbeds, and Boise has grown as a distribution and technology-manufacturing market. Harvest season creates a pronounced fall peak. The state is long and mountainous, so north-south movement is slow and most heavy freight follows the east-west Interstate across the south.",
    corridors: [
      "I-84 Boise-Twin Falls-Burley (the Snake River Plain spine)",
      "I-15 Pocatello-Idaho Falls north toward Montana",
      "I-86 Burley area-Pocatello",
      "I-90 Coeur d'Alene (the panhandle crossing between Spokane and Montana)",
    ],
    regulatoryNote:
      "Idaho allows heavier gross weights and longer combinations on designated routes than the federal default, with permits; carriers running those configurations need to confirm route-specific limits.",
  },
  IA: {
    market:
      "Iowa moves farm output and the inputs that produce it. Corn, soybeans, ethanol, and feed travel in hoppers and tankers; pork and egg production and the packing plants that serve them generate reefer and livestock hauling; and farm-equipment and food manufacturing add dry van and flatbed loads. Des Moines sits at the crossing of the state's two main Interstates and serves as its distribution center, with Cedar Rapids and the Quad Cities area as secondary hubs. Harvest and planting set the rhythm of the year, and winter weather on the open plains affects scheduling.",
    corridors: [
      "I-80 Council Bluffs-Des Moines-Iowa City-Davenport (the transcontinental east-west route)",
      "I-35 Des Moines north to Minnesota and south to Kansas City",
      "I-29 Council Bluffs-Sioux City (the Missouri River corridor)",
      "I-380 Iowa City-Cedar Rapids-Waterloo",
    ],
  },
  KS: {
    market:
      "Kansas freight follows wheat, cattle, and aircraft. Western Kansas beef-packing plants around Dodge City, Garden City, and Liberal move boxed beef under refrigeration, with cattle and feed hauling behind them. Wheat and other grains move in hoppers at harvest. Wichita's aircraft manufacturing and its suppliers generate specialized and flatbed loads, and the Kansas City metro, which straddles the state line, is a national rail and intermodal crossroads with large logistics parks on the Kansas side. Long, open east-west runs make the state a through-route for transcontinental traffic.",
    corridors: [
      "I-70 Kansas City-Topeka-Salina-Hays (the east-west spine)",
      "I-35 Kansas City-Emporia-Wichita and south to Oklahoma",
      "I-135 Salina-Wichita",
      "Kansas Turnpike Kansas City-Topeka-Wichita",
    ],
  },
  KY: {
    market:
      "Kentucky combines manufacturing freight with two air-cargo hubs. Automotive assembly plants in Georgetown, Louisville, and Bowling Green, plus their supplier network, generate just-in-time dry van work. Louisville hosts a global parcel air hub and Northern Kentucky hosts an express and e-commerce air hub at the Cincinnati airport, both of which feed overnight truck cycles. Bourbon distilling adds barrel, glass, and finished-goods loads, and coal still moves from the eastern and western fields. The state sits within a day's drive of much of the eastern population, which is why distribution centers cluster along its Interstates.",
    corridors: [
      "I-65 Louisville-Elizabethtown-Bowling Green (the north-south auto corridor)",
      "I-75 Covington-Lexington-London (the Cincinnati-to-Tennessee route)",
      "I-64 Louisville-Frankfort-Lexington and east to West Virginia",
      "I-71 Louisville-Covington",
      "I-24 Paducah toward Nashville",
    ],
    regulatoryNote:
      "Kentucky levies a weight-distance tax (KYU) on heavier commercial vehicles for miles driven in the state. Carriers need a KYU number in addition to IFTA and IRP credentials.",
  },
  LA: {
    market:
      "Louisiana freight runs on the river and the refineries. The petrochemical corridor along the Mississippi between Baton Rouge and New Orleans, and the plants around Lake Charles, produce tanker, hazmat, and bulk work. The Port of New Orleans and the Port of South Louisiana handle containers, grain, and breakbulk, creating drayage and export hauling. Offshore oil and gas support moves through Port Fourchon and the coastal service towns on flatbeds and specialized trailers, and sugarcane has a concentrated fall harvest. Hurricane season is a real planning factor for routing and equipment.",
    corridors: [
      "I-10 Lake Charles-Lafayette-Baton Rouge-New Orleans (the Gulf Coast spine)",
      "I-12 Baton Rouge-Hammond-Slidell (the route around New Orleans)",
      "I-20 Shreveport-Monroe (the northern east-west route)",
      "I-49 Lafayette-Alexandria-Shreveport",
      "I-55 Hammond north toward Jackson",
    ],
  },
  ME: {
    market:
      "Maine sits at the end of the line in the Northeast, so most trucks deliver in loaded and work to find freight out. What the state ships is forest products, including logs, lumber, pulp, and paper; seafood, especially lobster, which moves under refrigeration on tight schedules; and potatoes and wild blueberries from the northern and eastern counties. Portland is the main distribution point and has a container terminal. Cross-border freight moves through Houlton and Calais into New Brunswick. Winter weather and spring road postings on secondary routes shape the operating year.",
    corridors: [
      "I-95 Kittery-Portland-Augusta-Bangor-Houlton (the state's spine to the Canadian border)",
      "I-295 Portland-Brunswick-Gardiner (the coastal alternate)",
      "I-395 Bangor-Brewer",
    ],
    regulatoryNote:
      "Maine posts many secondary roads with reduced weight limits during the spring thaw. Border crossings into New Brunswick and Quebec require standard customs manifests.",
  },
  MD: {
    market:
      "Maryland freight is anchored by the Port of Baltimore, which handles containers and is especially known for roll-on/roll-off cargo such as automobiles and farm and construction machinery. That produces steady drayage and auto-hauling work, with distribution centers spread along the corridor between Baltimore and Washington and out toward Hagerstown, where two Interstates cross. Poultry from the Eastern Shore moves under refrigeration. Much of the state's traffic is regional Northeast-corridor work with heavy congestion, tolls, and tunnel restrictions for hazardous materials in Baltimore.",
    corridors: [
      "I-95 Baltimore-Washington suburbs (the Northeast corridor)",
      "I-70 Baltimore-Frederick-Hagerstown (the route west)",
      "I-81 Hagerstown (the Appalachian north-south truck route)",
      "I-83 Baltimore north toward Harrisburg",
      "I-695 Baltimore Beltway and I-495 Capital Beltway",
    ],
  },
  MA: {
    market:
      "Massachusetts is a consumption-heavy market with far more freight arriving than leaving. Boston-area distribution, food service, seafood from New Bedford and Gloucester, medical-device and biotech manufacturing, and construction materials make up most of the work. Distribution centers have moved outward along the outer ring road and into central Massachusetts around Worcester, which also has an intermodal rail terminal. Conley Terminal in Boston handles containers. Runs are short and regional, with congestion, low bridges on some older roads, and high operating costs as constants.",
    corridors: [
      "I-90 Massachusetts Turnpike Boston-Worcester-Springfield and west to New York",
      "I-95 around Boston and north-south through the state",
      "I-495 the outer ring Marlborough-Lowell-Haverhill",
      "I-91 Springfield-Greenfield (the Connecticut River valley)",
      "I-84 Sturbridge toward Hartford",
    ],
  },
  MN: {
    market:
      "Minnesota freight reflects farming, food, mining, and medical technology. The Twin Cities are the distribution hub for the Upper Midwest and home to food and medical-device companies that generate dry van and temperature-controlled loads. Grain, sugar beets from the Red River Valley, and livestock move in bulk and reefer equipment. Taconite from the Iron Range moves mostly by rail to the Port of Duluth-Superior on Lake Superior, which also ships grain, with trucks handling supply and equipment. Winter is long, and spring load restrictions on secondary roads matter for heavy haulers.",
    corridors: [
      "I-94 Moorhead-St. Cloud-Minneapolis-St. Paul and east to Wisconsin",
      "I-35 Albert Lea-Minneapolis-St. Paul-Duluth",
      "I-90 Worthington-Albert Lea-La Crosse area (the southern east-west route)",
      "I-494 and I-694 the Twin Cities beltway",
    ],
    regulatoryNote:
      "Minnesota applies seasonal spring load restrictions on many state and local roads and allows winter weight increases on designated routes; both change with weather each year.",
  },
  MS: {
    market:
      "Mississippi freight is built on poultry, timber, and manufacturing along its Interstates. Poultry processing in the central and southern counties generates reefer loads and feed hauling, and pine timber feeds lumber and paper mills with log trucks and flatbeds. Automotive assembly near Canton and Blue Springs and shipbuilding at Pascagoula add supplier and specialized freight. The Port of Gulfport handles containers, including fruit imports. Northern Mississippi, particularly DeSoto County, functions as part of the Memphis distribution market just across the state line.",
    corridors: [
      "I-55 Southaven-Jackson-McComb (the north-south spine between Memphis and New Orleans)",
      "I-20 Vicksburg-Jackson-Meridian (the east-west route)",
      "I-59 Meridian-Hattiesburg toward New Orleans",
      "I-10 Gulfport-Biloxi-Pascagoula (the Gulf Coast route)",
      "I-22 Tupelo area toward Birmingham",
    ],
  },
  MT: {
    market:
      "Montana is a long-distance state with few people and a great deal of road. Wheat, barley, pulses, and cattle move out of the plains in hoppers and livestock trailers, timber comes from the western mountains, and mining and energy activity adds heavy-haul and tanker work. Billings is the main distribution and refining center, with Great Falls, Missoula, and Bozeman as regional hubs. Cross-border freight to Alberta uses the Sweetgrass crossing. Carriers plan for mountain passes, severe winter weather, wind on the plains, and long stretches between services.",
    corridors: [
      "I-90 Missoula-Butte-Bozeman-Billings (the southern east-west route)",
      "I-94 Billings-Miles City-Glendive toward North Dakota",
      "I-15 Butte-Helena-Great Falls-Sweetgrass (the route to the Canadian border)",
    ],
  },
  NE: {
    market:
      "Nebraska is both an agricultural producer and a trucking headquarters state, with several national truckload carriers based around Omaha and Lincoln. Corn, soybeans, and ethanol move in hoppers and tankers, and beef packing in towns along the Platte valley generates reefer and livestock loads. A major rail classification yard at North Platte and the east-west Interstate make the state a through-route for transcontinental freight. Omaha is the main distribution market. Harvest sets the busy season, and winter storms and wind on the plains are regular operating hazards.",
    corridors: [
      "I-80 Omaha-Lincoln-Grand Island-North Platte (the transcontinental east-west spine)",
      "I-680 and I-480 Omaha (the metro links across the Missouri River to Iowa)",
      "I-76 from the I-80 junction near Big Springs toward Denver",
    ],
  },
  NV: {
    market:
      "Nevada has two separate freight markets. In the north, the Reno-Sparks area has grown into a warehousing and manufacturing base serving Northern California and the West, including battery and data-center related production, with gold mining around Elko adding heavy-haul and supply work. In the south, Las Vegas is a consumption market fed mostly from Southern California, with food, beverage, convention, and construction freight arriving loaded and trucks often leaving light. Long desert stretches, summer heat, and winter chain controls over Donner Summit on the California side all figure into planning.",
    corridors: [
      "I-80 Reno-Winnemucca-Elko-Wendover (the northern transcontinental route)",
      "I-15 Primm-Las Vegas-Mesquite (the Southern California to Utah lane)",
      "I-580 Reno-Carson City",
      "I-11 Las Vegas-Boulder City toward Arizona",
    ],
    regulatoryNote:
      "Nevada has no state personal income tax, which some owner-operators weigh when choosing a base state.",
  },
  NH: {
    market:
      "New Hampshire freight is concentrated in the southern tier along the Massachusetts border, where distribution centers, electronics and precision manufacturing, and food and beverage companies cluster around Manchester, Nashua, and the Seacoast. Forest products come from the northern counties, and tourism drives seasonal food-service and fuel deliveries into the lakes and mountains. The Port of Portsmouth handles bulk cargo such as road salt and petroleum. Most carriers run regional New England lanes, with winter weather and spring road postings as recurring constraints.",
    corridors: [
      "I-93 Salem-Manchester-Concord and north through the White Mountains",
      "I-95 Seabrook-Portsmouth (the Seacoast link between Massachusetts and Maine)",
      "I-89 Concord-Lebanon toward Vermont",
      "Everett Turnpike Nashua-Manchester-Concord",
    ],
    regulatoryNote:
      "New Hampshire has no general sales tax and no tax on wage income, which some owner-operators weigh when choosing a base state.",
  },
  NM: {
    market:
      "New Mexico's trucking is driven by energy, the border, and through-traffic. The Permian Basin in the southeast generates oilfield hauling: sand, water, crude, and equipment on tankers, pneumatics, and flatbeds. The Santa Teresa port of entry near El Paso handles cross-border manufacturing freight and has an adjacent intermodal rail terminal. Dairy in the east and south, chile and pecans in the Mesilla Valley, and potash mining near Carlsbad add reefer and bulk loads. Albuquerque is the distribution hub where the state's two main Interstates cross.",
    corridors: [
      "I-40 Gallup-Albuquerque-Tucumcari (the east-west transcontinental route)",
      "I-25 Las Cruces-Albuquerque-Santa Fe-Raton (the north-south spine)",
      "I-10 Lordsburg-Deming-Las Cruces (the southern route toward El Paso)",
    ],
    regulatoryNote:
      "New Mexico charges a weight-distance tax on heavier commercial vehicles for miles driven in the state, filed separately from IFTA. Carriers need a weight-distance permit before operating there.",
  },
  ND: {
    market:
      "North Dakota freight comes from the ground. The Bakken oil field in the west generates crude, water, sand, and equipment hauling on tankers, pneumatics, and heavy-haul trailers, with activity that rises and falls with drilling. Across the rest of the state, wheat, soybeans, canola, sunflowers, and sugar beets move in hoppers and end-dumps, with a sharp harvest peak and a beet campaign in the Red River Valley each fall. Fargo is the main distribution center. Cross-border freight to Manitoba uses the Pembina crossing. Winters are severe, and spring load restrictions affect heavy haulers.",
    corridors: [
      "I-94 Fargo-Jamestown-Bismarck-Dickinson (the east-west spine)",
      "I-29 Fargo-Grand Forks-Pembina (the Red River Valley route to the Canadian border)",
    ],
  },
  OK: {
    market:
      "Oklahoma sits at the crossing of major north-south and east-west truck routes, which makes Oklahoma City a natural relay and distribution point. Oil and gas production generates tanker, sand, and oilfield-equipment hauling, particularly in the western and central parts of the state. Wheat, cattle, and poultry and pork processing add hopper, livestock, and reefer work, and aerospace maintenance and manufacturing around Oklahoma City and Tulsa contribute specialized loads. The Tulsa Port of Catoosa gives the state an inland waterway outlet for bulk commodities.",
    corridors: [
      "I-40 Sallisaw-Oklahoma City-Elk City (the east-west transcontinental route)",
      "I-35 Ardmore-Oklahoma City-Ponca City area (the north-south NAFTA route)",
      "I-44 Lawton-Oklahoma City-Tulsa and northeast toward Joplin",
    ],
    regulatoryNote:
      "Long stretches of I-44 in Oklahoma are turnpikes, so toll costs are a routine line item for carriers running the Oklahoma City-Tulsa lane.",
  },
  OR: {
    market:
      "Oregon freight divides at the Cascades. West of the mountains, the Portland metro handles distribution, electronics manufacturing, and port activity on the Columbia River, including autos and bulk exports, while the Willamette Valley ships nursery stock, grass seed, wine, and produce. Timber and wood products move on flatbeds and chip trucks throughout the western and southern counties. East of the mountains the work is wheat, cattle, onions, and potatoes, with long empty stretches. Winter chain requirements apply on the mountain passes, including the route over the Siskiyous into California.",
    corridors: [
      "I-5 Portland-Salem-Eugene-Medford (the West Coast spine)",
      "I-84 Portland-The Dalles-Pendleton-Ontario (the Columbia River route east)",
      "I-205 the Portland east-side bypass",
    ],
    regulatoryNote:
      "Oregon does not collect fuel tax at the pump from heavy trucks. Instead it charges a weight-mile tax on vehicles above a set registered weight for miles driven in the state, and carriers need an Oregon account or a temporary pass before entering.",
  },
  RI: {
    market:
      "Rhode Island is a compact delivery market between Boston and New York. Freight is mostly inbound consumer goods, food service, fuel, and construction materials, with jewelry and precision manufacturing, marine trades, and defense work, including submarine components at Quonset Point, on the outbound side. The Port of Davisville at Quonset is a significant auto-import facility, which supports car hauling, and the Port of Providence handles petroleum, road salt, and other bulk cargo. Nearly all trucking is short-haul day-cab work across southern New England.",
    corridors: [
      "I-95 Westerly area-Providence-Pawtucket (the state's main route)",
      "I-295 the Providence western bypass",
      "I-195 Providence east toward Fall River and Cape Cod",
    ],
    regulatoryNote:
      "Rhode Island restricts heavy trucks from certain bridges and local routes; carriers delivering in Providence and Newport should confirm posted limits.",
  },
  SC: {
    market:
      "South Carolina freight is driven by the Port of Charleston and export manufacturing. The port handles containers and vehicles, and two inland ports at Greer and Dillon connect it by rail to the Upstate and the Pee Dee, creating drayage work well away from the coast. Automotive and tire plants in the Greenville-Spartanburg area and near Charleston, with their supplier networks, generate just-in-time dry van and flatbed loads. Aircraft assembly in North Charleston, forest products, and poultry round out the mix. Hurricane season can disrupt port and coastal operations.",
    corridors: [
      "I-26 Charleston-Columbia-Spartanburg (the port-to-Upstate spine)",
      "I-85 Anderson-Greenville-Spartanburg (the Atlanta-Charlotte manufacturing corridor)",
      "I-95 Hardeeville-Florence-Dillon (the East Coast through-route)",
      "I-77 Columbia-Rock Hill toward Charlotte",
      "I-20 Columbia-Florence and west to Augusta",
    ],
  },
  SD: {
    market:
      "South Dakota freight is agricultural, with a split between the farmed east and the ranching west. Corn, soybeans, wheat, and ethanol move in hoppers and tankers from the eastern counties, and cattle, hogs, and meat processing around Sioux Falls generate livestock and reefer loads. Sioux Falls is the distribution and financial center where the state's two Interstates cross, while Rapid City serves the Black Hills, where tourism drives seasonal deliveries. Distances are long, winter weather is severe, and wind on the open plains is a regular hazard for high-profile trailers.",
    corridors: [
      "I-90 Sioux Falls-Mitchell-Rapid City (the east-west spine)",
      "I-29 Sioux Falls-Brookings-Watertown (the eastern north-south route)",
    ],
    regulatoryNote:
      "South Dakota has no state personal income tax, which some owner-operators weigh when choosing a base state.",
  },
  UT: {
    market:
      "Utah is called the Crossroads of the West because several long-haul routes meet around Salt Lake City, which serves as the distribution hub for the Intermountain region. Warehousing and e-commerce fulfillment have grown along the Wasatch Front, where most of the population lives, and an intermodal rail terminal supports container traffic. Mining, including copper, along with oil and gas in the Uinta Basin, refining north of Salt Lake City, and agriculture add flatbed, tanker, and bulk work. Mountain passes and winter storms in the canyons east of the valley affect schedules.",
    corridors: [
      "I-15 St. George-Provo-Salt Lake City-Ogden (the Wasatch Front spine)",
      "I-80 Wendover-Salt Lake City-Park City area toward Wyoming",
      "I-84 Ogden northwest toward Idaho and east to I-80 at Echo",
      "I-70 from I-15 near Cove Fort east through Green River toward Colorado",
    ],
  },
  VT: {
    market:
      "Vermont is a rural, small-load market. Dairy is the signature commodity, with milk tankers running daily farm pickups to processing plants, alongside cheese, ice cream, and specialty foods moving under refrigeration. Maple products, forest products, stone quarrying, and craft brewing add outbound freight, while most consumer goods arrive from distribution centers in neighboring states. Cross-border freight to Quebec moves through Highgate Springs and Derby Line. Narrow mountain roads, covered bridges with posted limits, winter conditions, and spring mud-season restrictions shape daily operations.",
    corridors: [
      "I-89 White River Junction-Montpelier-Burlington-Highgate Springs (to the Quebec border)",
      "I-91 Brattleboro-White River Junction-St. Johnsbury-Derby Line (the Connecticut River route)",
    ],
    regulatoryNote:
      "Vermont posts many town and state roads with reduced weight limits during mud season each spring, and several mountain routes restrict or prohibit tractor-trailers year-round.",
  },
  VA: {
    market:
      "Virginia freight is organized around the Port of Virginia in Hampton Roads and the Interstate that runs down the Shenandoah Valley. The port handles containers through several terminals and connects by rail to an inland port at Front Royal, which spreads drayage work into the northern valley. Distribution centers line the valley route and the Richmond area. Poultry from the Shenandoah Valley, pork processing in Smithfield, tobacco and beverage manufacturing, and shipbuilding at Newport News add reefer, dry van, and specialized loads. Northern Virginia is a congested consumption and data-center construction market.",
    corridors: [
      "I-81 Bristol-Roanoke-Harrisonburg-Winchester (the Appalachian truck route)",
      "I-95 Emporia-Richmond-Fredericksburg (the East Coast through-route)",
      "I-64 Hampton Roads-Richmond-Charlottesville-Staunton",
      "I-85 Petersburg south toward Durham",
      "I-77 Wytheville area (the mountain link between Charlotte and West Virginia)",
    ],
  },
  WV: {
    market:
      "West Virginia freight comes from energy, chemicals, and the mountains themselves. Coal moves by truck from mines to rail and river loadouts, natural-gas development in the northern counties generates water, sand, pipe, and equipment hauling, and the chemical plants of the Kanawha Valley around Charleston produce tanker and hazmat loads. Hardwood timber and an automotive engine and transmission plant near Charleston add flatbed and dry van work. Steep grades, tight curves, and winter weather are part of nearly every route, and the Eastern Panhandle functions as part of the Washington-Baltimore distribution market.",
    corridors: [
      "I-77 Bluefield-Beckley-Charleston-Parkersburg (the north-south route, part of it a turnpike)",
      "I-64 Huntington-Charleston-Beckley-Lewisburg",
      "I-79 Charleston-Clarksburg-Morgantown toward Pittsburgh",
      "I-81 Martinsburg (the Eastern Panhandle section of the Appalachian truck route)",
      "I-70 Wheeling (the Northern Panhandle crossing)",
    ],
  },
  WI: {
    market:
      "Wisconsin freight is dairy, paper, and manufacturing. Milk moves daily by tanker from farms to cheese plants, and finished cheese, butter, and other foods ship under refrigeration. The Fox River Valley is a center of paper and packaging production, generating dry van and flatbed loads, and the state hosts several national truckload carriers based around Green Bay. Machinery, engines, and metal fabrication in the southeast add heavy and flatbed freight, and Milwaukee and the corridor toward Chicago hold most of the distribution centers. Winter weather and spring road restrictions are routine planning factors.",
    corridors: [
      "I-94 Kenosha-Milwaukee-Madison-Eau Claire toward the Twin Cities",
      "I-90 Beloit-Madison-La Crosse",
      "I-43 Beloit-Milwaukee-Green Bay",
      "I-41 Milwaukee-Fond du Lac-Appleton-Green Bay (the Fox Valley corridor)",
      "I-39 Beloit area-Portage-Wausau",
    ],
  },
  WY: {
    market:
      "Wyoming is a through-route and an energy state. The southern Interstate carries a heavy share of transcontinental truck traffic across open, high-elevation country, where winter wind closures to light and high-profile vehicles are common. Within the state, coal from the Powder River Basin moves mostly by rail, while oil, natural gas, and trona and soda ash mining near Green River generate tanker, bulk, and heavy-haul work. Cattle and hay move seasonally. Cheyenne and Casper are the main service centers, and services between towns can be far apart.",
    corridors: [
      "I-80 Evanston-Rock Springs-Rawlins-Laramie-Cheyenne (the southern transcontinental route)",
      "I-25 Cheyenne-Casper-Buffalo (the north-south spine)",
      "I-90 Buffalo-Sheridan and Buffalo-Gillette toward South Dakota",
    ],
    regulatoryNote:
      "Wyoming has no state personal income tax. The state frequently closes sections of I-80 to light, high-profile vehicles during high winds, which affects empty and lightly loaded trailers.",
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
   procedural fallback with its curated content layered on. */
function buildStateContextMap(): Record<string, StateContextEntry> {
  const map: Record<string, StateContextEntry> = {};
  for (const s of STATE_INFO) {
    const procedural = buildProcedural(s.name);
    const curated = CURATED[s.code] ?? CURATED_MORE[s.code];
    const entry: StateContextEntry = curated
      ? {
          stateCode: s.code,
          stateName: s.name,
          stateSlug: s.slug,
          procedural,
          curated,
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
