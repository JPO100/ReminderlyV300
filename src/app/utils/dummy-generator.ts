/**
 * Dummy Reminder Generator
 *
 * Generates realistic reminders that land in the correct category buckets.
 * Uses categoriseReminder as the source of truth for bucket validation.
 * Produces the same Reminder shape as the real creation path.
 */

import type { Reminder } from '../reminder-utils';
import type { RepeatRule } from '../types/reminder';
import { categoriseReminder } from '../reminder-utils';

// --- Text pools (bucket-appropriate, natural language) ---

const TEXT_POOLS: Record<'today' | 'this-week' | 'later' | 'sometime', string[]> = {
  today: [
    'Pick up groceries',
    'Call mum',
    'Pay electricity bill',
    'Book dentist appointment',
    'Reply to Sarah',
    'Take parcel to post office',
    'Water the plants',
    'Pick up prescription',
    'Send birthday card',
    'Charge headphones',
    'Defrost chicken for dinner',
    'Drop off dry cleaning',
    'Buy milk on the way home',
    'Submit timesheet',
    'Check bank balance',
  ],
  'this-week': [
    'Book haircut',
    'Send invoice to client',
    'Sort weekend plans',
    'Meal prep for next week',
    'Return library books',
    'Schedule car MOT',
    'Buy new running shoes',
    'Organise desk drawers',
    'Call broadband provider',
    'Update CV',
    'Order contact lenses',
    'Tidy spare room',
    'Fix leaky tap',
    'Back up phone photos',
    'Write thank-you note',
  ],
  later: [
    'Renew home insurance',
    'Schedule eye test',
    'Plan holiday flights',
    'Research new phone',
    'Service the boiler',
    'Sort out loft insulation',
    'Renew passport',
    'Book restaurant for anniversary',
    'Replace kitchen bin',
    'Get quotes for driveway',
    'Set up pension review',
    'Order new winter coat',
    'Register for first aid course',
    'Clean out gutters',
    'Compare energy tariffs',
  ],
  sometime: [
    'Declutter the garage',
    'Learn basic Spanish',
    'Read that book on the shelf',
    'Try making sourdough',
    'Set up a budget spreadsheet',
    'Frame the photos from holiday',
    'Donate old clothes',
    'Look into volunteering',
    'Reorganise the bookshelf',
    'Start a journal',
    'Fix the garden fence',
    'Sort out photo albums',
    'Try a pottery class',
    'Learn to play chess',
    'Paint the hallway',
  ],
};

// --- Time generation ---

type TimeSlot = { hour: number; minuteOptions: number[] };

