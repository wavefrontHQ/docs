---
title: Introductory Dashboards
keywords: dashboards
tags: [dashboards, getting started]
sidebar: doc_sidebar
permalink: dashboards_introductory.html
summary: Learn about the tutorial, example, and use case introductory dashboards available in your Wavefront instance.
---
Every Wavefront instance contains a set of introductory dashboards to help new users learn about Wavefront benefits, capabilities, components, illustrative use cases, and example dashboards for specific domains.  You can quickly access any of these dashboards by selecting **Dashboards > All Dashboards** and clicking the indicated [tags](tags_overview).

- Demo - **wavefront.tour**
  - Demo: Welcome to Wavefront - overview of Wavefront benefits and capabilities.
  - Demo: Anomaly Detection: Finding a Needle in a Haystack - demonstration of how to find an anomalous event.
  - Demo: Intelligent Alerting: Creating the Perfect Alert - demonstration of how to create an alert that does not fire spuriously.
  - Demo: Data Exploration: Analyzing an Event's Impact - demonstration of how to discover the affect of a code push on metrics.
  - Data Exploration: Metric Correlation and Capacity Planning - demonstration of how to correlate metrics with each other.
  - Demo: Anomaly Detection: Using Weekly Patterns - demonstration of how to use historical data to establish a pattern and then create a visualization that captures when a service issue occurred.
- Tutorial - **wavefront.tutorial**
  - Intro: Home - contains links to getting started dashboards and documentation.
  - Intro: Getting Started with Wavefront Query Language - contains charts that illustrate different elements of Wavefront Query Language.
  - Intro: Dashboard Basics: Chart Types - introduces dashboard chart types and options: line, point, stacked area, scatter, etc.
  - Intro: Creating Alerts - describes how to create an alert and configure notification of the alert.
- Use cases - **wavefront.tutorial**
  - Intro: Use Case: Code Push Event - describes how to use Wavefront Query Language to develop queries to explore the effect of a code push event on a collection of servers.
  - Intro: Use Case: Anomaly Detection Series - Part 1 - describes how to use Wavefront Query Language to investigate anomalous application behavior.
- Examples - **wavefront.example**
  - Intro: Sample Cluster Metrics - displays metrics from a cluster containing several types of sources (application server, database, host, network, etc.).
  - Intro: Telegraf Example - displays metrics from hosts where the Telegraf collector agent is being used for system metric collection.

## Intro: Home Dashboard

The best dashboard to start with is the **Intro: Home** dashboard. This dashboard provides a brief description of the purpose behind the introductory dashboards as well as links to the other introductory dashboards:

![intro_home.png](images/intro_home.png)

The **Intro: Home** dashboard is the default dashboard for new users. You can change the default dashboard for new users in the [customer-wide preferences](dashboards_managing#prefs) and yourself in the [user preferences](users_prefs_configuring).

{% include links.html %}
