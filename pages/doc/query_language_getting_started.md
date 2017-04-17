---
title: Getting Started with Wavefront Query Language
keywords: query language
tags: [query language, getting started]
sidebar: doc_sidebar
permalink: query_language_getting_started.html
summary: Learn how to get started with Wavefront Query Language.
---
One of the key advantages of Wavefront is our query language which has been designed especially for time series data.  Time series data is unique in several ways, and requires a query language that can accommodate the periodicity, potential irregularity, and streaming nature of the data.
 
If you are new to Wavefront, the simplest and most commonly used type of query is to chart an individual metric. For example, you might want to show CPU load across all sources.  The expression is `ts(metric.name, \[sourceFilter\])`.  The `sourceFilter` parameter is optional, and is used when you only want to see a select set of sources.  For this example you can enter the following ts() expression `ts("cpu.idle")` into a query field to produce the chart below:

![base query](images/base_query.png)

Notice that there are over 300 lines displayed, which can be difficult to read when changes occur.  In these cases it may make sense to use one of the `ts()` aggregation functions.  You could choose to show the average value of all the `cpu.idle metrics` across all sources, using `avg()`.  Or, you could use `sum()` to get a total of all of the sources together for this metric. Aggregate functions are the second most commonly seen query after the simple `ts(metric.name, \[sourceFilter\])` query type.  Here's the chart using `sum()`: `sum(ts("cpu.idle"))`.

![summed query](images/summed.png)

Notice how we can see that cpu.idle is slowly increasing over time.  To increase your proficiency in the the language and to learn the power of the other functions, it's recommended that you take a metric example and experiment with the different functions.  For instance, the `cpu.idle` metric represents a counter metric, or a metric that continuously increases over time. While counter metrics can provide a snapshot of the current count, it does not provide information such as the rate of change. Wavefront offers a function called `rate()` that transforms a counter in order to show you the rate of change per second:  `sum(rate(ts("cpu.idle"))`.

![summed rate query](images/summed_rate.png)

Once you have experimented with simple use cases, the best way to get acquainted with the query language is to review [Wavefront Query Language Quick Reference](query_language_reference). The language reference gives an overview of all the different types of functions which can be used in a query. Also, visit the [Talk to the Community](https://community.wavefront.com/community/answers) section and search [recipe](https://community.wavefront.com/community/answers/content?filterID=contentstatus%5Bpublished%5D~tag%5Brecipe%5D) in order to find more advanced use cases with the query language.

