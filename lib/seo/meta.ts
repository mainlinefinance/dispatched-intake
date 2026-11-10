import type { Metadata } from "next";

/* Length budgets for the two tags a search result is built from. Past them
   the result is cut mid-phrase by the search engine, wherever its pixel
   budget happens to end. These helpers make the cut ourselves, at a point
   that still reads as a complete thought.

   Use them where the copy comes from data or a template (glossary terms,
   blog posts, topics, state and city names, comparisons). A page with one
   hand-written title and description should simply be written to fit. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/* Shortest description still worth keeping as whole sentences. Below it a
   word-boundary cut of the full text says more. */
const DESCRIPTION_MIN = 70;

const TITLE_SEPARATORS = [" | ", " — "];

/* Drops trailing segments ("… | Dispatched", "… — 2026 Comparison") until
   the title fits. The first segment is the subject and always stays. */
export function fitTitle(title: string, max: number = TITLE_MAX): string {
  let fitted = title.trim();
  while (fitted.length > max) {
    const cut = Math.max(
      ...TITLE_SEPARATORS.map((separator) => fitted.lastIndexOf(separator)),
    );
    if (cut <= 0) break;
    fitted = fitted.slice(0, cut).trimEnd();
  }
  return fitted;
}

/* Keeps as many whole sentences as fit. When not even the first one does,
   cuts at a word boundary and marks the cut with an ellipsis. */
export function fitDescription(
  description: string,
  max: number = DESCRIPTION_MAX,
): string {
  const text = description.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;

  // A sentence ends at . ! or ? followed by a space and a capital, digit or
  // opening quote/paren; "U.S. carriers" and "$1.80/mile" do not match.
  const ends: number[] = [];
  const boundary = /[.!?](?=\s+["“(]?[A-Z0-9$])/g;
  for (let m = boundary.exec(text); m; m = boundary.exec(text)) {
    if (/\b(?:[A-Z]|vs|etc|e\.g|i\.e|U\.S|No|St)$/.test(text.slice(0, m.index))) {
      continue;
    }
    ends.push(m.index + 1);
  }
  const whole = ends.filter((end) => end <= max).pop();
  if (whole !== undefined && whole >= DESCRIPTION_MIN) {
    return text.slice(0, whole);
  }

  const room = text.slice(0, max - 1);
  const lastSpace = room.lastIndexOf(" ");
  const cut = (lastSpace > 0 ? room.slice(0, lastSpace) : room).replace(
    /[\s,;:—–(-]+$/,
    "",
  );
  return `${cut}…`;
}

/* Fits the title and description a search result shows. The Open Graph and
   Twitter copies are left alone: share cards have their own, roomier limits. */
export function fitMeta<T extends Metadata>(meta: T): T {
  const fitted = { ...meta };
  if (typeof meta.title === "string") fitted.title = fitTitle(meta.title);
  if (typeof meta.description === "string") {
    fitted.description = fitDescription(meta.description);
  }
  return fitted;
}
