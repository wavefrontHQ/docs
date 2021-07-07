---
title: Dashboards and Alerts Tutorial
tags: [getting started, dashboards, charts, alerts, tutorials]
sidebar: doc_sidebar
permalink: tutorial_getting_started.html
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
<li><strong>Access to a Wavefront instance</strong>. If your company doesn't have one, sign up for a <a href="https://tanzu.vmware.com/observability">free trial</a></li>
<li><strong>Dashboard permission and Alert permission</strong>. Trial users have these permissions. If you're not in a trial, your Wavefront administrator can grant the permissions if you don't have them.</li>
</ul></td>
<td width="20%"><a href="tutorial_getting_started_v1.html"><img src="/images/classic_button.png" alt="click here for the classic doc"/></a></td>
</tr>
</tbody>
</table>

{% include tip.html content="If you're new to Wavefront, this tutorial is for you. If you're new to the Wavefront v2 UI (and you're already familiar with Wavefront), have a look at [What's New in v2](ui_v2_faq.html)." %}



## Step 1: Explore Sample Dashboards and Metrics

Your Wavefront instance includes tutorial and tour dashboards that we built using sample metrics. Let's have a look at a tutorial dashboard.

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

## Step 2: Create a Dashboard

The Wavefront UI supports several ways of creating a dashboard.

### Option 1: Use Dashboard Builder

