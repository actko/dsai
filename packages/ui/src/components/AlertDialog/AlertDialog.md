# AlertDialog

## Purpose

An interrupting window that asks the user to confirm or cancel a serious action, usually one that can't be undone.

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

Then import the parts and compose them. Put Cancel first and the action last, and label the action with what it does:

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@dsai/ui"

;<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    Delete project
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete "Website redesign"?</AlertDialogTitle>
      <AlertDialogDescription>This can't be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive" onClick={deleteProject}>
        Delete project
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## When to use

- Confirming a destructive or irreversible action: delete, remove access, discard unsaved changes.
- An urgent message that must be acknowledged before continuing.
- Name the item and the consequence in the title or description ("Delete 'Website redesign'? This deletes 24 files.").

## When not to use

- **Actions that can be undone.** Do it, then offer Undo in a toast (Toaster).
- **Tasks that need input** (forms, choices). Use Dialog.
- **Information that doesn't need a decision.** Use a toast or an inline message.
- **Routine, frequent actions.** Repeated confirmations get clicked through without reading.

## Props and variants

An alert dialog is built from parts:

| Part        | Role                                           |
| ----------- | ---------------------------------------------- |
| AlertDialog | Wraps everything; holds the open state         |
| Trigger     | The control that opens it, usually a Button    |
| Content     | The window, with the dimmed backdrop behind it |
| Header      | Groups the media, title and description        |
| Media       | Optional icon above the title                  |
| Title       | Required. States what is about to happen       |
| Description | Explains the consequence                       |
| Footer      | Holds the actions                              |
| Cancel      | A Button that closes it without acting         |
| Action      | A Button that performs the action              |

| On          | Prop                                    | Values                                  | Default              | Notes                                                                                                                                                             |
| ----------- | --------------------------------------- | --------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AlertDialog | `open` / `defaultOpen` / `onOpenChange` | `true` / `false`                        | closed               | Open state, when the app controls it                                                                                                                              |
| Content     | `size`                                  | `default`, `sm`                         | `default`            | See below                                                                                                                                                         |
| Cancel      | `variant`, `size`                       | Button variants and sizes               | `outline`, `default` |                                                                                                                                                                   |
| Action      | Button props                            | e.g. `variant="destructive"`, `onClick` | `default`            | **Doesn't close the dialog by itself.** Run the action in `onClick`, then close it by controlling `open`. TODO: confirm whether Action should close automatically |

| Size      | Width                                 | Layout                                                                                 |
| --------- | ------------------------------------- | -------------------------------------------------------------------------------------- |
| `default` | 320px; 448px from the `sm` breakpoint | Centered text on small screens; left-aligned from `sm`, with the media beside the text |
| `sm`      | 320px                                 | Always centered; Cancel and Action share two equal columns                             |

- **Always modal:** the page behind is locked and dimmed (black at 80%, light blur). Clicking outside does **not** close it; the user has to choose. Escape cancels.
- **Focus** starts inside the dialog and returns to the trigger when it closes.
- **Footer layout:** actions stack on small screens with the last one (the action) on top; from `sm` up they sit in a row aligned right.
- **Media:** a 64px muted circle with a 32px icon.
- **Motion:** fades and scales in and out (about 100ms).
- Light and dark themes are both supported.

## Tokens used

| Token                  | Used by                                                      | Light                      | Dark                       |
| ---------------------- | ------------------------------------------------------------ | -------------------------- | -------------------------- |
| `--popover`            | Window background                                            | `oklch(1 0 0)`             | `oklch(0.218 0.008 223.9)` |
| `--popover-foreground` | Window text                                                  | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--foreground`         | Faint outline around the window (5%), description link hover | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--muted`              | Media circle background                                      | `oklch(0.963 0.002 197.1)` | `oklch(0.275 0.011 216.9)` |
| `--muted-foreground`   | Description text                                             | `oklch(0.56 0.021 213.5)`  | `oklch(0.723 0.014 214.4)` |
| `--radius`             | Window corners (`radius × 2.6`)                              | `0.875rem`                 | `0.875rem`                 |

- **Backdrop:** black at 80% with a light blur; fixed, not a token. TODO: decide whether the backdrop color should become a token (same open question as Dialog).
- **Buttons:** Cancel and Action use the Button tokens; see Button.md.
- **Fonts:** the title uses `--font-heading`, other text `--font-sans`.

## Example

From the `AlertDialogDemo` used by every story (with its default args):

```tsx
<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    <Trash2 data-icon="inline-start" />
    Delete project
  </AlertDialogTrigger>
  <AlertDialogContent size="default">
    <AlertDialogHeader>
      <AlertDialogTitle>Delete "Website redesign"?</AlertDialogTitle>
      <AlertDialogDescription>
        This permanently deletes the project and its 24 files. This can't be
        undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">
        Delete project
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
