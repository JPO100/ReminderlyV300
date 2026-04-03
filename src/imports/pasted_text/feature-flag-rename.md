Claude,

Proceed with **option A**.

Do not add any new write path.

The storage write must remain exactly where it currently exists in `App.tsx`.
You will **only change the storage key**.

Do **not** introduce a second write in `DevTools.tsx`.

---

Clarifications

1. **Write location**

Use **option A**.

`DevTools.tsx` must remain unchanged except for any typing or prop adjustments required by the key rename.

The toggle must continue to call:

```
onPaywallEnabledChange(...)
```

`App.tsx` remains the **single location that writes to localStorage**.

You will only change the key used there.

No duplicate writes.

---

2. **Directory creation**

Yes.

Create the directory:

```
/src/app/config/
```

Then create the file:

```
/src/app/config/features.ts
```

as previously specified.

---

3. **Accepted risks**

The following are **accepted and intentional**:

* existing users may lose the persisted state of the dev toggle
* tests referencing `reminderly-ff-paywall` may become stale
* the helper `isListsEnabled()` defaulting to `false` while `App.tsx` defaults to `true` when no key exists

These are acceptable for a dev-only toggle and are **not part of this scope to resolve**.

Do not add migrations.

Do not modify tests.

Do not alter the default logic.

---

Implementation summary

You will do exactly the following:

1. Create

```
/src/app/config/features.ts
```

2. Create

```
/src/app/utils/featureFlags.ts
```

3. In

```
/src/app/App.tsx
```

replace all usage of:

```
reminderly-ff-paywall
```

with:

```
dev.listsEnabled
```

4. Do **not** introduce any new storage write paths.

5. Do **not** modify any other files except where strictly required for the key replacement.

---

Final rule

The only functional change allowed is the **localStorage key rename**.

All behaviour must remain identical.

---

Before proceeding confirm:

1. The exact files you will modify
2. That the write path remains only in `App.tsx`
3. That `reminderly-ff-paywall` will be completely removed from the codebase

Do not begin implementation until I confirm.
