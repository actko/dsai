# Badge

## Purpose

A small, pill-shaped label that marks status, a count or a category next to other content.

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
import { Badge } from "@dsai/ui"

<Badge>New</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge render={<a href="/changelog" />}>What's new</Badge>
```

## When to use

- Show the state of an item: "Draft", "Published", "Overdue".
- Tag an item with a category or attribute: "Design", "Beta", "Pro".
- Show a short count next to a label: "3", "12 new".
- Link to a filtered view or related page, when the badge is rendered as a link.

## When not to use

- **For an action the user takes** (save, delete, open). Use Button.
- **For long text.** A badge stays on one line and never wraps; keep it to a word or two. TODO: confirm a maximum label length.
- **As the only signal of meaning.** Color alone isn't enough; the label text has to say what it means.
- **For success or warning states.** There are no success or warning variants yet. TODO: decide which variant (or new token) to use for these.
- **As a dismissible chip or filter toggle.** Badge has no remove button or selected state. TODO: confirm whether a separate Chip/Tag component is planned.

## Props and variants

| Prop      | Values                                                            | Default    | Notes                                                                                       |
| --------- | ----------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------- |
| `variant` | `default`, `secondary`, `destructive`, `outline`, `ghost`, `link` | `default`  | Visual emphasis; see below                                                                  |
| `render`  | an element, e.g. a link                                           | a `<span>` | Turns the badge into that element. Use a link to make it navigable; hover styles then apply |
| content   | text, optionally with a small icon before or after it             | —          | Icons are shown at 12px                                                                     |

There is **one size**: 20px tall, extra-small medium-weight text, fully rounded ends. There is no `size` prop.

| Variant       | Looks like                               | Use for                                                                      |
| ------------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| `default`     | Solid primary fill, light text           | The main status or a highlighted count                                       |
| `secondary`   | Soft neutral fill                        | Neutral categories and labels                                                |
| `destructive` | Soft red tint with red text              | Errors, failures, "Overdue"                                                  |
| `outline`     | Thin border, faint fill                  | Low-emphasis labels beside other content                                     |
| `ghost`       | No fill; muted background on hover       | TODO: confirm intended use                                                   |
| `link`        | Primary-colored text, underline on hover | TODO: confirm intended use; on a non-link badge it looks clickable but isn't |

States:

- **Hover:** only when the badge is rendered as a link (`default`, `secondary`, `destructive`, `outline`); `ghost` and `link` react to hover in any form.
- **Keyboard focus:** a soft ring in the `ring` color, only when the badge is focusable (a link or button).
- **Invalid** (`aria-invalid`): destructive-colored border.
- Light and dark themes are both supported.

## Tokens used

| Token                    | Used by                                                                | Light                       | Dark                        |
| ------------------------ | ---------------------------------------------------------------------- | --------------------------- | --------------------------- |
| `--primary`              | `default` fill (80% on hover as a link), `link` text                   | `oklch(0.218 0.008 223.9)`  | `oklch(0.925 0.005 214.3)`  |
| `--primary-foreground`   | `default` text                                                         | `oklch(0.987 0.002 197.1)`  | `oklch(0.218 0.008 223.9)`  |
| `--secondary`            | `secondary` fill (80% on hover as a link)                              | `oklch(0.963 0.002 197.1)`  | `oklch(0.275 0.011 216.9)`  |
| `--secondary-foreground` | `secondary` text                                                       | `oklch(0.218 0.008 223.9)`  | `oklch(0.987 0.002 197.1)`  |
| `--destructive`          | `destructive` text and tint (10% fill light, 20% dark), invalid border | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--foreground`           | `outline` text                                                         | `oklch(0.148 0.004 228.8)`  | `oklch(0.987 0.002 197.1)`  |
| `--border`               | `outline` border                                                       | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 10%)`        |
| `--input`                | `outline` fill (30%)                                                   | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 15%)`        |
| `--muted`                | `ghost` hover fill (50% in dark), `outline` hover as a link            | `oklch(0.963 0.002 197.1)`  | `oklch(0.275 0.011 216.9)`  |
| `--muted-foreground`     | `ghost` hover text, `outline` hover text as a link                     | `oklch(0.56 0.021 213.5)`   | `oklch(0.723 0.014 214.4)`  |
| `--ring`                 | Focus ring (50%)                                                       | `oklch(0.723 0.014 214.4)`  | `oklch(0.56 0.021 213.5)`   |
| `--radius`               | Corner radius (`radius × 2.6`, which makes a full pill)                | `0.875rem`                  | `0.875rem`                  |

Text uses the app's sans font (`--font-sans`).

## Example

From the `WithIcons` story: a neutral status badge with a leading icon.

```tsx
<Badge variant="secondary">
  <Check data-icon="inline-start" />
  Verified
</Badge>
```
