import svgPaths from "./svg-oxn8g14l6y";
import { useState } from "react";
import ListSmartReminderCalendar from "../app/components/ListSmartReminderCalendar";

function formatOverlayDueDate(date: Date | null): string {
  if (!date) return "No completion date set";
  const month = date.toLocaleString('en-US', { month: 'short' });
  const currentYear = new Date().getFullYear();
  if (date.getFullYear() === currentYear) {
    return `Complete by ${month} ${date.getDate()}`;
  }
  return `Complete by ${month} ${date.getDate()} '${String(date.getFullYear()).slice(-2)}`;
}

function SmartRemindersLabel({ active, smartReminderDueDate }: { active: boolean; smartReminderDueDate: Date | null }) {
  return (
    <div className={`content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[5px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative ${active ? '' : 'text-[#d9d9d9]'}`}>
      <div className={`flex flex-col justify-center overflow-hidden relative shrink-0 text-[17px] text-ellipsis w-full whitespace-nowrap ${active ? 'text-[#1c2c42]' : ''}`}>
        <p className="leading-[23px] overflow-hidden text-ellipsis">Set smart reminder</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[13.5px] w-full ${active ? 'text-[#bababa]' : ''}`}>
        <p className="leading-[normal]">{formatOverlayDueDate(smartReminderDueDate)}</p>
      </div>
    </div>
  );
}

function AlphabeticalLabel({ active }: { active: boolean }) {
  return (
    <div className={`content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[5px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative ${active ? '' : 'text-[#d9d9d9]'}`}>
      <div className={`flex flex-col justify-center overflow-hidden relative shrink-0 text-[17px] text-ellipsis w-full whitespace-nowrap ${active ? 'text-[#1c2c42]' : ''}`}>
        <p className="leading-[23px] overflow-hidden text-ellipsis">List alphabetically</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[13.5px] w-full ${active ? 'text-[#bababa]' : ''}`}>
        <p className="leading-[normal]">Displayed A - Z</p>
      </div>
    </div>
  );
}

