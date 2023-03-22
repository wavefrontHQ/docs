---
title: Atlassian Bitbucket Integration
tags: [integrations list]
permalink: bitbucket.html
summary: Learn about the Atlassian Bitbucket Integration.
---
## Atlassian Bitbucket

Atlassian Bitbucket is a repository hosting service for source code and development projects that use Git.

This integration installs and configures Telegraf to send Atlassian Bitbucket metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's a preview of some charts in the Atlassian Bitbucket dashboard.

{% include image.md src="images/bitbucket_dashboard1.png" width="80" %}
{% include image.md src="images/bitbucket_dashboard2.png" width="80" %}
{% include image.md src="images/bitbucket_dashboard3.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Atlassian Bitbucket Setup



### Step 1. Install the Telegraf Agent

This integration uses the Jolokia Agent input plugin for Telegraf to extract metrics from Atlassian Bitbucket. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Install the Jolakia Agent on Atlassian Bitbucket node

1. Download the latest version of the Jolokia JVM-Agent from [here](https://jolokia.org/download.html).
2. Enable JMX counters in Atlassian Bitbucket, [click here for details](https://confluence.atlassian.com/bitbucketserver/enabling-jmx-counters-for-performance-monitoring-776640189.html)  
3. To start Jolokia Agent run the following command:  
  `java -jar jolokia-jvm-*.jar start <Atlassian Bitbucket Service PID>`  
   e.g: `java -jar jolokia-jvm-1.5.0-agent.jar start 5824`
4. Verify the Jolokia agent installation by accessing this URL: `http://<address>:<port>/jolokia`.


### Step 3. Enable the Jolokia2 Agent input plugin

Create a file called `jolokia.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
   ```
    # Read JMX metrics through Jolokia2
    [[inputs.jolokia2_agent]]
      urls = ["http://localhost:8778/jolokia"]
      name_prefix = "bitbucket."

      [[inputs.jolokia2_agent.metric]]
        name  = "jvm_operatingsystem"
        mbean = "java.lang:type=OperatingSystem"

      [[inputs.jolokia2_agent.metric]]
        name  = "jvm_runtime"
        mbean = "java.lang:type=Runtime"

      [[inputs.jolokia2_agent.metric]]
        name  = "jvm_thread"
        mbean = "java.lang:type=Threading"

      [[inputs.jolokia2_agent.metric]]
        name  = "jvm_memory"
        mbean = "java.lang:type=Memory"

      [[inputs.jolokia2_agent.metric]]
        name  = "jvm_class_loading"
        mbean = "java.lang:type=ClassLoading"

      [[inputs.jolokia2_agent.metric]]
        name  = "jvm_memory_pool"
        mbean = "java.lang:type=MemoryPool,name=*"

      [[inputs.jolokia2_agent.metric]]
        name  = "webhooks"
        mbean = "com.atlassian.webhooks:name=*"

      [[inputs.jolokia2_agent.metric]]
        name  = "atlassian"
        mbean = "com.atlassian.bitbucket:name=*"

      [[inputs.jolokia2_agent.metric]]
        name  = "thread_pools"
        mbean = "com.atlassian.bitbucket.thread-pools:name=*"
   ```
{% endraw %}

### Step 4. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.



