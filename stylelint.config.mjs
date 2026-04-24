// Dispatched — Stylelint config.
//
// Phase 0 of the design-system plan: land the linter in warning-only mode
// so CI stays green while phases 1–3 clear the backlog. Flip `defaultSeverity`
// to "error" (or remove the line) at the end of phase 2 to enforce strictly.
//
// The token-enforcement rule bans raw px on spacing/size properties in
// consumer stylesheets. tokens.css is exempted — that's where the hex and
// raw values live. See docs/plan-design-system-2026-04-23.md.

export default {
  extends: ["stylelint-config-standard"],
  defaultSeverity: "warning",
  rules: {
    "declaration-property-value-disallowed-list": [
      {
        "/^(padding|margin|gap|row-gap|column-gap)/": [
          "/^\\d+(\\.\\d+)?(px|rem|em)(\\s|$)/",
          "/^\\d+(\\.\\d+)?(px|rem|em)\\s+\\d+/",
        ],
        "font-size": ["/^\\d+(\\.\\d+)?px/"],
      },
      {
        ignoreValues: ["/var\\(--/", "0", "auto", "inherit", "initial"],
      },
    ],
    "color-no-hex": true,
    "color-named": "never",
  },
  ignoreFiles: ["node_modules/**", ".next/**", "public/**"],
  overrides: [
    {
      files: ["app/styles/tokens.css"],
      rules: {
        "color-no-hex": null,
        "color-named": null,
      },
    },
  ],
};
