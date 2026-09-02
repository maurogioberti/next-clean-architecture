const REPOSITORY_URL = "https://github.com/maurogioberti/next-clean-architecture";

const LAYERS = [
  {
    name: "Domain",
    path: "src/core/domain",
    role: "Entities and the contracts everything else depends on.",
  },
  {
    name: "Application",
    path: "src/core/application",
    role: "Use cases that orchestrate the domain, one per workflow.",
  },
  {
    name: "Infrastructure",
    path: "src/core/infrastructure",
    role: "Repositories and services that actually touch data.",
  },
  {
    name: "Crosscutting",
    path: "src/core/crosscutting",
    role: "Dependency injection, SEO helpers and shared utilities.",
  },
];

type HomeBannerProps = {
  message: string;
};

export function HomeBanner({ message }: HomeBannerProps) {
  return (
    <main className="min-h-screen bg-vs-background text-vs-foreground">
      <section className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-vs-primary">
          Next.js 16 · Clean Architecture
        </p>

        <h1 className="text-4xl font-bold leading-tight text-vs-heading sm:text-5xl">{message}</h1>

        <p className="max-w-2xl text-lg text-vs-foreground-muted">
          That headline travelled from a JSON file through a service, a repository, a use case and a
          view model before reaching this page. Every hop is a seam you can test or swap.
        </p>

        <ol className="grid gap-4 sm:grid-cols-2" aria-label="Architecture layers">
          {LAYERS.map((layer, index) => (
            <li
              key={layer.name}
              className="rounded-2xl border border-vs-border bg-vs-background-secondary p-5"
            >
              <p className="text-xs font-semibold text-vs-primary">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-lg font-semibold text-vs-heading">{layer.name}</h2>
              <p className="mt-1 text-sm text-vs-foreground-muted">{layer.role}</p>
              <code className="mt-3 block text-xs text-vs-foreground-muted">{layer.path}</code>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3">
          <a
            href={REPOSITORY_URL}
            className="rounded-xl bg-vs-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-vs-primary-light"
          >
            Read the source
          </a>
          <a
            href={`${REPOSITORY_URL}#readme`}
            className="rounded-xl border border-vs-border px-5 py-3 text-sm font-semibold transition-colors hover:border-vs-primary hover:text-vs-primary"
          >
            How it is organised
          </a>
        </div>
      </section>
    </main>
  );
}
