#### Overview

Lists are a separate top-level app surface alongside reminders.

Lists support:

* user-created active lists
* saved list templates
* smart reminders linked to lists
* pinning in the active `All` lists view
* done and deleted list states

Lists do not use reminder scheduling or repeat rules directly, but they can create and sync smart reminders in the reminders system.

#### Access

Lists are gated by the Lists feature flag.

When lists are enabled:

* the main tab bar shows `Reminders` and `Lists`
* the lists surface uses the same overall app shell as reminders
* the header tick switches between active lists and the lists done/deleted archive

#### Data model

Active lists use the `CreatedList` model.

Current stored fields include:

* `id`
* `title`
* `items`
* `sortMode`
* `pinnedAt`
* `smartReminders`
* `smartReminderDueDate`
* `smartReminderTime`
* `status`
* `statusChangedAt`

Saved templates use a separate `SavedListTemplate` model and live in a separate persisted collection.

#### Active lists surface

The active lists view supports:

* category-based filtering
* pinning to the top of the `All` view
* inline progress display
* smart reminder status display
* row menu actions through the list info overlay

Current active list filters are:

* `All`
* `Complete`
* `Almost`
* `Started`
* `Todo`

When the saved lists feature flag is enabled, `Started` behaves as a grouped bucket and includes both `started` and `almost` lists.

#### Saved templates

Saved templates are a separate lists subsystem.

Current capabilities include:

* create a template from an existing list
* create a template directly in the saved-lists overlay
* use a template to create a new active list
* edit a template
* soft-delete a template

The saved templates panel is rendered inside the lists tab, not inside reminders.

#### Smart reminders

Lists can optionally own a smart reminder.

A smart reminder:

* is enabled per list
* stores due date and time on the list
* creates a linked reminder in the reminders dataset
* can be opened from the list info overlay
* syncs with list done/delete and restore flows through linked reminder actions

#### Related documentation

* `/docs/07-lists/list-lifecycle.md`
* `/docs/07-lists/list-ui-and-interactions.md`
