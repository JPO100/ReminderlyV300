Claude,

Thanks. Your understanding is broadly correct. Answers and tightened constraints below.

1. Existing state variable name / location

Do not ask me to name it and do not create a new one.

You should search the current codebase and use the existing app state value that already controls grouped vs standard filters mode. It should remain the single source of truth.

Rules:

* Find the existing state/value yourself.
* Do not rename it.
* Do not duplicate it.
* Do not create a derived helper, selector, context, or abstraction around it.
* Read it from the existing source and pass it through the minimal existing prop path required.

2. Standard mode filter bar in the mini phone

Yes - in standard mode, the mini phone should reflect the standard filter menu layout, which means later and sometime are separate.

Rules:

* Match the existing app’s standard-mode visual structure as closely as the tutorial mini phone already allows.
* Reuse any existing tutorial mini phone button styling/patterns already present.
* Do not create a new visual design language.
* Do not import or introduce new SVG assets or component systems unless the exact existing tutorial implementation already uses one that can be reused directly.
* This is not a redesign. It is a mode mirror.

In practical terms:

* grouped mode: 3-tab tutorial mini phone as it behaves today
* standard mode: show later and sometime as separate filter options in the mini phone

3. Page 7 animation / step count

Do not invent a new animation model.

The tutorial should mirror the active mode in the simplest way possible.

Rules:

* In grouped mode, keep the existing behaviour exactly as it is today.
* In standard mode, the mini phone should show standard-mode filter structure and standard-mode list separation.
* Do not introduce a new tutorial flow concept such as “other”.
* Do not add new animation systems, timing changes, or tutorial logic beyond what is required to display the correct mode.

Interpretation for implementation:

* If Page 7 currently steps through filter views, then in standard mode it must step through the standard-mode views needed to accurately represent that mode, including separate later and sometime states.
* Keep this as a minimal adaptation of the existing tutorial page behaviour, not a redesign.

So yes: if the current sequence is filter-state driven, standard mode should become the equivalent sequence for standard mode, including separate later and sometime views, rather than a single combined “other” state.

4. Page 8 done / deleted filter bar

Correct. Leave it unchanged.

Rules:

* Page 8 done/deleted filter bar must remain exactly as it is today.
* No grouped vs standard behaviour applies there unless it already does in the current tutorial implementation.
* Do not change it.

5. Prop drilling through tutorial chain

Yes, that is acceptable and is the compliant approach here.

Rules:

* Pass the existing filters menu mode value through the current tutorial overlay/component chain only as far as required.
* Do not introduce context.
* Do not introduce shared state.
* Do not refactor the tutorial architecture.
* Do not add new files.

Additional guardrails

Only change what is required for the tutorial mini phone to mirror the app’s active filters mode.

Allowed:

* minimal prop plumbing through the existing tutorial chain
* mini phone visual switch between grouped and standard
* mini phone sample list split between later and sometime in standard mode
* minimal update to Page 7 sequence only if required to accurately mirror standard mode

Not allowed:

* changes to real app filtering or categorisation
* changes to reminder-utils or shared logic
* changes to dev tools architecture
* changes to Page 8
* new helpers, abstractions, selectors, contexts, or utilities
* tutorial redesign

Acceptance criteria

The implementation is correct only if all of the following are true:

* The tutorial mini phone uses the app’s existing grouped/standard mode value as its only source of truth.
* Grouped mode in the app produces the current grouped tutorial behaviour unchanged.
* Standard mode in the app produces a standard-mode tutorial mini phone with later and sometime shown separately.
* Where Page 7 cycles through filter states, standard mode includes separate later and sometime states rather than a combined other state.
* Page 8 remains unchanged.
* No real app reminder logic or shared categorisation logic is modified.

Proceed on that basis.
