Authoritative clarification – Filter behaviour and styling (must follow exactly)

There are two filter menu variants. The only difference between them is which pills are visible. Categorisation logic and visual styling rules do not change between variants.

--------------------------------------------------
STANDARD FILTERS MENU
--------------------------------------------------

Pills shown:
- Today
- This week
- Later
- Sometime

Filter set definitions (must implement exactly):

- Today
  - reminders due today
  - displayed using Today styling (Reminderly blue)

- This week
  - reminders due within this calendar week
  - displayed using This week styling (Reminderly pink)

- Later
  - reminders categorised as later
  - displayed using Later styling (Reminderly orange)

- Sometime
  - reminders with no date/time
  - displayed using Sometime styling (Reminderly grey)

--------------------------------------------------
GROUPED FILTERS MENU
--------------------------------------------------

Pills shown:
- Today
- This week
- Other
- Settings

Filter set definitions (must implement exactly):

- Today
  - same as standard
  - blue styling

- This week
  - same as standard
  - pink styling

- Other
  - later reminders
  - sometime reminders
  - In other words:
    Other = (later ∪ sometime)
  - This week reminders must NOT appear in Other.

Critical rule:
Other is only a filter bucket.
It does NOT change the reminder's category.

When viewing Other:
- later reminders remain orange
- sometime reminders remain grey
- No remapping.
- No "Other" colour.

--------------------------------------------------
OVERDUE RULE (unchanged, must preserve)
--------------------------------------------------

- Overdue reminders continue to appear at the top of all active lists and filtered lists.
- This applies in both Standard and Grouped menus.
- Do not modify overdue detection or ordering logic.

--------------------------------------------------
Implementation constraints
--------------------------------------------------

- Do not redesign styling.
- Do not introduce new colour logic.
- Do not change categoriseReminder unless it is genuinely incorrect.
- Ensure the "other" filter predicate is exactly:
  cat === "later" || cat === "sometime"
- Ensure row styling always uses the reminder's true category (cat), not the selected filter.

Verification:
- Standard menu behaves exactly as defined above.
- Grouped menu behaves exactly as defined above.
- Colours: today blue, this-week pink, later orange, sometime grey.
- No regression in overdue behaviour.
