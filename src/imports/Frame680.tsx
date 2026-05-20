import svgPaths from "./svg-nziaiw92zn";

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[11px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap">
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#2B5DA0] text-[17px] w-full">
        <p className="leading-[normal] overflow-hidden">Show date and time subtitles</p>
      </div>
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#bababa] text-[13.5px] w-full">
        <p className="leading-[normal] overflow-hidden">Displays additional reminder information</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
      <div className="h-[24px] relative shrink-0 w-[22.9px]" data-name="Union">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.9004 24">
          <g id="Union">
            <path d={svgPaths.p10ad3640} fill="#2B5DA0" />
            <path d={svgPaths.pe9ba000} fill="#2B5DA0" />
            <path d={svgPaths.p1ffae300} fill="#2B5DA0" />
            <path d={svgPaths.paf45580} fill="#2B5DA0" />
            <path d={svgPaths.pc271000} fill="#2B5DA0" />
            <path clipRule="evenodd" d={svgPaths.pd7cba80} fill="#2B5DA0" fillRule="evenodd" />
          </g>
        </svg>
      </div>
      <Frame2 />
    </div>
  );
}

function SettingSliderButtonLrg() {
  return (
    <div className="h-[30px] relative shrink-0 w-[56px]" data-name="Setting slider button - lrg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
        <g id="Setting slider button - lrg">
          <rect fill="var(--fill-0, #4784F8)" height="30" rx="15" width="56" />
          <circle cx="41" cy="15" fill="var(--fill-0, white)" id="Ellipse 117" r="11.25" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[10px] h-[40px] items-start relative shrink-0 w-full">
      <Frame />
      <SettingSliderButtonLrg />
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full">
      <Frame3 />
    </div>
  );
}