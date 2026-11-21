import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(["dist/**"]),
  {
    rules: {
      // Path aliases are not rewritten in the published source, so they
      // break for consumers. The `@/` alias exists only for the shadcn CLI.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*"],
              message: "Use a relative import: aliases break once published.",
            },
          ],
        },
      ],
    },
  },
])
