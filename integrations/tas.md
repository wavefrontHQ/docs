---
title: Tanzu Application Service Integration
tags: [integrations list]
permalink: tas.html
summary: Learn about the Wavefront Tanzu Application Service Integration.
---
## Tanzu Application Service Integration

Tanzu Application Service, previously known as Pivotal Cloud Foundry, is a popular platform for building cloud-native applications. The Tanzu Application Service (TAS) integration is a full-featured implementation offering predefined dashboards and alert conditions and is fully configurable.

### Dashboards

The TAS integration contains a set of predefined dashboards that give you an overview of your TAS deployment and specific TAS components:

- TAS: Summary - Overall health of TAS deployment.
- TAS: Cloud Controller - Detailed Cloud Controller metrics.
- TAS: Gorouter - Detailed Gorouter metrics.
- TAS: Container - Health of containers within TAS.
- TAS: User Account and Authentication (UAA) - Detailed UAA server metrics.
- TAS: Diego Auctioneer - Detailed Diego Auctioneer metrics.
- TAS: Diego BBS - Detailed Deigo Bulletin Board System (BBS) metrics.
- TAS: Diego Cell - Health of Diego Cells.
- TAS: MySQL - Real-time visibility into the TAS MySQL status.
- TAS: Redis - Real-time visibility into the TAS Redis status.
- TAS: RabbitMQ - Real-time visibility into the On-Demand TAS RabbitMQ status.
- TAS: Wavefront Nozzle - Monitoring of the health and performance of your Tanzu Platform deployment and apps.
- TAS: Doppler - Real-time visibility into the TAS Doppler.

Here's a preview of the Cloud Controller dashboard:
{% include image.md src="images/cloud_controller_dashboard.png" width="80" %}

### Alerts

