---
title: Pivotal Cloud Foundry Alerts
keywords:
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_pcf_alerts.html
summary: Details for Pivotal Cloud Foundry Alerts
---

The Pivotal Cloud Foundry (PCF) integration includes a rich set of alerts out of the box. You can preview the alerts on the **Alerts** tab of the integration. This page gives details for each alert.

{% include note.html content="If you already have installed the Pivotal Cloud Foundry (PCF) alerts, and want to migrate to the Tanzu Application Service integration, uninstall the PCF alerts, so that you don't have duplicate versions of the same alerts. See [installing and uninstalling integration alerts](integrations.html#installing-and-uninstalling-integration-alerts). Note that any changes to the PCF alerts that you have made will not be migrated and will be lost. You have to apply them manually after setting up the Tanzu Application Service integration." %}

## PAS Active Locks Alerts

Total count of how many locks the system components are holding.

If the ActiveLocks count is not equal to the expected value, there is likely a problem with Diego.
1. Run `monit` status to inspect for failing processes.
2. If there are no failing processes, then review the logs for the components using the Locket service: BBS, Auctioneer, TPS Watcher, Routing API, and Clock Global (Cloud Controller clock). Look for indications that only one of each component is active at a time.
3. Focus triage on the BBS first:
   - A healthy BBS shows obvious activity around starting or claiming LRPs.
   - An unhealthy BBS leads to the Auctioneer showing minimal or no activity. The BBS sends work to the Auctioneer.
   - Reference the BBS-level Locket metric bbs.LockHeld. A value of 0 indicates Locket issues at the BBS level. For more information, see Locks Held by BBS.
4. If the BBS appears healthy, then check the Auctioneer to ensure it is processing auction payloads.
   - Recent logs for Auctioneer should show all but one of its instances are currently waiting on locks, and the active Auctioneer should show a record of when it last attempted to execute work. This attempt should correspond to app development activity, such as `cf push`.
   - Reference the Auctioneer-level Locket metric `auctioneer.LockHeld`. A value of 0 indicates Locket issues at the Auctioneer level. For more information, see Locks Held by Auctioneer.
5. The TPS Watcher is primarily active when app instances crash. Therefore, if the TPS Watcher is suspected, review the most recent logs.
6. If you are unable to resolve on-going excessive active locks, pull logs from the Diego BBS and Auctioneer VMs, which includes the Locket service component logs, and contact VMware Support.

## PAS Auctioneer Fetch State Duration Taking Too Long

App stage requests for Diego may be failing. Consult your VMware Expert.

## PAS Auctioneer LRP Auctions Failed

The number of Long Running Process (LRP) instances that the Auctioneer failed to place on Diego Cells.

This metric can indicate that PAS is out of container space or that there is a lack of resources within your environment. This indicator also increases when the LRP is requesting an isolation segment, volume drivers, or a stack that is unavailable, either not deployed or lacking sufficient resources to accept the work. This metric is emitted on event, and therefore gaps in receipt of this metric can be normal during periods of no app instances being scheduled. This error is most common due to capacity issues. For example, if Diego Cells do not have enough resources, or if Diego Cells are going back and forth between a healthy and unhealthy state.
1. To best determine the root cause, examine the Auctioneer logs. Depending on the specific error and resource constraint, you may also find a failure reason in the Cloud Controller (CC) API.
2. Investigate the health of your Diego Cells to determine if they are the resource type causing the problem.
3. Consider scaling additional Diego Cells using Ops Manager.
4. If scaling Diego Cells does not solve the problem, pull Diego Brain logs and BBS node logs and contact VMware Support telling them that LRP auctions are failing.

## PAS Auctioneer Task Auctions Failed

The number of Tasks that the Auctioneer failed to place on Diego Cells.

