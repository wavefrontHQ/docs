---
title: Events
keywords: events
tags: [events, alerts]
sidebar: doc_sidebar
permalink: events.html
summary: Learn about events and how to view, create, and close events
---
An event is a record that something of interest has happened. For example, the event might show that an alert has changed state, AWS instances have started or stopped, and so on. To view the list of all events, select **Browse > Events**.

By default, events are displayed as small dots on the X axis of most charts. You can choose to display an [event overlay](charts_events_displaying.html) to give users more detail, and you can further customize the event display using [events queries](events_queries.html).

{% include shared/permissions.html entity="events" entitymgmt="Events" %}

## Videos

Watch these videos to get you started!

<table style="width: 100%;">
<tbody>
<tr>
<td><strong><font color="#0091DA" size="3">Introduction to Events</font></strong><br>
<br>
<iframe id="kmsembed-1_y50fnn7c" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_y50fnn7c/uiConfId/49694343/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Introduction to Events"></iframe></td>
<td><br><br>
<p>Events let you know that something important just happened. Jason shows the Events page and discusses the 3 types of event sources: System, Alert, and User. He then uses filters to drill down on certain events.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_y50fnn7c/252649793" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Creating an Event</font></strong><br>
<br>
<iframe id="kmsembed-1_rrrhqlrk" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_rrrhqlrk/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Create Tanzu Observability Events"></iframe>
</td>
<td><br><br>
<p>
Tanzu Observability by Wavefront creates System events and Alert events for you. You can create User events via the UI or API to signal that something of interest has happened. Jason demos how to create an event from a chart and shows how it immediately appears in the UI.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_rrrhqlrk/252649793" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Controlling Event Displays</font></strong><br>
<br>
<iframe id="kmsembed-1_wu95qynh" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_wu95qynh/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="Jason explains how to get the most out of event displays"></iframe>
</td>
<td><br><br>
<p>Jason demos how to display or hide source events in charts. Then he shows an example of adding an events query to a chart to display only selected events. He customizes the query to also show events when a specific user receives an email alert.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_wu95qynh" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p> </td>
</tr>
</tbody>
</table>


## Event Sources and Types

An event can have one of the following sources.

