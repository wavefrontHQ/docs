---
title: Examine Data with Dashboards and Charts
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
permalink: ui_examine_data.html
summary: Examine data with dashboards and charts
---

With dashboards and charts, all Tanzu Observability by Wavefront users can examine data. By default, everyone can explore: set dashboard time window, zoom in and out, and perform other customizations.

{% include note.html content="All users can view and explore charts. You must have the [**Dashboards** permission](permissions_overview.html) to make permanent changes, such as saving a chart to a dashboard." %}

## Video

All users can customize their dashboards to drill down into data. Learn how to find a section, filter using variables or filters, set the time for the dashboard, and share the dashboard with others. You need Dashboards permissions to save your changes.

You can also watch the video <a href="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_gunwcmwm/uiConfId/49694343/pbc/252649793/st/0" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.

<p>
<iframe id="kmsembed-1_gunwcmwm" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_gunwcmwm/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0"></iframe>
</p>


## Get Started: Dashboard Browser

From the Dashboard Browser, you can find dashboards by using filters and tags. You can make a dashboard a favorite with the star icon. Users with **Dashboard** permissions can also look at versions, grand and remove access, clone dashboards, move a dashboard to the trash, or access a deleted dashboard for up to 30 days.

1. Log in to your Wavefront instance.
2. Select **Dashboards > All Dashboards**
3. In the Dashboard Browser:
    * Use the search bar at the top to find a dashboard.
    * Use the options on the left to limit what the Dashboard Browser displays.
    * Use the three horizontal dots (ellipsis) menu for dashboard management.
    * Add new or existing tags to make finding dashboards easier.
    * Click the star icon to add the dashboard to your favorites.
    * View dashboard tags (or, add or remove them if you have **Dashboard** permission).


![The dashboard browser annotated with the items in the bullets above](images/dashboard_browser.png)

### Find a Dashboard

Many users work in environments with a lot of dashboards.

**To find a dashboard**, you have these options:
* From the toolbar, select **Dashboards > All Dashboards** and narrow down your search using the fields on the left.
* Select **Dashboards > All Dashboards** and start typing the dashboard name in the Search field.
* From within a dashboard, use the **Search for Dashboards** field in the upper right to find other dashboards. The search string matches dashboard name or URL.

## Get Started: Dashboards

After you've selected a dashboard, it displays in your browser.
* **Default time setting** for all charts is 2 hours, live data, with a refresh every 30 seconds.
* **Refresh rate** is determined by the time window. A smaller time window refreshes more often. You can force a refresh.
* **Lazy load** means that charts refresh as you scroll to them to avoid extra computational burden. Sections can improve load behavior -- you can focus on what you need instead of scrolling through charts you don't want to see.

Here's the anatomy of a dashboard:

![An annotated dashboard with the items in the bulleted list below](images/ui_dashboard_anatomy.png)

You can customize what you see, open charts, and more.
* Select [predefined variables or use a filter](dashboards_variables.html) to limit the display.
* Use the **Jump To** menu and select a section.
* Use the ellipsis icon menu in the top right to export to PDF, look at the version history, edit or clone the dashboard. Menu options are limited for system dashboards and for users who don't have **Dashboard** permission.
* Use the ellipsis icon menu in the top right to delete a dashboard. Deleted dashboards are available for 30 days before they are deleted permanently. To access a deleted dashboard, simply select **Dashboards > All Dashboards**, and from the menu on the top right of the list of dashboards, select **Deleted**.
* [Share a link](ui_sharing.html) to the dashboard (all users) and [modify access](access.html) (**Dashboard** permission required).

## Set the Time Window

This <a href="https://vmwaretv.vmware.com/media/t/1_zew0muhn" target="_blank">video<img src="/images/video_camera.png" alt="video camera icon"/></a> highlights how you can select, sync, and reset time windows so you can annalyze and compare your data.

<p>
<iframe id="kmsembed-1_zew0muhn" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_zew0muhn/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="time window customization video"></iframe>
</p>

