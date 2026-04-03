# Developer Tools

## Overview

Reminderly includes a built-in developer tools system accessible via triple-tapping the logo text in the header. Dev tools provide diagnostic and testing capabilities that do not affect the production user experience.

---

## 1. Access

Triple-tap the text portion of the Reminderly logo (the right 75% of the logo area; the left 22% is the done/deleted view toggle). A 500ms timeout resets the click counter if taps are too slow.

The logo clickable areas:
- Left 0-22%: tick circle click area (toggles done/deleted view).
- Left 25%-100%: text click area (dev tools triple-tap counter).

---

## 2. Overlay Behaviour

The DevTools overlay uses the standard slide-up overlay pattern:
- Slide-up from bottom, 250ms easeInOut.
- Uses shared `getOverlayTopPosition()` for viewport-aware positioning.
- Closes via backdrop tap or close button ("x" icon, rotated-plus SVG).
- Z-index: backdrop z-40, overlay z-50.

---

## 3. Navigation Structure

The overlay uses an internal page state (`DevToolsPage`) with these pages:

### Home page

Rendered by `/src/imports/DevTools.tsx`. Shows:

| Row | Label | Navigates to |
|-----|-------|-------------|
| 1 | Automated tests | `'tests'` page |
| 2 | Dummy reminders | `'dummy-reminders'` page |
| 3 | Natural Language Capture | `'nlc'` page |
| 4 | Filters menu | `'filters-menu'` page |

Plus a "Clear reminders list" destructive button at the bottom (red, with 2-step confirmation: "Are you sure?" then "Cleared!").

### Automated tests page

Runs the self-check suite (all check files aggregated). Displays pass/fail count, duration, individual results, and provides copy-to-clipboard functionality.

Check suites included:
- Schedule checks (`schedule-checks.ts`)
- Reminder checks (`reminder-checks.ts`) - 77 checks
- NLC parser checks (`nlc-parser-checks.ts`)
- NLC interaction checks (`nlc-interaction-checks.ts`)
- Done/deleted checks (`done-deleted-checks.ts`) - 9 checks
- Completion checks (`completion-checks.ts`) - 13 checks

### Dummy reminders page

Rendered by `/src/imports/DummyReminders.tsx`. Generates test reminders across category buckets. Also contains the "Hide overdue reminders" toggle (see below).

### NLC page

A/B toggle between click-parsing mode and auto-parsing mode for NLC. See [NLC documentation](./nlc.md) for details on these modes.

### Filters menu page

A/B toggle between standard and grouped filter variants. See [Filter System](./filter-system.md) for details.

---

## 4. Dev-Only State

All dev-only state lives in `App.tsx`:

| State | Type | Default | Persisted | Purpose |
|-------|------|---------|-----------|------------|
| `nlcMode` | `'click' \| 'auto'` | `'auto'` | No | NLC parsing mode |
| `filtersMenuVariant` | `'standard' \| 'grouped'` | `'standard'` | No | Filter menu variant |
| `hideOverdue` | `boolean` | `false` | No | Hides overdue reminders from all views |

### NLC mode

Controls how NLC tokens are applied in the new reminder overlay:
- `'click'`: tokens highlight but user must click to apply.
- `'auto'`: tokens auto-apply after 200ms debounce.

### Filters menu variant

Switches between standard (4 filter pills) and grouped (3 pills + settings button) layouts. Changing variant resets `activeFilter` to `"all"`.

### Hide overdue reminders

When enabled, filters out all overdue reminders from both the active list and done/deleted list at render time:

```typescript
const displayReminders = hideOverdue ? reminders.filter(r => !isOverdue(r, now)) : reminders;
```

This is applied before any view-specific filtering.

---

## 5. Files Involved

| File | Role |
|------|------|
| `/src/app/App.tsx` | Logo click handler, dev-only state, overlay mounting |
| `/src/app/components/DevToolsOverlay.tsx` | Overlay shell, page routing, NLC page, filters menu page, self-checks page |
| `/src/imports/DevTools.tsx` | Home page layout, nav rows, clear button |
| `/src/imports/DummyReminders.tsx` | Dummy reminders generation UI, hide overdue toggle |
| `/src/app/dev/check-system.ts` | Check runner framework |
| `/src/app/dev/*-checks.ts` | Individual check suites |
| `/src/app/utils/dummy-generator.ts` | Dummy reminder generation logic |
