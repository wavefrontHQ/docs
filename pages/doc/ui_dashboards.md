---
title: Create, Customize, and Optimize Dashboards
tags: [getting started, dashboards, charts]
sidebar: doc_sidebar
permalink: ui_dashboards.html
summary: Create dashboards, add charts, customize dashboard layout, and troubleshoot dashboards.
---

Tanzu Observability by Wavefront includes many out-of-the box dashboards, and supports creation and fine-grained customization of dashboards. You organize the information about your environment and fine-tune what users see. For example:
<ul>
<li>Organize charts into sections.</li>
<li>Perform global operations such as setting the dashboard time window.</li>
<li>Use dashboard variables.</li></ul>

[Examine Data with Dashboards and Charts](ui_examine_data.html) explains how to set dashboard preferences, set the dashboard time window, isolate sources and series, and more.

{% include note.html content="All users can view dashboards and make some changes such as setting the time window. You must have the [Dashboard permission](permissions_overview.html) and [Modify access](access.html) to save changes you make to dashboards." %}

## Video

Users with Dashboards permissions can create a new dashboard with one or multiple charts from metrics, a chart type, or an integration. You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_gqelhfur" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.


<p>
<iframe id="kmsembed-1_gqelhfur" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_gqelhfur/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="creating dashboards video"></iframe>
</p>


## Create a Dashboard

You have several options for creating a dashboard:

* Select **Dashboards > Create Dashboard**, drag in the Data or New Chart widget, and follow the wizard to create a single-chart or multi-chart dashboard.
* Select **Dashboards > Create Dashboard**, drag in the Templates widget, and select an integration, then pick the dashboards and charts you'd like to include.
* Select **Dashboards > All Dashboards** and click **Create Dashboard**
* Select **Browse > Metrics** and click **Create Dashboard**.

### Create a Dashboard from Metrics Data or Charts

It's easy to create a dashboard from metrics data or by selecting a chart.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To create a dashboard</strong>:
<ol><li>Select <strong>Dashboards > Create Dashboard</strong> from the toolbar. </li>
<li>Drag the <strong>Data</strong> or <strong>New Chart</strong> widget to the canvas</li>
<li>Select metrics, filters, and functions now or later. </li>
<li>In the top right, click <strong>Save</strong> and specify a name and URL for the dashboard.
<ul>
  <li>The Name field supports letters, numbers, characters, and spaces.</li>
  <li>The URL field supports letters, numbers, underscores, and dashes.</li>
</ul></li></ol></td>
<td width="50%"><img src="/images/v2_create_dashboard.png" alt="create a dashboard by selecting data or creating a chart"></td>
</tr>
</tbody>
</table>

### Create a Dashboard from Integration Templates

You can create a dashboard by specifying an integration dashboard as a template.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To create a dashboard</strong>:
<ol><li>Select <strong>Dashboards > Create Dashboard</strong> from the toolbar. </li>
<li>Drag the <strong> Integration Templates</strong> widget to the canvas. </li>
<li>Select first the source integration, then the dashboard you want as a template, and then one or more charts from that dashboard.</li>
<li>In the top right, click <strong>Save</strong> and specify a name and URL for the dashboard.
<ul>
<li>The Name field supports letters, numbers, characters, and spaces.</li>
<li>The URL field supports letters, numbers, underscores, and dashes. </li>
</ul>
</li></ol></td>
<td width="50%"><img src="/images/v2_create_dashboard_template.png" alt="create a dashboard from a template"></td>
</tr>
</tbody>
</table>

### Create a Dashboard from a Tracing Template

The Wavefront service dashboard includes a set of charts to monitor the trace data sent by each service in your application. You can use the service dashboard as a template to create your dashboard and then customize the charts for your environment.

