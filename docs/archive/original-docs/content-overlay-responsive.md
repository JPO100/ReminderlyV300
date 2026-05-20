# Content Overlay Responsive Behavior Specification

This document defines all responsive behaviors for content overlays in the Reminderly app. These patterns should be applied consistently to any new overlay created in the future.

---

## Overview

The app uses a consistent responsive strategy:
- **Width**: Full-width backgrounds with centered, max-width-constrained content
- **Height**: Dynamic positioning based on viewport height with snap logic and motion-animated transitions
- **Layout**: Three-panel mobile structure (header, content, overlay)

---

## Width Behaviors

### Pattern: Full-Width Container with Constrained Content

This is the **canonical pattern** used throughout the app for maintaining visual consistency across all screen sizes.

#### Structure
```
┌─────────────────────────────────────────┐
│ Full-width container (w-full)           │
│ ┌─────────────────────────────────────┐ │
│ │ Centered content (max-w-[768px])    │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ Padding wrapper (px-[20px])     │ │ │
│ │ │                                 │ │ │
│ │ │    Actual content here          │ │ │
│ │ │                                 │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

#### Implementation

**App.tsx - Header Section**
```tsx
// Outer: Full-width with padding
<div className="app-header relative shrink-0 w-full p-[20px]">
  // Inner: Centered with max-width constraint
  <div className="... w-full max-w-[768px] mx-auto bg-[#4784f8]">
    {/* Logo and filters */}
  </div>
</div>
```

**App.tsx - White Card Container**
```tsx
// Outer: Full-width background
<div className="bg-white ... w-full flex-1 min-h-[350px]">
  // Scrollable area: Centered with max-width
  <div className="... w-full max-w-[768px]">
    {/* Reminder list */}
  </div>
  
  // Button container: Centered with max-width
  <div className="... w-full max-w-[768px] pb-[32px] shrink-0">
    {/* New reminder button */}
  </div>
</div>
```

**NewReminderOverlay.tsx**
```tsx
// Outer container: Full-width/height with centered flex
export default function NewReminderOverlay() {
  return (
    <div className="... items-center ... size-full">
      {/* Content wrapper: Constrained width */}
      <div className="... w-full max-w-[768px]">
        {/* Inner padding wrapper */}
        <div className="... px-[20px] ... w-full">
          {/* Actual content */}
        </div>
      </div>
    </div>
  );
}
```

#### Key Classes
- **Outer container**: `w-full` + `items-center` (to center children)
- **Content wrapper**: `w-full max-w-[768px]`
- **Padding wrapper**: `px-[20px]` (provides left/right spacing within constrained area)

#### Rationale
- **Full-width background**: Ensures visual consistency (white background, rounded corners, etc.)
- **768px max-width**: Optimal reading width for mobile content, prevents overly wide layouts on tablets
- **20px horizontal padding**: Provides comfortable breathing room on edges
- **Centering with `items-center`**: Keeps content centered when viewport exceeds 768px

---

## Height Behaviors

### NewReminderOverlay - Dynamic Positioning

The overlay uses sophisticated viewport-aware positioning to ensure usability across all screen heights.

#### Visual Reference

```
┌──────────────────────────────────────┐
│ Blue Header (Logo + Filters)        │ ← Top: 0px
│   Logo bottom: 105.653px             │
│   (20px + 50px + 35.653px)           │
└──────────────────────────────────────┘
                                        
      ↕ 16px gap                        ← Default overlay position: 121.653px
                                          (Logo bottom + 16px)
┌──────────────────────────────────────┐
│                                      │
│  NewReminderOverlay                  │
│  (Slides up from bottom)             │
│                                      │
│                                      │
└──────────────────────────────────────┘ ← Bottom: 0px


When viewport shrinks:

┌──────────────────────────────────────┐
│ Blue Header (Logo + Filters)        │
│                                      │
┌──────────────────────────────────────┐ ← Overlay position: 54px
│                                      │   (20px + 50px - 16px)
│  NewReminderOverlay                  │   16px ABOVE logo
│  (Expanded to maximize space)        │
│                                      │
└──────────────────────────────────────┘
```

#### Positioning Logic

**Constants** (in `App.tsx`):
```tsx
const THRESHOLD = 570;           // Viewport height where behavior changes
const DEFAULT_TOP = 121.653;     // 16px below logo (20px + 50px + 35.653px + 16px)
const ABOVE_LOGO_TOP = 54;       // 16px above logo (20px + 50px - 16px)
```

**Logo Position Calculation**:
- Header padding-top: `20px`
- Logo internal padding-top: `50px` 
- Logo height: `35.653px`
- Logo bottom edge: `20 + 50 + 35.653 = 105.653px`

**Default Position** (16px below logo):
- `105.653 + 16 = 121.653px`

**Above Logo Position** (16px above logo):
- `20 + 50 - 16 = 54px`

#### State Management

```tsx
const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

