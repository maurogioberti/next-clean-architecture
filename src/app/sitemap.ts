import { MetadataRoute } from "next";

import { absoluteUrl, ROUTES } from "@/core/crosscutting/seo/site";

// Required under output: "export" so the file is written at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map((path) => ({
    url: absoluteUrl(path),
  }));
}
