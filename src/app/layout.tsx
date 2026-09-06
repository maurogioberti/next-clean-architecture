import "./globals.css";

import { themeInitScript } from "@/app/components/theme/theme";
import { ThemeToggle } from "@/app/components/theme/ThemeToggle";
import layoutMetadata from "@/core/crosscutting/seo/layout";

import { setupDependencies } from "../di";

// Registering at module scope runs once per server or build process. The
// container itself lives on globalThis, so Next re-evaluating this module per
// route segment does not produce a second, empty container.
setupDependencies();

export const metadata = layoutMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script stamps data-theme on <html> before hydration, which is
    // an expected difference from the server markup; hence the suppression.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <div className="fixed right-4 top-4 z-10">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
