---
title: Tutorial Explore Data
tags: [getting started, dashboards, charts, alerts, tutorials]
sidebar: doc_sidebar
permalink: tutorial_dashboards.html
summary: Learn using dashboards and charts with sample data.
---


Want to learn some tips and tricks for exploring your data in dashboards? This tutorial uses Wavefront sample data to get you started. To complete the tasks you need <strong>Access to a Wavefront instance</strong>. If your company doesn't have one, sign up for a <a href="https://tanzu.vmware.com/observability">free trial</a>

We're only exploring in this tutorial, so you don't need any permissions to go through these tasks.


## Task 1: Find a Sample Dashboard in the Dashboards Browser

Your Wavefront instance includes pre-built tutorial and tour integrations with dashboards that show off Wavefront using sample metrics. Let's explore a tour dashboard, which contains sample data on any Wavefront instance.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol>
<li>Log in to Wavefront.</li>
<li>Select <strong>Dashboards > All Dashboards</strong>.</li>
<li>In the search bar, type <strong>Tour</strong> and select <strong>Name Contains: Tour</strong></li>
<li>Scroll through the list of dashboards and select <strong>Tour: Cluster Metrics Exploration</strong></li></ol></td>
<td width="50%"><img src="/images/find_tour_pro.png" alt="type tour and select Tour Pro"/></td>
</tr>
</tbody>
</table>


![click chart title to select a chart](/images/select_chart_v2.png)

{% include tip.html content="The Dashboards browser offers many search and filter options and makes it possible to mark favourite dashboards and create saved searches. To become a power user, see [Searching in Wavefront](wavefront_searching.html) for details." %}


## Task 2: Explore the Dashboard

By default, this dashboard shows <strong>live</strong> (generated) data. Let's change the time window and explore other customization options.

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
</td></tr>
<tr>
<td width="50%">
3. To filter data, type <code>az = us-west-2</code> in the filter field. All charts in the dashboard are updated to show only data from the us-west-2 availability zone.

When you select one filter, other filters become available below. Explore how you could also set the environment to production, dev, or both.
</td>
<td width="50%"><img src="/images/tutorial_filter.png" alt="Filter us-west-2 selected"/></td>
</tr>
<tr>
<td width="50%">
4. Finally, drag-select a short time window on one of the charts, for example <strong>Latency Statistics </strong> to zoom in. You then then click <strong>Sync Time</strong> to update all charts in the dashboard, and <strong>Reset</strong> to undo. </td>
<td width="50%"><img src="/images/tutorial_sync_reset.png" alt="Latency selector chart with sync/reset option top right"/></td>
</tr>
</tbody>
</table>


## Task 3: Drill Down Into Charts
