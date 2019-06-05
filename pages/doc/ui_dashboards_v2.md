---
title: Create and Customize Dashboards
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
permalink: ui_dashboards_v2.html
summary: Create dashboards, add charts, and customize dashboard layout.
---

<table style="width: 100%;">
<tbody>
<tr>
<td width="80%">Wavefront dashboards allow you to organize charts into sections, perform global operations such as <a href="ui_examine_data.html#set-the-dashboard-time-window">setting the dashboard time window</a> and use <a href="dashboards_variables.html">setting dashboard variables</a></td>
<td width="20%"><a href="ui_dashboards.html"><img src="/images/classic_button.png" alt="click here for the classic doc"/></a></td>
</tr>
</tbody>
</table>

{% include shared/badge.html content="Every Wavefront user can view dashboards and make temporary changes. You must have Dashboard permission to save changes you make to dashboards." %}

## Create a Dashboard

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To create a dashboard</strong>:
<ol><li>Select <strong>Dashboards > Create Dashboard</strong> from the task bar. </li>
<li>Drag the metrics or chart type widget onto the canvas, and select metrics, filters, and functions now or later. </li>
<li>In the top right, click <strong>Save</strong> and specify a name and URL for the dashboard. The URL field supports letters, numbers, underscores, and dashes.  The Name field supports letters, numbers, characters, and spaces.</li></ol></td>
<td width="60%"><img src="/images/v2_create_dashboard.png" alt="create dashboard"></td>
</tr>
</tbody>
</table>

You can also create a dashboard from the Dashboard browser or the Metrics browser.

* Select **Dashboards > All Dashboards** and click the **Create Dashboard** button.
* Click **Browse > Metrics** and click **Create Dashboard** in the top left corner of the page. Creating a dashboard this way automatically creates sections and charts based on the current set of metrics in the Metrics list. Sections are created by first-level nodes, individual charts by second-level nodes and finally all metrics on the third-level or below are rendered on a single chart.

## Make Changes to Dashboards

If you can view a dashboard can make certain changes in view mode. For most dashboards, you can edit the dashboard and make additional changes in Edit mode.

### Make Changes to a Dashboard in View Mode

You can make many changes to dashboards while in View mode. Even users who don't have dashboard permissions can make those changes, for example, set the time window, change variables, or clone or edit the dashboard.

![dashboard elements](images/v2_dashboard_elements.png)

### Some View Mode Tasks

Here are some of the things you can do:

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Use the <strong>Jump To</strong> menu to go to a section</td>
<td width="60%"><img src="/images/v2_jump_to.png" alt="jump to a section"></td>
</tr>
<tr>
<td>
Select variables.</td>
<td>
<img src="images/v2_select_variables.png" alt="select variables"></td>
</tr>
<tr>
<td>Hide variables bar.</td>
<td>
<img src="images/v2_hide_variables.png" alt="hide variables"></td>
</tr>
<tr>
<td markdown="span">
Share a link to the dashboard, or share access if the dashboard is under [access control](access.html#changing-access-for-individual-dashboards-or-alerts).</td>
<td><img src="/images/v2_share_link.png" alt="share a link"></td>
</tr>
</tbody>
</table>

### Make Changes to a Dashboard in Edit Mode

![dashboard in edit mode](images/v2_dashboard_edit.png)

### Some Edit Mode Tasks

Here are some things you can do in Edit mode.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">Add a chart by dragging a widget onto the dashboard canvas. </td>
<td width="60%">
<img src="images/v2_add_chart_wizard.png" alt="add chart"></td>
</tr>
<tr>
<td>Clone, delete, or edit a chart. (Options available only in View mode.)</td>
<td><img src="/images/v2_dashboard_edit_chart.png" alt="clone a chart"></td>
</tr>
<tr>
<td>Add or edit dashboard variables.</td>
<td>
<img src="images/v2_dashboard_variables.png" alt="select variables"></td>
</tr>
<tr>
<td>Rearrange charts within section or across sections. The grid determines what's possible</td>
<td>See Arranging Charts below. </td>
</tr>
<tr>
<td markdown="span">Add a section by clicking the canvas.</td>
<td><img src="/images/v2_add_section.png" alt="add section"></td>
</tr>
<tr>
<td markdown="span">Delete or move a section using the icons on the right of the section bar.</td>
<td><img src="/images/v2_move_section.png" alt="move a section"></td>
</tr>
</tbody>
</table>

## Set Dashboard Preferences

You can set the dashboard description, time window, and whether to show or hide dashboard variables for each dashboard.

1. Display the dashboard and select **Edit**
2. Click **Settings** in the top right.
3. Set your preferences for the dashboard, click **Accept**, and click **Save** to save the dashboard with the preferences.

## Organize Dashboard Layout

To make it easy to find things, you can organize dashboard layout. The dashboard must be in Edit mode.
* Add and remove sections (1 section minimum).
* Rearrange the charts (12 charts per row maximum)


**To add a section:**
Hover over blank dashboard canvas space and click to add a section.

![add section](/images/v2_add_section.png)

## Add a Chart to a Dashboard

You can add a chart to a dashboard in several ways.

### Add a Chart Using Widgets

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>With the dashboard in Edit mode, drag and drop widgets onto the dashboard canvas </li>
<li>(Optional) Select metrics, filters, and functions.  </li>
<li>Scroll up and select <strong>Save</strong></li>
</ol></td>
<td width="50%"><img src="/images/v2_add_chart_wizard.png" alt="add chart wizard"></td>
</tr>
</tbody>
</table>

### Add a New or Cloned Chart

When you create a chart using **Dashboards > Create Chart**, you'll be prompted to save to a dashboard. When you edit a chart, you can save to the current dashboard, or save a clone to a different dashboard.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>With the dashboard in View mode, create or edit a chart. </li>
<li>Scroll up, select <strong>Save</strong> and start typing to add to an existing dashboard, or save to a new dashboard. </li>
<li>When the target dashboard opens in Edit mode, click and drag to the location of your choice and click <strong>Save</strong> at the top.</li></ol></td>
<td width="50%">
<img src="/images/v2_save_chart_to_new.png " alt="save to dashboard"></td>
</tr>
</tbody>
</table>

## Edit and Save a Dashboard

When you edit a dashboard, you can make changes to the dashboard description, name, [dashboard variables](dashboards_variables.html), sections, and charts.

1. Put the dashboard into Edit mode:
-   From the All Dashboards page, locate the dashboard, click the three dots on the left and and select **Edit**.
![edit dashboard](images/dashboard_edit.png)
-   From a dashboard, click the pencil icon on the right side below the task bar, and select **Edit**.
1. Edit the dashboard.

   When you edit a dashboard, you may make several changes at a time. To remove a change, click the revert icon to the left of **Edit JSON** on the task bar. The revert icon removes changes starting with the most recent and works backwards. You can remove only changes made in the current Edit mode session.
   TBD => v2?
2. To save configuration changes, click **Save** at the top right.

{% include shared/system_dashboard.html %}
