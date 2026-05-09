const TUTORIAL_REMINDER_LIST_SCALE = 0.696;

const STATIC_REMINDERS = [
  {
    id: "today",
    title: "Pick the milk up",
    subtitle: "Today at 2:00 PM",
    circleColor: "#00AFEE",
  },
  {
    id: "this-week",
    title: "Put the bins out",
    subtitle: "Thursday",
    circleColor: "#E466FD",
  },
  {
    id: "later",
    title: "Water house plants",
    subtitle: "25th March",
    circleColor: "#FDB146",
  },
  {
    id: "sometime",
    title: "Organise family photos",
    subtitle: "No date / time set",
    circleColor: "#939393",
  },
] as const;

function TutorialStaticReminderRow({
  title,
  subtitle,
  circleColor,
}: {
  title: string;
  subtitle: string;
  circleColor: string;
}) {
  return (
    <div className="content-stretch flex items-start justify-between px-px relative w-full">
      <div className="flex-[1_0_0] min-h-px min-w-px relative">
        <div className="flex flex-row items-start size-full">
          <div className="content-stretch flex gap-[16px] items-start pr-[16px] relative w-full">
            <div
              className="relative shrink-0 size-[25px] flex items-center justify-center"
              style={{ padding: 0, lineHeight: 0, marginTop: "3px" }}
            >
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
                <circle cx="12.5" cy="12.5" fill="white" r="11.5" stroke={circleColor} strokeWidth="2" />
              </svg>
            </div>
            <div
              className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-start min-h-px min-w-0 not-italic overflow-visible relative"
              style={{ gap: "9px", minHeight: "38px" }}
            >
              <div
                className="overflow-hidden whitespace-nowrap"
                style={{ color: "#1c2c42", textDecorationColor: "#1c2c42", height: "17px", maxWidth: "100%", minWidth: 0 }}
              >
                <p
                  style={{
                    display: "block",
                    width: "100%",
                    minWidth: 0,
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: "17px",
                    transform: "translateY(-1px)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingBottom: "2px",
                    boxSizing: "content-box",
                  }}
                >
                  {title}
                </p>
              </div>
              <div className="flex items-center overflow-visible" style={{ textDecorationColor: "#BABABA" }}>
                <p
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ fontSize: "14px", fontWeight: 700, fontFamily: "'Lato', sans-serif", lineHeight: 1, color: "#BABABA" }}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative shrink-0 self-stretch w-[20px] flex items-center justify-center"
        style={{ padding: 0, lineHeight: 0 }}
        aria-hidden="true"
      >
        <div className="flex flex-row items-center justify-center gap-[3px]">
          <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
          <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
          <span className="block w-[3.5px] h-[3.5px] rounded-full bg-[#BABABA]" />
        </div>
      </div>
    </div>
  );
}

export default function TutorialStaticReminderList() {
  return (
    <div className="flex flex-[1_0_0] min-h-px w-full items-start justify-center overflow-hidden">
      <div
        className="shrink-0"
        style={{
          width: `${100 / TUTORIAL_REMINDER_LIST_SCALE}%`,
          transform: `scale(${TUTORIAL_REMINDER_LIST_SCALE})`,
          transformOrigin: "top center",
        }}
      >
        <div className="flex flex-col gap-[23px] w-full" style={{ position: "relative", zIndex: 1 }}>
          {STATIC_REMINDERS.map((reminder) => (
            <TutorialStaticReminderRow
              key={reminder.id}
              title={reminder.title}
              subtitle={reminder.subtitle}
              circleColor={reminder.circleColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
