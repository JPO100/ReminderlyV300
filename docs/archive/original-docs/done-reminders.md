# Done Reminders -- Functional and Technical Behaviour

## 1. Completion behaviour

### Checkbox completion

Clicking the circle checkbox on an active reminder marks it as done. This is the standard completion path:

1. The reminder ID is added to `pendingDoneIds` (immediate visual commit).
2. After 350ms (`COMPLETION_DELAY`), `completedAt` is set to `Date.now()` on the reminder.
3. The reminder exits the active list via `AnimatePresence` exit animation.

### Completion from ReminderInfoOverlay

When "Mark as done" is clicked in the `ReminderInfoOverlay`:

1. The overlay closes immediately.
2. After a 200ms delay, the standard completion handler (`handleCompleteClick`) runs.
3. The completion handler follows the same flow as checkbox completion: `pendingDoneIds` visual commit, then 350ms delayed data commit.

The total perceived delay from clicking "Mark as done" to data commit is 200ms (overlay close delay) + 350ms (completion delay) = 550ms. The visual transition (filled checkbox, strikethrough) begins at the 200ms mark.

### Deletion from ReminderInfoOverlay

When "Delete" is clicked in the `ReminderInfoOverlay`:

1. The `handleDeleteClick` handler runs immediately (no 200ms delay).
2. The delete handler follows the same 350ms pending pattern as completion: `pendingDeleteIds` visual commit, then delayed `deletedAt` set.
3. The info overlay closes as part of the delete handler.

### No alternative completion paths

No other completion paths exist. The checkbox and the "Mark as done" button in the info overlay are the only two entry points to the completion handler.

---

## 2. Visual state changes

When a reminder is marked as done (during the 350ms pending window), the following visual changes occur:

| Element | Active (normal) | Pending done |
|---|---|---|
| Circle checkbox | Category-coloured outline, no fill | Filled dark blue `#214677` with white tick (DoneTick SVG) |
| Reminder text | Dark blue `#214677`, no decoration | Dark blue `#214677`, `line-through` text decoration |
| Status icon | Grey `#BABABA` | Dark blue `#214677` |

### Colour derivation

```
circleColour = overdue ? OVERDUE_COLOUR : CATEGORY_COLOURS[category]
textColour   = isPendingDone ? "#BABABA" : (overdue ? OVERDUE_COLOUR : "#214677")
iconColour   = isPendingDone ? DONE_BLUE : (overdue ? OVERDUE_COLOUR : "#BABABA")
```

When `isPendingDone` is true:
- The text container colour fades to `#BABABA`.
- The `<p>` element itself gets `line-through` and inline `color: #214677`.
- The status icon switches to `#214677`.
- The circle renders as a filled dark blue circle with a white tick.

---

## 3. Animation constraints

- No changes to `AnimatePresence` configuration were introduced by the done system.
- No new animation logic was introduced. The done animation uses the existing `motion.div` wrapper with `layout` and `exit={{ opacity: 0 }}` that is applied to all reminder items.
- The `layout` transition (`duration: 0.25`) handles gap closure when an item exits the list.
- Cross-view animation bleed is prevented by keying `AnimatePresence` with `${viewMode}-${activeFilter}`.
- The done animation in the active list mirrors the uncomplete animation in the done list. Both use `exit={{ opacity: 0 }}`.

---

## 4. Data behaviour

### Reminder identity

The reminder `id` remains unchanged when marked as done. The same object is updated in the `reminders` array.

### In-place update

Completion sets `completedAt = Date.now()` on the existing reminder object via a `setReminders` map operation. No other fields are modified.

### Persistence

Reminders (including `completedAt`) are persisted to `localStorage` under the key `"reminderly.reminders.v1"`. The `completedAt` field survives page reloads. Done reminders persist until the user uncompletes them.

### List membership

List membership is derived at render time from `completedAt`:
- `completedAt == null` (or `undefined`): active list.
- `completedAt != null`: done/deleted list.

There are no secondary collections or separate arrays for done items.

---

## 5. Guardrails

- Completion behaviour is unchanged from the original checkbox implementation. The "Mark as done" button in `ReminderInfoOverlay` delegates to the same `handleComplete` function.
- No refactor of the animation system was performed. The `motion.div` wrapper and `AnimatePresence` configuration are identical to the original implementation.
- No changes to list rendering structure. Done items use the same `motion.div` wrapper and layout props as active items.
- Timer guards prevent double-completion: if a timer already exists for a reminder ID in `completionTimersRef`, the handler is a no-op.
- Timer cleanup runs on component unmount via `useEffect` return functions for both `completionTimersRef` and `uncompleteTimersRef`.
- The `pendingDoneIds` and `pendingUncompleteIds` sets are presentation-only state. They affect visual rendering during the 350ms window but never affect data derivation, list filtering, or sorting.

---

## Files involved

| File | Role |
|---|---|
| `/src/app/App.tsx` | Owns `pendingDoneIds`, `completionTimersRef`, `handleComplete` function, `COMPLETION_DELAY` constant, list membership derivation |
| `/src/app/components/ReminderInfoOverlay.tsx` | "Mark as done" button triggers `onMarkDone` callback with 200ms delay before calling `handleComplete` |
