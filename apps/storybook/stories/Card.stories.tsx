import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@act-jirayut/dsai"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: { size: "default" },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "sm"],
      description: "Inner spacing: 24px (default) or 16px (sm)",
      table: { defaultValue: { summary: "default" } },
    },
    className: {
      control: "text",
      description: "Extra classes, merged last so they win",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Header, content and footer; every prop is editable in Controls. */
export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Team plan</CardTitle>
        <CardDescription>Shared workspace for up to 10 people.</CardDescription>
      </CardHeader>
      <CardContent>
        Includes unlimited projects, version history and priority support.
      </CardContent>
      <CardFooter>
        <Button size="sm">Upgrade</Button>
      </CardFooter>
    </Card>
  ),
}

/** `size="sm"`: 16px spacing for dense layouts. */
export const Small: Story = { ...Playground, args: { size: "sm" } }

/** An action sits top-right, beside the title and description. */
export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>3 unread since yesterday.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Mark all read
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>Your export finished and is ready to download.</CardContent>
    </Card>
  ),
}

/** `border-b` on the header and `border-t` on the footer add a divider and matching padding. */
export const WithDividers: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader className="border-b">
        <CardTitle>Billing</CardTitle>
        <CardDescription>Next invoice on 1 December.</CardDescription>
      </CardHeader>
      <CardContent>Visa ending 4242 · ฿1,290 / month</CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        <Button variant="outline" size="sm">
          Cancel plan
        </Button>
        <Button size="sm">Update card</Button>
      </CardFooter>
    </Card>
  ),
}

/** Only a title and text: the smallest useful card. */
export const Minimal: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Supporting description text.</CardDescription>
      </CardHeader>
    </Card>
  ),
}
