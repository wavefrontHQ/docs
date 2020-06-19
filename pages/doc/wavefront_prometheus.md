---
title: Using Prometheus Queries in Wavefront
keywords: query language
sidebar: doc_sidebar
published: true
permalink: wavefront_prometheus.html
summary: Run Prometheus from the Wavefront query line
---

Starting with release 2020.26, Wavefront includes support for Prometheus queries.
* Run Prometheus queries directly from the Wavefront query line. The corresponding chart shows the information you'd expect.
* Wavefront query language includes new functions and operators that allow you to "translate" any Prometheus query to a ts() query and use it with the rich set of existing ts() query language functions.

## How to Run Prometheus Queries

1. Create or edit a chart.
2. Start typing your Prometheus query .
3. Make changes to the visualization.
  * See [Create and Customize Charts](ui_charts.html) for an intro.
  * See [Chart Reference](ui_chart_reference) for details.

![Prometheus query](images/prometheus_sample.png)

## Differences Between Prometheus and ts() Queries

Wavefront supports Prometheus functions out of the box, with the following minor differences.

<table style="width: 100%;">
<tbody>
<tr>
<td width="25%"><strong>sort(), sort_desc()</strong>
</td>
<td width="75%">Prometheus has 2 functions to show the data order in the Console view. Because Wavefront visualizes queries in charts instead of a console, we don't support this option.
</td></tr>
<tr>
<td width="25%"><strong>count_values()</strong>
</td>
<td width="75%">The Prometheus <strong>count_values</strong> aggregation function is not supported. <a href="proxies_histograms.html">Wavefront histograms</a> and <a href="query_language_reference.html#histogram-functions">histogram functions</a> allow you to perform the corresponding tasks -- and more!
</td></tr>
<tr>
<td width="25%"><strong>topk(), bottomk()</strong>
</td>
<td width="75%">The topk() and bottomk() functions work slightly differently in Prometheus and Wavefront.
<ul>
<li>Prometheus computes topk() and bottomk() at the point level. It picks the top points at each <strong>timestamp</strong>.</li>
<li>Wavefront computes topk() and bottomk() at <strong>time series level</strong>. It returns the top or bottom series (based on the avg/min/max... value). </li>
</ul>
<p>On the Wavefront query line, topk() and bottomk() always return results based on the time series. </p>
</td></tr>
</tbody>
</table>



## Limitations

While you can run queries directly from your chart's query line, there are currently a few limitations.

* Autocomplete is not currently supported for elements of PromQL. However, autocomplete for metrics that you use inside your query continues to be supported.
* You can use chart variables only if the variable works from the Prometheus query line.
* You cannot currently create an alert directly from a Prometheus query. Even though the  **Create Alert** menu option is available, it's not actually supported.
