---
title: Apache ActiveMQ Integration
tags: [integrations list]
permalink: activemq.html
summary: Learn about the Apache ActiveMQ Integration.
---
## Apache ActiveMQ Integration

Apache ActiveMQ is an open source message broker written in Java together with a full Java Message Service client. 

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/activemq-metrics.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache ActiveMQ Setup



### Step 1. Install the Telegraf Agent

This integration uses Jolokia to extract metrics from ActiveMQ, and the Jolokia input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure the Telegraf Jolokia Input Plugin

First, create a file called `activemq.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.jolokia2_agent]]
urls = ["http://localhost:8161/api/jolokia"]
name_prefix = "activemq."
username = "admin"
password = "admin"

### JVM Generic

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

### ACTIVEMQ

[[inputs.jolokia2_agent.metric]]
name     = "queue"
mbean    = "org.apache.activemq:brokerName=*,destinationName=*,destinationType=Queue,type=Broker"
paths    = ["QueueSize","EnqueueCount","ConsumerCount","DispatchCount","DequeueCount","ProducerCount","InFlightCount"]
tag_keys = ["brokerName","destinationName"]

[[inputs.jolokia2_agent.metric]]
name     = "topic"
mbean    = "org.apache.activemq:brokerName=*,destinationName=*,destinationType=Topic,type=Broker"
paths    = ["ProducerCount","DequeueCount","ConsumerCount","QueueSize","EnqueueCount"]
tag_keys = ["brokerName","destinationName"]

[[inputs.jolokia2_agent.metric]]
name     = "broker"
mbean    = "org.apache.activemq:brokerName=*,type=Broker"
paths    = ["TotalConsumerCount","TotalMessageCount","TotalEnqueueCount","TotalDequeueCount","MemoryLimit","MemoryPercentUsage","StoreLimit","StorePercentUsage","TempPercentUsage","TempLimit"]
tag_keys = ["brokerName"]
```
{% endraw %}

Then, replace the `urls`,` username` and `password` values with your ActiveMQ server values. Specify your servers with URL matching.

Format:{% raw %}
```
urls = ["http://<address>:<port>/api/jolokia"]
username = [username]
password = [password]
```
{% endraw %}
Example:{% raw %}
```
urls = ["http://localhost:8161/api/jolokia"]
username = "admin"
password = "admin"
```
{% endraw %}


### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



## Metrics

Information about server activity and performance. Metrics descriptions are collected from the [mod_status Apache Module](https://httpd.apache.org/docs/2.4/mod/mod_status.html).

|Metric Name |Description |
|:--- |:--- |
|apache.BusyWorkers|Number of workers that are serving requests.|
|apache.BytesPerReq|Number of bytes per request.|
|apache.BytesPerSec|Number of bytes transferred per second.|
|apache.CPUChildrenSystem|Jiffs used in User Mode by child processes. |
|apache.CPUChildrenUser|Jiffs used in System Mode by child processes.|
|apache.CPULoad|CPU load of your HTTP server.|
|apache.CPUSystem|CPU processes in System mode. |
|apache.CPUUser|CPU used by the user process.|
|apache.ConnsAsyncClosing|Number of asynchronous connections that are closing.|
|apache.ConnsAsyncKeepAlive|Number of asynchronous connections that are kept alive.|
|apache.ConnsAsyncWriting|Number of asynchronous connections that are writing.|
|apache.ConnsTotal|Total number of connections served by Apache. |
|apache.IdleWorkers|Number of workers that are idling. |
|apache.Load1|Server load over last 1 minute.|
|apache.Load15|Server load over last 15 minutes.|
|apache.Load5|Server load over last 5 minutes.|
|apache.ParentServerConfigGeneration|Number of times the Apache server reread config and restarted child processes.|
|apache.ParentServerMPMGeneration|Number of times the Apache server reread the MPG config and restarted child processes. |
|apache.ReqPerSec|Number of requests per second.|
|apache.ServerUptimeSeconds|Server uptime (in seconds).|
|apache.TotalAccesses|Total number of accesses.|
|apache.TotalkBytes|Number of kilobytes served.|
|apache.Uptime|Total uptime of the server.|
|apache.accesses.total.counter|Total number of times this server was accessed.|
|apache.cpuload.gauge|CPU load for this server. |
|apache.exporter.build.info.gauge|Apache exporter build information.|
|apache.scboard.closing|Number of worker threads that are closing a TCP connection (after serving a response).|
|apache.scboard.dnslookup|Number of worker threads currently performing a DNS lookup.|
|apache.scboard.finishing|Number of worker threads finishing (part of server shutdown).|
|apache.scboard.idle.cleanup|Number of idle worker threads that are ready for cleanup.|
|apache.scboard.keepalive|Number of worker threads that keep the connection alive (expecting another request on the same connection).|
|apache.scboard.logging|Number of worker threads writing to the log file.|
|apache.scboard.open|Number of open worker slots. |
|apache.scboard.reading|Number of workers receiving requests.|
|apache.scboard.sending|Number of workers sending responses.|
|apache.scboard.starting|Number of workers in the process of starting.|
|apache.scboard.waiting|Number of workers waiting for incoming requests.|
|apache.scoreboard.gauge|Scoreboard gauge. |
|apache.sent.kilobytes.total.counter|Total number of kilobytes sent.|
|apache.up.gauge|Shows whether server could be reached.|
|apache.uptime.seconds.total.counter|Total uptime, in seconds.|
|apache.workers.gauge|Apache worker status.|

