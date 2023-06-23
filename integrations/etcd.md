---
title: etcd KV store Integration
tags: [integrations list]
permalink: etcd.html
summary: Learn about the etcd KV store Integration.
---

This page provides an overview of what you can do with the etcd KV store integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the etcd KV store integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **etcd KV store** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## etcd KV Store Integration

etcd is a consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines.

1. **etcd**: This explains the installation and configuration of Telegraf to send etcd KV Store performance metrics to Operations for Applications. Telegraf is a light-weight server process that can collect, process, aggregate and send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

2. **etcd on Kubernetes**: This explains the configuration of Kubernetes Metrics Collector to scrape etcd metrics using auto-discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
* etcd
* etcd on Kubernetes

Here's the screenshot of etcd on Kubernetes dashboard displaying etcd metrics:

{% include image.md src="images/etcd-sample-dashboard.png" width="80" %}




