---
title: spans() Queries
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: spans_queries.html
summary: Learn how to write spans() queries.
---

## Summary

```
spans("<operationName>" [and|or|not "<filterName>"="<filterValue>"])

spans("<filterName>"="<filterValue>" [and|or|not "<filterName>"="<filterValue>"])
```
Returns the traces that contain one or more qualifying spans, where a qualifying span matches the specified filters.

### Parameters

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>operationName</td>
<td markdown="span">Name of the operation that each qualifying span must represent. For example, specify `"dispatch"` to match the spans that represent calls to an operation named `dispatch`. Omit this parameter to find the spans that represent calls to any operation.</td>
</tr>
<tr>
<td>filterName</td>
<td markdown="span"> A [span filter](#filters) that each qualifying span must match. Span filters let you limit which spans to return traces for. You can optionally specify multiple span filters separated by the boolean operators (and, or, not).</td></tr>
<tr>
<td>filterValue</td>
<td markdown="span">Value accepted by a specified `filterName`.</td></tr>
</tbody>
</table>


## Description
The `spans()` function finds spans that match the filters you specify, and then returns the set of whole traces that contain one or more of these spans. For more details, see [Understanding Trace Queries](trace_data_query.html#understanding-trace-queries).

You submit a `spans()` function using the [Query Editor on the **Traces** page](trace_data_query.html#ways-to-submit-trace-queries). 
You can use autocompletion to discover the span filters available for your query. The `spans()` function is a "power-user alternative" to using the menus provided by the Query Builder.  

**Note:** To keep query execution short, it is highly recommended that you combine `spans()` with a [span-set filtering function](#span-set-filtering-functions) such as `limit()` in the same query. 

### Examples

Assume your team has instrumented an application called `beachshirts` for tracing. This application has a service called `styling` that executes an operation called `makeShirts`. The application is deployed on several hosts in each of several clusters.

**Note:** To keep query execution short, these examples use `spans()` with the `limit()` function.

To display the traces that include spans for calls to `makeShirt`, run the following query:
- `limit(20, spans("makeShirts" and application="beachshirts" and service="styling"))`

To display the traces that include spans for any operation in the `styling` service, run the following query:
- `limit(20, spans(application="beachshirts" and service="styling"))`

To display the traces that include spans for any operation in the `beachshirts` application executing on either of two specified hosts, run the following query:
- `limit(20, spans(application="beachshirts" and source=prod-app1 or source=prod-app10))`

<a name="filters"></a>

## Span Filters

Span filters allow you to limit which spans to return traces for. Span filters are key/value pairs associated with spans. Developers define the available span filters (also called *application tags*) as part of instrumenting the application code for tracing. Even if you did not instrument the code yourself, you can use autocompletion in the query editor to discover the available span filters.

The general format for a span filter is `"filterName"="filterValue"`. (You can think of `"<operationName>"` as special case, where you only need to specify the filter value.) You can omit the quotation marks around `<filterName>`.


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
<td markdown="span">Name that identifies an instrumented application, for example, `beachshirts`. Matches spans representing operations that are  performed by the specified application.</td>
<td><code>spans(application="beachshirts")</code></td>
</tr>
<tr>
<td>service</td>
<td markdown="span">Name that identifies an instrumented microservice, for example, `delivery`. Matches spans representing operations that are  performed by the specified microservice.</td>
<td><code>spans(service="delivery")</code></td>
</tr>
<tr>
<td>cluster</td>
<td markdown="span">Name of a group of related hosts that serves as a cluster or region in which an instrumented application runs, for example, `us-west-2`. Matches spans representing operations that are exeucted on the specified cluster.</td>
<td><code>spans(cluster="us-west-2")</code></td>
</tr>
<tr>
<td>shard</td>
<td markdown="span">Name of a subgroup of hosts within a cluster, for example, `secondary`. Matches spans representing operations that are executed on the specified shard.</td>
<td><code>spans(shard="secondary")</code></td>
</tr>
<tr>
<td>source</td>
<td markdown="span">Host or container that an instrumented application is running on. Matches spans representing operations that are executed on the specified source.</td>
<td><code>spans(source="prod-app1")</code></td>
</tr>
<tr>
<td>traceId</td>
<td markdown="span">Unique identifier for a trace. Matches all spans belonging to the specified trace.</td>
<td><code>spans(traceId="5b309723-fb83-4c9c-afb6-f0dc4b2bff13")</code></td>
</tr>
<tr>
<td>&lt;spanTag&gt;</td>
<td>Custom tag defined in your application code. Matches spans that are associated with the specified span tag.</td>
<td><code>spans(environment="production")</code></td>
</tr>

</tbody>
</table>

## Span Set Filtering Functions

<table style="width: 100%;">
<colgroup>
<col width="40%" />
<col width="60%" />
</colgroup>
<thead>
<tr><th>Function</th><th>Description</th></tr>
</thead>
<tbody>
<tr>
<td>limit(<strong>&lt;numberOfSpans&gt;</strong>, <strong>&lt;spansExpression&gt;</strong>)</td>
<td markdown="span">Limits the number of spans that are matched by **spansExpression** to the specified **numberOfSpans**. <br>
For example:<br>
`limit(20, spans("makeShirts", application="beachshirts"))`
</td>
</tr>
<tr>
<td>highpass(<strong>&lt;spanDuration&gt;</strong>, <strong>&lt;spansExpression&gt;</strong>)</td>
<td markdown="span">Limits the set of spans that are matched by **spansExpression** to include only spans that are longer than **spanDuration**.  Specify **spanDuration** as an integer number of seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w). <br>
For example, to return traces in which the qualifying spans are longer than 3 seconds: <br>
`highpass(3s, spans("makeShirts", application="beachshirts"))`
</td>
</tr>
<tr>
<td>lowpass(<strong>&lt;spanDuration&gt;</strong>, <strong>&lt;spansExpression&gt;</strong>)</td>
<td markdown="span">Limits the set of spans that are matched by **spansExpression** to include only spans that are shorter than **spanDuration**.  Specify **spanDuration** as an integer number of seconds, minutes, hours, days or weeks (1s, 1m, 1h, 1d, 1w). <br>
For example, to return traces in which the qualifying spans are shorter than 3 seconds: <br>
`lowpass(3s, spans("makeShirts", application="beachshirts"))`
</td>
</tr>
<tr>
<td>rootsOnly(<strong>&lt;spansExpression&gt;</strong>)</td>
<td markdown="span">Limits the set of spans that are matched by **spansExpression** to include only spans that are the root spans of a trace, i.e., spans without any ancestor. <br>
For example: <br>
`rootsOnly(spans(traceId="5b309723-fb83-4c9c-afb6-f0dc4b2bff13"))`
</td>
</tr>
<tr>
<td>childrenOnly(<strong>&lt;spansExpression&gt;</strong>)</td>
<td markdown="span">Limits the set of spans that are matched by **spansExpression** to include only spans that are the child spans of a trace, i.e., filters out root spans. <br> 
For example: <br>
`childrenOnly(spans(traceId="5b309723-fb83-4c9c-afb6-f0dc4b2bff13"))`
</td>
</tr>

</tbody>
</table>
