---
title: Integrating HipChat with Alerts
keywords: webhooks
tags: [alerts, integrations]
sidebar: doc_sidebar
permalink: alerts_integrating_hipchat.html
summary: Learn how to integrate HipChat rooms with alerts.
---

Wavefront and HipChat both support webhooks so you can easily configure an incoming webhook in HipChat and an outgoing webhook in Wavefront to pass the notifications from Wavefront alerts into your HipChat rooms. This article describes how to set up this integration.
 
{% include shared/permissions.html entity="alerts" entitymgmt="Alert" %}


## Build Custom Integration for your HipChat Room

1. Click the Room actions button on the top right hand of your room window and click **Integrations...** link.
  ![hc_room_actions](images/hc_room_actions.png)
1. Click the **Build your own integration tile.
  ![hc_integration](images/hc_integration.png)
1. Give a meaningful name to your integration. This is the name that will appear in your HipChat room as a sender of the message.
1. Click **Create**.
1. Copy the notification URL.
1. Click **Save** to save the custom integration.
 
## Add the Webhook to a Wavefront Alert
 1. Select **Browse > Webhooks**.
 1. Click the **Create Webhook** button.
 1. Select the content type. The HipChat send notification resource accepts the following content types:
  - **application/json** - The payload is treated as JSON with the expected Request Body format as described in [content types](https://www.hipchat.com/docs/apiv2/method/send_room_notification).
  - **application/x-www-form-urlencoded** - The form fields are mapped to their corresponding JSON properties.
  - **text/plain** - The payload is treated as a plain text message with a default background color of yellow and the notify flag set to false.
  - **text/html** - The payload is treated as an HTML message with a default background color of yellow and the notify flag set to false.
 1. Select **Webhook POST Body Template > Template > Default**.  This loads a default message template.
 1. Customize the payload as described in [Customizing a Webhook Payload](alerts_integrating_webhooks.html#customizing-a-webhook-payload). Here are sample message templates:

    - **application/json**
      {% raw %}
      ```handlebars
      {
        "message": "AlertId: {{{alertId}}},Subject {{{subject}}},Reason: {{{reason}}},Name: {{#jsonEscape}}{{{name}}}{{/jsonEscape}}",
        "color": "red",
        "notify":"true"
      }
      ```
      {% endraw %}
    - **application/x-www-form-urlencoded**
      {% raw %}
      ```handlebars
      color=green&message=ALERT: Subject {{{subject}}} Reason: {{{reason}}} {{{severity}}} {{{name}}},Failed Sources:{{{hostsFailingMessage}}},Message: {{{errorMessage}}} -%20  <a href={{{url}}}>link</a>
      ```
      {% endraw %}
    These two messages create following two messages in a HipChat room:

    ![hc_message](images/hc_message.png)

    You can pass any other HipChat request body parameters to format the messages in the HipChat room.

 1. Click **Save**. The webhook is added to the Webhooks page.
 1. Find the URL of the webhook as described in [Finding a Webhook ID](alerts_integrating_webhooks.html#finding-a-webhook-id).
 1. Add the webhook to the Wavefront alert as described in [Adding a Webhook to a Wavefront Alert](alerts_integrating_webhooks.html#adding-a-webhook-to-a-wavefront-alert).

{% include links.html %}
