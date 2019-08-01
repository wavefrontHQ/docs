---
title: Displaying Event Overlays in Charts
keywords: events
tags: [events, charts]
sidebar: doc_sidebar
permalink: charts_events_displaying.html
summary: Learn how to customize how events display in charts.
---

Examining events directly in charts can help you correlate metric anomalies with the events. This page explains how you can display an event *overlay* with details about the event, and customize the overlay.

## Event Overlay Example

The example below shows an event overlay that includes a link to the alert that generated it and other information about the event.

![Events queries](images/events_queries.png)

## Event Overlay Types and Color

Different events display in different ways:
* If a single event occurs in a time interval, the event icon displays as a **dot** on the chart's X-axis.
* If two or more events occur in a  time interval, the event icon displays as a **star** on the X-axis.
* Instantaneous events display a vertical line and non-instantaneous or ongoing events display a shaded region that represents the duration of the event. 

![Event overlay](images/event_overlay.png)

The event severity determines the color of the overlay:

-   **SEVERE** - red
-   **WARN** - orange
-   **SMOKE** - gray
-   **INFO** - blue

<a name="dashboards_events"></a>

## Controlling Event Overlays

You have several ways to control when and how event overlays display in charts:

For individual charts, you can:

- Select the **Display Source Events** check box in the chart configuration [General options](ui_chart_reference.html#general) to display events related to alerts that fired for sources that display in the chart.

- Add an [events() query](events_queries.html) to the chart. An `events()` query cannot be the only query on a chart. At least one `ts()` query must be enabled on the chart so that the `events()` query results display.

For all charts in a dashboard, you can:
  - Set an [events() query](events_queries.html) in [dashboard preferences](ui_dashboards.html#set-dashboard-display-preferences), which you can access from the wrench icon in the right corner of the time bar.
  - Select an option in the dashboard **Show Events** dropdown in the middle of the time bar:

  ![time window](images/time_bar.png)

   The **Show Events** options are:
   - **From Chart** - Displays events based on the selection of the **Display Source Events** checkbox. Default setting.
   - **From Dashboard Prefs** - Displays events based on the `events()` query set in the dashboard preferences. Forces the **Display Source Events** checkbox off.
   - **From Chart & Dashboard**- Displays events based on the selection of the **Display Source Events** checkbox and the global `events()` query.
   - **Related Source Alerts** - Selects the **Display Source Events** checkbox.
   - **All** - Displays all events that have occurred within the time window associated with the chart windows.
   - **None** - Hides all events from every chart in the dashboard.
