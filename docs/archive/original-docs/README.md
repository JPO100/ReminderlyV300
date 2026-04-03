# Reminderly - Mobile Reminders App Documentation

## Overview

Reminderly is a mobile-first reminders application built with React, TypeScript, and Tailwind CSS. The app is designed for iPhone 16 Pro (402px x 874px) but is fully responsive across all devices.

Do not add a shared ui component suite under src/app/components/ui. UI primitives must be added locally when needed.

The src/app/components/ui folder is platform-managed and protected in Figma Make and cannot be deleted in this environment. It is intentionally unused and must not be imported. In a normal git environment it can be removed with `rm -rf src/app/components/ui`.

## Key Features

- **Natural Language Capture (NLC)**: Regex-based date, time, and repeat extraction from free text
- **Filter system**: Two variants (standard and grouped) with category filters
- **Completion system**: Mark done with visual transitions, uncomplete from done view
- **Soft-delete system**: Delete reminders with visual transitions, undelete from done/deleted view
- **Done/deleted view**: Archive view with sub-filters (All, Done, Deleted) and 3-step clear-all
- **Recurring reminders**: Auto-rescheduling after completion
- **Text normalisation**: Relative date phrases replaced with absolute equivalents at save time
- **Render-time substitution**: "today"/"tomorrow" shown contextually in the list
- **Editing**: Edit existing reminders with NLC re-parsing
- **Overdue detection**: Visual treatment and sort pinning for past-due reminders
- **Settings overlay**: User-facing settings (subtitle toggle) accessible from grouped filters mode
- **Dev tools**: Triple-tap logo access to developer tools, self-checks, dummy reminders, NLC mode toggle, filter variant toggle, hide overdue toggle
- **Responsive design**: Mobile-first (iPhone 16 Pro target), adapts to all screen sizes
- **Persistence**: localStorage for reminders and settings

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (formerly Framer Motion)
- **State management**: React hooks (useState, useRef, useEffect, useCallback)
- **Persistence**: localStorage
- **Icons**: Custom SVG graphics

## Project Structure

```
/src
  /app
    App.tsx                    # Main app component (state, rendering, core logic)
    reminder-utils.ts          # Non-component exports: types, loadReminders, categoriseReminder, sortReminders, isOverdue, formatRepeatLabel
    /components
      /figma
        ImageWithFallback.tsx
      DevToolsOverlay.tsx      # DevTools overlay (triple-tap logo)
      ReminderInfoOverlay.tsx   # Reminder detail/edit/done/delete modal
      RepeatsOverlay.tsx       # Repeat configuration overlay
      SettingsOverlay.tsx      # Settings overlay (grouped filters only)
      /ui                      # Unused, protected (see DO_NOT_USE.md)
    /dev                       # DevTools: self-checks & debug tools
      check-system.ts          # Check runner framework
      nlc-parser-checks.ts
      nlc-interaction-checks.ts
      schedule-checks.ts
      reminder-checks.ts       # 77 checks
      done-deleted-checks.ts   # 9 checks
      completion-checks.ts     # 13 checks
      BASELINE.md
    /types
      reminder.ts              # RepeatRule, Schedule, ScheduleSources type definitions
    /utils
      nlc-parser.ts            # NLC token parser (pure, regex-based)
      nlc-interaction.ts       # NLC interaction logic (pure functions)
      normalise-text.ts        # Display text normalisation (pure function)
      render-text.ts           # Presentation-only today/tomorrow substitution
      schedule.ts              # Schedule equality, delta detection, date utilities
      dummy-generator.ts       # Dummy reminder data generator
  /imports
    NewReminderOverlay.tsx     # New reminder overlay component
    TimePicker.tsx             # Time picker component
    DevTools.tsx               # DevTools home page component
    DummyReminders.tsx         # Dummy reminders debug page
    LaterBtn.tsx               # Later/settings button component
    LaterBtn-146-39.tsx        # Later/settings button variant (used in grouped filters)
    svg-*.ts                   # SVG path data
  /styles
    fonts.css
    index.css
    tailwind.css
    theme.css

/docs
  README.md                    # Main documentation (this file)
  build-guide.md               # Development and build instructions
  calendar-module.md           # Calendar/date picker documentation
  colour-styles.md             # Canonical colour definitions
  component-hierarchy.md       # Visual component breakdown
  content-overlay-responsive.md # Overlay responsive pattern
  dev-tools.md                 # Developer tools system
  done-delete-system.md        # Done/delete/uncomplete transitions, sub-filters, clear-all
  done-reminders.md            # Done reminders: completion, visual states, animation, data behaviour
  editing-reminders.md         # Edit reminder flow
  filter-system.md             # Filter variants (standard vs grouped)
  new-reminder-overlay.md      # New reminder overlay documentation
  nlc.md                       # Natural Language Capture system
  reminder-logic.md            # Category, status, overdue, and sorting system
  responsive-design.md         # Breakpoints and responsive behaviour
  settings.md                  # Settings overlay and subtitle toggle
  sizing-spacing.md            # Spacing system documentation
```

## Related Documentation

- [Build Guide](./build-guide.md) - Development and build instructions
- [Component Hierarchy](./component-hierarchy.md) - Visual breakdown of all components
- [Calendar Module](./calendar-module.md) - Calendar/date picker documentation
- [Colour Styles](./colour-styles.md) - Canonical colour definitions
- [Content Overlay Responsive](./content-overlay-responsive.md) - Overlay responsive pattern
- [Dev Tools](./dev-tools.md) - Developer tools system
- [Done/Delete System](./done-delete-system.md) - Completion and deletion transitions, sub-filters, clear-all
- [Done Reminders](./done-reminders.md) - Done reminders: completion, visual states, animation, data behaviour
- [Editing Reminders](./editing-reminders.md) - Edit reminder flow
- [Filter System](./filter-system.md) - Filter variants (standard vs grouped)
- [New Reminder Overlay](./new-reminder-overlay.md) - New reminder overlay documentation
- [NLC](./nlc.md) - Natural Language Capture system
- [Reminder Logic](./reminder-logic.md) - Category, status, overdue, and sorting system
- [Responsive Design](./responsive-design.md) - Breakpoints and responsive behaviour
- [Settings](./settings.md) - Settings overlay and subtitle toggle
- [Sizing & Spacing](./sizing-spacing.md) - Detailed spacing system