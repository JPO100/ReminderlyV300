# Documentation Restructure Migration Map

**Date**: 2026-03-11
**Task**: Comprehensive documentation audit and reorganization

## Overview

This document provides a complete mapping of documentation files from their original locations to their new canonical locations in the restructured documentation hierarchy.

## New Documentation Structure

```
/docs/
├── 00-overview/
│   ├── README.md (new - documentation index)
│   ├── product-overview.md (new)
│   ├── architecture.md (new)
│   └── data-model-and-persistence.md (new)
├── 01-core-surfaces/
│   ├── active-list.md (new)
│   ├── done-deleted-archive.md (consolidated from done-delete-system.md + done-reminders.md)
│   ├── new-reminder-overlay.md (consolidated from new-reminder-overlay.md)
│   ├── reminder-info-overlay.md (new)
│   ├── repeats-overlay.md (new)
│   ├── settings-overlay.md (from settings.md)
│   ├── tutorial-overlay.md (new)
│   └── dev-tools-overlay.md (from dev-tools.md)
├── 02-reminder-behaviour/
│   ├── reminder-lifecycle.md (consolidated from done-delete-system.md + done-reminders.md + editing-reminders.md)
│   ├── filters-and-sorting.md (consolidated from filter-system.md + reminder-logic.md)
│   ├── overdue-and-status.md (from reminder-logic.md)
│   └── empty-states-and-transitions.md (new)
├── 03-natural-language-and-scheduling/
│   ├── nlc.md (from nlc.md)
│   ├── text-normalisation-and-rendering.md (new)
│   ├── scheduling.md (new)
│   ├── repeats.md (new)
│   └── calendar-and-time-picker.md (from calendar-module.md)
├── 04-settings-onboarding-and-premium/
│   ├── settings.md (reference to 01-core-surfaces/settings-overlay.md)
│   ├── onboarding-and-tutorial.md (new)
│   └── premium-ui.md (new)
├── 05-design-and-layout/
│   ├── responsive-layout.md (from responsive-design.md)
│   ├── content-overlay-responsive.md (from content-overlay-responsive.md)
│   ├── component-hierarchy.md (from component-hierarchy.md)
│   ├── colour-styles.md (from colour-styles.md)
│   └── sizing-spacing.md (from sizing-spacing.md)
├── 06-quality-and-dev/
│   ├── build-guide.md (from build-guide.md)
│   ├── self-check-system.md (new)
│   ├── tests-and-baselines.md (new)
│   └── dev-tools.md (reference to 01-core-surfaces/dev-tools-overlay.md)
└── archive/
    ├── original-docs/ (for deprecated root-level docs)
    └── notes/ (for historical planning/investigative docs)
```

## File Migrations

### Created (New Canonical Documentation)

| New File | Purpose |
|----------|---------|
| `/docs/00-overview/README.md` | Documentation index and navigation |
| `/docs/00-overview/product-overview.md` | Product purpose, features, tech stack |
| `/docs/00-overview/architecture.md` | System architecture, component hierarchy, file structure |
| `/docs/00-overview/data-model-and-persistence.md` | Reminder schema, persistence, data invariants |
| `/docs/01-core-surfaces/active-list.md` | Active reminder list view |
| `/docs/01-core-surfaces/done-deleted-archive.md` | Archive view for completed and deleted reminders |
| `/docs/01-core-surfaces/reminder-info-overlay.md` | Reminder detail and action overlay |
| `/docs/01-core-surfaces/repeats-overlay.md` | Repeat configuration interface |
| `/docs/01-core-surfaces/tutorial-overlay.md` | Onboarding tutorial system |
| `/docs/02-reminder-behaviour/empty-states-and-transitions.md` | Empty states and visual transitions |
| `/docs/03-natural-language-and-scheduling/text-normalisation-and-rendering.md` | Text processing and display |
| `/docs/03-natural-language-and-scheduling/scheduling.md` | Date/time scheduling logic |
| `/docs/03-natural-language-and-scheduling/repeats.md` | Repeat auto-rescheduling |
| `/docs/04-settings-onboarding-and-premium/settings.md` | Settings system reference |
| `/docs/04-settings-onboarding-and-premium/onboarding-and-tutorial.md` | Tutorial flow documentation |
| `/docs/04-settings-onboarding-and-premium/premium-ui.md` | Premium feature display |
| `/docs/06-quality-and-dev/self-check-system.md` | Automated test suite |
| `/docs/06-quality-and-dev/tests-and-baselines.md` | Test coverage and baselines |

