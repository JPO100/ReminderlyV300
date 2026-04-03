Update done/deleted placeholders

Objective
Update the placeholder text in the done/deleted view based on the active doneDeletedFilter.

In scope

When doneDeletedFilter === 'all' and the list is empty
Show:

No done or deleted reminders yet...

No secondary line.

When doneDeletedFilter === 'done' and the list is empty
Show:

No done reminders yet...

get busy!

Two lines:

First line exactly: No done reminders yet...

Line break

Second line exactly: get busy!

Keep existing styling structure for title + subtext (do not redesign layout).

When doneDeletedFilter === 'deleted' and the list is empty
Show:

No deleted reminders yet...

Single line only.
No "get busy!" line.

Non-scope

No changes to active list placeholders.

No changes to filtering logic.

No changes to sorting.

No changes to clear-all behaviour.

No changes to animation.

No new components.

Implementation guidance (keep simple)

Update the existing empty-state rendering branch inside the done/deleted view.

Branch purely on doneDeletedFilter.

Do not introduce new components or helper functions.

Files expected to change

/src/app/App.tsx

Update tests only if they assert placeholder text.

Acceptance criteria

Each filter mode shows the correct placeholder copy when empty.

Switching filters updates placeholder text immediately.

No behavioural regressions elsewhere.
