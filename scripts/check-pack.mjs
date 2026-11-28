// Fails if the @dsai/ui tarball is missing what consumers need, or ships source.
// Run after `pnpm build`. Used by CI (.github/workflows/ci.yml).
import { execFileSync } from "node:child_process"
import { readdirSync } from "node:fs"

const output = execFileSync("pnpm", ["pack", "--dry-run"], {
  cwd: new URL("../packages/ui/", import.meta.url),
  encoding: "utf8",
})
const files = new Set(
  output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) =>
      /^(dist\/|src\/|package\.json|README\.md|LICENSE)/.test(line)
    )
)

const components = readdirSync(
  new URL("../packages/ui/src/components/", import.meta.url),
  { withFileTypes: true }
)
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

const required = [
  "package.json",
  "README.md",
  "LICENSE",
  "dist/index.js",
  "dist/index.d.ts",
  "dist/styles.css",
  "dist/components.css",
  "dist/theme.css",
  "dist/shadcn.css",
  ...components.flatMap((name) => [
    // index.ts re-exports are folded into dist/index.js, so check the module itself.
    `dist/components/${name}/${name}.js`,
    `dist/components/${name}/index.d.ts`,
  ]),
]

const missing = required.filter((file) => !files.has(file))
const leakedSource = [...files].filter((file) =>
  /^src\/.*\.(tsx?|css)$/.test(file)
)
const missingDocs = components.filter(
  (name) =>
    ![...files].some(
      (file) =>
        file.startsWith(`src/components/${name}/`) && file.endsWith(".md")
    )
)

const problems = [
  ...missing.map((file) => `missing from the package: ${file}`),
  ...leakedSource.map((file) => `source file would be published: ${file}`),
  ...missingDocs.map(
    (name) => `no usage doc (.md) shipped for component: ${name}`
  ),
]

if (problems.length) {
  console.error(problems.join("\n"))
  process.exit(1)
}
console.log(
  `@dsai/ui package OK: ${files.size} files, ${components.length} components.`
)
