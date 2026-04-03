# New Reminder Overlay

Content consolidated from `/docs/new-reminder-overlay.md`.

## Overview

The new reminder overlay provides the creation interface for reminders. It includes free-text input with NLC token highlighting, date/time toggles with pickers, and repeat configuration.

## Access

- Click "Create a new reminder" button at bottom of active list
- Sets `isNewReminderOpen` to true
- Overlay slides up from bottom

## Overlay Behaviour

### Opening and Closing

- Slide-up animation: `initial={{ y: "100%" }}` to `animate={{ y: 0 }}`, 250ms easeInOut
- Uses `getOverlayTopPosition()` for viewport-aware positioning
- Z-index: backdrop z-40, overlay z-50
- Closes via:
  - Backdrop tap (transparent backdrop, `bg-black/0`)
  - Cancel button (bottom-left)
  - Save button (completes creation, closes overlay)

### Structure

```
NewReminderOverlay
  ├── Header ("Create a new reminder" title + close button)
  ├── Text input area (with 3-layer NLC architecture)
  ├── Date toggle + inline calendar drawer
  ├── Time toggle + inline time picker drawer
  ├── Repeats toggle
  └── Footer (Cancel + Save buttons)
```

## Text Input with NLC

### 3-Layer Architecture

**Layer 1: Textarea**
- Real input element
- Text transparent (so mirror shows through)
- `whiteSpace: pre-wrap` to match mirror
- Full interaction (typing, cursor, selection)

**Layer 2: Mirror (behind textarea)**
- `div` with identical layout (same font, padding, width, line-height)
- Token spans render in Reminderly blue `#4784F8`
- Non-token text styled identically to textarea
- `pointer-events: none`
- Scroll synchronized via `onScroll`

**Layer 3: Hit (over textarea)**
- `div` overlaying textarea with identical layout
- Token spans: `pointer-events: auto`, `cursor: pointer`
- All other content: invisible, non-interactive
- Click on token triggers `applyToken()`

### Scroll Synchronization

```typescript
const handleTextareaScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
  const scrollTop = e.currentTarget.scrollTop;
  if (mirrorRef.current) mirrorRef.current.scrollTop = scrollTop;
  if (hitLayerRef.current) hitLayerRef.current.scrollTop = scrollTop;
};
```

### Token Rendering

Both mirror and hit layers rendered by single function:

```typescript
function renderLayerContent(mode: 'mirror' | 'hit'): React.ReactNode
```

This prevents text segmentation drift between layers.

### NLC Integration

See [Natural Language Capture](../03-natural-language-and-scheduling/nlc.md) for full NLC behaviour. Key points:

- Tokens highlight as user types
- Click mode (default): click token to apply
- Auto mode (dev toggle): auto-apply after 200ms debounce
- Tokens invalidate if text changes
- Repeat tokens suppress date tokens
- Time-of-day tokens suppressed when explicit clock time exists

## Date Toggle and Picker

### Toggle

- Label: "Set date"
- Position: Above calendar drawer
- State: off by default, blue when on
- Click: toggles date on/off, opens/closes calendar drawer
- NLC can silently enable via `applyToggleStateSilently()`

### Calendar Drawer

- Opens inline below toggle when date is on
- Closes when date toggle turned off
- Month navigation: left/right arrows
- Day selection: click day cell
- Highlights selected date in blue
- Highlights today with blue outline
- See [Calendar and Time Picker](../03-natural-language-and-scheduling/calendar-and-time-picker.md) for full details

### Date/Time Invariant

Time requires date. Turning date off cascades time off. Turning time on auto-enables date (defaults to today if no date selected).

## Time Toggle and Picker

### Toggle

- Label: "Set time"
- Position: Above time picker drawer
- State: off by default, blue when on
- Click: toggles time on/off, opens/closes time picker drawer
- Auto-enables date if date is off (sets date to today)
- NLC can silently enable via `applyToggleStateSilently()`

