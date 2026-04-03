# Sizing & Spacing System

## Spacing Scale

Reminderly uses a consistent spacing system based on the following scale:

| Token | Value | Usage |
|-------|-------|-------|
| `1px` | 0.0625rem | Reminder item padding horizontal |
| `4px` | 0.25rem | Micro gaps |
| `8px` | 0.5rem | Small gaps |
| `10px` | 0.625rem | Reminder list item gaps |
| `13px` | 0.8125rem | Reminder item padding vertical |
| `16px` | 1rem | Standard gaps (filter buttons, reminder content) |
| `20px` | 1.25rem | Large padding (card container, header, logo spacing) |
| `22px` | 1.375rem | Button vertical padding (New Reminder) |
| `30px` | 1.875rem | Extra padding (New Reminder horizontal) |
| `32px` | 2rem | Section gaps (card container internal gap) |
| `50px` | 3.125rem | Logo top padding |

## Component Sizing

### Header Components

#### App Header Container
```
padding: 20px (all sides)
width: 100%
```

#### Blue Container
```
max-width: 768px
gap: 20px (vertical)
margin: 0 auto (centered)
```

#### Logo
```
width: 209.653px
height: 35.653px
padding-top: 50px
padding-bottom: 20px
```

#### Filter Buttons
```
height: 40px (fixed)
padding: 0 16px (horizontal)
gap: auto (space-between layout)
border: 1px solid white
border-radius: 100px (pill shape)
```

### Card Container

#### White Card Container
```
width: 100%
min-height: 350px
padding: 20px (all sides)
gap: 32px (vertical between list and button)
border-radius: 20px 20px 0 0 (top corners only)
```

#### Scrollable List Area
```
width: 100%
max-width: 768px
flex: 1 (fills available space)
gap: 10px (between reminder items)
border-radius: 10px
overflow-y: auto
overflow-x: clip
```

### Reminder Items

#### Reminder Item Container
```
width: 100%
height: 51px
padding: 13px 1px (vertical horizontal)
gap: 16px (horizontal between elements)
border-radius: 100px
```

#### Circle Checkbox
```
width: 25px
height: 25px
border: 2px solid
border-radius: 50% (circle)
```

#### Text Content
```
flex: 1 (fills remaining space)
overflow: hidden
text-overflow: ellipsis (shows "..." when text is cut off)
white-space: nowrap (prevents text wrapping)
**Text Truncation Active**: Long reminder text displays with "..." when it exceeds available space
```

#### Status Icons
```
width: 25px
height: 25px
```

### New Reminder Button

```
width: 100%
max-width: 768px
height: 60px
padding: 22px 30px
gap: 16px (horizontal between icon and text)
border-radius: 100px (pill shape)
```

#### Plus Icon
```
width: 15px
height: 15px
```

## Border Radius System

| Value | Usage |
|-------|-------|
| `10px` | Scrollable list area |
| `20px` | White card container (top corners) |
| `50%` / `100px` | Pill shapes (buttons, filters, reminder items) |

## Typography Sizing

### Font Sizes
| Size | Usage | Line Height |
|------|-------|-------------|
| `14px` | Filter buttons | Default |
| `17px` | Reminder text | Default |
| `20px` | New Reminder button | Default |

### Font Weights
| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Semi-Bold | 600 | Subtitle text, date/time/repeat indicator labels |
| Bold | 700 | Reminder title text, buttons, filters |

## Icon Sizing

| Icon | Size | Usage |
|------|------|-------|
| Plus | 15px | New Reminder button |
| Circle Checkbox | 25px | Reminder completion indicator |
| Status Icons | 25px | time-set-icon, time-repeats-icon, no-time-icon |
| Done Tick | 25px | Completed reminder indicator |

## Container Max-Widths

| Container | Max-Width | Purpose |
|-----------|-----------|------------|
| Main Content | 768px | Optimal reading width, maintains app aesthetic |

## Spacing Patterns

### Consistent Gaps
- **List items**: 10px gap (creates visual separation)
- **Button internal**: 16px horizontal gap between icon and text
- **Card sections**: 32px gap (creates clear section divisions)

### Padding Strategy
- **Outer containers**: 20px padding (provides breathing room)
- **Interactive elements**: 16px horizontal padding (comfortable touch targets)
- **Reminder items**: 13px vertical, 1px horizontal padding

### Vertical Rhythm
The app maintains vertical rhythm through consistent spacing:
```
App Header Container (20px padding)
  ├─ Logo (50px top, 20px bottom)
  └─ Filters (20px gap from logo)
  
White Card (20px padding)
  ├─ List Area (flex-1, dynamic)
  │   └─ Items (10px gap between each)
  └─ New Reminder Button (32px gap from list)
```

## Responsive Sizing Adjustments

### Mobile (< 400px)
- Filter buttons: Auto-width to fit 3 buttons
- Touch targets: All meet 40px+ minimum

### Mobile (400px+)
- Filter buttons: Auto-width to fit 4 buttons
- All spacing remains consistent

### Tablet (768px+)
- Content max-width enforced (768px)
- All spacing remains consistent

### Desktop (1024px+)
- Content centered with max-width
- No spacing changes

## Minimum Dimensions

### Minimum Heights
- White card container: `350px`
  - Prevents content cutoff on short screens
  - Ensures button always visible
  - Allows reasonable list viewing area

### Minimum Touch Targets
- Filter buttons: `40px` height
- Checkbox: `25px × 25px`
- New Reminder button: `60px` height (generous)

## Safe Spacing

All outer containers use 20px padding to ensure:
1. Content doesn't touch screen edges
2. Safe distance from device notches
3. Comfortable visual margins
4. Touch-friendly spacing from edges