useEffect(() => {
  const handleResize = () => {
    setViewportHeight(window.innerHeight);
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

#### Position Calculation Function

```tsx
const getOverlayTopPosition = () => {
  const THRESHOLD = 570;
  const DEFAULT_TOP = 121.653;
  const ABOVE_LOGO_TOP = 54;
  
  if (viewportHeight <= THRESHOLD) {
    return ABOVE_LOGO_TOP;
  }
  return DEFAULT_TOP;
};
```

Simple snap logic: the `top` value is either above or below the logo based on the 570px threshold. Smooth transitions between positions are handled by motion's `animate` prop (see Overlay Mounting below), not by interpolation.

#### Behavior Scenarios

| Scenario | Viewport Height | Result | Top Position |
|----------|----------------|--------|--------------|
| **Open on tall screen** | >570px | Default position | 121.653px (16px below logo) |
| **Open on short screen** | ≤570px | Above logo | 54px (16px above logo) |
| **Resize from tall → short while open** | Crosses 570px | Motion animates to above logo | 121.653px → 54px (animated) |
| **Resize from short → tall while open** | Crosses 570px | Motion animates to below logo | 54px → 121.653px (animated) |
| **Close and reopen** | Any | Fresh evaluation | Based on current viewport |

#### Why This Design?

1. **Snap Logic**: Simple threshold-based positioning — above or below logo, no complex interpolation
2. **Motion-Animated Transitions**: The `top` value is in motion's `animate` prop, so changes animate smoothly (0.25s easeInOut) when viewport crosses the threshold during resize
3. **No State Tracking Needed**: Previous implementation used `hasResizedSinceOpenRef` to differentiate "opening" from "resizing" and linear interpolation for smooth resize. By moving `top` into motion's `animate` prop, motion handles smooth transitions automatically, eliminating the need for resize tracking or interpolation
4. **16px Spacing**: Maintains consistent visual spacing whether above or below logo

#### Overlay Mounting

```tsx
<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0, top: getOverlayTopPosition() }}
  exit={{ y: "100%" }}
  transition={{ duration: 0.25, ease: "easeInOut" }}
  className="fixed left-0 right-0 z-50 mx-auto w-full"
  style={{ bottom: 0 }}
>
  <NewReminderOverlay />
</motion.div>
```

**Key Details**:
- `fixed` positioning: Overlay is fixed to viewport, not document
- `top` is in `animate` prop: Motion animates `top` changes smoothly when viewport crosses the threshold
- `bottom: 0` in `style`: Always stretches to bottom of screen (static, doesn't need animation)
- `y: "100%"` → `y: 0`: Slide-up entry animation (runs alongside initial `top` positioning)
- `z-50`: Ensures overlay appears above all content
- `w-full`: Full-width container

---

## DevToolsOverlay - Dynamic Positioning

DevToolsOverlay follows the same canonical patterns as NewReminderOverlay for both width and height responsive behavior.

#### Motion Wrapper (App.tsx)

```tsx
<motion.div
  initial={{ y: "100%" }}
  animate={{ y: 0, top: getOverlayTopPosition() }}
  exit={{ y: "100%" }}
  transition={{ duration: 0.25, ease: "easeInOut" }}
  className="fixed left-0 right-0 z-50 mx-auto w-full"
  style={{ bottom: 0 }}
>
  <DevToolsOverlay onClose={() => setIsDevToolsOpen(false)} />
</motion.div>
```

Identical to NewReminderOverlay's mounting pattern — shares the same `getOverlayTopPosition()` function for consistent viewport-aware positioning.

#### Component Structure (DevToolsOverlay.tsx)

Follows the full-width-with-constrained-content pattern:

```tsx
// Outer container: Full-width/height bg with centered children
export default function DevToolsOverlay({ onClose }) {
  return (
    <div className="... items-center ... size-full">
      {/* Content wrapper: Constrained width */}
      <DevToolsContent onClose={onClose} />  {/* w-full max-w-[768px] */}
    </div>
  );
}
```

- Outer container uses `items-center` to center content horizontally
- `DevToolsContent` wrapper applies `w-full max-w-[768px]`
- Inner padding: `px-[20px]`

---

## RepeatsOverlay - Dynamic Positioning

RepeatsOverlay follows the same canonical slide-up pattern as NewReminderOverlay. Shares `getOverlayTopPosition()` for viewport-aware positioning. Uses transparent backdrop (`bg-black/0`) at z-40, overlay at z-50.

---

## SettingsOverlay - Dynamic Positioning

SettingsOverlay follows the same canonical slide-up pattern as NewReminderOverlay. Shares `getOverlayTopPosition()` for viewport-aware positioning. Uses transparent backdrop (`bg-black/0`) at z-40, overlay at z-50. Only accessible from the grouped filters active view.

Closes via backdrop tap or close button (rotated-plus SVG, same as DevTools close button).

---

## ReminderInfoOverlay - Centred Modal

ReminderInfoOverlay uses a different pattern from the slide-up overlays. It is a centred modal dialog, not a bottom sheet.

- 50% dark backdrop (`bg-black/50`) at z-[60].
- Centred panel at z-[60], 322px wide, 32px border radius, 40px vertical padding, 34px horizontal padding.
- Escape key closes the overlay.
- Focus is trapped in the panel on mount.
- Background scrolling is prevented.
- Only available from the active list view.

---

## Filter Pills - Responsive Visibility

### "Sometime" Button Behavior

The "Sometime" filter pill uses responsive visibility to manage space constraints on narrow viewports.

```tsx
<button
  className={`...
    ${filter === "sometime" ? "hidden min-[390px]:flex" : ""}
  `}
>
  <div className="...">
    {getCategoryLabel(filter)}
  </div>
</button>
```

**Breakpoint**: `390px`
- **Below 390px**: `hidden` - "Sometime" button is completely hidden
- **At/above 390px**: `flex` - "Sometime" button is visible

### Done/Deleted View Back Button

The back arrow button in the done/deleted view also uses responsive visibility:

```tsx
className="... hidden min-[390px]:flex ..."
```

Hidden below 390px to save space for the Done/Deleted/Clear all buttons.

---

## App Layout Structure

### Root Container

```tsx
<div className="... h-screen w-full overflow-hidden"
     style={{ backgroundColor: viewMode === "done-deleted" ? "#2B5DA0" : "#4784f8" }}>
```

**Key classes**:
- `h-screen`: Full viewport height
- `overflow-hidden`: Prevents scroll on root
- Background: `#4784f8` (list mode) or `#2B5DA0` (done/deleted mode)

### White Card Container

```tsx
<div className="bg-white ... w-full flex-1 min-h-[350px]">
  {/* Scrollable area */}
  <div className="... overflow-x-clip overflow-y-auto ...">
    {/* Content */}
  </div>
</div>
```

**Key Classes**:
- `flex-1`: Grows to fill available space
- `min-h-[350px]`: Ensures minimum usable height
- `overflow-y-auto`: Enables vertical scrolling when content overflows
- `overflow-x-clip`: Prevents horizontal scroll (safety measure)

---

## Animation Standards

All overlays use consistent motion values for entering/exiting.

### Slide-up Animation

```tsx
<motion.div
  initial={{ y: "100%" }}    // Start: Fully off-screen below
  animate={{ y: 0 }}          // End: Natural position
  exit={{ y: "100%" }}        // Exit: Slide back down off-screen
  transition={{ 
    duration: 0.25,           // 250ms duration
    ease: "easeInOut"         // Smooth acceleration/deceleration
  }}
>
```

### Backdrop Fade

```tsx
<motion.div
  initial={{ opacity: 0 }}    // Start: Transparent
  animate={{ opacity: 1 }}    // End: Opaque
  exit={{ opacity: 0 }}       // Exit: Fade out
  transition={{ duration: 0.25 }}
  className="fixed inset-0 bg-black/0 z-40"  // Note: bg-black/0 = transparent backdrop
  onClick={() => setIsOverlayOpen(false)}     // Click to close
/>
```

**Note**: Backdrop uses `bg-black/0` (fully transparent) - it's invisible but captures clicks outside overlay.

### Textarea Height - Viewport-Responsive

The reminder text input inside `NewReminderOverlay` adapts its height based on viewport size to prevent content overflow on constrained screens.

```tsx
const getTextareaHeight = () => {
  const THRESHOLD = 630;     // 60px above overlay position breakpoint (570px)
  const DEFAULT_HEIGHT = 80;  // Standard height
  const REDUCED_HEIGHT = 50;  // Compact height for short viewports
  
  return viewportHeight <= THRESHOLD ? REDUCED_HEIGHT : DEFAULT_HEIGHT;
};
```

**Key Details**:
- **Threshold**: `630px` — intentionally 60px above the overlay position breakpoint (570px) so the textarea shrinks before the overlay snaps upward
- **Animation**: Height change is animated via motion's `animate` prop (`<motion.textarea animate={{ height: getTextareaHeight() }}>`) with 0.3s easeInOut
- **State**: Uses the same `viewportHeight` state and resize listener as the overlay positioning logic

---

## Z-Index Layering

```
z-40:   Backdrop (click-outside-to-close area for slide-up overlays)
z-50:   Slide-up overlays (NewReminderOverlay, DevToolsOverlay, RepeatsOverlay, SettingsOverlay)
z-[60]: ReminderInfoOverlay backdrop and centred modal
```

All overlays and their backdrops must respect this hierarchy.

---

## Checklist for New Overlays

When creating a new content overlay:

### Width
- [ ] Outer container: `w-full` or `size-full`
- [ ] Outer container: `items-center` (to center content horizontally)
- [ ] Content wrapper: `w-full max-w-[768px]`
- [ ] Inner padding: `px-[20px]`
- [ ] Inner top padding: `pt-[26px]` (standard for all overlays)
- [ ] Background and rounded corners on outer container

### Height
- [ ] Decide: Fixed height (`h-[XXX]`) or dynamic positioning (like NewReminderOverlay)?
- [ ] If dynamic: Implement viewport tracking and `getOverlayTopPosition()` equivalent
- [ ] If dynamic: Define threshold constant and snap positions
- [ ] If dynamic: Place `top` in motion's `animate` prop for smooth transitions
- [ ] Set `bottom: 0` if overlay should stretch to bottom

### Animation
- [ ] Use `initial={{ y: "100%" }}`, `animate={{ y: 0 }}`, `exit={{ y: "100%" }}`
- [ ] If dynamic positioning: include `top` in `animate` prop (e.g., `animate={{ y: 0, top: getOverlayTopPosition() }}`)
- [ ] Set `transition={{ duration: 0.25, ease: "easeInOut" }}`
- [ ] Add backdrop with fade animation
- [ ] Backdrop: `z-40`, overlay: `z-50`

### Structure
- [ ] Use `AnimatePresence` wrapper in parent component
- [ ] Backdrop `onClick` handler to close overlay
- [ ] `fixed` positioning for overlay
- [ ] Export overlay as default function
- [ ] Follow naming convention: `[Name]Overlay.tsx`

### Accessibility
- [ ] Backdrop prevents interaction with content behind
- [ ] Escape key support (if applicable)
- [ ] Focus management (trap focus in overlay)
- [ ] ARIA labels for close buttons

---

## Common Pitfalls

### ❌ Don't: Apply max-width to motion wrapper
```tsx
// This breaks the full-width background pattern
<motion.div className="... max-w-[768px]">
  <MyOverlay /> {/* Background won't extend full width */}
</motion.div>
```

### ✅ Do: Apply max-width to content inside overlay
```tsx
<motion.div className="... w-full">
  <div className="bg-white ... size-full items-center"> {/* Full-width bg */}
    <div className="... max-w-[768px]"> {/* Constrained content */}
      {/* Content here */}
    </div>
  </div>
</motion.div>
```

### ❌ Don't: Hardcode positioning values without understanding logo position
```tsx
// Magic number with no clear meaning
style={{ top: '120px' }}
```

### ✅ Do: Calculate positioning based on layout measurements
```tsx
// Clear derivation from logo position
const DEFAULT_TOP = 121.653; // 20px + 50px + 35.653px + 16px
```

### ❌ Don't: Put dynamic `top` in `style` prop
```tsx
// Motion can't animate style prop changes — position jumps instantly
style={{ top: `${getOverlayTopPosition()}px`, bottom: 0 }}
```

### ✅ Do: Put dynamic `top` in motion's `animate` prop
```tsx
// Motion animates top changes smoothly when viewport crosses threshold
animate={{ y: 0, top: getOverlayTopPosition() }}
style={{ bottom: 0 }}
```

---

## Testing Scenarios

When implementing or modifying overlays, test these scenarios:

### Width Responsiveness
1. **Narrow (< 400px)**: Content should have 20px padding on each side
2. **Medium (400px - 768px)**: Content should grow with viewport, maintaining 20px padding
3. **Wide (> 768px)**: Content should stop at 768px, centered with background extending full width

### Height Responsiveness (Dynamic Overlays)
1. **Open on tall viewport (>570px)**: Should position 16px below logo
2. **Open on short viewport (≤570px)**: Should snap to 16px above logo
3. **Resize tall → short while open**: Should smoothly animate upward when crossing 570px threshold
4. **Resize short → tall while open**: Should smoothly animate downward when crossing 570px threshold
5. **Close and reopen**: Should re-evaluate position based on current viewport (no memory)

### Animation
1. **Open**: Should slide up from bottom over 250ms
2. **Close**: Should slide down to bottom over 250ms
3. **Backdrop fade**: Should fade in/out in sync with overlay
4. **Click backdrop**: Should close overlay

### Edge Cases
1. **Very short viewport (<400px)**: Overlay should not overflow or break layout
2. **Very tall viewport (>1000px)**: Overlay should maintain position relative to logo
3. **Rapid open/close**: Should not cause animation glitches
4. **Resize during animation**: Should not break positioning

---

## Reference