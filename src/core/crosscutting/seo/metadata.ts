import { Metadata } from "next";

import { absoluteUrl, SITE_NAME } from "./site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  openGraphType?: "website" | "article";
};

/**
 * Builds the complete metadata for one page: title, description, canonical,
 * Open Graph and Twitter card. Every URL is absolute, so the output is the
 * same when the site is served from a sub-path such as a GitHub Pages project.
 */
export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  openGraphType = "website",
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: openGraphType,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
