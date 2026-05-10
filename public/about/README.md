Drop the founder photo here as `angelo.jpg` (or update the path in `app/about/page.tsx`).

Recommended:
- 800×800 px square JPG, ~80 KB
- Source: a clean LinkedIn profile photo, cropped square, with face centered
- File name: `angelo.jpg` (lowercase, jpg extension matches the path the page references)

Until the file is in place the `/about` page will render with a broken image. The `Person` JSON-LD schema field `image` will resolve to a 404 — schema validators tolerate this but Google rich-result eligibility prefers the image to load.
