# Onboarding source bundle

## Change instruction

You are implementing the Reminderly onboarding journey inside the already-built tutorial overlay shell.

Do not build or change any overlay shell, backdrop, slide-up animation container, z-index, positioning, logo spacing, or responsive overlay rules. Those already exist.

Your task is only to add the onboarding content code exactly as provided below, with zero modifications.

Requirements:
- Add the 12 files exactly as they appear in this document.
- Preserve every line, class, style, and motion timing.
- Do not refactor, simplify, rename, or restyle anything.
- Ensure all import paths resolve by copying the /src/imports dependencies listed at the end.
- Ensure the external dependency motion/react exists in the project.
- Render TutorialOnboardingContent inside the tutorial overlay body.
- The only integration behaviour is: pass onComplete and call it when the final step completion action occurs (already implemented in the code).

Acceptance criteria:
- The onboarding journey renders pixel-perfect identical to the old build.
- Carousel navigation and pagination behave identically.
- No duplicate slide-up animation is introduced (the wrapper is content-only).

## TutorialOnboardingContent.tsx

```tsx
import { useEffect, useState } from 'react';
import svgPaths from '@/imports/svg-go2phgsyt4';
import OnboardingPage1Content from '@/app/components/OnboardingPage1Content';
import OnboardingPage2Content from '@/app/components/OnboardingPage2Content';
import OnboardingPage3Content from '@/app/components/OnboardingPage3Content';
import OnboardingPage4Content from '@/app/components/OnboardingPage4Content';
import OnboardingPage5Content from '@/app/components/OnboardingPage5Content';
import OnboardingPage6Content from '@/app/components/OnboardingPage6Content';
import OnboardingPage7Content from '@/app/components/OnboardingPage7Content';
import OnboardingPage8Content from '@/app/components/OnboardingPage8Content';
import OnboardingPage9Content from '@/app/components/OnboardingPage9Content';

interface TutorialOnboardingContentProps {
  onComplete: () => void;
}

const SLIDE_DURATION = 400;
const TOTAL_PAGES = 9;

export default function TutorialOnboardingContent({ onComplete }: TutorialOnboardingContentProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    const timer = setTimeout(() => setIsAnimating(true), 10);
    return () => clearTimeout(timer);
  }, [shouldRender]);

  if (!shouldRender) return null;

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRestart = () => {
    setCurrentPage(0);
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === TOTAL_PAGES - 1;

  return (
    <div
      data-testid="onboarding-root"
      className="bg-white flex flex-col"
      style={{
        height: '808px',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        paddingLeft: '40px',
        paddingRight: '40px',
        paddingTop: '40px',
        paddingBottom: '60px',
        transform: isAnimating ? 'translateY(0)' : 'translateY(100%)',
        transition: `transform ${SLIDE_DURATION}ms ease-out`,
      }}
    >
      <div className="flex-1 relative overflow-hidden">
        {currentPage === 0 && (
          <OnboardingPage1Content />
        )}
        
        {currentPage === 1 && (
          <OnboardingPage2Content />
        )}
        
        {currentPage === 2 && (
          <OnboardingPage3Content />
        )}
        
        {currentPage === 3 && (
          <OnboardingPage4Content />
        )}
        
        {currentPage === 4 && (
          <OnboardingPage5Content />
        )}
        
        {currentPage === 5 && (
          <OnboardingPage6Content />
        )}
        
        {currentPage === 6 && (
          <OnboardingPage7Content />
        )}
        
        {currentPage === 7 && (
          <OnboardingPage8Content />
        )}
        
        {currentPage === 8 && (
          <OnboardingPage9Content />
        )}
      </div>
      
      <div className="flex flex-col items-center gap-[36px]">
        <div className="h-[7.935px] w-[151.411px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 151.411 7.93457">
            <g>
              <circle cx="3.96729" cy="3.96729" fill={currentPage === 0 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="21.9019" cy="3.96729" fill={currentPage === 1 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="39.8364" cy="3.96729" fill={currentPage === 2 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="57.771" cy="3.96729" fill={currentPage === 3 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="75.7056" cy="3.96729" fill={currentPage === 4 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="93.6401" cy="3.96729" fill={currentPage === 5 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="111.575" cy="3.96729" fill={currentPage === 6 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="129.509" cy="3.96729" fill={currentPage === 7 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="147.444" cy="3.96729" fill={currentPage === 8 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
            </g>
          </svg>
        </div>
        
        <div className="flex items-center justify-between w-[322px]">
          {!isFirstPage ? (
            <button 
              className="h-[45px] w-[35px]"
              onClick={handleBack}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 45">
                <g>
                  <path d={svgPaths.p72c8800} fill="#D9D9D9" />
                </g>
              </svg>
            </button>
          ) : (
            <div className="h-[45px] w-[35px]" />
          )}
          
          <button 
            className="bg-[#4784f8] h-[54px] w-[180px] rounded-[100px] flex items-center justify-center"
            onClick={handleNext}
          >
            <span className="font-['Lato',sans-serif] font-bold text-[17px] text-white leading-[normal]">
              {isLastPage ? 'Okay, got it!' : 'Next'}
            </span>
          </button>
          
          {isLastPage ? (
            <button 
              className="h-[28.321px] w-[34.741px]"
              onClick={handleRestart}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.4912 29.8213">
                <g>
                  <path d={svgPaths.p171ed6b0} fill="#D9D9D9" stroke="#D9D9D9" strokeWidth="1.5" />
                </g>
              </svg>
            </button>
          ) : (
            <div className="h-[28.321px] w-[34.741px]" />
          )}
        </div>
      </div>
    </div>
  );
}
```

