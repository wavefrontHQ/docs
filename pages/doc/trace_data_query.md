---
title: Querying Trace Data
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_query.html
summary: Learn how to query for Wavefront trace data.
---

After your application sends [trace data](tracing_basics.html#wavefront-trace-data) to Wavefront, you can examine that data in the Traces browser. By fine-tuning the trace query in the Traces browser, you find the traces that you're interested in by describing the spans they must contain.

## Get Started with Trace Queries

To query traces, select **Applications > Traces** and navigate to the Traces browser.

**Query traces using a trace ID**:
1. Click **Trace ID** and enter the ID of the trace or traces you want to query.
    ![query traces by trace ID](images/tracing_query_by_trace_id.png)
    {% include note.html content="You might not see search results if you search for a trace after 7 days because spans data is only saved for 7 days by default, or after 1 hour if you have enabled [intelligent sampling for traces](trace_data_sampling.html)." %}
    {% include tip.html content="To get the ID of a trace, go to the trace details panel, expand a service, and click **Tags**. See [Drill Down Into Spans and View Metrics and Span Logs](tracing_ui_overview.html#drill-down-into-spans-and-view-metrics-and-span-logs)." %}
2. Click **Search** in the query bar to update the list of traces.
    
**Query traces using an operation**: 
1. Click **Operation**, and [select an operation](#select-an-operation) to specify the scans to be matched.
2. Optionally, [add one or more filters](#add-filters) to refine your query.
  ![tracing query builder](images/tracing_query_builder_filter.png)
3. Click **Search** in the query bar to update the list of traces.

{% include note.html content="As an alternative, you can use [Query Editor](#use-query-editor-power-users) to submit advanced trace queries explicitly." %}
<!---Add mini screenshot?--->

## Select an Operation

You select an operation to display traces with at least one span that represents the work done by that operation.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
1. Select <strong>Applications &gt; Traces</strong> to open the Traces browser.
<p>&nbsp;</p>
2. Click the <strong>Operation</strong> selector to open the cascading menu.
</td>
<td width="60%"><img src="images/tracing_query_builder_operation_selector.png" alt="tracing query builder operation selector"></td>
</tr>
<tr>
<td width="40%">
3. Use the drill-down to select the application, service, and operation.
<p>&nbsp;</p>
4. Either add filters (see below) or click <strong>Search</strong> to display results.</td>
<td width="60%"><img src="images/tracing_query_builder_operation_menu.png" alt="tracing query builder operation menu"><br>
</td>
</tr>
</tbody>
</table>

**Wildcard Selection**

You can select `*` instead of name components to select all operations in a service, or all operations in all services:

![tracing query builder operation menu](images/tracing_query_builder_operation_menu_all.png)

## Add Filters

After you have selected an operation, you can optionally add filters to further describe the traces you want to see. You can add different types of filters in any order.

<ol>
<li>Select an operation.</li>
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
<td markdown="span">**SpanLog**</td>
<td>Traces that have span logs.
{% include note.html content="Span logs are disabled by default and require Wavefront proxy version 5.0 or later. Contact [support@wavefront.com](mailto:support@wavefront.com) for more information."%}
</td>
</tr>
<tr>
<td markdown="span">**Duration (Trace)**</td>
<td markdown="span">Traces that have a specified minimum and/or maximum length (in milliseconds).</td>
</tr>
<tr>
<td markdown="span">**Duration (Span)**</td>
<td markdown="span">Traces that have a specified minimum and/or maximum span length (in milliseconds).</td>
</tr>
<tr>
<td markdown="span">**Limit**</td>
<td markdown="span">Up to a specified number of traces.</td>
</tr>
<tr>
<td markdown="span">**Error**</td>
<td markdown="span">Traces with at least one span that contains an error (`error=true`).</td>
</tr>
<tr>
<td markdown="span">**TraceId**</td>
<td>The trace or traces that match the trace ID or trace IDs. 
{% include note.html content="If you select **TraceId** you can only search by the trace ID. You cannot filter an operation by a trace ID."%}
</td>
</tr>
</tbody>
</table>
</li>

<li>Depending on the filter type, either select settings from menus or type one or more settings in fields.</li>

<li markdown="span">Click **Add Filter** to add another filter, or click **Search**  to display results.</li>
</ol>

## Remove Filters

You can remove an individual filter:

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Click the <strong>X</strong> in the filter box:</li>
<li>Click <strong>Search</strong> to update the displayed results.</li>
</ol></td>
<td width="60%"><img src="images/tracing_query_builder_remove_filter.png" alt="tracing query builder remove filter"></td>
</tr>
<tr>
<td width="40%">
<p>If you want to start the query all over, click <strong>Clear</strong> to remove the operation name and all filters:</p></td>
<td width="60%"><img src="images/tracing_query_builder_clear.png" alt="tracing query builder clear"></td>
</tr>
</tbody>
</table>


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


### View Trace Queries in Query Editor

Query Builder generates a query that includes the [`traces()` function](traces_function.html) and one or more [filtering functions](traces_function.html#filtering-functions). You can:

* Construct a query with Query Builder as shown [above](#example).
* [Toggle to the Query Editor](#use-query-editor-power-users) to see what the corresponding functions look like.
    ![tracing query editor from builder](images/tracing_query_editor_from_builder.png)

**Note:** If you change a query using Query Editor, you cannot go back to Query Builder.


## Trace Query Results

A trace query:
1. Finds the spans that match the description you specify.
2. Finds the traces that contain at least one matching span.
3. Uses duration thresholds (if you specified any) to filter the set of returned traces.

For example, you can query for traces with at least one member span that meets the following criteria:
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

## Limit and Sort the Result Set

The browser allows you to fine-tune what you see.

* Use the **Limit** filter to limit the number of returned traces and make your query complete faster. The trace query starts by returning the most recent traces.  After reaching the limit, the query stops looking for more traces.

   **Note:** The current time window for the Traces browser also implicitly limits by the result set. Traces are returned only if they contain a matching span _and_ start in the current time window.

* Sort a set of returned traces by selecting a sort order from the **Sort By** menu. For example, choose **Outliers** to start with the traces whose duration is unusually long or unusually short. Or, choose **Most Spans** to start with the traces that contain the largest number of spans.

If you both limit and sort the query results, sorting applies after limiting. For example, suppose you limit the number of returned traces to 50, and then sort the result set from shortest to longest. The sorted list includes only the 50 traces that were originally returned by the query. We do not first sort all traces containing a matching span, and then display the 50 shortest traces.

**Note:** If you've enabled a sampling strategy, results are found among the spans that have actually been ingested. The query does not search through spans before they’ve been sampled.

## Use Query Editor (Power Users)

Query Builder works well for many use cases, but sometimes Query Editor is your best option.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Select <strong>Applications &gt; Traces</strong> in the task bar to display the Traces browser. </li>
<li>Click the icon to toggle to Query Editor:</li>
<li>Type a query that includes the <a href="traces_function.html">traces() function</a>.</li>
<li>Click <strong>Search</strong> to update the list of traces.</li>
</ol></td>
<td width="60%"><img src="images/tracing_query_toggle.png" alt="tracing query toggle"></td>
</tr>
</tbody>
</table>


<!---
Sue left this commented out table. Not sure we need it.
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
