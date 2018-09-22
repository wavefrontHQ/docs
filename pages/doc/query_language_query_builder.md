---
title: Query Builder
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_language_query_builder.html
summary: Learn how to create Wavefront Query Language expressions using Query Builder.
---
The Wavefront Query Builder is an easy-to-use interface that makes Wavefront accessible to all users in your organization. You can construct queries using Query Builder, Query Editor, or Query Wizard. Both Query Builder and Query Editor support autocomplete.
* Query Builder allows you to construct queries from building blocks. Query Builder supports most elements of the Wavefront Query Language. A few of the more advanced functions are only available in the Query Editor, so you can switch from Query Builder to Query Editor to use those functions. You cannot switch from Query Editor to Query Builder.
* Query Editor expect that you type the query using the elements of the query language.
* [Query Wizards](https://docs.wavefront.com/query_language_query_wizard.html) allows you to customize predefined recipes, for example, to create a Moving Average for a specified time duration, for your environment.

See [Wavefront Query Language Quick Reference](query_language_reference.html) for a complete reference.

## Toggling Query Builder User Preferences

Query Builder is enabled by default. You can toggle Query Builder settings in your [user preferences](users_account_managing.html#configuring-your-preferences).
* If **Enable Query Builder** and **Always Open the Query Builder** are both checked, then Query Builder always displays when you navigate to a blank chart or new alert.
* If **Always Open the Query Builder** is not checked, then the Query Editor displays by default. Query Builder displays only if you click the Query Builder toggle.

To switch from Query Builder to Query Editor, click the toggle.

![Query builder new](images/query_builder_new.png)

**Warning:** If you switch to Query Editor and make changes to the query there, you can't return to Query Builder.

## Constructing Queries

You use Query Builder to construct a query from its building blocks:
* A metric, constant, or other query.
* Zero or more filters (i.e. sources, source tags, and point tags). The metric determines which filters make sense.
* Zero or more functions for manipulating the output.

![Query builder](images/query_builder_04x.png)

As you construct a query, it displays below the query builder. The chart associated with the query updates as you add filters and use functions to manipulate the output.

![Query builder with chart](images/query_builder_showing_chart.png)

You can preview the result of each step in real-time before you make the change:
* For filters, click the bar chart icon at the end of each field (shown below).
* For functions, hover over the function to get documentation and a preview of the changed chart.

![Display query](images/display_query.png)

## Filters and Functions

Query Builder helps you construct your queries like this:
* You can `AND` and `OR` multiple elements together.
  Unlike manually constructed `ts()` queries, which allow mixed `AND`s and `OR`s, the Query Builder applies either `AND` or `OR`.
* The order of evaluation is left to right -- metrics, then filters, then functions.
* Wildcard matching is supported for metrics, sources, and tags.
* To remove any query element, click the X icon to the right of that element. The rest of your query remains intact.

![filter and](images/filter_and.png)
