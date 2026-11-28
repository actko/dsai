import { Label, Textarea } from "@act-jirayut/dsai"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "Tell us what happened…", disabled: false },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    rows: { control: "number" },
    className: {
      control: "text",
      description: "Extra classes, merged last so they win",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid gap-2">
      <Label htmlFor="feedback">Feedback</Label>
      <Textarea id="feedback" {...args} />
    </div>
  ),
}

/** Grows with its content; no manual resize handle. */
export const GrowsWithContent: Story = {
  args: {
    defaultValue:
      "The export finished, but two files were missing.\nThe log shows a timeout on the second upload.\nIt happened again after a retry.",
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Read only" },
}

/** `aria-invalid="true"`: destructive border and ring. */
export const Invalid: Story = { args: { "aria-invalid": true } }

/** `:focus-visible`, forced with the pseudo-states addon. */
export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}
