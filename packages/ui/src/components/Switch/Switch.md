# Switch

## Purpose

Turns a single setting on or off, with the change taking effect immediately.

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
import { Label, Switch } from "@act-jirayut/dsai"

;<Label>
  <Switch onCheckedChange={setAirplaneMode} />
  Airplane mode
</Label>
```

## When to use

- Settings that apply as soon as they're flipped: "Dark mode", "Notifications", "Airplane mode".

## When not to use

- **A choice that is only saved when a form is submitted.** Use Checkbox.
- **Choosing between two named options** that aren't on/off ("Monthly / Yearly"). TODO: no toggle group or segmented control exists yet.
- **Without a visible label.** Always pair it with a Label (or `aria-label` when the context is obvious).

## Props and variants

| Prop                                             | Values           | Default   | Notes                                      |
| ------------------------------------------------ | ---------------- | --------- | ------------------------------------------ |
| `size`                                           | `default`, `sm`  | `default` | `sm` for dense lists and tables            |
| `checked` / `defaultChecked` / `onCheckedChange` | `true` / `false` | `false`   | On/off state                               |
| `disabled`                                       | `true` / `false` | `false`   | Faded and can't be changed                 |
| `aria-invalid`                                   | `true` / `false` | —         | Shows the error style                      |
| `name`, `value`, `required`                      | form values      | —         | Submitted with a form when used inside one |

| Size      | Track       | Thumb |
| --------- | ----------- | ----- |
| `default` | 32 × 18.4px | 16px  |
| `sm`      | 24 × 14px   | 12px  |

The track is fully rounded and the thumb slides to the right when on. The clickable area extends beyond the track so it's easier to hit.

States:

- **Off:** muted track, light thumb.
- **On:** primary track; thumb slides right.
- **Keyboard focus:** border and 3px soft ring in the `ring` color.
- **Disabled:** 50% opacity, can't be changed.
- **Invalid** (`aria-invalid`): red border and 3px red ring.
- Light and dark themes are both supported.

## Tokens used

| Token                  | Used by                                                        | Light                       | Dark                        |
| ---------------------- | -------------------------------------------------------------- | --------------------------- | --------------------------- |
| `--input`              | Off track (80% in dark mode)                                   | `oklch(0.925 0.005 214.3)`  | `oklch(1 0 0 / 15%)`        |
| `--primary`            | On track                                                       | `oklch(0.218 0.008 223.9)`  | `oklch(0.925 0.005 214.3)`  |
| `--background`         | Thumb (light mode)                                             | `oklch(1 0 0)`              | `oklch(0.148 0.004 228.8)`  |
| `--primary-foreground` | Thumb when on (dark mode)                                      | `oklch(0.987 0.002 197.1)`  | `oklch(0.218 0.008 223.9)`  |
| `--foreground`         | Thumb when off (dark mode)                                     | `oklch(0.148 0.004 228.8)`  | `oklch(0.987 0.002 197.1)`  |
| `--ring`               | Focus border and ring (50%)                                    | `oklch(0.723 0.014 214.4)`  | `oklch(0.56 0.021 213.5)`   |
| `--destructive`        | Invalid border and ring (20%, 40% in dark; border 50% in dark) | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |

## Example

From the `WithLabel` story:

```tsx
<Label>
  <Switch />
  Airplane mode
</Label>
```
