# Responsive Design

## Design Philosophy

Reminderly follows a **mobile-first approach**, designed initially for iPhone 16 Pro (402px × 874px) but scales seamlessly to all device sizes.

## Breakpoints

| Breakpoint | Width | Behavior |
|------------|-------|----------|
| Mobile Small | < 390px | "Sometime" filter button hidden; done/deleted back arrow hidden |
| Mobile | 390px - 767px | All filters visible, single column layout |
| Tablet | 768px - 1023px | Content max-width enforced (768px) |
| Desktop | 1024px+ | Content max-width enforced (768px), centered |

## Responsive Behavior by Component

### App Container
- **All sizes**: Full screen height, vertical flex layout
- **Mobile**: 20px horizontal padding
- **Desktop**: Content centered with max-width constraints

### Header Section

#### Logo Container
```css
/* All sizes */
padding-top: 50px;
padding-bottom: 20px;
width: 209.653px;
height: 35.653px;
```

#### Filter Buttons
```css
/* Mobile < 390px */
.sometime-button {
  display: none;  /* "Sometime" hidden */
}

/* Mobile >= 390px */
.sometime-button {
  display: flex;  /* "Sometime" visible */
}

/* All sizes */
display: flex;
justify-content: space-between;
height: 40px;
padding: 0 16px;
```

**Filter Button Sizing**:
- < 390px: 3 buttons visible, auto-width with space-between
- >= 390px: 4 buttons visible, auto-width with space-between
- All sizes: 40px fixed height

### White Card Container

```css
/* All sizes */
background: white;
padding: 20px;
gap: 32px;
border-radius: 20px 20px 0 0;
min-height: 350px;
flex: 1; /* Fills remaining screen height */
```

**Responsive Height Behavior**:
- Minimum height of 350px prevents content cutoff
- Flex-1 makes it grow to fill available screen space
- Works dynamically on different screen sizes

### Scrollable List Area

```css
/* All sizes */
max-width: 768px;
width: 100%;
border-radius: 10px;
overflow-y: auto;
overflow-x: clip;
gap: 10px;

/* Mobile */
padding: 0;  /* No internal padding, items are full width */
```

**Scroll Behavior**:
- Vertical scrolling when content exceeds container height
- Horizontal overflow hidden (clip)
- Smooth scrolling enabled by default

### Reminder Items

```css
/* All sizes */
width: 100%;
height: 51px;
padding: 13px 1px;
gap: 16px;
border-radius: 100px;
display: flex;
flex-direction: row;
align-items: center;
```

**Text Truncation**:
- All reminder text uses: `overflow-hidden`, `text-ellipsis`, `whitespace-nowrap`
- Long text displays with "..." when it exceeds available space

### New Reminder Button

```css
/* All sizes */
max-width: 768px;
width: 100%;
height: clamp(40px, calc(20vh - 73.6px), 60px);
padding: 0 30px;
border-radius: 100px;
```

The button height is viewport-responsive via CSS `clamp()`, ranging from 40px to 60px depending on the viewport height.

## Max-Width Strategy

The app uses a **768px max-width** for main content to ensure:
1. Optimal reading width on large screens
2. Consistent layout across device sizes
3. Content doesn't stretch uncomfortably wide
4. Maintains mobile app aesthetic even on desktop

### Where Max-Width is Applied:
- Header blue container: `max-w-[768px]`
- Scrollable list area: `max-w-[768px]`
- New reminder button: `max-w-[768px]`

All max-width elements are centered with `mx-auto` when space allows.

## Touch Targets

All interactive elements meet minimum touch target sizes:
- **Filter buttons**: 40px height (meets minimum)
- **Checkbox buttons**: 25px × 25px (acceptable for careful tap)
- **New reminder button**: 60px height (generous)

## Orientation Support

### Portrait (Default)
- Primary design orientation
- Vertical layout optimized
- Full feature set visible

### Landscape
- Same layout maintained
- Scrollable areas accommodate reduced height
- Header scales appropriately
- No special layout changes needed

## Safe Areas & Notches

The app design accounts for device notches and safe areas:
- 20px padding on all sides provides buffer
- No fixed positioning that might conflict with notches
- Content flows naturally within safe areas

## Performance Considerations

### Smooth Scrolling
- `overflow-y: auto` for native smooth scrolling
- No JavaScript scroll handlers needed
- Hardware-accelerated scrolling on mobile

### Transitions
- `transition-colors` for button states
- Lightweight transitions (no transform/position)

### Responsive Images
- SVG logo scales perfectly at any size
- No raster images in UI (except user-added)
- Crisp rendering at all resolutions

## Testing Recommendations

Test the app at these specific widths:
- **320px**: iPhone SE (smallest modern mobile)
- **375px**: iPhone 12/13 Mini
- **390px**: iPhone 14/15
- **402px**: iPhone 16 Pro (design target)
- **428px**: iPhone Pro Max models
- **768px**: iPad Mini (portrait)
- **1024px**: iPad (portrait)
- **1366px**: Desktop/laptop

Test these heights:
- **667px**: iPhone SE
- **874px**: iPhone 16 Pro (design target)
- **1024px**: iPad
- **1366px**: iPad Pro (portrait)
