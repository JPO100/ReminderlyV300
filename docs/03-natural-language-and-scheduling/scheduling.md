# Scheduling

## Schedule Data Model

```typescript
export type ReminderSchedule =
  | { kind: "scheduled"; date: string; time?: string }
  | { kind: "sometime" };
```

### Scheduled Reminders

- **date**: `yyyy-mm-dd` format string (e.g. "2026-03-11")
- **time**: `HH:mm` format string (e.g. "14:30"), optional
- Date-only reminders have no time field

### Sometime Reminders

- No date or time
- Displayed with grey circle and "No date / time set" subtitle

## Schedule Equality

`scheduleEquality()` function in `/src/app/utils/schedule.ts` compares schedules for exact equality.

Used for:
- Detecting schedule changes in edit mode
- Finding duplicate reminders (uncomplete repeat dedupe)

## Schedule Delta Detection

Determines what changed between two schedules:
- Date changed
- Time changed
- Repeat rule changed
- Schedule kind changed (scheduled ↔ sometime)

## Date/Time Invariant

**Time requires date.** The system enforces this invariant in manual toggle handlers.

### Rules

1. **Date OFF cascades to time OFF**: Turning date off also turns time off
2. **Time ON auto-enables date**: Turning time on when date is off automatically enables date (defaults to today)
3. **Time OFF clears time only**: Turning time off leaves date unchanged

### Enforcement

Enforced in manual toggle click handlers, NOT in:
- `applyToggleStateSilently()` (used by NLC)
- NLC token application
- Edit mode prepopulation

## Date Formatting

### Storage Format

`yyyy-mm-dd` string (e.g. "2026-03-11")

### Display Format

`formatSelectedDate()` produces:
- "Monday 3 March" (same year)
- "Tuesday 15 January 2027" (different year)

Full weekday name, day number, full month name, optional year.

## Time Formatting

### Storage Format

`HH:mm` 24-hour string (e.g. "14:30")

### Display Format

`formatTime12h()` produces:
- "2:30 PM"
- "7:00 AM"

12-hour format with AM/PM.

## Week Boundary Calculation

Monday-Sunday week boundary (UK convention):

```typescript
const dow = today.getDay(); // 0=Sun
const mondayOffset = dow === 0 ? -6 : 1 - dow;
const monday = new Date(today);
monday.setDate(today.getDate() + mondayOffset);
const sunday = new Date(monday);
sunday.setDate(monday.getDate() + 6);
```

Used for "this-week" category detection.

## Self-Checks

37 schedule checks covering:
- Schedule equality comparison
- Schedule delta detection
- Date formatting and parsing
- Week boundary calculation
- Time utilities

See [Self-Check System](../../06-quality-and-dev/self-check-system.md) for details.

## Related Documentation

- [Calendar and Time Picker](./calendar-and-time-picker.md) - Date/time picker UI
- [NLC](./nlc.md) - Schedule setting via NLC
- [Data Model and Persistence](../../00-overview/data-model-and-persistence.md) - Data schema
