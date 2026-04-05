import svgPaths from "./svg-oxn8g14l6y";
import { useState } from "react";
import ListSmartReminderCalendar from "../app/components/ListSmartReminderCalendar";

function formatOverlayDueDate(date: Date | null): string {
  if (!date) return "Complete this list by...";
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
        <p className="leading-[23px] overflow-hidden text-ellipsis">Smart reminders</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[13.5px] w-full ${active ? 'text-[#bababa]' : ''}`}>
        <p className="leading-[normal]">{formatOverlayDueDate(smartReminderDueDate)}</p>
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

function Frame3({ smartReminders, onSmartRemindersChange, displaySmartReminderDate, selectedSmartReminderDate, isDatePickerOpen, onDateSelect, onSetDate, onOpenDatePicker }: { smartReminders: boolean; onSmartRemindersChange: (val: boolean) => void; displaySmartReminderDate: Date | null; selectedSmartReminderDate: Date; isDatePickerOpen: boolean; onDateSelect: (date: Date) => void; onSetDate: () => void; onOpenDatePicker: () => void }) {

  const handleSmartRemindersRowClick = () => {
    if (!smartReminders) return;
    if (!isDatePickerOpen) {
      onOpenDatePicker();
    }
  };

  const handleSmartRemindersToggleClick = () => {
    if (smartReminders) {
      onSmartRemindersChange(false);
      return;
    }
    onSmartRemindersChange(true);
  };

  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full cursor-pointer" onClick={handleSmartRemindersRowClick}>
        <div className="h-[21.5px] relative shrink-0 w-[19.5px]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5002 21.5002">
            <g id="Union">
              <path clipRule="evenodd" d={svgPaths.p23b20a00} fill={smartReminders ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p15d6fbb2} fill={smartReminders ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p1797f00} fill={smartReminders ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
            </g>
          </svg>
        </div>
        <SmartRemindersLabel active={smartReminders} smartReminderDueDate={displaySmartReminderDate} />
        <ToggleButton active={smartReminders} onClick={handleSmartRemindersToggleClick} />
      </div>
      {smartReminders && isDatePickerOpen && (
        <div className="content-stretch flex flex-col gap-[30px] items-start w-full">
          <ListSmartReminderCalendar selectedDate={selectedSmartReminderDate} onDateSelect={(date) => date && onDateSelect(date)} />
          <SetDateBtn onClick={onSetDate} />
        </div>
      )}
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

function MarkAsDoneBtn({ onClick }: { onClick: () => void }) {
  return (
    <button className="bg-[#1c2c42] h-[50px] relative rounded-[100px] shrink-0 w-full border-none p-0 cursor-pointer" data-name="mark-as-done-btn" onClick={onClick}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Mark as done</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button className="bg-[#939393] h-[50px] relative rounded-[100px] shrink-0 w-full border-none p-0 cursor-pointer" data-name="delete-btn" onClick={onClick}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Delete list</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Buttons({ onMarkAsDone, onDelete, showActionButtons }: { onMarkAsDone: () => void; onDelete: () => void; showActionButtons: boolean }) {
  if (!showActionButtons) return null;
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full" data-name="buttons">
      <>
        <MarkAsDoneBtn onClick={onMarkAsDone} />
        <DeleteBtn onClick={onDelete} />
      </>
    </div>
  );
}

export default function ListInfoOverlay({ listTitle, smartReminders, onSmartRemindersChange, showSmartReminders, smartReminderDueDate, onSetSmartReminderDueDate, onMarkAsDone, onDelete }: { listTitle: string; smartReminders: boolean; onSmartRemindersChange: (val: boolean) => void; showSmartReminders: boolean; smartReminderDueDate: Date | null; onSetSmartReminderDueDate: (date: Date) => void; onMarkAsDone: () => void; onDelete: () => void }) {
  const smartRemindersActive = showSmartReminders && smartReminders;
  const [draftSmartReminderDate, setDraftSmartReminderDate] = useState<Date>(smartReminderDueDate ?? new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(smartRemindersActive && smartReminderDueDate == null);
  const displaySmartReminderDate = smartReminders
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

  const handleSetDate = () => {
    onSetSmartReminderDueDate(draftSmartReminderDate);
    setIsDatePickerOpen(false);
  };

  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-center justify-start px-[30px] py-[40px] relative rounded-[32px] mx-auto" style={{ width: 322 }} data-name="list-info-overlay">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c2c42] text-[20px] text-ellipsis text-center w-full whitespace-nowrap">
        <p className="leading-[normal] overflow-hidden" style={{ fontWeight: 700 }}>{listTitle}</p>
      </div>
      {showSmartReminders && <Frame3 smartReminders={smartReminders} onSmartRemindersChange={handleSmartRemindersChange} displaySmartReminderDate={displaySmartReminderDate} selectedSmartReminderDate={draftSmartReminderDate} isDatePickerOpen={isDatePickerOpen} onDateSelect={setDraftSmartReminderDate} onSetDate={handleSetDate} onOpenDatePicker={handleOpenDatePicker} />}
      <Buttons onMarkAsDone={onMarkAsDone} onDelete={onDelete} showActionButtons={!smartRemindersActive || (smartReminderDueDate != null && !isDatePickerOpen)} />
    </div>
  );
}
