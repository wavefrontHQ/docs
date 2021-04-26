---
title: Application Status
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_ui_overview.html
summary: Get an overview of the services and applications that send data to Wavefront.
---

It is important to get an overview of the services and applications that send data to Wavefront, understand the health of each service, and troubleshoot when your applications or services run into issues. You can get an overview and see the overall health of each application using the application map, table view, and grid view.


{% include note.html content="This page refers to the Apdex functionality in a few places. This feature is rolled out with release 2020.42." %}

<a name="app_map"></a>

## Application Map

The application map gives you an overview of how the applications and services are linked, lets you focus on a specific service, view Request, Error, and Duration (RED) metrics for each service, and the tracing traffic in the application. You can also drill down to the Service Dashboard and Tracing Browser.

This video highlights the application map features and settings:

<iframe src="https://bcove.video/3oDxXaa" width="700" height="400" allowfullscreen="true" alt="Wavefront intro how-to"></iframe>

See the application map:
1. In your web browser, go to your Wavefront cluster and log in.
1. From the taskbar, click **Applications** > **Application Status** and select the Application Map icon ( <img src="images/tracing_appmap_appmap_view_icon.png"
style="vertical-align:text-bottom;width:28px" alt="icon to click to get the application map view"/> )
1. Optionally, use <img src="images/tracing_link_icon.png"
style="vertical-align:text-bottom;width:20px" alt="icon to click to get the link"/> to get a link and share what you’re seeing right now (NON-LIVE display) with other users.

Let's walk through the following scenario to get a quick overview of the application map.

