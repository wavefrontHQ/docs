---
title: Customizing Chart Resolution and Units
keywords: getting started
tags: [getting started, charts, best practice, videos]
sidebar: doc_sidebar
permalink: charts_customizing.html
published: false
summary: Learn about the Wavefront chart time window and display resolution, and how to configure the units displayed in chart axes and legends.
---
In most cases, Wavefront groups data points into time interval buckets and maps the buckets to display points. You can view information about those buckets and you can customize them from the chart editor.


## Chart Resolution

Although Wavefront accepts and stores data at up to 1 second resolution, Wavefront charts display that granularity only for small time windows on high-resolution displays. In most cases, Wavefront groups data points into time interval buckets and maps the buckets to display points. Wavefront lets you select a [summarization method](charts.html#summarize-by) for grouping (or summarizing) points into buckets.

Chart resolution is the bucket time interval, and it displays in the **Horizontal Scale** field in the lower-left corner of a chart.  The following chart has 240 point buckets and the resolution of each bucket is 30 sec. If a source is sending 1 point per second, each bucket summarizes 30 points. On the other hand, if the source is sending 1 point every minute, no summarization occurs. If you choose the Count summarization method you can see how many points are in each bucket.
![resolution](images/chart_resolution.png)

### Factors Affecting Chart Resolution

Chart resolution is determined by the chart [time window](ui_examine_data.html#select-the-chart-time-window) and the dedicated display resolution. Consider the following chart time window and display resolution examples, and the bucket size they typically have:

```
10 minute time window + 1280px display = ~1 second buckets (best resolution)
8 day time window + 3840px display = ~30 minute buckets (second best resolution)
8 day time window + 1280px display = ~60 minute buckets (third best resolution)
```

Larger time windows and lower display resolutions each result in progressively lower chart resolution.

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

{% include note.html content="In order to improve the performance of an aggregation, Wavefront will sometimes pre-align an expression. For details, see [Bucketing with align()](query_language_align_function.html)." %}

## Units in Chart Axes and Legends

Wavefront supports several options to control how units display in chart axes and legends.  All of these option affect only the display of data and do not change the underlying stored data values, or the results of queries made directly against the API.  Any constants used in queries, including thresholds, also continue to use the underlying raw data without unit scaling.

### Unit Prefixes
Charts support two unit prefixes: **SI** and **IEC/Binary**.
* SI unit prefixes (k, M, G, T, P, E, Z, Y) increment by a factor of 1000 and are used by default. For details on SI units, see Wikipedia or a similar source.
* IEC/Binary prefixes (Ki, Mi, Gi, Ti, Pi, Ei, Zi, Yi) increment by a factor of 1024.

To display data in axes and legends with IEC/Binary unit prefixes, select the **IEC/Binary Unit Prefixes** check box. A data point with value 1024 x 1024 = 1,048,576 displays as "1.000Mi", instead of "1.049M".

Options to show the underlying raw data are not affected by the unit prefix. Legend displays when holding down the shift button while moving the mouse and Tabular View charts with the **Show Raw Values** option selected continue to display raw data without any prefixes.

### Dynamic Units
Dynamic units automatically adjusts the scaling prefixes and units assigned to displayed data to favor clearer display.  When enabled, dynamic units causes two types of transformations:

- When an axis is labeled with a unit that starts with one of the SI or IEC/Binary prefixes, the display logic first normalizes the data value with the labeled prefix before assigning a new prefix and adjusting the unit as appropriate.

  For example, if an axis is labeled "MPPS" (Mega PPS, or 1 million PPS), and the underlying data has a value of 2000, the displayed value with "Dynamic units" enabled would be "2.000B PPS", rather than "2.000k MPPS".

  Options to show the underlying raw data are not affected, so the above example displays "2000 MPPS" if, e.g., the shift key is held down while a legend is rendered.

- When an axis is labeled with a unit that exactly matches one of the time units, (ys, zs, as, fs, ps, ns, us, ms, s, min, hr, day, wk, mo, yr), the display logic for axes and legends automatically first normalizes the underlying data to seconds.  Then it displays the data using units ys through s if the normalized data magnitude is < 60, or automatically scales the data using larger time unit if the magnitude is > 60, with the goal of keeping the magnitude as small as possible.

  For example, if the underlying data is 60,000 and the axis is labeled with ms (milliseconds), this results in a display of "1.000 min".  If data is still 60,000 and the axis is labeled with "s", then the display is "16.67 hr".  If the underlying data is again 60,000 and the axis is labeled with us (microseconds), it displays "60.00m s".

  Options to show the underlying raw data are not affected, so the above example displays "60000" with whatever unit label is specified when you specify raw data display.

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
