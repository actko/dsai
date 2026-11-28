import { Checkbox, Label } from "@act-jirayut/dsai"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { defaultChecked: false, disabled: false },
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {
  args: { "aria-label": "Accept" },
}

/** Use with a label; clicking the label toggles it. */
export const WithLabel: Story = {
  render: (args) => (
    <Label>
      <Checkbox {...args} />
      Accept the terms and conditions
    </Label>
  ),
}

export const States: Story = {
  render: () => (
    <div className="grid gap-3">
      <Label>
        <Checkbox />
        Unchecked
      </Label>
      <Label>
        <Checkbox defaultChecked />
        Checked
      </Label>
      <Label>
        <Checkbox disabled />
        Disabled
      </Label>
      <Label>
        <Checkbox disabled defaultChecked />
        Disabled, checked
      </Label>
      <Label>
        <Checkbox aria-invalid />
        Invalid
      </Label>
    </div>
  ),
}

/** `:focus-visible`, forced with the pseudo-states addon. */
export const FocusVisible: Story = {
  ...WithLabel,
  parameters: { pseudo: { focusVisible: true } },
}

/** Clicking the label toggles the box. */
export const Toggle: Story = {
  ...WithLabel,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const box = canvas.getByRole("checkbox")
    await expect(box).toHaveAttribute("aria-checked", "false")
    await userEvent.click(canvas.getByText(/Accept the terms/))
    await expect(box).toHaveAttribute("aria-checked", "true")
  },
}