This metric is cumulative over the lifetime of the Auctioneer job. Failing Task auctions indicate a lack of resources within your environment and that you likely need to scale. This indicator increases when the Task is requesting an isolation segment, volume drivers, or a stack that is unavailable, either not deployed or lacking sufficient resources to accept the work. This metric is emitted on event, and therefore gaps in receipt of this metric can be normal during periods of no tasks being scheduled. This error is most common due to capacity issues. For example, if Diego Cells do not have enough resources, or if Diego Cells are going back and forth between a healthy and unhealthy state.
1. In order to best determine the root cause, examine the Auctioneer logs. Depending on the specific error or resource constraint, you may also find a failure reason in the CC API.
2. Investigate the health of Diego Cells.
3. Consider scaling additional Diego Cells using Ops Manager.
4. If scaling Diego Cells does not solve the problem, pull Diego Brain logs and BBS logs for troubleshooting and contact VMware Support for additional troubleshooting. Inform VMware Support that Task auctions are failing.

## PAS Auctioneer Time to Fetch Diego Cell State

Time in ns that the Auctioneer took to fetch state from all the Diego Cells when running its auction. Indicates how the Diego Cells themselves are performing. Alerting on this metric helps alert that app staging requests to Diego may be failing.
1. Check the health of the Diego Cells by reviewing the logs and looking for errors.
2. Review IaaS console metrics.
3. Inspect the Auctioneer logs to determine if one or more Diego Cells is taking significantly longer to fetch state than other Diego Cells. Relevant log lines have wording like `fetched Diego Cell state`. Pull Diego Brain logs, Diego Cell logs, and Auctioneer logs and contact VMware Support telling them that fetching Diego Cell states is taking too long.

## PAS BBS Crashed App Instances

Total number of LRP instances that have crashed. Indicates how many instances in the deployment are in a crashed state. An increase in `bbs.CrashedActualLRPs` can indicate several problems, from a bad app with many instances associated, to a platform issue that is resulting in app crashes. this metric to help create a baseline for your deployment. After you have a baseline, you can create a deployment-specific alert to notify of a spike in crashes above the trend line. Tune alert values to your deployment. Frequency: 30 s
1. Look at the BBS logs for apps that are crashing and at the Diego Cell logs to see if the problem is with the apps themselves, rather than a platform issue.
2. Before contacting VMware Support, pull the BBS logs and, if particular apps are the problem, pull the logs from their Diego Cells too.

## PAS BBS Fewer App Instances Than Expected

Total number of LRP instances that are desired but have no record in the BBS. When Diego wants to add more apps, the BBS sends a request to the Auctioneer to spin up additional LRPs. `LRPsMissing` is the total number of LRP instances that are desired but have no BBS record. If Diego has less LRP running than expected, there may be problems with the BBS. An app push with many instances can temporarily spike this metric. However, a sustained spike in `bbs.LRPsMissing` is unusual and should be investigated. Frequency: 30 s

1. Review the BBS logs for proper operation or errors, looking for detailed error messages.
2. If the condition persists, pull the BBS logs and contact VMware Support.

## PAS BBS Master Elected

Indicates when there is a BBS master election. A BBS master election takes place when a BBS instance has taken over as the active instance. A value of 1 is emitted when the election takes place. This metric emits when a redeployment of the BBS occurs. If this metric is emitted frequently outside of a deployment, this may be a signal of underlying problems that should be investigated. If the active BBS is continually changing, this can cause app push downtime.

## PAS BBS More App Instances Than Expected

Total number of LRP instances that are no longer desired but still have a BBS record. When Diego wants to add more apps, the BBS sends a request to the Auctioneer to spin up additional LRPs. `LRPsExtra` is the total number of LRP instances that are no longer desired but still have a BBS record. If Diego has more LRPs running than expected, there may be problems with the BBS. Deleting an app with many instances can temporarily spike this metric. However, a sustained spike in `bbs.LRPsExtra` is unusual and should be investigated. Frequency: 30 s
1. Review the BBS logs for proper operation or errors, looking for detailed error messages.
2. If the condition persists, pull the BBS logs and contact VMware Support.

## PAS BBS Running App Instances Rate of Change

