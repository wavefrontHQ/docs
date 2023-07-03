---
title: Using PromQL
keywords: query language
sidebar: doc_sidebar
permalink: wavefront_prometheus.html
summary: Run PromQL queries in the Query Editor
---

VMware Aria Operations for Applications (previously known as Tanzu Observability by Wavefront) supports both PromQL and Wavefront Query Language (WQL) queries. The Query Editor includes admin-level organization settings for enabling PromQL and a query line GUI that includes a translation option.

* Users with the **Accounts** permission and **Super Admin** users have control over user defaults:
  - On the **Organization Settings** page (New User Defaults) they can enable users to write queries in PromQL.
  - If queries in PromQL are enabled, they can also set other options.
* Users can then type PromQL or WQL queries into the Query Editor.
  - If users enter a PromQL query when **PromQL** is selected, or a WQL query, when **WQL** is selected, the Query Editor parses the query. The corresponding chart shows the information you'd expect.
  - If users enter a PromQL query when **WQL** is selected, or the reverse, the Query Editor doesn't parse the query and displays a syntax error.
  - In PromQL mode, users can see the translation to WQL and translate the query if that is set in their preferences.
  - Users can add charts that use PromQL to dashboards, create alerts from charts that use PromQL, and use PromQL queries in the query line of a Create Alert page.

{% include note.html content="Your site administrator controls PromQL behavior. If you don't have some of the features, get in touch with your site administrator." %}


## Set PromQL Organization Settings (Administrator Only)

