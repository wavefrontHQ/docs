---
title: Query Editor
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_editor.html
summary: Query your metrics with query language functions and variables.
---

Query editor allows advanced users to extract exactly the metrics they need from the data flowing into Wavefront.

Query Editor expect that you type the query using the elements of the query language. See [Wavefront Query Language Quick Reference](query_language_reference.html) for a complete reference - each function links to a reference page.

**Note:** Most functions allow you to query time series metrics. Some functions also support histograms or

## Open Query Editor

To switch from Chart Builder to Query Editor, click the toggle.

![Query builder new](images/v2_query_builder_toggle.png)

**Warning:** If you switch to Query Editor and make changes to the query there, you cannot return to Chart Builder.

## Construct Queries

You construct queries using Wavefront Query language.
1. Start with the metric you want to monitor.
2. Add filters.
3. Add one or more functions. Execution order is important.
4. Use grouping if you're interested in grouping your metrics, for example, show one line in the chart for the production environment and one for the 




## Use Filters and Functions



## Use Chart Variables

Wavefront supports both dashboard variables and chart variables.

Chart variables make it possible to use the result of one query in another query in the same chart using `{$query_name}` notation.
