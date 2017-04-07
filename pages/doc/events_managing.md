---
title: Managing Events
keywords: events
tags: [events]
sidebar: doc_sidebar
permalink: events_managing.html
summary: Learn how to manage events.
---

## What is an Event?

An event is a record that something of interest has occurred&mdash;an alert has changed state,
a maintenance window has been created, AWS instances have started or stopped, and so on.

Events originate from several different sources. When you perform actions in Wavefront, such as when you edit or snooze an alert, the event source is **System**. When an alert fires or resolves, the source is **System/Alert**. You can manually add **User** events to identify user actions, such as code pushes, that occur outside Wavefront but that affect metrics within Wavefront.

To view and manage events, select **Browse > Events**.

{% include shared/permissions.html entity="events" entitymgmt="Event" %}

You can close (end) user events that are ongoing (whether they have no end time or a specific end time).

You can display events as [overlays on a chart](charts_events).

## Creating a User Event

You create a user event by:

<ul>
<li><strong>Events browser</strong> - Clicking the <strong>Create Event</strong> button located at the top of the filter bar.</li>
<li><strong>Chart</strong> - Clicking the flag icon <i class="fa-flag fa"></i> located on the far right side of the time
bar. Hover over the chart and set your cursor at a point in time. To make the event instantaneous, click that point.
If the start and end time for the desired event are included in the current time window, click, hold, and drag across the window.</li>
</ul>

### Event Properties

<table>
<tbody>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
<tr>
<td>Name</td>
<td>The name displayed on the Events page and when you hover over an event icon on the X-axis of a chart.</td>
</tr>
<tr>
<td>Type</td>
<td>The type of the event, such as code push. While there are no limitations to what you can enter into this field, try to limit it to type. You can enter additional information about the event in the Details field.  You can enter the type as an event parameter in events() queries.</td>
</tr>
<tr>
<td>Start Time</td>
<td>The start time of the event:
<ul><li><strong>Now</strong> - The maintenance window starts immediately.</li>
<li><i class="fa fa-calendar"></i> - The maintenance window starts on the specified date and time.Click the text field and choose a date and time or type a date and time in the format MM/DD/YYYY HH:MM [AM|PM].</li></ul></td>
</tr>
<tr>
<td>End Time</td>
<td>The end time of the event:
<ul>
<li><strong>Instantaneous</strong> - End the event instantaneously with the start time. The exact interval is indeterminate. The Events page can report that the event starts and ends at exactly the same time or that it lasts a few seconds.</li>
<li><strong>Ongoing</strong> - The event does not have a specified end time. You can manually end (close) the event from the Events page.</li>
<li><i class="fa fa-calendar"></i> - End the event at the specified day and time. Click the text field and choose a date and time or type a date and time in the format MM/DD/YYYY HH:MM [AM|PM].</li></ul></td>
</tr>
<tr>
<td>Classification</td>
<td>The event classification: SEVERE, WARN, INFO, and UNCLASSIFIED. You can enter the classification as an event parameter in events() queries.</td>
</tr>
<tr>
<td>Tags</td>
<td>Tags to associate with the event. You can start typing the names of existing event tags and matching tags display or create new event tags.</td>
</tr>
<tr>
<td>Details</td>
<td>Additional details about the event.</td>
</tr>
<tr>
<td>Display Event in Chart</td>
<td>Displays only when creating an event from a <strong>chart</strong>. Whether to add an events(name=&lt;name&gt;) query to the chart so that the event displays.</td>
</tr>
</tbody>
</table>

## Deleting User Events

You can delete one or more user events by checking the checkboxes next to the events and clicking the Trash icon <i class="fa fa-trash"/> at the top of the Events page. The Trash icon is grayed out if any of the selected events cannot be deleted. To delete a single user event, select ![action menu](images/action_menu.png#inline) **> Delete** to the right of the event.

## Closing an Ongoing Event
Ongoing events do not have an end time. To close ongoing events, check the checkboxes next to the events and click the **Close** button. The Close button is grayed out if any of the selected events cannot be closed.
To close a single event, select ![action menu](images/action_menu.png#inline) **> Close** to the right of the event.

## Managing Event Tags

See [Tags Overview](tags_overview#entity_tags).

{% include links.html %}
