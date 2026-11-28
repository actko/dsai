# Checkbox

## Purpose

Lets someone turn a single option on or off, or pick any number of options from a list.

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

Then import the component and wrap it in a Label:

```tsx
import { Checkbox, Label } from "@act-jirayut/dsai"

;<Label>
  <Checkbox name="terms" />
  Accept the terms and conditions
</Label>
```

## When to use

- A single yes/no choice that is submitted with a form ("Remember me", "Accept the terms").
- Picking any number of options from a short list.

## When not to use

- **A setting that takes effect immediately.** Use Switch.
- **Picking exactly one option from a list.** TODO: no Radio group component exists yet.
- **Long lists of options.** TODO: no multi-select component exists yet.
- **Without a visible label.** Always pair it with a Label (or `aria-label` when the context is obvious, such as a table row).

## Props and variants

| Prop                                             | Values           | Default | Notes                                                                                                                                     |
| ------------------------------------------------ | ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `checked` / `defaultChecked` / `onCheckedChange` | `true` / `false` | `false` | Checked state                                                                                                                             |
| `disabled`                                       | `true` / `false` | `false` | Faded and can't be changed                                                                                                                |
| `aria-invalid`                                   | `true` / `false` | —       | Shows the error style                                                                                                                     |
| `name`, `value`, `required`                      | form values      | —       | Submitted with a form like a native checkbox                                                                                              |
| `indeterminate`                                  | `true` / `false` | `false` | TODO: supported by the underlying primitive, but the box still shows a check mark rather than a dash; don't use until a dash style exists |

There is **one size and no variants**: a 16px box with slightly rounded corners and a 14px check mark. The clickable area extends beyond the box (about 40×32px) so it's easier to hit.

States:

- **Unchecked:** border only (a faint fill in dark mode).
- **Checked:** primary fill with a light check mark.
- **Keyboard focus:** border and 3px soft ring in the `ring` color.
- **Disabled:** 50% opacity, can't be changed.
- **Invalid** (`aria-invalid`): red border and 3px red ring; when also checked, the border stays primary.
- Light and dark themes are both supported.

## Tokens used

| Token                  | Used by                                                        | Light                       | Dark                        |
| ---------------------- | -------------------------------------------------------------- | --------------------------- | --------------------------- |
| `--input`              | Unchecked border; dark-mode fill (30%)                         | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 15%)`        |
| `--primary`            | Checked fill and border                                        | `oklch(0.218 0.008 223.9)`  | `oklch(0.925 0.005 214.3)`  |
| `--primary-foreground` | Check mark                                                     | `oklch(0.987 0.002 197.1)`  | `oklch(0.218 0.008 223.9)`  |
| `--ring`               | Focus border and ring (50%)                                    | `oklch(0.723 0.014 214.4)`  | `oklch(0.56 0.021 213.5)`   |
| `--destructive`        | Invalid border and ring (20%, 40% in dark; border 50% in dark) | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |

## Example

From the `WithLabel` story:

```tsx
<Label>
  <Checkbox />
  Accept the terms and conditions
</Label>
```
