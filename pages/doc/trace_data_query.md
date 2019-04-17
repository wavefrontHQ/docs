---
title: Querying Trace Data
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_query.html
summary: Learn how to query for Wavefront trace data.
---

After your application sends [trace data](tracing_basics.html#wavefront_trace_data) to Wavefront, you can examine that data in the Traces browser. By fine-tuning the trace query in the Traces browser, you find the traces that you're interested in by describing the spans they must contain.

## Understanding Trace Queries

You query for traces by describing the spans they must contain. A trace query can specify span characteristics, such as an operation name, duration thresholds, and values for the tags that you set up when you instrumented your application. 

A trace query:
1. Finds the spans that match the description you specify.
2. Returns the traces that contain a qualifying span. 

For example, you can use a trace query to return traces that contain a span that meets all of the following criteria: 
* Is longer than 45 milliseconds.
* Represents an operation called `dispatch` that is performed by a service called `delivery`.
* Represents work done on a cluster called `us-west-2`.
* Is associated with a custom tag `env=production`.

A returned trace normally contains other spans that do not meet these criteria. 

### Graphic Representation of a Returned Trace

Wavefront displays a bar for each trace that contains at least one span that meets the criteria. The bar's length represents the trace's duration. The bar's color indicates whether the trace has an error in one or more spans (red) or has no reported errors (blue):

![tracing query results](images/tracing_query_results.png)

### How Wavefront Labels a Returned Trace

Each bar that is returned by a query represents a unique trace that has a unique trace ID. For readability, we label each trace by its root span, which is the first span in the trace. The trace's label is the name of the operation that the root span represents.

For example, the two returned traces shown above both have the label **shopping: orderShirts**. This is because both traces have a root span
that represents the work done by the `orderShirts` operation in the `shopping` service. However, these root spans represent different executions of the `orderShirts` operation, with different start times. Consequently, although these two root spans have the same operation name, they mark the beginning of two different traces.

**Note:** A label such as **shopping: orderShirts** refers to the root span of a trace, which may be different from the span that was specified in the query. For example, suppose you query for spans that represent `dispatch` operations. The query could return traces that begin with `orderShirts`, if those traces contain a `dispatch` span. 

### Limiting the Result Set

To prevent a trace query from taking a long time, you normally specify a limit on the number of spans that can be matched. The trace query starts by matching the most recent spans.  After reaching the limit, the query stops looking for more matching spans. 

**Note:** The current time window for the Traces browser also implicitly limits by the result set. Traces are returned only if they contain a matching span _and_ start within the current time window.

<!---
**Note:** The limit applies to the number of spans that a query matches, and not to the number of traces that the query returns. For example, say you limit a query to 20 spans. If 2 or more qualified spans belong to the same trace, that trace is shown only once, and you will see fewer than 20 traces in the result set.
--->

## Submitting Trace Queries

You submit queries and view the results in the Traces browser. 

To navigate to the Traces browser directly:

* Click **Applications > Traces** in the task bar.

Wavefront provides assistance for constructing and submitting a trace query:
* Query Builder: Use menus to select tag values for filtering spans.
    ![tracing query builder](images/tracing_query_builder.png)

* Query Editor: Type a [`traces()` query](traces_function.html), and take advantage of syntax completion for selecting tags and their values. 
    ![tracing query editor](images/tracing_query_editor.png) 


To toggle between Query Builder and Query Editor: 

1. Display the Traces browser.
2. Click this icon: 
    ![tracing query toggle](images/tracing_query_toggle.png)

## Building a Trace Query

Query Builder lets you use menus for selecting values that describe the spans you want to see. Certain menus correspond to tags that a developer specified while instrumenting the application code. An empty menu means that the code was instrumented without the corresponding tags.

1. Display the Traces browser and make sure Query Builder is displayed. (It is displayed by default.)
2. Select a value from one or more of the menus. At a minimum you must select an application from the Operation menu. 

    <table>
    <colgroup>
    <col width="20%"/>
    <col width="80%"/>
    </colgroup>
    <thead>
    <tr><th>Menu</th><th>Description</th></tr>
    </thead>
    <tbody>
    <tr>
    <td markdown="span">**Operation**</td>
    <td>Match spans that represent work done by the selected operation. If you instrumented the code with application tags, this menu cascades so you can find spans that represent the work done by:
      <ul>
      <li> All operations in all services in a selected application.</li>
      <li> All operations in a selected service and application.</li>
      <li> A selected operation in a selected service and application.</li>
      </ul>
    </td>
    </tr>
    <tr>
    <td markdown="span">**Cluster**</td>
    <td markdown="span">Match spans from the selected cluster. A cluster is a named group of host machines. Wavefront populates this menu based on the selection you made from the **Operation** menu.</td>
    </tr>
    <tr>
    <td markdown="span">**Shard**</td>
    <td markdown="span">Match spans from a selected shard. A shard is a named subgroup of the hosts in a particular cluster. Wavefront populates this menu based on the selection you made from the **Operation** menu.</td>
    </tr>
    <tr>
    <td markdown="span">**Filters**</td>
    <td markdown="span">Match spans from a selected source (host). If you instrumented the code with custom tags, this menu cascades so you can find spans associated with custom tags. Wavefront populates this menu based on the selection you made from the **Operation** menu.</td>
    </tr>
    </tbody>
    </table>
    
3. Optional. Fill in one or both of these fields to match only spans of a minimum or maximum length:  
    <table>
    <colgroup>
    <col width="20%"/>
    <col width="80%"/>
    </colgroup>
    <tbody>
    <tr>
    <td markdown="span">**Min Span**</td>
    <td markdown="span">Minimum number of milliseconds in a matching span.</td>
    </tr>
    <tr>
    <td markdown="span">**Max Span**</td>
    <td markdown="span">Maximum number of milliseconds in a matching span.</td>
    </tr>
    </tbody>
    </table>
    
4. Choose a **Limit** to specify the maximum number of qualifying spans to display traces for. 

### Example

Suppose you want to find traces that contain spans for an operation called `dispatch`, which is called from the `delivery` service of the `beachshirts` application. You're interested only in spans that are longer than 30 milliseconds.  

1. Select the operation from the cascading **Operation** menu:
    ![tracing query builder menu](images/tracing_query_builder_menu.png)
2. Type 30 in the **Min Span** field.
    ![tracing query builder menu2](images/tracing_query_builder_menu2.png) 

### Viewing the Trace Query

Query Builder generates a query that includes the [`traces()` function](traces_function.html) and one or more [filtering functions](traces_function.html#filtering-functions). For example, you can: 

1. Construct a query with Query Builder as shown [above](#example).
2. [Toggle to the Query Editor](#submitting-trace-queries) to see what the corresponding functions look like. 
    ![tracing query editor from builder](images/tracing_query_editor_from_builder.png)

At this point, you can either continue to edit the query directly, or toggle back to Query Builder. **Note:** If you change a query using the Query Editor, you cannot go back to Query Builder.

## Sorting the Result Set

You can sort a set of returned traces by selecting a sort order from the **Sort By** menu. For example: 
* You can choose **Most Recent** to start with the traces that have the most recent start times.
* You can choose **Most Spans** to start with the traces that contain the largest number of spans.

Sorting always applies after the result set has been limited. For example, suppose you limit the query to 50 matching spans, and sort the returned traces from shortest to longest. The sorted list includes only the traces that contain one of the 50 matching spans. We do not first sort all traces containing a matching span, and then display the 50 shortest traces.
 
**Note:** If you've enabled a sampling strategy, results are found among the spans that have actually been ingested. The query does not search through spans before they’ve been sampled.


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

<table style="width: 100%">
<colgroup>
<col width="30%"/>
<col width="70%"/>
</colgroup>
<thead>
<tr><th>Menu</th><th>Start With the Traces That Have</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">**Most Recent**</td>
<td markdown="span">The most recent start times.</td>
</tr>
<tr>
<td markdown="span">**Longest First**</td>
<td markdown="span">The longest overall duration.</td>
</tr>
<tr>
<td markdown="span">**Shortest First**</td>
<td markdown="span">The shortest overall duration.</td>
</tr>
<tr>
<td markdown="span">**Most Spans**</td>
<td markdown="span">The largest number of spans.</td>
</tr>
<tr>
<td markdown="span">**Least Spans**</td>
<td markdown="span">The smallest number of spans.</td>
</tr>
</tbody>
</table>

--->
