---
title: Riak KV Store Integration
tags: [integrations list]
permalink: riak.html
summary: Learn about the Riak KV Store Integration.
---

This page provides an overview of what you can do with the Riak KV Store integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Riak KV Store integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Riak KV Store** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Riak KV Store Integration

The Riak key-value database integration installs and configures Telegraf to send Riak key-value store (KV store) performance metrics to Wavefront. Telegraf is a light-weight server process that can collect, process, aggregate and send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the Read/Write latency section of a dashboard displaying Riak node metrics.

{% include image.md src="images/riak_read_write_latency.png" width="80" %}




