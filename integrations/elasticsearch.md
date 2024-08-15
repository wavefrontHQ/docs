---
title: Elasticsearch Integration
tags: [integrations list]
permalink: elasticsearch.html
summary: Learn about the Elasticsearch Integration.
---

This page provides an overview of what you can do with the Elasticsearch integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Elasticsearch integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Elasticsearch** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Elasticsearch Integration

Elasticsearch is a distributed, RESTful search and analytics engine. This integration installs and configures Telegraf to send Elasticsearch metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard for monitoring an Elasticsearch cluster.  Here's a screenshot of that dashboard:

{% include image.md src="images/Elasticsearch_dashboard_screenshot.png" width="80" %}



## Metrics


|Metric Name|Description|
| :--- | :--- |
|elasticsearch.breakers.accounting.*|Metrics for field data circuit breaker accounting. |
|elasticsearch.breakers.accounting.estimated.size.in.bytes|Metrics for field data circuit breaker accounting. |
|elasticsearch.breakers.accounting.limit.size.in.bytes||
|elasticsearch.breakers.accounting.overhead||
|elasticsearch.breakers.accounting.tripped||
|elasticsearch.breakers.fielddata.*|Metrics for field data circuit breaker field data.|
|elasticsearch.breakers.fielddata.estimated.size.in.bytes||
|elasticsearch.breakers.fielddata.limit.size.in.bytes|.|
|elasticsearch.breakers.fielddata.overhead||
|elasticsearch.breakers.fielddata.tripped||
|elasticsearch.breakers.in.flight.requests.*|Metrics for circuit breaker in flight requests.|
|elasticsearch.breakers.in.flight.requests.estimated.size.in.bytes   |   |
|elasticsearch.breakers.in.flight.requests.limit.size.in.bytes||
|elasticsearch.breakers.in.flight.requests.overhead||
|elasticsearch.breakers.in.flight.requests.tripped||
|elasticsearch.breakers.parent.*|Metrics for  circuit breaker parent.|
|estimated.size.in.bytes| |
|elasticsearch.breakers.parent.limit.size.in.bytes||
|elasticsearch.breakers.parent.overhead||
|elasticsearch.breakers.parent.tripped||
|elasticsearch.breakers.request.*|Metrics for circuit breaker requests.|
|elasticsearch.breakers.estimated.size.in.bytes|   |
|elasticsearch.breakers.request.limit.size.in.bytes||
|elasticsearch.breakers.request.overhead||
|elasticsearch.breakers.request.tripped|.|
|elasticsearch.cluster.health.*|Cluster health metrics |
|elasticsearch.cluster.health.active.primary.shards||
|elasticsearch.cluster.health.active.shards||
|elasticsearch.cluster.health.active.shards.percent.as.number||
|elasticsearch.cluster.health.delayed.unassigned.shards||
|elasticsearch.cluster.health.initializing.shards||
|elasticsearch.cluster.health.number.of.data.nodes||
|elasticsearch.cluster.health.number.of.in.flight.fetch||
|elasticsearch.cluster.health.number.of.nodes||
|elasticsearch.cluster.health.number.of.pending.tasks||
|elasticsearch.cluster.health.relocating.shards||
|elasticsearch.cluster.health.status.code||
|elasticsearch.cluster.health.task.max.waiting.in.queue.millis||
|elasticsearch.cluster.health.timed.out||
|elasticsearch.cluster.health.unassigned.shards||
|elasticsearch.clusterstats.indices.*|Basic metrics for cluster statistic indices|
|elasticsearch.clusterstats.indices.count||
|elasticsearch.clusterstats.indices.completion.size.in.bytes||
|elasticsearch.clusterstats.indices.docs.count||
|elasticsearch.clusterstats.indices.docs.deleted||
|elasticsearch.clusterstats.indices.fielddata.evictions||
|elasticsearch.clusterstats.indices.fielddata.memory.size.in.bytes||
|elasticsearch.clusterstats.indices.query.cache.cache.*|Metrics for query cache indices|
|elasticsearch.clusterstats.indices.query.cache.cache.count||
|elasticsearch.clusterstats.indices.query.cache.cache.size||
|elasticsearch.clusterstats.indices.query.cache.evictions||
|elasticsearch.clusterstats.indices.query.cache.hit.count||
|elasticsearch.clusterstats.indices.query.cache.memory.size.in.bytes||
|elasticsearch.clusterstats.indices.query.cache.miss.count||
|elasticsearch.clusterstats.indices.query.cache.total.count||
|elasticsearch.clusterstats.indices.segments.*|Metrics for cluster statistic index segments. |
|elasticsearch.clusterstats.indices.segments.count||
|elasticsearch.clusterstats.indices.segments.doc.values.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.fixed.bit.set.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.index.writer.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.max.unsafe.auto.id.timestamp||
|elasticsearch.clusterstats.indices.segments.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.norms.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.points.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.stored.fields.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.term.vectors.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.terms.memory.in.bytes||
|elasticsearch.clusterstats.indices.segments.version.map.memory.in.bytes||
|elasticsearch.clusterstats.indices.shards.index.primaries.*|Metrics for cluster shards.|
|elasticsearch.clusterstats.indices.shards.index.primaries.max||
|elasticsearch.clusterstats.indices.shards.index.primaries.min||
|elasticsearch.clusterstats.indices.shards.index.primaries.avg||
|elasticsearch.clusterstats.indices.shards.index.replication.max||
|elasticsearch.clusterstats.indices.shards.index.replication.min||
|elasticsearch.clusterstats.indices.shards.index.replication.avg||
|elasticsearch.clusterstats.indices.shards.index.shards.max||
|elasticsearch.clusterstats.indices.shards.index.shards.min||
|elasticsearch.clusterstats.indices.shards.index.shards.avg||
|elasticsearch.clusterstats.indices.shards.primaries||
|elasticsearch.clusterstats.indices.shards.replication||
|elasticsearch.clusterstats.indices.shards.total||
|elasticsearch.clusterstats.indices.store.size.in.bytes|Cluster index store, in bytes.|
|elasticsearch.clusterstats.nodes.count.*|Cluster statistics per node.|
|elasticsearch.clusterstats.nodes.count.coordinating.only||
|elasticsearch.clusterstats.nodes.count.data||
|elasticsearch.clusterstats.nodes.count.ingest||
|elasticsearch.clusterstats.nodes.count.master||
|elasticsearch.clusterstats.nodes.count.total||
|elasticsearch.clusterstats.nodes.fs.|Cluster filesystem metrics per node.|
|elasticsearch.clusterstats.nodes.fs.available.in.bytes||
|elasticsearch.clusterstats.nodes.fs.free.in.bytes||
|elasticsearch.clusterstats.nodes.fs.total.in.bytes||
|elasticsearch.clusterstats.nodes.jvm.*|Cluster JVM metrics per node.|
|elasticsearch.clusterstats.nodes.jvm.max.uptime.in.millis||
|elasticsearch.clusterstats.nodes.jvm.mem.heap.max.in.bytes||
|elasticsearch.clusterstats.nodes.jvm.mem.heap.used.in.bytes||
|elasticsearch.clusterstats.nodes.jvm.threads||
|elasticsearch.clusterstats.nodes.jvm.versions.0.count||
|elasticsearch.clusterstats.nodes.network.types.*|Cluster network type metrics per node.|
|elasticsearch.clusterstats.nodes.network.types.http.types.security4||
|elasticsearch.clusterstats.nodes.network.types.transport.types.security4||
|elasticsearch.clusterstats.nodes.os.*|Cluster OS metrics per node.|
|elasticsearch.clusterstats.nodes.os.allocated.processors||
|elasticsearch.clusterstats.nodes.os.available.processors||
|elasticsearch.clusterstats.nodes.os.mem.free.in.bytes||
|elasticsearch.clusterstats.nodes.os.mem.free.percent||
|elasticsearch.clusterstats.nodes.os.mem.total.in.bytes||
|elasticsearch.clusterstats.nodes.os.mem.used.in.bytes||
|elasticsearch.clusterstats.nodes.os.mem.used.percent||
|elasticsearch.clusterstats.nodes.os.names.0.count||
|elasticsearch.clusterstats.nodes.os.pretty.names.0.count||
|elasticsearch.clusterstats.nodes.plugins.*|Cluster metrics per plugin. |
|elasticsearch.clusterstats.nodes.plugins.0.has.native.controller||
|elasticsearch.clusterstats.nodes.plugins.1.has.native.controller||
|elasticsearch.clusterstats.nodes.plugins.2.has.native.controller||
|elasticsearch.clusterstats.nodes.plugins.3.has.native.controller||
|elasticsearch.clusterstats.nodes.process.cpu.percent||
|elasticsearch.clusterstats.nodes.process.open.file.descriptors.max||
|elasticsearch.clusterstats.nodes.process.open.file.descriptors.min||
|elasticsearch.clusterstats.nodes.process.open.file.descriptors.avg||
|elasticsearch.fs.*|File system metrics|
|elasticsearch.fs.data.0.available.in.bytes||
|elasticsearch.fs.data.0.free.in.bytes||
|elasticsearch.fs.data.0.total.in.bytes||
|elasticsearch.fs.io.stats.devices.0.operations||
|elasticsearch.fs.io.stats.devices.0.read.kilobytes||
|elasticsearch.fs.io.stats.devices.0.read.operations||
|elasticsearch.fs.io.stats.devices.0.write.kilobytes||
|elasticsearch.fs.io.stats.devices.0.write.operations||
|elasticsearch.fs.io.stats.total.operations||
|elasticsearch.fs.io.stats.total.read.kilobytes||
|elasticsearch.fs.io.stats.total.read.operations||
|elasticsearch.fs.io.stats.total.write.kilobytes||
|elasticsearch.fs.io.stats.total.write.operations||
|elasticsearch.fs.least.usage.estimate.available.in.bytes||
|elasticsearch.fs.least.usage.estimate.total.in.bytes||
|elasticsearch.fs.least.usage.estimate.used.disk.percent||
|elasticsearch.fs.most.usage.estimate.available.in.bytes||
|elasticsearch.fs.most.usage.estimate.total.in.bytes||
|elasticsearch.fs.most.usage.estimate.used.disk.percent||
|elasticsearch.fs.timestamp||
|elasticsearch.fs.total.available.in.bytes||
|elasticsearch.fs.total.free.in.bytes||
|elasticsearch.fs.total.total.in.bytes||
|elasticsearch.http.current.open|Number of HTTP connections currently open.|
|elasticsearch.http.total.opened|Total number of HTTP connections that have been opened. |
|elasticsearch.indices.completion.size.in.bytes|Completion size for indices|
|elasticsearch.indices.docs.count|Number of index docs|
|elasticsearch.indices.docs.deleted|Number of deleted index docs. |
|elasticsearch.indices.fielddata.evictions|Number of evictions from fielddata cache (cumulative).|
|elasticsearch.indices.fielddata.memory.size.in.bytes|Size of fielddata cache. |
|elasticsearch.indices.flush.periodic|How log to wait befor triggering a flush. |
|elasticsearch.indices.flush.total|Number of index flushes to disk (cumulative).|
|elasticsearch.indices.flush.total.time.in.millis|Time spent flushing the index to disk. |
|elasticsearch.indices.get.*|Retrieved index metrics.|
|elasticsearch.indices.get.current||
|elasticsearch.indices.get.exists.time.in.millis||
|elasticsearch.indices.get.exists.total||
|elasticsearch.indices.get.missing.time.in.millis||
|elasticsearch.indices.get.missing.total||
|elasticsearch.indices.get.time.in.millis||
|elasticsearch.indices.get.total||
|elasticsearch.indices.indexing.*|Metrics about the indexing process.|
|elasticsearch.indices.indexing.delete.current| |
|elasticsearch.indices.indexing.delete.time.in.millis| |
|elasticsearch.indices.indexing.delete.total||
|elasticsearch.indices.indexing.index.current||
|elasticsearch.indices.indexing.index.failed||
|elasticsearch.indices.indexing.index.time.in.millis||
|elasticsearch.indices.indexing.index.total||
|elasticsearch.indices.indexing.noop.update.total| |
|elasticsearch.indices.indexing.throttle.time.in.millis||
|elasticsearch.indices.merges.*|Merge-related metrics.|
|elasticsearch.indices.merges.current||
|elasticsearch.indices.merges.current.docs||
|elasticsearch.indices.merges.current.size.in.bytes| |
|elasticsearch.indices.merges.total||
|elasticsearch.indices.merges.total.auto.throttle.in.bytes||
|elasticsearch.indices.merges.total.docs| |
|elasticsearch.indices.merges.total.size.in.bytes||
|elasticsearch.indices.merges.total.stopped.time.in.millis||
|elasticsearch.indices.merges.total.throttled.time.in.millis||
|elasticsearch.indices.merges.total.time.in.millis||
|elasticsearch.indices.query.cache.*|Query cache related metrics.|
|elasticsearch.indices.query.cache.cache.count||
|elasticsearch.indices.query.cache.cache.size||
|elasticsearch.indices.query.cache.evictions||
|elasticsearch.indices.query.cache.hit.count||
|elasticsearch.indices.query.cache.memory.size.in.bytes||
|elasticsearch.indices.query.cache.miss.count| |
|elasticsearch.indices.query.cache.total.count||
|elasticsearch.indices.recovery.*|Metrics releated to recoveries such as number of recoveries for which a shard serves as a target or total time recoveries waited because of throttling.|
|elasticsearch.indices.recovery.current.as.source||
|elasticsearch.indices.recovery.current.as.target||
|elasticsearch.indices.recovery.throttle.time.in.millis||
|elasticsearch.indices.refresh.*|Metrics related to refreshes such as the total time spent on index refreshes.|
|elasticsearch.indices.refresh.listeners||
|elasticsearch.indices.refresh.total||
|elasticsearch.indices.refresh.total.time.in.millis||
|elasticsearch.indices.request.cache.*|Metrics related to the request cache. |
|elasticsearch.indices.request.cache.evictions||
|elasticsearch.indices.request.cache.hit.count||
|elasticsearch.indices.request.cache.memory.size.in.bytes||
|elasticsearch.indices.request.cache.miss.count| |
|elasticsearch.indices.search.fetch.current|Metrics related to searches.|
|elasticsearch.indices.search.fetch.current||
|elasticsearch.indices.search.fetch.time.in.millis||
|elasticsearch.indices.search.fetch.total| |
|elasticsearch.indices.search.open.contexts| |
|elasticsearch.indices.search.query.current| |
|elasticsearch.indices.search.query.time.in.millis||
|elasticsearch.indices.search.query.total||
|elasticsearch.indices.search.scroll.current| |
|elasticsearch.indices.search.scroll.time.in.millis||
|elasticsearch.indices.search.scroll.total||
|elasticsearch.indices.search.suggest.current||
|elasticsearch.indices.search.suggest.time.in.millis||
|elasticsearch.indices.search.suggest.total||
|elasticsearch.indices.segments.*|Metrics for index segments.|
|elasticsearch.indices.segments.count||
|elasticsearch.indices.segments.doc.values.memory.in.bytes||
|elasticsearch.indices.segments.fixed.bit.set.memory.in.bytes||
|elasticsearch.indices.segments.index.writer.memory.in.bytes||
|elasticsearch.indices.segments.max.unsafe.auto.id.timestamp||
|elasticsearch.indices.segments.memory.in.bytes||
|elasticsearch.indices.segments.norms.memory.in.bytes||
|elasticsearch.indices.segments.points.memory.in.bytes||
|elasticsearch.indices.segments.stored.fields.memory.in.bytes||
|elasticsearch.indices.segments.term.vectors.memory.in.bytes||
|elasticsearch.indices.segments.terms.memory.in.bytes||
|elasticsearch.indices.segments.version.map.memory.in.bytes||
|elasticsearch.indices.stats.primaries.completion.size.in.bytes|Completion size for the primary shards.|
|elasticsearch.indices.stats.primaries.docs.count|Number of docs for the primary shards.|
|elasticsearch.indices.stats.primaries.docs.deleted|Number of deleted docs for the primary shards.|
|elasticsearch.indices.stats.primaries.fielddata.evictions|Field data evictions for the primary shards. |
|elasticsearch.indices.stats.primaries.fielddata.memory.size.in.bytes|Field data memory size for the primary shard. |
|elasticsearch.indices.stats.primaries.flush.*|Metrics about flush operations for the primary shards.|
|elasticsearch.indices.stats.primaries.flush.periodic||
|elasticsearch.indices.stats.primaries.flush.total||
|elasticsearch.indices.stats.primaries.flush.total.time.in.millis||
|elasticsearch.indices.stats.primaries.get.*|Metrics about the current primary shards. |
|elasticsearch.indices.stats.primaries.get.current||
|elasticsearch.indices.stats.primaries.get.exists.time.in.millis||
|elasticsearch.indices.stats.primaries.get.exists.total||
|elasticsearch.indices.stats.primaries.get.missing.time.in.millis||
|elasticsearch.indices.stats.primaries.get.missing.total||
|elasticsearch.indices.stats.primaries.get.time.in.millis||
|elasticsearch.indices.stats.primaries.get.total||
|elasticsearch.indices.stats.primaries.indexing.*|Metrics about indexing in the primary shards.|
|elasticsearch.indices.stats.primaries.indexing.delete.current||
|elasticsearch.indices.stats.primaries.indexing.delete.time.in.millis||
|elasticsearch.indices.stats.primaries.indexing.delete.total||
|elasticsearch.indices.stats.primaries.indexing.index.current||
|elasticsearch.indices.stats.primaries.indexing.index.failed||
|elasticsearch.indices.stats.primaries.indexing.index.time.in.millis||
|elasticsearch.indices.stats.primaries.indexing.index.total||
|elasticsearch.indices.stats.primaries.indexing.is.throttled||
|elasticsearch.indices.stats.primaries.indexing.noop.update.total||
|elasticsearch.indices.stats.primaries.indexing.throttle.time.in.millis||
|elasticsearch.indices.stats.primaries.merges.*|Merge metrics for primary shards. |
|elasticsearch.indices.stats.primaries.merges.current||
|elasticsearch.indices.stats.primaries.merges.current.docs||
|elasticsearch.indices.stats.primaries.merges.current.size.in.bytes||
|elasticsearch.indices.stats.primaries.merges.total||
|elasticsearch.indices.stats.primaries.merges.total.auto.throttle.in.bytes||
|elasticsearch.indices.stats.primaries.merges.total.docs||
|elasticsearch.indices.stats.primaries.merges.total.size.in.bytes||
|elasticsearch.indices.stats.primaries.merges.total.stopped.time.in.millis||
|elasticsearch.indices.stats.primaries.merges.total.throttled.time.in.millis||
|elasticsearch.indices.stats.primaries.merges.total.time.in.millis||
|elasticsearch.indices.stats.primaries.query.cache.*|Query cache metrics for the primary shards. |
|elasticsearch.indices.stats.primaries.query.cache.cache.count||
|elasticsearch.indices.stats.primaries.query.cache.cache.size||
|elasticsearch.indices.stats.primaries.query.cache.evictions||
|elasticsearch.indices.stats.primaries.query.cache.hit.count||
|elasticsearch.indices.stats.primaries.query.cache.memory.size.in.bytes||
|elasticsearch.indices.stats.primaries.query.cache.miss.count||
|elasticsearch.indices.stats.primaries.query.cache.total.count||
|elasticsearch.indices.stats.primaries.recovery.*|Recovery metrics for the primary shards.|
|elasticsearch.indices.stats.primaries.recovery.current.as.source||
|elasticsearch.indices.stats.primaries.recovery.current.as.target||
|elasticsearch.indices.stats.primaries.recovery.throttle.time.in.millis||
|elasticsearch.indices.stats.primaries.refresh.*|Refresh metrics for the primary shards.|
|elasticsearch.indices.stats.primaries.refresh.listeners||
|elasticsearch.indices.stats.primaries.refresh.total||
|elasticsearch.indices.stats.primaries.refresh.total.time.in.millis||
|elasticsearch.indices.stats.primaries.request.cache.*|Request cache metrics for the primary shards.|
|elasticsearch.indices.stats.primaries.request.cache.evictions||
|elasticsearch.indices.stats.primaries.request.cache.hit.count||
|elasticsearch.indices.stats.primaries.request.cache.memory.size.in.bytes||
|elasticsearch.indices.stats.primaries.request.cache.miss.count||
|elasticsearch.indices.stats.primaries.search.fetch.*|Metrix for search indices on primary shards. |
|elasticsearch.indices.stats.primaries.search.fetch.current||
|elasticsearch.indices.stats.primaries.search.fetch.time.in.millis||
|elasticsearch.indices.stats.primaries.search.fetch.total||
|elasticsearch.indices.stats.primaries.search.open.contexts||
|elasticsearch.indices.stats.primaries.search.query.*|Metrics for search query indices on primary shards.|
|elasticsearch.indices.stats.primaries.search.query.current||
|elasticsearch.indices.stats.primaries.search.query.time.in.millis||
|elasticsearch.indices.stats.primaries.search.query.total||
|elasticsearch.indices.stats.primaries.search.scroll.*|Metrics for scroll indices on primary shards.|
|elasticsearch.indices.stats.primaries.search.scroll.current||
|elasticsearch.indices.stats.primaries.search.scroll.time.in.millis||
|elasticsearch.indices.stats.primaries.search.scroll.total||
|elasticsearch.indices.stats.primaries.search.suggest.*|Suggester metrics for primary shards. Suggests similar looking terms based on a provided text by using a suggester. Parts of the suggest feature are still under development.|
|elasticsearch.indices.stats.primaries.search.suggest.current||
|elasticsearch.indices.stats.primaries.search.suggest.time.in.millis||
|elasticsearch.indices.stats.primaries.search.suggest.total||
|elasticsearch.indices.stats.primaries.segments.*|Segment metrics for primary shards.|
|elasticsearch.indices.stats.primaries.segments.count||
|elasticsearch.indices.stats.primaries.segments.doc.values.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.fixed.bit.set.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.index.writer.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.max.unsafe.auto.id.timestamp||
|elasticsearch.indices.stats.primaries.segments.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.norms.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.points.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.stored.fields.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.term.vectors.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.terms.memory.in.bytes||
|elasticsearch.indices.stats.primaries.segments.version.map.memory.in.bytes||
|elasticsearch.indices.stats.primaries.store.size.in.bytes|Store size for primary shards.|
|elasticsearch.indices.stats.primaries.translog.*|Transaction log metrics for primary shards.|
|elasticsearch.indices.stats.primaries.translog.earliest.last.modified.age||
|elasticsearch.indices.stats.primaries.translog.operations||
|elasticsearch.indices.stats.primaries.translog.size.in.bytes||
|elasticsearch.indices.stats.primaries.translog.uncommitted.operations||
|elasticsearch.indices.stats.primaries.translog.uncommitted.size.in.bytes||
|elasticsearch.indices.stats.primaries.warmer.*|Warmer metrics for primary shards.|
|elasticsearch.indices.stats.primaries.warmer.current||
|elasticsearch.indices.stats.primaries.warmer.total||
|elasticsearch.indices.stats.primaries.warmer.total.time.in.millis||
|elasticsearch.indices.stats.shards.total.*|Metrics for both primary and replica shards.|
|elasticsearch.indices.stats.shards.total.failed||
|elasticsearch.indices.stats.shards.total.successful||
|elasticsearch.indices.stats.shards.total.total||
|elasticsearch.indices.stats.total.completion.size.in.bytes|Completion size for both primary and replica shards.|
|elasticsearch.indices.stats.total.docs.*|Doc count and deleted docs for both primary and replica shards.|
|elasticsearch.indices.stats.total.docs.count||
|elasticsearch.indices.stats.total.docs.deleted||
|elasticsearch.indices.stats.total.fielddata.*|Field data metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.fielddata.evictions||
|elasticsearch.indices.stats.total.fielddata.memory.size.in.bytes||
|elasticsearch.indices.stats.total.flush.*|Flush metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.flush.periodic||
|elasticsearch.indices.stats.total.flush.total||
|elasticsearch.indices.stats.total.flush.total.time.in.millis||
|elasticsearch.indices.stats.total.get.*|Basic metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.get.current||
|elasticsearch.indices.stats.total.get.exists.time.in.millis||
|elasticsearch.indices.stats.total.get.exists.total||
|elasticsearch.indices.stats.total.get.missing.time.in.millis||
|elasticsearch.indices.stats.total.get.missing.total||
|elasticsearch.indices.stats.total.get.time.in.millis||
|elasticsearch.indices.stats.total.get.total||
|elasticsearch.indices.stats.total.indexing.*|Indexing metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.indexing.delete.current||
|elasticsearch.indices.stats.total.indexing.delete.time.in.millis||
|elasticsearch.indices.stats.total.indexing.delete.total||
|elasticsearch.indices.stats.total.indexing.index.current||
|elasticsearch.indices.stats.total.indexing.index.failed||
|elasticsearch.indices.stats.total.indexing.index.time.in.millis||
|elasticsearch.indices.stats.total.indexing.index.total||
|elasticsearch.indices.stats.total.indexing.is.throttled||
|elasticsearch.indices.stats.total.indexing.noop.update.total||
|elasticsearch.indices.stats.total.indexing.throttle.time.in.millis||
|elasticsearch.indices.stats.total.merges.*|Merge metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.merges.current||
|elasticsearch.indices.stats.total.merges.current.docs||
|elasticsearch.indices.stats.total.merges.current.size.in.bytes||
|elasticsearch.indices.stats.total.merges.total||
|elasticsearch.indices.stats.total.merges.total.auto.throttle.in.bytes||
|elasticsearch.indices.stats.total.merges.total.docs||
|elasticsearch.indices.stats.total.merges.total.size.in.bytes||
|elasticsearch.indices.stats.total.merges.total.stopped.time.in.millis||
|elasticsearch.indices.stats.total.merges.total.throttled.time.in.millis||
|elasticsearch.indices.stats.total.merges.total.time.in.millis||
|elasticsearch.indices.stats.total.query.cache.*|Query cache metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.query.cache.cache.size||
|elasticsearch.indices.stats.total.query.cache.evictions||
|elasticsearch.indices.stats.total.query.cache.hit.count||
|elasticsearch.indices.stats.total.query.cache.memory.size.in.bytes||
|elasticsearch.indices.stats.total.query.cache.miss.count||
|elasticsearch.indices.stats.total.query.cache.total.count||
|elasticsearch.indices.stats.total.recovery.*|Recovery metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.recovery.current.as.source||
|elasticsearch.indices.stats.total.recovery.current.as.target||
|elasticsearch.indices.stats.total.recovery.throttle.time.in.millis||
|elasticsearch.indices.stats.total.refresh.*|Refresh metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.refresh.listeners||
|elasticsearch.indices.stats.total.refresh.total||
|elasticsearch.indices.stats.total.refresh.total.time.in.millis||
|elasticsearch.indices.stats.total.request.cache.*|Request cache metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.request.cache.evictions||
|elasticsearch.indices.stats.total.request.cache.hit.count||
|elasticsearch.indices.stats.total.request.cache.memory.size.in.bytes||
|elasticsearch.indices.stats.total.request.cache.miss.count||
|elasticsearch.indices.stats.total.search.*|Search-related metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.search.fetch.current||
|elasticsearch.indices.stats.total.search.fetch.time.in.millis||
|elasticsearch.indices.stats.total.search.fetch.total||
|elasticsearch.indices.stats.total.search.open.contexts||
|elasticsearch.indices.stats.total.search.query.current||
|elasticsearch.indices.stats.total.search.query.time.in.millis||
|elasticsearch.indices.stats.total.search.query.total||
|elasticsearch.indices.stats.total.search.scroll.current||
|elasticsearch.indices.stats.total.search.scroll.time.in.millis||
|elasticsearch.indices.stats.total.search.scroll.total||
|elasticsearch.indices.stats.total.search.suggest.current||
|elasticsearch.indices.stats.total.search.suggest.time.in.millis||
|elasticsearch.indices.stats.total.search.suggest.total||
|elasticsearch.indices.stats.total.segments.*|Segment-related metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.segments.count||
|elasticsearch.indices.stats.total.segments.doc.values.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.fixed.bit.set.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.index.writer.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.max.unsafe.auto.id.timestamp||
|elasticsearch.indices.stats.total.segments.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.norms.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.points.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.stored.fields.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.term.vectors.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.terms.memory.in.bytes||
|elasticsearch.indices.stats.total.segments.version.map.memory.in.bytes||
|elasticsearch.indices.stats.total.store.size.in.bytes|Store size for both primary and replica shards.|
|elasticsearch.indices.stats.total.translog.*|Transaction log metrics for both primary and replica shards.|
|elasticsearch.indices.stats.total.translog.earliest.last.modified.age||
|elasticsearch.indices.stats.total.translog.operations||
|elasticsearch.indices.stats.total.translog.size.in.bytes||
|elasticsearch.indices.stats.total.translog.uncommitted.operations||
|elasticsearch.indices.stats.total.translog.uncommitted.size.in.bytes||
|elasticsearch.indices.store.size.in.bytes|Index store size in bytes.|
|elasticsearch.indices.translog.*|Transaction log metrics.|
|elasticsearch.indices.translog.earliest.last.modified.age||
|elasticsearch.indices.translog.operations||
|elasticsearch.indices.translog.size.in.bytes||
|elasticsearch.indices.translog.uncommitted.operations||
|elasticsearch.indices.translog.uncommitted.size.in.bytes||
|elasticsearch.jvm.buffer.pools.*|JVM buffer pool metrics.|
|elasticsearch.jvm.buffer.pools.direct.count||
|elasticsearch.jvm.buffer.pools.direct.total.capacity.in.bytes||
|elasticsearch.jvm.buffer.pools.direct.used.in.bytes||
|elasticsearch.jvm.buffer.pools.mapped.count||
|elasticsearch.jvm.buffer.pools.mapped.total.capacity.in.bytes||
|elasticsearch.jvm.buffer.pools.mapped.used.in.bytes||
|elasticsearch.jvm.classes.*|JVM class metrics. |
|elasticsearch.jvm.classes.current.loaded.count||
|elasticsearch.jvm.classes.total.loaded.count||
|elasticsearch.jvm.classes.total.unloaded.count||
|elasticsearch.jvm.gc.collectors.*|JVM garbage collection metrics.|
|elasticsearch.jvm.gc.collectors.old.collection.count||
|elasticsearch.jvm.gc.collectors.old.collection.time.in.millis||
|elasticsearch.jvm.gc.collectors.young.collection.count||
|elasticsearch.jvm.gc.collectors.young.collection.time.in.millis||
|elasticsearch.jvm.mem.heap.*|Metrics related to JVM heap. |
|elasticsearch.jvm.mem.heap.committed.in.bytes||
|elasticsearch.jvm.mem.heap.max.in.bytes||
|elasticsearch.jvm.mem.heap.used.in.bytes||
|elasticsearch.jvm.mem.heap.used.percent||
|elasticsearch.jvm.mem.non.heap.committed.in.bytes||
|elasticsearch.jvm.mem.non.heap.used.in.bytes||
|elasticsearch.jvm.mem.pools.*|Metrics related to JVM pools.|
|elasticsearch.jvm.mem.pools.old.max.in.bytes||
|elasticsearch.jvm.mem.pools.old.peak.max.in.bytes||
|elasticsearch.jvm.mem.pools.old.peak.used.in.bytes||
|elasticsearch.jvm.mem.pools.old.used.in.bytes||
|elasticsearch.jvm.mem.pools.survivor.max.in.bytes||
|elasticsearch.jvm.mem.pools.survivor.peak.max.in.bytes||
|elasticsearch.jvm.mem.pools.survivor.peak.used.in.bytes||
|elasticsearch.jvm.mem.pools.survivor.used.in.bytes||
|elasticsearch.jvm.mem.pools.young.max.in.bytes||
|elasticsearch.jvm.mem.pools.young.peak.max.in.bytes||
|elasticsearch.jvm.mem.pools.young.peak.used.in.bytes||
|elasticsearch.jvm.mem.pools.young.used.in.bytes||
|elasticsearch.jvm.threads.count|JVM thread count.|
|elasticsearch.jvm.threads.peak.count|JVM thread peak count. |
|elasticsearch.jvm.timestamp|JVM timestamp.|
|elasticsearch.jvm.uptime.in.millis|JVM uptime in milliseconds. |
|elasticsearch.os.cgroup.cpu.cfs.*|OS metrics for a control group for CFS (completely fair scheduler).|
|elasticsearch.os.cgroup.cpu.cfs.period.micros||
|elasticsearch.os.cgroup.cpu.cfs.quota.micros||
|elasticsearch.os.cgroup.cpu.stat.*|OS metrics for a control group. |
|elasticsearch.os.cgroup.cpu.stat.number.of.elapsed.periods||
|elasticsearch.os.cgroup.cpu.stat.number.of.times.throttled||
|elasticsearch.os.cgroup.cpu.stat.time.throttled.nanos||
|elasticsearch.os.cgroup.cpuacct.usage.nanos||
|elasticsearch.os.cpu.load.*|OS CPU load metrics.|
|elasticsearch.os.cpu.load.average.15m||
|elasticsearch.os.cpu.load.average.1m||
|elasticsearch.os.cpu.load.average.5m||
|elasticsearch.os.cpu.percent||
|elasticsearch.os.mem.*|OS memory metrics.|
|elasticsearch.os.mem.free.in.bytes||
|elasticsearch.os.mem.free.percent||
|elasticsearch.os.mem.total.in.bytes||
|elasticsearch.os.mem.used.in.bytes||
|elasticsearch.os.mem.used.percent||
|elasticsearch.os.swap.*|OS swap space metrics.|
|elasticsearch.os.swap.free.in.bytes||
|elasticsearch.os.swap.total.in.bytes||
|elasticsearch.os.swap.used.in.bytes||
|elasticsearch.os.timestamp|OS timestamp metrics.|
|elasticsearch.process.*|Process-specific metrics.|
|elasticsearch.process.cpu.percent||
|elasticsearch.process.cpu.total.in.millis||
|elasticsearch.process.max.file.descriptors||
|elasticsearch.process.mem.total.virtual.in.bytes||
|elasticsearch.process.open.file.descriptors||
|elasticsearch.process.timestamp||
|elasticsearch.thread.pool.*|Thread pool metrics.|
|elasticsearch.thread.pool.analyze.active||
|elasticsearch.thread.pool.analyze.completed||
|elasticsearch.thread.pool.analyze.largest||
|elasticsearch.thread.pool.analyze.queue||
|elasticsearch.thread.pool.analyze.rejected||
|elasticsearch.thread.pool.analyze.threads||
|elasticsearch.thread.pool.ccr.active||
|elasticsearch.thread.pool.ccr.completed||
|elasticsearch.thread.pool.ccr.largest||
|elasticsearch.thread.pool.ccr.queue||
|elasticsearch.thread.pool.ccr.rejected||
|elasticsearch.thread.pool.ccr.threads||
|elasticsearch.thread.pool.fetch.shard.started.*|Metrics for fetch_shard_started threadpool for listing shard states. Thread pool type is scaling with keep-alive of 5m and a default maximum size of 2 * # of available processors.|
|elasticsearch.thread.pool.fetch.shard.started.active||
|elasticsearch.thread.pool.fetch.shard.started.completed||
|elasticsearch.thread.pool.fetch.shard.started.largest||
|elasticsearch.thread.pool.fetch.shard.started.queue||
|elasticsearch.thread.pool.fetch.shard.started.rejected||
|elasticsearch.thread.pool.fetch.shard.started.threads||
|elasticsearch.thread.pool.fetch.shard.store.*|Metrics for fetch_shard_started threadpool for listing shard stores. Thread pool type is scaling with keep-alive of 5m and a default maximum size of 2 * # of available processors.|
|elasticsearch.thread.pool.fetch.shard.store.active||
|elasticsearch.thread.pool.fetch.shard.store.completed||
|elasticsearch.thread.pool.fetch.shard.store.largest||
|elasticsearch.thread.pool.fetch.shard.store.queue||
|elasticsearch.thread.pool.fetch.shard.store.rejected||
|elasticsearch.thread.pool.fetch.shard.store.threads||
|elasticsearch.thread.pool.flush.*|Metrics for flush thread pool (for flush, synced flush, and translog fsync operations.)|
|elasticsearch.thread.pool.flush.active||
|elasticsearch.thread.pool.flush.completed||
|elasticsearch.thread.pool.flush.largest||
|elasticsearch.thread.pool.flush.queue||
|elasticsearch.thread.pool.flush.rejected||
|elasticsearch.thread.pool.flush.threads||
|elasticsearch.thread.pool.force.merge.*|Metrics for force_merge threadpool for force merge operations. Thread pool type is fixed with a size of 1 and an unbounded queue size.  |
|elasticsearch.thread.pool.force.merge.active||
|elasticsearch.thread.pool.force.merge.completed||
|elasticsearch.thread.pool.force.merge.largest||
|elasticsearch.thread.pool.force.merge.queue||
|elasticsearch.thread.pool.force.merge.rejected||
|elasticsearch.thread.pool.force.merge.threads||
|elasticsearch.thread.pool.generic.*|Metrics for thread pool for generic operations (for example, background node discovery). Thread pool type is scaling. |
|elasticsearch.thread.pool.generic.active||
|elasticsearch.thread.pool.generic.completed||
|elasticsearch.thread.pool.generic.largest||
|elasticsearch.thread.pool.generic.queue||
|elasticsearch.thread.pool.generic.rejected||
|elasticsearch.thread.pool.generic.threads||
|elasticsearch.thread.pool.get.*|Metrics for thread pool for get operations. Thread pool type is fixed with a size of # of available processors, queue_size of 1000. |
|elasticsearch.thread.pool.get.active||
|elasticsearch.thread.pool.get.completed||
|elasticsearch.thread.pool.get.largest||
|elasticsearch.thread.pool.get.queue||
|elasticsearch.thread.pool.get.rejected||
|elasticsearch.thread.pool.get.threads||
|elasticsearch.thread.pool.index.*|Metrics for index thread pool.|
|elasticsearch.thread.pool.index.active||
|elasticsearch.thread.pool.index.completed||
|elasticsearch.thread.pool.index.largest||
|elasticsearch.thread.pool.index.queue||
|elasticsearch.thread.pool.index.rejected||
|elasticsearch.thread.pool.index.threads||
|elasticsearch.thread.pool.listener.*|Metrics for listener thread pool, which is mainly used for java client execution of action when listener threaded is set to true. Thread pool type is scaling with a default max of min(10, (# of available processors)/2). |
|elasticsearch.thread.pool.listener.active||
|elasticsearch.thread.pool.listener.completed||
|elasticsearch.thread.pool.listener.largest||
|elasticsearch.thread.pool.listener.queue||
|elasticsearch.thread.pool.listener.rejected||
|elasticsearch.thread.pool.listener.threads||
|elasticsearch.thread.pool.management.*|Metrics for management thread pool, which is used for cluster management. Thread pool type is scaling with a keep-alive of 5m and a default maximum size of 5.|
|elasticsearch.thread.pool.management.active||
|elasticsearch.thread.pool.management.completed||
|elasticsearch.thread.pool.management.largest||
|elasticsearch.thread.pool.management.queue||
|elasticsearch.thread.pool.management.rejected||
|elasticsearch.thread.pool.management.threads||
|elasticsearch.thread.pool.ml.autodetect.active|Metrics for ml (machine learning) thread pool.|
|elasticsearch.thread.pool.ml.autodetect.active||
|elasticsearch.thread.pool.ml.autodetect.completed||
|elasticsearch.thread.pool.ml.autodetect.largest||
|elasticsearch.thread.pool.ml.autodetect.queue||
|elasticsearch.thread.pool.ml.autodetect.rejected||
|elasticsearch.thread.pool.ml.autodetect.threads||
|elasticsearch.thread.pool.ml.datafeed.active||
|elasticsearch.thread.pool.ml.datafeed.completed||
|elasticsearch.thread.pool.ml.datafeed.largest||
|elasticsearch.thread.pool.ml.datafeed.queue||
|elasticsearch.thread.pool.ml.datafeed.rejected||
|elasticsearch.thread.pool.ml.datafeed.threads||
|elasticsearch.thread.pool.ml.utility.active||
|elasticsearch.thread.pool.ml.utility.completed||
|elasticsearch.thread.pool.ml.utility.largest||
|elasticsearch.thread.pool.ml.utility.queue||
|elasticsearch.thread.pool.ml.utility.rejected||
|elasticsearch.thread.pool.ml.utility.threads||
|elasticsearch.thread.pool.refresh.*|Metrics for refresh thread pool, which is used for refresh operations. Thread pool type is scaling with a keep-alive of 5m and a max of min(10, (# of available processors)/2). |
|elasticsearch.thread.pool.refresh.active||
|elasticsearch.thread.pool.refresh.completed||
|elasticsearch.thread.pool.refresh.largest||
|elasticsearch.thread.pool.refresh.queue||
|elasticsearch.thread.pool.refresh.rejected||
|elasticsearch.thread.pool.refresh.threads||
|elasticsearch.thread.pool.rollup.indexing.*|Thread pool associated with the experimental [Elasticsearch Rollup feature](https://www.elastic.co/guide/en/elasticsearch/reference/current/xpack-rollup.html).  |
|elasticsearch.thread.pool.rollup.indexing.active||
|elasticsearch.thread.pool.rollup.indexing.completed||
|elasticsearch.thread.pool.rollup.indexing.largest||
|elasticsearch.thread.pool.rollup.indexing.queue||
|elasticsearch.thread.pool.rollup.indexing.rejected||
|elasticsearch.thread.pool.rollup.indexing.threads||
|elasticsearch.thread.pool.search.*|Metrics for thread pool for count/search/suggest operations. Thread pool type is fixed_auto_queue_size with a size of `int((# of available_processors * 3) / 2)` + 1, and initial queue_size of 1000. |
|elasticsearch.thread.pool.search.active||
|elasticsearch.thread.pool.search.completed||
|elasticsearch.thread.pool.search.largest||
|elasticsearch.thread.pool.search.queue||
|elasticsearch.thread.pool.search.rejected||
|elasticsearch.thread.pool.search.threads||
|elasticsearch.thread.pool.search.throttled.active||
|elasticsearch.thread.pool.search.throttled.completed||
|elasticsearch.thread.pool.search.throttled.largest||
|elasticsearch.thread.pool.search.throttled.queue||
|elasticsearch.thread.pool.search.throttled.rejected||
|elasticsearch.thread.pool.search.throttled.threads||
|elasticsearch.thread.pool.security-token-key.*|Metrics for the security token thread pool. |
|elasticsearch.thread.pool.security-token-key.active||
|elasticsearch.thread.pool.security-token-key.completed||
|elasticsearch.thread.pool.security-token-key.largest||
|elasticsearch.thread.pool.security-token-key.queue||
|elasticsearch.thread.pool.security-token-key.rejected||
|elasticsearch.thread.pool.security-token-key.threads||
|elasticsearch.thread.pool.snapshot.*|Metrics for the thread pool used for snapshot/restore operations. Thread pool type is scaling with a keep-alive of 5m and a max of `min(5, (# of available processors)/2)`.|
|elasticsearch.thread.pool.snapshot.active||
|elasticsearch.thread.pool.snapshot.completed||
|elasticsearch.thread.pool.snapshot.largest||
|elasticsearch.thread.pool.snapshot.queue||
|elasticsearch.thread.pool.snapshot.rejected||
|elasticsearch.thread.pool.snapshot.threads||
|elasticsearch.thread.pool.warmer.*|Metrics for the warmer thread pool.|
|elasticsearch.thread.pool.warmer.active||
|elasticsearch.thread.pool.warmer.completed||
|elasticsearch.thread.pool.warmer.largest||
|elasticsearch.thread.pool.warmer.queue||
|elasticsearch.thread.pool.warmer.rejected||
|elasticsearch.thread.pool.warmer.threads||
|elasticsearch.thread.pool.watcher.*|Metrics for the watcher thread pool.|
|elasticsearch.thread.pool.watcher.active||
|elasticsearch.thread.pool.watcher.completed||
|elasticsearch.thread.pool.watcher.largest||
|elasticsearch.thread.pool.watcher.queue||
|elasticsearch.thread.pool.watcher.rejected||
|elasticsearch.thread.pool.watcher.threads||
|elasticsearch.thread.pool.write.*|Metrics for the write thread pool, which is used for single-document index/delete/update and bulk requests. Thread pool type is fixed with a size of # of available processors, queue_size of 200. The maximum size for this pool is 1 + # of available processors. |
|elasticsearch.thread.pool.write.active||
|elasticsearch.thread.pool.write.completed||
|elasticsearch.thread.pool.write.largest||
|elasticsearch.thread.pool.write.queue||
|elasticsearch.thread.pool.write.rejected||
|elasticsearch.thread.pool.write.threads||
|elasticsearch.transport.*|Transport statistics about sent and received bytes in cluster communication. |
|elasticsearch.transport.rx.count||
|elasticsearch.transport.rx.size.in.bytes||
|elasticsearch.transport.server.open||
|elasticsearch.transport.tx.count||
|elasticsearch.transport.tx.size.in.bytes||

