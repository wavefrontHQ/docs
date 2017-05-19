---
title: Managing Alerts
keywords: alerts
tags: [alerts]
sidebar: doc_sidebar
permalink: alerts_managing.html
summary: Learn how to manage alerts.
---
To view and manage alerts, click the **Alerts** button or select **Browse > Alerts**.
 
{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

This topic describes how to manage alert objects, view alert history, and snooze and unsnooze alerts. 

For additional details about how alerts work in Wavefront, see [Alert States and Lifecycle](alerts_states_lifecycle.html).

## Creating Alerts
 
See [Creating an Alert](alerts_creating.html).
 
## Editing an Alert

To edit an alert, click the alert name in the Alerts browser or select ![action_menu](images/action_menu.png#inline) **> Edit** at the far right of the alert. For information on alert properties, see [Creating an Alert](alerts_creating.html).
 
## Cloning and Deleting Alerts

To clone or delete an alert, select ![action_menu](images/action_menu.png#inline) **> \[Clone \| Delete\]** at the far right of the alert.

To delete one or more alerts, select the checkboxes next to one or more alerts and click <i class="fa-trash fa"/>.
 
## Exploring Alert History

Alert history provides you with changes that have been made to an alert over time. You can access the alert history by selecting ![action menu](images/action_menu.png#inline) **> Versions** from the menu located to the right of an alert on the Alerts page. When you select Versions, a page displays contain a list of versions of the alert. Alert history tells you which user made the changes, the date and time the changes were made, and a description of the changes. You can revert back to or clone a past alert version. Alert history was implemented in Q4 of 2015, so you may not see any change history prior to that time if the alert was created before that time.

[Alert metrics](alerts_hierarchies.html) allow you to view alert history in addition to refining the alert firing criteria. You view the count of all firing alerts for a period of time in the Alerts browser, similar to how the All Dashboards page shows the frequency of dashboard views over time. In addition, you can use ts() expressions on the alert counter metrics to analyze further. The following are examples of types of questions you can answer by looking at these metrics:

- What are the noisiest alerts? 
- What alerts fire the most out of all my alerts? I would them focus in on those alerts to determine if I can reduce the firing (maybe by fixing root cause, maybe by tuning alert conditions, etc.)
- What are the noisiest sources? What source have the most firing alerts associated with them?
- What is the firing history of a particular alert?
- What is the firing history of a particular source?

## Snoozing and Unsnoozing Alerts

There are certain times when you want to silence an alert, whether the conditional is met or not. You can do this by snoozing an alert. Wavefront allows you to snooze one or more alerts for 30 minutes, 1 hour, 6 hours, 1 day, 1 week, or Forever. If you choose Forever, then the alert is snoozed until a user unsnoozes it.
 
To snooze one or more alerts:

1. Check the checkboxes next to the desired alert(s).
1. Click the **Snooze** dropdown and select the desired duration.
1. Click the Snooze confirmation.
 
To snooze a single alert, select **Snooze > \<Duration\>** at the far right of the alert.

To unsnooze alerts, check the checkboxes next to the alerts and select **Snooze > Unsnooze**. To unsnooze a single alert, select **Snooze > Unsnooze** at the far right of the alert.

## Managing Alert Tags

See [Organizing with Tags](tags_overview.html).


