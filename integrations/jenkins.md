---
title: Jenkins Integration
tags: [integrations list]
permalink: jenkins.html
summary: Learn about the Jenkins Integration.
---

This page provides an overview of what you can do with the Jenkins integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the Jenkins integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **Jenkins** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## Jenkins Integration

Jenkins is an open source automation server written in Java. It helps automate the software development process, supports continuous integration, and facilitates continuous delivery.

This integration uses the Prometheus plugin to get the data from Jenkins. It also installs and configures Telegraf to send Jenkins server metrics into Tanzu Observability. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Jenkins dashboard.

{% include image.md src="images/dashboard1.png" width="80" %}
{% include image.md src="images/dashboard2.png" width="80" %}




## Metrics


|Metric Name|Description|
| :--- | :--- |
|jenkins.default.jenkins.builds.duration.milliseconds.summary.*|Statistics: count, sum|
|jenkins.default.jenkins.builds.failed.build.count.counter|Failed build counter.|
|jenkins.default.jenkins.builds.last.build.duration.milliseconds.gauge||
|jenkins.default.jenkins.builds.last.build.result.gauge||
|jenkins.default.jenkins.builds.last.build.result.ordinal.gauge||
|jenkins.default.jenkins.builds.last.build.start.time.milliseconds.gauge||
|jenkins.default.jenkins.builds.last.build.tests.failing.gauge||
|jenkins.default.jenkins.builds.last.build.tests.skipped.gauge||
|jenkins.default.jenkins.builds.last.build.tests.total.gauge||
|jenkins.default.jenkins.builds.stage.duration.milliseconds.summary.*|Statistics: count, sum|
|jenkins.default.jenkins.builds.success.build.count.counter||
|jenkins.default.jenkins.up.gauge||
|jenkins.default.jenkins.uptime.gauge||
|jenkins.http.activeRequests.gauge||
|jenkins.http.requests.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.http.responseCodes.badRequest.total.counter||
|jenkins.http.responseCodes.created.total.counter||
|jenkins.http.responseCodes.forbidden.total.counter||
|jenkins.http.responseCodes.noContent.total.counter||
|jenkins.http.responseCodes.notFound.total.counter||
|jenkins.http.responseCodes.notModified.total.counter||
|jenkins.http.responseCodes.ok.total.counter||
|jenkins.http.responseCodes.other.total.counter||
|jenkins.http.responseCodes.serverError.total.counter||
|jenkins.http.responseCodes.serviceUnavailable.total.counter||
|jenkins.jenkins.executor.count.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.executor.count.value.gauge||
|jenkins.jenkins.executor.free.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.executor.free.value.gauge||
|jenkins.jenkins.executor.in.use.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.executor.in.use.value.gauge||
|jenkins.jenkins.health.check.count.gauge||
|jenkins.jenkins.health.check.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.health.check.inverse.score.gauge||
|jenkins.jenkins.health.check.score.gauge||
|jenkins.jenkins.job.averageDepth.gauge||
|jenkins.jenkins.job.blocked.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.job.buildable.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.job.building.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.job.count.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.job.count.value.gauge||
|jenkins.jenkins.job.execution.time.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.job.queuing.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.job.scheduled.total.counter||
|jenkins.jenkins.job.total.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.job.waiting.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.RVTestNode.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.SaasPipelineSlave.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.blockchain.LongRunTest.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.blockchain.MemoryLeakTesting.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.blockchain.worker.*.builds.|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.count.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.count.value.gauge||
|jenkins.jenkins.node.dev.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.file.server.14d83037.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.lite.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.nimbus.runner.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.offline.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.offline.value.gauge||
|jenkins.jenkins.node.onecloud.saas.worker.1.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.onecloud.saas.worker.2.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.online.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.online.value.gauge||
|jenkins.jenkins.node.perpetuum.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.perpetuum.stage.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.perpetuum.web.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.pod.template.example.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.stage.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.stage.perpetuum.eng.vmware.com.9c48120b.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.vcf.docker.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.vcf.photon.worker.04.builds.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.vcf.sonar.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.xcenter.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.node.xcenter.stage.*.builds.\*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.plugins.*.gauge|Gauges with Jenkins plug-in metrics.|
|jenkins.jenkins.plugins.failed.gauge||
|jenkins.jenkins.plugins.inactive.gauge||
|jenkins.jenkins.plugins.withUpdate.gauge||
|jenkins.jenkins.project.count.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.project.count.value.gauge||
|jenkins.jenkins.project.disabled.count.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.project.disabled.count.value.gauge||
|jenkins.jenkins.project.enabled.count.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.project.enabled.count.value.gauge||
|jenkins.jenkins.queue.blocked.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.queue.blocked.value.gauge||
|jenkins.jenkins.queue.buildable.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.queue.buildable.value.gauge||
|jenkins.jenkins.queue.pending.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.queue.pending.value.gauge||
|jenkins.jenkins.queue.size.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.queue.size.value.gauge||
|jenkins.jenkins.queue.stuck.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.queue.stuck.value.gauge||
|jenkins.jenkins.runs.*.counter|Counter for Jenkins run results|
|jenkins.jenkins.runs.failure.total.counter||
|jenkins.jenkins.runs.not.built.total.counter||
|jenkins.jenkins.runs.success.total.counter||
|jenkins.jenkins.runs.total.total.counter||
|jenkins.jenkins.runs.unstable.total.counter||
|jenkins.jenkins.task.blocked.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.task.buildable.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.task.execution.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.task.queuing.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jenkins.task.scheduled.total.counter||
|jenkins.jenkins.task.waiting.duration.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.jvm.buffer.pool.*|Gauges for JVM buffer pool metrics. |
|jenkins.jvm.buffer.pool.capacity.bytes.gauge||
|jenkins.jvm.buffer.pool.used.buffers.gauge||
|jenkins.jvm.buffer.pool.used.bytes.gauge||
|jenkins.jvm.classes.*|Gauges and counters for JVM classes.|
|jenkins.jvm.classes.loaded.gauge||
|jenkins.jvm.classes.loaded.total.counter||
|jenkins.jvm.classes.unloaded.total.counter||
|jenkins.jvm.gc.collection.seconds.*|Statistics: count, sum|
|jenkins.jvm.info.gauge||
|jenkins.jvm.memory.*|Gauges and counters for JVM memory use metrics. |
|jenkins.jvm.memory.bytes.committed.gauge||
|jenkins.jvm.memory.bytes.init.gauge||
|jenkins.jvm.memory.bytes.max.gauge||
|jenkins.jvm.memory.bytes.used.gauge||
|jenkins.jvm.memory.pool.allocated.bytes.total.counter||
|jenkins.jvm.memory.pool.bytes.committed.gauge||
|jenkins.jvm.memory.pool.bytes.init.gauge||
|jenkins.jvm.memory.pool.bytes.max.gauge||
|jenkins.jvm.memory.pool.bytes.used.gauge||
|jenkins.jvm.threads.*|Gauges and counters for JVM thread metrics. |
|jenkins.jvm.threads.current.gauge||
|jenkins.jvm.threads.daemon.gauge||
|jenkins.jvm.threads.deadlocked.gauge||
|jenkins.jvm.threads.deadlocked.monitor.gauge||
|jenkins.jvm.threads.peak.gauge||
|jenkins.jvm.threads.started.total.counter||
|jenkins.jvm.threads.state.gauge||
|jenkins.process.*|Gauges and counters for process metrics. |
|jenkins.process.cpu.seconds.total.counter||
|jenkins.process.max.fds.gauge||
|jenkins.process.open.fds.gauge||
|jenkins.process.resident.memory.bytes.gauge||
|jenkins.process.start.time.seconds.gauge||
|jenkins.process.virtual.memory.bytes.gauge||
|jenkins.system.cpu.load.gauge|CPU load metrics. |
|jenkins.system.cpu.load.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.system.cpu.load.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.system.cpu.load.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.system.cpu.load.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.*|Miscellaneous VM-related metrics. |
|jenkins.vm.class.loaded.gauge||
|jenkins.vm.class.unloaded.gauge||
|jenkins.vm.count.gauge||
|jenkins.vm.cpu.load.gauge||
|jenkins.vm.daemon.count.gauge||
|jenkins.vm.deadlock.count.gauge||
|jenkins.vm.cpu.load.*|CPU load metrics for VMs.|
|jenkins.vm.cpu.load.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.cpu.load.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.cpu.load.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.cpu.load.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.file.descriptor.*|File descriptor metrics.|
|jenkins.vm.file.descriptor.ratio.gauge||
|jenkins.vm.file.descriptor.ratio.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.file.descriptor.ratio.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.file.descriptor.ratio.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.file.descriptor.ratio.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.gc.PS.MarkSweep.*|Metrics related to the MarkSweep garbage collector. |
|jenkins.vm.gc.PS.MarkSweep.count.gauge||
|jenkins.vm.gc.PS.MarkSweep.time.gauge||
|jenkins.vm.gc.PS.Scavenge.count.gauge||
|jenkins.vm.gc.PS.Scavenge.time.gauge||
|jenkins.vm.memory.heap.*|Metrics for VM heap memory. |
|jenkins.vm.memory.heap.committed.gauge||
|jenkins.vm.memory.heap.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.init.gauge|VM heap initialization metric. |
|jenkins.vm.memory.heap.max.gauge|VM maximum heap. |
|jenkins.vm.memory.heap.usage.*|VM heap usage metrics. |
|jenkins.vm.memory.heap.usage.gauge||
|jenkins.vm.memory.heap.usage.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.usage.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.usage.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.usage.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.used.*|VM heap used metrics.|
|jenkins.vm.memory.heap.used.gauge||
|jenkins.vm.memory.heap.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.heap.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.committed.*|VM non-heap committed memory metrics. |
|jenkins.vm.memory.non.heap.committed.gauge||
|jenkins.vm.memory.non.heap.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.*|Misc. VM non-heap memory metrics. |
|jenkins.vm.memory.non.heap.init.gauge||
|jenkins.vm.memory.non.heap.max.gauge||
|jenkins.vm.memory.non.heap.usage.*|VM non-heap memory usage metrics. |
|jenkins.vm.memory.non.heap.usage.gauge||
|jenkins.vm.memory.non.heap.usage.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.usage.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.usage.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.usage.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.used.*|VM non-heap memory used metrics. |
|jenkins.vm.memory.non.heap.used.gauge||
|jenkins.vm.memory.non.heap.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.non.heap.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.committed.*|VM Code Cache memory pools committed metrics |
|jenkins.vm.memory.pools.Code.Cache.committed.gauge||
|jenkins.vm.memory.pools.Code.Cache.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.*|Misc. VM Code Cache memory pools metrics. |
|jenkins.vm.memory.pools.Code.Cache.init.gauge||
|jenkins.vm.memory.pools.Code.Cache.max.gauge||
|jenkins.vm.memory.pools.Code.Cache.usage.*|VM Code Cache memory pools usage metrics||
|jenkins.vm.memory.pools.Code.Cache.usage.gauge||
|jenkins.vm.memory.pools.Code.Cache.usage.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.usage.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.usage.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.usage.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.used.*|VM Code Cache memory pools used metrics||
|jenkins.vm.memory.pools.Code.Cache.used.gauge||
|jenkins.vm.memory.pools.Code.Cache.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Code.Cache.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.committed.*|Metrics for VM memory pools compressed class space that was committed.|
|jenkins.vm.memory.pools.Compressed.Class.Space.committed.gauge||
|jenkins.vm.memory.pools.Compressed.Class.Space.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.*|Misc. metrics for VM memory pools compressed class space.|
|jenkins.vm.memory.pools.Compressed.Class.Space.init.gauge||
|jenkins.vm.memory.pools.Compressed.Class.Space.max.gauge||
|jenkins.vm.memory.pools.Compressed.Class.Space.usage.*|Misc. metrics for VM memory pools compressed class space usage.|
|jenkins.vm.memory.pools.Compressed.Class.Space.usage.gauge||
|jenkins.vm.memory.pools.Compressed.Class.Space.usage.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.usage.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.usage.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.usage.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.used.*|Misc. metrics for VM memory pools compressed class space used.|
|jenkins.vm.memory.pools.Compressed.Class.Space.used.gauge||
|jenkins.vm.memory.pools.Compressed.Class.Space.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Compressed.Class.Space.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.committed.*|Metrics for Metaspace committed memory pools.  |
|jenkins.vm.memory.pools.Metaspace.committed.gauge||
|jenkins.vm.memory.pools.Metaspace.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.*|Misc. Metaspace VM memory pool metrics.|
|jenkins.vm.memory.pools.Metaspace.init.gauge||
|jenkins.vm.memory.pools.Metaspace.max.gauge||
|jenkins.vm.memory.pools.Metaspace.usage.*|Metrics for Metaspace memory pools usage|
|jenkins.vm.memory.pools.Metaspace.usage.gauge||
|jenkins.vm.memory.pools.Metaspace.usage.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.usage.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.usage.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.usage.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.used.*|Metrics for Metaspace memory pools used|
|jenkins.vm.memory.pools.Metaspace.used.gauge||
|jenkins.vm.memory.pools.Metaspace.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.Metaspace.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.committed.*|Metrics for VM memory committed to PS Eden Space memory pools. |
|jenkins.vm.memory.pools.PS.Eden.Space.committed.gauge||
|jenkins.vm.memory.pools.PS.Eden.Space.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.*|Misc. metrics for PS Eden Space VM memory pools. |
|jenkins.vm.memory.pools.PS.Eden.Space.init.gauge||
|jenkins.vm.memory.pools.PS.Eden.Space.max.gauge||
|jenkins.vm.memory.pools.PS.Eden.Space.usage.*|Metrics for PS Eden space memory pools usage||
|jenkins.vm.memory.pools.PS.Eden.Space.usage.gauge||
|jenkins.vm.memory.pools.PS.Eden.Space.usage.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.usage.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.usage.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.usage.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.used.*|Metrics for PS Eden space memory pools used|
|jenkins.vm.memory.pools.PS.Eden.Space.used.after.gc.gauge||
|jenkins.vm.memory.pools.PS.Eden.Space.used.gauge||
|jenkins.vm.memory.pools.PS.Eden.Space.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Eden.Space.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.committed.*|Metrics for VM memory committed to PS Old Gen memory pools.|
|jenkins.vm.memory.pools.PS.Old.Gen.committed.gauge||
|jenkins.vm.memory.pools.PS.Old.Gen.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.*|Misc. metrics for PS Old Gen VM memory pools|
|jenkins.vm.memory.pools.PS.Old.Gen.init.gauge||
|jenkins.vm.memory.pools.PS.Old.Gen.max.gauge||
|jenkins.vm.memory.pools.PS.Old.Gen.usage.*|Metrics for PS Old Gen VM memory pool usage. |
|jenkins.vm.memory.pools.PS.Old.Gen.usage.gauge||
|jenkins.vm.memory.pools.PS.Old.Gen.usage.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.usage.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.usage.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.usage.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.used.*|Metrics for PS Old Gen VM memory pool used. |
|jenkins.vm.memory.pools.PS.Old.Gen.used.after.gc.gauge||
|jenkins.vm.memory.pools.PS.Old.Gen.used.gauge||
|jenkins.vm.memory.pools.PS.Old.Gen.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Old.Gen.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.committed.gauge|Metrics for VM memory committed to PS Survivor Space memory pools.|
|jenkins.vm.memory.pools.PS.Survivor.Space.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.*|Misc. metrics for PS Survivor Space VM memory pools|
|jenkins.vm.memory.pools.PS.Survivor.Space.init.gauge||
|jenkins.vm.memory.pools.PS.Survivor.Space.max.gauge||
|jenkins.vm.memory.pools.PS.Survivor.Space.usage.*|Metrics for PS Survivor Space VM memory pool usage.|
|jenkins.vm.memory.pools.PS.Survivor.Space.usage.gauge||
|jenkins.vm.memory.pools.PS.Survivor.Space.usage.x100.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.usage.x100.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.usage.x100.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.usage.x100.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.used.*|Metrics for PS Survivor Space VM memory pool used.|
|jenkins.vm.memory.pools.PS.Survivor.Space.used.after.gc.gauge||
|jenkins.vm.memory.pools.PS.Survivor.Space.used.gauge||
|jenkins.vm.memory.pools.PS.Survivor.Space.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.pools.PS.Survivor.Space.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.total.committed.*|Metrics related to total committed VM memory|
|jenkins.vm.memory.total.committed.gauge||
|jenkins.vm.memory.total.committed.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.total.committed.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.total.committed.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.total.committed.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.total.*.gauge|Misc. VM memory gauges.|
|jenkins.vm.memory.total.init.gauge||
|jenkins.vm.memory.total.max.gauge||
|jenkins.vm.memory.total.used.*|Metrics for total VM memory used.|
|jenkins.vm.memory.total.used.gauge||
|jenkins.vm.memory.total.used.history.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.total.used.window.15m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.total.used.window.1h.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.memory.total.used.window.5m.*|Statistics: 0.5, 0.75, 0.95, 0.98, 0.99, 0.999, count, sum|
|jenkins.vm.*|Misc. VM metrics|
|jenkins.vm.new.count.gauge||
|jenkins.vm.runnable.count.gauge||
|jenkins.vm.terminated.count.gauge||
|jenkins.vm.timed.waiting.count.gauge||
|jenkins.vm.uptime.milliseconds.gauge||
|jenkins.vm.waiting.count.gauge||

