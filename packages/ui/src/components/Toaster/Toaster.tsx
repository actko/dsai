"use client"

import * as React from "react"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

import styles from "./Toaster.module.css"

/**
 * Follows the `dark` class on <html>, which is how every @act-jirayut/dsai component
 * switches theme. (shadcn reads next-themes here; a library can't assume it.)
 */
function useDocumentTheme(): "light" | "dark" | undefined {
  const [theme, setTheme] = React.useState<"light" | "dark">()

  React.useEffect(() => {
    const root = document.documentElement
    const update = () =>
      setTheme(root.classList.contains("dark") ? "dark" : "light")
    update()
    const observer = new MutationObserver(update)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return theme
}

/** Pass `theme` to override; by default it follows the `dark` class. */
function Toaster({ theme, ...props }: ToasterProps) {
  const documentTheme = useDocumentTheme()

  return (
    <Sonner
      theme={theme ?? documentTheme ?? "light"}
      icons={{
        success: <CircleCheckIcon className={styles.icon} />,
        info: <InfoIcon className={styles.icon} />,
        warning: <TriangleAlertIcon className={styles.icon} />,
        error: <OctagonXIcon className={styles.icon} />,
        loading: <Loader2Icon className={styles.spinner} />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, type ToasterProps }
