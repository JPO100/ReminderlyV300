import { useState } from 'react';
import svgPaths from '@/imports/svg-go2phgsyt4';
import SettingsBtnSml from '@/imports/SettingsBtnSml';
import OnboardingPage1Content from '@/app/components/OnboardingPage1Content';
import OnboardingPage2Content from '@/app/components/OnboardingPage2Content';
import OnboardingPage3Content from '@/app/components/OnboardingPage3Content';
import OnboardingPage4Content from '@/app/components/OnboardingPage4Content';
import OnboardingPage5Content from '@/app/components/OnboardingPage5Content';
import OnboardingPage6Content from '@/app/components/OnboardingPage6Content';
import OnboardingPage7Content from '@/app/components/OnboardingPage7Content';
import OnboardingPage8Content from '@/app/components/OnboardingPage8Content';
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from '@/app/components/tutorialTokens';
import type { FiltersMenuVariant } from '../reminder-utils';

interface TutorialOnboardingContentProps {
  onComplete: () => void;
  filtersMenuVariant: FiltersMenuVariant;
  variant: 'reminders' | 'lists';
}

const TOTAL_PAGES = 8;

function ListsTutorialSensorBar() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="bg-[#1c2c42] h-[7px] rounded-[10px] shrink-0 w-[24px]" />
      <div className="bg-[#1c2c42] rounded-[10px] shrink-0 size-[7px]" />
    </div>
  );
}

function ListsTutorialHeaderLogo() {
  return (
    <div className="bg-[#4784f8] content-stretch flex flex-col items-center justify-center pb-[9.93px] pt-[16px] px-0 relative shrink-0">
      <div className="content-stretch flex flex-col gap-[22px] items-center relative shrink-0">
        <ListsTutorialSensorBar />
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-[146.027px]">
          <div className="relative shrink-0 size-[24.833px]">
            <div aria-hidden="true" className="absolute inset-0 rounded-full border-[2px] border-white" />
            <div aria-hidden="true" className="absolute left-[7px] top-[11px] h-[2px] w-[10px] bg-white" />
            <div aria-hidden="true" className="absolute left-[11px] top-[7px] h-[10px] w-[2px] bg-white" />
          </div>
          <div className="content-stretch flex flex-col items-start pb-[2.786px] pt-0 px-0 relative shrink-0">
            <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[23.682px] text-white">
              <p className="leading-[normal]">reminderly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListsTutorialFilterPill({ label }: { label: string }) {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.144px] py-[10.448px] relative rounded-[69.652px] shrink-0 h-[28px]">
      <div aria-hidden="true" className="absolute border-[0.697px] border-solid border-white inset-0 pointer-events-none rounded-[69.652px]" />
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.751px] text-white">
        <p className="leading-[normal]">{label}</p>
      </div>
    </div>
  );
}

