import { motion } from "motion/react";

function ReminderDetails() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Reminder details">
      <div className="flex flex-row items-start size-full">
        <div className="content-stretch flex gap-[11.138px] items-start pl-0 pr-[11.138px] py-0 relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="relative shrink-0 size-[17.403px]"
            data-name="Tick box"
            style={{ marginTop: '2px' }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #00AFEE)" strokeWidth="1.39227" />
            </svg>
          </motion.div>
          <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative text-[#4784F8] text-[11.834px]" style={{ gap: '2px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">Pick the milk up</p>
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '9.4px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA', marginTop: '2px' }}>Today at 2:00 PM</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.3 }}
            className="flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#00afee] text-[11.834px] text-ellipsis text-right"
          >
            <p className="leading-[normal] overflow-hidden">(today)</p>
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
      <div className="flex flex-row items-start size-full">
        <div className="content-stretch flex gap-[11.138px] items-start pl-0 pr-[11.138px] py-0 relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.3 }}
            className="relative shrink-0 size-[17.403px]"
            data-name="Tick box"
            style={{ marginTop: '2px' }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #DF4DFC)" strokeWidth="1.39227" />
            </svg>
          </motion.div>
          <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative text-[#4784F8] text-[11.834px]" style={{ gap: '2px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">Put the bins out</p>
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '9.4px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA', marginTop: '2px' }}>Thursday</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: 0.3 }}
            className="flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#df4dfc] text-[11.834px] text-ellipsis text-right"
          >
            <p className="leading-[normal] overflow-hidden">(this week)</p>
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
      <div className="flex flex-row items-start size-full">
        <div className="content-stretch flex gap-[11.138px] items-start pl-0 pr-[11.138px] py-0 relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="relative shrink-0 size-[17.403px]"
            data-name="Tick box"
            style={{ marginTop: '2px' }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #FAA429)" strokeWidth="1.39227" />
            </svg>
          </motion.div>
          <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative text-[#4784F8] text-[11.834px]" style={{ gap: '2px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
            >
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">Water house plants</p>
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '9.4px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA', marginTop: '2px' }}>25th March</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.3, duration: 0.3 }}
            className="flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#faa429] text-[11.834px] text-ellipsis text-right"
          >
            <p className="leading-[normal] overflow-hidden">(later)</p>
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
      <div className="flex flex-row items-start size-full">
        <div className="content-stretch flex gap-[11.138px] items-start pl-0 pr-[11.138px] py-0 relative w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.3 }}
            className="relative shrink-0 size-[17.403px]"
            data-name="Tick box"
            style={{ marginTop: '2px' }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4033 17.4033">
              <circle cx="8.70166" cy="8.70166" fill="var(--fill-0, white)" id="Tick box" r="8.00552" stroke="var(--stroke-0, #939393)" strokeWidth="1.39227" />
            </svg>
          </motion.div>
          <div className="flex flex-[1_0_0] flex-col font-['Lato:Bold',sans-serif] justify-center min-h-px min-w-px not-italic overflow-hidden relative text-[#4784F8] text-[11.834px]" style={{ gap: '2px' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.3 }}
            >
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap">Organise family photos</p>
              <p className="leading-[normal] overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '9.4px', fontWeight: 600, fontFamily: "'Lato', sans-serif", color: '#BABABA', marginTop: '2px' }}>No date / time set</p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.7, duration: 0.3 }}
            className="flex flex-col font-['Lato'] font-bold justify-center leading-[0] italic overflow-hidden relative shrink-0 text-[#939393] text-[11.834px] text-ellipsis text-right"
          >
            <p className="leading-[normal] overflow-hidden">(sometime)</p>
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
    <div className="content-stretch flex flex-col gap-[17.5px] items-start overflow-clip relative rounded-[6.961px] size-full" data-name="Reminder list">
      <ReminderLine />
      <ReminderLine1 />
      <ReminderLine2 />
      <ReminderLine3 />
    </div>
  );
}