## OnboardingPage1Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderList from "@/imports/ReminderList-1189-377";
import { useState, useEffect } from "react";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">Welcome to Reminderly!</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
        <p className="css-4hzbpn leading-[30px]">Your reminders will be grouped and coloured by when they are due</p>
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
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
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

function NusBlank({ animationKey }: { animationKey: number }) {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu />
      <Frame1 animationKey={animationKey} />
    </div>
  );
}

function ReminderColours({ animationKey }: { animationKey: number }) {
  return (
    <div className="h-[329px] relative shrink-0 w-[308px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full">
          <NusBlank animationKey={animationKey} />
        </div>
      </div>
    </div>
  );
}

function Frame9({ animationKey }: { animationKey: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours animationKey={animationKey} />
    </div>
  );
}

export default function OnboardingPage1Content() {
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
  
  return <Frame9 animationKey={animationKey} />;
}
```

## OnboardingPage2Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderList from "@/imports/ReminderList-1173-5393";
import doneSvgPaths from "@/imports/svg-d69hgq55o6";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">Mark reminders as 'done'</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
        <p className="css-4hzbpn leading-[30px]">Click the coloured circle on your<br />reminder to mark it as 'done'</p>
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
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
        </div>
      </div>
    </div>
  );
}

// Undone reminder components
function UndoneTickBlue() {
  return (
    <div className="relative shrink-0 size-[17.403px]" data-name="Tick box">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
        <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" r="8.00552" stroke="var(--stroke-0, #00AFEE)" strokeWidth="1.39227" />
      </svg>
    </div>
  );
}

function UndoneTickPink() {
  return (
    <div className="relative shrink-0 size-[17.403px]" data-name="Tick box">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
        <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" r="8.00552" stroke="var(--stroke-0, #DF4DFC)" strokeWidth="1.39227" />
      </svg>
    </div>
  );
}

function UndoneTickOrange() {
  return (
    <div className="relative shrink-0 size-[17.403px]" data-name="Tick box">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
        <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" r="8.00552" stroke="var(--stroke-0, #FAA429)" strokeWidth="1.39227" />
      </svg>
    </div>
  );
}

function UndoneTickGrey() {
  return (
    <div className="relative shrink-0 size-[17.403px]" data-name="Tick box">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
        <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" r="8.00552" stroke="var(--stroke-0, #939393)" strokeWidth="1.39227" />
      </svg>
    </div>
  );
}

// Done reminder components
function DoneTickBlue() {
  return (
    <div className="relative shrink-0 size-[17.4px]" data-name="Done tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4 17.4">
        <g id="Done tick">
          <rect fill="var(--fill-0, #00AFEE)" height="17.4" rx="8.7" width="17.4" />
          <path d={doneSvgPaths.p33bb1d80} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function DoneTickPink() {
  return (
    <div className="relative shrink-0 size-[17.4px]" data-name="Done tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4 17.4">
        <g id="Done tick">
          <rect fill="var(--fill-0, #DF4DFC)" height="17.4" rx="8.7" width="17.4" />
          <path d={doneSvgPaths.p33bb1d80} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function DoneTickOrange() {
  return (
    <div className="relative shrink-0 size-[17.4px]" data-name="Done tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4 17.4">
        <g id="Done tick">
          <rect fill="var(--fill-0, #FAA429)" height="17.4" rx="8.7" width="17.4" />
          <path d={doneSvgPaths.p33bb1d80} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function DoneTickGrey() {
  return (
    <div className="relative shrink-0 size-[17.4px]" data-name="Done tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4 17.4">
        <g id="Done tick">
          <rect fill="var(--fill-0, #939393)" height="17.4" rx="8.7" width="17.4" />
          <path d={doneSvgPaths.p33bb1d80} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function ReminderList({ animationKey }: { animationKey: number }) {
  const [doneStates, setDoneStates] = useState([false, false, false, false]);
  const [showDoneText, setShowDoneText] = useState([false, false, false, false]);

  useEffect(() => {
    // Reset states when animation key changes
    setDoneStates([false, false, false, false]);
    setShowDoneText([false, false, false, false]);

    const timers = [
      // First cycle - Mark items as done
      setTimeout(() => setDoneStates([true, false, false, false]), 700),
      setTimeout(() => setDoneStates([true, true, false, false]), 1100),
      setTimeout(() => setDoneStates([true, true, true, false]), 1500),
      setTimeout(() => setDoneStates([true, true, true, true]), 1900),
      
      // First cycle - Show done text
      setTimeout(() => setShowDoneText([true, false, false, false]), 2500),
      setTimeout(() => setShowDoneText([true, true, false, false]), 2900),
      setTimeout(() => setShowDoneText([true, true, true, false]), 3300),
      setTimeout(() => setShowDoneText([true, true, true, true]), 3700),
      
      // Loop state at 5700ms - Reset to unchecked
      setTimeout(() => {
        setDoneStates([false, false, false, false]);
        setShowDoneText([false, false, false, false]);
      }, 5700),
      
      // Second cycle - Mark items as done
      setTimeout(() => setDoneStates([true, false, false, false]), 6400),
      setTimeout(() => setDoneStates([true, true, false, false]), 6800),
      setTimeout(() => setDoneStates([true, true, true, false]), 7200),
      setTimeout(() => setDoneStates([true, true, true, true]), 7600),
      
      // Second cycle - Show done text
      setTimeout(() => setShowDoneText([true, false, false, false]), 8000),
      setTimeout(() => setShowDoneText([true, true, false, false]), 8400),
      setTimeout(() => setShowDoneText([true, true, true, false]), 8800),
      setTimeout(() => setShowDoneText([true, true, true, true]), 9200),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [animationKey]);

  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px w-full" data-name="Reminder list">
      <div className="content-stretch flex flex-col gap-[21.5px] items-start overflow-clip relative rounded-[6.961px] size-full">
        {/* Reminder 1 - Pick the milk up */}
        <div className="relative rounded-[69.613px] shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
              <div className="flex-[1_0_0] min-h-px min-w-px relative">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[11.138px] items-center pl-0 pr-[11.138px] py-0 relative w-full">
                    {doneStates[0] ? <DoneTickBlue /> : <UndoneTickBlue />}
                    <div 
                      className={`css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#214677] text-[11.834px] text-ellipsis ${doneStates[0] ? 'line-through' : ''}`}
                    >
                      <p className="css-g0mm18 leading-[normal] overflow-hidden">Pick the milk up</p>
                    </div>
                    {showDoneText[0] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="css-g0mm18 flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#00afee] text-[11.834px] text-ellipsis text-right"
                      >
                        <p className="css-ew64yg leading-[normal] overflow-hidden">(done)</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reminder 2 - Put the bins out */}
        <div className="relative rounded-[69.613px] shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
              <div className="flex-[1_0_0] min-h-px min-w-px relative">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[11.138px] items-center pl-0 pr-[11.138px] py-0 relative w-full">
                    {doneStates[1] ? <DoneTickPink /> : <UndoneTickPink />}
                    <div 
                      className={`css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#214677] text-[11.834px] text-ellipsis ${doneStates[1] ? 'line-through' : ''}`}
                    >
                      <p className="css-g0mm18 leading-[normal] overflow-hidden">Put the bins out</p>
                    </div>
                    {showDoneText[1] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="css-g0mm18 flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#df4dfc] text-[11.834px] text-ellipsis text-right"
                      >
                        <p className="css-ew64yg leading-[normal] overflow-hidden">(done)</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reminder 3 - Water house plants */}
        <div className="relative rounded-[69.613px] shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
              <div className="flex-[1_0_0] min-h-px min-w-px relative">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[11.138px] items-center pl-0 pr-[11.138px] py-0 relative w-full">
                    {doneStates[2] ? <DoneTickOrange /> : <UndoneTickOrange />}
                    <div 
                      className={`css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#214677] text-[11.834px] text-ellipsis ${doneStates[2] ? 'line-through' : ''}`}
                    >
                      <p className="css-g0mm18 leading-[normal] overflow-hidden">Water house plants</p>
                    </div>
                    {showDoneText[2] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="css-g0mm18 flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#faa429] text-[11.834px] text-ellipsis text-right"
                      >
                        <p className="css-ew64yg leading-[normal] overflow-hidden">(done)</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reminder 4 - Organise family photo albums */}
        <div className="relative rounded-[69.613px] shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
              <div className="flex-[1_0_0] min-h-px min-w-px relative">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[11.138px] items-center pl-0 pr-[11.138px] py-0 relative w-full">
                    {doneStates[3] ? <DoneTickGrey /> : <UndoneTickGrey />}
                    <div 
                      className={`css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#214677] text-[11.834px] text-ellipsis ${doneStates[3] ? 'line-through' : ''}`}
                    >
                      <p className="css-g0mm18 leading-[normal] overflow-hidden">Organise family photos</p>
                    </div>
                    {showDoneText[3] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="css-g0mm18 flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#939393] text-[11.834px] text-ellipsis text-right"
                      >
                        <p className="css-ew64yg leading-[normal] overflow-hidden">(done)</p>
                      </motion.div>
                    )}
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
          <ReminderList animationKey={animationKey} />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank({ animationKey }: { animationKey: number }) {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu />
      <Frame1 animationKey={animationKey} />
    </div>
  );
}

