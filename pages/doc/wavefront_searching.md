---
title: Performing Searches
keywords: getting started
tags: [getting started, video]
sidebar: doc_sidebar
permalink: wavefront_searching.html
summary: Learn how to search for objects using tags and other search features.
---
To help you find exactly what you need, Tanzu Observability by Wavefront supports tags and other search features.

Here's a <a href="https://vmwaretv.vmware.com/media/t/1_0rwkfemd" target="_blank">video<img src="/images/video_camera.png" alt="video camera icon"/></a>  to get you started:

<p>
<iframe id="kmsembed-1_0rwkfemd" width="608" height="402" src="https://vmwaretv.vmware.com/embed/secure/iframe/entryId/1_0rwkfemd/uiConfId/49694343/pbc/252649793/st/0" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" referrerPolicy="no-referrer-when-downgrade" frameborder="0" alt="Task-based video shows many different search options"></iframe>
</p>

## Using Tags to Facilitate Searches

Tags allow you to flexibly manage and organize what you see in dashboards, charts, browsers, and other UI elements.
* Tag paths allow you to organize your content in hierarchies that best suit your particular use of the product.
* You can include content in multiple hierarchies to suit the needs of different groups of users.

We support several different types of tags that you can leverage when searching. See [Organizing with Tags](tags_overview.html).

## Searching

All object browsers (**All Dashboards**, **Alerts**, **Integrations**, and so on) support a variety of search methods. You can search in the Search field at the top or in the faceted filter bar at the left.

### Search Field

The search field at the top of every object browser page (alerts browser, metrics browser, etc.) supports both autocomplete and search. We support autocomplete for many searches.

For example, in the **All Dashboards** page, searching for an incomplete term, returns a drop-down list that displays a list of items that contain the search string, such as:

* metrics queried in dashboards
* dashboard names
* dashboard URLs
* source names
* tags

You can select an item from the list individually. The drop-down list also contains a link to the search for _All_ items that contain the string. For example:

![Search of "me" in the search box, returns a list of items that contain the term. Includes metrics, name, URL, and all items.](images/search_auto.png)

Search fields support multi-word searches. If you type **cpu usage** in any browser or autocompleted text field, the drop-down list includes all matches for both **cpu** and **usage**.

If you want to explicitly exclude a keyword or a phrase from the search results, type the keyword or phrase that you want to exclude, press Enter, and click the equal sign in front of it so that it changes to a not equal sign (**&#8800;**). For example, if you want to exclude all results containing **cpu**, and see only the results that contain **usage**:

1. Enter **cpu** and press Enter.
2. Enter **usage** in the search field and press Enter.
3. Click the equal sign in front of cpu, so that it turns to a not equal sign (**&#8800;**).

![exclude search results](images/not_in_search.png)

### Filter Bar

In the filter bar on the left you search by selecting facets, such as **State** and **Severity** for alerts, and by typing in Search fields. Some facets on some pages have their own Search field to limit the displayed facet values. Most pages support the standard facets Tag Paths, Tags, and Updated By.

### Saved Searches

Most filter bars contain a set of commonly used saved searches (e.g., Favorites, Last Updated, Recently Updated, My <XXX>) and you can save your own searches.

Once you press **Return** or **Enter** after typing a search string, the buttons ![share, save, and clear search buttons](images/searchicons.png#inline) display at the top right. These buttons allow you to share a link to, save, and clear the search. Your saved searches appear below the commonly used searches (**Saved Searches**), and have a drop-down menu for renaming, cloning, and deleting the search.



## Other Actions

To find and access objects, we support tagging and other actions:

-   **Tagging** -- Select at least one item from the list and click the tag buttons to create, add, and remove tags.
-   **Actions** -- Perform different actions, such as clone, delete, edit, rename, etc., on an individual object. Select the object, click the ellipsis icon on the left of the object, for example, on the left of an alert. The actions that you can perform are different for different types of objects but might include clone, edit, manage access, delete, or snooze (for alerts). Here's an example for the **Actions** menu for dashboards:

    ![Dashboard Actions menu that contains the options View, Versions, Clone, Access, Edit, and Delete ](/images/dashboard_clone.png)

-   View deleted and orphaned objects -- From the **All** drop-down menu on the top right corner of the list, select **Deleted** to view deleted objects or **Orphan** to see the orphaned objects.
