# Toaster

## Purpose

Shows brief, non-blocking messages ("toasts") about something that just happened, which disappear on their own.

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

Then render the Toaster **once**, near the root of your app, and call `toast()` from anywhere. Import both from `@dsai/ui`, not from `sonner` directly, so they share one message queue:

```tsx
import { Button, Toaster, toast } from "@dsai/ui"

// once, in your root layout
<Toaster />

// anywhere
<Button onClick={() => toast.success("Project published")}>Publish</Button>
```

## When to use

- Confirming an action that succeeded: "Draft saved", "Project published".
- Brief, non-critical status or errors the user can ignore or retry later: "Couldn't upload 2 files".
- Offering Undo after an action that can be reversed (a toast with an action button).
- Showing progress of a background task (loading, then success or error).

## When not to use

- **Errors the user must fix to continue,** or anything about a specific field. Show it inline, next to the problem.
- **Confirmations before a destructive action.** Use AlertDialog.
- **Critical information the user must not miss.** Toasts vanish after a few seconds; use a Dialog or an inline message.
- **Long messages or several actions.** Keep a toast to one short line, an optional description and at most one action.

## Props and variants

**Toaster** (rendered once):

| Prop            | Values                                                                                | Default                  | Notes                                                              |
| --------------- | ------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------ |
| `position`      | `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` | `bottom-right`           | Where toasts stack                                                 |
| `theme`         | `light`, `dark`, `system`                                                             | follows the `dark` class | Override only if your app doesn't use the `dark` class on `<html>` |
| `richColors`    | `true` / `false`                                                                      | `false`                  | Tinted backgrounds for success, info, warning and error            |
| `closeButton`   | `true` / `false`                                                                      | `false`                  | Shows a × on every toast                                           |
| `expand`        | `true` / `false`                                                                      | `false`                  | Shows stacked toasts expanded instead of collapsed                 |
| `visibleToasts` | a number                                                                              | `3`                      | How many show at once                                              |
| `duration`      | milliseconds                                                                          | `4000`                   | How long each toast stays                                          |

**`toast()` kinds:**

| Call                                                               | Shows                                                   |
| ------------------------------------------------------------------ | ------------------------------------------------------- |
| `toast("…")`                                                       | A plain message                                         |
| `toast.success("…")`, `toast.info`, `toast.warning`, `toast.error` | The message with a matching 16px icon                   |
| `toast.loading("…")`                                               | A spinning icon, until updated                          |
| `toast.promise(promise, { loading, success, error })`              | Loading, then success or error when the promise settles |

Options on any toast: `description` (a second, smaller line), `action` (one button, e.g. Undo), `duration`.

- Toasts don't take focus or block the page; hovering pauses the timer.
- Light and dark themes are both supported.

## Tokens used

| Token                  | Used by                  | Light                      | Dark                       |
| ---------------------- | ------------------------ | -------------------------- | -------------------------- |
| `--popover`            | Toast background         | `oklch(1 0 0)`             | `oklch(0.218 0.008 223.9)` |
| `--popover-foreground` | Toast text               | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--border`             | Toast border             | `oklch(0.925 0.005 214.3)` | `oklch(1 0 0 / 10%)`       |
| `--radius`             | Corners (`radius` as is) | `0.875rem`                 | `0.875rem`                 |

- **Rich colors:** with `richColors`, success/info/warning/error backgrounds come from the toast library's own palette, not these tokens. TODO: decide whether rich colors should map to design tokens.

## Example

From the `ToastDemo` used by every story: the success toast with a description.

```tsx
<Button
  variant="outline"
  onClick={() =>
    toast.success("Project published", {
      description: "It's now visible to your team.",
    })
  }
>
  Success
</Button>
<Toaster />
```
