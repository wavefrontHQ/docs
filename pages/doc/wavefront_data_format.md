---
title: Data Format
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_data_format.html
summary: Wavefront data format syntax and parameters.
---
Tanzu Observability by Wavefront supports the same native data format with Wavefront proxies and with direct ingestion. This page is a reference to the data format and includes best practices.

## Metrics


### Supported Data Formats for Metrics

[Direct ingestion](direct_ingestion.html) supports only the Wavefront data format.

[Wavefront proxies](proxies.html) support:

- Wavefront data format
- [Graphite data format (plaintext and  pickle)](https://graphite.readthedocs.io/en/latest/feeding-carbon.html)
- [OpenTSDB data format (Telnet interface and HTTP API (JSON))](http://opentsdb.net/docs/build/html/user_guide/writing/)

### Metrics Data Format Syntax


Here's the data format for metrics.

`<metricName> <metricValue> [<timestamp>] source=<source> [pointTags]`

Fields must be space separated and each line must be terminated with the newline character (\\n or ASCII hex 0A). See the **Data Format Fields** table below for details about each parameter.


### Wavefront Data Format Fields

<table>
<colgroup>
<col width="15%" />
<col width="10%" />
<col width="15%" />
<col width="55%" />
</colgroup>
<thead>
<tr>
<th>Field</th>
<th>Required</th>
<th>Description</th>
<th>Format</th>
</tr>
</thead>
<tbody>
<tr>
<td>metricName</td>
<td>Yes</td>
<td>Name of the metric.</td>
<td>Valid characters are: a-z, A-Z, 0-9, hyphen ("-"), underscore ("_"), dot ("."). Forward slash ("/") and comma (",") are allowed if metricName is enclosed in double quotes.
<ul>
<li markdown="span">Points with invalid characters in metricName are rejected and [logged by the Wavefront proxy](proxies_configuring.html#blocked-point-log). For information on how to configure the proxy to rewrite invalid metric names, see [​Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules.html).</li>
<li>Metric searches are case sensitive; ts("my.metric") does not find a metric "my.Metric".</li>
</ul>
Maximum length for metricName is 256.
</td>
</tr>
<tr>
<td>metricValue</td>
<td>Yes</td>
<td>Value of the metric.</td>
<td markdown="span">Number that can be parsed into a double-precision floating point number or a long integer. It can be positive, negative, or 0. Charts can represent values using SI or IEC/Binary units.</td>
</tr>
<tr>
<td>timestamp</td>
<td>No</td>
<td>Timestamp of the metric.</td>
<td>Number that reflects the epoch seconds of the metric (e.g. 1382754475). When this field is omitted, the timestamp is set to the current time at the Wavefront proxy when the metric arrives.</td>
</tr>
<tr>
<td>source</td>
<td>Yes</td>
<td>Name of an application, host, container, instance, or any other unique source that is sending the metric.</td>
<td>Valid characters are: a-z, A-Z, 0-9, hyphen ("-"), underscore ("_"), dot ("."). The length of the source field should be no more than 128 characters. Using <strong>host=</strong> instead of <strong>source=</strong> is supported for backward compatibility but not recommended.</td>
</tr>
<tr>
<td>pointTags</td>
<td>No</td>
<td>Custom metadata associated with the metric.</td>
<td>An arbitrary number of key-value pairs separated by spaces: &lt;k1&gt;="&lt;v1&gt;" ... &lt;kn&gt;="&lt;vn&gt;".
Point tags cannot be empty, i.e. <code>tagKey=""</code> and <code>tagKey=</code> are invalid. Point tags must also satisfy these constraints:
<ul>
<li><strong>Key</strong> - Valid characters: alphanumeric, hyphen ("-"), underscore ("_"), dot (".")</li>
<li><strong>Value</strong> - Enclose tag values with double quotes (" "). If you surround the value with double quotes, any character is allowed, including spaces. To include a double quote, escape it with a backslash, for example, `\"`. A backslash cannot be the last character in the tag value.</li>
</ul>
Maximum allowed length for a combination of a point tag key and value is 254 characters (255 including the "=" separating key and value). If the value is longer, the point is rejected and logged.

Keep the number of distinct time series per metric and host to under 1000.
<br>
<br>
The string "host" is a reserved word. If you specify a point tag host=&lt;tagValue&gt;, we evaluate it as follows:
<ul><li>If the expression also specifies source="&lt;sourceValue&gt;", we add an underbar character to the host point tag. The result is "_host=&lt;tagValue&gt;"</li>
<li>If the expression does not specify source=&lt;sourceValue&gt;, we treat "host=" as a source and not as a point tag key.  </li></ul>
</td>
</tr>
</tbody>
</table>

### Video: Point Tags and Source Tags

Watch the following video for an introduction to point tags and source tags:

<p><a href="https://www.youtube.com/watch?v=9tt4orZHQts&index=3&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_tagging_clement.png" style="width: 700px;" alt="tagging"/></a>
</p>

### Valid and Invalid Metrics Examples

The following metrics are valid:

-   `request.count 1001 source=test.wavefront.com`
-   `system.cpu.loadavg.1m 0.03 1382754475 source=test1.wavefront.com`
-   `marketing.adsense.impressions 24056 source=campaign1`
-   `new-york.power.usage 42422 source=localhost datacenter="dc1"`

The following metrics are invalid. For each metric, we explain why it's invalid.

- `system.cpu.load\# 0.03 source=test.wavefront.com`

  -   **Reason:** Metric name has an invalid character ('\#')

- `system.cpu.loadavg source=test.wavefront.com`

  -   **Reason:** No metric value

- `cpu0.loadavg.1m 0.03`

  -   **Reason:** No **source** field

## Histograms and Spans

Most of our discussion of the histogram and span data formats is on the pages linked below. Here's an overview.

### Histogram Data Format Syntax

[Histograms](proxies_histograms.html#sending-histogram-distributions) have port requirements and use the following format:

```
{!M | !H | !D} [<timestamp>] #<points> <metricValue> [... #<points> <metricValue>]
 <metricName> source=<source> [<pointTagKey1>=<value1> ... <pointTagKeyn>=<valuen>]
```

### Span Data Format Syntax

[The span format](trace_data_details.html#wavefront-span-format) supports several predefined span tags.

```
<operationName> source=<source> <spanTags> <start_milliseconds> <duration_milliseconds>
```

## Wavefront Data Format Best Practices

Follow best practices for improved query execution speed and meaningful results.

* Make the metrics the most stable part of your data:
  - Do not include source names in the metric name. The Wavefront service captures sources separately.
  - Do not include data or timestamps in the metric name. Each point has an associated timestamp.
* Aim for a metric hierarchy:
  - Partition the top level of the metric hierarchy by including at least one dot.
  - Organize metric names in a meaningful hierarchy from most general to most specific (i.e. `system.cpu0.loadavg.1m` instead of `1m.loadavg.cpu0.system`)
* For best performance, keep the number of distinct time series per metric and host to under 1000.

### Metric Names Best Practices

Metric names should reflect a class of comparable data across different sources or different points. Most system- and application-level metric names should be mappable to sources. There are exceptions such as total datacenter power usage or business analytics that are reported out of a 3rd party system.
- `cpu.idle` is a good metric name because you can compare it across different sources, visualize them together, etc.
- `cpu.idle.source124` is a poor metric name because it's tied to a single source, and it can't be compared across different sources.
- `dc.power.usage` is a good metric name because you can compare power usage across different data centers, as long as you pass in the data center names as the source names.

{% include tip.html content="Don't include a timestamp in the metric name." %}


### Source Names Best Practices

The Wavefront service assumes that source names are unique. Source names should reflect a unique source that is emitting metrics. For example, consider prefixing the source names with the datacenter name or making source names unique in other ways.

For example, if you have the same machine name in different data centers, and don't separate the two machines when sending data, you can get confusing query results. Time series might oscillate between different values seemingly randomly, or you might see unexpected averaging of points between multiple sources.

When it's not clear which name to use as the source name, use the most unique value for a source name. For higher-level pre-aggregated data, for example, a datacenter-wide metric like power usage, use the name of the datacenter as the name of the source.

### Point Tag Names Best Practices

Point tags represent conceptual attributes tied to a data point and change frequently (< 1 month), perhaps going back and forth over several values at any given time.  Here are some use cases for point tags:
- A back-end service handles requests from two different client pools and you want to view the back-end request data for one of those clients.
- You send data with the source name of the virtual machine, but also want to record what physical server that VM was running on. The VM shifts from one physical server to another every few days.
- You run two instances of the same application on the same source and want to differentiate the metrics for the two instances.
See [Point Tags in Queries](query_language_point_tags.html).

### Alert, Event, and Source Tag Names Best Practices

**Alert, event, and source tags** represent conceptual attributes that can be tied to an alert, event, or source and change at infrequent (> 1 month) intervals. For example, the specific hardware of a source, the geographical location, perhaps the role of a source (production vs. staging vs. development), or the version of application software of that source (such as the JVM version, or OS version, or proprietary application version).  Alert, event, and source tags (or _object_ tags) can be attached to multiple alerts, events, and sources.  You can add and remove such tags through API calls or from the Alert, Event, and Sources browser and use the tags in queries to select groups of related objects.

### Supported Characters for Tag Names

Tag names can contain alphanumeric (a-z, A-Z, 0-9), dash (-), underscore (_), and colon (:) characters. The space character is not supported. Use [Proxy Preprocessor Rules](proxies_preprocessor_rules.html) to replace unsupported characters with supported characters.

### History

We do not retain the history of alert tags, event tags, and source tags. For example, the machine `web004.pax.wavefront.com` might have the source tags `java-17`, `build-24`, and `dc-pax`. If you remove the `build-24` tag from `web004.pax.wavefront.com` and replace it with `build-25`, queries filtered by `build-24` no longer match `web004.pax.wavefront.com.` In other words, only current alert, event, and source tags affect queries because these tags are tied only to those objects, not to data.


## Learn More!

* [High Cardinality Data](cardinality.html) is an introduction with a video.
* [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html) has in-depth examples. 


The following KB articles provide details on data best practices:

* [Where is my old data](https://help.wavefront.com/hc/en-us/articles/360051131032-Where-is-my-Old-Data-) explains how to toggle the Obsolete Metrics settings to see data that's older than 4 weeks.
* [Common Time Limits and Best Practices](https://help.wavefront.com/hc/en-us/articles/360058716512-Common-Tanzu-Observability-time-limits-and-best-practices) shows limits, for example, when a query times out.
