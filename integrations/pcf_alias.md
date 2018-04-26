---
title: Pivotal Cloud Foundry Integration
tags: []
permalink: pcf_alias.html
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
- PCF: Diego Nsync-bulker Route-Emitter - detailed Diego Nsync metrics.
- PCF: Doppler Server - health of Doppler Servers.
- PCF: Loggregator Traffic Controller - detailed Loggregator Traffic Controller metrics.
- PCF: Metron Agent - health of Metron Agents.

Here's a preview of the Cloud Controller dashboard:
{% include image.md src="images/cloud_controller_dashboard.png" width="80" %}

## Pivotal Cloud Foundry Setup



Supported Version(s): PCF v1.11, v1.12 and v2.0.

### Install Wavefront by VMware Nozzle for PCF tile

This integration uses the [Wavefront by VMware Nozzle for PCF](https://network.pivotal.io/products/wavefront-nozzle)
tile distributed through the Pivotal Network.

Refer the [documentation](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html) to install and configure the tile within your PCF deployment.  
Use the following Wavefront Instance URL and API token for configuring the [Wavefront proxy](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html#install):   
Wavefront Instance URL: `http://YOUR_CLUSTER.wavefront.com/api`  
Wavefront API Token: `YOUR_API_TOKEN`

### Install Bosh Health Metrics Forwarder tile for PCF v1.x

**Note:** This step is not required for PCF v2.0 and later.

To get PCF VM health metrics, install the Bosh Health Metrics Forwarder:

1. Download the [HM Forwarder tile v0.9.0](https://s3-us-west-2.amazonaws.com/wavefront-cdn/pcf/bosh-hm-forwarder-0.9.0.pivotal) and install it using the PCF Ops Manager interface.  
   **Note:** Download the [HM Forwarder tile v0.9.2](https://s3-us-west-2.amazonaws.com/wavefront-cdn/pcf/bosh-hm-forwarder-0.9.2.pivotal) for PCF v1.12.
2. Open the deployed *HM Forwarder* tile in the Ops Manager UI and go to the “Status” tab, and make note of the IP of the *hm-forwarder* job.
3. Go to the Ops Manager Director tile, and enter the IP address noted above into the *Bosh HM Forwarder IP Address* field in the “Director Config” section, and save your changes.
4. Go back to the Installation Dashboard and click “Apply Changes”.
5. Verify the Bosh VM health metrics are available in the PCF: Summary dashboard.

### Send App Metrics

Refer the [documentation](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html#marketplace)
to send metrics to Wavefront from your apps running within PCF.
