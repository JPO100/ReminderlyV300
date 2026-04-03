scope

Create a new dev tools page for lists.

Lists dev tools must remain structurally separate from reminders dev tools.

Do not add any lists functionality inside:

/src/imports/DummyReminders.tsx

The existing Dummy reminders page must remain unchanged.

files

Create the following new file:

/src/imports/DummyLists.tsx

Modify only the following existing file:

/src/imports/DevToolsOverlay.tsx

No other files may be modified.

dev tools navigation

Inside /src/imports/DevToolsOverlay.tsx add a new dev tools menu entry.

Label:

Dummy lists

Selecting Dummy lists must open the new page implemented in:

/src/imports/DummyLists.tsx

Do not modify the existing Dummy reminders entry.

page title

At the top of /src/imports/DummyLists.tsx render the page title:

Dummy lists

Use the same title styling used by the Dummy reminders page title.

controls

Render exactly four controls under the page title in the following order:

1. Number of lists
2. Max number of list items
3. Include done list items
4. Clear lists

control definitions

Number of lists
Type: numeric input
Initial value: 0

Max number of list items
Type: numeric input
Initial value: 0

Include done list items
Type: toggle
Initial value: OFF

Clear lists
Type: button
Behaviour: no action

ui reuse rules

Reuse the same UI patterns used in:

/src/imports/DummyReminders.tsx

Numeric inputs
Reuse the same numeric input styling used for numeric inputs on the Dummy reminders page.

Toggle
Reuse the same toggle element and row pattern used by the Hide overdue reminders control.

Button
Reuse the same button styling used by the Clear reminders button.

Layout
Reuse the same page layout pattern, row spacing, typography, and alignment used by the Dummy reminders page.

Do not introduce:

* new UI components
* new styling systems
* new layout systems
* shared abstractions
* refactors
* wrapper components

lists feature toggle behaviour

Inside /src/imports/DummyLists.tsx import:

isListsEnabled

from:

featureFlags.ts

If isListsEnabled() returns false:

Disable the following controls:

* Number of lists
* Max number of list items
* Include done list items
* Clear lists

If isListsEnabled() returns true:

Enable all four controls.

Disabled styling must match the disabled styling used in:

/src/imports/DummyReminders.tsx

state rules

Inside /src/imports/DummyLists.tsx create local component state for:

Number of lists
Max number of list items
Include done list items

Initial values:

Number of lists = 0
Max number of list items = 0
Include done list items = OFF

Do not connect these controls to:

App.tsx
createdLists
list creation logic
reminder logic
persistence
callbacks
dummy list generation

The Clear lists button must render but must perform no action.

non-scope

The following changes are not allowed:

Editing /src/imports/DummyReminders.tsx
Editing App.tsx
Editing featureFlags.ts
Editing reminder logic files
Editing list creation logic files
Editing documentation files
Editing test files
Adding persistence
Adding dummy list generation
Refactoring existing code
Adding shared abstractions

verification

After implementation confirm all of the following:

Only the following files were modified or created:

/src/imports/DummyLists.tsx
/src/imports/DevToolsOverlay.tsx

/src/imports/DummyReminders.tsx was not modified.

Dummy lists appears as a separate entry in the dev tools menu.

Selecting Dummy lists opens the Dummy lists page.

The Dummy lists page title reads:

Dummy lists

The page contains exactly four controls in the following order:

Number of lists
Max number of list items
Include done list items
Clear lists

Number of lists initial value is 0.

Max number of list items initial value is 0.

Include done list items initial value is OFF.

Clear lists renders as a button and performs no action.

All four controls are disabled when isListsEnabled() returns false.

All four controls are enabled when isListsEnabled() returns true.

The numeric inputs match the styling used in the Dummy reminders page.

The toggle matches the styling used by Hide overdue reminders.

The Clear lists button matches the styling used by Clear reminders.

No reminder functionality was modified.
