---
title: Create and Customize Charts
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
permalink: ui_charts.html
summary: Create charts, add and manage queries, and customize the chart.
---

Tanzu Observability by Wavefront provides many different types of charts for examining data, creating alerts, and more! For example:
<ul>
<li>Create a chart and fine-tune the data it displays using filters and functions.</li>
<li>Customize your charts.</li>
<li>Use chart variables, set the time window, create alerts, and optimize display speed.</li></ul>


{% include note.html content="All users can view and explore charts. You must have [Dashboard permission](permissions_overview.html) to make permanent changes, such as saving a chart to a dashboard." %}

## Create a Chart

You can create a chart from a dashboard or from the toolbar.

### Create a Chart from a Dashboard

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Edit a dashboard or select <strong>Dashboards > Create Dashboard</strong> from the toolbar to create a new one. </li>
<li>Drag the metrics or chart type widget to the canvas.</li>
<li>Select metrics, filters, and functions and click <strong>Save</strong> in the top right. </li>
</ol></td>
<td width="60%"><img src="/images/v2_create_dashboard.png" alt="create dashboard"></td>
</tr>
</tbody>
</table>


### Create a Chart from the Toolbar


1. Select **Dashboards > Create Chart**.
2. (Optional) In the top left, specify a chart name.
2. Select a metric and an optional filter and function.
3. In the top right, click **Save**.
4. Specify the dashboard in which you want to insert the chart or create a new dashboard.

![create chart](/images/v2_create_chart.png)


## Fine-Tune Chart Metrics from the Data Tab

From the **Data** tab, fine-tune the metrics that are displayed on the chart by customizing the query and applying filters and functions.

{% include note.html content="Your user preferences and the last used UI determine whether the Data tab shows Chart Builder or the more advanced Query Editor by default." %}

### Chart Builder

[Chart Builder](chart_builder.html) lets you:
* Create a chart by selecting metrics or a chart type.
* Select one or more metrics directly or start with an integration.
* Specify filters and functions, e.g., to aggregate multiple time series.

In the image below, we selected a metric, narrowed down the source, and we're just selecting a function.

![v2 chart builder](images/v2_chart_builder_simple.png)

### Query Editor

Instead of using [Chart Builder](chart_builder.html), you can click the toggle and explicitly enter [Wavefront Query Language](query_language_reference.html) expressions into the query field.

{% include note.html content="After you switch to Query Editor and make changes to the query, you cannot return to Chart Builder." %}

We can get the metric we selected above with the following query.

`max(ts(~sample.db.queries.duration, source="db-1" OR source="db-5"))`

{% include tip.html content="New users often start with Chart Builder as the default and set their default to Query Editor later for more fine-grained control (including chart variables)." %}


## Hide, Clone, or Delete Queries

You can easily hide, clone, or delete queries from the **Data** tab.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ul><li>
To clone a query, click the <strong>Clone</strong> icon. A copy of the query appears below the query itself. </li>
<li>To delete a query, click the <strong>Delete</strong> icon. </li>
<li>To hide or redisplay a query, click the <strong>Hide/Show</strong> icon.  </li>
</ul>Save your changes.
</td>
<td width="60%"><img src="/images/ui_v2_hide_show.png" alt="query in Chart Builder with the cursor over the Hide icon "></td>
</tr>
</tbody>
</table>


## Customize How the Chart Looks

