---
title: Visualizing Traces, Spans, and RED Metrics
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_ui_overview.html
summary: Explore traces and spans from the Wavefront UI.
---

The Wavefront tracing UI enables exploration of your apps and services. Once your application is instrumented for tracing, you can examine traces, spans, and RED metrics, moving easily from one browser page to the next.

This page explains how you can examine trace data from our UI. You'll learn how to query for traces, examine details, find potential problems, and more.

## Choose Your Starting Point

Wavefront offers the following dashboards and browsers to view information on your applications and services and you can navigate from one to another to gather more information:

<table style="width: 100%;">
<tbody>
<tr>
<td width="55%">
<img src="images/tracing_ui.png" alt="tracing user interfaces"/>
</td>
<td width="45%">
To choose your starting point for visualizing traces:<br/>
  <ol> <li>In your web browser, go to your Wavefront cluster and log in.</li>
  <li> From the taskbar click <b>Applications</b> :
  <img src="/images/tracing_menu.png" alt="tracing menu"/>
      <ul> <li>Select <b>Application Map</b> to <a href="#application-map">view how instrumented applications are related to each other</a> and drill down from there.</li>
      <li> Select <b>Application Status</b> to <a href="#application-status-dashboard">view the status of your instrumented applications</a> and drill down from there. 
          <br/>Once on Application Status, click <b>Service Status</b> to <a href="#service-status-dashboard">view the status of the services in an application</a> and drill down from there.</li>
      <li> Select <b>Service Dashboard</b> to <a href="#service-dashboard">view the status of a service in your application</a> and drill down from there.</li>
      <li> Select <b>Traces</b> to start by <a href="#tracing-browser">querying for traces</a> and drill down from there.</li>
      </ul></li></ol>
</td>
</tr>
</tbody>
</table>

## Application Map (Beta)

The application map not only gives you an overview of how the applications and services are linked, it lets you, focus on a specific service, view Request, Error, and Duration (RED) metrics for each service and the edges in the application. You can also view traces for the services and edges and drill down from the application map.

![application map](images/tracing_app_map.png)

Let's walk through the following scenario to get a quick overview of the application map. 

<table style="width: 100%;">
<thead>
<tr><th width="55%">Action</th><th width="45%">Result</th></tr>
</thead>
<tbody>
  <tr>
    <td markdown="span">
      **Step 1:  Search for applications** <br/>
      Click **Tag**, select **application** > **beachshirts**, and click **Search**.<br/>
      
      You can search for applications by applying one or more filters, such as the application name, cluster, shard, or any other application tag.
      </td>
    <td><img src="/images/tracing_appmap_search_application.png" alt="Search for the beachshirts application using tags"/>
    <a name="appmap"></a>
    </td>
  </tr>
  <tr>
    <td>
      <b>Step 2:  Customize the application map view</b> <br/>
      You can customize how you see your applications and services on the application map using the settings icon. 
      <ul>
      <li><b>Isolated Services</b>: These are services that don't interact with any other services or applications.</li>
      <li><b>External Service</b>: These are external applications or services, such as AWS services or Database services, your application communicates with. You can group these services too. If you want to group all the database services and view it as a single external service, select <b>Group External Services</b>.</li>
      <li><b>Show Service Labels</b>: When you have many services in an application, the service names on the application map look cluttered. To get a clear view of your application and services, disable the <b>Show Service Labels</b> option.</li>
      </ul>
      </td>
    <td> 
      <iframe src="https://bcove.video/34vKPYb" width="400" height="275" allowfullscreen="true" alt="application map settings"></iframe>
    </td>
  </tr>
  <tr>
    <td markdown="span">
      **Step 3: Hover over a service** <br/>
      Hover over the styling service of the beachshirts application. It highlights how the styling service communicates with the other services in the application.
      </td>
    <td><img src="/images/tracing_appmap_hover_over_service.png" alt="Hover over the styling service"/></td>
  </tr>
  <tr>
    <td>
      <b>Step 4: Click on a service</b>
      <br/>Click on the styling service. Now, you can:
        <ul><li>View Request, Error, and Duration (RED) metrics of the specific service.</li>
        <li> View how a specific service communicates with the other services in an application when you click <b>Focus on service</b>.</li>
        <li> Navigate to the Service dashboard when you click <b>View Service dashboard</b>.</li>
        <li> Navigate to the Tracing browser when you click <b>View traces for service</b>.</li>
        <li> See the components used by the service. The styling service uses the OpenTracing, Java, Dropwizard, and Jersey components.</li></ul>
      </td>
    <td><img src="/images/tracing_application_map_service.png" alt="Popup when you click on a service"/></td>
  </tr>
  <tr>
    <td markdown="span">
      **Step 5: Focus on a service**<br/>
      Click on a service and then click <b>Focus on service</b> to focus on the styling service of the beachshirts application.<br/>
      
      This will help you focus on a specific service when you have more than 10 services in your application.
      </td>
    <td><img src="/images/tracing_appmap_focus_service.png" alt="Focus on the styling service"/></td>
  </tr>
  <tr>
    <td markdown="span">
      **Step 6: Hover over a tracing traffic** <br/>
      Hover over the tracing traffic between the styling and shopping service. You see that they send requests to each other.
      
      <br/>When you hover over a tracing traffic (the arrow that goes from one service to the other). It highlights the direction of the requests between the two services. <br/>Tracing traffic is bidirectional if the two services send requests to each other.
      </td>
    <td><img src="/images/tracing_appmap_bidirectional_edge.png" alt="Hover over the styling service"/></td>
  </tr>
  <tr>
    <td>
      <b>Step 7: Click on a tracing traffic</b>
      <br/>When you click on the tracing traffic between the styling and printing service, you can:
        <ul><li>View Request, Error, and Duration (RED) metrics for the specific edge.</li>
        <li> Navigate to the Tracing browser when you click <b>View traces for this traffic</b>.</li></ul>
      </td>
    <td><img src="/images/tracing_application_map_edge.png" alt="The pop up when you click a tracing traffic that is bidirectional"/></td>
  </tr>
