---
title: 5.0 Release Notes
keywords: release notes
tags: [release notes]
sidebar: doc_sidebar
permalink: 50_release_notes.html
summary: Learn about new and updated features in the Wavefront 5.0 release.
---
Wavefront 5.0 introduces many new capabilities focused on improving the usability of the UI, new alert and event behaviors, enhanced integration with logs, a new installer with an improved agent as the default, new integrations, and an updated API:

## New User Interface Design

This release introduces a new user interface design as well as many new capabilities for organizing and managing your Wavefront content.

In addition to a new design, the UI adds important and useful information up front in many list views. List views have also been designed to be much clearer to read and enable faster scanning for information you are most interested in.

## Organizing, Searching, and Performing Actions

Increasingly, Wavefront customers have added more and more content such as dashboards and alerts to their systems. To make it easier for you to manage this content, this release provides many new mechanisms for organizing, searching, and performing actions on Wavefront entities.

### Tags and Tag Paths

Tags allow you to flexibly manage and organize your Wavefront content. With this release, tag paths allow you to organize your content in hierarchies that best suit your particular use of Wavefront. If desired, content can be included in multiple hierarchies to suit the needs of particular sub-groups of users. Tags and tag path support has been extended beyond the UI into many areas and can be leveraged in searching/filters, alerts, maintenance windows, and events.

-   Tag paths organize tags by separating tag components with periods ".". For example, **Eastern.DBs.MySQL**.
-   To improve readability, tags retain case for display but are treated case-insensitive for searching, sorting etc.
-   Tags now support search and autocomplete.
-   All tags are now shared. Private tags are deprecated and are no longer supported in the Wavefront UI.

### Search

-   Faceted searching - The Dashboards, Alerts, Events, Maintenance Windows, Agents, Cloud Integrations, Webhooks, and External Links pages now include a faceted filter bar on the left. You can search by selecting facets and typing in Search fields. In addition to the Search field at the top of each page, many facets have their own Search fields to limit the displayed facets. Most pages support the standard facets Saved Searches, Tag Paths, Tags, Last Updated By. In addition there are type-specific facets. For example, Events and Maintenance Windows have the State facet.
-   Saved searches - The faceted filter bar includes a set of commonly used saved searches. In addition, you can also save your own searches. Once you start searching, the following icons ![search icons](images/searchicons.png) display at the top right, allowing you to share a link to, save, and clear the search. Your saved searches appear below the commonly used searches, and have a dropdown menu for renaming, duplicating, and deleting the search.

The following Alert browser filter demonstrates filtering alerts by the tag path **Microservice.App4**. This filters the view to show all alerts with the tag path **MicroService.App4** and all its children (for example, **MicroService.App4.Auth**). Of the matching alerts, 1 is firing.

![Tag path](images/microService.app4_firing.png)

### Metrics

Search fields now supports multi-word searches. For example, if you type **cpu usage** in the Query Builder or Metrics browser, the dropdown list of matching metrics includes all metrics containing one or more instances of both words in any order.

### UI Patterns

This release introduces several new patterns for performing actions on Wavefront entities:

