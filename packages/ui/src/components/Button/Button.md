# Button

## Purpose

Triggers an action the user takes on the current page: save, submit, confirm, cancel, open a dialog.

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

Then import the component:

```tsx
import { Button } from "@dsai/ui"

<Button>Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

## When to use

- Submit or reset a form.
- Confirm or cancel inside a dialog.
- Start an action on the current view: "Download", "Add item", "Delete".
- Open something on the same page, such as a dialog or menu.
- Icon-only actions in toolbars or tight spaces, with an accessible name.

## When not to use

- **To navigate to another page or URL.** Use a link, styled like a button if it needs the same weight. TODO: confirm the recommended link-as-button pattern for designers.
- **To show status or a category.** Use Badge.
- **For several equal actions side by side.** Give one action `default` and the rest `secondary`, `outline` or `ghost`, so the main action stands out.
- **For long labels.** The label never wraps; keep it to a short verb phrase. TODO: confirm a maximum label length.
- **To show that an action is in progress.** There is no loading state. TODO: decide whether a loading state is planned.

## Props and variants

| Prop       | Values                                                               | Default      | Notes                                                               |
| ---------- | -------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------- |
| `variant`  | `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`    | `default`    | Visual emphasis; see below                                          |
| `size`     | `xs`, `sm`, `default`, `lg`, `icon-xs`, `icon-sm`, `icon`, `icon-lg` | `default`    | Height and padding; `icon*` sizes are square, for icon-only buttons |
| `disabled` | `true` / `false`                                                     | `false`      | Faded and not clickable                                             |
| `render`   | an element, e.g. a dialog trigger                                    | a `<button>` | Renders the button as that element with the same look               |
| content    | text, optionally with an icon before or after it, or an icon alone   | —            | Icons are shown at 16px (12px at `xs` and `icon-xs`)                |

| Variant       | Looks like                               | Use for                               |
| ------------- | ---------------------------------------- | ------------------------------------- |
| `default`     | Solid primary fill, light text           | The primary action                    |
| `secondary`   | Soft neutral fill                        | Secondary actions                     |
| `outline`     | Thin border, faint fill                  | Neutral actions next to a primary     |
| `ghost`       | No fill until hovered                    | Low-emphasis actions, toolbars, icons |
| `destructive` | Soft red tint with red text              | Delete, remove, irreversible actions  |
| `link`        | Primary-colored text, underline on hover | Inline, text-like actions             |

| Size      | Height | Size      | Box   |
| --------- | ------ | --------- | ----- |
| `xs`      | 24px   | `icon-xs` | 24×24 |
| `sm`      | 32px   | `icon-sm` | 32×32 |
| `default` | 36px   | `icon`    | 36×36 |
| `lg`      | 40px   | `icon-lg` | 40×40 |

Every size is fully rounded (pill shape) and uses small medium-weight text (extra-small at `xs`).

States:

- **Hover:** fill deepens; `link` underlines.
- **Keyboard focus:** border and 3px soft ring in the `ring` color; `destructive` uses a red ring. Shown only for keyboard focus, not mouse clicks.
- **Pressed:** moves down 1px (not when the button opens a menu or popup).
- **Disabled:** 50% opacity, not clickable.
- **Invalid** (`aria-invalid`): red border and 3px red ring.
- **Expanded** (`aria-expanded`, e.g. while its menu is open): `outline` and `ghost` get the `muted` fill; `secondary` keeps its normal colors.
- Light and dark themes are both supported.

## Tokens used

| Token                    | Used by                                                                                          | Light                       | Dark                        |
| ------------------------ | ------------------------------------------------------------------------------------------------ | --------------------------- | --------------------------- |
| `--primary`              | `default` fill (80% on hover), `link` text                                                       | `oklch(0.218 0.008 223.9)`  | `oklch(0.925 0.005 214.3)`  |
| `--primary-foreground`   | `default` text                                                                                   | `oklch(0.987 0.002 197.1)`  | `oklch(0.218 0.008 223.9)`  |
| `--secondary`            | `secondary` fill; on hover mixed with 5% `--foreground`                                          | `oklch(0.963 0.002 197.1)`  | `oklch(0.275 0.011 216.9)`  |
| `--secondary-foreground` | `secondary` text                                                                                 | `oklch(0.218 0.008 223.9)`  | `oklch(0.987 0.002 197.1)`  |
| `--foreground`           | Hover text of `outline` and `ghost`; `secondary` hover mix                                       | `oklch(0.148 0.004 228.8)`  | `oklch(0.987 0.002 197.1)`  |
| `--border`               | `outline` border                                                                                 | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 10%)`        |
| `--input`                | `outline` fill (30%, 50% on hover)                                                               | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 15%)`        |
| `--muted`                | `ghost` hover fill (50% in dark), expanded `outline`/`ghost`                                     | `oklch(0.963 0.002 197.1)`  | `oklch(0.275 0.011 216.9)`  |
| `--destructive`          | `destructive` text and tint (10% fill light, 20% dark; deeper on hover), invalid border and ring | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--ring`                 | Focus border and ring (50%)                                                                      | `oklch(0.723 0.014 214.4)`  | `oklch(0.56 0.021 213.5)`   |
| `--radius`               | Corner radius (`radius × 2.6`, which makes a full pill)                                          | `0.875rem`                  | `0.875rem`                  |

Text uses the app's sans font (`--font-sans`).

## Example

From the `WithIcons` story: a primary action with a leading icon.

```tsx
<Button>
  <Download data-icon="inline-start" />
  Download
</Button>
```
