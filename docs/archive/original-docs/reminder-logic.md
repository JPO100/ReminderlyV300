# Reminder Logic & Status System

## 1. Reminder Categories (Colours)

### a) Today - blue circle
- **Colour:** `#00AFEE`
- **Definition:** Reminders with a date specified that are due today
- **Requirements:** Must have a date set, date equals today

### b) This week - pink circle
- **Colour:** `#DF4DFC`
- **Definition:** Reminders with a date within the current Monday-Sunday week boundary
- **Requirements:** Must have a date set, date is within the current week but not today

### c) Later - orange circle
- **Colour:** `#FAA429`
- **Definition:** Reminders with a date beyond the current week
- **Requirements:** Must have a date set, date is after the current week's Sunday

### d) Sometime - grey circle
- **Colour:** `#939393`
- **Definition:** Reminders with no date specified
- **Requirements:** `schedule.kind === "sometime"`

---

## 2. Categorisation Logic

The `categoriseReminder` function in `reminder-utils.ts` derives the category at render time:

```typescript
function categoriseReminder(reminder: Reminder, now: Date): ReminderCategory
```

### Week boundary calculation

The week uses a Monday-Sunday boundary (UK convention):

```typescript
const dow = today.getDay(); // 0=Sun
const mondayOffset = dow === 0 ? -6 : 1 - dow;
const monday = new Date(today);
monday.setDate(today.getDate() + mondayOffset);
const sunday = new Date(monday);
sunday.setDate(monday.getDate() + 6);
```

### Known behaviours and edge cases

On Sundays, `today.getDay()` returns 0. The `mondayOffset` becomes -6, which sets `monday` to the previous Monday. `sunday` is then `monday + 6`, which equals the current Sunday. A reminder scheduled for the following Monday would have `reminderDate > sunday`, so it categorises as "later" (orange). This means on Sundays, next-week reminders correctly show as "later", but a reminder scheduled for the current Sunday shows as "this-week" (not "today") unless its date matches today exactly.

---

## 3. "Other" Category (Grouped Filters)

When using the grouped filters variant, the "Later" button maps to category `"other"`. The filter logic treats `"other"` as a union of `"later"` and `"sometime"`:

```typescript
if (activeFilter === "other") return cat === "later" || cat === "sometime";
```

The `getCategoryLabel` function maps both `"later"` and `"other"` to the display label "Later".

---

## 4. Reminder Status Icons

Each reminder displays a status icon on the right side:

| Category | Repeats? | Icon shown |
|----------|----------|-----------|
| Dated (today/this-week/later) | Yes | Repeats icon (circular arrows) |
| Dated (today/this-week/later) | No | Schedule-set icon (clock) |
| Sometime | N/A | Schedule-unset icon (no-time) |

In the active list, icons are clickable and open the ReminderInfoOverlay. In the done/deleted view, icons are not clickable.

---

## 5. Overdue Detection

### Definition

A scheduled reminder is overdue when its date/time is in the past. The `isOverdue(reminder, now)` function in `reminder-utils.ts` performs this check.

**Rules:**

- Only `kind === "scheduled"` reminders can be overdue. Sometime reminders are never overdue.
- Date-only (no time set): overdue when the date is strictly before today. Today itself is not overdue.
- Date + time: overdue when the combined datetime is before `now`.
- Applies uniformly to all scheduled reminders, including those with `repeatRule`.

### Visual treatment

Overdue reminders use `#FF0000` for: circle stroke, text colour, and status icon fill.

### Sorting behaviour

`sortReminders` uses overdue as the absolute primary sort key:

1. Overdue reminders float to the top of every view, above all non-overdue items.
2. Within overdue items, category and date/time ordering is preserved.
3. Within non-overdue items: category ordering (today > this-week > later > sometime), then date/time ascending, then createdAt ascending.

### Filtering behaviour

Overdue reminders appear in every filter view (All, Today, This Week, Later, Sometime, and grouped "Later"). They are not restricted to their original category filter.

---

## 6. Self-Checks

77 self-checks in `/src/app/dev/reminder-checks.ts`:

- 12 checks for defensive `loadReminders` (invalid JSON, non-array types, missing/invalid fields)
- 3 checks for persistence round trip (new format, hourly repeat, weekly byDay)
- 5 checks for `categoriseReminder` (today, this-week, this-week Monday, later, sometime)
- 4 checks for `sortReminders` (date ascending, time ascending, unscheduled after scheduled, time before no-time)
- 12 checks for `formatRepeatLabel` (hourly/1, hourly/3, weekly byDay, daily/2, daily with time, weekly byDay with time, daily no time, monthly with time, monthly interval 3 with time, monthly date interval 1, monthly date interval 2, monthly no date)
- 6 checks for `isOverdue` detection (yesterday date-only, today+earlier time, today+later time, tomorrow, sometime, today date-only)
- 2 checks for overdue sort pinning (within-category and absolute-top across categories)
- 2 checks for legacy hydration migration (removed schedule kind, legacy text field)
- 15 checks for `normaliseReminderText`
- 2 checks for restore from done (bucket colour consistency, overdue colour consistency)
- 7 checks for `renderReminderText` (today substitution, not-today unchanged, sometime unchanged, tomorrow substitution, not-tomorrow unchanged, recurring today, recurring not-today)
- 2 checks for date indicator label (same year, different year)
- 5 checks for `getDisplayTitle` (strip date+time, strip date only, strip time only, no strip mid-string, no strip no match)
