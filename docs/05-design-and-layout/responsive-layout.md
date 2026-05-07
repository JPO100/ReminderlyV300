# Responsive Layout

## Overview

Reminderly uses a mobile-first layout with constrained centered content on larger screens. The current app is still largely web-layout driven, but the shipped iOS wrapper is portrait-only.

## Width Behaviour

### Narrow widths

- below `390px`, some controls hide or compress
- the reminder `Sometime` filter can be hidden on narrow reminder layouts
- some archive controls also reduce

### Max width

The main app content commonly caps at:

- `max-w-[768px]`

This is used across major reminder, list, and overlay surfaces to avoid overly wide layouts.

## Height-Based Adjustments

The most consistent current height breakpoint is around `667px`.

At shorter heights, the app currently reduces or removes:

- settings row icons
- settings/tutorial helper text
- premium bullet content
- some tutorial layout spacing

Tutorial-specific responsive behaviour is now centred in the shared tutorial path:

- `TutorialOnboardingContent.tsx` owns tutorial container spacing and pagination visibility changes
- `TutorialPhoneShell.tsx` owns tutorial phone scaling at short heights
- page files only adjust body-content spacing where needed; they do not own responsive phone shell structure

## Overlay Behaviour

Most major surfaces are rendered as bottom sheets by `App.tsx`, with:

- transparent backdrop
- slide-up motion
- viewport-aware top positioning
- drag-to-close support

Current exceptions exist:

- `ReminderInfoOverlay` is a centered modal with a dark backdrop
- `RepeatsOverlay` uses a different full-height overlay structure from the reminder/settings/tutorial bottom sheets

## iOS Constraint

The current iOS wrapper is portrait-only. That constraint is configured in the native iOS project and overrides any broader landscape assumptions the web layout might otherwise suggest.

## Related Documentation

- [Content Overlay Responsive](./content-overlay-responsive.md)
- [Sizing and Spacing](./sizing-spacing.md)
