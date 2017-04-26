---
title: Wavefront UI Patterns
keywords: getting started
tags: [getting started]
sidebar: doc_sidebar
permalink: wavefront_ui_patterns.html
summary: Learn how about the interaction patterns that span the Wavefront UI.
---

## Tags and Tag Paths

Tags allow you to flexibly manage and organize your Wavefront content. Tag paths allow you to organize your content in hierarchies that best suit your particular use of Wavefront. If desired, content can be included in multiple hierarchies to suit the needs of particular subgroups of users. Tags and tag path support has been extended beyond the UI into many areas and can be leveraged in searching/filters, alerts, maintenance windows, and events.

-  Tag paths organize tags by separating tag components with periods ".". For example, **Eastern.DBs.MySQL**.
-  To improve readability, tags retain case for display but are treated case-insensitive for searching, sorting etc.

For more information on tags, see [Tags Overview](tags_overview.html).

## UI Patterns

The Wavefront UI supports several universal patterns for performing actions on Wavefront entities:

-   **Tagging** - After selecting entities, click the tag buttons ![tag toggle](images/tag_toggle.png#inline) to create, add, and remove tags.
-   **Actions** - Perform actions (clone, delete, edit, rename, etc.) on individual entities by clicking the menu icon at the far right of an entity ![action menu](images/action_menu.png#inline) and selecting an action.
-   **Trash** - View deleted entities by clicking the trash toggle: Off - ![trash off](images/trash_off.png#inline) On - ![trash on](images/trash_on.png#inline)

## Searching

Browser pages (All Dashboards, Alerts, Events, Maintenance Windows, Proxies, Cloud Integrations, Webhooks, and External Links) support a variety of search methods. You can search in the Search field at the top or in the faceted filter bar at the left. Both methods support facets:

<table width="75%">
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup> 
<thead>
<tr><th>Browser</th><th>Facets</th></tr>
</thead>
<tbody>
<tr>
<td>All Dashboards</td>
<td>Sources, Updated By, Metrics, Tags</td>
</tr>
<tr>
<td>Alerts</td>
<td>Severity, State, Updated By, Tags</td>
</tr>
<tr>
<td>Sources</td>
<td>sources, tags</td>
</tr>
<tr>
<td>Events</td>
<td>Severity, Source, State, Tags</td>
</tr>
<tr>
<td>Maintenance Windows</td>
<td>Creator, State</td>
</tr>
<tr>
<td>Proxies</td>
<td>Hostname, Status</td>
</tr>
<tr>
<td>Cloud Integrations</td>
<td>Integration Type</td>
</tr>
<tr>
<td>Webhooks</td>
<td>ID, Updated By, Triggers, URLs</td>
</tr>
<tr>
<td>External Links</td>
<td>Updated By, Template Domains, ID</td>
</tr>
</tbody>
</table>

### Search Field

The <i class="fa fa-search"/> field at the top of every browser page supports both autocomplete and search. The autocompleted entities include the browser object name, object properties, and other entities relevant to that object. For example, in the All Dashboards page, searching returns a dropdown list displaying autocompleted sources and metrics queried in dashboards, dashboard names, and tags containing the search string, all of which you can select individually. The dropdown list also contains links to searches for _all_ tags and dashboard content containing the string. For example:

![search auto](images/search_auto.png)

Search fields support multi-word searches. If you type **cpu usage** in any browser or autocompleted text field, the dropdown list of matching entities includes all entities containing one or more instances of both words in any order.

### Filter Bar

In the filter bar on the left you search by selecting facets and typing in Search fields. Many facets have their own Search fields to limit the displayed facet values. Most pages support the standard facets Tag Paths, Tags, and Updated By.

### Saved Searches

Most filter bars contain a set of commonly used saved searches (e.g. Favorites, Last Updated, Recently Updated, My <XXX>) and you can save your own searches. 

Once you press **Return** or **Enter** after typing a search string, the icons ![search icons](images/searchicons.png#inline) display at the top right, allowing you to share a link to, save, and clear the search. Your saved searches appear below the commonly used searches, and have a dropdown menu for renaming, cloning, and deleting the search.

The following Alert Browser filter demonstrates filtering alerts by the tag path **Microservice.App4**. This filters the view to show all alerts with the tag path **MicroService.App4** and all its children (for example, **MicroService.App4.Auth**). Of the matching alerts, 1 is firing.

![Tag path](images/MicroService.App4_firing.png)

### Video Demo

For a demo of searching in the Wavefront UI, see

{% include video.html file="mvcjw51w6d" %}
