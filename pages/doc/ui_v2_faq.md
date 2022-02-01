---
title: What's New in v2 Dashboards & Charts
tags: [dashboards, charts]
sidebar: doc_sidebar
permalink: ui_v2_faq.html
summary: Main improvements in the v2 UI and some FAQs.
---
If you're migrating from v1 dashboards and charts to v2, you'll find most of the changes intuitive. This page highlights new features and has some FAQs.


{% include note.html content="Every Wavefront user can view dashboards and make temporary changes. You must have the Dashboard permission to save dashboards and charts." %}

## Main Improvements

Our revamped UI for charts and dashboards includes the following main features:

### Create Dashboard Workflow
<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Simple workflow for dashboards with multiple charts.
<ol><li>Select <strong>Dashboards > Create Dashboard</strong>.</li>
<li>Drag in a widget to create a chart (from integration or chart type)</li>
<li>Customize the chart and save the dashboard.</li></ol></td>
<td width="60%"><img src="/images/dashboard_123.png" alt="create dashboard"></td>
</tr>
</tbody>
</table>

### From Query Builder to Chart Builder

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Complete redesign. <a href="chart_builder.html">Chart Builder</a> helps you visualize exactly what you need.<br>
We support easy metric selection and intuitive grouping, filtering, and functions. <br>
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
You can now specify the data you want to display in the <strong>Data</strong> tab and use other tabs for customization. </td>
<td width="60%"><img src="images/v2_chart_builder_select.png" alt="create dashboard"></td>
</tr>
<tr>
<td width="40%">
We made usability improvements for each chart type - and you can use delete, clone, and create alert from the icon bar.</td>
<td width="60%"><img src="images/v2_create_alert.png" alt="create an alert from the ellipsis menu"></td>
</tr>
</tbody>
</table>

### Dashboard Variables Redesign

[Dashboard variables](dashboards_variables.html) are now easier to configure and easier to use.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
We've streamlined variable configuration for developers. We've made setting variables easier for all users.</td>
<td width="60%"><img src="images/v2_dashboard_variables.png" alt="dashboard variables"></td>
</tr>
</tbody>
</table>

## How Do I Switch from v1 to v2?

Switch to the v2 UI for your account from the gear icon:

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<ol>
<li>Select the gear icon in the top right.</li>
<li>In the User Information tab, select <strong>UI Version > v2</strong>.</li>
</ol></td>
<td width="60%"><img src="images/switch_to_v2.png" alt="pulldown menu with v2 selected."></td>
</tr>
</tbody>
</table>

## Chart FAQs from v2 Users

### Q: How do I add an alert from a chart?
A: Open the chart, click the **Data** tab, click the ellipsis icon next to the query, and select **Create Alert**.

![v2 Create Alert](images/v2_create_alert.png)


### Q: Some of my charts look different. What can I do?

A: The goal of this UI revision is parity, but we've made a few changes:
* **Scatter plots** are obsolete. Change scatter plot to a different chart type before you go to v2.
* **Line plots** changed. Single-line line plots now use highlighting to make the highs and lows stand out more:

  ![v2 Line plot](images/v2_linechart_single.png)

Line plots with more than one line look similar to v1 line plots though the colors are different.
* **Single Stats** charts with sparklines have a changed look. You can experiment with sparkline position by selecting **Sparkline > Show Sparkline**. Change **Minimum** to 0 for a chart that looks like the v1 chart.

### Q: How does the new time window selector work?

A: Our new time window selector supports a selection of preset times, or you can specify a custom time frame. 4 weeks is not the same as 1 month -- use the custom time window selector to select a full month.

![v2 time picker](images/v2_time_picker.png)

### Q: How do I clone or delete a chart?

A: Open the chart and on the **Data** tab, click the **Delete** or **Clone** icon on the right of the query.

![v2 Clone Query](images/v2_clone.png)

### Q: How can I deselect (hide) a query?

A: Use the eye icon on the right of the query to hide or show the results of a query in the chart.

![v2 Hide or show query](images/v2_hide_show.png)

### Q: How can I copy/paste table chart content in v2?

A: We're working on improving the copy/paste behavior. For now, please use [the third-party CLI](https://github.com/snltd/wavefront-cli) to generate a CSV file. See our [blog about using the CLI ](https://tanzu.vmware.com/content/vmware-tanzu-observability-blog/commanding-the-waves-using-the-wavefront-cli).

### Q: How can I create an embedded chart in v2?

A: Embedded charts allow you to make a chart available outside Wavefront. We temporarily don't support this functionality for v2, but **all your existing embedded charts** will continue to work.




## Dashboard FAQs from v2 UI Users

### Q: Where are my sections?

A: Use the **Jump To** menu to select a section.

![v2 Jump To](images/v2_jump_to.png)

### Q: Where's the wrench icon (Dashboard display preferences)?

A: We've consolidated the UI for customizing dashboards.
1. Select **Edit**.
2. Click **Settings** in the top right.
3. Set your preferences for the dashboard, click **Accept**, and click **Save** to save the dashboard and your preferences.

![v2 dashboard preferences](images/v2_dashboard_settings.png)

### Q: Several of my charts now have warnings. What's going on?

A: We've moved the warning icon from the bottom right of a chart to the top left to make it more visible. Here's an example with v2 on the left and the same chart in v1 on the right:

![v2 warnings](images/v2_warning.png)

Wavefront currently doesn't distinguish between warnings and info messages. For example, if a query specifies a time window but doesn't specify d, m, s, etc., we default to m (minutes) and show a warning. Expect an update in an upcoming release.

### Q: Dashboard variables have changed. Where do I find out more?

A: We have [new documentation](dashboards_variables.html) for dashboard variables.
