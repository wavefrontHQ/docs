---
title: Telegraf Integration
tags: [integrations list]
permalink: telegraf.html
summary: Learn about the Wavefront Telegraf Integration.
---
## Telegraf Integration

Telegraf is a light-weight server process capable of collecting, processing, and aggregating metrics. Even if you already have Telegraf installed, if you want use Telegraf with Wavefront you must use the Wavefront Telegraf packages because they include the Wavefront output plugin. This integration describes how to install and configure Telegraf to send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Telegraf Setup

{% include telegraf.md %}