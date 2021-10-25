---
title: Data Ingestion API
keywords: data
tags: [data]
sidebar: doc_sidebar
permalink: api_data_ingestion.html
published: false
summary: Learn how to use the data ingestion API to ingest metrics directly into the Wavefront service.
---

In most cases, you send data to the [Wavefront proxy](proxies.html), and the proxy forwards the data to the Wavefront service. Using the proxy has many advantages:
* Prevents data loss and optimizes network bandwidth.
* Supports enriching or filtering data.
* Facilitates examining bottlenecks.

However, some Wavefront customers want to send data directly to the Wavefront services, and the data ingestion API allows you to do it.

**Note** You must have **Direct Data Ingestion** permission to use this API.

## Data Ingestion API

You use the following REST API:

**Path:** `https://{service}.wavefront.com/report/metrics`

**Request Type:** `POST`

<table>
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="20%">Datatype</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>h</td>
<td>string
</td>
<td>
Host/source to list on the metric.
</td>
</tr>
<tr>
<td>p</td>
<td>string
</td>
<td>Prefix to attach to the sent metric.
</td>
</tr>
<tr>
<td>d</td>
<td>integer
</td>
<td>
Timestamp to assign to the sent metric. If null, uses the current time. The timestamp is 13 characters, just like the proxy timestamp.
</td>
</tr>
<tr>
<td>body</td>
<td>JSON
</td>
<td>Metric(s) to be ingested.
<div>
Model:</div>
<code>
JsonMetricsBody {
your_full_metric_name (integer,optional): Key: full metric name. Value: long value to report. NOTE: you may specify any number of these,
your_partial_metric_name(JsonMetricSegment, optional): Key: partial metric name to be the prefix for child metric segments. Value: metric segment. NOTE: you may specify any number of these
}
JsonMetricSegment {
your_final_metric_suffix (integer,optional): Key: suffix to append to the parent partial metric name to form a full metric path. Value: long value of the metric to report. NOTE: you may specify any number of these,
your_partial_metric_name (...,optional): Key: partial metric name to append to the parent partial name. Value: another metric segment map. NOTE: you may specify any number of these and these can be nested infinitely deep
}
</code>
<div>Model Schema:</div>
<code>
{
"your_full_metric_name": 0,
"your_partial_metric_name": {
"your_final_metric_suffix": 0,
"your_partial_metric_name": "..."
}
}
</code>
</td>
</tr>
</tbody>
</table>

## Example Command

Here's an example of a cURL command that uses the API:
```
curl "https://{domain}.wavefront.com/report/metrics?t={token}&h={host}&p={prefix}&d={timestamp}"
 -X POST -H "content-type: application/json" -H "Accept: application/json"
 --data-binary "{\"example.metric\": 2000}"
```

## Examples of Acceptable JSON Metric Formats

<table>
<tbody>
<thead><tr><th width="65%">Action</th><th width="35%">JSON Example</th></tr></thead>
<tr><td>Sending one metric with a value of 1000. Metric path is example.metric.</td>
<td><code>{
"example.metric.value": 1000
}
</code>
</td>
</tr>
<tr>
<td>Sending three metrics with values 1, 2, and 3 and an <code>example.metric</code> prefix. Metric path is <code>example.metric.value#</code></td>
<td><code>
{
"example.metric": {
"Value1": 1000,
"Value2": 2000,
"Value3": 3000
}
}
</code>
</td>
</tr>
<tr>
<td>Sending multiple metrics. Metric path is <code>example.metric#.value#</code>.</td>
<td><code>
{
"example.metric": {
"Value": 1000
},
"example.metric2": {
"Value": 2000
},
"example.metric3": {
"Value": 3000
}
}
</code>
</td>
</tr>
<tr>
<td>Sending the same metric as above using a different JSON format. Metric path is <code>example.metric#.value#</code></td>
<td><code>
{
"example.metric.value": 1000,
"example.metric2.value2": 2000,
"example.metric3.value3": 3000
}
</code>
</td>
</tr>
</tbody>
</table>

**Note** Special characters such as `!, @, #, $, %, ^, &, *, (, ), etc` inside a metric name are converted to an underscore `_` upon ingestion into the Wavefront system by default. However, if the Wavefront proxy configuration file specifies the character as a delimiter, then that special character is converted to a dot (.). See [Advanced Proxy Configuration](proxies_configuring.html)
