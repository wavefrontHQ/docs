---
title: Cassandra Integration
tags: []
permalink: cassandra.html
summary: Learn about the Wavefront Cassandra Integration.
---
## Cassandra Integration

Apache Cassandra is a free and open-source distributed NoSQL database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. Cassandra offers robust support for clusters spanning multiple datacenters, with asynchronous masterless replication allowing low latency operations for all clients.

This integration installs and configures Telegraf to send Cassandra metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

Collecting Cassandra metric requires the installation of Jolokia java-jvm agent. [Jolokia](https://jolokia.org/index.html) is a JMX-HTTP bridge giving an alternative to JSR-160 connectors. It is an agent based approach with support for many platforms. 
The Cassandra integration collects Cassandra 3 / JVM metrics exposed as MBean's attributes through jolokia REST endpoint.

In addition to setting up the metrics flow, this integration also installs a dashboard. For example, here's a screenshot of a dashboard with metrics collected from Cassandra.
{% include image.md src="images/cassandra_dashboard.png" width="80" %}


To see the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Cassandra Setup



### Step 1. Install Jolokia agent on your Cassandra server

1. Download Jolokia agent and save it in /usr/share/java
{% raw %}
   ```
   sudo curl -o /usr/share/java/jolokia-jvm-1.3.7-agent.jar -L http://search.maven.org/remotecontent?filepath=org/jolokia/jolokia-jvm/1.3.7/jolokia-jvm-1.3.7-agent.jar
   ```

1. Enable Jolokia agent in Cassandra

    1. Modify /etc/default/cassandra

       ```
       echo "export JVM_EXTRA_OPTS=\"-javaagent:/usr/share/java/jolokia-jvm-1.3.7-agent.jar=port=8778,host=localhost\"" | sudo tee -a /etc/default/cassandra
       ```
    
    1. Alternatively, one can also enable the agent by modifying cassandra-env.sh 
    
       Include the following line at the bottom of the your cassandra-env.sh
        
       ```
       JVM_OPTS="$JVM_OPTS -javaagent:/usr/share/java/jolokia-jvm-1.3.7-agent.jar=port=8778,host=localhost"
       ```
 
1. Restart cassandra

   ```
   sudo service cassandra restart
   ```

1. Verify that you can access Jolokia on port 8778 by running:
 
   ```
   curl http://localhost:8778/jolokia/
   ```

### Step 2. Install the Telegraf Agent

This integration uses the Cassandra input plugin for Telegraf. If you've already installed Telegraf on your server(s), skip to Step 3.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 3. Configure Cassandra Input Plugin

Create a file called `cassandra.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:

```
# Cassandra
[[inputs.cassandra]]
  # This is the context root used to compose the jolokia url
  context = "/jolokia/read"
  ## List of cassandra servers exposing jolokia read service
  servers = ["127.0.0.1:8778"]
  
  metrics = [   
        "/java.lang:type=Memory/HeapMemoryUsage",
        "/java.lang:type=Memory/NonHeapMemoryUsage",
        "/java.lang:type=GarbageCollector,name=ConcurrentMarkSweep/CollectionTime",
        "/java.lang:type=GarbageCollector,name=ConcurrentMarkSweep/CollectionCount",
        "/java.lang:type=GarbageCollector,name=ParNew/CollectionTime",
        "/java.lang:type=GarbageCollector,name=ParNew/CollectionCount",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Read,name=TotalLatency",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=TotalLatency",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Read,name=Latency",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Read,name=Timeouts",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Timeouts",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Read,name=Unavailables",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Unavailables",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Read,name=Failures",
        "/org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Failures",
        "/org.apache.cassandra.metrics:type=CommitLog,name=TotalCommitLogSize",
        "/org.apache.cassandra.metrics:type=Compaction,name=PendingTasks",
        "/org.apache.cassandra.metrics:type=Compaction,name=BytesCompacted",
        "/org.apache.cassandra.metrics:type=Connection,name=TotalTimeouts",
        "/org.apache.cassandra.metrics:type=Storage,name=Load",
        "/org.apache.cassandra.metrics:type=Storage,name=Exceptions",
        "/org.apache.cassandra.metrics:type=ColumnFamily,keyspace=*,scope=*,name=ReadLatency",
        "/org.apache.cassandra.metrics:type=ColumnFamily,keyspace=*,scope=*,name=ReadTotalLatency",
        "/org.apache.cassandra.metrics:type=ColumnFamily,keyspace=*,scope=*,name=WriteLatency",
        "/org.apache.cassandra.metrics:type=ColumnFamily,keyspace=*,scope=*,name=WriteTotalLatency",
        "/org.apache.cassandra.metrics:type=ColumnFamily,keyspace=*,scope=*,name=LiveDiskSpaceUsed",
        "/org.apache.cassandra.metrics:type=ColumnFamily,keyspace=*,scope=*,name=MaxRowSize",
        "/org.apache.cassandra.metrics:type=Cache,scope=KeyCache,name=Hits",
        "/org.apache.cassandra.metrics:type=Cache,scope=KeyCache,name=Requests",
        "/org.apache.cassandra.metrics:type=Cache,scope=KeyCache,name=Entries",
        "/org.apache.cassandra.metrics:type=Cache,scope=KeyCache,name=Size",
        "/org.apache.cassandra.metrics:type=Cache,scope=KeyCache,name=Capacity",
        "/org.apache.cassandra.metrics:type=Cache,scope=RowCache,name=Hits",
        "/org.apache.cassandra.metrics:type=Cache,scope=RowCache,name=Requests",
        "/org.apache.cassandra.metrics:type=Cache,scope=RowCache,name=Entries",
        "/org.apache.cassandra.metrics:type=Cache,scope=RowCache,name=Size",
        "/org.apache.cassandra.metrics:type=Cache,scope=RowCache,name=Capacity",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=internal,scope=CompactionExecutor,name=ActiveTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=internal,scope=CompactionExecutor,name=ActiveTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=internal,scope=AntiEntropyStage,name=ActiveTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=CounterMutationStage,name=PendingTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=CounterMutationStage,name=CurrentlyBlockedTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=MutationStage,name=PendingTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=MutationStage,name=CurrentlyBlockedTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=ReadRepairStage,name=PendingTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=ReadRepairStage,name=CurrentlyBlockedTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=ReadStage,name=PendingTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=ReadStage,name=CurrentlyBlockedTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=RequestResponseStage,name=PendingTasks",
        "/org.apache.cassandra.metrics:type=ThreadPools,path=request,scope=RequestResponseStage,name=CurrentlyBlockedTasks"
      ]
```

Replace the servers field with your Cassandra servers that have installed Jolokia agent.

```
servers = ["[username[:password]]@[your_server_host]:8778"]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
