---
title: JBoss AS Integration
tags: [integrations list]
permalink: jboss.html
summary: Learn about the JBoss AS Integration.
---
## JBoss AS (WildFly) Integration

JBoss Application Server (JBoss AS) is an open-source, cross-platform Java application server developed by JBoss, a division of Red Hat Inc. JBoss AS is an open-source implementation of Java 2 Enterprise Edition (J2EE) that is used for implementing Java applications and other Web-based applications and software.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/jboss-metrics.png" width="80" %}



To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## JBoss AS (WildFly) Setup



### Step 1. Install the Telegraf Agent

If you don't have the Telegraph agent installed, follow the steps below. Otherwise, continue to step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Install the Jolokia Agent on Your JBoss AS Instance

1. Download the latest version of the Jolokia WAR-Agent from: https://jolokia.org/download.html.
2. Rename the `jolokia-war-X.X.X.war` file to `jolokia.war`.
3. Deploy the `jolokia.war` file into the JBoss AS Instance.
4. Add an `ApplicationRealm` user with `jolokia` role (mandatory for Jolokia 1.6 or later)
5. Verify the Jolokia agent installation by accessing this URL: `http://<address>:<port>/jolokia/version`.

The result looks similar to this:{% raw %}
```
{"request":{"type":"version"},"value":{"agent":"1.3.7","protocol":"7.2","config":{"maxCollectionSize":"0","agentId":"10.152.24.99-29844-172f5788-servlet","debug":"false","agentType":"servlet","serializeException":"false","detectorOptions":"{}","dispatcherClasses":"org.jolokia.jsr160.Jsr160RequestDispatcher","maxDepth":"15","discoveryEnabled":"false","canonicalNaming":"true","historyMaxEntries":"10","includeStackTrace":"true","maxObjects":"0","debugMaxEntries":"100"},"info":{"product":"tomcat","vendor":"Apache","version":"8.5.23"}},"timestamp":1509955465,"status":200}
```
{% endraw %}

### Step 3. Configure Telegraf Jolokia Input Plugin

First create a file called `jboss.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.jolokia2_agent]]
urls = ["http://<jboss-host1-ip>:<port>/jolokia","http://<jboss-host2-ip>:<port>/jolokia"]
name_prefix = "jboss."

#username and password are mandatory for Jolokia 1.6 or later
#username = <jolokia role username>
#password = <jolokia role password>

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

### JBOSS

[[inputs.jolokia2_agent.metric]]
name     = "connectors.http"
mbean    = "jboss.as:https-listener=*,server=*,subsystem=undertow"
paths    = ["bytesReceived","bytesSent","errorCount","requestCount"]
tag_keys = ["server","https-listener"]

[[inputs.jolokia2_agent.metric]]
name     = "connectors.http"
mbean    = "jboss.as:http-listener=*,server=*,subsystem=undertow"
paths    = ["bytesReceived","bytesSent","errorCount","requestCount"]
tag_keys = ["server","http-listener"]

[[inputs.jolokia2_agent.metric]]
name     = "datasource.jdbc"
mbean    = "jboss.as:data-source=*,statistics=jdbc,subsystem=datasources"
paths    = ["PreparedStatementCacheAccessCount","PreparedStatementCacheHitCount","PreparedStatementCacheMissCount"]
tag_keys = ["data-source"]

[[inputs.jolokia2_agent.metric]]
name     = "datasource.pool"
mbean    = "jboss.as:data-source=*,statistics=pool,subsystem=datasources"
paths    = ["AvailableCount","ActiveCount","MaxUsedCount"]
tag_keys = ["data-source"]
```
{% endraw %}

Then replace the `urls` value with your JBoss server URL. Specify your servers with URL matching.

Format:{% raw %}
```
urls = ["http://<address>:<port>/<jolokia contex>"]
```
{% endraw %}
Example:{% raw %}
```
urls = ["http://10.152.24.99:8080/jolokia"]
```
{% endraw %}

To monitor multiple JBoss AS Instance, add additional `urls` entries:{% raw %}
```
urls = ["http://jboss.foo.com:8080/jolokia","http://webapp1.foo.com:8080/jolokia","http://wbapp2.foo.com:8080/jolokia"]
```
{% endraw %}

### Step 4. Enable Statistics in JBoss

You need to enable statistics from the following subsystems to see metrics in Wavefront. 
* Data Sources
* Web/HTTP - Undertow.

You can use the JBoss Management UI to enable these statistics.

### Step 5. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



