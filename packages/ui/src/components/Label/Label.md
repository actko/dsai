# Label

## Purpose

The visible name of a form control, which also makes the control easier to click.

## Import and use

Requires React 19 and Tailwind CSS v4. Install the package (TODO: `@act-jirayut/dsai` is not published to npm yet; inside this repo it is a workspace dependency):

```bash
pnpm add @act-jirayut/dsai
```

Once per app, import the stylesheet right after Tailwind in your global CSS:

```css
@import "tailwindcss";
@import "@act-jirayut/dsai/styles.css";
```

Then import the component. Link it to a field with `htmlFor` and the field's `id`, or wrap a checkbox or switch:

```tsx
import { Checkbox, Input, Label } from "@act-jirayut/dsai"

<Label htmlFor="name">Full name</Label>
<Input id="name" />

<Label>
  <Checkbox />
  Email me about product updates
</Label>
```

## When to use

- Every Input, Textarea, Checkbox and Switch, so people and screen readers know what it is for.
- Wrapped around a checkbox or switch, so clicking the text toggles it.

## When not to use

- **As a heading or for general text.** Use normal text styles.
- **To show help or an error message under a field.** TODO: no field description or error-message component exists yet.
- **Placeholder text instead of a label.** A placeholder disappears as soon as someone types; always use a Label.

## Props and variants

| Prop      | Values                                    | Default | Notes                                                        |
| --------- | ----------------------------------------- | ------- | ------------------------------------------------------------ |
| `htmlFor` | the `id` of a field                       | —       | Links the label to that field; clicking the label focuses it |
| content   | text, optionally with a control before it | —       | Text and a wrapped control sit in a row with an 8px gap      |

All other native `<label>` attributes work as usual.

There is **one style**: small medium-weight text with no extra line spacing, not selectable. It has no states of its own; it **dims to 50%** and ignores clicks when a surrounding element is marked disabled (`data-disabled="true"`).

## Tokens used

Label sets no colors of its own; it inherits the surrounding text color. Text uses the app's sans font (`--font-sans`).

## Example

From the `WithInput` story:

```tsx
<div className="grid w-72 gap-2">
  <Label htmlFor="name">Full name</Label>
  <Input id="name" placeholder="Jane Doe" />
</div>
```
