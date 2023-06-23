---
title: Runscope Integration
tags: [integrations list]
permalink: runscope.html
summary: Learn about the Runscope Integration.
---

This page provides an overview of what you can do with the Runscope integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Runscope integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Runscope** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Runscope Integration

Runscope is a cloud-based API monitoring service that monitors performance and availability of API's. Runscope detects API transaction failures and exceptions and triggers alerts based on flexible criteria. You can use Runscope with your applications without having to write any code.

This integration uses a Python script and the Telegraf Exec plugin to get the data from Runscope. You install and configure Telegraf to send Runscope test results into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Runscope dashboard.

{% include image.md src="images/runscope-dashboard.png" width="80" %}




