# Tutorial Overlay

## Overview

The tutorial overlay is a bottom-sheet onboarding surface wrapped by `App.tsx` and rendered by `TutorialOverlay.tsx`. The overlay hosts `TutorialOnboardingContent`, which manages the page flow.

The active reminders tutorial render path is:

`App.tsx` -> `TutorialOverlay.tsx` -> `TutorialOnboardingContent.tsx` -> `TutorialPhoneShell.tsx` -> `TutorialPhoneHeader.tsx` -> `TutorialMainTabBar.tsx` -> `TutorialReminderFilters.tsx` -> page body

Pages `1` through `8` are content-only. They provide tutorial copy, page body content, and page-specific animation/state where needed. They no longer render full phone UI shells, headers, tabs, or filter rows.

## Access

- opened from the settings overlay through the `Reminderly tutorial` row
- only rendered when the onboarding tutorial feature is enabled

## Wrapper Behaviour

`App.tsx` currently provides:

- transparent backdrop
- slide-up motion from the bottom
- viewport-aware top positioning
- drag-to-close support
- close on backdrop tap

`TutorialOverlay.tsx` itself renders the white content container only.

## Current Page Count

The current tutorial flow contains 8 pages.

- `TOTAL_PAGES = 8`
- pages are indexed `0` through `7`

`OnboardingPage9Content.tsx` exists in the codebase but is not part of the active flow.

## Navigation

`TutorialOnboardingContent` currently provides:

- page indicator dots
- `Back`
- `Next`
- final-page completion button
- `Restart`

Current behaviour:

- `Back` is hidden on the first page
- `Restart` is hidden on the first page
- `Next` advances until the final page
- the final page calls `onComplete()`, which closes the overlay

The overlay does not persist a completion state of its own.

## State

- current page is held inside `TutorialOnboardingContent`
- `TutorialOverlay` receives the current `filtersMenuVariant`
- the overlay is closed externally through `onClose`

## File Locations

- `src/app/components/TutorialOverlay.tsx`
- `src/app/components/TutorialOnboardingContent.tsx`
- `src/app/components/TutorialPhoneShell.tsx`
- `src/app/components/TutorialPhoneHeader.tsx`
- `src/app/components/TutorialMainTabBar.tsx`
- `src/app/components/TutorialReminderFilters.tsx`
- `src/app/components/OnboardingPage1Content.tsx` through `OnboardingPage8Content.tsx`

## Related Documentation

- [Settings Overlay](./settings-overlay.md)
- [Onboarding and Tutorial](../04-settings-onboarding-and-premium/onboarding-and-tutorial.md)