<table style="width: 100%;">
<thead>
<tr><th width="55%">Action</th><th width="45%">Result</th></tr>
</thead>
<tbody>
  <tr>
    <td>
      <b>Step 1:  Search for applications</b> <br/>
      Click <b>Application/Service</b>, select <b>beachshirts</b>, and click <b>Search</b>.<br/>

      You can refine your search further by applying one or more filters, such as the cluster, shard, or span.kind.
      
      <br/><br/>You see the data that match your search filters and the nearest neighboring service. For example, if you filter for the beachshirts application's styling service, you only see the services that directly communicate with the styling service.
      
      </td>
    <td><img src="/images/tracing_appmap_search_application.png" alt="Search for the beachshirts application using tags"/>
    <a name="appmap"></a>
    </td>
  </tr>
  <tr>
    <td>
    <b>Step 2: Update the legend</b> <br/>
    Click the settings icon and select Apdex, Error, or Duration. These settings can be configured by each user and apply to the table view, and grid view too.
      <ul>
        <li>
          Error Percentage: Update the legend to highlight the data based on the error percentage. Select <b>Error 	&#37;</b> from the dropdown and customize the values. The values need to be in ascending order.
        </li>
        <li>
          Duration: Update the legend to highlight the data based on the duration. Select <b>Duration</b> from the dropdown menu and customize the values. The values need to be in ascending order and in milliseconds.
        </li>
        <li>
          Apdex: Update the legend to highlight the data based on the Apdex score. Select <b>Apdex</b> from the dropdown menu. Only <a href="authorization.html#who-is-the-super-admin-user">Super Admin users</a> can configure the threshold (T).
        </li>
      </ul>
    </td>
    <td markdown="span">
      ![Shows the settings to update the legend for the error %. You need to select error % from the drop down and then add the values in ascending order.](images/tracing_legend_settings_app_map.png)
    </td>
  </tr>
  <tr>
    <td>
      <b>Step 3:  Customize the application map view</b> <br/>
      You can customize how you see your applications and services on the application map using the settings icon.
      <ul>
        <li>
          <b>Service layout</b>: View the services in the default, concentric, circle, or grid layout. Choose the layout that helps you understand how your services are linked.
        </li>
        <li>
          <b>Show Isolated Services</b>: These are services that don't interact with any other services or applications.
        </li>
        <li>
          <b>Show External Service</b>: These are external applications or services, such as AWS services or Database services, your application communicates with. You can group these services too.
        </li>
          <ul>
            <li>
              <b>Group External Services</b>: Select this setting if you want to group services. For example, group all the database services and view it as a single external service.
            </li>
          </ul>
        <li><b>Show Service Labels</b>: When you have many services in an application, the service names on the application map look cluttered. To get a clear view of your application and services, disable the <b>Show Service Labels</b> option or select <b>Fade Labels on Zoom</b>. </li>
          <ul>
            <li>
              <b>Fade Labels on Zoom</b>: Hide labels of small services and gradually expose them as you zoom in on the application map. You always see the labels of the services in red, based on the legend settings you select.
            </li>
            <li>
              <b>Show Node Counts</b>: Shows the number of instances of a service running in an application. For example, <b>shopping (5)</b> shows you that there are five instances of the shopping service in the beachshirts application.
            </li>
          </ul>
      </ul>
      </td>
    <td>
      <img src="images/tracing_application_map_settings.png" alt="screenshot of the application map settings. The settings are explained on the left side."/>
    </td>
  </tr>
  <tr>
    <td markdown="span">
      **Step 4: Hover over a service** <br/>
      Hover over the styling service of the beachshirts application. It highlights how the styling service communicates with the other services in the application.
      </td>
    <td><img src="/images/tracing_appmap_hover_over_service.png" alt="Hover over the styling service"/></td>
  </tr>
  <tr>
    <td>
      <b>Step 5: Click on a service</b>
      <br/>Click on the styling service. Now, you can:
        <ul>
          <li>View Request, Error, and Duration (RED) metrics of the specific service.</li>
          <li>See how the service is performing using the Apdex score.</li>
          <li> View how a specific service communicates with the other services in an application when you click <b>Focus</b>.</li>
          <li> Navigate to the Service Dashboard when you click <b>Dashboard</b>.</li>
          <li> Navigate to the Traces Browser when you click <b>Traces</b>.</li>
          <li> See the components used by the service. The styling service uses the OpenTracing, Java, Dropwizard, and Jersey components.</li>
        </ul>
      </td>
    <td><img src="/images/tracing_application_map_service.png" alt="Popup when you click on a service"/></td>
  </tr>
  <tr>
    <td markdown="span">
      **Step 6: Focus on a service**<br/>
      Click on a service and then click <b>Focus on service</b> to focus on the styling service of the beachshirts application.<br/>

      This will help you focus on a specific service when you have many services in your application.
      </td>
    <td><img src="/images/tracing_appmap_focus_service.png" alt="Focus on the styling service"/></td>
  </tr>
  <tr>
    <td markdown="span">
      **Step 7: Hover over a tracing traffic** <br/>
      Hover over the tracing traffic between the styling and shopping service. You see that they send requests to each other.

      <br/>When you hover over a tracing traffic (the arrow that goes from one service to the other). It highlights the direction of the requests between the two services. <br/>Tracing traffic is bidirectional if the two services send requests to each other.
      </td>
    <td><img src="/images/tracing_appmap_bidirectional_edge.png" alt="Hover over the styling service"/></td>
  </tr>
  <tr>
    <td>
      <b>Step 8: Click on a tracing traffic</b>
      <br/>When you click on the tracing traffic between the styling and printing service, you can:
        <ul><li>View Request, Error, and Duration (RED) metrics for the specific edge.</li>
        <li> Navigate to the Traces Browser when you click <b>View traces for this traffic</b>.</li>
        <li> Navigate to the Operation Dashboard to view RED metrics of the inbound and outbound operations when you click <b>View styling dashboard (outbound)</b> or <b>View printing dashboard (inbound)</b>.</li>
        </ul>
      </td>
    <td><img src="/images/tracing_application_map_edge.png" alt="The pop up when you click a tracing traffic that is bidirectional"/></td>
  </tr>
</tbody>
</table>

<a name="table_view"></a>

## Table View

View the list of applications and services. You can see the Request, Error, and Duration (RED) metrics at a glance and sort the data.

