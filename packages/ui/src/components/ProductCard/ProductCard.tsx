import Image, { type StaticImageData } from "next/image"

import { Card, CardContent, CardTitle, type CardProps } from "../Card"

import styles from "./ProductCard.module.css"

type ProductCardImage = {
  /** Path under /public, a remote URL allowed in next.config, or a static import */
  src: string | StaticImageData
  /** Describes the product for screen readers */
  alt: string
}

type ProductCardProps = Omit<CardProps, "children"> & {
  image: ProductCardImage
  /** Product name; clamped to 2 lines */
  name: string
  /** Brand name, shown above the product name */
  brand: string
  /** Price as a number, formatted with `currency` and `locale` */
  price: number
  /** ISO 4217 currency code */
  currency?: string
  /** BCP 47 locale used to format the price */
  locale?: string
}

function formatPrice(price: number, currency: string, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    price
  )
}

function ProductCard({
  image,
  name,
  brand,
  price,
  currency = "THB",
  locale = "th-TH",
  ...props
}: ProductCardProps) {
  return (
    <Card data-slot="product-card" {...props}>
      <Image
        src={image.src}
        alt={image.alt}
        width={600}
        height={600}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className={styles.image}
      />
      <CardContent className={styles.body}>
        <p className={styles.brand}>{brand}</p>
        <CardTitle className={styles.name}>{name}</CardTitle>
        <p className={styles.price}>{formatPrice(price, currency, locale)}</p>
      </CardContent>
    </Card>
  )
}

export { ProductCard, type ProductCardProps, type ProductCardImage }
