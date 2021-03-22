---
title: Pivotal Cloud Foundry Integration
tags: [integrations list]
permalink: pcf.html
summary: Learn about the Wavefront Pivotal Cloud Foundry Integration.
---
## Pivotal Cloud Foundry Integration

Pivotal Cloud Foundry (PCF) is a popular platform for building cloud-native applications. The PCF integration is full-featured implementation offering pre-defined dashboards and alert conditions and is fully configurable.

### Dashboards

The PCF integration is a set of dashboards that give an overview of your PCF deployment and specific PCF components:

- PCF: Summary - overall health of PCF deployment.
- PCF: Cloud Controller - detailed Cloud Controller metrics.
- PCF: GoRouter - detailed GoRouter metrics.
- PCF: Container - health of containers within PCF.
- PCF: User Account and Authentication (UAA) - detailed UAA server metrics.
- PCF: Diego Auctioneer - detailed Diego Auctioneer metrics.
- PCF: Diego BBS - detailed Deigo Bulletin Board System (BBS) metrics.
- PCF: Diego Cell - health of Diego Cells.
- PCF: Metron Agent - health of Metron Agents.
- PCF: MySQL - Real-time visibility into the PCF MySQL status.
- PCF: Redis - Real-time visibility into the PCF Redis status.
- PCF: RabbitMQ - Real-time visibility into the PCF RabbitMQ status.
- PCF: Wavefront Nozzle - To monitor the health and performance of your Pivotal Platform deployment and apps.

Here's a preview of the Cloud Controller dashboard:
{% include image.md src="images/cloud_controller_dashboard.png" width="80" %}

## Pivotal Cloud Foundry Setup



Supported Version(s): PCF v2.2 and above.

### Install Wavefront by VMware Nozzle for PCF tile

This integration uses the [Wavefront by VMware Nozzle for PCF](https://network.pivotal.io/products/wavefront-nozzle)
tile distributed through the Pivotal network.

See the [documentation](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html) for info on installing and configuring the tile within your PCF deployment.  
Use the following Wavefront instance URL and API token for configuring the [Wavefront proxy](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html#install):   
Wavefront Instance URL: `https://YOUR_CLUSTER.wavefront.com/api`  
Wavefront API Token: `YOUR_API_TOKEN`

### Send App Metrics

See the [documentation](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html#marketplace)
for info on sending metrics to Wavefront from your apps running within PCF.



