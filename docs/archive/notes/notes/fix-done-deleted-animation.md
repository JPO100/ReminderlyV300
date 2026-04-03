Problem
The done/deleted filter switching (All, Done, Deleted) currently animates awkwardly when the list content changes. This was not requested and the UX is worse.

Requirement
Done/deleted filter switching must mirror exactly the behaviour of the main active list filters (Today / This week / Later / Sometime):

Switching filters updates the list immediately.

No transitional animation between filter states.

No fade, slide, layout tween, or crossfade of the whole list.

Only the existing per-row animations that already exist elsewhere (if any) may remain, but there must be no additional animation triggered specifically by switching doneDeletedFilter.

Scope
App.tsx only, unless you find the added animation lives in a shared component already used by the active list filters (in which case remove it only for done/deleted switching).

What to change

Identify exactly what was added to animate doneDeletedFilter transitions. Examples of things to remove:

Keying the list container by doneDeletedFilter

AnimatePresence wrapping the whole list by filter key

motion.div wrappers added specifically for done/deleted list transitions

layout / layoutId being enabled or toggled for filter switches

CSS transitions on the list wrapper tied to doneDeletedFilter changes

Remove that added behaviour so doneDeletedFilter changes behave like activeFilter changes.

Important constraints

Do not change the behaviour of un-done / un-delete cadences.

Do not change delete / done cadences.

Do not change sorting, filtering logic, or placeholder logic.

Do not change the existing active list filter behaviour.

Acceptance criteria

Switching Done <-> Deleted <-> All has no "list transition" animation. It should feel identical to switching Today <-> This week <-> Later <-> Sometime.

No new UI or code abstractions introduced. Remove only what was added.

Deliverable
A small diff that removes the done/deleted filter-switch animation and restores immediate list switching parity with the active list filters.
