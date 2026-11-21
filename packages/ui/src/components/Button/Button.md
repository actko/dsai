# Button

Triggers an action or event: submitting a form, opening a dialog, confirming or cancelling.

Built on the [Base UI Button](https://base-ui.com/react/components/button) primitive and styled with a CSS Module. The markup only maps props to classes; every visual rule lives in `Button.module.css`.

```tsx
import { Button } from "@dsai/ui"

<Button>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

---

## File structure

```
packages/ui/src/components/Button/
├── Button.tsx          # markup + props → class mapping (no Tailwind strings)
├── Button.module.css   # all styles, written with Tailwind @apply
├── Button.md           # this document
└── index.ts            # public exports
```

| Export           | Kind      | Purpose                                                                                        |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `Button`         | component | The button itself                                                                              |
| `buttonVariants` | function  | Returns the class string for a variant/size, to style a non-button (e.g. a link) like a button |
| `ButtonProps`    | type      | Props of `Button`                                                                              |

---

## Anatomy

A button is a single element. Content is any mix of text and [Lucide](https://lucide.dev) icons.

```
┌──────────────────────────────┐
│  [icon]   Label   [icon]     │  ← root  (<button>, data-slot="button")
└──────────────────────────────┘
   ↑ inline-start     ↑ inline-end   (optional, marked with data-icon)
```

| Part          | Element                          | Notes                                                       |
| ------------- | -------------------------------- | ----------------------------------------------------------- |
| Root          | `<button>`                       | Pill shape, centred content, `gap` between children         |
| Label         | text node                        | `text-sm`, `font-medium`, never wraps (`whitespace-nowrap`) |
| Leading icon  | `<svg data-icon="inline-start">` | Reduces left padding so the icon sits optically centred     |
| Trailing icon | `<svg data-icon="inline-end">`   | Reduces right padding                                       |

Icons are `size-4` (16px) by default and `size-3` (12px) in `xs` / `icon-xs`. An icon that already has a `size-*` class keeps it.

---

## Props

`Button` accepts every prop of the Base UI Button (`disabled`, `type`, `onClick`, `render`, …) plus:

| Prop        | Type                                                                                 | Default     | Description                                                       |
| ----------- | ------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------- |
| `variant`   | `"default" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"`        | `"default"` | Visual emphasis                                                   |
| `size`      | `"xs" \| "sm" \| "default" \| "lg" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg"` | `"default"` | Height and padding; `icon*` sizes are square                      |
| `className` | `string`                                                                             | —           | Extra classes, applied last (see [Overrides](#overriding-styles)) |

### Data attributes

The root exposes its state as attributes, so it can be targeted from CSS or tests without relying on hashed class names:

| Attribute      | Value                 |
| -------------- | --------------------- |
| `data-slot`    | `"button"`            |
| `data-variant` | the current `variant` |
| `data-size`    | the current `size`    |

> When a Button is used as another component's `render` target (e.g. `<DialogTrigger render={<Button />}>`), that component's own `data-slot` wins. `data-variant` and `data-size` stay.

---

## Variants

Pick the variant by the action's importance: one `default` per area, `secondary` / `outline` / `ghost` for the rest.

| Variant       | Use for                               | Rest                                                   | Hover                                       | Other states                       |
| ------------- | ------------------------------------- | ------------------------------------------------------ | ------------------------------------------- | ---------------------------------- |
| `default`     | The primary action                    | bg `primary`, text `primary-foreground`                | bg `primary` at 80%                         | —                                  |
| `secondary`   | Secondary actions                     | bg `secondary`, text `secondary-foreground`            | `secondary` mixed with 5% `foreground`      | `aria-expanded` keeps rest colours |
| `outline`     | Neutral actions next to a primary     | border `border`, bg `input` at 30%                     | bg `input` at 50%, text `foreground`        | `aria-expanded`: bg `muted`        |
| `ghost`       | Low-emphasis actions, toolbars, icons | transparent                                            | bg `muted` (50% in dark), text `foreground` | `aria-expanded`: bg `muted`        |
| `destructive` | Delete, remove, irreversible actions  | bg `destructive` at 10% (20% dark), text `destructive` | bg `destructive` at 20% (30% dark)          | focus ring uses `destructive`      |
| `link`        | Inline, text-like actions             | text `primary`, no background                          | underline (offset 4px)                      | —                                  |

---

## Sizes

| Size      | Height        | Horizontal padding | Gap | Text      | Icon | With leading / trailing icon |
| --------- | ------------- | ------------------ | --- | --------- | ---- | ---------------------------- |
| `xs`      | 24px (`h-6`)  | 10px (`px-2.5`)    | 4px | `text-xs` | 12px | 8px on the icon side         |
| `sm`      | 32px (`h-8`)  | 12px (`px-3`)      | 4px | `text-sm` | 16px | 8px on the icon side         |
| `default` | 36px (`h-9`)  | 12px (`px-3`)      | 6px | `text-sm` | 16px | 10px on the icon side        |
| `lg`      | 40px (`h-10`) | 16px (`px-4`)      | 6px | `text-sm` | 16px | 12px on the icon side        |

Icon-only sizes are square and have no padding:

| Size      | Box              | Icon |
| --------- | ---------------- | ---- |
| `icon-xs` | 24px (`size-6`)  | 12px |
| `icon-sm` | 32px (`size-8`)  | 16px |
| `icon`    | 36px (`size-9`)  | 16px |
| `icon-lg` | 40px (`size-10`) | 16px |

---

## States

Shared by every variant (defined on `.root`):

| State            | Selector                        | Effect                                                               |
| ---------------- | ------------------------------- | -------------------------------------------------------------------- |
| Focus (keyboard) | `:focus-visible`                | Border `ring`, 3px ring in `ring` at 50%                             |
| Pressed          | `:active` (not `aria-haspopup`) | Moves down 1px                                                       |
| Disabled         | `:disabled`                     | 50% opacity, no pointer events                                       |
| Invalid          | `[aria-invalid="true"]`         | Border `destructive`, 3px ring in `destructive` at 20% (40% in dark) |
| Transition       | —                               | `transition-all` on colour, background, transform                    |

---

## Tokens

All colours are CSS variables in `packages/ui/src/styles/theme.css`, defined in OKLCH for light (`:root`) and dark (`.dark`). `@theme inline` exposes them as Tailwind utilities (`--primary` → `bg-primary`). Changing a value there restyles every Button.

### Colour tokens used by Button

| Token                    | Used by                                   | Light                       | Dark                        |
| ------------------------ | ----------------------------------------- | --------------------------- | --------------------------- |
| `--primary`              | `default` bg, `link` text                 | `oklch(0.218 0.008 223.9)`  | `oklch(0.925 0.005 214.3)`  |
| `--primary-foreground`   | `default` text                            | `oklch(0.987 0.002 197.1)`  | `oklch(0.218 0.008 223.9)`  |
| `--secondary`            | `secondary` bg                            | `oklch(0.963 0.002 197.1)`  | `oklch(0.275 0.011 216.9)`  |
| `--secondary-foreground` | `secondary` text                          | `oklch(0.218 0.008 223.9)`  | `oklch(0.987 0.002 197.1)`  |
| `--foreground`           | hover text; `secondary` hover mix         | `oklch(0.148 0.004 228.8)`  | `oklch(0.987 0.002 197.1)`  |
| `--muted`                | `ghost` hover, `outline`/`ghost` expanded | `oklch(0.963 0.002 197.1)`  | `oklch(0.275 0.011 216.9)`  |
| `--input`                | `outline` bg (30% / 50% hover)            | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 15%)`        |
| `--border`               | `outline` border                          | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 10%)`        |
| `--destructive`          | `destructive` bg/text, invalid state      | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--ring`                 | focus border and ring                     | `oklch(0.723 0.014 214.4)`  | `oklch(0.56 0.021 213.5)`   |

### Shape and type tokens

| Token          | Value                                 | Used for                                                  |
| -------------- | ------------------------------------- | --------------------------------------------------------- |
| `--radius`     | `0.875rem` (14px)                     | Base of the radius scale                                  |
| `--radius-4xl` | `calc(var(--radius) * 2.6)` ≈ 36px    | Button corners (`rounded-4xl`), a full pill at every size |
| `--font-sans`  | DM Sans (set in `src/app/layout.tsx`) | Label font                                                |
| `--spacing`    | `0.25rem` (Tailwind default)          | Heights, padding, gaps (`h-9` = 9 × 0.25rem)              |

---

## Usage

### With icons

Mark icons with `data-icon` so padding adjusts on that side.

```tsx
import { ArrowRightIcon, DownloadIcon } from "lucide-react"

<Button>
  <DownloadIcon data-icon="inline-start" />
  Download
</Button>

<Button variant="secondary">
  Continue
  <ArrowRightIcon data-icon="inline-end" />
</Button>
```

### Icon only

Always give an accessible name.

```tsx
<Button size="icon" variant="outline" aria-label="Settings">
  <SettingsIcon />
</Button>
```

### As another element

Use Base UI's `render` prop (not Radix's `asChild`).

```tsx
<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
```

To style a plain link like a button, use `buttonVariants`:

```tsx
import Link from "next/link"
import { buttonVariants } from "@dsai/ui"

;<Link href="/login" className={buttonVariants({ variant: "outline" })}>
  Sign in
</Link>
```

### Overriding styles

Every Button rule sits in `@layer components`; utilities in `className` sit in `@layer utilities`, so they always win. No `!important` needed.

```tsx
<Button className="w-full">Continue</Button>
<Button variant="ghost" className="text-destructive">Remove</Button>
```

---

## Accessibility

- Renders a native `<button>` with `type="button"`; set `type="submit"` inside forms.
- Icon-only buttons need `aria-label`.
- Focus is shown only for keyboard users (`:focus-visible`) with a 3px ring.
- `disabled` removes the button from pointer interaction; Base UI also supports `focusableWhenDisabled` to keep it in the tab order.
- Set `aria-invalid` to show the error style; set `aria-expanded` when the button controls a popup (handled automatically by triggers such as `DialogTrigger`).

---

## Customizing

| To change…                       | Edit                                                                                |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| A colour for all components      | The token in `packages/ui/src/styles/theme.css` (`:root` and `.dark`)               |
| Corner radius for all components | `--radius` in `packages/ui/src/styles/theme.css`                                    |
| How one variant or size looks    | Its class in `Button.module.css` (e.g. `.ghost`, `.sizeSm`)                         |
| Add a variant or size            | Add a class in `Button.module.css`, then map it in `buttonVariants` in `Button.tsx` |

New colour tokens must be added in three places in `theme.css`: `:root`, `.dark` and `@theme inline`.