`DYNAMIC ALERT: NEGATIVE 10` is a placeholder. Rate of change in the average number of app instances being started or stopped on the platform. It is derived from `bbs.LRPsRunning` and represents the total number of LRP instances that are running on Diego cells.

This Delta reflects a DOWNWARD trend for app instances started or stopped. It helps to provide a picture of the overall (lack of) growth trend of the environment for capacity planning. You may want to alert on delta values outside of an expected range.

## PAS BBS Task Count is Elevated

This elevated BBS task metric is a KPI tracked by the internal VMware Web Services team. Contact the Diego team to investigate if the cause is not clear.

## PAS BBS Time to Handle Requests

The maximum observed latency time over the past 60 seconds that the BBS took to handle requests across all its API endpoints. If this metric rises, the PAS API is slowing. Response to certain cf CLI commands is slow if request latency is high.
1. Check CPU and memory statistics in Ops Manager.
2. Check BBS logs for faults and errors that can indicate issues with BBS.
3. Try scaling the BBS VM resources up. For example, add more CPUs and memory depending on its `system.cpu`/`system.memory` metrics.
4. Consider vertically scaling the PAS backing database, if `system.cpu` and `system.memory` metrics for the database instances are high.
5. If the above steps do not solve the issue, collect a sample of the Diego Cell logs from the BBS VMs and contact VMware Support to troubleshoot further.

## PAS BBS Time to Run LRP Convergence

Time that the BBS took to run its LRP convergence pass. If the convergence run begins taking too long, apps or Tasks may be crashing without restarting. This symptom can also indicate loss of connectivity to the BBS database.
1. Check BBS logs for errors.
2. Try vertically scaling the BBS VM resources up. For example, add more CPUs or memory depending on its `system.cpu`/`system.memory` metrics.
3. Consider vertically scaling the PAS backing database, if `system.cpu` and `system.memory` metrics for the database instances are high.
4. If that does not solve the issue, pull the BBS logs and contact VMware Support for additional troubleshooting.

## PAS BOSH VM CPU Used

Percentage of CPU spent in user processes. Set an alert and investigate further if the CPU utilization is too high for a job.

For monitoring Gorouter performance, CPU utilization of the Gorouter VM is the key capacity scaling indicator VMware recommends. For more information, see Router VM CPU Utilization in Key Capacity Scaling Indicators.

## PAS BOSH VM Disk Used

Percentage of the system disk used on the VM. Set an alert to indicate when the system disk is almost full. Investigate what is filling the jobs system partition.

This partition should not typically fill because BOSH deploys jobs to use ephemeral and persistent disks.

## PAS BOSH VM Ephemeral Disk Used

Percentage of the ephemeral disk used on the VM. Set an alert and investigate if the ephemeral disk usage is too high for a job over an extended period.

1. Run bosh `vms --details` to view jobs on affected deployments.
2. Determine the cause of the data consumption, and, if appropriate, increase disk space or scale out the affected jobs.

This partition should not typically fill because BOSH deploys jobs to use ephemeral and persistent disks.

## PAS BOSH VM Health

This is the most important BOSH metric to monitor. It indicates if the VM emitting the metric is healthy. Review this metric for all VMs to estimate the overall health of the system.

* 1 means the system is healthy.
* 0 means the system is not healthy.

Multiple unhealthy VMs signals problems with the underlying IAAS layer.

## PAS BOSH VM Memory Used

Percentage of memory used on the VM.

## PAS BOSH VM Persistent Disk Used

Percentage of the persistent disk used on the VM. Set an alert and investigate if the persistent disk usage is too high for a job over an extended period.
1. Run `bosh vms --details` to view jobs on affected deployments.
2. Determine cause of the data consumption, and, if appropriate, increase disk space or scale out the affected jobs.

This partition should not typically fill because BOSH deploys jobs to use ephemeral and persistent disks.

## PAS Cloud Controller and Diego Not in Sync

