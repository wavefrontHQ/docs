---
title: traces() Function
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: traces_function.html
summary: Learn how to write traces() queries.
---

## `traces()` Function

The `traces()` function returns a set of traces that include the corresponding spans.

### Summary

```
traces("<fullOperationName>" [,|and|or [not] <filterName>="<filterValue>"] ...)

traces(<filterName>="<filterValue>" [,|and|or [not] <filter2Name>="<filter2Value>"] ...)

traces(<spansExpression>, [<spansExpression])
```
Returns the traces that contain one or more qualifying spans, where a qualifying span matches the specified operation and [span filters](#span-filters). Available only in the [Query Editor in the Traces browser](trace_data_query.html#use-query-editor-power-users). Can be combined with one or more [filtering functions](#filtering-functions).

### Parameters 

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="20%">Parameter</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>fullOperationName</td>
<td markdown="span">Full name of the operation that a qualifying span must represent. For example:
<br> **`"beachshirts.delivery.dispatch"`** matches spans that represent calls to an operation named **`dispatch`** in the **`delivery`** service of the **`beachshirts`** application.
<br> The general format is **`<application>.<service>.<operationName>`**, where each component consists of one or more period-delimited nodes. Replace **`operationName`** or **`serviceName`** with an asterisk **`*`** to match spans for any operation in any service. </td>
</tr>

<tr>
<td>filterName</td>
<td markdown="span"> A [span filter](#span-filters) that a qualifying span must match. Span filters let you limit which spans to return traces for. You can optionally specify multiple span filters combined with Boolean operators.</td></tr>
<tr>
<td>filterValue</td>
<td markdown="span">Value accepted by a specified **`filterName`**.</td></tr>
<tr>
<td markdown="span">[spansExpression](query_language_reference.html#query-expressions)</td>
<td markdown="span">Expression that describes the set of qualifying spans. You typically specify a [`spans()`](spans_function.html) query that is wrapped in a spans filtering function. For example, the following expression describes spans that qualify by being longer than 11 seconds: <br> **`highpass(11s, spans("beachshirts.styling.makeShirts"))`**. You can specify more than one spansExpression. </td>
</tr>
</tbody>
</table>


### Description
The `traces()` function returns a set of traces. Each trace contains at least one qualifying member span. A span qualifies if it matches the description you specify, which might consist of an operation name, one or more [span filters](#span-filters), or a combination of these.

You submit a `traces()` function using the [Query Editor in the Traces browser](trace_data_query.html#use-query-editor-power-users).
Using the `traces()` function is a power-user alternative to using Query Builder.

`traces()` returns a trace:
* If it contains a member span that matches the _entire_ specified description.
* If the description is a Boolean expression that combines multiple span filters, then the same span must satisfy *all* the filters.

  For example, the result set for  `traces(service=shopping and source=web1)` includes any trace that has at least one member span that is associated with _both_ of the tags `service=shopping` and `source=web1`. The result set does not include, e.g., a trace that has one member span with `service=shopping` and a different member span with `source=web1`.


To keep query execution manageable, combine `traces()` with a [filtering function](#filtering-functions) such as `limit()` in the same query.

To qualify spans based on their length, specify a [`spans()`](spans_function.html) query that is wrapped in a spans filtering function such as `highpass()`.

### Examples

Assume your team has instrumented an application called `beachshirts` for tracing. This application has a service called `styling` that executes an operation called `makeShirts`. The application is deployed on several hosts in each of several clusters.

**Note:** To keep query execution manageable, these examples use `traces()` with the `limit()` function.

Display the traces that include spans for calls to `makeShirt`:

`limit(100, traces("beachshirts.styling.makeShirts"))`

Display the traces that include spans for any operation in the `styling` service:

`limit(100, traces("beachshirts.styling.*"))`

Display the traces that include spans for any operation in the `beachshirts` application executing on either of two specified hosts:

`limit(100, traces("beachshirts.*.*" and (source="prod-app1" or source="prod-app10")))`

Display the traces that include spans for calls to `makeShirt` that are shorter than 3 milliseconds:

`limit(100, traces(lowpass(3ms, spans("beachshirts.styling.makeShirts"))))`

<a name="filters"></a>

### Span Filters

Span filters allow you to limit which spans to return traces for. Span filters are key/value pairs associated with spans. Developers define the available span filters (also called *application tags*) as part of instrumenting the application code for tracing. If you did not instrument the code yourself, you can use autocompletion in the Query Editor to discover the available span filters.

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


### Filtering Functions

You can use filtering functions to provide additional levels of filtering for the results of the `traces()` function.

You can combine filtering functions. For example, to return up to 100 traces that are longer than 30 milliseconds, you can combine the `limit()`, `highpass()`, and `traces()` functions as follows:

* `limit(100, highpass(30ms, traces("beachshirts.delivery.dispatch")))`

**Note:** To keep query execution manageable, combine `traces()` with at least the `limit()` function.

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
<td><a href="ts_limit.html">limit(<strong>&lt;numberOfTraces&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</a></td>
<td markdown="span">Limits the results of **tracesExpression** to include the specified **numberOfTraces**.
</td>
</tr>
<tr>
<td><a href="ts_highpass.html">highpass(<strong>&lt;traceDuration&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</a></td>
<td markdown="span">Filters the results of **tracesExpression** to include only traces that are longer than **traceDuration**.
</td>
</tr>
<tr>
<td><a href="ts_lowpass.html">lowpass(<strong>&lt;traceDuration&gt;</strong>, <strong>&lt;tracesExpression&gt;</strong>)</a></td>
<td markdown="span">Filters the results of **tracesExpression** to include only traces that are shorter than **traceDuration**.
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

## `apdex()` Function

The apdex score helps you understand how the response time of a service compares to the predefined response time threshold. See [Configure Apdex Settings](tracing_apdex.html) for details.
You can query data, create charts, and create alerts using the `apdex()` function.

Use the basic or advanced query format. 

* Basic apdex() queries are simple to use and don't require `hs()` (histograms query) knowledge. These queries give you results for a specific application and service. 
* Advanced apdex() queries let you specify advanced `hs()` queries. You can also query apdex data for more than one application or service.

### Summary

* **Basic querying**
  
  ```
  apdex(application=<application_name>, service=<service_name>)
  apdex(T, application=<application_name>, service=<service_name>)
  apdex(T, 4T, application=<application_name>, service=<service_name>)
  ```
  

* **Advanced querying**
  
  ```
  apdex(<histogram_series>)
  apdex(application=<application_name>, service=<service_name>, <histogram_series>)
  apdex(T, <histogram_series>)
  apdex(T, 4T, <histogram_series>)
  ```

### Parameters

<table style="width: 100;">
  <tr>
    <th width="25%">
      Parameter
    </th>
    <th width="74%">
      Description
    </th>
  </tr>
  <tr>
    <td markdown="span">
      `application_name`
    </td>
    <td markdown="span">
      Specify the name of the application you want to see data.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `service_name`
    </td>
    <td markdown="span">
      Specify the name of the service you want to see data.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `T`
    </td>
    <td markdown="span">
      Specify the satisfied threshold. If you specify the value in the query, it overrides the value you define under [Application Configurations](tracing_apdex.html#configure-the-threshold-t-value).
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `4T`
    </td>
    <td markdown="span">
      Configure the tolerating threshold. If you don't specify the value, wavefront uses the value defined for T and multiplies it by 4.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `histogram_series`
    </td>
    <td markdown="span">
      Specify advanced `hs()` queries. See [Histogram to Histogram Functions](query_language_reference.html#histogram-to-histogram-functions).
    </td>
  </tr>

</table>

### Description

You can use the basic or advanced `apdex()` function to query the apdex score. Wavefront derives the apdex score for each service. Therefore, you must specify the service you want to get the apdex data.

The **basic queries** do not require you to know `hs()` functions. It uses `hs(tracing.aggregated.derived.*.duration.micros.m)` as the underlying query to get the apdex scores. See [Aggregated RED Metrics](trace_data_details.html#aggregated-red-metrics). Basic queries only give you the apdex score for a given service. Therefore, you need to specify the application and service filters.

The **advanced queries** let you customize the `hs()` functions. Use the advanced queries if you are familiar with the [Histogram to Histogram Functions](query_language_reference.html#histogram-to-histogram-functions).
You can get the apdex score for more than one application using the advanced queries. Therefore, you can create alerts to find out when the apdex score of the services in an application are below a [specific range](tracing_apdex.html#interpreting-the-apdex-score).

### Examples
 Let's take a look at how you can use these queries:
 
 * Use the basic query to get the apdex score of the `beachshirts` application's `shopping` service over time.
    ```
    apdex(application=beachshirts, service=shopping)
    ```
    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_basic_query.png)
    
* Use the advanced query to find the apdex score of all the services every 30 minutes.
    <pre>
apdex(align(30m, merge(hs(tracing.aggregated.derived.*.duration.micros.m), application, service)))
    </pre>
    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_advanced_query_30_minute_bucket.png)
    
* Use the advanced query to get the apdex score of the `beachshirts` application's `shopping` service for the given time window (1vw). Let's use the Gauge chart.
    <pre>
apdex(align(1vw, merge(hs(tracing.aggregated.derived.*.m, application=beachshirts, service=delivery))))
    </pre>

    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_advanced_guage_chart.png)

    Wavefront rounds the apdex score to 2 decimal points so that it is easy for you to interpret the score. See [Interpreting the Apdex Score](tracing_apdex.html#interpreting-the-apdex-score). You need to update the Gauge chart settings to get the color to value mapping and to round the value to 2 decimal points.
    
    ![The screenshot shows how you need to configure the format tab of the gauge chart. You need se the decimal points to 2, set the min as 0 and max as 1, and then define the colors for the apdex range.](images/tracing_apdex_advanced_gauge_cahrt_format_tab.png)
    
    
## `apdexLatency()` Functions

The `apdexLatency()` function gets you the apdex threshold defined for the service, also known as the satisfied threshold (T), and the tolerating threshold, which is four times the satisfied threshold (4T).

### Summary

```
apdexLatency(application=<application_name>, service=<service_name>) 
apdexLatency(application=<application_name>, service=<service_name>, satisfied)
apdexLatency(application=<application_name>, service=<service_name>, tolerating)
```
### Parameters

<table style="width: 100;">
  <tr>
    <th width="20%">
      Parameter
    </th>
    <th width="80%">
      Description
    </th>
  </tr>
  <tr>
    <td markdown="span">
      `application_name`
    </td>
    <td markdown="span">
      Specify the name of the application you want to see data.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `service_name`
    </td>
    <td markdown="span">
      Specify the name of the service you want to see data.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `satisfied`
    </td>
    <td markdown="span">
      Get the satisfied threshold. It is the threshold value (T) defined for your application. See [Configure the Threshold (T) Value](tracing_apdex.html#configure-the-threshold-t-value).
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `tolerating`
    </td>
    <td markdown="span">
      Get the tolerating threshold. It is the satisfied threshold value (T) times 4.
    </td>
  </tr>

</table>

### Examples

The `apdexLatency()` gets you the satisfied threshold and tolerating threshold of a service. Let's look at the following examples:

* Get the satisfied threshold and tolerating threshold for the `beachshirts` application's `shopping` service.
    ```
    apdexLatency(application=beachshirts, service=shopping)
    ```
    
    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_latency_query.png)

* Only get the satisfied threshold for the `beachshirts` application's `shopping` service.
    ```
    apdexLatency(application=beachshirts, service=shopping, satisfied)
    ```

    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_latency_satisfied_threshold_only.png)
