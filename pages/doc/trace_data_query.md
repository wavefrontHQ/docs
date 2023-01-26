---
title: Querying Trace Data
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: trace_data_query.html
summary: Learn how to query for trace data.
---

After your application sends trace data to Tanzu Observability by Wavefront, you can examine that data in the Traces Browser. By fine-tuning the trace query in the Traces Browser, you find the traces that you're interested in by describing the spans they must contain.

## View Tracing Critical Path Data in Charts

The Traces Browser shows you all the spans that make up a trace. By examining the critical path, you can find operations that took a long time, decide which operations to optimize, and then examine optimization results. See [Traces Browser](tracing_traces_browser.html) for details.

You can use the  [`hs()` function](hs_function.html) to query and view critical path data as histogram metrics.

### View Critical Path Data in Charts

Charts help you view the data trends and grasp data faster.
* Use critical path raw metrics or the critical path aggregated metrics, which are metrics aggregated beforehand to reduce the compute time when running queries.

    <table style="width: 100%;">
      <tr>
        <th width="20%">
          Metrics Type
        </th>
        <th width="80%">
          Description
        </th>
      </tr>
      <tr>
        <td>
          Granular metrics
        </td>
        <td markdown = "span">
          Get specific metrics data for a critical path. Filter the query using the `application`, `cluster`, `shard`, `service`, `operationName`, `error`, and `source` point tags.
          <br/><br/>Example:
          <code>
tracing.critical_path.<b>derived</b>.*.total_time.millis.m
          </code>
        </td>
      </tr>
      <tr>
        <td>
          Aggregated metrics
        </td>
        <td markdown = "span">
          Get high-level metrics for a critical path of a specific application or service. Filter queries using the `application`, `cluster`, `shard`, and `service` point tags.
          <br/><br/>Example:
          <code>
tracing.critical_path.<b>aggregated</b>.<b>derived</b>.*.time_percent.m
          </code>
        </td>
      </tr>
    </table>

* Get the time spent on the critical path as an absolute value or as a percentage.
    <table style="width: 100%;">
      <tr>
        <th width="20%">
          Time Spent
        </th>
        <th width="80%">
          Description
        </th>
      </tr>
      <tr>
        <td width="20%">
          Absolute time
        </td>
        <td markdown = "span" width="80%">
          Get the total time spent on a critical path using `.total_time.millis.m`.
        </td>
      </tr>
      <tr>
        <td>
          Relative time
        </td>
        <td markdown = "span">
          Get the total time spent on a critical path as a percentage when compared to the end to end trace duration using `.time_percent.m`.
          <br/>Let's look at a scenario where all the traces have the same critical path duration, but the time spent by the operations vary on the critical path. Now, you can visualize this data as a percentage using `time_percent.m` and compare how an operation/s performed on each trace.
        </td>
      </tr>
    </table>

Examples:

The screenshot below shows you the critical path for the `beachshirts` application's `shopping` service.
![the image shows how the trace browser shows the critical path along the span view.](images/tracing_critical_path_break_down.png)

*  **Granular metrics**: Using granular metrics, let's filter the query to get critical path data for the `ordershirts` operation.

    * **Absolute time**: Let's assume the `ordershirts` operation spends 0.1 seconds or 100 milliseconds on the critical path.
      ```
      hs(tracing.critical_path.derived.beachshirts.shopping.total_time.millis.m, operationName=ShoppingWebResource.orderShirts)
      ```

    * **Relative time**: When compared to the total trace duration, which is 1.73 seconds, the `ordershirts` operation spends 5.8% of the time on the critical path.
      ```
      hs(tracing.critical_path.derived.beachshirts.shopping.time_percent.m, operationName=ShoppingWebResource.orderShirts)
      ```

