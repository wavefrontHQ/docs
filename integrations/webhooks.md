---
title: Webhooks Integration
tags: [integrations list]
permalink: webhooks.html
summary: Learn about the Wavefront Webhooks Integration.
---
## Webhooks

Webhooks allow your application to send out information using HTTP callbacks. Wavefront supports webhooks through the Webhook alert target. You can use an alert target to send notifications that are based on alert trigger conditions.


## Webhooks Setup




### Step 1. Create a Webhook Alert Target

{% include webhooks_create.md %}
1. In the **content type** field, select `application/json`.
1. Select **Body Template > TEMPLATE > Generic Webhook**.
1. Customize the [template](https://docs.wavefront.com/alert_target_customizing.html).
1. Click **Save**. The webhook alert target is added to the Alert Targets page.
1. In the Name column, note the ID of the alert target under the alert target description.

### Step 2. Add the Alert Target to an Alert

{% include alerts.md %}
{% include webhooks_select.md %}





