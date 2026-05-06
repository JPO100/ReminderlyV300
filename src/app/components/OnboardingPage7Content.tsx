import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderListAll from "@/imports/ReminderList-1196-227";
import ImportedReminderListToday from "@/imports/ReminderList-1196-287";
import ImportedReminderListThisWeek from "@/imports/ReminderList-1196-373";
import ImportedReminderListLater from "@/imports/ReminderList-1196-456";
import ImportedReminderListSometime from "@/imports/ReminderList-1196-515";
import SettingsBtnSml from "@/imports/SettingsBtnSml";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { FiltersMenuVariant } from "../reminder-utils";
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from "./tutorialTokens";
import TutorialMainTabBar from "./TutorialMainTabBar";
import TutorialPhoneShell from "./TutorialPhoneShell";
import TutorialReminderFilters, { GROUPED_TUTORIAL_FILTER_ITEMS, UNGROUPED_TUTORIAL_FILTER_ITEMS } from "./TutorialReminderFilters";

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <div className={TUTORIAL_TITLE_CLASSNAME}>
        <p className="css-ew64yg leading-[normal]">Filter your reminders</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] [@media(max-height:570px)]:gap-[10px] items-center relative shrink-0">
      <Frame3 />
      <div className={TUTORIAL_BODY_CLASSNAME}>
        <p className="css-4hzbpn leading-[30px]">Tap a filter to narrow things down,<br />then de-select it to bring them all back</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="bg-[#1c2c42] h-[7px] rounded-[10px] shrink-0 w-[24px]" />
      <div className="bg-[#1c2c42] rounded-[10px] shrink-0 size-[7px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[24.833px]">
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

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[146.027px]">
      <Group />
      <Frame />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-center relative shrink-0">
      <Frame6 />
      <Frame2 />
    </div>
  );
}

function HeaderLogo() {
  return (
    <div className="bg-[#4784f8] content-stretch flex flex-col items-center justify-center pb-[9.93px] pt-[16px] px-0 relative shrink-0" data-name="Header logo">
      <Frame7 />
    </div>
  );
}

function MenuBtn({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`${isActive ? 'bg-white' : 'bg-[rgba(255,255,255,0.15)]'} content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]`} data-name="Menu-btn">
      <div aria-hidden="true" className={`absolute border-[0.697px] border-solid ${isActive ? 'border-transparent' : 'border-white'} inset-0 pointer-events-none rounded-[69.652px]`} />
      <div className={`css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] ${isActive ? 'text-[#4784f8]' : 'text-white'}`}>
        <p className="css-ew64yg leading-[normal]">Today</p>
      </div>
    </div>
  );
}

function MenuBtn1({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`${isActive ? 'bg-white' : 'bg-[rgba(255,255,255,0.15)]'} content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]`} data-name="Menu-btn">
      <div aria-hidden="true" className={`absolute border-[0.697px] border-solid ${isActive ? 'border-transparent' : 'border-white'} inset-0 pointer-events-none rounded-[69.652px]`} />
      <div className={`css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] ${isActive ? 'text-[#4784f8]' : 'text-white'}`}>
        <p className="css-ew64yg leading-[normal]">This week</p>
      </div>
    </div>
  );
}

function MenuBtn2({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`${isActive ? 'bg-white' : 'bg-[rgba(255,255,255,0.15)]'} content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]`} data-name="Menu-btn">
      <div aria-hidden="true" className={`absolute border-[0.697px] border-solid ${isActive ? 'border-transparent' : 'border-white'} inset-0 pointer-events-none rounded-[69.652px]`} />
      <div className={`css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] ${isActive ? 'text-[#4784f8]' : 'text-white'}`}>
        <p className="css-ew64yg leading-[normal]">Other</p>
      </div>
    </div>
  );
}

