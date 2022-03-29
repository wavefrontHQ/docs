---
title: Troubleshooting Alert Notifications from Tanzu Observability to BigPanda Webhook Targets
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_bigpanda_troubleshooting.html
summary: Investigate and troubleshoot the different alerting error scenarios and modify them with all the remediation steps.
---

In some cases, Tanzu Observability by Wavefront alert payloads are not being received at the BigPanda integration side. BigPanda notifications may also appear as if they've been snoozed allowing for outages to not be properly alerted upon.


## BigPanda Integration Configuration 

Typically, alert targets are configured to use webhooks. A common use case is when Tanzu Observability is configured to have BigPanda alert targets, by using the webhook feature.

For information about setting up the BigPanda integration, see [BigPanda setup](https://docs.wavefront.com/bigpanda.html).

## Problem

Tanzu Observability functions properly and alerts fire. However, the defined webhook target does not alert in conjunction with Tanzu Observability, as needed. This is a problem, because we can have dependencies and workflows outside of Tanzu Observability that we rely upon for other functions such as notifications.


## Steps for Troubleshooting

1. From the toolbar, click **Alerting** > **Alert Targets** and navigate to the alert target.
2. Click the ellipsis icon and select **Edit**.
3. Verify that the **Alert Firing**, **Alert Status Updated**, and **Alert Resolved** check boxes are selected.

   ![A screenshot of an alert target with the Alert Firing, Alert Status Updated, and Alert Resolved options selected as Triggers](images/troubleshoot-bigpanda-alerts.png)
   
4. You can also verify that other options are set as per your target trigger scenario. [Read more](webhooks_alert_notification.html#create-a-custom-alert-target).

5. From the **Type** drop-down menu select **Email**.
   
   You'll see the exact data that is being sent in the Body Template section 

   The [webhook](https://webhook.site/) is a testing site for troubleshooting webhooks and the mustache template as you can see in real time what is coming in with your alert target notifications.

   You may also consider creating a new alert with the same template as in the problematic alert to test it with webhook, and get more visibility into what is happening for debugging purposes. 
   
6. Check whether the mustache template is catching every scenario. 

    There might be a case in which only one of the properties: `failingAlertSeries`, `newlyFailingAlertSeries`, or `recoveredAlertSeries`, is set in the template.

    Make sure that all the necessary fields are added and validate the notifications with [webhook](https://webhook.site/). 

    See the template format in [Customizing Alert Notifications](alert_target_customizing.html).
    

7. Change back the **Type** to **Webhook**, and make sure the **Content Type** is set to **application/json**.

8. Verify that the included custom authorization headers are configured properly. 

   The {secret_value} is an obfuscation and should not be directly copied to the new target.

9. From the toolbar, click **Browse** > **Event**. 

10. Browse through the events to see if there's an event that can be related to the BigPanda alert failures. 

    The event description would provide an idea of what could have gone wrong. 
   
Another frequent issue is when an alert that fired and resolved within Tanzu Observability, appears in BigPanda, but does not resolve. This can be an issue because your external alert target workflows might be dependent on alert resolving notifications. The reason for notifications being missed or alerts not resolving in BigPanda is due to these specific alerts being edited within Tanzu Observability while firing. We're working on improvements for that.

If the above steps and recommendations don't help and the issue persists, please consider contacting BigPanda to validate if they are receiving the payload and whether it hasn't been suppressed by their team, or [engage the Tanzu Observability Support team](https://docs.wavefront.com/wavefront_support_feedback.html).
