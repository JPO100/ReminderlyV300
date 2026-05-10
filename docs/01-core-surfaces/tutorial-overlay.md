# Tutorial Overlay

## Overview

The tutorial overlay is a bottom-sheet onboarding surface wrapped by `App.tsx` and rendered by `TutorialOverlay.tsx`. The overlay hosts `TutorialOnboardingContent`, which manages the page flow.

The active reminders tutorial render path is:

`App.tsx` -> `TutorialOverlay.tsx` -> `TutorialOnboardingContent.tsx` -> `TutorialPhoneShell.tsx` -> `TutorialPhoneHeader.tsx` -> `TutorialMainTabBar.tsx` -> `TutorialReminderFilters.tsx` -> page body

Reminder tutorial pages are content-only. They provide tutorial copy, page body content, and page-specific animation/state where needed. They no longer render full phone UI shells, headers, tabs, or filter rows.

## Signed-off Reminder Pages 1-5

Reminder tutorial pages 1-5 are locked and signed off.

- Page 1 builds the shared reminder mini-list and cycles with the page 1 row fade-in reset.
- Page 2 cycles filter states and uses a 2000ms recycle pause.
- Page 3 throbs the 3-dot menu target, opens the scaled reminder info overlay, then restarts after the 2000ms post-sequence pause.
- Page 4 completes every non-`sometime` tutorial reminder and resets with the same fade-in approach as page 1.
- Page 5 starts with only `Organise family photo`, throbs the Reminderly logo tick, switches to `Done reminders`, shows the page 4 completed reminders only, pauses for 2000ms before later throbs, then returns to the main mini-list and repeats. The initial visible logo tick throb occurs after the shared 400ms animation delay.

Page 5 Done reminders state also swaps the filter row to scaled `Done`, `Deleted`, and `Clear all` controls, changes the logo tick to white fill with Reminderly blue tick, and hides row 3-dot menu buttons in the Done mini-list.

## Optional Reminder Page 6

Reminder page 6 is controlled by the Dev Tools `Settings menu` feature flag.

- If `settingsMenuEnabled` is false, page 5 is the final reminders tutorial page.
- If `settingsMenuEnabled` is true, page 6 appears after page 5 and becomes the final reminders tutorial page.
- Page 6 title is `Re-run this tutorial`.
- Page 6 subtitle is `You can re-run this tutorial from` / `the settings menu`.
- Page 6 only shows the populated reminder mini-list in the shared tutorial phone.
- Page 6 has no animations, transitions, highlight circles, overlays, timing sequences, or automatic state changes.

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

The reminders tutorial page count is dynamic.

- Base reminders tutorial: 5 pages, indexed `0` through `4`
- Reminders tutorial with `settingsMenuEnabled`: 6 pages, indexed `0` through `5`
- Lists tutorial: 7 pages, indexed `0` through `6`

`OnboardingPage7Content.tsx`, `OnboardingPage8Content.tsx`, and `OnboardingPage9Content.tsx` exist in the codebase but are not part of the active reminders tutorial flow.

## Navigation

`TutorialOnboardingContent` currently provides:

- page indicator dots centred for the visible page count
- `Back`
- `Next`
- final-page completion button
- `Restart`

Current behaviour:

- `Back` is hidden on the first page
- `Restart` is hidden on the first page
- `Next` advances until the final page
- the final page calls `onComplete()`, which closes the overlay
- the final reminders page is based on the visible reminders page count after the `settingsMenuEnabled` page 6 rule is applied

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
- `src/app/components/OnboardingPage1Content.tsx` through `OnboardingPage9Content.tsx` (pages 8 and 9 are inactive)

## Related Documentation

- [Settings Overlay](./settings-overlay.md)
- [Onboarding and Tutorial](../04-settings-onboarding-and-premium/onboarding-and-tutorial.md)
