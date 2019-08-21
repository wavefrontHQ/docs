---
title: traces() Function
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: ts_traces.html
summary: Learn how to write traces() queries.
---

## Summary

```
traces("<fullOperationName>" [and|or|not <filterName>="<filterValue>"])

traces(<filterName>="<filterValue>" [and|or|not <filterName>="<filterValue>"])
```
Returns the traces that contain one or more qualifying spans, where a qualifying span matches the specified operation and filters. Available only in the [Query Editor in the Traces browser](trace_data_query.html#use-query-editor-power-users). Can be combined with one or more [filtering functions](#filtering-functions).

### Parameters

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>fullOperationName</td>
<td markdown="span">Full name of the operation that a qualifying span must represent. For example, specify `"beachshirts.delivery.dispatch"` to match the spans that represent calls to an operation named `dispatch` in the `delivery` service of the `beachshirts` application. <br> The general format of a `fullOperationName` is `<application>.<service>.<operationName>`, where each component consists of one or more period-delimited components. Replace `operationName` or `serviceName` with an asterisk `*` to match spans for any operation in any service. </td>
</tr>
<tr>
<td>filterName</td>
<td markdown="span"> A [span filter](#span-filters) that a qualifying span must match. Span filters let you limit which spans to return traces for. You can optionally specify multiple span filters combined with Boolean operators (`and`, `or`, `not`).</td></tr>
<tr>
<td>filterValue</td>
<td markdown="span">Value accepted by a specified `filterName`.</td></tr>
</tbody>
</table>


## Description
The `traces()` function returns a set of traces, where each trace contains at least one qualifying member span. A span qualifies if it matches the description you specify, which might consist of an operation name, one or more [span filters](#span-filters), or a combination of these. 

You submit a `traces()` function using the [Query Editor in the Traces browser](trace_data_query.html#use-query-editor-power-users). 
Using the `traces()` function is a power-user alternative to using Query Builder.  

`traces()` returns a trace if it contains a member span that matches the _entire_ specified description. If the description is a Boolean expression that combines multiple span filters, then the same span must satisfy all of the filters in the expression. For example, the result set for  `traces(service=shopping and source=web1)` includes any trace that has at least one member span that is associated with _both_ of the tags `service=shopping` and `source=web1`. The result set does not include, e.g., a trace that has one member span with `service=shopping` and a different member span with `source=web1`.

<!--- Because trace data is generated the ordering of matched spans is unpredictable, running the same `traces()` query twice normally returns a different set of traces.

MONIT-13913 - You can use autocompletion to discover the span filters available for your query.

For more information about the set of returned traces, see [Understanding Trace Queries](trace_data_query.html#understanding-trace-queries).
--->

To keep query execution manageable, combine `traces()` with a [filtering function](#filtering-functions) such as `limit()` in the same query. 

You can specify the length of the qualifying spans by including a [`spans()`](ts_spans.html) expression as the `fullOperationName` parameter.

## Examples

Assume your team has instrumented an application called `beachshirts` for tracing. This application has a service called `styling` that executes an operation called `makeShirts`. The application is deployed on several hosts in each of several clusters.

**Note:** To keep query execution manageable, these examples use `traces()` with the `limit()` function.

To display the traces that include spans for calls to `makeShirt`:
- `limit(100, traces("beachshirts.styling.makeShirts"))`

To display the traces that include spans for any operation in the `styling` service:
- `limit(100, traces("beachshirts.styling.*"))`

To display the traces that include spans for any operation in the `beachshirts` application executing on either of two specified hosts:
- `limit(100, traces("beachshirts.*.*" and source=prod-app1 or source=prod-app10))`

<a name="filters"></a>

## Span Filters

Span filters allow you to limit which spans to return traces for. Span filters are key/value pairs associated with spans. Developers define the available span filters (also called *application tags*) as part of instrumenting the application code for tracing. Even if you did not instrument the code yourself, you can use autocompletion in the Query Editor to discover the available span filters.

The general format for a span filter is `<filterName>="filterValue"`.


<table style="width: 100%;">
<colgroup>
<col width="13%" />
<col width="53%" />
<col width="33%" />
</colgroup>
<thead>
<tr><th>Filter</th><th>Description</th><th>Example</th></tr>
</thead>
<tbody>
<tr>
<td>application</td>
<td markdown="span">Name that identifies an instrumented application, for example, `beachshirts`. Matches spans that represent operations that are performed by the specified application.</td>
<td><code>traces(application="beachshirts")</code></td>
</tr>
<tr>
<td>service</td>
<td markdown="span">Name that identifies an instrumented microservice, for example, `delivery`. Matches spans that represent operations that are performed by the specified microservice.</td>
<td><code>traces(service="delivery")</code></td>
</tr>
<tr>
<td>cluster</td>
<td markdown="span">Name of a group of related hosts that serves as a cluster or region in which an instrumented application runs, for example, `us-west-2`. Matches spans that represent operations that are executed on the specified cluster.</td>
<td><code>traces(cluster="us-west-2")</code></td>
</tr>
<tr>
<td>shard</td>
<td markdown="span">Name of a mirror or other subgroup of hosts within a cluster, for example, `secondary`. Matches spans that represent operations that are executed on the specified shard.</td>
<td><code>traces(shard="secondary")</code></td>
</tr>
<tr>
<td>source</td>
<td markdown="span">Host or container that an instrumented application is running on. Matches spans that represent operations that are executed on the specified source.</td>
<td><code>traces(source="prod-app1")</code></td>
</tr>
<tr>
<td>&lt;spanTag&gt;</td>
<td>Custom tag defined in your application code. Matches spans that are associated with the specified custom span tag.</td>
<td><code>traces(environment="production")</code></td>
</tr>
<tr>
<td>traceId</td>
<td markdown="span">Unique identifier for a trace. Returns the specified trace.</td>
<td><code>traces(traceId="5b309723-fb83-4c9c-afb6-f0dc4b2bff13")</code></td>
</tr>

</tbody>
</table>


## Filtering Functions

You can use filtering functions to provide additional levels of filtering for the results of the `traces()` function. 

**Note:** To keep query execution manageable, combine `traces()` with at least the `limit()` function.

Each filtering function has a **tracesExpression** parameter, which can be a `traces()` function or one of the other filtering functions. For example, to return up to 100 traces that are longer than 30 milliseconds, you can combine the `limit()`, `highpass()`, and `traces()` functions as follows:

* `limit(100, highpass(30ms, traces("beachshirts.delivery.dispatch")))`


<table style="width: 100%;">
<colgroup>
<col width="40%" />
<col width="60%" />
</colgroup>
<thead>
<tr><th>Spans Filtering Function</th><th>Description and Example</th></tr>
</thead>
<tbody>
<tr>
<td>limit(<strong>&lt;numberOfTraces&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</td>
<td markdown="span">Limits the results of **tracesExpression** to include the specified **numberOfTraces**.  <br>
**Note:** Because the ordering of traces is unpredictable, you cannot use `limit()` to page through a set of results to obtain the next group of traces. <br><br>

**Example:** Limit the set of returned traces to 50:<br>
`limit(50, traces("beachshirts.styling.makeShirts"))` <br>
</td>
</tr>
<tr>
<td>highpass(<strong>&lt;traceDuration&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</td>
<td markdown="span">Filters the results of **tracesExpression** to include only traces that are longer than **traceDuration**.  Specify **traceDuration** as an integer number of milliseconds, seconds, minutes, hours, days or weeks (1ms, 1s, 1m, 1h, 1d, 1w). <br><br>
**Example:** Limit the result set to include traces that are longer than 3 seconds: <br>
`highpass(3s, traces("beachshirts.styling.makeShirts"))`
</td>
</tr>
<tr>
<td>lowpass(<strong>&lt;traceDuration&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</td>
<td markdown="span">Filters the results of **tracesExpression** to include only traces that are shorter than **traceDuration**.  Specify **traceDuration** as an integer number of milliseconds, seconds, minutes, hours, days or weeks (1ms, 1s, 1m, 1h, 1d, 1w). <br><br>
**Example:** Limit the result set to include traces that are shorter than 10 milliseconds: <br>
`lowpass(10ms, traces("beachshirts.styling.makeShirts"))`
</td>
</tr>

</tbody>
</table>

<!--- May include eventually. Currently internal only, with no compelling use case for users.
<tr>
<td>rootsOnly(<strong>&lt;tracesExpression&gt;</strong>)</td>
<td markdown="span">Limits the set of spans that are matched by **tracesExpression** to include only spans that are the root spans of a trace, i.e., spans without any ancestor. <br><br>
**Example:**  <br>
`rootsOnly(traces(traceId="707261fc-d412-4926-b6f6-c2ca1053c914"))`
</td>
</tr>
<tr>
<td>childrenOnly(<strong>&lt;tracesExpression&gt;</strong>)</td>
<td markdown="span">Limits the set of spans that are matched by **tracesExpression** to include only spans that are the child spans of a trace, i.e., no root spans. <br> <br>
**Example:**  <br>
`childrenOnly(traces(traceId="707261fc-d412-4926-b6f6-c2ca1053c914"))`
</td>
</tr>
--->
