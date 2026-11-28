import { Checkbox, Input, Label, Switch } from "@dsai/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Email" },
  argTypes: { children: { control: "text" } },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Above a text field, linked with `htmlFor` / `id`. */
export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="name" {...args}>
        Full name
      </Label>
      <Input id="name" placeholder="Jane Doe" />
    </div>
  ),
}

/** Wrapping a checkbox or switch makes the whole label clickable. */
export const WithControls: Story = {
  render: (args) => (
    <div className="grid gap-4">
      <Label {...args}>
        <Checkbox defaultChecked />
        Email me about product updates
      </Label>
      <Label {...args}>
        <Switch />
        Dark mode
      </Label>
    </div>
  ),
}

/** Dimmed when an ancestor has `data-disabled="true"`. */
export const Disabled: Story = {
  render: (args) => (
    <div data-disabled="true" className="grid w-72 gap-2">
      <Label htmlFor="locked" {...args}>
        Workspace ID
      </Label>
      <Input id="locked" value="ws_2041" disabled readOnly />
    </div>
  ),
}
