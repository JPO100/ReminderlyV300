import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderList from "@/imports/ReminderList-1199-119";
import ImportedOnboardingOverlay from "@/imports/OnboardingV2Overlay-1199-682";
import SettingsBtnSml from "@/imports/SettingsBtnSml";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from "./tutorialTokens";

function Group1() {
  return (
    <div className="relative shrink-0 size-[62px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62 62">
        <g id="Group 22">
          <path d={svgPaths.p1540b980} fill="var(--fill-0, #4784F8)" id="Ellipse 74 (Stroke)" />
          <g id="Group 11">
            <path d={svgPaths.p487a380} fill="var(--fill-0, #4784F8)" id="Line 39 (Stroke)" />
            <path d={svgPaths.p1804bd80} fill="var(--fill-0, #4784F8)" id="Line 40 (Stroke)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
      <div className="[@media(max-height:570px)]:hidden">
        <Group1 />
      </div>
      <div className={TUTORIAL_TITLE_CLASSNAME}>
        <p className="css-ew64yg leading-[normal]">Re-run this tutorial</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] [@media(max-height:570px)]:gap-[10px] items-center relative shrink-0">
      <Frame3 />
      <div className={TUTORIAL_BODY_CLASSNAME}>
        <p className="css-4hzbpn leading-[30px]">Don't worry if you forget something, just tap the 'reminderly' logo text for a recap!</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="bg-[#214677] h-[7px] rounded-[10px] shrink-0 w-[24px]" />
      <div className="bg-[#214677] rounded-[10px] shrink-0 size-[7px]" />
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

function Frame({ isDarkBlue }: { isDarkBlue?: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2.786px] pt-0 px-0 relative shrink-0">
      <div className={`css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[23.682px] ${isDarkBlue ? 'text-[#214677]' : 'text-white'}`}>
        <p className="css-ew64yg leading-[normal]">reminderly</p>
      </div>
    </div>
  );
}

function Frame2({ isDarkBlue }: { isDarkBlue?: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-center gap-[8px] relative shrink-0">
      <Group />
      <Frame isDarkBlue={isDarkBlue} />
    </div>
  );
}

function Frame7({ isDarkBlue }: { isDarkBlue?: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-center relative shrink-0">
      <Frame6 />
      <Frame2 isDarkBlue={isDarkBlue} />
    </div>
  );
}

function HeaderLogo({ isDarkBlue }: { isDarkBlue?: boolean }) {
  return (
    <div className="bg-[#4784f8] content-stretch flex flex-col items-center justify-center pb-[9.93px] pt-[16px] px-0 relative shrink-0" data-name="Header logo">
      <Frame7 isDarkBlue={isDarkBlue} />
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
        <p className="css-ew64yg leading-[normal]">Other</p>
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

function FiltersMenu() {
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

function ReminderList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-x-clip overflow-y-auto rounded-[6.979px] w-full" data-name="Reminder list">
      <ImportedReminderList />
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

function Frame1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[13.96px] w-full -mt-[6px]">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[22.334px] items-center pb-[28.334px] pt-[24px] px-[14px] relative size-full">
          <ReminderList />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank({ isDarkBlue }: { isDarkBlue?: boolean }) {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo isDarkBlue={isDarkBlue} />
      <FiltersMenu />
      <Frame1 />
    </div>
  );
}

function ReminderColours({ isDarkBlue, showOverlay }: { isDarkBlue?: boolean; showOverlay?: boolean }) {
  return (
    <div className="h-[361px] relative shrink-0 w-full max-w-[308px] overflow-hidden [@media(max-height:570px)]:scale-[0.7] [@media(max-height:570px)]:origin-top [@media(max-height:570px)]:-mb-[108px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] relative rounded-tl-[26px] rounded-tr-[26px] h-[calc(100%+2px)] w-full overflow-hidden">
          <NusBlank isDarkBlue={isDarkBlue} />
        </div>
      </div>
      
      {/* Overlay slides up from bottom, positioned to cover the phone */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-[14px] right-[14px] z-50"
            style={{ bottom: '0px', height: '284px' }}
          >
            <ImportedOnboardingOverlay />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Frame9({ isDarkBlue, showOverlay }: { isDarkBlue?: boolean; showOverlay?: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours isDarkBlue={isDarkBlue} showOverlay={showOverlay} />
    </div>
  );
}

export default function OnboardingPage9Content() {
  const [isDarkBlue, setIsDarkBlue] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const runAnimation = () => {
      // Turn text dark blue after 1200ms
      setTimeout(() => {
        setIsDarkBlue(true);
      }, 1200);

      // Show overlay 400ms after text turns dark blue (1600ms total)
      setTimeout(() => {
        setShowOverlay(true);
      }, 1600);

      // Hide overlay and reset to white logo after 2000ms more (3600ms total)
      setTimeout(() => {
        setShowOverlay(false);
        setIsDarkBlue(false);
      }, 3600);

      // Loop the animation after 800ms more (4400ms total)
      setTimeout(() => {
        runAnimation();
      }, 4400);
    };

    runAnimation();
  }, []);

  return (
    <>
      <Frame9 isDarkBlue={isDarkBlue} showOverlay={showOverlay} />
    </>
  );
}
