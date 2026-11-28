# ProductCard

## Purpose

Shows one product in a store listing: its image, brand, name and price.

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

ProductCard uses Next.js's image component, so it needs a Next.js app. Then import the component:

```tsx
import { ProductCard } from "@dsai/ui"

;<ProductCard
  image={{ src: "/products/sneaker.svg", alt: "White low-top sneaker" }}
  brand="Northwind"
  name="Court Classic Sneaker"
  price={2490}
/>
```

## When to use

- Product grids and lists in a shop or catalog.
- Related or recommended products next to a product page.

## When not to use

- **Anything that isn't a product for sale.** Use Card.
- **Showing details like stock, ratings, sizes or a sale price.** ProductCard has no slots for these. TODO: decide whether to add badges, ratings or a compare-at price.
- **Adding to cart from the card.** It has no button or action slot. TODO: decide whether ProductCard should link to the product page or hold an action.
- **Apps that aren't built with Next.js.** TODO: ProductCard depends on Next.js's image component; a framework-neutral version doesn't exist.

## Props and variants

| Prop       | Values                               | Default   | Notes                                                                                                                               |
| ---------- | ------------------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `image`    | `{ src, alt }`                       | —         | Required. `src` is a path under `/public`, an allowed remote URL or a static import; `alt` describes the product for screen readers |
| `brand`    | text                                 | —         | Required. Shown above the name, small and uppercase                                                                                 |
| `name`     | text                                 | —         | Required. Stops after two lines, so cards in a grid stay the same height                                                            |
| `price`    | a number                             | —         | Required. Formatted with `currency` and `locale`                                                                                    |
| `currency` | ISO 4217 code, e.g. `THB`, `USD`     | `THB`     |                                                                                                                                     |
| `locale`   | BCP 47 locale, e.g. `th-TH`, `en-US` | `th-TH`   | Sets number and currency formatting                                                                                                 |
| `size`     | `default`, `sm`                      | `default` | Card spacing: 24px or 16px                                                                                                          |

There are **no visual variants**. The image is square, fills the card's width and runs edge to edge at the top; while it loads, a muted background shows. Below it: brand (extra-small, medium weight, uppercase, muted), name (heading font), and price (semibold, aligned digits). It has no hover, focus or disabled states. TODO: decide on a hover state for clickable product cards.

Light and dark themes are both supported.

## Tokens used

ProductCard is built on Card, so it uses every Card token (see Card.md), plus:

| Token                | Used by                         | Light                      | Dark                       |
| -------------------- | ------------------------------- | -------------------------- | -------------------------- |
| `--muted`            | Image background while it loads | `oklch(0.963 0.002 197.1)` | `oklch(0.275 0.011 216.9)` |
| `--muted-foreground` | Brand text                      | `oklch(0.56 0.021 213.5)`  | `oklch(0.723 0.014 214.4)` |
| `--foreground`       | Price text                      | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |

The name uses `--font-heading`; brand and price use `--font-sans`.

## Example

From the `LongName` story: a long product name stops after two lines.

```tsx
<ProductCard
  image={{ src: "/products/backpack.svg", alt: "Olive green backpack" }}
  brand="Fieldline"
  name="Daypack 22L Water-Resistant Backpack with Laptop Sleeve and Bottle Pocket"
  price={1890.5}
/>
```
