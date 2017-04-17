---
title: Displaying Events in Charts
keywords: events
tags: [events, charts]
sidebar: doc_sidebar
permalink: charts_events_displaying.html
summary: Learn how to display events in charts.
---

When events occur it can be helpful to view them in charts so that you can correlate metric anomalies with the events. Such events include the firing of an alert or the start of a maintenance window. There are also user events, such as deployment activities, that occur outside Wavefront, but can affect the values of metrics. To help you understand the effect of the event on your metrics you can choose whether to display an *overlay* associated with the event on a chart. 

![Events queries](images/events_queries.png)

## Event Overlay Types

If a single event occurs in a given time interval, the event icon displays as a dot on the chart's X-axis. If two or more events occur in a  time interval, the event icon displays as a star on the X-axis. Instantaneous events display a vertical line and non-instantaneous or ongoing events display a shaded region representing the duration of the event. 

![Event overlay](images/event_overlay.png)

The color of the overlays are determined by the event severity:

-   **severe** - red
-   **warn** - orange
-   **smoke** - gray
-   **info** - blue

<a name="dashboards_events"></a>

## Controlling Events Overlays

You have several ways to control when event overlays display in charts:

- Select the **Display Source Events** checkbox in the [chart configuration](charts#source_events) to display events related to alerts fired for sources displaying in the chart. 

- Add an [events() query](events_queries) to the chart. An events() query cannot be the only query on the chart; at least one time series must be enabled on the chart in addition to the events() query to display the events.

- For all charts in a **dashboard**:
  - Set an [events() query](events_queries) in [dashboard preferences](dashboards_managing#prefs).
  - Select an option in the dashboard **Show Events** menu:

    <ul>
    <li markdown="span"><strong>From Chart</strong> - Display events based on the selection of the **Display Source Events** checkbox. Default setting.</li>
    <li><strong>From Dashboard Prefs</strong> - Display events by the global events() expression set in dashboard preferences and forces the Display Source Events checkbox off.</li>
    <li><strong>From Chart & Dashboard</strong> - Display events based on the selection of the Display Source Events checkbox and the global events() expression.</li>
    <li><strong>Related Source Alerts</strong> - Forces the Display Source Events checkbox on.</li>
    <li><strong>All</strong> - Display all events that have occurred within the time window associated with the chart windows.</li>
    <li><strong>None</strong> - Hide all events from every chart in the dashboard.</li></ul>


