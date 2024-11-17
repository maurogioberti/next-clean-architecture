"use client";

import { DependencyInjectionContainer } from "@codescouts/di";
import { buildDependencies } from "../di";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DependencyInjectionContainer builder={buildDependencies}>
        {children as React.ReactElement}
        </DependencyInjectionContainer>
      </body>
    </html>
  );
}