function ReminderColours({ animationKey }: { animationKey: number }) {
  return (
    <div className="h-[329px] relative shrink-0 w-[308px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full">
          <NusBlank animationKey={animationKey} />
        </div>
      </div>
    </div>
  );
}

function Frame9({ animationKey }: { animationKey: number }) {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours animationKey={animationKey} />
    </div>
  );
}

export default function OnboardingPage2Content() {
  // Animation loop state
  const [animationKey, setAnimationKey] = useState(0);
  
  useEffect(() => {
    // Total animation time: 9200ms (last done text) + 300ms (fade) + 2000ms (delay) = 11500ms
    const loopTimer = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
    }, 11500);
    
    return () => clearTimeout(loopTimer);
  }, [animationKey]); // Re-run when animationKey changes (creates loop)
  
  return <Frame9 animationKey={animationKey} />;
}
```

## OnboardingPage3Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedNewReminderPop from "@/imports/NewReminderPop";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">Smart reminders!</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
        <p className="css-4hzbpn leading-[30px]">
          When Reminderly spots a time or date, it turns the text <span style={{ color: '#4784F8', fontWeight: 600 }}>blue</span> - just click it to set it
        </p>
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
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
        </div>
      </div>
    </div>
  );
}

function ReminderList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px w-full" data-name="Reminder list">
      <div className="px-[14px] w-full">
        <ImportedNewReminderPop />
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

function Frame1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[13.96px] w-full" style={{ marginTop: '-66px' }}>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[22.334px] items-center pb-[28.334px] pt-[24px] px-0 relative size-full">
          <ReminderList />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank() {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu />
      <Frame1 />
    </div>
  );
}

function ReminderColours() {
  return (
    <div className="h-[329px] relative shrink-0 w-[308px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full">
          <NusBlank />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours />
    </div>
  );
}

export default function OnboardingPage3Content() {
  return <Frame9 />;
}
```

