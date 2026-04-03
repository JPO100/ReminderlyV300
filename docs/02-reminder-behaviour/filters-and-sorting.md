# Filters and Sorting

Consolidated from `/docs/filter-system.md` and `/docs/reminder-logic.md`.

## Filter System

Reminderly has two filter menu variants for the active list, selectable via dev tools toggle.

```typescript
export type FiltersMenuVariant = "standard" | "grouped";
```

## Standard Filters (Default)

Four filter pill buttons in a single row with `justify-between` spacing:

| Button | Category | Visible |
|--------|----------|---------|
| Today | `"today"` | Always |
| This week | `"this-week"` | Always |
| Later | `"later"` | Always |
| Sometime | `"sometime"` | Hidden below 390px viewport width |

### Behaviour

- Click inactive filter: activates it
- Click active filter: resets to `"all"`
- Active button: white background, `#4784F8` text
- Inactive button: `rgba(255,255,255,0.15)` background, white text
- All buttons: 40px height, 100px border-radius, 1px white border, 16px horizontal padding, Lato bold 14px

## Grouped Filters

Three filter buttons on left, settings button on right:

| Button | Category | Notes |
|--------|----------|-------|
| Today | `"today"` | Same styling as standard |
| This week | `"this-week"` | Same styling as standard |
| Later | `"other"` | Maps to both "later" AND "sometime" categories |

### "Other" Category Mapping

The "Later" button in grouped mode uses category value `"other"`. Filter logic:

```typescript
if (activeFilter === "other") return cat === "later" || cat === "sometime";
```

Reminders categorised as either "later" or "sometime" appear when grouped "Later" filter is active.

### Settings Button

Settings gear button (LaterBtn component) opens SettingsOverlay. Only visible in grouped filters mode.

### Label Display

`getCategoryLabel()` function maps category values to display labels:

| Category value | Display label |
|----------------|---------------|
| `"today"` | "Today" |
| `"this-week"` | "This week" |
| `"later"` | "Later" |
| `"sometime"` | "Sometime" |
| `"other"` | "Later" |

Note: both `"later"` and `"other"` display as "Later".

## Switching Variants

When filters menu variant changes (via dev tools):
1. Variant state updates
2. `activeFilter` resets to `"all"`
3. If switching away from grouped mode and `showDateAndTimeSubtitles` is false, it auto-resets to true

## Overdue in Filters

Overdue reminders appear in every filter view regardless of their category:

```typescript
if (isOverdue(r, now)) return true;
```

This applies to both standard and grouped filter variants. Overdue reminders bypass category filtering.

## Category System

### Reminder Categories

```typescript
export type ReminderCategory = "today" | "this-week" | "later" | "sometime" | "other";
```

Categories derived at render time from `schedule` field:

**today** - blue `#00AFEE`
- `schedule.kind === "scheduled"` and date equals today

**this-week** - pink `#DF4DFC`
- `schedule.kind === "scheduled"` and date within current Monday-Sunday week but not today

**later** - orange `#FAA429`
- `schedule.kind === "scheduled"` and date after the current week's Sunday

**sometime** - grey `#939393`
- `schedule.kind === "sometime"`

**other** - virtual category
- Used in grouped filters mode
- Maps to "later" OR "sometime"

### Categorisation Logic

`categoriseReminder(reminder, now)` function in `reminder-utils.ts` derives category at render time.

### Week Boundary Calculation

Week uses Monday-Sunday boundary (UK convention):

```typescript
const dow = today.getDay(); // 0=Sun
const mondayOffset = dow === 0 ? -6 : 1 - dow;
const monday = new Date(today);
monday.setDate(today.getDate() + mondayOffset);
const sunday = new Date(monday);
sunday.setDate(monday.getDate() + 6);
```

### Edge Cases

On Sundays, `today.getDay()` returns 0. `mondayOffset` becomes -6, setting `monday` to the previous Monday. `sunday` is `monday + 6`, which equals the current Sunday. A reminder scheduled for the following Monday has `reminderDate > sunday`, so it categorises as "later" (orange).

## Sorting

`sortReminders(reminders, now)` function provides multi-level sort:

### Sort Priority

1. **Overdue status** (overdue items pinned to top)
2. **Category order** (today > this-week > later > sometime)
3. **Date/time** (ascending)
4. **createdAt** (ascending)

Within overdue group, category and datetime ordering is preserved.

### Sort Implementation

```typescript
function sortReminders(reminders: Reminder[], now: Date): Reminder[] {
  return [...reminders].sort((a, b) => {
    const aOverdue = isOverdue(a, now);
    const bOverdue = isOverdue(b, now);
    
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;
    
    const aCat = categoriseReminder(a, now);
    const bCat = categoriseReminder(b, now);
    const categoryOrder = { today: 0, 'this-week': 1, later: 2, sometime: 3, other: 4 };
    
    if (categoryOrder[aCat] !== categoryOrder[bCat]) {
      return categoryOrder[aCat] - categoryOrder[bCat];
    }
    
    // Date/time comparison for scheduled reminders
    // createdAt comparison for same date/time or sometime
  });
}
```

### Overdue Reminders

Overdue reminders float to top of every view. Within overdue group, normal category and date ordering applies.

## Done/Deleted View Filters

Done/deleted view has separate sub-filter system:

**Done** button - shows `completedAt != null` and `deletedAt == null`
**Deleted** button - shows `deletedAt != null`
**Default "all"** - shows both

See [Done/Deleted Archive](../01-core-surfaces/done-deleted-archive.md) for details.

## Responsive Behaviour

### Viewport < 390px

- "Sometime" button hidden (standard filters mode only)
- All other layout unchanged

### Filter Button Layout

- `justify-between` spacing (auto-width)
- 40px fixed height
- Responsive to available width

## Self-Checks

Filter and sorting behaviour verified by:
- 5 checks for `categoriseReminder` (today, this-week, this-week Monday, later, sometime)
- 4 checks for `sortReminders` (date ascending, time ascending, unscheduled after scheduled, time before no-time)
- 2 checks for overdue sort pinning (within-category and absolute-top across categories)

See [Self-Check System](../06-quality-and-dev/self-check-system.md) for details.

## Related Documentation

- [Active List](../01-core-surfaces/active-list.md) - Filter UI and interaction
- [Overdue and Status](./overdue-and-status.md) - Overdue detection logic
