# Filter System

## Overview

Reminderly has two filter menu variants for the active reminder list, selectable via the dev tools "Filters menu" toggle. The variant is stored in state as `filtersMenuVariant` (type `FiltersMenuVariant`).

```typescript
export type FiltersMenuVariant = "standard" | "grouped";
```

This feature is not manually verified.

---

## 1. Standard Filters (default)

The standard variant shows four filter pill buttons in a single row with `justify-between` spacing:

| Button | Category | Visible |
|--------|----------|---------|
| Today | `"today"` | Always |
| This week | `"this-week"` | Always |
| Later | `"later"` | Always |
| Sometime | `"sometime"` | Hidden below 390px (`hidden min-[390px]:flex`) |

### Behaviour

- Clicking an inactive filter sets it as active. Clicking the active filter resets to `"all"`.
- Active button: white background, `#4784F8` text. Inactive: `rgba(255,255,255,0.15)` background, white text.
- All buttons: 40px height, rounded pill (100px radius), white 1px border, 16px horizontal padding, Lato bold 14px.

---

## 2. Grouped Filters

The grouped variant shows three filter buttons on the left and a settings button (LaterBtn component) on the right:

| Button | Category | Notes |
|--------|----------|-------|
| Today | `"today"` | Same styling as standard |
| This week | `"this-week"` | Same styling as standard |
| Later | `"other"` | Maps to both "later" and "sometime" categories |

### "Other" category mapping

The "Later" button in grouped mode uses the category value `"other"`. When filtering:

```typescript
if (activeFilter === "other") return cat === "later" || cat === "sometime";
```

This means reminders categorised as either "later" or "sometime" appear when the grouped "Later" filter is active.

### Settings button

The settings gear button (LaterBtn component) opens the Settings overlay. It is only visible in grouped filters mode.

### Label display

The `getCategoryLabel` function maps category values to display labels:

| Category value | Display label |
|---------------|---------------|
| `"today"` | "Today" |
| `"this-week"` | "This week" |
| `"later"` | "Later" |
| `"sometime"` | "Sometime" |
| `"other"` | "Later" |

Note: both `"later"` and `"other"` display as "Later".

---

## 3. Switching Variants

When the filters menu variant changes (via dev tools):

1. The variant state updates.
2. `activeFilter` resets to `"all"`.

When switching away from grouped mode:
- If `showDateAndTimeSubtitles` is false, it auto-resets to true (see [Settings](./settings.md)).

---

## 4. Overdue Reminders in Filters

Overdue reminders appear in every filter view regardless of their category. The filter logic explicitly checks:

```typescript
if (isOverdue(r, now)) return true;
```

This applies to both standard and grouped filter variants.

---

## 5. Done/Deleted View Filters

The done/deleted view has its own separate sub-filter system (Done, Deleted buttons). See [Done/Delete System](./done-delete-system.md) for details. The active list filter buttons are not visible in done/deleted view.
