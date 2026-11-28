import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"

/** Resolves an addon/framework to an absolute path (needed in monorepos). */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

type Alias = { find: string | RegExp; replacement: string }

/** Vite accepts aliases as an array or an object; normalise to an array. */
function toAliasList(alias: unknown): Alias[] {
  if (Array.isArray(alias)) return alias as Alias[]
  return Object.entries((alias ?? {}) as Record<string, string>).map(
    ([find, replacement]) => ({ find, replacement })
  )
}

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("storybook-addon-pseudo-states"),
  ],
  framework: getAbsolutePath("@storybook/react-vite"),
  // Product images used by ProductCard stories (same files as apps/docs/public).
  staticDirs: ["../public"],
  viteFinal: (config) => ({
    ...config,
    // Compiles preview.css (Tailwind + @act-jirayut/dsai/styles.css) like a consumer app.
    plugins: [...(config.plugins ?? []), tailwindcss()],
    resolve: {
      ...config.resolve,
      // next/image only runs inside Next.js; render a plain <img> instead.
      alias: [
        ...toAliasList(config.resolve?.alias),
        {
          find: /^next\/image$/,
          replacement: fileURLToPath(
            new URL("./next-image.tsx", import.meta.url)
          ),
        },
      ],
    },
  }),
}

export default config
