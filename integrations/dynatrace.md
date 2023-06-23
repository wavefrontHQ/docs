---
title: Dynatrace Integration
tags: [integrations list]
permalink: dynatrace.html
summary: Learn about the Dynatrace Integration.
---

This page provides an overview of what you can do with the Dynatrace integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Dynatrace integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Dynatrace** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Dynatrace Integration

Dynatrace is an AI-powered, full-stack, automated performance management solution. This integration collects the metrics from a Dynatrace SaaS environment and sends them to Wavefront.

## Dynatrace Integration



### Add a Dynatrace Integration

The Dynatrace integration is an AI-powered, full-stack, automated performance management solution. This integration collects the metrics from a Dynatrace SaaS environment and sends them to VMware Aria Operations for Applications (formerly known as Tanzu Observability by Wavefront).

**Limitations**

In this initial release of the Dynatrace integration, we have the following limitations:

* Billing metrics are not allowed and fetched with this release.
* If the point tags are with Annotations Key Length Limit greater than 64, the metrics associated with the corresponding point tag will be dropped.
* For metrics with the resolution other than the value of 1 minute (`1m`), there could be data loss as these metrics might have different resolution, such as 5 minutes or 1 hour.


**Obtain the Environment ID and Generate an API Token**

To set up the Dynatrace integration, you must provide the environment ID and a valid API token. 

1. Log in to your Dynatrace account.
2. Click the user icon in the header, and from the context menu, select your user name.
3. Under the **Environment access and settings** section, click the name of the environment that you want to monitor.
4. Copy the **Environment ID** shown in the URL of the form https://<code>your-environment-id</code>.live.dynatrace.com and paste it in a text file. 
5. Click **Access Tokens** in the navigation menu.
6. In the **Access Tokens** page, click the **Generate new token** button.
7. In the **Token name** text box, enter the name for the API token.
8. From the list of scopes, select **Read metrics (metrics.read)** and **Read entities (entities.read)**, and click the **Generate** button.
9. Copy the generated token by clicking the **Copy** button and paste it in a text file.

**Register the Dynatrace Integration**

After you copy the environment ID and the generated API token, follow these steps:

1. In the **Name** text box, enter a meaningful name.
2. In the **Environment ID** text box, provide the environment ID.
3. In the **API Token** text box, provide the API token.
  
   The API Token is securely stored and never exposed except for read-only access to fetch data from the Dynatrace Operations server.
   
4. (Optional) In the **Metric Allow List** text box, add metrics to an allow list by entering a regular expression. For example:
    * To fetch only Apache Tomcat and Oracle WebLogic metrics, enter: <code>^dynatrace.(.*)(tomcat|weblogic).*$</code>
    * To fetch only Kubernetes metrics, enter: <code>^dynatrace.(.*)(cloud.kubernetes).*$</code>
    * To fetch only host performance metrics, enter: <code>^dynatrace.(.*)(host).*$</code>
    * To fetch only Synthetic metrics, enter: <code>^dynatrace.(.*)(synthetic).*$</code>
5. (Optional) Change the **Service Refresh Rate**. The default is `5` minutes.
6. Click **Register**.





## Metrics

See [Dynatrace documentation](https://www.dynatrace.com/support/help/how-to-use-dynatrace/metrics/built-in-metrics/) for all supported Metrics and Metric descriptions.

|Metric Name|Description|
| :--- | :--- |
|dynatrace.builtin.cloud.kubernetes.cluster.cores_millicores|Total allocatable CPU cores per Kubernetes cluster.|
|dynatrace.builtin.cloud.kubernetes.cluster.memoryLimit_byte|Total memory limit per Kubernetes cluster.|
|dynatrace.builtin.cloud.kubernetes.cluster.nodes_count|Total nodes per Kubernetes cluster.|
|dynatrace.builtin.cloud.kubernetes.node.cores_millicores|Total allocatable CPU cores per Kubernetes node.|
|dynatrace.builtin.cloud.kubernetes.node.memory_byte|Total allocatable memory per Kubernetes node.|
|dynatrace.builtin.cloud.kubernetes.pod.containers_count|Number of containers per workload, split by container state.|
|dynatrace.builtin.cloud.kubernetes.workload.pods_count|Number of pods per workload and phase.|
|dynatrace.builtin.containers.cpu.limit_millicores|CPU resource limit per container in millicores.|
|dynatrace.builtin.containers.cpu.logicalCores|Number of logical CPU cores of the host.|
|dynatrace.builtin.containers.memory.limitPercent|Containers: Memory limit, % of physical memory.|
|dynatrace.builtin.containers.memory.usagePercent|Containers: Memory usage, % of limit.|
|dynatrace.builtin.host.cpu.idle_percent|Average CPU idle time over the last period.|
|dynatrace.builtin.host.cpu.load_ratio|System load.|
|dynatrace.builtin.host.availability_percent|Host availability %|
|dynatrace.builtin.host.cpu.steal_percent|Average CPU steal time over the last period.|
|dynatrace.builtin.host.cpu.system_percent|Average CPU system time over the last period.|
|dynatrace.builtin.host.disk.avail_byte|Amount of disk available.|
|dynatrace.builtin.host.disk.bytesRead_bytepersecond|Disk read bytes per second.|
|dynatrace.builtin.host.disk.inodesTotal_count|Amount of inodes.|
|dynatrace.builtin.host.dns.errorCount|Number of DNS errors by type.|
|dynatrace.builtin.host.mem.swap.avail_byte|Amount of swap available.|
|dynatrace.builtin.host.mem.total_byte|Amount of total memory.|
|dynatrace.builtin.host.net.bytesRx_bytepersecond|Host bytes received.|
|dynatrace.builtin.host.net.bytesTx_bytepersecond|Host bytes sent.|
|dynatrace.builtin.host.osProcessStats.osProcessCount|Number of processes running on host.|
|dynatrace.builtin.host.osProcessStats.pgiCount|Number of PGIs present on host, includes PGIs not reported to cluster.|
|dynatrace.builtin.pgi.availability_percent|PGI availability %|
|dynatrace.builtin.queue.incoming_requests_count|Queue incoming requests.|
|dynatrace.builtin.queue.outgoing_requests_count|Queue outgoing requests.|
|dynatrace.builtin.service.cpu.time_microsecond|Service CPU time.|
|dynatrace.builtin.service.dbconnections.success_count|Successful connections.|
|dynatrace.builtin.service.errors.fivexx.rate_percent|Failure rate (HTTP 5xx errors).|
|dynatrace.builtin.service.errors.fourxx.successCount|Number of calls without HTTP 4xx errors.|
|dynatrace.builtin.tech.customDevice.count|Custom Device Count.|
|dynatrace.builtin.tech.jvm.memory.gc.activationCount|Garbage collection total activation count.|
|dynatrace.builtin.tech.jvm.memory.runtime.free_byte|JVM runtime free memory.|
|dynatrace.builtin.tech.webserver.threads.idle_count|Idle worker thread count.|
|dynatrace.builtin.synthetic.browser.errorCodes_count|Error details (by error code) [browser monitor].|
|dynatrace.builtin.synthetic.browser.total_count|Total executions count [browser monitor].|
|dynatrace.builtin.synthetic.browser.total.geo_count|Total executions count (by geolocation) [browser monitor].|

