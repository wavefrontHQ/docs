---
title: apdex Function
keywords: data, distributed tracing, apdex
tags: [tracing]
sidebar: doc_sidebar
permalink: hs_apdex_function.html
summary: Learn how to use the apdex() function.
---

The Apdex score helps you understand how the response time of a service compares to the predefined response time threshold. See [Configure Apdex Settings](tracing_apdex.html) for details.
You can query data, create charts, and create alerts using the `apdex()` function.

Use the basic or advanced query format.

* Basic apdex() queries are simple to use and don't require `hs()` (histograms query) knowledge. These queries give you results for a specific application and service.
* Advanced apdex() queries let you specify advanced `hs()` queries. You can also query Apdex data for more than one application or service.

## Summary

* **Basic Query**

  ```
  apdex([T, | T, 4T,] application=<application_name>, service=<service_name>)
  ```

* **Advanced Query**

  ```
  apdex([T, | T, 4T,] <histogram_series>)
  apdex(application=<application_name>, service=<service_name>, <histogram_series>)
  ```

## Parameters

<table style="width: 100;">
  <tr>
    <th width="25%">
      Parameter
    </th>
    <th width="74%">
      Description
    </th>
  </tr>
  <tr>
    <td markdown="span">
      `application_name`
    </td>
    <td markdown="span">
      Name of the application you want to see data for.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `service_name`
    </td>
    <td markdown="span">
      Name of the service you want to see data for.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `T`
    </td>
    <td>
      Satisfied threshold.
      <ul>
        <li>
          If you don't specify the value, it uses the value you define under <a href="tracing_apdex.html#configure-the-threshold-t-value">Application Configurations</a> or the default value of 100 microseconds.
        </li>
        <li>
          If you specify the value, it overrides the value you define under Application Configurations. The values are in microseconds. For example, if you enter 200, it indicates 200 microseconds.
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `4T`
    </td>
    <td>
      Tolerating threshold. If you don't specify the value, it uses T*4.
      {{site.data.alerts.note}}
        We don't save the value you define for the tolerating threshold (4T).
      {{site.data.alerts.end}}
      The values are in microseconds. For example, if you enter 800, it indicates 800 microseconds.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `histogram_series`
    </td>
    <td markdown="span">
      An advanced `hs()` query. See [Histogram to Histogram Functions](query_language_reference.html#histogram-to-histogram-functions).
    </td>
  </tr>
</table>

## Description

You can use the basic or advanced `apdex()` function to query the Apdex score. VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) derives the Apdex score for each service. Therefore, you must specify the service you want to get the Apdex data.

The **basic queries** use `hs(tracing.aggregated.derived.*.duration.micros.m)` as the underlying query to get the Apdex scores. See [Aggregated RED Metrics](trace_data_details.html#aggregated-red-metrics). Basic queries only give you the Apdex score for a given service. Therefore, you need to specify the application and service filters.

The **advanced queries** let you customize the `hs()` functions. You can get the Apdex score for more than one application using the advanced queries. Therefore, you can create alerts to find out when the Apdex score of the services in an application are below a [specific range](tracing_apdex.html#interpreting-the-apdex-score).

{% include note.html content="The thresholds (T and 4T) used to compute the apdex score are in microseconds. Therefore, you need to make sure that your histogram data is in microseconds.

<br/><br/>If histogram data is in milliseconds, you need to add the threshold value to the apdex function and divide the threshold value by 1000 to ensure that the threshold value is in milliseconds too. <br/>Example: <code>apdex( T/1000, 	&lt;histogram_series_in_milliseconds&gt;)</code>" %}

## Examples
Here's how you can use these queries:

 * Use a basic query to get the Apdex score of the `beachshirts` application's `shopping` service over time.
    ```
    apdex(application=beachshirts, service=shopping)
    ```
    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_basic_query.png)

* Use an advanced query to return the Apdex score of all the services that send data to Operations for Applications every 30 minutes.
    <pre>
apdex(align(30m, merge(hs(tracing.aggregated.derived.*.duration.micros.m), application, service)))
    </pre>
    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_advanced_query_30_minute_bucket.png)

* Use an advanced query to get the Apdex score of the `beachshirts` application's `shopping` service for the given time window (1vw). Let's use a gauge chart.
    <pre>
apdex(align(1vw, merge(hs(tracing.aggregated.derived.*.m, application=beachshirts, service=delivery))))
    </pre>

    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_advanced_guage_chart.png)

    Operations for Applications rounds the Apdex score to 2 decimal points so that it is easy for you to [interpret the score](tracing_apdex.html#interpreting-the-apdex-score). You need to update the gauge chart settings to get the color to value mapping and round the value to 2 decimal points.

    ![The screenshot shows how you need to configure the format tab of the gauge chart. You need se the decimal points to 2, set the min as 0 and max as 1, and then define the colors for the Apdex range.](images/tracing_apdex_advanced_gauge_cahrt_format_tab.png)


## See Also

* Get an overview of how the Apdex score is calculated and [Configure Apdex Settings](tracing_apdex.html).
* Use [apdexLatency()](hs_apdex_latency_function.html) to query the satisfied threshold (T) and toleration threshold (4T) of a service.
