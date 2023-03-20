---
title: Uptime Integration
tags: [integrations list]
permalink: uptime.html
summary: Learn about the Uptime Integration.
---
# Uptime.com Integration

Uptime.com provides website downtime alerts by SMS, phone call and/or email if your website is down. Uptime.com checks your website availability at 1-minute intervals from 30 different locations across 6 continents.
 
This integration explains how to configure Uptime.com to push response time metrics and alerts to Wavefront. After you've completed the integration setup, you can view response time metrics and alerts for the websites that are being monitored by Uptime.com in Wavefront. In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a section of a dashboard displaying response time metrics:

{% include image.md src="images/uptime_dashboard.png" width="80" %}

### Configuring the Wavefront Account in Uptime.com

1. Log in to your Uptime.com account.
2. In the left pane, click **Notifications>Integrations** and click **New Profile**.
3. In the **Add Integration Profile** screen, provide the Wavefront account information:  
   * Select **Wavefront** as the **Provider Type**.
   * Provide integration details:
   * **Name**: Give your preferred name for this integration.
   * **Wavefront URL**: `https://YOUR_CLUSTER.wavefront.com`
   * **API Token**: `YOUR_API_TOKEN`
4. In the left pane, click **Notifications>Contacts>New Contact**, or you may **Edit** existing contact. In the **Contacts** screen select **Wavefront** from the push notifications field.
5. From the Uptime.com **Contacts** screen, click **Actions>Test** to send a test event to Wavefront and confirm the integration is working.
6. Now edit the required check from the **Checks** list and add this new contact as one of the contacts to be notified of a downtime event.
7. After you have assigned your integration to a contact in Uptime.com, you will receive Uptime.com metrics from checks. Initially, the metric data may take up to 10 minutes to appear in Wavefront.



