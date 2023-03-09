---
title: OpsGenie Integration
tags: [integrations list]
permalink: opsgenie.html
summary: Learn about the Wavefront OpsGenie Integration.
---
## OpsGenie Integration

OpsGenie is a popular incident management platform. You can use [[applicationName]] alerts to trigger OpsGenie incidents of different severities (info, smoke, warn, severe). [[applicationName]] can also let OpsGenie know when an alert has stopped firing to mark the incident as resolved within the OpsGenie timeline.

You can use Webhooks to integrate [[applicationName]] alerts with OpsGenie. Here's an example of an alert notifications sent to OpsGenie:

{% include image.md width="80" src="images/opsgenie_alert.png" %}

## OpsGenie Setup



### Step 1. Add [[applicationName]] Integration in OpsGenie

1. Log in to your OpsGenie account.
2. Go to the [OpsGenie Operations for Applications Integration](https://app.opsgenie.com/integration#/add/Wavefront) page.
3. In the Teams field, specify the person to receive the [[applicationName]] alert notification.
4. Copy the Webhook URL.
5. Click **Save Integration**.

### Step 2. Create an OpsGenie Alert Target in [[applicationName]]

{% include webhooks_create.md %}
1. In the **Content Type** field, select **application/json**.
1. Select **Body Template > TEMPLATE > Generic Webhook**.
1. Customize the template. See the [Operations for Applications documentation](https://docs.wavefront.com/alert_target_customizing.html) for details.
1. Click **Save**. The alert target is added to the Alert Targets page.
1. In the **Name** column, note the ID of the alert target under the alert target description.

### Step 3. Add the OpsGenie Alert Target to an Alert

{% include alerts.md %}
{% include webhooks_select.md %}



