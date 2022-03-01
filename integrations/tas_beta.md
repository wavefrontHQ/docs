---
title: Tanzu Application Service (Beta) Integration
tags: [integrations list]
permalink: tas_beta.html
summary: Learn about the Wavefront Tanzu Application Service (Beta) Integration.
---
## Tanzu Application Service (Beta) Integration

Tanzu Application Service is a popular platform for building cloud-native applications.
This integration uses the VMware Tanzu Observability by Wavefront Nozzle v4. The integration offers TAS data egress, dashboards and alerting.
This is a beta product and is not feature complete - more dashboards & alerting to come!

This integration scrapes metrics in the TAS Foundation and pushes them to Tanzu Observability. The integration doesn't just use a push-based approach like the earlier versions of the Tanzu Observability by Wavefront nozzle. The new approach supports more predictable and controllable data flow than the earlier versions of the nozzle.

{% include image.md src="images/screen-1.png" width="80" %}

### Dashboards

The TAS integration contains a set of predefined dashboards that give you an overview of your TAS deployment and specific TAS components:

- TAS: All Jobs - Overall health of the TAS deployment.
- TAS: App Instances - Detailed view of number and status of Application Instances (AIs).
- TAS: BOSH Director Health - Detailed view of BOSH Director health.
- TAS: CLI Health - Health of CLI within TAS.
- TAS: Certificate Expiration - Detailed view of the validity of the certificates.
- TAS: Diego/Capacity - Detailed Diego metrics.
- TAS: Logging and Metrics Pipeline - Health check of Logging and Metrics Firehose.
- TAS: Ops Manager Health - Health check of Ops Manager.
- TAS: Router - Detailed Gorouter metrics.
- TAS: TAS Job Details - Detailed view of TAS job information.
- TAS: TAS MySQL Health - Real-time visibility into the TAS MySQL status.
- TAS: TAS Workload Monitoring - Information about applications running inside of TAS.

## Alerts

Alerts are not yet available with the TAS beta integration.
They will be released in a future version.

## Tanzu Application Service Setup



Supported Versions: TAS v2.11 and later and TAS v2.7 LTS.

### Install VMware Tanzu Observability by Wavefront Nozzle Tile

This integration uses the [VMware Tanzu Observability by Wavefront Nozzle](https://network.pivotal.io/products/wavefront-nozzle)
tile distributed through the Tanzu network.

Use the following Wavefront Instance URL and API token for configuring the [Wavefront proxy](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html#install):
Wavefront Instance URL: `https://YOUR_CLUSTER.wavefront.com/api`  
Wavefront API Token: `YOUR_API_TOKEN`



<h2>Alerts</h2>  <ul></ul>