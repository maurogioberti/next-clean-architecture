import "./globals.css";

import layoutMetadata from "@/core/crosscutting/seo/layout";

import { setupDependencies } from "../di";

// Registering at module scope runs once per server or build process. The
// container itself lives on globalThis, so Next re-evaluating this module per
// route segment does not produce a second, empty container.
setupDependencies();

export const metadata = layoutMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
