# Tutorial Overlay

## Overview

The Tutorial overlay provides an 8-page onboarding flow explaining Reminderly's features. It is accessible from the Settings overlay via the "Reminderly tutorial" row.

## Access

- Click "Reminderly tutorial" row in SettingsOverlay
- Opens when `isOnboardingTutorialEnabled === true` (feature flag in App.tsx)
- Sets `isTutorialOpen` to true
- Overlay slides up from bottom

## Overlay Behaviour

### Opening and Closing

- Slide-up animation: `initial={{ y: "100%" }}` to `animate={{ y: 0 }}`, 250ms easeInOut
- Z-index: backdrop z-40, overlay z-50
- Closes via:
  - Completing the tutorial (clicking "Done" or "Get started" on final page)
  - Backdrop tap (transparent backdrop, `bg-black/0`)

### Structure

```
TutorialOverlay
  └── TutorialOnboardingContent
      ├── OnboardingPage[1-8]Content components
      ├── Page indicator dots (8 dots)
      ├── Navigation buttons (Back, Next/Done)
      └── Restart button (visible on pages after first)
```

## Tutorial Pages

8 pages total (TOTAL_PAGES = 8, indexed 0-7):

1. **OnboardingPage1Content** - Introduction / Welcome
2. **OnboardingPage2Content** - Feature overview
3. **OnboardingPage3Content** - Creating reminders
4. **OnboardingPage4Content** - Scheduling
5. **OnboardingPage5Content** - Natural Language Capture
6. **OnboardingPage6Content** - Filters and organization
7. **OnboardingPage7Content** - Done and delete
8. **OnboardingPage8Content** - Final page / Get started

Note: OnboardingPage9Content.tsx exists but is unused (not in the TOTAL_PAGES range).

## Navigation

### Page Indicator Dots

- 8 dots representing pages 0-7
- Active page: blue `#4784F8`
- Inactive pages: grey `#D9D9D9`
- Hidden at viewport height 570px or below (`[@media(max-height:570px)]:hidden`)

### Back Button

- Label: "Back"
- Visible: pages 1-7 (hidden on page 0)
- Click: navigate to previous page
- Visual: translucent background, white text

### Next/Done Button

- Label: "Next" (pages 0-6), "Done" or "Get started" (page 7)
- Visible: all pages
- Click: navigate to next page or close tutorial (page 7)
- Visual: blue background `#4784F8`, white text

### Restart Button

- Label: "Restart"
- Visible: pages 1-7 (hidden on page 0)
- Click: reset to page 0
- Visual: translucent background, white text

## State Management

### Current Page

```typescript
const [currentPage, setCurrentPage] = useState(0);
```

- Controlled by Back/Next buttons
- Reset to 0 on Restart
- Page content conditionally rendered based on `currentPage`

### Completion

Clicking "Done" or "Get started" on page 7:
- Calls `onComplete()` callback
- Closes tutorial overlay
- Does not set any completion flag or persist state

## Content Rendering

Pages rendered conditionally:

```tsx
{currentPage === 0 && <OnboardingPage1Content filtersMenuVariant={filtersMenuVariant} />}
{currentPage === 1 && <OnboardingPage2Content filtersMenuVariant={filtersMenuVariant} />}
// ...etc
```

All pages except page 8 receive `filtersMenuVariant` prop (standard or grouped filter variant). Page 8 (OnboardingPage8Content) receives no props.

## Responsive Behaviour

### Container Height

- Default: fixed 808px height
- Below 570px: auto height (`[@media(max-height:570px)]:!h-auto`)
- Padding bottom removed at 570px (`[@media(max-height:570px)]:!pb-0`)

### Padding

```css
paddingLeft: clamp(16px, 5vw, 40px)
paddingRight: clamp(16px, 5vw, 40px)
paddingTop: 24px
paddingBottom: 60px
```

### Content Area

- Flex: 1 (fills available space)
- Below 570px: flex-none (`[@media(max-height:570px)]:flex-none`)
- Overflow: hidden

### Navigation Controls

- Gap: 36px between dots and buttons
- Below 570px: padding 30px top/bottom (`[@media(max-height:570px)]:pt-[30px] [@media(max-height:570px)]:pb-[30px]`)

## Feature Flag

Tutorial is only accessible when `isOnboardingTutorialEnabled === true` in App.tsx. When false:
- TutorialOverlay returns null
- "Reminderly tutorial" row in Settings remains visible but may be disabled (depending on implementation)

## File Locations

- TutorialOverlay: `/src/app/components/TutorialOverlay.tsx`
- TutorialOnboardingContent: `/src/app/components/TutorialOnboardingContent.tsx`
- OnboardingPage[1-8]Content: `/src/app/components/OnboardingPage[1-8]Content.tsx`
- OnboardingPage9Content: `/src/app/components/OnboardingPage9Content.tsx` (unused)

## Related Documentation

- [Settings Overlay](./settings-overlay.md) - Access point for tutorial
- [Onboarding and Tutorial](../04-settings-onboarding-and-premium/onboarding-and-tutorial.md) - Detailed tutorial content