## OnboardingPage4Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import NewReminderPopPage4 from "@/app/components/NewReminderPopPage4";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">Even smarter reminders!</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0" style={{ minHeight: '157px' }}>
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
        <p className="css-4hzbpn leading-[30px]">Reminderly even recognises repeat events</p>
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
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
        </div>
      </div>
    </div>
  );
}

function ReminderList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px w-full" data-name="Reminder list">
      <div className="px-[14px] w-full">
        <NewReminderPopPage4 />
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

function Frame1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[13.96px] w-full" style={{ marginTop: '-66px' }}>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[22.334px] items-center pb-[28.334px] pt-[24px] px-0 relative size-full">
          <ReminderList />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank() {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu />
      <Frame1 />
    </div>
  );
}

function ReminderColours() {
  return (
    <div className="h-[359px] relative shrink-0 w-[308px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full">
          <NusBlank />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours />
    </div>
  );
}

export default function OnboardingPage4Content() {
  return <Frame9 />;
}
```

## OnboardingPage5Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderList from "@/imports/ReminderList-1192-126";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">Reminder status at a glance</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
        <p className="css-4hzbpn leading-[30px]">Reminders show different status icons based on their date and time setup</p>
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
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
        </div>
      </div>
    </div>
  );
}

function ReminderList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px w-full" data-name="Reminder list">
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

function NusBlank() {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu />
      <Frame1 />
    </div>
  );
}

function ReminderColours() {
  return (
    <div className="h-[329px] relative shrink-0 w-[308px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full">
          <NusBlank />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours />
    </div>
  );
}

export default function OnboardingPage5Content() {
  return <Frame9 />;
}
```

## OnboardingPage6Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import ReminderListImport from "@/imports/ReminderList-1192-272";
import ReminderInfoOverlay from "@/app/components/ReminderInfoOverlay";
import { useState, useEffect } from "react";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">Status icons do more</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
        <p className="css-4hzbpn leading-[30px]">Tap a reminder's status icon to<br />see more options</p>
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
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
        </div>
      </div>
    </div>
  );
}

function ReminderList() {
  const [iconActive, setIconActive] = useState(false);

  useEffect(() => {
    const runIconAnimation = () => {
      // 500ms delay
      setTimeout(() => {
        setIconActive(true); // Turn dark blue
      }, 500);

      // 900ms (500 + 400)
      setTimeout(() => {
        setIconActive(false); // Turn grey
      }, 900);

      // 1300ms (500 + 400 + 400)
      setTimeout(() => {
        setIconActive(true); // Turn dark blue
      }, 1300);

      // 1700ms (500 + 400 + 400 + 400)
      setTimeout(() => {
        setIconActive(false); // Turn grey
      }, 1700);

      // Loop the animation after 3300ms more (5000ms total to sync with overlay)
      setTimeout(() => {
        runIconAnimation();
      }, 5000);
    };

    runIconAnimation();
  }, []);

  return (
    <div className="w-full" data-name="Reminder list">
      <ReminderListImport iconActive={iconActive} />
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

function NusBlank() {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu />
      <Frame1 />
    </div>
  );
}

function ReminderColours() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const runAnimation = () => {
      // Show overlay after 2200ms
      setTimeout(() => {
        setShowOverlay(true);
      }, 2200);

      // Hide overlay after 2000ms more (4200ms total)
      setTimeout(() => {
        setShowOverlay(false);
      }, 4200);

      // Loop the animation after 800ms more (5000ms total)
      setTimeout(() => {
        runAnimation();
      }, 5000);
    };

    runAnimation();
  }, []);

  return (
    <div className="h-[329px] relative shrink-0 w-[308px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full">
          <NusBlank />
          {showOverlay && (
            <div className="absolute inset-0 flex items-end" style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
              <div className="w-full px-[14px] pb-[14px]" style={{ marginBottom: '-50px' }}>
                <ReminderInfoOverlay />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours />
    </div>
  );
}

export default function OnboardingPage6Content() {
  return <Frame9 />;
}
```

## OnboardingPage7Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderListAll from "@/imports/ReminderList-1196-227";
import ImportedReminderListToday from "@/imports/ReminderList-1196-287";
import ImportedReminderListThisWeek from "@/imports/ReminderList-1196-373";
import ImportedReminderListLater from "@/imports/ReminderList-1196-456";
import ImportedReminderListSometime from "@/imports/ReminderList-1196-515";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">Filter your reminders</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
        <p className="css-4hzbpn leading-[30px]">Tap a filter to narrow things down,<br />then de-select it to bring them all back</p>
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
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3({ isActive }: { isActive?: boolean }) {
  return (
    <div className={`${isActive ? 'bg-white' : 'bg-[rgba(255,255,255,0.15)]'} content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]`} data-name="Menu-btn">
      <div aria-hidden="true" className={`absolute border-[0.697px] border-solid ${isActive ? 'border-transparent' : 'border-white'} inset-0 pointer-events-none rounded-[69.652px]`} />
      <div className={`css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] ${isActive ? 'text-[#4784f8]' : 'text-white'}`}>
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu({ activeFilter }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime' }) {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn isActive={activeFilter === 'today'} />
          <MenuBtn1 isActive={activeFilter === 'thisWeek'} />
          <MenuBtn2 isActive={activeFilter === 'later'} />
          <MenuBtn3 isActive={activeFilter === 'sometime'} />
        </div>
      </div>
    </div>
  );
}

function ReminderList({ activeFilter }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime' }) {
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
        ) : activeFilter === 'later' ? (
          <motion.div
            key="later"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImportedReminderListLater />
          </motion.div>
        ) : (
          <motion.div
            key="sometime"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImportedReminderListSometime />
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

function Frame1({ activeFilter }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime' }) {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[13.96px] w-full -mt-[6px]">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[22.334px] items-center pb-[28.334px] pt-[24px] px-[14px] relative size-full">
          <ReminderList activeFilter={activeFilter} />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank({ activeFilter }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime' }) {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu activeFilter={activeFilter} />
      <Frame1 activeFilter={activeFilter} />
    </div>
  );
}

function ReminderColours({ activeFilter }: { activeFilter?: 'today' | 'thisWeek' | 'later' | 'sometime' }) {
  return (
    <div className="h-[329px] relative shrink-0 w-[308px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full">
          <NusBlank activeFilter={activeFilter} />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  const [activeFilter, setActiveFilter] = useState<'today' | 'thisWeek' | 'later' | 'sometime' | undefined>(undefined);

  useEffect(() => {
    const filters: Array<'today' | 'thisWeek' | 'later' | 'sometime' | undefined> = [
      undefined,    // All reminders
      'today',      // Today filter
      'thisWeek',   // This week filter
      'later',      // Later filter
      'sometime'    // Sometime filter
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
  }, []);

  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours activeFilter={activeFilter} />
    </div>
  );
}

export default function OnboardingPage7Content() {
  return <Frame9 />;
}
```

