---
title: apdex() and apdexLatency() Function
keywords: data, distributed tracing, apdex
tags: [tracing]
sidebar: doc_sidebar
permalink: apdex_function.html
summary: Learn how to use apdex() and apdexLatencies() functions.
---

## `apdex()` Function

The apdex score helps you understand how the response time of a service compares to the predefined response time threshold. See [Configure Apdex Settings](tracing_apdex.html) for details.
You can query data, create charts, and create alerts using the `apdex()` function.

Use the basic or advanced query format. 

* Basic apdex() queries are simple to use and don't require `hs()` (histograms query) knowledge. These queries give you results for a specific application and service. 
* Advanced apdex() queries let you specify advanced `hs()` queries. You can also query apdex data for more than one application or service.

### Summary

* **Basic querying**
  
  ```
  apdex(application=<application_name>, service=<service_name>)
  apdex(T, application=<application_name>, service=<service_name>)
  apdex(T, 4T, application=<application_name>, service=<service_name>)
  ```
  

* **Advanced querying**
  
  ```
  apdex(<histogram_series>)
  apdex(application=<application_name>, service=<service_name>, <histogram_series>)
  apdex(T, <histogram_series>)
  apdex(T, 4T, <histogram_series>)
  ```

### Parameters

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
      Specify the name of the application you want to see data.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `service_name`
    </td>
    <td markdown="span">
      Specify the name of the service you want to see data.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `T`
    </td>
    <td markdown="span">
      Specify the satisfied threshold. If you specify the value in the query, it overrides the value you define under [Application Configurations](tracing_apdex.html#configure-the-threshold-t-value).
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `4T`
    </td>
    <td markdown="span">
      Configure the tolerating threshold. If you don't specify the value, wavefront uses the value defined for T and multiplies it by 4.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `histogram_series`
    </td>
    <td markdown="span">
      Specify advanced `hs()` queries. See [Histogram to Histogram Functions](query_language_reference.html#histogram-to-histogram-functions).
    </td>
  </tr>

</table>

### Description

You can use the basic or advanced `apdex()` function to query the apdex score. Wavefront derives the apdex score for each service. Therefore, you must specify the service you want to get the apdex data.

The **basic queries** do not require you to know `hs()` functions. It uses `hs(tracing.aggregated.derived.*.duration.micros.m)` as the underlying query to get the apdex scores. See [Aggregated RED Metrics](trace_data_details.html#aggregated-red-metrics). Basic queries only give you the apdex score for a given service. Therefore, you need to specify the application and service filters.

The **advanced queries** let you customize the `hs()` functions. Use the advanced queries if you are familiar with the [Histogram to Histogram Functions](query_language_reference.html#histogram-to-histogram-functions).
You can get the apdex score for more than one application using the advanced queries. Therefore, you can create alerts to find out when the apdex score of the services in an application are below a [specific range](tracing_apdex.html#interpreting-the-apdex-score).

### Examples
 Let's take a look at how you can use these queries:
 
 * Use the basic query to get the apdex score of the `beachshirts` application's `shopping` service over time.
    ```
    apdex(application=beachshirts, service=shopping)
    ```
    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_basic_query.png)
    
* Use the advanced query to find the apdex score of the services in the beachsirts application every 30 minutes.
    <pre>
apdex(align(30m, merge(hs(tracing.aggregated.derived.*.duration.micros.m), application, service)))
    </pre>
    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_advanced_query_30_minute_bucket.png)
    
* Use the advanced query to get the apdex score of the `beachshirts` application's `shopping` service for the given time window (1vw). Let's use the Gauge chart.
    <pre>
apdex(align(1vw, merge(hs(tracing.aggregated.derived.*.m, application=beachshirts, service=delivery))))
    </pre>

    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_advanced_guage_chart.png)

    Wavefront round the apdex score to 2 decimal points so that it is easy for you to interpret the score. See [Interpreting the Apdex Score](tracing_apdex.html#interpreting-the-apdex-score). You need to update the Gauge chart settings to get the color to value mapping and round the value to 2 decimal points.
    
    ![The screenshot shows how you need to configure the format tab of the gauge chart. You need se the decimal points to 2, set the min as 0 and max as 1, and then define the colors for the apdex range.](images/tracing_apdex_advanced_gauge_cahrt_format_tab.png)
    
    
## `apdexLatency()` Functions

The `apdexLatency()` function gets you the apdex threshold defined for the service, also known as the satisfied threshold (T), and the tolerating threshold, which is four times the satisfied threshold (4T).

### Summary

```
apdexLatency(application=<application_name>, service=<service_name>) 
apdexLatency(application=<application_name>, service=<service_name>, satisfied)
apdexLatency(application=<application_name>, service=<service_name>, tolerating)
```
### Parameters

<table style="width: 100;">
  <tr>
    <th width="20%">
      Parameter
    </th>
    <th width="80%">
      Description
    </th>
  </tr>
  <tr>
    <td markdown="span">
      `application_name`
    </td>
    <td markdown="span">
      Specify the name of the application you want to see data.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `service_name`
    </td>
    <td markdown="span">
      Specify the name of the service you want to see data.
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `satisfied`
    </td>
    <td markdown="span">
      Get the satisfied threshold. It is the threshold value (T) defined for your application. See [Configure the Threshold (T) Value](tracing_apdex.html#configure-the-threshold-t-value).
    </td>
  </tr>
  <tr>
    <td markdown="span">
      `tolerating`
    </td>
    <td markdown="span">
      Get the tolerating threshold. It is the satisfied threshold value (T) times 4.
    </td>
  </tr>

</table>

### Examples

The `apdexLatency()` gets you the satisfied threshold and tolerating threshold of a service. Let's look at the following examples:

* Get the satisfied threshold and tolerating threshold for the `beachshirts` application's `shopping` service.
    ```
    apdexLatency(application=beachshirts, service=shopping)
    ```
    
    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_latency_query.png)

* Get only the satisfied threshold for the `beachshirts` application's `shopping` service.
    ```
    apdexLatency(application=beachshirts, service=shopping, satisfied)
    ```

    ![The screenshot shows the above query and the chart that is generated for it.](images/tracing_apdex_latency_satisfied_threshold_only.png)
