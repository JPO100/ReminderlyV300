# Onboarding and Tutorial

## Overview

The tutorial system provides the reminders and lists onboarding flows. It is accessible from the Settings overlay when the tutorial feature flag is enabled.

The active reminders tutorial render path is:

`App.tsx` -> `TutorialOverlay.tsx` -> `TutorialOnboardingContent.tsx` -> `TutorialPhoneShell.tsx` -> `TutorialPhoneHeader.tsx` -> `TutorialMainTabBar.tsx` -> `TutorialReminderFilters.tsx` -> page body

Reminder tutorial pages are content-only. Shared components own the phone shell, header, tabs, and filters. No page renders a full phone UI layout.

## Tutorial Pages

The reminders tutorial has 5 base pages (indexed `0-4`). When the Dev Tools `Settings menu` feature flag is on, optional page 6 is included after page 5 and becomes the final reminders tutorial page.

1. **OnboardingPage1Content** (page 1) - "A tour of reminders" — reminder list build sequence showing grouped/coloured reminders
2. **OnboardingPage2Content** (page 2) - "Filter your reminders" — filter cycle with reminder list filtering demo
3. **OnboardingPage3Content** (page 3) - "Manage your reminders" — 3-dot menu attention throb circle + reminder info overlay demo
4. **OnboardingPage4Content** (page 4) - "Mark items as done" — done sequence animation completing reminders
5. **OnboardingPage5Content** (page 5) - "See what you’ve done" — Reminderly logo tick throb showing the Done reminders mini-list
6. **OnboardingPage6Content** (optional page 6) - "Re-run this tutorial" — static populated reminder mini-list; shown only when `settingsMenuEnabled` is true

The lists tutorial retains its 7-page placeholder flow. `OnboardingPage7Content`, `OnboardingPage8Content`, and `OnboardingPage9Content` exist in source but are not part of the active reminders tutorial flow.

### Signed-off reminder tutorial pages 1-5

Pages 1-5 are locked and signed off.

- Page 1 shows the shared reminder mini-list build sequence. It cycles with the existing row fade-in behaviour and waits 2000ms before restarting.
- Page 2 cycles the reminder filters and waits 2000ms before returning to the start of the filter loop.
- Page 3 shows the 3-dot menu attention throb, opens the scaled reminder info overlay, waits 2000ms after the full sequence, then restarts.
- Page 4 marks every non-`sometime` tutorial reminder as done, excludes `Organise family photo` from the completed set, and waits 2000ms before restarting. Its reset uses the same fade-in approach as page 1.
- Page 5 starts on the default mini-list filtered to `Organise family photo`, then uses the Reminderly logo tick throb to reveal the Done reminders list. The first visible logo tick throb starts after the shared 400ms animation delay; later state-to-state throbs wait 2000ms before starting. The Done reminders list contains only the reminders completed by page 4: `Put the bins out`, `Submit expenses`, `Pay credit card`, `Call the dentist`, and `Pick up milk`.

### Page 3 attention circle behaviour

OnboardingPage3Content displays a blue attention circle over the "Pick up milk" reminder's 3-dot menu button. The circle runs the shared 3-throb opacity keyframe sequence with `duration: 2.3`, `delay: 0.4`, `times: [0, 0.109, 0.217, 0.391, 0.5, 0.609, 0.783, 0.891, 1]`, and `ease: "easeInOut"`. After the final throb fades out, the scaled reminder info overlay opens. The overlay title, due line, and button formatting mirrors the main app's `ReminderInfoOverlay` proportions at the tutorial overlay scale.

### Page 5 Done reminders behaviour

OnboardingPage5Content demonstrates the Done reminders view as a continuation of the page 4 done sequence.

- Default state: the active mini-list shows only `Organise family photo`.
- Initial main-list phase: the first Reminderly logo tick throb starts immediately from page load and becomes visible after the shared 400ms animation delay.
- Done state: the tab label changes to `Done reminders`, the logo tick changes to white fill with Reminderly blue tick, and the filter row changes to scaled `Done`, `Deleted`, and `Clear all` pills.
- Done mini-list: only page 4 completed reminders appear. The `sometime` reminder remains excluded, and row 3-dot menu buttons are hidden in this Done mini-list.
- Later phases: after the initial throb, each main-list or Done-list state pauses for 2000ms before the logo tick throb repeats and the view changes state.
- The Done / Deleted pills mirror the main app Done / Deleted controls scaled to the tutorial mini size: 28px pill height, 9.751px text, 11.144px side padding, and 66px `Clear all` width.

