---
title: "Tutorial: Getting Started (v1)"
tags: [getting started, dashboards, charts, alerts, tutorials]
sidebar: doc_sidebar
permalink: tutorial_getting_started_v1.html
published: false
summary: Build dashboards and charts with sample data, create an alert, and get pointers to more info.
---

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">
<br>
This tutorial uses Wavefront sample data to get you started.

To complete these tasks you need:
<ul>
<li><strong>Access to a Wavefront instance</strong>. If your company doesn't have one, sign up for a <a href="https://www.wavefront.com/sign-up/" target="_blank" rel="noopenner noreferrer">free trial</a></li>
<li><strong>Dashboard permission and Alert permission</strong>. Trial users have these permissions. If you're not in a trial, your Wavefront administrator can grant the permissions if you don't have them.</li>
</ul></td>
<td width="20%"><a href="tutorial_getting_started.html"><img src="/images/v2_button.png" alt="click here for the v2 doc"/></a></td>
</tr>
</tbody>
</table>


## Review Sample Dashboards and Metrics

Your Wavefront instance includes tutorial and tour dashboards that we built using the sample metrics. Let's get started by reviewing some of these dashboards and metrics.

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
    1. The Tour: Sample Cluster Metrics dashboard is organized into sections. Click **App Servers** at the top to jump to the App Servers section:

       ![app_servers](images/app_servers.png)

    1. In the App Servers section, click the **Requests** chart title:
       ![requests](images/requests.png)

       The [stacked area](ui_charts.html#stacked-area) chart opens in the chart editor. This chart displays the query **last(ts("~sample.requests.total.num", az=${az}, env=${env}))**, which returns the **~sample.requests.total.num (total number of requests)** metric filtered by availability zone and environment. The **last()** function fills in any gaps in data with the last known value of the metric.
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
    1. Click <i class="fa fa-plus-circle"/> Add New Chart. A new [line plot](ui_charts.html#line-plot) chart is created.
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
1.  Click **Alerts** in the taskbar. The Alerts browser displays and Latency Alert displays the state CHECKING. When the alert fires, the state changes to FIRING:

    ![firing alert](images/tutorial_get_started_alert_firing.png)

     and you receive an email like the following:

    ![alert_email](images/tutorial_get_started_alert_email.png)

    As alerts fire and resolve, events are created in Wavefront. You can add many other types of events to Wavefront. You can identify these events as [icons](charts_events_displaying.html) that are added to the Request Latencies chart's X-axis:

    ![event icons](images/event_icons.png)

## Videos

Our doc set includes concept videos, how-to videos, and more!

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%"><p><strong>Intro Videos</strong></p><p>Our intro videos explain how to get data into Wavefront, how alerting works, and more!</p> </td>
<td width="50%"><a href="https://www.youtube.com/watch?v=lhrtPSqn8-c&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K" target="_blank"><img src="/images/v_data_into_wavefront.png" alt="getting data into wavefront"/></a></td>
</tr>
<tr>
<td width="50%"><p><strong>Alerts Videos</strong></p><p>Our Alerts videos give important background and best practices info and a lot of practical advice on how to configure alerts.  </p> </td>
<td width="50%"><a href=" https://youtu.be/qWBP6PrkUrU"><img src="/images/v_threshold_alerts.png" style="width: 700px;" alt="threshold alerts"/></a></td>
</tr>
<tr>
<td width="50%"><p><strong>Wavefront and Data Videos</strong></p><p>Thess videos explain important concepts such as interpolation and tagging, and explain how to use histograms. </p> </td>
<td width="50%"><a href="https://youtu.be/9LnDszVrJs4"  target="_blank"><img src="/images/v_interpolation.png" alt="time series and interpolation"/></a></td>
</tr>
<tr>
<td width="50%"><p><strong>Administration Videos</strong></p><p>Administration videos help you understand how permissions and access control work in Wavefront, and show how to set up permissions and access control. </p> </td>
<td width="50%"><a href="https://youtu.be/45E4pkann0E" target="_blank"><img src="images/v_access.png" alt="Wavefront access control"/></a></td>
</tr>

</tbody>
</table>

## Docs

Use the search box in the top right -- or look at some of the most popular docs in the set.

### Getting Started Docs

Click a tile for doc about integrating with Wavefront, visualizing your data, refining what you see with queries, and alerting with Wavefront.

<div class="row">
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-rocket fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="label_integrations%20list.html" class="btn btn-primary btn-block">Integrate</a></p>
             <p>Explore our integrations</p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-eye fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="ui_examine_data.html" class="btn btn-primary btn-block">Visualize</a></p>
             <p>Get started with charts and dashboards</p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-question fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="query_language_reference.html" class="btn btn-primary btn-block">Query</a></p>
             <p>Understand Wavefront Query Language</p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-exclamation fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="/alerts.html" class="btn btn-primary btn-block">Alert</a></p>
             <p>Get started with alerting </p>
         </div>
     </div>
 </div>
</div>

### Release Notes

Release notes summarize the features added to each release and changes to existing features.

- [Wavefront Release Notes](wavefront_release_notes.html)

### Query Language Docs

[Wavefront Query Builder](query_language_query_builder.html) offers an easy select-and-refine interface that lets you fine tune what your charts display.

![chart builder](images/query_builder_04x.png)

Advanced users further refine charts and alerts with Wavefront Query Language. Click on the green bar in a tile for a query language page.

<div class="row">
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-list fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="query_language_reference.html" class="btn btn-primary btn-block">Reference</a></p>
             <p>One line for each function + links. </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-circle fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="query_language_discrete_continuous.html" class="btn btn-primary btn-block">Foundation</a></p>
             <p>Explains concepts like discrete, continuous, and interpolation. </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-lightbulb-o fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="query_language_point_tags.html" class="btn btn-primary btn-block">Tips & Tricks</a></p>
             <p>Fine tune queries, perform aggregation, and more.  </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-list-ol fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="/query_language_recipes.html" class="btn btn-primary btn-block">QL Recipes</a></p>
             <p>Sample queries for common tasks.</p>
         </div>
     </div>
 </div>
</div>

## Next Steps

Wavefront offers an onboarding (**Getting Started**) workflow, tutorial and tour dashboards, in-product help, videos, docs, and other resources.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
The <strong>Getting Started</strong> onboarding flow gives a overview of the Wavefront architecture, and a preview of dashboards and alerts. All trial users go through this flow before they can continue using Wavefront.</td>
<td width="50%"><img src="/images/get_started_v1.png" alt="Getting Started flow"/></td>
</tr>
<tr>
<td width="50%">
The in-product <strong>Tutorial</strong> dashboards get you started. You explore dashboards and charts that show sample metrics and make temporary modifications. More advanced users can explore the Tour Pro. Here, we're showing how to solve problems such as finding anomalous events. The tour uses sample data but is based on actual customer problems. </td>
<td width="50%"><img src="/images/tutorial_v1.png" alt="Sample Cluster"/></td>
</tr>
<tr>
<td width="50%">
The <strong>in-product help</strong> on the right of each screen introduces what you're looking at (e.g. charts or alerts) and has links to more info.</td>
<td width="50%"><img src="/images/in_product_help.png" alt="Sample Cluster"/></td>
</tr>
<tr>
<td width="50%">
This doc set (docs.wavefront.com) has in-depth information about many different aspects of the product. Use the TOC on the left, the Search bar in the top right or the tiles to find what you're looking for.</td>
<td width="50%"><img src="/images/doc_set.png" alt="screenshot of top left corner of doc set."/></td>
</tr>
<tr>
<td width="50%">
Developers like the Interactive Query Language Exporer dashboard to learn about all functions by looking at an example.</td>
<td width="50%"><img src="/images/ql_dashbrd.png" alt="query language explorer"/></td>
</tr>
</tbody>
</table>

Once you're familiar with the basics, you can [send your own data to Wavefront](wavefront_data_ingestion.html) and start your journey!

<!---moved some updates from 34 branch to master (but not all). Fingers crossed no merge problems later--->
