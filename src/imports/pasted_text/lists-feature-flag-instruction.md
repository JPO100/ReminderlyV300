Claude,

Thank you. Your review is correct. The instruction is amended below. Follow this exactly.

Do not extract components.
Do not create new files.
All work will occur **inline in `/src/app/App.tsx` and `/src/imports/DevTools.tsx` only**.

---

Lists feature flag rule

All behaviour and UI changes must be **fully gated behind the existing React state variable**:

`isListsEnabled`

Do **not** import or call `isListsEnabled()` from `/src/app/utils/featureFlags.ts`.

Use the existing state variable already present in `App.tsx`.

When `isListsEnabled` is **false**, the application must behave **exactly as it does today**.

---

Files permitted to change

Only these two files may be modified:

```
/src/app/App.tsx
/src/imports/DevTools.tsx
```

No other files may be edited.

No files may be created.

---

Change 1 — Dev Tools Filters toggle

File:

```
/src/imports/DevTools.tsx
```

When `isListsEnabled` is **true**:

1. The Filters toggle must visually show **Standard** as the active option.
2. The toggle must be disabled.

Disabled implementation must be exactly:

```
opacity: 0.5
pointer-events: none
```

The toggle must not respond to click events.

When `isListsEnabled` is **false**, the toggle must behave exactly as it currently does.

Do not change how the toggle stores its state.

---

Change 2 — Force Standard variant when Lists is enabled

File:

```
/src/app/App.tsx
```

The application currently uses the state variable:

```
filtersMenuVariant
```

When `isListsEnabled` is **true**, the **effective variant used for rendering** must be:

```
'standard'
```

This override must apply **only at the point where the Filters menu and reminder list are rendered**.

Do **not** modify the stored `filtersMenuVariant` state value.

When `isListsEnabled` is **false**, the application must use the stored `filtersMenuVariant` value exactly as it does today.

---

Change 3 — Move Filters menu inside reminder container

File:

```
/src/app/App.tsx
```

The Filters menu and reminder list currently render inline in this file.

When `isListsEnabled` is **true**, render them in this order:

```
Reminder container
 ├─ Filters menu
 └─ Reminder list
```

Spacing rules:

Top of container → Filters menu

```
24px
```

Filters menu → first reminder item

```
32px
```

When `isListsEnabled` is **false**, render the layout exactly as it currently appears.

Do not create new components.

---

Change 4 — Filters pill styling in Lists mode

File:

```
/src/app/App.tsx
```

When `isListsEnabled` is **true**:

Apply these style changes to filter pills.

1. Replace all occurrences of white text with Reminderly blue:

```
#4784f8
```

2. Remove background fills from pills.

Remove these classes:

```
bg-white
bg-[rgba(255,255,255,0.15)]
```

After the change the pills must render as:

* blue text
* existing border
* no fill

Selected and unselected pills will therefore appear visually identical except for the filter logic state.

This is intentional.

When `isListsEnabled` is **false**, styling must remain unchanged.

---

Behaviour constraints

You must not change:

* reminder scheduling
* reminder parsing
* reminder storage
* reminder filtering logic
* reminder ordering
* reminder completion behaviour
* dev tools behaviour when Lists is disabled

---

Verification

With `isListsEnabled = false`

* UI renders exactly as today
* Filters menu location unchanged
* Filters styling unchanged
* Dev Tools toggle behaves normally

With `isListsEnabled = true`

* Dev Tools Filters toggle shows Standard and is disabled
* Effective filter variant is forced to `standard`
* Filters menu appears inside reminder container
* 24px spacing above Filters menu
* 32px spacing between Filters menu and reminder list
* Filter pills use blue text and no fill

---

Before proceeding confirm:

1. Only `/src/app/App.tsx` and `/src/imports/DevTools.tsx` will be modified
2. All changes will use the `isListsEnabled` state variable
3. No files will be created or extracted
4. Behaviour when `isListsEnabled = false` remains identical to today

Do not begin implementation until approval is given.
