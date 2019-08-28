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

See [Wavefront Data Naming](wavefront_data_naming.html) for examples of tags and tag naming.

## Why Tags?

You use tags in several ways:
* **[Point tags](query_language_point_tags.html)** -- Add dimensions to your query with point tags. For example, examine only metrics from a certain region.
* **Source tags** -- Group your sources. For example, examine only production hosts but not development hosts.
  **Note:** Information about the source is part of each metric, but you add source tags explicitly from the UI, CLI, or API.
* **Alert tags** -- Find [alerts](alerts.html) or exclude tagged alerts from a maintenance window.
* **Event Tags** -- Add event tags from the Events browser or when you [create a user event](events.html#creating-a-user-event) to make it easier to filter events. 
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
<td>Filter sources.</td>
<td markdown="span">Add source tags using API, CLI, or UI (discussed below). </td>
<td markdown="span">[Select only tagged sources](#why-source-tags) in your query.</td>
</tr>
<tr>
<td>alert tag</td>
<td markdown="span">
[Organize related alerts](alerts.html#organizing-related-alerts-with-alert-tags). <br> Suppress tagged alerts during a [maintenance window](maintenance_windows_managing.html#creating-a-maintenance-window).</td>
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

All tag types support the ability to organize tags in a hierarchy. The hierarchy is defined by separating tag components with a dot (`.`), for example, `MyService.MyApp`.

Dashboards provided by Wavefront start with a tilde at the beginning of the tag, for example, `~welcome.`, `~integration.`, and `~system.`. To improve readability, tags retain case for display but they are treated as case-insensitive for searching, sorting, etc.

### Select and Search Tag Paths

In the UI you operate on tag paths by selecting a component at a specific node in the hierarchy.  For example:
* Select all Wavefront dashboards by clicking **wavefront**
* Select only tutorial dashboards by expanding the **wavefront** node and then selecting **tutorial**.

In queries, you achieve the same effect by specifying a tag path with trailing wildcards `".*"`. For example, enter `alertTagPath.*` to match alerts named `alertTagPath.tpc1`, `alertTagPath.tpc1.tpc11`, and so on.

When you create maintenance windows, you can use tag paths and wildcards to put a group of alerts in maintenance.


<a name="entity_tags"></a>
## Manage Object Tags

Object tags apply to Wavefront objects: alerts, dashboards, events, and sources.

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user can view Wavefront objects, you must have [Alert, Dashboard, Event, or Source Tag Management permission](permissions_overview.html) to manage those objects. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible.</div>

### Manage Object Tags

To add tags to one or more objects:

1.  Open an object browser.
    - For some objects, you select **Browse &gt; &lt;object&gt;**, where **&lt;object&gt;** is **Sources** or **Events**.
    - For other objects, such as Alerts, you click the object.
2.  Choose which objects to tag:
    -   Check the checkboxes next to the object and click the **+ Tag** button.
    -   Click **+** at the bottom and select a tag or click **Create New Tag**.

        ![source tags](images/source_tags.png)

3.  In the **Add Tag** dialog, click the **Create Tag** button at the bottom.
4. Type a tag name. Tag names can contain alphanumeric (a-z, A-Z, 0-9), dash (-), underscore (\_), and colon (:) characters. Tag names are *case sensitive*. For example, the tags `MyApp` and `myapp` are stored as distinct tags. However, mixed case tag paths are collapsed into one path; `MyService.myapp` and `myservice.myapp` are collapsed into `Myservice.myapp`.
5. Click **Add**.

### Search for Object Tags

When you have many tags in your environment, you can search for tags by typing tag names in the Search box below the **Tags** heading in the filter bar on the left. As you type, the list of tags is filtered by the search string.

**Note** When you search for tags, the search process is *case insensitive*. For example, searching for the tag `myapp` returns `MyApp` and `myapp`.

### Filter by Object Tags

To filter by a tag, click a tag icon. You can click the icon in the filter bar on the left or below an object in an object browser.

## Add Source Tags

You can add source tags explicitly from the UI, CLI, or API.

Here's some background info:
* Any Wavefront metric includes a source name. If source names change frequently or if you want to filter sources, a source tag can help.
* Source tags are just strings -- you can only choose the value. (In contrast, point tags are key-value pairs.)

### Why Source Tags?
Source tags let you to group sources. You can specify a source tag in a query to refer to an entire group of sources in a simple expression. For example, if you have two sources, `appServer15` and `appServer16` you can add the source tag `app` to both sources to specify that both are app servers.  You can then query `ts(cpu.load.metric, tag=app)` instead of `ts(cpu.load.metric, source=appServer15 or source=appServer16)`

Your use case determines how to use source tags:
  - Use a source tag hierarchy, that is, have source tags dot-delimited, for example `env.cluster.role.role1`.
  In that case, your query might include `... and tag=env.cluster.role.*`
  - Use source tags as intersection sets, that is, use multiple tags (e.g. `env`, `cluster`, `role`, etc).
  In that case, your query might include`... and tag=env and tag=cluster`.


### Add Source Tags from the API

You can add source tags using the [Wavefront REST API](wavefront_api.html).  The API supports getting and setting source tag values.

For details about the APIs, click the gear icon in your Wavefront instance and select **API Documentation**.

### Add Source Tags from the UI

To add a source tag from the UI:
1. Click **Browse>Sources**.
2. Select one or more sources and click **+Tag** or click the **+** icon below the source. You can add an existing source tag or create a new source tag.

### Add SourceTag and SourceDescription Properties to Metrics

You can use the `SourceTag` and `SourceDescription` properties to add source tags and source descriptions before the metrics reach Wavefront. Starting with proxy version 4.24, you send these properties to the same listening port as regular metrics (`pushListenerPorts` setting, 2878 by default).

To send a source tag or source description to a proxy, you can include commands like a following:

```
@SourceTag action=save source=app-1 highPriority
```

<table>
<thead>
<tr>
<th width="15%">Property</th>
<th width="40%">Purpose</th>
<th width="45%">Example </th>
</tr>
</thead>
<tbody>
<tr>
<td>SourceTag</td>
<td>Save or delete a source tag. For example, you use this property to inject a source tag into a database on a host. Use <code>SourceTag</code> with <code>action=</code> and <code>source=</code> arguments.  NOTE: Use quotes if any of the values includes spaces or special characters.
<ul>
<li><code>action</code> is either save or delete.</li>
<li><code>source</code> takes the source name as the first value, followed by a source tag to save or delete.</li>
</ul>
</td>
<td>Ex:<code> &#64;SourceTag action=save source=host_42 db1</code>
<div>Ex:<code> &#64;SourceTag action=delete source=host_42 sourceTag1</code></div>
</td>
</tr>
<tr>
<td>SourceDescription</td>
<td>Save or delete a description on the specified source. You can use this property to add a description or delete an existing description. Use `SourceDescription` with <code>action=</code>, <code>source=</code>, and <code>description=</code> arguments. NOTE: Use quotes if any of the values includes spaces or special characters.
<ul>
<li><code>action</code> is either save or delete.</li>
<li><code>source</code> takes the source as the first value, followed by a descriptor.</li>
<li><code>description</code> allows you to specify a description for the tag.</li>
</ul>
</td>
<td>Ex:<code>&#64;SourceDescription action=save source="sourceId" description=A Description</code>
<div>Ex:<code>&#64;SourceDescription action=delete source="sourceId"</code></div></td>
</tr>
</tbody>
</table>
