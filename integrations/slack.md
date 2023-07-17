---
title: Slack Integration
tags: [integrations list]
permalink: slack.html
summary: Learn about the Slack Integration.
---

This page provides an overview of what you can do with the Slack integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Slack integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Slack** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Slack Integration

Slack is a popular communication platform. Operations for Applications integrates with Slack in two different ways: 
* Operations for Applications/Slack webhooks let you send **alert notifications** to Slack. 
* The Operations for Applications URL unfurler for Slack is for users who paste **Operations for Applications links into Slack messages**.

### Slack Webhook Integration for Alert Notifications

Operations for Applications and Slack both support webhooks so you can easily configure an incoming webhook in Slack and an outgoing webhook in Operations for Applications to pass the notifications from Operations for Applications alerts into your Slack channels. An alert notification sent to a Slack channel looks like:

{% include image.md width="50" src="images/slack_alert.png" %}

### Slack URL Unfurler

After a privileged user has added the Operations for Applications application to Slack, all Slack users will be prompted the next time they post an Operations for Applications URL. They can decide to unfurl the URL to show an image, unfurl all Operations for Applications URLs, or not unfurl Operations for Applications URLs. Here's a Slack message with an unfurled chart image:

{% include image.md width="50" src="images/unfurled_chart.png" %}