### Consolidated (Content Merged from Multiple Sources)

| New File | Source Files | Notes |
|----------|--------------|-------|
| `/docs/01-core-surfaces/done-deleted-archive.md` | `done-delete-system.md` + `done-reminders.md` | Combined archive view and completion behaviour |
| `/docs/01-core-surfaces/new-reminder-overlay.md` | `new-reminder-overlay.md` | Consolidated and enhanced |
| `/docs/01-core-surfaces/settings-overlay.md` | `settings.md` | Enhanced with premium UI details |
| `/docs/01-core-surfaces/dev-tools-overlay.md` | `dev-tools.md` | Consolidated dev tools documentation |
| `/docs/02-reminder-behaviour/reminder-lifecycle.md` | `done-delete-system.md` + `done-reminders.md` + `editing-reminders.md` | Complete state transition documentation |
| `/docs/02-reminder-behaviour/filters-and-sorting.md` | `filter-system.md` + `reminder-logic.md` | Combined filter and sort logic |
| `/docs/02-reminder-behaviour/overdue-and-status.md` | `reminder-logic.md` | Extracted overdue and status icon logic |
| `/docs/03-natural-language-and-scheduling/nlc.md` | `nlc.md` | Copied verbatim (comprehensive existing doc) |
| `/docs/03-natural-language-and-scheduling/calendar-and-time-picker.md` | `calendar-module.md` | Consolidated picker documentation |
| `/docs/05-design-and-layout/responsive-layout.md` | `responsive-design.md` | Consolidated responsive behaviour |
| `/docs/05-design-and-layout/content-overlay-responsive.md` | `content-overlay-responsive.md` | Copied verbatim |
| `/docs/05-design-and-layout/component-hierarchy.md` | `component-hierarchy.md` | Copied with references |
| `/docs/05-design-and-layout/colour-styles.md` | `colour-styles.md` | Copied verbatim |
| `/docs/05-design-and-layout/sizing-spacing.md` | `sizing-spacing.md` | Copied verbatim |
| `/docs/06-quality-and-dev/build-guide.md` | `build-guide.md` | Copied verbatim |
| `/docs/06-quality-and-dev/dev-tools.md` | `dev-tools.md` | Reference to overlay doc |

### To Archive (Root-Level Docs - 17 files)

| Original File | Archive Location | Status |
|---------------|------------------|--------|
| `/docs/README.md` | `/docs/archive/original-docs/README.md` | Superseded by `/docs/00-overview/README.md` |
| `/docs/build-guide.md` | `/docs/archive/original-docs/build-guide.md` | Content in `/docs/06-quality-and-dev/build-guide.md` |
| `/docs/calendar-module.md` | `/docs/archive/original-docs/calendar-module.md` | Content in `/docs/03-natural-language-and-scheduling/calendar-and-time-picker.md` |
| `/docs/colour-styles.md` | `/docs/archive/original-docs/colour-styles.md` | Content in `/docs/05-design-and-layout/colour-styles.md` |
| `/docs/component-hierarchy.md` | `/docs/archive/original-docs/component-hierarchy.md` | Content in `/docs/05-design-and-layout/component-hierarchy.md` |
| `/docs/content-overlay-responsive.md` | `/docs/archive/original-docs/content-overlay-responsive.md` | Content in `/docs/05-design-and-layout/content-overlay-responsive.md` |
| `/docs/dev-tools.md` | `/docs/archive/original-docs/dev-tools.md` | Content in `/docs/01-core-surfaces/dev-tools-overlay.md` |
| `/docs/done-delete-system.md` | `/docs/archive/original-docs/done-delete-system.md` | Content split across multiple new files |
| `/docs/done-reminders.md` | `/docs/archive/original-docs/done-reminders.md` | Content in `/docs/01-core-surfaces/done-deleted-archive.md` |
| `/docs/editing-reminders.md` | `/docs/archive/original-docs/editing-reminders.md` | Content in `/docs/02-reminder-behaviour/reminder-lifecycle.md` |
| `/docs/filter-system.md` | `/docs/archive/original-docs/filter-system.md` | Content in `/docs/02-reminder-behaviour/filters-and-sorting.md` |
| `/docs/new-reminder-overlay.md` | `/docs/archive/original-docs/new-reminder-overlay.md` | Content in `/docs/01-core-surfaces/new-reminder-overlay.md` |
| `/docs/nlc.md` | `/docs/archive/original-docs/nlc.md` | Content in `/docs/03-natural-language-and-scheduling/nlc.md` |
| `/docs/reminder-logic.md` | `/docs/archive/original-docs/reminder-logic.md` | Content split to filters-and-sorting.md and overdue-and-status.md |
| `/docs/responsive-design.md` | `/docs/archive/original-docs/responsive-design.md` | Content in `/docs/05-design-and-layout/responsive-layout.md` |
| `/docs/settings.md` | `/docs/archive/original-docs/settings.md` | Content in `/docs/01-core-surfaces/settings-overlay.md` |
| `/docs/sizing-spacing.md` | `/docs/archive/original-docs/sizing-spacing.md` | Content in `/docs/05-design-and-layout/sizing-spacing.md` |

