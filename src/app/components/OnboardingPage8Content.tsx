import svgPaths from "@/imports/svg-b2700o3wr8";
import backArrowPaths from "@/imports/svg-0tntgsesap";
import tickPaths from "@/imports/svg-jngdeg2tc1";
import ImportedReminderList from "@/imports/ReminderList-1198-119";
import ImportedReminderListDone from "@/imports/ReminderList-1198-346";
import SettingsBtnSml from "@/imports/SettingsBtnSml";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from "./tutorialTokens";

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <div className={TUTORIAL_TITLE_CLASSNAME}>
        <p className="css-ew64yg leading-[normal]">See what you've done</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] [@media(max-height:570px)]:gap-[10px] items-center relative shrink-0">
      <Frame3 />
      <div className={TUTORIAL_BODY_CLASSNAME}>
        <p className="css-4hzbpn leading-[30px]">Tap the Reminderly logo 'tick' to<br />see what you've already done</p>
      </div>
    </div>
  );
}

function Frame6({ showDone }: { showDone?: boolean }) {
  const color = showDone ? '#000000' : '#1c2c42';
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="h-[7px] rounded-[10px] shrink-0 w-[24px]" style={{ backgroundColor: color }} />
      <div className="rounded-[10px] shrink-0 size-[7px]" style={{ backgroundColor: color }} />
    </div>
  );
}

function Group({ showDone, tickFlash }: { showDone?: boolean; tickFlash?: boolean }) {
  if (showDone) {
    return (
      <div className="relative shrink-0 size-[24.833px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.8332 24.8332">
          <g clipPath="url(#clip0_p8_logo)" id="Group 14">
            <path d={tickPaths.p9b9c500} fill="#FFFFFF" id="Ellipse 74 (Stroke)" />
            <g id="Group 11">
              <path d={tickPaths.p1d837f80} fill="#1C2C42" id="Line 39 (Stroke)" />
              <path d={tickPaths.p1d2e7380} fill="#1C2C42" id="Line 40 (Stroke)" />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_p8_logo">
              <rect fill="white" height="24.8332" width="24.8332" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
  
  return (
    <div className="relative shrink-0 size-[24.833px]" style={{ opacity: tickFlash ? 0 : 1 }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.8332 24.8332">
        <g id="Group 14">
          <path d={svgPaths.p3bc9a000} fill="var(--fill-0, white)" id="Ellipse 74 (Stroke)" />
          <g id="Group 11">
            <path d={svgPaths.p8e6bc00} fill="var(--fill-0, white)" id="Line 39 (Stroke)" />
            <path d={svgPaths.p2b1f0800} fill="var(--fill-0, white)" id="Line 40 (Stroke)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2.786px] pt-0 px-0 relative shrink-0">
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[23.682px] text-white">
        <p className="css-ew64yg leading-[normal]">reminderly</p>
      </div>
    </div>
  );
}

function Frame2({ showDone, tickDone, tickFlash }: { showDone?: boolean; tickDone?: boolean; tickFlash?: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[146.027px]">
      <Group showDone={tickDone} tickFlash={tickFlash} />
      <Frame />
    </div>
  );
}

function Frame7({ showDone, tickDone, tickFlash }: { showDone?: boolean; tickDone?: boolean; tickFlash?: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-center relative shrink-0">
      <Frame6 showDone={showDone} />
      <Frame2 showDone={showDone} tickDone={tickDone} tickFlash={tickFlash} />
    </div>
  );
}

function HeaderLogo({ showDone, tickDone, tickFlash }: { showDone?: boolean; tickDone?: boolean; tickFlash?: boolean }) {
  return (
    <div className={`${showDone ? 'bg-[#1C2C42]' : 'bg-[#4784f8]'} content-stretch flex flex-col items-center justify-center pb-[9.93px] pt-[16px] px-0 relative shrink-0`} data-name="Header logo">
      <Frame7 showDone={showDone} tickDone={tickDone} tickFlash={tickFlash} />
    </div>
  );
}

function MenuBtn() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Today</p>
      </div>
    </div>
  );
}

function MenuBtn1() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">This week</p>
      </div>
    </div>
  );
}

function MenuBtn2() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function SettingsBtn() {
  return (
    <div className="shrink-0" style={{ width: '35px', height: '28px' }}>
      <SettingsBtnSml />
    </div>
  );
}

