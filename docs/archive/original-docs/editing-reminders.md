# Editing Reminders -- Functional and Technical Behaviour

## 1. User flow

1. The user clicks the right-side status icon on any active reminder. This opens the `ReminderInfoOverlay`.
2. The user clicks Edit in the `ReminderInfoOverlay`. The overlay closes immediately.
3. After a guarded 200ms delay (`overlayEditTimerRef` in `App.tsx`, cleared before rescheduling and on unmount), the existing slide-up overlay opens titled "Edit reminder".
4. The overlay uses the same `NewReminderOverlay` component and slide-up animation as the create flow.

---

## 2. Data flow

### Source of truth

The saved `Reminder` object is the source of truth for all prepopulated fields. Fields are read directly from the reminder's stored properties, not re-derived from text parsing.

### Prepopulation rules

| Field | Source |
|---|---|
| Text | `editReminder.originalText` |
| Date toggle | ON if `schedule.kind === 'scheduled'` |
| Date value | Parsed from `schedule.date` (YYYY-MM-DD string) |
| Time toggle | ON if `schedule.kind === 'scheduled'` and `schedule.time` exists |
| Time value | Parsed from `schedule.time` (HH:MM string) |
| Repeats toggle | ON if `repeatRule != null` |
| Repeats config | Reconstructed from `repeatRule` by the parent (`App.tsx`) before passing as `repeatConfig` prop |

### No re-derivation

The overlay does not re-parse the reminder text on open to derive toggle or value state. The text is placed in the textarea for display and editing, but the structured fields (date, time, repeats) come exclusively from the saved reminder.

---

## 3. Edit-mode parsing rules

### Token highlighting

When the overlay opens in edit mode, NLC token parsing runs on the prepopulated text. Recognised tokens are highlighted in blue (`#4784F8`) in the mirror layer, identical to create mode.

### Initial auto-apply suppression

The first auto-apply cycle is suppressed via `suppressAutoApplyRef` (initialised to `true` when `isEditMode` is true, set to `false` after the first cycle is skipped). This prevents the parser from overwriting prepopulated toggle and value state with values derived from the text.

### New token auto-apply after text change

After the initial suppression has passed, if the user edits the text and introduces a token that was not present in the original reminder text, auto-apply can update the corresponding field -- even if that field's toggle was already on from prepopulation.

This is implemented via an initial token snapshot (`editInitialTokenTextsRef`) computed on mount from the original text. On each auto-apply evaluation, parsed tokens are compared to this snapshot. For any token whose `category:lowercasedText` key is absent from the snapshot, the corresponding category's toggle is treated as off for auto-apply eligibility. Categories with only unchanged tokens retain their actual toggle state and are not auto-applied.

Each category is unlocked independently. For example, typing "at 3pm" unlocks time auto-apply without affecting date or repeats.

### Token click

Clicking a highlighted token applies it immediately, identical to create mode. This works regardless of whether the token was in the original text.

---

## 4. Save behaviour

- Pressing the blue tick (submit button) saves the edited reminder.
- The existing reminder is updated in place via `updateReminder` in `App.tsx`, which maps over the reminders array and replaces the matching entry by `id`.
- `id`, `createdAt`, and `completedAt` are preserved from the original reminder.
- `originalText`, `displayText`, `schedule`, and `repeatRule` are recomputed from the current overlay state.
- `displayText` is derived via `normaliseReminderText()` at save time for scheduled reminders, or set to the raw text for sometime reminders.
- The reminder list updates immediately after save.
- The `ReminderInfoOverlay` does not reopen after saving.

---

## 5. Cancel behaviour

- Tapping the backdrop (outside the overlay) closes the edit overlay.
- All changes are discarded. No persistence write occurs.
- The reminder remains unchanged in the list.
- All local state in `NewReminderElements` is destroyed on unmount (same as create mode).

---

## 6. Edge cases

### Manual time updated by new explicit time token

If the original reminder had time set to 2pm (via manual picker, not token), and the user edits the text to include "at 3pm", auto-apply updates the time to 3pm after the standard 200ms debounce. This works because "3pm" is a new token not present in the original text, so the time category is unlocked for auto-apply.

### Date OFF cascades time OFF

Toggling date off in edit mode cascades to time off and clears both values, identical to create mode. The date/time invariant (time requires date) applies equally in both modes.

### Toggle interactions identical

All toggle interactions (date on/off, time on/off, repeats on/off) behave identically in edit mode and create mode. The toggle handlers do not branch on `isEditMode`.

### Delete button

The Delete button in `ReminderInfoOverlay` closes the overlay only. It does not delete the reminder or trigger any state changes. Delete is not wired to a state mutation.

---

## 7. Invariants

- Time requires date. This is enforced by the toggle handlers in both create and edit mode.
- No mutation occurs until the user presses the blue tick (save). All changes are local to the overlay's ephemeral state.
- No changes to animation or completion behaviour are introduced by the edit flow.
- The edit overlay reuses the same `NewReminderOverlay` component as create mode. The `isEditMode` flag controls title text, prepopulation, auto-apply suppression, and save-vs-create logic.

---

## Files involved

| File | Role |
|---|---|
| `/src/app/App.tsx` | Owns `editingReminder` state, `overlayEditTimerRef`, `updateReminder` function, passes props to overlay |
| `/src/imports/NewReminderOverlay.tsx` | Overlay component; handles prepopulation, `isEditMode` branching, `suppressAutoApplyRef`, `editInitialTokenTextsRef`, save via `updateReminder` |
| `/src/app/components/ReminderInfoOverlay.tsx` | Centred modal with Edit button; triggers the edit flow via `onEdit` callback |
