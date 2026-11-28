import { ProductCard } from "@act-jirayut/dsai/product-card"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  args: {
    image: { src: "/products/sneaker.svg", alt: "White low-top sneaker" },
    brand: "Northwind",
    name: "Court Classic Sneaker",
    price: 2490,
    currency: "THB",
    locale: "th-TH",
    size: "default",
  },
  argTypes: {
    brand: { control: "text" },
    name: { control: "text", description: "Clamped to 2 lines" },
    price: { control: "number" },
    currency: { control: "text", description: "ISO 4217 code" },
    locale: { control: "text", description: "BCP 47 locale for the price" },
    size: {
      control: "inline-radio",
      options: ["default", "sm"],
      table: { defaultValue: { summary: "default" } },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Long names stop after two lines, so cards in a grid stay the same height. */
export const LongName: Story = {
  args: {
    image: { src: "/products/backpack.svg", alt: "Olive green backpack" },
    brand: "Fieldline",
    name: "Daypack 22L Water-Resistant Backpack with Laptop Sleeve and Bottle Pocket",
    price: 1890.5,
  },
}

/** `currency` and `locale` format the price. */
export const OtherCurrency: Story = {
  args: {
    image: {
      src: "/products/headphones.svg",
      alt: "Purple over-ear headphones",
    },
    brand: "Soundry",
    name: "Studio Wireless Headphones",
    price: 129,
    currency: "USD",
    locale: "en-US",
  },
}

/** Three cards in a grid, as on a product listing page. */
export const Grid: Story = {
  decorators: [
    (Story) => (
      <div className="w-[48rem]">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <ProductCard
        image={{ src: "/products/sneaker.svg", alt: "White low-top sneaker" }}
        brand="Northwind"
        name="Court Classic Sneaker"
        price={2490}
      />
      <ProductCard
        image={{ src: "/products/backpack.svg", alt: "Olive green backpack" }}
        brand="Fieldline"
        name="Daypack 22L Water-Resistant Backpack with Laptop Sleeve"
        price={1890.5}
      />
      <ProductCard
        image={{
          src: "/products/headphones.svg",
          alt: "Purple over-ear headphones",
        }}
        brand="Soundry"
        name="Studio Wireless Headphones"
        price={4590}
      />
    </div>
  ),
}