By default, dashboards:
* Show a two-hour time window in each chart. You can configure the default time window as part of the [Dashboard Display Preferences](ui_dashboards.html#set-dashboard-display-preferences-and-settings).
* Display real-time (live) data.
* Update charts every 30s.

You can select a larger or smaller time window or view past data instead of real-time data with the time bar controls.

{% include note.html content="When you change the time window, the [chart resolution](ui_charts.html#chart-resolution) and the refresh rate change as well. For example, if you select a 10-minute time window, the charts in the dashboard refresh every second." %}

**To change the dashboard time window:**

- Click the **Live** button to turn on (green) live data and see up-to-date data on the charts.
- Click the **Live** button again to turn off live data and to look at past data.

Regardless of selection, you can click the time selector for a fine-grained time selection window. To the left of the time selector, you see the currently selected time.

![time bar with turned off live data](images/time_bar_v2.png)

{% include tip.html content="Live dashboards and charts display data on days in the future as black points. This might happen, for example, if you select **1 week** under **Live**.  " %}

## Use the Jump To Menu to Find a Section
Most dashboards have several sections. They're easy to access from the **Jump To** menu.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Use the <strong>Jump To</strong> menu to go to a section.</td>
<td width="60%"><img src="/images/v2_jump_to.png" alt="jump to a section from the Jump To menu"></td>
</tr>
</tbody>
</table>


## Filter with Global Filters or Dashboard Variables

Global filters and dashboard variables are two ways to narrow down what you see.
* **Global Filters** allow any user to filter by key-value pair. For example, you could specify `source="db-2"` or `env="production"`.
* [**Dashboard Variables**](dashboards_variables.html) are preset by a user with Dashboard permissions. All users can then make selections, for example, select a value from predefined list of strings or an automatically generated list of sources.

If you select both a variable and a global filter, the query engine uses AND to find results that satisfy both conditions. For example, `source="db-2" AND source="db-1"` results in No Data, but other combinations might get the results you're after.

### Filter with Global Filters

All users can use global filters to customize their dashboard. When you set a global filter, for example, to limit to certain sources, you affect all charts in the dashboard.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%"><a href="dashboards_variables.html"> Global filters</a> allow any user to:
<ul>
<li>Specify a key-value pair as a filter for the dashboard. <br><br>All filters show up to the right of any dashboard variables</li> <li>Remove the filter by clicking <strong>X</strong> in the filter bubble. </li></ul></td>
<td width="60%"><img src="/images/global_filters.png" alt="Global filter set and see"/></td></tr>
</tbody>
</table>

### Use Dashboard Variables

If a dashboard has preconfigured dashboard variables, you can use them to filter the information displayed in all charts.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
To show or hide the Variables bar:
<ol><li>
Scroll up to right below the toolbar.</li>
<li>Click the up or down double caret.</li></ol></td>
<td width="40%">
<img src="images/v2_hide_variables.png" align="center" valign="center" alt="hide or show variables"></td>
</tr>
<tr>
<td width="60%">
To select a variable:
<ol><li>Find the variable in the variables bar. </li>
<li>Select either the wildcard character or one of the options.  </li></ol>
In the example on the right, a <strong>Region</strong> dashboard variable has been predefined for the dashboard. You can select all AWS regions (wildcard character) or one of the three regions.  </td>
<td width="40%">
<img src="images/variables_example.png" align="center" valign="center" alt="dashboard variables example"></td>
</tr>
</tbody>
</table>

## Include or Exclude Obsolete Metrics

By default, metrics that stopped reporting 4 weeks ago are not included in the charts unless you explicitly decide to include these metrics. You can:
* Explicitly include obsolete metrics for each chart.
* Explicitly include obsolete metrics on a dashboard level. This way, obsolete metrics will be included in all the charts within a dashboard.

{% include note.html content="Including obsolete metrics on a dashboard level may significantly slow down the dashboard performance." %}

{% include tip.html content="Everyone can explore obsolete metrics for dashboards and charts. You must have the **Dashboards** permission to save the changes to the settings." %}

**To include obsolete metrics for a chart**:

1. Open the chart for edit.
2. Click the **Advanced** tab and select the **Include Obsolete Metrics** check box.
3. Explore the data or, if you have **Dashboard** permissions, click **Save** to save the changes for this chart.

**To include obsolete metrics for a dashboard**:

1. Navigate to a dashboard and click the ellipsis icon in the top right corner of the dashboard.
2. Select **Edit**.
3. Click **Settings**.
4. Click **Advanced** and select the **Include Obsolete Metrics** check box.
5. Click **Accept**  and explore. If you have **Dashboards** permission click **Save** to save your changes.

**To exclude obsolete metrics for a dashboard**:

Dashboards on which inclusion of obsolete metrics is turned on have a warning banner which allows you to easily turn off that setting.
![Banner saying that obsolete metrics inclusion is turned on for the dashboard. The banner also has a view settings button.](images/obsolete-metrics-banner.png)

1. Navigate to the dashboard and click **View Settings** in the banner at the top.
   Refresh your browser if you closed the banner.
3. Click **Advanced**.
4. Deselect the **Include Obsolete Metrics** check box.
5. Click **Accept**  and explore. If you have **Dashboards** permission click **Save** to save your changes.

## Isolate Sources or Series

You can focus on a particular source or series in the dashboard view or the single-chart view. The selected sources or series show up at the bottom of the browser window.

**To isolate sources and aggregated series**, you can click a series in a chart:

1. Hover over the series you want to isolate. The series you hover over displays as saturated and all other series are dimmed.
1. Click the series.  An isolation bar appears at the bottom of the browser window.

![isolated series](images/isolated_series_v2.png)

**To isolate multiple series on all charts**, hold down the **Windows** or **Command** key and repeat.
   - If a series is related to a single source, it appears in the **Sources:** list. When you isolate a source, every series in the dashboard containing that source is isolated.
   - If a series represents an aggregation of sources, it appears in the **Series:** list.  When you isolate a series, the query field name displays in the isolation bar and every series in the dashboard with that query field name is isolated.

**To remove an isolation**, click the **X** icon next to the series at the bottom of the browser window.

## Fine-Tune the Time Window

You can fine-tune the time window for an individual chart, propagate the time window from one to all charts, and reset a customized time window to the dashboard default.

When you fine-tune the time window, the UI dynamically recalculates and updates the chart bucket size and the aggregated values based on the selected [summarization option](ui_charts_faq.html#what-does-the-summarization-option-do).

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Process</th><th width="80%">Description</th></tr>
</thead>
<tr><td markdown="span">Time Bar</td>
<td markdown="span">Click the chart time bar in the upper-right corner of a chart. Use the magnifying lenses to quickly increase or decrease the time window.
<img src="images/chart_time_bar_v2.png#inline"  alt="chart time bar v2"/></td></tr>
<tr>
<td markdown="span">Zoom in</td>
<td>Place your cursor at the beginning of the time window you want, and click and drag. Hold the Shift key to zoom in on all charts in a dashboard.
<div><img src="/images/drag_zoom_v2.png"  alt="drag and zoom"/> </div></td></tr>
<tr>
<td markdown="span">Shift the time window</td>
<td markdown="span">Place the cursor over the X-axis. When the cursor changes to a 4-way arrow <i class="fa fa-arrows" />, hold and drag to the left or right. To shift the time windows of all charts on a dashboard, hold down the **Shift** key while dragging.<br />
You can move the time window into the future. However, unless you are using one of the [predictive functions](query_language_reference.html#predictive-functions), the data you see won't be predictive.</td></tr>
<tr><td markdown="span">Propagate time to all charts</td>
<td>To propagate a chart time window to all other charts on the dashboard:
<ol><li>Select a time window or zoom in/out on one chart. </li>
<li>Click <strong>Sync Time</strong><img src="/images/reset_time_window_v2.png#inline"  alt="reset time window"/></li>
</ol></td></tr>
<tr><td markdown="span">Reset chart time</td>
<td markdown="span">If you've changed the time window in one chart and want to return to the default time used by other charts in the dashboard, click **Reset** next to the chart time selector: <img src="/images/reset_time_window_v2.png#inline"  alt="reset time window"/></td></tr>
</tbody>
</table>


Here's a <a href="https://vmwaretv.vmware.com/media/t/1_zew0muhn" target="_blank">video<img src="/images/video_camera.png" alt="video camera icon"/></a> that illustrates chart time windows. 
<p>
<iframe id="kmsembed-1_zew0muhn" width="700" height="400" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_zew0muhn/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Time Windows on Dashboards and Charts"></iframe>
</p>

## Display Events on Charts

The charts in your dashboard can display [events](events.html).
* The Wavefront service generates system events, for example, when an alert changes state.
* In addition, users with **Events** permission might have added user events.

All users can select which events are displayed for all charts.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
The <strong>Show Events</strong> drop-down menu in the upper right of the toolbar allows you to <a href="charts_events_displaying.html">toggle event overlays</a> on the X-axis of charts.</td>
<td width="40%">
<img src="images/display_events_v2.png" align="center" valign="center" alt="Show Events menu"></td>
</tr>
</tbody>
</table>


## Export to CSV or PDF

* You can export what you see in a dashboard or chart to PDF.
* You can export charts to CSV, regardless of whether the chart is in Edit mode.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>Click a chart name to open the chart in Edit mode. </li>
<li>Click the ellipsis icon on top of the chart and select <strong>Export PDF</strong> or <strong>Export CSV</strong>.</li>
</ol> </td>
<td width="50%"><img src="/images/export_pdf_csv.png" alt="Export PDF or CSV from chart in Edit mode"/> </td>
</tr>
<tr>
<td width="50%">
<ol>
<li>From any dashboard, click the chart's ellipsis menu. </li>
<li>Select <strong>Export CSV</strong> to export the content of the chart.</li>
</ol> </td>
<td width="50%"><img src="/images/export_csv_chart.png" alt="Export CVS from chart"/></td>
</tr>
<tr>
<td width="50%">
<ol>
<li>Click a dashboard's ellipsis menu. </li>
<li>Select <strong>Export PDF</strong> to export the whole dashboard to PDF.</li>
</ol>
</td>
<td width="50%"><img src="/images/export_pdf_dashboard.png" alt="Export PDF from dashboard"/></td>
</tr>
</tbody>
</table>

## Do More!

In addition to examining time series data, drilling down on exactly the information you need, creating alerts, etc., you can also
* View [histogram metrics](proxies_histograms.html).
* Examine traces, spans, and RED metric sent by your application.
  * See [Application Status](tracing_ui_overview.html).
  * See [Service Dashboard](tracing_service_dashboard.html).
  * See [Traces Browser](tracing_traces_browser.html).
* For an in-depth discussion, see [Troubleshooting Missing Data](missing_data_troubleshooting.html).
