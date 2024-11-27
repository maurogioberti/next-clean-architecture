import { setupDependencies } from "../di";
import "./globals.css";

setupDependencies();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js Clean Architecture Template</title>
        <meta name="description" content="Welcome to the Next.js template website using clean architecture." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}