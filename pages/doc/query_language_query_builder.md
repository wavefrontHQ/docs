---
title: Query Builder
keywords: query language
tags: [query language, getting started, videos]
sidebar: doc_sidebar
permalink: query_language_query_builder.html
summary: Learn how to get started with creating Wavefront Query Language expressions using Query Builder.
---
The Wavefront Query Builder makes Wavefront even more accessible to all users in your organization. The Query Builder is a layer on top of the Wavefront Query Language, and is not a replacement for the Query Editor. Query Builder supports most elements of the Wavefront Query Language, though a few of the more advanced functions are only available in the Query Editor. This includes functions such as aliasMetrics(), if(), retainSeries(), etc. For further information on these functions, see [Wavefront Query Language Quick Reference](query_language_reference.html).

**Note** After you manually edit a query built using Query Builder, you cannot return to editing using the Query Builder.


For a video overview, see:

{% include video.html file="nbsabve6yg" %}


## Enabling Query Builder

You can enable or disable Query Builder in your [user preferences](users_account_managing.html#configuring-your-preferences).
* If **Enable Query Builder** and **Always Open the Query Builder** are both checked, then the Query Builder always displays when you navigate to a blank chart or new alert.
* If **Always Open the Query Builder** is not checked, then the Query Editor displays by default. Query Builder displays only if you click the query builder toggle.

![Query builder new](images/query_builder_new.png)

To switch from Query Builder to Query Editor, click the toggle.
**Note** You cannot switch from Query Editor to Query Builder if any part of the query has changed.

## Constructing Queries

In Query Builder, a query consists of a metric, zero or more filters (i.e. sources, source tags, and point tags), and zero or more functions. You build the query from these elements, and the query displays below.

![Query builder](images/query_builder_48x.png)

To use a constant value or the value of another query instead of a metric, you can toggle the metrics field by clicking the metrics selector:

![Metric selector](images/metric_selector.png)

To preview the result of each evaluation step in real-time, click the bar chart icon at the end of each field:

![Display query](images/display_query.png)

## Applying Filters and Functions

Query Builder helps you construct your queries like this:
* You can AND and OR multiple elemtns together.
  Unlike manually constructed ts() queries, which allow mixed ANDs and ORs, the Query Builder applies either AND or OR.
* The order of evaluation is left to right (i.e. metrics, then filters, then functions).
* As with the query language, wildcard matching is supported for metrics, sources, and tags.
* You can remove any element in the expression chain by clicking the X icon to the right of that element. The rest of your expression remains intact.

![filter and](images/filter_and.png)

As you build the query, the full ts() expression is shown below for reference.
