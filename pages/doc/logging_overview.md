---
title: Logs Overview (Beta)
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_overview.html
summary: Learn about Tanzu Observability metrics, logs, and traces.
---

{% include important.html content="Tanzu Observability Logs (Beta) is enabled only for selected customers. To participate, contact your Tanzu Observability account representative."%}

 <table style="width: 100%;">
<tbody>
<tr>
  <td width="60%" >
    Tanzu Observability helps you monitor your application using metrics, traces, and logs.
    For example, you can:
    <ul>
      <li>
        Use metrics to get the numerical data and identify and alert on the performance issues in a system.
      </li>
      <li>
        Use traces for an overview of all application services and to find bottlenecks.
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


{%include note.html content="Tanzu Observability retains logs for 7, 15, or 30 days, based on your settings."%}

## What's a Tanzu Observability Log?

Logs are structured or unstructured text records of incidents that took place at a given time. Tanzu Observability ingests logs in JSON format.

Each log has required attributes, optional attributes, and tags.

<table style="width: 100;">
  <tr>
    <td width="20%">
      <strong>Required attributes</strong>
    </td>
    <td width="80%" markdown="span">
    Required are `timestamp` and `message`. Your log shipper includes these attributes.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Optional attributes</strong>
    </td>
    <td>
    Set the following optional attributes as needed. By default, we add the <code>application</code> and <code>service</code> tag and set the value to <code>none</code>.
    <ul>
    <li><strong>source</strong>: A source is a unique platform that emits logs, such as an AWS EC2 instance or a node in Kubernetes. Ensure that logs, metrics, and traces are using the same source. For example, if you are already sending metrics to Tanzu Observability, and the Wavefront proxy defines the source for your metrics data, use the same source when sending logs to Tanzu Observability.</li>
    <li><strong>application </strong>: Name of the application that emits the logs.  <br/>If you're also sending traces, ensure that you're using the same application name. When you drill down from the application map or traces browser to the Log Browser, the application name is used to map the logs to the application.
      <br/>If the `application` tag is not defined, we add the tag and set the value to `none`.</li>
    <li><strong>service </strong>: Name of the service that emits the log.
     <br/>If you're also sending traces, ensure that you're same service name in both paces. When you drill down from the application map or traces browser to the Log Browser, the sevice name is used for mapping.
    <br/>If the `service` tag is not defined, we add the tag and set the value to `none`.</li>
    </ul>
    </td>
  </tr>
<tr>
    <td>
    <strong>Tags</strong>
    </td>
    <td>
      Tags are metadata key-value pairs that are part of your logs. You can filter logs using tags.
       <ul>
        <li>
          Low-cardinality tags. Many of the recommendations in <a href="optimize_data_shape.html">Optimizing Data Shape to Improve Performance</a> apply.
        </li>
        <li>
          128 characters per tag
        </li>
        <li>
          100 tags per log
        </li>
       </ul>
    <p>See <a href="logging_send_logs.html#limits-for-logs">Limits for Logs</a> for details.</p>
    </td>
  </tr>
</table>


### Log Data Format Example

