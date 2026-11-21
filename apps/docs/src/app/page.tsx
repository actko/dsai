import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ProductCard,
  type ButtonProps,
  type ProductCardProps,
} from "@dsai/ui"
import { ArrowRight, Plus } from "lucide-react"

import { DialogDemo } from "@/components/dialog-demo"

const products: ProductCardProps[] = [
  {
    image: { src: "/products/sneaker.svg", alt: "White low-top sneaker" },
    brand: "Northwind",
    name: "Court Classic Sneaker",
    price: 2490,
  },
  {
    image: { src: "/products/backpack.svg", alt: "Olive green backpack" },
    brand: "Fieldline",
    name: "Daypack 22L Water-Resistant Backpack with Laptop Sleeve",
    price: 1890.5,
  },
  {
    image: {
      src: "/products/headphones.svg",
      alt: "Purple over-ear headphones",
    },
    brand: "Soundry",
    name: "Studio Wireless Headphones",
    price: 4590,
  },
]

const variants: NonNullable<ButtonProps["variant"]>[] = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
]

const sizes: NonNullable<ButtonProps["size"]>[] = ["xs", "sm", "default", "lg"]

export default function Home() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-semibold">@dsai/ui</h1>
        <p className="text-muted-foreground">
          Component playground. Press <kbd>d</kbd> to toggle dark mode.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">Button</h2>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size}>
              Size {size}
              <ArrowRight data-icon="inline-end" />
            </Button>
          ))}
          <Button size="icon" aria-label="Add">
            <Plus />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">Badge</h2>
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              "default",
              "secondary",
              "destructive",
              "outline",
              "ghost",
              "link",
            ] as const
          ).map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
          <Badge render={<a href="#" />}>As link</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">Card</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Supporting description text.</CardDescription>
          </CardHeader>
          <CardContent>Card body content.</CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">ProductCard</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">Dialog</h2>
        <div>
          <DialogDemo />
        </div>
      </section>
    </main>
  )
}
