---
title: "Learn Wavefront"
keywords: tutorial
tags: [getting started]
sidebar: doc_sidebar
permalink: tutorial_overview.html
summary: Come up to speed with tutorials in product, Github, and docs.
---

Learn Wavefront with using in-product or external resources:
* In-product:  Getting Started workflow, tutorial and tour integrations, help panel, integration setup examples
* External: Tutorials, github examples, FAQs and Recipes, Swagger API, videos

## Learn Wavefront in Wavefront

<table style="width: 100%;">
<tbody>
<tr>
<td width="40%">The Getting Started onboarding flow helps you get data into Wavefront, build a dashboard, and create an alert. All trial users go through this flow. All other users can click Getting Started in the task bar
</td>
<td width="60%"><img src="/images/get_started.png" alt="screenshot of Getting Started second screen"></td>
</tr>
<tr>
<td>
The Tutorial integration allows you to experiment with charts and alerts to learn (clone the integration to save your results).
<ul><li>In the task bar, click <strong>Integrations</strong>. </li>
<li>Click <strong>Tutorial</strong> and select <strong>Dashboards</strong>.</li>
<li>Follow the instructions on the left to explore the charts (with sample data) on the right.</li> </ul>
You can use the customer-wide or user-level preferences to control whether **Getting Started** is visible in the task bar.</td>

<td width="50%"><img src="/images/tutorial_integration.png" alt="all tutorial dashboards"></td>
</tr>
<tr>
<td>
The Tour integration is a deep dive into additional functionality. You can explore those dahsboards and charts, which use sample data to highlight functionality like Anomaly Detection or fine-tuning alerts. The tour also includes single-host and cluster metrics exploration dashboards.
<ul><li>In the task bar, click <strong>Integrations</strong>. </li>
<li>Search for and click <strong>Tour Pro</strong> and click <strong>Dashboards</strong>.</li>
<li>Click any of the dashboards to explore -- they can be used independently.</li></ul></td>
<td width="50%"><img src="/images/tour_exampe.png" alt="screenshot of cluster metrics exploration dashboard"></td>
</tr>
<tr>
<td>
The Help panel is available for most screens when you click the question mark <strong>?</strong>. You'll get a brief overview and links to other information.</td>
<td width="50%"><img src="/images/show_help.png" alt="screenshot collage: first click on ? icon, then see help in panel on the right."></td>
</tr>
</tbody>
</table>

<!---
<a name="overview-documents"></a>

## Overview Documents <i class="fa-check-circle fa" style="color: green;"/>

The following docs are great for learning what Wavefront is, how to get data into Wavefront, what you can do based on your assigned permissions, and how to organize and search in Wavefront. These docs also explore the main objects in Wavefront: charts, dashboards, alerts, events, and integrations.

- [What is Wavefront?](wavefront_introduction.html)
- [Getting Data into Wavefront](wavefront_data_ingestion.html)
- [Permissions Overview](permissions_overview.html)
- [Organizing with Tags](tags_overview.html)
- [Searching Wavefront](wavefront_searching.html)
- [Charts](ui_charts.html)
- [Dashboards](ui_dashboards.html)
- [Alerts](alerts.html)
- [Events](events.html)
- [Integrations](integrations.html)

## More Docs and Videos

Here are some links to popular docs and videos. You can also search this doc set (top right) to find what you need.

### Videos

You can find most videos on our [videos](label_videos.html) page. We've also included those videos on pages where they're most useful.

### Charts and Dashboards

Dashboards make it possible to save multiple charts in a single location for future use. The following topics and video help you learn how to create and use charts and dashboards in Wavefront.

- [Examine Telemetry Data](ui_examine_data.html)
- [Creating a Chart](ui_charts.html) <i class="fa-check-circle fa" style="color: green;"/>
- [Customizing a charts](ui_charts.html#customize-a-chart)

### Query Language

The Wavefront Query Language is the foundation of charts and alerts in Wavefront. The following topics help you learn the query language.

- [Getting Started with Wavefront Query Language](query_language_getting_started.html) <i class="fa-check-circle fa" style="color: green;"/>
- [Query Builder](query_language_query_builder.html) <i class="fa-check-circle fa" style="color: green;"/>
- [Wavefront Query Language Quick Reference](query_language_reference.html)
- [When Multiple Series Match (Or Not)](query_language_series_matching.html)
- [Fine Tune Queries With Point Tags](query_language_point_tags.html)

We also have a complete list of [Query Language Reference Pages](label_reference%20page.html).

### Alerts and Events

Alerts and events make it possible to track critical changes in your environment. The following topics help you learn about alerts and events in Wavefront.

- [Alerting States and Lifecycle](alerts_states_lifecycle.html) <i class="fa-check-circle fa" style="color: green;"/>
- [Creating an Alert](alerts.html#creating-an-alert)
-  [Displaying Events in Charts](charts_events_displaying.html)

### Release Notes

Release notes summarize the features added to each release and changes to existing features.

- [Wavefront Release Notes](wavefront_release_notes.html)

## Getting Started Dashboards

Every Wavefront instance contains dashboards to help new users learn about Wavefront and to explore use cases and example dashboards.
To access any of these dashboards:
* Select **Dashboards > All Dashboards** and click the **~welcome.tour** or **~welcome.tutorial** tag or
* Select **Integrations** and click the **Tour** or **Tutorial** tile.

{% include shared/system_dashboard.html %}

### Tour Dashboards

Tour dashboards give an overview of Wavefront features and illustrate how to use them to address operational challenges. These dashboards are identified by the dashboard tag **~welcome.tour**.

- Tour: Welcome to Wavefront - gives an overview of benefits and capabilities.
- Tour: The Needle in a Haystack - demonstrates how to find an anomalous event.
- Tour: The Perfect Alert - demonstrates how to create an alert that fires only when there's really a problem.
- Tour: Analyzing an Event's Impact - demonstrates how to discover the effect of a code push on metrics.
- Tour: Data Exploration and Capacity Planning - demonstrates how to correlate metrics with each other.
- Tour: Week over Week Anomaly Detection - demonstrates how to use historical data to establish a pattern and then create a visualization that captures when a service issue occurred.
- Tour: Sample Cluster Metrics - displays metrics from a cluster containing several types of sources (application server, database, host, network, etc.).
- Tour: Sample Telegraf Metrics - displays metrics from hosts where the Telegraf collector agent is used for system metric collection.

### Tutorial Dashboards

Tutorial dashboards illustrate how to use Wavefront features to construct queries, display data returned from queries, and create alerts. These dashboards are identified by the dashboard tag **~welcome.tutorial**.

- Tutorial: Introduction to Wavefront - contains links to getting started dashboards and documentation.
- Tutorial: Getting Started with Wavefront Query Language - contains charts that illustrate different elements of the Wavefront Query Language.
- Tutorial: Dashboard Basics: Chart Types - introduces dashboard chart types and options: line, point, stacked area, scatter, etc.
- Tutorial: Creating Alerts - explains how to create an alert and configure notification of the alert.
- Tutorial: Code Push Event - explains how to use the Wavefront Query Language to develop queries that explore the effect of a code push event on a collection of servers.
- Tutorial: Use Case: Anomaly Detection - describes how to use the Wavefront Query Language to investigate anomalous application behavior.

--->
