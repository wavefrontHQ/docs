---
title: Troubleshooting Alert Notifications to BigPanda Webhook Targets
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_bigpanda_troubleshooting.html
summary: Investigate, troubleshoot, and remediate issues with BigPanda Webhook targets.
---

BigPanda is an algorithmic event and alert management platform. This integration allows you to create BigPanda tickets from triggered alerts in VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront). VMware Aria Operations for Applications and BigPanda both support webhooks, so you can configure an incoming webhook in BigPanda and an outgoing webhook in VMware Aria Operations for Applications to pass notifications from VMware Aria Operations for Applications alerts into BigPanda. 

## BigPanda Integration Configuration 

Typically, alert targets are configured to use webhooks. A common use case is when VMware Aria Operations for Applications is configured to have BigPanda alert targets, by using the webhook feature.

For information about setting up the BigPanda integration, see [BigPanda setup](bigpanda.html).

## Problems

In some cases, VMware Aria Operations for Applications functions properly and alerts fire. Issues that you might observe:

* The BigPanda integration doesn’t receive VMware Aria Operations for Applications alert payloads.
* BigPanda notifications appear as if they’ve been snoozed, and outages are not properly alerted upon.
	
This is a problem, because you might have dependencies and workflows outside that rely on those  notifications.


## Steps for Troubleshooting

To troubleshoot issues with notifications, ensure that: 

* The alert fires under the correct circumstances.
* The Webhook template catches all problems. 

Follow these steps:

1. From the toolbar, click **Alerting** > **Alert Targets** and navigate to the alert target.
2. Click the ellipsis icon and select **Edit**.
3. Check that the correct triggers are selected: 
   
   1. Verify that the **Alert Firing**, **Alert Status Updated**, and **Alert Resolved** check boxes are selected.

      ![A screenshot of an alert target with the Alert Firing, Alert Status Updated, and Alert Resolved options selected as Triggers](images/troubleshoot-bigpanda-alerts.png)
   
    2. If you have a custom trigger scenario, verify that those options are set. [Read more](webhooks_alert_notification.html#create-a-custom-alert-target).

4. Check whether the body template is correct by selecting **Email** from the **Type** drop-down menu.
   
   This will allow you to analyze the fields and notifications received in the email for the exact data as defined in the **Body Template** section.

5. Debug the alert target:

   * Use the Webhook testing site (`https://webhook.site`) for troubleshooting webhooks and the mustache template. You can see in real time what is coming in with your alert target notifications.

   * Consider creating a new alert with the same template as in the problematic alert to test it with webhook, and get more visibility into what is happening for debugging purposes. 
   
6. Check whether the mustache template is catching every scenario. 

    * Ensure that all properties: `failingAlertSeries`, `newlyFailingAlertSeries`, and `recoveredAlertSeries`, are set in the template.

    * Ensure that all the necessary fields are added and validate the notifications with the Webhook testing site (`https://webhook.site/`). 

    See the template format in [Customizing Alert Notifications](alert_target_customizing.html).
    

7. Change the **Type** to **Webhook**, and select the **Content Type** as **application/json**.

8. Verify that the **Custom Headers** are configured properly. 

	 You must check whether the **Name** and the **Value** custom authorization headers are configured properly. 
	 
	 * The **Name** text box should be set as `Authorization`.
	 * The **Value** text box should contain the [BigPanda Bearer Token](bigpanda.html#step-1-create-a-bigpanda-appkey-and-bearer-token).

	    Do not copy the content of the **Value** text box directly to a new target. Copying this value directly might add up spaces or characters and result in errors.
  
9. Look for alert failure events.
   
   1. From the toolbar, click **Browse** > **Events**. 

   2. Look for an event that might be related to the BigPanda alert failures. 

    The event description might indicate what could have gone wrong. 
   

If the above steps and recommendations don't help and the issue persists, please consider contacting BigPanda to validate if they are receiving the payload and whether it hasn't been suppressed by their team, or [engage our Support team](wavefront_support_feedback.html).
