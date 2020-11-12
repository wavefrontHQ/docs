---
title: apdexLatency Function
keywords: data, distributed tracing, apdex
tags: [tracing]
sidebar: doc_sidebar
permalink: hs_apdex_latency_function.html
summary: Learn how to use the apdexLatency() function.
---

The `apdexLatency()` function gets you the Apdex threshold defined for the service, also known as the satisfied threshold (T), and the tolerating threshold, which is four times the satisfied threshold (4T).

## Summary

```
apdexLatency(application=<application_name>, service=<service_name>, [satisfied | tolerating]) 
```
## Parameters

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

## Examples

The `apdexLatency()` function gets you the satisfied threshold and tolerating threshold of a service. Let's look at the following examples:

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
    
## See Also 

* Get an overview of how the Apdex score is calculated and [Configure Apdex Settings](tracing_apdex.html).
* Learn how to use the [apdex()](hs_apdex_function.html) function, to see Apdex score data on charts, and create alerts.
