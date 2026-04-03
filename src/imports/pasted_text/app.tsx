Claude,
Before doing anything, re-read /docs/claude.md in full.
Do not rely on memory.
Do not begin implementation until you confirm the files you will modify.
Reminderly is an app, not a rocket ship to Mars. Keep this simple.

Lists feature flag rule
All changes in this instruction must be fully gated behind the existing state variable:
isListsEnabled
When isListsEnabled is false, the application must behave exactly as it does today.
No Lists UI may render and no Lists navigation behaviour may execute.

Change request
Connect the existing Lists tab to a new empty Lists content area.
This change introduces the screen area where Lists will later render.

Files allowed to change
Only this file may be modified:
/src/app/App.tsx
No other files may be edited.
No new files may be created.

Current behaviour
The reminders list currently renders inside /src/app/App.tsx.
The Reminders / Lists tabs already exist in the UI.
The reminders list must remain exactly as it is today when the Reminders tab is active.

Change 1 — active tab state
In /src/app/App.tsx, introduce a new React state variable:
activeMainTab
Allowed values:
'reminders'
'lists'
Initial value must be:
'reminders'

Change 2 — gate Lists tab behaviour
When isListsEnabled is false:
* the Lists tab must not activate the Lists area
* clicking the Lists tab must not change the content area
* the reminders list must continue rendering exactly as it does today
When isListsEnabled is true:
* clicking the Lists tab must set
activeMainTab = 'lists'
* clicking the Reminders tab must set
activeMainTab = 'reminders'

Change 3 — render branch
In /src/app/App.tsx, modify the main content render section.
When:
isListsEnabled === true
AND
activeMainTab === 'lists'
Render the Lists placeholder container.
Otherwise render the reminders list exactly as it currently does.
The reminders list rendering code must remain unchanged.

Change 4 — Lists placeholder
When the Lists tab is active and Lists is enabled, render a placeholder container.
The container must appear in the same area where the reminders list normally renders.
The placeholder must render exactly:
Lists area
No other UI may be added.
Do not implement:
* list cards
* list storage
* list creation
* empty states
* analytics
* dev tools changes

Behaviour rules
With isListsEnabled = false
* the reminders list renders exactly as today
* the Lists tab does not activate the Lists area
With isListsEnabled = true
Reminders tab active:
* reminders list renders
Lists tab active:
* reminders list is hidden
* the placeholder container renders
* the container displays the text
Lists area
Clicking the Reminders tab while Lists is active must return to the reminders list.

Files not allowed to change
Do not modify:
/src/app/config/features.ts
/src/app/utils/featureFlags.ts
/src/app/dev/dev-tools-checks.ts
Do not modify:
* reminder scheduling
* reminder parsing
* reminder storage
* reminder filtering logic
* reminder ordering
* reminder completion behaviour
* tests
* documentation

Verification
Confirm the following:
With isListsEnabled = false
* reminders list renders exactly as today
* Lists area does not render
With isListsEnabled = true
Reminders tab active:
* reminders list renders
Lists tab active:
* reminders list does not render
* placeholder container renders
* container displays
Lists area
Switching tabs must correctly toggle between the two views.

Before proceeding confirm:
1. Only /src/app/App.tsx will be modified
2. activeMainTab will be introduced
3. Lists content rendering will be gated behind isListsEnabled
4. Reminder behaviour will remain unchanged
Do not begin implementation until approval is given.
