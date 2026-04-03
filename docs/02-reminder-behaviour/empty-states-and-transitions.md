# Empty States and Transitions

## Empty States

### Active List Empty States

When no reminders match the current filter:

**Message**: "You don't have any reminders in this filter"
**Styling**: `#CCCCCC` Lato 17px, centered vertically and horizontally

### Empty State Delay

To prevent flashing during exit animations, empty state message displays after `EMPTY_STATE_DELAY + 350ms` (total 700ms) when the last item exits the current filter view.

Implemented via `emptyPlaceholderDelayRef` timer, armed when delete or completion removes the last visible item.

### Done/Deleted View Empty States

Context-dependent messages:

**"All" Sub-Filter**
- "No done or deleted reminders yet..."

**"Done" Sub-Filter**
- "No done reminders yet..."
- "get busy!" (second line)

**"Deleted" Sub-Filter**
- "No deleted reminders yet..."

All messages: `#CCCCCC` Lato 17px, centered.

## Visual Transitions

All reminder list transitions use Motion (formerly Framer Motion) with AnimatePresence.

### Entry Animations

**New Reminder Insert**
- Delay: `NEW_REMINDER_INSERT_DELAY` (500ms) after save
- Animation: fade-in
- Highlight: `INSERT_HIGHLIGHT_MS` (1000ms) temporary colour highlight
- Timer cancellation: Any pending insert timer from previous save is cancelled (last-one-wins)
- Highlight timer replacement: Any existing highlight timer is cleared and replaced with new 1000ms timer

**Restored Reminder (Uncomplete/Undelete)**
- Immediate fade-in
- 1000ms highlight
- Triggered via `reinsertedId` and `insertHighlightId` state

### Exit Animations

**Standard Exit** (done, delete, filter change)
```tsx
<motion.div exit={{ opacity: 0 }}>
```
Fade-out opacity transition.

**Layout Animation**
```tsx
<motion.div layout>
```
Gap closure animated via `layout` prop (250ms duration).

### AnimatePresence Keys

Scoped to prevent animation bleed across views:

**Active List**
```tsx
<AnimatePresence key={`${viewMode}-${activeFilter}`}>
```

**Done/Deleted List**
```tsx
<AnimatePresence key={`${viewMode}-${activeFilter}-${doneDeletedFilter}`}>
```

Different keys create fresh animation scopes when view or filter changes.

## Pending Visual States

### Timing Windows

All pending visual states use `COMPLETION_DELAY` (350ms):
- Pending done
- Pending delete
- Pending uncomplete
- Pending undelete

### Pending State Sets

```typescript
pendingDoneIds: Set<string>
pendingDeleteIds: Set<string>
pendingUncompleteIds: Set<string>
pendingUndeleteIds: Set<string>
```

Items in these sets display transient visual styling during the 350ms window before data commit.

### Visual Feedback

**Pending Done**
- Circle: filled dark blue with white tick
- Text: grey container, dark blue with line-through
- Icon: dark blue

**Pending Delete**
- Circle: filled grey with white tick
- Text: grey with line-through
- Icon: grey

**Pending Restore (Uncomplete/Undelete)**
- Circle reverts to category colour or dark blue (done)
- Text and icon revert to normal active/done styling
- Item remains visible in source view during transition

## Highlight System

Temporary highlight for new and restored reminders:

**Duration**: `INSERT_HIGHLIGHT_MS` (1000ms)

**Trigger State**:
```typescript
insertHighlightId: string | null
```

When non-null, the reminder with matching ID displays highlight styling. Timer auto-clears after 1000ms.

## Related Documentation

- [Reminder Lifecycle](./reminder-lifecycle.md) - State transitions and timing constants
- [Active List](../01-core-surfaces/active-list.md) - Visual presentation
- [Done/Deleted Archive](../01-core-surfaces/done-deleted-archive.md) - Archive view