<p align="center">
  <a href="https://maurogioberti.com" target="_blank">
    <img alt="Mauro Gioberti" src="https://maurogioberti.com/assets/profile/maurogioberti-avatar.png" width="200" />
  </a>
</p>

<h1 align="center">
  Clean Architecture Template for Next.js 🚀
</h1>
<p align="center">
  Domain, application, infrastructure and crosscutting layers on Next.js 16, with a dependency-free DI container that works in server components and static export. 🏗️
  <br />
  <br />
  <a href="https://github.com/maurogioberti/next-clean-architecture/stargazers">⭐ Stars are welcome 😊</a>
  <a href="https://github.com/maurogioberti/next-clean-architecture/issues">🐛 Report an issue</a>
  <a href="https://maurogioberti.com">🌐 Visit my site</a>
</p>

<p>
  <a href="https://www.codescouts.academy/" title="CodeScouts Academy" target="_blank">
    <img src="https://img.shields.io/badge/built_with-Codescouts-blue?style=for-the-badge" alt="Built with Codescouts" />
  </a>
</p>

<span>
  <img src="https://img.shields.io/badge/maintained-yes-green" alt="maintained - yes">
  <a href="https://github.com/maurogioberti/next-clean-architecture/contribute"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen" alt="contributions - welcome"></a>
  <a href="https://github.com/maurogioberti/next-clean-architecture/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="license - MIT"></a>
</span>

---

## 🧭 What This Is

A small, complete Next.js application organised by **Clean Architecture**: the business rules live in `src/core` and know nothing about React or Next, the App Router in `src/app` is a thin presentation layer, and a hand-rolled dependency injection container wires the two together. It ships as a **static export**, so it deploys to GitHub Pages (or any static host) with no server.

