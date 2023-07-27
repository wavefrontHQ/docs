---
title: NGINX Plus Integration
tags: [integrations list]
permalink: nginxplus.html
summary: Learn about the NGINX Plus Integration.
---

This page provides an overview of what you can do with the NGINX Plus integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the NGINX Plus integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **NGINX Plus** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## NGINX Plus Integration

NGINX Plus is a web server, load balancer and content cache built on top of open source NGINX.

This integration installs and configures Telegraf to send NGINX Plus server metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the NGINX Plus dashboard.

{% include image.md src="images/nginxp_dashboard.png" width="80" %}




