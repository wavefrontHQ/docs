---
title: Query Language Quickstart
keywords: query language
tags: [query language, getting started, videos]
sidebar: doc_sidebar
permalink: query_language_getting_started.html
summary: Watch some videos, run a query, apply filters and functions, and more.
---
The Wavefront Query Language has been designed for time series data. Time series data are unique and requires a query language that accommodates the periodicity, potential irregularity, and streaming nature of the data.

Watch these videos to get you started:

<table style="width: 100%;">
<tbody>
<tr><td width="50%"><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=60b992dc-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_ql_intro.png" alt="introduction to query language"/></a></td>
<td width="50%"><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=61f9391c-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_ql_basics.png"/></a></td></tr>
</tbody>
</table>

## Basic Query

A simple query retrieves an individual metric:

`ts(<metricName>)`

For example, you can show when the CPU is idle by entering `ts(cpu.idle)` into a query field to produce the chart below:

![base query](images/base_query.png)


## Filtering by Source

The example chart displays many lines, particularly below 8M. To simplify the chart, you can filter by source using the optional `source=<sourceName>` parameter: `ts(<metricName>, source=<sourceName>)`. For example, use a `source="m*"` filter to show all sources that start with "m". The number of lines is reduced and the Y-axis scale changes from 30M to 5M:

![filtered query](images/filtered.png)

## Applying Aggregation Functions

For further exploration try one of the aggregation functions. For example, use `avg()` to show the average value of the `cpu.idle` metric across all sources.  Or use `sum()` to get a total for all sources starting with "m". Here's the chart adding `sum()`:

![summed query](images/summed.png)

## Applying Mathematical Functions

Notice how the result of `sum(ts(cpu.idle))` is slowly increasing over time, but does not show how fast the sum is increasing. The query language has a `deriv()` function that shows the rate of change per second: `deriv(sum(ts(cpu.idle))`.

![summed rate query](images/deriv_sum.png)

## Next Steps

What's next depends on the type of data you're interested in, and how you want to interact with your data.

### Query Types for Different Data

Most Wavefront users query for metrics, but we support interacting with other data.

Charts for metrics also support the following types of queries:
* Query Wavefront events with [`events()` queries](query_language_reference.html#event-functions).
* Query histograms with [`hs() queries`](proxies_histograms.html#querying-histogram-metrics)

A separate set of interfaces is available for developers who are interested in traces and spans.

### Docs, Videos, and Wizards

Wavefront documentation includes videos, tutorials, reference, and guides on the query language.

- **[Query Language Videos](videos_query_language.html)** get you started and [Use Case Videos](wavefront_use_cases.html) show off some compelling examples.
- **[Query builder](query_language_query_builder.html)** can help you come up to speed quickly while using the product.
- Log in to Wavefront and learn with our Tutorial and  Tour. The Tutorial includes an Interactive Query Language Explorer that shows examples for each function.
- [Wavefront Query Language Quick Reference](query_language_reference.html). gives an overview of the different types of functions that can be used in a query. Each function names is a link to a reference page for the function.
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
