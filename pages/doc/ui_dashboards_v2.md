---
title: Create and Customize Dashboards
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
published: false
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
<li>Use dashboard variables.</li></ul></td>
<td width="20%"><a href="ui_dashboards.html"><img src="/images/classic_button.png" alt="click here for the classic doc"/></a></td>
</tr>
</tbody>
</table>

[Examine Data with Dashboards and Charts](ui_examine_data.html) explains how to set dashboard preferences, set the dashboard time window, isolate sources and series, and more.

{% include shared/badge.html content="Every Wavefront user can view dashboards and make some changes such as setting the time window. You must have Dashboard permission and Modify access to save changes you make to dashboards." %}

## Create a Dashboard

You have several options for creating a dashboard:

* Select **Dashboards > Create Dashboard**, drag in the Metrics or New Chart widget, and follow the wizard to create a single-chart or multi-chart dashboard.
<!---* Select **Dashboards > Create Dashboard**, drag in the Templates widget, and select an integration, then pick the dashboards and charts you'd like to include.--->
* Select **Dashboards > All Dashboards** and click **Create Dashboard**
* Select **Browse > Metrics** and click **Create Dashboard**.

<!---### Create a Dashboard from Metrics or Charts

It's easy to create a dashboard from metrics or by selecting a chart.--->

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

<!---
### Create a Dashboard from a Template

With release 2019.38, you can create a dashboard by specifying an integration dashboard as a template.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To create a dashboard</strong>:
<ol><li>Select <strong>Dashboards > Create Dashboard</strong> from the taskbar. </li>
<li>Drag the <strong>Templates</strong> widget onto the canvas. </li>
<li>Select first the source integration, then the dashboard you want as a template, and then one or more charts from that dashboard.</li>
<li>In the top right, click <strong>Save</strong> and specify a name and URL for the dashboard. The URL field supports letters, numbers, underscores, and dashes.  The Name field supports letters, numbers, characters, and spaces.</li></ol></td>
<td width="60%"><img src="/images/v2_create_dashboard_template.png" alt="create dashboard from template"></td>
</tr>
</tbody>
</table>--->


## Edit or Clone a Dashboard

The dashboard menu allows you to create a dashboard, edit a dashboard, clone a dashboard, and look at the dashboard version history.

* When you **clone a dashboard** you copy the dashboard. If you want to customize one of the Wavefront read-only dashboards, such as integration dashboards, just clone the dashboard and edit the clone.
* The **dashboard version history** tracks each saved version and includes the user who saved the version. The result is an audit trail for the dashboard.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To edit a dashboard</strong>:
<ol><li>Select the ellipsis icon in the top right of the dashboard. </li>
<li>Select <strong>Edit</strong> and make changes to the dashboard in edit mode.</li>
<li>Save the dashboard.</li></ol></td>
<td width="60%"><img src="/images/v2_edit_dashboard.png" alt="edit a dashboard"></td>
</tr>
<tr>
<td width="40%">
<strong>To clone a dashboard</strong>:
<ol><li>Select the ellipsis icon in the top right of the dashboard and select <strong>Clone</strong>. </li>
<li>Accept the suggested URL and dashboard name we suggest, or specify them. For the URL, do not include <code>https://</code>. Specify only the URL string. </li>
<li>Save the cloned dashboard.</li></ol></td>
<td width="60%"><img src="/images/v2_clone_dashboard.png" alt="clone a dashboard"></td>
</tr>
</tbody>
</table>

## Examine Metrics in Dashboard View Mode

You can examine metrics and make several temporary changes to your dashboard in View Mode.

You can make temporary changes to dashboards while in View mode. Even users who don't have dashboard permissions can make those changes, for example, set the time window, change variables, or clone or edit the dashboard.

![dashboard elements](images/v2_dashboard_elements.png)

### Use the Jump To Menu to Find a Section
Most dashboards have several sections. They're easy to access from the Jump To menu.

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

Unless your administrator has removed variables from view, you can select variables to examine exactly what you need (for example select the environment).
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

### Hide the Variables Bar

With the dashboard in View mode, you can temporarily hide the variables bar.
<table style="width: 100%;">
<tbody>
<tr>
<td width="60%">
Scroll up to the Variables bar and select the up or down double ^.</td>
<td width="40%">
<img src="images/v2_hide_variables.png" align="center" valign="center" alt="hide variables"></td>
</tr>
</tbody>
</table>


## Make Changes to a Dashboard in Edit Mode

When you create a dashboard or when you edit a dashboard, the dashboard is in Edit mode. In Edit mode, you can make several changes at a time, then save all changes to dashboard layout or to charts.

{% include shared/system_dashboard.html %}

<!---
To remove a change, click the revert icon to the left of **Edit JSON** on the taskbar. The revert icon removes changes starting with the most recent and works backward. You can remove only changes made in the current Edit mode session.--->

![dashboard in edit mode](images/v2_dashboard_edit.png)

### Add a Chart Using Drag and Drop

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>Drag and drop widgets onto the dashboard canvas </li>
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
<ol><li>Place the cursor inside a chart. </li>
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
<li>Click the Add button to <a href="dashboards_variables.html">add a variable</a>.</li>
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

### Undo and Revert Undo Operations

Starting with release 2018.46.x, we support undo in dashboard edit mode. Use the two icons in the top menu bar.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<p>With your dashboard in Edit mode, you can now undo and redo changes to the dashboard. </p></td>
<td width="60%"><img src="/images/v2_undo.png" alt="Undo and redo icons"/></td>
</tr>
</tbody>
</table>

### Set Dashboard Display Preferences

For each dashboard, you can customize display preferences.

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">
<strong>To set the dashboard display preferences</strong>:
<ol><li>Display a dashboard and select <strong>Edit</strong>. </li>
<li>Click <strong>Settings</strong></li>
<li>Make selections in the dialog, click <strong>Accept</strong>, and click <strong>Save</strong> </li>
<li>Optionally, you can display the <a href="events.html">Events</a> on charts using the Show Events dropdown.<br>
For more information on the options listed in the Show Events dropdown, see <a href="charts_events_displaying.html#control-event-overlays">Control Events Overlays</a>.</li>
</ol></td>
<td width="60%"><img src="/images/v2_dashboard_prefs.png" alt="set dashboard prefs"></td>
</tr>
</tbody>
</table>

**Note** To use the dark theme with your dashboard and all other Wavefront UI components, set your personal preferences [from the gear icon](users_account_managing.html#configuring-user-preferences).


{% include shared/system_dashboard.html %}
