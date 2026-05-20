import svgPaths from "./svg-orocxqk06z";

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[11px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap">
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#2B5DA0] text-[17px] w-full">
        <p className="leading-[normal] overflow-hidden">Reminderly tutorial</p>
      </div>
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#bababa] text-[15px] w-full">
        <p className="leading-[normal] overflow-hidden">Take a refresh of the onboarding tutorial</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center relative self-stretch shrink-0">
      <div className="h-[19px] relative shrink-0 w-[18px]" data-name="Union">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19">
          <g id="Union">
            <path d={svgPaths.p15f1c400} fill="var(--fill-0, #E5E5E5)" />
            <path d={svgPaths.p18a25a00} fill="var(--fill-0, #E5E5E5)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
      <div className="h-[23.75px] relative shrink-0 w-[21.551px]" data-name="Union">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5506 23.7501">
          <path clipRule="evenodd" d={svgPaths.pbcbed00} fill="var(--fill-0, #141B34)" fillRule="evenodd" id="Union" />
        </svg>
      </div>
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative shrink-0 w-full">
      <Frame />
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