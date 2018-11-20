---
title: Permissions Reference
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: permissions_overview.html
summary: Learn about Wavefront permissions.
---

Permissions allow administrators to control access to Wavefront feature sets. Administrators can manage permissions for groups or for users.

{% include shared/badge.html content="Every Wavefront can view Wavefront objects such as dashboards, you must have the appropriate permission to manage objects. If you do not have permission, UI menu selections and buttons required to perform management tasks are not visible." %}

## Permissions Overview

To learn more about the feature associated with a permissions click one of the links below:

- [Alerts](alerts.html) - Users with Alerts permission can create, edit, and delete alerts as well as maintenance windows, manage alert tags and view alert history, create, edit, and delete webhooks.
- Batch Query Priority - When an account with Batch Query Priority permission runs queries, Wavefront treats every query executed by that account as if it was wrapped in the [`bestEffort()` function](ts_bestEffort.html).
- [Dashboard](dashboards_managing.html) - Users with Dashboard permission can create, manage, and delete all dashboards and charts and manage dashboard tags.
   **Note:** If the Security system preference is set to Creator, view access or view and modify access to new dashboards has to be granted explicitly.
- [Direct Data Ingestion](direct_ingestion.html) - An account with Direct Data Ingestion permission can directly ingest metrics using the Wavefront API or one of the Wavefront SDKs, bypassing the proxy. Grant Direct Data Ingestion permission only to users who have a deep understanding of APIs and the Wavefront ingestion path.
- [Chart Embedding](charts_embedding.html) - Users with Chart Embedding permission can generate HTML snippets of Wavefront charts and embed a corresponding interactive chart outside of Wavefront. Embedded chart URLs are associated with a specific user account. If a user embeds a chart and later that user's Wavefront account is removed, the embedded chart no longer works.
- [Events](events.html) - Users with Events permission can create, manage, and close user events and manage event tags.
- [External Links](external_links_managing.html) - Users with External Links permission can create, update, and delete external links.
- [Integration](integrations.html) - Users with Integration permission can install and uninstall integration dashboards, alerts, etc.
- [Metrics](metrics_managing.html) - Users with Metrics permission can manually hide and unhide metrics and metric prefixes. Hidden metrics are no longer displayed in the Metrics browser and in the query autocomplete dropdown.
- [Proxies](proxies_installing.html#managing-proxy-services) - Users with Proxies permission can view, create, and manage proxies and set up external integrations with AWS and other cloud services.
- [Derived Metrics](derived_metrics.html) - Users with Derived Metrics permission can create and manage registered queries. Derived metrics support reingesting a query.
- [Source Tags](sources_managing.html) - Users with Source Tag permission can manage sources and source tags.
- [Users & Groups](users_groups_managing.html) - Users with Users & Groups permission can add and remove users and groups and manage the corresponding permissions.

To see which permissions you currently have:
1. Click the gear icon <i class="fa fa-cog"/> in the top right of the task bar and select your username.
   Your profile lists the groups you belong to and the permissions you have.
2. Hover over a group name to see which permissions come from that group.
3. Contact a user with Users & Groups permission to request additional permissions.

## Default Permissions for All Users

When an account is created in Wavefront, the user is part of the Everyone group and can perform these tasks:

- View the Dashboards, Alerts, Metrics, Sources, Events, Maintenance Windows, and Webhooks pages
- Add dashboards to the list of favorites
- View existing dashboards and charts
- Create and interact with charts -- but NOT save charts
- Share dashboards and charts with other users
- Access the user profile

You cannot remove users from the Everyone group.