function BackBtn({ highlighted }: { highlighted?: boolean }) {
  return (
    <div
      className={`${highlighted ? 'bg-white' : 'bg-[rgba(255,255,255,0.15)]'} content-stretch flex items-center justify-center relative rounded-[69.652px] shrink-0`}
      style={{ width: '35px', height: '28px' }}
      data-name="Back-btn"
    >
      <div aria-hidden="true" className={`absolute border-[0.697px] border-solid ${highlighted ? 'border-white' : 'border-white'} inset-0 pointer-events-none rounded-[69.652px]`} />
      <svg className="block" style={{ width: '5.6px', height: '9.1px' }} fill="none" viewBox="20.88 13.38 7.76 13.24">
        <path d={backArrowPaths.p17336800} fill={highlighted ? '#1C2C42' : 'white'} />
      </svg>
    </div>
  );
}

function DoneFilterBtn() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Done</p>
      </div>
    </div>
  );
}

function DeletedFilterBtn() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Deleted</p>
      </div>
    </div>
  );
}

function ClearAllBtn() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Clear-all-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Clear all</p>
      </div>
    </div>
  );
}

function FiltersMenu({ showDone, backHighlighted }: { showDone?: boolean; backHighlighted?: boolean }) {
  if (showDone) {
    return (
      <div className="bg-[#1C2C42] relative shrink-0 w-full" data-name="Filters menu">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
            <div className="flex items-center gap-[8px]">
              <BackBtn highlighted={backHighlighted} />
              <DoneFilterBtn />
              <DeletedFilterBtn />
            </div>
            <ClearAllBtn />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <div className="flex items-center gap-[8px]">
            <MenuBtn />
            <MenuBtn1 />
            <MenuBtn2 />
          </div>
          <SettingsBtn />
        </div>
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

function Frame1({ showDone }: { showDone?: boolean }) {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[13.96px] w-full -mt-[6px]">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[22.334px] items-center pb-[28.334px] pt-[24px] px-[14px] relative size-full">
          <ReminderList showDone={showDone} />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank({ showDone, tickDone, backHighlighted, tickFlash }: { showDone?: boolean; tickDone?: boolean; backHighlighted?: boolean; tickFlash?: boolean }) {
  return (
    <div className={`absolute ${showDone ? 'bg-[#1C2C42]' : 'bg-[#4784f8]'} content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[20px] rounded-tr-[20px] top-0 w-full`} data-name="NUS - Blank">
      <HeaderLogo showDone={showDone} tickDone={tickDone} tickFlash={tickFlash} />
      <FiltersMenu showDone={showDone} backHighlighted={backHighlighted} />
      <Frame1 showDone={showDone} />
    </div>
  );
}

function ReminderColours({ showDone, tickDone, backHighlighted, tickFlash }: { showDone?: boolean; tickDone?: boolean; backHighlighted?: boolean; tickFlash?: boolean }) {
  return (
    <div className="h-[361px] relative shrink-0 w-full max-w-[308px] [@media(max-height:570px)]:scale-[0.7] [@media(max-height:570px)]:origin-top [@media(max-height:570px)]:-mb-[108px]" data-name="Reminder colours">
      <div className="bg-[#000000] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-[calc(100%+2px)] w-full">
          <NusBlank showDone={showDone} tickDone={tickDone} backHighlighted={backHighlighted} tickFlash={tickFlash} />
        </div>
      </div>
    </div>
  );
}

function Frame9({ showDone, tickDone, backHighlighted, tickFlash }: { showDone?: boolean; tickDone?: boolean; backHighlighted?: boolean; tickFlash?: boolean }) {
  return (
    <div className="content-stretch flex flex-col justify-between items-center relative w-full h-full min-h-0 pb-[60px]">
      <Frame8 />
      <ReminderColours showDone={showDone} tickDone={tickDone} backHighlighted={backHighlighted} tickFlash={tickFlash} />
    </div>
  );
}

export default function OnboardingPage8Content() {
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
          // Going to done: flash the tick, then transition
          // Tick is already visible (active state) — flash off then on
          setTickFlash(true); // hide tick
          t(() => {
            setTickFlash(false); // show tick again
            t(() => {
              // Now do the actual transition: tick changes first
              setTickDone(next);
              t(() => {
                setShowDone(next);
              }, 750);
              scheduleNextToggle(next);
            }, 150);
          }, 150);
        } else {
          // Returning to active: flash the back button, then transition
          // Back button is already visible — flash off then on
          setBackHighlighted(true); // highlight on
          t(() => {
            setBackHighlighted(false); // highlight off
            t(() => {
              setBackHighlighted(true); // highlight on again
              t(() => {
                // Now do the actual transition
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

  return <Frame9 showDone={showDone} tickDone={tickDone} backHighlighted={backHighlighted} tickFlash={tickFlash} />;
}
