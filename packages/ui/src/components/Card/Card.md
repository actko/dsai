# Card

## Purpose

A bordered surface that groups related content and actions about one subject.

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

Then import the parts you need and compose them:

```tsx
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dsai/ui"

;<Card>
  <CardHeader>
    <CardTitle>Team plan</CardTitle>
    <CardDescription>Shared workspace for up to 10 people.</CardDescription>
  </CardHeader>
  <CardContent>Includes unlimited projects and version history.</CardContent>
  <CardFooter>
    <Button size="sm">Upgrade</Button>
  </CardFooter>
</Card>
```

## When to use

- Grouping one subject's details and actions: a plan, a setting group, a summary, a notification.
- Repeating items in a grid or list where each item stands on its own.
- Separating a section from the page background when plain spacing isn't enough.

## When not to use

- **Products in a store listing.** Use ProductCard, which adds the image, brand and price layout.
- **Content that must interrupt or needs a decision.** Use Dialog or AlertDialog.
- **Cards inside cards.** Nested borders add noise; use spacing or a divider inside one card instead.
- **Making the whole card one big link or button.** TODO: there's no clickable-card pattern yet (hover and focus styles for a card); put a Button or link inside instead.
- **Page layout and columns.** Use plain layout containers; a card is a content surface, not a grid.

## Props and variants

A card is built from parts, all optional except the card itself:

| Part        | Role                                                                      |
| ----------- | ------------------------------------------------------------------------- |
| Card        | The surface                                                               |
| Header      | Groups the title, description and action at the top                       |
| Title       | The card's heading                                                        |
| Description | Supporting text under the title                                           |
| Action      | A control in the top-right corner, beside the title (e.g. a small Button) |
| Content     | The main body                                                             |
| Footer      | Actions or summary at the bottom, laid out in a row                       |

| On     | Prop                   | Values          | Default   | Notes                                                         |
| ------ | ---------------------- | --------------- | --------- | ------------------------------------------------------------- |
| Card   | `size`                 | `default`, `sm` | `default` | Inner spacing: 24px, or 16px for dense layouts                |
| Header | `className="border-b"` | —               | —         | Adds a divider under the header, with matching space below it |
| Footer | `className="border-t"` | —               | —         | Adds a divider above the footer, with matching space above it |

There are **no visual variants**. The card is full width of its container, with rounded corners, a faint outline, and the same spacing (24px, or 16px at `sm`) around the edges and between parts. An image placed first or last runs edge to edge with rounded corners. It has no hover, focus or disabled states.

Light and dark themes are both supported.

## Tokens used

| Token                | Used by                                              | Light                      | Dark                       |
| -------------------- | ---------------------------------------------------- | -------------------------- | -------------------------- |
| `--card`             | Card background                                      | `oklch(1 0 0)`             | `oklch(0.218 0.008 223.9)` |
| `--card-foreground`  | Card text                                            | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--foreground`       | Faint outline around the card (10%)                  | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--muted-foreground` | Description text                                     | `oklch(0.56 0.021 213.5)`  | `oklch(0.723 0.014 214.4)` |
| `--border`           | Header and footer dividers (`border-b` / `border-t`) | `oklch(0.925 0.005 214.3)` | `oklch(1 0 0 / 10%)`       |
| `--radius`           | Corners (`radius × 1.8`)                             | `0.875rem`                 | `0.875rem`                 |

The title uses `--font-heading`; other text uses `--font-sans`.

## Example

From the `WithAction` story: a card with an action beside its title.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>3 unread since yesterday.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="sm">
        Mark all read
      </Button>
    </CardAction>
  </CardHeader>
  <CardContent>Your export finished and is ready to download.</CardContent>
</Card>
```
