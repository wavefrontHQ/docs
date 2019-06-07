---
title: Create and Customize Charts
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
permalink: ui_charts_v2.html
summary: Create charts, add and manage queries, and customize the chart.
---

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">Wavefront charts allow you to examine what you need to know about your environment.
<ul>
<li>Create a chart and fine-tune the data it displays using filters and functions.</li>
<li>Customize chart appearance.</li>
<li>Use chart variables, set the time window, create alerts, and much more!</li></ul></td>
<td width="20%"><a href="ui_charts.html"><img src="/images/classic_button.png" alt="click here for the classic doc"/></a></td>
</tr>
</tbody>
</table>

{% include shared/badge.html content="You must have [Dashboard permission](permissions_overview.html) to save a chart to a dashboard. If you do not have permission, UI menu selections and buttons required to perform the task are not visible." %}

## Create a Chart

You can create a chart from a dashboard or from the task bar.

### Create a Chart from a Dashboard

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Edit a dashboard or select <strong>Dashboards > Create Dashboard</strong> from the task bar to create a new one. </li>
<li>Drag the metrics or chart type widget onto the canvas</li>
<li>Select metrics, filters, and functions and click <strong>Save</strong> in the top right. </li>
</ol></td>
<td width="60%"><img src="/images/v2_create_dashboard.png" alt="create dashboard"></td>
</tr>
</tbody>
</table>


### Create a Chart from the Task Bar

**To create a chart from the task bar:**
1. Select **Dashboards > Create Chart**.
2. (Optional) In the top left, specify a chart name.
2. Select a metric and an optional filter and function.
3. In the top right, click **Save** and specify the dashboard.

![create chart](/images/v2_create_chart.png)


## Fine-Tune Chart Metrics from the Queries Tab

From the Queries tab, every chart lets you fine-time the metrics that come in and apply filters and functions.

**Note:** Your user preferences determine whether the Queries tab shows Chart Builder or the more advanced Query Editor. However, if you look at a query that was built with Query Builder, you'll see that.

### Chart Builder

[Wavefront Chart Builder](query_language_query_builder.html) lets you
* Create a chart by selecting metrics or a chart type.
* Select one or more metrics directly or start with an integration.
* Specify filters and functions, e.g., to aggregate multiple time series.

In the image below, we selected a metric, narrowed down the source, and we're just selecting a function.

![v2 chart builder](images/v2_chart_builder_simple.png)

### Query Editor

Instead of using Chart Builder, you can click the toggle and explicitly enter [Wavefront Query Language](query_language_reference.html) expressions into the query field.

**Note**: After you switch, to Query Editor, you cannot return to Query Builder.

We can get the metric we selected above with the following query.

`max(ts(~sample.network.bytes.recv, source="app-12" or source="app-16"))`

## Hide, Clone, or Delete Queries

You can easily hide, clone, or delete queries from the Queries tab.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ul><li>
To clone a query, click the Clone icon. A copy of the query appears below the query itself. </li>
<li>To delete a query, click the Delete icon. We don't prompt for confirmation. </li>
<li>To hide or redisplay a query, click the Hide/Show icon.  </li>
</ul>Save your changes.
</td>
<td width="60%"><img src="/images/ui_v2_hide_show.png" alt="hide query"></td>
</tr>
</tbody>
</table>




## Customize How the Chart Looks

