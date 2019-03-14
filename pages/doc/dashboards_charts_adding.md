---
title: Adding a Chart to a Dashboard
keywords: dashboards
tags: [dashboards, charts, getting started]
sidebar: doc_sidebar
permalink: dashboards_charts_adding.html
published: false
summary: Learn how to add charts to dashboards.
---
{% include shared/permissions.html entity="dashboards" entitymgmt="Dashboard" %}


Sometimes you might want to add an existing chart to your own dashboard. For example, you might want to start building your own dashboards by reusing charts from other dashbords. You can do that by cloning a chart and adding it to a new dashboard. We don't remove the selected chart from its current dashboard, add the clone to the new or existing dashboard:

1. Identify the chart you want to add to a dashboard.
1. Click the chart name in the upper-right corner of the chart.

    ![chart_title](images/chart_title.png)

1. Scroll down to the Save To section.
  - If you haven't yet created the dashboard you want to assign the selected chart to, click **Create Dashboard**. The Create New Dashboard dialog displays.
      1. Specify a dashboard URL and name as described in [Managing Dashboards](dashboards_managing.html).
      1. Click **Create**.
  - If the dashboard you want to add the selected chart to already exist, click **Choose Dashboard...**.
      1. Start entering the name of the target dashboard and select a dashboard from the dropdown list of matching dashboards.
      If you don't see your dashboard in the list, then go to the All Dashboards page and confirm the name of your dashboard.
      1. Click **Insert**. The selected dashboard opens in edit mode and the chart you selected displays at the top of the dashboard under a section titled Incoming Chart.
      1. Click and drag the cloned chart to the section and row of your choice.
      1. Click **Save** at the top of the dashboard.
