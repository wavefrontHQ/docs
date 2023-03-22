---
title: Apache Mesos Integration
tags: [integrations list]
permalink: mesos.html
summary: Learn about the Apache Mesos Integration.
---
## Mesos Integration

Apache Mesos is a cluster manager that provides efficient resource isolation and sharing across distributed applications.
This integration installs and configures Telegraf to send Mesos metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the `Overview` and `Cluster Resources` sections of a dashboard displaying Mesos cluster metrics:
{% include image.md src="images/mesos_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Mesos Setup



### Step 1. Install the Telegraf Agent

This integration uses the Mesos Telegraf input plugin. You have to install the Telegraf agent if it's not yet installed because this integration uses the Mesos Telegraf input plugin.

**Note:** Install the Telegraf agent on one of the hosts in the Mesos cluster network. 

Log in to your product instance and follow the instructions on the **Setup** tab to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Enable the Mesos input plugin

Create a `mesos.conf` file in `/etc/telegraf/telegraf.d` and add the following snippet:
{% raw %}
   ```
   # # Telegraf plugin for gathering metrics from N Mesos masters
    [[inputs.mesos]]
   #   ## Timeout, in ms.
      timeout = 100
   #   ## A list of Mesos masters.
      masters = ["Master-IP1:5050", "Master-IP2:5050", ...]
   #   ## Master metrics groups to be collected, by default, all are enabled.
      master_collections = [
        "resources",
        "master",
        "system",
        "agents",
        "frameworks",
        "tasks",
        "messages",
        "evqueue",
        "registrar",
      ]

   #   ## A list of Mesos slaves, default is []
      slaves = [slave1-IP:5051, slave2-IP:5051, ...]
   #   ## Slave metrics groups to be collected, by default, all are enabled.
      slave_collections = [
         "resources",
         "agent",
         "system",
         "executors",
         "tasks",
         "messages",
      ]
   ```
{% endraw %}
**Note:** Update `masters = ["Master-IP1:5050", "Master-IP2:5050", ...]` and  `slaves = [slave1-IP:5051, slave2-IP:5051,...]` to add master and slaves with valid ips and ports using the format < ip >:< port >.

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.




