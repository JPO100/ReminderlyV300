import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import svgPaths from '@/imports/svg-go2phgsyt4';
import ListsHeader from '@/imports/Header';
import OnboardingPage1Content, { OnboardingPage1Text } from '@/app/components/OnboardingPage1Content';
import OnboardingPage2Content, { OnboardingPage2Text } from '@/app/components/OnboardingPage2Content';
import { useOnboardingPage2ActiveFilter } from '@/app/components/OnboardingPage2Content';
import OnboardingPage3Content, {
  CALL_DENTIST_TUTORIAL_REMINDER,
  OnboardingPage3Text,
  TUTORIAL_ATTENTION_RECYCLE_DELAY,
  TUTORIAL_ATTENTION_SEQUENCE_DELAY,
  TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE,
  TUTORIAL_ATTENTION_THROB_DELAY,
  TUTORIAL_ATTENTION_THROB_DURATION,
  TUTORIAL_ATTENTION_THROB_TIMES,
  TUTORIAL_OVERLAY_SOURCE_WIDTH,
  TutorialReminderInfoOverlay,
} from '@/app/components/OnboardingPage3Content';
import OnboardingPage4Content, { OnboardingPage4Text } from '@/app/components/OnboardingPage4Content';
import OnboardingPage5Content, { OnboardingPage5Text, PAGE_5_HIGHLIGHT_SEQUENCE_DELAY, PAGE_5_INITIAL_PAUSE_DELAY, PAGE_5_STATE_PAUSE_DELAY } from '@/app/components/OnboardingPage5Content';
import OnboardingPage6Content, { OnboardingPage6Text } from '@/app/components/OnboardingPage6Content';
import { TUTORIAL_BODY_CLASSNAME, TUTORIAL_TITLE_CLASSNAME } from '@/app/components/tutorialTokens';
import TutorialPhoneShell from '@/app/components/TutorialPhoneShell';
import TutorialStaticReminderList, { TUTORIAL_PAGE_2_DONE_LIST_IDS, TUTORIAL_REMINDER_LIST_SCALE } from '@/app/components/TutorialStaticReminderList';
import AddListItemInput from '@/app/components/lists/AddListItemInput';
import EditableListItem from '@/app/components/lists/EditableListItem';
import InfoOverlay from '@/imports/InfoOverlay';
import TutorialReminderFilters, {
  GROUPED_TUTORIAL_LIST_FILTER_ITEMS,
  SAVED_LISTS_TUTORIAL_FILTER_ITEMS,
  type TutorialFilterKey,
  UNGROUPED_TUTORIAL_FILTER_ITEMS,
  UNGROUPED_TUTORIAL_LIST_FILTER_ITEMS,
} from '@/app/components/TutorialReminderFilters';
import type { FiltersMenuVariant } from '../reminder-utils';

interface TutorialOnboardingContentProps {
  onComplete: () => void;
  filtersMenuVariant: FiltersMenuVariant;
  variant: 'reminders' | 'lists';
  isListsEnabled: boolean;
  settingsMenuEnabled: boolean;
  savedListsEnabled: boolean;
}

const LIST_TUTORIAL_TOTAL_PAGES = 7;
const REMINDER_TUTORIAL_BASE_TOTAL_PAGES = 5;
const REMINDER_TUTORIAL_SETTINGS_TOTAL_PAGES = 6;
const REMINDERLY_DARK_BLUE = "#1C2C42";
const REMINDERLY_LIGHT_BLUE = "#4784F8";
const TUTORIAL_PHONE_GAP_TOP_CLASSNAME = "mt-[35px]";
const TUTORIAL_PHONE_GAP_BOTTOM_CLASSNAME = "pb-[45px]";
const TUTORIAL_LIST_OVERLAY_TOP = 11 + 5.026 + 65 - 2;
const LISTS_PAGE_3_TARGET_LIST_ID = "list-2";
const LISTS_PAGE_3_OPEN_ITEMS = [
  { id: "work-1", text: "Send invoice", completed: false },
  { id: "work-2", text: "Review notes", completed: false },
  { id: "work-3", text: "Book meeting", completed: false },
  { id: "work-4", text: "Update roadmap", completed: false },
  { id: "work-5", text: "Reply to Alex", completed: false },
] as const;
const LISTS_PAGE_3_DEMO_ITEM = "Prepare update";
const LISTS_PAGE_3_DEMO_ITEM_ID = "work-prepare-update";
const LISTS_PAGE_3_ADD_INPUT_DELAY = 2000;
const LISTS_PAGE_3_TYPING_STEP_DELAY = 80;
const LISTS_PAGE_3_ADD_HIGHLIGHT_CIRCLE_SIZE = 50;
const LISTS_PAGE_3_POST_ADD_PAUSE_DELAY = 2000;
const LISTS_PAGE_3_SETTINGS_OVERLAY_VISUAL_WIDTH = 280;
const LISTS_PAGE_3_SETTINGS_OVERLAY_SCALE = LISTS_PAGE_3_SETTINGS_OVERLAY_VISUAL_WIDTH / TUTORIAL_OVERLAY_SOURCE_WIDTH;
const LIST_ITEM_INSERT_HIGHLIGHT_MS = 1000;

