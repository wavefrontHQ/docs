---
title: Configure Apdex Settings
keywords: data, distributed tracing, adpex
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_apdex.html
summary: Get an overview of how the Apdex score is calculated and Configure Apdex Settings.
---

The Application Performance Index ([Apdex](https://www.apdex.org)) is an industry standard that can help you understand how the response time of a service compares to a predefined response time threshold.

## Overview

You can measure the performance of a service using Request, Error, and Duration (RED) metrics for a given time frame. But it is hard to compare these values and understand how each service performs. Apdex helps you compare the response time of a service based on the response time threshold that you define.

When you send your applications trace data to Tanzu Observability (formerly known as VMware Aria Operations for Applications), the application data is detected as first-class citizens using the traces, and the Apdex score is calculated using the threshold value (T) you define. Use [`apdex()`](hs_apdex_function.html) to query the Apdex score of a service, view the results in charts, and create alerts.

The default threshold value (T) is set to 100ms, and only Super Admin users and users with the [**Applications** permission](permissions_overview.html) can configure the threshold (T).

### Apdex Score

The Apdex score is calculated using the following equation:

![shows the equation used to calculate the Apdex score. Apdex score = (Satisfied count + (Tolerating count/2)/Total samples ](images/tracing_apdex_score_equation.png)

The table below defines the terms used in the equation.

<table style="width: 100;">
  <tr>
    <th width="20%">
      Term
    </th>
    <th width="80%">
      Description
    </th>
  </tr>
  <tr>
    <td>
      Apdex<sub>T</sub>
    </td>
    <td markdown="span">
      The Apdex score is calculated based on the response time threshold (T). Only a Super Admin user or users with the **Applications** permission can change this value. See [Configure the Threshold (T) Value](#configure-the-threshold-t-value).
    </td>
  </tr>
  <tr>
    <td>
      Satisfied count
    </td>
    <td>
      Number of requests that received a response in T or less.
    </td>
  </tr>
  <tr>
    <td>
      Tolerating count
    </td>
    <td>
      Number of requests that are 4 times T (4T) or less.
    </td>
  </tr>
  <tr>
    <td>
      Frustrated count
    </td>
    <td>
      Number of requests that take more than 4 times T (4T) to complete. These requests are not used to calculate the Apdex score.
    </td>
  </tr>
  <tr>
    <td>
      Total samples
    </td>
    <td>
      Total number of requests used to calculate your Apdex score.
    </td>
  </tr>
</table>


### Interpreting the Apdex Score

The Apdex score is a value between 0 to 1.
* If the score is 0, none of the requests of the service satisfied the response time threshold (T) you defined.
* If the score is 1, all the requests of the service satisfy T.

We use the following Apdex score range to help you understand how your service is performing:

{% include note.html content="The Apdex score is rounded to two decimal points." %}

<table style="width: 70%;">
  <tr>
    <th width="20%">
      Range
    </th>
    <th width="30%">
      Service Performance
    </th>
    <th width="20%">
      Color
    </th>
  </tr>
  <tr>
    <td>
      0.94 - 1
    </td>
    <td>
      Excellent
    </td>
    <td>
      <img src="images/tracing_apdex_excellent.png" alt="blue for Excellent" style="vertical-align:top;"/>
    </td>
  </tr>
  <tr>
    <td>
      0.85 - 0.93
    </td>
    <td>
      Good
    </td>
    <td>
      <img src="images/tracing_apdex_good.png" alt="blue for Excellent" style="vertical-align:top;"/>
    </td>
  </tr>
  <tr>
    <td>
      0.70 - 0.84
    </td>
    <td>
      Fair
    </td>
    <td>
      <img src="images/tracing_apdex_fair.png" alt="blue for Excellent" style="vertical-align:top;"/>
    </td>
  </tr>
  <tr>
    <td>
      0.50 - 0.69
    </td>
    <td>
      Poor
    </td>
    <td>
      <img src="images/tracing_apdex_poor.png" alt="blue for Excellent" style="vertical-align:top;"/>
    </td>
  </tr>
  <tr>
    <td>
      0.49 - 0
    </td>
    <td>
      Unacceptable
    </td>
    <td>
      <img src="images/tracing_apdex_unacceptable.png" alt="blue for Excellent" style="vertical-align:top;"/>
    </td>
  </tr>
</table>

### Example

Let's take a look at an example to get familiar with how the Apdex score is calculated.

The `shopping` service in the `beachshirts` application handles 300 requests during a 3 minute period, and T is set to 500ms.

* 230 requests were handled within 500ms. This is the satisfied count.
* 40 requests were handled between 500ms and 2 seconds (2000ms). This is the tolerating count.
* The remaining 30 requests ended up as errors or took longer than 4T (2 seconds) to complete. This is the frustrated count, and it is not used to calculate the Apdex score.

  <p><span style="font-size: large; font-weight: 300"><b>Apdex<sub>T</sub></b> = ( 230 + (40/2)) / 300 = <b>0.83</b></span></p>

Based on the Apdex score, you now know that the performance of the `shopping` service is good.

## Configure the Threshold (T) Value

A Super Admin user or users with the **Applications** permission can change the response time threshold (T), which defaults to 100ms using one of the following options:

* Using the **Application Configuration** page.
* Using the legend on the application status page that has the application map, table view, or grid view.

{% include note.html  content="When the response time threshold (T) of a service is updated, the Apdex score is recalculated using the new T."%}

### Update the Threshold from the Application Configuration Page

From the Application Configuration page, you can update the threshold value of multiple services at once. Follow these steps:

1. Click **Applications** > **Application Configuration**. You see a list of the applications that send trace data to the Tanzu Observability service.
1. Click the application that has the services you want to configure. Now, you see a list of all the services in the application.
1. Select the check boxes next to the services that you want to edit and click the **Edit Settings** button on the top of the list.
    {% include note.html content="Only a Super Admin user or users with the **Applications** permission can configure the Apdex threshold. If you are not a Super Admin user, you see the following message: **You don't have permission to update this page**."%}
1. Update the **Apdex Threshold** value and click **Save**.
    ![The image shows where to update the threshold value. It has a blue outline to highlight the threshold value.](images/tracing_configure_apdex_threshold.png)

### Update the Threshold from the Legend on the Application Status Page

You can update the response time threshold (T) using the Settings icon on the app map, table view, or grid view on the Application Status page.

1. Click **Applications** > **Application Status**.
1. Click the settings icon on the app map, table view, or grid view.
1. From the drop-down menu under **Legend Settings**, select **Apdex**.
1. Click **Configure Apdex**. <br/>
    {% include note.html content="Only a Super Admin user or users with the **Applications** permission can configure the threshold (T). If you are not a Super Admin user, you don't see **Configure Apdex**."%}
    ![The image the setting and the legend setting with Apdex selected from the drop down. The configure apdex section is highlighted with a blue box. You need to click it to update the threshold value.](images/tracing_apdex_legeng_configure_apdex.png)
    <br/>Now, you see a list of all the services that send trace data to the Tanzu Observability service. You can sort the table by the service name, application name, service status (active or inactive), and the threshold (T) value.
1. Select the check boxes next to the services that you want to edit and click the **Edit Settings** button on the top of the list.
1. Update the **Apdex Threshold** value and click **Save**.
    ![The image shows where to update the threshold value. It has a blue outline to highlight the threshold value.](images/tracing_configure_apdex_threshold.png)

## See Also

* Learn how to use the [apdex()](hs_apdex_function.html) function, to see Apdex score data on charts, and create alerts.
* Use [apdexLatency()](hs_apdex_latency_function.html) to query the satisfied threshold (T) and toleration threshold (4T) of a service.
