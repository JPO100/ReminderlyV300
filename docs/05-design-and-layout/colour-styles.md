# Colour Styles

Content from `/docs/colour-styles.md`.

See also: `/docs/05-design-and-layout/text-styles.md`

## Primary Colours

### Reminderly Blue
**Hex**: `#4784F8`
**Usage**: Primary brand colour, filter active states, NLC highlights, toggles ON, CTA buttons

### Dark Blue (Done)
**Hex**: `#1C2C42`
**Usage**: Done reminder circles, done text, header background (done/deleted mode)

## Category Colours

### Today - Blue
**Hex**: `#00AFEE`
**Usage**: Today reminder circles

### This Week - Pink
**Hex**: `#DF4DFC`
**Usage**: This week reminder circles

### Later - Orange
**Hex**: `#FAA429`
**Usage**: Later reminder circles

### Sometime - Grey
**Hex**: `#939393`
**Usage**: Sometime reminder circles, deleted reminders, status icons

## Status Colours

### Overdue - Red
**Hex**: `#FF0000`
**Usage**: Overdue reminder circles, text, status icons

### Delete - Grey
**Hex**: `#939393`
**Usage**: Deleted reminder styling, pending delete state

## Text Colours

### Primary Text
**Hex**: `#1c2c42`
**Usage**: Reminder titles, body text

### Subtitle Text
**Hex**: `#BABABA`
**Usage**: Reminder subtitles (date/time/repeat), status icons (normal state)

### Empty State Text
**Hex**: `#CCCCCC`
**Usage**: Empty state messages

### Light Grey
**Hex**: `#D9D9D9`
**Usage**: Borders, dividers, disabled states

## Background Colours

### White
**Hex**: `#FFFFFF`
**Usage**: Card backgrounds, button active states, overlay backgrounds

### Light Grey Background
**Hex**: `#FAFAFA`
**Usage**: Premium features section background

### Translucent White
**Value**: `rgba(255,255,255,0.15)`
**Usage**: Inactive filter buttons, done/deleted sub-filter buttons

### Translucent Black
**Value**: `rgba(0,0,0,0)` (fully transparent)
**Usage**: Overlay backdrops (click-through)

## Colour Application

### Reminder Circles

Priority: `overdue ? OVERDUE_COLOUR : CATEGORY_COLOURS[category]`

Overdue red takes precedence over category colour.

### Reminder Text

**Active list normal**: `#1c2c42`
**Overdue**: `#FF0000`
**Pending done**: `#BABABA` (container), `#1C2C42` (inline)
**Pending delete**: `#939393`

### Status Icons

**Active normal**: `#BABABA`
**Overdue**: `#FF0000`
**Pending done**: `#1C2C42`
**Pending delete**: `#939393`
**Done**: `#1C2C42`
**Deleted**: `#939393`

## Design Constraints

- No custom Tailwind colour classes (use arbitrary values: `bg-[#4784f8]`)
- Colours defined inline in components
- No global colour variables (except CSS custom properties in theme.css)

For full colour documentation, see original `/docs/colour-styles.md`.
