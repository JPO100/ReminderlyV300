# Settings Overlay

Consolidated from `/docs/settings.md`.

## Overview

The Settings overlay provides user-facing settings and displays premium features. It is accessible only from the active list view when the grouped filters variant is active.

## Access

- Settings button (LaterBtn component) appears only when `filtersMenuVariant === 'grouped'`
- Positioned to the right of the filter buttons
- Click settings button to open overlay
- Not accessible from standard filters mode or done/deleted view

## Overlay Behaviour

### Opening and Closing

- Slide-up animation: `initial={{ y: "100%" }}` to `animate={{ y: 0 }}`, 250ms easeInOut
- Uses `getOverlayTopPosition()` for viewport-aware positioning
- Z-index: backdrop z-40, overlay z-50
- Closes via:
  - Backdrop tap (transparent backdrop, `bg-black/0`)
  - Close button (top-right, rotated-plus "x" icon)

### Structure

```
SettingsOverlay
  ├── Header ("Settings" title + close button)
  ├── Settings items list
  │   ├── Show date and time subtitles row (toggle)
  │   └── Reminderly tutorial row (navigation)
  └── Premium features section (grey keyline, scrollable)
      ├── Title row ("Unlock premium features!" + icon)
      ├── Features scroll area
      │   ├── Unlimited reminders row (locked toggle)
      │   ├── Natural Language Capture row (locked toggle)
      │   └── Repeat reminders row (locked toggle)
      └── CTA button
```

## Show Date and Time Subtitles

### State

```typescript
const [showDateAndTimeSubtitles, setShowDateAndTimeSubtitles] = useState<boolean>(() => {
  // localStorage persisted, default true
});
```

- Persisted to localStorage under key `reminderly.showDateAndTimeSubtitles`
- Default value: `true`

### Derived Value

Actual subtitle visibility gated on grouped filters variant:

```typescript
const showSubtitles = !(filtersMenuVariant === 'grouped' && !showDateAndTimeSubtitles);
```

Subtitles always shown in standard filters mode, regardless of toggle state.

### Auto-Reset

When leaving grouped filters mode with subtitles off, toggle auto-resets to true:

```typescript
useEffect(() => {
  if (filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles) {
    setShowDateAndTimeSubtitles(true);
  }
}, [filtersMenuVariant, showDateAndTimeSubtitles]);
```

### Effect on Reminder Rows

When `showSubtitles` is false:
- Subtitle line (date, time, repeat label) hidden in both active and done/deleted rows
- Text column div gets `minHeight: '38px'` to maintain consistent row spacing
- Row alignment changes from `items-start` to `items-center`
- Circle checkbox `marginTop: '3px'` removed

When `showSubtitles` is true (default):
- Both lines visible: title (17px) and subtitle (13.5px) with 4px gap
- Circle checkbox has `marginTop: '3px'` for alignment with top line

### Visual States

**ON (showDateAndTimeSubtitles = true)**
- Icon: `#1C2C42`
- Title text: `#1C2C42`
- Subtitle text: `#BABABA`
- Toggle track: `#4784F8`
- Toggle thumb: white, positioned right (cx=41)

**OFF (showDateAndTimeSubtitles = false)**
- Icon: `#D9D9D9`
- Title text: `#D9D9D9`
- Subtitle text: `#D9D9D9`
- Toggle track: `#D9D9D9`
- Toggle thumb: white, positioned left (cx=15)

### Responsive Behaviour (iPhone SE 667px)

At 667px viewport height or below:
- Left icon hidden (`[@media(max-height:667px)]:hidden`)
- Row alignment: `[@media(max-height:667px)]:items-center`
- Toggle translateY(3px) removed: `[@media(max-height:667px)]:translate-y-0`
- Subtitle text remains visible on larger viewports, hidden at 667px

## Reminderly Tutorial

### Row Behaviour

