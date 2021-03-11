---
title: Alert Notifications
keywords: alerts
tags: [alerts, events]
sidebar: doc_sidebar
permalink: alerts_notifications.html
summary: Learn about alert notifications and images in notifications.
---

An alert reports state changes by sending notifications to one or more alert targets. Each notification contains information extracted from the alert about its state change.

The timing of an alert notification depends on the alert target:

* For simple targets (email addresses and PagerDuty keys added directly in the alert's **Target List**), a notification is sent whenever the alert is firing, updated, resolved, snoozed or in a maintenance window.
  {% include note.html content="A maximum of 10 email targets is supported. For  multi-threshold alerts, the maximum is 10 email targets per severity. " %}
* For [custom alert targets](webhooks_alert_notification.html), a notification is sent in response to each triggering event that is specified for the target.


## Sample Alert Notification

How an alert notification looks depends on the setting of the **Secure Metric Details** check box.

### Default Alert Notification

If you have specified your email address as the alert target, you receive an email like the following whenever the alert fires:

![alert_email](images/alert_email.png)

### Alert Notification with Secured Metrics Details

If an alert has **Secure Metrics Details** selected, the email or Slack notification:

* Includes the text **Metrics Security Enabled** at the top.
* Does **not** include metric details and alert images.

When you select **Create Alert** and **Edit Alert** you can select a **Secure Metrics Details** check box. Here's how it works:

* Alerts always check the complete set of metrics.
* When a user opens alert-related charts,
  - Metrics protected by metrics security policy rules are not displayed.
  - A notification that some metrics are hidden due to metrics security policies is shown on the chart.

{% include tip.html content="If your environment protects some metrics using metrics security policy rules, then the user experience is much better if you select the check box." %}

![alert email screenshot without metrics image](images/alert_email_protected.png)


## Chart Images in Alert Notifications

When an alert starts firing or is updated, the resulting alert notification can include an image of a chart showing data at the time the alert was triggered. The [sample email notification](#sample-alert-notification) above includes the following chart image:

![alert_chart_only](images/alert_chart_only.png)

A chart image is a static snapshot that captures the state of the data at the time the alert was triggered. Such a snapshot can be helpful for diagnosing a possible [misfiring alert](alerts_states_lifecycle.html#did-my-alert-misfire), because the chart image can show you the exact state of the data that caused the alert to fire. (In contrast, an [interactive chart](#interactive-charts-linked-by-alert-notifications) viewed through the notification shows the data at the time you bring up the chart, which might include data that was backfilled after a delay.)

For performance reasons, a chart image is included only if the alert's conditional query takes a minute or less to return. The chart image can take a few seconds to create, so you might briefly see a placeholder image in the notification.

Chart images are automatically included in notifications for:
* Simple alert targets (email addresses and PagerDuty keys that are added directly in the alert's target list).
* [Custom alert targets](webhooks_alert_notification.html) for PagerDuty notifications.
* Predefined templates for custom HTML email targets and for Slack targets.

You can optionally include chart images in notifications for [custom alert targets](webhooks_alert_notification.html) for other messaging platforms.

{% include note.html content="If you created a custom alert target before 2018-26.x and you want to include chart images in notifications to that target, you must edit the alert target's template.  See [Adding Chart Images to Older Custom Alert Targets](alert_target_customizing.html#adding-chart-images-to-older-custom-alert-targets) for sample setup instructions for updating an email alert target." %}

If you want to exclude chart images:
* Remove the corresponding variable from the templates for custom HTML email or Slack targets.
*  You cannot remove chart images for custom PagerDuty alert targets.

## Interactive Charts Linked by Alert Notifications

An alert notification includes a URL that links to an interactive chart showing data at the time the alert was triggered. The [sample email notification](#sample-alert-notification) above displays the URL as a **View Alert** button that you can click to see an interactive chart like the following:

![alert_interactive_chart](images/alert_interactive_chart.png)

The interactive chart viewed through an alert notification shows the results of the alert's display expression. If you have set the alert's [**Display Expression** field](#alert-properties), the interactive chart shows the time series being tested by the alert. Depending on the state change that triggered the alert, the interactive chart can display additional queries for alert events and alert metrics:

* **&lt;Alert name&gt;** - The display expression if one was specified. Otherwise, the [condition](alerts.html#alert-properties) expression.
* **Alert Condition** - The [alert condition](alerts.html#alert-condition)
* **Alert Firings** - An [events() query](events_queries.html) that shows events of type `alert` for the alert. These system events occur whenever the alert is opened. The query shows both the current firing (an ongoing event) and any past firings (ended events).
* **Alert Details** - An [events() query](events_queries.html) that shows events of type `alert-detail` for the alert. These system events occur whenever the alert is updated (continues firing while an individual time series changes from recovered to failing, or from failing to recovered).

Interactive charts enable you to investigate your data by performing additional queries, changing the time window, and so on.

Interactive charts always show the **current state** of your data at the time you bring up the chart. That could be somewhat later than the event that triggered the alert.

Although the interactive chart is set to a custom date showing the time window in which the alert was triggered, it might have been backfilled with data values that were reported during that time window, but were not ingested until later. The presence of delayed and then backfilled data can obscure why the alert fired. If you suspect a [misfiring alert](alerts_states_lifecycle.html#did-my-alert-misfire), inspect the chart image included in the notification, which shows the state when the alert fired.

## PagerDuty Notifications

If you use the out-of-the-box PagerDuty alert target, and you resolve the incident in PagerDuty while the alert is still firing in Wavefront, two scenarios are possible:

- If there is a change to the set of sources being affected, that change triggers a new incident in PagerDuty. Changes to the set of sources being affected include:

  - Newly affected sources are added to the list of existing affected sources
  - A subset of the existing sources being affected is no longer affected

- If all affected sources are no longer affected and the alert is resolved in Wavefront, then no new incident is logged into PagerDuty.

You can customize this behavior by creating a custom PagerDuty [alert target](webhooks_alert_notification.html) with different triggers.
