---
title: Uptime Integration
tags: [integrations list]
permalink: uptime.html
summary: Learn about the Wavefront Uptime Integration.
---
# Uptime.com Integration

Uptime.com is a monitoring system that simplifies monitoring website uptime and generating server performance reports. It also sends alerts by SMS, phone call, or email if the website is down.
 
This integration explains how to configure Uptime.com so you can see Uptime.com metrics in Wavefront. After you've completed the integration setup, you can use Wavefront to receive events and response time metrics for the websites that are being monitored by Uptime.com. In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a section of a dashboard displaying response time metrics:

{% include image.md src="images/uptime_dashboard.png" width="80" %}

### Configuring the Wavefront Account in Uptime.com

1. Log in to your Uptime.com account.
2. In the left pane, click **Notifications>Integrations** and click **New Profile**.
3. In the **Add Integration Profile** screen, provide the Wavefront account information:  
   * Select **Wavefront** as the **Provider Type**.
   * Provide integration details:
   * **Wavefront URL**: `https://YOUR_CLUSTER.wavefront.com`
   * **API Token**: `YOUR_API_TOKEN`
4. In the left pane, click **Notifications>Contacts>New Contact**. Within the **New Contact** screen select **Wavefront** from the Push Notifications field.
6. Now add this new contact to your **Check** as one of the **Contacts** to be notified of a downtime event.
