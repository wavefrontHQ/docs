---
title: VictorOps Integration
tags: [integrations list]
permalink: victorops.html
summary: Learn about the Wavefront VictorOps Integration.
---
## VictorOps Integration

VictorOps is a popular incident lifecycle management platform.
You can use Wavefront alerts to trigger a VictorOps incident of varying types (information, warning, critical) and also to let VictorOps know when an alert has stopped firing to mark the incident as recovered within the VictorOps timeline. With the help of webhooks you can integrate Wavefront alerts with VictorOps.
## VictorOps Setup



### Step 1. Enable the Wavefront Integration in VictorOps

1. In VictorOps, go to account Settings at the top of the page.
1. Select **Alert Behavior > Integrations**.
{% include image.md width="30" src="images/victorops_alert_behavior.png" %}
1. On the Integrations page, scroll down until you see the Wavefront integration option and select it.
{% include image.md width="40" src="images/victorops_wavefront.png" %}
1. If not already enabled, click the **Enable Integration** button which generates a unique URL to use for notifications.
{% include image.md width="50" src="images/victorops_enable_integration.png" %}
1. Copy the Service API Endpoint URL. The URL will end with **$routing_key**.  You can change this to the appropriate routing_key you want to use in VictorOps.  If you don't have one, set it to wavefront-group for now.  This can be any string, and can even be different for different types of alerts so you can manage which team will get routed the incoming incidents. To view or configure route keys in VictorOps, click **Alert Behavior**, then **Route Keys**.
{% include image.md width="50" src="images/victorops_api_endpoint.png" %}

### Step 2. Create a VictorOps Alert Target 

{% include webhooks_create.md %}
1. Set the URL field to the one generated within VictorOps API Endpoint (including your routing key).
1. Select **Alert Target POST Body Template > TEMPLATE > VictorOps**.
1. Customize the [template](https://docs.wavefront.com/alert_target_customizing.html).
1. Give a meaningful description to your new alert target:
{% include image.md width="90" src="images/victorops_alert_target.png" %}
1. Click **Save**. 

### Step 3. Add the VictorOps Alert Target to a Wavefront Alert

{% include alerts.md %}
{% include webhooks_select.md %}



