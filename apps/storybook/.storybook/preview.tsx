import type { Decorator, Preview } from "@storybook/react-vite"
import { useEffect } from "react"

import "./preview.css"

/** Toggles the `dark` class on <html>, which is how @dsai/ui switches theme. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme as "light" | "dark"
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])
  return <Story />
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Show a11y violations in the panel without failing anything.
    a11y: { test: "todo" },
  },
}

export default preview
