import svgPaths from "../../imports/svg-7kpmedzeqd";
import settingsIconPaths from "../../imports/svg-nziaiw92zn";
import tutorialIconPaths from "../../imports/svg-orocxqk06z";
import premiumIconPaths from "../../imports/svg-4xkxvo0xnr";
import unlimitedIconPaths from "../../imports/svg-lmz2w7n99w";
import nlcIconPaths from "../../imports/svg-9gg4tfbexa";
import repeatIconPaths from "../../imports/svg-6b7xc4ifcd";

function Header({ onClose }: { onClose: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="header">
      <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1C2C42] text-[20px] whitespace-nowrap">
        <p className="leading-[normal]">Settings</p>
      </div>
      <button
        onClick={onClose}
        className="flex items-center justify-center relative shrink-0 size-[25.456px] cursor-pointer"
        aria-label="Close settings"
      >
        <div className="flex-none rotate-45">
          <div className="relative size-[18px]" data-name="Union">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p1cbc7100} fill="var(--fill-0, #214677)" id="Union" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function SettingsOverlay({ onClose, showDateAndTimeSubtitles, onShowDateAndTimeSubtitlesChange, onTutorialOpen, isOnboardingTutorialEnabled, isListsEnabled }: { onClose: () => void; showDateAndTimeSubtitles: boolean; onShowDateAndTimeSubtitlesChange: (v: boolean) => void; onTutorialOpen: () => void; isOnboardingTutorialEnabled: boolean; isListsEnabled: boolean }) {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative rounded-tl-[20px] rounded-tr-[20px] size-full" data-name="settings-overlay">
      <div className="flex flex-col h-full relative w-full max-w-[768px]" data-name="settings-content">
        <div className="flex flex-col gap-[32px] [@media(max-height:667px)]:gap-[20px] items-start pt-[30px] px-[20px] pb-0 relative w-full flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-col gap-[40px] [@media(max-height:667px)]:gap-[20px] w-full shrink-0">
            <Header onClose={onClose} />

            {/* Settings items */}
            <div className="flex flex-col w-full">
              {/* Show date and time subtitles */}
              <div className="content-stretch flex gap-[10px] items-start [@media(max-height:667px)]:items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
                  <div className="h-[24px] relative shrink-0 w-[22.9px] [@media(max-height:667px)]:hidden" data-name="Union" style={{ transform: 'translateY(3px)' }}>
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.9004 24">
                      <g id="Union">
                        <path d={settingsIconPaths.p10ad3640} fill={showDateAndTimeSubtitles ? "#214677" : "#D9D9D9"} />
                        <path d={settingsIconPaths.pe9ba000} fill={showDateAndTimeSubtitles ? "#214677" : "#D9D9D9"} />
                        <path d={settingsIconPaths.p1ffae300} fill={showDateAndTimeSubtitles ? "#214677" : "#D9D9D9"} />
                        <path d={settingsIconPaths.paf45580} fill={showDateAndTimeSubtitles ? "#214677" : "#D9D9D9"} />
                        <path d={settingsIconPaths.pc271000} fill={showDateAndTimeSubtitles ? "#214677" : "#D9D9D9"} />
                        <path clipRule="evenodd" d={settingsIconPaths.pd7cba80} fill={showDateAndTimeSubtitles ? "#214677" : "#D9D9D9"} fillRule="evenodd" />
                      </g>
                    </svg>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[4px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap">
                    <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[17px] w-full" style={{ color: showDateAndTimeSubtitles ? '#214677' : '#D9D9D9' }}>
                      <p className="leading-[normal] overflow-hidden truncate">Show date and time subtitles</p>
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[13.5px] w-full [@media(max-height:667px)]:hidden" style={{ fontWeight: 600, fontFamily: "'Lato', sans-serif", color: showDateAndTimeSubtitles ? '#bababa' : '#D9D9D9' }}>
                      <p className="leading-[normal] overflow-hidden truncate">Displays additional reminder information</p>
                    </div>
                  </div>
                </div>
                <div
                  className="h-[30px] relative shrink-0 w-[56px] cursor-pointer [@media(max-height:667px)]:translate-y-0"
                  data-name="Setting slider button - lrg"
                  style={{ transform: 'translateY(3px)' }}
                  onClick={() => onShowDateAndTimeSubtitlesChange(!showDateAndTimeSubtitles)}
                >
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
                    <g>
                      <rect fill={showDateAndTimeSubtitles ? "#4784F8" : "#D9D9D9"} height="30" rx="15" width="56" />
                      <circle cx={showDateAndTimeSubtitles ? "41" : "15"} cy="15" fill="white" r="11.25" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Reminderly tutorial */}
              {isOnboardingTutorialEnabled && (
              <div
                className={`content-stretch flex h-[40px] items-start [@media(max-height:667px)]:items-center relative shrink-0 w-full mt-[30px] cursor-pointer`}
                onClick={() => onTutorialOpen()}
              >
                <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
                  <div className="h-[23.75px] relative shrink-0 w-[21.551px] [@media(max-height:667px)]:hidden" data-name="Union" style={{ transform: 'translateY(3px)' }}>
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5506 23.7501">
                      <path clipRule="evenodd" d={tutorialIconPaths.pbcbed00} fill="var(--fill-0, #141B34)" fillRule="evenodd" id="Union" />
                    </svg>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] gap-[4px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap">
                    <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[17px] w-full" style={{ color: isOnboardingTutorialEnabled ? '#214677' : '#939393' }}>
                      <p className="leading-[normal] overflow-hidden truncate">Reminderly tutorial</p>
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[15px] w-full [@media(max-height:667px)]:hidden" style={{ fontWeight: 600, fontFamily: "'Lato', sans-serif", color: isOnboardingTutorialEnabled ? '#bababa' : '#939393' }}>
                      <p className="leading-[normal] overflow-hidden truncate">Take a refresh of the onboarding tutorial</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center relative self-stretch shrink-0">
                    <div className="h-[19px] relative shrink-0 w-[18px]" data-name="Union">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 19">
                        <g id="Union">
                          <path d={tutorialIconPaths.p15f1c400} fill="var(--fill-0, #E5E5E5)" />
                          <path d={tutorialIconPaths.p18a25a00} fill="var(--fill-0, #E5E5E5)" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>

          {/* Spacer container filling remaining space */}
          {isListsEnabled && (
          <div className="flex-1 min-h-0 w-[calc(100%+40px)] -mx-[20px] pt-[24px] px-[20px] pb-[32px] border-t border-[#D9D9D9] flex flex-col overflow-hidden bg-[#FAFAFA]" data-name="premium-features">
            <div className="w-full flex-1 min-h-0 flex flex-col">
              <div className="content-stretch flex items-center justify-between relative w-full pb-[26px]" data-name="premium-title">
                <div className="flex flex-col font-['Lato:ExtraBold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#4784f8] text-[18px] text-ellipsis whitespace-nowrap">
                  <p className="leading-[normal] overflow-hidden">Unlock premium features!</p>
                </div>
                <div className="h-[24px] relative shrink-0 w-[22.8px]" data-name="elements">
                  <div className="absolute inset-[-4.17%_-4.39%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.8 26">
                      <g>
                        <path d={premiumIconPaths.p2051eb00} fill="#4784F8" stroke="#4784F8" strokeLinejoin="round" strokeWidth="2" />
                        <path d={premiumIconPaths.p3a866400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Features scroll area */}
              <div className="flex-1 min-h-0 w-full px-0 py-0 overflow-y-auto" data-name="features-scroll">
                <div className="w-full min-h-full">
                  {/* Unlimited reminders feature row */}
                  <div className="content-stretch flex gap-[10px] items-start relative w-full">
                    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
                      <div className="h-[21px] relative shrink-0 w-[24.46px] [@media(max-height:667px)]:hidden" data-name="Union" style={{ transform: 'translateY(2px)' }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.4599 21.0002">
                          <g id="Union">
                            <path d={unlimitedIconPaths.p2515f980} fill="#000000" />
                            <path d={unlimitedIconPaths.p20872d70} fill="#000000" />
                            <path d={unlimitedIconPaths.p1d735a00} fill="#000000" />
                            <path d={unlimitedIconPaths.p33ae7180} fill="#000000" />
                            <path d={unlimitedIconPaths.p1ed57680} fill="#000000" />
                          </g>
                        </svg>
                      </div>
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative">
                        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[#000000] text-[17px] text-ellipsis w-full whitespace-nowrap">
                          <p className="leading-[normal] overflow-hidden">Unlimited reminders</p>
                        </div>
                        <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center relative shrink-0 text-[#939393] text-[15px] w-full">
                          <p className="leading-[23px] mb-0 [@media(max-height:667px)]:hidden">No limit on reminders you create</p>
                          <p className="leading-[23px] mb-0 hidden [@media(max-height:667px)]:block">No limit on reminders</p>
                          <ul className="list-disc whitespace-pre-wrap [@media(max-height:667px)]:hidden">
                            <li className="ms-[22.5px]">
                              <span className="leading-[23px]">Unlock the 10 reminder limit</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0" style={{ transform: 'translateY(2px)' }}>
                      <div className="h-[30px] relative w-[56px]" data-name="Setting slider button - lrg">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
                          <g>
                            <rect fill="#E5E5E5" height="30" rx="15" width="56" />
                            <circle cx="15" cy="15" fill="white" r="11.25" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Natural Language Capture feature row */}
                  <div className="content-stretch flex gap-[10px] items-start relative w-full mt-[30px] [@media(max-height:667px)]:mt-[24px]">
                    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
                      <div className="h-[21.5px] relative shrink-0 w-[24px] [@media(max-height:667px)]:hidden" style={{ transform: 'translateY(2px)' }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 21.5002">
                          <g>
                            <path clipRule="evenodd" d={nlcIconPaths.pa3f6300} fill="#000000" fillRule="evenodd" />
                            <path clipRule="evenodd" d={nlcIconPaths.p299691f0} fill="#000000" fillRule="evenodd" />
                            <path clipRule="evenodd" d={nlcIconPaths.p16049180} fill="#000000" fillRule="evenodd" />
                          </g>
                        </svg>
                      </div>
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative">
                        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[#000000] text-[17px] text-ellipsis w-full whitespace-nowrap">
                          <p className="leading-[normal] overflow-hidden">Natural Language Capture</p>
                        </div>
                        <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center relative shrink-0 text-[#939393] text-[15px] w-full">
                          <p className="leading-[23px] mb-0 [@media(max-height:667px)]:hidden">Capture dates and times as you type;</p>
                          <p className="leading-[23px] mb-0 hidden [@media(max-height:667px)]:block">Capture dates and times</p>
                          <ul className="list-disc whitespace-pre-wrap [@media(max-height:667px)]:hidden">
                            <li className="mb-0 ms-[22.5px]">
                              <span className="leading-[23px]">{`'Haircut `}</span>
                              <span className="leading-[23px] text-[#4784f8]">Tuesday</span>
                              <span className="leading-[23px]">{` at `}</span>
                              <span className="leading-[23px] text-[#4784f8]">4:15pm</span>
                              <span className="leading-[23px]">'</span>
                            </li>
                            <li className="ms-[22.5px]">
                              <span className="leading-[23px]">{`'Bins out `}</span>
                              <span className="leading-[23px] text-[#4784f8]">every Wednesday</span>
                              <span className="leading-[23px]">{` at `}</span>
                              <span className="leading-[23px] text-[#4784f8]">7am</span>
                              <span className="leading-[23px]">'</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0" style={{ transform: 'translateY(2px)' }}>
                      <div className="h-[30px] relative w-[56px]" data-name="Setting slider button - lrg">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
                          <g>
                            <rect fill="#E5E5E5" height="30" rx="15" width="56" />
                            <circle cx="15" cy="15" fill="white" r="11.25" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Repeat reminders feature row */}
                  <div className="content-stretch flex gap-[10px] items-start relative w-full mt-[30px] [@media(max-height:667px)]:mt-[24px]">
                    <div className="content-stretch flex flex-[1_0_0] gap-[16px] items-start min-h-px min-w-px relative">
                      <div className="h-[23.07px] relative shrink-0 w-[23.01px] [@media(max-height:667px)]:hidden" style={{ transform: 'translateY(2px)' }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.0057 23.0711">
                          <g>
                            <path d={repeatIconPaths.pda35300} fill="#000000" />
                            <path d={repeatIconPaths.p2548ae00} fill="#000000" />
                            <path d={repeatIconPaths.p259d8300} fill="#000000" />
                          </g>
                        </svg>
                      </div>
                      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start justify-center leading-[0] min-h-px min-w-px not-italic relative">
                        <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center overflow-hidden relative shrink-0 text-[#000000] text-[17px] text-ellipsis w-full whitespace-nowrap">
                          <p className="leading-[normal] overflow-hidden">Repeat reminders</p>
                        </div>
                        <div className="flex flex-col font-['Lato:SemiBold',sans-serif] justify-center relative shrink-0 text-[#939393] text-[15px] w-full">
                          <p className="leading-[23px] mb-0">Set it once and leave it to run</p>
                          <ul className="list-disc whitespace-pre-wrap [@media(max-height:667px)]:hidden">
                            <li className="mb-0 ms-[22.5px]">
                              <span className="leading-[23px]">Daily, weekly, monthly or custom</span>
                            </li>
                            <li className="ms-[22.5px]">
                              <span className="leading-[23px]">Ideal for bills and meetings etc.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0" style={{ transform: 'translateY(2px)' }}>
                      <div className="h-[30px] relative w-[56px]" data-name="Setting slider button - lrg">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 30">
                          <g>
                            <rect fill="#E5E5E5" height="30" rx="15" width="56" />
                            <circle cx="15" cy="15" fill="white" r="11.25" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* CTA button pinned to bottom */}
              <div className="shrink-0 w-full pt-[20px]">
                <button className="bg-[#4784f8] flex items-center justify-center rounded-[100px] w-full cursor-pointer" style={{ height: 'clamp(40px, calc(20vh - 73.6px), 60px)' }}>
                  <div className="flex flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-white whitespace-nowrap">
                    <p className="leading-[normal] [@media(max-height:667px)]:hidden">Get premium features for £9 a year!</p>
                    <p className="leading-[normal] hidden [@media(max-height:667px)]:block">Get premium for £9 a year!</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          )}

        </div>
      </div>
    </div>
  );
}