* **Aggregated metrics**: Using aggregated metrics, let's find out the time taken by the shopping service on the critical path. Aggregated metrics give you the total time taken by each service on the critical path.
  <br/>Let's assume that the operations of the shopping service spend time as follows: `ordershirts` - 0.1 seconds, `GET-style/{id}/make` - 0.02 seconds, and `POST-delivery/{orderNum}`- 0.03 seconds.

    * **Absolute time**: The shopping service spends 0.15 (0.1 + 0.02 + 0.03) seconds on the critical path.
      ```
      hs(tracing.critical_path.aggregated.derived.beachshirts.shopping.total_time.millis.m)
      ```
    * **Relative time**: When compared to the total trace duration, which is 1.73 seconds, the shopping service spends 8.7% of the time on the critical path.
      ```
      hs(tracing.critical_path.aggregated.derived.beachshirts.shopping.time_percent.m)
      ```

### Create Alerts for Critical Path Data

You can query the data of a critical path, view this data in charts, and create alerts.

Example: Create an alert to get notifications when the median value of the critical path exceeds 60. You need to query the data and create the alert. See [Creating Alerts](alerts_manage.html) for details.

![Shows a chart that is derived from query that shows the data where the critical path is longer than 60s. When you click the three dotted icon next to the query, you can see a list that has create alert on it. Click create alert and you are taken to the create alert dashboard.](images/tracing_critical_path_create_alerts.png)

## Search and Filter Traces on the Traces Browser

To query traces, select **Applications > Traces** and navigate to the Traces Browser.

**Query traces using a trace ID**:
1. Click **Trace ID** and enter the ID of the trace or traces you want to query.
    ![query traces by trace ID](images/tracing_query_by_trace_id.png)
    {% include note.html content="Your trace ID needs to be in the UUID format (example: `00000000-0000-0000-1111-111111111111`). If you copy-paste a trace ID that is not in the UUID format, we transform it for you." %}
2. Click **Search** in the query bar.

{{site.data.alerts.note}}
  You might not see search results:
  <ul>
    <li markdown="span">
      If you search for a trace after 7 days because the Wavefront service retains trace data only for 7 days.
    </li>
    <li>
      If you search for a trace after 1 hour because you have enabled <a href="trace_data_sampling.html">intelligent sampling</a> for traces.
    </li>
    <li>
      If you use invalid query syntax.
    </li>
  </ul>
{{site.data.alerts.end}}

{% include tip.html content="To get the ID of a trace, go to the trace details panel, expand a service, and click **Tags**. See [Drill Down Into Spans and View Metrics and Span Logs](tracing_traces_browser.html#drill-down-into-spans-and-view-metrics-and-span-logs)." %}

