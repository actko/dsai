import { Badge, badgeVariants } from "@act-jirayut/dsai"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRight, Check, X } from "lucide-react"

const variants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description: "Visual emphasis",
      table: { defaultValue: { summary: "default" } },
    },
    children: { control: "text" },
    className: {
      control: "text",
      description: "Extra classes, merged last so they win",
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}

/** `data-icon="inline-start"` / `"inline-end"` tightens padding on that side. */
export const WithIcons: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="secondary">
        <Check data-icon="inline-start" />
        Verified
      </Badge>
      <Badge {...args} variant="outline">
        Remove
        <X data-icon="inline-end" />
      </Badge>
    </div>
  ),
}

const linkRow: Story["render"] = (args) => (
  <div className="flex flex-wrap items-center gap-2">
    {variants.map((variant) => (
      <Badge key={variant} {...args} variant={variant} render={<a href="#" />}>
        {variant}
        <ArrowRight data-icon="inline-end" />
      </Badge>
    ))}
  </div>
)

/** `render={<a />}` makes a real link; hover styles apply only to links. */
export const AsLink: Story = { render: linkRow }

/** Hover, rendered as links. Forced with the pseudo-states addon. */
export const Hover: Story = {
  render: linkRow,
  parameters: { pseudo: { hover: true } },
}

/** `:focus-visible` on links: ring color, 3px ring at 50%. */
export const FocusVisible: Story = {
  render: linkRow,
  parameters: { pseudo: { focusVisible: true } },
}

/** `aria-invalid="true"` — destructive border. */
export const Invalid: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant) => (
        <Badge key={variant} {...args} variant={variant} aria-invalid>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}

/** `badgeVariants()` styles another element, here a `<button>`. */
export const AsButton: Story = {
  render: () => (
    <button type="button" className={badgeVariants({ variant: "outline" })}>
      Filter: Active
    </button>
  ),
}

/** `className` is merged last, so consumer utilities override defaults. */
export const ClassNameOverride: Story = {
  args: { children: "Live", className: "bg-emerald-600 text-white" },
}
