import type { Metadata } from "next";

/* Default share image: the root app/opengraph-image.tsx route.

   A page that sets its own `openGraph` or `twitter` object replaces the
   parent's whole object (Next merges metadata shallowly), which silently
   drops the image the root segment would have supplied. So every page that
   defines either object lists this image explicitly. */
export const OG_IMAGE = "/opengraph-image";

/* Open Graph + Twitter tags for a page that has only a title and a
   description. Gives it og:url and the share image without repeating the
   copy three times in the page file. */
export function withSocial(
  meta: Metadata & { title: string; description: string },
  path: string,
): Metadata {
  return {
    ...meta,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE],
    },
  };
}
