---
title: Application Status
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: tracing_ui_overview.html
summary: Overview of services and applications that send data to Tanzu Observability by Wavefront.
---

As part of troubleshooting an application, you need an overview of the services and applications that send data to Tanzu Observability by Wavefront. Use our application map to understand the health of each service, and troubleshoot when your applications or services run into issues. You can see the overall health of each application using the application map, table view, and grid view.

<a name="app_map"></a>

## Application Map Features

The application map gives you an overview of how the applications and services are linked, lets you focus on a specific service, view Request, Error, and Duration (RED) metrics for each service, and the tracing traffic in the application. You can also drill down to the Service Dashboard and Tracing Browser.

This <a href="https://vmwaretv.vmware.com/media/t/1_atlrv7sa" target="_blank">video<img src="/images/video_camera.png" alt="video camera icon"/></a> highlights the application map features and settings:

<iframe id="kmsembed-1_atlrv7sa" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_atlrv7sa/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="application map settings"></iframe>

See the application map:
1. In your web browser, go to your Wavefront instance and log in.
1. From the toolbar, select **Applications** > **Application Status** and click the Application Map icon ( <img src="images/tracing_appmap_appmap_view_icon.png"
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
          Apdex: Update the legend to highlight the data based on the Apdex score. Select <b>Apdex</b> from the dropdown menu. Only <a href="authorization-faq.html#who-is-the-super-admin-user">Super Admin users</a> or users with the <a href="permissions_overview.html"><strong>Applications</strong> permission</a> can configure the threshold (T).
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
          <li>
            <b>Alert Settings</b>: Select the severity of the alert you want to see on the application map. For example, if you select <b>Severe</b>, you see the alerts that have the severity status set to severe marked with a red dot on the application map.
          </li>
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
          <li> Navigate to the Traces Browser when you click <b>View Traces</b>.</li>
          <li>Click <b>Actions</b> to:</li>
          <ul>
            <li> Navigate to the Service Dashboard when you click <b>Dashboard</b>.</li>
            <li>Click <b>Create Alerts</b> to create smart alerts that filter noise and capture true anomalies. See <a href="#create-alerts">Create an alert</a>.</li>
            <li>If an alert you created is firing, you see a red dot with a number on the service. The number indicates how many alerts are firing for a specific service. To see the alerts, click <b>view alerts</b>.</li>
            <li>Click <b>Configure</b> to <a href="tracing_apdex.html">configure the apdex settings</a>. You see this setting only if you are a Super Admin user or a user with the <strong>Applications</strong> permission.</li>
          </ul>
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

## Table View Features

View the list of applications and services. You can see the Request, Error, and Duration (RED) metrics at a glance and sort the data.

See the table view:
1. In your web browser, go to your Wavefront instance and log in.
1. From the toolbar, select **Applications** > **Application Status** and click the Table View icon ( <img src="images/tracing_appmap_table_view_icon.png"
style="vertical-align:text-bottom;width:28px" alt="icon to click to get the table view"/> )

![the image shows the table view of all the applications that send data to Wavefront. It has helpers to show you what to do with each UI section. For example, how to filter applications or services, change the table settings or the legend settings, and how to change back to the application map view or the grid view](images/tracing_table_view.png)

Using the table view, you can:
* Examine the applications and services, or search for a particular application or service by applying filters.
  <br/>You can refine your search further by applying one or more filters, such as the cluster, shard, or span.kind.
* Click the name of the service to drill down to the Service Dashboard.
* Sort data:
  - Sort the application and service names alphabetically.
  - Sort the table in the ascending or descending order of the RED metrics.
* See the change (Δ value) in the RED metrics based on the time you selected for **Compare**.
<br/>For example, if you select **week ago** from the **Compare** drop-down, the Δ value indicate the change in RED metrics since the data was recorded a week ago.
  <br/>![shows the compare option on the table view. The drop down has the values, off (if selected doesn't show the change in value), 2 hours ago, day ago, week ago, and month ago. ](images/tracing_compare_table_view.png)
* Click the vertical ellipsis > **Create Alerts** to create smart alerts that filter noise and capture true anomalies. See [Create an alert](#create-alerts).
* Click the vertical ellipsis > **View Alerts** to view alerts that are firing for the service. The number of alerts firing for the service are shown on the **Alerts** column.
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
        The threshold Apdex threshold of the service. The default threshold value is set to 100ms, and only a [Super Admin user](authorization-faq.html#who-is-the-super-admin-user) or users with the [**Applications** permission](permissions_overview.html) can configure the threshold (T).
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

* Use <img src="images/tracing_link_icon.png"
  style="vertical-align:text-bottom;width:25px" alt="icon to click to get the link"/> to get a link and share what you’re seeing right now (NON-LIVE display) with other users.

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
        Update the legend to highlight the data based on the Apdex score. Select <b>Apdex</b> from the dropdown menu. Only a [Super Admin user](authorization-faq.html#who-is-the-super-admin-user) or users with the [**Applications** permission](permissions_overview.html) can configure the threshold (T).
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

* View specific alerts for a service:
  <table style="width: 100%;">
    <tr>
      <td width="60%" markdown="span">
        Click the settings icons and select the severity of the alert you want to see on the application map under **Alert Settings**. For example, if you select **Severe**, you see the alerts that have the severity status set to severe marked with a red dot on the application map.
      </td>
      <td width="40%" markdown="span">
        ![shows the alert settings that has server, warn, smoke, and info listed. You can select one or more severity state to see alerts on the application map.](images/tracing_app_map_alert_settings.png)
      </td>
    </tr>
  </table>

<a name="grid_view"></a>

## Grid View Features

When you select an application, you get an overview of its services.

See the grid view:
1. In your web browser, go to your Wavefront instance and log in.
1. From the toolbar, select **Applications** > **Application Status** and click the Grid View icon ( <img src="images/tracing_appmap_grid_view_icon.png"
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
* Click **Actions** > **Create Alerts** to create smart alerts that filter noise and capture true anomalies. See [Create an alert](#create-alerts).
* Click **Actions** > **View Alerts** to view alerts that are firing for the service. The number of alerts firing for the service are shown on the red circle next to the service name.
* Drill down from a service box:
  - Click the name of the service or **Details** to explore the dashboard for that service.
  - Click **All Traces** to explore the traces that originate in that service.
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
          Update the legend to highlight the data based on the Apdex score. Select <b>Apdex</b> from the dropdown menu. Only [Super Admin users](authorization-faq.html#who-is-the-super-admin-user) can configure the threshold (T).
        </td>
        <td markdown ="span">
          ![The image shows the setting and the legend setting with apdex selected from the drop down.](images/apdex_score_legend_colors.png)
        </td>
      </tr>
    </table>

* View specific alerts for a service:
  <table style="width: 100%;">
    <tr>
      <td width="60%" markdown="span">
        Click the settings icons and select the severity of the alert you want to see on the application map under **Alert Settings**. For example, if you select **Severe**, you see the alerts that have the severity status set to severe marked with a red dot on the application map.
      </td>
      <td width="40%" markdown="span">
        ![shows the alert settings that has server, warn, smoke, and info listed. You can select one or more severity state to see alerts on the application map.](images/tracing_app_map_alert_settings.png)
      </td>
    </tr>
  </table>

## Create Alerts

[Our smart alerts](alerts.html#how-alerts-work-video) capture true anomalies and filter noise. You can:

* Specify one or more alert targets that receive the alert notification(s).
* Create a multi-threshold alert to notify different targets depending on alert severity.
* View an image of the chart in the alert notification and click a link to see the alert in context.
* Examine firing alerts in Alert Viewer to get context.

Create an alert from the application status page:

1. Navigate to the app map, table view, or grid view:
    <table style = "width: 100;">
      <tr>
        <td markdown ="span">
          **App map view**: <br/>Click on a service and select **Actions** > **Create Alert**, for example, to create an alert for the shopping service:
        </td>
        <td markdown ="span" width="40%">
          ![A screenshot of how to click create alert as explained in the step](images/tracing_app_map_create_alert.png)
        </td>
      </tr>
      <tr>
        <td markdown="span">
          **Table view**: <br/>Click the vertical ellipsis > **Create Alert**.

        </td>
        <td markdown ="span" width="40%">
          ![A screenshot of how to click create alert as explained in the step](images/trace_table_view_create_alert.png)
        </td>
      </tr>
      <tr>
        <td markdown="span">
         **Grid view**: <br/>Click **Actions** > **Create Alert**.
        </td>
        <td markdown ="span">
          ![A screenshot of how to click create alert as explained in the step](images/tracing_grid_view_create_alert.png)
        </td>
      </tr>
    </table>

1. Configure the alert:
    1. You can set the alert conditions based on your data. For example, let's create an alert that fires in the:
      * Severe state for the shopping service when the error percentage is greater than 6%
      * Warn state when it is greater than 3%.
      See [Create and Manage Alerts](alerts_manage.html) for details.
    1. [Create an alert target](webhooks_alert_notification.html) to receive alert notifications for a variety of messaging platforms (email, pager services) and communication channels.
      <br/>You can also customize your alert targets to [include a link to a service dashboard when the alert fires](alert_target_customizing.html#include-a-link-to-a-tracing-service-dashboard).
    1. Optionally, [use alert tags](alerts.html#step-5-organize-related-alerts-with-tags) to organize related alerts into categories.
1. Click **Create Alert**.

<!---
  ![Create an alert from the table view page.](images/tracing_creating_an_alert_app_map.png)--->

Once the alert is created, click **Alerting > All Alerts** and search for the alert you created .
