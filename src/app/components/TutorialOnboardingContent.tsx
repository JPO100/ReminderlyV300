import { useState } from 'react';
import svgPaths from '@/imports/svg-go2phgsyt4';
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

function ListsTutorialPlaceholderPage() {
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
      <div className="h-[361px] relative shrink-0 w-full max-w-[308px] [@media(max-height:570px)]:scale-[0.7] [@media(max-height:570px)]:origin-top [@media(max-height:570px)]:-mb-[108px]">
        <div className="bg-[#1c2c42] h-full w-full rounded-tl-[40px] rounded-tr-[40px]" style={{ paddingTop: '14px', paddingLeft: '14px', paddingRight: '14px', boxSizing: 'border-box' }}>
          <div className="bg-white overflow-hidden relative rounded-tl-[26px] rounded-tr-[26px] h-[calc(100%+2px)] w-full border border-[#e6e6e6]" />
        </div>
      </div>
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

        {isListsTutorial && <ListsTutorialPlaceholderPage />}
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
