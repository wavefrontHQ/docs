---
title: Drill into Logs
tags: [logs]
sidebar: doc_sidebar
permalink: logging_drill_into_logs.html
summary: Navigate to the Logs Browser from charts, alerts, application map, and the Traces Browser.
---

You can troubleshoot faster by drilling into the Logs Browser from charts, alerts, application map, and the Traces Browser.


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
  
1. In the **Alert Log Summary** panel, click **Go to Logs**.
    The Logs Browser opens in a new tab with the configurations from the **Related Logs** panel:
    
    * The search time window corresponds to the `time range` value.
    * The search query contains the unhidden filters (with the eye icons).
      ![The search query and the selected time window in the Logs Browser.](images/logs_drill_alert_search.png)

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

