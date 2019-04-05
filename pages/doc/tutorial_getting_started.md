---
title: "Tutorial: Getting Started"
tags: [getting started, dashboards, charts, alerts, tutorials]
sidebar: doc_sidebar
permalink: tutorial_getting_started.html
summary: Get started with navigating Wavefront, building Wavefront dashboards and charts, and creating an alert.
---

This tutorial gets you started with navigating Wavefront, building Wavefront dashboards and charts, and creating an alert. To complete these tasks you need access to a Wavefront instance. Sign up for a [free trial](https://www.wavefront.com/sign-up/){:target="_blank" rel="noopenner noreferrer"}!

You also need [Dashboard Management and Alert Management permissions](permissions_overview.html). Trial users have these permissions. If you're not in a trial, your Wavefront administrator can grant the permissions if you don't have them.

The tutorial uses the sample metrics preloaded in your Wavefront account.

## Review Sample Dashboards and Metrics

Your Wavefront instance includes a set of [Getting Started Dashboards](documentation_getting_started.html#getting-started-dashboards) built using the sample metrics. Let's get started by reviewing some of these dashboards and metrics.

1. Log in to Wavefront.
1. Select **Dashboards > All Dashboards**.
1. In the Tags section of the filter bar on the left, click the **welcome.tutorial** tag.
1. Click each dashboard and review:
  - Tutorial: Intro - gives an overview of the Getting Started dashboards and documentation.
  - Tutorial: Getting Started with Wavefront Query Language - gives an overview of how to construct metrics queries.
  - Tutorial: Dashboard Basics: Chart Types - describes the different ways of displaying metrics.

1. The Getting Started Dashboards all use sample metrics. You can explore any metrics in Wavefront, including the **~sample.** metrics, using the Metrics browser:
    1. Select **Browse > Metrics**.
    1. In the Metrics field, type **~sample.** (include the period). The sample metrics categories display:

       ![sample_metrics](images/sample_metrics.png)

    1. Optionally, explore folders until you see a chart icon representing a metric.  In the next section you learn  how to create your own charts for metrics.
    1. Click the icon to display a chart of the metric.

## Create Dashboards and Charts

To get you started quickly, Wavefront includes not only a tutorial, but also a set of sample dashboards, tagged as **welcome.tour**.
One of the tour dashboards, Tour: Sample Cluster Metrics, illustrates a range of metrics that span an entire cluster. You can
create  a dashboard starting with one of the charts in this tour dashboard and add a new chart to your dashboard.

1.  Open the Tour: Sample Cluster Metrics dashboard:
    1. Select **Dashboards > All Dashboards**.
    1. In the Search field at the top, type **Sample Cluster** and press **Enter**.
    1. Click the **Tour: Sample Cluster Metrics** dashboard link.

        ![sample_cluster](images/sample_cluster.png)

        The dashboard defines two [variables](dashboards_variables.html),  dashboard&mdash;Availability Zone (az) and Environment (env)&mdash; which you can see at the top. Variables can be used in queries to filter metrics for classes of sources. The us-west-2 availability zone and dev environment variable are selected by default.

1.  Open a chart in the Tour: Sample Cluster Metrics dashboard.
    1. The Tour: Sample Cluster Metrics dashboard is organized into sections. Click the **App Servers** button at the top to jump to the App Servers section:

       ![app_servers](images/app_servers.png)

    1. In the App Servers section, click the **Requests** chart title:
       ![requests](images/requests.png)

       The [stacked area](charts.html#stacked-area) chart opens in the chart editor. This chart displays the query **last(ts("~sample.requests.total.num", az=${az}, env=${env}))**, which returns the **~sample.requests.total.num (total number of requests)** metric filtered by availability zone and environment. The **last()** function fills in any gaps in data with the last known value of the metric.
1.  Add the chart to a new dashboard:
    1. Scroll to the bottom of the chart page.
    1. Click **Save to New Dashboard**.
    1. In the URL field, type **app-server-dashboard**.
    1. In the Name field, type **App Server Dashboard**.
    1. Click **Create**. You have now created your first dashboard and are placed in edit mode. The variables have also been included in your new dashboard because they are used in the chart.
1.  Edit the App Server Dashboard:
    1. Click the <i class="fa fa-superscript" /> icon at the top right to close the dashboard variables editor.
    1. Click **Incoming Chart** at the top left and type **Request Metrics**.
1.  Edit the Requests chart to limit the number of sources being displayed:
    1. Click the **Requests** title at the top right of the chart.
    1. In the Requests query field delete **az=${az}, env=${env}** and type **env**.
    1. Select **env=** and then **production** from the autocomplete dropdown.
    1. Press **Enter**. The chart now displays only _production_ application servers in all availability zones.
    1. Click **Accept**.
1.  Now let's create a chart from scratch:
    1. Click <i class="fa fa-plus-circle"/> Add New Chart. A new [line plot](charts.html#line-plot) chart is created.
    1. In the New Query field, type **ts**. The system adds parentheses.
    1. Type **~sample.requests**.
    1. Choose **latency** from the autocomplete dropdown and press **Enter**. The chart displays the query **ts(~sample.requests.latency)** which returns the **~sample.requests.latency** (request latency) metric. The chart contains many lines that can make it hard to see trends. To reduce the number of lines you can filter the points by sources.
    1. Type **", env=production"** (without the quotes) after latency. This filter selects sources in the _production_ environment.
    1. Type **"mmax(10m, "** (without the quotes) before ts and type a closing parenthesis **)** at the end. This function sets the value to the maximum of the metric over a 10 minute window, reducing noise and focusing attention on the more interesting metric _maximum latency_. This is an example of the one of the many functions available in Wavefront to analyze your metrics.
    1. In the Name field, replace New Chart with **Request Latencies**.
    1. Click **Accept**.
1.  Make sure that Edit JSON is still selected in the top right, hover over the chart, and press and hold the left mouse button. When the cursor changes to <i class="fa fa-arrows"/>,  drag the chart to the right of the Requests chart and release the mouse button. The two charts now share the same row.
1. At the top right of the dashboard, click **Save**.

   ![request_metrics](images/request_metrics.png)

## Create an Alert

In this section you create an alert that fires when the request latency metric reaches a certain threshold. In Wavefront, one way to create an alert is directly from a chart.

1. In App Server Dashboard, click the **Request Latencies** chart title to open the chart.
1. Hover over the query builder toggle. The **Create Alert** link displays.

   ![create_alert](images/create_alert.png)

1.  Click the **Create Alert** link. The Create Alert page displays with the Condition field filled in with the request latencies query.
    1. In the Name field, replace **New Alert** with **Latency Alert**.
    1. At the end of the Condition field, type **> 210**. The alert threshold is deliberately set low so you can see the alert fire after a few minutes. In normal practice the threshold would be set to an anomalous value.
    1. In the **Alert fires** field, change the value to **2** and press **Return** or **Enter**. The alert fires whenever the moving maximum of the latency is greater than 210 for 2 minutes. You can see when alerts would have been generated in the **Backtesting** option of the Events Display chart.
    1. In the Targets field, type your email address.
    1. Click **Save**.
1.  Click **Alerts** in the task bar. The Alerts browser displays and Latency Alert displays the state CHECKING. When the alert fires, the state changes to FIRING:

    ![firing alert](images/tutorial_get_started_alert_firing.png)

     and you receive an email like the following:

    ![alert_email](images/tutorial_get_started_alert_email.png)

    As alerts fire and resolve, events are created in Wavefront. You can add many other types of events to Wavefront. You can identify these events as [icons](charts_events_displaying.html) that are added to the Request Latencies chart's X-axis:

    ![event icons](images/event_icons.png)

## Next Steps

To learn more:

* Explore the Wavefront Tutorial -- one of the Featured integrations.

  ![tutorial integration](images/tut_integration.png)

* Use the Interactive Query Language Exporer dashboard.

  ![query language tutorial](images/ql_dashbrd.png)

Once you're familiar with the basics, you can [send your own data to Wavefront](wavefront_data_ingestion.html) and start your exciting journey!
