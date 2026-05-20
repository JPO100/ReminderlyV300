# Settings Overlay

## Overview

The settings overlay is a bottom-sheet surface wrapped by `App.tsx` and rendered by `SettingsOverlay.tsx`. It contains one live user setting, optional tutorial access, and a premium marketing section that only appears while lists are enabled.

## Access

The settings sheet is opened from the settings button in the reminder surface. In the current app shell:

- the bottom-sheet animation and backdrop are handled in `App.tsx`
- `SettingsOverlay.tsx` renders only the sheet content

## Wrapper Behaviour

`App.tsx` currently provides:

- transparent backdrop
- slide-up motion from the bottom
- viewport-aware top positioning
- drag-to-close support
- close on backdrop tap

## Content

### Show Date and Time Subtitles

This is the only live toggle in the current settings content.

- localStorage key: `reminderly.showDateAndTimeSubtitles`
- default: `true`

It controls the grouped-filter subtitle visibility experiment:

- if grouped filters are active and the toggle is off, reminder subtitles are hidden
- when filters are not grouped, the app forces subtitles back on

Current row copy:

- title: `Show date and time subtitles`
- subtitle: `Displays additional reminder information`

### Reminderly Tutorial

This row only appears when the onboarding tutorial feature is enabled.

- title: `Reminderly tutorial`
- subtitle: `Take a refresh of the onboarding tutorial`
- action: opens the tutorial overlay

## Premium Section

The premium marketing section is shown only when `isListsEnabled` is true.

Current section title:

- `Unlock premium features!`

Current feature rows:

- `Unlimited reminders`
- `Natural Language Capture`
- `Repeat reminders`

These rows are presentation only in the current implementation:

- toggles are rendered visually
- they do not change app state

The current CTA button copy is:

- `Get premium features for £9 a year!`
- compact small-height variant: `Get premium for £9 a year!`

## Responsive Notes

At shorter viewport heights:

- some icons are hidden
- tutorial and setting rows tighten vertically
- premium body copy shortens
- premium bullet lists are hidden

## File Locations

- `src/app/components/SettingsOverlay.tsx`
- bottom-sheet wrapper in `src/app/App.tsx`

## Related Documentation

- [Tutorial Overlay](./tutorial-overlay.md)
- [Premium UI](../04-settings-onboarding-and-premium/premium-ui.md)