- **System/Alert** -- When an alert fires or resolves, the source is **System/Alert**.
- **System** -- When you perform actions, such as when you edit an alert or snooze an alert, or when newly affected sources fail or recover from an alert condition, the source is **System**.
![Events system](images/event_system.png)

    - The CloudTrail integration retrieves EC2 event information and creates System events that represent the EC2 events. See [CloudTrail Integration](integrations_aws_metrics.html#cloudtrail-events-metrics-and-point-tags).
    - For Microsoft Azure, some information from the Azure Activity Log integration is available as events.
- **User** -- You can [manually create events](events.html#creating-a-user-event) with source **User** to identify user actions. For example, you can create an event for code pushes that affect Tanzu Observability metrics but that occur outside Tanzu Observability. The event is then available on charts that display the metrics.

Events have types and subtypes, which are typically used in [events queries](events_queries.html). Types include **alert** or **alert-detail** You can see types in the Type column of the **Events** page.

## Event States

Event states differ for system and user generated events:

### System Event States

A System/Alert and a System event can be in the Ongoing or Ended state.
- The events are Ongoing until all corresponding alert sources are recovered and the alert is resolved.
- Then the state changes to Ended.

### User Event States

A User event can be in the Pending, Ongoing, or Ended state. A User event with a start time in the future has the state Pending.

Here's an example of 3 user events:

* The `Computer turned on` event is instantaneous. It starts and ends at the same time.
* The `high wattage usage` event has a start and end time. It's in the Ongoing state between the start and end time, and then in the Ended state.
* The `Computer turned off` event is an Ongoing event. It stays in that state until it is modified with an end time.

The example does not include an event that's in the Pending state.

![event states](images/event_states.png)

To improve event performance, Tanzu Observability ends events that have been ongoing for 60 days (based on start time). We also don't return events for certain ongoing `events()` queries. See [When Does an Event Query Return Events](events_queries.html#when-does-an-event-query-return-events).


{% include note.html content="You cannot have more than 1000 ongoing events on your cluster. Use the `~events.num-ongoing-events` internal metric to monitor the number of ongoing events." %}

## Viewing Events

To view events, select **Browse > Events**. The Events list displays. Here's an example event that shows that an alert was triggered.

![Alert firing](images/event_alert_firing.png)


To view details for an alert associated with a System/Alert event:
1. Click **Browse > Events** and filter by Source **SYSTEM** or **ALERT** on the left.
2. In the event, click the  **View Alert** link.

The chart includes information about the alert associated with the event, and about the alert itself:

* **&lt;Alert name&gt;** - The display expression if one was specified. Otherwise, the alert condition expression. If the display expression is shown, the condition appears in a separate **Alert Condition** field.
* **Alert Firings** - An [events() query](events_queries.html) that shows events of type `alert` for the alert. These system events occur whenever the alert is opened. The query shows both the current firing (an ongoing event) and any past firings (ended events).
* **Alert Details** - An [events() query](events_queries.html) that shows events of type `alert-detail` for the alert. These system events occur whenever the alert is updated (continues firing while an individual time series changes from recovered to failing, or from failing to recovered).
* **Alert Data** - A query for alert metrics. These metrics are shown when the alert is open or updated.

![Alert notification](images/alert_notification_queries.png)

## Creating a User Event

Tanzu Observability creates many events for you, but you can also create an event explicitly:

1. Do one of the following:
   - Select **Browse > Events** and click the <strong>Create Event</strong> button on top.
   - From within a new chart, click the flag icon in the top right corner. Hover over the chart and set your cursor at a point in time. To make the event instantaneous, click that point.
   If the start and end time for the desired event are included in the current time window, click, hold, and drag across the window.

1. Fill in the event properties:
    <table>
    <thead>
    <tr><th width="20%">Property</th><th width="80%">Description</th></tr>
    </thead>
    <tbody>
    <tr>
    <td>Name</td>
    <td>Name displayed on the Events page and when you hover over an event icon on the X-axis of a chart.</td>
    </tr>
    <tr>
    <td>Type</td>
    <td>Type of the event, such as code push. Keep the type short. You can enter additional information about the event in the <strong>Details</strong> field.  You later can enter the type as a parameter in events() queries.</td>
    </tr>
    <tr>
    <td>Start Time</td>
    <td>The start time of the event:
    <ul><li><strong>Now</strong> - The maintenance window starts immediately.</li>
    <li><i class="fa fa-calendar"></i> - The maintenance window starts on the specified date and time. Click the text field to select the start time.</li></ul></td>
    </tr>
    <tr>
    <td>End Time</td>
    <td>The end time of the event:
    <ul>
    <li><strong>Instantaneous</strong> - End the event instantaneously with the start time. The exact interval is indeterminate. The Events page can report that the event starts and ends at exactly the same time or that it lasts a few seconds.</li>
    <li><strong>Ongoing</strong> - The event does not have a specified end time. You can manually end (close) the event from the Events page. Tanzu Observability closes events that are older than 60 days.</li>
    <li><i class="fa fa-calendar"></i> - End the event at the specified day and time. Click the text field to select the end time.</li></ul>
    <strong>Note</strong>: If you can create an event with an end time, you cannot make changes to the event name or other event properties later.</td>
    </tr>
    <tr>
    <td>Classification</td>
    <td>The event classification: SEVERE, WARN, INFO, and UNCLASSIFIED. You can enter that classification as a parameter in events() queries.</td>
    </tr>
    <tr>
    <td>Tags</td>
    <td>Tags to associate with the event. You can start typing to select existing tags or create new event tags.</td>
    </tr>
    <tr>
    <td>Details</td>
    <td>Additional details about the event.</td>
    </tr>
    <tr>
    <td>Display Event in Chart</td>
    <td>Whether to add the events query to the chart so users can examine it later. Displays only when you create an event from a chart.</td>
    </tr>
    </tbody>
    </table>
1. Click **Save**.

## Event Closure and Deletion

Tanzu Observability closes any event that is older than 60 days, based on start time. You can explicitly close events and delete user events if you have the right permissions.

### Closing an Event

You can close an event if you no longer need it. It's especially important to close ongoing events, which do not have an end time.

{% include note.html content="To prevent performance degradation, you cannot have more than 1000 (one thousand) ongoing events."%}

To close ongoing events:
1. Click the check box(es) next to the event(s).
2. Click the **Close** button.

If the **Close** button is grayed out, you don't have permissions to close the selected events.

### Deleting User Events

To delete one or more user events:
1. Click the check box(es) next to the event(s).
2. Click the Trash icon <i class="fa fa-trash"/> at the top of the Events page.

If the Trash icon is grayed out, you don't have permission delete the selected events.

## Learn More!

* See [Organizing with Tags](tags_overview.html) for details on managing event tags.
* See [Displaying Event Overlays in Charts](charts_events_displaying.html) for details on customizing event overlays.