function ListsTutorialFiltersMenu({ filtersMenuVariant }: { filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[13.93px] relative w-full">
          <div className="flex items-center gap-[8px]">
            <ListsTutorialFilterPill label="Today" />
            <ListsTutorialFilterPill label="This week" />
            {filtersMenuVariant === 'grouped' ? (
              <ListsTutorialFilterPill label="Other" />
            ) : (
              <>
                <ListsTutorialFilterPill label="Later" />
                <ListsTutorialFilterPill label="Sometime" />
              </>
            )}
          </div>
          {filtersMenuVariant === 'grouped' && (
            <div className="shrink-0" style={{ width: '35px', height: '28px' }}>
              <SettingsBtnSml />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListsTutorialNewReminderButton() {
  return (
    <div className="bg-[#4784f8] content-stretch flex gap-[11.167px] h-[41.876px] items-center justify-center px-[20.938px] py-[15.355px] relative rounded-[69.794px] shrink-0 w-[252.654px]">
      <div className="relative shrink-0 size-[10.469px]">
        <div aria-hidden="true" className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-white" />
        <div aria-hidden="true" className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-white" />
      </div>
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13.959px] text-white">
        <p className="leading-[normal]">New reminder</p>
      </div>
    </div>
  );
}

function ListsTutorialPhoneState({ filtersMenuVariant }: { filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="h-[361px] relative shrink-0 w-full max-w-[308px] [@media(max-height:570px)]:scale-[0.7] [@media(max-height:570px)]:origin-top [@media(max-height:570px)]:-mb-[108px]">
      <div className="bg-[#1c2c42] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] overflow-clip relative rounded-tl-[26px] rounded-tr-[26px] h-[calc(100%+2px)] w-full">
          <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[615px] items-center justify-between gap-[4px] left-0 rounded-tl-[30px] rounded-tr-[30px] top-0 w-full">
            <ListsTutorialHeaderLogo />
            <ListsTutorialFiltersMenu filtersMenuVariant={filtersMenuVariant} />
            <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[13.96px] w-full -mt-[6px]">
              <div className="flex flex-col items-center size-full">
                <div className="content-stretch flex flex-col gap-[22.334px] items-center pb-[28.334px] pt-[24px] px-[14px] relative size-full">
                  <div className="flex-1 w-full rounded-[10px] bg-white" />
                  <ListsTutorialNewReminderButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListsTutorialPlaceholderPage({ filtersMenuVariant }: { filtersMenuVariant: FiltersMenuVariant }) {
  return (
    <div className="content-stretch flex h-full w-full flex-col items-center justify-between min-h-0 pb-[45px]">
      <div className="flex w-full flex-col items-center gap-[16px]">
        <div className={TUTORIAL_TITLE_CLASSNAME}>
          <p className="block leading-[normal] whitespace-pre-wrap">Setting title</p>
        </div>
        <div className={TUTORIAL_BODY_CLASSNAME}>
          <p className="block leading-[normal]">Setting subtitle</p>
        </div>
      </div>
      <ListsTutorialPhoneState filtersMenuVariant={filtersMenuVariant} />
    </div>
  );
}

export default function TutorialOnboardingContent({ onComplete, filtersMenuVariant, variant }: TutorialOnboardingContentProps) {
  const [currentPage, setCurrentPage] = useState(0);

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
  const isListsTutorial = variant === 'lists';

  return (
    <div
      data-testid="onboarding-root"
      className="bg-white flex flex-col h-full [@media(max-height:570px)]:!h-full [@media(max-height:570px)]:!pb-0"
      style={{
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        paddingLeft: 'clamp(16px, 5vw, 40px)',
        paddingRight: 'clamp(16px, 5vw, 40px)',
        paddingTop: '34px',
        paddingBottom: '30px',
      }}
    >
      <div className="flex-1 [@media(max-height:570px)]:flex-none relative overflow-hidden">
        {!isListsTutorial && currentPage === 0 && (
          <OnboardingPage1Content filtersMenuVariant={filtersMenuVariant} />
        )}
        
        {!isListsTutorial && currentPage === 1 && (
          <OnboardingPage2Content filtersMenuVariant={filtersMenuVariant} />
        )}
        
        {!isListsTutorial && currentPage === 2 && (
          <OnboardingPage3Content filtersMenuVariant={filtersMenuVariant} />
        )}
        
        {!isListsTutorial && currentPage === 3 && (
          <OnboardingPage4Content filtersMenuVariant={filtersMenuVariant} />
        )}
        
        {!isListsTutorial && currentPage === 4 && (
          <OnboardingPage5Content filtersMenuVariant={filtersMenuVariant} />
        )}
        
        {!isListsTutorial && currentPage === 5 && (
          <OnboardingPage6Content filtersMenuVariant={filtersMenuVariant} />
        )}
        
        {!isListsTutorial && currentPage === 6 && (
          <OnboardingPage7Content filtersMenuVariant={filtersMenuVariant} />
        )}
        
        {!isListsTutorial && currentPage === 7 && (
          <OnboardingPage8Content />
        )}

        {isListsTutorial && <ListsTutorialPlaceholderPage filtersMenuVariant={filtersMenuVariant} />}
      </div>
      
      <div className="flex flex-col items-center gap-[36px] [@media(max-height:570px)]:pt-[30px] [@media(max-height:570px)]:pb-[30px]">
        <div className="h-[7.935px] w-[133.476px] [@media(max-height:570px)]:hidden">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133.476 7.93457">
            <g>
              <circle cx="3.96729" cy="3.96729" fill={currentPage === 0 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="21.9019" cy="3.96729" fill={currentPage === 1 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="39.8364" cy="3.96729" fill={currentPage === 2 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="57.771" cy="3.96729" fill={currentPage === 3 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="75.7056" cy="3.96729" fill={currentPage === 4 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="93.6401" cy="3.96729" fill={currentPage === 5 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="111.575" cy="3.96729" fill={currentPage === 6 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
              <circle cx="129.509" cy="3.96729" fill={currentPage === 7 ? "#4784F8" : "#D9D9D9"} r="3.96729" />
            </g>
          </svg>
        </div>
        
        <div className="flex items-center justify-between w-full max-w-[322px]">
          {!isFirstPage ? (
            <button 
              className="h-[45px] w-[35px] cursor-pointer"
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
            className="bg-[#4784f8] w-[180px] rounded-[100px] flex items-center justify-center cursor-pointer"
            onClick={handleNext}
            style={{ height: 'clamp(40px, calc(20vh - 73.6px), 54px)' }}
          >
            <span className="font-['Lato',sans-serif] font-bold text-[17px] text-white leading-[normal]">
              {isLastPage ? 'Okay, got it!' : 'Next'}
            </span>
          </button>
          
          {isLastPage ? (
            <button 
              className="h-[28.321px] w-[34.741px] cursor-pointer"
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