**Query traces using an operation**:
1. Click **Operation** and select an operation.
2. Optionally, [add one or more filters](#add-filters) to refine your query.
  ![tracing query builder](images/tracing_query_builder_filter.png)
3. Click **Search** in the query bar.

### Select an Operation

You select an operation to display traces with at least one span that represents the work done by that operation.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
1. Select <strong>Applications &gt; Traces</strong> to open the Traces Browser.
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

### Add Filters

After you have selected an operation, you can optionally add filters to further describe the traces you want to see. You can add different types of filters in any order.

<ol>
<li>Select an operation.</li>
<li>Click <b>Add Filter</b> and select a filter type.
<img src="images/tracing_query_builder_filter_type_menu.png" alt="tracing query builder filter type menu">

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
<td markdown="span">**UnindexedTag**</td>
<td markdown="span">Traces that have customized span tags. For details, see [Indexed and Unindexed Span Tags](trace_data_details.html#indexed-and-unindexed-span-tags).</td>
</tr>
<tr>
<td markdown="span">**Source**</td>
<td markdown="span">Traces that are sent by the a specfic host or container on which the applications or services run.</td>
</tr>
<tr>
<td markdown="span">**SpanLog**</td>
<td>Traces that have span logs.
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

<li>Click next to the filter type and specify the filter setting. See <a href="#example">the example given below</a>.</li>

<li markdown="span">Click **Add Filter** to add another filter or click **Search**  to display results.</li>
</ol>

### Remove Filters

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


### Example

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


## Trace Queries in Query Editor

Query Builder works well for many use cases, but sometimes Query Editor is your best option.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Select <strong>Applications &gt; Traces</strong> from the toolbar to display the Traces Browser. </li>
<li>Click the icon to toggle to Query Editor:</li>
<li>
  Type a query using the <a href="traces_function.html"><code>traces()</code></a> and <a href="spans_function.html"><code>spans()</code></a> functions to query data on the traces browser:
</li>
<li>Click <strong>Search</strong> to update the list of traces.</li>
</ol></td>
<td width="60%"><img src="images/tracing_query_toggle.png" alt="tracing query toggle"></td>
</tr>
</tbody>
</table>



{%include important.html content="If you change a query using Query Editor, you cannot go back to Query Builder."  %}

### Example

The video given below shows you how to get the trace details from the beachshirts application where the spans match the following:
- Spans where the shopping service is the parent span of the inventory service.
- Spans where the inventory service directly follow after the shopping service.

It uses the following queries:

```
traces(spans(beachshirts.inventory.*).from(spans(beachshirts.shopping.*)))
```

You can use any of the [trace filtering functions](traces_function.html#filtering-functions) to view trace details. To keep query execution manageable, use the `limits()` function, as shown below.

```
limit (100, traces(spans(beachshirts.inventory.*).from(spans(beachshirts.shopping.*))))
```
<!---this is the 20 second video!--->

<iframe width="700" height="400" src="https://www.youtube.com/embed/tBQv2cb3jhk" allowfullscreen></iframe>


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

The Traces Browser displays a bar for each trace that is returned by a trace query. The bar's length visually indicates the trace's duration. A blue area in the bar indicates where a matching span occurs in the trace, and how much of the trace it occupies:

![tracing query results](images/tracing_query_results.png)

### How the Traces Browser Labels a Returned Trace
Each bar that is returned by a query represents a unique trace that has a unique trace ID. For readability, we label each trace by its root span, which is the first span in the trace. The trace's label is the name of the operation that the root span represents.

For example, the two returned traces shown above both have a root span that represents work done by an operation called `ShoppingWebResource.getShoppingMenu`. However, these root spans represent different executions of the operation, with different start times. Although the two root spans have the same operation name, they mark the beginning of two different traces.

{%include tip.html content="A trace's root span might differ from the span that was specified in the query. For example, suppose you query for spans that represent `getAvailableColors` operations. The query could return traces that begin with `ShoppingWebResource.getShoppingMenu`, if those traces contain a `getAvailableColors` span."  %}

## Limit and Sort the Result Set

The browser allows you to fine-tune what you see.

* Use the **Limit** filter to limit the number of returned traces and make your query complete faster. The trace query starts by returning the most recent traces.  After reaching the limit, the query stops looking for more traces.

   {%include tip.html content="The current time window for the Traces Browser also implicitly limits by the result set. Traces are returned only if they contain a matching span _and_ start in the current time window."  %}

* Sort a set of returned traces by selecting a sort order from the **Sort By** menu. For example, choose **Outliers** to start with the traces whose duration is unusually long or unusually short. Or, choose **Most Spans** to start with the traces that contain the largest number of spans.

If you both limit and sort the query results, sorting applies after limiting. For example, suppose you limit the number of returned traces to 50, and then sort the result set from shortest to longest. The sorted list includes only the 50 traces that were originally returned by the query. We do not first sort all traces containing a matching span, and then display the 50 shortest traces.

   {%include tip.html content="If you've enabled a sampling strategy, results are found among the spans that have actually been ingested. The query does not search through spans before they’ve been sampled."  %}

The current time window for the Traces Browser also implicitly limits by the result set. Traces are returned only if they contain a matching span _and_ start in the current time window.

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
