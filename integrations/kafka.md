---
title: Kafka Integration
tags: [integrations list]
permalink: kafka.html
summary: Learn about the Wavefront Kafka Integration.
---
## Apache Kafka Integration

Apache Kafka is a distributed streaming platform. This integration installs and configures Telegraf to send Kafka metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the broker section of a dashboard displaying Kafka metrics:

{% include image.md src="images/kafka_broker.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Kafka Setup



### Step 1. Install the Telegraf Agent

This integration uses the Jolokia input plugin for Telegraf to get the Kafka metrics via JMX. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 2. Download and Set up Jolokia
Jolokia is a JVM agent that exposes JMX data as JSON on an HTTP port (8778 by default).
1. Download the **JVM-Agent** artifact from [Jolokia - Download](https://jolokia.org/download.html). 1.3.6 is the current version as of this writing.
1. Save Jolokia on your Kafka broker nodes in `/opt/kafka/libs` or any location accessible to Kafka.
1. Configure Kafka to use Jolokia:
    1. Add the following snippet to `kafka-server-start.sh`:{% raw %}
    ```
    export JMX_PORT=9999
    export RMI_HOSTNAME=ENTER_KAFKA_SERVER_IP_ADDRESS
    export KAFKA_JMX_OPTS="-javaagent:/opt/kafka/libs/jolokia-jvm-1.3.6-agent.jar  -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=$RMI_HOSTNAME -Dcom.sun.management.jmxremote.rmi.port=$JMX_PORT"
    ```
    1. Restart the Kafka broker node.
    1. Verify that you can access Jolokia on port 8778 by running:
    ```
    curl http://KAFKA_SERVER_IP_ADDRESS:8778/jolokia/
    ```
    Jolokia is working if you receive a non-empty JSON response with the Kafka metrics.

### Step 3. Configure Jolokia Input Plugin

Create a file called `jolokia-kafka.conf` in `/etc/telegraf/telegraf.d` and enter the following:

```
## Read JMX metrics through Jolokia
 [[inputs.jolokia]]

   name_override = "kafka"

   context = "/jolokia/list/"

   ## List of servers exposing jolokia read service
   [[inputs.jolokia.servers]]
     name = "kafka-server-1"
     host = "SERVER_ADDRESS"
     port = "8778"
     # username = "myuser"
     # password = "mypassword"

   ## List of metrics collected on above servers
   ## Each metric consists in a name, a jmx path and either
   ## a pass or drop slice attribute.
   ## This collects all heap memory usage metrics.
   [[inputs.jolokia.metrics]]
     name = "heap_memory_usage"
     mbean  = "java.lang:type=Memory"
     attribute = "HeapMemoryUsage"

   ## This collects thread counts metrics.
   [[inputs.jolokia.metrics]]
     name = "thread_count"
     mbean  = "java.lang:type=Threading"
     attribute = "TotalStartedThreadCount,ThreadCount,DaemonThreadCount,PeakThreadCount"

   ## This collects garbage collection metrics.
   [[inputs.jolokia.metrics]]
     name = "gc_old_generation"
     mbean  = "java.lang:type=GarbageCollector,name=G1 Old Generation"
     attribute = "CollectionCount,CollectionTime"
   [[inputs.jolokia.metrics]]
     name = "gc_young_generation"
     mbean  = "java.lang:type=GarbageCollector,name=G1 Young Generation"
     attribute = "CollectionCount,CollectionTime"

   # Kafka Server Broker Topic Metrics
   [[inputs.jolokia.metrics]]
     name = "server_brokertopics_messagesinpersec"
     mbean  = "kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec"
   [[inputs.jolokia.metrics]]
     name = "server_brokertopics_bytesinpersec"
     mbean  = "kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec"
   [[inputs.jolokia.metrics]]
     name = "server_brokertopics_bytesoutpersec"
     mbean  = "kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec"

   # Kafka Server Delayed Operation Purgatory Metrics
   [[inputs.jolokia.metrics]]
    name = "server_delayedoperationpugatory_fetch"
    mbean  = "kafka.server:type=DelayedOperationPurgatory,name=PurgatorySize,delayedOperation=Fetch"
   [[inputs.jolokia.metrics]]
    name = "server_delayedoperationpugatory_produce"
    mbean  = "kafka.server:type=DelayedOperationPurgatory,name=PurgatorySize,delayedOperation=Produce"

    # Kafka Server Replica Fetcher Manager Metrics
    [[inputs.jolokia.metrics]]
    name = "server_replicafetchmanager.maxlag"
    mbean  = "kafka.server:type=ReplicaFetcherManager,name=MaxLag,clientId=Replica"

    # Kafka Server Replica Manager Metrics
    [[inputs.jolokia.metrics]]
    name = "server_replicamanager_underreplicated"
    mbean  = "kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions"
    [[inputs.jolokia.metrics]]
    name = "server_replicamanager_partitioncount"
    mbean  = "kafka.server:type=ReplicaManager,name=PartitionCount"
    [[inputs.jolokia.metrics]]
    name = "server_replicamanager_leadercount"
    mbean  = "kafka.server:type=ReplicaManager,name=LeaderCount"
    [[inputs.jolokia.metrics]]
    name = "server_replicamanager_isrshrinkspersec"
    mbean  = "kafka.server:type=ReplicaManager,name=IsrShrinksPerSec"
    [[inputs.jolokia.metrics]]
    name = "server_replicamanager_isrexpandspersec"
    mbean  = "kafka.server:type=ReplicaManager,name=IsrExpandsPerSec"

    # Kafka Network Request Metrics
    [[inputs.jolokia.metrics]]
    name = "network_requestmetrics_requests_fetch_consumer"
    mbean  = "kafka.network:type=RequestMetrics,name=RequestsPerSec,request=FetchConsumer"
    [[inputs.jolokia.metrics]]
    name = "network_requestmetrics_requests_fetch_follower"
    mbean  = "kafka.network:type=RequestMetrics,name=RequestsPerSec,request=FetchFollower"
    [[inputs.jolokia.metrics]]
    name = "network_requestmetrics_requests_produce"
    mbean  = "kafka.network:type=RequestMetrics,name=RequestsPerSec,request=Produce"
    [[inputs.jolokia.metrics]]
    name = "network_requestmetrics_totaltime_fetch_consumer"
    mbean  = "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchConsumer"
    [[inputs.jolokia.metrics]]
    name = "network_requestmetrics_totaltime_fetch_follower"
    mbean  = "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=FetchFollower"
    [[inputs.jolokia.metrics]]
    name = "network_requestmetrics_totaltime_produce"
    mbean  = "kafka.network:type=RequestMetrics,name=TotalTimeMs,request=Produce"

    # Kafka Controller Metrics
    [[inputs.jolokia.metrics]]
    name = "controller_activecontrollers"
    mbean  = "kafka.controller:type=KafkaController,name=ActiveControllerCount"
    [[inputs.jolokia.metrics]]
    name = "controller_offlinepartitions"
    mbean  = "kafka.controller:type=KafkaController,name=OfflinePartitionsCount"
    [[inputs.jolokia.metrics]]
    name = "controller_stats_leaderelectionrateandtime"
    mbean  = "kafka.controller:type=ControllerStats,name=LeaderElectionRateAndTimeMs"
    [[inputs.jolokia.metrics]]
    name = "controller_stats_uncleanleaderelections"
    mbean  = "kafka.controller:type=ControllerStats,name=UncleanLeaderElectionsPerSec"

    # Zookeeper Metrics
    [[inputs.jolokia.metrics]]
    name = "zookeeper_disconnects"
    mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperDisconnectsPerSec"
    attribute = "Count,OneMinuteRate,FiveMinuteRate,FifteenMinuteRate,MeanRate"
    [[inputs.jolokia.metrics]]
    name = "zookeeper_sync_connects"
    mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperSyncConnectsPerSec"
    attribute = "Count,OneMinuteRate,FiveMinuteRate,FifteenMinuteRate,MeanRate"
    [[inputs.jolokia.metrics]]
    name = "zookeeper_auth_failures"
    mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperAuthFailuresPerSec"
    attribute = "Count,OneMinuteRate,FiveMinuteRate,FifteenMinuteRate,MeanRate"
    [[inputs.jolokia.metrics]]
    name = "zookeeper_readonly_connects"
    mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperReadOnlyConnectsPerSec"
    attribute = "Count,OneMinuteRate,FiveMinuteRate,FifteenMinuteRate,MeanRate"
    [[inputs.jolokia.metrics]]
    name = "zookeeper_authentications"
    mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperSaslAuthenticationsPerSec"
    attribute = "Count,OneMinuteRate,FiveMinuteRate,FifteenMinuteRate,MeanRate"
    [[inputs.jolokia.metrics]]
    name = "zookeeper_expires"
    mbean  = "kafka.server:type=SessionExpireListener,name=ZooKeeperExpiresPerSec"
    attribute = "Count,OneMinuteRate,FiveMinuteRate,FifteenMinuteRate,MeanRate"
```
**Note:** Replace `SERVER_ADDRESS` with the Kafka server IP address.

To monitor multiple Kafka brokers, add additional `[[inputs.jolokia.servers]]` entries:
```
[[inputs.jolokia.servers]]
  name = "kafka-server-1"
  host = "SERVER1_ADDRESS"
  port = "8778"

[[inputs.jolokia.servers]]
  name = "kafka-server-2"
  host = "SERVER2_ADDRESS"
  port = "8778"
```
{% endraw %}  

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
