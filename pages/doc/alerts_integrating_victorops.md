---
title: Integrating Alert with VictorOps
keywords: webhooks
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: alerts_integrating_victorops.html
summary: Learn how to integrate VictorOps keys and emails with alerts.
---
With the help of webhooks you can integrate Wavefront alerts with VictorOps to ensure the right people are notified during an event.  You can use Wavefront alerts to trigger a VictorOps incident of varying types (information, warning, critical) and also to let VictorOps know when an alert has stopped firing to mark the incident as recovered within the VictorOps timeline.  Below is a step by step guide on how to achieve this integration.

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

 
## Enable the Legacy REST API in VictorOps
To get started, first enable the Legacy REST API within VictorOps:

1. Go to your portal page in VictorOps, then account Settings at the top of the page.

1. Select **Alert Behavior > Integrations**.

    ![VictorOps alert](images/victorops_alert_behavior.png)

1. On the Integrations page, scroll down until you see the REST (Legacy) box and click it.

    ![VictorOps rest](images/victorops_rest_legacy.png)

1. If not already enabled, click the Enable Integration button which generates a unique URL to use for notifications.

    ![VictorOps enable](images/victorops_enable_integration.png)

The URL will end with **$routing_key**.  You can change this to the appropriate routing_key you want to use in VictorOps.  If you don't have one, set it to wavefront-group for now.  This can be any string, and can even be different for different types of alerts so you can manage which team will get routed the incoming incidents.
 
## Configure a Webhook in Wavefront

 1. Select **Browse > Webhooks**.
 1. Click the **Create Webhook** button.
 1. Give the webhook a meaningful name.
 1. In the Triggers field, select **Alert Opened**, **Alert Status Updated**, and **Alert Resolved**.
 1. Set the URL field to the one generated within VictorOps (including your routing key).
 1. In the Content Type field, select **application/json**.
 1. Select **Webhook POST Body Template > Template > VictorOps**.
 1. Customize the [template](alerts_integrating_webhooks.html#customizing-a-webhook-template).
 1. Give a meaningful description to your new webhook:

    ![VictorOps rest](images/victorops_webhook.png)
 1. Click **Save**.
 For further information, see [Integrating Wavefront Alerts with Webhooks](alerts_integrating_webhooks.html).
 
## Add the VictorOps Webhook to a Wavefront Alert
 
To add the VictorOps webhook to an alert, follow the procedure in [Adding a Webhook to a Wavefront Alert](alerts_integrating_webhooks.html#adding-a-webhook-to-a-wavefront-alert), selecting the VictorOps webhook you created in the previous section.


