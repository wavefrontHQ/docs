---
title: HipChat Integration
tags: [integrations list]
permalink: hipchat.html
summary: Learn about the Wavefront HipChat Integration.
---
## HipChat Integration

HipChat is a popular communication platform. Wavefront and HipChat both support webhooks so you can easily configure an incoming webhook in HipChat and an outgoing webhook in Wavefront to pass the notifications from Wavefront alerts into your HipChat rooms. Alert notifications sent to a HipChat room look like:

{% include image.md src="images/hc_message.png" width="80" %}

See the Setup tab for the templates that generated these messages. 

## HipChat Setup



**Note**: Atlassian will be discontinuing [HipChat](https://www.atlassian.com/partnerships/slack) in favor of Slack. If you migrate to Slack, please use our [Slack integration](https://docs.wavefront.com/slack.html).

### Step 1. Build Custom Integration for your HipChat Room

1. In HipChat, click the Room actions button on the top right hand of your room window and select **Integrations...**.
{% include image.md width="15" src="images/hc_room_actions.png" %}
1. Click the **Build your own integration** tile.
{% include image.md width="15" src="images/hc_integration.png" %}
1. Give a meaningful name to your integration. This is the name that will appear in your HipChat room as a sender of the message.
1. Click **Create**.
1. Copy the notification URL.
1. Click **Save** to save the custom integration.

### Step 2. Create a HipChat Alert Target

{% include webhooks_create.md %}
1. In the Content Type field, select the following content type:
   - **application/json** - The request payload must be valid JSON with body parameter fields as described in [HipChat documentation](https://www.hipchat.com/docs/apiv2/method/send_room_notification).

1. Select **Alert Target POST Body Template > TEMPLATE > HipChat**.
1. Customize the [template](https://docs.wavefront.com/alert_target_customizing.html).
 Here is the sample message template:
   - **application/json**
{% raw %}
     ```
     {
       "message": "AlertId: {{{alertId}}}, Subject {{{subject}}}, Reason: {{{reason}}}, Name: {{#jsonEscape}}{{{name}}}{{/jsonEscape}}",
       "color": "red",
       "notify": "true"
     }
     ```
{% endraw %}
   You can pass any other HipChat request body parameter fields to format the messages in the HipChat room.
1. Click **Save**. The alert target is added to the Alert Targets page.
1. In the Name column, note the ID of the alert target under the alert target description.

### Step 3. Add the HipChat Alert Target to an Alert

{% include alerts.md %}
{% include webhooks_select.md %}