Indicates if the `cf-apps` Domain is up-to-date, meaning that PAS app requests from Cloud Controller are synchronized to `bbs.LRPsDesired` (Diego-desired AIs) for execution.
* 1 means cf-apps Domain is up-to-date
* No data received means cf-apps Domain is not up-to-date: If the cf-apps Domain does not stay up-to-date, changes requested in the Cloud Controller are not guaranteed to propagate throughout the system. If the Cloud Controller and Diego are out of sync, then apps running could vary from those desired.
   1. Check the BBS and Clock Global (Cloud Controller clock) logs.
   2. If the problem continues, pull the BBS logs and Clock Global (Cloud Controller clock) logs and contact VMware Support to say that the `cf-apps` domain is not being kept fresh.

## PAS Diego Cell Container Capacity

Percentage of remaining container capacity for a given Diego Cell. Monitor this derived metric across all Diego Cells in a deployment.

* The metric `rep.CapacityRemainingContainers` indicates the remaining number of containers this Diego Cell can host.
* The metric `rep.CapacityTotalContainer` indicates the total number of containers this Diego Cell can host.

Recommended threshold: < avg(35%)

## PAS Diego Cell Disk Capacity

Percentage of remaining disk capacity for a given Diego Cell. Monitor this derived metric across all Diego Cells in a deployment.
* The metric `rep.CapacityRemainingDisk` indicates the remaining amount in MiB of disk available for this Diego Cell to allocate to containers.
* The metric `rep.CapacityTotalDisk` indicates the total amount in MiB of disk available for this Diego Cell to allocate to containers.

Recommended threshold: < avg(35%)

## PAS Diego Cell Memory Capacity

Percentage of remaining memory capacity for a given Diego cell. Monitor this derived metric across all Diego cells in a deployment.
* The metric `rep.CapacityRemainingMemory` indicates the remaining amount in MiB of memory available for this Diego Cell to allocate to containers.
* The metric `rep.CapacityTotalMemory` indicates the total amount in MiB of memory available for this Diego Cell to allocate to containers.

Recommended threshold: < avg(35%)

## PAS Diego Cell Replication Bulk Sync Duration

Time that the Diego Cell Rep took to sync the ActualLRPs that it claimed with its actual garden containers.  Sync times that are too high can indicate issues with the BBS.
Yellow: warning (2265 5 s)
Red: critical (2265 10 s)

ACTION: Investigate BBS logs for faults and errors. If a one or more Diego cells appear problematic, pull the logs for those Diego cells and the BBS logs before contacting VMware Support.


## PAS Diego Cell Route Emitter Sync Duration

Time the active Route Emitter took to perform its synchronization pass. Increases in this metric indicate that the Route Emitter may have trouble maintaining an accurate routing table to broadcast to the Gorouters. Tune your alerting values to your deployment based on historical data and adjust based on observations over time. The suggested starting point is ≥ 5 for the yellow threshold and ≥ 10 for the critical threshold. Above 10 seconds, the BBS may be failing.
* Yellow warning: > 5s
* Red critical: >10 s

ACTION:
If all or many jobs showing as impacted, there is likely an issue with Diego. * Investigate the Route Emitter and Diego BBS logs for errors.
* Verify that app routes are functional by making a request to an app, pushing an app and pinging it, or if applicable, checking that your smoke tests have passed. If one or a few jobs showing as impacted, there is likely a connectivity issue and the impacted job should be investigated further.

## PAS Garden Health Check Failed

The Diego Cell periodically checks its health against the Garden back end. For Diego Cells, 0 means healthy, and 1 means unhealthy. Set an alert for further investigation if multiple unhealthy Diego Cells are detected in the given time window. If one Diego Cell is impacted, it does not participate in auctions, but end-user impact is usually low. If multiple Diego Cells are impacted, this can indicate a larger problem with Diego, and should be considered a more critical investigation need.
1. Investigate Diego Cell servers for faults and errors.
2. If a particular Diego Cell or Diego Cells appear problematic:
  1. Determine a time interval during which the metrics from the Diego Cell changed from healthy to unhealthy.
  2. Pull the logs that the Diego Cell generated over that interval. The Diego Cell ID is the same as the BOSH instance ID.
  3. Pull the BBS logs over that same time interval.
  4. Contact VMware Support.
