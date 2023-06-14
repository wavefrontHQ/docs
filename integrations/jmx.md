---
title: JMX Integration
tags: [integrations list]
permalink: jmx.html
summary: Learn about the JMX Integration.
---
## JMX Integration

The JMX technology provides a simple, standard way of managing resources such as applications, devices, and services. Because the JMX technology is dynamic, you can use it to monitor and manage resources as they are created, installed and implemented. You can also use the JMX technology to monitor and manage the Java Virtual Machine (Java VM).

Wavefront JMX integration uses [Jolokia](https://jolokia.org/) to setup and retrieve JMX metrics from a running Java instance, in a form of an embedded [agent](https://jolokia.org/agent.html). After the JMX metrics are available on the web endpoint, the Telegraf that's part of the integration retrieves the desired metrics using the jolokia plugin and sends it to Wavefront.

In addition to setting up the metrics flow, this integration also sets up a dashboard.
{% include image.md src="images/jmx-metrics.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## JMX Setup



### Step 1. Install the Telegraf Agent

If you don't have the Telegraph agent installed, follow the steps below. Otherwise, continue to step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Determine the Type of Jolokia Agent

Determine what type of agent you wish to use from: [https://jolokia.org/agent.html](https://jolokia.org/agent.html)

#### Step 3.a Install the Jolokia Agent as WAR

1. Download the latest version of the Jolokia war file from: [https://jolokia.org/download.html](https://jolokia.org/download.html).
2. Rename the file from `jolokia-war-X.X.X.war` to `jolokia.war`.
3. Deploy `jolokia.war` into your J2EE or servlet container just like you would deploy any WAR file.
4. Start or restart your web or application server.
5. Verify the Jolokia agent installation by accessing this URL: `http://<address>:<port>/jolokia/version`.

#### Step 3.b Install the Jolokia Agent in OSGi

1. Download the latest version of the Osgi Agent file from: [https://jolokia.org/download.html](https://jolokia.org/download.html).
2. Follow the instructions in [https://jolokia.org/reference/html/agents.html#agents-osgi](https://jolokia.org/reference/html/agents.html#agents-osgi) to set up the osgi agent.
3. Verify the Jolokia agent installation by accessing this URL: `http://<address>:<port>/osgi/jolokia/version`.

#### Step 3.c Install the Jolokia Agent in Mule

1. Download the latest version of the Mule Agent file from: [https://jolokia.org/download.html](https://jolokia.org/download.html).
2. Move the `jolokia-mule-X.X.X-agent.jar` within the Mule installation in lib/opt/.
3. Apply the following Mule configuration into `mule-config.xml` so that it will contain the following section:{% raw %}
```
<mule xmlns="http://www.mulesoft.org/schema/mule/core"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:spring="http://www.springframework.org/schema/beans"
    xmlns:management="http://www.mulesoft.org/schema/mule/management"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-current.xsd
             http://www.mulesoft.org/schema/mule/core
       http://www.mulesoft.org/schema/mule/core/current/mule.xsd
             http://www.mulesoft.org/schema/mule/management
       http://www.mulesoft.org/schema/mule/management/current/mule-management.xsd">

   <custom-agent name="jolokia-agent" class="org.jolokia.mule.JolokiaMuleAgent">
      <spring:property name="port" value="8899"/>
   </custom-agent>
</mule>
```
{% endraw %}
4. Start or restart your Mule ESB.
5. Verify the Jolokia agent installation by accessing this URL: `http://<address>:<port>/jolokia/version`.

#### Step 3.d Install the Jolokia Agent in JVM

1. Download the latest version of the JVM Agent file from: [https://jolokia.org/download.html](https://jolokia.org/download.html).
2. Rename the file from `jolokia-jvm-<version>-agent.jar` to `agent.jar`.
3. When running the java application, provide the following argument to java application:{% raw %}
```
-javaagent:/path/to/agent.jar
```
{% endraw %}
4. Verify the Jolokia agent installation by accessing this URL: `http://<address>:8778/jolokia/version`.

Regardless of the type of agent, the result will look similar to this:{% raw %}
```
{"request":{"type":"version"},"value":{"agent":"1.3.7","protocol":"7.2","config":{"maxCollectionSize":"0","agentId":"10.152.24.99-29844-172f5788-servlet","debug":"false","agentType":"servlet","serializeException":"false","detectorOptions":"{}","dispatcherClasses":"org.jolokia.jsr160.Jsr160RequestDispatcher","maxDepth":"15","discoveryEnabled":"false","canonicalNaming":"true","historyMaxEntries":"10","includeStackTrace":"true","maxObjects":"0","debugMaxEntries":"100"},"info":{"product":"tomcat","vendor":"Apache","version":"8.5.23"}},"timestamp":1509955465,"status":200}
```
{% endraw %}

Refer to [https://jolokia.org/reference/html/agents.html](https://jolokia.org/reference/html/agents.html) for more information about how to configure each agent.

### Step 4. Configure the Telegraf Jolokia Input Plugin

First, create a file called `jmx.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet.
{% raw %}
```
[[inputs.jolokia2_agent]]
  # Prefix to attach to the measurement name
  name_prefix = "jmx."

  # Add agents URLs to query
  urls = ["http://localhost:8778/jolokia"]

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
    paths = ["ProcessCpuLoad","SystemLoadAverage","SystemCpuLoad","OpenFileDescriptorCount","CommittedVirtualMemorySize","FreePhysicalMemorySize","FreeSwapSpaceSize","TotalPhysicalMemorySize","TotalSwapSpaceSize","MaxFileDescriptorCount","AvailableProcessors"]

  [[inputs.jolokia2_agent.metric]]
    name  = "jvm_runtime"
    mbean = "java.lang:type=Runtime"
    paths = ["Uptime", "StartTime"]

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

  [[inputs.jolokia2_agent.metric]]
    name       = "jvm_classloading"
    mbean      = "java.lang:type=ClassLoading"
    paths      = ["LoadedClassCount", "UnloadedClassCount", "TotalLoadedClassCount"]

  [[inputs.jolokia2_agent.metric]]
    name       = "jvm_threading"
    mbean      = "java.lang:type=Threading"
    paths      = ["TotalStartedThreadCount", "PeakThreadCount", "CurrentThreadCpuTime", "ThreadCount", "DaemonThreadCount"]
```
{% endraw %}

Then, replace the `urls` value according to your agent type and configuration. Specify your servers with URL matching.

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

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



