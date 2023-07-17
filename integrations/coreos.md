---
title: CoreOS Integration
tags: [integrations list]
permalink: coreos.html
summary: Learn about the CoreOS Integration.
---

This page provides an overview of what you can do with the CoreOS integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the CoreOS integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **CoreOS** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## CoreOs Integration

The CoreOS integration installs and configures Telegraf to send CoreOS and Docker Container performance metrics to Wavefront. Telegraf is a light-weight server process that can collect, process, aggregate and send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the **CPU** section of a dashboard displaying CoreOS metrics.

{% include image.md src="images/coreos-sample-dashboard.png" width="80" %}




