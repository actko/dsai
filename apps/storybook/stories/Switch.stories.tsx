import { Label, Switch } from "@act-jirayut/dsai"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { size: "default", defaultChecked: false, disabled: false },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "sm"],
      table: { defaultValue: { summary: "default" } },
    },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = { args: { "aria-label": "Wi-Fi" } }

export const WithLabel: Story = {
  render: (args) => (
    <Label>
      <Switch {...args} />
      Airplane mode
    </Label>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-3">
      <Label>
        <Switch size="default" defaultChecked />
        Default
      </Label>
      <Label>
        <Switch size="sm" defaultChecked />
        Small
      </Label>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="grid gap-3">
      <Label>
        <Switch />
        Off
      </Label>
      <Label>
        <Switch defaultChecked />
        On
      </Label>
      <Label>
        <Switch disabled />
        Disabled
      </Label>
      <Label>
        <Switch disabled defaultChecked />
        Disabled, on
      </Label>
      <Label>
        <Switch aria-invalid />
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

/** Clicking toggles it on. */
export const Toggle: Story = {
  ...WithLabel,
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("switch")
    await expect(toggle).toHaveAttribute("aria-checked", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-checked", "true")
  },
}
