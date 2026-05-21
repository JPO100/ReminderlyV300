import svgPaths from "./svg-m9k1dxpekf";

function Frame() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="h-[23.75px] relative shrink-0 w-[23.199px]" data-name="Union">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.1994 23.75">
          <g id="Union">
            <path clipRule="evenodd" d={svgPaths.p2eb61320} fill="var(--fill-0, #141B34)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p381e2b80} fill="var(--fill-0, #141B34)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
      <p className="font-['Lato:Bold',sans-serif] leading-[23px] not-italic relative shrink-0 text-[#4784F8] text-[17px] whitespace-nowrap">Show tutorial on first launch</p>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full">
      <Frame />
      <div className="bg-[#4784f8] content-stretch flex h-[30px] items-center justify-end p-[3.75px] relative rounded-[37.5px] shrink-0 w-[56px]" data-name="Setting slider button - lrg">
        <div className="relative shrink-0 size-[22.5px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
            <circle cx="11.25" cy="11.25" fill="var(--fill-0, white)" id="Ellipse 117" r="11.25" />
          </svg>
        </div>
      </div>
    </div>
  );
}