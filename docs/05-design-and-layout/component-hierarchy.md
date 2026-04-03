# Component Hierarchy

Content from `/docs/component-hierarchy.md`.

## Visual Component Breakdown

Comprehensive component hierarchy diagram showing all visual components, their relationships, and file locations.

See original `/docs/component-hierarchy.md` for full visual breakdown.

## Key Component Groups

### Core App
- App.tsx (root component)
- Header (inline)
- Active list view
- Done/deleted view
- New reminder button

### Overlays
- NewReminderOverlay
- ReminderInfoOverlay
- RepeatsOverlay
- SettingsOverlay
- TutorialOverlay
- DevToolsOverlay

### Onboarding
- TutorialOnboardingContent (controller)
- OnboardingPage[1-8]Content (individual pages)

### Imported Components
- DevTools (home page)
- DummyReminders
- TimePicker
- LaterBtn / LaterBtn-146-39

### Protected
- /ui folder (intentionally unused, platform-managed)

## Component Locations

See [Architecture](../../00-overview/architecture.md) for complete file structure.

## Related Documentation

- [Architecture](../../00-overview/architecture.md) - System architecture and file structure
- [Active List](../../01-core-surfaces/active-list.md) - Main list component
- [All overlay documentation](../../01-core-surfaces/) - Individual overlay details

### Lists

* ListsTab
* ListRow
* ListsOverlay