Use our [Dashboard Builder drag-and-drop interface](ui_dashboards.html#create-a-dashboard) to quickly create a dashboard from your metrics. You can start with metrics, charts, or integrations and create one or multiple charts.

It's easy to create a dashboard from metrics or by selecting a chart.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To create a dashboard</strong>:
<ol><li>Select <strong>Dashboards > Create Dashboard</strong> from the taskbar. </li>
<li>Drag the <strong>Metrics</strong> or <strong>New Chart</strong> widget onto the canvas</li>
<li>Select metrics, filters, and functions now or later. </li>
<li>In the top right, click <strong>Save</strong> and specify a name and URL for the dashboard. The URL field supports letters, numbers, underscores, and dashes.  The Name field supports letters, numbers, characters, and spaces.</li></ol></td>
<td width="60%"><img src="/images/v2_create_dashboard.png" alt="create dashboard"></td>
</tr>
</tbody>
</table>

### Option 2: Save a Chart to a New Dashboard

Saving an existing chart to a new dashboard is another easy way to create a dashboard. We create a copy of the chart, and create new dashboard with the name and URL you specify.

This example uses a chart from our Tour Pro, which is a set of dashboards for exploring typical customer use cases. Tour Pro also includes a dashboard that monitors a sample cluster and one dashboard that monitors a single host.

<table style="width: 100%;">
<thead><tr><th width="50%">Task 1: Open the Sample Cluster Metrics dashboard.</th><th width="50%">&nbsp;</th></tr>
</thead>
<tbody>
<tr>
<td width="50%">
<ol>
<li>Log in to Wavefront.</li>
<li>Select <strong>Dashboards > All Dashboards</strong>.</li>
<li>In the Search field at the top, type <strong>Sample Cluster</strong> and press <strong>Enter</strong>.</li>
<li>Click the <strong>Sample Cluster Metrics</strong> dashboard link.</li></ol></td>
<td width="50%"><img src="/images/sample_cluster.png" alt="Sample Cluster"/></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<thead><tr><th width="50%">Task 2: Open a chart in the dashboard.</th><th width="50%">&nbsp;</th></tr>
</thead>
<tbody>
<tr>
<td width="50%">
<ol>
<li>Select <strong>Jump To &gt; App Servers</strong> to go to the App Servers section. </li>
<li>Click the <strong>Requests</strong> chart title.</li></ol>
<p>The stacked area chart opens in the chart editor. This chart displays the query:<br> <code>last(ts("~sample.requests.total.num", az=${az}, env=${env}))</code></p>
<p>The query returns the total number of requests (<strong>~sample.requests.total.num</strong>) metric, filtered by availability zone and environment. The <strong>last()</strong> function fills in any gaps in data with the last known value of the metric. </p></td>
<td width="50%"><img src="/images/app_servers.png" alt="Sample Cluster"/></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<thead><tr><th width="50%">Task 3: Add the chart to a new dashboard.</th><th width="50%">&nbsp;</th></tr>
</thead>
<tbody>
<tr>
<td width="50%">
<ol>
<li>With the chart still in the chart editor, click <strong>Save</strong> in the top right corner. </li>
<li>Select <strong>Save to a New Dashboard</strong> and specify a dashboard url.  </li></ol>
The new dashboard is created, with a clone of the chart in the chart editor. </td>
<td width="50%"><img src="/images/save_to_new_v2.png" alt="save to new dashboard"/></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<thead><tr><th width="50%">Task 4: Edit the chart in the cloned dashboard.</th><th width="50%">&nbsp;</th></tr>
</thead>
<tbody>
<tr>
<td width="50%">
<p>The chart is currently using variables to determine what to display. Let's simplify the chart to show only metrics for the dev environment.</p>
<ol>
<li>With the chart still in Edit mode, select the variables and replace them with <strong>env=dev</strong>. Auto-complete offers options as you type.</li>
<li>Experiment with some of the chart types available from the drop-down menu on the left. </li></ol>
<p>For an introduction, see the <a href="chart_builder.html"> Chart Builder page</a>.</p> </td>
<td width="50%"><img src="/images/select_env.png" alt="select environment"/>
<img src="/images/v2_chart_builder_select.png" alt="select chart type"/></td>
</tr>
</tbody>
</table>

### Dashboard Videos

These two 90-second videos show how to do it:

<table style="width: 100%;">
<tbody>
<tr>
<td width="30%"><strong><font color="blue">Creating Charts with Chart Builder</font></strong><br/><br/>
<iframe src="https://bcove.video/2Xx9IPz" width="400" height="225" allowfullscreen="true" alt="create charts with chart builder video"></iframe></td>
<td width="70%"><strong><font color="blue">Customizing Dashboards</font></strong><br/><br/>
<iframe src="https://bcove.video/2Wux6eP" width="400" height="225" allowfullscreen="true" alt="customizing dashboards video"></iframe> </td>
</tr>
</tbody>
</table>

## Step 3: Create an Alert

In this section you create an alert that fires when the request latency metric reaches a certain threshold. One way to create an alert is directly from a chart.

<table style="width: 100%;">
<thead><tr><th width="50%">Task 1: Create the alert.</th><th width="50%">&nbsp;</th></tr>
</thead>
<tbody>
<tr>
<td width="50%">
<ol>
<li>In the App Server section of the dashboard, click the <strong>Request Latencies</strong> chart title to open the chart.  </li>
<li>Click the ellipsis icon on the right of the query and select <strong>Create Alert</strong>. </li></ol>
The <strong>Create Alert</strong> page displays. </td>
<td width="50%"><img src="/images/v2_create_alert.png" alt="Create Alert menu item"/></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<thead><tr><th width="50%">Task 2: Customize the alert.</th><th width="50%">&nbsp;</th></tr>
</thead>
<tbody>
<tr>
<td width="50%">
<ol>
<li>In the Name field, replace <strong>New Alert</strong> with <strong>Latency Alert</strong>.</li>
<li>At the end of the Condition field, type <strong>&gt; 210</strong>. We're deliberately setting this alert threshold low so you can see the alert fire after a few minutes. In normal practice, you would set the threshold to an anomalous value.</li>
<li>In the <strong>Alert fires</strong> field, change the value to <strong>2</strong> and press <strong>Enter</strong>. The alert fires whenever the moving maximum of the latency is greater than 210 for 2 minutes.</li>
<li>In the <strong>Targets</strong> field, type your email address.</li>
<li>Click <strong>Save</strong>.</li>
</ol>
</td>
<td width="50%"><img src="/images/create_latency_alert.png" alt="create latency alert"/></td>
</tr>
</tbody>
</table>

<table style="width: 100%;">
<thead><tr><th width="50%">Task 3: Observe and snooze the alert.</th><th width="50%">&nbsp;</th></tr>
</thead>
<tbody>
<tr>
<td width="50%">
<ol>
<li>To watch the alert fire, click <strong>Alerting</strong> in the taskbar.
<br>
<br>
Because your alert was the most recently created, you should see it with the state CHECKING.
<br>
<br>
Watch the state change to FIRING and check your email. </li>
<li>Select the alert's check box, click <strong>Snooze</strong> and select <strong>Forever</strong>.
<br>
<br>
You'll receive a second email that the alert was snoozed. </li>
</ol>
 </td>
<td width="50%"><img src="/images/alert_checking.png" alt="create latency alert"/>
<img src="/images/snooze_alert.png" alt="snooze alert"/></td>
</tr>
</tbody>
</table>


<!---
## Videos

Our doc set includes concept videos, how-to videos, and more!

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%"><p><strong>Intro Videos</strong></p><p>Our <strong><a href="videos_quickstart.html" target="_blank">intro videos</a></strong> explain how to get data into Wavefront, how alerting works, and more!</p> </td>
<td width="50%"><a href="https://www.youtube.com/watch?v=lhrtPSqn8-c&index=2&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K" target="_blank"><img src="/images/v_data_into_wavefront.png" alt="getting data into wavefront"/></a></td>
</tr>
<tr>
<td width="50%"><p><strong>Alerts Videos</strong></p><p>Our <strong><a href="videos_alerts.html" target="_blank">alerts videos</a></strong> give important background and best practices info and a lot of practical advice on how to configure classic alerts and multi-threshold alerts.  </p> </td>
<td width="50%"><a href=" https://youtu.be/qWBP6PrkUrU"><img src="/images/v_threshold_alerts.png" style="width: 700px;" alt="threshold alerts"/></a></td>
</tr>
<tr>
<td width="50%"><p><strong>Wavefront and Data Videos</strong></p><p>The <strong><a href="videos_data.html" target="_blank">Wavefront and data videos</a></strong> explain important concepts such as interpolation and tagging, and explain how to use histograms. </p> </td>
<td width="50%"><a href="https://youtu.be/9LnDszVrJs4"  target="_blank"><img src="/images/v_interpolation.png" alt="time series and interpolation"/></a></td>
</tr>
<tr>
<td width="50%"><p><strong>Administration Videos</strong></p><p><strong><a href="videos_administration.html" target="_blank">Administration videos</a></strong> include a a video about Wavefront Top. They also help you understand how permissions and access control work in Wavefront, and show how to set up permissions and access control. </p> </td>
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
             <p>Get started with alerting. </p>
         </div>
     </div>
 </div>
</div>

### Release Notes

Release notes summarize the features added to each release and changes to existing features.

- [Wavefront Release Notes](wavefront_release_notes.html)

### Query Language Docs

[Wavefront Chart Builder](chart_builder.html) offers an easy select-and-refine interface that lets you fine tune what your charts display.

![chart builder](images/v2_chart_builder_simple.png)

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
--->

## Learn More

Wavefront offers an onboarding (**Getting Started**) workflow, tutorial and tour dashboards, in-product help, videos, docs, and other resources.

### Intro Videos

This doc set and the VMware Learning Zone include videos that help you understand basic concepts, learn the mechanics of customizing the Wavefront UI, and use advanced features.

* Start with [Basic Concept](videos_quickstart.html) videos and [Getting Started](videos_howto_start.html) videos that explain the basics.
* Move on to learn in more detail about [dashboards and charts](videos_dashboards_charts.html), [alerts](videos_alerts.html) and more.

### In-product Tutorials and More

We offer in-product or external resources:
* **[Learn Wavefront in Wavefront](tutorial_overview.html#learn-wavefront-in-wavefront)**:  Getting Started workflow, tutorial and tour integrations, help panel, integration setup examples.
* **Tutorials, Videos, and More**: This doc set includes tutorials, reference documentation, FAQs and recipes, videos, and more. See [Learn Wavefront](tutorial_overview.html)

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

<!---
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
--->
