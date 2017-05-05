---
title: Chart Resolution
keywords: getting started
tags: [getting started, charts]
sidebar: doc_sidebar
permalink: charts_resolution.html
summary: Learn about Wavefront chart resolution. 
---

Chart resolution is based on two key factors: time window and dedicated screen pixels for the displayed chart. For example (assuming the browser is full-screen), a 10-minute time window on a 13" screen versus a 1-week time window on a 13" screen versus a 1-week time window on a 27" screen will all have different resolutions. A smaller time window and larger number of dedicated pixels result in higher supported resolution:

```
10-minute time window + 13" screen = best resolution (e.g. ~1-second buckets)
1-week time window + 27" screen = second best resolution (e.g. ~30-minute buckets)
1-week time window + 13" screen = third best resolution (e.g. ~60-minute buckets)
```

In the 1-week time window + 27" screen example, the chart groups points into ~30 minute buckets and summarizes them based on your [**Summarize By**](charts.html#summarize-by) selection. 

The [`align()` function](query_language_align_function.html) gives you the option of grouping the points in 45 minute buckets, 2-hour buckets, 1-day buckets, etc, however the supported resolution is the most granular view you can get. In the 1-week time window + 27" screen example, specifying `align(15m,)` does not result in 15-minute buckets being displayed on the screen due to the ~30-minute buckets already associated with the chart. If you were to use the `align()` function, Wavefront first aligns the values into 15-minute buckets and then takes two aligned values and summarizes those based on the Summarize By method.

For a video overview of resolution, see

{% include video.html file="r8frqgquvb" %}




