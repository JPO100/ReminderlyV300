# Done / Delete System

## Overview

Reminderly uses two optional timestamp fields on each `Reminder` to determine whether a reminder is active, done, or deleted:

- `completedAt`: set when a reminder is marked as done.
- `deletedAt`: set when a reminder is soft-deleted.

There are no secondary collections. The done/deleted view is derived entirely at render time from these fields.

---

## 1. Data Model

### Reminder fields

```typescript
export type Reminder = {
  id: string;
  originalText: string;
  displayText: string;
  createdAt: number;
  schedule: ReminderSchedule;
  repeatRule?: RepeatRule | null;
  completedAt?: number | null;
  deletedAt?: number | null;
};
```

- **`completedAt == null` and `deletedAt == null`**: Reminder is active. Appears in the standard list view.
- **`completedAt != null` (and `deletedAt == null`)**: Reminder is done. Appears in the done/deleted view.
- **`deletedAt != null`**: Reminder is deleted. Appears in the done/deleted view regardless of `completedAt`.
- Values are `Date.now()` epoch timestamps set at the moment of the action.

---

## 2. View Mode

```typescript
export type ViewMode = "list" | "done-deleted";
```

- **`"list"`**: Standard reminder list. Shows only reminders where `completedAt == null` and `deletedAt == null`, plus items in `pendingDeleteIds` (visible during the 350ms delete transition window).
- **`"done-deleted"`**: Archive view. Shows reminders where `completedAt != null` or `deletedAt != null`, plus items in `pendingUncompleteIds` or `pendingUndeleteIds`.

### Toggling views

The logo tick icon in the header toggles between views:

- From list view: sets `viewMode` to `"done-deleted"`, resets `activeFilter` to `"all"`, resets `doneDeletedFilter` to `"all"`, resets `clearListStep` to 0.
- From done/deleted view: sets `viewMode` to `"list"`.

### Logo tick visual state

- **List mode**: White circular tick icon visible in the logo area.
- **Done/deleted mode**: Header background changes to `#214677`. White-filled tick icon with `#214677` checkmark overlaid at the same position.

---

## 3. Mark as Done (Active -> Done)

### Transient state: `pendingDoneIds`

A `Set<string>` of reminder IDs currently in the 350ms visual transition window. Presentation-only state.

### Timer management: `completionTimersRef`

A `Map<string, number>` ref holding one `setTimeout` handle per pending reminder. Cleaned up on unmount.

### Flow

1. User clicks the circle checkbox on an active reminder.
2. Guard: if a timer already exists for this ID, no-op.
3. Immediate visual commit: add `reminderId` to `pendingDoneIds`.
4. 350ms delayed data commit (`COMPLETION_DELAY = 350`):
   - Set `completedAt = Date.now()` on the reminder.
   - Remove `reminderId` from `pendingDoneIds`.
   - For repeating reminders: schedule a second 1000ms timer (`RESCHEDULE_DELAY`) that inserts the next occurrence as a new reminder.
5. The reminder exits the active list via `AnimatePresence` exit animation.

### Visual treatment during pending done (350ms window)

| Element | Normal (active) | Pending done |
|---------|----------------|--------------|
| Circle | Category-coloured outline, no fill | Filled `#214677` with white tick |
| Text | `#214677`, no decoration | `#BABABA` container colour, `line-through`, inline `#214677` |
| Status icon | `#BABABA` | `#214677` |

---

## 4. Delete (Active -> Deleted)

### Transient state: `pendingDeleteIds`

A `Set<string>` of reminder IDs currently in the 350ms visual transition window. Presentation-only state.

### Timer management: `pendingDeleteTimersRef`

A `Map<string, number>` ref holding one `setTimeout` handle per pending reminder.

### Flow

1. User clicks "Delete" in the `ReminderInfoOverlay`, or a delete action is triggered.
2. Guard: if a timer already exists for this ID, no-op.
3. Cancel any pending completion, uncomplete, reschedule, or undelete timers for this ID.
4. Clear from all other pending visual sets.
5. Immediate visual commit: add `reminderId` to `pendingDeleteIds`.
6. Close the info overlay.
7. 350ms delayed data commit (`COMPLETION_DELAY`):
   - Set `deletedAt = Date.now()` on the reminder.
   - Remove `reminderId` from `pendingDeleteIds`.
8. The reminder exits the active list via `AnimatePresence` exit animation.

### Visual treatment during pending delete (350ms window)

