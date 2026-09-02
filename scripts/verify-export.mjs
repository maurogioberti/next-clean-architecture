/**
 * Smoke test for the static export, run right after `next build`.
 *
 * A static site has no server to fail loudly at request time: a page that
 * prerendered as an empty error shell, lost its title, or kept a template
 * placeholder ships as-is and is only discovered by a visitor or a crawler.
 * This walks every HTML file in out/ and fails the build instead.
 */
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");
const REQUIRED_FILES = ["index.html", "404.html", "sitemap.xml", "robots.txt", "favicon.ico"];
const EXPECTED_H1_COUNT = 1;

async function collectHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return entry.name === "_next" ? Promise.resolve([]) : collectHtml(full);
      }
      return Promise.resolve(entry.name.endsWith(".html") ? [full] : []);
    })
  );
  return nested.flat();
}

function inspect(file, html) {
  const problems = [];
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  const body = (withoutScripts.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [])[1] ?? "";
  const visibleText = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] ?? "";
  const h1Count = (body.match(/<h1[\s>]/gi) || []).length;
  const placeholders = withoutScripts.match(/\{[A-Z][A-Z0-9_]+\}/g) || [];

  if (html.includes("__next_error__")) problems.push("prerendered as an error shell");
  if (visibleText.length === 0) problems.push("body has no visible text");
  if (title.trim().length === 0) problems.push("missing <title>");
  if (h1Count !== EXPECTED_H1_COUNT) problems.push(`expected ${EXPECTED_H1_COUNT} <h1>, found ${h1Count}`);
  if (placeholders.length > 0) problems.push(`unresolved placeholders: ${[...new Set(placeholders)].join(", ")}`);

  return problems.map((problem) => `${path.relative(OUT_DIR, file)}: ${problem}`);
}

if (!existsSync(OUT_DIR)) {
  console.error("verify-export: out/ does not exist, run `next build` first.");
  process.exit(1);
}

const problems = REQUIRED_FILES.filter((name) => !existsSync(path.join(OUT_DIR, name))).map(
  (name) => `${name}: missing from the export`
);

const htmlFiles = await collectHtml(OUT_DIR);
for (const file of htmlFiles) {
  problems.push(...inspect(file, await readFile(file, "utf8")));
}

if (problems.length > 0) {
  console.error(`verify-export: ${problems.length} problem(s) found`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`verify-export: ${htmlFiles.length} page(s) checked, ${REQUIRED_FILES.length} required files present.`);
