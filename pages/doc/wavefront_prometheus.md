---
title: Using PromQL in Wavefront
keywords: query language
sidebar: doc_sidebar
permalink: wavefront_prometheus.html
summary: Run PromQL queries in the Wavefront Query Editor
---

Starting with release 2020-26.x, Wavefront has supported PromQL queries. With the 2021-17.x release, we add admin-level organization settings and a query line GUI that includes a translation option.

* Administrators have control over user defaults:
  - On the Organization Settings page (New User Defaults) administrators can enable users to write queries in PromQL.
  - If queries in PromQL are enabled, administrators can also set other options.
* Users can then type PromQL or Wavefront query language (WQL) queries into the Query Editor.
  - If users enter a PromQL query when **PromQL** is selected, or a Wavefront query language query, when **WQL** is selected, the Query Editor parses the query. The corresponding chart shows the information you'd expect.
  - If users enter a PromQL query when **WQL** is selected, or the reverse, the Query Editor doesn't parse the query and displays a syntax error.
  - In PromQL mode, users can see the translation to Wavefront query language and translate the query if that is set in their preferences.
  - Users can add charts that use PromQL to dashboards, create alerts from charts that use PromQL, and use PromQL queries in the query line of a Create Alert page.

{% include note.html content="Your Wavefront site administrator controls PromQL behavior. If you don't have some of the features, get in touch with the site administrator." %}


## Set PromQL Organization Settings (Administrator Only)

Users with **Accounts, Groups & Roles**  permissions can navigate to the **Organization Settings** and enable the PromQL support.
* If **PromQL Support** is *not enabled*, other users cannot use PromQL or change PromQL user preferences.
* If **PromQL Support** is *enabled*, administrators can set additional New User Default query settings, and other users can override those settings.

To set PromQL settings for your organization:

1. From the gear icon, select **Organization Settings**.
2. Under **Query Settings**, select the **Users can write queries in PromQL** check box.
3. Select the default query language for new users.
4. Select the default way for building queries.

   If the default language is set to **PromQL**, the only way to build queries is to use the Query Editor.<!---5. Enable **Always save queries as WQL** if you expect that some users prefer Wavefront query language.The queries will be always translated and saved in Wavefront query language.--->

5. Enable **Show WQL translation** to show the translation for all PromQL queries.

   Select this check box if you expect that users want to learn Wavefront query language. The translation appears only if the query is with a valid PromQL syntax. Otherwise, you see an error.

## Set PromQL User Preferences (All Users)

If an administrator has enabled PromQL support (discussed above), each user can control some aspects of PromQL.

{% include note.html content="If you can only choose between Query Editor and Chart Builder, then PromQL is not supported on your Wavefront instance. Contact a site administrator with **Accounts, Groups, and Roles** permission." %}

1. From the gear icon, select your username.
2. Under **Query Settings**, select:
    * The default query language.
    * The default way of building queries.

      If your default language is set to **PromQL**, you can build your queries only in the Query Editor. Chart Builder was designed for Wavefront query language and doesn't support PromQL.
    * Whether to show the translation to Wavefront query language when you click inside the Query Editor.



## Video: Wavefront and PromQL

This short video shows how you can create a PromQL chart and an alert:

<p>
<iframe src="https://bcove.video/3tLRB6l" width="700" height="400" allowfullscreen="true" alt="Wavefront and PromQL"></iframe>
</p>

## Use PromQL in Charts and Alerts

This example shows how to use PromQL, when:

* An administrator has enabled PromQL support.
* The default query language is set to be Wavefront query language.
* The translation to Wavefront query language is enabled.

![Query settings when PromQL is enabled, WQL is the default language and translation to WQL is also available.](images/promql_query_settings.png)

If your preferred default language is PromQL, and you have selected to not see the translation to Wavefront query language, the button for converting to Wavefront query language is not available.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Create or edit a chart or alert.</li>
<li>Enter a PromQL query in the Query Editor.</li>
<li>Click inside the Query Editor to see the translation to Wavefront query language.</li>
<li>Finally, click the <strong>Convert to WQL</strong> button to convert to Wavefront query language if that's your primary mode. The query is translated to Wavefront query language. A small number of PromQL constructs are not supported, as discussed below. </li></ol></td>
<td width="60%"><img src="/images/promql_hover1.png" alt="query line in PromQL, with hover text that tells you can't switch the language without clearing the query"><p></p>
<img src="/images/promql_convert_button.png" alt="Button to convert to WQL.">
</td>
</tr>
</tbody>
</table>

Next, you can make changes to the visualization.
  * See [Create and Customize Charts](ui_charts.html) for an intro.
  * See [Chart Reference](ui_chart_reference.html) for details.

![Prometheus query](images/prometheus_sample.png)

## How PromQL Queries Can Differ in Wavefront

Wavefront supports most PromQL functions and operators out of the box. There are a small number of differences.

<table style="width: 100%;">
<tbody>
<tr>
<td width="25%"><strong>sort(), sort_desc()</strong>
</td>
<td width="75%">PromQL <strong>sort()</strong> and <strong>sort_desc()</strong> show the data order in the Console view. Because Wavefront visualizes queries in charts instead of a console, we don't support this option.
</td></tr>
<tr>
<td width="25%"><strong>count_values()</strong>
</td>
<td width="75%">The PromQL count_values aggregation function is not supported. <a href="proxies_histograms.html">Wavefront histograms</a> and <a href="query_language_reference.html#histogram-functions">histogram functions</a> allow you to perform the corresponding tasks -- and more!
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
</tbody>
</table>

## Limitations


* Autocomplete is not currently supported for PromQL functions and operators. However, autocomplete for metrics that you use inside your query continues to be supported.
* The Wavefront query language supports [using a query name as a chart variable](query_editor.html#use-chart-variables) in other queries for the same chart.
  - You can use a query name as a chart variable in a PromQL query if the named query was also a PromQL query.
  - You cannot use a query name as a chart variable if the named query is a Wavefront QL query.

## How Wavefront Executes PromQL Queries

The following diagram shows how Wavefront handles a Wavefront QL (`ts()`) query and a PromQL query.

![Image showing Wavefront query language (ts) and PromQL execution paths, explained in the text below](images/ts_and_promql.png)

The top row shows the `ts()` query execution:

1. The user enters the query into the Query Editor.
2. The Wavefront service processes the query and shows the results in the chart. It also uses the result to determine whether an alert should fire, etc.

The bottom row shows the PromQL query execution:
1. The user enters the query into the Query Editor.
2. The translation service translates the query into the corresponding `ts()` query.
3. The translated query is automatically sent to the Wavefront service.
4. The Wavefront service processes the query and shows the results in the chart. It also uses the result to determine whether an alert should fire, etc.

## More Info

New to Wavefront? Here are some links to get you started:
* [Getting Started Videos](videos_howto_start.html)
* [Dashboards Tutorials](tutorial_dashboards.html)
* [Alerts](alerts.html)
* [Query Language Quickstart](query_language_getting_started.html)
* [Query Language Videos](videos_query_language.html
