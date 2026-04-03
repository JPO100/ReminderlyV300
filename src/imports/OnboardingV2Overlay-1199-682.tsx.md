# OnboardingV2Overlay-1199-682.tsx

Copy the code block below into `/src/imports/OnboardingV2Overlay-1199-682.tsx`.

```tsx
import svgPaths from "./svg-bp7eximhtr";

function Group1() {
  return (
    <div className="relative shrink-0 size-[43.184px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43.1841 43.1841">
        <g id="Group 22">
          <path d={svgPaths.p3f61a100} fill="var(--fill-0, #4784F8)" id="Ellipse 74 (Stroke)" />
          <g id="Group 11">
            <path d={svgPaths.p3fa2d400} fill="var(--fill-0, #4784F8)" id="Line 39 (Stroke)" />
            <path d={svgPaths.p3a770300} fill="var(--fill-0, #4784F8)" id="Line 40 (Stroke)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[20.896px] items-center relative shrink-0">
      <Group1 />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1c2c42] text-[15.323px] text-center">
        <p className="css-ew64yg leading-[normal]">Welcome to Reminderly!</p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[27.861px] items-center relative shrink-0">
      <Frame3 />
      <div className="flex flex-col font-['Lato:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#939393] text-[11.841px] text-center w-[224.279px]">
        <p className="css-4hzbpn leading-[20.896px]">Your reminders will be grouped and coloured by when they are due:</p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[2.786px] items-center relative shrink-0">
      <div className="bg-[#1c2c42] h-[4.876px] rounded-[6.965px] shrink-0 w-[16.716px]" />
      <div className="bg-[#1c2c42] rounded-[6.965px] shrink-0 size-[4.876px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[17.297px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.2967 17.2967">
        <g id="Group 14">
          <path d={svgPaths.pb098600} fill="var(--fill-0, white)" id="Ellipse 74 (Stroke)" />
          <g id="Group 11">
            <path d={svgPaths.p13c73500} fill="var(--fill-0, white)" id="Line 39 (Stroke)" />
            <path d={svgPaths.p38695b00} fill="var(--fill-0, white)" id="Line 40 (Stroke)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[1.941px] pt-0 px-0 relative shrink-0">
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16.495px] text-white">
        <p className="css-ew64yg leading-[normal]">reminderly</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center gap-[8px] relative shrink-0">
      <Group />
      <Frame />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[18.109px] items-center relative shrink-0 w-full">
      <Frame7 />
      <Frame2 />
    </div>
  );
}

function HeaderLogo() {
  return (
    <div className="bg-[#4784f8] content-stretch flex flex-col items-center justify-center pb-[9.703px] pt-[11.144px] px-0 relative shrink-0 w-full" data-name="Header logo">
      <Frame8 />
    </div>
  );
}

function MenuBtn() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[7.762px] py-[7.277px] relative rounded-[48.514px] shrink-0" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.485px] border-solid border-white inset-0 pointer-events-none rounded-[48.514px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[6.792px] text-white">
        <p className="css-ew64yg leading-[normal]">Today</p>
      </div>
    </div>
  );
}

function MenuBtn1() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[7.762px] py-[7.277px] relative rounded-[48.514px] shrink-0" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.485px] border-solid border-white inset-0 pointer-events-none rounded-[48.514px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[6.792px] text-white">
        <p className="css-ew64yg leading-[normal]">This week</p>
      </div>
    </div>
  );
}

function MenuBtn2() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[7.762px] py-[7.277px] relative rounded-[48.514px] shrink-0" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.485px] border-solid border-white inset-0 pointer-events-none rounded-[48.514px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[6.792px] text-white">
        <p className="css-ew64yg leading-[normal]">Later</p>
      </div>
    </div>
  );
}

function MenuBtn3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[7.762px] py-[7.277px] relative rounded-[48.514px] shrink-0" data-name="Menu-btn">
      <div aria-hidden="true" className="absolute border-[0.485px] border-solid border-white inset-0 pointer-events-none rounded-[48.514px]" />
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[6.792px] text-white">
        <p className="css-ew64yg leading-[normal]">Sometime</p>
      </div>
    </div>
  );
}

function FiltersMenu() {
  return (
    <div className="bg-[#4784f8] relative shrink-0 w-full" data-name="Filters menu">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[9.703px] relative w-full">
          <MenuBtn />
          <MenuBtn1 />
          <MenuBtn2 />
          <MenuBtn3 />
        </div>
      </div>
    </div>
  );
}

function ReminderDetails() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.758px] items-center pl-0 pr-[7.758px] py-0 relative w-full">
          <div className="relative shrink-0 size-[12.122px]" data-name="Tick box">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1217 12.1217">
              <circle cx="6.06086" cy="6.06086" fill="var(--fill-0, white)" id="Tick box" r="5.57599" stroke="var(--stroke-0, #00AFEE)" strokeWidth="0.969737" />
            </svg>
          </div>
          <div className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2c42] text-[8.243px] text-ellipsis">
            <p className="css-g0mm18 overflow-hidden">
              <span className="leading-[normal]">{`Blue reminders - `}</span>
              <span className="leading-[normal] text-[#00afee]">Today</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThisWeekSetTimeIcon() {
  return <div className="content-stretch flex items-center justify-end shrink-0" data-name="This week - set time icon" />;
}

function ReminderLine() {
  return (
    <div className="relative rounded-[48.487px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.485px] py-0 relative w-full">
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
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.758px] items-center pl-0 pr-[7.758px] py-0 relative w-full">
          <div className="relative shrink-0 size-[12.122px]" data-name="Tick box">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1217 12.1217">
              <circle cx="6.06086" cy="6.06086" fill="var(--fill-0, white)" id="Tick box" r="5.57599" stroke="var(--stroke-0, #DF4DFC)" strokeWidth="0.969737" />
            </svg>
          </div>
          <div className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2c42] text-[8.243px] text-ellipsis">
            <p className="css-g0mm18 overflow-hidden">
              <span className="leading-[normal]">{`Pink reminders - `}</span>
              <span className="leading-[normal] text-[#df4dfc]">This week</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReminderLine1() {
  return (
    <div className="relative rounded-[48.487px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.485px] py-0 relative w-full">
          <ReminderDetails1 />
        </div>
      </div>
    </div>
  );
}

function ReminderDetails2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.758px] items-center pl-0 pr-[7.758px] py-0 relative w-full">
          <div className="relative shrink-0 size-[12.122px]" data-name="Tick box">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1217 12.1217">
              <circle cx="6.06086" cy="6.06086" fill="var(--fill-0, white)" id="Tick box" r="5.57599" stroke="var(--stroke-0, #FAA429)" strokeWidth="0.969737" />
            </svg>
          </div>
          <div className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2c42] text-[8.243px] text-ellipsis">
            <p className="css-g0mm18 overflow-hidden">
              <span className="leading-[normal]">{`Orange reminders - `}</span>
              <span className="leading-[normal] text-[#faa429]">Later (in the future)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReminderLine2() {
  return (
    <div className="relative rounded-[48.487px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.485px] py-0 relative w-full">
          <ReminderDetails2 />
        </div>
      </div>
    </div>
  );
}

function ReminderDetails3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.758px] items-center pl-0 pr-[7.758px] py-0 relative w-full">
          <div className="relative shrink-0 size-[12.122px]" data-name="Tick box">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1217 12.1217">
              <circle cx="6.06086" cy="6.06086" fill="var(--fill-0, white)" id="Tick box" r="5.57599" stroke="var(--stroke-0, #939393)" strokeWidth="0.969737" />
            </svg>
          </div>
          <div className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2c42] text-[8.243px] text-ellipsis">
            <p className="css-g0mm18 overflow-hidden">
              <span className="leading-[normal]">{`Grey reminders - `}</span>
              <span className="leading-[normal] text-[#939393]">Sometime (no date)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReminderLine3() {
  return (
    <div className="relative rounded-[48.487px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.485px] py-0 relative w-full">
          <ReminderDetails3 />
        </div>
      </div>
    </div>
  );
}

function ReminderList1() {
  return (
    <div className="content-stretch flex flex-col gap-[17.761px] items-start overflow-x-clip overflow-y-auto relative rounded-[4.849px] shrink-0 w-[175.522px]" data-name="Reminder list">
      <ReminderLine />
      <ReminderLine1 />
      <ReminderLine2 />
      <ReminderLine3 />
    </div>
  );
}

function ReminderList() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px overflow-x-clip overflow-y-auto relative rounded-[4.861px] w-full" data-name="Reminder list">
      <ReminderList1 />
    </div>
  );
}

function NewReminderBtn() {
  return (
    <div className="bg-[#4784f8] content-stretch flex gap-[7.778px] h-[29.168px] items-center justify-center px-[14.584px] py-[10.695px] relative rounded-[48.613px] shrink-0 w-[175.978px]" data-name="New reminder btn">
      <div className="relative shrink-0 size-[7.292px]" data-name="Union">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.29199 7.29199">
          <path d={svgPaths.p1ca56b00} fill="var(--fill-0, white)" id="Union" />
        </svg>
      </div>
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[9.723px] text-white">
        <p className="css-ew64yg leading-[normal]">New reminder</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[9.723px] w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[15.556px] items-center px-[9.723px] py-[15.556px] relative size-full">
          <ReminderList />
          <NewReminderBtn />
        </div>
      </div>
    </div>
  );
}

function NusBlank() {
  return (
    <div className="absolute bg-[#4784f8] content-stretch flex flex-col h-[424.179px] items-center justify-between left-0 top-0 w-full overflow-hidden box-border" data-name="NUS - Blank">
      <HeaderLogo />
      <FiltersMenu />
      <Frame1 />
    </div>
  );
}

function ReminderColours() {
  return (
    <div className="h-[229.154px] relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-[195.025px]" data-name="Reminder colours">
      <div className="bg-[#1c2c42] h-full w-full rounded-tl-[20px] rounded-tr-[20px]" style={{ paddingTop: '9.751px', paddingLeft: '9.751px', paddingRight: '9.751px', boxSizing: 'border-box' }}>
        <div className="bg-[#4784f8] relative rounded-tl-[10.249px] rounded-tr-[10.249px] h-full w-full overflow-hidden">
          <NusBlank />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[34.826px] items-center relative shrink-0">
      <Frame9 />
      <ReminderColours />
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[5.527px] relative shrink-0 w-[105.46px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 105.46 5.52657">
        <g id="Frame 701">
          <circle cx="2.76328" cy="2.76328" fill="var(--fill-0, #4784F8)" id="Ellipse 1118" r="2.76328" />
          <circle cx="15.255" cy="2.76328" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1119" r="2.76328" />
          <circle cx="27.7468" cy="2.76328" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1121" r="2.76328" />
          <circle cx="40.2385" cy="2.76328" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1120" r="2.76328" />
          <circle cx="52.7302" cy="2.76328" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1122" r="2.76328" />
          <circle cx="65.222" cy="2.76328" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1123" r="2.76328" />
          <circle cx="77.7137" cy="2.76328" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1124" r="2.76328" />
          <circle cx="90.2055" cy="2.76328" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1125" r="2.76328" />
          <circle cx="102.697" cy="2.76328" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1126" r="2.76328" />
        </g>
      </svg>
    </div>
  );
}

function MenuBtn4() {
  return (
    <div className="bg-[#4784f8] content-stretch flex h-[37.612px] items-center justify-center px-[12.537px] py-[10.448px] relative rounded-[69.652px] shrink-0 w-[125.373px]" data-name="Menu-btn">
      <div className="css-g0mm18 flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11.841px] text-white">
        <p className="css-ew64yg leading-[normal]">Next</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[224.279px]">
      <MenuBtn4 />
    </div>
  );
}

function OnboardingOverlayNav() {
  return (
    <div className="content-stretch flex flex-col gap-[27.861px] items-center relative shrink-0 w-[224.279px]" data-name="Onboarding overlay nav">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col h-[493.134px] items-center justify-between relative shrink-0 w-[224.279px]" data-name="Component 38">
      <Frame10 />
      <OnboardingOverlayNav />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-tl-[13.93px] rounded-tr-[13.93px] w-full">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center pb-[41.791px] pt-[27.861px] px-[27.861px] relative size-full">
          <Component />
        </div>
      </div>
    </div>
  );
}

export default function OnboardingV2Overlay() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative rounded-tl-[13.93px] rounded-tr-[13.93px] size-full" data-name="Onboarding v2 overlay">
      <Frame6 />
    </div>
  );
}
```
