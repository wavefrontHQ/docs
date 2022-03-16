---
title: Cassandra collectd Integration
keywords:
tags: [integrations]
sidebar: doc_sidebar
permalink: integrations_collectd_cassandra.html
summary: Learn how to send Cassandra data collected by collectd to Tanzu Observability by Wavefront.
---

[Apache Cassandra](http://cassandra.apache.org/) is a popular, distributed, NoSQL database system.
Since Cassandra uses JMX to export metrics, collectd depends on the [Java](https://collectd.org/wiki/index.php/Plugin:Java) and [GenericJMX](https://collectd.org/wiki/index.php/Plugin:GenericJMX) plugins in order to collect metrics from Cassandra.

Tanzu Observability by Wavefront supports a built-in integration that gets data from Cassandra using Telegraf. If you want to use collectd instead, follow the instructions on this page. 


## Cassandra Set Up

Make sure your Cassandra nodes are configured to allow [JMX connections](http://docs.datastax.com/en/archived/cassandra/3.x/cassandra/configuration/secureAboutJMXAuth.html?hl=jmx). Which metrics are available depends on the Cassandra version that you're using. Consult the Cassandra JMX documentation to confirm which metrics are available for your version of Cassandra.

## Installation

1. On your collectd host, copy the [example config](https://collectd.org/wiki/index.php/Plugin:GenericJMX) into `/etc/collectd/managed_config/`. Alternatively, if you're using Cassandra 2.2 or higher, you can try the example configuration below which is pre-populated for JMX information.
1. Edit the settings in the file for your Cassandra server and version.
1. Restart collectd.

## Example collectd Configuration

```conf
# A sample GenericJMX configuration for cassandra 2.2
# Credit to blog.raintank.io/collectd-and-cassandra-2-2/

LoadPlugin "java"
<Plugin "java">
  JVMARG "-verbose:jni"
  JVMARG "-Djava.class.path=/usr/share/collectd/java/collectd-api.jar:/usr/share/collectd/java/generic-jmx.jar"
  LoadPlugin "org.collectd.java.GenericJMX"
  <Plugin "GenericJMX">
  <MBean "cassandra/bloom-filter-disk-used">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=BloomFilterDiskSpaceUsed"
  InstancePrefix "cassandra_bloom-filter"
  <Value>
  Attribute "Value"
  InstancePrefix "DiskSpaceUsed"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/bloom-filter-false-positives">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=BloomFilterFalsePositives"
  InstancePrefix "cassandra_bloom-filter"
  <Value>
  Attribute "Value"
  InstancePrefix "FalsePositives"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/bloom-filter-false-ratio">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=BloomFilterFalseRatio"
  InstancePrefix "cassandra_bloom-filter"
  <Value>
  Attribute "Value"
  InstancePrefix "FalseRatio"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cache-capacity">
  ObjectName "org.apache.cassandra.metrics:type=Cache,name=Capacity,*"
  InstancePrefix "cassandra_cache-"
  InstanceFrom "scope"
  <Value>
  Attribute "Value"
  InstancePrefix "cache-capacity"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/cache-hits">
  ObjectName "org.apache.cassandra.metrics:type=Cache,name=Hits,*"
  InstancePrefix "cassandra_cache-"
  InstanceFrom "scope"
  <Value>
  Attribute "Count"
  InstancePrefix "cache-hits"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/cache-key-hitrate">
  ObjectName "org.apache.cassandra.metrics:type=Cache,scope=KeyCache,name=HitRate"
  InstancePrefix "cassandra_cache_stats"
  <Value>
  Attribute "Value"
  InstancePrefix "KeyCacheHitRate"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cache-requests">
  ObjectName "org.apache.cassandra.metrics:type=Cache,name=Requests,*"
  InstancePrefix "cassandra_cache-"
  InstanceFrom "scope"
  <Value>
  Attribute "Count"
  InstancePrefix "cache-requests"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/cache-row-hitrate">
  ObjectName "org.apache.cassandra.metrics:type=Cache,scope=RowCache,name=HitRate"
  InstancePrefix "cassandra_cache_stats"
  <Value>
  Attribute "Value"
  InstancePrefix "RowCacheHitRate"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cache-size">
  ObjectName "org.apache.cassandra.metrics:type=Cache,name=Size,*"
  InstancePrefix "cassandra_cache-"
  InstanceFrom "scope"
  <Value>
  Attribute "Value"
  InstancePrefix "cache-size"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-livediskspace">
  ObjectName "org.apache.cassandra.metrics:type=Keyspace,keyspace=important_db,name=LiveDiskSpaceUsed"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Value"
  InstancePrefix "LiveDiskSpaceUsed"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-livesstables">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=LiveSSTableCount,*"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Value"
  InstancePrefix "LiveSSTableCount"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-memtable-column-count">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,keyspace=important_db,scope=metric,name=MemtableColumnsCount"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Value"
  InstancePrefix "MemtableColumnsCount"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-memtable-count">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,keyspace=important_db,scope=metric,name=MemtableSwitchCount"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Count"
  InstancePrefix "MemtableSwitchCount"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-memtable-size">
  ObjectName "org.apache.cassandra.metrics:type=Keyspace,keyspace=important_db,name=MemtableLiveDataSize"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Value"
  InstancePrefix "MemtableSize"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-read-count">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=ReadLatency"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Count"
  InstancePrefix "ReadOperations"
  Type "counter"
  </Value>
  <Value>
  Attribute "OneMinuteRate"
  InstancePrefix "1mReadLatency"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-read-total-latency">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=ReadTotalLatency"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Count"
  InstancePrefix "ReadTotalLatency"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-totaldiskspace">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,keyspace=important_db,scope=metric,name=TotalDiskSpaceUsed"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Count"
  InstancePrefix "TotalDiskSpaceUsed"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-write-count">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=WriteLatency"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Count"
  InstancePrefix "WriteOperations"
  Type "counter"
  </Value>
  <Value>
  Attribute "OneMinuteRate"
  InstancePrefix "1mWriteLatency"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/cfstats-write-total-latency">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=WriteTotalLatency"
  InstancePrefix "cassandra_columnfamilies_stats"
  <Value>
  Attribute "Count"
  InstancePrefix "WriteTotalLatency"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/classes">
  ObjectName "java.lang:type=ClassLoading"
  InstancePrefix "cassandra_java"
  <Value>
  Attribute "LoadedClassCount"
  InstancePrefix "loaded_classes"
  Table false
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/client_read_latency">
  ObjectName "org.apache.cassandra.metrics:type=ClientRequest,scope=Read,name=Latency"
  InstancePrefix "cassandra_client_request-latency"
  <Value>
  Attribute "50thPercentile"
  InstancePrefix "50thPercentile"
  Table false
  Type "gauge"
  </Value>
  <Value>
  Attribute "99thPercentile"
  InstancePrefix "99thPercentile"
  Table false
  Type "gauge"
  </Value>
  <Value>
  Attribute "Max"
  InstancePrefix "Max"
  Table false
  Type "gauge"
  </Value>
  <Value>
  Attribute "Count"
  InstancePrefix "Count"
  Table false
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/compaction-pending">
  ObjectName "org.apache.cassandra.metrics:type=Compaction,name=PendingTasks"
  InstancePrefix "cassandra_compaction-pending_tasks"
  <Value>
  Attribute "Value"
  InstancePrefix "PendingTasks"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/compaction-total">
  ObjectName "org.apache.cassandra.metrics:type=Compaction,name=TotalCompactionsCompleted"
  InstancePrefix "cassandra_compaction-total_completed_tasks"
  <Value>
  Attribute "Count"
  InstancePrefix "TotalCompactionsCompleted"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/compilation">
  ObjectName "java.lang:type=Compilation"
  InstancePrefix "cassandra_java"
  <Value>
  Attribute "TotalCompilationTime"
  InstancePrefix "compilation_time"
  Table false
  Type "total_time_in_ms"
  </Value>
  </MBean>
  <MBean "cassandra/compression-ratio">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=CompressionRatio"
  InstancePrefix "cassandra_compression"
  <Value>
  Attribute "Value"
  InstancePrefix "CompressionRatio"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/concurrent">
  ObjectName "org.apache.cassandra.metrics:type=ThreadPools,name=CompletedTasks,*"
  InstancePrefix "cassandra_activity_internal-"
  InstanceFrom "path"
  <Value>
  Attribute "Value"
  InstanceFrom "scope"
  InstancePrefix "completed-tasks-"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/currently-blocked-tasks">
  ObjectName "org.apache.cassandra.metrics:type=ThreadPools,name=CurrentlyBlockedTasks,*"
  InstancePrefix "cassandra_blocked-tasks-"
  InstanceFrom "path"
  <Value>
  Attribute "Count"
  InstanceFrom "scope"
  InstancePrefix "currently-blocked-"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/estimated_row_count">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,keyspace=important_db,scope=metric,name=EstimatedRowCount"
  InstancePrefix "cassandra_columnfamiles_estimated_row_count-"
  <Value>
  Attribute "Value"
  InstancePrefix "EstimatedRowCount"
  Type "count"
  </Value>
  </MBean>
  <MBean "cassandra/exceptions">
  ObjectName "org.apache.cassandra.metrics:type=Storage,name=Exceptions"
  InstancePrefix "cassandra_exceptions"
  <Value>
  Attribute "Count"
  InstancePrefix "Count"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/file-cache-hits">
  ObjectName "org.apache.cassandra.metrics:type=FileCache,name=Hits"
  InstancePrefix "cassandra_filecache"
  <Value>
  Attribute "Count"
  InstancePrefix "file-cache-hits"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/file-cache-requests">
  ObjectName "org.apache.cassandra.metrics:type=FileCache,name=Requests"
  InstancePrefix "cassandra_filecache"
  <Value>
  Attribute "Count"
  InstancePrefix "file-cache-requests"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/file-cache-size">
  ObjectName "org.apache.cassandra.metrics:type=FileCache,name=Size"
  InstancePrefix "cassandra_filecache"
  <Value>
  Attribute "Value"
  InstancePrefix "file-cache-size"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/garbage_collector">
  ObjectName "java.lang:type=GarbageCollector,*"
  InstancePrefix "cassandra_java_gc-"
  InstanceFrom "name"
  <Value>
  Attribute "CollectionCount"
  Table false
  Type "invocations"
  </Value>
  <Value>
  Attribute "CollectionTime"
  InstancePrefix "collection_time"
  Table false
  Type "total_time_in_ms"
  </Value>
  </MBean>
  <MBean "cassandra/max-row-size">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=MaxRowSize"
  InstancePrefix "cassandra_row_size"
  <Value>
  Attribute "Value"
  InstancePrefix "MaxRowSize"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/mean-row-size">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=MeanRowSize"
  InstancePrefix "cassandra_row_size"
  <Value>
  Attribute "Value"
  InstancePrefix "MeanRowSize"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/memory">
  ObjectName "java.lang:type=Memory,*"
  InstancePrefix "cassandra_java_memory"
  <Value>
  Attribute "HeapMemoryUsage"
  InstancePrefix "heap-"
  Table true
  Type "memory"
  </Value>
  <Value>
  Attribute "NonHeapMemoryUsage"
  InstancePrefix "nonheap-"
  Table true
  Type "memory"
  </Value>
  </MBean>
  <MBean "cassandra/memory_pool">
  ObjectName "java.lang:type=MemoryPool,*"
  InstancePrefix "cassandra_java_memory_pool-"
  InstanceFrom "name"
  <Value>
  Attribute "Usage"
  Table true
  Type "memory"
  </Value>
  </MBean>
  <MBean "cassandra/min-row-size">
  ObjectName "org.apache.cassandra.metrics:type=ColumnFamily,name=MinRowSize"
  InstancePrefix "cassandra_row_size"
  <Value>
  Attribute "Value"
  InstancePrefix "MinRowSize"
  Type "gauge"
  </Value>
  </MBean>
  <MBean "cassandra/pending-tasks">
  ObjectName "org.apache.cassandra.metrics:type=ThreadPools,name=PendingTasks,*"
  InstancePrefix "cassandra_pending-tasks-"
  InstanceFrom "path"
  <Value>
  Attribute "Value"
  InstanceFrom "scope"
  InstancePrefix "pending-"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/storage-count">
  ObjectName "org.apache.cassandra.metrics:type=Storage,name=Load"
  InstancePrefix "cassandra_load"
  <Value>
  Attribute "Count"
  InstancePrefix "Load"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/timeouts">
  ObjectName "org.apache.cassandra.net:type=MessagingService"
  InstancePrefix "cassandra-timeouts"
  <Value>
  Attribute "TotalTimeouts"
  InstancePrefix "TotalTimeouts"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/total-blocked-tasks">
  ObjectName "org.apache.cassandra.metrics:type=ThreadPools,name=TotalBlockedTasks,*"
  InstancePrefix "cassandra_blocked-tasks-"
  InstanceFrom "path"
  <Value>
  Attribute "Count"
  InstanceFrom "scope"
  InstancePrefix "total-blocked-"
  Type "counter"
  </Value>
  </MBean>
  <MBean "cassandra/update-interval">
  ObjectName "org.apache.cassandra.db:type=DynamicEndpointSnitch"
  InstancePrefix "cassandra_update-interval"
  <Value>
  Attribute "UpdateInterval"
  InstancePrefix "UpdateInterval"
  Type "gauge"
  </Value>
  </MBean>
  <Connection>
  Collect "cassandra/classes"
  Collect "cassandra/compilation"
  Collect "cassandra/memory"
  Collect "cassandra/memory_pool"
  Collect "cassandra/garbage_collector"
  Collect "cassandra/client_read_latency"
  Collect "cassandra/concurrent"
  Collect "cassandra/cfstats-read-total-latency"
  Collect "cassandra/cfstats-write-total-latency"
  Collect "cassandra/cfstats-livesstables"
  Collect "cassandra/cfstats-totaldiskspace"
  Collect "cassandra/estimated_row_count"
  Collect "cassandra/cfstats-read-count"
  Collect "cassandra/cfstats-write-count"
  Collect "cassandra/cfstats-memtable-count"
  Collect "cassandra/cfstats-memtable-size"
  Collect "cassandra/cache-key-hitrate"
  Collect "cassandra/cache-row-hitrate"
  Collect "cassandra/cfstats-livediskspace"
  Collect "cassandra/max-row-size"
  Collect "cassandra/mean-row-size"
  Collect "cassandra/min-row-size"
  Collect "cassandra/storage-count"
  Collect "cassandra/compression-ratio"
  Collect "cassandra/cache-hits"
  Collect "cassandra/file-cache-hits"
  Collect "cassandra/timeouts"
  Collect "cassandra/total-blocked-tasks"
  Collect "cassandra/currently-blocked-tasks"
  Collect "cassandra/pending-tasks"
  Collect "cassandra/cache-requests"
  Collect "cassandra/file-cache-requests"
  Collect "cassandra/update-interval"
  Collect "cassandra/cache-size"
  Collect "cassandra/file-cache-size"
  Collect "cassandra/cache-capacity"
  Collect "cassandra/cfstats-memtable-column-count"
  Collect "cassandra/bloom-filter-disk-used"
  Collect "cassandra/bloom-filter-false-positives"
  Collect "cassandra/bloom-filter-false-ratio"
  Collect "cassandra/exceptions"
  ServiceURL "service:jmx:rmi:///jndi/rmi://localhost:7199/jmxrmi"
  Host "cassandra-foo"
  </Connection>
  </Plugin>
</Plugin>
```
