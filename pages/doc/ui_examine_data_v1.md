---
title: Examine Data with Dashboards and Charts (v1)
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
permalink: ui_examine_data_v1.html
published: false
summary: Examine data with dashboards and charts
---

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%"> With dashboards and charts, you can examine data, set dashboard time window, zoom in and out, and perform other customizations.
<br>
<strong>Note:</strong> All Wavefront users can examine all dashboards and charts unless an individual dashboard is protected through access control. All users can make temporary changes. To save changes to dashboards and charts you must have Dashboard permission.</td>
<td width="20%"><a href="ui_examine_data.html"><img src="/images/v2_button.png" alt="click here for the v2 doc"/></a></td>
</tr>
</tbody>
</table>



## Get Started

1. Log in to Wavefront.
2. Select **Dashboards > All Dashboards**
3. In the dashboards browser:
    * Use the options on the left to find a dashboard.
    * Use the three horizontal dots for dashboard management.
    * Add new or existing tags to make finding dashboards easier.

![dashboard browser annotated](images/dashboard_browser.png)

## Set the Dashboard Time Window

By default dashboards display charts with a two-hour time window with real-time data flowing in. Charts are updated every 30s. The Live Data control displays the state of the update cycle:

![live data](images/live_data.png)

You can configure the default time window as part of the Dashboard Display Preferences.

You can select a larger or smaller time window or view past data instead of realtime data by using the time bar controls.

To change the dashboard time window:

![time window](images/time_bar.png)

- Click **Live Data** to see up-to-date data on the charts. When Live Data is selected, you can click a time window interval to quickly increase or decrease the amount of live data displayed within each chart.
- Click **Custom Date** to look at past data. When Custom Date is selected, you can click an interval to adjust the start time based on the end time. For example, if your end time is 3:00 PM and you choose 12h, the start time is adjusted to 3:00 AM.

## Filter with Dashboard Variables

If a dashboard has preconfigured dashboard variables, you can use them to filter the information displayed in all charts. Dashboard variables are below the section bar.

![dashboard variables example](images/variables_example.png)

In the example above, you can select all AWS regions (wildcard character) or one of the other three regions. The **Region** dashboard variable has been predefined in Wavefront. Users with Dashboard permission can [add dashboard variables](dashboards_variables.html) to any dashboard.

## Find a Dashboard

Many Wavefront users work in environments with many dashboards.

**To find a dashboard**, you have two options:
* From the taskbar, select **Dashboards > All Dashboards** and narrow down your search using the fields on the left.
* From within a dashboard, use the **Search Dashboards** field in the upper right to find other dashboards. The search string matches dashboard name or URL.

## Isolate Sources or Series

You can focus on a particular source or series in the dashboard view or the single-chart view. The selected source(s) or series show up at the bottom of the browser window.

**To isolate sources and aggregated series** you can click a series in a chart:

1. Hover over the series you want to isolate. The series you hover over displays as saturated and all other series are dimmed.
1. Click the series.  An isolation bar appears at the bottom of the browser window.

![isolated series](images/isolated_series.png)

**To isolate multiple series on all charts**, hold down the **Windows** or **Command** key and repeat.
   - If a series is related to a single source, it appears in the **Sources:** list. When you isolate a source, every series in the dashboard containing that source is isolated.
   - If a series represents an aggregation of sources, it appears in the **Series:** list.  When you isolate a series, the query field name displays in the isolation bar and every series in the dashboard with that query field name is isolated.

**To remove a single isolation**, click the **X** icon next to the series at the bottom of the browser window.

**To remove all isolated sources or series** click the **X** icon next to the list label.

## Select the Chart Time Window

You can select the time window for a chart in a few different ways.

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Process</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span">Time Bar</td>
<td markdown="span">Click the chart time bar in the upper-right corner of a chart. Use the magnifying lenses to quickly increase or decrease the time window.
<img src="images/chart_time_bar.png#inline"  alt="chart time bar"/></td></tr>
<tr><td markdown="span">Live Data </td>
<td markdown="span">If the chart is not displaying live data, click the <span style="color:#8B0000">GO LIVE</span> <i class="fa fa-play-circle" style="color:#8B0000"/> link that displays to the left of the time bar.
</td></tr>
<tr>
<td markdown="span">Zoom in</td>
<td>Place your cursor at the beginning of the time window you want, and click and drag. Hold the Shift key to zoom in on all charts in a dashboard.
<div><img src="/images/drag_zoom.png"  alt="drag and zoom"/> </div></td></tr>
<tr>
<td markdown="span">Shift the time window</td>
<td markdown="span">Place the cursor over the X-axis. When the cursor changes to a 4-way arrow <i class="fa fa-arrows" />, hold and drag to the left or right. To shift the time windows of all charts on a dashboard, hold down the **Shift** key while dragging.<br />
You can move the time window into the future, however, unless you are using one of the [predictive functions](query_language_reference.html#predictive-functions), the data you see won't be predictive.</td></tr>
<tr><td markdown="span">Propagate time to all charts</td>
<td markdown="span">To propagate a chart time window to all other charts on the dashboard, do something inside the chart and then click the sync icon <i class="fa fa-share-square-o" /> directly under the chart name in the top right corner of the chart box.</td></tr>
<tr><td markdown="span">Reset chart time</td>
<td markdown="span">To reset an individual chart window to match the time window in all other charts, do something inside the chart and click **RESET**: <img src="/images/reset_time_window.png#inline"  alt="reset time window"/></td></tr>
</tbody>
</table>


## Display Events on Charts

The **Show Events** dropdown (with **From Chart** <i class="fa fa-caret-down"/> selected) in the middle of the time bar allows you to overlay [events](charts_events_displaying.html) on the X-axis of charts.

![time window](images/time_bar.png)

See [Displaying Event Overlays in Charts](charts_events_displaying.html#controlling-events-overlays) for details.

## Do More!

In addition to examining time series data, drilling down on exactly the information you need, creating alerts, etc, you can also
* View [histogram metrics in charts](proxies_histograms.html#viewing-histogram-metrics)
* Look at tracing data with our [distributed tracing UI](tracing_ui_overview.html)