All users [set the chart time window](ui_examine_data.html#select-the-chart-time-window) and [isolate sources and series](ui_examine_data.html#isolate-sources-or-series) without editing the chart.

Users with Dashboard permissions can make many other changes such as selecting the chart type or customizing the axes and colors. Here are some tasks you can perform. In many cases, they're possible only for certain chart types.

### Change the Text that Explains What the Colors Mean (Legend)

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ul><li>
To clone a query, click the Clone icon. A copy of the query appears below the query itself. </li>
<li>To delete a query, click the Delete icon. We don't prompt for confirmation. </li>
<li>To hide or redisplay a query, click the Hide/Show icon.  </li>
</ul>Save your changes.
</td>
<td width="60%"><img src="/images/ui_v2_hide_show.png" alt="hide query"></td>
</tr>
</tbody>
</table>



For details, see the [Chart Reference](ui_chart_reverence_v2.html).



## Units in Chart Axes and Legends

You can control how units display in chart axes and legends. The options affect *only the display* of data.

Changing the units used by the UI:
* Does not change the actual data values
* Does not change the results of queries made with the API.
* Does not change constants used in queries, including thresholds

### Example:


### Unit Prefixes
Charts support these unit prefixes:
* **SI unit** prefixes (k, M, G, T, P, E, Z, Y) increment by a factor of 1000 and are used by default.
* **IEC/Binary** prefixes (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi) increment by a factor of 1024.

To display data in axes and legends with IEC/Binary unit prefixes, select the **IEC/Binary Unit Prefixes** checkbox. A data point with value 1024 x 1024 = 1,048,576 displays as "1.000Mi", instead of "1.049M".

The legends displayed when you hold down the shift button while moving the mouse and the Tabular View charts with the **Show Raw Values** option selected display raw data without prefixes.

### Dynamic Units
Dynamic units automatically adjust the scaling prefixes and units assigned to displayed data to favor clearer display.  When enabled, dynamic units result in these changes:

- When an axis is labeled with a unit that starts with one of the SI or IEC/Binary prefixes, the display logic
    1. First normalizes the data value with the labeled prefix.
    2. Then assigns a new prefix and adjusting the unit.

  For example, if an axis is labeled `MPPS` (Mega PPS, or 1 million PPS), and the underlying data has a value of 2000, the displayed value with `Dynamic units` enabled is `2.000B PPS` and not `2.000k MPPS`.

  Options to show the underlying raw data are not affected, so the above example displays `2000 MPPS` if, for example, you hold down the Shift key while a legend is rendered.

- When an axis is labeled with a unit that exactly matches one of the time units, (ys, zs, as, fs, ps, ns, us, ms, s, min, hr, day, wk, mo, yr), the display logic for axes and legends keeps the magnitute as small as possible. As a result, we:
  1. First normalize the underlying data to seconds.
  2. Then display the data using units ys through s if the normalized data magnitude is < 60, or automatically scales the data using larger time unit if the magnitude is > 60.

  For example, if the underlying data is 60,000 and the axis is labeled with ms (milliseconds), this results in a display of `1.000 min`.  If data is still 60,000 and the axis is labeled with `s`, then the display is `16.67 hr`.  If the underlying data is again 60,000 and the axis is labeled with us (microseconds), it displays `60.00m s`.

  Options to show the underlying raw data are not affected. When you specify raw data display, the example above displays `60000` with the specified unit label.

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


## Chart Resolution

Wavefront accepts and stores data at up to 1 second resolution. Wavefront charts display that granularity only for small time windows on high-resolution displays. In most cases, Wavefront *groups* data points into time buckets and maps the buckets to display points.

**Chart resolution** is the bucket time interval. It displays in the **Horizontal Scale** field in the lower-left corner of a chart.

![resolution](images/chart_resolution.png)

The chart above has 240 point buckets and the resolution of each bucket is 30 sec. If a source is sending 1 point per second, each bucket summarizes 30 points. On the other hand, if the source is sending 1 point every minute, no summarization occurs. If you choose the Count summarization method you can see how many points are in each bucket.

### Factors Affecting Chart Resolution

Chart resolution is determined by:
* The chart [time window](ui_examine_data.html#select-the-chart-time-window)
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
  * When the time window increases from 10 minutes to 2 hours (12 fold), the bucket size increases proportionately from 1 sec to 12 sec and the number of buckets remains the same.
  * In contrast, when the time window increases from 2 to 6 hours (3 fold), the bucket intervals increase from 12 to 60 sec (5 fold) and the number of buckets is reduced proportionately: 600 * 3/5 = 360.

  - 10-minute window: 600 point buckets across, with ~1 sec buckets

    ![10 m resolution](images/chart_resolution_10m.png)

  - 2-hour window: 600 point buckets across, with ~12 sec buckets

    ![2h resolution](images/chart_resolution_2h.png)

  - 6-hour window: 360 point buckets across, with ~60 sec buckets.

    ![6h resolution](images/chart_resolution_6h.png)

  ### The align() Function and Resolution

  The [`align()` function](query_language_reference.html#filtering-and-comparison-functions) lets you specify the size of the buckets&mdash;45 minute, 2 hour, 1 day, etc.&mdash;into which the points are grouped. However, the supported chart resolution is the most granular view you can get. Therefore, for the 1-week time window + 3840px screen example, specifying `align(15m,...)` does not result in 15 minute buckets being displayed on the screen because the ~30 minute buckets are already associated with the chart. If you were to use the `align()` function, Wavefront would first align the values into 15 minute buckets, and then take two aligned values and summarize those based on the Summarize By method.

  {% include note.html content="To improve the performance of an aggregation, Wavefront will sometimes pre-align an expression. For details, see [Bucketing with align()](query_language_align_function.html)." %}


## Do More!

* Customize your chart. See the [Chart Reference](ui_chart_reference.html) for details on options.
* Send [a link to a chart](ui_sharing.html#share-a-link-to-a-dashboard-or-chart) to a coworker (or to the customer success team if you need help).
* [Embed a chart](ui_sharing.html#embed-a-chart-in-other-uis) outside Wavefront.