function MenuBtnLater({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`${isActive ? 'bg-white' : 'bg-[rgba(255,255,255,0.15)]'} content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]`} data-name="Menu-btn">
      <div aria-hidden="true" className={`absolute border-[0.697px] border-solid ${isActive ? 'border-transparent' : 'border-white'} inset-0 pointer-events-none rounded-[69.652px]`} />
      <div className={`css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] ${isActive ? 'text-[#4784f8]' : 'text-white'}`}>
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtnSometime({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`${isActive ? 'bg-white' : 'bg-[rgba(255,255,255,0.15)]'} content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]`} data-name="Menu-btn">
      <div aria-hidden="true" className={`absolute border-[0.697px] border-solid ${isActive ? 'border-transparent' : 'border-white'} inset-0 pointer-events-none rounded-[69.652px]`} />
      <div className={`css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] ${isActive ? 'text-[#4784f8]' : 'text-white'}`}>
        <p className="css-ew64yg leading-[normal]">Sometime</p>
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

function FiltersMenu({ activeFilter, filtersMenuVariant }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime'; filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <div className="flex items-center gap-[8px]">
            <MenuBtn isActive={activeFilter === 'today'} />
            <MenuBtn1 isActive={activeFilter === 'thisWeek'} />
            {filtersMenuVariant === 'grouped' ? (
              <MenuBtn2 isActive={activeFilter === 'later'} />
            ) : (
              <>
                <MenuBtnLater isActive={activeFilter === 'later'} />
                <MenuBtnSometime isActive={activeFilter === 'sometime'} />
              </>
            )}
          </div>
          {filtersMenuVariant === 'grouped' && <SettingsBtn />}
        </div>
      </div>
    </div>
  );
}

function ReminderList({ activeFilter, filtersMenuVariant }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime'; filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="relative w-full flex-1 min-h-0">
      <AnimatePresence mode="wait">
        {!activeFilter ? (
          <motion.div
            key="all"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImportedReminderListAll />
          </motion.div>
        ) : activeFilter === 'today' ? (
          <motion.div
            key="today"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImportedReminderListToday />
          </motion.div>
        ) : activeFilter === 'thisWeek' ? (
          <motion.div
            key="thisWeek"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImportedReminderListThisWeek />
          </motion.div>
        ) : activeFilter === 'sometime' ? (
          <motion.div
            key="sometime"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImportedReminderListSometime />
          </motion.div>
        ) : (
          <motion.div
            key="later"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filtersMenuVariant === 'grouped' ? (
              <div className="content-stretch flex flex-col gap-[17.5px] items-start overflow-clip relative rounded-[6.961px] size-full">
                <ImportedReminderListLater />
                <ImportedReminderListSometime />
              </div>
            ) : (
              <ImportedReminderListLater />
            )}
          </motion.div>
        )}
      </AnimatePresence>
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

function Frame1({ activeFilter, filtersMenuVariant, isListsEnabled }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime'; filtersMenuVariant: FiltersMenuVariant; isListsEnabled: boolean }) {
  if (isListsEnabled) {
    return (
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full rounded-tl-[14px] rounded-tr-[14px]">
        <div className="flex flex-col items-center size-full">
          <TutorialReminderFilters
            items={UNGROUPED_TUTORIAL_FILTER_ITEMS}
            activeKey={activeFilter}
            showHiddenItems
          />
          <div className="content-stretch flex flex-col flex-1 min-h-0 gap-[22.334px] items-center pb-[28.334px] pt-[10px] px-[14px] relative w-full">
            <ReminderList activeFilter={activeFilter} filtersMenuVariant={filtersMenuVariant} />
            <NewReminderBtn />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative w-full rounded-[13.96px] -mt-[6px]">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[22.334px] items-center pb-[28.334px] pt-[24px] px-[14px] relative size-full">
          <ReminderList activeFilter={activeFilter} filtersMenuVariant={filtersMenuVariant} />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank({ activeFilter, filtersMenuVariant, isListsEnabled }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime'; filtersMenuVariant: FiltersMenuVariant; isListsEnabled: boolean }) {
  return (
    <div className={`absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full ${isListsEnabled ? "justify-start gap-0" : "justify-between gap-[4px]"}`} data-name="NUS - Blank">
      <HeaderLogo />
      {!isListsEnabled && <FiltersMenu activeFilter={activeFilter} filtersMenuVariant={filtersMenuVariant} />}
      {isListsEnabled && <TutorialMainTabBar />}
      <Frame1 activeFilter={activeFilter} filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} />
    </div>
  );
}

function ReminderColours({ activeFilter, filtersMenuVariant, isListsEnabled, settingsMenuEnabled }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime'; filtersMenuVariant: FiltersMenuVariant; isListsEnabled: boolean; settingsMenuEnabled: boolean }) {
  if (isListsEnabled) {
    return (
      <TutorialPhoneShell
        activeMainTab="reminders"
        showHeaderMenu={settingsMenuEnabled}
        filterRow={
          <TutorialReminderFilters
            items={filtersMenuVariant === "grouped" ? GROUPED_TUTORIAL_FILTER_ITEMS : UNGROUPED_TUTORIAL_FILTER_ITEMS}
            activeKey={activeFilter}
            showSettings={filtersMenuVariant === "grouped"}
          />
        }
      >
        <div className="content-stretch flex flex-col flex-1 min-h-0 gap-[22.334px] items-center pb-[28.334px] pt-[10px] px-[14px] relative w-full">
          <ReminderList activeFilter={activeFilter} filtersMenuVariant={filtersMenuVariant} />
          <NewReminderBtn />
        </div>
      </TutorialPhoneShell>
    );
  }

  return (
    <div className="h-[361px] relative shrink-0 w-full max-w-[308px] [@media(max-height:570px)]:scale-[0.7] [@media(max-height:570px)]:origin-top [@media(max-height:570px)]:-mb-[108px]" data-name="Reminder colours">
      <div className="bg-[#1c2c42] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-[calc(100%+2px)] w-full">
          <NusBlank activeFilter={activeFilter} filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} />
        </div>
      </div>
    </div>
  );
}

function Frame9({ filtersMenuVariant, isListsEnabled, settingsMenuEnabled }: { filtersMenuVariant: FiltersMenuVariant; isListsEnabled: boolean; settingsMenuEnabled: boolean }) {
  const [activeFilter, setActiveFilter] = useState<'today' | 'thisWeek' | 'later' | 'sometime' | undefined>(undefined);

  useEffect(() => {
    const filters: Array<'today' | 'thisWeek' | 'later' | 'sometime' | undefined> = filtersMenuVariant === 'grouped'
      ? [
          undefined,    // All reminders
          'today',      // Today filter
          'thisWeek',   // This week filter
          'later',      // Other filter (later + sometime)
        ]
      : [
          undefined,    // All reminders
          'today',      // Today filter
          'thisWeek',   // This week filter
          'later',      // Later filter
          'sometime',   // Sometime filter
        ];
    
    let currentIndex = 0;
    let interval: NodeJS.Timeout | null = null;
    
    // Initial delay before starting the cycle
    const initialTimer = setTimeout(() => {
      currentIndex = 1;
      setActiveFilter(filters[1]);
      
      // Start the continuous cycle
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % filters.length;
        setActiveFilter(filters[currentIndex]);
      }, 1200);
    }, 1200);

    return () => {
      clearTimeout(initialTimer);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [filtersMenuVariant]);

  return (
    <div className="content-stretch flex flex-col justify-between items-center relative w-full h-full min-h-0 pb-[45px]">
      <Frame8 />
      <ReminderColours activeFilter={activeFilter} filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
    </div>
  );
}

export default function OnboardingPage7Content({ filtersMenuVariant, isListsEnabled = false, settingsMenuEnabled = true }: { filtersMenuVariant: FiltersMenuVariant; isListsEnabled?: boolean; settingsMenuEnabled?: boolean }) {
  return <Frame9 filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />;
}
