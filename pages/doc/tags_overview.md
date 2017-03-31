---
title: Tags Overview
tags: [getting_started]
sidebar: doc_sidebar
permalink: tags_overview.html
summary: Learn how to create and use Wavefront tags to speed up query display and work with Wavefront entities.
---
## What is a Tag?

A tag is custom metadata that provides application-specific meaning to metrics and Wavefront entities such as alerts,
dashboards, events, and sources. Tags group together metrics and entities according to categories you define.

The primary use of tags is to limit the number metrics and entities you are querying or working with at once. Limiting
the number of metrics reduces the time to run a query and the time to display the results. Limiting the number of entities reduces information overload.

This topic gives an overview of tags, decribes how to filter entities with tags, and add tags to entities. To add entity tags you must have the appropriate [permission](permissions). If you do not have permission, UI menu selections and buttons required to perform the tasks are not visible.

## Filtering in Queries

In queries, you can filter:

-   Metrics with **source** and **point** tags
-   Events with **alert** and **event** tags. In addition you can filter events with the **system** tags added by alerts: **severity**, **subtype,** and **type**.

## Filtering Entities

In the Wavefront UI and API you can use entity tags to filter alert, dashboard, event, and source entities. In the Wavefront UI, entity tags display as gray labeled icons ![](images/tag.png#inline) in the filter bar and below each entity in the entity browser.

## Tag Summary

<table>
<colgroup>
<col width="20%"/>
<col width="40%"/>
<col width="40%"/>
</colgroup>
<thead>
<tr>
<th>Tag Type</th>
<th>Used in Queries</th>
<th>Where Added and Updated</th>
</tr>
</thead>
<tbody>
<tr>
<td>alert</td>
<td markdown="span">events()<br />
[Basic events() Queries](events_queries)</td>
<td markdown="span">Wavefront UI and API<br />
[Managing Alerts](alerts_managing) and [Managing Maintenance Windows](maintenance_windows_managing)</td>
</tr>
<tr>
<td>dashboard</td>
<td></td>
<td markdown="span">Wavefront UI and API<br />[Managing Dashboards](dashboards_managing)</td>
</tr>
<tr>
<td>event</td>
<td markdown="span">events()<br />[Basic events() Queries](events_queries)</td>
<td markdown="span">alerts - system tags<br />Wavefront UI and API - entity tags<br />[Managing Events](events_managing)</td>
</tr>
<tr>
<td>point</td>
<td markdown="span">ts()<br />[Wavefront Data Format](wavefront_data_format) and [Using Point Tags](query_language_using_point_tags)</td>
<td markdown="span">Wavefront proxy<br />[Configuring Wavefront Proxy Preprocessor Rules](proxies_preprocessor_rules)<br />
Telegraf agent<br />
[Wavefront CLI](wavefront_cli)</td>
</tr>
<tr>
<td>source</td>
<td markdown="span">ts()<br />
[Getting Started with Wavefront Query Language](query_language_getting_started)</td>
<td markdown="span">Wavefront UI and API<br />[Managing Sources](sources_managing) and [Managing Maintenance Windows](maintenance_windows_managing)</td>
</tr>
</tbody>
</table>

## Tag Paths

All tag types support the ability to organize tags in a hierarchy. The hierarchy is defined by separating tag components with a dot '.'. For example: **MyService.MyApp**. Dashboards provided by Wavefront start with the tag path component **wavefront.**.


### Selecting and Searching Tag Paths

In the UI you operate on tag paths by selecting a component at a specific node in the hierarchy.  For example, you can select all Wavefront dashboards by clicking **wavefront**, or only tutorial dashboards by expanding the **wavefront** node and selecting **wavefront.tutorial**.

In queries you achieve the same effect by using trailing wildcards "**.\***" when specifying tag paths. For example, to match all tags starting with **alertTagPath.**, enter **alertTagPath.\***. This string matches alerts named **alertTagPath.tpc1**, **alertTagPath.tpc1.tpc11**, etc. When creating maintenance windows you can use tag paths and wildcards to put a group of of alerts in maintenance.

For a video overview, see [Tag Paths](https://wavefront-1.wistia.com/medias/ex41ab32mx).

<a name="entity_tags"></a>

## Entity Tags

Entity tags are tags that apply to Wavefront entities: **alerts**, **dashboards**, **events**, and **sources**.

### Adding Entity Tags

To add tags to one or more entities:

1.  Open an entity browser by selecting **Browse &gt; &lt;entity&gt;**, where **&lt;entity&gt;** is **Alerts**, **Dashboards**, **Events**, or **Sources**.
2.  Choose which entities to tag:
    -   Check the checkboxes next to the entities and click the **+ Tag** button.
    -   Click **+tag** below an entity.

        ![](images/source_tags.png)

3.  In the **Add Tag** dialog:

    ![](images/add_tag.png)

    -   Click the **Create Tag** button at the bottom:
        1.  Type a tag name. Tag names can contain alphanumeric (a-z, A-Z, 0-9), dash (-), underscore (\_), and colon (:) characters. Tag names are *case sensitive*. For example, the tags **MyApp** and **myapp** are stored as distinct tags. However, mixed case tag paths are collapsed into one path; **MyService.myapp** and **myservice.myapp** are collapsed into **Myservice.myapp**.
        2.  Click **Add**.

### Searching for Entity Tags

When there are many tags you can search for tags by typing tag names in the Search box below the Tags heading in the filter bar:

![](images/search_tags.png)

As you type in the Search box, the list of tags below is filtered by the search string. When you search for tags, the search process is *case insensitive*. For example, searching for the tag **myapp** returns **MyApp** and **myapp.** Similarly, searching for the tag **MyApp** returns **MyApp** and **myapp**.

### Filtering by Entity Tags

To filter by a tag, click a tag icon, for example ![mytag icon](images/mytag_icon.png#inline):

-   In the filter bar

    ![mytag2](images/mytag2.png)

-   Below an entity in the entity browser

    ![mytag](images/mytag.png)
    
{% include links.html %}