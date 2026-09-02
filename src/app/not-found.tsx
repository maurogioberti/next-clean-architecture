import Link from "next/link";

import { ROUTES } from "@/core/crosscutting/seo/site";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-vs-background px-6 text-vs-foreground">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vs-primary">404</p>
        <h1 className="mt-4 text-4xl font-bold text-vs-heading">This page does not exist.</h1>
        <p className="mt-4 text-vs-foreground-muted">
          The URL may have changed, or the page was never part of this template.
        </p>
        <Link
          href={ROUTES.home}
          className="mt-8 inline-block rounded-xl bg-vs-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-vs-primary-light"
        >
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
