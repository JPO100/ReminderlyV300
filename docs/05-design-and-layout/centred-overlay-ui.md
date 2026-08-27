# Centred overlay UI specification

## Overview

Reminderly has two distinct centred overlay patterns plus one dev-tools-only info variant. There is no shared modal wrapper component. Each overlay is built inline using the same CSS structure.

---

## 1. Overlay/backdrop (all centred overlays)

| Property | Value |
|---|---|
| Position | `fixed inset-0` |
| z-index | `z-[60]` (60) |
| Background | `bg-black/50` (black at 50% opacity, equivalent to `rgba(0, 0, 0, 0.5)`) |
| Click to dismiss | Yes. Backdrop div has `onClick` handler that closes the overlay |
| Pointer events | Enabled on backdrop (default). Disabled on the centering container via `pointer-events-none`, re-enabled on the modal card via `pointer-events-auto` |

Implementation: two sibling `div` elements at the same z-index.

```
div.fixed.inset-0.bg-black/50.z-[60]  ← backdrop (clickable)
div.fixed.inset-0.z-[60].flex.items-center.justify-center.pointer-events-none  ← centring wrapper
  div.pointer-events-auto  ← modal card
```

The centring container in App.tsx-hosted overlays also includes `px-[20px]` for safe horizontal margin on narrow viewports. The self-contained overlays (ReminderInfoOverlay, DeletedInfoOverlay, DevToolsInfoOverlay) omit this horizontal padding.

---

## 2. Modal container

Two variants exist:

### Pattern A: action modal (production user-facing)

Used by: ReminderInfoOverlay, DeletedInfoOverlay, saved list menu, template editor menu, and (inner card) InfoOverlay and ListInfoOverlay.

