---
title: Traces Browser
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_traces_browser.html
summary: Explore traces and spans from the Traces Browser
---

The Traces Browser in VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront) lets you explore the context and the details of your application's traces.

## Video

This <a href="https://vmwaretv.vmware.com/media/t/1_guro3vem" target="_blank">video<img src="/images/video_camera.png" alt="video camera icon"/></a> highlights the Traces Browser features and settings. Note that this video was created in 2019 and some of the information in it might have changed. It also uses the 2019 version of the UI.

<p>
<iframe id="kmsembed-1_guro3vem" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_guro3vem/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="Highlights the Operations for Applications traces browser features."></iframe>
</p>

## Explore the Traces Browser

See the Traces Browser:

* Option 1:
  1. Log in to your service instance.
  1. From the toolbar, select **Applications** > **Traces**.

* Option 2:
  1. Log in to your service instance.
  1. Drill down to the Traces Browser from the Service Dashboard, application map, table view, or grid view.

![explore trace browser](images/tracing_traces_browser.png)

From the Traces Browser, you can:
* Query for traces and view the query results in the [traces list](#query-for-a-list-of-traces).
    {{site.data.alerts.note}}
    <ul>
      <li>
        When you search for a Trace ID, the search now returns results regardless of the selected time window.
      </li>
      <li>
        If you enabled the traces browser to show live (<img src="images/traces_browser_live.png"
        style="vertical-align:text-bottom;width:60px" alt="a screenshot fo the live button on the traces browser."/>) results, the results get updated every 5 minutes with the latest traces.
      </li>
    </ul>
    {{site.data.alerts.end}}
* Select a trace in the list and:
  - Use the [service map panel](#investigate-the-service-map-for-a-trace) to investigate the services that contribute spans to the trace.
  - Use the [trace details panel](#examine-trace-details) to examine the individual spans in the trace.
* Examine a trace's percentile indicator to see how the trace's duration compares to the durations of the other listed traces.
  You can toggle the panel size for the traces list, service map, or trace details.
* Export traces by clicking <img src="images/tracing_import_traces.png"
style="vertical-align:text-bottom;width:25px" alt="import tracing icon"/>, save the JSON file, and view them later using [Offline Traces](tracing_view_offline_traces.html).
* Easily analyze your traces hierarchy and RED metrics by clicking the expand or restore icon.
  * Click the expand icon to expand the RED metrics and view them next to the trace list, and click the same icon again to restore to the default view.
    ![partial expand red metrics](images/tracing_ui_partial_expand_red_metrics.png)
  * Click the expand icon to expand the trace hierarchy and view them next to the trace list, and click the same icon again to restore to the default view.
    ![partial expand trace hierachy](images/tracing_ui_partial_expand_trace_hierarchy.png)
* Use the link icon <img src="images/tracing_link_icon.png"
style="vertical-align:text-bottom;width:25px" alt="icon to click to get the link"/> to get a link and share what you’re seeing right now (NON-LIVE display) with other users.

## Query for a List of Traces

In the Traces Browser, you can [use the query builder or query editor](trace_data_query.html) to query for traces that include spans for a particular operation.

You can view the results in a traces list.

![explore traces list](images/tracing_traces_browser_traces_list.png)

Here's how to get started:
1. Add an Operation or Trace ID. See [Get Started with Trace Queries](trace_data_query.html#search-and-filter-traces-on-the-traces-browser) for details.
2. Click **Add Filter** and specify a filter to limit the results.
3. (Optional) Advanced users can use Query Editor to limit the scope even further.

You can use the trace list to:

* Sort the returned traces according to different criteria.
* Click a trace to view its context in the [service map panel](#investigate-the-service-map-for-a-trace) and its details in the [trace details panel](#examine-trace-details).
* View a trace's percentile indicator to see how the trace's duration compares to the durations of the other listed traces -- and potentially find outliers.

<!--{% include saved_searches.md %}-->

## Investigate the Service Map for a Trace

In the Traces Browser, use the service map to investigate the services that contribute spans to a selected trace.

![explore service map](images/tracing_traces_browser_service_map.png)

In the service map panel, you can:
* View the service dependencies, and follow the flow of request calls from service to service.
* Click on a service to display the RED metrics that reflect the health of the service:
  - Request count, error count, and trace duration at the 95th percentile, over all traces (root spans) that originate in the service.
  - Line charts that indicate the general contour of the RED metrics.
  - [Fine-tune the time window](ui_examine_data.html#fine-tune-the-time-window) of the RED metrics charts, and see [events](events.html).
* Navigate to the selected service's dashboard for more service details.
* Scroll the service map to zoom in or out, and re-center the service map.
* Look for nodes that are grayed out. These represent services that contribute spans to at least one trace in the list, but not to the trace that is currently selected.


## Examine Trace Details

In the Traces Browser, use the trace details panel to examine the spans that belong to a selected trace. Some of these spans may represent operations executed by other services.

![trace details](images/tracing_traces_browser_trace_details.png)

In the trace details panel, you can:
* Examine the call hierarchy for a selected trace.
* Click any span to expand and see more detail.
* Explore the trace’s [critical path](#a-closer-look-at-critical-paths). This is an end-to-end sequence of blocking spans, where each blocking span must complete before the trace can complete.


## Drill Down Into Spans and View Metrics and Span Logs

In the trace details panel, you can view details about a particular span in the trace. If that span came from another service, you can navigate to the dashboard for that service.

{% include note.html content="The Operations for Applications service can only retrieve up to 1000 spans for a given trace, and you only see up to 1000 spans when you drill down into spans. Therefore, as a best practice and for optimal performance, configure your application to have less than 1000 spans in a trace."%}

![trace span details](images/tracing_span_details_with_logs.png)

Span details include:

* Application tags. These are the application, service, cluster, and shard, as selected by the trace query.
* Other tags, including the trace ID.
* A clickable link to the corresponding Operation Dashboard that lets you examine the RED metrics associated with the call.

If your spans have been instrumented to show span logs, you can click **Logs** to fetch the logs and drill down to examine them. We don't show span logs by default for better browser performance.

## Drill into Logs from Traces

If you notice a critical path through a trace in the Traces Browser, you can drill down into the related logs.

{% include note.html content="You must have tagged the traces and the logs from the same sources, applications, and services with equivalent source, application, and service tag values. If your traces and logs tags don't match, to map the traces tags to logs tags, see [Customize Logs Settings](logging_logs_settings.html)." %}

To see the logs for a trace:
1. Click the trace that you want to examine.
1. In the Trace Details section, click the service on which you want to focus.
1. Expand the **IDs** section.
1. Click **Search Logs**.
![screenshot of the traces browser with the search logs highlighted](images/logging_traces_browser.png)

The Logs Browser opens in a new tab with the following configurations:
  
* By default, the search time window starts 5 seconds before the trace and ends 5 seconds after the trace.
  {% include tip.html content="You can customize the before and after buffer time to create a customized time window when drilling into logs from the Traces Browser. For more details, see [Customize the Time Window when Drilling into Logs](logging_logs_settings.html#customize-the-time-window-when-drilling-into-logs)" %}
* The search query contains the corresponding `traceId`, `source`, `application`, and `service` tag filters.
![screenshot of the traces browser with the search logs with traceId highlighted](images/logging_traces_search.png)

<br/>
To learn more about exploring traces and about finding hot spots at a glance, see [Traces Browser](tracing_traces_browser.html).

<table style="width: 100%;">
<tbody>
<tr><td width="90%">&nbsp;</td><td width="10%"><a href="logging_overview.html"><img src="/images/to_top.png" alt="click for top of page"/></a></td></tr>
</tbody>
</table>

## A Closer Look at Critical Paths

The [trace details panel](#examine-trace-details) uses an orange line to show the critical path through a trace. You can think of the critical path as the end-to-end combination of spans that are the most blocking. These spans represent the sequence of operations that must complete before the trace itself can complete.

Analyzing the critical path of a trace can help you determine which operations took the most time, and can help you decide which operations to try to optimize.

We use the following rules to determine which spans to include in a critical path (in order of applicability):
1. Ignore asynchronous spans (spans tagged with `followFrom`).
2. Ignore spans that end before their parent starts.
3. If a child span continues after its parent, ignore that continuation period.
4. Choose longer spans over shorter siblings.
5. Choose later spans over earlier spans.
6. Choose child spans instead of their parent spans.
