# Popover

## Purpose

A small floating panel anchored to a trigger, for extra details or a few quick controls without leaving the page.

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

Then import the parts and compose them; the trigger is usually a Button:

```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@act-jirayut/dsai"

;<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Dimensions
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the size of the layer.</PopoverDescription>
    </PopoverHeader>
    {/* a few fields */}
  </PopoverContent>
</Popover>
```

## When to use

- A few related controls tied to one element: a filter, a size picker, quick settings.
- Extra details about something on the page that people open on purpose.

## When not to use

- **A task that needs focus or a decision before continuing.** Use Dialog, or AlertDialog for confirmations.
- **Short hints on hover** (what an icon button does). TODO: no Tooltip component exists yet.
- **A list of actions or menu items.** TODO: no Dropdown menu component exists yet.
- **Long content or forms.** Keep it to a few controls; use Dialog or a page.
- **Feedback about something that just happened.** Use a toast (Toaster).

## Props and variants

A popover is built from parts:

| Part                       | Role                                                   |
| -------------------------- | ------------------------------------------------------ |
| Popover                    | Wraps everything; holds the open state                 |
| Trigger                    | The control that opens and closes it, usually a Button |
| Content                    | The floating panel                                     |
| Header, Title, Description | Optional heading block at the top of the panel         |

| On      | Prop                                    | Values                           | Default  | Notes                                                              |
| ------- | --------------------------------------- | -------------------------------- | -------- | ------------------------------------------------------------------ |
| Popover | `open` / `defaultOpen` / `onOpenChange` | `true` / `false`                 | closed   | Open state, when the app controls it                               |
| Popover | `modal`                                 | `true`, `false`, `"trap-focus"`  | `false`  | `true` blocks the page behind; `false` lets people keep using it   |
| Content | `side`                                  | `top`, `right`, `bottom`, `left` | `bottom` | Which side of the trigger it appears on; flips if there isn't room |
| Content | `align`                                 | `start`, `center`, `end`         | `center` | Alignment along that side                                          |
| Content | `sideOffset`                            | a number (px)                    | `4`      | Gap between trigger and panel                                      |
| Content | `alignOffset`                           | a number (px)                    | `0`      | Shift along the aligned edge                                       |

There is **one size and no variants**: 288px wide, 16px padding, 16px between sections, rounded corners, a large soft shadow and a faint outline. It fades and zooms in, sliding from the side facing its trigger.

- **Ways to close:** clicking the trigger again, clicking outside, or Escape.
- Light and dark themes are both supported.

## Tokens used

| Token                  | Used by                             | Light                      | Dark                       |
| ---------------------- | ----------------------------------- | -------------------------- | -------------------------- |
| `--popover`            | Panel background                    | `oklch(1 0 0)`             | `oklch(0.218 0.008 223.9)` |
| `--popover-foreground` | Panel text                          | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--foreground`         | Faint outline around the panel (5%) | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--muted-foreground`   | Description text                    | `oklch(0.56 0.021 213.5)`  | `oklch(0.723 0.014 214.4)` |
| `--radius`             | Corners (`radius × 1.8`)            | `0.875rem`                 | `0.875rem`                 |

Title and description use the app's sans font (`--font-sans`).

## Example

From the `PopoverDemo` used by every story (with its default args):

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Dimensions
  </PopoverTrigger>
  <PopoverContent side="bottom" align="center" sideOffset={4}>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the size of the layer.</PopoverDescription>
    </PopoverHeader>
    <div className="grid grid-cols-2 gap-2">
      <Label htmlFor="width">Width</Label>
      <Input id="width" defaultValue="100%" />
      <Label htmlFor="height">Height</Label>
      <Input id="height" defaultValue="25px" />
    </div>
  </PopoverContent>
</Popover>
```
