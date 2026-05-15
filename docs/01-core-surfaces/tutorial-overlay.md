# Tutorial Overlay

## Overview

The tutorial overlay is a bottom-sheet onboarding surface wrapped by `App.tsx` and rendered by `TutorialOverlay.tsx`. The overlay hosts `TutorialOnboardingContent`, which manages the page flow.

The active reminders tutorial render path is:

`App.tsx` -> `TutorialOverlay.tsx` -> `TutorialOnboardingContent.tsx` -> `TutorialPhoneShell.tsx` -> `TutorialPhoneHeader.tsx` -> `TutorialMainTabBar.tsx` -> `TutorialReminderFilters.tsx` -> page body

Reminder tutorial pages are content-only. They provide tutorial copy, page body content, and page-specific animation/state where needed. They no longer render full phone UI shells, headers, tabs, or filter rows.

## Signed-off Reminder Pages 0-4

Reminder tutorial pages 0-4 are locked and signed off.

- Page 0 builds the shared reminder mini-list and cycles with the page 0 row fade-in reset.
- Page 1 cycles filter states and uses a 2000ms recycle pause.
- Page 2 throbs the 3-dot menu target, opens the scaled reminder info overlay, then restarts after the 2000ms post-sequence pause.
- Page 3 completes every non-`sometime` tutorial reminder and resets with the same fade-in approach as page 0.
- Page 4 starts with only `Organise family photo`, throbs the Reminderly logo tick, switches to `Done reminders`, shows the page 3 completed reminders only, pauses for 2000ms before later throbs, then returns to the main mini-list and repeats. The initial visible logo tick throb occurs after the shared 400ms animation delay.

Page 4 Done reminders state also swaps the filter row to scaled `Done`, `Deleted`, and `Clear all` controls, changes the logo tick to white fill with Reminderly blue tick, and hides row 3-dot menu buttons in the Done mini-list.

## Optional Reminder Page 5

Reminder page 5 is controlled by the Dev Tools `Settings menu` feature flag.

- If `settingsMenuEnabled` is false, page 4 is the final reminders tutorial page.
- If `settingsMenuEnabled` is true, page 5 appears after page 4 and becomes the final reminders tutorial page.
- Page 5 title is `Re-run this tutorial`.
- Page 5 subtitle is `You can re-run this tutorial from` / `the settings menu`.
- Page 5 only shows the populated reminder mini-list in the shared tutorial phone.
- Page 5 has no animations, transitions, highlight circles, overlays, timing sequences, or automatic state changes.

## Lists Tutorial

When the tutorial opens with `activeMainTab === 'lists'`, the lists variant is shown instead of the reminders variant. The lists tutorial has 8 pages (indexed `0-7`). Pages 0-4 have full interactive content; pages 5-7 are placeholder stubs.

Lists tutorial pages are rendered by the `ListsTutorialPlaceholderPage` component inside `TutorialOnboardingContent.tsx`. See [Onboarding and Tutorial](../04-settings-onboarding-and-premium/onboarding-and-tutorial.md) for full page descriptions.

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
- Lists tutorial: 8 pages, indexed `0` through `7` (pages 5-7 are placeholder stubs)

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
- the final page is determined by the active variant: reminders page count depends on `settingsMenuEnabled`; lists tutorial always has 8 pages

The overlay does not persist a completion state of its own.

## State

- current page is held inside `TutorialOnboardingContent`
- `TutorialOverlay` receives the current `filtersMenuVariant` and `variant` (`'reminders'` or `'lists'`)
- `App.tsx` tracks `tutorialVariant` and `tutorialVariantsShownThisSessionRef`
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
