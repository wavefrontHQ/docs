---
title: Logs Overview
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_overview.html
summary: Learn how you can get the unified observability experience with Tanzu Observability using metrics, events, logs, and traces.
---

{% include important.html content="This document is work in progress!"%}

 <table style="width: 100%;">
<tbody>
<tr>
  <td width="60%" >
    In a microservice architecture, the services in an application are distributed, and you need to monitor each service carefully to ensure that your overall application runs smoothly. Tanzu Observability helps you monitor your application using metrics, traces, and logs.
    For example, you can: 
    <ul>
      <li> 
        Use metrics to get the numerical data and identify the performance issues in a system. 
      </li>
      <li> 
        Use events to find out that something of interest has happened. For example, the event might show that an alert has changed state from warning to server.
      </li>
      <li> 
        Use traces to get an overview of your entire application and discover the services or service requests that don’t perform as expected.
      </li>
      <li> 
        Use logs to find the root cause of issues.
      </li>
    </ul>
  </td>
  <td width="40%" markdown="span">
    ![shows that Tanzu Observability supports all three pillars : metrics, traces, and logs.](images/logging_ufo.png)
  </td>
</tr>
</tbody>
</table>


{%include note.html content="Your administrators decide how long they want to keep the logs data in Tanzu Observability, which are 7, 14, or 30 days. If you don't see the logs before a specific time period and want to keep the data for a longer time, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help."%}

## What's a Log?

Logs are structured or unstructured text records of events that took place at a given time. You need to send logs as a JSON payload. 
Logs in Tanzu Observability include the following attributes:

<table style="width: 100;">
  <tr>
    <th width="20%">
      Attribute
    </th>
    <th width="80%">
      Description
    </th>
  </tr>
  <tr>
    <td>
       Tags
    </td>
    <td markdown="span">
      Tags are key-value pairs that help you add metadata to your logs. You can filter logs using tags.
      <br/><br/>To track the logs sent from the services in applications, you need to add the `service` and `application` tags. See [FAQs](logging_faq.html#dont-see-application-and-service-logs) for details. If `service` and `application` tags are not set, the tags are added by Tanzu Observability and the value is set to `none`.
    </td>
  </tr>
  <tr>
    <td>
      Source
    </td>
    <td markdown="span">
      A source is a unique stable platform that emits logs. For example, an AWS EC2 instance, or a node in Kubernetes. You can filter logs using the source.
    </td>
  </tr>
  <tr>
    <td>
      Timestamp
    </td>
    <td>
      The timestamp when the log was created in the Epoch time format.
    </td>
  </tr>
  <tr>
    <td>
      Message
    </td>
    <td>
      The message includes the details of an event.
    </td>
  </tr>
</table>

Example:
![Gives an overview of the attributes in a log. They are listed in the table below](images/logging_log_image.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="trace_data_details.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>


## Logging Architecture

You can send your logs to Tanzu observability using a Log Shipper that sends logs as a JSON array over HTTP, such as Fluentd.

See [Send logs to Tanzu Observability](logging_send_logs.html) for detailed steps.

![the images shows how logs are sent from a log shipper to the tanzu observability components](images/logging_send_logs.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="trace_data_details.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## View Logs and Troubleshoot

Once your send your logs to Tanzu Observability, you can view all your logs on the Log Browser and drill into the Log Browser from charts, alerts, application map, and the traces browser to find the root cause of an issue.

![this diagram shows all the UIs that link to logs. they are explained in this section.](images/logging_all_ui.png)

### Search for Logs on The Log  Browser

See all the logs you sent to Tanzu Observability using the [Log Browser](logging_log_browser.html). You can:

* See logs for a selected time range. 
  {%include note.html content="Your administrators decide how long they want to keep the logs data in Tanzu Observability, which are 7, 14, or 30 days. If you don't see the logs before a specific time period and want to keep the data for a longer time, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support) for help."%}
* Filter logs using tags, application, service, and source, or search for logs that have specific keywords.
* See the total number of logs that are there for a specific time using the histogram chart and identify hotspots.
* Group logs using tags.
* Share the Logs Browser data you see with other users.


![a screenshot of the Log Browser](images/logging_log_browser.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="trace_data_details.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill Into Logs From Charts

Did you notice data anomalies on your chart and want to debug the issue using the logs you sent? Right-click on the chart and click **Logs**. You navigate to the Log Browser, and you see the logs for the time and source defined on the chart.

If you don’t see logs, see [logging FAQs](logging_faq.html#dont-see-logs-when-drilling-down-from-a-chart).

![A screenshot of a chart when you right click it . Click logs to go to the Log Browser](images/logging_charts_to_logs.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="trace_data_details.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill Into Logs From an Alert

When an alert fires, you get a notification with the alert details and the logs related to the alert.

![A screenshot of an alert with the logs tags](images/logging_alerts_to_logs.png)

#### Time Range Tag

A time range tag is generated by default from the time the condition to fire the alert is met to the time the alert is fired. 
For example, the screenshot shows:
* The alert started to fire at 6.10 AM. 
* It fired because the condition for the alert to fire was met for 2 mins starting at 6.08 AM. 
* Therefore, when you click **Go To Logs** from the alert, you see the log data from 6.08 AM to 6.10 AM. These logs help you identify the root cause that made the alert fire.

#### Additional Tags

When you create or update an alert, you can configure the alert to filter logs using additional tags. For example, the screenshot shows that the alert was configured to show logs for the given time range and filter the logs further using the wavefront application. See [Create and Manage Alerts](alerts_manage.html#step-4-optional-help-alert-recipients-resolve-the-alert) to add additional log tags to an alert.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="trace_data_details.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill Into Logs From Traces

You can drill into logs from the application map view page and the traces browser (coming soon!). 
To see logs for an application and service on the Log Browser, you need to tag the data with the application and service tags on your Log Shipper (example: Fluentd) before sending the logs to Tanzu Observability. For more information, see the [Logs FAQs](logging_faq.html#dont-see-application-and-service-logs).

* **Drill into logs from the application map view**:<br/>
  Did you notice that a service on the application map has a higher error percentage? Click on the service, click **View Logs** to see the logs, and debug the issue.
  ![A screenshot of a the UI once you click on a service with the view logs link highlighted.](images/logging_app_map_to_logs.png)
  
* **Drill into logs from the Traces Browser**:<br/>
    Coming soon!
    
<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="trace_data_details.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>
