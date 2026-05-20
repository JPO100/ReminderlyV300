# Component Hierarchy

## Application Structure

**Layout model: fixed 3-panel viewport layout**
- **Header**: fixed to top of viewport (never scrolls off)
- **White card container**: flexible middle section (expands/contracts to fill space)
- **New reminder button**: fixed to bottom of viewport (hidden in done/deleted view)

```
App Container
  (background: #4784f8 in list mode, #214677 in done-deleted mode)
  (full screen height, flex column, overflow hidden)
  onPointerDownCapture handler for clear-all outside-click cancellation

  App Header Container
    (shrink-0, 20px padding all sides, full width)

    Blue Container
      (max-w 768px, centered, 20px gap)

      Logo Container
        (centered, 50px top padding, 20px bottom padding)

        Reminderly SVG Logo (209.653px x 35.653px)
          - List mode: white text + white tick circle
          - Done/deleted mode: white text + white-filled tick with #214677 checkmark

        Tick click area (left 0-22%): toggles done/deleted view
        Text click area (left 25%-100%): dev tools triple-tap counter

      Filters Menu (full width)
        Varies by view mode and filter variant:

        LIST MODE - STANDARD VARIANT:
          "Today" button
          "This week" button
          "Later" button
          "Sometime" button (hidden below 390px)

        LIST MODE - GROUPED VARIANT:
          Left group:
            "Today" button
            "This week" button
            "Later" button (maps to "other" category)
          Right:
            Settings button (LaterBtn component, opens SettingsOverlay)

        DONE/DELETED MODE:
          Left group:
            Back arrow button (hidden below 390px)
            "Done" sub-filter button
            "Deleted" sub-filter button
          Right:
            "Clear all" button (3-step: Clear all / Clear all? / Cleared!)

  White Card Container
    (white background, 20px horizontal padding, 30px top padding, 32px gap)
    (rounded top corners 20px, min-height 350px, flex-1)

    Scrollable List Area
      (max-w 768px, rounded 10px, overflow-y auto, overflow-x clip)

      LIST MODE - Reminder Items:
        AnimatePresence key={viewMode-activeFilter}
          motion.div per reminder (layout, exit opacity 0)

            Row layout (flex, gap 22px between rows)
              Circle checkbox (25px, clickable - mark as done)
                Normal: category-coloured outline
                Pending done: filled #214677 with white tick
                Pending delete: filled #939393 with white tick

              Text column (flex column, gap 4px when subtitles shown)
                Title line (17px, bold, Lato)
                Subtitle line (13.5px, 600 weight, Lato) - conditional on showSubtitles
                  Content: repeat label, or date/time, or "No date / time set"
                When subtitles hidden: minHeight 38px, items-center alignment

              Status icon (25px, clickable - opens ReminderInfoOverlay)
                Repeats icon (if repeatRule exists)
                Schedule-set icon (if scheduled)
                Schedule-unset icon (if sometime)

      LIST MODE - Empty State:
        Per-filter empty message in #CCCCCC, 17px Lato, centered
        Delayed appearance when last item removed (emptyPlaceholderDelayRef)

      LIST MODE - ReminderInfoOverlay:
        Centred modal (z-60, 50% dark backdrop)
        Shows: reminder text, due line, repeats line
        Buttons: Mark as done, Edit, Delete
        Only available from active list view

      DONE/DELETED MODE - Completed/Deleted Items:
        AnimatePresence key={viewMode-activeFilter-doneDeletedFilter}
          motion.div per item (layout, exit opacity 0)

            Row layout (same structure as active items)
              Circle checkbox (clickable - uncomplete/undelete)
                Done: filled #214677 with white tick
                Deleted: filled #939393 with white tick
                Pending restore: category-coloured outline

              Text column (same structure, with line-through when not pending restore)
                Done text colour: #214677
                Deleted text colour: #939393
                Pending restore: #214677 or overdue red

              Status icon (not clickable in done/deleted view)

      DONE/DELETED MODE - Empty State:
        Per-sub-filter message (see done-delete-system.md)

    New Reminder Button (hidden in done/deleted mode)
      (blue #4784f8, max-w 768px, full width)
      (height: clamp(40px, calc(20vh - 73.6px), 60px))
      (rounded pill, 30px horizontal padding)
      Plus icon (15px) + "New reminder" text (20px, bold, white)

  OVERLAYS (all use AnimatePresence + motion slide-up):

    NewReminderOverlay (z-50, transparent backdrop z-40)
    DevToolsOverlay (z-50, no-backdrop z-40)
    RepeatsOverlay (z-50, transparent backdrop z-40)
    SettingsOverlay (z-50, transparent backdrop z-40)
    ReminderInfoOverlay (z-60, 50% dark backdrop z-60) - inline, not slide-up
```

## Component Interactions

### Filter buttons
- Click active filter: reset to "all" (visual toggle)
- Click inactive filter: set as active
- Standard variant: 4 pills, space-between
- Grouped variant: 3 pills + settings button

### Reminder items (active list)
- Click circle checkbox: mark as done (350ms visual transition, then completedAt set)
- Click status icon: opens ReminderInfoOverlay for detail, edit, or delete
- Insert highlight: category colour for title and icon, fades after 1000ms

### New reminder button
- Opens the new reminder overlay (slide-up bottom sheet)
- Hidden when in done/deleted view
