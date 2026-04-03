Reply to Claude

Your understanding is correct. Answering your questions and your concern below. No other changes.

1. Persistence key
   Yes - use simple localStorage with a dedicated key for this setting.

Requirements:

* One key, one boolean.
* Default to true when missing or invalid.
* Persist on every change, including the auto-reset.

Do not create a "settings framework", combined settings object, or reuse STORAGE_KEY for reminders. Keep it lightweight and isolated.

Suggested key name (pick one and stick to it):

* reminderly.showDateAndTimeSubtitles
* reminderly_setting_showDateAndTimeSubtitles

2. Done/deleted view scope
   Yes - include done/deleted as well.

Interpretation of "everywhere they normally appear":

* Any reminder row that currently renders a date/time subtitle should hide it when:

  * grouped filters is active, and
  * showDateAndTimeSubtitles is false

This includes active, done, and deleted rows.

3. Concern: when to trigger auto-reset
   Confirmed: the auto-reset is based only on grouped filters becoming inactive, not on whether the settings overlay is open.

Spec:

* When leaving grouped filters (filtersMenuVariant changes away from grouped) and showDateAndTimeSubtitles is false:

  * set it back to true immediately
  * persist the true value

That should work whether the user switches via dev tools or any other mechanism.

One extra guard to prevent layout drift
When subtitles are re-shown, the visible-subtitle layout must be pixel-identical to baseline. The simplest way to guarantee this is:

* Do not touch the existing "subtitle visible" markup/classes.
* Only add an alternate "subtitle hidden" branch that removes the subtitle element and applies centre alignment.

No further questions.
