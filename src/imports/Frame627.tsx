import svgPaths from "./svg-6b7xc4ifcd";

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[#1c2c42] text-[17px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[normal] overflow-hidden">Repeat reminders</p>
      </div>
      <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center relative shrink-0 text-[#939393] text-[15px] w-full">
        <p className="leading-[23px] mb-0">Set it once and leave it to run</p>
        <ul className="list-disc whitespace-pre-wrap">
          <li className="mb-0 ms-[22.5px]">
            <span className="leading-[23px]">Daily, weekly, monthly or custom</span>
          </li>
          <li className="ms-[22.5px]">
            <span className="leading-[23px]">Ideal for bills and meetings etc.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function SettingSliderButtonLrg() {
  return (
    <div className="h-[30px] relative w-[56px]" data-name="Setting slider button - lrg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
        <g id="Setting slider button - lrg">
          <rect fill="var(--fill-0, #E5E5E5)" height="30" rx="15" width="56" />
          <circle cx="41" cy="15" fill="var(--fill-0, white)" id="Ellipse 117" r="11.25" />
        </g>
      </svg>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative size-full">
      <div className="h-[23.071px] relative shrink-0 w-[23.006px]" data-name="Union">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.0057 23.0711">
          <g id="Union">
            <path d={svgPaths.pda35300} fill="#1C2C42" />
            <path d={svgPaths.p2548ae00} fill="#1C2C42" />
            <path d={svgPaths.p259d8300} fill="#1C2C42" />
          </g>
        </svg>
      </div>
      <Frame1 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <SettingSliderButtonLrg />
        </div>
      </div>
    </div>
  );
}