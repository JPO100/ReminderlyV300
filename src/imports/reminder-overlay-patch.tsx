Claude - regression patch only. Follow these instructions exactly. Do not expand scope, redesign components, refactor unrelated code, or introduce new behaviour.

Goal

Restore the correct reminder info overlay and empty list behaviour that existed in v2-698 while preserving all newer code present in v2-873.

Confirmed source of truth

The correct implementation exists in:

* v2-698/src/app/components/ReminderInfoOverlay.tsx

The current broken implementation exists in:

* v2-873/src/app/components/ReminderInfoOverlay.tsx

The regression occurred because the functional component was overwritten by a static onboarding mock.

Required behaviour after the patch

1. Clicking a reminder status icon must open the reminder info overlay for that reminder.
2. The overlay must display the selected reminder’s content and actions:

   * Mark as done
   * Edit
   * Delete
3. When the active list is empty, only the correct placeholder message must appear for the current filter:

   * all
   * today
   * this week
   * later
   * sometime
4. The onboarding tutorial must continue to display the same visual mock overlay it currently shows.
5. The onboarding tutorial must not use the live ReminderInfoOverlay component.

Implementation rules

1. Restore the production overlay component.

Replace the contents of:

/src/app/components/ReminderInfoOverlay.tsx

with the implementation from:

v2-698/src/app/components/ReminderInfoOverlay.tsx

Copy the implementation exactly. Do not modify its structure, behaviour, styling, or props interface.

2. Do not change the calling side.

Do not modify the code in App.tsx that mounts or calls ReminderInfoOverlay unless the restored component requires a strictly necessary compatibility adjustment. If such an adjustment is required, keep it minimal and limited to the mount block only.

3. Isolate the onboarding tutorial from the production component.

In:

/src/app/components/OnboardingPage6Content.tsx

remove the import of the production component:

import ReminderInfoOverlay from "@/app/components/ReminderInfoOverlay"

Replace this usage with a tutorial-only static mock component that reproduces the same visual currently shown in the tutorial.

This mock must:

* live inside OnboardingPage6Content.tsx or in a new file under /src/app/components/
* remain visual-only
* accept no props
* not be imported anywhere outside the onboarding tutorial
* not use the path /src/app/components/ReminderInfoOverlay.tsx

The tutorial’s visual appearance must remain unchanged.

4. Do not modify empty-state logic.

Do not change the existing empty-list rendering logic in App.tsx. The correct placeholder behaviour already exists and must remain unchanged.

5. Do not introduce additional changes.

Do not:

* refactor ReminderInfoOverlay
* modify reminder filtering or scheduling logic
* modify overlay systems
* modify onboarding behaviour
* introduce new abstractions
* introduce new dependencies
* change placeholder text
* modify styling beyond what exists in v2-698 for the overlay component

Files expected to change

Only these files should change:

* /src/app/components/ReminderInfoOverlay.tsx
* /src/app/components/OnboardingPage6Content.tsx

A new tutorial-only mock component file may be created only if required to isolate the tutorial overlay.

Acceptance criteria

1. Clicking a reminder status icon opens a working reminder info overlay.
2. The overlay displays the selected reminder’s real content.
3. Mark as done works.
4. Edit works.
5. Delete works.
6. Clicking outside the overlay closes it.
7. Pressing Escape closes it.
8. Clearing the reminders list shows only the correct empty-state message.
9. No hardcoded tutorial reminder text appears anywhere in the live app.
10. The onboarding tutorial continues to display the same visual overlay as before.

Output format

Return the result in this format:

A. Files changed
B. What was restored from v2-698
C. How the onboarding tutorial was isolated from the production component
D. Confirmation that each acceptance criterion is satisfied
