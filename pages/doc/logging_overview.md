---
title: Get Started with Logs (Beta)
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

{% include note.html content="Only users with the [**Logs** permission](permissions_overview.html) can view the Logs Browser and drill down into logs from charts, alerts, and traces."%}

## What's a Tanzu Observability Log?

Logs are structured or unstructured text records of events that took place at a given time. Tanzu Observability ingests logs in JSON format.

### Log Attributes

Each log has required attributes, standard attributes, and custom tags. We tokenize the values of these attributes and tags, so that you can filter and search logs.

{%include tip.html content="If your logging solution doesn't use exactly the same tags, you can use a proxy configuration file to map your tags to the expected attributes and tags. See [My Logging Solution Doesn't Use the Default Attributes](logging_faq.html#my-logging-solution-doesnt-use-the-default-attributes). "%}

<table style="width: 100;">
  <tr>
    <td width="20%">
      <strong>Required attributes</strong>
    </td>
    <td width="80%">
    <ul>
    <li><strong>timestamp</strong>: The time when the log was created. The value must be in Epoch milliseconds.
    <p>If your log shipper sends this attribute with a different name, use the <code>customTimestampTags</code> proxy configuration property to establish the mapping.</p>
    <p>If you don't send or map this attribute, we set the value by using our system time.</p>
    </li>
    <li><strong>message</strong>: The body of the log entry. Can be up to 20k characters.
    <p>If your log shipper sends this attribute with a different name, use the <code>customMessageTag</code> proxy configuration property to establish the mapping.</p></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>
      <strong>Standard attributes</strong>
    </td>
    <td>
    These attributes are required if you want to drill into logs from charts and traces.
    <ul>
    <li><strong>source</strong>: A unique platform that emits the log, such as an AWS EC2 instance or a node in Kubernetes. To ensure that you can drill into logs from charts, use matching source values for logs and metrics. To ensure that you can drill into logs from traces, use matching source values for logs and traces.
    </li>
    <li><strong>application</strong>: Name of the application that emits the log. To ensure that you can drill into logs from traces, use matching application values for logs and traces.
    <p>If your log shipper sends this attribute with a different name, use the <code>customApplicationTags</code> proxy configuration property to establish the mapping.</p></li>
    <li><strong>service</strong>: Name of the service that emits the log. To ensure that you can drill into logs from traces, use matching service values for logs and traces.
    <p>If your log shipper sends this attribute with a different name, use the <code>customServiceTags</code> proxy configuration property to establish the mapping.</p></li>
    </ul>
    </td>
  </tr>
<tr>
    <td>
    <strong>Custom Tags</strong>
    </td>
    <td>You can send logs with additional custom tag key-value pairs of your choice. Follow these guidelines:
       <ul>
        <li>
          Low-cardinality tags. Many of the recommendations in <a href="optimize_data_shape.html">Optimizing Data Shape to Improve Performance</a> apply.
        </li>
        <li>
          128 characters per tag key
        </li>
        <li>
          128 characters per tag value
        </li>
        <li>
          100 tags per log
        </li>
       </ul>
    <p>See <a href="logging_send_logs.html#limits-for-logs">Limits for Logs</a> for details.</p>
    {%include important.html content="Currently, we don't support the `level` and `exception` tag key names."%}
    </td>
  </tr>
</table>


### Log Data Format Example

