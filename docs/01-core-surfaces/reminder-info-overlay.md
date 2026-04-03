# Reminder Info Overlay

## Overview

The Reminder Info overlay displays the full details of a reminder and provides Edit, Mark as Done, and Delete actions. It opens when the user clicks the status icon on any reminder row in the active list.

## Access

- Click status icon (clock, repeats, or no-time) on any active reminder row
- Sets `infoReminder` to the clicked reminder
- Overlay slides up from bottom

## Overlay Behaviour

### Opening and Closing

- Slide-up animation: `initial={{ y: "100%" }}` to `animate={{ y: 0 }}`, 250ms easeInOut
- Uses `getOverlayTopPosition()` for viewport-aware positioning
- Z-index: backdrop z-40, overlay z-50
- Closes via:
  - Backdrop tap (transparent backdrop, `bg-black/0`)
  - Close button (top-right, rotated-plus "x" icon)
  - Any action button (Edit, Done, Delete)

### Structure

```
ReminderInfoOverlay
  ├── Header (close button)
  ├── Title display (reminder text)
  ├── Schedule display (date, time, repeat label)
  ├── Edit button
  ├── Mark as done button
  └── Delete button
```

## Content Display

### Title
- Displays `reminder.displayText`
- Font: Lato Bold 17px, dark blue `#1c2c42`
- Multi-line display (no truncation)
- Wrapped in scrollable container if needed

### Schedule Display

Displays date, time, and repeat information in a structured format:

**Scheduled Reminder (with date)**
- Date: formatted as "Day DD Month YYYY" (e.g. "Monday 3 March 2026")
- Time: formatted as 12-hour (e.g. "2:30 PM") if set
- Repeat label: if repeatRule exists (e.g. "Every week", "Every 2 days")

**Sometime Reminder**
- "No date / time set"

**Visual Styling**
- Font: Lato SemiBold 15px
- Colour: `#939393` (grey)
- Multi-line layout

### Date Formatting

Uses `formatSelectedDate()` function:
- Full weekday name
- Day number
- Full month name
- Year (if different from current year)

Examples:
- "Monday 3 March" (same year)
- "Tuesday 15 January 2027" (different year)

### Repeat Label

Uses `formatRepeatLabel()` function from `reminder-utils.ts`:
- "Every hour" (hourly, interval 1)
- "Every 3 hours" (hourly, interval 3)
- "Every day" (daily, interval 1)
- "Every 2 days" (daily, interval 2)
- "Every week" (weekly, interval 1, no byDay)
- "Mon, Wed, Fri" (weekly with byDay)
- "Every month" (monthly, interval 1)
- "Every 3 months" (monthly, interval 3)
- "Every year" (yearly, interval 1)

## Action Buttons

### Edit Button

- Label: "Edit"
- Visual: Blue button, Lato Bold 17px
- Click: closes info overlay, opens edit overlay after 200ms delay
- Delay implemented via `overlayEditTimerRef` (guarded, cleared before rescheduling and on unmount)
- Edit overlay prepopulates with reminder data

See [New Reminder Overlay](./new-reminder-overlay.md) for edit mode behaviour.

### Mark as Done Button

- Label: "Mark as done"
- Visual: Blue button, Lato Bold 17px
- Click: closes info overlay, triggers completion after 200ms delay
- Completion flow:
  1. Immediate visual commit: add to `pendingDoneIds`
  2. 350ms delayed data commit: set `completedAt = Date.now()`
  3. For repeating reminders: additional 1000ms delay, insert next occurrence
  4. Exit animation via AnimatePresence

Total perceived delay: 200ms (overlay close) + 350ms (completion) = 550ms. Visual transition begins at 200ms mark.

See [Done/Deleted Archive](./done-deleted-archive.md) for completion behaviour.

### Delete Button

- Label: "Delete"
- Visual: Red button `#FF0000`, Lato Bold 17px
- Click: triggers delete handler immediately (no 200ms delay)
- Delete flow:
  1. Cancel any pending completion, uncomplete, reschedule, or undelete timers
  2. Clear from all other pending visual sets
  3. Immediate visual commit: add to `pendingDeleteIds`
  4. Close info overlay
  5. 350ms delayed data commit: set `deletedAt = Date.now()`
  6. Exit animation via AnimatePresence

See [Done/Deleted Archive](./done-deleted-archive.md) for deletion behaviour.

## Button Layout

Buttons arranged vertically with spacing:
- Edit button (top)
- Mark as done button (middle)
- Delete button (bottom, red colour)

All buttons: full-width, 50-60px height, rounded, white text (or red for delete).

## Responsive Behaviour

- Uses `getOverlayTopPosition()` for viewport-aware positioning
- Content max-width: 768px, centered
- Padding: 26px top, 20px horizontal
- Buttons stack vertically on all screen sizes
- See [Content Overlay Responsive](../05-design-and-layout/content-overlay-responsive.md) for full pattern

## Interaction Constraints

- Info overlay does not open from done/deleted view (status icons not clickable in archive)
- Info overlay does not reopen after Edit save (user returns to list view)
- Cannot open info overlay while new reminder overlay or edit overlay is open
- Timer guards prevent race conditions between Edit and Delete actions

## File Location

`/src/app/components/ReminderInfoOverlay.tsx`

## Dependencies

- formatSelectedDate: `/src/imports/NewReminderOverlay.tsx`
- formatRepeatLabel: `/src/app/reminder-utils.ts`
- getOverlayTopPosition: inline in overlay components
