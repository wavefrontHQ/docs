---
title: Tags Overview
tags: [getting_started]
sidebar: doc_sidebar
permalink: tags_overview.html
summary: This is an overview of Wavefront tags.
---
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
<td>events()
<p><a href="https://community.wavefront.com/docs/DOC-1157">Using events() Queries</a></p></td>
<td>Wavefront UI and API
<p><a href="https://community.wavefront.com/docs/DOC-1014">Managing Alerts</a>and <a href="https://community.wavefront.com/docs/DOC-1053">Managing Maintenance Windows</a></p></td>
</tr>
<tr>
<td>dashboard</td>
<td></td>
<td>Wavefront UI and API
<p><a href="https://community.wavefront.com/docs/DOC-1068">Managing Dashboards</a></p></td>
</tr>
<tr>
<td>event</td>
<td>events()
<p><a href="https://community.wavefront.com/docs/DOC-1157">Using events() Queries</a></p></td>
<td>alerts - system tags
<p>Wavefront UI and API - entity tags</p>
<p><a href="https://community.wavefront.com/docs/DOC-1082">Managing Events</a></p></td>
</tr>
<tr>
<td>point</td>
<td>ts()
<p><a href="https://community.wavefront.com/docs/DOC-1031">Wavefront Data Format</a> and <a href="https://community.wavefront.com/docs/DOC-1029">Using Point Tags</a></p></td>
<td>Wavefront proxy
<p><a href="https://community.wavefront.com/docs/DOC-1205">Configuring Wavefront Proxy Preprocessor Rules</a></p>
<p>Telegraf agent</p>
<p><a href="https://community.wavefront.com/docs/DOC-1246">Wavefront CLI</a></p></td>
</tr>
<tr>
<td>source</td>
<td>ts()
<p><a href="https://community.wavefront.com/docs/DOC-1019">Getting Started with Wavefront Query Language</a></p></td>
<td>Wavefront UI and API
<p><a href="https://community.wavefront.com/docs/DOC-1070">Managing Sources</a> and <a href="https://community.wavefront.com/docs/DOC-1053">Managing Maintenance Windows</a></p></td>
</tr>
</tbody>
</table>

## Tag Paths

All tag types support the ability to organize tags in a hierarchy. The hierarchy is defined by separating tag components with a dot '.'. For example: **MyService.MyApp**. Dashboards provided by Wavefront start with the tag path component **wavefront.**.
 


### Selecting and Searching Tag Paths

In the UI you operate on tag paths by selecting a component at a specific node in the hierarchy.  For example, you can select all Wavefront dashboards by clicking **wavefront**, or only tutorial dashboards by expanding the **wavefront** node and selecting **wavefront.tutorial**.

In queries you achieve the same effect by using trailing wildcards "**.\***" when specifying tag paths. For example, to match all tags starting with **alertTagPath.**, enter **alertTagPath.\***. This string matches alerts named **alertTagPath.tpc1**, **alertTagPath.tpc1.tpc11**, etc. When creating maintenance windows you can use tag paths and wildcards to put a group of of alerts in maintenance.

## Entity Tags

### Adding Entity Tags

To add entity tags you must have the appropriate [entity permission](https://community.wavefront.com/docs/DOC-1090). If you do not have permission, UI menu selections and buttons required to perform the tasks will not be visible.

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

You search for tags in the Search box below the Tags heading in the filter bar at the left of an entity browser:

![](images/search_tags.png)

As you type in the Search box, the list of tags below is filtered by the search string. When you search for tags, the search process is *case insensitive*. For example, searching for the tag **myapp** returns **MyApp** and **myapp.** Similarly, searching for the tag **MyApp** returns **MyApp** and **myapp**.

### Filtering by Entity Tags

To filter by a tag, click a tag icon, for example ![](images/mytag_icon.png#inline):

-   In the filter bar

    ![](images/mytag2.png)

-   Below an entity in the entity browser

    ![](images/mytag.png)
    
{% include links.html %}