import { Metadata } from "next";

import { createPageMetadata } from "./metadata";
import { ROUTES, SITE_DESCRIPTION, SITE_TITLE } from "./site";

const baseHomeMetadata = createPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: ROUTES.home,
  image: "/assets/open-graph/default-og-image.png",
  imageAlt: SITE_TITLE,
});

// The root page keeps the site title verbatim instead of the "%s | Site" template.
const homeMetadata: Metadata = {
  ...baseHomeMetadata,
  title: {
    absolute: SITE_TITLE,
  },
};

export default homeMetadata;
