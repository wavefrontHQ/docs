---
title: Registered Queries
keywords: queries
tags: [query language]
sidebar: doc_sidebar
permalink: registered_queries.html
summary: Learn how to ingest queries by making them registered queries.
---

The registered query functionality allows you to run a query and ingest it back into Wavefront.

<div markdown="span" class="alert alert-info">While every Wavefront user can view registered queries, you must have [Registered Query Management permissions](permissions_overview.html) to manage registered queries.
If you don't have the permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>


## Use Cases

Our customers have asked us to be able to register and ingest a query. Here are some use cases:

### Complex Queries

Many queries are complex and intimidating for non-expert users. Registered queries allow you to simplify the query. When you register the query, other users only have to run the registered query.

The screenshot below shows how we created a registered query from a very complex query. We use `aliasMetric` so we can call the registered query by that name.  The next time we need the result of the query, we can just use `ts(test.billing.metric)`

![registered query](images/registered_query.png)

### Performance Improvements

Registered queries make it possible to run a complicated query once and save the results. All dashboards can then look at that result instead of computing the query live, which saves on resources.

For example, suppose you have the following query:

`mavg(60d,sum(rate(dataingester.report-points)))`

You create a registered query for that, which outputs `saved.dataingester.report-points`. The next time you need the report points information, you query `ts(saved.dataingester.report-points)` and you get instant results. The server does not have to compute the `rawsum`, `rate`, and 60-day moving average.

## Some Basics

Registered queries are saved like alerts. After you save a registered query, we execute it every 1 minute (by default), just as we check alerts every 1 minute by default.

By default, we include the last 5 minutes of results to protect against data loss. The query overwrites the existing data with exactly the same data.

Wavefront charges for registered queries on a per-pps basis.

## Creating and Managing Registered Queries

To create a registered query:

1. Select **Browse > Registered Queries**.
2. Click **Create Registered Query**.
3. Specify the query you want to register, and the name you want to use to call it later.
4. If you want, change the times for results inclusion and for query execution. If you environment might have queueing problems, increase the results inclusion time.

**Note:** An error results if you attempt to ingest a metric into itself. Use `aliasMetric` or `aliasSource` with a registered query so you have a different name for the metric (and optional source) defined in the registered query.
