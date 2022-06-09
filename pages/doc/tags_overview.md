---
title: Organizing with Tags
tags: [getting started, alerts, dashboards, events]
sidebar: doc_sidebar
permalink: tags_overview.html
summary: Learn how to use tags to focus and speed up queries display and to unclutter the UI.
---
Tanzu Observability by Wavefront supports tags for adding application-specific metadata to objects such alerts, dashboards, events, sources, and metrics.

## Videos

Watch these videos to get started:

<table style="width: 100%;">
<tbody>
<tr>
<td><strong><font color="#0091DA" size="3">Tagging Your Data with Wavefront </font></strong><br><br/>
<iframe id="kmsembed-1_3igakxnb" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_3igakxnb/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" title="Tanzu Observability: Tagging Data"></iframe>
</td>
<td><br>
<p>Understand how tagging can help you get the results that you need. By default, data include the metric name and the source. Cloud integrations include additional dimensions such as the AWS region, as point tags. You can add point tags to any data source from the UI or the API. Source tags are different. They allow you to group machines, for example, into db machines and web machines. You can then customize your queries to pull out just the data you need. You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_3igakxnb" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a> </p>
</td>
</tr>
<tr>
<td><strong><font color="#0091DA" size="3">Organizing with Tags</font></strong><br><br>
<iframe id="kmsembed-1_12xb5gcm" width="500" height="285" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_12xb5gcm/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="Jason shows how to organize data with tags"></iframe></td>
<td><br>
<p>Want to learn how to use tags? Jason shows an example of assigning a tag (e.g. training) to several dashboards and how the tag can be used for filtering. He then uses additional tags in a hierarchy of tags (e.g. training.attendee and training.trainer) to support more fine-grained filtering using tag paths. Tag paths are available for dashboards, alerts, and events. Finally, for sources, Jason shows you can add source tags and filter directly from a query. </p>
<p>You can also watch the video <a href="https://vmwaretv.vmware.com/media/t/1_12xb5gcm" target="_blank">here <img src="/images/video_camera.png" alt="video camera icon"/></a>.</p>
</td>
</tr>
</tbody>
</table>




## Tags Basics

You use tags in several ways:
* **[Point tags](query_language_point_tags.html)** -- Add dimensions to your query with point tags. For example, examine only metrics from a certain region.
* **Source tags** -- Group your sources. For example, examine only production hosts but not development hosts.
  {% include note.html content="Information about the source is part of each metric, but you add source tags explicitly from the UI, CLI, or API." %}