## OnboardingPage8Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderList from "@/imports/ReminderList-1198-119";
import ImportedReminderListDone from "@/imports/ReminderList-1198-346";
import ImportedGroupDone from "@/imports/Group22";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">See what you've done</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
        <p className="css-4hzbpn leading-[30px]">Tap the Reminderly logo 'tick' to<br />see what you've already done</p>
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

function Group({ showDone }: { showDone?: boolean }) {
  if (showDone) {
    return (
      <div className="relative shrink-0 size-[24.833px]">
        <ImportedGroupDone />
      </div>
    );
  }
  
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

function Frame2({ showDone }: { showDone?: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[146.027px]">
      <Group showDone={showDone} />
      <Frame />
    </div>
  );
}

function Frame7({ showDone }: { showDone?: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-center relative shrink-0">
      <Frame6 />
      <Frame2 showDone={showDone} />
    </div>
  );
}

function HeaderLogo({ showDone }: { showDone?: boolean }) {
  return (
    <div className="bg-[#4784f8] content-stretch flex flex-col items-center justify-center pb-[9.93px] pt-[16px] px-0 relative shrink-0" data-name="Header logo">
      <Frame7 showDone={showDone} />
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

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
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
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ImportedReminderList />
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
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

function NusBlank({ showDone }: { showDone?: boolean }) {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full" data-name="NUS - Blank">
      <HeaderLogo showDone={showDone} />
      <FiltersMenu />
      <Frame1 showDone={showDone} />
    </div>
  );
}

function ReminderColours({ showDone }: { showDone?: boolean }) {
  return (
    <div className="h-[329px] relative shrink-0 w-[308px]" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full">
          <NusBlank showDone={showDone} />
        </div>
      </div>
    </div>
  );
}

function Frame9({ showDone }: { showDone?: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-center relative shrink-0">
      <Frame8 />
      <ReminderColours showDone={showDone} />
    </div>
  );
}

export default function OnboardingPage8Content() {
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    let currentTimeout: NodeJS.Timeout;

    const scheduleNextToggle = (isDone: boolean) => {
      // If currently showing default, switch to done after 1200ms
      // If currently showing done, switch to default after 2500ms
      const delay = isDone ? 2500 : 1200;
      
      currentTimeout = setTimeout(() => {
        setShowDone(!isDone);
        scheduleNextToggle(!isDone);
      }, delay);
    };

    // Start the loop
    scheduleNextToggle(false);

    return () => {
      clearTimeout(currentTimeout);
    };
  }, []);

  return <Frame9 showDone={showDone} />;
}
```

## OnboardingPage9Content.tsx

```tsx
import svgPaths from "@/imports/svg-b2700o3wr8";
import ImportedReminderList from "@/imports/ReminderList-1199-119";
import ImportedOnboardingOverlay from "@/imports/OnboardingV2Overlay-1199-682";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center">
        <p className="css-ew64yg leading-[normal]">Re-run this tutorial</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[17px] text-center w-[322px]">
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
      <div className={`css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[23.682px] ${isDarkBlue ? 'text-[#1C2C42]' : 'text-white'}`}>
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
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
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
    <div className="h-[329px] relative shrink-0 w-[308px] overflow-hidden" data-name="Reminder colours">
      <div className="bg-[#214677] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] relative rounded-tl-[26px] rounded-tr-[26px] h-full w-full overflow-hidden">
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
```

## NewReminderPopPage4.tsx

```tsx
import svgPaths from "@/imports/svg-k473gxyo2t";
import svgPathsRepeats from "@/imports/svg-4op7dnhswu";
import { useState, useEffect } from "react";