const TIME_SLOTS: { weight: number; slots: TimeSlot[] }[] = [
  // 8am-10am
  {
    weight: 30,
    slots: [
      { hour: 8, minuteOptions: [0, 15, 30, 45] },
      { hour: 9, minuteOptions: [0, 15, 30, 45] },
      { hour: 10, minuteOptions: [0] },
    ],
  },
  // 12pm-2pm
  {
    weight: 30,
    slots: [
      { hour: 12, minuteOptions: [0, 15, 30, 45] },
      { hour: 13, minuteOptions: [0, 15, 30, 45] },
      { hour: 14, minuteOptions: [0] },
    ],
  },
  // 5pm-8:30pm
  {
    weight: 30,
    slots: [
      { hour: 17, minuteOptions: [0, 15, 30, 45] },
      { hour: 18, minuteOptions: [0, 15, 30, 45] },
      { hour: 19, minuteOptions: [0, 15, 30, 45] },
      { hour: 20, minuteOptions: [0, 15, 30] },
    ],
  },
  // Occasional 9pm
  {
    weight: 10,
    slots: [
      { hour: 21, minuteOptions: [0] },
    ],
  },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomTime(): string {
  // Weighted random selection of time slot group
  const totalWeight = TIME_SLOTS.reduce((s, g) => s + g.weight, 0);
  let r = Math.random() * totalWeight;
  let group = TIME_SLOTS[0];
  for (const g of TIME_SLOTS) {
    r -= g.weight;
    if (r <= 0) { group = g; break; }
  }

  const slot = pickRandom(group.slots);
  const minute = pickRandom(slot.minuteOptions);
  return `${String(slot.hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

// --- Date helpers ---

function toYyyyMmDd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns the Monday of the current week (Mon-Sun, UK style).
 */
function getCurrentMonday(now: Date): Date {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const dow = today.getDay(); // 0=Sun
  const offset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + offset);
  return monday;
}

// --- Repeat generation ---

const DAY_ABBREVS: Array<'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'> = [
  'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su',
];

function maybeGenerateRepeat(): RepeatRule | null {
  // 25-35% chance
  if (Math.random() > 0.30) return null;

  return generateRepeatRule();
}

function generateRepeatRule(): RepeatRule {
  const kind = Math.random();

  if (kind < 0.4) {
    // Daily (interval 1 or 2)
    return { frequency: 'daily', interval: Math.random() < 0.8 ? 1 : 2, byDay: null };
  } else if (kind < 0.8) {
    // Weekly
    const withByDay = Math.random() < 0.4;
    if (withByDay) {
      // Pick 1-3 random days
      const count = 1 + Math.floor(Math.random() * 3);
      const shuffled = [...DAY_ABBREVS].sort(() => Math.random() - 0.5);
      const byDay = shuffled.slice(0, count);
      return { frequency: 'weekly', interval: 1, byDay };
    }
    return { frequency: 'weekly', interval: Math.random() < 0.7 ? 1 : 2, byDay: null };
  } else {
    // Monthly
    return { frequency: 'monthly', interval: 1, byDay: null };
  }
}

// --- ID generation (matches App.tsx) ---

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// --- Candidate date generators per bucket ---

function generateCandidateDatesForThisWeek(now: Date): string[] {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const monday = getCurrentMonday(now);
  const sunday = addDays(monday, 6);
  const candidates: string[] = [];

  // Future dates this week, excluding today
  for (let d = addDays(today, 1); d <= sunday; d = addDays(d, 1)) {
    candidates.push(toYyyyMmDd(d));
  }
  return candidates;
}

function generateCandidateDateForLater(now: Date): string {
  const monday = getCurrentMonday(now);
  const nextMonday = addDays(monday, 7);
  // 1-6 weeks beyond this Sunday = nextMonday + 0 to 41 days
  const daysOffset = Math.floor(Math.random() * 42);
  const date = addDays(nextMonday, daysOffset);
  return toYyyyMmDd(date);
}

// --- Main generator ---

export interface DummyGenerationCounts {
  overdue: number;
  today: number;
  thisWeek: number;
  later: number;
  sometime: number;
  done: number;
  deleted: number;
}

export interface DummyRepeatFlags {
  overdue: boolean;
  today: boolean;
  thisWeek: boolean;
  later: boolean;
  done: boolean;
  deleted: boolean;
}

function randomRepeatBudget(active: boolean): number {
  if (!active) return 0;
  return 1 + Math.floor(Math.random() * 5); // 1-5
}

export function generateDummyReminders(counts: DummyGenerationCounts, repeatFlags: DummyRepeatFlags): Reminder[] {
  const now = new Date();
  const reminders: Reminder[] = [];

  // Shuffle text pools so we get variety without repeating until exhausted
  const shuffledPools: Record<string, string[]> = {};
  for (const key of Object.keys(TEXT_POOLS) as Array<keyof typeof TEXT_POOLS>) {
    shuffledPools[key] = [...TEXT_POOLS[key]].sort(() => Math.random() - 0.5);
  }
  const poolIndex: Record<string, number> = { today: 0, 'this-week': 0, later: 0, sometime: 0 };

  // Per-type repeat budgets
  const repeatBudgets: Record<string, number> = {
    overdue: randomRepeatBudget(repeatFlags.overdue),
    today: randomRepeatBudget(repeatFlags.today),
    'this-week': randomRepeatBudget(repeatFlags.thisWeek),
    later: randomRepeatBudget(repeatFlags.later),
    sometime: 0, // never repeats
    done: randomRepeatBudget(repeatFlags.done),
    deleted: randomRepeatBudget(repeatFlags.deleted),
  };

  function pickText(bucket: 'today' | 'this-week' | 'later' | 'sometime'): string {
    const pool = shuffledPools[bucket];
    const idx = poolIndex[bucket] % pool.length;
    poolIndex[bucket]++;
    return pool[idx];
  }

  function makeReminder(
    bucket: 'today' | 'this-week' | 'later' | 'sometime',
    dateStr: string | null,
    budgetKey?: string,
  ): Reminder {
    const hasTime = dateStr !== null && Math.random() < 0.65;
    const time = hasTime ? pickRandomTime() : undefined;
    const bk = budgetKey || bucket;
    let repeatRule: RepeatRule | null = null;
    if (dateStr !== null && repeatBudgets[bk] > 0) {
      repeatRule = generateRepeatRule();
      repeatBudgets[bk]--;
    }

    const schedule = dateStr === null
      ? { kind: 'sometime' as const }
      : time
        ? { kind: 'scheduled' as const, date: dateStr, time }
        : { kind: 'scheduled' as const, date: dateStr };

    const text = pickText(bucket);

    return {
      id: generateId(),
      originalText: text,
      displayText: text,
      createdAt: Date.now() + reminders.length, // slight offset for unique ordering
      schedule,
      repeatRule,
    };
  }

  // --- Today ---
  const todayDate = toYyyyMmDd(now);

  // --- Overdue ---
  for (let i = 0; i < counts.overdue; i++) {
    // Schedule 1-14 days in the past
    const daysAgo = 1 + Math.floor(Math.random() * 14);
    const pastDate = addDays(now, -daysAgo);
    const dateStr = toYyyyMmDd(pastDate);
    const reminder = makeReminder('today', dateStr, 'overdue');
    reminders.push(reminder);
  }

  for (let i = 0; i < counts.today; i++) {
    const reminder = makeReminder('today', todayDate);
    // Validate
    const cat = categoriseReminder(reminder, now);
    if (cat !== 'today') {
      // Should not happen for today, but safety net
      continue;
    }
    reminders.push(reminder);
  }

  // --- This week ---
  const thisWeekCandidates = generateCandidateDatesForThisWeek(now);

  for (let i = 0; i < counts.thisWeek; i++) {
    if (thisWeekCandidates.length > 0) {
      // Pick from available this-week dates (cycle through them)
      const dateStr = thisWeekCandidates[i % thisWeekCandidates.length];
      const reminder = makeReminder('this-week', dateStr, 'this-week');
      const cat = categoriseReminder(reminder, now);
      if (cat === 'this-week') {
        reminders.push(reminder);
        continue;
      }
    }
    // No valid this-week dates available (e.g., today is Sunday) — spill into later
    let attempts = 0;
    while (attempts < 10) {
      const laterDate = generateCandidateDateForLater(now);
      const laterReminder = makeReminder('later', laterDate, 'later');
      const cat = categoriseReminder(laterReminder, now);
      if (cat === 'later') {
        reminders.push(laterReminder);
        break;
      }
      attempts++;
    }
  }

  // --- Later ---
  for (let i = 0; i < counts.later; i++) {
    // Generate with retry to ensure it lands in 'later'
    let attempts = 0;
    while (attempts < 10) {
      const dateStr = generateCandidateDateForLater(now);
      const reminder = makeReminder('later', dateStr, 'later');
      const cat = categoriseReminder(reminder, now);
      if (cat === 'later') {
        reminders.push(reminder);
        break;
      }
      attempts++;
    }
  }

  // --- Sometime ---
  for (let i = 0; i < counts.sometime; i++) {
    const reminder = makeReminder('sometime', null);
    reminders.push(reminder);
  }

  // --- Done ---
  // Generate done reminders by picking from various buckets and setting completedAt
  const doneBuckets: Array<'today' | 'this-week' | 'later' | 'sometime'> = ['today', 'this-week', 'later', 'sometime'];
  for (let i = 0; i < counts.done; i++) {
    const bucket = doneBuckets[i % doneBuckets.length];
    let dateStr: string | null = null;
    if (bucket === 'today') {
      dateStr = todayDate;
    } else if (bucket === 'this-week') {
      const candidates = generateCandidateDatesForThisWeek(now);
      dateStr = candidates.length > 0 ? candidates[i % candidates.length] : todayDate;
    } else if (bucket === 'later') {
      dateStr = generateCandidateDateForLater(now);
    }
    // sometime leaves dateStr null
    const reminder = makeReminder(bucket, dateStr, 'done');
    // Set completedAt to some time in the past (1-48 hours ago)
    const hoursAgo = 1 + Math.floor(Math.random() * 48);
    reminder.completedAt = Date.now() - hoursAgo * 60 * 60 * 1000;
    reminders.push(reminder);
  }

  // --- Deleted ---
  // Generate deleted reminders by picking from various buckets and setting deletedAt
  const deletedBuckets: Array<'today' | 'this-week' | 'later' | 'sometime'> = ['today', 'this-week', 'later', 'sometime'];
  for (let i = 0; i < counts.deleted; i++) {
    const bucket = deletedBuckets[i % deletedBuckets.length];
    let dateStr: string | null = null;
    if (bucket === 'today') {
      dateStr = todayDate;
    } else if (bucket === 'this-week') {
      const candidates = generateCandidateDatesForThisWeek(now);
      dateStr = candidates.length > 0 ? candidates[i % candidates.length] : todayDate;
    } else if (bucket === 'later') {
      dateStr = generateCandidateDateForLater(now);
    }
    // sometime leaves dateStr null
    const reminder = makeReminder(bucket, dateStr, 'deleted');
    // Set deletedAt to some time in the past (1-48 hours ago)
    const hoursAgo = 1 + Math.floor(Math.random() * 48);
    reminder.deletedAt = Date.now() - hoursAgo * 60 * 60 * 1000;
    reminders.push(reminder);
  }

  return reminders;
}