---
title: Tanzu Application Service Alerts
keywords:
tags: [integrations, proxies]
sidebar: doc_sidebar
permalink: integrations_tas_alerts.html
summary: Details for Tanzu Application Service Alerts.
---

The Tanzu Application Service (TAS) integration includes a number of out-of-the-box alerts. You can preview, install, and uninstall the alerts on the **Alerts** tab of the integration. This page gives details for each alert.

{% include note.html content="If you already have installed the Pivotal Cloud Foundry (PCF) alerts, and want to migrate to the Tanzu Application Service integration, uninstall the PCF alerts, so that you don't have duplicate versions of the same alerts.
See [installing and uninstalling integration alerts](integrations.html#installing-and-uninstalling-integration-alerts). Note that any changes to the PCF alerts that you have made will not be migrated and will be lost. You have to apply them manually after setting up the Tanzu Application Service integration." %}

## TAS Apps Manager Availability

A result code of a poll to the [Apps Manager](https://docs.pivotal.io/application-service/console/index.html) URL.

A result code of zero indicates a successful poll. For the descriptions of the error codes, see
[Telegraf HTTP Response Input Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/http_response#result--result_code).

If your Apps Manager is unresponsive, this could indicate that your Application Developers are affected.

**Troubleshooting**

1. Use the `cf` CLI to check if the Apps Manager app is running.
2. Check your foundation networking, capacity, and VM health.

## TAS Auctioneer Fetch State Duration Taking Too Long

Time that the Auctioneer took to fetch state from all the Diego Cells when running its auction.

Indicates how the Diego Cells themselves are performing. Alerting on this metric helps alert that app staging requests
to Diego may be failing.

**Troubleshooting**
1. Check the health of the Diego Cells by reviewing the logs and looking for errors.
2. Review the IaaS console metrics.
3. Inspect the Auctioneer logs to determine if one or more Diego Cells are taking significantly longer to fetch state than other Diego Cells. 
   
   Relevant log lines have wording, such as: `fetched Diego Cell state`.
4. Pull Diego Brain logs, Diego Cell logs, and Auctioneer logs and contact VMware Tanzu Support telling them that fetching Diego Cell states is taking too long.


## TAS Auctioneer LRP Auctions Failed

The number of Long Running Process (LRP) instances that the Auctioneer failed to place on Diego Cells.

This metric can indicate that TAS is out of container space or that there is a lack of resources within your environment. This indicator also increases when the LRP is requesting an isolation segment, volume drivers, or a stack that is unavailable, either not deployed or lacking sufficient resources to accept the work. This metric is emitted on event, and therefore gaps in receipt of this metric can be normal during periods of no app instances being scheduled. This error is most common due to capacity issues. For example, if Diego Cells do not have enough resources, or if Diego Cells are going back and forth between a healthy and unhealthy state.

**Troubleshooting**
1. To best determine the root cause, examine the Auctioneer logs. 
   
   Depending on the specific error and resource constraint, you may also find a failure reason in the Cloud Controller (CC) API.
2. Investigate the health of your Diego Cells to determine if they are the resource type causing the problem.
3. Consider scaling additional Diego Cells using Ops Manager.
4. If scaling Diego Cells does not solve the problem, pull Diego Brain logs and BBS node logs and contact VMware Tanzu Support telling them that LRP auctions are failing.

## TAS Auctioneer Task Auctions Failed

The number of Tasks that the Auctioneer failed to place on Diego Cells.

This metric is cumulative over the lifetime of the Auctioneer job. Failing Task auctions indicate a lack of resources within your environment and that you might need to scale. This indicator increases when the Task is requesting an isolation segment, volume drivers, or a stack that is unavailable, either not deployed or lacking sufficient resources to accept the work. This metric is emitted on event, and therefore gaps in receipt of this metric can be normal during periods of no tasks being scheduled. This error is most common due to capacity issues. For example, if Diego Cells do not have enough resources, or if Diego Cells are going back and forth between a healthy and unhealthy state.

**Troubleshooting**
1. To determine the root cause, examine the Auctioneer logs. 
   
   Depending on the specific error or resource constraint, you may also find a failure reason in the CC API.
2. Investigate the health of the Diego Cells.
3. Consider scaling additional Diego Cells using Ops Manager.
4. If scaling Diego Cells does not solve the problem, pull Diego Brain logs and BBS logs for troubleshooting and contact VMware Tanzu Support for additional troubleshooting. Inform VMware Tanzu Support that Task auctions are failing.

## TAS BBS Fewer App Instances Than Expected

Total number of LRP instances that are desired but have no record in the BBS. When Diego wants to add more apps, the BBS sends a request to the Auctioneer to spin up additional LRPs. `tas.bbs.LRPsMissing` is the total number of LRP instances that are desired but have no BBS record.

If Diego has less LRP running than expected, there can be problems with the BBS. An app push with many instances can temporarily spike this metric. However, a sustained spike in `tas.bbs.LRPsMissing` is unusual and should be investigated.

**Troubleshooting**
1. Review the BBS logs for proper operation or errors, looking for detailed error messages.
2. If the condition persists, pull the BBS logs and contact VMware Tanzu Support.

## TAS BBS More App Instances Than Expected

Total number of LRP instances that are no longer desired but still have a BBS record. When Diego wants to add more apps, the BBS sends a request to the Auctioneer to spin up additional LRPs. `tas.bbs.LRPsExtra` is the total number of LRP instances that are no longer desired but still have a BBS record.

If Diego has more LRPs running than expected, there may be problems with the BBS. Deleting an app with many instances can temporarily spike this metric. However, a sustained spike in `tas.bbs.LRPsExtra` is unusual and should be investigated.

**Troubleshooting**
1. Review the BBS logs for proper operation or errors, looking for detailed error messages.
2. If the condition persists, pull the BBS logs and contact VMware Tanzu Support.

## TAS BBS Time to Handle Requests

The maximum observed latency time over the past 60 seconds that the BBS took to handle requests across all its API endpoints.

If this metric rises, the TAS API is slowing down. Response to certain `cf` CLI commands is slow if request latency is high.

**Troubleshooting**
1. Check BBS logs for faults and errors that can indicate issues with BBS.
2. Check BBS VM resources. To find these metrics:
   1. In your TAS integration, on the **Dashboards** tab, click the **TAS: Job Details** dashboard.
   2. From the **Job** drop-down menu, select **diego_database**.
   3. Look at the charts **CPU Usage** and **Memory Usage**.
3. If resources are low, try scaling them up. For example, add more CPUs and memory depending on the CPU memory metrics.
4. Check VM resources for the TAS backing database. 
   
   To find these metrics, go to the **TAS: Platform MySQL** dashboard to check the health. If resources are low, try scaling them up.
5. If the above steps do not solve the issue, collect a sample of the Diego Cell logs from the BBS VMs and contact VMware Tanzu Support to troubleshoot further.

## TAS BBS Time to Run LRP Convergence

Time that the BBS took to run its LRP convergence pass.

If the convergence run begins to take long time, apps or Tasks may be crashing without restarting. This symptom can also indicate loss of connectivity to the BBS database.

**Troubleshooting**
1. Check BBS logs for errors.
2. Try vertically scaling the BBS VM resources up. For example, add more CPUs or memory depending on its CPU and memory
 metrics.
   1. In your TAS integration, on the **Dashboards** tab, click the **TAS: Job Details** dashboard.
   2. From the **Job** drop-down menu, select **diego_database**.
   3. Look at the charts **CPU Usage** and **Memory Usage**.
3. Check VM resources for the TAS backing database. 
    
   To find these metrics, go to the **TAS: Platform MySQL** dashboard to check the health. If resources are low, try scaling them up.
4. If that does not solve the issue, pull the BBS logs and contact VMware Tanzu Support for additional troubleshooting.

## TAS BOSH Director Health

The total number of times the BOSH health SLI test suite has failed. A failed test suite is one in which any number of tests within the test suite fail. With the default thresholds, the alert will fire after 2 consecutive failures. 

The BOSH health metric exporter VM, bosh-health-exporter, creates a BOSH deployment called bosh-health every ten minutes. This BOSH deployment deploys another VM, bosh-health-check, which runs a suite of SLI tests to validate the functionality of the BOSH Director. After the SLI tests are complete, the BOSH health metric exporter VM collects the metrics from the bosh-health-check VM, then deletes the bosh-health deployment and the bosh-health-check VM.

For more information on the test, see [BOSH SLIs](https://docs.pivotal.io/healthwatch/metrics.html#bosh-sli). 

Losing the BOSH Director does not significantly impact the experience of Tanzu Application Service end users. However, this issue means a loss of resiliency for BOSH-managed VMs.


**Troubleshooting**

* SSH into the `bosh-health-exporter` VM in the "Healthwatch Exporter" deployment, and view logs to find out why the BOSH Director is failing.

## TAS BOSH VM CPU Used

Percentage of CPU spent in user processes. 

**Troubleshooting**
1. Investigate the cause of the spike.
2. If the cause is a normal workload increase, scale up the affected jobs.

## TAS BOSH VM Disk Used

Percentage of the system disk used on the VM. 

This partition should not typically fill because BOSH deploys jobs to use ephemeral and persistent disks.

**Troubleshooting**

* Investigate what is filling the jobs system partition.

## TAS BOSH VM Ephemeral Disk Used

Percentage of the ephemeral disk used on the VM. 

Investigate if the ephemeral disk usage is too high for a job over an extended period.

**Troubleshooting**

* Determine the cause of the data consumption, and, if appropriate, increase disk space or scale the affected jobs.

## TAS BOSH VM Memory Used

Percentage of memory used on the VM.

**Troubleshooting**

*  The response depends on the job the metric is associated with. If appropriate, scale affected jobs and monitor for improvement.

## TAS BOSH VM Persistent Disk Used

Percentage of the persistent disk used on the VM.

Investigate if the persistent disk usage is too high for a job over an extended period.

**Troubleshooting**

* Determine the cause of the data consumption, and, if appropriate, increase disk space or scale the affected jobs.

## TAS Certificate Expiration

The number of seconds until expiration of each certificate in the foundation. Negative values indicate that the certificate expired in the past.

By default, this alert will fire if any of the certificates on your foundation will expire within 30 days.

By default, entries appear with the following color-coding:

* Red -- Indicates that the expiration time is under 7 days
* Orange -- Indicates that the expiration time is under 30 days
* Green -- Indicates that the expiration time is more than 30 days

**Troubleshooting**

* Update your certificates.

## TAS CLI Command Status

The total number of times the App SLI Smoke Test Suite has failed. With the default thresholds, the alert will fire after 2 consecutive failures.

The App SLI Smoke Test Suite gets metrics from the TAS for VMs SLI exporter VM, pas-sli-exporter, which tests the functionality of the `cf` CLI (e.g. `cf push`, `cf login`) every 5 minutes. These tests are intended to give Platform Operators confidence that Application Developers can successfully interact with and manage applications on the platform. The tests will also report a failure if any task takes more than 5 minutes to complete.

For more information on the test, see [TAS for VMs SLI Exporter VM](https://docs.pivotal.io/healthwatch/metrics.html#platform-sli).

**Troubleshooting**

* If a failure occurs, try to use the failed CLI command in a terminal to see why it is failing.

## TAS Cloud Controller and Diego Not in Sync

Indicates if the `cf-apps` Domain is up-to-date, meaning that TAS app requests from Cloud Controller are synchronized to `tas.bbs.LRPsDesired` (Diego-desired AIs) for execution.

* 1 means cf-apps Domain is up-to-date
* No data received means cf-apps Domain is not up-to-date

If the cf-apps Domain does not stay up-to-date, changes requested in the Cloud Controller are not guaranteed to propagate throughout the system.
If the Cloud Controller and Diego are out of sync, then apps running could vary from those desired.

**Troubleshooting**
1. Check the BBS and Clock Global (Cloud Controller clock) logs.
2. If the problem persists, pull the BBS logs and Clock Global (Cloud Controller clock) logs and contact VMware Tanzu Support to say that the `cf-apps` domain is not being kept fresh.

## TAS Diego Cell Container Capacity

Percentage of remaining container capacity for a given Diego Cell. Monitor this derived metric across all Diego Cells in a deployment.

* The metric `tas.rep.CapacityRemainingContainers` indicates the remaining number of containers this Diego Cell can host.
* The metric `tas.rep.CapacityTotalContainer` indicates the total number of containers this Diego Cell can host.

The default threshold of 35% assumes Diego Cells are spread across three AZs.

## TAS Percentage of Diego Cells with Enough Disk to Stage Apps

Percentage of Diego Cells with at least one chunk of Disk space available to stage an application.

Insufficient free disk on Diego Cells prevents the staging or starting of apps or tasks, resulting in error messages such as
 
`ERR Failed to stage app: insufficient resources`

A Diego Cell will not stage an application if the Cell has less than 6 GB remaining.

**Troubleshooting**

1. Assign more resources to the Diego Cells or assign more Diego Cells.
2. Scale additional Diego Cells using Ops Manager.

## TAS Diego Cell Memory Chunks Available

Indicates the available Diego Cell memory, by number of available full chunks for a given deployment. Insufficient Diego Cell memory can prevent pushing and scaling apps.

The default chunk size used is 4 GB for this alert.

The strongest operational value of this metric is to understand a deployment’s average app size and monitor/alert on ensuring that at least some Cells have large enough capacity to accept standard app size pushes. For example, if pushing a 4 GB app, Diego would have trouble placing that app if there is no Diego Cell with sufficient capacity of 4 GB or greater.

**Troubleshooting**
1. Assign more resources to the Diego Cells or assign more Diego Cells.
2. Scale additional Diego Cells using Ops Manager.

## TAS Diego Cell Replication Bulk Sync Duration

Time that the Diego Cell Rep took to sync the ActualLRPs that it claimed with its actual garden containers. Sync times that are too high can indicate issues with the BBS.

The suggested starting point is ≥ 5 for the yellow threshold and ≥ 10 for the critical threshold, but you can tune your alerting values to your deployment based on historical data and adjust based on observations over time.

**Troubleshooting**
1. Investigate BBS logs for faults and errors. 
2. If one or more Diego cells appear problematic, pull the logs for those Diego cells and the BBS logs before contacting VMware Tanzu Support.

## TAS Diego Cell Route Emitter Sync Duration

Time that the active Route Emitter took to perform its synchronization pass.

Increases in this metric indicate that the Route Emitter may have trouble maintaining an accurate routing table to broadcast to the Gorouters. 
The suggested starting point is ≥ 5 for the yellow threshold and ≥ 10 for the critical threshold, but you can tune your alerting values to your deployment based on historical data and adjust based on observations over time.

If all or many jobs showing as impacted, there is likely an issue with Diego. 

**Troubleshooting**
1. Investigate the Route Emitter and Diego BBS logs for errors.
2. Verify that app routes are functional by making a request to an app, pushing an app and pinging it, or if applicable, checking that your smoke tests have passed. 

If one or a few jobs showing as impacted, there is likely a connectivity issue and the impacted job should be investigated further.

## TAS Garden Health Check Failed

The Diego Cell periodically checks its health against the Garden back end. 

* 0 means healthy
* 1 means unhealthy

If multiple Diego Cells are impacted, this can indicate a larger problem with Diego, and you should consider a more critical investigation.

If one Diego Cell is impacted: 

 * In a lower capacity environment, this situation could result in negative end-user impact if left unresolved.
 * In a higher capacity environment, it does not participate in auctions, but end-user impact is usually low. 

**Troubleshooting**
1. Investigate Diego Cell servers for faults and errors.
2. If a particular Diego Cell or Diego Cells appear problematic:
   1. Determine a time interval during which the metrics from the Diego Cell changed from healthy to unhealthy.
   2. Pull the logs that the Diego Cell generated over that interval. 

      The Diego Cell ID is the same as the BOSH instance ID.
   3. Pull the BBS logs over that same time interval.
   4. Contact VMware Tanzu Support.
3. If it's urgent and you cannot wait for VMware Tanzu Support, you can try to recreate the Diego Cell by running `bosh recreate`. 

    For information about the `bosh recreate` command syntax, see [Deployments](https://bosh.io/docs/cli-v2/#deployment-mgmt) under **Commands** in the BOSH documentation. 

    {% include warning.html content="Recreating a Diego Cell destroys its logs. To enable a root cause analysis of the Diego Cell problem, save the logs before running the `bosh recreate` command."%}

## TAS Gorouter File Descriptors

Number of file descriptors currently used by the Gorouter job. 

Indicates an impending issue with the Gorouter. 

Without proper mitigation, it is possible for an unresponsive app to eventually exhaust available Gorouter file descriptors and cause route starvation for other apps running in TAS. 
Under heavy load, this unmitigated situation can also result in the Gorouter losing its connection to NATS and all routes being pruned.

While a drop in `tas.gorouter.total_routes` or an increase in `tas.gorouter.ms_since_last_registry_update` helps to surface that the issue may already be occurring, alerting on `tas.gorouter.file_descriptors` indicates that such an issue is impending.

The Gorouter limits the number of file descriptors to 100,000 per job. Once the limit is met, the Gorouter is unable to establish any new connections. To reduce the risk of DDoS attacks, do one or both of the following:

* Within TAS for VMs, set **Maximum connections per back end** to define how many requests can be routed to any particular app instance. This prevents a single app from using all Gorouter connections. The value specified should be determined by the operator based on the use cases for that foundation.
* Add rate limiting at the load balancer level.

**Troubleshooting**
1. Identify which apps are requesting excessive connections and resolve the impacting issues with these apps.
2. If both of the above mitigation steps have not already been taken, try applying them.
3. Consider adding more Gorouter VM resources to increase the number of available file descriptors.

## TAS Gorouter High CPU Utilization

The Gorouter is experiencing average CPU utilization above 65% (warn) or 70% (severe).

High CPU utilization of the Gorouter VMs can increase latency and cause throughput and requests per second to level-off. As a best practice, keep the CPU utilization within a maximum range of 60-70% for best Gorouter performance.

**Troubleshooting**

* Scale the Gorouters horizontally or vertically by editing the Router VM in the **Resource Config** pane of the **Tanzu Application Service** tile.

## TAS Gorouter Time Since Last Route Register Received

Time since the last route register was received, emitted per Gorouter instance. 

Indicates if routes are not being registered to apps correctly.

**Troubleshooting**

1. Search the Gorouter and Route Emitter logs for connection issues to NATS.
2. Check the BOSH logs to see if the NATS, Gorouter, or Route Emitter VMs are failing.
3. Look more broadly at the health of all VMs, particularly Diego-related VMs.
4. If the problem persists, pull the Gorouter and Route Emitter logs and contact VMware Tanzu Support to say there are consistently long delays in route registry.


## TAS Gorouter VM Health

Measures the state of the processes running on the Gorouter VM. 
* 1 means the system is healthy
* 0 means the system is unhealthy

The Tanzu Application Service Gorouter being down prevents users from interacting with applications and services on the
platform.

**Troubleshooting**

1. In you TAS integration, on the **Dashboards** tab, click the **TAS: Router** dashboard.
2. Review detailed Gorouter metrics and logs for details on the cause of the error.

## TAS Locks Held by Auctioneer

Whether an Auctioneer instance holds the expected Auctioneer lock (in Locket). 

* 1 means the active Auctioneer holds the lock
* 0 means the lock was lost

This metric is complimentary to Active Locks, and it offers an Auctioneer-level version of the Locket metrics. Although it is emitted per Auctioneer instance, only 1 active lock is held by Auctioneer. Therefore, the expected value is 1. The metric can occasionally be 0 when the Auctioneer instances are performing a leader transition, but a prolonged value of 0 indicates an issue with Auctioneer.

**Troubleshooting**
1. Run `monit status` on the Diego Database VM to check for failing processes.
2. If there are no failing processes, then review the logs for Auctioneer. 

   Recent logs for Auctioneer should show all but one of its instances are currently waiting on locks, and the active Auctioneer should show a record of when it last attempted to execute work. This attempt should correspond to app development activity, such as `cf push`.
3. If you can't resolve the issue, pull logs from the Diego BBS and Auctioneer VMs, which includes the Locket service component logs, and contact VMware Tanzu Support.

## TAS Locks Held by BBS

Whether a BBS instance holds the expected BBS lock (in Locket). 
* 1 means the active BBS server holds the lock
* 0 means the lock was lost

This metric is complimentary to Active Locks, and it offers a BBS-level version of the Locket metrics. Although it is emitted per BBS instance, only 1 active lock is held by BBS. 
Therefore, the expected value is 1. The metric can occasionally be 0 when the BBS instances are performing a leader transition, but a prolonged value of 0 indicates an issue with BBS.

**Troubleshooting**
1. Run `monit status` on the Diego database VM to check for failing processes.
2. If there are no failing processes, then review the logs for BBS.
   * A healthy BBS shows obvious activity around starting or claiming LRPs.
   * The BBS sends work to the Auctioneer, an unhealthy BBS leads to the Auctioneer showing minimal or no activity. 
     
     The BBS sends work to the Auctioneer.
3. If you are unable to resolve the issue, pull logs from the Diego BBS, which include the Locket service component logs, and contact VMware Tanzu Support.

## TAS Low Proxy Points Received

Measures the total PPS received by the Wavefront proxy.

**Troubleshooting**

1. Check the health of the `wavefront_proxy` VM on the `wavefront-nozzle` deployment. Inspect the proxy logs for
   the `wavefront_proxy` job.
2. Check the health of the `telegraf_agent` VM on the `wavefront-nozzle` deployment. Inspect the Telegraf logs from
   the `telegraf_agent` job.

## TAS MySQL Status

The TAS backing database is used for persistent data storage by several TAS components. This alert uses the metric from the SQL database used by system components, not from the MySQL service used by applications. TAS components that use system databases include the Cloud Controller, Diego Brain, Gorouter, and User Authorization and Authentication (UAA)
server. See [TAS Components](https://docs.pivotal.io/application-service/concepts/architecture/index.html) for details.

* 1 indicates that TAS backing database is available
* 0 indicates that TAS backing database is unavailable

**Troubleshooting**

1. Inspect the troubleshooting metrics on the **TAS: Platform MySQL** dashboard of the TAS integration.
2. Check the MySQL Server logs for errors. 


## TAS Ops Manager Availability

A result code of a poll to the Ops Manager URL.

A result code of zero indicates a successful poll. For a description of the error codes see
[Telegraf HTTP Response Input Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/http_response#result--result_code).

**Troubleshooting**
1. Check whether the affected Ops Manager is running.
2. Check your foundation networking, capacity, and VM health.

## TAS Telegraf Gatherer and Exporter Scrape Errors

The TAS integration uses Telegraf and the Prometheus and HTTP input plugins to gather metrics. If any of these fail, the counter `tas.observability.telegraf.internal_agent.gather_errors` increases. By default, an alert fires if the metric has been increasing for 10 minutes.

**Troubleshooting**
* Inspect the Telegraf logs from the `telegraf_agent` job on the `wavefront-nozzle` deployment.

## TAS UAA VM Health

Measures the state of the processes running on the UAA VM. 

* 1 means the system is healthy
* 0 means the system is unhealthy

If UAA is down, developers and operators cannot authenticate to access the platform.

**Troubleshooting**

1. Check the UAA logs.
2. View UAA on the TAS Job Details page.
3. Scale the UAA VMs in BOSH.

See the [UAA Documentation](https://docs.pivotal.io/application-service/uaa-overview.html) for details.

## TAS UAA Latency is Elevated
Time in milliseconds that UAA took to process a request that the Gorouter sent to UAA endpoints.

Indicates how responsive UAA has been to requests sent from the Gorouter. Some operations may take longer to process, such as creating bulk users and groups. It is important to correlate latency observed with the endpoint and evaluate this data in the context of overall historical latency from that endpoint. Unusual spikes in latency could indicate the need to scale UAA VMs.

This metric is emitted only for the routers serving the UAA system component and is not emitted per isolation segment even if you are using isolated routers.

**Troubleshooting**

1. A quick way to confirm user-impacting behavior is to try `login.run.pivotal.io` and see if you receive a delayed response.
2. Inspect which endpoints the slow requests are hitting. 

    Use historical data to determine if the latency is unusual for that endpoint. For more information about UAA, see the [UAA API documentation](https://docs.cloudfoundry.org/api/uaa/).
3. Restart UAA instances by tunning the command: 
   ```
   bosh --environment prod --deployment cf-cfapps-io2 restart uaa
   ``` 
   Restarting the instances means that all active sessions will be lost, which will cause users to have to log in again.
4. If it appears that UAA needs to be scaled due to ongoing traffic congestion, confirm that CPU utilization would benefit from scaling. 
    
   UAA suggested maximum CPU utilization is 80-90%.
5. Resolve high utilization by scaling UAA VMs horizontally. To scale UAA, navigate to the **Resource Config** pane of the TAS for VMs tile and edit the number of your UAA VM instances.
