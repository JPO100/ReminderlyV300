# Reminder Lifecycle

Consolidated from `/docs/done-delete-system.md`, `/docs/done-reminders.md`, and `/docs/editing-reminders.md`.

## Overview

Reminders progress through states defined by `completedAt` and `deletedAt` timestamp fields. All state transitions use timed visual feedback windows before committing data changes.

## Reminder States

### Active
- `completedAt == null` and `deletedAt == null`
- Appears in active list view
- Fully interactive (can be viewed, edited, completed, deleted)

### Done
- `completedAt != null` and `deletedAt == null`
- Appears in done/deleted archive view
- Can be uncompleted (restored to active)

### Deleted
- `deletedAt != null` (regardless of completedAt)
- Appears in done/deleted archive view
- Can be undeleted (restored to active or done state)

## Create Reminder

1. User clicks "Create a new reminder" button
2. NewReminderOverlay opens
3. User enters text, optionally configures schedule and repeats
4. User clicks Save
5. New reminder created:
   ```typescript
   {
     id: crypto.randomUUID(),
     originalText: text,
     displayText: normaliseReminderText(text, ...),
     createdAt: Date.now(),
     schedule: { kind, date, time },
     repeatRule: convertToRepeatRule(repeatConfig) || null,
   }
   ```
6. Reminder added to `reminders` array
7. After 500ms delay (`NEW_REMINDER_INSERT_DELAY`): fade-in animation
8. 1000ms highlight (`INSERT_HIGHLIGHT_MS`)
9. Persisted to localStorage

### Timer Cancellation

When `addReminder` is called, any pending insert timer from a previous call is cancelled (last-one-wins). This prevents duplicate insertions if user rapidly saves multiple reminders.

When a new reminder is inserted, any existing highlight timer is cleared and replaced with a new 1000ms timer. Only the most recent insertion is highlighted.

See [New Reminder Overlay](../01-core-surfaces/new-reminder-overlay.md) for full creation flow.

## Edit Reminder

1. User clicks status icon on active reminder
2. ReminderInfoOverlay opens
3. User clicks Edit button
4. Info overlay closes
5. After 200ms delay: NewReminderOverlay opens in edit mode
6. Text and toggles prepopulated from `editReminder`
7. User makes changes
8. User clicks Save
9. Existing reminder updated in place:
   - `id`, `createdAt`, `completedAt` preserved
   - `originalText`, `displayText`, `schedule`, `repeatRule` updated
10. List updates immediately
11. Persisted to localStorage

### Edit Mode NLC Behaviour

- Initial auto-apply suppressed (prevents overwriting prepopulated state)
- Token baseline captured from original text
- Only new tokens (not in baseline) eligible for auto-apply
- Unchanged tokens do not re-apply

See [New Reminder Overlay](../01-core-surfaces/new-reminder-overlay.md) for edit-mode details.

## Mark as Done (Active → Done)

### Trigger Points

1. Click circle checkbox on active reminder
2. Click "Mark as done" in ReminderInfoOverlay (includes 200ms overlay close delay)

### Flow

1. Guard: if completion timer already exists for this ID, no-op
2. Immediate visual commit: add `reminderId` to `pendingDoneIds`
3. Visual changes apply instantly:
   - Circle: filled dark blue `#1C2C42` with white tick
   - Text: `#BABABA` container, dark blue `#1C2C42` with `line-through`
   - Status icon: dark blue `#1C2C42`
4. After 350ms (`COMPLETION_DELAY`):
   - Set `completedAt = Date.now()`
   - Remove from `pendingDoneIds`
   - For repeating reminders: schedule reschedule timer (1000ms delay)
5. AnimatePresence triggers exit animation (fade-out)
6. Persisted to localStorage

### Repeat Auto-Rescheduling

For reminders with `repeatRule`:
1. After `completedAt` set, wait additional 1000ms (`RESCHEDULE_DELAY`)
2. Compute next occurrence via `getNextOccurrence(baseDateTime, repeatRule)`
3. Create new reminder with same text and repeat rule, new scheduled date/time
4. Insert into active list with fade-in and highlight

See [Repeats](../03-natural-language-and-scheduling/repeats.md) for rescheduling logic.

