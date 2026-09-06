import { HomeBanner } from "@/app/components/HomeBanner";
import homeMetadata from "@/core/crosscutting/seo/home";

import { homeViewModel } from "./homeViewModel";

export const metadata = homeMetadata;

export default async function HomePage() {
  const { message } = await homeViewModel();

  return <HomeBanner message={message} />;
}
