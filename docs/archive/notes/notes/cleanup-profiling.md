scope

Remove all startup profiling/debug code that was added (timed wrappers, startup-summary, motion/layout proxy, font timing, persist timing refs, etc.).

Add one minimal dev-only event loop stall detector for the first 10 seconds after mount.

Do not change any app behaviour.

non-scope

No fixes yet.

No refactors.

No file moves.

No additional diagnostics beyond the single stall detector.

No changes to handlers, state logic, rendering, or motion.

required changes

Full cleanup of profiling

Remove:

appImportStart

categoriseTimeRef / categoriseCallsRef

overdueTimeRef / overdueCallsRef

firstPersistMsRef / firstPersistBytesRef / firstPersistDoneRef

timedCategoriseReminder / timedIsOverdue wrappers

all [startup-metric] and [startup-summary] logs

the double-rAF profiler block

Restore all render-path calls to use original categoriseReminder and isOverdue directly.

Ensure App.tsx returns to clean production state (no debug artifacts).

Add single event loop stall detector (dev-only)

In App.tsx, add:

useEffect(() => {
  if (!import.meta.env.DEV) return;

  const start = performance.now();
  let expected = start;

  const interval = setInterval(() => {
    const now = performance.now();
    const drift = now - expected - 100;

    if (drift > 200) {
      console.log(
        "[stall] drift ms =",
        drift.toFixed(1),
        "at",
        (now - start).toFixed(1)
      );
    }

    expected = now;
  }, 100);

  const stop = setTimeout(() => {
    clearInterval(interval);
  }, 10000);

  return () => {
    clearInterval(interval);
    clearTimeout(stop);
  };
}, []);

rules

Dev-only guard required.

No other logging anywhere.

No behaviour changes.

verification

Confirm all profiling code has been removed.

Confirm only the stall detector remains.

App must behave exactly as before.

deliverable

Confirm cleanup complete.