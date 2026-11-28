import { Input, Label } from "@act-jirayut/dsai"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "you@example.com", type: "email", disabled: false },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "file"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    className: {
      control: "text",
      description: "Extra classes, merged last so they win",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Always pair an input with a visible label. */
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...args} />
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true, value: "Locked" } }

/** `aria-invalid="true"`: destructive border and ring. */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
}

/** `:focus-visible`, forced with the pseudo-states addon. */
export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

export const File: Story = { args: { type: "file" } }
