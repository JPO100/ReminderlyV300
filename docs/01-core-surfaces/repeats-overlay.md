# Repeats Overlay

## Overview

The repeats overlay configures reminder repeat rules for the reminder editor flow. The current component is a full-height overlay panel with expandable sections for each supported repeat mode.

## Access

- opened from the reminder editor when repeat configuration is being changed
- receives `initialConfig`
- returns the resolved repeat config through `onClose(config?)`

## Current Structure

The overlay currently contains:

- back button
- `Reminder repeats` title
- expandable repeat sections

There is no separate `Done` button in the current implementation. The back button is the save/close action.

## Supported Repeat Modes

Current repeat options:

- `Custom days`
- `Hourly`
- `Daily`
- `Weekly`
- `Monthly`

`Yearly` is not present in the current component.

## Interaction Model

### Frequency Selection

- tapping an inactive frequency activates it
- tapping the active frequency clears it and leaves the overlay with no selected repeat mode
- each frequency expands its own configuration area
- expanding a frequency resets its interval state to `1`

### Back Button

The back button closes the overlay and returns `getCurrentConfig()`.

That means:

- if no frequency is active, the overlay returns `null`
- if `Custom days` is active with no selected days, the overlay returns `null`
- otherwise it returns the resolved repeat config

## Mode-Specific Behaviour

### Custom Days

- renders a list of Monday through Sunday rows
- each row toggles independently
- label format: `Every Monday`, `Every Tuesday`, etc.
- stores selected days in a `Set`
- returned config:
  - `frequency: 'custom-days'`
  - `selectedDays: [...]`
  - `interval: selectedDays.length`

### Hourly

- interval starts at `1`
- minus button cannot go below `1`
- summary text:
  - `Repeats every hour`
  - `Repeats every <n> hours`

### Daily

- interval starts at `1`
- minus button cannot go below `1`
- summary text:
  - `Repeats every day`
  - `Repeats every <n> days`

### Weekly

- interval starts at `1`
- minus button cannot go below `1`
- summary text:
  - `Repeats every week`
  - `Repeats every <n> weeks`

### Monthly

- interval starts at `1`
- minus button cannot go below `1`
- summary text:
  - `Repeats every month`
  - `Repeats every <n> months`

## Returned Config Shape

The current overlay returns:

```ts
type RepeatConfig =
  | null
  | {
      frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
      interval: number;
    }
  | {
      frequency: 'custom-days';
      interval: number;
      selectedDays: string[];
    };
```

## Responsive / Visual Notes

- each mode is a rounded pill-style header row
- active mode switches from light grey text-on-grey styling to dark-blue text on a darker grey fill
- expanded sections animate through `max-height`
- each configured section uses inline plus/minus controls and separator rules

## File Location

- `src/app/components/RepeatsOverlay.tsx`

## Related Documentation

- [New Reminder Overlay](./new-reminder-overlay.md)
- [Repeats](../03-natural-language-and-scheduling/repeats.md)
