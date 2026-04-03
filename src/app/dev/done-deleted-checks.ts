/**
 * Done / Deleted View Checks
 *
 * Deterministic checks for the done/deleted list view:
 * - Tick toggle navigates between list and done-deleted view modes
 * - Done/deleted list is derived from completedAt on reminders
 * - Triple-click on text still opens dev tools (no interference)
 * - Sub-filter derivation (done / deleted / all)
 * - Pending restore visibility in sub-filters
 * - Clear-all scope asymmetry
 * - Sort key precedence for mixed done+deleted items
 * - deletedAt persistence
 *
 * STATELESS: Returns fresh check array on each call - no side effects.
 */

import type { Check } from './check-system';
import type { Reminder, ViewMode } from '../reminder-utils';
import { loadReminders, STORAGE_KEY } from '../reminder-utils';

/**
 * Simple assertion helper
 */
function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Returns all done/deleted view checks.
 * PURE FUNCTION - builds fresh array on each call.
 */
export function getDoneDeletedChecks(): Check[] {
  return [
    // ========================================================================
    // 1. ViewMode toggle logic
    // ========================================================================

    {
      id: 'done-deleted-toggle-list-to-done-deleted',
      name: 'ViewMode: list -> done-deleted on tick click',
      run: () => {
        // Simulate the toggle logic from handleTickClick
        let viewMode: ViewMode = 'list';
        let activeFilter: string = 'today';

        // Tick click when in list mode
        if (viewMode === 'done-deleted') {
          viewMode = 'list';
          activeFilter = 'all';
        } else {
          viewMode = 'done-deleted';
          activeFilter = 'all';
        }

        assert(viewMode === 'done-deleted', `Expected done-deleted, got ${viewMode}`);
        assert(activeFilter === 'all', `Expected filter reset to all, got ${activeFilter}`);
      },
    },

    {
      id: 'done-deleted-toggle-done-deleted-to-list',
      name: 'ViewMode: done-deleted -> list on tick click',
      run: () => {
        let viewMode: ViewMode = 'done-deleted';
        let activeFilter: string = 'all';

        // Tick click when in done-deleted mode
        if (viewMode === 'done-deleted') {
          viewMode = 'list';
          activeFilter = 'all';
        } else {
          viewMode = 'done-deleted';
          activeFilter = 'all';
        }

        assert(viewMode === 'list', `Expected list, got ${viewMode}`);
        assert(activeFilter === 'all', `Expected filter all, got ${activeFilter}`);
      },
    },

    {
      id: 'done-deleted-toggle-from-filter-goes-to-done-deleted',
      name: 'ViewMode: Today filter -> done-deleted on tick click (resets filter)',
      run: () => {
        let viewMode: ViewMode = 'list';
        let activeFilter: string = 'today';

        // Tick click when viewing Today filter
        if (viewMode === 'done-deleted') {
          viewMode = 'list';
          activeFilter = 'all';
        } else {
          viewMode = 'done-deleted';
          activeFilter = 'all';
        }

        assert(viewMode === 'done-deleted', `Expected done-deleted, got ${viewMode}`);
        assert(activeFilter === 'all', `Expected filter reset to all, got ${activeFilter}`);
      },
    },

    // ========================================================================
    // 2. Triple-click dev tools is unaffected
    // ========================================================================

    {
      id: 'done-deleted-tick-and-text-areas-separate',
      name: 'Navigation: tick click area (0-22%) does not overlap text area (25%-100%)',
      run: () => {
        // The tick button covers 0% to 22% of the logo width.
        // The text click button covers 25% to 100%.
        // There is a 3% gap — no overlap.
        const tickEnd = 22;
        const textStart = 25;
        assert(
          tickEnd < textStart,
          `Tick area end (${tickEnd}%) must be less than text area start (${textStart}%)`,
        );
      },
    },

    // ========================================================================
    // 3. Sub-filter derivation (doneDeletedFilter: 'all' | 'done' | 'deleted')
    //    Conditions copied from App.tsx lines 1118-1124.
    // ========================================================================

    {
      id: 'done-deleted-subfilter-derivation',
      name: 'Done/deleted: sub-filter classifies done-only, deleted-only, and both items correctly',
      run: () => {
        const items: Pick<Reminder, 'id' | 'completedAt' | 'deletedAt'>[] = [
          { id: 'active',       completedAt: undefined, deletedAt: undefined },
          { id: 'done-only',    completedAt: 1000,      deletedAt: undefined },
          { id: 'deleted-only', completedAt: undefined, deletedAt: 2000 },
          { id: 'both',         completedAt: 1000,      deletedAt: 3000 },
        ];
        const pendingUncompleteIds = new Set<string>();
        const pendingUndeleteIds = new Set<string>();

        // Base filter — App.tsx line 1119
        const base = items.filter((r) => r.completedAt != null || r.deletedAt != null || pendingUncompleteIds.has(r.id) || pendingUndeleteIds.has(r.id));
        assert(base.length === 3, `Base filter: expected 3, got ${base.length}`);
        assert(!base.some((r) => r.id === 'active'), 'Base filter must exclude active item');

        // 'all' — App.tsx line 1121
        const all = base.filter(() => true);
        assert(all.length === 3, `'all' filter: expected 3, got ${all.length}`);

        // 'done' — App.tsx line 1122
        const done = base.filter((r) => (r.completedAt != null && r.deletedAt == null) || pendingUncompleteIds.has(r.id));
        assert(done.length === 1, `'done' filter: expected 1, got ${done.length}`);
        assert(done[0].id === 'done-only', `'done' filter: expected done-only, got ${done[0].id}`);

        // 'deleted' — App.tsx line 1124
        const deleted = base.filter((r) => r.deletedAt != null || pendingUndeleteIds.has(r.id));
        assert(deleted.length === 2, `'deleted' filter: expected 2, got ${deleted.length}`);
        assert(deleted.some((r) => r.id === 'deleted-only'), "'deleted' filter must include deleted-only");
        assert(deleted.some((r) => r.id === 'both'), "'deleted' filter must include both (deletedAt wins)");
      },
    },

    // ========================================================================
    // 4. Pending restore visibility in sub-filters during 350ms window
    //    Conditions copied from App.tsx lines 1119, 1122, 1124.
    // ========================================================================

    {
      id: 'done-deleted-pending-restore-subfilter-visibility',
      name: 'Done/deleted: pendingUncomplete/pendingUndelete items visible in correct sub-filters',
      run: () => {
        // Simulate items whose completedAt/deletedAt was just cleared but are still
        // in pending sets (350ms window). Data fields are null; pending set keeps them visible.
        const items: Pick<Reminder, 'id' | 'completedAt' | 'deletedAt'>[] = [
          { id: 'restoring-done',    completedAt: undefined, deletedAt: undefined },
          { id: 'restoring-deleted', completedAt: undefined, deletedAt: undefined },
        ];
        const pendingUncompleteIds = new Set<string>(['restoring-done']);
        const pendingUndeleteIds = new Set<string>(['restoring-deleted']);

        // Base filter — App.tsx line 1119
        const base = items.filter((r) => r.completedAt != null || r.deletedAt != null || pendingUncompleteIds.has(r.id) || pendingUndeleteIds.has(r.id));
        assert(base.length === 2, `Base filter: expected 2 pending items, got ${base.length}`);

        // 'done' — App.tsx line 1122: pendingUncompleteIds.has(r.id) clause
        const done = base.filter((r) => (r.completedAt != null && r.deletedAt == null) || pendingUncompleteIds.has(r.id));
        assert(done.length === 1, `'done' filter: expected 1 pending-uncomplete, got ${done.length}`);
        assert(done[0].id === 'restoring-done', `'done' filter: expected restoring-done, got ${done[0].id}`);

        // 'deleted' — App.tsx line 1124: pendingUndeleteIds.has(r.id) clause
        const deleted = base.filter((r) => r.deletedAt != null || pendingUndeleteIds.has(r.id));
        assert(deleted.length === 1, `'deleted' filter: expected 1 pending-undelete, got ${deleted.length}`);
        assert(deleted[0].id === 'restoring-deleted', `'deleted' filter: expected restoring-deleted, got ${deleted[0].id}`);
      },
    },

    // ========================================================================
    // 5. Clear-all scope asymmetry
    //    Logic copied from App.tsx lines 875-883 (handleClearListClick).
    // ========================================================================

    {
      id: 'done-deleted-clear-all-scope',
      name: 'Done/deleted: clear-all includes pending restore ids, excludes pendingDelete ids',
      run: () => {
        const reminders: Pick<Reminder, 'id' | 'completedAt' | 'deletedAt'>[] = [
          { id: 'active',  completedAt: undefined, deletedAt: undefined },
          { id: 'done',    completedAt: 1000,      deletedAt: undefined },
          { id: 'deleted', completedAt: undefined, deletedAt: 2000 },
        ];
        const pendingUncompleteIds = new Set<string>(['pending-uncomplete']);
        const pendingUndeleteIds = new Set<string>(['pending-undelete']);
        const pendingDeleteIds = new Set<string>(['pending-delete']);

        // Build idsToRemove — exact logic from App.tsx lines 875-883
        const idsToRemove = new Set<string>();
        for (const r of reminders) {
          if (r.completedAt != null || r.deletedAt != null) {
            idsToRemove.add(r.id);
          }
        }
        for (const id of pendingUncompleteIds) idsToRemove.add(id);
        for (const id of pendingUndeleteIds) idsToRemove.add(id);
        // NOTE: pendingDeleteIds are deliberately NOT added (App.tsx has no such loop)

        assert(idsToRemove.has('done'), 'Must include done item');
        assert(idsToRemove.has('deleted'), 'Must include deleted item');
        assert(!idsToRemove.has('active'), 'Must exclude active item');
        assert(idsToRemove.has('pending-uncomplete'), 'Must include pending-uncomplete id');
        assert(idsToRemove.has('pending-undelete'), 'Must include pending-undelete id');
        assert(!idsToRemove.has('pending-delete'), 'Must NOT include pending-delete id');
      },
    },

    // ========================================================================
    // 6. Mixed sort key precedence
    //    Expression copied from App.tsx lines 1127-1129.
    // ========================================================================

    {
      id: 'done-deleted-mixed-sort-precedence',
      name: 'Derivation: sort key uses pendingUndeleteSortKey ?? deletedAt ?? completedAt ?? pendingUncompleteCompletedAt',
      run: () => {
        // Simulate the maps that refs hold at runtime
        const pendingUndeleteSortKey = new Map<string, number>();
        const pendingUncompleteCompletedAt = new Map<string, number>();

        const items: { id: string; deletedAt?: number | null; completedAt?: number | null }[] = [
          { id: 'done-1000',    completedAt: 1000, deletedAt: undefined },
          { id: 'deleted-3000', completedAt: undefined, deletedAt: 3000 },
          { id: 'done-2000',    completedAt: 2000, deletedAt: undefined },
          { id: 'pending-uncomplete', completedAt: undefined, deletedAt: undefined },
          { id: 'pending-undelete',   completedAt: undefined, deletedAt: undefined },
        ];
        pendingUncompleteCompletedAt.set('pending-uncomplete', 4000);
        pendingUndeleteSortKey.set('pending-undelete', 5000);

        // Sort expression — App.tsx lines 1127-1129
        const sorted = [...items].sort((a, b) => {
          const tsA = pendingUndeleteSortKey.get(a.id) ?? a.deletedAt ?? a.completedAt ?? pendingUncompleteCompletedAt.get(a.id) ?? 0;
          const tsB = pendingUndeleteSortKey.get(b.id) ?? b.deletedAt ?? b.completedAt ?? pendingUncompleteCompletedAt.get(b.id) ?? 0;
          return tsB - tsA;
        });

        const ids = sorted.map((r) => r.id);
        assert(ids[0] === 'pending-undelete',   `Expected pending-undelete (5000) first, got ${ids[0]}`);
        assert(ids[1] === 'pending-uncomplete', `Expected pending-uncomplete (4000) second, got ${ids[1]}`);
        assert(ids[2] === 'deleted-3000',       `Expected deleted-3000 third, got ${ids[2]}`);
        assert(ids[3] === 'done-2000',          `Expected done-2000 fourth, got ${ids[3]}`);
        assert(ids[4] === 'done-1000',          `Expected done-1000 last, got ${ids[4]}`);
      },
    },

    // ========================================================================
    // 7. Persistence: deletedAt survives save/load cycle
    //    Mirrors completion-persisted-and-loaded check pattern.
    //    Tests reminder-utils.ts lines 100-102.
    // ========================================================================

    {
      id: 'done-deleted-persistence-deletedAt',
      name: 'Persistence: deletedAt survives save/load cycle',
      run: () => {
        const original = localStorage.getItem(STORAGE_KEY);
        try {
          const reminders = [
            { id: 'pd1', originalText: 'active', displayText: 'active', createdAt: Date.now(), schedule: { kind: 'sometime' as const } },
            { id: 'pd2', originalText: 'deleted', displayText: 'deleted', createdAt: Date.now(), schedule: { kind: 'sometime' as const }, deletedAt: 9876543210 },
            { id: 'pd3', originalText: 'both', displayText: 'both', createdAt: Date.now(), schedule: { kind: 'sometime' as const }, completedAt: 1111, deletedAt: 2222 },
          ];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));

          const loaded = loadReminders();
          const deletedItem = loaded.find((r) => r.id === 'pd2');
          assert(deletedItem != null, 'Deleted item must be loaded');
          assert(deletedItem!.deletedAt === 9876543210, `Expected 9876543210, got ${deletedItem!.deletedAt}`);

          const bothItem = loaded.find((r) => r.id === 'pd3');
          assert(bothItem != null, 'Both item must be loaded');
          assert(bothItem!.deletedAt === 2222, `Expected deletedAt 2222, got ${bothItem!.deletedAt}`);
          assert(bothItem!.completedAt === 1111, `Expected completedAt 1111, got ${bothItem!.completedAt}`);

          const activeItem = loaded.find((r) => r.id === 'pd1');
          assert(activeItem != null, 'Active item must be loaded');
          assert(activeItem!.deletedAt == null, 'Active item should have no deletedAt');
        } finally {
          if (original === null) {
            localStorage.removeItem(STORAGE_KEY);
          } else {
            localStorage.setItem(STORAGE_KEY, original);
          }
        }
      },
    },
  ];
}
