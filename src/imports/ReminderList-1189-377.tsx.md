# ReminderList-1189-377.tsx

```tsx
import { motion } from "motion/react";

function ReminderDetails() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.138px] items-center pl-0 pr-[11.138px] py-0 relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="relative shrink-0 size-[17.403px]"
            data-name="Tick box"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #00AFEE)" strokeWidth="1.39227" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2c42] text-[11.834px] text-ellipsis"
          >
            <p className="css-g0mm18 leading-[normal] overflow-hidden">Pick the milk up</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.3 }}
            className="css-g0mm18 flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#00afee] text-[11.834px] text-ellipsis text-right"
          >
            <p className="css-ew64yg leading-[normal] overflow-hidden">(due today)</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ReminderLine() {
  return (
    <div className="relative rounded-[69.613px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
          <ReminderDetails />
        </div>
      </div>
    </div>
  );
}

function ReminderDetails1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.138px] items-center pl-0 pr-[11.138px] py-0 relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.3 }}
            className="relative shrink-0 size-[17.403px]"
            data-name="Tick box"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #DF4DFC)" strokeWidth="1.39227" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.3 }}
            className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2c42] text-[11.834px] text-ellipsis"
          >
            <p className="css-g0mm18 leading-[normal] overflow-hidden">Put the bins out</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.3 }}
            className="css-g0mm18 flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#df4dfc] text-[11.834px] text-ellipsis text-right"
          >
            <p className="css-ew64yg leading-[normal] overflow-hidden">(due this week)</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ReminderLine1() {
  return (
    <div className="relative rounded-[69.613px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
          <ReminderDetails1 />
        </div>
      </div>
    </div>
  );
}

function ReminderDetails2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.138px] items-center pl-0 pr-[11.138px] py-0 relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="relative shrink-0 size-[17.403px]"
            data-name="Tick box"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #FAA429)" strokeWidth="1.39227" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2c42] text-[11.834px] text-ellipsis"
          >
            <p className="css-g0mm18 leading-[normal] overflow-hidden">Water house plants</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3, duration: 0.3 }}
            className="css-g0mm18 flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#faa429] text-[11.834px] text-ellipsis text-right"
          >
            <p className="css-ew64yg leading-[normal] overflow-hidden">(date set later)</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ReminderLine2() {
  return (
    <div className="relative rounded-[69.613px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
          <ReminderDetails2 />
        </div>
      </div>
    </div>
  );
}

function ReminderDetails3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.138px] items-center pl-0 pr-[11.138px] py-0 relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.3 }}
            className="relative shrink-0 size-[17.403px]"
            data-name="Tick box"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #939393)" strokeWidth="1.39227" />
            </svg>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.3 }}
            className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#1c2c42] text-[11.834px] text-ellipsis"
          >
            <p className="css-g0mm18 leading-[normal] overflow-hidden">Organise family photos</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.7, duration: 0.3 }}
            className="css-g0mm18 flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#939393] text-[11.834px] text-ellipsis text-right"
          >
            <p className="css-ew64yg leading-[normal] overflow-hidden">(no date set)</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ReminderLine3() {
  return (
    <div className="relative rounded-[69.613px] shrink-0 w-full" data-name="Reminder line">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[0.696px] py-0 relative w-full">
          <ReminderDetails3 />
        </div>
      </div>
    </div>
  );
}

export default function ReminderList() {
  return (
    <div className="content-stretch flex flex-col gap-[21.5px] items-start overflow-clip relative rounded-[6.961px] size-full" data-name="Reminder list">
      <ReminderLine />
      <ReminderLine1 />
      <ReminderLine2 />
      <ReminderLine3 />
    </div>
  );
}
```
