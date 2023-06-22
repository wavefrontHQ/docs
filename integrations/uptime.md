---
title: Uptime Integration
tags: [integrations list]
permalink: uptime.html
summary: Learn about the Uptime Integration.
---
# Uptime Integration

Uptime provides website downtime alerts by SMS, phone call and/or email if your website is down. Uptime checks your website availability at 1-minute intervals from 30 different locations across 6 continents.
 
This integration explains how to configure Uptime to push response time metrics and alerts to Operations for Applications. After you've completed the integration setup, you can view response time metrics and alerts for the websites that are being monitored by Uptime in Operations for Applications. In addition to setting up the metrics flow, this integration also installs a dashboard.
Here's the screenshot of Uptime dashboard displaying response time metrics:

{% include image.md src="images/uptime_dashboard.png" width="80" %}

### Configuring the Operations for Applications Account in Uptime

1. Log in to your Uptime account.
2. In the left pane, click **Notifications > Integrations** and click **New Profile**.
3. In the **Add Integration Profile** screen, provide the Wavefront account information:  
  * Select **Wavefront** as the **Provider Type**.
  * Provide integration details:
    * **Name**: Give your preferred name for this integration.
    * **Wavefront URL**: `https://YOUR_CLUSTER.wavefront.com`
    * **API Token**: `YOUR_API_TOKEN`
4. In the left pane, click **Notifications > Contacts > New Contact** to create a new contact, or **Edit** an existing contact.
5. In the **Contacts** screen select **Wavefront** from the push notifications field.
6. In the Uptime **Contacts** screen, click **Actions > Test** to send a test event to Operations for Applications and confirm the integration is working.
7. Now, edit the required check from the **Checks** list and add this new contact as one of the contacts to be notified of a downtime event.

After you have assigned your integration to a contact in Uptime, you will receive Uptime metrics from checks. Initially, the metric data may take up to 10 minutes to appear in Operations for Applications.



