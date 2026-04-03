scope

replace the existing console.time / console.timeEnd wrappers for loadReminders and persist with performance.now delta logs using console.log, because figma make console is not displaying console.time output.

keep everything dev-only.

no logic changes.

non-scope

no refactors

no file moves

no hmr work

no behavioural changes

exact change

loadReminders wrapper

replace console.time/timeEnd with:

const t0 = performance.now()

const data = loadReminders()

const t1 = performance.now()

console.log("[startup] loadReminders took", (t1 - t0).toFixed(1), "ms | count", data.length)

persist effect

replace console.time/timeEnd with:

const t0 = performance.now()

const json = JSON.stringify(reminders)

localStorage.setItem(STORAGE_KEY, json)

const t1 = performance.now()

console.log("[startup] persist took", (t1 - t0).toFixed(1), "ms | bytes", json.length)

keep the existing try/catch and fail-silently behaviour.

verification

confirm the app loads.

confirm logs appear in console on refresh.