# Dev Tools Overlay

Consolidated from `/docs/dev-tools.md`.

## Overview

Reminderly includes a built-in developer tools system accessible via triple-tapping the logo text in the header. Dev tools provide diagnostic and testing capabilities that do not affect the production user experience.

## Access

Triple-tap the text portion of the Reminderly logo (the right 75% of the logo area; the left 22% is the done/deleted view toggle). A 500ms timeout resets the click counter if taps are too slow.

Logo clickable areas:
- Left 0-22%: tick circle click area (toggles done/deleted view)
- Left 25%-100%: text click area (dev tools triple-tap counter)

### Password Protection

Dev tools access can be optionally protected by password:

**State**:
- `isDevToolsPasswordRequired: boolean` - Toggle for password protection
- `isDevToolsUnlocked: boolean` - Session-only unlock state (not persisted)

**Persistence**:
- `isDevToolsPasswordRequired` persisted to `localStorage` key `'reminderly-dev-tools-password-required'`
- Defaults to `true`

**Behaviour**:
- When password required AND not unlocked: DevToolsOverlay shows password entry screen
- When password required AND unlocked: DevToolsOverlay shows normal content
- When password not required: DevToolsOverlay shows normal content immediately
- Unlock state resets on page refresh (session-only)

Password toggle is configurable via DevTools settings (once unlocked).

## Overlay Behaviour

### Opening and Closing

- Slide-up animation: `initial={{ y: "100%" }}` to `animate={{ y: 0 }}`, 250ms easeInOut
- Uses `getOverlayTopPosition()` for viewport-aware positioning
- Z-index: backdrop z-40, overlay z-50
- Closes via:
  - Backdrop tap (transparent backdrop, `bg-black/0`)
  - Close button (top-right, rotated-plus "x" icon)

## Navigation Structure

Internal page state (`DevToolsPage`) with these pages:

### Home Page

Rendered by `/src/imports/DevTools.tsx`. Shows:

| Row | Label | Navigates to |
|-----|-------|--------------|
| 1 | Automated tests | `'tests'` page |
| 2 | Dummy reminders | `'dummy-reminders'` page |
| 3 | Natural Language Capture | `'nlc'` page |
| 4 | Filters menu | `'filters-menu'` page |
| 5 | Dummy lists | Dummy lists page |

Plus "Clear reminders list" destructive button at bottom (red, 2-step confirmation: "Are you sure?" then "Cleared!").

### Automated Tests Page

Runs the self-check suite (all check files aggregated). Displays:
- Pass/fail count
- Duration
- Individual results (pass/fail with labels)
- Copy-to-clipboard functionality

Check suites included:
- Schedule and reminder logic (`schedule-checks.ts`) - 37 checks
- Persistence and hydration (`reminder-checks.ts`) - 77 checks
- Natural language parsing (`nlc-parser-checks.ts`) - 53 checks
- Natural language interaction (`nlc-interaction-checks.ts`) - 44 checks
- Done, deleted, and completion (`done-deleted-checks.ts`) - 9 checks
- Done, deleted, and completion (`completion-checks.ts`) - 14 checks
- Dev tools and feature flags checks (`dev-tools-checks.ts`) - 46 checks

Total: 280 checks.

See [Self-Check System](../06-quality-and-dev/self-check-system.md) for full details.

### Dummy Reminders Page

Rendered by `/src/imports/DummyReminders.tsx`. Generates test reminders across category buckets. Also contains the "Hide overdue reminders" toggle.

### NLC Page

A/B toggle between click-parsing mode and auto-parsing mode for NLC:
- Click mode: tokens highlight but user must click to apply
- Auto mode: tokens auto-apply after 200ms debounce

See [NLC documentation](../03-natural-language-and-scheduling/nlc.md) for details.

### Filters Menu Page

A/B toggle between standard and grouped filter variants. Changing variant resets `activeFilter` to `"all"`.

See [Filter System](../02-reminder-behaviour/filters-and-sorting.md) for details.

## Dev-Only State

All dev-only state lives in App.tsx:

| State | Type | Default | Persisted | Purpose |
|-------|------|---------|-----------|---------|
| `nlcMode` | `'click' \| 'auto'` | `'auto'` | No | NLC parsing mode |
| `filtersMenuVariant` | `'standard' \| 'grouped'` | `'standard'` | No | Filter menu variant |
| `hideOverdue` | `boolean` | `false` | No | Hides overdue reminders from all views |

### NLC Mode

Controls how NLC tokens are applied in the new reminder overlay:
- `'click'`: tokens highlight but user must click to apply
- `'auto'`: tokens auto-apply after 200ms debounce

### Filters Menu Variant

Switches between standard (4 filter pills) and grouped (3 pills + settings button) layouts. Changing variant resets `activeFilter` to `"all"`.

### Hide Overdue Reminders

When enabled, filters out all overdue reminders from both the active list and done/deleted list at render time:

```typescript
const displayReminders = hideOverdue ? reminders.filter(r => !isOverdue(r, now)) : reminders;
```

Applied before any view-specific filtering.

## Clear Reminders List

Destructive action with 2-step confirmation:
1. First click: "Are you sure?" (red button)
2. Second click: "Cleared!" (executes clear, then resets)

Removes all reminders from localStorage and state.

## File Locations

- DevToolsOverlay: `/src/app/components/DevToolsOverlay.tsx`
- DevTools home: `/src/imports/DevTools.tsx`
- DummyReminders: `/src/imports/DummyReminders.tsx`
- Check system: `/src/app/dev/check-system.ts`
- Check suites: `/src/app/dev/*-checks.ts`
- Dummy generator: `/src/app/utils/dummy-generator.ts`

## Related Documentation

- [Self-Check System](../06-quality-and-dev/self-check-system.md) - Automated test suite
- [Dev Tools](../06-quality-and-dev/dev-tools.md) - Developer tools reference