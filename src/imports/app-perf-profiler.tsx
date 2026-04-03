You’re right. The click was just a symptom. The real problem is: the main thread is getting hammered for the first 2–3 seconds after refresh, so scrolling and input both feel broken.

The earlier numbers (loadReminders 0.2 ms, persist 0.1 ms, first render 20 ms) prove the slowdown is not localStorage or initial render. So whatever is causing the jank is happening after mount, and it is not inside those two measured blocks.

The simplest, high-signal way to identify what is slowing launch down (without devtools, without endless logs) is:

log long tasks on the main thread for the first 5 seconds after refresh

log basic frame jank for the first 5 seconds after refresh

That gives us a precise answer: “what is blocking the main thread, how often, and for how long”, without guessing and without instrumenting random effects.

Tell Claude to do this, exactly.

scope

add one dev-only launch profiler in App.tsx that runs for 5 seconds after mount and logs:

long tasks (main thread blocks) using PerformanceObserver where supported

frame jank using requestAnimationFrame delta sampling

do not touch any app logic, handlers, state, or UI.

remove any click guards added previously, since they are unrelated and risk masking symptoms.

non-scope

no refactors

no file moves

no additional diagnostics beyond this single block

no new dependencies

no changes to behaviour or styling

implementation

remove tick click guard changes

revert handleTickClick to the simple functional updater it had before any guards were introduced:
setViewMode((prev) => (prev === "list" ? "done-deleted" : "list"));

no debounce, no raf guard, no refs.

add one dev-only profiling effect (single block)

in App.tsx, add a single useEffect(() => { ... }, []) that:
a) long task logging (if supported)

if PerformanceObserver exists:

observe entryTypes: ["longtask"]

for each long task within the first 5 seconds, log:

duration (ms)

startTime (ms since page start)

stop observing after 5 seconds
b) frame jank logging (always supported)

run requestAnimationFrame loop for 5 seconds

track:

worst frame delta (ms)

count of frames over 50 ms

count of frames over 100 ms

after 5 seconds, log one summary line with those numbers

guard all of it behind import.meta.env.DEV.

example output goals

[perf] longtask duration=187.4ms start=1234.5ms

[perf] raf summary worst=312.0ms over50=14 over100=3 window=5000ms