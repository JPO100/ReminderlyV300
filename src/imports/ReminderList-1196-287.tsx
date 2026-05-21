import svgPaths from "./svg-phjjvdg4ds";

function ReminderDetails() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-start size-full">
        <div className="content-stretch flex gap-[11.138px] items-start pl-0 pr-[11.138px] py-0 relative w-full">
          <div className="relative shrink-0 size-[17.403px]" data-name="Tick box" style={{ marginTop: '2px' }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #00AFEE)" strokeWidth="1.39227" />
            </svg>
          </div>
          <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative text-[#4784F8] text-[11.834px]" style={{ gap: '2px' }}>
            <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">Pick up the milk</p>
            <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '9.4px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA' }}>Today at 2:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetTimeClock() {
  return (
    <div className="relative shrink-0 size-[17.403px]" data-name="Set time clock">
      <div className="absolute inset-[-0.29%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.453">
          <g id="Set time clock">
            <rect fill="white" height="17.4033" transform="translate(0 0.0497238)" width="17.4033" />
            <circle cx="8.70166" cy="8.70166" id="Ellipse 1116" r="8.00552" stroke="var(--stroke-0, #BABABA)" strokeWidth="1.39227" />
            <path d={svgPaths.p1a0aa740} id="Vector" stroke="var(--stroke-0, #BABABA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.39227" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ThisWeekSetTimeIcon() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="This week - set time icon">
      <SetTimeClock />
    </div>
  );
}

function ReminderLine() {
  return (
    <div className="relative rounded-[69.613px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
          <ReminderDetails />
          <ThisWeekSetTimeIcon />
        </div>
      </div>
    </div>
  );
}

function ReminderDetails1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-start size-full">
        <div className="content-stretch flex gap-[11.138px] items-start pl-0 pr-[11.138px] py-0 relative w-full">
          <div className="relative shrink-0 size-[17.403px]" data-name="Tick box" style={{ marginTop: '2px' }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #00AFEE)" strokeWidth="1.39227" />
            </svg>
          </div>
          <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative text-[#4784F8] text-[11.834px]" style={{ gap: '2px' }}>
            <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">Call mum tonight</p>
            <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '9.4px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA' }}>Today at 7:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetTimeClock1() {
  return (
    <div className="relative shrink-0 size-[17.403px]" data-name="Set time clock">
      <div className="absolute inset-[-0.29%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.453">
          <g id="Set time clock">
            <rect fill="white" height="17.4033" transform="translate(0 0.0497238)" width="17.4033" />
            <circle cx="8.70166" cy="8.70166" id="Ellipse 1116" r="8.00552" stroke="var(--stroke-0, #BABABA)" strokeWidth="1.39227" />
            <path d={svgPaths.p1a0aa740} id="Vector" stroke="var(--stroke-0, #BABABA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.39227" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ThisWeekSetTimeIcon1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0" data-name="This week - set time icon">
      <SetTimeClock1 />
    </div>
  );
}

function ReminderLine1() {
  return (
    <div className="relative rounded-[69.613px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
          <ReminderDetails1 />
          <ThisWeekSetTimeIcon1 />
        </div>
      </div>
    </div>
  );
}

export default function ReminderList() {
  return (
    <div className="content-stretch flex flex-col gap-[17.5px] items-start overflow-clip relative rounded-[6.961px] size-full" data-name="Reminder list">
      <ReminderLine />
      <ReminderLine1 />
    </div>
  );
}