See the table view:
1. In your web browser, go to your Wavefront cluster and log in.
1. From the taskbar, click **Applications** > **Application Status** and select the Table View icon ( <img src="images/tracing_appmap_table_view_icon.png"
style="vertical-align:text-bottom;width:28px" alt="icon to click to get the table view"/> )

![the image shows the table view of all the applications that send data to Wavefront. It has helpers to show you what to do with each UI section. For example, how to filter applications or services, change the table settings or the legend settings, and how to change back to the application map view or the grid view](images/tracing_table_view.png)

Using the table view, you can:
* Examine the applications and services, or search for a particular application or service by applying filters. 
  <br/>You can refine your search further by applying one or more filters, such as the cluster, shard, or span.kind.
* Click the name of the service to [drill down to the Service Dashboard](#explore-the-default-service-dashboard).
* Sort data:
  - Sort the application and service names alphabetically.
  - Sort the table in the ascending or descending order of the RED metrics.
* See the change (Δ value) in the RED metrics based on the time you selected for **Compare**.
<br/>For example, if you select **week ago** from the **Compare** drop-down, the Δ value indicate the change in RED metrics since the data was recorded a week ago.
  <br/>![shows the compare option on the table view. The drop down has the values, off (if selected doesn't show the change in value), 2 hours ago, day ago, week ago, and month ago. ](images/tracing_compare_table_view.png)
* Inspect the Apdex score and RED metrics to obtain a status summary of a service.
  <table style = "width: 100%;">
    <tr>
      <th width = "20%">Table Data</th>
      <th width = "80%">Description</th>
    </tr>
    <tr>
      <td>
        Apdex
      </td>
      <td markdown="span">
        Shows you how the response time of a service compares to the predefined response time threshold.
      </td>
    </tr>
    <tr>
      <td>
        Apdex Threshold
      </td>
      <td markdown="span">
        The threshold Apdex threshold of the service. The default threshold value is set to 100ms, and only [Super Admin users](authorization.html#who-is-the-super-admin-user) can configure the threshold.
      </td>
    </tr>
    <tr>
      <td>
        Request Rate
      </td>
      <td>
        The request rate of the service.
      </td>
    </tr>
    <tr>
      <td>
        &#916; Request Rate
      </td>
      <td>
        The difference between:
        <ul>
          <li>The current request rate</li>
          <li>The request rate at the Compare option time.</li>
        </ul>
        This difference is also shown as a percentage.
      </td>
    </tr>
    <tr>
      <td>
        Error %
      </td>
      <td>
        The percentage of the service's spans that contain errors.
      </td>
    </tr>
    <tr>
      <td>
        &#916; Error %
      </td>
      <td>
        The difference between:
        <ul>
          <li>The current error percentage</li>
          <li>The error percentage at the Compare option time.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        Duration (P95)
      </td>
      <td>
        The span duration at the 95th percentile across the service.
      </td>
    </tr>
    <tr>
      <td>
        &#916; Duration (P95)
      </td>
      <td>
        The difference between:
        <ul>
          <li>The current duration (P95)</li>
          <li>The duration (P95) at the Compare option time.</li>
        </ul>
        This difference is also shown as a percentage.
      </td>
    </tr>
    <tr>
      <td>
        Component
      </td>
      <td>
        See the components used by the service. For example, the beachshirts application's styling service uses the OpenTracing, Java, Dropwizard, and Jersey components.
      </td>
    </tr>

  </table>

* Update the legend by clicking the settings icon. These settings can be configured by each user and apply to the application map, and grid view too.
  <table style = "width: 100;">
    <tr>
      <td markdown ="span">
        **Error Percentage** <br/>
        Update the legend to highlight the data based on the error percentage. Select **Error %** from the dropdown and customize the values. The values need to be in ascending order.
      </td>
      <td markdown ="span">
        ![Shows the settings to update the legend for the error %. You need to select error % from the drop down and then add the values in ascending order.](images/tracing_table_view_error_legend.png)
      </td>
    </tr>
    <tr>
      <td markdown="span">
        **Duration** <br/>
        Update the legend to highlight the data based on the duration. Select **Duration** from the dropdown menu and customize the values. The values need to be in ascending order and in milliseconds.
      </td>
      <td markdown ="span">
        ![Shows the settings to update the legend for the duration. You need to select duration from the drop down and then add the values in ascending order.](images/tracing_table_view_duration_legend.png)
      </td>
    </tr>
    <tr>
      <td markdown="span">
        **Apdex** <br/>
        Update the legend to highlight the data based on the Apdex score. Select <b>Apdex</b> from the dropdown menu. Only [Super Admin users](authorization.html#who-is-the-super-admin-user) can configure the threshold (T).
      </td>
      <td markdown ="span">
        ![The image shows the setting and the legend setting with apdex selected from the drop down.](images/apdex_score_legend_colors.png)
      </td>
    </tr>
  </table>
* Click the settings icon to customize the table view:
  <table>
    <tr>
      <td>
        <ul>
          <li>Group the services by the application or ungroup the services.</li>
          <li>Add or remove columns by selecting or deselecting items from the table settings options.</li>
        </ul>
      </td>
      <td markdown="span">
        ![Shows the settings to customize the table view. Select or deselect the settings to customize the table.](images/tracing_table_view_table_settings.png)
      </td>
    </tr>
  </table>
* Click the vertical ellipsis to drill down to the Service Dashboard, Operation Dashboard, or Traces Browser.
* Use <img src="images/tracing_link_icon.png"
style="vertical-align:text-bottom;width:25px" alt="icon to click to get the link"/> to get a link and share what you’re seeing right now (NON-LIVE display) with other users.

<a name="grid_view"></a>

## Grid View

When you select an application, you get an overview of its services.

See the grid view:
1. In your web browser, go to your Wavefront cluster and log in.
1. From the taskbar, click **Applications** > **Application Status** and select the Grid View icon ( <img src="images/tracing_appmap_grid_view_icon.png"
style="vertical-align:text-bottom;width:28px" alt="icon to click to get the table view"/> )

![Shows how the offline traces look once you upload the JSOn file that has the imported trace details.](images/tracing_app_services.png)

On the page for a particular application, you can:
* Examine the services in the application, or search for a particular service by applying filters.
  <br/>You can refine your search further by applying one or more filters, such as the cluster, shard, or span.kind.
* View the inventory of component frameworks that each service is built on.
* Inspect RED metrics to obtain a status summary for a service:
  - The request rate of the service.
  - The percentage of the service's spans that contain errors.
  - The span duration at the 95th percentile across the service.
* Drill down from a service box:
  - Click the name of the service or **Details** to [explore the dashboard for that service](#explore-the-default-service-dashboard).
  - Click **All Traces** to [explore the traces](#explore-traces) that originate in that service.
* Update the legend by clicking the settings icon. These settings can be configured by each user and apply to the application map, and table view too.
    <table style = "width: 100;">
      <tr>
        <td markdown ="span">
          **Error Percentage** <br/>
          Update the legend to highlight the data based on the error percentage. Select **Error %** from the dropdown and customize the values. The values need to be in ascending order.
        </td>
        <td markdown ="span">
          ![Shows the settings to update the legend for the error %. You need to select error % from the drop down and then add the values in ascending order.](images/tracing_table_view_error_legend.png)
        </td>
      </tr>
      <tr>
        <td markdown="span">
          **Duration** <br/>
          Update the legend to highlight the data based on the duration. Select **Duration** from the dropdown menu and customize the values. The values need to be in ascending order and in milliseconds.
        </td>
        <td markdown ="span">
          ![Shows the settings to update the legend for the duration. You need to select duration from the drop down and then add the values in ascending order.](images/tracing_table_view_duration_legend.png)
        </td>
      </tr>
      <tr>
        <td markdown="span">
          **Apdex** <br/>
          Update the legend to highlight the data based on the Apdex score. Select <b>Apdex</b> from the dropdown menu. Only [Super Admin users](authorization.html#who-is-the-super-admin-user) can configure the threshold (T).
        </td>
        <td markdown ="span">
          ![The image shows the setting and the legend setting with apdex selected from the drop down.](images/apdex_score_legend_colors.png)
        </td>
      </tr>
    </table>

<!--

## Service Dashboard

Use the Service Dashboard identify potential hot spots, and then drill down to the Traces Browser.

See the Service Dashboard:

* Option 1:
  1. In your web browser, go to your Wavefront cluster and log in.
  1. From the taskbar, click **Applications** > **Service Dashboard**.

* Option 2:
  Drill down to the Service Dashboard from the application map, table view, or grid view.

### Explore the Default Service Dashboard

The default, read-only dashboard for a service lets you explore that service, however, you can't make changes to the dashboard.

![examine services](images/tracing_services.png)

{% include note.html content="You can add these charts to a dashboard and customize them using [Tracing Templates](ui_dashboards.html#create-a-dashboard-from-a-tracing-template). " %}

On the dashboard for a particular service, you can:
* Select the time and time zone in the taskbar to customize the chart time properties.
* Use the **Jump To** pulldown to select a dashboard section:
  - Select **Overview** to examine the RED metrics that are derived from all of the spans for the service. These metrics reflect the health of the service.
  - Select an individual component to examine metrics for just that component of the service. A component could be an instrumented framework (e.g., **Jersey**) or the runtime system (e.g., **JVM**).
  - Select **System** if your environment uses Telegraf and you want to view CPU usage, memory usage, and disk usage.
* Filter the metrics based on the cluster, shard, or source.
* Select **Detailed View** or **Summarized View** to change the level of detail for charts.
<a name="Tracesbrowser"></a>
* Examine the TopK charts to find out which operations are potential hot spots. The bars represent operations that execute in this component of the service.
* Use <img src="images/tracing_link_icon.png"
style="vertical-align:text-bottom;width:25px" alt="icon to click to get the link"/> to get a link and share what you’re seeing right now (NON-LIVE display) with other users.
* Navigate to the Traces Browser.
  * Click a bar on a histogram.
  * Select a region of the histogram chart and click **Search Traces** to view the traces for the selected duration.
  * Click a bar on a TopK chart.
  * Click the vertical ellipsis in the top right of any chart, click **Traces**, and click a service.
    {% include note.html content="If you don’t see **Traces**, check whether your metrics include `application` and `service point` tags.<br/><br/> These tags are defined when you instrument your application for tracing via [Application tags](trace_data_details.html#application-tags). If your application is already sending this data into Wavefront via the Wavefront proxy, you can add point tags using [Wavefront proxy preprocessor rules](proxies_preprocessor_rules.html#addtag-and-addtagifnotexists)." %}

### Custom Service Dashboard

The standard dashboard for services is read-only. To create a customizable copy:

1. Click **Clone** from the ellipsis menu.
2. In the cloned dashboard, add your own charts or customize the RED metrics charts.

After you save the clone, you can find it by name from the **Dashboards** menu of the taskbar, and you can use it to drill down to the Traces Browser.

### Save Charts in the Service Dashboard

View queries used in the charts of the default Service Dashboard and save these charts to your dashboard.

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

Starting with [release 2020-26.x](2020.26.x_release_notes.html), the **span.kind** filter is introduced to the default Service Dashboard. As a result, if the spans from your OpenTracing application don't have the `span.kind` point tag, the RED metrics you see on the default Service Dashboard will be incorrect, or you will not see RED metrics on your charts.

The OpenTracing SDK and Wavefront proxy versions listed below add the `span.kind` tag to the spans. Use the recommended versions to see accurate data on the default Service Dashboard.

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

<a name="traces"></a>

## Traces Browser

In the Traces Browser, you can explore the context and the details of your application's traces.

See the Traces Browser:

* Option 1:
  1. In your web browser, go to your Wavefront cluster and log in.
  1. From the taskbar, click **Applications** > **Traces**.

* Option 2:
  Drill down to the Traces Browser from the Service Dashboard, application map, table view, or grid view.

![explore trace browser](images/tracing_traces_browser.png)

From the Traces Browser, you can:
* Query for traces and view the query results in the [traces list](#query-for-a-list-of-traces).
* Select a trace in the list and:
  - Use the [service map panel](#investigate-the-service-map-for-a-trace) to investigate the services that contribute spans to the trace.
  - Use the [trace details panel](#examine-trace-details) to examine the individual spans in the trace.
* Examine a trace's percentile indicator to see how the trace's duration compares to the durations of the other listed traces.
  You can toggle the panel size for the traces list, service map, or trace details.
* Export traces by clicking <img src="images/tracing_import_traces.png"
style="vertical-align:text-bottom;width:25px" alt="import tracing icon"/>, save the JSON file, and view them later using [Offline Traces](#view-traces-offline).
* Easily analyze your traces hierarchy and RED metrics by clicking the expand or restore icon.
  * Click the expand icon to expand the RED metrics and view them next to the trace list, and click the same icon again to restore to the default view.
    ![partial expand red metrics](images/tracing_ui_partial_expand_red_metrics.png)
  * Click the expand icon to expand the trace hierarchy and view them next to the trace list, and click the same icon again to restore to the default view.
    ![partial expand trace hierachy](images/tracing_ui_partial_expand_trace_hierarchy.png)
* Use <img src="images/tracing_link_icon.png"
style="vertical-align:text-bottom;width:25px" alt="icon to click to get the link"/> to get a link and share what you’re seeing right now (NON-LIVE display) with other users.

### Query for a List of Traces

In the Traces Browser, you can [use the query builder or query editor](trace_data_query.html) to query for traces that include spans for a particular operation.

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

Watch this video to see how a service map can help you pinpoint a performance bottleneck in a microservices architecture:

<p><a href="https://youtu.be/7F1TTmSKN7g"><img src="/images/v_tracing_service_map.png" style="width: 700px;" alt="introduction to service maps"/></a>
</p>


### Examine Trace Details

In the Traces Browser, use the trace details panel to examine the spans that belong to a selected trace. Some of these spans may represent operations executed by other services.

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

<a name="offline_traces"></a>

## View Traces Offline

You can export traces from Wavefront, save them locally as JSON files, and view them later using the **Offline Traces**.

1. Export Traces:
    - Export the traces via the [Traces Browser](#traces-browser) and save the JSON file.
    - Export traces via the API.
      - Use the Wavefront Swagger UI. See [API Documentation (Wavefront Instance)](wavefront_api.html#api-documentation-wavefront-instance) for details on navigating to the Wavefront Swagger UI.
        <br/>Example:
        ![UI image showing where the API is on the Wavefront Swagger UI.](images/tracing_import_tracing_swagger_UI.png)
      - Use a `curl` command that has the `/api/v2/chart/api` URL.
        <br/>Example:
        ```
        curl -X GET --header "Accept: application/json" --header "Authorization: Bearer <Wavefront_Token>" "https://<Tenant_Name>.wavefront.com/api/v2/chart/api?q=limit(100%2C%20traces(spans(%22beachshirts.shopping.*%22)))&s=1601894248&g=d&view=METRIC&sorted=false&cached=true&useRawQK=false"
        ```
1. Upload the JSON file or feed the JSON response from the API to offline traces, and view trace data. You can only upload one JSON file at a time.
    1. Click **Applications** > **Offline Traces**.
    1. Click **Upload JSON**, select the JSON file you saved that has the imported trace data, and click **Open**.
  <br/>Now, you see the trace data you imported.
  ![Shows how the offline traces look once you upload the JSOn file that has the imported trace details.](images/tracing_offline_tracing_view.png)

  -->
