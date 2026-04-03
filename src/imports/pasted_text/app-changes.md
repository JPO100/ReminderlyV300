The previous prompt **does not pass your criteria**.
Issues:

* Files are not deterministic.
* It allows interpretation (“use the existing state”, “may be placeholder”).
* It does not explicitly state where the done area logic lives.
* It does not explicitly define how the tick icon behaviour switches.
* It leaves implementation decisions to Claude.

Below is a **deterministic rewrite** that satisfies your constraints and keeps the implementation simple.

You can copy-paste this directly.

---

Claude,

Before doing anything, re-read `/docs/claude.md` in full.

Do not rely on memory.

Do not begin implementation until you confirm the file you will modify.

Reminderly is an app, not a rocket ship to Mars. Keep this simple.

---

Lists feature flag rule

All changes in this instruction must be fully gated behind the existing state variable:

`isListsEnabled`

When `isListsEnabled` is **false**, the application must behave **exactly as it does today**.

---

Change request

Attach the done/deleted view behaviour to the currently active top-level tab.

The Reminderly tick icon must open the done area belonging to the active tab.

---

Files allowed to change

Only this file may be modified:

```
/src/app/App.tsx
```

No other files may be edited.

No new files may be created.

---

Current behaviour

The Reminderly tick icon currently opens the reminders done/deleted view.

This behaviour must remain unchanged when the Reminders tab is active.

---

State variables

The following state variables already exist in `/src/app/App.tsx`:

```
isListsEnabled
activeMainTab
viewMode
```

`activeMainTab` values:

```
'reminders'
'lists'
```

---

Change 1 — tick icon behaviour

Modify the tick icon click handler in `/src/app/App.tsx`.

When the tick icon is clicked:

If

```
isListsEnabled === false
```

then behaviour must remain unchanged.

If

```
isListsEnabled === true
AND
activeMainTab === 'reminders'
```

then behaviour must remain unchanged.

The reminders done/deleted area must open exactly as it does today.

If

```
isListsEnabled === true
AND
activeMainTab === 'lists'
```

then the reminders done/deleted area must **not** open.

Instead set:

```
viewMode = 'lists-done'
```

---

Change 2 — Lists done area placeholder

In `/src/app/App.tsx`, extend the render branch that controls the main content area.

When

```
isListsEnabled === true
AND
activeMainTab === 'lists'
AND
viewMode === 'lists-done'
```

render a placeholder container.

The container must appear in the same area where the reminders list normally renders.

The container must render exactly the text:

```
Lists done area
```

No additional UI may be added.

---

Behaviour rules

With

```
isListsEnabled = false
```

* the tick icon opens the reminders done area exactly as today
* no Lists done area exists

With

```
isListsEnabled = true
AND
activeMainTab = 'reminders'
```

* tick icon opens the reminders done area exactly as today

With

```
isListsEnabled = true
AND
activeMainTab = 'lists'
```

* tick icon opens the Lists done placeholder
* reminders done area must not render

---

Files not allowed to change

Do not modify:

```
/src/app/config/features.ts
/src/app/utils/featureFlags.ts
/src/app/dev/dev-tools-checks.ts
```

Do not modify:

* reminder scheduling
* reminder parsing
* reminder storage
* reminder filtering logic
* reminder ordering
* reminder completion behaviour
* tests
* documentation

---

Verification

Confirm the following.

With

```
isListsEnabled = false
```

* tick icon opens the reminders done area exactly as today

With

```
isListsEnabled = true
AND
activeMainTab = 'reminders'
```

* tick icon opens the reminders done area

With

```
isListsEnabled = true
AND
activeMainTab = 'lists'
```

* tick icon opens the Lists placeholder
* the placeholder displays

```
Lists done area
```

---

Before proceeding confirm:

1. Only `/src/app/App.tsx` will be modified
2. Lists done behaviour will be gated behind `isListsEnabled`
3. Reminder done behaviour remains unchanged

Do not begin implementation until approval is given.
