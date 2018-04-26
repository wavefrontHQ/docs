---
title: etcd KV store Integration
tags: []
permalink: etcd.html
summary: Learn about the Wavefront etcd KV store Integration.
---
## etcd KV Store Integration

The etcd KV Store integration installs and configures Telegraf to send etcd KV Store performance metrics to Wavefront. Telegraf is a light-weight server process that can collect, process, aggregate and send metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the Cluster Health section of a dashboard displaying etcd metrics.

{% include image.md src="images/etcd-sample-dashboard.png" width="80" %}


To see the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## etcd Distributed Database Setup



This integration uses the Prometheus Telegraf input plugin.


### Step 1. Install the Telegraf Agent

Follow the steps below to install the Telegraf agent and optional Wavefront proxy. Telegraf agent can be installed on a node where etcd is running or on a node that has access to the metrics endpoint of etcd. If you've already installed the agent and proxy, you can skip to Step 2.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 2. Configure Prometheus Input Plugin

Create a file called `etcd.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.prometheus]]
  urls = ["http://<Host-IP>:2379/metrics"]
```
Configure global tags in the `telegraf.conf` file to group etcd nodes into clusters, as in the following snippet:

```
[global_tags]
  #Setting environment tags like prod, dev, perf, and test
  env = "prod"
```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.