## Delete (Active → Deleted)

### Trigger Point

Click "Delete" in ReminderInfoOverlay (no delay, executes immediately).

### Flow

1. Guard: if delete timer already exists for this ID, no-op
2. Cancel any pending completion, uncomplete, reschedule, or undelete timers for this ID
3. Clear from all other pending visual sets
4. Immediate visual commit: add `reminderId` to `pendingDeleteIds`
5. Close info overlay
6. Visual changes apply instantly:
   - Circle: filled grey `#939393` with white tick
   - Text: grey `#939393` with `line-through`
   - Status icon: grey `#939393`
7. After 350ms (`COMPLETION_DELAY`):
   - Set `deletedAt = Date.now()`
   - Remove from `pendingDeleteIds`
8. AnimatePresence triggers exit animation (fade-out)
9. Persisted to localStorage

## Uncomplete (Done → Active)

### Trigger Point

Click filled circle on done reminder in done/deleted archive view.

### Flow

1. Guard: if timer already exists for this ID, no-op
2. Immediate data commit: clear `completedAt` to `null`
3. Reminder immediately reinserted into active list
4. Fade-in and highlight applied (`reinsertedId`, `insertHighlightId`)
5. Add to `pendingUncompleteIds` (keeps visible in done view during 350ms transition)
6. After 350ms:
   - Remove from `pendingUncompleteIds`
7. AnimatePresence triggers exit animation in done view (fade-out)
8. Persisted to localStorage

### Duplicate Removal for Repeating Reminders

When uncompleting a repeating reminder:
1. Cancel any pending reschedule timer
2. Compute expected next schedule for the repeat rule
3. Search for exactly one active duplicate matching:
   - originalText
   - displayText
   - repeatRule
   - Expected next schedule
4. If one confident match found, remove it from list

## Undelete (Deleted → Active or Done)

### Trigger Point

Click filled circle on deleted reminder in done/deleted archive view.

### Flow

1. Guard: if already pending undelete, no-op
2. Cancel any pending delete timer
3. Capture original `deletedAt` in `pendingUndeleteSortKeyRef` (for stable sort during transition)
4. Immediately clear `deletedAt` to `null`
5. Destination depends on `completedAt`:
   - If `completedAt` also null: returns to active list with fade-in and highlight
   - If `completedAt` set: remains in done view but changes from deleted to done styling
6. Add to `pendingUndeleteIds` (keeps visible in done/deleted view during 350ms transition)
7. After 350ms:
   - Remove from `pendingUndeleteIds` and sort key ref
8. AnimatePresence triggers exit animation in done/deleted view (fade-out)
9. Persisted to localStorage

## Timing Constants

```typescript
COMPLETION_DELAY = 350      // Visual transition window for done/delete/uncomplete/undelete
RESCHEDULE_DELAY = 1000     // Additional delay before inserting next repeat occurrence
NEW_REMINDER_INSERT_DELAY = 500  // Delay before fading in newly created reminder
INSERT_HIGHLIGHT_MS = 1000  // Duration of temporary highlight for new/restored items
EMPTY_STATE_DELAY = 350     // Delay before showing empty-state message
```

## Timer Management

### Timer Refs

All timer handles stored in refs, cleaned up on unmount:
- `completionTimersRef: Map<string, number>`
- `pendingDeleteTimersRef: Map<string, number>`
- `rescheduleTimersRef: Map<string, number>`
- `insertHighlightTimerRef: { current: number | null }`
- `emptyPlaceholderDelayRef: { current: number | null }`

### Guards

All action handlers check for existing timers before creating new ones. Prevents duplicate timers and race conditions.

### Cleanup

`useEffect` return functions clear all timers on unmount.

## Persistence

Every state change writes full `reminders` array to localStorage under key `reminderly.reminders.v1`. No debouncing or batching.

## Constraints

1. Transient state (`pendingDoneIds`, `pendingDeleteIds`, `pendingUncompleteIds`, `pendingUndeleteIds`) is presentation-only
2. Never affects data derivation, filtering, or sorting
3. Only the 350ms transition window exists for all visual feedback
4. Timer guards prevent duplicate actions
5. All timer refs cleaned up on unmount
6. Overdue styling preserved during pending transitions