---
title: StatsD Integration
tags: [integrations list]
permalink: statsd.html
summary: Learn about the StatsD Integration.
---

This page provides an overview of what you can do with the StatsD integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the StatsD integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **StatsD** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

# StatsD Integration

StatsD is a popular network daemon used for monitoring applications. This integration uses the Telegraf StatsD service plugin that supports point tags. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

This is a custom integration that supports sending custom metrics directly from your application code via a TCP or UDP socket. Using these metrics you can create your own dashboards.




