---
title: Using PromQL in Wavefront
keywords: query language
sidebar: doc_sidebar
published: true
permalink: wavefront_prometheus.html
summary: Run PromQL queries in the Wavefront Query Editor
---

Starting with release 2020.26, Wavefront includes support for PromQL. You can run PromQL queries directly in the Wavefront Query Editor. The corresponding chart shows the information you'd expect.

## How to Run PromQL Queries

1. Create or edit a chart.
2. Start typing your PromQL query.
3. Make changes to the visualization.
  * See [Create and Customize Charts](ui_charts.html) for an intro.
  * See [Chart Reference](ui_chart_reference.html) for details.

![Prometheus query](images/prometheus_sample.png)

## How PromQL Queries Can Differ in Wavefront.

Wavefront supports most PromQL functions and operators out of the box. There are a small number of differences.

<table style="width: 100%;">
<tbody>
<tr>
<td width="25%"><strong>sort(), sort_desc()</strong>
</td>
<td width="75%">PromQL sort() and  sort_desc() show the data order in the Console view. Because Wavefront visualizes queries in charts instead of a console, we don't support this option.
</td></tr>
<tr>
<td width="25%"><strong>count_values()</strong>
</td>
<td width="75%">The PromQL <strong>count_values</strong> aggregation function is not supported. <a href="proxies_histograms.html">Wavefront histograms</a> and <a href="query_language_reference.html#histogram-functions">histogram functions</a> allow you to perform the corresponding tasks -- and more!
</td></tr>
<tr>
<td width="25%"><strong>topk(), bottomk()</strong>
</td>
<td width="75%">The topk() and bottomk() functions work slightly differently in PromQL and Wavefront query language.
<ul>
<li>PromQL computes topk() and bottomk() at the point level. It picks the top points at each <strong>timestamp</strong>.</li>
<li>Wavefront computes topk() and bottomk() at <strong>time series level</strong>. It returns the top or bottom series (based on the avg/min/max... value). </li>
</ul>
<p>In the Wavefront Query Editor, topk() and bottomk() always return results based on the time series. </p>
</td></tr>
<tr>
<td width="25%"><strong>ignore, on, group_left, group_right</strong>
</td>
<td width="75%">Wavefront does not support ignore, on, group_left, group_right for vector matching with Prometheus queries.
</td></tr>
<tr>
<td><strong>=~, !~</strong>
</td>
<td>Wavefront does not support instant vector selectors (=~, !~) for regex matching in labels. However, you can use [wildcard characters](query_language_reference.html#wildcards-aliases-and-variables) in PromQL queries.
</td></tr>
<tr>
<td><strong>subquery</strong>
</td>
<td>Wavefront does not support the PromQL subquery feature.
</td></tr>
</tbody>
</table>

## Limitations

While you can run queries directly in the Wavefront Query Editor, there are currently a few limitations.

* Autocomplete is not currently supported for PromQL functions and operators. However, autocomplete for metrics that you use inside your query continues to be supported.
* The Wavefront query language supports [using a query name as a chart variable](query_editor.html#use-chart-variables) in other queries for the same chart.
  - You can use a query name as a chart variable in a PromQL query if the named query was also a PromQL query.
  - You cannot use a query name as a chart variable if the named query is a Wavefront QL query.
* You cannot currently create an alert directly from a PromQL query. Even though the  **Create Alert** menu option is available, it's not actually supported.
