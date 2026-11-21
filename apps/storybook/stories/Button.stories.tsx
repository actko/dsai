import { Button, buttonVariants } from "@dsai/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRight, Download, Plus, Trash2 } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const
const textSizes = ["xs", "sm", "default", "lg"] as const
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description: "Visual emphasis",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "select",
      options: [...textSizes, ...iconSizes],
      description: "Height and padding; `icon*` sizes are square",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
    className: {
      control: "text",
      description: "Extra classes, merged last so they win",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {textSizes.map((size) => (
        <Button key={size} {...args} size={size}>
          Size {size}
        </Button>
      ))}
    </div>
  ),
}

/** Square sizes for icon-only buttons. Always give them an `aria-label`. */
export const IconSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {iconSizes.map((size) => (
        <Button key={size} {...args} size={size} aria-label={`Add (${size})`}>
          <Plus />
        </Button>
      ))}
    </div>
  ),
}

/** `data-icon="inline-start"` / `"inline-end"` tightens padding on that side. */
export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      {textSizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <Button {...args} size={size}>
            <Download data-icon="inline-start" />
            Download
          </Button>
          <Button {...args} size={size} variant="outline">
            Continue
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      ))}
    </div>
  ),
}

/** `:disabled` — 50% opacity, no pointer events. */
export const Disabled: Story = {
  args: { disabled: true },
  render: Variants.render,
}

/** `aria-invalid="true"` — destructive border and ring. */
export const Invalid: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant} aria-invalid>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

/** `aria-expanded="true"`, e.g. a button that opens a menu. */
export const Expanded: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["secondary", "outline", "ghost"] as const).map((variant) => (
        <Button key={variant} {...args} variant={variant} aria-expanded>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

/** Hover, per variant. Forced with the pseudo-states addon. */
export const Hover: Story = {
  render: Variants.render,
  parameters: { pseudo: { hover: true } },
}

/** `:focus-visible` (keyboard focus): ring color, 3px ring at 50%. */
export const FocusVisible: Story = {
  render: Variants.render,
  parameters: { pseudo: { focusVisible: true } },
}

/** `:active` (pressed): moves down 1px. */
export const Pressed: Story = {
  render: Variants.render,
  parameters: { pseudo: { active: true } },
}

/** Keyboard users can reach the button with Tab. */
export const KeyboardReachable: Story = {
  args: { variant: "outline" },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button")
    await userEvent.tab()
    await expect(button).toHaveFocus()
  },
}

/** `buttonVariants()` styles a non-button element, such as a link. */
export const AsLink: Story = {
  render: () => (
    <a href="#" className={buttonVariants({ variant: "outline" })}>
      Read the docs
      <ArrowRight data-icon="inline-end" />
    </a>
  ),
}

/** `className` is merged last, so consumer utilities override defaults. */
export const ClassNameOverride: Story = {
  args: { className: "w-64 bg-emerald-600 text-white hover:bg-emerald-700" },
}

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Button {...args}>
      <Trash2 data-icon="inline-start" />
      Delete
    </Button>
  ),
}
