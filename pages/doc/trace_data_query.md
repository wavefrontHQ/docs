---
title: Querying Trace Data
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_query.html
summary: Learn how to query for Wavefront trace data.
---

After your application sends [trace data](tracing_basics.html#wavefront_trace_data) to Wavefront, you can examine that data in the Traces browser. By fine-tuning the trace query in the Traces browser, you find the traces that you're interested in by describing the spans they must contain.

## Submitting Trace Queries

You query for traces by describing the spans they must contain. You can optionally specify duration thresholds that the returned traces must satisfy. 

You submit queries and [view the results](#understanding-trace-query-results) in the Traces browser. 


### Use Query Builder

1. Display the Traces browser, for example, by clicking **Applications > Traces** in the task bar. <br> Query Builder is displayed by default.
2. Use the [trace query menus and fields](#trace-query-menus-and-fields) to specify the characteristics to be matched. Each selection you make updates the list of traces.

    ![tracing query builder](images/tracing_query_builder.png)

### Use Query Editor 

1. Display the Traces browser, for example, by clicking **Applications > Traces** in the task bar.
2. Click the icon to toggle to Query Editor:  
    ![tracing query toggle](images/tracing_query_toggle.png)
3. Type a query that includes the [`traces()` function](traces_function.html): <!---and take advantage of syntax completion for selecting tags and their values.---> 
    ![tracing query editor](images/tracing_query_editor_populated.png) 

## Trace Query Menus and Fields

Query Builder lets you use menus and fields to specify the traces you want to display. 

**Note:** Certain menus correspond to tags that a developer specified while instrumenting the application code. An empty menu means that the code was instrumented without the corresponding tags.

1. Display the Traces browser and make sure Query Builder is displayed. (It is displayed by default.)
2. Select values from these menus to describe the logical characteristics that spans must match: 
    <table style="width: 100%">
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
    <td>Match spans that represent work done by the selected operation. If you instrumented the code with application tags, this menu cascades so you can match spans that represent the work done by:
      <ul>
      <!---<li> All operations in all services in a selected application.</li>--->
      <li> All operations in a selected service and application.</li>
      <li> A selected operation in a selected service and application.</li>
      </ul>
      <strong>Note:</strong> At a minimum you must select an application and a service.
    </td>
    </tr>
    <tr>
    <td markdown="span">**Filters**</td>
    <td markdown="span">Match spans from a selected source (host). If you instrumented the code with custom tags, this menu cascades so you can find spans associated with custom tags. Wavefront populates this menu based on the selection you made from the **Operation** menu.</td>
    </tr>
    </tbody>
    </table>

2. Select values from these menus to specify the physical characteristics that spans must match:
    <table style="width: 100%">
    <colgroup>
    <col width="20%"/>
    <col width="80%"/>
    </colgroup>
    <thead>
    <tr><th>Menu</th><th>Description</th></tr>
    </thead>
    <tbody>
    <tr>
    <td markdown="span">**Cluster**</td>
    <td markdown="span">Match spans from the selected cluster. A cluster is a named group of host machines. Wavefront populates this menu based on the selection you made from the **Operation** menu.</td>
    </tr>
    <tr>
    <td markdown="span">**Shard**</td>
    <td markdown="span">Match spans from a selected shard. A shard is a named subgroup of the hosts in a particular cluster. Wavefront populates this menu based on the selection you made from the **Operation** menu.</td>
    </tr>
    </tbody>
    </table>
    
3. Fill in one or both of these fields to return only traces of a minimum or maximum length:  
    <table style="width: 100%">
    <colgroup>
    <col width="20%"/>
    <col width="80%"/>
    </colgroup>
    <thead>
    <tr><th>Field</th><th>Description</th></tr>
    </thead>
    <tbody>
    <tr>
    <td markdown="span">**Min Duration**</td>
    <td markdown="span">Minimum number of milliseconds in a returned trace.</td>
    </tr>
    <tr>
    <td markdown="span">**Max Duration**</td>
    <td markdown="span">Maximum number of milliseconds in a returned trace.</td>
    </tr>
    </tbody>
    </table>
    
4. Choose a **Limit** to specify the maximum number of traces to display. 

### Example

Suppose you want to find traces that contain spans for an operation called `dispatch`, which is called from the `delivery` service of the `beachshirts` application. You're interested only in traces that are longer than 30 milliseconds.  

1. Select the operation from the cascading **Operation** menu:
    ![tracing query builder menu](images/tracing_query_builder_menu.png)
2. Type 30 in the **Min Duration** field.
    ![tracing query builder menu2](images/tracing_query_builder_menu2.png) 

### Viewing the Corresponding Trace Query

Query Builder generates a query that includes the [`traces()` function](traces_function.html) and one or more [filtering functions](traces_function.html#filtering-functions). For example, you can: 

1. Construct a query with Query Builder as shown [above](#example).
2. [Toggle to the Query Editor](#use-query-editor) to see what the corresponding functions look like. 
    ![tracing query editor from builder](images/tracing_query_editor_from_builder.png)

At this point, you can either continue to edit the query directly, or toggle back to Query Builder. **Note:** If you change a query using Query Editor, you cannot go back to Query Builder.

## Understanding Trace Query Results

A trace query:
1. Finds the spans that match the description you specify.
2. Finds the traces that contain at least one qualifying span.
3. Uses duration thresholds (if you specified any) to filter the set of returned traces.  

For example, you can query for traces that each have at least one member span that meets all of the following criteria: 
* Represents an operation called `dispatch` that is performed by a service called `delivery`.
* Represents work done on a cluster called `us-west-2`.
* Is associated with a custom tag `env=production`.

If you also specified a minimum (or maximum) duration, the query filters out any traces that are shorter (longer) than the threshold you specified.

### Graphic Representation of a Returned Trace

Wavefront displays a bar for each trace that is returned by a trace query. The bar's length represents the trace's duration. A blue area in the bar indicates where a matching span occurs in the trace, and how much of the trace it occupies. A green circle indicates a trace with no reported errors, and a red circle indicates with an error in one or more spans:

![tracing query results](images/tracing_query_results.png)

### How Wavefront Labels a Returned Trace
<!--- UPDATE to match GRAPHIC --->
Each bar that is returned by a query represents a unique trace that has a unique trace ID. For readability, we label each trace by its root span, which is the first span in the trace. The trace's label is the name of the operation that the root span represents.

For example, the two returned traces shown above both have the label **shopping: orderShirts**. This is because both traces have a root span
that represents the work done by the `orderShirts` operation in the `shopping` service. However, these root spans represent different executions of the `orderShirts` operation, with different start times. Consequently, although these two root spans have the same operation name, they mark the beginning of two different traces.

**Note:** A label such as **shopping: orderShirts** refers to the root span of a trace, which may be different from the span that was specified in the query. For example, suppose you query for spans that represent `dispatch` operations. The query could return traces that begin with `orderShirts`, if those traces contain a `dispatch` span. 

### Limiting the Result Set

To prevent a trace query from taking a long time, you normally specify a limit on the number of returned traces. The trace query starts by returning the most recent traces.  After reaching the limit, the query stops looking for more traces. 

**Note:** The current time window for the Traces browser also implicitly limits by the result set. Traces are returned only if they contain a matching span _and_ start within the current time window.




## Sorting the Result Set

You can sort a set of returned traces by selecting a sort order from the **Sort By** menu. For example: 
* You can choose **Most Recent** to start with the traces that have the most recent start times.
* You can choose **Most Spans** to start with the traces that contain the largest number of spans.

Sorting always applies after the result set has been limited. For example, suppose you limit the number of returned traces to 50, and then sort the result set from shortest to longest. The sorted list includes only the 50 traces that were originally returned by the query. We do not first sort all traces containing a matching span, and then display the 50 shortest traces.
 
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