3. As a last resort, if you cannot wait for VMware Support, it sometimes helps to recreate the Diego Cell by running bosh recreate. For information about the bosh recreate command syntax, see Deployments in Commands in the BOSH documentation. Warning: Recreating a Diego Cell destroys its logs. To enable a root cause analysis of the Diego Cell’s problem, save out its logs before running `bosh recreate`.

## PAS Gorouter 502 Bad Gateway

The number of bad gateways, or 502 responses, from the Gorouter itself, emitted per Gorouter instance. The Gorouter emits a 502 bad gateway error when it has a route in the routing table and, in attempting to make a connection to the back end, finds that the back end does not exist.

Use: Indicates that route tables might be stale. Stale routing tables suggest an issue in the route register management plane, which indicates that something has likely changed with the locations of the containers. Always investigate unexpected increases in this metric.

Actions: Check the Gorouter and Route Emitter logs to see if they are experiencing issues when connecting to NATS. Check the BOSH logs to see if the NATS, Gorouter, or Route Emitter VMs are failing. Look broadly at the health of all VMs, particularly Diego-related VMs. If problems persist, pull Gorouter and Route Emitter logs and contact VMware Support to say there has been an unusual increase in Gorouter bad gateway responses.
* First inspect logs for network issues and indications of misbehaving backends.
* If it appears that the Gorouter needs to scale due to ongoing traffic congestion, do not scale on the latency metric alone. You should also look at the CPU utilization of the Gorouter VMs and keep it within a maximum 60-70% range.
* Resolve high utilization by scaling the Gorouter.

## PAS Gorouter File Descriptor

Number of file descriptors currently used by the Gorouter job. Indicates an impending issue with the Gorouter. Without proper mitigation, it is possible for an unresponsive app to eventually exhaust available Gorouter file descriptors and cause route starvation for other apps running on PAS. Under heavy load, this unmitigated situation can also result in the Gorouter losing its connection to NATS and all routes being pruned.

While a drop in gorouter.total_routes or an increase in `gorouter.ms_since_last_registry_update` helps to surface that the issue may already be occurring, alerting on `gorouter.file_descriptors` indicates that such an issue is impending.

The Gorouter limits the number of file descriptors to 100,000 per job. Once the limit is met, the Gorouter is unable to establish any new connections. To reduce the risk of DDoS attacks, VMware recommends doing one or both of the following:
* Within PAS, set Maximum connections per back end to define how many requests can be routed to any particular app instance. This prevents a single app from using all Gorouter connections. The value specified should be determined by the operator based on the use cases for that foundation. For example, VM sets the number of connections to 500 for Pivotal Web Services.
* Add rate limiting at the load balancer level.

## PAS Gorouter Handling Latency

Measures the amount of time a Gorouter takes to handle requests to backend endpoints, including both apps, CC and UAA. This is a 30-minute moving average round trip response time, including route handling. It indicates how Gorouter jobs in PAS impact overall responsiveness. Latencies above 100 ms can indicate problems with the network, misbehaving backends, or a need to scale the Gorouter due to traffic congestion.

ACTIONS:
* First inspect logs for network issues and indications of misbehaving backends.
* If it appears that the Gorouter needs to scale due to ongoing traffic congestion, do not scale on the latency metric alone. You should also look at the CPU utilization of the Gorouter VMs and keep it within a maximum 60-70% range.
* Resolve high utilization by scaling the Gorouter.

## PAS Gorouter Server Error

The number of requests completed by the Gorouter VM for HTTP status family 5xx, server errors, emitted per Gorouter instance.

A repeatedly crashing app is often the cause of a big increase in 5xx responses. However, response issues from apps can also cause an increase in 5xx responses. Always investigate an unexpected increase in this metric.

