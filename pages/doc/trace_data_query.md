---
title: Querying Trace Data
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_query.html
summary: Learn how to query for Wavefront trace data.
---

After your application sends [trace data](tracing_basics.html#wavefront_trace_data) to Wavefront, you can query that data from the **Traces** page. Querying trace data lets you find the particular traces you are interested in by specifying the criteria that their spans must match.

## Understanding Trace Queries

You query for traces by describing the spans they must contain. A trace query can specify various span characteristics, such as an operation name, duration thresholds, and values for the tags that you set up when you instrumented your application. 

When you submit a trace query, it:
1. Finds the spans that match the description you specify.
2. Returns the whole traces that contain one or more qualifying spans. 

### Graphic Representation of a Returned Trace

Each returned trace is shown graphically as a bar. The bar's length represents the trace's overall duration. The bar's color indicates whether the trace has an error in one or more spans (red) or has no reported errors (blue):

![tracing query results](images/tracing_query_results.png)

### Identity of a Returned Trace

Each bar in a result set represents a unique trace with a unique trace id. For readability, we label each trace using the operation that its root span represents. (The root span is the first span in the trace.)  For example, each of the two returned traces shown above has a root span that represents the work done by the `orderShirts` operation in the `shopping` service, so the label for each of these traces is **shopping: orderShirts**. Although these root spans have the same operation name, they represent distinct executions of the `orderShirts` operation, with different start times.

**Note:** It is important to remember that a label such as **shopping: orderShirts** refers to the root span of a trace, and not necessarily to the span that was specified by the query. For example, say you query for spans that represent `dispatch` operations. The query could return traces that begin with `orderShirts`, if those traces contain one or more `dispatch` spans. 

### Limited Result Set

To prevent a trace query from taking a long time, you normally specify a limit on the number of spans that can be matched. After reaching the limit, the query stops looking for more spans to qualify. 

**Note:** It is important to remember that the limit applies to the number of spans that a query matches, and not to the number of traces that the query returns. For example, say you limit a query to 20 spans. If 2 or more qualified spans belong to the same trace, that trace is shown only once, and you will see fewer than 20 traces in the result set.


## Ways to Submit Trace Queries

You submit queries and view the results on the **Traces** page. 

### Displaying the Traces Page

To navigate to **Traces** directly:

* Click **Browse > Traces** from the Wavefront top menu bar.

  **Note:** Alternatively, you can navigate to the **Traces** page from any page that displays metrics for a service.

### Levels of Query Assistance

Wavefront provides two levels of assistance for constructing and submitting a trace query:
* Query Builder: Use menus to select tag values for filtering spans.
    ![tracing query builder](images/tracing_query_builder.png)

* Query Editor: Type a [`spans()` query](spans_queries.html), and take advantage of syntax completion for selecting tags and their values. 
    ![tracing query editor](images/tracing_query_editor.png) 


### Toggling Between Levels of Query Assistance

To enable the level of query assistance you want: 

1. [Display the **Traces** page.](#displaying-the-traces-page)
2. Click this icon to toggle between the Query Builder and the Query Editor. 
    ![tracing query toggle](images/tracing_query_toggle.png)

## Building a Trace Query

The Query Builder lets you use menus for selecting values that describe the spans you want to see. **Note:** Certain menus correspond to tags that a developer specified while instrumenting the application code. An empty menu means that the code was instrumented without the corresponding tags.

1. Display the **Traces** page and make sure the Query Builder is displayed. (It is displayed by default.)
2. Select a value from one or more of the menus. At a minimum you must select an application from the Operation menu. 

    <table>
    <colgroup>
    <col width="20%"/>
    <col width="80%"/>
    </colgroup>
    <thead>
    <tr><th>Use This Menu</th><th>To Find Spans That Represent</th></tr>
    </thead>
    <tbody>
    <tr>
    <td markdown="span">**Operation**</td>
    <td>Work done by a selected operation. If you instrumented the code with application tags, this menu cascades so you can find spans that represent the work done by:
      <ul>
      <li> All services in a selected application.</li>
      <li> All operations in a selected service and application.</li>
      <li> A selected operation in a selected service and application.</li>
      </ul>
    </td>
    </tr>
    <tr>
    <td markdown="span">**Cluster**</td>
    <td markdown="span">Work done by operations executing on a selected cluster. A cluster is a named group of host machines.</td>
    </tr>
    <tr>
    <td markdown="span">**Shard**</td>
    <td markdown="span">Work done by operations executing on a selected shard. A shard is a named subgroup of the hosts in a particular cluster.</td>
    </tr>
    <tr>
    <td markdown="span">**Filters**</td>
    <td markdown="span">Work done by operations executing on a selected source (host). If you instrumented the code with custom tags, this menu cascades so you can find spans associated with custom tags. </td>
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
    
4. Choose a **Limit** to specify the maximum number of qualifying spans to display traces for. The default limit is 20.

### Example

Assume you want to find traces that contain spans for an operation called `dispatch`, which is called from the `delivery` service of the `beachshirts` application. Furthermore, let's say you are only interested in these spans if they are longer than 30 milliseconds.  

1. Select the operation from the cascading **Operation** menu as follows:
    ![tracing query builder menu](images/tracing_query_builder_menu.png)
2. Type 30 in the **Min Span** field.
    ![tracing query builder menu2](images/tracing_query_builder_menu2.png) 

### Viewing the Functions in the Underlying Trace Query

The Query Builder automatically produces an equivalent query that includes the [`spans()` function](spans_queries.html) along with one or more [spans filtering functions](spans_queries.html#spans-filtering-functions). So, for example, you can: 

1. Construct a query with the Query Builder as shown [above](#example).
2. [Toggle to the Query Editor](#toggling-between-levels-of-query-assistance) to see what the corresponding functions look like. 
    ![tracing query editor from builder](images/tracing_query_editor_from_builder.png)

At this point, you can either continue to edit the query directly, or else toggle back to the Query Builder. **Note:** Once you change a query using the Query Editor, you cannot go back to the Query Builder.

## Sorting the Result Set

You can sort a set of returned traces by selecting a sort order from the **Sort By** menu: 

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


Sorting always applies after the result set has been limited. For example, say you limited the query to 20 matching spans, and sorted the returned traces from shortest to longest. The sorted list includes only the traces that contain one or more of the 20 matching spans. (We do not first sort all traces containing a matching span, and then display the 20 shortest traces.)
 
**Note:** If you've enabled a sampling strategy, results are found among the spans that have actually been ingested. (The query does not search through spans before they’ve been sampled.)


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
