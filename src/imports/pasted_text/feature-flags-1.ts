Claude,

Do not proceed with the previous instruction. It contained errors.

Follow the corrected scope below exactly.

Before doing anything, re-read `/docs/claude.md` in full. Do not rely on memory.

Do not begin implementation until you confirm the files you will edit.

---

Change request
Introduce a canonical Lists feature flag and connect it to the existing Dev Tools Lists toggle.

This change must not introduce any UI changes or behavioural changes to reminders.

Reminderly is an app, not a rocket ship to Mars. Keep the implementation simple.

---

Objective

Create a single canonical feature flag for Lists named `listsEnabled`.

The Dev Tools Lists toggle must become the single control for this flag.

There must be only one localStorage key controlling this flag.

That key will be:

```
dev.listsEnabled
```

The existing key `reminderly-ff-paywall` must no longer be used.

---

Scope

You must do exactly the following:

1. Create a feature flag definition file
2. Create a feature flag helper
3. Update the Dev Tools Lists toggle to use the new key
4. Update the App-level state to read from the new key
5. Remove usage of the old storage key

No other changes are allowed.

---

File to create

```
/src/app/config/features.ts
```

Contents:

```ts
export type FeatureFlags = {
  listsEnabled: boolean;
};

export const defaultFeatureFlags: FeatureFlags = {
  listsEnabled: false,
};
```

---

File to create

```
/src/app/utils/featureFlags.ts
```

Contents:

```ts
import { defaultFeatureFlags } from "@/app/config/features";

export function isListsEnabled(): boolean {
  const stored = localStorage.getItem("dev.listsEnabled");

  if (stored === null) {
    return defaultFeatureFlags.listsEnabled;
  }

  return stored === "true";
}
```

---

Files to modify

Modify:

```
/src/imports/DevTools.tsx
```

When the Lists toggle is turned ON write:

```
localStorage.setItem("dev.listsEnabled", "true")
```

When the Lists toggle is turned OFF write:

```
localStorage.setItem("dev.listsEnabled", "false")
```

Do not write to any other storage key.

---

Modify:

```
/src/app/App.tsx
```

Replace all reads and writes of:

```
reminderly-ff-paywall
```

with:

```
dev.listsEnabled
```

The existing toggle behaviour must remain identical.

The only change is the storage key.

---

Storage rules

After this change:

Only this key must exist for the Lists feature:

```
dev.listsEnabled
```

The key:

```
reminderly-ff-paywall
```

must not be used anywhere in the codebase.

---

Behaviour requirements

When Dev Tools Lists toggle is ON

```
localStorage["dev.listsEnabled"] === "true"
```

When Dev Tools Lists toggle is OFF

```
localStorage["dev.listsEnabled"] === "false"
```

`isListsEnabled()` must return the correct value.

No UI changes must occur.

No reminder behaviour must change.

---

Files NOT allowed to change

Do not modify any other files.

Specifically:

* reminder components
* reminder parsing
* reminder scheduling
* reminder storage
* reminder UI
* navigation
* overlays
* tests
* documentation
* dev checks

---

Verification

Confirm the following manually:

1. Toggle Lists ON in Dev Tools
   localStorage contains:

```
dev.listsEnabled = "true"
```

2. Toggle Lists OFF

```
dev.listsEnabled = "false"
```

3. Reload the app

4. Confirm the toggle state persists

5. Confirm the UI behaves exactly as before

---

Before proceeding confirm:

1. The files you will modify
2. That `reminderly-ff-paywall` will be fully removed
3. That no other files will be changed

Do not begin implementation until approval is given.
