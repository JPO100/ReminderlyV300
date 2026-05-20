# Settings Overlay

## Overview

The Settings overlay provides user-facing settings. It is accessible only from the active list view when the grouped filters variant is active, via the settings button (LaterBtn component) positioned to the right of the filter buttons.

This feature is not manually verified.

---

## 1. Access

- The settings button appears only when `filtersMenuVariant === 'grouped'`.
- Clicking the settings button sets `isSettingsOpen` to true.
- The overlay is not accessible from standard filters mode or the done/deleted view.

---

## 2. Overlay Behaviour

### Opening and closing

- Opens with the standard slide-up animation (same as all overlays: `y: "100%"` to `y: 0`, 250ms easeInOut).
- Uses the shared `getOverlayTopPosition()` function for viewport-aware positioning.
- Closes via:
  - Backdrop tap (transparent backdrop, `bg-black/0`).
  - Close button ("x" icon: rotated-plus SVG, same as DevTools overlay close button, positioned top-right of the header).
- Z-index: backdrop at z-40, overlay at z-50.

### Structure

```
SettingsOverlay
  Header ("Settings" title + close button)
  Settings items list
    Show date and time subtitles row
```

The overlay follows the canonical full-width-with-constrained-content pattern: outer container `size-full items-center`, inner wrapper `max-w-[768px]`, padding `px-[20px]`.

---

## 3. Show Date and Time Subtitles

### State

```typescript
const [showDateAndTimeSubtitles, setShowDateAndTimeSubtitles] = useState<boolean>(() => {
  // localStorage persisted, default true
});
```

- Persisted to `localStorage` under key `reminderly.showDateAndTimeSubtitles`.
- Default value: `true`.

### Derived value

The actual subtitle visibility is gated on the grouped filters variant:

```typescript
const showSubtitles = !(filtersMenuVariant === 'grouped' && !showDateAndTimeSubtitles);
```

This means subtitles are always shown in standard filters mode, regardless of the toggle state.

### Auto-reset

When leaving grouped filters mode with subtitles off, the toggle auto-resets to true:

```typescript
useEffect(() => {
  if (filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles) {
    setShowDateAndTimeSubtitles(true);
  }
}, [filtersMenuVariant, showDateAndTimeSubtitles]);
```

### Effect on reminder rows

When `showSubtitles` is false:

- The subtitle line (date, time, repeat label) is hidden in both active and done/deleted list rows.
- The text column div gets `minHeight: '38px'` to maintain consistent row spacing.
- Row alignment changes from `items-start` to `items-center` (applies to the outer row div, inner flex row, and content gap div).
- The circle checkbox's `marginTop: '3px'` is removed (only applied when subtitles are shown).

When `showSubtitles` is true (default):

- Both lines are visible: title (17px) and subtitle (13.5px) with 4px gap.
- Circle checkbox has `marginTop: '3px'` for alignment with the top line.

### Subtitle content

The subtitle line displays (in priority order):

1. Repeat label (if `repeatRule` exists and `formatRepeatLabel` returns a value).
2. Formatted date and time (if scheduled with date).
3. "No date / time set" (fallback).

---

## 4. Setting Row Visual States

The setting row has two visual states based on the toggle:

### ON state (showDateAndTimeSubtitles = true)

| Element | Colour |
|---------|--------|
| Icon (SVG) | `#214677` |
| Title text | `#214677` |
| Subtitle text | `#BABABA` |
| Toggle track | `#4784F8` |
| Toggle thumb | White, positioned right (cx=41) |

### OFF state (showDateAndTimeSubtitles = false)

| Element | Colour |
|---------|--------|
| Icon (SVG) | `#D9D9D9` |
| Title text | `#D9D9D9` |
| Subtitle text | `#D9D9D9` |
| Toggle track | `#D9D9D9` |
| Toggle thumb | White, positioned left (cx=15) |

---

## 5. Files Involved

| File | Role |
|------|------|
| `/src/app/App.tsx` | Owns `showDateAndTimeSubtitles` state, localStorage persistence, auto-reset effect, derived `showSubtitles`, conditional rendering in both list views |
| `/src/app/components/SettingsOverlay.tsx` | Settings overlay UI, setting row with toggle, visual states |
| `/src/app/reminder-utils.ts` | `FiltersMenuVariant` type definition |
