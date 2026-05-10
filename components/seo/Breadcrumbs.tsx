/* ===========================================================================
   Visible breadcrumb navigation. Renders the same items array used to build
   the BreadcrumbList JSON-LD, so the visible UI and the structured data
   never drift (Google penalizes mismatch and revokes the rich-result
   snippet when JSON-LD claims a chain the page does not display).

   Items use absolute URLs (matching the JSON-LD payload schema). The
   component strips them to pathnames for client-side <Link> hrefs so the
   first click stays in the SPA — no full page navigation when the user is
   already on the same origin.
   =========================================================================== */

import Link from "next/link";

export type BreadcrumbItem = { name: string; url: string };

export function Breadcrumbs({
  items,
}: {
  items: ReadonlyArray<BreadcrumbItem>;
}) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const pathname = toPathname(item.url);
          return (
            <li key={item.url}>
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={pathname}>{item.name}</Link>
              )}
              {!isLast ? (
                <span aria-hidden="true" className="breadcrumbs-sep">
                  {" › "}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* Defensive: if the URL is already a relative path, return as-is. We only
   call new URL() for absolute URLs so a malformed entry can't throw at
   render time and break a page that is otherwise complete. */
function toPathname(url: string): string {
  if (url.startsWith("/")) return url;
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}
