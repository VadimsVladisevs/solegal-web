import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "build/",
      ".react-router/",
      "playwright-report/",
      "test-results/",
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    // Content and UI dictionaries reach pages only through the content layer,
    // so Sanity can replace the local source (step 10). Type imports are fine.
    files: ["app/**/*.{ts,tsx}"],
    ignores: [
      "app/content/**",
      "app/lib/content/**",
      "app/lib/i18n/dictionaries/**",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex:
                "^(~|\\.{1,2}(/\\.\\.)*)/(content|lib/i18n/dictionaries|dictionaries)(/|$)",
              allowTypeImports: true,
              message: "Load content and dictionaries via ~/lib/content.",
            },
          ],
        },
      ],
    },
  },
  prettier,
);
