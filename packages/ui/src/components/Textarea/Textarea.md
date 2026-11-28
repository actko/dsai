# Textarea

## Purpose

A multi-line text field for longer free-form answers, such as comments, feedback or descriptions.

## Import and use

Requires React 19 and Tailwind CSS v4. Install the package (TODO: `@act-jirayut/dsai` is not published to npm yet; inside this repo it is a workspace dependency):

```bash
pnpm add @act-jirayut/dsai
```

Once per app, import the stylesheet right after Tailwind in your global CSS:

```css
@import "tailwindcss";
@import "@act-jirayut/dsai/styles.css";
```

Then import the component, and give it a visible Label:

```tsx
import { Label, Textarea } from "@act-jirayut/dsai"

<Label htmlFor="feedback">Feedback</Label>
<Textarea id="feedback" placeholder="Tell us what happened…" />
```

## When to use

- Answers that may run to several sentences or lines.
- Notes, comments, descriptions and messages.

## When not to use

- **Short, single-line answers** (names, emails, numbers). Use Input.
- **Formatted text** (bold, lists, links). TODO: no rich-text editor exists.

## Props and variants

| Prop                                  | Values           | Default | Notes                                                                 |
| ------------------------------------- | ---------------- | ------- | --------------------------------------------------------------------- |
| `placeholder`                         | text             | —       | A hint only; never a replacement for a Label                          |
| `disabled`                            | `true` / `false` | `false` | Faded and not editable                                                |
| `aria-invalid`                        | `true` / `false` | —       | Shows the error style; pair it with a message that explains the error |
| `rows`                                | a number         | —       | Starting height in lines                                              |
| `value` / `defaultValue` / `onChange` | text             | —       | Standard value handling                                               |

All other native textarea attributes (`name`, `required`, `maxLength`…) work as usual.

There is **one size and no variants**: full width of its container, at least 64px tall, rounded corners, 12px padding. It **grows with its content** and has no drag-to-resize handle. TODO: auto-growing relies on the browser's `field-sizing` support; confirm the intended behavior in browsers without it, where the field keeps a fixed height and scrolls. Text is 16px on small screens and 14px from the `md` breakpoint up.

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
| `--radius`           | Corners (`radius × 1.4`)                                       | `0.875rem`                  | `0.875rem`                  |

Text uses the app's sans font (`--font-sans`).

## Example

From the `WithLabel` story (with its default args):

```tsx
<div className="grid gap-2">
  <Label htmlFor="feedback">Feedback</Label>
  <Textarea id="feedback" placeholder="Tell us what happened…" />
</div>
```
