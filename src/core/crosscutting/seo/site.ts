/**
 * Site identity used by every metadata builder.
 *
 * When you clone this template, this is the one file to update: the public
 * URL, name and description flow into titles, canonicals, Open Graph tags,
 * robots.txt and the sitemap.
 */
export const SITE_URL = "https://maurogioberti.github.io/next-clean-architecture";
export const SITE_NAME = "Next.js Clean Architecture";
export const SITE_TITLE = "Clean Architecture Template for Next.js";
export const SITE_DESCRIPTION =
  "A Next.js 16 template with domain, application, infrastructure and crosscutting layers, a dependency-free DI container, and a static export ready for GitHub Pages.";
export const SITE_AUTHOR = "Mauro Gioberti";

export const ROUTES = {
  home: "/",
} as const;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
