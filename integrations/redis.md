---
title: Redis Integration
tags: [integrations list]
permalink: redis.html
summary: Learn about the Wavefront Redis Integration.
---
## Redis Integration

Redis is a popular open source, in-memory data store, used as a database, cache, and message broker. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams. By setting up this integration, you can send Redis metrics into Wavefront.

1. **Redis**: This integration installs and configures Telegraf to send Redis metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).
2. **Redis on Kubernetes**: This explains the configuration of Wavefront Collector for Kubernetes to scrape Redis metrics using auto-discovery with annotation based discovery.

In addition to setting up the metrics flow, this integration also installs dashboards:
  * Redis
  * Redis on Kubernetes

Here's a screenshot of a Redis on Kubernetes dashboard that displays Redis metrics:

{% include image.md src="images/redis-dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Redis Setup



### Step 1. Install the Telegraf Agent

This integration uses the Redis input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure Redis Input Plugin

Create a file called `redis.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.redis]]
  ## specify servers via a url matching:
  ##  [protocol://][:password]@address[:port]
  ##  e.g.
  ##    tcp://localhost:6379
  ##    tcp://:password@192.168.99.100
  ##
  ## If no servers are specified, then localhost is used as the host.
  ## If no port is specified, 6379 is used
  servers = ["tcp://your.redis.server:6379"]
```
{% endraw %}

To monitor multiple Redis instances, configure the `servers` parameter with the addresses of the Redis instances:{% raw %}
```
  servers = ["tcp://your.redis.server1:6379","tcp://your.redis.server2:6379","tcp://your.redis.server2_slave:6379"]
```
{% endraw %}  

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.

## Redis on Kubernetes

Redis Exporter tested version: v1.29.0

This integration uses the [annotation based discovery](https://github.com/wavefrontHQ/wavefront-collector-for-kubernetes/blob/master/docs/discovery.md#annotation-based-discovery) feature in Wavefront Collector to monitor Redis on Kubernetes. If you do not have the Wavefront Collector for Kubernetes installed, follow these instructions to add it to your cluster by using [Helm](https://docs.wavefront.com/kubernetes.html#kubernetes-quick-install-using-helm) or performing [Manual Installation](https://docs.wavefront.com/kubernetes.html#kubernetes-manual-install). You can check the status of the Wavefront Collector and Proxy if you are already monitoring the Kubernetes cluster on the `Setup` tab of the Kubernetes integration.

### Steps to Annotate Redis
1. Annotate the Redis pods so that they can be discovered by the Wavefront Collector, if not annotated. Assuming that the `port` is `9121`, run:{% raw %}
```
kubectl annotate pods <pod-name> prometheus.io/scrape=true prometheus.io/port=9121 prometheus.io/path=/metrics
```
{% endraw %}
**NOTE**: Make sure that auto discovery `enableDiscovery: true` and annotation based discovery `discovery.disable_annotation_discovery: false` are enabled in the Wavefront Collector. They should be enabled by default.






## Metrics


|Metric Name|Description|
| :--- | :--- |
|redis.active.defrag.*|Metrics for the `activedefrag` configuration. Accumulation of memory fragmentation can result in the system running out of memory and eventually cause a Redis server to crash. The activedefrag Redis configuration can help to reduce fragmentation.|
|redis.active.defrag.hits||
|redis.active.defrag.key.hits||
|redis.active.defrag.key.misses||
|redis.active.defrag.misses||
|redis.active.defrag.running||
|redis.allocator.*|Metrics for the memory allocator, including fragmentation bytes and ratio. |
|redis.allocator.active||
|redis.allocator.allocated||
|redis.allocator.frag.bytes||
|redis.allocator.frag.ratio||
|redis.allocator.resident||
|redis.allocator.rss.bytes||
|redis.allocator.rss.ratio||
|redis.aof.*|Metrics related to the AOF (append-only file) feature. When AOF is anabled, a node writes all comands that change cache data to an append only file.|
|redis.aof.base.size||
|redis.aof.buffer.length||
|redis.aof.current.rewrite.duration.sec.gauge||
|redis.aof.current.rewrite.time.sec||
|redis.aof.current.size||
|redis.aof.delayed.fsync||
|redis.aof.enabled||
|redis.aof.enabled.gauge||
|redis.aof.last.bgrewrite.status.gauge||
|redis.aof.last.cow.size||
|redis.aof.last.rewrite.duration.sec.gauge||
|redis.aof.last.rewrite.time.sec||
|redis.aof.last.write.status.gauge||
|redis.aof.pending.bio.fsync||
|redis.aof.pending.rewrite||
|redis.aof.rewrite.buffer.length||
|redis.aof.rewrite.in.progress||
|redis.aof.rewrite.in.progress.gauge||
|redis.aof.rewrite.scheduled||
|redis.aof.rewrite.scheduled.gauge||
|redis.blocked.*|Blocked client metrics.|
|redis.blocked.clients||
|redis.blocked.clients.gauge||
|redis.client.*|Metrics related to redis client input/output.|
|redis.client.biggest.input.buf.gauge||
|redis.client.longest.output.list.gauge||
|redis.client.recent.max.input.buffer||
|redis.client.recent.max.output.buffer||
|redis.clients||
|redis.cluster.*|Redis cluster metrics|
|redis.cluster.enabled||
|redis.cluster.enabled.gauge||
|redis.cmdstat.*|Redis command statistics.|
|redis.cmdstat.calls||
|redis.cmdstat.usec||
|redis.cmdstat.usec.per.call||
|redis.commands.*|statistics for commands processed by the server. |
|redis.commands.duration.seconds.total.gauge||
|redis.commands.processed.total.gauge||
|redis.commands.total.gauge||
|redis.config.*|Config information. |
|redis.config.maxclients.gauge||
|redis.config.maxmemory.gauge||
|redis.connected.*|Number of connected clients and replicas. |
|redis.connected.clients.gauge||
|redis.connected.slaves||
|redis.connected.slaves.gauge||
|redis.connections.received.total.gauge|Total connections received. |
|redis.db.*|DB key information:average TTL, expiring keys, and total keys.|
|redis.db.avg.ttl.seconds.gauge||
|redis.db.keys.expiring.gauge||
|redis.db.keys.gauge||
|redis.evicted.keys|Evicted key info.|
|redis.evicted.keys.total.gauge||
|redis.expired.*|Metrics for expired keys. |
|redis.expired.keys||
|redis.expired.keys.total.gauge||
|redis.expired.stale.perc||
|redis.expired.time.cap.reached.count||
|redis.exporter.*|Metrics related to the Redis exporter. |
|redis.exporter.build.info.gauge||
|redis.exporter.last.scrape.duration.seconds.gauge||
|redis.exporter.last.scrape.error.gauge||
|redis.exporter.scrapes.total.counter||
|redis.instance.info.gauge|Redis instance info.|
|redis.instantaneous.*|INFO stas for instantaneous input, output, and ops. |
|redis.instantaneous.input.kbps||
|redis.instantaneous.input.kbps.gauge||
|redis.instantaneous.ops.per.sec||
|redis.instantaneous.ops.per.sec.gauge||
|redis.instantaneous.output.kbps||
|redis.instantaneous.output.kbps.gauge||
|redis.keyspace.*|Redis keyspace metrics. |
|redis.keyspace.avg.ttl||
|redis.keyspace.expires||
|redis.keyspace.hitrate||
|redis.keyspace.hits||
|redis.keyspace.hits.total.gauge||
|redis.keyspace.keys||
|redis.keyspace.misses||
|redis.keyspace.misses.total.gauge||
|redis.last.slow.execution.duration.seconds.gauge|Last slow execution duration.|
|redis.latest.fork.usec|Latest fork metric.|
|redis.latest.fork.usec.gauge||
|redis.lazyfree.pending.objects|The number of objects waiting to be freed (as a result of calling UNLINK, or FLUSHDB and FLUSHALL with the ASYNC option)|
|redis.loading|Indicates if the load of a dump file is on-going|
|redis.loading.dump.file.gauge||
|redis.lru.clock|Clock incrementing every minute, for LRU management|
|redis.master.repl.offset|The server's current replication offset|
|redis.master.repl.offset.gauge.||
|redis.maxmemory|Value of the maxmemory configuration directive.|
|redis.mem.*|Memory-related metrics|
|redis.mem.aof.buffer||
|redis.mem.clients.normal||
|redis.mem.clients.slaves||
|redis.mem.fragmentation.bytes||
|redis.mem.fragmentation.ratio||
|redis.mem.not.counted.for.evict||
|redis.mem.replication.backlog||
|redis.memory.max.bytes.gauge||
|redis.memory.used.bytes.gauge||
|redis.memory.used.lua.bytes.gauge||
|redis.memory.used.peak.bytes.gauge||
|redis.memory.used.rss.bytes.gauge||
|redis.migrate.cached.sockets||
|redis.net.*|total number of bytes read from and written to the network.|
|redis.net.input.bytes.total.gauge||
|redis.net.output.bytes.total.gauge||
|redis.number.of.cached.scripts|Number of cached scripts.|
|redis.process.id.gauge|Process ID of the server process|
|redis.pubsub.*|Pub/sub channels and patterns with client subscriptions. |
|redis.pubsub.channels||
|redis.pubsub.channels.gauge||
|redis.pubsub.patterns||
|redis.pubsub.patterns.gauge||
|redis.rdb.*|Metrics related to RDB (Redis Database File).|
|redis.rdb.bgsave.in.progress||
|redis.rdb.bgsave.in.progress.gauge||
|redis.rdb.changes.since.last.save||
|redis.rdb.changes.since.last.save.gauge||
|redis.rdb.current.bgsave.duration.sec.gauge||
|redis.rdb.current.bgsave.time.sec||
|redis.rdb.last.bgsave.duration.sec.gauge||
|redis.rdb.last.bgsave.status.gauge||
|redis.rdb.last.bgsave.time.sec||
|redis.rdb.last.cow.size||
|redis.rdb.last.save.time||
|redis.rdb.last.save.time.elapsed||
|redis.rdb.last.save.timestamp.seconds.gauge||
|redis.rejected.*|Rejected connection metrics.|
|redis.rejected.connections||
|redis.rejected.connections.total.gauge||
|redis.repl.backlog.*|Metrics related to the replication backlog. |
|redis.repl.backlog.active||
|redis.repl.backlog.first.byte.offset||
|redis.repl.backlog.histlen||
|redis.repl.backlog.size||
|redis.replication.backlog.bytes.gauge||
|redis.rss.overhead.*|Metrics related to RSS (Resident Set Size) memory. |
|redis.rss.overhead.bytes||
|redis.rss.overhead.ratio||
|redis.second.repl.offset|Second replica offset. |
|redis.slowlog.*|Shows the log last ID and log length.|
|redis.slowlog.last.id.gauge||
|redis.slowlog.length.gauge||
|redis.start.time.seconds.gauge|Start time in seconds|
|redis.sync.*|Number of full resyncs with replicas, accepted partial resync requests, and denied partial resync requests|
|redis.sync.full||
|redis.sync.partial.ok||
|redis.sync.partial.err||
|redis.total.*|Some comprehensive metrics for the Redis server, e.g. total commands processed or total system memory.|
|redis.total.commands.processed||
|redis.total.connections.received||
|redis.total.net.input.bytes||
|redis.total.net.output.bytes||
|redis.total.system.memory||
|redis.total.system.memory.bytes.gauge||
|redis.up*|Uptime metrics.|
|redis.up.gauge||
|redis.uptime||
|redis.uptime.in.seconds.gauge||
|redis.used.cpu.*|Used CPU metrics|
|redis.used.cpu.sys||
|redis.used.cpu.sys.children||
|redis.used.cpu.sys.children.gauge||
|redis.used.cpu.sys.gauge||
|redis.used.cpu.user||
|redis.used.cpu.user.children||
|redis.used.cpu.user.children.gauge||
|redis.used.cpu.user.gauge||
|redis.used.*|Used memory metrics.|
|redis.used.memory||
|redis.used.memory.dataset||
|redis.used.memory.dataset.perc||
|redis.used.memory.lua||
|redis.used.memory.overhead||
|redis.used.memory.peak||
|redis.used.memory.peak.perc||
|redis.used.memory.rss||
|redis.used.memory.scripts||
|redis.used.memory.startup||

