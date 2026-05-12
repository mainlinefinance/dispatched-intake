/* ===========================================================================
   Site-wide search bar — server-rendered, no JavaScript.

   A plain HTML form that GETs to /search?q=... The /search page does all
   the filtering work. Keeping this server-rendered means:
     - Works without JS (a real concern on cellular for drivers in trucks)
     - Indexable by crawlers as a navigation surface
     - Zero hydration cost — the form is just HTML

   When the dropdown / typeahead becomes worth building (after v1 traffic
   data tells us search-as-you-type is materially better than submit-and-
   render), this can become a client component that imports
   lib/search/searchIndex.json and runs the same `searchAll` logic in the
   browser. The form fallback stays as a no-JS path.

   Styling: Tailwind utilities only — no new CSS rules added to the global
   sheets. This keeps the component portable across pages that already
   carry their own scoped CSS namespace (.research-page, .landing, etc.)
   without leaking styles into a wider scope.
   =========================================================================== */

type Props = {
  /** Pre-fill the input (e.g., on the /search results page). */
  readonly defaultValue?: string;
  /** Visual variant — "compact" for nav slots, "hero" for the search page. */
  readonly variant?: "compact" | "hero";
};

export default function SearchBar({
  defaultValue = "",
  variant = "compact",
}: Props) {
  const isHero = variant === "hero";
  return (
    <form
      action="/search"
      method="get"
      role="search"
      aria-label="Search the Dispatched library"
      className={
        isHero
          ? "flex flex-col gap-3 sm:flex-row sm:items-stretch w-full max-w-2xl"
          : "flex items-stretch gap-2 w-full max-w-md"
      }
    >
      <label htmlFor="site-search-input" className="sr-only">
        Search the Dispatched library
      </label>
      <input
        id="site-search-input"
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={
          isHero
            ? "Search glossary, blog, lenders, calculators, research…"
            : "Search the site…"
        }
        autoComplete="off"
        spellCheck="false"
        minLength={2}
        maxLength={120}
        required
        className={
          isHero
            ? "flex-1 min-w-0 rounded-md border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            : "flex-1 min-w-0 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        }
      />
      <button
        type="submit"
        className={
          isHero
            ? "rounded-md bg-neutral-900 px-5 py-3 text-base font-semibold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/30"
            : "rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/30"
        }
      >
        Search
      </button>
    </form>
  );
}
