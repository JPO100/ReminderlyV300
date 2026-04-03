Delta changes to done/deleted filter menu and clear all behaviour (keep implementation minimal)

Do only the items below. Do not refactor, generalise, or build reusable systems. Implement this surgically inside App.tsx.

Active text colour for Done and Deleted buttons only
In done/deleted view only:

When Done is active, its label text colour must be reminderly dark blue.

When Deleted is active, its label text colour must be reminderly dark blue.

Inactive state stays unchanged.

Do not change any colours for the main active-list filters.

Rename clear list to clear all
Rename button labels only:

Clear all

Clear all?

Cleared!

No other copy changes.

Cancel clear confirmation on any outside click
When Clear all is in step 1 (Clear all?) or step 2 (Cleared!), any click anywhere that is not on the Clear all button must reset it immediately back to default (step 0).

Keep this extremely simple:

Wrap the done/deleted filter row in a single container div.

On that container, add onPointerDownCapture (or onMouseDownCapture).

If clearAllStep is 1 or 2 and the event target is not inside the Clear all button element, reset:

clearAllStep = 0

cancel and clear any clearAllTimerRef

Add stopPropagation on the Clear all button’s pointerdown so clicks on the button itself do not trigger the container reset.

Do not add document-level listeners. No refs beyond the Clear all button ref if you need it, but prefer stopPropagation + capture handler.

This one handler must cover:

Clicking Done or Deleted cancels step 1 or 2

Clicking anywhere else cancels step 1 or 2

In step 2, cancellation must be immediate (do not force the 500ms delay)

Keep the existing 500ms timer as a fallback only if the user does nothing after step 2.

After clearing, reset filters to default “all”
When Clear all executes (step 2 click that actually clears):

Immediately set doneDeletedFilter = 'all'

Immediately set clearAllStep = 2 (Cleared!)

The button then returns to default via either:

outside click cancellation, or

500ms fallback timer

Net result: after clearing, Done and Deleted are inactive (default all mode).

Deleted empty placeholder text
Only when doneDeletedFilter === 'deleted' and the filtered list is empty (including pending visual items as you already do):

Show placeholder text:

No deleted reminders yet...

Do not change other empty placeholders.

Non-scope (explicit)

No new shared components.

No new event bus, hooks, or abstractions.

No document-level listeners.

No changes to clear target set, sorting, or cadence logic.

Tests (keep minimal)
Update existing tests or add only what is necessary for:

Clear all label changes

Outside click cancels step 1 and step 2

Clear all resets doneDeletedFilter to 'all'

Deleted placeholder text in deleted-empty state