Claude,

Approved. The scope is expanded to include the two intermediary files you identified.

Proceed with a **pure rename only**.

---

Objective

Rename the remaining paywall identifiers to Lists identifiers.

No behaviour changes are allowed.

---

Identifiers to rename

Replace exactly the following:

```text
isPaywallEnabled → isListsEnabled
onPaywallEnabledChange → onListsEnabledChange
pendingPaywallState → pendingListsState
```

These renames must apply to:

* React state
* variables
* props
* prop interfaces
* callback names
* parameters
* internal references

---

Files to modify

Modify **only** the following four files:

```
/src/app/App.tsx
/src/imports/DevTools.tsx
/src/app/components/DevToolsOverlay.tsx
/src/app/components/SettingsOverlay.tsx
```

No other files may be edited.

---

Files not allowed to change

Do not modify:

```
/src/app/config/features.ts
/src/app/utils/featureFlags.ts
/src/app/dev/dev-tools-checks.ts
```

Do not modify any tests.

Do not modify documentation.

---

Storage rules

The storage key must remain unchanged:

```
dev.listsEnabled
```

Do not change:

* storage behaviour
* storage location
* helper functions
* toggle logic

---

Behaviour rules

This is a rename only.

You must not change:

* toggle behaviour
* localStorage behaviour
* reminder behaviour
* UI behaviour
* component logic
* prop flow

The application must behave **identically** after this change.

---

Verification

After implementation confirm:

1. Dev Tools Lists toggle still works
2. `dev.listsEnabled` remains the only runtime storage key
3. The identifiers below no longer exist in runtime code:

```
isPaywallEnabled
onPaywallEnabledChange
pendingPaywallState
```

4. The application compiles without TypeScript errors
5. Reminder behaviour is unchanged

---

Proceed.
