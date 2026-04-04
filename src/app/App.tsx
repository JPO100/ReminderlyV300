import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../imports/svg-tzdfx9foxi";
import doneTickPaths from "../imports/svg-c9judk5sbu";
import NewReminderOverlay from "../imports/NewReminderOverlay";
import DevToolsOverlay from "./components/DevToolsOverlay";
import RepeatsOverlay from "./components/RepeatsOverlay";
import ReminderInfoOverlay from "./components/ReminderInfoOverlay";
import SettingsOverlay from "./components/SettingsOverlay";
import TutorialOverlay from "./components/TutorialOverlay";
import type { RepeatRule } from "./types/reminder";
import type { NlcMode } from "./utils/nlc-interaction";
import { renderReminderText, getDisplayTitle } from "./utils/render-text";
import { STORAGE_KEY, loadReminders, isOverdue, categoriseReminder, sortReminders, formatRepeatLabel } from "./reminder-utils";
import type { Reminder, ReminderCategory, ReminderSchedule, RepeatConfig, ViewMode, FiltersMenuVariant } from "./reminder-utils";
import { formatTime12h } from "./utils/normalise-text";
import { formatSelectedDate } from "../imports/NewReminderOverlay";
import { scheduleEquality } from "./utils/schedule";
import { PENDING_NOTIFICATION_REMINDER_ID_KEY, syncReminderNotifications } from "./notifications";
import { useNotificationTapHandler } from "./useNotificationTapHandler";
import laterBtnPaths from "../imports/svg-0tntgsesap";
import LaterBtn from "../imports/LaterBtn-146-39";
import ListsHeader from "../imports/Header";
import InfoOverlay from "../imports/InfoOverlay";
import ListInfoOverlay from "../imports/list-info-overlay";
import AddListItemInput from "./components/lists/AddListItemInput";
import EditableListItem from "./components/lists/EditableListItem";
import { CompletedCircleIcon } from "./components/icons/ReminderStateIcons";

// Category colours matching existing static component tick circles
const CATEGORY_COLOURS: Record<string, string> = {
  today: "#00AFEE",
  "this-week": "#DF4DFC",
  later: "#FAA429",
  sometime: "#939393",
  other: "#FAA429",
};

const LIST_CATEGORY_PILL_COLOURS: Record<string, string> = {
  complete: "#0D45A0",
  almost: "#9468D5",
  started: "#00AFEE",
  todo: "#939393",
  "grouped-todo": "#939393",
};

// Overdue colour for overdue reminders
const OVERDUE_COLOUR = "#FF0000";

// Reminderly dark blue constant for done styling
const DONE_BLUE = "#1C2C42";

// Deleted grey constant for deleted styling
const DELETED_GREY = "#939393";

// Completion delay before setting completedAt (ms)
const COMPLETION_DELAY = 350; // ms 

// Delay after completedAt is set before rescheduling a repeating reminder (ms)
const RESCHEDULE_DELAY = 1000;

// Delay before showing empty-state message (ms)
const EMPTY_STATE_DELAY = 350;

// Delay before inserting a newly created reminder into the list (ms)
// Allows the overlay slide-down to finish before the row fades in.
const NEW_REMINDER_INSERT_DELAY = 500;

// Duration of the temporary "just inserted" text/icon highlight (ms)
const INSERT_HIGHLIGHT_MS = 1000;

type ListItem = { id: string; text: string; completed: boolean };
type CreatedList = {
  id: string;
  title: string;
  items: ListItem[];
  sortMode?: 'alphabetical' | 'insertion';
  smartReminders?: boolean;
  completedAt?: number | null;
};

function RowMenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="relative shrink-0 self-stretch w-[20px] cursor-pointer flex items-center justify-center"
      style={{ padding: 0, background: 'none', border: 'none', lineHeight: 0 }}
      aria-label="Item menu"
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick?.();
      }}
    >
      <div className="flex flex-row items-center justify-center gap-[3px]">
        <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
        <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
        <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
      </div>
    </button>
  );
}

// Playful default list names - one is picked at random for each new list
const DEFAULT_LIST_NAMES = [
  "Stuff to do...",
  "Don't forget...",
  "Getting it done...",
  "On my radar...",
  "Things & stuff...",
  "Brain dump...",
  "Sort this out...",
  "The game plan...",
  "Bits & bobs...",
  "On the list...",
  "Need to handle...",
  "The rundown...",
  "Top of mind...",
  "Note to self...",
  "The essentials...",
];

function persistStringIfChanged(key: string, value: string) {
  if (localStorage.getItem(key) === value) return;
  localStorage.setItem(key, value);
}

/** Pick a random default name, avoiding titles already used by existing lists */
function pickDefaultListName(existingTitles: string[]): string {
  const used = new Set(existingTitles);
  const available = DEFAULT_LIST_NAMES.filter((n) => !used.has(n));
  const pool = available.length > 0 ? available : DEFAULT_LIST_NAMES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Pure helper: compute next occurrence for a repeating reminder.
// Always computes relative to the scheduled datetime being completed, never relative to "now".
function getNextOccurrence(baseDateTime: Date, repeatRule: RepeatRule): Date {
  const { frequency, interval, byDay } = repeatRule;

  // Weekly with byDay: find the next matching weekday
  if (frequency === 'weekly' && byDay && byDay.length > 0) {
    // Convert byDay abbreviations to JS weekday indices (0=Sun, 1=Mon, ..., 6=Sat)
    const abbrevToIndex: Record<string, number> = {
      su: 0, mo: 1, tu: 2, we: 3, th: 4, fr: 5, sa: 6,
    };
    const allowedDays = new Set(byDay.map((d) => abbrevToIndex[d]).filter((n) => n !== undefined));

    // Walk forward day by day from baseDateTime + 1 day, up to 365 days
    for (let offset = 1; offset <= 365; offset++) {
      const candidate = new Date(baseDateTime);
      candidate.setDate(candidate.getDate() + offset);
      const candidateDay = candidate.getDay();

      if (!allowedDays.has(candidateDay)) continue;

      // Check interval: how many full weeks between base week and candidate week
      const weekDistance = Math.floor(offset / 7);
      if (weekDistance % interval === 0) {
        return candidate;
      }
    }
    // Fallback: should not reach here for valid inputs; advance 7 * interval days
    const fallback = new Date(baseDateTime);
    fallback.setDate(fallback.getDate() + 7 * interval);
    return fallback;
  }

  switch (frequency) {
    case 'hourly': {
      const next = new Date(baseDateTime);
      next.setHours(next.getHours() + interval);
      return next;
    }
    case 'daily': {
      const next = new Date(baseDateTime);
      next.setDate(next.getDate() + interval);
      return next;
    }
    case 'weekly': {
      // Plain weekly (no byDay)
      const next = new Date(baseDateTime);
      next.setDate(next.getDate() + 7 * interval);
      return next;
    }
    case 'monthly': {
      const originalDay = baseDateTime.getDate();
      const targetMonth = baseDateTime.getMonth() + interval;
      const next = new Date(baseDateTime.getFullYear(), targetMonth, originalDay,
        baseDateTime.getHours(), baseDateTime.getMinutes(), 0, 0);
      // Clamp if month overflowed (e.g. 31st → next month rolled to following month)
      if (next.getDate() !== originalDay) {
        // Last day of intended month: day 0 of the next month
        const clamped = new Date(baseDateTime.getFullYear(), targetMonth + 1, 0,
          baseDateTime.getHours(), baseDateTime.getMinutes(), 0, 0);
        return clamped;
      }
      return next;
    }
    case 'yearly': {
      const originalMonth = baseDateTime.getMonth();
      const originalDay = baseDateTime.getDate();
      const targetYear = baseDateTime.getFullYear() + interval;
      const next = new Date(targetYear, originalMonth, originalDay,
        baseDateTime.getHours(), baseDateTime.getMinutes(), 0, 0);
      // Clamp for Feb 29 on non-leap years
      if (next.getMonth() !== originalMonth || next.getDate() !== originalDay) {
        const clamped = new Date(targetYear, originalMonth + 1, 0,
          baseDateTime.getHours(), baseDateTime.getMinutes(), 0, 0);
        return clamped;
      }
      return next;
    }
    default:
      // Unknown frequency — fallback: advance 1 day
      const fallback = new Date(baseDateTime);
      fallback.setDate(fallback.getDate() + 1);
      return fallback;
  }
}

// Format a Date to yyyy-mm-dd string
function formatDateToSchedule(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Format a Date to HH:mm string
function formatTimeToSchedule(d: Date): string {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

// Small component: delays rendering of empty-state text by EMPTY_STATE_DELAY ms
function DelayedEmptyState({ message }: { message: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), EMPTY_STATE_DELAY);
    return () => clearTimeout(timer);
  }, []);
  if (!visible) return <div className="flex items-center justify-center flex-1 w-full" />;
  return (
    <div className="flex items-center justify-center flex-1 w-full">
      <p className="font-['Lato',sans-serif] text-[17px] text-[#CCCCCC]">
        {message}
      </p>
    </div>
  );
}

