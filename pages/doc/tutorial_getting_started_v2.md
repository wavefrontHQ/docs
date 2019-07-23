---
title: "Tutorial: Getting Started (v2 Beta)"
tags: [getting started, dashboards, charts, alerts, tutorials]
sidebar: doc_sidebar
permalink: tutorial_getting_started_v2.html
summary: Build dashboards and charts with sample data, create an alert, and learn navigation basics.
---

This tutorial uses Wavefront sample data to get you started.

To complete these tasks you need:
* **Access to a Wavefront instance**. If your company doesn't have one, sign up for a [free trial](https://www.wavefront.com/sign-up/){:target="_blank" rel="noopenner noreferrer"}!
* **Dashboard permission and Alert permission**. Trial users have these permissions. If you're not in a trial, your Wavefront administrator can grant the permissions if you don't have them.


## Review Sample Dashboards and Metrics

Your Wavefront instance includes tutorial and tour dashboards that we built using the sample metrics. Let's have a look at a tutorial dashboard.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>Log in to Wavefront.</li>
<li>Select <strong>Dashboards > All Dashboards</strong>.</li>
<li>In the Tags section of the filter bar on the left, click the <strong>~welcome.tutorial</strong> tag</li>
<li>Click each dashboard. </li>
<li>Examine some of the charts by selecting the chart title.</li></ol></td>
<td width="50%"><img src="/images/welcome_tutorial.png" alt="select ~welcome.tutorial"/></td>
</tr>
</tbody>
</table>
![click chart title to select a chart](/images/select_chart_v2.png)

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Next, let's have a look at some metrics in the Metrics browser.
<ol>
<li>Select <strong>Browse > Metrics</strong>.</li>
<li>In the Metrics field, type <strong>~sample.</strong> (include the period). The sample metrics  categories (shown on the right) display</li>
<li>Explore folders until you see a chart icon representing a metric, and click the icon to display a chart with the metric.  </li></ol></td>
<td width="50%"><img src="/images/sample_metrics.png" alt="sample metrics"/></td>
</tr>
</tbody>
</table>

## Create Dashboards and Charts With the Dashboard Builder

## Create Dashboards and Charts by Saving a Chart to a New Dashboard

Another easy way to create a new dashboard is by saving an existing chart to a new dashboard. We create a copy of the chart, and a new dashboard.

This example uses a chart from our Tour Pro, which is a set of dashboards for exploring typical customer uses case. Tour Pro also includes a dashboard that monitors a sample cluster and one that monitors a single host.


<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Step 1: Open the Sample Cluster Metrics dashboard.
<ol>
<li>Log in to Wavefront.</li>
<li>Select <strong>Dashboards > All Dashboards</strong>.</li>
<li>In the Search field at the top, type <strong>Sample Cluster</strong>and press <strong>Enter</strong>.</li>
<li>Click the <strong>Sample Cluster Metrics</strong> dashboard link.</li></ol></td>
<td width="50%"><img src="/images/sample_cluster.png" alt="Sample Cluster"/></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Step 2: Open a chart in the dashboard.
<ol>
<li>Select <strong>Jump To &gt; App Servers</strong> to go to the App Servers section. </li>
<li>Click the <strong>Requests</strong> chart title.</li></ol>
<p>The stacked area chart opens in the chart editor. This chart displays the query:<br> <code>last(ts("~sample.requests.total.num", az=${az}, env=${env}))</code></p>
The query returns the total number of requests (<strong>~sample.requests.total.num</strong>) metric, filtered by availability zone and environment. The <strong>last()</strong> function fills in any gaps in data with the last known value of the metric. </p></td>
<td width="50%"><img src="/images/app_servers.png" alt="Sample Cluster"/></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
Step 3: Add the chart to a new dashboard:
<ol>
<li>Select <strong>Jump To &gt; App Servers</strong> to go to the App Servers section. </li>
<li>Click the <strong>Requests</strong> chart title.</li></ol>
<p>The stacked area chart opens in the chart editor. This chart displays the query:<br> <code>last(ts("~sample.requests.total.num", az=${az}, env=${env}))</code></p>
The query returns the total number of requests (<strong>~sample.requests.total.num</strong>) metric, filtered by availability zone and environment. The <strong>last()</strong> function fills in any gaps in data with the last known value of the metric. </p></td>
<td width="50%"><img src="/images/app_servers.png" alt="Sample Cluster"/></td>
</tr>
</tbody>
</table>



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

## Videos

Our doc set includes concept videos, how-to videos, and more! The green bar in each tile links to popular videos.

<div class="row">
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-video-camera fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="videos_quickstart.html" class="btn btn-primary btn-block">Quickstart</a></p>
             <p>Our most popular videos. </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
                   <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
                   <i class="fa fa-arrow-right fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="videos_data.html" class="btn btn-primary btn-block">Data</a></p>
             <p>Get telemetry data and histograms into Wavefront.  </p>
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
             <p><a href="videos_alerts.html" class="btn btn-primary btn-block">Alerts</a></p>
             <p>Alerts&mdash;From simple to multi-threshold. </p>
         </div>
     </div>
 </div>
 <div class="col-md-3 col-sm-6">
     <div class="panel panel-default text-center">
         <div class="panel-heading">
             <span class="fa-stack fa-1x">
             <i class="fa fa-circle fa-stack-2x landing-text-primary"></i>
             <i class="fa fa-lock fa-stack-1x fa-inverse"></i>
             </span>
         </div>
         <div class="panel-body">
             <p><a href="/videos_administration.html" class="btn btn-primary btn-block">Administration</a></p>
             <p>Authentication and authorization. </p>
         </div>
     </div>
 </div>
</div>

## Docs

Search this doc set at the top right -- or look at some of the most popular docs in the set.

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
             <p>Get started with alerting. </p>
         </div>
     </div>
 </div>
</div>

### Release Notes

Release notes summarize the features added to each release and changes to existing features.

- [Wavefront Release Notes](wavefront_release_notes.html)

### Query Language Docs

[Wavefront Chart Builder](chart_builder.html) offers an easy select-and-refine interface that lets you fine-tune what your charts display.

![chart builder](images/v2_chart_builder_simple.png)

Advanced users further refine charts and alerts with Wavefront Query Language. Click on a tile for a query language page.

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
<td width="50%"><img src="/images/getting_started_flow.png" alt="Sample Cluster"/></td>
</tr>
<tr>
<td width="50%">
The in-product <strong>Tutorial</strong> dashboards get you started. You explore dashboards and charts that show sample metrics and make temporary modifications. More advanced users can explore the Tour Pro. Here, we're showing how to solve problems such as finding anomalous events. The tour uses sample data but is based on actual customer problems. </td>
<td width="50%"><img src="/images/tutorial_v1.png" alt="Sample Cluster"/></td>
</tr>
<tr>
<td width="50%">
The <strong>in-product help</strong> on the right of each screen introduces what you're looking at -- e.g. charts or alerts -- and has links to more info.</td>
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

Once you're familiar with the basics, you can [send your own data to Wavefront](wavefront_data_ingestion.html) and start your exciting journey!
