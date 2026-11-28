/**
 * Stand-in for `next/image`, which only runs inside Next.js. @act-jirayut/dsai imports
 * it (ProductCard), so Storybook maps `next/image` here and renders a plain
 * <img> with the same src/alt/size attributes.
 */
import type { ComponentProps } from "react"

type StaticImageData = { src: string; width: number; height: number }

type ImageProps = Omit<ComponentProps<"img">, "src"> & {
  src: string | StaticImageData
  priority?: boolean
  fill?: boolean
  quality?: number
  placeholder?: string
  blurDataURL?: string
  unoptimized?: boolean
}

export default function Image({
  src,
  priority,
  fill,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  style,
  ...props
}: ImageProps) {
  return (
    <img
      src={typeof src === "string" ? src : src.src}
      loading={priority ? "eager" : "lazy"}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              ...style,
            }
          : style
      }
      {...props}
    />
  )
}

export type { ImageProps, StaticImageData }
