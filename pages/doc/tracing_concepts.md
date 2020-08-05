---
title: Key Concepts
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_concepts.html
summary: Collect and visualize trace data from your applications.
---

Wavefront follows the [OpenTracing](https://opentracing.io/) standard for representing and manipulating trace data.

## Traces 
A trace shows you how a request propagates from one microservice to the next in a distributed application. The basic building blocks of a trace are its spans, where each span corresponds to a distinct invocation of an operation that executes as part of the request.

This diagram illustrates a trace for a particular request that started with the Shopping service's `orderShirts` request and finished with the Delivery service's `dispatch` request.

![tracing trace spans](images/tracing_trace_spans.png)

* This trace consists of 9 member spans, one for each operation performed in the request. The span for the first request (namely, the Shopping service's `orderShirts` span) is the root span of the trace.

* Several of the spans in our sample trace have parent-child relationships to other spans in the trace. For example, the Styling service’s makeShirts span has two child spans (printShirts and giftWrap), and each of these spans has a child span of its own.

* A parent-child relationship exists between two spans when one operation passes data or control to another, either in the same service or in a different one.
A parent span with multiple children represents a request that invokes multiple operations, either serially or in parallel.
You can think of the trace as a tree of related spans. The trace has a unique trace ID, which is shared by each member span in the tree.

* Trace IDs are not normally displayed because they are long and hard to remember. For convenience, we refer to a trace by using the service and operation of its root span. This means we use shopping: orderShirts as the label for the entire trace, as well as for its root span.

* Different traces have the same label if they represent different calls to the same operation. For example, a new, separate trace begins every time the Shopping service’s orderShirts API is called. The trace in our example is just one of potentially thousands of traces that start with a call to orderShirts. Each such trace has a unique trace ID, and normally has a different start time and duration.

## Spans

A Wavefront trace consists of one or more spans, which are the individual segments of work in the trace. Each span represents time spent by an operation in a service (often a microservice).

Spans are the fundamental units of trace data. This page provides details about the Wavefront format of a span, as well as the RED metrics that Wavefront automatically derives from spans. These details are mainly useful for developers who need to perform advanced customization.

### Wavefront Span Format

A well-formed Wavefront span consists of fields and span tags that capture span attributes. These attributes enable Wavefront to identify and describe the span, organize it into a trace, and display the trace according to the service and application that emitted it. Some attributes are required by the OpenTracing specification and others are required by Wavefront.

Most use cases do not require you to know exactly how Wavefront expects a span to be formatted:
* When you instrument your application with a [Wavefront OpenTracing SDK](wavefront_sdks.html#sdks-for-collecting-trace-data) or a [framework SDK](wavefront_sdks.html#sdks-that-instrument-frameworks), your application emits spans that are automatically constructed by the Wavefront Tracer. (You supply some of the attributes when you instantiate the [ApplicationTags](tracing_instrumenting_frameworks.html#application-tags) object required by the SDK.)
* When you instrument your application with a [Wavefront sender SDK](wavefront_sdks.html#sdks-for-sending-raw-data-to-wavefront), your application emits spans that are automatically constructed from raw data you pass as parameters.
* When you instrument your application with a 3rd party distributed tracing system, your application emits spans that are automatically transformed by the [integration](tracing_integrations.html#tracing-system-integrations) you set up.

It is possible to manually construct a well-formed span and send it either [directly to the Wavefront service](direct_ingestion.html#trace-data-spans) or to a TCP port that the Wavefront proxy is listening on for trace data. You might want to do this if you instrumented your application with a proprietary distributed tracing system.

### Span Syntax

```
<operationName> source=<source> <spanTags> <start_milliseconds> <duration_milliseconds>
```
Fields must be space separated and each line must be terminated with the newline character (\n or ASCII hex 0A).

For example:
```
getAllUsers source=localhost traceId=7b3bf470-9456-11e8-9eb6-529269fb1459 spanId=0313bafe-9457-11e8-9eb6-529269fb1459 parent=2f64e538-9457-11e8-9eb6-529269fb1459 application=Wavefront service=auth cluster=us-west-2 shard=secondary http.method=GET 1552949776000 343
```

### Span Fields

<table id = "spanfields">
<colgroup>
<col width="25%" />
<col width="10%" />
<col width="35%" />
<col width="30%" />
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
<td markdown="span">`operationName`</td>
<td>Yes</td>
<td>Name of the operation represented by the span.</td>
<td>String of less than 1024 characters. <br>Valid: a-z, A-Z, 0-9, hyphen ("-"), underscore ("_"), dot (".").</td>
</tr>
<tr>
<td markdown="span">`source`</td>
<td>Yes</td>
<td>Name of a host or container on which the operation executed.</td>
<td>String of less than 1024 characters.<br>Valid: a-z, A-Z, 0-9, hyphen ("-"), underscore ("_"), dot ("."). </td>
</tr>
<tr>
<td markdown="span">`spanTags`</td>
<td>Yes</td>
<td markdown="span">See [Span Tags](#span-tags), below. </td>
<td></td>
</tr>
<tr>
<td markdown="span">`start_milliseconds`</td>
<td>Yes</td>
<td>Start time of the span, expressed as Epoch time. </td>
<td markdown="span">Whole number of Epoch milliseconds [or other units (see below)](#time-value-precision-in-spans). </td>
</tr>
<tr>
<td markdown="span">`duration_milliseconds`</td>
<td>Yes</td>
<td>Duration of the span.</td>
<td markdown="span">Whole number of milliseconds [or other units (see below)](#time-value-precision-in-spans). Must be greater than or equal to 0. </td>
</tr>
</tbody>
</table>

### Span Tags

Span tags are special tags associated with a span and are key-value pairs.

- **Required**. Many of the span tags are required for a span to be valid.
- **Optional (Custom)**. An application can be instrumented to include custom span tags as well. Custom tag names must not use the reserved span tag names.

{% include note.html content="Make sure your span tags are within the maximum character limit as explained below." %}
The following table lists the maximum number of characters you can assign a span tag.
<table>
<colgroup>
<col width="20%" />
<col width="10%" />
<col width="70%" />
</colgroup>
<thead>
<tr>
<th>Element</th>
<th>Maximum Length</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Span tag key</td>
<td>128</td>
<td>If the span tag key exceeds the maximum length, the span associated with it is blocked by Wavefront.</td>
</tr>
<tr>
<td>Span tag value</td>
<td>128</td>
<td>If the span tag value exceeds the maximum length, the value is truncated to the maximum number of characters.</td>
</tr>
</tbody>
</table>

The following table lists span tags that contain information about the span's identity and relationships.

<table>
<colgroup>
<col width="20%" />
<col width="10%" />
<col width="55%" />
<col width="15%" />
</colgroup>
<thead>
<tr><th>Span Tags <br>for Identity</th><th>Required</th><th>Description</th><th>Type</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`traceId`</td>
<td markdown="span">Yes</td>
<td markdown="span">Unique identifier of the trace the span belongs to. All spans that belong to the same trace share a common trace ID. </td>
<td markdown="span">UUID</td>
</tr>
<tr>
<td markdown="span">`spanId`</td>
<td markdown="span">Yes</td>
<td markdown="span">Unique identifier of the span.</td>
<td markdown="span">UUID</td>
</tr>
<tr>
<td markdown="span">`parent`</td>
<td markdown="span">No</td>
<td markdown="span">Identifier of the span's dependent parent, if it has one. This tag is populated as the result of an OpenTracing `ChildOf` relationship.
A span without the `parent` or `followsFrom` tag is the root (first) span of a trace. </td>
<td markdown="span">UUID</td>
</tr>
<tr>
<td markdown="span">`followsFrom`</td>
<td markdown="span">No</td>
<td markdown="span">Identifier of the span's non-dependent parent, if it has one. This tag is populated as the result of an OpenTracing `FollowsFrom` relationship. Wavefront ignores spans with this tag when calculating the critical path through a trace. A span without the `parent` or `followsFrom` tag is the root (first) span of a trace. </td>
<td markdown="span">UUID</td>
</tr>
</tbody>
</table>

The following table lists span tags that describe the architecture of the instrumented application that emitted the span. Wavefront uses these tags to aggregate and filter trace data at different levels of granularity. These tags correspond to the [application tags](tracing_instrumenting_frameworks.html#how-wavefront-uses-application-tags) you set through a Wavefront observability SDK.

<table>
<colgroup>
<col width="20%" />
<col width="10%" />
<col width="55%" />
<col width="15%" />
</colgroup>
<thead>
<tr><th>Span Tags <br>for Filtering</th><th>Required</th><th>Description</th><th>Type</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`application`</td>
<td markdown="span">Yes</td>
<td markdown="span">Name of the instrumented application that emitted the span. </td>
<td markdown="span">String</td>
</tr>
<tr>
<td markdown="span">`service`</td>
<td markdown="span">Yes</td>
<td markdown="span">Name of the instrumented microservice that emitted the span.</td>
<td markdown="span">String</td>
</tr>
<tr>
<td markdown="span">`cluster`</td>
<td markdown="span">Yes</td>
<td markdown="span">Name of a group of related hosts that serves as a cluster or region in which the instrumented application runs. <br>
Specify <strong>cluster=none</strong> to indicate a span that does not use this tag.</td>
<td markdown="span">String</td>
</tr>
<tr>
<td markdown="span">`shard`</td>
<td markdown="span">Yes</td>
<td markdown="span">Name of a subgroup of hosts within the cluster, for example, a mirror.
<br>Specify <strong>shard=none</strong> to indicate a span that does not use this tag.</td>
<td markdown="span">String</td>
</tr>
</tbody>
</table>

Wavefront does not allow the mandatory span tags to have multiple values. Make sure that your application does not send spans with multiple application/service tags.
For example, a span with two span tags `service=notify` and `service=backend` is invalid.

**Note:** Additional span tags may be present, depending on how you instrumented your application. For example, the [framework SDKs](wavefront_sdks.html#sdks-that-instrument-frameworks) automatically use span tags like `component`, `http.method`, and so on. You can find out about these tags in the README file for the SDK on GitHub.

<!---
Because operations are normally composed of other operations, each span is normally related to other spans -  a parent span and children spans.
--->

### Time-Value Precision in Spans

A span has two time-value [fields](#spanfields) for specifying the start time (`start_milliseconds`) and duration (`duration_milliseconds`). Express these values in milliseconds, because Wavefront uses milliseconds for span storage and visualization. For convenience, you can specify time values in other units. Wavefront converts the values to milliseconds.

Wavefront requires that you use the same precision for _both_ time values. Wavefront identifies the precision of the `start_milliseconds` value, and interprets the `duration_milliseconds` value using the same unit. The following table shows how to indicate the start-time precision:

<table>
<colgroup>
<col width="25%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="15%" />
</colgroup>
<thead>
<tr><th>Precision for <br>Start Time Values</th><th>Number Format</th><th>Sample <br>Start Value</th><th>Stored As <br>Milliseconds</th><th>Conversion<br>Method</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">Seconds</td>
<td markdown="span">Fewer than 13 digits</td>
<td markdown="span">`1533529977`</td>
<td markdown="span">`1533529977000`</td>
<td markdown="span">Multiplied by 1000</td>
</tr>
<tr>
<td markdown="span">Milliseconds  <br>(Thousandths of a second)</td>
<td markdown="span">13 to 15 digits</td>
<td markdown="span">`1533529977627`</td>
<td markdown="span">`1533529977627`</td>
<td markdown="span"> -- </td>
</tr>
<tr>
<td markdown="span">Microseconds <br>(Millionths of a second)</td>
<td markdown="span">16 to 18 digits</td>
<td markdown="span">`1533529977627992`</td>
<td markdown="span">`1533529977627`</td>
<td markdown="span">Truncated</td>
</tr>
<tr>
<td markdown="span">Nanoseconds <br>(Billionths of a second)</td>
<td markdown="span">19 or more digits</td>
<td markdown="span">`1533529977627992726`</td>
<td markdown="span">`1533529977627`</td>
<td markdown="span">Truncated</td>
</tr>

</tbody>
</table>

**Note:** When specifying a span in Wavefront span format, make sure you adjust values as necessary so that the units match. For example, suppose you know a span started at `1533529977627` epoch milliseconds, and lasted for `3` seconds. In Wavefront span format, you could specify either of the following pairs of time values:

| `1533529977` | `3` | (both values in seconds) |
| `1533529977627` | `3000` | (both values in milliseconds) |

### Indexed and Unindexed Span Tags

Wavefront uses indexes to optimize the performance of queries that filter on certain span tags. For example, Wavefront indexes the application tags (`application`, `service`, `cluster`, `shard`) so you can quickly query for spans that represent operations from a particular application, service, cluster, or shard. In addition to the application tags, Wavefront indexes certain built-in span tags that conform to the OpenTracing standard, such as `span.kind`, `component`, `http.method`, and `error`.

For performance reasons, Wavefront automatically indexes built-in span tags with low cardinality. (A tag with low cardinality has comparatively few unique values that can be assigned to it.) So, for example, a tag like `spanId` is not indexed.

**Note:** Wavefront does not automatically index any custom span tags that you might have added when you instrumented your application. If you plan to use a low-cardinality custom span tag in queries, contact Wavefront support to request indexing for that span tag.

## RED Metrics

If you instrument your application with a [tracing-system integration](tracing_integrations.html#tracing-system-integrations) or with a [Wavefront OpenTracing SDK](wavefront_sdks.html#sdks-for-collecting-trace-data), Wavefront derives RED metrics from the spans that are sent from the instrumented application. Wavefront automatically aggregates and displays RED metrics for different levels of detail with no additional configuration or instrumentation on your part.

RED metrics are key indicators of the health of your services, and you can use them to help you discover problem traces. RED metrics are measures of:

* Rate of requests – the number of requests being served per minute
* Errors – the number of failed requests per minute
* Duration – per-minute histogram distributions of the amount of time that each request takes

### Span RED Metrics and Trace RED Metrics

Wavefront uses ingested spans to derive RED metrics for two kinds of request:
* Span RED metrics measure individual operations, typically within a single service. For example, a span RED metric might measure the number of calls per minute to the `dispatch` operation in the `delivery` service.

  Wavefront uses span RED metrics as the basis for the [predefined charts](#predefined-charts) shown below.

* Trace RED metrics measure traces that start with a given root operation. For example, a trace RED metric might measure the number of traces that each start with a call to the `orderShirts` operation in the `shopping` service.

  Wavefront derives trace RED metrics from each trace's root span and end span. (If a trace has multiple root spans, the earliest is used.) You need to [query for trace metrics](#red-metrics-queries) to visualize them.

**Note:** For traces that consist entirely of synchronous member spans, trace RED metrics are equivalent to the corresponding span RED metrics. For traces that have asynchronous member spans, trace RED metrics provide more accurate measures of trace duration, especially when a trace's root span ends before a child span.

### RED Metric Counters and Histograms

The types of RED metrics that we show in the [predefined charts](#predefined-charts) are rates and 95th percentile distributions. These metrics are themselves based on underlying counters and histograms that Wavefront automatically derives from spans. You can use these underlying counters and histograms in [RED metrics queries](#red-metrics-queries), for example, to create alerts on trace data.

Wavefront constructs the names of the underlying counters and histograms as shown in the table below. The name components `<application>`, `<service>`, and `<operationName>` are string values that Wavefront obtains from the spans on which the metrics are derived. If necessary, Wavefront modifies these strings to comply with the Wavefront [metric name format](wavefront_data_format.html#wavefront-data-format-fields). Wavefront also associates each metric with point tags `application`, `service`, and `operationName`, and assigns the corresponding span tag values to these point tags. The span tag values are used without modification.

{% include warning.html content="Do not configure the Wavefront proxy to add prefixes to metric names. Doing so will change the names of the RED metric counters and histograms, and prevent these metrics from appearing in the Wavefront UI, e.g., in [predefined charts](#predefined-charts)." %}

<table id = "oplevelredmetrics">
<colgroup>
<col width="45%"/>
<col width="15%"/>
<col width="40%"/>
</colgroup>
<thead>
<tr><th markdown="span">Span RED Metric Names</th><th>Metric Type</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`tracing.derived.<application>.<service>.<operationName>.invocation.count`  </td>
<td markdown="span">Counter</td>
<td markdown="span">The number of times that the specified operation is invoked. <br>Used in the Request Rate chart that is generated for a service. </td>
</tr>
<tr>
<td markdown="span">`tracing.derived.<application>.<service>.<operationName>.error.count`   </td>
<td markdown="span">Counter</td>
<td markdown="span">The number of invoked operations that have errors (i.e., spans with `error=true`). <br>Used in the Error Rate chart that is generated for a service. </td>
</tr>
<tr>
<td markdown="span">`tracing.derived.<application>.<service>.<operationName>.duration.micros.m`  </td>
<td markdown="span">Wavefront histogram</td>
<td markdown="span">The duration of each invoked operation, in microseconds, aggregated in one-minute intervals. <br>Used in the Duration chart that is generated for a service. </td>
</tr>
</tbody>
</table>


<table id = "tracelevelredmetrics">
<colgroup>
<col width="45%"/>
<col width="15%"/>
<col width="40%"/>
</colgroup>
<thead>
<tr><th>Trace RED Metric Names</th><th>Metric Type</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">`tracing.root.derived.<application>.<service>.<operationName>.invocation.count`  </td>
<td markdown="span">Counter</td>
<td markdown="span">The number of traces that start with the specified root operation. </td>
</tr>
<tr>
<td markdown="span">`tracing.root.derived.<application>.<service>.<operationName>.error.count`   </td>
<td markdown="span">Counter</td>
<td markdown="span">The number of traces that start with the root operation, and contain one or more spans with errors
(i.e., spans with `error=true`). </td>
</tr>
<tr>
<td markdown="span">`tracing.root.derived.<application>.<service>.<operationName>.duration.millis.m`  </td>
<td markdown="span">Wavefront histogram</td>
<td markdown="span">The duration of each trace, in milliseconds, aggregated in one-minute intervals. Duration is measured from the start of the earliest root span to the end of the last span in a trace.</td>
</tr>
</tbody>
</table>

### RED Metrics Queries

You can perform queries over [RED metric counters and histograms](#red-metric-counters-and-histograms) and visualize the results in your own charts, just as you would do for any other metrics in Wavefront. You can create alerts on trace data by using RED metrics queries in alert conditions.

**Examples**

Find at the per-minute error rate for a specific operation executing on a specific cluster:

```
rate(ts(tracing.derived.beachshirts.shopping.orderShirts.error.count and cluster=us-east-1)) * 60
```

Find the per-minute error rate for traces that begin with a specific operation:

```
rate(ts(tracing.root.derived.beachshirts.shopping.orderShirts.error.count)) * 60
```

Use a [histogram query](visualize_histograms.html#querying-histogram-metrics) to return durations at the 75th percentile for an operation in a service. (The predefined charts display only the 95th percentile.)

```
percentile(75, hs(tracing.derived.beachshirts.delivery.dispatch.duration.micros.m))
```

**Syntax Alternatives**

Wavefront supports 2 alternatives for specifying the RED metric counters and histograms in a query:
* Use the metric name, for example:
  ```
  ts(tracing.derived.beachshirts.delivery.dispatch.error.count)
  ```
* Use the point tags `application`, `service`, and `operationName` that Wavefront automatically associates with the metric, for example:
  ```
  ts(tracing.derived.*.invocation.count, application="beachshirts" and service="delivery" and operationName="dispatch")
  ```

The point tag technique is useful when the metric name contains string values for `<application>`, `<service>`, and `<operationName>` that have been modified to comply with the Wavefront [metric name format](wavefront_data_format.html#wavefront-data-format-fields). The point tag value always corresponds exactly to the span tag values.


### Trace Sampling and Derived RED Metrics

If you have instrumented your application with a Wavefront observability SDK, Wavefront derives the RED metrics from 100% of the generated spans, _before_ any sampling is performed. This is true when the sampling is performed by the SDK or when the sampling is performed by a Wavefront proxy. Consequently, the RED metrics provide a highly accurate picture of your application's behavior. However, if you click through a chart to inspect a particular trace, you might discover that the trace has not actually been ingested in Wavefront. You can consider configuring a less restrictive [sampling strategy](trace_data_sampling.html).

If you have instrumented your application using a 3rd party distributed tracing system, Wavefront derives the RED metrics _after_ sampling has occurred. The Wavefront proxy receives only a subset of the generated spans, and the derived RED metrics will reflect just that subset. See [Trace Sampling and RED Metrics from an Integration](tracing_integrations.html#trace-sampling-and-red-metrics-from-an-integration).