{% include note.html content="To view data in these charts, your applications need to send trace data to the Wavefront service. See [Instrument Your Applications](tracing_instrumenting_frameworks.html) for details." %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To create a dashboard</strong>:
<ol><li>Select <strong>Dashboards > Create Dashboard</strong> from the toolbar. </li>
<li>Drag the <strong>Tracing Templates</strong> widget to the canvas. </li>
<li>Select the charts to import and click <strong>Import Charts</strong>.</li>
<li>In the top right, click <strong>Save</strong> and specify a name and URL for the dashboard.
  <ul>
    <li>The Name field supports letters, numbers, characters, and spaces.</li>
    <li>The URL field supports letters, numbers, underscores, and dashes.</li>
  </ul>
</li>
<li>To view data that is specific to an application and service, use the <strong>application</strong> and <strong>service</strong> dropdowns.</li>
</ol></td>
<td width="50%"><img src="/images/create_tracing_template.png" alt="create a dashboard from a tracing template"></td>
</tr>
</tbody>
</table>

**Take a look at the cool actions you can do using these charts:**
* [Explore the Default Service Dashboard](tracing_service_dashboard.html) and navigate to the Tracing UI from the Service Dashboard
* To delete or edit a chart, see [Clone, Delete, or Edit a Chart](#clone-delete-or-edit-a-chart).

### Create a Dashboard by Importing Sections from Other Dashboards

You can create a dashboard by importing sections from other dashboards.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To create a dashboard</strong>:
<ol><li>Select <strong>Dashboards > Create Dashboard</strong> from the toolbar. </li>
<li>Drag the <strong>Dashboard Templates</strong> widget to the canvas. </li>
<li>Search for a dashboard by its name or use the <strong>Dashboard list filters</strong>.</li>
<li>Select the sections to import and click <strong>Import sections</strong>.</li>
<li>In the top right, click <strong>Save</strong> and specify a name and URL for the dashboard.
  <ul>
    <li>The Name field supports letters, numbers, characters, and spaces.</li>
    <li>The URL field supports letters, numbers, underscores, and dashes.</li>
  </ul>
</li>
</ol></td>
<td width="50%"><img src="/images/import_dashboard_section.png" alt="The new Dashboard Templates button allowing you to select and import dashboard sections."></td>
</tr>
</tbody>
</table>


## Edit or Clone a Dashboard

The dashboard menu allows you to create a dashboard, edit a dashboard, clone a dashboard, and look at the dashboard version history.

* When you **clone** a dashboard, you copy the dashboard. If you want to customize one of the read-only dashboards, such as integration dashboards, just clone the dashboard and edit the clone.
* The dashboard  **version history** tracks each saved version and includes the user who saved the version. The result is an audit trail for the dashboard.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To edit a dashboard</strong>:
<ol><li>Click the ellipsis icon in the top right of the dashboard and select <strong>Edit</strong>. </li>
<li>Make changes to the dashboard in edit mode.</li>
<li>Save the dashboard.</li></ol></td>
<td width="50%"><img src="/images/v2_edit_dashboard.png" alt="edit a dashboard"></td>
</tr>
<tr>
<td width="50%">
<strong>To clone a dashboard</strong>:
<ol><li>Click the ellipsis icon in the top right of the dashboard and select <strong>Clone</strong>. </li>
<li>Accept the suggested URL and dashboard name or specify new ones. Do not include <code>https://</code> in the URL string.  </li>
<li>Save the cloned dashboard.</li></ol></td>
<td width="50%"><img src="/images/v2_clone_dashboard.png" alt="clone a dashboard"></td>
</tr>
</tbody>
</table>

## Examine Metrics in Dashboard View Mode

All users can examine metrics, set the time window, and make temporary changes to dashboards. See [Examine Data](ui_examine_data.html) for details.

![An annotated screenshot with the activities listed below that users can do with a dashboard](images/v2_dashboard_elements.png)

Here are some examples of what [all users can do](ui_examine_data.html):
* Set and fine-tune the time window
* Find a dashboard section
* Filter with global filters or dashboard variables
* Find a dashboard
* Isolate sources or series



## Make Changes to a Dashboard in Edit Mode

When you create a dashboard or when you edit a dashboard, the dashboard is in Edit mode. In Edit mode, you can make several changes at a time, then save all changes to dashboard layout or to charts.

{% include note.html content="System dashboards are *read-only*. To make your own version of a system dashboard, select **Clone** from the ellipsis menu in the top right and make changes to the clone. " %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
A system dashboard has a lock icon next to the name.</td>
<td width="50%"><img src="/images/system_dashboard.png" alt="lock icon next to tutorial dashboard"></td>
</tr>
</tbody>
</table>

Here are some actions you can perform in a dashboard.

![dashboard in edit mode](images/v2_dashboard_edit.png)

### Add a Chart Using Drag and Drop

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>Drag and drop widgets to the dashboard canvas. </li>
<li>(Optional) Select metrics, filters, and functions.  </li>
<li>Scroll up and click <strong>Save</strong></li>
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
<li>Click one of the icons and follow the prompts. </li>
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
<li>Click the <strong>Edit</strong> icon next to a variable to edit the variable.</li>
<li>Click the <strong>Add</strong> button to <a href="dashboards_variables.html">add a variable</a>.</li>
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
<td width="50%"><img src="/images/v2_add_section.png" alt="add a section"></td>
</tr>
</tbody>
</table>


### Add a New or Cloned Chart

When you create a chart using **Dashboards > Create Chart**, you're prompted to save it to a dashboard. When you edit a chart, you can save to the current dashboard, or save a clone to a different dashboard.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>With the dashboard in View mode, create or edit a chart. </li>
<li>Click the <strong>v</strong> icon next to the <strong>Save</strong> button and make a choice:
<ul><li>To save to an existing dashboard, start typing the name of the dashboard, select the dashboard, and click <strong>Insert</strong>.</li>
<li>To save to a new dashboard, click <strong>Save to New Dashboard</strong>, enter the dashboard name and URL, and click <strong>Create</strong>. Specify only the URL string and do not include <code>https://</code>. </li> </ul></li>
<li>When the target dashboard opens in Edit mode, click and drag the chart to the location of your choice and click <strong>Save</strong> at the top.</li></ol></td>
<td width="50%">
<img src="/images/v2_save_chart_to_new.png " alt="save to dashboard"></td>
</tr>
</tbody>
</table>

### Undo and Revert Undo Operations

You can undo dashboard changes.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>Edit the dashboard and make one or more changes.</li>
<li>Click the icons to undo and to redo the operations. </li> </ol></td>
<td width="50%"><img src="/images/v2_undo.png" alt="Undo and redo icons"/></td>
</tr>
</tbody>
</table>

### Set Dashboard Display Preferences and Settings

For each dashboard, you can customize display preferences and settings.

{% include tip.html content="To use the dark theme, set it as a personal preferences [from the gear icon](users_account_managing.html#configure-user-preferences)."%}

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<strong>To set the dashboard settings</strong>:
<ol><li>Navigate to a dashboard and click the ellipsis icon in the top right corner of the dashboard.</li>
<li>Select <strong>Edit</strong>. </li>
<li>Click <strong>Settings</strong>.</li>
<li>Make selections in the dialog:
<ol><li>Set the default time window. You can later override the time window. <br />Time window settings on a dashboard level apply to all charts for which you have selected to use the <strong>Default to dashboard time window</strong> option. If you have set a fixed time window on a chart, the time window on that specific chart won’t be affected. </li>
<li>Deselect the <strong>Show Variable Bar by Default</strong> check box to hide the variables for the dashboard. Users can still show the variables bar using the <img src="/images/show_hide_variable_icon.png"
style="vertical-align:text-bottom;width:25px" alt="show or hide variable icon" /> icon.  </li>
<li>Select whether you want to turn off live refresh for dynamic variables.</li>
</ol>
</li>
<li>Optionally, change the advanced settings.
<ol>
<li>Click <strong>Advanced</strong>.<br/>
</li>
<li>Enter an event query to display the <a href="events.html">Events</a> on charts.<br>
See <a href="charts_events_displaying.html#specify-an-events-query-for-a-dashboard">Specify an Events() Query for a Dashboard</a>.
</li>
<li>Select <strong>Include Obsolete Metrics</strong> to allow queries to return <a href="metrics_managing.html#obsolete-metrics">obsolete metrics</a>.<p><strong>Tip</strong>: To see the obsolescence period for your metrics and sources, hover over the <strong>Include Obsolete Metrics</strong> information icon.</p><p> <strong>Warning</strong>: Including obsolete metrics might negatively affect performance. It applies to all charts in the dashboard and dashboard performance might suffer.</p></li>
<li>Select <strong>Hide Warning Icons on Charts</strong> to stop showing warning icons on any chart in the dashboard. <p><strong>Warning</strong>: The result is a cleaner-looking chart, but you might miss important information.</p></li>
</ol>
</li>
<li>Click <strong>Accept</strong>, and click <strong>Save</strong>. </li>
</ol></td>
<td width="50%"><img src="/images/v2_dashboard_prefs.png" alt="Set the dashboard preferences"></td>
</tr>
</tbody>
</table>


## Edit the Dashboard JSON

Most users create and edit dashboards by using the GUI or automate the process with the Wavefront REST API. But at times, it's convenient to edit the dashboard JSON directly from the UI and see results immediately.

{% include warning.html content="Editing the dashboard JSON might have unintended consequences. Use the JSON editor only if you have some experience with JSON. " %}

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>To put the dashboard in Edit mode, click the ellipsis icon, select <strong>Edit</strong>, and then click <strong>JSON</strong>. </li>
<li>Consider selecting <strong>Code</strong> from the drop-down menu. Code view supports adding information. </li>
<li>Consider a select all/copy/paste into a JSON editor for full validation. </li>
<li>Add condition information, as shown in the example below, paste the revised content back into the dashboard editor, and click <strong>Accept</strong></li></ol></td>
<td width="50%"><img src="images/dashboard_code_view.png" alt="Switch from Tree view to Code view"/></td>
</tr>
</tbody>
</table>

## Conditional Dashboard Sections

You can make dashboard sections conditional by using the JSON editor. If a dashboard has conditional sections:
* Each section is shown only if the condition is met, and invisible in the <strong>Jump To</strong> menu and the dashboard.
* If the condition is met:
  - The <strong>Jump To</strong> menu shows a number to indicate how many conditional sections are displayed. Default color is grey.
  - A customizable tooltip indicates that the section is conditional.
  - The number and tooltip also display next to the conditional section.

 The following JSON snippets shows dashboard attributes and dashboard sections to use for conditional sections.

### Customize Dashboard Attributes


{% raw %}
 ```handlebars
 dashboardAttributes: {
   // Text to replace the "Jump To" label on the dashboard view page.
   // This property is optional.
   jumpToLabel: string
   // When section conditions are met, a count badge is rendered to the right of the "Jump To"
   // dropdown control.  The default badge style is SMOKE.  Users can customize this style by setting
   // the badge color here.  Valid values are SEVERE, WARN, INFO, SUCCESS, and SMOKE.
   // This property is optional.
   conditionBadgeColor: string
 }
 ```
 {% endraw %}

### Customize Dashboard Sections to Be Conditional

{% raw %}
 ```handlebars
 sections: [
   {
     name: string  // Section name, if not specified, the text "Untitled" is shown in the section header
     rows: array   // Array of visual components in this section
     // This property is optional.  If specified, then query is required.
     sectionFilter: {
       // Query to run to determine if the section should be shown.  The section is shown if the last
       // value in the time series is non-zero.
       query: string
       // Text to show as tooltip when users mouse over the condition check-circle icon.
       // If not specified, then the query is shown as the tooltip.
       // This property is optional.
       description: string
       // Time in seconds to add to start time for condition query.  By default, condition query uses
       // the dashboard time window, but you can use this property to increase the time window of the
       // condition query.
       // This property is optional.
       leadingTimeWindowSec: integer
     }
   }
 ]
 ```
 {% endraw %}

### Example: Add Conditional Sections

This somewhat contrived example:
* Uses a condition that's always true for the `Proxy Troubleshooting` section.
* Uses the SEVERE color to show conditional sections are included.
* Specifies the tooltip in the `description` field.


{% include warning.html content="Editing the dashboard JSON might have unintended consequences. Use the JSON editor only if you have some experience with JSON. " %}

Here's the snippet that:
* Changes the label from `Jump To` to `New Label`, a good way to make sure things are working while experimenting.
* Sets the color for the condition badge, a small circle with the number of conditions inside. If the condition is met, the badge is shown on the Jump To menu and on next to the conditional section.

```
{
  "name": "Example Dashboard",
  ...
  "dashboardAttributes": {
    "jumpToLabel": "New Label",
    "conditionBadgeColor": "SEVERE"
  }
  ...
}
```

Here's the section filter that conditionally shows the **Proxy Troubleshooting** section. This example uses a query that is always true (`1 > 0`), and includes the tooltip text `Condition for this section was met`.

```
"sections": [
  {
    "name": "Proxy Troubleshooting",
    ...
    "sectionFilter": {
        "query": "1 > 0",
        "description": "Condition for this section was met"
    }
    ...
  }
  ...
]
```

After you've saved these changes:

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">The <strong>Jump To</strong> menu uses the NEW LABEL text and shows 1 to indicate there's one conditional section, in red (SEVERE).
<img src="images/condition_label.png" alt="Jump to menu with highlighted number and Proxy Troubleshooting highlighted."/></td>
<td width="50%">Hover text alerts the user that the section is conditional - you can change the text as appropriate.
<img src="images/condition_hover_text.png" alt="Hover text indicates condition has been met."/></td>
</tr>
</tbody>
</table>

## Ensure Optimal Dashboard Performance

### Video: Optimize Dashboard Performance

Watch this video to learn how to optimize dashboard and query performance.

<p>
<iframe id="kmsembed-1_ynnxe6tn" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_ynnxe6tn/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0"></iframe>
</p>


The Wavefront service can ingest and process very large amounts of data. Here's what you can do to ensure performance is optimal.

### Watch for Cardinality Issues

Ensure your data shape works well. Ingest only time series you need -- and then look only at those data you’re interested in.

* See [Cardinality and Wavefront](cardinality.html) for some background and a video.
* See [Optimizing the Data Shape to Improve Performance](optimize_data_shape.html) for an in-depth discussion with examples.

### Optimize Query Performance

Wavefront Query Language (WQL) has a rich set of options. See [Optimize Query Performance](query_language_performance.html) for details.

* At times, you have to choose between precision and speed.
* At other times, customizing your query to filter out data you don't need improves performance significantly.

### Use Sampling Settings for the Dashboard or Individual Charts

You can limit the number of time series to 100 either at the dashboard level or for individual charts. See [Improve Display Speed with the Sampling Option](ui_charts.html#improve-display-speed-with-the-sampling-option) for details.

{% include tip.html content="This option might not be available on older dashboards."%}

### Use Live Mode with Care

Dashboards are either set to a specified time window or to Live mode. In Live mode, the time window for a chart determines how often the charts in a dashboard refresh.
* Charts with a time window of 5-10 minutes reload every second.
* Charts with a larger time window (e.g. 4 hours or 1 day) reload every 30 second.

Do not run charts with a 5-10 minute time window for a long time in Live mode.


### Display the Events You Need

Querying metrics and querying events are different tasks. By default, each chart displays all source events and system events as black points or stars at the bottom of each chart. Those queries affect chart and dashboard performance. With the 2022-40.x release, the default option for newly created dashboards is set to **None**, i.e. all events from every chart in the dashboard are hidden by default.

You can:
* Select an individual chart, click the **Format** tab, and deselect **Display Source Events**.
* Adjust events for the whole dashboard by using the **Show Events** drop-down menu in the top right.

See [Control Event Overlays](charts_events_displaying.html#control-event-overlays) for details and screenshots.

### Use Dynamic Dashboard Variables with Care

[Dynamic dashboard variables](dashboards_variables.html#dynamic-dashboard-variables) are used to display a list of possible values to the end user. The values are computed by a query.

Avoid using expensive queries in dynamic dashboard variables. If the query for the dynamic dashboard variable is complex, it slows down the dashboard loading. Keep queries simple, and consider using a [derived metric](derived_metrics.html), which uses a query that has already been executed and stored.

### Turn off Dynamic Dashboard Variable Live Refresh

When a dashboard has a lot of variables with interdependencies, it might make sense to turn off live refresh for dynamic variables. Only users with **Dashboards** permission can toggle this setting.

<table style="width: 100%;">
<tbody>
<tr>
<td width="50%">
<ol><li>Open the dashboard for edit, either from the Dashboards browser or from the ellipsis icon in the top right of the dashboard..  </li>
<li>Click <strong>Settings</strong> </li>
<li>Select <strong>Disable Variable Refresh in Live Mode</strong>. </li></ol>
<p>Going forward, <strong>Variable Refresh Disabled</strong> info text show up to the right of the variables bar. Users no longer see the potentially distracting refresh of each chart. An explicit brower refresh updates all variables.</p></td>
<td width="50%">
<img src="/images/variable_refresh.png " alt="save to dashboard"></td>
</tr>
</tbody>
</table>

### Identify Unused Dashboards

Over time, as more and more dashboards are created, there will be dashboards that are no longer in use. To keep your environment clean and to ensure that useful dashboards can be easily found, it's a good practice to [delete](#delete-and-recover-a-deleted-dashboard) unused dashboards on a regular basis. To do that, you must first identify which dashboards are no longer being used or viewed.

* Use the Dashboard Browser to sort the dashboards in ascending order by the number of views over the last day, week, or month. This puts the fewest viewed dashboards at the top of the list.
![Dashboard browser with Sort menu](images/dashboards_unused.png)

* Use the Wavefront API and UI to check for dashboards that have not been viewed over a time window of your choice, including more than 4 weeks (a month).
    1. Get the IDs of all dashboards.
        1. From the gear icon on the toolbar, select **API Documentation**.
        2. Expand the **Dashboard** category and click the `GET api/v2/dashboard` request.

            {% include note.html content="You may need to iterate through all the available dashboards by using the `offset` parameter in the API request."%}
        3. Click **Execute**.

            The `id` value for each entry in the response is the dashboard ID.

    2. In the UI, find all dashboards that have been viewed over the time window of interest.

        The internal metric ``~wavefront.dashboard.<dashboard_id>.views`` tracks the views of each dashboard.

        Create a table chart with the query of the type:

        ``aliasMetric(mmax(12w, ts(~wavefront.dashboard.*.views)), 2)``

        You will get the IDs of the dashboards that have been viewed over the last 12 weeks.

    3. Find all unviewed dashboards.

        Now that you have the IDs of all dashboards and the IDs of all dashboards that have been viewed, you can take the difference and get all of the IDs of the unviewed dashboards.

## Delete and Recover a Deleted Dashboard

You can delete a single or multiple dashboards that you [no longer use](#identify-unused-dashboards). After you delete a dashboard, it is moved to the trash for 30 days before it gets permanently deleted. If a dashboard has been permanently deleted, users will no longer be able to restore it without the assistance of a Super Admin. See [Recover a Permanently Deleted Dashboard](access.html#recover-a-permanently-deleted-dashboard) for details.

**To delete a dashboard:**

1. Select **Dashboards > All Dashboards**.
2. Search for and select the check boxes of the dashboards that you want to delete.
3. Click the delete icon on top and confirm the deletion.

**To restore a deleted dashboard from the trash:**

1. Select **Dashboards > All Dashboards**.
2. From the **All** menu in the top right of the list of dashboards, select **Deleted**.

   ![Change the dashboard view from all to deleted.](/images/deleted-dashboards.png)

3. Search for and select the dashboard that you want to restore.
4. Click the ellipsis icon and select **Restore**.

   ![Restore a dashboard from the trash.](/images/restore-dashboard.png)

## Audit Dashboard Changes

Users need to audit dashboard changes in several situations:
* A dashboard was saved with incorrect changes and the previous configuration isn't known.
* A dashboard was changed. An audit needs to determine when it was updated and by whom.
* A dashboard was deleted. Audit needs to determine when it was deleted and by whom.

Each time you save a dashboard, you create a dashboard version. Up to 100 versions are supported.

**To audit or restore a dashboard:**

<table style="width: 100%;">
   <tbody>
   <tr>
   <td width="75%">
   <ol>
   <li>Find the Dashboard in the Dashboards Browser. </li>
   <li>Click the ellipsis icon and select <strong>Version History</strong>.</li>
   <li>Select a version and revert or clone that version.</li>
   </ol>
   </td>
   <td width="25%" markdown="span">![screenshot ellipsis menu, versions highlited](images/dashboard_versions_detail.png) </td></tr>
   </tbody>
</table>
![version list, ellipsis menu shows versions](images/dashboard_select_version.png)

## Troubleshoot and Learn More!

* [Troubleshooting Missing Data](missing_data_troubleshooting.html) can help if you don't see what you expect.

The Customer Success team prepared this KB article about migrating data between environments:
* [Migrating Objects or Data Between Environments](https://help.wavefront.com/hc/en-us/articles/360053164791-Migrating-Objects-or-Data-Between-Tanzu-Observability-Environments)
