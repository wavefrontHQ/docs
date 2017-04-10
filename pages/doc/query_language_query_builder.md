---
title: Query Builder
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_language_query_builder.html
summary: Learn how to get started with creating Wavefront Query Language expressions using Query Builder.
---
The Wavefront Query Builder makes Wavefront even more accessible to all users in your organization. The Query Builder is a layer on top of, not a replacement for, Wavefront Query Language. Almost all of the full power of the Wavefront Query Language is maintained for expert users though a few of the more advanced functions are only available in the full Wavefront Query Language (i.e non-Query Builder developed queries). These include functions such as aliasMetrics(), if(), retainSeries(), etc. For further information on these functions, see [Wavefront Query Language Quick Reference](query_language_reference).  If you subsequently manually edit a query built by the Query Builder, that query can no longer be edited using the Query Builder.
 
This topic describes how to enable and use the Query Builder. For a video overview, see [Introduction to the Query Builder](https://wavefront-1.wistia.com/medias/nbsabve6yg).

## Enabling Query Builder

You can enable or disable the Query Builder in your [user preferences](users_prefs_configuring). If **Enable Query Builder** and **Always Open the Query Builder** are both checked, then the Query Builder always displays when you navigate to a blank chart or new alert. If **Always Open the Query Builder** is not checked, then the Query Builder displays only if you manually choose to display it by clicking the gears icon <i class="fa fa-cogs"/> to the left of the query field.
 
## Constructing Queries

In Query Builder, a query consists of a chain of metrics <i class="fa fa-signal"/>, one or more "filters" <i class="fa fa-filter"/> (i.e. sources, source tags, and point tags), and one or more functions _**f()**_: 

![Query builder](images/query_builder.png)

To use a constant value or the value of another query instead of a metric, you can toggle the metrics field by clicking the metrics selector:

![Metric selector](images/metric_selector.png)

To preview the result of each evaluation step in real-time, click the bar chart icon <i class="fa fa-bar-chart"/> at the end of each field ![field preview](images/qb_field.png#inline):

![Display query](images/display_query.png)

## Applying Filters and Functions

You can AND or OR multiple filters together ![fitler and](images/filter_and.png#inline) and follow with chained functions. Unlike manually constructed ts() queries, which allow [mixed ANDs and ORs](query_language_reference#operators), the Query Builder applies either AND or OR to all filters.

Functions are organized in a two-level hierarchy (e.g. Aggregation->Sum). A preview of the result of applying any function displays when you mouse over the function name. The full ts() expression is also shown in each preview window for reference.

![Functions](images/functions.png)

## Final Thoughts

The order of evaluation is left to right (i.e. metrics, then filters, then functions). As with the query language, wildcard matching is supported for metrics, sources, and tags. You can remove any link of the expression chain by clicking the <i class="fa fa-times-circle"/> icon of that link. The rest of your expression remains intact.

{% include links.html %}