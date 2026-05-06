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
import TutorialPhoneShell from '@/app/components/TutorialPhoneShell';
import TutorialReminderFilters, {
  GROUPED_TUTORIAL_LIST_FILTER_ITEMS,
  SAVED_LISTS_TUTORIAL_FILTER_ITEMS,
  UNGROUPED_TUTORIAL_LIST_FILTER_ITEMS,
} from '@/app/components/TutorialReminderFilters';
import type { FiltersMenuVariant } from '../reminder-utils';

interface TutorialOnboardingContentProps {
  onComplete: () => void;
  filtersMenuVariant: FiltersMenuVariant;
  variant: 'reminders' | 'lists';
  isListsEnabled: boolean;
  settingsMenuEnabled: boolean;
  savedListsEnabled: boolean;
}

const TOTAL_PAGES = 8;

function TemplatesTutorialButton() {
  return (
    <div className="bg-[#1C2C42] content-stretch flex items-center justify-center px-[11.487px] h-[28.718px] relative rounded-[71.795px] shrink-0">
      <div className="content-stretch flex items-center justify-center gap-[5.744px] relative">
        <div className="font-['Lato',sans-serif] font-bold text-[10.051px] text-white whitespace-nowrap">
          Templates
        </div>
        <svg className="block shrink-0" width="5" height="7" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1.72101 0.269035C1.34568 -0.0896783 0.737045 -0.0896783 0.361708 0.269035C-0.0135638 0.627741 -0.0135771 1.20921 0.361708 1.56791L3.91284 4.96154L0.281458 8.43209C-0.0938212 8.79079 -0.0938182 9.37226 0.281458 9.73096C0.656796 10.0897 1.26543 10.0897 1.64076 9.73096L5.80081 5.75517C5.86027 5.71933 5.91677 5.67686 5.96858 5.62735C6.34382 5.26866 6.3438 4.68717 5.96858 4.32847L1.72101 0.269035Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
}

function ListsTutorialPlaceholderPage({
  filtersMenuVariant,
  settingsMenuEnabled,
  savedListsEnabled,
}: {
  filtersMenuVariant: FiltersMenuVariant;
  settingsMenuEnabled: boolean;
  savedListsEnabled: boolean;
}) {
  const listFilterItems =
    savedListsEnabled
      ? SAVED_LISTS_TUTORIAL_FILTER_ITEMS
      : filtersMenuVariant === 'grouped'
      ? GROUPED_TUTORIAL_LIST_FILTER_ITEMS
      : UNGROUPED_TUTORIAL_LIST_FILTER_ITEMS;

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
      <TutorialPhoneShell
        activeMainTab="lists"
        showHeaderMenu={settingsMenuEnabled}
        filterRow={
          <TutorialReminderFilters
            items={listFilterItems}
            showSettings={!savedListsEnabled && filtersMenuVariant === 'grouped'}
            trailing={savedListsEnabled ? <TemplatesTutorialButton /> : undefined}
            layout={savedListsEnabled || filtersMenuVariant === 'grouped' ? 'inline' : 'between'}
            rowGapClassName={savedListsEnabled || filtersMenuVariant === 'grouped' ? 'gap-[12.923px]' : 'gap-[10px]'}
            groupGapClassName="gap-[8.615px]"
          />
        }
        blankBody
      />
    </div>
  );
}

export default function TutorialOnboardingContent({ onComplete, filtersMenuVariant, variant, isListsEnabled, settingsMenuEnabled, savedListsEnabled }: TutorialOnboardingContentProps) {
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
          <OnboardingPage1Content filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
        )}
        
        {!isListsTutorial && currentPage === 1 && (
          <OnboardingPage2Content filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
        )}
        
        {!isListsTutorial && currentPage === 2 && (
          <OnboardingPage3Content filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
        )}
        
        {!isListsTutorial && currentPage === 3 && (
          <OnboardingPage4Content filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
        )}
        
        {!isListsTutorial && currentPage === 4 && (
          <OnboardingPage5Content filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
        )}
        
        {!isListsTutorial && currentPage === 5 && (
          <OnboardingPage6Content filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
        )}
        
        {!isListsTutorial && currentPage === 6 && (
          <OnboardingPage7Content filtersMenuVariant={filtersMenuVariant} isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
        )}
        
        {!isListsTutorial && currentPage === 7 && (
          <OnboardingPage8Content isListsEnabled={isListsEnabled} settingsMenuEnabled={settingsMenuEnabled} />
        )}

        {isListsTutorial && <ListsTutorialPlaceholderPage filtersMenuVariant={filtersMenuVariant} settingsMenuEnabled={settingsMenuEnabled} savedListsEnabled={savedListsEnabled} />}
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
