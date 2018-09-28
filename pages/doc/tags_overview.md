---
title: Organizing with Tags
tags: [getting started, alerts, dashboards, events, videos]
sidebar: doc_sidebar
permalink: tags_overview.html
summary: Learn how to use tags to focus and speed up queries display and to unclutter the UI.
---
A tag is custom metadata that adds application-specific meaning to Wavefront objects such alerts, dashboards, events, and sources and metrics.

Watch the following video for an introduction to point tags and source tags:

<p><a href="https://www.youtube.com/watch?v=9tt4orZHQts&index=3&list=PLmp0id7yKiEdaWcjNtGikcyqpNcPNbn_K"><img src="/images/v_tagging_clement.png" style="width: 700px;" alt="tagging"/></a>
</p>


## Why Tags?

You use tags in several ways:
* **[Point tags](query_language_point_tags.html)** -- Add dimensions to your query with point tags. For example, examine only metrics from a certain region.
* **[Source tags](source_tags.html)** -- Group your sources. For example, examine only production hosts but not development hosts.
  **Note:** Information about the source is part of each metric, but you add source tags explicitly from the UI, CLI, or API.
* **Alert tags** -- Find alerts or to exclude tagged alerts froma maintenance window.
* **Object tags** -- Limit the number of objects (e.g. dashboards) and metrics. For example, you might  display only dashboards with a certain tag.

You can use tags to filter alerts, dashboards, events, and sources from the Wavefront UI or with the REST API.

### How to Use Different Tag Types

<table>
<colgroup>
<col width="16%"/>
<col width="28%"/>
<col width="28%"/>
<col width="28%"/>
</colgroup>
<thead>
<tr>
<th>Tag Type</th>
<th>Usage Example</th>
<th>Add and Update</th>
<th>Query</th>
</tr>
</thead>
<tbody>
<tr>
<td>point tag</td>
<td markdown="span">Filter metrics.</td>
<td markdown="span">Often part of data source, or you can add using [proxy preprocessor rules](proxies_preprocessor_rules.html#point-altering-rules). </td>
<td markdown="span"> Filter and perform [series matching](query_language_series_matching.html) </td>
</tr>
<tr>
<td>source tag</td>
<td>Filter sources</td>
<td markdown="span">[Add source tags ](source_tags.html) using API, CLI, or UI. </td>
<td markdown="span">[Select only tagged sources](query_language_reference.html#tags-in-queries) in your query.</td>
</tr>
<tr>
<td>alert tag</td>
<td markdown="span">
Suppress alerts with alert tags tags during a [maintenance window](maintenance_windows_managing.html#creating-a-maintenance-window).</td>
<td markdown="span">[Create or add alert tags](alerts.html#creating-an-alert).</td>
<td markdown="span">[Reference alert metrics by tag](alerts_dependencies.html#referencing-alert-metrics).</td>
</tr>
<tr>
<td>event tags</td>
<td>Filter and find events.</td>
<td markdown="span">[Create or add event tags](events.html#creating-a-user-event).</td>
<td markdown="span">Use filters in [Basic events() Queries](events_queries.html).</td>
</tr>
</tbody>
</table>

### Tags in the UI

In the Wavefront UI:
* Tags display when you hover your mouse over a line, point, etc. in a chart.
* Tags display as gray labeled icons ![tag](images/tag.png#inline) in the filter bar and below each object in the browser for that object (e.g. dashboard or alerts browse).
* Tags on the left of the object browser allow you to filter your display.

### Tags in Queries

In ts() and events() queries, you can filter:

-   Metrics with source tags and point tags
-   Events with:
    - alert tags and event tags
    - system tags added by alerts (severity, subtype, and type)


## Tag Paths

All tag types support the ability to organize tags in a hierarchy. The hierarchy is defined by separating tag components with a dot ".". For example: **MyService.MyApp**. Dashboards provided by Wavefront start with a tilde at the beginning of the tag, for example, **~welcome.**, **~integration.**, and **~system.**. To improve readability, tags retain case for display but they are treated as case-insensitive for searching, sorting, etc.

### Selecting and Searching Tag Paths

In the UI you operate on tag paths by selecting a component at a specific node in the hierarchy.  For example:
* Select all Wavefront dashboards by clicking **wavefront**
* Select only tutorial dashboards by expanding the **wavefront** node and selecting **wavefront.tutorial**.

In queries, you achieve the same effect by using trailing wildcards "**.\***" when you specify tag paths. For example, to match all tags starting with **alertTagPath.**, enter **alertTagPath.\***. This string matches alerts named **alertTagPath.tpc1**, **alertTagPath.tpc1.tpc11**, etc.

When you create maintenance windows you can use tag paths and wildcards to put a group of of alerts in maintenance.


<a name="entity_tags"></a>
## Managing Object Tags

Object tags apply to Wavefront objects: alerts, dashboards, events, and sources.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view Wavefront objects, you must have [Alert, Dashboard, Event, or Source Tag Management permission](permissions_overview.html) to manage those objects. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

### Adding Object Tags

To add tags to one or more objects:

1.  Open an object browser.
    - For some objects, you select **Browse &gt; &lt;object&gt;**, where **&lt;object&gt;** is **Sources** or **Events**.
    - For other objects, such as Alerts, you click the object.
2.  Choose which objects to tag:
    -   Check the checkboxes next to the object and click the **+ Tag** button.
    -   Click **+** at the bottom and select a tag or click **Create New Tag**.

        ![source tags](images/source_tags.png)

3.  In the **Add Tag** dialog, click the **Create Tag** button at the bottom.
4. Type a tag name. Tag names can contain alphanumeric (a-z, A-Z, 0-9), dash (-), underscore (\_), and colon (:) characters. Tag names are *case sensitive*. For example, the tags **MyApp** and **myapp** are stored as distinct tags. However, mixed case tag paths are collapsed into one path; **MyService.myapp** and **myservice.myapp** are collapsed into **Myservice.myapp**.
5. Click **Add**.

### Searching for Object Tags

When you have many tags in your environment, you can search for tags by typing tag names in the Search box below the Tags heading in the filter bar on the left. As you type, the list of tags is filtered by the search string.

**Note** When you search for tags, the search process is *case insensitive*. For example, searching for the tag **myapp** returns **MyApp** and **myapp**.

### Filtering by Object Tags

To filter by a tag, click a tag icon. You can click the icon in the filter bar on the left or below an object in an object browser.

## Video: Organizing with Tags

For an overview of how tags can help you organize your data and improve searches, watch this video:
<p><a href="https://vmwarelearningzone.vmware.com/oltpublish/site/openlearn.do?dispatch=previewLesson&id=56c1fc0d-dc7a-11e7-a6ac-0cc47a352510&inner=true&player2=true"><img src="/images/v_organize_tags.png" style="width: 700px;"/></a>
</p>
