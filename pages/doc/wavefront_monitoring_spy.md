---
title: Use Wavefront Top or Spy to Investigate Traffic
tags: [administration, dashboards]
sidebar: doc_sidebar
permalink: wavefront_monitoring_spy.html
summary: Use HTTP endpoints to get samples data or IDs, or use wftop to examine them with a keyboard-driven UI.
---

Tanzu Observability (formerly known as VMware Aria Operations for Applications) includes HTTP `spy` endpoints for sampling the data that your service instance is currently ingesting. Examining these endpoints helps you understand the data shape and avoid slowdown or other problems.

{% include note.html content="You need [Direct Data Ingestion permission](permissions_overview.html) to use these HTTP endpoints." %}


## Get Started with Wavefront Top and Spy

Use spy to extract information programmatically. This page gives details on the available endpoints and associated parameters.

Use Wavefront top if you want a keyboard-driven UI that's similar to the Linux top UI. The tool is open source and on [GitHub](https://github.com/wavefrontHQ/wftop).  You can also read [the blog that Joanna prepared](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/monitor-and-optimize-data-ingestion-by-wavefront-across-your-organization-introducing-wavefront-top).Note that this video was created in 2019 and some of the information in it might have changed. It also uses the 2019 version of the UI.

<iframe id="kmsembed-1_yif61rd5" width="708" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_yif61rd5/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Using Wavefront Top"></iframe>


You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_yif61rd5" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.

To set up the Wavefront top utility you need a valid API token. For a Tanzu Observability subscription on VMware Cloud services, you must use a VMware Cloud services access token. To get an access token, generate a VMware Cloud services API token associated with your user account and exchange it for the access token. Make sure that when you do this, you deselect the **Send empty value** check box for the **passcode** parameter. For more information and instructions, see [Use the Tanzu Observability REST API](using_wavefront_api.html).


## Why Spy?

The `spy` endpoints can provide insight into new data that is being ingested by your service instance. For example, you might analyze `spy` results to:
* Verify that your service instance is ingesting the data points that you expect.
* Troubleshoot a sudden change in the rate at which new data is ingested.

Tanzu Observability supports the `spy` endpoints shown in the following table:

