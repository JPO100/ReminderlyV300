# Repeats

## Overview

Repeating reminders automatically reschedule after completion. When a reminder with a `repeatRule` is marked as done, a new instance is created with the next occurrence date/time.

## Auto-Rescheduling Flow

1. User marks repeating reminder as done
2. After `COMPLETION_DELAY` (350ms): `completedAt` set
3. After additional `RESCHEDULE_DELAY` (1000ms): next occurrence computed
4. New reminder created with same text and repeat rule
5. New reminder inserted into active list with fade-in and highlight

Total delay: 350ms + 1000ms = 1350ms from completion to new reminder insertion.

## Second-Click Cancellation

If user clicks the circle again on a repeating reminder during the in-flight completion window (before the new occurrence spawns), the completion is cancelled:

1. Tracked via `pendingRepeatCompletionIdsRef` Set
2. Cancellation clears:
   - Completion timer (350ms)
   - Reschedule timer (1000ms)
   - Pending repeat ID from tracking set
   - `pendingDoneIds` visual state
   - `completedAt` field (if already committed)
3. Reminder reverts to active state

Implemented by `cancelPendingRepeatCompletion()` in App.tsx.

## Next Occurrence Calculation

`getNextOccurrence(baseDateTime, repeatRule)` function in App.tsx computes the next occurrence relative to the scheduled datetime being completed, never relative to "now".

### Hourly
```typescript
next.setHours(next.getHours() + interval);
```

### Daily
```typescript
next.setDate(next.getDate() + interval);
```

### Weekly (no byDay)
```typescript
next.setDate(next.getDate() + 7 * interval);
```

### Weekly (with byDay)
Walk forward day by day from baseDateTime + 1 day, checking:
1. Is candidate day in allowed day set?
2. Is week distance divisible by interval?

First matching day is the next occurrence.

### Monthly
```typescript
next.setMonth(next.getMonth() + interval);
```

### Yearly
```typescript
next.setFullYear(next.getFullYear() + interval);
```

## Uncomplete Duplicate Removal

When uncompleting a repeating reminder, the system searches for and removes the auto-rescheduled duplicate:

1. Cancel any pending reschedule timer
2. Compute expected next schedule
3. Search for exactly one active reminder matching:
   - originalText
   - displayText
   - repeatRule
   - Expected next schedule
4. If one confident match found, remove it

This prevents duplicate reminders when user uncompletes before the rescheduled instance has been modified.

## Repeat Labels

`formatRepeatLabel()` function in `reminder-utils.ts` generates human-readable labels:

- "Every hour" (hourly, interval 1)
- "Every 3 hours" (hourly, interval 3)
- "Every day" (daily, interval 1)
- "Every 2 days" (daily, interval 2)
- "Every week" (weekly, interval 1, no byDay)
- "Mon, Wed, Fri" (weekly with byDay)
- "Every month" (monthly, interval 1)
- "Every 3 months" (monthly, interval 3)
- "Every year" (yearly, interval 1)

## Self-Checks

- 12 checks for `formatRepeatLabel` variations
- Completion checks verify rescheduling timing
- Uncomplete checks verify duplicate removal

See [Self-Check System](../../06-quality-and-dev/self-check-system.md) for details.

## Related Documentation

- [Repeats Overlay](../../01-core-surfaces/repeats-overlay.md) - Repeat configuration UI
- [Reminder Lifecycle](../../02-reminder-behaviour/reminder-lifecycle.md) - Completion flow
- [NLC](./nlc.md) - Repeat token parsing