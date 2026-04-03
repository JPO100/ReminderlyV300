# Onboarding and Tutorial

## Overview

The tutorial system provides an 8-page onboarding flow explaining Reminderly's features. Accessible from the Settings overlay when the tutorial feature flag is enabled.

## Tutorial Pages

8 pages (indexed 0-7) implemented as separate components:

1. **OnboardingPage1Content** - Welcome/Introduction
2. **OnboardingPage2Content** - Feature overview
3. **OnboardingPage3Content** - Creating reminders
4. **OnboardingPage4Content** - Scheduling
5. **OnboardingPage5Content** - Natural Language Capture
6. **OnboardingPage6Content** - Filters and organization
7. **OnboardingPage7Content** - Done and delete
8. **OnboardingPage8Content** - Get started/Final page

Note: OnboardingPage9Content exists but is unused (TOTAL_PAGES = 8).

## Navigation

- **Page indicators**: 8 dots showing current page (blue = active, grey = inactive)
- **Back button**: Navigate to previous page (hidden on page 0)
- **Next button**: Navigate to next page, or "Done"/"Get started" on page 7
- **Restart button**: Reset to page 0 (visible on pages 1-7)

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

## Content Props

All pages except page 8 receive `filtersMenuVariant` prop (standard or grouped filter variant).

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
- OnboardingPage[1-9]Content: `/src/app/components/OnboardingPage[1-9]Content.tsx`

## Related Documentation

- [Tutorial Overlay](../01-core-surfaces/tutorial-overlay.md) - Complete tutorial overlay documentation
- [Settings Overlay](../01-core-surfaces/settings-overlay.md) - Access point