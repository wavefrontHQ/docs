---
title: Suse Linux Host Integration
tags: [integrations list]
permalink: suse.html
summary: Learn about the Wavefront Suse Linux Host Integration.
---
## Linux Host Integration

Monitoring Linux hosts is easy with Wavefront. This integration installs and configures Telegraf to send host metrics
into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the CPU section of a dashboard displaying Linux host metrics.

{% include image.md src="images/linux_db.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Linux Host Setup

This integration uses various Telegraf input plugins and offers several setup options

* Use a proxy already running in your environment (preferred) or create a new proxy. 
* Install the Wavefront proxy and Telegraf agent on the same host or on separate hosts.

{% include telegraf.md %}



