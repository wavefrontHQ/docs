---
title: Get Started with Logs (Beta)
tags: [getting started, logs]
sidebar: doc_sidebar
permalink: logging_overview.html
summary: Learn about Tanzu Observability metrics, logs, and traces.
---

{% include important.html content="Tanzu Observability Logs (Beta) is enabled only for selected customers. To participate, contact your Tanzu Observability account representative or contact [technical support](wavefront_support_feedback.html#support)."%}

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
    {%include important.html content="Currently, the **level** and **exception** tag key names are unsupported."%}
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

![A diagram that shows all the UI pages that link to logs (charts, alerts, application map and Traces Browser). How to navigate from each one of them to the Logs Browser is explained in the sections below.](images/logging_all_ui.png)

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

If you have the **Logs** permission, you can drill into logs from charts, for example, if you notice data anomalies on a chart and want to debug the issue.

{% include note.html content="Even if logging is enabled for your environment, this feature might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}

{% include note.html content="You must have tagged the metrics and the logs from the same source with equivalent source tag values." %}

To drill into the related logs from a chart:

1. Position your pointer over the metric for the source of concern, on the location of the anomaly.
1. Right-click that point on the chart and select **Logs (Beta)**.

![A screenshot of a chart with the right-click menu that includes the Logs option.](images/logging_charts_to_logs.png)
In this example, you right-click the metric chart for source `db-5` at `01:25 PM`.

The Logs Browser opens in a new tab with the following configuration:
- The search time window is a 10-minute period, starting 5 minutes before and ending 5 minutes after the time of the point that you right-clicked on the chart.
- The search query contains the include `source` tag filter for the source that you right-clicked.

![A screenshot of a search query and selected time window in the Logs Browser.](images/logging_from_chart.png)
In this example, the Logs Browser opens with the filter `source = db-5` and the time window `01:20 PM to 01:30 PM` (starting 5 minutes before and ending 5 minutes after `01:25 PM`).

{%include note.html content="If you selected more than one source on the chart, the Logs Browser opens only with the corresponding time window. The search query is empty because this feature supports only one source filter. See [Logs Troubleshooting](logging_faq.html) for details."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill into Logs from an Alert

If you have the **Logs** permission, to investigate a firing alert, you can drill into logs from the [Alert Viewer](alerts.html#alert-viewer-tutorial). For optimal logs search results, you can configure related logs for an alert.

{% include note.html content="Even if logging is enabled for your environment, this feature might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}

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

    1. Click **Edit related Logs**, add and remove filters, and save the alert.
    1. Click the eye icons of the related logs filters that you want to hide from the logs search query. To unhide a filter, you must click the eye-hide icon.
    
    You cannot remove or hide the `time range` filter.
1. In the **Related Logs** panel, click **Go to Logs (Beta)**.
  ![The related Logs panel populated with time range filter and other custom filters with eye and eye-hide icons.](images/logs_drill_alert.png)
  
  The Logs Browser opens in a new tab with the configurations from the **Related Logs** panel:
  
  * The search time window corresponds to `time range` value.
  * The search query contains the unhidden filters (with the eye icons).
    ![The search query and the selected time window in the Logs Browser.](images/logs_drill_alert_search.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

### Drill into Logs from Traces

If you have the **Logs** permission, you can drill into logs from the application status page and the Traces Browser.

{% include note.html content="Even if logging is enabled for your environment, the drill-down from traces to logs might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}

#### Application Status

If you notice that a service on the application map, table view, or grid view of the [Application Status page](tracing_ui_overview.html) has a high error percentage, you can drill down into the related logs.

{% include note.html content="You must have tagged the traces and the logs from the same applications and services with equivalent application and service tag values."%}

* **From the Map View**
  1. Select the time window of interest.
  1. Click the service on the application map.
  1. Select **View Logs (Beta)**.
  ![A screenshot of a the UI once you click on a service with the view logs link highlighted.](images/logging_app_map_to_logs.png)
* **From the Table View**
  1. Select the time window of interest.
  1. Click the ellipsis for the service.
  1. Select **View Logs (Beta)**.
  ![A screenshot of a the UI once you click vertical ellipsis on the table view](images/logging_table_view_to_logs.png)
* **From the Grid View**
  1. Select the time window of interest.
  1. In a service tile, click **Actions**.
  1. Select **View Logs (Beta)**.
  ![A screenshot of a the UI once you click vertical ellipsis on the grid view](images/logging_grid_view_to_logs.png)

The Logs Browser opens in a new tab with the following configurations:
  
* The search time window corresponds to the time window on the Application Status page.
* The search query contains the corresponding include `service` and `application` tag filters.
![The search query and the selected time window in the Logs Browser.](images/logging_app_serv_search.png)

#### Traces Browser

If you notice a critical path through a trace in the [Traces Browser](tracing_traces_browser.html), you can drill down into the related logs.

{% include note.html content="You must have tagged the traces and the logs from the same applications and services with equivalent application and service tag values."%}

{% include note.html content="You must have tagged the traces and the logs from the same sources, applications, and services with equivalent source, application, and service tag values." %}

To see the logs for a trace:
1. Click the trace that you want to examine.
1. In the Trace Details section, click the service on which you want to focus.
1. Expand the **IDs** section.
1. Click **Search Logs (Beta) with traceId**.
![screenshot of the traces browser with the search logs with traceId highlighted](images/logging_traces_browser.png)

The Logs Browser opens in a new tab with the following configurations:
  
* The search time window corresponds to the trace time window per the RED metrics charts.
* The search query contains the corresponding include `traceId`, `source`, `application`, and `service` tag filters.
![screenshot of the traces browser with the search logs with traceId highlighted](images/logging_traces_search.png)

<br/>
To learn more about exploring traces and about finding hot spots at a glance, see [Traces Browser](tracing_traces_browser.html).

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Create a Logs Chart

If you have the **Logs** and **Dashboards** permissions, in the [Chart Builder](chart_builder.html) you can create logs charts. A logs chart shows the number of logs by certain criteria. For example, see the logs chart in the [Logs Browser](logging_log_browser.html).

{% include important.html content="The Chart Builder supports only one logs query per chart. If you have multiple queries, you must move the target logs query to the top as the first query in the list."%}

{% include note.html content="Node map, histogram, and heatmap are unsupported chart types for logs."%}

<table style="width: 100%;">
<tr>
  <td width="40%">
  <p>1. From the <strong>Data</strong> drop-down menu, select <strong>Logs (Beta)</strong>.</p>
  </td>
  <td width="60%">
    <img src="images/logs_histogram_data.png" alt="The Data drop-down menu."/>
  </td>
</tr>
<tr>
  <td width="40%">
  <p>2. From the <strong>Filters</strong> drop-down menu, add one or more tag filters.</p>
  <p>You can add include and exclude tag filters. See <a href="logging_log_browser.html#filter-types-and-logical-operators">Filter Types and Logical Operators</a> for details.</p>
  </td>
  <td width="60%">
    <img src="images/logs_histogram_filters.png" alt="The Filters drop-down menu."/>
  </td>
</tr>
<tr>
  <td width="40%">
  <p>3. Optionally, next to the <strong>Functions</strong> drop-down menu, click <strong>Count</strong>, select one or more tags by which you want to group the number of logs, and click <strong>Apply</strong>.
  {% include note.html content="The logs that don't have at least one of the grouping tags are excluded from the logs chart."%}</p>
    </td>
  <td width="60%">
    <img src="images/logs_histogram_functions.png" alt="The Count drop-down menu."/>
  </td>
</tr>
</table>

The resulting chart shows the number of logs matching the selected filters distributed over the [selected time window](ui_charts.html#set-the-time-window-on-a-chart). The logs are grouped by the values of the selected grouping tags. You can zoom in on smaller time windows.
![Logs histogram chart](images/logs_histogram_chart.png)

## Learn More!

* [Send logs to Tanzu Observability](logging_send_logs.html).
* [View and browse logs](logging_log_browser.html).
* Learn about the [proxy configurations and proxy preprocessor rules for logs](logging_proxy_configurations.html).
* See [Logs troubleshooting](logging_faq.html).

<!---RK>>Pointing to the github tutorial only from logging_send_logs. Could change that, not sure.
[Try out the demo app tutorial on GitHub](https://github.com/wavefrontHQ/demo-app) to send logs to Tanzu Observability.
--->
