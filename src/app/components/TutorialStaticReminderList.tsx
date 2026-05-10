import { AnimatePresence, motion } from "motion/react";
import { formatReminderNextOccurrenceLabel, formatRepeatLabel, formatRepeatRuleText, formatScheduledDateForRow } from "../reminder-utils";
import { useEffect, useRef, useState } from "react";
import { formatTime12h } from "../utils/normalise-text";

const TUTORIAL_REMINDER_LIST_SCALE = 0.696;
const TUTORIAL_NOW = new Date(2025, 7, 11, 12, 0, 0, 0);
const PAGE_1_INSERT_START_GAP = 600;
const NEW_REMINDER_INSERT_DELAY = 500;
const INSERT_HIGHLIGHT_MS = 1000;
const PAGE_1_BUILD_SEQUENCE_IDS = ["sometime", "later-2", "later", "this-week", "today-2", "today"] as const;

type TutorialReminder = {
  id: string;
  title: string;
  circleColor: string;
  schedule:
    | { kind: "scheduled"; date: string; time?: string }
    | { kind: "sometime" };
  repeatRule?: { frequency: "weekly" | "monthly"; interval: number; byDay: string[] | null } | null;
};

const STATIC_REMINDERS: readonly TutorialReminder[] = [
  {
    id: "today",
    title: "Pick up milk",
    circleColor: "#00AFEE",
    schedule: { kind: "scheduled", date: "2025-08-11", time: "14:00" },
  },
  {
    id: "today-2",
    title: "Call the dentist",
    circleColor: "#00AFEE",
    schedule: { kind: "scheduled", date: "2025-08-11", time: "16:30" },
  },
  {
    id: "this-week",
    title: "Pay credit card",
    circleColor: "#E466FD",
    schedule: { kind: "scheduled", date: "2025-08-12", time: "11:00" },
    repeatRule: { frequency: "monthly", interval: 1, byDay: null },
  },
  {
    id: "later",
    title: "Submit expenses",
    circleColor: "#FDB146",
    schedule: { kind: "scheduled", date: "2025-08-28", time: "08:00" },
  },
  {
    id: "later-2",
    title: "Put the bins out",
    circleColor: "#FDB146",
    schedule: { kind: "scheduled", date: "2025-09-18", time: "19:00" },
    repeatRule: { frequency: "weekly", interval: 1, byDay: ["th"] },
  },
  {
    id: "sometime",
    title: "Organise family photo",
    circleColor: "#939393",
    schedule: { kind: "sometime" },
  },
] as const;

function getTutorialReminderSubtitle(reminder: TutorialReminder): string {
  if (reminder.repeatRule) {
    if (reminder.schedule.kind === "scheduled" && reminder.schedule.date) {
      const nextOccurrenceLabel = formatReminderNextOccurrenceLabel(reminder.schedule.date, reminder.schedule.time, TUTORIAL_NOW);
      const repeatText = formatRepeatRuleText(reminder.repeatRule, reminder.schedule.date);
      if (nextOccurrenceLabel && repeatText) {
        return `${nextOccurrenceLabel}. ${repeatText}`;
      }
    }
    const label = formatRepeatLabel(
      reminder.repeatRule,
      reminder.schedule.kind === "scheduled" ? reminder.schedule.time : undefined,
      reminder.schedule.kind === "scheduled" ? reminder.schedule.date : undefined
    );
    if (label) return label;
  }

  if (reminder.schedule.kind === "scheduled" && reminder.schedule.date) {
    const dateLabel = formatScheduledDateForRow(reminder.schedule.date, TUTORIAL_NOW);
    if (reminder.schedule.time) {
      return `${dateLabel} at ${formatTime12h(reminder.schedule.time)}`;
    }
    return dateLabel;
  }

  return "No date / time set";
}

