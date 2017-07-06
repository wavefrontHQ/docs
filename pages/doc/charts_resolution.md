---
title: Chart Resolution
keywords: getting started
tags: [getting started, charts, videos]
sidebar: doc_sidebar
permalink: charts_resolution.html
summary: Learn how Wavefront summarizes and displays data based on the chart time window and display resolution. 
---

Although Wavefront accepts and stores data at up to 1 second resolution, Wavefront charts display that granularity only for small time windows on high resolution displays. In most cases, Wavefront groups data points into time interval buckets and the buckets are mapped to display points. Wavefront lets you select a [summarization method](charts.html#summarize-by) for grouping (or summarizing) points into buckets.

Chart resolution is the bucket time interval and it displays in the **Horizontal Scale** field in the lower-left corner of a chart.  The following chart has 240 point buckets and the resolution of each bucket is 30 sec. If the source is sending 1 point per second, each bucket summarizes 30 points. On the other hand, if the source is sending 1 point every minute, no summarization occurs. If you choose the Count summarization method you can see how many points are in each bucket.
![resolution](images/chart_resolution.png)

## Factors Affecting Chart Resolution

Chart resolution is determined by two factors: chart [time window](dashboards_interacting.html#selecting-chart-time-windows) and dedicated display resolution. Consider the following chart time window and display resolution examples and the bucket size they would typically have:

```
10 minute time window + 1280px display = ~1 second buckets (best resolution)
8 day time window + 3840px display = ~30 minute buckets (second best resolution)
8 day time window + 1280px display = ~60 minute buckets (third best resolution)
```

You can see that larger time windows and lower display resolutions each result in progressively lower chart resolution.

### Example

Here is a series of charts with increasing time window for the _same_ display resolution (1280px). When the time window increases from 10 minutes to 2 hours (12 fold), the bucket size increases proportionately from 1 sec to 12 sec and the number of buckets remains the same, but when the time window increases from 2 to 6 hours (3 fold), the bucket intervals increase from 12 to 60 sec (5 fold) and the number of buckets is reduced proportionately: 600 * 3/5 = 360.

- 10-minute window: 600 point buckets across, with ~1 sec buckets

  ![10 m resolution](images/chart_resolution_10m.png)

- 2-hour window: 600 point buckets across, with ~12 sec buckets

  ![2h resolution](images/chart_resolution_2h.png)

- 6-hour window: 360 point buckets across, with ~60 sec buckets.

  ![6h resolution](images/chart_resolution_6h.png)
  
## Video Overview

Here's video that demonstrates resolution and summarization options and use cases:

{% include video.html file="r8frqgquvb" %}

## The align() Function and Resolution

The [`align()` function](query_language_reference.html#filtering-and-comparison-functions) lets you specify the size of the buckets&mdash;45 minute, 2 hour, 1 day, etc.&mdash;into which the points are grouped. However, the supported chart resolution is the most granular view you can get. Therefore, for the 1-week time window + 3840px screen example, specifying `align(15m,...)` would not result in 15 minute buckets being displayed on the screen due to the ~30 minute buckets already associated with the chart. If you were to use the `align()` function, Wavefront would first align the values into 15 minute buckets and then take two aligned values and summarize those based on the Summarize By method.

{% include note.html content="In order to improve the performance of an aggregation, Wavefront will sometimes pre-align an expression. For details, see [The align() Function](query_language_align_function.html)." %}








