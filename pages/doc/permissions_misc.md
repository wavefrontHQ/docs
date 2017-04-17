---
title: Miscellaneous Permissions
keywords: administration
tags: [administration]
sidebar: doc_sidebar
permalink: permissions_misc.html
summary: Learn about miscellaneous Wavefront permissions.
---

{% include shared/permissions.html entity="Wavefront entities" entitymgmt="the appropriate" %}

## Browse Data Permission

By default, Browse Data permission is given to all users when an account is first created in Wavefront. Browse Data permission allows you to:
 
- View the Dashboards, Alerts, Metrics, Sources, Events, Maintenance Windows, and Webhooks pages
- Add dashboards to your list of favorites
- View existing dashboards and charts
- Create and interact with charts without the ability to save
- Share dashboards and charts with other users
- Access the Wavefront Knowledge Base, Release Notes, and your user profile

{% include note.html content="The Wavefront UI is inaccessible to users without Browse Data permission." %}

## Direct Data Ingestion Permission

Users with Direct Data Ingestion permission have the ability to directly ingest metrics using the Wavefront API. Direct Data Ingestion permission should only be granted to users who have a deep understanding of APIs and the Wavefront ingestion path. [Contact us](mailto:support@wavefront.com) for additional information.

## Embed Charts Permission

While every Wavefront user can access charts and make temporary changes to chart parameters, Embed Charts permission gives you the ability to embed an interactive chart outside of Wavefront. Embedded chart URLs are associated with a specific user account, so if a user embeds a chart and later has their Wavefront account removed, that embedded chart will no longer work.
 
### Embedding a Chart

1. Open the chart you want to embed in the chart editor.  An embed icon <i class="fa fa-code"/> link displays directly below the gear <i class="fa fa-cog"/> icon on the task bar.

1. Click the embed icon link. A dialog like the one below displays:

    ![embed_chart](images/embed_chart.png)

1. Click **Create**. A dialog containing a code snippet like the one below displays:

    ![embed_chart_snippet](images/embed_chart_snippet.png)

1. Copy the snippet and paste it into the desired location. You can adjust the `width` and `height` parameters.




