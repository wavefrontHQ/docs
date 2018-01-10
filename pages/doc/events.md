---
title: Events
keywords: events
tags: [events, alerts]
sidebar: doc_sidebar
permalink: events.html
summary: Learn how to view events and about event types.
---
An event is a record that something of interest has occurred&mdash;an alert has changed state,
a maintenance window has been created, AWS instances have started or stopped, and so on.

You can display events as [overlays on a chart](charts_events_displaying.html) using [events queries](events_queries.html).

The Wavefront CloudTrail integration retrieves EC2 event information and creates Wavefront System events that represent the EC2 events. See [CloudTrail Integration](integrations_aws_metrics.html#cloudtrail-integration).

{% include shared/permissions.html entity="events" entitymgmt="Event" %}

For an overview of events, watch this video:

[Introduction to Events](https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=6f470b3e-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true)

## Viewing Events

To view events, select **Browse > Events**. The Events list displays. Here's an example event that shows an alert was triggered.

![Alert firing](images/event_alert_firing.png)

## Event Sources and Types

Events have three types of sources.

- **System/Alert** -- When an alert fires or resolves, the source is **System/Alert**.
- **System** -- When you perform actions in Wavefront, such as when you [edit an alert](alerts.html) or [snooze an alert](maintenance_windows_managing.html#snoozing-and-unsnoozing-alerts), or when newly affected sources fail or recover from an alert condition, the source is **System**.

![Events system](images/event_system.png)

- **User** -- You can [manually create events](events.html#creating-a-user-event) with source **User** to identify user actions. For example, you can create an event for code pushes that occur outside Wavefront but that affect Wavefront metrics.

Events have types and subtypes, which are typically used in [events queries](events_queries.html).

### Viewing System Event Details

To view details about an alert associated with a System/Alert event, click the **View System Event** and then **View Alert** links in the System/Alert event or the **View Alert** in a System event. You see a chart with the following queries:

{% include shared/alert_details.html %}

![Alert notification](images/alert_notification_queries.png)

{% include shared/searching.html entity="Events" entities="dashboards" %}

## Event States

A System event can be in the Ongoing or Ended state. System and alert events are Ongoing until all affected alert sources are recovered and the alert is resolved. Then the state changes to Ended.

A User event can be in the Pending, Ongoing, or Ended state. A User event with a start time in the future has the state Pending.

## Creating a User Event

To create a user event:

1. Do one of the following:
   - Select **Browse > Events** and clicking the <strong>Create Event</strong> button located at the top of the filter bar.
   - In a chart, click the flag icon located in the top right corner of the time
   bar. Hover over the chart and set your cursor at a point in time. To make the event instantaneous, click that point.
   If the start and end time for the desired event are included in the current time window, click, hold, and drag across the window.

1. Fill in the event properties:
    <table>
    <thead>
    <tr><th width="20%">Property</th><th width="80%">Description</th></tr>
    </thead>
    <tbody>
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
1. Click **Save**.

## Deleting User Events

You can delete one or more user events by checking the checkboxes next to the events and clicking the Trash icon <i class="fa fa-trash"/> at the top of the Events page. The Trash icon is grayed out if any of the selected events cannot be deleted. To delete a single user event, select the three dots to the left of the event and click **Delete**.

## Closing an Ongoing Event
Ongoing events do not have an end time. To close ongoing events, check the checkboxes next to the events and click the **Close** button. The Close button is grayed out if any of the selected events cannot be closed.
To close a single event, select the three dots to the left of the event and click **Close**.

## Managing Event Tags

See [Organizing with Tags](tags_overview.html).
