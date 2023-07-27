---
title: Query Language Tutorial
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_language_getting_started.html
summary: Watch some videos, run a query, apply filters and functions, and more.
---

VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) includes the Wavefront Query Language (WQL), which lets you retrieve and display data that has been ingested.
* **Time series data** The query language is particularly well suited to time series data because it accommodates the periodicity, potential irregularity, and streaming nature of that data type.
* **Histograms** The query language includes functions for [manipulating histograms](query_language_reference.html#histogram-functions).
* **Traces and spans** Use the [tracing UI](tracing_traces_browser.html) to query traces and spans.

This page uses the v2 UI, which allows you to examine your data with [chart builder](chart_builder.html) and perform advanced exploration with [query editor](query_editor.html).

## Videos

Watch these videos to get you started. The videos were created between 2017 and 2021 and some of the information in them might have changed. They also use the v1 UI, but the basic workflow remains the same in the v2 UI. 

<table style="width: 100%;">
<tbody>
<tr>
<td width="70%"><strong><font color="#0091DA" size="3">Query Language Basics</font></strong><br><br>
<iframe id="kmsembed-1_fd1z47ps" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_fd1z47ps/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="Wavefront Query Language Basics video"></iframe>
</td>
<td width="30%"><br><br>
<p>Learn about time series metrics, and about how to visualize metrics and filter and group them with Wavefront Query Language. </p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_fd1z47ps" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td width="70%"><strong><font color="#0091DA" size="3">Intro to Wavefront Query Language</font></strong><br><br>
<iframe id="kmsembed-1_kgacc2jb" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_f22x68bt/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Query Language Advanced Functions"></iframe></td>
<td width="30%"><br><br>
<p>Wavefront Query Language allows you to shape the data you see in your dashboards. The example uses the advanced functions if() at() and corr() to find a problem behavior of a switch in other switches and prevent future problems.</p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/playlist/dedicated/252649793/1_brmdewqc/1_f22x68bt" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
<tr>
<td style="width: 50%;"><strong><font color="#0091DA" size="3">Query Language Advanced Functions</font></strong><br><br>
<iframe id="kmsembed-1_kgacc2jb" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_kgacc2jb/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Query Language Advanced Functions"></iframe>
</td>
<td><br><br>
<p>Jason starts by looking at the data format. Then he adds a query to a chart that has only the required metric name. To narrow down the result, he uses a source filter with a wildcard and a point tag filter. <p>You can also watch the video <a href="https://vmwaretv.vmware.com/playlist/dedicated/252649793/1_brmdewqc/1_kgacc2jb" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p></p>
</td>
</tr>
</tbody>
</table>

## Step 0: What's a Query?

Before you run your first query, let's examine a time series and look at the anatomy of a query.

### What's a Time Series?

A time series measures a particular phenomenon over time. In the example below:
* The time series metric is `temperature`
* Two types are `ear` and `forehead`, and the types can show up as values of a `location` tag.
* You could also associate a source with each time series. In this example, you could have a different time series for each patient.

![line chart of 2 temperature time series, one for type== forehead and one for type=ear](images/time_series_basic.png)

### Anatomy of a Query

Now, let's look at the anatomy of a query (shown in Chart Builder):

![annotated chart builder, items discussed below](images/query_anatomy_builder.png)

Each query has the following components. Only the metric is required, the other elements are optional, but they help you get the information you're really interested in.
* A **metric** (or a constant, such as `10`). Above, the metric is temperature. In this example, the metric is `~sample.cpu.loadavg.1m`
* One or more **sources**. Above, sources would have been patients. Here, sources could be the host, VM, container, etc. In this example, the source is `app-*` -- that means metrics that come from `db-*` are ignored.
* One or more point tags. Above, we have the `location` point tag - `ear` and `forehead`. In this example, we have the `env` point tag with value `production`. Only valid point tags can be queried.
* One or more functions. This example uses the `avg()` function, and the `mmedian()` function with a 10-minute time window. The [Query Language Reference](query_language_reference.html) lists each function with a short description and points to reference pages.

Here's how the same query looks in the Query Editor.

![annotated query editor, items discussed above](images/query_anatomy_editor.png)


## Step 1: Retrieve a Metric

The Chart Builder UI makes it easy to show any metric that's currently flowing into your product instance. Follow these steps to explore the sample data, included with each product instance.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>Log in to your product instance, which has a URL &lt;my_instance&gt;.wavefront.com. </li>
<li>Select <strong>Dashboards > New Chart</strong>.</li>
<li>In the Chart Builder, select the metric ~sample.cpu.loadavg.1m. Autocomplete helps with the selection. </li></ol>
</td>
<td width="50%">
<img src="images/chart_builder_autocomplete.png" alt="Zoom in on data selection in chart builder, showing auto-complete."></td>
</tr>
</tbody>
</table>

Here's an annotated screenshot of the first chart you'll see.

* **Chart names** are easy to change just by typing.
* For quick zoom in/out, use the **hover time selector**, which appears when the cursor is on the chart.
* As you zoom in or out, the [bucket size (chart resolution)](ui_charts.html#chart-resolution) changes.
* Use **Share chart** or **Quick share** to [share with others](ui_sharing.html).
* Use the Query Editor toggle for some advanced query functionality.
* Notice [events](events.html) that are shown on the time line. These events are often system events associated with alerts, but they can also be user-defined events.
* Make sure that you **Save** the chart to a new or existing dashboard.

![First simple query shown in annotated chart. Items are explained in text above. ](images/query_quickstart_first_query.png)

**Things to Try**

In the chart:
* Use the Hover Time Selector to zoom in and out. You can also select-drag to see part of the chart, then click + or - to return to the default settings.
* Hover over event icons in the Y axis to get details for the event.
* Hover over a time series to see the legend. Press Shift+P to pin the legend.

In Chart Builder:
* Query other `~sample` metrics.
* Switch to Query Editor and add a constant (e.g., 100) -- but note that you can't switch back to Chart Builder!

## Step 2: Filter by Source and Point Tag

The example chart is quite busy, but we can use filters to focus in.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
1. Make sure <strong>Data</strong> is still ~sample.cpu.loadavg.1m. </td>
<td width="40%"> </td></tr>
<tr>
<td>2. Click <strong>Filters</strong>, select <strong>source</strong> and type <strong>app-&#42;</strong> to include only time series if the source name starts with <strong>app-</strong>. This query uses a wildcard character.</td>
<td><img src="images/query_quickstart_source.png" alt="Add source to Filter"></td>
</tr>
<tr>
<td>
3. Press Enter.
</td>
</tr>
<tr>
<td>
4. Click the <strong>Add</strong> button and select <strong>env &gt; production</strong> as the second filter.
</td>
<td width="50%">
<img src="images/query_quickstart_env.png" alt="Select env=production">
</td>
</tr>
</tbody>
</table>

**Things to Try**

* Explore the effect of using different source and point tag filters.
* Add more than one filter for each category, for example, several sources.
* Click the Query Editor toggle `</>` to see the results in Query Editor.
* Clone the query to experiment more. If you accidentally make a change in the query while you're in the Query Editor, you can't return to Chart Builder, so using a clone helps.
* With multiple queries in place, show and hide queries, and drag them to change query order.

## Step 3: Apply an Aggregation Function

[Aggregation functions](query_language_aggregate_functions.html) allow you to combine points from multiple time series, and to group the results. Let's take the average first, and then let's remove the `env` filter and instead group by environment.

<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
1. Make sure <strong>Data</strong> is still ~sample.cpu.loadavg.1m. </td>
<td width="40%"> </td></tr>
<tr>
<td>
2. Click <strong>Functions</strong>, and pick <strong>Favorites &gt; avg</strong>. The result is a single aggregated time series.
In Query Editor, this query looks like this:
<p><code>avg(ts(~sample.cpu.loadavg.1m, source="app-*" and env="production"))</code></p>
</td>
<td><img src="images/query_quickstart_avg.png">
</td>
</tr>
<tr>
<td>
3. Remove the `env` filter.
</td>
</tr>
<tr>
<td>

4. Click <strong>Functions &gt; Favorites &gt; avg</strong> again.
</td>
</tr>
<tr>
<td>
5. Select <strong>Group by</strong>, then select <strong>env</strong>, and click <strong>Apply</strong>.

The result is two aggregated time series. You can hover over each line to see which environment it shows.

In the Query Editor, you can add the literal <strong>, pointTags</strong> (you need the comma!), so the query looks like this:
<p><code>avg(ts(~sample.cpu.loadavg.1m, source="app-*"), env, pointTags)</code></p>
</td>
<td>
<img src="images/query_quickstart_group_by.png" alt="Select env=production">
</td>
</tr>
<tr>
<td>
6. Add a second function. For example, you can use the deriv() function to show the rate of change per second for the average.
<p><code>deriv(avg(ts(~sample.cpu.loadavg.1m, source="app-*"), env))</code></p> </td>
<td><img src="/images/v2_quickstart_deriv_1.png" alt="apply second function in chart builder"></td>
</tr>
</tbody>
</table>

**Things to Try**

Experiment with some of our other functions, either in Chart Builder or in Query Editor.

* Use one of the [Moving Window Time Functions](query_language_reference.html#moving-window-time-functions) to combine or test the values of a time series over a time sliding window.
* Experiment with [Filtering and Comparison Functions](query_language_reference.html#filtering-and-comparison-functions). For example, use `topk()` to return the top `numberOfTimeSeries` series.

## Step 4: See What's There

Wavefront Query Language has a rich set of functions for many purposes. The [Query Language Reference](query_language_reference.html) has the details, here's an overview (in pictures).

The following diagram shows the main function categories for examining time series metrics. We support additional functions for working with [events](query_language_reference.html#event-functions), [histograms](query_language_reference.html#histogram-functions), and with [traces and spans](query_language_reference.html#traces-functions).

<table style="width: 100%;">
<tbody>
<tr>
<td width="15%">&nbsp;</td>
<td width="70%"><img src="images/ql_function_overview.png" alt="Diagram showing function types  aggregation, filtering, predictive, standard time, moving window time, missing data, string manipulation, math, misc"> </td>
<td width="15%">&nbsp;</td>
</tr>
</tbody>
</table>



<table style="width: 100%;">
<tbody>
<tr>
<td width="30%" markdown="span">
<strong>Aggregation, Predictive, and Filtering & Comparison Functions</strong>
<br /><br />
1. Let's drill down and look at the first set of functions. The image on the right shows the aggregation, filtering, and predictive functions. The <a href="query_language_reference.html">Query Language Reference</a> has the syntax for each function. The function syntax links to a reference page.</td>
<td width="70%"><img src="images/ql_functions_column_1.png" alt="aggregation, filtering, predictive functions. Same list as in QL reference"> </td></tr>
<tr>
<td width="30%">
<strong>Standard Time, Moving Time Window, and Missing Data Functions</strong>
<br /><br />
2. Next, let's look at a second set of functions. The image on the right shows the standard time, moving window time, and missing data functions. The <a href="query_language_reference.html">Query Language Reference</a> has the syntax for each function. The function syntax links to a reference page. </td>
<td width="70%"><img src="images/ql_functions_purple.png" alt="time and missing data functions. Same lists as in QL reference"> </td>
</tr>
<tr>
<td width="30%">
<strong>Math, String Manipulation, and Miscellaneous functions</strong>
<br /><br />
3. Finally, we look at the math, string manipulation, and miscellaneous functions (shown in more detail in the query language reference. The <a href="query_language_reference.html">Query Language Reference</a> has the syntax for each function. The function syntax links to a reference page.
</td>
<td width="70%">
<img src="images/ql_functions_green.png" alt="math, string, and misc functions. Same lists as in QL reference">
</td>
</tr>
</tbody>
</table>


<!---
## Step 4: Further Chart Customization

The [query language](query_language_reference.html) supports many other ways of getting just the results you want from your data. Here are some examples;

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Add a second function. For example we can use the deriv() function to show the rate of change per second for the sum.
<p><code>deriv(sum(ts(~sample.requests.total.num))</code></p> </td>
<td width="60%"><img src="/images/v2_quickstart_deriv.png" alt="create dashboard"></td>
</tr>
<tr>
<td width="40%">
You can also add a second filter. Our sample data include an env and an az point tag, and we can select one of the values of that tag. </td>
<td width="60%"><img src="/images/v2_quickstart_tag.png" alt="group by tag"></td>
</tr>
</tbody>
</table>
--->



## Next Steps

What's next depends on the type of data you're interested in, and how you want to interact with your data.

### Query Types for Different Data

Most users query for time series metrics, but we support interacting with other data.

Charts for metrics also support the following types of queries:
* **Events**: Query events with [`events()` queries](query_language_reference.html#event-functions).
* **Histograms**: Query histograms with [`hs()` queries](visualize_histograms.html#query-histogram-metrics).
* **Traces and spans**: Query trace data from the tracing UI with the [tracing Query Builder](trace_data_query.html).

### Docs, Learning Dashboards, and More!

Our documentation includes tutorials, reference, and guides on the query language. In addition, your product instance includes an **Interactive Query Language Explorer** dashboard.

- **[Chart builder](chart_builder.html)** can help you come up to speed quickly while using the product.
- If you're logged in to your product instance, click **Integrations** on the toolbar and find the **Tutorial** or the **Tour Pro** integration. The Tutorial includes an **Interactive Query Language Explorer** dashboard that shows examples for most functions.
- [Wavefront Query Language Reference](query_language_reference.html) lists each function and gives query language syntax element. Each function name is a link to a reference page for the function.
- For in-depth discussions and examples, we have a **[reference page](label_query%20language.html)** for each function and some [Query Language Recipes](query_language_recipes.html).

## FAQ

This doc set includes videos and explanations from the engineering team that helps you come up to speed quickly:

<table style="width: 100%;">
<tbody>
<thead>
<tr><th width="40%">Question</th><th width="30%">Doc/Blog</th><th width="30%">Video</th></tr>
</thead>
<tr>
<td>How can I combine multiple series?</td>
<td markdown="span">[Aggregating Time Series](query_language_aggregate_functions.html) </td>
<td markdown="span">[Time Series and Interpolation](https://vmwaretv.vmware.com/media/t/1_afml14zm) </td></tr>
<tr>
<td>Why does my query return NO DATA?</td>
<td markdown="span">Maybe the time series don't match. See [When Multiple Series Match (Or Not)](query_language_series_matching.html). </td>
<td> </td></tr>
<tr>
<td>I got a warning about pre-aligned data. Why? </td>
<td markdown="span">To improves performance, the query engine wraps `align()` around certain functions. See [Bucketing with align()](query_language_align_function.html). </td>
<td> </td></tr>
<tr>
<td>How can I improve query performance?</td>
<td markdown="span">Consider [bucketing with align()](query_language_align_function.html).
Investigate [internal metrics for optimizing performance](wavefront-internal-metrics.html). </td> <td> </td></tr>
</tbody>
</table>

<!---
<tr>
<td>How do time windows work?</td>
<td markdown=span>Wavefront supports [moving time window functions](). </a>.
Investigate <a href="https://docs.wavefront.com/dashboards_slow_queries.html">slow queries</a>.</td><td> </td></tr>
<tr>
<td>How do I calculate the moving averate over a set of time (e.g. 24 hours)?</td>
<td markdown=span>Use a moving time window function. See [Calculating Continuous Aggregation with Moving Window Functions](query_language_windows_trends.html#calculating-continuous-aggregation-with-moving-window-functions).</td><td> </td></tr>
<tr>
<td>How do I calculate over a specified of time (e.g. daily average)?</td>
<td markdown=span>Use a tumbling time window. See [Tumbling Windows Examples](query_language_windows_trends.html#tumbling-window-examples).</td><td> </td></tr>
--->
