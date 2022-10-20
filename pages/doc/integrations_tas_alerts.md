---
title: Tanzu Application Service Alerts
keywords:
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_tas_alerts.html
summary: Details for Tanzu Application Service Alerts.
---

The Tanzu Application Service (TAS) integration includes a rich set of out of the box alerts. You can preview, install,
and uninstall the alerts on the **Alerts** tab of the integration. This page gives details for each alert.

{% include note.html content="If you already have installed the Pivotal Cloud Foundry (PCF) alerts, and want to migrate
to the Tanzu Application Service integration, uninstall the PCF alerts, so that you don't have duplicate versions of the
same alerts.
See [installing and uninstalling integration alerts](integrations.html#installing-and-uninstalling-integration-alerts).
Note that any changes to the PCF alerts that you have made will not be migrated and will be lost. You have to apply them
manually after setting up the Tanzu Application Service integration." %}

## TAS Active Locks Alerts

Total count of how many locks the system components are holding.

If the ActiveLocks count is not equal to the expected value, there is likely a problem with Diego.

1. Run `monit` status to inspect for failing processes.
2. If there are no failing processes, then review the logs for the components using the Locket service: BBS, Auctioneer,
   TPS Watcher, Routing API, and Clock Global (Cloud Controller clock). Look for indications that only one of each
   component is active at a time.
3. Focus triage on the BBS first:
   - A healthy BBS shows obvious activity around starting or claiming LRPs.
   - An unhealthy BBS leads to the Auctioneer showing minimal or no activity. The BBS sends work to the Auctioneer.
   - Reference the BBS-level Locket metric `tas.bbs.LockHeld`. A value of 0 indicates Locket issues at the BBS level.
     For more information, see Locks Held by BBS.
4. If the BBS appears healthy, then check the Auctioneer to ensure it is processing auction payloads.
   - Recent logs for Auctioneer should show all but one of its instances are currently waiting on locks, and the active
     Auctioneer should show a record of when it last attempted to execute work. This attempt should correspond to app
     development activity, such as `cf push`.
   - Reference the Auctioneer-level Locket metric `tas.auctioneer.LockHeld`. A value of 0 indicates Locket issues at the
     Auctioneer level. For more information, see Locks Held by Auctioneer.
5. The TPS Watcher is primarily active when app instances crash. Therefore, if the TPS Watcher is suspected, review the
   most recent logs.
6. If you are unable to resolve on-going excessive active locks, pull logs from the Diego BBS and Auctioneer VMs, which
   includes the Locket service component logs, and contact VMware Tanzu Support.

## TAS Auctioneer Fetch State Duration Taking Too Long

Time that the Auctioneer took to fetch state from all the Diego Cells when running its auction.

Indicates how the Diego Cells themselves are performing. Alerting on this metric helps alert that app staging requests
to Diego may be failing.

1. Check the health of the Diego Cells by reviewing the logs and looking for errors.
2. Review IaaS console metrics.
3. Inspect the Auctioneer logs to determine if one or more Diego Cells is taking significantly longer to fetch state
   than other Diego Cells. Relevant log lines have wording like `fetched Diego Cell state`.
4. Pull Diego Brain logs, Diego Cell logs, and Auctioneer logs and contact Support telling them that fetching Diego Cell
   states is taking too long.


## TAS Auctioneer LRP Auctions Failed

The number of Long Running Process (LRP) instances that the Auctioneer failed to place on Diego Cells.

This metric can indicate that TAS is out of container space or that there is a lack of resources within your
environment. This indicator also increases when the LRP is requesting an isolation segment, volume drivers, or a stack
that is unavailable, either not deployed or lacking sufficient resources to accept the work. This metric is emitted on
event, and therefore gaps in receipt of this metric can be normal during periods of no app instances being scheduled.
This error is most common due to capacity issues. For example, if Diego Cells do not have enough resources, or if Diego
Cells are going back and forth between a healthy and unhealthy state.

1. To best determine the root cause, examine the Auctioneer logs. Depending on the specific error and resource
   constraint, you may also find a failure reason in the Cloud Controller (CC) API.
2. Investigate the health of your Diego Cells to determine if they are the resource type causing the problem.
3. Consider scaling additional Diego Cells using Ops Manager.
4. If scaling Diego Cells does not solve the problem, pull Diego Brain logs and BBS node logs and contact VMware Tanzu
   Support telling them that LRP auctions are failing.

## TAS Auctioneer Task Auctions Failed

The number of Tasks that the Auctioneer failed to place on Diego Cells.

This metric is cumulative over the lifetime of the Auctioneer job. Failing Task auctions indicate a lack of resources
within your environment and that you likely need to scale. This indicator increases when the Task is requesting an
isolation segment, volume drivers, or a stack that is unavailable, either not deployed or lacking sufficient resources
to accept the work. This metric is emitted on event, and therefore gaps in receipt of this metric can be normal during
periods of no tasks being scheduled. This error is most common due to capacity issues. For example, if Diego Cells do
not have enough resources, or if Diego Cells are going back and forth between a healthy and unhealthy state.

1. In order to best determine the root cause, examine the Auctioneer logs. Depending on the specific error or resource
   constraint, you may also find a failure reason in the CC API.
2. Investigate the health of Diego Cells.
3. Consider scaling additional Diego Cells using Ops Manager.
4. If scaling Diego Cells does not solve the problem, pull Diego Brain logs and BBS logs for troubleshooting and contact
   VMware Tanzu Support for additional troubleshooting. Inform VMware Tanzu Support that Task auctions are failing.

## TAS BBS Fewer App Instances Than Expected

Total number of LRP instances that are desired but have no record in the BBS. When Diego wants to add more apps, the BBS
sends a request to the Auctioneer to spin up additional LRPs. `tas.bbs.LRPsMissing` is the total number of LRP instances
that are desired but have no BBS record.

If Diego has less LRP running than expected, there may be problems with the BBS. An app push with many instances can
temporarily spike this metric. However, a sustained spike in `tas.bbs.LRPsMissing` is unusual and should be
investigated.

1. Review the BBS logs for proper operation or errors, looking for detailed error messages.
2. If the condition persists, pull the BBS logs and contact VMware Tanzu Support.

## TAS BBS More App Instances Than Expected

Total number of LRP instances that are no longer desired but still have a BBS record. When Diego wants to add more apps,
the BBS sends a request to the Auctioneer to spin up additional LRPs. `tas.bbs.LRPsExtra` is the total number of LRP
instances that are no longer desired but still have a BBS record.

If Diego has more LRPs running than expected, there may be problems with the BBS. Deleting an app with many instances
can temporarily spike this metric. However, a sustained spike in `tas.bbs.LRPsExtra` is unusual and should be
investigated.

1. Review the BBS logs for proper operation or errors, looking for detailed error messages.
2. If the condition persists, pull the BBS logs and contact VMware Tanzu Support.

## TAS BBS Time to Handle Requests

The maximum observed latency time over the past 60 seconds that the BBS took to handle requests across all its API
endpoints.

If this metric rises, the TAS API is slowing. Response to certain cf CLI commands is slow if request latency is high.

[//]: # (TODO: Ask Bob if these metrics are the same as in dashboard)
1. Check CPU and memory statistics in Ops Manager.
2. Check BBS logs for faults and errors that can indicate issues with BBS.
3. Check BBS VM resources. To find these metrics:
   1. Go to the "TAS: Job Details" dashboard.
   2. Under "Job" dropdown, select "diego_database".
   3. Look at charts "CPU Usage" and "Memory Usage".
4. If resources are low, try scaling them up. For example, add more CPUs and memory depending on its CPU memory metrics.
5. Check VM resources for the TAS backing database, and if they are high, consider vertically scaling them. To find
   these metrics:
   [//]: # (TODO: Ask bob where to find `TAS backing database` metrics)
   1. Go to the "TAS: Job Details" dashboard.
   2. Under "Job" dropdown, select "mysql".
   3. Look at charts "CPU Usage" and "Memory Usage".
6. If the above steps do not solve the issue, collect a sample of the Diego Cell logs from the BBS VMs and contact
   VMware Tanzu Support to troubleshoot further.

[//]: # (TODO: Resume here)
## TAS BBS Time to Run LRP Convergence

Time that the BBS took to run its LRP convergence pass.

If the convergence run begins taking too long, apps or Tasks may be crashing without restarting. This symptom can also
indicate loss of connectivity to the BBS database.

1. Check BBS logs for errors.
2. Try vertically scaling the BBS VM resources up. For example, add more CPUs or memory depending on its CPU and memory
 metrics.
   1. Go to the "TAS: Job Details" dashboard.
   2. Under "Job" dropdown, select "diego_database".
   3. Look at charts "CPU Usage" and "Memory Usage".
3. Consider vertically scaling the TAS backing database, if `system.cpu` and `system.memory` metrics for the database
   instances are high.
4. If that does not solve the issue, pull the BBS logs and contact VMware Tanzu Support for additional troubleshooting.

## TAS BOSH VM CPU Used

Percentage of CPU spent in user processes. 

1. Investigate the cause of the spike.
2. If the cause is a normal workload increase, then scale up the affected jobs.

[//]: # (TODO -- For Gorouter CPU utilization see Whatever the go router section is)

## TAS BOSH VM Disk Used

Percentage of the system disk used on the VM. 

This partition should not typically fill because BOSH deploys jobs to use ephemeral and persistent disks.

1. Investigate what is filling the jobs system partition.

## TAS BOSH VM Ephemeral Disk Used

Percentage of the ephemeral disk used on the VM. 

Investigate if the ephemeral disk usage is too high for a job over an extended period.

1. Run `bosh vms --details` to view jobs on affected deployments.
2. Determine the cause of the data consumption, and, if appropriate, increase disk space or scale the affected jobs.

## TAS BOSH VM Health

This is the most important BOSH metric to monitor. 
It indicates if the VM emitting the metric is healthy. 

* 1 means the system is healthy.
* 0 means the system is not healthy.

Multiple unhealthy VMs signals problems with the underlying IAAS layer.

1. Investigate TAS for VMs logs for the unhealthy components.

## TAS BOSH VM Memory Used

Percentage of memory used on the VM.

The response depends on the job the metric is associated with. 

1. If appropriate, scale affected jobs and monitor for improvement.

## TAS BOSH VM Persistent Disk Used

Percentage of the persistent disk used on the VM.

Investigate if the persistent disk usage is too high for a job over an extended period.

1. Run `bosh vms --details` to view jobs on affected deployments.
2. Determine cause of the data consumption, and, if appropriate, increase disk space or scale the affected jobs.

## TAS Cloud Controller and Diego Not in Sync

Indicates if the `cf-apps` Domain is up-to-date, meaning that TAS app requests from Cloud Controller are synchronized to `tas.bbs.LRPsDesired` (Diego-desired AIs) for execution.

* 1 means cf-apps Domain is up-to-date
* No data received means cf-apps Domain is not up-to-date

If the cf-apps Domain does not stay up-to-date, changes requested in the Cloud Controller are not guaranteed to propagate throughout the system.
If the Cloud Controller and Diego are out of sync, then apps running could vary from those desired.

1. Check the BBS and Clock Global (Cloud Controller clock) logs.
2. If the problem continues, pull the BBS logs and Clock Global (Cloud Controller clock) logs and contact VMware Tanzu Support to say that the `cf-apps` domain is not being kept fresh.

## TAS Diego Cell Container Capacity

Percentage of remaining container capacity for a given Diego Cell. Monitor this derived metric across all Diego Cells in a deployment.

* The metric `rep.CapacityRemainingContainers` indicates the remaining number of containers this Diego Cell can host.
* The metric `rep.CapacityTotalContainer` indicates the total number of containers this Diego Cell can host.


## TAS Diego Cell Disk Chunks Available

[//]: # (TODO -- Ask ab out chunks)
Remaining amount of disk in MiB available for each Diego Cell to allocate to containers.

Insufficient free disk on Diego Cells prevents the staging or starting of apps or tasks, resulting in error messages like 
```
ERR Failed to stage app: insufficient resources
```

1. Assign more resources to the Diego Cells or assign more Diego Cells.
2. Scale additional Diego Cells using Ops Manager.

[//]: # (TODO -- Ask about chunks)
## TAS Diego Cell Memory Chunks Available

Indicates the available Diego Cell memory, by number of chunks. Insufficient Diego Cell memory can prevent pushing and scaling apps.

The default chunk size used is 4 GB for this alert

Use: Indicates the available Diego Cell memory. Insufficient Diego Cell memory can prevent pushing and scaling apps.

The strongest operational value of this metric is to understand a deployment’s average app size and monitor/alert on ensuring that at least some Cells have large enough capacity to accept standard app size pushes. For example, if pushing a 4 GB app, Diego would have trouble placing that app if there is no one Diego Cell with sufficient capacity of 4 GB or greater.

As an example, Pivotal Cloud Ops uses a standard of 4 GB, and computes and monitors for the number of Diego Cells with at least 4 GB free. When the number of Diego Cells with at least 4 GB falls below a defined threshold, this is a scaling indicator alert to increase capacity. This free chunk count threshold should be tuned to the deployment size and the standard size of apps being pushed to the deployment.

Recommended Response

1. Assign more resources to the Diego Cells or assign more Diego Cells.
2. Scale additional Diego Cells using Ops Manager.

## TAS Diego Cell Replication Bulk Sync Duration

Time that the Diego Cell Rep took to sync the ActualLRPs that it claimed with its actual garden containers.

Sync times that are too high can indicate issues with the BBS.

1. Investigate BBS logs for faults and errors. 
2. If a one or more Diego cells appear problematic, pull the logs for those Diego cells and the BBS logs before contacting VMware Tanzu Support.

[//]: # (TODO This seems like a dynamic metric that needs tuning)
## TAS Diego Cell Route Emitter Sync Duration

Time that the active Route Emitter took to perform its synchronization pass.

Increases in this metric indicate that the Route Emitter may have trouble maintaining an accurate routing table to broadcast to the Gorouters. 
Tune your alerting values to your deployment based on historical data and adjust based on observations over time.
The suggested starting point is ≥ 5 for the yellow threshold and ≥ 10 for the critical threshold.
Above 10 seconds, the BBS may be failing.

If all or many jobs showing as impacted, there is likely an issue with Diego. 
1. Investigate the Route Emitter and Diego BBS logs for errors.
2. Verify that app routes are functional by making a request to an app, pushing an app, and pinging it, or if applicable, checking that your smoke tests have passed. 

If one or a few jobs showing as impacted, there is likely a connectivity issue and the impacted job should be investigated further.

## TAS Garden Health Check Failed

The Diego Cell periodically checks its health against the Garden back end. 

* 0 means healthy
* 1 means unhealthy

If multiple Diego Cells are impacted, this can indicate a larger problem with Diego, and should be considered a more critical investigation need.

If one Diego Cell is impacted: 
 * in a lower capacity environment, this situation could result in negative end-user impact if left unresolved.
 * in a higher capacity environment, it does not participate in auctions, but end-user impact is usually low. 

1. Investigate Diego Cell servers for faults and errors.
2. If a particular Diego Cell or Diego Cells appear problematic:
   1. Determine a time interval during which the metrics from the Diego Cell changed from healthy to unhealthy.
   2. Pull the logs that the Diego Cell generated over that interval. The Diego Cell ID is the same as the BOSH instance ID.
   3. Pull the BBS logs over that same time interval.
   4. Contact VMware Tanzu Support.
3. As a last resort, if you cannot wait for VMware Tanzu Support, it sometimes helps to recreate the Diego Cell by running bosh recreate. For information about the bosh recreate command syntax, see Deployments in Commands in the BOSH documentation. Warning: Recreating a Diego Cell destroys its logs. To enable a root cause analysis of the Diego Cell’s problem, save out its logs before running `bosh recreate`.

## TAS Gorouter File Descriptor

Number of file descriptors currently used by the Gorouter job. 

Indicates an impending issue with the Gorouter. 
Without proper mitigation, it is possible for an unresponsive app to eventually exhaust available Gorouter file descriptors and cause route starvation for other apps running on TAS. 
Under heavy load, this unmitigated situation can also result in the Gorouter losing its connection to NATS and all routes being pruned.

[//]: # (TODO Check metric names)
While a drop in `gorouter.total_routes` or an increase in `gorouter.ms_since_last_registry_update` helps to surface that the issue may already be occurring, alerting on `gorouter.file_descriptors` indicates that such an issue is impending.

The Gorouter limits the number of file descriptors to 100,000 per job.
Once the limit is met, the Gorouter is unable to establish any new connections.
To reduce the risk of DDoS attacks, VMware recommends doing one or both of the following:

* Within TAS for VMs, set **Maximum connections per back end** to define how many requests can be routed to any particular app instance. This prevents a single app from using all Gorouter connections. The value specified should be determined by the operator based on the use cases for that foundation.
* Add rate limiting at the load balancer level.

1. Identify which app(s) are requesting excessive connections and resolve the impacting issues with these apps.
2. If the above mitigation steps have not already been taken, do so.
3. Consider adding more Gorouter VM resources to increase the number of available file descriptors.

## TAS Gorouter Time Since Last Route Register Received

Time since the last route register was received, emitted per Gorouter instance. 

Indicates if routes are not being registered to apps correctly.

1. Search the Gorouter and Route Emitter logs for connection issues to NATS.
2. Check the BOSH logs to see if the NATS, Gorouter, or Route Emitter VMs are failing.
3. Look more broadly at the health of all VMs, particularly Diego-related VMs.
4. If problems persist, pull the Gorouter and Route Emitter logs and contact VMware Tanzu Support to say there are consistently long delays in route registry.

## TAS Locks Held by Auctioneer

Whether an Auctioneer instance holds the expected Auctioneer lock (in Locket). 

* 1 means the active Auctioneer holds the lock
* 0 means the lock was lost

This metric is complimentary to Active Locks, and it offers an Auctioneer-level version of the Locket metrics. 
Although it is emitted per Auctioneer instance, only 1 active lock is held by Auctioneer. 
Therefore, the expected value is 1. 
The metric may occasionally be 0 when the Auctioneer instances are performing a leader transition, but a prolonged value of 0 indicates an issue with Auctioneer.

1. Run `monit` status on the Diego Database VM to check for failing processes.
2. If there are no failing processes, then review the logs for Auctioneer. 
   * Recent logs for Auctioneer should show all but one of its instances are currently waiting on locks, and the active Auctioneer should show a record of when it last attempted to execute work. This attempt should correspond to app development activity, such as `cf push`.
3. If you are unable to resolve the issue, pull logs from the Diego BBS and Auctioneer VMs, which includes the Locket service component logs, and contact VMware Tanzu Support.

## TAS Locks Held by BBS

Whether a BBS instance holds the expected BBS lock (in Locket). 
* 1 means the active BBS server holds the lock
* 0 means the lock was lost

This metric is complimentary to Active Locks, and it offers a BBS-level version of the Locket metrics. 
Although it is emitted per BBS instance, only 1 active lock is held by BBS. 
Therefore, the expected value is 1. 
The metric may occasionally be 0 when the BBS instances are performing a leader transition, but a prolonged value of 0 indicates an issue with BBS.

1. Run `monit` status on the Diego database VM to check for failing processes.
2. If there are no failing processes, then review the logs for BBS.
   * A healthy BBS shows obvious activity around starting or claiming LRPs.
   * An unhealthy BBS leads to the Auctioneer showing minimal or no activity. The BBS sends work to the Auctioneer.
3. If you are unable to resolve the issue, pull logs from the Diego BBS, which include the Locket service component logs, and contact VMware Tanzu Support.

## TAS UAA Latency is Elevated
Description	Time in milliseconds that UAA took to process a request that the Gorouter sent to UAA endpoints.

Indicates how responsive UAA has been to requests sent from the Gorouter.
Some operations may take longer to process, such as creating bulk users and groups. It is important to correlate latency observed with the endpoint and evaluate this data in the context of overall historical latency from that endpoint.
Unusual spikes in latency could indicate the need to scale UAA VMs.

Latency depends on the endpoint and operation being used. 
It is important to correlate the latency with the endpoint and evaluate this data in the context of the historical latency from that endpoint.

1. Inspect which endpoints requests are hitting. Use historical data to determine if the latency is unusual for that endpoint. For a list of UAA endpoints, see the UAA API documentation.
2. If it appears that UAA needs to be scaled due to ongoing traffic congestion, do not scale based on the latency metric alone. You should also ensure that the system.cpu.user metric for UAA stays in the suggested range of 80-90% maximum CPU utilization.
3. Resolve high utilization by scaling UAA VMs horizontally. To scale UAA, navigate to the Resource Config pane of the TAS for VMs tile and edit the number of your UAA VM instances.

[//]: # ( TODO -- should this original text be used?)
[//]: # (1. A quick way to confirm user-impacting behavior is to try `login.run.pivotal.io` and see if you receive a delayed response.)

[//]: # ()
[//]: # (Restart the UAA instances to solve this problem: `bosh -e prod -d cf-cfapps-io2 restart uaa` )

[//]: # (Restarting the instances will cause any active sessions to be lost, which will cause users to have to log in again.)
