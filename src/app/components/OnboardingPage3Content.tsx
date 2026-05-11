import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Reminder } from "../reminder-utils";
import { formatDueLine } from "./ReminderInfoOverlay";
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from "./tutorialTokens";
import TutorialStaticReminderList from "./TutorialStaticReminderList";

const TUTORIAL_OVERLAY_SCALE = 296 / 340;
export const TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE = 35;
export const TUTORIAL_ATTENTION_THROB_DURATION = 2.3;
export const TUTORIAL_ATTENTION_THROB_DELAY = 0.4;
export const TUTORIAL_ATTENTION_THROB_TIMES = [0, 0.109, 0.217, 0.391, 0.5, 0.609, 0.783, 0.891, 1];
export const TUTORIAL_ATTENTION_SEQUENCE_DELAY = 2750;
export const TUTORIAL_ATTENTION_RECYCLE_DELAY = 2000;

export const CALL_DENTIST_TUTORIAL_REMINDER: Reminder = {
  id: "today",
  originalText: "Pick up milk",
  displayText: "Pick up milk",
  createdAt: 0,
  schedule: { kind: "scheduled", date: "2025-08-11", time: "14:00" },
  completedAt: null,
};

export function TutorialReminderInfoOverlay({ reminder }: { reminder: Reminder }) {
  const dueLine = formatDueLine(reminder, new Date(2025, 7, 11, 12, 0, 0, 0));

  return (
    <div className="absolute inset-0 z-20 flex items-start justify-center bg-black/50 pt-[40px]">
      <div
        className="pointer-events-none"
        style={{
          width: 340,
          transform: `scale(${TUTORIAL_OVERLAY_SCALE})`,
          transformOrigin: "center center",
        }}
      >
        <div className="bg-white relative flex flex-col gap-[25px] items-center pt-[35px] pb-[35px] px-[32px] rounded-[32px] outline-none">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2c42] text-[18px] text-center">
            <p className="leading-[normal] whitespace-pre-wrap" style={{ fontWeight: 700 }}>{reminder.displayText}</p>
          </div>
          <div className="content-stretch flex items-center justify-center gap-[8px] min-w-full relative shrink-0">
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-w-0 not-italic relative shrink text-[15px] text-center max-w-full" style={{ color: "#1c2c42" }}>
              <p className="leading-[normal] whitespace-nowrap" style={{ fontWeight: 700 }}>{dueLine}</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[26px] items-start mt-[7px] relative shrink-0 w-full">
            <div className="bg-[#4784f8] h-[44px] relative rounded-[88px] shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[16px] py-[13px] relative size-full">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-left text-white whitespace-nowrap">
                    <p className="leading-[normal]">Mark as done</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#4784f8] h-[44px] relative rounded-[88px] shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[16px] py-[13px] relative size-full">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">
                    <p className="leading-[normal]">Edit reminder</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#939393] h-[44px] relative rounded-[88px] shrink-0 w-full">
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[16px] py-[13px] relative size-full">
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">
                    <p className="leading-[normal]">Delete reminder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <div className={TUTORIAL_TITLE_CLASSNAME}>
        <p className="css-ew64yg leading-[normal]">Manage your reminders</p>
      </div>
    </div>
  );
}

export function OnboardingPage3Text() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] [@media(max-height:570px)]:gap-[10px] [@media(max-height:570px)]:!min-h-0 items-center relative shrink-0">
      <Frame3 />
      <div className={TUTORIAL_BODY_CLASSNAME}>
        <p className="css-4hzbpn leading-[30px]">Tap the three dot menu<br />to view more reminder options</p>
      </div>
    </div>
  );
}

function ReminderList({
  setMenuTargetElement,
  onOverlayOpenChange,
}: {
  setMenuTargetElement: (element: HTMLDivElement | null) => void;
  onOverlayOpenChange?: (open: boolean) => void;
}) {
  const [menuTargetElement, setLocalMenuTargetElement] = useState<HTMLDivElement | null>(null);
  const [menuTargetRect, setMenuTargetRect] = useState<{ left: number; top: number } | null>(null);
  const [showCircle, setShowCircle] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    let cancelled = false;

    const startCycle = () => {
      if (cancelled) {
        return;
      }

      onOverlayOpenChange?.(false);
      setShowCircle(true);

      const overlayTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setShowCircle(false);
        onOverlayOpenChange?.(true);

        const recycleTimer = window.setTimeout(() => {
          startCycle();
        }, TUTORIAL_ATTENTION_RECYCLE_DELAY);
        timers.push(recycleTimer);
      }, TUTORIAL_ATTENTION_SEQUENCE_DELAY);
      timers.push(overlayTimer);
    };

    startCycle();

    return () => {
      cancelled = true;
      timers.forEach((timer) => clearTimeout(timer));
      onOverlayOpenChange?.(false);
    };
  }, [onOverlayOpenChange]);

  useEffect(() => {
    if (!menuTargetElement) {
      setMenuTargetRect(null);
      return;
    }

    const updateRect = () => {
      const parent = menuTargetElement.offsetParent;
      if (!(parent instanceof HTMLElement)) {
        setMenuTargetRect(null);
        return;
      }

      const targetRect = menuTargetElement.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      setMenuTargetRect({
        left: targetRect.left - parentRect.left + (targetRect.width / 2) - (TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE / 2),
        top: targetRect.top - parentRect.top + (targetRect.height / 2) - (TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE / 2),
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
    };
  }, [menuTargetElement]);

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px w-full relative" data-name="Reminder list">
      <TutorialStaticReminderList
        menuTargetReminderId="today"
        onMenuTargetElementChange={(element) => {
          setLocalMenuTargetElement(element);
          setMenuTargetElement(element);
        }}
      />
      {showCircle && menuTargetRect && (
        <motion.div
          className="absolute z-10 pointer-events-none"
          style={{
            left: menuTargetRect.left,
            top: menuTargetRect.top,
            width: TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE,
            height: TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0, 0, 1, 0, 0, 1, 0],
          }}
          transition={{
            duration: TUTORIAL_ATTENTION_THROB_DURATION,
            delay: TUTORIAL_ATTENTION_THROB_DELAY,
            times: TUTORIAL_ATTENTION_THROB_TIMES,
            ease: "easeInOut",
          }}
        >
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
            <circle cx="17.5" cy="17.5" r="16" stroke="#4784F8" strokeWidth="3" />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

export default function OnboardingPage3Content({
  onOverlayOpenChange,
}: {
  onOverlayOpenChange?: (open: boolean) => void;
}) {
  return (
    <div className="content-stretch flex flex-col flex-1 min-h-0 gap-[22.334px] items-center pt-[10px] px-[14px] relative w-full">
      <ReminderList
        setMenuTargetElement={() => {}}
        onOverlayOpenChange={onOverlayOpenChange}
      />
    </div>
  );
}