| Property | Value |
|---|---|
| Width | `340px` (inline style `{ width: 340 }`) |
| Max width | None on card itself. When wrapped by App.tsx, outer wrapper has `max-w-[400px]` |
| Height | Auto (content-driven) |
| Corner radius | `rounded-[32px]` (32px) |
| Background | `bg-white` (#FFFFFF) |
| Padding top | `35px` (`pt-[35px]`) |
| Padding bottom | `35px` (`pb-[35px]`) |
| Padding left | `32px` (`px-[32px]`) |
| Padding right | `32px` (`px-[32px]`) |
| Display | `flex` |
| Flex direction | `flex-col` (column) |
| Alignment | `items-center` |
| Gap | `25px` (`gap-[25px]`) standard. Variants: InfoOverlay uses `33px`, ListInfoOverlay uses `17px` |
| Position | `relative` |
| Outline | `none` |
| Pointer events | `pointer-events-auto` |
| Click propagation | `onClick={(e) => e.stopPropagation()}` |

### Pattern B: confirmation dialog (dev tools only)

Used by: NLC, onboarding, notifications, reminders, lists toggle confirmations.

| Property | Value |
|---|---|
| Width | `322px` (inline style `{ width: 322 }`) |
| Max width | None |
| Height | Auto (content-driven) |
| Corner radius | `rounded-[32px]` (32px) |
| Background | `bg-white` (#FFFFFF) |
| Padding top | `40px` (`py-[40px]`) |
| Padding bottom | `40px` (`py-[40px]`) |
| Padding left | `34px` (`px-[34px]`) |
| Padding right | `34px` (`px-[34px]`) |
| Display | `flex` |
| Flex direction | `flex-col` (column) |
| Alignment | `items-center` |
| Gap | `35px` (`gap-[35px]`) |
| Position | `relative` |
| Pointer events | `pointer-events-auto` |
| Click propagation | `onClick={(e) => e.stopPropagation()}` |

### Pattern C: info overlay (dev tools only)

Used by: DevToolsInfoOverlay.

Same as pattern A except gap is `40px` (`gap-[40px]`).

---

## 3. Text styling

### Modal title (all patterns)

| Property | Value |
|---|---|
| Font family | `'Lato:Bold', sans-serif` |
| Font size | `20px` (`text-[20px]`) |
| Font weight | `700` (inline style) |
| Line height | `normal` (`leading-[normal]`) |
| Colour | `#1C2C42` (`text-[#1C2C42]`) |
| Alignment | `text-center` |
| Width | Content-width, shrink-0 |
| Margins | None |
| Padding | None |
| Wrapping | `whitespace-pre-wrap`. InfoOverlay/ListInfoOverlay variant: `whitespace-nowrap` with `text-ellipsis overflow-hidden w-full` |
| Not italic | `not-italic` |

### Due line / status subtitle (ReminderInfoOverlay only)

| Property | Value |
|---|---|
| Font family | `'Lato:Bold', sans-serif` |
| Font size | `17px` (`text-[17px]`) |
| Font weight | `700` (inline style) |
| Line height | `normal` |
| Colour | `#1C2C42` (default) or `#FF0000` (overdue) |
| Alignment | `text-center` |
| Width | Full width container with `min-w-full` |
| Wrapping | `whitespace-nowrap` |

### Metadata lines (smart reminder progress, repeats — ReminderInfoOverlay)

| Property | Value |
|---|---|
| Font family | `'Lato:Bold', sans-serif` |
| Font size | `17px` |
| Font weight | `700` |
| Line height | `normal` |
| Colour | `#BABABA` (`text-[#bababa]`) |
| Alignment | `text-center` |
| Wrapping | `whitespace-pre-wrap` |

### Confirmation body text (dev tools confirmation dialogs)

| Property | Value |
|---|---|
| Font family | `'Lato:SemiBold', sans-serif` |
| Font size | `17px` |
| Font weight | Inherited from SemiBold face (600) |
| Line height | `normal` |
| Colour | `#939393` (`text-[#939393]`) |
| Alignment | `text-center` |
| Wrapping | `whitespace-pre-wrap` |

### DevToolsInfoOverlay body text

| Property | Value |
|---|---|
| Font family | `'Lato:Bold', sans-serif` |
| Font size | `17px` |
| Font weight | `700` |
| Line height | `24px` (inline style) |
| Colour | `#BABABA` (`text-[#BABABA]`) |
| Alignment | `text-center` |
| Wrapping | `whitespace-pre-wrap` |

### Button labels (all buttons)

| Property | Value |
|---|---|
| Font family | `'Lato:Bold', sans-serif` |
| Font size | `17px` |
| Font weight | `700` (inherited from Lato:Bold face) |
| Line height | `normal` |
| Colour | `#FFFFFF` (white) |
| Alignment | Centred (via flex) |
| Wrapping | `whitespace-nowrap` |

---

## 4. Icons (inside centred overlays)

### Smart reminder icon (bell)

| Property | Value |
|---|---|
| SVG viewBox | `0 0 19.5002 21.5002` |
| Container size | `w-[19px] h-[21px]` |
| Fill colour | `#BABABA` |
| Positioning | Flex centred within row, `items-center justify-center` |
| Spacing from text | `8px` (parent has `gap-[8px]`) |

### Repeats icon (clock)

| Property | Value |
|---|---|
| SVG viewBox | `0 0 15 15` |
| Container size | `w-[21px] h-[21px]` |
| Display size | `width="21" height="21"` |
| Fill colour | `#BABABA` |
| Stroke | `#BABABA`, strokeWidth `0.1` |
| Positioning | Flex centred within row |
| Spacing from text | `8px` (parent has `gap-[8px]`) |

### Copy feedback icon (template/list creation confirmation)

| Property | Value |
|---|---|
| SVG size | `width="20" height="20"` |
| Fill colour | `white` |
| Gap from text | `12px` (`gap-[12px]`) |
| Alignment | Centred inline with text |

---

## 5. Button layout

### Stacked full-width buttons (action modals — pattern A)

| Property | Value |
|---|---|
| Button width | `w-full` (100% of modal content width) |
| Button height | `50px` (`h-[50px]`) |
| Border radius | `100px` (`rounded-[100px]`) — fully rounded pill |
| Layout direction | Column (`flex-col`) |
| Gap between buttons | `30px` (`gap-[30px]`) |
| Alignment | `items-start` (container), button content centred |
| Container margin top | `7px` (`mt-[7px]`) from last content section. ListInfoOverlay uses `mt-[12px]` |
| Internal padding | `px-[18px] py-[15px]` |
| Button border | `border-none` (on some variants) |

#### Primary button

| Property | Value |
|---|---|
| Background | `#4784F8` (`bg-[#4784f8]`) |
| Text colour | White |

#### Destructive/secondary button (delete)

| Property | Value |
|---|---|
| Background | `#939393` (`bg-[#939393]`) |
| Text colour | White |

#### Disabled button

| Property | Value |
|---|---|
| Background | `#D9D9D9` (`bg-[#d9d9d9]`) |
| Cursor | Default (no pointer) |

### Side-by-side buttons (confirmation dialogs — pattern B)

| Property | Value |
|---|---|
| Layout direction | Row (`flex`) |
| Gap between buttons | `16px` (`gap-[16px]`) |
| Justify | `justify-between` |
| Width | Full container width |
| Button width | Auto (content-sized) |
| Button height | `50px` |
| Border radius | `100px` |
| Button padding | `px-[16px]` |

#### Cancel button

| Property | Value |
|---|---|
| Background | `#BABABA` (inline style) |
| Text colour | White |

#### Confirm button

| Property | Value |
|---|---|
| Background | `#4784F8` (inline style) |
| Text colour | White |

---

## 6. Element spacing

### Pattern A (action modal, standard gap-[25px])

| Between | Spacing |
|---|---|
| Modal top edge → title | `35px` (padding-top) |
| Title → due line/subtitle | `25px` (gap) |
| Due line → metadata line(s) | `25px` (gap) |
| Last content → button container | `25px` (gap) + `7px` (mt-[7px]) = `32px` effective |
| Between buttons | `30px` (gap-[30px]) |
| Last button → modal bottom edge | `35px` (padding-bottom) |
| Left/right edge → content | `32px` (padding-x) |

### Pattern A variant — InfoOverlay (gap-[33px])

| Between | Spacing |
|---|---|
| Modal top edge → title | `35px` |
| Title → toggle/settings section | `33px` (gap) |
| Settings section → buttons | `33px` (gap) |
| Between buttons | `30px` |
| Last button → bottom edge | `35px` |
| Left/right edge → content | `32px` |

### Pattern A variant — ListInfoOverlay (gap-[17px])

| Between | Spacing |
|---|---|
| Modal top edge → title | `35px` |
| Title → smart reminder section | `17px` (gap) + `10px` (mt-[10px]) = `27px` |
| Smart reminder → buttons | `17px` (gap) |
| Button section top margin | `12px` (mt-[12px]) |
| Between buttons | `30px` |
| Last button → bottom edge | `35px` |
| Left/right edge → content | `32px` |

### Pattern B (confirmation dialog)

| Between | Spacing |
|---|---|
| Modal top edge → title | `40px` (padding-top) |
| Title → body text | `35px` (gap) |
| Body text → button row | `35px` (gap) |
| Cancel button ↔ confirm button | `16px` |
| Last element → modal bottom edge | `40px` (padding-bottom) |
| Left/right edge → content | `34px` |

### Pattern C (info overlay, dev tools)

| Between | Spacing |
|---|---|
| Modal top edge → header | `35px` |
| Header → body text | `40px` (gap) |
| Body text → close button | `40px` (gap) |
| Close button → bottom edge | `35px` |
| Left/right edge → content | `32px` |

---

## 7. Animation behaviour

No entry/exit animation is used on the centred overlay modals themselves. They appear and disappear instantly (no framer-motion, no CSS transition on the container).

The only transitions present are within button content:
- Template "use as list" button text: opacity fade `150ms` / `250ms` ease
- Template button background: `background-color 150ms ease`
- Smart reminder due date highlight: `color 300ms` transition

Background scroll is locked on mount via `document.body.style.overflow = 'hidden'` (ReminderInfoOverlay only).

---

## 8. Implementation locations

| Overlay | File | Component | Lines |
|---|---|---|---|
| ReminderInfoOverlay | `src/app/components/ReminderInfoOverlay.tsx` | `ReminderInfoOverlay` | 70-266 |
| DeletedInfoOverlay | `src/imports/deleted-info-overlay.tsx` | `DeletedInfoOverlay` | 9-50 |
| InfoOverlay (list settings) | `src/imports/InfoOverlay.tsx` | `InfoOverlay` | 240-327 |
| InfoOverlay wrapper | `src/app/App.tsx` | Inline | ~5129-5163 |
| ListInfoOverlay | `src/imports/list-info-overlay.tsx` | `ListInfoOverlay` | 204-295 |
| ListInfoOverlay wrapper | `src/app/App.tsx` | Inline | ~5165-5241 |
| Saved list menu | `src/app/App.tsx` | Inline | 5243-5342 |
| Template editor menu | `src/app/App.tsx` | Inline | 5344-5433 |
| DevToolsInfoOverlay | `src/app/components/DevToolsOverlay.tsx` | `DevToolsInfoOverlay` | 92-116 |
| NLC toggle confirm | `src/app/components/DevToolsOverlay.tsx` | Inline | 360-418 |
| Onboarding toggle confirm | `src/app/components/DevToolsOverlay.tsx` | Inline | 437-496 |
| Notifications toggle confirm | `src/app/components/DevToolsOverlay.tsx` | Inline | 515-573 |
| Reminders toggle confirm | `src/app/components/DevToolsOverlay.tsx` | Inline | 759-817 |
| Lists toggle confirm | `src/app/components/DevToolsOverlay.tsx` | Inline | 842-900 |

---

## 9. Inconsistencies

| Area | Detail |
|---|---|
| Modal width | Pattern A uses `340px`, pattern B uses `322px` |
| Padding | Pattern A: `35px` top/bottom, `32px` sides. Pattern B: `40px` top/bottom, `34px` sides |
| Gap | Pattern A standard: `25px`. InfoOverlay: `33px`. ListInfoOverlay: `17px`. Pattern B: `35px`. Pattern C: `40px` |
| Button section margin-top | ReminderInfoOverlay/DeletedInfoOverlay: `mt-[7px]`. ListInfoOverlay: `mt-[12px]`. InfoOverlay/saved list menu/template editor menu: no extra margin |
| Centering container horizontal padding | App.tsx wrappers include `px-[20px]`. Self-contained overlays omit it |
| Body text font | Pattern B uses `Lato:SemiBold` at `#939393`. Pattern C uses `Lato:Bold` at `#BABABA` |

---

## 10. Toggle rows inside centred overlays

### Toggle row container

The toggle row is the parent div that wraps icon + label + toggle in a horizontal line.

| Property | Value |
|---|---|
| Width | `w-full` (100% of modal content area) |
| Display | `flex` (row, default direction) |
| Flex direction | Row (default, not explicitly set) |
| Alignment (cross-axis) | `items-start` |
| Justification (main-axis) | `justify-center` |
| Padding | None |
| Margin | None |
| Gap | `16px` (`gap-[16px]`) between icon, label block, and toggle |
| Border/radius | None |
| Background | None (transparent) |
| Cursor | `cursor-pointer` (entire row is clickable) |
| Other | `content-stretch relative shrink-0` |

Implementation reference (InfoOverlay.tsx line 86, line 109, line 124; list-info-overlay.tsx line 54):
```
className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full cursor-pointer"
```

### Toggle rows wrapper

Multiple toggle rows are grouped in a container with vertical gap:

| Property | Value |
|---|---|
| Display | `flex flex-col` |
| Gap | `24px` (`gap-[24px]`) between rows |
| Width | `w-full` |
| Alignment | `items-start` |
| Other | `content-stretch relative shrink-0` |

Implementation reference (InfoOverlay.tsx line 83, line 108; list-info-overlay.tsx line 53):
```
className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full"
```

### Toggle label block

The label block sits between the icon and the toggle, taking remaining space via `flex-[1_0_0]`.

Label container:

| Property | Value |
|---|---|
| Display | `flex flex-col` |
| Flex | `flex-[1_0_0]` (fills remaining horizontal space) |
| Font family | `'Lato:Bold', sans-serif` (set on container, inherited) |
| Gap | `9px` (`gap-[9px]`) between title and subtitle |
| Alignment | `items-start justify-start` |
| Line height | `leading-[0]` (container-level reset, overridden per text element) |
| Min dimensions | `min-h-px min-w-px` |
| Not italic | `not-italic` |
| Position | `relative` |

Implementation reference (InfoOverlay.tsx line 8, 21, 34; list-info-overlay.tsx line 8):
```
className="content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[9px]
  items-start justify-start leading-[0] min-h-px min-w-px not-italic relative
  ${active ? '' : 'text-[#d9d9d9]'}"
```

Title text:

| Property | Value |
|---|---|
| Font family | Inherited: `'Lato:Bold', sans-serif` |
| Font size | `17px` (`text-[17px]`) |
| Font weight | `700` (inline style) |
| Line height | `17px` (`leading-[17px]`) |
| Colour (active/on) | `#1C2C42` (`text-[#1C2C42]`) |
| Colour (inactive/off) | `#D9D9D9` (inherited from parent `text-[#d9d9d9]`) |
| Alignment | Left (default, `justify-start`) |
| Wrapping | `whitespace-nowrap` |
| Truncation | `overflow-hidden text-ellipsis` on both container and `<p>` |
| Width | `w-full` |
| Margin/padding | None |

Implementation reference (InfoOverlay.tsx line 9-10):
```
<div className="flex flex-col justify-start overflow-hidden relative shrink-0 text-[17px]
  text-ellipsis w-full whitespace-nowrap ${active ? 'text-[#1C2C42]' : ''}">
  <p className="leading-[17px] overflow-hidden text-ellipsis" style={{ fontWeight: 700 }}>
    ...title...
  </p>
</div>
```

Subtitle text:

| Property | Value |
|---|---|
| Font family | Inherited: `'Lato:Bold', sans-serif` |
| Font size | `14px` (`text-[14px]`) |
| Font weight | `700` (inline style) |
| Line height | `14px` (`leading-[14px]`) |
| Colour (active/on) | `#BABABA` (`text-[#bababa]`) |
| Colour (inactive/off) | `#D9D9D9` (inherited from parent) |
| Alignment | Left (default) |
| Wrapping | Default (wraps naturally) |
| Width | `w-full` |
| Margin/padding | None |
| Spacing from title | `9px` (from parent `gap-[9px]`) |

Implementation reference (InfoOverlay.tsx line 12-13):
```
<div className="flex flex-col justify-start relative shrink-0 text-[14px] w-full
  ${active ? 'text-[#bababa]' : ''}">
  <p className="leading-[14px]" style={{ fontWeight: 700 }}>...subtitle...</p>
</div>
```

Smart reminder subtitle has additional dynamic colour behaviour:
- When highlight active: colour transitions to `#1C2C42`
- Fade-out transition: `color 300ms` (applied via inline style when `animateFadeOut` is true)

### Toggle row spacing

| Between | Value |
|---|---|
| Left edge of modal content to icon | `0px` (icon sits at left edge of content area; modal padding of 32px provides the margin from modal edge) |
| Icon to text block | `16px` (from row `gap-[16px]`) |
| Text block to toggle | `16px` (from row `gap-[16px]`) |
| Toggle to right edge of modal content | `0px` (toggle sits at right edge of content area; modal padding of 32px provides the margin) |
| Between multiple toggle rows | `24px` (from wrapper `gap-[24px]`) |
| Title to subtitle within label | `9px` (from label container `gap-[9px]`) |
| Toggle rows section to modal title (InfoOverlay) | `33px` (from modal `gap-[33px]`) |
| Toggle rows section to modal title (ListInfoOverlay) | `17px` gap + `10px` margin-top = `27px` effective |
| Toggle rows section to buttons section (InfoOverlay) | `33px` (from modal gap) |
| Toggle rows section to buttons section (ListInfoOverlay) | `17px` (from modal gap) |

No responsive behaviour. Fixed dimensions throughout.

### Toggle control

The `ToggleButton` component is identical in both files.

Dimensions and shape:

| Property | Value |
|---|---|
| Overall width | `56px` (`w-[56px]`) |
| Overall height | `30px` (`h-[30px]`) |
| Border radius | `37.5px` (`rounded-[37.5px]`) — fully rounded pill |
| Padding/inset | `3.75px` (`p-[3.75px]`) — uniform on all sides |
| Border | None |
| Shadow | None |
| Element type | `<button>` |
| Self alignment | `self-start` |
| Shrink | `shrink-0` |

Track colours:

| State | Background |
|---|---|
| Off | `#D9D9D9` (`bg-[#d9d9d9]`) |
| On | `#4784F8` (`bg-[#4784F8]`) |

Knob:

| Property | Value |
|---|---|
| Size | `22.5px x 22.5px` (`size-[22.5px]`) |
| Shape | Circle (SVG `<circle>` with `r="11.25"`) |
| Colour | White (`fill="var(--fill-0, white)"`) |
| Implementation | SVG-based. A `<div>` container holds an `<svg>` with a single `<circle>` element |
| SVG viewBox | `0 0 22.5 22.5` |
| SVG positioning | `absolute block size-full` within the knob container |

Knob positioning mechanism:

| Property | Value |
|---|---|
| Mechanism | Flexbox `justify-end` vs default (justify-start) |
| Container display | `flex` with `items-center` |
| Off position | Default flex start (knob at left, 3.75px from left edge) |
| On position | `justify-end` (knob at right, 3.75px from right edge) |
| Transition | None. No `transition` class or inline style. State change is instant |

Interaction handling:

| Property | Value |
|---|---|
| onClick | Calls `event.stopPropagation()` then invokes the toggle callback |
| Cursor | `cursor-pointer` |

Implementation reference (InfoOverlay.tsx lines 45-54; list-info-overlay.tsx lines 19-28):
```jsx
<button className={`${active ? 'bg-[#4784F8] justify-end' : 'bg-[#d9d9d9]'}
  content-stretch cursor-pointer flex h-[30px] items-center self-start
  p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px]`}
  onClick={(event) => { event.stopPropagation(); onClick(); }}>
  <div className="relative shrink-0 size-[22.5px]">
    <svg className="absolute block size-full" fill="none"
      preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
      <circle cx="11.25" cy="11.25" fill="var(--fill-0, white)" r="11.25" />
    </svg>
  </div>
</button>
```

### Toggle interaction states

| State | Track colour | Knob position | Knob colour | Text colour (title) | Text colour (subtitle) | Icon colour |
|---|---|---|---|---|---|---|
| On (active) | `#4784F8` | Right (`justify-end`) | White | `#1C2C42` | `#BABABA` | `#1C2C42` |
| Off (inactive) | `#D9D9D9` | Left (default) | White | `#D9D9D9` | `#D9D9D9` | `#D9D9D9` |

No hover, pressed, focus, or disabled states are implemented on the centred overlay toggle. There is no `transition` on the toggle track colour or knob position — state changes are instant.

The entire row is clickable (row div has `cursor-pointer` and an `onClick` handler), but the toggle button's `onClick` calls `event.stopPropagation()` to prevent double-firing.

There is no disabled state for the centred overlay toggle. The dev tools ToggleRow component has a disabled state but that is a separate implementation not used in centred overlays.

### Row icon (left side)

Each toggle row has an icon on the left side. These are SVG icons that change colour based on active state.

| Property | Value |
|---|---|
| Active colour | `#1C2C42` |
| Inactive colour | `#D9D9D9` |
| Positioning | `relative self-start shrink-0` |
| Top offset | `top-[1px]` (smart reminder icon only, for optical alignment) |

Icon sizes vary per row:

| Icon | Width | Height | viewBox |
|---|---|---|---|
| Smart reminder (bell) | `19.5px` | `21.5px` | `0 0 19.5002 21.5002` |
| Insertion order | `20.83px` | `20.824px` | `0 0 20.8301 20.8242` |
| Alphabetical | `22.387px` | `20.814px` | `0 0 22.3867 20.8145` |

### Toggle implementation references

| Component | File | Lines | Role | Canonical? |
|---|---|---|---|---|
| `ToggleButton` | `src/imports/InfoOverlay.tsx` | 45-54 | Toggle control | Yes (canonical) |
| `ToggleButton` | `src/imports/list-info-overlay.tsx` | 19-28 | Toggle control | Yes (identical copy) |
| `SmartRemindersLabel` | `src/imports/InfoOverlay.tsx` | 6-16 | Label with dynamic subtitle | Yes |
| `SmartRemindersLabel` | `src/imports/list-info-overlay.tsx` | 6-16 | Label with dynamic subtitle | Yes (identical copy) |
| `AlphabeticalLabel` | `src/imports/InfoOverlay.tsx` | 19-29 | Static label variant | Yes |
| `InsertionLabel` | `src/imports/InfoOverlay.tsx` | 32-42 | Static label variant | Yes |
| `Frame3` (toggle rows wrapper) | `src/imports/InfoOverlay.tsx` | 57-142 | 3-row layout (smart + 2 sort) | Yes |
| `Frame3` (toggle rows wrapper) | `src/imports/list-info-overlay.tsx` | 31-74 | 1-row layout (smart only) | Yes (subset variant) |

### Toggle inconsistencies

The centred overlay toggle implementation is fully consistent across both files. The only difference is that ListInfoOverlay omits the sort-order rows (alphabetical, insertion) since those are not relevant to the list info context. The toggle control and label components are identical.

---

## 11. Recommended canonical pattern

Based on frequency of use and production visibility, the canonical pattern is pattern A (action modal) with the standard `gap-[25px]` variant. This is the most common user-facing implementation.

If confirmation dialogs are needed, pattern B provides a tested reference, but pattern A values should be preferred for consistency unless there is a specific need for the narrower confirmation dialog.