The TAS alerts are also available for you to install and use. Descriptions of the alerts are available in the [Tanzu Observability by Wavefront documentation](https://docs.wavefront.com/integrations_tas_alerts.html)
## Tanzu Application Service Setup



Supported Versions: TAS v2.9 and later.

### Install VMware Tanzu Observability by Wavefront Nozzle Tile

This integration uses the [VMware Tanzu Observability by Wavefront Nozzle](https://network.pivotal.io/products/wavefront-nozzle)
tile distributed through the Tanzu network.

See the [VMware Tanzu Observability by Wavefront Nozzle](https://docs.pivotal.io/wavefront-nozzle/3-x/installing.html) documentation for instruction on installing and configuring the tile within your TAS deployment.
Use the following Wavefront Instance URL and API token for configuring the [Wavefront proxy](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html#install):
Wavefront Instance URL: `https://YOUR_CLUSTER.wavefront.com/api`  
Wavefront API Token: `YOUR_API_TOKEN`

### Send App Metrics

See the [Configure Service Instance for Wavefront Service Broker for VMware Tanzu](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html#marketplace) documentation for information about installing and configuring the tile within your TAS deployment.



<h2>Alerts</h2>  <ul><li markdown="span"><b>TAS Active Locks</b>:Total count of how many locks the system components are holding. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-active-locks-alerts) for details.</li><li markdown="span"><b>TAS Auctioneer Fetch State Duration Taking Too Long</b>:App stage requests for Diego may be failing. Consult your Tanzu Expert.</li><li markdown="span"><b>TAS Auctioneer LRP Auctions Failed</b>:The number of Long Running Process (LRP) instances that the Auctioneer failed to place on Diego Cells. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-auctioneer-lrp-auctions-failed) for details.</li><li markdown="span"><b>TAS Auctioneer Task Auctions Failed</b>:The number of Tasks that the Auctioneer failed to place on Diego Cells. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-auctioneer-task-auctions-failed) for details.</li><li markdown="span"><b>TAS Auctioneer Time to Fetch Diego Cell State</b>:Time in ns that the Auctioneer took to fetch state from all the Diego Cells when running its auction. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-auctioneer-time-to-fetch-diego-cell-state) for details.</li><li markdown="span"><b>TAS BBS Crashed App Instances</b>:Total number of LRP instances that have crashed. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-crashed-app-instances) for details.</li><li markdown="span"><b>TAS BBS Fewer App Instances Than Expected</b>:Total number of LRP instances that are desired but have no record in the BBS. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-fewer-app-instances-than-expected) for details.</li><li markdown="span"><b>TAS BBS Master Elected</b>:Indicates when there is a BBS master election. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-master-elected) for details.</li><li markdown="span"><b>TAS BBS More App Instances Than Expected</b>:Total number of LRP instances that are no longer desired but still have a BBS record. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-more-app-instances-than-expected) for details.</li><li markdown="span"><b>TAS BBS Running App Instances Rate of Change</b>:DYNAMIC ALERT: NEGATIVE 10 is a placeholder.
Rate of change in the average number of app instances being started or stopped on the platform. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-running-app-instances-rate-of-change) for details.</li><li markdown="span"><b>TAS BBS Task Count is Elevated</b>:This elevated BBS task metric is a KPI tracked by the internal Tanzu Web Services team.</li><li markdown="span"><b>TAS BBS Time to Handle Requests</b>:The maximum observed latency time over the past 60 seconds that the BBS took to handle requests across all its API endpoints. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-time-to-handle-requests) for details.</li><li markdown="span"><b>TAS BBS Time to Run LRP Convergence</b>:Time that the BBS took to run its LRP convergence pass. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-time-to-run-lrp-convergence) for details.</li><li markdown="span"><b>TAS BOSH VM CPU Used</b>:CPU utilization - The percentage of CPU spent in user processes. Set an alert and investigate further if the CPU utilization is too high for a job.</li><li markdown="span"><b>TAS BOSH VM Disk Used</b>:System disk - Percentage of the system disk used on the VM.</li><li markdown="span"><b>TAS BOSH VM Ephemeral Disk Used</b>:Ephemeral disk - Percentage of the ephemeral disk used on the VM.</li><li markdown="span"><b>TAS BOSH VM Health</b>:1 means the system is healthy, and 0 means the system is not healthy.</li><li markdown="span"><b>TAS BOSH VM Memory Used</b>:System Memory - Percentage of memory used on the VM</li><li markdown="span"><b>TAS BOSH VM Persistent Disk Used</b>:Persistent disk - Percentage of the persistent disk used on the VM. Set an alert and investigate if the persistent disk usage is too high for a job over an extended period.</li><li markdown="span"><b>TAS Cloud Controller and Diego Not in Sync</b>:Indicates if the cf-apps Domain is up-to-date, meaning that TAS app requests from Cloud Controller are synchronized to bbs. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-cloud-controller-and-diego-not-in-sync) for details.</li><li markdown="span"><b>TAS Diego Cell Container Capacity</b>:Percentage of remaining container capacity for a given Diego Cell.</li><li markdown="span"><b>TAS Diego Cell Disk Capacity</b>:Percentage of remaining disk capacity for a given Diego Cell.</li><li markdown="span"><b>TAS Diego Cell Memory Capacity</b>:Percentage of remaining memory capacity for a given Diego Cell.</li><li markdown="span"><b>TAS Diego Cell Replication Bulk Sync Duration</b>:Time that the Diego Cell Rep took to sync the ActualLRPs that it claimed with its actual garden containers.</li><li markdown="span"><b>TAS Diego Cell Route Emitter Sync Duration</b>:Time the active Route Emitter took to perform its synchronization pass.</li><li markdown="span"><b>TAS Garden Health Check Failed</b>:The Diego Cell periodically checks its health against the Garden back end. For Diego Cells, 0 means healthy, and 1 means unhealthy.</li><li markdown="span"><b>TAS Gorouter 502 Bad Gateway</b>:The number of bad gateways, or 502 responses, from the Gorouter itself, emitted per Gorouter instance. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-gorouter-502-bad-gateway) for details.</li><li markdown="span"><b>TAS Gorouter File Descriptors</b>:The number of file descriptors currently used by the Gorouter job. Indicates an impending issue with the Gorouter. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-gorouter-file-descriptor) for details.</li><li markdown="span"><b>TAS Gorouter Handling Latency</b>:This measures the amount of time a Gorouter takes to handle requests to backend endpoints, including both apps, CC and UAA. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-gorouter-handling-latency) for details.</li><li markdown="span"><b>TAS Gorouter Server Error</b>:The number of requests completed by the Gorouter VM for HTTP status family 5xx, server errors, emitted per Gorouter instance.</li><li markdown="span"><b>TAS Gorouter Throughput</b>:This measures the number of requests completed by the Gorouter VM, emitted per Gorouter instance. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-gorouter-throughput) for details.</li><li markdown="span"><b>TAS Gorouter Time Since Last Route Register Received</b>:Time since the last route register was received, emitted per Gorouter instance. Indicates if routes are not being registered to apps correctly.</li><li markdown="span"><b>TAS Locks Held by Auctioneer</b>:Whether an Auctioneer instance holds the expected Auctioneer lock (in Locket). See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-locks-held-by-auctioneer) for details.</li><li markdown="span"><b>TAS Locks Held by BBS</b>:Whether a BBS instance holds the expected BBS lock (in Locket). See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-locks-held-by-bbs) for details.</li><li markdown="span"><b>TAS UAA Latency is Elevated</b>:A quick way to confirm user-impacting behavior is to try login.run.pivotal.io and see if you receive a delayed response. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-uaa-latency-is-elevated) for details.</li></ul>