| Element | Normal (active) | Pending delete |
|---------|----------------|----------------|
| Circle | Category-coloured outline | Filled `#939393` with white tick |
| Text | `#214677`, no decoration | `#939393`, `line-through` |
| Status icon | `#BABABA` | `#939393` |

### Empty-state delay

When the delete (or completion) removes the last visible item in the current active filter, an empty-placeholder delay is armed (`emptyPlaceholderDelayRef`). This prevents the empty-state message from appearing instantly while the exit animation plays. The delay is `EMPTY_STATE_DELAY + 350` ms.

---

## 5. Uncomplete / Return (Done -> Active)

### Flow

1. User clicks the filled done circle on a done reminder in the done/deleted view.
2. Guard: if a timer already exists for this ID, no-op.
3. Immediate data commit: clear `completedAt` to `null`. The reminder is immediately reinserted into the active list.
4. Trigger fade-in and highlight on the active list (`reinsertedId`, `insertHighlightId`).
5. Done view feedback: add to `pendingUncompleteIds` to keep the item visible in the done list during the 350ms transition.
6. 350ms delayed cleanup: remove from `pendingUncompleteIds`.
7. `AnimatePresence` triggers the exit animation in the done view.

### Duplicate removal for repeating reminders

When uncompleting a repeating reminder, the handler:
1. Cancels any pending reschedule timer.
2. Computes the expected next schedule for the repeat rule.
3. Searches for exactly one active duplicate matching originalText, displayText, repeatRule, and expected next schedule.
4. If one confident match is found, removes it from the list.

---

## 6. Undelete / Return (Deleted -> Active or Done)

### Flow

1. User clicks the filled circle on a deleted reminder in the done/deleted view.
2. Guard: if already pending undelete, no-op.
3. Cancel any pending delete timer.
4. Capture the original `deletedAt` for stable sort ordering during the pending window (`pendingUndeleteSortKeyRef`).
5. Immediately clear `deletedAt` to `null`.
6. If `completedAt` is also null, the reminder returns to the active list with fade-in and highlight. If `completedAt` is set, it remains in the done view but changes from "deleted" styling to "done" styling.
7. Done view feedback: add to `pendingUndeleteIds` for 350ms.
8. 350ms delayed cleanup: remove from `pendingUndeleteIds` and sort key ref.

---

## 7. Done/Deleted View Sub-Filters

The done/deleted view has three sub-filter buttons: **Done**, **Deleted**, and an implicit **All** (default).

```typescript
const [doneDeletedFilter, setDoneDeletedFilter] = useState<'all' | 'done' | 'deleted'>('all');
```

### Filter logic

| Sub-filter | Shows |
|-----------|-------|
| `'all'` | All items with `completedAt != null` or `deletedAt != null`, plus pending restore items |
| `'done'` | Items with `completedAt != null` and `deletedAt == null`, plus `pendingUncompleteIds` |
| `'deleted'` | Items with `deletedAt != null`, plus `pendingUndeleteIds` |

### Button behaviour

- Clicking "Done" when inactive: sets filter to `'done'`. Clicking again: resets to `'all'`.
- Clicking "Deleted" when inactive: sets filter to `'deleted'`. Clicking again: resets to `'all'`.
- Active button renders with white background and `#214677` text. Inactive: translucent background and white text.

### Back button

A back-arrow button (left of the filter buttons) returns to list view. Hidden below 390px viewport width (`hidden min-[390px]:flex`).

---

## 8. Clear All (3-Step Confirmation)

The "Clear all" button in the done/deleted view uses a 3-step confirmation flow:

```typescript
const [clearListStep, setClearListStep] = useState<0 | 1 | 2>(0);
```

| Step | Label | Visual |
|------|-------|--------|
| 0 | "Clear all" | Translucent background, white text |
| 1 | "Clear all?" | White background, `#214677` text |
| 2 | "Cleared!" | White background, `#214677` text |

### Flow

1. First click: step 0 -> 1 (confirmation state).
2. Second click: step 1 -> 2 (execute clear).
   - Removes all items with `completedAt != null` or `deletedAt != null`.
   - Also removes pending restore items (`pendingUncompleteIds`, `pendingUndeleteIds`).
   - Cleans up all associated timers and pending sets.
   - Resets `doneDeletedFilter` to `'all'`.
3. After 500ms: step 2 -> 0 (reset).

### Outside-click cancellation