function TemplatesTutorialButton() {
  return (
    <div className="bg-[#1C2C42] content-stretch flex items-center justify-center px-[11.487px] h-[28.718px] relative rounded-[71.795px] shrink-0">
      <div className="content-stretch flex items-center justify-center gap-[5.744px] relative">
        <div className="font-['Lato',sans-serif] font-bold text-[10.051px] text-white whitespace-nowrap">
          Templates
        </div>
        <svg className="block shrink-0" width="5" height="7" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1.72101 0.269035C1.34568 -0.0896783 0.737045 -0.0896783 0.361708 0.269035C-0.0135638 0.627741 -0.0135771 1.20921 0.361708 1.56791L3.91284 4.96154L0.281458 8.43209C-0.0938212 8.79079 -0.0938182 9.37226 0.281458 9.73096C0.656796 10.0897 1.26543 10.0897 1.64076 9.73096L5.80081 5.75517C5.86027 5.71933 5.91677 5.67686 5.96858 5.62735C6.34382 5.26866 6.3438 4.68717 5.96858 4.32847L1.72101 0.269035Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
}

function Page5DoneDeletedFilters() {
  return (
    <div className="relative shrink-0 w-full px-[14px] pt-[14px] pb-[8px]">
      <div className="flex items-center justify-between gap-[10px]">
        <div className="flex items-center gap-[8px]">
          <div
            className="bg-white content-stretch flex items-center justify-center px-[11.144px] h-[28px] relative rounded-[69.652px] shrink-0"
            style={{ boxShadow: "inset 0 0 0 1.392px #1C2C42", color: "#1C2C42" }}
          >
            <div className="font-['Lato',sans-serif] font-bold text-[9.751px] whitespace-nowrap">
              Done
            </div>
          </div>
          <div
            className="content-stretch flex items-center justify-center px-[11.144px] h-[28px] relative rounded-[69.652px] shrink-0"
            style={{ boxShadow: "inset 0 0 0 0.696px #898989", color: "#898989" }}
          >
            <div className="font-['Lato',sans-serif] font-bold text-[9.751px] whitespace-nowrap">
              Deleted
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center justify-center h-[28px] w-[66px] relative rounded-[69.652px] shrink-0 border border-solid border-[#1C2C42] text-[#1C2C42]">
          <div className="font-['Lato',sans-serif] font-bold text-[9.751px] whitespace-nowrap">
            Clear all
          </div>
        </div>
      </div>
    </div>
  );
}

function ListsTutorialOpenListOverlay({ open }: { open: boolean }) {
  const [items, setItems] = useState(LISTS_PAGE_3_OPEN_ITEMS.map((item) => ({ ...item })));
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [showAddHighlight, setShowAddHighlight] = useState(false);
  const [addButtonElement, setAddButtonElement] = useState<HTMLButtonElement | null>(null);
  const [addHighlightHostElement, setAddHighlightHostElement] = useState<HTMLDivElement | null>(null);
  const [addButtonRect, setAddButtonRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [openPanelElement, setOpenPanelElement] = useState<HTMLDivElement | null>(null);
  const [menuDotsRect, setMenuDotsRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [showMenuDotsHighlight, setShowMenuDotsHighlight] = useState(false);
  const [showSettingsOverlay, setShowSettingsOverlay] = useState(false);
  const [reinsertedItemId, setReinsertedItemId] = useState<string | null>(null);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const completedCount = items.filter((item) => item.completed).length;

  useEffect(() => {
    if (!open) {
      setItems(LISTS_PAGE_3_OPEN_ITEMS.map((item) => ({ ...item })));
      setInputValue("");
      setInputFocused(false);
      setShowAddHighlight(false);
      setShowMenuDotsHighlight(false);
      setShowSettingsOverlay(false);
      setReinsertedItemId(null);
      setHighlightedItemId(null);
      return;
    }

    const timers: number[] = [];
    let cancelled = false;

    setItems(LISTS_PAGE_3_OPEN_ITEMS.map((item) => ({ ...item })));
    setInputValue("");
    setInputFocused(false);
    setShowAddHighlight(false);
    setShowMenuDotsHighlight(false);
    setShowSettingsOverlay(false);
    setReinsertedItemId(null);
    setHighlightedItemId(null);

    const inputTimer = window.setTimeout(() => {
      if (cancelled) {
        return;
      }

      setInputFocused(true);
      LISTS_PAGE_3_DEMO_ITEM.split("").forEach((_, index) => {
        const typingTimer = window.setTimeout(() => {
          if (cancelled) {
            return;
          }

          setInputValue(LISTS_PAGE_3_DEMO_ITEM.slice(0, index + 1));
        }, index * LISTS_PAGE_3_TYPING_STEP_DELAY);
        timers.push(typingTimer);
      });

      const highlightTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setShowAddHighlight(true);
      }, LISTS_PAGE_3_DEMO_ITEM.length * LISTS_PAGE_3_TYPING_STEP_DELAY);
      timers.push(highlightTimer);

      const addTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setShowAddHighlight(false);
        setInputFocused(false);
        setInputValue("");
        setItems((currentItems) => [
          { id: LISTS_PAGE_3_DEMO_ITEM_ID, text: LISTS_PAGE_3_DEMO_ITEM, completed: false },
          ...currentItems.filter((item) => item.id !== LISTS_PAGE_3_DEMO_ITEM_ID),
        ]);
        setReinsertedItemId(LISTS_PAGE_3_DEMO_ITEM_ID);
        setHighlightedItemId(LISTS_PAGE_3_DEMO_ITEM_ID);

        const clearHighlightTimer = window.setTimeout(() => {
          if (cancelled) {
            return;
          }
          setHighlightedItemId(null);
        }, LIST_ITEM_INSERT_HIGHLIGHT_MS);
        timers.push(clearHighlightTimer);

        const menuHighlightTimer = window.setTimeout(() => {
          if (cancelled) {
            return;
          }
          setShowMenuDotsHighlight(true);
        }, LISTS_PAGE_3_POST_ADD_PAUSE_DELAY);
        timers.push(menuHighlightTimer);

        const settingsOverlayTimer = window.setTimeout(() => {
          if (cancelled) {
            return;
          }
          setShowMenuDotsHighlight(false);
          setShowSettingsOverlay(true);
        }, LISTS_PAGE_3_POST_ADD_PAUSE_DELAY + TUTORIAL_ATTENTION_SEQUENCE_DELAY);
        timers.push(settingsOverlayTimer);
      }, LISTS_PAGE_3_DEMO_ITEM.length * LISTS_PAGE_3_TYPING_STEP_DELAY + TUTORIAL_ATTENTION_SEQUENCE_DELAY);
      timers.push(addTimer);
    }, LISTS_PAGE_3_ADD_INPUT_DELAY);
    timers.push(inputTimer);

    return () => {
      cancelled = true;
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [open]);

  useEffect(() => {
    if (!addButtonElement || !addHighlightHostElement) {
      setAddButtonRect(null);
      return;
    }

    const updateRect = () => {
      const targetRect = addButtonElement.getBoundingClientRect();
      const parentRect = addHighlightHostElement.getBoundingClientRect();
      setAddButtonRect({
        left: (targetRect.left - parentRect.left) / TUTORIAL_REMINDER_LIST_SCALE,
        top: (targetRect.top - parentRect.top) / TUTORIAL_REMINDER_LIST_SCALE,
        width: targetRect.width / TUTORIAL_REMINDER_LIST_SCALE,
        height: targetRect.height / TUTORIAL_REMINDER_LIST_SCALE,
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
    };
  }, [addButtonElement, addHighlightHostElement]);

  useEffect(() => {
    if (!openPanelElement || !addHighlightHostElement) {
      setMenuDotsRect(null);
      return;
    }

    const updateRect = () => {
      const menuButton = openPanelElement.querySelector('[data-name="menu-dots-btn"]');
      if (!(menuButton instanceof HTMLElement)) {
        setMenuDotsRect(null);
        return;
      }

      const targetRect = menuButton.getBoundingClientRect();
      const parentRect = addHighlightHostElement.getBoundingClientRect();
      setMenuDotsRect({
        left: (targetRect.left - parentRect.left) / TUTORIAL_REMINDER_LIST_SCALE,
        top: (targetRect.top - parentRect.top) / TUTORIAL_REMINDER_LIST_SCALE,
        width: targetRect.width / TUTORIAL_REMINDER_LIST_SCALE,
        height: targetRect.height / TUTORIAL_REMINDER_LIST_SCALE,
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
    };
  }, [openPanelElement, addHighlightHostElement]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-40 bg-black/0"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0, top: TUTORIAL_LIST_OVERLAY_TOP }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute left-0 right-0 z-50 mx-auto w-full"
            style={{ bottom: 0 }}
          >
            <motion.div
              className="bg-white relative rounded-tl-[15px] rounded-tr-[15px]"
              style={{
                width: `${100 / TUTORIAL_REMINDER_LIST_SCALE}%`,
                height: `${100 / TUTORIAL_REMINDER_LIST_SCALE}%`,
                transform: `scale(${TUTORIAL_REMINDER_LIST_SCALE})`,
                transformOrigin: "top center",
                left: "50%",
                translate: "-50% 0",
              }}
            >
              <div ref={setOpenPanelElement} className="relative w-full h-full flex flex-col mx-auto">
                <div
                  ref={setAddHighlightHostElement}
                  className="content-stretch flex flex-col gap-[30px] items-start pt-[30px] px-[24px] relative w-full shrink-0"
                >
                  <ListsHeader
                    value="Work tasks"
                    onChange={() => {}}
                    active
                    isEditMode
                    onSubmit={() => {}}
                    onClose={() => {}}
                    subtitleText={`${completedCount} of ${items.length}`}
                    showMenuButton
                  />
                  <AddListItemInput
                    isEmpty={false}
                    accentColor="#9468D5"
                    idleCircleColor="#D9D9D9"
                    nextPlaceholder="Add your next item..."
                    demoValue={inputValue}
                    demoFocused={inputFocused}
                    onAddButtonElementChange={setAddButtonElement}
                  />
                  {showAddHighlight && addButtonRect && (
                    <motion.div
                      className="absolute z-10 pointer-events-none"
                      style={{
                        left: addButtonRect.left + (addButtonRect.width / 2) - (LISTS_PAGE_3_ADD_HIGHLIGHT_CIRCLE_SIZE / 2),
                        top: addButtonRect.top + (addButtonRect.height / 2) - (LISTS_PAGE_3_ADD_HIGHLIGHT_CIRCLE_SIZE / 2),
                        width: LISTS_PAGE_3_ADD_HIGHLIGHT_CIRCLE_SIZE,
                        height: LISTS_PAGE_3_ADD_HIGHLIGHT_CIRCLE_SIZE,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0, 0, 1, 0, 0, 1, 0],
                      }}
                      transition={{
                        duration: TUTORIAL_ATTENTION_THROB_DURATION,
                        delay: TUTORIAL_ATTENTION_THROB_DELAY,
                        times: TUTORIAL_ATTENTION_THROB_TIMES,
                        ease: "easeInOut",
                      }}
                    >
                      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <circle cx="25" cy="25" r="23.5" stroke="#1C2C42" strokeWidth="3" />
                      </svg>
                    </motion.div>
                  )}
                  {showMenuDotsHighlight && menuDotsRect && (
                    <motion.div
                      className="absolute z-10 pointer-events-none"
                      style={{
                        left: menuDotsRect.left + (menuDotsRect.width / 2) - (TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE / 2),
                        top: menuDotsRect.top + (menuDotsRect.height / 2) - (TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE / 2),
                        width: TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE,
                        height: TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0, 0, 1, 0, 0, 1, 0],
                      }}
                      transition={{
                        duration: TUTORIAL_ATTENTION_THROB_DURATION,
                        delay: TUTORIAL_ATTENTION_THROB_DELAY,
                        times: TUTORIAL_ATTENTION_THROB_TIMES,
                        ease: "easeInOut",
                      }}
                    >
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <circle cx="17.5" cy="17.5" r="16" stroke="#1C2C42" strokeWidth="3" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                <div className="flex flex-col gap-[23px] items-start px-[24px] pb-[24px] relative w-full flex-1 min-h-0 overflow-y-auto mt-[35px]">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const isItemReinserted = reinsertedItemId === item.id;
                      const isItemHighlighted = highlightedItemId === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          layout="position"
                          initial={isItemReinserted ? { opacity: 0 } : false}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={isItemReinserted
                            ? { opacity: { duration: 0.2 }, layout: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 } }
                            : { layout: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 } }
                          }
                          onAnimationComplete={() => {
                            if (isItemReinserted) {
                              setReinsertedItemId(null);
                            }
                          }}
                          className="w-full"
                        >
                          <EditableListItem
                            name={item.text}
                            completed={item.completed}
                            isHighlighted={isItemHighlighted}
                            accentColor="#9468D5"
                            editable
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
          {showSettingsOverlay && (
            <div className="absolute inset-0 z-[60] flex items-start justify-center bg-black/50 pt-[40px]">
              <div
                className="pointer-events-none"
                style={{
                  width: TUTORIAL_OVERLAY_SOURCE_WIDTH,
                  transform: "scale(0.5)",
                  transformOrigin: "center center",
                  border: "4px solid red",
                }}
              >
                <div className="bg-red-600 px-[8px] py-[4px] text-center font-['Lato',sans-serif] text-[12px] font-bold text-white">
                  DEBUG WORK TASKS SETTINGS OVERLAY
                </div>
                <InfoOverlay
                  sortMode="insertion"
                  onSortChange={() => {}}
                  listTitle="Work tasks"
                  onUncheckAll={() => {}}
                  onCreateTemplate={() => {}}
                  createTemplateStage="idle"
                  onDelete={() => {}}
                  allUnchecked
                  smartReminders={false}
                  onSmartRemindersChange={() => {}}
                  showSmartReminders={false}
                  smartReminderDueDate={null}
                  smartReminderTime={null}
                  onSetSmartReminderDueDate={() => {}}
                />
              </div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

function ListsTutorialPlaceholderPage({
  filtersMenuVariant,
  currentPage,
  settingsMenuEnabled,
  savedListsEnabled,
  activeFilter,
  onActiveFilterChange,
  page2CycleKey,
  page2Phase,
  page2ShowLogoHighlight,
  page2ShowDoneLists,
  onPage2DoneSequenceComplete,
}: {
  filtersMenuVariant: FiltersMenuVariant;
  currentPage: number;
  settingsMenuEnabled: boolean;
  savedListsEnabled: boolean;
  activeFilter?: TutorialFilterKey;
  onActiveFilterChange?: (activeFilter: TutorialFilterKey | undefined) => void;
  page2CycleKey: number;
  page2Phase: "marking" | "done-list";
  page2ShowLogoHighlight: boolean;
  page2ShowDoneLists: boolean;
  onPage2DoneSequenceComplete: () => void;
}) {
  const [page3TargetElement, setPage3TargetElement] = useState<HTMLDivElement | null>(null);
  const [page3TargetRect, setPage3TargetRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [page3ShowHighlight, setPage3ShowHighlight] = useState(false);
  const [page3ListOpen, setPage3ListOpen] = useState(false);
  const listFilterItems =
    savedListsEnabled
      ? SAVED_LISTS_TUTORIAL_FILTER_ITEMS
      : filtersMenuVariant === 'grouped'
      ? GROUPED_TUTORIAL_LIST_FILTER_ITEMS
      : UNGROUPED_TUTORIAL_LIST_FILTER_ITEMS;
  const displayActiveFilter: TutorialFilterKey | undefined =
    currentPage === 0 && !savedListsEnabled && filtersMenuVariant === 'grouped'
      ? activeFilter === 'todo'
        ? 'grouped-todo'
        : activeFilter === 'started'
        ? 'almost'
        : activeFilter
      : activeFilter;

  useEffect(() => {
    if (currentPage !== 2) {
      setPage3ShowHighlight(false);
      setPage3ListOpen(false);
      return;
    }

    const timers: number[] = [];
    let cancelled = false;

    const startCycle = () => {
      if (cancelled) {
        return;
      }

      setPage3ListOpen(false);
      setPage3ShowHighlight(true);

      const openTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setPage3ShowHighlight(false);
        setPage3ListOpen(true);
      }, TUTORIAL_ATTENTION_SEQUENCE_DELAY);
      timers.push(openTimer);
    };

    startCycle();

    return () => {
      cancelled = true;
      timers.forEach((timer) => clearTimeout(timer));
      setPage3ShowHighlight(false);
      setPage3ListOpen(false);
    };
  }, [currentPage]);

  useEffect(() => {
    if (!page3TargetElement) {
      setPage3TargetRect(null);
      return;
    }

    const updateRect = () => {
      const parent = page3TargetElement.offsetParent;
      if (!(parent instanceof HTMLElement)) {
        setPage3TargetRect(null);
        return;
      }

      const targetRect = page3TargetElement.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      setPage3TargetRect({
        left: targetRect.left - parentRect.left,
        top: targetRect.top - parentRect.top,
        width: targetRect.width,
        height: targetRect.height,
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("resize", updateRect);
    };
  }, [page3TargetElement]);

  return (
    <div className="content-stretch flex h-full w-full flex-col items-center min-h-0">
      <div className="flex w-full flex-col items-center gap-[16px]">
        <div className={TUTORIAL_TITLE_CLASSNAME}>
          <p className="block leading-[normal] whitespace-pre-wrap">
            {currentPage === 0 ? "A tour of lists" : currentPage === 1 ? "Manage completed lists" : "Setting title"}
          </p>
        </div>
        <div className={TUTORIAL_BODY_CLASSNAME}>
          {currentPage === 0 ? (
            <p className="block leading-[normal]">Lists are grouped by colour and<br />filtered in the same way as reminders</p>
          ) : currentPage === 1 ? (
            <p className="block leading-[normal]">Move finished lists to done<br />and view completed lists</p>
          ) : (
            <p className="block leading-[normal]">Setting subtitle</p>
          )}
        </div>
      </div>
      <div className={`flex min-h-0 flex-1 items-center justify-center w-full ${TUTORIAL_PHONE_GAP_TOP_CLASSNAME} ${TUTORIAL_PHONE_GAP_BOTTOM_CLASSNAME}`}>
        <TutorialPhoneShell
          activeMainTab="lists"
          showHeaderMenu={settingsMenuEnabled}
          headerProps={{
            logoTickHighlight: currentPage === 1 && page2ShowLogoHighlight,
            logoTickDone: currentPage === 1 && page2ShowDoneLists,
          }}
          listsLabel={currentPage === 1 && page2ShowDoneLists ? "Done lists" : undefined}
          filterRow={currentPage === 1 && page2ShowDoneLists ? (
            <Page5DoneDeletedFilters />
          ) : (
            <TutorialReminderFilters
              items={listFilterItems}
              showSettings={!savedListsEnabled && filtersMenuVariant === 'grouped'}
              trailing={savedListsEnabled ? <TemplatesTutorialButton /> : undefined}
              layout={savedListsEnabled || filtersMenuVariant === 'grouped' ? 'inline' : 'between'}
              rowGapClassName={savedListsEnabled || filtersMenuVariant === 'grouped' ? 'gap-[12.923px]' : 'gap-[10px]'}
              groupGapClassName="gap-[8.615px]"
              activeKey={currentPage === 0 ? displayActiveFilter : undefined}
            />
          )}
          overlay={currentPage === 2 ? <ListsTutorialOpenListOverlay open={page3ListOpen} /> : undefined}
        >
          <div className="content-stretch flex flex-col flex-1 min-h-0 gap-[22.334px] items-center pt-[10px] px-[14px] relative w-full">
            <TutorialStaticReminderList
              key={currentPage === 1 ? `lists-page-2-${page2CycleKey}` : "lists-static"}
              mode="lists"
              page1BuildSequence={currentPage === 0}
              page3DoneSequence={currentPage === 1 && page2Phase === "marking"}
              page3DoneSequenceCycle={currentPage !== 1}
              doneReminderIds={currentPage === 1 && page2ShowDoneLists ? TUTORIAL_PAGE_2_DONE_LIST_IDS : undefined}
              activeFilter={currentPage === 0 ? activeFilter : undefined}
              onListFilterChange={currentPage === 0 ? onActiveFilterChange : undefined}
              onPage3DoneSequenceComplete={currentPage === 1 ? onPage2DoneSequenceComplete : undefined}
              rowTargetListId={currentPage === 2 ? LISTS_PAGE_3_TARGET_LIST_ID : undefined}
              onRowTargetElementChange={currentPage === 2 ? setPage3TargetElement : undefined}
            />
            {currentPage === 2 && page3ShowHighlight && page3TargetRect && (
              <motion.div
                className="absolute z-10 pointer-events-none"
                style={{
                  left: page3TargetRect.left + (page3TargetRect.width / 2) - (TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE / 2) - 40,
                  top: page3TargetRect.top + (page3TargetRect.height / 2) - (TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE / 2) + 10,
                  width: TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE,
                  height: TUTORIAL_ATTENTION_TARGET_CIRCLE_SIZE,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0, 0, 1, 0, 0, 1, 0],
                }}
                transition={{
                  duration: TUTORIAL_ATTENTION_THROB_DURATION,
                  delay: TUTORIAL_ATTENTION_THROB_DELAY,
                  times: TUTORIAL_ATTENTION_THROB_TIMES,
                  ease: "easeInOut",
                }}
              >
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
                  <circle cx="17.5" cy="17.5" r="16" stroke="#1C2C42" strokeWidth="3" />
                </svg>
              </motion.div>
            )}
          </div>
        </TutorialPhoneShell>
      </div>
    </div>
  );
}

export default function TutorialOnboardingContent({ onComplete, filtersMenuVariant, variant, isListsEnabled: _isListsEnabled, settingsMenuEnabled, savedListsEnabled }: TutorialOnboardingContentProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const isListsTutorial = variant === 'lists';
  const page2ActiveFilter = useOnboardingPage2ActiveFilter(!isListsTutorial && currentPage === 1);
  const [listsTutorialActiveFilter, setListsTutorialActiveFilter] = useState<TutorialFilterKey | undefined>(undefined);
  const [listsPage2CycleKey, setListsPage2CycleKey] = useState(0);
  const [listsPage2Phase, setListsPage2Phase] = useState<"marking" | "done-list">("marking");
  const [listsPage2ShowLogoHighlight, setListsPage2ShowLogoHighlight] = useState(false);
  const [listsPage2ShowDoneLists, setListsPage2ShowDoneLists] = useState(false);
  const [page3ShowOverlay, setPage3ShowOverlay] = useState(false);
  const [page5ShowLogoHighlight, setPage5ShowLogoHighlight] = useState(false);
  const [page5ShowDoneReminders, setPage5ShowDoneReminders] = useState(false);
  const totalPages = isListsTutorial
    ? LIST_TUTORIAL_TOTAL_PAGES
    : settingsMenuEnabled
    ? REMINDER_TUTORIAL_SETTINGS_TOTAL_PAGES
    : REMINDER_TUTORIAL_BASE_TOTAL_PAGES;

  useEffect(() => {
    if (isListsTutorial || currentPage !== 2) {
      setPage3ShowOverlay(false);
    }
  }, [currentPage, isListsTutorial]);

  useEffect(() => {
    if (isListsTutorial || currentPage !== 4) {
      setPage5ShowLogoHighlight(false);
      setPage5ShowDoneReminders(false);
    }
  }, [currentPage, isListsTutorial]);

  useEffect(() => {
    if (!isListsTutorial || currentPage !== 0) {
      setListsTutorialActiveFilter(undefined);
    }
  }, [currentPage, isListsTutorial]);

  useEffect(() => {
    if (!isListsTutorial || currentPage !== 1) {
      setListsPage2Phase("marking");
      setListsPage2ShowLogoHighlight(false);
      setListsPage2ShowDoneLists(false);
    }
  }, [currentPage, isListsTutorial]);

  useEffect(() => {
    if (!isListsTutorial || currentPage !== 1 || listsPage2Phase !== "done-list") {
      return;
    }

    const timers: number[] = [];
    let cancelled = false;

    setListsPage2ShowLogoHighlight(false);
    setListsPage2ShowDoneLists(false);

    const mainPauseTimer = window.setTimeout(() => {
      if (cancelled) {
        return;
      }

      setListsPage2ShowLogoHighlight(true);

      const openDoneTimer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setListsPage2ShowLogoHighlight(false);
        setListsPage2ShowDoneLists(true);

        const donePauseTimer = window.setTimeout(() => {
          if (cancelled) {
            return;
          }

          setListsPage2ShowLogoHighlight(true);

          const closeDoneTimer = window.setTimeout(() => {
            if (cancelled) {
              return;
            }

            setListsPage2ShowLogoHighlight(false);
            setListsPage2ShowDoneLists(false);

            const restartTimer = window.setTimeout(() => {
              if (cancelled) {
                return;
              }

              setListsPage2Phase("marking");
              setListsPage2CycleKey((value) => value + 1);
            }, PAGE_5_STATE_PAUSE_DELAY);
            timers.push(restartTimer);
          }, PAGE_5_HIGHLIGHT_SEQUENCE_DELAY);
          timers.push(closeDoneTimer);
        }, PAGE_5_STATE_PAUSE_DELAY);
        timers.push(donePauseTimer);
      }, PAGE_5_HIGHLIGHT_SEQUENCE_DELAY);
      timers.push(openDoneTimer);
    }, PAGE_5_INITIAL_PAUSE_DELAY);
    timers.push(mainPauseTimer);

    return () => {
      cancelled = true;
      timers.forEach((timer) => clearTimeout(timer));
      setListsPage2ShowLogoHighlight(false);
      setListsPage2ShowDoneLists(false);
    };
  }, [currentPage, isListsTutorial, listsPage2Phase]);

  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, totalPages]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRestart = () => {
    setCurrentPage(0);
  };

  const handleListsPage2DoneSequenceComplete = useCallback(() => {
    setListsPage2Phase("done-list");
  }, []);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const activePaginationColor = isListsTutorial ? REMINDERLY_DARK_BLUE : REMINDERLY_LIGHT_BLUE;
  const nextButtonColor = isListsTutorial ? REMINDERLY_DARK_BLUE : "#4784f8";
  const paginationWidth = 115.542;
  const paginationDotRadius = 3.96729;
  const paginationDotSpacing = 17.93461;
  const paginationDotsWidth = (totalPages - 1) * paginationDotSpacing + paginationDotRadius * 2;
  const paginationStartX = (paginationWidth - paginationDotsWidth) / 2 + paginationDotRadius;

  return (
    <div
      data-testid="onboarding-root"
      className="bg-white flex flex-col h-full [@media(max-height:570px)]:!h-full [@media(max-height:570px)]:!pb-0"
      style={{
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        paddingLeft: 'clamp(16px, 5vw, 40px)',
        paddingRight: 'clamp(16px, 5vw, 40px)',
        paddingTop: '34px',
        paddingBottom: '34px',
      }}
    >
      <div className="flex-1 [@media(max-height:570px)]:flex-none relative overflow-hidden">
        {!isListsTutorial && currentPage === 0 && (
          <div className="content-stretch flex flex-col items-center relative w-full h-full min-h-0">
            <OnboardingPage1Text />
            <div className={`flex min-h-0 flex-1 items-center justify-center w-full ${TUTORIAL_PHONE_GAP_TOP_CLASSNAME} ${TUTORIAL_PHONE_GAP_BOTTOM_CLASSNAME}`}>
              <TutorialPhoneShell
                activeMainTab="reminders"
                showHeaderMenu={settingsMenuEnabled}
                filterRow={
                  <TutorialReminderFilters
                    items={UNGROUPED_TUTORIAL_FILTER_ITEMS}
                    showHiddenItems
                  />
                }
              >
                <OnboardingPage1Content />
              </TutorialPhoneShell>
            </div>
          </div>
        )}
        
        {!isListsTutorial && currentPage === 1 && (
          <div className="content-stretch flex flex-col items-center relative w-full h-full min-h-0">
            <OnboardingPage2Text />
            <div className={`flex min-h-0 flex-1 items-center justify-center w-full ${TUTORIAL_PHONE_GAP_TOP_CLASSNAME} ${TUTORIAL_PHONE_GAP_BOTTOM_CLASSNAME}`}>
              <TutorialPhoneShell
                activeMainTab="reminders"
                showHeaderMenu={settingsMenuEnabled}
                filterRow={
                  <TutorialReminderFilters
                    items={UNGROUPED_TUTORIAL_FILTER_ITEMS}
                    activeKey={page2ActiveFilter}
                    showHiddenItems
                  />
                }
              >
                <OnboardingPage2Content activeFilter={page2ActiveFilter} />
              </TutorialPhoneShell>
            </div>
          </div>
        )}
        
        {!isListsTutorial && currentPage === 2 && (
          <div className="content-stretch flex flex-col items-center relative w-full h-full min-h-0">
            <OnboardingPage3Text />
            <div className={`flex min-h-0 flex-1 items-center justify-center w-full ${TUTORIAL_PHONE_GAP_TOP_CLASSNAME} ${TUTORIAL_PHONE_GAP_BOTTOM_CLASSNAME}`}>
              <TutorialPhoneShell
                activeMainTab="reminders"
                showHeaderMenu={settingsMenuEnabled}
                overlay={page3ShowOverlay ? <TutorialReminderInfoOverlay reminder={CALL_DENTIST_TUTORIAL_REMINDER} /> : undefined}
                filterRow={
                  <TutorialReminderFilters
                    items={UNGROUPED_TUTORIAL_FILTER_ITEMS}
                    showHiddenItems
                  />
                }
              >
                <OnboardingPage3Content onOverlayOpenChange={setPage3ShowOverlay} />
              </TutorialPhoneShell>
            </div>
          </div>
        )}

        {!isListsTutorial && currentPage === 3 && (
          <div className="content-stretch flex flex-col items-center relative w-full h-full min-h-0">
            <OnboardingPage4Text />
            <div className={`flex min-h-0 flex-1 items-center justify-center w-full ${TUTORIAL_PHONE_GAP_TOP_CLASSNAME} ${TUTORIAL_PHONE_GAP_BOTTOM_CLASSNAME}`}>
              <TutorialPhoneShell
                activeMainTab="reminders"
                showHeaderMenu={settingsMenuEnabled}
                filterRow={
                  <TutorialReminderFilters
                    items={UNGROUPED_TUTORIAL_FILTER_ITEMS}
                    showHiddenItems
                  />
                }
              >
                <OnboardingPage4Content />
              </TutorialPhoneShell>
            </div>
          </div>
        )}
        
        {!isListsTutorial && currentPage === 4 && (
          <div className="content-stretch flex flex-col items-center relative w-full h-full min-h-0">
            <OnboardingPage5Text />
            <div className={`flex min-h-0 flex-1 items-center justify-center w-full ${TUTORIAL_PHONE_GAP_TOP_CLASSNAME} ${TUTORIAL_PHONE_GAP_BOTTOM_CLASSNAME}`}>
              <TutorialPhoneShell
                activeMainTab="reminders"
                showHeaderMenu={settingsMenuEnabled}
                headerProps={{
                  logoTickHighlight: page5ShowLogoHighlight,
                  logoTickDone: page5ShowDoneReminders,
                }}
                remindersLabel={page5ShowDoneReminders ? "Done reminders" : undefined}
                filterRow={page5ShowDoneReminders ? (
                  <Page5DoneDeletedFilters />
                ) : (
                  <TutorialReminderFilters
                    items={UNGROUPED_TUTORIAL_FILTER_ITEMS}
                    showHiddenItems
                  />
                )}
              >
                <OnboardingPage5Content
                  onLogoHighlightChange={setPage5ShowLogoHighlight}
                  onDoneRemindersChange={setPage5ShowDoneReminders}
                  showDoneReminders={page5ShowDoneReminders}
                />
              </TutorialPhoneShell>
            </div>
          </div>
        )}
        
        {!isListsTutorial && settingsMenuEnabled && currentPage === 5 && (
          <div className="content-stretch flex flex-col items-center relative w-full h-full min-h-0">
            <OnboardingPage6Text />
            <div className={`flex min-h-0 flex-1 items-center justify-center w-full ${TUTORIAL_PHONE_GAP_TOP_CLASSNAME} ${TUTORIAL_PHONE_GAP_BOTTOM_CLASSNAME}`}>
              <TutorialPhoneShell
                activeMainTab="reminders"
                showHeaderMenu={settingsMenuEnabled}
                filterRow={
                  <TutorialReminderFilters
                    items={UNGROUPED_TUTORIAL_FILTER_ITEMS}
                    showHiddenItems
                  />
                }
              >
                <OnboardingPage6Content />
              </TutorialPhoneShell>
            </div>
          </div>
        )}
        
        {isListsTutorial && (
          <ListsTutorialPlaceholderPage
            filtersMenuVariant={filtersMenuVariant}
            currentPage={currentPage}
            settingsMenuEnabled={settingsMenuEnabled}
            savedListsEnabled={savedListsEnabled}
            activeFilter={listsTutorialActiveFilter}
            onActiveFilterChange={setListsTutorialActiveFilter}
            page2CycleKey={listsPage2CycleKey}
            page2Phase={listsPage2Phase}
            page2ShowLogoHighlight={listsPage2ShowLogoHighlight}
            page2ShowDoneLists={listsPage2ShowDoneLists}
            onPage2DoneSequenceComplete={handleListsPage2DoneSequenceComplete}
          />
        )}
      </div>
      
      <div className="shrink-0 flex flex-col items-center gap-[36px] [@media(max-height:570px)]:pt-[30px] [@media(max-height:570px)]:pb-[30px]">
        <div className="h-[7.935px] w-[115.542px] [@media(max-height:570px)]:hidden">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 115.542 7.93457">
            <g>
              {Array.from({ length: totalPages }, (_, index) => (
                <circle
                  key={index}
                  cx={paginationStartX + index * paginationDotSpacing}
                  cy="3.96729"
                  fill={currentPage === index ? activePaginationColor : "#D9D9D9"}
                  r={paginationDotRadius}
                />
              ))}
            </g>
          </svg>
        </div>
        
        <div className="relative flex items-center justify-center w-full max-w-[322px] h-[45px]">
          {!isFirstPage ? (
            <button 
              className="absolute left-0 h-[45px] w-[35px] cursor-pointer"
              onClick={handleBack}
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 45">
                <g>
                  <path d={svgPaths.p72c8800} fill="#D9D9D9" />
                </g>
              </svg>
            </button>
          ) : (
            <div className="absolute left-0 h-[45px] w-[35px]" />
          )}
          
          <button 
            className="w-[180px] rounded-[100px] flex items-center justify-center cursor-pointer"
            onClick={handleNext}
            style={{ height: 'clamp(40px, calc(20vh - 73.6px), 54px)', backgroundColor: nextButtonColor }}
          >
            <span className="font-['Lato',sans-serif] font-bold text-[17px] text-white leading-[normal]">
              {isLastPage ? (isListsTutorial ? 'Okay, got it!' : 'Okay, got it') : 'Next'}
            </span>
          </button>
          
          {isLastPage ? (
            <div className="absolute right-0 flex h-[45px] w-[35px] items-center justify-center">
              <button 
                className="h-[28.321px] w-[34.741px] cursor-pointer"
                onClick={handleRestart}
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.4912 29.8213">
                  <g>
                    <path d={svgPaths.p171ed6b0} fill="#D9D9D9" stroke="#D9D9D9" strokeWidth="1.5" />
                  </g>
                </svg>
              </button>
            </div>
          ) : (
            <div className="absolute right-0 h-[45px] w-[35px]" />
          )}
        </div>
      </div>
    </div>
  );
}