### To Archive (Notes - 41 files)

All files in `/docs/notes/` should be moved to `/docs/archive/notes/`:

1. app-startup-logs.md
2. claude-startup-audit-prompt.md
3. cleanup-profiling.md
4. delete-functionality-spec.md
5. dev-tools-repeats-toggle.md
6. docs-hygiene-move.md
7. documentation-audit-plan.md
8. documentation-corrections.md
9. documentation-update-guide.md
10. done-deleted-filter.md
11. done-deleted-filters.md
12. done-deleted-hardening-plan.md
13. done-deleted-placeholders.md
14. empty-placeholder-logic.md
15. empty-state-delay-1.md
16. empty-state-delay.md
17. filter-behaviour.md
18. fix-done-deleted-animation.md
19. hide-reminder-subtitles.md
20. monthly-repeat-enhancement.md
21. other-filter-updates.md
22. package-restore-log.md
23. prune-deps-plan.md
24. reintroduction-investigation.md
25. reminder-categorisation-bug.md
26. reminder-delete-logic-1.md
27. reminder-delete-logic.md
28. reminder-repeat-time.md
29. reminderly-repo-plan.md
30. reminderly-settings.md
31. reminders-ux-fixes.md
32. remove-startup-freeze-code.md
33. render-path-updates.md
34. repeat-reminder-completion.md
35. repeat-reminder-logic.md
36. review-feedback.md
37. standardize-repeat-subtitle.md
38. step-1-audit-report.md
39. sync-delete-undone-cadence.md
40. ticket-2-mitigation.md
41. ticket-5-refactor-nested-setre.md
42. ui-reference-check.md
43. update-placeholder-delay.md

**Note**: These are historical planning, investigative, and development notes. They are preserved in archive for reference but are not part of the canonical documentation.

## Manual Migration Steps Required

Due to tool limitations, the following manual steps are required to complete the migration:

```bash
# 1. Move original root-level docs to archive
cd /docs
mkdir -p archive/original-docs
mv README.md build-guide.md calendar-module.md colour-styles.md \\
   component-hierarchy.md content-overlay-responsive.md dev-tools.md \\
   done-delete-system.md done-reminders.md editing-reminders.md \\
   filter-system.md new-reminder-overlay.md nlc.md reminder-logic.md \\
   responsive-design.md settings.md sizing-spacing.md \\
   archive/original-docs/

# 2. Move notes directory to archive
mv notes/* archive/notes/
rmdir notes

# 3. Create new root README pointing to new structure
# (Already created as /docs/00-overview/README.md)
```

## Summary Statistics

- **New files created**: 18
- **Consolidated files**: 15
- **Files to archive**: 58 total (17 root + 41 notes)
- **New folder structure**: 7 numbered folders + archive
- **Documentation organization**: Improved from flat to hierarchical

## Next Steps

1. Execute manual migration commands above
2. Verify all files in place
3. Test documentation links
4. Update any external references to old paths
5. Communicate new documentation structure to team

## Verification Checklist

- [ ] All 18 new files created in correct locations
- [ ] All 17 root-level docs moved to `/docs/archive/original-docs/`
- [ ] All 41 notes files moved to `/docs/archive/notes/`
- [ ] `/docs/00-overview/README.md` serves as new documentation index
- [ ] No broken internal links in new documentation
- [ ] Old notes directory removed
- [ ] Archive directories properly organized
