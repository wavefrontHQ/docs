---
title: Getting Started Dashboards
keywords: dashboards
tags: [dashboards, getting started]
sidebar: doc_sidebar
permalink: dashboards_getting_started.html
summary: Learn about the tutorial, example, and use case dashboards available in your Wavefront instance.
---
<!--Moved this content to Docs & Dashboards Overview - ready to delete-->
Every Wavefront instance contains [system dashboards](dashboards.html#dashboard-types) to help new users learn about Wavefront benefits, capabilities, components, illustrative use cases, and example dashboards for specific domains.
You can quickly access any of these dashboards by selecting **Dashboards > All Dashboards** and clicking the indicated [dashboard tags](tags_overview.html) or by selecting **Integrations** and clicking the **Tour** or **Tutorial** tiles.

{% include shared/system_dashboard.html %}

## Tour Dashboards

Tour dashboards give you an overview of Wavefront features and illustrate how these features can be deployed to address various operational challenges. These dashboards are identified by the dashboard tag **~welcome.tour**.

- Tour: Welcome - gives an overview of benefits and capabilities.
- Tour: Anomaly Detection: Finding a Needle in a Haystack - demonstration of how to find an anomalous event.
- Tour: Intelligent Alerting: Creating the Perfect Alert - demonstration of how to create an alert that does not fire spuriously.
- Tour: Data Exploration: Analyzing an Event's Impact - demonstration of how to discover the affect of a code push on metrics.
- Tour: Data Exploration: Metric Correlation and Capacity Planning - demonstration of how to correlate metrics with each other.
- Tour: Anomaly Detection: Using Weekly Patterns - demonstration of how to use historical data to establish a pattern and then create a visualization that captures when a service issue occurred.
- Tour: Sample Cluster Metrics - displays metrics from a cluster containing several types of sources (application server, database, host, network, etc.).
- Tour: Sample Telegraf Metrics - displays metrics from hosts where the Telegraf collector agent is being used for system metric collection.

## Tutorial Dashboards

Tutorial dashboards illustrate how to use Wavefront features to formulate queries, display data returned from queries, and construct queries to solve salient use cases. These dashboards are identified by the dashboard tag **~welcome.tutorial**.

- [Intro: Home](#intro-home-dashboard) - contains links to getting started dashboards and documentation.
- Intro: Getting Started with Wavefront Query Language - contains charts that illustrate different elements of Wavefront Query Language.
- Intro: Dashboard Basics: Chart Types - introduces dashboard chart types and options: line, point, stacked area, scatter, etc.
- Intro: Creating Alerts - describes how to create an alert and configure notification of the alert.

## Use Cases

Identified by the tag **wavefront.tutorial**.

- Intro: Use Case: Code Push Event - describes how to use Wavefront Query Language to develop queries to explore the effect of a code push event on a collection of servers.
- Intro: Use Case: Anomaly Detection Series - Part 1 - describes how to use Wavefront Query Language to investigate anomalous application behavior.

## Examples

Identified by the tag **wavefront.example**.

- Intro: Sample Cluster Metrics - displays metrics from a cluster containing several types of sources (application server, database, host, network, etc.).
- Intro: Telegraf Example - displays metrics from hosts where the Telegraf collector agent is being used for system metric collection.


## Intro: Home Dashboard

The best dashboard to start with is the **Intro: Home** dashboard. This dashboard contains links to the getting started dashboards and documentation and a summary of the UI:

![intro_home.png](images/intro_home.png)

The **Intro: Home** dashboard is the default dashboard for new users. You can change the default dashboard for new users in the [customer-wide preferences](dashboards_managing.html#prefs) and yourself in the [user preferences](users_account_managing.html#configuring-your-preferences).
