---
title: Derived Metrics
keywords: queries
tags: [query language]
sidebar: doc_sidebar
permalink: derived_metrics.html
summary: Learn how to save a query so it runs once a minute, and how to use the derived metric elsewhere.
---

The derived metrics functionality allows you to run a query and ingest it back into Wavefront. All users can then use the result of the query, that is, the derived metric, in their queries.

<div markdown="span" class="alert alert-info">While every Wavefront user can view derived metrics, you must have [Derived Metrics Management permissions](permissions_overview.html) to create and manage derived metrics.
If you don't have the permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible, however, you can still view and use the derived metrics. </div>


## Use Cases

Our customers have asked us to be able to register and ingest a query so they can have instantly available metrics (derived metrics). Here are some use cases.

### Simplify User Experience

Many queries are complex and intimidating for non-expert users. If you create a derived metric, the corresponding query runs in the background. All users can then use the result of the complex query -- the derived metric -- in other queries.

The screenshot below shows how you can create a derived metric from a complex query. You use `aliasMetric` and can call the metric by that metric name in a new query. In this example, we can use `test.billing.metric` the next time we need the result of the query.

![registered query](images/registered_query.png)

Other examples might include:
* Creating new metrics from `ts()` expressions that do transformations such as collapsing multiple series into one, retagging series using `taggify()`, or doing joins to create new synthetic series.
* Creating new metrics from `ts()` expressions that do complex filtering of data using joins and other techniques.

### Performance Improvements

Improve performance by pre-processing expensive queries and saving the results as a new metric. Expensive might mean a large volume of data is accessed, many calculations are done, many metrics are use, and so on. Derived are especially useful if the query result is needed by several other queries or even by several users. The expensive operation is performed once a minute (or less frequently) and the new derived metric is accessible.

#### Example 1: Idle CPU

The following example shows how you can save a metric that sums all `telegraph.cpu.usage.idle` metrics with status `dev` as the metric `doctest.cpu_sum`.

![registered query simple](images/registered_query_simple.png)

The example uses `aliasSource` to ensure that you don't mix up a synthetic metric with the original source.

#### Example 1: Report Points

Suppose you have the following query:

`mavg(60d,sum(rate(dataingester.report-points)))`

You create a derived metric that outputs `saved.dataingester.report-points`. The next time you need the report points information, you query `ts(saved.dataingester.report-points)` and you get instant results. The server does not have to compute the `rawsum`, `rate`, and 60-day moving average.

You can reduce data scan rate in a similar way using derived metrics.

## Some Basics

Derived metrics are saved like alerts. After you save a derived metric, Wavefront executes it every 1 minute (by default), just as we check alerts approximately every 1 minute by default.

By default, we include the last 5 minutes of results to protect against data loss. The query overwrites the existing data with exactly the same data. You can change how many results you want to include.

Wavefront charges for derived metrics on a per-pps basis.

## Creating and Managing Derived Metrics

To create a derived metric:

1. Select **Browse > Derived Metrics**.
2. Click **Create Derived Metric**.
3. Specify the query and make sure you include an `aliasMetric` -- you later use that name for the derived metric.
4. If you want, change the times for results inclusion and for query execution. If your environment might have queueing problems, increase the results inclusion time.

**Note:** An error results if you attempt to ingest a metric into itself. Use `aliasMetric` or `aliasSource` to have a different name for the metric (and optional source).
