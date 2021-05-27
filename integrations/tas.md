---
title: Tanzu Application Services (TAS) Integration
tags: [integrations list]
permalink: tas.html
summary: Learn about the Wavefront Tanzu Application Services (TAS) Integration.
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

## Alerts

The PCF alerts is also available for you to install and use. Descriptions of the alerts are available in [Pivotal Cloud Foundry Alerts](https://docs.wavefront.com/integrations_pcf_alerts.html)

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



<h2>Alerts</h2>  <ul><li markdown="span"><b>PAS Active Locks</b>:Total count of how many locks the system components are holding. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-active-locks-alerts) for details.</li><li markdown="span"><b>PAS Auctioneer Fetch State Duration Taking Too Long</b>:App stage requests for Diego may be failing.
Actions:
- Consult your Pivotal Expert.</li><li markdown="span"><b>PAS Auctioneer LRP Auctions Failed</b>:The number of Long Running Process (LRP) instances that the Auctioneer failed to place on Diego Cells. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-auctioneer-lrp-auctions-failed) for details.</li><li markdown="span"><b>PAS Auctioneer Task Auctions Failed</b>:The number of Tasks that the Auctioneer failed to place on Diego Cells. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-auctioneer-task-auctions-failed) for details.</li><li markdown="span"><b>PAS Auctioneer Time to Fetch Diego Cell State</b>:Time in ns that the Auctioneer took to fetch state from all the Diego Cells when running its auction. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-auctioneer-time-to-fetch-diego-cell-state) for details.</li><li markdown="span"><b>PAS BBS Crashed App Instances</b>:Total number of LRP instances that have crashed. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-bbs-crashed-app-instances) for details.</li><li markdown="span"><b>PAS BBS Fewer App Instances Than Expected</b>:Total number of LRP instances that are desired but have no record in the BBS. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-bbs-fewer-app-instances-than-expected) for details.</li><li markdown="span"><b>PAS BBS Master Elected</b>:Indicates when there is a BBS master election. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-bbs-master-elected) for details.</li><li markdown="span"><b>PAS BBS More App Instances Than Expected</b>:Total number of LRP instances that are no longer desired but still have a BBS record. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-bbs-more-app-instances-than-expected) for details.</li><li markdown="span"><b>PAS BBS Running App Instances Rate of Change</b>:DYNAMIC ALERT: NEGATIVE 10 is a placeholder.
Rate of change in the average number of app instances being started or stopped on the platform. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-bbs-running-app-instances-rate-of-change) for details.</li><li markdown="span"><b>PAS BBS Task Count is Elevated</b>:This elevated BBS task metric is a KPI tracked by the internal Pivotal Web Services team.</li><li markdown="span"><b>PAS BBS Time to Handle Requests</b>:The maximum observed latency time over the past 60 seconds that the BBS took to handle requests across all its API endpoints. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-bbs-time-to-handle-requests) for details.</li><li markdown="span"><b>PAS BBS Time to Run LRP Convergence</b>:Time that the BBS took to run its LRP convergence pass. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-bbs-time-to-run-lrp-convergence) for details.</li><li markdown="span"><b>PAS BOSH VM CPU Used</b>:CPU utilization - The percentage of CPU spent in user processes. Set an alert and investigate further if the CPU utilization is too high for a job.</li><li markdown="span"><b>PAS BOSH VM Disk Used</b>:System disk - Percentage of the system disk used on the VM.</li><li markdown="span"><b>PAS BOSH VM Ephemeral Disk Used</b>:Ephemeral disk - Percentage of the ephemeral disk used on the VM.</li><li markdown="span"><b>PAS BOSH VM Health</b>:1 means the system is healthy, and 0 means the system is not healthy.</li><li markdown="span"><b>PAS BOSH VM Memory Used</b>:System Memory - Percentage of memory used on the VM</li><li markdown="span"><b>PAS BOSH VM Persistent Disk Used</b>:Persistent disk - Percentage of the persistent disk used on the VM. Set an alert and investigate if the persistent disk usage is too high for a job over an extended period.</li><li markdown="span"><b>PAS Cloud Controller and Diego Not in Sync</b>:Indicates if the cf-apps Domain is up-to-date, meaning that PAS app requests from Cloud Controller are synchronized to bbs. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-cloud-controller-and-diego-not-in-sync) for details.</li><li markdown="span"><b>PAS Diego Cell Container Capacity</b>:Percentage of remaining container capacity for a given Diego Cell.</li><li markdown="span"><b>PAS Diego Cell Disk Capacity</b>:Percentage of remaining disk capacity for a given Diego Cell.</li><li markdown="span"><b>PAS Diego Cell Memory Capacity</b>:Percentage of remaining memory capacity for a given Diego Cell.</li><li markdown="span"><b>PAS Diego Cell Replication Bulk Sync Duration</b>:Time that the Diego Cell Rep took to sync the ActualLRPs that it claimed with its actual garden containers.</li><li markdown="span"><b>PAS Diego Cell Route Emitter Sync Duration</b>:Time the active Route Emitter took to perform its synchronization pass.</li><li markdown="span"><b>PAS Garden Health Check Failed</b>:The Diego Cell periodically checks its health against the Garden back end. For Diego Cells, 0 means healthy, and 1 means unhealthy.</li><li markdown="span"><b>PAS Gorouter 502 Bad Gateway</b>:The number of bad gateways, or 502 responses, from the Gorouter itself, emitted per Gorouter instance. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-gorouter-502-bad-gateway) for details.</li><li markdown="span"><b>PAS Gorouter File Descriptors</b>:The number of file descriptors currently used by the Gorouter job. Indicates an impending issue with the Gorouter. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-gorouter-file-descriptor) for details.</li><li markdown="span"><b>PAS Gorouter Handling Latency</b>:This measures the amount of time a Gorouter takes to handle requests to backend endpoints, including both apps, CC and UAA. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-gorouter-handling-latency) for details.</li><li markdown="span"><b>PAS Gorouter Server Error</b>:The number of requests completed by the Gorouter VM for HTTP status family 5xx, server errors, emitted per Gorouter instance.</li><li markdown="span"><b>PAS Gorouter Throughput</b>:This measures the number of requests completed by the Gorouter VM, emitted per Gorouter instance. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-gorouter-throughput) for details.</li><li markdown="span"><b>PAS Gorouter Time Since Last Route Register Received</b>:Time since the last route register was received, emitted per Gorouter instance. Indicates if routes are not being registered to apps correctly.</li><li markdown="span"><b>PAS Locks Held by Auctioneer</b>:Whether an Auctioneer instance holds the expected Auctioneer lock (in Locket). See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-locks-held-by-auctioneer) for details.</li><li markdown="span"><b>PAS Locks Held by BBS</b>:Whether a BBS instance holds the expected BBS lock (in Locket). See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-locks-held-by-bbs) for details.</li><li markdown="span"><b>PAS UAA Latency is Elevated</b>:A quick way to confirm user-impacting behavior is to try login.run.pivotal.io and see if you receive a delayed response. See [here](https://docs.wavefront.com/integrations_pcf_alerts.html#pas-uaa-latency-is-elevated) for details.</li></ul>