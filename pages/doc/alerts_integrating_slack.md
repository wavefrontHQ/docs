---
title: Integrating Alerts with Slack
keywords: webhooks
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: alerts_integrating_slack.html
summary: Learn how to integrate Slack channels with alerts.
---

Wavefront and Slack both support webhooks so you can easily configure an incoming webhook in Slack and an outgoing webhook in Wavefront to pass the notifications from Wavefront alerts into your Slack channels.

{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}

## Building a Custom Integration for Your Slack Channel
1. Click the **team** dropdown menu in the top left hand of the Slack application and select the **Customize Slack** link.
  ![customize_slack.png](images/customize_slack.png)
  
    The Customize Your Team page opens in your browser.

1. Click the **Configure Apps** link under the menu list.

    ![configure_apps.png](images/configure_apps.png)

1. On the App Directory page, click the **Custom Integrations** and then **Incoming WebHooks** links:

    ![incoming_webhooks.png](images/incoming_webhooks.png)

1. Click the **Add Configuration** button.

    ![add_configuration.png](images/add_configuration.png)
1. Select the Slack channel from the dropdown list where your incoming webhook will post messages to and then click the **Add Incoming WebHooks** integration button.

    ![webhook_testing.png](images/webhook_testing.png)

1. Customize the incoming webhook.

    ![add_customize_incoming_webhook.png](images/customize_incoming_webhook.png)
1. Give a meaningful name to your integration. This is the name that will appear in your Slack channel as a sender of the message.  You can also add additional details as description, icon, etc. Refer to [Incoming Webhooks](https://api.slack.com/incoming-webhooks) for detailed instructions.
1. Copy the Webhook URL field.
1. Click **Save Settings**.


## Adding a Slack Webhook to a Wavefront Alert

 1. Select **Browse > Webhooks**.
 1. Click the **Create Webhook** button.
 1. Paste the webhook URL you copied when creating the Slack incoming webhook into the URL field.
 1. Select the content type.
 1. Select **Webhook POST Body Template > Template > Slack**.
 1. Customize the [template](webhooks_managing.html#customizing-a-webhook-template).
 1. Click **Save**. The webhook is added to the Webhooks page.
 1. Find the URL of the webhook as described in [Finding a Webhook ID](webhooks_managing.html#finding-a-webhook-id).
 1. Add the webhook to the Wavefront alert as described in [Adding a Webhook to a Wavefront Alert](webhooks_managing.html#adding-a-webhook-to-a-wavefront-alert).