![Image giving an overview of the attributes in a log. They are listed in the table above.](images/logging_log_image.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>


## Send Logs to Tanzu Observability

You can send your logs using a log shipper, such as Fluentd, that sends logs as a JSON array over HTTP. See [Send logs to Tanzu Observability](logging_send_logs.html).

![A diagram shows how logs are sent from a log shipper to the Tanzu Observability components](images/logging_send_logs_rev.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## View Logs and Troubleshoot

When logs have started flowing into your Wavefront instance, as a user with the **Logs** permission, you can:
* Go to the Logs Browser directly to view and explore logs.
* Drill into the Logs Browser from charts, alerts, application map, and the Traces Browser.

![A diagram shows all the UIs that link to logs. They are explained in this section.](images/logging_all_ui.png)

### Examine Logs in the Logs Browser

You can examine logs that were sent to Tanzu Observability on the [Logs Browser](logging_log_browser.html):

* See logs for a specific the time range within the logs retention period for your Wavefront instance (7, 15, or 30 days).
* Filter logs using application, service, source or other tags.
* Search for logs that have a messages that contain a specific word, for example, `error`.
* In the histogram chart at the top of the Logs Browser, see the number of logs for each time bucket, zoom in, and identify hotspots. Group the number of logs by the values of a specific tag.
* Share the Logs Browser data you see with other users that have the **Logs** permission.


![a screenshot of the Logs Browser](images/logging_log_browser.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill into Logs from Charts

{% include note.html content="Even if logging is enabled for your environment, this feature might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}

If you notice data anomalies on a chart and want to debug the issue, you can drill into the related logs.

1. Position your pointer over the metric for the source of concern, exactly on the location of the anomaly.
1. Right-click that point on the chart and select **Logs (Beta)**.

![A screenshot of a chart with the right-click menu that includes the Logs option.](images/logging_charts_to_logs.png)
In this example, you right-click the metric chart for source `app-15` at `01:11:57 PM`.

The Logs Browser opens in a new tab with the following configuration:
- The selected time window is a 10-minute period, starting 5 minutes before and ending 5 minutes after the time of the point that you right-clicked on the chart.
- The search query contains an include filter for the source of the metric that you right-clicked.

![A screenshot of a search query and selected time window in the Logs Browser.](images/logging_from_chart.png)
In this example, the Log Browser opens with the filter `source = app-15` and the selected time window `01:16:57 PM to 01:26:57 PM` (starting 5 minutes before and ending 5 minutes after `01:11:57 PM`).

If you don’t see logs, see [Logs Troubleshooting](logging_faq.html).

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill into Logs from an Alert

{% include note.html content="Even if logging is enabled for your environment, this feature might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}

If you have the **Logs** permission, to investigate a firing alert, you can drill into logs from the [Alert Viewer](alerts.html#alert-viewer-tutorial). For optimal logs search results, you can configure related logs for an alert.

<table style="width: 100%;">
<tr>
  <td width="40%">
  <p>When you <a href="alerts_manage.html">create or edit</a> an alert, in the <strong>Related Logs</strong> panel, you can add multiple tag filters. This way, you can prepare the <a href="logging_log_browser.html#build-your-search-query">logs search query</a> that you can run when the alert fires.</p>
  </td>
  <td width="60%">
    <img src="images/logs_alert_create.png" alt="The Related Logs panel with a drop-down menu for selecting include and exclude tag filters."/>
  </td>
</tr>
</table>

To drill into the related logs of a firing alert:

1. Go to the Alert Viewer for the alert. You have these options:

    * Click the link in the alert notification.
    * In the [Alerts Browser](alerts.html#alerts-browser-tutorial), locate the firing alert and click **View firing details**.
  
    In the **Related Logs** panel, the `time range` filter is populated with the trigger window during which the alert condition was met and the alert transitioned to firing state.
1. Optionally, in the **Related Logs** panel, adjust the filters for the logs search query.

    * Click **Edit related Logs**, add and remove filters, and save the alert.
    * Click the eye icons of the related logs filters that you want to hide from the logs search query. To unhide a filter, you must click the eye-hide icon.
    
    You cannot remove or hide the `time range` filter.
1. In the **Related Logs** panel, click **Go to Logs (Beta)**.
  ![The related Logs panel populated with time range filter and other custom filters with eye and eye-hide icons.](images/logs_drill_alert.png)
  
  The Logs Browser opens in a new tab with the configuration from the **Related Logs** panel:
  
  * The selected time window corresponds to `time range` value.
  * The search query contains the unhidden filters (with the eye icons).
    ![The search query and the selected time window in the Logs Browser.](images/logs_drill_alert_search.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill into Logs from Traces

You can drill into logs from the application status page and the traces browser.
To see logs for an application and service on the Logs Browser, you need to tag the data with the application and service tags on your log shipper. See the [Logs FAQs](logging_faq.html).

{% include note.html content="Even if logging is enabled for your environment, the drill-down from traces to logs might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}


#### Application Map

If you notice that a service on the application map, table view, or grid view has a high error percentage, you can drill down into logs.

* **From the Map View**
  1. Click on the service on the application map.
  1. Click **View Logs** to see logs related to the service and debug the issue.
  ![A screenshot of a the UI once you click on a service with the view logs link highlighted.](images/logging_app_map_to_logs.png)
* **From the Table view**
  1. Click the vertical ellipsis.
  2. Select **View Logs** to see logs related to the service.
  ![A screenshot of a the UI once you click vertical ellipsis on the table view](images/logging_table_view_to_logs.png)

#### Service Dashboard

In a service tile, click **Actions** and select **View Logs** to see logs related to the service.
  ![A screenshot of a the UI once you click vertical ellipsis on the grid view](images/logging_grid_view_to_logs.png)

#### Traces Browser

If you want to see logs for a service, follow these steps:
1. Click the trace that you want to examine.
1. In the Trace Details section, click the service you want to focus on.
1. Expand the **IDs** section.
1. Click **Search Logs with traceID**.

![screenshot of the traces browser with the search logs with traceId highlighted](images/logging_traces_browser.png)
<br/>
To learn more about exploring traces and about finding hot spots at a glance, see [Traces Browser](tracing_traces_browser.html).

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

<!---RK>>Pointing to the github tutorial only from logging_send_logs. Could change that, not sure.
[Try out the demo app tutorial on GitHub](https://github.com/wavefrontHQ/demo-app) to send logs to Tanzu Observability.
--->
