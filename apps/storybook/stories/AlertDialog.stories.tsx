import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@act-jirayut/dsai"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Trash2 } from "lucide-react"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

type AlertDialogDemoProps = {
  /** Popup width and layout */
  size?: "default" | "sm"
  /** Show an icon above the title */
  withMedia?: boolean
  /** Style the confirm action as destructive */
  destructive?: boolean
  /** Start open (for reviewing the layout) */
  defaultOpen?: boolean
}

/** A confirmation composed the way an app would, so Controls drive it. */
function AlertDialogDemo({
  size = "default",
  withMedia = false,
  destructive = true,
  defaultOpen = false,
}: AlertDialogDemoProps) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <Trash2 data-icon="inline-start" />
        Delete project
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {withMedia && (
            <AlertDialogMedia>
              <Trash2 />
            </AlertDialogMedia>
          )}
          <AlertDialogTitle>Delete "Website redesign"?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently deletes the project and its 24 files. This can't be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={destructive ? "destructive" : "default"}>
            Delete project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialogDemo,
  tags: ["autodocs"],
  args: {
    size: "default",
    withMedia: false,
    destructive: true,
    defaultOpen: false,
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "sm"],
      table: { defaultValue: { summary: "default" } },
    },
  },
} satisfies Meta<typeof AlertDialogDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Open by default so the layout can be reviewed. */
export const Open: Story = { args: { defaultOpen: true } }

/** `size="sm"`: narrow, centered, actions in two equal columns. */
export const Small: Story = { args: { defaultOpen: true, size: "sm" } }

/** With an icon; at default size it sits beside the text on wider screens. */
export const WithMedia: Story = { args: { defaultOpen: true, withMedia: true } }

export const SmallWithMedia: Story = {
  args: { defaultOpen: true, size: "sm", withMedia: true },
}

/** Opens as an alert dialog, focuses inside, and Cancel closes it. */
export const OpenAndCancel: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: /Delete project/ })
    )
    const dialog = await screen.findByRole("alertdialog")
    // It mounts at opacity 0 and animates in; wait for the animation.
    await waitFor(() => expect(dialog).toBeVisible())
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Cancel" })
    )
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
    )
  },
}
