---
title: Dashboards
keywords: getting started
tags: [getting started, dashboards]
sidebar: doc_sidebar
permalink: dashboards.html
summary: Learn about Wavefront dashboards.
---
Each [chart](charts.html) is a window into your company's data - and you can prioritize and group charts using dashboards. All users can search and interact with dashboards.

{% include shared/permissions.html entity="dashboards" entitymgmt="Dashboard" %}

## Dashboard Basics

By creating dashboards, you can quickly compare different data sets, alter time windows for all data sets, and save those windows for future use. You use [dashboard sections](dashboards_managing.html#sections) to  organize charts.

All charts in a dashboard share [display preferences](dashboards_managing.html#prefs), [variables](dashboards_variables.html), and can share [events](charts_events_displaying.html#controlling-events-overlays).

To view and manage dashboards, select **Dashboards > All Dashboards**.

## Dashboard Types

Wavefront has two types of dashboards: system and user.

System dashboards are installed by [Integrations](integrations.html) and include:

- [Tour dashboards](documentation_getting_started.html#tour-dashboards)
- [Tutorial dashboards](documentation_getting_started.html#tutorial-dashboards)
- [Wavefront System dashboard](wavefront_monitoring.html)

{% include shared/system_dashboard.html %}

{% include shared/searching.html entity="Dashboards" entities="dashboards" %}

If you are viewing an existing dashboard and you want to navigate to a different dashboard, then you use the Search Dashboards field at the upper right of the task bar. The Search Dashboards field searches any string within a dashboard name or URL.

## More Info

This doc set has info about interacting with dashboards, using dashboard variables, and more. Or read our blog post, [Interactive Dashboards: Three ways to get instant value from cloud metrics analytics](https://www.wavefront.com/interactive-dashboards-three-ways-get-instant-value/){:target="_blank" rel="noopenner noreferrer"}
