# Project overview

A public design system built on shadcn/ui, published to npm and developed in the open on git. React + TypeScript components, demonstrated in a Next.js app.

Ask the maintainer before deviating from the decisions below, and update this file when one changes.

# Repo layout

pnpm workspaces + Turborepo monorepo:

- `packages/ui` — **the published npm package `@act-jirayut/dsai`**. Everything consumers install lives here.
- `apps/docs` — Next.js 16 + Tailwind CSS v4 playground that consumes the built `@act-jirayut/dsai` (`dist`) as a workspace dependency, set up exactly as an external consumer would be. Never published.
- `apps/storybook` — Storybook 10 (React + Vite) for checking each component's props and states, also on the built `dist`. Never published.

# Commands

```bash
pnpm install
pnpm dev                       # turbo: builds ui, then ui watch build + docs (:3000) + Storybook (:6006)
pnpm turbo run dev --filter=storybook...   # ui watch + Storybook only (.claude/launch.json "storybook")
pnpm lint | pnpm typecheck | pnpm build   # turbo across all packages; each first builds @act-jirayut/dsai
pnpm --filter @act-jirayut/dsai build   # one package
cd packages/ui && pnpm pack --dry-run   # list what would be published
pnpm format                    # prettier on everything, incl. *.module.css
```

`apps/docs` and `apps/storybook` resolve `@act-jirayut/dsai` to `packages/ui/dist`, so they need a built `dist` first; the Turbo tasks take care of that. Test runner: none yet. Verify with `lint`, `typecheck`, `build`, the docs app and Storybook.

**CI** (`.github/workflows/ci.yml`) runs on every pull request into `main` and every push to `main`, on Node 24 with the pnpm pinned in `package.json` (via Corepack): `pnpm install --frozen-lockfile`, `format:check`, `lint`, `typecheck`, `build`, then `node scripts/check-pack.mjs`. That last script fails if the `@act-jirayut/dsai` tarball is missing `dist` entry points or a component's `index.d.ts`, ships `.tsx`/`.css` source, or lacks a component's `.md`. Run the same steps locally before opening a PR; a lockfile out of step with `package.json` fails the install step.

# Library build (`packages/ui`, Vite library mode)

`vite build && tsc -p tsconfig.build.json` produces `dist/`, which is all that ships (plus the component docs, `src/components/**/*.md`). Config is in `packages/ui/vite.config.ts`:

- **JS:** ESM only, one output file per source module (`preserveModules`), so consumers tree-shake and each file keeps its own `"use client"`. A plugin guarantees that directive survives bundling. Every `dependency` and `peerDependency` stays an external bare import.
- **Types:** `tsc -p tsconfig.build.json` emits `.d.ts` next to the JS. `types/css-modules.d.ts` exists only for local type checking.
- **CSS, two kinds:**
  - `dist/components.css` — all CSS Modules, compiled by Tailwind at build time: hashed class names, `@apply` resolved, still inside `@layer components`. They read the token variables (`var(--primary)`), not literal colors.
  - `dist/styles.css`, `theme.css`, `shadcn.css` — copied/generated as **Tailwind source**, so the consumer's Tailwind v4 compiles the tokens and their apps get `bg-primary` etc. too. `styles.css` imports the other three and has `@source "./**/*.js"` so utilities written in component markup (like `sr-only` in Dialog) are generated.
- **Entry points:** `src/index.ts` → `@act-jirayut/dsai` (everything except ProductCard) and `src/product-card.ts` → `@act-jirayut/dsai/product-card`. ProductCard imports `next/image`, so it lives in its own entry and `next` is an optional peer; keep anything that needs Next.js out of the main entry. A new entry needs a Vite `lib.entry`, an `exports` subpath in `package.json`, and a line in `scripts/check-pack.mjs`.
- **Consumer requirement:** React 19 + Tailwind CSS v4, with `@import "tailwindcss"; @import "@act-jirayut/dsai/styles.css";` in their global CSS. Next.js only for the `product-card` entry; no `transpilePackages`.
- `pnpm dev` in `packages/ui` is `vite build --watch` without emptying `dist`, so a running docs server never sees it missing.