export default function App() {
  const [reminders, setReminders] = useState<Reminder[]>(() => loadReminders());
  const [activeFilter, setActiveFilter] = useState<ReminderCategory | "all">("all");
  const [activeListFilter, setActiveListFilter] = useState<"all" | "complete" | "almost" | "started" | "todo" | "grouped-todo">("all");
  const [viewMode, setViewMode] = useState<ViewMode | 'lists-done'>("list");

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isListsOverlayOpen, setIsListsOverlayOpen] = useState(false);
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [listTitle, setListTitle] = useState("");
  const [createdLists, setCreatedLists] = useState<CreatedList[]>(() => {
    try {
      const stored = localStorage.getItem('reminderly-created-lists');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Migrate old string[] items to { text, completed } format
          return parsed.map((list: any) => ({
            ...list,
            items: Array.isArray(list.items) ? list.items.map((item: any) =>
              typeof item === 'string' ? { id: crypto.randomUUID(), text: item, completed: false } : { id: item.id || crypto.randomUUID(), text: item.text, completed: item.completed }
            ) : [],
            completedAt: list.completedAt ?? null,
          }));
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // UI-only: list settings overlay (cog button in overlay header)
  const [isListSettingsOpen, setIsListSettingsOpen] = useState(false);
  const [listInfoOverlayListId, setListInfoOverlayListId] = useState<string | null>(null);
  const [listSortMode, setListSortMode] = useState<'alphabetical' | 'insertion'>('insertion');
  const [listSmartReminders, setListSmartReminders] = useState(true);
  const handleSmartRemindersChange = (val: boolean) => {
    setListSmartReminders(val);
    if (editingListId) {
      setCreatedLists(prev => prev.map(l => l.id === editingListId ? { ...l, smartReminders: val } : l));
    }
  };

  // UI-only: list overlay mode tracking (create vs edit, kept separate from reminders)
  const [listOverlayMode, setListOverlayMode] = useState<'create' | 'edit'>('create');
  const [editingListId, setEditingListId] = useState<string | null>(null);

  // UI-only: list-specific insertion state (mirrors reminder insertion state, kept separate)
  const [listReinsertedId, setListReinsertedId] = useState<string | null>(null);
  const [listInsertHighlightId, setListInsertHighlightId] = useState<string | null>(null);
  const newListInsertTimerRef = useRef<number | null>(null);
  const listInsertHighlightTimerRef = useRef<number | null>(null);

  // UI-only: list-item-specific insertion state (mirrors list insertion state, for items within the overlay)
  const [listItemReinsertedId, setListItemReinsertedId] = useState<string | null>(null);
  const [listItemHighlightId, setListItemHighlightId] = useState<string | null>(null);
  const [revealedDeleteListItemId, setRevealedDeleteListItemId] = useState<string | null>(null);
  const [pendingDoneListIds, setPendingDoneListIds] = useState<Set<string>>(new Set());
  const [pendingUndoneListIds, setPendingUndoneListIds] = useState<Set<string>>(new Set());
  const pendingUndoneListCompletedAtRef = useRef<Map<string, number>>(new Map());
  const completeListTimersRef = useRef<Map<string, number>>(new Map());
  const undoListTimersRef = useRef<Map<string, number>>(new Map());
  const [alphabeticalPinnedListItemId, setAlphabeticalPinnedListItemId] = useState<string | null>(null);
  const [alphabeticalPinnedListItemIndex, setAlphabeticalPinnedListItemIndex] = useState<number>(0);
  const alphabeticalListItemTimerRef = useRef<number | null>(null);
  const currentListCategory = (() => {
    const total = listItems.length;
    const checked = listItems.filter((item) => item.completed).length;
    if (total > 0 && checked === total) return "complete";
    if (total > 0 && checked / total >= 0.5) return "almost";
    if (checked > 0) return "started";
    return "todo";
  })();
  const currentListAccentColor = LIST_CATEGORY_PILL_COLOURS[currentListCategory] || "#939393";
  const listItemHighlightTimerRef = useRef<number | null>(null);
  const listInfoOverlayList = listInfoOverlayListId == null
    ? null
    : createdLists.find((list) => list.id === listInfoOverlayListId) ?? null;
  const displayListItems = (() => {
    if (listSortMode !== 'alphabetical') return listItems;
    if (!alphabeticalPinnedListItemId) {
      return [...listItems].sort((a, b) => a.text.localeCompare(b.text));
    }

    const pinnedItem = listItems.find((item) => item.id === alphabeticalPinnedListItemId);
    const remainingItems = listItems
      .filter((item) => item.id !== alphabeticalPinnedListItemId)
      .sort((a, b) => a.text.localeCompare(b.text));
    if (!pinnedItem) return remainingItems;

    const insertIndex = Math.max(0, Math.min(alphabeticalPinnedListItemIndex, remainingItems.length));
    return [
      ...remainingItems.slice(0, insertIndex),
      pinnedItem,
      ...remainingItems.slice(insertIndex),
    ];
  })();

  useEffect(() => {
    if (listSortMode === 'alphabetical') return;
    if (alphabeticalListItemTimerRef.current !== null) {
      clearTimeout(alphabeticalListItemTimerRef.current);
      alphabeticalListItemTimerRef.current = null;
    }
    if (alphabeticalPinnedListItemId !== null) {
      setAlphabeticalPinnedListItemId(null);
      setAlphabeticalPinnedListItemIndex(0);
    }
  }, [listSortMode, alphabeticalPinnedListItemId]);

  useEffect(() => {
    return () => {
      if (alphabeticalListItemTimerRef.current !== null) {
        clearTimeout(alphabeticalListItemTimerRef.current);
      }
    };
  }, []);

  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isDevToolsUnlocked, setIsDevToolsUnlocked] = useState(false);
  const [isDevToolsPasswordRequired, setIsDevToolsPasswordRequired] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('reminderly-dev-tools-password-required');
      if (stored === 'false') return false;
      return true;
    } catch {
      return true;
    }
  });
  const [isRepeatsOverlayOpen, setIsRepeatsOverlayOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 0);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<number | null>(null);
  const [repeatConfig, setRepeatConfig] = useState<RepeatConfig>(null);

  // Transient visual-only set: ids currently in the 350ms "pending done" window.
  // Affects rendering only — never list membership or done/deleted derivation.
  const [pendingDoneIds, setPendingDoneIds] = useState<Set<string>>(new Set());

  // Transient visual-only set: ids currently in the 350ms "pending uncomplete" window.
  const [pendingUncompleteIds, setPendingUncompleteIds] = useState<Set<string>>(new Set());

  // Completion timer map: one timer per reminder id, cleared on unmount.
  const completionTimersRef = useRef<Map<string, number>>(new Map());

  // Uncomplete timer map: one timer per reminder id, cleared on unmount.
  const uncompleteTimersRef = useRef<Map<string, number>>(new Map());

  // Stores the original completedAt for pending-uncomplete items so the done/deleted sort stays stable.
  const pendingUncompleteCompletedAtRef = useRef<Map<string, number>>(new Map());

  // Transient visual-only set: ids currently in the 350ms "pending delete" window.
  const [pendingDeleteIds, setPendingDeleteIds] = useState<Set<string>>(new Set());

  // Delete timer map: one timer per reminder id, cleared on unmount.
  const pendingDeleteTimersRef = useRef<Map<string, number>>(new Map());

  // Transient visual-only set: ids currently in the 350ms "pending undelete" window.
  const [pendingUndeleteIds, setPendingUndeleteIds] = useState<Set<string>>(new Set());

  // Undelete timer map: one timer per reminder id, cleared on unmount.
  const undeleteTimersRef = useRef<Map<string, number>>(new Map());

  // Stores the original deletedAt for pending-undelete items so the done/deleted sort stays stable.
  const pendingUndeleteSortKeyRef = useRef<Map<string, number>>(new Map());

  // Reschedule timer map: one timer per repeating reminder id, for the 500ms delay after completedAt is set.
  const rescheduleTimersRef = useRef<Map<string, number>>(new Map());

  // Pending repeat completion ids: tracks repeat reminders in the full in-flight completion cycle.
  // Used to allow second-click cancellation and prevent duplicate spawn.
  const pendingRepeatCompletionIdsRef = useRef<Set<string>>(new Set());

  // Dev-only: NLC parsing mode for A/B testing (click vs auto)
  const [nlcMode, setNlcMode] = useState<NlcMode>('auto');

  // Dev-only: NLC feature flag — controls whether NLC parsing and UI are active
  const [nlcEnabled, setNlcEnabled] = useState(true);

  // Dev-only: onboarding tutorial feature flag — controls whether tutorial overlay is available
  const [isOnboardingTutorialEnabled, setIsOnboardingTutorialEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('reminderly-ff-onboarding-tutorial');
      if (stored === 'false') return false;
      return true;
    } catch {
      return true;
    }
  });

  // Dev-only: paywall feature flag — controls visibility of premium features
  const [isListsEnabled, setIsListsEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('dev.listsEnabled');
      if (stored === 'false') return false;
      return true;
    } catch {
      return true;
    }
  });

  // Lists mode: active main tab (reminders or lists)
  const [activeMainTab, setActiveMainTab] = useState<'reminders' | 'lists'>(() => {
    try {
      const stored = localStorage.getItem('reminderly-active-main-tab');
      if (stored === 'reminders' || stored === 'lists') return stored;
      return 'reminders';
    } catch {
      return 'reminders';
    }
  });

  // Dev-only: show tutorial on first launch toggle
  const [showTutorialOnFirstLaunch, setShowTutorialOnFirstLaunch] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('reminderly-ff-tutorial-first-launch');
      if (stored === 'false') return false;
      return true;
    } catch {
      return true;
    }
  });

  // Dev-only: show tutorial on every app start toggle
  const [showTutorialOnEveryStart, setShowTutorialOnEveryStart] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('reminderly-ff-tutorial-every-start');
      if (stored === 'true') return true;
      return false;
    } catch {
      return false;
    }
  });

  const [useOneMinuteTimeIncrements, setUseOneMinuteTimeIncrements] = useState<boolean>(() => {
    try {
      return localStorage.getItem('reminderly-dev-one-minute-time-increments') === 'true';
    } catch {
      return false;
    }
  });

  // Dev-only: filters menu variant for A/B testing (standard vs grouped)
  const [filtersMenuVariant, setFiltersMenuVariant] = useState<FiltersMenuVariant>(() => {
    try {
      const stored = localStorage.getItem('reminderly-filters-menu-variant');
      if (stored === 'standard' || stored === 'grouped') return stored;
      return 'grouped';
    } catch {
      return 'grouped';
    }
  });

  // Dev-only: hide overdue reminders from all views
  const [hideOverdue, setHideOverdue] = useState(false);

  // Setting: show date and time subtitles (persisted, default true)
  const [showDateAndTimeSubtitles, setShowDateAndTimeSubtitles] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('reminderly.showDateAndTimeSubtitles');
      if (stored === 'false') return false;
      return true;
    } catch {
      return true;
    }
  });

  // Conditional empty-placeholder delay: only active when the user removes the last visible item
  // in the current active list (complete or delete). Navigation-to-empty is always immediate.
  const emptyPlaceholderDelayRef = useRef<{ untilMs: number; filterKey: string } | null>(null);
  const [, setEmptyRerenderTick] = useState(0);

  const handleFiltersMenuVariantChange = (variant: FiltersMenuVariant) => {
    setFiltersMenuVariant(variant);
    setActiveFilter("all");
    setActiveListFilter("all");
  };

  // Reminder info overlay: the reminder currently shown (null = closed)
  const [infoReminder, setInfoReminder] = useState<Reminder | null>(null);

  // Timer ref for overlay mark-as-done 200ms delay
  const overlayDoneTimerRef = useRef<number | null>(null);

  // Timer ref for overlay edit 200ms delay
  const overlayEditTimerRef = useRef<number | null>(null);

  // State: which reminder is being edited (null = create mode)
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  // UI-only: id of reminder that just reinserted via repeat reschedule (drives fade-in)
  const [reinsertedId, setReinsertedId] = useState<string | null>(null);

  // UI-only: id of reminder currently showing the temporary insert highlight
  const [insertHighlightId, setInsertHighlightId] = useState<string | null>(null);

  // Timer ref for delayed new-reminder insertion (last-one-wins; single timer)
  const newReminderInsertTimerRef = useRef<number | null>(null);

  // Timer ref for clearing the insert highlight (last-one-wins; single timer)
  const insertHighlightTimerRef = useRef<number | null>(null);

  // Done/deleted view sub-filter: 'all' | 'done' | 'deleted'
  const [doneDeletedFilter, setDoneDeletedFilter] = useState<'all' | 'done' | 'deleted'>('all');

  // Clear list button 3-step state: 0=default, 1=confirm, 2=cleared
  const [clearListStep, setClearListStep] = useState<0 | 1 | 2>(0);

  // Timer ref for clear list 500ms reset after "Cleared!" state
  const clearListTimerRef = useRef<number | null>(null);

  // Ref for clear all button (used for outside-click detection)
  const clearAllButtonRef = useRef<HTMLButtonElement | null>(null);

  // Cleanup overlay done timer on unmount
  useEffect(() => {
    return () => {
      if (overlayDoneTimerRef.current !== null) {
        clearTimeout(overlayDoneTimerRef.current);
      }
    };
  }, []);

  // Cleanup overlay edit timer on unmount
  useEffect(() => {
    return () => {
      if (overlayEditTimerRef.current !== null) {
        clearTimeout(overlayEditTimerRef.current);
      }
    };
  }, []);

  // Cleanup all completion timers on unmount
  useEffect(() => {
    const timers = completionTimersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  // Cleanup all uncomplete timers on unmount
  useEffect(() => {
    const timers = uncompleteTimersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  // Cleanup all reschedule timers on unmount
  useEffect(() => {
    const timers = rescheduleTimersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  // Cleanup new-reminder insert timer on unmount
  useEffect(() => {
    return () => {
      if (newReminderInsertTimerRef.current !== null) {
        clearTimeout(newReminderInsertTimerRef.current);
      }
    };
  }, []);

  // Cleanup insert highlight timer on unmount
  useEffect(() => {
    return () => {
      if (insertHighlightTimerRef.current !== null) {
        clearTimeout(insertHighlightTimerRef.current);
      }
    };
  }, []);

  // Cleanup new-list insert timer on unmount
  useEffect(() => {
    return () => {
      if (newListInsertTimerRef.current !== null) {
        clearTimeout(newListInsertTimerRef.current);
      }
    };
  }, []);

  // Cleanup list insert highlight timer on unmount
  useEffect(() => {
    return () => {
      if (listInsertHighlightTimerRef.current !== null) {
        clearTimeout(listInsertHighlightTimerRef.current);
      }
    };
  }, []);

  // Cleanup list-item insert highlight timer on unmount
  useEffect(() => {
    return () => {
      if (listItemHighlightTimerRef.current !== null) {
        clearTimeout(listItemHighlightTimerRef.current);
      }
    };
  }, []);

  // Cleanup clear list timer on unmount
  useEffect(() => {
    return () => {
      if (clearListTimerRef.current !== null) {
        clearTimeout(clearListTimerRef.current);
      }
    };
  }, []);

  // Persist reminders to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged(STORAGE_KEY, JSON.stringify(reminders));
    } catch {
      // Fail silently - storage may be full or unavailable
    }
  }, [reminders]);

  useEffect(() => {
    void syncReminderNotifications(reminders);
  }, [reminders]);

  // Persist showDateAndTimeSubtitles to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('reminderly.showDateAndTimeSubtitles', String(showDateAndTimeSubtitles));
    } catch {
      // Fail silently
    }
  }, [showDateAndTimeSubtitles]);

  // Persist onboarding tutorial feature flag to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('reminderly-ff-onboarding-tutorial', String(isOnboardingTutorialEnabled));
    } catch {
      // Fail silently
    }
  }, [isOnboardingTutorialEnabled]);

  // Persist paywall feature flag to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('dev.listsEnabled', String(isListsEnabled));
    } catch {
      // Fail silently
    }
  }, [isListsEnabled]);

  // Persist tutorial first-launch toggle to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('reminderly-ff-tutorial-first-launch', String(showTutorialOnFirstLaunch));
    } catch {
      // Fail silently
    }
  }, [showTutorialOnFirstLaunch]);

  // Persist tutorial every-start toggle to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('reminderly-ff-tutorial-every-start', String(showTutorialOnEveryStart));
    } catch {
      // Fail silently
    }
  }, [showTutorialOnEveryStart]);

  useEffect(() => {
    try {
      persistStringIfChanged('reminderly-dev-one-minute-time-increments', String(useOneMinuteTimeIncrements));
    } catch {
      // Fail silently
    }
  }, [useOneMinuteTimeIncrements]);

  // Persist dev tools password required toggle to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('reminderly-dev-tools-password-required', String(isDevToolsPasswordRequired));
    } catch {
      // Fail silently
    }
  }, [isDevToolsPasswordRequired]);

  // Persist filters menu variant to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('reminderly-filters-menu-variant', filtersMenuVariant);
    } catch {
      // Fail silently
    }
  }, [filtersMenuVariant]);

  // Persist created lists to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('reminderly-created-lists', JSON.stringify(createdLists));
    } catch {
      // Fail silently
    }
  }, [createdLists]);

  // Persist active main tab to localStorage
  useEffect(() => {
    try {
      persistStringIfChanged('reminderly-active-main-tab', activeMainTab);
    } catch {
      // Fail silently
    }
  }, [activeMainTab]);

  useNotificationTapHandler({
    reminders,
    setIsTutorialOpen,
    setIsOverlayOpen,
    setIsListsOverlayOpen,
    setIsRepeatsOverlayOpen,
    setIsSettingsOpen,
    setViewMode,
    setActiveFilter,
    setInfoReminder,
  });

  // Auto-launch tutorial on mount based on toggle states
  useEffect(() => {
    const pendingTappedReminderId = localStorage.getItem(PENDING_NOTIFICATION_REMINDER_ID_KEY);
    if (pendingTappedReminderId) return;
    if (!isOnboardingTutorialEnabled) return;
    if (showTutorialOnEveryStart) {
      setIsTutorialOpen(true);
      return;
    }
    if (showTutorialOnFirstLaunch) {
      try {
        const alreadyShown = localStorage.getItem('reminderly-tutorial-first-launch-shown');
        if (alreadyShown !== 'true') {
          localStorage.setItem('reminderly-tutorial-first-launch-shown', 'true');
          setIsTutorialOpen(true);
        }
      } catch {
        // Fail silently
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-reset: when leaving grouped filters with subtitles off, reset to on
  useEffect(() => {
    if (filtersMenuVariant !== 'grouped' && !showDateAndTimeSubtitles) {
      setShowDateAndTimeSubtitles(true);
    }
  }, [filtersMenuVariant, showDateAndTimeSubtitles]);

  // Derived: whether subtitles should be shown
  const showSubtitles = !(filtersMenuVariant === 'grouped' && !showDateAndTimeSubtitles);

  // Derived: effective filter variant for rendering (lists mode forces standard)
  const effectiveFiltersVariant = isListsEnabled ? 'standard' : filtersMenuVariant;

  // Helper: cancel and delete entries for a given id from all timer maps.
  const cancelAllTimersForId = (id: string) => {
    const maps = [completionTimersRef, uncompleteTimersRef, pendingDeleteTimersRef, undeleteTimersRef, rescheduleTimersRef];
    for (const map of maps) {
      const t = map.current.get(id);
      if (t !== undefined) {
        clearTimeout(t);
        map.current.delete(id);
      }
    }
  };

  // Helper: remove a given id from all pending visual sets and pending ref maps.
  const clearPendingStateForId = (id: string) => {
    setPendingDoneIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setPendingUncompleteIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setPendingDeleteIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setPendingUndeleteIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    pendingUncompleteCompletedAtRef.current.delete(id);
    pendingUndeleteSortKeyRef.current.delete(id);
  };

  const addReminder = useCallback((reminder: Reminder) => {
    // Cancel any pending insert timer (last-one-wins)
    if (newReminderInsertTimerRef.current !== null) {
      clearTimeout(newReminderInsertTimerRef.current);
    }
    newReminderInsertTimerRef.current = window.setTimeout(() => {
      newReminderInsertTimerRef.current = null;
      setReminders((prev) => [...prev, reminder]);
      setReinsertedId(reminder.id);
      setInsertHighlightId(reminder.id);
      if (insertHighlightTimerRef.current !== null) {
        clearTimeout(insertHighlightTimerRef.current);
      }
      insertHighlightTimerRef.current = window.setTimeout(() => {
        insertHighlightTimerRef.current = null;
        setInsertHighlightId(null);
      }, INSERT_HIGHLIGHT_MS);
    }, NEW_REMINDER_INSERT_DELAY);
  }, []);

  const addReminders = useCallback((newReminders: Reminder[]) => {
    // Cancel any pending insert timer (last-one-wins)
    if (newReminderInsertTimerRef.current !== null) {
      clearTimeout(newReminderInsertTimerRef.current);
    }
    newReminderInsertTimerRef.current = window.setTimeout(() => {
      newReminderInsertTimerRef.current = null;
      setReminders((prev) => {
        const existingTexts = new Set(prev.map((r) => r.originalText));
        const unique = newReminders.filter((r) => !existingTexts.has(r.originalText));
        if (unique.length > 0) {
          setReinsertedId(unique[unique.length - 1].id);
          setInsertHighlightId(unique[unique.length - 1].id);
          if (insertHighlightTimerRef.current !== null) {
            clearTimeout(insertHighlightTimerRef.current);
          }
          insertHighlightTimerRef.current = window.setTimeout(() => {
            insertHighlightTimerRef.current = null;
            setInsertHighlightId(null);
          }, INSERT_HIGHLIGHT_MS);
        }
        return [...prev, ...unique];
      });
    }, NEW_REMINDER_INSERT_DELAY);
  }, []);

  // Update an existing reminder in place (id unchanged)
  const updateReminder = useCallback((updated: Reminder) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  }, []);

  // Convert RepeatRule → RepeatConfig for edit mode initialisation
  const repeatRuleToConfig = (rule: RepeatRule | null | undefined): RepeatConfig => {
    if (!rule) return null;
    const ABBREV_TO_DAY: Record<string, string> = {
      mo: 'Monday', tu: 'Tuesday', we: 'Wednesday', th: 'Thursday',
      fr: 'Friday', sa: 'Saturday', su: 'Sunday',
    };
    if (rule.frequency === 'weekly' && rule.byDay && rule.byDay.length > 0) {
      return {
        frequency: 'custom-days',
        interval: rule.byDay.length,
        selectedDays: rule.byDay.map(d => ABBREV_TO_DAY[d] ?? d),
      };
    }
    return {
      frequency: rule.frequency,
      interval: rule.interval,
    };
  };

  const handleOverlayClose = useCallback(() => {
    setIsOverlayOpen(false);
    setRepeatConfig(null);
    setEditingReminder(null);
  }, []);

  // Track viewport height for overlay positioning
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate overlay top position based on viewport height
  const getOverlayTopPosition = () => {
    const THRESHOLD = 570;
    const DEFAULT_TOP = 121.653; // 16px below logo: 20px + 50px + 35.653px + 16px
    const ABOVE_LOGO_TOP = 54; // 16px above logo: 20px + 50px - 16px
    
    if (viewportHeight <= THRESHOLD) {
      return ABOVE_LOGO_TOP;
    }
    return DEFAULT_TOP;
  };

  const REMINDER_OVERLAY_TOP = 121.653;

  // Tutorial overlay: always 16px above logo, no resize recalculation
  const HEADER_PADDING = 20;
  const LOGO_PADDING_TOP = 50;
  const TUTORIAL_OVERLAY_TOP = HEADER_PADDING + LOGO_PADDING_TOP - 16;

  const handleTutorialOpen = () => {
    setIsTutorialOpen(true);
    setTimeout(() => setIsSettingsOpen(false), 250);
  };

  const handleLogoClick = () => {
    clickCountRef.current += 1;

    if (clickCountRef.current === 3) {
      setIsDevToolsOpen(true);
      clickCountRef.current = 0;
      if (clickTimerRef.current !== null) {
        clearTimeout(clickTimerRef.current);
        clickTimerRef.current = null;
      }
    } else {
      if (clickTimerRef.current !== null) {
        clearTimeout(clickTimerRef.current);
      }
      clickTimerRef.current = window.setTimeout(() => {
        clickCountRef.current = 0;
        clickTimerRef.current = null;
      }, 500);
    }
  };

  // Logo tick click: toggle between done-deleted view and "all" list view
  const handleTickClick = () => {
    if (isListsEnabled && activeMainTab === 'lists') {
      setViewMode((prev) => (prev === 'lists-done' ? 'list' : 'lists-done'));
    } else {
      setViewMode((prev) => (prev === "list" ? "done-deleted" : "list"));
    }
    setActiveFilter("all");
    setDoneDeletedFilter('all');
    setClearListStep(0);
    if (clearListTimerRef.current !== null) {
      clearTimeout(clearListTimerRef.current);
      clearListTimerRef.current = null;
    }
  };

  const getCategoryLabel = (category: ReminderCategory) => {
    const labels: Record<ReminderCategory, string> = {
      today: "Today",
      "this-week": "This week",
      later: "Later",
      sometime: "Sometime",
      other: "Later",
    };
    return labels[category];
  };

  const handleListCompleteClick = useCallback((listId: string) => {
    if (completeListTimersRef.current.has(listId)) return;

    setPendingDoneListIds((prev) => {
      const next = new Set(prev);
      next.add(listId);
      return next;
    });

    const timer = window.setTimeout(() => {
      completeListTimersRef.current.delete(listId);
      setCreatedLists((prev) =>
        prev.map((list) =>
          list.id === listId ? { ...list, completedAt: Date.now() } : list
        )
      );
      setPendingDoneListIds((prev) => {
        const next = new Set(prev);
        next.delete(listId);
        return next;
      });
    }, COMPLETION_DELAY);

    completeListTimersRef.current.set(listId, timer);
  }, []);

  const handleListUndoClick = useCallback((listId: string) => {
    if (undoListTimersRef.current.has(listId)) return;

    const target = createdLists.find((list) => list.id === listId);
    if (!target || target.completedAt == null) return;

    pendingUndoneListCompletedAtRef.current.set(listId, target.completedAt);
    setCreatedLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, completedAt: null } : list
      )
    );

    setListReinsertedId(listId);
    setListInsertHighlightId(listId);
    if (listInsertHighlightTimerRef.current !== null) {
      clearTimeout(listInsertHighlightTimerRef.current);
    }
    listInsertHighlightTimerRef.current = window.setTimeout(() => {
      listInsertHighlightTimerRef.current = null;
      setListInsertHighlightId(null);
    }, INSERT_HIGHLIGHT_MS);

    setPendingUndoneListIds((prev) => {
      const next = new Set(prev);
      next.add(listId);
      return next;
    });

    const timer = window.setTimeout(() => {
      undoListTimersRef.current.delete(listId);
      pendingUndoneListCompletedAtRef.current.delete(listId);
      setPendingUndoneListIds((prev) => {
        const next = new Set(prev);
        next.delete(listId);
        return next;
      });
    }, COMPLETION_DELAY);

    undoListTimersRef.current.set(listId, timer);
  }, [createdLists]);

  // Cancel a pending repeat completion: clears all in-flight timers and reverts state.
  const cancelPendingRepeatCompletion = useCallback((reminderId: string) => {
    // Clear completion timer if still pending
    const completionTimer = completionTimersRef.current.get(reminderId);
    if (completionTimer != null) {
      clearTimeout(completionTimer);
      completionTimersRef.current.delete(reminderId);
    }
    // Clear reschedule timer if in-flight
    const rescheduleTimer = rescheduleTimersRef.current.get(reminderId);
    if (rescheduleTimer != null) {
      clearTimeout(rescheduleTimer);
      rescheduleTimersRef.current.delete(reminderId);
    }
    // Remove from pending repeat set
    pendingRepeatCompletionIdsRef.current.delete(reminderId);
    // Revert pending UI state
    setPendingDoneIds((prev) => {
      const next = new Set(prev);
      next.delete(reminderId);
      return next;
    });
    // Revert completedAt if already committed by the 350ms timer
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id !== reminderId) return r;
        if (r.completedAt == null) return r;
        return { ...r, completedAt: null };
      })
    );
  }, []);

  // Mark a reminder as done: immediate visual commit, then 350ms delayed data commit.
  // For repeating reminders, a second 500ms timer reschedules the next occurrence.
  const handleCompleteClick = useCallback((reminderId: string, opts?: { armEmptyDelay?: boolean; filterKey?: string; isRepeat?: boolean }) => {
    // Repeat reminder cancel: second click during in-flight window cancels pending completion
    if (pendingRepeatCompletionIdsRef.current.has(reminderId)) {
      cancelPendingRepeatCompletion(reminderId);
      return;
    }

    // Guard: no-op if already pending or already completed (non-repeat path)
    if (completionTimersRef.current.has(reminderId)) return;

    // Track repeat reminders across the full in-flight lifecycle
    if (opts?.isRepeat) {
      pendingRepeatCompletionIdsRef.current.add(reminderId);
    }

    // Arm empty-placeholder delay when this is the last visible item in the current active list
    if (opts?.armEmptyDelay && opts.filterKey != null) {
      emptyPlaceholderDelayRef.current = { untilMs: Date.now() + EMPTY_STATE_DELAY + 350, filterKey: opts.filterKey };
      setTimeout(() => setEmptyRerenderTick((c) => c + 1), EMPTY_STATE_DELAY + 350);
    }

    // Immediate visual commit
    setPendingDoneIds((prev) => {
      const next = new Set(prev);
      next.add(reminderId);
      return next;
    });

    // Delayed data commit
    const timer = window.setTimeout(() => {
      completionTimersRef.current.delete(reminderId);

      // Set completedAt and schedule reschedule timer for repeating reminders.
      // Both read and timer-scheduling happen inside the updater to avoid stale closures.
      setReminders((prev) =>
        prev.map((r) => {
          if (r.id !== reminderId) return r;

          // Schedule the 500ms reschedule timer for repeating reminders
          if (r.repeatRule != null && r.schedule.kind === 'scheduled' && r.schedule.date != null) {
            const capturedSchedule = r.schedule;
            const capturedRepeatRule = r.repeatRule;
            const capturedOriginalText = r.originalText;
            const capturedDisplayText = r.displayText;

            const rescheduleTimer = window.setTimeout(() => {
              rescheduleTimersRef.current.delete(reminderId);

              // Guard: if pending was cancelled by a second click, skip spawn entirely
              if (!pendingRepeatCompletionIdsRef.current.has(reminderId)) {
                pendingRepeatCompletionIdsRef.current.delete(reminderId);
                return;
              }

              // Build baseDateTime from the completed occurrence's scheduled date/time
              const [y, m, d] = capturedSchedule.date.split('-').map(Number);
              let baseDateTime: Date;
              if (capturedSchedule.time) {
                const [hh, mm] = capturedSchedule.time.split(':').map(Number);
                baseDateTime = new Date(y, m - 1, d, hh, mm, 0, 0);
              } else {
                baseDateTime = new Date(y, m - 1, d, 0, 0, 0, 0);
              }

              const nextOccurrence = getNextOccurrence(baseDateTime, capturedRepeatRule);

              // Validate next occurrence
              if (!(nextOccurrence instanceof Date) || isNaN(nextOccurrence.getTime())) {
                return;
              }

              const nextDate = formatDateToSchedule(nextOccurrence);
              // Preserve time if original had time; update from nextOccurrence for hourly
              const nextTime = capturedSchedule.time
                ? formatTimeToSchedule(nextOccurrence)
                : null;

              const nextScheduleObj: ReminderSchedule = nextTime != null
                ? { kind: 'scheduled' as const, date: nextDate, time: nextTime }
                : { kind: 'scheduled' as const, date: nextDate };

              // Insert next occurrence as a brand new reminder, leaving the completed one untouched.
              // Guard: check deletedAt at execution time — if deleted, skip reschedule entirely.
              const newReminder: Reminder = {
                id: crypto.randomUUID(),
                originalText: capturedOriginalText,
                displayText: capturedDisplayText,
                createdAt: Date.now(),
                schedule: nextScheduleObj,
                repeatRule: { ...capturedRepeatRule },
                completedAt: null,
              };
              setReminders((prev2) => {
                const source = prev2.find((r2) => r2.id === reminderId);
                if (source?.deletedAt != null) return prev2;
                return [...prev2, newReminder];
              });
              setReinsertedId(newReminder.id);
              setInsertHighlightId(newReminder.id);
              if (insertHighlightTimerRef.current !== null) {
                clearTimeout(insertHighlightTimerRef.current);
              }
              insertHighlightTimerRef.current = window.setTimeout(() => {
                insertHighlightTimerRef.current = null;
                setInsertHighlightId(null);
              }, INSERT_HIGHLIGHT_MS);
              // Clear pending repeat completion after successful spawn
              pendingRepeatCompletionIdsRef.current.delete(reminderId);
            }, RESCHEDULE_DELAY);

            rescheduleTimersRef.current.set(reminderId, rescheduleTimer);
          }

          return { ...r, completedAt: Date.now() };
        })
      );

      // Clear from pending visual set
      setPendingDoneIds((prev) => {
        const next = new Set(prev);
        next.delete(reminderId);
        return next;
      });
    }, COMPLETION_DELAY);

    completionTimersRef.current.set(reminderId, timer);
  }, [cancelPendingRepeatCompletion]);

  // Uncheck a done reminder: instant reinsertion (matches repeat reinsertion path).
  // Done view feedback preserved separately via pendingUncompleteIds + COMPLETION_DELAY.
  const handleUncompleteClick = useCallback((reminderId: string) => {
    // Guard: no-op if already pending
    if (uncompleteTimersRef.current.has(reminderId)) return;

    const currentReminders = reminders;
    const target = currentReminders.find((r) => r.id === reminderId);

    // Undelete path: mirrors un-done cadence exactly
    if (target?.deletedAt != null) {
      // Guard: no-op if already pending undelete
      if (undeleteTimersRef.current.has(reminderId)) return;

      // Cancel any pending delete timer (defensive)
      const pendingDelTimer = pendingDeleteTimersRef.current.get(reminderId);
      if (pendingDelTimer !== undefined) {
        clearTimeout(pendingDelTimer);
        pendingDeleteTimersRef.current.delete(reminderId);
      }
      setPendingDeleteIds((prev) => {
        if (!prev.has(reminderId)) return prev;
        const next = new Set(prev);
        next.delete(reminderId);
        return next;
      });

      // Capture prior deletedAt for stable sort during pending window
      pendingUndeleteSortKeyRef.current.set(reminderId, target.deletedAt);

      // Immediately clear deletedAt (causes instant reinsertion to active list if completedAt is null)
      setReminders((prev) =>
        prev.map((r) => r.id === reminderId ? { ...r, deletedAt: null } : r)
      );

      // Trigger fade-in + highlight only if returning to active list (completedAt is null)
      if (target.completedAt == null) {
        setReinsertedId(reminderId);
        setInsertHighlightId(reminderId);
        if (insertHighlightTimerRef.current !== null) {
          clearTimeout(insertHighlightTimerRef.current);
        }
        insertHighlightTimerRef.current = window.setTimeout(() => {
          insertHighlightTimerRef.current = null;
          setInsertHighlightId(null);
        }, INSERT_HIGHLIGHT_MS);
      }

      // Done view feedback: show undelete visual for COMPLETION_DELAY, then remove
      setPendingUndeleteIds((prev) => {
        const next = new Set(prev);
        next.add(reminderId);
        return next;
      });

      const timer = window.setTimeout(() => {
        undeleteTimersRef.current.delete(reminderId);
        pendingUndeleteSortKeyRef.current.delete(reminderId);
        setPendingUndeleteIds((prev) => {
          const next = new Set(prev);
          next.delete(reminderId);
          return next;
        });
      }, COMPLETION_DELAY);

      undeleteTimersRef.current.set(reminderId, timer);
      return;
    }

    // Existing uncomplete path: clear completedAt and handle repeat duplicate removal

    // 1. For repeating reminders: cancel any pending reschedule timer to prevent
    //    a stale callback from inserting a duplicate after undo.
    //    Then compute the expected next schedule for duplicate detection.
    let expectedNextSchedule: ReminderSchedule | null = null;
    let capturedOriginalText: string | null = null;
    let capturedDisplayText: string | null = null;
    let capturedRepeatRule: RepeatRule | null = null;

    if (target?.repeatRule != null) {
      // Cancel pending reschedule timer if present
      const pendingTimer = rescheduleTimersRef.current.get(reminderId);
      if (pendingTimer !== undefined) {
        clearTimeout(pendingTimer);
        rescheduleTimersRef.current.delete(reminderId);
      }

      // Compute expected next schedule for duplicate matching
      if (target.schedule.kind === 'scheduled' && target.schedule.date != null) {
        const [y, m, d] = target.schedule.date.split('-').map(Number);
        let baseDateTime: Date;
        if (target.schedule.time) {
          const [hh, mm] = target.schedule.time.split(':').map(Number);
          baseDateTime = new Date(y, m - 1, d, hh, mm, 0, 0);
        } else {
          baseDateTime = new Date(y, m - 1, d, 0, 0, 0, 0);
        }

        const nextOccurrence = getNextOccurrence(baseDateTime, target.repeatRule);

        if (nextOccurrence instanceof Date && !isNaN(nextOccurrence.getTime())) {
          const nextDate = formatDateToSchedule(nextOccurrence);
          const nextTime = target.schedule.time
            ? formatTimeToSchedule(nextOccurrence)
            : undefined;

          expectedNextSchedule = nextTime != null
            ? { kind: 'scheduled' as const, date: nextDate, time: nextTime }
            : { kind: 'scheduled' as const, date: nextDate };

          capturedOriginalText = target.originalText;
          capturedDisplayText = target.displayText;
          capturedRepeatRule = target.repeatRule;
        }
      }
    }

    // 2. Store original completedAt for stable sort, then clear it for instant reinsertion.
    //    For repeating reminders with a computed next schedule, also remove the duplicate
    //    active instance if exactly one confident match exists.
    setReminders((prev) => {
      const targetInPrev = prev.find((r) => r.id === reminderId);
      if (targetInPrev?.completedAt != null) {
        pendingUncompleteCompletedAtRef.current.set(reminderId, targetInPrev.completedAt);
      }

      // Find duplicate active instance to remove (repeating reminders only)
      let duplicateIdToRemove: string | null = null;
      if (expectedNextSchedule != null && capturedRepeatRule != null) {
        const matches = prev.filter((r) => {
          if (r.id === reminderId) return false;
          if (r.completedAt != null) return false;
          if (r.originalText !== capturedOriginalText) return false;
          if (r.displayText !== capturedDisplayText) return false;
          if (!scheduleEquality.areRepeatsEqual(r.repeatRule ?? null, capturedRepeatRule)) return false;
          // Inline schedule equality
          if (r.schedule.kind !== expectedNextSchedule!.kind) return false;
          if (r.schedule.kind === 'scheduled' && expectedNextSchedule!.kind === 'scheduled') {
            if (r.schedule.date !== expectedNextSchedule!.date) return false;
            if ((r.schedule.time ?? undefined) !== (expectedNextSchedule!.time ?? undefined)) return false;
          }
          return true;
        });
        if (matches.length === 1) {
          duplicateIdToRemove = matches[0].id;
        }
      }

      return prev
        .filter((r) => r.id !== duplicateIdToRemove)
        .map((r) =>
          r.id === reminderId && r.completedAt != null
            ? { ...r, completedAt: null }
            : r
        );
    });

    // 3. Trigger fade-in + highlight (same flags as repeat reinsertion)
    setReinsertedId(reminderId);
    setInsertHighlightId(reminderId);
    if (insertHighlightTimerRef.current !== null) {
      clearTimeout(insertHighlightTimerRef.current);
    }
    insertHighlightTimerRef.current = window.setTimeout(() => {
      insertHighlightTimerRef.current = null;
      setInsertHighlightId(null);
    }, INSERT_HIGHLIGHT_MS);

    // 3. Done view feedback: show uncomplete visual for COMPLETION_DELAY, then remove
    setPendingUncompleteIds((prev) => {
      const next = new Set(prev);
      next.add(reminderId);
      return next;
    });

    const timer = window.setTimeout(() => {
      uncompleteTimersRef.current.delete(reminderId);
      pendingUncompleteCompletedAtRef.current.delete(reminderId);
      setPendingUncompleteIds((prev) => {
        const next = new Set(prev);
        next.delete(reminderId);
        return next;
      });
    }, COMPLETION_DELAY);

    uncompleteTimersRef.current.set(reminderId, timer);
  }, [reminders]);

  // Delete a reminder: same cadence as done (350ms pending visual, then data commit).
  const handleDeleteClick = useCallback((reminderId: string, opts?: { armEmptyDelay?: boolean; filterKey?: string }) => {
    // Guard: no-op if already pending delete
    if (pendingDeleteTimersRef.current.has(reminderId)) return;

    // Arm empty-placeholder delay when this is the last visible item in the current active list
    if (opts?.armEmptyDelay && opts.filterKey != null) {
      emptyPlaceholderDelayRef.current = { untilMs: Date.now() + EMPTY_STATE_DELAY + 350, filterKey: opts.filterKey };
      setTimeout(() => setEmptyRerenderTick((c) => c + 1), EMPTY_STATE_DELAY + 350);
    }

    // Cancel all pending timers and clear all pending state for this id
    cancelAllTimersForId(reminderId);
    clearPendingStateForId(reminderId);

    // Immediate visual commit: add to pendingDeleteIds
    setPendingDeleteIds((prev) => {
      const next = new Set(prev);
      next.add(reminderId);
      return next;
    });

    // Close info overlay
    setInfoReminder(null);

    // Delayed data commit (same COMPLETION_DELAY as done)
    const timer = window.setTimeout(() => {
      pendingDeleteTimersRef.current.delete(reminderId);

      // Set deletedAt
      setReminders((prev) =>
        prev.map((r) => r.id === reminderId ? { ...r, deletedAt: Date.now() } : r)
      );

      // Clear from pending visual set
      setPendingDeleteIds((prev) => {
        const next = new Set(prev);
        next.delete(reminderId);
        return next;
      });
    }, COMPLETION_DELAY);

    pendingDeleteTimersRef.current.set(reminderId, timer);
  }, []);

  // Clear list: 3-step confirmation handler
  const handleClearListClick = useCallback(() => {
    if (clearListStep === 2) return; // ignore clicks during "Cleared!" state

    if (clearListStep === 0) {
      setClearListStep(1);
      return;
    }

    // clearListStep === 1: execute clear
    setClearListStep(2);
    setDoneDeletedFilter('all');

    // Build set of ids to remove: everything visible in done/deleted list
    setReminders((prev) => {
      const idsToRemove = new Set<string>();
      for (const r of prev) {
        if (r.completedAt != null || r.deletedAt != null) {
          idsToRemove.add(r.id);
        }
      }
      // Also include pending restore items (visible in done/deleted view but data already cleared)
      for (const id of pendingUncompleteIds) idsToRemove.add(id);
      for (const id of pendingUndeleteIds) idsToRemove.add(id);

      // Cleanup timers and pending sets for removed ids
      for (const id of idsToRemove) {
        const ct = completionTimersRef.current.get(id);
        if (ct !== undefined) { clearTimeout(ct); completionTimersRef.current.delete(id); }
        const ut = uncompleteTimersRef.current.get(id);
        if (ut !== undefined) { clearTimeout(ut); uncompleteTimersRef.current.delete(id); }
        const rt = rescheduleTimersRef.current.get(id);
        if (rt !== undefined) { clearTimeout(rt); rescheduleTimersRef.current.delete(id); }
        const dt = pendingDeleteTimersRef.current.get(id);
        if (dt !== undefined) { clearTimeout(dt); pendingDeleteTimersRef.current.delete(id); }
        const udt = undeleteTimersRef.current.get(id);
        if (udt !== undefined) { clearTimeout(udt); undeleteTimersRef.current.delete(id); }
        pendingUncompleteCompletedAtRef.current.delete(id);
        pendingUndeleteSortKeyRef.current.delete(id);
      }

      // Clean pending id sets
      setPendingDoneIds((s) => {
        let changed = false;
        const next = new Set(s);
        for (const id of idsToRemove) { if (next.delete(id)) changed = true; }
        return changed ? next : s;
      });
      setPendingUncompleteIds((s) => {
        let changed = false;
        const next = new Set(s);
        for (const id of idsToRemove) { if (next.delete(id)) changed = true; }
        return changed ? next : s;
      });
      setPendingDeleteIds((s) => {
        let changed = false;
        const next = new Set(s);
        for (const id of idsToRemove) { if (next.delete(id)) changed = true; }
        return changed ? next : s;
      });
      setPendingUndeleteIds((s) => {
        let changed = false;
        const next = new Set(s);
        for (const id of idsToRemove) { if (next.delete(id)) changed = true; }
        return changed ? next : s;
      });

      return prev.filter((r) => !idsToRemove.has(r.id));
    });

    // 500ms reset back to default
    if (clearListTimerRef.current !== null) {
      clearTimeout(clearListTimerRef.current);
    }
    clearListTimerRef.current = window.setTimeout(() => {
      clearListTimerRef.current = null;
      setClearListStep(0);
    }, 500);
  }, [clearListStep, pendingUncompleteIds, pendingUndeleteIds]);

  const now = new Date();

  return (
    <div className="content-stretch flex flex-col items-center h-screen w-full overflow-hidden" style={{ backgroundColor: viewMode === "done-deleted" ? (isListsEnabled ? "#4784f8" : DONE_BLUE) : (isListsEnabled && activeMainTab === 'lists') ? DONE_BLUE : "#4784f8" }} onPointerDownCapture={(e) => {
        if ((clearListStep === 1 || clearListStep === 2) && clearAllButtonRef.current && !clearAllButtonRef.current.contains(e.target as Node)) {
          setClearListStep(0);
          if (clearListTimerRef.current !== null) {
            clearTimeout(clearListTimerRef.current);
            clearListTimerRef.current = null;
          }
        }
      }}>
      {/* Header */}
      <div className="app-header relative shrink-0 w-full p-[20px]">
        <div className="content-stretch flex flex-col gap-[20px] items-start relative w-full max-w-[768px] mx-auto" style={{ backgroundColor: viewMode === "done-deleted" ? (isListsEnabled ? "#4784f8" : DONE_BLUE) : (isListsEnabled && activeMainTab === 'lists') ? DONE_BLUE : "#4784f8" }}>
          <div className="content-stretch flex items-center justify-center pb-[20px] pt-[50px] relative shrink-0 w-full">
            <div className="h-[35.653px] relative shrink-0 w-[209.653px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 209.653 35.6533">
                <g>
                  {/* Text portion */}
                  <g>
                    <path d={svgPaths.p2e09d80} fill="white" />
                    <path d={svgPaths.p3b133a00} fill="white" />
                    <path d={svgPaths.p11840600} fill="white" />
                    <path d={svgPaths.p170f9700} fill="white" />
                    <path d={svgPaths.pf876500} fill="white" />
                    <path d={svgPaths.pc9c4a00} fill="white" />
                    <path d={svgPaths.p6114100} fill="white" />
                    <path d={svgPaths.pb9f8400} fill="white" />
                    <path d={svgPaths.pe461c40} fill="white" />
                    <path d={svgPaths.p38e87300} fill="white" />
                    <path d={svgPaths.p26dc1e00} fill="white" />
                    <path d={svgPaths.p82ca600} fill="white" />
                  </g>
                  
                  {/* Circular tick icon */}
                  {viewMode !== "done-deleted" && viewMode !== 'lists-done' && (
                    <path d={svgPaths.p3babd700} fill="white" />
                  )}
                </g>
              </svg>

              {/* Done-deleted mode: overlay the dark tick icon at same size */}
              {viewMode === "done-deleted" && (
                <svg
                  className="absolute left-0 top-0"
                  style={{ width: '35.653px', height: '35.653px' }}
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 35.6533 35.6533"
                >
                  <g clipPath="url(#clip0_done_tick)">
                    <path d={doneTickPaths.p2b6e2900} fill="#FFFFFF" />
                    <g>
                      <path d={doneTickPaths.p2e09d80} fill={isListsEnabled ? '#4784f8' : DONE_BLUE} />
                      <path d={doneTickPaths.p3b133a00} fill={isListsEnabled ? '#4784f8' : DONE_BLUE} />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_done_tick">
                      <rect fill="white" height="35.6533" width="35.6533" />
                    </clipPath>
                  </defs>
                </svg>
              )}

              {/* Lists-done mode: overlay tick icon with white fill and Reminderly dark blue tick */}
              {viewMode === 'lists-done' && (
                <svg
                  className="absolute left-0 top-0"
                  style={{ width: '35.653px', height: '35.653px' }}
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 35.6533 35.6533"
                >
                  <g clipPath="url(#clip0_lists_done_tick)">
                    <path d={doneTickPaths.p2b6e2900} fill="#FFFFFF" />
                    <g>
                      <path d={doneTickPaths.p2e09d80} fill={DONE_BLUE} />
                      <path d={doneTickPaths.p3b133a00} fill={DONE_BLUE} />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_lists_done_tick">
                      <rect fill="white" height="35.6533" width="35.6533" />
                    </clipPath>
                  </defs>
                </svg>
              )}
              
              {/* Clickable area over tick circle (left segment) */}
              <button
                className="absolute top-0 bottom-0 cursor-pointer"
                style={{ left: 0, width: '22%', padding: 0, background: 'none', border: 'none' }}
                onClick={handleTickClick}
                aria-label={viewMode === "done-deleted" ? "Return to reminders" : "Show done and deleted"}
              />
              {/* Invisible clickable area over text portion only */}
              <button
                className="absolute top-0 bottom-0 left-1/4 right-0 p-0 m-0 bg-transparent border-0 text-left cursor-pointer"
                onClick={handleLogoClick}
                aria-label="Developer tools (triple tap)"
              />
            </div>
          </div>

          {/* Filter buttons — hidden when Lists mode is active (rendered inside container instead) */}
          {!isListsEnabled && (
          <div className="filters-menu flex items-center justify-between relative shrink-0 w-full">
            {viewMode === "done-deleted" ? (<div
              className="flex items-center justify-between w-full"
            >
              {/* Done/deleted view filters */}
              <div className="flex items-center gap-[12px]">
                <button
                  onClick={() => setViewMode("list")}
                  className="hidden relative shrink-0 self-center cursor-pointer"
                  style={{ width: 50, height: 40 }}
                  aria-label="Back to reminders"
                >
                  <svg className="block" style={{ width: 50, height: 40 }} fill="none" viewBox="0 0 50 40">
                    <rect fill="white" fillOpacity="0.15" height="39" rx="19.5" width="49" x="0.5" y="0.5" />
                    <rect height="39" rx="19.5" stroke="white" width="49" x="0.5" y="0.5" />
                  </svg>
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 8, height: 13 }} fill="none" viewBox="20.88 13.38 7.76 13.24">
                    <path d={laterBtnPaths.p17336800} fill="white" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setDoneDeletedFilter(doneDeletedFilter === 'done' ? 'all' : 'done');
                  }}
                  className={`${
                    doneDeletedFilter === 'done'
                      ? "bg-white"
                      : "bg-[rgba(255,255,255,0.15)] text-white"
                  } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer`}
                  style={doneDeletedFilter === 'done' ? { boxShadow: `inset 0 0 0 2px ${DONE_BLUE}`, color: DONE_BLUE } : { boxShadow: 'inset 0 0 0 1px #FFFFFF' }}
                >
                  <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                    Done
                  </div>
                </button>
                <button
                  onClick={() => {
                    setDoneDeletedFilter(doneDeletedFilter === 'deleted' ? 'all' : 'deleted');
                  }}
                  className={`${
                    doneDeletedFilter === 'deleted'
                      ? "bg-white"
                      : "bg-[rgba(255,255,255,0.15)] text-white"
                  } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer`}
                  style={doneDeletedFilter === 'deleted' ? { boxShadow: `inset 0 0 0 2px ${DELETED_GREY}`, color: DELETED_GREY } : { boxShadow: 'inset 0 0 0 1px #FFFFFF' }}
                >
                  <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                    Deleted
                  </div>
                </button>
              </div>
              {/* Clear all button */}
              <button
                ref={clearAllButtonRef}
                onClick={handleClearListClick}
                className={`${
                  clearListStep === 0
                    ? "bg-[rgba(255,255,255,0.15)] text-white"
                    : "bg-white text-[#1C2C42]"
                } content-stretch flex items-center justify-center h-[40px] w-[95px] relative rounded-[100px] shrink-0 border border-solid border-white transition-colors cursor-pointer`}
              >
                <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                  {clearListStep === 0 ? "Clear all" : clearListStep === 1 ? "Clear all?" : "Cleared!"}
                </div>
              </button>
            </div>) : filtersMenuVariant === "grouped" ? (
              <>
                <div className="flex items-center gap-[12px]">
                  {(["today", "this-week", "other"] as ReminderCategory[]).map((filter) => {
                    const pillColor = CATEGORY_COLOURS[filter] || "#4784f8";
                    const isActive = activeFilter === filter;
                    return (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(activeFilter === filter ? "all" : filter);
                      }}
                      className={`${
                        isActive
                          ? "bg-white"
                          : "bg-[rgba(255,255,255,0.15)] text-white"
                      } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer ${
                        filter === "other" ? "hidden min-[390px]:flex" : ""
                      }`}
                      style={isActive ? { boxShadow: `inset 0 0 0 2px ${pillColor}`, color: pillColor } : { boxShadow: `inset 0 0 0 1px #FFFFFF` }}
                    >
                      <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                        {getCategoryLabel(filter)}
                      </div>
                    </button>
                    );
                  })}
                </div>
                <div className="shrink-0 h-[40px] cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
                  <LaterBtn />
                </div>
              </>
            ) : (
              (["today", "this-week", "later", "sometime"] as ReminderCategory[]).map((filter) => {
                const pillColor = CATEGORY_COLOURS[filter] || "#4784f8";
                const isActive = activeFilter === filter;
                return (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(activeFilter === filter ? "all" : filter);
                  }}
                  className={`${
                    isActive
                      ? "bg-white"
                      : "bg-[rgba(255,255,255,0.15)] text-white"
                  } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer ${
                    filter === "sometime" ? "hidden min-[390px]:flex" : ""
                  }`}
                  style={isActive ? { boxShadow: `inset 0 0 0 2px ${pillColor}`, color: pillColor } : { boxShadow: `inset 0 0 0 1px #FFFFFF` }}
                >
                  <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                    {getCategoryLabel(filter)}
                  </div>
                </button>
                );
              })
            )}
          </div>
          )}
        </div>
      </div>

      {/* Reminders/Lists tab bar — Lists mode only */}
      {isListsEnabled && (
        <div className="content-stretch flex gap-[10px] items-end justify-center px-[20px] relative w-full">
          <div
            className={`${activeMainTab === 'reminders' ? 'bg-white' : 'bg-[rgba(255,255,255,0.25)]'} flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[12px] rounded-tr-[12px] cursor-pointer h-[52px]`}
            data-name="today-btn"
            onClick={() => {
              if (viewMode === 'lists-done') {
                setViewMode('list');
              }
              setActiveMainTab('reminders');
            }}
          >
            {activeMainTab === 'reminders' && (
              <div aria-hidden="true" className="absolute border-[1.5px] border-solid border-white inset-[-0.75px] pointer-events-none rounded-tl-[12.75px] rounded-tr-[12.75px]" />
            )}
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[30px] relative size-full">
                <div className={`flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] whitespace-nowrap ${activeMainTab === 'reminders' ? 'text-[#4784f8]' : 'text-white'}`}>
                  <p className="leading-[normal]">{isListsEnabled && viewMode === 'done-deleted' ? 'Done reminders' : 'Reminders'}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${activeMainTab === 'lists' ? 'bg-white' : 'bg-[rgba(255,255,255,0.25)]'} flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[12px] rounded-tr-[12px] cursor-pointer h-[52px]`}
            data-name="today-btn"
            onClick={() => {
              if (viewMode === 'done-deleted') {
                setViewMode('list');
              }
              setActiveMainTab('lists');
            }}
          >
            {activeMainTab === 'lists' && (
              <div aria-hidden="true" className="absolute border-[1.5px] border-solid border-white inset-[-0.75px] pointer-events-none rounded-tl-[12.75px] rounded-tr-[12.75px]" />
            )}
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[30px] relative size-full">
                <div className={`flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] whitespace-nowrap ${activeMainTab === 'lists' ? 'text-[#1C2C42]' : 'text-white'}`}>
                  <p className="leading-[normal]">{viewMode === 'lists-done' ? 'Done lists' : 'Lists'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminder list container */}
      <div className={`bg-white content-stretch flex flex-col gap-[32px] items-center px-[20px] ${isListsEnabled ? 'pt-[24px]' : 'pt-[30px]'} relative ${isListsEnabled ? 'rounded-tl-[15px] rounded-tr-[15px]' : 'rounded-tl-[20px] rounded-tr-[20px]'} w-full flex-1 min-h-[350px]`}>
        {isListsEnabled && activeMainTab === 'lists' ? (
          <>
          {viewMode === 'lists-done' && (
            <div className="filters-menu flex items-center justify-between relative shrink-0 w-full">
              <div className="flex items-center gap-[12px]">
                <button
                  onClick={() => setViewMode('list')}
                  className="hidden relative shrink-0 self-center cursor-pointer"
                  style={{ width: 50, height: 40 }}
                  aria-label="Back to lists"
                >
                  <svg className="block" style={{ width: 50, height: 40 }} fill="none" viewBox="0 0 50 40">
                    <rect fill="transparent" height="39" rx="19.5" width="49" x="0.5" y="0.5" />
                    <rect height="39" rx="19.5" stroke={DONE_BLUE} width="49" x="0.5" y="0.5" />
                  </svg>
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 8, height: 13 }} fill="none" viewBox="20.88 13.38 7.76 13.24">
                    <path d={laterBtnPaths.p17336800} fill={DONE_BLUE} />
                  </svg>
                </button>
                <button
                  className="text-[#1C2C42] content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 border border-solid border-[#1C2C42] transition-colors cursor-pointer"
                >
                  <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                    Done
                  </div>
                </button>
                <button
                  className="text-[#1C2C42] content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 border border-solid border-[#1C2C42] transition-colors cursor-pointer"
                >
                  <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                    Deleted
                  </div>
                </button>
              </div>
              {/* Clear all button */}
              <button
                ref={clearAllButtonRef}
                onClick={handleClearListClick}
                className={`${
                  clearListStep === 0
                    ? "text-[#1C2C42]"
                    : "bg-[#1C2C42] text-white"
                } content-stretch flex items-center justify-center h-[40px] w-[95px] relative rounded-[100px] shrink-0 border border-solid border-[#1C2C42] transition-colors cursor-pointer`}
              >
                <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                  {clearListStep === 0 ? "Clear all" : clearListStep === 1 ? "Clear all?" : "Cleared!"}
                </div>
              </button>
            </div>
          )}
          {viewMode === 'lists-done' ? (
            (() => {
              const doneLists = createdLists
                .filter((list) => list.completedAt != null || pendingUndoneListIds.has(list.id))
                .sort((a, b) => {
                  const tsA = pendingUndoneListCompletedAtRef.current.get(a.id) ?? a.completedAt ?? 0;
                  const tsB = pendingUndoneListCompletedAtRef.current.get(b.id) ?? b.completedAt ?? 0;
                  return tsB - tsA;
                });

              if (doneLists.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center flex-1 w-full">
                    <p className="font-['Lato',sans-serif] text-[17px] text-[#CCCCCC]">No done or deleted lists yet…</p>
                  </div>
                );
              }

              return (
                <div className="content-stretch flex flex-col items-center justify-start overflow-x-clip w-full max-w-[768px] rounded-[10px]" style={{ position: 'relative', flex: 1, minHeight: 0, overflowY: 'auto' }}>
                  <div className="flex flex-col gap-[22px] w-full" style={{ position: 'relative', zIndex: 1 }}>
                    <AnimatePresence key="lists-done-items">
                      {doneLists.map((list) => {
                        const isPendingRestore = pendingUndoneListIds.has(list.id);
                        const doneCount = list.items.filter(i => i.completed).length;
                        return (
                          <motion.div
                            key={list.id}
                            layout
                            initial={false}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ layout: { duration: 0.25 } }}
                          >
                            <div className="content-stretch flex items-start justify-between px-px relative w-full">
                              <div className="flex-[1_0_0] min-h-px min-w-px relative">
                                <div className="flex flex-row items-start size-full">
                                  <div className="content-stretch flex gap-[16px] items-start justify-between relative w-full">
                                    <button
                                      className="relative shrink-0 size-[25px] cursor-pointer flex items-center justify-center"
                                      style={{ padding: 0, background: 'none', border: 'none', lineHeight: 0, marginTop: '3px' }}
                                      onClick={() => handleListUndoClick(list.id)}
                                      aria-label="Mark list as not done"
                                    >
                                      {isPendingRestore ? (
                                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                                          <circle cx="12.5" cy="12.5" fill="white" r="11.5" stroke="#BABABA" strokeWidth="2" />
                                        </svg>
                                      ) : (
                                        <CompletedCircleIcon className="absolute block size-full" color={DONE_BLUE} />
                                      )}
                                    </button>
                                    <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative" style={{ gap: '4px', minHeight: '38px' }}>
                                      <p className={`leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap${isPendingRestore ? '' : ' line-through'}`} style={{ fontSize: '17px', color: isPendingRestore ? '#BABABA' : '#1c2c42' }}>{list.title}</p>
                                      <p className={`leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap${isPendingRestore ? '' : ' line-through'}`} style={{ fontSize: '13.5px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA' }}>{doneCount} of {list.items.length} items completed</p>
                                    </div>
                                    <RowMenuButton onClick={() => setListInfoOverlayListId(list.id)} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })()
          ) : (
            <>
            {/* List filter pills */}
            {(
              <div className="filters-menu flex items-center justify-between relative shrink-0 w-full">
                {effectiveFiltersVariant === "grouped" ? (
                  <>
                    <div className="flex items-center gap-[12px]">
                      {(["complete", "almost", "grouped-todo"] as const).map((filter) => {
                        const pillColor = LIST_CATEGORY_PILL_COLOURS[filter] || "#1C2C42";
                        const isActive = activeListFilter === filter;
                        return (
                        <button
                          key={filter}
                          onClick={() => {
                            setActiveListFilter(activeListFilter === filter ? "all" : filter);
                          }}
                          className={`${
                            isActive
                              ? "bg-white"
                              : "text-[#1C2C42]"
                          } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer ${
                            filter === "grouped-todo" ? "hidden min-[390px]:flex" : ""
                          }`}
                          style={isActive ? { boxShadow: `inset 0 0 0 2px ${pillColor}`, color: pillColor } : { boxShadow: `inset 0 0 0 1px #1C2C42` }}
                        >
                          <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                            {filter === "complete" ? "Complete" : filter === "almost" ? "Almost" : "Todo"}
                          </div>
                        </button>
                        );
                      })}
                    </div>
                    <div className="shrink-0 h-[40px] cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
                      <LaterBtn />
                    </div>
                  </>
                ) : (
                  (["complete", "almost", "started", "todo"] as const).map((filter) => {
                    const pillColor = LIST_CATEGORY_PILL_COLOURS[filter] || "#1C2C42";
                    const isActive = activeListFilter === filter;
                    return (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveListFilter(activeListFilter === filter ? "all" : filter);
                      }}
                      className={`${
                        isActive
                          ? "bg-white"
                          : "text-[#1C2C42]"
                      } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer ${
                        filter === "started" ? "max-[389px]:hidden" : ""
                      }`}
                      style={isActive ? { boxShadow: `inset 0 0 0 2px ${pillColor}`, color: pillColor } : { boxShadow: `inset 0 0 0 1px #1C2C42` }}
                    >
                      <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                        {filter === "complete" ? "Complete" : filter === "almost" ? "Almost" : filter === "started" ? "Started" : "Todo"}
                      </div>
                    </button>
                    );
                  })
                )}
              </div>
            )}
            {/* Scrollable lists container */}
            <div className="content-stretch flex flex-col items-center justify-start overflow-x-clip w-full max-w-[768px] rounded-[10px]" style={{ position: 'relative', flex: 1, minHeight: 0, overflowY: 'auto' }}>
              <div className="flex flex-col gap-[22px] w-full" style={{ position: 'relative', zIndex: 1 }}>
                {/* Dynamic list cards */}
                <AnimatePresence key={`lists-${activeListFilter}`}>
                {(() => {
                  const listCategoryOrder: Record<string, number> = { complete: 0, almost: 1, started: 2, todo: 3 };
                  const categoriseList = (list: typeof createdLists[number]) => {
                    const total = list.items.length;
                    const checked = list.items.filter(i => i.completed).length;
                    if (checked === total) return "complete";
                    if (checked / total >= 0.5) return "almost";
                    if (checked > 0) return "started";
                    return "todo";
                  };
                  const activeLists = createdLists.filter((list) => list.completedAt == null || pendingDoneListIds.has(list.id));
                  const filteredLists = activeListFilter === "all"
                    ? activeLists
                    : activeListFilter === "grouped-todo"
                      ? activeLists.filter(l => { const c = categoriseList(l); return c === "started" || c === "todo"; })
                      : activeLists.filter(l => categoriseList(l) === activeListFilter);
                  const sortedLists = [...filteredLists].sort((a, b) => {
                    const catA = listCategoryOrder[categoriseList(a)] ?? 3;
                    const catB = listCategoryOrder[categoriseList(b)] ?? 3;
                    if (catA !== catB) return catA - catB;
                    return createdLists.indexOf(a) - createdLists.indexOf(b);
                  });
                  const listCategoryColor: Record<string, string> = {
                    complete: "#0D45A0",
                    almost: "#9468D5",
                    started: "#00AFEE",
                    todo: "#939393",
                  };
                  return sortedLists.map((list) => {
                  const isReinserted = listReinsertedId === list.id;
                  const isHighlighted = listInsertHighlightId === list.id;
                  const isPendingDoneList = pendingDoneListIds.has(list.id);
                  const catColor = listCategoryColor[categoriseList(list)] || "#BABABA";
                  return (
                    <motion.div
                      key={list.id}
                      layout
                      initial={isReinserted ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={isReinserted
                        ? { opacity: { duration: 0.2 } }
                        : { layout: { duration: 0.25 } }
                      }
                      onAnimationComplete={() => {
                        if (isReinserted) {
                          setListReinsertedId(null);
                        }
                      }}
                    >
                      <div className="content-stretch flex items-start justify-between px-px relative w-full">
                        <div className="flex-[1_0_0] min-h-px min-w-px relative">
                          <div className="flex flex-row items-start size-full">
                            <div className="content-stretch flex gap-[16px] items-start justify-between relative w-full">
                              <button
                                className="relative shrink-0 size-[25px] cursor-pointer flex items-center justify-center"
                                style={{ padding: 0, background: 'none', border: 'none', lineHeight: 0, marginTop: '3px' }}
                                onClick={() => handleListCompleteClick(list.id)}
                                aria-label="Mark list as done"
                              >
                                {isPendingDoneList ? (
                                  <CompletedCircleIcon className="absolute block size-full" color={DONE_BLUE} />
                                ) : (
                                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                                    <path d="M12.5 0C19.4036 0 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0ZM12.5 2C6.70101 2 2 6.70101 2 12.5C2 18.299 6.70101 23 12.5 23C18.299 23 23 18.299 23 12.5C23 6.70101 18.299 2 12.5 2Z" fill={catColor} />
                                  </svg>
                                )}
                              </button>
                              <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative" style={{ gap: '4px', minHeight: '38px' }}>
                                <p className={`leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer${isPendingDoneList ? ' line-through' : ''}`} style={{ fontSize: '17px', color: isPendingDoneList ? '#BABABA' : (isHighlighted ? catColor : '#1c2c42') }} onClick={() => { setListInfoOverlayListId(null); setListTitle(list.title); setListItems(list.items.map(i => ({ id: (i as any).id || crypto.randomUUID(), ...i }))); setListOverlayMode('edit'); setEditingListId(list.id); setListSortMode(list.sortMode || 'insertion'); setListSmartReminders(list.smartReminders ?? true); setIsListsOverlayOpen(true); }}>{list.title}</p>
                                <p className={`leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer${isPendingDoneList ? ' line-through' : ''}`} style={{ fontSize: '13.5px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA' }} onClick={() => { setListInfoOverlayListId(null); setListTitle(list.title); setListItems(list.items.map(i => ({ id: (i as any).id || crypto.randomUUID(), ...i }))); setListOverlayMode('edit'); setEditingListId(list.id); setListSortMode(list.sortMode || 'insertion'); setListSmartReminders(list.smartReminders ?? true); setIsListsOverlayOpen(true); }}>{list.items.filter(i => i.completed).length} of {list.items.length} items completed</p>
                              </div>
                              <RowMenuButton onClick={() => setListInfoOverlayListId(list.id)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                });
                })()}
                </AnimatePresence>
              </div>
              {(() => {
                const categoriseList = (list: typeof createdLists[number]) => {
                  const total = list.items.length;
                  const checked = list.items.filter(i => i.completed).length;
                  if (checked === total) return "complete";
                  if (checked / total >= 0.5) return "almost";
                  if (checked > 0) return "started";
                  return "todo";
                };
                const visibleActiveLists = createdLists.filter((list) => list.completedAt == null || pendingDoneListIds.has(list.id));
                const hasVisible = activeListFilter === "all"
                  ? visibleActiveLists.length > 0
                  : activeListFilter === "grouped-todo"
                    ? visibleActiveLists.some(l => { const c = categoriseList(l); return c === "started" || c === "todo"; })
                    : visibleActiveLists.some(l => categoriseList(l) === activeListFilter);
                if (!hasVisible) {
                  const emptyMessages: Record<string, string> = {
                    all: "No lists here yet.. get busy!",
                    complete: "No fully checked off lists yet",
                    almost: "Nothing close to completion yet",
                    started: "All your lists are well underway",
                    todo: "All your lists have been started!",
                    "grouped-todo": "All your lists have been started!",
                  };
                  return (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                      <p className="font-['Lato',sans-serif] text-[17px] text-[#CCCCCC]">
                        {emptyMessages[activeListFilter]}
                      </p>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
            {/* Add new list button */}
            <div className="content-stretch flex items-center justify-center w-full max-w-[768px] pb-[32px] shrink-0">
              <button
                className="bg-[#1C2C42] content-stretch flex gap-[16px] items-center justify-center px-[30px] relative rounded-[100px] w-full transition-colors"
                style={{ height: 'clamp(40px, calc(20vh - 73.6px), 60px)' }}
                onClick={() => { setListTitle(pickDefaultListName(createdLists.map(l => l.title))); setListItems([]); setListOverlayMode('create'); setEditingListId(null); setListSortMode('insertion'); setListSmartReminders(true); setIsListsOverlayOpen(true); }}
              >
                <div className="relative shrink-0 size-[15px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                    <path d={svgPaths.p1e67ad80} fill="white" />
                  </svg>
                </div>
                <div className="font-['Lato',sans-serif] font-bold text-[20px] text-white whitespace-nowrap">
                  Add new list
                </div>
              </button>
            </div>
            </>
          )}
          </>
        ) : (
        <>
        {/* Filter buttons — Lists mode: rendered here inside the container */}
        {isListsEnabled && (
        <div className="filters-menu flex items-center justify-between relative shrink-0 w-full">
          {viewMode === "done-deleted" ? (<div
            className="flex items-center justify-between w-full"
          >
            {/* Done/deleted view filters */}
            <div className="flex items-center gap-[12px]">
              <button
                onClick={() => setViewMode("list")}
                className="hidden relative shrink-0 self-center cursor-pointer"
                style={{ width: 50, height: 40 }}
                aria-label="Back to reminders"
              >
                <svg className="block" style={{ width: 50, height: 40 }} fill="none" viewBox="0 0 50 40">
                  <rect fill="transparent" height="39" rx="19.5" width="49" x="0.5" y="0.5" />
                  <rect height="39" rx="19.5" stroke="#4784f8" width="49" x="0.5" y="0.5" />
                </svg>
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 8, height: 13 }} fill="none" viewBox="20.88 13.38 7.76 13.24">
                  <path d={laterBtnPaths.p17336800} fill="#4784f8" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setDoneDeletedFilter(doneDeletedFilter === 'done' ? 'all' : 'done');
                }}
                className={`${
                  doneDeletedFilter === 'done'
                    ? "bg-white"
                    : "text-[#4784f8]"
                } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer`}
                style={doneDeletedFilter === 'done' ? { boxShadow: `inset 0 0 0 2px ${DONE_BLUE}`, color: DONE_BLUE } : { boxShadow: 'inset 0 0 0 1px #4784f8', color: '#4784f8' }}
              >
                <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                  Done
                </div>
              </button>
              <button
                onClick={() => {
                  setDoneDeletedFilter(doneDeletedFilter === 'deleted' ? 'all' : 'deleted');
                }}
                className={`${
                  doneDeletedFilter === 'deleted'
                    ? "bg-white"
                    : "text-[#4784f8]"
                } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer`}
                style={doneDeletedFilter === 'deleted' ? { boxShadow: `inset 0 0 0 2px ${DELETED_GREY}`, color: DELETED_GREY } : { boxShadow: 'inset 0 0 0 1px #4784f8', color: '#4784f8' }}
              >
                <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                  Deleted
                </div>
              </button>
            </div>
            {/* Clear all button */}
            <button
              ref={clearAllButtonRef}
              onClick={handleClearListClick}
              className={`${
                clearListStep === 0
                  ? "text-[#4784f8]"
                  : "bg-[#4784f8] text-white"
              } content-stretch flex items-center justify-center h-[40px] w-[95px] relative rounded-[100px] shrink-0 border border-solid border-[#4784f8] transition-colors cursor-pointer`}
            >
              <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                {clearListStep === 0 ? "Clear all" : clearListStep === 1 ? "Clear all?" : "Cleared!"}
              </div>
            </button>
          </div>) : effectiveFiltersVariant === "grouped" ? (
            <>
              <div className="flex items-center gap-[12px]">
                {(["today", "this-week", "other"] as ReminderCategory[]).map((filter) => {
                  const pillColor = CATEGORY_COLOURS[filter] || "#4784f8";
                  const isActive = activeFilter === filter;
                  return (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(activeFilter === filter ? "all" : filter);
                    }}
                    className={`${
                      isActive
                        ? "bg-white"
                        : "text-[#4784f8]"
                    } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer ${
                      filter === "other" ? "hidden min-[390px]:flex" : ""
                    }`}
                    style={isActive ? { boxShadow: `inset 0 0 0 2px ${pillColor}`, color: pillColor } : { boxShadow: `inset 0 0 0 1px #4784f8` }}
                  >
                    <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                      {getCategoryLabel(filter)}
                    </div>
                  </button>
                  );
                })}
              </div>
              <div className="shrink-0 h-[40px] cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
                <LaterBtn />
              </div>
            </>
          ) : (
            (["today", "this-week", "later", "sometime"] as ReminderCategory[]).map((filter) => {
              const pillColor = CATEGORY_COLOURS[filter] || "#4784f8";
              const isActive = activeFilter === filter;
              return (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(activeFilter === filter ? "all" : filter);
                }}
                className={`${
                  isActive
                    ? "bg-white"
                    : "text-[#4784f8]"
                } content-stretch flex items-center justify-center px-[16px] h-[40px] relative rounded-[100px] shrink-0 cursor-pointer ${
                  filter === "sometime" ? "hidden min-[390px]:flex" : ""
                }`}
                style={isActive ? { boxShadow: `inset 0 0 0 2px ${pillColor}`, color: pillColor } : { boxShadow: `inset 0 0 0 1px #4784f8` }}
              >
                <div className="font-['Lato',sans-serif] font-bold text-[14px] whitespace-nowrap">
                  {getCategoryLabel(filter)}
                </div>
              </button>
              );
            })
          )}
        </div>
        )}
        {/* Scrollable area */}
        <div className="content-stretch flex flex-col items-center justify-start overflow-x-clip w-full max-w-[768px] rounded-[10px]" style={{ position: 'relative', flex: 1, minHeight: 0, overflowY: 'auto' }}>
          {(() => {
            const displayReminders = hideOverdue ? reminders.filter(r => !isOverdue(r, now)) : reminders;
            // Done / deleted view — derived from completedAt or deletedAt on reminders
            if (viewMode === "done-deleted") {
              const completedItems = displayReminders
                .filter((r) => r.completedAt != null || r.deletedAt != null || pendingUncompleteIds.has(r.id) || pendingUndeleteIds.has(r.id))
                .filter((r) => {
                  if (doneDeletedFilter === 'all') return true;
                  if (doneDeletedFilter === 'done') return (r.completedAt != null && r.deletedAt == null) || pendingUncompleteIds.has(r.id);
                  // 'deleted'
                  return r.deletedAt != null || pendingUndeleteIds.has(r.id);
                })
                .sort((a, b) => {
                  const tsA = pendingUndeleteSortKeyRef.current.get(a.id) ?? a.deletedAt ?? a.completedAt ?? pendingUncompleteCompletedAtRef.current.get(a.id) ?? 0;
                  const tsB = pendingUndeleteSortKeyRef.current.get(b.id) ?? b.deletedAt ?? b.completedAt ?? pendingUncompleteCompletedAtRef.current.get(b.id) ?? 0;
                  return tsB - tsA;
                });

              if (completedItems.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center flex-1 w-full gap-[4px]">
                    <p className="font-['Lato',sans-serif] text-[17px] text-[#CCCCCC]">
                      {doneDeletedFilter === 'all' ? 'No done or deleted reminders yet...' : doneDeletedFilter === 'deleted' ? 'No deleted reminders yet...' : 'No done reminders yet...'}
                    </p>
                    {doneDeletedFilter === 'done' && (
                      <p className="font-['Lato',sans-serif] text-[17px] text-[#CCCCCC]">
                        get busy!
                      </p>
                    )}
                  </div>
                );
              }
              return (
                <div className="flex flex-col gap-[22px] w-full">
                  <AnimatePresence key={`${viewMode}-${activeFilter}-${doneDeletedFilter}`}>
                  {completedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      exit={{ opacity: 0 }}
                      transition={{ layout: { duration: 0.25 } }}
                    >
                      <div className={`content-stretch flex ${showSubtitles ? 'items-start' : 'items-center'} justify-between px-px relative w-full`}>
                        <div className="flex-[1_0_0] min-h-px min-w-px relative">
                          <div className={`flex flex-row ${showSubtitles ? 'items-start' : 'items-center'} size-full`}>
                            <div className={`content-stretch flex gap-[16px] ${showSubtitles ? 'items-start' : 'items-center'} pr-[16px] relative w-full`}>
                              {/* Done/deleted tick circle — clickable to uncomplete/undelete */}
                              <button
                                className="relative shrink-0 size-[25px] cursor-pointer flex items-center justify-center"
                                style={{ padding: 0, background: 'none', border: 'none', lineHeight: 0, ...(showSubtitles ? { marginTop: '3px' } : {}) }}
                                onClick={() => handleUncompleteClick(item.id)}
                                aria-label={item.deletedAt != null ? "Undelete" : "Mark as not done"}
                              >
                                {(pendingUncompleteIds.has(item.id) || pendingUndeleteIds.has(item.id)) ? (() => {
                                  const cat = categoriseReminder(item, now);
                                  const overdue = isOverdue(item, now);
                                  const circleCol = overdue ? OVERDUE_COLOUR : CATEGORY_COLOURS[cat] ?? "#939393";
                                  return (
                                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                                      <circle cx="12.5" cy="12.5" fill="white" r="11.5" stroke={circleCol} strokeWidth="2" />
                                    </svg>
                                  );
                                })() : (() => {
                                  const checkboxFill = item.deletedAt != null ? DELETED_GREY : (isListsEnabled ? '#3F3F3F' : DONE_BLUE);
                                  return <CompletedCircleIcon className="absolute block size-full" color={checkboxFill} />;
                                })()}
                              </button>
                              {(() => {
                                const isPendingRestore = pendingUncompleteIds.has(item.id) || pendingUndeleteIds.has(item.id);
                                const isDeleted = item.deletedAt != null;
                                const overdue = isOverdue(item, now);
                                const textCol = isPendingRestore ? (overdue ? OVERDUE_COLOUR : (isListsEnabled ? '#3F3F3F' : "#1c2c42")) : (isDeleted ? DELETED_GREY : (isListsEnabled ? '#3F3F3F' : "#1C2C42"));
                                const subtitleCol = isPendingRestore ? '#BABABA' : (isDeleted ? DELETED_GREY : (isListsEnabled ? '#3F3F3F' : DONE_BLUE));
                                return (
                                  <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative" style={{ color: textCol, gap: '4px', ...(!showSubtitles ? { minHeight: '38px' } : {}) }}>
                                    <p className={`leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap${isPendingRestore ? '' : ' line-through'}`} style={{ fontSize: '17px' }}>{getDisplayTitle(item)}</p>
                                    {showSubtitles && <p className={`leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap${isPendingRestore ? '' : ' line-through'}`} style={{ fontSize: '13.5px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: subtitleCol }}>{(() => {
                                      if (item.repeatRule) {
                                        const label = formatRepeatLabel(item.repeatRule, item.schedule.kind === 'scheduled' ? item.schedule.time : undefined, item.schedule.kind === 'scheduled' ? item.schedule.date : undefined);
                                        if (label) return label;
                                      }
                                      if (item.schedule.kind === 'scheduled' && item.schedule.date) {
                                        const [sy, sm, sd] = item.schedule.date.split('-').map(Number);
                                        const dateLabel = formatSelectedDate(new Date(sy, sm - 1, sd), now);
                                        if (item.schedule.time) {
                                          return `${dateLabel} at ${formatTime12h(item.schedule.time)}`;
                                        }
                                        return dateLabel;
                                      }
                                      return 'No date / time set';
                                    })()}</p>}
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                        <RowMenuButton onClick={() => setInfoReminder(item)} />
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>
                </div>
              );
            }

            // Standard reminder list view — active reminders only (not completed, not deleted),
            // plus items in pendingDeleteIds so they remain visible during the 350ms delete window.
            const activeReminders = displayReminders.filter((r) =>
              (r.completedAt == null && r.deletedAt == null) || pendingDeleteIds.has(r.id)
            );
            const filtered = activeReminders.filter((r) => {
              if (activeFilter === "all") return true;
              // Overdue reminders appear in every filter view
              if (isOverdue(r, now)) return true;
              const cat = categoriseReminder(r, now);
              if (activeFilter === "other") return cat === "later" || cat === "sometime";
              return cat === activeFilter;
            });
            const isLastVisibleInThisList = filtered.length === 1;
            const sortedFiltered = filtered.length > 0 ? sortReminders(filtered, now) : [];
            return (
              <>
              <div className="flex flex-col gap-[22px] w-full" style={{ position: 'relative', zIndex: 1 }}>
                <AnimatePresence key={`${viewMode}-${activeFilter}`}>
                {sortedFiltered.map((reminder) => {
                  const isPendingDone = pendingDoneIds.has(reminder.id);
                  const isPendingDelete = pendingDeleteIds.has(reminder.id);
                  const isPendingAway = isPendingDone || isPendingDelete;
                  const pendingColour = isPendingDelete ? DELETED_GREY : (isListsEnabled ? '#3F3F3F' : DONE_BLUE);
                  const category = categoriseReminder(reminder, now);
                  const overdue = isOverdue(reminder, now);
                  const circleColour = overdue ? OVERDUE_COLOUR : CATEGORY_COLOURS[category] ?? "#939393";
                  const isHighlighted = insertHighlightId === reminder.id;
                  const textColour = isPendingAway ? "#BABABA" : (isHighlighted ? circleColour : (overdue ? OVERDUE_COLOUR : "#1c2c42"));
                  const isReinserted = reinsertedId === reminder.id;
                  return (
                    <motion.div
                      key={reminder.id}
                      layout
                      initial={isReinserted ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={isReinserted
                        ? { opacity: { duration: 0.2 } }
                        : { layout: { duration: 0.25 } }
                      }
                      onAnimationComplete={() => {
                        if (isReinserted) {
                          setReinsertedId(null);
                        }
                      }}
                    >
                      <div className={`content-stretch flex ${showSubtitles ? 'items-start' : 'items-center'} justify-between px-px relative w-full`}>
                        <div className="flex-[1_0_0] min-h-px min-w-px relative">
                          <div className={`flex flex-row ${showSubtitles ? 'items-start' : 'items-center'} size-full`}>
                            <div className={`content-stretch flex gap-[16px] ${showSubtitles ? 'items-start' : 'items-center'} pr-[16px] relative w-full`}>
                              {/* Circle: clickable completion target */}
                              <button
                                className="relative shrink-0 size-[25px] cursor-pointer flex items-center justify-center"
                                style={{ padding: 0, background: 'none', border: 'none', lineHeight: 0, ...(showSubtitles ? { marginTop: '3px' } : {}) }}
                                onClick={() => handleCompleteClick(reminder.id, { armEmptyDelay: isLastVisibleInThisList, filterKey: activeFilter, isRepeat: reminder.repeatRule != null })}
                                aria-label="Mark as done"
                              >
                                {isPendingAway ? (
                                  <CompletedCircleIcon className="absolute block size-full" color={pendingColour} />
                                ) : (
                                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                                    <circle cx="12.5" cy="12.5" fill="white" r="11.5" stroke={circleColour} strokeWidth="2" />
                                  </svg>
                                )}
                              </button>
                              <div
                                className={`flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative cursor-pointer`}
                                style={{ transition: 'color 300ms', gap: '4px', ...(!showSubtitles ? { minHeight: '38px' } : {}) }}
                                onClick={() => {
                                  setRepeatConfig(repeatRuleToConfig(reminder.repeatRule));
                                  setEditingReminder(reminder);
                                  setIsOverlayOpen(true);
                                }}
                              >
                                <p className={`leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap${isPendingAway ? ' line-through' : ''}`} style={{ fontSize: '17px', color: isPendingAway ? pendingColour : textColour }}>{getDisplayTitle(reminder)}</p>
                                {showSubtitles && <p className={`leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap${isPendingAway ? ' line-through' : ''}`} style={{ fontSize: '13.5px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: isPendingAway ? pendingColour : '#BABABA' }}>{(() => {
                                  if (reminder.repeatRule) {
                                    const label = formatRepeatLabel(reminder.repeatRule, reminder.schedule.kind === 'scheduled' ? reminder.schedule.time : undefined, reminder.schedule.kind === 'scheduled' ? reminder.schedule.date : undefined);
                                    if (label) return label;
                                  }
                                  if (reminder.schedule.kind === 'scheduled' && reminder.schedule.date) {
                                    const [sy, sm, sd] = reminder.schedule.date.split('-').map(Number);
                                    const dateLabel = formatSelectedDate(new Date(sy, sm - 1, sd), now);
                                    if (reminder.schedule.time) {
                                      return `${dateLabel} at ${formatTime12h(reminder.schedule.time)}`;
                                    }
                                    return dateLabel;
                                  }
                                  return 'No date / time set';
                                })()}</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <RowMenuButton onClick={() => setInfoReminder(reminder)} />
                      </div>
                    </motion.div>
                  );
                })}
                </AnimatePresence>
              </div>
              {filtered.length === 0 && (() => {
                const emptyMessages: Record<ReminderCategory | "all", string> = {
                  all: "No reminders... take it easy!",
                  today: "No reminders today... take it easy!",
                  "this-week": "No reminders this week... take it easy!",
                  later: "No reminders... take it easy!",
                  sometime: "No reminders... take it easy!",
                  other: "No reminders... take it easy!",
                };
                const delay = emptyPlaceholderDelayRef.current;
                if (delay !== null && delay.filterKey === activeFilter && Date.now() < delay.untilMs) {
                  return <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
                }
                emptyPlaceholderDelayRef.current = null;
                return (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
                    <p className="font-['Lato',sans-serif] text-[17px] text-[#CCCCCC]">
                      {emptyMessages[activeFilter]}
                    </p>
                  </div>
                );
              })()}
              {infoReminder && (
                <ReminderInfoOverlay
                  reminder={infoReminder}
                  onClose={() => setInfoReminder(null)}
                  onMarkAsDone={() => {
                    const reminderId = infoReminder.id;
                    setInfoReminder(null);
                    overlayDoneTimerRef.current = window.setTimeout(() => {
                      overlayDoneTimerRef.current = null;
                      handleCompleteClick(reminderId, { armEmptyDelay: isLastVisibleInThisList, filterKey: activeFilter, isRepeat: infoReminder?.repeatRule != null });
                    }, 200);
                  }}
                  onEdit={() => {
                    const reminderToEdit = infoReminder;
                    setInfoReminder(null);
                    if (overlayEditTimerRef.current !== null) {
                      clearTimeout(overlayEditTimerRef.current);
                    }
                    overlayEditTimerRef.current = window.setTimeout(() => {
                      overlayEditTimerRef.current = null;
                      setRepeatConfig(repeatRuleToConfig(reminderToEdit.repeatRule));
                      setEditingReminder(reminderToEdit);
                      setIsOverlayOpen(true);
                    }, 200);
                  }}
                  onDelete={() => {
                    handleDeleteClick(infoReminder.id, { armEmptyDelay: isLastVisibleInThisList, filterKey: activeFilter });
                  }}
                />
              )}
              </>
            );
          })()}
        </div>

        {/* New reminder button - fixed at bottom */}
        {viewMode !== "done-deleted" && (
        <div className="content-stretch flex items-center justify-center w-full max-w-[768px] pb-[32px] shrink-0">
          <button
            className="bg-[#4784f8] content-stretch flex gap-[16px] items-center justify-center px-[30px] relative rounded-[100px] w-full transition-colors"
            style={{ height: 'clamp(40px, calc(20vh - 73.6px), 60px)' }}
            onClick={() => setIsOverlayOpen(true)}
          >
            <div className="relative shrink-0 size-[15px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                <path d={svgPaths.p1e67ad80} fill="white" />
              </svg>
            </div>
            <div className="font-['Lato',sans-serif] font-bold text-[20px] text-white whitespace-nowrap">
              New reminder
            </div>
          </button>
        </div>
        )}
        </>
        )}
      </div>

      {/* New Reminder Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                setIsOverlayOpen(false);
                setRepeatConfig(null);
                setEditingReminder(null);
              }}
              className="fixed inset-0 bg-black/0 z-40"
            />
            
            {/* Overlay sliding from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0, top: REMINDER_OVERLAY_TOP }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 right-0 z-50 mx-auto w-full"
              style={{ bottom: 0 }}
            >
              <NewReminderOverlay
                onRepeatsOverlayOpen={() => setIsRepeatsOverlayOpen(true)}
                repeatConfig={repeatConfig}
                onRepeatConfigChange={setRepeatConfig}
                isRepeatsOverlayOpen={isRepeatsOverlayOpen}
                addReminder={addReminder}
                onClose={handleOverlayClose}
                nlcMode={nlcMode}
                nlcEnabled={nlcEnabled}
                editReminder={editingReminder}
                updateReminder={updateReminder}
                useOneMinuteIncrements={useOneMinuteTimeIncrements}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lists Overlay */}
      <AnimatePresence>
        {isListsEnabled && activeMainTab === 'lists' && isListsOverlayOpen && (() => {
          const handleListSaveAndClose = () => {
            setIsListSettingsOpen(false);
            if (!(listTitle.trim().length > 0 && listItems.length > 0)) {
              setIsListsOverlayOpen(false);
              return;
            }
            const title = listTitle.trim();
            const items = [...listItems];
            setIsListsOverlayOpen(false);
            if (newListInsertTimerRef.current !== null) {
              clearTimeout(newListInsertTimerRef.current);
            }
            if (listOverlayMode === 'edit' && editingListId !== null) {
              const targetId = editingListId;
              if (listInsertHighlightTimerRef.current !== null) {
                clearTimeout(listInsertHighlightTimerRef.current);
                listInsertHighlightTimerRef.current = null;
              }
              setListInsertHighlightId((currentId) => currentId === targetId ? null : currentId);
              newListInsertTimerRef.current = window.setTimeout(() => {
                newListInsertTimerRef.current = null;
                setCreatedLists((prev) => prev.map((l) => l.id === targetId ? { ...l, title, items, sortMode: listSortMode, smartReminders: listSmartReminders, completedAt: l.completedAt ?? null } : l));
              }, NEW_REMINDER_INSERT_DELAY);
            } else {
              const newId = crypto.randomUUID();
              setListInsertHighlightId(newId);
              if (listInsertHighlightTimerRef.current !== null) {
                clearTimeout(listInsertHighlightTimerRef.current);
              }
              newListInsertTimerRef.current = window.setTimeout(() => {
                newListInsertTimerRef.current = null;
                setCreatedLists((prev) => [...prev, { id: newId, title, items, sortMode: listSortMode, smartReminders: listSmartReminders, completedAt: null }]);
                setListReinsertedId(newId);
                listInsertHighlightTimerRef.current = window.setTimeout(() => {
                  listInsertHighlightTimerRef.current = null;
                  setListInsertHighlightId(null);
                }, INSERT_HIGHLIGHT_MS);
              }, NEW_REMINDER_INSERT_DELAY);
            }
          };
          return (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleListSaveAndClose}
              className="fixed inset-0 bg-black/0 z-40"
            />
            
            {/* Overlay sliding from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0, top: getOverlayTopPosition() }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 right-0 z-50 mx-auto w-full"
              style={{ bottom: 0 }}
            >
              <div className="bg-white content-stretch flex flex-col items-center relative rounded-tl-[20px] rounded-tr-[20px] size-full">
                <div className="relative shrink-0 w-full max-w-[768px] h-full flex flex-col">
                  <div className="content-stretch flex flex-col gap-[30px] items-start pt-[26px] px-[20px] relative w-full shrink-0">
                    <ListsHeader key={isListsOverlayOpen ? 'open' : 'closed'} value={listTitle} onChange={setListTitle} active={listTitle.trim().length > 0 && listItems.length > 0} isEditMode={listOverlayMode === 'edit' || listTitle.length > 0} onSubmit={handleListSaveAndClose} onGearClick={() => setIsListSettingsOpen(true)} />
                    <AddListItemInput onAdd={(text: string) => {
                      const newId = crypto.randomUUID();
                      setRevealedDeleteListItemId(null);
                      setListItems(prev => [{ id: newId, text, completed: false }, ...prev]);
                      if (listSortMode === 'alphabetical') {
                        setAlphabeticalPinnedListItemId(newId);
                        setAlphabeticalPinnedListItemIndex(0);
                        if (alphabeticalListItemTimerRef.current !== null) {
                          clearTimeout(alphabeticalListItemTimerRef.current);
                        }
                        alphabeticalListItemTimerRef.current = window.setTimeout(() => {
                          alphabeticalListItemTimerRef.current = null;
                          setAlphabeticalPinnedListItemId(currentId => currentId === newId ? null : currentId);
                          setAlphabeticalPinnedListItemIndex(0);
                        }, 1500);
                      }
                      setListItemReinsertedId(newId);
                      setListItemHighlightId(newId);
                      if (listItemHighlightTimerRef.current !== null) {
                        clearTimeout(listItemHighlightTimerRef.current);
                      }
                      listItemHighlightTimerRef.current = window.setTimeout(() => {
                        listItemHighlightTimerRef.current = null;
                        setListItemHighlightId(null);
                      }, INSERT_HIGHLIGHT_MS);
                    }} isEmpty={listItems.length === 0} accentColor={currentListAccentColor} />
                  </div>
                  <div className="flex flex-col gap-[22px] items-start px-[20px] pb-[26px] relative w-full flex-1 min-h-0 overflow-y-auto mt-[22px]">
                    <AnimatePresence initial={false}>
                    {displayListItems.map((item) => {
                      const isItemReinserted = listItemReinsertedId === item.id;
                      const isItemHighlighted = listItemHighlightId === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          layout="position"
                          initial={isItemReinserted ? { opacity: 0 } : false}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={isItemReinserted
                            ? { opacity: { duration: 0.2 }, layout: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 } }
                            : { layout: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 } }
                          }
                          onAnimationComplete={() => {
                            if (isItemReinserted) {
                              setListItemReinsertedId(null);
                            }
                          }}
                          className="w-full"
                        >
                          <EditableListItem name={item.text} completed={item.completed} isHighlighted={isItemHighlighted} accentColor={currentListAccentColor} isDeleteRevealed={revealedDeleteListItemId === item.id} onDeleteRevealChange={(revealed) => setRevealedDeleteListItemId(revealed ? item.id : null)} onToggle={() => { setRevealedDeleteListItemId(null); setListItems(prev => { const next = [...prev]; const idx = next.findIndex(i => i.id === item.id); if (idx !== -1) { next[idx] = { ...next[idx], completed: !next[idx].completed }; } return next; }); }} onDelete={() => { setRevealedDeleteListItemId(null); setListItems(prev => prev.filter((listItem) => listItem.id !== item.id)); }} editable={true} onCommit={(val: string) => {
                            const currentIndex = displayListItems.findIndex((displayItem) => displayItem.id === item.id);
                            setRevealedDeleteListItemId(null);
                            setListItems(prev => {
                              const next = [...prev];
                              const idx = next.findIndex(i => i.id === item.id);
                              if (idx !== -1) {
                                next[idx] = { ...next[idx], text: val };
                              }
                              return next;
                            });
                            if (listSortMode === 'alphabetical' && currentIndex !== -1) {
                              setAlphabeticalPinnedListItemId(item.id);
                              setAlphabeticalPinnedListItemIndex(currentIndex);
                              if (alphabeticalListItemTimerRef.current !== null) {
                                clearTimeout(alphabeticalListItemTimerRef.current);
                              }
                              alphabeticalListItemTimerRef.current = window.setTimeout(() => {
                                alphabeticalListItemTimerRef.current = null;
                                setAlphabeticalPinnedListItemId(currentId => currentId === item.id ? null : currentId);
                                setAlphabeticalPinnedListItemIndex(0);
                              }, 1500);
                              setListItemHighlightId(item.id);
                              if (listItemHighlightTimerRef.current !== null) {
                                clearTimeout(listItemHighlightTimerRef.current);
                              }
                              listItemHighlightTimerRef.current = window.setTimeout(() => {
                                listItemHighlightTimerRef.current = null;
                                setListItemHighlightId(null);
                              }, INSERT_HIGHLIGHT_MS);
                            }
                          }} />
                        </motion.div>
                      );
                    })}
                    </AnimatePresence>
                  </div>
                  {listOverlayMode === 'create' && (
                    <button
                      type="button"
                      aria-label="Smart list"
                      className="absolute bottom-[36px] right-[30px] z-10"
                      style={{ width: 50, height: 50, padding: 0, background: 'none', border: 'none', lineHeight: 0 }}
                    >
                      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="50" height="50" rx="25" fill="#1C2C42"/>
                        <path d="M25.3473 13.5952C25.7999 13.5975 26.1649 13.9666 26.1628 14.4192C26.1606 14.8719 25.7915 15.2369 25.3388 15.2347C24.8274 15.2322 25.2839 15.2326 24.7035 15.2326C22.2328 15.2326 20.4621 15.2341 19.1156 15.4151C17.7928 15.593 17.003 15.9308 16.4204 16.5134C15.8378 17.0961 15.4999 17.8858 15.3221 19.2086C15.141 20.5551 15.1395 22.3259 15.1395 24.7965C15.1395 27.2671 15.141 29.0379 15.3221 30.3844C15.4999 31.7072 15.8378 32.4969 16.4204 33.0796C17.003 33.6622 17.7928 34.0001 19.1156 34.1779C20.4621 34.359 22.2328 34.3605 24.7035 34.3605C27.1741 34.3605 28.9448 34.359 30.2914 34.1779C31.6142 34.0001 32.4039 33.6622 32.9866 33.0796C33.5691 32.4969 33.9071 31.7072 34.0849 30.3844C34.2659 29.0379 34.2674 27.2671 34.2674 24.7965C34.2674 24.2161 34.2678 24.6726 34.2653 24.1612C34.2631 23.7085 34.6281 23.3394 35.0808 23.3372C35.5334 23.3351 35.9025 23.7001 35.9048 24.1527C35.9074 24.6689 35.907 24.2169 35.907 24.7965C35.907 27.2205 35.9086 29.1211 35.7095 30.6021C35.5072 32.1069 35.0837 33.3007 34.1458 34.2388C33.2077 35.1768 32.0138 35.6002 30.5091 35.8025C29.028 36.0016 27.1275 36 24.7035 36C22.2795 36 20.3789 36.0016 18.8979 35.8025C17.3932 35.6002 16.1993 35.1768 15.2612 34.2388C14.3232 33.3007 13.8998 32.1069 13.6975 30.6021C13.4984 29.121 13.5 27.2205 13.5 24.7965C13.5 22.3725 13.4984 20.472 13.6975 18.9909C13.8998 17.4862 14.3232 16.2923 15.2612 15.3542C16.1993 14.4162 17.3932 13.9928 18.8979 13.7905C20.3789 13.5914 22.2795 13.593 24.7035 13.593C25.2831 13.593 24.8311 13.5926 25.3473 13.5952Z" fill="white"/>
                        <path d="M30.0256 29.175C30.4781 29.1752 30.8453 29.5422 30.8453 29.9948C30.8453 30.4474 30.4782 30.8144 30.0256 30.8145H19.3814C18.9287 30.8145 18.5616 30.4475 18.5616 29.9948C18.5617 29.5421 18.9288 29.1751 19.3814 29.175H30.0256Z" fill="white"/>
                        <path d="M30.0256 24.4347C30.4782 24.4348 30.8453 24.8018 30.8453 25.2544C30.8451 25.7069 30.478 26.074 30.0256 26.0742H19.3814C18.9289 26.0741 18.5619 25.7069 18.5616 25.2544C18.5616 24.8017 18.9287 24.4347 19.3814 24.4347H30.0256Z" fill="white"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M33.6808 11.2773C34.0237 11.2773 34.3302 11.4907 34.4494 11.8121L34.7311 12.5742C35.1268 13.6436 35.2534 13.9344 35.4613 14.1423C35.6691 14.3501 35.96 14.4767 37.0293 14.8724L37.7914 15.1542C38.1128 15.2733 38.3262 15.5799 38.3262 15.9227C38.3262 16.2655 38.1128 16.572 37.7914 16.6912L37.0293 16.973C35.96 17.3687 35.6691 17.4953 35.4613 17.7031C35.2534 17.9109 35.1268 18.2018 34.7311 19.2711L34.4494 20.0333C34.3302 20.3547 34.0237 20.568 33.6808 20.568C33.338 20.568 33.0315 20.3547 32.9123 20.0333L32.6305 19.2711C32.2348 18.2018 32.1082 17.9109 31.9004 17.7031C31.6925 17.4953 31.4017 17.3687 30.3324 16.973L29.5702 16.6912C29.2488 16.572 29.0355 16.2655 29.0355 15.9227C29.0355 15.5799 29.2488 15.2733 29.5702 15.1542L30.3324 14.8724C31.4017 14.4767 31.6925 14.3501 31.9004 14.1423C32.1082 13.9344 32.2348 13.6436 32.6305 12.5742L32.9123 11.8121L32.9657 11.6968C33.1089 11.4407 33.3809 11.2773 33.6808 11.2773ZM33.6808 14.3718C33.5115 14.7315 33.3209 15.0402 33.0596 15.3015C32.7983 15.5627 32.4896 15.7534 32.1299 15.9227C32.4896 16.092 32.7983 16.2827 33.0596 16.5439C33.3206 16.805 33.5116 17.1132 33.6808 17.4726C33.85 17.1132 34.041 16.805 34.3021 16.5439C34.5631 16.2829 34.8714 16.0919 35.2307 15.9227C34.8714 15.7535 34.5631 15.5625 34.3021 15.3015C34.0408 15.0402 33.8501 14.7315 33.6808 14.3718Z" fill="white"/>
                        <path d="M26.4302 19.9089C26.883 19.9089 27.25 20.2759 27.25 20.7286C27.25 21.1814 26.883 21.5484 26.4302 21.5484H19.3814C18.9287 21.5484 18.5616 21.1814 18.5616 20.7286C18.5616 20.2759 18.9287 19.9089 19.3814 19.9089H26.4302Z" fill="white"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
            {/* List Settings Overlay */}
            {isListSettingsOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black/50 z-[60]"
                  onClick={() => setIsListSettingsOpen(false)}
                />
                <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-[20px]">
                  <div className="pointer-events-auto w-full max-w-[400px]">
                    <InfoOverlay sortMode={listSortMode} onSortChange={setListSortMode} listTitle={listTitle} onUncheckAll={() => { setListItems(prev => prev.map(i => ({ ...i, completed: false }))); setIsListSettingsOpen(false); }} allUnchecked={listItems.every(i => !i.completed)} smartReminders={listSmartReminders} onSmartRemindersChange={handleSmartRemindersChange} />
                  </div>
                </div>
              </>
            )}
          </>
          );
        })()}
      </AnimatePresence>

      {listInfoOverlayList && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setListInfoOverlayListId(null)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-[20px]">
            <div className="pointer-events-auto w-full max-w-[400px]">
              <ListInfoOverlay
                listTitle={listInfoOverlayList.title}
                smartReminders={listInfoOverlayList.smartReminders ?? true}
                onSmartRemindersChange={(val) => {
                  setCreatedLists((prev) => prev.map((list) => (
                    list.id === listInfoOverlayList.id ? { ...list, smartReminders: val } : list
                  )));
                }}
                onMarkAsDone={() => {
                  const listId = listInfoOverlayList.id;
                  setListInfoOverlayListId(null);
                  window.setTimeout(() => {
                    handleListCompleteClick(listId);
                  }, 200);
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* Dev Tools Overlay */}
      <AnimatePresence>
        {isDevToolsOpen && (
          <>
            {/* Click-outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsDevToolsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Overlay sliding from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0, top: getOverlayTopPosition() }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 right-0 z-50 mx-auto w-full"
              style={{ bottom: 0 }}
            >
              <DevToolsOverlay onClose={() => setIsDevToolsOpen(false)} onClearReminders={() => setReminders([])} addReminder={addReminder} addReminders={addReminders} nlcMode={nlcMode} onNlcModeChange={setNlcMode} nlcEnabled={nlcEnabled} onNlcEnabledChange={setNlcEnabled} filtersMenuVariant={filtersMenuVariant} onFiltersMenuVariantChange={handleFiltersMenuVariantChange} hideOverdue={hideOverdue} onHideOverdueChange={setHideOverdue} isOnboardingTutorialEnabled={isOnboardingTutorialEnabled} onOnboardingTutorialEnabledChange={setIsOnboardingTutorialEnabled} isListsEnabled={isListsEnabled} onListsEnabledChange={setIsListsEnabled} showTutorialOnFirstLaunch={showTutorialOnFirstLaunch} onShowTutorialOnFirstLaunchChange={setShowTutorialOnFirstLaunch} showTutorialOnEveryStart={showTutorialOnEveryStart} onShowTutorialOnEveryStartChange={setShowTutorialOnEveryStart} isDevToolsUnlocked={isDevToolsUnlocked} onDevToolsUnlock={() => setIsDevToolsUnlocked(true)} isDevToolsPasswordRequired={isDevToolsPasswordRequired} onDevToolsPasswordRequiredChange={setIsDevToolsPasswordRequired} useOneMinuteIncrements={useOneMinuteTimeIncrements} onUseOneMinuteIncrementsChange={setUseOneMinuteTimeIncrements} onClearLists={() => setCreatedLists([])} onGenerateLists={(lists) => setCreatedLists(lists)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Repeats Overlay */}
      <AnimatePresence>
        {isRepeatsOverlayOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsRepeatsOverlayOpen(false)}
              className="fixed inset-0 bg-black/0 z-40"
            />
            
            {/* Overlay sliding from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0, top: getOverlayTopPosition() }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 right-0 z-50 mx-auto w-full"
              style={{ bottom: 0 }}
            >
              <RepeatsOverlay
                onClose={(config) => {
                  if (config !== undefined) setRepeatConfig(config);
                  setIsRepeatsOverlayOpen(false);
                }}
                initialConfig={repeatConfig}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Overlay */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-black/0 z-40"
            />

            {/* Overlay sliding from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0, top: getOverlayTopPosition() }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 right-0 z-50 mx-auto w-full"
              style={{ bottom: 0 }}
            >
              <SettingsOverlay onClose={() => setIsSettingsOpen(false)} showDateAndTimeSubtitles={showDateAndTimeSubtitles} onShowDateAndTimeSubtitlesChange={setShowDateAndTimeSubtitles} onTutorialOpen={handleTutorialOpen} isOnboardingTutorialEnabled={isOnboardingTutorialEnabled} isListsEnabled={isListsEnabled} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {isTutorialOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsTutorialOpen(false)}
              className="fixed inset-0 bg-black/0 z-40"
            />

            {/* Overlay sliding from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0, top: TUTORIAL_OVERLAY_TOP }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed left-0 right-0 z-50 mx-auto w-full"
              style={{ bottom: 0 }}
            >
              <TutorialOverlay onClose={() => setIsTutorialOpen(false)} isEnabled={isOnboardingTutorialEnabled} filtersMenuVariant={filtersMenuVariant} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
