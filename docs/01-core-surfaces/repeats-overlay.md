# Repeats Overlay

## Overview

The Repeats overlay provides a dedicated interface for configuring repeat rules. It opens as a full-screen overlay when the user enables the Repeats toggle in the new reminder or edit overlay.

## Access

- Click Repeats toggle in NewReminderOverlay (when toggle is off)
- Click Repeats toggle in NewReminderOverlay when already on (to edit existing configuration)
- Opens as separate full-screen overlay over the new reminder overlay

## Overlay Behaviour

### Opening and Closing

- Slide-up animation: `initial={{ y: "100%" }}` to `animate={{ y: 0 }}`, 250ms easeInOut
- Uses `getOverlayTopPosition()` for viewport-aware positioning
- Z-index: backdrop z-40, overlay z-50 (same layer as other overlays)
- Closes via:
  - Backdrop tap (transparent backdrop, `bg-black/0`)
  - Done button (saves configuration, closes overlay)
  - Close button (top-right, rotated-plus "x" icon)

### Structure

```
RepeatsOverlay
  ├── Header ("Repeat" title + close button)
  ├── Frequency selector (6 options)
  ├── Interval input (number field)
  ├── Day selection grid (custom-days only)
  └── Done button
```

## Frequency Selector

6 frequency options rendered as pill buttons:

| Button Label | Value | Interval Default | Day Selection |
|--------------|-------|------------------|---------------|
| Hourly | `hourly` | 1 | Hidden |
| Daily | `daily` | 1 | Hidden |
| Weekly | `weekly` | 1 | Hidden |
| Monthly | `monthly` | 1 | Hidden |
| Yearly | `yearly` | 1 | Hidden |
| Custom days | `custom-days` | 1 | Visible |

### Visual States

- Active: white background, dark blue `#1C2C42` text
- Inactive: translucent background, white text
- Clicking inactive: activates, clicking active: no-op (cannot deselect)

### Default Selection

- First-time open: "Daily" selected by default
- Edit mode: existing frequency selected

## Interval Input

Number input for repeat interval:

- Label: "Every" (prefix)
- Input type: number
- Default value: 1
- Min: 1
- Max: 999 (no enforced max, but practical limit)
- Styling: white background, dark blue text, rounded input field

### Frequency-Specific Labels

- Hourly: "Every X hours"
- Daily: "Every X days"
- Weekly: "Every X weeks"
- Monthly: "Every X months"
- Yearly: "Every X years"
- Custom days: "Every X weeks" (internal frequency is weekly)

Singular/plural forms handled automatically (e.g. "Every 1 day" vs "Every 2 days").

## Day Selection (Custom Days Only)

Grid of day buttons (7 days):

| Button | Value | Full Name |
|--------|-------|-----------|
| M | `mo` | Monday |
| T | `tu` | Tuesday |
| W | `we` | Wednesday |
| T | `th` | Thursday |
| F | `fr` | Friday |
| S | `sa` | Saturday |
| S | `su` | Sunday |

### Visual States

- Selected: blue background `#4784F8`, white text
- Unselected: white background, dark blue text
- Multiple selection allowed
- Toggle behaviour: click to select/deselect

### Visibility

- Only visible when frequency is "Custom days"
- Hidden for all other frequencies

## RepeatConfig Output

When Done clicked, overlay returns RepeatConfig object:

```typescript
type RepeatConfig = {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom-days';
  interval: number;
  selectedDays?: string[]; // only for custom-days
} | null;
```

### Conversion to RepeatRule

App.tsx converts RepeatConfig to RepeatRule before saving:

```typescript
function convertToRepeatRule(config: RepeatConfig): RepeatRule {
  if (config.frequency === 'custom-days') {
    return {
      frequency: 'weekly',
      interval: config.interval,
      byDay: config.selectedDays as Array<'mo'|'tu'|'we'|'th'|'fr'|'sa'|'su'>,
    };
  }
  return {
    frequency: config.frequency,
    interval: config.interval,
    byDay: null,
  };
}
```

Custom-days frequency becomes `weekly` with `byDay` array. Other frequencies have `byDay: null`.

## Save Behaviour

Clicking Done:
1. Validates configuration (interval >= 1, custom-days has at least one day selected)
2. Returns RepeatConfig to parent via `onRepeatConfigChange` callback
3. Closes overlay
4. Parent enables Repeats toggle
5. Parent displays repeat label below toggle

## Cancel Behaviour

- Backdrop tap or close button
- No configuration change
- If toggle was off before open, toggle remains off
- If toggle was on before open, previous configuration retained

## Edit Mode

When opening with existing repeat configuration:
- Frequency selector: existing frequency selected
- Interval input: existing interval value
- Day selection: existing days selected (if custom-days)

## Validation

### Interval

- Must be >= 1
- If empty or invalid, defaults to 1
- Cannot save with interval < 1

### Day Selection (Custom Days)

- Must have at least one day selected
- If no days selected, Done button disabled or shows validation message
- Validation enforced before save

## Responsive Behaviour

- Uses `getOverlayTopPosition()` for viewport-aware positioning
- Content max-width: 768px, centered
- Padding: 26px top, 20px horizontal
- Day grid wraps on narrow viewports
- See [Content Overlay Responsive](../05-design-and-layout/content-overlay-responsive.md) for full pattern

## File Location

`/src/app/components/RepeatsOverlay.tsx`

## Dependencies

- RepeatConfig type: `/src/app/reminder-utils.ts`
- RepeatRule type: `/src/app/types/reminder.ts`
- Conversion logic: inline in App.tsx

## Related Documentation

- [Repeats](../03-natural-language-and-scheduling/repeats.md) - Repeat auto-rescheduling behaviour
- [Natural Language Capture](../03-natural-language-and-scheduling/nlc.md) - NLC repeat token parsing
