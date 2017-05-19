---
title: Getting Started with Wavefront Query Language
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_language_getting_started.html
summary: Learn how to get started with Wavefront Query Language.
---
One of Wavefront's key advantages is its Wavefront Query Language which has been designed especially for time series data. Time series data is unique in several ways, and requires a query language that can accommodate the periodicity, potential irregularity, and streaming nature of the data.

## Basic Query
 
If you are new to Wavefront, the simplest and most commonly used type of query is to retrieve an individual metric: `ts(<metricName>)`. For example, you might want to measure the time spent in the CPU idle task&mdash;`cpu.idle`&mdash;across all sources. For this example you enter the following expression `ts(cpu.idle)` into a query field to produce the chart below:

![base query](images/base_query.png)


## Filtering by Source

Notice that there many lines displayed, particularly below 8M. One option is to filter by sources using the optional `source=<sourceName>` parameter: `ts(<metricName>, source=<sourceName>)`. If we introduce a `source="m*"` filter to show all sources that start with "m", the number of lines is reduced and the Y-axis scale changes from 30M to 5M:

![filtered query](images/filtered.png)

## Applying Aggregation Functions

For further exploration you could try one of the aggregation functions.  You could choose to show the average value of all the `cpu.idle` metric across all sources, using `avg()`.  Or, you could use `sum()` to get a total of all of the sources starting with "m". Aggregate functions are the second most commonly seen query after the simple `ts(<metricName>, source=<sourceName>)` query.  Here's the chart adding `sum()`:

![summed query](images/summed.png)

## Applying Mathematical Functions

Notice how we can see that the sum of `cpu.idle` is slowly increasing over time.  To increase your proficiency in the the language and to learn the power of the other functions, it's recommended that you take a metric example and experiment with the different functions. For instance, `sum(ts(cpu.idle))` metric represents a counter metric, or a metric that continuously increases over time. While counter metrics can provide a snapshot of a current count, they do not provide information such as the rate of change. The query language has a `deriv()` function that transforms a counter to show you the rate of change per second: `deriv(sum(ts(cpu.idle))`.

![summed rate query](images/deriv_sum.png)

## Next Steps

Wavefront documentation contains a wealth of tutorials, reference, and guides on the query language.

For more query language tutorial examples, see the Getting Started with Wavefront Query Language [getting started dashboard](dashboards_getting_started.html#tutorials) and the tutorial [Tutorial: Getting Started](tutorial_getting_started.html).

Once you have experimented with simple use cases, the best way to get acquainted with the query language is to review [Wavefront Query Language Quick Reference](query_language_reference.html). The language reference gives an overview of all the different types of functions that can be used in a query. 

For in-depth discussions and examples, see some of the [advanced function guides](label_query%20language.html).
