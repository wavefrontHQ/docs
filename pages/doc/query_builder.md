---
title: Chart Builder (v2 Beta)
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: chart_builder.html
summary: Use Chart Builder to display the data you're interested in.
---

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">Chart Builder has the tools for creating charts and customizing which metrics you see.
<ul>
<li>Construct queries from building blocks</li>
<li>Show or hide individual queries</li>
<li>Clone or delete a line</li>
<li>Create alerts or open AI Genie for forecasting or anomaly detection. </li></ul></td>
<td width="20%"><a href="query_language_query_builder.html"><img src="/images/classic_button.png" alt="click here for the classic doc"/></a></td>
</tr>
</tbody>
</table>


## Get Started

When you create a new chart or edit an existing chart, we open Chart Builder:

* Select **Dashboards > Create Chart** to create a new chart.
* Click the chart name of a chart you want to edit.

![query builder tasks](images/query_builder_collage.png)

We open Chart Builder only if:
* Chart Builder is the default in your [user preferences](users_account_managing.html).
* A chart that you open for edit wasn't open in Query Editor before.

A few more advanced functions, such as chart variables, are available only in the Query Editor. Query Editor expects that you type the query using the elements of the query language.

* Switch from Chart Builder to Query Editor to use those advanced functions.
* You **cannot** switch from Query Editor to Chart Builder.

## Select Metrics and Refine Your Chart

You always start by selecting a metric, and can then refine what's visible in the chart with filters and functions.

### Select Metrics

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">You have these options:
<ul>
<li>Start typing the metric name in the search box.</li>
<li>Select <strong>Integrations</strong>, pick an integration, and then select a metric. </li>
<li>Select <strong>Browse</strong> and select from all metrics in your environment. </li></ul></td>
<td width="60%"><img src="/images/v2_add_metric.png" alt="add a metric"></td>
</tr>
</tbody>
</table>

### Specify Filters

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">Optionally specify filters to narrow down what the chart displays.
<ul><li>Add filters using the + button.</li>
<li>Remove any filter using the X inside the filter bubble.</li></ul> </td>
<td width="60%">This example filters a metric that supports specifying the falue of two point tags (az and env), the source, and a source tag. See <a href="tags_overview.html">Organizing with Tags</a>.<br>
<img src="/images/v2_add_filter.png" alt="add a filter"></td>
</tr>
</tbody>
</table>

### Add Functions

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">Functions allow you to perform aggregation, scaling, or rounding, use moving time windows and more.
<ul><li>When you select a function, help text explains how it works and a link sends you to more info.</li>,
<li>For many functions, e.g. <strong>sum()</strong> and <strong>rawsum()</strong>, we support a raw version that does not perform <a href="query_language_aggregate_functions.html">interpolation</a></li></ul> </td>
<td width="60%">This example filters a metric that supports specifying the falue of two point tags (az and env), the source, and a source tag. See <a href="tags_overview.html">Organizing with Tags</a>.<br>
<img src="/images/v2_add_functions.png" alt="add a filter"></td>
</tr>
</tbody>
</table>

### Group Results of a Function

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">For certain functions, the <strong>Group By</strong> field allows you to organize your chart. For example, you can show results for each of two env tags separately.   </td>
<td width="60%">In the following example, we're in the process of selecting the sum function .<br>
<img src="/images/v2_group_by.png" alt="use group by"></td>
</tr>
</tbody>
</table>

### Example: Metric, Summed Metric, Grouped Sum

The following picture shows first the original metric, then the sum, and then the sum grouped by the `env` point tag.

![query builder results](images/query_builder_results.png)

## Combine Chart Builder Elements

Chart Builder lets you:
* Replace metrics.
* Add chart lines - and hide or show selected lines in the chart.
* Add and remove filters.
* Add or remove functions, or change function order.

### Add Chart Lines

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">To add a chart line, click <strong>Add</strong> below the last line.  </td>
<td width="60%">
<img src="/images/add_chart_line.png" alt="add a chart line"></td>
</tr>
<tr>
<td width="40%">To hide or show the results of a chart line, click the <strong>Hide/Show</strong> button. The chart no longer shows the result of that line.</td>
<td width="60%">
<img src="/images/v2_hide_show.png" alt="show/hide button"></td>
</tr>
</tbody>
</table>

### Add or Remove Filters

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">To add a filter, click the + next to the filter. To remove a filter, click the x on the filter bubble. </td>
<td width="60%">
<img src="/images/v2_add_filter.png" alt="show/hide button"></td>
</tr>
</tbody>
</table>

### Add, Remove, or Reorder Functions

You can add, remove, or reordering functions. Reordering might become necessary because, for example, first applying `sum()` and then `deriv()` yields a different result than first applying `deriv()` and then applying `sum()`.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">To add a function, click the + next to the function. To remove a function, click the x on the function bubble.   </td>
<td width="60%">
<img src="/images/add_chart_line.png" alt="add a chart line"></td>
</tr>
<tr>
<td width="40%">To reorder functions, hover the cursor over the drag icon until the mouse changes shape, and then drag the function to the place you want it. </td>
<td width="60%">
<img src="/images/v2_reorder_functions.png" alt="reorder functions"></td>
</tr>
</tbody>
</table>



## More Info

See [Wavefront Query Language Quick Reference](query_language_reference.html) for a complete reference. Each function links to a reference page.
