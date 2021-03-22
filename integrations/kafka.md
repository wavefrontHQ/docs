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

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

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



