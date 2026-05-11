#!/usr/bin/env node
/**
 * Build-time search-index generator.
 *
 * Snapshots the in-memory search index built by lib/search/index.ts to a
 * JSON file at lib/search/searchIndex.json. The JSON is a build artifact —
 * the runtime /search page does NOT read it (the module-load builder is
 * the source of truth). The file exists as:
 *
 *   1. A documentation surface — drop it into a JSON viewer or grep it to
 *      confirm every page made it into the index after a content change.
 *   2. A future hook for client-side search if/when we add a dropdown.
 *
 * Usage:
 *   npm run build:search-index
 *
 * Implementation notes:
 *   - The data sources (lib/data/glossary, lib/data/blog, lib/data/lenders)
 *     import the `"server-only"` package, which throws when imported from
 *     a non-React-Server-Components environment. This script installs a
 *     module-resolver hook to stub `server-only` before the data files
 *     are loaded.
 *   - The `@/...` path alias from tsconfig.json is also handled via the
 *     resolver hook so we can import lib/search/index.ts unmodified.
 *   - The script is written to be run with Node's native TypeScript
 *     stripping (`node --experimental-strip-types`, Node 22.6+) OR a
 *     TS runner (tsx). The default `tsc --noEmit` typecheck still covers
 *     it because it lives under the project's tsconfig include glob.
 */

import { register } from "node:module";
import { writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import type { SearchableItem } from "../lib/search/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..");
const OUTPUT_PATH = resolve(REPO_ROOT, "lib/search/searchIndex.json");

/* Install loader hooks. Three concerns:
   1. Stub `server-only` so the data files (which import it) don't throw.
   2. Resolve the `@/` path alias to the repo root (matches tsconfig.json).
   3. Add `.ts` extension to relative imports that Next.js bundles
      extensionless but Node ESM requires fully qualified. */
register(
  "data:text/javascript;base64," +
    Buffer.from(
      `
import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const repoRoot = ${JSON.stringify(pathToFileURL(REPO_ROOT).href + "/")};

export async function resolve(specifier, context, nextResolve) {
  if (specifier === "server-only") {
    return {
      url: "data:text/javascript,export%20default%20{}",
      shortCircuit: true,
      format: "module",
    };
  }
  if (specifier.startsWith("@/")) {
    return resolveWithExtensions(repoRoot + specifier.slice(2), context, nextResolve);
  }
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    return resolveWithExtensions(specifier, context, nextResolve);
  }
  return nextResolve(specifier, context);
}

async function resolveWithExtensions(specifier, context, nextResolve) {
  // Try direct resolve first — works for fully qualified specifiers.
  try {
    return await nextResolve(specifier, context);
  } catch {
    // Fall through to extension probing.
  }
  const parent = context.parentURL ? new URL(specifier, context.parentURL) : new URL(specifier);
  const path = fileURLToPath(parent);
  const candidates = [".ts", ".tsx", "/index.ts", "/index.tsx"];
  for (const ext of candidates) {
    const trial = path + ext;
    if (existsSync(trial) && statSync(trial).isFile()) {
      return nextResolve(parent.href + ext, context);
    }
  }
  // Last resort — let Node throw its own error.
  return nextResolve(specifier, context);
}
`,
    ).toString("base64"),
  import.meta.url,
);

/* Dynamically import after the hook is registered. The bare specifier
   "../lib/search/index" goes through the extension-probing resolver hook
   above; using a string variable dodges TS's import-path validation
   (which would otherwise reject either "..ts" or no-extension forms). */
const SEARCH_INDEX_SPECIFIER = "../lib/search/index";
const searchModule = (await import(SEARCH_INDEX_SPECIFIER)) as {
  getSearchIndex: () => ReadonlyArray<SearchableItem>;
};
const index: ReadonlyArray<SearchableItem> = searchModule.getSearchIndex();

writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2) + "\n", "utf8");

// eslint-disable-next-line no-console
console.log(
  `[build-search-index] Wrote ${index.length} entries to ${OUTPUT_PATH}`,
);
