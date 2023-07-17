---
title: VMware tc Server Integration
tags: [integrations list]
permalink: vmware-tcserver.html
summary: Learn about the VMware tc Server Integration.
---

This page provides an overview of what you can do with the VMware tc Server integration. The documentation pages only for a limited number of integrations contain the setup steps and instructions. If you do not see the setup steps here, navigate to the Operations for Applications GUI. The detailed instructions for setting up and configuring all integrations, including the VMware tc Server integration are on the **Setup** tab of the integration.

1. Log in to your Operations for Applications instance. 
2. Click **Integrations** on the toolbar, search for and click the **VMware tc Server** tile. 
3. Click the **Setup** tab and you will see the most recent and up-to-date instructions.

## VMware tc Server

VMware tc Server is a Web application server based on open-source Apache Tomcat. It preserves the best of Tomcat and adds many mission-critical operational capabilities that are unavailable in the open-source product.

In addition to setting up the metrics flow, this integration also installs a dashboard.
{% include image.md src="images/tcserver-metrics.png" width="80" %}
{% include image.md src="images/tcserver-metrics-1.png" width="80" %}







## Metrics
  

|Metric Name|Description|
| :--- | :--- |
|tcserver.Cache.hitCount||
|tcserver.Cache.lookupCount||
|tcserver.GlobalRequestProcessor.bytesReceived||
|tcserver.GlobalRequestProcessor.bytesSent||
|tcserver.GlobalRequestProcessor.errorCount||
|tcserver.GlobalRequestProcessor.processingTime||
|tcserver.GlobalRequestProcessor.requestCount||
|tcserver.JspMonitor.jspCount||
|tcserver.JspMonitor.jspReloadCount||
|tcserver.JspMonitor.jspUnloadCount||
|tcserver.OperatingSystem.ProcessCpuLoad||
|tcserver.OperatingSystem.SystemCpuLoad||
|tcserver.OperatingSystem.SystemLoadAverage||
|tcserver.Servlet.errorCount||
|tcserver.Servlet.processingTime||
|tcserver.Servlet.requestCount||
|tcserver.ThreadPool.currentThreadCount||
|tcserver.ThreadPool.currentThreadsBusy||
|tcserver.ThreadPool.maxThreads||
|tcserver.jvm.garbage.collector.CollectionCount||
|tcserver.jvm.garbage.collector.CollectionTime||
|tcserver.jvm.memory.HeapMemoryUsage.*|Statistics: max|
|tcserver.jvm.memory.HeapMemoryUsage.committed||
|tcserver.jvm.memory.HeapMemoryUsage.init||
|tcserver.jvm.memory.HeapMemoryUsage.used||
|tcserver.jvm.memory.NonHeapMemoryUsage.*|Statistics: max|
|tcserver.jvm.memory.NonHeapMemoryUsage.committed||
|tcserver.jvm.memory.NonHeapMemoryUsage.init||
|tcserver.jvm.memory.NonHeapMemoryUsage.used||
|tcserver.jvm.memory.ObjectPendingFinalizationCount||
|tcserver.jvm.memory.pool.CollectionUsage.*|Statistics: max|
|tcserver.jvm.memory.pool.CollectionUsage.committed||
|tcserver.jvm.memory.pool.CollectionUsage.init||
|tcserver.jvm.memory.pool.CollectionUsage.used||
|tcserver.jvm.memory.pool.PeakUsage.*|Statistics: max|
|tcserver.jvm.memory.pool.PeakUsage.committed||
|tcserver.jvm.memory.pool.PeakUsage.init||
|tcserver.jvm.memory.pool.PeakUsage.used||
|tcserver.jvm.memory.pool.Usage.*|Statistics: max|
|tcserver.jvm.memory.pool.Usage.committed||
|tcserver.jvm.memory.pool.Usage.init||
|tcserver.jvm.memory.pool.Usage.used||
|tcserver.jvm.runtime.Uptime||

