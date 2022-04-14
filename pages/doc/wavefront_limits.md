---
title: Limits and Best Practices
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_limits.html
summary: Limits and recommendations to promote efficient resource use.
---
For best performance and cost reduction, Wavefront supports limits. Some limits are recommendations--if your environment exceeds the limits, you'll see significant performance issues. Other limits result in an error if you exceed the limit.

<!--this page is public but we're not pointing to it from elsewhere in the documentation because some companies change their limits (and pay more, potentially) --->

## Concurrent Query Limits

Wavefront enforces the following concurrent query limits. These limits are subject to change without notice.

{% include important.html content="If your environment exceeds any of the query limits, an error results." %}

### Per Customer Concurrent Query Limit

Wavefront enforces a limit on concurrent queries for each customer cluster. The default is 1000. If you are getting repeated errors that your cluster is exceeding this limit, contact us.

The following error results if your environment exceeds this limit:
```
HTTP 429 TOO_MANY_REQUESTS
Customer concurrent query limit exceeded. Please try again later. Contact support@wavefront.com for help.
```

### Per User Concurrent Query Limit

Wavefront enforces a limit on per-user concurrent queries. The default limit is 100. Contact us if you believe that the setting doesn’t make sense for one of your users (for example, one of your service accounts) and we’ll discuss options with you.

The following error results if one of the users exceeds this limit:
```
HTTP 429 TOO_MANY_REQUESTS
“User concurrent query limit exceeded. Please try again later. Contact support@wavefront.com for help.”
```

## Timeout Limits

<table>
<tbody>
<thead>
<tr><th width="10%">Category</th><th width="15%">Timeout Limit</th><th width="75%">Explanation and Best Practice</th></tr>
</thead>
<tr>
<td><strong>Query</strong></td>
<td>300s (5min)</td>
<td>If a query does not complete in 300s (5 minutes), the chart/API times out.<br/><br/>
<strong>Best practice</strong>: Use specific sources and/or point tags in the queries to drill down into specific data that is required.</td>
</tr>
<tr>
<td><strong>Alert</strong></td>
<td>60s (1min)</td>
<td>When the alerting service runs a query, it must complete in 60s (1 minute). If a query does not complete within a minute, the alert is rendered as functioning.<br/><br/>
<strong>Best practice</strong>: Use specific sources, point tags, or both in the queries to drill down into specific data that you need.
</td>
</tr>
<tr>
<td><strong>Dynamic Dashboard Variable</strong></td>
<td>60s (1min)</td>
<td><a href="dashboards_variables.html#dynamic-dashboard-variables">Dynamic dashboard variables</a> dropdown menus allow users to make a selection that is based on metadata of a query, for example, a set of sources. If the dynamic variable query does not complete in 60s, it is cancelled by the server to avoid a bottleneck in loading a dashboard.<br/><br/>
<strong>Best practice</strong>:Do not use wildcard characters in dynamic variables. Use specific sources, point tags, or both in the queries to drill down into specific data that is required. </td>
</tr>
<tr>
<td><strong>Derived Metric</strong></td>
<td>300s (5min)</td>
<td>Derived metrics can synthetically create metrics based on existing metrics. The query engine can reingest those metrics. The query that runs for a derived metric, like a regular query, has a 300s or 5 minute timeout.<br/><br/>
<strong>Best practice</strong>: Use specific sources and/or point tags in the queries to drill down into specific data that is required.</td>
</tr>
</tbody>
</table>

## Default Customer-Specific Limits

You can start with Wavefront either as part of a free trial or as a new customer. In both cases, a set of out-of-the-box limits applies to that customer account. You can contact our customer success team to request changes. In some cases, a change might involve additional costs.

<table>
<tbody>
<tr>
<td width="30%">Metric length limit</td>
<td width="60%">Maximum number of characters for a metric name.</td>
<td width="10%">256</td>
</tr>
<tr>
<td>Histogram length limit</td>
<td>Maximum number of characters for a histogram name.</td>
<td>256</td>
</tr>
<tr>
<td>Span length limit</td>
<td>Maximum number of characters for a span name.</td>
<td>128</td>
</tr>
<tr>
<td>Host length limit</td>
<td>Maximum number of characters for a source name.</td>
<td>128</td>
</tr>
<tr>
<td>Annotations count limit</td>
<td>Maximum number of point tags associated with a metric.</td>
<td>20</td>
</tr>
<tr>
<td>Annotations key length limit</td>
<td>Maximum number of characters in a point tag key.</td>
<td>64</td>
</tr>
<tr>
<td>Annotations value length limit</td>
<td>Maximum number of characters in a point tag value.</td>
<td>255</td>
</tr>
<tr>
<td>Counter length limit</td>
<td>Maximum number of characters in a counter metric.</td>
<td>256</td>
</tr>
<tr>
<td>Span annotations count limit</td>
<td>Maximum number of point tags associated with a span. </td>
<td>20</td>
</tr>
<tr>
<td>Span annotations key length limit</td>
<td>Maximum number of characters associated with a span point tag key. </td>
<td>128</td>
</tr>
<tr>
<td>Span annotations value length limit</td>
<td>Maximum number of characters associated with a span point tag value. </td>
<td>128</td>
</tr>
<tr>
<td>Span topology processing Ttl</td>
<td>  </td>
<td>10</td>
</tr>
<tr>
<td>Span topology dimensions</td>
<td>Dimensions associated with a span. Defaults to "application" "cluster" "shard"</td>
<td>128</td>
</tr>
<tr>
<td>Span logs size limit</td>
<td>Maximum size of a span log.</td>
<td>32768</td>
</tr>
</tbody>
</table>


<!---From Data Format topic, remove there if we want to keep this here--->
## Wavefront Data Format Best Practices

Follow best practices to avoid hitting query limits and for improved query execution speed and meaningful results.

* Make the metrics the most stable part of your data:
  - Do not include source names in the metric name. Wavefront captures sources separately.
  - Do not include data or timestamps in the metric name. Each point has an associated timestamp.
* Aim for a metric hierarchy:
  - Partition the top level of the metric hierarchy by including at least one dot.
  - Organize metric names in a meaningful hierarchy from most general to most specific (i.e. `system.cpu0.loadavg.1m` instead of `1m.loadavg.cpu0.system`)
* For best performance, keep the number of distinct time series per metric and host to under 1000.

See [Wavefront Data Naming](wavefront_data_format.html#wavefront-data-format-best-practices) for more best practices.



## More Info

You can examine what's going on with your cluster in several ways:

* [Monitor and troubleshoot your Wavefront instance](wavefront_monitoring.html)
* [Examine ingestion breakdown and export usage data](ingestion_policies.html)
* [Use Wavefront Top or Spy to Investigate Traffic](wavefront_monitoring_spy.html)
