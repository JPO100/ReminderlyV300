# Done/Deleted Archive

## Overview

The done/deleted archive view displays all reminders where `completedAt != null` or `deletedAt != null`. This view provides sub-filtering, restore functionality, and a 3-step clear-all confirmation.

## Access

Click the logo tick icon in the header to toggle between the active list and done/deleted view. The tick icon visual state changes when in done/deleted mode:
- List mode: White circular tick icon
- Done/deleted mode: Header background `#4784F8`, white-filled tick with `#4784F8` checkmark overlay

## Header

### Logo Tick State
The logo tick visual indicates the current view mode. In done/deleted mode, the header background changes to dark blue `#4784F8` and the tick becomes a filled white circle with a dark blue checkmark.

### Sub-Filter Buttons

Three buttons control archive filtering:

**Back Arrow**
- Left-most button
- Returns to active list view
- Hidden below 390px viewport width (`hidden min-[390px]:flex`)
- Visual: left arrow icon, translucent background, white text

**Done Button**
- Shows only reminders with `completedAt != null` and `deletedAt == null`
- Plus items in `pendingUncompleteIds` during their 350ms transition
- Active state: white background, dark blue `#4784F8` text
- Inactive state: translucent background, white text
- Toggle: click inactive to activate, click again to reset to "all"

**Deleted Button**
- Shows only reminders with `deletedAt != null`
- Plus items in `pendingUndeleteIds` during their 350ms transition
- Same visual states as Done button
- Same toggle behaviour

Default state is "all" (both buttons inactive), showing all items where `completedAt != null` or `deletedAt != null`.

### Clear All Button

3-step confirmation flow:

**Step 0 (initial)**
- Label: "Clear all"
- Visual: translucent background, white text
- Click: advance to step 1

**Step 1 (confirmation)**
- Label: "Clear all?"
- Visual: white background, dark blue `#4784F8` text
- Click: advance to step 2 and execute clear

**Step 2 (confirmed)**
- Label: "Cleared!"
- Visual: white background, dark blue `#4784F8` text
- Auto-reset to step 0 after 500ms

### Outside-Click Cancellation

If `clearListStep` is 1 or 2 and the user clicks outside the clear-all button, the step resets to 0. Implemented via `onPointerDownCapture` on the app container checking if target is outside `clearAllButtonRef`.

### Clear Execution

When step 1 → 2:
1. Removes all items where `completedAt != null` or `deletedAt != null`
2. Also removes pending restore items (`pendingUncompleteIds`, `pendingUndeleteIds`)
3. Cleans up all associated timers and pending sets
4. Resets `doneDeletedFilter` to "all"
5. Persists to localStorage

## Reminder Rows

### Layout
Same structure as active list rows (51px height, 13px 1px padding, 16px gap, 100px border-radius).

### Circle State

**Done Reminder**
- Filled dark blue `#4784F8` circle with white tick
- Clickable: triggers uncomplete action

**Deleted Reminder**
- Filled grey `#939393` circle with white tick
- Clickable: triggers undelete action

**Pending Uncomplete** (350ms window)
- Circle reverts to category-coloured outline (or overdue red)
- Text and icon colours return to active styling
- Item remains visible in done view during transition

**Pending Undelete** (350ms window)
- Circle changes from grey to dark blue (if completedAt exists) or category colour (if returning to active)
- Text and icon colours change accordingly
- Item remains visible in done/deleted view during transition

### Text Styling

**Done**
- Title: dark blue `#4784F8`, no decoration
- Subtitle: dark blue `#4784F8` or grey `#BABABA` (depending on state)

**Deleted**
- Title: grey `#939393`, no decoration
- Subtitle: grey `#939393`

**Pending Restore**
- Transitions to active list styling (dark blue text, category-coloured circle)
- Or transitions to done styling if completedAt remains set after undelete

### Status Icons

Same icons as active list (schedule-set, repeats, schedule-unset):

**Normal Done**
- Icon colour: dark blue `#4784F8`

**Normal Deleted**
- Icon colour: grey `#939393`

**Pending Restore**
- Icon colour: grey `#BABABA` (or overdue red if overdue)
- Not clickable in done/deleted view

## Sorting

Sort by most recent status timestamp, descending (most recent at top):

Priority order for sort key:
1. `pendingUndeleteSortKey` (captured deletedAt for stable sorting during transition)
2. `deletedAt`
3. `completedAt`
4. `pendingUncompleteCompletedAt` (captured completedAt for stable sorting during transition)
5. Fallback: 0

This ensures items maintain stable sort order during pending restore transitions.

## Sub-Filter Logic

### "All" (default)
Shows all items where `completedAt != null` or `deletedAt != null`, plus all pending restore items.

### "Done"
Shows items where `completedAt != null` and `deletedAt == null`, plus `pendingUncompleteIds`.

### "Deleted"
Shows items where `deletedAt != null` (regardless of completedAt), plus `pendingUndeleteIds`.

## Actions

### Uncomplete (Done → Active)

1. Click filled circle on done reminder
2. Guard: if timer already exists, no-op
3. Immediate data commit: clear `completedAt` to `null`
4. Reminder immediately reinserted into active list with fade-in and highlight
5. Add to `pendingUncompleteIds` for 350ms (keeps visible in done view during transition)
6. 350ms delayed cleanup: remove from `pendingUncompleteIds`
7. AnimatePresence triggers exit animation in done view

**Duplicate Removal for Repeating Reminders**
When uncompleting a repeating reminder:
1. Cancel any pending reschedule timer
2. Compute expected next schedule
3. Search for exactly one active duplicate matching originalText, displayText, repeatRule, and expected next schedule
4. If one confident match found, remove it

### Undelete (Deleted → Active or Done)

1. Click filled circle on deleted reminder
2. Guard: if already pending undelete, no-op
3. Cancel any pending delete timer
4. Capture original `deletedAt` in `pendingUndeleteSortKeyRef` (for stable sort during transition)
5. Immediately clear `deletedAt` to `null`
6. If `completedAt` also null: returns to active list with fade-in and highlight
7. If `completedAt` set: remains in done view but changes from deleted to done styling
8. Add to `pendingUndeleteIds` for 350ms
9. 350ms delayed cleanup: remove from `pendingUndeleteIds` and sort key ref

## Empty States

Context-dependent messages:

### "All" Sub-Filter
"No done or deleted reminders yet..."

### "Done" Sub-Filter
"No done reminders yet..." followed by "get busy!"

### "Deleted" Sub-Filter
"No deleted reminders yet..."

All messages: `#CCCCCC` Lato 17px, centered vertically and horizontally.

## Animation

Each row wrapped in:
```tsx
<motion.div key={reminder.id} layout exit={{ opacity: 0 }}>
```

AnimatePresence key: `${viewMode}-${activeFilter}-${doneDeletedFilter}`

This ensures view/filter changes create fresh scopes, preventing stale exit animations from bleeding across views.

## Persistence

All done and deleted reminders persist to localStorage with their `completedAt` and `deletedAt` timestamps. They remain in storage until explicitly cleared via "Clear all" or individually restored.

## Constraints

1. No secondary collections: list membership derived from timestamps alone
2. Only the 350ms transition window exists for uncomplete and undelete actions
3. Transient state (`pendingUncompleteIds`, `pendingUndeleteIds`) is presentation-only
4. All timer refs cleaned up on component unmount
5. Guards prevent duplicate timers for the same reminder ID
6. Overdue styling preserved during pending restore transitions
