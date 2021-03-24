---
title: Apache Tomcat Integration
tags: [integrations list]
permalink: tomcat.html
summary: Learn about the Wavefront Apache Tomcat Integration.
---
## Apache Tomcat Integration

The Apache Tomcat® software is an open source implementation of the Java Servlet, JavaServer Pages, Java Expression Language and Java WebSocket technologies.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/tomcat-metrics.png" width="80" %}
{% include image.md src="images/tomcat-metrics-1.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Apache Tomcat Setup



### Step 1. Install the Telegraf Agent

This integration uses Jolokia to extract metrics from Tomcat, and the Jolokia input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Wavefront instance and follow the instructions in the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability?utm_source=docs.vmware.com&utm_medium=referral&utm_campaign=docs-front-page){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Install the Jolokia Agent on Your Tomcat Server

1. Download the latest version of the Jolokia war file from: https://jolokia.org/download.html.
2. Rename the file from `jolokia-war-X.X.X.war` to `jolokia.war`.
3. Copy the `jolokia.war` file to `${TOMCAT_HOME}/webapps`.
4. Add `jolokia` as role in `tomcat-users.xml` (mandatory for Jolokia 1.6 or later)
5. Start or restart your Tomcat server.
6. Verify the Jolokia agent installation by accessing this URL: `http://<address>:<port>/jolokia/version`.

The result looks similar to this:{% raw %}
```
{"request":{"type":"version"},"value":{"agent":"1.3.7","protocol":"7.2","config":{"maxCollectionSize":"0","agentId":"10.152.24.99-29844-172f5788-servlet","debug":"false","agentType":"servlet","serializeException":"false","detectorOptions":"{}","dispatcherClasses":"org.jolokia.jsr160.Jsr160RequestDispatcher","maxDepth":"15","discoveryEnabled":"false","canonicalNaming":"true","historyMaxEntries":"10","includeStackTrace":"true","maxObjects":"0","debugMaxEntries":"100"},"info":{"product":"tomcat","vendor":"Apache","version":"8.5.23"}},"timestamp":1509955465,"status":200}
```
{% endraw %}

### Step 3. Configure the Telegraf Jolokia Input Plugin

First, create a file called `tomcat.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.jolokia2_agent]]
  # Prefix to attach to the measurement name
  name_prefix = "tomcat."

  # Add agents URLs to query
  urls = ["http://localhost:8080/jolokia"]

  #username and password are mandatory for Jolokia 1.6 or later
  #username = <jolokia role username>
  #password = <jolokia role password>

  # response_timeout = "5s"

  ## Optional TLS config
  # tls_ca   = "/var/private/ca.pem"
  # tls_cert = "/var/private/client.pem"
  # tls_key  = "/var/private/client-key.pem"
  # insecure_skip_verify = false

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

  ### TOMCAT

  [[inputs.jolokia2_agent.metric]]
    name     = "GlobalRequestProcessor"
    mbean    = "Catalina:name=*,type=GlobalRequestProcessor"
    paths    = ["requestCount","bytesReceived","bytesSent","processingTime","errorCount"]
    tag_keys = ["name"]

  [[inputs.jolokia2_agent.metric]]
    name     = "JspMonitor"
    mbean    = "Catalina:J2EEApplication=*,J2EEServer=*,WebModule=*,name=jsp,type=JspMonitor"
    paths    = ["jspReloadCount","jspCount","jspUnloadCount"]
    tag_keys = ["J2EEApplication","J2EEServer","WebModule"]

  [[inputs.jolokia2_agent.metric]]
    name     = "ThreadPool"
    mbean    = "Catalina:name=*,type=ThreadPool"
    paths    = ["maxThreads","currentThreadCount","currentThreadsBusy"]
    tag_keys = ["name"]

  [[inputs.jolokia2_agent.metric]]
    name     = "Servlet"
    mbean    = "Catalina:J2EEApplication=*,J2EEServer=*,WebModule=*,j2eeType=Servlet,name=*"
    paths    = ["processingTime","errorCount","requestCount"]
    tag_keys = ["name","J2EEApplication","J2EEServer","WebModule"]

  [[inputs.jolokia2_agent.metric]]
    name     = "Cache"
    mbean    = "Catalina:context=*,host=*,name=Cache,type=WebResourceRoot"
    paths    = ["hitCount","lookupCount"]
    tag_keys = ["context","host"]
```
{% endraw %}

Then, replace the `urls` value with your Tomcat server URL. Specify your servers with URL matching.

Format:{% raw %}
```
urls = ["http://<address>:<port>/<jolokia contex>"]
```
{% endraw %}
Example:{% raw %}
```
urls = ["http://10.152.24.99:8080/jolokia"]
```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



