---
title: What's New in v2 Dashboards & Charts
tags: [dashboards, charts]
sidebar: doc_sidebar
permalink: ui_v2_faq.html
summary: Main improvements in the v2 UI and some FAQs.
---
If you're migrating from v1 dashboards and charts to v2, you'll find most of the changes intuitive. This page lists some questions we've heard from users who're migrating and give answers.

TBD: New Chart Builder. No More Scatter Plot. 

{% include shared/badge.html content="Every Wavefront user can view dashboards and make temporary changes. You must have Dashboard permission to save dashboards and charts." %}

## Main Improvements

Our revamped UI for charts and dashboards includes the following main features:

### Create Dashboard Workflow
<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol><li>Create a dashboard</li>
<li>Drag in a widget to create a chart (from integration or chart type)</li>
<li>Customize chart and save dashboard.</li></ol></td>
<td width="60%"><img src="/images/v2_create_dashboard.png" alt="create dashboard"></td>
</tr>
</tbody>
</table>

### From Query Builder to Chart Builder

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Complete redesign with easy metric selection<br>
Intuitive grouping, filtering, and function selection. <br>
Switch to Query Editor only for advanced tasks.</td>
<td width="60%"><img src="images/v2_chart_builder_cropped.png" alt="create dashboard"></td>
</tr>
</tbody>
</table>

### Integrated Chart Customization

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>Queries</strong> is one of the chart customization tabs.
Usability improvements for each chart type.
Delete, clone, create alert from icon bar.</td>
<td width="60%"><img src="images/v2_chart_builder_select.png" alt="create dashboard"></td>
</tr>
</tbody>
</table>

### Dashboard Variables Redesign

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Easier to add and configure (dashboard developers).
Easier to select (users).</td>
<td width="60%"><img src="images/v2_dashboard_variables.png" alt="dashboard variables"></td>
</tr>
</tbody>
</table>


## Chart FAQs

### Q: How do I add an alert from a chart?
A: Open the chart, click the **Queries** tab, and select **Create Alert** from the menu on the right.

![v2 Create Alert](images/v2_create_alert.png)


### Q: What happened to my Line Plot?

A: Line plots that multiple lines haven't changed much, but the single-line line plot uses highlighting to make the highs and lows stand out more. Here's a v2 single line chart:

![v2 Line plot](images/v2_linechart_single.png)

Line plots with more than one line look similar to v1 line plots, though we've made the lines slighty thicker for improved accessibility.


### Q: What happened to my Single Stats chart?

A: We changed the sparkline to show in the background by default. You can experiment with sparkline position by selecting **Sparkline > Show Sparkline**. Change **Minimum** to 0 for a chart that looks like the v1 chart.

### Q: How does the new time picker work?

A: Our new time picker supports a selection of preset times or you can specify a custome time frame. 4 weeks is not the same as 1 month -- use the custom time picker to select a full month.

![v2 time picker](images/v2_time_picker.png)

### Q: How do I clone or delete a chart?

A: Open the chart, click the **Queries** tab, and select an icon on the right.

![v2 Clone Query](images/v2_clone.png)

### Q: How can I deselect (hide) a query?

A. Use the eye icon on the right to deselect (hide) or show the results of a query in the chart.

![v2 Hide or show query](images/v2_hide_show.png)

## Dashboard FAQ

### Q: Where are my sections?

A: Use the Jump To menu to select a section.

![v2 Jump To](images/v2_jump_to.png)

### Q: Where's the wrench icon (Dashboard display preferences)?

A: We've consolidated the UI for customizing dashboards.
1. Select **Edit**
2. Click **Settings** in the top right.
3. Set your preferences for the dashboard, click **Accept**, and click **Save** to save the dashboard and your preferences.

![v2 dashboard preferences](images/v2_dashboard_settings.png)

### Q: A lot of my charts now have warnings. What's going on?

A: We've move the warning icon from the bottom right of a chart to the top left to make it more visible. Here's an example with v2 on the left and the same chart in v1 on the right:

![v2 warnings](images/v2_warning.png)

Wavefront currently doesn't distinguish between warnings and info messages. For example, if a query specifies a time window but doesn't specify d, m, s, etc, we default to m (minutes) and show a warning. Expect an update in an upcoming release.
