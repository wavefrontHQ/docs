---
title: Cassandra Integration
tags: [integrations list]
permalink: cassandra.html
summary: Learn about the Cassandra Integration.
---
## Cassandra Integration

Apache Cassandra is a free and open-source distributed NoSQL database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. Cassandra offers robust support for clusters spanning multiple datacenters, with asynchronous masterless replication allowing low latency operations for all clients.

1. **Cassandra**: This integration installs and configures Telegraf Jolokia2 input plugin to send Cassandra metrics to Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html). Collecting Cassandra metric requires the installation of Jolokia java-jvm agent. [Jolokia](https://jolokia.org/index.html) is a JMX-HTTP bridge giving an alternative to JSR-160 connectors. It is an agent based approach with support for many platforms. The Cassandra integration collects Cassandra / JVM metrics exposed as MBean's attributes through jolokia REST endpoint.

2. **Cassandra on Kubernetes**: This integration uses K8ssandra which is a cloud native distribution of Apache Cassandra® that runs on Kubernetes. K8ssandra provides an ecosystem of tools to provide richer data APIs and automated operations alongside Cassandra. This explains the configuration of Wavefront Collector for Kubernetes to scrape Cassandra metrics using Prometheus.

In addition to setting up the metrics flow, this integration also installs dashboards:
* Cassandra
* Cassandra on Kubernetes

Here's a dashboard displaying Cassandra metrics on Kubernetes:
{% include image.md src="images/cassandra_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Cassandra Setup



  This integration uses the Cassandra input plugin for Telegraf. If you've already installed Telegraf on your servers, you can skip to Step 2.

### Step 1. Install the Telegraf Agent


Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!


### Step 2. Install Jolokia agent on your Cassandra server

1. Download the latest version of the Jolokia JVM-Agent JAR file `jolokia-jvm-x.x.x.jar` from the [Jolokia web site](https://jolokia.org/download.html) and save it in /usr/share/java

1. Enable Jolokia agent in Cassandra

    1. Modify /etc/default/cassandra
{% raw %}
       ```
       echo "export JVM_EXTRA_OPTS=\"-javaagent:/usr/share/java/jolokia-jvm-1.7.1.jar=port=8778,host=localhost\"" | sudo tee -a /etc/default/cassandra
       ```
{% endraw %}

    1. Alternatively, one can also enable the agent by modifying cassandra-env.sh

       Include the following line at the bottom of your cassandra-env.sh
{% raw %}
       ```
       JVM_OPTS="$JVM_OPTS -javaagent:/usr/share/java/jolokia-jvm-1.7.1.jar=port=8778,host=localhost"
       ```
{% endraw %}

  Here `jolokia-jvm-1.7.1.jar` is the latest version used for testing.

1. Restart cassandra
{% raw %}
   ```
   sudo service cassandra restart
   ```
{% endraw %}

1. Verify that you can access Jolokia on port 8778 by running:
{% raw %}
   ```
   curl http://localhost:8778/jolokia/
   ```
{% endraw %}


### Step 3. Configure Cassandra Input Plugin

Create a file called `cassandra.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
# Cassandra
[[inputs.jolokia2_agent]]
  # This is the context root used to compose the jolokia url
  ## List of cassandra servers exposing jolokia read service
  urls = ["http://localhost:8778/jolokia"]
  name_prefix = "cassandra2."

  [[inputs.jolokia2_agent.metric]]
    name  = "javaMemory"
    mbean = "java.lang:type=Memory"

  [[inputs.jolokia2_agent.metric]]
    name  = "javaGarbageCollector"
    mbean = "java.lang:name=*,type=GarbageCollector"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "Cache"
    mbean = "org.apache.cassandra.metrics:name=*,scope=*,type=Cache"
    tag_keys = ["name", "scope"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "Client"
    mbean = "org.apache.cassandra.metrics:name=*,type=Client"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "ClientRequestMetrics"
    mbean = "org.apache.cassandra.metrics:name=*,type=ClientRequestMetrics"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "ClientRequest"
    mbean = "org.apache.cassandra.metrics:name=*,scope=*,type=ClientRequest"
    tag_keys = ["name", "scope"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "CommitLog"
    mbean = "org.apache.cassandra.metrics:name=*,type=CommitLog"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "Compaction"
    mbean = "org.apache.cassandra.metrics:name=*,type=Compaction"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "CQL"
    mbean = "org.apache.cassandra.metrics:name=*,type=CQL"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "DroppedMessage"
    mbean = "org.apache.cassandra.metrics:name=*,scope=*,type=DroppedMessage"
    tag_keys = ["name", "scope"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "FileCache"
    mbean = "org.apache.cassandra.metrics:name=*,type=FileCache"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "ReadRepair"
    mbean = "org.apache.cassandra.metrics:name=*,type=ReadRepair"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "Storage"
    mbean = "org.apache.cassandra.metrics:name=*,type=Storage"
    tag_keys = ["name"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name  = "ThreadPools"
    mbean = "org.apache.cassandra.metrics:name=*,path=*,scope=*,type=ThreadPools"
    tag_keys = ["name", "path", "scope"]
    field_prefix = "$1_"

  [[inputs.jolokia2_agent.metric]]
    name = "Table"
    mbean = "org.apache.cassandra.metrics:type=Table,keyspace=*,scope=*,name=*"
    tag_keys = ["keyspace", "scope", "name"]
    field_prefix = "$3_"

```
{% endraw %}


### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.


## Cassandra on Kubernetes

This integration supports Cassandra deployment using [K8ssandra](https://k8ssandra.io/about/) provided by the Apache Cassandra community.

* Make sure that K8ssandra is deployed on your Kubernetes cluster. If not deployed already, you can deploy it by using [K8ssandra-installation](https://start.k8ssandra.io/). Also, ensure to enable monitoring on your K8ssandra deployment `.yaml`.
{% raw %}
    ```
    ### Sample command
    helm install -f k8ssandra-file.yaml k8ssandra-release -n k8ssandra-namespace
    ```
{% endraw %}

#### Configure the Wavefront Collector for Kubernetes
You can configure the Wavefront Collector for Kubernetes to scrape Cassandra metrics from Prometheus using `prometheus_sources` configuration.

If you do not already have the Wavefront Collector for Kubernetes installed, follow these instructions to add it to your cluster either by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install).

Step 1. Edit the Wavefront Collector ConfigMap at runtime, and add the following snippet under `Prometheus Sources`.{% raw %}
   ```
   kubectl edit configmap wavefront-collector-config -n wavefront
   ```
{% endraw %}

Cassandra Config:{% raw %}
   ```
      ##########################################################################
      # Static source to collect Cassandra metrics via federated Prometheus server
      ##########################################################################
        
      prometheus_sources:
      - url: 'http://<prometheus-service-name>.<namespace>.svc.cluster.local:9090/federate?match[]={__name__=~"(mcac|stargate|jvm).*"}'
        prefix: 'cassandra.'
        httpConfig:
          bearer_token_file: '/var/run/secrets/kubernetes.io/serviceaccount/token'
          tls_config:
            ca_file: '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt'
            insecure_skip_verify: true
  
        filters:
          metricAllowList:
          - 'cassandra.mcac.*'
          - 'cassandra.stargate.*'
          - 'cassandra.jvm.*'
   ```
{% endraw %}

**NOTE**: Update the `prometheus-service-name` and `namespace` params in the url as per your environment.





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

