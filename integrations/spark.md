---
title: Apache Spark Integration
tags: [integrations list]
permalink: spark.html
summary: Learn about the Apache Spark Integration.
---

This page provides an overview of what you can do with the Apache Spark integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Apache Spark integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Apache Spark** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Apache Spark Integration

Apache Spark is an open-source cluster-computing framework. This integration explains how to configure the Wavefront proxy to listen for Graphite data, and how to configure Spark metrics for Graphite. In addition to setting up the metrics flow, this integration also sets up a dashboard.

{% include image.md src="images/spark.png" width="80" %}



## Metrics
  

|Metric Name|Description|
| :--- | :--- |
|spark.CodeGenerator.compilationTime.*|Statistics: count, max, mean, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.CodeGenerator.generatedClassSize.*|Statistics: count, max, mean, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.CodeGenerator.generatedMethodSize.*|Statistics: count, max, mean, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.CodeGenerator.sourceCodeSize.*|Statistics: count, max, mean, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.HiveExternalCatalog.fileCacheHits.*|Statistics: count|
|spark.HiveExternalCatalog.filesDiscovered.*|Statistics: count|
|spark.HiveExternalCatalog.hiveClientCalls.*|Statistics: count|
|spark.HiveExternalCatalog.parallelListingJobCount.*|Statistics: count|
|spark.HiveExternalCatalog.partitionsFetched.*|Statistics: count|
|spark.jvm.G1-Old-Generation.*|Statistics: count|
|spark.jvm.G1-Old-Generation.time||
|spark.jvm.G1-Young-Generation.*|Statistics: count|
|spark.jvm.G1-Young-Generation.time||
|spark.jvm.direct.*|Statistics: count, used|
|spark.jvm.direct.capacity||
|spark.jvm.heap.*|Statistics: committed, init, max, used|
|spark.jvm.heap.usage||
|spark.jvm.mapped.*|Statistics: count, used|
|spark.jvm.mapped.capacity||
|spark.jvm.non-heap.*|Statistics: committed, init, max, used|
|spark.jvm.non-heap.usage||
|spark.jvm.pools.Compressed-Class-Space.*|Statistics: committed, init, max, used|
|spark.jvm.pools.Compressed-Class-Space.usage||
|spark.jvm.pools.G1-Eden-Space.*|Statistics: committed, init, max, used|
|spark.jvm.pools.G1-Eden-Space.usage||
|spark.jvm.pools.G1-Eden-Space.used-after-gc||
|spark.jvm.pools.G1-Old-Gen.*|Statistics: committed, init, max, used|
|spark.jvm.pools.G1-Old-Gen.usage||
|spark.jvm.pools.G1-Old-Gen.used-after-gc||
|spark.jvm.pools.G1-Survivor-Space.*|Statistics: committed, init, max, used|
|spark.jvm.pools.G1-Survivor-Space.usage||
|spark.jvm.pools.G1-Survivor-Space.used-after-gc||
|spark.jvm.pools.Metaspace.*|Statistics: committed, init, max, used|
|spark.jvm.pools.Metaspace.usage||
|spark.jvm.total.*|Statistics: committed, init, max, used|
|spark.local-\*.driver.\*|This is the component with the largest amount of instrumented metrics by namespace, such as BlockManager, CodeGenerator, DAGScheduler, ExecutorMetrics, HiveExternalCatalog, and so on.|
|spark.local-*.driver.BlockManager.disk.diskSpaceUsed_MB||
|spark.local-*.driver.BlockManager.memory.maxMem_MB||
|spark.local-*.driver.BlockManager.memory.maxOffHeapMem_MB||
|spark.local-*.driver.BlockManager.memory.maxOnHeapMem_MB||
|spark.local-*.driver.BlockManager.memory.memUsed_MB||
|spark.local-*.driver.BlockManager.memory.offHeapMemUsed_MB||
|spark.local-*.driver.BlockManager.memory.onHeapMemUsed_MB||
|spark.local-*.driver.BlockManager.memory.remainingMem_MB||
|spark.local-*.driver.BlockManager.memory.remainingOffHeapMem_MB||
|spark.local-*.driver.BlockManager.memory.remainingOnHeapMem_MB||
|spark.local-\*.driver.CodeGenerator.compilationTime.\*|Statistics: count, max, mean, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.CodeGenerator.generatedClassSize.\*|Statistics: count, max, mean, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.CodeGenerator.generatedMethodSize.\*|Statistics: count, max, mean, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.CodeGenerator.sourceCodeSize.\*|Statistics: count, max, mean, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-*.driver.DAGScheduler.job.activeJobs||
|spark.local-*.driver.DAGScheduler.job.allJobs||
|spark.local-\*.driver.DAGScheduler.messageProcessingTime.\*|Statistics: count, m15_rate, m1_rate, m5_rate, max, mean, mean_rate, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-*.driver.DAGScheduler.stage.failedStages||
|spark.local-*.driver.DAGScheduler.stage.runningStages||
|spark.local-*.driver.DAGScheduler.stage.waitingStages||
|spark.local-*.driver.ExecutorMetrics.DirectPoolMemory||
|spark.local-*.driver.ExecutorMetrics.JVMHeapMemory||
|spark.local-*.driver.ExecutorMetrics.JVMOffHeapMemory||
|spark.local-*.driver.ExecutorMetrics.MajorGCCount||
|spark.local-*.driver.ExecutorMetrics.MajorGCTime||
|spark.local-*.driver.ExecutorMetrics.MappedPoolMemory||
|spark.local-*.driver.ExecutorMetrics.MinorGCCount||
|spark.local-*.driver.ExecutorMetrics.MinorGCTime||
|spark.local-*.driver.ExecutorMetrics.OffHeapExecutionMemory||
|spark.local-*.driver.ExecutorMetrics.OffHeapStorageMemory||
|spark.local-*.driver.ExecutorMetrics.OffHeapUnifiedMemory||
|spark.local-*.driver.ExecutorMetrics.OnHeapExecutionMemory||
|spark.local-*.driver.ExecutorMetrics.OnHeapStorageMemory||
|spark.local-*.driver.ExecutorMetrics.OnHeapUnifiedMemory||
|spark.local-*.driver.ExecutorMetrics.ProcessTreeJVMRSSMemory||
|spark.local-*.driver.ExecutorMetrics.ProcessTreeJVMVMemory||
|spark.local-*.driver.ExecutorMetrics.ProcessTreeOtherRSSMemory||
|spark.local-*.driver.ExecutorMetrics.ProcessTreeOtherVMemory||
|spark.local-*.driver.ExecutorMetrics.ProcessTreePythonRSSMemory||
|spark.local-*.driver.ExecutorMetrics.ProcessTreePythonVMemory||
|spark.local-\*.driver.HiveExternalCatalog.fileCacheHits.\*|Statistics: count|
|spark.local-\*.driver.HiveExternalCatalog.filesDiscovered.\*|Statistics: count|
|spark.local-\*.driver.HiveExternalCatalog.hiveClientCalls.\*|Statistics: count|
|spark.local-\*.driver.HiveExternalCatalog.parallelListingJobCount.\*|Statistics: count|
|spark.local-\*.driver.HiveExternalCatalog.partitionsFetched.\*|Statistics: count|
|spark.local-*.driver.JVMCPU.jvmCpuTime||
|spark.local-\*.driver.LiveListenerBus.listenerProcessingTime.org.apache.spark.HeartbeatReceiver.\*|Statistics: count, m15_rate, m1_rate, m5_rate, max, mean, mean_rate, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.LiveListenerBus.listenerProcessingTime.org.apache.spark.sql.execution.ui.SQLAppStatusListener.\*|Statistics: count, m15_rate, m1_rate, m5_rate, max, mean, mean_rate, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.LiveListenerBus.listenerProcessingTime.org.apache.spark.sql.util.ExecutionListenerBus.\*|Statistics: count, m15_rate, m1_rate, m5_rate, max, mean, mean_rate, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.LiveListenerBus.listenerProcessingTime.org.apache.spark.status.AppStatusListener.\*|Statistics: count, m15_rate, m1_rate, m5_rate, max, mean, mean_rate, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.LiveListenerBus.numEventsPosted.\*|Statistics: count|
|spark.local-\*.driver.LiveListenerBus.queue.appStatus.listenerProcessingTime.\*|Statistics: count, m15_rate, m1_rate, m5_rate, max, mean, mean_rate, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.LiveListenerBus.queue.appStatus.numDroppedEvents.\*|Statistics: count|
|spark.local-*.driver.LiveListenerBus.queue.appStatus.size||
|spark.local-\*.driver.LiveListenerBus.queue.executorManagement.listenerProcessingTime.\*|Statistics: count, m15_rate, m1_rate, m5_rate, max, mean, mean_rate, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.LiveListenerBus.queue.executorManagement.numDroppedEvents.\*|Statistics: count|
|spark.local-*.driver.LiveListenerBus.queue.executorManagement.size||
|spark.local-\*.driver.LiveListenerBus.queue.shared.listenerProcessingTime.\*|Statistics: count, m15_rate, m1_rate, m5_rate, max, mean, mean_rate, min, p50, p75, p95, p98, p99, p999, stddev|
|spark.local-\*.driver.LiveListenerBus.queue.shared.numDroppedEvents.\*|Statistics: count|
|spark.local-*.driver.LiveListenerBus.queue.shared.size||
|spark.local-\*.driver.executor.bytesRead.\*|Statistics: count|
|spark.local-\*.driver.executor.bytesWritten.\*|Statistics: count|
|spark.local-\*.driver.executor.cpuTime.\*|Statistics: count|
|spark.local-\*.driver.executor.deserializeCpuTime.\*|Statistics: count|
|spark.local-\*.driver.executor.deserializeTime.\*|Statistics: count|
|spark.local-\*.driver.executor.diskBytesSpilled.\*|Statistics: count|
|spark.local-*.driver.executor.filesystem.file.largeRead_ops||
|spark.local-*.driver.executor.filesystem.file.read_bytes||
|spark.local-*.driver.executor.filesystem.file.read_ops||
|spark.local-*.driver.executor.filesystem.file.write_bytes||
|spark.local-*.driver.executor.filesystem.file.write_ops||
|spark.local-*.driver.executor.filesystem.hdfs.largeRead_ops||
|spark.local-*.driver.executor.filesystem.hdfs.read_bytes||
|spark.local-*.driver.executor.filesystem.hdfs.read_ops||
|spark.local-*.driver.executor.filesystem.hdfs.write_bytes||
|spark.local-*.driver.executor.filesystem.hdfs.write_ops||
|spark.local-\*.driver.executor.jvmGCTime.\*|Statistics: count|
|spark.local-\*.driver.executor.memoryBytesSpilled.\*|Statistics: count|
|spark.local-\*.driver.executor.recordsRead.\*|Statistics: count|
|spark.local-\*.driver.executor.recordsWritten.\*|Statistics: count|
|spark.local-\*.driver.executor.resultSerializationTime.\*|Statistics: count|
|spark.local-\*.driver.executor.resultSize.\*|Statistics: count|
|spark.local-\*.driver.executor.runTime.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleBytesWritten.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleFetchWaitTime.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleLocalBlocksFetched.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleLocalBytesRead.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleRecordsRead.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleRecordsWritten.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleRemoteBlocksFetched.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleRemoteBytesRead.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleRemoteBytesReadToDisk.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleTotalBytesRead.\*|Statistics: count|
|spark.local-\*.driver.executor.shuffleWriteTime.\*|Statistics: count|
|spark.local-\*.driver.executor.succeededTasks.\*|Statistics: count|
|spark.local-*.driver.executor.threadpool.activeTasks||
|spark.local-*.driver.executor.threadpool.completeTasks||
|spark.local-*.driver.executor.threadpool.currentPool_size||
|spark.local-*.driver.executor.threadpool.maxPool_size||
|spark.local-*.driver.executor.threadpool.startedTasks||
|spark.local-\*.driver.jvm.G1-Old-Generation.\*|Statistics: count|
|spark.local-*.driver.jvm.G1-Old-Generation.time||
|spark.local-\*.driver.jvm.G1-Young-Generation.\*|Statistics: count|
|spark.local-*.driver.jvm.G1-Young-Generation.time||
|spark.local-\*.driver.jvm.direct.\*|Statistics: count, used|
|spark.local-*.driver.jvm.direct.capacity||
|spark.local-\*.driver.jvm.heap.\*|Statistics: committed, init, max, used|
|spark.local-*.driver.jvm.heap.usage||
|spark.local-\*.driver.jvm.mapped.\*|Statistics: count, used|
|spark.local-*.driver.jvm.mapped.capacity||
|spark.local-\*.driver.jvm.non-heap.\*|Statistics: committed, init, max, used|
|spark.local-*.driver.jvm.non-heap.usage||
|spark.local-\*.driver.jvm.pools.Compressed-Class-Space.\*|Statistics: committed, init, max, used|
|spark.local-*.driver.jvm.pools.Compressed-Class-Space.usage||
|spark.local-\*.driver.jvm.pools.G1-Eden-Space.\*|Statistics: committed, init, max, used|
|spark.local-*.driver.jvm.pools.G1-Eden-Space.usage||
|spark.local-*.driver.jvm.pools.G1-Eden-Space.used-after-gc||
|spark.local-\*.driver.jvm.pools.G1-Old-Gen.\*|Statistics: committed, init, max, used|
|spark.local-*.driver.jvm.pools.G1-Old-Gen.usage||
|spark.local-*.driver.jvm.pools.G1-Old-Gen.used-after-gc||
|spark.local-\*.driver.jvm.pools.G1-Survivor-Space.\*|Statistics: committed, init, max, used|
|spark.local-*.driver.jvm.pools.G1-Survivor-Space.usage||
|spark.local-*.driver.jvm.pools.G1-Survivor-Space.used-after-gc||
|spark.local-\*.driver.jvm.pools.Metaspace.\*|Statistics: committed, init, max, used|
|spark.local-*.driver.jvm.pools.Metaspace.usage||
|spark.local-\*.driver.jvm.total.\*|Statistics: committed, init, max, used|
|spark.master.aliveWorkers|The number of alive workers in the Spark cluster. A worker in the ALIVE state can accept applications.|
|spark.master.apps|The number of active applications  that run on the Spark infrastructure.|
|spark.master.waitingApps|The number of waiting applications.|
|spark.master.workers|The total number of workers.|
|spark.worker.coresFree|The number of free CPU cores, which are unused.|
|spark.worker.coresUsed|The number of used CPU cores.|
|spark.worker.executors|The number of active executors.|
|spark.worker.memFree_MB|The total free memory in the Worker node in MB.|
|spark.worker.memUsed_MB|The total memory used by the Worker node in MB.|