function RepeatReminderIndicator({ color = "#BABABA" }: { color?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <path d="M1.44434 3.48096C1.59681 3.4883 1.73996 3.55905 1.84961 3.64502L1.94824 3.73486L3.07227 4.96729C3.30912 5.22148 3.29491 5.61985 3.04102 5.85693C2.78691 6.09383 2.38854 6.08048 2.15137 5.82666L1.62598 5.26318C0.87435 7.43043 1.46921 9.9307 3.31738 11.5122C5.32505 13.2299 8.17595 13.3202 10.2646 11.9106L10.2666 11.9087C10.2757 11.9033 10.3905 11.8364 10.5479 11.8081C10.6863 11.7833 10.8615 11.7883 11.0264 11.8931L11.0967 11.9438L11.1592 12.0044C11.2904 12.1495 11.3179 12.3217 11.3105 12.4614C11.3021 12.6199 11.2485 12.742 11.2451 12.7495C11.2416 12.7571 11.2362 12.764 11.2295 12.769C8.66386 14.6783 5.03173 14.6353 2.49902 12.4683C-0.0335254 10.3011 -0.63702 6.71916 0.852539 3.88916L0.866211 3.87256C0.869116 3.87039 0.872651 3.86918 0.875977 3.86768C0.95226 3.72692 1.03936 3.62903 1.13379 3.56689C1.23497 3.50033 1.34146 3.47608 1.44434 3.48096ZM2.92969 1.43115C5.49535 -0.478399 9.1283 -0.435229 11.6611 1.73193C14.1936 3.89913 14.7972 7.48108 13.3076 10.311C13.3022 10.3211 13.2926 10.3271 13.2822 10.3315C13.206 10.4722 13.1208 10.5712 13.0264 10.6333C12.925 10.6999 12.8179 10.7243 12.7148 10.7192C12.5115 10.7092 12.3252 10.5866 12.2119 10.4653V10.4644L11.0869 9.23291V9.23193C10.8507 8.97767 10.8654 8.58009 11.1191 8.34326C11.3731 8.10643 11.7706 8.12002 12.0078 8.37354L12.5332 8.93604C13.2845 6.76911 12.6904 4.27039 10.8428 2.68896C8.83508 0.971123 5.98426 0.879935 3.89551 2.28955L3.89258 2.2915L3.8916 2.29053C3.87902 2.29792 3.76692 2.36318 3.61328 2.39111C3.45498 2.41981 3.2479 2.41007 3.06348 2.25537C2.87832 2.09972 2.84024 1.89826 2.84863 1.73877C2.85699 1.58032 2.91071 1.45818 2.91406 1.45068C2.91753 1.44303 2.92297 1.4362 2.92969 1.43115ZM7.08008 3.94678C7.41603 3.94686 7.68848 4.2192 7.68848 4.55518V7.08545L8.90527 8.30029C9.14308 8.53749 9.14424 8.92271 8.90723 9.16064C8.67004 9.39845 8.28481 9.39862 8.04688 9.16162L6.65039 7.77002C6.53601 7.65596 6.4718 7.50082 6.47168 7.33936V4.55518C6.47168 4.21915 6.74406 3.94678 7.08008 3.94678Z" fill={color} stroke={color} strokeWidth="0.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TutorialStaticReminderRow({
  titleColor = "#1c2c42",
  title,
  subtitle,
  circleColor,
  showRepeatIcon = false,
}: {
  titleColor?: string;
  title: string;
  subtitle: string;
  circleColor: string;
  showRepeatIcon?: boolean;
}) {
  return (
    <div className="content-stretch flex items-start justify-between px-px relative w-full">
      <div className="flex-[1_0_0] min-h-px min-w-px relative">
        <div className="flex flex-row items-start size-full">
          <div className="content-stretch flex gap-[16px] items-start pr-[16px] relative w-full">
            <div
              className="relative shrink-0 size-[25px] flex items-center justify-center"
              style={{ padding: 0, lineHeight: 0, marginTop: "3px" }}
            >
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                <circle cx="12.5" cy="12.5" fill="white" r="11.5" stroke={circleColor} strokeWidth="2" />
              </svg>
            </div>
            <div
              className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-start min-h-px min-w-0 not-italic overflow-visible relative"
              style={{ gap: "9px", minHeight: "38px" }}
            >
              <div
                className="overflow-hidden whitespace-nowrap"
                style={{ color: titleColor, textDecorationColor: titleColor, height: "17px", maxWidth: "100%", minWidth: 0 }}
              >
                <p
                  style={{
                    display: "block",
                    width: "100%",
                    minWidth: 0,
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: "17px",
                    transform: "translateY(-1px)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingBottom: "2px",
                    boxSizing: "content-box",
                  }}
                >
                  {title}
                </p>
              </div>
              <div className="flex items-center overflow-visible" style={{ textDecorationColor: "#BABABA" }}>
                <p
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ fontSize: "14px", fontWeight: 700, fontFamily: "'Lato', sans-serif", lineHeight: 1, color: "#BABABA" }}
                >
                  {subtitle}
                </p>
                {showRepeatIcon && (
                  <div className="flex items-center gap-[6px] h-0 overflow-visible shrink-0 self-center pl-[6px]">
                    <RepeatReminderIndicator />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative shrink-0 self-stretch w-[20px] flex items-center justify-center"
        style={{ padding: 0, lineHeight: 0 }}
        aria-hidden="true"
      >
        <div className="flex flex-row items-center justify-center gap-[3px]">
          <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
          <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
          <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
        </div>
      </div>
    </div>
  );
}

