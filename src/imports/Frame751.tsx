import svgPaths from "./svg-lmz2w7n99w";

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[#214677] text-[17px] text-ellipsis w-full whitespace-nowrap">
        <p className="leading-[normal] overflow-hidden">Unlimited reminders</p>
      </div>
      <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center relative shrink-0 text-[#939393] text-[15px] w-full">
        <p className="leading-[23px] mb-0">No limit on reminders you create</p>
        <ul className="list-disc whitespace-pre-wrap">
          <li className="mb-0 ms-[22.5px]">
            <span className="leading-[23px]">Unlock the 10 reminder limit</span>
          </li>
          <li className="ms-[22.5px]">
            <span className="leading-[23px]">{`Perfect for busy schedules `}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
      <div className="h-[21px] relative shrink-0 w-[24.46px]" data-name="Union">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.4599 21.0002">
          <g id="Union">
            <path d={svgPaths.p2515f980} fill="var(--fill-0, #214677)" />
            <path d={svgPaths.p20872d70} fill="var(--fill-0, #214677)" />
            <path d={svgPaths.p1d735a00} fill="var(--fill-0, #214677)" />
            <path d={svgPaths.p33ae7180} fill="var(--fill-0, #214677)" />
            <path d={svgPaths.p1ed57680} fill="var(--fill-0, #214677)" />
          </g>
        </svg>
      </div>
      <Frame1 />
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
    <div className="content-stretch flex gap-[16px] items-start relative size-full">
      <Frame />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <SettingSliderButtonLrg />
        </div>
      </div>
    </div>
  );
}