---
title: Drill into Logs (Beta)
tags: [logs]
sidebar: doc_sidebar
permalink: logging_drill_into_logs.html
summary: Navigate to the Logs Browser from charts, alerts, application map, and the Traces Browser.
---

You can troubleshoot faster by drilling into the Logs Browser from charts, alerts, application map, and the Traces Browser.

## Drill into Logs from Charts

If you have the **Logs** permission, you can drill into logs from charts, for example, if you notice data anomalies on a chart and want to debug the issue.

{{site.data.alerts.note}}
<ul>
    <li markdown="span">
        Even if logging is enabled for your environment, this feature might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support).
    </li>
    <li markdown="span">
        You must have tagged the metrics and the logs from the same source with equivalent source tag values. If your metrics and logs tags don't match, users with **Accounts** permissions can map the metrics tags to logs tags. For details, see [Customize Logs Settings](logging_logs_settings.html).
    </li>
</ul>
{{site.data.alerts.end}}

To drill into the related logs from a chart:

1. Position your pointer over the metric for the source of concern, on the location of the anomaly.
1. Right-click that point on the chart and select **Logs (Beta)**.

![A screenshot of a chart with the right-click menu that includes the Logs option.](images/logging_charts_to_logs.png)
In this example, you right-click the metric chart for source `db-5` at `01:25 PM`.

The Logs Browser opens in a new tab with the following configuration:
- The search time window is a 10-minute period, starting 5 minutes before and ending 5 minutes after the time of the point that you right-clicked on the chart.
- The search query includes the `source` tag as a filter for the source that you right-clicked.

![A screenshot of a search query and selected time window in the Logs Browser.](images/logging_from_chart.png)
In this example, the Logs Browser opens with the filter `source = db-5` and the time window `01:20 PM to 01:30 PM` (starting 5 minutes before and ending 5 minutes after `01:25 PM`).

{%include note.html content="If you selected more than one source on the chart, the Logs Browser opens only with the corresponding time window. The search query is empty because this feature supports only one source filter. See [Logs Troubleshooting](logging_faq.html) for details."%}

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Drill into Logs from an Alert

If you have the **Logs** permission, to investigate a firing alert, you can drill into logs from the [Alert Viewer](alerts.html#alert-viewer-tutorial). For optimal logs search results, you can configure related logs for an alert.

{% include note.html content="Even if logging is enabled for your environment, this feature might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}

<table style="width: 100%;">
<tr>
  <td width="40%">
  <p>When you <a href="alerts_manage.html">create or edit</a> an alert, in the <strong>Related Logs</strong> panel, you can add multiple tag filters. This way, you can prepare the <a href="logging_log_browser.html#build-your-search-query">logs search query</a>, which runs when the alert fires.</p>
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
  
1. Click **Show Logs Summary**.
    * In the **Alert Log Summary** panel, the `time range` filter is populated with the trigger window during which the alert condition was met and the alert transitioned to a firing state.
    * The histogram chart shows you the logs for the specific time grouped by the log level, such as, debug, trace, error, server, info, and warn.
    * You also get to see the list of exceptions that were fired when the alert was fired. Click an exception to go to the Logs Browser and examine the logs that have the exception you selected.

    ![A screenshot of the alert log summary panel of a firing alert.](images/logs_view_log_summary_from_alert.png)

1. Optionally, in the **Alert Log Summary** panel, adjust the filters for the logs search query.

    1. Click **Configure log search**.
    1. Add and remove filters from the **Related Logs** section, and save the alert.
    
   Click the eye icons of the related logs filters that you want to hide from the logs search query. To unhide a filter, you must click the eye-hide icon. You cannot remove or hide the `time range` filter.
  
1. In the **Alert Log Summary** panel, click **Go to Logs (Beta)**.
    The Logs Browser opens in a new tab with the configurations from the **Related Logs** panel:
    
    * The search time window corresponds to the `time range` value.
    * The search query contains the unhidden filters (with the eye icons).
      ![The search query and the selected time window in the Logs Browser.](images/logs_drill_alert_search.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## Drill into Logs from Traces

If you have the **Logs** permission, you can drill into logs from the application status page and the Traces Browser.

{% include note.html content="Even if logging is enabled for your environment, the drill-down from traces to logs might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}

### Application Status

If you notice that a service on the application map, table view, or grid view of the [Application Status page](tracing_ui_overview.html) has a high error percentage, you can drill down into the related logs.

{% include note.html content="You must have tagged the traces and the logs from the same applications and services with equivalent application and service tag values. If your traces and logs tags don't match, users with **Accounts** permission can map the traces tags to logs tags. For details, see [Customize Logs Settings](logging_logs_settings.html)."%}

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
* The search query contains the corresponding `service` and `application` tag filters.
![The search query and the selected time window in the Logs Browser.](images/logging_app_serv_search.png)

### Traces Browser

If you notice a critical path through a trace in the [Traces Browser](tracing_traces_browser.html), you can drill down into the related logs.

{% include note.html content="You must have tagged the traces and the logs from the same sources, applications, and services with equivalent source, application, and service tag values. If your traces and logs tags don't match, users with **Accounts** permission can map the traces tags to logs tags. For details, see [Customize Logs Settings](logging_logs_settings.html)." %}

To see the logs for a trace:
1. Click the trace that you want to examine.
1. In the Trace Details section, click the service on which you want to focus.
1. Expand the **IDs** section.
1. Click **Search Logs (Beta)**.
![screenshot of the traces browser with the search logs highlighted](images/logging_traces_browser.png)

The Logs Browser opens in a new tab with the following configurations:
  
* By default, the search time window starts 5 seconds before the trace and ends 5 seconds after the trace.
  {% include note.html content="To change the default search time window for trace logs, contact [Technical Support](wavefront_support_feedback.html#support)."%}
* The search query contains the corresponding `traceId`, `source`, `application`, and `service` tag filters.
![screenshot of the traces browser with the search logs with traceId highlighted](images/logging_traces_search.png)

<br/>
To learn more about exploring traces and about finding hot spots at a glance, see [Traces Browser](tracing_traces_browser.html).

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>


## Learn More!

* [Send logs](logging_send_logs.html).
* [View and browse logs](logging_log_browser.html).
* Learn how to [create a logs chart](logging_logs_chart.html) and add it to a dashboard.
* See [Logs troubleshooting](logging_faq.html).