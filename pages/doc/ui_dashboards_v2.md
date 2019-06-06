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
<td width="80%">Wavefront dashboards allow you organize and customize the information about your environment. For example:
<ul>
<li>Organize charts into sections</li>
<li>Perform global operations such as setting the dashboard time window.</li>
<li>Use dashboard variables.s</li></ul></td>
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

You can also create a dashboard from the Dashboard browser (**Dashboards > All Dashboards**) or the Metrics browser (**Browse > Metrics**).

## Examine Metrics in View Mode

You can examine metrics and make several temporary changes to your dashboard in View Mode

You can make many changes to dashboards while in View mode. Even users who don't have dashboard permissions can make those changes, for example, set the time window, change variables, or clone or edit the dashboard.

![dashboard elements](images/v2_dashboard_elements.png)

### Use the Jump To Menu to Find a Section
Most dashboards have several sections. They're easy to access.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Use the <strong>Jump To</strong> menu to go to a section</td>
<td width="60%"><img src="/images/v2_jump_to.png" alt="jump to a section"></td>
</tr>
</tbody>
</table>

### Select Variables

Unless your administrator has removed variables from view, you can select variables, for example, for different environment, to examine exactly what you need.
<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Scroll up to the Variables bar and select one or more variables.</td>
<td width="60%">
<img src="images/v2_select_variables.png" alt="select variables"></td>
</tr>
</tbody>
</table>

### Hide Variables Bar

With the dashboard in View mode, you can temporarily hide the variables bar.
<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
Scroll up to the Variables bar and select the up or down double ^.</td>
<td width="60%">
<img src="images/v2_hide_variables.png" alt="hide variables"></td>
</tr>
</tbody>
</table>


## Make Changes to a Dashboard in Edit Mode

When you create a dashboard or when you edit a dashboard, the dashboard is in Edit mode. In Edit mode, you can make several changes at a time, then save all changes to layout or charts.

To remove a change, click the revert icon to the left of **Edit JSON** on the task bar. The revert icon removes changes starting with the most recent and works backwards. You can remove only changes made in the current Edit mode session.

![dashboard in edit mode](images/v2_dashboard_edit.png)

### Add a Chart Using Drag and Drop

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

### Clone, Delete, or Edit a Chart

Editing a chart is different in View mode and in Edit mode:
* With a dashboard in View mode, click the chart title to edit a chart. <br>
* With a dashboard in Edit mode, use the icons on any chart.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>With the dashboard in Edit mode, place the cursor inside a chart. </li>
<li>Select one of the icons and follow the prompts. </li>
</ol>
</td>
<td width="50%"><img src="/images/v2_dashboard_edit_chart.png" alt="clone a chart"></td>
</tr>
</tbody>
</table>

### Add or Edit Dashboard Variables

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
With the dashboard in Edit mode:
<ol>
<li>Scroll up to the Variables bar.  </li>
<li>Click the Edit icon to edit a variable.</li>
<li>Click the Add button to add a variable.</li>
</ol>
</td>
<td width="50%">
<img src="images/v2_dashboard_variables.png" alt="select variables"></td>
</tr>
</tbody>
</table>

### Change Dashboard Layout

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">With the dashboard in Edit mode:
<ul><li>Rearrange charts within section or across sections (12 charts per row maximum). The grid determines what's possible.</li>
<li>Click the canvas to add a section. </li>
<li>Delete or move a section using the icons on the right of the section bar.</li>
</ul>
</td>
<td width="50%"><img src="/images/v2_add_section.png" alt="add section"></td>
</tr>
</tbody>
</table>


### Add a New or Cloned Chart

When you create a chart using **Dashboards > Create Chart**, you're prompted to save to a dashboard. When you edit a chart, you can save to the current dashboard, or save a clone to a different dashboard.

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



{% include shared/system_dashboard.html %}
