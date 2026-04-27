import "server-only";

/* ===========================================================================
   DOT vehicle classes are the second axis of programmatic insurance pages
   (state × dotClass × product). Slugs are URL tokens for
   /insurance/{product}/{state}/{dotClass}/.

   We do not enumerate FMCSA classes 1–8 verbatim; we enumerate the *quote
   primitives* truckers actually shop by — which are a mix of weight class
   (class-7, class-8) and operation profile (hot-shot, box-truck, dump, tow,
   flatbed-tractor, reefer-tractor). This matches how brokers and carriers
   structure their rate tables and how operators self-describe in intake.
   =========================================================================== */

export type DotClassSlug =
  | "class-8-tractor"
  | "class-7-tractor"
  | "hot-shot"
  | "box-truck"
  | "dump"
  | "tow"
  | "flatbed-tractor"
  | "reefer-tractor";

export type DotClass = {
  slug: DotClassSlug;
  name: string;
  shortLabel: string;
  weightClass: string;
  gvwrRange: string;
  exampleVehicles: readonly string[];
  typicalOperation: string;
  cdlRequired: boolean;
};

const DOT_CLASSES: Record<DotClassSlug, DotClass> = {
  "class-8-tractor": {
    slug: "class-8-tractor",
    name: "Class 8 Tractor",
    shortLabel: "Class 8",
    weightClass: "Class 8 (heavy)",
    gvwrRange: "33,001 lbs and above GVWR",
    exampleVehicles: [
      "Freightliner Cascadia",
      "Kenworth T680",
      "Peterbilt 579",
      "Volvo VNL",
      "International LT",
    ],
    typicalOperation: "Long-haul or regional freight with full-size trailer",
    cdlRequired: true,
  },
  "class-7-tractor": {
    slug: "class-7-tractor",
    name: "Class 7 Tractor",
    shortLabel: "Class 7",
    weightClass: "Class 7 (medium-heavy)",
    gvwrRange: "26,001–33,000 lbs GVWR",
    exampleVehicles: [
      "International HV",
      "Freightliner M2 112",
      "Peterbilt 537",
    ],
    typicalOperation: "Regional / vocational, smaller-trailer day-cab work",
    cdlRequired: true,
  },
  "hot-shot": {
    slug: "hot-shot",
    name: "Hot-Shot Operation",
    shortLabel: "Hot-Shot",
    weightClass: "Class 3–5 dually with gooseneck or bumper-pull trailer",
    gvwrRange: "10,001–19,500 lbs combination GVWR (typical)",
    exampleVehicles: [
      "Ford F-450 / F-550 dually",
      "Ram 4500 / 5500",
      "Chevrolet Silverado 4500 HD",
    ],
    typicalOperation: "Expedited freight, partial loads, broker-load-board work",
    cdlRequired: false,
  },
  "box-truck": {
    slug: "box-truck",
    name: "Box Truck",
    shortLabel: "Box Truck",
    weightClass: "Class 3–6 straight truck with enclosed cargo body",
    gvwrRange: "10,001–26,000 lbs GVWR",
    exampleVehicles: [
      "Isuzu NPR / NRR",
      "Hino 268",
      "Freightliner M2 106 box",
    ],
    typicalOperation: "Local delivery, last-mile, household goods",
    cdlRequired: false,
  },
  dump: {
    slug: "dump",
    name: "Dump Truck",
    shortLabel: "Dump",
    weightClass: "Class 7–8 with hydraulic dump body",
    gvwrRange: "26,001 lbs and above GVWR",
    exampleVehicles: [
      "Mack Granite",
      "International HX",
      "Peterbilt 567",
      "Kenworth T880",
    ],
    typicalOperation:
      "Construction-aggregate hauling, demolition, municipal contracts",
    cdlRequired: true,
  },
  tow: {
    slug: "tow",
    name: "Tow / Wrecker",
    shortLabel: "Tow",
    weightClass: "Class 4–8 with wrecker, rotator, or carrier body",
    gvwrRange: "14,000–60,000 lbs GVWR",
    exampleVehicles: [
      "Light-duty wrecker on Class 4 chassis",
      "Heavy-duty rotator on Class 8 chassis",
    ],
    typicalOperation: "On-call recovery and towing; on-hook risk is distinctive",
    cdlRequired: true,
  },
  "flatbed-tractor": {
    slug: "flatbed-tractor",
    name: "Flatbed Tractor",
    shortLabel: "Flatbed",
    weightClass: "Class 8 tractor pulling open flatbed or step-deck trailer",
    gvwrRange: "80,000 lbs combination GVWR (typical)",
    exampleVehicles: [
      "Class 8 tractor + 48-ft flatbed",
      "Class 8 tractor + step-deck",
    ],
    typicalOperation:
      "Steel, lumber, construction materials, oversized when permitted",
    cdlRequired: true,
  },
  "reefer-tractor": {
    slug: "reefer-tractor",
    name: "Reefer Tractor",
    shortLabel: "Reefer",
    weightClass: "Class 8 tractor pulling refrigerated trailer",
    gvwrRange: "80,000 lbs combination GVWR (typical)",
    exampleVehicles: [
      "Class 8 tractor + 53-ft Carrier or Thermo King reefer trailer",
    ],
    typicalOperation:
      "Produce, frozen, pharmaceutical; reefer-breakdown coverage typically required",
    cdlRequired: true,
  },
};

export function getDotClass(slug: string): DotClass | null {
  return (DOT_CLASSES as Record<string, DotClass>)[slug] ?? null;
}

export function getAllDotClasses(): DotClass[] {
  return Object.values(DOT_CLASSES);
}

export function getDotClassSlugs(): DotClassSlug[] {
  return Object.keys(DOT_CLASSES) as DotClassSlug[];
}
