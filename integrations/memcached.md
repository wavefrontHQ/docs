---
title: Memcached Integration
tags: [integrations list]
permalink: memcached.html
summary: Learn about the Memcached Integration.
---
## Memcached Integration

Memcached is a popular distributed memory caching system. This integration installs and configures Telegraf to send Memcached metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard for monitoring an Memcached cluster.  Here's a screenshot of that dashboard:

{% include image.md src="images/Memcached_Dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Memcached Setup



### Step 1. Install the Telegraf Agent

This integration uses the Memcached input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Configure Memcached Input Plugin

Create a file called `memcached.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.memcached]]
  servers = ["your.memcached.server:11211"]
```
{% endraw %}

You can poll multiple Memcached instances from a single Telegraf agent. Simply configure the `servers` parameter with the addresses of the Memcached instances:
{% raw %}
```
servers = ["your.memcached.server1:11211","your.memcached.server2:11211","your.memcached.server3:11211"]
```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.



