Claude,
Before doing anything, re-read /docs/Claude.md in full.
Do not rely on memory.
Reminderly is an app, not a rocket ship to Mars. Keep this implementation simple and lightweight.
Do not begin implementation until you confirm the scope exactly as written.

Lists feature flag rule
All changes in this instruction must be fully gated behind the existing state variable:
isListsEnabled
When isListsEnabled === false, the application must behave exactly as it does today.

Objective
On the Lists tab, implement the same layout structure used by the Reminders tab:
* a scrollable content container
* a bottom-anchored action button
This layout must exist only when:
isListsEnabled === true AND activeMainTab === 'lists' AND viewMode !== 'lists-done'

Files allowed to change
Only this file may be modified:
/src/app/App.tsx
No other files may be edited.
No new files may be created.

Existing state variables
The following variables already exist in App.tsx and must be used exactly as they are:
isListsEnabled
activeMainTab
viewMode
activeMainTab values:
'reminders'
'lists'

Change 1 — Replace the Lists placeholder
Locate the render branch that currently outputs the placeholder text:
Lists area
Replace this placeholder with the layout described below.

Change 2 — Scrollable container
Inside the Lists render branch, create a scrollable container that follows the same structure used by the reminders list container.
The container must:
* occupy the same vertical area used by reminder cards
* scroll vertically
* use the same padding and spacing rules as the reminders container
* not introduce new layout tokens or spacing values
Inside the scroll container insert one placeholder list item.

Change 3 — Placeholder list item
Insert exactly one placeholder list item using the following structure.
Layout:
Left column:
* empty circular checkbox element
Right column:
two lines of text.
Text values must be exactly:
Title:
Spaghetti bolognese recipe
Subtitle:
6 of 12 items completed
This element is static UI only.
Do not add:
* click handlers
* state
* list models
* completion logic
* storage

Change 4 — Bottom action button
Add a button at the bottom of the viewport.
The button must follow the same positioning pattern used by the existing “Add reminder” button.
The button text must be exactly:
Add new list
The button must have no click handler.
This button is a placeholder only.

Render conditions
When
isListsEnabled === false
the UI must behave exactly as it does today.
When
isListsEnabled === true
AND activeMainTab === 'lists'
AND viewMode !== 'lists-done'
render:
* scrollable lists container
* placeholder list item
* bottom “Add new list” button
When
viewMode === 'lists-done'
the previously implemented placeholder:
Lists done area
must continue to render exactly as before.

Explicit non-scope
Do not modify:
/src/app/config/features.ts
/src/app/utils/featureFlags.ts
/src/app/dev/dev-tools-checks.ts
Do not modify:
* reminder scheduling
* reminder parsing
* reminder storage
* reminder filtering
* reminder ordering
* reminder completion behaviour
* feature flags
* dev tools
* tests
* documentation
Do not introduce:
* new components
* new files
* list data models
* list storage
* list completion logic

Verification
Confirm the following behaviour:
With
isListsEnabled = false
the UI behaves exactly as today.
With
isListsEnabled = true
AND activeMainTab = 'lists'
AND viewMode !== 'lists-done'
the Lists tab shows:
* scrollable container
* placeholder list item
* bottom “Add new list” button
With
viewMode = 'lists-done'
the previously implemented placeholder:
Lists done area
continues to render.

Before proceeding confirm:
1. Only /src/app/App.tsx will be modified
2. Lists layout is fully gated behind isListsEnabled
3. Reminder behaviour remains unchanged
4. No new files will be created
