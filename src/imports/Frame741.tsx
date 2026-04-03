import svgPaths from "./svg-9gg4tfbexa";

function Frame1() {
  return (
    <div className="h-[21.5px] relative shrink-0 w-[24px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 21.5002">
        <g id="Frame 738">
          <g id="Union">
            <path clipRule="evenodd" d={svgPaths.pa3f6300} fill="#1C2C42" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p299691f0} fill="#1C2C42" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p16049180} fill="#1C2C42" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[#1c2c42] text-[17px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[normal] overflow-hidden">Natural Language Capture</p>
      </div>
      <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center relative shrink-0 text-[#939393] text-[15px] w-full">
        <p className="leading-[23px] mb-0">Capture dates and times as you type;</p>
        <ul className="list-disc whitespace-pre-wrap">
          <li className="mb-0 ms-[22.5px]">
            <span className="leading-[23px]">{`‘Haircut `}</span>
            <span className="leading-[23px] text-[#4784f8]">Tuesday</span>
            <span className="leading-[23px]">{` at `}</span>
            <span className="leading-[23px] text-[#4784f8]">4:15pm</span>
            <span className="leading-[23px]">’</span>
          </li>
          <li className="ms-[22.5px]">
            <span className="leading-[23px]">{`‘Bins out `}</span>
            <span className="leading-[23px] text-[#4784f8]">every Wednesday</span>
            <span className="leading-[23px]">{` at `}</span>
            <span className="leading-[23px] text-[#4784f8]">7am</span>
            <span className="leading-[23px]">’</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
      <Frame1 />
      <Frame3 />
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

export default function Frame2() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative size-full">
      <Frame />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <SettingSliderButtonLrg />
        </div>
      </div>
    </div>
  );
}