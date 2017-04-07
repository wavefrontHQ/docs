---
title: Managing Dashboards
keywords: dashboards
tags: [dashboards]
sidebar: doc_sidebar
permalink: dashboards_managing.html
summary: Learn how to manage dashboards.
---

{% include shared/permissions.html entity="dashboards" entitymgmt="Dashboard" %}


## Creating a Dashboard

The process for creating a dashboard can begin from the All Dashboards page, an existing dashboard, a chart, or the Metrics Browser.

1.  Do one of the following:

    -   In the All Dashboards page, click the **Create Dashboard** button on the filter bar.
    -   From an existing dashboard, click the pencil icon <i class="fa-pencil fa"/> on the right side of the browser window below the task bar, and select **New**. You can also click **Clone** to create a new dashboard based on the existing dashboard you are currently viewing.
    -   From a chart, scroll down to the **Save to** section and click **New Dashboard**.
    -   From the Metrics Browser, locate **Create Dashboard** in the top left corner of the page and click it to begin the process of creating a dashboard. Creating a dashboard this way automatically creates sections and charts based on the current set of metrics in the Metrics list. Sections are created by first-level nodes, individual charts by second-level nodes and finally all metrics on the third-level or below are rendered on a single chart. Creating a dashboard from the Metrics browser also allows you to apply additional parameters such as sources and source tags.

    A Create New Dashboard dialog displays. Enter a URL and name for your dashboard. The URL field supports letters, numbers, underscores, and dashes. If you enter a special character or space, then the URL field turns red and requires you to make changes before saving. The Name field supports letters, numbers, characters, and spaces.

2.  Click **Create**. The dashboard displays in edit mode. You can either edit your dashboard at this time or save it and edit at a later time.

## Deploying a Dashboard

Dashboards are stored in JSON format. You can deploy a dashboard JSON file with the [Wavefront API](wavefront_api) using the following command:

```shell
curl -v POST https://<wavefront_instance>.wavefront.com/api/v2/dashboard -d @<dashboard>.json \
  -H "Content-Type: application/json" -H 'X-AUTH-TOKEN: <wavefront_api_token>'
```

<span id="prefs"/>

## Setting Dashboard Preferences

Dashboard preferences include:

-   Dashboard name and description
-   Whether to display the description, [section TOC](#sections), and [dashboard variables](dashboards_variables)
-   A global [events() query](events_queries)
-   Chart title display properties
-   Default [time window](dashboards_interacting#time_window)

To open the dashboard preferences dialog, click the wrench icon <i class="fa-wrench fa"/> at the top right of the dashboard.

## Cloning a Dashboard

The process for cloning an existing dashboard can be started from the All Dashboards page or directly from the existing dashboard page.

1. Open the clone dialog:
  -   From the All Dashboards page, locate the dashboard and select ![action_menu.png](images/action_menu.png#inline) **> Clone**.
  -   From a dashboard, click the pencil icon <i class="fa-pencil fa"/> on the right side below the task bar, and select **Clone**.
1. Specify a new URL.
1. Optionally edit the dashboard name.
1. Click **Clone**.

## Editing a Dashboard

The process for editing an existing dashboard can be started from the All Dashboards page or directly from the existing dashboard page:

-   From the All Dashboards page, locate the dashboard and select ![action_menu.png](images/action_menu.png#inline) **> Edit**.
-   From a dashboard, click the pencil icon <i class="fa-pencil fa"/> on the right side below the task bar, and select **Edit**.

When editing a dashboard, you can make changes to the dashboard description, name, dashboard variables, sections, and charts.

{% include note.html content="Wavefront [system dashboards](dashboards_introductory) are read-only and cannot be edited. If you want to make changes to one of them you must first clone it." %}

### Dashboard Description and Name

When your dashboard is in edit mode, a clickable link labeled **&lt;&lt;Edit Dashboard Description&gt;&gt;** displays below the time bar. When you click this link, the [Dashboard Display Preferences](#prefs) dialog displays.

From here you can rename your dashboard and enter a description. If you enter a description and want it to be displayed on your dashboard, click **Show Description**. Click **Accept**. If you are viewing your dashboard (not in edit mode) and want to change your dashboard preferences, click the <i class="fa-wrench fa"/> icon.

<span id="sections"/>

### Configuring Dashboard Sections

In a dashboard charts are contained in sections. By default, every dashboard has at least one section. A section table of contents displays directly below the time bar at the top of the dashboard. 

![Section_Table_of_Contents](images/section_table_of_contents.png)

You can quickly jump to a desired section by clicking it in the table of contents. If the table of contents is not displayed, then turn it on in the [Dashboard Display Preferences](#prefs).

While editing a dashboard, you have the option of renaming a section, adding or removing a section, and moving a section up or down on the dashboard.

![Section_Editing](images/section_editing.png)

To change the name of a section, click the name. When you do this, the section name becomes editable. Hit enter or click anywhere away from the section name after the desired change is made. The icons on the right side of the section allow you to move the selected section, add a new section, and delete the selected section. You must save the dashboard for these changes to be permanent.

### Resizing Chart Rows

When your dashboard is in edit mode, you can resize individual chart rows on your dashboard by clicking the resize icons on the left side of each chart row:

![resize.png](images/resize.png)

Resizing a chart row affects every chart located in that chart row.

### Editing the Dashboard JSON

You can directly modify any dashboard properties by editing the dashboard's JSON format. To access the JSON editor, click **Edit JSON** next to the **Save** button on the task bar. This link is only displayed when your dashboard is in edit mode. Only use this option if you have a good understanding of JSON.

When editing a dashboard, you may make several changes at a time. If you wish to remove a single change, but not the changes made before it, click the revert icon ![revert.png](images/revert.png#inline) near the **Save** button on the task bar. The revert icon removes changes starting with the most recent and working its way backwards. You can only remove changes this way in the current edit mode session.

## Deleting Dashboards

You can delete a dashboard from the All Dashboards page or the specific dashboard you want to remove.

-  From the All Dashboards page, locate the dashboard that to remove from the dashboards list and select  ![action_menu.png](images/action_menu.png#inline) **> Delete**.
-  If you are viewing a dashboard and want to delete it, click the pencil icon <i class="fa-pencil fa"/> on the right side below the task bar, and select **Delete**.

You are prompted with a secondary message to confirm you want to delete the dashboard. Once confirmed, the dashboard is moved to the Trash bin.  You can view the Trash bin by clicking the trash toggle: Off - ![trash_off.png](images/trash_off.png#inline#inline)  On - ![trash_on.png](images/trash_on.png#inline).

If you delete a dashboard by mistake, it can be recovered within 30 days of deletion from the Trash bin. After 30 days, the deleted dashboard is removed from the Trash bin and is no longer be recoverable. If you'd like the deleted dashboard to be permanently removed from the system prior to the 30 day deadline, then you can manually do so from the Trash bin.

## Managing Dashboard Versions

Wavefront keeps track of changes made to a dashboard, and displays those changes in the Dashboard History page. You can access a dashboard's history from the All Dashboards page or directly from a dashboard.

-   From the All Dashboards page, find the desired dashboard in the list and select ![action_menu.png](images/action_menu.png#inline) **> Versions**.
-   From a dashboard,  click the pencil icon <i class="fa-pencil fa"/> on the right side below the task bar, and select **Versions**.

From the Past Versions page, each revision is listed along with the user who made the change, the day and time it was updated, and the change description.

If you want to revert a change,  select ![action_menu.png](images/action_menu.png#inline) **> Revert**  next to the desired version to go back that version. When you do this, you are asked to confirm that you want to revert. After confirming, you are sent to the dashboard version you chose. If you go back to the Past Versions page, the change is reflected on the list. You can also choose to view a previous dashboard version before reverting by clicking the number associated with the dashboard change on the Past Versions page.  For a specific dashboard version, select  ![action_menu.png](images/action_menu.png#inline) **> Clone**  to create a new dashboard based on the revision you chose.

## Managing Dashboard Tags

See [Tags Overview](tags_overview#entity_tags).

## Managing Charts in Dashboards

### Adding a Chart to a Dashboard

To add a new chart to a dashboard:

1.  Navigate to the dashboard and put it in edit mode.
1.  Find the section you want to place the chart in. Click <i class="fa-plus-circle fa"/> Add New Chart. An Add Chart dialog displays.
    1.  In the New Query field, type a [Wavefront Query Language](query_language_getting_started) expression.
    1.  In the Chart section, [customize your chart](charts).
    1.  Click **Accept**. The new chart displays in the section you selected.
1.  Click **Save**.

### Deleting, Cloning, and Making Permanent Changes to a Chart

If you hover over an existing chart while a dashboard is in edit mode, three icons display in the bottom left corner of the chart box:

![three_icons](images/three_icons.png)

that allow you to delete, clone, or edit the selected chart. When you clone a chart, it is created in a separate row below the selected chart.

While deleting and cloning a chart is available only when a dashboard is in edit mode, editing a chart is always available. To edit a chart when the dashboard is not in edit mode, locate the chart you want to edit and click the chart name in the top right corner. When the dashboard is in edit mode, any changes made are permanent only if you save the dashboard. If you begin editing a chart when a dashboard is not in edit mode, you save your changes by clicking **Save** from the individual chart.

### Reorganizing Charts on a Dashboard

To customize the placement of charts when a dashboard is in edit mode:

1.  Hover over a chart, left-click your mouse, and hold.
2.  Drag the chart to its new position on the dashboard. You can place up to four charts in a row. Keep in mind that the more charts in a row, the smaller each chart will be. Smaller charts in each row also affect the number of point buckets and amount of time represented by each point bucket. You can move a chart to a new row by dragging a chart over an <i class="fa-plus-circle fa"/> Add New Chart box.
3.  Save the dashboard.

{% include links.html %}
