# Content Overlay Responsive

## Overview

Reminderly does not currently use one single overlay pattern for every surface. Most overlays are bottom sheets provided by wrappers in `App.tsx`, but some overlays use different presentation rules.

## Current Bottom-Sheet Pattern

The current reminder/settings/tutorial/dev-tools sheet pattern is:

```tsx
<motion.div /> // transparent backdrop
<motion.div /> // sheet container, slide-up
  <motion.div /> // optional drag wrapper
    <div className="w-full max-w-[768px]">
      {/* overlay content */}
    </div>
```

Common characteristics:

- transparent click-catching backdrop
- `y: "100%"` to visible slide-up motion
- viewport-aware top offset
- `max-w-[768px]`
- rounded top corners

## Current Sheet-Based Surfaces

- Settings overlay
- Tutorial overlay
- Dev tools overlay
- reminder/list editor sheet flows rendered from `App.tsx`

## Current Exceptions

### Reminder Info Overlay

- centered modal
- darkened backdrop
- fixed-width white panel
- not part of the bottom-sheet wrapper family

### Repeats Overlay

- custom full-height overlay content
- internal back-button close/save behaviour
- different spacing and radius treatment from settings/tutorial/dev-tools sheets

## Bottom-Sheet Initial Top Constraint (fixed — persistent bug)

This was a long-standing bug that was difficult to diagnose. The symptom: opening a list overlay via smart reminder > info overlay > "go to list" caused the panel to visibly bounce at the top — but only when the list contained more than approximately 23 items. Lists with fewer items opened normally. The 23-item threshold corresponds to the point where the list content exceeds the panel's constrained viewport height and the scroll container activates.

The slide-up `motion.div` must include `top: getBottomSheetTopPosition()` in both `initial` and `animate`:

```tsx
initial={{ y: "100%", top: getBottomSheetTopPosition() }}
animate={{ y: 0, top: getBottomSheetTopPosition() }}
```

Without `top` in `initial`, the panel's height is determined by its content on the first frame (since it only has `bottom: 0`). When content is tall enough to exceed the viewport (more than ~23 list items), `y: "100%"` calculates its translate distance from this inflated content height. Then mid-animation, `top` kicks in and collapses the height to the correct constrained value. The mismatch between the starting translate distance and the shrinking height causes the visible bounce at the top of the panel.

Setting `top` in `initial` locks the panel to its correct constrained height from the first frame, so `y: "100%"` translates the right distance and the slide-up is smooth regardless of content size.

## Height-Based Adjustments

Current overlay content commonly changes around `667px` height:

- helper text can be hidden
- icons can be hidden
- premium rows compress
- tutorial spacing reduces

## Related Documentation

- [Responsive Layout](./responsive-layout.md)
- [Settings Overlay](../01-core-surfaces/settings-overlay.md)
- [Tutorial Overlay](../01-core-surfaces/tutorial-overlay.md)
- [Reminder Info Overlay](../01-core-surfaces/reminder-info-overlay.md)
