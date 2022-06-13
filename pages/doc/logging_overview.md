---
title: Logs Overview (Beta)
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_overview.html
summary: Learn about Tanzu Observability metrics, events, logs, and traces.
---

{% include important.html content="Tanzu Observability Logs (Beta) is only enabled for selected customers. If you like to participate, contact [technical support](wavefront_support_feedback.html#support)."%}

 <table style="width: 100%;">
<tbody>
<tr>
  <td width="60%" >
    In a microservice architecture, you need to monitor each service carefully. Tanzu Observability helps you monitor your application using metrics, traces, and logs. 
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


{%include note.html content="Tanzu Observability retains logs for 7, 15, or 30 days, based on your settings. To keep log data for longer, contact [technical support](wavefront_support_feedback.html#support)."%}

## What's a Tanzu Observability Log?

Logs are structured or unstructured text records of incidents that took place at a given time. You need to send logs as a JSON payload. 
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
    <td>
      Tags are metadata key-value pairs that are part of your logs. You can filter logs using tags.
      <br/>Make sure to follow the <a href="logging_send_logs.html#best-practices">best practices</a>:
       <ul>
        <li>
          Your tags need to be  of low cardinality.
        </li>
        <li>
          128 characters per tag
        </li>
        <li>
          100 tags per log
        </li>
       </ul>
    </td>
  </tr>
  <tr>
    <td>
      Application
    </td>
    <td markdown="span">
      The name of the application that emits the logs. Make sure the application name is the same name used when sending traces to Tanzu Observability because it maps the logs to your application when you drill down from the Application Map or Traces Browser to the Log Browser.
      
      <br/>If the `application` tag is not defined, the tag is added by Tanzu Observability, and the value is set to `none`. See [FAQ](logging_faq.html#dont-see-application-and-service-log) for details.
    </td>
  </tr>
  <tr>
    <td>
      Service
    </td>
    <td markdown="span">
      The name of the service that emits the log. Make sure the service name is the same name used when sending traces to Tanzu Observability because it maps the logs to your service when you drill down from the Application Map or Traces Browser to the Log Browser.
      
      <br/>If the `service` tag is not defined, the tag is added by Tanzu Observability and the value is set to `none`. See [FAQ](logging_faq.html#dont-see-application-and-service-log) for details.
    </td>
  </tr>
  <tr>
    <td>
      Source
    </td>
    <td markdown="span">
      A source is a unique platform that emits logs. For example, an AWS EC2 instance, or a node in Kubernetes. You can filter logs using the source.
      
      <br/> Make sure the source used for logs, metrics, and traces are the same. For example, if you are already sending metrics to Tanzu Observability and the Wavefront proxy defines the source for your metrics data, follow the same steps when sending logs to Tanzu Observability.
    </td>
  </tr>
  <tr>
    <td>
      Timestamp
    </td>
    <td>
      Timestamp when the log was created, in Epoch time format.
    </td>
  </tr>
  <tr>
    <td>
      Message
    </td>
    <td>
      Details of the event that the log describes.
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

Once your send your logs to Tanzu Observability, you can view all your logs on the Log Browser and drill into the Log Browser from charts, alerts, application map, and the Traces Browser to find the root cause of an issue.

![this diagram shows all the UIs that link to logs. they are explained in this section.](images/logging_all_ui.png)

### Search for Logs on the Log  Browser

See all the logs you sent to Tanzu Observability using the [Log Browser](logging_log_browser.html). You can:

* See logs for a selected time range. 
  {%include note.html content="Tanzu Observability retains logs for 7, 15, or 30 days, based on your settings. To keep log data for longer, contact [technical support](https://docs.wavefront.com/wavefront_support_feedback.html#support)."%}
* Filter logs using tags, application, service, and source, or search for logs that have a specific word(s).
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

#### Filter Alert Logs by Tag

When you create or update an alert, you can configure the alert to filter logs using additional tags. For example, the screenshot shows that the alert was configured to show logs for the given time range and filter the logs further using the wavefront application. See [Create and Manage Alerts](alerts_manage.html#step-4-optional-help-alert-recipients-resolve-the-alert) to add additional log tags to an alert.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="trace_data_details.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill Into Logs From Traces

You can drill into logs from the application map page and the traces browser (coming soon!). 
To see logs for an application and service on the Log Browser, you need to tag the data with the application and service tags on your Log Shipper (example: Fluentd) before sending the logs to Tanzu Observability. For more information, see the [Logs FAQs](logging_faq.html#dont-see-application-and-service-logs).

* **Drill into logs from the application map view**:<br/>
  Did you notice that a service on the application map has a higher error percentage? 
  1. Click on the service.
  1. click **View Logs** to see the logs, and debug the issue.
  ![A screenshot of a the UI once you click on a service with the view logs link highlighted.](images/logging_app_map_to_logs.png)
  
* **Drill into logs from the Traces Browser**:<br/>
    Coming soon!
    
<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="trace_data_details.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>
