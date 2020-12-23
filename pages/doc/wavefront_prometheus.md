---
title: Using PromQL in Wavefront
keywords: query language
sidebar: doc_sidebar
published: true
permalink: wavefront_prometheus.html
summary: Run PromQL queries in the Wavefront Query Editor
---

Starting with release 2020.26, Wavefront has supported PromQL queries. In release 2020-46.x, we added admin-level preferences and a query line GUI. Here's what's supported:
* Administrators have control over user defaults:
  - Administrators can set the Organization Settings New User Defaults to allow users to write queries in PromQL.
  - If queries in PromQL are enabled, administrators can set other options.
* Users can then type either PromQL or WQL (Wavefront Query Language) queries into the Query Editor.
  - The Query Editor parses the query correctly depending on the syntax elements (PromQL or Wavefront QL) it encounters. The corresponding chart shows the information you'd expect.
  - If the Query Editor encounters PromQL, users can click a button to be in PromQL mode. In PromQL mode, users can see the translation to WQL and translate the query if the want.
  - Users can add charts that use PromQL to dashboards, create alerts from charts that use PromQL, and use PromQL queries in the query line of a Create Alert page.

{% include note.html content="Your Wavefront site administrator controls PromQL behavior. If you don't have some of the features, get in touch with the site administrator." %}

## Set PromQL Site Preferences (Administrator Only)

Administrator users can change the Query Settings to support PromQL.
* If **PromQL Support** is *not* enabled, other users cannot use PromQL or change PromQL preferences.
* If **PromQL Support** is enabled, admins can set additional New User Default query settings, and other users can override those settings.

To set PromQL preferences:

1. From the gear icon, select **Organization Settings**
2. Inside **Query Settings**, select the **Users can write queries in PromQL** check box.
3. Select the default query language for new users.
4. Enable **Always save queries as WQL** if you expect that some users prefer WQL.
5. Enable **Show WQL translation** to show hover text with a translation to WQL for all PromQL queries. Enable this check box if you expect users want to learn WQL.

## Set PromQL Preferences (All Users)

If your site administrator has enabled PromQL Support, you can control some aspects of PromQL.

{% include note.html content="If you can only choose between Query Editor and Chart Builder, PromQL is not supported on your Wavefront instance. Contact your site admin." %}


1. From the gear icon, select your name.
2. In the **Query Settings** section, select
    * The default query language
    * The default way of building queries. Select Query Builder if you expect to user PromQL frequently. Chart Buider was designed for WQL and doesn't support PromQL.
    * Whether to show a translation to WQL as hover text.

## Use PromQL in Charts and Alerts

This example shows how the Query Editor

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Create or edit a chart or alert.</li>
<li>Start typing your PromQL query. Query Editor recognizes the PromQL query (ts() is not part of the query) and highlights the WQL button to let you switch. </li>
<li>Switch to PromQL to see the WQL query as hover text. You can also convert from here.  </li>
<li>Finally, return to WQL is that's your primary mode of working. </li></ol></td>
<td width="60%"><img src="/images/promql_button.png" alt="metric only in query line, WQL is highlighted">
<img src="/images/promql_hover.png" alt="query line in promql, with hover text ">
</td>
</tr>
</tbody>
</table>

Next, you can make changes to the visualization.
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
<td markdown="span">Wavefront does not support instant vector selectors (=~, !~) for regex matching in labels. However, you can use [wildcard characters](query_language_reference.html#wildcards-aliases-and-variables) in PromQL queries.
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
