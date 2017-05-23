---
title: Events
keywords: events
tags: [events, alerts]
sidebar: doc_sidebar
permalink: events.html
summary: Learn how to view events and about event types.
---
An event is a record that something of interest has occurred&mdash;an alert has changed state,
a maintenance window has been created, AWS instances have started or stopped, and so on.

You can display events as [overlays on a chart](charts_events_displaying.html) using [events queries](events_queries.html).

To view events, select **Browse > Events**. The Events list displays.

{% include shared/permissions.html entity="events" entitymgmt="Event" %}

## Event Properties

Events have three types of sources. When you perform actions in Wavefront, such as when you [edit or snooze an alert](alerts_managing.html), the source is System. When an alert fires or resolves, the source is System/Alert. When newly affected sources fail or recover from an alert condition, the source is System. For example:

![Events system](images/events_system.png)

You can manually create events with source [User](events_managing.html#creating-a-user-event) to identify user actions, such as code pushes, that occur outside Wavefront but that affect metrics within Wavefront.

Events also have [types](events_queries.html#type) and [subtypes](events_queries.html#subtype), which are typically used in events queries.

## System Event Details

To view details about an alert associated with a System/Alert event, click the **View System Event** and then **View Alert** links in the System/Alert event or the **View Alert** in a System event. You see a chart with the following queries:

{% include shared/alert_details.html %}

![Alert notification](images/alert_notification.png)


{% include shared/searching.html entity="Events" entities="dashboards" %}


## Event States

An System event can be in the Ongoing or Ended state. System/Alert events are Ongoing until all affected alert sources are recovered and the alert is resolved, after which the state is Ended. 

A User event can be in the Pending, Ongoing, or Ended state. A User event whose start time is in the future has the state Pending.

## AWS Events

The Wavefront CloudTrail integration retrieves EC2 event information and creates Wavefront System events that represent the EC2 events. For details, see [CloudTrail Integration](integrations_aws_metrics.html#cloudtrail-integration).

