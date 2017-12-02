---
title: Creating a Chart
keywords: getting started
tags: [charts]
sidebar: doc_sidebar
permalink: charts_creating.html
summary: Learn how to create a Wavefront chart and save it to a dashboard.
---
One of the first tasks a new Wavefront user wants to perform is data visualization.  Wavefront makes chart creation an easy process. You can create charts from several places in the application. This topic explains how to create a chart using **Dashboards > Create Chart**.

{% include shared/badge.html content="You must have [Dashboard Management permission](permissions_overview.html) to [save a chart to a dashboard](#save). If you do not have permission, UI menu selections and buttons required to perform the task are not visible." %}

## Creating a Chart

To create a chart:
1. Select **Dashboards > Create Chart**.
2. Add one or more Wavefront Query Language queries in the Queries section of the chart.

Every chart starts out with one query field named New Query.

## Constructing Queries

Wavefront supports several methods for constructing query language queries:
* Query Builder
* Query Wizard
* Manual construction.

### Using Query Builder to Construct a Query

[Wavefront Query Builder](query_language_query_builder.html) is a great option for users new to Wavefront because you don't have to know the query language syntax. Query Builder constructs a query based on a set of components (metric name, source, source tag, and point tag filters, advanced functions) that you specify.

In the image below, we specified the metric name `~sample.requests.total.num`, point tag `az=us-west-1`, and a 10-minute moving average function in order to create the following query and chart: `mavg(10m, ts(~sample.requests.total.num, az="us-west-1"))`.

![query_builder_2](images/query_builder_2.png)

### Manually Constructing a Query

If you are familiar with [Wavefront Query Language](query_language_getting_started.html), you can enter the complete expression into the query field. For example: `if((ts("requests.latency", tag="az-3" and not source="app-28") as test) > 160, $test, 0)`.

## Adding Queries to a Chart
To associate more than one query with a chart, add a new query field by clicking the add icon <i class="fa fa-plus"/> to the right of a query field.

![add_query](images/add_query.png)

The remove icon <i class="fa fa-minus"/> removes a query field, and the clone icon <i class="fa fa-files-o"/> clones a query into a new query field.

You can name each query field. Cloning is recommended when you are using a [legend](charts.html#legend) for a chart with several query fields. To rename a query field, click the name to the left of the query field and enter a name. The query field name can be up to 50 characters and there's no restriction on characters you can use.

![rename_query_field](images/rename_query_field.png)

You can experiment with functions such as `sum()`, `highpass()`, `mavg()`, etc. See [Wavefront Query Language Quick Reference](query_language_reference.html) for a complete list of functions.

## Configuring the Chart
You can customize your charts to suit your needs precisely. The chart [configuration options](charts.html) are in the Chart section:

![chart_section](images/chart_section.png)

The configuration tabs (General, Axis, Style, etc.) and options depend on the chart type you choose.

The chart name appears in the top right corner of the chart:

![chart_name_corner](images/chart_name_corner.png)

The Wavefront UI uses SI and IEC/Binary notations to represent metric values on charts. See [Units in Chart Axes and Legends](charts_customizing.html#units_in_chart_axes_and_legends). In the chart below, the values you see (5M , 10M, 15M) etc are mega (M) values (ex: 5 M = 5 * 1000^2 = 5000000).

![SI_notation](images/SI_notation.png)

<a name="save"></a>

## Saving a Chart to a Dashboard
To save a chart, scroll down to the Save To section.
* To the chart to an existing dashboard, enter a dashboard name and click the **Insert** button.
* To save the chart to a new dashboard, click the **New Dashboard** button.

![save_chart](images/save_chart.png)

When the chart is in a dashboard, you can open the chart by clicking the chart name in the upper right of the chart.

![open_chart](images/open_chart.png)
