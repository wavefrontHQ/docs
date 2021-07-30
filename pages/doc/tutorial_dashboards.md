---
title: Tutorial Explore Data
tags: [getting started, dashboards, charts, alerts, tutorials]
sidebar: doc_sidebar
permalink: tutorial_dashboards.html
summary: Learn using dashboards and charts with sample data.
---


Want to learn some tips and tricks for exploring your data in dashboards?

This tutorial uses Wavefront **sample data** to get you started. To complete the tasks, you need <strong>Access to a Wavefront instance</strong>. If your company doesn't have one, sign up for a <a href="https://tanzu.vmware.com/observability">free trial</a>

The focus in tutorial is on exploration, so you don't need any permissions to go through these tasks.

{% include tip.html content="We'll explore making changes to a dashboard and chart, but unless you explicitly save those changes, they are only temporary. " %}


## Task 1: Find a Sample Dashboard in the Dashboards Browser

Your Wavefront instance includes pre-built tutorial and tour integrations with dashboards that show off Wavefront using sample metrics. Let's explore a tour dashboard, which contains sample data on any Wavefront instance.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>Log in to Wavefront. The URL is something like <code>https://example.wavefront.com</code></li>
<li>Select <strong>Dashboards > All Dashboards</strong>.</li>
<li>In the search bar, type <strong>Tour</strong> and select <strong>Name Contains: Tour</strong></li>
<li>Scroll through the list of dashboards and select <strong>Tour: Cluster Metrics Exploration. </strong></li></ol></td>
<td width="50%"><img src="/images/find_tour_pro.png" alt="type tour and select Tour Pro"/></td>
</tr>
</tbody>
</table>

The result looks similar to the following screenshot:

![click chart title to select a chart](/images/select_chart_v2.png)

{% include tip.html content="The Dashboards browser offers many search and filter options and makes it possible to mark favorite dashboards and create saved searches. To become a power user, see [Searching in Wavefront](wavefront_searching.html) for details." %}


## Task 2: Explore the Dashboard

By default, the **Tour: Cluster Metrics Exploration** dashboard shows <strong>live</strong> (sample) data. Let's change the time window and explore other dashboard customization options.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
1. To change the time window, click the time selector and select, for example, <strong>Last 12 hours</strong>.

All charts in the dashboard are updated to the new time window. </td>
<td width="50%"><img src="/images/select_time_tutorial.png" alt="Time selector screenshots"/></td>
</tr>
<tr>
<td width="50%">
2. Notice the options below the time selector, and select <strong>Jump To &gt; Processes</strong> to show the Processes section.

Below the time selector, you see:
<ul>
<li>The lock icon, which shows that you cannot save this system dashboard.</li>
<li>The Favorite (star) icon, which you click to make this a favorite dashboard. </li>
<li>The Jump To menu.</li>
<li>The Filter field. </li>
</ul>
</td><td width="50%"><img src="/images/tutorial_jump_to.png" alt="Jump To menu shows sections"/></td>
</tr>
<tr>
<td width="50%">
3. To filter data, type <code>az = us-west-2</code> in the filter field. All charts in the dashboard are updated to show only data from the us-west-2 availability zone.
<br/><br/>
When you select one filter, other filters become available below. Explore how you could also set the environment to production, dev, or both.
</td>
<td width="50%"><img src="/images/tutorial_filter.png" alt="Filter us-west-2 selected"/></td>
</tr>
<tr>
<td width="50%">
4. Finally, explore time selection and time sync across charts.
<ul><li>Drag-select a short time window on one of the charts, for example <strong>Latency Statistics </strong> to zoom in.</li>
<li>Click <strong>Sync Time</strong> to update all charts in the dashboard.</li>
<li>Click <strong>Reset</strong> to undo. </li></ul></td>
<td width="50%"><img src="/images/tutorial_sync_reset.png" alt="Latency selector chart with sync/reset option top right"/></td>
</tr>
</tbody>
</table>


## Task 3: Drill Down Into Charts

To edit dashboards and charts, you need **Dashboards** permission. But even without those permissions, you can learn a lot from drilling down into a chart.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
1. Let's start with viewing events for system alerts.
<ul><li>In the <strong>Latency by AZ Test</strong> chart, hover over one of the dots at the bottom. Each dot represents an event.</li>
<li>Examine one or two events more closely. The events in this sample dashboard are system events that are triggered by alerts.</li></ul>
</td>
<td width="50%"><img src="/images/tutorial_alert_event.png" alt="Hover menu of event shows Info: Alert Recovered."/></td>
</tr>
<tr>
<td width="50%">
2. Move to the right and explore changing the time window.<br/><br/>
3. Next, select <strong>Edit</strong> from the ellipsis menu.<br/><br/>
You can instead click the name of the chart to put it in edit mode.
</td><td width="50%"><img src="/images/tutorial_select_edit.png" alt="Screenshot with time selectors and open ellipsis menu that shows Edit and Export CSV"/></td></tr>
<tr>
<td width="50%">
4. Select the chart type drop-down, which shows <strong>Line Plot</strong> initially, and select <strong>Stacked Area</strong>.<br/><br/>

If the filter is still set to us-west-2, consider removing it for a more interesting chart.
</td>
<td width="50%"><img src="/images/tutorial_select_chart_type.png" alt="Chart type menu, with Stacked Area selected"/></td>
</tr>
<tr>
<td width="50%">
5. Next, explore the chart options to examine how you can adjust the view of your data. <br/><br/>

Each chart type has chart-specific options. See <a href="ui_chart_reference.html">Chart Reference</a> for details.<br/><br/>
6. Finally, click <strong>Back</strong> to return to the dashboard to continue exploring.
<br/><br/>Because this Tour dashboard is a system dashboard, you cannot save changes even if you have Dashboards permissions. <a href="ui_dashboards.html#edit-or-clone-a-dashboard">Clone the dashboard</a> if you want to make a copy and save changes there. </td>
<td width="50%"><img src="/images/tutorial_chart_options.png" alt="Screenshot of chart options, with Legend selected."/></td>
</tr>
</tbody>
</table>

## Learn More

* Even if you don't have **Dashboards** permissions, you can do an in-depth analysis of your data. See [Examine Data with Dashboards and Charts](ui_examine_data.html), which includes an intro video.
* If you have permission to edit and save dashboards and charts, you can:
  - [Create and Customize Dashboards](ui_dashboards.html).
  - [Create and Customize Charts](ui_charts.html).
  - Watch [Dashboards & Charts videos](videos_dashboards_charts.html).
