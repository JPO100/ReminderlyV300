Use this revised instruction for Claude.

```text
You are to carry out a full documentation audit, restructure, and update across the entire Reminderly codebase.

This task is documentation-only. You must not change any production code, behaviour, UI, features, configuration, or logic. The application must remain functionally identical before and after this work.

Core objective

Create a clean, complete, and accurate documentation set where:

1. Every meaningful element of the current app is documented.
2. Documentation is organised in a simple, logical hierarchical structure aligned to the app’s real runtime features and capabilities.
3. Existing documentation is updated where accurate and useful.
4. New documentation is created where required.
5. Redundant, duplicated, obsolete, or superseded documentation is removed or archived where appropriate.

This documentation will form the reference foundation for a future SwiftUI rebuild. Accuracy and completeness are therefore critical.

Non-negotiable constraints

1. Documentation changes only.  
   Do not modify application code, behaviour, UI, styling, features, or configuration.

2. The codebase is the source of truth.  
   If documentation and code disagree, the documentation must be corrected to match the code.

3. Do not invent behaviour.  
   Only document behaviour that exists in the current implementation.

4. Do not introduce speculative architecture, redesigns, or SwiftUI interpretations.

5. Keep the documentation structure simple.  
   Do not introduce complex documentation systems, frameworks, generators, templates, or tooling.

6. Do not create unnecessary folders or fragmentation of content.

7. Do not preserve incorrect or obsolete documentation simply because it already exists.

Required working method

Step 1 - Full forensic review

Review the entire codebase line by line.

Review every existing documentation file line by line.

Do not rely on filenames or assumptions. Confirm behaviour through implementation.

Identify:
- every runtime surface
- every feature
- every behaviour
- every state
- every persistence rule
- every developer-only tool
- every relevant configuration or feature flag

Step 2 - Documentation gap analysis

From the codebase review, determine:

- what functionality exists
- which parts are already documented
- which parts are undocumented
- which documentation is incorrect
- which documentation overlaps or duplicates other files
- which documentation is obsolete

Step 3 - Final documentation structure

Use the following structure for the canonical documentation set unless the codebase clearly requires a minor adjustment.

Do not expand this structure unnecessarily.

docs/
  00-overview/
    README.md
    product-overview.md
    architecture.md
    data-model-and-persistence.md

  01-core-surfaces/
    active-list.md
    done-deleted-archive.md
    new-reminder-overlay.md
    reminder-info-overlay.md
    repeats-overlay.md
    settings-overlay.md
    tutorial-overlay.md
    dev-tools-overlay.md

  02-reminder-behaviour/
    reminder-lifecycle.md
    filters-and-sorting.md
    overdue-and-status.md
    empty-states-and-transitions.md

  03-natural-language-and-scheduling/
    nlc.md
    text-normalisation-and-rendering.md
    scheduling.md
    repeats.md
    calendar-and-time-picker.md

  04-settings-onboarding-and-premium/
    settings.md
    onboarding-and-tutorial.md
    premium-ui.md

  05-design-and-layout/
    responsive-layout.md
    content-overlay-responsive.md
    component-hierarchy.md
    colour-styles.md
    sizing-spacing.md

  06-quality-and-dev/
    build-guide.md
    self-check-system.md
    tests-and-baselines.md
    dev-tools.md

  archive/
    notes/
    historical-imports/

Canonical documentation rules

Canonical documentation must:

- describe the app exactly as it behaves today
- be written in clear professional English
- use structured headings
- explain behaviour rather than restating code
- avoid large code dumps
- remain concise but complete

Each canonical document should include, where relevant:

- purpose
- where the surface or system appears in the app
- user interactions
- key states
- behaviour rules
- dependencies on other systems
- persistence implications
- edge cases or constraints

Handling existing documentation

For each existing documentation file, choose one action:

1. Keep and update
2. Move and update
3. Merge into another file then remove original
4. Archive because it is historical or investigative
5. Remove because it is obsolete or fully superseded

Rules:

- Do not allow multiple canonical files describing the same behaviour.
- Do not leave obsolete documentation in the main documentation tree.
- Move historical investigation notes, prompt imports, or reference bundles into the archive directory.

Feature coverage requirement

The final documentation set must cover all real runtime capabilities including:

Core surfaces
- active reminders list
- done/deleted archive
- new reminder overlay
- reminder info overlay
- repeats overlay
- settings overlay
- tutorial overlay
- developer tools overlay

Reminder lifecycle
- create reminder
- edit reminder
- mark reminder done
- uncomplete reminder
- delete reminder
- undelete reminder
- repeat auto-rescheduling

Natural language capture and text processing
- token detection
- token highlighting
- click mode
- auto mode
- edit-mode behaviour
- token invalidation after edits
- relative date normalisation
- display text generation
- title extraction
- render-time substitutions such as today/tomorrow

Scheduling
- sometime reminders
- date selection
- time selection
- calendar behaviour
- time picker behaviour
- repeat configuration
- hourly, daily, weekly, monthly, yearly, and custom-day repeats
- due line formatting
- repeat label generation

Views and filters
- standard filter mode
- grouped filter mode
- filter meanings
- overdue handling
- sorting behaviour
- archive sub-filters
- empty states

Settings, onboarding, and premium UI
- settings overlay
- subtitle toggle
- tutorial access
- tutorial behaviour
- premium feature section
- premium CTA
- locked premium rows if present

Tutorial and onboarding
- tutorial overlay
- actual number of onboarding pages wired in the runtime code
- navigation behaviour
- completion and restart behaviour
- tutorial feature flags if present

Developer tools
- access mechanism
- password gate
- password required toggle
- self-check or automated test surfaces
- dummy reminder generation
- NLC controls
- filter controls
- hide overdue toggle
- clear reminders tooling
- any dev-only or placeholder pages

Persistence and data model
- reminder schema
- settings schema
- localStorage usage
- archive fields such as completedAt or deletedAt
- hydration behaviour
- sanitisation
- legacy migrations if present

Responsive layout and UI rules
- supported viewport assumptions
- smaller screen behaviour
- overlay positioning rules
- textarea sizing behaviour
- important layout constants or constraints

Quality and engineering support
- self-check systems
- automated tests surfaces
- build and run guidance if present in the repo

Execution order

Phase 1  
Full codebase and documentation review.

Phase 2  
Define final documentation structure and mapping of all existing docs.

Phase 3  
Rewrite, create, merge, move, archive, or remove documentation as required.

Phase 4  
Final verification pass.

Final verification checklist

Before completion confirm that:

1. Every runtime surface is documented.
2. Every behavioural system is documented.
3. Every persistence rule is documented.
4. Developer-only surfaces are documented where relevant.
5. No duplicate canonical documentation exists.
6. Obsolete documentation has been removed or archived.
7. The documentation hierarchy is simple and logical.
8. The documentation accurately reflects the current codebase.

Final deliverables

1. The updated documentation directory structure.
2. Updated canonical documentation files.
3. Archived historical documentation moved out of the main tree.
4. Removal of obsolete or duplicated documentation where appropriate.
5. A summary listing:
   - files created
   - files updated
   - files moved or renamed
   - files archived
   - files removed

Important final constraint

This task must not alter any application behaviour or implementation.

Documentation updates only.
```
