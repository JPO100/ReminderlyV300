# Content Overlay Responsive

Content from `/docs/content-overlay-responsive.md`.

## Overview

Standard responsive pattern for full-screen overlays in Reminderly. Ensures consistent layout, positioning, and responsive behaviour across all overlay components.

## Pattern Structure

```tsx
<motion.div> {/* Backdrop */}
  <motion.div> {/* Overlay container */}
    <div className="size-full flex flex-col items-center">
      <div className="w-full max-w-[768px]">
        {/* Overlay content */}
      </div>
    </div>
  </motion.div>
</motion.div>
```

### Key Elements

**Backdrop**
- Z-index: 40
- Background: `bg-black/0` (transparent, allows backdrop click detection)
- Full screen coverage

**Overlay Container**
- Z-index: 50
- Slide-up animation: `y: "100%"` → `y: 0`, 250ms easeInOut
- Top position: `getOverlayTopPosition()` (viewport-aware)
- Border-radius: `rounded-tl-[20px] rounded-tr-[20px]`

**Content Wrapper**
- `size-full items-center`: Full height, horizontally centered
- Inner max-width: `max-w-[768px]`
- Padding: typically `px-[20px]` horizontal

## Viewport-Aware Positioning

`getOverlayTopPosition()` function calculates top position based on viewport height:

- Larger viewports: Leaves space at top for app context visibility
- Smaller viewports (iPhone SE): Maximizes overlay height

Threshold: 667px viewport height (iPhone SE)

## Responsive Breakpoints

### iPhone SE (667px Height)

At 667px viewport height or below, specific adjustments activate:

**Settings Overlay**
- Left icons hidden (`[@media(max-height:667px)]:hidden`)
- Row alignment centered (`[@media(max-height:667px)]:items-center`)
- Subtitle text hidden
- Premium feature bullets hidden
- Shorter CTA button text

**Tutorial Overlay**
- Container height becomes auto (`[@media(max-height:667px)]:!h-auto`)
- Padding bottom removed (`[@media(max-height:667px)]:!pb-0`)
- Content area: `flex-none` instead of `flex-1`
- Page indicator dots hidden
- Navigation controls: special padding

## Max-Width Strategy

All overlays constrain content to `max-w-[768px]` for:
- Optimal reading width
- Consistent layout across device sizes
- Mobile app aesthetic on desktop

## Padding Pattern

Standard padding across overlays:
- **Top**: 26px
- **Horizontal**: 20px
- **Bottom**: Varies by overlay content

## Animation Pattern

Standard slide-up with Motion:

```tsx
<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "100%" }}
  transition={{ duration: 0.25, ease: "easeInOut" }}
>
```

## Usage in Overlays

All overlays use this pattern:
- NewReminderOverlay
- ReminderInfoOverlay
- RepeatsOverlay
- SettingsOverlay
- TutorialOverlay
- DevToolsOverlay

## Related Documentation

- [Responsive Layout](./responsive-layout.md) - Overall responsive strategy
- [All overlay documentation](../../01-core-surfaces/) - Individual overlay implementations

For full details, see original `/docs/content-overlay-responsive.md`.
