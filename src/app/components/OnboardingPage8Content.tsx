import svgPaths from "@/imports/svg-b2700o3wr8";
import backArrowPaths from "@/imports/svg-0tntgsesap";
import ImportedReminderList from "@/imports/ReminderList-1198-119";
import ImportedReminderListDone from "@/imports/ReminderList-1198-346";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from "./tutorialTokens";
import TutorialStaticReminderList from "./TutorialStaticReminderList";

export interface OnboardingPage8State {
  tickDone: boolean;
  showDone: boolean;
  backHighlighted: boolean;
  tickFlash: boolean;
}

export function OnboardingPage8Text() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] [@media(max-height:570px)]:gap-[10px] items-center relative shrink-0">
      <div className="content-stretch flex flex-col items-center relative shrink-0">
        <div className={TUTORIAL_TITLE_CLASSNAME}>
          <p className="css-ew64yg leading-[normal]">See what you've done</p>
        </div>
      </div>
      <div className={TUTORIAL_BODY_CLASSNAME}>
        <p className="css-4hzbpn leading-[30px]">Tap the Reminderly logo 'tick' to<br />see what you've already done</p>
      </div>
    </div>
  );
}

export function useOnboardingPage8State(): OnboardingPage8State {
  const [tickDone, setTickDone] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [backHighlighted, setBackHighlighted] = useState(false);
  const [tickFlash, setTickFlash] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeouts.push(id);
      return id;
    };

    const scheduleNextToggle = (isDone: boolean) => {
      const delay = isDone ? 2500 : 1200;

      t(() => {
        const next = !isDone;
        if (next) {
          setTickFlash(true);
          t(() => {
            setTickFlash(false);
            t(() => {
              setTickDone(next);
              t(() => {
                setShowDone(next);
              }, 750);
              scheduleNextToggle(next);
            }, 150);
          }, 150);
        } else {
          setBackHighlighted(true);
          t(() => {
            setBackHighlighted(false);
            t(() => {
              setBackHighlighted(true);
              t(() => {
                setBackHighlighted(false);
                setTickDone(next);
                setShowDone(next);
                scheduleNextToggle(next);
              }, 750);
            }, 150);
          }, 150);
        }
      }, delay);
    };

    scheduleNextToggle(false);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return {
    tickDone,
    showDone,
    backHighlighted,
    tickFlash,
  };
}

export function OnboardingPage8BackButton({ highlighted }: { highlighted?: boolean }) {
  return (
    <div
      className={`${highlighted ? 'bg-white' : 'bg-[rgba(255,255,255,0.15)]'} content-stretch flex items-center justify-center relative rounded-[69.652px] shrink-0`}
      style={{ width: '35px', height: '28px' }}
      data-name="Back-btn"
    >
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <svg className="block" style={{ width: '5.6px', height: '9.1px' }} fill="none" viewBox="20.88 13.38 7.76 13.24">
        <path d={backArrowPaths.p17336800} fill={highlighted ? '#2B5DA0' : 'white'} />
      </svg>
    </div>
  );
}

export function OnboardingPage8ClearAllButton() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Clear-all-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Clear all</p>
      </div>
    </div>
  );
}

function ReminderList({ showDone }: { showDone?: boolean }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-x-clip overflow-y-auto rounded-[6.979px] w-full" data-name="Reminder list">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {!showDone ? (
            <motion.div
              key="active"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              <ImportedReminderList />
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              <ImportedReminderListDone />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NewReminderBtn() {
  return (
    <div className="bg-[#4784f8] content-stretch flex gap-[11.167px] h-[41.876px] items-center justify-center px-[20.938px] py-[15.355px] relative rounded-[69.794px] shrink-0 w-[252.654px]" data-name="New reminder btn">
      <div className="relative shrink-0 size-[10.469px]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.4688 10.4688">
          <path d={svgPaths.paece300} fill="var(--fill-0, white)" id="Union" />
        </svg>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13.959px] text-white">
        <p className="css-ew64yg leading-[normal]">New reminder</p>
      </div>
    </div>
  );
}

export default function OnboardingPage8Content({ showDone }: { showDone?: boolean }) {
  return (
    <div className="content-stretch flex flex-col flex-1 min-h-0 gap-[22.334px] items-center pt-[10px] px-[14px] relative w-full">
      <TutorialStaticReminderList />
    </div>
  );
}
