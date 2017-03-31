---
title: Query Builder
keywords: query language
tags: [query_language, getting_started]
datatable: true
sidebar: doc_sidebar
permalink: query_language_query_builder.html
summary: This topic gets you started with building Wavefront Query Language expressions with Query Builder.
---
The Wavefront Query Builder makes Wavefront even more accessible to all users in your organization. The Query Builder is a layer on top of, not a replacement for, Wavefront Query Language. Almost all of the full power of the Wavefront Query Language is maintained for expert users though a few of the more advanced functions are only available in the full Wavefront Query Language (i.e non-Query Builder developed queries). These include functions such as aliasMetrics(), if(), retainSeries(), etc. For further information on these functions, see [Wavefront Query Language Quick Reference](query_language_reference).  If you subsequently manually edit a query built by the Query Builder, that query can no longer be edited using the Query Builder.
 
This article describes how to enable and use the Query Builder. For a video overview, see [Introduction to the Query Builder](https://wavefront-1.wistia.com/medias/nbsabve6yg).

## Enabling Query Builder

You can enable or disable the Query Builder in your [user preferences](users_prefs_configuring). If **Enable Query Builder** and **Always Open the Query Builder** are both checked, then the Query Builder always displays when you navigate to a blank chart or new alert. If **Always Open the Query Builder** is not checked, then the Query Builder displays only if you manually choose to display it by clicking the gears icon <i class="fa fa-cogs"></i> to the left of the query field.
 
## Order of Evaluation

Queries developed using the Query Builder are interpreted left to right and are comprised of a linear chain of metrics, “filters” (i.e. sources, source tags, and point tags), and functions. The metrics field can be toggled to use a constant value instead of a metric that varies over time, by clicking the metrics selector.

![Query builder](images/query_builder.png)

The result of each evaluation step can be previewed in real-time by clicking the eye icons <i class="fa fa-eye"></i>.

![Display query](images/display_query.png)

## Filters and Functions

You can AND/OR’d multiple filters together and follow with chained functions. Unlike manually constructed ts() queries however, the Query Builder applies either AND or OR to all filters. There is no option to apply mixed AND/OR's within a query designed with the Query Builder. Functions are organized in a two-level hierarchy (e.g. Aggregation->Sum). A preview of the result of applying any function is automatically shown when mousing over the function name. The full ts() expression is also shown in each preview window for reference.

![Functions](images/functions.png)

## Final Thoughts

The order of evaluation is left to right (i.e. metrics, then filters, then functions). Wildcard matching is supported for metrics, sources, and tags as with the query language. You can remove any link in the expression chain by clicking on the X icon of that link. Removing a link in the chain removes only that link. The rest of your expression remains intact.

{% include links.html %}