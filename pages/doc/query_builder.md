---
title: Query Builder
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_builder_v2.html
summary: Learn how to create Wavefront Query Language expressions using Query Builder.
---

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">Chart builder has the tools for creating charts and customizing which metrics you see.
<ul>
<li>Construct queries from building blocks</li>
<li>Show or hide individual queries</li>
<li>Clone or delete a query</li>
<li>Create alerts from a query or open AI Genie for forecasting or anomaly detection. </li></ul></td>
<td width="20%"><a href="query_language_query_builder.html"><img src="/images/classic_button.png" alt="click here for the classic doc"/></a></td>
</tr>
</tbody>
</table>


## Get Started

To get started:
* Select **Dashboards > Create Chart** to create a new chart.
* Click the chart name of a chart you want to edit.

![query builder tasks](images/query_builder_collage.png)

A few more advanced functions, such as chart variables, are available only in the Query Editor. Query Editor expect that you type the query using the elements of the query language. You can switch to Query Editor to use those functions. You cannot switch from Query Editor to Query Builder.

## Construct a Query

You use query builder to construct a query from its building blocks:

## Select Metrics

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">You have these options:
<ul>
<li>Start typing the metric name in the search box.</li>
<li>Select <strong>Integrations</strong> for a list of available integrations, then select a metric. </li>
<li>Select <strong>Browse</strong> and select a metric. </li></ul></td>
<td width="60%"><img src="/images/v2_add_metric.png" alt="add a metric"></td>
</tr>
</tbody>
</table>

### Specify Filters

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">Optionally specify filters to narrow down what the chart displays. You can add filters using the + button, and remove any filter using the X inside the filter bubble. </td>
<td width="60%">The following example filters a metric that supports specifying the falue of two point tags (az and env), the source, and a source tag. See <a href="tags_overview.html">Organizing with Tags</a>.<br>
<img src="/images/v2_add_filter.png" alt="add a filter"></td>
</tr>
</tbody>
</table>

### Group Function Results

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">Optionally specify one or more <strong>functions</strong>, for example, to show the sum or average of results from different sources, perform rounding or scaling, or use a moving window. When you select a function, help text explains how it works and a link sends you to more info.
<ul>
<li><strong>Raw Aggregation</strong>For many functions, e.g. <strong>sum()</strong> and <strong>rawsum()</strong>, we support a raw version that does not perform <a href="query_language_aggregate_functions.html">interpolation</a></li>
<li><strong>Group By</strong>The Group By field allows you to organize your chart. For example, you can sum the metric across all sources, or show results for each of two env tags separately.  </li></ul> </td>
<td width="60%">In the following example, we're in the process of selecting the sum function .<br>
<img src="/images/v2_add_functions.png" alt="add a function"></td>
</tr>
</tbody>
</table>

### Example: Metric, Summed Metric, Grouped Sum

The following picture shows first the original metric, then the sum, and then the sum grouped by the `env` point tag.

![query builder results](images/query_builder_results.png)


## More Info

See [Wavefront Query Language Quick Reference](query_language_reference.html) for a complete reference - each function links to a reference page.
