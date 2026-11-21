# DSAI

A design system built on [shadcn/ui](https://ui.shadcn.com) and [Base UI](https://base-ui.com), styled with CSS Modules and Tailwind CSS v4. Published to npm as [`@dsai/ui`](packages/ui).

## Repository layout

| Path                         | What it is                                                              |
| ---------------------------- | ----------------------------------------------------------------------- |
| [`packages/ui`](packages/ui) | `@dsai/ui`, the published component library (built to `dist` with Vite) |
| [`apps/docs`](apps/docs)     | Next.js playground that uses the built library like any other app would |

## Development

Requires Node.js and [pnpm](https://pnpm.io) 12.

```bash
pnpm install
pnpm dev         # builds @dsai/ui, watches it, and runs the docs app on http://localhost:3000
pnpm lint
pnpm typecheck
pnpm build
pnpm format
```

Turborepo runs each task across the workspace and always builds `@dsai/ui` first.

To see exactly what would be published:

```bash
cd packages/ui && pnpm pack --dry-run
```

Contributor and agent conventions (component structure, styling rules, build details) are in [AGENTS.md](AGENTS.md).

## License

[MIT](LICENSE)
