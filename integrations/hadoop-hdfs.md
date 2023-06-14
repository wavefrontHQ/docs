---
title: Apache Hadoop HDFS Integration
tags: [integrations list]
permalink: hadoop-hdfs.html
summary: Learn about the Apache Hadoop HDFS Integration.
---
## Apache Hadoop Distributed File System (HDFS)

The Hadoop Distributed File System (HDFS) can store very large data sets reliably, and can stream those data sets at high bandwidth to user applications. In a large cluster, thousands of servers can host directly attached storage and also execute user application tasks.

This integration installs and configures Telegraf and Jolokia to send Hadoop HDFS cluster metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a Wavefront proxy. Jolokia is a JMX-HTTP bridge that allows non-Java processes to retrieve JMX mBean attributes. 

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/hadoop-hdfs-metrics.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache Hadoop HDFS



### Step 1. Install the Telegraf Agent

If you don't have the Telegraf agent installed, follow the steps below. Otherwise, continue to step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Install the Jolokia JVM-Agent on Your HDFS nodes

1. Download the latest version of the Jolokia JVM-Agent from [here](https://jolokia.org/download.html).
2. Deploy the `jolokia-jvm-*-agent.jar` to your HDFS nodes (name & data).
3. Edit your `etc/hadoop/hadoop-env.sh` files and enter the following snippet:{% raw %}
    ```
    JOLOKIAJAR="[JOLOKIA_JAR_INSTALL_PATH]/jolokia-jvm-*-agent.jar"
    export HDFS_NAMENODE_OPTS="-javaagent:${JOLOKIAJAR}=port=7777,host=localhost"
    export HDFS_DATANODE_OPTS="-javaagent:${JOLOKIAJAR}=port=7778,host=localhost"
    ```
{% endraw %}
4. Verify the Jolokia agent installation on each node by accessing this URL: `http://<address>:<port>/jolokia/version`.

The result looks similar to this:{% raw %}
```
{"request":{"type":"version"},"value":{"agent":"1.3.7","protocol":"7.2","config":{"maxCollectionSize":"0","agentId":"10.152.24.99-29844-172f5788-servlet","debug":"false","agentType":"servlet","serializeException":"false","detectorOptions":"{}","dispatcherClasses":"org.jolokia.jsr160.Jsr160RequestDispatcher","maxDepth":"15","discoveryEnabled":"false","canonicalNaming":"true","historyMaxEntries":"10","includeStackTrace":"true","maxObjects":"0","debugMaxEntries":"100"},"info":{"product":"tomcat","vendor":"Apache","version":"8.5.23"}},"timestamp":1509955465,"status":200}
```
{% endraw %}

### Step 3. Configure Telegraf Jolokia Input Plugin

First create a file called `hadoop-hdfs.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
################
# NAMENODE     #
################
[[inputs.jolokia2_agent]]
urls = ["http://localhost:7777/jolokia"]
name_prefix = "hadoop.hdfs.namenode."

[[inputs.jolokia2_agent.metric]]
name  = "FSNamesystem"
mbean = "Hadoop:name=FSNamesystem,service=NameNode"
paths = ["CapacityTotal","CapacityRemaining","CapacityUsedNonDFS","NumLiveDataNodes","NumDeadDataNodes","NumInMaintenanceDeadDataNodes","NumDecomDeadDataNodes"]

[[inputs.jolokia2_agent.metric]]
name  = "FSNamesystemState"
mbean = "Hadoop:name=FSNamesystemState,service=NameNode"
paths = ["VolumeFailuresTotal","UnderReplicatedBlocks","BlocksTotal"]

[[inputs.jolokia2_agent.metric]]
name  = "OperatingSystem"
mbean = "java.lang:type=OperatingSystem"
paths = ["ProcessCpuLoad","SystemLoadAverage","SystemCpuLoad"]

[[inputs.jolokia2_agent.metric]]
name  = "jvm_runtime"
mbean = "java.lang:type=Runtime"
paths = ["Uptime"]

[[inputs.jolokia2_agent.metric]]
name  = "jvm_memory"
mbean = "java.lang:type=Memory"
paths = ["HeapMemoryUsage", "NonHeapMemoryUsage", "ObjectPendingFinalizationCount"]

[[inputs.jolokia2_agent.metric]]
name     = "jvm_garbage_collector"
mbean    = "java.lang:name=*,type=GarbageCollector"
paths    = ["CollectionTime", "CollectionCount"]
tag_keys = ["name"]

[[inputs.jolokia2_agent.metric]]
name       = "jvm_memory_pool"
mbean      = "java.lang:name=*,type=MemoryPool"
paths      = ["Usage", "PeakUsage", "CollectionUsage"]
tag_keys   = ["name"]
tag_prefix = "pool_"


################
# DATANODE     #
################
[[inputs.jolokia2_agent]]
urls = ["http://localhost:7778/jolokia"]
name_prefix = "hadoop.hdfs.datanode."

[[inputs.jolokia2_agent.metric]]
name  = "FSDatasetState"
mbean = "Hadoop:name=FSDatasetState,service=DataNode"
paths = ["Capacity","DfsUsed","Remaining","NumBlocksFailedToUnCache","NumBlocksFailedToCache","NumBlocksCached"]

[[inputs.jolokia2_agent.metric]]
name  = "OperatingSystem"
mbean = "java.lang:type=OperatingSystem"
paths = ["ProcessCpuLoad","SystemLoadAverage","SystemCpuLoad"]

[[inputs.jolokia2_agent.metric]]
name  = "jvm_runtime"
mbean = "java.lang:type=Runtime"
paths = ["Uptime"]

[[inputs.jolokia2_agent.metric]]
name  = "jvm_memory"
mbean = "java.lang:type=Memory"
paths = ["HeapMemoryUsage", "NonHeapMemoryUsage", "ObjectPendingFinalizationCount"]

[[inputs.jolokia2_agent.metric]]
name     = "jvm_garbage_collector"
mbean    = "java.lang:name=*,type=GarbageCollector"
paths    = ["CollectionTime", "CollectionCount"]
tag_keys = ["name"]

[[inputs.jolokia2_agent.metric]]
name       = "jvm_memory_pool"
mbean      = "java.lang:name=*,type=MemoryPool"
paths      = ["Usage", "PeakUsage", "CollectionUsage"]
tag_keys   = ["name"]
tag_prefix = "pool_"
```
{% endraw %}

Then replace the `urls` value on the `NAMENODE` section with your NameNodes URLs specified on `HDFS_NAMENODE_OPTS`, and the `urls` value on the `DATANODE` section with your DataNodes URLs specified on `HDFS_DATANODE_OPTS`

Format:{% raw %}
```
urls = ["http://<address>:<port>/<jolokia contex>"]
```
{% endraw %}
Example:{% raw %}
```
urls = ["http://10.152.24.99:7777/jolokia"]
```
{% endraw %}

To monitor multiple name or data nodes, add `urls` entries:{% raw %}
```
urls = ["http://datanode.foo.com:7778/jolokia","http://datanode2.foo.com:7778/jolokia","http://datanode3.foo.com:7778/jolokia"]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