function DoneTick({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[34.826px]" data-name="Done tick">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.8259 34.8259">
        <g id="Done tick">
          <rect fill={isActive ? "var(--fill-0, #4784F8)" : "var(--fill-0, #D9D9D9)"} height="34.8259" rx="17.4129" width="34.8259" />
          <path d={svgPaths.p6aae100} fill="var(--fill-0, #F0FAFE)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Frame({ isActive }: { isActive: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[13.93px]">
        <p className="css-ew64yg leading-[normal]">New reminder</p>
      </div>
      <DoneTick isActive={isActive} />
    </div>
  );
}

function TakeBinsOut({ text }: { text: string }) {
  const renderText = () => {
    if (text.includes("6pm")) {
      const beforeWednesday = "Take the bins out every ";
      const wednesday = "Wednesday";
      const betweenWednesdayAnd6pm = " at ";
      const sixpm = "6pm";
      
      return (
        <>
          <span className="leading-[normal]">{beforeWednesday}</span>
          <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] text-[#4784f8]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {wednesday}
          </span>
          <span className="leading-[normal]">{betweenWednesdayAnd6pm}</span>
          <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] text-[#4784f8]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {sixpm}
          </span>
        </>
      );
    } else if (text.includes("Wednesday")) {
      const parts = text.split("Wednesday");
      return (
        <>
          <span className="leading-[normal]">{parts[0]}</span>
          <span className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[normal] text-[#4784f8]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Wednesday
          </span>
          {parts[1] && <span className="leading-[normal]">{parts[1]}</span>}
        </>
      );
    } else {
      return <span className="leading-[normal]">{text}</span>;
    }
  };

  return (
    <div className="bg-[#f7f7f7] h-[60px] relative rounded-[7.83px] shrink-0 w-full" data-name="Take bins out">
      <div className="content-stretch flex items-start p-[12.529px] relative size-full">
        <div className="css-g0mm18 flex flex-col font-['SF_Pro:Medium',sans-serif] font-[510] justify-center relative w-full text-[#214677] text-[11.83px]" style={{ fontVariationSettings: "'wdth' 100", lineHeight: 'calc(1em + 8px)' }}>
          <p className="css-ew64yg whitespace-normal break-words" style={{ lineHeight: 'inherit' }}>
            {renderText()}
          </p>
        </div>
      </div>
    </div>
  );
}

function SetTimeClock({ isActive }: { isActive: boolean }) {
  const strokeColor = isActive ? "#214677" : "#939393";
  
  return (
    <div className="relative shrink-0 size-[17.413px]" data-name="Set time clock">
      <div className="absolute inset-[-0.31%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4129 17.4677">
          <g id="Set time clock">
            <rect fill="white" height="17.4129" transform="translate(0 0.0547263)" width="17.4129" />
            <circle cx="8.70647" cy="8.70647" id="Ellipse 1116" r="8.00995" stroke={strokeColor} strokeWidth="1.39303" />
            <path d={svgPaths.pdc0c980} id="Vector" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.39303" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame3({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  const textColor = isActive ? "#214677" : "#939393";
  
  return (
    <div className="content-stretch flex gap-[11.144px] items-center relative shrink-0 w-[135.734px]">
      <SetTimeClock isActive={isActive} />
      <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[11.841px]" style={{ color: textColor }}>Set date</p>
      {isActive && valueText && <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[#4784f8] text-[11.841px]">{valueText}</p>}
    </div>
  );
}

function SettingSliderButtonLrg({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[20.896px] relative shrink-0 w-[39.005px]" data-name="Setting slider button - lrg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.005 20.8955">
        <g id="Setting slider button - lrg">
          <rect fill={isActive ? "var(--fill-0, #4784F8)" : "var(--fill-0, #D9D9D9)"} height="20.8955" rx="10.4478" width="39.005" />
          <circle cx={isActive ? "28.5572" : "10.4478"} cy="10.4478" fill="var(--fill-0, white)" id="Ellipse 117" r="7.83582" />
        </g>
      </svg>
    </div>
  );
}

function Frame1({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="content-stretch flex items-center justify-between pb-[11.144px] pt-0 px-0 relative shrink-0 w-full">
      <Frame3 isActive={isActive} valueText={valueText} />
      <SettingSliderButtonLrg isActive={isActive} />
    </div>
  );
}

function SetDate({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Set date">
      <Frame1 isActive={isActive} valueText={valueText} />
    </div>
  );
}

function SetTimeClock1({ isActive }: { isActive: boolean }) {
  const strokeColor = isActive ? "#214677" : "#939393";
  
  return (
    <div className="relative shrink-0 size-[17.413px]" data-name="Set time clock">
      <div className="absolute inset-[-0.31%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4129 17.4677">
          <g id="Set time clock">
            <rect fill="white" height="17.4129" transform="translate(0 0.0547263)" width="17.4129" />
            <circle cx="8.70647" cy="8.70647" id="Ellipse 1116" r="8.00995" stroke={strokeColor} strokeWidth="1.39303" />
            <path d={svgPaths.pdc0c980} id="Vector" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.39303" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame6({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  const textColor = isActive ? "#214677" : "#939393";
  
  return (
    <div className="content-stretch flex gap-[11.144px] items-center relative shrink-0 w-[135.734px]">
      <SetTimeClock1 isActive={isActive} />
      <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[11.841px]" style={{ color: textColor }}>Set time</p>
      {isActive && valueText && <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[#4784f8] text-[11.841px]">{valueText}</p>}
    </div>
  );
}

function SettingSliderButtonLrg1({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[20.896px] relative shrink-0 w-[39.005px]" data-name="Setting slider button - lrg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.005 20.8955">
        <g id="Setting slider button - lrg">
          <rect fill={isActive ? "var(--fill-0, #4784F8)" : "var(--fill-0, #D9D9D9)"} height="20.8955" rx="10.4478" width="39.005" />
          <circle cx={isActive ? "28.5572" : "10.4478"} cy="10.4478" fill="var(--fill-0, white)" id="Ellipse 117" r="7.83582" />
        </g>
      </svg>
    </div>
  );
}

function Frame2({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="content-stretch flex items-center justify-between pb-[11.144px] pt-0 px-0 relative shrink-0 w-full">
      <Frame6 isActive={isActive} valueText={valueText} />
      <SettingSliderButtonLrg1 isActive={isActive} />
    </div>
  );
}

function SetDate1({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Set date">
      <Frame2 isActive={isActive} valueText={valueText} />
    </div>
  );
}

function RepeatTimeClock({ isActive }: { isActive: boolean }) {
  const fillColor = isActive ? "#214677" : "#939393";
  const strokeColor = isActive ? "#214677" : "#939393";
  
  return (
    <div className="bg-white h-[17.462px] relative shrink-0 w-[17.413px]" data-name="Repeat time clock">
      <div className="absolute h-[17.462px] left-0 top-0 w-[17.413px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4132 17.4624">
          <g id="Group 23">
            <g id="Group 20">
              <path d={svgPathsRepeats.p355c7440} fill={fillColor} id="Vector" />
              <path d={svgPathsRepeats.p2e8cfd80} fill={fillColor} id="Union" />
            </g>
            <path d={svgPathsRepeats.p2d088d00} id="Vector_2" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.39303" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame7({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  const textColor = isActive ? "#214677" : "#939393";
  
  return (
    <div className="content-stretch flex gap-[11.144px] items-center relative shrink-0 w-[135.734px]">
      <RepeatTimeClock isActive={isActive} />
      <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[11.841px]" style={{ color: textColor }}>Repeats</p>
      {isActive && valueText && <p className="css-ew64yg font-['Lato:Bold',sans-serif] leading-[16.02px] not-italic relative shrink-0 text-[#4784f8] text-[11.841px]">{valueText}</p>}
    </div>
  );
}

function SettingSliderButtonLrg2({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-[20.896px] relative shrink-0 w-[39.005px]" data-name="Setting slider button - lrg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.005 20.8955">
        <g id="Setting slider button - lrg">
          <rect fill={isActive ? "var(--fill-0, #4784F8)" : "var(--fill-0, #D9D9D9)"} height="20.8955" rx="10.4478" width="39.005" />
          <circle cx={isActive ? "28.5572" : "10.4478"} cy="10.4478" fill="var(--fill-0, white)" id="Ellipse 117" r="7.83582" />
        </g>
      </svg>
    </div>
  );
}

function Frame8({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="content-stretch flex items-center justify-between pb-[11.144px] pt-0 px-0 relative shrink-0 w-full">
      <Frame7 isActive={isActive} valueText={valueText} />
      <SettingSliderButtonLrg2 isActive={isActive} />
    </div>
  );
}

function SetDate2({ isActive, valueText }: { isActive: boolean; valueText?: string }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Set date">
      <Frame8 isActive={isActive} valueText={valueText} />
    </div>
  );
}

function Frame4({ 
  setDateActive, 
  setTimeActive, 
  repeatsActive,
  setDateValue,
  setTimeValue,
  repeatsValue
}: { 
  setDateActive: boolean; 
  setTimeActive: boolean; 
  repeatsActive: boolean;
  setDateValue?: string;
  setTimeValue?: string;
  repeatsValue?: string;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[8.358px] items-start relative shrink-0 w-full">
      <SetDate isActive={setDateActive} valueText={setDateValue} />
      <SetDate1 isActive={setTimeActive} valueText={setTimeValue} />
      <SetDate2 isActive={repeatsActive} valueText={repeatsValue} />
    </div>
  );
}

function Frame5({ 
  tickActive, 
  text, 
  setDateActive, 
  setTimeActive, 
  repeatsActive,
  setDateValue,
  setTimeValue,
  repeatsValue
}: { 
  tickActive: boolean; 
  text: string; 
  setDateActive: boolean; 
  setTimeActive: boolean; 
  repeatsActive: boolean;
  setDateValue?: string;
  setTimeValue?: string;
  repeatsValue?: string;
}) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame isActive={tickActive} />
      <div className="mt-[19.682px] w-full">
        <TakeBinsOut text={text} />
      </div>
      <div className="mt-[19.682px] w-full">
        <Frame4 
          setDateActive={setDateActive} 
          setTimeActive={setTimeActive} 
          repeatsActive={repeatsActive}
          setDateValue={setDateValue}
          setTimeValue={setTimeValue}
          repeatsValue={repeatsValue}
        />
      </div>
    </div>
  );
}

export default function NewReminderPopPage4() {
  const [tickActive, setTickActive] = useState(false);
  const [text, setText] = useState("");
  const [setDateActive, setSetDateActive] = useState(false);
  const [setTimeActive, setSetTimeActive] = useState(false);
  const [repeatsActive, setRepeatsActive] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setText("Take");
        setTickActive(true);
      }, 550),
      setTimeout(() => setText("Take the"), 700),
      setTimeout(() => setText("Take the bins"), 950),
      setTimeout(() => setText("Take the bins out"), 1100),
      setTimeout(() => setText("Take the bins out every"), 1600),
      setTimeout(() => setText("Take the bins out every Wednesday"), 1800),
      setTimeout(() => setText("Take the bins out every Wednesday at"), 2050),
      setTimeout(() => setText("Take the bins out every Wednesday at 6pm"), 2250),
      setTimeout(() => setSetDateActive(true), 2950),
      setTimeout(() => setSetTimeActive(true), 3450),
      setTimeout(() => setRepeatsActive(true), 3950),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="New reminder pop">
      <Frame5 
        tickActive={tickActive} 
        text={text} 
        setDateActive={setDateActive} 
        setTimeActive={setTimeActive} 
        repeatsActive={repeatsActive}
        setDateValue="Wednesday"
        setTimeValue="6pm"
        repeatsValue="Every Wednesday"
      />
    </div>
  );
}
```

## ReminderInfoOverlay.tsx

```tsx
function MenuBtn() {
  return (
    <div className="bg-[#214677] h-[38.198px] relative rounded-[76.396px] shrink-0 w-full" data-name="Menu-btn">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[13.751px] py-[11.459px] relative size-full">
          <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.987px] text-white">
            <p className="css-ew64yg leading-[normal]">Mark as done</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuBtn1() {
  return (
    <div className="bg-[#4784f8] h-[38.198px] relative rounded-[76.396px] shrink-0 w-full" data-name="Menu-btn">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[13.751px] py-[11.459px] relative size-full">
          <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.987px] text-white">
            <p className="css-ew64yg leading-[normal]">Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuBtn2() {
  return (
    <div className="bg-[#939393] h-[38.198px] relative rounded-[76.396px] shrink-0 w-full" data-name="Menu-btn">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[13.751px] py-[11.459px] relative size-full">
          <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12.987px] text-white">
            <p className="css-ew64yg leading-[normal]">Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[22.919px] items-start relative shrink-0 w-full">
      <MenuBtn />
      <MenuBtn1 />
      <MenuBtn2 />
    </div>
  );
}

export default function ReminderInfoOverlay() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[30.558px] items-center justify-center px-[25.975px] py-[30.558px] relative rounded-[24.447px] size-full" data-name="'Pick up milk' - Reminder info">
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[12.987px] text-center">
        <p className="css-ew64yg leading-[normal]">'Put the bins out'</p>
      </div>
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#1C2C42] text-[12.987px] text-center w-[min-content]">
        <p className="css-4hzbpn leading-[normal]">Every Wednesday at 6pm</p>
      </div>
      <Frame />
    </div>
  );
}
```

## Dependencies List

### /src/imports/ dependencies

From TutorialOnboardingContent.tsx:
- /src/imports/svg-go2phgsyt4.ts

From OnboardingPage1Content.tsx:
- /src/imports/svg-b2700o3wr8.ts
- /src/imports/ReminderList-1189-377.tsx

From OnboardingPage2Content.tsx:
- /src/imports/svg-b2700o3wr8.ts
- /src/imports/ReminderList-1173-5393.tsx
- /src/imports/svg-d69hgq55o6.ts

From OnboardingPage3Content.tsx:
- /src/imports/svg-b2700o3wr8.ts
- /src/imports/NewReminderPop.tsx

From OnboardingPage4Content.tsx:
- /src/imports/svg-b2700o3wr8.ts

From OnboardingPage5Content.tsx:
- /src/imports/svg-b2700o3wr8.ts
- /src/imports/ReminderList-1192-126.tsx

From OnboardingPage6Content.tsx:
- /src/imports/svg-b2700o3wr8.ts
- /src/imports/ReminderList-1192-272.tsx

From OnboardingPage7Content.tsx:
- /src/imports/svg-b2700o3wr8.ts
- /src/imports/ReminderList-1196-227.tsx
- /src/imports/ReminderList-1196-287.tsx
- /src/imports/ReminderList-1196-373.tsx
- /src/imports/ReminderList-1196-456.tsx
- /src/imports/ReminderList-1196-515.tsx

From OnboardingPage8Content.tsx:
- /src/imports/svg-b2700o3wr8.ts
- /src/imports/ReminderList-1198-119.tsx
- /src/imports/ReminderList-1198-346.tsx
- /src/imports/Group22.tsx

From OnboardingPage9Content.tsx:
- /src/imports/svg-b2700o3wr8.ts
- /src/imports/ReminderList-1199-119.tsx
- /src/imports/OnboardingV2Overlay-1199-682.tsx

From NewReminderPopPage4.tsx:
- /src/imports/svg-k473gxyo2t.ts
- /src/imports/svg-4op7dnhswu.ts

### External packages

- react
- motion/react

### /src/app/components/ dependencies

- /src/app/components/OnboardingPage1Content.tsx
- /src/app/components/OnboardingPage2Content.tsx
- /src/app/components/OnboardingPage3Content.tsx
- /src/app/components/OnboardingPage4Content.tsx
- /src/app/components/OnboardingPage5Content.tsx
- /src/app/components/OnboardingPage6Content.tsx
- /src/app/components/OnboardingPage7Content.tsx
- /src/app/components/OnboardingPage8Content.tsx
- /src/app/components/OnboardingPage9Content.tsx
- /src/app/components/NewReminderPopPage4.tsx
- /src/app/components/ReminderInfoOverlay.tsx