function InsertionLabel({ active }: { active: boolean }) {
  return (
    <div className={`content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[5px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative ${active ? '' : 'text-[#d9d9d9]'}`}>
      <div className={`flex flex-col justify-center overflow-hidden relative shrink-0 text-[17px] text-ellipsis w-full whitespace-nowrap ${active ? 'text-[#1c2c42]' : ''}`}>
        <p className="leading-[23px] overflow-hidden text-ellipsis">List in order added</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[13.5px] w-full ${active ? 'text-[#bababa]' : ''}`}>
        <p className="leading-[normal]">Most recent at the top</p>
      </div>
    </div>
  );
}

function ToggleButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button className={`${active ? 'bg-[#1c2c42] justify-end' : 'bg-[#d9d9d9]'} content-stretch cursor-pointer flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px]`} onClick={(event) => { event.stopPropagation(); onClick(); }}>
      <div className="relative shrink-0 size-[22.5px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
          <circle cx="11.25" cy="11.25" fill="var(--fill-0, white)" r="11.25" />
        </svg>
      </div>
    </button>
  );
}

function Frame3({ sortMode, onSortChange, smartReminders, onSmartRemindersChange, showSmartReminders, displaySmartReminderDate, selectedSmartReminderDate, isDatePickerOpen, onDateSelect, onSetDate, onCloseDatePicker, onOpenDatePicker }: { sortMode: 'alphabetical' | 'insertion'; onSortChange: (mode: 'alphabetical' | 'insertion') => void; smartReminders: boolean; onSmartRemindersChange: (val: boolean) => void; showSmartReminders: boolean; displaySmartReminderDate: Date | null; selectedSmartReminderDate: Date; isDatePickerOpen: boolean; onDateSelect: (date: Date) => void; onSetDate: () => void; onCloseDatePicker: () => void; onOpenDatePicker: () => void }) {
  const isAlpha = sortMode === 'alphabetical';
  const isInsertion = sortMode === 'insertion';
  const smartRemindersActive = showSmartReminders && smartReminders;
  const showSortRows = !smartRemindersActive || !isDatePickerOpen;

  const handleSmartRemindersRowClick = () => {
    if (!showSmartReminders || !smartRemindersActive) return;
    if (!isDatePickerOpen) {
      onOpenDatePicker();
    }
  };

  const handleSmartRemindersToggleClick = () => {
    if (smartRemindersActive) {
      onSmartRemindersChange(false);
      return;
    }
    onSmartRemindersChange(true);
  };

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      {showSmartReminders && (
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full cursor-pointer" onClick={handleSmartRemindersRowClick}>
            <div className="h-[21.5px] relative shrink-0 w-[19.5px]" data-name="Union">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5002 21.5002">
                <g id="Union">
                  <path clipRule="evenodd" d={svgPaths.p23b20a00} fill={smartRemindersActive ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p15d6fbb2} fill={smartRemindersActive ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p1797f00} fill={smartRemindersActive ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
                </g>
              </svg>
            </div>
            <SmartRemindersLabel active={smartRemindersActive} smartReminderDueDate={displaySmartReminderDate} />
            <ToggleButton active={smartRemindersActive} onClick={handleSmartRemindersToggleClick} />
          </div>
      {smartRemindersActive && isDatePickerOpen && (
        <div className="content-stretch flex flex-col gap-[30px] items-start w-full">
          <ListSmartReminderCalendar selectedDate={selectedSmartReminderDate} onDateSelect={(date) => date && onDateSelect(date)} />
          <DatePickerButtons onSetDate={onSetDate} onBack={onCloseDatePicker} />
        </div>
      )}
        </div>
      )}
      {showSortRows && (
        <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
          <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full cursor-pointer" onClick={() => onSortChange(isInsertion ? 'alphabetical' : 'insertion')}>
            <div className="h-[20.824px] relative shrink-0 w-[20.83px]" data-name="Union">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.8301 20.8242">
                <g id="Union">
                  <path d={svgPaths.p1f326770} fill={`var(--fill-0, ${isInsertion ? '#1C2C42' : '#D9D9D9'})`} />
                  <path d={svgPaths.p10221f80} fill={`var(--fill-0, ${isInsertion ? '#1C2C42' : '#D9D9D9'})`} />
                  <path d={svgPaths.p30c3ae80} fill={`var(--fill-0, ${isInsertion ? '#1C2C42' : '#D9D9D9'})`} />
                  <path d={svgPaths.p2dfdd480} fill={`var(--fill-0, ${isInsertion ? '#1C2C42' : '#D9D9D9'})`} />
                  <path d={svgPaths.p390e3940} fill={`var(--fill-0, ${isInsertion ? '#1C2C42' : '#D9D9D9'})`} />
                </g>
              </svg>
            </div>
            <InsertionLabel active={isInsertion} />
            <ToggleButton active={isInsertion} onClick={() => onSortChange(isInsertion ? 'alphabetical' : 'insertion')} />
          </div>
          <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full cursor-pointer" onClick={() => onSortChange(isAlpha ? 'insertion' : 'alphabetical')}>
            <div className="h-[20.814px] relative shrink-0 w-[22.387px]" data-name="Union">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.3867 20.8145">
                <g id="Union">
                  <path d={svgPaths.pa5a1880} fill={`var(--fill-0, ${isAlpha ? '#1C2C42' : '#D9D9D9'})`} />
                  <path d={svgPaths.p3a034e00} fill={`var(--fill-0, ${isAlpha ? '#1C2C42' : '#D9D9D9'})`} />
                  <path d={svgPaths.pbb6b280} fill={`var(--fill-0, ${isAlpha ? '#1C2C42' : '#D9D9D9'})`} />
                  <path clipRule="evenodd" d={svgPaths.p37945200} fill={`var(--fill-0, ${isAlpha ? '#1C2C42' : '#D9D9D9'})`} fillRule="evenodd" />
                  <path d={svgPaths.p3a58ae80} fill={`var(--fill-0, ${isAlpha ? '#1C2C42' : '#D9D9D9'})`} />
                </g>
              </svg>
            </div>
            <AlphabeticalLabel active={isAlpha} />
            <ToggleButton active={isAlpha} onClick={() => onSortChange(isAlpha ? 'insertion' : 'alphabetical')} />
          </div>
        </div>
      )}
    </div>
  );
}

function UncheckAllBtn({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <div className={`${disabled ? 'bg-[#d9d9d9]' : 'bg-[#1c2c42] cursor-pointer'} h-[50px] relative rounded-[100px] shrink-0 w-full`} data-name="uncheck-all-btn" onClick={disabled ? undefined : onClick}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Uncheck all items</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetDateBtn({ onClick }: { onClick: () => void }) {
  return (
    <button className="bg-[#1c2c42] h-[50px] relative rounded-[100px] shrink-0 w-full border-none p-0 cursor-pointer" data-name="set-date-btn" onClick={onClick}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Set date</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function BackToOverlayBtn({ onClick }: { onClick: () => void }) {
  return (
    <button className="bg-[#939393] h-[50px] relative rounded-[100px] shrink-0 w-[65px] border-none p-0 cursor-pointer" data-name="back-to-overlay-btn" onClick={onClick}>
      <div className="absolute inset-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 50">
          <rect width="65" height="50" rx="25" fill="#939393" />
          <path d="M34.2971 18.8497C34.7775 18.3834 35.5566 18.3834 36.037 18.8497C36.5174 19.3161 36.5174 20.072 36.037 20.5383L31.4916 24.95L36.1397 29.4617C36.6201 29.928 36.6201 30.6839 36.1397 31.1503C35.6593 31.6166 34.8803 31.6166 34.3998 31.1503L29.075 25.9817C28.9989 25.9351 28.9265 25.8799 28.8602 25.8156C28.3799 25.3493 28.3799 24.5933 28.8602 24.127L34.2971 18.8497Z" fill="white" />
        </svg>
      </div>
    </button>
  );
}

function DatePickerButtons({ onSetDate, onBack }: { onSetDate: () => void; onBack: () => void }) {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full">
      <BackToOverlayBtn onClick={onBack} />
      <div className="flex-[1_0_0] min-w-px">
        <SetDateBtn onClick={onSetDate} />
      </div>
    </div>
  );
}

function Buttons({ onUncheckAll, allUnchecked, showUncheckAll }: { onUncheckAll: () => void; allUnchecked: boolean; showUncheckAll: boolean }) {
  if (!showUncheckAll) return null;
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full" data-name="buttons">
      <UncheckAllBtn onClick={onUncheckAll} disabled={allUnchecked} />
    </div>
  );
}

export default function InfoOverlay({ sortMode, onSortChange, listTitle, onUncheckAll, allUnchecked, smartReminders, onSmartRemindersChange, showSmartReminders, smartReminderDueDate, onSetSmartReminderDueDate }: { sortMode: 'alphabetical' | 'insertion'; onSortChange: (mode: 'alphabetical' | 'insertion') => void; listTitle: string; onUncheckAll: () => void; allUnchecked: boolean; smartReminders: boolean; onSmartRemindersChange: (val: boolean) => void; showSmartReminders: boolean; smartReminderDueDate: Date | null; onSetSmartReminderDueDate: (date: Date) => void }) {
  const smartRemindersActive = showSmartReminders && smartReminders;
  const [draftSmartReminderDate, setDraftSmartReminderDate] = useState<Date>(smartReminderDueDate ?? new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(smartRemindersActive && smartReminderDueDate == null);
  const displaySmartReminderDate = smartRemindersActive
    ? (isDatePickerOpen ? draftSmartReminderDate : smartReminderDueDate)
    : null;

  const handleSmartRemindersChange = (nextValue: boolean) => {
    if (nextValue) {
      setDraftSmartReminderDate(smartReminderDueDate ?? new Date());
      setIsDatePickerOpen(true);
    } else {
      setIsDatePickerOpen(false);
    }
    onSmartRemindersChange(nextValue);
  };

  const handleOpenDatePicker = () => {
    setDraftSmartReminderDate(smartReminderDueDate ?? new Date());
    setIsDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => {
    setDraftSmartReminderDate(smartReminderDueDate ?? new Date());
    setIsDatePickerOpen(false);
    if (smartReminderDueDate == null) {
      onSmartRemindersChange(false);
    }
  };

  const handleSetDate = () => {
    onSetSmartReminderDueDate(draftSmartReminderDate);
    setIsDatePickerOpen(false);
  };

  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-center justify-start px-[30px] py-[40px] relative rounded-[32px] mx-auto" style={{ width: 322 }} data-name="info-overlay">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c2c42] text-[20px] text-ellipsis text-center w-full whitespace-nowrap">
        <p className="leading-[normal] overflow-hidden" style={{ fontWeight: 700 }}>{listTitle}</p>
      </div>
      <Frame3 sortMode={sortMode} onSortChange={onSortChange} smartReminders={smartReminders} onSmartRemindersChange={handleSmartRemindersChange} showSmartReminders={showSmartReminders} displaySmartReminderDate={displaySmartReminderDate} selectedSmartReminderDate={draftSmartReminderDate} isDatePickerOpen={isDatePickerOpen} onDateSelect={setDraftSmartReminderDate} onSetDate={handleSetDate} onCloseDatePicker={handleCloseDatePicker} onOpenDatePicker={handleOpenDatePicker} />
      <Buttons onUncheckAll={onUncheckAll} allUnchecked={allUnchecked} showUncheckAll={!smartRemindersActive || !isDatePickerOpen} />
    </div>
  );
}
