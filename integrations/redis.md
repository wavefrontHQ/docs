---
title: Redis Integration
tags: [integrations list]
permalink: redis.html
summary: Learn about the Wavefront Redis Integration.
---
## Redis Integration

Redis is a popular open source, in-memory data store. This integration installs and configures Telegraf to send Redis cluster metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here's the activity and system section of a dashboard displaying Redis metrics:

{% include image.md src="images/redis_activity.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Redis Setup



### Step 1. Install the Telegraf Agent

This integration uses the Redis input plugin for Telegraf. If you've already installed Telegraf on your server(s), you can skip to Step 2.

Run a command to install Telegraf and a Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy.

### Step 2. Configure Redis Input Plugin

Create a file called `redis.conf` in `/etc/telegraf/telegraf.d` and enter the following snippet:
{% raw %}
```
[[inputs.redis]]
  servers = ["tcp://your.redis.server:6379"]
```

To monitor multiple Redis instances, configure the `servers` parameter with the addresses of the Redis instances:
```
  servers = ["tcp://your.redis.server1:6379","tcp://your.redis.server2:6379","tcp://your.redis.server2_slave:6379"]
```
{% endraw %}  

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your agent.
