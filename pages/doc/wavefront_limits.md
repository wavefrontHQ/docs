---
title: Limits and Best Practices
tags: [administration]
sidebar: doc_sidebar
permalink: wavefront_limits.html
summary: Limits and recommendations to promote efficient resource use.
---
For best performance and cost reduction, Wavefront supports limits. Some limits are recommendations--if your environment exceeds the limits, you'll see significant performance issues. Other limits result in an error if you exceed the limit.


## Concurrent Query Limits

Starting with release 2020.22x, Wavefront enforces the following concurrent query limits. These limits are subject to change without notice.

{% include note.html content="If your environment exceeds any of the query limits, an error results." %}

### Per Customer Concurrent Query Limit

Wavefront enforces a limit on concurrent queries for each customer cluster. The default is 1000. If you are getting repeated errors that your cluster is exceeding this limit, contact us.

The following error results if your environment exceeds this limit:
```
HTTP 429 TOO_MANY_REQUESTS
Customer concurrent query limit exceeded. Please try again later. Contact support@wavefront.com for help.
```

### Per User Concurrent Query Limit
Starting with release 2020.22.x, Wavefront enforces a limit on per-user concurrent queries. The default limit is 100. Contact us if you believe that the setting doesn’t make sense for one of your users (for example, one of your service accounts) and we’ll discuss options with you.

The following error results if one of the users exceeds this limit:
```
HTTP 429 TOO_MANY_REQUESTS
“User concurrent query limit exceeded. Please try again later. Contact support@wavefront.com for help.”
```



## Default Customer-Specific Limits

You can start with Wavefront either as part of a free trial or as a new customer. In both cases, a set of out-of-the-box limits applies to that customer account. You can [contact our tech support team](wavefront_support_feedback.html) to request changes. In some cases, a change might involve additional costs.

<table>
<tbody>
<tr>
<td width="30%">Metric length limit</td>
<td width="60%">Maximum number of characters for a metric name.</td>
<td width="10%">256</td>
</tr>
<tr>
<td>Histogram length limit</td>
<td>Maximum number of characters for a histogram name. <br/>The maximum number of characters for a histogram name before release 2020-22.x was 128.</td>
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

See [Wavefront Data Naming](wavefront_data_naming.html) for more best practices.



## More Info

You can examine what's going on with your cluster in several ways:

* [Monitor and troubleshoot your Wavefront instance](wavefront_monitoring.html)
* [Examine ingestion breakdown and export usage data](ingestion_policies.html)
* [Use Wavefront Top or Spy to Investigate Traffic](wavefront_monitoring_spy.html)