-   Tagging - After selecting entities, click the tag buttons ![tag toggle](images/tag_toggle.png#inline) to create, add, and remove tags.
-   Actions - Perform actions (clone, delete, edit, rename, etc.) on individual entities by clicking the menu icon:  ![action menu](images/action_menu.png#inline)  and selecting an action.
-   Trash - View deleted entities by clicking the trash toggle: Off - ![trash off](images/trash_off.png#inline) On - ![trash on](images/trash_on.png#inline)

## Dashboards

-   Supports sorting along many axes including number of charts and favorites, last updated, updated by, and views:
  ![Dashboard filters](images/db_filter.png)

-   Supports defining a global **events()** expression in dashboard preferences and corresponding display options:
  ![Dashboard events](images/db_events.png)

-   The Landing page has been removed. The default landing page is now the **Intro: Home** dashboard. If the Default Dashboard property in user or customer preferences is empty, the landing page is **All Dashboards**.

## Alerts

Alerts have been enhanced in several aspects. Newly surfaced alert properties and filtering based on those properties streamline browsing existing alerts.  New alert behaviors reduce the cost of checking alerts and allow resending alert notifications.

-   Adds filtering by status, severity, and last updated by.
-   Shows points scanned last time alert was run, which helps with understanding and optimizing alert performance.
-   Supports setting how often an alert condition is checked. The minimum and default is 1 minute.
-   Adds the ability to resend an alert notification and set the number of minutes between notifications. The default is to not resend.

-   Maintenance windows support alert tag paths including trailing wildcards ("\*"). For example, to put all alerts in the alert hierarchy with parent alert **MicroService.App1** into maintenance, specify **MicroService.App1.\*** in the window's Alert Tags field.

## Events

-   Adds filtering by severity and source.
-   Events now support tags and tag paths. These can be used when filtering events in the UI and with the event() language.
-   User events can now be edited.
-   event() supports filtering events by alert tag paths including trailing wildcards ("\*"). For example, to view all events associated with alerts tagged with **MicroService.App1**, specify **alertTag=MicroService.App1.\***.
-   Adding a user event to a chart automatically adds the event() expression to the chart.
-   Improved documentation of the event() language, including information on previously undocumented features. See [Advanced event() Expressions](events_queries_advanced.html).

## Sending Metrics from Logs

Metric information is frequently contained within logs. Previously, third-party solutions would be used to extract this information from logs and send it to Wavefront.  In addition to third-party solutions, the Wavefront proxy 4.1 now makes this much easier by providing built-in capabilities to parse logs and extract metric information. Various approaches are supported, including using Filebeat to monitor log files and transmit log data to the proxy for parsing. Splunk's Universal Forwarder is also supported.

See [Monitoring Metamorphosis: How To Create Metrics from Log Data in Wavefront](http://www.wavefront.com/monitoring-metamorphosis-create-metrics-log-data-wavefront) and [Sending Log Data to Wavefront](integrations_log_data.html).

<span id="external"></span>

## External Links

When viewing metric information in a chart, anomalies or other interesting information is often noticed that requires further investigation. When this investigation requires moving to another system or tool, this release makes the process easier by providing links between Wavefront and external systems using the new external links feature.

For example, if you use logging systems such as ELK and Splunk, you can easily construct a meaningful URL to navigate from a Wavefront chart  to a log entry in one of these systems. While this example focuses on a log scenario, the feature is general purpose: you can link through to any type of system.

External links employ a template language that allows you to pass information about metric names, source names, point tag values, and time window of the originating series to the target URL and support filtering based on metric, source, and point tag value regular expressions.

Once configured, to navigate to external link, right-click a time series and select **External Links &gt; &lt;linkName&gt;**. For example, to navigate to an ELK instance you would select

![External links](images/elk_external_link.png)

For more information, see [External Links](external_links_managing.html).

## Wavefront Installer

This release introduces a new Wavefront proxy and agent installer named Wavefront CLI. Wavefront CLI is implemented in Python and supports Python 2.6+. In addition to installing and configuring the Wavefront proxy and collector agent, the installer now supports integrations. For detailed information on how to install and run Wavefront CLI, see [Wavefront CLI](wavefront_cli.html).

### Telegraf Agent

Wavefront CLI installs [Telegraf](http://docs.influxdata.com/telegraf/v1.1/) as the collector agent instead of [collectd](http://collectd.org/documentation.shtml). Telegraf has a number of advantages including:

-   More complete and easier to use support for tags
-   Inclusion of plugins in the Telegraf binary
-   Simplified plugin development

Wavefront continues to support installing the collectd collector agent using the old Wavefront installer.

When you install Telegraf on an EC2 instance, the Wavefront proxy supports tagging metrics with EC2 tags, AWS region, the VPC ID, and Image ID of the instance.

For more information on Telegraf, see [collectd vs. Telegraf: Comparing Metric Collection Agents](http://www.wavefront.com/collectd-vs-telegraf-comparing-metric-collection-agents).

## New Integrations

Wavefront has added many new integrations and example dashboards. For information on each integration, see the related documentation:

-   Docker - Supports Docker containers, Amazon ECS, and Kubernetes. See [Monitoring Docker with Wavefront](integrations_docker.html).
-   AWS - [AWS Metrics Integration](integrations_aws_metrics.html)
-   Cassandra - [Apache Cassandra 3 Integration](integrations_cassandra.html)
-   Java metrics - [DropWizard Metrics Integration](integrations_dropwizard.html)
-   Puppet - [Puppet Server Integration](integrations_puppet_server.html)
-   StatsD - [Using StatsD with Wavefront](integrations_statsd.html)
-   VictorOps - [Integrating Wavefront Alerts with VictorOps](alerts_integrating_victorops.html)

## Wavefront API

The API has been updated to support new UI features and make the method signatures consistent across all API categories. Consequently the version has been bumped up to v2. In addition, the X-AUTH-TOKEN HTTP header for authentication is deprecated. Instead, use the Authorization:Bearer HTTP header.

For example, to return all alerts using the v2 API, invoke

```shell
  curl 'https://<wavefront_instance>/api/v2/alert' header 'Authorization:Bearer <wavefront_api_token>'
```

While Wavefront recommends that you move to the v2 API, the original API (`<wavefront_instance>/api/`), though deprecated, is still supported. As before, the UI leverages only the public API.

The API is now fully documented. When you open the [API documentation](wavefront_api.html) the Swagger specified API appears as:

![Wavefront API](images/wavefront_api_v2.png)

### API Categories

Wavefront has added **eight** new categories of APIs and renamed the Management category to Source. The full list of categories is:

-   **Agent** - Retrieve information about Wavefront proxies. Users with Agent Management permission can add and remove Wavefront proxies.
-   **Alert** - Retrieve all active, snoozed, in-maintenance, and invalid alerts. Users with Alert Management permission can create and update alerts.
-   **Cloud Integration** - Retrieve integrations. Users with Agent Management permission can add and remove integrations with cloud services.
-   **Dashboard** - Retrieve data about dashboards, list dashboards, and return version history. Users with Dashboard Management permission can save, create, delete, clone, undelete dashboards.
-   **Event** - Retrieve events and tags associated with a specific event. Users with Event Management permission can create, update, and delete events. Deleting events is limited to non-system events. System events include events based on alert firings, error events, and maintenance windows.
-   **External Link** - Navigate external links. Users with External Link Management permission can create, update, and delete external links.
-   **Maintenance Window** - Retrieve a complete or filtered list of existing maintenance windows. Users with Alert Management permission can create, close, update, and delete maintenance windows.
-   **Message** - Retrieve messages and mark messages read.
-   **Metric** - Retrieve details on a metric. Users with Metric Management permission can hide and unhide metrics.
-   **Query** - Perform queries.
-   **Saved Search** - Retrieve, add, and remove saved searches.
-   **Search** - Search agents, alerts, cloud integrations, dashboards, external links, maintenance windows, sources, and webhooks.
-   **Source** - Retrieve sources and tags associated with a source. Users with Source Tag Management permission can add and remove source tags and set descriptions.
-   **User** - Users with User Management permission can retrieve a list of all users, create, update, and delete users, and manage permissions.
-   **Webhook** - Retrieve webhooks. Users with Alert Management permission can create, update, and delete webhooks.


