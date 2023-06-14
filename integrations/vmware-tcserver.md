---
title: VMware tc Server Integration
tags: [integrations list]
permalink: vmware-tcserver.html
summary: Learn about the VMware tc Server Integration.
---
## VMware tc Server

VMware tc Server is a Web application server based on open-source Apache Tomcat. It preserves the best of Tomcat and adds many mission-critical operational capabilities that are unavailable in the open-source product.

In addition to setting up the metrics flow, this integration also installs a dashboard.
{% include image.md src="images/tcserver-metrics.png" width="80" %}
{% include image.md src="images/tcserver-metrics-1.png" width="80" %}

## VMware tc Server Setup



### Step 1. Install VMware tc Server and configure a runtime instance.

For details on VMware tc Server installation and runtime instance configuration, see [Getting Started with VMware tc Server](https://tcserver.docs.pivotal.io/4x/docs-tcserver/topics/about-getting-started.html).

To list existing tc server instances and their details, run `tcserver list`.


### Step 2. Add the Tanzu Observability by Wavefront template to VMware tc Server.


There are two methods to install the template.

&nbsp;&nbsp;1. By using the tc Server Template repository.

&nbsp;&nbsp;&nbsp;  Run `tcserver get-template tanzu-observability`

&nbsp;&nbsp;2. Through the Tanzu Network.

&nbsp;&nbsp;&nbsp;You can install the template into VMware tc Server by downloading it from the [Tanzu Network](https://network.tanzu.vmware.com/products/tc-server-4x-templates/)  and then installing it in the tc Server templates directory.

&nbsp;&nbsp;   Run `tcserver get-template tanzu-observability-template.zip`

&nbsp;&nbsp;  Use the location of the downloaded .zip file from Tanzu Network.


### Step 3. Apply a Tanzu Observability by Wavefront URL to the VMware tc Server instance.

The template requires the following properties to be set:
{% raw %}
```
tanzu-observability.url - This is the URL either to a Wavefront proxy or to the Wavefront instance.
tanzu-observability.token - This is the token used to authenticate to the Wavefront instance. If you use a Wavefront proxy, the token is not required.
```
{% endraw %}

If you do not have a [Wavefront proxy](https://docs.wavefront.com/proxies.html) installed on your network, install a proxy.

There are two ways to ingest tc server metrics to wavefront.

&nbsp;&nbsp;1. Use WAVEFRONT_PROXY_ADDRESS to ingest tc Server data into Wavefront.

&nbsp;&nbsp;Run `tcserver apply-template INSTANCE_NAME -t tanzu-observability -p tanzu-observability.url=http://WAVEFRONT_PROXY_ADDRESS:2878`


&nbsp;&nbsp;2. Directly ingest tc Server metrics into the Wavefront server.

&nbsp;&nbsp;Run `tcserver apply-template INSTANCE_NAME -t tanzu-observability -p tanzu-observability.url=https://YOUR_CLUSTER.wavefront.com -p tanzu-observability.token=YOUR_API_TOKEN`

For details about the available properties, see [tc Server Tanzu Observability by Wavefront Listener Template](https://tcserver.docs.pivotal.io/4x/docs-tcserver/topics/templates/tanzu-observability.html)

### Step 4. Restart the tc server instance

Run `tcserver restart INSTANCE_NAME`.





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

