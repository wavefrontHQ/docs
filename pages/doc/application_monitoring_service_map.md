---
title: Service Map
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: service_map.html
summary: Overview of how a specific service communicates with the other services in the application.
---

When you troubleshoot an application, you need an overview of how a service communicates with the other services. The Service map helps you visualize this information.

## Service Map Features

The service map lets you focus on a specific service, view Request, Error, and Duration (RED) metrics for each service, and the tracing traffic for that service. You can also drill down to the Service Dashboard and Tracing Browser.


See the service map:
1. Log in to your service instance.
1. From the toolbar, select **Applications** > **Service and Applications**.
    1. Table view: Click **Service Map** for a specific service.
    1. Grid view: Click **Actions** > **View Service Map** for a specific service.

Let's walk through the following scenario and get a quick overview of the application map.

### Add More Services

<table style="width: 100%;">
<tbody>
  <tr>
    <td width="55%">
      Click the dropdown next to <b>Operation</b>, select the service you want to see on the map, and click <b>Search</b>.<br/>

      You can refine your search by applying one or more filters, such as the cluster, shard, or span.kind.

      <br/><br/>You see the data that match your search filters and the nearest neighboring service. For example, if you filter for the beachshirts application's styling service, you only see the services that directly communicate with the styling service.

      </td>
    <td width="45%"><img src="/images/service_map_add_services.png" alt="Search for the beachshirts application using tags"/>
    <a name="appmap"></a>
    </td>
  </tr>
</tbody>
</table>

### Customize the Service Map View

<table style="width: 100%;">
<tbody>
  <tr>
    <td>
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
        <li><b>Show Service Labels</b>: When you have many services in an application, the service names on the service map look cluttered. To get a clear view of your application and services, disable the <b>Show Service Labels</b> option or select <b>Fade Labels on Zoom</b>. </li>
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
</tbody>
</table>


### Click on a Service

<table style="width: 100%;">
<tbody>
    <tr>
    <td>
      Click on the styling service. Now, you can:
        <ul>
          <li>View Request, Error, and Duration (RED) metrics of the specific service.</li>
          <li>See how the service is performing using the Apdex score.</li>
          <li> View how a specific service communicates with the other services in an application when you click <b>Focus</b>.</li>
          <li> Navigate to the Traces Browser when you click <b>View Traces</b>.</li>
          <li>Click <b>Actions</b> to:</li>
          <ul>
            <li> Navigate to the Traces Browser when you click <b>View Traces</b>.</li>
            <li> Navigate to the Operation Dashboard when you click <b>View Operaion Dashboard</b>.</li>
            <li> Navigate to the Service Dashboard when you click <b>View Service Dashboard</b>.</li>
            <li> Navigate to the Log Browser when you click <b>View Logs</b>. For details, see the section  [Drill into Logs from Traces](#drill-into-logs-from-traces) below.</li>
            <li>Click <b>Create Alerts</b> to create smart alerts that filter noise and capture true anomalies. See <a href="#create-alerts">Create an alert</a>.</li>
            <li>If an alert you created is firing, you see a red dot with a number on the service. The number indicates how many alerts are firing for a specific service. To see the alerts, click <b>view alerts</b>.</li>
            <li>Click the edit icon next to the Apdex score to <a href="tracing_apdex.html">configure the apdex settings</a>. You see this setting only if you are a Super Admin user or a user with the <strong>Applications</strong> permission.</li>
          </ul>
        </ul>
      </td>
    <td><img src="/images/tracing_application_map_service.png" alt="Popup when you click on a service"/></td>
  </tr>
</tbody>
</table>

### Click on a tracing traffic

<table style="width: 100%;">
<tbody>
    <tr>
    <td>
      When you click on the tracing traffic between the styling and printing service, you can:
        <ul><li>View Request, Error, and Duration (RED) metrics for the specific edge.</li>
        <li> Navigate to the Traces Browser when you click <b>View traces for this traffic</b>.</li>
        <li> Navigate to the Operation Dashboard to view RED metrics of the inbound and outbound operations when you click <b>View styling dashboard (outbound)</b> or <b>View printing dashboard (inbound)</b>.</li>
        </ul>
      </td>
    <td><img src="/images/service_map_tracing_traffic.png" alt="The pop up when you click a tracing traffic that is bidirectional"/></td>
  </tr>
</tbody>
</table>

### Update the Legend

<table style="width: 100%;">
<tbody>
  <tr>
    <td>
      Click the settings icon and select Apdex, Error, or Duration. These settings can be configured by each user.
      <ul>
        <li>
          Error Percentage: Update the legend to highlight the data based on the error percentage. Select <b>Error 	&#37;</b> from the dropdown and customize the values. The values need to be in ascending order.
        </li>
        <li>
          Duration: Update the legend to highlight the data based on the duration. Select <b>Duration</b> from the dropdown menu and customize the values. The values need to be in ascending order and in milliseconds.
        </li>
        <li>
          Apdex: Update the legend to highlight the data based on the Apdex score. Select <b>Apdex</b> from the dropdown menu. Only Super Admin users and users with the <a href="permissions_overview.html"><strong>Applications</strong> permission</a> can configure the threshold (T).
        </li>
      </ul>
    </td>
    <td markdown="span">
      ![Shows the settings to update the legend for the error %. You need to select error % from the drop down and then add the values in ascending order.](images/tracing_legend_settings_app_map.png)
    </td>
  </tr>
</tbody>
</table>