{% include note.html content="Starting July 3, 2023, VMware Aria Operations for Applications is a service on the VMware Cloud services platform. For information about VMware Cloud services subscriptions and original subscriptions and the differences between them, see [Subscription Types](subscriptions-differences.html).<br/>
- For VMware Cloud services subscriptions, only users with the **Super Admin**  service role in Super Admin mode can enable the PromQL support.<br/>
- For original Operations for Applications subscriptions, users with the **Accounts** permission can enable the PromQL support."%}

* If **PromQL Support** is *not enabled*, other users cannot use PromQL or change PromQL user preferences.
* If **PromQL Support** is *enabled*, administrators can set additional New User Default query settings, and other users can override those settings.

To set PromQL settings for your organization:

1. From the gear icon, select **Organization Settings**.
2. Under **Query Settings**, select the **Users can write queries in PromQL** check box.
3. Select the default query language for new users.
4. Select the default way for building queries.

   If the default language is set to **PromQL**, the only way to build queries is to use the Query Editor.<!---5. Enable **Always save queries as WQL** if you expect that some users prefer Wavefront query language.The queries will be always translated and saved in Wavefront query language.--->

5. Enable **Show WQL translation** to show the translation for all PromQL queries.

   Select this check box if you expect that users want to learn WQL. The translation appears only if the query is with a valid PromQL syntax. Otherwise, you see an error.

## Set PromQL User Preferences (All Users)

If an administrator has enabled PromQL support (discussed above), each user can control some aspects of PromQL.

{% include note.html content="If you can only choose between Query Editor and Chart Builder, then PromQL is not supported on your Operations for Applications instance." %}

1. From the gear icon, select your username.
2. Under **Query Settings**, select:
    * The default query language.
    * The default way of building queries.

      If your default language is set to **PromQL**, you can build your queries only in the Query Editor. Chart Builder was designed for Wavefront query language and doesn't support PromQL.
    * Whether to show the translation to WQL when you click inside the Query Editor.



## Video: Wavefront Query Language and PromQL

This short <a href="https://vmwaretv.vmware.com/media/t/1_x5xqthax" target="_blank">video<img src="/images/video_camera.png" alt="video camera icon"/></a> shows how you can create a PromQL chart and an alert:

<p>
<iframe id="kmsembed-1_x5xqthax" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_x5xqthax/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="WQL and PromQL"></iframe>
</p>

## Use PromQL in Charts and Alerts

This example shows how to use PromQL, when:

* An administrator has enabled PromQL support.
* The default query language is set to be WQL.
* The translation to WQL is enabled.

![Query settings when PromQL is enabled, WQL is the default language and translation to WQL is also available.](images/promql_query_settings.png)

If your preferred default language is PromQL, and you have selected to not see the translation to WQL, the button for converting to WQL is not available.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Create or edit a chart or alert.</li>
<li>Enter a PromQL query in the Query Editor.</li>
<li>Click inside the Query Editor to see the translation to WQL.</li>
<li>Finally, click the <strong>Convert to WQL</strong> button to convert to WQL if that's your primary mode. The query is translated to WQL. A small number of PromQL constructs are not supported, as discussed below. </li></ol></td>
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

Operations for Applications supports most PromQL functions and operators out of the box. There are a small number of differences.


### FAQ: Do You Have Best Practices?

A few functions work differently in PromQL and WQL. Here are some best practices.

<table style="width: 100%;">
<tbody>
<tr>
<td width="25%"><strong>rate() </strong>
</td>
<td width="75%">If you use the PromQL rate() function on an instant vector in a chart, provide the time resolution.<br>
<code>rate(metric[xm:ym]) </code><br>
where x is time span length, y is the resolution, m is the time unit minute.<br><br>
If you include the time resolution, the query engine will automatically call align() on the translated query. If you don't include the time resolution, you might get different results depending on the monitor resolution. See <a href="ui_charts.html#chart-resolution">Chart Resolution</a> for details on how your monitor's resolution can affect how the chart looks.
</td></tr>
<tr>
<td width="25%"><strong>count_values()</strong>
</td>
<td width="75%">The PromQL count_values aggregation function is not supported. <a href="proxies_histograms.html">Histograms</a> and <a href="query_language_reference.html#histogram-functions">histogram functions</a> allow you to perform the corresponding tasks - and more!
</td></tr>
<tr>
<td width="25%"><strong>topk(), bottomk()</strong>
</td>
<td width="75%">The topk() and bottomk() functions work slightly differently in PromQL and WQL.
<ul>
<li>PromQL computes topk() and bottomk() at the point level. It picks the top points at each <strong>timestamp</strong>.</li>
<li>The query engine computes topk() and bottomk() at <strong>time series level</strong>. It returns the top or bottom series (based on the avg/min/max... value). </li>
</ul>
<p>In the Query Editor, topk() and bottomk() always return results based on the time series. </p>
</td></tr>
</tbody>
</table>

### FAQ: Can I Use Variables?

Dashboard variables are a powerful feature for fine-tuning what users see when they look at a dashboard.
* Users with **Dashboard** permissions can create [dashboard variables](dashboards_variables.html).
* All users can select dashboard variable values at the top of dashboards, and can [specify variables inside a query](dashboards_variables.html#use-dashboard-variables-in-queries). When the query engine runs the query, it automatically substitutes the current value of the variable with the selected value for the dashboard.

This approach to variables is different from PromQL variables:
* If the dashboard variable represents the actual value (or glob), use `=`.
* In the rare case that you want to explicitly use a regex, use `=~`


### FAQ: Can You Show Me a Query Example That Doesn't Translate?

In many cases the translation from PromQL to WQL is straightforward. You type the PromQL query into the query editor and click WQL to see the corresponding query in WQL.

However, the syntax for for joining queries in PromQL and in WQL is fundamentally different. In addition, WQL does not support `ignore`, `on`, `group_left`, and `group_right` for vector matching with PromQL queries. However, after a bit of practice (and after looking at our examples and [this video](https://vmwaretv.vmware.com/media/t/1_82m4iwhv) we expect you'll find joins in WQL quite powerful.

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

The following example joins two WQL queries (WQL 1 and WQL 2) using an inner join.

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


### FAQ: Does WQL Support Recording Rules?

For expressions that are needed frequently or computationally expensive, PromQL supports creating recording rules, which allow you to save the expression result as a set of time series. The [derived metrics](derived_metrics.html) feature is similar.

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
<td width="75%">PromQL <strong>sort()</strong> and <strong>sort_desc()</strong> show the data order in the Console view. Because you visualize WQL queries in charts (not a console), we don't support this option.
</td></tr>
<tr>
<td width="25%"><strong>ignore, on, group_left, group_right</strong>
</td>
<td width="75%">WQL does not support ignore, on, group_left, group_right for vector matching with Prometheus queries.
</td></tr>
</tbody>
</table>

### Limitations in WQL Query Editor

* Autocomplete is not currently supported for PromQL functions and operators. However, autocomplete for metrics that you use inside your query continues to be supported.
* The Wavefront query language supports [using a query name as a chart variable](query_editor.html#use-chart-variables) in other queries for the same chart.
  - You can use a query name as a chart variable in a PromQL query if the named query was also a PromQL query.
  - You cannot use a query name as a chart variable if the named query is a WQL query.

## How the Query Engine Executes PromQL Queries

The following diagram shows how the query engine handles a WQL (`ts()`) query and a PromQL query.

![Image showing Wavefront query language (ts) and PromQL execution paths, explained in the text below](images/ts_and_promql.png)

The top row shows the `ts()` query execution:

1. The user enters the query into the Query Editor.
2. The query engine processes the query and shows the results in the chart. It also uses the result to determine whether an alert should fire, etc.

The bottom row shows the PromQL query execution:
1. The user enters the query into the Query Editor.
2. The translation service translates the query into the corresponding `ts()` query.
3. The translated query is automatically sent to the query engine.
4. The query engine processes the query and shows the results in the chart. It also uses the result to determine whether an alert should fire, etc.

## More Info

New to our product? Here are some links to get you started:
* Videos
  - Watch videos in the [Getting Started](https://vmwaretv.vmware.com/embedplaylist/secure/embed/v2/1/playlistId/1_zcafsh0j/uiConfId/47611883) playlist on VMware TV
  - Watch videos in the [How to Query with WQL and PromQL](https://vmwaretv.vmware.com/embedplaylist/secure/embed/v2/1/playlistId/1_brmdewqc/uiConfId/47611883) playlist on VMware TV

* Tutorials & Other Info
  - [Dashboards Tutorials](tutorial_dashboards.html)
  - [Alerts](alerts.html)
  - [Query Language Quickstart](query_language_getting_started.html)
  - [Set Up a PromQL Data Source in Grafana](integrations_grafana.html)
