import { useEffect, useRef } from "react";
import type { Reminder } from "../reminder-utils";
import { formatRepeatLabel, isOverdue } from "../reminder-utils";

// ── Due line formatting ──────────────────────────────────────────────

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function ordinalSuffix(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

function formatTime12h(time: string): string {
  const [hh, mm] = time.split(":").map(Number);
  const suffix = hh >= 12 ? "pm" : "am";
  const h12 = hh === 0 ? 12 : hh > 12 ? hh - 12 : hh;
  if (mm === 0) return `${h12}${suffix}`;
  return `${h12}:${String(mm).padStart(2, "0")}${suffix}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatDueLine(reminder: Reminder, now: Date = new Date()): string {
  const hasDate =
    reminder.schedule.kind === "scheduled" && !!reminder.schedule.date;
  const hasTime =
    reminder.schedule.kind === "scheduled" && !!reminder.schedule.time;

  if (!hasDate && !hasTime) return "No schedule set";

  let datePart = "";
  if (hasDate) {
    const [y, m, d] = (reminder.schedule as { date: string }).date
      .split("-")
      .map(Number);
    const reminderDate = new Date(y, m - 1, d);

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (isSameDay(reminderDate, today)) {
      datePart = "today";
    } else if (isSameDay(reminderDate, tomorrow)) {
      datePart = "tomorrow";
    } else {
      const wd = WEEKDAY_SHORT[reminderDate.getDay()];
      const md = reminderDate.getDate();
      const mn = MONTH_SHORT[reminderDate.getMonth()];
      datePart = `${wd} ${ordinalSuffix(md)} ${mn}`;
    }
  }

  let timePart = "";
  if (hasTime) {
    timePart = formatTime12h(
      (reminder.schedule as { time: string }).time
    );
  }

  const overdue = isOverdue(reminder, now);
  const prefix = overdue ? "Was due" : "Due";

  if (datePart && timePart) return `${prefix} ${datePart} at ${timePart}`;
  if (datePart) return `${prefix} ${datePart}`;
  return `${prefix} at ${timePart}`;
}

// ── Repeats line formatting ──────────────────────────────────────────

export function formatRepeatsLine(
  repeatRule: Reminder["repeatRule"]
): string | null {
  const label = formatRepeatLabel(repeatRule);
  if (!label) return null;
  return `(${label})`;
}

// ── Component ────────────────────────────────────────────────────────

interface ReminderInfoOverlayProps {
  reminder: Reminder;
  onClose: () => void;
  onMarkAsDone: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ReminderInfoOverlay({
  reminder,
  onClose,
  onMarkAsDone,
  onEdit,
  onDelete,
}: ReminderInfoOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape key closes overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus panel on mount
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  // Prevent background scrolling
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const dueLine = formatDueLine(reminder);
  const repeatsLine = formatRepeatsLine(reminder.repeatRule);
  const overdue = isOverdue(reminder, new Date());
  const dueLineColour = overdue ? "#FF0000" : "#1c2c42";

  return (
    <>
      {/* 50% dark backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60]"
        onClick={onClose}
      />

      {/* Centred modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          className="bg-white relative flex flex-col gap-[40px] items-center py-[40px] px-[34px] rounded-[32px] pointer-events-auto outline-none"
          style={{ width: 322 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Reminder text in single quotes */}
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2c42] text-[17px] text-center">
            <p className="leading-[normal] whitespace-pre-wrap">'{reminder.displayText}'</p>
          </div>

          {/* Due line */}
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[17px] text-center w-[min-content]" style={{ color: dueLineColour }}>
            <p className="leading-[normal] whitespace-pre-wrap">{dueLine}</p>
          </div>

          {/* Repeats line (optional) */}
          {repeatsLine && (
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#1c2c42] text-[17px] text-center w-[min-content]">
              <p className="leading-[normal] whitespace-pre-wrap">{repeatsLine}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full">
            <button
              className="bg-[#1c2c42] cursor-pointer h-[50px] relative rounded-[100px] shrink-0 w-full"
              onClick={onMarkAsDone}
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-left text-white whitespace-nowrap">
                    <p className="leading-[normal]">Mark as done</p>
                  </div>
                </div>
              </div>
            </button>

            <button
              className="bg-[#4784f8] cursor-pointer h-[50px] relative rounded-[100px] shrink-0 w-full"
              onClick={onEdit}
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                    <p className="leading-[normal]">Edit</p>
                  </div>
                </div>
              </div>
            </button>

            <button
              className="bg-[#939393] cursor-pointer h-[50px] relative rounded-[100px] shrink-0 w-full"
              onClick={onDelete}
            >
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                    <p className="leading-[normal]">Delete</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
