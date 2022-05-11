---
title: High Cardinality Data
keywords: getting started
tags: [getting started, cardinality, videos]
sidebar: doc_sidebar
permalink: cardinality.html
summary: Learn about how the Wavefront service deals with cardinality.
---
Tanzu Observability by Wavefront supports high cardinality when dealing with timeseries data and infinite cardinality in its distributed tracing offering.  The Wavefront service can handle more than 200,000 concurrently running containers per Kubernetes cluster. In certain situations, however, high cardinality can cause system slowdown and metrics retrieval issues.

## What Is Data Cardinality?

Data cardinality is the number of values in a set. For example, in a database, data cardinality is the number of distinct values in a table column, relative to the number of rows in the table. The more distinct values that you have, the higher cardinality is. In monitoring, data cardinality refers to the number of series in a timeseries.

Generally, timeseries data in a simple form is labeled as a name, value, and timestamp. For example:

`cpu.usage.user.percentage <metricvalue> [<timestamp>]`

The [Wavefront Data Format](wavefront_data_format.html) also includes point tags. For example:

`cpu.usage.user.percentage <metricvalue> [<timestamp>] source="mysystem" [pointTags]`

Kubernetes environments typically also include the pod name. For example:

```
kubernetes.pod.cpu.usage_rate <metricvalue> [<timestamp>] source=ip-10-0-1-203.eu-west-1.compute.external
cluster="prod" label.k8s-app="kube-dns" namespace_name="kube-system" pod_name="<name-of-the-pod>"
```

## Timeseries Data Cardinality in Containerized Environments

Containerized environments are dynamic, ephemeral, and rapidly scaling. In containerized environments, the container IDs or pod names often change, which might cause high cardinality in the system. To add additional context on the deployments, a point tag is usually added. Thus, the number of unique combinations of point tags might increase exponentially.

Point tags are important for several reasons:

* They contain and provide important context and reduce the mean time to resolution.
* They solve use cases at query time.
* If an outage happens, metrics must be analyzed iteratively across many permutations.
* Fewer point tags might limit the ability to query metrics in meaningful ways.

For more information about point tags, see [Fine Tune Queries with Point Tags](query_language_point_tags.html).

## What Is Timeseries Data Cardinality?

Almost all timeseries databases are key-value systems and each unique combination of metric and point tags requires an index entry. When the number of index entries increases, the ingestion and query performance suffer because the read and write operations require scanning larger spaces.

When you deploy a large system, there’s a rapid burst of new index entries, which can lead to high cardinality issues, such as slowdown or unresponsiveness of the monitoring system.


## High Cardinality and the Wavefront Service


The Wavefront service usually deals gracefully with high cardinality because it has the following features:

**Applies top-down and bottom-up indexes**

Top-down indexes are the so-called metric source tags. Instead of just using the metric name as the primary key, the Wavefront service uses the source as part of the primary metric/host index. This improves performance and retrievability of data.

A second tag value index allows for queries filtered by tag values to retain high performance. The combination of 2 primary indexes (metric and source) for timeseries data allows for greater cardinality with no impact on the data ingestion or query performance.

**Keeps the most recent indexes**

The Wavefront service keeps indexes that deal with current data are kept in fast memory. Only indexes that have not received new data for 4 weeks are moved to older storage. Containerized environments benefit especially from this because of the ephemeral nature of the generated indexes.


**Uses correlated tagging**

Some metrics always have the same combination of tag keys and values. Data ingestion heuristics can spot when the same combination of tags is routinely indexed. The Wavefront service correlates tags and optimizes index creation and usage to increase the performance for metrics with the same combination of tags.

**Uses dynamic programming**
Most queries are similar and run repeatedly, iteratively, and streaming. For example, queries such as `*.system.cpu.*, env=prod` would damage many systems when fetching proper indexes.

The Wavefront service uses a dynamic programming in the backend which:

* Breaks down a complex search into simple sub-searches.
* Solves each sub-search once and store the results.

The dynamic programming allows for greater query performance at a cost of more storage and works with metric, host, and tag values.

**Uses FoundationDB as an underlying database**

FoundationDB provides excellent performance on commodity hardware. It is an open-source key-value store that allows you to support very heavy loads.

For more information, watch the following video, in which the Wavefront co-founder Clement Pang explains cardinality.

<a href="https://youtu.be/8wKPkrIiXKw" target="_blank"><img src="/images/v_cardinality.png" style="width: 700px;" alt="about cardinality"/></a>

## Optimizing High-Cardinality Data

Although the Wavefront service supports high cardinality for time series data, to avoid high cardinality issues, consider the following recommendations:

* Do not monitor individual event data points. If you want to monitor such data, use the distributed tracing offering. See [Distributed Tracing Overview](tracing_basics.html) and [Tracing Best Practices](tracing_best_practices.html).

* Follow best practices:

   1. Ensure that the metric names are stable and do not change.
   2. Keep source names stable. Source names change over time, but make sure that they don't change frequently.
   3. Use point tags for data that are ephemeral.
   4. In Kubernetes, where point tags are usually called labels, add only the point tags that you really need.

For information about metric, source, and point tag names, see [Wavefront Data Naming Best Practices](wavefront_data_format.html#wavefront-data-format-best-practices). You can also understand more about the metrics structure, sources and the sources browser, and tags, by exploring [Metrics and the Metrics Browser](metrics_managing.html), [Sources](sources_managing.html), and [Organizing with Tags](tags_overview.html).

<!--* If you run a query of the type `ts(<metricName>, source="<sourceName>")`, make sure that the number of data points returned is less than 1000. Although Wavefront can handle more, it is best to keep in mind that more data can cause high cardinality issues.-->

## Learn More!

* For more background and practical advice, see [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html).
* For query limits and similar information, see [Limits and Best Practices](wavefront_limits.html).
