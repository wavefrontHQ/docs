---
title: Services and Applications Page (Controlled Release)
keywords: data, distributed tracing
tags: [tracing]
sidebar: doc_sidebar
permalink: service_and_application_view.html
summary: Overview of services and applications that send data to VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront).
---

{% include important.html content="This feature is enabled only for selected customers. To participate, contact your account representative or [technical support](wavefront_support_feedback.html#support)."%}

As part of troubleshooting an application, you need an overview of the services and applications that send data to Operations for Applications. Use the table view or grid view to understand the health of each service, and troubleshoot when your applications or services run into issues.

{% include note.html content="If you are using eBPF, you don't send traces to our service. Therefore, you don't see the option to drill down to the Traces Browser." %}

<a name="table_view"></a>

## Table View Features

View the list of applications and services. You can see the Request, Error, and Duration (RED) metrics at a glance and sort the data.

To load the table view:
1. Log in to your service instance.
1. From the toolbar, select **Applications** > **Application Status** and click the **Table View** icon ( <img src="images/tracing_appmap_table_view_icon.png"
style="vertical-align:text-bottom;width:28px" alt="icon to click to get the table view"/> )

![the image shows the table view of all the applications that send data to Operations for Applications. It has helpers to show you what to do with each UI section. For example, how to filter applications or services, change the table settings or the legend settings, and how to change back to the application map view or the grid view](images/application_monitoring_table_view.png)

Using the table view, you can:
* Examine the applications and services, or search for a particular application or service by applying filters.
  <br/>You can refine your search further by applying one or more filters, such as the cluster, shard, or span.kind.
* Click the name of a service to drill down to the Service Dashboard.
* In the View column, click **Service Map** to see how a specific service communicates with the other services in the application.
* Sort data:
  - Sort by application and service names.
  - Sort by cluster names.
