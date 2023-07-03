---
title: Kafka Integration
tags: [integrations list]
permalink: kafka.html
summary: Learn about the Kafka Integration.
---

This page provides an overview of what you can do with the Kafka integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Kafka integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Kafka** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Kafka Integration

Kafka is a distributed streaming platform. By setting up this integration, you can send Kafka metrics into Operations for Applications.

1. **Apache Kafka**: This explains the installation and configuration of Telegraf to send Kafka metrics into Operations for Applications. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

2. **Kafka on Kubernetes**: This explains the configuration of Kubernetes Metrics Collector to scrape Kafka metrics using auto-discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
  * Apache Kafka
  * Kafka on Kubernetes

Here's the screenshot of Kafka on Kubernetes dashboard displaying Kafka metrics:

{% include image.md src="images/kafka_k8s_dashboard.png" width="80" %}







## Metrics
  

|Metric Name|Description|
| :--- | :--- |
|kafka.controller.activecontrollers.Value||
|kafka.controller.offlinepartitions.Value||
|kafka.controller.stats.leaderelectionrateandtime.*|Statistics: 50thPercentile, 75thPercentile, 95thPercentile, 98thPercentile, 999thPercentile, 99thPercentile, Count, FifteenMinuteRate, FiveMinuteRate, Max, Mean, MeanRate, Min, OneMinuteRate, StdDev|
|kafka.controller.stats.uncleanleaderelections.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.garbage.collector.CollectionCount||
|kafka.garbage.collector.CollectionTime||
|kafka.heap.memory.usage.HeapMemoryUsage.*|Statistics: committed, init, max, used|
|kafka.network.processor.avgidlepct.Value||
|kafka.network.requestmetrics.totaltime.fetch.consumer.*|Statistics: 50thPercentile, 75thPercentile, 95thPercentile, 98thPercentile, 999thPercentile, 99thPercentile, Count, Max, Mean, Min, StdDev|
|kafka.network.requestmetrics.totaltime.fetch.follower.*|Statistics: 50thPercentile, 75thPercentile, 95thPercentile, 98thPercentile, 999thPercentile, 99thPercentile, Count, Max, Mean, Min, StdDev|
|kafka.network.requestmetrics.totaltime.produce.*|Statistics: 50thPercentile, 75thPercentile, 95thPercentile, 98thPercentile, 999thPercentile, 99thPercentile, Count, Max, Mean, Min, StdDev|
|kafka.server.brokertopics.bytesinpersec.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.server.brokertopics.bytesoutpersec.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.server.brokertopics.messagesinpersec.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.server.delayedoperationpugatory.fetch.Value||
|kafka.server.delayedoperationpugatory.produce.Value||
|kafka.server.replicafetchmanager.maxlag.Value||
|kafka.server.replicamanager.isrexpandspersec.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.server.replicamanager.isrshrinkspersec.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.server.replicamanager.leadercount.Value||
|kafka.server.replicamanager.partitioncount.Value||
|kafka.server.replicamanager.underreplicated.Value||
|kafka.server.requesthandler.avgidlepct.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.thread.count.DaemonThreadCount||
|kafka.thread.count.PeakThreadCount||
|kafka.thread.count.ThreadCount||
|kafka.thread.count.TotalStartedThreadCount||
|kafka.zookeeper.auth.failures.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.zookeeper.authentications.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.zookeeper.disconnects.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.zookeeper.expires.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.zookeeper.readonly.connects.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|
|kafka.zookeeper.sync.connects.*|Statistics: Count, FifteenMinuteRate, FiveMinuteRate, MeanRate, OneMinuteRate|

