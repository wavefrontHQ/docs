---
title: Creating a Chart
keywords: getting started
tags: [getting_started, charts]
sidebar: doc_sidebar
permalink: charts_creating.html
summary: This topic describes how to create Wavefront charts. 
---

One of the first tasks a new Wavefront user wants to perform is data visualization.  Wavefront makes chart creation an easy process. You can access the chart creation feature from several parts of the application. This topic focuses on most straightforward method. For background on chart properties, see [Wavefront Charts](charts).

## Creating a Chart

To create a chart, select **Dashboards > Create Chart**.
 
## Constructing Queries

To start visualizing data, you use [Wavefront Query Language](query_language_getting_started) to construct a ts() expression. Wavefront provides two methods for creating a ts() expression: Query Builder and manual construction.

### Using Query Builder to Construct a Query
The Wavefront Query Builder is a great starting option for users new to Wavefront because it doesn't require any knowledge of the basic syntax of a ts() expression. The Query Builder constructs a ts() expression based on a set of ts() expression components (metric name, source|sourceTag|pointTag filters, advanced functions) that you specify. In the image below, we specified the metric name "~sample.requests.total.num", point tag "az=us-west-1", and a 10-minute moving average function in order to create the following query and chart: mavg(10m, ts(~sample.requests.total.num, az="us-west-1")). For details, see [Query Builder](query_language_query_builder).

![query_builder_2](images/query_builder_2.png)

### Manually Constructing a Query
If you are a more experienced user and/or are familiar with the basic syntax of Wavefront Query Language, you can enter the complete ts() expression (including syntax) into the query field. There are additional functions and operators that can only be used when entering a complete ts() query into the query field. For example: if((ts("requests.latency", tag="az-3" and not source="app-28") as test) > 160, $test, 0).
query field free form.png
![query_field_free_form](images/query_field_free_form.png)

## Adding Queries to the Chart
To associate more than 1 ts() expression with your chart, add a new query field by clicking the add icon <i class="fa fa-plus"></i> to the right of a query field.

![add_query](images/add_query.png)

The remove icon <i class="fa fa-minus"></i> removes the selected query field, and the clone icon <i class="fa fa-files-o"></i> clones the selected query into a new query field.
 
You also have the option of naming each query field. Naming each query field is recommended when you are using a legend (hover or fixed) for a chart with several query fields. To rename a query field, click the name to the left of the query field and enter a name. The query field name can be up to 50 characters and there's no restriction on characters you can use.

![rename_query_field](images/rename_query_field.png)

You can experiment with functions such as sum(), highpass(), mavg(), etc. See [Wavefront Query Language Quick Reference](query_language_reference) for a complete list of functions.
 
## Configuring the Chart
You also have the option to charts in several different ways. The chart configuration options are in the Chart section:

![chart_section](images/chart_section.png)

The configuration tabs (General, Axis, Style, etc.) and options depend on the [chart type](charts) you choose. One configuration option available for each Chart Type is the Name:

![chart_name_field](images/chart_name_field.png)

The name you enter into this field appears in the top right corner of the chart:

![chart_name_corner](images/chart_name_corner.png)

The Wavefront UI uses SI and IEC/Binary notations to represent metric values on charts. For further information, see [Units in Chart Axes and Legends](charts_units). In the chart below, the values you see (5M , 10M, 15M) etc are mega (M) values (ex: 5 M = 5 * 1000^2 = 5000000).

![SI_notation](images/SI_notation.png)

## Saving a Chart
Once you have created and configured a chart, scroll down to the Save To section.  You can save the chart to an existing dashboard by entering the existing dashboard name and clicking the **Insert** button or you can save the chart to a new dashboard by clicking the **New Dashboard** button.

![save_chart](images/save_chart.png)

You can revisit the chart by clicking the chart name on the right hand upper corner of the chart.

![open_chart](images/open_chart.png)

{% include links.html %}
