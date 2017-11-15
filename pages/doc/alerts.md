---
title: Alerts
keywords: alerts
tags: [alerts, events]
sidebar: doc_sidebar
permalink: alerts.html
summary: Learn how to view alerts and how alerts trigger notifications and interact with events.
---

An alert defines: 
* The conditions under which metric values indicate a system problem and 
* One or more targets to notify when the condition evaluates to true or false 
* For a specified period of time. 

You express [conditions](alerts_managing.html#alert-properties) using [Wavefront Query Language
expressions](query_language_getting_started.html).

An alert [fires](alerts_states_lifecycle.html#when-alerts-fire) when a metric reaches a value that indicates a problem. 

You can disable alert checking:
* To disable alert checking for a set of sources or alerts during a custom time window you can create  a [maintenance window](maintenance_windows_managing.html). 
* To disable alert checking, you can [snooze](alerts_managing.html#snoozing-and-unsnoozing-alerts) an alert.

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

## Viewing Alerts

To view alerts, click the **Alerts** button or select **Browse > Alerts**. A list of alerts displays. Here is an example entry when the alert fires that is described in [Tutorial: Getting Started](tutorial_getting_started.html#create-an-alert):

![Alert firing](images/alert_firing.png)

### Viewing Alert Details

To view alert details, click the <i class="fa-bar-chart fa" style="color: #337ab7;"/> icon in the State column. A chart displays with two queries:

- **&lt;Alert name&gt;** - the alert condition.
- **Past Firings** - an [events() query](events_queries.html) that shows past firings of the alert.

For example, for the alert shown above, the chart displays:

![Alert queries](images/alert_queries.png)

### Viewing Alert Firing

The Firings column shows how many times an alert changed from non-firing to firing in the last day, week, and month. 

{% include shared/searching.html entity="Alerts" entities="alerts" %}

## Alert Events

As alerts fire, update, and resolve, [events](events.html) are created in Wavefront. You can optionally display those events as [icons](charts_events_displaying.html) on a chart's X-axis:

![event icons](images/event_icons.png)

## Alert Notifications

When an alert changes state, a notification containing alert information and a link to a chart is sent to targets listed in the alert's [Targets](alerts_managing.html#alert-properties) property.

For example, if you have configured an email address as the alert target, you receive an email like the following whenever the alert fires, adds or removes an affected source, resolves, or is [updated](alerts_managing.html):

![alert_email](images/alert_email.png)

When you click the link in the notification, you see the following queries:

{% include shared/alert_details.html %}

![Alert notification](images/alert_notification_queries.png)





