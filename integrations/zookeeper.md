---
title: ZooKeeper Integration
tags: [integrations list]
permalink: zookeeper.html
summary: Learn about the ZooKeeper Integration.
---

This page provides an overview of what you can do with the ZooKeeper integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the ZooKeeper integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **ZooKeeper** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## ZooKeeper Integration

ZooKeeper is a centralized service for maintaining configuration information, providing distributed synchronization and providing group services.
This integration installs and configures Telegraf to send ZooKeeper server metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the ZooKeeper dashboard.

{% include image.md src="images/zookeeper.png" width="80" %}




