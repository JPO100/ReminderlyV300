# Responsive Layout

Content from `/docs/responsive-design.md`.

## Design Philosophy

Reminderly follows a **mobile-first approach**, designed initially for iPhone 16 Pro (402px × 874px) but scales seamlessly to all device sizes.

## Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile Small | < 390px | "Sometime" filter button hidden; done/deleted back arrow hidden |
| Mobile | 390px - 767px | All filters visible, single column layout |
| Tablet | 768px - 1023px | Content max-width enforced (768px) |
| Desktop | 1024px+ | Content max-width enforced (768px), centered |

## iPhone SE Threshold (667px Height)

At 667px viewport height or below, specific responsive behaviours activate:

### Settings Overlay
- Left icons hidden on setting rows
- Row alignment changes to center
- Subtitle text hidden
- Feature row bullets hidden

### Tutorial Overlay
- Container height becomes auto
- Padding bottom removed
- Content area becomes flex-none
- Page indicator dots hidden
- Navigation controls get special padding

See [Content Overlay Responsive](./content-overlay-responsive.md) for full pattern.

## Max-Width Strategy

The app uses a **768px max-width** for main content to ensure:
1. Optimal reading width on large screens
2. Consistent layout across device sizes
3. Content doesn't stretch uncomfortably wide
4. Maintains mobile app aesthetic even on desktop

### Where Max-Width is Applied
- Header blue container: `max-w-[768px]`
- Scrollable list area: `max-w-[768px]`
- New reminder button: `max-w-[768px]`

All max-width elements are centered with `mx-auto` when space allows.

## Touch Targets

All interactive elements meet minimum touch target sizes:
- **Filter buttons**: 40px height (meets minimum)
- **Checkbox buttons**: 25px × 25px (acceptable for careful tap)
- **New reminder button**: 60px height (generous)

## Related Documentation

- [Content Overlay Responsive](./content-overlay-responsive.md) - Overlay responsive pattern
- [Component Hierarchy](./component-hierarchy.md) - Component structure
- [Sizing and Spacing](./sizing-spacing.md) - Spacing system

For full responsive details, see original `/docs/responsive-design.md`.
