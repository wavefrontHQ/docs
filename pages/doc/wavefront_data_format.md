---
title: Wavefront Data Format
keywords: data
tags: [data, proxies]
sidebar: doc_sidebar
permalink: wavefront_data_format.html
summary: Learn about the Wavefront native data format.
---
The Wavefront data format is supported by [Wavefront proxies](proxies.html) and by [direct ingestion](direct_ingestion.html)

Wavefront proxies support the following additional data formats:

- [Graphite data format (plaintext and  pickle)](http://graphite.readthedocs.io/en/latest/feeding-carbon.html)
- [OpenTSDB data format (Telnet interface and HTTP API (JSON))](http://opentsdb.net/docs/build/html/user_guide/writing.html)

## Wavefront Data Format Syntax

`<metricName> <metricValue> [<timestamp>] source=<source> [pointTags]`

Fields must be space separated and each line must be terminated with the newline character (\\n or ASCII hex 0A).

## Wavefront Data Format Fields

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
Metric naming hierarchy recommendations:
<ul>
<li>Partition the top level of the metric hierarchy by including at least one dot.</li>
<li>Organize metric names in a meaningful hierarchy from <em>most general to most specific</em> (i.e. system.cpu0.loadavg.1m <em>instead of</em> 1m.loadavg.cpu0.system).</li>
</ul></td>
</tr>
<tr>
<td>metricValue</td>
<td>Yes</td>
<td>Value of the metric.</td>
<td markdown="span">A number that can be parsed into a double-precision floating point number or a long integer. It can be positive, negative, or 0. In charts, the Wavefront UI represents values using SI and IEC/Binary units. See [Units in Chart Axes and Legends](charts_customizing.html#units_in_chart_axes_and_legends).</td>
</tr>
<tr>
<td>timestamp</td>
<td>No</td>
<td>Timestamp of the metric.</td>
<td>A number reflecting the epoch seconds of the metric (e.g. 1382754475). When this field is omitted, the timestamp is set to the current time at the Wavefront proxy when the metric arrives.</td>
</tr>
<tr>
<td>source</td>
<td>Yes</td>
<td>The name of an application, host, container, instance, or any other unique source that is sending the metric to Wavefront.</td>
<td>Valid characters are: a-z, A-Z, 0-9, hyphen ("-"), underscore ("_"), dot ("."). The length of the source field should be less than 1024 characters. Prior to Wavefront proxy 2.2, this field was named <strong>host</strong>. <strong>host</strong> is still supported.</td>
</tr>
<tr>
<td>pointTags</td>
<td>No</td>
<td>Custom metadata associated with the metric.</td>
<td>An arbitrary number of key-value pairs separated by spaces: &lt;k1&gt;="&lt;v1&gt;" ... &lt;kn&gt;="&lt;vn&gt;".
Point tags cannot be empty, i.e. <code>tagKey=""</code> and <code>tagKey=</code> are invalid. Point tags must also satisfy these constraints:
<ul>
<li><strong>Key</strong> - Valid characters: alphanumeric, hyphen ("-"), underscore ("_"), dot (".")</li>
<li><strong>Value</strong> - We recommend enclosing tag values with double quotes (" "). If you surround the value with double quotes, any character is allowed, including spaces. To include a double quote, escape it with a backslash, for example, `\"`. A backslash cannot be the last character in the tag value.</li>
</ul>
Maximum allowed length for a combination of a point tag key and value is 254 characters (255 including the "=" separating key and value). If the value is longer, the point is rejected and logged.

Wavefront recommends that you keep the number of distinct time series per metric and host to under 1000. </td>
</tr>
</tbody>
</table>

## Video: Point Tags and Source Tags

Watch the following video for an introduction to point tags and source tags:

<p><a href="https://www.youtube.com/watch?v=9tt4orZHQts&index=3&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_tagging_clement.png" style="width: 700px;" alt="tagging"/></a>
</p>

## Valid and Invalid Metrics Examples

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