## PAS Gorouter Throughput

Measures the number of requests completed by the Gorouter VM, emitted per Gorouter instance. The aggregation of these values across all Gorouters provide insight into the overall traffic flow of a deployment. Unusually high spikes, if not known to be associated with an expected increase in demand, could indicate a DDoS risk. For performance and capacity management, consider this metric a measure of router throughput per job, converting it to requests-per-second, by looking at the delta value of `gorouter.total_requests` and deriving back to 1s, or `gorouter.total_requests.delta)/5`, as this is a 5-second metric.

For optimizing the Gorouter, consider the requests-per-second derived metric in the context of router latency and Gorouter VM CPU utilization. From performance and load testing of the Gorouter, Pivotal has observed that at approximately 2500 requests per second, latency can begin to increase.

ACTIONS:

To increase throughput and maintain low latency, scale the Gorouters either horizontally or vertically and ensure that the `system.cpu.user` metric for the Gorouter stays in the suggested range of 60-70% CPU Utilization. For more information about the `system.cpu.user` metric, see VM CPU Utilization.

## PAS Gorouter Time Since Last Route Register Received

Time since the last route register was received, emitted per Gorouter instance. Indicates if routes are not being registered to apps correctly.
Red critical: > 30 sec

ACTIONS:
* Search the Gorouter and Route Emitter logs for connection issues to NATS.
* Check the BOSH logs to see if the NATS, Gorouter, or Route Emitter VMs are failing.
* Look more broadly at the health of all VMs, particularly Diego-related VMs.
* If problems persist, pull the Gorouter and Route Emitter logs and contact VMware Support to say there are consistently long delays in route registry.

## PAS Locks Held by Auctioneer

Whether an Auctioneer instance holds the expected Auctioneer lock (in Locket). 1 means the active Auctioneer holds the lock, and 0 means the lock was lost. This metric is complimentary to Active Locks, and it offers an Auctioneer-level version of the Locket metrics. Although it is emitted per Auctioneer instance, only 1 active lock is held by Auctioneer. Therefore, the expected value is 1. The metric may occasionally be 0 when the Auctioneer instances are performing a leader transition, but a prolonged value of 0 indicates an issue with Auctioneer.

1. Run `monit` status on the Diego Database VM to check for failing processes.
2. If there are no failing processes, then review the logs for Auctioneer. Recent logs for Auctioneer should show all but one of its instances are currently waiting on locks, and the active Auctioneer should show a record of when it last attempted to execute work. This attempt should correspond to app development activity, such as `cf push`.
3. If you are unable to resolve the issue, pull logs from the Diego BBS and Auctioneer VMs, which includes the Locket service component logs, and contact VMware Support.

## PAS Locks Held by BBS

Whether a BBS instance holds the expected BBS lock (in Locket). 1 means the active BBS server holds the lock, and 0 means the lock was lost. This metric is complimentary to Active Locks, and it offers a BBS-level version of the Locket metrics. Although it is emitted per BBS instance, only 1 active lock is held by BBS. Therefore, the expected value is 1. The metric may occasionally be 0 when the BBS instances are performing a leader transition, but a prolonged value of 0 indicates an issue with BBS.

1. Run `monit` status on the Diego database VM to check for failing processes.
2. If there are no failing processes, then review the logs for BBS.
  * A healthy BBS shows obvious activity around starting or claiming LRPs.
  * An unhealthy BBS leads to the Auctioneer showing minimal or no activity. The BBS sends work to the Auctioneer.
3. If you are unable to resolve the issue, pull logs from the Diego BBS, which include the Locket service component logs, and contact VMware Support.

## PAS UAA Latency is Elevated

A quick way to confirm user-impacting behavior is to try `login.run.pivotal.io` and see if you receive a delayed response.

Restart the UAA instances to solve this problem: `bosh -e prod -d cf-cfapps-io2 restart uaa` Restarting the instances will cause any active sessions to be lost, which will cause users to have to log in again.
