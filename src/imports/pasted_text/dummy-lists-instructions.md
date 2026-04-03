scope confirmation

Scope confirmed with the following clarifications applied. Proceed using these instructions only.

files allowed to be modified

/src/imports/DummyReminders.tsx

No other files may be modified.

section placement

Add the Dummy lists section inside /src/imports/DummyReminders.tsx.

Render the Dummy lists section directly below the final row of the existing Dummy reminders controls and above the Clear reminders button.

Do not move, modify, or reorder any existing Dummy reminders controls.

section title

Add a visible text label:

Dummy lists

Use the same typography style used for the "Hide overdue reminders" row label.

controls to add

Add exactly four controls under the Dummy lists label in the following order.

Control 1
Label: Number of lists
Type: Numeric input field

Control 2
Label: Max number of list items
Type: Numeric input field

Control 3
Label: Include done list items
Type: Toggle

Control 4
Label: Clear lists
Type: Button

ui element reuse rules

All UI elements must reuse the existing UI elements already present in DummyReminders.tsx.

Numeric inputs
Reuse the same numeric input element used for the numeric fields in the Dummy reminders controls.

Toggle
Reuse the exact same toggle component used by the Hide overdue reminders control.

Button
Reuse the exact same button element used by the Clear reminders button.

Spacing
Reuse the same vertical spacing used between existing control rows.

Label typography
Reuse the same typography used by the Hide overdue reminders row label.

Do not create new components, wrappers, layout patterns, or styling.

lists feature toggle behaviour

Import isListsEnabled from featureFlags.ts inside /src/imports/DummyReminders.tsx.

Do not modify DevToolsOverlay.tsx.

Do not pass props.

Use a direct call to isListsEnabled() inside DummyReminders.tsx.

enabled / disabled behaviour

If isListsEnabled() returns false:

Disable the following controls:

Number of lists numeric input
Max number of list items numeric input
Include done list items toggle
Clear lists button

Disabled behaviour must match the disabled behaviour already used for other disabled dev tool controls.

state behaviour

All four controls must be UI-only.

Do not connect the controls to:

createdLists
list creation logic
reminder logic
persistence
App.tsx
any callbacks

numeric input behaviour

Both numeric inputs must store their values in local component state inside DummyReminders.tsx.

Initial values:

Number of lists = 0
Max number of list items = 0

toggle behaviour

Include done list items must use local component state.

Initial value: OFF

clear lists button behaviour

The Clear lists button must perform no action.

The button must render using the same UI pattern as the Clear reminders button but must not trigger any logic.

non-scope

The following changes are explicitly not allowed:

Editing App.tsx
Editing DevToolsOverlay.tsx
Editing featureFlags.ts
Editing reminder logic
Editing list creation logic
Adding new UI components
Refactoring existing UI
Adding persistence
Adding dummy list generation
Changing existing Dummy reminders behaviour
Changing existing Clear reminders behaviour
Changing documentation
Changing tests

verification

Confirm the following after implementation.

Dummy lists label appears below the final Dummy reminders control row.

Four controls appear below the label in this order:

Number of lists
Max number of list items
Include done list items
Clear lists

Numeric inputs visually match the existing numeric inputs used by Dummy reminders.

The toggle visually matches the Hide overdue reminders toggle.

The Clear lists button visually matches the Clear reminders button.

All four controls are disabled when isListsEnabled() returns false.

All four controls are enabled when isListsEnabled() returns true.

Only /src/imports/DummyReminders.tsx was modified.
