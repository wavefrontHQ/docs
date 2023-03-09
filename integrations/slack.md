---
title: Slack Integration
tags: [integrations list]
permalink: slack.html
summary: Learn about the Wavefront Slack Integration.
---
## Slack Integration

Slack is a popular communication platform. [[applicationName]] integrates with Slack in two different ways: 
* [[applicationName]]/Slack webhooks let you send **alert notifications** to Slack. 
* The [[applicationName]] URL unfurler for Slack is for users who paste **[[applicationName]] links into Slack messages**.

### Slack Webhook Integration for Alert Notifications

[[applicationName]] and Slack both support webhooks so you can easily configure an incoming webhook in Slack and an outgoing webhook in [[applicationName]] to pass the notifications from [[applicationName]] alerts into your Slack channels. An alert notification sent to a Slack channel looks like:

{% include image.md width="50" src="images/slack_alert.png" %}

### Slack URL Unfurler

After a privileged user has added the [[applicationName]] application to Slack, all Slack users will be prompted the next time they post an [[applicationName]] URL. They can decide to unfurl the URL to show an image, unfurl all [[applicationName]] URLs, or not unfurl [[applicationName]] URLs. Here's a Slack message with an unfurled chart image:

{% include image.md width="50" src="images/unfurled_chart.png" %}

## Slack Webhook Integration Setup

[[applicationName]] and Slack both support webhooks so you can easily configure an incoming webhook in Slack and an outgoing webhook in [[applicationName]] to pass the notifications from [[applicationName]] alerts into your Slack channels.

**Note:** To perform the steps as described below, you must have administrator permissions on the workspace that you want to configure.



### Step 1. Build a Custom Integration for Your Slack Channel
1. In Slack, from the **workspace** drop-down menu in the top left corner, navigate to **Customize _Workspace_Name_**. The **Customize Your Workspace** page opens in your browser.
2. Click **Configure apps** from the menu on the left:
   {% include image.md width="15" src="images/configure_apps.png" %}
3. On the **App Directory** page, click **Custom Integrations**.
4. Search for and select **Incoming WebHooks**.
   {% include image.md width="50" src="images/custom_integrations_select_webhooks.png" %}
5. Click the **Add to Slack** button.
   {% include image.md width="50" src="images/add_to_slack.png" %}
6. From the **Post to Channel** drop-down menu, select the Slack channel where your incoming webhook will post messages to, and click the **Add Incoming WebHooks integration** button:
   {% include image.md width="50" src="images/channel_settings.png" %}
7. On the **Edit configuration** page, scroll down to the **Integration Settings** section and customize the incoming webhook.
      {% include image.md width="50" src="images/integration_settings.png" %} 
     a) In the **Customize Name** text box, enter the name that will appear in your Slack channel as a sender of the message.  
     b) You can also add additional details such as description, icon, etc. See [Incoming Webhooks](https://api.slack.com/incoming-webhooks) for detailed instructions.
8. Under the **Webhook URL** text box, click **Copy URL**.
9. Click **Save Settings**.

### Step 2. Create a Slack Alert Target

{% include webhooks_create.md %}
1. In the [content type](https://docs.wavefront.com/webhooks_alert_notification.html#creating-a-webhook) field, select `application/json`.
2. Select **Alert Target POST Body Template > TEMPLATE > Slack**.
3. Customize the [template](https://docs.wavefront.com/alert_target_customizing.html).
4. Click **Save**. The alert target is added to the Alert Targets page.
5. In the Name column, under the alert target description, note the ID of the alert target.

### Step 3. Add the Slack Alert Target to an Alert

{% include alerts.md %}
{% include webhooks_select.md %}

The setup of your Slack Webhook is now complete. Going forward, specified users will receive alert notifications in Slack.

## Slack URL Unfurler Setup (Chart Images in Slack)

The Slack URL Unfurler has completely different functionality from the Webhook setup. It supports including chart images in Slack. When a user copies a link to an [[applicationName]] chart into Slack, other users can see the chart image in Slack without having to click a link. Currently only `*.wavefront.com` domain can be unfurled.  

To implement URL Unfurl functionality for links to [[applicationName]] pages, follow these steps:

1. A Slack admin user with the right privileges <a href="https://slack.com/oauth/v2/authorize?client_id=2279130001.809926228192&scope=commands,links:write,users:read&user_scope=links:read"> installs the [[applicationName]] application into Slack</a>. This user must have the permission to add apps to the Slack workspace. Who that person is depends on the Slack setup at your site. 
2. After that, any user who pastes a link to an [[applicationName]] instance - usually a link to a chart - into Slack is prompted as follows:
  * Unfurl links to [[applicationName]] instances
  * Don't unfurl links to this [[applicationName]] instance
  * Don't unfurl links.

    The following image illustrates this:

    {% include image.md width="70" src="images/slack_user_message.png" %}

3. Click **Yes (Authenticate via Browser)** and you will be prompted to link your accounts to enable the unfurl process.

Now, you will be able to observe dashboards and charts directly within Slack.

### Troubleshooting

If you are unable to unfurl a link, before opening a support request with the [[applicationName]] Support, do the following:

1. In the Slack interface, run the `/unignore <domain>` command and make sure that the [[applicationName]] domain has not been ignored.
2. Check whether the [[applicationName]] Slack Unfurl app is muted.

   1. In the Slack interface, navigate to **Administration** > **Manage Apps**.
   2. Click **Muted Apps**.

   If the [[applicationName]] Slack Unfurl app is muted, try to unmute it. See the [Muted Apps](https://my.slack.com/apps/manage/mutes) Slack documentation.