export default function TutorialStaticReminderList({ page1BuildSequence = false }: { page1BuildSequence?: boolean }) {
  const [visibleIds, setVisibleIds] = useState<string[]>(
    page1BuildSequence ? [PAGE_1_BUILD_SEQUENCE_IDS[0]] : STATIC_REMINDERS.map((reminder) => reminder.id)
  );
  const [reinsertedId, setReinsertedId] = useState<string | null>(null);
  const [insertHighlightId, setInsertHighlightId] = useState<string | null>(null);
  const timeoutsRef = useRef<number[]>([]);
  const insertHighlightTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!page1BuildSequence) {
      setVisibleIds(STATIC_REMINDERS.map((reminder) => reminder.id));
      setReinsertedId(null);
      setInsertHighlightId(null);
      return;
    }

    setVisibleIds([PAGE_1_BUILD_SEQUENCE_IDS[0]]);
    setReinsertedId(null);
    setInsertHighlightId(null);

    const timers = PAGE_1_BUILD_SEQUENCE_IDS.slice(1).map((id, index) =>
      window.setTimeout(() => {
        const insertTimer = window.setTimeout(() => {
          setVisibleIds((prev) => [id, ...prev]);
          setReinsertedId(id);
          setInsertHighlightId(id);

          if (insertHighlightTimerRef.current !== null) {
            clearTimeout(insertHighlightTimerRef.current);
          }
          insertHighlightTimerRef.current = window.setTimeout(() => {
            insertHighlightTimerRef.current = null;
            setInsertHighlightId(null);
          }, INSERT_HIGHLIGHT_MS);
          timeoutsRef.current.push(insertHighlightTimerRef.current);
        }, NEW_REMINDER_INSERT_DELAY);
        timeoutsRef.current.push(insertTimer);
      }, (index + 1) * PAGE_1_INSERT_START_GAP)
    );

    timeoutsRef.current = timers;

    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutsRef.current = [];
      if (insertHighlightTimerRef.current !== null) {
        clearTimeout(insertHighlightTimerRef.current);
        insertHighlightTimerRef.current = null;
      }
    };
  }, [page1BuildSequence]);

  const visibleReminders = visibleIds
    .map((id) => STATIC_REMINDERS.find((reminder) => reminder.id === id))
    .filter((reminder): reminder is (typeof STATIC_REMINDERS)[number] => reminder != null);

  return (
    <div className="flex flex-[1_0_0] min-h-px w-full items-start justify-center overflow-hidden">
      <div
        className="shrink-0"
        style={{
          width: `${100 / TUTORIAL_REMINDER_LIST_SCALE}%`,
          transform: `scale(${TUTORIAL_REMINDER_LIST_SCALE})`,
          transformOrigin: "top center",
        }}
      >
        <div className="flex flex-col gap-[23px] w-full" style={{ position: "relative", zIndex: 1 }}>
          <AnimatePresence initial={false}>
            {visibleReminders.map((reminder) => {
              const isReinserted = reinsertedId === reminder.id;
              const isHighlighted = insertHighlightId === reminder.id;
              return (
                <motion.div
                  key={reminder.id}
                  layout
                  initial={isReinserted ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={isReinserted ? { opacity: { duration: 0.2 } } : { layout: { duration: 0.25 } }}
                  onAnimationComplete={() => {
                    if (isReinserted) {
                      setReinsertedId(null);
                    }
                  }}
                >
                  <TutorialStaticReminderRow
                    title={reminder.title}
                    subtitle={getTutorialReminderSubtitle(reminder)}
                    circleColor={reminder.circleColor}
                    showRepeatIcon={Boolean(reminder.repeatRule)}
                    titleColor={isHighlighted ? reminder.circleColor : "#1c2c42"}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
