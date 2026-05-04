# Reminder Info Overlay

## Overview

The reminder info overlay shows the selected reminder in a centered modal and exposes reminder actions such as done, edit, delete, list navigation for smart reminders, and overdue deferral.

## Access

- opens from the reminder status icon in the active reminders surface
- is driven by `infoReminder` in `App.tsx`
- is not used for reminders in the done/deleted archive

## Overlay Behaviour

### Presentation

The component itself renders as a centered modal, not a bottom sheet:

- fixed full-screen backdrop: `bg-black/50`
- centered white modal panel
- fixed width: `340px`
- closes on backdrop click
- closes on `Escape`
- focuses the panel on mount
- locks background scrolling while mounted

## Content

### Title

- uses `reminder.displayText`
- removes a trailing `at <time>` segment with `stripTrailingTitleTime()`
- supports wrapped, multi-line text

### Due Line

The primary subtitle is produced by `formatDueLine()`:

- `No schedule set` for reminders without date and time
- `Due <date>`
- `Due <date> at <time>`
- `Due at <time>`
- `Was due ...` when the reminder is overdue

The due line switches to overdue red when `isOverdue()` returns true.

### Smart Reminder Progress

When the reminder is a smart reminder and the linked list can be resolved:

- a grey progress line is shown under the due line
- format: `<completedCount> of <totalCount> items`

### Repeats Line

When a repeat rule exists:

- a separate grey repeats line is shown
- text comes from `formatRepeatRuleText(...)`
- the line is prefixed as `Repeats ...`

## Actions

Buttons are stacked vertically and rendered conditionally from the reminder state and supplied callbacks.

### Mark as done

- always shown
- closes the overlay first
- waits `200ms`
- then runs the completion flow in `App.tsx`

### Move to tomorrow

- shown only when the reminder is overdue and an `onMoveToTomorrow` handler is supplied
- closes the overlay first
- waits `200ms`
- then updates the reminder to tomorrow via `handleMoveReminderToTomorrow(...)`

### Edit reminder

- shown only when `onEdit` is supplied
- closes the overlay first
- waits `200ms`
- then opens the reminder editor in edit mode

### Go to list

- shown only for smart reminders with a `linkedListId` and an `onGoToList` handler
- closes the overlay
- navigates into the linked list flow

### Delete reminder

- always shown
- uses a grey button in the current implementation
- delegates directly to the delete flow supplied by `App.tsx`

## Current Action Order in App State

The reminder overlay currently participates in these timed flows:

- done: overlay close → `200ms` delay → completion logic
- edit: overlay close → `200ms` delay → open reminder editor
- move to tomorrow: overlay close → `200ms` delay → reschedule
- go to list: overlay close → immediate linked-list navigation
- delete: immediate delete flow delegation

## File Locations

- `src/app/components/ReminderInfoOverlay.tsx`
- action wiring in `src/app/App.tsx`

## Related Documentation

- [New Reminder Overlay](./new-reminder-overlay.md)
- [Done/Deleted Archive](./done-deleted-archive.md)
