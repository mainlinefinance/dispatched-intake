import "server-only";

import type { ProductSlug } from "./products";
import type { DotClassSlug } from "./dotClasses";

/* ===========================================================================
   Curated index of which (product, state, dotClass) combinations we have
   editorial commitment to publish. generateStaticParams in money-page
   templates emits *exactly* these — never the full Cartesian product —
   because thin programmatic pages were the explicit failure mode flagged
   by the playbook (HCU rolls).

   Add a row only when:
     - state appears in lib/data/states.ts
     - product appears in lib/data/products.ts
     - dotClass (where applicable) appears in lib/data/dotClasses.ts
     - the editorial body is written, sourced, and reviewer-tagged

   Empty rows are an honest claim. dynamicParams = false on each money-page
   template means any URL not listed here returns 404 instead of a thin
   render.
   =========================================================================== */

export type StateMoneyPage = {
  productSlug: ProductSlug;
  stateSlug: string;
};

export type DeepMoneyPage = {
  productSlug: ProductSlug;
  stateSlug: string;
  dotClassSlug: DotClassSlug;
};

const STATE_MONEY_PAGES: StateMoneyPage[] = [
  { productSlug: "primary-liability", stateSlug: "texas" },
  { productSlug: "primary-liability", stateSlug: "california" },
  { productSlug: "primary-liability", stateSlug: "florida" },
  { productSlug: "primary-liability", stateSlug: "illinois" },
  { productSlug: "primary-liability", stateSlug: "georgia" },
  { productSlug: "motor-truck-cargo", stateSlug: "texas" },
  { productSlug: "motor-truck-cargo", stateSlug: "california" },
  { productSlug: "motor-truck-cargo", stateSlug: "florida" },
  { productSlug: "motor-truck-cargo", stateSlug: "illinois" },
  { productSlug: "motor-truck-cargo", stateSlug: "georgia" },
  { productSlug: "physical-damage", stateSlug: "texas" },
  { productSlug: "physical-damage", stateSlug: "california" },
  { productSlug: "physical-damage", stateSlug: "florida" },
  { productSlug: "general-liability", stateSlug: "texas" },
  { productSlug: "general-liability", stateSlug: "california" },
  { productSlug: "general-liability", stateSlug: "florida" },
  { productSlug: "general-liability", stateSlug: "illinois" },
  { productSlug: "general-liability", stateSlug: "georgia" },
  { productSlug: "physical-damage", stateSlug: "illinois" },
  { productSlug: "physical-damage", stateSlug: "georgia" },
  { productSlug: "occupational-accident", stateSlug: "texas" },
  { productSlug: "occupational-accident", stateSlug: "california" },
  { productSlug: "occupational-accident", stateSlug: "florida" },
  { productSlug: "occupational-accident", stateSlug: "illinois" },
  { productSlug: "occupational-accident", stateSlug: "georgia" },
];

const DEEP_MONEY_PAGES: DeepMoneyPage[] = [
  {
    productSlug: "primary-liability",
    stateSlug: "texas",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "texas",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "primary-liability",
    stateSlug: "texas",
    dotClassSlug: "hot-shot",
  },
  {
    productSlug: "primary-liability",
    stateSlug: "california",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "primary-liability",
    stateSlug: "florida",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "physical-damage",
    stateSlug: "texas",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "physical-damage",
    stateSlug: "california",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "physical-damage",
    stateSlug: "florida",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "primary-liability",
    stateSlug: "texas",
    dotClassSlug: "box-truck",
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "california",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "florida",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "illinois",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "georgia",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "physical-damage",
    stateSlug: "illinois",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "physical-damage",
    stateSlug: "georgia",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "general-liability",
    stateSlug: "texas",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "general-liability",
    stateSlug: "california",
    dotClassSlug: "class-8-tractor",
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "california",
    dotClassSlug: "reefer-tractor",
  },
  {
    productSlug: "motor-truck-cargo",
    stateSlug: "florida",
    dotClassSlug: "reefer-tractor",
  },
  {
    productSlug: "primary-liability",
    stateSlug: "california",
    dotClassSlug: "box-truck",
  },
  {
    productSlug: "primary-liability",
    stateSlug: "florida",
    dotClassSlug: "box-truck",
  },
];

export function getStateMoneyPages(): StateMoneyPage[] {
  return STATE_MONEY_PAGES;
}

export function getDeepMoneyPages(): DeepMoneyPage[] {
  return DEEP_MONEY_PAGES;
}

export function isStateMoneyPagePublished(
  productSlug: string,
  stateSlug: string,
): boolean {
  return STATE_MONEY_PAGES.some(
    (p) => p.productSlug === productSlug && p.stateSlug === stateSlug,
  );
}

export function isDeepMoneyPagePublished(
  productSlug: string,
  stateSlug: string,
  dotClassSlug: string,
): boolean {
  return DEEP_MONEY_PAGES.some(
    (p) =>
      p.productSlug === productSlug &&
      p.stateSlug === stateSlug &&
      p.dotClassSlug === dotClassSlug,
  );
}
