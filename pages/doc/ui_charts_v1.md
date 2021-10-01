---
title: Create and Customize Charts (v1)
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
permalink: ui_charts_v1.html
published: false
summary: Create charts, add and manage queries, and customize the chart.
---

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">
<br>
Wavefront charts allow you to examine what visualize metrics, create alerts, and more!
<ul>
<li>Create a chart and fine-tune the data it displays using filters and functions.</li>
<li>Customize chart appearance.</li>
<li>Use chart variables, set the time window, create alerts, and much more!</li></ul></td>
<td width="20%"><a href="ui_charts.html"><img src="/images/v2_button.png" alt="click here for the v2 doc"/></a></td>
</tr>
</tbody>
</table>

To visualize your data, you create Wavefront charts and fine-tune them. You can specify one or more related queries in each chart, set the chart time window, use variables, and select from many different visualization options (line, point plot, topk, etc.).

{% include shared/badge.html content="You must have [Dashboard permission](permissions_overview.html) to save a chart to a dashboard. If you do not have permission, UI menu selections and buttons required to perform the task are not visible." %}

## Create a Chart

To create a chart:
1. Select **Dashboards > Create Chart**.
2. Add one or more Wavefront Query Language queries in the Queries section of the chart.
   * New users prefer [Query Builder](query_language_query_builder.html).
   * Advanced users prefer the query editor, where you enter queries directly.


## Construct Queries

You can construct queries with Query Builder or Query Editor.

### Query Builder

[Wavefront Query Builder](query_language_query_builder.html) is a great option for users new to Wavefront. Query Builder constructs a query based on a set of components (metric name, source, source tag, and point tag filters, advanced functions) that you specify.

In the image below, we specified the metric name `~sample.requests.total.num`, point tag `az=us-west-1`, and a 10-minute moving average function in order to create the following query and chart: `mavg(10m, ts(~sample.requests.total.num, az="us-west-1"))`.

![query_builder_2](images/query_builder_2.png)

### Query Editor

Instead of using Query Builder, you can click the Query Builder toggle and explicitly enter [Wavefront Query Language](query_language_getting_started.html) expressions into the query field. For example:

`ts("requests.latency", tag="az-3" and not source="app-28")`

## Manage a Chart's Queries

When you construct a query, you can use functions such as `sum()`, `highpass()`, `mavg()`, etc. See [Wavefront Query Language Quick Reference](query_language_reference.html) for a complete list.

* To change which queries are associated with a chart, use the icons in the Query section.
   * Click the add icon (+) to the right of the query field to add a new query field and an additional query with a chart.
   * Click the clone icon to clone an existing query into a new query field. Cloning is recommended when you are using a [legend](ui_charts.html#legend) for a chart with several query fields.
   * Click the remove icon (-) to remove a query field.
* To rename a query, click the current query name (New Query is the initial default) and enter a name. The query name can be up to 50 characters and there's no restriction on characters you can use.

   ![rename_query_field](images/rename_query_field.png)

* To use the result of one query in another query in the same chart, use the query name like this:  `${<query_name}`. In the example below, `memory reclaimed` and `gc runs` are the names of two queries defined for the same chart.

   ![chart variable](images/chart_variable.png)

## Customize a Chart

All users can perform chart customizations such as [setting the chart time window](ui_examine_data.html#select-the-chart-time-window) and [isolating sources and series](ui_examine_data.html#isolate-sources-or-series). You can further customize your charts to suit your needs precisely. The chart configuration options are in the Chart section:

![chart_section](images/chart_section.png)

The configuration tabs (General, Axis, Style, etc.) and options depend on the chart type you choose.

The Wavefront UI uses SI and IEC/Binary notations to represent metric values on charts. See **Units in Chart Axes and Legends** below. For example, in the following chart, the values 5M , 10M, 15M  etc. are mega (M) values (ex: 5 M = 5 * 1000^2 = 5000000).

![SI_notation](images/SI_notation.png)

## Chart Resolution

Although Wavefront accepts and stores data at up to 1 second resolution, Wavefront charts display that granularity only for small time windows on high-resolution displays. In most cases, Wavefront groups data points into time interval buckets and maps the buckets to display points.

**Chart resolution** is the bucket time interval. It displays in the **Horizontal Scale** field in the lower-left corner of a chart.

![resolution](images/chart_resolution.png)

The chart above has 240 point buckets and the resolution of each bucket is 30 sec. If a source is sending 1 point per second, each bucket summarizes 30 points. On the other hand, if the source is sending 1 point every minute, no summarization occurs. If you choose the Count summarization method you can see how many points are in each bucket.

### Factors Affecting Chart Resolution

Chart resolution is determined by the chart [time window](ui_examine_data.html#select-the-chart-time-window) and the display resolution. Consider the following chart time window and display resolution examples, and the bucket size they typically have:

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

## Units in Chart Axes and Legends

You can control how units display in chart axes and legends.  The options affect *only the display* of data and do not change the underlying stored data values, or the results of queries made directly against the API.  Any constants used in queries, including thresholds, also continue to use the underlying raw data without unit scaling.

### Unit Prefixes
Charts support these unit prefixes:
* **SI unit** prefixes (k, M, G, T, P, E, Z, Y) increment by a factor of 1000 and are used by default.
* **IEC/Binary** prefixes (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi) increment by a factor of 1024.

To display data in axes and legends with IEC/Binary unit prefixes, select the **IEC/Binary Unit Prefixes** checkbox. A data point with value 1024 x 1024 = 1,048,576 displays as "1.000Mi", instead of "1.049M".

Options to show the underlying raw data are not affected by the unit prefix. The legends displayed when you hold down the shift button while moving the mouse and the Tabular View charts with the **Show Raw Values** option selected display raw data without prefixes.

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

## Do More!

* Customize your chart. See the [Chart Reference](ui_chart_reference.html) for details on options.
* Send [a link to a chart](ui_sharing.html#share-a-link-to-a-dashboard-or-chart) to a coworker (or to the customer success team if you need help).
* [Embed a chart](ui_sharing.html#embed-a-chart-in-other-uis) outside Wavefront.
