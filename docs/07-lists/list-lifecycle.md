#### Overview

Lists no longer have a single-state lifecycle.

Current list lifecycle includes:

* active
* done
* deleted

These states are stored directly on the list record through `status` and `statusChangedAt`.

#### List states

Active list records use:

* `status: 'active'`
* `status: 'done'`
* `status: 'deleted'`

Saved templates use a separate lifecycle:

* active
* deleted

Saved templates do not use smart reminders or pinning.

#### Create list

Entry points:

* `New list` in the active lists surface
* `Use template` from a saved template

Creation behaviour:

* direct create persists a new `CreatedList`
* template use creates a new active list from template items
* new active lists start with:
  * `sortMode`
  * `pinnedAt: null`
  * `smartReminders: false`
  * `smartReminderDueDate: null`
  * `smartReminderTime: null`
  * `status: 'active'`
  * `statusChangedAt: null`

#### Edit list

Active lists can currently update:

* title
* items
* item checked state
* sort mode
* smart reminder settings

Saved templates can currently update:

* title
* items

Saved templates do not persist checked item state.

#### Mark list as done

Marking a list as done:

* enters a pending done window
* marks all list items completed
* sets list `status` to `done`
* sets `statusChangedAt`
* moves the list into the lists done/deleted archive

If the list has an active linked smart reminder, the linked reminder is also completed through the reminder system.

#### Undo done

Undoing a done list:

* clears all item completion states
* returns the list to `status: 'active'`
* clears `statusChangedAt`
* reinserts the list into the active lists surface
* applies list reinsertion/highlight UI

If the list has a linked completed smart reminder, that reminder is also uncompleted through the reminder system.

#### Delete list

Delete is implemented.

Deleting a list:

* enters a pending deleted window
* sets `status: 'deleted'`
* sets `statusChangedAt`
* removes the list from active lists
* moves the list into the lists done/deleted archive

If the list has a linked smart reminder, the linked reminder is also deleted through the reminder system.

#### Undelete list

Undeleting a list:

* returns the list to `status: 'active'`
* clears `statusChangedAt`
* reinserts the list into the active lists surface
* applies list reinsertion/highlight UI

If the linked smart reminder is deleted, it is restored through the reminder system.

#### Pinning lifecycle

Pinning is feature-flagged behind `Pinned lists`.

Current rules:

* pinning toggles `pinnedAt`
* pinning is persisted on the list record
* pinned lists are shown only in active-list `All`
* pinned lists sort by newest `pinnedAt` first
* unpinning clears `pinnedAt`
* when the feature flag is off, `pinnedAt` remains stored but is ignored in rendering

#### Smart reminder lifecycle

Smart reminders are list-owned configuration that creates a linked reminder.

Current lifecycle:

* enable smart reminders on a list
* set due date and time on the list
* create or edit the linked reminder through the reminders overlay
* complete/delete/restore linked reminders through list sync flows

Smart reminder state is stored on the list:

* `smartReminders`
* `smartReminderDueDate`
* `smartReminderTime`

#### Saved template lifecycle

Saved templates are persisted separately from active lists.

Current saved-template lifecycle includes:

* create
* edit
* use to create active list
* soft-delete
* restore from deleted archive

Template deletion uses a pending delete window before committing `status: 'deleted'`.

#### Persistence

Active lists persist to:

* `reminderly-created-lists`

Saved templates persist to:

* `reminderly-saved-lists`

The active list loader currently migrates older list item formats and older list status shape on hydration.

#### Constraints

Lists remain structurally separate from reminder records, but current implementation does interact with the reminder system through linked smart reminders.

Lists do not use reminder repeat rules directly.

#### Related documentation

* `/docs/07-lists/lists-overview.md`
* `/docs/07-lists/list-ui-and-interactions.md`
