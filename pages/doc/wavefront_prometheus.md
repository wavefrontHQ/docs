---
title: Using PromQL in Wavefront
keywords: query language
sidebar: doc_sidebar
permalink: wavefront_prometheus.html
summary: Run PromQL queries in the Wavefront Query Editor
---

Wavefront supports both PromQL and WQL (Wavefront Query Language) queries. The Query Editor includes admin-level organization settings for enabling PromQL and a query line GUI that includes a translation option.

* Administrators have control over user defaults:
  - On the Organization Settings page (New User Defaults) administrators can enable users to write queries in PromQL.
  - If queries in PromQL are enabled, administrators can also set other options.
* Users can then type PromQL or Wavefront query language (WQL) queries into the Query Editor.
  - If users enter a PromQL query when **PromQL** is selected, or a Wavefront query language query, when **WQL** is selected, the Query Editor parses the query. The corresponding chart shows the information you'd expect.
  - If users enter a PromQL query when **WQL** is selected, or the reverse, the Query Editor doesn't parse the query and displays a syntax error.
  - In PromQL mode, users can see the translation to Wavefront query language and translate the query if that is set in their preferences.
  - Users can add charts that use PromQL to dashboards, create alerts from charts that use PromQL, and use PromQL queries in the query line of a Create Alert page.

{% include note.html content="Your Wavefront site administrator controls PromQL behavior. If you don't have some of the features, get in touch with your site administrator." %}


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

## Frequently Asked Questions

Wavefront supports most PromQL functions and operators out of the box. There are a small number of differences and best practices.


### FAQ: Do You Have Best Practices?

A few functions work differently in PromQL and Wavefront QL. Here are some best practices.

<table style="width: 100%;">
<tbody>
<tr>
<td width="25%"><strong>rate() </strong>
</td>
<td width="75%">If you use the PromQL rate() function on an instant vector in Wavefront UI provide the time resolution.<br>
<code>rate(metric[xm:ym]) </code><br>
where x is time span length, y is the resolution, m is the time unit minute.<br><br>
If you include the time resolution, Wavefront will automatically call align() on the translated query. If you don't include the time resolution, you might get different results depending on the monitor resolution. See <a href="ui_charts.html#chart-resolution">Chart Resolution</a> for details on how your monitor's resolution can affect how the chart looks.
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
</tbody>
</table>

### FAQ: Can I Use Variables in Wavefront?

Dashboard variables are a powerful feature in Wavefront.
* Wavefront users with **Dashboard** permissions can create [dashboard variables](dashboards_variables.html).
* All Wavefront users can select dashboard variable values at the top of dashboards, and can [specify variables inside a query](dashboards_variables.html#use-dashboard-variables-in-queries). When Wavefront runs the query, it automatically substitutes the current value of the variable with the selected value for the dashboard.

This approach to variables is different from PromQL variables.

* If the dashboard variable represents the actual value (or glob), use `=`.
* In the rare case that you want to explicitly use a regex, use `=~`


### FAQ: Can You Show Me a Query Example That Doesn't Translate?

In many cases the translation from PromQL to WQL is straightforward. You type the PromQL query into the query editor and click WQL to see the corresponding query in WQL.

However, the syntax for for joining queries in PromQL and in WQL is fundamentally different. In addition, Wavefront does not support the use of `ignore`, `on`, `group_left`, and `group_right` for vector matching with PromQL queries. However, after a bit of practice (and after looking at our examples and [this video](https://www.youtube.com/watch?v=SZhU8AO-SVk&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K&index=22&t=0s)) we expect you'll find joins in WQL quite powerful.

#### Joining Queries in WQL and PromQL

**Wavefront query language** has several options for [combining time series with joins](query_language_series_joining.html). Here's a summary of the syntax:
<br><br>
```
join(<<WQUERY1>>  AS ts1
INNER JOIN
<<WQUERY2>> AS ts2
USING(<<HOW TO JOIN METRICS>>),
metric='<<NEW METRIC NAME>>',
<<OUTPUT COLUMNS>>,
ts1 (edited)
```

In &lt;&lt;HOW TO JOIN METRICS&gt;&gt;, you specify the new output metric, the source you want to focus on, point tags in the output, and the value you want to use, as in this example:
```
metric='cf_app_memory_used_gb',               //New output metric name.
source=ts2.application_name,                  //What do you want to use as source.
<<OUTPUT COLUMNS>>,                           //Source and point tags in output.
ts1                                           //What value do you want to use as value
```

In **PromQL**, you specify Query 1, how to join the metrics, the output colums, and Query 2, as follows:
<br><br>
```
(<<QUERY1>> + on(<<HOW TO JOIN METRICS>>) group_left(<<OUTPUT COLUMNS>>) (<<QUERY2>>)
```

This section shows an example for how 2 queries can be combined with joins in WQL and PromQL.

#### Example Join in WQL

The following example joins two Wavefront queries (WQL 1 and WQL 2) using an inner join.

WQL 1:

```
ts(kubernetes.pod_container.status, cluster="a-cluster" and nodename="ip-*" and pod_name="a-pod" and namespace_name="a-namespace" and status="running")
```

WQL 2:
```
ts(kubernetes.pod_container.uptime, cluster="a-cluster" and nodename="ip-*" and pod_name="a-pod" and namespace_name="a-namespace")
```

WQL Join:
```
join(${WQL Q1} AS ts1 INNER JOIN ${WQL Q2} AS ts2 USING( cluster, nodename, pod_name, namespace_name ), metric='pods.running.uptime', source=ts2.source, cluster=ts1.cluster, nodename=ts1.nodename, pod_name=ts1.pod_name, namespace_name=ts1.namespace_name,  ts2)
```
See [Inner Join Example](query_language_series_joining.html#inner-join-example) for a discussion.

#### Example Join in PromQL

The following example joins two PromQL queries (PromQL 1 and PromQL 2).

PromQL 1:

```
kubernetes.pod_container.status{cluster="a-cluster",nodename="ip-*", pod_name="a-pod", namespace_name="a-namespace", status="running"}
```

PromQL 2:


```
kubernetes.pod_container.uptime{cluster="a-cluster",nodename="ip-*", pod_name="a-pod", namespace_name="a-namespace"}
```

PromQL Join:

```
${PromQL Q1} * on(cluster,nodename,pod_name,namespace_name) group_left(status) ${PromQL Q2}
```


### FAQ: Does Wavefront Have Recording Rules?

For expressions that are needed frequently or computationally expensive, PromQL supports creating recording rules, which allow you to save the expression result as a set of time series. The Wavefront [derived metrics](derived_metrics.html) feature is similar.

It's not currently possible to translate a query that includes recording rules. However, advanced PromQL users can:
1. Break down their PromQL query into small-ish pieces.
2. Use the Query Editor translation feature for each piece.
3. Create a derived metric for one or more of the short queries.


## Limitations

Because the two languages are different, some limitations exist.

### Unsupported PromQL Functions

<table style="width: 100%;">
<tbody>
<tr>
<td width="25%"><strong>sort(), sort_desc()</strong>
</td>
<td width="75%">PromQL <strong>sort()</strong> and <strong>sort_desc()</strong> show the data order in the Console view. Because Wavefront visualizes queries in charts instead of a console, we don't support this option.
</td></tr>
<tr>
<td width="25%"><strong>ignore, on, group_left, group_right</strong>
</td>
<td width="75%">Wavefront does not support ignore, on, group_left, group_right for vector matching with Prometheus queries.
</td></tr>
</tbody>
</table>

### Limitations in Wavefront Query Editor

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
* [Query Language Videos](videos_query_language.html)
