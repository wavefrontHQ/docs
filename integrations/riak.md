---
title: Riak KV Store Integration
tags: [integrations list]
permalink: riak.html
summary: Learn about the Riak KV Store Integration.
---
## Riak KV Store Integration

The Riak key-value database integration installs and configures Telegraf to send Riak key-value store (KV store) performance metrics to Wavefront. Telegraf is a light-weight server process that can collect, process, aggregate and send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the Read/Write latency section of a dashboard displaying Riak node metrics.

{% include image.md src="images/riak_read_write_latency.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Riak KV Setup



This integration uses the Riak Telegraf input plugin.

Supported Riak Version(s): 2.2.x  

### Step 1. Install the Telegraf Agent

Based on the platform on which Riak is running follow below steps. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure Riak KV Store Input Plugin

Create a file called `riak.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.riak]]
  servers = ["http://<Host-IP>:8098"]

```
{% endraw %}
Where Host-IP is the value of the `listener.http.internal` property in `/etc/riak/riak.conf`.

Configure global tags in the `telegraf.conf` file to group Riak nodes into clusters, as in the snippet below:
{% raw %}
```
[global_tags]
  #Setting environment tags like prod, dev, perf, and test
  env = "prod"
```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.





