---
title: Query Language Quickstart
keywords: query language
tags: [query language, getting started, videos]
sidebar: doc_sidebar
permalink: query_language_getting_started.html
summary: Watch some videos, run a query, apply filters and functions, and more.
---
The Wavefront Query Language lets you retrieve and display the data that has been ingested into Wavefront.
* **Time series data** The query language is particularly well suited to time series data, because it accommodates the periodicity, potential irregularity, and streaming nature of that data type.
* **Histograms** The query language includes functions for [manipulating histograms](query_language_reference.html#histogram-functions).
* **Traces and spans** Use the [tracing UI](tracing_ui_overview.html) to query traces and spans.

This page uses the v2 UI, which allows you to examine your data with [chart builder](chart_builder.html) and perform advanced exploration with [query editor](query_editor.html).

Watch these videos to get you started. The videos use the v1 UI, but the basic workflow remains the same in the v2 UI.

<table style="width: 100%;">
<tbody>
<tr><td width="50%"><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=60b992dc-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_ql_intro.png" alt="introduction to query language"/></a></td>
<td width="50%"><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=61f9391c-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_ql_basics.png"/></a></td></tr>
</tbody>
</table>

## Retrieve a Metric

The Chart Builder UI makes it easy to show any metric that's currently flowing into your Wavefront instance. For example, you can the total number of requests typing `~sample.requ` into the **Metric** field and selecting from the auto-complete options. (The ~sample metrics are available on all Wavefront instances for experimentation).

![base query](images/v2_quickstart_simple.png)


## Filter by Source

The example chart is quite busy, but we can filter by source. The [Wavefront Data Format](wavefront_data_format.html) includes the source for each metric out of the box. Chart Builder makes it easy to filter by source.


![filtered query](images/v2_quickstart_filtered.png)

## Apply an Aggregation Function

The example above selected a single source - but we can also use the wildcard character in the query line. Now, the chart becomes pretty busy again. Let's use one of the aggregation functions. We could use `avg()` to show the average value of metric across all sources. Or we can use `sum()` to get a total for all sources starting with `app-1`. Here's the chart:

![summed query](images/v2_quickstart_sum.png)



## Further Chart Customization

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
Because sum() is an aggregation function, you can group the results. To group by point tags, add the literal <strong>, pointTags</strong> (you need the comma!). The legend shows that we're getting results for both point tags (az and env).

<p><code>sum(ts(~sample.requests.total.num), pointTags)</code></p> </td>
<td width="60%"><img src="/images/v2_quickstart_pointTags.png" alt="group by point tags"></td>
</tr>
<tr>
<td width="40%">
You can also add a second filter. Our sample data include an env and an az point tag, and we can select one of the values of that tag. </td>
<td width="60%"><img src="/images/v2_quickstart_tag.png" alt="group by tag"></td>
</tr>
</tbody>
</table>


## Next Steps

What's next depends on the type of data you're interested in, and how you want to interact with your data.

### Query Types for Different Data

Most Wavefront users query for metrics, but we support interacting with other data.

Charts for metrics also support the following types of queries:
* **Events**: Query Wavefront events with [`events()` queries](query_language_reference.html#event-functions).
* **Histograms**: Query histograms with [`hs() queries`](visualize_histograms#querying-histogram-metrics)
* **Traces and spans**: Query trace data from the tracing UI with the [tracing Query Builder](trace_data_query.html)

### Docs, Videos, and Recipes

Wavefront documentation includes videos, tutorials, reference, and guides on the query language.

- **[Query Language Videos](videos_query_language.html)** get you started and [Use Case Videos](wavefront_use_cases.html) show off some compelling examples.
- **[Query builder](query_language_query_builder.html)** (for v1) and **[Chart builder](chart_builder.html)** (for v2) can help you come up to speed quickly while using the product.
- If you're logged in to Wavefront, select **Integrations** in the task bar and find the **Tutorial** or the **Tour Pro** integration. The Tutorial includes an Interactive Query Language Explorer that shows examples for each function.
- [Wavefront Query Language Reference](query_language_reference.html) lists each function and gives query language syntax element. Each function names is a link to a reference page for the function.
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
<td markdown="span">[Time Series and Interpolation](https://youtu.be/9LnDszVrJs4) </td></tr>
<tr>
<td>Why does my query return NO DATA?</td>
<td markdown="span">Maybe the time series don't match. See [When Multiple Series Match (Or Not)](query_language_series_matching.html) </td>
<td> </td></tr>
<tr>
<td>I got a warning about pre-aligned data. Why? </td>
<td markdown="span">Wavefront improves performance by wrapping `align()` around certain functions. See [Bucketing with align()](query_language_align_function.html) </td>
<td> </td></tr>
<tr>
<td>How can I use Wavefront for anomaly detection?</td>
<td markdown="span">You can use [AI Genie](ai_genie.html) or [detect anomalies with functions and statistical functions](query_language_statistical_functions_anomalies.html). </td>
<td><ul><li><a href="https://youtu.be/XiSkNETTfCI">AI Genie Anomaly Detection</a></li>
<li><a href="https://youtu.be/I-Z9d94Zi7Y">Anomaly Detection with Functions</a></li></ul> </td></tr>
<tr>
<td>How can I improve query performance?</td>
<td markdown="span">Consider [bucketing with align()](query_language_align_function.html).
Investigate [slow queries](wavefront_monitoring.html#examine-slow-queries).</td> <td> </td></tr>

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
