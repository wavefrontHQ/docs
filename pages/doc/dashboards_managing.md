---
title: Managing Dashboards
keywords: dashboards
tags: [dashboards]
sidebar: doc_sidebar
permalink: dashboards_managing.html
summary: This topic describes how to manage dashboards.
---
## Creating a Dashboard

The process for creating a dashboard can begin from the All Dashboards page, an existing dashboard, a chart, or the Metrics Browser.

1.  Do one of the following:

    -   In the All Dashboards page, click the **Create Dashboard** button on the filter bar.
    -   From an existing dashboard, click the pencil icon on the right side of the browser window below the task bar, and select New. You can also click **Clone** to create a new dashboard based on the existing dashboard you are currently viewing.
    -   From a chart, scroll down to the **Save to** section and click **New Dashboard**.
    -   From the Metrics Browser, locate **Create Dashboard** in the top left corner of the page and click it to begin the process of creating a dashboard. Creating a dashboard this way automatically creates sections and charts based on the current set of metrics in the Metrics list. Sections are created by first-level nodes, individual charts by second-level nodes and finally all metrics on the third-level or below are rendered on a single chart. Creating a dashboard from the Metrics browser also allows you to apply additional parameters such as sources and source tags.

    A Create New Dashboard dialog displays. Enter a URL and Name for your dashboard. The URL field supports letters, numbers, underscores, and dashes. If you enter a special character or space, then the URL field turns red and requires you to make changes before saving. The Name field supports letters, numbers, characters, and spaces.

2.  Click **Create**. The dashboard displays in edit mode. You can either edit your dashboard at this time or save it and edit at a later time.

<span id="prefs"/>

## Setting Dashboard Preferences

Dashboard preferences include:

-   Dashboard name and description
-   Whether to display the description, <a href="https://community.wavefront.com/docs/DOC-1068#sections" class="jive-link-anchor-small">section TOC</a>, and <a href="https://community.wavefront.com/docs/DOC-1062">dashboard variables</a>
-   A <a href="https://community.wavefront.com/docs/DOC-1063">global events() query</a>
-   Chart title display properties

To open the dashboard preferences dialog, click the wrench icon <span class="fa-wrench fa"/> at the top right of the dashboard.

## Editing a Dashboard

The process for editing an existing dashboard can be started from the All Dashboards page or directly from the existing dashboard page:

