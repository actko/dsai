import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@dsai/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

type PopoverDemoProps = {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  defaultOpen?: boolean
}

/** A popover composed the way an app would, so Controls drive it. */
function PopoverDemo({
  side = "bottom",
  align = "center",
  sideOffset = 4,
  defaultOpen = false,
}: PopoverDemoProps) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        Dimensions
      </PopoverTrigger>
      <PopoverContent side={side} align={align} sideOffset={sideOffset}>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the size of the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="grid grid-cols-2 gap-2">
          <Label htmlFor="width">Width</Label>
          <Input id="width" defaultValue="100%" />
          <Label htmlFor="height">Height</Label>
          <Input id="height" defaultValue="25px" />
        </div>
      </PopoverContent>
    </Popover>
  )
}

const meta = {
  title: "Components/Popover",
  component: PopoverDemo,
  tags: ["autodocs"],
  args: { side: "bottom", align: "center", sideOffset: 4, defaultOpen: false },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
      table: { defaultValue: { summary: "bottom" } },
    },
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
      table: { defaultValue: { summary: "center" } },
    },
    sideOffset: { control: { type: "number", min: 0, max: 24 } },
  },
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="grid min-h-96 place-items-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PopoverDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Open by default so the layout can be reviewed. */
export const Open: Story = { args: { defaultOpen: true } }

export const Top: Story = { args: { defaultOpen: true, side: "top" } }

export const AlignStart: Story = {
  args: { defaultOpen: true, align: "start" },
}

/** Opens on click and closes with Escape. */
export const OpenAndEscape: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Dimensions" })
    )
    const popup = await screen.findByRole("dialog")
    // It mounts at opacity 0 and animates in; wait for the animation.
    await waitFor(() => expect(popup).toBeVisible())
    await userEvent.keyboard("{Escape}")
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    )
  },
}