</tbody>
</table>

    
## Application Status

Go to the Applications page for a top-level status overview of your instrumented applications.

![app status](images/tracing_application_status.png)

On the Applications page, you can:
* View the status of all instrumented applications, or search for a particular application by applying filters.
  - Apply one or more filters to select application name, cluster, or shard and click **Apply**.
* Inspect RED metrics to obtain a status summary for an application:
  - The total number of requests that are represented by the application's spans.
  - The percentage of the application's spans that contain errors.
  - The span duration (in milliseconds) at the 95th percentile across the application.
* Sort the displayed applications by name or by a RED metric.
* Click an application name for an overview of its services.

## Service Status

When you select an application, you get an overview of its services.

![app services](images/tracing_app_services.png)

On the page for a particular application, you can:
* Examine the services in the application, or search for a particular service by applying filters.
* View the inventory of component frameworks that each service is built on.
* Inspect RED metrics to obtain a status summary for a service:
  - The total number of requests that are represented by the service's spans.
  - The percentage of the service's spans that contain errors.
  - The span duration (in milliseconds) at the 95th percentile across the service.

* Drill down from a service box:
  - Click the name of the service or **Details** to [explore the dashboard for that service](#explore-the-default-service-dashboard).
  - Click **All Traces** to [explore the traces](#explore-traces) that originate in that service.


## Service Dashboard

When you click on a service's **Details**, you can examine a dashboard of metrics to identify potential hot spots, and then drill down to the Traces browser.

### Explore the Default Service Dashboard

The default, read-only dashboard for a service lets you explore that service, however, you can't make changes to the dashboard.

![examine services](images/tracing_services.png)

{% include note.html content="You can add these charts to a dashboard and customize them using [Tracing Templates](ui_dashboards.html#create-a-dashboard-from-a-tracing-template). " %}

On the dashboard for a particular service, you can:
* Select the time and time zone in the task bar to customize the chart time properties.
* Use the **Jump To** pulldown to select a dashboard section:
  - Select **Overview** to examine the RED metrics that are derived from all of the spans for the service. These metrics reflect the health of the service.
  - Select an individual component to examine metrics for just that component of the service. A component could be an instrumented framework (e.g., **Jersey**) or the runtime system (e.g., **JVM**).
  - Select **System** if your environment uses Telegraf and you want to view CPU usage, memory usage, and disk usage.
* Filter the metrics based on the cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
<a name="Tracesbrowser"></a>
* Examine the TopK charts to find out which operations are potential hot spots. The bars represent operations that execute in this component of the service.
* Navigate to the Traces browser.
  * Click a bar on a histogram.
  * Click a bar on a TopK chart.
  * Click the vertical ellipsis in the top right of any chart, click **Traces**, and click a service.
    {% include note.html content="If you don’t see **Traces**, check whether your metrics include `application` and `service point` tags.<br/><br/> These tags are defined when you instrument your application for tracing via [Application tags](trace_data_details.html#application-tags). If your application is already sending this data into Wavefront via the Wavefront proxy, you can add point tags using [Wavefront proxy preprocessor rules](proxies_preprocessor_rules.html#addtag-and-addtagifnotexists)." %}

### Custom Service Dashboard

The standard dashboard for services is read-only. To create a customizable copy:

1. Click **Clone** from the ellipsis menu.
2. In the cloned dashboard, add your own charts or customize the RED metrics charts. 
<!---(Use the [ts_countersum](ts_countersum.html) function to display RED metrics.)-->

After you save the clone, you can find it by name from the **Dashboards** menu of the task bar, and you can use it to drill down to the Traces browser.

### Save Charts in the Service Dashboard

View queries used in the charts of the default service dashboard and save these charts to your dashboard.

<table style="width: 100%;">
  <tr>
    <td width="45%">
      <ol>
        <li>
          Click the chart name to view the chart in edit mode and to view the query used in the chart.
        </li>
        <li>
          Click <strong>Save</strong>.
        </li>
        <li>
          Save the chart to a dashboard: 
          <ul>
            <li>
              To save to an existing dashboard, start typing the name of the dashboard, select a dashboard, and click <strong>Insert</strong>.
            </li>
            <li>
              Click <strong>Save to New Dashboard</strong>, enter the dashboard name and URL, and click <strong>Create</strong>. Specify only the URL string; do not include https://.
            </li>
          </ul>
        </li>
        <li>
          When the target dashboard opens in edit mode, click and drag the chart to the location of your choice and click <strong>Save</strong> at the top.
        </li>
      </ol>
    </td>
    <td markdown="span" width="55%">
      ![Save the chart to a dashboard](/images/tracing_save_charts_to_dashboard.png)
    </td>
  </tr>
</table>

### Troubleshooting 

**Don't see RED metrics or see incorrect RED metrics on your charts?**

Starting with [release 2020-26.x](2020.26.x_release_notes.html), the **span.kind** filter is introduced to the default service dashboard. As a result, if the spans from your OpenTracing application don't have the `span.kind` point tag, the RED metrics you see on the default service dashboard will be incorrect, or you will not see RED metrics on your charts. 

The OpenTracing SDK and Wavefront proxy versions listed below add the `span.kind` tag to the spans. Use the recommended versions to see accurate data on the default service dashboard.

{% include note.html content="If you are using [Wavefront Sender SDKs](tracing_instrumenting_frameworks.html#instrument-your-application-with-wavefront-sender-sdks) and sending data via the Wavefront Proxy, make sure to update to the latest proxy version."%}

<table style="width: 80%;">

  <thead>
  <tr>
    <th width="50%">SDK or Proxy</th>
    <th width="30%">Version</th>
  </tr>
  </thead>
  <tr>
    <td markdown="span">[Wavefront proxy](proxies_installing.html)</td>
    <td>7.0 or later</td>
  </tr>
  <tr>
    <td markdown="span">[Java OpenTracing SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-java)</td>
    <td>v2.1.1 or later</td>
  </tr>
  <tr>
    <td markdown="span">[Go OpenTracing SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-go)</td>
    <td>v0.9.0 or later</td>
  </tr>
  <tr>
    <td markdown="span">[Python OpenTracing SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-python)</td>
    <td>v2.0.0 or later</td>
  </tr>
  <tr>
    <td markdown="span">[C# OpenTracing SDK](https://github.com/wavefrontHQ/wavefront-opentracing-sdk-csharp)</td>
    <td>v2.0.0 or later</td>
  </tr>
  <tr>
    <td markdown="span">[Java Tracing Agent](https://github.com/wavefrontHQ/wavefront-opentracing-bundle-java)</td>
    <td>v1.2.0 or later</td>
  </tr>
</table>


## Tracing Browser

In the Traces browser, you can explore the context and the details of your application's traces.

* Navigate from the service's page to display traces for operations you selected.
* Select **Applications > Traces** from the task bar to display an empty page that you populate by [querying](trace_data_query.html).

![explore trace browser](images/tracing_traces_browser.png)

From the Traces browser, you can:
* Query for traces and view the query results in the [traces list](#query-for-a-list-of-traces).
* Select a trace in the list and:
  - Use the [service map panel](#investigate-the-service-map-for-a-trace) to investigate the services that contribute spans to the trace.
  - Use the [trace details panel](#examine-trace-details) to examine the individual spans in the trace.
* Examine a trace's percentile indicator to see how the trace's duration compares to the durations of the other listed traces.
  You can toggle the panel size for the traces list, service map, or trace details.
* Easily analyze your traces hierarchy and RED metrics by clicking the expand or restore icon. 
  * Click the expand icon to expand the RED metrics and view them next to the trace list, and click the same icon again to restore to the default view.
    ![partial expand red metrics](images/tracing_ui_partial_expand_red_metrics.png)
  * Click the expand icon to expand the trace hierarchy and view them next to the trace list, and click the same icon again to restore to the default view.
    ![partial expand trace hierachy](images/tracing_ui_partial_expand_trace_hierarchy.png)

### Query for a List of Traces

In the Traces browser, you can [use the query builder or query editor](trace_data_query.html) to query for traces that include spans for a particular operation.

You can view the results in a traces list.

![explore traces list](images/tracing_traces_browser_traces_list.png)

Here's how to get started:
1. Add an Operation or Trace ID. See [Get Started with Trace Queries](trace_data_query.html#get-started-with-trace-queries) for details.
2. Click **Add Filter** and specify a filter to limit the results.
3. (Optional) Advanced users can use Query Editor to limit the scope even further.

You can use the trace list to:

* Sort the returned traces according to different criteria.
* Click a trace to view its context in the [service map panel](#investigate-the-service-map-for-a-trace) and its details in the [trace details panel](#examine-trace-details).
* View a trace's percentile indicator to see how the trace's duration compares to the durations of the other listed traces -- and potentially find outliers.

### Investigate the Service Map for a Trace

In the Traces browser, use the service map to investigate the services that contribute spans to a selected trace.

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

Watch this video to see how a service map can help you pinpoint a performance bottleneck in a microservices architecture:

<p><a href="https://youtu.be/7F1TTmSKN7g"><img src="/images/v_tracing_service_map.png" style="width: 700px;" alt="introduction to service maps"/></a>
</p>


### Examine Trace Details

In the Traces browser, use the trace details panel to examine the spans that belong to a selected trace. Some of these spans may represent operations executed by other services.

![trace details](images/tracing_traces_browser_trace_details.png)

In the trace details panel, you can:
* Examine the call hierarchy for a selected trace.
* Click any span to expand and see more detail.
* Explore the trace’s [critical path](#a-closer-look-at-critical-paths). This is an end-to-end sequence of blocking spans, where each blocking span must complete before the trace can complete.


### Drill Down Into Spans and View Metrics and Span Logs

In the trace details panel, you can view details about a particular span in the trace. If that span came from another service, you can navigate to the dashboard for that service.

{% include note.html content="Wavefront can only retrieve up to 1000 spans for a given trace, and you only see up to 1000 spans when you drill down into spans. Therefore, as a best practice and for optimal performance, configure your application to have less than 1000 spans in a trace."%}

![trace span details](images/tracing_span_details_with_logs.png)

Span details include:

* Application tags. These are the application, service, cluster, and shard, as selected by the trace query.
* Other tags, including the trace ID.
* A clickable link to the corresponding dashboard that lets you examine the metrics associated with the call.

If your spans have been instrumented to show span logs, you can click **Logs** to fetch the logs and drill down to examine them. We don't show span logs by default for better browser performance.


### A Closer Look at Critical Paths

The [trace details panel](#examine-trace-details) uses an orange line to show the critical path through a trace. You can think of the critical path as the end-to-end combination of spans that are the most blocking. These spans represent the sequence of operations that must complete before the trace itself can complete.

Analyzing the critical path of a trace can help you determine which operations took the most time, and can help you decide which operations to try to optimize.

We use the following rules to determine which spans to include in a critical path (in order of applicability):
1. Ignore asynchronous spans (spans tagged with `followFrom`).
2. Ignore spans that end before their parent starts.
3. If a child span continues after its parent, ignore that continuation period.
4. Choose longer spans over shorter siblings.
5. Choose later spans over earlier spans.
6. Choose child spans instead of their parent spans.