- Label: "Reminderly tutorial"
- Subtitle: "Take a refresh of the onboarding tutorial" (hidden at 667px)
- Right arrow icon (navigation chevron)
- Clickable: opens TutorialOverlay
- Not a toggle (navigation row)

### Conditional Visibility

Only visible when `isOnboardingTutorialEnabled === true`. Feature flag controlled in App.tsx.

### Responsive Behaviour (iPhone SE 667px)

At 667px viewport height or below:
- Left icon hidden (`[@media(max-height:667px)]:hidden`)
- Row alignment: `[@media(max-height:667px)]:items-center`
- Tutorial text vertically centered with right arrow icon

## Premium Features Section

### Layout

- Background: `#FAFAFA` (light grey)
- Top border: 1px `#D9D9D9` (grey keyline)
- Padding: 24px top, 20px horizontal, 32px bottom
- Full-width bleed: `w-[calc(100%+40px)] -mx-[20px]`
- Flex: 1 (fills remaining overlay space)
- Scrollable features area with pinned CTA button at bottom

### Title Row

- Text: "Unlock premium features!"
- Font: Lato ExtraBold 18px
- Colour: `#4784F8` (Reminderly blue)
- Icon: Premium badge icon (blue)
- Padding: 26px bottom

### Features Scroll Area

Scrollable container with 3 feature rows:

1. **Unlimited reminders**
   - Icon: stacked reminders icon (hidden at 667px)
   - Title: "Unlimited reminders" (Lato Bold 17px, black)
   - Subtext: "No limit on reminders you create" / "No limit on reminders" (667px)
   - Bullet: "Unlock the 10 reminder limit" (hidden at 667px)
   - Toggle: locked OFF (grey track, white thumb left)

2. **Natural Language Capture**
   - Icon: chat bubble icon (hidden at 667px)
   - Title: "Natural Language Capture" (Lato Bold 17px, black)
   - Subtext: "Capture dates and times as you type;" / "Capture dates and times" (667px)
   - Bullets: Example phrases with blue highlights (hidden at 667px)
   - Toggle: locked OFF (grey track, white thumb left)

3. **Repeat reminders**
   - Icon: circular arrows icon (hidden at 667px)
   - Title: "Repeat reminders" (Lato Bold 17px, black)
   - Subtext: "Set it once and leave it to run"
   - Bullets: "Daily, weekly, monthly or custom", "Ideal for bills and meetings etc." (hidden at 667px)
   - Toggle: locked OFF (grey track, white thumb left)

### Feature Row Spacing

- 30px margin-top between rows (larger viewports)
- 24px margin-top between rows (667px viewport)

### Feature Row Responsive (iPhone SE 667px)

At 667px viewport height or below:
- Left icons hidden
- Bullet points hidden (first line subtext remains visible)
- Shorter subtext variants shown
- Reduced gap between rows (24px vs 30px)

### CTA Button

- Label: "Get premium features for £9 a year!" / "Get premium for £9 a year!" (667px)
- Font: Lato Bold 17px, white
- Background: `#4784F8` (Reminderly blue)
- Height: `clamp(40px, calc(20vh - 73.6px), 60px)` (viewport-responsive)
- Border-radius: 100px
- Full-width
- Pinned to bottom of premium section (not scrollable)
- Padding-top: 20px (spacing from features)

### Premium UI State

All premium features are display-only. Toggles are locked in OFF state and not interactive. CTA button displays pricing but has no functional integration.

## File Location

`/src/app/components/SettingsOverlay.tsx`

## Dependencies

- LaterBtn: `/src/imports/LaterBtn-146-39.tsx` (settings button in grouped filters)
- TutorialOverlay: `/src/app/components/TutorialOverlay.tsx`

## Related Documentation

- [Tutorial Overlay](./tutorial-overlay.md) - Onboarding tutorial system
- [Premium UI](../04-settings-onboarding-and-premium/premium-ui.md) - Premium feature details
