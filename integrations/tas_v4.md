---
title: Tanzu Application Service Integration
tags: [integrations list]
permalink: tas_v4.html
summary: Learn about the Wavefront Tanzu Application Service Integration.
---
## Tanzu Application Service Integration

Tanzu Application Service is a popular platform for building cloud-native applications.
This integration uses the VMware Tanzu Observability by Wavefront Nozzle v4. The integration offers TAS data egress, dashboards and alerting.

This integration scrapes metrics in the TAS Foundation and pushes them to Tanzu Observability. The integration doesn't just use a push-based approach like the earlier versions of the Tanzu Observability by Wavefront nozzle. The new approach supports more predictable and controllable data flow than the earlier versions of the nozzle.

{% include image.md src="images/screen-1.png" width="80" %}

### Dashboards

The TAS integration contains a set of predefined dashboards that give you an overview of your TAS deployment and specific TAS components:

- TAS: All Jobs - Overall health of the TAS deployment.
- TAS: App Instances - Detailed view of number and status of Application Instances (AIs).
- TAS: BOSH Director Health - Detailed view of BOSH Director health.
- TAS: CLI Health - Health of CLI within TAS.
- TAS: Certificate Expiration - Detailed view of the validity of the certificates.
- TAS: Diego / Capacity - Detailed Diego metrics.
- TAS: Doppler - Real-time visibility into Doppler health.
- TAS: Job Details - Detailed view of TAS job information.
- TAS: Logging and Metrics Pipeline - Health check of Logging and Metrics Firehose.
- TAS: Nozzle Troubleshooting - Health of the Nozzle's internal systems and services.
- TAS: Ops Manager Health - Health check of Ops Manager.
- TAS: Platform MySQL - Real-time visibility into the TAS MySQL status.
- TAS: Router - Detailed Gorouter metrics.
- TAS: Workload Monitoring - Information about applications running inside of TAS.

#### Service Dashboards

The TAS integration also includes dashboards for monitoring TAS services.

- TAS Services: MySQL - Detailed metrics about TAS MySQL service instances.
- TAS Services: RabbitMQ - Detailed metrics about TAS RabbitMQ service instances.
- TAS Services: Redis - Detailed metrics about TAS Redis service instances.

### Alerts

