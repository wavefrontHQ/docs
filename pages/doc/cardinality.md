---
title: Cardinality and Wavefront
keywords: getting started
tags: [getting started, cardinality, videos]
sidebar: doc_sidebar
permalink: cardinality.html
summary: Learn about how Wavefront deals with cardinality.
---
Wavefront supports high cardinality when dealing with timeseries data and infinite cardinality in its distributed tracing offering. However, high cardinality can cause a system slowdown and metrics retrieval issues. 


## What Is Data Cardinality?

Data cardinality is the number of values in a set. For example, in a database, data cardinality is the number of distinct values in a table column, relative to the number of rows in the table. The more distinct values that you have, the higher cardinality is. In monitoring, data cardinality refers to the number of series in a timeseries.

Generally, timeseries data in a simple form is labeled as a name, value, and timestamp. For example,  

`cpu.usage.user 24 1529590428`

In Wavefront, we enhance the data with tags and indexes, so that it has more context. For example, 

`cpu.usage.user 24 1529590428 source=mysystem service=auth env=prod`

Containerized environments typically also include the container ID and pod name: 

`cpu.usage.user 24 1529590428 source=mysystem service=auth env=prod containerid=6af39d33 podname=auth-coreapp-6m984d`

## Timeseries Data Cardinality on Containers

Containerized environments are dynamic, ephemeral, and rapidly scaling. In containerized environments, the container IDs often change, which may cause high cardinality in the system. To add additional context on the deployments, a point tag is usually  also added. Thus, the number of unique combinations of point tags might increase exponentially.

Point tags are important for several reasons:

* They contain and provide important context and reduce the mean time to resolution.
* They solve use cases at query time.
* If an outage happens, metrics must be analyzed iteratively across many permutations.
* Fewer point tags might limit the ability to query metrics in meaningful ways.

For more information about point tags, see [Fine Tune Queries with Point Tags](query_language_point_tags.html).

## Timeseries Data Cardinality

Almost all timeseries databases are key-value systems and each unique combination of metric and point tags requires an index entry. When the number of index entries increases, the ingestion and query performance suffer because the read and write operations require scanning larger spaces. 

When you deploy a large system, there’s a rapid burst of new index entries, which can lead to high cardinality issues, such as slowdown or unresponsiveness of the monitoring system.


## Wavefront and High Cardinality


Wavefront supports high cardinality for time series data, because the data is very easily manipulated and easily retrieved. If you have data points, which appear once or twice in the system, the database no longer stores this data as timeseries information. In such a case, or if you want to look into individual data points, for example single user requests, you should use the distributed tracing offering which allows you to drill down into such data. For more information, watch the following video, in which the Wavefront co-founder Clement Pang explains cardinality.

<a href="https://youtu.be/8wKPkrIiXKw" target="_blank"><img src="/images/v_cardinality.png" style="width: 700px;" alt="about cardinality"/></a>

Wavefront usually deals gracefully with high cardinality, because it has the following features:

**Applies top-down and bottom-up indexes**

Top-down indexes are the so-called metric source tags. In Wavefront, instead of just using the metric name as the primary key, the source is also considered a first-class citizen and is part of the primary metric host tag index. This improves the Wavefront performance and retrievability of data.

A second tag value index allows for queries filtered by tag values to retain high performance. The combination of 2 primary indexes (metric and source) for timeseries data allows for greater cardinality with no impact on the data ingestion or query performance.

**Keeps the most recent indexes**

In Wavefront, indexes that deal with current data are kept in fast memory. Wavefront moves the indexes that have not received new data for 4 weeks to older storage. Containerized environments benefit especially from this because of the ephemeral nature of the generated indexes.

**Uses correlated tagging**

Some metrics always have the same combination of tag keys and values. Data ingestion heuristics can spot when the same combination of tags is routinely indexed. Wavefront correlates tags and optimizes index creation and usage to increase the performance for metrics with the same combination of tags.

**Uses a dynamic query planner**

Most queries are similar and run repeatedly, iteratively, and streaming. For example, queries such as `*.system.cpu.*, env=prod` would damage many systems when fetching proper indexes.

Wavefront uses a dynamic query planner in the backend which:

* Breaks down a complex search into simple sub-searches.
* Solves each sub-search once and store the results.

The dynamic query planner allows for greater query performance at a cost of more storage and works with metric, host, and tag values.

**Uses FoundationDB as an underlying database**

FoundationDB provides amazing performance on commodity hardware. It is an open-source database that allows you to support very heavy loads.
