Copy-paste this into Claude. This is intentionally tight and minimal, and it should not prompt any over engineering.

---

title
Fix leftover “in the / on Sunday” fragments in normalised reminder text for absolute dates

principle
Keep the technical implementation simple. No over engineering, no new abstractions, no new shared utilities. One small fix in normaliseReminderText plus a couple of regression tests.

scope

* fix normaliseReminderText only
* add regression tests only
* do not change the parser
* do not change formatDateLabel
* do not change ui or rendering
* do not introduce new helpers, configs, enums, or “date source” tracking

bug report

* input: “Call mum March 1 in the morning”
* parsing is correct (date March 1, time morning -> 07:00)
* display body is wrong: “Call mum in the on Sunday”
* expected body: “Call mum”
* the schedule label line (eg “Tomorrow at 7am”) is out of scope and must remain unchanged

root cause (treat as a normalisation issue, not parsing)

* date/time tokens are being stripped incompletely, leaving “in the”
* weekday injection is firing even though an absolute date exists
* no final cleanup removes orphan connectors created by stripping

required behaviour

1. do not inject weekday text into the reminder body when an absolute date exists

* if schedule.date is present (non-null), weekday injection into the body must not run
* weekday/day naming belongs only in the date label, not the body

2. fully strip time-of-day phrases from the body

* ensure “in the morning” is removed as a whole phrase so no “in the” remains
* handle the variant “in morning” too

3. minimal orphan cleanup (only for obvious leftovers caused by stripping)

* after stripping, remove a trailing standalone connector token if present: “in”, “on”, “at”, “the”
* collapse multiple spaces and trim

implementation instructions

* change only the code path that produces the body string in normaliseReminderText (single file only)
* keep the diff small, readable, and local
* use simple regex changes and ordering only
* do not add any new concepts (no “absolute date classification”, no metadata, no multi-pass loops)

concrete changes to make
A) guard weekday injection

* find the logic that injects or replaces weekday text in the reminder body (eg adds “on Sunday”)
* wrap it with a simple guard:

  * if schedule.date != null, skip this body injection entirely

B) strip “in the morning” before smaller removals

* add a targeted removal for:

  * /\bin\s+the\s+morning\b/i
  * /\bin\s+morning\b/i
* do this before any more general time-of-day stripping so it cannot leave “in the”

C) minimal end cleanup

* collapse whitespace to single spaces
* trim
* remove one trailing connector token if present using a single conservative regex:

  * /\s+(in|on|at|the)\s*$/i
* do not remove connectors from the middle of the text

tests
Add unit tests in the existing normaliseReminderText test suite.

Use a fixed “now” of 2026-02-28 (saturday) to keep it deterministic.

1. regression: absolute date + time-of-day phrase

* input: “Call mum March 1 in the morning”
* expected body: “Call mum”

2. regression: variant without “the”

* input: “Call mum March 1 in morning”
* expected body: “Call mum”

3. safety: keep legitimate “on” in the middle

* input: “Call mum on speaker March 1 in the morning”
* expected body: “Call mum on speaker”

acceptance checks

* the body output must never contain fragments like “in the”, “on Sunday”, or “in the on” for this input
* no behaviour changes outside this exact normaliseReminderText body cleanup (tomorrow/tonight/next weekday/recurring paths must remain unchanged)

deliverable

* small code diff in normaliseReminderText
* all tests green
* short summary describing the guard and the phrase strip

---
