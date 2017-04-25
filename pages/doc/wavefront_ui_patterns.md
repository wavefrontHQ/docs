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
-  Tags support both autocomplete and search. For example, suppose you have dashboards whose tags contain the string `billing`. When you type `billing` Wavefront displays all the tags containing that string (for example `billing.dev` and `billing.ops`), which you can then select individually and a link that searches for _all_ entities whose tags contain `billing`. 

For more information on tags, see [Tags Overview](tags_overview.html).

## Searching

Many pages support a variety of search methods.

For a video overview, see 

{% include video.html file="mvcjw51w6d" %}


### Faceted Searching

The Dashboards, Alerts, Events, Maintenance Windows, Agents, Cloud Integrations, Webhooks, and External Links pages include a faceted filter bar on the left. You can search by selecting facets and typing in Search fields. In addition to the Search field at the top of each page, many facets have their own Search fields to limit the displayed facets. Most pages support the standard facets Saved Searches, Tag Paths, Tags, Last Updated By. There are also type-specific facets. For example, the Events and Maintenance Windows pages have the State facet.

### Saved Searches

The faceted filter bar includes a set of commonly used saved searches. You can also save your own searches. Once you start searching, the following icons ![search icons](images/searchicons.png) display at the top right, allowing you to share a link to, save, and clear the search. Your saved searches appear below the commonly used searches, and have a drop-down menu for renaming, duplicating, and deleting the search.

The following Alert Browser filter demonstrates filtering alerts by the tag path **Microservice.App4**. This filters the view to show all alerts with the tag path **MicroService.App4** and all its children (for example, **MicroService.App4.Auth**). Of the matching alerts, 1 is firing.

![Tag path](images/MicroService.App4_firing.png)

### Metrics

Search fields now supports multi-word searches. If you type **cpu usage** in the Query Builder or Metrics Browser, the drop-down list of matching metrics includes all metrics containing one or more instances of both words in any order.

## Other UI Patterns

The Wavefront UI follows several patterns for performing actions on Wavefront entities:

-   Tagging - After selecting entities, click the tag buttons ![tag toggle](images/tag_toggle.png#inline) to create, add, and remove tags.
-   Actions - Perform actions (clone, delete, edit, rename, etc.) on individual entities by clicking the menu icon:  ![action menu](images/action_menu.png#inline)  and selecting an action.
-   Trash - View deleted entities by clicking the trash toggle: Off - ![trash off](images/trash_off.png#inline) On - ![trash on](images/trash_on.png#inline)