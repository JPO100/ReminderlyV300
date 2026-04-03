Good. This is the right move.

Before we touch behaviour, we want a full, deterministic inventory of everything that runs during startup.

Here is a tight, focused prompt for Claude. It is forensic, but not open-ended, and it explicitly forbids refactoring or "improving" anything.

You can copy-paste this directly.

---

## Prompt for Claude

scope

* Produce a complete, forensic inventory of everything that executes in the first 20 seconds after a hard refresh of the app.
* This is an analysis-only task.
* Do not change any code.
* Do not add logs.
* Do not refactor.

non-scope

* No fixes.
* No optimisations.
* No restructuring.
* No speculative improvements.
* No suggestions unless explicitly asked at the end.

objective
Provide a precise breakdown of every synchronous and asynchronous operation that occurs from module load through 20 seconds post-mount.

This must include:

1. Module evaluation phase

   * Every top-level statement in App.tsx that executes on import.
   * Any top-level code in imported modules that runs immediately.
   * Any side effects triggered by imports.

2. Initial render phase

   * All useState initialisers (including lazy initialisers).
   * All derived values computed during render (sorting, filtering, categorisation, mapping).
   * Any object/array allocations tied to reminders or view state.
   * Any calls to Date, JSON.parse, JSON.stringify, or similar.

3. Mount phase (0-1s)

   * Every useEffect with [] dependencies.
   * Every useLayoutEffect.
   * Every effect that runs on first render due to initial dependencies.
   * Any timers (setTimeout, setInterval).
   * Any requestAnimationFrame usage.
   * Any DOM measurements (getBoundingClientRect, scrollHeight, etc).
   * Any framer-motion layout measurement or animation initialisation.
   * Any focus/scroll behaviour.

4. Post-mount reactive effects (0-20s)

   * Effects triggered by:

     * reminders state
     * viewMode state
     * filter state
     * overlay state
   * Any cascading state updates caused by mount effects.
   * Any repeated computations triggered by mount.

5. Rendering subtree

   * All major child components mounted immediately.
   * Any expensive list rendering.
   * Any conditional rendering branches that mount heavy trees.
   * Any AnimatePresence / motion components initialised at mount.

6. External/runtime behaviour

   * Any interaction with localStorage.
   * Any global listeners attached (window, document).
   * Any font loading behaviour.
   * Any CSS/layout-triggering class changes.
   * Any event listeners added during mount.

Output format (strict)

* Chronological timeline.
* Bullet-point format.
* Grouped into:

  * Module load
  * First render
  * Mount effects
  * 0-5s
  * 5-20s
* For each item:

  * File
  * Function/effect name
  * What it does
  * Whether it is synchronous or async
  * Whether it could block the main thread
  * Estimated relative weight (light / moderate / heavy)
* Do not speculate beyond what is present in code.

Final section

* Provide a short summary titled "Top 5 Most Likely Startup Bottlenecks", ranked by likelihood, based purely on code inspection (not guessing).

Again:
Do not modify code.
Do not optimise anything.
This is a structured audit only.

---

This will give us a complete map of startup behaviour.
From that, we will choose one targeted fix - and stop.
