import svgPaths from "./svg-xgk7qm25s1";

function Group() {
  return (
    <div className="relative shrink-0 size-[50px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g id="Group 22">
          <path d={svgPaths.p340e8d80} fill="var(--fill-0, #4784F8)" id="Ellipse 74 (Stroke)" />
          <g id="Group 11">
            <path d={svgPaths.p3f8c3b80} fill="var(--fill-0, #4784F8)" id="Line 39 (Stroke)" />
            <path d={svgPaths.p1babae00} fill="var(--fill-0, #4784F8)" id="Line 40 (Stroke)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[29px] items-center relative shrink-0">
      <Group />
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[22px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Log-in to Reminderly</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[15.5px] relative shrink-0 w-[21.5px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
        <g id="Frame 780" />
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-[15.5px] relative shrink-0 w-[21.5px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
        <g id="Frame 781">
          <g id="Union">
            <path clipRule="evenodd" d={svgPaths.p11ad9280} fill="#D9D9D9" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.pb9ed400} fill="#D9D9D9" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[60px] relative rounded-[100px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[30px] relative size-full">
          <Frame4 />
          <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#d9d9d9] text-[20px] whitespace-nowrap">
            <p className="leading-[normal]">Password...</p>
          </div>
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-center relative shrink-0 w-full">
      <Frame3 />
      <div className="bg-[#4784f8] content-stretch flex gap-[16px] h-[60px] items-center justify-center px-[30px] py-[22px] relative rounded-[100px] shrink-0 w-[362px]" data-name="new-reminder-btn">
        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap">
          <p className="leading-[normal]">Log-in</p>
        </div>
      </div>
      <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-[red] text-center whitespace-nowrap">
        <p className="leading-[normal]">That password doesn’t look right?</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[60px] items-center pt-[80px] relative size-full">
          <Frame1 />
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

export default function DevToolsLogin() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-[30px] pt-[26px] px-[20px] relative rounded-tl-[20px] rounded-tr-[20px] size-full" data-name="dev-tools-login">
      <Frame />
    </div>
  );
}