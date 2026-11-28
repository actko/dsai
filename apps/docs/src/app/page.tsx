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
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  type ButtonProps,
} from "@act-jirayut/dsai"
import {
  ProductCard,
  type ProductCardProps,
} from "@act-jirayut/dsai/product-card"
import { ArrowRight, Plus } from "lucide-react"

import { DialogDemo } from "@/components/dialog-demo"
import { ToastDemo } from "@/components/toast-demo"

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
        <h1 className="font-heading text-3xl font-semibold">
          @act-jirayut/dsai
        </h1>
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
        <h2 className="font-heading text-xl font-medium">Tabs</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {(["default", "line"] as const).map((variant) => (
            <Tabs key={variant} defaultValue="account">
              <TabsList variant={variant}>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications" disabled>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Update your name, email and profile photo.
              </TabsContent>
              <TabsContent value="password">Change your password.</TabsContent>
            </Tabs>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">Form fields</h2>
        <div className="grid max-w-sm gap-6">
          <div className="grid gap-2">
            <Label htmlFor="docs-email">Email</Label>
            <Input id="docs-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="docs-feedback">Feedback</Label>
            <Textarea id="docs-feedback" placeholder="Tell us what happened…" />
          </div>
          <Label>
            <Checkbox defaultChecked />
            Email me about product updates
          </Label>
          <Label>
            <Switch />
            Airplane mode
          </Label>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">Popover</h2>
        <div>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              Dimensions
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Dimensions</PopoverTitle>
                <PopoverDescription>
                  Set the size of the layer.
                </PopoverDescription>
              </PopoverHeader>
              <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="docs-width">Width</Label>
                <Input id="docs-width" defaultValue="100%" />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">Alert dialog</h2>
        <div>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              Delete project
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {'Delete "Website redesign"?'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently deletes the project and its 24 files. This
                  can&apos;t be undone.
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
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium">Toast</h2>
        <ToastDemo />
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
