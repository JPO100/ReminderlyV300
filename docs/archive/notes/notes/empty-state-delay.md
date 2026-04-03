Scope: contextual empty state delay (only when the user empties the current list)

Goal
Apply a 350ms delay before showing the empty list placeholder only when the user action in the current list removes the last visible reminder. If the user navigates to a list that is already empty (via filters menu or any list switch), show the placeholder immediately with no delay.

Required outcomes

1. When the user deletes or completes the last visible reminder in the current list, the empty placeholder appears after 350ms.
2. When the user navigates to an already empty list, the empty placeholder appears immediately (0ms).

In scope

1. Delay is only armed by last-item actions in the current list

* Only arm a delay when the user performs one of these actions on the current list:

  * delete
  * complete
* Only arm the delay when that action is performed on the last visible reminder in that list (meaning the list's rendered count at click time is exactly 1).

2. Navigation never delays empty placeholders

* On any list change (All, Today, This week, Later, Sometime, Done/Deleted) the empty placeholder must be immediate if the destination list is empty.
* A pending delay must not carry over when switching lists.

3. Implementation (keep it simple, no timers)

* Do not introduce setTimeout for the empty placeholder.
* Use one ref that stores a single timestamp:

  * emptyPlaceholderDelayUntilMsRef
* When the user clicks delete or complete and the current list rendered count is 1, set:

  * emptyPlaceholderDelayUntilMsRef = now + 350
* When rendering the current list:

  * if renderedCount > 0: show rows, hide placeholder, and clear the ref (set to 0)
  * if renderedCount === 0:

    * if now < emptyPlaceholderDelayUntilMsRef: hide placeholder
    * else: show placeholder

4. Reset rules

* On any list change, clear the ref (set to 0) to guarantee immediate empty placeholders on navigation.
* If the list becomes non-empty again for any reason (undo, new reminder, filter toggle), clear the ref (set to 0).

Applies to

* All lists that show an empty placeholder: All, Today, This week, Later, Sometime, Done/Deleted.

Out of scope

* No changes to reminder categorisation, sorting, isOverdue, generation, animations, undo behaviour, or any existing pending windows.
* No new components, no new shared utilities, no refactors.
* No styling or copy changes to the empty placeholder.

Acceptance criteria

* Navigate to an empty list via filters menu: placeholder appears immediately.
* Delete last visible reminder in current list: placeholder appears after 350ms.
* Complete last visible reminder in current list: placeholder appears after 350ms.
* Delete or complete when more than 1 reminder is visible: no delay is applied.
* Switch lists while a delay is pending: destination list placeholder behaviour remains immediate if empty.
* If undo or add occurs during the 350ms window: placeholder does not appear (because list is non-empty), and the delay is cleared.

Implementation guardrails (to prevent creep)

* One ref, one timestamp, one constant (350).
* No timers, no extra state machines, no new edge-case frameworks.
* Only touch the empty placeholder render condition and the delete/complete click paths needed to arm the delay.
