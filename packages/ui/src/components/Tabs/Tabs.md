# Tabs

## Purpose

Switches between related views of the same subject in one place, showing one panel at a time.

## Import and use

Requires React 19 and Tailwind CSS v4. Install the package (TODO: `@dsai/ui` is not published to npm yet; inside this repo it is a workspace dependency):

```bash
pnpm add @dsai/ui
```

Once per app, import the stylesheet right after Tailwind in your global CSS:

```css
@import "tailwindcss";
@import "@dsai/ui/styles.css";
```

Then import the parts and compose them. Each tab and its panel share a `value`; `defaultValue` picks the tab shown first:

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dsai/ui"

;<Tabs defaultValue="overview">
  <TabsList variant="line">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Project summary…</TabsContent>
  <TabsContent value="activity">Recent changes…</TabsContent>
</Tabs>
```

## When to use

- Split one subject into a few related views at the same level: "Account / Password / Notifications", "Overview / Activity / Settings".
- Users need only one view at a time and switch between them freely.
- Saving space on a page or in a panel, where all views would otherwise be stacked and long.

## When not to use

- **To move between pages or sections of the app.** Use navigation links; tabs change content in place, not the URL. TODO: no navigation menu component exists yet.
- **For steps that must happen in order** (checkout, onboarding). Use a stepper or separate pages. TODO: no Stepper component exists yet.
- **When users need to compare views side by side.** Show the content together instead.
- **To switch a setting or filter** (List/Grid, Monthly/Yearly). Use a segmented control or toggle group. TODO: no toggle group component exists yet.
- **For a single view, or many views.** Two to about five tabs work best. Labels never wrap and the list doesn't scroll, so long or many tabs will overflow. TODO: confirm a maximum tab count and whether overflow scrolling is planned.
- **To hide required form fields.** People miss errors in tabs they can't see; keep required fields visible.

## Props and variants

A tab set is built from parts:

| Part    | Role                                                       |
| ------- | ---------------------------------------------------------- |
| Tabs    | Wraps everything; holds which tab is active and the layout |
| List    | The row (or column) of tabs                                |
| Trigger | One tab; selecting it shows its panel                      |
| Content | One panel, shown while its tab is active                   |

Props:

| On      | Prop                      | Values                   | Default      | Notes                                                                                            |
| ------- | ------------------------- | ------------------------ | ------------ | ------------------------------------------------------------------------------------------------ |
| Tabs    | `defaultValue`            | a tab's `value`          | `0`          | Tab shown first. Set it whenever tabs use names as values, or nothing is selected                |
| Tabs    | `value` / `onValueChange` | a tab's `value`          | —            | Active tab, when the app controls it                                                             |
| Tabs    | `orientation`             | `horizontal`, `vertical` | `horizontal` | `vertical` stacks the tabs in a column beside the panel; arrow keys follow the direction         |
| List    | `variant`                 | `default`, `line`        | `default`    | See below                                                                                        |
| List    | `activateOnFocus`         | `true` / `false`         | `false`      | `false`: arrow keys move focus and Enter/Space selects. `true`: moving focus selects immediately |
| List    | `loopFocus`               | `true` / `false`         | `true`       | Arrow keys wrap from the last tab to the first                                                   |
| Trigger | `value`                   | a name or number         | —            | Must match its panel's `value`                                                                   |
| Trigger | `disabled`                | `true` / `false`         | `false`      | Faded and can't be selected                                                                      |
| Content | `value`                   | a name or number         | —            | Must match its tab's `value`                                                                     |
| Content | `keepMounted`             | `true` / `false`         | `false`      | Keep a hidden panel's content on the page (preserves form input when switching tabs)             |

| Variant   | Looks like                                                               | Use for                                            |
| --------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| `default` | Tabs sit in a rounded muted track; the active tab is a raised pill       | Compact switchers inside cards, panels and dialogs |
| `line`    | No track; the active tab gets a 2px underline (a side bar when vertical) | Page-level sections with more room                 |

Size and layout:

- **Horizontal:** the list is 36px tall with a 3px inset and is only as wide as its tabs; tabs share that width equally.
- **Vertical:** tabs stack full width, left-aligned, and sit to the left of the panel.
- **Text and icons:** labels use small medium-weight text and never wrap. Icons are 16px; place them before or after the label.
- **Corners:** the default track is fully rounded (less rounded when vertical); the `line` list has square corners.

States:

- **Inactive:** label at 60% of the text color (muted in dark mode).
- **Hover:** label turns full text color.
- **Active:** `default` — raised pill with the page background (in dark mode, a subtle bordered fill); `line` — underline appears.
- **Keyboard focus:** border, 1px outline and 3px soft ring in the `ring` color.
- **Disabled:** 50% opacity, can't be selected.
- Light and dark themes are both supported.

## Tokens used

| Token                | Used by                                                                        | Light                      | Dark                       |
| -------------------- | ------------------------------------------------------------------------------ | -------------------------- | -------------------------- |
| `--muted`            | `default` track background                                                     | `oklch(0.963 0.002 197.1)` | `oklch(0.275 0.011 216.9)` |
| `--muted-foreground` | List text; inactive tab label in dark mode                                     | `oklch(0.56 0.021 213.5)`  | `oklch(0.723 0.014 214.4)` |
| `--foreground`       | Tab label (60% inactive, full on hover/active), `line` underline               | `oklch(0.148 0.004 228.8)` | `oklch(0.987 0.002 197.1)` |
| `--background`       | Active tab pill (`default`, light mode)                                        | `oklch(1 0 0)`             | `oklch(0.148 0.004 228.8)` |
| `--input`            | Active tab border and 30% fill (`default`, dark mode)                          | `oklch(0.925 0.005 214.3)` | `oklch(1 0 0 / 15%)`       |
| `--ring`             | Focus border, outline and ring (50%)                                           | `oklch(0.723 0.014 214.4)` | `oklch(0.56 0.021 213.5)`  |
| `--radius`           | Track corners (`radius × 2.6`, `× 1.8` vertical), tab corners (`radius × 1.4`) | `0.875rem`                 | `0.875rem`                 |

Text uses the app's sans font (`--font-sans`).

## Example

From the `Default` story: two related account views, the first shown by default.

```tsx
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
```
