---
title: Permissions Overview
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: permissions_overview.html
summary: Learn about Wavefront permissions.
---

Permissions, which are assigned at the user level, allow your company's administrator(s) to control access to Wavefront feature sets. 

<div markdown="span" class="alert alert-info" role="alert">While every Wavefront user with Browse Data permission can view Wavefront entities, you must have the appropriate entity management permission to manage those entities. If you do not have permission, UI menu selections and buttons required to perform management tasks are not visible.</div>

You can learn more about each set of permissions by clicking the permission headers below:
 
- [Alert Management](alerts_managing) - create, edit, and delete alerts as well as maintenance windows, manage alert tags and view alert history, create, edit, and delete webhooks.
- [Browse Data](permissions_misc#browse-data-permission) - view all of Wavefront, except for the Proxies and user administration pages. Every user must have Browse Data permission in order to access Wavefront.
- [Dashboard Management](dashboards_managing) - create, manage, and delete all dashboards and charts and manage dashboard tags.
- [Direct Data Ingestion](permissions_misc#direct-data-ingestion-permission) - ingest metrics using API endpoints, bypassing proxies.
- [Embed Charts](permissions_misc#embed-charts-permission) - generate HTML snippets of Wavefront charts and embed them outside of the platform.
- [Event Management](events_managing) - create, manage, and close events and manage event tags.
- [External Links Management](external_links_managing) - create, update, and delete external links.
- [Metrics Management](metrics_managing) - manually hide and unhide metrics and metric prefixes from being displayed in the Metrics browser and autocomplete dropdown while creating a ts() query.
- [Proxy Management](proxies_managing) - view, create, and manage proxies and set up external integrations with AWS.
- [Source Tag Management](sources_managing) - manage sources and source tags.
- [User Management](users_managing) - add and remove users and administer permissions.

To see which permissions you currently have assigned to your account, access your user profile by clicking the gear icon <i class="fa fa-cog"/> located on the task bar and select your username. Your profile lists the permissions assigned to your account. To request additional permissions, contact a user with User Management permission.