The current set of alerts comes from an older version of this integration. These alerts are not officially supported
yet, but you can install and use them. Descriptions of the alerts are available in
the [Tanzu Observability by Wavefront documentation](https://docs.wavefront.com/integrations_tas_alerts.html).

## Tanzu Application Service Setup



Supported Versions: TAS v2.11 and later.

### Install VMware Tanzu Observability by Wavefront Nozzle Tile

This integration uses the [VMware Tanzu Observability by Wavefront Nozzle](https://network.pivotal.io/products/wavefront-nozzle)
tile distributed through the Tanzu network.

See [Monitor Tanzu Application Service with Tanzu Observability by Wavefront](http://docs.wavefront.com/integrations_tas_howto.html) for detailed installation instructions.

### Wavefront Proxy Configuration
Use the following Wavefront Instance URL and API token for configuring the [Wavefront proxy](http://docs.pivotal.io/partners/wavefront-nozzle/installing.html#install):

Wavefront Instance URL: `https://YOUR_CLUSTER.wavefront.com/api`  
Wavefront API Token: `YOUR_API_TOKEN` 


## Tanzu Application Service Metrics Overview

This page describes the most important metrics exposed by the Tanzu Application Service (TAS) integration.
This list of metrics is not comprehensive. The full list of unique metrics varies from environment to environment based on factors such as the TAS version, the optional packages installed, and the custom application metrics.

The Key Performance Indicators listed below are the most important metrics for the TAS platform. These are the metrics that you should monitor to track the overall platform health.

## Key Performance Indicators

For more details about the metrics listed below, see [Key Performance Indicators](https://docs.pivotal.io/application-service/2-12/operating/monitoring/kpi.html).

|Metric Name|Description|
|:-------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|tas.auctioneer.AuctioneerFetchStatesDuration|Time in ns that the Auctioneer took to fetch state from all the Diego Cells when running its auction.|
|tas.auctioneer.AuctioneerLRPAuctionsFailed|The number of Long Running Process (LRP) instances that the Auctioneer failed to place on Diego Cells.|
|tas.auctioneer.AuctioneerLRPAuctionsStarted|The number of LRP instances that the Auctioneer successfully placed on Diego Cells.|
|tas.auctioneer.AuctioneerTaskAuctionsFailed|The number of Tasks that the Auctioneer failed to place on Diego Cells.|
|tas.auctioneer.LockHeld|Indicates whether an Auctioneer instance holds the expected Auctioneer lock (in Locket). 1 means the active Auctioneer holds the lock, 0 means the lock was lost.|
|tas.bbs.BBSMasterElected|Indicates when there is a BBS master election. A BBS master election takes place when a BBS instance has taken over as the active instance. A value of 1 is emitted when the election takes place.|
|tas.bbs.ConvergenceLRPDuration|Time in ns that the BBS took to run its LRP convergence pass.|
|tas.bbs.CrashedActualLRPs|Total number of LRP instances that have crashed.|
|tas.bbs.Domain_cf_apps|Indicates if the cf-apps Domain is up-to-date, meaning that the TAS for VMs app requests from the Cloud Controller are synchronized to bbs.LRPsDesired (Diego-desired AIs) for execution.|
|tas.bbs.LockHeld|Indicates whether a BBS instance holds the expected BBS lock (in Locket). 1 means the active BBS server holds the lock, 0 means the lock was lost.|
|tas.bbs.LRPsExtra|Total number of LRP instances that are no longer desired but still have a BBS record. When Diego wants to add more apps, the BBS sends a request to the Auctioneer to spin up additional LRPs. LRPsExtra is the total number of LRP instances that are no longer desired but still have a BBS record.|
|tas.bbs.LRPsMissing|Total number of LRP instances that are desired but have no record in the BBS.|
|tas.bbs.LRPsRunning|The total number of LRP instances that are running on Diego Cells.|
|tas.bbs.RequestLatency|The maximum observed latency time over the past 60 seconds that the BBS took to handle requests across all its API endpoints.|
|tas.gorouter.backend_exhausted_conns|The lifetime number of requests that have been rejected by the Gorouter VM due to the Max Connections Per Backend limit being reached across all tried back ends.|
|tas.gorouter.bad_gateways|The lifetime number of bad gateways, or 502 responses, from the Gorouter itself, emitted per Gorouter instance.|
|tas.gorouter.file_descriptors|The number of file descriptors currently used by the Gorouter job.|
|tas.gorouter.latency|The time in milliseconds that represents the length of a request from the Gorouter’s point of view.|
|tas.gorouter.latency_uaa|Time in milliseconds that UAA took to process a request that the Gorouter sent to UAA endpoints.|
|tas.gorouter.ms_since_last_registry_update|Time in milliseconds since the last route register was received, emitted per Gorouter instance.|
|tas.gorouter.responses_5xx|The lifetime number of requests completed by the Gorouter VM for HTTP status family 5xx, server errors, emitted per Gorouter instance.|
|tas.gorouter.total_requests|The lifetime number of requests completed by the Gorouter VM, emitted per Gorouter instance.|
|tas.gorouter.total_routes|The current total number of routes registered with the Gorouter, emitted per Gorouter instance.|
|tas.locket.ActiveLocks|Total count of how many locks the system components are holding.|
|tas.locket.ActivePresences|Total count of active presences. Presences are defined as the registration records that the Diego Cells maintain to advertise themselves to the platform.|
|tas.p-mysql._mysql_available|Indicates whether the MySQL service is available and responding to requests.|
|tas.p-mysql._mysql_galera_wsrep_cluster_size|The number of cluster nodes with which each node is communicating normally.|
|tas.p-mysql._mysql_galera_wsrep_cluster_status|Shows the primary status of the cluster component that the node is in.|
|tas.p-mysql._mysql_galera_wsrep_ready|Shows whether each cluster node can accept queries. Returns only 0 or 1.|
|tas.p-mysql._mysql_net_max_used_connections|Shows the maximum used number of connections over the maximum permitted number of simultaneous client connections.|
|tas.p-mysql._mysql_performance_cpu_utilization_percent|CPU time being consumed by the MySQL service.|
|tas.p-mysql._mysql_performance_queries_delta|The number of statements executed by the server over the last 30 seconds.|
|tas.p-mysql._mysql_system_ephemeral_disk_used_percent|The percentage of disk used on the ephemeral file system.|
|tas.p-mysql._mysql_system_persistent_disk_used_percent|The percentage of disk used on the persistent file system.|
|tas.p-mysql._mysql_variables_max_connections|Shows the maximum used number of connections over the maximum permitted number of simultaneous client connections.|
|tas.rep.CapacityRemainingDisk|Remaining amount of disk in MiB available for this Diego Cell to allocate to containers.|
|tas.rep.CapacityRemainingMemory|Remaining amount of memory in MiB available for this Diego Cell to allocate to containers.|
|tas.rep.GardenHealthCheckFailed|The Diego Cell periodically checks its health against the Garden backend. For Diego Cells, 0 means healthy and 1 means unhealthy.|
|tas.rep.RepBulkSyncDuration|Time in ns that the Diego Cell Rep took to sync the ActualLRPs that it claimed with its actual Garden containers.|
|tas.route_emitter.RouteEmitterSyncDuration|Time in ns that the active Route Emitter took to perform its synchronization pass.|
|tas.bosh-system-metrics-forwarder.system_cpu_user|CPU utilization - The percentage of CPU spent in user processes.|
|tas.bosh-system-metrics-forwarder.system_disk_ephemeral_percent|Ephemeral disk - Percentage of the ephemeral disk used on the VM.|
|tas.bosh-system-metrics-forwarder.system_disk_persistent_percent|Persistent disk — Percentage of persistent disk used on the VM.|
|tas.bosh-system-metrics-forwarder.system_disk_system_percent|System disk — Percentage of the system disk used on the VM.|
|tas.bosh-system-metrics-forwarder.system_healthy|1 means the system is healthy and 0 means the system is not healthy.|
|tas.bosh-system-metrics-forwarder.system_mem_percent|System Memory — Percentage of memory used on the VM.|
|tas.uaa.requests_global_completed_count|The lifetime number of requests completed by the UAA VM, emitted per UAA instance. This number includes health checks.|
|tas.uaa.server_inflight_count|The number of requests UAA is currently processing (in-flight requests), emitted per UAA instance.|

<h2>Alerts</h2>  <ul><li markdown="span"><b>TAS Active Locks</b>:Total count of how many locks the system components are holding. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-active-locks-alerts) for details.</li><li markdown="span"><b>TAS Auctioneer Fetch State Duration Taking Too Long</b>:App stage requests for Diego may be failing. Consult your Tanzu Expert.</li><li markdown="span"><b>TAS Auctioneer LRP Auctions Failed</b>:The number of Long Running Process (LRP) instances that the Auctioneer failed to place on Diego Cells. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-auctioneer-lrp-auctions-failed) for details.</li><li markdown="span"><b>TAS Auctioneer Task Auctions Failed</b>:The number of Tasks that the Auctioneer failed to place on Diego Cells. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-auctioneer-task-auctions-failed) for details.</li><li markdown="span"><b>TAS Auctioneer Time to Fetch Diego Cell State</b>:Time in ns that the Auctioneer took to fetch state from all the Diego Cells when running its auction. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-auctioneer-time-to-fetch-diego-cell-state) for details.</li><li markdown="span"><b>TAS BBS Crashed App Instances</b>:Total number of LRP instances that have crashed. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-crashed-app-instances) for details.</li><li markdown="span"><b>TAS BBS Fewer App Instances Than Expected</b>:Total number of LRP instances that are desired but have no record in the BBS. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-fewer-app-instances-than-expected) for details.</li><li markdown="span"><b>TAS BBS Master Elected</b>:Indicates when there is a BBS master election. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-master-elected) for details.</li><li markdown="span"><b>TAS BBS More App Instances Than Expected</b>:Total number of LRP instances that are no longer desired but still have a BBS record. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-more-app-instances-than-expected) for details.</li><li markdown="span"><b>TAS BBS Running App Instances Rate of Change</b>:DYNAMIC ALERT: NEGATIVE 10 is a placeholder.
Rate of change in the average number of app instances being started or stopped on the platform. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-running-app-instances-rate-of-change) for details.</li><li markdown="span"><b>TAS BBS Task Count is Elevated</b>:This elevated BBS task metric is a KPI tracked by the internal Tanzu Web Services team.</li><li markdown="span"><b>TAS BBS Time to Handle Requests</b>:The maximum observed latency time over the past 60 seconds that the BBS took to handle requests across all its API endpoints. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-time-to-handle-requests) for details.</li><li markdown="span"><b>TAS BBS Time to Run LRP Convergence</b>:Time that the BBS took to run its LRP convergence pass. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-bbs-time-to-run-lrp-convergence) for details.</li><li markdown="span"><b>TAS BOSH VM CPU Used</b>:CPU utilization - The percentage of CPU spent in user processes. Set an alert and investigate further if the CPU utilization is too high for a job.</li><li markdown="span"><b>TAS BOSH VM Disk Used</b>:System disk - Percentage of the system disk used on the VM.</li><li markdown="span"><b>TAS BOSH VM Ephemeral Disk Used</b>:Ephemeral disk - Percentage of the ephemeral disk used on the VM.</li><li markdown="span"><b>TAS BOSH VM Health</b>:1 means the system is healthy, and 0 means the system is not healthy.</li><li markdown="span"><b>TAS BOSH VM Memory Used</b>:System Memory - Percentage of memory used on the VM</li><li markdown="span"><b>TAS BOSH VM Persistent Disk Used</b>:Persistent disk - Percentage of the persistent disk used on the VM. Set an alert and investigate if the persistent disk usage is too high for a job over an extended period.</li><li markdown="span"><b>TAS Cloud Controller and Diego Not in Sync</b>:Indicates if the cf-apps Domain is up-to-date, meaning that TAS app requests from Cloud Controller are synchronized to bbs. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-cloud-controller-and-diego-not-in-sync) for details.</li><li markdown="span"><b>TAS Diego Cell Container Capacity</b>:Percentage of remaining container capacity for a given Diego Cell.</li><li markdown="span"><b>TAS Diego Cell Disk Capacity</b>:Percentage of remaining disk capacity for a given Diego Cell.</li><li markdown="span"><b>TAS Diego Cell Memory Capacity</b>:Percentage of remaining memory capacity for a given Diego Cell.</li><li markdown="span"><b>TAS Diego Cell Replication Bulk Sync Duration</b>:Time that the Diego Cell Rep took to sync the ActualLRPs that it claimed with its actual garden containers.</li><li markdown="span"><b>TAS Diego Cell Route Emitter Sync Duration</b>:Time the active Route Emitter took to perform its synchronization pass.</li><li markdown="span"><b>TAS Garden Health Check Failed</b>:The Diego Cell periodically checks its health against the Garden back end. For Diego Cells, 0 means healthy, and 1 means unhealthy.</li><li markdown="span"><b>TAS Gorouter 502 Bad Gateway</b>:The number of bad gateways, or 502 responses, from the Gorouter itself, emitted per Gorouter instance. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-gorouter-502-bad-gateway) for details.</li><li markdown="span"><b>TAS Gorouter File Descriptors</b>:The number of file descriptors currently used by the Gorouter job. Indicates an impending issue with the Gorouter. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-gorouter-file-descriptor) for details.</li><li markdown="span"><b>TAS Gorouter Handling Latency</b>:This measures the amount of time a Gorouter takes to handle requests to backend endpoints, including both apps, CC and UAA. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-gorouter-handling-latency) for details.</li><li markdown="span"><b>TAS Gorouter Server Error</b>:The number of requests completed by the Gorouter VM for HTTP status family 5xx, server errors, emitted per Gorouter instance.</li><li markdown="span"><b>TAS Gorouter Throughput</b>:This measures the number of requests completed by the Gorouter VM, emitted per Gorouter instance. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-gorouter-throughput) for details.</li><li markdown="span"><b>TAS Gorouter Time Since Last Route Register Received</b>:Time since the last route register was received, emitted per Gorouter instance. Indicates if routes are not being registered to apps correctly.</li><li markdown="span"><b>TAS Locks Held by Auctioneer</b>:Whether an Auctioneer instance holds the expected Auctioneer lock (in Locket). See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-locks-held-by-auctioneer) for details.</li><li markdown="span"><b>TAS Locks Held by BBS</b>:Whether a BBS instance holds the expected BBS lock (in Locket). See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-locks-held-by-bbs) for details.</li><li markdown="span"><b>TAS UAA Latency is Elevated</b>:A quick way to confirm user-impacting behavior is to try login.run.pivotal.io and see if you receive a delayed response. See [here](https://docs.wavefront.com/integrations_tas_alerts.html#tas-uaa-latency-is-elevated) for details.</li></ul>