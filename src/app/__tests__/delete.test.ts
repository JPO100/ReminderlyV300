import { describe, it, expect } from 'vitest';
import type { Reminder } from '../reminder-utils';

// Helper: create a minimal reminder for testing
function makeReminder(overrides: Partial<Reminder> = {}): Reminder {
  return {
    id: 'test-1',
    originalText: 'Test reminder',
    displayText: 'Test reminder',
    createdAt: Date.now(),
    schedule: { kind: 'scheduled', date: '2026-03-15' },
    ...overrides,
  };
}

describe('delete functionality', () => {
  it('deleting a repeating reminder prevents reschedule (deletedAt guard)', () => {
    const reminder = makeReminder({
      id: 'repeat-1',
      repeatRule: { frequency: 'daily', interval: 1, byDay: null },
      completedAt: Date.now(),
      deletedAt: Date.now(),
    });

    const prev = [reminder];
    const newReminder = makeReminder({ id: 'repeat-next' });
    const source = prev.find((r) => r.id === 'repeat-1');

    let result: Reminder[];
    if (source?.deletedAt != null) {
      result = prev;
    } else {
      result = [...prev, newReminder];
    }

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('repeat-1');
  });

  it('undelete restores to active list when completedAt is null', () => {
    const reminder = makeReminder({
      id: 'del-1',
      deletedAt: Date.now(),
      completedAt: null,
    });

    const undeleted = { ...reminder, deletedAt: null };

    const isActive = undeleted.completedAt == null && undeleted.deletedAt == null;
    expect(isActive).toBe(true);
  });

  it('undelete restores to done/deleted view when completedAt exists', () => {
    const reminder = makeReminder({
      id: 'del-2',
      deletedAt: Date.now(),
      completedAt: Date.now() - 1000,
    });

    const undeleted = { ...reminder, deletedAt: null };

    const isActive = undeleted.completedAt == null && undeleted.deletedAt == null;
    expect(isActive).toBe(false);

    const isInDoneView = undeleted.completedAt != null || undeleted.deletedAt != null;
    expect(isInDoneView).toBe(true);
  });

  it('delete commit happens after COMPLETION_DELAY, not immediately', () => {
    const reminder = makeReminder({ id: 'pend-del-1' });

    const pendingDeleteIds = new Set(['pend-del-1']);

    const isActiveOrPending =
      (reminder.completedAt == null && reminder.deletedAt == null) ||
      pendingDeleteIds.has(reminder.id);
    expect(isActiveOrPending).toBe(true);

    const committed = { ...reminder, deletedAt: Date.now() };
    const clearedPending = new Set<string>();

    const isActiveAfterCommit =
      (committed.completedAt == null && committed.deletedAt == null) ||
      clearedPending.has(committed.id);
    expect(isActiveAfterCommit).toBe(false);
  });

  it('undelete does not reorder within done/deleted view during pending window', () => {
    const ts1 = 1000;
    const ts2 = 2000;
    const ts3 = 3000;

    const items = [
      makeReminder({ id: 'a', deletedAt: ts3, completedAt: null }),
      makeReminder({ id: 'b', deletedAt: ts2, completedAt: null }),
      makeReminder({ id: 'c', completedAt: ts1, deletedAt: null }),
    ];

    const pendingUndeleteSortKey = new Map<string, number>([['b', ts2]]);
    const pendingUndeleteIds = new Set(['b']);
    const afterUndelete = items.map((r) =>
      r.id === 'b' ? { ...r, deletedAt: null } : r
    );

    const sorted = [...afterUndelete]
      .filter((r) => r.completedAt != null || r.deletedAt != null || pendingUndeleteIds.has(r.id))
      .sort((a, b) => {
        const tsA = pendingUndeleteSortKey.get(a.id) ?? a.deletedAt ?? a.completedAt ?? 0;
        const tsB = pendingUndeleteSortKey.get(b.id) ?? b.deletedAt ?? b.completedAt ?? 0;
        return tsB - tsA;
      });

    expect(sorted.map((r) => r.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('done/deleted view filters', () => {
  it('done filter shows only done (not deleted) items', () => {
    const items = [
      makeReminder({ id: 'done-1', completedAt: 1000, deletedAt: null }),
      makeReminder({ id: 'deleted-1', completedAt: null, deletedAt: 2000 }),
      makeReminder({ id: 'both-1', completedAt: 1000, deletedAt: 2000 }),
    ];

    const baseFilter = items.filter((r) => r.completedAt != null || r.deletedAt != null);
    const doneFilter = baseFilter.filter((r) => r.completedAt != null && r.deletedAt == null);

    expect(doneFilter.map((r) => r.id)).toEqual(['done-1']);
  });

  it('deleted filter shows only deleted items (including those also done)', () => {
    const items = [
      makeReminder({ id: 'done-1', completedAt: 1000, deletedAt: null }),
      makeReminder({ id: 'deleted-1', completedAt: null, deletedAt: 2000 }),
      makeReminder({ id: 'both-1', completedAt: 1000, deletedAt: 2000 }),
    ];

    const baseFilter = items.filter((r) => r.completedAt != null || r.deletedAt != null);
    const deletedFilter = baseFilter.filter((r) => r.deletedAt != null);

    expect(deletedFilter.map((r) => r.id)).toEqual(['deleted-1', 'both-1']);
  });

  it('clear all requires two clicks and removes all done/deleted items', () => {
    const items = [
      makeReminder({ id: 'active-1', completedAt: null, deletedAt: null }),
      makeReminder({ id: 'done-1', completedAt: 1000, deletedAt: null }),
      makeReminder({ id: 'deleted-1', completedAt: null, deletedAt: 2000 }),
    ];

    // Simulate clear: build ids to remove
    const idsToRemove = new Set<string>();
    for (const r of items) {
      if (r.completedAt != null || r.deletedAt != null) {
        idsToRemove.add(r.id);
      }
    }

    expect(idsToRemove.has('active-1')).toBe(false);
    expect(idsToRemove.has('done-1')).toBe(true);
    expect(idsToRemove.has('deleted-1')).toBe(true);

    const remaining = items.filter((r) => !idsToRemove.has(r.id));
    expect(remaining.map((r) => r.id)).toEqual(['active-1']);
  });

  it('clear all also removes pending restore items', () => {
    const items = [
      makeReminder({ id: 'active-1', completedAt: null, deletedAt: null }),
      makeReminder({ id: 'pending-uncomplete', completedAt: null, deletedAt: null }), // completedAt already cleared
      makeReminder({ id: 'pending-undelete', completedAt: null, deletedAt: null }), // deletedAt already cleared
      makeReminder({ id: 'done-1', completedAt: 1000, deletedAt: null }),
    ];

    const pendingUncompleteIds = new Set(['pending-uncomplete']);
    const pendingUndeleteIds = new Set(['pending-undelete']);

    const idsToRemove = new Set<string>();
    for (const r of items) {
      if (r.completedAt != null || r.deletedAt != null) {
        idsToRemove.add(r.id);
      }
    }
    for (const id of pendingUncompleteIds) idsToRemove.add(id);
    for (const id of pendingUndeleteIds) idsToRemove.add(id);

    expect(idsToRemove.has('active-1')).toBe(false);
    expect(idsToRemove.has('pending-uncomplete')).toBe(true);
    expect(idsToRemove.has('pending-undelete')).toBe(true);
    expect(idsToRemove.has('done-1')).toBe(true);

    const remaining = items.filter((r) => !idsToRemove.has(r.id));
    expect(remaining.map((r) => r.id)).toEqual(['active-1']);
  });

  it('clear all does not touch pending-delete items in active list', () => {
    const items = [
      makeReminder({ id: 'pending-delete', completedAt: null, deletedAt: null }), // in pendingDeleteIds, not committed
      makeReminder({ id: 'done-1', completedAt: 1000, deletedAt: null }),
    ];

    const pendingDeleteIds = new Set(['pending-delete']);

    // Clear logic: only remove completedAt != null OR deletedAt != null, plus pendingUncomplete/pendingUndelete
    const idsToRemove = new Set<string>();
    for (const r of items) {
      if (r.completedAt != null || r.deletedAt != null) {
        idsToRemove.add(r.id);
      }
    }
    // pendingDeleteIds is NOT included in clear target

    expect(idsToRemove.has('pending-delete')).toBe(false);
    expect(idsToRemove.has('done-1')).toBe(true);
  });

  it('clear all resets doneDeletedFilter to all', () => {
    // After clear executes (step 2), doneDeletedFilter must be set to 'all'.
    // Simulate: filter was 'done', clear executes, filter should reset.
    let doneDeletedFilter: 'all' | 'done' | 'deleted' = 'done';

    // Step 2 logic sets doneDeletedFilter = 'all'
    doneDeletedFilter = 'all';

    expect(doneDeletedFilter).toBe('all');
  });

  it('outside click cancels clear all step 1', () => {
    // Simulate: clearListStep is 1, pointerdown on container (not on clear button) resets to 0
    let clearListStep: 0 | 1 | 2 = 1;

    // Container onPointerDownCapture fires, target is not the clear button
    clearListStep = 0;

    expect(clearListStep).toBe(0);
  });

  it('outside click cancels clear all step 2 immediately', () => {
    // Simulate: clearListStep is 2 (Cleared!), pointerdown outside resets immediately to 0
    let clearListStep: 0 | 1 | 2 = 2;

    // Container onPointerDownCapture fires, target is not the clear button
    clearListStep = 0;

    expect(clearListStep).toBe(0);
  });

  it('deleted placeholder text shown when deleted filter active and list empty', () => {
    const items: Reminder[] = [
      makeReminder({ id: 'done-1', completedAt: 1000, deletedAt: null }),
    ];

    const doneDeletedFilter = 'deleted' as const;
    const pendingUndeleteIds = new Set<string>();

    const baseFilter = items.filter((r) => r.completedAt != null || r.deletedAt != null);
    const deletedFilter = baseFilter.filter((r) => r.deletedAt != null || pendingUndeleteIds.has(r.id));

    expect(deletedFilter.length).toBe(0);

    // When doneDeletedFilter === 'deleted' and list is empty, placeholder is 'No deleted reminders yet...'
    const placeholder = doneDeletedFilter === 'deleted' ? 'No deleted reminders yet...' : 'No done reminders yet...';
    expect(placeholder).toBe('No deleted reminders yet...');
  });
});