* Create smart alerts that filter noise and capture true anomalies by clicking the ellipsis icon and selecting **Create Alert**. See [Create an alert](#create-alerts).
* View the alerts that fire for a service by clicking the ellipsis icon and selecting **View Alerts**. The number of alerts that fire for the service are shown in the **Alerts** column.
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
        The threshold Apdex threshold of the service. The default threshold value is set to 100ms, and only Super Admins or users who have the **Applications** permission can configure the threshold (T).
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
        Error %
      </td>
      <td>
        The percentage of the service's spans that contain errors.
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
  </table>

* Get a link and share what you’re seeing right now (NON-LIVE display) with other users by clicking **Share**.

<a name="grid_view"></a>

## Grid View Features

When you select an application, you get an overview of its services.

To load the grid view:
1. Log in to your service instance.
1. From the toolbar, select **Applications** > **Application Status** and click the Grid View icon ( <img src="images/tracing_appmap_grid_view_icon.png"
style="vertical-align:text-bottom;width:28px" alt="icon to click to get the table view"/> )

![Shows how the offline traces look once you upload the JSOn file that has the imported trace details.](images/application_monitoring_grid_view.png)

On the page for a particular application, you can:
* Examine the services in the application, or search for a particular service by applying filters.
* Inspect RED metrics to obtain a status summary for a service:
  - The request rate of the service.
  - The percentage of the service's spans that contain errors.
  - The span duration at the 95th percentile across the service.
* See how s specific service communicates with the other services in the application by clicking **Actions** > **View Service Map**.
* Create smart alerts that filter noise and capture true anomalies by clicking **Actions** > **Create Alerts**. See [Create an alert](#create-alerts).
* View alerts that fire for a service by clicking **Actions** > **View Alerts**. The number of alerts firing for the service are shown on the red box next to the service name.
* Drill down from a service:
  - Explore the dashboard for a service by clicking the name of the service or **Actions** > **Service Dashboard**.
  - Explore the traces that originate in a service by clicking **View Traces**.
* Get a link and share what you’re seeing right now (NON-LIVE display) with other users by clicking **Share**.

## Update Legend Settings

Update the legend by clicking the **Settings** icon. These settings can be configured by each user and apply to the table and grid view.

  <table style = "width: 100;">
    <tr>
      <td markdown ="span">
        **Error Percentage** <br/>
        Update the legend to highlight the data based on the error percentage. Select **Error %** from the dropdown and customize the values. The values must be in ascending order.
      </td>
      <td markdown ="span">
        ![Shows the settings to update the legend for the error %. You need to select error % from the drop down and then add the values in ascending order.](images/tracing_table_view_error_legend.png)
      </td>
    </tr>
    <tr>
      <td markdown="span">
        **Duration** <br/>
        Update the legend to highlight the data based on the duration. Select **Duration** from the dropdown menu and customize the values. The values must be in ascending order and in milliseconds.
      </td>
      <td markdown ="span">
        ![Shows the settings to update the legend for the duration. You need to select duration from the drop down and then add the values in ascending order.](images/tracing_table_view_duration_legend.png)
      </td>
    </tr>
    <tr>
      <td markdown="span">
        **Apdex** <br/>
        Update the legend to highlight the data based on the Apdex score. Select <b>Apdex</b> from the dropdown menu. Only Super Admins or users who have the **Applications** permission can configure the threshold (T).
      </td>
      <td markdown ="span">
        ![The image shows the setting and the legend setting with apdex selected from the drop down.](images/apdex_score_legend_colors.png)
      </td>
    </tr>
    <tr>
      <td width="60%" markdown="span">
        **Alert Settings** <br/>
        Under **Alert** Settings, select the severity of the alert you want to see on the table view or grid view. 
        For example, if you select **Severe**, you see the alerts that have the severity status set to severe marked with a red dot on the application map.
      </td>
      <td width="40%" markdown="span">
        ![shows the alert settings that has server, warn, smoke, and info listed. You can select one or more severity state to see alerts on the application map.](images/tracing_app_map_alert_settings.png)
      </td>
    </tr>
  </table>

## Create Alerts

[Our smart alerts](alerts.html#how-alerts-work-video) capture true anomalies and filter noise. You can:

* Specify one or more alert targets that receive the alert notifications.
* Create a multi-threshold alert to notify different targets depending on alert severity.
* View an image of the chart in the alert notification and click a link to see the alert in context.
* Examine firing alerts in Alert Viewer to get context.

Create an alert from the application status page:

1. Navigate to the table view, or grid view:
    <table style = "width: 100;">
      <tr>
        <td markdown="span">
          **Table view**: <br/>Click the ellipsis icon and select **Create Alert**.

        </td>
        <td markdown ="span" width="40%">
          ![A screenshot of how to click create alert as explained in the step](images/app_monitoring_trace_table_view_create_alert.png)
        </td>
      </tr>
      <tr>
        <td markdown="span">
         **Grid view**: <br/>Click **Actions** and select **Create Alert**.
        </td>
        <td markdown ="span">
          ![A screenshot of how to click create alert as explained in the step](images/app_monitoring_tracing_grid_view_create_alert.png)
        </td>
      </tr>
    </table>

1. Configure the alert:
    1. You can set the alert conditions based on your data. For example, let's create an alert that fires in the:
      * Severe state for the shopping service when the error percentage is greater than 6%
      * Warn state when the error percentage it is greater than 3%.
      See [Create and Manage Alerts](alerts_manage.html) for details.
    1. [Create an alert target](webhooks_alert_notification.html) to receive alert notifications for a variety of messaging platforms (email, pager services) and communication channels.
      <br/>You can also customize your alert targets to [include a link to a service dashboard when the alert fires](alert_target_customizing.html#include-a-link-to-a-tracing-service-dashboard).
    1. Optionally, [use alert tags](alerts.html#step-5-organize-related-alerts-with-tags) to organize related alerts into categories.
1. Click **Create Alert**.

<!---
  ![Create an alert from the table view page.](images/tracing_creating_an_alert_app_map.png)--->

Once the alert is created, click **Alerting** > **All Alerts** and search for the alert you created.

<!-- {% include saved_searches.md %} -->

## Drill Down to Logs

If you have the **Logs** permission, you can drill down to logs from the application status page and the Traces Browser.

{% include note.html content="Even if logging is enabled for your environment, the drill-down from traces to logs might have to be enabled separately. Contact [technical support](wavefront_support_feedback.html#support)." %}

When you notice that a service on the application map, table view, or grid view has a high error percentage, you can drill down into the related logs.

{% include note.html content="You must have tagged the traces and the logs from the same applications and services with equivalent application and service tag values. If your traces and logs tags don't match, to map the traces tags to logs tags, see [Customize Logs Settings](logging_logs_settings.html)."%}

* **From the Table View**
  1. Select the time window of interest.
  1. Click the ellipsis icon for the service.
  1. Select **View Logs**.
  ![A screenshot of a the UI once you click vertical ellipsis on the table view](images/app_monitoring_logging_table_view_to_logs.png)
* **From the Grid View**
  1. Select the time window of interest.
  1. In a service tile, click **Actions**.
  1. Select **View Logs**.
  ![A screenshot of a the UI once you click vertical ellipsis on the grid view](images/app_monitoring_logging_grid_view_to_logs.png)

The Logs Browser opens in a new tab with the following configurations:
  
* The search time window corresponds to the time window on the Application Status page.
* The search query contains the corresponding `service` and `application` tag filters.
![The search query and the selected time window in the Logs Browser.](images/logging_app_serv_search.png)

## Learn More!

* [Learn how you can monitor your application using eBPF or tracing](application_monitoring_overview.html).
* See how a specific service communicates with the other service using the [Service Map](service_map.html).