---
title: Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: permissions_overview.html
summary: Learn about Wavefront permissions.
---

Permissions allow administrators to control access to Wavefront feature sets. Permissions are assigned at the user level.

{% include shared/badge.html content="While every Wavefront user with Browse Data permission can view Wavefront entities, you must have the appropriate entity management permission to manage those entities. If you do not have permission, UI menu selections and buttons required to perform management tasks are not visible." %}

## Permissions Overview

To learn more about each set of permissions click one of the links below:

- [Alert Management](alerts.html) - create, edit, and delete alerts as well as maintenance windows, manage alert tags and view alert history, create, edit, and delete webhooks.
- [Browse Data](#BrowseData) - view all of Wavefront, except for the Proxies and user administration pages. Every user must have Browse Data permission in order to access Wavefront.
- [Dashboard Management](dashboards_managing.html) - create, manage, and delete all dashboards and charts and manage dashboard tags.
- [Direct Data Ingestion](direct_ingestion.html) - ingest metrics using API endpoints, bypassing proxies.
- [Embed Charts](charts_embedding.html) - generate HTML snippets of Wavefront charts and embed them outside of the platform.
- [Event Management](events.html) - create, manage, and close events and manage event tags.
- [External Links Management](external_links_managing.html) - create, update, and delete external links.
- [Integration Management](integrations.html) - install and uninstall integration dashboards.
- [Metrics Management](metrics_managing.html) - manually hide and unhide metrics and metric prefixes from being displayed in the Metrics browser and autocomplete dropdown while creating a ts() query.
- [Proxy Management](proxies_installing.html#managing-proxy-services) - view, create, and manage proxies and set up external integrations with AWS.
- [Derived Metrics Management](derived_metrics.html) - create and manage registered queries, which support reingesting a query.
- [Source Tag Management](sources_managing.html) - manage sources and source tags.
- [User Management](users_managing.html) - add and remove users and administer permissions.

To see which permissions you currently have, click the gear icon <i class="fa fa-cog"/> in the top right of the task bar and select your username. Your profile lists the permissions assigned to your account. To request additional permissions, contact a user with User Management permission.

{: #BrowseData}
## Browse Data Permission

When an account is created in Wavefront, the user is assigned Browse Data permission by default. Browse Data permission allows users to:

- View the Dashboards, Alerts, Metrics, Sources, Events, Maintenance Windows, and Webhooks pages
- Add dashboards to the list of favorites
- View existing dashboards and charts
- Create and interact with charts -- but NOT save charts
- Share dashboards and charts with other users
- Access the user profile

{% include note.html content="The Wavefront UI is inaccessible to users without Browse Data permission." %}

## Direct Data Ingestion Permission

An account with Direct Data Ingestion permission can directly ingest metrics using the Wavefront API. Grant Direct Data Ingestion permission only to users who have a deep understanding of APIs and the Wavefront ingestion path.

## Embed Charts Permission

While every Wavefront user can access charts and make temporary changes to chart parameters, Embed Charts permission enables you to embed an interactive chart outside of Wavefront. Embedded chart URLs are associated with a specific user account. If a user embeds a chart and later that user's Wavefront account is removed, the embedded chart no longer works. See [Embedding a Chart](charts_embedding.html).
