---
title: Charts FAQ
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
permalink: ui_charts_faq.html
summary: Learn chart customization from the experts.
---
VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) includes a variety of charts, with many customization options. [Create and Customize Charts](ui_charts.html) describes most of the things you need to know to get started. This page has some special tips and tricks to help you create the user experience you're after.

{% include note.html content="You must have [Dashboard permission](permissions_overview.html) to save a chart to a dashboard. If you do not have permission, the UI menu selections and buttons required to perform the task are not visible." %}

<!--- Consider including Improve Display Speed with Sampling Option here --->

## How Do I Set Up Color Mapping?

Color mapping is a powerful way to get users' attention when there's a problem. We support color mapping for the following charts:
* Single stat
* Gauge
* Topk
* Node map

The following example shows how to use color mapping with a single stat chart.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>On the <strong>Data</strong> tab, specify the metrics to monitor and give a subtitle. </li>
<li>On the Sparkline tab:</li>
<ol><li>Select whether to apply the color to the Text or the Background and change <strong>Show Sparkline</strong> to <strong>No Line</strong> if you want a solid color chart. </li>
<li>Click the <strong>+</strong> icon next to <strong>Color to Value Mapping</strong> and change the values and colors to fit your use case. In the example on the right, we show red for values under 65, yellow for values under 80, and green for values over 80. </li>
<li>Save your chart. </li></ol>
</ol></td>
<td width="50%"><img src="/images/color_mapping_faq.png" alt="create a dashboard and change values and colors"></td>
</tr>
</tbody>
</table>

## How Do I Set Up Thresholds for Histograms and Heat Map Charts?

[Histograms](ui_chart_reference.html#histogram-chart) let you compute, store, and use distributions of metrics rather than single metrics. [Heat map charts](ui_chart_reference.html#heat-map-chart) add another dimension to the information about histograms that you see in a histogram chart.

You can apply threshold markers for the data represented by histogram and heat map charts. The markers that you provide can be either a constant value or a variable that is defined by a query expression. The following examples show how to set up thresholds for a histogram chart.

1. On the **Data** tab, specify the metrics to monitor. For example:

    ```
    merge(hs(tracing.aggregated.derived.*.duration.micros.m, ${aggregated_filters}))
    ```

2. On the **Format** tab select the color gradient, specify the percentile markers, and click **Add Threshold**. You can do one of the following, or both:

  * Enter a constant value as a threshold, for example `100us`.

![A histogram example with a threshold defined by a constant value](images/histogram_value_threshold.png)

  * Enter a query expression as a threshold. The query must be in [Wavefront Query Language](query_language_reference.html). For example, you can enter the following queries as thresholds:

    ```
    apdexLatency(application=${application}, service=${service}, satisfied)
    ```

    ```
    apdexLatency(application=${application}, service=${service}, tolerating)
    ```

    {% include note.html content ="You must make sure that the query that you enter returns a single stat series and that the query output can be captured as a threshold value."%}

![A histogram example with thresholds defined by query expressions](images/histogram_query_threshold.png)


## How Do Drilldown Links Work?

A drilldown link sends users to a target dashboard when they click on a chart.

* Drilldown on click is available for the following chart types:
  - Single stat
  - Topk
  - Node map
* For all other chart types, drilldown is available from the ellipsis menu in the top right.
![drilldown example by selecting an option from the ellipsis menu](images/drilldown_ellipsis.png)

### Simple Drilldown

In most cases, you want to send users from a chart to another dashboard or a dashboard section.
1. Open the chart for edit and click the **Drilldown Link** tab.
2. Start typing the name of the target dashboard and select from the options.
3. (Optional) Select a target dashboard section and save the chart.
   ![simple drilldown to send users from a chart to another dashboard section](images/simple_drilldown.png)

### Drilldown Using Local Settings


You can optionally pass along a constant, point tag value, or other value to be used in the target dashboard. Here's an example:

Suppose your users monitor 2 dashboards:
* Dashboard 1 consists of a set of single stat charts that monitor important values and change color as critical thresholds are crossed for an availability zone. Each chart is for one availability zone only. Each chart sets the `az` point tag to show only the value for that zone, for example:

  ![query for drilldown](images/drilldown_0.png)

* Dashboard 2 allows users to get details about the different availability zones. A variable (Availability Zone) is defined for that dashboard, and users can select a value for that variable.

{% include note.html content ="For this use case, a variable value that matches the point tag value must exist in dashboard 2. However, the point tag name and the variable name do not have to match."%}

You can set this up as follows:
1. Inside dashboard 1, define a drilldown link for each single stat chart that:
  - Goes to dashboard 2 when the user clicks one of the single-stat charts.
  - Passes the value of the `az` point tag in as the value of the `az` variable.
  ![drilldown definition](images/drilldown_1.png)
2. When a user sees a critical value on a chart and clicks on that chart in dashboard 1, the user is redirected to dashboard 2, and the variable is preset to show the environment that has the problem.
  ![drilldown target](images/drilldown_2.png)


## Why Doesn't the Outer Ring of My Gauge Change?

If you specify color mappings for a gauge chart, the inner ring of the chart will show the current value, and the color of that inner ring depends on the color mapping thresholds.

An additional outer ring shows how the colors map to the values 1-100 by default, even if the color mapping numbers are larger than 100. To specify where you want for the outer ring to start, specify a `Min` and `Max` value.

## What Does the Summarization Option Do?

If the screen real estate dedicated to a particular chart cannot accommodate all raw data points in the current chart time window, the rendering engine uses the summarization option to aggregate raw data points into displayable values.

When displaying metrics:

1. We first determine the [chart resolution](ui_charts.html#chart-resolution) and establishes an appropriate time interval as the chart's bucket size.
2. We then aggregate (combines) the raw data values that are reported within each such time interval (bucket) and produces a single value to display for each bucket. The chosen summarization option determines how the aggregation is performed.

   - **Average** - Displays the average (mean) of the raw data values in each bucket.
   - **Median** - Displays the median of the raw data values in each bucket.
   - **Min** - Displays the minimum raw data value in each bucket.
   - **Max** - Displays the maximum raw data value in each bucket.
   - **Count** - Displays the number of raw data values in each bucket.
   - **Sum** - Displays the sum of the raw data values in each bucket.
   - **First** - Displays the first raw data value to be reported in each bucket.
   - **Last** - Displays the last raw data value to be reported in each bucket.

Consider the following example. The horizontal scale for your chart is `240 point buckets across, 1 bucket – 30 sec (est)`. If you choose **Median**, the query engine aggregates the raw data values reported in each 30-second interval and displays the median value as the data point for that bucket.

When you [fine-tune the time window](ui_examine_data.html#fine-tune-the-time-window), we dynamically recalculate and update the chart bucket size and the summarized values. You can zoom in the chart time window as much as needed to display the raw data points without any bucketing or summarization.

{% include note.html content="The summarization option applies only to the chart visualization (what you see). The summarization option does not apply to the chart queries or functions." %}

{% include tip.html content="Choose the most appropriate summarization option for your chart query. If you select a summarization option which doesn’t correspond to your query function, most probably you’ll see misleading results.

For example, if your chart query uses the `mmax()` function, select the **Max** summarization option." %}

For the chart legend, you can choose whether to report raw or summarized values by disabling or enabling the **Non-summarized Stats** option.

## Learn More!

* Get the details about each chart type from the [Chart Reference](ui_chart_reference.html).
* Send [a link of a dashboard](ui_sharing.html) to a coworker (or to the customer success team if you need help).
* [Embed a chart](ui_sharing.html#embed-a-chart-in-other-uis) in another product or website.
