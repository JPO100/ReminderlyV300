# Colour Styles

See also [Text Styles](./text-styles.md).

## Core Colours

### Reminderly blue

- `#4784F8`
- used for primary CTAs, active toggles, tutorial dots, and branded emphasis

### List blue

- `#2B5DA0`
- used for core text, done states, pinned list treatment, list/archive controls, and selected list-specific UI

### App text dark blue

- `#1C2C42`
- shared heading/title colour across both reminders and lists surfaces
- used for primary screen headings, overlay headings, sheet titles, section titles, tutorial headings, empty state headings, and settings headings

## Reminder Category Colours

- Today: `#00AFEE`
- This week: `#E466FD`
- Later: `#FAA429`
- Sometime: `#939393`
- Grouped reminder `other`: `#FDB146`

## List Category Colours

Current list category colours in `App.tsx`:

- Complete: `#8168D5`
- Almost: `#9468D5`
- Started: `#60C1E7`
- Todo: `#939393`

### Pinned Lists

Pinned lists override category-colour treatment in the active `All` list view:

- list check circle: `#2B5DA0`
- pin icon: `#2B5DA0`

## State Colours

- Overdue reminders: `#FF0000`
- Deleted reminder state: `#939393`
- Deleted list state: `#898989`
- Subtitle grey: `#BABABA`
- Empty-state grey: `#CCCCCC`
- Disabled/border grey: `#D9D9D9`

## Background Colours

- White: `#FFFFFF`
- Premium section background: `#FAFAFA`
- Light control fill: `#F5F5F5`
- Active option fill in repeats/settings variants: `#E4E4E4`

## Notes

- colours are mostly applied inline in component code
- there is no single global theme map covering all app colours
- reminder surfaces and list surfaces use different accent systems
