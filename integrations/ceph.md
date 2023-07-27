---
title: Ceph Integration
tags: [integrations list]
permalink: ceph.html
summary: Learn about the Ceph Integration.
---

This page provides an overview of what you can do with the Ceph integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Ceph integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Ceph** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Ceph Integration

Ceph is a software-defined storage platform that unifies the storage of block, object, and file data into a distributed computer cluster. By setting up this integration, you can send Ceph metrics into Operations for Applications.

1. **Ceph**: This integration installs and configures Telegraf to send Ceph storage cluster metrics to Operations for Applications. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).
2. **Ceph on Kubernetes**: This explains the configuration of Kubernetes Metrics Collector to scrape Ceph metrics using auto-discovery and annotation based discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
* Ceph
* Ceph on Kubernetes

Here's the Cluster Status section of a dashboard that displays Ceph storage cluster metrics.

{% include image.md src="images/Ceph_Dashboard.png" width="80" %}




