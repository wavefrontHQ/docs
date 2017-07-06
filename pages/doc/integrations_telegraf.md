---
title: Telegraf Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_telegraf.html
summary: Learn how to send data collected by Telegraf to Wavefront.
---
[Telegraf](https://github.com/influxdata/telegraf) is a popular, plugin-driven, collector agent. It is very similar to [collectd](integrations_collectd.html) but has a [few advantages](https://www.wavefront.com/collectd-vs-telegraf-comparing-metric-collection-agents/):

- It supports point tags out-of-the-box which can make for cleaner metric namespaces in many cases.
- All plugins ship as part of a single binary, meaning you don't have to worry about installing dependencies in most cases.
- It also works out-of-the-box with Wavefront using the OpenTSDB or Wavefront output plugin.

To integrate Telegraf, follow the instructions in the in-product [Telegraf integration](integrations.html#in-product-integrations).

