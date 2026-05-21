import svgPaths from "./svg-j8pscgzuhq";

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[11px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap">
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#4784F8] text-[17px] w-full">
        <p className="leading-[normal] overflow-hidden">Spaghetti bolognese recipe</p>
      </div>
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#bababa] text-[13.5px] w-full">
        <p className="leading-[normal] overflow-hidden">6 of 12 items completed</p>
      </div>
    </div>
  );
}

function ReminderDetails() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="content-stretch flex gap-[16px] items-start pr-[16px] relative w-full">
        <div className="relative shrink-0 size-[25px]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
            <path d={svgPaths.p42a7a00} fill="var(--fill-0, #BABABA)" id="Union" />
          </svg>
        </div>
        <Frame />
      </div>
    </div>
  );
}

export default function ReminderToday() {
  return (
    <div className="content-stretch flex items-start justify-between px-px relative rounded-[100px] size-full" data-name="reminder-today">
      <ReminderDetails />
    </div>
  );
}