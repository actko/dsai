# @act-jirayut/dsai

React components for the DSAI design system: [shadcn/ui](https://ui.shadcn.com) components built on [Base UI](https://base-ui.com) primitives, styled with Tailwind CSS v4 and a shared set of design tokens with light and dark themes.

## Requirements

- React 19
- Tailwind CSS v4
- Next.js 16, only if you use `ProductCard` (it is a separate entry point, so nothing else needs Next.js)

## Install

```bash
pnpm add @act-jirayut/dsai
```

With npm or Yarn: `npm install @act-jirayut/dsai` or `yarn add @act-jirayut/dsai`. React, React DOM and Tailwind CSS are peer dependencies; install them in your app if it doesn't have them yet.

## Set up the stylesheet

Import the stylesheet once, right after Tailwind, in your global CSS (in Next.js, `app/globals.css`):

```css
@import "tailwindcss";
@import "@act-jirayut/dsai/styles.css";
```

This adds:

- **Design tokens** as CSS variables (`--primary`, `--border`, `--radius`, …) and as Tailwind theme values, so classes like `bg-primary` and `text-muted-foreground` work in your own code too.
- **Component styles**, inside `@layer components`, so Tailwind utilities you pass in `className` always win.
- **Animations** used by dialogs, popovers and toasts.

**Dark mode** follows a `dark` class on an ancestor, usually `<html class="dark">`. [`next-themes`](https://github.com/pacocoursey/next-themes) with `attribute="class"` works.

**Fonts** are yours to choose: set `--font-sans` (body and controls) and `--font-heading` (titles). With `next/font`:

```tsx
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })
const heading = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" })

<html className={`${sans.variable} ${heading.variable}`}>
```

**Change the theme** by overriding the token variables after the import:

```css
:root {
  --primary: oklch(0.55 0.2 260);
  --radius: 0.5rem;
}

.dark {
  --primary: oklch(0.75 0.15 260);
}
```

## Example

A confirmation that deletes a project and confirms it with a toast. Render `<Toaster />` once near the root of your app.

```tsx
"use client"

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
  Toaster,
  toast,
} from "@act-jirayut/dsai"
import { useState } from "react"

export function DeleteProject() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="destructive" />}>
          Delete project
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "Website redesign"?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the project and its files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                setOpen(false)
                toast.success("Project deleted")
              }}
            >
              Delete project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </>
  )
}
```

Components built on Base UI compose with the `render` prop rather than `asChild`, as `AlertDialogTrigger` does above. Pass `className` to adjust any component; your utilities override its defaults.

## Entry points

| Import                           | Contents                                                              |
| -------------------------------- | --------------------------------------------------------------------- |
| `@act-jirayut/dsai`              | Every component below except ProductCard                              |
| `@act-jirayut/dsai/product-card` | `ProductCard`, `ProductCardProps`, `ProductCardImage` (needs Next.js) |
| `@act-jirayut/dsai/styles.css`   | Tokens, component styles and animations                               |

## Components

| Component   | Exports                                                                                                                                                                                                                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AlertDialog | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogMedia`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogCancel`, `AlertDialogAction`, `AlertDialogOverlay`, `AlertDialogPortal`, `AlertDialogProps`, `AlertDialogContentProps`, `AlertDialogActionProps`, `AlertDialogCancelProps` |
| Badge       | `Badge`, `badgeVariants`, `BadgeProps`                                                                                                                                                                                                                                                                                                                        |
| Button      | `Button`, `buttonVariants`, `ButtonProps`                                                                                                                                                                                                                                                                                                                     |
| Card        | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`, `CardProps`, `CardSize`                                                                                                                                                                                                                                      |
| Checkbox    | `Checkbox`, `CheckboxProps`                                                                                                                                                                                                                                                                                                                                   |
| Dialog      | `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogProps`, `DialogContentProps`, `DialogFooterProps`                                                                                                                                      |
| Input       | `Input`, `InputProps`                                                                                                                                                                                                                                                                                                                                         |
| Label       | `Label`, `LabelProps`                                                                                                                                                                                                                                                                                                                                         |
| Popover     | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`, `PopoverProps`, `PopoverContentProps`                                                                                                                                                                                                                   |
| ProductCard | `ProductCard`, `ProductCardProps`, `ProductCardImage` — from `@act-jirayut/dsai/product-card`                                                                                                                                                                                                                                                                 |
| Switch      | `Switch`, `SwitchProps`                                                                                                                                                                                                                                                                                                                                       |
| Tabs        | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `tabsListVariants`, `TabsProps`, `TabsListProps`, `TabsTriggerProps`, `TabsContentProps`                                                                                                                                                                                                                    |
| Textarea    | `Textarea`, `TextareaProps`                                                                                                                                                                                                                                                                                                                                   |
| Toaster     | `Toaster`, `ToasterProps`, `toast`                                                                                                                                                                                                                                                                                                                            |

Use `toast` from this package, not from `sonner` directly, so it reaches the same `<Toaster />`.

## Component docs

Every component ships a usage guide for designers and AI agents (purpose, when to use and not, props, states, tokens and an example), at `node_modules/@act-jirayut/dsai/src/components/<Component>/<Component>.md`, for example `Button/Button.md`.

## License

[MIT](LICENSE)
