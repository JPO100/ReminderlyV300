# Calendar Module Specification

This document defines the calendar date picker within the `NewReminderOverlay`, including its component hierarchy, date formatting, default/reset behavior, and animation.

---

## Overview

The calendar is an animated drawer that opens when the "Set date" toggle is turned on. It provides a month-view grid calendar for selecting a reminder date. The selected date is displayed inline next to the "Set date" label.

---

## Component Hierarchy

All components live in `/src/imports/NewReminderOverlay.tsx`.

```
NewReminderElements (state owner)
  └── ReminderOptions
        └── SetDate
              ├── SetDateFrame
              │     ├── IconDetails (icon + "Set date" label + date display)
              │     └── ToggleBtn
              └── AnimatePresence
                    └── InteractiveCalendar (month grid)
```

### State Ownership

`NewReminderElements` owns all calendar state:

```tsx
const [isDateOn, setIsDateOn] = useState(false);
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
```

State is threaded down via props:
- `isDateOn` + `onDateToggle` → controls drawer visibility
- `selectedDate` + `onDateSelect` → controls selected date

---

## Default and Reset Behavior

### Toggle On: Always Defaults to Today

When the date toggle is switched **on**, `selectedDate` is always set to today, regardless of any previously selected date:

```tsx
const handleDateToggle = () => {
  const newIsDateOn = !isDateOn;
  setIsDateOn(newIsDateOn);
  if (newIsDateOn) {
    // Always reset to today when toggling on
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDate(today);
  }
};
```

**Rationale**: Toggling the calendar off and on again is a "start fresh" action. The user expects to see today highlighted, not a stale previous selection.

### Toggle Off

Toggling off hides the calendar drawer. `selectedDate` is not explicitly cleared — it becomes irrelevant since the date label is only displayed when `isDateOn` is `true`.

### Date Selection

Tapping a day cell updates `selectedDate` via `onDateSelect`. Past dates are disabled and cannot be selected.

---

## Date Display

### Position and Style

The formatted date appears next to "Set date" in the `IconDetails` component:

```
[calendar icon] ——16px—— Set date ——20px—— Today
                                            ↑
                                    #4784F8, Lato 600
```

- **Gap**: 20px between "Set date" and date label (16px flex gap + 4px margin-left)
- **Font**: `font-['Lato',sans-serif] font-[600]` (Lato Demi Bold / SemiBold)
- **Color**: `#4784F8` (Reminderly blue)
- **Size**: `17px`, matching the "Set date" label
- **Visibility**: Only rendered when `isDateOn` is `true`

```tsx
{dateLabel && (
  <p className="font-['Lato',sans-serif] font-[600] leading-[23px] not-italic
     relative shrink-0 text-[17px] text-[#4784F8] ml-[4px]">
    {dateLabel}
  </p>
)}
```

### Formatting Rules

The `formatSelectedDate()` function applies these rules in order:

| Condition | Output | Example |
|-----------|--------|---------|
| Date equals today | `"Today"` | Today |
| Date equals tomorrow | `"Tomorrow"` | Tomorrow |
| Any other date | `"Mmm Dth"` | Jan 27th, Mar 1st |

**Abbreviated months**: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec

**Ordinal suffixes**:

```tsx
function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th'; // Special case: 11th, 12th, 13th
  switch (day % 10) {
    case 1: return 'st';  // 1st, 21st, 31st
    case 2: return 'nd';  // 2nd, 22nd
    case 3: return 'rd';  // 3rd, 23rd
    default: return 'th'; // 4th-20th, 24th-30th
  }
}
```

---

## Calendar Grid

### InteractiveCalendar Component

A self-contained month-view calendar with its own navigation state.

#### Internal State

```tsx
const [viewYear, setViewYear] = useState(today.getFullYear());
const [viewMonth, setViewMonth] = useState(today.getMonth());
```

The calendar tracks which month is currently being viewed, independent of `selectedDate`.

#### Layout

```
┌──────────────────────────────────────────────┐
│  January 2026                        ‹   ›   │  ← Month/year + nav arrows
├──────────────────────────────────────────────┤
│  MON  TUE  WED  THU  FRI  SAT  SUN          │  ← Day headers (row 1)
│                   1    2    3    4            │  ← Week rows (rows 2-6)
│   5    6    7    8    9   10   11             │
│  12   13   14   15   16   17   18            │
│  19   20   21   22   23   24   25            │
│  26   27   28   29   30                      │
└──────────────────────────────────────────────┘
```

- **Grid**: `grid grid-cols-7 grid-rows-[16px_42px_42px_42px_42px_42px]`
- **Max width**: `max-w-[340px]`, min: `min-w-[280px]`
- **Week starts**: Monday (ISO standard)
- **Background**: `backdrop-blur-[10px] bg-[rgba(255,255,255,0.6)]` (frosted glass)
- **Top border**: 1px solid `#D9D9D9` (separator from content above)

