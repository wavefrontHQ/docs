---
title: Marathon Integration
tags: [integrations list]
permalink: marathon.html
summary: Learn about the Marathon Integration.
---
## Marathon Integration

Marathon is a container orchestration platform for the Mesosphere Datacenter Operating System (DC/OS) and Apache Mesos.
This integration installs and configures Telegraf to send Marathon metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Overview** and **Task Processing** sections of a dashboard displaying Mesos cluster metrics:
{% include image.md src="images/marathon_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Marathon Setup



### Step 1. Install the Telegraf Agent

This integration uses the HTTP input plugin for Telegraf to extract metrics from Marathon.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Enable the HTTP input plugin

Create a `marathon.conf` file in `/etc/telegraf/telegraf.d` and add the following snippet:
{% raw %}
   ```
       [[inputs.http]]
       ## One or more URLs from which to read formatted metrics
       urls = [
           "http://<mesos_leader_ip>:8080/metrics",
           "http://<mesos_leader_ip>:8080/v2/tasks",
           "http://<mesos_leader_ip>:8080/v2/queue",
           "http://<mesos_leader_ip>:8080/v2/deployments",
       ]
       data_format = "json"
       name_prefix = "marathon."
   ```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.




