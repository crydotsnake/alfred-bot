import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginImport from "eslint-plugin-import";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    plugins: {
    import: eslintPluginImport
  },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "off",
      "import/order": ["warn", { "groups": ["builtin", "external", "internal"] }]
    }
  },
  tseslint.configs.recommended,
]);
