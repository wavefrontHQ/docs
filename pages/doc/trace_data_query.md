---
title: Querying Trace Data
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_query.html
summary: Learn how to query for Wavefront trace data.
---

After your application sends [trace data](tracing_basics.html#wavefront_trace_data) to Wavefront, you can query that data from the **Traces** page. Querying trace data lets you find the particular traces and spans you are interested in, by filtering them by duration or according to the tags you set up when you instrumented your application.


## Ways to Submit Trace Queries

You submit queries and view the results on the **Traces** page. You can choose the level of Wavefront assistance you want for constructing and submitting a trace query:
* Query Builder: Use menus to select tag values for filtering spans.
* Query Editor: Type the `spans()` function and take advantage of syntax completion for selecting tags and their values. 


### Displaying the Traces Page

To navigate to **Traces** directly:

* Click **Browse > Traces** from the Wavefront top menu bar.

  **Note:** Alternatively, you can navigate to the **Traces** page from any page that displays metrics for a service.

### Choosing the Level of Query Assistance

To choose the level of query assistance you want: 

* Click this icon to toggle between the Query Builder and the Query Editor. 

    ![tracing query toggle](images/tracing_query_toggle.png)

## Building a Trace Query

The Query Builder lets you use menus for selecting values that describe the spans you want to see. **Note:** Certain menus correspond to tags that a developer specified while instrumenting the application code. An empty menu means that the code was instrumented without the corresponding tags.

1. Display the **Traces** page and make sure the Query Builder is displayed. (It is displayed by default.)
2. Select a value from one or more of these menus. At a minimum you must select an application from the Operation menu. 

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
    <td markdown="span">**Min Duration**</td>
    <td markdown="span">Minimum number of milliseconds in a matching span.</td>
    </tr>
    <tr>
    <td markdown="span">**Max Duration**</td>
    <td markdown="span">Maximum number of milliseconds in a matching span.</td>
    </tr>
    </tbody>
    </table>
    
4. Choose a **Limit** to specify the maximum number of matching spans that will be displayed in the result set.

### Viewing the Underlying `spans()` Function
The Query Builder produces a `spans()` function for you. So, for example, you can: 
1. Start constructing a query with the Query Builder.
2. Toggle to the Query Editor to see what the corresponding `span()` function looks like. 
3. Either continue to edit the function, or else toggle back to the Query Builder. **Note:** Once you change a query using the Query Editor, you cannot go back to the Query Builder.

## Query Results

A trace query:
1. Identifies spans that match the search criteria you specified.
2. Returns the whole traces that contain the matched spans. 

**Note:** Each trace is listed by its root span, which may be different from the span the query asked for.

By default, a query matches up to 20 spans, and returns all the traces that contain them. This doesn't mean you'll always see 20 traces in the result set. If 2 or more qualified spans belong to the same trace, that trace is shown only once.

If you've enabled a a sampling strategy, results are found among the spans that have actually been ingested. (The query does not search through spans before they’ve been sampled.)

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
