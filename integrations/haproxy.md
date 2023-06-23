---
title: HAProxy Integration
tags: [integrations list]
permalink: haproxy.html
summary: Learn about the HAProxy Integration.
---

This page provides an overview of what you can do with the HAProxy integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the HAProxy integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **HAProxy** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## HAProxy Integration

HAProxy is free, open source software that provides a high availability load balancer and proxy server for TCP and HTTP-based applications that spreads requests across multiple servers.  This integration installs and configures Telegraf to send HAProxy stats metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's screenshot of dashboard with metrics collected from the HAProxy stats page.
{% include image.md src="images/haproxy-metrics.png" width="80" %}





