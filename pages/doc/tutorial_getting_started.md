---
title: Tutorial Getting Started
tags: [getting_started, dashboards, charts, alerts]
sidebar: doc_sidebar
permalink: tutorial_getting_started.html
summary: Get started with navigating Wavefront, building Wavefront dashboards and charts, and creating an alert. The tutorial is based on the sample metrics preloaded in your Wavefront account.
---

## Review Sample Dashboards and Metrics

Your Wavefront instance includes a set of introductory dashboards built using the sample metrics. We'll start by reviewing some of these dashboards and metrics.

1. Log into Wavefront. The Intro:Home dashboard displays. Review the dashboard contents.
1. Select **Dashboards > All Dashboards**.
1. In the Tag Paths section of the filter bar on the left, expand the **wavefront** node and click the **wavefront.tutorial** tag.
1. Click each dashboard and review:
  - Intro: Getting Started with Wavefront Query Language
  - Intro: Dashboard Basics: Chart Types

1. The introductory dashboards all use sample metrics. View the sample metrics:
    1. Select **Browse > Metrics**.
    1. In the Metrics field type **sample**. Click the **~sample.** folder. The sample metrics categories display:

       ![sample_metrics](images/sample_metrics.png)

    1. Optionally click into a folder and keep clicking until you see a bar chart icon <i class="fa fa-bar-chart"/> representing a metric.
    1. Click the icon to display a chart of the metric.
 
## Create Dashboards and Charts
One of the intro dashboards, Intro: Sample Cluster Metrics, illustrates a range of metrics spanning an entire cluster. We'll develop a dashboard starting with one of the charts in this dashboard and then add a new chart.

1.  Open the Intro: Sample Cluster Metrics dashboard:
    1. Select **Dashboards > All Dashboards**.
    1. In the Search field at the top, type **Sample Cluster** and press **Enter** or **Return**.
    1. Click the **Intro: Sample Cluster Metrics** dashboard link.

        ![sample_cluster](images/sample_cluster.png)

        The dashboard defines two variables—Availability Zone (az) and Environment (env)—that can be used in queries to filter metrics for specific classes of sources.

1.  Open a chart in the Intro: Sample Cluster Metrics dashboard:
    1. Click the **App Servers** button to jump to the App Servers section:

       ![app_servers](images/app_servers.png)

       Notice that the us-west-2 availability zone and dev environment variable values are selected by default.

    1. In the App Servers section, click the **Requests** chart title:
       ![requests](images/requests.png)

       The chart opens in the chart editor. This chart displays the query **last(ts("~sample.requests.total.num", az=${az}, env=${env}))**, which returns the **~sample.requests.total.num (total number of requests)** metric filtered by availability zone and environment. **The last()** function fills in any gaps in data with the last known value of the metric.
1.  Add the chart to a new dashboard:
    1. Scroll to the bottom of the chart page.
    1. Click **Create Dashboard**.
    1. In the URL field, type **app-server-dashboard**.
    1. In the Name field, type **App Server Dashboard**.
    1. Click **Create**.
1.  Edit App Server Dashboard:
    1. Click the <i class="fa fa-superscript" /> icon at the top right to close the dashboard variables editor.
    1. Click **Incoming Chart** at the top left and type **Request Metrics**.
1.  Edit the Requests chart:
    1. Click the **Requests** title at the top right of the chart.
    1. In the Requests query field delete **az=${az}, env=${env}** and type **env**. Select **env=** and then **production** from the autocomplete dropdown. Press **Enter** or **Return**. The chart displays production application servers in all availability zones.
    1. Click **Accept**.
1.  Add another chart.
    1. Click <i class="fa fa-plus-circle"/> Add New Chart.
    1. In the New Query field, type **~sample.requests.**. 
    1. Choose **latency** from the autocomplete drop-down and press **Enter** or **Return**. The chart displays the query **ts(~sample.requests.latency)** which returns the **~sample.requests.latency (request latency)** metric. The chart contains many lines that can make it hard to see trends. To reduce the number of lines you can filter the points by sources.
    1. Type **", env=production"** after latency. This filter selects sources in the production environment.
    1. Type **"mmax(10m,"** before ts and **")"** at the end. This function sets the value to the maximum of the metric over a 10 minute window, reducing noise in the signal and focusing attention on the more interesting metric maximum latency.
    1. In the Name field, replace New Chart with **Request Latencies**.
    1. Click **Accept**.
1. Hover over the chart and press and hold the left mouse button. When the cursor changes to <i class="fa fa-arrows"/>,  drag the chart to the right of the Requests chart and release the mouse button. The two charts now share the same row.
1. At the top right of the dashboard, click **Save**.

   ![request_metrics](images/request_metrics.png)
 
## Create an Alert
1. In App Server Dashboard, click the Request Latencies chart title to open the chart.
1. Hover over the New Query field. The Create Alert link displays.

   ![create_alert](images/create_alert.png)

1.  Click the **Create Alert** link. The Create Alert page displays with the Condition field filled in with the request latencies query.
    1. In the Name field, replace **New Alert** with **Latency Alert**.
    1. At the end of the Condition field, type **> 210**. The alert threshold is deliberately set low so you can see the alert fire after a few minutes. In normal practice the threshold would be set to an anomalous value.
    1. In the Alert fires field, change the value to **2** and press **Return** or **Enter**. You can see when alerts would have been generated in the Backtesting option of the Events Display chart. The alert fires whenever the moving maximum of the latency is greater than 210 for 2 minutes.
    1. In the Targets field, type your email address.
    1. Click **Save**.
1.  Click **Alerts** in the navigation bar. The Alerts browser displays and Latency Alert displays the state CHECKING. When the alert fires, the state changes to FIRING:

    ![firing alert](images/firing_alert.png)
 
     and you receive an email like the following:
  
    ![alert_email](images/alert_email.png)
   
    In addition, as alerts fire and resolve, icons that identify these events are added to the chart's X-axis:
  
    ![event icons](images/event_icons.png)

## Explore Your Data in Wavefront
Now that you are acquainted with the basics of Wavefront features and the UI, you are ready to start investigating your data. If you do not already have your own metrics flowing into Wavefront, follow the instructions in [Tutorial: Getting Data into Wavefront](tutorial_data_ingestion) to get started.


{% include links.html %}