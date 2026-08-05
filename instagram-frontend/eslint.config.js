import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "dist",
    "node_modules",
    ".next",
    "build",
    // Generated / tool output
    "coverage",
    "playwright-report",
    "test-results",
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022, // Modernized for 2026 compilation runtimes
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // Production Grade Optimization Rule Blocks
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": "error",
      "no-unused-vars": "off", // Turned off in favor of the more accurate TypeScript compiler rule below

      // TypeScript Strict Integrity Rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Discourages typing errors with 'any' statements
      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/no-empty-object-type": "error",

      // React Operational Hook Rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Fast Refresh Compilation Enforcement
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Feature-Sliced Design layer boundaries
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      boundaries,
      "@eslint-community/eslint-comments": eslintComments,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "boundaries/include": ["src/**/*.{ts,tsx}"],
      // Ambient type declarations aren't modules and belong to no layer; exclude them
      // from element classification so no-unknown-files doesn't flag them.
      "boundaries/ignore": ["src/**/*.d.ts"],
      // v7 element descriptors classify *folders*. Every file beneath a folder
      // inherits its element type/captures.
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "pages", pattern: "src/pages" },
        { type: "widgets", pattern: "src/widgets/*", capture: ["slice"] },
        // features/websocket has no domain grouping, unlike every other feature slice;
        // it must be matched before the generic two-level pattern below
        {
          type: "features",
          pattern: "src/features/websocket",
          capture: ["slice"],
        },
        {
          type: "features",
          pattern: "src/features/*/*",
          capture: ["domain", "slice"],
        },
        { type: "entities", pattern: "src/entities/*", capture: ["slice"] },
        { type: "shared", pattern: "src/shared/*", capture: ["slice"] },
      ],
      // The Vite entry (src/main.tsx) sits outside src/app, so it isn't covered by
      // any folder element. Classify it as an app-layer *file* instead — element
      // patterns match folders, not individual files, in v7.
      "boundaries/files": [{ category: "app", pattern: "src/main.tsx" }],
    },
    rules: {
      // Keep the FSD boundaries impossible to silence with an inline comment.
      // A blanket `// eslint-disable` (no rule named) would turn off boundaries too,
      // so ban unscoped disables outright...
      "@eslint-community/eslint-comments/no-unlimited-disable": "error",
      // ...and ban any disable directive that targets the boundaries/* rules by name.
      "@eslint-community/eslint-comments/no-restricted-disable": [
        "error",
        "boundaries/*",
      ],
      // Every file under src must belong to a known FSD element (or be explicitly
      // classified/ignored). Catches new files dropped outside the layer structure.
      "boundaries/no-unknown-files": "error",
      // Disallow importing modules that aren't part of any known element, so nothing
      // sneaks in through an unclassified path.
      "boundaries/no-unknown-dependencies": "error",
      // Layers may only depend on themselves and layers below them; sibling slices within
      // widgets/features/entities may not import each other (push shared logic down instead)
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          // Policies use last-write-wins: the barrel-only disallow is placed last so it
          // overrides the layer allows above it for deep (non-index) imports.
          policies: [
            {
              // The app layer and the app-layer entry file may import any layer.
              from: [
                { element: { types: "app" } },
                { file: { categories: "app" } },
              ],
              allow: {
                to: {
                  element: {
                    types: [
                      "app",
                      "pages",
                      "widgets",
                      "features",
                      "entities",
                      "shared",
                    ],
                  },
                },
              },
            },
            {
              from: { element: { types: "pages" } },
              allow: {
                to: {
                  element: {
                    types: ["widgets", "features", "entities", "shared"],
                  },
                },
              },
            },
            {
              from: { element: { types: "widgets" } },
              allow: {
                to: { element: { types: ["features", "entities", "shared"] } },
              },
            },
            {
              from: { element: { types: "features" } },
              allow: { to: { element: { types: ["entities", "shared"] } } },
            },
            {
              from: { element: { types: "entities" } },
              allow: { to: { element: { types: "shared" } } },
            },
            {
              from: { element: { types: "shared" } },
              allow: { to: { element: { types: "shared" } } },
            },
            // Slices/segments are only reachable through their public index.ts barrel,
            // never by deep import — including shared segments (ui, lib, utils, config),
            // which each expose an index.ts. Same-slice internal imports are unaffected:
            // boundaries/dependencies ignores dependencies within the same element by
            // default (checkInternals: false).
            {
              disallow: {
                to: {
                  element: {
                    types: ["widgets", "features", "entities", "shared"],
                    fileInternalPath: "!index.ts",
                  },
                },
              },
            },
          ],
        },
      ],
    },
  },
  {
    // Playwright e2e specs are not React; disable the React-specific rules.
    // (The `use` fixture param trips react-hooks/rules-of-hooks otherwise.)
    // Placed last so it overrides the shared rules above for these files.
    files: ["e2e/**/*.ts", "playwright.config.ts"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // Vitest specs and the shared test setup. Add the test globals (globals:true
    // in vitest.config), and relax rules that don't apply to test-only code:
    // FSD boundaries (tests may import their subject freely) and fast-refresh.
    // Placed last so it wins over the shared config above.
    files: ["src/**/*.{test,spec}.{ts,tsx}", "src/test/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        vi: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    rules: {
      "boundaries/dependencies": "off",
      // Test setup/helpers under src/test aren't FSD elements; don't require them
      // to be classified.
      "boundaries/no-unknown-files": "off",
      "react-refresh/only-export-components": "off",
    },
  },
]);