# Writing library code (`packages/ui`)

This code runs inside other people's apps, which changes several shadcn defaults:

- **Relative imports only.** Path aliases like `@/components/...` are not part of the published output, so keep source portable with relative imports. The `@/` alias exists only so the shadcn CLI can resolve paths; ESLint rejects it in code.
- **`"use client"`** at the top of every component that uses state, effects, refs or event handlers, so it works in consumers' React Server Components.
- **`next`, `react`, `react-dom` and `tailwindcss` are `peerDependencies`**, never `dependencies`.
- **Theme follows the `dark` class on `<html>`, never a theme library.** shadcn's Sonner reads `next-themes`; the Toaster instead watches the `dark` class and takes an optional `theme` prop, so consumers aren't forced onto `next-themes` (whose provider a second bundled copy wouldn't see anyway).
- **Re-export the API of stateful dependencies.** When a component listens to module-level state in a dependency (the Toaster and `sonner`'s `toast()`), export that API from `@act-jirayut/dsai` too; an app calling its own copy would write to a different store.
- **Public API is the package entries.** A component is public only once exported from `src/index.ts` (or `src/product-card.ts`), together with a `<Name>Props` type for each part that takes props; renaming or removing an export or prop is a breaking change (semver major). Ask the maintainer before changing exports.

# Stack specifics that differ from "usual" shadcn

- **Primitives are Base UI (`@base-ui/react`, shadcn style `base-maia`), not Radix.** Composition uses the `render` prop, not `asChild` — e.g. `<DialogTrigger render={<Button />}>Open</DialogTrigger>`. Check the Base UI API before assuming Radix props.
- **Tailwind CSS v4, CSS-first** — no `tailwind.config`. Tokens are CSS variables: raw OKLCH values in `:root` (light) and `.dark`, mapped to utilities in `@theme inline` (`--color-primary` → `bg-primary`). A new token goes in all three places.
- **Styles live in `packages/ui/src/styles/`:**
  - `theme.css` — the tokens (`:root`, `.dark`, `@theme inline`), the `dark` custom variant and base styles. Edit design decisions here. Ships as-is.
  - `shadcn.css` — vendored verbatim from `shadcn/dist/tailwind.css` (shadcn 4.23.0); leave it untouched (it is also prettier-ignored) and refresh it by re-copying. Ships as-is.
  - `index.css` — `tw-animate-css` + `shadcn.css` + `theme.css`, the base that `reference.css` builds on. The published entry `dist/styles.css` is generated by `vite.config.ts`, not this file; keep the two import lists in step.
  - `reference.css` — Tailwind + `index.css`, the target of every module's `@reference` and of the Prettier Tailwind plugin. It also redefines `dark` as `:is(:global(.dark) *)`, because inside CSS Modules a bare `.dark` gets hashed and `dark:` rules would never match. Never emitted.
- **Class merging** uses `cn`, variants use `cva`. Components put `data-slot="..."` on their root.

# Component structure

Each component has its own PascalCase folder, with styling kept out of the markup:

```
src/components/Button/
├── Button.tsx          # markup + props only, no Tailwind class strings
├── Button.module.css   # all styles, written with Tailwind @apply
├── Button.md           # usage doc for designers and AI agents; ships to npm
└── index.ts            # folder's public exports
```

A new component is public once re-exported from `src/index.ts`, documented in its `.md`, and shown in `apps/docs`. To add one, follow **Adding a component** below.

**Component docs (`<Component>.md`).** Read the component's `.md` before changing, reviewing or using it to build UI: it is the contract for when to use it, its props, variants and states, and the spec its stories follow. When a change alters any of these, update the `.md` in the same change. Every `.md` follows [`Badge.md`](packages/ui/src/components/Badge/Badge.md), written for designers and AI agents building UI:

1. **Purpose** — one line.
2. **Import and use** — the same install command and stylesheet setup in every doc, then the `import` from `@act-jirayut/dsai` and a minimal usage that follows the doc's own guidance. Type-check new snippets against `@act-jirayut/dsai` before committing.
3. **When to use** / **When not to use** — name the component to use instead where there is one.
4. **Props and variants** — only ones that exist in the `.tsx`, plus states (hover, focus, disabled, invalid…) and fixed sizes.
5. **Tokens used** — each `theme.css` variable the component's CSS Module reads, what it colors, and its light and dark values.
6. **Example** — one, copied from the component's stories.

Outside "Import and use", leave out implementation details: exports, data attributes, CSS utilities, file paths. Check every claim against the `.tsx`, `.module.css` and `theme.css`; write `TODO:` with the open question for anything the code doesn't settle (intended use, content limits, missing variants) rather than guessing.

- **`*.module.css`** starts with `@reference` to `src/styles/reference.css` (relative path) and wraps every rule in `@layer components { … }`. That layer is what lets a consumer's `className` utilities override the defaults; unlayered module rules would beat them.
- **Variants** map props to module classes: `cva(styles.root, { variants: { size: { sm: styles.sizeSm } } })` or a typed `Record`. Keep the shadcn prop names and values. Also set `data-variant` / `data-size` on the root as styling hooks.
- **`className`** is always merged last: `cn(styles.root, variantClass, className)`.
- **CSS Modules gotchas:** a plain class name in a selector gets hashed, so match utility classes with `:global(...)` (e.g. `.header:global(.border-b)`). `group/name` can't be applied; convert shadcn's `group-*` classes like this (see `Tabs.module.css`):
  - **State the element carries itself:** Base UI repeats attributes such as `data-orientation` on every part, so `group-data-vertical/tabs:` becomes plain `data-vertical:`. Check the part's `*DataAttributes.d.ts` in `@base-ui/react` first.
  - **State only an ancestor carries:** `group-data-[variant=line]/tabs-list:` becomes `in-data-[variant=line]:` (or `has-*` for descendants).
  - **Overrides that won through `group-*` specificity:** the converted selectors have lower specificity, so move them into a second rule for the same class placed after the first; later rules win inside `@layer components`. Inspect `dist/components.css` to confirm the order.
  - **Ancestor attributes other components also use** (`data-size`, `data-variant` values like `default`): scope the ancestor to its slot, e.g. `in-[[data-slot=switch][data-size=sm]]:`, or a Card's `data-size` higher up would match too (see `Switch.module.css`, `AlertDialog.module.css`).
  - **Selectors for components we don't have** (shadcn's `group-*/field`, `peer-*` against a native input): drop them and say why in a comment, rather than inventing the missing piece.
  - **Never write `*/` inside a CSS comment** (e.g. quoting `group-has-*/field`); it ends the comment and breaks the build.
- **`shadcn add`** (run `pnpm dlx shadcn@latest add <name>` inside `packages/ui`) writes a flat lowercase file with inline classes and alias imports. Move each new component into this structure, convert its classes to the module, and switch to relative imports before using it. Also check what the generated file gets wrong for a library: it may skip `"use client"` where a Base UI hook needs it (Badge's `useRender`), or swallow a prop Base UI needs (shadcn's Tabs set `data-orientation` but never passed `orientation` to the root). It may also write flat copies of components it depends on (e.g. `button.tsx` for AlertDialog): delete them and import our folder version (`../Button`). It installs npm dependencies with `pnpm`, so `pnpm` must be on `PATH`; review what it adds to `package.json` against the rules above.

# Adding a component

Every step lands in the same change; Badge and Tabs are worked examples.

1. **Generate:** `pnpm dlx shadcn@latest add <name>` inside `packages/ui`.
2. **Restructure** into `src/components/<Name>/` (`.tsx`, `.module.css`, `index.ts`), converting classes as described above, then delete the generated flat file. Keep shadcn's prop names, values and exports.
3. **Export** from `src/index.ts`, run `pnpm --filter @act-jirayut/dsai build`, and check `dist`: the JS keeps `"use client"` where needed and `dist/components.css` has the expected selectors.
4. **Stories:** `apps/storybook/stories/<Name>.stories.tsx` covering every prop value and state. For a compound component (Tabs, Dialog), drive Controls through a small demo wrapper in the stories file (see `TabsDemo`).
5. **Doc:** `<Name>.md` in the six-section format above. Take the Example from a story, and type-check the "Import and use" snippet against `@act-jirayut/dsai`.
6. **Guidelines page:** `apps/storybook/stories/<Name>.mdx` rendering the `.md` (copy `Tabs.mdx`).
7. **Show it:** a section in `apps/docs/src/app/page.tsx`, and a row in the components table of `packages/ui/README.md`.
8. **Verify:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm pack --dry-run` in `packages/ui`, then the stories, the Guidelines page and the docs app in light and dark.

# Storybook (`apps/storybook`)

Every component gets `stories/<Component>.stories.tsx` (title `Components/<Component>`, `tags: ["autodocs"]`) that covers each prop value and each state listed in the component's `.md`. Button is the reference.

Every component with a `.md` also gets `stories/<Component>.mdx`, a **Guidelines** page that renders that `.md` with `<Markdown>` from a `?raw` import (see `Badge.mdx`). The `.md` stays the single source: edit it, never copy its text into the MDX. A component without stories yet uses `<Meta title="Components/<Component>" name="Guidelines" />` instead of `<Meta of={…}>` (see `Dialog.mdx`).

**When a `<Component>.md` changes, update Storybook in the same change:**

- **New `.md`:** add `stories/<Component>.mdx` (copy `Badge.mdx`, or `Dialog.mdx` when there are no stories yet).
- **Renamed or moved `.md`:** fix the `?raw` import path in its `.mdx`.
- **Props, variants, sizes or states added or removed:** add or remove the matching stories and `argTypes` options in `<Component>.stories.tsx`, so the stories still cover exactly what the `.md` lists.
- **Example changed:** it must still be copied from a story; add or edit that story rather than letting the two drift.
- **Text-only edits** (wording, guidance, TODOs, token notes) need no Storybook change: the Guidelines page renders the `.md` directly. Check the page still renders.

- **Controls:** `ButtonPrimitive.Props & VariantProps<…>` can't be read by docgen from `dist`, so list union props in `argTypes` with explicit `options`. Compound components get a demo wrapper whose props are the controls (see `TabsDemo` in `Tabs.stories.tsx`).
- **Interaction states:** force `:hover`, `:focus-visible` and `:active` with `parameters: { pseudo: { hover: true } }` (storybook-addon-pseudo-states). A scripted `userEvent.tab()` focuses but never triggers `:focus-visible`, so use `play` only to assert behaviour (e.g. `toHaveFocus`).
- **Attribute states** (`disabled`, `aria-invalid`, `aria-expanded`): set them as props in a story.
- **Theme:** the toolbar's Theme switch toggles `.dark` on `<html>`; check stories in both.
- **Setup quirks:** `.storybook/preview.css` mirrors a consumer's global CSS and defines `--font-sans`/`--font-heading` (fonts load in `preview-head.html`). `next/image` is aliased to `.storybook/next-image.tsx`, a plain `<img>`, because it only runs inside Next.js. The a11y panel reports violations without failing (`a11y.test: "todo"`).
- **Overlays** (Dialog, AlertDialog, Popover, Toaster) render outside the story canvas, so `play` functions query them with `screen`, not `within(canvasElement)`; give overlay demos a `defaultOpen` arg so their layout can be reviewed without clicking. They mount at opacity 0 and animate in, so assert visibility with `await waitFor(() => expect(el).toBeVisible())`; a bare `expect(await screen.findBy…()).toBeVisible()` fails intermittently.

# Code style

Prettier (`.prettierrc`): no semicolons, double quotes, 2-space indent, trailing commas (es5), width 80, with `prettier-plugin-tailwindcss` sorting classes inside `cn(...)` and `cva(...)`. Run it on `*.module.css` files too.

Verify UI changes in the docs app in both light and dark themes.