![Image giving an overview of the attributes in a log. They are listed in the table below](images/logging_log_image.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>


## Send Logs to Tanzu Observability

You can send your logs using a log shipper, such as Fluentd, that sends logs as a JSON array over HTTP. See [Send logs to Tanzu Observability](logging_send_logs.html).

![the images shows how logs are sent from a log shipper to the tanzu observability components](images/logging_send_logs.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## View Logs and Troubleshoot

When logs have started flowing into your Wavefront instance, you can:
* View your logs on the Log Browser
* Drill into the Log Browser from charts, alerts, application map, and the Traces Browser.

![diagram shows all the UIs that link to logs. they are explained in this section.](images/logging_all_ui.png)

### Examine Logs in the Log Browser

You can examine logs that were sent to Tanzu Observability on the [Log Browser](logging_log_browser.html). You can:

* See logs for the time range set for your Wavefront instance (7, 15, or 30 days)
* Filter logs using application, service, source or other tags.
* Search for logs that have a messages containing a specific word(s), for example, ERROR.
* See the total number of logs that are there for a specific time using the chart at the top of the Log Browser and identify hotspots.
* Group logs using tags.
* Share the Log Browser data you see with other users that have the required permissions.


![a screenshot of the Log Browser](images/logging_log_browser.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill into Logs from Charts

If you notice data anomalies on a chart and want to debug the issue using logs, right-click the chart and click **Logs**. On the Log Browser, see the logs for the time and source used by the chart.

{% include note.html content="This feature works only if it's been enabled for your Wavefront instance. Contact [technical support](wavefront_support_feedback.html#support) to request an update of the settings." %}

If you don’t see logs, see [logging FAQs](logging_faq.html#dont-see-logs-when-drilling-down-from-a-chart).

![A screenshot of a chart with the right-click menu that includes a Logs option.](images/logging_charts_to_logs.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill into Logs from an Alert

To drill into logs from an alert:
1. Go to the [alert viewer](alerts.html#alert-viewer-tutorial) for an alert.
    * Click the link in the alert notification.
    * In the [alert browser](alerts.html#alerts-browser-tutorial), find FIRING alerts, and click to drill down to the alert viewer.
1.  In the **Related Logs** section, click **Go to logs**.


![A screenshot of an alert with the logs tags](images/logging_alerts_to_logs.png)

#### Log Time Range

A time range tag is generated by default from the time the condition to fire the alert is met to the time the alert is fired. When you click **Go to Logs**, then you see the log data for that time range.

For example, in the screenshot above:
* The alert started to fire at 6.10 AM.
* It fired because the condition was met for 2 mins (starting at 6.08 AM).
* When you click **Go to Logs** from the alert, you see the log data from 6.08 AM to 6.10 AM.

The logs help you identify the root cause for the alert.

#### Log Tags for an Alert

When you create or edit an alert, you can configure the alert to filter logs using additional tags.

<!---Maybe steps for adding the log tag. Does it work on yaob-21?--->

For example, the screenshot above shows that the alert was configured to show logs for the given time range and filter the logs further using the `wavefront` application. See [Create and Manage Alerts](alerts_manage.html#step-4-optional-help-alert-recipients-resolve-the-alert) to add log tags to an alert.

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill into Logs from Traces

You can drill into logs from the application status page and the traces browser.
To see logs for an application and service on the Log Browser, you need to tag the data with the application and service tags on your log shipper. See the [Logs FAQs](logging_faq.html#dont-see-application-and-service-logs).

{% include note.html content="The drill-down from traces to logs, works only if the technical support team has updated your settings. Contact [technical support](wavefront_support_feedback.html#support)." %}


#### Application Map

If you notice that a service on the application map, table view, or grid view has a high error percentage, you can drill down into logs.

* **Start with the Map View**
  1. Click on the service on the application map.
  1. Click **View Logs** to see logs related to the service and debug the issue.
  ![A screenshot of a the UI once you click on a service with the view logs link highlighted.](images/logging_app_map_to_logs.png)
* **Start with the Table view**
  Click the vertical ellipsis and select **View Logs** to see logs related to the service.
  ![A screenshot of a the UI once you click vertical ellipsis on the table view](images/logging_table_view_to_logs.png)

#### Service Dashboard

In the service tile, click **Actions** and select **View Logs** to see logs related to the service.
  ![A screenshot of a the UI once you click vertical ellipsis on the grid view](images/logging_grid_view_to_logs.png)

#### Traces Browser

If you want to see logs for a service, follow these steps:
1. Click the trace that you want to examine.
1. In the Trace Details section, click the service you want to focus on.
1. Expand the **IDs** section.
1. Click **Search Logs with traceID**.

![screenshot of the traces browser with the search logs with traceId highlighted](images/logging_traces_browser.png)
To learn more about exploring traces and finding hot spots at a glance when the services in your system communicate with each other, see [Traces Browser](tracing_traces_browser.html).

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Next Steps

* [Send logs to Tanzu Observability](logging_send_logs.html).
* [View and browse logs](logging_log_browser.html).
* Learn about [proxy configurations and proxy preprocessor rules](logging_proxy_configurations.html).
* See [Logs FAQs](logging_faq.html).

<!---
[Try out the demo app tutorial on GitHub](https://github.com/wavefrontHQ/demo-app) to send logs to Tanzu Observability.
--->
