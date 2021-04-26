---
title: Using PromQL in Wavefront (Beta)
keywords: query language
sidebar: doc_sidebar
permalink: wavefront_prometheus.html
summary: Run PromQL queries in the Wavefront Query Editor
---

Starting with release 2020.26, Wavefront includes support for PromQL. In this Beta of PromQL you can:
* Run PromQL queries directly in the Wavefront Query Editor.
  The Query Editor parses the query correctly depending on the syntax elements (PromQL or Wavefront QL) it encounters. The corresponding chart shows the information you'd expect. There is no other indication in the UI whether the query is Wavefront QL or PromQL.
* Add charts that use PromQL to dashboards.
* Create alerts from charts that use PromQL
* Use PromQL queries in the query line of a Create Alert page.

{% include note.html content="PromQL Support Beta is available on demand. Contact customer support to discuss having it enabled. " %}

## How to Use PromQL Queries

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
<td markdown="span">Wavefront does not support instant vector selectors (=~, !~) for regex matching in labels. However, you can use [wildcard characters](query_language_reference.html#partial-regex-wildcards-aliases-and-variables) in PromQL queries.
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
* If an alert uses a PromQL query, the [Backtesting option](alerts_manage.html#backtesting) currently doesn't work correctly.

## How Wavefront Executes PromQL Queries

The following diagram shows how Wavefront handles a Wavefront QL (`ts()`) query and a PromQL query.

![Image showing TS and PromQL execution paths, explained in text](images/ts_and_promql.png)

The top row shows the `ts()` query execution:

1. The user enters the query into the Query Editor.
2. The Wavefront service processes the query and shows the results in the chart, uses the result to determine whether an alert should fire, etc.

The bottom row shows the PromQL query execution:
1. The user enters the query into the Query Editor.
2. The translation service translates the query into the corresponding `ts()` query.
3. The translated query is automatically sent to the Wavefront service.
4. The Wavefront service processes the query and shows the results in the chart, uses the result to determine whether an alert should fire, etc.
