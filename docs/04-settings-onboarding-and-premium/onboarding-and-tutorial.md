# Onboarding and Tutorial

## Overview

The tutorial system provides a 7-page onboarding flow explaining Reminderly's features. Accessible from the Settings overlay when the tutorial feature flag is enabled.

The active reminders tutorial render path is:

`App.tsx` -> `TutorialOverlay.tsx` -> `TutorialOnboardingContent.tsx` -> `TutorialPhoneShell.tsx` -> `TutorialPhoneHeader.tsx` -> `TutorialMainTabBar.tsx` -> `TutorialReminderFilters.tsx` -> page body

Pages `1` through `8` are content-only. Shared components own the phone shell, header, tabs, and filters. No page renders a full phone UI layout.

## Tutorial Pages

7 pages (indexed `0-6`) implemented as separate content-only components:

1. **OnboardingPage1Content** - copy export plus welcome/reminder-list body
2. **OnboardingPage2Content** - copy export plus done-animation body
3. **OnboardingPage3Content** - copy export plus imported new-reminder body
4. **OnboardingPage4Content** - copy export plus scheduling body
5. **OnboardingPage5Content** - copy export plus reminder-list body
6. **OnboardingPage6Content** - copy export plus reminder-list body and reminder-info overlay mock
7. **OnboardingPage7Content** - copy export plus filter-cycle body animation and reminder-list swapping

Note: `OnboardingPage8Content` and `OnboardingPage9Content` exist in source but are not part of the active tutorial flow (`TOTAL_PAGES = 7`).

## Navigation

- **Page indicators**: 7 dots showing current page (blue = active, grey = inactive)
- **Back button**: Navigate to previous page (hidden on page 0)
- **Next button**: Navigate to next page, or "Done"/"Get started" on page 6
- **Restart button**: Reset to page 0 (visible on pages 1-6)

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
