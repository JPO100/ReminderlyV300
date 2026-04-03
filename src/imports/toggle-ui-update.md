Your understanding is correct.

Answers to questions

Toggle on / off visuals

Yes - make the two new toggle rows behave visually like the existing toggle rows already used in the dev tools pages.

Apply the existing on / off visual pattern for interactive state only:

toggle slider reflects on / off

icon fill reflects on / off

any existing inactive opacity treatment used by the current toggle-row pattern may also be used

Constraints:

keep the exact attached Figma text

keep the exact attached Figma icons / SVG paths

keep the exact attached Figma layout and structure

do not introduce any new styling pattern beyond the existing toggle behaviour already used elsewhere in dev tools

So, in short: preserve the provided Figma row design, but wire it up using the same active / inactive behaviour as the existing dev tools toggle rows.

Prop wiring approach

Yes - that is the expected approach.

Use straightforward prop drilling only. No new abstractions.

Expected implementation shape:

App.tsx owns the two toggle states, their persistence, the first-launch-shown flag, and the auto-launch effect

DevToolsOverlay.tsx receives the two toggle values and setters via props

pass them only where needed for the existing navigation / page render path

OnboardingTutorialPage renders and controls the toggle UI

Do not introduce context, shared state helpers, custom hooks, or any other indirection.

Implementation note

Use the simplest safe mount-only auto-launch approach, based on the synchronously initialised localStorage-backed state already present in App.tsx.

Do not add extra guarding logic unless it is strictly required to prevent duplicate firing on the same mount.

No other behavioural changes are permitted beyond what has already been scoped.

You can proceed.