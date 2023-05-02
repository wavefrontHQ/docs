---
title: Twemproxy Integration
tags: [integrations list]
permalink: twemproxy.html
summary: Learn about the Twemproxy Integration.
---
## Twemproxy Integration

Twemproxy (nutcracker) is a fast and lightweight proxy for memcached and redis.
This integration installs and configures Telegraf to send Twemproxy metrics into Wavefront. Telegraf is a light-weight server process capable of collecting, processing, aggregating, and sending metrics to a [Wavefront proxy](https://docs.wavefront.com/proxies.html).

In addition to setting up the metrics flow, this integration also installs a dashboard. Here are the **Overview** and **Pool Stats** sections of a dashboard displaying Twemproxy metrics:
{% include image.md src="images/twemproxy_dashboard.png" width="80" %}


To see a list of the metrics for this integration, select the integration from <https://github.com/influxdata/telegraf/tree/master/plugins/inputs>.
## Twemproxy Setup



### Step 1. Install the Telegraf Agent

This integration uses the Twemproxy input plugin for Telegraf to extract metrics from Twemproxy.

**Note:** Install the Telegraf agent on the Twemproxy host. 

Log in to your Operations for Applications instance, navigate to the integration, and follow the instructions on the **Setup** tab to install Telegraf and the Wavefront proxy in your environment. If a proxy is already running in your environment, you can select that proxy and the Telegraf install command connects with that proxy. Sign up for a [free trial](https://tanzu.vmware.com/observability-trial){:target="_blank" rel="noopenner noreferrer"} to check it out!

### Step 2. Enable the Twemproxy input plugin

Create a `twemproxy.conf` file in `/etc/telegraf/telegraf.d` and add the following snippet:
{% raw %}
   ```
    ## Read Twemproxy stats data
    [[inputs.twemproxy]]
      ## Twemproxy stats address and port (no scheme)
      addr = "localhost:22222"
      ## Monitor pool name
      pools = ["redis_pool", "mc_pool"]
   ```
{% endraw %}

### Step 3. Restart Telegraf

Run `sudo service telegraf restart` to restart your Telegraf agent.




