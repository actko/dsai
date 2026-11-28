import { Button, Toaster, toast } from "@dsai/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

/** Buttons that fire each kind of toast into the Toaster below them. */
function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Draft saved")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Project published", {
            description: "It's now visible to your team.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("A new version is available")}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("Storage is 90% full")}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Couldn't upload 2 files")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "Exporting…",
            success: "Export ready",
            error: "Export failed",
          })
        }
      >
        Loading
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Item moved to trash", {
            action: { label: "Undo", onClick: () => toast("Restored") },
          })
        }
      >
        With action
      </Button>
    </div>
  )
}

const meta = {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  args: { position: "bottom-right", richColors: false, closeButton: false },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      table: { defaultValue: { summary: "bottom-right" } },
    },
    theme: { control: "inline-radio", options: ["light", "dark", "system"] },
    richColors: { control: "boolean" },
    closeButton: { control: "boolean" },
  },
  render: (args) => (
    <>
      <ToastDemo />
      <Toaster {...args} />
    </>
  ),
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/** Click the buttons; every Toaster prop is editable in Controls. */
export const Playground: Story = {}

/** `richColors`: success, info, warning and error get tinted backgrounds. */
export const RichColors: Story = { args: { richColors: true } }

export const WithCloseButton: Story = { args: { closeButton: true } }

export const TopCenter: Story = { args: { position: "top-center" } }

/** A toast appears with its message and description. */
export const ShowsToast: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Success" })
    )
    // Toasts mount at opacity 0 and animate in; wait for the animation.
    const title = await screen.findByText("Project published")
    await waitFor(() => expect(title).toBeVisible())
    await expect(
      screen.getByText("It's now visible to your team.")
    ).toBeVisible()
  },
}