The template is the seed of [maurogioberti.com](https://maurogioberti.com); the patterns here are the ones that survived growing that site.

## 🛠 Tech Stack

| Area | Choice |
|---|---|
| Runtime | Node.js 24 LTS (`.nvmrc`, `engines`) |
| Framework | Next.js 16 (App Router, Turbopack, `output: "export"`) |
| UI | React 19, Tailwind CSS 4 with design tokens in `@theme` |
| Language | TypeScript 5.9, strict |
| Tests | Jest 30 through `next/jest`, Testing Library, jest-dom |
| Lint | ESLint 9 flat config with `eslint-config-next` |
| CI | GitHub Actions: lint, typecheck, test and an export smoke test gate every deploy |

## 🚀 Getting Started

⬇️ **Clone this repo**
```bash
git clone https://github.com/maurogioberti/next-clean-architecture.git
cd next-clean-architecture
```

🟢 **Use the pinned Node version**
```bash
nvm use
```

📦 **Install dependencies**
```bash
npm install
```

🏁 **Run the app**
```bash
npm run dev
```

No environment variables are needed. The demo data lives in `src/data`.

## 📜 Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Static export to `out/`, then `scripts/verify-export.mjs` checks every page |
| `npm run preview` | Serves `out/` locally |
| `npm test` | Unit and component tests |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## 📂 Folder Structure

```
project-root/
├── src/
│   ├── core/                                   # Framework-agnostic business code
│   │   ├── domain/
│   │   │   ├── model/Message.ts                # Entity; declares FIELDS for the mapper
│   │   │   ├── repository/MessageRepository.ts # Contract the application layer depends on
│   │   │   └── services/MessageService.ts      # Contract for the data source
│   │   ├── application/
│   │   │   └── get-message-use-case.ts         # One use case, one workflow
│   │   ├── infrastructure/
│   │   │   ├── repository/MessageRepositoryImpl.ts   # Maps raw data into the entity
│   │   │   └── services/
│   │   │       ├── base/BaseService.ts         # fetchData(): loads a JSON document from src/data
│   │   │       └── MessageServiceImpl.ts       # Reads message.json
│   │   └── crosscutting/
│   │       ├── injection/
│   │       │   ├── DependencyInjectionContainer.ts  # register / resolve / configure / override
│   │       │   ├── DependencyIdentifiers.ts    # Typed tokens for every dependency
│   │       │   └── Token.ts                    # token<T>(): a string that carries its type
│   │       ├── mapping/Automapper.ts           # JSON -> entity, by field name
│   │       └── seo/                            # site.ts, metadata helper, layout and page metadata
│   ├── app/                                    # Next.js App Router (presentation only)
│   │   ├── layout.tsx                          # Root layout; calls setupDependencies()
│   │   ├── page.tsx                            # Home route (view)
│   │   ├── homeViewModel.ts                    # Resolves the use case, shapes data for the view
│   │   ├── not-found.tsx / robots.ts / sitemap.ts
│   │   ├── globals.css                         # Tailwind 4 import, @theme tokens, light/dark palettes
│   │   └── components/
│   │       ├── HomeBanner.tsx                  # Presentational component
│   │       └── theme/                          # Theme toggle + inline init script
│   ├── data/message.json                       # Demo data source
│   └── di.ts                                   # Composition root
├── public/                                     # favicon, Open Graph image
├── scripts/verify-export.mjs                   # Post-build smoke test of out/
└── .github/workflows/deploy.yml                # Build, test, deploy to Pages
```

Tests sit next to the code they cover as `*.test.ts` / `*.test.tsx`.

## 🔁 How a Request Flows

The headline on the home page comes from `src/data/message.json`, and every layer touches it once:

```
message.json  ─►  MessageServiceImpl.fetchMessage()      infrastructure / service
              ─►  MessageRepositoryImpl.getMessage()     infrastructure / repository (Automapper -> Message)
              ─►  GetMessageUseCase.execute()            application
              ─►  homeViewModel()                        app (resolves the use case from the container)
              ─►  page.tsx  ─►  <HomeBanner />           app (view)
```

The view model is the only place the presentation layer touches the container. Pages and components receive plain data.

## 💉 Dependency Injection

There is no DI library. `src/core/crosscutting/injection` is ~80 lines, and it does four things a Next.js app needs:

- **Typed tokens.** `DependencyIdentifiers` are built with `token<T>()`, so `container.resolve(DependencyIdentifiers.USE_CASES.GET_MESSAGE)` returns a `GetMessageUseCase` with no generic argument, and a token of the wrong type is a compile error.
- **A resolver for factories.** In `src/di.ts` each factory receives the container being configured, so dependencies compose without reaching for a global.
- **One instance across module re-evaluation.** Next evaluates server modules more than once (per route segment, per worker, after hot reload). The container lives on `globalThis`, so every evaluation shares one registry, and `configure()` runs the composition root at most once. This is why `setupDependencies()` can be called from `layout.tsx` and any other entry point safely.
- **`override()` for tests.** A test swaps what a token resolves to and calls `clear()` afterwards; see `homeViewModel.test.ts`.

## 📄 Data and Mapping

Data is local JSON under `src/data`, loaded by `BaseService.fetchData()` through a dynamic import. The `.json` suffix is inside the template literal on purpose: it narrows the bundler's import context to JSON files.

`Automapper` maps a document onto an entity **by field name**. The entity declares its constructor parameters in a static `FIELDS` list, so the key order of the JSON is irrelevant, a missing required field fails the build with the model name and the missing keys, and a field can carry a transform (for example, a string into a `Date`).

## 🔍 SEO

`src/core/crosscutting/seo/site.ts` is the one file to edit after cloning: the public URL, name and description flow into the `Metadata` API (`layout.ts`, `home.ts` via `createPageMetadata`), `robots.ts` and `sitemap.ts`. Every URL is absolute, so the output is the same when the site is served from a sub-path such as a GitHub Pages project.

## 🌗 Theme

Dark is the default; light applies when the OS prefers it, and either can be forced with the toggle. An inline script in `<head>` stamps `data-theme` on `<html>` before the first paint, the palettes are CSS custom properties exposed to Tailwind through `@theme`, and the toggle keeps no React state: the icon is chosen by the `dark:` variant, so the server-rendered markup is identical to the client's.

## 🧪 Testing

- **Unit tests** for the container, the mapper, the use case, the repository, the service and the view model.
- **Component tests** with Testing Library, asserting through roles and accessible names.
- **Export smoke test** (`scripts/verify-export.mjs`) after every build: every HTML page must have visible content, a title, exactly one `h1`, no unresolved placeholders, and must not be a prerendered error shell.

```bash
npm test
```

## 🚦 CI/CD

`.github/workflows/deploy.yml` runs two jobs in parallel, **build** (export + smoke test) and **test** (lint, typecheck, unit suite), and deploys to GitHub Pages only when both pass. Node comes from `.nvmrc`, so local and CI cannot drift. The test job runs with read-only permissions.

## ✨ Naming Conventions

| Layer | Example | Convention |
|---|---|---|
| Route | `page.tsx`, `layout.tsx` | Next.js file conventions |
| View model | `homeViewModel.ts` | camelCase, next to its page |
| Component | `HomeBanner.tsx` | PascalCase |
| Domain model | `Message.ts` | PascalCase |
| Domain contract | `MessageRepository.ts`, `MessageService.ts` | PascalCase interface |
| Use case | `get-message-use-case.ts` | kebab-case, class `GetMessageUseCase` |
| Implementation | `MessageRepositoryImpl.ts` | PascalCase with `Impl` suffix |
| Test | `Message.test.ts` | Same name as the subject, `.test` suffix |

## 🧱 Deliberately Not Upgraded

Checked against the current ecosystem when this template was last refreshed:

- **TypeScript 7**: `typescript-eslint` supports `< 6.1`, and 7.x ships no `tsserver` for the `next` editor plugin.
- **ESLint 10**: the React, JSX a11y and import plugins pulled in by `eslint-config-next` still cap at ESLint 9.
- **@faker-js/faker 10**: ESM-only; it needs Jest transform wiring that is not worth it for test data.
- **Node 26**: not an LTS line yet. Move `.nvmrc` and `@types/node` together when it is.

## 🧑‍💻 Credits

Inspired by [Damian Pumar](https://damianpumar.com) and [CodeScouts Academy](https://www.codescouts.academy/). Their [React template](https://github.com/codescouts-academy/react-clean-architecture) is CSR-focused; this one implements its own DI to work with server components and static export.

## 🤔 Contributing

Fork it, send a PR, open an issue. Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build` before pushing; CI runs the same four.

## 📜 License

Released under [MIT License](https://github.com/maurogioberti/next-clean-architecture/blob/master/LICENSE) by [Mauro Gioberti](https://maurogioberti.com).