-   From the All Dashboards page, locate the dashboard and select ![action_menu.png](images/action_menu.png#inline) **&gt; Edit**.
-   From a dashboard, click the pencil icon <span class="fa-pencil fa"/> on the right side below the task bar, and select **Edit**.

When editing a dashboard, you can make changes to the dashboard description, name, dashboard variables, sections, and charts.

### Dashboard Description and Name

When your dashboard is in edit mode, a clickable link labeled **&lt;&lt;Edit Dashboard Description&gt;&gt;** displays below the time bar. When you click this link, the <a href="https://community.wavefront.com/docs/DOC-1068#prefs" class="jive-link-anchor-small">Dashboard Display Preferences</a> dialog displays.

From here you can rename your dashboard and enter a description. If you enter a description and want it to be displayed on your dashboard, then click **Show Description**. Click **Accept**. If you are viewing your dashboard (not in edit mode) and want adjust your dashboard preferences, click the <a href="https://community.wavefront.com/docs/DOC-1068#prefs" class="jive-link-anchor-small">Dashboard Display Preferences</a> icon.

<span id="sections"/>

### Configuring Dashboard Sections

By default, every dashboard has at least one section. Charts are saved under these sections. While editing a dashboard, you have the option of renaming a section, adding or removing a section, and moving a section up or down on the dashboard.

[<img src="images/Section+Editing.PNG" alt="Section Editing.PNG" class="image-12 jive-image" width="1600" height="61" />](images/Section+Editing.PNG)

To change the name of a section, click the name. When you do this, the section name becomes editable. Hit enter or click anywhere away from the section name after the desired change is made.

From left to right, the icons on the right side of the section allow you to move the selected section above the previous section, move the selected section below the next existing section, add a new section, and delete the selected section. You must save the dashboard for these changes to be permanent.

A section Table of Contents displays directly below the Time bar at the top of the dashboard.


[<img src="images/Section+Table+of+Contents.PNG" alt="Section Table of Contents.PNG" class="image-13 jive-image" width="698" height="102" />](images/Section+Table+of+Contents.PNG)


You can quickly jump to a desired section by clicking it in the Table of Contents. If the Table of Contents is not displayed, then turn it on in the <a href="https://community.wavefront.com/docs/DOC-1068#prefs">Dashboard Display Preferences</a>.

### Resizing Chart Rows

When your dashboard is in edit mode, you can resize individual chart rows on your dashboard by clicking the resize icons to the left side of each chart row:

![Resize.PNG](images/Resize.PNG)

Resizing a chart row affects every chart located in that chart row.

### JSON Editing

All of the changes described above can also be done through the JSON editor. In order to access the JSON editor, click **Edit JSON** next to the **Save** button on the task bar. This link is only displayed when your dashboard is in edit mode. Only use this option if you have a good understanding of JSON.

When editing a dashboard, you may make several changes at a time. If you wish to remove a single change, but not the changes made before it, then you can click the revert icon ![revert.png](images/revert.png#inline) near the **Save** button on the task bar. The revert icon removes changes starting with the most recent and working its way backwards. You can only remove changes this way in the current edit mode session.

## Managing Dashboards

In addition to the abilities listed above, Dashboard Management permission also enables you to delete dashboards, revert dashboards to a previous version, and manage and apply tags.

### Deleting Dashboards

Only users with Dashboard Management permission have the ability to delete a dashboard from Wavefront. This can be done from the All Dashboards page or the specific dashboard page you'd like to remove.

-   From the All Dashboards page, locate the dashboard that you'd like to remove from the dashboards list and select  ![action_menu.png](images/action_menu.png#inline) **&gt; Delete**.
-   If you are viewing a dashboard and want to delete it, click the pencil icon <span class="fa-pencil fa"/> on the right side below the task bar, and select **Delete**.

You are prompted with a secondary message to confirm you want to delete the dashboard. Once confirmed, the dashboard is moved to the Trash bin.  You can view the Trash bin by clicking the trash toggle: Off -![trash_off.png](images/trash_off.png#inline#inline)  On - ![trash_on.png](images/trash_on.png#inline).

If you delete a dashboard by mistake, it can be recovered within 30 days of deletion from the Trash bin. After 30 days, the deleted dashboard is removed from the Trash bin and is no longer be recoverable. If you'd like the deleted dashboard to be permanently removed from the system prior to the 30 day deadline, then you can manually do so from the Trash bin.

### Reverting a Dashboard to a Previous Version

Wavefront keeps track of changes made to a dashboard, and displays those changes in the Dashboard History page. You can access a dashboard’s history from the All Dashboards page or directly from a dashboard.

-   From the All Dashboards page, find the desired dashboard in the list and select ![action_menu.png](images/action_menu.png#inline) **&gt; Versions**.
-   From a dashboard,  click the pencil icon <span class="fa-pencil fa"/> on the right side below the task bar, and select **Versions**.

From the Past Versions page, each revision is listed along with the user who made the change, the day and time it was updated, and the change description.

If an undesired change is made to a dashboard,  select ![action_menu.png](images/action_menu.png#inline) **&gt; Revert**  next to the desired version to go back that version. When you do this, you are asked to confirm that you wish to revert. After confirming, you are sent to the dashboard version you chose. If you go back to the Past Versions page, the change is reflected on the list. You can also choose to view a previous dashboard version before reverting by clicking the number associated with the dashboard change on the Past Versions page.  For a specific dashboard version, select  ![action_menu.png](images/action_menu.png#inline) **&gt; Clone**  to create a new dashboard based on the revision you chose.

### Managing Tags

Tags group together dashboards according to categories you define. By team, datacenter, or geo-location are just a few examples of how tags can be used. Tags display as blue tags in the filter bar and below each dashboard in the All Dashboards page. 

To add tags to dashboards:

1. Choose which dashboards to tag:
    - Click the checkboxes next to the dashboard(s). Click the **+ Tag** button at the top of the page.
    - Click **+tag** below a dashboard.
2. Add existing tags or create a new tag:
    - To add an existing tag, in the Search box optionally type a tag name to filter the list of tags. Click the tag.
    - Click the **Create Tag** button, type a tag name, and click **Add**.

## Managing Charts
 
### Adding Charts to a Dashboard

To add a new chart to a dashboard, first navigate to the dashboard and put it in edit mode.

1.  Find the section you want to place the chart in. Click <span class="fa-plus-circle fa"/>  Add New Chart. An Add Chart box displays.
2.  Enter a ts() expression into the source field. For information on ts() expressions, see <a href="https://community.wavefront.com/docs/DOC-1019" >Getting Started with the ts() Query Language</a> and <a href="https://community.wavefront.com/docs/DOC-1011">Time Series Language - Quick Reference</a>.
3.  In the Chart section, customize your chart. See <a href="https://community.wavefront.com/docs/DOC-1158">Wavefront Chart Types</a> to learn more about customization options.
4.  Click **Accept**. The new chart displays in the section you selected.
5.  Save the dashboard.

### Deleting, Cloning, and Making Permanent Changes to a Chart

If you hover over an existing chart while a dashboard is in edit mode, three icons display in the bottom left corner of the chart box.

[<img src="images/three+icons.PNG" alt="three icons.PNG" class="image-22 jive-image" width="34" height="81" />](images/three+icons.PNG)

The top icon allows you to delete the selected chart. The middle icon clones the selected chart. When you clone an existing chart, it is created in a separate row below the selected chart. The bottom icon allows you to edit the existing chart.

While deleting and cloning a chart is only available when a dashboard is in edit mode, editing a chart is available regardless of the dashboard state. In order to edit a chart when the dashboard is not in edit mode, locate the chart you'd like to edit and click the chart name in the top right corner. When the dashboard is in edit mode, any changes made are permanent only if you save the dashboard. If you choose to begin editing a chart when a dashboard is not in edit mode, then you can permanently save your changes by clicking **Save** from the individual chart page.

### Reorganizing Charts on a Dashboard

You can customize the placement of charts on a dashboard when a dashboard is in edit mode. To do this:

1.  Hover over a chart, left-click your mouse and hold.
2.  Drag the chart to its new position on the dashboard. You can place up to four charts in a row. Keep in mind that the more charts in a row, the smaller each chart will be. Smaller charts in each row also affect the number of point buckets and amount of time represented by each point bucket. You can move a chart to a new row by dragging a chart over an <span class="fa-plus-circle fa"/>  Add New Chart box.
3.  Save your dashboard.

## Creating and Managing Dashboard Variables

You can apply dashboard variables to an existing dashboard. For information on dashboard variables, see [Dashboard Variables](dashboard_variables).

{% include links.html %}
