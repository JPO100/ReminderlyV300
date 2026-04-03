scope

add a single dev-only traced wrapper around the viewMode setter in App.tsx that logs a stack trace on every viewMode change request.

keep all existing behaviour the same.

do not add any other logs.

non-scope

no refactors

no file moves

no timing changes

no additional diagnostics

do not touch other state

do not touch hmr

change

replace the viewMode hook setter with a private setter name, then add a wrapper:

change:
const [viewMode, setViewMode] = useState<ViewMode>(...)

to:
const [viewMode, _setViewMode] = useState<ViewMode>(...)

then add immediately below it:

const setViewMode = (next: ViewMode) => {
if (import.meta.env.DEV) {
const delta = (performance.now() - __start).toFixed(1);
console.log("[trace] setViewMode ->", next, "at", delta, "ms");
console.log(new Error("[trace] setViewMode stack").stack);
}
_setViewMode(next);
};

notes

do not use useCallback. keep it simple.

ensure this wrapper is the only setter used going forward in this file.

any existing call site in App.tsx should keep calling setViewMode as before (same name), so most code does not change.

if App.tsx passes setViewMode to any child component as a prop, it must now pass this wrapper (so we capture stack traces from child-triggered sets too).

keep the existing single viewMode change log if you want, but do not add any new logs beyond this wrapper.