The outermost app container div has an `onPointerDownCapture` handler. If `clearListStep` is 1 or 2 and the click target is outside the clear-all button (`clearAllButtonRef`), the step resets to 0 and any clear-list timer is cancelled.

---

## 9. Animation

### Active list (mark as done or delete)

Each reminder item is wrapped in `<motion.div key={reminder.id} layout exit={{ opacity: 0 }}>`. When the item leaves the filtered list, `AnimatePresence` triggers the exit animation and `layout` on siblings animates gap closure.

### Done/deleted list (uncomplete or undelete)

Same `<motion.div>` wrapper with `exit={{ opacity: 0 }}`. Items stay in the filter via pending ID sets for 350ms, then exit.

### AnimatePresence keys

```tsx
// Active list
<AnimatePresence key={`${viewMode}-${activeFilter}`}>

// Done/deleted list
<AnimatePresence key={`${viewMode}-${activeFilter}-${doneDeletedFilter}`}>
```

This ensures view/filter changes create fresh scopes, preventing stale exit animations from bleeding across views.

---

## 10. Done/Deleted List Sorting

Items are sorted by their most recent status timestamp, descending (most recent at top):

```typescript
const tsA = pendingUndeleteSortKeyRef.current.get(a.id)
  ?? a.deletedAt
  ?? a.completedAt
  ?? pendingUncompleteCompletedAtRef.current.get(a.id)
  ?? 0;
```

Priority order for the sort key: `pendingUndeleteSortKey` > `deletedAt` > `completedAt` > `pendingUncompleteCompletedAt`. The `pendingUndeleteSortKeyRef` and `pendingUncompleteCompletedAtRef` preserve original timestamps during the pending window to keep sort order stable.

---

## 11. Status Icons in Done/Deleted View

The done/deleted view renders the same three status icon variants as the active list, with different colour logic:

| Condition | Icon | Normal colour | Pending restore colour |
|-----------|------|--------------|----------------------|
| `repeatRule` exists | Repeats (circular arrows) | `#214677` (done) or `#939393` (deleted) | `#BABABA` or overdue red |
| `schedule.kind === "scheduled"` | Clock | `#214677` (done) or `#939393` (deleted) | `#BABABA` or overdue red |
| `schedule.kind === "sometime"` | No-time | `#214677` (done) or `#939393` (deleted) | `#BABABA` or overdue red |

---

## 12. Empty State

Empty state messages are context-dependent:

| Sub-filter | Message |
|-----------|---------|
| `'all'` | "No done or deleted reminders yet..." |
| `'done'` | "No done reminders yet..." followed by "get busy!" |
| `'deleted'` | "No deleted reminders yet..." |

Displayed in `#CCCCCC` Lato 17px, centred vertically and horizontally.

---

## 13. Persistence

Reminders (including `completedAt` and `deletedAt`) are persisted to `localStorage` under the key `"reminderly.reminders.v1"`. The `loadReminders` function hydrates on mount, preserving both fields across sessions. Done and deleted reminders persist until the user restores them or clears the list.

---

## 14. Self-Checks

9 self-checks in `/src/app/dev/done-deleted-checks.ts`:

- ViewMode: list -> done-deleted on tick click
- ViewMode: done-deleted -> list on tick click
- ViewMode: Today filter -> done-deleted on tick click (resets filter)
- Navigation: tick click area (0-22%) does not overlap text area (25%-100%)
- Done/deleted: sub-filter classifies done-only, deleted-only, and both items correctly
- Done/deleted: pendingUncomplete/pendingUndelete items visible in correct sub-filters
- Done/deleted: clear-all includes pending restore ids, excludes pendingDelete ids
- Derivation: sort key uses pendingUndeleteSortKey >> deletedAt >> completedAt >> pendingUncompleteCompletedAt
- Persistence: deletedAt survives save/load cycle

---

## 15. Constraints & Design Decisions

1. No secondary collections: list membership is derived from `completedAt` and `deletedAt` alone.
2. Only the single 350ms `COMPLETION_DELAY` window exists for done, delete, uncomplete, and undelete transitions.
3. Transient state is presentation-only: `pendingDoneIds`, `pendingDeleteIds`, `pendingUncompleteIds`, and `pendingUndeleteIds` affect visual rendering during the 350ms window but never affect data derivation or sorting.
4. All timer refs are cleaned up on component unmount.
5. Guards prevent duplicate timers for the same reminder ID.
6. Overdue styling is preserved during pending restore transitions.
