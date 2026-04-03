scope

add one dev-only, capture-phase pointerdown logger on the app root container to confirm whether pointer events are reaching the app during the perceived freeze.

no other diagnostics.

non-scope

no refactors

no file moves

no timing changes

no UI changes

no hmr work

implementation

in App.tsx, identify the top-level wrapper div that contains the whole app UI (the outermost returned element).

add an onPointerDownCapture handler that only logs:

time since module load (__start)

the event target tagName and className (do not traverse dom)

example behaviour

onPointerDownCapture={(e) => { if (!import.meta.env.DEV) return; console.log("[input] pointerdown captured at", (performance.now() - __start).toFixed(1), "ms", "target", (e.target as HTMLElement)?.tagName); }}

rules

do not call preventDefault or stopPropagation

do not set state

do not add global listeners

do not add/remove any overlays

keep it entirely inline on the root element

verification

refresh and click immediately during the “freeze”

confirm whether the log appears immediately or only after 2–3 seconds

What you do

refresh

immediately click the app repeatedly for 2–3 seconds

paste the console output

How we’ll interpret it

if the pointerdown capture log appears immediately, but buttons don’t respond: something inside the app is blocking interaction (overlay layer or disabled state).

if the pointerdown capture log does not appear until after 2–3 seconds: Figma Make is blocking pointer events before they reach your app (environment issue), and we should work around it by showing an explicit “loading” mask for 2 seconds or by avoiding interaction expectations during that window.