Tightened scope prompt for Claude (final, includes all edge cases)

Feature name
Hide reminder subtitles toggle when grouped filters is active

User story
As a user, when grouped filters is active, I can hide reminder subtitle text by switching off "Show date and time subtitles" in the settings overlay.

Required outcomes

1. When the toggle is off and grouped filters is active:

* Subtitles are not shown
* The reminder row becomes a single-line layout with the check box, title, and status icon vertically centred
* Title styling (font, size, weight, colour) is unchanged

2. When subtitles are shown (toggle on, or grouped filters not active):

* Title, subtitle, check box, and status icon must render with exactly the same sizing, spacing, padding, alignment, and positions as the current baseline (no drift)

Scope

1. Add one boolean setting

* Name: showDateAndTimeSubtitles
* UI: settings overlay toggle labelled "Show date and time subtitles"
* Default: on (matches current behaviour)

2. Apply the setting only when grouped filters is active

* Effective subtitle visibility:
* showSubtitles = groupedFiltersActive && showDateAndTimeSubtitles
* When grouped filters is not active, subtitles behave exactly as they do today (always shown).

3. Edge case: auto-reset when leaving grouped filters

* If showDateAndTimeSubtitles is off and grouped filters is turned off (switching to standard filters), then:
* Immediately set showDateAndTimeSubtitles back to on in the background
* Subtitles show again
* This reset is silent (no toast, no prompt) and must persist (stored value becomes on)

4. Rendering change

* When showSubtitles is false, do not render the subtitle element at all (no placeholder, no empty space)

5. Layout change when subtitles are hidden

* Only when showSubtitles is false:
* Vertically centre-align check box, title, and status icon within the row
* Do not change any other styling

Baseline preservation requirement

* When subtitles are visible, the reminder row layout must be identical to the existing implementation:
* Same DOM structure and classes where possible
* No changes to padding, margins, line heights, icon sizes, gaps, or container heights
* Toggling off and back on must return to pixel-identical baseline layout

Persistence

* Persist showDateAndTimeSubtitles using the existing settings overlay persistence mechanism (no new storage system, no migrations)

Non-scope (do not do any of this)

* No changes to reminder logic: categorisation, sorting, scheduling, NLC, subtitle generation, or formatting
* No new toggles, menus, settings screens, variants, experiments, or abstractions
* No refactors, no shared settings framework, no new helper modules unless a tiny local helper is unavoidable
* No styling changes beyond the single vertical-centre alignment mode when subtitles are hidden

Implementation guidance (keep it lightweight)

* One boolean state + one persisted value
* One conditional at the subtitle render site
* One conditional className (or equivalent) to switch into "single-line centred" mode when subtitles are hidden
* One small effect or branch at the point grouped filters is turned off:
* if (!groupedFiltersActive && !showDateAndTimeSubtitles) setShowDateAndTimeSubtitles(true)
* Avoid new components or layout wrappers
* Do not modify baseline visible-subtitle layout code path - only add an alternate hidden-subtitle mode

Acceptance criteria

* Grouped filters active + toggle off:

* Subtitles hidden everywhere they normally appear

* Check box, title, status icon vertically centred

* Title styling unchanged

* Toggle on restores subtitles and the row returns to baseline layout exactly

* Switching grouped filters to standard filters while toggle is off:

* Subtitles immediately show again

* Toggle resets to on in the background and remains on (persisted)

* Visible-subtitle layout is identical to baseline

No questions.
