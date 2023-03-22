---
title: Derived Metrics
keywords: queries
tags: [query language]
sidebar: doc_sidebar
permalink: derived_metrics.html
summary: Learn how to save a query so it runs once a minute, and how to use the derived metric elsewhere.
---

Use derived metrics to run a query and ingest it back into VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront). All users can then use the result of the query, that is, the derived metric, in their queries.

You can create a derived metric from a time series metric or a histogram.


<div markdown="span" class="alert alert-info">You must have the [**Derived Metrics** permission](permissions_overview.html) to create and manage derived metrics.</div>

Derived metrics created and metrics points scanned apply to your data ingestion and data scan rates.

{{site.data.alerts.note}}
  <ul>
    <li>
      The minimum reporting interval for a derived metric is 1 minute. If the query that is used in the derived metric reports data points more than once within a minute, Operations for Applications summarizes it using the <code>mean()</code> aggregation and aligns it to 1 minute time buckets.
    </li>
    <li>
      <a href="metrics_managing.html#obsolete-metrics">Obsolete metrics</a> are removed from derived metrics.
    </li>
  </ul>
{{site.data.alerts.end}}

## Use Cases

Our customers wanted to register and ingest a query so they can have instantly available metrics (derived metrics). Here are some use cases.

### Simplify User Experience

Many queries are complex and intimidating for non-expert users. If you create a derived metric, the corresponding query runs in the background. All users can then use the result of the complex query -- the derived metric -- in other queries.

The screenshot below shows how you can create a derived metric from a complex query. This query tracks employees who are required to perform onboarding. You use `aliasMetric` and can call the metric by that metric name in a new query. In this example, we can use `employee-onboarding-time-left` the next time we need the result of the query.

![registered query](images/registered_query.png)

Other examples might include:
* Creating new metrics from `ts()` expressions or `hs()` expressions that do transformations such as collapsing multiple series into one, retagging series using `taggify()`, or doing joins to create new synthetic series.
* Creating new metrics from `ts()` expressions or `hs()` expressions that do complex filtering of data using joins and other techniques.

### Performance Improvements

Improve performance by pre-processing expensive queries and saving the results as a new metric. Expensive might mean a large volume of data is accessed, many calculations are done, many metrics are use, and so on. Derived metrics are especially useful if the query result is needed by several other queries or even by several users. The expensive operation is performed once a minute (or less frequently) and the new derived metric is accessible.

#### Example 1: Idle CPU

The following example shows how you can save a metric that sums all `telegraph.cpu.usage.idle` metrics with status `dev` as the metric `doctest.cpu_sum`.

![registered query simple](images/registered_query_simple.png)

The example uses `aliasSource` to ensure that you don't mix up a synthetic metric with the original source.

#### Example 2: Report Points

Suppose you have the following query:

`mavg(60d,sum(rate(dataingester.report-points)))`

You create a derived metric that outputs `saved.dataingester.report-points`. The next time you need the report points information, you query `ts(saved.dataingester.report-points)` and you get instant results. The server does not have to compute the `rawsum`, `rate`, and 60-day moving average.

You can reduce the data scan rate in a similar way using derived metrics.

## Derived Metrics Basics

You can customize how often the derived metric executes, and how many minutes of results we include.

* **Execute the query every N minutes**: By default, Operations for Applications executes the derived metric query every 1 minute. Use this setting to adjust the execution interval.

* **Include results in the last N minutes**: By default, Operations for Applications uses the last 5 minutes as the time window for the derived metrics query to account for possible delays in the upstream metric pipeline. The results of the query:
  - Are ingested back into Operations for Applications,
  - Overwrite existing data in the last N minutes for the derived metric. You can adjust the time window of the query with this setting.

{% include note.html content="We recommend that the **Includes...** setting is always larger than the **Execute** setting." %}

## Creating and Managing Derived Metrics

To create a derived metric:

1. Select **Browse > Derived Metrics**.
2. Click **Create Derived Metric**.
3. Specify the query.
   * You can specify a `ts()` query or an `hs()` query.
   * Include an `aliasMetric` -- you use that name for the derived metric.
4. If you want, change the times for results inclusion and for query execution. If your environment has queueing problems, increase the results inclusion time.

{% include note.html content="An error results if you attempt to ingest a metric into itself. Use `aliasMetric` or `aliasSource` to have a different name for the metric (and optional source)." %}

## Learn More

See the KB article [Migrating Objects or Data Between Environments](https://help.wavefront.com/hc/en-us/articles/360053164791-Migrating-Objects-or-Data-Between-Tanzu-Observability-Environments) if your company has several Operations for Applications service instances.
