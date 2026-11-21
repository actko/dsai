import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

const pkg = JSON.parse(readFileSync("./package.json", "utf8"))

// Dependencies and peers stay as bare imports in dist; consumers install them.
const externals: string[] = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
]
const isExternal = (id: string) =>
  externals.some((dep) => id === dep || id.startsWith(`${dep}/`))

/**
 * Guarantees every output file whose source starts with "use client" still
 * starts with it, so Next.js treats it as a Client Component. Rolldown keeps
 * the directive today; this guards against it being dropped or moved.
 */
function preserveUseClient(): Plugin {
  return {
    name: "dsai:preserve-use-client",
    renderChunk(code, chunk) {
      const source = chunk.facadeModuleId?.split("?")[0]
      if (!source || !/\.[jt]sx?$/.test(source)) return null
      const head = readFileSync(source, "utf8").trimStart()
      if (!/^["']use client["']/.test(head)) return null
      if (/^["']use client["']/.test(code.trimStart())) return null
      return { code: `"use client";\n${code}`, map: null }
    },
  }
}

/**
 * Writes the public stylesheet (`@dsai/ui/styles.css`) and the token files it
 * imports. These stay Tailwind source: the consumer's Tailwind v4 compiles
 * them, so `bg-primary` etc. work in consumer code too.
 */
function publicStyles(): Plugin {
  const styles = resolve(import.meta.dirname, "src/styles")
  return {
    name: "dsai:public-styles",
    generateBundle() {
      for (const file of ["shadcn.css", "theme.css"]) {
        this.emitFile({
          type: "asset",
          fileName: file,
          source: readFileSync(resolve(styles, file), "utf8"),
        })
      }
      this.emitFile({
        type: "asset",
        fileName: "styles.css",
        source: [
          "/* @dsai/ui public stylesheet. Import right after Tailwind:",
          ' *   @import "tailwindcss";',
          ' *   @import "@dsai/ui/styles.css";',
          " */",
          '@import "tw-animate-css";',
          '@import "./shadcn.css";',
          '@import "./theme.css";',
          '@import "./components.css";',
          "",
          "/* Generate utilities used directly in component markup (e.g. `sr-only`). */",
          '@source "./**/*.js";',
          "",
        ].join("\n"),
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preserveUseClient(), publicStyles()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      // Compiled CSS Modules of every component, in one file.
      cssFileName: "components",
    },
    cssCodeSplit: false,
    rolldownOptions: {
      external: isExternal,
      output: {
        // One output file per source module: tree-shakable, and each file
        // keeps its own "use client" boundary.
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
})
