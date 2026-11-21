# Button

Triggers an action: submitting a form, opening a dialog, confirming or cancelling. Built on the [Base UI Button](https://base-ui.com/react/components/button), so it renders a real `<button>` with keyboard and focus handling included.

```tsx
import { Button } from "@dsai/ui"

<Button>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

Requires the `@dsai/ui` stylesheet in your global CSS (see the [package README](../../../README.md#set-up-styles)):

```css
@import "tailwindcss";
@import "@dsai/ui/styles.css";
```

## Exports

| Export           | Kind      | Use                                                           |
| ---------------- | --------- | ------------------------------------------------------------- |
| `Button`         | component | The button                                                    |
| `buttonVariants` | function  | Class string for a variant and size, to style another element |
| `ButtonProps`    | type      | Props of `Button`                                             |

## Props

| Prop        | Type                                                                                 | Default     | Description                                  |
| ----------- | ------------------------------------------------------------------------------------ | ----------- | -------------------------------------------- |
| `variant`   | `"default" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"`        | `"default"` | Visual emphasis                              |
| `size`      | `"xs" \| "sm" \| "default" \| "lg" \| "icon-xs" \| "icon-sm" \| "icon" \| "icon-lg"` | `"default"` | Height and padding; `icon*` sizes are square |
| `className` | `string`                                                                             | —           | Extra classes, applied after the defaults    |
| `render`    | `ReactElement \| function`                                                           | —           | Render as another element (Base UI)          |

All other [Base UI Button props](https://base-ui.com/react/components/button#api-reference) and native `<button>` attributes (`type`, `disabled`, `onClick`, `aria-*`, …) pass through.

The root element also gets `data-slot="button"`, `data-variant` and `data-size`, which you can target in your own CSS.

## Variants

| Variant       | Use for                                  |
| ------------- | ---------------------------------------- |
| `default`     | The one primary action in a view         |
| `secondary`   | Supporting actions                       |
| `outline`     | Neutral actions next to a primary button |
| `ghost`       | Low-emphasis actions, toolbars           |
| `destructive` | Delete, remove, irreversible actions     |
| `link`        | Text-like actions inside content         |

## Sizes

| Size      | Height | Use                       |
| --------- | ------ | ------------------------- |
| `xs`      | 24px   | Dense tables, tags        |
| `sm`      | 32px   | Toolbars, secondary forms |
| `default` | 36px   | Most buttons              |
| `lg`      | 40px   | Prominent calls to action |
| `icon-xs` | 24×24  | Icon-only, dense          |
| `icon-sm` | 32×32  | Icon-only, compact        |
| `icon`    | 36×36  | Icon-only                 |
| `icon-lg` | 40×40  | Icon-only, prominent      |

Every size is fully rounded (pill shape). Icons are 16px, or 12px at `xs` and `icon-xs`.

## States

| State    | Trigger             | Appearance                                                                            |
| -------- | ------------------- | ------------------------------------------------------------------------------------- |
| Hover    | pointer over        | Background deepens; `link` underlines                                                 |
| Focus    | keyboard focus only | 3px ring in the `ring` color                                                          |
| Pressed  | `:active`           | Moves down 1px (not when `aria-haspopup` is set)                                      |
| Disabled | `disabled`          | 50% opacity, no pointer events                                                        |
| Invalid  | `aria-invalid`      | Destructive border and ring                                                           |
| Expanded | `aria-expanded`     | `outline` and `ghost` get the `muted` background; `secondary` keeps its normal colors |

## Examples

### With icons

Add `data-icon="inline-start"` or `"inline-end"` to the icon so the padding on that side tightens.

```tsx
import { ArrowRight, Download } from "lucide-react"

<Button>
  <Download data-icon="inline-start" />
  Download
</Button>

<Button variant="outline">
  Continue
  <ArrowRight data-icon="inline-end" />
</Button>
```

### Icon only

Use an `icon*` size and give the button an accessible name.

```tsx
<Button size="icon" variant="ghost" aria-label="Settings">
  <Settings />
</Button>
```

### In a form

Buttons default to `type="button"`. Set `type="submit"` to submit a form.

```tsx
<form onSubmit={save}>
  <Button type="submit">Save</Button>
</form>
```

### As a dialog trigger

Base UI composes with the `render` prop, not `asChild`.

```tsx
<DialogTrigger render={<Button variant="outline" />}>
  Edit profile
</DialogTrigger>
```

### As a link

Use `buttonVariants` to give a link the button look while keeping link semantics.

```tsx
import { buttonVariants } from "@dsai/ui"

;<a href="/pricing" className={buttonVariants({ variant: "outline" })}>
  See pricing
</a>
```

The same works with a router link, such as Next.js `Link`.

## Customizing

**One button:** pass Tailwind utilities in `className`. Button's own styles sit in `@layer components`, so your utilities always win without `!important`.

```tsx
<Button className="w-full">Continue</Button>
<Button variant="ghost" className="text-destructive">Remove</Button>
```

**Every button:** override the theme variables after importing the stylesheet. Light values go in `:root`, dark values in `.dark`.

```css
:root {
  --primary: oklch(0.55 0.2 260);
  --primary-foreground: oklch(0.98 0 0);
  --radius: 0.5rem;
}

.dark {
  --primary: oklch(0.75 0.15 260);
}
```

| Variable                                | Affects                                    |
| --------------------------------------- | ------------------------------------------ |
| `--primary`, `--primary-foreground`     | `default` background and text, `link` text |
| `--secondary`, `--secondary-foreground` | `secondary`                                |
| `--input`, `--border`                   | `outline`                                  |
| `--muted`                               | `ghost` hover, expanded `outline`/`ghost`  |
| `--destructive`                         | `destructive`, invalid state               |
| `--ring`                                | Focus ring                                 |
| `--radius`                              | Corner radius (Button uses `radius × 2.6`) |
| `--font-sans`                           | Label font                                 |

## Accessibility

- Renders a native `<button>`, so Enter and Space activate it and it is in the tab order.
- Icon-only buttons need `aria-label`.
- The focus ring appears only for keyboard focus (`:focus-visible`).
- `disabled` takes the button out of the tab order. To keep it focusable, for example to show a tooltip explaining why, use Base UI's `focusableWhenDisabled`.
- Use `Button` for actions. For navigation, use a link (`<a>` or a router link) styled with `buttonVariants`.
- Dark mode follows a `dark` class on an ancestor, such as `<html class="dark">`.
