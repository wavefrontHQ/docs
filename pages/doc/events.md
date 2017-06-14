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

{% include shared/permissions.html entity="events" entitymgmt="Event" %}

## Viewing Events

To view events, select **Browse > Events**. The Events list displays. Here is an example entry when the alert described in [Tutorial: Getting Started](tutorial_getting_started.html#create-an-alert) fires:

![Alert firing](images/event_alert_firing.png)

## Event Sources and Types

Events have three types of sources. When an alert fires or resolves, the source is **System/Alert**. When you perform actions in Wavefront, such as when you [edit or snooze an alert](alerts_managing.html) or when newly affected sources fail or recover from an alert condition, the source is **System**.

![Events system](images/event_system.png)

To identify user actions, such as code pushes, that occur outside Wavefront but that affect metrics within Wavefront, you can [manually create events](events_managing.html#creating-a-user-event) with source **User** .

![Events system](images/event_user.png)

Events also have types and subtypes, which are typically used in [events queries](events_queries.html).

### Viewing System Event Details

To view details about an alert associated with a System/Alert event, click the **View System Event** and then **View Alert** links in the System/Alert event or the **View Alert** in a System event. You see a chart with the following queries:

{% include shared/alert_details.html %}

![Alert notification](images/alert_notification.png)

{% include shared/searching.html entity="Events" entities="dashboards" %}


## Event States

A System event can be in the Ongoing or Ended state. System/Alert events are Ongoing until all affected alert sources are recovered and the alert is resolved, after which the state is Ended. 

A User event can be in the Pending, Ongoing, or Ended state. A User event whose start time is in the future has the state Pending.

## AWS Events

The Wavefront CloudTrail integration retrieves EC2 event information and creates Wavefront System events that represent the EC2 events. For details, see [CloudTrail Integration](integrations_aws_metrics.html#cloudtrail-integration).

