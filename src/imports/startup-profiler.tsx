scope

add one dev-only startup profiling block in App.tsx that measures the 5 suspected bottlenecks on a single hard refresh and prints one summary.

no behaviour changes.

remove the profiler after we confirm the culprit.

non-scope

no fixes yet

no refactors

no file moves

no new dependencies

no other logging

profiling requirements

output must be a single summary object printed once, plus at most 5 supporting lines (one per area).

no logging inside loops.

all measurements must be coarse-grained and low overhead.

the 5 measurements to add

motion layout measurement cost (approx)

measure time from first render commit to the first animation frame where layout has stabilised.

implementation:

in useEffect([]), capture tCommit = performance.now()

requestAnimationFrame twice:

raf1: t1 = performance.now()

raf2: t2 = performance.now()

motion/layout cost proxy = (t2 - tCommit)

log: [startup-metric] motion/layout proxy ms = (t2 - tCommit)

triple-pass date parsing cost (real)

instrument categoriseReminder and isOverdue wrappers used only in App.tsx:

create local wrapper functions in App.tsx:

timedCategoriseReminder(...)

timedIsOverdue(...)

each wrapper:

t0 = performance.now()

call original function

accumulate (performance.now() - t0) into refs:

categoriseTimeRef, categoriseCallsRef

overdueTimeRef, overdueCallsRef

replace calls in App.tsx render path to use timed wrappers (only within App.tsx).

at end of first render commit (useEffect([]) + requestAnimationFrame), log totals:

categorise calls + total ms

overdue calls + total ms

dev test module evaluation (real, coarse)

this must be measured without touching those modules:

in App.tsx, change DevToolsOverlay import to be lazy in dev only for the measurement phase:

do not do this yet (this is a fix).
so instead we measure the proxy:

add a module-scope timestamp at top of App.tsx: appImportStart = performance.now()

in the first render commit useEffect, log appModuleEvalToCommit = performance.now() - appImportStart

this captures all module evaluation cost, including DevTools check construction.

google font swap / reflow proxy

use document.fonts if available:

in useEffect([]), if (document.fonts?.ready) then:

t0 = performance.now()

document.fonts.ready.then(() => log delta and set a ref)

log: [startup-metric] fonts ready at X ms after commit

do not log individual font events.

localStorage persist cost (real)

you already have persist timing via performance.now around JSON.stringify + setItem.

keep it, but ensure it logs only once on first mount:

gate with a ref so the first persist prints, subsequent persists do not.

output format (single summary)

after 2 animation frames and after fonts.ready resolves (or after 5 seconds timeout), print:

[startup-summary] {
moduleEvalToCommitMs,
motionLayoutProxyMs,
categorise: { calls, totalMs },
overdue: { calls, totalMs },
firstPersistMs,
firstPersistBytes,
fontsReadyMs
}

rules

dev-only guarded.

no spam.

no behavioural changes.

do not attempt to “fix” anything in this scope.