---
title: Traces, Spans, and Metrics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_details.html
summary: Learn about the format for Wavefront spans, and naming conventions for the RED metrics derived from them.
---

A [trace](tracing_basics.html#wavefront-trace-data) shows you how a particular request propagates from one microservice to the next in a distributed application. The basic building blocks of a trace are its spans, where each span corresponds to a distinct invocation of an operation that executes as part of the request. 

Spans are the fundamental units of trace data in Wavefront. This page provides details about the Wavefront format of a span, as well as the RED metrics that Wavefront derives from spans.


## Wavefront Span Format

A well-formed Wavefront span consists of fields and span tags that capture various attributes. These attributes enable Wavefront to identify and describe the span, organize it (possibly with other spans) into a trace, and visualize the trace according to the service and application that emitted it. Some attributes are required by the OpenTracing specification and others are required by Wavefront. 

Most use cases do not require you to know all of the details of the Wavefront span format:
* When you instrument your application with a [Wavefront OpenTracing SDK](wavefront_sdks.html#sdks-for-instrumenting-custom-operations) or a [framework-level SDK](wavefront_sdks.html#sdks-for-instrumenting-application-frameworks), your application emits spans that are automatically constructed by the Wavefront Tracer. (You supply some of the attributes when you instantiate the [ApplicationTags](tracing_instrumenting_frameworks.html#application-tags) object required by the SDK.)
* When you instrument your application with a [Wavefront core SDK](wavefront_sdks.html#core-sdks-for-sending-raw-data-to-wavefront), your application emits spans that are automatically constructed from raw data you pass as parameters. 
* When you instrument your application with a 3rd party distributed tracing system, your application emits spans that are automatically transformed by the [integration](trace_integrations.html) you set up. 

It is, however, possible to manually construct a well-formed span and send it either directly to the Wavefront service or to a TCP port that the Wavefront proxy is listening on for trace data.

### Span Syntax

```
<operationName> source=<source> <spanTags> <start_milliseconds> <duration_milliseconds>
```
Fields must be space separated and each line must be terminated with the newline character (\n or ASCII hex 0A).

### Span Fields

<table>
<colgroup>
<col width="20%" />
<col width="10%" />
<col width="40%" />
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
<td>The string name that indicates the operation represented by the span.</td>
<td>Valid characters: a-z, A-Z, 0-9, hyphen ("-"), underscore ("_"), dot ("."). <br> Length: less than 1024 characters.</td>
</tr>
<tr>
<td markdown="span">`source`</td>
<td>Yes</td>
<td>The string name of a host or container on which the represented operation executed.</td>
<td>Valid characters: a-z, A-Z, 0-9, hyphen ("-"), underscore ("_"), dot ("."). <br> Length: less than 1024 characters.</td>
</tr>
<tr>
<td markdown="span">`spanTags`</td>
<td>Yes</td>
<td markdown="span">See [below](#span_tags). </td>
<td></td>
</tr>
<tr>
<td markdown="span">`start_milliseconds`</td>
<td>Yes</td>
<td>Start time of the span. </td>
<td>Whole number of epoch milliseconds, which is the number of milliseconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC) on January 1, 1970.</td>
</tr>
<tr>
<td markdown="span">`duration_milliseconds`</td>
<td>Yes</td>
<td>Duration of the span, in milliseconds.</td>
<td>Whole number greater than or equal to 0.</td>
</tr>
</tbody>
</table>

### Span Tags

Span tags are special tags associated with a span. The values of span tags generally describe the span's context and the architecture of the instrumented application. An application can be instrumented to include custom span tags as well. Custom tags should not use the reserved keys listed in the following table. 

<table>
<colgroup>
<col width="20%" />
<col width="10%" />
<col width="50%" />
<col width="20%" />
</colgroup>
<thead>
<tr><th>Reserved Span Tag Key</th><th>Required</th><th>Description</th><th>Value</th></tr>
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
<td markdown="span">Identifier of the span's parent, if it has one. A span without this tag is the root (first) span of a trace.</td>
<td markdown="span">UUID</td>
</tr>
<tr>
<td markdown="span">`followsFrom`</td>
<td markdown="span">No</td>
<td markdown="span">Identifier of the preceding span.</td>
<td markdown="span">UUID</td>
</tr>
<tr>
<td markdown="span">`application`</td>
<td markdown="span">Yes</td>
<td markdown="span">Name of the instrumented application in which the operation occurred. </td>
<td markdown="span">String</td>
</tr>
<tr>
<td markdown="span">`service`</td>
<td markdown="span">Yes</td>
<td markdown="span">Name of the instrumented microservice in which the operation occurred.</td>
<td markdown="span">String</td>
</tr>
<tr>
<td markdown="span">`cluster`</td>
<td markdown="span">No</td>
<td markdown="span">Name of a group of related hosts that serves as a cluster or region in which the instrumented application runs.</td>
<td markdown="span">String</td>
</tr>
<tr>
<td markdown="span">`shard`</td>
<td markdown="span">No</td>
<td markdown="span">Name of a subgroup of hosts within the cluster.</td>
<td markdown="span">String</td>
</tr>
</tbody>
</table>

The maximum allowed length for a combination of a span tag key and value is 254 characters (255 including the "=" separating key and value). If the value is longer, the point is rejected.

<!---
Because of operations are normally composed of other operations, each span is normally related to other spans -  a parent span and children spans.
--->

### Sample Span Format 

```
"getAllUsers source=localhost
  traceId=7b3bf470-9456-11e8-9eb6-529269fb1459
  spanId=0313bafe-9457-11e8-9eb6-529269fb1459
  parent=2f64e538-9457-11e8-9eb6-529269fb1459
  application=Wavefront service=auth 
  http.method=GET
1533529977 343500"
```

## RED Metrics From Spans

<!---
Define RED
Generated from spans emitted by tracing system integration or OpenTracing SDK (links). (framework-level SDKs generate 1st class metrics, correlated with spans, but not derived from them.)
Metric naming conventions for R, E
Histogram distributions for D. Query with hs(), see all percentiles
Order of derivation vs. sampling and why you care. 
--->

<!---
<table>
<colgroup>
<col width="18%"/>
<col width="50%"/>
<col width="32%"/>
</colgroup>
<thead>
<tr><th>Menu</th><th>Description</th><th>Example</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span"> </td>
<td markdown="span"> </td>
<td markdown="span"> </td>
</tr>
</tbody>
</table>


--->
