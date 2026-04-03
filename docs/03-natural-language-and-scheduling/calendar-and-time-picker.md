# Calendar and Time Picker

## Overview

The calendar and time picker components provide visual interfaces for selecting dates and times within the new reminder overlay.

## Calendar Picker

Inline calendar drawer that opens below the date toggle when date is enabled.

### Features

- Month/year header with navigation arrows
- 7-column grid (Sunday - Saturday)
- Day selection via click
- Today highlight (blue outline)
- Selected date highlight (blue background)
- Disabled days: none (all days selectable)

### Navigation

- Left arrow: Previous month
- Right arrow: Next month
- Month/year label: Current month display (not clickable)

### Visual States

- **Today**: Blue outline, normal background
- **Selected**: Blue background, white text
- **Today + Selected**: Blue background, white text (selected takes precedence)
- **Other days**: White background, dark text

### Date Format

Returns date as `yyyy-mm-dd` string to parent component.

## Time Picker

Inline time picker drawer that opens below the time toggle when time is enabled.

### Layout

Two-column scrollable picker:
- **Left column**: Hours (1-12)
- **Right column**: Minutes (00, 15, 30, 45) + AM/PM

### Features

- Scrollable columns
- Selected values highlighted in blue
- Quarter-hour intervals only (00, 15, 30, 45)
- 12-hour format

### Constraints

- Minutes restricted to quarter-hours by design
- Matches NLC time token recognition (quarter-hours only)
- 12-hour format (no 24-hour picker UI, though 24h NLC tokens supported)

### Time Format

Returns time as `HH:mm` string (24-hour format) to parent component, converted from 12h picker selection.

## Integration

Both pickers are integrated into NewReminderOverlay:

```
NewReminderOverlay
  ├── Date toggle
  ├── Calendar drawer (conditional)
  ├── Time toggle
  └── Time picker drawer (conditional)
```

### Drawer Behaviour

- Opens inline when toggle turns on
- Closes when toggle turns off
- Does NOT open automatically when NLC applies date/time
- Drawer state is user-controlled only

## Responsive Behaviour

- Calendar compresses vertically on small viewports
- Time picker maintains scroll functionality
- Both use standard overlay responsive pattern

## File Locations

- Calendar: Inline in `/src/imports/NewReminderOverlay.tsx`
- Time Picker: `/src/imports/TimePicker.tsx`

## Related Documentation

- [New Reminder Overlay](../../01-core-surfaces/new-reminder-overlay.md) - Integration context
- [Scheduling](./scheduling.md) - Date/time data model
- [NLC](./nlc.md) - NLC time token constraints

For full calendar module documentation, see original `/docs/calendar-module.md`.
