---
title: VMware vRealize Operations Integration
tags: [integrations list]
permalink: vrops.html
summary: Learn about the Wavefront VMware vRealize Operations Integration.
---
# VMware vRealize Operations Integration

vRealize Operations Manager delivers intelligent operations management with application-to-storage visibility across physical, virtual, and cloud infrastructures. Using policy-based automation, operations teams automate key processes and improve IT efficiency.

This integration explains how to configure application monitoring with Wavefront from the vRealize Operations Manager UI. After you've completed the integration setup, you can use Wavefront to monitor the services and applications that vRealize Operations is set up to manage.

In addition, this integration also installs a dashboard tracking the health of the VMware Application Proxy:

{% include image.md src="images/vap-dashboard.png" width="80" %}

## VMware vRealize Operations Manager Setup

Supported Versions: VMware vRealize Operations 6.7 or later

### Configuring the Wavefront Account

1. In vRealize Operations Manager, select the **Home** tab.
1. In the left pane, click **Application Monitoring (Wavefront)**.
2. In the right pane, click **Configure Wavefront Account** and enter the account information:  
   * **Wavefront URL**: `https://YOUR_CLUSTER.wavefront.com`
   * **API Token**: `YOUR_API_TOKEN`
