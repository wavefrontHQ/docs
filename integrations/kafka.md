---
title: Kafka Integration
tags: [integrations list]
permalink: kafka.html
summary: Learn about the Wavefront Kafka Integration.
---
## Kafka Integration

Kafka is a distributed streaming platform. By setting up this integration, you can send Kafka metrics into Wavefront.

1. **Apache Kafka**: This explains the installation and configuration of Telegraf to send Kafka metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

2. **Kafka on Kubernetes**: This explains the configuration of Wavefront Collector for Kubernetes to scrape Kafka metrics using auto-discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
  * Apache Kafka
  * Kafka on Kubernetes

Here's the screenshot of Kafka on Kubernetes dashboard displaying Kafka metrics:

{% include image.md src="images/kafka_k8s_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Kafka Setup



Use the instructions on this page for monitoring:
  * Apache Kafka - Standalone
  * Kafka on Kubernetes

## Apache Kafka

### Step 1. Install the Telegraf Agent

This integration uses the Jolokia input plugin for Telegraf to get the Kafka metrics via JMX. If you've already installed Telegraf on your servers, you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Download and Set up Jolokia
Jolokia is a JVM agent that exposes JMX data as JSON on an HTTP port (8778 by default).
1. Download the latest version of the Jolokia JVM-Agent from [here](https://jolokia.org/download.html).
2. Rename downloaded Jar file to `jolokia-agent.jar`.
3. Save jolokia-agent.jar on your Kafka server in `/opt/kafka/libs` or any location accessible to Kafka.
4. Configure Kafka to use Jolokia:
    1. Add the following snippet to `kafka-server-start.sh`:{% raw %}
    ```
    export JMX_PORT=9999
    export RMI_HOSTNAME=KAFKA_SERVER_IP_ADDRESS
    export KAFKA_JMX_OPTS="-javaagent:/opt/kafka/libs/jolokia-agent.jar=port=8778,host=$RMI_HOSTNAME -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=$RMI_HOSTNAME -Dcom.sun.management.jmxremote.rmi.port=$JMX_PORT"
    ```
{% endraw %}
    2. Restart the Kafka service.
    3. Verify that you can access Jolokia on port 8778 by running:{% raw %}
    ```
    curl http://KAFKA_SERVER_IP_ADDRESS:8778/jolokia/version
    ```
{% endraw %}
    Jolokia is working if you receive a non-empty JSON response with the Kafka metrics.

### Step 3. Configure Jolokia Input Plugin

Create a file called `jolokia-kafka.conf` in `/etc/telegraf/telegraf.d` and enter the following:
{% raw %}
```
## Read JMX metrics through Jolokia
 [[inputs.jolokia2_agent]]
   ## An array of Kafka servers URI to gather stats.
   urls = ["http://KAFKA_SERVER_IP_ADDRESS:8778/jolokia"]
   name_prefix = "kafka."

   ## List of metrics collected on above servers
   ## Each metric consists of a name, a jmx path and
   ## optionally, a list of fields to collect.
   ## This collects all heap memory usage metrics.
   [[inputs.jolokia2_agent.metric]]
     name = "heap_memory_usage"
     mbean  = "java.lang:type=Memory"
     paths = ["HeapMemoryUsage"]

   ## This collects thread counts metrics.
   [[inputs.jolokia2_agent.metric]]
     name = "thread_count"
     mbean  = "java.lang:type=Threading"
     paths = ["TotalStartedThreadCount","ThreadCount","DaemonThreadCount","PeakThreadCount"]

   ## This collects garbage collection metrics.
   [[inputs.jolokia2_agent.metric]]
     name = "garbage_collector"
     mbean  = "java.lang:type=GarbageCollector,name=*"
     paths = ["CollectionCount","CollectionTime"]
     tag_keys = ["name"]

   # Kafka Server Broker Topic Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "server_brokertopics_messagesinpersec"
     mbean  = "kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec"
   [[inputs.jolokia2_agent.metric]]
     name = "server_brokertopics_bytesinpersec"
     mbean  = "kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec"
   [[inputs.jolokia2_agent.metric]]
     name = "server_brokertopics_bytesoutpersec"
     mbean  = "kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec"

   # Kafka Server Request Handler Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "server_requesthandler_avgidlepct"
     mbean  = "kafka.server:name=RequestHandlerAvgIdlePercent,type=KafkaRequestHandlerPool"

   # Kafka Server Delayed Operation Purgatory Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "server_delayedoperationpugatory_fetch"
     mbean  = "kafka.server:type=DelayedOperationPurgatory,name=PurgatorySize,delayedOperation=Fetch"
   [[inputs.jolokia2_agent.metric]]
     name = "server_delayedoperationpugatory_produce"
     mbean  = "kafka.server:type=DelayedOperationPurgatory,name=PurgatorySize,delayedOperation=Produce"

   # Kafka Server Replica Fetcher Manager Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "server_replicafetchmanager.maxlag"
     mbean  = "kafka.server:type=ReplicaFetcherManager,name=MaxLag,clientId=Replica"

   # Kafka Server Replica Manager Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "server_replicamanager_underreplicated"
     mbean  = "kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions"
   [[inputs.jolokia2_agent.metric]]
     name = "server_replicamanager_partitioncount"
     mbean  = "kafka.server:type=ReplicaManager,name=PartitionCount"
   [[inputs.jolokia2_agent.metric]]
     name = "server_replicamanager_leadercount"
     mbean  = "kafka.server:type=ReplicaManager,name=LeaderCount"
   [[inputs.jolokia2_agent.metric]]
     name = "server_replicamanager_isrshrinkspersec"
     mbean  = "kafka.server:type=ReplicaManager,name=IsrShrinksPerSec"
   [[inputs.jolokia2_agent.metric]]
     name = "server_replicamanager_isrexpandspersec"
     mbean  = "kafka.server:type=ReplicaManager,name=IsrExpandsPerSec"

   # Kafka Network Request Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "network_requestmetrics_requests_fetch_consumer"
     mbean  = "kafka.network:type=RequestMetrics,name=RequestsPerSec,request=FetchConsumer"
   [[inputs.jolokia2_agent.metric]]
     name = "network_requestmetrics_requests_fetch_follower"
     mbean  = "kafka.network:type=RequestMetrics,name=RequestsPerSec,request=FetchFollower"
   [[inputs.jolokia2_agent.metric]]
     name = "network_requestmetrics_requests_produce"
     mbean  = "kafka.network:type=RequestMetrics,name=RequestsPerSec,request=Produce"
   [[inputs.jolokia2_agent.metric]]
     name = "network_requestmetrics_totaltime_fetch_consumer"
     mbean  = "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchConsumer"
   [[inputs.jolokia2_agent.metric]]
     name = "network_requestmetrics_totaltime_fetch_follower"
     mbean  = "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchFollower"
   [[inputs.jolokia2_agent.metric]]
     name = "network_requestmetrics_totaltime_produce"
     mbean  = "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=Produce"

   # Kafka Network Processor Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "network_processor_avgidlepct"
     mbean  = "kafka.network:name=NetworkProcessorAvgIdlePercent,type=SocketServer"

   # Kafka Controller Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "controller_activecontrollers"
     mbean  = "kafka.controller:type=KafkaController,name=ActiveControllerCount"
   [[inputs.jolokia2_agent.metric]]
     name = "controller_offlinepartitions"
     mbean  = "kafka.controller:type=KafkaController,name=OfflinePartitionsCount"
   [[inputs.jolokia2_agent.metric]]
     name = "controller_stats_leaderelectionrateandtime"
     mbean  = "kafka.controller:type=ControllerStats,name=LeaderElectionRateAndTimeMs"
   [[inputs.jolokia2_agent.metric]]
     name = "controller_stats_uncleanleaderelections"
     mbean  = "kafka.controller:type=ControllerStats,name=UncleanLeaderElectionsPerSec"

   # Zookeeper Metrics
   [[inputs.jolokia2_agent.metric]]
     name = "zookeeper_disconnects"
     mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperDisconnectsPerSec"
     paths = ["Count","OneMinuteRate","FiveMinuteRate","FifteenMinuteRate","MeanRate"]
   [[inputs.jolokia2_agent.metric]]
     name = "zookeeper_sync_connects"
     mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperSyncConnectsPerSec"
     paths = ["Count","OneMinuteRate","FiveMinuteRate","FifteenMinuteRate","MeanRate"]
   [[inputs.jolokia2_agent.metric]]
     name = "zookeeper_auth_failures"
     mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperAuthFailuresPerSec"
     paths = ["Count","OneMinuteRate","FiveMinuteRate","FifteenMinuteRate","MeanRate"]
   [[inputs.jolokia2_agent.metric]]
     name = "zookeeper_readonly_connects"
     mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperReadOnlyConnectsPerSec"
     paths = ["Count","OneMinuteRate","FiveMinuteRate","FifteenMinuteRate","MeanRate"]
   [[inputs.jolokia2_agent.metric]]
     name = "zookeeper_authentications"
     mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperSaslAuthenticationsPerSec"
     paths = ["Count","OneMinuteRate","FiveMinuteRate","FifteenMinuteRate","MeanRate"]
   [[inputs.jolokia2_agent.metric]]
     name = "zookeeper_expires"
     mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperExpiresPerSec"
     paths = ["Count","OneMinuteRate","FiveMinuteRate","FifteenMinuteRate","MeanRate"]
```
{% endraw %}
**Note:** Replace `KAFKA_SERVER_IP_ADDRESS` with the Kafka server IP address.

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.

## Kafka on Kubernetes

**Note**: These instructions are for monitoring Bitnami Kafka.

**Prerequisite**:

Make sure that Bitnami Kafka with `bitnami/kafka-exporter` and `bitnami/jmx-exporter` are deployed on your cluster.

You can use the following command to deploy Bitnami Kafka with kafka-exporter and jmx-exporter:{% raw %}
```
helm repo add bitnami https://charts.bitnami.com/bitnami

helm install <KAFKA_CLUSTER_NAME> --set metrics.kafka.enabled=true --set metrics.kafka.image.registry=docker.io --set metrics.kafka.image.repository=bitnami/kafka-exporter --set metrics.kafka.image.tag=1.3.1-debian-10-r64 --set metrics.kafka.image.pullPolicy=IfNotPresent bitnami/kafka --set metrics.jmx.enabled=true --set metrics.jmx.image.registry=docker.io --set metrics.jmx.image.repository=bitnami/jmx-exporter --set metrics.jmx.image.tag=0.16.1-debian-10-r17 --set metrics.jmx.image.pullPolicy=IfNotPresent
```
{% endraw %}

### Step 1. Update the Wavefront Collector ConfigMap

If you do not have the Wavefront Collector for Kubernetes installed on your Kubernetes cluster, follow these instructions to add it to your cluster by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install). You can check the status of Wavefront Collector and Proxy if you are already monitoring the Kubernetes cluster [here](../kubernetes/setup).

Edit the Wavefront Collector ConfigMap at runtime, and under `auto discovery` add the following snippet:{% raw %}
```
kubectl edit configmap collector-config -n wavefront-collector
```
{% endraw %}
kafka-exporter and jmx-exporter config:{% raw %}
```
        ## auto-discover kafka-exporter
      - name: kafka-discovery
        type: prometheus
        selectors:
          images:
            - '*bitnami/kafka-exporter*'
        port: 9308
        path: /metrics
        scheme: http
        prefix: kafka.
        filters:
          metricDenyList:
          - 'kafka.kafka.*'

        ## auto-discover jmx exporter
      - name: kafka-jmx-discovery
        type: prometheus
        selectors:
          images:
            - '*bitnami/jmx-exporter*'
        port: 5556
        path: /metrics
        scheme: http
        prefix: kafkajmx.
```
{% endraw %}






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