#### Day Cell States

| State | Background | Text Color | Cursor |
|-------|-----------|------------|--------|
| **Default** | transparent | `#2B5DA0` | pointer |
| **Selected** | `#08f` (blue circle) | white | pointer |
| **Past date** | transparent | `#D9D9D9` | not-allowed |

Day cells are `42px` tall with `rounded-[99px]` for the circular selection highlight.

#### Month Navigation

- **Previous month**: `handlePrevMonth()` — decrements month, wrapping year
- **Next month**: `handleNextMonth()` — increments month, wrapping year
- **Arrow icons**: SF Compact Semibold, `#0088fe`, 21px

```tsx
const handlePrevMonth = () => {
  if (viewMonth === 0) {
    setViewMonth(11);
    setViewYear(viewYear - 1);
  } else {
    setViewMonth(viewMonth - 1);
  }
};
```

#### Past Date Prevention

Days before today are disabled and visually dimmed:

```tsx
const handleDayClick = (day: number) => {
  const date = new Date(viewYear, viewMonth, day);
  date.setHours(0, 0, 0, 0);
  if (date < today) return; // No-op for past dates
  onDateSelect(date);
};
```

---

## Animated Drawer

The calendar is wrapped in a motion-animated drawer that expands/collapses when the toggle changes.

```tsx
<AnimatePresence>
  {isDateOn && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full overflow-hidden"
    >
      <div className="pt-[20px]">
        <InteractiveCalendar selectedDate={selectedDate} onDateSelect={onDateSelect} />
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

**Key Details**:
- **Animation**: Height from 0 to `auto` over 0.3s with easeInOut
- **Opacity**: Fades in alongside height expansion
- **Overflow**: `overflow-hidden` on the motion wrapper prevents content from showing during collapse
- **Top padding**: `pt-[20px]` separates the calendar from the toggle row above
- **AnimatePresence**: Enables exit animations when `isDateOn` becomes false

---

## Date Normalization (Hot Reload Safety)

A `useEffect` on mount normalizes `selectedDate` to handle edge cases from hot module replacement, where React state can persist across reloads as a serialized type (number or string) rather than a `Date` instance:

```tsx
useEffect(() => {
  setSelectedDate((prev) => {
    if (prev == null) return null;
    if (prev instanceof Date) return prev;
    if (typeof prev === 'number') {
      const d = new Date(prev);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    if (typeof prev === 'string') {
      const d = new Date(prev);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    return null;
  });
}, []);
```

This is a development-time safety net. In production, `selectedDate` is always either `null` or a `Date`.

---

## Date Comparison Utility

Used throughout the calendar to check if two dates represent the same calendar day:

```tsx
function isSameDate(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}
```

Compares year, month, and day — ignoring time components.

---

## Typography Reference

| Element | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| Month/Year header | Lato Bold | 700 | 17px | `#2B5DA0` |
| Day headers (MON, TUE...) | Lato | 600 | 13px | `rgba(0,0,0,0.2)` |
| Day numbers | Lato Bold | 700 | 17px | `#2B5DA0` / white / `#D9D9D9` |
| "Set date" label | Lato Bold | 700 | 17px | `#2B5DA0` (on) / `#939393` (off) |
| Date display | Lato | 600 | 17px | `#4784F8` |
| Nav arrows | SF Compact Semibold | 656.2 | 21px | `#0088fe` |

---

## Testing Scenarios

### Default Behavior
1. **Open overlay, toggle date on**: Calendar should appear, today should be selected, "Today" should display next to "Set date"
2. **Select a different date**: Date label should update (e.g., "Mar 5th")
3. **Toggle off, then on again**: Should reset to today, not the previously selected date

### Date Formatting
1. **Today selected**: Should show "Today"
2. **Tomorrow selected**: Should show "Tomorrow"
3. **Other date**: Should show abbreviated format (e.g., "Jan 1st", "Feb 2nd", "Mar 3rd", "Apr 11th", "May 21st")

### Navigation
1. **Arrow forward**: Should advance to next month
2. **Arrow backward**: Should go to previous month
3. **Year boundary**: December → January should increment year, January → December should decrement year

### Constraints
1. **Past dates**: Should be visually dimmed and not selectable
2. **Today**: Should always be selectable (not treated as past)

### Animation
1. **Toggle on**: Calendar should smoothly expand from 0 height
2. **Toggle off**: Calendar should smoothly collapse
3. **Rapid toggle**: Should not cause animation glitches

---

**Last Updated**: February 2026
**Source File**: `/src/imports/NewReminderOverlay.tsx`
**Related Docs**: `/docs/content-overlay-responsive.md` (overlay positioning and responsive behavior)