### Optional page 6 behaviour

OnboardingPage6Content is included only when the Dev Tools `Settings menu` feature flag is on.

- When `settingsMenuEnabled` is false, page 5 is the final reminders tutorial page.
- When `settingsMenuEnabled` is true, page 6 appears after page 5 and becomes the final reminders tutorial page.
- Page 6 copy is `Re-run this tutorial` with subtitle `You can re-run this tutorial from` / `the settings menu`.
- Page 6 has no animation, transition, highlight circle, overlay, timing sequence, or automatic state change.
- Page 6 shows the populated reminder mini-list inside the shared tutorial phone.

## Navigation

- **Page indicators**: Dynamic dot count based on the active flow, horizontally centred for the visible number of dots
- **Back button**: Navigate to previous page (hidden on page 0)
- **Next button**: Navigate to next page, or `Okay, got it` on the final visible reminders tutorial page
- **Restart button**: Reset to page 0 (visible on the final visible reminders tutorial page)

## Access

Via "Reminderly tutorial" row in Settings overlay, when `isOnboardingTutorialEnabled === true`.

## Feature Flag

```typescript
isOnboardingTutorialEnabled: boolean // in App.tsx
```

When false, TutorialOverlay returns null.

### Additional Tutorial Feature Flags

**Show Tutorial on First Launch**
- State: `showTutorialOnFirstLaunch: boolean`
- Persisted to: `localStorage` key `'reminderly-ff-tutorial-first-launch'`
- Default: `true`
- Controls whether tutorial automatically opens on first app launch

**Show Tutorial on Every Start**
- State: `showTutorialOnEveryStart: boolean`
- Persisted to: `localStorage` key `'reminderly-ff-tutorial-every-start'`
- Default: `false`
- Dev-only toggle: when enabled, tutorial opens on every app start

Both flags are controlled via DevTools and interact with the main `isOnboardingTutorialEnabled` flag.

## Shared Ownership

- `TutorialOnboardingContent.tsx` owns page selection, shared shell usage, and page-specific shell/header/filter configuration
- `TutorialPhoneShell.tsx` owns phone sizing, frame padding, shell colour, and bezel colour
- `TutorialPhoneHeader.tsx` owns shared header layout and the page 8 shared header variant
- `TutorialMainTabBar.tsx` owns shared tabs
- `TutorialReminderFilters.tsx` owns shared filter rendering, including page 8 done/deleted state handling
- `TutorialStaticReminderList.tsx` owns the default reminders tutorial mini-list data and rendering

## Default reminders tutorial mini-list

The shared default reminders tutorial mini-list lives in `TutorialStaticReminderList.tsx`.

Default items and groups:

1. Today: `Pick up milk`
2. Today: `Call the dentist`
3. This week: `Pay credit card`
4. Later: `Submit expenses`
5. Later: `Put the bins out`
6. Sometime: `Organise family photo`

Default formatting rules:

- Every non-`sometime` reminder has both a date and a time.
- Reminder subtitles are derived from the same formatting path used by the live app list.
- `Pay credit card` is the default monthly repeating reminder example.
- `Put the bins out` is the default weekly repeating reminder example.

## Responsive Behaviour

### Container
- Default height: 808px
- Below 570px: auto height

### Navigation
- Page dots hidden below 570px
- Special padding adjustments below 570px

## File Locations

- TutorialOverlay: `/src/app/components/TutorialOverlay.tsx`
- TutorialOnboardingContent: `/src/app/components/TutorialOnboardingContent.tsx`
- TutorialPhoneShell: `/src/app/components/TutorialPhoneShell.tsx`
- TutorialPhoneHeader: `/src/app/components/TutorialPhoneHeader.tsx`
- TutorialMainTabBar: `/src/app/components/TutorialMainTabBar.tsx`
- TutorialReminderFilters: `/src/app/components/TutorialReminderFilters.tsx`
- OnboardingPage[1-9]Content: `/src/app/components/OnboardingPage[1-9]Content.tsx`

## Related Documentation

- [Tutorial Overlay](../01-core-surfaces/tutorial-overlay.md) - Complete tutorial overlay documentation
- [Settings Overlay](../01-core-surfaces/settings-overlay.md) - Access point
