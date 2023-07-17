---
title: Cassandra Integration
tags: [integrations list]
permalink: cassandra.html
summary: Learn about the Cassandra Integration.
---

This page provides an overview of what you can do with the Cassandra integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Cassandra integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Cassandra** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Cassandra Integration

Apache Cassandra is a free and open-source distributed NoSQL database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. Cassandra offers robust support for clusters spanning multiple datacenters, with asynchronous masterless replication allowing low latency operations for all clients.

1. **Cassandra**: This integration installs and configures Telegraf Jolokia2 input plugin to send Cassandra metrics to Operations for Applications. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html). Collecting Cassandra metric requires the installation of Jolokia java-jvm agent. [Jolokia](https://jolokia.org/index.html) is a JMX-HTTP bridge giving an alternative to JSR-160 connectors. It is an agent based approach with support for many platforms. The Cassandra integration collects Cassandra / JVM metrics exposed as MBean's attributes through jolokia REST endpoint.

2. **Cassandra on Kubernetes**: This integration uses K8ssandra which is a cloud native distribution of Apache Cassandra® that runs on Kubernetes. K8ssandra provides an ecosystem of tools to provide richer data APIs and automated operations alongside Cassandra. This explains the configuration of Kubernetes Metrics Collector to scrape Cassandra metrics using Prometheus.

In addition to setting up the metrics flow, this integration also installs dashboards:
* Cassandra
* Cassandra on Kubernetes

Here's a dashboard displaying Cassandra metrics on Kubernetes:

{% include image.md src="images/cassandra_dashboard.png" width="80" %}







## Cassandra
  

|Metric Name|Description|
| :--- | :--- |
|cassandra2.Client.connectedNativeClients.Value |The total number of client connections.|
|cassandra2.ThreadPools.ActiveTasks.Value|The number of active tasks in the threadpool.|
|cassandra2.ThreadPools.PendingTasks.Value|The number of pending tasks in the threadpool.|
|cassandra2.Table.LiveDiskSpaceUsed.Count|Disk space used by the Sorted String Tables (in bytes).|
|cassandra2.javaMemory.HeapMemoryUsage.used|The amount of used memory in bytes.|
|cassandra2.javaMemory.HeapMemoryUsage.max|The maximum amount of memory in bytes that can be used for memory management.|
|cassandra2.CommitLog.PendingTasks.Value|The number of commit log messages written but yet to be synched.|
|cassandra2.Compaction.BytesCompacted.Count|The total number of bytes compacted since server start or restart.|
|cassandra2.Storage.Load.Count|The size of disk data that a node manages.|
|cassandra2.Storage.Exceptions.Count|The number of internal exceptions caught.|
|cassandra2.Cache.Hits.Count|The total number of cache hits.|
|cassandra2.Cache.Requests.Count|The total number of cache requests.|
|cassandra2.Cache.Size.Value|The total size of occupied cache in bytes.|
|cassandra2.Cache.Entries.Value|The total number of cache entries.|
|cassandra2.ClientRequest.Failures.Count|The number of transaction failures encountered.|
|cassandra2.ClientRequest.Timeouts.Count|The number of timeouts encountered.|
|cassandra2.ClientRequest.Latency.50thPercentile|Median client latency.|
|cassandra2.ClientRequest.Unavailables.Count|The number of unavailable exceptions encountered.|
|cassandra2.Table.ReadLatency.50thPercentile|The local read latency for the table.|
|cassandra2.Table.WriteLatency.50thPercentile|The local write latency for the table.|


## Cassandra on Kubernetes
  

|Metric Name|Description|
| :--- | :--- |
|cassandra.mcac.client.connected.native.clients.value|The total number of client connections.|
|cassandra.mcac.thread.pools.active.tasks.value|The number of active tasks in the threadpool.|
|cassandra.mcac.thread.pools.pending.tasks.value|The number of pending tasks in the threadpool.|
|cassandra.mcac.thread.pools.total.blocked.tasks.total.value|The total number of blocked tasks in the threadpool.|
|cassandra.mcac.client.request.timeouts.total.value|The total number of timeouts encountered.|
|cassandra.mcac.compaction.completed.tasks.value|The total number of compaction completed tasks.|
|cassandra.mcac.table.live.disk.space.used.total.value|Disk space used by the Sorted String Tables (in bytes).|
|cassandra.mcac.table.live.ss.table.count.value|The total number of Sorted String Tables.|
|cassandra.mcac.storage.total.hints.in.progress.total.value|The number of hints currently attempting to be sent.|
|cassandra.mcac.storage.load.total.value|The size of disk data that a node manages.|
|cassandra.mcac.storage.exceptions.total.value|The number of internal exceptions caught.|
|cassandra.mcac.table.pending.compactions.value|The number of pending compactions for the table.|
|cassandra.mcac.dropped.message.dropped.total.value|The total number of dropped messages.|
|cassandra.mcac.cache.hits.total.value|The total number of cache hits.|
|cassandra.mcac.cache.requests.total.value|The total number of cache requests.|
|cassandra.mcac.cache.size.value|The total size of occupied cache in bytes.|
|cassandra.mcac.cache.entries.value|The total number of cache entries.|
|cassandra.mcac.client.request.failures.total.value|The number of transaction failures encountered.|
|cassandra.mcac.client.request.timeouts.total.value|The number of timeouts encountered.|
|cassandra.mcac.client.request.unavailables.total.value|The number of unavailable exceptions encountered.|
|cassandra.mcac.client.request.unfinished.commit.total.value|The number of unfinished commits encountered.|
|cassandra.mcac.client.request.contention.histogram.total.value|The number of request contentions encountered.|
|cassandra.mcac.client.request.condition.not.met.total.value|The number of transaction preconditions that did not match current values.|
|cassandra.mcac.client.request.latency.total.value|The client request latency.|
|cassandra.mcac.client.request.discarded.total.value|The number of discarded requests.|
|cassandra.mcac.table.read.latency.value|The transaction read latency.|
|cassandra.mcac.table.write.latency.value|The transaction write latency.|
|cassandra.mcac.jvm.memory.used.value|The amount of used memory in bytes.|
|cassandra.mcac.jvm.gc.time.value|The approximate accumulated collection elapsed time in milliseconds.|
|cassandra.mcac.jvm.buffer.used.value|The amount of used memory buffer in bytes.|
|cassandra.mcac.jvm.buffer.capacity.value|The capacity of memory buffer.|
|cassandra.stargate.client.request.failures.total.value|The number of request failures encountered for stargate.|
|cassandra.stargate.client.request.timeouts.total.value|The number of request timeouts encountered for stargate.|
|cassandra.stargate.client.request.unavailables.total.value|The number of unavailable exceptions encountered by stargate.|
|cassandra.stargate.client.request.unfinished.commit.total.value|The number of unfinished commits encountered by stargate.|
|cassandra.stargate.client.request.latency.total.value|The client request latency by stargate.|
|cassandra.jvm.memory.heap.used.value|The amount of used memory in bytes by stargate.|
|cassandra.jvm.memory.heap.max.value|The maximum amount of memory in bytes that can be used for memory management by stargate.|
|cassandra.stargate.client.request.contention.histogran.total.value|The number of request contentions encountered by stargate.|
|cassandra.stargate.client.request.condition.not.met.total.value|The number of request preconditions that did not match the current values by stargate.|

