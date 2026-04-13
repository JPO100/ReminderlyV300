import type { Reminder } from "../reminder-utils";

export type ListItem = {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: number | null;
};

export type CreatedList = {
  id: string;
  title: string;
  items: ListItem[];
  sortMode?: 'alphabetical' | 'insertion';
  smartReminders?: boolean;
  smartReminderDueDate?: string | null;
  status?: 'active' | 'done' | 'deleted';
  statusChangedAt?: number | null;
};

export type ListCategory = 'complete' | 'almost' | 'started' | 'todo';

export function dateToStorageString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function storageStringToDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function formatListDueDate(value: string | null | undefined, now: Date = new Date()): string {
  const date = storageStringToDate(value);
  if (!date) return 'Jan 1 2026';
  const month = date.toLocaleString('en-US', { month: 'short' });
  const currentYear = now.getFullYear();
  if (date.getFullYear() === currentYear) {
    return `${month} ${date.getDate()}`;
  }
  return `${month} ${date.getDate()} '${String(date.getFullYear()).slice(-2)}`;
}

export function buildSmartReminderText(list: CreatedList): string {
  const total = list.items.length;
  const completed = list.items.filter((item) => item.completed).length;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  if (progress <= 0) {
    return `Complete '${list.title}' list`;
  }
  if (progress < 75) {
    return `Finish '${list.title}' list`;
  }
  return `Nearly done - '${list.title}'`;
}

export function createSmartReminderForList(
  list: CreatedList,
  options?: { idFactory?: () => string; createdAt?: number },
): Reminder | null {
  if (!list.smartReminderDueDate) return null;
  const text = buildSmartReminderText(list);
  return {
    id: options?.idFactory?.() ?? crypto.randomUUID(),
    originalText: text,
    displayText: text,
    createdAt: options?.createdAt ?? Date.now(),
    schedule: { kind: "scheduled", date: list.smartReminderDueDate, time: "12:00" },
    linkedListId: list.id,
    isSmartReminder: true,
  };
}

export function getCurrentListCategory(items: ListItem[]): ListCategory {
  const total = items.length;
  const checked = items.filter((item) => item.completed).length;
  if (total > 0 && checked === total) return "complete";
  if (total > 0 && checked / total >= 0.5) return "almost";
  if (checked > 0) return "started";
  return "todo";
}

export function getDisplayListItems(
  listItems: ListItem[],
  sortMode: 'alphabetical' | 'insertion',
  alphabeticalPinnedListItemId: string | null,
  alphabeticalPinnedListItemIndex: number,
): ListItem[] {
  if (sortMode !== 'alphabetical') {
    const incompleteItems: ListItem[] = [];
    const completedItems: Array<ListItem & { originalIndex: number }> = [];

    listItems.forEach((item, index) => {
      if (item.completed) {
        completedItems.push({ ...item, originalIndex: index });
        return;
      }
      incompleteItems.push(item);
    });

    completedItems.sort((a, b) => {
      const completedAtDiff = (b.completedAt ?? 0) - (a.completedAt ?? 0);
      if (completedAtDiff !== 0) return completedAtDiff;
      return a.originalIndex - b.originalIndex;
    });

    return [
      ...incompleteItems,
      ...completedItems.map(({ originalIndex: _originalIndex, ...item }) => item),
    ];
  }

  const alphabeticalSort = (a: ListItem, b: ListItem) => a.text.localeCompare(b.text);
  const incompleteItems = listItems.filter((item) => !item.completed).sort(alphabeticalSort);
  const completedItems = listItems.filter((item) => item.completed).sort(alphabeticalSort);
  const sortedItems = [...incompleteItems, ...completedItems];

  if (!alphabeticalPinnedListItemId) {
    return sortedItems;
  }

  const pinnedItem = listItems.find((item) => item.id === alphabeticalPinnedListItemId);
  const remainingItems = sortedItems.filter((item) => item.id !== alphabeticalPinnedListItemId);
  if (!pinnedItem) return remainingItems;

  const insertIndex = Math.max(0, Math.min(alphabeticalPinnedListItemIndex, remainingItems.length));
  return [
    ...remainingItems.slice(0, insertIndex),
    pinnedItem,
    ...remainingItems.slice(insertIndex),
  ];
}