### Time Picker

- Opens inline below toggle when time is on
- Closes when time toggle turned off
- Two-column layout: hours (1-12) | minutes (00, 15, 30, 45) + AM/PM
- Scrollable columns
- Selected values highlighted in blue
- See [Calendar and Time Picker](../03-natural-language-and-scheduling/calendar-and-time-picker.md) for full details

## Repeats Toggle

### Toggle

- Label: "Repeat"
- Position: Below time picker
- State: off by default, blue when on
- Click: toggles repeats on, opens RepeatsOverlay (separate full-screen overlay)
- Clicking when on: opens RepeatsOverlay to edit configuration
- NLC can silently enable and set configuration via `applyToggleStateSilently()`

### Repeat Configuration

When repeats toggle is on, displays repeat label below toggle (e.g. "Every week", "Every 2 days", "Mon, Wed, Fri").

Configuration happens in RepeatsOverlay. See [Repeats Overlay](./repeats-overlay.md).

## Save Behaviour

### Validation

- Text must be non-empty (after trim)
- If text is empty, save button disabled or no-op

### Schedule Kind Computation

```typescript
const scheduleKind = dateOn && selectedDate ? 'scheduled' : 'sometime';
```

- If date toggle on and date selected: "scheduled"
- Otherwise: "sometime"

### Text Normalization

Before save, `normaliseReminderText()` is called:
- Replaces "today" with absolute date (e.g. "Monday 3 March")
- Replaces "tomorrow" with absolute date
- Preserves other text unchanged
- Stores result in `displayText` field
- Stores original in `originalText` field

### Reminder Creation

```typescript
const newReminder: Reminder = {
  id: crypto.randomUUID(),
  originalText: text,
  displayText: normalisedText,
  createdAt: Date.now(),
  schedule: { kind, date, time },
  repeatRule: repeatConfig ? convertToRepeatRule(repeatConfig) : null,
};
```

### Post-Save

1. Reminder added to `reminders` array
2. Overlay closes
3. After `NEW_REMINDER_INSERT_DELAY` (500ms): reminder inserted into list with fade-in
4. Temporary highlight applied for `INSERT_HIGHLIGHT_MS` (1000ms)
5. Persisted to localStorage

## Cancel Behaviour

- Click Cancel button
- Overlay closes
- All draft state discarded (text, toggles, selected values)
- No persistence

## Responsive Behaviour

- Uses `getOverlayTopPosition()` for viewport-aware top position
- Content max-width: 768px, centered
- Padding: 26px top, 20px horizontal
- At small viewports, calendar and time picker compress vertically
- See [Content Overlay Responsive](../05-design-and-layout/content-overlay-responsive.md) for full pattern

## Edit Mode

When opened with `editReminder` prop, overlay enters edit mode:

- Title: "Edit reminder"
- Text prepopulated with `editReminder.originalText`
- Toggles and values prepopulated from saved reminder
- Auto-apply suppressed on first cycle (prevents overwriting prepopulated state)
- Token baseline captured: only new tokens (not in baseline) can auto-apply
- Save updates existing reminder in place (id unchanged)
- Cancel discards all changes, no persistence

See [NLC documentation](../03-natural-language-and-scheduling/nlc.md) for full edit-mode auto-apply logic.

## Keyboard Behaviour

- Textarea autofocus on mount
- Enter key: no special behaviour (allows multi-line)
- Esc key: not bound (no close-on-esc)

## File Location

`/src/imports/NewReminderOverlay.tsx`

## Dependencies

- NLC parser: `/src/app/utils/nlc-parser.ts`
- NLC interaction: `/src/app/utils/nlc-interaction.ts`
- Text normalisation: `/src/app/utils/normalise-text.ts`
- TimePicker: `/src/imports/TimePicker.tsx`
- Schedule utilities: `/src/app/utils/schedule.ts`
