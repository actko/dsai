import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dsai/ui"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bell, Lock, User } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

type TabsDemoProps = {
  /** Style of the tab list */
  variant?: "default" | "line"
  /** Layout direction of the tab list */
  orientation?: "horizontal" | "vertical"
  /** Show icons before the labels */
  withIcons?: boolean
  /** Disable the third tab */
  disableThird?: boolean
}

/** Tabs composed the way an app would, so Controls can drive every prop. */
function TabsDemo({
  variant = "default",
  orientation = "horizontal",
  withIcons = false,
  disableThird = false,
}: TabsDemoProps) {
  return (
    <Tabs defaultValue="account" orientation={orientation} className="w-96">
      <TabsList variant={variant}>
        <TabsTrigger value="account">
          {withIcons && <User data-icon="inline-start" />}
          Account
        </TabsTrigger>
        <TabsTrigger value="password">
          {withIcons && <Lock data-icon="inline-start" />}
          Password
        </TabsTrigger>
        <TabsTrigger value="notifications" disabled={disableThird}>
          {withIcons && <Bell data-icon="inline-start" />}
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Update your name, email and profile photo.
      </TabsContent>
      <TabsContent value="password">
        Change your password. You'll be signed out on other devices.
      </TabsContent>
      <TabsContent value="notifications">
        Choose which emails and alerts you receive.
      </TabsContent>
    </Tabs>
  )
}

const meta = {
  title: "Components/Tabs",
  component: TabsDemo,
  tags: ["autodocs"],
  args: {
    variant: "default",
    orientation: "horizontal",
    withIcons: false,
    disableThird: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "line"],
      table: { defaultValue: { summary: "default" } },
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
  },
} satisfies Meta<typeof TabsDemo>

export default meta
type Story = StoryObj<typeof meta>

/** Every prop is editable in the Controls panel. */
export const Playground: Story = {}

/** Three related views; the first is selected by default. */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Update your name, email and profile photo.
      </TabsContent>
      <TabsContent value="password">
        Change your password. You'll be signed out on other devices.
      </TabsContent>
    </Tabs>
  ),
}

/** `variant="line"`: no track; the active tab gets an underline. */
export const Line: Story = { args: { variant: "line" } }

/** `orientation="vertical"`: tabs stack on the left of the panel. */
export const Vertical: Story = { args: { orientation: "vertical" } }

export const VerticalLine: Story = {
  args: { orientation: "vertical", variant: "line" },
}

/** `data-icon="inline-start"` tightens padding next to the icon. */
export const WithIcons: Story = { args: { withIcons: true } }

/** A disabled tab is faded and can't be selected. */
export const DisabledTab: Story = { args: { disableThird: true } }

/** Hover, forced with the pseudo-states addon. */
export const Hover: Story = { parameters: { pseudo: { hover: true } } }

/** `:focus-visible` (keyboard focus): ring color, 3px ring at 50%. */
export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
}

/** Arrow keys move between tabs; Enter selects. */
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const account = canvas.getByRole("tab", { name: "Account" })
    const password = canvas.getByRole("tab", { name: "Password" })
    await userEvent.click(account)
    await userEvent.keyboard("{ArrowRight}")
    await expect(password).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(password).toHaveAttribute("aria-selected", "true")
    await expect(canvas.getByText(/Change your password/)).toBeVisible()
  },
}
