import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

/* ===========================================================================
   Regression guard: the two deferred legal items (licenses, do-not-sell)
   were deleted on 2026-05-17. This test fails if either reappears in
   production source (under app/, components/, or lib/) or if either
   deleted page file comes back.

   Methodology was NOT deleted (post-audit scope reduction — the page is
   load-bearing across the site). If you also delete methodology later,
   add "methodology" back to DELETED_PATHS and "app/methodology/page.tsx"
   to DELETED_FILES.

   Excludes: node_modules, .next, docs/ (the spec discusses these paths in
   prose), tests/ (this test mentions them), git history.

   If you're adding a legal page back, do it deliberately and update or
   delete this test in the same commit.
   =========================================================================== */

const DELETED_PATHS = ["licenses", "do-not-sell"] as const;

const DELETED_FILES = [
  "app/(legal)/licenses/page.tsx",
  "app/(legal)/do-not-sell/page.tsx",
] as const;

describe("legal cleanup regression guard", () => {
  it.each(DELETED_PATHS)(
    "production source contains no reference to /%s",
    (deletedPath) => {
      let stdout = "";
      try {
        stdout = execFileSync(
          "grep",
          [
            "-rn",
            "-E",
            `/${deletedPath}`,
            "--include=*.tsx",
            "--include=*.ts",
            "--include=*.json",
            "app",
            "components",
            "lib",
          ],
          { encoding: "utf8", cwd: resolve(__dirname, "..") },
        );
      } catch (err) {
        // grep exits 1 when nothing matches — that's the passing case.
        const e = err as { status?: number; stdout?: string };
        if (e.status === 1) {
          stdout = "";
        } else {
          throw err;
        }
      }
      expect(stdout, `Found stale references to /${deletedPath}:\n${stdout}`).toBe("");
    },
  );

  it.each(DELETED_FILES)("deleted file no longer exists: %s", (file) => {
    expect(existsSync(resolve(__dirname, "..", file))).toBe(false);
  });
});
