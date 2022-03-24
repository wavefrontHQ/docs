---
title: Query Editor
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_editor.html
summary: Query your metrics with query language functions and variables.
---

Tanzu Observability by Wavefront supports two tools for working with queries:

* [Chart Builder](chart_builder.html)is the fasted way to customize which metrics you see and to display them in charts.
* Query Editor, discussed on this page, allows advanced users to extract exactly the metrics they need from ingested data. If a chart uses functions that are not supported in Chart Builder, or if the chart has been opened in Query Editor before, we show Query editor when you open the chart for edit.

We open Query Editor if:
* Query Editor is the default in your [user preferences](users_account_managing.html).
* The chart that you open for edit already open in Query Editor before.

{% include tip.html content="Because Chart Builder has a subset of Query Editor functionality, you cannot switch from Query Editor to Chart Builder. "%}

## Basics

Query Editor expects that you type the query using the elements of the query language. See [Wavefront Query Language Quick Reference](query_language_reference.html) for a complete reference - each function links to a reference page.

{% include note.html content="Most functions allow you to query time series metrics. Some functions also support histograms, traces, or events. "%}

* [Functions for use with histograms](query_language_reference.html#histogram-functions)
* [Functions for use with traces and spans](query_language_reference.html#traces-functions)
* [Functions for use with events](query_language_reference.html#event-functions)

## Open Query Editor

You can set [your preferences](users_account_managing.html) to use Chart Builder or Query Editor when you open a chart for edit.

To switch from Chart Builder to Query Editor, click the toggle.

![Query builder new](images/v2_query_builder_toggle.png)

**Warning:** If you switch to Query Editor and make changes to the query there, you cannot return to Chart Builder.


## Construct Queries

You construct queries using Wavefront Query Language.
1. Start with the metric that you want to monitor.
2. Add filters, e.g. `source=production`.
3. Add one or more [query language functions](query_language_reference.html). Execution order makes a difference.
4. Use [grouping](query_language_aggregate_functions.html#grouping-the-aggregation-results) if you're interested in grouping your metrics. For example, you could use the `sources` parameter one line for each source in the chart.


## Use Chart Variables

You can use variables in dashboards and charts.
* You can use dashboard variables in your queries.
* Chart variables are local to the chart.

Chart variables make it possible to use the result of one query in another query in the same chart using `${query_name}` notation.
