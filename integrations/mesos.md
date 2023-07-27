---
title: Apache Mesos Integration
tags: [integrations list]
permalink: mesos.html
summary: Learn about the Apache Mesos Integration.
---

This page provides an overview of what you can do with the Apache Mesos integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Apache Mesos integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Apache Mesos** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Mesos Integration

Apache Mesos is a cluster manager that provides efficient resource isolation and sharing across distributed applications.
This integration installs and configures Telegraf to send Mesos metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the `Overview` and `Cluster Resources` sections of a dashboard displaying Mesos cluster metrics:
{% include image.md src="images/mesos_dashboard.png" width="80" %}