* **Alert tags** -- Find [alerts](alerts.html) or exclude tagged alerts from a maintenance window.
* **Event Tags** -- Add event tags from the Events browser or when you [create a user event](events.html#creating-a-user-event) to make it easier to filter events.
* **Object tags** -- Limit the number of objects (e.g. dashboards) and metrics. For example, you might  display only dashboards with a certain tag.
* **[Span tags](trace_data_details.html#span-tags)** -- Tags that are associated with a span. Certain span tags are required for a span to be valid. In addition, you can instrument an application with custom span tags.

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
[Organize related alerts](alerts.html#step-5-organize-related-alerts-with-tags). <br> Suppress tagged alerts during a [maintenance window](maintenance_windows_managing.html#creating-a-maintenance-window).</td>
<td markdown="span">[Create or add alert tags](alerts.html#step-5-organize-related-alerts-with-tags).</td>
<td markdown="span">[Reference alert metrics by tag](alerts_dependencies.html#referencing-alert-metrics).</td>
</tr>
<tr>
<td>event tags</td>
<td>Filter and find events.</td>
<td markdown="span">[Create or add event tags](events.html#creating-a-user-event).</td>
<td markdown="span">Use filters in [events() Queries](events_queries.html).</td>
</tr>
</tbody>
</table>

### Supported Characters

Tag keys can contain alphanumeric (a-z, A-Z, 0-9), dash (-), underscore (_), dot (.), and forward slash (/) characters. The space character is not supported.

When you construct a Wavefront query, you can use a colon (:) in a tag key, only if the tag key is in quotes. For example: `ts(<metricName>,"t:m"=tag-with-colon)`.

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


## Select and Search Using Tag Paths

All tag types support the ability to organize tags in a hierarchy. The hierarchy is defined by separating tag components with a dot (`.`), for example, `MyService.MyApp`.

In dashboards, internal tags start with a tilde, for example, `~welcome.`, `~integration.`, and `~system.`. To improve readability, tags retain case for display but they are treated as case-insensitive for searching, sorting, etc.

In the UI you operate on tag paths by selecting a component at a specific node in the hierarchy.  For example:
* Select all Wavefront dashboards by clicking **wavefront**
* Select only tutorial dashboards by expanding the **wavefront** node and then selecting **tutorial**.

In queries, you achieve the same effect by specifying a tag path with trailing wildcards `".*"`. For example, enter `alertTagPath.*` to match alerts named `alertTagPath.tpc1`, `alertTagPath.tpc1.tpc11`, and so on.

When you create maintenance windows, you can use tag paths and wildcards to put a group of alerts in maintenance.


## Point Tags

Point tags offer a powerful way of labeling data so that you can slice and dice it in almost any way you can imagine. For example, you can use point tags, to label a point’s datacenter, version, etc. and can then group by datacenter or version.

You use point tags to add extra dimensions to your data, and can then focus your exploration just on that dimension.

* [Fine Tune Queries with Point Tags](query_language_point_tags.html) explains how to use point tags.
* [Pairing Up Matching Series](query_language_series_matching.html) discusses how implicit series matching lets you operate on pairs of time series that have corresponding sources and point tags.

<a name="entity_tags"></a>

## Object Tags: Tags on Alerts, Dashboards, Events, and Sources

Object tags include alert tags, dashboard tags, event tags, and source tags.

{% include note.html content="While every user can **view** dashboards, alerts, and other objects, you must have [Alert, Dashboard, Event, or Source Tag Management permission](permissions_overview.html) to manage those objects and related object tags. If you do not have permission, the UI menu selections, buttons, and links you use to perform management tasks are not visible." %}

### Manage Object Tags

To add tags to one or more objects:

1.  Open an object browser.
    - For some objects, you select **Browse &gt; &lt;object&gt;**, where **&lt;object&gt;** is **Sources** or **Events**.
    - For other objects, such as Alerts, you click the object.
2.  Choose which objects to tag:
    -   Select the check boxes next to the object and click the **+ Tag** button.
    -   Click **+** at the bottom and select a tag or click **Create New Tag**.

        ![source tags](images/source_tags.png)

3.  In the **Add Tag** dialog, click the **Create Tag** button at the bottom.
4. Type a tag name. Tag names can contain alphanumeric (a-z, A-Z, 0-9), dash (-), underscore (\_), and colon (:) characters. Tag names are *case sensitive*. For example, the tags `MyApp` and `myapp` are stored as distinct tags. However, mixed case tag paths are collapsed into one path; `MyService.myapp` and `myservice.myapp` are collapsed into `Myservice.myapp`.
5. Click **Add**.

### Search for Object Tags

When you have many tags in your environment, you can search for tags by typing tag names in the Search box below the **Tags** heading in the filter bar on the left. As you type, the list of tags is filtered by the search string.

{% include note.html content="When you search for tags, the search process is *case insensitive*. For example, searching for the tag `myapp` returns `MyApp` and `myapp`." %}

### Filter by Object Tags

To filter by a tag, click a tag icon. You can click the icon in the filter bar on the left or below an object in an object browser.

## Source Tags

A metric in Wavefront Data Format includes a source name. If source names change frequently or if you want to filter sources, a source tag can help. Source tags are just strings--in contrast, point tags are key-value pairs.

You can add source tags from the UI or API, or you can inject source tags and source descriptions directly at the proxy.

{% include note.html content="You must have **Source Tags** permission to manage sources and source tags. If you don't have **Source Tags** permission, the Wavefront service rejects source tags with a 403 error." %}

### Why Source Tags?

Source tags let you to group sources. You can specify a source tag in a query to refer to an entire group of sources in a simple expression. For example, if you have two sources, `appServer15` and `appServer16` you can add the source tag `app` to both sources to specify that both are app servers.  You can then query `ts(cpu.load.metric, tag=app)` instead of `ts(cpu.load.metric, source=appServer15 or source=appServer16)`

Your use case determines how to use source tags:
  - Use a source tag hierarchy, that is, have source tags dot-delimited, for example `env.cluster.role.role1`.
  In that case, your query might include `... and tag=env.cluster.role.*`
  - Use source tags as intersection sets, that is, use multiple tags (e.g. `env`, `cluster`, `role`, etc).
  In that case, your query might include`... and tag=env and tag=cluster`.


### Add Source Tags from the UI

To add a source tag from the UI:
1. Click **Browse>Sources**.
2. Select one or more sources and click **+Tag** or click the **+** icon below the source. You can add an existing source tag or create a new source tag.

### Add Source Tags from the API

You can add source tags using the [Wavefront REST API](wavefront_api.html).  The API supports getting and setting source tag values.

For details about the APIs, click the gear icon in your Wavefront instance and select **API Documentation**.

### Group by Source Tag in Queries

Aggreggation functions include a group by parameter that allows you to group the results. The syntax is the following (here we use `sum` as an example):

```
sum(<tsExpression>
[,metrics|sources|sourceTags|pointTags|<pointTagKey> ])
```

For example the following query aggregates all time series but groups the result by point tags. That means you see 1 line if there are no point tags defined for the metric, and multiple lines, one for each point tag, if they are defined for the metric:

```
sum(ts(dataingester.report-points AND source="dev-2b-*"), pointTags)
```

When you want to group by source tag, however, you have to include the source tag name in the query, as shown in this example:

```
sum(ts(dataingester.report-points, source="dev-2b-*" and tag=mySourceTag), sourcetags)
```


### Manage SourceTag and SourceDescription Properties at the Proxy

You can send metrics directly to the Wavefront proxy, and you can add source tags and source descriptions using the `SourceTag` and `SourceDescription` properties. Proxy 4.24 and later supports these properties. Starting with proxy 5.0, each property works with `add`, `save`, and `delete`.

You send these properties to the same listening port as regular metrics. The port defaults to 2878, and you can change it with the `pushListenerPorts` setting in the [proxy configuration file](proxies_configuring.html#configuration-properties).

**Examples**

Here are some simple examples:

Add source tags `highPriority` and `red` to all metrics coming from the source `app-2`.
```
@SourceTag action=add source=app-1 highPriority red
```

Replace all existing source tags for source `app-2` with `qa-42`
```
@SourceTag action=save source=app-2 qa-42
```

Delete the source description `app-3 reserved for qa` from metrics coming from the source `app-3`.
```
@SourceDescription action=delete source=app-3 "app-3 reserved for qa"
```

**Syntax**

The syntax is the same for both the SourceTag and the SourceDescription property.

```
@SourceTag|@SourceDescription <action> <source> <value>
```

<table>
<tbody>
<thead>
<tr><th width="20%">Property</th><th width="80%">Description</th></tr>
</thead>
<tr>
<td>action</td>
<td>Can be <strong>add</strong>, <strong>save</strong>, or <strong>delete</strong>. When you specify <strong>save</strong>, you replace any existing source tags or source descriptions with the new source tag or source description.</td>
</tr>
<tr>
<td>source</td>
<td>Source to which you want to add a source tag or source description.</td>
</tr>
<tr>
<td>value</td>
<td>Name of the tag or the description. Use quotes for values that include spaces or special characters.</td>
</tr>
</tbody>
</table>

## Learn More!

* See [Data Naming](wavefront_data_format.html#wavefront-data-format-best-practices) for examples of tags and tag naming.

* Read the blog post [Skyline Resolves Production Incidents Faster with Alert-Based Health Dashboards](https://tanzu.vmware.com/content/blog/skyline-resolves-production-incidents-faster-with-alert-based-health-dashboards) for a discussion of a real-world example that uses alert tags.
