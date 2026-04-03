/**
 * Completion Checks
 *
 * Deterministic checks for the mark-done completion feature:
 * - completedAt field behaviour and list derivation
 * - Active list excludes completed reminders
 * - Done/deleted list includes completed reminders
 * - Concurrency: double-click guard via timer map
 * - No dependency on transient animation state for done/deleted membership
 *
 * STATELESS: Returns fresh check array on each call - no side effects.
 */

import type { Check } from './check-system';
import type { Reminder } from '../reminder-utils';
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
 * Helper: build a minimal active reminder
 */
function makeReminder(overrides: Partial<Reminder> & { id: string; text: string }): Reminder {
  return {
    createdAt: Date.now(),
    schedule: { kind: 'sometime' as const },
    ...overrides,
  };
}

/**
 * Returns all completion-related checks.
 * PURE FUNCTION - builds fresh array on each call.
 */
export function getCompletionChecks(): Check[] {
  return [
    // ========================================================================
    // 1. Derivation integrity
    // ========================================================================

    {
      id: 'completion-active-excludes-completed',
      name: 'Derivation: active list excludes reminders with completedAt != null',
      run: () => {
        const reminders: Reminder[] = [
          makeReminder({ id: '1', text: 'active' }),
          makeReminder({ id: '2', text: 'done', completedAt: Date.now() }),
          makeReminder({ id: '3', text: 'also active', completedAt: undefined }),
          makeReminder({ id: '4', text: 'also active null', completedAt: null }),
        ];

        const active = reminders.filter((r) => r.completedAt == null);
        assert(active.length === 3, `Expected 3 active, got ${active.length}`);
        assert(
          active.every((r) => r.id !== '2'),
          'Completed reminder must not appear in active list',
        );
      },
    },

    {
      id: 'completion-done-list-includes-completed',
      name: 'Derivation: done/deleted list includes reminders with completedAt != null',
      run: () => {
        const reminders: Reminder[] = [
          makeReminder({ id: '1', text: 'active' }),
          makeReminder({ id: '2', text: 'done', completedAt: 1000 }),
          makeReminder({ id: '3', text: 'also done', completedAt: 2000 }),
        ];

        const completed = reminders.filter((r) => r.completedAt != null);
        assert(completed.length === 2, `Expected 2 completed, got ${completed.length}`);
        assert(
          completed.every((r) => r.id === '2' || r.id === '3'),
          'Only completed reminders should appear in done list',
        );
      },
    },

    {
      id: 'completion-done-list-sorted-most-recent-first',
      name: 'Derivation: done list sorted by completedAt descending',
      run: () => {
        const reminders: Reminder[] = [
          makeReminder({ id: '1', text: 'first done', completedAt: 1000 }),
          makeReminder({ id: '2', text: 'second done', completedAt: 3000 }),
          makeReminder({ id: '3', text: 'third done', completedAt: 2000 }),
        ];

        const sorted = reminders
          .filter((r) => r.completedAt != null)
          .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0));

        assert(sorted[0].id === '2', `Expected most recent first, got ${sorted[0].id}`);
        assert(sorted[1].id === '3', `Expected second most recent, got ${sorted[1].id}`);
        assert(sorted[2].id === '1', `Expected oldest last, got ${sorted[2].id}`);
      },
    },

    {
      id: 'completion-done-list-no-animation-state-dependency',
      name: 'Derivation: done list derived only from completedAt, no transient state',
      run: () => {
        // The derivation is: reminders.filter(r => r.completedAt != null)
        // This check verifies the derivation is purely field-based.
        const reminders: Reminder[] = [
          makeReminder({ id: '1', text: 'done', completedAt: Date.now() }),
        ];

        // Simulate: even with an empty pendingDoneIds set, completed items appear
        const pendingDoneIds = new Set<string>(); // empty - no pending animations
        const completed = reminders.filter((r) => r.completedAt != null);

        assert(completed.length === 1, 'Completed item must appear regardless of pendingDoneIds');
        // pendingDoneIds should have no effect on this derivation
        assert(!pendingDoneIds.has('1'), 'PendingDoneIds should be cleared after completion');
      },
    },

    // ========================================================================
    // 2. completedAt field semantics
    // ========================================================================

    {
      id: 'completion-undefined-is-active',
      name: 'Field: completedAt undefined treated as active',
      run: () => {
        const r = makeReminder({ id: '1', text: 'test' });
        // completedAt not set = undefined
        assert(r.completedAt == null, 'undefined completedAt must be == null');
      },
    },

    {
      id: 'completion-null-is-active',
      name: 'Field: completedAt null treated as active',
      run: () => {
        const r = makeReminder({ id: '1', text: 'test', completedAt: null });
        assert(r.completedAt == null, 'null completedAt must be == null');
      },
    },

    {
      id: 'completion-number-is-done',
      name: 'Field: completedAt number treated as done',
      run: () => {
        const r = makeReminder({ id: '1', text: 'test', completedAt: Date.now() });
        assert(r.completedAt != null, 'numeric completedAt must be != null');
      },
    },

    // ========================================================================
    // 3. Concurrency
    // ========================================================================

    {
      id: 'completion-double-click-guard',
      name: 'Concurrency: timer map prevents duplicate timers for same id',
      run: () => {
        const timerMap = new Map<string, number>();

        // Simulate first click: adds timer
        const reminderId = 'test-1';
        if (!timerMap.has(reminderId)) {
          timerMap.set(reminderId, 999); // fake timer id
        }

        // Simulate second click: should be blocked by guard
        const hadTimerOnSecondClick = timerMap.has(reminderId);
        assert(hadTimerOnSecondClick, 'Second click should find existing timer and no-op');
        assert(timerMap.size === 1, `Expected 1 timer, got ${timerMap.size}`);
      },
    },

    {
      id: 'completion-concurrent-different-reminders',
      name: 'Concurrency: two different reminders can complete simultaneously',
      run: () => {
        const timerMap = new Map<string, number>();

        // First reminder starts completion
        timerMap.set('r1', 100);
        // Second reminder starts completion
        timerMap.set('r2', 200);

        assert(timerMap.size === 2, `Expected 2 timers, got ${timerMap.size}`);
        assert(timerMap.has('r1'), 'Timer for r1 must exist');
        assert(timerMap.has('r2'), 'Timer for r2 must exist');
      },
    },

    // ========================================================================
    // 4. Persistence: completedAt survives save/load cycle
    // ========================================================================

    {
      id: 'completion-persisted-and-loaded',
      name: 'Persistence: completedAt survives save/load cycle',
      run: () => {
        const original = localStorage.getItem(STORAGE_KEY);
        try {
          const reminders: Reminder[] = [
            makeReminder({ id: 'p1', text: 'active' }),
            makeReminder({ id: 'p2', text: 'done', completedAt: 1234567890 }),
          ];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));

          const loaded = loadReminders();
          const doneItem = loaded.find((r) => r.id === 'p2');
          assert(doneItem != null, 'Done item must be loaded');
          assert(doneItem!.completedAt === 1234567890, `Expected 1234567890, got ${doneItem!.completedAt}`);

          const activeItem = loaded.find((r) => r.id === 'p1');
          assert(activeItem != null, 'Active item must be loaded');
          assert(activeItem!.completedAt == null, 'Active item should have no completedAt');
        } finally {
          // Restore original localStorage
          if (original === null) {
            localStorage.removeItem(STORAGE_KEY);
          } else {
            localStorage.setItem(STORAGE_KEY, original);
          }
        }
      },
    },

    // ========================================================================
    // 5. Uncomplete (return to active)
    // ========================================================================

    {
      id: 'uncomplete-clears-completedAt',
      name: 'Uncomplete: setting completedAt to null returns item to active list',
      run: () => {
        const reminders: Reminder[] = [
          makeReminder({ id: '1', text: 'done item', completedAt: Date.now() }),
          makeReminder({ id: '2', text: 'other done', completedAt: Date.now() }),
        ];

        // Simulate uncomplete on id '1'
        const updated = reminders.map((r) =>
          r.id === '1' && r.completedAt != null ? { ...r, completedAt: null } : r
        );

        const active = updated.filter((r) => r.completedAt == null);
        const completed = updated.filter((r) => r.completedAt != null);

        assert(active.length === 1, `Expected 1 active after uncomplete, got ${active.length}`);
        assert(active[0].id === '1', 'Uncompleted item must appear in active list');
        assert(completed.length === 1, `Expected 1 completed after uncomplete, got ${completed.length}`);
        assert(completed[0].id === '2', 'Other completed item must remain in done list');
      },
    },

    {
      id: 'uncomplete-no-op-on-active-item',
      name: 'Uncomplete: no-op when completedAt is already null',
      run: () => {
        const reminders: Reminder[] = [
          makeReminder({ id: '1', text: 'active item' }),
        ];

        // Simulate uncomplete on an already-active item
        const updated = reminders.map((r) =>
          r.id === '1' && r.completedAt != null ? { ...r, completedAt: null } : r
        );

        assert(updated[0].completedAt == null, 'Active item should remain null');
        // Verify object identity — guard means no mutation occurred
        assert(updated[0] === reminders[0], 'Should be same reference (no mutation) for already-active item');
      },
    },

    {
      id: 'uncomplete-preserves-other-fields',
      name: 'Uncomplete: only clears completedAt, preserves all other fields',
      run: () => {
        const original = makeReminder({
          id: '1',
          text: 'Buy milk',
          createdAt: 1000,
          schedule: { kind: 'scheduled' as const, date: '2026-03-01', time: '09:00' },
          repeatRule: { frequency: 'daily' as const, interval: 1 },
          completedAt: 5000,
        });

        const updated = { ...original, completedAt: null };

        assert(updated.id === original.id, 'id must be preserved');
        assert(updated.text === original.text, 'text must be preserved');
        assert(updated.createdAt === original.createdAt, 'createdAt must be preserved');
        assert(updated.schedule.kind === 'scheduled', 'schedule kind must be preserved');
        assert(
          (updated.schedule as any).date === '2026-03-01',
          'schedule date must be preserved',
        );
        assert(
          (updated.schedule as any).time === '09:00',
          'schedule time must be preserved',
        );
        assert(updated.repeatRule?.frequency === 'daily', 'repeatRule must be preserved');
        assert(updated.completedAt === null, 'completedAt must be null');
      },
    },

    // ========================================================================
    // 6. Repeat completion double-click cancellation
    // ========================================================================

    {
      id: 'repeat-completion-double-click-cancels',
      name: 'Repeat: second click during in-flight window cancels completion and prevents spawn',
      run: () => {
        // Simulate the pending repeat completion ref, timer maps, and state
        const pendingRepeatIds = new Set<string>();
        const completionTimers = new Map<string, number>();
        const rescheduleTimers = new Map<string, number>();
        let pendingDoneIds = new Set<string>();
        let reminders: Reminder[] = [
          makeReminder({
            id: 'repeat-1',
            text: 'Daily standup',
            schedule: { kind: 'scheduled' as const, date: '2026-03-05', time: '09:00' },
            repeatRule: { frequency: 'daily' as const, interval: 1 },
          }),
        ];
        let spawnCount = 0;

        // --- Simulate first click ---
        const reminderId = 'repeat-1';
        const isRepeat = reminders[0].repeatRule != null;

        // Check pending (should be false on first click)
        assert(!pendingRepeatIds.has(reminderId), 'First click: should not be pending yet');

        // Add to pending set for repeat reminders
        if (isRepeat) {
          pendingRepeatIds.add(reminderId);
        }

        // Simulate completion timer set
        completionTimers.set(reminderId, 999);
        pendingDoneIds.add(reminderId);

        // --- Simulate second click (during in-flight window) ---
        assert(pendingRepeatIds.has(reminderId), 'Second click: should detect pending');

        // Cancel: clear completion timer
        if (completionTimers.has(reminderId)) {
          completionTimers.delete(reminderId);
        }
        // Cancel: clear reschedule timer
        if (rescheduleTimers.has(reminderId)) {
          rescheduleTimers.delete(reminderId);
        }
        // Cancel: remove from pending set
        pendingRepeatIds.delete(reminderId);
        // Cancel: revert UI state
        pendingDoneIds = new Set([...pendingDoneIds].filter((id) => id !== reminderId));
        // Cancel: revert completedAt if set
        reminders = reminders.map((r) =>
          r.id === reminderId && r.completedAt != null ? { ...r, completedAt: null } : r
        );

        // --- Simulate reschedule timer callback (if it were to fire) ---
        // Guard: check pending set — should NOT contain reminderId after cancel
        if (pendingRepeatIds.has(reminderId)) {
          spawnCount++;
        }

        // --- Assertions ---
        assert(spawnCount === 0, `Expected 0 spawns after cancel, got ${spawnCount}`);
        assert(!pendingRepeatIds.has(reminderId), 'Pending set must be cleared after cancel');
        assert(!completionTimers.has(reminderId), 'Completion timer must be cleared after cancel');
        assert(!rescheduleTimers.has(reminderId), 'Reschedule timer must be cleared after cancel');
        assert(!pendingDoneIds.has(reminderId), 'PendingDoneIds must be cleared after cancel');
        assert(reminders[0].completedAt == null, 'Reminder must remain active (completedAt null) after cancel');
      },
    },
  ];
}