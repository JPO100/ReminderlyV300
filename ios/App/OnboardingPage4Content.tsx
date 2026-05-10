import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from '@/imports/svg-go2phgsyt4';
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from './tutorialTokens';

export const CALL_DENTIST_TUTORIAL_REMINDER = {
  id: 'tutorial-dentist',
  displayText: 'Call the dentist',
  originalText: 'Call the dentist',
  schedule: { kind: 'scheduled' as const, date: '2026-05-10', time: '14:00' },
  createdAt: Date.now(),
};

export function OnboardingPage4Text() {
  return (
    <div className="content-stretch flex flex-col gap-[27px] [@media(max-height:570px)]:gap-[10px] items-center relative shrink-0">
      <div className="content-stretch flex flex-col items-center relative shrink-0">
        <div className={TUTORIAL_TITLE_CLASSNAME}>
          <p className="block leading-[normal] whitespace-pre-wrap">Access reminder actions</p>
        </div>
      </div>
      <div className={TUTORIAL_BODY_CLASSNAME}>
        <p className="block leading-[normal]">Tap the 3-dot menu to view,<br />edit, or delete a reminder</p>
      </div>
    </div>
  );
}

export function TutorialReminderInfoOverlay({ reminder }: { reminder: typeof CALL_DENTIST_TUTORIAL_REMINDER }) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ pointerEvents: 'none' }}
    >
      <div className="bg-white rounded-[20px] shadow-lg w-[300px] p-6 flex flex-col gap-4">
        <div className="text-[18px] font-semibold text-[#1C2C42]">
          {reminder.displayText}
        </div>
        <div className="text-[14px] text-gray-600">
          Due at {reminder.schedule.kind === 'scheduled' && reminder.schedule.time ? reminder.schedule.time : 'No time set'}
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-[#4784F8] text-white py-3 px-4 rounded-[10px] font-semibold">
            Mark as done
          </button>
          <button className="bg-gray-100 text-[#1C2C42] py-3 px-4 rounded-[10px] font-semibold">
            Edit reminder
          </button>
          <button className="bg-gray-100 text-red-600 py-3 px-4 rounded-[10px] font-semibold">
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface AttentionCircleProps {
  isVisible: boolean;
}

function AttentionCircle({ isVisible }: AttentionCircleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            right: '14px',
            transform: 'translateY(-50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid #4784F8',
            zIndex: 10,
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default function OnboardingPage4Content({
  onOverlayOpenChange,
}: {
  onOverlayOpenChange: (open: boolean) => void;
}) {
  const [circleVisible, setCircleVisible] = useState(false);
  const [throbCount, setThrobCount] = useState(0);

  useEffect(() => {
    // Reset state when component mounts
    setCircleVisible(false);
    setThrobCount(0);

    // Start the throb sequence
    const throbSequence = [
      // First appearance
      { delay: 600, visible: true, count: 1 },
      // First disappearance
      { delay: 1200, visible: false, count: 1 },
      // Second appearance
      { delay: 1800, visible: true, count: 2 },
      // Second disappearance
      { delay: 2400, visible: false, count: 2 },
      // Third appearance
      { delay: 3000, visible: true, count: 3 },
      // Final disappearance before overlay
      { delay: 3600, visible: false, count: 3 },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    throbSequence.forEach(({ delay, visible, count }) => {
      const timeout = setTimeout(() => {
        setCircleVisible(visible);
        setThrobCount(count);
      }, delay);
      timeouts.push(timeout);
    });

    // Open overlay 200ms after final disappearance
    const overlayTimeout = setTimeout(() => {
      onOverlayOpenChange(true);
    }, 3800); // 3600ms (last disappearance) + 200ms delay

    timeouts.push(overlayTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onOverlayOpenChange]);

  return (
    <div className="content-stretch flex flex-col flex-1 min-h-0 gap-[22.334px] items-center pt-[10px] px-[14px] relative w-full">
      {/* Tutorial reminder list */}
      <div className="w-full flex flex-col gap-[14px]">
        {/* Today group */}
        <div className="flex flex-col gap-[8px]">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide px-[4px]">
            Today
          </div>
          <div className="flex flex-col gap-[8px]">
            {/* Pick up milk */}
            <div className="bg-white rounded-[8px] p-[12px] flex items-center justify-between shadow-sm">
              <div className="flex flex-col gap-[2px] flex-1">
                <div className="text-[15px] text-[#1C2C42] font-medium">
                  Pick up milk
                </div>
                <div className="text-[12px] text-gray-500">
                  Today at 10:00
                </div>
              </div>
              <div className="w-[20px] h-[20px] rounded-full border-2 border-gray-300" />
            </div>
            
            {/* Call the dentist - with attention circle */}
            <div className="bg-white rounded-[8px] p-[12px] flex items-center justify-between shadow-sm relative">
              <div className="flex flex-col gap-[2px] flex-1">
                <div className="text-[15px] text-[#1C2C42] font-medium">
                  Call the dentist
                </div>
                <div className="text-[12px] text-gray-500">
                  Today at 14:00
                </div>
              </div>
              <div className="relative">
                <button className="w-[28px] h-[28px] flex items-center justify-center">
                  <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="2" fill="#666" />
                    <circle cx="2" cy="8" r="2" fill="#666" />
                    <circle cx="2" cy="14" r="2" fill="#666" />
                  </svg>
                </button>
                <AttentionCircle isVisible={circleVisible} />
              </div>
            </div>
          </div>
        </div>

        {/* This week group */}
        <div className="flex flex-col gap-[8px]">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide px-[4px]">
            This week
          </div>
          <div className="bg-white rounded-[8px] p-[12px] flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-[2px] flex-1">
              <div className="text-[15px] text-[#1C2C42] font-medium">
                Pay credit card
              </div>
              <div className="text-[12px] text-gray-500">
                Wed 14 May • Repeats monthly
              </div>
            </div>
            <div className="w-[20px] h-[20px] rounded-full border-2 border-gray-300" />
          </div>
        </div>

        {/* Later group */}
        <div className="flex flex-col gap-[8px]">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide px-[4px]">
            Later
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="bg-white rounded-[8px] p-[12px] flex items-center justify-between shadow-sm">
              <div className="flex flex-col gap-[2px] flex-1">
                <div className="text-[15px] text-[#1C2C42] font-medium">
                  Submit expenses
                </div>
                <div className="text-[12px] text-gray-500">
                  Fri 16 May
                </div>
              </div>
              <div className="w-[20px] h-[20px] rounded-full border-2 border-gray-300" />
            </div>
            <div className="bg-white rounded-[8px] p-[12px] flex items-center justify-between shadow-sm">
              <div className="flex flex-col gap-[2px] flex-1">
                <div className="text-[15px] text-[#1C2C42] font-medium">
                  Put the bins out
                </div>
                <div className="text-[12px] text-gray-500">
                  Mon 19 May • Repeats weekly
                </div>
              </div>
              <div className="w-[20px] h-[20px] rounded-full border-2 border-gray-300" />
            </div>
          </div>
        </div>

        {/* Sometime group */}
        <div className="flex flex-col gap-[8px]">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide px-[4px]">
            Sometime
          </div>
          <div className="bg-white rounded-[8px] p-[12px] flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-[2px] flex-1">
              <div className="text-[15px] text-[#1C2C42] font-medium">
                Organise family photo
              </div>
              <div className="text-[12px] text-gray-500">
                No schedule set
              </div>
            </div>
            <div className="w-[20px] h-[20px] rounded-full border-2 border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
