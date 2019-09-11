---
title: Querying Trace Data
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_query.html
summary: Learn how to query for Wavefront trace data.
---

After your application sends [trace data](tracing_basics.html#wavefront-trace-data) to Wavefront, you can examine that data in the Traces browser. By fine-tuning the trace query in the Traces browser, you find the traces that you're interested in by describing the spans they must contain.

## Get Started With Trace Queries

You query for traces by using Query Builder to describe the spans they must contain. 


1. Select **Applications > Traces** in the task bar to display the Traces browser. 
2. [Select an operation](#select-an-operation) to specify the scans to be matched. 
![tracing query builder](images/tracing_query_builder.png)
3. Optionally [add one or more filters](#add-filters) to refine your query. 
![tracing query builder](images/tracing_query_builder_filter.png)
4. Click **Search** in the query bar to update the list of traces.

**Note:** As an alternative, you can use [Query Editor](#use-query-editor-power-users) to submit advanced trace queries explicitly.

## Select an Operation

You select an operation to display traces with at least one span that represents the work done by that operation.

1. Display the Traces browser.
2. Click the **Operation** selector to open the cascading menu.  
    ![tracing query builder operation selector](images/tracing_query_builder_operation_selector.png) 

3. Select name components for an application, service, and operation.  
    ![tracing query builder operation menu](images/tracing_query_builder_operation_menu.png) 
    
4. Either [add filters](#add-filters) or click **Search** to display results.
    
**Note:** You can select `*` instead of name components to select all operations in a service, or all operations in all services:
    ![tracing query builder operation menu](images/tracing_query_builder_operation_menu_all.png) 

**Note:** The names in the cascading menus correspond to tag values and span names that a developer specified while instrumenting the application code.

## Add Filters

After you have selected an operation, you can optionally add filters to further describe the traces you want to see. You can add different types of filters in any order.

<ol>
<li>Select an operation if you have not already done so.</li>
<li markdown="span">Click **Add Filter** and select a filter type. 
![tracing query builder filter type menu](images/tracing_query_builder_filter_type_menu.png) 
</li>


<li>Click next to the filter type and specify the filter setting. 

<table style="width: 100%">
<colgroup>
<col width="25%"/>
<col width="75%"/>
</colgroup>
<thead>
<tr><th>Choose This Filter Type</th><th>To Return</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">**Tag**</td>
<td markdown="span">Traces that have at least one span with a selected tag or a selected source (host).
Use this type for indexed tags that your application uses, typically `cluster`, `shard`, `component`, `source`, and so on.</td>
</tr>
<tr>
<td markdown="span">**RawTag**</td>
<td markdown="span">Traces that have at least one span with a specified tag, for example, `env="prod"`. Use this type for custom or unindexed span tags.</td>
</tr>
<tr>
<td markdown="span">**Duration**</td>
<td markdown="span">Traces that have a specified minimum and/or maximum length (in milliseconds).</td>
</tr>
<tr>
<td markdown="span">**Limit**</td>
<td markdown="span">Up to a specified number of traces.</td>
</tr>
<tr>
<td markdown="span">**Error**</td>
<td markdown="span">Traces with at least one span that contains an error (`error=true`).</td>
</tr>
</tbody>
</table>
</li>

<li>Depending on the filter type, either select settings from menus or type one or more settings in fields.</li>

<li markdown="span">Click **Add Filter** to add another filter, or click **Search**  to display results.</li>
</ol>

## Remove Filters

You can remove an individual filter: 
1. Click the **X** in the filter box:

    ![tracing query builder remove filter](images/tracing_query_builder_remove_filter.png) 
2. Click **Search** to update the displayed results.

If you want to start the query all over, click **Clear** to remove the operation name and all filters:

![tracing query builder clear](images/tracing_query_builder_clear.png) 


## Example

Suppose you want to find traces that contain spans for an operation called `notify`, which is called from the `notification` service of the `beachshirts` application. You're interested only in seeing traces that are emitted from a particular source and that are longer than 30 milliseconds.  

1. Select the operation from the cascading **Operation** menu.
2. Click **Add Filter** and select **Tag**.
3. Click the Tags selector to open a cascading menu of tag types.
4. Select the **source** tag type to display a menu of source names, and select the source name you want.
    ![tracing query builder select source](images/tracing_query_builder_select_source.png) 
5. Click **Add Filter** and select **Duration**.
6. Click the min/max Duration selector to display fields for specifying durations.
    ![tracing query builder select duration](images/tracing_query_builder_select_duration.png) 
7. Type 30 in the **Min Duration** field and click **Apply**.
8. Click **Search** to display the results.
    ![tracing query builder complete](images/tracing_query_builder_complete.png) 


### Optionally View the Corresponding Trace Query

Query Builder generates a query that includes the [`traces()` function](ts_traces.html) and one or more filtering functions like `limit()`. For example, you can: 

1. Construct a query with Query Builder as shown [above](#example).
2. [Toggle to the Query Editor](#use-query-editor-power-users) to see what the corresponding functions look like. 
    ![tracing query editor from builder](images/tracing_query_editor_from_builder.png)

At this point, you can either continue to edit the query directly, or toggle back to Query Builder. 

**Note:** If you change a query using Query Editor, you cannot go back to Query Builder.


## Understand Trace Query Results

A trace query:
1. Finds the spans that match the description you specify.
2. Finds the traces that contain at least one matching span.
3. Uses duration thresholds (if you specified any) to filter the set of returned traces.  

For example, you can query for traces that each have at least one member span that meets all of the following criteria: 
* Represents an operation called `dispatch` that is performed by a service called `delivery`.
* Represents work done on a cluster called `us-west-2`.
* Is associated with a custom tag `env=production`.

If you also specified a minimum (or maximum) duration, the query filters out any traces that are shorter (longer) than the threshold you specified.

### Graphic Representation of a Returned Trace

Wavefront displays a bar for each trace that is returned by a trace query. The bar's length visually indicates the trace's duration. A blue area in the bar indicates where a matching span occurs in the trace, and how much of the trace it occupies:

![tracing query results](images/tracing_query_results.png)

### How Wavefront Labels a Returned Trace
Each bar that is returned by a query represents a unique trace that has a unique trace ID. For readability, we label each trace by its root span, which is the first span in the trace. The trace's label is the name of the operation that the root span represents.

For example, the two returned traces shown above both have a root span that represents work done by an operation called `ShoppingWebResource.getShoppingMenu`. However, these root spans represent different executions of the operation, with different start times. Although the two root spans have the same operation name, they mark the beginning of two different traces.

**Note:** A trace's root span might differ from the span that was specified in the query. For example, suppose you query for spans that represent `getAvailableColors` operations. The query could return traces that begin with `ShoppingWebResource.getShoppingMenu`, if those traces contain a `getAvailableColors` span. 

## Limited Result Set

Using the **Limit** filter to limit the number of returned traces can make your query complete faster. The trace query starts by returning the most recent traces.  After reaching the limit, the query stops looking for more traces. 

**Note:** The current time window for the Traces browser also implicitly limits by the result set. Traces are returned only if they contain a matching span _and_ start within the current time window.



## Sort the Result Set

You can sort a set of returned traces by selecting a sort order from the **Sort By** menu. For example: 
* Choose **Most Recent** to start with the traces that have the most recent start times.
* Choose **Longest First** to start with the longest traces.
* Choose **Outliers** to start with the traces whose duration is unusually long or unusually short.
* Choose **Most Spans** to start with the traces that contain the largest number of spans.

If you both limit and sort the query results, sorting applies after limiting. For example, suppose you limit the number of returned traces to 50, and then sort the result set from shortest to longest. The sorted list includes only the 50 traces that were originally returned by the query. We do not first sort all traces containing a matching span, and then display the 50 shortest traces.
 
**Note:** If you've enabled a sampling strategy, results are found among the spans that have actually been ingested. The query does not search through spans before they’ve been sampled.

## Use Query Editor (Power Users)

1. Select **Applications > Traces** in the task bar to display the Traces browser.
2. Click the icon to toggle to Query Editor:  
    ![tracing query toggle](images/tracing_query_toggle.png)
3. Type a query that includes the [`traces()` function](ts_traces.html):  
![tracing query editor](images/tracing_query_editor_populated.png) 
4. Click **Search** in the query bar to update the list of traces.



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


<table style="width: 100%">
<colgroup>
<col width="15%"/>
<col width="30%"/>
<col width="65%"/>
</colgroup>
<thead>
<tr><th>Filter Type</th><th>Returns</th><th>Filter Settings</th></tr>
</thead>
<tbody>
<tr>
<td markdown="span">**Tags**</td>
<td markdown="span">Traces that contain at least one span with a selected span tag or from a selected source (host)</td>
<td markdown="span">Cascading menu of span tags that are used by your application and indexed by Wavefront. Typically includes `cluster`, `shard`, and `component`, among others. Select `source` to match spans from a given source. 
</td>
</tr>
<tr>
<td markdown="span">**RawTags**</td>
<td markdown="span">Traces that contain at least one span with a specified span tag</td>
<td markdown="span">Fields for entering the key and value of a custom span tag, for example, `env="prod"`. Use this type for unindexed span tags. </td>
</tr>
<tr>
<td markdown="span">**Duration**</td>
<td markdown="span">Traces that have a min or max length</td>
<td markdown="span">Fill in one or both fields to return traces of a minimum or maximum duration (in milliseconds). </td>
</tr>
<tr>
<td markdown="span">**Limit**</td>
<td markdown="span">A limited number of traces</td>
<td markdown="span">Select the maximum number of traces to return.  </td>
</tr>
<tr>
<td markdown="span">**Error**</td>
<td markdown="span">Traces that contain at least one span with an error</td>
<td markdown="span">True returns traces that contain one or more spans with `error=true`.  </td>
</tr>
</tbody>
</table>



--->
