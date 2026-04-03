scope

Create a new separate dev tools page for lists.

Lists dev tools must remain structurally separate from reminders dev tools.

Do not add any lists UI, state, or controls inside:

/src/imports/DummyReminders.tsx

The existing Dummy reminders page must remain unchanged.

files

Create this new file:

/src/imports/DummyLists.tsx

Modify only these existing files:

/src/imports/DevTools.tsx
/src/app/components/DevToolsOverlay.tsx

No other files may be modified.

dev tools menu entry

In /src/imports/DevTools.tsx add one new NavRow entry with this exact label:

Dummy lists

Place this new NavRow directly below the existing Dummy reminders NavRow.

Selecting this NavRow must call a new navigation callback prop dedicated to the Dummy lists page.

Do not modify the label, order, behaviour, styling, or callbacks of any existing NavRow entries other than adding this one new entry and the one new prop required to support it.

overlay routing

In /src/app/components/DevToolsOverlay.tsx add routing for the new Dummy lists page.

Add one new view state value for Dummy lists.

When that view state is active, render:

/src/imports/DummyLists.tsx

Wire the new navigation callback from /src/imports/DevTools.tsx to activate that Dummy lists view.

Do not modify any existing routes, page behaviour, back behaviour, labels, or navigation flows other than what is strictly required to add the new Dummy lists page.

page title

At the top of /src/imports/DummyLists.tsx render this exact title:

Dummy lists

Use the same title styling and top-level page structure used by the Dummy reminders page.

controls

Render exactly four controls below the page title in this exact order:

1. Number of lists
2. Max number of list items
3. Include done list items
4. Clear lists

Do not add any other controls, labels, descriptions, helper text, icons, or tooltips.

control definitions

Number of lists

* Type: numeric input
* Initial value: 0

Max number of list items

* Type: numeric input
* Initial value: 0

Include done list items

* Type: toggle
* Initial value: OFF

Clear lists

* Type: button
* Behaviour: no action

ui reuse rules

Reuse the same UI patterns already used in:

/src/imports/DummyReminders.tsx

Numeric inputs

* Reuse the same numeric input styling used on the Dummy reminders page

Toggle

* Reuse the same toggle element and toggle row pattern used by the Hide overdue reminders control

Button

* Reuse the same button styling used by the Clear reminders button

Layout

* Reuse the same page layout structure, spacing, typography, row spacing, and alignment used by the Dummy reminders page

Do not introduce:

* new UI components
* shared abstractions
* refactors
* new styling systems
* new layout systems
* wrapper components beyond the minimum required page structure

lists feature toggle behaviour

Inside /src/imports/DummyLists.tsx import and use:

isListsEnabled

from the existing feature flags file already used by the app.

If isListsEnabled() returns false:

* Disable Number of lists
* Disable Max number of list items
* Disable Include done list items
* Disable Clear lists

If isListsEnabled() returns true:

* Enable all four controls

Apply disabled treatment using:

style={{ opacity: 0.5, pointerEvents: 'none' }}

Apply that disabled treatment to the controls area of the Dummy lists page only.

Do not apply disabled treatment anywhere else.

state rules

Inside /src/imports/DummyLists.tsx create local component state only for:

* Number of lists
* Max number of list items
* Include done list items

Initial values:

* Number of lists = 0
* Max number of list items = 0
* Include done list items = OFF

Do not connect these controls to:

* App.tsx
* createdLists
* reminder logic
* list creation logic
* persistence
* callbacks
* dummy list generation

Clear lists must render as a button only and must perform no action.

non-scope

The following changes are not allowed:

* Editing /src/imports/DummyReminders.tsx
* Editing App.tsx
* Editing feature flags
* Editing reminder logic files
* Editing list creation logic files
* Editing documentation files
* Editing test files
* Adding persistence
* Adding dummy list generation
* Wiring Clear lists to any action
* Refactoring existing code
* Adding shared abstractions
* Modifying existing Dummy reminders behaviour
* Modifying existing dev tools behaviour except the single new Dummy lists entry and the single new Dummy lists route

verification

After implementation confirm all of the following:

* Only these files were modified or created:

  * /src/imports/DummyLists.tsx
  * /src/imports/DevTools.tsx
  * /src/app/components/DevToolsOverlay.tsx
* /src/imports/DummyReminders.tsx was not modified
* Dummy lists appears as a separate dev tools menu entry directly below Dummy reminders
* Selecting Dummy lists opens the Dummy lists page
* The Dummy lists page title reads exactly:

  * Dummy lists
* The page contains exactly four controls in this order:

  * Number of lists
  * Max number of list items
  * Include done list items
  * Clear lists
* Number of lists initial value is 0
* Max number of list items initial value is 0
* Include done list items initial value is OFF
* Clear lists renders as a button and performs no action
* All four controls are disabled when isListsEnabled() returns false
* All four controls are enabled when isListsEnabled() returns true
* The numeric inputs match the styling used on the Dummy reminders page
* The toggle matches the Hide overdue reminders control pattern
* The button matches the Clear reminders button styling
* No existing reminder functionality was modified
