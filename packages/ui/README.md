# @dsai/ui

React components from the DSAI design system: [shadcn/ui](https://ui.shadcn.com) components on [Base UI](https://base-ui.com) primitives, styled for Tailwind CSS v4.

## Requirements

- React 19
- Tailwind CSS v4
- Next.js 16 (used by `ProductCard` for `next/image`)

## Install

```bash
pnpm add @dsai/ui
```

## Set up styles

Import the stylesheet right after Tailwind in your global CSS:

```css
@import "tailwindcss";
@import "@dsai/ui/styles.css";
```

This adds the design tokens (as Tailwind theme values, so classes like `bg-primary` work in your own code too), the component styles, and the animation utilities.

Dark mode follows a `dark` class on an ancestor element, such as `<html class="dark">`; [`next-themes`](https://github.com/pacocoursey/next-themes) with `attribute="class"` works.

## Use

```tsx
import { Button } from "@dsai/ui"

export function Actions() {
  return (
    <>
      <Button>Save</Button>
      <Button variant="outline" size="sm">
        Cancel
      </Button>
    </>
  )
}
```

Pass `className` to adjust a component; your Tailwind utilities take precedence over the component's own styles.

## Components

| Component   | Exports                                                                                                                                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AlertDialog | `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogMedia`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogCancel`, `AlertDialogAction`, `AlertDialogOverlay`, `AlertDialogPortal` |
| Badge       | `Badge`, `badgeVariants`, `BadgeProps`                                                                                                                                                                                                                     |
| Button      | `Button`, `buttonVariants`, `ButtonProps`                                                                                                                                                                                                                  |
| Card        | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`, `CardProps`, `CardSize`                                                                                                                                   |
| Checkbox    | `Checkbox`                                                                                                                                                                                                                                                 |
| Dialog      | `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`                                                                                             |
| Input       | `Input`                                                                                                                                                                                                                                                    |
| Label       | `Label`                                                                                                                                                                                                                                                    |
| Popover     | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`                                                                                                                                                       |
| ProductCard | `ProductCard`, `ProductCardProps`, `ProductCardImage`                                                                                                                                                                                                      |
| Switch      | `Switch`                                                                                                                                                                                                                                                   |
| Tabs        | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `tabsListVariants`                                                                                                                                                                                       |
| Textarea    | `Textarea`                                                                                                                                                                                                                                                 |
| Toaster     | `Toaster`, `ToasterProps`, `toast`                                                                                                                                                                                                                         |

Base UI composes with the `render` prop rather than `asChild`:

```tsx
<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
```

## License

[MIT](LICENSE)
