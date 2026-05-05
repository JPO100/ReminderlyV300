import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderList from "@/imports/ReminderList-1189-377";
import SettingsBtnSml from "@/imports/SettingsBtnSml";
import { useState, useEffect } from "react";
import type { FiltersMenuVariant } from "../reminder-utils";
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from "./tutorialTokens";

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <div className={TUTORIAL_TITLE_CLASSNAME}>
        <p className="css-ew64yg leading-[normal]">Welcome to Reminderly!</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] [@media(max-height:570px)]:gap-[10px] items-center relative shrink-0">
      <Frame3 />
      <div className={TUTORIAL_BODY_CLASSNAME}>
        <p className="css-4hzbpn leading-[30px]">Your reminders will be grouped and coloured by when they are due</p>
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

function MenuBtnLater() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtnSometime() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
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

function FiltersMenu({ filtersMenuVariant }: { filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <div className="flex items-center gap-[8px]">
            <MenuBtn />
            <MenuBtn1 />
            {filtersMenuVariant === 'grouped' ? (
              <MenuBtn2 />
            ) : (
              <>
                <MenuBtnLater />
                <MenuBtnSometime />
              </>
            )}
          </div>
          {filtersMenuVariant === 'grouped' && <SettingsBtn />}
        </div>
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

function Frame1({ animationKey }: { animationKey: number }) {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[13.96px] w-full -mt-[6px]">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[22.334px] items-center pb-[28.334px] pt-[24px] px-[14px] relative size-full">
          <ImportedReminderList key={animationKey} />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank({ animationKey, filtersMenuVariant }: { animationKey: number; filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu filtersMenuVariant={filtersMenuVariant} />
      <Frame1 animationKey={animationKey} />
    </div>
  );
}

function ReminderColours({ animationKey, filtersMenuVariant }: { animationKey: number; filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="h-[361px] relative shrink-0 w-full max-w-[308px] [@media(max-height:570px)]:scale-[0.7] [@media(max-height:570px)]:origin-top [@media(max-height:570px)]:-mb-[108px]" data-name="Reminder colours">
      <div className="bg-[#1c2c42] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-[calc(100%+2px)] w-full">
          <NusBlank animationKey={animationKey} filtersMenuVariant={filtersMenuVariant} />
        </div>
      </div>
    </div>
  );
}

function Frame9({ animationKey, filtersMenuVariant }: { animationKey: number; filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="content-stretch flex flex-col justify-between items-center relative w-full h-full min-h-0 pb-[60px]">
      <Frame8 />
      <ReminderColours animationKey={animationKey} filtersMenuVariant={filtersMenuVariant} />
    </div>
  );
}

export default function OnboardingPage1Content({ filtersMenuVariant }: { filtersMenuVariant: FiltersMenuVariant }) {
  // Animation loop state
  const [animationKey, setAnimationKey] = useState(0);
  
  useEffect(() => {
    // Animation completes at ~4000ms (3.7s delay + 0.3s duration)
    // Add 2000ms delay before restarting
    const loopTimer = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
    }, 6000); // 4000ms animation + 2000ms delay
    
    return () => clearTimeout(loopTimer);
  }, [animationKey]); // Re-run when animationKey changes (creates loop)
  
  return <Frame9 animationKey={animationKey} filtersMenuVariant={filtersMenuVariant} />;
}
