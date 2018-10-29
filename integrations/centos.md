---
title: CentOS Host Integration
tags: [integrations list]
permalink: centos.html
summary: Learn about the Wavefront CentOS Host Integration.
---
## Linux Host Integration

Monitoring Linux hosts is easy with Wavefront. This integration installs and configures Telegraf to send host metrics
into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the CPU section of a dashboard displaying Linux host metrics.

{% include image.md src="images/db_linux_cpu.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Linux Host Setup

**Note:** If you use vRealize Operations, the application proxy agent sets up the integration for you. See the [setup instructions](https://YOUR_CLUSTER.wavefront.com/integration/vrops/setup). Otherwise, follow the setup steps on this page.

{% include telegraf.md %}