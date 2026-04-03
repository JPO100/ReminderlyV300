import svgPaths from "./svg-oxn8g14l6y";

function SmartRemindersLabel({ active }: { active: boolean }) {
  return (
    <div className={`content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[5px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative ${active ? '' : 'text-[#d9d9d9]'}`}>
      <div className={`flex flex-col justify-center overflow-hidden relative shrink-0 text-[17px] text-ellipsis w-full whitespace-nowrap ${active ? 'text-[#1c2c42]' : ''}`}>
        <p className="leading-[23px] overflow-hidden text-ellipsis">Smart reminders</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[13.5px] w-full ${active ? 'text-[#bababa]' : ''}`}>
        <p className="leading-[normal]">Auto-generate smart time-based reminders</p>
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
    <button className={`${active ? 'bg-[#1c2c42] justify-end' : 'bg-[#d9d9d9]'} content-stretch cursor-pointer flex h-[30px] items-center p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px]`} onClick={onClick}>
      <div className="relative shrink-0 size-[22.5px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
          <circle cx="11.25" cy="11.25" fill="var(--fill-0, white)" r="11.25" />
        </svg>
      </div>
    </button>
  );
}

function Frame3({ sortMode, onSortChange, smartReminders, onSmartRemindersChange }: { sortMode: 'alphabetical' | 'insertion'; onSortChange: (mode: 'alphabetical' | 'insertion') => void; smartReminders: boolean; onSmartRemindersChange: (val: boolean) => void }) {
  const isAlpha = sortMode === 'alphabetical';
  const isInsertion = sortMode === 'insertion';
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      {/* Smart reminders row */}
      <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-full cursor-pointer" onClick={() => onSmartRemindersChange(!smartReminders)}>
        <div className="h-[21.5px] relative shrink-0 w-[19.5px]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5002 21.5002">
            <g id="Union">
              <path clipRule="evenodd" d={svgPaths.p23b20a00} fill={smartReminders ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p15d6fbb2} fill={smartReminders ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p1797f00} fill={smartReminders ? '#1C2C42' : '#D9D9D9'} fillRule="evenodd" />
            </g>
          </svg>
        </div>
        <SmartRemindersLabel active={smartReminders} />
        <ToggleButton active={smartReminders} onClick={() => onSmartRemindersChange(!smartReminders)} />
      </div>
      {/* Insertion order row */}
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
      {/* Alphabetical row */}
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
  );
}

function MarkAsDoneBtn() {
  return (
    <div className="bg-[#1c2c42] h-[50px] relative rounded-[100px] shrink-0 w-full" data-name="mark-as-done-btn">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Mark list as done</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UncheckAllBtn({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <div className={`${disabled ? 'bg-[#d9d9d9]' : 'bg-[#4784f8] cursor-pointer'} h-[50px] relative rounded-[100px] shrink-0 w-full`} data-name="uncheck-all-btn" onClick={disabled ? undefined : onClick}>
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

function DeleteBtn() {
  return (
    <div className="bg-[#939393] h-[50px] relative rounded-[100px] shrink-0 w-full" data-name="delete-btn">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[18px] py-[15px] relative size-full">
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
            <p className="leading-[normal]">Delete list</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Buttons({ onUncheckAll, allUnchecked }: { onUncheckAll: () => void; allUnchecked: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-full" data-name="buttons">
      <MarkAsDoneBtn />
      <UncheckAllBtn onClick={onUncheckAll} disabled={allUnchecked} />
      <DeleteBtn />
    </div>
  );
}

export default function InfoOverlay({ sortMode, onSortChange, listTitle, onUncheckAll, allUnchecked, smartReminders, onSmartRemindersChange }: { sortMode: 'alphabetical' | 'insertion'; onSortChange: (mode: 'alphabetical' | 'insertion') => void; listTitle: string; onUncheckAll: () => void; allUnchecked: boolean; smartReminders: boolean; onSmartRemindersChange: (val: boolean) => void }) {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-center justify-center px-[30px] py-[40px] relative rounded-[32px] w-full" data-name="info-overlay">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#1c2c42] text-[20px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[normal] overflow-hidden">{listTitle}</p>
      </div>
      <Frame3 sortMode={sortMode} onSortChange={onSortChange} smartReminders={smartReminders} onSmartRemindersChange={onSmartRemindersChange} />
      <Buttons onUncheckAll={onUncheckAll} allUnchecked={allUnchecked} />
    </div>
  );
}