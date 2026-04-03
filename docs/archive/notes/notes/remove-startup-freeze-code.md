Prompt for Claude

scope

Fully remove all code related to the recent startup freeze investigation.

Restore App.tsx to a clean, production state with no diagnostics, guards, or temporary mitigations.

non-scope

No behavioural changes.

No performance changes.

No refactors.

No file moves.

No formatting sweeps.

No renaming.

No structural edits beyond removing investigation code.

requirements

Remove ALL investigation artifacts
This includes (but is not limited to):

__start timestamp

appImportStart

Any performance.now instrumentation

Any console.log related to:

[startup]

[startup-metric]

[startup-summary]

[perf]

[stall]

[trace]

[input]

[state]

Any PerformanceObserver logic

Any requestAnimationFrame profiling loops

Any setInterval stall detector

Any temporary refs introduced for profiling

Any timed wrapper functions (timedCategoriseReminder, timedIsOverdue)

Any click guards (time-based, frame-based, RAF-based)

Any startup shields (if present)

Any conditional dev-only blocks added during this investigation

Restore original logic exactly

handleTickClick must use the simple functional updater:

setViewMode((prev) => (prev === "list" ? "done-deleted" : "list"));

All render-path calls must use original categoriseReminder and isOverdue directly.

Persist effect must be clean (no instrumentation).

No additional guards or gating logic.

Verify cleanliness

Confirm there are zero debug-related identifiers remaining.

Confirm App.tsx exports exactly what it did before.

Confirm no behavioural logic has changed.

deliverable

Provide a short confirmation summary listing:

All removed elements.

Confirmation that behaviour matches pre-investigation state.

Confirmation that no temporary logic remains.
