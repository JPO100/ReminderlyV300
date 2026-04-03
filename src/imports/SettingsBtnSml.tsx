import svgPaths from "./svg-mksndf29ub";

function Elements() {
  return (
    <div className="h-[12.6px] relative shrink-0 w-[12.285px]" data-name="elements">
      <div className="absolute inset-[-4.17%_-4.27%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3351 13.65">
          <g>
            <path d={svgPaths.p3b9e9a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.05" />
            <path d={svgPaths.p1a931700} id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="1.05" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function SettingsBtnSml() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center px-[11.2px] py-[10.5px] relative rounded-[70px] size-full" data-name="settings-btn-sml">
      <div aria-hidden="true" className="absolute border-[0.7px] border-solid border-white inset-0 pointer-events-none rounded-[70px]" />
      <Elements />
    </div>
  );
}