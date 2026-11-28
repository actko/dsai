# Input

## Purpose

A single-line text field for short answers: a name, an email, a search term, a number.

## Import and use

Requires React 19 and Tailwind CSS v4. Install the package (TODO: `@dsai/ui` is not published to npm yet; inside this repo it is a workspace dependency):

```bash
pnpm add @dsai/ui
```

Once per app, import the stylesheet right after Tailwind in your global CSS:

```css
@import "tailwindcss";
@import "@dsai/ui/styles.css";
```

Then import the component, and give it a visible Label:

```tsx
import { Input, Label } from "@dsai/ui"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />
```

## When to use

- Short, free-form answers that fit on one line.
- Typed values such as email, password, number, search or a file to upload (set `type`).

## When not to use

- **Long or multi-line text** (comments, descriptions). Use Textarea.
- **Choosing from a fixed set of options.** Use Checkbox for yes/no or several options. TODO: no Select, Radio group or Combobox component exists yet.
- **On/off settings that apply immediately.** Use Switch.
- **Dates and times.** TODO: no date picker exists yet; confirm whether `type="date"` is acceptable meanwhile.

## Props and variants

| Prop                                  | Values                                                                        | Default | Notes                                                                 |
| ------------------------------------- | ----------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------- |
| `type`                                | any HTML input type: `text`, `email`, `password`, `number`, `search`, `file`… | `text`  | Sets the keyboard and validation the browser uses                     |
| `placeholder`                         | text                                                                          | —       | A hint only; never a replacement for a Label                          |
| `disabled`                            | `true` / `false`                                                              | `false` | Faded and not editable                                                |
| `aria-invalid`                        | `true` / `false`                                                              | —       | Shows the error style; pair it with a message that explains the error |
| `value` / `defaultValue` / `onChange` | text                                                                          | —       | Standard input value handling                                         |

All other native input attributes (`name`, `required`, `autoComplete`, `min`, `max`…) work as usual.

There is **one size and no variants**: 36px tall, full width of its container, fully rounded ends, 12px side padding. Text is 16px on small screens (stops mobile browsers zooming in) and 14px from the `md` breakpoint up. With `type="file"` the file button is styled to match.

States:

- **Placeholder:** muted text.
- **Keyboard focus:** border and 3px soft ring in the `ring` color.
- **Disabled:** 50% opacity, not editable.
- **Invalid** (`aria-invalid`): red border and 3px red ring (softer in dark mode).
- Light and dark themes are both supported.

## Tokens used

| Token                | Used by                                                        | Light                       | Dark                        |
| -------------------- | -------------------------------------------------------------- | --------------------------- | --------------------------- |
| `--input`            | Border; background fill (30%)                                  | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 15%)`        |
| `--muted-foreground` | Placeholder text                                               | `oklch(0.56 0.021 213.5)`   | `oklch(0.723 0.014 214.4)`  |
| `--ring`             | Focus border and ring (50%)                                    | `oklch(0.723 0.014 214.4)`  | `oklch(0.56 0.021 213.5)`   |
| `--destructive`      | Invalid border and ring (20%, 40% in dark; border 50% in dark) | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--foreground`       | File-button text                                               | `oklch(0.148 0.004 228.8)`  | `oklch(0.987 0.002 197.1)`  |
| `--radius`           | Corners (`radius × 2.6`, a full pill)                          | `0.875rem`                  | `0.875rem`                  |

Text uses the app's sans font (`--font-sans`).

## Example

From the `WithLabel` story (with its default args):

```tsx
<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="you@example.com" type="email" />
</div>
```
