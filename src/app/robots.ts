import { MetadataRoute } from "next";

import { absoluteUrl } from "@/core/crosscutting/seo/site";

// Required under output: "export" so the file is written at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
