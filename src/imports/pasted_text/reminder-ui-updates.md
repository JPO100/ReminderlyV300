Claude,
Before doing anything, re-read /docs/claude.md in full.
Do not rely on memory.
Do not begin implementation until you confirm the files you will modify.

Lists feature flag rule
All changes in this instruction must be fully gated behind:
isListsEnabled()
When isListsEnabled() returns false, the application must behave exactly as it does today.
No layout, styling, or behaviour may change unless isListsEnabled() returns true.

Change request Introduce Lists-mode UI adjustments for the reminders screen.
Reminderly is an app, not a rocket ship to Mars. Keep the implementation simple.

Files allowed to change
Only these files may be modified:
/src/app/App.tsx
/src/imports/DevTools.tsx
/src/app/components/ReminderListContainer.tsx
/src/app/components/FiltersMenu.tsx
No other files may be edited.
No new files may be created.

Files not allowed to change
Do not modify:
/src/app/config/features.ts
/src/app/utils/featureFlags.ts
/src/app/dev/dev-tools-checks.ts
Do not modify tests or documentation.

Change 1 — Dev Tools Filters toggle
File:
/src/imports/DevTools.tsx
When isListsEnabled() returns true:
1. The Filters toggle must be forced to Standard.
2. The toggle must become disabled.
Disabled state must be implemented exactly as:
opacity: 0.5
pointer-events: none
The toggle must not respond to clicks.
When isListsEnabled() returns false, the toggle must behave exactly as it currently does.

Change 2 — Move Filters menu into the reminders container
Files:
/src/app/App.tsx
/src/app/components/ReminderListContainer.tsx
When isListsEnabled() returns true:
Render the FiltersMenu component inside the ReminderListContainer.
Placement rules:
ReminderListContainer
 ├─ FiltersMenu
 └─ Reminder list
Spacing requirements:
Top of container → FiltersMenu
24px
FiltersMenu → first reminder item
32px
When isListsEnabled() returns false, the FiltersMenu must render in its current location.

Change 3 — Filters menu styling
File:
/src/app/components/FiltersMenu.tsx
When isListsEnabled() returns true:
Apply the following styling changes to filter pills.
1. Replace all instances of:
#FFFFFF
with the existing Reminderly blue token currently used for selected UI elements.
1. Remove the pill background fills.
The pills must display:
* blue text
* no background fill
* existing border
* existing typography
Do not change:
* pill size
* typography
* spacing
* hover behaviour
* filter logic
When isListsEnabled() returns false, the styling must remain exactly as it currently is.

Behaviour rules
This change must not alter:
* reminder scheduling
* reminder parsing
* reminder storage
* reminder filtering logic
* reminder ordering
* reminder completion behaviour
The only behavioural change allowed is disabling the Dev Tools Filters toggle when Lists is enabled.

Verification
Confirm the following.
With isListsEnabled() false:
* UI renders exactly as today
* Filters menu location unchanged
* Filters styling unchanged
* Dev Tools Filters toggle works normally
With isListsEnabled() true:
* Dev Tools Filters toggle is disabled
* Filters default to Standard
* Filters menu renders inside ReminderListContainer
* 24px space above the Filters menu
* 32px space between Filters menu and reminder list
* Filter pills use Reminderly blue text
* Filter pills have no background fill

Before proceeding confirm:
1. The four files you will modify
2. That all changes will be gated behind isListsEnabled()
3. That no behaviour changes occur when the flag is false
Do not begin implementation until approval is given.
