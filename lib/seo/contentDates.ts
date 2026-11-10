import dates from "./contentDates.json";

/* Real publish and last-edit dates for every page, keyed by the page's
   source file. Feeds the Article JSON-LD, the visible "Updated" bylines and
   the sitemap's <lastmod>.

   These used to be `new Date()` at build time, which stamped every page as
   published and updated on the day of each deploy. Search and answer engines
   discount freshness signals they catch being wrong, so the dates here are
   literals: taken from the file's git history when the map was created, and
   edited by hand from then on.

   When a page's content changes, bump its `modified` in contentDates.json in
   the same commit. A new page needs a new entry — the key type below makes
   a missing one a compile error. Pure refactors do not count as a change. */

export type ContentDateKey = keyof typeof dates;

export type ContentDates = {
  /* ISO date (YYYY-MM-DD) the page first shipped. */
  published: string;
  /* ISO date of the last change to what the page says. */
  modified: string;
};

export function contentDates(file: ContentDateKey): ContentDates {
  return dates[file];
}

/* Dates for a URL path, for the sitemap. Matches the path against the page
   files: an exact static route wins, otherwise the dynamic template whose
   segments line up (`/lenders/texas` → app/lenders/[state]/page.tsx).
   Returns null for a path no page file serves. */
export function contentDatesForPath(path: string): ContentDates | null {
  const segments = path.split("/").filter(Boolean);
  let best: { key: ContentDateKey; dynamic: number } | null = null;
  for (const key of Object.keys(dates) as ContentDateKey[]) {
    const route = key
      .replace(/^app\//, "")
      .replace(/\/?page\.tsx$/, "")
      .split("/")
      // Route groups such as (legal) are not part of the URL.
      .filter((s) => s && !/^\(.*\)$/.test(s));
    if (route.length !== segments.length) continue;
    let dynamic = 0;
    let matches = true;
    for (let i = 0; i < route.length; i++) {
      if (/^\[.*\]$/.test(route[i])) dynamic++;
      else if (route[i] !== segments[i]) {
        matches = false;
        break;
      }
    }
    if (matches && (best === null || dynamic < best.dynamic)) {
      best = { key, dynamic };
    }
  }
  return best ? dates[best.key] : null;
}
