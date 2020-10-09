---
title: Slack Integration
tags: [integrations list]
permalink: slack_two.html
summary: Learn about the Wavefront Slack Integration.
---
## Slack Integration

Slack is a popular communication platform. Wavefront supports sending a Wavefront/Slack webhook integration and a URL enfurler for Slack users who paste Wavefront links into Slack messages.

### Slack Webhook Integration for Alert Notifications

Wavefront and Slack both support webhooks so you can easily configure an incoming webhook in Slack and an outgoing webhook in Wavefront to pass the notifications from Wavefront alerts into your Slack channels. An alert notification sent to a Slack channel looks like:

{% include image.md width="50" src="images/slack_alert.png" %}

### Slack URL Unfurler

After a privileged user has added the Wavefront application to Slack, all Slack users will be prompted whether they want to unfurl a Wavefront URL to show an image. Here's an example:



## Slack Slack Webhook Integration Setup

To show notifications from your alert notifications in a Slack channel, follow the steps in this section.

### Step 1. Build a Custom Integration for Your Slack Channel
1. In Slack, click the **team** dropdown menu in the top left hand of the Slack application and select the **Customize Slack** link:
{% include image.md width="15" src="images/customize_slack.png" %}

    The Customize Your Team page opens in your browser.
1. Click the **Configure Apps** link under the menu list:
{% include image.md width="10" src="images/configure_apps.png" %}
1. On the App Directory page, click the **Custom Integrations** and then **Incoming WebHooks** links:
{% include image.md width="30" src="images/incoming_webhooks.png" %}
1. Click the **Add Configuration** button.
1. In the Post to Channel dropdown list, select the Slack channel where your incoming webhook will post messages to and click the **Add Incoming WebHooks integration** button:
{% include image.md width="30" src="images/webhook_testing.png" %}
1. Customize the incoming webhook.
{% include image.md width="30" src="images/customize_incoming_webhook.png" %}

   In the Custom Name field, type the name that will appear in your Slack channel as a sender of the message.  You can also add additional details such as description, icon, etc. Refer to [Incoming Webhooks](https://api.slack.com/incoming-webhooks) for detailed instructions.
1. Click the **Copy URL** link.
1. Click **Save Settings**.

### Step 2. Create a Slack Alert Target

{% include webhooks_create.md %}
1. In the [content type](https://docs.wavefront.com/webhooks_alert_notification.html#creating-a-webhook) field, select `application/json`.
1. Select **Alert Target POST Body Template > TEMPLATE > Slack**.
1. Customize the [template](https://docs.wavefront.com/alert_target_customizing.html).
1. Click **Save**. The alert target is added to the Alert Targets page.
1. In the Name column, note the ID of the alert target under the alert target description.

### Step 3. Add the Slack Alert Target to an Alert

{% include alerts.md %}
{% include webhooks_select.md %}

## Slack URL Unfurler Setup

To implement URL Unfurl functionality for links to Wavefront pages, follow these steps:

1. A Slack admin user with the right privileges installs the Wavefront application into Slack. Who that person is depends on the Slack setup at your site.
2. After that, any user who pastes a link to a Wavefront instance -- usually a link to a chart -- into Slack is prompted as follows:
  * Do you want to unfurl links to Wavefront instances
  * Do you want to NOT unfurl links to Wavefront instances
  * Do you want to NEVER unfurl links.

Here's a sample screenshot of an unfurled link image:
