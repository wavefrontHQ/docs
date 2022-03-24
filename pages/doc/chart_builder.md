---
title: Chart Builder
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: chart_builder.html
summary: Use Chart Builder to display the data you're interested in.
---

When you get started with Tanzu Observability by Wavefront, Chart Builder is the fasted way to customize which metrics you see and to display them in charts.

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">Chart Builder has the tools for creating charts and customizing which metrics you see.
<ul>
<li>Construct queries from building blocks</li>
<li>Show or hide individual queries</li>
<li>Clone or delete a line</li>
<li>Create alerts or turn <strong>Anomaly Detection</strong> on for forecasting or anomaly detection on Line Plot charts. </li></ul></td>
<td width="20%"><a href="query_language_query_builder.html"><img src="/images/classic_button.png" alt="click here for the classic doc"/></a></td>
</tr>
</tbody>
</table>


## Video

Here's a 90 second overview of some of the main features.

<iframe src="https://bcove.video/2Xx9IPz" width="700" height="400" allowfullscreen="true" alt="Wavefront intro how-to"></iframe>

## Get Started

When you create a new chart or edit an existing chart, we open Chart Builder:

* Select **Dashboards > Create Chart** to create a new chart.
* Click the chart name of a chart you want to edit.

![query builder tasks](images/query_builder_collage.png)

We open Chart Builder only if:
* Chart Builder is the default in your [user preferences](users_account_managing.html).
* The chart that you open for edit wasn't open in Query Editor before.

Advanced functionality, such as chart variables, is available only in the [Query Editor](query_editor.html). Query Editor expects that you type the query using the elements of the query language.

* Switch from Chart Builder to Query Editor to use those advanced functions.
* You **cannot** switch from Query Editor to Chart Builder.

## Select Metrics and Refine Your Chart

You always start by selecting a metric, and can then refine what's visible in the chart with filters and functions.

### Select Data

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">You have these options:
<ul>
<li>Start typing a name in the search box.</li>
<li>Select a metric type, that is, <strong>Metrics</strong>, <strong>Delta Counters</strong>, or <strong>Histograms</strong> and select from the menu. </li>
<li>Select <strong>Integrations</strong>, pick an integration, and then select a metric. </li>
<!-- There is no Browse option, so commenting this out <li>Click <strong>Browse</strong> and select from all metrics in your environment. </li>--></ul></td>
<td width="60%"><img src="/images/v2_add_metric.png" alt="add a metric"></td>
</tr>
</tbody>
</table>

### Specify Filters

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">Optionally, specify filters to narrow down what the chart displays.
<ul><li>Add filters using the + icon.</li>
<li>Remove a filter using the X inside the filter bubble.</li></ul> </td>
<td width="60%">This example filters a metric that supports specifying the value of two point tags (<code>az</code> and <code>env</code>), the source, and a source tag. See <a href="tags_overview.html">Organizing with Tags</a>.<br>
<img src="/images/v2_add_filter.png" alt="add a filter"></td>
</tr>
</tbody>
</table>

### Add Functions

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">Functions allow you to perform aggregation, scaling, or rounding, use moving time windows, and more.
<ul><li>When you select a function, help text explains how it works and a link sends you to more info.</li>
<li>For many functions, e.g., <strong>sum()</strong> and <strong>rawsum()</strong>, we support a raw version that does not perform <a href="query_language_aggregate_functions.html">interpolation</a>.</li></ul> </td>
<td width="60%">This example filters a metric that supports specifying the value of two point tags (<code>az</code> and <code>env</code>), the source, and a source tag. See <a href="tags_overview.html">Organizing with Tags</a>.<br>
<img src="/images/v2_add_functions.png" alt="add a filter"></td>
</tr>
</tbody>
</table>

### Group Results of a Function

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
For certain functions, the <strong>Group By</strong> field allows you to organize your chart. For example, you can show results for each of two <code>env</code> tags separately.<br>
In the example on the right, we're in the process of selecting the count function.<br>  </td>
<td width="60%">
<img src="/images/v2_group_by.png" alt="use group by"></td>
</tr>
</tbody>
</table>

### Example: Metric, Summed Metric, Grouped Sum

The following picture shows first the original metric, then the sum, and then the sum grouped by the <code>env</code> point tag.
<!---Review comment: You may want to crop those off the bottom, or add a head above each of the three screenshots to make it more clear.--->

![query builder results](images/query_builder_results.png)

## Combine Chart Builder Elements

Chart Builder lets you:
* Replace metrics.
* Add query lines.
* Hide or show the results of selected queries in the chart.
* Add and remove filters.
* Add or remove functions, or change the order of the functions.

### Add Query Lines

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">To add a query line, click <strong>Add</strong> below the last line.  </td>
<td width="60%">
<img src="/images/add_chart_line.png" alt="add a query line"></td>
</tr>
<tr>
<td width="40%">To hide or show the results of a query, click the <strong>Hide/Show</strong> button. The chart no longer shows the result of that query though the query line is still visible in Chart Builder.</td>
<td width="60%">
<img src="/images/v2_hide_show.png" alt="show/hide button"></td>
</tr>
</tbody>
</table>

### Add or Remove Filters

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">To add a filter, click the + icon next to the filter. To remove a filter, click X in the filter bubble. </td>
<td width="60%">
<img src="/images/v2_add_filter.png" alt="show/hide button"></td>
</tr>
</tbody>
</table>

### Add, Remove, or Reorder Functions

You can add, remove, or reorder functions. Reordering might become necessary because, for example, first applying `sum()` and then `deriv()` yields a different result than first applying `deriv()` and then applying `sum()`.

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

Advanced users can use [Query Editor](query_editor.html) to take advantage of the complete set of query language functions.

See [Wavefront Query Language Quick Reference](query_language_reference.html) for a complete reference. Each function links to a reference page.