<table width="100%">
<tbody>
<thead>
<tr><th markdown="span" width="53%">Spy Endpoint</th><th width="47%">Description</th></tr>
</thead>
<tr><td markdown="span">`https://<your_instance>.wavefront.com/api/spy/points`</td>
<td markdown="span">[Gets new metric data points](#get-ingested-metric-points-with-spy) that are added to existing time series.</td></tr>
<tr><td markdown="span">`https://<your_instance>.wavefront.com/api/spy/deltas`</td>
<td markdown="span">[Gets new delta counter points](#get-ingested-delta-counters-with-spy) that are added to existing time series.</td></tr>
<tr><td markdown="span">`https://<your_instance>.wavefront.com/api/spy/histograms`</td>
<td markdown="span">[Gets new histograms](#get-ingested-histograms-with-spy) that are added to existing time series.</td></tr>
<tr><td markdown="span">`https://<your_instance>.wavefront.com/api/spy/spans`</td>
<td markdown="span">[Gets new spans](#get-ingested-spans-with-spy) with existing source names and span tags.</td></tr>
<tr><td markdown="span">`https://<your_instance>.wavefront.com/api/gateway/spy/spanlogs`</td>
<td markdown="span">[Gets new span logs](#get-ingested-span-logs-with-spy) with the existing trace ID, span ID, and the respective event that created the log.</td></tr>
<tr><td markdown="span">`https://<your_instance>.wavefront.com/api/spy/ids`</td>
<td markdown="span">[Gets newly allocated IDs](#get-new-id-assignments-with-spy) that correspond to new metric names, source names, point tags, or span tags. A new ID generally indicates that a new time series has been introduced.</td></tr>

</tbody>
</table>

Each endpoint displays a header that describes your request, and then lists the results, if any, in close to real time (as soon as they are available). Each returned point, span, or ID is listed on a separate line.

A `spy` endpoint always returns a *sample* of the requested data. Tanzu Observability always uses multiple data ingesters, but the endpoint connects to a single data ingester. The sample is taken from data that is ingested by that one data ingester. As a result, you always get a sample even if you specify a 100% sample size as an endpoint parameter.

## Get Ingested Metric Points with Spy

Your service instance includes an HTTP endpoint that returns a sampling of the ingested metric points that have specified characteristics. You can use the returned list of points to help you answer questions like:

* Show me some ingested points with metric names that start with the prefix `Cust`.
* How many PPS come from hosts with names that start with the prefix `web`?
* What are some points that are tagged with `env=prod`?

### Endpoint and Parameters for Metric Points

To get a sampling of ingested data points, use the following endpoint. Replace `<your_instance>` with the name of your service instance:

```
  https://<your_instance>.wavefront.com/api/spy/points
```

To get a sampling of points with specific characteristics, add one or more of the following parameters:

<table width="100%">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="20%">Type</th><th width="60%">Description</th></tr>
</thead>
<tr><td markdown="span">**metric**</td>
<td>string, optional</td>
<td markdown="span">List a point only if its metric name starts with the specified case-sensitive prefix. <br> E.g., `metric=Cust` matches metrics named `Customer`, `Customers`, `Customer.alerts`, but not `customer`.</td></tr>
<tr><td markdown="span">**host** or **source**</td>
<td>string, optional</td>
<td>List a point only if its source name starts with the specified case-sensitive prefix. </td></tr>
<tr><td markdown="span">**pointTagKey**</td>
<td>string, optional</td>
<td markdown="span">List a point only if it has the specified point tag key. Add this parameter multiple times to specify multiple point tags, e.g., `pointTagKey=env&pointTagKey=datacenter` </td></tr>
<tr><td markdown="span">**sampling**</td>
<td>decimal, optional</td>
<td markdown="span">0 to .05, with 0.05 being 5%.  </td></tr>
<tr><td markdown="span">**wavefrontSource**</td>
<td>string, optional</td>
<td markdown="span">Filter for only points that are ingested through a particular proxy or user's token. To filter for a certain proxy, use this syntax: <code>proxy::&lt;proxy_source&gt;</td></tr>
<tr><td markdown="span">**usage**</td>
<td>Boolean, optional</td>
<td markdown="span">Flag that determines whether usage information is shown. </td></tr>
<tr><td markdown="span">**usageThresholdDays**</td>
<td>integer, optional</td>
<td markdown="span">If **usage** is set to true, specifies the number of days to look back to determine whether data has been accessed; defaults to 7</td></tr>
<tr><td markdown="span">**includeScalingFactor**</td>
<td>Boolean, optional</td>
<td markdown="span">Flag that determines whether the number of data ingesters is included in the output.</td></tr>
</tbody>
</table>


### Example Requests for Metric Points

Suppose you have a service instance named `ex1`.

<table width="100%">
<tbody>
<thead>
<tr><th width="30%">To List a Sample of<br>These Points</th><th width="70%">Use This Query URL</th></tr>
</thead>
<tr>
<td markdown="span">Ingested points for any metric. </td>
<td><code>http://ex1.wavefront.com/api/spy/points</code>
</td>
</tr>
<tr>
<td markdown="span">Ingested points with metric names that start with `Cust`. </td>
<td><code>http://ex1.wavefront.com/api/spy/points?metric=Cust</code>
</td>
</tr>
<tr>
<td>Ingested points that have point tags named <code>env</code> and <code>loc</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/points?pointTagKey=env&pointTagKey=loc</code>
</td>
</tr>
<tr>
<td>Ingested points from a source whose name starts with <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/points?host=web1</code>
</td>
</tr>
</tbody>
</table>

## Get Ingested Delta Counters with Spy

Your service instance includes an HTTP endpoint that returns a sample of ingested [delta counters](delta_counters.html). The data you see are the aggregated points in each minute bucket that Tanzu Observability stores **post aggregation**, not the individual points that were sent to Tanzu Observability.

You can use the returned list to help you answer questions like:
* Show me some ingested delta counters with names that start with the prefix `Cust`.
* Show me some ingested delta counters with source names that start with the prefix `web`.
*	What are some delta counters that are tagged with `env`?

{% include note.html content="Delta counters are not yet available from Wavefront Top."%}

### Endpoint and Parameters for Delta Counters

To get a sample of ingested delta counters (post aggregation), use the following endpoint. Replace `<your_instance>` with the name of your service instance:

```
https://<your_instance>.wavefront.com/api/spy/deltas
```

To get a sample of delta counters with specific characteristics, add one or more of the following parameters:

<table width="100%">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="20%">Type</th><th width="60%">Description</th></tr>
</thead>
<tr><td markdown="span">**counter**</td>
<td>string, optional</td>
<td markdown="span">List a delta counter only if its name starts with the specified case-sensitive prefix <br> E.g., `counter=Cust` matches counters named `Customer`, `Customers`, `Customer.alerts`, but not `customer`.</td></tr>
<tr><td markdown="span">**host**</td>
<td>string, optional</td>
<td>List a delta counter only if its source name starts with the specified case-sensitive prefix. </td></tr>
<tr><td markdown="span">**counterTagKey**</td>
<td>string, optional</td>
<td markdown="span">List a delta counter only if it has the specified tag key. Add this parameter multiple times to specify multiple point tags, e.g., `counterTagKey=env&counterTagKey=datacenter` </td></tr>
<tr><td markdown="span">**sampling**</td>
<td>decimal, optional</td>
<td markdown="span">0 to .05, with 0.05 being 5%  </td></tr>
<tr><td markdown="span">**wavefrontSource**</td>
<td>string, optional</td>
<td markdown="span">Filter for only points that are ingested through a particular proxy or user's token. To filter for a certain proxy, use this syntax: <code>proxy::&lt;proxy_source&gt;</td></tr>
<tr><td markdown="span">**usage**</td>
<td>Boolean, optional</td>
<td markdown="span">Flag that determines whether usage information is shown. </td></tr>
<tr><td markdown="span">**usageThresholdDays**</td>
<td>integer, optional</td>
<td markdown="span">If **usage** is set to true, specifies the number of days to look back to determine whether data has been accessed; defaults to 7</td></tr>
<tr><td markdown="span">**includeScalingFactor**</td>
<td>Boolean, optional</td>
<td markdown="span">Flag that determines whether the number of data ingesters is included in the output.</td></tr>
</tbody>
</table>


### Example Requests for Delta Counters

Suppose you have a service instance named `ex1`.

<table width="100%">
<tbody>
<thead>
<tr><th width="30%">List Sample of<br>These Delta Counters</th><th width="70%">With This Query URL</th></tr>
</thead>
<tr>
<td markdown="span">Any ingested delta counters. </td>
<td><code>http://ex1.wavefront.com/api/spy/deltas</code>
</td>
</tr>
<tr>
<td markdown="span">Ingested delta counters with names that start with `Cust`. </td>
<td><code>http://ex1.wavefront.com/api/spy/deltas?counter=Cust</code>
</td>
</tr>
<tr>
<td>Ingested delta counters that have tags named <code>env</code> and <code>loc</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/deltas?counterTagKey=env&counterTagKey=loc</code>
</td>
</tr>
<tr>
<td>Ingested delta counters from a source whose name starts with <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/deltas?host=web1</code>
</td>
</tr>
</tbody>
</table>

## Get Ingested Histograms with Spy

Your service instance includes an HTTP endpoint that returns a sampling of ingested histograms with specified characteristics.

You can use the returned list of histograms to help you answer questions like this:

* Show me some ingested histograms with names that start with the prefix `order`.
* How many histograms-per-second come from hosts with names that start with the prefix `web`?
* What are some histograms that are tagged with `cluster` or `shard`?


### Endpoint and Parameters for Histograms

To get a sampling of ingested histograms, use the following endpoint. Replace `<your_instance>` with the name of your service instance:

  ```
  https://<your_instance>.wavefront.com/api/spy/histograms
  ```

To get a sampling of spans with specific characteristics, add one or more of the following parameters:

<table width="100%">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="20%">Type</th><th width="60%">Description</th></tr>
</thead>
<tr><td markdown="span">**histogram**</td>
<td>string, optional</td>
<td markdown="span">List a histogram only if its name starts with the specified case-sensitive prefix. <br> E.g., `histogram=orderShirt` matches histograms named `orderShirt` and `orderShirts`, but not `OrderShirts`.</td></tr>
<tr><td markdown="span">**host**</td>
<td>string, optional</td>
<td>List a histogram only if the name of its source starts with the specified case-sensitive prefix. </td></tr>
<tr><td markdown="span">**histogramTagKey**</td>
<td>string, optional</td>
<td markdown="span">List a histogram only if it has the specified tag key. Add this parameter multiple times to specify multiple tags, e.g. `histogramTagKey=cluster&histogramTagKey=shard` </td></tr>
<tr><td markdown="span">**sampling**</td>
<td>decimal, optional</td>
<td markdown="span">0 to .05, with 0.05 being 5%</td></tr>
<tr><td markdown="span">**wavefrontSource**</td>
<td>string, optional</td>
<td markdown="span">Filter for only points that are ingested through a particular proxy or user's token. To filter for a certain proxy, use this syntax: <code>proxy::&lt;proxy_source&gt;</td></tr>
<tr><td markdown="span">**usage**</td>
<td>Boolean, optional</td>
<td markdown="span">Flag that determines whether usage information is shown. </td></tr>
<tr><td markdown="span">**usageThresholdDays**</td>
<td>integer, optional</td>
<td markdown="span">If **usage** is set to true, specifies the number of days to look back to determine whether data has been accessed; defaults to 7</td></tr>
<tr><td markdown="span">**includeScalingFactor**</td>
<td>Boolean, optional</td>
<td markdown="span">Flag that determines whether the number of data ingesters is included in the output.</td></tr>
</tbody>
</table>


### Example Requests for Histograms

Suppose you have a service instance named `ex1`.

<table width="100%">
<tbody>
<thead>
<tr><th width="30%">To Get a Sample of <br>These Histograms</th><th width="70%">Use This Request</th></tr>
</thead>
<tr>
<td>Ingested histograms representing any operation.</td>
<td><code>http://ex1.wavefront.com/api/spy/histograms</code>
</td>
</tr>
<tr>
<td>Ingested histograms with names that begin with <code>orderShirts</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/histograms?histogram=orderShirts</code>
</td>
</tr>
<tr>
<td>Ingested histograms that have the specified sampling rate, tag key `cluster`, and histogram name `orderShirt`.</td>
<td><code>http://ex1.wavefront.com/api/spy/histograms?sampling=0.004&histogramTagKey=cluster&histogram=orderShirt</code>
</td>
</tr>
<tr>
<td>Ingested histograms from a host whose name starts with <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/histograms?host=web1</code>
</td>
</tr>
</tbody>
</table>


## Get Ingested Spans with Spy

Your service instance includes an HTTP endpoint that returns a sampling of ingested spans with specified characteristics. You can use the returned list of spans to help you answer questions like:

* Show me some ingested spans with names that start with the prefix `order`.
* How many spans-per-second come from hosts with names that start with the prefix `web`?
* What are some spans that are tagged with `cluster` or `shard`?


### Endpoint and Parameters for Spans

To get a sampling of ingested spans, use the following endpoint. Replace `<your_instance>` with the name of your service instance:

  ```
  https://<your_instance>.wavefront.com/api/spy/spans
  ```


To get a sampling of spans with specific characteristics, add one or more of the following parameters:

<table width="100%">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="20%">Type</th><th width="60%">Description</th></tr>
</thead>
<tr><td markdown="span">**name**</td>
<td>string, optional</td>
<td markdown="span">List a span only if its operation name starts with the specified case-sensitive prefix. <br> E.g., `name=orderShirt` matches spans named `orderShirt` and `orderShirts`, but not `OrderShirts`.</td></tr>
<tr><td markdown="span">**hostPrefix**</td>
<td>string, optional</td>
<td>List a span only if the name of its source starts with the specified case-sensitive prefix. </td></tr>
<tr><td markdown="span">**spanTagKey**</td>
<td>string, optional</td>
<td markdown="span">List a span only if it has the specified span tag key. Add this parameter multiple times to specify multiple span tags, e.g. `spanTagKey=cluster&spanTagKey=shard` </td></tr>
<tr><td markdown="span">**sampling**</td>
<td>decimal, optional</td>
<td markdown="span">0 to .05, with 0.05 being 5%.
 </td></tr>
</tbody>
</table>


### Example Requests for Spans

Suppose you have a service instance named `ex1`.

<table width="100%">
<tbody>
<thead>
<tr><th width="30%">To Get a Sample of <br>These Spans</th><th width="70%">Use This Request</th></tr>
</thead>
<tr>
<td>Ingested spans representing any operation.</td>
<td><code>http://ex1.wavefront.com/api/spy/spans</code>
</td>
</tr>
<tr>
<td>Ingested spans with names that begin with <code>orderShirts</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/spans?name=orderShirts</code>
</td>
</tr>
<tr>
<td>Ingested spans that have span tags <code>cluster</code> and <code>shard</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/spans?spanTagKey=cluster&spanTagKey=shard</code>
</td>
</tr>
<tr>
<td>Ingested spans from a host whose name starts with <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/spans?host=web1</code>
</td>
</tr>
</tbody>
</table>

## Get Ingested Span Logs with Spy

Span logs capture span-specific logging information and are supported by the OpenTracing standard. Some of our SDKs include span logs for errors by default. To get access to other span log information, you can customize an SDK to include [span log information](trace_data_details.html#span-logs) or [instrument your application](tracing_instrumenting_frameworks.html).

{% include note.html content="Span logs are disabled by default. If you want to enable span logs on your cluster, contact our Customer Success team at [support@wavefront.com](mailto:support@wavefront.com)."%}

You can use the returned list of span logs to find out if it contains the data that you expect.<br/>
Example:
  ```
  traceId="00000000-0000-0000-0000-00000001234" spanId="00000000-0000-0000-0000-000000012341"
  logs=[{"timestamp": 1572303812999, "fields": {"event": "error", "error.kind": "exception"}}]
  ```

### Endpoint and Parameters for Span Logs

To get a sample of the ingested span logs, use the following endpoint. Replace `<your_instance>` with the name of your service instance:

```
https://<your_instance>.wavefront.com/api/gateway/spy/spanlogs
```

By default, the sampling rate is 1%, which means that Tanzu Observability returns 1% of the data. To sample the span logs at a different sampling rate, add the `sampling` parameter to the URL.

<table width="100%">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="20%">Type</th><th width="60%">Description</th></tr>
</thead>
<tr><td markdown="span">**sampling**</td>
<td>decimal, optional</td>
<td markdown="span">0 to .05, with 0.05 being 5%.
 </td></tr>
</tbody>
</table>

### Example Requests for Span Logs

Suppose you have a service instance named `ex1` and want to spy on the ingested span logs at a sampling rate of 5%:
```
http://ex1.wavefront.com/api/gateway/spy/spanlogs?sampling=0.05
```

## Get New ID Assignments with Spy

During ingestion, Tanzu Observability assigns an ID to each newly added metric name, span name, source name, and <code>key=value</code> string of a point tag or span tag. A new ID generally indicates that a new time series has been introduced.

Your service instance includes an HTTP endpoint that provides a window into the current stream of new ID assignments. You can use the returned list of ID assignments to see if the data that is currently being ingested has introduced any metrics, sources, spans, or tags that your service instance hasn't seen yet.

### Endpoint and Parameters for New ID Assignments

To get a list of new ID assignments, use the following endpoint. Replace `<your_instance>` with the name of your service instance:

  ```
  https://<your_instance>.wavefront.com/api/spy/ids
  ```

To get ID assignments for a specific type of new item, add one or more of the following parameters:

<table width="100%">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="20%">Type</th><th width="60%">Description</th></tr>
</thead>
<tr><td markdown="span">**name**</td>
<td>string, optional </td>
<td>Case-sensitive prefix for the items that you are interested in. </td></tr>
<tr><td markdown="span">**type**</td>
<td>string, optional </td>
<td>
Type of new items you want to see ID assignments for:
<ul><li>
METRIC - Metric names
</li>
<li>
SPAN - Span names
</li>
<li>
HOST - Source names
</li>
<li markdown="span">
STRING - Point tags or span tags, represented as a single string containing a unique key-value pair, e.g. `env=prod`, `env=dev`, etc.
</li>
</ul>
</td></tr>
<tr><td markdown="span">**sampling**</td>
<td>decimal, optional </td>
<td markdown="span">0 to .05, with 0.05 being 5%</td></tr>
<tr><td markdown="span">**includeScalingFactor**</td>
<td>Boolean, optional</td>
<td markdown="span">Flag that determines whether the number of data ingesters is included in the output.</td></tr>
</tbody>
</table>


### Example Requests for New IDs

Suppose you have a service instance named `ex1`.

<table width="100%">
<tbody>
<thead>
<tr><th width="35%">To Get ID Assignments <br>For These Items</th><th width="65%">Use This Request</th></tr>
</thead>
<tr>
<td>All metric names, span names, source names, and tags.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids</code>
</td>
</tr>
<tr>
<td>All metric names.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=METRIC</code>
</td>
</tr>
<tr>
<td>Metric names that start with <code>cpu</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=METRIC&name=cpu</code>
</td>
</tr>
<tr>
<td>Key-value pairs with keys that start with <code>comp</code>. </td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=STRING&name=comp</code>
</td>
</tr>
<tr>
<td>Key-value pairs of the form <code>loc=palo</code>. </td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=STRING&name=loc%3Dpalo</code>
</td>
</tr>
<tr>
<td>Source names that start with <code>web1</code>.</td>
<td><code>http://ex1.wavefront.com/api/spy/ids?type=HOST&name=web1</code>
</td>
</tr>
</tbody>
</table>
