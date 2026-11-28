# Dialog

## Purpose

A modal window over the page that holds a short, focused task or decision the user must finish or cancel before returning to the page.

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

Then import the parts you need and compose them. The trigger and every action are Buttons:

```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@act-jirayut/dsai"

;<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Rename</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Rename file</DialogTitle>
      <DialogDescription>Choose a new name for "Q3 report".</DialogDescription>
    </DialogHeader>
    {/* form fields */}
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
      <DialogClose render={<Button />}>Rename</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## When to use

- A short task the user started that needs a little input to finish: rename an item, edit a few fields, pick an option.
- A decision that must be made before continuing, where the user doesn't need the page underneath to decide.
- Critical information the user must acknowledge, such as a session about to expire.
- A confirmation before a serious or irreversible action, naming the item and the consequence ("Delete 'Q3 report'? This can't be undone."). TODO: there is no alert-dialog variant yet; see "When not to use".

## When not to use

- **Non-critical messages or feedback** ("Saved", tips, minor errors). Use an inline message or a toast. TODO: no Toast component exists yet.
- **Errors that belong to a field or section.** Show them inline, next to the problem.
- **Long, complex or multi-step work** (large forms, tables, wizards with many steps). Use a full page.
- **Decisions that need the content the dialog would cover.** Keep the choice on the page.
- **Small contextual details or controls** anchored to an element. Use a popover. TODO: no Popover component exists yet.
- **Confirming common actions that can be undone.** Offer undo instead.
- **Opening a dialog from another dialog.** Close the first, or move the flow to a page.
- **Destructive confirmations that must not be dismissed by accident.** These call for an alert dialog. TODO: `@act-jirayut/dsai` has no AlertDialog yet; until it exists, turn off outside-click dismissal on Dialog for these (see below).

## Props and variants

A dialog is built from parts:

| Part        | Role                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------- |
| Trigger     | The control that opens the dialog, usually a Button                                       |
| Content     | The dialog window, with the dimmed backdrop behind it                                     |
| Header      | Groups the title and description                                                          |
| Title       | Required. States the situation or task in a few words; screen readers announce it         |
| Description | Optional supporting sentence under the title                                              |
| Footer      | Holds the actions                                                                         |
| Close       | Wraps any button so it closes the dialog (Cancel, or an action that completes and closes) |

Props:

| On      | Prop                      | Values                          | Default                 | Notes                                                                                                                                                                          |
| ------- | ------------------------- | ------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dialog  | `open` / `defaultOpen`    | `true` / `false`                | closed                  | Open state, when the app controls it                                                                                                                                           |
| Dialog  | `modal`                   | `true`, `false`, `"trap-focus"` | `true`                  | `true`: page behind is locked (no scroll, no clicks) and focus stays in the dialog. `"trap-focus"`: focus stays in, but the page can scroll and be clicked. `false`: not modal |
| Dialog  | `disablePointerDismissal` | `true` / `false`                | `false`                 | `true` stops a click outside from closing it. Use for forms with unsaved input and destructive confirmations                                                                   |
| Content | `showCloseButton`         | `true` / `false`                | `true`                  | The "×" in the top-right corner. Keep it on unless the footer has a visible Cancel                                                                                             |
| Content | `initialFocus`            | an element                      | first focusable element | Where focus lands on open. For destructive confirmations, point it at Cancel                                                                                                   |
| Content | `finalFocus`              | an element                      | the trigger             | Where focus returns on close                                                                                                                                                   |
| Footer  | `showCloseButton`         | `true` / `false`                | `false`                 | Adds an outline "Close" button after your actions. TODO: it lands on the right, where the primary action should be; add your own Cancel first instead                          |

There is **one size and no variants**. The window is centered, up to 448px wide on screens 640px and wider, and full width minus a 16px margin on each side below that. Corners are fully rounded and content has 24px padding with 24px between sections.

- **Footer layout:** actions sit in a row aligned right on wider screens. On narrow screens they stack, with the last action on top.
- **Button order:** put Cancel first and the primary action last, so the primary is on the right and on top when stacked. Label actions with verbs ("Save changes", "Delete"), not "OK" or "Yes".
- **Ways to close:** Escape, the "×" button, any Close-wrapped button, or clicking the backdrop (unless `disablePointerDismissal` is on).
- **Focus:** stays inside while open and returns to the trigger on close.
- **Motion:** the backdrop fades and the window fades and scales in and out (about 100ms).
- **Long content:** TODO: the window has no maximum height or internal scrolling, so long content can run off-screen. Keep content short until this is decided.
- **Mobile:** TODO: there is no bottom-sheet or full-screen variant for small screens.

## Tokens used

| Token                  | Used by                                                     | Light                      | Dark                       |
| ---------------------- | ----------------------------------------------------------- | -------------------------- | -------------------------- |
| `--popover`            | Window background                                           | `oklch(1 0 0)`             | `oklch(0.218 0.008 223.9)` |
| `--popover-foreground` | Window text                                                 | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--foreground`         | Thin outline around the window (5%), description link hover | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--muted-foreground`   | Description text                                            | `oklch(0.56 0.021 213.5)`  | `oklch(0.723 0.014 214.4)` |
| `--radius`             | Window corners (`radius × 2.6`)                             | `0.875rem`                 | `0.875rem`                 |
| `--font-heading`       | Title font                                                  | set by the app             | set by the app             |

- **Backdrop:** black at 80% with a light blur. It is fixed, not a token. TODO: decide whether the backdrop color should become a token.
- **Close buttons:** the "×" button (ghost, icon-sm) and the footer Close button (outline) use the Button tokens; see Button.md.

## Example

TODO: there are no Dialog stories in Storybook yet. This example is copied from the Dialog demo in the docs app until stories exist. Note that its footer puts Close after Save, which is the order the guidance above advises against.

```tsx
<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Open dialog
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <p className="text-muted-foreground">
      Dialog body content goes here — forms, lists or any other markup.
    </p>
    <DialogFooter showCloseButton>
      <DialogClose render={<Button />}>Save changes</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
