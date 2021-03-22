---
title: Slack Integration
tags: [integrations list]
permalink: slack.html
summary: Learn about the Wavefront Slack Integration.
---
## Slack Integration

Slack is a popular communication platform. Wavefront integrates with Slack in two different ways: 
* Wavefront/Slack webhooks let you send **alert notifications** to Slack. 
* The Wavefront URL unfurler for Slack is for users who paste **Wavefront links into Slack messages**.

### Slack Webhook Integration for Alert Notifications

Wavefront and Slack both support webhooks so you can easily configure an incoming webhook in Slack and an outgoing webhook in Wavefront to pass the notifications from Wavefront alerts into your Slack channels. An alert notification sent to a Slack channel looks like:

{% include image.md width="50" src="images/slack_alert.png" %}

### Slack URL Unfurler

After a privileged user has added the Wavefront application to Slack, all Slack users will be prompted the next time they post a Wavefront URL. They can decide to unfurl the URL to show an image, unfurl all Wavefront URLs, or not unfurl Wavefront URLs. Here's a Slack message with an unfurled chart image:

{% include image.md width="50" src="images/unfurled_chart.png" %}

## Slack Webhook Integration Setup

Wavefront and Slack both support webhooks so you can easily configure an incoming webhook in Slack and an outgoing webhook in Wavefront to pass the notifications from Wavefront alerts into your Slack channels. 



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

Setup of your Slack Webhook is now complete. Going forward, specified users receive alert notifications in Slack. 

## Slack URL Unfurler Setup (Chart Images in Slack)

The Slack URL Unfurler has completely different functionality from the Webhook setup. It supports including chart images in Slack. When a user copies a link to a Wavefront chart into Slack, other users can see the chart image in Slack without having to click a link. Currently only `*.wavefront.com` domain can be unfurled.  

To implement URL Unfurl functionality for links to Wavefront pages, follow these steps:

1. A Slack admin user with the right privileges <a href="https://slack.com/oauth/v2/authorize?client_id=2279130001.809926228192&scope=commands,links:write,users:read&user_scope=links:read"> installs the Wavefront application into Slack</a>. This user must have the permission to add apps to the Slack workspace. Who that person is depends on the Slack setup at your site. 
1. After that, any user who pastes a link to a Wavefront instance -- usually a link to a chart -- into Slack is prompted as follows:
  * Unfurl links to Wavefront instances
  * Don't unfurl links to this Wavefront instance
  * Don't unfurl links.

  The following image illustrates this:

  {% include image.md width="50" src="images/slack_user_message.png" %}



