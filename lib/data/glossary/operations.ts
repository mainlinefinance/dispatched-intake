import "server-only";
import type { GlossaryTerm } from "./types";

/* Trucking-operations terms (freight types, lane categories, equipment
   classes). Populated by feat/seo-batch-3 agent G2. */

export const OPERATIONS_TERMS: ReadonlyArray<GlossaryTerm> = [
  {
    slug: "hot-shot",
    term: "Hot-Shot Trucking",
    category: "trucking-operations",
    shortDefinition:
      "Time-sensitive freight hauled by light- or medium-duty pickups with goosenecks, typically Class 3–5 trucks running expedited LTL loads.",
    sections: [
      {
        h2: "What it is",
        body:
          "Hot-shot trucking is time-sensitive, expedited freight hauled by light- or medium-duty pickups pulling gooseneck or fifth-wheel trailers. The standard equipment is a Class 3–5 truck — Ram 3500, Ford F-350, Chevrolet Silverado 3500HD — typically rated under 26,001 pounds GVWR. That weight rating matters: under 26,001 pounds, a CDL is not federally required for some setups, although most serious hot-shot operators get a Class A CDL anyway because it expands the freight pool and improves insurance pricing.\n\nFreight is usually partial loads, less-than-truckload (LTL), or specialized pickups — oilfield service work, construction equipment relocations, agricultural equipment, project-cargo final mile. Loads are often dispatched off load board apps like Truckstop, DAT, and HotShot Pro, where hot-shot listings sit alongside Class 8 freight. Rate-per-mile premiums vs. standard freight are common because the customer is paying for speed and flexibility — not consolidated trailer space.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Hot-shot operators face different lender underwriting than Class 8 carriers — the equipment is cheaper to finance but turnover is higher, and lenders price that into approval terms. Insurance is sometimes lower (no CDL on certain setups puts the operator in a different coverage band) but cargo coverage limits matter for high-value expedited freight. Factoring works the same mechanic as Class 8, but advance rates can run slightly tighter because hot-shot operators tend to have less consistent broker mix and higher concentration on a few high-pay lanes.",
      },
    ],
    relatedTerms: ["expedited", "ltl", "flatbed"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/owner-operator-financing/first-time", label: "First-time owner-operator financing" },
    ],
  },
  {
    slug: "reefer",
    term: "Reefer",
    abbreviation: "Reefer",
    category: "trucking-operations",
    shortDefinition:
      "Refrigerated trailer (or the freight that requires temperature control); standard equipment for hauling produce, frozen goods, and pharma.",
    sections: [
      {
        h2: "What it is",
        body:
          "Reefer is short for refrigerated trailer — a 53-foot trailer fitted with a mechanical refrigeration unit (typically Carrier or Thermo King) that maintains a controlled temperature ranging from frozen (-20°F) to chilled (35°F+). The refrigeration unit runs off its own diesel tank and is independent of the tractor. New reefer trailers run roughly $70K–$110K; used reefers run $25K–$60K depending on age, hours, and reefer-unit condition.\n\nReefer freight covers produce, frozen foods, dairy, pharmaceuticals, flowers, and certain temperature-sensitive chemicals. Operators are required to carry reefer breakdown coverage in addition to standard motor truck cargo — a failed reefer unit on a load of produce is a six-figure claim risk. The Food Safety Modernization Act (FSMA) imposes sanitary transport requirements on carriers hauling food: documented temperature logs, sanitary trailer condition, and pre-cooling protocols.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Reefer pays premium rates per mile vs. dry van but operating costs are higher: fuel for the reefer unit, maintenance on the refrigeration system, downtime when the unit fails. Equipment financing for reefers runs higher than dry vans because of unit cost and complexity. Reefer breakdown coverage is mandatory — without it, a single failed reefer claim can wipe out months of margin. Lenders sometimes require reefer breakdown disclosure as part of equipment-financing underwriting.",
      },
    ],
    relatedTerms: ["dry-van", "flatbed", "reefer-breakdown"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "dry-van",
    term: "Dry Van",
    category: "trucking-operations",
    shortDefinition:
      "Standard enclosed trailer (53-foot box) for non-perishable, non-temperature-controlled freight; the most common trailer type in trucking.",
    sections: [
      {
        h2: "What it is",
        body:
          "A dry van is a standard enclosed 53-foot box trailer — non-refrigerated, non-temperature-controlled — and the most common trailer type in US trucking. Freight covers consumer goods, dry food and beverage, retail merchandise, packaged products, and anything else that doesn't need temperature control or open-deck loading. New dry van trailers run roughly $30K–$50K, with used trailers in the $10K–$25K range depending on age and condition. That's significantly cheaper than reefer or specialty trailers.\n\nLoading and unloading happens via standard dock doors or ground-level handling. No special permits are required for typical dry van loads — overweight or oversized exceptions handled the same way as on flatbeds. Dispatch is the simplest of the major freight classes: pick up at origin dock, deliver at destination dock, no tarping, no temperature monitoring, no specialized rigging.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Lender risk on dry van financing is the lowest among trailer classes — dry vans hold value reasonably well and have the broadest secondary market for resale or repossession. Insurance pricing is also lower: no reefer breakdown exposure, lower hazard than flatbed loading. For new owner-operators, dry van is often the entry point because of cheaper equipment and operational simplicity. The trade-off is rate per mile — dry van pays the lowest of the major freight classes because the work is the easiest to do.",
      },
    ],
    relatedTerms: ["reefer", "flatbed", "ltl"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
    ],
  },
  {
    slug: "flatbed",
    term: "Flatbed",
    category: "trucking-operations",
    shortDefinition:
      "Open trailer with no walls or roof, used for oversized, irregularly shaped, or top-loaded freight; requires tarping and load securement skills.",
    sections: [
      {
        h2: "What it is",
        body:
          "A flatbed is an open trailer with no walls or roof, typically 48 or 53 feet long. Freight covers lumber, steel, machinery, building materials, construction equipment, and oversized loads — anything that needs top-loading, side-loading, or won't fit in an enclosed trailer. The work requires real tarping and securement skills: chains, ratchet straps, V-boards, edge protectors, and dunnage to protect both the load and the trailer.\n\nSpecialized variants extend the flatbed family. A step-deck drops 18 inches behind the kingpin to handle taller loads under bridge clearances. A double-drop has a lower well between the gooseneck and rear wheels for very tall loads (excavators, transformers). A Conestoga uses a sliding curtain system that gives flatbed flexibility with weather protection — popular for high-value machinery and aerospace freight.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Flatbed pays higher rate per mile than dry van or reefer because of the skill requirements and operational hazard. Insurance pricing runs higher: cargo securement risk is real, and physical hazards (loading and unloading falls, dropped loads) drive workers' comp and liability premiums. Lenders treat flatbed financing similarly to dry van but pay close attention to operator experience — first-time operators face tighter underwriting because flatbed errors (lost loads, damage claims, securement failures) are common and expensive.",
      },
    ],
    relatedTerms: ["dry-van", "reefer", "hot-shot"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "deadhead",
    term: "Deadhead",
    category: "trucking-operations",
    shortDefinition:
      "Empty miles run without revenue freight, typically returning to home base or repositioning for the next load.",
    sections: [
      {
        h2: "What it is",
        body:
          "Deadhead is miles driven empty — no revenue freight on the trailer. It happens after a delivery when there's no return load available, when an operator repositions for a higher-paying lane, or when returning to terminal for maintenance or an HOS reset. Deadhead percentage is calculated as deadhead miles divided by total miles, and the industry average for owner-operators sits around 15–20%.\n\nHigh deadhead is the silent killer of owner-op profitability. Fuel and wear-and-tear costs are the same as loaded miles — fuel burn, tire wear, engine hours — but revenue is zero. A truck running 30% deadhead at $2.50 all-in cost per mile is bleeding $25K–$40K a year compared to a truck running 15% deadhead, even at identical loaded rates. Load planning to minimize deadhead — backhauls, triangulating lanes, accepting slightly lower-paying loads to avoid empty miles — is one of the highest-leverage operational disciplines.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Deadhead percentage is one of the most important operational metrics lenders and factors look at when evaluating cash-flow capacity. Rate-per-mile alone is misleading — effective revenue per total mile (loaded + deadhead) determines actual margin. Load planning that reduces deadhead often makes the difference between thin and healthy margins. Factoring companies that bundle load board access (Apex with DAT, for example) help reduce deadhead as part of the value proposition.",
      },
    ],
    relatedTerms: ["otr", "ltl", "ftl"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/trucking-working-capital", label: "Trucking working capital" },
    ],
  },
  {
    slug: "otr",
    term: "Over-the-Road",
    abbreviation: "OTR",
    termCode: "OTR",
    category: "trucking-operations",
    shortDefinition:
      "Long-haul trucking covering significant distances, typically multi-state routes with drivers spending days or weeks away from home.",
    sections: [
      {
        h2: "What it is",
        body:
          "OTR — Over-the-Road — is long-haul trucking: typically interstate, multi-day or multi-week routes where drivers are away from home for extended periods. Standard cycles run 5–14 days out before a home reset. The standard equipment is a sleeper-cab Class 8 tractor pulling a 53-foot trailer; the sleeper exists specifically because OTR drivers spend nights in the truck rather than at home.\n\nOTR pay structures vary. Cents-per-mile is the most common — drivers paid per loaded (and sometimes empty) mile. Percentage-of-load pay (typically 20–30% of gross revenue) is common for owner-operators leased to a carrier. Salary structures exist but are less common at owner-operator scale. OTR is the dominant model for long-distance dry van and reefer freight, where freight density and distance make multi-day cycles efficient.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "OTR operators face a different financing landscape than regional or local. Equipment must be road-worthy for sustained mileage (300K–500K miles per year on a hard-running OTR truck), so fuel costs and maintenance are larger budget lines. Insurance carriers price OTR differently due to higher mile exposure, multi-state regulatory variation, and higher accident frequency rates per mile vs. local. Lenders evaluating OTR operators look at mileage history and revenue-per-mile to project debt-service capacity.",
      },
    ],
    relatedTerms: ["deadhead", "ltl", "ftl", "irp"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/semi-truck-financing", label: "Semi truck financing" },
    ],
  },
  {
    slug: "ltl",
    term: "Less-Than-Truckload",
    abbreviation: "LTL",
    termCode: "LTL",
    category: "trucking-operations",
    shortDefinition:
      "Freight model where carriers consolidate multiple shippers' loads into a single trailer; loads are typically 100–10,000 lbs and below truckload.",
    sections: [
      {
        h2: "What it is",
        body:
          "LTL — Less-Than-Truckload — is the freight model for shipments too big for parcel but too small for full truckload. Carriers consolidate multiple shippers' loads onto a single trailer at terminals, run the consolidated trailer to a destination terminal, deconsolidate, and run city deliveries from there. Standard LTL load size is 100–10,000 pounds, though pricing extends in both directions. Major LTL carriers include FedEx Freight, Old Dominion, XPO, Saia, and Estes.\n\nPricing is driven by NMFC freight class — a 50-to-500 scale based on density, value, fragility, and stowability. Class 50 (dense, low-value, easy to handle) is cheap; class 500 (light, high-value, fragile) is expensive. Loading typically requires a dock or liftgate at both ends. Transit times run longer than FTL because of the consolidation and deconsolidation cycles at origin, intermediate, and destination terminals.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "LTL operators face different underwriting than full-truckload OTR. Revenue per load is lower but volume is higher — the math works on freight density rather than per-load rate. Equipment is often pup trailers (28-foot) or city trucks rather than 53-foot OTR sleepers. For owner-operators, LTL is a regional model that allows being home daily, which affects both lifestyle and lender capacity assessment (different debt-service ratios than OTR). Insurance differs because of more loading-and-unloading exposure and more frequent stops per day.",
      },
    ],
    relatedTerms: ["ftl", "hot-shot", "dry-van"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/equipment-financing", label: "Equipment financing" },
    ],
  },
  {
    slug: "ftl",
    term: "Full Truckload",
    abbreviation: "FTL",
    termCode: "FTL",
    category: "trucking-operations",
    shortDefinition:
      "Freight that fills an entire trailer for a single shipper, typically over 10,000 lbs or by volume; the standard model for OTR carriers.",
    sections: [
      {
        h2: "What it is",
        body:
          "FTL — Full Truckload — is freight that fills an entire trailer for a single shipper. One shipper, one consignee, one trailer. Freight is typically over 10,000 pounds or fills the trailer cube (volume rather than weight). Rates are negotiated as a flat lane price or cents-per-mile depending on the broker and contract structure. Transit is direct point-to-point with no consolidation or terminal handling.\n\nFTL is the standard model for OTR operations and the dominant listing type on major load boards (DAT, Truckstop, 123Loadboard). Pricing follows a mix of contract rates (committed lanes between shippers and carriers) and spot rates (open-market loads on the load boards). Spot-rate volatility is real — rates can move 20%+ within weeks based on freight demand, fuel costs, and capacity availability.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "FTL is the dominant model for owner-operators because the math works at single-truck scale: one driver, one trailer, one load. Spot-rate volatility is a real cash-flow risk — rates can compress meaningfully within a quarter. Factoring is essential because FTL broker payment terms (Net 30 to Net 60) create large gaps between completion and pay. Lenders evaluate FTL operators on revenue-per-mile and broker concentration mix — a carrier running 50%+ of revenue through a single broker faces tail-risk discounting.",
      },
    ],
    relatedTerms: ["ltl", "otr", "deadhead"],
    relatedProducts: [
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
      { url: "/invoice-factoring-for-truckers", label: "Invoice factoring for truckers" },
    ],
  },
  {
    slug: "intermodal",
    term: "Intermodal",
    category: "trucking-operations",
    shortDefinition:
      "Freight that travels in containers or trailers across multiple modes (truck + rail + ocean) without the freight itself being unloaded between modes.",
    sections: [
      {
        h2: "What it is",
        body:
          "Intermodal freight moves across multiple transportation modes — truck, rail, ocean — using a single shipping unit. The shipping unit is typically a 20-foot, 40-foot, or 53-foot ISO container. The container moves from ocean vessel to port to rail to truck to final delivery without the contents ever being unloaded between modes. That's the operational distinction: the freight stays sealed inside the container across mode changes.\n\nMajor rail intermodal corridors run from West Coast ports (Los Angeles/Long Beach, Oakland) to Midwest hubs (Chicago, Dallas, Memphis), with secondary corridors connecting East Coast ports to inland markets. Domestic intermodal — freight that doesn't touch ocean shipping — uses 53-foot containers on rail to compete with OTR trucking on long-haul lanes. The truck portion of an intermodal move is typically drayage: short-distance hauling between rail terminal and consignee.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Intermodal drayage operators face very different financing than OTR — short-haul work, container-specialized chassis equipment, and port queuing time create revenue volatility that doesn't exist in long-haul OTR. Lenders specializing in intermodal exist but the panel is narrower than OTR financing. Insurance differs because of port operations (longshore exclusions, container-handling damage exposure). Intermodal owner-operators often pair with chassis providers (TRAC, FlexiVan) for equipment access rather than owning chassis outright.",
      },
    ],
    relatedTerms: ["drayage", "otr", "ftl"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/insurance", label: "Commercial trucking insurance" },
    ],
  },
  {
    slug: "drayage",
    term: "Drayage",
    category: "trucking-operations",
    shortDefinition:
      "Short-distance trucking, typically the first or last leg of an intermodal move, hauling containers between port/rail and warehouses or consignees.",
    sections: [
      {
        h2: "What it is",
        body:
          "Drayage is short-distance container hauling — typically the first-mile leg from port to warehouse or the last-mile leg from rail terminal to consignee. A single drayage load may run 5–250 miles depending on the market and the routing. The driver pulls a chassis carrying a 20-, 40-, or 53-foot container. Major drayage markets are concentrated around ports and rail hubs: Los Angeles/Long Beach, Oakland, Seattle, NY/NJ, Houston, Savannah, Norfolk.\n\nDrayage has its own operational vocabulary. \"Live unload\" means the driver waits at the consignee while the container is unloaded — usually 1–4 hours, sometimes longer. \"Drop-and-hook\" means the driver leaves the loaded container at the consignee, picks up an empty (or another loaded container), and goes. Drop-and-hook is more efficient for the driver; live unload pays a wait premium but burns time. Port turn time — how long it takes to enter, get the container, and exit the port — is the single biggest determinant of daily revenue.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Drayage operators have different cash-flow patterns than OTR. Shorter loads, more loads per day, port-queue delays compress effective revenue per hour. Equipment is specialized — day cabs, container chassis, sometimes terminal-tractors. Insurance is different because port operations require specialized endorsements (longshore exclusions, contingent cargo, chassis damage). Lenders evaluate drayage operators on loads-per-day and port turn time rather than miles-per-week. Drayage rates are volatile based on port congestion and ocean carrier scheduling.",
      },
    ],
    relatedTerms: ["intermodal", "ltl", "otr"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "expedited",
    term: "Expedited Freight",
    category: "trucking-operations",
    shortDefinition:
      "Time-sensitive freight requiring immediate or guaranteed delivery, typically using sprinters, straight trucks, or hot-shot setups for premium rates.",
    sections: [
      {
        h2: "What it is",
        body:
          "Expedited is time-critical freight — standard delivery windows compressed to \"as fast as possible\" or guaranteed times like next-day or same-day. The freight typically can't wait for normal LTL or FTL transit because the consequences of delay are severe: a stopped automotive production line, a missed pharma sample, a delayed aerospace component.\n\nEquipment ranges across the size spectrum. Sprinter vans (cargo vans up to 10,000 pounds GVWR) handle small expedited freight. Straight trucks handle mid-size loads. Class 8 sleepers handle full-trailer expedited where the customer needs both speed and capacity. Rate per mile runs 50–200%+ above standard freight because the customer is paying for guaranteed time, not just transit. Major industries using expedited: automotive (production line emergencies), pharma (life-critical samples), aerospace, just-in-time manufacturing. Major expedited carriers include FedEx Custom Critical, Panther Premium Logistics, and Tri-State Expedited.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Expedited operators face cash-flow timing differences from standard freight — premium rates but irregular load frequency. Many expedited operators run as 1099 contractors under expedited carriers (operating with the carrier's authority and insurance), which changes financing options because revenue visibility runs through settlement statements rather than direct invoices. Equipment financing for expedited is often sprinter-van or straight-truck specific. Factoring works the same mechanic as standard freight but rate spreads can be tighter because of broker mix.",
      },
    ],
    relatedTerms: ["hot-shot", "ltl", "ftl"],
    relatedProducts: [
      { url: "/equipment-financing", label: "Equipment financing" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
  {
    slug: "hazmat",
    term: "Hazmat",
    category: "trucking-operations",
    shortDefinition:
      "Hazardous materials freight regulated by DOT under 49 CFR; requires specialized endorsement on CDL plus carrier-level hazmat permitting.",
    sections: [
      {
        h2: "What it is",
        body:
          "Hazmat is hazardous materials freight, regulated by the DOT and FMCSA under 49 CFR Parts 100–185. The regulations define nine hazard classes: explosives, gases, flammable liquids, flammable solids, oxidizers, toxic substances, radioactive materials, corrosives, and miscellaneous dangerous goods. Each class has specific packaging, labeling, placarding, and documentation requirements.\n\nThe driver requirement is a hazmat endorsement on the CDL. Getting the endorsement requires a TSA threat assessment, fingerprinting, background check, and an additional knowledge test on hazmat handling and emergency response. The carrier requirement is hazmat registration with FMCSA, plus hazmat-specific insurance — typically higher motor truck cargo limits and additional pollution liability coverage. Trailers must display placards based on hazard class and shipped quantity. Documentation (shipping papers, emergency response info) must travel with the load and be accessible to the driver.",
      },
      {
        h2: "Why it matters for trucking finance",
        body:
          "Hazmat freight pays a significant premium per mile (often 30–50% over standard) but operating costs are higher: insurance, training, compliance overhead, slower border crossings. Insurance is the biggest cost differentiator — hazmat carriers face higher primary liability minimums (typically $5M MCS-90 endorsement vs. the standard $750K–$1M for non-hazmat). Lenders sometimes require disclosure of hazmat operations during underwriting because of concentrated tail risk. Factoring works the same way but factor preference for hazmat carriers varies — not all factors will onboard hazmat freight.",
      },
    ],
    relatedTerms: ["csa-score", "dot-class", "motor-truck-cargo"],
    relatedProducts: [
      { url: "/insurance", label: "Commercial trucking insurance" },
      { url: "/owner-operator-financing", label: "Owner-operator financing" },
    ],
  },
];