All users can [set the chart time window](ui_examine_data.html#set-the-time-window) and [isolate sources and series](ui_examine_data.html#isolate-sources-or-series) without editing the chart.

Users with **Dashboard** permissions can make many other changes, such as selecting the chart type or customizing the axes and colors. Here are some tasks you can perform. In many cases, they're possible only for certain chart types.

{{site.data.alerts.note}}
<p>Making changes to the UI, for example, changing the units, only affects the UI:</p>
<ul>
  <li>Does not change the actual data values. </li>
  <li>Does not change the results of queries made with the API.</li>
  <li>Does not change constants used in queries, including thresholds.</li>

</ul>
{{site.data.alerts.end}}



### Change the Legend

A chart renders the lines or points for different time series in different colors. The legend explains which color maps to which time series. You can change the legend to help users find the information they need, as follows:


<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
<strong>Hover Legend</strong> <br> <br>
For hover legends you can:
<ul><li>Disable the legend by holding the <strong>Ctrl</strong> key while you hover over the chart.</li>
<li>Limit the number of point tags or specify point tags to show in the legend. </li>
<li>Show raw data in the legend by pressing the <strong>Shift</strong> key</li>.
<li>Press <strong>Shift+P</strong> to pin the legend. You can move the pinned legend.</li></ul>
</td>
<td width="40%"><img src="/images/hover_legend.png" alt="hover legend"></td></tr>
<tr>
<td>
<strong>Fixed Legend</strong> <br><br>
For fixed legends you can:
<ul><li>Change where the legend displays.</li>
<li>Add more information to the legend (Mean, Median, etc.). </li>
<li>Show only the top or bottom <emphasis>N</emphasis> series, by value. </li>
<li>Show only the top or bottom <emphasis>N</emphasis> series, by median, mean, sum, etc. </li>
</ul> </td>
<td><img src="/images/fixed_legend.png" alt="fixed legend"></td>
</tr>
</tbody>
</table>

For details, see the [Chart Reference](ui_chart_reference.html).

### Include Metrics That Stopped Reporting Over 4 Weeks Ago

For optimal rendering of displayed results, charts and dashboards do not include metrics that stopped reporting over 4 weeks ago (obsolete metrics) in charts. If you're interested in including those metrics in a chart, it's easy to do.

**To include obsolete metrics**:
1. Open the chart for edit.
2. Click the **Advanced** tab, select the **Include Obsolete Metrics** check box, and click **Save**.

You can also include obsolete metrics for all charts within a dashboard. See [Set Dashboard Display Preferences](ui_dashboards.html#set-dashboard-display-preferences-and-settings).

{% include note.html content="Including obsolete metrics on a dashboard level may significantly slow down the dashboard performance." %}

### Use a Logarithmic Y Axis for Skewed Data

Sometimes charts have a few outliers that make it hard to make out the main part of a chart. For example, assume you have 10 standard servers and 2 large servers in your environment, and you monitor the CPU. With a linear scale, the large values for the large servers bunch together the lines for the standard servers.


**To change the Y axis from linear to logarithmic:**
1. Open the chart for edit.
2. Click the **Axis** tab and select **Logarithmic**.


### Filter Out Lines with Min and Max

To filter out some lines, you specify a minimum or maximum. By default, we adjust the chart's Y axis to show all information. The following screenshot shows the automatic Y axis on the left and a Y axis of 75 on the right to filter out all lines from the development environment.

![min 75 axis hides lines](images/charts_set_min.png)

### Use IEC/Binary Prefixes in Y Axis and Legends

You can control how units display in the Y axis. Changes affect *only the display* of data.

{% include note.html content="Which changes make sense depends entirely on the data you're looking at. For example, if your chart shows a percentage, changing the units changes the label, but does not change the units themselves. If your chart shows GB of memory or Gigabytes per second, then changes can result in a clearer display." %}

By default, charts use SI unit prefixes, but you can change that.
* **SI unit** prefixes (k, M, G, T, P, E, Z, Y) increment by a factor of 1000 and are used by default. For details on SI units, see Wikipedia or a similar source.
* **IEC/Binary** prefixes (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi) increment by a factor of 1024.

**To display axes and legends with IEC/Binary unit prefixes:**

1. Open the chart for edit.
2. Click the **Axis** tab.
3. For all applicable options (e.g., **Min** and **Max**), select **Unit > IEC/Binary** and pick the unit from the drop-down menu.

Going forward, a data point with value `1024 x 1024 = 1,048,576` displays as `1.000Mi` instead of `1.049M`.

Here's how two charts might look:

![SI and IEC Binary](/images/SI_ICE_units.png)


### Use Dynamic Units to Optimize the Display

Dynamic units adjust the scaling prefixes and units and result in a clearer display. The change depends on the type of metric and the corresponding unit.

**SI or IEC/Binary Dynamic Units**

When an axis is labeled with a unit that starts with one of the SI or IEC/Binary prefixes, the display logic:
1. First normalizes the data value with the labeled prefix.
2. Then assigns a new prefix and adjusting the unit.

For example, if an axis is labeled `MPPS` (Mega PPS, or 1 million PPS), and the underlying data has a value of 2000, the displayed value with `Dynamic units` enabled is `2.000B PPS` and not `2.000k MPPS`.

Options to show the underlying raw data are not affected - hold the Shift key to see the legend and the actual value.

**Time Dynamic Units**
When an axis is labeled with a unit that exactly matches one of the time units, (ys, zs, as, fs, ps, ns, us, ms, s, min, hr, day, wk, mo, yr), the display logic keeps the magnitude as small as possible:

1. First we normalize the underlying data to seconds.
2. Then we display the data:
   * If the  normalized magnitude is < 60 results, the result is units ys through s.
   * If the normalized magnitude is > 60, we scale the data using a larger time unit.

For example:

| **Data** | **Axis Label** | **Display** |
| 60,000 | `ms` (milliseconds) | `1.000 min`|
| 60,000  | `s` (seconds) | `16.67 hr`  |
| 60,000  | `us` (microseconds) | `60.00 ms`  |



<!---This needs to be fixed
### Chart Unit Example


The following chart represents request latency data. The values associated with the displayed series are in hundreds of milliseconds, ranging between 156 and 178 ms. If the data values stay in this range, dynamic units are not needed.

![example_without_units](images/example_with_microseconds.png)

However, what if the values were in the hundred thousands of milliseconds? You can emulate this by multiplying the original ts() expression by 1000, but
the in that case, the values displayed on the Y-axis are still displayed as milliseconds, so they range between 156K milliseconds and 174K milliseconds.

Turn on dynamic units:

1. In the Chart section, select the **Axis** tab.
1. Select the **Dynamic Units** check box.

The same chart with the millisecond values in the hundred thousands displays as minutes on the Y-axis:

  ![minute_view](images/example_with_minutes.png)
--->


## Chart Resolution

The Wavefront service accepts and stores data at up to 1 second resolution. Charts display that granularity only for small time windows on high-resolution displays. In most cases, data points are aggregated into time buckets and the buckets are mapped to display points based on the selected [summarization option](ui_charts_faq.html#what-does-the-summarization-option-do).

**Chart resolution** is the bucket time interval. It displays in the **Horizontal Scale** field in the lower-left corner of a chart.

![resolution](images/chart_resolution_v2.png)



The chart above has 240 point buckets and the resolution of each bucket is 30 sec. If a source is sending 1 point per second, each bucket summarizes 30 points. On the other hand, if the source is sending 1 point every minute, no summarization occurs. If you choose the **Count** summarization method, you can see how many points are in each bucket.

### Factors That Affect Chart Resolution

Chart resolution is determined by:
* The chart [time window](ui_examine_data.html#set-the-time-window).
* The resolution of the display on which you view the chart.

Consider the following chart time window and display resolution examples, and the bucket size they typically have:

```
10 minute time window + 1280px display = ~1 second buckets (best resolution)
8 day time window + 3840px display = ~30 minute buckets (second best resolution)
8 day time window + 1280px display = ~60 minute buckets (third best resolution)
```

Larger time windows and lower display resolutions result in lower chart resolution.

### Chart Resolution Example

Here is a series of charts with increasing time window for the _same_ display resolution (1280px).
* When the time window increases from 10 minutes to 2 hours (12 fold), the bucket size increases from 1 sec to 12 sec and the number of buckets remains the same.
* In contrast, when the time window increases from 2 to 6 hours (3 fold), the bucket intervals increase from 12 to 60 sec (5 fold) and the number of buckets is reduced proportionately: 600 * 3/5 = 360.

  - 10-minute window: 600 point buckets across, with ~1 sec buckets.

    ![10 m resolution](images/chart_resolution_10m.png)

  - 2-hour window: 600 point buckets across, with ~12 sec buckets.

    ![2h resolution](images/chart_resolution_2h.png)

  - 6-hour window: 360 point buckets across, with ~60 sec buckets.

    ![6h resolution](images/chart_resolution_6h.png)

### The align() Function and Resolution

The [`align()` function](query_language_reference.html#filtering-and-comparison-functions) lets you specify the size of the buckets&mdash;45 minute, 2 hour, 1 day, etc.&mdash;into which the points are grouped. However, the supported chart resolution is the most granular view you can get. Therefore, for the 1-week time window + 3840px screen example, specifying `align(15m,...)` does not result in 15 minute buckets being displayed on the screen because the ~30 minute buckets are already associated with the chart. If you were to use the `align()` function, the query service first aligns the values to 15 minute buckets, and then takes two aligned values and summarize those based on the Summarize By method.

{% include note.html content="To improve the performance of an aggregation, the query service will sometimes pre-align an expression. For details, see [Bucketing with align()](query_language_align_function.html)." %}

## Improve Display Speed with the Sampling Option

It's often not necessary to examine the complete set of time series. That's why you can limit the number of time series to 100 for new charts.

To affect all dashboards, turn on **Sampling** in your preferences.
1. Click the gear icon in the top right corner.
2. Click your account name.
3. Turn **Sampling** on.
![sampling preference](images/sampling_preference.png)

If the **Sampling** preference is **On**:
* The maximum number of time series that's displayed during chart creation or edit is 100.
* You're prompted whether you'd like to turn off the limitation, as shown in the screenshot below.
  - **Turn off Sampling** removes the limit for the current chart.
  - **Always off** removes the limit for all charts.

![sampling query during chart create](images/sampling_during_chart_create.png)

To temporarily change the sampling behavior for a chart, use the **Sampling** menu in the top right. You cannot save this change (or other changes made through the options this toolbar).

![sampling toggle during chart edit](images/sampling_toggle.png)


## Do More!

* Customize your chart. See the [Chart Reference](ui_chart_reference.html) for details.
* [Embed a chart](ui_sharing.html#embed-a-chart-in-other-uis) in another product or on another website.

<!--
* KB article: [How to Filter a Chart so it Displays Only Metrics with Certain Point Tags] (https://help.wavefront.com/hc/en-us/articles/4406632325140-How-to-filter-a-charts-displayed-point-tags 
-->
