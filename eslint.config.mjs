import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Explicit alt-text enforcement. core-web-vitals already pulls in
    // jsx-a11y via @next/next, but this guardrail spells out the rule and
    // covers next/image's `Image` element alongside the default <img>.
    // Decorative images should pass `alt=""` (the empty string is a valid
    // alt under jsx-a11y/alt-text when the element is also aria-hidden).
    rules: {
      "jsx-a11y/alt-text": [
        "error",
        { elements: ["img", "object", "area", "input[type=\"image\"]"], img: ["Image"] },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
