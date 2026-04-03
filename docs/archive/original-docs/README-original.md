# Original Documentation Files

This directory contains the original root-level documentation files that existed before the 2026-03-11 restructure.

These files have been superseded by the new organized documentation structure under:
- `/docs/00-overview/`
- `/docs/01-core-surfaces/`
- `/docs/02-reminder-behaviour/`
- `/docs/03-natural-language-and-scheduling/`
- `/docs/04-settings-onboarding-and-premium/`
- `/docs/05-design-and-layout/`
- `/docs/06-quality-and-dev/`

## Migration Note

The original files should be moved here manually using:

```bash
# Move original docs to archive (run from project root)
mv /docs/README.md /docs/archive/original-docs/
mv /docs/build-guide.md /docs/archive/original-docs/
mv /docs/calendar-module.md /docs/archive/original-docs/
mv /docs/colour-styles.md /docs/archive/original-docs/
mv /docs/component-hierarchy.md /docs/archive/original-docs/
mv /docs/content-overlay-responsive.md /docs/archive/original-docs/
mv /docs/dev-tools.md /docs/archive/original-docs/
mv /docs/done-delete-system.md /docs/archive/original-docs/
mv /docs/done-reminders.md /docs/archive/original-docs/
mv /docs/editing-reminders.md /docs/archive/original-docs/
mv /docs/filter-system.md /docs/archive/original-docs/
mv /docs/new-reminder-overlay.md /docs/archive/original-docs/
mv /docs/nlc.md /docs/archive/original-docs/
mv /docs/reminder-logic.md /docs/archive/original-docs/
mv /docs/responsive-design.md /docs/archive/original-docs/
mv /docs/settings.md /docs/archive/original-docs/
mv /docs/sizing-spacing.md /docs/archive/original-docs/

# Move notes to archive
mv /docs/notes/* /docs/archive/notes/
rmdir /docs/notes
```

## Files to Archive

### Root Level Documentation (17 files)
1. README.md
2. build-guide.md
3. calendar-module.md
4. colour-styles.md
5. component-hierarchy.md
6. content-overlay-responsive.md
7. dev-tools.md
8. done-delete-system.md
9. done-reminders.md
10. editing-reminders.md
11. filter-system.md
12. new-reminder-overlay.md
13. nlc.md
14. reminder-logic.md
15. responsive-design.md
16. settings.md
17. sizing-spacing.md

### Notes Directory (41 files)
All files from `/docs/notes/` should be moved to `/docs/archive/notes/`.

See migration map document for complete file mappings.
