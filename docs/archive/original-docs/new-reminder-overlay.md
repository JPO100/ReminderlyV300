# New Reminder Overlay - Technical Documentation

This document provides a comprehensive technical reference for the New Reminder Overlay system, covering architecture, state management, toggle logic, drawer animations, indicator text formatting, and cross-component coordination. It is intended for developer review.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Hierarchy](#component-hierarchy)
3. [State Ownership & Data Flow](#state-ownership--data-flow)
4. [Types](#types)
5. [Submit Button Logic](#submit-button-logic)
6. [Date System](#date-system)
7. [Time System](#time-system)
8. [Repeats System](#repeats-system)
9. [Cross-Feature Interactions](#cross-feature-interactions)
10. [Drawer System](#drawer-system)
11. [Indicator Text & Label Alignment](#indicator-text--label-alignment)
12. [Icon System](#icon-system)
13. [Colour Reference](#colour-reference)
14. [Overlay Lifecycle](#overlay-lifecycle)
15. [Known Issues & Gotchas](#known-issues--gotchas)

---

## Architecture Overview

The New Reminder Overlay is a bottom-sheet overlay that slides up from the bottom of the screen. It contains:

- A **header** row with title and submit button
- A **textarea** for reminder text input
- Three **option rows** (Date, Time, Repeats), each with an icon, label, indicator text, and toggle
- **Animated drawers** that expand/collapse below the Date and Time rows
- A **separate full overlay** for Repeats configuration (lives in its own component)

### File Locations

| File | Purpose |
|------|---------|
| `/src/app/App.tsx` | Top-level state owner for `RepeatConfig` and overlay open/close booleans |
| `/src/imports/NewReminderOverlay.tsx` | Main overlay component with all Date/Time/Repeats toggle logic |
| `/src/imports/TimePicker.tsx` | Scroll-wheel time picker (hours 0-23, minutes 0/15/30/45) |
| `/src/app/components/RepeatsOverlay.tsx` | Full-screen repeats configuration overlay |

---

## Component Hierarchy

```
App.tsx
  |
  +-- AnimatePresence > motion.div (backdrop + slide-up container)
  |     |
  |     +-- NewReminderOverlay (wrapper with rounded top corners)
  |           |
  |           +-- NewReminderElements (stateful inner component)
  |                 |
  |                 +-- Header
  |                 |     +-- AddTickBtn (submit button)
  |                 |
  |                 +-- motion.textarea (reminder text input)
  |                 |
  |                 +-- ReminderOptions
  |                       |
  |                       +-- SetDate
  |                       |     +-- SetDateFrame (icon + label + indicator + toggle)
  |                       |     +-- AnimatePresence > InteractiveCalendar (drawer)
  |                       |
  |                       +-- SetTime
  |                       |     +-- SetTimeFrame (icon + label + indicator + toggle)
  |                       |     +-- AnimatePresence > TimePicker (drawer)
  |                       |
  |                       +-- SetRepeats
  |                             +-- SetRepeatsFrame (icon + label + indicator + toggle)
  |
  +-- AnimatePresence > motion.div (repeats overlay)
        |
        +-- RepeatsOverlay
```

---

## State Ownership & Data Flow

### State in `App.tsx` (lifted/shared state)

| State | Type | Purpose |
|-------|------|---------|
| `isOverlayOpen` | `boolean` | Controls new reminder overlay visibility |
| `isRepeatsOverlayOpen` | `boolean` | Controls repeats overlay visibility |
| `repeatConfig` | `RepeatConfig` | The current repeat configuration, shared between NewReminderOverlay (display) and RepeatsOverlay (editing) |

### State in `NewReminderElements` (local/ephemeral state)

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| `isDateOn` | `boolean` | `false` | Date toggle state |
| `isTimeOn` | `boolean` | `false` | Time toggle state |
| `isRepeatsOn` | `boolean` | `false` | Repeats toggle state |
| `openDrawer` | `'date' \| 'time' \| 'repeats' \| null` | `null` | Which drawer is currently expanded (mutually exclusive) |
| `selectedDate` | `Date \| null` | `null` | Currently selected date |
| `selectedTime` | `{ hour: number; minute: number } \| null` | `null` | Currently selected time |
| `reminderText` | `string` | `''` | Textarea content |
| `viewportHeight` | `number` | `window.innerHeight` | Tracked for responsive textarea height |

**Important**: All local state in `NewReminderElements` is ephemeral - it resets every time the overlay closes because the component unmounts via `AnimatePresence`.

### Props passed into `NewReminderOverlay`

```typescript
{
  onRepeatsOverlayOpen: () => void;      // Callback to open repeats overlay
  repeatConfig: RepeatConfig;             // Current repeat config (for indicator display)
  onRepeatConfigChange: (config: RepeatConfig) => void;  // Callback to update config
  isRepeatsOverlayOpen: boolean;          // Whether repeats overlay is currently open
}
```

### Props passed into `RepeatsOverlay`

```typescript
{
  onClose: (config?: RepeatConfig) => void;  // Close callback, optionally saves config
  initialConfig: RepeatConfig;                // Config to initialize from (preserves previous selection)
}
```

---

## Types

### `RepeatConfig` (owned in `App.tsx`, exported)

```typescript
export type RepeatConfig = {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom-days';
  interval: number;
  selectedDays?: string[];  // Only used when frequency === 'custom-days'
} | null;
```

---

## Submit Button Logic

The "Add new reminder" button (`AddTickBtn`) has two visual states:

| State | Button Fill | Tick Fill | Cursor |
|-------|-----------|----------|--------|
| **Inactive** (default) | `#F5F5F5` | `#D5D5D5` | `cursor-default` |
| **Active** | `#4784F8` | `#F0FAFE` | `cursor-pointer` |

### Activation Condition

```typescript
const isSubmitActive = reminderText.trim().length > 0;
```

The button activates when the textarea contains non-whitespace text. No date or time toggle is required.

The button is also `disabled={!active}` to prevent interaction when inactive.

---

## Date System

### Toggle Behaviour (`handleDateToggle`)

**Turning ON:**
1. Sets `isDateOn = true`
2. Opens the date drawer (`openDrawer = 'date'`)
3. Defaults `selectedDate` to today (midnight, hours zeroed)

**Turning OFF:**
1. Sets `isDateOn = false`
2. Clears `selectedDate` to `null`
3. Closes the date drawer if it was open
4. **Cascades to time**: If time is currently on, turns time off, clears `selectedTime` to `null`, and closes the time drawer if it was open
5. Repeats is not affected

### Calendar Component (`InteractiveCalendar`)

- **Grid layout**: 7-column CSS grid with Monday-first week
- **Month navigation**: SF Compact arrow glyphs (`handlePrevMonth` / `handleNextMonth`)
- **Past date prevention**: Days before today are disabled (`cursor-not-allowed`, text `#D9D9D9`)
- **Selected state**: Blue circle background (`#08f`), white text
- **Date utilities**:
  - `getDaysInMonth(year, month)` - calculates days using Date overflow trick
  - `getFirstDayOffset(year, month)` - converts JS `getDay()` (Sunday-first) to Monday-first offset
  - `isSameDate(a, b)` - year/month/day comparison (ignores time)

### Date Indicator Text Formatting (`formatSelectedDate`)

| Condition | Display |
|-----------|---------|
| Today | `"Today"` |
| Tomorrow | `"Tomorrow"` |
| Other | `"Mon 5th"`, `"Jan 23rd"`, etc. (short month + day + ordinal suffix) |

Ordinal suffix logic handles the `11th/12th/13th` exception.

### Label Click Behaviour

Clicking the blue indicator text toggles the calendar drawer open/closed without changing the toggle state. This allows the user to collapse the calendar while keeping the date set.

---

## Time System

### Toggle Behaviour (`handleTimeToggle`)

**Turning ON:**
1. Sets `isTimeOn = true`
2. Opens the time drawer (`openDrawer = 'time'`)
3. Defaults `selectedTime` to `{ hour: 12, minute: 0 }` (noon)
4. **Auto-enables date** if not already on: sets `isDateOn = true` and `selectedDate` to today (rationale: a time must be attached to a date)

**Turning OFF:**
1. Sets `isTimeOn = false`
2. Clears `selectedTime` to `null`
3. Closes the time drawer if it was open
4. Date and repeats are not affected

### Time Picker Component (`TimePicker`)

Located in `/src/imports/TimePicker.tsx`.

**Architecture**: Two independent scroll-wheel columns rendered side-by-side.

| Column | Values | Format |
|--------|--------|--------|
| Hours | `0-23` (24 values) | Zero-padded two digits (`00`, `01`, ... `23`) |
| Minutes | `0, 15, 30, 45` (4 values) | Zero-padded two digits (`00`, `15`, `30`, `45`) |

**Wheel Column (`WheelColumn`) mechanics**:
- `ITEM_HEIGHT = 38px`, `VISIBLE_ITEMS = 7`, `CENTER_INDEX = 3`
- `CROP = 12px` trims top/bottom for a tighter visual
- Selected item highlight: `#F5F5F5` rounded rectangle behind centre slot
- Supports **pointer drag** (with velocity/momentum) and **mouse wheel** scroll
- Non-passive wheel listener to prevent page scroll (`e.preventDefault()`)
- Visual distortion on off-centre items: decreasing `fontSize`, `opacity`, and `skewX` transform

**Scroll accumulator**: Mouse wheel events use a threshold (`50`) accumulator pattern to prevent over-sensitive scrolling.

**Snap behaviour**: On pointer up, combines drag distance + momentum (`velocity * 40`) to calculate target index, then snaps via `snapToIndex`.

### Time Indicator Text Formatting (`formatSelectedTime`)

| Condition | Display |
|-----------|---------|
| Minute is 0 | `"12pm"`, `"3am"` (no colon, no minutes) |
| Minute is non-zero | `"12:30pm"`, `"3:15am"` |
| Hour 0 | Displays as `12am` |
| Hour 12 | Displays as `12pm` |

Uses 12-hour format with lowercase am/pm, no space.

### Label Click Behaviour

Same as Date: clicking the blue indicator text toggles the time picker drawer open/closed.

---

## Repeats System

### Toggle Behaviour (`handleRepeatsToggle`)

**Turning ON:**
1. Sets `isRepeatsOn = true`
2. After **200ms delay**: opens the Repeats overlay (`onRepeatsOverlayOpen()`)
3. After **1000ms delay**: sets `openDrawer = 'repeats'` (collapses any open Date/Time drawer). The delay ensures the repeats overlay slides in on top before the drawer underneath collapses.

**Turning OFF:**
1. Sets `isRepeatsOn = false`
2. Clears `repeatConfig` to `null` via `onRepeatConfigChange(null)`
3. Closes the repeats drawer if it was the active one

### Auto-Toggle-Off on Empty Close

When the Repeats overlay closes without a frequency being set (i.e., `repeatConfig` is `null`), the repeats toggle automatically switches off after **200ms**.

**Implementation**: A `useRef` (`prevRepeatsOverlayOpenRef`) tracks the previous `isRepeatsOverlayOpen` value. A `useEffect` detects the transition from `true` to `false` and checks if `repeatConfig` is still `null`.

```typescript
useEffect(() => {
  const wasOpen = prevRepeatsOverlayOpenRef.current;
  prevRepeatsOverlayOpenRef.current = isRepeatsOverlayOpen;

  if (wasOpen && !isRepeatsOverlayOpen && !repeatConfig) {
    const timer = setTimeout(() => {
      setIsRepeatsOn(false);
    }, 200);
    return () => clearTimeout(timer);
  }
}, [isRepeatsOverlayOpen, repeatConfig]);
```

### Repeats Overlay Component (`RepeatsOverlay.tsx`)

**Layout**: Full overlay with back button (centred title, absolute-positioned back button on left), followed by 5 frequency buttons in vertical stack with `gap-[30px]`.

**Frequency buttons** (in order):
1. Custom days
2. Hourly
3. Daily
4. Weekly
5. Monthly

Note: The `yearly` frequency is not available as a button in the RepeatsOverlay. It is only reachable via NLC (`"every year"`).

**Button states**:
| State | Background | Text Colour |
|-------|-----------|-------------|
| Inactive | `#F5F5F5` | `#939393` |
| Active | `#E4E4E4` | `#4784F8` |

**Drawer pattern**: Each frequency button has a collapsible drawer below it using `max-height` transitions (300ms ease-in-out). Only one frequency can be active at a time (selecting a new one deselects the previous).

**Re-toggle reset**: When a frequency is toggled off then back on, its counter/selection resets to default (interval = 1, selectedDays = empty Set).

### Interval Counters (Hourly, Daily, Weekly, Monthly)

Each counter drawer contains: **minus button** | **label text** | **plus button**

- Minus button: disabled at count `1` (fill changes to `#F5F5F5`)
- Plus button: always active (`#4784F8`)
- Both buttons are `size-[50px]` with `leading-[0]` and `inset-0` on SVGs (fixes theme.css `line-height: 1.5` button inflation)

**Label text format**:
| Count | Example |
|-------|---------|
| 1 | `"Repeats every hour"` / `"Repeats every day"` / etc. |
| >1 | `"Repeats every 3 hours"` / `"Repeats every 2 weeks"` / etc. |

### Custom Days Drawer

- Displays a checkbox list of Monday through Sunday
- Checkboxes use Figma-imported SVGs:
  - **Unchecked**: Grey circle outline (`#939393` stroke, white fill)
  - **Checked**: Blue filled circle (`#4784F8`) with cream checkmark (`#FEF6EA`)
- Text colour: `#939393` (unchecked) / `#4784F8` (checked)
- Multiple days selectable
- Container uses `w-fit mx-auto` for centred-but-left-aligned layout
- Rows have `gap-[25px]` vertical spacing

### Repeats Indicator Text Formatting (`formatRepeatConfig`)

| Condition | Display |
|-----------|---------|
| All 7 days selected | `"Every day"` |
| Mon-Fri only (5 days) | `"Weekdays"` |
| Other custom days | Comma-separated short names sorted in weekday order: `"Mon, Wed, Fri"` |
| Hourly/daily/weekly/monthly, interval 1 | `"Every hour"` / `"Every day"` / etc. |
| Hourly/daily/weekly/monthly, interval >1 | `"Every 3 hours"` / `"Every 2 weeks"` / etc. |

**Short name mapping**: Mon, Tue, Wed, Thur, Fri, Sat, Sun (note: Thursday is abbreviated `"Thur"`, not `"Thu"`).

### Config Construction on Close (`getCurrentConfig`)

When the back button is pressed, `getCurrentConfig()` builds the `RepeatConfig`:
- If no frequency is active: returns `null`
- If `custom-days` with no days selected: returns `null`
- Otherwise: returns `{ frequency, interval, selectedDays? }`

For `custom-days`, `interval` is set to `selectedDays.length`.

### Label Click Behaviour

Clicking the repeats indicator text reopens the Repeats overlay (does not toggle a drawer). The overlay receives `initialConfig={repeatConfig}` so the previous selection is preserved.

---

## Cross-Feature Interactions

### Date/Time Invariant

Time requires a date. This invariant is enforced in the manual toggle handlers:

- **Date OFF cascades to time OFF**: Toggling date off also turns time off, clears both `selectedDate` and `selectedTime`, and closes the time drawer if open. Repeats is unaffected.
- **Time ON auto-enables date**: Toggling time on when date is off turns date on and defaults to today. The date drawer does not open.
- **Time OFF clears time only**: Toggling time off clears `selectedTime`. Date and repeats are unchanged.

This invariant is not enforced through `applyToggleStateSilently` (used by NLC token application and invalidation). It applies only to user-initiated toggle interactions.

### Repeats Visibility

The Repeats row uses a disabled visual state when neither Date nor Time is active:
- `opacity-30` and `pointer-events-none`
- Prevents user from toggling repeats without a schedule anchor

### Overlay Close Reset

When the new reminder overlay backdrop is tapped:
- `isOverlayOpen` is set to `false` (in `App.tsx`)
- `repeatConfig` is reset to `null` (in `App.tsx`)
- All local state in `NewReminderElements` is destroyed (component unmounts via `AnimatePresence`)

This ensures a fresh state on next open with all toggles OFF and all drawers closed.

### Drawer Mutual Exclusivity

Only one drawer can be open at a time. The `openDrawer` state is a single union value (`'date' | 'time' | 'repeats' | null`). Opening one drawer implicitly closes any other.

---

## Drawer System

### Animation Pattern

Date and Time drawers use `motion.div` with `AnimatePresence`:

```
initial:  { height: 0, opacity: 0 }
animate:  { height: "auto", opacity: 1 }
exit:     { height: 0, opacity: 0 }
transition: { duration: 0.3, ease: "easeInOut" }
```

The drawer content is wrapped in `overflow-hidden` on the motion container, with a `pt-[20px]` inner spacer and a bottom border (`#EDEDED`).

### Repeats Drawer Timing

The repeats "drawer" doesn't expand inline - it opens a separate overlay. The timing sequence is:

1. `t = 0ms`: Toggle ON, `isRepeatsOn = true`
2. `t = 200ms`: Repeats overlay opens (slides up from bottom)
3. `t = 1000ms`: `openDrawer` set to `'repeats'` (collapses any open Date/Time drawer underneath the overlay)

This creates a smooth visual where the overlay covers the content before the drawer collapses.

---

## Indicator Text & Label Alignment

### Label Width Alignment

All three row labels (`Date`, `Time`, `Repeats`) have `min-w-[68px]` to ensure the blue indicator text starts at the same horizontal position across all rows. `"Repeats"` is the longest label and sets the effective column width.

### Indicator Text Styling

All three indicator text elements share:
- Font: `Lato` weight `600`
- Size: `17px`
- Colour: `#4784F8` (primary blue)
- `ml-[4px]` left margin from label
- `cursor-pointer` (clickable to reopen drawer/overlay)
- `truncate` class (single-line with ellipsis overflow)

### Container Layout

Each `icon-details` container uses `min-w-0 flex-1` to enable truncation within a flex layout. There is a `gap-[16px]` between the indicator text area and the toggle button on all three rows.

---

## Icon System

### Icon Names and Sizes

| Icon | Data Attribute | Size | Used By |
|------|---------------|------|---------|
| Schedule (Date/Time) | `icon-schedule-set` | `25x25px` | Date row, Time row |
| Repeats | `icon-repeats` | `25x25.071px` | Repeats row |

### Icon Colour States

| State | Colour |
|-------|--------|
| Toggle OFF | `#B7B7B7` |
| Toggle ON | `#4784F8` |

Both icons use the same colour variable driven by their respective toggle state.

---

## Colour Reference

| Element | Colour | Usage |
|---------|--------|-------|
| `#4784F8` | Primary blue | Toggle ON fill, indicator text, submit button active, plus buttons |
| `#4784F8` | Dark navy | Icon ON state, text headings, active frequency button text, checked day text |
| `#B7B7B7` | Medium grey | Icon OFF state |
| `#939393` | Dark grey | Inactive frequency button text, unchecked day text, unchecked checkbox stroke |
| `#F5F5F5` | Light grey | Inactive button fill, disabled minus button fill, submit button inactive fill |
| `#E4E4E4` | Medium light grey | Active frequency button fill |
| `#D9D9D9` | Toggle OFF track fill, past calendar day text |
| `#D5D5D5` | Inactive submit tick colour |
| `#EDEDED` | Border/divider lines |
| `#F0FAFE` | Active submit tick colour |
| `#FEF6EA` | Checked checkbox tick SVG fill |
| `#08f` / `#0088ff` | Calendar selected day background |
| `#bababa` | Textarea placeholder text |
| `#f7f7f7` | Textarea background |

---

## Overlay Lifecycle

### Opening

1. User taps "New reminder" button in main app
2. `isOverlayOpen = true` in `App.tsx`
3. `AnimatePresence` mounts backdrop + motion container
4. Motion container slides up from `y: "100%"` to `y: 0`
5. `NewReminderElements` mounts with all state at defaults (all toggles OFF, no text, no drawers open)

### Closing

1. User taps backdrop (the transparent overlay behind the sheet)
2. `isOverlayOpen = false` and `repeatConfig = null` in `App.tsx`
3. Motion container animates exit (`y: "100%"`)
4. `AnimatePresence` unmounts all children, destroying local state

### Overlay Positioning

The overlay `top` position is calculated dynamically based on viewport height:

| Viewport Height | Top Position | Description |
|----------------|-------------|-------------|
| `> 570px` | `121.653px` | 16px below logo bottom |
| `<= 570px` | `54px` | 16px above logo top |

### Textarea Responsive Height

The textarea height animates based on viewport:

| Viewport Height | Textarea Height |
|----------------|----------------|
| `> 630px` | `80px` |
| `<= 630px` | `50px` |

Animated with `motion.textarea` (300ms ease-in-out).

---

## Known Issues & Gotchas

### 1. `theme.css` Line-Height on Buttons

`theme.css` applies `line-height: 1.5` to all `<button>` elements. This inflates button boxes beyond their explicit `size-[50px]`. Fixed on RepeatsOverlay's +/- buttons by adding `leading-[0]` and `inset-0` on the inner SVGs. May need attention on other buttons.

### 2. RepeatsOverlay Nested Padding

The `container-frame` divs in `RepeatsOverlay.tsx` have `px-[20px]`, which sits inside the parent's `px-[20px]`, giving content 40px total padding per side while frequency buttons only have 20px padding. This creates a visual misalignment.

### 3. RepeatsOverlay Content Slide Origin

The `py-[40px]` on content inside the `overflow-hidden` drawer container causes content to appear to slide in from below the button rather than directly from it, because the top padding is inside the collapsible area.

### 4. SVG Path Imports

The overlay uses multiple SVG path imports:
- `svg-k8owpv3rm6` - Main overlay icons (schedule, tick, etc.)
- `svg-4l9vgb24m5` - Unset icon paths (imported but check if still referenced)
- `svg-prkucc25l` - RepeatsOverlay back button arrow
- `svg-upkw3rt5ea` - RepeatsOverlay plus/minus button icons
- `svg-w98xpyjjva` - RepeatsOverlay checkbox tick

### 5. Component Unmount = State Reset

Because `NewReminderElements` unmounts when the overlay closes (via `AnimatePresence`), all local state (toggles, selected date/time, reminder text) is destroyed. Only `repeatConfig` survives in `App.tsx`, and it is explicitly reset to `null` on backdrop close. This is intentional - each overlay open is a fresh start.

### 6. SF Compact Font for Calendar Arrows

The calendar navigation arrows use SF Compact Semibold glyphs (`font-[656.2]`). These are Apple system font characters and may not render on non-Apple platforms. Consider fallback.
